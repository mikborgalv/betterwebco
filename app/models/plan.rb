
class Plan < ApplicationRecord
  has_many :web_developer_accounts
  has_many :projects
  validates :name, :price, presence: true

   def self.ransackable_associations(auth_object = nil)
    ["projects", "web_developer_accounts"]
  end
    def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "id", "id_value", "name", "price", "updated_at"]
  end
end
