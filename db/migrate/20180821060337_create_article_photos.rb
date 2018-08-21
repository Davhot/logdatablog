class CreateArticlePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :article_photos do |t|
      t.string :original_filename, null: false
      t.string :system_filename, null: false
      t.string :filepath, null: false
      t.references :article, foreign_key: true

      t.timestamps
    end
  end
end
