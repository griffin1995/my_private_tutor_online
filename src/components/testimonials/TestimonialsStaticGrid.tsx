'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { HeadingText, TitleText, BodyText, CaptionText } from '@/components/ui/typography';
import { getTestimonials, type Testimonial } from '@/lib/cms/cms-content';

// Get testimonials from CMS
const TESTIMONIALS_DATA = getTestimonials();

// Individual testimonial card using shadcn/ui Card components
interface TestimonialCardProps {
	testimonial: Testimonial;
}

const TestimonialStaticCard = ({ testimonial }: TestimonialCardProps) => (
	<Card
		className="h-full flex flex-col border-2 border-primary-100 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.02] rounded-none"
		role="article"
		aria-labelledby={`author-${testimonial.id}`}
		aria-describedby={`quote-${testimonial.id}`}>
		<CardHeader className="flex-shrink-0">
			<div className="flex items-center gap-3 sm:gap-4 mb-3">
				{testimonial.avatar && (
					<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-accent-500 flex-shrink-0">
						<Image
							src={testimonial.avatar}
							alt={`Portrait of ${testimonial.author}`}
							width={56}
							height={56}
							className="object-cover w-full h-full"
						/>
					</div>
				)}
				<div className="min-w-0 flex-1">
					<TitleText
						variant="medium"
						level={3}
						className="font-semibold text-primary-900 truncate"
						responsive
						id={`author-${testimonial.id}`}>
						{testimonial.author}
					</TitleText>
					<CaptionText variant="default" className="text-primary-600 truncate">
						{testimonial.role}
					</CaptionText>
				</div>
			</div>

			{/* Star Rating */}
			<div
				className="flex mb-2"
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
		</CardHeader>

		<CardContent className="flex-1 flex flex-col">
			{/* Quote */}
			<blockquote id={`quote-${testimonial.id}`} className="flex-1">
				<BodyText variant="default" className="text-primary-700 leading-relaxed mb-4" responsive>
					&quot;{testimonial.quote}&quot;
				</BodyText>
			</blockquote>

			{/* Subject Badge and Logo - Bottom Row */}
			{testimonial.subject && (
				<footer className="mt-auto pt-4 border-t border-primary-100 flex items-center justify-between">
					<CaptionText
						variant="default"
						className="inline-block px-3 py-1 bg-primary-50 text-primary-700 font-medium rounded-none"
						responsive
						aria-label={`Subject: ${testimonial.subject}`}>
						{testimonial.subject}
					</CaptionText>
					<div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 relative" aria-hidden="true">
						<Image
							src="/icons/favicon-96x96.png"
							alt=""
							fill
							className="object-contain"
						/>
					</div>
				</footer>
			)}
		</CardContent>
	</Card>
);

// Main testimonials static grid component - enterprise approach
interface TestimonialsStaticGridProps {
	className?: string;
	title?: string;
	description?: string;
}

export const TestimonialsStaticGrid = ({
	className = '',
	title = 'All Testimonials',
	description = 'Read what families say about their experience with My Private Tutor Online.',
}: TestimonialsStaticGridProps) => {
	return (
		<section
			className={`py-12 sm:py-16 md:py-20 bg-white ${className}`}
			role="region"
			aria-labelledby="testimonials-grid-title"
			aria-describedby="testimonials-grid-description">
			{/* Full width container with consistent gap spacing on edges */}
			<div className="w-full px-6 sm:px-8 lg:px-8">
				{/* Section Header */}
				<header className="text-center mb-12 sm:mb-16">
					<HeadingText
						variant="primary"
						level={2}
						className="text-primary-900 mb-4"
						alignment="center"
						responsive
						id="testimonials-grid-title">
						{title}
					</HeadingText>
					<BodyText
						variant="large"
						className="text-primary-600 max-w-3xl mx-auto"
						alignment="center"
						responsive
						id="testimonials-grid-description">
						{description}
					</BodyText>
				</header>

				{/* Responsive Grid with consistent edge spacing matching gap values */}
				<div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
					role="list"
					aria-label="Customer testimonials grid">
					{TESTIMONIALS_DATA.map((testimonial) => (
						<div key={testimonial.id} role="listitem">
							<TestimonialStaticCard testimonial={testimonial} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};