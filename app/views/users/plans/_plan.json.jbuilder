json.extract! plan, :id, :name, :description, :price, :created_at, :updated_at
json.url plan_url(plan, format: :json)
