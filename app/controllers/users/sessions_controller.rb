# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # POST /users/sign_in
  def create
    super
  end

  protected

  # Redirect users to dashboard after sign in
  def after_sign_in_path_for(resource)
    users_dashboard_path
  end

  # Optional: redirect after sign out
  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
