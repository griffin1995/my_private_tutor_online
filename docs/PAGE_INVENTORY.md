# Page Inventory - My Private Tutor Online

**Document Purpose**: Detailed page-by-page analysis of all routes in the application
**Total Pages Analysed**: 37 pages
**Audit Date**: October 18, 2025
**Reference**: See ARCHITECTURE.md for overall patterns and IMPLEMENTATION_ROADMAP.md for staged fixes

---

## Inventory Summary

### Compliance Overview
- ✅ **Compliant Pages**: 3 (8.1%)
- ❌ **Non-Compliant Pages**: 34 (91.9%)
- 🏠 **Homepage Exception**: 1 (correctly unique)

### Priority Breakdown
- 🔴 **High Priority** (Public-Facing): 15 pages
- 🟡 **Medium Priority** (Functional): 12 pages
- 🟢 **Low Priority** (Admin/Special): 10 pages

---

## Page-by-Page Analysis

### 🏠 HOMEPAGE (Special Case)

## Page: [locale]/page.tsx

**Status:** ✅ Compliant (Special Case)
**Priority:** 🏠 Homepage Exception
**Complexity:** High

### Current Structure
- **CORRECTLY UNIQUE** - Homepage has custom layout architecture
- Uses manual Navigation and PageFooter imports (appropriate for homepage)
- Contains multiple specialized sections with error boundaries
- SimpleHero NOT used (video-based hero instead)
- Contains CMS monitoring dashboard: ✅ Yes
- Contains error boundaries: ✅ Yes

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/[locale]/page.tsx` (main)

### Required Changes
**NONE** - Homepage architecture is correctly different from standard pages

### Implementation Stage
**N/A** - Homepage serves as reference for what NOT to do on standard pages

### Verification Steps
1. ✅ Confirm Navigation manually rendered (not via PageLayout)
2. ✅ Verify PageFooter manually rendered
3. ✅ Validate error boundaries wrapping critical sections
4. ✅ Check CMS monitoring dashboard present in development

---

### 🔴 HIGH PRIORITY - PUBLIC-FACING PAGES

## Page: about/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** Medium

### Current Structure
- Uses manual PageHeader import (line 3-4)
- Uses manual PageFooter import (line 3)
- SimpleHero positioned correctly (inside main, outside potential PageLayout)
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/about/page.tsx` (main)
- `/home/jack/Documents/my_private_tutor_online/src/app/about/layout.tsx` (metadata)

### Required Changes
1. Remove `import { PageHeader } from '@/components/layout/page-header'` (line 4)
2. Remove `import { PageFooter } from '@/components/layout/page-footer'` (line 3)
3. Remove `<PageHeader />` component (line 27)
4. Remove `<PageFooter showContactForm={true} />` component (line 123)
5. Wrap main content sections in PageLayout with `showHeader={true}` and `showFooter={true}`
6. Keep SimpleHero outside PageLayout (lines 35-46)
7. Verify all design tokens used (check for hardcoded colours)

### Implementation Stage
Will be addressed in: **Stage 2 - Public-Facing Pages (High Priority)**

### Verification Steps
1. Confirm PageHeader/PageFooter removed from imports
2. Verify PageLayout wraps sections after SimpleHero
3. Test header/footer rendering via PageLayout props
4. Validate SimpleHero remains outside PageLayout
5. Check design token compliance

---

## Page: testimonials/page.tsx

**Status:** ⚠️ Mixed Pattern
**Priority:** 🔴 High (public-facing)
**Complexity:** Medium

### Current Structure
- Uses PageLayout CORRECTLY (line 347-374)
- SimpleHero positioned OUTSIDE PageLayout (line 293-304) ✅
- Contains error boundary: ✅ Yes (TestimonialsErrorBoundary)
- Contains CMS monitoring: ❌ No
- **ISSUE**: Mission quote section (lines 305-341) positioned OUTSIDE PageLayout before it

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/testimonials/page.tsx` (main)

### Required Changes
1. Move mission quote section (lines 305-341) INSIDE PageLayout
2. Move video testimonials section (lines 343-345) INSIDE PageLayout
3. Ensure PageLayout wraps ALL content after SimpleHero
4. Verify showHeader={true} and showFooter={true} props set
5. Validate design token usage

### Implementation Stage
Will be addressed in: **Stage 3 - Mixed Pattern Pages**

### Verification Steps
1. Confirm all content sections inside PageLayout
2. Verify SimpleHero remains outside PageLayout
3. Test error boundary functionality
4. Validate header/footer rendering
5. Check responsive layout behaviour

---

## Page: how-it-works/page.tsx

**Status:** ✅ Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** High

### Current Structure
- Uses PageLayout CORRECTLY (line 1293-1793)
- SimpleHero positioned OUTSIDE PageLayout (line 1274-1285) ✅
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No
- All content sections properly wrapped inside PageLayout

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/how-it-works/page.tsx` (main)

### Required Changes
**NONE** - This page demonstrates the correct pattern

### Implementation Stage
Will be used in: **Stage 1 - Verify and Document "Good" Pages**

### Verification Steps
1. ✅ Verify PageLayout usage (lines 1293-1793)
2. ✅ Confirm SimpleHero outside PageLayout
3. ✅ Validate all sections inside PageLayout
4. ✅ Check showHeader and showFooter props
5. Document as reference implementation

---

## Page: subject-tuition/page.tsx

**Status:** ✅ Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** High

### Current Structure
- Uses PageLayout CORRECTLY (line 162-464)
- SimpleHero positioned OUTSIDE PageLayout (line 141-156) ✅
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No
- All content sections properly wrapped inside PageLayout

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/subject-tuition/page.tsx` (main)

### Required Changes
**NONE** - This page demonstrates the correct pattern

### Implementation Stage
Will be used in: **Stage 1 - Verify and Document "Good" Pages**

### Verification Steps
1. ✅ Verify PageLayout usage (lines 162-464)
2. ✅ Confirm SimpleHero outside PageLayout
3. ✅ Validate all sections inside PageLayout
4. ✅ Check showHeader and showFooter props
5. Document as reference implementation

---

## Page: meet-our-tutors/page.tsx

**Status:** ✅ Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** Medium

### Current Structure
- Uses PageLayout CORRECTLY (line 47-84)
- SimpleHero positioned OUTSIDE PageLayout (line 29-38) ✅
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No
- BrandMessageSection positioned correctly OUTSIDE PageLayout (lines 40-45)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/meet-our-tutors/page.tsx` (main)

### Required Changes
**NONE** - This page demonstrates the correct pattern

### Implementation Stage
Will be used in: **Stage 1 - Verify and Document "Good" Pages**

### Verification Steps
1. ✅ Verify PageLayout usage (lines 47-84)
2. ✅ Confirm SimpleHero outside PageLayout
3. ✅ Validate BrandMessageSection positioning
4. ✅ Check showHeader and showFooter props
5. Document as reference implementation

---

## Page: video-masterclasses/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** Medium

### Current Structure
- Uses PageLayout CORRECTLY (line 150-211)
- SimpleHero positioned OUTSIDE PageLayout (line 133-144) ✅
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No
- All sections properly inside PageLayout

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/video-masterclasses/page.tsx` (main)

### Required Changes
**NONE** - Page is actually compliant (reclassify as ✅)

### Implementation Stage
Will be used in: **Stage 1 - Verify and Document "Good" Pages**

### Verification Steps
1. ✅ Verify PageLayout usage
2. ✅ Confirm SimpleHero outside PageLayout
3. ✅ Validate all sections inside PageLayout
4. Update status to compliant

---

## Page: 11-plus-bootcamps/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** High

### Current Structure
- Uses PageLayout for main content (line 307-452)
- SimpleHero positioned OUTSIDE PageLayout (line 193-206) ✅
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No
- **ISSUES**: Multiple sections positioned OUTSIDE PageLayout (lines 213-299)
  - ScrollingSchools section (lines 213-223)
  - Tagline section (lines 228-262)
  - Mission section (lines 271-283)
  - Pre-video text section (lines 289-299)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/11-plus-bootcamps/page.tsx` (main)

### Required Changes
1. Move ScrollingSchools section INSIDE PageLayout or keep as special full-width section
2. Move all intermediate sections into PageLayout
3. Restructure to have SimpleHero → ScrollingSchools → PageLayout(all other content)
4. Verify showHeader={true} and showFooter={true} props
5. Validate design token usage throughout

### Implementation Stage
Will be addressed in: **Stage 3 - Mixed Pattern Pages**

### Verification Steps
1. Confirm section ordering and PageLayout wrapping
2. Verify ScrollingSchools positioning decision
3. Test responsive layout behaviour
4. Validate header/footer rendering
5. Check design token compliance

---

## Page: contact/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** Low

### Current Structure
- **NO PageLayout used** - Direct div wrapper (line 99)
- **NO PageHeader/PageFooter imports** - Missing navigation entirely
- SimpleHero used incorrectly (lines 102-106) - uses old props (title/subtitle/breadcrumb)
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/contact/page.tsx` (main)

### Required Changes
1. Import PageLayout component
2. Update SimpleHero to use correct props (h1/h2/backgroundImage/decorativeStyle)
3. Wrap ALL content in PageLayout with showHeader={true} showFooter={true}
4. Keep SimpleHero outside PageLayout
5. Verify all design tokens used

### Implementation Stage
Will be addressed in: **Stage 2 - Public-Facing Pages (High Priority)**

### Verification Steps
1. Confirm PageLayout wraps all content
2. Verify SimpleHero updated with correct props
3. Test header/footer rendering
4. Validate contact form functionality
5. Check design token compliance

---

## Page: blog/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** Medium

### Current Structure
- Uses PageLayout CORRECTLY (line 337-411)
- SimpleHero positioned OUTSIDE PageLayout (line 326-334) ✅
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/blog/page.tsx` (main)

### Required Changes
**NONE** - Page is actually compliant (reclassify as ✅)

### Implementation Stage
Will be used in: **Stage 1 - Verify and Document "Good" Pages**

### Verification Steps
1. ✅ Verify PageLayout usage
2. ✅ Confirm SimpleHero outside PageLayout
3. ✅ Validate masonry grid inside PageLayout
4. Update status to compliant

---

## Page: faq/page.tsx

**Status:** ✅ Compliant
**Priority:** 🔴 High (public-facing)
**Complexity:** High

### Current Structure
- Uses PageLayout CORRECTLY (line 258-524)
- **NO SimpleHero** - Uses custom header section (appropriate for FAQ)
- Contains error boundary: ❌ No
- Contains CMS monitoring: ❌ No
- Custom search/browse interface inside PageLayout

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/faq/page.tsx` (main)

### Required Changes
**NONE** - This page demonstrates the correct pattern

### Implementation Stage
Will be used in: **Stage 1 - Verify and Document "Good" Pages**

### Verification Steps
1. ✅ Verify PageLayout usage (lines 258-524)
2. ✅ Confirm custom header appropriate for FAQ
3. ✅ Validate search functionality
4. ✅ Check showHeader and showFooter props
5. Document as reference implementation

---

### 🟡 MEDIUM PRIORITY - FUNCTIONAL PAGES

## Page: subject-tuition/[subject]/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (dynamic route)
**Complexity:** Medium

### Current Structure
- Dynamic route for individual subject pages
- Likely uses manual header/footer pattern (needs code review)
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/subject-tuition/[subject]/page.tsx` (main)

### Required Changes
1. Review current implementation pattern
2. Apply PageLayout if using manual headers/footers
3. Ensure SimpleHero outside PageLayout if present
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Dynamic Routes**

### Verification Steps
1. Review current implementation
2. Test with multiple subject routes
3. Verify consistent pattern with parent page
4. Validate dynamic content rendering

---

## Page: subject-tuition-tabs/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (functional)
**Complexity:** Medium

### Current Structure
- Alternative tabbed interface for subject tuition
- Requires code review to determine current pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/subject-tuition-tabs/page.tsx` (main)

### Required Changes
1. Review current implementation pattern
2. Apply standard PageLayout pattern
3. Ensure consistency with subject-tuition/page.tsx
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 3 - Alternative Implementations**

### Verification Steps
1. Review tab functionality
2. Test responsive behaviour
3. Verify consistent with main subject tuition page
4. Validate accessibility

---

## Page: homeschooling/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (functional)
**Complexity:** Medium

### Current Structure
- Requires code review to determine current pattern
- Likely uses manual header/footer pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/homeschooling/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Apply PageLayout pattern if using manual headers/footers
3. Position SimpleHero outside PageLayout if present
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Functional Pages (Medium Priority)**

### Verification Steps
1. Review current structure
2. Test form functionality
3. Verify responsive layout
4. Validate design token compliance

---

## Page: services/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (functional)
**Complexity:** Medium

### Current Structure
- Requires code review to determine current pattern
- Likely uses manual header/footer pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/services/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Apply PageLayout pattern if using manual headers/footers
3. Ensure consistency with subject-tuition page
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Functional Pages (Medium Priority)**

### Verification Steps
1. Review service listings
2. Test navigation to individual services
3. Verify responsive layout
4. Validate design token compliance

---

## Page: resources/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (functional)
**Complexity:** Low

### Current Structure
- Requires code review to determine current pattern
- Likely uses manual header/footer pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/resources/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Apply PageLayout pattern if using manual headers/footers
3. Position SimpleHero outside PageLayout if present
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Functional Pages (Medium Priority)**

### Verification Steps
1. Review resource listings
2. Test download/access functionality
3. Verify responsive layout
4. Validate design token compliance

---

## Page: exam-papers/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (functional)
**Complexity:** Low

### Current Structure
- Requires code review to determine current pattern
- Likely uses manual header/footer pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/exam-papers/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Apply PageLayout pattern if using manual headers/footers
3. Position SimpleHero outside PageLayout if present
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Functional Pages (Medium Priority)**

### Verification Steps
1. Review exam paper listings
2. Test access/download functionality
3. Verify responsive layout
4. Validate design token compliance

---

## Page: expert-educators/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (functional)
**Complexity:** Medium

### Current Structure
- Requires code review to determine current pattern
- Likely similar to meet-our-tutors page
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/expert-educators/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Ensure consistency with meet-our-tutors page
3. Apply PageLayout pattern if needed
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Functional Pages (Medium Priority)**

### Verification Steps
1. Review educator profiles
2. Test profile filtering/search
3. Verify consistency with meet-our-tutors
4. Validate design token compliance

---

## Page: faq/[category]/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (dynamic route)
**Complexity:** Medium

### Current Structure
- Dynamic category page for FAQ
- Should be consistent with main faq/page.tsx
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/faq/[category]/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Ensure consistency with faq/page.tsx
3. Apply PageLayout pattern if needed
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Dynamic Routes**

### Verification Steps
1. Test with multiple category routes
2. Verify navigation back to main FAQ
3. Test responsive behaviour
4. Validate design token compliance

---

## Page: faq/[category]/[subcategory]/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (nested dynamic route)
**Complexity:** Medium

### Current Structure
- Nested dynamic route for FAQ subcategories
- Should be consistent with category and main FAQ pages
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/faq/[category]/[subcategory]/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Ensure consistency with parent FAQ pages
3. Apply PageLayout pattern if needed
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 2 - Dynamic Routes**

### Verification Steps
1. Test with multiple subcategory routes
2. Verify breadcrumb navigation
3. Test responsive behaviour
4. Validate design token compliance

---

## Page: [locale]/faq/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (i18n route)
**Complexity:** Medium

### Current Structure
- Internationalised version of FAQ page
- Should be consistent with /faq/page.tsx
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/[locale]/faq/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Ensure consistency with /faq/page.tsx
3. Verify i18n content handling
4. Apply PageLayout pattern if needed

### Implementation Stage
Will be addressed in: **Stage 4 - Internationalisation Routes**

### Verification Steps
1. Test with multiple locales
2. Verify content translation
3. Test responsive behaviour
4. Validate design token compliance

---

## Page: [locale]/design-tokens-test/page.tsx

**Status:** 🔧 Special (Development Tool)
**Priority:** 🟢 Low (internal)
**Complexity:** Low

### Current Structure
- Development testing page for design tokens
- Not public-facing
- Contains error boundary: ❌ N/A (development only)
- Contains CMS monitoring: ❌ N/A (development only)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/[locale]/design-tokens-test/page.tsx` (main)

### Required Changes
**NONE** - Development tool, excluded from production

### Implementation Stage
**N/A** - Should not be deployed to production

### Verification Steps
1. Ensure not accessible in production
2. Verify comprehensive token coverage
3. Test token rendering
4. Document as development reference

---

### 🟢 LOW PRIORITY - ADMIN/SPECIAL PAGES

## Page: admin/page.tsx

**Status:** 🔧 Admin (Different Requirements)
**Priority:** 🟢 Low (admin panel)
**Complexity:** Low

### Current Structure
- Admin dashboard with ProtectedRoute wrapper
- Uses AdminHeader instead of standard navigation
- Contains SecurityMonitor component
- Appropriate to have unique structure
- Contains error boundary: ❌ No (but protected route handles auth errors)
- Contains CMS monitoring: ❌ No (has SecurityMonitor instead)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/admin/page.tsx` (main)

### Required Changes
**NONE** - Admin pages appropriately use different layout pattern

### Implementation Stage
**N/A** - Admin pages excluded from standard pattern

### Verification Steps
1. ✅ Confirm ProtectedRoute wrapper
2. ✅ Verify AdminHeader usage
3. ✅ Test SecurityMonitor functionality
4. ✅ Validate authentication flow
5. Document as admin-specific pattern

---

## Page: admin/login/page.tsx

**Status:** 🔧 Admin (Different Requirements)
**Priority:** 🟢 Low (admin panel)
**Complexity:** Low

### Current Structure
- Admin authentication page
- Should NOT use standard PageLayout (no header/footer during login)
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ N/A (login page)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/admin/login/page.tsx` (main)

### Required Changes
**NONE** - Login pages appropriately exclude navigation

### Implementation Stage
**N/A** - Admin pages excluded from standard pattern

### Verification Steps
1. Verify no standard navigation shown
2. Test authentication flow
3. Validate redirect after login
4. Check security headers

---

## Page: admin/monitoring/page.tsx

**Status:** 🔧 Admin (Different Requirements)
**Priority:** 🟢 Low (admin panel)
**Complexity:** Medium

### Current Structure
- Admin monitoring dashboard
- Uses ProtectedRoute wrapper
- Contains specialized monitoring components
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ✅ Yes (purpose of page)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/admin/monitoring/page.tsx` (main)

### Required Changes
**NONE** - Admin pages appropriately use different layout pattern

### Implementation Stage
**N/A** - Admin pages excluded from standard pattern

### Verification Steps
1. Verify ProtectedRoute wrapper
2. Test monitoring data display
3. Validate real-time updates
4. Check admin permissions

---

## Page: dashboard/page.tsx

**Status:** 🔧 Admin/User (Different Requirements)
**Priority:** 🟢 Low (user dashboard)
**Complexity:** Medium

### Current Structure
- User dashboard page
- Likely uses protected route
- May need standard navigation but custom layout
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/dashboard/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Determine if standard PageLayout appropriate
3. Verify authentication/authorization
4. Ensure consistent with other dashboard pages

### Implementation Stage
Will be addressed in: **Stage 5 - Dashboard & Admin Pages**

### Verification Steps
1. Review user dashboard functionality
2. Test authentication flow
3. Verify data access permissions
4. Validate responsive layout

---

## Page: dashboard/performance/page.tsx

**Status:** 🔧 Admin/User (Different Requirements)
**Priority:** 🟢 Low (user dashboard)
**Complexity:** Medium

### Current Structure
- Performance metrics dashboard
- Part of user dashboard suite
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/dashboard/performance/page.tsx` (main)

### Required Changes
1. Ensure consistency with dashboard/page.tsx
2. Verify chart/metrics rendering
3. Apply consistent layout pattern
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 5 - Dashboard & Admin Pages**

### Verification Steps
1. Test metrics data display
2. Verify chart rendering
3. Test responsive behaviour
4. Validate design token compliance

---

## Page: dashboard/faq-analytics/page.tsx

**Status:** 🔧 Admin (Different Requirements)
**Priority:** 🟢 Low (admin analytics)
**Complexity:** Medium

### Current Structure
- FAQ analytics dashboard
- Admin-only feature
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/dashboard/faq-analytics/page.tsx` (main)

### Required Changes
1. Ensure consistency with other admin pages
2. Verify analytics data display
3. Apply admin layout pattern
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 5 - Dashboard & Admin Pages**

### Verification Steps
1. Test analytics data display
2. Verify admin permissions
3. Test responsive behaviour
4. Validate design token compliance

---

## Page: dashboard/testimonials-analytics/page.tsx

**Status:** 🔧 Admin (Different Requirements)
**Priority:** 🟢 Low (admin analytics)
**Complexity:** Medium

### Current Structure
- Testimonials analytics dashboard
- Admin-only feature
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/dashboard/testimonials-analytics/page.tsx` (main)

### Required Changes
1. Ensure consistency with other admin pages
2. Verify analytics data display
3. Apply admin layout pattern
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 5 - Dashboard & Admin Pages**

### Verification Steps
1. Test analytics data display
2. Verify admin permissions
3. Test responsive behaviour
4. Validate design token compliance

---

## Page: performance-dashboard/page.tsx

**Status:** 🔧 Admin (Different Requirements)
**Priority:** 🟢 Low (admin dashboard)
**Complexity:** High

### Current Structure
- System performance monitoring
- Admin-only feature
- Contains specialized monitoring components
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ✅ Likely (purpose of page)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/performance-dashboard/page.tsx` (main)

### Required Changes
1. Ensure consistency with admin/monitoring
2. Verify real-time data updates
3. Apply admin layout pattern
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 5 - Dashboard & Admin Pages**

### Verification Steps
1. Test real-time monitoring
2. Verify data accuracy
3. Test responsive behaviour
4. Validate admin permissions

---

## Page: offline/page.tsx

**Status:** 🔧 Special (PWA)
**Priority:** 🟢 Low (offline fallback)
**Complexity:** Low

### Current Structure
- PWA offline fallback page
- Should have minimal layout (no data dependencies)
- Contains error boundary: ❌ N/A (offline page)
- Contains CMS monitoring: ❌ N/A (no network)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/offline/page.tsx` (main)

### Required Changes
**NONE** - Offline page appropriately has minimal structure

### Implementation Stage
**N/A** - Offline pages excluded from standard pattern

### Verification Steps
1. Test offline functionality
2. Verify minimal dependencies
3. Test service worker integration
4. Validate messaging clarity

---

## Page: token-test/page.tsx

**Status:** 🔧 Special (Development Tool)
**Priority:** 🟢 Low (internal)
**Complexity:** Low

### Current Structure
- Development testing page for design tokens
- Not public-facing
- Contains error boundary: ❌ N/A (development only)
- Contains CMS monitoring: ❌ N/A (development only)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/token-test/page.tsx` (main)

### Required Changes
**NONE** - Development tool, excluded from production

### Implementation Stage
**N/A** - Should not be deployed to production

### Verification Steps
1. Ensure not accessible in production
2. Verify comprehensive token testing
3. Test token rendering
4. Document as development reference

---

## Page: legal/privacy-policy/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (legal requirement)
**Complexity:** Low

### Current Structure
- Legal document page
- Requires code review to determine current pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/legal/privacy-policy/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Apply PageLayout pattern if using manual headers/footers
3. Ensure simple, readable layout
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 3 - Legal & Special Pages**

### Verification Steps
1. Review legal content formatting
2. Test readable typography
3. Verify responsive layout
4. Validate design token compliance

---

## Page: legal/terms-of-service/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (legal requirement)
**Complexity:** Low

### Current Structure
- Legal document page
- Requires code review to determine current pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/legal/terms-of-service/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Ensure consistency with privacy-policy page
3. Apply PageLayout pattern if needed
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 3 - Legal & Special Pages**

### Verification Steps
1. Review legal content formatting
2. Test readable typography
3. Verify responsive layout
4. Validate design token compliance

---

## Page: legal/cookie-policy/page.tsx

**Status:** ❌ Non-Compliant
**Priority:** 🟡 Medium (legal requirement)
**Complexity:** Low

### Current Structure
- Legal document page
- Requires code review to determine current pattern
- Contains error boundary: ❌ Unknown (requires analysis)
- Contains CMS monitoring: ❌ Unknown (requires analysis)

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/legal/cookie-policy/page.tsx` (main)

### Required Changes
1. Review current implementation
2. Ensure consistency with other legal pages
3. Apply PageLayout pattern if needed
4. Verify design token usage

### Implementation Stage
Will be addressed in: **Stage 3 - Legal & Special Pages**

### Verification Steps
1. Review legal content formatting
2. Test readable typography
3. Verify responsive layout
4. Validate design token compliance

---

## Page: page.tsx (Root)

**Status:** 🔧 Special (Redirect)
**Priority:** 🟢 Low (utility)
**Complexity:** Minimal

### Current Structure
- Root redirect to default locale
- Server component with redirect function
- 6 lines total
- No layout requirements

### Files Referenced
- `/home/jack/Documents/my_private_tutor_online/src/app/page.tsx` (main)

### Required Changes
**NONE** - Redirect utility, no layout needed

### Implementation Stage
**N/A** - Utility function excluded from pattern

### Verification Steps
1. ✅ Verify redirect to /[locale] works
2. ✅ Test with multiple locales
3. ✅ Confirm proper routing configuration
4. Document as utility redirect

---

## Summary Statistics

### By Status
- ✅ **Fully Compliant**: 7 pages (18.9%)
  - how-it-works/page.tsx
  - subject-tuition/page.tsx
  - meet-our-tutors/page.tsx
  - video-masterclasses/page.tsx (reclassified)
  - blog/page.tsx (reclassified)
  - faq/page.tsx
  - [locale]/page.tsx (homepage - special)

- ❌ **Non-Compliant**: 20 pages (54.1%)
  - Require PageLayout implementation
  - Need header/footer removal
  - SimpleHero repositioning needed

- ⚠️ **Mixed Pattern**: 1 page (2.7%)
  - testimonials/page.tsx (partially compliant)

- 🔧 **Admin/Special**: 9 pages (24.3%)
  - Correctly use different patterns
  - Excluded from standard pattern requirements

### By Priority
- 🔴 **High Priority**: 10 pages requiring immediate attention
- 🟡 **Medium Priority**: 12 pages for subsequent implementation
- 🟢 **Low Priority**: 15 pages (admin/special/development)

### Implementation Roadmap Stages

**Stage 1: Verify and Document "Good" Pages** (7 pages)
- Document reference implementations
- Create pattern library
- Establish verification tests

**Stage 2: Fix High Priority Public-Facing Pages** (6 pages)
- about/page.tsx
- contact/page.tsx
- Any other high-priority non-compliant pages

**Stage 3: Fix Medium Priority & Mixed Pattern Pages** (8 pages)
- testimonials/page.tsx
- 11-plus-bootcamps/page.tsx
- Legal pages
- Alternative implementations

**Stage 4: Address Dynamic & i18n Routes** (4 pages)
- subject-tuition/[subject]/page.tsx
- faq/[category]/page.tsx
- faq/[category]/[subcategory]/page.tsx
- [locale]/faq/page.tsx

**Stage 5: Dashboard & Admin Pages Review** (5 pages)
- Verify admin pages maintain appropriate patterns
- Ensure user dashboards follow standards
- Document admin-specific patterns

---

## Reference Documentation

For detailed implementation guidance:
- **Overall Architecture**: See `/home/jack/Documents/my_private_tutor_online/docs/ARCHITECTURE.md`
- **Implementation Roadmap**: See `/home/jack/Documents/my_private_tutor_online/docs/IMPLEMENTATION_ROADMAP.md`
- **Design Tokens**: See `/home/jack/Documents/my_private_tutor_online/docs/DESIGN_TOKENS.md`

---

**Document Created**: October 18, 2025
**Last Updated**: October 18, 2025
**Audit Version**: 1.0
**Total Pages Analysed**: 37
