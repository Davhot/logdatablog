class AddDescribeToArticle < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :describe, :string, null: false
  end
end
