'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@radix-ui/react-separator';

export interface TestimonialSubjectTuition {
	readonly id: string;
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly rating: number;
	readonly location?: string;
	readonly subject?: string;
	readonly result?: string;
}

interface TestimonialCardProps {
	readonly testimonial: TestimonialSubjectTuition;
	readonly index?: number;
}

export const TestimonialCardSubjectTuition = memo(function TestimonialCardSubjectTuition({
	testimonial,
	index = 0,
}: TestimonialCardProps) {
	return (
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
				delay: index * 0.1,
			}}
			className='bg-white border-2 border-neutral-300 p-8 shadow-subtle-md hover:shadow-depth-md transition-all duration-300 flex flex-col'>
			{/* Rating stars */}
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

			{/* Quote */}
			<blockquote className='text-neutral-700 italic mb-6 flex-1'>
				&quot;{testimonial.quote}&quot;
			</blockquote>

			<Separator className='bg-neutral-300 my-4' />

			{/* Author info */}
			<div>
				<div className='font-semibold text-primary-700'>{testimonial.author}</div>
				<div className='text-sm text-neutral-600'>{testimonial.role}</div>
				{testimonial.location && (
					<div className='text-sm text-neutral-500 mt-1'>{testimonial.location}</div>
				)}
			</div>
		</motion.div>
	);
});

export type { TestimonialCardProps, TestimonialSubjectTuition };
