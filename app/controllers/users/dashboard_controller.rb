class Users::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @plans = [
      { name: "Basic", description: "Basic front-end web development services", price: 29 },
      { name: "Advanced", description: "Front-end + 1 form to collect customer info", price: 89 },
      { name: "Professional", description: "Full app with 2 forms, login page, and customer management features", price: 180 }
    ]
  end
end
