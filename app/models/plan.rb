
class Plan < ApplicationRecord
  has_many :web_developer_accounts
  has_many :projects
  validates :name, :price, presence: true
end
