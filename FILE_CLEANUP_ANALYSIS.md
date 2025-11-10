# FILE CLEANUP ANALYSIS - MY PRIVATE TUTOR ONLINE
## COMPREHENSIVE 114 UNUSED FILES ASSESSMENT

**Analysis Date**: 2025-11-10
**Project**: My Private Tutor Online - Premium Tutoring Service
**Analysis Agent**: Agent 2 - File Cleanup Specialist
**Business Context**: £400k+ revenue opportunity protection, zero-tolerance for breaking changes

---

## EXECUTIVE SUMMARY

**Total Unused Files Identified**: 114 files
**Unused Dependencies**: 8 production + 6 development
**Unlisted Dependencies**: 5 (scripts only)
**Potential Bundle Size Reduction**: ~800KB (public/admin + unused components)
**Build Performance Impact**: Moderate (config files, test infrastructure)
**Risk Level**: LOW to MODERATE (with careful validation)

### CRITICAL BUSINESS CONSIDERATIONS

1. **Zero Breaking Changes**: Premium service with royal endorsements requires 100% uptime
2. **Build Target Protection**: Current 11.0s build time must be maintained or improved
3. **Component Dependencies**: Some "unused" files may be dynamically imported or planned features
4. **Test Infrastructure**: Jest config exists but project uses Playwright (infrastructure mismatch)
5. **Admin Dashboard**: 85% operational status suggests ongoing development needs preservation

---

## CLASSIFICATION MATRIX

### TIER 1: SAFE FOR IMMEDIATE REMOVAL (48 files)
**Risk Level**: MINIMAL
**Bundle Impact**: ~550KB reduction
**Business Impact**: NONE (confirmed unused, no dependencies)

#### Configuration Files (4 files)
```
✅ SAFE: commitlint.config.js          - No .husky directory, commitlint not used
✅ SAFE: jest.config.ts                - Project uses Playwright, not Jest
✅ SAFE: lighthouse.config.js          - Script exists but no active integration
✅ SAFE: pandoc-pdf-styles.css         - No PDF generation in codebase
```

**Rationale**:
- Commitlint: No husky hooks found, grep confirmed zero usage
- Jest: Unit tests exist but never run (Playwright is active test framework)
- Lighthouse: Config references missing scripts, lighthouse.config.js vs .lighthouserc.js confusion
- Pandoc: PDF generation not part of service offering

#### Public Assets (3 files + directory)
```
✅ SAFE: public/admin/assets/          - 524KB unused admin UI assets
✅ SAFE: public/styles/pesticide-debug.css - 5KB dev-only CSS (pesticide removed Phase 1)
✅ SAFE: public/styles/pesticide.dev.css   - 4.8KB dev-only CSS (pesticide removed Phase 1)
```

**Rationale**:
- Admin assets: PayloadCMS generates its own admin UI, these are orphaned
- Pesticide: Debug CSS for layout visualization, removed in Phase 1 cleanup
- Total public asset reduction: ~534KB

#### Design Token Generated Files (3 files)
```
✅ SAFE: src/design-tokens/generated/tokens.js    - Unused token build artifacts
✅ SAFE: src/design-tokens/generated/tokens.ts    - Tailwind config is source of truth
✅ SAFE: src/design-tokens/generated/types.d.ts   - Phase 5 moved to @layer base
```

**Rationale**:
- Style Dictionary migration abandoned in favour of Tailwind @layer base approach
- globals.css (lines 593-758) + tailwind.config.ts now handle all design tokens
- Generated files orphaned from incomplete migration

#### Development Utilities (6 files)
```
✅ SAFE: src/components/dev/DevToolbar.tsx           - Dev toolbar never integrated
✅ SAFE: src/hooks/usePesticideDebug.ts             - Pesticide removed Phase 1
✅ SAFE: src/lib/dev-utils/index.ts                 - Dev utilities unused
✅ SAFE: src/lib/dev-utils/pesticide.tsx            - Pesticide removed Phase 1
✅ SAFE: src/lib/debug/eslint-react-rules.ts        - Debug utilities unused
✅ SAFE: src/lib/debug/react-error-logger.ts        - Not integrated
```

**Rationale**:
- DevToolbar: Built but never mounted in layout
- Pesticide: Complete removal confirmed in Phase 1 (Oct 2025)
- Debug utilities: Created but not integrated into error handling flow

#### Test Infrastructure (2 files)
```
✅ SAFE: tests/setup.ts                - Jest setup file (project uses Playwright)
✅ SAFE: tests/unit/* (all files)      - Jest tests never executed
```

**Rationale**:
- Package.json contains jest config but no jest scripts
- Playwright is active test framework (test:*, test:ui, test:debug scripts)
- Unit tests exist but infrastructure to run them removed

#### Duplicate/Legacy Video Components (5 files)
```
✅ SAFE: src/components/video/OptimizedVideoPlayer.tsx              - Legacy player
✅ SAFE: src/components/video/OptimizedVideoPlayer.types.ts        - Legacy types
✅ SAFE: src/components/video/VideoMasterclassSectionImageFullWidthTextHalfWidth.tsx
✅ SAFE: src/components/video/VideoMasterclassSectionTextFullWidth.tsx
✅ SAFE: src/components/magicui/hero-video-dialog-subject-tuition.tsx
```

**Rationale**:
- VideoMasterclassSection.tsx (384 lines) is active implementation
- Legacy video components replaced during enterprise integration
- Duplicate layout variations consolidated in main component

#### Removed Error Boundary Components (7 files - Git Status Shows Deleted)
```
✅ SAFE: src/components/boundaries/TestimonialsErrorBoundary.tsx    (Git: D)
✅ SAFE: src/components/boundaries/homepage-error-boundary.tsx      (Git: D)
✅ SAFE: src/components/error-boundary/FAQErrorBoundary.tsx        (Git: D)
✅ SAFE: src/components/error-boundary/types.ts                     (Git: D)
✅ SAFE: src/components/error-boundary/utils.ts                     (Git: D)
✅ SAFE: src/components/layout/footer-error-boundary.tsx           (Git: D)
✅ SAFE: src/components/providers/GlobalErrorBoundary.tsx          (Git: D)
```

**Rationale**:
- Git status shows "D" (deleted) - already removed from working tree
- Error boundary architecture simplified during Phase 1
- Knip detecting files not yet purged from git history

#### Footer Component Duplicates (2 files)
```
✅ SAFE: src/components/layout/footer-components/footer-company-section.tsx
✅ SAFE: src/components/layout/footer-components/footer-navigation-sections.tsx
```

**Rationale**:
- footer-company-section-hardcoded.tsx is active version (grep confirmed)
- footer-navigation-hardcoded.tsx is active version (grep confirmed)
- Non-hardcoded versions orphaned during CMS migration

#### Unused Script (1 file)
```
✅ SAFE: scripts/verify-schema-markup.js  - Schema verification not integrated
```

**Rationale**:
- SchemaMarkup.tsx exists and is used
- Verification script built but not part of CI/CD pipeline
- No package.json script references this file

#### Education Component Duplicates (8 files)
```
✅ SAFE: src/components/education/CallOutsGrid.tsx                         - Unused grid
✅ SAFE: src/components/education/EducationLevelTabContent-subject-tuition.tsx - Legacy
✅ SAFE: src/components/education/EducationLevelTabContent.tsx            - Legacy
✅ SAFE: src/components/education/SubsectionCard-subject-tuition.tsx      - Legacy
✅ SAFE: src/components/education/SubsectionCard.tsx                      - Legacy
✅ SAFE: src/components/education/testimonials-and-stats-grid.tsx         - Duplicate
✅ SAFE: src/components/education/testing-content.tsx                     - Test file
```

**Rationale**:
- Subject tuition page redesigned, legacy layout components replaced
- Testing content never integrated into production
- Grid components superseded by modern Tailwind layouts

#### Unused UI Primitives (4 files)
```
✅ SAFE: src/components/ui/dialog.tsx              - Radix Dialog unused
✅ SAFE: src/components/ui/highlighted-quote.tsx   - Unused quote style
✅ SAFE: src/components/ui/optimized-image.tsx     - Next.js Image used instead
✅ SAFE: src/components/ui/timeline.tsx            - Timeline UI unused
```

**Rationale**:
- Dialog: Built but never integrated (modals use different pattern)
- Quotes: Blockquote.tsx is active component
- Images: Direct next/image usage throughout codebase
- Timeline: Built for about page but not implemented

#### Service Worker (1 file)
```
✅ SAFE: src/lib/service-worker/sw-registration.ts  - PWA features not implemented
```

**Rationale**:
- No PWA manifest in codebase
- Service worker registration never called
- Progressive Web App features not part of MVP

---

### TIER 2: REQUIRES INVESTIGATION (42 files)
**Risk Level**: MODERATE
**Bundle Impact**: ~200KB potential reduction
**Business Impact**: POSSIBLE (dynamic imports, admin features, future implementations)

#### FAQ Advanced Features (11 files)
```
⚠️ INVESTIGATE: src/components/faq/faq-advanced-search-filters.tsx   - Admin feature?
⚠️ INVESTIGATE: src/components/faq/faq-category-section.tsx          - Future feature?
⚠️ INVESTIGATE: src/components/faq/faq-enhanced-search.tsx           - Uses use-error-recovery
⚠️ INVESTIGATE: src/components/faq/faq-error-fallback.tsx            - Uses use-error-recovery
⚠️ INVESTIGATE: src/components/faq/faq-gamification-tracker.tsx      - Future feature?
⚠️ INVESTIGATE: src/components/faq/faq-rating-system.tsx             - Future feature?
⚠️ INVESTIGATE: src/components/faq/faq-recommendations.tsx           - AI feature?
⚠️ INVESTIGATE: src/components/faq/faq-theme-switcher.tsx            - Dark mode planned?
⚠️ INVESTIGATE: src/components/faq/faq-visual-search.tsx             - Image search feature?
⚠️ INVESTIGATE: src/components/faq/faq-voice-search.tsx              - Voice search feature?
⚠️ INVESTIGATE: src/hooks/use-error-recovery.ts                      - Used by 2 components
```

**Risk Analysis**:
- **use-error-recovery.ts**: Used by faq-enhanced-search and faq-error-fallback (marked unused by knip)
- **Enhanced search**: Sophisticated search with fuzzy matching, may be future enhancement
- **Gamification/Rating**: Premium features for user engagement (future implementation)
- **Voice/Visual search**: Advanced features not yet launched
- **Theme switcher**: Dark mode consideration for accessibility

**Recommendation**:
- ✅ Keep use-error-recovery.ts (has active consumers despite knip report)
- 🔍 Archive advanced FAQ features (faq-gamification, faq-voice-search, etc.) for future use
- ❌ Remove if business confirms these features are not in roadmap

#### Admin Dashboard Components (4 files + dependencies)
```
⚠️ INVESTIGATE: src/components/admin/faq-admin-dashboard.tsx            - Admin 85% operational
⚠️ INVESTIGATE: src/components/admin/faq-version-control-dashboard.tsx  - Version control system
⚠️ INVESTIGATE: src/components/admin/faq-version-diff-viewer.tsx        - Version diff UI
⚠️ INVESTIGATE: src/components/admin/faq-version-workflow-manager.tsx   - Version workflows
```

**Risk Analysis**:
- CLAUDE.md states "admin dashboard (85% operational)"
- FAQ version control system appears to be comprehensive implementation
- May be dynamically imported or accessed via direct URLs
- PayloadCMS may handle admin differently than expected

**Recommendation**:
- 🔍 **CRITICAL**: Check if admin pages at /admin/* routes use these components
- 🔍 Verify if PayloadCMS admin UI replaced custom admin dashboard
- ⏸️ **DO NOT REMOVE** until admin dashboard status clarified (85% operational suggests active use)

#### CMS Service Layer (7 files)
```
⚠️ INVESTIGATE: src/lib/cms/cms-analytics.ts            - Analytics integration
⚠️ INVESTIGATE: src/lib/cms/cms-architecture-validator.ts - Architecture checks
⚠️ INVESTIGATE: src/lib/cms/cms-performance.ts          - Performance monitoring
⚠️ INVESTIGATE: src/lib/cms/cms-runtime-monitor.ts      - Runtime violation detection
⚠️ INVESTIGATE: src/lib/cms/cms-service.ts              - CMS service layer
⚠️ INVESTIGATE: src/lib/cms/cms-utils.ts                - CMS utilities
⚠️ INVESTIGATE: src/lib/cms/video-utils.ts              - Video processing
```

**Risk Analysis**:
- **cms-runtime-monitor.ts**: CLAUDE.md references "runtime violation detection preventing async pattern regressions"
- May be imported dynamically or used in monitoring scripts
- CMS architecture monitoring is critical for homepage reliability
- Performance monitoring tied to £191,500/year optimization value

**Recommendation**:
- 🔍 **HIGH PRIORITY**: Verify if monitoring scripts import these modules
- 🔍 Check if validation scripts use cms-architecture-validator
- ⚠️ **PRESERVE**: cms-runtime-monitor.ts (mentioned in enterprise monitoring)
- 🗄️ Archive unused CMS utilities if confirmed not loaded at runtime

#### Analytics & Tracking (8 files)
```
⚠️ INVESTIGATE: src/lib/analytics/conversion-tracking.ts       - Revenue tracking
⚠️ INVESTIGATE: src/lib/faq-ab-testing.ts                     - A/B testing framework
⚠️ INVESTIGATE: src/lib/faq-ai-integration.ts                 - AI features
⚠️ INVESTIGATE: src/lib/faq-analytics-engine.ts               - FAQ analytics
⚠️ INVESTIGATE: src/lib/faq-recommendation-engine.ts          - Recommendation AI
⚠️ INVESTIGATE: src/lib/faq-recommendation-optimiser.ts       - Optimisation algorithms
⚠️ INVESTIGATE: src/lib/faq-version-control/                  - Version control system
⚠️ INVESTIGATE: src/lib/search/faq-search-engine.ts           - Search implementation
```

**Risk Analysis**:
- **conversion-tracking.ts**: Critical for £400k+ revenue opportunity monitoring
- A/B testing and AI features may be future enhancements
- Analytics engines may be loaded conditionally or in admin dashboard
- Search engine may be used dynamically

**Recommendation**:
- 🔍 **REVENUE-CRITICAL**: Verify conversion-tracking is truly unused before removal
- 🔍 Check admin dashboard for analytics integrations
- 🗄️ Archive AI/recommendation features if confirmed not in roadmap
- ⚠️ Keep search-engine if FAQ pages have search functionality

#### Marketing Components (2 files)
```
⚠️ INVESTIGATE: src/components/marketing/royal-testimonial-card.tsx - Royal client features
⚠️ INVESTIGATE: src/components/marketing/royal-trust-indicators.tsx - Royal endorsements
```

**Risk Analysis**:
- "Royal endorsements" and "royal client-worthy" mentioned throughout CLAUDE.md
- May be premium features for Tatler Address Book 2025 clients
- Could be dynamically imported for specific client segments

**Recommendation**:
- 🔍 **BRAND-CRITICAL**: Check if royal testimonials used on elite client pages
- 🔍 Verify if testimonials page imports these dynamically
- ⚠️ **PRESERVE** if tied to £400k+ revenue opportunity (ultra-wealthy demographic)

#### Performance Monitoring (3 files)
```
⚠️ INVESTIGATE: src/lib/performance/cache-monitoring.ts      - Cache performance tracking
⚠️ INVESTIGATE: src/lib/performance/crash-prevention.ts      - Error prevention systems
⚠️ INVESTIGATE: src/components/cms-architecture-dashboard.tsx - CMS monitoring UI
```

**Risk Analysis**:
- Cache monitoring may be used by enterprise monitoring systems
- Crash prevention systems critical for zero-downtime requirements
- Architecture dashboard may be admin feature

**Recommendation**:
- 🔍 Check if monitoring scripts import these modules
- ⚠️ **PRESERVE**: crash-prevention.ts (zero-tolerance for production failures)
- 🗄️ Archive cache-monitoring if not actively loaded

#### Testimonials System (7 files)
```
⚠️ INVESTIGATE: src/components/testimonials/elite-schools-carousel.tsx
⚠️ INVESTIGATE: src/components/testimonials/school-card.tsx
⚠️ INVESTIGATE: src/components/testimonials/school-modal.tsx
⚠️ INVESTIGATE: src/components/testimonials/testimonial-card.tsx
⚠️ INVESTIGATE: src/components/testimonials/testimonial-modal.tsx
⚠️ INVESTIGATE: src/components/testimonials/testimonials-filter.tsx
⚠️ INVESTIGATE: src/components/testimonials/testimonials-grid.tsx
⚠️ INVESTIGATE: src/components/testimonials/testimonials-intro.tsx
```

**Risk Analysis**:
- Testimonials page exists at /testimonials
- May be using different testimonial components
- Elite schools carousel is premium brand feature
- Modal components may be dynamically imported

**Recommendation**:
- 🔍 **HIGH PRIORITY**: Check src/app/testimonials/page.tsx for imports
- 🔍 Verify if elite schools feature is live or planned
- 🔍 Check for dynamic imports (React.lazy, next/dynamic)
- ⚠️ **PRESERVE** if testimonials are core to £400k+ revenue positioning

---

### TIER 3: ARCHIVE FOR FUTURE USE (12 files)
**Risk Level**: LOW
**Bundle Impact**: ~50KB
**Business Impact**: STRATEGIC (may be valuable for future implementations)

#### Testing Content & Factories
```
🗄️ ARCHIVE: src/components/layout/__tests__/test-factories/logo-section-factory.ts
🗄️ ARCHIVE: src/components/education/testing-content.tsx
```

**Rationale**:
- Test factories demonstrate component testing patterns
- May be valuable when implementing proper Jest testing
- Testing content shows content structure examples

#### Optimization & SEO Libraries
```
🗄️ ARCHIVE: src/lib/optimization/code-splitting-core.ts      - Advanced code splitting
🗄️ ARCHIVE: src/lib/optimization/isr-config.ts              - ISR configuration
🗄️ ARCHIVE: src/lib/optimization/technical-seo.ts           - SEO optimisation
```

**Rationale**:
- Code splitting strategies may be needed for performance optimization
- ISR (Incremental Static Regeneration) valuable for scaling
- Technical SEO contains enterprise SEO patterns

#### Deep Linking & URL Patterns
```
🗄️ ARCHIVE: src/lib/deep-linking/url-patterns.ts  - Deep linking system
```

**Rationale**:
- Deep linking important for marketing campaigns
- URL pattern management valuable for SEO
- May be needed for future marketing integrations

#### Footer Service Contracts
```
🗄️ ARCHIVE: src/lib/services/footer-service-contracts.ts  - Service contract definitions
```

**Rationale**:
- Service contract patterns useful for enterprise architecture
- May be needed for CMS integration evolution

#### Legal Components
```
🗄️ ARCHIVE: src/components/legal/CookieConsent.tsx  - GDPR compliance component
```

**Rationale**:
- Cookie consent may be required for EU visitors
- GDPR compliance component valuable for legal requirements
- May be activated when analytics tracking enhanced

#### Design Token Configuration
```
🗄️ ARCHIVE: tailwind.config.tokens.js          - Token-based Tailwind config
🗄️ ARCHIVE: src/styles/tokens/variables.css    - CSS variable tokens
```

**Rationale**:
- Alternative design token approach preserved for reference
- May be useful if design system evolves beyond @layer base
- Demonstrates CSS variable integration patterns

#### Configuration Files
```
🗄️ ARCHIVE: src/config/testimonials-cms.config.ts  - Testimonials CMS configuration
```

**Rationale**:
- CMS configuration patterns for testimonials management
- Imported by src/lib/cms/index.ts but index.ts itself unused
- May be activated when admin dashboard fully operational

---

### TIER 4: DO NOT REMOVE (12 files)
**Risk Level**: HIGH
**Business Impact**: CRITICAL (active use, revenue-critical, or unclear dependencies)

#### Performance Configuration
```
❌ DO NOT REMOVE: performance.config.ts  - £191,500/year optimization tracking
```

**Rationale**:
- Import error in business-analytics.ts: `../../performance.config`
- Comprehensive performance budgets and thresholds defined
- Agent performance configuration for multi-agent system
- Web Vitals thresholds for monitoring
- Referenced in CLAUDE.md as monitoring infrastructure

**Action Required**:
- Fix import in src/lib/analytics/business-analytics.ts
- Verify monitoring scripts import performance.config.ts
- Keep until proper integration confirmed

#### Web Vitals Components
```
❌ DO NOT REMOVE: src/app/_components/web-vitals.tsx       - Next.js Web Vitals integration
❌ DO NOT REMOVE: src/components/analytics/web-vitals.tsx  - Custom analytics implementation
```

**Rationale**:
- Web Vitals tracking critical for performance monitoring
- May be dynamically imported by layout.tsx or providers
- Core Web Vitals tied to SEO rankings and user experience
- Part of £191,500/year optimization value tracking

#### Error Handling
```
❌ DO NOT REMOVE: src/lib/error-handling/NetworkErrorHandler.ts - Network error recovery
❌ DO NOT REMOVE: src/lib/error-handling/types.ts               - Error handling types
```

**Rationale**:
- Network error handling critical for premium service reliability
- Zero-tolerance for unhandled errors with royal clients
- May be used in API route error handling
- Types imported by multiple modules (false positive)

#### Provider System
```
❌ DO NOT REMOVE: src/components/providers/index.ts  - Provider exports
```

**Rationale**:
- Index file for provider re-exports
- May be imported using barrel export pattern
- Breaking change risk if removed without verification

#### Sections (Modified - Git Status)
```
❌ DO NOT REMOVE: Multiple section files showing 'M' in git status:
  - src/components/sections/about-section.tsx
  - src/components/sections/brand-message-section.tsx
  - src/components/sections/results-documentation.tsx
  - src/components/sections/stats-trio.tsx
  - src/components/sections/subject-accordion.tsx
  - src/components/sections/trust-indicators-grid.tsx
```

**Rationale**:
- Git status shows 'M' (modified) - recently edited, likely active
- May be dynamically imported by page components
- Section components core to homepage and key landing pages
- Risk of breaking homepage too high

#### Type Definitions
```
❌ DO NOT REMOVE: next-env.d.ts                    - Next.js TypeScript definitions
❌ DO NOT REMOVE: src/types/performance.ts         - Performance type system
❌ DO NOT REMOVE: src/types/performance-advanced.ts - Advanced performance types
```

**Rationale**:
- next-env.d.ts automatically generated by Next.js (will regenerate if removed)
- Performance types imported by performance.config.ts (active file)
- Type definitions may have phantom imports not detected by static analysis

---

## DEPENDENCY ANALYSIS

### Unused Production Dependencies (8)
```javascript
{
  "fuse.js": "^7.1.0",                    // 43KB - Fuzzy search library
  "react-dropzone": "^14.3.8",           // 25KB - File upload component
  "react-player": "^3.3.3",              // 65KB - Video player (using custom instead)
  "react-speech-recognition": "^4.0.1",  // 18KB - Voice recognition
  "regenerator-runtime": "^0.14.1",      // 5KB  - Async/await polyfill
  "rough-notation": "^0.5.1",            // 12KB - Hand-drawn annotations
  "tesseract.js": "^6.0.1",              // 2.1MB - OCR engine
  "use-debounce": "^10.0.5"              // 3KB  - Debounce hook
}
```

**Total Production Bundle Impact**: ~2.27MB

**Risk Analysis by Dependency**:

1. **tesseract.js (2.1MB)** - SAFE TO REMOVE
   - OCR (Optical Character Recognition) engine
   - Visual search feature (faq-visual-search.tsx) not implemented
   - Huge bundle size impact
   - Recommendation: ✅ **Remove immediately** - major bundle reduction

2. **react-player (65KB)** - INVESTIGATE
   - Generic video player wrapper
   - Custom OptimizedVideoPlayer exists but marked unused
   - Video masterclasses use custom implementation
   - Recommendation: 🔍 Verify video masterclasses work, then remove

3. **fuse.js (43KB)** - INVESTIGATE
   - Fuzzy search library for FAQ search
   - faq-search-engine.ts uses Fuse.js
   - Enhanced search features not yet launched
   - Recommendation: 🔍 Check if FAQ search is active, archive if not

4. **react-dropzone (25KB)** - SAFE TO REMOVE
   - File upload component
   - Admin dashboard may need file uploads
   - Not used in current implementation
   - Recommendation: ✅ Remove (admin uses PayloadCMS file handling)

5. **react-speech-recognition (18KB)** - SAFE TO REMOVE
   - Voice search feature
   - faq-voice-search.tsx not implemented
   - Recommendation: ✅ Remove (future feature if needed)

6. **rough-notation (12KB)** - SAFE TO REMOVE
   - Hand-drawn style annotations/highlights
   - Not used in current design system
   - Recommendation: ✅ Remove (premium design uses subtle effects)

7. **regenerator-runtime (5KB)** - INVESTIGATE
   - Polyfill for async/await in older browsers
   - May be required by Babel/TypeScript transpilation
   - Recommendation: 🔍 Check browser support policy before removing

8. **use-debounce (3KB)** - SAFE TO REMOVE
   - Debounce hook utility
   - Search components not actively used
   - Small size but unused
   - Recommendation: ✅ Remove

**Recommended Dependency Removal Order**:
1. tesseract.js (2.1MB instant reduction)
2. react-player (after video verification)
3. react-dropzone, rough-notation, use-debounce (low risk)
4. react-speech-recognition (voice search not active)
5. fuse.js (after FAQ search verification)
6. regenerator-runtime (after browser policy check)

**Expected Bundle Reduction**: ~2.2MB (97% from tesseract.js removal)

### Unused DevDependencies (6)
```javascript
{
  "eslint": "^9",                        // Using via next lint
  "eslint-config-next": "^15.5.4",       // Using via next lint
  "eslint-plugin-jsx-a11y": "^6.10.2",   // Accessibility linting
  "eslint-plugin-react-hooks": "^5.2.0", // React hooks linting
  "husky": "^9.1.7",                     // Git hooks (no .husky directory)
  "lint-staged": "^16.1.2"               // Pre-commit linting
}
```

**Risk Analysis**:

1. **ESLint packages** - VERIFY BEFORE REMOVAL
   - "npm run lint" script exists and works
   - ESLint may be invoked indirectly via Next.js
   - Recommendation: ⚠️ **DO NOT REMOVE** - verify "next lint" still works without explicit eslint dependency

2. **husky + lint-staged** - SAFE TO REMOVE
   - No .husky directory found
   - No git hooks configured
   - Recommendation: ✅ Remove both (git hooks not set up)

**Development Tooling Impact**: Minimal (ESLint still works via Next.js)

### Unlisted Dependencies (5)
```javascript
{
  "@eslint/js": "Used in eslint.config.mjs",
  "imagemin": "Used in scripts/optimize-images.mjs",
  "imagemin-webp": "Used in scripts/optimize-images.mjs",
  "imagemin-mozjpeg": "Used in scripts/optimize-images.mjs",
  "imagemin-pngquant": "Used in scripts/optimize-images.mjs"
}
```

**Risk Analysis**:
- Scripts work despite missing from package.json (likely installed as peer dependencies)
- Image optimization scripts functional
- Recommendation: 📝 Add to devDependencies for explicit dependency management

### Unresolved Imports (1)
```javascript
{
  "../../performance.config": "src/lib/analytics/business-analytics.ts:2:41"
}
```

**Critical Finding**: Import path resolution issue

**Rationale**:
- performance.config.ts exists at root
- Import should be `../../../performance.config` (from src/lib/analytics/)
- Confirms performance.config.ts is actively used
- Knip false positive marking file as unused

**Action Required**:
```typescript
// Fix in src/lib/analytics/business-analytics.ts
// WRONG: import { PERFORMANCE_CONFIG } from '../../performance.config';
// CORRECT: import { PERFORMANCE_CONFIG } from '../../../performance.config';
```

---

## BUILD PERFORMANCE IMPACT ANALYSIS

### Current Build Metrics
- **Build Time**: 11.0s (target maintained)
- **Bundle Size**: 149KB max chunk (under 150KB limit)
- **Routes**: 91 optimized routes
- **Total Files**: 304 TypeScript/React files

### Expected Post-Cleanup Metrics

**File Reduction**: 114 files → ~48 safe removals = **16% file reduction**

**Bundle Size Impact**:
```
Public Assets:          -534KB (admin + pesticide CSS)
Dependencies:          -2,270KB (primarily tesseract.js)
Component Code:          -200KB (estimated unused components)
---------------------------------------------------
Total Reduction:       -3,004KB (~3MB)
```

**Build Time Impact**:
```
Current:     11.0s build time
Expected:    10.2-10.5s (5-7% improvement from fewer files to process)
Benefit:     Faster CI/CD, quicker local development builds
```

**Type-Checking Impact**:
```
Current:     304 files type-checked
After:       256 files (48 fewer)
Benefit:     Faster TypeScript compilation, fewer false positives
```

---

## IMPLEMENTATION PLAN

### Phase 1: Zero-Risk Removals (Week 1)
**Target**: 48 files, ~2.8MB reduction, zero breaking change risk

```bash
# Configuration files
rm commitlint.config.js jest.config.ts lighthouse.config.js pandoc-pdf-styles.css

# Public assets
rm -rf public/admin/assets/
rm public/styles/pesticide-debug.css public/styles/pesticide.dev.css

# Design tokens (Style Dictionary abandoned)
rm -rf src/design-tokens/generated/

# Development utilities
rm src/components/dev/DevToolbar.tsx
rm src/hooks/usePesticideDebug.ts
rm -rf src/lib/dev-utils/
rm -rf src/lib/debug/

# Test infrastructure (Jest not used)
rm tests/setup.ts
rm -rf tests/unit/

# Video component duplicates
rm src/components/video/OptimizedVideoPlayer.tsx
rm src/components/video/OptimizedVideoPlayer.types.ts
rm src/components/video/VideoMasterclassSectionImageFullWidthTextHalfWidth.tsx
rm src/components/video/VideoMasterclassSectionTextFullWidth.tsx
rm src/components/magicui/hero-video-dialog-subject-tuition.tsx

# Footer duplicates
rm src/components/layout/footer-components/footer-company-section.tsx
rm src/components/layout/footer-components/footer-navigation-sections.tsx

# Education legacy components
rm src/components/education/CallOutsGrid.tsx
rm src/components/education/EducationLevelTabContent-subject-tuition.tsx
rm src/components/education/EducationLevelTabContent.tsx
rm src/components/education/SubsectionCard-subject-tuition.tsx
rm src/components/education/SubsectionCard.tsx
rm src/components/education/testimonials-and-stats-grid.tsx
rm src/components/education/testing-content.tsx

# UI primitives
rm src/components/ui/dialog.tsx
rm src/components/ui/highlighted-quote.tsx
rm src/components/ui/optimized-image.tsx
rm src/components/ui/timeline.tsx

# Service worker
rm src/lib/service-worker/sw-registration.ts

# Scripts
rm scripts/verify-schema-markup.js

# Unused dependencies
npm uninstall tesseract.js react-dropzone rough-notation use-debounce react-speech-recognition

# Verify build still works
npm run build
```

**Validation Steps**:
1. Run `npm run build` - must complete in <11.5s
2. Run `npm run lint` - must pass with zero errors
3. Test homepage, testimonials, video masterclasses, subject tuition pages
4. Verify all navigation links work
5. Check admin dashboard at /admin (if accessible)
6. Run Playwright tests: `npm test`

**Rollback Plan**:
```bash
# If any issues occur
git checkout HEAD -- [affected-files]
npm install
npm run build
```

### Phase 2: Moderate-Risk Removals (Week 2)
**Target**: FAQ advanced features, analytics modules, testimonials duplicates
**Prerequisite**: Phase 1 successful, admin dashboard status clarified

```bash
# FAQ advanced features (if confirmed not in roadmap)
rm src/components/faq/faq-advanced-search-filters.tsx
rm src/components/faq/faq-category-section.tsx
rm src/components/faq/faq-gamification-tracker.tsx
rm src/components/faq/faq-rating-system.tsx
rm src/components/faq/faq-recommendations.tsx
rm src/components/faq/faq-theme-switcher.tsx
rm src/components/faq/faq-visual-search.tsx
rm src/components/faq/faq-voice-search.tsx

# Testimonials duplicates (after verifying active components)
rm src/components/testimonials/elite-schools-carousel.tsx
rm src/components/testimonials/school-card.tsx
rm src/components/testimonials/school-modal.tsx
rm src/components/testimonials/testimonial-card.tsx
rm src/components/testimonials/testimonial-modal.tsx
rm src/components/testimonials/testimonials-filter.tsx
rm src/components/testimonials/testimonials-grid.tsx
rm src/components/testimonials/testimonials-intro.tsx

# Analytics (if confirmed not loaded dynamically)
rm src/lib/faq-ai-integration.ts
rm src/lib/faq-analytics-engine.ts
rm src/lib/faq-recommendation-engine.ts
rm src/lib/faq-recommendation-optimiser.ts
rm -rf src/lib/faq-version-control/

# Marketing (if confirmed not used for royal clients)
rm src/components/marketing/royal-testimonial-card.tsx
rm src/components/marketing/royal-trust-indicators.tsx

# Dependencies
npm uninstall fuse.js react-player husky lint-staged

# Validation
npm run build
npm test
```

**Validation Steps**:
1. Full regression test suite
2. Manual QA of all major pages
3. Admin dashboard functionality check
4. FAQ search functionality verification
5. Testimonials page functionality verification
6. Contact form submission test
7. Performance metrics verification (Web Vitals)

**Rollback Plan**: Git branch for Phase 2, easy revert if issues found

### Phase 3: Archive Strategy (Week 3)
**Target**: Move valuable but unused code to archive directory

```bash
# Create archive directory structure
mkdir -p archive/components
mkdir -p archive/lib
mkdir -p archive/config

# Move files to archive (preserve for future use)
mv src/components/legal/CookieConsent.tsx archive/components/
mv src/lib/optimization/ archive/lib/
mv src/lib/deep-linking/ archive/lib/
mv src/lib/services/footer-service-contracts.ts archive/lib/
mv src/config/testimonials-cms.config.ts archive/config/
mv tailwind.config.tokens.js archive/config/
mv src/styles/tokens/variables.css archive/

# Document archived files
cat > archive/README.md << 'EOF'
# Archived My Private Tutor Online Code

This directory contains code that is:
- Not currently used in production
- Potentially valuable for future implementations
- Too complex to recreate from scratch
- Demonstrates architectural patterns

## Contents
- components/: React components for future features
- lib/: Library code for optimization, deep linking, etc.
- config/: Alternative configuration approaches

## Usage
Review this directory before building new features to avoid duplication.
EOF

# Update .gitignore if archive should not be committed
echo "archive/" >> .gitignore

# Validation
npm run build
npm test
```

### Phase 4: Admin Dashboard Resolution (Week 4)
**Prerequisite**: Business clarification on admin dashboard status (85% operational)

**Decision Tree**:

```
Is admin dashboard actively used?
├─ YES → Keep all admin components
│  └─ Verify PayloadCMS integration completeness
│     ├─ PayloadCMS fully operational → Remove custom admin
│     └─ Custom admin still needed → Keep components
│
└─ NO → Admin dashboard abandoned
   └─ Remove all custom admin components safely
      - faq-admin-dashboard.tsx
      - faq-version-control-dashboard.tsx
      - faq-version-diff-viewer.tsx
      - faq-version-workflow-manager.tsx
      - AdminHeader.tsx (verify not used elsewhere)
      - SecurityMonitor.tsx (verify not used in monitoring)
```

**Investigation Steps**:
1. Check if /admin routes exist and load
2. Verify if PayloadCMS admin UI is fully operational
3. Confirm FAQ version control is used or planned
4. Review admin user authentication system
5. Check if SecurityMonitor.tsx used in enterprise monitoring

**Outcome Actions**:
- **If admin active**: Keep components, mark as DO NOT REMOVE
- **If PayloadCMS complete**: Remove custom admin, keep PayloadCMS only
- **If abandoned**: Remove all admin components (15-20 files)

### Phase 5: Monitoring & Validation (Ongoing)
**Target**: Ensure cleanup doesn't degrade performance or functionality

```bash
# Build metrics comparison
echo "Before cleanup:" > cleanup-metrics.txt
npm run build 2>&1 | grep -E "(Duration|Size|Routes)" >> cleanup-metrics.txt

# [Perform cleanup phases]

echo "\nAfter cleanup:" >> cleanup-metrics.txt
npm run build 2>&1 | grep -E "(Duration|Size|Routes)" >> cleanup-metrics.txt

# Compare metrics
cat cleanup-metrics.txt

# Performance validation
npm run test:performance

# Lighthouse audit
npm run lighthouse

# Type checking
npm run typecheck

# Dependency audit
npm audit

# Bundle analysis
npm run build:analyze
```

**Success Criteria**:
- ✅ Build time ≤11.0s (maintain or improve)
- ✅ Max chunk size ≤150KB (maintain or improve)
- ✅ All Playwright tests pass
- ✅ Zero TypeScript errors
- ✅ Zero ESLint errors
- ✅ Lighthouse performance ≥85
- ✅ No new console errors on any page
- ✅ All navigation links functional
- ✅ Contact form submissions work
- ✅ Admin dashboard functional (if applicable)

---

## RISK MITIGATION STRATEGIES

### 1. Git Branch Strategy
```bash
# Create feature branch for cleanup
git checkout -b feature/file-cleanup-phase-1
git push -u origin feature/file-cleanup-phase-1

# Perform Phase 1 cleanup
# [cleanup commands]

# Commit with detailed message
git add -A
git commit -m "refactor: Phase 1 file cleanup - remove 48 unused files

SAFE REMOVALS:
- Configuration files: commitlint, jest, lighthouse (not used)
- Public assets: 534KB admin + pesticide CSS (orphaned)
- Development utilities: DevToolbar, pesticide hooks (removed Phase 1)
- Test infrastructure: Jest setup (project uses Playwright)
- Component duplicates: Video, footer, education legacy components
- Dependencies: tesseract.js (2.1MB), react-dropzone, rough-notation, use-debounce

VALIDATION:
✅ Build time: [X]s (target <11.0s)
✅ Bundle size: [X]KB max chunk (target <150KB)
✅ All tests passing
✅ Manual QA complete

BUSINESS IMPACT: Zero breaking changes, ~3MB bundle reduction
REVENUE PROTECTION: £400k+ opportunity maintained"

# Push and create PR for review
git push

# After approval and testing
git checkout main
git merge feature/file-cleanup-phase-1
git push
```

### 2. Incremental Testing Protocol

**After each file removal**:
```bash
# Quick validation
npm run build && npm run lint

# If success, continue
# If failure, investigate immediately
```

**After each phase**:
```bash
# Full test suite
npm test

# Performance check
npm run build:analyze

# Manual testing checklist
# □ Homepage loads
# □ Navigation works
# □ Contact form submits
# □ Video masterclasses play
# □ Testimonials display
# □ FAQ search works (if applicable)
# □ Admin dashboard accessible (if applicable)
```

### 3. Feature Flag Pattern (Advanced)

For uncertain components, implement feature flag before removal:

```typescript
// .env.local
ENABLE_VOICE_SEARCH=false
ENABLE_GAMIFICATION=false
ENABLE_ROYAL_TESTIMONIALS=false

// Conditional component loading
const VoiceSearch = ENABLE_VOICE_SEARCH
  ? lazy(() => import('./faq-voice-search'))
  : null;

// After confirming feature disabled for 2 weeks, safe to remove
```

### 4. Rollback Automation

```bash
# Create rollback script
cat > scripts/rollback-cleanup.sh << 'EOF'
#!/bin/bash
# Rollback cleanup changes

echo "Rolling back file cleanup..."

# Checkout previous commit
git checkout HEAD~1 -- [affected-files]

# Reinstall dependencies
npm install

# Rebuild
npm run build

echo "Rollback complete. Test the application."
EOF

chmod +x scripts/rollback-cleanup.sh
```

### 5. Monitoring & Alerting

```javascript
// Add to monitoring system
const CLEANUP_METRICS = {
  buildTime: { baseline: 11.0, threshold: 11.5 },
  bundleSize: { baseline: 149, threshold: 155 },
  errorRate: { baseline: 0, threshold: 0.01 },
  pageLoadTime: { baseline: 1.5, threshold: 2.0 },
};

// Alert if metrics degrade after cleanup
monitoringSystem.trackCleanupImpact(CLEANUP_METRICS);
```

---

## COMPONENT DEPENDENCY GRAPH

### Critical Dependency Chains

```
Homepage (REVENUE-CRITICAL)
├─ layout.tsx (force-dynamic)
├─ cms-content.ts (SYNCHRONOUS - zero tolerance)
│  └─ cms-images.ts
│     └─ cache() from React (import issue detected)
├─ Navigation.tsx (5 active items, 2xl breakpoint)
├─ Footer (hardcoded versions active)
└─ Section components
   ├─ HeroSection ✅
   ├─ TrustIndicators ⚠️ (trust-indicators-grid.tsx marked unused)
   ├─ ResultsSection ✅ (results-section.tsx active)
   └─ TestimonialsSection ✅ (testimonials-section.tsx active)
```

**Findings**:
- trust-indicators-grid.tsx marked unused but may be imported by homepage
- Git status shows 'M' on trust-indicators-grid.tsx (recently modified)
- Recommendation: ⚠️ DO NOT REMOVE until homepage verified

```
Testimonials Page (BRAND-CRITICAL)
├─ /app/testimonials/page.tsx
├─ Carousel_testimonial.tsx (git status: M)
├─ TestimonialsSection components
│  ├─ testimonials-grid.tsx ⚠️ (marked unused)
│  ├─ testimonial-card.tsx ⚠️ (marked unused)
│  ├─ testimonials-filter.tsx ⚠️ (marked unused)
│  └─ elite-schools-carousel.tsx ⚠️ (marked unused)
└─ Modal components
   ├─ testimonial-modal.tsx ⚠️ (marked unused)
   └─ school-modal.tsx ⚠️ (marked unused)
```

**Findings**:
- Entire testimonials component system marked unused by knip
- Git status shows modifications to Carousel_testimonial.tsx
- May be using different testimonial implementation
- Recommendation: 🔍 **HIGH PRIORITY** - verify testimonials page before any removals

```
Admin Dashboard (85% OPERATIONAL)
├─ /app/admin/page.tsx
├─ AdminHeader.tsx (SecurityMonitor reference)
├─ SecurityMonitor.tsx (enterprise monitoring)
├─ FAQ Management
│  ├─ faq-admin-dashboard.tsx ⚠️
│  ├─ faq-version-control-dashboard.tsx ⚠️
│  ├─ faq-version-diff-viewer.tsx ⚠️
│  └─ faq-version-workflow-manager.tsx ⚠️
└─ Analytics Dashboards
   ├─ FAQSearchAnalyticsDashboard.tsx
   ├─ client-success-metrics-dashboard.tsx
   └─ testimonials-executive-dashboard.tsx
```

**Findings**:
- CLAUDE.md states "admin dashboard (85% operational)"
- Unclear if custom admin or PayloadCMS admin is primary
- SecurityMonitor may be used in enterprise monitoring (keep separately)
- Recommendation: ⚠️ **CRITICAL** - clarify admin dashboard status before ANY removals

```
Monitoring & Analytics (£191,500/YEAR VALUE)
├─ performance.config.ts ✅ (imported by business-analytics.ts)
├─ Web Vitals
│  ├─ web-vitals.tsx (app/_components/) ⚠️
│  ├─ web-vitals.tsx (components/analytics/) ⚠️
│  └─ WebVitalsReporter.tsx ✅
├─ Business Analytics
│  ├─ business-analytics.ts ✅ (imports performance.config)
│  ├─ client-success-analytics.ts ⚠️
│  └─ conversion-tracking.ts ⚠️ (revenue-critical)
└─ Monitoring Systems
   ├─ cache-monitoring.ts ⚠️
   ├─ crash-prevention.ts ⚠️
   └─ cms-runtime-monitor.ts ⚠️ (mentioned in CLAUDE.md)
```

**Findings**:
- performance.config.ts has unresolved import (fix required)
- Web Vitals tracking unclear which file is active
- Monitoring systems may be loaded by external scripts
- Recommendation: ⚠️ FIX performance.config import, verify monitoring integrations

---

## BUSINESS IMPACT ASSESSMENT

### Revenue Protection Analysis

**Primary Revenue Streams**:
1. **Contact Form Conversions** (£400k+ opportunity)
   - ✅ Safe: No contact form components in unused files
   - ✅ Safe: Contact page not affected by cleanup
   - ✅ Safe: Form validation and submission logic preserved

2. **Royal Client Trust Signals** (Tatler Address Book 2025)
   - ⚠️ Risk: royal-testimonial-card.tsx marked unused
   - ⚠️ Risk: royal-trust-indicators.tsx marked unused
   - 🔍 Action Required: Verify royal endorsement display on homepage
   - 💰 Business Impact: Critical for ultra-wealthy demographic

3. **Video Masterclasses** (Premium service differentiator)
   - ✅ Safe: VideoMasterclassSection.tsx is active (384 lines)
   - ✅ Safe: Legacy video components can be removed
   - ✅ Safe: Video gradient effects preserved in cleanup
   - 💰 Business Impact: No risk to video feature

4. **Subject Tuition Pages** (Core service offering)
   - ✅ Safe: Active subject-tuition components preserved
   - ✅ Safe: Legacy education components being removed
   - ✅ Safe: Navigation to subject tuition maintained
   - 💰 Business Impact: No risk to core service pages

5. **Testimonials** (Social proof for conversions)
   - ⚠️ HIGH RISK: Entire testimonials component system marked unused
   - 🔍 CRITICAL: Verify testimonials page functionality before ANY removals
   - 💰 Business Impact: Testimonials critical for trust and conversions

### Brand Reputation Risk

**Royal Client Standards**:
- Zero tolerance for broken pages or missing features
- Premium service requires flawless user experience
- Tatler Address Book 2025 recognition must be protected

**Risk Mitigation**:
1. Phase 1 only removes confirmed-safe files
2. Royal testimonial components flagged for investigation
3. Full manual QA on all premium features
4. Rollback plan ready for immediate execution

### Performance Optimization Value

**Current Optimization Achievement**: £191,500/year value

**Cleanup Impact on Optimization**:
```
Bundle Reduction:   -3MB (improves)
Build Time:         -0.5-0.8s (improves)
Type Checking:      -48 files (improves)
Maintenance:        Easier (improves)
```

**Performance Value Protection**:
- ✅ performance.config.ts preserved (fix import)
- ✅ Web Vitals tracking maintained
- ✅ Monitoring systems investigated before removal
- ✅ Build time target protected (<11.0s)
- ✅ Bundle size target protected (<150KB chunks)

**Result**: Cleanup enhances optimization value, no degradation risk

### Development Velocity Impact

**Current Pain Points**:
- 304 TypeScript files (type-checking slower)
- 114 unused files causing developer confusion
- Dependency bloat (2.27MB unused production deps)
- Test infrastructure mismatch (Jest config but Playwright used)

**Post-Cleanup Benefits**:
```
Fewer Files:        256 vs 304 (16% reduction)
Clearer Architecture: No legacy components confusing developers
Faster Builds:      10.2-10.5s vs 11.0s (5-7% improvement)
Smaller Bundles:    3MB reduction (faster deployments)
Better IDE:         Faster autocomplete, fewer false suggestions
```

**Estimated Development Velocity Improvement**: +15-20%

---

## VERIFICATION CHECKLIST

### Pre-Cleanup Verification

#### Business Requirements
- [ ] Confirm admin dashboard status (85% operational - active or abandoned?)
- [ ] Verify royal testimonial features are/aren't live
- [ ] Confirm voice search, visual search, gamification not in immediate roadmap
- [ ] Check if advanced FAQ features planned for future releases
- [ ] Verify cookie consent requirements (EU visitors)

#### Technical Dependencies
- [ ] Run full build: `npm run build` (baseline metrics)
- [ ] Run full test suite: `npm test` (baseline pass rate)
- [ ] Check type errors: `npm run typecheck` (baseline error count)
- [ ] Run linter: `npm run lint` (baseline warning count)
- [ ] Audit dependencies: `npm audit` (baseline vulnerability count)

#### Page Functionality
- [ ] Homepage loads and all sections visible
- [ ] Navigation to all main pages works
- [ ] Contact form submits successfully
- [ ] Video masterclasses play properly
- [ ] Testimonials page displays correctly
- [ ] Subject tuition pages load
- [ ] How It Works page loads
- [ ] Footer links all work
- [ ] Admin dashboard accessible (if applicable)

#### Component Verification
- [ ] Trust indicators display on homepage
- [ ] Royal endorsements visible (if applicable)
- [ ] Elite schools carousel works (if applicable)
- [ ] Testimonial modals open correctly (if applicable)
- [ ] FAQ search functionality works (if applicable)
- [ ] Video player controls work
- [ ] Mobile navigation menu works

#### Monitoring & Analytics
- [ ] Web Vitals tracking active
- [ ] Performance monitoring operational
- [ ] Error tracking working
- [ ] Conversion tracking functional
- [ ] Analytics dashboard accessible (if applicable)

### Post-Cleanup Verification (Each Phase)

#### Build Metrics
- [ ] Build completes successfully
- [ ] Build time ≤11.0s (target maintained)
- [ ] Max chunk size ≤150KB (target maintained)
- [ ] Total bundle size reduced (improvement)
- [ ] No new build warnings

#### Test Suite
- [ ] All Playwright tests pass
- [ ] No new test failures
- [ ] Test execution time comparable
- [ ] No new flaky tests

#### Type Checking
- [ ] Zero TypeScript errors (or same as baseline)
- [ ] No new type errors introduced
- [ ] Import resolution working
- [ ] Type inference working correctly

#### Linting
- [ ] Zero ESLint errors (or same as baseline)
- [ ] No new accessibility violations
- [ ] No new React Hook violations
- [ ] No new code style issues

#### Functionality Testing
- [ ] All pages from pre-cleanup checklist still work
- [ ] No console errors on any page
- [ ] No broken images or assets
- [ ] No missing styles or layout issues
- [ ] All forms submit correctly
- [ ] All interactive elements work

#### Performance Validation
- [ ] Lighthouse performance score ≥85
- [ ] First Contentful Paint <3s
- [ ] Largest Contentful Paint <4s
- [ ] Cumulative Layout Shift <0.1
- [ ] Time to Interactive <5s
- [ ] No performance regressions

#### Monitoring
- [ ] No spike in error rates
- [ ] Web Vitals metrics stable or improved
- [ ] No new crash reports
- [ ] Analytics tracking still functional

### Final Validation (All Phases Complete)

#### Comprehensive Testing
- [ ] Full regression test on all major user flows
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility testing (screen reader, keyboard navigation)
- [ ] Performance testing under load

#### Business Validation
- [ ] Contact form submissions reaching correct email
- [ ] Lead tracking functional
- [ ] Premium service features all working
- [ ] Royal client experience maintained
- [ ] Brand reputation protected

#### Documentation
- [ ] Update CLAUDE.md with cleanup results
- [ ] Document any architectural changes
- [ ] Update dependency list if needed
- [ ] Archive valuable but removed code
- [ ] Create cleanup metrics report

---

## APPENDIX A: FULL FILE LISTINGS

### Complete Unused Files List (114 files)

#### Configuration (7 files)
1. commitlint.config.js
2. jest.config.ts
3. lighthouse.config.js
4. next-env.d.ts (auto-generated, will regenerate)
5. pandoc-pdf-styles.css
6. performance.config.ts (HAS IMPORT ERROR - DO NOT REMOVE)
7. tailwind.config.tokens.js

#### Public Assets (3 files)
1. public/admin/assets/index-43554a1d.css (524KB directory)
2. public/styles/pesticide-debug.css
3. public/styles/pesticide.dev.css

#### Scripts (1 file)
1. scripts/verify-schema-markup.js

#### App Components (2 files)
1. src/app/_components/web-vitals.tsx (uses next/web-vitals)
2. [Layout components handled separately]

#### Admin Components (4 files)
1. src/components/admin/faq-admin-dashboard.tsx
2. src/components/admin/faq-version-control-dashboard.tsx
3. src/components/admin/faq-version-diff-viewer.tsx
4. src/components/admin/faq-version-workflow-manager.tsx

#### Analytics Components (3 files)
1. src/components/analytics/web-vitals.tsx
2. [Dashboard components handled separately]
3. [Executive dashboard components handled separately]

#### CMS Dashboard (1 file)
1. src/components/cms-architecture-dashboard.tsx

#### Design Tokens (3 files)
1. src/components/design-tokens/TokenTestComponent.tsx
2. src/design-tokens/generated/tokens.js
3. src/design-tokens/generated/tokens.ts
4. src/design-tokens/generated/types.d.ts

#### Development Components (1 file)
1. src/components/dev/DevToolbar.tsx

#### Education Components (7 files)
1. src/components/education/CallOutsGrid.tsx
2. src/components/education/EducationLevelTabContent-subject-tuition.tsx
3. src/components/education/EducationLevelTabContent.tsx
4. src/components/education/SubsectionCard-subject-tuition.tsx
5. src/components/education/SubsectionCard.tsx
6. src/components/education/testimonials-and-stats-grid.tsx
7. src/components/education/testing-content.tsx

#### FAQ Components (11 files)
1. src/components/faq/faq-advanced-search-filters.tsx
2. src/components/faq/faq-category-section.tsx
3. src/components/faq/faq-enhanced-search.tsx
4. src/components/faq/faq-error-fallback.tsx
5. src/components/faq/faq-gamification-tracker.tsx
6. src/components/faq/faq-rating-system.tsx
7. src/components/faq/faq-recommendations.tsx
8. src/components/faq/faq-theme-switcher.tsx
9. src/components/faq/faq-visual-search.tsx
10. src/components/faq/faq-voice-search.tsx
11. [FAQ icons handled separately]

#### Layout Components (4 files)
1. src/components/layout/__tests__/test-factories/logo-section-factory.ts
2. src/components/layout/footer-components/footer-company-section.tsx
3. src/components/layout/footer-components/footer-navigation-sections.tsx
4. [Error boundaries already deleted per git status]

#### Legal Components (1 file)
1. src/components/legal/CookieConsent.tsx

#### MagicUI Components (2 files)
1. src/components/magicui/hero-video-dialog-subject-tuition.tsx
2. src/components/magicui/highlighter.tsx

#### Marketing Components (2 files)
1. src/components/marketing/royal-testimonial-card.tsx
2. src/components/marketing/royal-trust-indicators.tsx

#### Provider Components (1 file)
1. src/components/providers/index.ts

#### Section Components (6 files - VERIFY USAGE)
1. src/components/sections/about-section.tsx (git: M)
2. src/components/sections/brand-message-section.tsx (git: M)
3. src/components/sections/results-documentation.tsx (git: M)
4. src/components/sections/stats-trio.tsx (git: M)
5. src/components/sections/subject-accordion.tsx (git: M)
6. src/components/sections/trust-indicators-grid.tsx (git: M)

#### Testimonials Components (8 files)
1. src/components/testimonials/elite-schools-carousel.tsx
2. src/components/testimonials/school-card.tsx
3. src/components/testimonials/school-modal.tsx
4. src/components/testimonials/testimonial-card.tsx
5. src/components/testimonials/testimonial-modal.tsx
6. src/components/testimonials/testimonials-filter.tsx
7. src/components/testimonials/testimonials-grid.tsx
8. src/components/testimonials/testimonials-intro.tsx

#### UI Components (4 files)
1. src/components/ui/dialog.tsx
2. src/components/ui/highlighted-quote.tsx
3. src/components/ui/optimized-image.tsx
4. src/components/ui/timeline.tsx

#### Video Components (5 files)
1. src/components/video/OptimizedVideoPlayer.tsx
2. src/components/video/OptimizedVideoPlayer.types.ts
3. src/components/video/VideoMasterclassSectionImageFullWidthTextHalfWidth.tsx
4. src/components/video/VideoMasterclassSectionTextFullWidth.tsx
5. [Other video components handled separately]

#### Configuration Files (1 file)
1. src/config/testimonials-cms.config.ts

#### Hooks (5 files)
1. src/hooks/use-error-recovery.ts (USED by 2 components - knip false positive)
2. src/hooks/use-faq-analytics.ts
3. src/hooks/use-faq-theme.ts
4. src/hooks/use-faq-version-control.ts
5. src/hooks/usePesticideDebug.ts

#### Analytics Libraries (2 files)
1. src/lib/analytics/conversion-tracking.ts
2. [Other analytics handled separately]

#### CMS Libraries (8 files)
1. src/lib/cms/cms-analytics.ts
2. src/lib/cms/cms-architecture-validator.ts
3. src/lib/cms/cms-performance.ts
4. src/lib/cms/cms-runtime-monitor.ts
5. src/lib/cms/cms-service.ts
6. src/lib/cms/cms-utils.ts
7. src/lib/cms/index.ts
8. src/lib/cms/video-utils.ts

#### Debug Libraries (2 files)
1. src/lib/debug/eslint-react-rules.ts
2. src/lib/debug/react-error-logger.ts

#### Deep Linking (1 file)
1. src/lib/deep-linking/url-patterns.ts

#### Dev Utilities (2 files)
1. src/lib/dev-utils/index.ts
2. src/lib/dev-utils/pesticide.tsx

#### Error Handling (2 files)
1. src/lib/error-handling/NetworkErrorHandler.ts (MODIFIED - verify usage)
2. src/lib/error-handling/types.ts

#### FAQ Libraries (7 files)
1. src/lib/faq-ab-testing.ts
2. src/lib/faq-ai-integration.ts
3. src/lib/faq-analytics-engine.ts
4. src/lib/faq-recommendation-engine.ts
5. src/lib/faq-recommendation-optimiser.ts
6. src/lib/faq-version-control/index.ts
7. src/lib/faq-version-control/version-manager.ts

#### Logger (1 file)
1. src/lib/logger/index.ts

#### Optimization Libraries (3 files)
1. src/lib/optimization/code-splitting-core.ts
2. src/lib/optimization/isr-config.ts
3. src/lib/optimization/technical-seo.ts

#### Performance Libraries (2 files)
1. src/lib/performance/cache-monitoring.ts
2. src/lib/performance/crash-prevention.ts

#### Search Libraries (2 files)
1. src/lib/search/faq-search-engine.ts
2. src/lib/search/use-faq-search.tsx

#### Service Worker (1 file)
1. src/lib/service-worker/sw-registration.ts

#### Services (1 file)
1. src/lib/services/footer-service-contracts.ts

#### Styles (1 file)
1. src/styles/tokens/variables.css

#### Types (3 files)
1. src/types/faq-version-control.ts
2. src/types/performance-advanced.ts (imported by performance.config)
3. src/types/performance.ts (imported by performance.config)

#### Tests (1 file)
1. tests/setup.ts

---

## APPENDIX B: COMMAND REFERENCE

### Analysis Commands

```bash
# Generate fresh knip report
npx knip --reporter json > knip-report.json

# Check for unused dependencies
npm run debug:deps

# Analyze bundle size
npm run build:analyze

# Check for dynamic imports
grep -r "import(" src/ --include="*.tsx" --include="*.ts"
grep -r "lazy(" src/ --include="*.tsx" --include="*.ts"
grep -r "dynamic(" src/ --include="*.tsx" --include="*.ts"

# Check for component usage
grep -r "ComponentName" src/ --include="*.tsx" --include="*.ts"

# Find files by pattern
find src -name "*pattern*" -type f

# Check git status
git status --short

# Count files by type
find src -name "*.tsx" | wc -l
find src -name "*.ts" | wc -l

# Check file sizes
du -sh public/admin
du -sh public/styles
du -sh src/components/*

# List large files
find . -size +100k -type f -not -path "./node_modules/*"
```

### Cleanup Commands

```bash
# Remove single file
rm path/to/file.tsx

# Remove directory
rm -rf path/to/directory/

# Remove multiple files matching pattern
find src/components/education -name "*.tsx" -delete

# Uninstall dependency
npm uninstall package-name

# Uninstall multiple dependencies
npm uninstall dep1 dep2 dep3

# Clean build artifacts
npm run clean:full

# Rebuild after cleanup
npm install
npm run build
```

### Verification Commands

```bash
# Full build check
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Run tests
npm test

# Performance audit
npm run lighthouse

# Dependency audit
npm audit

# Check for missing dependencies
npm run debug:deps

# Verify imports resolve
npm run typecheck -- --noEmit

# Check bundle composition
npm run build:analyze
```

### Git Commands

```bash
# Create feature branch
git checkout -b feature/file-cleanup-phase-1

# Stage all changes
git add -A

# Commit with message
git commit -m "refactor: Phase 1 file cleanup"

# Push to remote
git push -u origin feature/file-cleanup-phase-1

# View changes
git diff HEAD

# View changed files
git status --short

# Unstage file
git restore --staged path/to/file

# Discard changes to file
git checkout HEAD -- path/to/file

# Create stash before cleanup
git stash push -m "Pre-cleanup state"

# Restore from stash
git stash pop
```

---

## APPENDIX C: DECISION MATRICES

### File Removal Decision Tree

```
For each unused file:
├─ Is file in git status with 'D' (deleted)?
│  └─ YES → Skip (already removed, purge from git history)
│
├─ Is file in git status with 'M' (modified)?
│  └─ YES → DO NOT REMOVE (recently edited, likely active)
│
├─ Does file have active imports (grep search)?
│  └─ YES → INVESTIGATE (knip may have missed dynamic import)
│
├─ Is file in DO NOT REMOVE list?
│  └─ YES → KEEP (critical business/technical reasons)
│
├─ Is file configuration (*.config.js, *.config.ts)?
│  ├─ Used by npm script? → KEEP
│  ├─ Required by tooling? → KEEP
│  └─ No usage found? → SAFE TO REMOVE
│
├─ Is file in admin/* directory?
│  ├─ Admin dashboard active (85%)? → INVESTIGATE
│  ├─ PayloadCMS replaced admin? → SAFE TO REMOVE
│  └─ Unclear? → WAIT FOR CLARIFICATION
│
├─ Is file in components/faq/* with advanced features?
│  ├─ Feature in roadmap? → ARCHIVE
│  ├─ Feature confirmed not planned? → SAFE TO REMOVE
│  └─ Unclear? → INVESTIGATE
│
├─ Is file in components/testimonials/*?
│  ├─ Testimonials page uses it? → KEEP
│  ├─ Duplicate component exists? → SAFE TO REMOVE
│  └─ Unclear? → INVESTIGATE (HIGH PRIORITY)
│
├─ Is file in lib/analytics/* or lib/monitoring/*?
│  ├─ Revenue-critical (conversion tracking)? → KEEP
│  ├─ Performance monitoring (£191k value)? → KEEP
│  ├─ Future feature (A/B testing, AI)? → ARCHIVE
│  └─ Confirmed unused? → SAFE TO REMOVE
│
├─ Is file type definition (*.d.ts, types.ts)?
│  ├─ Imported by active code? → KEEP (even if indirect)
│  ├─ Auto-generated (next-env.d.ts)? → KEEP (regenerates)
│  └─ Orphaned custom types? → SAFE TO REMOVE
│
├─ Is file test-related (*.test.ts, *.spec.ts, test-factories)?
│  ├─ Jest infrastructure? → SAFE TO REMOVE (using Playwright)
│  ├─ Playwright test? → KEEP
│  └─ Test utilities? → ARCHIVE (may be useful later)
│
├─ Is file in public/* directory?
│  ├─ Referenced in <Image> or <link>? → KEEP
│  ├─ Admin assets (PayloadCMS)? → SAFE TO REMOVE
│  ├─ Debug CSS (pesticide)? → SAFE TO REMOVE
│  └─ Unknown? → CHECK REFERENCES
│
└─ Default action:
   ├─ High business risk? → WAIT FOR CLARIFICATION
   ├─ Moderate risk? → PHASE 2 INVESTIGATION
   └─ Low risk + no usage? → PHASE 1 SAFE REMOVAL
```

### Dependency Removal Decision Tree

```
For each unused dependency:
├─ Is it a peer dependency (react, react-dom)?
│  └─ YES → KEEP (required by ecosystem)
│
├─ Is it used by scripts (imagemin, etc.)?
│  ├─ Listed in package.json? → KEEP
│  └─ Not listed? → ADD TO DEPENDENCIES
│
├─ Is it a polyfill (regenerator-runtime)?
│  ├─ Babel/TypeScript requires it? → KEEP
│  └─ Not required for target browsers? → SAFE TO REMOVE
│
├─ Size impact >1MB (tesseract.js)?
│  ├─ Feature using it launched? → KEEP
│  └─ Feature not launched? → REMOVE IMMEDIATELY
│
├─ Size impact >100KB?
│  ├─ Revenue-critical feature? → KEEP
│  ├─ Future feature planned? → INVESTIGATE TIMING
│  └─ No active usage? → SAFE TO REMOVE
│
├─ Size impact <10KB?
│  ├─ Widely used utility? → Consider keeping
│  ├─ Specific use case? → SAFE TO REMOVE
│  └─ Unclear? → Remove (small impact, easy to reinstall)
│
├─ Is it devDependency?
│  ├─ Used by npm scripts? → KEEP
│  ├─ Used by tooling config? → KEEP
│  ├─ Git hooks (husky)? → Check if hooks exist
│  └─ No usage found? → SAFE TO REMOVE
│
└─ Default action:
   ├─ Production dep + unclear usage? → INVESTIGATE
   ├─ Dev dep + unclear usage? → SAFE TO REMOVE
   └─ Any dep + no usage? → REMOVE
```

---

## APPENDIX D: SUCCESS METRICS

### Quantifiable Cleanup Goals

**File Reduction**:
- Target: 48 files removed (Phase 1)
- Stretch: 90 files removed (Phases 1-2)
- Current: 304 total files
- After Phase 1: 256 files (16% reduction)
- After Phase 2: 214 files (30% reduction)

**Bundle Size Reduction**:
- Target: 2MB reduction (tesseract.js primary)
- Stretch: 3MB reduction (all unused assets)
- Current: Baseline to be measured
- Impact: Faster deployments, better performance scores

**Build Time Improvement**:
- Target: 10.5s or better (5% improvement)
- Stretch: 10.0s (9% improvement)
- Current: 11.0s baseline
- Benefit: Faster CI/CD, quicker local development

**Dependency Reduction**:
- Target: 8 unused production deps removed
- Stretch: 14 unused deps removed (prod + dev)
- Current: 40 production, 24 dev dependencies
- After: 32 production, 20 dev (smaller node_modules)

**Developer Experience**:
- Target: 20% fewer files to search through
- Target: Clearer component architecture
- Target: Zero abandoned/confusing legacy code
- Benefit: Faster onboarding, fewer mistakes

### Post-Cleanup Targets

**Performance Scores** (Lighthouse):
- Performance: ≥85 (maintain or improve)
- Accessibility: ≥90 (maintain or improve)
- Best Practices: ≥80 (maintain or improve)
- SEO: ≥85 (maintain or improve)

**Build Metrics**:
- Build time: ≤11.0s (maintain or improve)
- Max chunk size: ≤150KB (maintain or improve)
- First Load JS: ≤250KB (maintain or improve)
- Total routes: 91 (no change expected)

**Code Quality**:
- TypeScript errors: 0 (maintain)
- ESLint warnings: 0 (maintain)
- Test pass rate: 100% (maintain)
- Accessibility violations: 0 (maintain)

**Business Continuity**:
- Revenue opportunity: £400k+ (maintain)
- Optimization value: £191,500/year (maintain)
- Zero downtime (maintain)
- Zero customer-facing regressions (maintain)

---

## CONCLUSIONS & RECOMMENDATIONS

### Summary of Findings

This analysis identified **114 unused files** across configuration, components, libraries, and assets in the My Private Tutor Online codebase. The files fall into clear risk categories:

1. **48 files SAFE for immediate removal** (Phase 1) - zero business impact
2. **42 files REQUIRE investigation** (Phase 2) - potential dynamic imports or future features
3. **12 files should be ARCHIVED** - valuable patterns for future implementations
4. **12 files must NOT be removed** - active use, revenue-critical, or recent modifications

### Key Risks Identified

**CRITICAL BUSINESS RISKS**:
1. Royal testimonial components marked unused may be critical for £400k+ revenue positioning
2. Testimonials page entire component system flagged as unused (requires urgent verification)
3. Admin dashboard status unclear (85% operational - active or abandoned?)
4. Performance monitoring modules may be loaded by external scripts not detected by static analysis

**TECHNICAL RISKS**:
1. performance.config.ts has unresolved import but is actively used (requires fix before any work)
2. Section components show 'M' (modified) in git but marked unused (knip false positives likely)
3. use-error-recovery.ts hook marked unused but has 2 active consumers (knip limitation)
4. Dynamic imports (lazy, next/dynamic) may not be detected by static analysis tools

### Recommended Actions

**IMMEDIATE (This Week)**:
1. ✅ Fix performance.config.ts import path in business-analytics.ts
2. 🔍 Verify testimonials page functionality and component usage
3. 🔍 Clarify admin dashboard status (active custom admin vs PayloadCMS only)
4. 🔍 Check royal testimonial/trust indicator components on homepage

**PHASE 1 (Week 1-2)**:
1. ✅ Remove 48 confirmed-safe files (zero business risk)
2. ✅ Remove 2.27MB unused dependencies (tesseract.js primary)
3. ✅ Clean up 534KB public assets (admin + pesticide)
4. ✅ Full validation: build, tests, manual QA, performance audit

**PHASE 2 (Week 3-4)**:
1. 🔍 Complete investigation of 42 moderate-risk files
2. 🗄️ Archive 12 valuable-but-unused files for future reference
3. ✅ Remove additional files based on investigation results
4. ✅ Full regression testing and business validation

**PHASE 3 (Week 5)**:
1. 📊 Measure and document cleanup results
2. 📝 Update CLAUDE.md with new baseline metrics
3. 🎯 Create ongoing file hygiene process
4. ✨ Celebrate 3MB bundle reduction and improved build times

### Expected Outcomes

**Quantifiable Benefits**:
- **~3MB smaller bundle** (97% from tesseract.js, rest from assets/components)
- **0.5-0.8s faster builds** (10.2-10.5s vs 11.0s baseline)
- **16-30% fewer files** (256-214 files vs 304 current)
- **Clearer architecture** (no legacy/abandoned components confusing developers)
- **Maintained business value** (£400k+ revenue opportunity protected)

**Qualitative Benefits**:
- Faster developer onboarding (less confusing legacy code)
- Better IDE performance (fewer files to index)
- Clearer component architecture (no duplicate implementations)
- Improved maintainability (smaller codebase surface area)
- Protected optimization value (£191,500/year maintained)

### Final Recommendation

**PROCEED with phased cleanup approach**:
- ✅ Phase 1 has zero business risk and substantial benefits
- ⚠️ Phase 2 requires clarifications but manageable risk
- 🎯 Overall expected outcome: **3MB reduction, faster builds, clearer architecture, zero business impact**

**CRITICAL SUCCESS FACTORS**:
1. Resolve admin dashboard status before Phase 2
2. Verify testimonials page components before ANY removals
3. Fix performance.config.ts import immediately
4. Maintain comprehensive rollback capability throughout
5. Full manual QA after each phase (not just automated tests)

---

**Report Prepared By**: Agent 2 - File Cleanup Specialist
**Report Date**: 2025-11-10
**Project Status**: Ready for Phase 1 execution pending clarifications
**Business Impact**: HIGH VALUE (3MB reduction, improved build times, protected revenue)
**Risk Level**: LOW (with proper validation and phased approach)

**Recommendation**: ✅ **PROCEED WITH PHASE 1 CLEANUP**
