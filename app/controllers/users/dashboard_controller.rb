# app/controllers/users/dashboard_controller.rb
class Users::DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :set_account
  before_action :set_projects
  before_action :set_plans

    def index
      @account = current_user.web_developer_account
      @projects = @account ? @account.projects : []
      @plans    = Plan.all
    end

  private

  def set_account
    @account = current_user.web_developer_account
  end

  def set_projects
    @projects = @account.present? ? @account.projects.includes(:plan) : []
  end

  def set_plans
    @plans = Plan.order(price: :asc)
  end
end

