class AddPlanToWebDeveloperAccounts < ActiveRecord::Migration[8.0]
  def change
    add_reference :web_developer_accounts, :plan, null: false, foreign_key: true
  end
end
