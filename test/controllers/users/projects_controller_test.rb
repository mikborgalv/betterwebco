require "test_helper"

class Users::ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get users_projects_create_url
    assert_response :success
  end
end
