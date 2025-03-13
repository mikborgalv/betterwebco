# Rails.application.routes.draw do
#   # resources :customers
#   # root "customers#new"
#   # # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
#   # # Can be used by load balancers and uptime monitors to verify that the app is live.
#   # get "up" => "rails/health#show", as: :rails_health_check

#   # # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
#   # # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
#   # # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

#   # # Defines the root path route ("/")
#   # # root "posts#index"
# end

# config/routes.rb
Rails.application.routes.draw do
  root "customers#index"
  get "customers/thank_you"

  get "static_pages/our_services"
  get "static_pages/our_process"
  get 'faqs.json', to: 'faqs#index'
  get "static_pages/search"


  resources :customers, only: [:new, :create] do
    get 'thank_you', on: :member # Add a route for the thank you page
  end
end
