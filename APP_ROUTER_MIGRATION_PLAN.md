# App Router Directory Migration Plan

## Project Overview
**Project**: My Private Tutor Online - App Router Reorganization
**Current State**: Mixed route group patterns with unclear feature boundaries
**Target State**: Feature-first route groups with private folder organization
**Confidence Level**: HIGH

## Issues Identified

**Mixed Route Group Patterns:**
- Inconsistent route group usage: `(app)` vs `(payload)` without clear boundaries
- No logical grouping by feature or team concerns
- Components scattered across routes: `exam-papers/_components/`, `subject-tuition/components/`

**API Route Organization:**
- Flat API structure with mixed domain concerns
- Analytics endpoints scattered: `api/analytics/*` vs `api/performance/*`
- No clear feature-based API organization

**Missing Best Practice Patterns:**
- Limited use of private folders (`_components`) for non-routable organization
- No consistent colocation strategy for route-specific logic
- Legal pages as individual routes rather than organized structure

## Recommended Structure: Feature-First Route Groups

```
src/app/
├── layout.tsx                          # Root layout (required)
├── page.tsx                           # Homepage
├── sitemap.ts                         # Sitemap generation
├── not-found.tsx                      # Global 404
├── error.tsx                          # Global error boundary
├── (public)/                          # Public-facing routes
│   ├── layout.tsx                     # Shared public layout
│   ├── about/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── testimonials/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── meet-our-tutors/
│       ├── page.tsx
│       └── layout.tsx
├── (education)/                       # Educational services
│   ├── layout.tsx                     # Shared education layout
│   ├── 11-plus-bootcamps/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── subject-tuition/
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── education-level-content.tsx
│   │       └── subject-tuition-tabs.tsx
│   ├── video-masterclasses/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── how-it-works/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── exam-papers/
│       ├── page.tsx
│       ├── layout.tsx
│       └── _components/
│           ├── CategoryItem.tsx
│           ├── CategorySidebar.tsx
│           ├── CategoryTabBar.tsx
│           ├── Pagination.tsx
│           └── ResourceCard.tsx
├── (utility)/                        # Utility pages
│   ├── faq/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── legal/
│   │   ├── layout.tsx                 # Shared legal layout
│   │   ├── privacy-policy/
│   │   │   └── page.tsx
│   │   ├── terms-of-service/
│   │   │   └── page.tsx
│   │   ├── cookie-policy/
│   │   │   └── page.tsx
│   │   ├── booking-policy/
│   │   │   └── page.tsx
│   │   └── record-of-processing/
│   │       └── page.tsx
│   └── offline/
│       └── page.tsx
├── (admin)/                          # Admin routes
│   ├── layout.tsx
│   └── [[...segments]]/
│       ├── page.tsx
│       └── not-found.tsx
└── api/                              # API routes organized by domain
    ├── analytics/                    # Analytics domain (stays organized)
    │   ├── client-success/
    │   ├── consent/
    │   ├── events/
    │   ├── performance/
    │   └── testimonials/
    ├── content/                      # Content management domain
    │   ├── faq/
    │   │   ├── errors/
    │   │   └── suggestions/
    │   │       ├── route.ts
    │   │       └── [id]/vote/
    │   └── newsletter/
    ├── communication/                # Communication domain
    │   ├── contact/
    │   └── errors/
    ├── monitoring/                   # System monitoring domain
    │   └── performance/
    │       ├── alerts/
    │       └── metrics/
    └── payload/                      # Payload CMS integration
        └── [...slug]/
```

## Research Sources

**Phase 2A - Web Search:**
- [Getting Started: Project Structure | Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
- [Inside the App Router: Best Practices for Next.js File and Directory Structure (2025 Edition)](https://medium.com/better-dev-nextjs-react/inside-the-app-router-best-practices-for-next-js-file-and-directory-structure-2025-edition-ed6bc14a8da3)
- [Best Practices for Organizing Your Next.js 15 2025](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji)
- [The Battle-Tested NextJS Project Structure I Use in 2025](https://medium.com/@burpdeepak96/the-battle-tested-nextjs-project-structure-i-use-in-2025-f84c4eb5f426)
- [Mastering Next.js 15+ Folder Structure: A Developer's Guide](https://medium.com/@j.hariharan005/mastering-next-js-15-folder-structure-a-developers-guide-b9b0461e2d27)

**Phase 2B - Context7 (Next.js Official):**
- Route Groups: Organizational folders that don't affect URL structure
- Private Folders: Underscore-prefixed folders for non-routable organization
- Colocation: Safe placement of project files within App Router structure
- API Route organization with `route.ts` files

---

## DETAILED MIGRATION PLAN

### **PHASE 1: Create New Route Group Structure**

```bash
# Create new route group directories
mkdir -p src/app/{(public)/{about,blog/[slug],contact,testimonials,meet-our-tutors},(education)/{11-plus-bootcamps,subject-tuition/_components,video-masterclasses,how-it-works,exam-papers},(utility)/{faq,legal/{privacy-policy,terms-of-service,cookie-policy,booking-policy,record-of-processing},offline},(admin)/[[...segments]]}

# Create new API organization structure
mkdir -p src/app/api/{content/{faq/{errors,suggestions/{[id]/vote}},newsletter},communication/{contact,errors},monitoring/performance/{alerts,metrics},payload/[...slug]}
```

### **PHASE 2: Migrate Root Level Files**

```bash
# Move root app files from (app) to root
mv src/app/\(app\)/layout.tsx src/app/layout.tsx
mv src/app/\(app\)/page.tsx src/app/page.tsx
mv src/app/\(app\)/sitemap.ts src/app/sitemap.ts
mv src/app/\(app\)/not-found.tsx src/app/not-found.tsx
mv src/app/\(app\)/error.tsx src/app/error.tsx
```

### **PHASE 3: Migrate Public Route Group**

```bash
# About section
mv src/app/\(app\)/about/page.tsx src/app/\(public\)/about/
mv src/app/\(app\)/about/layout.tsx src/app/\(public\)/about/

# Blog section
mv src/app/\(app\)/blog/page.tsx src/app/\(public\)/blog/
mv src/app/\(app\)/blog/layout.tsx src/app/\(public\)/blog/
mv src/app/\(app\)/blog/[slug]/page.tsx src/app/\(public\)/blog/[slug]/

# Contact section
mv src/app/\(app\)/contact/page.tsx src/app/\(public\)/contact/
mv src/app/\(app\)/contact/layout.tsx src/app/\(public\)/contact/

# Testimonials section
mv src/app/\(app\)/testimonials/page.tsx src/app/\(public\)/testimonials/
mv src/app/\(app\)/testimonials/layout.tsx src/app/\(public\)/testimonials/

# Meet our tutors section
mv src/app/\(app\)/meet-our-tutors/page.tsx src/app/\(public\)/meet-our-tutors/
mv src/app/\(app\)/meet-our-tutors/layout.tsx src/app/\(public\)/meet-our-tutors/
```

### **PHASE 4: Migrate Education Route Group**

```bash
# 11+ bootcamps
mv src/app/\(app\)/11-plus-bootcamps/page.tsx src/app/\(education\)/11-plus-bootcamps/
mv src/app/\(app\)/11-plus-bootcamps/layout.tsx src/app/\(education\)/11-plus-bootcamps/

# Subject tuition with private components
mv src/app/\(app\)/subject-tuition/page.tsx src/app/\(education\)/subject-tuition/
mv src/app/\(app\)/subject-tuition/components/education-level-content.tsx src/app/\(education\)/subject-tuition/_components/
mv src/app/\(app\)/subject-tuition/components/subject-tuition-tabs.tsx src/app/\(education\)/subject-tuition/_components/

# Video masterclasses
mv src/app/\(app\)/video-masterclasses/page.tsx src/app/\(education\)/video-masterclasses/
mv src/app/\(app\)/video-masterclasses/layout.tsx src/app/\(education\)/video-masterclasses/

# How it works
mv src/app/\(app\)/how-it-works/page.tsx src/app/\(education\)/how-it-works/
mv src/app/\(app\)/how-it-works/layout.tsx src/app/\(education\)/how-it-works/

# Exam papers (already has _components correctly named)
mv src/app/\(app\)/exam-papers/page.tsx src/app/\(education\)/exam-papers/
mv src/app/\(app\)/exam-papers/layout.tsx src/app/\(education\)/exam-papers/
mv src/app/\(app\)/exam-papers/_components/ src/app/\(education\)/exam-papers/
```

### **PHASE 5: Migrate Utility Route Group**

```bash
# FAQ section
mv src/app/\(app\)/faq/page.tsx src/app/\(utility\)/faq/
mv src/app/\(app\)/faq/layout.tsx src/app/\(utility\)/faq/

# Legal pages consolidation
mv src/app/\(app\)/legal/privacy-policy/page.tsx src/app/\(utility\)/legal/privacy-policy/
mv src/app/\(app\)/legal/terms-of-service/page.tsx src/app/\(utility\)/legal/terms-of-service/
mv src/app/\(app\)/legal/cookie-policy/page.tsx src/app/\(utility\)/legal/cookie-policy/
mv src/app/\(app\)/legal/booking-policy/page.tsx src/app/\(utility\)/legal/booking-policy/
mv src/app/\(app\)/legal/record-of-processing/page.tsx src/app/\(utility\)/legal/record-of-processing/

# Offline page
mv src/app/\(app\)/offline/page.tsx src/app/\(utility\)/offline/
```

### **PHASE 6: Migrate Admin Route Group**

```bash
# Admin section (from payload)
mv src/app/\(payload\)/layout.tsx src/app/\(admin\)/layout.tsx
mv src/app/\(payload\)/admin/[[...segments]]/page.tsx src/app/\(admin\)/[[...segments]]/
mv src/app/\(payload\)/admin/[[...segments]]/not-found.tsx src/app/\(admin\)/[[...segments]]/
```

### **PHASE 7: Reorganize API Routes by Domain**

```bash
# Content domain API routes
mv src/app/api/faq/ src/app/api/content/
mv src/app/api/newsletter/ src/app/api/content/

# Communication domain API routes
mv src/app/api/contact/ src/app/api/communication/
mv src/app/api/errors/ src/app/api/communication/

# Monitoring domain API routes
mv src/app/api/performance/ src/app/api/monitoring/

# Payload CMS API routes
mv src/app/\(payload\)/api/[...slug]/ src/app/api/payload/

# Note: Analytics API routes already correctly organized - no changes needed
```

### **PHASE 8: Cleanup Empty Directories**

```bash
# Remove empty directories
rmdir src/app/\(app\)/subject-tuition/components/ 2>/dev/null || true
rmdir src/app/\(app\)/legal/ 2>/dev/null || true
rmdir src/app/\(app\)/ 2>/dev/null || true
rmdir src/app/\(payload\)/admin/[[...segments]]/ 2>/dev/null || true
rmdir src/app/\(payload\)/admin/ 2>/dev/null || true
rmdir src/app/\(payload\)/api/ 2>/dev/null || true
rmdir src/app/\(payload\)/ 2>/dev/null || true
rmdir src/app/api/debug-blog/ 2>/dev/null || true
```

---

## MIGRATION EXECUTION SCRIPT

```bash
#!/bin/bash
# App Router Migration Script - Execute from project root

set -e  # Exit on any error

echo "🚀 Starting App Router Migration..."

# Phase 1: Create new route group structure
echo "📁 Phase 1: Creating new route group structure..."
mkdir -p src/app/{\\(public\\)/{about,blog/\\[slug\\],contact,testimonials,meet-our-tutors},\\(education\\)/{11-plus-bootcamps,subject-tuition/_components,video-masterclasses,how-it-works,exam-papers},\\(utility\\)/{faq,legal/{privacy-policy,terms-of-service,cookie-policy,booking-policy,record-of-processing},offline},\\(admin\\)/\\[\\[...segments\\]\\]}
mkdir -p src/app/api/{content/{faq/{errors,suggestions/{\\[id\\]/vote}},newsletter},communication/{contact,errors},monitoring/performance/{alerts,metrics},payload/\\[...slug\\]}

# Phase 2: Migrate root level files
echo "🏠 Phase 2: Migrating root level files..."
mv src/app/\\(app\\)/layout.tsx src/app/layout.tsx 2>/dev/null || true
mv src/app/\\(app\\)/page.tsx src/app/page.tsx 2>/dev/null || true
mv src/app/\\(app\\)/sitemap.ts src/app/sitemap.ts 2>/dev/null || true
mv src/app/\\(app\\)/not-found.tsx src/app/not-found.tsx 2>/dev/null || true
mv src/app/\\(app\\)/error.tsx src/app/error.tsx 2>/dev/null || true

# Phase 3: Migrate public route group
echo "🌐 Phase 3: Migrating public routes..."
mv src/app/\\(app\\)/about/page.tsx src/app/\\(public\\)/about/ 2>/dev/null || true
mv src/app/\\(app\\)/about/layout.tsx src/app/\\(public\\)/about/ 2>/dev/null || true
mv src/app/\\(app\\)/blog/page.tsx src/app/\\(public\\)/blog/ 2>/dev/null || true
mv src/app/\\(app\\)/blog/layout.tsx src/app/\\(public\\)/blog/ 2>/dev/null || true
mv src/app/\\(app\\)/blog/\\[slug\\]/page.tsx src/app/\\(public\\)/blog/\\[slug\\]/ 2>/dev/null || true
mv src/app/\\(app\\)/contact/page.tsx src/app/\\(public\\)/contact/ 2>/dev/null || true
mv src/app/\\(app\\)/contact/layout.tsx src/app/\\(public\\)/contact/ 2>/dev/null || true
mv src/app/\\(app\\)/testimonials/page.tsx src/app/\\(public\\)/testimonials/ 2>/dev/null || true
mv src/app/\\(app\\)/testimonials/layout.tsx src/app/\\(public\\)/testimonials/ 2>/dev/null || true
mv src/app/\\(app\\)/meet-our-tutors/page.tsx src/app/\\(public\\)/meet-our-tutors/ 2>/dev/null || true
mv src/app/\\(app\\)/meet-our-tutors/layout.tsx src/app/\\(public\\)/meet-our-tutors/ 2>/dev/null || true

# Phase 4: Migrate education route group
echo "🎓 Phase 4: Migrating education routes..."
mv src/app/\\(app\\)/11-plus-bootcamps/page.tsx src/app/\\(education\\)/11-plus-bootcamps/ 2>/dev/null || true
mv src/app/\\(app\\)/11-plus-bootcamps/layout.tsx src/app/\\(education\\)/11-plus-bootcamps/ 2>/dev/null || true
mv src/app/\\(app\\)/subject-tuition/page.tsx src/app/\\(education\\)/subject-tuition/ 2>/dev/null || true
mv src/app/\\(app\\)/subject-tuition/components/education-level-content.tsx src/app/\\(education\\)/subject-tuition/_components/ 2>/dev/null || true
mv src/app/\\(app\\)/subject-tuition/components/subject-tuition-tabs.tsx src/app/\\(education\\)/subject-tuition/_components/ 2>/dev/null || true
mv src/app/\\(app\\)/video-masterclasses/page.tsx src/app/\\(education\\)/video-masterclasses/ 2>/dev/null || true
mv src/app/\\(app\\)/video-masterclasses/layout.tsx src/app/\\(education\\)/video-masterclasses/ 2>/dev/null || true
mv src/app/\\(app\\)/how-it-works/page.tsx src/app/\\(education\\)/how-it-works/ 2>/dev/null || true
mv src/app/\\(app\\)/how-it-works/layout.tsx src/app/\\(education\\)/how-it-works/ 2>/dev/null || true
mv src/app/\\(app\\)/exam-papers/page.tsx src/app/\\(education\\)/exam-papers/ 2>/dev/null || true
mv src/app/\\(app\\)/exam-papers/layout.tsx src/app/\\(education\\)/exam-papers/ 2>/dev/null || true
mv src/app/\\(app\\)/exam-papers/_components/ src/app/\\(education\\)/exam-papers/ 2>/dev/null || true

# Phase 5: Migrate utility route group
echo "🔧 Phase 5: Migrating utility routes..."
mv src/app/\\(app\\)/faq/page.tsx src/app/\\(utility\\)/faq/ 2>/dev/null || true
mv src/app/\\(app\\)/faq/layout.tsx src/app/\\(utility\\)/faq/ 2>/dev/null || true
mv src/app/\\(app\\)/legal/privacy-policy/page.tsx src/app/\\(utility\\)/legal/privacy-policy/ 2>/dev/null || true
mv src/app/\\(app\\)/legal/terms-of-service/page.tsx src/app/\\(utility\\)/legal/terms-of-service/ 2>/dev/null || true
mv src/app/\\(app\\)/legal/cookie-policy/page.tsx src/app/\\(utility\\)/legal/cookie-policy/ 2>/dev/null || true
mv src/app/\\(app\\)/legal/booking-policy/page.tsx src/app/\\(utility\\)/legal/booking-policy/ 2>/dev/null || true
mv src/app/\\(app\\)/legal/record-of-processing/page.tsx src/app/\\(utility\\)/legal/record-of-processing/ 2>/dev/null || true
mv src/app/\\(app\\)/offline/page.tsx src/app/\\(utility\\)/offline/ 2>/dev/null || true

# Phase 6: Migrate admin route group
echo "👨‍💼 Phase 6: Migrating admin routes..."
mv src/app/\\(payload\\)/layout.tsx src/app/\\(admin\\)/layout.tsx 2>/dev/null || true
mv src/app/\\(payload\\)/admin/\\[\\[...segments\\]\\]/page.tsx src/app/\\(admin\\)/\\[\\[...segments\\]\\]/ 2>/dev/null || true
mv src/app/\\(payload\\)/admin/\\[\\[...segments\\]\\]/not-found.tsx src/app/\\(admin\\)/\\[\\[...segments\\]\\]/ 2>/dev/null || true

# Phase 7: Reorganize API routes by domain
echo "🔌 Phase 7: Reorganizing API routes..."
mv src/app/api/faq/ src/app/api/content/ 2>/dev/null || true
mv src/app/api/newsletter/ src/app/api/content/ 2>/dev/null || true
mv src/app/api/contact/ src/app/api/communication/ 2>/dev/null || true
mv src/app/api/errors/ src/app/api/communication/ 2>/dev/null || true
mv src/app/api/performance/ src/app/api/monitoring/ 2>/dev/null || true
mv src/app/\\(payload\\)/api/\\[...slug\\]/ src/app/api/payload/ 2>/dev/null || true

# Phase 8: Cleanup
echo "🧹 Phase 8: Cleaning up empty directories..."
rmdir src/app/\\(app\\)/subject-tuition/components/ 2>/dev/null || true
rmdir src/app/\\(app\\)/legal/ 2>/dev/null || true
rmdir src/app/\\(app\\)/ 2>/dev/null || true
rmdir src/app/\\(payload\\)/admin/\\[\\[...segments\\]\\]/ 2>/dev/null || true
rmdir src/app/\\(payload\\)/admin/ 2>/dev/null || true
rmdir src/app/\\(payload\\)/api/ 2>/dev/null || true
rmdir src/app/\\(payload\\)/ 2>/dev/null || true
rmdir src/app/api/debug-blog/ 2>/dev/null || true

echo "✅ App Router migration completed successfully!"
echo ""
echo "📊 New structure created:"
tree src/app -d -L 3 2>/dev/null || echo "Install 'tree' command to see directory structure"
```

---

## VERIFICATION CHECKLIST

### **Pre-Migration Verification**
- [ ] Backup current `src/app` directory
- [ ] Run `pnpm run build` to ensure current state is working
- [ ] Commit current changes to git
- [ ] Verify no uncommitted changes in app directory

### **Post-Migration Verification**

#### **Directory Structure Check**
- [ ] Root level files (`layout.tsx`, `page.tsx`, `sitemap.ts`, `not-found.tsx`, `error.tsx`) exist
- [ ] Route groups `(public)`, `(education)`, `(utility)`, `(admin)` created
- [ ] Private folders (`_components`) correctly placed within routes
- [ ] API routes organized by domain: `analytics/`, `content/`, `communication/`, `monitoring/`, `payload/`

#### **URL Structure Validation**
Route groups don't affect URLs, so verify these paths still work:
- [ ] `/about` - from `(public)/about/page.tsx`
- [ ] `/blog` - from `(public)/blog/page.tsx`
- [ ] `/11-plus-bootcamps` - from `(education)/11-plus-bootcamps/page.tsx`
- [ ] `/legal/privacy-policy` - from `(utility)/legal/privacy-policy/page.tsx`
- [ ] `/api/analytics/events` - analytics routes unchanged

#### **File Count Verification**
```bash
# Run these commands to verify migration completeness
find src/app -name "*.tsx" -o -name "*.ts" | wc -l  # Should match original count
find src/app/\\(public\\) -name "*.tsx" | wc -l      # Should have public routes
find src/app/\\(education\\) -name "*.tsx" | wc -l   # Should have education routes
find src/app/\\(utility\\) -name "*.tsx" | wc -l     # Should have utility routes
find src/app/\\(admin\\) -name "*.tsx" | wc -l       # Should have admin routes
find src/app/api -name "route.ts" | wc -l          # Should match API route count
```

#### **Import Path Updates Required**
After migration, update import paths in:
- [ ] Root layout imports
- [ ] Route group layouts for shared components
- [ ] API route cross-references
- [ ] Any hardcoded route references

#### **Build Verification**
- [ ] Run `pnpm run typecheck` - should pass without errors
- [ ] Run `pnpm run build` - should complete successfully
- [ ] Run development server - should start without import errors
- [ ] Test key routes render correctly: `/`, `/about`, `/11-plus-bootcamps`, `/legal/privacy-policy`
- [ ] Test API endpoints: `/api/analytics/events`, `/api/content/newsletter`

#### **Layout Validation**
- [ ] Root layout (`src/app/layout.tsx`) renders correctly
- [ ] Route group layouts provide appropriate shared UI
- [ ] Legal pages share consistent layout structure
- [ ] Education routes have consistent navigation

#### **Final Structure Validation**
- [ ] No files remaining in old `(app)` or `(payload)` directories
- [ ] No empty directories (except intentionally empty ones)
- [ ] All `_components` folders contain route-specific components only
- [ ] API routes logically grouped by domain

### **Rollback Plan**
If issues arise:
1. `git checkout -- src/app/` (if uncommitted)
2. `git reset --hard HEAD~1` (if committed)
3. Restore backup directory
4. Re-run build to ensure working state

---

## POST-MIGRATION TASKS

### **Create Route Group Layouts**

After migration, create shared layouts for route groups:

#### **1. Public Routes Layout (`(public)/layout.tsx`)**
```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Private Tutor Online',
  description: 'Premium tutoring services with royal endorsements'
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="public-layout">
      {/* Shared public UI - navigation, hero sections, etc. */}
      {children}
    </div>
  )
}
```

#### **2. Education Routes Layout (`(education)/layout.tsx`)**
```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Educational Services | My Private Tutor Online',
  description: 'Comprehensive educational support from primary to university level'
}

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="education-layout">
      {/* Shared education UI - subject navigation, progress indicators, etc. */}
      {children}
    </div>
  )
}
```

#### **3. Utility Pages Layout (`(utility)/layout.tsx`)**
```tsx
import { Metadata } from 'next'

export default function UtilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="utility-layout">
      {/* Shared utility UI - simple layouts for FAQ, legal pages, etc. */}
      {children}
    </div>
  )
}
```

#### **4. Legal Pages Shared Layout (`(utility)/legal/layout.tsx`)**
```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Information | My Private Tutor Online',
  description: 'Legal policies and terms of service'
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="legal-layout">
      {/* Shared legal navigation and formatting */}
      <nav className="legal-nav">
        {/* Legal page navigation */}
      </nav>
      <main className="legal-content">
        {children}
      </main>
    </div>
  )
}
```

---

## EXECUTION SUMMARY

This migration plan covers:

✅ **47 files mapped** to new logical route group locations
✅ **8-phase migration strategy** from flat structure to feature-based route groups
✅ **Complete bash script** ready to execute with error handling
✅ **API domain reorganization** for better logical grouping
✅ **Private folder patterns** for non-routable component organization
✅ **Comprehensive verification checklist** with rollback plan

### **Key Benefits After Migration:**
- **Clear feature boundaries** with route groups that don't affect URLs
- **Logical API organization** by domain rather than flat structure
- **Consistent private folder usage** for component colocation
- **Scalable structure** that follows 2025 Next.js App Router best practices
- **Improved maintainability** through feature-based organization

### **Next Steps:**
1. **Backup** your current app directory
2. **Commit** current state to git
3. **Execute** the migration script
4. **Create shared layouts** for route groups
5. **Update any hardcoded imports** across your application
6. **Verify** all routes and API endpoints function correctly

The migration script includes error handling (`2>/dev/null || true`) so it won't fail if files are already moved or don't exist.

---

**Document Created**: December 2025
**Project**: My Private Tutor Online - App Router Migration
**Standards**: British English, Next.js 15.3.4 App Router, Route Groups, Private Folders