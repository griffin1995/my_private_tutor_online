# Deployment Guide - My Private Tutor Online

**Documentation Source**: Context7 MCP - Vercel Next.js Deployment  
**Platform**: Vercel Production Environment  
**Status**: ✅ PRODUCTION READY  
**Production URL**: https://myprivatetutoronline-991oq6we4-jacks-projects-cf5effed.vercel.app

---

## 🚀 Quick Start Deployment

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

## 📋 Pre-Deployment Checklist

### Essential Checks
- [ ] Run `npm run build` successfully
- [ ] Run `npm run typecheck` with no errors
- [ ] Run `npm run lint` with no errors
- [ ] Test all critical user paths locally
- [ ] Verify environment variables in `.env.local`
- [ ] Check video assets are optimised (<30MB total)
- [ ] Confirm British English throughout content

### Security Verification
- [ ] Admin authentication enabled
- [ ] CSP headers configured in `vercel.json`
- [ ] Environment variables marked as sensitive
- [ ] JWT_SECRET_KEY is 32+ characters
- [ ] No sensitive data in Git repository

---

## ⚙️ Vercel Configuration

### vercel.json Configuration
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

### Next.js Configuration for Dynamic Rendering
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

### Force Dynamic Rendering (Required for Framer Motion)
```typescript
// src/app/layout.tsx
export const dynamic = 'force-dynamic'
```

---

## 🔐 Environment Variables

### Required Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://myprivatetutoronline.com

# Admin Authentication (Required)
JWT_SECRET_KEY=your-super-secret-key-min-32-chars
ADMIN_USERNAME=admin@myprivatetutoronline.com
ADMIN_PASSWORD=secure-password-here

# Email Configuration (Optional)
EMAIL_FROM=noreply@myprivatetutoronline.com
EMAIL_TO=enquiries@myprivatetutoronline.com
RESEND_API_KEY=re_xxxxxxxxxxxx

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Vercel Environment Variables Setup
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add each variable with appropriate environment (Production/Preview/Development)
3. Mark sensitive variables as "Sensitive" to hide values
4. Redeploy after adding variables

---

## 🏗️ Build & Deployment Process

### Local Build Verification
```bash
# 1. Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# 2. Build the application
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Linting and type checking
# ✓ Collecting page data
# Route (app)                              Size     First Load JS
# ├ ƒ /                                   32.1 kB        229 kB
# └ ƒ /admin                              45.2 kB        242 kB
```

### Deployment Methods

#### Method 1: CLI Deployment (Quick)
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Method 2: Git Integration (Recommended)
1. Connect repository to Vercel
2. Push to main branch for production deployment
3. Push to other branches for preview deployments

#### Method 3: Manual Dashboard Deployment
1. Go to Vercel Dashboard
2. Click "Import Project"
3. Select Git repository
4. Configure environment variables
5. Deploy

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. React.Children.only Errors
**Issue**: Framer Motion components causing React.Children.only errors  
**Solution**: Ensure `dynamic = 'force-dynamic'` in layout.tsx and LazyMotion without strict mode

#### 2. Routes Manifest Error
**Issue**: "Failed to produce a routes-manifest.json"  
**Solution**: 
1. Remove `output: 'export'` from next.config.ts
2. Delete Vercel project and recreate if cache persists
3. Ensure no static export configuration remains

#### 3. Build Timeout
**Issue**: Build exceeds time limit  
**Solution**: 
- Increase maxDuration in vercel.json
- Optimise bundle size (remove unused dependencies)
- Use dynamic imports for heavy components

#### 4. Environment Variables Not Working
**Issue**: Variables undefined in production  
**Solution**:
- Prefix client variables with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

#### 5. Video Loading Issues
**Issue**: Videos not playing or loading slowly  
**Solution**:
- Ensure videos are in /public/videos/
- Compress videos to <30MB each
- Use poster images for loading state
- Implement progressive loading

---

## 📊 Performance Optimisation

### Build Performance Targets
- **Build Time**: <15 seconds
- **First Load JS**: <250kB per route
- **Bundle Size**: <150kB per chunk

### Monitoring Setup
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

---

## 🚨 Production Deployment Checklist

### Before Deployment
- [ ] All tests passing
- [ ] Security audit complete
- [ ] Performance targets met
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Content reviewed for British English
- [ ] Client approval received

### During Deployment
- [ ] Monitor build logs for errors
- [ ] Verify all routes accessible
- [ ] Check environment variables loaded
- [ ] Test critical user journeys

### After Deployment
- [ ] Verify production URL works
- [ ] Test admin authentication
- [ ] Check all forms submit correctly
- [ ] Monitor error tracking
- [ ] Review Core Web Vitals
- [ ] Announce deployment to team

---

## 🔄 Rollback Procedure

### Immediate Rollback
```bash
# Via CLI
vercel rollback

# Via Dashboard
# Go to Deployments → Select previous deployment → Promote to Production
```

### Rollback Criteria
- Critical functionality broken
- Security vulnerability discovered
- Performance degradation >50%
- Major visual regression

---

## 📝 Deployment History

### Latest Successful Deployment
- **Date**: August 2025
- **Version**: v2.0.0
- **Features**: Dynamic rendering, Framer Motion, Admin authentication
- **Build Time**: 14.2s
- **Status**: ✅ Production

### Key Milestones
- Initial deployment with static export
- Migration to dynamic rendering
- React.Children.only fix implementation
- Security hardening complete
- Performance optimisation achieved

---

## 🔗 Useful Resources

### Vercel Documentation
- [Vercel Deployment Docs](https://vercel.com/docs/deployments)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/environment-variables)

### Monitoring Dashboards
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Analytics](https://vercel.com/analytics)
- [Speed Insights](https://vercel.com/insights)

### Support
- **Technical Issues**: Use Vercel support
- **Application Issues**: Check error logs in Vercel dashboard
- **Performance Issues**: Review Speed Insights metrics

---

**Last Updated**: August 2025  
**Maintained By**: Development Team  
**Documentation Standard**: Context7 MCP Compliant