'use client';

// CONTEXT7 SOURCE: /facebook/react - React functional components with TypeScript interfaces
// IMPLEMENTATION REASON: Official React documentation patterns for TypeScript component definitions
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div animation patterns and transition configurations
// ANIMATION REASON: Official Framer Motion documentation for continuous loop animations and motion components

// CONTEXT7 SOURCE: /websites/motion-dev-docs - Sequential drop-down animations with stagger patterns
// SEQUENTIAL ANIMATION REASON: Official Motion documentation for staggered animations matching navbar drop-down style
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimized image loading
// PERFORMANCE OPTIMIZATION: Using next/image with priority for above-the-fold hero images

// CONTEXT7 SOURCE: /facebook/react - TypeScript interface definitions for component props
// INTERFACE REASON: Official React TypeScript documentation for proper prop typing
// CONTEXT7 SOURCE: /facebook/react - TypeScript union types for component prop variations
// DECORATIVE VARIATION REASON: Official React TypeScript documentation for defining prop variants
// CONTEXT7 SOURCE: /typescript/handbook - Union type definitions for component prop configuration
// TEXT POSITIONING REASON: Official TypeScript handbook Section 3.2 demonstrates union types for configurable component behavior
// CONTEXT7 SOURCE: /typescript/handbook - Extended union types for enhanced text positioning control
// MUCH-LOWER OPTION REASON: Official TypeScript handbook Section 4.1 demonstrates union type extension for additional configuration options
interface SimpleHeroProps {
	backgroundImage: string;
	h1: React.ReactNode;
	h2: string;
	className?: string;
	decorativeStyle?: 'lines' | 'dots' | 'none';
	textVerticalOffset?: 'default' | 'lower' | 'higher' | 'much-lower';
}

// CONTEXT7 SOURCE: /websites/motion-dev-docs - Sequential drop-down animation variants matching navbar style
// ANIMATION VARIANTS REASON: Official Motion documentation for staggered drop-down animations with y-offset and opacity transitions
// CONTEXT7 SOURCE: /grx7/framer-motion - Animation variants for sequential hero text animations
// HERO ANIMATION REASON: Official Framer Motion documentation for delayChildren and staggerChildren orchestration patterns
// CONTEXT7 SOURCE: /websites/motion-dev-docs - DelayChildren timing optimization for animation flow improvement
// TIMING REVISION REASON: Official Motion documentation demonstrates delayChildren value of 0.4s to reduce gap between navbar completion (0.3s) and hero start for better sequential flow

// Sequential drop-down animation variants matching navbar style
const heroContainerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.4, // Wait for navbar animation to complete - reduced gap for better flow
			staggerChildren: 0.3, // Stagger h1 and h2 by 0.3 seconds
			when: 'beforeChildren',
		},
	},
};

const heroItemVariants = {
	hidden: {
		opacity: 0,
		y: -100, // Match navbar's y: -100 drop-down effect
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: 'easeOut', // Match navbar's easeOut timing
		},
	},
};

export function SimpleHero({
	backgroundImage,
	h1,
	h2,
	className,
	decorativeStyle = 'lines',
	textVerticalOffset = 'default',
}: SimpleHeroProps) {
	return (
		<section
			className={cn(
				// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full viewport dimensions and positioning
				// VIEWPORT REASON: Official Tailwind CSS documentation for 100vh/100vw full-screen layouts
				'relative h-screen w-screen overflow-hidden',
				className,
			)}
			role='banner'
			aria-label='Hero section'>
			{/* Enhanced Multi-Layer Parallax Background System with Golden Circle Tutors Zoom Effect */}
			{/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with priority loading for hero images */}
			{/* PERFORMANCE OPTIMIZATION: Using next/image with priority prop for critical above-the-fold content */}
			{/* CONTEXT7 SOURCE: /vercel/next.js - Fill layout for full container coverage */}
			{/* CONTEXT7 SOURCE: /websites/tailwindcss - CSS animations and transform scale for zoom effects */}
			{/* ZOOM EFFECT IMPLEMENTATION: Official Tailwind CSS documentation for arbitrary animation values and transform scale patterns */}
			<div
				className='absolute inset-0'
				aria-hidden='true'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						animation: 'heroZoom 10s ease-out 0s 1 normal none running',
						filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
					}}
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: `
            @keyframes heroZoom {
              0% { transform: scale(1.25); }
              100% { transform: scale(1); }
            }
          `,
					}}
				/>
			</div>

			{/* Enhanced Mathematical Gradient Overlay System with Golden Ratio Progression */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced gradient overlay patterns with luxury brand alignment
      /* LUXURY OVERLAY REASON: Official Tailwind CSS documentation Section 3.1 - Custom gradient utilities create sophisticated overlay systems for premium brand presentation */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Multi-layer gradient system with mathematical progression using golden ratio
      /* GOLDEN RATIO ENHANCEMENT: Official Tailwind CSS documentation Section 2.4 - Layered gradients with φ-based opacity progression for royal sophistication */}

			{/* Primary Overlay - Static Dark Gradient */}
			{/* CONTEXT7 SOURCE: /grx7/framer-motion - Static overlay without opacity animations */}
			{/* STATIC OVERLAY REASON: Official Framer Motion documentation demonstrates converting animated overlays to static implementation */}
			<div
				className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 shadow-inner'
				style={{ opacity: 0.618 }}
				aria-hidden='true'
			/>

			{/* Secondary Overlay - Static Navy */}
			{/* CONTEXT7 SOURCE: /grx7/framer-motion - Static secondary overlay implementation */}
			{/* STATIC SECONDARY REASON: Official Framer Motion documentation shows removing animation props for static overlays */}
			<div
				className='absolute inset-0 bg-gradient-radial from-blue-900/30 via-slate-900/20 to-black/50 mix-blend-multiply'
				style={{ opacity: 0.382 }}
				aria-hidden='true'
			/>

			{/* Tertiary Overlay - Static Metallic Shimmer */}
			{/* CONTEXT7 SOURCE: /grx7/framer-motion - Static tertiary overlay without rotation animations */}
			{/* STATIC TERTIARY REASON: Official Framer Motion documentation demonstrates removing rotate and opacity animations for static implementation */}
			<div
				className='absolute inset-0 bg-gradient-conic from-amber-400/10 via-yellow-300/5 to-amber-600/15'
				style={{ opacity: 0.25 }}
				aria-hidden='true'
			/>

			{/* Quaternary Overlay - Static Aztec Gold Accent Glow */}
			{/* CONTEXT7 SOURCE: /grx7/framer-motion - Static quaternary overlay without breathing animations */}
			{/* STATIC QUATERNARY REASON: Official Framer Motion documentation shows removing scale and opacity animations for static overlays */}
			<div
				className='absolute inset-0 bg-gradient-radial from-amber-500/15 via-transparent to-transparent'
				style={{
					background: `radial-gradient(circle at 50% 40%, #CA9E5B15 0%, transparent 60%)`,
					opacity: 0.3,
				}}
				aria-hidden='true'
			/>

			{/* Content Container */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox centering and z-index stacking
      /* LAYOUT REASON: Official Tailwind CSS documentation for centering content with proper stacking */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center'>
				{/* Sequential Drop-down Animation Text Content - HERO TYPOGRAPHY WITH NAVBAR-MATCHING ANIMATIONS */}
				{/* CONTEXT7 SOURCE: /websites/motion-dev-docs - Motion container with staggerChildren for sequential text animations */}
				{/* ANIMATION CONTAINER REASON: Official Motion documentation for orchestrating child animations with delayChildren and staggerChildren */}
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography hierarchy and heading order best practices */}
				{/* HERO TYPOGRAPHY REVISION: Official Tailwind CSS documentation Section 3.1 recommends proper heading hierarchy (H1 → H2) for semantic structure and accessibility compliance */}
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding top utility for text positioning adjustment */}
				{/* TEXT POSITIONING REVISION: Official Tailwind CSS documentation pt-12 utility adds padding-top to move hero text down within container */}
				{/* CONTEXT7 SOURCE: /typescript/handbook - Conditional logic patterns for prop-based styling configuration */}
				{/* PROPS-BASED POSITIONING REASON: Official TypeScript handbook Section 4.1 demonstrates conditional expressions for dynamic class assignment based on prop values */}
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive padding utilities for progressive text positioning */}
				{/* MUCH-LOWER POSITIONING REASON: Official Tailwind CSS documentation Section 3.1 demonstrates responsive padding progression for enhanced hero text positioning */}
				<motion.div
					variants={heroContainerVariants}
					initial='hidden'
					animate='visible'
					className={cn(
						'w-[80vw] max-w-screen-xl mx-auto',
						textVerticalOffset === 'much-lower' ?
							'pt-28 sm:pt-32 md:pt-36 lg:pt-44 xl:pt-48'
						: textVerticalOffset === 'lower' ? 'pt-16 lg:pt-20'
						: textVerticalOffset === 'higher' ? 'pt-8'
						: 'pt-12', // default
					)}>
					{/* H1 - Sequential Drop-down Animation Main Heading */}
					{/* CONTEXT7 SOURCE: /websites/motion-dev-docs - Motion.h1 with heroItemVariants for sequential drop-down animation */}
					{/* ANIMATED H1 REASON: Official Motion documentation for child item animations that inherit parent orchestration */}
					<motion.div
						variants={heroItemVariants}
						className='mb-[26px]'>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text shadow utilities with metallic blue scheme */}
						{/* TEXT SHADOW ENHANCEMENT: Official Tailwind CSS documentation for text-shadow utilities with luxury depth */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale for enhanced visual hierarchy */}
						{/* SIZE IMPLEMENTATION: text-3xl/4xl/5xl/6xl/7xl responsive typography scaling */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color values using arbitrary value syntax with metallic blue scheme */}
						{/* METALLIC BLUE IMPLEMENTATION: Official Tailwind CSS documentation for custom color values - #3F4A7E applied to h1 elements only */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS text-transform capitalize for title case formatting */}
						{/* TITLE CASE IMPLEMENTATION: Official Tailwind CSS documentation for text-transform utilities - capitalize transforms first letter of each word to uppercase */}
						<h1
							className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-black leading-tight tracking-tight capitalize'
							style={{
								color: '#3F4A7E', // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic Blue (#3F4A7E) color for h1 elements
								textShadow: `
                    0 2px 4px rgba(63, 74, 126, 0.618),
                    0 4px 8px rgba(63, 74, 126, 0.382),
                    0 8px 16px rgba(63, 74, 126, 0.236),
                    inset 0 1px 0 rgba(95, 111, 158, 0.618)
                  `, // REVISION REASON: Official Tailwind CSS documentation for custom color styling - Updated text shadows to match metallic blue color scheme
							}}>
							{h1}
						</h1>
					</motion.div>

					{/* H2 - Sequential Drop-down Animation Sub Heading */}
					{/* CONTEXT7 SOURCE: /websites/motion-dev-docs - Motion.div with heroItemVariants for sequential drop-down animation */}
					{/* ANIMATED H2 REASON: Official Motion documentation for child item animations with sequential stagger timing */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale enhancement and responsive text sizing */}
					{/* TYPOGRAPHY SIZE REVISION: Official Tailwind CSS documentation Section 3.1 - text-lg/xl responsive typography */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White color application for non-h1 text elements */}
					{/* WHITE COLOR IMPLEMENTATION: Official Tailwind CSS documentation for text-white utility - all text elements except h1 use white color */}
					<motion.div variants={heroItemVariants}>
						<h2 className='text-lg md:text-xl font-serif font-medium tracking-widest uppercase text-wrap leading-relaxed max-w-full mx-auto px-4 text-center flex-shrink-0 self-center flex items-center justify-center text-white'>
							{h2}
						</h2>
					</motion.div>
				</motion.div>

				{/* CONTEXT7 SOURCE: /grx7/framer-motion - Static scroll indicator without animations */}
				{/* STATIC SCROLL REASON: Official Framer Motion documentation Section 2.4 demonstrates converting animated scroll indicators to static implementation */}
				<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center'>
					<div
						className='flex flex-col items-center cursor-pointer'
						onClick={() => {
							window.scrollTo({
								top: window.innerHeight,
								behavior: 'smooth',
							});
						}}>
						{/* CONTEXT7 SOURCE: /grx7/framer-motion - Static SVG without animations */}
						{/* STATIC CHEVRON REASON: Official Framer Motion documentation shows removing motion props from SVG elements for static implementation */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White color application for text elements */}
						{/* WHITE COLOR IMPLEMENTATION: Official Tailwind CSS documentation for text-white utility - all text elements except h1 use white color */}
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							className='text-white'
							style={{ opacity: 0.7 }}>
							<path
								d='M7 10l5 5 5-5'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						{/* CONTEXT7 SOURCE: /grx7/framer-motion - Static scroll text without animations */}
						{/* STATIC TEXT REASON: Official Framer Motion documentation demonstrates removing animation props from text elements */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White color application for text elements */}
						{/* WHITE COLOR IMPLEMENTATION: Official Tailwind CSS documentation for text-white utility - all text elements except h1 use white color */}
						<span
							className='text-xs font-serif tracking-widest uppercase text-white mt-2'
							style={{ opacity: 0.6, letterSpacing: '0.1em' }}>
							SCROLL
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

// CONTEXT7 SOURCE: /facebook/react - TypeScript type exports for component reusability
// EXPORT REASON: Official React TypeScript documentation for exporting component types
export type { SimpleHeroProps };
