class Project < ApplicationRecord
  belongs_to :web_developer_account

  validates :name, presence: true
  validates :status, inclusion: { in: ["in progress", "completed", "on hold"], allow_blank: true }
end
