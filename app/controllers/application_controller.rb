class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :current_auth_user, :save_previous_redirect

  def set_breadcrumbs
    @need_restful_breadcrumbs = true
  end

  def current_auth_user
    user = AuthUser.find_by(unique_id: session[:unique_id])
    if Rails.env.production? && user.present? &&
      (user.updated_at + user.expires_in.to_i) < Time.current
      session.delete(:unique_id)
    end
    @auth_user = ((session[:unique_id].present? && AuthUser.find_by(id: user.try(:id))) ? user : nil)
  end

  def save_previous_redirect
    session[:unique_id] = 'qwerty' if Rails.env.development?
    # session[:return_to] ||= request.referer
  end

  protected

  def authenticate_user!
    if user_signed_in?
      super
    else
      render file: File.join(Rails.root, 'public/404'), formats: [:html],
        status: 404, layout: false
    end
  end
end
