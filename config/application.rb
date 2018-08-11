require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Logdatablog
  class Application < Rails::Application
    config.assets.paths << Rails.root.join("app", "assets", "fonts")
    config.time_zone = "Moscow"
    # config.assets.enabled = true
    config.middleware.use ActionDispatch::Flash
    config.i18n.default_locale = :ru
  end
end
