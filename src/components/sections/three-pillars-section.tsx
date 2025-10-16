'use client';

import { Separator } from '@/components/ui/separator';
import React from 'react';
interface PillarData {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	stats: string[];
}
const pillarsData: PillarData[] = [
	{
		id: 'pillar-1',
		title: '95% pass rate',
		subtitle: '11+ Grammar & Independent School Success',
		description:
			"Students achieving offers from at least one of their first choice schools, including Eton, St Paul's, Westminster, Highgate, Queen Elizabeth's, NLCS, Henrietta Barnett, Wilson's and more.",
		stats: ['Recent application cycles'],
	},
	{
		id: 'pillar-3',
		title: 'Top 2% of test takers',
		subtitle: 'Top 2% Test Performance',
		description:
			'From 7+ entrance all the way through to A Levels, our tutees frequently score in the top 2% of candidates. For example, one of our current students obtained the highest GCSE Science score in all of Asia.',
		stats: ['Recent examination cycles'],
	},
	{
		id: 'pillar-2',
		title: '94% 2+ grade growth',
		subtitle: 'GCSE Grade Growth',
		description:
			'Our GCSE students consistently improve by two or more full levels during their time with us.',
		stats: ['Long-term tracking across multiple academic years'],
	},
];
const backgroundShades = ['bg-primary-700', 'bg-primary-800', 'bg-primary-900'];
export const ThreePillarsSection: React.FC<{
	className?: string;
}> = ({ className = '' }) => {
	return (
		<div className={`py-7 lg:py-10 ${className}`}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto'>
					{pillarsData.map((pillar) => (
						<PillarCard
							key={pillar.id}
							pillar={pillar}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
interface PillarCardProps {
	pillar: PillarData;
}
const PillarCard: React.FC<PillarCardProps> = ({ pillar }) => {
	const shadeIndex =
		parseInt(pillar.id.replace(/\D/g, ''), 10) % backgroundShades.length;
	const bgClass = backgroundShades[shadeIndex];
	return (
		<div className='group'>
			<div className='shadow-xl overflow-hidden'>
				<div
					className={`${bgClass} relative`}
					style={{
						aspectRatio: '2/3',
					}}>
					{}
					<div className='absolute inset-0 p-8 pt-32 flex flex-col justify-end'>
						<h3 className='text-4xl font-bold text-token-neutral-white mb-2'>
							{pillar.title}
						</h3>
						<h4 className='text-xl text-token-neutral-white mb-4'>
							{pillar.subtitle}
						</h4>
						<Separator className='bg-white/30 mb-4' />
						<p className='text-token-neutral-white text-lg mb-4'>
							{pillar.description}
						</p>
						{pillar.stats.map((stat, index) => (
							<p
								key={index}
								className='text-token-neutral-white text-base mb-1'>
								• {stat}
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ThreePillarsSection;
export const MemoizedThreePillarsSection = React.memo(ThreePillarsSection);
