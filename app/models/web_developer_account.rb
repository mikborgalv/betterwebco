# app/models/web_developer_account.rb
class WebDeveloperAccount < ApplicationRecord
  belongs_to :user
  belongs_to :plan
  has_many :projects, dependent: :destroy

  enum :status, { active: "active", cancelled: "cancelled" }, default: "active"

    def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "id_value", "plan_name", "price", "projects", "status", "updated_at", "user_id"]
  end
end
