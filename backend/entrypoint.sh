#!/bin/sh

sudo service nginx start
cd /vue-calendar-backend
echo 7
bin/setup
bundle exec pumactl start

# mysql -u root -p
