# Vercel Deployment Guide - My Private Tutor Online

## Pre-Deployment Checklist

### ✅ Completed Changes
1. **Analytics Integration**
   - Added `@vercel/analytics` to layout.tsx
   - Added `@vercel/speed-insights` to layout.tsx
   - Components properly configured with documentation

2. **Configuration Files**
   - Created `vercel.json` with optimal settings
   - Created `.env.local.example` with full documentation
   - Created alternative `next.config.vercel.ts` for future migration

3. **Documentation**
   - Full migration audit completed
   - Environment variables documented
   - Deployment process outlined

## Deployment Steps

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Configure Environment Variables

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Import your GitHub repository
3. Navigate to Settings > Environment Variables
4. Add the following:

```bash
# Required Variables
NEXT_PUBLIC_SITE_URL=https://myprivatetutoronline.com
TINA_PUBLIC_IS_LOCAL=false
NEXTAUTH_SECRET=[generate with: openssl rand -base64 32]
GITHUB_OWNER=griffin1995
GITHUB_REPO=my_private_tutor_online

# Optional but Recommended
GITHUB_PERSONAL_ACCESS_TOKEN=[your PAT]
MONGODB_URI=[your MongoDB connection string]
```

#### Option B: Via CLI
```bash
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add TINA_PUBLIC_IS_LOCAL production
# ... repeat for all variables
```

### Step 4: Deploy

#### Initial Deployment
```bash
# From the my-tutor-website directory
cd my-tutor-website

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Automatic Deployments
Once connected to GitHub, Vercel will automatically deploy:
- Production: On push to `main` branch
- Preview: On pull requests

## Configuration Details

### Current Setup (Static Export)
The project is configured for static export, which is compatible with both Cloudflare and Vercel:

```typescript
// next.config.ts
output: 'export',
distDir: 'out',
```

### vercel.json Configuration
```json
{
  "buildCommand": "next build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "regions": ["lhr1"]  // London region for UK audience
}
```

## Post-Deployment Verification

### 1. Check Analytics
- Visit your site
- Navigate through pages
- Check Vercel Dashboard > Analytics tab
- Verify page views are being tracked

### 2. Performance Monitoring
- Check Speed Insights tab in Vercel Dashboard
- Monitor Core Web Vitals:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

### 3. Functionality Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Forms submit properly
- [ ] Videos play (if using direct hosting)
- [ ] Mobile responsiveness
- [ ] TinaCMS admin panel accessible

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   vercel logs [deployment-url]
   ```

2. **Environment Variables Not Working**
   - Ensure variables are set for correct environment (production/preview)
   - Rebuild after adding variables: `vercel --prod --force`

3. **404 Errors on Routes**
   - Static export uses trailing slashes
   - Ensure `trailingSlash: true` in next.config.ts

4. **Large Deployment Size**
   - Consider moving videos to external hosting
   - Optimise images before deployment

## Performance Optimisations

### Immediate Optimisations
1. **Video Hosting**
   - Move MP4 files to Vimeo/YouTube
   - Use iframe embeds instead

2. **Image Optimisation**
   ```bash
   # Install sharp for better image processing
   npm install sharp
   ```

### Future Enhancements
To enable full Vercel features:

1. Rename configurations:
   ```bash
   mv next.config.ts next.config.static.ts
   mv next.config.vercel.ts next.config.ts
   ```

2. Remove static limitations:
   - Enable Image Optimization
   - Add API routes
   - Implement ISR

## Monitoring and Maintenance

### Weekly Tasks
- Review Analytics data
- Check Core Web Vitals
- Monitor error logs
- Review deployment performance

### Monthly Tasks
- Audit bundle size
- Update dependencies
- Review and optimise images
- Check for security updates

## Support Resources

- Vercel Documentation: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Support: https://vercel.com/support

## Emergency Rollback

If issues occur:
```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

## Conclusion

The migration to Vercel is straightforward due to the modern architecture and static export configuration. The main tasks are:

1. Setting environment variables
2. Connecting GitHub repository
3. Deploying via CLI or Dashboard

Total estimated time: 30-60 minutes for basic deployment