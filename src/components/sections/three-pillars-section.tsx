'use client';

import { Separator } from '@/components/ui/separator';
import React from 'react';

interface PillarData {
	id: string;
	title: string;
	description: string;
	stats: string[];
}

const pillarsData: PillarData[] = [
	{
		id: 'pillar-1',
		title: '95% pass rate',
		description:
			"Students achieving offers from at least one of their first choice schools, including Eton, St Paul's, Westminster, Highgate, Queen Elizabeth's, NLCS, Henrietta Barnett, Wilson's and more.",
		stats: ['Recent application cycles'],
	},
	{
		id: 'pillar-3',
		title: 'Top 2% of test takers',
		description:
			'From 7+ entrance all the way through to A Levels, our tutees frequently score in the top 2% of candidates. For example, one of our current students obtained the highest GCSE Science score in all of Asia.',
		stats: ['Recent examination cycles'],
	},
	{
		id: 'pillar-2',
		title: '94% 2+ grade growth',
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

const getBgClass = (id: string): string => {
	const index = parseInt(id.replace(/\D/g, ''), 10) % backgroundShades.length;
	return backgroundShades[index];
};

export const ThreePillarsSection: React.FC<{
	className?: string;
}> = ({ className = '' }) => {
	return (
		<div className={`py-6 sm:py-7 md:py-8 lg:py-10 xl:py-12 ${className}`}>
			<div className='container mx-auto px-2 sm:px-4 md:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-2 max-w-full 2xl:max-w-7xl mx-auto'>
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
	const bgClass = getBgClass(pillar.id);

	return (
		<div className='group h-full'>
			<div className='shadow-xl overflow-hidden h-full'>
				{/* Breakpoint-specific sizing: aspect ratios for single column, further increased height for multi-column */}
				<div className={`${bgClass} relative w-full aspect-[8/5] sm:aspect-[2/1] md:aspect-[5/2] lg:h-full lg:min-h-[710px]`}>
					<div
						className='absolute inset-0 opacity-20 bg-repeat'
						style={{
							backgroundImage: `url(${pillarBackgrounds[pillar.id]})`,
							backgroundSize: '80px 80px',
						}}
					/>

					{/* Breakpoint-specific layout: flexible for single column, fixed for multi-column */}
					<div className='absolute inset-0 p-4 sm:p-5 md:p-6 lg:p-10 xl:p-12 flex flex-col'>

						{/* Title section - flexible height on single column, increased fixed height on multi-column */}
						<div className='flex-shrink-0 lg:h-28 xl:h-32 lg:flex lg:items-end lg:pb-2'>
							<h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight'>
								{pillar.title}
							</h3>
						</div>

						{/* Separator - responsive spacing */}
						<div className='flex-shrink-0 py-3 sm:py-4 lg:py-6'>
							<Separator className='bg-white/30' />
						</div>

						{/* Description - flexible on single column, controlled height on multi-column for alignment */}
						<div className='flex-1 lg:flex-none lg:h-72 xl:h-80 flex flex-col justify-center lg:justify-start lg:overflow-hidden'>
							<p className='text-white text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl leading-snug lg:leading-relaxed'>
								{pillar.description}
							</p>
						</div>

						{/* Stats section - flexible on single column, visible fixed height on multi-column */}
						<div className='flex-shrink-0 mt-auto lg:mt-0 lg:h-20 xl:h-24 lg:flex lg:items-start lg:pt-4'>
							{pillar.stats.map((stat, index) => (
								<p
									key={index}
									className='text-white text-sm sm:text-base md:text-base lg:text-lg xl:text-xl leading-tight opacity-90'
								>
									• {stat}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ThreePillarsSection;
