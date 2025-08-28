class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_account

  def create
    @project = @account.projects.build(project_params)

    if @project.save
      redirect_to users_dashboard_path, notice: "Project added successfully."
    else
      redirect_to users_dashboard_path, alert: "Failed to add project."
    end
  end

  private

  def set_account
    @account = current_user.web_developer_account
  end

  def project_params
    params.require(:project).permit(:name, :description, :status)
  end
end
