#!/bin/bash

# Vercel Environment Variables Setup Script
# Based on official Vercel CLI documentation
# Reference: https://vercel.com/docs/cli/env

echo "Setting up Vercel environment variables..."

# Essential environment variables for production
echo "https://myprivatetutoronline.com" | vercel env add NEXT_PUBLIC_SITE_URL production preview development
echo "false" | vercel env add TINA_PUBLIC_IS_LOCAL production
echo "true" | vercel env add TINA_PUBLIC_IS_LOCAL preview development
echo "main" | vercel env add NEXT_PUBLIC_TINA_BRANCH production preview development
echo "griffin1995" | vercel env add GITHUB_OWNER production preview development
echo "my_private_tutor_online" | vercel env add GITHUB_REPO production preview development
echo "main" | vercel env add GITHUB_BRANCH production preview development

# Placeholder values that need to be updated
echo "your_production_client_id" | vercel env add NEXT_PUBLIC_TINA_CLIENT_ID production preview development
echo "your_production_token" | vercel env add TINA_TOKEN production preview development
echo "your_github_pat_here" | vercel env add GITHUB_PERSONAL_ACCESS_TOKEN production preview development
echo "your_nextauth_secret_here" | vercel env add NEXTAUTH_SECRET production preview development
echo "mongodb://localhost:27017/mydb" | vercel env add MONGODB_URI production preview development

echo ""
echo "Environment variables set up successfully!"
echo ""
echo "IMPORTANT: Update the following placeholder values in Vercel Dashboard:"
echo "1. NEXT_PUBLIC_TINA_CLIENT_ID - Get from TinaCMS"
echo "2. TINA_TOKEN - Get from TinaCMS"
echo "3. GITHUB_PERSONAL_ACCESS_TOKEN - Create at https://github.com/settings/tokens"
echo "4. NEXTAUTH_SECRET - Generate with: openssl rand -base64 32"
echo "5. MONGODB_URI - Your production MongoDB connection string"
echo ""
echo "Visit: https://vercel.com/jacks-projects-cf5effed/my-tutor-website/settings/environment-variables"