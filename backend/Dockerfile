FROM ruby:3.0.2

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN mkdir /vue-calendar-backend
WORKDIR /vue-calendar-backend

ADD Gemfile /vue-calendar-backend/Gemfile
ADD Gemfile.lock /vue-calendar-backend/Gemfile.lock

RUN apt-get update -qq && \
  apt-get install -y build-essential \
  libpq-dev \
  sudo \
  nginx && \
  gem install bundler

RUN bundle install

ADD . /vue-calendar-backend

# nginx
RUN groupadd nginx
RUN useradd -g nginx nginx

EXPOSE 80

RUN chmod +x /vue-calendar-backend/entrypoint.sh

CMD ["/vue-calendar-backend/entrypoint.sh"]
