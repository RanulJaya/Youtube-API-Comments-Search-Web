FROM node:20

WORKDIR /app

RUN apt-get update 
# && apt-get install -y cron &&  apt-get install python3 && apt-get install -y python3-pip && apt-get install -y python3-venv && apt-get install bash

SHELL ["/bin/bash", "-c"]

# COPY package*.json ./

COPY . .

RUN npm install && npm run build

ENV PORT=443

EXPOSE 443

CMD [ "npm","start" ]

