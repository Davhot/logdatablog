class CreateArticleFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :article_files do |t|
      t.string :original_filename
      t.string :system_name
      t.string :filepath
      t.references :article, foreign_key: true

      t.timestamps
    end
  end
end
