class ApplicationController < ActionController::Base
# Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
allow_browser versions: :modern
  # application_controller.rb
before_action :set_page_title

def set_page_title
  @page_title ||= controller_name.humanize
end
helper_method :current_user

end
