
# get a pre-built server from the docker hub with only node installed
FROM node:lts-buster-slim

# open port
EXPOSE 3000

# install npm one directory up so we can keep the node_modules in the container
# and not install them locally on the host
WORKDIR /node_app
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force

# this is bind-mounted (in docker-compose.yml) to our local ~/acronyms.io/web
WORKDIR /node_app/web

CMD ["npm", "start"]

