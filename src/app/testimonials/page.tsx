import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { ScrollingTestimonials } from '@/components/testimonials/ScrollingTestimonials';
import { MissionQuote } from '@/components/ui/blockquote';
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
				{/* Mission Quote Section */}
				<section
					id='mission-quote'
					className='py-8 md:py-12 bg-primary-50'>
					<div className='container mx-auto max-w-4xl px-6 sm:px-8 md:px-12 text-center'>
						<MissionQuote
							showCite={true}
							author='Elizabeth Burrows'
							role='Founder'>
							We provide <strong>exceptional tuition</strong> that helps
							students <strong>excel academically</strong> and{' '}
							<u>thrive personally</u>, opening doors to greater opportunities—at
							school and in life.
						</MissionQuote>
					</div>
				</section>

				{/* Video Testimonials Section */}
				<section id='video-testimonials-moved'>
					<TestimonialsSection />
				</section>

				{/* Multiple Row Scrolling Testimonials - Replaces Static Grid */}
				<section id='testimonials-scrolling-carousel'>
					<ScrollingTestimonials variant='multiple' />
				</section>
				{/* <Carousel_testimonial /> */}
			</PageLayout>
		</>
	);
}
