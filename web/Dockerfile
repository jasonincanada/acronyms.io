# Build this first as part of
#
#   ~/acronyms.io/$ docker-compose build
#
# Before we can use it though we need to install the node modules. Bind-mount the
# local folder to have the node_modules folder written outside the container
#
#   ~/acronyms.io/web$ docker run --rm -v $(pwd):/web acronymsio_web npm install
#

# get a pre-built server from the docker hub with only node installed
FROM node:lts-buster-slim

# open port
EXPOSE 3000

# this is bind-mounted (in docker-compose.yml) to our local ~/acronyms.io/web
WORKDIR /web

CMD ["npm", "start"]

