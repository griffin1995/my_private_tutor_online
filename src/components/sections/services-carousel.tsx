'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationButton } from '@/components/ui/navigation-button';

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
	services,
	studentImages,
	className = '',
	title = 'Who We Support',
	description = 'We work with a wide range of learners, offering guidance and transformation at every level:',
}: ServicesCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			slidesToScroll: 1,
			containScroll: 'trimSnaps',
			align: 'start',
			skipSnaps: false,
			startIndex: 0,
			dragFree: false,
			duration: 25,
		},
		[
			Autoplay({
				delay: 5000,
				stopOnInteraction: true,
				stopOnMouseEnter: true,
				playOnInit: false,
			}),
		],
	);
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);
	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);
	const [isReady, setIsReady] = useState(false);
	const { ref: intersectionRef, inView } = useInView({
		triggerOnce: false,
		threshold: 0.3,
		rootMargin: '-100px 0px',
	});
	useEffect(() => {
		if (!emblaApi) return;
		const autoplay = emblaApi.plugins().autoplay;
		if (autoplay) {
			if (inView) {
				const timer = setTimeout(() => {
					autoplay.play();
					setIsReady(true);
				}, 200);
				return () => clearTimeout(timer);
			} else {
				autoplay.stop();
			}
		}
		return undefined;
	}, [emblaApi, inView]);
	return (
		<section
			className={`pt-16 lg:pt-24 pb-0 bg-white ${className}`}
			aria-label='Educational pathways and tutoring options available'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4'>
						{title}
					</h2>
					<p className='text-xl text-primary-700 max-w-3xl mx-auto mb-12'>
						{description}
					</p>

					{}
					<div
						ref={intersectionRef}
						className='relative max-w-7xl mx-auto flex items-center px-4 sm:px-0'>
						{}
						<button
							className='absolute left-2 sm:-left-24 top-1/2 -translate-y-1/2 z-10 bg-[#CA9E5B] hover:bg-[#b88b4c] border border-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'
							onClick={scrollPrev}
							aria-label='Previous slide'>
							<ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
						</button>

						{}
						<button
							className='absolute right-2 sm:-right-24 top-1/2 -translate-y-1/2 z-10 bg-[#CA9E5B] hover:bg-[#b88b4c] border border-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'
							onClick={scrollNext}
							aria-label='Next slide'>
							<ChevronRight className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
						</button>

						{}
						{}
						{}
						<div
							className={`overflow-hidden w-full transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
							ref={emblaRef}>
							<div className='flex -ml-4 pb-4'>
								{services.map((service, index) => {
									const serviceImageMapping = {
										Primary: 'primary-school-support',
										Secondary: 'secondary-school-support',
										'Entrance Exams': 'entrance-exam-preparation',
										'Uni & Beyond': 'university-and-beyond',
										'Online Homeschooling': 'online-homeschooling',
										'SEN Support': 'sen-support',
										'London In-Person': 'student-teacher-inside-comfortable',
									};
									const imageKey =
										serviceImageMapping[
											service.title as keyof typeof serviceImageMapping
										];
									const studentImage =
										service.featureImageUrl && service.featureImageAlt ?
											{
												src: service.featureImageUrl,
												alt: service.featureImageAlt,
												width: 600,
												height: 400,
											}
										:	studentImages[imageKey];
									return (
										<div
											key={index}
											className='flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 pb-4'>
											<div className='group bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform-gpu min-h-full'>
												{studentImage ?
													<div className='relative overflow-hidden h-[400px] lg:h-[500px]'>
														<Image
															{...getOptimizedImageProps(
																studentImage,
																'(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
															)}
															alt={service.title}
															className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
															priority={index < 3}
															loading={index < 3 ? 'eager' : 'lazy'}
														/>
														<div className='absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
													</div>
												:	<div className='relative overflow-hidden h-[400px] lg:h-[500px] bg-primary-100 flex items-center justify-center'>
														<span className='text-primary-400 text-4xl'>{service.icon}</span>
													</div>
												}

												<div className='p-6 lg:p-8 pb-8 space-y-4 text-right flex flex-col items-end'>
													<h3 className='text-xl lg:text-2xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors duration-200 w-full'>
														{service.title}
													</h3>
													<p className='text-primary-700 leading-relaxed text-base lg:text-lg w-full'>
														{service.description}
													</p>
													<div className='flex justify-end w-full'>
														<NavigationButton
															key={`button-${index}`}
															buttonColor='#ca9e5b'
															buttonTextColor='#ffffff'
															initialText='Learn More'
															changeText='View Details'
															href={
																{
																	Primary: '/subject-tuition#primary',
																	Secondary: '/subject-tuition#secondary',
																	'Entrance Exams': '/subject-tuition#entrance-exams',
																	'Uni & Beyond': '/subject-tuition#university-beyond',
																	'Online Homeschooling': '/homeschooling',
																	'SEN Support': '/subject-tuition#sen-neurodiverse',
																	'London In-Person': '/subject-tuition#london-in-person',
																}[service.title] || '/subject-tuition'
															}
														/>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export type { ServiceData, ServicesCarouselProps, StudentImageData };
