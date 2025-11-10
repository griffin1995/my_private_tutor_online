'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TutorsSection } from '@/components/tutors/tutors-section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MissionQuote } from '@/components/ui/blockquote';
import { m } from 'framer-motion';
import {
	CheckCircle,
	ClipboardCheck,
	MessageSquare,
	Target,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { JSX } from 'react';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR HOW IT WORKS PAGE
// ============================================================================

// Type definitions for hardcoded data
interface HowItWorksStep {
	readonly number: string;
	readonly title: string;
	readonly description: string;
	readonly features: readonly string[];
	readonly icon: string;
	readonly image: string;
}

interface TutorTier {
	readonly tier: string;
	readonly subtitle: string;
	readonly description: string | JSX.Element;
	readonly bestFor: string;
	readonly pricePoint: string;
	readonly level: string;
	readonly colour: string;
	readonly hasCrown?: boolean;
}

// Hero content

// Process steps content
const PROCESS_STEPS: readonly HowItWorksStep[] = [
	{
		number: '01',
		title: 'Initial Consultation',
		description:
			"You begin with a one-to-one conversation with our Founder Elizabeth to understand your child's academic profile, personality, and goals.",
		features: [
			'Subject strengths and areas for development',
			'Upcoming exams or milestones',
			'Preferred learning style',
			'Any school-specific requirements',
		],
		icon: 'MessageSquare',
		image: '/images/initial-consultation.jpg',
	},
	{
		number: '02',
		title: 'Tiered Tutoring Options',
		description:
			"Whether your child needs general mentoring or specialist preparation, our flexible tiered tutoring model allows you to choose the level of support that fits your child's needs and your budget. Specialist tutoring begins at just £45 per hour. Unlike many other providers, we don't charge registration or administrative fees—you only pay for your time with a carefully matched, dedicated tutor.",
		features: [
			'Tier 1: Official examiners - Insider tips, tricks and exam technique for top grades',
			'Tier 2: Qualified teachers - Specialist support from seasoned schoolteachers',
			'Tier 3: University graduates - Mentoring from experts in their specific subject',
			'Starting from just £45 per hour',
		],
		icon: 'Target',
		image: '/images/personalised-learning-plan.jpg',
	},
	{
		number: '03',
		title: 'Expert Tutor Matching',
		description:
			'Elizabeth worked alongside the majority of our tutors as colleagues during her international career. The rest come to us via personal recommendations from our trusted team, selecting only those with an outstanding educational pedigree, impressive tutoring background and passion for nurturing young minds. She brings this deep personal knowledge to every match, pairing students with not only a perfectly qualified tutor, but also a personality they will resonate well with.',
		features: [
			'Oxbridge alumni',
			'Heads of Department at top 10 UK schools',
			'Accredited GCSE, A Level and IB examiners',
			'PhD and Postdocs',
		],
		icon: 'Users',
		image: '/images/expert-tutor-matching.jpg',
	},
	{
		number: '04',
		title: 'Progress Reports & Support',
		description:
			"To ensure meaningful progress, your tutor submits a detailed report after every lesson—including what was covered, homework assigned, and clear feedback on your child's strengths and areas for development. Each report combines quantitative ratings with qualitative insights, giving you a well-rounded view of your child's performance. Reports are automatically emailed and available at any time via your secure login. You'll also receive automated lesson reminders 36 hours before each session, keeping everything running smoothly with minimal effort on your part.",
		features: [
			'What was covered and homework assigned',
			'Clear feedback on strengths and development areas',
			'Automated lesson reminders 36 hours before sessions',
			'Secure login access to all reports',
		],
		icon: 'ClipboardCheck',
		image: '/images/flexible-scheduling.jpg',
	},
	{
		number: '05',
		title: 'Ongoing Support & Educational Partnership',
		description:
			"At My Private Tutor Online, our commitment doesn't end with a successful tutor match—it begins there. We offer ongoing consultative support to ensure your child continues to thrive.\n\nOur highly responsive team is always available to assist, whether it's rescheduling a session or tweaking lesson focus in light of a school report or parents' evening feedback. We work closely with you to ensure each tutorial remains purposeful and aligned with your child's evolving needs.",
		features: [
			'Ongoing consultative support throughout your journey',
			'Highly responsive team always available to assist',
			'Flexible lesson adjustments based on school feedback',
			'Long-term educational partnership from early years to university',
		],
		icon: 'MessageSquare',
		image: '/images/progress-tracking.jpg',
	},
] as const;

// Tutor tiers content
const TUTOR_TIERS: readonly TutorTier[] = [
	{
		tier: 'Tier 2',
		subtitle: 'Qualified Teachers with a Results-Focused Approach',
		description: (
			<>
				Our Tier Two tutors are qualified teachers with{' '}
				<strong>years of classroom experience</strong> and a{' '}
				<strong>proven record of raising attainment</strong>. Some also bring
				valuable leadership expertise from roles on Senior Leadership Teams and as
				internal moderators—overseeing marking standards across their departments.
				<br />
				<br />
				Their professional training means they are{' '}
				<strong>fluent in a range of pedagogical approaches</strong> and highly
				skilled at adapting to different learning styles and needs. They know how to
				<strong>pinpoint precisely where marks are being lost</strong> and provide
				expert, targeted guidance to close those gaps.
				<br />
				<br />
				With Tier Two tutors, you're investing in seasoned educators who know what
				works from countless hours in the classroom—and who deliver consistent,
				measurable progress. Whether your child is preparing for exams or entrance
				assessments, Tier Two tutors combine deep expertise with a track record of
				proven results.
			</>
		) as JSX.Element,
		bestFor: 'Curriculum mastery, consistency',
		pricePoint: 'From £65/hour',
		level: 'mid',
		colour: 'silver',
	},
	{
		tier: 'Tier 1',
		subtitle: 'The Elite Choice for Exceptional Results',
		description: (
			<>
				Our Tier One tutors are our &apos;super tutors&apos;—experienced educators
				with a <strong>decade or more</strong> in the classroom, many with 30+
				years&apos; expertise and Senior Leadership Team responsibilities.
				<br />
				<br /> What truly sets them apart? Every Tier One tutor is an{' '}
				<strong>official examiner</strong>. They mark and/or grade papers for real
				summer and winter exams. This means they know exactly how examiners think,
				what scorers are looking for, and precisely how to hit every point on the
				mark scheme.
				<br />
				<br />
				<strong>
					Your child doesn&apos;t just learn the content—they learn how to
					demonstrate mastery in exactly the way examiners reward
				</strong>
				. Tier One tutors excel at diagnosing weaknesses, refining exam technique,
				and delivering transformational results: from U grades to C+ in a single
				month, and entrance exam scores in the top 2% of candidates. When you choose
				Tier One, you&apos;re investing in tutors who understand the exam arena from
				the inside out.
			</>
		) as JSX.Element,
		bestFor: 'Top grades, exam strategy',
		pricePoint: 'From £85/hour',
		level: 'premium',
		colour: 'gold',
		hasCrown: true,
	},
	{
		tier: 'Tier 3',
		subtitle: 'Relatable Role Models with Specialist Subject Knowledge',
		description: (
			<>
				Our Tier Three tutors are subject specialists who combine strong academic
				knowledge with an approachable, engaging teaching style. Studying at or
				having graduated from top universities (including Oxbridge), these tutors
				work closely with students to strengthen understanding, build confidence,
				and improve performance.
				<br />
				While they may not hold formal teaching qualifications, Tier Three tutors
				bring valuable experience in one-to-one tuition and an infectious passion
				for their subjects. Many are in their first decade out of education
				themselves, which can help foster a natural rapport with tutees and a
				positive, motivating learning dynamic.
				<br />
				With Tier Three tutors, your child benefits from knowledgeable, relatable
				educators who inspire curiosity and encourage steady academic progress.
			</>
		) as JSX.Element,
		bestFor: 'Mentoring, subject confidence',
		pricePoint: 'From £45/hour',
		level: 'standard',
		colour: 'bronze',
	},
] as const;

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
			Here's a curated cross-section of our team, capturing{' '}
			<strong>the calibre and diversity of educators across tiers.</strong> This is just a glimpse;{' '}
			<strong>our full team spans every age, subject and academic stage</strong>, from preschool phonics to postgraduate Astrophysics.
			<br />
			<br />
			Simply <strong>complete our short enquiry form</strong>, and a member of our team will be in touch to start the conversation.
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

const iconMap = {
	MessageSquare,
	Users,
	Target,
	ClipboardCheck,
} as const;

export default function HowItWorksPage() {
	const processSteps = PROCESS_STEPS;
	const tutorTiers = TUTOR_TIERS;
	const benefits = BENEFITS;
	const baseRate = BASE_RATE;
	const promotionalPricing = PROMOTIONAL_PRICING;
	const tutorProfilesSection = TUTOR_PROFILES_SECTION;

	// State to track which tier cards are expanded
	const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
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
						backgroundImage='/images/hero/how-it-works.jpeg'
						h1={
							<span className='text-white'>
								Your Journey To{' '}
								<span className='text-accent-600'>Academic Success</span>
							</span>
						}
						h2='Outstanding Tuition. Tailored Pairing. Ongoing Guidance.'
						decorativeStyle='lines'
					/>
				</section>
				<section
					id='how-it-works-process-steps'
					className='relative bg-white pt-12 lg:pt-16 pb-20 lg:pb-32'>
					<div className='relative container mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='text-center mb-4'>
							<h2>Your Journey To Academic Success</h2>
						</div>

						<section
							id='journey-quote'
							className='py-8 lg:py-12 bg-primary-50'>
							<div className='container mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center'>
								<MissionQuote
									showCite={true}
									cite='My Private Tutor Online'
									author='Elizabeth Burrows'
									role='Founder'
									size='lg'>
									At My Private Tutor Online, we offer more than just tutoring—we
									provide thoughtful, expert advice at every stage of your child's
									academic journey. Our service is consultative, personal, and{' '}
									<strong>bespoke to your family's individual needs</strong>.
								</MissionQuote>
							</div>
						</section>

						<div className='relative w-full'>
							<div className='space-y-0'>
								{processSteps && processSteps.length > 0 ? (
									processSteps.map((step: HowItWorksStep, index: number) => {
										const IconComponent = iconMap[step.icon as keyof typeof iconMap];
										const isEven = index % 2 === 0;
										return (
											<m.div
												key={index}
												initial={{
													opacity: 0,
													x: isEven ? -30 : 30,
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
													delay: index * 0.1,
												}}
												className='w-full'>
												<div className='grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr gap-0 items-stretch'>
													<div
														className={`relative w-full ${
															isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
														}`}>
														<div className='relative w-full aspect-[17/9] lg:aspect-auto'>
															<Image
																src={step.image}
																alt={`${step.title} - Step ${step.number}`}
																fill
																className='object-cover w-full h-full'
																sizes='(max-width: 768px) 100vw, 50vw'
															/>
														</div>
													</div>

													<div
														className={`bg-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-20 ${
															isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
														}`}>
														<div
															className={`${
																isEven ? 'border-l-4 pl-8' : 'border-r-4 pr-8'
															} border-primary-700'`}>
															<div className='flex items-start gap-4 mb-6'>
																<div className='flex-shrink-0 w-12 h-12 bg-primary-700 flex items-center justify-center shadow-md'>
																	<span className='text-white'>{step.number}</span>
																</div>

																<div className='flex-1'>
																	<div className='flex items-center gap-2 mb-2'>
																		<IconComponent className='w-5 h-5 text-accent-600' />
																		<h3>{step.title}</h3>
																	</div>
																</div>
															</div>

															<div className='mb-6'>
																{step.description.split('\n').map(
																	(paragraph, pIndex) =>
																		paragraph.trim() && (
																			<p
																				key={pIndex}
																				className={pIndex > 0 ? 'mt-4' : ''}>
																				{paragraph.trim()}
																			</p>
																		),
																)}
															</div>

															<ul className='space-y-3'>
																{step.features.map((feature: string, featureIndex: number) => (
																	<li
																		key={featureIndex}
																		className='flex items-start gap-3'>
																		<div className='flex-shrink-0 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center mt-0.5'>
																			<CheckCircle className='w-3 h-3 text-white' />
																		</div>
																		<span>{feature}</span>
																	</li>
																))}
															</ul>
														</div>
													</div>
												</div>
											</m.div>
										);
									})
								) : (
									<div className='text-center py-12'>
										<p>Process steps are currently being loaded...</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				<section id='how-it-works-tutors'>
					<TutorsSection
						data={tutorProfilesSection}
						showFeaturedOnly={false}
						showViewAllButton={true}
					/>
				</section>

				<section
					id='how-it-works-tutoring-tiers'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16'>
						<div className='text-center mb-16 lg:mb-20'>
							<h2 className='mb-8'>Choose Your Bespoke Tutoring Experience</h2>

							<p className='max-w-4xl mx-auto'>
								Whether you’re seeking essential academic mentoring or the insight of a
								specialist examiner, find the level of guidance that feels right for
								your child and your family.
							</p>
						</div>

						<div className='relative'>
							<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
								{tutorTiers && tutorTiers.length > 0 ? (
									[...tutorTiers]
										.sort((a: TutorTier, b: TutorTier) => {
											const tierOrder = {
												'Tier 3': 0,
												'Tier 2': 1,
												'Tier 1': 2,
											};
											return (
												tierOrder[a.tier as keyof typeof tierOrder] -
												tierOrder[b.tier as keyof typeof tierOrder]
											);
										})
										.map((tier: TutorTier, index: number) => {
											const isExpanded = expandedCards[index] || false;

											return (
												<m.div
													key={index}
													className='relative'
													initial={{
														opacity: 0,
														y: 40,
													}}
													whileInView={{
														opacity: 1,
														y: 0,
													}}
													viewport={{
														once: true,
														margin: '-100px',
													}}
													transition={{
														duration: 0.8,
														delay: index * 0.1,
													}}>
													<m.div
														animate={{
															height: isExpanded ? 'auto' : undefined,
														}}
														transition={{
															duration: 0.5,
															ease: [0.25, 0.1, 0.25, 1],
														}}
														className={
															isExpanded ? '' : 'aspect-square overflow-hidden'
														}>
														<Card className='bg-white border-2 border-neutral-300 hover:border-accent-500/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-none flex flex-col relative'>
															{!isExpanded ? (
																<div className='flex flex-col h-full px-6 lg:px-8 py-8 text-center relative'>
																	{/* Tier Name */}
																	<h3 className='mb-4'>{tier.tier}</h3>

																	{/* Tier Subtitle */}
																	<p className='mb-6 text-base'>{tier.subtitle}</p>

																	{/* Grey Line Separator */}
																	<Separator className='mb-6 bg-neutral-300 w-full' />

																	{/* Hourly Rate */}
																	<div className='mb-6 text-lg font-semibold'>
																		{tier.pricePoint}
																	</div>

																	{/* Description Preview with Gradient Overlay */}
																	<div className='relative flex-1 mb-20'>
																		<div className='text-left text-sm leading-relaxed line-clamp-6 space-y-4'>
																			{typeof tier.description === 'string'
																				? tier.description
																				: tier.description}
																		</div>

																		{/* Gradient Overlay - covers bottom third only */}
																		<div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-white/95 to-white pointer-events-none' />
																	</div>

																	{/* Learn More Button - positioned at bottom of card */}
																	<button
																		onClick={() =>
																			setExpandedCards((prev) => ({
																				...prev,
																				[index]: true,
																			}))
																		}
																		className='absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-6 py-2 bg-primary-700 text-white hover:bg-primary-800 transition-colors duration-300 text-sm font-medium rounded'
																		aria-label={`Learn more about ${tier.tier}`}>
																		Learn More
																	</button>
																</div>
															) : (
																<>
																	<CardHeader className='text-center pb-6 pt-8 px-6 lg:px-8 flex-shrink-0'>
																		<h3 className='mb-4'>{tier.tier}</h3>

																		{/* Tier Subtitle - preserved in expanded state */}
																		<p className='mb-4 text-base'>{tier.subtitle}</p>

																		<Separator className='my-4 bg-neutral-300' />

																		<div className='mb-2'>{tier.pricePoint}</div>
																	</CardHeader>

																	<CardContent className='text-center px-6 lg:px-8 pb-4 lg:pb-4 flex-1 flex flex-col relative'>
																		<div className='mb-4 flex-1 text-left'>
																			<div className='text-sm leading-relaxed space-y-4'>{tier.description}</div>
																		</div>

																		<Separator className='my-4 bg-neutral-300' />

																		<div className='text-center'>
																			<p className='mb-3 font-semibold'>Best For:</p>
																			<p>{tier.bestFor}</p>
																		</div>
																	</CardContent>
																</>
															)}
														</Card>
													</m.div>
												</m.div>
											);
										})
								) : (
									<div className='text-center py-12'>
										<p>Tutoring tiers are currently being loaded...</p>
									</div>
								)}
							</div>
						</div>

						<div className='text-center mt-12'>
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

							<div className='flex items-center justify-center gap-4 mb-8'>
								<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
							</div>

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
										src='/images/graphics/feature-why-families-choose-approach.jpg'
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
									{benefits && benefits.length > 0 ? (
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
												<div className='flex-shrink-0 w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center shadow-md transition-shadow duration-300 mt-1'>
													<CheckCircle className='w-5 h-5 text-white' />
												</div>

												<div className='flex-1'>
													<p className='transition-colors duration-300'>{benefit}</p>
												</div>
											</m.div>
										))
									) : (
										<div className='text-center py-12'>
											<p>Benefits are currently being loaded...</p>
										</div>
									)}
								</div>
							</m.div>
						</div>
					</div>
				</section>
			</PageLayout>
		</>
	);
}
