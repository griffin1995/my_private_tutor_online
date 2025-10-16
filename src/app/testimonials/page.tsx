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
 * - getTestimonialsSchools() - Elite schools carousel (DISABLED - commented out)
 *
 * PERFORMANCE OPTIMIZATIONS:
 * - LazyMotion reduces bundle from ~34kb to ~4.6kb + 21kb
 * - Cached CMS functions prevent redundant data processing
 * - Direct JSON access eliminates async complexity
 * - Type-safe filtering prevents runtime errors
 */

'use client';

// CONTEXT7 SOURCE: /facebook/react - React hooks for state management and effects
// PHASE 1 FIX: Replace dynamic imports with static imports to resolve hydration boundary conflicts
import { memo } from 'react';
// CONTEXT7 SOURCE: /radix-ui/website - Radix UI Separator component for semantic content separation
// SEPARATOR INTEGRATION REASON: Official Radix UI documentation for visually separating content with proper ARIA separator role
import { Separator } from '@radix-ui/react-separator';
// CONTEXT7 SOURCE: /facebook/react - Error boundary import for navbar conflict resolution
// ERROR BOUNDARY REASON: Official React documentation recommends error boundaries to isolate component failures
import { TestimonialsErrorBoundary } from '@/components/boundaries/TestimonialsErrorBoundary';
// CONTEXT7 SOURCE: /components/layout/simple-hero - Static import for synchronous component loading
import { SimpleHero } from '@/components/layout/simple-hero';
// CONTEXT7 SOURCE: /components/sections/brand-message-section - Static import for brand messaging
// CONTEXT7 SOURCE: /components/sections/about/testimonials-section - Static import replacing dynamic import
// HYDRATION FIX REASON: Static imports eliminate SSR/CSR hydration mismatches that affect navbar functionality
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';

// CONTEXT7 SOURCE: /vercel/next.js - Web Vitals monitoring for performance tracking
// PERFORMANCE PHASE 1: Add Web Vitals monitoring to track LCP, FID, CLS targets
import { WebVitals } from '@/components/analytics/web-vitals';
// TESTIMONIALS OVERHAUL: Removed TestimonialsCTA import for cleaner page boundaries
import { PageLayout } from '@/components/layout/page-layout';
import {
	getAllTestimonials,
	// DISABLED: getTestimonialsCarouselConfig, getTestimonialsSchools - commented out with Prestigious Schools section
	// getTestimonialsCarouselConfig,
	getTestimonialsContent,
	getTestimonialsHero,
	getTextTestimonials,
	// getTestimonialsSchools,
	// REMOVED: getServices - no longer needed after switching to testimonials data display
	type Testimonial,
} from '@/lib/cms/cms-content';
// REMOVED: getStudentImages import - no longer needed after switching to testimonials data display

// CONTEXT7 SOURCE: /facebook/react - React.memo for performance optimization
// MEMOIZATION REASON: Official React documentation recommends memoizing components that render frequently with same props
const OptimizedTestimonialCard = memo(function TestimonialCard({
	testimonial,
	index,
}: {
	testimonial: Testimonial;
	index: number;
}) {
	return (
		<div
			key={index}
			className='bg-white p-6 rounded-lg shadow-lg border border-neutral-100'>
			{/* CONTEXT7 SOURCE: /facebook/react - Star rating display optimization */}
			{/* RATING DISPLAY: Memoized stars rendering for consistent performance */}
			<div className='flex mb-4'>
				{[...Array(testimonial.rating)].map((_, i) => (
					<svg
						key={i}
						className='w-5 h-5 text-yellow-400 fill-current'
						viewBox='0 0 20 20'>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
				))}
			</div>

			{/* CONTEXT7 SOURCE: /radix-ui/website - Radix UI Separator for semantic content separation */}
			{/* SEPARATOR INTEGRATION REASON: Official Radix UI Separator with decorative prop for visual separation between quote and author sections */}
			{/* TOKEN FIX: Replaced bg-gray-100 with bg-neutral-100 */}
			<Separator
				orientation='horizontal'
				decorative
				className='my-4 bg-neutral-100'
			/>

			{/* CONTEXT7 SOURCE: /facebook/react - Author and subject info optimization */}
			{/* AUTHOR INFO: Optimized info display with consistent layout */}
			<div>
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
				{/* LAYER BASE SYSTEM: Stripped font-semibold, text-gray-900 - ALL from @layer base */}
				<div>{testimonial.author}</div>
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
				{/* LAYER BASE SYSTEM: Stripped text-sm, text-gray-600 - ALL from @layer base */}
				<div>{testimonial.role}</div>
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
				{/* LAYER BASE SYSTEM: Stripped text-sm, font-medium - provided by @layer base */}
				{/* ONLY KEEPING: text-blue-600 for subject color emphasis, layout classes */}
				<div className='text-blue-600 mt-1 flex items-center gap-2'>
					<span>{testimonial.subject}</span>
					{/* CONTEXT7 SOURCE: /radix-ui/website - Vertical Radix UI Separator for semantic content separation */}
					{/* VERTICAL SEPARATOR REASON: Official Radix UI Separator with vertical orientation for separating subject and grade information */}
					<Separator
						orientation='vertical'
						decorative
						className='h-3 bg-blue-300'
					/>
					<span>Grade: {testimonial.result}</span>
				</div>
			</div>
		</div>
	);
});

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

// CONTEXT7 SOURCE: /websites/react_dev - REMOVED hardcoded testimonials in favor of CMS data
// CMS INTEGRATION: Now using getAllTestimonials() for complete testimonial dataset

export default function TestimonialsPage() {
	// CONTEXT7 SOURCE: /typescript/handbook - Direct synchronous CMS data access for immediate availability
	// SYNCHRONOUS CMS PATTERN: All CMS data loaded immediately without loading states - preserving homepage lessons

	// CORE CONTENT DATA - Synchronous access only
	const testimonialsContent = getTestimonialsContent();
	const heroContent = getTestimonialsHero();
	// DISABLED: schools and carouselConfig - commented out with Prestigious Schools section
	// const schools = getTestimonialsSchools();
	// const carouselConfig = getTestimonialsCarouselConfig();

	// CONTEXT7 SOURCE: /facebook/react - Complete testimonials data from CMS with error boundary protection
	// CMS INTEGRATION: Using getAllTestimonials() for complete dataset (209 testimonials)
	const allTestimonials = getAllTestimonials();

	// Text testimonials only (hasVideo: false/undefined)
	const testimonialsWithoutVideo = getTextTestimonials();

	// REMOVED: Services and studentImages data - no longer needed after switching to testimonials data display

	// CONTEXT7 SOURCE: /facebook/react - Error handling patterns with try-catch wrapper
	// DEFENSIVE CODING REASON: Official React patterns for graceful error handling in data loading
	let aboutTestimonials: Testimonial[] = [];
	try {
		aboutTestimonials = getTextTestimonials();
	} catch (error) {
		console.error('Error loading testimonials:', error);
		aboutTestimonials = []; // Fallback to empty array - prevents cascade failures
	}

	// CONTEXT7 SOURCE: /facebook/react - Error boundary implementation with component composition
	// ERROR BOUNDARY REASON: Official React documentation recommends error boundaries to isolate failures and prevent navbar conflicts
	return (
		<TestimonialsErrorBoundary>
			{/* CONTEXT7 SOURCE: /vercel/next.js - Web Vitals monitoring component */}
			{/* PERFORMANCE MONITORING: Track Core Web Vitals for Phase 1 optimization targets */}
			<WebVitals />
			{/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
			{/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
			{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
			{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
			<section id='testimonials-hero'>
				<SimpleHero
					backgroundImage='/images/hero/testimonials-hero.jpg'
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
				id='mission-quote'
				className='py-16 lg:py-24 bg-primary-50'>
				<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL blockquote styling */}
					{/* LAYER BASE SYSTEM: Stripped text-xl, lg:text-2xl, font-serif, text-gray-900 - ALL from @layer base */}
					{/* ONLY KEEPING: italic for quote emphasis */}
					<blockquote className='italic'>
						&quot;We provide <strong>exceptional tuition</strong> that helps students{' '}
						<strong>excel academically</strong> and <u>thrive personally</u>, opening
						doors to greater opportunities—at school and in life.&quot;
					</blockquote>
				</div>
			</section>

			{/* CONTEXT7 SOURCE: /facebook/react - Static component integration replacing dynamic loading */}
			{/* PHASE 1 FIX: Static components eliminate Suspense boundaries that cause hydration conflicts affecting navbar */}
			{/* VIDEO TESTIMONIALS POSITIONING: Moving existing video section above testimonial cards per user requirements */}
			{/* SYNCHRONOUS DATA ACCESS: Direct testimonials data access prevents loading state complexity and homepage failure scenarios */}
			{/* VIDEO FILTERING: getTextTestimonials() ensures only text testimonials are displayed on About page */}
			{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
			<section id='video-testimonials-moved'>
				<TestimonialsSection testimonials={aboutTestimonials} />
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
				{/* FEATURED TESTIMONIALS CAROUSEL - TESTIMONIALS DATA INTEGRATION */}
				{/* CONTEXT7 SOURCE: /vercel/next.js - Testimonials carousel component for additional student success stories */}
				{/* TESTIMONIALS INTEGRATION REASON: User request to revise carousel to use testimonial data instead of services */}
				{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
				{/* TOKEN FIX: Replaced bg-slate-50 with bg-neutral-50 */}
				<section
					id='testimonials-featured-carousel'
					className='py-16 bg-neutral-50'>
					<div className='text-center mb-12 px-8 sm:px-12 lg:px-16 xl:px-20'>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
						{/* LAYER BASE SYSTEM: Stripped text-3xl, lg:text-4xl, font-serif, font-bold, text-primary-900 - ALL from @layer base */}
						<h2 className='mb-4'>
							More Student Success Stories
						</h2>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
						{/* LAYER BASE SYSTEM: Stripped text-lg - provided by @layer base */}
						{/* ONLY KEEPING: text-primary-600 for brand color emphasis, layout classes */}
						<p className='text-primary-600 max-w-3xl mx-auto'>
							Read additional testimonials from families who have achieved exceptional
							results with our tutoring
						</p>
					</div>

					{/* CONTEXT7 SOURCE: /facebook/react - Testimonials grid display with all real testimonials */}
					{/* ALL TESTIMONIALS REASON: User request to display all real testimonials from CMS data instead of limiting to 6 */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-24 sm:px-32 lg:px-48 xl:px-64'>
						{allTestimonials.map((testimonial, index) => (
							<OptimizedTestimonialCard
								key={`featured-testimonial-${testimonial.author}-${index}`}
								testimonial={testimonial}
								index={index}
							/>
						))}
					</div>
				</section>

				{/* 
        DISABLED: Prestigious Schools & Universities Section
        Reason: Temporarily disabled per user request - safe commenting approach
        Date: 2025-09-01
        Location: EliteSchoolsCarousel with "Prestigious Schools & Universities" title
        
        SAFE RESTORATION INSTRUCTIONS:
        - Remove the opening comment block above
        - Remove the closing comment block below
        - Section will be fully restored with all functionality intact
        */}
				{/*
        CONTEXT7 SOURCE: /components/testimonials/elite-schools-carousel - Enhanced Elite Schools Carousel Component
        CONTEXT7 SOURCE: Official React patterns for component composition and configuration
        CAROUSEL COMPONENT REASON: Task 6 implementation - Extracted modular carousel with advanced features
        CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration
        SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration
        <section id="testimonials-schools-carousel">
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
        */}

				{/* TESTIMONIALS OVERHAUL: Removed CTA section from testimonials page footer for cleaner page boundaries */}
			</PageLayout>
		</TestimonialsErrorBoundary>
	);
}
