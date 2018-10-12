require 'net/http'
require 'json'

module Socials
  module API
    class VK
      VERSION = '5.85'
      def get_access_token(code, redirect_uri)
        params = {
          client_id: '6716551',
          client_secret: ENV['VK_CLIENT_SECRET'],
          redirect_uri: redirect_uri,
          code: code
        }
        link = "https://oauth.vk.com/access_token"
        send_request(link, params)
      end

      def get_user_info(token, user_id)
        params = {
          access_token: token,
          user_ids: user_id,
          fields: 'photo_100',
          v: VERSION
        }
        link = "https://api.vk.com/method/users.get"
        response = send_request(link, params)["response"][0]
        [response["first_name"], response["last_name"], response["photo_100"]]
      end

      def get_image_url(token, user_id)
        params = {
          access_token: token,
          user_ids: user_id,
          v: VERSION
        }
        link = "https://api.vk.com/method/users.get"
        response = send_request(link, params)["response"][0]
        [response["first_name"], response["second_name"]]
      end

      def send_request(link, params)
        a = []
        params.each{|k, v| a << "#{k}=#{v}"}
        link = "#{link}?#{a.join(?&)}"
        url = URI.parse(link)
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port, use_ssl: true) {|http|
          http.request(req)
        }
        JSON.parse(res.body).to_h
      end

    end
  end
end
