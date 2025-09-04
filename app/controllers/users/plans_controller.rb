# app/controllers/users/plans_controller.rb
class Users::PlansController < ApplicationController
  before_action :authenticate_user!
  before_action :set_account, only: [:create, :update, :destroy]

  # GET /users/plans
  def index
    @plans = Plan.order(price: :asc)
  end

  # POST /users/plans/:id
  # Subscribe when no account exists yet
  def create
    plan = Plan.find(params[:id])

    if @account.present?
      redirect_to users_dashboard_path, alert: "You already have an active subscription."
      return
    end

    @account = current_user.build_web_developer_account(
      plan: plan,
      price: plan.price,
      status: "active"
    )

    if @account.save
      respond_to do |format|
        format.turbo_stream { render :create, locals: { account: @account } }
        format.html { redirect_to users_dashboard_path, notice: "Subscribed to #{plan.name}." }
      end
    else
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace("plans", partial: "users/dashboard/plans", locals: { account: @account, plans: Plan.all }) }
        format.html { redirect_to users_dashboard_path, alert: "Failed to subscribe." }
      end
    end
  end

  # PATCH /users/plans/:id
  # Update or assign subscription
  def update
    plan = Plan.find(params[:id])

    if @account.present?
      success = @account.update(plan: plan, price: plan.price, status: "active")
    else
      @account = current_user.build_web_developer_account(plan: plan, price: plan.price, status: "active")
      success = @account.save
    end

    respond_to do |format|
      if success
        format.turbo_stream { render :update, locals: { account: @account } }
        format.html { redirect_to users_dashboard_path, notice: "Plan set to #{plan.name}." }
      else
        format.turbo_stream { render turbo_stream: turbo_stream.replace("plans", partial: "users/dashboard/plans", locals: { account: @account, plans: Plan.all }) }
        format.html { redirect_to users_dashboard_path, alert: "Failed to update plan." }
      end
    end
  end

  # DELETE /users/plans/:id
  # Cancel subscription
  def destroy
    if @account.present? && @account.destroy
      respond_to do |format|
        format.turbo_stream { render :destroy }
        format.html { redirect_to users_dashboard_path, notice: "Subscription cancelled." }
      end
    else
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace("plans", partial: "users/dashboard/plans", locals: { account: @account, plans: Plan.all }) }
        format.html { redirect_to users_dashboard_path, alert: "Failed to cancel subscription." }
      end
    end
  end

  private

  def set_account
    @account = current_user.web_developer_account
  end
end
