class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.references :article_category, foreign_key: true
      t.string :title, null: false
      t.string :content, null: false

      t.timestamps

      t.index [:title], unique: true
    end
  end
end
