'use client';

import { memo } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { TestimonialsErrorBoundary } from '@/components/boundaries/TestimonialsErrorBoundary';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { WebVitals } from '@/components/analytics/web-vitals';
import { PageLayout } from '@/components/layout/page-layout';
import {
	getAllTestimonials,
	getTestimonialsContent,
	getTestimonialsHero,
	getTextTestimonials,
	type Testimonial,
} from '@/lib/cms/cms-content';
const OptimizedTestimonialCard = memo(function TestimonialCard({
	testimonial,
	index,
}: {
	testimonial: Testimonial;
	index: number;
}) {
	return (
		<div
			key={index}
			className='bg-white p-6 rounded-lg shadow-lg border border-neutral-100'>
			{}
			{}
			<div className='flex mb-4'>
				{[...Array(testimonial.rating)].map((_, i) => (
					<svg
						key={i}
						className='w-5 h-5 text-yellow-400 fill-current'
						viewBox='0 0 20 20'>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
				))}
			</div>

			{}
			{}
			{}
			<Separator
				orientation='horizontal'
				decorative
				className='my-4 bg-neutral-100'
			/>

			{}
			{}
			<div>
				{}
				{}
				<div>{testimonial.author}</div>
				{}
				{}
				<div>{testimonial.role}</div>
				{}
				{}
				{}
				<div className='text-blue-600 mt-1 flex items-center gap-2'>
					<span>{testimonial.subject}</span>
					{}
					{}
					<Separator
						orientation='vertical'
						decorative
						className='h-3 bg-blue-300'
					/>
					<span>Grade: {testimonial.result}</span>
				</div>
			</div>
		</div>
	);
});
export default function TestimonialsPage() {
	const testimonialsContent = getTestimonialsContent();
	const heroContent = getTestimonialsHero();
	const allTestimonials = getAllTestimonials();
	const testimonialsWithoutVideo = getTextTestimonials();
	let aboutTestimonials: Testimonial[] = [];
	try {
		aboutTestimonials = getTextTestimonials();
	} catch (error) {
		console.error('Error loading testimonials:', error);
		aboutTestimonials = [];
	}
	return (
		<TestimonialsErrorBoundary>
			{}
			{}
			<WebVitals />
			{}
			{}
			{}
			{}
			<section id='testimonials-hero'>
				<SimpleHero
					backgroundImage='/images/hero/testimonials-hero.jpg'
					h1='Student & Parent Testimonials'
					h2='Read testimonials from families who have achieved exceptional results with My Private Tutor Online.'
					decorativeStyle='lines'
				/>
			</section>

			{}
			{}
			{}
			{}
			{}
			<section
				id='mission-quote'
				className='py-16 lg:py-24 bg-primary-50'>
				<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
					{}
					{}
					{}
					<blockquote className='italic'>
						&quot;We provide <strong>exceptional tuition</strong> that helps students{' '}
						<strong>excel academically</strong> and <u>thrive personally</u>, opening
						doors to greater opportunities—at school and in life.&quot;
					</blockquote>
				</div>
			</section>

			{}
			{}
			{}
			{}
			{}
			{}
			<section id='video-testimonials-moved'>
				<TestimonialsSection testimonials={aboutTestimonials} />
			</section>

			{}
			{}
			{}
			{}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'>
				{}
				{}
				{}
				{}
				{}
				<section
					id='testimonials-featured-carousel'
					className='py-16 bg-neutral-50'>
					<div className='text-center mb-12 px-8 sm:px-12 lg:px-16 xl:px-20'>
						{}
						{}
						<h2 className='mb-4'>More Student Success Stories</h2>
						{}
						{}
						{}
						<p className='text-primary-600 max-w-3xl mx-auto'>
							Read additional testimonials from families who have achieved exceptional
							results with our tutoring
						</p>
					</div>

					{}
					{}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-24 sm:px-32 lg:px-48 xl:px-64'>
						{allTestimonials.map((testimonial, index) => (
							<OptimizedTestimonialCard
								key={`featured-testimonial-${testimonial.author}-${index}`}
								testimonial={testimonial}
								index={index}
							/>
						))}
					</div>
				</section>

				{}
				{}

				{}
			</PageLayout>
		</TestimonialsErrorBoundary>
	);
}
