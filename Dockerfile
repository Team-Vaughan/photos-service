FROM node:13.12.0

WORKDIR /server

ENV PORT 80

COPY package.json /server/package.json

RUN npm i

COPY . /server

CMD ["node", "server/index.js"]