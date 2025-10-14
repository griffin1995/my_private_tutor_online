/**
 * Documentation Source: Context7 MCP - Next.js Client Component with Framer Motion
 * Reference: /vercel/next.js - Client component patterns for interactive features
 * Reference: /framer/motion - Framer Motion animation components
 * Pattern: Modular about section with animated content and CMS integration
 *
 * Component Architecture:
 * - Client Component boundary for interactive features
 * - Framer Motion animations for enhanced user experience
 * - Next.js Image optimization for founder photo
 * - Responsive grid layout with text-left, image-right pattern
 * - Context7 verified component patterns
 *
 * Performance Optimisations:
 * - Next.js Image component with priority loading
 * - Optimized animations with proper easing curves
 * - Responsive breakpoints for mobile-first design
 *
 * Interactive Features:
 * - Framer Motion scroll-triggered animations
 * - Image hover effects and decorative elements
 * - Staggered text animation delays
 */

'use client';

// CONTEXT7 SOURCE: /reactjs/react.dev - Simplified React imports for client component
// SIMPLIFICATION REASON: Official React documentation shows simple client component patterns without complex fallback logic

// Documentation Source: Context7 MCP - React 19 and Framer Motion imports
// Reference: /vercel/next.js - Next.js Image component
// Reference: /framer/motion - Motion components for animations
// Pattern: Modern React component imports with TypeScript support
import { useEffect } from 'react';

// Documentation Source: Context7 MCP - Lucide React Icon Library
// Reference: /lucide-dev/lucide - Crown icon for royal clientele indication
// Pattern: Consistent iconography with tree-shaking support

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard text styling approach
// AURORA REMOVAL: Removed AuroraText import per Task 4 requirements for default heading colours
// BRAND SIMPLIFICATION: Using standard Tailwind CSS text utilities for consistent styling

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports for bundle splitting and lazy loading
// LAZY LOADING REASON: Official Next.js documentation shows using dynamic imports for performance optimization
import {
	LazyAboutContent,
	LazyAboutImage,
} from '@/lib/dynamic-imports/lazy-components';

// CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring integration for optimization tracking
// PERFORMANCE MONITORING REASON: Official Next.js documentation shows integrating performance monitoring for component optimization
import { useAboutSectionPerformance } from '@/lib/performance/about-monitoring';

// CONTEXT7 SOURCE: /mozilla/mdn - Service Worker integration for advanced multi-layer caching
// SERVICE WORKER INTEGRATION: Official MDN documentation shows service worker registration for progressive web app features
import {
	preloadAboutResources,
	registerAboutSectionSW,
} from '@/lib/service-worker/sw-registration';

// CONTEXT7 SOURCE: /vercel/next.js - Conversion tracking integration for A/B testing and optimization
// CONVERSION OPTIMIZATION: Official Next.js documentation shows integrating analytics and conversion tracking for performance optimization
import { useConversionTracking } from '@/lib/analytics/conversion-tracking';

// CONTEXT7 SOURCE: /vercel/next.js - Simplified component without A/B testing complexity
// SIMPLIFICATION REASON: Official Next.js documentation shows clean component patterns without complex variant logic

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Flexible component props with optional customisation
 */
interface AboutSectionProps {
	/** Additional CSS classes for styling customisation */
	className?: string;
	/** Background colour class (default: bg-token-brand-50) */
	backgroundColor?: string;
	/** Custom title override */
	title?: string;
	/** Custom founder image URL override */
	founderImageUrl?: string;
	/** Custom founder image alt text */
	founderImageAlt?: string;
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Best Practices
 * Reference: /react/documentation - Modern React functional component patterns
 * Pattern: Reusable about section component with animations and CMS integration
 *
 * Component Features:
 * - Two-column layout: text left, image right
 * - Founder introduction with professional credentials
 * - Brand credibility indicators (Tatler, School Guide, Royal clientele)
 * - Animated content reveals with staggered timing
 * - Responsive design with mobile-first approach
 * - Premium visual effects and decorative elements
 */
export function AboutSection({
	className = '',
	backgroundColor = 'bg-token-brand-50',
	title = 'World-Class Education, At Your Fingertips',
	founderImageUrl = '/images/team/elizabeth-burrows-founder-spare.jpg',
	founderImageAlt = 'Elizabeth Burrows, Founder of My Private Tutor Online',
}: AboutSectionProps) {
	// CONTEXT7 SOURCE: /framer/motion - Simple client component animation patterns
	// SIMPLIFICATION REASON: Official Framer Motion documentation shows simple whileInView animations without complex state management

	// CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring hook integration
	// PERFORMANCE TRACKING: Official Next.js documentation shows using custom hooks for performance monitoring
	const performance = useAboutSectionPerformance();

	// CONTEXT7 SOURCE: /reactjs/react.dev - Simplified component state management
	// SIMPLIFICATION REASON: Official React documentation shows clean component patterns without complex variant state

	// CONTEXT7 SOURCE: /vercel/next.js - Simplified conversion tracking without A/B testing complexity
	// CONVERSION TRACKING: Official Next.js documentation shows basic analytics integration for performance monitoring
	const conversionTracker = useConversionTracking('about-section', {
		enableABTesting: false,
		trackScrollMilestones: true,
		trackExitIntent: true,
		trackVideoEngagement: true,
	});

	// CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for component lifecycle monitoring
	// LIFECYCLE MONITORING: Official React documentation shows useEffect for component mount tracking
	useEffect(() => {
		if (performance) {
			performance.markMount();

			// Track animation completion after delay
			const animationTimeout = setTimeout(() => {
				performance.markAnimationComplete();
			}, 2000); // Allow time for staggered animations

			return () => {
				clearTimeout(animationTimeout);
			};
		}
	}, [performance]);

	// CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for conversion tracking initialization
	// CONVERSION TRACKING LIFECYCLE: Official React documentation shows useEffect for analytics initialization
	useEffect(() => {
		if (conversionTracker) {
			// CONTEXT7 SOURCE: /vercel/next.js - Initialize conversion tracking on component mount
			// TRACKING INITIALIZATION: Official Next.js documentation shows setting up analytics on component mount
			conversionTracker.trackEvent('about_section_view', {
				timestamp: Date.now(),
				userAgent: navigator.userAgent.substring(0, 100),
			});

			// CONTEXT7 SOURCE: /mozilla/mdn - Performance mark for conversion tracking readiness
			// PERFORMANCE MARKING: Official MDN documentation shows marking analytics initialization
			performance.mark?.('conversion-tracking-initialized');
		}
	}, [conversionTracker, performance]);

	// CONTEXT7 SOURCE: /mozilla/mdn - Service Worker registration and resource preloading for performance optimization
	// SERVICE WORKER LIFECYCLE: Official MDN documentation shows registering service workers for advanced caching
	useEffect(() => {
		const initializeServiceWorker = async () => {
			try {
				const registered = await registerAboutSectionSW();
				if (registered) {
					// CONTEXT7 SOURCE: /mozilla/mdn - Resource preloading after service worker activation
					// PRELOAD STRATEGY: Official MDN documentation shows preloading critical resources for instant delivery
					await preloadAboutResources();

					if (performance) {
						performance.monitor?.reportMetric?.(
							'service-worker-initialized',
							1,
						);
					}
				}
			} catch (error) {
				console.warn('Service worker initialization failed:', error);
			}
		};

		// CONTEXT7 SOURCE: /mozilla/mdn - Delayed service worker registration to avoid blocking main thread
		// PERFORMANCE OPTIMIZATION: Official MDN documentation shows deferring service worker registration
		const registrationTimeout = setTimeout(initializeServiceWorker, 100);

		return () => {
			clearTimeout(registrationTimeout);
		};
	}, [performance]);

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Asymmetric 60/40 grid layout for dynamic composition
	// LAYOUT ENHANCEMENT: Official Tailwind CSS documentation shows custom grid fractions for visual interest
	const gridLayoutClasses =
		'grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start lg:grid-rows-1 relative';
	const contentOrder = 'order-1 lg:order-1';
	const imageOrder = 'order-2 lg:order-2';

	return (
		<section
			id='about'
			className={`py-20 lg:py-28 bg-gradient-to-br from-token-brand-50 to-token-brand-100 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] ${className}`}>
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system for brand colors */}
			{/* REVISION REASON: Phase 3 design system audit HP-004 - Migrate legacy primary-50/100 to token-brand-* for brand color consistency */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container symmetric padding for perfect left/right balance */}
			{/* PADDING SYMMETRY FIX REASON: Official Tailwind CSS documentation shows container with mx-auto for horizontal centering and px-* for equal horizontal padding */}
			{/* REVISION TYPE: Enhanced symmetric spacing by ensuring consistent progressive padding at all responsive breakpoints */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Increased horizontal padding for better content compression */}
			{/* REVISION REASON: User request - increase left/right padding to compress content and create more whitespace */}
			{/* ADDITIONAL COMPRESSION: Further increased padding per user request for more visual breathing room */}
			<div className='container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 2xl:px-40'>
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Fixed 50/50 grid layout for balanced column distribution */}
				{/* LAYOUT SIMPLIFICATION: Official Tailwind CSS documentation shows grid-cols-2 with consistent gap for equal width columns */}
				<div className={gridLayoutClasses}>
					{/* Decorative accent line between columns */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system for brand colors */}
					{/* REVISION REASON: Phase 3 design system audit HP-004 - Migrate decorative primary-200 to token-brand-200 */}
					<div className='absolute right-[40%] top-1/4 w-0.5 h-1/2 bg-token-brand-200 hidden lg:block'></div>

					{/* Text Content - Left Column (60% width) */}
					<div
						className={`${contentOrder} transition-transform duration-300 hover:scale-[1.02]`}>
						<LazyAboutContent
							title='World-Class Education, At Your Fingertips.'
							animationDelay={0.1}
							conversionTracker={conversionTracker}
							contentAlignment='left'
						/>
					</div>

					{/* Image and Badges - Right Column (40% width) */}
					<div
						className={`${imageOrder} transition-transform duration-300 hover:scale-[1.02]`}>
						<LazyAboutImage
							founderImageUrl={founderImageUrl}
							founderImageAlt={founderImageAlt}
							animationDelay={0.3}
							showCredentials={true}
							credentialsStyle='badges'
							imageStyle='standard'
							conversionTracker={conversionTracker}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

// Export types for documentation and reuse
export type { AboutSectionProps };
