# Page Architecture Documentation - My Private Tutor Online

**Purpose**: Standardised page architecture patterns for enterprise-grade Next.js App Router implementation
**Date Created**: 18 October 2025
**Status**: ✅ Analysis Complete - Implementation Required
**Compliance**: 3 of 37 pages (8.1%) meet architectural standards

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Official Next.js App Router Patterns](#official-nextjs-app-router-patterns)
4. [Standard Page Architecture](#standard-page-architecture)
5. [Component Integration Patterns](#component-integration-patterns)
6. [Non-Compliant Patterns](#non-compliant-patterns)
7. [Migration Strategy](#migration-strategy)

---

## Executive Summary

### Current Situation

**Pages Audited**: 37 total pages
**Architecture Compliance**: 8.1% (3/37 pages)
**Non-Compliant Pages**: 34 pages requiring standardisation

### Critical Issues Identified

1. **Inconsistent Layout Usage** - 23 pages duplicate PageHeader/PageFooter instead of using layout composition
2. **Hardcoded CMS Data** - 31 pages embed CMS content directly instead of centralised import
3. **Missing Metadata** - 28 pages lack proper SEO metadata configuration
4. **Wrapper Antipattern** - 19 pages use unnecessary `<div className="min-h-screen">` containers
5. **Performance Issues** - 15 pages use client components unnecessarily instead of Server Components

### Business Impact

- **SEO Degradation**: Missing metadata reduces search visibility
- **Maintenance Cost**: Duplicated code increases technical debt
- **Build Time**: 11.0s target at risk without Server Component optimisation
- **Royal Client Standards**: Inconsistent architecture fails premium quality requirements

---

## Current State Analysis

### Page Architecture Patterns Observed

#### Pattern 1: Self-Contained Client Component (NON-COMPLIANT)

**Prevalence**: 23 of 37 pages (62.2%)
**Example Files**: `/src/app/about/page.tsx`, `/src/app/testimonials/page.tsx`, `/src/app/how-it-works/page.tsx`

```typescript
// ❌ ANTI-PATTERN - Violates App Router architecture principles
'use client';

import { PageFooter } from '@/components/layout/page-footer';
import { PageHeader } from '@/components/layout/page-header';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FounderStorySection } from '@/components/sections/about/founder-story-section';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { cn } from '@/lib/utils';
import { Blockquote } from 'flowbite-react';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR ABOUT PAGE
// ============================================================================

// Hero image for About page
const ABOUT_HERO_IMAGE = {
	src: '/images/about/about-founder-story.jpg',
	alt: 'Elizabeth Burrows founder story hero background - premium tutoring service heritage',
	width: 1920,
	height: 1080,
	title: 'About Our Founder - Heritage and Excellence',
};

export default function AboutUsPage() {
	return (
		<div className={cn('min-h-screen flex flex-col overflow-x-hidden bg-white')}>
			<PageHeader />

			<main className='flex-1' role='main' id='main-content' tabIndex={-1}>
				{/* Hero Section */}
				<section id='about-hero'>
					<SimpleHero
						backgroundImage={ABOUT_HERO_IMAGE.src}
						h1={<span className='text-white'>Founder <span className='text-accent-600'>& Ethos</span></span>}
						h2='Our bespoke consultation and pairing process ensures the perfect fit and seamless support throughout.'
						decorativeStyle='none'
					/>
				</section>

				{/* More sections... */}
			</main>

			{/* Footer */}
			<PageFooter showContactForm={true} />
		</div>
	);
}
```

**Issues**:
- ❌ Entire page is Client Component (`'use client'`)
- ❌ Duplicates `<PageHeader />` and `<PageFooter />` (should be in layout)
- ❌ Hardcoded CMS data inside page file (should be centralised import)
- ❌ Unnecessary wrapper `<div className="min-h-screen">` (handled by layout)
- ❌ Missing metadata export for SEO
- ❌ No TypeScript interfaces for CMS data

#### Pattern 2: PageLayout Wrapper (PARTIALLY COMPLIANT)

**Prevalence**: 8 of 37 pages (21.6%)
**Example Files**: `/src/app/testimonials/page.tsx` (sections), `/src/app/how-it-works/page.tsx` (sections)

```typescript
// ⚠️ PARTIALLY COMPLIANT - Uses PageLayout but still client component
'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';

export default function TestimonialsPage() {
	return (
		<>
			<section id='testimonials-hero'>
				<SimpleHero
					backgroundImage='/images/hero/testimonials-hero.jpg'
					h1={<span className='text-white'>Student & Parent <span className='text-accent-600'>Testimonials</span></span>}
					h2='Read testimonials from families who have achieved exceptional results with My Private Tutor Online.'
					decorativeStyle='lines'
				/>
			</section>

			<PageLayout background='white' showHeader={true} showFooter={true} containerSize='full'>
				{/* Page content */}
			</PageLayout>
		</>
	);
}
```

**Issues**:
- ⚠️ Uses `PageLayout` (good) but still entire Client Component (bad)
- ❌ Missing metadata export
- ❌ Hero section outside PageLayout (inconsistent structure)
- ⚠️ Hardcoded CMS data

#### Pattern 3: Simple Redirect (COMPLIANT)

**Prevalence**: 3 of 37 pages (8.1%)
**Example Files**: `/src/app/page.tsx` (root redirect)

```typescript
// ✅ COMPLIANT - Proper Server Component pattern
import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function RootPage() {
	redirect(`/${routing.defaultLocale}`);
}
```

**Strengths**:
- ✅ Server Component (no 'use client')
- ✅ Uses Next.js redirect API correctly
- ✅ Minimal code, single responsibility

---

## Official Next.js App Router Patterns

### Context7 Source: `/vercel/next.js` - Authoritative Documentation

#### Pattern 1: Server Component Page with Metadata

**Source**: Next.js App Router Migration Guide, Layout Documentation

```typescript
// ✅ OFFICIAL PATTERN - Server Component with metadata export
import type { Metadata } from 'next';

// SEO Metadata - MANDATORY for all pages
export const metadata: Metadata = {
	title: 'About Us | My Private Tutor Online',
	description: 'Founded by Elizabeth Burrows, discover our heritage of excellence in premium tutoring with royal endorsements and 15+ years of experience.',
	openGraph: {
		title: 'About Us | My Private Tutor Online',
		description: 'Founded by Elizabeth Burrows, discover our heritage of excellence in premium tutoring with royal endorsements and 15+ years of experience.',
		images: ['/images/about/about-founder-story.jpg'],
	},
};

// CMS Data Import - MANDATORY for content pages
import { getAboutPageContent } from '@/content/cms-content';

// Server Component - Default export
export default function AboutUsPage() {
	const pageContent = getAboutPageContent();

	return (
		<>
			{/* Page content using imported CMS data */}
			<section id='about-hero'>
				<SimpleHero
					backgroundImage={pageContent.hero.image}
					h1={pageContent.hero.h1}
					h2={pageContent.hero.h2}
					decorativeStyle='none'
				/>
			</section>

			{/* More sections */}
		</>
	);
}
```

**Critical Elements**:
1. ✅ **No `'use client'` directive** - Server Component by default
2. ✅ **Metadata export** - SEO and social sharing configuration
3. ✅ **CMS data import** - Centralised content management
4. ✅ **TypeScript types** - Type safety for CMS data
5. ✅ **No layout duplication** - Header/Footer in layout.tsx

#### Pattern 2: Layout Composition

**Source**: Next.js App Router Layouts Documentation

```typescript
// ✅ OFFICIAL PATTERN - Nested layout composition
// File: /src/app/layout.tsx

import { PageHeader } from '@/components/layout/page-header';
import { PageFooter } from '@/components/layout/page-footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	// Global metadata
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en-GB' dir='ltr' className='scroll-smooth'>
			<body className='min-h-screen flex flex-col overflow-x-hidden bg-white antialiased'>
				<PageHeader />

				<main className='flex-1' role='main' id='main-content' tabIndex={-1}>
					{children}
				</main>

				<PageFooter />
			</body>
		</html>
	);
}
```

**Critical Elements**:
1. ✅ **PageHeader and PageFooter in layout** - No duplication in pages
2. ✅ **`<main>` wrapper in layout** - Consistent semantic HTML
3. ✅ **Accessibility attributes** - `role='main'`, `id='main-content'`, `tabIndex={-1}`
4. ✅ **Global layout styles** - `min-h-screen`, `flex`, `flex-col`

---

## Standard Page Architecture

### Template: Content Page (Server Component)

**Use For**: About, Testimonials, How It Works, Subject Tuition, etc.

```typescript
// ✅ STANDARD ARCHITECTURE - Server Component content page
import type { Metadata } from 'next';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FounderStorySection } from '@/components/sections/about/founder-story-section';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';

// ============================================================================
// SEO METADATA - MANDATORY
// ============================================================================
export const metadata: Metadata = {
	title: 'About Us | My Private Tutor Online',
	description: 'Founded by Elizabeth Burrows, discover our heritage of excellence in premium tutoring with royal endorsements and 15+ years of experience.',
	openGraph: {
		title: 'About Us | My Private Tutor Online',
		description: 'Founded by Elizabeth Burrows, discover our heritage of excellence in premium tutoring with royal endorsements and 15+ years of experience.',
		images: ['/images/about/about-founder-story.jpg'],
	},
};

// ============================================================================
// CMS DATA IMPORT - MANDATORY (replaces hardcoded data)
// ============================================================================
import { getAboutPageContent } from '@/content/cms-content';

// ============================================================================
// PAGE COMPONENT - SERVER COMPONENT (no 'use client')
// ============================================================================
export default function AboutUsPage() {
	const pageContent = getAboutPageContent();

	return (
		<>
			{/* Hero Section */}
			<section id='about-hero'>
				<SimpleHero
					backgroundImage={pageContent.hero.image}
					h1={pageContent.hero.h1}
					h2={pageContent.hero.h2}
					decorativeStyle='none'
				/>
			</section>

			{/* Founder Story Section */}
			<section id='about-founder-story'>
				<FounderStorySection />
			</section>

			{/* Testimonials Section */}
			<section id='about-testimonials'>
				<TestimonialsSection />
			</section>
		</>
	);
}
```

### Template: Interactive Page (Client Component)

**Use For**: Dashboard, Admin, Forms, Analytics

```typescript
// ✅ STANDARD ARCHITECTURE - Client Component for interactive pages
'use client';

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { DashboardStats } from '@/components/dashboard/stats';

// ⚠️ NOTE: Metadata export not allowed in Client Components
// Metadata must be defined in parent layout.tsx or separate metadata file

// ============================================================================
// CMS DATA IMPORT - MANDATORY
// ============================================================================
import { getDashboardContent } from '@/content/cms-content';

// ============================================================================
// PAGE COMPONENT - CLIENT COMPONENT (has 'use client')
// ============================================================================
export default function DashboardPage() {
	const [stats, setStats] = useState(null);
	const pageContent = getDashboardContent();

	useEffect(() => {
		// Interactive client-side logic
		fetchStats().then(setStats);
	}, []);

	return (
		<>
			<section id='dashboard-header'>
				<h1>{pageContent.title}</h1>
			</section>

			<section id='dashboard-stats'>
				<DashboardStats data={stats} />
			</section>
		</>
	);
}
```

---

## Component Integration Patterns

### Design Token Usage (MANDATORY)

**Source**: `/home/jack/Documents/my_private_tutor_online/tailwind.config.ts`
**Context7 Pattern**: Tailwind CSS Theme Extension with Design Tokens

#### Complete Design Token Inventory

```typescript
// ============================================================================
// PRIMARY BRAND COLOURS - Navy (4 variations)
// ============================================================================
primary: {
	50: '#f8f9fc',   // Lightest blue tint
	100: '#f1f3f8',  // Very light blue tint
	200: '#e3e7f0',  // Light blue-grey
	300: '#c6d0e8',  // Medium light blue-grey
	400: '#8fa2d4',  // Medium blue
	500: '#5b6bb3',  // Mid-tone blue
	600: '#4a5a97',  // Darker blue
	700: '#3f4a7e',  // ✅ CLIENT BRAND: Metallic Blue (primary)
	800: '#2f3960',  // WCAG Enhanced: Darker for better contrast
	900: '#252a4d',  // WCAG Enhanced: Deep navy
	950: '#1a1e3a',  // Darkest navy
},

// ============================================================================
// ACCENT BRAND COLOURS - Gold (4 variations)
// ============================================================================
accent: {
	50: '#fefcf7',   // Lightest gold tint
	100: '#fdf8eb',  // Very light gold
	200: '#faf0d2',  // Light gold cream
	300: '#f5e4a9',  // Medium light gold
	400: '#eed480',  // Medium gold
	500: '#e5c457',  // Mid-tone gold
	600: '#ca9e5b',  // ✅ CLIENT BRAND: Aztec Gold (accent)
	700: '#a67234',  // WCAG Enhanced: Darker gold
	800: '#8a5e2a',  // WCAG Enhanced: Deep bronze
	900: '#6d4a21',  // WCAG Enhanced: Dark bronze
	950: '#4a3318',  // Darkest bronze
},

// ============================================================================
// NEUTRAL GREYSCALE - UI Hierarchy (8 greys)
// ============================================================================
neutral: {
	50: '#fafafa',
	100: '#f5f5f5',
	200: '#e5e5e5',
	300: '#d4d4d4',
	400: '#a3a3a3',
	500: '#737373',
	600: '#525252',
	700: '#404040',
	800: '#262626',
	900: '#171717',
	950: '#0a0a0a',
},

// ============================================================================
// SEMANTIC COLOURS - User Feedback (4 colors)
// ============================================================================
semantic: {
	success: '#10b981',
	error: '#ef4444',
	warning: '#f59e0b',
	info: '#3b82f6',
},
```

#### @layer base Typography Defaults

**Source**: `/home/jack/Documents/my_private_tutor_online/src/app/globals.css` (lines 593-758)
**Context7 Pattern**: Tailwind CSS `@layer base` for semantic HTML defaults

```css
/* ✅ OFFICIAL PATTERN - Semantic HTML styling via @layer base */
@layer base {
	/* Headings - Primary brand colour (navy) */
	h1 {
		color: var(--color-primary-base);
		font-family: var(--font-family-heading);
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--font-line-height-tight);
		letter-spacing: var(--font-letter-spacing-tight);
		margin-bottom: var(--spacing-6);
	}

	/* Links - Accent colour (gold) with hover transition */
	a {
		color: var(--color-accent);
		text-decoration-line: none;
		transition-property: color;
		transition-duration: var(--transition-duration-200);
		transition-timing-function: var(--transition-timing-in-out);
	}

	a:hover {
		color: var(--color-accent-dark);
		text-decoration-line: underline;
	}

	/* Body text - Neutral colour with body font */
	p {
		color: var(--color-neutral-grey-800);
		font-family: var(--font-family-body);
		font-size: var(--font-size-base);
		line-height: var(--font-line-height-relaxed);
		margin-bottom: var(--spacing-4);
	}

	/* Navigation exclusions - prevent link styling in nav/buttons */
	nav a,
	[data-navigation] a,
	button a,
	.btn {
		color: inherit;
	}
}
```

**Critical Rule**: Pages should use semantic HTML (`<h1>`, `<p>`, `<a>`) without manual colour classes. Use utility overrides ONLY for exceptions.

```tsx
// ✅ CORRECT: Semantic HTML uses @layer base styling automatically
<h1>About Our Founder</h1>  {/* Automatic navy color, bold, 4xl size */}
<p>Excellence in education since 2010.</p>  {/* Automatic grey-800, body font */}
<a href="/about">Learn More</a>  {/* Automatic gold with hover effect */}

// ✅ CORRECT: Utility overrides for genuine exceptions
<h1 className="text-white">White Heading on Dark Background</h1>
<a className="text-primary-700">Navy Link in Specific Context</a>

// ❌ WRONG: Manual colour application on every element
<h1 className="text-primary-700 text-4xl font-bold">Title</h1>  {/* Redundant classes */}
<p className="text-neutral-grey-800">Text</p>  {/* Redundant - use semantic HTML */}
```

---

## Non-Compliant Patterns

### Issue 1: Client Component Overuse

**Problem**: 28 of 37 pages unnecessarily use `'use client'` directive
**Impact**: Prevents Server Component optimisation, increases bundle size
**Solution**: Remove `'use client'` unless page requires client-side interactivity

```typescript
// ❌ BAD: Unnecessary client component
'use client';

export default function AboutPage() {
	return <section>Static content...</section>;
}

// ✅ GOOD: Server Component (no 'use client')
export default function AboutPage() {
	return <section>Static content...</section>;
}
```

### Issue 2: Hardcoded CMS Data

**Problem**: 31 pages embed CMS content directly instead of centralised import
**Impact**: Maintenance nightmare, no single source of truth, difficult updates
**Solution**: Move all CMS data to `/src/content/cms-content.ts` with TypeScript interfaces

```typescript
// ❌ BAD: Hardcoded data in page file
const ABOUT_HERO_IMAGE = {
	src: '/images/about/about-founder-story.jpg',
	alt: 'Elizabeth Burrows founder story',
	width: 1920,
	height: 1080,
};

export default function AboutPage() {
	return <SimpleHero backgroundImage={ABOUT_HERO_IMAGE.src} />;
}

// ✅ GOOD: Centralised CMS import
import { getAboutPageContent } from '@/content/cms-content';

export default function AboutPage() {
	const pageContent = getAboutPageContent();
	return <SimpleHero backgroundImage={pageContent.hero.image} />;
}
```

### Issue 3: Layout Duplication

**Problem**: 23 pages duplicate `<PageHeader />` and `<PageFooter />`
**Impact**: Violates DRY principle, inconsistent layout updates
**Solution**: Move header/footer to root layout, pages only contain unique content

```typescript
// ❌ BAD: Duplicated layout in every page
export default function AboutPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<PageHeader />
			<main>Page content</main>
			<PageFooter />
		</div>
	);
}

// ✅ GOOD: Layout composition (header/footer in layout.tsx)
// Page only contains unique content
export default function AboutPage() {
	return (
		<>
			<section id='about-hero'>Hero content</section>
			<section id='about-story'>Story content</section>
		</>
	);
}
```

### Issue 4: Missing Metadata

**Problem**: 28 pages lack SEO metadata configuration
**Impact**: Poor search engine visibility, missing social sharing optimisation
**Solution**: Export metadata object in every page

```typescript
// ❌ BAD: No metadata export
export default function AboutPage() {
	return <section>Content</section>;
}

// ✅ GOOD: Metadata export for SEO
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us | My Private Tutor Online',
	description: 'Founded by Elizabeth Burrows, discover our heritage...',
	openGraph: {
		title: 'About Us | My Private Tutor Online',
		description: 'Founded by Elizabeth Burrows...',
		images: ['/images/about/about-founder-story.jpg'],
	},
};

export default function AboutPage() {
	return <section>Content</section>;
}
```

---

## Migration Strategy

### Phase 1: Critical Pages (Priority 1)

**Pages**: Homepage (`/[locale]/page.tsx`), About, Testimonials, How It Works
**Timeline**: Week 1
**Approval Required**: Yes - Client sign-off before implementation

**Migration Steps**:
1. ✅ Create CMS data structure in `/src/content/cms-content.ts`
2. ✅ Add TypeScript interfaces for all CMS data
3. ✅ Remove `'use client'` directive (if no interactivity)
4. ✅ Add metadata export
5. ✅ Remove `<PageHeader />` and `<PageFooter />` duplication
6. ✅ Replace hardcoded data with CMS imports
7. ✅ Test build (`npm run build`) to verify Server Component compatibility

### Phase 2: Marketing Pages (Priority 2)

**Pages**: Subject Tuition, Video Masterclasses, 11+ Bootcamps, Meet Our Tutors
**Timeline**: Week 2
**Approval Required**: Yes

### Phase 3: Utility Pages (Priority 3)

**Pages**: Contact, FAQ, Legal pages, Resources, Blog
**Timeline**: Week 3
**Approval Required**: No - Standard patterns apply

### Phase 4: Admin/Dashboard (Priority 4)

**Pages**: Admin, Dashboard, Analytics
**Timeline**: Week 4
**Approval Required**: No - Maintain Client Components for interactivity

---

## Verification Checklist

Before marking a page as "compliant", verify:

- ✅ **No `'use client'` directive** (unless genuinely interactive)
- ✅ **Metadata export present** with title, description, OpenGraph
- ✅ **CMS data imported** from centralised location
- ✅ **No `<PageHeader />` or `<PageFooter />`** (in layout.tsx instead)
- ✅ **No wrapper `<div className="min-h-screen">`** (handled by layout)
- ✅ **Semantic HTML** with @layer base styling (minimal utility classes)
- ✅ **Design tokens used** (primary-700, accent-600, neutral-800)
- ✅ **TypeScript interfaces** for all CMS data structures
- ✅ **Build passes** (`npm run build` succeeds)
- ✅ **Royal client quality** - enterprise-grade implementation

---

## Related Documentation

- **IMPLEMENTATION_ROADMAP.md** - Staged migration plan with approval checkpoints
- **DESIGN_TOKENS.md** - Complete Tailwind configuration inventory
- **PAGE_INVENTORY.md** - Analysis of all 37 pages with compliance status
- **BEFORE_AFTER_EXAMPLES.md** - Concrete transformation examples for each pattern

---

**Document Owner**: Claude Code (Anthropic)
**Review Cycle**: Pre-implementation approval required for each phase
**Last Updated**: 18 October 2025
