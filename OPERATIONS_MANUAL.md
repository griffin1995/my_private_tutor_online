# OPERATIONS MANUAL - MY PRIVATE TUTOR ONLINE

**Last Updated**: November 10, 2025
**Purpose**: Deployment procedures, monitoring systems, maintenance workflows, and operational standards
**Audience**: DevOps, operations teams, deployment engineers

---

## TABLE OF CONTENTS

1. [Quick Reference](#quick-reference)
2. [Deployment Procedures](#deployment-procedures)
3. [Monitoring & Analytics](#monitoring--analytics)
4. [Security Operations](#security-operations)
5. [Performance Monitoring](#performance-monitoring)
6. [Backup & Recovery](#backup--recovery)
7. [Incident Response](#incident-response)
8. [Maintenance Workflows](#maintenance-workflows)
9. [CI/CD Pipeline](#cicd-pipeline)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## QUICK REFERENCE

### Emergency Contacts

**Production Issues**: See PROJECT_OVERVIEW.md for contact details
**Deployment Support**: +44 7513 550278
**Security Incidents**: Immediate escalation required

### Critical URLs

**Production**: https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app
**Vercel Dashboard**: https://vercel.com/dashboard
**GitHub Repository**: Private repository (authorized access only)

### Essential Commands

```bash
# Deployment (Vercel CLI ONLY)
vercel --prod                     # Deploy to production
vercel cache purge --type=cdn     # Clear CDN cache

# Build Verification
npm run build                     # Verify build locally
npm run lint                      # Code quality checks
npm run typecheck                 # TypeScript validation

# Monitoring
vercel logs --prod                # View production logs
vercel logs --prod --follow       # Stream production logs
```

---

## DEPLOYMENT PROCEDURES

### CRITICAL: Vercel CLI Deployment Only

**MANDATORY DEPLOYMENT METHOD**: Vercel CLI exclusively - NOT GitHub integration

**Why CLI Only**:
- GitHub integration is NOT used for automatic deployments
- GitHub is version control only
- All production deployments must be manually triggered
- Manual verification required before each deployment

### Pre-Deployment Checklist

**BEFORE deploying to production, verify ALL items**:

- [ ] Local build successful: `npm run build` completes without errors
- [ ] All 91 routes optimize successfully
- [ ] TypeScript compilation: `npm run typecheck` passes
- [ ] Code quality: `npm run lint` passes with zero errors
- [ ] CMS synchronous patterns verified (no async violations)
- [ ] Design tokens in use (no hardcoded colors)
- [ ] British English conventions maintained throughout
- [ ] Royal client quality standards met
- [ ] Test in development server: `npm run dev` works correctly

### Standard Deployment Workflow

**Step 1: Verify Build Locally**
```bash
# Clean build verification
npm run build

# Expected output: Build completes in ~11s with "✓ Compiled successfully"
# All 91 routes should optimize successfully
```

**Step 2: Run Quality Checks**
```bash
# TypeScript validation
npm run typecheck
# Expected: No errors

# Code quality
npm run lint
# Expected: No errors
```

**Step 3: Commit Changes**
```bash
# Stage changes
git add .

# Commit with descriptive message (British English)
git commit -m "feat: implement new testimonials section with royal client standards"

# Push to repository (version control only - does NOT trigger deployment)
git push origin main
```

**Step 4: Deploy via Vercel CLI**
```bash
# Deploy to production (MANUAL TRIGGER REQUIRED)
vercel --prod

# Follow prompts:
# - Confirm project: my-private-tutor-online
# - Confirm production deployment: Yes
# - Wait for deployment to complete
```

**Step 5: Verify Deployment**
```bash
# Check deployment status
vercel ls

# View production logs
vercel logs --prod

# Test production URL
curl -I https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app
```

**Step 6: Clear Cache (If Needed)**
```bash
# Clear CDN cache (e.g., for opengraph image updates)
vercel cache purge --type=cdn

# Verify cache cleared
curl -I https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app
```

### Emergency Rollback Procedure

**If production deployment fails or causes issues**:

**Step 1: Identify Last Working Deployment**
```bash
# List recent deployments
vercel ls

# Identify last working deployment ID
```

**Step 2: Rollback via Vercel Dashboard**
```
1. Go to Vercel Dashboard
2. Select project: my-private-tutor-online
3. Navigate to Deployments
4. Find last working deployment
5. Click "Promote to Production"
```

**Step 3: Verify Rollback**
```bash
# Check production status
vercel logs --prod

# Test production URL
curl -I https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app
```

**Step 4: Fix Issues Locally**
```bash
# Revert problematic changes
git revert <commit-hash>

# Or reset to last working commit
git reset --hard <commit-hash>

# Verify fix locally
npm run build

# Redeploy when ready
vercel --prod
```

### Deployment Best Practices

**1. Always Deploy During Low Traffic**:
- Preferred: Late evening (UK time)
- Avoid: Business hours, peak client consultation times

**2. Incremental Deployments**:
- Deploy small, focused changes
- Easier to identify issues
- Faster rollback if needed

**3. Monitor After Deployment**:
- Watch logs for 10-15 minutes post-deployment
- Check analytics for traffic patterns
- Verify core functionality (homepage, testimonials, contact)

**4. Document All Deployments**:
- Record deployment time
- Note changes deployed
- Document any issues encountered
- Update team on deployment status

---

## MONITORING & ANALYTICS

### Advanced Monitoring Infrastructure

**Operational Systems**:
- **performance-monitor.js**: Real-time performance tracking
- **performance-status.mjs**: Build and runtime monitoring
- **CMS Architecture Monitoring**: Runtime violation detection preventing async pattern regressions
- **Web Vitals Tracking**: Core Web Vitals monitoring operational

### Web Vitals Monitoring

**Key Metrics Tracked**:
- **LCP (Largest Contentful Paint)**: Target <2.5s
- **FID (First Input Delay)**: Target <100ms
- **CLS (Cumulative Layout Shift)**: Target <0.1
- **TTFB (Time to First Byte)**: Target <600ms
- **FCP (First Contentful Paint)**: Target <1.8s

**Monitoring Implementation**:
```typescript
// Web Vitals tracking in _app.tsx or layout.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = '/api/analytics/performance';

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

// Track all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Vercel Analytics

**Real-Time Performance Monitoring**:
```bash
# View analytics dashboard
vercel analytics

# View production logs
vercel logs --prod

# Stream live logs
vercel logs --prod --follow

# Filter logs by function
vercel logs --prod --function=api-route-name
```

**Key Analytics Metrics**:
- Page views and unique visitors
- Geographic distribution
- Device and browser breakdown
- Performance scores (LCP, FID, CLS)
- Error rates and types
- API route performance

### CMS Architecture Monitoring

**Runtime Violation Detection**:
```typescript
// CMS violation monitoring in cms-content.ts
export function monitorCMSAccess(functionName: string, isAsync: boolean) {
  if (isAsync) {
    console.error(`CRITICAL: Async CMS pattern detected in ${functionName}`);
    console.error('This violates synchronous CMS architecture requirements');
    console.error('See CLAUDE.md for mandatory patterns');

    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cms_violation', {
        event_category: 'Architecture',
        event_label: functionName,
        event_value: 1
      });
    }
  }
}
```

### Performance Monitoring Dashboard

**Build Performance Tracking**:
```bash
# Monitor build times
npm run build 2>&1 | tee build-log-$(date +%Y%m%d-%H%M%S).txt

# Parse build times
grep "Compiled successfully" build-log-*.txt

# Track over time
# Target: <11.0s build time maintained
```

**TypeScript Compilation Tracking**:
```bash
# Monitor TypeScript compilation
npm run typecheck 2>&1 | tee typecheck-log-$(date +%Y%m%d-%H%M%S).txt

# Parse compilation times
# Target: <5s compilation time (currently 4.956s)
```

---

## SECURITY OPERATIONS

### Enterprise Security Dashboard

**Royal Client Protection Patterns**:
- Compliance monitoring systems deployed
- Input validation: Zod schemas for all forms
- Data protection: GDPR compliant practices
- Accessibility: WCAG 2.1 AA compliance with error boundary resilience

### Security Audit Schedule

**Monthly Audits**:
```bash
# Run npm audit
npm audit

# Expected: 0 vulnerabilities (maintained since November 2025)

# If vulnerabilities found:
npm audit fix

# Verify build still works
npm run build
```

**Dependency Updates**:
```bash
# Check for outdated dependencies
npm outdated

# Update non-breaking changes
npm update

# Verify build still works
npm run build
```

### Input Validation Standards

**Zod Schemas for All Forms**:
```typescript
import { z } from 'zod';

// Quote form validation
const QuoteFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^(\+44|0)[1-9]\d{8,9}$/), // UK phone format
  subject: z.enum(['oxbridge', '11-plus', 'gcse', 'a-level']),
  message: z.string().min(10).max(1000),
});

// Contact form validation
const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});
```

### GDPR Compliance

**Data Protection Practices**:
- No sensitive data in client-side code
- Server-side validation for all forms
- Cookie consent implementation
- Privacy policy maintained
- Data retention policies enforced
- Right to erasure procedures documented

### Security Incident Response

**If Security Incident Detected**:

**Step 1: Immediate Actions**
```bash
# 1. Assess severity
# 2. Document incident details
# 3. Notify security team immediately
# 4. Preserve logs for investigation
```

**Step 2: Containment**
```bash
# If production compromised:
# 1. Rollback to last known good deployment
vercel ls
# 2. Identify compromised deployment
# 3. Promote last working deployment via dashboard
```

**Step 3: Investigation**
```bash
# Review logs
vercel logs --prod > incident-logs-$(date +%Y%m%d-%H%M%S).txt

# Analyse access patterns
# Identify attack vectors
# Document findings
```

**Step 4: Remediation**
```bash
# Fix vulnerability
# Update dependencies if needed
npm audit fix

# Verify fix
npm run build
npm run typecheck

# Deploy fix
vercel --prod
```

**Step 5: Post-Incident Review**
```
# Document lessons learned
# Update security procedures
# Implement additional monitoring
# Communicate with stakeholders
```

---

## PERFORMANCE MONITORING

### Build Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Build Time** | <11.0s | 11.0s | ✅ Maintained |
| **TypeScript Compilation** | <5s | 4.956s | ✅ Achieved |
| **Total Routes** | 91 | 91 | ✅ All optimized |
| **First Load JS** | 380KB | 607KB | 🎯 In progress |

### Performance Monitoring Procedures

**Daily Monitoring**:
```bash
# Check build performance
npm run build

# Expected: ~11s completion time
# If > 15s: Investigate performance regression
```

**Weekly Analysis**:
```bash
# Run comprehensive build analysis
npm run build -- --profile

# Analyse bundle sizes
# Review route optimization
# Check for performance regressions
```

**Monthly Review**:
```
# Review Web Vitals trends
# Analyse page load times
# Identify optimization opportunities
# Plan performance improvements
```

### Performance Degradation Response

**If Build Time > 15s**:

**Step 1: Identify Cause**
```bash
# Check for new dependencies
npm ls --depth=0

# Review recent changes
git log --oneline -10

# Analyse build output
npm run build -- --profile
```

**Step 2: Investigate**
```bash
# Check TypeScript compilation
npm run typecheck

# Review bundle sizes
# Identify slow routes
# Check for unoptimized assets
```

**Step 3: Remediate**
```bash
# Apply optimization techniques (see OPTIMIZATION_HISTORY.md)
# Remove unused dependencies
# Optimize images/assets
# Implement dynamic imports if needed
```

---

## BACKUP & RECOVERY

### Backup Strategy

**Git Repository**:
- All code versioned in Git
- Commits provide point-in-time recovery
- Branches for feature isolation
- Tags for release versions

**Vercel Deployments**:
- All deployments preserved in Vercel dashboard
- Easy rollback to any previous deployment
- Deployment history maintained
- Build logs archived

**Content Backup**:
```bash
# Backup CMS content
mkdir -p backups/content-$(date +%Y%m%d)
cp -r src/content/* backups/content-$(date +%Y%m%d)/

# Backup images
mkdir -p backups/images-$(date +%Y%m%d)
cp -r public/images/* backups/images-$(date +%Y%m%d)/
```

### Recovery Procedures

**Code Recovery (Git)**:
```bash
# Revert to specific commit
git revert <commit-hash>

# Or reset to specific point
git reset --hard <commit-hash>

# Verify recovery
npm run build
```

**Deployment Recovery (Vercel)**:
```
# Via Vercel Dashboard:
1. Go to Deployments
2. Find target deployment
3. Click "Promote to Production"
4. Verify recovery
```

**Content Recovery**:
```bash
# Restore CMS content from backup
cp -r backups/content-YYYYMMDD/* src/content/

# Verify content integrity
npm run build

# Redeploy if needed
vercel --prod
```

---

## INCIDENT RESPONSE

### Incident Classification

**Severity Levels**:

**P1 - Critical (Immediate Response)**:
- Production site completely down
- Security breach detected
- Data loss or corruption
- Revenue-impacting functionality broken

**P2 - High (1 hour response)**:
- Major feature broken (e.g., testimonials, contact form)
- Performance severely degraded
- Build failures preventing deployment

**P3 - Medium (4 hour response)**:
- Minor feature issues
- Styling problems
- Non-critical functionality affected

**P4 - Low (Next business day)**:
- Documentation updates needed
- Minor performance optimizations
- Non-user-facing issues

### Incident Response Workflow

**Step 1: Detection**
```
# How incidents are detected:
- Monitoring alerts (Vercel, analytics)
- User reports (client feedback)
- Internal testing
- Deployment failures
```

**Step 2: Triage**
```
# Assess incident:
1. Determine severity level (P1-P4)
2. Identify affected systems
3. Estimate user impact
4. Assign response team
```

**Step 3: Response**
```
# Immediate actions:
1. Communicate incident status
2. Begin investigation
3. Implement workaround if possible
4. Start fix development
```

**Step 4: Resolution**
```
# Fix and deploy:
1. Develop fix locally
2. Verify fix thoroughly
3. Deploy via standard procedures
4. Monitor for recurrence
```

**Step 5: Post-Mortem**
```
# Document incident:
1. Root cause analysis
2. Timeline of events
3. Lessons learned
4. Preventive measures
5. Update procedures
```

### Critical Incident Contacts

**Production Down (P1)**:
- Immediate escalation required
- Contact: See PROJECT_OVERVIEW.md
- Response time: Immediate

**Security Incident (P1)**:
- Immediate escalation required
- Preserve all logs
- Do not modify systems
- Contact security team immediately

---

## MAINTENANCE WORKFLOWS

### Weekly Maintenance

**Every Monday**:
```bash
# 1. Check for dependency updates
npm outdated

# 2. Run security audit
npm audit

# 3. Review build performance
npm run build

# 4. Check monitoring dashboards
vercel analytics

# 5. Review error logs
vercel logs --prod | grep ERROR
```

### Monthly Maintenance

**First Monday of Month**:
```bash
# 1. Update dependencies (non-breaking)
npm update

# 2. Verify build still works
npm run build

# 3. Run comprehensive tests
npm run test

# 4. Review performance metrics
# 5. Plan optimization work
# 6. Update documentation if needed
```

### Quarterly Maintenance

**Every Quarter**:
```
# 1. Major dependency review
# 2. Security audit comprehensive
# 3. Performance optimization planning
# 4. Architecture review
# 5. Documentation update comprehensive
# 6. Backup verification
```

---

## CI/CD PIPELINE

### Current CI/CD Status

**Deployment Method**: Manual via Vercel CLI
**Version Control**: Git (GitHub)
**Build System**: Next.js + Turbopack
**Quality Gates**: Manual verification before deployment

### Pre-Deployment Quality Gates

**Automated Checks** (run locally):
```bash
# 1. TypeScript compilation
npm run typecheck

# 2. Code quality (ESLint)
npm run lint

# 3. Build verification
npm run build

# 4. Test suite (when implemented)
npm run test
```

**Manual Checks**:
- Visual inspection in development server
- CMS synchronous patterns verified
- British English conventions maintained
- Royal client quality standards met
- Design tokens used (no hardcoded colors)

### Future CI/CD Enhancements (Planned)

**Phase 1**: Automated testing integration
**Phase 2**: Continuous integration (automated quality gates)
**Phase 3**: Automated deployment with manual approval
**Phase 4**: Comprehensive monitoring integration

---

## TROUBLESHOOTING GUIDE

### Common Issues & Solutions

#### Build Failures

**Problem**: Build fails with module not found
**Solution**:
```bash
# 1. Verify dependencies installed
npm install

# 2. Clear cache and rebuild
rm -rf .next
npm run build

# 3. Check import paths
# 4. Verify file extensions correct
```

**Problem**: TypeScript compilation errors
**Solution**:
```bash
# 1. Run typecheck to see errors
npm run typecheck

# 2. Fix type errors
# 3. Ensure interfaces match JSON structure
# 4. Add explicit return types
```

#### Deployment Issues

**Problem**: Deployment fails on Vercel
**Solution**:
```bash
# 1. Check build locally first
npm run build

# 2. Review Vercel logs
vercel logs --prod

# 3. Verify environment variables
# 4. Check for outdated dependencies
```

**Problem**: Cache not clearing
**Solution**:
```bash
# 1. Purge CDN cache
vercel cache purge --type=cdn

# 2. Wait 2-3 minutes
# 3. Hard refresh browser (Cmd+Shift+R)
# 4. Verify cache headers
curl -I <production-url>
```

#### Performance Issues

**Problem**: Build time > 15s
**Solution**:
```bash
# 1. Check for new dependencies
npm ls --depth=0

# 2. Review recent changes
git log --oneline -10

# 3. Analyse build profile
npm run build -- --profile

# 4. Apply optimization techniques
# See OPTIMIZATION_HISTORY.md
```

**Problem**: Page load slow
**Solution**:
```bash
# 1. Check Web Vitals
# 2. Analyse bundle sizes
# 3. Optimise images
# 4. Implement dynamic imports
# 5. Review third-party scripts
```

#### CMS Issues

**Problem**: Homepage sections not loading
**Solution**:
```bash
# 1. Check for async CMS patterns
# See DEVELOPMENT_GUIDE.md - Synchronous CMS Architecture

# 2. Verify direct JSON imports
# 3. Remove useState/useEffect for static content
# 4. Ensure synchronous function returns
```

**Problem**: Content not updating
**Solution**:
```bash
# 1. Verify JSON file changes committed
# 2. Rebuild application
npm run build

# 3. Redeploy to production
vercel --prod

# 4. Clear CDN cache
vercel cache purge --type=cdn
```

---

## OPERATIONAL CHECKLIST

### Daily Operations

- [ ] Monitor production logs for errors
- [ ] Check analytics for traffic patterns
- [ ] Review error rates
- [ ] Verify core functionality operational

### Weekly Operations

- [ ] Run security audit: `npm audit`
- [ ] Check for dependency updates: `npm outdated`
- [ ] Review build performance
- [ ] Analyse monitoring dashboards
- [ ] Review and triage any issues

### Monthly Operations

- [ ] Update dependencies (non-breaking): `npm update`
- [ ] Comprehensive security audit
- [ ] Performance metrics review
- [ ] Documentation updates
- [ ] Backup verification

### Quarterly Operations

- [ ] Major dependency review
- [ ] Architecture assessment
- [ ] Performance optimization planning
- [ ] Comprehensive documentation update
- [ ] Team training/knowledge transfer

---

**Last Updated**: November 10, 2025
**Maintained By**: Operations Team
**Contact**: See PROJECT_OVERVIEW.md for details

_Operations manual ensures reliable, secure, and high-performance operation of premium tutoring platform with royal client quality standards maintained throughout_
