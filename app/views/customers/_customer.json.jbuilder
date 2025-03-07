json.extract! customer, :id, :name, :message, :project_type, :created_at, :updated_at
json.url customer_url(customer, format: :json)
