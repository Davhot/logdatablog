class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :original_filename, null: false
      t.string :system_filename, null: false
      t.string :filepath, null: false
      t.references :article, foreign_key: true

      t.timestamps
    end
  end
end
