class CreateArticleCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :article_categories do |t|
      t.string :name, null: false
      t.timestamps
      t.index [:name], unique: true
    end
  end
end
