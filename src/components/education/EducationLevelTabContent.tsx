/**
 * CONTEXT7 SOURCE: /websites/react_dev - React component composition for complex layouts
 * COMPONENT REASON: Official React documentation for building composite container components
 *
 * EducationLevelTabContent Component
 * Standardized container for education level tab content
 * Combines main description, subsection cards, call outs, and testimonials
 */

'use client';

// CONTEXT7 SOURCE: /websites/react_dev - React memo for component optimization
// MEMO REASON: Official React documentation for preventing unnecessary re-renders
import { memo } from 'react';
// CONTEXT7 SOURCE: /grx7/framer-motion - Motion components for section animations
// ANIMATION REASON: Official Framer Motion documentation for smooth transitions
import { motion } from 'framer-motion';
import { CallOutsGrid } from './CallOutsGrid';
import { SubsectionCard } from './SubsectionCard';
// CONTEXT7 SOURCE: /components/sections/about/testimonials-section - Existing testimonials component
// TESTIMONIALS REASON: Using established brand-compliant testimonials component
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
// CONTEXT7 SOURCE: /lib/cms/cms-content - CMS functions for testimonial filtering
// CMS REASON: Official pattern for accessing CMS data synchronously
import { getAllTestimonials } from '@/lib/cms/cms-content';
import type { EducationLevelTabContent as EducationLevelTabContentType } from '@/types/education-tabs';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface for component props
// PROPS INTERFACE REASON: Official TypeScript documentation for type-safe props
interface EducationLevelTabContentProps {
	readonly content: EducationLevelTabContentType;
}

/**
 * CONTEXT7 SOURCE: /websites/react_dev - Memoized functional component pattern
 * MEMOIZATION REASON: Official React documentation recommends memo for complex components
 */
export const EducationLevelTabContent = memo(function EducationLevelTabContent({
	content,
}: EducationLevelTabContentProps) {
	// CONTEXT7 SOURCE: /lib/cms/cms-content - Synchronous CMS data access
	// TESTIMONIAL FILTERING REASON: Filter testimonials by education level IDs
	const allTestimonials = getAllTestimonials();
	const filteredTestimonials = allTestimonials.filter((testimonial) =>
		content.testimonialIds.includes(testimonial.id),
	);

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic grid columns based on content count
	// DYNAMIC GRID REASON: Official Tailwind CSS documentation for responsive grid that adapts to item count
	const getGridClasses = () => {
		const cardCount = content.subsections.length;
		if (cardCount === 1) {
			return 'hidden md:grid md:grid-cols-1 gap-6 lg:gap-8';
		} else if (cardCount === 2) {
			return 'hidden md:grid md:grid-cols-2 gap-6 lg:gap-8';
		} else {
			return 'hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';
		}
	};

	return (
		<div className='space-y-16'>
			{/* Main Description Section */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
			{/* LAYER BASE SYSTEM: Stripped font-body, text-lg, text-token-neutral-700, leading-relaxed - ALL from @layer base */}
			{/* ONLY KEEPING: Layout classes (text-center, max-w-4xl, mx-auto) */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-center'>
				<p className='max-w-4xl mx-auto'>
					{content.mainDescription}
				</p>
			</motion.div>

			{/* Subsection Cards Grid */}
			{/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering with array length check */}
			{/* CONDITIONAL REASON: Official React documentation for conditional content display */}
			{content.subsections.length > 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}>
					{/* Desktop: Responsive grid adapting to card count */}
					{/* Mobile: Horizontal scroll */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic grid with responsive columns */}
					{/* GRID REASON: Official Tailwind CSS documentation for adaptive grid layouts */}
					<div className={getGridClasses()}>
						{/* CONTEXT7 SOURCE: /websites/react_dev - Array mapping with index for staggered animations */}
						{/* MAPPING REASON: Official React documentation for list rendering with keys */}
						{content.subsections.map((card, index) => (
							<SubsectionCard
								key={card.id}
								card={card}
								index={index}
							/>
						))}
					</div>

					{/* Mobile: Horizontal Scroll */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Overflow scroll utilities */}
					{/* MOBILE SCROLL REASON: Official Tailwind CSS documentation for horizontal scrolling */}
					<div className='md:hidden overflow-x-auto pb-4 -mx-4 px-4'>
						<div
							className='flex gap-4'
							style={{ width: 'max-content' }}>
							{content.subsections.map((card, index) => (
								<div
									key={card.id}
									className='w-[85vw] flex-shrink-0'>
									<SubsectionCard
										card={card}
										index={index}
									/>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			)}

			{/* Call Outs Section */}
			{/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering for optional sections */}
			{/* CONDITIONAL REASON: Official React documentation for optional content */}
			{content.callOuts.length > 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}>
					<CallOutsGrid callOuts={content.callOuts} />
				</motion.div>
			)}

			{/* Testimonials Section */}
			{/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering for filtered content */}
			{/* TESTIMONIALS REASON: Official React documentation for conditional list display */}
			{filteredTestimonials.length > 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.6 }}>
					<TestimonialsSection
						testimonials={filteredTestimonials}
						backgroundColor='bg-white'
					/>
				</motion.div>
			)}
		</div>
	);
});

// CONTEXT7 SOURCE: /microsoft/typescript - Type export for external usage
// TYPE EXPORT REASON: Official TypeScript documentation for exporting component types
export type { EducationLevelTabContentProps };
