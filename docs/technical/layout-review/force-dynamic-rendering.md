# Issue: Force Dynamic Rendering at Root Level

## Priority: 🔴 Critical

## Problem Description

The root layout exports `export const dynamic = 'force-dynamic'` which prevents ALL static generation across the entire application. This forces server-side rendering for static content like legal pages, increasing server load, reducing performance, and negating Next.js optimization benefits.

### Affected Files
```
src/app/(app)/layout.tsx:1
```

### Current Implementation (Problematic)
```typescript
// src/app/(app)/layout.tsx
export const dynamic = 'force-dynamic' // ❌ FORCES ALL ROUTES TO BE DYNAMIC

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
```

### Impact Analysis
This configuration affects **ALL routes**:
- Legal pages (privacy-policy, terms-of-service) - Should be static
- About page - Should be static
- FAQ pages - Could be static with ISR
- Blog posts - Could be static with ISR
- Dashboard pages - Legitimately need dynamic rendering

## Research Evidence

### Expert Opinions
- **Next.js Performance Guide**: [Best Practices for Organizing Next.js 15](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) emphasises granular rendering control
- **App Router Best Practices**: [Next.js Learn Course](https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages) demonstrates selective dynamic rendering

### Official Documentation
From Next.js App Router documentation (`/websites/nextjs_app`):
> "The App Router provides granular control over rendering behavior. Use dynamic rendering only where necessary for optimal performance."

## Recommended Solution

### 1. Remove Force Dynamic from Root Layout

**File**: `src/app/(app)/layout.tsx`
```typescript
// Remove this line entirely:
// export const dynamic = 'force-dynamic' ❌

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
```

### 2. Apply Dynamic Rendering Selectively

**Routes that need dynamic rendering**:

**File**: `src/app/(app)/dashboard/performance/page.tsx`
```typescript
export const dynamic = 'force-dynamic' // ✅ APPROPRIATE USE

export default function PerformancePage() {
  // Real-time analytics data
  return <PerformanceAnalytics />
}
```

**File**: `src/app/(app)/dashboard/testimonials-analytics/page.tsx`
```typescript
export const dynamic = 'force-dynamic' // ✅ APPROPRIATE USE

export default function TestimonialsAnalyticsPage() {
  // Dynamic user data
  return <TestimonialsAnalytics />
}
```

### 3. Configure ISR for Semi-Dynamic Content

**File**: `src/app/(app)/faq/page.tsx`
```typescript
export const revalidate = 3600 // ✅ REVALIDATE EVERY HOUR

export default function FAQPage() {
  // FAQ content that changes occasionally
  return <FAQSection />
}
```

**File**: `src/app/(app)/blog/[slug]/page.tsx`
```typescript
export const revalidate = 86400 // ✅ REVALIDATE DAILY

export async function generateStaticParams() {
  // Pre-generate popular blog posts
  return blogPosts.map(post => ({ slug: post.slug }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPostContent slug={params.slug} />
}
```

### 4. Keep Static for Truly Static Content

**No export needed** - Static by default:
```typescript
// src/app/(app)/legal/privacy-policy/page.tsx
// src/app/(app)/legal/terms-of-service/page.tsx
// src/app/(app)/about/page.tsx
// etc.
```

## Implementation Steps

### Step 1: Remove Root Force Dynamic (10 minutes)
1. Edit `src/app/(app)/layout.tsx`
2. Remove `export const dynamic = 'force-dynamic'`
3. Test build: `npm run build`
4. Verify no immediate errors

### Step 2: Identify Dynamic Requirements (30 minutes)
1. Audit each route for dynamic content needs:
   - **Static**: Legal, About, Services overview
   - **ISR**: FAQ, Blog posts, Testimonials
   - **Dynamic**: Dashboard, Analytics, Real-time features

### Step 3: Apply Selective Configuration (60 minutes)
1. Add `force-dynamic` to dashboard routes
2. Add `revalidate` to ISR routes
3. Leave static routes unchanged
4. Test each configuration

### Step 4: Performance Validation (30 minutes)
1. Build application: `npm run build`
2. Check build output for static/dynamic indicators
3. Verify page load times improve
4. Test in production environment

## Expected Benefits

### Performance Improvements
- **Static Routes**: Pre-built at compile time, served from CDN
- **Reduced Server Load**: 80%+ of routes no longer require server rendering
- **Faster TTFB**: Static pages serve immediately
- **Better Caching**: CDN and browser caching for static content

### Developer Experience
- **Build Output Clarity**: See which routes are static vs dynamic
- **Deployment Speed**: Static routes deploy once, serve globally
- **Cost Reduction**: Fewer server resources needed

### SEO Benefits
- **Faster Load Times**: Static pages load instantly
- **Better Core Web Vitals**: LCP, FID, CLS improvements
- **Search Engine Crawling**: Static pages easier to index

## Build Output Analysis

### Before (All Dynamic)
```
Route (app)                                Size     First Load JS
┌ ○ /                                      137 kB   1.2 MB
├ ○ /about                                 142 kB   1.21 MB
├ ○ /services                              145 kB   1.22 MB
├ ○ /legal/privacy-policy                  139 kB   1.20 MB
```

### After (Selective Dynamic)
```
Route (app)                                Size     First Load JS
├ ● / (ISR: 3600s)                        137 kB   1.2 MB
├ ○ /about                                 142 kB   1.21 MB
├ ○ /services                              145 kB   1.22 MB
├ ● /legal/privacy-policy                  139 kB   1.20 MB
├ λ /dashboard/performance                 155 kB   1.25 MB
```

**Legend**:
- `○` Static: Pre-rendered at build time
- `●` SSG: Static with ISR
- `λ` Dynamic: Server-rendered per request

## Testing Checklist

- [ ] Build succeeds: `npm run build`
- [ ] Static pages load instantly
- [ ] Dynamic pages still function correctly
- [ ] ISR pages revalidate properly
- [ ] No hydration errors in console
- [ ] Performance scores improve in Lighthouse

## Rollback Plan

If critical issues arise:
1. **Immediate rollback**: Re-add `export const dynamic = 'force-dynamic'` to root layout
2. **Investigate**: Check specific routes causing issues
3. **Gradual implementation**: Enable static rendering route by route
4. **Monitor**: Use Vercel analytics to track errors

## Route Classification

### Static Routes (No export needed)
```
/about
/services
/legal/privacy-policy
/legal/terms-of-service
/legal/cookie-policy
/legal/booking-policy
/legal/record-of-processing
/how-it-works
/meet-our-tutors
/exam-papers
/video-masterclasses
/11-plus-bootcamps
/contact
```

### ISR Routes (export const revalidate)
```
/faq (revalidate: 3600)
/blog (revalidate: 86400)
/testimonials (revalidate: 7200)
```

### Dynamic Routes (export const dynamic = 'force-dynamic')
```
/dashboard/performance
/dashboard/testimonials-analytics
/api/* (All API routes)
```

## Monitoring Strategy

### Build-time Verification
- Check Next.js build output for route classifications
- Ensure static routes show as `○` in build log
- Verify bundle sizes remain reasonable

### Runtime Monitoring
- Monitor Vercel function invocations (should decrease)
- Track page load times in analytics
- Monitor error rates for newly static routes

## Related Issues

- Complements [Metadata Duplication](./metadata-duplication.md) by optimizing how metadata is served
- Enables better caching for [Nested Layout Structure](./nested-layout-structure.md)
- Reduces server overhead from [Redundant Layouts](./redundant-layouts.md)

---

**Issue Severity**: Critical - Immediate performance impact
**Estimated Effort**: 2 hours
**Dependencies**: None - can be implemented immediately
**Next Steps**: See [Layout Optimization Roadmap](../layout-optimization-roadmap.md)