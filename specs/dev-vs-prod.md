## Differences between Dev and Prod enviros

| Item | Dev | Prod |
|--|--|--|
| web / nginx | Separate containers for the nginx proxy and React dev frontend | Merged container using a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/), yielding a thin container for both (25 MB!)
| nginx config | `nginx/nginx.conf` | `web/nginx.prod.conf` Contains SSL settings copied from [this article](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose). Rewrite rules from port 80 to secure 443
| certbot | n/a for dev | Container for [certbot](https://hub.docker.com/r/certbot/certbot/) for production SSL certificates from [LetsEncrypt](https://letsencrypt.org/). Docker volumes `certbot-etc` and `certbot-var` shared between the `certbot` and `nginx` containers
| pg-admin | PostgreSQL admin UI for dev tinkering | Removed in production

