FROM node:16.18-alpine

WORKDIR /app

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

ADD package.json /app/package.json

COPY package.json .

RUN apk update && yarn

ADD . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "serve"]
