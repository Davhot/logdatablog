class AddUserToAuthUser < ActiveRecord::Migration[5.2]
  def change
    rename_column :auth_users, :user_id, :social_user_id
    add_reference :auth_users, :user, foreign_key: true
  end
end
