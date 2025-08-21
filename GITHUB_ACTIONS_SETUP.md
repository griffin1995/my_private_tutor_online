# 🔐 GITHUB ACTIONS SETUP REQUIRED

## Critical Missing Configuration - Deployment Blocked

The CI/CD audit has identified missing authentication tokens that are preventing successful GitHub Actions workflows.

### 🚨 Required GitHub Secrets

Navigate to: `Settings > Secrets and variables > Actions > Repository secrets`

#### 1. LHCI_GITHUB_APP_TOKEN
- **Purpose**: Lighthouse CI GitHub integration for performance monitoring
- **Used in**: `.github/workflows/performance.yml` line 57
- **Setup Instructions**:
  1. Install Lighthouse CI GitHub App: https://github.com/apps/lighthouse-ci
  2. Generate token from Lighthouse CI dashboard
  3. Add as repository secret: `LHCI_GITHUB_APP_TOKEN`

#### 2. LHCI_BUILD_TOKEN (Optional)
- **Purpose**: Upload performance reports to LHCI server
- **Used in**: `lighthouserc.js` upload configuration
- **Setup Instructions**:
  1. Deploy LHCI server or use existing one
  2. Generate build token from server admin
  3. Add as repository secret: `LHCI_BUILD_TOKEN`

### 🎯 Royal Client Performance Standards

The performance monitoring workflow enforces these standards:
- **First Contentful Paint**: < 2s
- **Interactive**: < 5s  
- **Largest Contentful Paint**: < 4s
- **Speed Index**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 500ms
- **Performance Score**: ≥ 90%
- **Accessibility Score**: ≥ 95%
- **Best Practices Score**: ≥ 90%
- **SEO Score**: ≥ 95%

### ⚠️ Current Status

**DEPLOYMENT BLOCKED**: Performance monitoring workflow will fail until `LHCI_GITHUB_APP_TOKEN` is configured.

### 🔧 Alternative: Disable Performance Gates (Not Recommended)

If immediate deployment is needed, temporarily disable performance gates by commenting out the workflow:

```bash
# Rename to disable
mv .github/workflows/performance.yml .github/workflows/performance.yml.disabled
```

**⚠️ WARNING**: This compromises royal client quality standards and should only be temporary.

### 🚀 Post-Setup Verification

After configuring secrets:

1. **Test Workflow**: Create a test commit to trigger performance monitoring
2. **Check Logs**: Verify Lighthouse CI authentication succeeds
3. **Review Reports**: Confirm performance reports are generated
4. **Validate Gates**: Ensure deployment gates function correctly

### 📞 Support

If you need assistance with Lighthouse CI setup:
- GitHub Issue: Create issue with "ci/cd" label
- Documentation: https://github.com/GoogleChrome/lighthouse-ci
- Royal Client Support: Contact premium support team

---

**Generated for My Private Tutor Online - Royal Client Service Standards**