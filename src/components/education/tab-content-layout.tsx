'use client';

import { Cta10 } from '@/components/cta10';
import { Separator } from '@/components/ui/separator';
import type { Feature } from './feature-section';
import { FeatureSection } from './feature-section';
import { StatsSection, type StatsItem } from './stats-section';
import { Testimonial10 } from './testimonial-section';

interface TabContentData {
	tabName: string;
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
		stats?: readonly StatsItem[];
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

interface TabContentLayoutProps {
	data: TabContentData;

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
						<FeatureSection
							title={data.callOuts.title}
							features={data.callOuts.features}
						/>
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
				<Testimonial10
					quote={data.testimonial.quote}
					author={data.testimonial.author}
				/>
			</div>

			{/* Separator after stats */}
			<Separator className='my-12 bg-gray-300 w-[70%] mx-auto' />

			{/* cta block */}
			<div className='pt-4'>
				<Cta10
					heading={`Enquire about ${data.tabName}`}
					description="Get in touch to discuss your child's educational requirements and discover how our personalised tutoring approach can help them achieve their academic goals with confidence and success."
					buttons={{
						primary: {
							text: 'Request Free Consultation',
							url: 'https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~',
						},
						secondary: {
							text: 'Learn Our Process',
							url: '/how-it-works',
						},
				/>
			</div>
		</div>
	);

export type { TabContentData,  };
