'use client';

import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { Star } from 'lucide-react';
import { getTestimonialVideos } from '@/lib/cms/cms-images';
interface TestimonialVideo {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoSrc: string;
	readonly thumbnailSrc: string;
	readonly duration?: number;
	readonly featured?: boolean;
	readonly category?:
		| 'all'
		| '11+'
		| 'GCSE'
		| 'A-Level'
		| 'Oxbridge'
		| 'International';
	readonly testimonialAuthor?: string;
	readonly testimonialRole?: string;
	readonly viewCount?: number;
	readonly rating?: number;
	readonly uploadDate?: string;
}
interface TestimonialsVideoSectionProps {
	className?: string;
	backgroundColor?: string;
	title?: string;
	description?: string;
	videos?: TestimonialVideo[];
	maxVideos?: number;
}
export function TestimonialsVideoSection({
	className = '',
	backgroundColor = 'bg-slate-50',
	title = 'Hear From Our Families',
	description = 'Watch real testimonials from parents and students who have achieved exceptional results with My Private Tutor Online.',
	videos,
	maxVideos = 4,
}: TestimonialsVideoSectionProps) {
	const cmsVideos = videos || getTestimonialVideos();
	const displayVideos = cmsVideos.slice(0, maxVideos);
	const formatDuration = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};
	return (
		<section className={`py-16 lg:py-24 ${backgroundColor} ${className}`}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<divh2
							className='text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-primary-900 mb-6'
								opacity: 0,
								y: 30,
							}}
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
								margin: '-100px',
							}}
								duration: 0.8,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.1,
							}}>
							{title}
						</divh2>

						<divp
							className='text-xl text-primary-700 leading-relaxed max-w-3xl mx-auto'
								opacity: 0,
								y: 30,
							}}
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
								margin: '-100px',
							}}
								duration: 0.8,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.3,
							}}>
							{description}
						</divp>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{displayVideos.map((video, index) => (
							<divdiv
								key={video.id}
								className='group relative'
									opacity: 0,
									y: 50,
								}}
									opacity: 1,
									y: 0,
								}}
								viewport={{
									once: true,
									margin: '-100px',
								}}
									duration: 0.8,
									ease: [0.25, 0.46, 0.45, 0.94],
									delay: index * 0.2,
								}}
									scale: 1.02,
									y: -8,
									transition: {
										type: 'spring',
										stiffness: 400,
										damping: 30,
									},
								}}>
								<div
									className='relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 group-hover:border-accent-400/60 transition-all duration-500'
									role='region'
									aria-labelledby={`video-title-${video.id}`}
									aria-describedby={`video-description-${video.id}`}>
									{video.featured && (
										<div className='absolute top-4 left-4 z-20'>
											<div
												className='inline-flex items-center gap-1 px-3 py-1.5 bg-accent-600 text-white rounded-full text-sm font-semibold shadow-lg'
												role='badge'
												aria-label={`Featured testimonial video: ${video.title}`}>
												<Star
													className='w-4 h-4 fill-current'
													aria-hidden='true'
												/>
												Featured
											</div>
										</div>
									)}

									{video.duration && (
										<div className='absolute top-4 right-4 z-20'>
											<div
												className='px-2 py-1 bg-black/70 text-white rounded text-sm font-medium'
												role='timer'
												aria-label={`Video duration: ${formatDuration(video.duration)}`}>
												{formatDuration(video.duration)}
											</div>
										</div>
									)}

									<div
										className='relative'
										style={{
											paddingBottom: '56.25%',
										}}>
										<div className='absolute inset-0'>
											<HeroVideoDialog
												videoSrc={video.videoSrc}
												thumbnailSrc={video.thumbnailSrc}
												thumbnailAlt={video.title}
												animationStyle='from-center'
												className='w-full h-full'
											/>
										</div>
									</div>

									<div className='p-6'>
										<h3
											id={`video-title-${video.id}`}
											className='text-xl font-serif font-bold text-primary-900 mb-3 group-hover:text-primary-800 transition-colors duration-300'>
											{video.title}
										</h3>

										<p
											id={`video-description-${video.id}`}
											className='text-primary-700 leading-relaxed mb-4'>
											{video.description}
										</p>

										<div className='flex items-center justify-between text-sm text-primary-600'>
											<div className='flex items-center gap-2'>
												{video.testimonialAuthor && (
													<span className='font-medium'>{video.testimonialAuthor}</span>
												)}
												{video.testimonialRole && (
													<span className='text-primary-500'>• {video.testimonialRole}</span>
												)}
											</div>

											{video.rating && (
												<div
													className='flex items-center gap-1'
													role='img'
													aria-label={`Rating: ${video.rating} out of 5 stars`}>
													{[...Array(video.rating)].map((_, i) => (
														<Star
															key={i}
															className='w-4 h-4 text-accent-500 fill-current'
															aria-hidden='true'
														/>
													))}
												</div>
											)}
										</div>
									</div>
								</div>
							</divdiv>
						))}
					</div>

					<div className='text-center mt-12'>
						<divp
							className='text-lg text-primary-700 mb-6'
								opacity: 0,
								y: 20,
							}}
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
								margin: '-100px',
							}}
								duration: 0.8,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.6,
							}}>
							Ready to join our community of successful families?
						</divp>

						<divbutton
							className='inline-flex items-center gap-2 px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
								opacity: 0,
								y: 20,
							}}
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
								margin: '-100px',
							}}
								duration: 0.8,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.8,
							}}
								scale: 1.05,
							}}
								scale: 0.95,
							}}>
							Start Your Journey
						</divbutton>
					</div>
				</div>
			</div>
		</section>
	);
}
;
