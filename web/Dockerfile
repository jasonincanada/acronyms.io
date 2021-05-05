
# get a pre-built server from the docker hub with only node installed
FROM node:lts-buster-slim

# open port
EXPOSE 3000

# this is bind-mounted (in docker-compose.yml) to our local ~/acronyms.io/web
WORKDIR /web

# npm dependencies
COPY package*.json ./
RUN npm install

CMD ["npm", "start"]

