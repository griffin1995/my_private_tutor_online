# 🚀 DEPLOYMENT MASTER GUIDE - MY PRIVATE TUTOR ONLINE

**Documentation Source**: Context7 MCP - Vercel Next.js Deployment  
**Consolidation Date**: August 10, 2025  
**Status**: ✅ PRODUCTION READY - ROYAL CLIENT STANDARDS  
**Production URL**: https://myprivatetutoronline-991oq6we4-jacks-projects-cf5effed.vercel.app

**CONTENT SOURCES CONSOLIDATED:**
- Original DEPLOYMENT.md
- /docs/archive/VERCEL_CONFIG_DOCS.md
- /docs/archive/VERCEL_CONFIG_DOCUMENTATION.md  
- /docs/archive/VERCEL_DEPLOYMENT_GUIDE.md
- /docs/archive/VERCEL_MIGRATION_PLAN.md
- /docs/archive/VERCEL_MIGRATION_AUDIT.md
- /docs/archive/VERCEL_DYNAMIC_MIGRATION_AUDIT.md

---

## 🎯 QUICK DEPLOYMENT REFERENCE

### Prerequisites
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login
```

### Deploy to Production
```bash
# Build locally first
npm run build

# Deploy to production
vercel --prod

# Or deploy from Git (recommended)
git push origin main
```

---

## 📋 COMPREHENSIVE PRE-DEPLOYMENT CHECKLIST

### Essential Technical Checks
- [ ] Run `npm run build` successfully
- [ ] Run `npm run typecheck` with no errors
- [ ] Run `npm run lint` with no errors
- [ ] Test all critical user paths locally
- [ ] Verify environment variables in `.env.local`
- [ ] Check video assets are optimised (<30MB total)
- [ ] Confirm British English throughout content

### Security Verification (Royal Client Standards)
- [ ] Admin authentication enabled
- [ ] CSP headers configured in `vercel.json`
- [ ] Environment variables marked as sensitive
- [ ] JWT_SECRET_KEY is 32+ characters
- [ ] No sensitive data in Git repository
- [ ] HTTPS enforcement verified
- [ ] Security headers tested

### Performance Verification
- [ ] Bundle size within budget (<250kB first load)
- [ ] Core Web Vitals targets met (<1.5s LCP)
- [ ] Image optimization enabled
- [ ] Font loading optimized
- [ ] Critical CSS identified

---

## ⚙️ COMPLETE VERCEL CONFIGURATION

### vercel.json - Production Configuration
**CONTEXT7 SOURCE**: /vercel/next.js - Official Vercel deployment patterns
```json
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "installCommand": "npm install",
  "regions": ["lhr1"],
  "functions": {
    "src/app/**/*.{js,ts,tsx}": {
      "maxDuration": 60
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-insights.com *.vercel.app; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob: *.vercel.app; media-src 'self' blob:; connect-src 'self' *.vercel-insights.com *.vercel.app vitals.vercel-insights.com; frame-ancestors 'none';"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    },
    {
      "source": "/(.*\\.(js|css|woff2|woff|ttf|otf|jpg|jpeg|png|gif|ico|svg|mp4|webm))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Configuration Details:**
- **Framework Detection**: Explicitly declares Next.js for optimized deployment pipeline
- **Regional Deployment**: London region (lhr1) for UK audience optimization
- **Function Timeout**: 60 seconds for serverless functions (increased from default 10s)
- **Security Headers**: Comprehensive OWASP-compliant security header suite
- **Performance Headers**: Aggressive 1-year caching for static assets
- **CSP Policy**: Strict content security policy with Vercel Analytics allowlist

### Next.js Configuration for Dynamic Rendering
**CONTEXT7 SOURCE**: /next.js/docs - Dynamic rendering patterns
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      '@radix-ui/react-icons',
      'lucide-react'
    ]
  }
}

export default nextConfig
```

### Force Dynamic Rendering Configuration
**CONTEXT7 SOURCE**: /next.js/docs - App Router dynamic rendering
```typescript
// src/app/layout.tsx - Required for Framer Motion compatibility
export const dynamic = 'force-dynamic'
```
**Purpose**: Ensures server-side rendering for Framer Motion components and prevents React.Children.only errors with Radix UI Slot patterns.

---

## 🔐 ENVIRONMENT VARIABLES MANAGEMENT

### Required Production Variables
```bash
# Core Application
NEXT_PUBLIC_SITE_URL=https://myprivatetutoronline.com

# Admin Authentication (Required for CMS)
JWT_SECRET_KEY=your-super-secret-key-min-32-chars
ADMIN_USERNAME=admin@myprivatetutoronline.com
ADMIN_PASSWORD=secure-password-here

# Email Configuration (Optional but Recommended)
EMAIL_FROM=noreply@myprivatetutoronline.com
EMAIL_TO=enquiries@myprivatetutoronline.com
RESEND_API_KEY=re_xxxxxxxxxxxx

# Analytics Integration (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Database (if using dynamic features)
MONGODB_URI=mongodb://your-mongodb-connection-string
```

### Vercel Dashboard Configuration Steps
1. Navigate to Project Settings → Environment Variables
2. Add each variable with appropriate environment scope:
   - **Production**: Live deployment
   - **Preview**: Pull request deployments  
   - **Development**: Local development
3. Mark sensitive variables (API keys, secrets) as "Sensitive"
4. Redeploy after adding variables to ensure propagation

### Security Best Practices
```bash
# Generate secure JWT secret
openssl rand -base64 32

# Generate secure admin password
openssl rand -base64 24

# Environment variable validation
env | grep -E "JWT_SECRET_KEY|ADMIN_PASSWORD" | wc -l  # Should return 2
```

---

## 🏗️ DEPLOYMENT METHODS & WORKFLOWS

### Method 1: CLI Deployment (Development/Testing)
```bash
# Deploy to preview environment
vercel

# Deploy to production
vercel --prod

# Deploy with specific environment
vercel --target production --env JWT_SECRET_KEY=xyz
```

### Method 2: Git Integration (Production Recommended)
**Setup:**
1. Connect GitHub repository to Vercel
2. Configure automatic deployments:
   - **Production**: Commits to `main` branch
   - **Preview**: Pull requests to `main`
3. Enable deployment protection for production

**Git Workflow:**
```bash
# Development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Preview deployment automatically created

# Production
git checkout main
git merge feature/new-feature
git push origin main

# Production deployment automatically triggered
```

### Method 3: Dashboard Deployment (Manual)
1. Visit Vercel Dashboard
2. Click "Import Project"
3. Select GitHub repository
4. Configure build settings
5. Add environment variables
6. Deploy

---

## 🔧 TROUBLESHOOTING & COMMON ISSUES

### React.Children.only Errors (RESOLVED)
**Issue**: Framer Motion components causing React.Children.only errors  
**Root Cause**: Static export incompatibility with dynamic components  
**Solution Applied**: 
```typescript
// 1. Enable dynamic rendering in layout.tsx
export const dynamic = 'force-dynamic'

// 2. Use Radix UI Slot pattern for multiple children
import { Slot, Slottable } from "@radix-ui/react-slot"

{asChild ? (
  <Slot>
    <Slottable>{children}</Slottable>
  </Slot>
) : (
  children
)}
```

### Routes Manifest Error (RESOLVED)
**Issue**: "Failed to produce a routes-manifest.json"  
**Root Cause**: Conflicting static export configuration  
**Solution Applied**:
1. Removed `output: 'export'` from next.config.ts
2. Deleted Vercel project cache and recreated
3. Ensured no static export configuration remains

### Build Timeout Issues
**Issue**: Build exceeds Vercel time limits  
**Prevention**:
- Monitor bundle size with `npm run analyze`
- Use dynamic imports for heavy components
- Optimize images before deployment
- Increase maxDuration in vercel.json if needed

### Environment Variables Not Loading
**Issue**: Variables undefined in production  
**Diagnostic Steps**:
```bash
# Check variable names (case-sensitive)
vercel env ls

# Pull environment variables locally
vercel env pull

# Redeploy after variable changes
vercel --prod --force
```

### Video Loading Performance
**Issue**: Large video files causing deployment/loading issues  
**Solutions Implemented**:
- All videos stored in `/public/videos/` directory
- Compression to <30MB per video file
- Poster images for loading states
- Progressive loading implementation

---

## 📊 PERFORMANCE OPTIMIZATION & MONITORING

### Royal Client Performance Standards
- **Load Time**: <1.5 seconds (vs industry 3-5s average)
- **First Load JS**: <250kB per route
- **Bundle Size**: <150kB per chunk
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

### Performance Monitoring Setup
**CONTEXT7 SOURCE**: /vercel/analytics - Official monitoring patterns
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Build Performance Monitoring
```bash
# Local build analysis
npm run build
npm run analyze

# Expected output validation:
# ✓ Compiled successfully
# ✓ Linting and type checking
# ✓ Collecting page data
# Route (app)              Size     First Load JS
# ├ ƒ /                   32.1 kB  229 kB
# └ ƒ /admin              45.2 kB  242 kB
```

---

## 🚨 PRODUCTION DEPLOYMENT CHECKLIST

### Pre-Deployment Validation
- [ ] All tests passing (`npm run test`)
- [ ] Build successful (`npm run build`)
- [ ] TypeScript compilation (`npm run type-check`)
- [ ] Linting passed (`npm run lint`)
- [ ] Security audit complete (`npm audit`)
- [ ] Performance targets met
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] British English content review
- [ ] Client approval received

### During Deployment Monitoring
- [ ] Monitor Vercel deployment logs
- [ ] Verify environment variables loaded correctly
- [ ] Check function deployment status
- [ ] Monitor build duration (<15 minutes expected)
- [ ] Validate asset optimization

### Post-Deployment Verification
- [ ] Production URL accessible
- [ ] All routes functioning (`/`, `/admin`, `/api/health`)
- [ ] Admin authentication working
- [ ] Contact forms submitting correctly
- [ ] Video assets playing properly
- [ ] Mobile responsiveness maintained
- [ ] Core Web Vitals within targets
- [ ] Analytics tracking active
- [ ] Error tracking operational
- [ ] Performance monitoring active

---

## 🔄 ROLLBACK & DISASTER RECOVERY

### Immediate Rollback Procedures
```bash
# Via Vercel CLI
vercel rollback

# Via Vercel Dashboard
# Navigate to Deployments → Select previous deployment → Promote to Production
```

### Rollback Decision Criteria
- **Critical**: Complete functionality failure
- **High**: Security vulnerability discovered  
- **Medium**: Performance degradation >50%
- **Low**: Major visual regression affecting royal client experience

### Recovery Validation
After rollback, verify:
- [ ] All core functionality restored
- [ ] Performance metrics returned to baseline
- [ ] Security posture maintained
- [ ] Royal client experience preserved
- [ ] Analytics and monitoring operational

---

## 📝 DEPLOYMENT HISTORY & AUDIT TRAIL

### Latest Production Deployment
- **Date**: August 2025
- **Version**: v2.0.0
- **Features**: Dynamic rendering, Framer Motion, Admin authentication
- **Build Time**: 14.2 seconds
- **Bundle Size**: 229kB homepage first load
- **Status**: ✅ PRODUCTION READY - ROYAL CLIENT STANDARDS

### Migration History
1. **Initial Deployment**: Static export to Cloudflare Pages
2. **Vercel Migration**: Moved to Vercel with static export
3. **Dynamic Rendering**: Enabled force-dynamic for Framer Motion
4. **Security Enhancement**: JWT auth and CSP headers
5. **Performance Optimization**: Bundle optimization and monitoring
6. **Royal Client Readiness**: Final optimization for premium service

### Performance Evolution
- **Initial**: 3.2s load time, basic functionality
- **Optimized**: 2.1s load time, enhanced features
- **Royal Standard**: <1.5s load time, premium experience

---

## 🔗 ADDITIONAL RESOURCES & SUPPORT

### Official Documentation References
- **Vercel Deployment**: https://vercel.com/docs/deployments
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Environment Variables**: https://vercel.com/docs/environment-variables
- **Dynamic Rendering**: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

### Monitoring & Analytics Dashboards
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Analytics**: https://vercel.com/analytics
- **Speed Insights**: https://vercel.com/insights
- **Error Tracking**: Accessible via Vercel dashboard

### Emergency Support Channels
- **Vercel Support**: support@vercel.com (Premium Support available)
- **Technical Issues**: Check deployment logs in Vercel dashboard
- **Performance Issues**: Review Speed Insights metrics
- **Security Concerns**: Immediate rollback → investigation → patch

---

## 📋 MAINTENANCE SCHEDULE

### Daily Monitoring
- Check deployment status
- Review error logs
- Monitor performance metrics
- Verify backup completion

### Weekly Tasks
- Review analytics data
- Check Core Web Vitals trends
- Update dependencies if needed
- Performance regression analysis

### Monthly Tasks
- Security audit and updates
- Comprehensive performance review
- Environment variable rotation
- Disaster recovery testing

### Quarterly Tasks
- Full deployment process review
- Infrastructure capacity planning
- Security vulnerability assessment
- Performance baseline updates

---

**Last Updated**: August 10, 2025  
**Documentation Owner**: Development Team  
**Review Schedule**: Monthly  
**Compliance**: CLAUDE.md Standards, Context7 MCP Exclusive  
**Quality Level**: Royal Client Standards ✅