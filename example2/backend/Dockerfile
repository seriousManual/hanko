FROM node:14

WORKDIR /usr/src/app

COPY *.js* ./

RUN npm ci

EXPOSE 8080

CMD [ "npm", "run", "dev" ]