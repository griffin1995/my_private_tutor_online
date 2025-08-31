#!/bin/bash

# Vercel Deployment Size Verification Script
# This script checks if the project is under Vercel's file size limits

echo "🔍 Verifying Vercel deployment size limits..."
echo

# Check for files over 100MB (Vercel limit)
echo "Checking for files over 100MB..."
LARGE_FILES=$(find . -type f -size +100M \
    -not -path "./.git/*" \
    -not -path "./node_modules/*" \
    -not -path "./.next/*" \
    -not -path "./out/*" \
    -not -path "./dist/*" \
    -not -path "./.vercel/*" \
    -not -path "./public/videos/originals/*" \
    -not -path "./public/videos/compressed/*" \
    -not -path "./public/videos/temp/*" \
    -not -path "./.playwright-mcp/*" \
    -not -path "./TO_ORGANISE/*" \
    -not -path "./coverage/*" \
    -not -path "./docs/*" \
    -not -path "./.claude/*" \
    -not -path "./playwright-report/*" \
    -not -path "./autonomous-audit/*" \
    -not -path "./test-results/*" \
    -not -path "./load-tests/*" \
    -not -path "./site_audit/*")

if [ -z "$LARGE_FILES" ]; then
    echo "✅ No files over 100MB found"
else
    echo "❌ Files over 100MB found:"
    echo "$LARGE_FILES"
    exit 1
fi

echo

# Check total project size (excluding patterns from .vercelignore)
echo "Calculating deployable project size..."
TOTAL_SIZE=$(du -sh --exclude=.git \
                    --exclude=node_modules \
                    --exclude=.next \
                    --exclude=out \
                    --exclude=dist \
                    --exclude=.vercel \
                    --exclude=public/videos/originals \
                    --exclude=public/videos/compressed \
                    --exclude=public/videos/temp \
                    --exclude=.playwright-mcp \
                    --exclude=TO_ORGANISE \
                    --exclude=.claude \
                    --exclude=docs \
                    --exclude=coverage \
                    --exclude=playwright-report \
                    --exclude=autonomous-audit \
                    --exclude=test-results \
                    --exclude=load-tests \
                    --exclude=site_audit \
                    . | cut -f1)

echo "📊 Estimated deployable size: $TOTAL_SIZE"

# Check critical files are present
echo
echo "Verifying critical deployment files..."

if [ -f "public/videos/parents-testimonials-2025.mp4" ]; then
    PARENTS_SIZE=$(ls -lah public/videos/parents-testimonials-2025.mp4 | awk '{print $5}')
    echo "✅ Parents testimonial video: $PARENTS_SIZE"
else
    echo "❌ Parents testimonial video missing"
fi

if [ -f "public/videos/students-testimonials-2025.mp4" ]; then
    STUDENTS_SIZE=$(ls -lah public/videos/students-testimonials-2025.mp4 | awk '{print $5}')
    echo "✅ Students testimonial video: $STUDENTS_SIZE"
else
    echo "❌ Students testimonial video missing"
fi

echo
echo "🎯 Deployment size verification complete!"
echo "✅ Ready for Vercel deployment"