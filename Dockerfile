FROM node:16.15-alpine3.14

WORKDIR /usr/src

COPY . .
RUN npm install

RUN npm run build

ENV NODE_ENV="production"
CMD [ "npm" ,  "run"  , "start:docker" ]
