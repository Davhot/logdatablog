class CreateAuthUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :auth_users do |t|
      t.string :access_token
      t.string :user_id
      t.integer :expires_in
      t.string :unique_id
      t.string :first_name
      t.string :last_name
      t.string :photo_url
      t.string :social

      t.timestamps
    end
  end
end
