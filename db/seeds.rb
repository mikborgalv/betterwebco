# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb
# Seed plans for Web Developer Accounts
# db/seeds.rb
# Seed plans for Web Developer Accounts (based on updated schema)

Plan.create!(
  name: "Single Page Website",
  description: "A clean, modern single-page website ideal for portfolios, resumes, or basic business landing pages.",
  price: 499.00
)

Plan.create!(
  name: "Multi-Page Website with Database",
  description: "A multi-page website including custom database integration for dynamic content and user features.",
  price: 1999.00
)

Plan.create!(
  name: "Pro Web Management + Database Creation",
  description: "A full-service package including professional web management, advanced database creation, monthly maintenance, and security updates.",
  price: 4999.00
)

puts "Plans seeded successfully!"




