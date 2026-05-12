#!/bin/bash

# Test script for ThinkALM API

echo "🧪 Testing ThinkALM API..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "1️⃣  Testing health check..."
HEALTH=$(curl -s http://localhost:3001/api/health)
if [[ $HEALTH == *"ok"* ]]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
else
    echo -e "${RED}✗ Health check failed${NC}"
    echo "Response: $HEALTH"
fi
echo ""

# Test 2: Database ROI (no file needed)
echo "2️⃣  Testing Database ROI endpoint..."
ROI=$(curl -s -X POST http://localhost:3001/api/diagnostic/database-roi \
  -H "Content-Type: application/json" \
  -d '{"databaseSize":10000,"avgCommission":15000,"email":"test@example.com"}')

if [[ $ROI == *"success"* ]]; then
    echo -e "${GREEN}✓ Database ROI endpoint working${NC}"
    echo "Check test@example.com for the email!"
else
    echo -e "${RED}✗ Database ROI endpoint failed${NC}"
    echo "Response: $ROI"
fi
echo ""

echo "✅ Basic tests complete!"
echo ""
echo "To test Call Analysis, you need to upload an actual audio file:"
echo 'curl -X POST http://localhost:3001/api/diagnostic/call-analysis \'
echo '  -F "file=@/path/to/your-audio.mp3" \'
echo '  -F "email=test@example.com"'
