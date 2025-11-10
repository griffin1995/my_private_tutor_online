'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { CallOutsGrid } from './CallOutsGrid';
import { SubsectionCard } from './SubsectionCard';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { getAllTestimonials } from '@/lib/cms/cms-content';
import type { EducationLevelTabContent as EducationLevelTabContentType } from '@/types/education-tabs';
interface EducationLevelTabContentProps {
	readonly content: EducationLevelTabContentType;
}
export const EducationLevelTabContent = memo(function EducationLevelTabContent({
	content,
}: EducationLevelTabContentProps) {
	const allTestimonials = getAllTestimonials();
	const filteredTestimonials = allTestimonials.filter((testimonial) =>
		content.testimonialIds.includes(testimonial.id),
	);
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
			<motion.div
				initial={{
					opacity: 0,
					y: 20,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					duration: 0.5,
				}}
				className='text-center'>
				<p className='max-w-4xl mx-auto'>{content.mainDescription}</p>
			</motion.div>

			{content.subsections.length > 0 && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.6,
						delay: 0.2,
					}}>
					<div className={getGridClasses()}>
						{content.subsections.map((card, index) => (
							<SubsectionCard
								key={card.id}
								card={card}
								index={index}
							/>
						))}
					</div>

					<div className='md:hidden overflow-x-auto pb-4 -mx-4 px-4'>
						<div
							className='flex gap-4'
							style={{
								width: 'max-content',
							}}>
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

			{content.callOuts.length > 0 && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.6,
						delay: 0.4,
					}}>
					<CallOutsGrid callOuts={content.callOuts} />
				</motion.div>
			)}

			{filteredTestimonials.length > 0 && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.6,
						delay: 0.6,
					}}>
					<TestimonialsSection
						testimonials={filteredTestimonials}
						backgroundColor='bg-white'
					/>
				</motion.div>
			)}
		</div>
	);
});
export type { EducationLevelTabContentProps };
