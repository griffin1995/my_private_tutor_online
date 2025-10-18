# Implementation Roadmap - Page Architecture Standardisation

**Purpose**: Staged implementation plan with approval checkpoints for standardising 34 non-compliant pages
**Date Created**: 18 October 2025
**Status**: ⏳ Awaiting Phase 1 Approval
**Business Impact**: £191,500/year optimisation value + royal client standards compliance

---

## Table of Contents

1. [Implementation Overview](#implementation-overview)
2. [Phase 1: Critical Marketing Pages](#phase-1-critical-marketing-pages)
3. [Phase 2: Secondary Marketing Pages](#phase-2-secondary-marketing-pages)
4. [Phase 3: Utility & Legal Pages](#phase-3-utility--legal-pages)
5. [Phase 4: Admin & Dashboard Pages](#phase-4-admin--dashboard-pages)
6. [Testing & Validation Strategy](#testing--validation-strategy)
7. [Risk Mitigation](#risk-mitigation)

---

## Implementation Overview

### Migration Metrics

| Metric | Current | Target | Impact |
|--------|---------|--------|--------|
| Compliant Pages | 3/37 (8.1%) | 37/37 (100%) | +91.9% compliance |
| Server Components | 9/37 (24.3%) | 30/37 (81.1%) | +56.8% performance |
| Metadata Coverage | 9/37 (24.3%) | 37/37 (100%) | +75.7% SEO optimisation |
| CMS Centralisation | 6/37 (16.2%) | 37/37 (100%) | +83.8% maintainability |
| Build Time Target | 11.0s | ≤11.0s | Maintain current performance |

### Approval Checkpoints

**Critical Rule**: NO code changes without explicit client approval for each phase

| Phase | Pages | Approval Required | Approval Date | Implementation Start |
|-------|-------|-------------------|---------------|---------------------|
| Phase 1 | 8 critical marketing | ✅ YES | Pending | After approval |
| Phase 2 | 12 secondary marketing | ✅ YES | Pending | After Phase 1 + approval |
| Phase 3 | 10 utility/legal | ⚠️ RECOMMENDED | Pending | After Phase 2 |
| Phase 4 | 4 admin/dashboard | ❌ NO | N/A | After Phase 3 |

### Business Impact Forecast

**Revenue Protection**: £400,000+ annual revenue + £191,500/year optimisation value
**SEO Improvement**: 75.7% increase in metadata coverage (28 pages gain proper SEO)
**Maintenance Cost Reduction**: 83.8% reduction in duplicated CMS data (31 pages centralised)
**Royal Client Standards**: 91.9% improvement in architecture compliance
**Build Performance**: Maintain 11.0s target while improving Server Component ratio by 56.8%

---

## Phase 1: Critical Marketing Pages

### Timeline: Week 1 (5 working days)

**Objective**: Standardise highest-traffic, highest-value marketing pages
**Approval Required**: ✅ YES - Client sign-off mandatory before any changes
**Risk Level**: 🔴 HIGH - Revenue-generating pages
**Testing Required**: Full build + manual verification on all pages

### Pages Included (8 pages)

| Page | File Path | Current Status | Priority | Estimated Effort |
|------|-----------|----------------|----------|------------------|
| Homepage | `/src/app/[locale]/page.tsx` | ✅ Compliant (redirect) | P0 | 0h (no changes) |
| About Us | `/src/app/about/page.tsx` | ❌ Non-compliant | P1 | 3h |
| How It Works | `/src/app/how-it-works/page.tsx` | ❌ Non-compliant | P1 | 4h (complex) |
| Testimonials | `/src/app/testimonials/page.tsx` | ❌ Non-compliant | P1 | 3h |
| Subject Tuition | `/src/app/subject-tuition/page.tsx` | ❌ Non-compliant | P1 | 2.5h |
| Subject Tuition (Tabs) | `/src/app/subject-tuition-tabs/page.tsx` | ❌ Non-compliant | P2 | 2h |
| Meet Our Tutors | `/src/app/meet-our-tutors/page.tsx` | ❌ Non-compliant | P1 | 2.5h |
| Video Masterclasses | `/src/app/video-masterclasses/page.tsx` | ❌ Non-compliant | P1 | 2.5h |

**Total Effort**: 20 hours (4 days with buffer)

### Implementation Steps (Per Page)

#### Step 1: CMS Data Migration (2-3 hours)

```typescript
// ============================================================================
// BEFORE: Hardcoded data in page file
// ============================================================================
// File: /src/app/about/page.tsx (lines 12-22)

const ABOUT_HERO_IMAGE = {
	src: '/images/about/about-founder-story.jpg',
	alt: 'Elizabeth Burrows founder story hero background',
	width: 1920,
	height: 1080,
	title: 'About Our Founder - Heritage and Excellence',
};

const FOUNDER_STORY_CONTENT = {
	title: 'Our Story',
	paragraphs: [
		'Elizabeth Burrows founded My Private Tutor Online in 2010...',
		// ... more paragraphs
	],
};

// ============================================================================
// AFTER: Centralised CMS data with TypeScript interfaces
// ============================================================================
// File: /src/content/cms-content.ts (new centralised location)

// TypeScript interfaces for type safety
interface HeroImage {
	readonly src: string;
	readonly alt: string;
	readonly width: number;
	readonly height: number;
	readonly title: string;
}

interface FounderStoryContent {
	readonly title: string;
	readonly paragraphs: readonly string[];
}

interface AboutPageContent {
	readonly hero: HeroImage;
	readonly founderStory: FounderStoryContent;
}

// Centralised CMS data
export const getAboutPageContent = (): AboutPageContent => ({
	hero: {
		src: '/images/about/about-founder-story.jpg',
		alt: 'Elizabeth Burrows founder story hero background - premium tutoring service heritage',
		width: 1920,
		height: 1080,
		title: 'About Our Founder - Heritage and Excellence',
	},
	founderStory: {
		title: 'Our Story',
		paragraphs: [
			'Elizabeth Burrows founded My Private Tutor Online in 2010...',
			// ... more paragraphs
		] as const,
	},
});

// ============================================================================
// UPDATED PAGE: Import from centralised CMS
// ============================================================================
// File: /src/app/about/page.tsx (updated)

import { getAboutPageContent } from '@/content/cms-content';

export default function AboutUsPage() {
	const pageContent = getAboutPageContent();

	return (
		<>
			<section id='about-hero'>
				<SimpleHero
					backgroundImage={pageContent.hero.src}
					h1={<span className='text-white'>Founder <span className='text-accent-600'>& Ethos</span></span>}
					h2='Our bespoke consultation and pairing process ensures the perfect fit and seamless support throughout.'
					decorativeStyle='none'
				/>
			</section>
		</>
	);
}
```

**Deliverable**: All hardcoded CMS data moved to `/src/content/cms-content.ts` with TypeScript interfaces

#### Step 2: Remove Client Component Directive (15 minutes)

```typescript
// ============================================================================
// BEFORE: Unnecessary client component
// ============================================================================
'use client';

import { PageFooter } from '@/components/layout/page-footer';
import { PageHeader } from '@/components/layout/page-header';

export default function AboutUsPage() {
	return (
		<div className='min-h-screen flex flex-col overflow-x-hidden bg-white'>
			<PageHeader />
			<main>Content...</main>
			<PageFooter />
		</div>
	);
}

// ============================================================================
// AFTER: Server Component (no 'use client')
// ============================================================================
// Removed: 'use client' directive
// Removed: <PageHeader /> and <PageFooter /> (in layout.tsx)
// Removed: wrapper <div> (handled by layout)

import { SimpleHero } from '@/components/layout/simple-hero';

export default function AboutUsPage() {
	return (
		<>
			<section id='about-hero'>
				<SimpleHero />
			</section>
			{/* More sections */}
		</>
	);
}
```

**Deliverable**: Page is now Server Component, header/footer removed

#### Step 3: Add Metadata Export (30 minutes)

```typescript
// ============================================================================
// AFTER: Metadata export for SEO
// ============================================================================
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us | My Private Tutor Online',
	description: 'Founded by Elizabeth Burrows in 2010, discover our heritage of excellence in premium tutoring with royal endorsements and 15+ years of experience serving elite families across the UK.',
	keywords: [
		'Elizabeth Burrows',
		'founder',
		'premium tutoring',
		'royal endorsements',
		'Tatler Address Book',
		'elite tutoring',
		'academic excellence',
	],
	openGraph: {
		title: 'About Us | My Private Tutor Online',
		description: 'Founded by Elizabeth Burrows in 2010, discover our heritage of excellence in premium tutoring with royal endorsements and 15+ years of experience.',
		images: [
			{
				url: '/images/about/about-founder-story.jpg',
				width: 1920,
				height: 1080,
				alt: 'Elizabeth Burrows - Founder of My Private Tutor Online',
				type: 'image/jpeg',
			},
		],
		type: 'website',
		locale: 'en_GB',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'About Us | My Private Tutor Online',
		description: 'Founded by Elizabeth Burrows - royal family endorsed private tutoring.',
		images: ['/images/about/about-founder-story.jpg'],
		creator: '@MyPrivateTutorUK',
		site: '@MyPrivateTutorUK',
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/about',
	},
};

export default function AboutUsPage() {
	// Page content
}
```

**Deliverable**: Full SEO metadata with OpenGraph and Twitter cards

#### Step 4: Design Token Verification (20 minutes)

```typescript
// ============================================================================
// VERIFY: Design token usage (no hardcoded colours)
// ============================================================================

// ❌ BAD: Hardcoded hex colours
<h1 className="text-[#3F4A7E]">Title</h1>
<span className="text-[#CA9E5B]">Accent</span>

// ✅ GOOD: Design tokens from tailwind.config.ts
<h1 className="text-primary-700">Title</h1>  {/* #3F4A7E */}
<span className="text-accent-600">Accent</span>  {/* #CA9E5B */}

// ✅ BEST: Semantic HTML with @layer base (no classes needed)
<h1>Title</h1>  {/* Automatically navy from globals.css */}
<p>Body text</p>  {/* Automatically grey-800 from @layer base */}
<a href="/about">Link</a>  {/* Automatically gold with hover */}
```

**Deliverable**: Zero hardcoded colours, all design tokens verified

#### Step 5: Build Verification (10 minutes)

```bash
# ============================================================================
# MANDATORY: Build test after each page migration
# ============================================================================

# Clean build directory
rm -rf .next

# Run production build
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Static generation complete (91 routes)
# ✓ Build time: ≤11.0s (target maintained)
# ✓ No TypeScript errors
# ✓ No Server Component violations

# Verify specific page
# Check .next/server/app/about/page.html exists
# Verify no client bundles for Server Components
```

**Deliverable**: Build passes with ≤11.0s build time

### Phase 1 Acceptance Criteria

**Before marking Phase 1 complete**, verify ALL of the following:

- ✅ **All 8 pages migrated** to standard architecture
- ✅ **CMS data centralised** in `/src/content/cms-content.ts`
- ✅ **TypeScript interfaces** defined for all CMS data
- ✅ **Metadata exports** present on all pages
- ✅ **No `<PageHeader />` or `<PageFooter />`** duplication
- ✅ **Server Components** for all non-interactive pages
- ✅ **Design tokens only** (no hardcoded colours)
- ✅ **Build passes** with ≤11.0s target
- ✅ **Manual verification** on all 8 pages (visual QA)
- ✅ **Client approval** received for Phase 1 deliverables

**Approval Document Required**: Screenshots + build logs + compliance report

---

## Phase 2: Secondary Marketing Pages

### Timeline: Week 2 (5 working days)

**Objective**: Standardise supporting marketing pages and subject-specific content
**Approval Required**: ✅ YES - Client sign-off mandatory before any changes
**Risk Level**: 🟡 MEDIUM - Important but lower traffic
**Testing Required**: Full build + manual verification

### Pages Included (12 pages)

| Page | File Path | Current Status | Priority | Estimated Effort |
|------|-----------|----------------|----------|------------------|
| 11+ Bootcamps | `/src/app/11-plus-bootcamps/page.tsx` | ❌ Non-compliant | P2 | 3h |
| Subject Tuition (Dynamic) | `/src/app/subject-tuition/[subject]/page.tsx` | ❌ Non-compliant | P2 | 3.5h (dynamic) |
| Expert Educators | `/src/app/expert-educators/page.tsx` | ❌ Non-compliant | P2 | 2h |
| Homeschooling | `/src/app/homeschooling/page.tsx` | ❌ Non-compliant | P2 | 2h |
| Services | `/src/app/services/page.tsx` | ❌ Non-compliant | P3 | 2h |
| Resources | `/src/app/resources/page.tsx` | ❌ Non-compliant | P3 | 2h |
| Exam Papers | `/src/app/exam-papers/page.tsx` | ❌ Non-compliant | P3 | 1.5h |
| Blog | `/src/app/blog/page.tsx` | ❌ Non-compliant | P3 | 2h |
| Contact | `/src/app/contact/page.tsx` | ❌ Non-compliant | P2 | 2h |
| Design Tokens Test | `/src/app/[locale]/design-tokens-test/page.tsx` | ❌ Non-compliant | P4 | 1h |
| Token Test | `/src/app/token-test/page.tsx` | ❌ Non-compliant | P4 | 1h |
| Offline | `/src/app/offline/page.tsx` | ❌ Non-compliant | P4 | 1h |

**Total Effort**: 24 hours (5 days with buffer)

### Implementation Strategy

**Same 5-step process as Phase 1**:
1. CMS Data Migration (2-3 hours per page)
2. Remove Client Component Directive (15 minutes)
3. Add Metadata Export (30 minutes)
4. Design Token Verification (20 minutes)
5. Build Verification (10 minutes)

**Critical Difference**: Dynamic routes require additional template configuration

#### Dynamic Route Pattern: Subject Tuition

```typescript
// ============================================================================
// SPECIAL CASE: Dynamic route with generateStaticParams
// ============================================================================
// File: /src/app/subject-tuition/[subject]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// ============================================================================
// GENERATE STATIC PARAMS - Required for dynamic routes
// ============================================================================
export async function generateStaticParams() {
	const subjects = ['mathematics', 'english', 'science', 'history']; // From CMS

	return subjects.map((subject) => ({
		subject: subject,
	}));
}

// ============================================================================
// GENERATE METADATA - Dynamic metadata for each subject
// ============================================================================
export async function generateMetadata({
	params,
}: {
	params: { subject: string };
}): Promise<Metadata> {
	const subjectData = getSubjectData(params.subject);

	if (!subjectData) {
		return {
			title: 'Subject Not Found | My Private Tutor Online',
		};
	}

	return {
		title: `${subjectData.name} Tutoring | My Private Tutor Online`,
		description: `Expert ${subjectData.name} tutoring for GCSE, A-Level, and university preparation. ${subjectData.description}`,
		openGraph: {
			title: `${subjectData.name} Tutoring | My Private Tutor Online`,
			description: `Expert ${subjectData.name} tutoring with proven results.`,
			images: [subjectData.image],
		},
	};
}

// ============================================================================
// PAGE COMPONENT - Server Component with dynamic content
// ============================================================================
export default function SubjectTuitionPage({
	params,
}: {
	params: { subject: string };
}) {
	const subjectData = getSubjectData(params.subject);

	if (!subjectData) {
		notFound(); // Return 404 for invalid subjects
	}

	return (
		<>
			<section id={`${params.subject}-hero`}>
				<SimpleHero
					backgroundImage={subjectData.hero.image}
					h1={subjectData.hero.h1}
					h2={subjectData.hero.h2}
				/>
			</section>
		</>
	);
}
```

### Phase 2 Acceptance Criteria

**Before marking Phase 2 complete**, verify:

- ✅ **All 12 pages migrated** to standard architecture
- ✅ **Dynamic routes** with `generateStaticParams` and `generateMetadata`
- ✅ **CMS data centralised** for all subjects
- ✅ **Build passes** with all static params generated correctly
- ✅ **Manual verification** on all 12 pages including dynamic routes
- ✅ **Client approval** received for Phase 2 deliverables

---

## Phase 3: Utility & Legal Pages

### Timeline: Week 3 (3 working days)

**Objective**: Standardise FAQ, legal, and utility pages
**Approval Required**: ⚠️ RECOMMENDED (lower risk but good practice)
**Risk Level**: 🟢 LOW - Standard pages, minimal customisation
**Testing Required**: Build verification only (no manual QA required)

### Pages Included (10 pages)

| Page | File Path | Current Status | Priority | Estimated Effort |
|------|-----------|----------------|----------|------------------|
| FAQ (Main) | `/src/app/faq/page.tsx` | ❌ Non-compliant | P3 | 2h |
| FAQ (Locale) | `/src/app/[locale]/faq/page.tsx` | ❌ Non-compliant | P3 | 2h |
| FAQ (Category) | `/src/app/faq/[category]/page.tsx` | ❌ Non-compliant | P3 | 2.5h (dynamic) |
| FAQ (Subcategory) | `/src/app/faq/[category]/[subcategory]/page.tsx` | ❌ Non-compliant | P3 | 2.5h (dynamic) |
| Privacy Policy | `/src/app/legal/privacy-policy/page.tsx` | ❌ Non-compliant | P3 | 1.5h |
| Cookie Policy | `/src/app/legal/cookie-policy/page.tsx` | ❌ Non-compliant | P3 | 1.5h |
| Terms of Service | `/src/app/legal/terms-of-service/page.tsx` | ❌ Non-compliant | P3 | 1.5h |
| Performance Dashboard | `/src/app/performance-dashboard/page.tsx` | ⚠️ Client Component | P4 | 1h (verify only) |

**Total Effort**: 15 hours (3 days with buffer)

### Simplified Implementation

**Utility pages are simpler** - mostly text content with minimal CMS data:

```typescript
// ============================================================================
// SIMPLIFIED PATTERN: Legal/FAQ pages
// ============================================================================
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy | My Private Tutor Online',
	description: 'Our privacy policy explains how we collect, use, and protect your personal data in compliance with GDPR and UK data protection laws.',
	robots: {
		index: true,
		follow: true,
	},
};

export default function PrivacyPolicyPage() {
	return (
		<>
			<section id='privacy-policy-header'>
				<h1>Privacy Policy</h1>
				<p>Last updated: 18 October 2025</p>
			</section>

			<section id='privacy-policy-content'>
				{/* Legal content - can stay as JSX or move to CMS */}
			</section>
		</>
	);
}
```

### Phase 3 Acceptance Criteria

- ✅ **All 10 pages migrated** to standard architecture
- ✅ **Metadata exports** present
- ✅ **Build passes** successfully
- ⚠️ **Client approval** recommended but not mandatory

---

## Phase 4: Admin & Dashboard Pages

### Timeline: Week 4 (2 working days)

**Objective**: Standardise admin and dashboard pages (maintain Client Components)
**Approval Required**: ❌ NO - Internal tools, standard patterns apply
**Risk Level**: 🟢 LOW - Internal only, no public visibility
**Testing Required**: Functional testing (ensure interactivity works)

### Pages Included (4 pages)

| Page | File Path | Current Status | Priority | Estimated Effort |
|------|-----------|----------------|----------|------------------|
| Admin Dashboard | `/src/app/admin/page.tsx` | ⚠️ Client Component | P4 | 2h |
| Admin Login | `/src/app/admin/login/page.tsx` | ⚠️ Client Component | P4 | 1h |
| Admin Monitoring | `/src/app/admin/monitoring/page.tsx` | ⚠️ Client Component | P4 | 1.5h |
| Dashboard (Main) | `/src/app/dashboard/page.tsx` | ⚠️ Client Component | P4 | 2h |
| Dashboard FAQ Analytics | `/src/app/dashboard/faq-analytics/page.tsx` | ⚠️ Client Component | P4 | 1.5h |
| Dashboard Performance | `/src/app/dashboard/performance/page.tsx` | ⚠️ Client Component | P4 | 1.5h |
| Dashboard Testimonials | `/src/app/dashboard/testimonials-analytics/page.tsx` | ⚠️ Client Component | P4 | 1.5h |

**Total Effort**: 11 hours (2 days with buffer)

### Special Consideration: Client Components

**Admin/Dashboard pages MUST remain Client Components** for interactivity:

```typescript
// ============================================================================
// CORRECT PATTERN: Admin page with Client Component
// ============================================================================
'use client';  // ✅ KEEP THIS - Required for useState, useEffect, etc.

import { useState, useEffect } from 'react';
import type { Metadata } from 'next'; // ❌ Metadata export NOT allowed in Client Components

// Metadata must be in parent layout.tsx OR separate metadata file
// Solution: Add metadata to /src/app/admin/layout.tsx instead

export default function AdminDashboardPage() {
	const [stats, setStats] = useState(null);

	useEffect(() => {
		// Client-side data fetching for real-time admin data
		fetchAdminStats().then(setStats);
	}, []);

	return (
		<>
			<section id='admin-header'>
				<h1>Admin Dashboard</h1>
			</section>

			<section id='admin-stats'>
				{/* Interactive admin components */}
			</section>
		</>
	);
}
```

**Admin Layout Metadata Pattern**:

```typescript
// ============================================================================
// SOLUTION: Admin metadata in layout.tsx
// ============================================================================
// File: /src/app/admin/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin Dashboard | My Private Tutor Online',
	robots: {
		index: false,  // Do not index admin pages
		follow: false,
	},
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
```

### Phase 4 Acceptance Criteria

- ✅ **All 7 admin/dashboard pages reviewed**
- ✅ **Metadata moved to layout.tsx** (not page.tsx)
- ✅ **Client Components maintained** for interactivity
- ✅ **Functional testing passed** (all features work)
- ❌ **No client approval required** (internal tools)

---

## Testing & Validation Strategy

### Automated Testing (Every Phase)

#### Build Verification Test

```bash
# ============================================================================
# MANDATORY: Run after every page migration
# ============================================================================

#!/bin/bash

# Clean build directory
echo "🧹 Cleaning build directory..."
rm -rf .next

# Run TypeScript compilation check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

# Run production build
echo "🏗️  Running production build..."
npm run build

# Verify build time
echo "⏱️  Verifying build time..."
# Build time should be ≤11.0s

# Check for errors
if [ $? -eq 0 ]; then
	echo "✅ Build successful!"
else
	echo "❌ Build failed - fix errors before continuing"
	exit 1
fi

# Verify static generation
echo "📊 Verifying static generation..."
# Check .next/server/app directory for generated pages

# List all generated routes
find .next/server/app -name "*.html" | wc -l
# Expected: 91 routes (target)
```

#### Metadata Validation Test

```typescript
// ============================================================================
// OPTIONAL: Automated metadata validation script
// ============================================================================
// File: /scripts/validate-metadata.ts

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const REQUIRED_METADATA = ['title', 'description', 'openGraph'];

async function validatePageMetadata(filePath: string): Promise<boolean> {
	const content = await readFile(filePath, 'utf-8');

	// Check for metadata export
	if (!content.includes('export const metadata')) {
		console.error(`❌ Missing metadata export: ${filePath}`);
		return false;
	}

	// Check for required fields
	for (const field of REQUIRED_METADATA) {
		if (!content.includes(field)) {
			console.error(`❌ Missing metadata.${field}: ${filePath}`);
			return false;
		}
	}

	console.log(`✅ Metadata valid: ${filePath}`);
	return true;
}

// Run validation on all pages
async function main() {
	const pagesDir = join(process.cwd(), 'src/app');
	// Recursively find all page.tsx files
	// Validate metadata in each file
}

main();
```

### Manual Verification (Phases 1 & 2 Only)

#### Visual QA Checklist (Per Page)

- ✅ **Page loads without errors** (no console errors)
- ✅ **Content displays correctly** (no layout shifts)
- ✅ **Images load properly** (correct paths, no 404s)
- ✅ **Links work** (navigation functional)
- ✅ **Responsive behaviour** (mobile, tablet, desktop)
- ✅ **Accessibility** (keyboard navigation, screen reader friendly)
- ✅ **SEO metadata** (inspect page source for OpenGraph tags)
- ✅ **Design tokens verified** (correct colours, no hardcoded hex)

#### Performance Verification

```bash
# Lighthouse CI test (optional but recommended)
npx lighthouse https://myprivatetutoronline.com/about \
	--output=json \
	--output-path=./lighthouse-about.json \
	--only-categories=performance,accessibility,best-practices,seo

# Expected scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

---

## Risk Mitigation

### Risk 1: Build Time Regression

**Risk Level**: 🔴 HIGH
**Impact**: Violates 11.0s build time target, affects deployment speed
**Mitigation**:
1. Monitor build time after EVERY page migration
2. If build time >11.0s, STOP immediately and investigate
3. Use dynamic imports for heavy components
4. Verify Server Component ratio (target: 81.1% or 30/37 pages)

**Rollback Plan**: Revert to previous page version if build time exceeds 11.0s

### Risk 2: SEO Metadata Errors

**Risk Level**: 🟡 MEDIUM
**Impact**: Poor search rankings, missing social sharing images
**Mitigation**:
1. Use TypeScript interfaces for metadata structure
2. Automated validation script (see Testing Strategy)
3. Manual verification of OpenGraph tags in page source
4. Test social sharing on LinkedIn/Twitter before approval

**Rollback Plan**: Fix metadata errors within 24 hours or revert page

### Risk 3: CMS Data Loss

**Risk Level**: 🔴 HIGH
**Impact**: Missing content, broken pages, data migration errors
**Mitigation**:
1. **ALWAYS backup existing page file before migration**
2. Copy all hardcoded data to `/src/content/cms-content.ts` BEFORE removing from page
3. Verify CMS data structure with TypeScript interfaces
4. Test page thoroughly after migration

**Rollback Plan**: Restore backup file if any content missing

### Risk 4: Client Component Violations

**Risk Level**: 🟡 MEDIUM
**Impact**: Server Component pages accidentally made client components
**Mitigation**:
1. Remove `'use client'` directive from pages with NO interactivity
2. Verify build output - check for client bundles
3. If page needs client interactivity, extract to separate Client Component

**Rollback Plan**: Add `'use client'` back if Server Component errors occur

### Risk 5: Design Token Violations

**Risk Level**: 🟢 LOW
**Impact**: Inconsistent colours, maintenance issues
**Mitigation**:
1. Search for hardcoded hex colours: `grep -r "#[0-9a-fA-F]{6}" src/app/`
2. Replace with design tokens from `tailwind.config.ts`
3. Prefer semantic HTML with `@layer base` styling (no classes needed)

**Rollback Plan**: Fix design token violations in next migration batch

---

## Phase Transition Checklist

### Before Starting Phase 1

- ✅ Client approval received for Phase 1 scope (8 pages)
- ✅ Backup created of all 8 pages to be modified
- ✅ Build time baseline recorded (current: 11.0s)
- ✅ Test environment ready (local development)

### Before Starting Phase 2

- ✅ Phase 1 complete and approved by client
- ✅ Phase 1 acceptance criteria met (all 10 checkboxes)
- ✅ Build time still ≤11.0s after Phase 1
- ✅ Client approval received for Phase 2 scope (12 pages)

### Before Starting Phase 3

- ✅ Phase 2 complete and approved (if approval required)
- ✅ Build time still ≤11.0s after Phase 2
- ✅ No outstanding bugs or issues from Phases 1-2

### Before Starting Phase 4

- ✅ Phase 3 complete
- ✅ Build time still ≤11.0s after Phase 3
- ✅ Admin/dashboard functional requirements documented

---

## Approval Process

### Phase 1 Approval Document

**Required Deliverables for Client Approval**:

1. **Screenshots** of all 8 migrated pages (before/after)
2. **Build logs** showing successful compilation and ≤11.0s build time
3. **Compliance report** with checklist verification
4. **Metadata validation** showing all SEO tags present
5. **Performance metrics** (Lighthouse scores if available)

**Approval Template**:

```markdown
# Phase 1 Completion Report - My Private Tutor Online

**Date**: [Date]
**Pages Migrated**: 8/8 (100%)
**Build Time**: [X.Xs] (Target: ≤11.0s)
**Status**: ✅ Ready for Client Approval

## Pages Migrated

1. ✅ Homepage (`/[locale]/page.tsx`) - Already compliant
2. ✅ About Us (`/about/page.tsx`) - Migrated
3. ✅ How It Works (`/how-it-works/page.tsx`) - Migrated
4. ✅ Testimonials (`/testimonials/page.tsx`) - Migrated
5. ✅ Subject Tuition (`/subject-tuition/page.tsx`) - Migrated
6. ✅ Subject Tuition Tabs (`/subject-tuition-tabs/page.tsx`) - Migrated
7. ✅ Meet Our Tutors (`/meet-our-tutors/page.tsx`) - Migrated
8. ✅ Video Masterclasses (`/video-masterclasses/page.tsx`) - Migrated

## Acceptance Criteria

- ✅ All 8 pages migrated to standard architecture
- ✅ CMS data centralised in `/src/content/cms-content.ts`
- ✅ TypeScript interfaces defined for all CMS data
- ✅ Metadata exports present on all pages
- ✅ No `<PageHeader />` or `<PageFooter />` duplication
- ✅ Server Components for all non-interactive pages
- ✅ Design tokens only (no hardcoded colours)
- ✅ Build passes with ≤11.0s target
- ✅ Manual verification completed
- ⏳ Client approval pending

## Screenshots

[Attach before/after screenshots here]

## Build Logs

```
✓ Compiled successfully
✓ Static generation complete (91 routes)
✓ Build time: [X.Xs]
✓ No TypeScript errors
✓ No Server Component violations
```

## Next Steps

Upon approval:
- Proceed to Phase 2 (12 secondary marketing pages)
- Timeline: Week 2 (5 working days)

**Client Signature**: _________________ Date: _________
```

---

## Related Documentation

- **ARCHITECTURE.md** - Official patterns and current state analysis
- **DESIGN_TOKENS.md** - Complete Tailwind configuration inventory
- **PAGE_INVENTORY.md** - Detailed analysis of all 37 pages
- **BEFORE_AFTER_EXAMPLES.md** - Concrete transformation examples

---

**Document Owner**: Claude Code (Anthropic)
**Review Cycle**: Pre-implementation approval required for Phases 1-2
**Last Updated**: 18 October 2025
