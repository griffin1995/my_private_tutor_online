'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { BodyText, CaptionText } from '@/components/ui/typography';
import { getTestimonials, type Testimonial } from '@/lib/cms/cms-content';

// Get testimonials from CMS
const TESTIMONIALS_DATA = getTestimonials();

// Individual testimonial card component
interface TestimonialCardProps {
	testimonial: Testimonial;
	index?: number;
}

const TestimonialCard = ({ testimonial, index = 0 }: TestimonialCardProps) => {
	// Intersection observer for card visibility
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	return (
		<article
			ref={ref}
			className={`min-w-[280px] sm:min-w-[320px] md:min-w-[400px] lg:min-w-[450px] max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] bg-white p-4 sm:p-5 md:p-6 flex-shrink-0 border-2 border-primary-100 shadow-lg mr-4 sm:mr-6 md:mr-8 transition-all duration-500 ease-out ${
				inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
			}`}
			role="option"
			aria-label={`Testimonial from ${testimonial.author}, ${testimonial.role}`}
			aria-describedby={`testimonial-content-${testimonial.id}`}
			tabIndex={0}>
			<header
				className="flex items-center gap-3 sm:gap-4 mb-4">
				{testimonial.avatar && (
					<div
						className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-accent-500 flex-shrink-0">
						<Image
							src={testimonial.avatar}
							alt={`Portrait of ${testimonial.author}`}
							width={48}
							height={48}
							className="object-cover w-full h-full"
						/>
					</div>
				)}
				<div className="min-w-0">
					<CaptionText
						variant="default"
						className="font-semibold text-primary-900 truncate text-sm sm:text-base lg:text-lg"
						responsive
						role="heading"
						aria-level={3}>
						{testimonial.author}
					</CaptionText>
					<CaptionText
						variant="small"
						className="text-primary-600 truncate"
						responsive>
						{testimonial.role}
					</CaptionText>
				</div>
			</header>

			{/* Star Rating */}
			<div
				className="flex mb-3 sm:mb-4"
				role="img"
				aria-label={`${testimonial.rating} out of 5 stars rating`}>
				{[...Array(testimonial.rating)].map((_, i) => (
					<Star
						key={i}
						className="w-4 h-4 sm:w-5 sm:h-5 text-accent-600 fill-current"
						aria-hidden="true"
					/>
				))}
			</div>

			{/* Quote */}
			<blockquote
				id={`testimonial-content-${testimonial.id}`}
				className="mb-4">
				<BodyText
					variant="default"
					className="text-primary-700 leading-relaxed break-words text-sm sm:text-base md:text-[17px]"
					responsive>
					&quot;{testimonial.quote}&quot;
				</BodyText>
			</blockquote>

			{/* Subject Badge and Logo - Bottom Row */}
			{testimonial.subject && (
				<footer
					className="mt-auto pt-3 sm:pt-4 border-t border-primary-100 flex items-center justify-between">
					<CaptionText
						variant="small"
						className="inline-block px-2 sm:px-3 py-1 bg-primary-50 text-primary-700 font-medium"
						responsive
						aria-label={`Subject: ${testimonial.subject}`}>
						{testimonial.subject}
					</CaptionText>
					<div
						className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 relative"
						aria-hidden="true">
						<Image
							src="/icons/favicon-96x96.png"
							alt=""
							fill
							className="object-contain"
						/>
					</div>
				</footer>
			)}
		</article>
	);
};

// Main testimonials carousel component - completely isolated
interface TestimonialsCarouselProps {
	className?: string;
	autoScrollSpeed?: number;
	stopOnHover?: boolean;
}

export const TestimonialsCarousel = ({
	className = '',
	autoScrollSpeed = 1,
	stopOnHover = true,
}: TestimonialsCarouselProps) => {
	// Optimized Embla configuration following Context7 best practices
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: 'start',
			dragFree: false,
			containScroll: 'trimSnaps',
			slidesToScroll: 1,
			skipSnaps: false,
		},
		[
			AutoScroll({
				speed: autoScrollSpeed,
				startDelay: 1000,
				direction: 'forward',
				stopOnInteraction: false,
				stopOnMouseEnter: stopOnHover,
				stopOnFocusIn: true,
			}),
		]
	);

	// Carousel state management following Context7 best practices
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Add carousel API lifecycle management
	React.useEffect(() => {
		if (!emblaApi) return;

		// Log slide changes for analytics (optional)
		const onSelect = () => {
			// Could track analytics here if needed
		};

		emblaApi.on('select', onSelect);
		return () => emblaApi.off('select', onSelect);
	}, [emblaApi]);

	return (
		<div
			ref={ref}
			className={`py-8 sm:py-10 md:py-12 bg-neutral-50 ${className}`}
			role="region"
			aria-label="Customer testimonials carousel"
			aria-describedby="testimonials-description">
			{/* Screen reader description */}
			<div id="testimonials-description" className="sr-only">
				A carousel displaying customer testimonials. Use arrow keys to navigate between testimonials.
			</div>
			<div
				className="overflow-hidden"
				ref={emblaRef}
				role="group"
				aria-label="Testimonials carousel viewport">
				<div className="flex" role="listbox" aria-live="polite">
					{TESTIMONIALS_DATA.map((testimonial, index) => (
						<TestimonialCard
							key={testimonial.id}
							testimonial={testimonial}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
};