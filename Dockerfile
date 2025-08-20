FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install
RUN npm install pg

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]