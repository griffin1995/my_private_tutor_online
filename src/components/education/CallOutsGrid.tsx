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
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { SquareAspectRatio } from '@/components/ui/aspect-ratio';
import type { CallOut } from '@/types/education-tabs';

interface CallOutsGridProps {
	readonly callOuts: ReadonlyArray<CallOut>;
}

export const CallOutsGrid = memo(function CallOutsGrid({
	callOuts,
}: CallOutsGridProps) {
	const getIcon = (iconName?: string) => {
		const iconProps = {
			className: 'h-full w-full text-primary-700',
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
			className='grid grid-cols-1 gap-8 md:auto-rows-fr md:grid-cols-3'
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
			{callOuts.map((callOut) => (
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
					}}>
					<Card className='group flex h-full flex-col justify-between p-0 transition-shadow hover:shadow-sm'>
						<CardHeader className='flex-row items-center gap-4 space-y-0 px-8 pb-0 pt-8'>
							<SquareAspectRatio className='w-12 flex-shrink-0 overflow-visible rounded-full bg-muted p-3'>
								{getIcon(callOut.icon)}
							</SquareAspectRatio>
							<h3>{callOut.title}</h3>
						</CardHeader>
						<CardContent className='flex-1 px-8 pb-8 pt-6'>
							<p className='line-clamp-4 leading-relaxed text-neutral-600'>
								{callOut.description}
							</p>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</motion.div>
	);
});

export type { CallOutsGridProps };
