'use client';

import { ArrowRight } from 'lucide-react';

interface StatsSectionProps {
	heading?: string;
	description?: string;
	link?: {
		text: string;
		url: string;
	};
	stats?: Array<{
		id: string;
		value: string;
		label: string;
	}>;
}

export const StatsSection = ({
	// heading = 'Statistics Section Main Heading',
	// description = 'Statistics section description text goes here',
	// link = {
	// 	text: 'Link text for statistics',
	// 	url: '#',
	// },
	// stats = [
	// 	{
	// 		id: 'stat-1',
	// 		value: 'Stat Value',
	// 		label: 'Statistic description label text',
	// 	},
	// 	{
	// 		id: 'stat-2',
	// 		value: 'Stat Value',
	// 		label: 'Statistic description label text',
	// 	},
	// 	{
	// 		id: 'stat-3',
	// 		value: 'Stat Value',
	// 		label: 'Statistic description label text',
	// 	},
	// 	{
	// 		id: 'stat-4',
	// 		value: 'Stat Value',
	// 		label: 'Statistic description label text',
	// 	},
	// ],
	heading,
	description,
	link,
	stats = [],
}: StatsSectionProps) => {
	// Pad stats to always have 4 items using fallback data
	const paddedStats = [...stats];
	while (paddedStats.length < 4) {
		paddedStats.push({
			id: `stat-fallback-${paddedStats.length + 1}`,
			value: '',
			label: '',
		});
	}

	return (
		<section className='py-8'>
			<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl font-bold md:text-4xl'>{heading}</h2>
					<p>{description}</p>
					{link && (
						<a
							href={link.url}
							className='flex items-center gap-1 font-bold hover:underline'>
							{link.text}
							<ArrowRight className='h-auto w-4' />
						</a>
					)}
				</div>
				<div className='mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4'>
					{paddedStats.map((stat) => (
						<div
							key={stat.id}
							className='flex flex-col gap-5'>
							<div className='text-6xl font-bold'>{stat.value}</div>
							<p>{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
