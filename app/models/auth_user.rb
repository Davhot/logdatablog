class AuthUser < ApplicationRecord

  def self.save_from_data_vk(data)
    unique_id = self.generate_unique_id(data)
    user = self.find_by(unique_id: unique_id)
    if user.blank?
      user = self.new
      user.unique_id = unique_id
    end
    user.access_token = data['access_token']
    user.user_id = data['user_id']
    user.expires_in = data['expires_in']
    user.social = 'vk'

    user.save
    user
  end


  private

  def self.generate_unique_id(data)
    Digest::MD5.hexdigest(data['access_token'].to_s + data['user_id'].to_s +
      data['expires_in'].to_s + Time.current.to_s)
  end
end
