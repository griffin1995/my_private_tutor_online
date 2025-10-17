'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { PageLayout } from '@/components/layout/page-layout';
import { getFaqIconComponent } from '@/components/faq/FaqIcons';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR FAQ PAGE
// ============================================================================

// FAQ Categories with all questions and answers
const FAQ_CATEGORIES = [
	{
		id: 'about-service',
		title: 'About the Service',
		questions: [
			{
				question: 'What is My Private Tutor Online?',
				answer:
					'My Private Tutor Online is a boutique, specialist tutoring company founded in 2010 by Bristol-educated, Cambridge-accepted educator and ex-Forbes journalist Elizabeth Burrows. We deliver premium one-to-one tuition for students from KS1 to A-Level and IB. Our carefully selected tutors include Oxbridge graduates, experienced teachers, and official examiners.',
			},
			{
				question: 'Why do parents choose My Private Tutor Online?',
				answer:
					"Personalised Experience: Our model is highly curated. My Private Tutor Online was born from Elizabeth's personal network of colleagues she worked with throughout her international tutoring career. She personally guides the tutor selection process, ensuring every family receives attentive, professional service. Expert Examiners: Our Tier 1 tutors are official examiners who write and/or mark real 11+, GCSE, A-Level, and IB assessments. Their insight into the marking process gives our students a competitive edge. Track Record: We have deep expertise in UK education, having advised on secondary school entrance exams and university admissions, including Oxbridge. Outstanding Results: 11+ candidates often place in the top 2%, 94% of GCSE students improve by two or more grades, many jump from grade 5 to grade 8/9 in a matter of months.",
			},
			{
				question: 'What are the benefits of online tutoring?',
				answer:
					'Access to elite tutors from anywhere in the world (e.g. a student in Malaysia being coached for a Medicine application by a scientist working at the University of Oxford), flexible scheduling, use of interactive tools like whiteboards and screen-sharing, optional recorded lessons, and safe, secure learning from home.',
			},
			{
				question: 'Do you offer in-person tutoring?',
				answer:
					'Our focus is online tutoring to maximise quality and match. However, we do have a select group of trusted educators who offer in-person sessions in London. Please contact info@myprivatetutoronline.com to enquire about availability.',
			},
		],
	},
	{
		id: 'tutors-teaching',
		title: 'Tutors & Teaching',
		questions: [
			{
				question: 'How do the tutor tiers work?',
				answer:
					"Tier 1: Official examiners and senior educators (From £85/hour) – ideal for top grades and exam strategy. Tier 2: Qualified teachers with 5+ years of classroom experience (From £65/hour) – perfect for curriculum mastery and consistency. Tier 3: Graduate subject specialists from top UK universities (From £45/hour) – ideal for mentoring, confidence building, and foundational support. All tutoring starts from just £45 per hour. Unlike many other providers, we don't charge registration or administrative fees—you pay solely for your time with a carefully matched, dedicated tutor.",
			},
			{
				question: 'Which tutor tier is right for me or my child?',
				answer:
					'Tier 1 (From £85/hour): Official examiners and senior educators - Best for top grades and exam strategy. Tier 2 (From £65/hour): Qualified, experienced classroom teachers - Best for curriculum mastery and consistency. Tier 3 (From £45/hour): Exceptional graduates from top UK universities - Best for mentoring and building subject confidence.',
			},
			{
				question: "What if I don't like my tutor?",
				answer:
					"No problem. We'll quickly match you with another educator until we find the ideal fit.",
			},
			{
				question: 'Do you have tutors for creative subjects too?',
				answer:
					'Yes. We provide expert tutoring in subjects like Art, Drama, Music, Creative Writing, Journalism, Media Studies, and Film. Many of these tutors are working professionals in their fields.',
			},
		],
	},
	{
		id: 'subjects-curriculum',
		title: 'Subjects & Curriculum',
		questions: [
			{
				question: 'What subjects do you offer tutoring in?',
				answer:
					'We cover all major academic and entrance exam subjects, including: Entrance exams: 4+, 7+, 11+, 13+, 16+. GL, CEM, ISEB, UKiset. Core subjects: English, Maths, Sciences. Languages: EFL, French, Spanish, German, Italian, Arabic, Mandarin, Russian. Humanities: History, Geography, Law, Religion, Philosophy. Sciences: Biology, Chemistry, Physics, Engineering, Computer Science. Social Sciences: Politics, Business, Economics, Psychology, Sociology. Arts: Drama, Music, Art, Public Speaking, Creative Writing, Film Studies. Higher education prep: UCAS, Oxbridge, Common App. Specialist tests: TMUA, LNAT, SAT/ACT, BMAT/UCAT. English language exams: IELTS, TOEFL, Cambridge English. SEN and mentoring support.',
			},
			{
				question:
					'Do you cover international exam boards and US college applications?',
				answer:
					'Yes, we support students preparing for: IB, iGCSE, A Levels, French Baccalaureate, SATs, ACT, AP exams, UCAS, Common App, and Oxbridge applications.',
			},
			{
				question: 'Do you offer university admissions support?',
				answer:
					'Yes. Our support includes: Personal statement coaching, interview preparation, subject-specific entrance tests (e.g. UCAT, BMAT, LNAT, TMUA, ESAT), and Oxbridge and Ivy League strategy masterclasses.',
			},
		],
	},
	{
		id: 'progress-results',
		title: 'Progress & Results',
		questions: [
			{
				question: 'What are your success rates?',
				answer:
					'94% of GCSE students improve by at least two grades. Many progress from grade 5 to 8/9 within months. Consistent placements at Oxbridge and other top-tier universities.',
			},
			{
				question: 'Do you have recommendations or testimonials?',
				answer:
					"Yes. We're proud to be featured in Tatler's Address Book and listed as School Guide UK's top pick. Some verified feedback includes: 'We can't believe it—offers from St Paul's, Westminster, Highgate and UCS.' 'Jake jumped from a U to almost a B in just 3 weeks. More importantly, he believes in himself again.' 'The world of tutoring is a minefield, but your tutors are next level.' 'Our family is delighted—offers from Le Rosey confirmed for all three children.'",
			},
			{
				question: 'How do we know if tutoring is making a difference?',
				answer:
					'Each tutor provides structured feedback, session summaries, and progress updates. Parents frequently report noticeable improvements in academic performance and motivation.',
			},
		],
	},
	{
		id: 'scheduling-process',
		title: 'Scheduling & Process',
		questions: [
			{
				question: 'How do I get started?',
				answer:
					'We keep the onboarding process simple: 1. Complete our enquiry form 2. Schedule a consultation with Elizabeth, our Founder 3. Receive a tailored tutor recommendation 4. Book an initial lesson 5. Begin regular sessions 6. Receive ongoing support and advice as your tutoring needs evolve',
			},
			{
				question: 'Is there a way to track our tutoring schedule?',
				answer:
					"Yes. You'll receive access to your personal client dashboard where you can: View the lesson calendar, track progress reports, access invoices, and receive automated email reminders 36 hours before each session.",
			},
			{
				question: 'How do we manage the schedule?',
				answer:
					"Our admin team is always available to assist via email, phone and WhatsApp. Lessons can be rescheduled with at least 24 hours' notice. You'll receive automatic reminders to help stay on track.",
			},
			{
				question: 'Can I try a tutor before committing?',
				answer:
					"Yes. While we don't offer free trials, we encourage booking an obligation-free initial lesson to assess compatibility.",
			},
		],
	},
	{
		id: 'pricing-payment',
		title: 'Pricing & Payment',
		questions: [
			{
				question: 'How much does tutoring cost?',
				answer:
					"Bespoke 1-2-1 tutoring starts from just £45 per hour. Unlike many other providers, we don't charge registration, placement or administrative fees.",
			},
			{
				question: 'How do we pay and when?',
				answer:
					"You'll receive itemised invoices to pay via secure bank transfer within three working days. We require a £300 credit balance to be maintained throughout tuition. This can be applied towards your final invoice when tuition ends.",
			},
			{
				question: 'Can I track payments and attendance?',
				answer:
					'Yes. Your dashboard provides a transparent overview of lesson history, payments, and any credit balance.',
			},
			{
				question: 'Do you offer discounts?',
				answer:
					'Yes, discounts are available for: Block bookings (15+ lessons/month) and sibling enrolment.',
			},
			{
				question: 'Do you offer a referral scheme?',
				answer:
					"Absolutely. For each family you refer who books a minimum of three lessons, you'll receive one free lesson credit as a thank-you.",
			},
		],
	},
	{
		id: 'other-questions',
		title: 'Other Questions',
		questions: [
			{
				question: 'How are tutors selected and verified?',
				answer:
					"All our tutors come from the highest academic backgrounds, specialising in a full array of subjects at all levels. We work with a small group of highly trusted tutors from Elizabeth's personal network and only actively seek out new tutors when our clients have specific needs. When we do look to introduce new educators to the pool they are carefully screened, DBS checked and personally interviewed by Elizabeth. Our recruitment process is in-depth; less than 10% of tutors who apply to our exclusive network are accepted.",
			},
			{
				question: 'Do you have a safeguarding policy?',
				answer:
					'Yes. Safeguarding is a top priority. All tutors are DBS-checked and our full safeguarding policy is available upon request.',
			},
			{
				question: 'What is your cancellation policy?',
				answer:
					"Lessons cancelled with more than 24 hours' notice incur no charge. Cancellations within 24 hours are charged in full. We require a minimum of three weeks notice in writing to terminate regular tutoring arrangements.",
			},
			{
				question: 'I have more questions. What should I do?',
				answer:
					"We're happy to help. Please email us at info@myprivatetutoronline.com or submit an enquiry form to schedule a consultation.",
			},
		],
	},
] as const;

// Unified contact data
const UNIFIED_CONTACT = {
	primary: {
		primaryEmail: 'info@myprivatetutoronline.com',
		phone: '+44 7513 550278',
		address: {
			line1: '123 Education House',
			line2: 'Kensington',
			city: 'London',
			postcode: 'SW7 2AZ',
			country: 'United Kingdom',
		},
		socialMedia: {
			twitter: '@MyPrivateTutorUK',
			linkedin: 'my-private-tutor-online',
			facebook: 'MyPrivateTutorOnline',
		},
	},
} as const;

const FAQEdgeSearch = dynamic(
	() =>
		import('@/components/faq/faq-edge-search').then((mod) => ({
			default: mod.FAQEdgeSearch,
		})),
	{
		loading: () => (
			<div className='flex items-center justify-center py-8'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600'></div>
			</div>
		),
		ssr: false,
	},
);

export default function FAQPage() {
	const [searchMode, setSearchMode] = useState(false);
	const [browseQuery, setBrowseQuery] = useState('');

	const categories = FAQ_CATEGORIES;
	const contactData = UNIFIED_CONTACT;
	const filteredCategories = useMemo(() => {
		if (searchMode) return [];
		if (!browseQuery.trim()) return categories;
		return categories
			.map((category) => ({
				...category,
				questions: category.questions.filter(
					(q) =>
						q.question.toLowerCase().includes(browseQuery.toLowerCase()) ||
						q.answer.toLowerCase().includes(browseQuery.toLowerCase()),
				),
			}))
			.filter((category) => category.questions.length > 0);
	}, [categories, browseQuery, searchMode]);
	return (
		<PageLayout
			background='white'
			showHeader={true}
			showFooter={true}>
			<div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
				{}
				{}
				{}
				<section className='bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16 lg:py-24'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<h1 className='text-3xl lg:text-5xl font-serif font-bold mb-6'>
							Frequently Asked Questions
						</h1>
						<p className='text-lg lg:text-xl text-primary-100 mb-8 max-w-2xl mx-auto'>
							Find quick answers to common questions about our premium tutoring
							services
						</p>
					</div>
				</section>

				{}
				{}
				{}
				<section
					className='py-8 bg-white border-b border-slate-200'
					role='search'
					aria-label='FAQ Search'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
						{}
						<div className='flex justify-center gap-4 mb-6'>
							<button
								onClick={() => setSearchMode(true)}
								className={cn(
									'px-4 py-2 rounded-lg font-medium transition-colors',
									searchMode ?
										'bg-primary-600 text-white'
									:	'bg-slate-100 text-slate-700 hover:bg-slate-200',
								)}
								aria-pressed={searchMode}>
								<Search className='inline-block w-4 h-4 mr-2' />
								Search Mode
							</button>
							<button
								onClick={() => setSearchMode(false)}
								className={cn(
									'px-4 py-2 rounded-lg font-medium transition-colors',
									!searchMode ?
										'bg-primary-600 text-white'
									:	'bg-slate-100 text-slate-700 hover:bg-slate-200',
								)}
								aria-pressed={!searchMode}>
								Browse Categories
							</button>
						</div>

						{}
						{searchMode ?
							<FAQEdgeSearch />
						:	<>
								<div className='relative max-w-2xl mx-auto'>
									<label
										htmlFor='faq-browse'
										className='sr-only'>
										Filter FAQ questions
									</label>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5' />
									<input
										id='faq-browse'
										type='text'
										placeholder='Filter questions...'
										value={browseQuery}
										onChange={(e) => setBrowseQuery(e.target.value)}
										className={cn(
											'w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg',
											'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
											'text-slate-900 placeholder-slate-500',
											'transition-all duration-200',
										)}
										aria-describedby='browse-help'
									/>
									<p
										id='browse-help'
										className='sr-only'>
										Type to filter FAQ categories and questions
									</p>
								</div>
								{browseQuery && (
									<div className='text-center mt-4'>
										<p className='text-sm text-slate-600'>
											{filteredCategories.reduce(
												(sum, cat) => sum + cat.questions.length,
												0,
											)}{' '}
											results found for "{browseQuery}"
										</p>
										<button
											onClick={() => setBrowseQuery('')}
											className='ml-2 text-sm text-primary-600 hover:text-primary-700 underline'>
											Clear filter
										</button>
									</div>
								)}
							</>
						}
					</div>
				</section>

				{}
				{}
				{}
				{!searchMode && (
					<main
						className='py-12'
						role='main'
						aria-label='FAQ Content'>
						<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
							{filteredCategories.length === 0 ?
								<div className='text-center py-12'>
									<div className='text-6xl mb-4'>🤔</div>
									<h2 className='text-2xl font-serif font-semibold text-slate-900 mb-4'>
										No results found
									</h2>
									<p className='text-slate-600 mb-6'>
										We couldn't find any questions matching "{browseQuery}". Try different
										keywords or use search mode for better results.
									</p>
									<button
										onClick={() => setBrowseQuery('')}
										className='bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200'>
										Show all questions
									</button>
								</div>
							:	<div className='space-y-8'>
									{filteredCategories.map((category) => (
										<section
											key={category.id}
											className='space-y-4'>
											{}
											{}
											<div className='flex items-center space-x-3 mb-6'>
												{(() => {
													const IconComponent = getFaqIconComponent(category.title);
													return (
														<IconComponent
															width={32}
															height={32}
															aria-label={`${category.title} icon`}
															className='flex-shrink-0'
														/>
													);
												})()}
												<h2 className='text-2xl font-serif font-bold text-slate-900'>
													{category.title}
												</h2>
												<span className='bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full'>
													{category.questions.length} question
													{category.questions.length !== 1 ? 's' : ''}
												</span>
											</div>

											{}
											{}
											{}
											<Accordion
												type='multiple'
												className='space-y-2'>
												{category.questions.map((item, index) => (
													<AccordionItem
														key={`${category.id}-${index}`}
														value={`${category.id}-${index}`}
														className='bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
														<AccordionTrigger className='px-6 py-4 text-left font-medium text-slate-900 hover:text-primary-700'>
															{item.question}
														</AccordionTrigger>
														<AccordionContent className='px-6 pb-4'>
															<div className='prose prose-slate max-w-none'>
																<p className='text-slate-700 leading-relaxed'>{item.answer}</p>
															</div>
														</AccordionContent>
													</AccordionItem>
												))}
											</Accordion>
										</section>
									))}
								</div>
							}
						</div>
					</main>
				)}

				{}
				{}
				{}
				<section
					className='bg-slate-50 py-16'
					id='contact'
					role='region'
					aria-label='Contact information'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<h2 className='text-3xl font-serif font-bold text-slate-900 mb-4'>
							Still have questions?
						</h2>
						<p className='text-lg text-slate-600 mb-8 max-w-2xl mx-auto'>
							Can't find the answer you're looking for? Our team is here to help.
							Contact us directly for personalised assistance.
						</p>

						<div className='grid md:grid-cols-2 gap-6 max-w-2xl mx-auto'>
							{}
							<a
								href={`mailto:${contactData.primary.primaryEmail}`}
								className={cn(
									'bg-white border border-slate-200 rounded-lg p-6',
									'hover:border-primary-300 hover:shadow-lg transition-all duration-200',
									'group focus:ring-2 focus:ring-primary-500 focus:outline-none',
								)}>
								<div className='text-primary-600 mb-3 group-hover:text-primary-700'>
									<svg
										className='w-8 h-8 mx-auto'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<h3 className='font-semibold text-slate-900 mb-2'>Email Us</h3>
								<p className='text-slate-600 text-sm'>
									{contactData.primary.primaryEmail}
								</p>
							</a>

							{}
							<a
								href={`tel:${contactData.primary.phone}`}
								className={cn(
									'bg-white border border-slate-200 rounded-lg p-6',
									'hover:border-primary-300 hover:shadow-lg transition-all duration-200',
									'group focus:ring-2 focus:ring-primary-500 focus:outline-none',
								)}>
								<div className='text-primary-600 mb-3 group-hover:text-primary-700'>
									<svg
										className='w-8 h-8 mx-auto'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										/>
									</svg>
								</div>
								<h3 className='font-semibold text-slate-900 mb-2'>Call Us</h3>
								<p className='text-slate-600 text-sm'>{contactData.primary.phone}</p>
							</a>
						</div>
					</div>
				</section>
			</div>
		</PageLayout>
	);
}
