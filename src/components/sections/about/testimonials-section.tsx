'use client';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { getTestimonialVideos } from '@/lib/cms/cms-content';
import { Button } from '@/components/ui/button-variants';

interface TestimonialsSectionProps {
	backgroundColor?: string;
	className?: string;
	showMoreButton?: boolean;
}
export function TestimonialsSection({
	backgroundColor = 'bg-white',
	className = '',
	showMoreButton = false,
}: TestimonialsSectionProps) {
	return (
		<section
			className={`relative ${backgroundColor} py-12 lg:py-16 ${className}`}>
			<div
				className='absolute inset-0 opacity-[0.015] pointer-events-none'
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
					backgroundSize: '40px 40px',
				}}
			/>


			<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid lg:grid-cols-2 gap-8 lg:gap-10'>
						{(() => {
							const testimonialVideos = getTestimonialVideos();
							const parentVideo = testimonialVideos.find(
								(video) => video.id === 'parents-testimonials-2025',
							);
							const studentVideo = testimonialVideos.find(
								(video) => video.id === 'students-testimonials-2025',
							);
							return (
								<>
									<div className='relative'>
										{parentVideo && (
											<div className='relative w-full aspect-video'>
												<HeroVideoDialog
													videoSrc={parentVideo.videoSrc}
													thumbnailSrc={parentVideo.thumbnailSrc}
													thumbnailAlt={parentVideo.description}
													className='w-full'
													animationStyle='from-center'
												/>
											</div>
										)}
									</div>

									<div className='relative'>
										{studentVideo && (
											<div className='relative w-full aspect-video'>
												<HeroVideoDialog
													videoSrc={studentVideo.videoSrc}
													thumbnailSrc={studentVideo.thumbnailSrc}
													thumbnailAlt={studentVideo.description}
													className='w-full'
													animationStyle='from-center'
												/>
											</div>
										)}
									</div>
								</>
							);
						})()}
					</div>

					{/* "Hear more from our clients" button - conditionally rendered */}
					{showMoreButton && (
						<div className='mt-8 lg:mt-12 flex justify-center'>
							<Button
								variant='gold'
								size='lg'
								aria-label='View more client testimonials'>
								Hear more from our clients
							</Button>
						</div>
					)}
				</div>
			</div>

		</section>
	);
}
;
