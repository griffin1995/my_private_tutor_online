#!/bin/bash

#################################################
# aclue Frontend Development Server Startup Script
#################################################
#
# Purpose: Start the Next.js development server with fresh build cache
#
# This script:
# 1. Clears Next.js build cache (.next directory)
# 2. Clears node_modules/.cache if it exists
# 3. Regenerates Payload CMS import map and types
# 4. Starts the Next.js development server
#
# Usage:
#   chmod +x start.sh
#   ./start.sh
#
#################################################

set -e  # Exit on any error

echo "Starting MPTO Frontend Development Server"
echo "=============================================="



# Clear Next.js build cache
echo "Clearing Next.js build cache..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "Removed .next directory"
else
    echo "No .next directory found (already clean)"
fi

# Clear node_modules cache
echo "Clearing node_modules cache..."
if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    echo "Removed node_modules/.cache directory"
else
    echo "No node_modules/.cache directory found"
fi

# Kill any existing processes on port 3000
echo "Checking for existing processes on port 3000..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "Port 3000 is in use. Killing existing process..."
    kill -9 $(lsof -t -i:3000) 2>/dev/null || echo "Failed to kill process"
    sleep 1
    echo "Port 3000 is now free"
else
    echo "Port 3000 is available"
fi

# Regenerate Payload CMS import map (ensures admin UI components are mapped)
# Using --use-swc to avoid tsx/undici CacheStorage compatibility issue
echo "Regenerating Payload import map..."
pnpm payload generate:importmap --use-swc
echo "Import map regenerated"

# Regenerate Payload TypeScript types (ensures type definitions are current)
echo "Regenerating Payload TypeScript types..."
pnpm payload generate:types --use-swc
echo "TypeScript types regenerated"

# Start the development server
echo ""
echo "Starting Next.js development server..."
echo "=============================================="
echo "Server will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

# Run Next.js dev server
pnpm run dev
