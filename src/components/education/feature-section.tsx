'use client';

import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import type { LucideIcon } from 'lucide-react';

interface Video {
	id: string;
	youtubeUrl: string;
	thumbnailSrc: string;
	thumbnailAlt: string;
	isFree: boolean;
	purchaseLink?: string;
}

interface Feature {
	id: string;
	heading: string;
	label?: string;
	description: string;
	image?: string;
	icon?: LucideIcon;
	url?: string;
	videos?: Video[];
}

interface FeatureSectionProps {
	title?: string;
	description?: string;
	features: Feature[];
}

export const FeatureSection = ({
	// title = 'Feature Section Main Heading',
	title,
	description,
	// features = [
	// 	{
	// 		id: 'feature-1',
	// 		heading: 'Feature Card Heading',
	// 		label: 'SUB HEADING',
	// 		description: 'Feature card description text goes here.',
	// 		image:
	// 			'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
	// 		url: '#',
	// 	},
	// 	{
	// 		id: 'feature-2',
	// 		heading: 'Feature Card Heading',
	// 		label: 'SUB HEADING',
	// 		description: 'Feature card description text goes here.',
	// 		image:
	// 			'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg',
	// 		url: '#',
	// 	},
	// 	{
	// 		id: 'feature-3',
	// 		heading: 'Feature Card Heading',
	// 		label: 'SUB HEADING',
	// 		description: 'Feature card description text goes here.',
	// 		image:
	// 			'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg',
	// 		url: '#',
	// 	},
	// 	{
	// 		id: 'feature-4',
	// 		heading: 'Feature Card Heading',
	// 		label: 'SUB HEADING',
	// 		description: 'Feature card description text goes here.',
	// 		image:
	// 			'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg',
	// 		url: '#',
	// 	},
	// ],
	features = [],
}: FeatureSectionProps) => {
	return (
		<section className='py-8'>
			<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8'>
				{title && (
					<div className='mx-auto mb-16 max-w-3xl text-center'>
						<h2 className='text-pretty text-4xl font-medium lg:text-5xl'>{title}</h2>
						{description && (
							<p className='mt-6 text-lg text-muted-foreground'>{description}</p>
						)}
					</div>
				)}
				<div className='grid gap-8 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3'>
					{features.map((feature) => (
						<div
							key={feature.id}
							className='bg-muted flex flex-col'>
							<div className='flex justify-between gap-10 border-b'>
								<div className='flex flex-col justify-start justify-between gap-8 py-6 pl-4 md:gap-14 md:py-10 md:pl-8 lg:justify-normal min-w-0'>
									{feature.label && (
										<span className='text-muted-foreground font-mono text-xs'>
											{feature.label}
										</span>
									)}
									{feature.url ? (
										<a href={feature.url}>
											<h3 className='hover:text-primary text-2xl transition-all hover:opacity-80 sm:text-3xl lg:text-4xl break-words'>
												{feature.heading}
											</h3>
										</a>
									) : (
										<h3 className='text-2xl sm:text-3xl lg:text-4xl break-words'>
											{feature.heading}
										</h3>
									)}
								</div>
								<div className='md:1/3 w-2/5 shrink-0 border-l'>
									{feature.icon ? (
										<div className='h-full w-full flex items-center justify-center bg-primary-100 p-6'>
											<feature.icon className="h-16 w-16 text-primary-600" />
										</div>
									) : feature.image ? (
										<a href={feature.url}>
											<img
												src={feature.image}
												alt={feature.heading}
												className='h-full w-full object-cover transition-opacity hover:opacity-80'
											/>
										</a>
									) : (
										<div className='h-full w-full bg-primary-100'></div>
									)}
								</div>
							</div>
							<p className='text-muted-foreground p-4 md:p-8'>{feature.description}</p>
							{feature.videos && feature.videos.length > 0 && (
								<div className='border-t p-4 md:p-8'>
									<div className='space-y-6'>
										{feature.videos.map((video) => (
											<div key={video.id}>
												<div
													className='relative'
													style={{
														paddingBottom: '56.25%',
													}}>
													<div className='absolute inset-0'>
														<HeroVideoDialog
															videoSrc={video.youtubeUrl}
															thumbnailSrc={video.thumbnailSrc}
															thumbnailAlt={video.thumbnailAlt}
															animationStyle='from-center'
															className='w-full h-full'
														/>
													</div>
												</div>
												{video.purchaseLink && (
													<div className='mt-3 text-center'>
														<a
															href={video.purchaseLink}
															className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'>
															{video.isFree ? 'Watch Free' : 'Purchase Access'}
														</a>
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export type { Video, Feature, FeatureSectionProps };
