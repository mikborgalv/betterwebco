class Users::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @plans = [
      { name: "Basic", description: "Basic front-end web development services", price: 300 },
      { name: "Advanced", description: "Front-end + 1 form to collect customer info", price: 1500 },
      { name: "Professional", description: "Full app with 2 forms, login page, and customer management features", price: 3500 }
    ]

    @account = current_user.web_developer_account
  end

  def subscribe
    plan = params[:plan]

    selected_plan = {
      "Basic" => { price: 300 },
      "Advanced" => { price: 1500 },
      "Professional" => { price: 3500 }
    }[plan]

    @account = current_user.build_web_developer_account(
      plan_name: plan,
      price: selected_plan[:price],
      status: "active",
      projects: []
    )

    if @account.save
      redirect_to users_dashboard_path, notice: "You subscribed to the #{plan} plan!"
    else
      redirect_to users_dashboard_path, alert: "Subscription failed."
    end
  end
end

