require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

require_relative 'hot_catch_logger'

module Logdatablog
  class Application < Rails::Application
    config.middleware.insert_before Rails::Rack::Logger, Rails::Rack::HotCatchLogger
    config.middleware.delete Rails::Rack::Logger

    config.time_zone = "Moscow"
    config.autoload_paths += %W(#{config.root}/lib)
    config.middleware.use ActionDispatch::Flash

    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]
    config.i18n.default_locale = :ru
  end
end
