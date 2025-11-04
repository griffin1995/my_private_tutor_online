'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { TestimonialCardSubjectTuition, type TestimonialSubjectTuition } from './testimonial-card-subject-tuition';
import { StatCard, type Stat } from './stat-card';

interface TestimonialsAndStatsGridProps {
	readonly testimonials?: readonly TestimonialSubjectTuition[];
	readonly stats?: readonly Stat[];
}

export const TestimonialsAndStatsGrid = memo(function TestimonialsAndStatsGrid({
	testimonials = [],
	stats = [],
}: TestimonialsAndStatsGridProps) {
	// Combine testimonials and stats into a single array for grid rendering
	const items = [...testimonials, ...stats];
	const itemCount = items.length;

	// Determine grid classes based on total count (same logic as SubsectionCard)
	const getGridClasses = () => {
		if (itemCount === 1) {
			return 'hidden md:grid md:grid-cols-1 gap-6 lg:gap-8';
		} else if (itemCount === 2) {
			return 'hidden md:grid md:grid-cols-2 gap-6 lg:gap-8';
		} else {
			return 'hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';
		}
	};

	if (itemCount === 0) {
		return null;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, delay: 0.6 }}>
			{/* Desktop Grid (hidden on mobile) */}
			<div className={getGridClasses()}>
				{testimonials.map((testimonial, index) => (
					<TestimonialCardSubjectTuition
						key={testimonial.id}
						testimonial={testimonial}
						index={index}
					/>
				))}
				{stats.map((stat, index) => (
					<StatCard
						key={stat.id}
						stat={stat}
						index={testimonials.length + index}
					/>
				))}
			</div>

			{/* Mobile Horizontal Scroll (visible on mobile only) */}
			<div className='md:hidden overflow-x-auto pb-4 -mx-4 px-4'>
				<div
					className='flex gap-4'
					style={{ width: 'max-content' }}>
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							className='w-[85vw] flex-shrink-0'>
							<TestimonialCardSubjectTuition
								testimonial={testimonial}
								index={index}
							/>
						</div>
					))}
					{stats.map((stat, index) => (
						<div
							key={stat.id}
							className='w-[85vw] flex-shrink-0'>
							<StatCard
								stat={stat}
								index={testimonials.length + index}
							/>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
});

export type { TestimonialsAndStatsGridProps };
