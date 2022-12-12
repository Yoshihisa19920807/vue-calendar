FROM node:16.18-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

COPY package.json .
COPY yarn.lock .

ADD . ./

RUN apk update && yarn && yarn build

CMD ["yarn", "serve"]
