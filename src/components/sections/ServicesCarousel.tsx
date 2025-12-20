'use client';

// Simple Services Carousel without motion dependencies
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationButton } from '@/components/ui/navigation-button';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { HeadingText, BodyText, TitleText } from '@/components/ui/typography';

// Helper function for image optimization (CMS-free)
const getOptimizedImageProps = (
	image: { src: string; alt: string; width: number; height: number },
	sizes: string,
) => {
	return {
		src: image.src,
		alt: image.alt,
		width: image.width,
		height: image.height,
		sizes: sizes,
	};
};

interface ServiceData {
	title: string;
	description: string;
	features: string[];
	targetAudience: string;
	icon: string;
	featureImageUrl?: string;
	featureImageAlt?: string;
}

interface StudentImageData {
	src: string;
	alt: string;
	width: number;
	height: number;
}

interface ServicesCarouselProps {
	services: ServiceData[];
	studentImages: Record<string, StudentImageData>;
	className?: string;
	title?: string;
	description?: string;
}

export function ServicesCarousel({
	services = [],
	studentImages = {},
	className = '',
	title = 'Who We Support',
	description = 'Tailored tutoring programmes for every educational stage',
}: ServicesCarouselProps) {
	const [isPlaying, setIsPlaying] = useState(false);

	// Intersection Observer for performance optimization - only play when visible
	const { ref: carouselRef, inView } = useInView({
		threshold: 0.3,
		rootMargin: '-100px 0px',
	});

	const autoplayOptions = {
		delay: 4000,
		stopOnInteraction: true,
		stopOnMouseEnter: true,
		playOnInit: false,
	};

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			align: 'start',
			loop: true,
			skipSnaps: false,
			slidesToScroll: 1,
		},
		[Autoplay(autoplayOptions)],
	);

	// Control autoplay based on viewport visibility
	useEffect(() => {
		if (emblaApi) {
			if (inView && !isPlaying) {
				emblaApi.plugins().autoplay?.play();
				setIsPlaying(true);
			} else if (!inView && isPlaying) {
				emblaApi.plugins().autoplay?.stop();
				setIsPlaying(false);
			}
		}
	}, [emblaApi, inView, isPlaying]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
	}, [emblaApi, onSelect]);

	return (
		<section
			ref={carouselRef}
			className={`py-16 lg:py-24 bg-gradient-to-br from-white to-slate-50 ${className}`}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center mb-12 lg:mb-16'>
					<HeadingText variant="primary" level={2} responsive className='mb-4'>
						{title}
					</HeadingText>
					<BodyText variant="large" className='max-w-2xl mx-auto text-neutral-600'>
						{description}
					</BodyText>
				</div>

				{/* Carousel Container */}
				<div className='relative max-w-7xl mx-auto'>
					<div
						className='embla overflow-hidden rounded-xl'
						ref={emblaRef}>
						<div className='embla__container flex'>
							{services.map((service, index) => {
								// Map service data to student image keys
								const imageKeyMap: Record<string, string> = {
									'Primary School Support': 'primary-school-support',
									'Secondary School Support': 'secondary-school-support',
									'Entrance Exam Preparation': 'entrance-exam-preparation',
									'University & Beyond': 'university-and-beyond',
									'Online Homeschooling': 'online-homeschooling',
									'SEN Support': 'sen-support',
								};

								const imageKey = imageKeyMap[service.title] || 'student-child';
								const studentImage = studentImages[imageKey];

								return (
									<div
										key={index}
										className='embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pr-4'>
										<div className='bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden h-full'>
											{/* Service Image */}
											{studentImage && (
												<div className='relative h-48'>
													<AspectRatio.Root ratio={16 / 9}>
														<Image
															{...getOptimizedImageProps(
																studentImage,
																'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
															)}
															fill
															className='object-cover'
															loading='lazy'
														/>
													</AspectRatio.Root>
												</div>
											)}

											{/* Service Content */}
											<div className='p-6'>
												<div className='flex items-start justify-between mb-4'>
													<TitleText level={3} className='text-xl font-bold text-primary-700 mb-2'>
														{service.title}
													</TitleText>
													<div className='text-2xl ml-2 flex-shrink-0'>
														{service.icon}
													</div>
												</div>

												<BodyText className='text-neutral-600 mb-4 line-clamp-3'>
													{service.description}
												</BodyText>

												<div className='mb-4'>
													<BodyText className='text-sm font-medium text-neutral-800 mb-2'>
														Key Features:
													</BodyText>
													<ul className='text-sm text-neutral-600 space-y-1'>
														{service.features.slice(0, 3).map((feature, idx) => (
															<li key={idx} className='flex items-start'>
																<span className='text-accent-600 mr-2'>•</span>
																{feature}
															</li>
														))}
													</ul>
												</div>

												<div className='pt-4 border-t border-neutral-100'>
													<BodyText className='text-xs text-neutral-500 mb-3'>
														{service.targetAudience}
													</BodyText>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Navigation Controls */}
					<div className='flex items-center justify-between mt-8'>
						<div className='flex gap-4'>
							<button
								className={`p-3 rounded-full transition-colors duration-200 ${
									prevBtnDisabled
										? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
										: 'bg-primary-700 text-white hover:bg-primary-800'
								}`}
								onClick={scrollPrev}
								disabled={prevBtnDisabled}
								aria-label="Previous services">
								<ChevronLeft className='h-5 w-5' />
							</button>
							<button
								className={`p-3 rounded-full transition-colors duration-200 ${
									nextBtnDisabled
										? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
										: 'bg-primary-700 text-white hover:bg-primary-800'
								}`}
								onClick={scrollNext}
								disabled={nextBtnDisabled}
								aria-label="Next services">
								<ChevronRight className='h-5 w-5' />
							</button>
						</div>

						<NavigationButton
							variant='primary'
							initialText='Get Started'
							changeText='Book Consultation'
							href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}