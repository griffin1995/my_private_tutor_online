'use client';

import { FeatureSection } from './feature-section';
import { StatsSection } from './stats-section';
import { Testimonial10 } from './testimonial-section';
import { Separator } from '@/components/ui/separator';
import type { Feature, Video } from './feature-section';

interface TabContentData {
	mainFeatures: {
		title?: string;
		description?: string;
		features: Feature[];
	};
	callOuts: {
		title?: string;
		features: Feature[];
	};
	stats: {
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
	};
	testimonial: {
		quote?: string;
		author?: {
			name: string;
			role: string;
			avatar: {
				src: string;
				alt: string;
			};
		};
	};
}

interface TabContentLayoutProps {
	data: TabContentData;
}

export function TabContentLayout({ data }: TabContentLayoutProps) {
	return (
		<div className='space-y-0'>
			{/* Feature13 block - FIRST - main cards section */}
			<FeatureSection
				title={data.mainFeatures.title}
				description={data.mainFeatures.description}
				features={data.mainFeatures.features}
			/>

			{/* Separator after main features */}
			<Separator className='my-8 bg-gray-300 w-[70%] mx-auto' />

			{/* Feature13 block - SECOND - call outs section (optional) */}
			{data.callOuts.features.length > 0 && (
				<>
					<div className='pt-4'>
						<FeatureSection title={data.callOuts.title} features={data.callOuts.features} />
					</div>
					{/* Separator after callouts */}
					<Separator className='my-12 bg-gray-300 w-[70%] mx-auto' />
				</>
			)}

			{/* Stats8 block - THIRD - stats row */}
			<div className='pt-4'>
				<StatsSection
					heading={data.stats.heading}
					description={data.stats.description}
					link={data.stats.link}
					stats={data.stats.stats}
				/>
			</div>

			{/* Separator after stats */}
			<Separator className='my-12 bg-gray-300 w-[70%] mx-auto' />

			{/* Testimonial10 block - FOURTH - testimonial section */}
			<div className='pt-4'>
				<Testimonial10 quote={data.testimonial.quote} author={data.testimonial.author} />
			</div>
		</div>
	);
}

export type { TabContentData, TabContentLayoutProps };
