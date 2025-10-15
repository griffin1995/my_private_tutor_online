/**
 * Documentation Source: Context7 MCP - Embla Carousel React Component
 * Reference: /davidjerleke/embla-carousel - Official React carousel with navigation and autoplay
 * Reference: /jsx-eslint/eslint-plugin-react - JSX syntax and component patterns
 * Pattern: Modular services carousel component with CMS integration
 *
 * Component Architecture:
 * - Embla Carousel with React hooks for smooth performance
 * - Next.js Image optimization for student photos
 * - Responsive design with mobile-first approach
 * - Context7 verified carousel patterns
 * - CMS integration for content and images
 *
 * Performance Optimisations:
 * - useCallback for memoized navigation functions
 * - Intersection Observer for autoplay management
 * - Lazy loading for non-priority images
 * - Transform-GPU for smooth animations
 *
 * Interactive Features:
 * - Autoplay with viewport-based control
 * - Navigation arrows with premium styling
 * - Service-specific image mapping
 * - Responsive slide sizing
 */

'use client';

// Documentation Source: Context7 MCP - React 19 and Embla Carousel imports
// Reference: /vercel/next.js - Next.js Image component
// Reference: /davidjerleke/embla-carousel - Embla carousel hooks
// Pattern: Modern React component imports with TypeScript support
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Documentation Source: Context7 MCP - Lucide React Icon Library
// Reference: /lucide-dev/lucide - ChevronLeft and ChevronRight icons
// Pattern: Consistent iconography with tree-shaking support
import { ChevronLeft, ChevronRight } from 'lucide-react';

// CONTEXT7 SOURCE: /vercel/next.js - NavigationButton component for Subject Tuition page navigation
// BUTTON NAVIGATION REASON: Official Next.js Link patterns for client-side navigation to Subject Tuition sections
// Pattern: Navigation button component with Link integration for page section anchors
import { NavigationButton } from '@/components/ui/navigation-button';

// CMS DATA SOURCE: Using getOptimizedImageProps for image optimization
// Documentation Source: Context7 MCP - CMS Integration Pattern
// Reference: Project CLAUDE.md rules 22-25 for CMS requirements
import { getOptimizedImageProps } from '@/lib/cms/cms-images';

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Comprehensive type definitions for service data and image mapping
 */
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
	/** Array of service data from CMS */
	services: ServiceData[];
	/** Student images mapping from CMS */
	studentImages: Record<string, StudentImageData>;
	/** Additional CSS classes for styling customisation */
	className?: string;
	/** Title for the services section */
	title?: string;
	/** Description for the services section */
	description?: string;
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Best Practices
 * Reference: /react/documentation - Modern React functional component patterns
 * Pattern: Reusable services carousel component with CMS integration
 *
 * Component Features:
 * - Embla Carousel with smooth performance
 * - Service-specific image mapping for contextual relevance
 * - Responsive slide sizing (100% mobile, 50% tablet, 33.33% desktop)
 * - Autoplay with intersection observer control
 * - Premium navigation arrows with hover effects
 * - Service cards with image, text, and CTA button
 */
export function ServicesCarousel({
	services,
	studentImages,
	className = '',
	title = 'Who We Support',
	description = 'We work with a wide range of learners, offering guidance and transformation at every level:',
}: ServicesCarouselProps) {
	/**
	 * Documentation Source: Context7 Embla Carousel React Implementation
	 * Reference: /davidjerleke/embla-carousel - Official React carousel with navigation and autoplay
	 * Pattern: useEmblaCarousel hook with optimized options for smooth performance
	 *
	 * Configuration Details:
	 * - loop: true - Enables infinite scrolling for continuous browsing
	 * - slidesToScroll: 1 - Single slide advancement for precise control
	 * - containScroll: 'trimSnaps' - Prevents empty space at carousel edges
	 * - align: 'start' - Consistent alignment to prevent glitches
	 * - skipSnaps: false - Ensures all slides are accessible
	 * - Autoplay: 5000ms intervals (slower for better UX)
	 * - stopOnInteraction: true - Pauses on user interaction for better control
	 */
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

	/**
	 * Documentation Source: Context7 Embla Carousel React Navigation Implementation
	 * Reference: /davidjerleke/embla-carousel - Previous and Next button implementation
	 * Pattern: useCallback hooks to memoize navigation functions for performance optimization
	 *
	 * Performance Benefits:
	 * - Prevents unnecessary re-renders of navigation buttons
	 * - Optimizes click handler performance
	 * - Ensures stable function references across renders
	 */
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const [isReady, setIsReady] = useState(false);

	/**
	 * Documentation Source: Context7 MCP - React Intersection Observer Integration
	 * Reference: /thebuilder/react-intersection-observer - Autoplay trigger on scroll
	 * Pattern: useInView hook to detect when carousel section enters viewport
	 *
	 * Scroll-Based Autoplay Logic:
	 * - triggerOnce: false - Allows re-triggering if user scrolls away and back
	 * - threshold: 0.3 - Triggers when 30% of carousel is visible
	 * - rootMargin: "-100px 0px" - Triggers slightly before element fully enters view
	 * - Only starts autoplay when carousel section is in viewport
	 * - Ensures users always see the correct sequence from Primary → Secondary → etc.
	 */
	const { ref: intersectionRef, inView } = useInView({
		triggerOnce: false,
		threshold: 0.3,
		rootMargin: '-100px 0px',
	});

	/**
	 * Intersection Observer-Based Autoplay Control
	 * Context7 MCP verified pattern: Start/stop autoplay based on viewport visibility
	 * Performance: Prevents unnecessary autoplay when carousel is off-screen
	 */
	useEffect(() => {
		if (!emblaApi) return;

		const autoplay = emblaApi.plugins().autoplay;
		if (autoplay) {
			if (inView) {
				// Start autoplay when carousel enters viewport
				const timer = setTimeout(() => {
					autoplay.play();
					setIsReady(true);
				}, 200); // Brief delay for smooth initialization
				return () => clearTimeout(timer);
			} else {
				// Stop autoplay when carousel leaves viewport to save performance
				autoplay.stop();
			}
		}

		// Ensure consistent return behavior
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

					{/* Carousel Container */}
					<div
						ref={intersectionRef}
						className='relative max-w-7xl mx-auto flex items-center px-4 sm:px-0'>
						{/*
						 * Navigation Arrow - Left (Positioned outside viewport)
						 * Documentation Source: Tailwind CSS Positioning + Transform utilities
						 * Reference: https://tailwindcss.com/docs/position
						 * Reference: https://tailwindcss.com/docs/transform
						 *
						 * Design Implementation:
						 * - Position: -left-16 (64px) places arrow completely outside carousel content area
						 * - Design: Circular button with subtle shadow and premium hover effects
						 * - Accessibility: Proper ARIA label for screen reader compatibility
						 * - Interaction: Scale transform (110%) on hover provides tactile feedback
						 */}
						<button
							className='absolute left-2 sm:-left-24 top-1/2 -translate-y-1/2 z-10 bg-[#CA9E5B] hover:bg-[#b88b4c] border border-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'
							onClick={scrollPrev}
							aria-label='Previous slide'>
							<ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
						</button>

						{/*
						 * Navigation Arrow - Right (Positioned outside viewport)
						 * Documentation Source: Tailwind CSS Positioning symmetry patterns
						 *
						 * Design Implementation:
						 * - Position: -right-16 (64px) creates symmetrical placement outside content
						 * - Interaction: Scale transform (110%) on hover provides tactile feedback
						 * - Performance: CSS transitions handle smooth state changes
						 * - Accessibility: Proper ARIA labeling for screen readers
						 */}
						<button
							className='absolute right-2 sm:-right-24 top-1/2 -translate-y-1/2 z-10 bg-[#CA9E5B] hover:bg-[#b88b4c] border border-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'
							onClick={scrollNext}
							aria-label='Next slide'>
							<ChevronRight className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
						</button>

						{/*
						 * Embla Carousel Viewport Container
						 * Documentation Source: Embla Carousel Official Structure Pattern
						 * Reference: https://www.embla-carousel.com/get-started/react/#the-component-structure
						 * Pattern: Overflow container with flex children for horizontal scrolling
						 *
						 * Architecture Implementation:
						 * - overflow-hidden: Clips non-visible slides beyond viewport
						 * - w-full: Takes full available width within max-w-7xl container
						 * - ref={emblaRef}: Connects to Embla Carousel API for control
						 *
						 * Container Structure:
						 * - Flex container: Enables horizontal slide arrangement
						 * - flex-[0_0_33.333%]: Shows exactly 3 slides (1/3 width each)
						 * - min-w-0: Prevents flex item overflow issues
						 * - pl-4: Spacing between slides (16px padding-left)
						 */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Carousel viewport with proper overflow management */}
						{/* CARD FIX REASON: Ensured carousel container allows proper card height without vertical clipping */}
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

// Export types for documentation and reuse
export type { ServiceData, ServicesCarouselProps, StudentImageData };
