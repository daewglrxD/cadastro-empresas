FROM node:16.6.2-alpine3.11

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN apk update && apk add bash

COPY . .

RUN ["chmod", "+x", "./wait-for-it.sh"]

EXPOSE 3000

CMD ["npm", "start"]