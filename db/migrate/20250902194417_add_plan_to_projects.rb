class AddPlanToProjects < ActiveRecord::Migration[8.0]
  def change
    add_reference :projects, :plan, null: false, foreign_key: true
  end
end
