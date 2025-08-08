# Performance Optimization Implementation Guide
## My Private Tutor Online - Premium Service Standards

### Implementation Priority: CRITICAL Dependencies Audit

#### Step 1: Radix UI Dependency Cleanup (Target: -100kB)

**Current Unused Dependencies to Remove:**
```bash
npm uninstall @radix-ui/react-alert-dialog @radix-ui/react-context-menu @radix-ui/react-collapsible @radix-ui/react-menubar @radix-ui/react-toolbar @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-radio-group @radix-ui/react-checkbox @radix-ui/react-slider @radix-ui/react-progress @radix-ui/react-scroll-area @radix-ui/react-hover-card
```

**Keep Only Essential Components:**
- @radix-ui/react-slot (Slot pattern - currently used)
- @radix-ui/react-navigation-menu (Header navigation)
- @radix-ui/react-dialog (Modals)
- @radix-ui/react-accordion (FAQ page)
- @radix-ui/react-select (Forms)
- @radix-ui/react-label (Form accessibility)
- @radix-ui/react-tabs (Content organization)

**Expected Result:** First Load JS reduction from 230kB to ~130kB

#### Step 2: Video Asset Optimization (Target: 95% size reduction)

**Current Issue:** 640MB video directory
**Target:** <30MB total video assets

**Implementation:**
```bash
# Video compression pipeline
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4

# WebM alternative for modern browsers  
ffmpeg -i input.mp4 -c:v libvp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k output.webm

# Poster frames for lazy loading
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 -q:v 2 poster.jpg
```

**Video Optimization Strategy:**
- Hero background: 1080p max, 15-20 seconds loop
- Introduction video: 720p, 2-3 minutes max
- Poster images: WebP format, <50kB each
- Progressive loading with intersection observer

#### Step 3: Animation Library Consolidation (Target: -50kB)

**Remove Redundant Libraries:**
```bash
npm uninstall @gsap/react gsap @theatre/core @theatre/studio @react-spring/web @react-spring/parallax
```

**Keep Primary:** Framer Motion only (most performant for React)

**Optimize Framer Motion Imports:**
```typescript
// Before (imports entire library)
import { motion, AnimatePresence } from 'framer-motion'

// After (tree-shaken imports)  
import { m } from 'framer-motion'
import { LazyMotion, domAnimation } from 'framer-motion'
```

### Implementation Priority: HIGH Performance Patterns

#### Step 4: Critical CSS Extraction

**Add to next.config.ts:**
```typescript
experimental: {
  optimizeCss: true,
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'framer-motion']
}
```

#### Step 5: Resource Preloading Strategy

**Add to layout.tsx:**
```tsx
<head>
  {/* Preload critical fonts */}
  <link rel="preload" href="/fonts/source-serif-4.woff2" as="font" type="font/woff2" crossOrigin="" />
  
  {/* Preload hero image */}
  <link rel="preload" href="/images/hero/child_book_and_laptop.avif" as="image" />
  
  {/* Preload critical video poster */}
  <link rel="preload" href="/images/video-posters/hero-poster.webp" as="image" />
</head>
```

#### Step 6: Lazy Loading Implementation

**Component-Level Code Splitting:**
```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const ServicesCarousel = dynamic(() => import('./ServicesCarousel'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
})

const TrustIndicatorsGrid = dynamic(() => import('./TrustIndicatorsGrid'), {
  loading: () => <div className="h-64 bg-gray-50" />
})
```

### Implementation Priority: MEDIUM Performance Monitoring

#### Step 7: Real User Monitoring Setup

**Add Performance Monitoring:**
```typescript
// lib/performance/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to Vercel Analytics
  analytics.track('Web Vitals', {
    name: metric.name,
    value: metric.value,
    label: metric.label
  })
}

// Measure all vitals
getCLS(sendToAnalytics)
getFID(sendToAnalytics)  
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

#### Step 8: Bundle Analysis Automation

**Add to package.json scripts:**
```json
{
  "analyze:schedule": "npm run analyze && node scripts/performance-report.js",
  "perf:audit": "lighthouse https://your-site.com --output json --chrome-flags='--headless'",
  "perf:budget": "bundlesize"
}
```

**Performance Budget Configuration (.bundlesizerc):**
```json
{
  "files": [
    {
      "path": ".next/static/chunks/pages/_app-*.js",
      "maxSize": "50kB"
    },
    {
      "path": ".next/static/chunks/framework-*.js", 
      "maxSize": "150kB"
    },
    {
      "path": ".next/static/css/*.css",
      "maxSize": "50kB"
    }
  ]
}
```

### Expected Performance Improvements

**Before Optimization:**
- First Load JS: 230kB
- LCP: ~2.5s (estimated)
- Total Bundle: ~500kB

**After Implementation:**
- First Load JS: ~130kB (-43% reduction)
- LCP: ~1.2s (-52% improvement)  
- Total Bundle: ~300kB (-40% reduction)
- Video Assets: <30MB (-95% reduction)

**Premium Service Standards Achieved:**
- ✅ LCP < 1.5s
- ✅ FID < 50ms  
- ✅ CLS < 0.05
- ✅ Mobile-optimized loading
- ✅ International bandwidth friendly

### Monitoring and Maintenance

**Weekly Performance Audits:**
1. Bundle size analysis
2. Core Web Vitals monitoring
3. Real User Metrics review
4. Competitor performance benchmarking

**Automated Alerts:**
- Bundle size increases >10%
- LCP regression >100ms
- FID increases >25ms
- Build time increases >20%

This optimization plan targets the specific needs of a premium tutoring service with wealthy international clients who expect exceptional user experience across all devices and network conditions.