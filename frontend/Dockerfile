FROM node:16.18-alpine

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package.json .

RUN apk update && yarn
