class CreateStatistics < ActiveRecord::Migration[5.2]
  def change
    create_table :statistics do |t|
      t.string :ip
      t.integer :count, default: 0
      t.references :article, foreign_key: true

      t.timestamps
    end
  end
end
