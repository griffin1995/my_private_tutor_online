#!/bin/bash
# Modern Automated Migration Script 2025
# Replaces the previous 1,885-line manual approach with proven automated tools

set -e

echo "🚀 Modern Automated Migration 2025"
echo "Using official tools and industry best practices"
echo ""

# Configuration
BACKUP_BRANCH="migration-backup-$(date +%Y%m%d_%H%M%S)"
MIGRATION_BRANCH="automated-migration-2025"

# Pre-migration safety checks
echo "📋 Pre-migration Safety Checks..."
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is required"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is required"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run from project root."
    exit 1
fi

# Verify current state builds
echo "🔍 Verifying current state..."
if ! npm run build --silent; then
    echo "❌ Error: Current state doesn't build. Fix issues before migration."
    exit 1
fi

echo "✅ Pre-migration checks passed!"
echo ""

# Create safety backup
echo "💾 Creating Safety Backup..."
git checkout -b "$BACKUP_BRANCH"
git push origin "$BACKUP_BRANCH" || echo "⚠️ Couldn't push backup branch (continuing anyway)"
git checkout -b "$MIGRATION_BRANCH"
echo "✅ Backup created: $BACKUP_BRANCH"
echo ""

# Phase 1: Official Next.js Automated Migration
echo "📦 Phase 1: Next.js Automated Upgrade..."
echo "Using official @next/codemod tool..."

if npx @next/codemod@canary upgrade latest; then
    echo "✅ Next.js automated upgrade completed"
else
    echo "⚠️ Next.js upgrade had issues - manual review required"
fi

# Verify Next.js migration
echo "🔍 Verifying Next.js migration..."
if npm run build; then
    echo "✅ Next.js migration verification passed"
else
    echo "❌ Next.js migration verification failed"
    echo "Consider running: npx @next/codemod@canary app-router-migration"
fi
echo ""

# Phase 2: React 19 Automated Migration
echo "⚛️ Phase 2: React 19 Automated Migration..."
echo "Using official React codemods..."

if npx codemod@latest react/19/migration-recipe; then
    echo "✅ React 19 migration completed"
else
    echo "⚠️ React 19 migration had issues - manual review required"
fi

# React TypeScript migration
echo "📝 React 19 TypeScript Migration..."
if npx types-react-codemod@latest preset-19 ./src; then
    echo "✅ React TypeScript migration completed"
else
    echo "⚠️ React TypeScript migration had issues - manual review required"
fi

# Update TypeScript types
echo "🔧 Updating TypeScript types..."
if npm install --save-exact @types/react@^19.0.0 @types/react-dom@^19.0.0; then
    echo "✅ TypeScript types updated"
else
    echo "⚠️ TypeScript type update had issues"
fi
echo ""

# Phase 3: Project Structure Optimization (Optional)
echo "📁 Phase 3: Project Structure Optimization..."
echo "This phase is optional and can be run separately if needed:"
echo "  npx @next/codemod@canary app-router-migration"
echo "  npx jscodeshift -t custom-transforms/ src/"
echo ""

# Verification Phase
echo "✅ Phase 4: Verification..."

echo "🔍 Running type checking..."
if npm run typecheck; then
    echo "✅ TypeScript verification passed"
else
    echo "❌ TypeScript verification failed - manual fixes needed"
fi

echo "🔍 Running build verification..."
if npm run build; then
    echo "✅ Build verification passed"
else
    echo "❌ Build verification failed - manual fixes needed"
fi

echo "🔍 Running tests (if available)..."
if npm run test --silent --passWithNoTests; then
    echo "✅ Test verification passed"
else
    echo "⚠️ Test verification had issues"
fi

echo ""
echo "🎉 Modern Automated Migration Completed!"
echo ""
echo "📊 Migration Summary:"
echo "✅ Used official automated tools (vs manual scripts)"
echo "✅ AST-based transformations (vs text replacement)"
echo "✅ Incremental approach with verification"
echo "✅ Industry-proven methodologies"
echo ""
echo "🔄 Next Steps:"
echo "1. Review changes: git diff HEAD~1"
echo "2. Test functionality manually"
echo "3. Deploy to staging: vercel deploy"
echo "4. Deploy to production: vercel --prod"
echo ""
echo "🆘 Rollback Instructions (if needed):"
echo "git checkout main"
echo "git branch -D $MIGRATION_BRANCH"
echo "git checkout $BACKUP_BRANCH"
echo ""
echo "📚 For complex customizations, see:"
echo "- Next.js codemods: https://nextjs.org/docs/app/guides/upgrading/codemods"
echo "- React 19 guide: https://react.dev/blog/2024/04/25/react-19-upgrade-guide"
echo "- jscodeshift for custom transforms: https://github.com/facebook/jscodeshift"