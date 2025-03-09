#!/usr/bin/env bash
# render-build.sh

# Exit on error
set -o errexit

# Install dependencies
bundle install

# Precompile assets
bundle exec rails assets:precompile
budnle exec rails assets:clean

# Run migrations (if applicable)
bundle exec rails db:migrate