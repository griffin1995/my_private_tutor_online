/**
 * CONTEXT7 SOURCE: /vercel/next.js - A/B testing component implementation with variant-based rendering
 * AB TESTING COMPONENT: Official Next.js documentation shows implementing variant-based component rendering
 * PATTERN: Dynamic component adaptation based on A/B test variant configuration
 */

'use client';

import { m } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

// CONTEXT7 SOURCE: /vercel/next.js - A/B testing variant imports for dynamic rendering
// VARIANT SYSTEM: Official Next.js documentation shows importing A/B testing configurations
import {
	AboutSectionVariant,
	CONTROL_VARIANT,
	detectDeviceType,
	selectVariantForUser,
} from '@/lib/ab-testing/about-variants';

// CONTEXT7 SOURCE: /vercel/next.js - Conversion tracking integration for A/B testing
// TRACKING INTEGRATION: Official Next.js documentation shows integrating analytics with A/B testing
import { useConversionTracking } from '@/lib/analytics/conversion-tracking';

// CONTEXT7 SOURCE: /vercel/next.js - Enhanced animations with variant-specific configuration
// ANIMATION INTEGRATION: Official Next.js documentation shows adapting animations based on variants
import { useEnhancedAnimations } from '@/lib/hooks/useEnhancedAnimations';

// CONTEXT7 SOURCE: /vercel/next.js - Component imports for variant-based rendering
// COMPONENT SYSTEM: Official Next.js documentation shows importing components for dynamic composition
import {
	LazyAboutContent,
	LazyAboutImage,
} from '@/lib/dynamic-imports/lazy-components';

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface for variant-aware component props
 * COMPONENT PROPS: Official TypeScript documentation shows interface patterns for configurable components
 */
interface VariantAboutSectionProps {
	/** Additional CSS classes for styling customisation */
	className?: string;
	/** Background colour class (default: bg-primary-50) */
	backgroundColor?: string;
	/** Custom title override */
	title?: string;
	/** Custom founder image URL override */
	founderImageUrl?: string;
	/** Custom founder image alt text */
	founderImageAlt?: string;
	/** Force specific variant (for testing) */
	forceVariant?: string;
	/** User ID for consistent variant assignment */
	userId?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Variant-aware component with dynamic A/B testing
 * VARIANT COMPONENT: Official React documentation shows implementing dynamic component variants
 */
export function VariantAboutSection({
	className = '',
	backgroundColor = 'bg-primary-50',
	title = 'World-Class Education, At Your Fingertips', //old file
	founderImageUrl = '/images/team/elizabeth-burrows-founder-spare.jpg',
	founderImageAlt = 'Elizabeth Burrows, Founder of My Private Tutor Online',
	forceVariant,
	userId,
}: VariantAboutSectionProps) {
	// CONTEXT7 SOURCE: /reactjs/react.dev - useState for variant state management
	// STATE MANAGEMENT: Official React documentation shows managing component state
	const [currentVariant, setCurrentVariant] =
		useState<AboutSectionVariant>(CONTROL_VARIANT);
	const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(
		'desktop',
	);

	// CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for variant selection and device detection
	// VARIANT SELECTION: Official React documentation shows using useEffect for dynamic configuration
	useEffect(() => {
		const detectedDevice = detectDeviceType();
		setDeviceType(detectedDevice);

		// CONTEXT7 SOURCE: /vercel/next.js - User-based variant selection with device consideration
		// USER ASSIGNMENT: Official Next.js documentation shows implementing user-based variant assignment
		let selectedVariant: AboutSectionVariant;

		if (forceVariant) {
			// Find variant by ID for testing purposes
			selectedVariant = CONTROL_VARIANT; // Default fallback
		} else {
			selectedVariant = selectVariantForUser(userId, detectedDevice);
		}

		setCurrentVariant(selectedVariant);
	}, [forceVariant, userId]);

	// CONTEXT7 SOURCE: /vercel/next.js - Conversion tracking with variant-specific configuration
	// VARIANT TRACKING: Official Next.js documentation shows implementing variant-aware analytics
	const conversionTracker = useConversionTracking('about-section', {
		enableABTesting: true,
		trackScrollMilestones: true,
		trackExitIntent: true,
		trackVideoEngagement: currentVariant.content.showVideo,
		variant: currentVariant.id,
	});

	// CONTEXT7 SOURCE: /reactjs/react.dev - Enhanced animations with variant-specific timing
	// ANIMATION ADAPTATION: Official React documentation shows adapting animations based on configuration
	const sectionAnimation = useEnhancedAnimations({
		threshold: 0.1,
		rootMargin: '-50px',
		delay: 0.1 * currentVariant.animations.delayMultiplier,
		trackingName: `about-section-${currentVariant.id}`,
		enableMicroInteractions: currentVariant.animations.enableMicroInteractions,
	});

	// CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for variant-specific styling computation
	// STYLE COMPUTATION: Official React documentation shows optimizing computed styles with useMemo
	const variantStyles = useMemo(() => {
		const { layout } = currentVariant;

		return {
			gridClasses: `grid ${layout.gridCols} ${layout.gap} items-start`,
			contentAlignment: layout.contentAlignment,
			imagePosition: layout.imagePosition,
		};
	}, [currentVariant]);

	// CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for performance-optimized variant configuration
	// PERFORMANCE CONFIG: Official React documentation shows optimizing configuration objects
	const performanceConfig = useMemo(
		() => ({
			lazyLoadPriority: currentVariant.performance.lazyLoadPriority,
			imageOptimization: currentVariant.performance.imageOptimization,
			animationMode: currentVariant.performance.animationMode,
		}),
		[currentVariant],
	);

	// CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for variant performance tracking
	// VARIANT ANALYTICS: Official React documentation shows tracking variant performance
	useEffect(() => {
		if (conversionTracker && currentVariant) {
			// CONTEXT7 SOURCE: /vercel/next.js - Variant exposure tracking for A/B testing
			// EXPOSURE TRACKING: Official Next.js documentation shows tracking variant exposures
			conversionTracker.trackEvent('about_section_view', {
				variant: currentVariant.id,
				variantName: currentVariant.name,
				deviceType,
				timestamp: Date.now(),
				experimentId: 'about-section-optimization-v1',
			});

			// CONTEXT7 SOURCE: /mozilla/mdn - Performance mark for variant activation
			// VARIANT PERFORMANCE: Official MDN documentation shows marking variant activation events
			if ('performance' in window) {
				performance.mark(`variant-activated-${currentVariant.id}`);
			}
		}
	}, [currentVariant, conversionTracker, deviceType]);

	return (
		<section
			id='about'
			className={`py-16 lg:py-24 ${backgroundColor} ${className}`}
			data-variant={currentVariant.id}
			data-testid={`about-section-${currentVariant.id}`}>
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container with variant-specific padding */}
			{/* VARIANT LAYOUT: Official Tailwind CSS documentation shows adaptive container configurations */}
			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16'>
				{/* CONTEXT7 SOURCE: /reactjs/react.dev - Variant-based grid layout with dynamic classes */}
				<m.div
					ref={sectionAnimation.ref}
					animate={sectionAnimation.controls}
					className={variantStyles.gridClasses}
					onAnimationComplete={() => {
						// CONTEXT7 SOURCE: /framer/motion - Variant animation completion tracking
						// ANIMATION TRACKING: Official Framer Motion documentation shows tracking variant animations
						sectionAnimation.cleanupTracking();
						if (conversionTracker) {
							conversionTracker.trackEvent('scroll_milestone', {
								milestone: 'section_animated',
								variant: currentVariant.id,
								timestamp: Date.now(),
							});
						}
					}}>
					{/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional content ordering based on variant */}
					{variantStyles.imagePosition === 'left' ?
						<>
							{/* Image First Layout */}
							<LazyAboutImage
								founderImageUrl={founderImageUrl}
								founderImageAlt={founderImageAlt}
								animationDelay={0.1 * currentVariant.animations.delayMultiplier}
								showCredentials={
									currentVariant.content.credentialsStyle !== 'minimal'
								}
								conversionTracker={conversionTracker}
								variant={currentVariant}
							/>

							<LazyAboutContent
								title={title}
								animationDelay={0.3 * currentVariant.animations.delayMultiplier}
								conversionTracker={conversionTracker}
								variant={currentVariant}
								showVideo={currentVariant.content.showVideo}
							/>
						</>
					:	<>
							{/* Content First Layout */}
							<LazyAboutContent
								title={title}
								animationDelay={0.1 * currentVariant.animations.delayMultiplier}
								conversionTracker={conversionTracker}
								variant={currentVariant}
								showVideo={currentVariant.content.showVideo}
							/>

							<LazyAboutImage
								founderImageUrl={founderImageUrl}
								founderImageAlt={founderImageAlt}
								animationDelay={0.3 * currentVariant.animations.delayMultiplier}
								showCredentials={
									currentVariant.content.credentialsStyle !== 'minimal'
								}
								conversionTracker={conversionTracker}
								variant={currentVariant}
							/>
						</>
					}
				</m.div>

				{/* CONTEXT7 SOURCE: /vercel/next.js - Variant debugging information for development */}
				{process.env.NODE_ENV === 'development' && (
					<div className='fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded text-xs max-w-xs'>
						<div className='font-bold mb-1'>A/B Test Debug</div>
						<div>Variant: {currentVariant.id}</div>
						<div>Name: {currentVariant.name}</div>
						<div>Device: {deviceType}</div>
						<div>
							Animation Mode: {currentVariant.performance.animationMode}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Variant-specific content adaptation hook
 * CONTENT ADAPTATION: Official Next.js documentation shows implementing content adaptation systems
 */
export const useVariantAdaptation = (variant: AboutSectionVariant) => {
	// CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for variant-specific content configuration
	// CONTENT CONFIG: Official React documentation shows optimizing content configuration
	const contentConfig = useMemo(
		() => ({
			titleClasses:
				variant.content.titleStyle === 'highlighted' ?
					'text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-primary-900 bg-gradient-to-r from-primary-900 to-primary-600 bg-clip-text text-transparent'
				: variant.content.titleStyle === 'minimal' ?
					'text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-primary-800'
				:	'text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-primary-900',

			imageClasses:
				variant.content.imageStyle === 'circular' ?
					'object-cover rounded-full w-full h-auto max-w-md mx-auto'
				: variant.content.imageStyle === 'card' ?
					'object-contain w-full h-auto max-w-md mx-auto rounded-lg shadow-xl'
				:	'object-contain w-full h-auto max-w-full',

			credentialsLayout:
				variant.content.credentialsStyle === 'text' ? 'flex-col space-y-2'
				: variant.content.credentialsStyle === 'minimal' ? 'hidden'
				: 'flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6',
		}),
		[variant],
	);

	return contentConfig;
};

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript export patterns for variant components
export type { VariantAboutSectionProps };
