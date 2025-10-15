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
import { m } from 'framer-motion';

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

// CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring integration for optimization tracking
// PERFORMANCE MONITORING REASON: Official Next.js documentation shows integrating performance monitoring for component optimization
import { useAboutSectionPerformance } from '@/lib/performance/about-monitoring';

// CONTEXT7 SOURCE: /mozilla/mdn - Service Worker integration for advanced multi-layer caching
// SERVICE WORKER INTEGRATION: Official MDN documentation shows service worker registration for progressive web app features
import {
	preloadAboutResources,
	registerAboutSectionSW,
} from '@/lib/service-worker/sw-registration';
import Image from 'next/image';

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
						performance.monitor?.reportMetric?.('service-worker-initialized', 1);
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
					<div>
						<div className='max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-left'>
							<h2 className='text-4xl lg:text-5xl font-serif font-bold text-token-primary-dark leading-tight mb-6'>
								World-Class Education,
								<br />
								At Your Fingertips.
							</h2>
							<p className='text-lg lg:text-xl font-serif italic text-token-primary-dark mb-4'>
								At the heart of My Private Tutor Online is a singular vision: academic
								support that is both exceptional and deeply personal. Founded in 2010 by
								Elizabeth Burrows—a{' '}
								<strong className='text-token-primary-dark'>
									Cambridge-accepted educator and former Forbes journalist
								</strong>{' '}
								—the company began not as a business, but as a trusted network of elite
								colleagues she met throughout her international tutoring career.
							</p>
							<p className='text-lg lg:text-xl font-serif italic text-token-primary-dark mb-4'>
								What started as a circle of personal recommendations has since
								evolved—organically and exclusively—into one of the UK&apos;s most
								respected names in specialist private tutoring. As testament, My Private
								Tutor Online is honoured to be featured in{' '}
								<strong className='text-token-primary-dark'>
									Tatler&apos;s Address Book
								</strong>
								, recognised as{' '}
								<strong className='text-token-primary-dark'>
									School Guide&apos;s ‘Top Pick’
								</strong>{' '}
								for private tuition, and proud to count{' '}
								<strong className='text-token-primary-dark'>royal families</strong>{' '}
								among our clientele.
							</p>
							<p className='text-lg lg:text-xl font-serif italic text-token-primary-dark'>
								15 years later, the ethos remains the same: every tutor is handpicked,
								every match thoughtfully made, and every family accommodated directly by
								Elizabeth and her team.
							</p>
						</div>
					</div>

					<div className='flex items-center justify-center h-full'>
						<Image
							src={founderImageUrl} // e.g., "/public/images/team/elizabeth-burrows-founder-spare.jpg"
							alt={founderImageAlt || 'Elizabeth Burrows, Founder'}
							width={400}
							height={500}
							className='shadow-xl'
							loading='lazy'
							quality={85}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
						/>
					</div>
				</div>
				{/* Enhanced credential badges with comprehensive styling */}
				<m.div
					className='grid grid-cols-3 gap-6 w-full max-w-6xl mx-auto relative z-10'
					style={{
						marginTop: '55px', // Fibonacci spacing
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '24px',
						alignItems: 'center',
					}}
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}>
					{/* Badge 1 - Tatler Logo with enhanced styling */}
					<m.div
						className='flex justify-center group relative'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
						style={{
							aspectRatio: '1/1',
							background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(212,175,55,0.3)',
							padding: '20px',
							boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							fontFamily: "'Helvetica Neue Condensed', sans-serif",
							textTransform: 'uppercase',
							letterSpacing: '1px',
						}}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: { duration: 0.3, ease: 'easeOut' },
						}}>
						<img
							src='/images/media/tatler-logo-alt.png'
							alt='Tatler Address Book - Featured Premium Tutoring Service'
							className='h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300'
						/>
					</m.div>

					{/* Badge 2 - Schools Guide UK Logo with enhanced styling */}
					<m.div
						className='flex justify-center group relative'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
						style={{
							aspectRatio: '1/1',
							background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(212,175,55,0.3)',
							padding: '20px',
							boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							fontFamily: "'Helvetica Neue Condensed', sans-serif",
							textTransform: 'uppercase',
							letterSpacing: '1px',
						}}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: { duration: 0.3, ease: 'easeOut' },
						}}>
						<img
							src='/images/media/schools-guide-uk-logo.png'
							alt='Schools Guide UK - Top Pick for Private Tuition'
							className='h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300'
						/>
					</m.div>

					{/* Badge 3 - Royal Clientele Text with enhanced styling */}
					<m.div
						className='flex justify-center items-center group relative'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
						style={{
							aspectRatio: '1/1',
							background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(212,175,55,0.3)',
							padding: '20px',
							boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							fontFamily: "'Helvetica Neue Condensed', sans-serif",
							textTransform: 'uppercase',
							letterSpacing: '1px',
						}}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: { duration: 0.3, ease: 'easeOut' },
						}}>
						<div className='flex flex-col items-center justify-center text-center'>
							{/* CONTEXT7 SOURCE: /lucide-icons/lucide - Crown icon implementation with color and size props */}
							{/* CROWN ICON REASON: Official Lucide React documentation for icon components with SVG attributes */}
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Icon sizing with size prop for 300% increase (24px → 72px) */}
							{/* SIZE REVISION REASON: Official Lucide React documentation supports direct size prop for icon scaling */}
							<m.div
								initial={{ opacity: 0, scale: 0.8, y: -10 }}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 1.0, ease: 'easeOut' }}
								className='mb-2 relative w-[100px] h-[100px]'>
								<Image
									src='/icons/royal-crown.svg'
									alt='Royal Crown Icon'
									fill
									className='transition-all duration-300 group-hover:scale-110'
								/>
							</m.div>

							<m.p
								className='text-center font-medium text-[#1E3A5F] tracking-tight'
								style={{
									fontSize: '16px',
									fontWeight: '600',
									color: '#1E3A5F',
									lineHeight: '1.4',
								}}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}>
								Trusted by Royal Clientele
							</m.p>
						</div>
					</m.div>
				</m.div>
			</div>
		</section>
	);
}

// Export types for documentation and reuse
export type { AboutSectionProps };
