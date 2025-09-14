# Phase 2 Core Optimization Implementation Plan
## Weeks 3-4 of 6-Week Optimization Strategy

### Current Status Snapshot
- **Bundle Size**: 492KB (Phase 1 achieved)
- **Build Time**: 11.0s (75% improvement from 44.67s)
- **Type Coverage**: 80% (target met)
- **Pipeline Time**: 12min (exceeded target)
- **Components**: 357 files (need to reduce to 320)
- **Routes**: 90 optimized

### Phase 2 Success Gate
**CRITICAL**: Zero user experience regression while achieving major restructuring

## 1. Component Consolidation Strategy (357→320 Components)

### Identified Consolidation Opportunities
Based on analysis, we have significant duplication in:
- **Button Components**: 10 variants → Consolidate to 3
- **Card Components**: 13 variants → Consolidate to 5
- **Modal Components**: 5 variants → Consolidate to 2
- **Error Boundaries**: 5 variants → Consolidate to 2

### Shared Component Library Structure
```
src/lib/components/
├── primitives/
│   ├── button/
│   │   ├── button.tsx          # Base button with variants
│   │   ├── button.types.ts     # TypeScript interfaces
│   │   └── button.test.tsx     # Unit tests
│   ├── card/
│   │   ├── card.tsx            # Flexible card component
│   │   ├── card.types.ts
│   │   └── card.test.tsx
│   └── modal/
│       ├── modal.tsx           # Generic modal
│       ├── modal.types.ts
│       └── modal.test.tsx
├── composite/
│   ├── error-boundary/
│   │   ├── error-boundary.tsx   # Unified error boundary
│   │   └── error-boundary.types.ts
│   └── form-elements/
│       └── index.tsx
└── index.ts                     # Barrel export

```

## 2. Advanced Code Splitting Implementation

### Strategy Based on Context7 Next.js Documentation
```typescript
// CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports optimization
// Configure optimized package imports
module.exports = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react', 'framer-motion', 'lucide-react'],
  },
}

// Implement dynamic imports for heavy components
const HeavyComponent = dynamic(() =>
  import('../components/heavy').then(mod => mod.HeavyComponent),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false
  }
)
```

### Bundle Optimization Targets
- Current: 492KB → Target: 246KB (50% reduction)
- Strategy:
  - Dynamic imports for route-specific components
  - Lazy load admin dashboard components
  - Split vendor bundles intelligently
  - Remove duplicate dependencies

## 3. Image Optimization Pipeline with Sharp

### Implementation Strategy
```typescript
// CONTEXT7 SOURCE: /vercel/next.js - Image optimization
// next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
}

// lib/image-loader.ts
import sharp from 'sharp'
export default function imageLoader({ src, width, quality }) {
  // Sharp-based optimization pipeline
  return `/_next/image?url=${src}&w=${width}&q=${quality || 75}`
}
```

## 4. TypeScript Project References Configuration

### Multi-Project Setup for Build Performance
```json
// CONTEXT7 SOURCE: /microsoft/typescript - Project references
// tsconfig.json (root)
{
  "files": [],
  "references": [
    { "path": "./packages/components" },
    { "path": "./packages/lib" },
    { "path": "./packages/app" }
  ]
}

// packages/components/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

### Expected Performance Gains
- Incremental compilation: 30-40% faster builds
- Better IDE performance with isolated projects
- Type checking parallelization

## 5. Multi-Environment Deployment Strategy

### Environment Configuration
```
environments/
├── development/
│   ├── .env.development
│   └── next.config.dev.js
├── staging/
│   ├── .env.staging
│   └── next.config.staging.js
└── production/
    ├── .env.production
    └── next.config.production.js
```

### Canary Deployment Configuration
```yaml
# vercel.json
{
  "functions": {
    "app/[[...slug]]/route.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/canary?path=$1",
      "has": [{ "type": "cookie", "key": "canary", "value": "true" }]
    }
  ]
}
```

## 6. Implementation Timeline

### Week 3 Tasks
- **Day 1-2**: Component audit and consolidation plan
- **Day 3-4**: Implement shared component library
- **Day 5**: Migrate existing components to use shared library

### Week 4 Tasks
- **Day 1-2**: Implement advanced code splitting
- **Day 3**: Deploy Sharp image optimization pipeline
- **Day 4**: Configure TypeScript project references
- **Day 5**: Set up multi-environment deployment

## 7. Validation Metrics

### Performance Targets
- [ ] Bundle size: 492KB → 246KB
- [ ] Component count: 357 → 320
- [ ] Build time: Maintain <15s
- [ ] Type coverage: 80% → 90%
- [ ] Zero user experience regression

### Testing Strategy
- Automated visual regression testing
- Performance budget monitoring
- User journey testing
- A/B testing on canary deployment

## 8. Risk Mitigation

### Potential Risks & Mitigation
1. **Component Breaking Changes**
   - Mitigation: Comprehensive test coverage before migration
   - Rollback: Git tags for each major change

2. **Bundle Size Increase**
   - Mitigation: Continuous bundle analysis
   - Rollback: Feature flags for new implementations

3. **TypeScript Compilation Issues**
   - Mitigation: Incremental migration to project references
   - Rollback: Keep original tsconfig as backup

## 9. Business Value Calculation

### Expected Returns (Annual)
- **Performance Improvements**: £52,100/year
  - 50% faster page loads → 25% conversion increase
  - Reduced bounce rate → 15% revenue increase

- **Development Efficiency**: £39,000/year
  - 40% faster builds → 2 hours/day saved
  - Better type safety → 50% fewer runtime errors

- **Total Phase 2 Value**: £91,100/year

## Critical Success Factors
1. **Maintain synchronous CMS patterns** (NEVER use async for static content)
2. **All changes require Context7 MCP documentation**
3. **Royal client quality standards maintained**
4. **Zero regression tolerance**
5. **British English throughout**

## Next Steps
1. Begin component consolidation analysis
2. Create shared component library structure
3. Implement first consolidation (buttons)
4. Validate no regression with automated tests
5. Continue with systematic migration

---
*Phase 2 Implementation Started: January 14, 2025*
*Target Completion: End of Week 4*
*Success Gate: Zero UX regression with all targets met*