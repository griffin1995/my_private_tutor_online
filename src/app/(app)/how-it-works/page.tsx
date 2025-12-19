'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TierDescriptions } from '@/components/sections/tier-descriptions';
import { TutorsSection } from '@/components/tutors/tutors-section';
import {
	AlternatingLayout,
	AlternatingRow,
	AlternatingRowBullets,
	AlternatingRowDescription,
	AlternatingRowHeader,
} from '@/components/ui/alternating-row';
import { TestimonialAuthorRole } from '@/components/testimonials/TestimonialAuthorRole';
import { m } from 'framer-motion';
import {
	Check,
	ClipboardCheck,
	Heart,
	MessageSquare,
	Target,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import type { JSX } from 'react';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR HOW IT WORKS PAGE
// ============================================================================

// Benefits content
const BENEFITS: readonly string[] = [
	'Remarkable results. Our tutees secure top marks year in, year out',
	'Tiered tutor options to suit every academic need and family budget',
	'Rigorous vetting, including enhanced DBS checks',
	'Ongoing personal and consultative support throughout your journey',
	'Automated lesson reminders 36 hours before tutorials to ensure you never forget a session',
	'Progress reports sent instantly via our tutor management system',
] as const;

// Base rate and promotional pricing
const BASE_RATE = {
	amount: 45,
	display: '£45',
	unit: 'hour',
} as const;

const PROMOTIONAL_PRICING = {
	tagline:
		'From essential support to expert guidance — all starting from just £45 per hour',
	feeDisclaimer:
		"Unlike many other providers, we don't charge registration, placement or administrative fees",
} as const;

// Tutor profiles section (complete structure with all profiles converted from object to array)
const TUTOR_PROFILES_SECTION = {
	title: 'Get to Know a Selection of Our Tutors',
	subtitle: null,
	description: (
		<>
			Here&apos;s a curated cross-section of our team, capturing{' '}
			<strong>the calibre and diversity of educators across tiers.</strong> This is
			just a glimpse;{' '}
			<strong>our full team spans every age, subject and academic stage</strong>,
			from preschool phonics to postgraduate Astrophysics.
			<br />
			<br />
			Simply <strong>complete our short enquiry form</strong>, and a member of our
			team will be in touch to start the conversation.
		</>
	) as JSX.Element,
	profiles: [
		{
			id: 'alma-maths-science',
			name: 'Alma',
			title: 'Maths & Science Specialist',
			tier: 'tier-one',
			badge: '🎓',
			education: {
				university: 'UCL',
				degree: 'First-Class MSci Astrophysics',
				additionalQualifications: [
					'PGCE (Secondary Maths), IoE',
					'Cognitive Psychology, Cambridge',
				],
				grade: 'First Class',
				graduationYear: '2020',
			},
			specializations: [
				'Mathematics',
				'Science',
				'Astrophysics',
				'International Baccalaureate (IB)',
			],
			experience: {
				yearsTeaching: 8,
				description:
					'10,000+ hours of online tutoring with classroom experience across independents, grammars, academies & state schools',
				totalStudents: 500,
				onlineHours: 10000,
			},
			achievements: [
				{
					title: 'Official Examiner',
					description: 'Examiner for GCSE & A Level Maths and Science',
					year: '2024',
				},
				{
					title: 'IB Expert',
					description: 'International Baccalaureate (IB) expert',
					year: '2023',
				},
				{
					title: 'Extensive Teaching Experience',
					description:
						'Classroom experience across independents, grammars, academies & state schools',
					year: '2025',
				},
			],
			image: {
				key: 'alma-maths-science',
				alt: 'Alma - Maths & Science Specialist',
				professionalHeadshot: true,
			},
			bio: 'Alma holds a First-Class MSci in Astrophysics from UCL, a PGCE in Secondary Maths from IoE, and studied Cognitive Psychology at Cambridge. As an official examiner for GCSE & A Level Maths and Science, she brings 10,000+ hours of online tutoring experience with classroom expertise across independents, grammars, academies & state schools.',
			testimonial: {
				quote:
					"She's making a huge difference to both my kids… they come away from lessons really buoyant.",
				author: 'Parent',
				context: 'Mathematics tutoring',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-15',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'First-Class MSci Astrophysics',
					institution: 'UCL',
					year: '2020',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'PGCE (Secondary Maths)',
					institution: 'Institute of Education',
					year: '2021',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Scientific and methodical, building understanding through practical application',
				methodology: [
					'Problem-based learning',
					'Scientific methodology',
					'IB preparation',
				],
				strengthAreas: [
					'Advanced mathematics',
					'Science integration',
					'International curricula',
				],
			},
			subjectExpertise: [
				{
					subject: 'Mathematics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 8,
				},
				{
					subject: 'Physics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 8,
				},
				{
					subject: 'Chemistry',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 6,
				},
				{
					subject: 'IB Mathematics',
					level: 'IB',
					examBoards: ['IB'],
					yearsExperience: 5,
				},
			],
			featured: true,
			order: 1,
		},

		{
			id: 'john-history',
			name: 'John',
			title: 'History Specialist',
			tier: 'tier-one',
			badge: '📜',
			education: {
				university: 'University of Birmingham',
				degree: 'BA History (First Class)',
				additionalQualifications: ['PGCE, Secondary History'],
				grade: 'First Class',
				graduationYear: null,
			},
			specializations: [
				'History (GCSE & A Level)',
				'Exam preparation and essay technique',
				'Revision and study strategy',
			],
			experience: {
				yearsTeaching: '16+',
				description:
					'16+ years teaching experience\n11 years as Head of History\n4 years at Uppingham School (top independent school)\nCurrent Assistant Director of Studies with Senior Leadership responsibilities',
				totalStudents: null,
				eliteSchools: [
					<>
						11 years as <strong>Head of History</strong>
					</>,
					<>
						4 years at <strong>Uppingham School</strong>
					</>,
					<>
						Current <strong>Assistant Director of Studies</strong> with Senior
						Leadership responsibilities
					</>,
				] as JSX.Element[],
			},
			achievements: [
				{
					title: 'GCSE & A Level History Examiner',
					description: null,
					year: null,
				},
			],
			image: {
				key: 'john-history',
				alt: 'John - History Specialist',
				professionalHeadshot: true,
			},
			bio: (
				<>
					John is an accomplished History educator with over sixteen years of
					classroom experience, including more than a decade leading History
					departments. He currently serves as <strong>Head of History</strong> and{' '}
					<strong>Assistant Director of Studies</strong> at a high-performing state
					school, following four years at <strong>Uppingham School</strong>, one of
					the UK’s leading independent schools.
					<br />
					<br />A <strong>seasoned GCSE and A Level examiner</strong>, John combines
					his deep subject expertise with a sharp understanding of assessment
					criteria. His teaching is rigorous yet engaging, helping students develop
					both critical thinking and exam precision. He also designs and leads{' '}
					<strong>intensive revision courses</strong>, where students have achieved
					remarkable improvements — including{' '}
					<strong>one pupil who rose from a D to an A grade.</strong>
					<br />
					<br />
					With his blend of leadership experience, examiner insight, and proven
					results, John offers exceptional academic guidance for students aiming for
					top grades in History.
				</>
			) as JSX.Element,
			testimonial: {
				quote:
					'John’s sessions have really turned around History for me. His feedback is so clear and his enthusiasm makes even tough topics enjoyable.',
				author: 'A-Level History Student',
				context: 'null',
			},
			availability: {
				status: 'available',
				nextAvailable: null,
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA History (First Class)',
					institution: 'University of Birmingham',
					year: null,
					verified: true,
				},
				{
					type: 'qualification',
					title: 'PGCE, Secondary History',
					institution: null,
					year: null,
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Rigorous yet engaging, combining deep subject expertise with exam precision and leadership experience',
				methodology: ['Exam preparation', 'Essay technique', 'Revision strategy'],
				strengthAreas: [
					'History subject expertise',
					'Exam insight',
					'Leadership in teaching',
				],
			},
			subjectExpertise: [
				{
					subject: 'History',
					level: 'A-Level & GCSE',
					examBoards: [],
					yearsExperience: 16,
				},
			],
			featured: true,
			order: 2,
		},
		{
			id: 'emily-entrance-history',
			name: 'Emily',
			title: 'Entrance Exam Expert',
			tier: 'tier-one',
			badge: '🏛️',
			education: {
				university: 'Cambridge & Oxford',
				degree: 'BA History, Cambridge',
				additionalQualifications: ['PGCE, Oxford'],
				grade: 'First Class',
				graduationYear: '2018',
			},
			specializations: [
				'Entrance Exams (11+ and 13+)',
				'Elite School Preparation',
			],
			experience: {
				yearsTeaching: 8,
				description:
					'Former teacher at Latymer, Merchant Taylors, North London Collegiate with official 11+ examiner experience',
				totalStudents: 200,
				eliteSchools: [
					'Staff member at Latymer (top 10 London grammar)',
					'Staff member at Merchant Taylors (leading independent school)',
					'Staff member at North London Collegiate (top 3 girls’ school in the UK)',
				],
			},
			achievements: [
				{
					title: 'Official 11+ Examiner',
					description: 'Official 11+ examiner and assisted identifying top scholars',
					year: '2024',
				},
			],
			image: {
				key: 'emily-entrance-history',
				alt: 'Emily - Entrance Exam Expert, History & Politics',
				professionalHeadshot: true,
			},
			bio: 'Emily holds a BA History from Cambridge and PGCE from Oxford. A former teacher at Latymer, Merchant Taylors, and North London Collegiate, she serves as an official 11+ examiner. She has supported their admissions process and has insider knowledge of what the most oversubscribed schools are looking for in candidates. Her students consistently win places at top institutions including Eton, Harrow, and other prestigious institutions.',
			testimonial: {
				quote:
					"Offers from St Paul's, Westminster, Highgate and UCS. We can't believe it!",
				author: 'Parent',
				context: 'Independent school entrance success',
			},
			availability: {
				status: 'limited',
				nextAvailable: '2025-02-01',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA History',
					institution: 'University of Cambridge',
					year: '2018',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'PGCE',
					institution: 'University of Oxford',
					year: '2019',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Elite preparation with strategic entrance exam technique and historical analysis',
				methodology: [
					'Entrance exam strategy',
					'Historical analysis',
					'Elite school preparation',
				],
				strengthAreas: [
					'11+ and 13+ preparation',
					'Elite school admissions',
					'Historical research',
				],
			},
			subjectExpertise: [
				{
					subject: 'History',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 7,
				},
				{
					subject: 'Politics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 6,
				},
				{
					subject: '11+ Preparation',
					level: '11+',
					examBoards: ['CEM', 'GL Assessment'],
					yearsExperience: 5,
				},
				{
					subject: '13+ Preparation',
					level: '13+',
					examBoards: ['Common Entrance'],
					yearsExperience: 5,
				},
			],
			featured: true,
			order: 3,
		},
	],
	showAllButton: {
		text: 'Meet Some of our Team',
		href: '/meet-our-tutors',
	},
	backgroundStyle: 'light',
} as const;

export default function HowItWorksPage() {
	const benefits = BENEFITS;
	const baseRate = BASE_RATE;
	const promotionalPricing = PROMOTIONAL_PRICING;
	const tutorProfilesSection = TUTOR_PROFILES_SECTION;

	return (
		<>
			<PageLayout
				background='white'
				containerSize='full'
				verticalSpacing='none'
				footerProps={{
					showContactForm: true,
				}}>
				<section id='how-it-works-hero'>
					<SimpleHero
						backgroundImage="/images/hero/how-it-works.jpeg"
						h1="Your Journey To"
						h1AccentText="Academic Success"
						h2="Outstanding Tuition. Tailored Pairing. Ongoing Guidance."
						decorativeStyle="lines"
					/>
				</section>
				{/* New Alternating Row Components */}
				<AlternatingLayout
					spacing='normal'
					maxWidth='full'
					className='bg-white'>
					{/* Row 1: Initial Consultation */}
					<AlternatingRow
						variant='left'
						number={1}
						icon={MessageSquare}
						image={{
							src: '/images/how-it-works/initial-consultation-16-9.jpg',
							alt: "Initial consultation with founder Elizabeth to understand your child's academic profile",
							width: 800,
							height: 600,
							priority: true,
						}}>
						<AlternatingRowHeader level={2}>
							Initial Consultation
						</AlternatingRowHeader>
						<AlternatingRowDescription>
							You begin with a one-to-one conversation with our Founder Elizabeth to
							understand your child&apos;s academic profile, personality, and goals.
						</AlternatingRowDescription>
						<AlternatingRowBullets
							variant='icons'
							items={[
								'Subject strengths and areas for development',
								'Upcoming exams or milestones',
								'Preferred learning style',
								'Any school-specific requirements',
							]}
						/>
					</AlternatingRow>

					{/* Row 2: Tiered Tutoring Options */}
					<AlternatingRow
						variant='right'
						number={2}
						icon={Target}
						image={{
							src: '/images/how-it-works/tiered-tutoring-options.jpg',
							alt: 'Flexible tiered tutoring model with options for every budget and academic need',
							width: 800,
							height: 600,
						}}>
						<AlternatingRowHeader level={2}>
							Tiered Tutoring Options
						</AlternatingRowHeader>
						<AlternatingRowDescription>
							Whether your child needs general mentoring or specialist preparation, our
							flexible tiered tutoring model allows you to choose the level of support
							that fits your child&apos;s needs and your budget. Specialist tutoring
							begins at just £45 per hour. Unlike many other providers, we don&apos;t
							charge registration or administrative fees—you only pay for your time
							with a carefully matched, dedicated tutor.
						</AlternatingRowDescription>
						<AlternatingRowBullets
							variant='icons'
							items={[
								'Tier 1: Official examiners - Insider tips, tricks and exam technique for top grades',
								'Tier 2: Qualified teachers - Specialist support from seasoned schoolteachers',
								'Tier 3: University graduates - Mentoring from experts in their specific subject',
								'Starting from just £45 per hour',
							]}
						/>
					</AlternatingRow>

					{/* Row 3: Expert Tutor Matching */}
					<AlternatingRow
						variant='left'
						number={3}
						icon={Users}
						image={{
							src: '/images/how-it-works/expert-tutor-matching.jpg',
							alt: 'Expert tutor matching process pairing students with qualified professionals',
							width: 800,
							height: 600,
						}}>
						<AlternatingRowHeader level={2}>
							Expert Tutor Matching
						</AlternatingRowHeader>
						<AlternatingRowDescription>
							Elizabeth worked alongside the majority of our tutors as colleagues
							during her international career. The rest come to us via personal
							recommendations from our trusted team, selecting only those with an
							outstanding educational pedigree, impressive tutoring background and
							passion for nurturing young minds. She brings this deep personal
							knowledge to every match, pairing students with not only a perfectly
							qualified tutor, but also a personality they will resonate well with.
						</AlternatingRowDescription>
						<AlternatingRowBullets
							variant='icons'
							items={[
								'Oxbridge alumni',
								'Heads of Department at top 10 UK schools',
								'Accredited GCSE, A Level and IB examiners',
								'PhD and Postdocs',
							]}
						/>
					</AlternatingRow>

					{/* Row 4: Progress Reports & Support */}
					<AlternatingRow
						variant='right'
						number={4}
						icon={ClipboardCheck}
						image={{
							src: '/images/how-it-works/progress-reports-support.jpg',
							alt: 'Comprehensive progress reports and automated lesson reminders for ongoing support',
							width: 800,
							height: 600,
						}}>
						<AlternatingRowHeader level={2}>
							Progress Reports & Support
						</AlternatingRowHeader>
						<AlternatingRowDescription>
							To ensure meaningful progress, your tutor submits a detailed report after
							every lesson—including what was covered, homework assigned, and clear
							feedback on your child&apos;s strengths and areas for development. Each
							report combines quantitative ratings with qualitative insights, giving
							you a well-rounded view of your child&apos;s performance. Reports are
							automatically emailed and available at any time via your secure login.
							You&apos;ll also receive automated lesson reminders 36 hours before each
							session, keeping everything running smoothly with minimal effort on your
							part.
						</AlternatingRowDescription>
						<AlternatingRowBullets
							variant='icons'
							items={[
								'What was covered and homework assigned',
								'Clear feedback on strengths and development areas',
								'Automated lesson reminders 36 hours before sessions',
								'Secure login access to all reports',
							]}
						/>
					</AlternatingRow>

					{/* Row 5: Ongoing Support & Educational Partnership */}
					<AlternatingRow
						variant='left'
						number={5}
						icon={Heart}
						image={{
							src: '/images/how-it-works/ongoing-support-partnership.avif',
							alt: 'Long-term educational partnership providing ongoing consultative support',
							width: 800,
							height: 600,
						}}>
						<AlternatingRowHeader level={2}>
							Ongoing Support & Educational Partnership
						</AlternatingRowHeader>
						<AlternatingRowDescription>
							At My Private Tutor Online, our commitment doesn&apos;t end with a
							successful tutor match—it begins there. We offer ongoing consultative
							support to ensure your child continues to thrive. Our highly responsive
							team is always available to assist, whether it&apos;s rescheduling a
							session or tweaking lesson focus in light of a school report or
							parents&apos; evening feedback. We work closely with you to ensure each
							tutorial remains purposeful and aligned with your child&apos;s evolving
							needs.
						</AlternatingRowDescription>
						<AlternatingRowBullets
							variant='icons'
							items={[
								'Ongoing consultative support throughout your journey',
								'Highly responsive team always available to assist',
								'Flexible lesson adjustments based on school feedback',
								'Long-term educational partnership from early years to university',
							]}
						/>
					</AlternatingRow>
				</AlternatingLayout>
				<section
					id='journey-quote'
					className='bg-primary-50'>
					<div className='[&>section]:py-10 sm:[&>section]:py-12 md:[&>section]:py-16'>
						<TestimonialAuthorRole
							quote="At My Private Tutor Online, we offer more than just tutoring—we provide thoughtful, expert advice at every stage of your child's academic journey. Our service is consultative, personal, and bespoke to your family's individual needs."
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

				<section id='how-it-works-tutors'>
					<TutorsSection
						data={tutorProfilesSection}
						showFeaturedOnly={false}
						showViewAllButton={true}
						className='bg-white'
					/>
				</section>

				<section id='how-it-works-tutoring-tiers'>
					<TierDescriptions
						title='Choose Your Bespoke Tutoring Experience'
						subtitle="Whether you're seeking essential academic mentoring or the insight of a specialist examiner, find the level of guidance that feels right for your child and your family."
						showExpandable={true}
					/>

					<div className='relative bg-white pb-12'>
						<div className='text-center'>
							<div className='rounded-2xl p-8 max-w-2xl mx-auto'>
								<p className='mb-6'>
									Bespoke 1-2-1 tutoring starts from just{' '}
									<span className='text-accent-700 bg-accent-50 px-2 py-1 rounded-lg'>
										{baseRate.display} per hour
									</span>
								</p>
								<p>{promotionalPricing.feeDisclaimer}</p>
							</div>
						</div>
					</div>
				</section>

				<section
					id='how-it-works-benefits'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
						<div className='text-center mb-16 lg:mb-20'>
							<h2 className='mb-8'>Why Families Choose Our Approach</h2>

							<p className='max-w-4xl mx-auto'>
								Discover what sets My Private Tutor Online apart as the trusted choice
								of families across the world.
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20 items-stretch'>
							<m.div
								className='relative rounded-none overflow-hidden shadow-lg flex-1'
								initial={{
									opacity: 0,
									x: -30,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								viewport={{
									once: true,
									margin: '-50px',
								}}
								transition={{
									duration: 0.8,
									ease: [0.25, 0.1, 0.25, 1],
								}}>
								<div className='relative h-full'>
									<Image
										src='/images/how-it-works/why-families-choose-our-approach.jpg'
										alt='Why families choose our premium tutoring approach - professional educational consultation'
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, 50vw'
									/>
								</div>
							</m.div>

							<m.div
								initial={{
									opacity: 0,
									x: 30,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								viewport={{
									once: true,
									margin: '-50px',
								}}
								transition={{
									duration: 0.8,
									delay: 0.2,
									ease: [0.25, 0.1, 0.25, 1],
								}}>
								<div className='space-y-6'>
									{benefits && benefits.length > 0 ?
										benefits.map((benefit: string, index: number) => (
											<m.div
												key={index}
												className='flex items-start gap-4 group'
												initial={{
													opacity: 0,
													y: 20,
												}}
												whileInView={{
													opacity: 1,
													y: 0,
												}}
												viewport={{
													once: true,
													margin: '-50px',
												}}
												transition={{
													duration: 0.6,
													delay: 0.4 + index * 0.1,
													ease: [0.25, 0.1, 0.25, 1],
												}}>
												<div className='flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center  duration-300 mt-1'>
													<Check className='w-5 h-5 text-primary-700' />
												</div>

												<div className='flex-1'>
													<p className='transition-colors duration-300'>{benefit}</p>
												</div>
											</m.div>
										))
									:	<div className='text-center py-12'>
											<p>Benefits are currently being loaded...</p>
										</div>
									}
								</div>
							</m.div>
						</div>
					</div>
				</section>
			</PageLayout>
		</>
	);
}
