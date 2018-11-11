class AuthorizationsController < ApplicationController
  def get_vk_token
    message = [:error, 'Нет прав!']
    if params['code'].present?
      api_vk = Socials::API::VK.new
      data = api_vk.get_access_token(params[:code],
        session[:vk_redirect_uri])
      if valid_vk_data?(data)
        user = AuthUser.save_from_data_vk(data)
        if user.present? && user.valid?
          session[:unique_id] = user.unique_id
          response = api_vk.get_user_info(user.access_token, user.social_user_id)
          user.first_name = response[0]
          user.last_name = response[1]
          user.photo_url = response[2]
          user.save
          message = [:success, 'Вы успешно авторизовались!']
        else
          message = [:error, 'Авторизация не выполнена, повторите попытку']
        end
      else
        message = [:error, 'Авторизация не выполнена, повторите попытку']
      end
    end
    flash[message[0]] = message[1]
    redirect_back(fallback_location: root_path)
  end

  private

  def valid_vk_data?(data)
    data.present? && data['access_token'].present? &&
      data['user_id'].present? && data['expires_in'].present?
  end

end
