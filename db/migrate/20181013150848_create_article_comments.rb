class CreateArticleComments < ActiveRecord::Migration[5.0]
  def change
    create_table :article_comments do |t|
      t.text :content
      t.references :auth_user, foreign_key: true
      t.references :article, foreign_key: true
      t.integer :parent_id

      t.timestamps
    end
  end
end
