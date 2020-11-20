FROM node:10

WORKDIR /usr/apis/app

COPY package*.json ./

RUN npm install

COPY . /usr/apis/app

EXPOSE 4000

CMD ["node", "app.js"]