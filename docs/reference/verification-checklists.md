# Verification Checklists

Quality gates and validation checklists for ensuring code standards compliance.

## Pre-Commit Checklist

### Code Quality Standards
- [ ] **British English**: All text, comments, and documentation use British spelling
- [ ] **TypeScript**: All files compile without errors (`npx tsc --noEmit`)
- [ ] **Linting**: ESLint passes without errors (`pnpm run lint`)
- [ ] **File Structure**: Changes follow modular organisation principles

### Critical Architecture Compliance
- [ ] **CMS Patterns**: No async patterns introduced for static content
- [ ] **CSS Architecture**: @layer base patterns followed, no hardcoded colors
- [ ] **Import Patterns**: Direct JSON imports only, no dynamic imports for static data
- [ ] **Component Patterns**: Synchronous data access maintained

### Performance Standards
- [ ] **Build Time**: Local build completes in under 11.0s (`time pnpm run build`)
- [ ] **Bundle Size**: No unnecessary dependencies added
- [ ] **Image Optimisation**: Next.js Image component used for images
- [ ] **Tree Shaking**: No unused exports in modified files

## CSS Architecture Verification

### @layer Base Compliance
- [ ] **Read Required Files**: globals.css (lines 593-758) and tailwind.config.ts reviewed
- [ ] **Semantic HTML**: Used without classes where @layer base provides styling
- [ ] **Utility Overrides**: Applied only for genuine exceptions
- [ ] **CSS Variables**: All colors/typography use design tokens, no hardcoded values
- [ ] **Design System**: All navigation colors use design tokens from tailwind.config.ts

### Forbidden Pattern Detection
- [ ] **No Manual Colors**: No `text-primary-700 text-3xl font-bold` on standard elements
- [ ] **No Hardcoded Values**: No hex colors, arbitrary values, or inline styles
- [ ] **No Component CSS**: No new CSS files created instead of @layer base + utilities
- [ ] **No Defensive CSS**: No `!important`, resets, or override patterns

## CMS Pattern Verification

### Critical Synchronous Patterns
- [ ] **Direct JSON Imports**: `import content from '../content/data.json'` pattern only
- [ ] **Synchronous Functions**: No `async`/`Promise<>` returns in CMS functions
- [ ] **No Loading States**: No useState/useEffect for static content access
- [ ] **Immediate Availability**: All content available on first render

### Forbidden Async Pattern Detection
- [ ] **No Async CMS**: Search shows no `async.*CMS\|Promise.*CMS` patterns
- [ ] **No useState Content**: No `useState.*content\|useState.*cms` patterns
- [ ] **No useEffect Loading**: No `useEffect.*load\|useEffect.*cms` patterns
- [ ] **No Dynamic Imports**: No `await import()` for JSON content

### Homepage Loading Verification
- [ ] **Immediate Render**: Homepage sections render without loading spinners
- [ ] **No Map Errors**: No ".map is not a function" errors in console
- [ ] **Complete Sections**: All homepage sections populate correctly
- [ ] **Fast Loading**: Page loads immediately without delays

## Navigation Pattern Verification

### Design System Compliance
- [ ] **Design Tokens Only**: No hardcoded hex colors (`#3F4A7E`, `#CA9E5B`)
- [ ] **Proper Classes**: `text-primary-700` and `text-accent-600` used correctly
- [ ] **Breakpoint Consistency**: All three locations updated if breakpoints changed
- [ ] **Typography Hierarchy**: Buttons smaller than nav items at each breakpoint

### Layout Architecture
- [ ] **Symmetrical Spacing**: Logo and button containers both use `min-w-48`
- [ ] **Responsive Classes**: `hidden 2xl:flex` and `2xl:hidden` applied correctly
- [ ] **Navigation Data**: Changes made only to `navigationData` array (lines 34-175)
- [ ] **Spacing Maintained**: `space-x-8` or appropriate spacing preserved

## Build Verification

### Local Build Success
- [ ] **Clean Build**: `pnpm run build` completes successfully
- [ ] **TypeScript**: No compilation errors in any files
- [ ] **Route Generation**: All expected routes generated (target: 91 routes)
- [ ] **Asset Optimisation**: Images and assets properly optimised

### Performance Metrics
- [ ] **Build Time**: Under 11.0s target maintained
- [ ] **Bundle Analysis**: No unexpected bundle size increases
- [ ] **Memory Usage**: Build process doesn't exceed memory limits
- [ ] **Cache Efficiency**: Build cache utilised effectively

## Development Environment

### Local Development
- [ ] **Dev Server**: `pnpm run dev` starts without errors
- [ ] **Hot Reload**: Changes reflect properly in development
- [ ] **Console Clean**: No errors or warnings in browser console
- [ ] **Responsive**: Layout works across all breakpoints

### Dependency Management
- [ ] **Lock File**: pnpm-lock.yaml updated if dependencies changed
- [ ] **Version Compatibility**: No version conflicts in dependencies
- [ ] **Security**: No high-severity vulnerabilities (`pnpm audit`)
- [ ] **Minimal Dependencies**: Only necessary packages included

## Deployment Readiness

### Pre-Deployment Verification
- [ ] **Git Status**: Working directory clean or intentional changes only
- [ ] **Commit Messages**: Clear, descriptive commit messages following conventions
- [ ] **Branch Status**: Appropriate branch for deployment (main/master)
- [ ] **Build Success**: Local build successful before deployment

### Vercel Deployment
- [ ] **CLI Ready**: Vercel CLI authenticated and functional
- [ ] **Environment Variables**: Production environment variables configured
- [ ] **Cache Strategy**: Cache purging strategy planned if needed
- [ ] **Rollback Plan**: Previous deployment identified for potential rollback

### Post-Deployment Verification
- [ ] **Homepage Loading**: Production homepage loads immediately
- [ ] **CMS Data**: All content renders correctly in production
- [ ] **Performance**: Production performance metrics within targets
- [ ] **Error Monitoring**: No errors in Vercel dashboard

## Emergency Response Readiness

### Documentation Access
- [ ] **Emergency Protocols**: [Emergency protocols](emergency-protocols.md) accessible
- [ ] **CMS Patterns**: [CMS patterns](../standards/cms-patterns.md) reference available
- [ ] **Recovery Procedures**: Rollback and recovery procedures understood
- [ ] **Contact Information**: Emergency escalation contacts available

### Recovery Preparation
- [ ] **Git History**: Recent commits clean and revertible
- [ ] **Backup Strategy**: Previous working deployment identified
- [ ] **Local Environment**: Development environment functional for emergency fixes
- [ ] **Monitoring**: Error monitoring and alerting systems functional

## Code Review Checklist

### Technical Review
- [ ] **Architecture Compliance**: Follows established patterns and standards
- [ ] **Error Handling**: Appropriate error handling implemented
- [ ] **Performance Impact**: No negative performance implications
- [ ] **Security**: No security vulnerabilities introduced

### Quality Review
- [ ] **Code Clarity**: Code is readable and well-structured
- [ ] **Documentation**: Appropriate documentation included
- [ ] **Testing**: Testing strategy appropriate for changes
- [ ] **Maintainability**: Code follows maintainable patterns

## Related Documentation

- [Development Standards](../standards/development-standards.md)
- [CSS Architecture](../standards/css-architecture.md)
- [CMS Patterns (Critical)](../standards/cms-patterns.md)
- [Emergency Protocols](emergency-protocols.md)