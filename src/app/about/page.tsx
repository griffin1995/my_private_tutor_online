'use client';

import Carousel_testimonial from '@/app/testimonials/Carousel_testimonial';
import { Testimonial10NoRole } from '@/components/education/testimonial-section';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FounderStorySection } from '@/components/sections/about/founder-story-section';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR ABOUT PAGE
// ============================================================================

// Hero image for About page
const ABOUT_HERO_IMAGE = {
	src: '/images/hero/about.webp',
	alt: 'Elizabeth Burrows founder story hero background - premium tutoring service heritage',
	width: 1920,
	height: 1080,
	title: 'About Our Founder - Heritage and Excellence',
};

export default function AboutUsPage() {
	return (
		<>
			{/* Hero Section - Outside PageLayout */}
			<section id='about-hero'>
				<SimpleHero
					backgroundImage={ABOUT_HERO_IMAGE.src}
					h1={
						<span className='text-white'>
							Founder <span className='text-accent-600'>& Ethos</span>
						</span>
					}
					h2='Where breaking the mould leads to remarkable results.'
					decorativeStyle='none'
				/>
			</section>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'
				footerProps={{ showContactForm: true }}>
				{/* Founder Story Section */}
				<div id='about-founder-story'>
					<div className='mx-auto'>
						<FounderStorySection />
					</div>
				</div>

				{/* Founder Quote Section */}
				<section
					id='founder-quote-testimonials'
					className='py-8 lg:py-12 bg-primary-50'>
					<div className='w-full max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-6xl xl:max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8'>
						<Testimonial10NoRole
							quote='A truly bespoke experience — Elizabeth personally pairs each student with a carefully selected tutor from her boutique team.'
							author={{
								name: 'Academic Insight',
								avatar: {
									src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
									alt: 'Academic Insight',
								},
							}}
						/>
					</div>
				</section>

				{/* Educational Philosophy Section */}
				<section
					id='about-highlighter-intro'
					className='pt-12 lg:pt-20 pb-8 lg:pb-12 bg-white'>
					<div className='max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
						<h2 className='mb-6'>Our Educational Philosophy</h2>

						<p>
							We believe every child deserves an education tailored to who they are,
							helping them <strong>build confidence, curiosity, and clarity</strong>.
							We combine academic rigour with personal mentorship, knowing that{' '}
							<strong>
								success depends as much on resilience and self-belief as it does on
								subject mastery
							</strong>
							.
						</p>
						<p className='mt-4'>
							Whether preparing for British schools, moving abroad, or facing
							competitive exams, we provide structure, insight and flexibility. Above
							all, <strong>we aim to cultivate independence</strong> — giving students
							the tools and courage to walk their path with confidence and{' '}
							<strong>thrive long after tutoring ends</strong>.
						</p>
					</div>
				</section>

				{/* Testimonials Carousel Section */}
				<section
					id='testimonials-carousel'
					className='px-4 sm:px-6 lg:px-8'>
					<div className='mx-auto'>
						<Carousel_testimonial />
					</div>
				</section>
			</PageLayout>
		</>
	);
}
