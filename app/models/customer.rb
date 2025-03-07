# app/models/customer.rb
class Customer < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2 }
  validates :message, presence: true, length: { minimum: 10 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :project_type, inclusion: { in: %w[web_development web_consulting web_partners] }

  before_validation :set_default_project_type

  private

  def set_default_project_type
    self.project_type ||= 'web_development'
  end
end