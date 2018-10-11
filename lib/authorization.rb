require 'net/http'
require 'json'

module Authorization
  module API
    class VK
      def self.get_access_token(code, redirect_uri)
        # raise redirect_uri.inspect
        params = {
          client_id: '6716551',
          client_secret: ENV['VK_CLIENT_SECRET'],
          redirect_uri: redirect_uri,
          code: code
        }
        a = []
        params.each{|k, v| a << "#{k}=#{v}"}
        link = "https://oauth.vk.com/access_token?#{a.join(?&)}"
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
