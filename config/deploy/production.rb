server '192.168.111.111', user: 'david', roles: %w{app db}

set :branch, ENV['branch'] || 'develop'

set :default_env, {
  'RAILS_ENV': 'production'
}
