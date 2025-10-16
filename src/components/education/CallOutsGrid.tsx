'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import {
	Award,
	Users,
	School,
	TrendingUp,
	Shield,
	CheckCircle,
} from 'lucide-react';
import type { CallOut } from '@/types/education-tabs';
interface CallOutsGridProps {
	readonly callOuts: ReadonlyArray<CallOut>;
}
export const CallOutsGrid = memo(function CallOutsGrid({
	callOuts,
}: CallOutsGridProps) {
	const getIcon = (iconName?: string) => {
		const iconProps = {
			className: 'w-8 h-8 text-white',
			'aria-hidden': 'true' as const,
		};
		switch (iconName) {
			case 'users':
				return <Users {...iconProps} />;
			case 'school':
				return <School {...iconProps} />;
			case 'trending-up':
				return <TrendingUp {...iconProps} />;
			case 'shield':
				return <Shield {...iconProps} />;
			case 'check-circle':
				return <CheckCircle {...iconProps} />;
			case 'award':
			default:
				return <Award {...iconProps} />;
		}
	};
	return (
		<motion.div
			className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'
			initial='hidden'
			animate='visible'
			variants={{
				hidden: {
					opacity: 0,
				},
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: 0.2,
						delayChildren: 0.1,
					},
				},
			}}>
			{}
			{}
			{callOuts.map((callOut, index) => (
				<motion.div
					key={callOut.id}
					variants={{
						hidden: {
							opacity: 0,
							y: 30,
						},
						visible: {
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.6,
								ease: 'easeOut',
							},
						},
					}}
					className='group relative'>
					{}
					{}
					{}
					<div className='relative p-8 bg-white shadow-subtle-md border-2 border-neutral-300 hover:shadow-depth-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden'>
						{}
						{}
						{}
						<div className='absolute inset-0 bg-gradient-to-br from-primary-700/10 via-transparent to-neutral-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

						{}
						{}
						{}
						{}
						<div className='relative mb-6'>
							<div className='w-16 h-16 rounded-full bg-gradient-to-br from-accent-600 via-primary-700 to-primary-700 flex items-center justify-center shadow-lg shadow-accent-600/25 group-hover:shadow-xl group-hover:shadow-accent-600/40 transition-all duration-500 mx-auto'>
								{getIcon(callOut.icon)}
							</div>
						</div>

						{}
						{}
						{}
						<div className='text-center relative z-10'>
							<h4 className='mb-3'>{callOut.title}</h4>
							<p>{callOut.description}</p>
						</div>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
});
export type { CallOutsGridProps };
