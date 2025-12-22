'use client';

// CONTEXT7 SOURCE: /vercel/next.js - Client Component pattern for Next.js App Router
// ARCHITECTURE REASON: Next.js 15 App Router - Client Component due to interactive features

// FIXED: Added 'use client' directive - page contains client components with React context
// Animations, interactions, and dynamic features require client-side rendering

import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { TestimonialAuthorRole } from '@/components/testimonials/TestimonialAuthorRole';
import { HeadingText } from '@/components/ui/typography';
// import { ScrollingLogos } from '../../components/client/ScrollingLogos';
import { ServicesCarousel } from '../../components/sections/ServicesCarousel';
import { PageFooter } from '../../components/layout/page-footer';
import { Navigation } from '../../components/navigation/Navigation';
import { AboutSectionClient } from '../../components/sections/AboutSectionClient';
import { FeatureSection } from '../../components/sections/feature-section';
import { FounderIntroductionSection } from '../../components/sections/founder-introduction-section';
import { ThreePillarsSection } from '../../components/sections/three-pillars-section';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';

// Import optimized data from JSON files
import servicesData from '@/content/homepage/services.json';
import featuresData from '@/content/homepage/features.json';
import schoolLogosData from '@/content/homepage/school-logos.json';

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

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR HOMEPAGE
// ============================================================================

const SERVICES_DATA = servicesData;

const FEATURES_CONTENT = featuresData.map((feature) => ({
	...feature,
	description: feature.title === 'Fit For a King' ? (
		<>
			{feature.description}
			<br />
			<br />
			<em>"{feature.testimonialQuote}"</em>
		</>
	) : feature.description,
	imagePosition: feature.imagePosition as 'left' | 'right',
}));

const FEATURES_ACTIONS = {
	primary: {
		text: 'Get Started',
		href:
			'https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~',
	},
	secondary: {
		text: 'Learn More',
		href: '/how-it-works',
	},
} as const;

const SCHOOL_LOGOS_ARRAY = schoolLogosData;

// Student Images for Trust Indicators and Services Carousel
const STUDENT_IMAGES: Record<
	string,
	{ src: string; alt: string; width: number; height: number }
> = {
	'student-child': {
		src: '/images/students/student-child.jpg',
		alt: 'Young student engaged in personalised tutoring session',
		width: 300,
		height: 400,
	},
	'student-teenager': {
		src: '/images/students/student-teenager.jpg',
		alt: 'GCSE student celebrating academic success with improved grades',
		width: 300,
		height: 400,
	},
	'student-university': {
		src: '/images/students/student-university.jpg',
		alt: 'A-Level student achieving excellent results for university application',
		width: 300,
		height: 400,
	},
	'student-oxbridge': {
		src: '/images/students/student-oxbridge.jpg',
		alt: 'Oxbridge candidate celebrating university acceptance offer',
		width: 300,
		height: 400,
	},
	'adult-student-with-teacher': {
		src: '/images/students/adult-student-with-teacher.jpg',
		alt: 'Adult student working closely with experienced tutor in comfortable learning environment',
		width: 400,
		height: 300,
	},
	'student-inside-holding-pencil': {
		src: '/images/students/student-inside-holding-pencil.jpg',
		alt: 'Focused student taking notes during personalised tutoring session',
		width: 400,
		height: 300,
	},
	'student-teacher-inside-comfortable': {
		src: '/images/students/student-teacher-inside-comfortable.jpg',
		alt: 'Student and teacher in comfortable tutoring environment',
		width: 400,
		height: 300,
	},
	'student-on-laptop-teacher-on-screen': {
		src: '/images/students/student-on-laptop-teacher-on-screen.jpg',
		alt: 'Online tutoring session with student and teacher via video call',
		width: 400,
		height: 300,
	},
	'primary-school-support': {
		src: '/images/students/primary-school-support.webp',
		alt: 'Primary school student receiving personalised tutoring support',
		width: 1920,
		height: 1080,
	},
	'secondary-school-support': {
		src: '/images/students/secondary-school-support.jpg',
		alt: 'Secondary school student working with subject specialist tutor',
		width: 600,
		height: 400,
	},
	'entrance-exam-preparation': {
		src: '/images/students/entrance-exam-preparation.webp',
		alt: 'Student preparing for entrance examinations with expert tutor',
		width: 600,
		height: 400,
	},
	'university-and-beyond': {
		src: '/images/students/university-and-beyond.webp',
		alt: 'University student receiving academic writing support',
		width: 600,
		height: 400,
	},
	'online-homeschooling': {
		src: '/images/students/online-homeschooling.jpg',
		alt: 'Homeschooled student learning online with qualified teacher',
		width: 600,
		height: 400,
	},
	'sen-support': {
		src: '/images/students/sen-support.jpg',
		alt: 'Student with special educational needs receiving specialist support',
		width: 600,
		height: 400,
	},
};

// ============================================================================
// HOMEPAGE SERVER COMPONENT
// ============================================================================

export default function HomePage() {
	const services = SERVICES_DATA;
	const studentImages = STUDENT_IMAGES;

	// Hardcoded Recognition Cards Data for About Section
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

	return (
		<div className='min-h-screen flex flex-col overflow-x-hidden bg-white'>
			{/* SEO Schema Markup - Critical for £443,000/year organic revenue opportunity */}
			<SchemaMarkup
				pageTitle='My Private Tutor Online - Premium Tutoring with Royal Endorsements | Oxbridge Preparation'
				pageDescription='Premium tutoring service with royal endorsements, serving elite families across the UK since 2010. Featured in Tatler Address Book 2025. Expert Oxbridge preparation, 11+ entry, GCSE and A-Level tutoring.'
				pageUrl='https://myprivatetutoronline.co.uk'
				pageType='HomePage'
				includeOrganization={true}
				includeLocalBusiness={true}
				includeSocialProfile={true}
			/>

			{/* <Navigation showBlueNavigation={true} /> */}
			<div>Navigation temporarily disabled</div>
			<main
				className='flex-1'
				role='main'
				id='main-content'
				tabIndex={-1}>
				<div className='mx-auto'>
					{/* Navbar spacing divs */}
					<div
						style={{
							height: 'var(--navbar-height, 5.5rem)',
						}}
						className='lg:hidden border-b border-neutral-300'
					/>
					<div
						style={{
							height: 'var(--navbar-height, 6.25rem)',
						}}
						className='hidden lg:block xl:hidden border-b border-neutral-300'
					/>
					<div
						style={{
							height: 'var(--navbar-height, 7rem)',
						}}
						className='hidden xl:block border-b border-neutral-300'
					/>

					{/* Hero Section with Video and Scrolling School Logos */}
					<section
						id='hero-premium-tutoring-landing-combined'
						className='flex flex-col w-full h-[calc(100dvh-5.5rem)] md:h-[calc(100dvh-6rem)] lg:h-[calc(100dvh-6.25rem)] xl:h-[calc(100dvh-7rem)]'>
		{/* Top spacing */}
						<div className='flex-[0_0_2rem] sm:flex-[0_0_2.5rem] md:flex-[0_0_3rem]' />

						{/* Video Section */}
						<div className='flex-[5] sm:flex-[6] md:flex-[6.5] lg:flex-[7] relative w-full overflow-hidden'>
							<div className='w-full h-full max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
								<video
									src='/videos/background-video-2025.mp4'
									autoPlay
									muted
									loop
									playsInline
									preload='auto'
									className='w-full h-full object-contain'
									aria-label='Hero background video'
								/>
							</div>
						</div>

						{/* Tagline Section */}
						<div className='flex-[1.5] flex items-center justify-center'>
							<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
								<HeadingText variant="primary" level={2} responsive>
									We help students place at top 10 UK schools and universities
								</HeadingText>
								<div className='flex justify-center items-center space-x-6 mt-2 sm:mt-3'>
									<div className='w-12 h-px bg-primary-700' />
									<div className='w-3 h-3 rounded-full bg-primary-700 shadow-lg' />
									<div className='w-12 h-px bg-primary-700' />
								</div>
							</div>
						</div>

						{/* Scrolling School Logos */}
						<div className='flex-[1.5] flex items-center justify-center'>
							{/* <ScrollingLogos logos={SCHOOL_LOGOS_ARRAY} /> */}
							<div>Logos temporarily disabled for debugging</div>
						</div>
					</section>

					{/* About Section */}
					{/* <AboutSectionClient recognitionCards={recognitionCards} /> */}
					<div>About section temporarily disabled</div>

					{/* Founder Introduction Section */}
					<div className='[&_.flex.items-center_p]:m-0'>
						{/* <FounderIntroductionSection /> */}
						<div>Founder section temporarily disabled</div>
					</div>

					{/* Three Pillars Section */}
					<section
						id='quantifiable-results-documentation'
						className='py-13 lg:py-32'>
						<ThreePillarsSection />
					</section>

					{/* Trust Indicators Section - New Clean FeatureSection Implementation */}
					{FEATURES_CONTENT.map((feature, index) => (
						<FeatureSection
							key={index}
							title={feature.title}
							description={feature.description}
							imageSrc={feature.imageSrc}
							imageAlt={feature.imageAlt}
							imagePosition={feature.imagePosition}
							primaryAction={FEATURES_ACTIONS.primary}
							secondaryAction={FEATURES_ACTIONS.secondary}
						/>
					))}

					{/* Founder Quote Section */}
					<section id='founder-quote'>
						<div className='[&>section]:py-10 sm:[&>section]:py-12 md:[&>section]:py-16 [&_p]:max-w-7xl [&_.flex.items-center]:pt-2'>
							<TestimonialAuthorRole
								quote={
									<>
										Parents come to us when something truly matters—an entrance exam, a
										lost sense of confidence, a desire for academic stretch. They stay
										with us because we deliver real progress, quietly and expertly.
										<br />
										<br />
										This is not a tutoring directory. This is a bespoke service for
										ambitious families looking for trusted partners in their child's
										academic career.
									</>
								}
								author={{
									name: 'Elizabeth Burrows',
									role: 'Founder',
									avatar: {
										src: '/images/team/elizabeth-burrows-founder-main.jpg',
										alt: 'Elizabeth Burrows - Founder',
									},
								}}
							/>
						</div>
					</section>
					{/* Services Carousel Section */}
					<section id='who-we-support-services'>
						<ServicesCarousel
							services={services}
							studentImages={studentImages}
						/>
					</section>

					{/* Video Testimonials Section */}
					<section id='testimonials-section'>
						<TestimonialsSection showMoreButton={true} />
					</section>
				</div>
			</main>

			{/* Footer */}
			<PageFooter showContactForm={true} />
		</div>
	);
}
