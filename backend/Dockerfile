FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./src ./src

EXPOSE 80 9229
CMD [ "npm", "run", "start" ]