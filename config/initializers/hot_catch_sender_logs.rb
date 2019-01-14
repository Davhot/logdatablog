require 'sidekiq-cron'
Rails.application.config.sender_logs = HotCatch::MakeHttpsRequest.new
if Sidekiq.server?
  Sidekiq::Cron::Job.create(name: 'NginxSystemWorker - every 1min', cron: '*/1 * * * *', class: 'NginxSystemWorker')
end
