server '192.168.111.110', user: 'david', roles: %w{app db}

set :branch, ENV['branch'] || 'deploy'

set :default_env, {
  'RAILS_ENV': 'production'
}
