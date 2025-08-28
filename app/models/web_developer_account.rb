class WebDeveloperAccount < ApplicationRecord
  belongs_to :user
  has_many :projects, dependent: :destroy

  validates :plan_name, presence: true
end
