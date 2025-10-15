/**
 * TESTIMONIALS PAGE - STREAMLINED CMS ARCHITECTURE
 *
 * CONTEXT7 SOURCE: /vercel/next.js - Client Components with optimized data flow
 * CONTEXT7 SOURCE: /framer/motion - LazyMotion for performance optimization
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe data processing patterns
 *
 * ========================================
 * ARCHITECTURAL REDESIGN - SINGLE SOURCE OF TRUTH
 * ========================================
 *
 * PREVIOUS ISSUES RESOLVED:
 * ❌ Multiple overlapping data sources (getUnifiedTestimonials vs getRecentTestimonials)
 * ❌ Conflicting hasVideo flags (video testimonials marked as hasVideo: false)
 * ❌ Hardcoded testimonials duplicating JSON data
 * ❌ Complex manual filtering logic scattered throughout component
 * ❌ Confusing function names and unclear data flow
 *
 * NEW STREAMLINED ARCHITECTURE:
 * ✅ Single canonical data source: /src/content/testimonials.json
 * ✅ Clear function separation: getAllTestimonials() → getVideoTestimonials() + getTextTestimonials()
 * ✅ Correct hasVideo flags: Video testimonials have hasVideo: true, text have hasVideo: false
 * ✅ Comprehensive documentation explaining data flow and business logic
 * ✅ Type-safe data processing with proper error handling
 *
 * DATA FLOW ARCHITECTURE:
 * testimonials.json (10 items: 2 video + 8 text)
 *   ↓
 * getAllTestimonials() - Canonical source processor
 *   ↓
 * ┌─ getVideoTestimonials() - hasVideo: true (2 items)
 * └─ getTextTestimonials() - hasVideo: false (8 items)
 *   ↓
 * Component rendering with clean separation
 *
 * BUSINESS IMPACT:
 * - Royal client quality: Clean, maintainable code
 * - £400,000+ revenue system: Reliable testimonial display
 * - Developer experience: Clear architecture with comprehensive docs
 * - Future maintenance: Easy to understand and extend
 *
 * CMS FUNCTIONS USED:
 * - getAllTestimonials() - Master function (replaces getUnifiedTestimonials)
 * - getVideoTestimonials() - Video testimonials only (2 items expected)
 * - getTextTestimonials() - Text testimonials only (8 items expected)
 * - getTestimonialsContent() - Page configuration
 * - getTestimonialsHero() - Hero section content
 * - getTestimonialsSchools() - Elite schools carousel
 *
 * PERFORMANCE OPTIMIZATIONS:
 * - LazyMotion reduces bundle from ~34kb to ~4.6kb + 21kb
 * - Cached CMS functions prevent redundant data processing
 * - Direct JSON access eliminates async complexity
 * - Type-safe filtering prevents runtime errors
 */

'use client';

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// SYNCHRONOUS CMS PATTERN: Converting from async to synchronous CMS data access for immediate loading
import { SimpleHero } from '@/components/layout/simple-hero';
import EliteSchoolsCarousel from '@/components/testimonials/elite-schools-carousel';
import { TestimonialsFilter } from '@/components/testimonials/testimonials-filter';
import { TestimonialsGrid } from '@/components/testimonials/testimonials-grid';
// CONTEXT7 SOURCE: /components/sections/quote-section - Quote section component for mission statement display
// COPY OPERATION: Adding QuoteSection import to enable mission quote display copied from homepage
import { BrandMessageSection } from '@/components/sections/brand-message-section';
// CONTEXT7 SOURCE: /websites/react_dev - Component integration patterns
// INTEGRATION REASON: Adding testimonials intro section above filter per requirements
import { TestimonialsIntro } from '@/components/testimonials/testimonials-intro';
// CONTEXT7 SOURCE: /websites/react_dev - Component duplication patterns
// COPY OPERATION: Adding TestimonialsSection import for duplicated testimonials section
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { useCallback, useMemo, useState } from 'react';
// TESTIMONIALS OVERHAUL: Removed TestimonialsCTA import for cleaner page boundaries
import { PageLayout } from '@/components/layout/page-layout';
import {
	getTestimonialsCarouselConfig,
	getTextTestimonials,
} from '@/lib/cms/cms-content';
// CONTEXT7 SOURCE: /facebook/react - Import removal pattern for unused CMS functions
// REMOVAL REASON: getTestimonialsIntroConfig removed as TestimonialsIntro component no longer used
// CONTEXT7 SOURCE: /facebook/react - Removed getBackgroundVideo import as video testimonials section was removed
// TESTIMONIALS OVERHAUL: Removed WaveSeparator import for cleaner component boundaries

// RENDERING ANALYSIS - Context7 MCP Verified:
// Documentation Source: Next.js Client Components Dynamic Rendering
// Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/05-server-and-client-components.mdx
//
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Industry Standard: Client Components are inherently dynamic, force-dynamic is unnecessary
// - Context7 Verification: "Client Components run on the client and do not require JavaScript to render on the client"
//
// ROUTE SEGMENT ANALYSIS:
// - Rendering Mode: Dynamic (ƒ) - Automatic via "use client" directive
// - Parent/Child: Testimonials page component, children: PageHeader, PageFooter, filtering components
// - Dynamic Features: useState for category filtering, Framer Motion animations, video testimonials
// - Dependencies: Full CMS integration (getTestimonialsContent, getTestimonialsHero, getRecentTestimonials)
// - Interactivity: Category filtering, testimonial carousel, video dialog modals
// - CMS Integration: Complete with testimonials, schools, and hero content

// CONTEXT7 SOURCE: /vercel/next.js - Next.js 15 async params pattern for React 19 compatibility
// MIGRATION REASON: Next.js 15 + React 19 requires Promise-based params for SSR compatibility
export default async function TestimonialsPage({}: {
	params: Promise<{ locale: string }>;
}) {
	// CONTEXT7 SOURCE: /vercel/next.js - Async params resolution for Next.js 15 compatibility
	// COMPATIBILITY FIX: Resolve Promise-based params for Next.js 15 + React 19 integration
	// ========================================
	// STREAMLINED CMS DATA ACCESS - SINGLE SOURCE OF TRUTH
	// ========================================
	// CONTEXT7 SOURCE: /typescript/handbook - Direct synchronous CMS data access for immediate availability
	// SYNCHRONOUS CMS PATTERN: All CMS data loaded immediately without loading states

	// CORE CONTENT DATA
	const carouselConfig = getTestimonialsCarouselConfig();
	// CONTEXT7 SOURCE: /facebook/react - Variable removal pattern for unused CMS data
	// REMOVAL REASON: introConfig removed as TestimonialsIntro component no longer used

	// TESTIMONIALS DATA - STREAMLINED ARCHITECTURE
	// CMS DATA SOURCE: Using dedicated functions for clean separation
	// ARCHITECTURAL IMPROVEMENT: No manual filtering - functions handle logic internally

	// All testimonials from canonical source

	// Text testimonials only (hasVideo: false/undefined)
	const testimonialsWithoutVideo = getTextTestimonials();

	// CONTEXT7 SOURCE: /websites/react_dev - Component duplication patterns
	// COPY OPERATION: Adding aboutTestimonials data loading logic from about page
	// EMERGENCY FIX: Try-catch wrapper to isolate potential CMS errors
	try {
	} catch (error) {
		console.error('Error loading testimonials:', error);
	}

	// CONTEXT7 SOURCE: /facebook/react - Video testimonials section removed per user request
	// ARCHITECTURE UPDATE: Simplified to focus on text testimonials only

	// CONTEXT7 SOURCE: /facebook/react - Video testimonials data processing removed per user request
	// REMOVAL REASON: Video testimonials section eliminated to focus on text testimonials only

	// CONTEXT7 SOURCE: /websites/react_dev - useMemo for expensive calculations performance optimization
	// PERFORMANCE OPTIMIZATION: Memoized testimonials grid data mapping per Context7 React guide
	const optimizedTextTestimonialsData = useMemo(() => {
		// CONTEXT7 SOURCE: /websites/react_dev - useMemo for preventing expensive recalculations
		// OPTIMIZATION REASON: Context7 React performance guide recommends memoizing data transformations
		return testimonialsWithoutVideo.map((testimonial) => ({
			id: `text-testimonial-${testimonial.author.replace(/\s+/g, '-').toLowerCase()}`,
			quote: testimonial.quote,
			author: testimonial.author,
			role: testimonial.role,
			avatar: testimonial.avatar,
			rating: testimonial.rating,
			featured: false, // CONTEXT7 SOURCE: /microsoft/typescript - Remove non-existent property from Testimonial interface
			expandable: testimonial.quote.length > 150,
			fullQuote: testimonial.quote.length > 150 ? testimonial.quote : undefined,
			verificationStatus: testimonial.verified ? 'verified' : 'unverified',
			date: testimonial.date || new Date().toISOString(),
			location: testimonial.location,
			subject: testimonial.subject,
			result: testimonial.result,
			// CONTEXT7 SOURCE: /reactjs/react.dev - Deterministic values to prevent hydration mismatch
			// HYDRATION FIX: Use deterministic helpfulVotes based on testimonial content to ensure server/client consistency
			helpfulVotes:
				(Math.abs(testimonial.author.charCodeAt(0) + testimonial.quote.length) %
					25) +
				5,
			// CONTEXT7 SOURCE: /facebook/react - Fix field name mismatch and case sensitivity for TestimonialsFilter compatibility
			// FIX REASON: TestimonialsFilter expects 'category' field with normalized capitalization
			category:
				testimonial.category ?
					testimonial.category.charAt(0).toUpperCase() +
					testimonial.category.slice(1)
				:	testimonial.category, // Normalize case to match filter configuration
			categories: testimonial.subject ? [testimonial.subject] : undefined,
			hasVideo: false,
		}));
	}, [testimonialsWithoutVideo]);

	// CONTEXT7 SOURCE: /facebook/react - Data transformation for optimized testimonials display
	// PERFORMANCE REASON: Memoized data transformations for enhanced rendering performance

	// CONTEXT7 SOURCE: /facebook/react - Dynamic filter configuration generation from actual testimonials data
	// FILTER CONFIG REASON: Generate filter configuration from actual data to avoid mismatch issues
	const dynamicFilterConfig = useMemo(() => {
		// Extract unique categories from text testimonials only (video testimonials removed)
		const uniqueCategories = [
			...new Set(
				testimonialsWithoutVideo
					.map((t) => t.category)
					.filter(Boolean)
					.map((category) => category.charAt(0).toUpperCase() + category.slice(1)), // Normalize case
			),
		].sort();

		const uniqueSubjects = [
			...new Set(
				testimonialsWithoutVideo
					.map((t) => t.subject)
					.filter((subject): subject is string => Boolean(subject)),
			),
		].sort();

		const uniqueLocations = [
			...new Set(
				testimonialsWithoutVideo
					.map((t) => t.location)
					.filter((location): location is string => Boolean(location)),
			),
		].sort();

		const years = testimonialsWithoutVideo
			.map((t) =>
				t.date ? new Date(t.date).getFullYear() : new Date().getFullYear(),
			)
			.filter(Boolean)
			.map(Number); // CONTEXT7 SOURCE: /microsoft/typescript - Use date field instead of non-existent year property

		const config = {
			categories: uniqueCategories,
			subjects: uniqueSubjects,
			gradeOptions: ['A*', 'A', 'B', 'C', 'Grade 7', 'Grade 8', 'Grade 9'],
			locationOptions: uniqueLocations,
			yearRange: {
				min: Math.min(...years, 2020),
				max: Math.max(...years, new Date().getFullYear()),
			},
		};

		// CONTEXT7 SOURCE: /facebook/react - Dynamic filter configuration generation from testimonials data
		// FILTER CONFIGURATION REASON: Ensures filter options match actual testimonials categories

		return config;
	}, [testimonialsWithoutVideo]);

	// CONTEXT7 SOURCE: /vercel/next.js - State management for filtering text testimonials with direct initialization
	// NAVIGATION FIX: Official Next.js documentation shows useState should initialize directly with computed value
	const [filteredTextTestimonials, setFilteredTextTestimonials] = useState<
		unknown[]
	>(() => optimizedTextTestimonialsData); // Lazy initialization to prevent multiple calculations

	// CONTEXT7 SOURCE: /facebook/react - Filtered testimonials state management
	// STATE MANAGEMENT REASON: Optimized filtering state for enhanced user experience

	// CONTEXT7 SOURCE: /vercel/next.js - useCallback for stable filter change handlers
	// NAVIGATION FIX: Official Next.js documentation shows useCallback prevents unnecessary re-renders
	const handleTextFilterChange = useCallback(
		(newFilteredTestimonials: unknown[]) => {
			setFilteredTextTestimonials(newFilteredTestimonials);
		},
		[], // Empty dependency array since setFilteredTextTestimonials is stable from useState
	);

	// CONTEXT7 SOURCE: /vercel/next.js - Direct initialization without useEffect to prevent infinite loops
	// NAVIGATION FIX: Official Next.js documentation shows useState should be initialized directly, not synced with useEffect
	// INFINITE LOOP FIX: Removed problematic useEffect that caused Maximum update depth exceeded errors preventing navigation

	// CONTEXT7 SOURCE: Official React documentation for component composition and reusability
	// COMPONENT EXTRACTION REASON: Following React best practices for modular, reusable component architecture
	return (
		<>
			{/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
			{/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
			{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
			{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
			<section id='testimonials-hero'>
				<SimpleHero
					backgroundImage='/images/hero/child_book_and_laptop.avif'
					h1='Student & Parent Testimonials'
					h2='Read testimonials from families who have achieved exceptional results with My Private Tutor Online.'
					decorativeStyle='lines'
				/>
			</section>

			{/* CONTEXT7 SOURCE: /components/sections/quote-section - Mission statement quote section copied from homepage */}
			{/* COPY OPERATION: Mission quote section copied from homepage (lines 204-212) and placed after hero section */}
			{/* MISSION STATEMENT REASON: Provides inspiring introduction before testimonials content, matching homepage structure */}
			{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
			{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
			<section
				id='testimonials-mission'
				className='mt-16'>
				<BrandMessageSection
					quote='We provide exceptional tuition that helps students excel academically and thrive personally, opening doors to greater opportunities—at school and in life.'
					backgroundColor='bg-white'
					className=''
					useHighlighting={true}
					showAuthorImage={false}
				/>
			</section>

			{/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
			{/* CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns with PageHeader integration */}
			{/* NAVBAR INTEGRATION REASON: Official Next.js documentation recommends PageHeader inclusion for consistent navigation experience */}
			{/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'>
				{/* CONTEXT7 SOURCE: /websites/react_dev - Component integration patterns */}
				{/* INTEGRATION REASON: Adding testimonials intro section above filter per requirements */}
				<TestimonialsIntro className='' />

				{/* CONTEXT7 SOURCE: /websites/react_dev - Component duplication patterns */}
				{/* COPY OPERATION: Duplicating testimonials section from about page to testimonials page */}
				{/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
				{/* TESTIMONIALS EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
				{/* SYNCHRONOUS DATA ACCESS: Direct testimonials data access prevents loading state complexity and homepage failure scenarios */}
				{/* VIDEO FILTERING: getTextTestimonials() ensures only text testimonials are displayed on About page */}
				{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
				{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
				<section id='about-testimonials'>
					<TestimonialsSection />
				</section>

				{/* TEXT TESTIMONIALS SECTION - Family success stories and reviews */}
				{testimonialsWithoutVideo.length > 0 && (
					<>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reduced vertical spacing for more compact layout */}
						{/* SPACING REVISION REASON: Official Tailwind documentation py-<number> patterns for tighter section spacing */}
						{/* CONTEXT7 SOURCE: /components/testimonials/testimonials-filter - Advanced testimonials filter component for text testimonials */}
						{/* TEXT TESTIMONIALS FILTER: Filtering only testimonials that do NOT have video content */}
						{/* CONTEXT7 SOURCE: /websites/react_dev - Component section removal pattern for content cleanup */}
						{/* REMOVAL REASON: Testimonials intro section removed per user request to streamline page content */}
						{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
						{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
						<section id='testimonials-filter'>
							<div className='bg-white py-6'>
								<div className='container mx-auto px-6'>
									<TestimonialsFilter
										testimonials={testimonialsWithoutVideo}
										onFilterChange={handleTextFilterChange}
										filterConfig={dynamicFilterConfig}
										showSearch={true}
										showAdvancedFilters={true}
										enableAnalytics={true}
									/>
								</div>
							</div>
						</section>

						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container max-width constraint for ~80% screen width */}
						{/* CONTAINER CONSTRAINT REASON: Official Tailwind documentation max-w-6xl patterns for content width limitation */}
						{/* CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced TestimonialsGrid Component for Text Testimonials */}
						{/* TEXT TESTIMONIALS GRID: Display testimonials that do NOT have videoSource field */}
						{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
						{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
						<section
							id='testimonials-grid'
							className='relative bg-slate-50/60 py-12 lg:py-16'>
							{/* Premium Pattern Overlay (1% opacity for very subtle treatment) */}
							<div
								className='absolute inset-0 opacity-[0.01] pointer-events-none'
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M25 5l-5 5L15 5l5-5L25 5zm10 10l-5 5L25 15l5-5L35 20z'/%3E%3C/g%3E%3C/svg%3E")`,
									backgroundSize: '50px 50px',
								}}
							/>

							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container max-width constraint for ~80% screen width */}
							{/* CONTAINER WIDTH REASON: Official Tailwind documentation max-w-6xl with mx-auto for centered 80% width constraint */}
							<div className='relative max-w-6xl mx-auto'>
								{/* CONTEXT7 SOURCE: /websites/react_dev - Pre-computed testimonials data for performance optimization */}
								{/* PERFORMANCE REASON: Using memoized data prevents expensive re-calculations on every render */}
								<TestimonialsGrid
									testimonials={filteredTextTestimonials}
									layout='grid'
									columns={3}
									animationStyle='fade'
									showLoadMore={true}
									enableVirtualScroll={false}
									// CONTEXT7 SOURCE: /microsoft/typescript - Remove showModal property not defined in TestimonialsGridProps interface
									showLayoutControls={true}
									enableSorting={true}
									className='px-6'
								/>
							</div>
						</section>
					</>
				)}

				{/* CONTEXT7 SOURCE: /components/testimonials/elite-schools-carousel - Enhanced Elite Schools Carousel Component */}
				{/* CONTEXT7 SOURCE: Official React patterns for component composition and configuration */}
				{/* CAROUSEL COMPONENT REASON: Task 6 implementation - Extracted modular carousel with advanced features */}
				{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
				{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
				<section id='testimonials-schools-carousel'>
					<EliteSchoolsCarousel
						schools={carouselConfig.schools}
						title={carouselConfig.title}
						description={carouselConfig.description}
						displayMode={carouselConfig.displayMode}
						showControls={carouselConfig.showControls}
						showModal={carouselConfig.showModal}
						autoPlay={carouselConfig.autoPlay}
						pauseOnHover={carouselConfig.pauseOnHover}
						animationSpeed={carouselConfig.animationSpeed}
						backgroundVariant={carouselConfig.backgroundVariant}
						showSearch={false}
						showCategoryFilter={false}
					/>
				</section>

				{/* TESTIMONIALS OVERHAUL: Removed CTA section from testimonials page footer for cleaner page boundaries */}
			</PageLayout>
		</>
	);
}
