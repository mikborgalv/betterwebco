# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
AdminUser.create!(email: 'admin1@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?


# db/seeds.rb
# db/seeds.rb
puts "🌱 Seeding database..."

# Reset tables
Project.destroy_all
WebDeveloperAccount.destroy_all
Plan.destroy_all
User.destroy_all

# ------------------------
# Create Plans
# ------------------------
plans = [
  { name: "Starter", description: "Perfect for personal projects and trying things out.", price: 9 },
  { name: "Professional", description: "For freelancers and small teams managing multiple projects.", price: 29 },
  { name: "Enterprise", description: "Full support and scalability for growing businesses.", price: 99 }
]

plans.each do |plan|
  Plan.create!(plan)
end
puts "✅ Plans created!"

# ------------------------
# Create Test User
# ------------------------
user = User.create!(
  email: "user1@example.com",
  password: "password",
  password_confirmation: "password"
)
puts "✅ Test user created: #{user.email} / password"

# ------------------------
# Create Web Developer Account for User
# ------------------------
plan = Plan.find_by(name: "Professional")

account = WebDeveloperAccount.create!(
  user: user,
  plan: plan,
  price: plan.price, # optional snapshot
  status: "active"
)
puts "✅ WebDeveloperAccount created for #{user.email} with plan #{plan.name}"

# ------------------------
# Create Projects for Account
# ------------------------
projects = [
  { name: "Portfolio Website", description: "Personal portfolio showcasing skills and work.", status: "completed" },
  { name: "E-Commerce App", description: "Online store with cart and payment integration.", status: "in progress" },
  { name: "Business Landing Page", description: "Simple one-page site for a local business.", status: "on hold" }
]

projects.each do |project|
  account.projects.create!(project.merge(plan: plan))
end
puts "✅ Projects created!"

puts "🌱 Done seeding!"
