## Things about `web-root`

The way docker shadows container folders when mounting volumes over top of them can make it tricky to understand where a folder's contents come from, and how and when they're updated

## multi-stage build

Docker builds the nginx image using a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/) as specified in [`web/Dockerfile.prod`](../web/Dockerfile.prod).  The first build stage starts with a Node image with a full NPM development environment to build our React app.  The final production app is left in the `/web/build` folder.  The second stage starts with a freshly cloned nginx image, then copies the web files from the (about-to-vanish!) first stage into `/usr/share/nginx/html`

The output of the build is a super-thin image (only 25 MB--including our web app).  The app sits at `/usr/share/nginx/html` and it could be served directly from the container's own filesystem--if we didn't need to share it.

## certification

The certification protocol is a back-and-forth between our local certbot container and a Certificate Authority ([LetsEncrypt](https://letsencrypt.org/) in this case) to prove that certbot has control of the web site it's getting the cert for.  This is tricky in our microservice architecture since we have certbot in its own container separate from the web server.  We do know certbot assumes the site is at `/var/www/html` and it drops the CA's challenge files there.  To bridge the gap between certbot and nginx, we create a docker volume called `web-root` and have it be a common location, mounted as `/usr/share/nginx/html` on the web server where nginx expects the website to be, and as `/var/www/html` on the certbot container where it prefers to drop the challenge files

## mount timing and mount order matter

The first time we run `docker-compose` to bring up the production environment, it creates an empty `web-root` volume and begins the process of mounting it to the containers as specified in our service descriptions.  This is an important step to consider, since it's during the initial mounting that Compose has a chance to populate a new volume with initial contents.  As it runs down the list of services in `docker-compose.prod.yml` to find the volume's mount point (if any) in each container, the first folder Compose finds that already exists will have its contents *copied* to the new volume.  These contents are now seen everywhere across this compose wherever the volume is mounted

An important effect of this is that the initial source folder's contents are now shadowed by the volume whenever the volume is mounted to that container.  The initial copying step is not repeated on subsequent launches of the environment when `web-root` already exists

This confused me for a while when I wasn't seeing updates to the production site even though I was pretty sure they were being compiled into the app bundle during the multi-stage build.  They were, but by that point the container was no longer reading `/usr/share/nginx/html` from the newly built nginx image but from the existing `web-root` volume

