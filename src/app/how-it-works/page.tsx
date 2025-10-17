'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TutorsSection } from '@/components/tutors/tutors-section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { m } from 'framer-motion';
import {
	CheckCircle,
	ClipboardCheck,
	MessageSquare,
	Target,
	Users,
} from 'lucide-react';
import Image from 'next/image';

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
	readonly description: string;
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
		description: 'Qualified, experienced classroom teachers',
		bestFor: 'Curriculum mastery, consistency',
		pricePoint: 'From £65/hour',
		level: 'mid',
		colour: 'silver',
	},
	{
		tier: 'Tier 1',
		description:
			'Official examiners and senior educators with extensive track records',
		bestFor: 'Top grades, exam strategy',
		pricePoint: 'From £85/hour',
		level: 'premium',
		colour: 'gold',
		hasCrown: true,
	},
	{
		tier: 'Tier 3',
		description:
			'Tutors from top UK universities (including Oxbridge), teaching their specialist subject',
		bestFor: 'Mentoring, subject confidence',
		pricePoint: 'From £45/hour',
		level: 'standard',
		colour: 'bronze',
	},
] as const;

// Benefits content
const BENEFITS: readonly string[] = [
	'No registration or administrative fees',
	'Rigorous vetting including enhanced DBS checks',
	'Ongoing consultative support throughout your journey',
	'Remarkable results. Our tutees secure top marks year in, year out',
	"Automated lesson reminders 36 hours before tutorials and progress reports emailed the minute they're completed afterwards",
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
	subtitle: '',
	description:
		"Here's a curated cross-section of our team to give you a sense of <strong>the calibre and diversity of educators</strong> available across each of our tutoring tiers. While this is just a glimpse, <strong>our full team spans every age, subject and academic stage</strong>—from Year 1 phonics to postgraduate-level Astrophysics.\n\nIf you don't see exactly what you're looking for here, rest assured we have the right expert behind the scenes, ready to support your child's learning journey.\n\nTo begin, simply <strong>complete our short enquiry form</strong>, and a member of our team will be in touch to start the conversation.",
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
			id: 'amy-english',
			name: 'Amy',
			title: 'English Language & Literature Specialist',
			tier: 'tier-one',
			badge: '📚',
			education: {
				university: 'Professional Teaching Qualification',
				degree: 'LLB (Hons) Law',
				additionalQualifications: ['PGCE Secondary English'],
				grade: 'Honours',
				graduationYear: '2015',
			},
			specializations: [
				'English Language',
				'English Literature',
				'Law',
				'Academic Writing',
			],
			experience: {
				yearsTeaching: 10,
				description:
					'Head of English and Media Studies with proven record of rapid grade improvement',
				totalStudents: 400,
			},
			achievements: [
				{
					title: 'Official Examiner',
					description: 'Examiner for GCSE & A Level English',
					year: '2024',
				},
				{
					title: 'Head of English',
					description: 'Head of English and Media Studies',
					year: '2023',
				},
				{
					title: 'Rapid Improvement',
					description: 'Proven record of rapid grade improvement',
					year: '2024',
				},
			],
			image: {
				key: 'amy-english',
				alt: 'Amy - English Language & Literature Specialist',
				professionalHeadshot: true,
			},
			bio: 'Amy holds an LLB (Hons) Law degree and PGCE Secondary English qualification. As Head of English and Media Studies and official examiner for GCSE & A Level English, she has established a proven record of rapid grade improvement with her students.',
			testimonial: {
				quote:
					'Jake has jumped from a U to two marks off a B – incredible progress in just a month.',
				author: 'Parent',
				context: 'English grade improvement',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-18',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'LLB (Hons) Law',
					institution: 'Professional Teaching Authority',
					year: '2015',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'PGCE Secondary English',
					institution: 'Professional Teaching Authority',
					year: '2016',
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
					'Analytical and supportive, focusing on rapid improvement through targeted techniques',
				methodology: [
					'Analytical writing',
					'Literature analysis',
					'Examination technique',
				],
				strengthAreas: [
					'Grade improvement',
					'Literature analysis',
					'Academic writing',
				],
			},
			subjectExpertise: [
				{
					subject: 'English Literature',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 10,
				},
				{
					subject: 'English Language',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 10,
				},
			],
			featured: true,
			order: 2,
		},
		{
			id: 'emily-entrance-history',
			name: 'Emily',
			title: 'Entrance Exam Expert, History & Politics',
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
				'History',
				'Politics',
				'Elite School Preparation',
			],
			experience: {
				yearsTeaching: 7,
				description:
					'Former teacher at Latymer, Merchant Taylors, North London Collegiate with official 11+ examiner experience',
				totalStudents: 200,
				eliteSchools: ['Latymer', 'Merchant Taylors', 'North London Collegiate'],
			},
			achievements: [
				{
					title: 'Official 11+ Examiner',
					description: 'Official 11+ examiner and assisted identifying top scholars',
					year: '2024',
				},
				{
					title: 'Elite School Placements',
					description:
						"Students win places at Eton, Harrow, City of London, Henrietta Barnett, QE Boys and Dame Alice Owen's",
					year: '2025',
				},
				{
					title: 'GCSE/A Level/IB Examiner',
					description: 'Examiner for GCSE/A Level/IB History & Politics',
					year: '2023',
				},
			],
			image: {
				key: 'emily-entrance-history',
				alt: 'Emily - Entrance Exam Expert, History & Politics',
				professionalHeadshot: true,
			},
			bio: 'Emily holds a BA History from Cambridge and PGCE from Oxford. As a former teacher at Latymer, Merchant Taylors, and North London Collegiate, she serves as an official 11+ examiner and GCSE/A Level/IB examiner for History & Politics. Her students consistently win places at top schools including Eton, Harrow, and other prestigious institutions.',
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
		{
			id: 'michael-primary',
			name: 'Michael',
			title: 'Primary & 11+/13+ Specialist',
			tier: 'tier-two',
			badge: '✏️',
			education: {
				university: 'Professional Teaching Qualification',
				degree: 'PGCE Primary',
				grade: 'Outstanding',
				graduationYear: '2002',
			},
			specializations: [
				'Primary Education',
				'11+ Preparation',
				'13+ Preparation',
				'English',
			],
			experience: {
				yearsTeaching: 22,
				description:
					'English Subject Lead with outstanding success guiding students into competitive grammars and independents',
				totalStudents: 800,
				grammarSuccess: ['Tiffin', 'Sutton', 'Wallington'],
			},
			achievements: [
				{
					title: 'English Subject Lead',
					description: 'English Subject Lead with 22+ years in the classroom',
					year: '2024',
				},
				{
					title: 'Grammar School Success',
					description:
						'Outstanding success guiding students into competitive grammars including Tiffin, Sutton, Wallington',
					year: '2025',
				},
			],
			image: {
				key: 'michael-primary',
				alt: 'Michael - Primary & 11+/13+ Specialist',
				professionalHeadshot: true,
			},
			bio: 'Michael holds a PGCE Primary qualification with 22+ years of classroom experience. As English Subject Lead, he has achieved outstanding success guiding students into competitive grammar schools and independent schools, including Tiffin, Sutton, and Wallington.',
			testimonial: {
				quote:
					'So patient, kind and encouraging. Charlie is so proud of his 11+ offers (as are we!).',
				author: 'Parent',
				context: '11+ preparation success',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-20',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'PGCE Primary',
					institution: 'Professional Teaching Authority',
					year: '2002',
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
					'Patient and encouraging, building confidence through structured primary education',
				methodology: ['Primary pedagogy', '11+ preparation', 'Confidence building'],
				strengthAreas: [
					'Grammar school preparation',
					'Primary English',
					'Student encouragement',
				],
			},
			subjectExpertise: [
				{
					subject: 'Primary Education',
					level: 'Primary',
					examBoards: ['National Curriculum'],
					yearsExperience: 22,
				},
				{
					subject: '11+ Preparation',
					level: '11+',
					examBoards: ['CEM', 'GL Assessment'],
					yearsExperience: 15,
				},
				{
					subject: '13+ Preparation',
					level: '13+',
					examBoards: ['Common Entrance'],
					yearsExperience: 12,
				},
			],
			featured: false,
			order: 4,
		},
		{
			id: 'juliet-maths-sen',
			name: 'Juliet',
			title: 'Maths, SEN & International Teaching Expert',
			tier: 'tier-two',
			badge: '🧮',
			education: {
				university: 'Professional Teaching Qualification',
				degree: 'BSc Maths',
				additionalQualifications: ['MA Education', 'PGCE Secondary'],
				grade: 'Honours',
				graduationYear: '1995',
			},
			specializations: [
				'Mathematics',
				'Special Educational Needs (SEN)',
				'Business Studies',
				'Economics',
			],
			experience: {
				yearsTeaching: 30,
				description:
					'30+ years international teaching, including Headteacher roles, particularly excels with number-averse and SEN students',
				totalStudents: 1200,
				internationalExperience: true,
				headteacherExperience: true,
			},
			achievements: [
				{
					title: 'International Headteacher',
					description:
						'30+ years international teaching, including Headteacher roles',
					year: '2024',
				},
				{
					title: 'SEN Specialist',
					description: 'Particularly excels with number-averse and SEN students',
					year: '2025',
				},
				{
					title: 'Multi-Subject Expert',
					description: 'Teaches Maths, Business Studies, Economics',
					year: '2023',
				},
			],
			image: {
				key: 'juliet-maths-sen',
				alt: 'Juliet - Maths, SEN & International Teaching Expert',
				professionalHeadshot: true,
			},
			bio: 'Juliet holds a BSc Maths, MA Education, and PGCE Secondary qualification. With 30+ years of international teaching experience including Headteacher roles, she particularly excels with number-averse and SEN students, teaching Maths, Business Studies, and Economics.',
			testimonial: {
				quote:
					"If Kate keeps progressing like this, they'll move her up a set after Christmas – hooray!",
				author: 'Parent',
				context: 'Mathematics improvement with SEN support',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-25',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BSc Mathematics',
					institution: 'Professional Teaching Authority',
					year: '1995',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'MA Education',
					institution: 'Professional Teaching Authority',
					year: '1997',
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
					'Patient and adaptive, specialising in building mathematical confidence for all learning styles',
				methodology: [
					'SEN support strategies',
					'Number confidence building',
					'International best practices',
				],
				strengthAreas: [
					'Special needs mathematics',
					'International curricula',
					'Leadership experience',
				],
			},
			subjectExpertise: [
				{
					subject: 'Mathematics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 30,
				},
				{
					subject: 'Business Studies',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 20,
				},
				{
					subject: 'Economics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 18,
				},
			],
			featured: false,
			order: 5,
		},
		{
			id: 'andreas-languages',
			name: 'Andreas',
			title: 'Modern Languages Specialist',
			tier: 'tier-two',
			badge: '🌍',
			education: {
				university: 'Professional Teaching Qualification',
				degree: 'BA Spanish & German',
				additionalQualifications: ['QTS in Spanish and German'],
				grade: 'Honours',
				graduationYear: '2010',
			},
			specializations: [
				'Spanish',
				'German',
				'Modern Languages',
				'A Level Language Courses',
			],
			experience: {
				yearsTeaching: 15,
				description:
					'Fluent in six languages, delivers entire A Level language courses where schools do not offer them',
				totalStudents: 300,
				languagesFluent: 6,
			},
			achievements: [
				{
					title: 'Multilingual Expert',
					description: 'Fluent in six languages',
					year: '2025',
				},
				{
					title: 'Complete Course Delivery',
					description:
						'Delivers entire A Level language courses where schools do not offer them',
					year: '2024',
				},
				{
					title: 'QTS Qualified',
					description: 'QTS in Spanish and German',
					year: '2010',
				},
			],
			image: {
				key: 'andreas-languages',
				alt: 'Andreas - Modern Languages Specialist',
				professionalHeadshot: true,
			},
			bio: 'Andreas holds a BA Spanish & German degree with QTS in Spanish and German. Fluent in six languages, he delivers entire A Level language courses where schools do not offer them, providing comprehensive language education to students.',
			testimonial: {
				quote:
					"I got a 9 in Portuguese and an 8 in Spanish – amazing after being told I'd struggle to get a 7!",
				author: 'Student',
				context: 'A Level language success',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-22',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA Spanish & German',
					institution: 'Professional Teaching Authority',
					year: '2010',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'QTS Spanish and German',
					institution: 'Professional Teaching Authority',
					year: '2010',
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
					'Immersive and comprehensive, delivering complete language education programmes',
				methodology: [
					'Complete course delivery',
					'Multilingual approach',
					'Cultural integration',
				],
				strengthAreas: [
					'A Level language courses',
					'Multiple language fluency',
					'Independent course design',
				],
			},
			subjectExpertise: [
				{
					subject: 'Spanish',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 15,
				},
				{
					subject: 'German',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 15,
				},
				{
					subject: 'Portuguese',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 10,
				},
			],
			featured: false,
			order: 6,
		},
		{
			id: 'ophelia-classics',
			name: 'Ophelia',
			title: '11+, Entrance Exams & Classics Expert',
			tier: 'tier-three',
			badge: '🏛️',
			education: {
				university: 'University of Cambridge',
				degree: 'BA Classics, Cambridge',
				grade: 'First Class',
				graduationYear: '2019',
			},
			specializations: [
				'Classics',
				'11+ Preparation',
				'Entrance Exams',
				'Oxbridge Preparation',
			],
			experience: {
				yearsTeaching: 6,
				description:
					'11+ and entrance exam success across Harrow, Westminster and more, with Oxbridge personal statement & interview coaching',
				totalStudents: 150,
				eliteSchoolSuccess: ['Harrow', 'Westminster'],
			},
			achievements: [
				{
					title: 'Elite School Success',
					description:
						'11+ and entrance exam success across Harrow, Westminster and more',
					year: '2024',
				},
				{
					title: 'Rapid Improvement',
					description: 'Improved 11+ student scores from 20% to 80% in 2 months',
					year: '2024',
				},
				{
					title: 'Oxbridge Coaching',
					description: 'Oxbridge personal statement & interview coaching',
					year: '2023',
				},
			],
			image: {
				key: 'ophelia-classics',
				alt: 'Ophelia - 11+, Entrance Exams & Classics Expert',
				professionalHeadshot: true,
			},
			bio: 'Ophelia holds a BA Classics from Cambridge University. She specialises in 11+ and entrance exam preparation with success across elite schools including Harrow and Westminster. She provides Oxbridge personal statement and interview coaching, with proven ability to improve student scores dramatically.',
			testimonial: {
				quote:
					'Without Ophelia there is no way I would have won my place at Cambridge.',
				author: 'Student',
				context: 'Oxbridge admission success',
			},
			availability: {
				status: 'limited',
				nextAvailable: '2025-02-05',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA Classics',
					institution: 'University of Cambridge',
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
					'Classical education with strategic entrance exam preparation and university coaching',
				methodology: [
					'Classical methodology',
					'Entrance exam strategy',
					'University interview preparation',
				],
				strengthAreas: [
					'Classics education',
					'Elite school preparation',
					'Oxbridge coaching',
				],
			},
			subjectExpertise: [
				{
					subject: 'Classics',
					level: 'A-Level',
					examBoards: ['AQA', 'OCR'],
					yearsExperience: 6,
				},
				{
					subject: '11+ Preparation',
					level: '11+',
					examBoards: ['CEM', 'GL Assessment'],
					yearsExperience: 5,
				},
				{
					subject: 'Latin',
					level: 'A-Level',
					examBoards: ['AQA', 'OCR'],
					yearsExperience: 6,
				},
			],
			featured: false,
			order: 7,
		},
		{
			id: 'annoushka-english',
			name: 'Annoushka',
			title: 'English & Entrance Exams Specialist',
			tier: 'tier-three',
			badge: '📘',
			education: {
				university: 'University of Oxford',
				degree: 'BA English, Oxford',
				additionalQualifications: ['CELTA Qualified'],
				grade: 'First Class',
				graduationYear: '2017',
			},
			specializations: [
				'English',
				'Entrance Exams',
				'Independent School Preparation',
				'CELTA Teaching',
			],
			experience: {
				yearsTeaching: 8,
				description:
					'Teaches online and in North London area with classroom experience in UK and international private schools',
				totalStudents: 250,
				teachingAreas: ['Online', 'North London'],
				internationalExperience: true,
			},
			achievements: [
				{
					title: 'Elite School Placements',
					description:
						'Students regularly win places at Westminster, Cheltenham Ladies, Benenden',
					year: '2025',
				},
				{
					title: 'International Experience',
					description:
						'Classroom experience in UK and international private schools',
					year: '2024',
				},
				{
					title: 'CELTA Qualified',
					description: 'CELTA Qualified for English language teaching',
					year: '2018',
				},
			],
			image: {
				key: 'annoushka-english',
				alt: 'Annoushka - English & Entrance Exams Specialist',
				professionalHeadshot: true,
			},
			bio: 'Annoushka holds a BA English from Oxford and is CELTA qualified. Teaching both online and in the North London area, she has classroom experience in UK and international private schools. Her students regularly win places at prestigious institutions including Westminster, Cheltenham Ladies, and Benenden.',
			testimonial: {
				quote:
					"Seb comes out of lessons beaming – I caught him teaching his friends Annoushka's times tables tricks!",
				author: 'Parent',
				context: 'Engaging teaching methods',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-28',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA English',
					institution: 'University of Oxford',
					year: '2017',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'CELTA',
					institution: 'Cambridge Assessment English',
					year: '2018',
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
					'Engaging and interactive, creating enthusiasm for learning with effective techniques',
				methodology: [
					'Interactive learning',
					'Memorable techniques',
					'Student engagement',
				],
				strengthAreas: [
					'Independent school preparation',
					'English literature',
					'Student motivation',
				],
			},
			subjectExpertise: [
				{
					subject: 'English Literature',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 8,
				},
				{
					subject: 'English Language',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 8,
				},
			],
			featured: false,
			order: 8,
		},
		{
			id: 'alex-admissions',
			name: 'Alex',
			title: 'University Admissions & English Expert',
			tier: 'tier-three',
			badge: '⚖️',
			education: {
				university: 'Cambridge & Harvard',
				degree: 'BA Law, Cambridge',
				additionalQualifications: ['MA, Harvard (Bioethics & AI Liability)'],
				grade: 'First Class',
				graduationYear: '2020',
			},
			specializations: [
				'University Admissions',
				'Law',
				'English',
				'International Admissions',
			],
			experience: {
				yearsTeaching: 5,
				description:
					'British & US admissions expert with Oxbridge & Ivy League success, 10,000+ tutoring hours',
				totalStudents: 200,
				tutoringHours: 10000,
				admissionsSuccess: ['Oxbridge', 'Ivy League'],
			},
			achievements: [
				{
					title: 'Top 1% SAT Scorer',
					description: 'Top 1% SAT scorer with extensive testing expertise',
					year: '2023',
				},
				{
					title: 'Dual Admissions Expert',
					description:
						'British & US admissions expert – Oxbridge & Ivy League success',
					year: '2024',
				},
				{
					title: 'Multi-Qualification Specialist',
					description: 'Specialist in SAT, LNAT, IB, A-level, IGCSE, AP, HSC',
					year: '2025',
				},
			],
			image: {
				key: 'alex-admissions',
				alt: 'Alex - University Admissions & English Expert',
				professionalHeadshot: true,
			},
			bio: 'Alex holds a BA Law from Cambridge and MA from Harvard in Bioethics & AI Liability. As a British & US admissions expert with Oxbridge & Ivy League success, Alex is a top 1% SAT scorer with 10,000+ tutoring hours and specialises in multiple qualification systems including SAT, LNAT, IB, A-level, IGCSE, AP, and HSC.',
			testimonial: {
				quote:
					'I got 28 in my LNAT and a UCL offer – please tell him thank you so much!',
				author: 'Student',
				context: 'LNAT and university admission success',
			},
			availability: {
				status: 'limited',
				nextAvailable: '2025-02-10',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA Law',
					institution: 'University of Cambridge',
					year: '2020',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'MA (Bioethics & AI Liability)',
					institution: 'Harvard University',
					year: '2022',
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
					'Strategic and comprehensive, combining academic excellence with admissions expertise',
				methodology: [
					'University preparation',
					'Standardised test strategy',
					'International admissions',
				],
				strengthAreas: [
					'University admissions',
					'Standardised testing',
					'International qualifications',
				],
			},
			subjectExpertise: [
				{
					subject: 'English Literature',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 5,
				},
				{
					subject: 'Law',
					level: 'University',
					examBoards: ['LNAT'],
					yearsExperience: 5,
				},
				{
					subject: 'SAT Preparation',
					level: 'International',
					examBoards: ['College Board'],
					yearsExperience: 4,
				},
			],
			featured: false,
			order: 9,
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
	return (
		<>
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			<section id='how-it-works-hero'>
				<SimpleHero
					backgroundImage='/images/hero/hero-how-it-works.jpeg'
					h1='Your Journey To Academic Success'
					h2='Outstanding Tuition. Tailored Pairing. Ongoing Guidance.'
					decorativeStyle='lines'
					textVerticalOffset='much-lower'
				/>
			</section>

			{}
			{}
			{}
			{}
			{}
			{}
			<PageLayout
				background='white'
				containerSize='full'
				verticalSpacing='none'
				footerProps={{
					showContactForm: true,
				}}>
				{}
				{}

				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<section
					id='how-it-works-process-steps'
					className='relative bg-white pt-12 lg:pt-16 pb-20 lg:pb-32'>
					{}
					{}

					{}
					{}
					{}
					<div className='relative container mx-auto px-4 sm:px-6 lg:px-8'>
						{}
						{}
						{}
						<div className='text-center mb-4'>
							<h2>Your Journey To Academic Success</h2>
						</div>

						<section
							id='journey-quote'
							className='py-8 lg:py-12'>
							{}
							{}
							{}
							<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
								<blockquote>
									&quot;At My Private Tutor Online, we offer more than just tutoring—we
									provide thoughtful, expert advice at every stage of your child&apos;s
									academic journey. Our service is consultative, personal, and{' '}
									<strong>bespoke to your family&apos;s individual needs</strong>.&quot;
								</blockquote>
								<cite className='block mt-4 not-italic'>- My Private Tutor Online</cite>
							</div>
						</section>

						<div className='relative w-full'>
							<div className='space-y-0'>
								{processSteps && processSteps.length > 0 ?
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
												{}
												<div className='grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr gap-0 items-stretch'>
													{}
													<div
														className={`relative w-full ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
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

													{}
													{}
													{}
													{}
													<div
														className={`bg-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-20 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
														<div
															className={`${isEven ? 'border-l-4 pl-8' : 'border-r-4 pr-8'} border-primary-700'`}>
															{}
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

															{}
															{}
															{}
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

															{}
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
								:	<div className='text-center py-12'>
										<p>Process steps are currently being loaded...</p>
									</div>
								}
							</div>
						</div>
					</div>
				</section>

				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<section id='how-it-works-tutors'>
					<TutorsSection
						data={tutorProfilesSection}
						showFeaturedOnly={false}
						showViewAllButton={true}
					/>
				</section>

				{}
				{}
				{}

				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<section
					id='how-it-works-tutoring-tiers'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					{}
					{}

					{}
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					{}
					{}
					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
						{}
						{}
						{}
						{}
						<div className='text-center mb-16 lg:mb-20'>
							{}
							{}
							{}
							<div className='flex items-center justify-center gap-3 mb-6'>
								<span className='text-accent-700 tracking-widest uppercase'>
									Tiered Excellence
								</span>
							</div>

							<h2 className='mb-8'>Choose Your Unique Tutoring Experience</h2>

							{}
							{}
							<div className='flex items-center justify-center gap-4 mb-8'>
								<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
							</div>

							<p className='max-w-4xl mx-auto'>
								From essential academic support to premium elite guidance—discover the
								service level that perfectly matches your family&apos;s aspirations and
								your child&apos;s potential
							</p>
						</div>

						{}
						{}
						<div className='relative'>
							{}
							{}
							{}
							{}
							<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'>
								{tutorTiers && tutorTiers.length > 0 ?
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
													{}
													{}
													{}
													<Card className='bg-white border-2 border-neutral-300 hover:border-accent-500/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-none'>
														<CardHeader className='text-center pb-6 pt-8 px-6 lg:px-8'>
															{}
															{}
															{}
															<h3 className='mb-4'>{tier.tier}</h3>

															{}
															{}
															{}
															<Separator className='my-4 bg-neutral-300' />

															{}
															{}
															{}
															<div className='mb-2'>{tier.pricePoint}</div>
														</CardHeader>

														<CardContent className='text-center px-6 lg:px-8 pb-6 lg:pb-8'>
															{}
															{}
															{}
															<p className='mb-4'>{tier.description}</p>

															{}
															{}
															{}
															<Separator className='my-4 bg-neutral-300' />

															<p className='mb-3'>Best For:</p>
															<p>{tier.bestFor}</p>
														</CardContent>
													</Card>
												</m.div>
											);
										})
								:	<div className='text-center py-12'>
										<p>Tutoring tiers are currently being loaded...</p>
									</div>
								}
							</div>
						</div>

						{}
						{}
						{}
						{}
						{}
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

				{}
				{}
				{}
				{}
				{}
				<section
					id='how-it-works-benefits'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					{}
					{}

					{}
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					{}
					{}
					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
						{}
						{}
						{}
						{}
						<div className='text-center mb-16 lg:mb-20'>
							{}
							{}

							<h2 className='mb-8'>Why Families Choose Our Approach</h2>

							{}
							{}
							<div className='flex items-center justify-center gap-4 mb-8'>
								<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
							</div>

							<p className='max-w-4xl mx-auto'>
								Discover what sets My Private Tutor Online apart as the trusted choice
								of families across the world.
							</p>
						</div>

						{}
						{}
						{}
						{}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20 items-stretch'>
							{}
							{}
							{}
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
								{}
								{}
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

							{}
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
												{}
												{}
												{}
												<div className='flex-shrink-0 w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center shadow-md transition-shadow duration-300 mt-1'>
													<CheckCircle className='w-5 h-5 text-white' />
												</div>

												{}
												{}
												{}
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

						{}
						{}
					</div>
				</section>
			</PageLayout>
		</>
	);
}
