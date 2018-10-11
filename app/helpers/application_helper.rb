module ApplicationHelper
  def flash_class(level)
    case level.to_sym
      when :notice then "alert alert-info"
      when :success then "alert alert-success"
      when :error then "alert alert-danger"
      when :alert then "alert alert-info"
    end
  end

  def vk_url
    redirect_uri = "https://#{request.domain}/authorizations/get_vk_token"
    session[:vk_redirect_uri] = redirect_uri
    params = {
      client_id: '6716551',
      redirect_uri: redirect_uri,
      scope: '0',
      response_type: 'code',
      v: '5.85',
      state: Digest::MD5.hexdigest(Time.current.to_s)
    }
    a = []
    params.each{|k, v| a << "#{k}=#{v}"}
    link = "https://oauth.vk.com/authorize?#{a.join(?&)}"
  end
end
