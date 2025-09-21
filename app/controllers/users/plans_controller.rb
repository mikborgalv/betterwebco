# app/controllers/users/plans_controller.rb
class Users::PlansController < ApplicationController
  before_action :authenticate_user!
  before_action :set_plan, only: [:create, :update]
  before_action :set_account

  def create
    if @account.blank?
      @account = current_user.build_web_developer_account(plan: @plan)
      if @account.save
        respond_to do |format|
          format.turbo_stream
          format.html { redirect_to users_dashboard_path, notice: "Subscribed to #{@plan.name}" }
        end
      else
        render :new, status: :unprocessable_entity
      end
    else
      redirect_to users_dashboard_path, alert: "You already have a plan."
    end
  end

  def update
    unless current_user.admin?
      redirect_to users_dashboard_path, alert: "Unauthorized" and return
    end

    if @account.update(plan: @plan)
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to users_dashboard_path, notice: "Plan updated to #{@plan.name}" }
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_plan
    @plan = Plan.find(params[:plan_id] || params[:id])
  end

  def set_account
    @account = current_user.web_developer_account
  end
end