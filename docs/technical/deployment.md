# Deployment Patterns

## Critical: Vercel CLI Deployment Only

### Deployment Method
- **Vercel CLI Only**: `vercel deploy` / `vercel --prod`
- **NOT GitHub Integration**: GitHub is used for version control only
- **Manual Deployment Required**: All production deployments must be manually triggered via Vercel CLI
- **Cache Management**: Use `vercel cache purge --type=cdn` for cache issues

### Deployment Commands

#### Development Preview
```bash
vercel deploy
```

#### Production Deployment
```bash
vercel --prod
```

#### Cache Purging
```bash
vercel cache purge --type=cdn
```

## Technical Architecture

### Vercel Configuration
- **Architecture**: `export const dynamic = 'force-dynamic'` in layout.tsx only
- **Client Components**: All pages use "use client" directive for Framer Motion compatibility
- **React Pattern**: Use Radix UI Slot patterns for multiple children handling
- **Component Standards**: Modular sections with synchronous data access only

### Build Verification Process

#### Pre-Deployment Requirements
1. **Local Build**: `npm run build` successfully
2. **CMS Verification**: Synchronous pattern validation
3. **TypeScript Check**: Zero compilation errors
4. **Performance Check**: Build time under 11.0s target

#### Build Commands
```bash
# Local build verification
npm run build

# Type checking
npm run type-check  # or npx tsc --noEmit

# Development server test
npm run dev
```

### Production Environment

#### Current Production URL
```
https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app
```

#### Environment Variables
- **NODE_ENV**: Automatically set by Vercel
- **VERCEL**: Automatically set by Vercel
- **Custom Variables**: Configure in Vercel dashboard as needed

## Deployment Workflow

### Step-by-Step Process

1. **Code Verification**
   ```bash
   # Ensure clean working directory
   git status

   # Verify local build
   npm run build
   ```

2. **Version Control**
   ```bash
   # Commit changes
   git add .
   git commit -m "feat: description of changes"

   # Push to repository
   git push origin main
   ```

3. **Deployment Execution**
   ```bash
   # Deploy to preview
   vercel deploy

   # Deploy to production (after preview verification)
   vercel --prod
   ```

4. **Post-Deployment Verification**
   - Verify homepage loads immediately
   - Check all sections render properly
   - Confirm no loading spinners
   - Validate CMS data availability

### Rollback Procedure

#### If Deployment Fails
1. **Immediate Rollback**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main

   # Redeploy previous version
   vercel --prod
   ```

2. **Emergency Recovery**
   - Use Vercel dashboard to rollback to previous deployment
   - Verify homepage functionality immediately
   - Check CMS synchronous patterns

## Cache Management

### CDN Cache Purging
```bash
# Purge all cache
vercel cache purge --type=cdn

# Specific asset purging (if needed)
vercel cache purge --type=cdn [specific-path]
```

### Common Cache Issues
- **OpenGraph Images**: May require cache purging
- **Static Assets**: Automatic versioning handles most cases
- **CSS Changes**: Should deploy automatically with build

## Monitoring and Alerts

### Post-Deployment Checks
1. **Homepage Loading**: Immediate render without spinners
2. **CMS Data**: All sections populated correctly
3. **Performance**: Page load times within targets
4. **Error Monitoring**: Check Vercel dashboard for errors

### Performance Monitoring
- **Build Time**: Monitor for 11.0s target compliance
- **Bundle Size**: Track for performance impact
- **Core Web Vitals**: Verify production metrics
- **Error Rates**: Monitor Vercel analytics

## Configuration Files

### vercel.json (if needed)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci"
}
```

### Environment-Specific Settings
- **Development**: Local development server
- **Preview**: Vercel preview deployments
- **Production**: Manual production deployments via CLI

## Security Considerations

### Deployment Security
- **Manual Control**: No automatic deployments from GitHub
- **Verification Required**: Local build testing before deployment
- **Access Control**: Vercel CLI authentication required
- **Environment Isolation**: Clear separation between preview and production

### Code Security
- **No Sensitive Data**: Environment variables for secrets
- **Build Verification**: TypeScript compilation catches issues
- **CMS Security**: Synchronous patterns prevent injection attacks
- **Performance Security**: Build time limits prevent infinite loops

## Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Check TypeScript errors
npx tsc --noEmit

# Verify dependencies
npm ci

# Test local build
npm run build
```

#### CMS Data Issues
- Verify synchronous patterns in CMS files
- Check JSON import paths
- Confirm no async patterns introduced
- Test homepage loading locally

#### Performance Issues
- Monitor build time (target: 11.0s)
- Check bundle size impact
- Verify route optimisation
- Review Vercel analytics

### Emergency Contacts
- **Vercel Dashboard**: Monitor deployments and errors
- **Repository**: GitHub for version control
- **Local Development**: `npm run dev` for testing

## Related Documentation

- [Tech Stack Specifications](tech-stack.md)
- [CMS Patterns (Critical)](../standards/cms-patterns.md)
- [Development Standards](../standards/development-standards.md)
- [Emergency Protocols](../reference/emergency-protocols.md)