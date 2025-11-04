'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

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
			className='bg-white border-2 border-neutral-300 p-8 shadow-subtle-md hover:shadow-depth-md transition-all duration-300'>
			{/* Stats8 block structure - adapted for single stat card */}
			<div className='flex flex-col gap-5'>
				<div className='text-6xl font-bold text-accent-600'>{stat.value}</div>
				<p className='text-xl font-semibold text-primary-700'>{stat.label}</p>
				<p className='text-neutral-600'>{stat.description}</p>
			</div>
		</motion.div>
	);
});

export type { StatCardProps };
