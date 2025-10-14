/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns with children prop
 * COMPONENT EXTRACTION REASON: Official React documentation shows extracting components for better testability and reusability
 * PATTERN: Flexible content component with multiple children prop strategy for complex layouts
 */

'use client';

import { m } from 'framer-motion';

// CONTEXT7 SOURCE: /reactjs/react.dev - Enhanced animation hook integration for micro-interactions
// ENHANCED ANIMATIONS: Official React documentation shows integrating custom hooks for animation management
import { useEnhancedAnimations } from '@/lib/hooks/useEnhancedAnimations';

// CONTEXT7 SOURCE: /framer/motion - Micro-interaction utilities for enhanced user experience
// MICRO-INTERACTIONS: Official Framer Motion documentation shows implementing subtle animations for better UX
import {
	createHoverVariants,
	createScrollVariants,
} from '@/lib/animations/micro-interactions';

// CONTEXT7 SOURCE: /vercel/next.js - Import cached data access functions
// DATA CACHING INTEGRATION: Official Next.js documentation shows importing cached functions for optimized data access
import {
	getAboutContent,
	getAboutPerformanceConfig,
	getAboutVideoData,
} from '@/lib/about-data';

// CONTEXT7 SOURCE: /vercel/next.js - A/B testing variant type import for component configuration
// VARIANT INTEGRATION: Official Next.js documentation shows importing variant types for component optimization
import type { AboutSectionVariant } from '@/lib/ab-testing/about-variants';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface patterns for component props
 * INTERFACE DESIGN REASON: Official React documentation recommends flexible prop interfaces for reusable components
 */
interface AboutContentProps {
	/** Main heading text */
	title?: string;
	/** Animation delay offset for staggered reveals */
	animationDelay?: number;
	/** Custom className for styling overrides */
	className?: string;
	/** Conversion tracker for analytics and A/B testing */
	conversionTracker?: any;
	/** A/B testing variant configuration */
	variant?: AboutSectionVariant;
	/** Content alignment style */
	contentAlignment?: 'left' | 'center' | 'right';
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition with structured content patterns
 * EXTRACTION REASON: Official React documentation shows how to extract content components for better testing boundaries
 * PATTERN: Structured content component with animation timing and video integration
 */
export function AboutContent({
	title,
	animationDelay = 0.1,
	className = '',
	conversionTracker,
	variant,
	contentAlignment = 'left',
}: AboutContentProps) {
	// CONTEXT7 SOURCE: /vercel/next.js - Using cached data access for performance optimization
	// CACHED DATA ACCESS: Official Next.js documentation shows accessing cached data to prevent redundant computations
	const contentData = getAboutContent();
	const videoData = getAboutVideoData();
	const performanceConfig = getAboutPerformanceConfig();

	const displayTitle = title || contentData.formattedTitle;

	// CONTEXT7 SOURCE: /vercel/next.js - Variant-based content and styling configuration
	// VARIANT CONFIGURATION: Official Next.js documentation shows dynamic configuration based on A/B testing variants
	const showVideo = variant?.content.showVideo ?? true;
	const titleStyle = variant?.content.titleStyle ?? 'standard';
	const animationMode = variant?.performance.animationMode ?? 'full';
	const enableMicroInteractions =
		variant?.animations.enableMicroInteractions ?? true;

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic class generation based on content alignment
	// ALIGNMENT STYLING: Official Tailwind CSS documentation shows dynamic text alignment classes
	const alignmentClasses = {
		left: 'text-left',
		center: 'text-center mx-auto',
		right: 'text-right ml-auto',
	};
	const contentAlignmentClass = alignmentClasses[contentAlignment];

	// CONTEXT7 SOURCE: /reactjs/react.dev - Variant-aware enhanced animation hook integration for performance optimized animations
	// VARIANT ANIMATIONS: Official React documentation shows using variant configuration for dynamic animation behavior
	const titleAnimation = useEnhancedAnimations({
		threshold: animationMode === 'minimal' ? 0.1 : 0.2,
		rootMargin: animationMode === 'minimal' ? '-20px' : '-50px',
		delay: animationDelay,
		trackingName: `about-title-${variant?.id || 'default'}`,
		enableMicroInteractions:
			enableMicroInteractions && animationMode === 'full',
	});

	const contentAnimation = useEnhancedAnimations({
		threshold: animationMode === 'minimal' ? 0.05 : 0.1,
		rootMargin: animationMode === 'minimal' ? '-50px' : '-100px',
		delay: animationDelay + (animationMode === 'minimal' ? 0.1 : 0.3),
		trackingName: `about-content-${variant?.id || 'default'}`,
		enableMicroInteractions: false,
	});

	const videoAnimation = useEnhancedAnimations({
		threshold: animationMode === 'minimal' ? 0.1 : 0.3,
		rootMargin: animationMode === 'minimal' ? '-30px' : '-50px',
		delay: animationDelay + (animationMode === 'minimal' ? 0.2 : 0.6),
		trackingName: `about-video-${variant?.id || 'default'}`,
		enableMicroInteractions:
			enableMicroInteractions && animationMode === 'full',
	});

	// CONTEXT7 SOURCE: /framer/motion - Scroll variants for enhanced animation performance
	// SCROLL OPTIMIZATION: Official Framer Motion documentation shows optimized scroll-based animations
	const scrollVariants = createScrollVariants('up');
	const hoverVariants = createHoverVariants({ duration: 0.2 });

	return (
		<div
			className={`space-y-8 min-h-0 ${contentAlignmentClass} ${className}`}
			role='region'
			aria-labelledby='about-content-heading'
			data-variant={variant?.id}
			data-title-style={titleStyle}>
			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Component title rendering with enhanced micro-interactions */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - H2 typography scale with responsive text sizing */}
			{/* REVISION REASON: Design system compliance - H2 should use text-4xl lg:text-5xl pattern per established standards */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system migration */}
			{/* REVISION REASON: Design system compliance - migrate text-primary-900 to text-token-primary-dark for consistent heading colors */}
			<m.h2
				ref={titleAnimation.ref}
				animate={titleAnimation.controls}
				variants={
					titleAnimation.animationPreference === 'full' ?
						hoverVariants
					:	undefined
				}
				whileHover={
					titleAnimation.animationPreference === 'full' ? 'hover' : undefined
				}
				id='about-content-heading'
				className='text-4xl lg:text-5xl font-serif font-bold text-token-primary-dark cursor-default tracking-tight'
				tabIndex={0}
				aria-live='polite'
				onAnimationComplete={() => {
					// CONTEXT7 SOURCE: /framer/motion - Animation completion tracking for performance monitoring
					// COMPLETION TRACKING: Official Framer Motion documentation shows tracking animation completion
					titleAnimation.cleanupTracking();
					if (conversionTracker) {
						conversionTracker.trackEvent('scroll_milestone', {
							milestone: 'title_animated',
							timestamp: Date.now(),
							variant: conversionTracker.getCurrentVariant(),
						});
					}
				}}>
				{displayTitle.split('\n').map((line, index) => (
					<span key={index}>
						{line}
						{index < displayTitle.split('\n').length - 1 && <br />}
					</span>
				))}
			</m.h2>

			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Content composition with structured paragraph elements */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system for neutral colors */}
			{/* REVISION REASON: Phase 4 design system audit HP-007 - Migrate paragraph text from legacy primary-700 to text-token-neutral-700 for complete design token compliance */}
			<div className='space-y-6 text-xl text-token-neutral-700 leading-relaxed'>
				<m.p
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{
						duration: performanceConfig.animationDurations.content,
						ease: performanceConfig.animationEase,
						delay: animationDelay + 0.5,
					}}>
					At the heart of My Private Tutor Online is a singular vision: academic
					support that is both exceptional and deeply personal. Founded in 2010
					by Elizabeth Burrows—a{' '}
					<strong>
						Cambridge-accepted educator and former Forbes journalist
					</strong>
					—the company began not as a business, but as a trusted network of
					elite colleagues she met throughout her international tutoring career.
				</m.p>

				<m.p
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{
						duration: performanceConfig.animationDurations.content,
						ease: performanceConfig.animationEase,
						delay: animationDelay + 0.7,
					}}>
					What started as a circle of personal recommendations has since
					evolved—organically and exclusively—into one of the UK&apos;s most
					respected names in specialist private tutoring. As testament, My
					Private Tutor Online is honoured to be featured in{' '}
					<strong>Tatler&apos;s Address Book</strong>, recognised as{' '}
					<strong>
						School Guide&apos;s &lsquo;Top Pick&rsquo; for private tuition
					</strong>
					, and proud to count <strong>royal families</strong> among our
					clientele.
				</m.p>

				<m.p
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{
						duration: performanceConfig.animationDurations.content,
						ease: performanceConfig.animationEase,
						delay: animationDelay + 0.9,
					}}>
					{contentData.currentEthos}
				</m.p>
			</div>
		</div>
	);
}

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript export patterns for component reusability
export type { AboutContentProps };
