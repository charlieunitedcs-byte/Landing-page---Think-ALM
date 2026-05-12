#!/bin/bash

# ThinkALM Development Startup Script

echo "🚀 Starting ThinkALM Development Environment..."
echo ""

# Check if API .env is configured
if [ ! -f "api/.env" ]; then
    echo "⚠️  Warning: api/.env not found. Copying from example..."
    cp api/.env.example api/.env
    echo "📝 Please configure api/.env with your email credentials!"
    echo ""
fi

# Check if frontend .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env not found. Copying from example..."
    cp .env.example .env
    echo ""
fi

# Function to check if port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Check if API port 3001 is available
if check_port 3001; then
    echo "⚠️  Port 3001 is already in use. Please free it or change PORT in api/.env"
    exit 1
fi

# Start API server in background
echo "📡 Starting API server on port 3001..."
cd api
npm install > /dev/null 2>&1
node server.js &
API_PID=$!
cd ..

# Wait for API to start
sleep 2

# Check if API started successfully
if ! kill -0 $API_PID 2>/dev/null; then
    echo "❌ Failed to start API server. Check api/.env configuration."
    exit 1
fi

echo "✅ API server running (PID: $API_PID)"
echo ""

# Start frontend
echo "🎨 Starting frontend dev server..."
echo ""
npm run dev

# Cleanup on exit
trap "kill $API_PID 2>/dev/null" EXIT
