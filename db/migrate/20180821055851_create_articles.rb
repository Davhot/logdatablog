class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.references :category, foreign_key: true
      t.string :title, null: false
      t.string :content, null: false

      t.timestamps

      t.index [:title], unique: true
    end
  end
end
