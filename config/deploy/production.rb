server '77.37.218.243', user: 'david', roles: %w{app db}

set :branch, ENV['branch'] || 'deploy'

set :default_env, {
  'RAILS_ENV': 'production'
}
