#!/bin/bash

# Checking Docker
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install it before continuing."
  exit 1
fi

# Checking Docker Compose
if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose is not installed. Please install it before continuing."
  exit 1
fi

# Create .env files if they don't exist
if [ ! -f "./frontend/.env" ]; then
  echo "Creating .env file for the frontend..."
  cat <<EOT >> ./frontend/.env
VITE_BASE_URL='http://localhost:8080/api'
EOT
fi

# Build and run the containers
echo "Building and running the application..."
docker-compose up --build

# Final message
echo "The application should be available now."
