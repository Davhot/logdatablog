class AddForContentToArticleFile < ActiveRecord::Migration[5.0]
  def change
    add_column :article_files, :for_content, :boolean, default: false
  end
end
