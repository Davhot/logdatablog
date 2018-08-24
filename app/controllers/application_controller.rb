class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def set_breadcrumbs
    @need_restful_breadcrumbs = true
  end
end
