/**
 * CONTEXT7 SOURCE: /websites/react_dev - React component composition patterns for card-based layouts
 * COMPONENT REASON: Official React documentation for building reusable card components with flexible content
 *
 * SubsectionCard Component
 * Clean card layout for education level tab subsections
 * Displays heading, body text, and optional multiple videos using HeroVideoDialog
 */

'use client';

// CONTEXT7 SOURCE: /websites/react_dev - React memo for performance optimization
// MEMO REASON: Official React documentation demonstrates memo for preventing unnecessary re-renders
import { memo } from 'react';
// CONTEXT7 SOURCE: /radix-ui/website - Separator component for content division
// SEPARATOR REASON: Official Radix UI documentation for semantic content separation
import { Separator } from '@radix-ui/react-separator';
// CONTEXT7 SOURCE: /grx7/framer-motion - Motion components for entrance animations
// ANIMATION REASON: Official Framer Motion documentation for smooth card entrance effects
import { motion } from 'framer-motion';
// CONTEXT7 SOURCE: /magicuidesign/magicui - HeroVideoDialog component for video display
// VIDEO REASON: Existing brand-compliant video component with thumbnail and modal
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import type { SubsectionCard as SubsectionCardType } from '@/types/education-tabs';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface for component props
// PROPS INTERFACE REASON: Official TypeScript documentation for type-safe component properties
interface SubsectionCardProps {
	readonly card: SubsectionCardType;
	readonly index?: number;
}

/**
 * CONTEXT7 SOURCE: /websites/react_dev - Memoized functional component pattern
 * MEMOIZATION REASON: Official React documentation recommends memo for cards in lists
 */
export const SubsectionCard = memo(function SubsectionCard({
	card,
	index = 0,
}: SubsectionCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className='bg-white border-2 border-token-ui-border p-8 shadow-subtle-md hover:shadow-depth-md transition-all duration-300'>
			{/* Heading - Playfair Display */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography utilities for heading hierarchy */}
			{/* TYPOGRAPHY REASON: Official Tailwind CSS documentation for font-heading token usage */}
			<h3 className='font-heading text-2xl font-bold text-token-primary-dark mb-4'>
				{card.heading}
			</h3>

			{/* Separator */}
			{/* CONTEXT7 SOURCE: /radix-ui/website - Horizontal separator for content division */}
			{/* SEPARATOR REASON: Official Radix UI documentation for decorative separators */}
			<Separator className='bg-token-ui-border my-4' />

			{/* Main Text Body - Source Serif 4 */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text formatting and spacing utilities */}
			{/* TEXT STYLING REASON: Official Tailwind CSS documentation for font-body and leading utilities */}
			<div className='font-body text-base text-token-neutral-700 leading-relaxed mb-6 whitespace-pre-line'>
				{card.mainTextBody}
			</div>

			{/* Videos Section (if present) */}
			{/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering with optional chaining */}
			{/* CONDITIONAL REASON: Official React documentation for rendering optional content */}
			{card.videos && card.videos.length > 0 && (
				<div className='mt-6 space-y-4'>
					{/* CONTEXT7 SOURCE: /websites/react_dev - Array mapping for multiple items */}
					{/* MAPPING REASON: Official React documentation for rendering lists with keys */}
					{card.videos.map((video) => (
						<div
							key={video.id}
							className='w-full'>
							{/* CONTEXT7 SOURCE: /magicuidesign/magicui - HeroVideoDialog integration */}
							{/* VIDEO INTEGRATION REASON: Using established video component for consistency */}
							<HeroVideoDialog
								videoSrc={video.youtubeUrl}
								thumbnailSrc={video.thumbnailSrc}
								thumbnailAlt={video.thumbnailAlt}
								animationStyle='from-center'
								isFree={video.isFree}
								className='w-full'
							/>
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
});

// CONTEXT7 SOURCE: /microsoft/typescript - Type export for external usage
// TYPE EXPORT REASON: Official TypeScript documentation for exporting component types
export type { SubsectionCardProps };
