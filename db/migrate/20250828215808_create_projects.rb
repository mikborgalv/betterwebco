class CreateProjects < ActiveRecord::Migration[8.0]
  def change
    create_table :projects do |t|
      t.references :web_developer_account, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.string :status

      t.timestamps
    end
  end
end
