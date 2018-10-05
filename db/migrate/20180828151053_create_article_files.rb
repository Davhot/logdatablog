class CreateArticleFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :article_files do |t|
      t.string :original_filename, null: false
      t.string :system_name, null: false
      t.string :filepath, null: false
      t.string :unique_index_for_new_article
      t.references :article, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
