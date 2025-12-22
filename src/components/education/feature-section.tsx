'use client';

import type { LucideIcon } from 'lucide-react';
import { Play, X } from 'lucide-react';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HeadingText, BodyText, CaptionText } from '@/components/ui/typography';

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

interface VideoModalProps {
	readonly videoUrl: string;
	readonly thumbnailUrl: string;
	readonly alt: string;
}

function VideoModal({ videoUrl, thumbnailUrl, alt }: VideoModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<div className='relative group'>
				<Dialog.Trigger asChild>
					<div className='w-full h-full cursor-pointer'>
						<div className='relative border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] overflow-hidden group-hover:border-opacity-100 transition-all duration-300'>
							<img
								src={thumbnailUrl}
								alt={alt}
								style={{
									aspectRatio: '16/9',
								}}
								className='w-full h-full object-cover'
							/>

							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='bg-black/60 rounded-full p-6 group-hover:bg-black/80 group-hover:scale-110 transition-all duration-300'>
									<Play className='w-12 h-12 text-white fill-white' />
								</div>
							</div>
						</div>
					</div>
				</Dialog.Trigger>
			</div>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]' />

				<Dialog.Content className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[10000] w-[90vw] max-w-6xl'>
					<Dialog.Close className='absolute -top-12 right-0 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50'>
						<X className='w-6 h-6' />
					</Dialog.Close>

					<div
						className='relative w-full'
						style={{
							aspectRatio: '16/9',
						}}>
						{videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
							<iframe
								src={videoUrl}
								className='w-full h-full shadow-2xl border border-white rounded-lg'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
								title={alt}
							/>
						) : (
							<video
								src={videoUrl}
								className='w-full h-full shadow-2xl object-contain border border-white rounded-lg'
								controls
								autoPlay
								playsInline
								preload='metadata'
							/>
						)}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
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
						<HeadingText
							variant="secondary"
							level={2}
							responsive
							className='text-pretty'>
		{title}
						</HeadingText>
						{description && (
							<BodyText
								variant="large"
								className='mt-6 text-muted-foreground'>
		{description}
							</BodyText>
						)}
					</div>
				)}
				<div className='grid gap-8 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3'>
					{features.map((feature) => (
						<div
							key={feature.id}
							className='bg-muted flex flex-col'>
							<div className='flex xl:flex-col 2xl:flex-row justify-between xl:justify-start 2xl:justify-between gap-10 xl:gap-0 2xl:gap-10 border-b'>
								<div className='flex flex-col justify-start justify-between gap-8 py-6 pl-4 md:gap-14 md:py-10 md:pl-8 xl:px-8 2xl:pl-8 lg:justify-normal min-w-0 xl:order-2 2xl:order-1'>
									{feature.label && (
										<CaptionText
											variant="muted"
											className='font-mono'>
		{feature.label}
										</CaptionText>
									)}
									{feature.url ? (
										<a href={feature.url}>
											<HeadingText
												level={3}
												responsive
												className='hover:text-primary transition-all hover:opacity-80 break-words'>
		{feature.heading}
											</HeadingText>
										</a>
									) : (
										<HeadingText
											level={3}
											responsive
											className='break-words'>
		{feature.heading}
										</HeadingText>
									)}
								</div>
								<div className='md:1/3 w-2/5 xl:w-full 2xl:w-2/5 shrink-0 border-l xl:border-l-0 xl:border-t 2xl:border-l 2xl:border-t-0 xl:order-1 2xl:order-2'>
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
							<BodyText
								variant="muted"
								className='p-4 md:p-8'>
		{feature.description}
							</BodyText>
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
														{video.isFree && video.youtubeUrl ? (
															<VideoModal
																videoUrl={video.youtubeUrl}
																thumbnailUrl={video.thumbnailSrc}
																alt={video.thumbnailAlt}
															/>
														) : (
															<a
																href={video.purchaseLink || '#'}
																target='_blank'
																rel='noopener noreferrer'
																className='relative group cursor-pointer block w-full h-full'>
																<div className='w-full h-full'>
																	<img
																		src={video.thumbnailSrc}
																		alt={video.thumbnailAlt}
																		className='w-full h-full object-cover border border-[#3F4A7E] group-hover:border-accent-600 shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]'
																		style={{
																			aspectRatio: '16/9',
																		}}
																	/>
																	<div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
																		<BodyText
																			className='text-white group-hover:text-accent-600 group-hover:underline font-medium drop-shadow-lg transition-all duration-200 ease-out'>
		{video.isFree ? 'Watch Free' : 'Purchase Access'}
																		</BodyText>
																	</div>
																</div>
															</a>
														)}
													</div>
												</div>
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

export type {  Feature,  };
