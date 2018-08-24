source 'https://rubygems.org'

ruby '2.5.1'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.5'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'jquery-rails', '4.3.3'
gem 'jbuilder', '~> 2.5'

gem 'bootstrap', '~> 4.1.3'

gem 'font-awesome-rails', '4.7.0.4'
gem 'haml', '5.0.4'
gem 'devise', '~> 4.4.3'
gem 'haml_lint', require: false
gem 'simple_form', '4.0.1'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i(mingw mswin x64_mingw jruby)

# Use Capistrano for deployment
group :capistrano do
  gem 'capistrano', '3.9.0'
  gem 'capistrano-rvm'
  gem 'capistrano-docker', git: 'https://github.com/netguru/capistrano-docker.git'
end
