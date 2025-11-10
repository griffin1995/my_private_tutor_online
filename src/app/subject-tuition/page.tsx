'use client';
import { PrimarySchoolContent } from '@/components/education/primary-school-content';
import { SecondarySchoolContent } from '@/components/education/secondary-school-content';
import { EntranceExamsContent } from '@/components/education/entrance-exams-content';
import { UniversityAdmissionsContent } from '@/components/education/university-admissions-content';
import { OnlineHomeschoolingContent } from '@/components/education/online-homeschooling-content';
import { SenSupportContent } from '@/components/education/sen-support-content';
import { LondonInPersonContent } from '@/components/education/london-in-person-content';
import { PageFooter } from '@/components/layout/page-footer';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { cn } from '@/lib/utils';
import type { EducationLevelTabContent as EducationLevelTabContentType } from '@/types/education-tabs';
import type { TestimonialSubjectTuition } from '@/components/education/testimonial-card-subject-tuition';
import type { Stat } from '@/components/education/stat-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import {
	School,
	GraduationCap,
	Trophy,
	BookOpen,
	Laptop,
	Heart,
	MapPin,
	type LucideIcon
} from 'lucide-react';

// ============================================================================
// HARDCODED DATA - ALL EDUCATION TABS CONTENT
// ============================================================================

// Education level content - Currently unused but retained for future feature implementation
// Testimonials and statistics are available but not currently displayed
// These data structures support comprehensive education-level specific content

// Primary School Content
const PRIMARY_SCHOOL_CONTENT: EducationLevelTabContentType = {
	id: 'primary-school',
	title: 'Primary School',
	mainDescription:
		"The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right. We understand that early education experiences are formative, so we prioritise curiosity, resilience, and a love of learning.",
	subsections: [
		{
			id: 'primary-confidence-building',
			heading: 'Confidence-building lessons designed for early learners',
			mainTextBody:
				'Our primary tutoring focuses on nurturing natural curiosity whilst building essential academic foundations. We understand that young learners need encouragement and support to develop confidence in their abilities, creating positive associations with learning that will serve them throughout their educational journey.',
		},
		{
			id: 'primary-entrance-specialists',
			heading:
				'7+, 8+ and 11+ specialists with a track record of top school offers',
			mainTextBody:
				'Our experienced tutors specialise in preparing young students for competitive entrance examinations. With proven success rates at leading preparatory and grammar schools, we provide targeted preparation that builds both academic competence and examination confidence.',
		},
		{
			id: 'primary-individual-learning',
			heading: 'Individual learning plans shaped by expert assessment',
			mainTextBody:
				"Every primary student receives a comprehensive initial assessment to identify their unique learning style, strengths, and areas for development. Our expert tutors then create personalised learning plans that adapt to each child's pace and preferred learning methods.",
		},
	],
	callOuts: [
		{
			id: 'primary-callout-1',
			title: 'Age-Appropriate Methods',
			description:
				'Teaching techniques specifically designed for young learners, incorporating play-based learning and positive reinforcement.',
			icon: 'users',
		},
		{
			id: 'primary-callout-2',
			title: 'Entrance Exam Success',
			description:
				'Proven track record of securing places at top preparatory and grammar schools through targeted 7+, 8+, and 11+ preparation.',
			icon: 'award',
		},
		{
			id: 'primary-callout-3',
			title: 'Personalised Learning',
			description:
				"Comprehensive assessments and individualised learning plans that adapt to each child's unique pace and learning style.",
			icon: 'trending-up',
		},
	],
	testimonialIds: [],
	statIds: [],
} as const;

// Secondary School Content
const SECONDARY_SCHOOL_CONTENT: EducationLevelTabContentType = {
	id: 'secondary-school',
	title: 'Secondary School',
	mainDescription:
		'One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners. Our support goes beyond the syllabus, equipping students with effective revision strategies, time management skills and structured study plans. 94% of students improve by at least two grades at GCSE.',
	subsections: [
		{
			id: 'secondary-tutoring-today',
			heading: 'Tutoring Today for Success Tomorrow',
			mainTextBody:
				'GCSEs, A-Levels and IB exams mark crucial academic transition points. As subjects become more complex, results in these qualifications play a defining role in shaping university pathways. A minimum requirement of 7s at GCSE is now standard at many top-tier universities. Personalised, one-to-one tuition can make a significant difference at both GCSE and A Level, helping students strengthen their academic record, ready to present a dynamite profile when it matters most.',
			videos: [
				{
					id: 'secondary-success-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-secondary-success',
					thumbnailSrc: '/images/features/tutoring-today-success-tomorrow.jpg',
					thumbnailAlt: 'Tutoring for GCSE and A-Level success',
					isFree: false,
				},
			],
		},
		{
			id: 'secondary-personalised-plans',
			heading: 'Personalised Plans to Ensure Maximum Progress',
			mainTextBody:
				'Each student is initially assessed to identify their individual strengths, learning style and areas for growth. Regular progress check-ins and measurable academic outcomes ensure students stay on track for success.',
			videos: [
				{
					id: 'secondary-plans-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-secondary-plans',
					thumbnailSrc: '/images/features/personalised-plans-maximum-progress.jpg',
					thumbnailAlt: 'Personalised learning plans for maximum progress',
					isFree: true,
				},
			],
		},
		{
			id: 'secondary-subjects-coverage',
			heading: 'Subjects We Tutor',
			mainTextBody:
				'Comprehensive subject coverage across all key academic areas including STEM subjects, humanities, languages, and creative disciplines. Our tutors are subject specialists with extensive examination experience.\n\nSTEM & Mathematical Subjects: Advanced mathematics and scientific disciplines taught by specialists with extensive examination board experience.\n\nHumanities & Social Sciences: Comprehensive humanities education covering literature, history, politics, and social sciences with expert guidance.\n\nLanguages: Modern and classical language tuition with native speakers and qualified language specialists.\n\nCreative & Arts-Based Subjects: Creative disciplines taught by practising professionals and experienced arts educators.\n\nAdditional Academic Support: Specialised academic skills and examination preparation beyond core curriculum subjects.',
			videos: [
				{
					id: 'secondary-subjects-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-secondary-subjects',
					thumbnailSrc: '/images/features/subjects-we-tutor.jpg',
					thumbnailAlt: 'Comprehensive subject coverage',
					isFree: true,
				},
			],
		},
	],
	callOuts: [
		{
			id: 'secondary-callout-1',
			title: 'Subject Specialists',
			description:
				'Expert tutors with extensive examination board experience delivering targeted support for KS3, GCSE, A-Level, and IB.',
			icon: 'school',
		},
		{
			id: 'secondary-callout-2',
			title: '94% Grade Improvement',
			description:
				'94% of students improve by at least two grades at GCSE through our personalised one-to-one tutoring approach.',
			icon: 'trending-up',
		},
		{
			id: 'secondary-callout-3',
			title: 'Beyond the Syllabus',
			description:
				'Comprehensive support including revision strategies, time management skills, and structured study plans for long-term success.',
			icon: 'check-circle',
		},
	],
	testimonialIds: [],
} as const;

// Entrance Exams Content
const ENTRANCE_EXAMS_CONTENT: EducationLevelTabContentType = {
	id: 'entrance-exams',
	title: 'Entrance Exams',
	mainDescription:
		'Specialised preparation for competitive entrance examinations across all age groups. Our team works with GL, CEM, ISEB, CAT4, and internal papers set by individual schools.',
	subsections: [
		{
			id: 'entrance-exam-boards',
			heading: 'Aligned With Every Major Exam Board',
			mainTextBody:
				'Our team works with GL, CEM, ISEB, CAT4, and internal papers set by individual schools. We provide comprehensive preparation that covers all major entrance examination formats, ensuring students are fully prepared for their specific assessment requirements.',
			videos: [
				{
					id: 'entrance-boards-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-entrance-boards',
					thumbnailSrc: '/images/features/aligned-with-every-major-exam-board.jpg',
					thumbnailAlt: 'Aligned with every major exam board',
					isFree: false,
				},
			],
		},
	],
	callOuts: [
		{
			id: 'entrance-callout-1',
			title: 'GL Assessment Expertise',
			description:
				'Specialist preparation for GL Assessment entrance exams with proven success at leading grammar schools.',
			icon: 'award',
		},
		{
			id: 'entrance-callout-2',
			title: 'CEM Preparation',
			description:
				'Targeted coaching for CEM 11+ examinations, covering verbal reasoning, non-verbal reasoning, and numerical reasoning.',
			icon: 'trending-up',
		},
		{
			id: 'entrance-callout-3',
			title: 'School-Specific Papers',
			description:
				'Tailored preparation for individual school entrance papers, including top independent and grammar schools.',
			icon: 'check-circle',
		},
	],
	testimonialIds: [],
} as const;

// University Admissions Content
const UNIVERSITY_ADMISSIONS_CONTENT: EducationLevelTabContentType = {
	id: 'university-admissions',
	title: 'University Admissions & English Proficiency',
	mainDescription:
		'Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring. Navigate the complex British university admissions system with confidence through personalised UCAS guidance, personal statement coaching, and admissions test preparation.',
	subsections: [
		{
			id: 'ucas-insight-elizabeth',
			heading: 'UCAS Insight from Elizabeth',
			mainTextBody:
				'The British university admissions system represents one of the most intricate processes families will navigate. UCAS applications are governed by unwritten rules and implicit expectations that can confound even highly educated parents.\n\nElizabeth Burrows has helped countless students secure offers from Oxbridge and top Russell Group universities, providing insider knowledge of how admissions departments actually evaluate candidates.',
			videos: [
				{
					id: 'ucas-video-1',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-ucas-1',
					thumbnailSrc: '/images/masterclass-thumbnails/ucas-guide.png',
					thumbnailAlt:
						'UCAS Insight from Elizabeth - University Admissions Guidance',
					isFree: false,
					purchaseLink: 'https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408',
				},
			],
		},
		{
			id: 'personal-statement-tips',
			heading:
				"Elizabeth's Top 10 Tips for Sculpting an Outstanding Personal Statement",
			mainTextBody:
				"The personal statement - a 4,000 character document that can determine a young person's entire future - operates according to criteria that are rarely made explicit.\n\nLearn the insider strategies for crafting compelling personal statements that stand out to admissions tutors at competitive universities. Elizabeth shares her proven framework for demonstrating genuine academic passion and intellectual curiosity.",
			videos: [
				{
					id: 'personal-statement-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-statement',
					thumbnailSrc: '/images/video-thumbnails/top-10-tips-thumbnail.png',
					thumbnailAlt:
						'Personal Statement Tips - Crafting Outstanding Applications',
					isFree: false,
					purchaseLink: 'https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409',
				},
			],
		},
		{
			id: 'admissions-tests',
			heading: 'Subject-Specific University Admissions Tests',
			mainTextBody:
				'Many competitive courses require additional admissions tests beyond A-Levels. These assessments - including UCAT, BMAT, LNAT, TSA, and subject-specific tests - demand targeted preparation strategies.\n\nOur specialist tutors provide comprehensive preparation for all major admissions tests, combining subject knowledge with test technique to maximise performance under exam conditions.',
			videos: [
				{
					id: 'admissions-tests-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-tests',
					thumbnailSrc: '/images/masterclass-thumbnails/ucas-guide.png',
					thumbnailAlt: 'Admissions Tests - Preparation for University Entry Exams',
					isFree: true,
				},
			],
		},
	],
	callOuts: [
		{
			id: 'ucas-callout-1',
			title: 'Oxbridge Success',
			description:
				'Proven track record of securing offers from Oxford and Cambridge through personalised interview coaching and application strategy.',
			icon: 'award',
		},
		{
			id: 'ucas-callout-2',
			title: 'Russell Group Expertise',
			description:
				'Specialist knowledge of admission requirements and selection criteria for all Russell Group universities and competitive courses.',
			icon: 'school',
		},
		{
			id: 'ucas-callout-3',
			title: 'Complete Application Support',
			description:
				'End-to-end guidance from course selection and personal statement through to interview preparation and offer management.',
			icon: 'check-circle',
		},
	],
	testimonialIds: [],
} as const;

// Online Homeschooling Content
const ONLINE_HOMESCHOOLING_CONTENT: EducationLevelTabContentType = {
	id: 'online-homeschooling',
	title: 'Online Homeschooling',
	mainDescription:
		'Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility. We deliver bespoke online programmes that rival independent schools in quality.',
	subsections: [
		{
			id: 'homeschool-curriculum',
			heading: 'Why Choose Homeschooling with Us',
			mainTextBody:
				"Private‑School Standard, Delivered Virtually: We deliver bespoke online programmes that rival independent schools in quality.\n\nOur homeschooling provision combines the flexibility families need with the rigorous academic standards of top independent schools. Expert tutor teams work collaboratively to deliver a personalised curriculum tailored to each child's learning needs and family circumstances.",
			videos: [
				{
					id: 'homeschool-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-homeschool',
					thumbnailSrc: '/images/features/why-choose-homeschooling-with-us.jpg',
					thumbnailAlt: 'Why choose homeschooling with us',
					isFree: true,
				},
			],
		},
	],
	callOuts: [
		{
			id: 'homeschool-callout-1',
			title: 'Private School Standard',
			description:
				'Bespoke online programmes delivering the same academic rigour and excellence as top independent schools.',
			icon: 'award',
		},
		{
			id: 'homeschool-callout-2',
			title: 'Personalised Curriculum',
			description:
				"Tailored educational programmes designed to meet each child's unique learning needs and family circumstances.",
			icon: 'users',
		},
		{
			id: 'homeschool-callout-3',
			title: 'Expert Tutor Teams',
			description:
				'Collaborative teams of specialist tutors providing comprehensive subject coverage and academic support.',
			icon: 'school',
		},
	],
	testimonialIds: [],
} as const;

// SEN Support Content
const SEN_SUPPORT_CONTENT: EducationLevelTabContentType = {
	id: 'sen-support',
	title: 'SEN Support & Neurodiverse Learning',
	mainDescription:
		"Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support. We provide detailed assessments to identify strengths, challenges, and personal learning styles.",
	subsections: [
		{
			id: 'sen-individualised-learning',
			heading: 'Individualised Learning',
			mainTextBody:
				'Tutors conduct detailed assessments to identify strengths, challenges, and personal learning styles.\n\nOur SEN-specialist tutors understand that neurodiverse learners require tailored approaches that work with their unique cognitive profiles. We identify learning strengths and build comprehensive support plans that enable students to thrive academically whilst developing essential self-advocacy skills.',
			videos: [
				{
					id: 'sen-learning-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-sen',
					thumbnailSrc: '/images/features/individualised-learning.jpg',
					thumbnailAlt: 'Individualised learning for SEN support',
					isFree: false,
				},
			],
		},
	],
	callOuts: [
		{
			id: 'sen-callout-1',
			title: 'Detailed Assessments',
			description:
				'Comprehensive evaluations identifying individual strengths, challenges, and optimal learning approaches for each student.',
			icon: 'check-circle',
		},
		{
			id: 'sen-callout-2',
			title: 'Strength Identification',
			description:
				"Focus on identifying and building upon each student's unique strengths and capabilities for confident learning.",
			icon: 'trending-up',
		},
		{
			id: 'sen-callout-3',
			title: 'Personal Learning Styles',
			description:
				"Tailored teaching methods designed to work with each student's individual cognitive profile and learning preferences.",
			icon: 'users',
		},
	],
	testimonialIds: [],
} as const;

// London In-Person Content
const LONDON_IN_PERSON_CONTENT: EducationLevelTabContentType = {
	id: 'london-in-person',
	title: 'London In-Person Tutoring',
	mainDescription:
		'In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability. All sessions delivered by DBS-checked specialist tutors with experience of the London independent and state school sectors.',
	subsections: [
		{
			id: 'london-dbs-tutors',
			heading: 'DBS-Checked Specialist Tutors',
			mainTextBody:
				"Sessions delivered by DBS-checked, specialist tutors with experience of the London independent and state school sectors.\n\nOur London-based tutors bring extensive knowledge of the capital's competitive educational landscape, from grammar school 11+ preparation to independent school entrance exams and ongoing academic support.",
			videos: [
				{
					id: 'london-dbs-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-london-dbs',
					thumbnailSrc: '/images/masterclass-thumbnails/ucas-guide.png',
					thumbnailAlt: 'DBS-checked specialist tutors',
					isFree: false,
				},
			],
		},
		{
			id: 'london-entrance-support',
			heading: 'Entrance Exam & Subject-Specific Support',
			mainTextBody:
				'Ideal for entrance exam preparation, subject-specific tuition, or ongoing academic support.\n\nOur in-person tutoring provides the face-to-face interaction that many families prefer, combining personalised attention with the convenience of home-based sessions across London Zones 1-5.',
			videos: [
				{
					id: 'london-entrance-video',
					youtubeUrl: 'https://www.youtube.com/embed/placeholder-london-entrance',
					thumbnailSrc: '/images/masterclass-thumbnails/ucas-guide.png',
					thumbnailAlt: 'Entrance exam and subject-specific support',
					isFree: false,
				},
			],
		},
	],
	callOuts: [
		{
			id: 'london-callout-1',
			title: 'DBS-Checked Tutors',
			description:
				'All tutors undergo comprehensive DBS checks and safeguarding training for complete peace of mind.',
			icon: 'shield',
		},
		{
			id: 'london-callout-2',
			title: 'London School Expertise',
			description:
				'Specialist knowledge of London independent and state schools, including entrance exam requirements and teaching standards.',
			icon: 'school',
		},
		{
			id: 'london-callout-3',
			title: 'Zones 1-5 Coverage',
			description:
				'Convenient in-person tutoring available across central and inner London, with flexible scheduling to suit families.',
			icon: 'check-circle',
		},
	],
	testimonialIds: [],
} as const;

interface SubjectTuitionTabsProps {
	className?: string;
	params?: Promise<{
		[key: string]: string;
	}>;
	searchParams?: Promise<{
		[key: string]: string | string[] | undefined;
	}>;
}
type EducationLevelValue =
	| 'primary-school'
	| 'secondary-school'
	| 'entrance-exams'
	| 'university-admissions'
	| 'online-homeschooling'
	| 'sen-support'
	| 'london-in-person';
interface StrictEducationLevel {
	readonly value: EducationLevelValue;
	readonly label: string;
	readonly description: string;
	readonly subjects: ReadonlyArray<string>;
	readonly keyFeatures: ReadonlyArray<string>;
	readonly icon: LucideIcon;
}
const educationLevels = [
	{
		value: 'primary-school',
		label: 'Primary School',
		icon: School,
		description:
			"The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right.",
		subjects: [
			'Mathematics',
			'English',
			'Science',
			'Reading & Comprehension',
			'Writing Skills',
		],
		keyFeatures: [
			'Interactive learning methods',
			'Building confidence and enthusiasm',
			'Personalised learning pace',
			'Regular progress assessments',
		],
	},
	{
		value: 'secondary-school',
		label: 'Secondary School',
		icon: GraduationCap,
		description:
			'One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners.',
		subjects: [
			'Mathematics',
			'English Literature & Language',
			'Sciences',
			'History',
			'Geography',
			'Modern Foreign Languages',
		],
		keyFeatures: [
			'Subject specialist tutors',
			'Exam technique development',
			'Study skills coaching',
			'Transition support to GCSE level',
		],
	},
	{
		value: 'entrance-exams',
		label: 'Entrance Exams',
		icon: Trophy,
		description:
			'Specialised preparation for competitive entrance examinations across all age groups.',
		subjects: [
			'Mathematics',
			'English Language & Literature',
			'Biology',
			'Chemistry',
			'Physics',
			'History',
			'Geography',
			'Modern Languages',
		],
		keyFeatures: [
			'GL Assessment expertise',
			'CEM preparation',
			'ISEB Common Entrance',
			'School-specific papers',
		],
	},
	{
		value: 'university-admissions',
		label: 'University Admissions & English Proficiency',
		icon: BookOpen,
		description:
			'Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring.',
		subjects: [
			'Essay Writing',
			'Research Methods',
			'Statistics',
			'Subject-Specific Support',
			'Dissertation Guidance',
		],
		keyFeatures: [
			'Academic writing excellence',
			'Research methodology training',
			'Time management strategies',
			'Peer review processes',
		],
	},
	{
		value: 'online-homeschooling',
		label: 'Online Homeschooling',
		icon: Laptop,
		description:
			'Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility.',
		subjects: [
			'Professional Qualifications',
			'Career Development',
			'Digital Literacy',
			'Language Learning',
			'Creative Writing',
		],
		keyFeatures: [
			'Private school standard',
			'Personalised curriculum',
			'Expert tutor teams',
			'Flexible scheduling',
		],
	},
	{
		value: 'sen-support',
		label: 'SEN Support & Neurodiverse Learning',
		icon: Heart,
		description:
			"Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support.",
		subjects: [
			'Individualised Learning',
			'Strength Identification',
			'Learning Style Analysis',
			'Accessibility Support',
		],
		keyFeatures: [
			'Detailed assessments',
			'Strength identification',
			'Learning style analysis',
			'Personalised support plans',
		],
	},
	{
		value: 'london-in-person',
		label: 'London In-Person Tutoring',
		icon: MapPin,
		description:
			'In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability.',
		subjects: [
			'All Academic Subjects',
			'Interview Preparation',
			'Entrance Exams',
			'Study Skills',
		],
		keyFeatures: [
			'DBS-checked tutors',
			'Specialist expertise',
			'London school experience',
			'Entrance exam preparation',
		],
	},
] as const satisfies ReadonlyArray<StrictEducationLevel>;
export default function SubjectTuitionTabsPage({}: SubjectTuitionTabsProps) {
	const [selectedTab, setSelectedTab] =
		useState<EducationLevelValue>('primary-school');
	const handleTabChange = useCallback((value: string) => {
		setSelectedTab(value as EducationLevelValue);
		console.log('Tab changed to:', value);
	}, []);
	const TabContent = memo(
		({
			level,
			contentData,
		}: {
			level: StrictEducationLevel;
			contentData: React.ReactNode;
		}) => {
			return (
				<TabsContent
					key={level.value}
					value={level.value}
					className='mt-0 focus-visible:outline-none'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={level.value}
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								y: -20,
							}}
							transition={{
								duration: 0.4,
								ease: 'easeOut',
							}}>
							<div className='mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 '>
								{contentData}
							</div>
						</motion.div>
					</AnimatePresence>
				</TabsContent>
			);
		},
	);
	TabContent.displayName = 'TabContent';
	return (
		<>
			<SimpleHero
				backgroundImage='/images/hero/subject-tuition.jpg'
				h1={
					<span className='text-white'>
						Subject Tutoring
						<br />&<br />
						<span className='text-accent-600'>Exam Preparation</span>
					</span>
				}
				h2='From entrance exams to university prep, our expert tutors provide personalised instruction across all subjects and educational stages. '
				decorativeStyle='lines'
			/>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={false}
				containerSize='full'>
				<main className='flex-1  px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white'>
					<div className='w-full mx-auto'>
						<Tabs
							defaultValue='primary-school'
							value={selectedTab}
							className='w-full'
							orientation='horizontal'
							dir='ltr'
							onValueChange={handleTabChange}>
							<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
								<TabsList className='flex h-auto w-full flex-wrap gap-2 bg-primary-700 p-2 rounded-none'>
									{educationLevels.map((level) => {
										const IconComponent = level.icon;
										return (
											<TabsTrigger
												key={level.value}
												value={level.value}
												className={cn(
													'px-4 py-3 transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=inactive]:bg-transparent data-[state=inactive]:text-white rounded-none flex items-center gap-2',
												)}>
												<IconComponent className="h-4 w-4" />
												{level.label}
											</TabsTrigger>
										);
									})}
								</TabsList>
							</div>

							<TabContent
								level={educationLevels.find((l) => l.value === 'primary-school')!}
								contentData={<PrimarySchoolContent />}
							/>

							<TabContent
								level={educationLevels.find((l) => l.value === 'secondary-school')!}
								contentData={<SecondarySchoolContent />}
							/>

							<TabContent
								level={educationLevels.find((l) => l.value === 'entrance-exams')!}
								contentData={<EntranceExamsContent />}
							/>

							<TabContent
								level={
									educationLevels.find((l) => l.value === 'university-admissions')!
								}
								contentData={<UniversityAdmissionsContent />}
							/>

							<TabContent
								level={educationLevels.find((l) => l.value === 'online-homeschooling')!}
								contentData={<OnlineHomeschoolingContent />}
							/>

							<TabContent
								level={educationLevels.find((l) => l.value === 'sen-support')!}
								contentData={<SenSupportContent />}
							/>

							<TabContent
								level={educationLevels.find((l) => l.value === 'london-in-person')!}
								contentData={<LondonInPersonContent />}
							/>
						</Tabs>
					</div>
				</main>
			</PageLayout>

			<PageFooter
				variant='premium'
				showBackToTop={true}
				showNewsletter={false}
				showContactForm={false}
			/>
		</>
	);
}
export type {
	EducationLevelValue,
	StrictEducationLevel,
	SubjectTuitionTabsProps,
};
