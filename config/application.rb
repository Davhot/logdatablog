require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Logdatablog
  class Application < Rails::Application

    config.time_zone = "Moscow"
    config.autoload_paths += %W(#{config.root}/lib)
    config.middleware.use ActionDispatch::Flash

    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]
    config.i18n.default_locale = :ru
  end
end
