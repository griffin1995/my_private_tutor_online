'use client';

import { Avatar, Blockquote } from 'flowbite-react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { ErrorBoundaryWrapper } from '../../components/boundaries/homepage-error-boundary';
import { CMSArchitectureDashboard } from '../../components/cms-architecture-dashboard';
import { LazyServicesCarousel } from '../../components/dynamic/lazy-loaded-components';
import { PageFooter } from '../../components/layout/page-footer';
import { Navigation } from '../../components/navigation/Navigation';
import { AboutSection } from '../../components/sections/about-section';
import { FounderIntroductionSection } from '../../components/sections/founder-introduction-section';
import { ThreePillarsSection } from '../../components/sections/three-pillars-section';
import { TrustIndicatorsGrid } from '../../components/sections/trust-indicators-grid';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR HOMEPAGE
// ============================================================================

// Services Data for "Who We Support" carousel section
const SERVICES_DATA = [
	{
		title: 'Primary',
		description:
			'Comprehensive support for primary school students across all core subjects and entrance exam preparation',
		icon: '🌟',
		features: [
			'All core subjects covered',
			'Early exam preparation',
			'Learning foundation building',
			'Progress tracking',
		],
		targetAudience: 'Primary school students aged 4-11',
	},
	{
		title: 'Secondary',
		description:
			'Expert secondary education support covering GCSE, A-Level and IB programmes for academic excellence',
		icon: '📚',
		features: [
			'GCSE & A-Level mastery',
			'IB programme support',
			'Exam technique development',
			'Subject specialist tutors',
		],
		targetAudience: 'Secondary school students aged 11-18',
	},
	{
		title: 'Entrance Exams',
		description:
			'Specialist preparation for competitive UK school entry examinations (4+, 7+, 11+, 13+, 16+)',
		icon: '🎯',
		features: [
			'Mathematical reasoning',
			'English comprehension',
			'Verbal & non-verbal reasoning',
			'Mock exam practise',
		],
		targetAudience: 'Students preparing for independent school entry',
	},
	{
		title: 'Uni & Beyond',
		description:
			'Complete university application support including Oxbridge admissions and undergraduate academic writing',
		icon: '🎓',
		features: [
			'UCAS application support',
			'Oxbridge interview coaching',
			'Personal statement guidance',
			'University essay support',
		],
		targetAudience: 'A-Level students and undergraduates',
		featureImageUrl: '/images/graphics/feature-oxbridge-success.jpg',
		featureImageAlt:
			'Oxbridge success - University admissions coaching and academic writing support',
	},
	{
		title: 'Online Homeschooling',
		description:
			'Comprehensive online education programmes providing structured homeschooling with qualified teachers',
		icon: '💻',
		features: [
			'Full curriculum delivery',
			'Qualified teacher support',
			'Flexible learning schedules',
			'Progress monitoring',
		],
		targetAudience: 'Homeschooled students of all ages',
	},
	{
		title: 'SEN Support',
		description:
			'Specialist educational needs support with experienced tutors trained in learning differences and disabilities',
		icon: '🤝',
		features: [
			'Learning differences expertise',
			'Individualised learning plans',
			'Multi-sensory teaching',
			'Confidence building',
		],
		targetAudience: 'Students with special educational needs',
	},
	{
		title: 'London In-Person',
		description: 'Premium face-to-face tutoring sessions available across London',
		icon: '🏛️',
		features: [
			'Elite London tutors',
			'Flexible location options',
			'Premium service level',
			'Immediate availability',
		],
		targetAudience: 'London-based students seeking in-person tuition',
	},
];

// Trust Indicators Data for alternating image/text section
const TRUST_INDICATORS_DATA = [
	{
		icon: '',
		title: 'Fit For a King',
		subtitle: '',
		description:
			'Our services are trusted by prominent families, **including VIPs and royalty**.\n\n"Hi Elizabeth, I found out today that the two princes and the princess have all been offered places at Le Rosey for next year. The family is delighted and would like me to pass on their sincerest thanks to you and the team for all your hard work."',
		imageUrl: '/images/graphics/feature-royal-endorsement.jpg',
		imageAlt:
			'Royal endorsement - Invitation-only service trusted by royal families and high-profile clients',
	},
	{
		icon: '',
		title: 'Examiner insight',
		subtitle: '',
		description:
			'Our Tier 1 tutors **actually write/mark the real tests your child takes**. Such insider perspective is rare.',
		imageUrl: '/images/graphics/feature-exam-insight.jpeg',
		imageAlt:
			'Examiner insight - Tutors who are actual examiners providing unique academic advantage',
	},
	{
		icon: '',
		title: 'By Invitation Only',
		subtitle: '',
		description:
			"Elizabeth's international career has allowed her to **personally work alongside almost all our tutors**, while others have been recommended by trusted colleagues. She personally vets every tutor, ensuring only the best make the team.",
		imageUrl: '/images/graphics/feature-built-on-trust.jpeg',
		imageAlt:
			'Built on trust - Premium tutoring service with vetted educators and proven track record',
	},
	{
		icon: '',
		title: 'Rooted in Britain, Appreciated Worldwide',
		subtitle: '',
		description:
			'We know British education **inside and out** and bring that knowledge to families across the globe.',
		imageUrl: '/images/graphics/feature-british-heritage.jpeg',
		imageAlt:
			'British heritage and global network - Personal tutoring approach with international reach',
	},
];

// School Logos for scrolling section - Direct array of logos (using actual file paths)
const SCHOOL_LOGOS_ARRAY = [
	{
		src: '/images/logos/eton-college-logo-alt.png',
		alt: 'Eton College - Elite Independent School',
		width: 120,
		height: 80,
		title: 'Eton College',
	},
	{
		src: '/images/logos/westminster-school-logo-new.png',
		alt: 'Westminster School - Top Independent School',
		width: 120,
		height: 80,
		title: 'Westminster School',
	},
	{
		src: '/images/logos/st-pauls-school-logo-new2.jpg',
		alt: "St Paul's School - Leading Independent School",
		width: 120,
		height: 80,
		title: "St Paul's School",
	},
	{
		src: '/images/logos/harrow-school-logo-new.png',
		alt: 'Harrow School - Historic Independent School',
		width: 120,
		height: 80,
		title: 'Harrow School',
	},
	{
		src: '/images/logos/oxford-university-logo-new.jpg',
		alt: 'Oxford University - World-Leading University',
		width: 120,
		height: 80,
		title: 'Oxford University',
	},
	{
		src: '/images/logos/cambridge-university-logo-new.png',
		alt: 'Cambridge University - Premier Research University',
		width: 120,
		height: 80,
		title: 'Cambridge University',
	},
	{
		src: '/images/logos/lse-logo.png',
		alt: 'London School of Economics - Top Social Sciences University',
		width: 120,
		height: 80,
		title: 'London School of Economics',
	},
	{
		src: '/images/logos/kings-college-logo.jpeg',
		alt: "King's College London - Russell Group University",
		width: 120,
		height: 80,
		title: "King's College London",
	},
	{
		src: '/images/logos/brighton-college-logo.png',
		alt: 'Brighton College - Outstanding Independent School',
		width: 120,
		height: 80,
		title: 'Brighton College',
	},
	{
		src: '/images/logos/durham-university-logo.png',
		alt: 'Durham University - Collegiate University',
		width: 120,
		height: 80,
		title: 'Durham University',
	},
	{
		src: '/images/logos/edinburgh-university-logo.png',
		alt: 'University of Edinburgh - Ancient Scottish University',
		width: 120,
		height: 80,
		title: 'University of Edinburgh',
	},
	{
		src: '/images/logos/highgate-school-logo.png',
		alt: 'Highgate School - Independent Day School',
		width: 120,
		height: 80,
		title: 'Highgate School',
	},
	{
		src: '/images/logos/le-rosey-school-logo-new.png',
		alt: 'Le Rosey School - International Boarding School',
		width: 120,
		height: 80,
		title: 'Le Rosey School',
	},
	{
		src: '/images/logos/st-andrews-university-logo.png',
		alt: 'University of St Andrews - Ancient Scottish University',
		width: 120,
		height: 80,
		title: 'University of St Andrews',
	},
	{
		src: '/images/logos/warwick-university-logo.gif',
		alt: 'University of Warwick - Research University',
		width: 120,
		height: 80,
		title: 'University of Warwick',
	},
	{
		src: '/images/logos/school-henrietta-barnett.png',
		alt: 'Henrietta Barnett School - Grammar School',
		width: 120,
		height: 80,
		title: 'Henrietta Barnett School',
	},
	{
		src: '/images/logos/school-latymer-shield.svg',
		alt: 'Latymer School - Independent Day School',
		width: 120,
		height: 80,
		title: 'Latymer School',
	},
	{
		src: '/images/logos/school-queen-elizabeths.png',
		alt: "Queen Elizabeth's School - Grammar School",
		width: 120,
		height: 80,
		title: "Queen Elizabeth's School",
	},
	{
		src: '/images/logos/tiffins-school-shield-new.jpeg',
		alt: 'Tiffin School - Grammar School',
		width: 120,
		height: 80,
		title: 'Tiffin School',
	},
];

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
		src: '/images/students/primary-school-support.jpg',
		alt: 'Primary school student receiving personalised tutoring support',
		width: 600,
		height: 400,
	},
	'secondary-school-support': {
		src: '/images/students/secondary-school-support.jpg',
		alt: 'Secondary school student working with subject specialist tutor',
		width: 600,
		height: 400,
	},
	'entrance-exam-preparation': {
		src: '/images/students/entrance-exam-preparation.png',
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
// HOMEPAGE COMPONENT
// ============================================================================

export default function HomePage() {
	const services = SERVICES_DATA;
	const trustIndicators = TRUST_INDICATORS_DATA;
	const studentImages = STUDENT_IMAGES;

	return (
		<div className='min-h-screen flex flex-col overflow-x-hidden bg-white'>
			<Navigation isHomepage={false} />
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
						className='flex flex-col w-full h-[calc(100dvh-5.5rem)] lg:h-[calc(100dvh-6.25rem)] xl:h-[calc(100dvh-7rem)]'>
						{/* Top spacing */}
						<div className='flex-[0_0_3rem]' />

						{/* Video Section */}
						<div className='flex-[7] relative w-full overflow-hidden'>
							<div className='w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
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
								<h2>We help students place at top 10 UK schools and universities</h2>
								<div className='flex justify-center items-center space-x-6 mt-2 sm:mt-3'>
									<div className='w-12 h-px bg-neutral-300' />
									<div className='w-3 h-3 rounded-full bg-neutral-400 shadow-lg' />
									<div className='w-12 h-px bg-neutral-300' />
								</div>
							</div>
						</div>

						{/* Scrolling School Logos */}
						<div className='flex-[1.5] flex items-center justify-center'>
							<div
								className='w-full max-w-7xl mx-auto overflow-hidden bg-white px-4 sm:px-6 lg:px-8 relative'
								style={{
									WebkitMaskImage:
										'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
									maskImage:
										'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
									WebkitMaskRepeat: 'no-repeat',
									maskRepeat: 'no-repeat',
								}}>
								<m.div
									className='flex gap-8 sm:gap-12 whitespace-nowrap motion-reduce:animate-none'
									animate={{
										x: ['0%', '-50%'],
									}}
									transition={{
										repeat: Infinity,
										repeatType: 'loop',
										ease: 'linear',
										duration: 15,
									}}>
									{SCHOOL_LOGOS_ARRAY.concat(SCHOOL_LOGOS_ARRAY).map((logo, index) => (
										<div
											key={index}
											className='flex-shrink-0 flex items-center justify-center px-3 sm:px-4'>
											<Image
												src={logo.src}
												alt={logo.alt}
												width={logo.width}
												height={logo.height}
												title={logo.title}
												loading='lazy'
												className='h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300'
												sizes='(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px'
											/>
										</div>
									))}
								</m.div>
							</div>
						</div>
					</section>

					{/* About Section */}
					<ErrorBoundaryWrapper sectionName='About Section'>
						<AboutSection />
					</ErrorBoundaryWrapper>

					{/* Founder Introduction Section */}
					<FounderIntroductionSection />

					{/* Three Pillars Section */}
					<section
						id='quantifiable-results-documentation'
						className='py-13 lg:py-32'>
						<ErrorBoundaryWrapper sectionName='Results Documentation'>
							<ThreePillarsSection />
						</ErrorBoundaryWrapper>
					</section>

					{/* Trust Indicators Section */}
					<section id='trust-indicators-social-proof'>
						<ErrorBoundaryWrapper sectionName='Trust Indicators'>
							<TrustIndicatorsGrid
								indicators={trustIndicators}
								studentImages={studentImages}
							/>
						</ErrorBoundaryWrapper>
					</section>

					{/* Services Carousel Section */}
					<section id='who-we-support-services'>
						<ErrorBoundaryWrapper sectionName='Who We Support Services'>
							<LazyServicesCarousel
								services={services}
								studentImages={studentImages}
							/>
						</ErrorBoundaryWrapper>
					</section>

					{/* Founder Quote Section */}
					<section
						id='founder-quote-testimonials'
						className='py-16 lg:py-24 bg-accent-600/15'>
						<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
							<Blockquote>
								{/* Quote icon */}
								<svg
									className='mb-6 h-14 w-14 fill-primary-700'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 18 14'>
									<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
								</svg>

								{/* Founder Quote - Hardcoded */}
								<p className='italic'>
									Parents come to us when something <strong>truly</strong> matters—an
									entrance exam, a lost sense of confidence, a desire for academic
									stretch. They stay with us because{' '}
									<strong>we deliver real progress, quietly and expertly</strong>. This
									is not a tutoring directory. This is{' '}
									<u>a bespoke service for ambitious families</u> looking for{' '}
									<strong>trusted partners in their child&apos;s academic career</strong>
									.
								</p>

								{/* Author with avatar */}
								<figcaption className='mt-4 flex items-center justify-center space-x-3'>
									<Avatar
										rounded
										size='xs'
										img='/images/team/elizabeth-burrows-founder-main.jpg'
										alt='Elizabeth Burrows'
									/>
									<div className='flex items-center divide-x-2 divide-neutral-500'>
										<cite className='pr-3'>Elizabeth Burrows</cite>
										<cite className='pl-3 text-neutral-500'>Founder</cite>
									</div>
								</figcaption>
							</Blockquote>
						</div>
					</section>
				</div>
			</main>

			{/* Footer */}
			<PageFooter showContactForm={true} />

			{/* CMS Architecture Dashboard (Development only) */}
			{(process.env.NODE_ENV === 'development' ||
				process.env['NEXT_PUBLIC_SHOW_CMS_MONITOR'] === 'true') && (
				<CMSArchitectureDashboard
					compactMode={true}
					autoRefresh={true}
					refreshInterval={5000}
					maxViolationsDisplay={5}
					showExportButton={process.env.NODE_ENV === 'development'}
					showFullDetails={false}
				/>
			)}
		</div>
	);
}
