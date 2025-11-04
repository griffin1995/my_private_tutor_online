'use client';

import { Separator } from '@/components/ui/separator';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
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
const backgroundShades = ['bg-primary-700', 'bg-primary-800', 'bg-primary-800'];
const pillarBackgrounds: Record<string, string> = {
	'pillar-1': '/images/graphics/stat-school-offers.svg',
	'pillar-2': '/images/graphics/stat-gcse-grade-improvement.svg',
	'pillar-3': '/images/graphics/stat-top-candidates.svg',
};
export const ThreePillarsSection: React.FC<{
	className?: string;
}> = ({ className = '' }) => {
	return (
		<div className={`py-6 sm:py-7 md:py-8 lg:py-10 xl:py-12 ${className}`}>
			<div className='container mx-auto px-2 sm:px-0 md:px-0 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl xl:max-w-7xl mx-auto'>
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
				<AspectRatio.Root ratio={2 / 3}>
					<div className={`${bgClass} relative w-full h-full`}>
						<div
							className='absolute inset-0 opacity-20 bg-repeat'
							style={{
								backgroundImage: `url(${pillarBackgrounds[pillar.id]})`,
								backgroundSize: '80px 80px',
							}}
						/>

						{/* Content anchored from bottom with fixed-height containers */}
						<div className='absolute bottom-0 left-0 right-0 px-3 pb-2 sm:px-4 sm:pb-3 md:px-5 md:pb-3 lg:p-8 lg:pb-8 xl:p-10 xl:pb-10'>

							{/* Fixed height title container - ensures separator alignment */}
							<div className="h-20 sm:h-24 md:h-28 lg:h-36 xl:h-40 flex flex-col justify-end mb-2 sm:mb-2 md:mb-3 lg:mb-4">
								<h3 className='text-base leading-tight sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-token-neutral-white'>
									{pillar.title}
								</h3>
								<h4 className='text-xs leading-tight sm:text-sm md:text-base lg:text-xl xl:text-2xl text-token-neutral-white mt-1'>
									{pillar.subtitle}
								</h4>
							</div>

							{/* Separator after fixed-height container */}
							<Separator className='bg-white/30 mb-2 sm:mb-3 md:mb-3 lg:mb-4' />

							{/* Fixed height description container */}
							<div className="h-32 sm:h-36 md:h-40 lg:h-52 xl:h-56 overflow-hidden mb-2 sm:mb-3 md:mb-3 lg:mb-4">
								<p className='text-token-neutral-white text-[0.65rem] leading-snug sm:text-xs md:text-sm lg:text-lg xl:text-xl'>
									{pillar.description}
								</p>
							</div>

							{/* Fixed height stats container */}
							<div className="h-8 sm:h-10 md:h-12 lg:h-16 xl:h-16 overflow-hidden">
								{pillar.stats.map((stat, index) => (
									<p
										key={index}
										className='text-token-neutral-white text-[0.6rem] leading-tight sm:text-[0.65rem] md:text-xs lg:text-base mb-0.5'>
										• {stat}
									</p>
								))}
							</div>
						</div>
					</div>
				</AspectRatio.Root>
			</div>
		</div>
	);
};
export default ThreePillarsSection;
export const MemoizedThreePillarsSection = React.memo(ThreePillarsSection);
