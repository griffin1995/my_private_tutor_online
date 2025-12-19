'use client';

import { TestimonialsCarousel } from '@/components/testimonials/TestimonialsCarousel';
import { Testimonial10NoRole } from '@/components/education/testimonial-section';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FounderStorySection } from '@/components/sections/about/founder-story-section';
import { motion } from 'motion/react';
import Image from 'next/image';
import { RecognitionCard } from '../../../components/sections/RecognitionCard';
import { HeadingText, BodyText } from '@/components/ui/typography';
// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR ABOUT PAGE
// ============================================================================
// Type for recognition card data (hardcoded)
interface RecognitionCardData {
	id: string;
	headerText: string;
	contentType: 'logo' | 'icon';
	logoImage?: {
		url: string;
		alt: string;
	};
	logoMaxWidth?: string;
	iconPath?: string;
	iconAlt?: string;
	footerText?: string;
	sortOrder: number;
	status: 'published' | 'unpublished';
}
const RECOGNITION_CARDS_DATA: RecognitionCardData[] = [
	{
		id: 'tatler-address-book',
		headerText: 'As featured in',
		contentType: 'logo',
		logoImage: {
			url: '/landing-page/tatler-logo.webp',
			alt: "Tatler's Address Book 2025",
		},
		sortOrder: 1,
		status: 'published',
	},
	{
		id: 'school-guide-top-pick',
		headerText: 'As recommended by',
		contentType: 'logo',
		logoImage: {
			url: '/landing-page/schools-guide-uk-logo.webp',
			alt: "School Guide's Top Pick for Private Tuition",
		},
		sortOrder: 2,
		status: 'published',
	},
	{
		id: 'royal-clientele',
		headerText: 'As trusted by',
		contentType: 'logo',
		logoImage: {
			url: '/landing-page/royal-crown.webp',
			alt: 'Royal Crown',
		},
		sortOrder: 3,
		status: 'published',
	},
];

const recognitionCards: RecognitionCardData[] = RECOGNITION_CARDS_DATA;
// Hero image for About page
const ABOUT_HERO_IMAGE = {
	src: 'images/team/about-founder-story.jpg',
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
					h1="Founder"
					h1AccentText="& Ethos"
					h2="Where breaking the mould leads to remarkable results."
					decorativeStyle="none"
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
						<div className="[&_.flex.items-center_p]:mb-0 [&_.flex.items-center]:pt-2">
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
					</div>
				</section>

				{/* Educational Philosophy Section */}
				<motion.section
					id='about-highlighter-intro'
					className='pt-12 lg:pt-20 pb-8 lg:pb-12 bg-white'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-50px' }}
					transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
					<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
						{/* Heading */}
						<motion.div
							className='text-center mb-6'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}>
							<HeadingText
								variant="primary"
								level={2}
								responsive>
								Our Educational Philosophy
							</HeadingText>
						</motion.div>

						{/* Text + Image */}
						<div className='flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:pt-4 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12'>
							{/* Text on the left */}
							<motion.div
								className='lg:w-1/2 text-center lg:text-left'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}>
								<BodyText
									variant="default"
									responsive>
									We believe every child deserves an education tailored to who they are,
									helping them <strong>build confidence, curiosity, and clarity</strong>.
									We combine academic rigour with personal mentorship, knowing that{' '}
									<strong>
										success depends as much on resilience and self-belief as it does on
										subject mastery
									</strong>
									.
								</BodyText>
								<BodyText
									variant="default"
									className='mt-4'
									responsive>
									Whether preparing for British schools, moving abroad, or facing
									competitive exams, we provide structure, insight and flexibility. Above
									all, <strong>we aim to cultivate independence</strong> — giving
									students the tools and courage to walk their path with confidence and{' '}
									<strong>thrive long after tutoring ends</strong>.
								</BodyText>
							</motion.div>

							{/* Image on the right */}
							<motion.div
								className='lg:w-1/2 flex justify-center lg:justify-end'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}>
								<Image
									src='/images/about/our-educational-philosophy.jpeg'
									alt='Educational Philosophy'
									width={500} // desired width
									height={400} // desired height
									className='object-cover'
								/>
							</motion.div>
						</div>
					</div>
				</motion.section>

				<motion.div
					className='grid grid-cols-1 md:grid-cols-3 gap-6 w-[75%] sm:w-[60%] md:w-full max-w-5xl mx-auto py-8'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-50px' }}
					transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}>
					{recognitionCards
						.filter(
							(
								card,
							): card is RecognitionCardData & {
								contentType: 'logo';
								logoImage: { url: string; alt: string };
							} => card.contentType === 'logo' && card.logoImage !== undefined,
						)
						.map((card, index) => (
							<RecognitionCard
								key={card.id}
								headerText={card.headerText}
								contentType={card.contentType}
								logoImage={card.logoImage}
								{...(card.footerText && { footerText: card.footerText })}
								animationDelay={0.5 + index * 0.2}
								index={index}
							/>
						))}
				</motion.div>
				{/* Testimonials Carousel Section */}
				<section
					id='testimonials-carousel'
					className='px-4 sm:px-6 lg:px-8'>
					<div className='mx-auto'>
						<TestimonialsCarousel />
					</div>
				</section>
			</PageLayout>
		</>
	);
}
