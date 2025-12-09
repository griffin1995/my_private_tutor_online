import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { TestimonialAuthorRole } from '@/components/testimonials/TestimonialAuthorRole';
import { TestimonialsCarousel } from '@/components/testimonials/TestimonialsCarousel';
import { TestimonialsStaticGrid } from '@/components/testimonials/TestimonialsStaticGrid';
export default function TestimonialsPage() {
	return (
		<>
			{/* Hero Section - Outside PageLayout */}
			<section id='testimonials-hero'>
				<SimpleHero
					backgroundImage='/images/hero/testimonials.jpg'
					h1={
						<span className='text-white'>
							Student & Parent <span className='text-accent-600'>Testimonials</span>
						</span>
					}
					h2='Read testimonials from families who have achieved exceptional results with My Private Tutor Online.'
					decorativeStyle='lines'
				/>
			</section>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'>
				{/* Mission Quote Section - TestimonialAuthorRole */}
				<section
					id='mission-quote'
					className='bg-primary-50'>
					<TestimonialAuthorRole
						quote='We provide exceptional tuition that helps students excel academically and thrive personally, opening doors to greater opportunities—at school and in life.'
						author={{
							name: 'Elizabeth Burrows',
							role: 'Founder',
							avatar: {
								src: '/images/about/founder-elizabeth-icon.webp',
								alt: 'Elizabeth Burrows - Founder',
							},
						}}
					/>
				</section>

				{/* Video Testimonials Section */}
				<section id='video-testimonials-moved'>
					<TestimonialsSection />
				</section>

				{/* Single Row Continuous Testimonials Carousel - Simplified */}
				<section id='testimonials-carousel'>
					<TestimonialsCarousel />
				</section>

				{/* All Testimonials Static Grid - Enterprise shadcn Cards */}
				<section id='testimonials-static-grid'>
					<TestimonialsStaticGrid />
				</section>
				{/* <Carousel_testimonial /> */}
			</PageLayout>
		</>
	);
}
