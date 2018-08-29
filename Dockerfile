FROM node:8.10

RUN apt-get update && apt-get install make

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

CMD ["make","start"]
