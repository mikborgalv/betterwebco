class WebDeveloperAccount < ApplicationRecord
  belongs_to :user
  has_many :projects, dependent: :destroy

  validates :plan_name, presence: true

    def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "id_value", "plan_name", "price", "projects", "status", "updated_at", "user_id"]
  end
end
