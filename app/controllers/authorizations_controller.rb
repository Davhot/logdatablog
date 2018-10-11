class AuthorizationsController < ApplicationController
  def get_vk_token
    message = [:error, 'Нет прав!']
    if params['code'].present?
      data = Authorization::API::VK.get_access_token(params[:code],
        session[:vk_redirect_uri])
      if valid_vk_data?(data)
        user = AuthUser.save_from_data_vk(data)
        if user.valid?
          session[:unique_id] = user.unique_id
          message = [:success, 'Вы успешно авторизовались!']
        else
          message = [:error, 'Авторизация не выполнена, повторите попытку']
        end
      else
        message = [:error, 'Авторизация не выполнена, повторите попытку']
      end
    end
    flash[message[0]] = message[1]
    redirect_to static_pages_contact_path
  end

  private

  def valid_vk_data?(data)
    data.present? && data['access_token'].present? &&
      data['user_id'].present? && data['expires_in'].present?
  end

end
