#!/bin/sh

sudo service nginx start
ls -la
cd /vue-calendar-backend
ls -la
bin/setup
bundle exec pumactl start
