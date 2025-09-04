class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :web_developer_account, dependent: :destroy
  has_many :projects, through: :web_developer_account
  # ✅ Allow Ransack to search these columns
  def self.ransackable_attributes(auth_object = nil)
    %w[id email created_at updated_at]
  end

  # ✅ If you want to allow searching through associations (e.g., accounts)
  def self.ransackable_associations(auth_object = nil)
    %w[accounts]
  end
end
