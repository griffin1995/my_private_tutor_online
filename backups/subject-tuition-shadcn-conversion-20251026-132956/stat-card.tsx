'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@radix-ui/react-separator';

export interface Stat {
	readonly id: string;
	readonly value: string;
	readonly label: string;
	readonly description: string;
	readonly icon?: 'award' | 'trending-up' | 'users' | 'check-circle' | 'school' | 'shield';
}

interface StatCardProps {
	readonly stat: Stat;
	readonly index?: number;
}

export const StatCard = memo(function StatCard({ stat, index = 0 }: StatCardProps) {
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
			className='bg-white border-2 border-neutral-300 p-8 shadow-subtle-md hover:shadow-depth-md transition-all duration-300 flex flex-col items-center text-center'>
			{/* Large stat value */}
			<div className='text-5xl lg:text-6xl font-bold text-accent-600 mb-4'>{stat.value}</div>

			{/* Label */}
			<h3 className='text-xl font-semibold text-primary-700 mb-3'>{stat.label}</h3>

			<Separator className='bg-neutral-300 my-4 w-16' />

			{/* Description */}
			<p className='text-neutral-600'>{stat.description}</p>
		</motion.div>
	);
});

export type { StatCardProps };
