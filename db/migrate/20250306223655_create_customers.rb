class CreateCustomers < ActiveRecord::Migration[8.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.text :message
      t.string :project_type

      t.timestamps
    end
  end
end
