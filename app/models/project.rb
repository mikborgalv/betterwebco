class Project < ApplicationRecord
  belongs_to :web_developer_account
  belongs_to :plan
  validates :name, presence: true
  validates :status, inclusion: { in: ["in progress", "completed", "on hold"], allow_blank: true }

    def self.ransackable_associations(auth_object = nil)
    ["web_developer_account"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "id", "id_value", "name", "status", "updated_at", "web_developer_account_id"]
  end

end
