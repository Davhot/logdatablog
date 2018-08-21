server '192.168.111.111', user: 'david', roles: %w{app db}

set :branch, ENV['branch'] || 'article'

set :default_env, {
  'RAILS_ENV': 'production'
}
