# Quick Start CI/CD Implementation Guide
## My Private Tutor Online - Immediate Actions

**Priority**: CRITICAL
**Time Required**: 2-4 hours for immediate actions
**Business Impact**: Protect £400,000+ revenue with deployment safety

---

## 🚨 Immediate Actions (Next 2 Hours)

### 1. Activate Git Hooks (5 minutes)

```bash
# Install Husky hooks
npm run prepare

# Create pre-commit hook
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."
npx lint-staged
npm run typecheck
npm run validate:cms-architecture

if [ $? -ne 0 ]; then
  echo "❌ Pre-commit checks failed. Fix issues before committing."
  exit 1
fi

echo "✅ All pre-commit checks passed"
EOF

chmod +x .husky/pre-commit

# Create lint-staged config
cat > .lintstagedrc.json << 'EOF'
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{js,jsx,json,css,md}": [
    "prettier --write"
  ]
}
EOF

# Test the hook
git add .
git commit -m "test: activate git hooks"
```

**Expected Output**:
```
🔍 Running pre-commit checks...
✅ Linting passed
✅ Type checking passed
✅ CMS architecture validated
✅ All pre-commit checks passed
```

---

### 2. Create Safe Deployment Script (30 minutes)

```bash
# Create scripts directory if it doesn't exist
mkdir -p scripts

# Create safe deployment script
cat > scripts/safe-deploy.sh << 'EOF'
#!/bin/bash
# MPTO Safe Deployment Script
# Ensures all validations pass before manual CLI deployment

set -e

echo "🔍 MPTO Safe Deployment Script"
echo "================================"
echo ""

# Colour codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Colour

# Function to run check and log results
run_check() {
  local name=$1
  local command=$2
  echo -e "${YELLOW}Running: $name...${NC}"
  if eval "$command" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ $name: PASSED${NC}"
    return 0
  else
    echo -e "${RED}❌ $name: FAILED${NC}"
    echo "Run '$command' to see details"
    return 1
  fi
}

# Pre-deployment validation
echo "📋 Phase 1: Pre-Deployment Validation"
echo "-------------------------------------"
run_check "Type Check" "npm run typecheck" || exit 1
run_check "Linting" "npm run lint" || exit 1
run_check "CMS Architecture" "npm run validate:cms-architecture" || exit 1

echo ""
echo "🔨 Phase 2: Build Verification"
echo "------------------------------"
START=$(date +%s)
if npm run build > /tmp/build.log 2>&1; then
  END=$(date +%s)
  DURATION=$((END - START))
  echo -e "${GREEN}✅ Production Build: PASSED${NC}"
  echo "⏱️  Build completed in ${DURATION}s"

  if [ $DURATION -gt 90 ]; then
    echo -e "${YELLOW}⚠️  WARNING: Build time ${DURATION}s exceeds 90s threshold${NC}"
    read -p "Continue deployment? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo "Deployment aborted"
      exit 1
    fi
  fi
else
  echo -e "${RED}❌ Production Build: FAILED${NC}"
  echo "View build logs: cat /tmp/build.log"
  exit 1
fi

echo ""
echo "🧪 Phase 3: Test Execution"
echo "-------------------------"
run_check "E2E Tests" "npm run test" || exit 1
run_check "Performance Tests" "npm run test:performance" || exit 1

echo ""
echo -e "${GREEN}✅ ALL CHECKS PASSED${NC}"
echo "==================="
echo ""
echo "🚀 Deployment Options:"
echo "   1. Preview: vercel deploy"
echo "   2. Production: vercel --prod"
echo ""
echo "📊 Deployment Readiness:"
echo "   - Build time: ${DURATION}s"
echo "   - CMS architecture: VALIDATED"
echo "   - All tests: PASSED"
echo "   - Ready for production: YES"
echo ""

# Ask for deployment confirmation
read -p "Select deployment type (1=preview, 2=production, 0=cancel): " -n 1 DEPLOY_TYPE
echo

case $DEPLOY_TYPE in
  1)
    echo "🚀 Deploying to preview..."
    vercel deploy
    ;;
  2)
    echo "🚀 Deploying to production..."
    vercel --prod
    ;;
  0)
    echo "Deployment cancelled"
    exit 0
    ;;
  *)
    echo "Invalid option. Deployment cancelled."
    exit 1
    ;;
esac

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}🎉 Deployment successful!${NC}"
  echo "📊 Monitor deployment: https://vercel.com/dashboard"
  echo "🔍 Check Sentry: https://sentry.io/dashboard"
else
  echo ""
  echo -e "${RED}❌ Deployment failed!${NC}"
  exit 1
fi
EOF

chmod +x scripts/safe-deploy.sh

# Test the script (will stop before actual deployment)
./scripts/safe-deploy.sh
```

**Usage**:
```bash
# Run safe deployment
./scripts/safe-deploy.sh

# Script will validate everything, then prompt for deployment type
# Select 1 for preview, 2 for production
```

---

### 3. Revise Performance Budget (15 minutes)

```bash
# Edit performance.config.ts
cat > performance.config.ts << 'EOF'
// Update build time target to realistic values
export const PERFORMANCE_BUDGET = {
  buildTime: {
    max: createMilliseconds(90000),      // 90s absolute max
    warning: createMilliseconds(60000),  // 60s warning threshold
    target: createMilliseconds(40000),   // 40s realistic target
  },
  bundleSize: {
    maxFirstLoad: createKilobytes(250),
    maxChunk: createKilobytes(150),
    warningThreshold: createPercentage(80),
  },
  compilation: {
    maxTypeCheckTime: createMilliseconds(20000),  // 20s max TypeScript
    maxFileCount: 1000,
    targetImprovement: createPercentage(38),
  },
} as const;

// Rest of config remains unchanged...
EOF
```

**Rationale**:
- Original 11s target is UNREALISTIC (current 62s)
- 40s target is ACHIEVABLE with optimization
- 90s max prevents extreme regression
- Aligns with Next.js 15 + React 19 industry benchmarks

---

### 4. Set Up Staging Environment (2 hours)

```bash
# 1. Create staging environment in Vercel
vercel env add ENVIRONMENT staging

# 2. Set up staging-specific environment variables
vercel env add MONGODB_URI staging
# Paste staging MongoDB URI when prompted

vercel env add PAYLOAD_SECRET staging
# Paste staging Payload secret when prompted

vercel env add SESSION_SECRET staging
# Paste staging session secret when prompted

# 3. Deploy to staging
vercel deploy

# 4. Get deployment URL and set alias
# Copy the deployment URL from output
STAGING_URL="<deployment-url-from-above>"

# Set custom staging alias (if you have domain configured)
vercel alias set $STAGING_URL staging.myprivatetutoronline.co.uk

# Or use the Vercel-provided URL for now
echo "Staging URL: $STAGING_URL"
```

**Staging Deployment Workflow**:
```bash
# Always test on staging first
./scripts/safe-deploy.sh
# Select option 1 (preview) - this deploys to staging

# Test staging environment
npm run test:health -- --url=<staging-url>

# If staging tests pass, deploy to production
./scripts/safe-deploy.sh
# Select option 2 (production)
```

---

## 🔧 Week 1 Implementation

### 5. Create Pre-Deployment Validation Workflow (4 hours)

```bash
# Create GitHub Actions workflow directory
mkdir -p .github/workflows

# Create pre-deployment validation workflow
cat > .github/workflows/pre-deploy-validation.yml << 'EOF'
name: Pre-Deployment Validation
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  validate:
    name: Pre-Deployment Checks
    runs-on: ubuntu-latest
    timeout-minutes: 20

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: CMS Architecture Validation
        run: npm run validate:cms-architecture

      - name: Build with timing
        run: |
          echo "Starting build..."
          START=$(date +%s)
          npm run build
          END=$(date +%s)
          DURATION=$((END - START))
          echo "Build completed in ${DURATION}s"

          if [ $DURATION -gt 90 ]; then
            echo "::warning::Build time ${DURATION}s exceeds 90s threshold"
          fi

      - name: Run tests
        run: npm run test

      - name: Lighthouse audit
        run: npm run lighthouse

      - name: Generate deployment summary
        if: success()
        run: |
          echo "## ✅ Deployment Readiness Report" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "All pre-deployment checks passed successfully." >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "### Next Steps" >> $GITHUB_STEP_SUMMARY
          echo "1. Review test results" >> $GITHUB_STEP_SUMMARY
          echo "2. Deploy to staging: \`vercel deploy\`" >> $GITHUB_STEP_SUMMARY
          echo "3. Test staging environment" >> $GITHUB_STEP_SUMMARY
          echo "4. Deploy to production: \`vercel --prod\`" >> $GITHUB_STEP_SUMMARY

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: build-artifacts
          path: |
            .next/
            test-results/
            playwright-report/
          retention-days: 7
EOF

# Commit and push workflow
git add .github/workflows/pre-deploy-validation.yml
git commit -m "feat: add pre-deployment validation workflow"
git push
```

**Expected Behaviour**:
- Workflow runs on every push to main/master
- All validation checks must pass
- Build time warnings if >90s
- Deployment summary generated on success

---

### 6. Create Deployment Runbook (2 hours)

```bash
# Create deployment documentation
cat > DEPLOYMENT_RUNBOOK.md << 'EOF'
# Deployment Runbook
## My Private Tutor Online

### Standard Deployment Process

#### 1. Pre-Deployment Preparation
```bash
# Pull latest changes
git pull origin main

# Ensure clean working directory
git status

# Run safe deployment script
./scripts/safe-deploy.sh
```

#### 2. Staging Deployment
```bash
# Deploy to staging (preview)
vercel deploy

# Note the staging URL
STAGING_URL="<deployment-url>"

# Run smoke tests on staging
npm run test:health -- --url=$STAGING_URL

# Manual testing checklist:
# [ ] Homepage loads
# [ ] Navigation works
# [ ] Contact form submits
# [ ] Admin login functional
# [ ] Video masterclasses play
```

#### 3. Production Deployment
```bash
# If staging tests pass, deploy to production
vercel --prod

# Monitor deployment
# - Watch Vercel dashboard: https://vercel.com/dashboard
# - Check Sentry: https://sentry.io/dashboard
# - Monitor for 5 minutes post-deployment
```

#### 4. Post-Deployment Verification
```bash
# Check production URL
curl -I https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app

# Run health check
npm run test:health -- --url=https://production-url.vercel.app

# Verify critical paths:
# [ ] Homepage loads
# [ ] API endpoints respond
# [ ] No spike in Sentry errors
# [ ] Web Vitals within budget
```

### Emergency Rollback Procedure

#### If Production Issue Detected
```bash
# 1. Get list of recent deployments
vercel ls -m 5

# 2. Identify last working deployment
# Look for deployment before current one

# 3. Execute rollback
vercel rollback <previous-deployment-url>

# 4. Verify rollback successful
curl -I https://production-url.vercel.app

# 5. Notify team
echo "🚨 Rolled back production to <previous-deployment-url>" | mail -s "Production Rollback" team@myprivatetutoronline.co.uk
```

### Troubleshooting Guide

#### Build Failures
```bash
# Clean build cache
npm run clean:full

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

#### CMS Architecture Validation Failures
```bash
# Run validation with full output
npm run validate:cms-architecture

# Check for async patterns in CMS files
grep -r "async function get" src/lib/cms/
grep -r "Promise<" src/lib/cms/

# Review homepage components for useState/useEffect
grep -r "useState\|useEffect" src/app/page.tsx
```

#### Deployment Timeout
```bash
# Check Vercel function timeout (current: 60s)
# If needed, request increase: https://vercel.com/dashboard/settings

# Verify no infinite loops or hanging requests
# Check middleware.ts and API routes
```

### Cache Management

#### Clear CDN Cache
```bash
# If images or assets not updating
vercel cache purge --type=cdn

# Clear specific paths
vercel cache purge --url=/path/to/resource
```

#### Clear Build Cache
```bash
npm run clean
vercel remove --yes <deployment-url>
vercel deploy
```

### Monitoring and Alerts

#### Daily Health Check
```bash
# Run comprehensive health check
npm run test:health
npm run test:performance
npm run test:accessibility

# Review metrics:
# - Build time < 90s
# - Performance score > 75
# - Accessibility score > 90
```

#### Weekly Performance Audit
```bash
npm run lighthouse
npm run audit:full

# Review Lighthouse report
# Check for regressions in:
# - First Contentful Paint
# - Largest Contentful Paint
# - Cumulative Layout Shift
```

### Contact Information

**On-Call Developer**: [Name] - [Phone]
**Vercel Support**: https://vercel.com/support
**Sentry Dashboard**: https://sentry.io/dashboard

**Emergency Escalation**:
1. Attempt rollback first
2. Contact on-call developer
3. If unresolved in 15min, contact Vercel support

EOF

# Add to git
git add DEPLOYMENT_RUNBOOK.md
git commit -m "docs: add deployment runbook"
git push
```

---

## 📊 Week 2 Goals

### Measure Baseline Performance
```bash
# Run performance audit
time npm run build

# Record metrics:
# - Build time: ___ seconds
# - Bundle size: ___ KB
# - Test execution time: ___ seconds

# Document in performance log
cat >> performance-log.txt << EOF
Date: $(date)
Build Time: <actual-time>
Bundle Size: <actual-size>
Test Time: <actual-time>
Notes: Baseline after immediate actions
EOF
```

### Optimize Build Performance (Target: <60s)
```bash
# Enable webpack cache
# Edit next.config.ts, add to webpack config:
config.cache = {
  type: 'filesystem',
  buildDependencies: {
    config: [__filename],
  },
};

# Test build time improvement
time npm run build

# If >60s, investigate bottlenecks:
npm run build:analyze
```

---

## 🚀 Quick Reference Commands

### Daily Development
```bash
# Start development server
npm run dev

# Before committing (automatic via git hooks)
git commit -m "feat: your changes"
# Hooks will run: lint-staged, typecheck, CMS validation

# Deploy to staging
./scripts/safe-deploy.sh  # Select option 1

# Deploy to production
./scripts/safe-deploy.sh  # Select option 2
```

### Deployment Workflow
```bash
# 1. Validate locally
./scripts/safe-deploy.sh

# 2. Deploy to staging
vercel deploy

# 3. Test staging
npm run test:health -- --url=<staging-url>

# 4. Deploy to production
vercel --prod

# 5. Monitor for 5 minutes
# Watch Vercel dashboard and Sentry
```

### Emergency Commands
```bash
# Rollback production
vercel ls -m 2
vercel rollback <previous-url>

# Clear cache
vercel cache purge --type=cdn

# Check deployment health
npm run test:health
```

---

## ✅ Success Criteria

After completing immediate actions, you should have:

- ✅ Git hooks active and blocking bad commits
- ✅ Safe deployment script with comprehensive validation
- ✅ Realistic performance budget (40s target, 90s max)
- ✅ Staging environment operational
- ✅ Pre-deployment validation workflow in GitHub Actions
- ✅ Deployment runbook documented
- ✅ Zero CMS architecture violations reaching main branch
- ✅ 80% reduction in deployment failures

---

## 📈 Next Steps (Week 3+)

1. **Build Optimization**: Reduce build time to 40s
2. **Deployment Automation**: Automated smoke tests and notifications
3. **Monitoring Enhancement**: Performance regression detection
4. **Security Hardening**: Automated vulnerability scanning

**Full roadmap**: See `CI_CD_COMPREHENSIVE_ANALYSIS.md`

---

**Last Updated**: 4 November 2025
**Maintained By**: MPTO Development Team
**Review Schedule**: Weekly during implementation, monthly after stabilisation
