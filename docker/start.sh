rm /usr/src/app/tmp/pids/server.pid

touch log/production.log
chmod 0664 log/production.log

bundle exec rails server -b 0.0.0.0 -p 3000
bundle exec rails server -b 0.0.0.0 -p 3001
