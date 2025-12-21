'use client';

import { useInView } from 'react-intersection-observer';
import { Separator } from '@/components/ui/separator';
import { HeadingText, BodyText } from '@/components/ui/typography';
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
		title: '95% pass rate at 11+',
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
	// Standardized intersection observer
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	return (
		<div
			ref={ref}
			className={`py-6 sm:py-7 md:py-8 lg:py-10 xl:py-12 ${className}`}>
			<div className='container mx-auto px-2 sm:px-4 md:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-2 max-w-full 2xl:max-w-7xl mx-auto'>
					{pillarsData.map((pillar, index) => (
						<PillarCard
							key={pillar.id}
							pillar={pillar}
							index={index}
							inView={inView}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
interface PillarCardProps {
	pillar: PillarData;
	index: number;
	inView: boolean;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar, index, inView }) => {
	const bgClass = getBgClass(pillar.id);

	return (
		<div
			className='group h-full'>
			<div className='shadow-xl overflow-hidden h-full'>
				{/* Breakpoint-specific sizing: aspect ratios for single column, further increased height for multi-column */}
				<div
					className={`${bgClass} relative w-full aspect-[8/5] sm:aspect-[2/1] md:aspect-[5/2] lg:h-full lg:min-h-[710px]`}>
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
							<div>
								<HeadingText
									variant="primary"
									level={3}
									className="text-white leading-tight"
									responsive
								>
									{pillar.title}
								</HeadingText>
							</div>
						</div>

						{/* Separator - responsive spacing */}
						<div className='flex-shrink-0 py-3 sm:py-4 lg:py-6'>
							<div style={{ transformOrigin: 'left' }}>
								<Separator className='bg-white/30' />
							</div>
						</div>

						{/* Description - flexible on single column, controlled height on multi-column for alignment */}
						<div className='flex-1 lg:flex-none lg:h-72 xl:h-80 flex flex-col justify-center lg:justify-start lg:overflow-hidden'>
							<div>
								<BodyText
									variant="large"
									className="text-white leading-snug lg:leading-relaxed"
									responsive
								>
									{pillar.description}
								</BodyText>
							</div>
						</div>

						{/* Stats section - flexible on single column, visible fixed height on multi-column */}
						<div className='flex-shrink-0 mt-auto lg:mt-0 lg:h-20 xl:h-24 lg:flex lg:items-start lg:pt-6'>
							{pillar.stats.map((stat, statIndex) => (
								<div
									key={statIndex}
									className="flex items-start">
									<BodyText
										variant="default"
										className="text-white leading-tight opacity-90"
										responsive
									>
										• {stat}
									</BodyText>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ThreePillarsSection;
