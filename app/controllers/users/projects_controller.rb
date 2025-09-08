class Users::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_account
  before_action :set_project, only: [:update, :destroy]


    def index
    @plans = @account.plan ? [@account.plan] : []
  end
  def create
    @project = @account.projects.build(project_params)

    if @project.save
      redirect_to users_dashboard_path, notice: "Project added successfully with selected plan."
    else
      redirect_to users_dashboard_path, alert: "Failed to add project."
    end
  end




  def update
    if @project.update(project_params)
      redirect_to users_dashboard_path, notice: "✅ Project updated successfully."
    else
      redirect_to users_dashboard_path, alert: "⚠️ Failed to update project."
    end
  end

  def destroy
    @project.destroy
    redirect_to users_dashboard_path, notice: "🗑️ Project deleted successfully."
  end

  private

  def set_account
    @account = current_user.web_developer_account
  end

    def set_project
    @project = @account.projects.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description, :status, :plan_id)
  end
end

