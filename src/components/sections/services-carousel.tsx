'use client';

// PERFORMANCE OPTIMIZATION: Embla Carousel with Motion library and optimized intersection observer integration
// BEST PRACTICE 2025: Autoplay management based on viewport visibility for performance

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationButton } from '@/components/ui/navigation-button';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

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

	// Standardized intersection observer for autoplay management (2025 best practice)
	const { ref: intersectionRef, inView } = useInView({
		triggerOnce: false,
		threshold: 0.5, // Optimized threshold for carousel visibility
		rootMargin: '0px 0px 0px 0px', // No margin for precise autoplay control
	});

	// Separate intersection observer for animations
	const { ref: animationRef, inView: animationInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px', // Standardized animation trigger
	});

	// Optimized autoplay management with viewport detection
	useEffect(() => {
		if (!emblaApi) return;

		const autoplay = emblaApi.plugins().autoplay;
		if (autoplay) {
			if (inView) {
				// Performance optimization: slight delay to avoid unnecessary triggers
				const timer = setTimeout(() => {
					autoplay.play();
					setIsReady(true);
				}, 150);
				return () => clearTimeout(timer);
			} else {
				autoplay.stop();
				setIsReady(false); // Reset when out of view
			}
		}
		return undefined;
	}, [emblaApi, inView]);
	// Standardized animation variants
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: 'easeOut' }
	};

	return (
		<motion.section
			ref={animationRef}
			className={`pt-16 lg:pt-24 pb-0 bg-white ${className}`}
			aria-label='Educational pathways and tutoring options available'
			{...fadeInUp}
			animate={animationInView ? fadeInUp.animate : fadeInUp.initial}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					className='text-center mb-12'
					{...fadeInUp}
					animate={animationInView ? fadeInUp.animate : fadeInUp.initial}
					transition={{ ...fadeInUp.transition, delay: 0.1 }}>
					<motion.h2
						className='text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-0'
						{...fadeInUp}
						animate={animationInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.2 }}>
						{title}
					</motion.h2>
					<motion.p
						className='text-xl text-primary-700 max-w-3xl mx-auto mb-3'
						{...fadeInUp}
						animate={animationInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.3 }}>
						{description}
					</motion.p>

					{/* Navigation buttons positioned above the carousel */}
					<motion.div
						className='relative max-w-7xl mx-auto px-4 sm:px-0 mb-3'
						{...fadeInUp}
						animate={animationInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.4 }}>
						<div className='flex justify-end gap-2'>
							<motion.button
								className='bg-transparent hover:bg-accent-50 border border-accent-600 hover:border-accent-700 p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300'
								onClick={scrollPrev}
								aria-label='Previous slide'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}>
								<ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6 text-accent-600' />
							</motion.button>

							<motion.button
								className='bg-transparent hover:bg-accent-50 border border-accent-600 hover:border-accent-700 p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300'
								onClick={scrollNext}
								aria-label='Next slide'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}>
								<ChevronRight className='w-5 h-5 sm:w-6 sm:h-6 text-accent-600' />
							</motion.button>
						</div>
					</motion.div>

					<motion.div
						ref={intersectionRef}
						className='relative max-w-7xl mx-auto px-4 sm:px-0'
						{...fadeInUp}
						animate={animationInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.5 }}>
						<motion.div
							className='overflow-hidden w-full'
							ref={emblaRef}
							initial={{ opacity: 0 }}
							animate={isReady ? { opacity: 1 } : { opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}>
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
										<motion.div
											key={index}
											className='flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 pb-4'
											initial={{ opacity: 0, y: 20 }}
											animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
											transition={{
												duration: 0.6,
												ease: 'easeOut',
												delay: index * 0.1 + 0.2 // Staggered animation
											}}>
											<motion.div
												className='group bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform-gpu min-h-full'
												whileHover={{ y: -2, scale: 1.01 }}
												transition={{ duration: 0.3, ease: 'easeOut' }}>
												{studentImage ? (
													<>
														{/* Landscape aspect ratio for default/sm screens */}
														<div className='block lg:hidden'>
															<AspectRatio.Root ratio={4 / 3}>
																<div className='relative overflow-hidden w-full h-full'>
																	<Image
																		src={studentImage.src}
																		alt={service.title}
																		className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
																		priority={index < 3}
																		loading={index < 3 ? 'eager' : 'lazy'}
																		sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
																		fill
																	/>
																	<div className='absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
																</div>
															</AspectRatio.Root>
														</div>

														{/* Reduced height portrait aspect ratio for lg+ screens */}
														<div className='hidden lg:block'>
															<AspectRatio.Root ratio={6 / 7}>
																<div className='relative overflow-hidden w-full h-full'>
																	<Image
																		src={studentImage.src}
																		alt={service.title}
																		className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
																		priority={index < 3}
																		loading={index < 3 ? 'eager' : 'lazy'}
																		sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
																		fill
																	/>
																	<div className='absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
																</div>
															</AspectRatio.Root>
														</div>
													</>
												) : (
													<>
														{/* Fallback icon container - landscape for default/sm */}
														<div className='block lg:hidden'>
															<AspectRatio.Root ratio={4 / 3}>
																<div className='relative overflow-hidden w-full h-full bg-primary-100 flex items-center justify-center'>
																	<span className='text-primary-400 text-4xl'>{service.icon}</span>
																</div>
															</AspectRatio.Root>
														</div>

														{/* Fallback icon container - reduced height portrait for lg+ */}
														<div className='hidden lg:block'>
															<AspectRatio.Root ratio={6 / 7}>
																<div className='relative overflow-hidden w-full h-full bg-primary-100 flex items-center justify-center'>
																	<span className='text-primary-400 text-4xl'>{service.icon}</span>
																</div>
															</AspectRatio.Root>
														</div>
													</>
												)}

												<div className='p-6 lg:p-8 pb-8 space-y-4 text-right flex flex-col items-end'>
													<motion.h3
														className='text-xl lg:text-2xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors duration-200 w-full'
														initial={{ opacity: 0, y: 10 }}
														animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
														transition={{
															duration: 0.4,
															ease: 'easeOut',
															delay: index * 0.1 + 0.4
														}}>
														{service.title}
													</motion.h3>
													<motion.p
														className='text-primary-700 leading-relaxed text-base lg:text-lg w-full'
														initial={{ opacity: 0, y: 10 }}
														animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
														transition={{
															duration: 0.4,
															ease: 'easeOut',
															delay: index * 0.1 + 0.5
														}}>
														{service.description}
													</motion.p>
													<div className='flex justify-end w-full'>
														<motion.div
															initial={{ opacity: 0, scale: 0.95 }}
															animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
															transition={{
																duration: 0.3,
																ease: 'easeOut',
																delay: index * 0.1 + 0.6
															}}>
															<NavigationButton
															key={`button-${index}`}
															buttonColor='#ca9e5b' // accent-600 design token value
															buttonTextColor='#ffffff'
															initialText='Learn More'
															changeText='View Details'
															href={
																{
																	Primary: '/subject-tuition?tab=primary-school',
																	Secondary: '/subject-tuition?tab=secondary-school',
																	'Entrance Exams': '/subject-tuition?tab=entrance-exams',
																	'Uni & Beyond': '/subject-tuition?tab=university-admissions',
																	'Online Homeschooling': '/subject-tuition?tab=online-homeschooling',
																	'SEN Support': '/subject-tuition?tab=sen-support',
																	'London In-Person': '/subject-tuition?tab=london-in-person',
																}[service.title] || '/subject-tuition'
															}
														/>
														</motion.div>
													</div>
												</div>
											</motion.div>
										</motion.div>
									);
								})}
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
}
export type { ServiceData, ServicesCarouselProps, StudentImageData };
