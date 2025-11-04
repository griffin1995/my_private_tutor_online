'use client';

import Carousel_testimonial from '@/app/testimonials/Carousel_testimonial';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FounderStorySection } from '@/components/sections/about/founder-story-section';
import { Blockquote } from 'flowbite-react';

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
					<div className='container mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center'>
						<Blockquote>
							{/* Quote icon */}
							<svg
								className='mb-6 h-14 w-14 fill-primary-700'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 18 14'>
								<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
							</svg>

							{/* Bespoke Experience Quote */}
							<p className='italic'>
								&quot;<strong>A truly bespoke</strong> experience — Elizabeth personally
								pairs each student with a <u>carefully selected tutor</u> from her
								boutique team.&quot;
							</p>

							{/* Author with avatar */}
							<figcaption className='mt-4 flex items-center justify-center space-x-3'>
								<cite className='text-neutral-600'>Academic Insight</cite>
							</figcaption>
						</Blockquote>
					</div>
				</section>

				{/* Educational Philosophy Section */}
				<section
					id='about-highlighter-intro'
					className='pt-20 bg-white'>
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
