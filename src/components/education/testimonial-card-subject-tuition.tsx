'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

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
			className='space-y-6 border border-neutral-300 bg-white p-8 transition-shadow hover:shadow-sm flex flex-col'>
			{/* Rating stars */}
			<div className='flex gap-1'>
				{[...Array(testimonial.rating)].map((_, i) => (
					<svg
						key={i}
						className='h-5 w-5 fill-current text-yellow-400'
						viewBox='0 0 20 20'>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
				))}
			</div>

			{/* Quote */}
			<blockquote className='flex-1 italic leading-relaxed text-neutral-700'>
				&quot;{testimonial.quote}&quot;
			</blockquote>

			<Separator className='bg-neutral-300' />

			{/* Author info */}
			<div className='space-y-1'>
				<div className='font-semibold text-primary-700'>{testimonial.author}</div>
				<div className='text-sm text-neutral-600'>{testimonial.role}</div>
				{testimonial.location && (
					<div className='text-sm text-neutral-500'>{testimonial.location}</div>
				)}
			</div>
		</motion.div>
	);
});

export type { TestimonialCardProps, TestimonialSubjectTuition };
