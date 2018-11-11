rm /usr/src/app/tmp/pids/server.pid

touch log/production.log
chmod 0664 log/production.log

rm temp_bash
rm temp
echo 'SHELL=/bin/bash' > temp_bash
env  >> temp_bash
echo '' >> temp_bash
cat config/cron-task > temp
cat temp_bash temp > config/cron-task
crontab config/cron-task
service cron restart

echo 'export PGPASSWORD='\"$DB_PASSWORD\"' && pg_dump -U '$DB_USERNAME' --format plain '$DB_DATABASE' | gzip -c > "dump${DATE}.sql.gz"' >> bin/copy_db_dump

export RAILS_ENV=production
bundle exec rails server -b 0.0.0.0 -p 3000
