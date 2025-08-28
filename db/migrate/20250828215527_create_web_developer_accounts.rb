class CreateWebDeveloperAccounts < ActiveRecord::Migration[8.0]
  def change
    create_table :web_developer_accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :plan_name
      t.decimal :price
      t.string :status
      t.text :projects

      t.timestamps
    end
  end
end
