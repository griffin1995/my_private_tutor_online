'use client';

// CONTEXT7 SOURCE: /vercel/next.js - Navigation component integration pattern for consistent site structure
// NAVBAR REPLICATION REASON: Official Next.js documentation patterns for replicating navbar implementation from subject-tuition page to subject-tuition-tabs page
// CONTEXT7 SOURCE: /radix-ui/website - Basic Tabs Example and Radix UI Tabs Anatomy
// IMPLEMENTATION REASON: Official Radix UI website documentation for fundamental Tabs component structure
// CONTEXT7 SOURCE: /radix-ui/website - Install Radix UI Tabs - npm install @radix-ui/react-tabs
// DEPENDENCY REASON: Official Radix UI documentation for proper package installation and import patterns

// CONTEXT7 SOURCE: /facebook/react - React functional components with TypeScript interfaces
// COMPONENT REASON: Official React documentation patterns for TypeScript component definitions
// CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page component patterns
// PAGE ROUTE REASON: Official Next.js documentation for App Router page.tsx file structure

import { PageFooter } from '@/components/layout/page-footer';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { cn } from '@/lib/utils';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
// CONTEXT7 SOURCE: /radix-ui/primitives - Additional imports for exact content migration
// CONTENT MIGRATION REASON: Official Radix UI documentation for component composition and video integration
import { motion } from 'framer-motion';

// CONTEXT7 SOURCE: /websites/react_dev - Clean card component for brand-compliant tab content
// CLEAN CARD REASON: Official React documentation pattern for scannable, accessible component composition
// CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component for education levels
// EDUCATION TAB CONTENT REASON: Official React documentation for composite container components
import { EducationLevelTabContent } from '@/components/education/EducationLevelTabContent';
// CONTEXT7 SOURCE: /lib/cms/education-tabs-cms - CMS data for standardized tab content
// CMS IMPORT REASON: Synchronous CMS data access for education level tabs
import {
	getEntranceExamsContent,
	getLondonInPersonContent,
	getOnlineHomeschoolingContent,
	getPrimarySchoolContent,
	getSecondarySchoolContent,
	getSenSupportContent,
	getUniversityAdmissionsContent,
} from '@/lib/cms/education-tabs-cms';

// CONTEXT7 SOURCE: /typescript/handbook - TypeScript interface definitions for component props
// INTERFACE REASON: Official TypeScript handbook for proper type definitions and component contracts
// CONTEXT7 SOURCE: /microsoft/typescript - Strict TypeScript patterns with readonly properties
// STRICT TYPING REASON: Official TypeScript documentation for readonly interface patterns and Next.js App Router params

interface SubjectTuitionTabsProps {
	className?: string;
	params?: Promise<{ [key: string]: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// CONTEXT7 SOURCE: /typescript/handbook - TypeScript interface definitions for education level data structure
// EDUCATION LEVELS REASON: Official TypeScript handbook for defining structured data types
// CONTEXT7 SOURCE: /microsoft/typescript - Strict TypeScript patterns with readonly properties and literal types
// STRICT READONLY REASON: Official TypeScript documentation for readonly interfaces and const assertions

// CONTEXT7 SOURCE: /microsoft/typescript - Type union removal and interface cleanup
// REMOVAL REASON: Achieving 1-to-1 content mapping with /new-page accordion sections
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
}

// CONTEXT7 SOURCE: /microsoft/typescript - Helper function for video masterclass conversion
// CONVERSION REASON: Official TypeScript documentation for interface compatibility patterns
// function convertToVideoMasterclass(standardizedVideo: any): VideoMasterclass {
// 	return {
// 		id: standardizedVideo.id,
// 		title: standardizedVideo.title,
// 		description: standardizedVideo.description,
// 		bulletPoints: standardizedVideo.bulletPoints,
// 		youtubeUrl: standardizedVideo.youtubeUrl,
// 		thumbnailImage: standardizedVideo.thumbnailImage,
// 		backgroundImage: standardizedVideo.backgroundImage,
// 		isPaid: standardizedVideo.isPaid,
// 		purchaseLink: standardizedVideo.purchaseLink,
// 	};
// }

// Education levels data with EXACT titles from /new-page accordion sections
// CONTEXT7 SOURCE: /microsoft/typescript - Const assertions for immutable array patterns
// CONST ASSERTION REASON: Official TypeScript documentation for readonly array patterns with const assertions
// TITLE CORRECTION REASON: Exact match with /new-page accordion section titles for consistency
const educationLevels = [
	{
		value: 'primary-school',
		label: 'Primary School',
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
	// A-Level removed for 1-to-1 content mapping with /new-page accordion sections
	{
		value: 'university-admissions',
		label: 'University Admissions & English Proficiency',
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

// CONTEXT7 SOURCE: /radix-ui/primitives - Tabs Content component with exact accordion content migration
// CONTENT MIGRATION REASON: Official Radix UI documentation for Tabs.Content structure with complex nested content

export default function SubjectTuitionTabsPage({}: SubjectTuitionTabsProps) {
	// CONTEXT7 SOURCE: /facebook/react - useState for controlled component pattern
	// STATE MANAGEMENT REASON: Official React documentation for controlled Tabs component
	const [selectedTab, setSelectedTab] =
		useState<EducationLevelValue>('primary-school');

	// CONTEXT7 SOURCE: /facebook/react - useCallback for event handler optimization
	// PERFORMANCE REASON: Official React documentation for preventing unnecessary re-renders
	const handleTabChange = useCallback((value: string) => {
		setSelectedTab(value as EducationLevelValue);
		console.log('Tab changed to:', value);
	}, []);
	// CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for memoizing expensive operations
	// VIDEO FETCH REASON: Official React documentation for performance optimization with expensive data fetching
	// const allVideos = useMemo(() => {
	// 	const videos = getVideoMasterclassPage();
	// 	return videos;
	// }, []);

	// Split videos into sections for organized display - matching /new-page structure
	// const ucasVideos = useMemo(() => {
	// 	return allVideos.slice(2, 4); // UCAS section videos
	// }, [allVideos]);

	// CONTEXT7 SOURCE: /microsoft/typescript - Standardized data structure access patterns
	// PRIMARY SCHOOL DATA: Extract exact content from accordion structure
	// const primarySchoolData = {
	// 	heading: {
	// 		title: 'Primary School',
	// 		description:
	// 			"The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right. We understand that early education experiences are formative, so we prioritise curiosity, resilience, and a love of learning.",
	// 		backgroundColor: 'white',
	// 		className: 'py-16',
	// 	},
	// 	videos: [
	// 		{
	// 			id: 'primary-confidence-building',
	// 			title: 'Confidence-building lessons designed for early learners',
	// 			description:
	// 				'Our primary tutoring focuses on nurturing natural curiosity whilst building essential academic foundations. We understand that young learners need encouragement and support to develop confidence in their abilities, creating positive associations with learning that will serve them throughout their educational journey.',
	// 			bulletPoints: [
	// 				'Age-appropriate teaching methods',
	// 				'Confidence building activities',
	// 				'Positive reinforcement techniques',
	// 				'Play-based learning integration',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage:
	// 				'/images/features/confidence-building-lessons-early-learners.jpg',
	// 			backgroundImage:
	// 				'/images/features/confidence-building-lessons-early-learners.jpg',
	// 			isPaid: false,
	// 		},
	// 		{
	// 			id: 'primary-entrance-specialists',
	// 			title:
	// 				'7+, 8+ and 11+ specialists with a track record of top school offers',
	// 			description:
	// 				'Our experienced tutors specialise in preparing young students for competitive entrance examinations. With proven success rates at leading preparatory and grammar schools, we provide targeted preparation that builds both academic competence and examination confidence.',
	// 			bulletPoints: [
	// 				'Entrance exam expertise',
	// 				'Grammar school preparation',
	// 				'Preparatory school success',
	// 				'Examination confidence building',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage:
	// 				'/images/features/7-8-11-plus-specialists-track-record-top-school-offers.jpg',
	// 			backgroundImage:
	// 				'/images/features/7-8-11-plus-specialists-track-record-top-school-offers.jpg',
	// 			isPaid: false,
	// 		},
	// 		{
	// 			id: 'primary-individual-learning',
	// 			title: 'Individual learning plans shaped by expert assessment',
	// 			description:
	// 				"Every primary student receives a comprehensive initial assessment to identify their unique learning style, strengths, and areas for development. Our expert tutors then create personalised learning plans that adapt to each child's pace and preferred learning methods.",
	// 			bulletPoints: [
	// 				'Comprehensive initial assessment',
	// 				'Personalised learning plans',
	// 				'Regular progress monitoring',
	// 				'Adaptive teaching methods',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage:
	// 				'/images/features/individual-learning-plans-expert-assessment.jpg',
	// 			backgroundImage:
	// 				'/images/features/individual-learning-plans-expert-assessment.jpg',
	// 			isPaid: false,
	// 		},
	// 	],
	// };

	// // SECONDARY SCHOOL DATA: Extract exact content from accordion structure
	// const secondarySchoolData = {
	// 	heading: {
	// 		title: 'Secondary School',
	// 		description:
	// 			'One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners. Our support goes beyond the syllabus, equipping students with effective revision strategies, time management skills and structured study plans. 94% of students improve by at least two grades at GCSE.',
	// 		backgroundColor: 'gray-50',
	// 		className: 'py-16',
	// 	},
	// 	videos: [
	// 		{
	// 			id: 'secondary-tutoring-today',
	// 			title: 'Tutoring Today for Success Tomorrow',
	// 			description:
	// 				'GCSEs, A-Levels and IB exams mark crucial academic transition points. As subjects become more complex, results in these qualifications play a defining role in shaping university pathways. A minimum requirement of 7s at GCSE is now standard at many top-tier universities. Personalised, one-to-one tuition can make a significant difference at both GCSE and A Level, helping students strengthen their academic record, ready to present a dynamite profile when it matters most.',
	// 			bulletPoints: [
	// 				'GCSE & A-Level expertise',
	// 				'University pathway planning',
	// 				'Grade improvement strategies',
	// 				'Profile strengthening',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage: '/images/features/tutoring-today-success-tomorrow.jpg',
	// 			backgroundImage: '/images/features/tutoring-today-success-tomorrow.jpg',
	// 			isPaid: true,
	// 			purchaseLink: 'https://buy.stripe.com/test_example',
	// 		},
	// 		{
	// 			id: 'secondary-personalised-plans',
	// 			title: 'Personalised Plans to Ensure Maximum Progress',
	// 			description:
	// 				'Each student is initially assessed to identify their individual strengths, learning style and areas for growth. Regular progress check-ins and measurable academic outcomes ensure students stay on track for success.',
	// 			bulletPoints: [
	// 				'Individual assessment',
	// 				'Learning style identification',
	// 				'Progress monitoring',
	// 				'Measurable outcomes',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage: '/images/features/personalised-plans-maximum-progress.jpg',
	// 			backgroundImage: '/images/features/personalised-plans-maximum-progress.jpg',
	// 			isPaid: false,
	// 		},
	// 		{
	// 			id: 'secondary-subjects-coverage',
	// 			title: 'Subjects We Tutor',
	// 			description:
	// 				'Comprehensive subject coverage across all key academic areas including STEM subjects, humanities, languages, and creative disciplines. Our tutors are subject specialists with extensive examination experience.\n\nSTEM & Mathematical Subjects: Advanced mathematics and scientific disciplines taught by specialists with extensive examination board experience.\n\nHumanities & Social Sciences: Comprehensive humanities education covering literature, history, politics, and social sciences with expert guidance.\n\nLanguages: Modern and classical language tuition with native speakers and qualified language specialists.\n\nCreative & Arts-Based Subjects: Creative disciplines taught by practising professionals and experienced arts educators.\n\nAdditional Academic Support: Specialised academic skills and examination preparation beyond core curriculum subjects.',
	// 			bulletPoints: [
	// 				'Mathematics & Further Mathematics',
	// 				'Biology',
	// 				'Chemistry',
	// 				'Physics',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage: '/images/features/subjects-we-tutor.jpg',
	// 			backgroundImage: '/images/features/subjects-we-tutor.jpg',
	// 			isPaid: false,
	// 		},
	// 	],
	// };

	// // ENTRANCE EXAMS DATA: Extract exact content from Entrance Exams accordion
	// const entranceExamsData = {
	// 	heading: {
	// 		title: 'Entrance Exams',
	// 		description:
	// 			'Specialised preparation for competitive entrance examinations across all age groups.',
	// 		backgroundColor: 'white',
	// 		className: 'py-16',
	// 	},
	// 	video: {
	// 		id: '11plus-preparation',
	// 		title: 'Aligned With Every Major Exam Board',
	// 		description:
	// 			'Our team works with GL, CEM, ISEB, CAT4, and internal papers set by individual schools.',
	// 		bulletPoints: [
	// 			'GL Assessment expertise',
	// 			'CEM preparation',
	// 			'ISEB Common Entrance',
	// 			'School-specific papers',
	// 		],
	// 		youtubeUrl: null,
	// 		thumbnailImage: '/images/features/aligned-with-every-major-exam-board.jpg',
	// 		backgroundImage: '/images/features/aligned-with-every-major-exam-board.jpg',
	// 		isPaid: true,
	// 		purchaseLink: 'https://buy.stripe.com/test_example',
	// 	},
	// };

	// // UNIVERSITY ADMISSIONS DATA: Extract exact content from University Admissions accordion
	// const universityAdmissionsData = {
	// 	heading: {
	// 		title: 'University Admissions & English Proficiency',
	// 		description:
	// 			'Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring.',
	// 		backgroundColor: 'gray-50',
	// 		className: 'py-16',
	// 	},
	// 	videos: ucasVideos,
	// };

	// // ONLINE HOMESCHOOLING DATA: Extract exact content from Online Homeschooling accordion
	// const onlineHomeschoolingData = {
	// 	heading: {
	// 		title: 'Online Homeschooling',
	// 		description:
	// 			'Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility.',
	// 		backgroundColor: 'white',
	// 		className: 'py-16',
	// 	},
	// 	video: {
	// 		id: 'homeschool-curriculum',
	// 		title: 'Why Choose Homeschooling with Us',
	// 		description:
	// 			'Private‑School Standard, Delivered Virtually: We deliver bespoke online programmes that rival independent schools in quality.',
	// 		bulletPoints: [
	// 			'Private school standard',
	// 			'Personalised curriculum',
	// 			'Expert tutor teams',
	// 		],
	// 		youtubeUrl: null,
	// 		thumbnailImage: '/images/features/why-choose-homeschooling-with-us.jpg',
	// 		backgroundImage: '/images/features/why-choose-homeschooling-with-us.jpg',
	// 		isPaid: false,
	// 	},
	// };

	// // SEN SUPPORT DATA: Extract exact content from SEN Support accordion
	// const senSupportData = {
	// 	heading: {
	// 		title: 'SEN Support & Neurodiverse Learning',
	// 		description:
	// 			"Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support.",
	// 		backgroundColor: 'gray-50',
	// 		className: 'py-16',
	// 	},
	// 	video: {
	// 		id: 'individualised-learning',
	// 		title: 'Individualised Learning',
	// 		description:
	// 			'Tutors conduct detailed assessments to identify strengths, challenges, and personal learning styles.',
	// 		bulletPoints: [
	// 			'Detailed assessments',
	// 			'Strength identification',
	// 			'Learning style analysis',
	// 		],
	// 		youtubeUrl: null,
	// 		thumbnailImage: '/images/features/individualised-learning.jpg',
	// 		backgroundImage: '/images/features/individualised-learning.jpg',
	// 		isPaid: true,
	// 		purchaseLink: 'https://buy.stripe.com/test_example',
	// 	},
	// };

	// // LONDON IN-PERSON DATA: Extract exact content from London Tutoring accordion
	// const londonData = {
	// 	heading: {
	// 		title: 'London In-Person Tutoring',
	// 		description:
	// 			'In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability.',
	// 		backgroundColor: 'white',
	// 		className: 'py-16',
	// 	},
	// 	videos: [
	// 		{
	// 			id: 'dbs-checked-tutors',
	// 			title: 'DBS-Checked Specialist Tutors',
	// 			description:
	// 				'Sessions delivered by DBS-checked, specialist tutors with experience of the London independent and state school sectors.',
	// 			bulletPoints: [
	// 				'DBS-checked tutors',
	// 				'Specialist expertise',
	// 				'London school experience',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage: '/images/masterclass-thumbnails/ucas-guide.png',
	// 			backgroundImage: '/images/ucas-part-2-library-background.jpg',
	// 			isPaid: true,
	// 			purchaseLink: 'https://buy.stripe.com/test_example',
	// 		},
	// 		{
	// 			id: 'entrance-exam-subject-support',
	// 			title: 'Entrance Exam & Subject-Specific Support',
	// 			description:
	// 				'Ideal for entrance exam preparation, subject-specific tuition, or ongoing academic support.',
	// 			bulletPoints: [
	// 				'Entrance exam prep',
	// 				'Subject specialisation',
	// 				'Ongoing support',
	// 			],
	// 			youtubeUrl: null,
	// 			thumbnailImage: '/images/masterclass-thumbnails/ucas-guide.png',
	// 			backgroundImage: '/images/ucas-summit-background.jpg',
	// 			isPaid: true,
	// 			purchaseLink: 'https://buy.stripe.com/test_example',
	// 		},
	// 	],
	// };

	// CONTEXT7 SOURCE: /radix-ui/primitives - Tabs Content component with exact accordion content structure
	// TAB CONTENT REASON: Official Radix UI documentation for Tabs.Content with complex nested layouts
	// CONTEXT7 SOURCE: /radix-ui/website - Container width consistency for tabs and content alignment
	// WIDTH ALIGNMENT REASON: Official Radix UI documentation for consistent container patterns between List and Content
	const TabContent = memo(
		({
			level,
			contentData,
		}: {
			level: StrictEducationLevel;
			contentData: any;
		}) => {
			return (
				<Tabs.Content
					key={level.value}
					value={level.value}
					id={`panel-${level.value}`}
					role='tabpanel'
					aria-labelledby={`trigger-${level.value}`}
					className='mt-8 focus-visible:outline-none'
					tabIndex={0}>
					{/* CONTEXT7 SOURCE: /framer/motion - AnimatePresence for exit animations */}
					{/* ANIMATION REASON: Official Framer Motion documentation for tab content transitions */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={level.value}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}>
							{/* CONTEXT7 SOURCE: /radix-ui/website - Consistent container width pattern matching tabs list */}
							{/* CONTAINER ALIGNMENT REASON: Official Radix UI documentation for aligning tab list and content containers */}
							<div className='mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 '>
								{contentData}
							</div>
						</motion.div>
					</AnimatePresence>
				</Tabs.Content>
			);
		},
	);

	// Add display name for debugging
	TabContent.displayName = 'TabContent';

	return (
		<>
			{/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
			{/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
			<SimpleHero
				backgroundImage='/images/hero/hero-subject-tuition-primary.jpg'
				h1={
					<>
						Subject Tutoring
						<br />&<br />
						Exam Preparation
					</>
				}
				h2='From entrance exams to university prep, our expert tutors provide personalised instruction across all subjects and educational stages. '
				decorativeStyle='lines'
			/>

			{/* CONTEXT7 SOURCE: /vercel/next.js - Page layout wrapper for content sections */}
			{/* LAYOUT REASON: Official Next.js patterns for content section organization */}
			{/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
			{/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={false}
				containerSize='full'>
				{/* Main Content Section */}
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container and spacing utilities */}
				{/* LAYOUT REASON: Official Tailwind CSS documentation for responsive container layouts */}
				{/* GRADIENT FIX: Replaced slate-50 with proper neutral-50 token */}
				<main className='flex-1  px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white'>
					<div className='w-full mx-auto'>
						{/* Page Introduction */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography and text styling utilities */}
						{/* TEXT STYLING REASON: Official Tailwind CSS documentation for typography hierarchy */}
						{/* <div className='text-center mb-12'>
							<p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
								Our expert tutors provide specialised support across all educational
								stages, from primary school foundations to university-level excellence.
							</p>
							<h2 className='text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4'>
								Choose Your Educational Level
							</h2>F
						</div> */}

						{/* Radix UI Tabs Component */}
						{/* CONTEXT7 SOURCE: /radix-ui/website - Radix UI Tabs Anatomy and Basic Tabs Example */}
						{/* TABS STRUCTURE REASON: Official Radix UI documentation for Root, List, Trigger, and Content structure */}
						{/* CONTEXT7 SOURCE: /radix-ui/primitives - Complete Tabs API with all official props */}
						{/* TABS API ENHANCEMENT REASON: Official Radix UI documentation for complete API utilization */}
						{/* CONTEXT7 SOURCE: /radix-ui/website - Tabs defaultValue prop for initial tab selection */}
						{/* DEFAULT CHANGE REASON: User experience improvement to start with Primary School education level */}
						<Tabs.Root
							defaultValue='primary-school'
							value={selectedTab}
							className='w-full'
							orientation='horizontal'
							activationMode='automatic'
							dir='ltr'
							onValueChange={handleTabChange}
							aria-label='Educational programme selection'>
							{/* Tabs List */}
							{/* CONTEXT7 SOURCE: /radix-ui/website - Tabs.List with proper ARIA labelling */}
							{/* ACCESSIBILITY REASON: Official Radix UI documentation for aria-label best practices */}
							{/* CONTEXT7 SOURCE: /radix-ui/primitives - Complete Tabs.List API with loop prop */}
							{/* TABS LIST ENHANCEMENT REASON: Official Radix UI documentation for keyboard navigation loop */}
							{/* CONTEXT7 SOURCE: /radix-ui/website - Container width consistency for tabs and content alignment */}
							{/* WIDTH ALIGNMENT REASON: Official Radix UI documentation for consistent container patterns between List and Content */}
							<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8'>
								{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL button/trigger styling */}
								{/* COLOR TOKEN FIX: Replaced slate-800 with primary-700, blue-500/700 with proper tokens */}
								<Tabs.List
									className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 p-2 bg-primary-700'
									aria-label='Educational level tabs'
									aria-orientation='horizontal'
									role='tablist'
									loop={true}>
									{educationLevels.map((level) => {
										return (
											<Tabs.Trigger
												key={level.value}
												value={level.value}
												role='tab'
												aria-controls={`panel-${level.value}`}
												aria-selected={selectedTab === level.value}
												tabIndex={selectedTab === level.value ? 0 : -1}
												className={cn(
													'px-4 py-3 transition-all duration-200 ease-in-out',
													'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2',
													'data-[state=active]:bg-white data-[state=active]:text-primary-700',
													'data-[state=inactive]:text-white data-[state=inactive]:bg-transparent',
													'disabled:opacity-50 disabled:cursor-not-allowed',
												)}>
												{level.label}
											</Tabs.Trigger>
										);
									})}
								</Tabs.List>
							</div>

							{/* Tab Content Panels - EXACT ACCORDION CONTENT MIGRATION */}
							{/* CONTEXT7 SOURCE: /radix-ui/primitives - Tabs.Content with exact accordion structure */}
							{/* EXACT CONTENT REASON: Official Radix UI documentation for complex nested content in tabs */}

							{/* PRIMARY SCHOOL TAB - NEW STANDARDIZED SYSTEM */}
							{/* CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component */}
							{/* STANDARDIZED REASON: Official React documentation demonstrates composite component patterns for maintainable tab content */}
							<TabContent
								level={educationLevels.find((l) => l.value === 'primary-school')!}
								contentData={
									<EducationLevelTabContent content={getPrimarySchoolContent()} />
								}
							/>

							{/* SECONDARY SCHOOL TAB - NEW STANDARDIZED SYSTEM */}
							{/* CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component */}
							{/* STANDARDIZED REASON: Official React documentation demonstrates composite component patterns for maintainable tab content */}
							<TabContent
								level={educationLevels.find((l) => l.value === 'secondary-school')!}
								contentData={
									<EducationLevelTabContent content={getSecondarySchoolContent()} />
								}
							/>

							{/* ENTRANCE EXAMS TAB - NEW STANDARDIZED SYSTEM */}
							{/* CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component */}
							{/* STANDARDIZED REASON: Official React documentation demonstrates composite component patterns for maintainable tab content */}
							<TabContent
								level={educationLevels.find((l) => l.value === 'entrance-exams')!}
								contentData={
									<EducationLevelTabContent content={getEntranceExamsContent()} />
								}
							/>

							{/* A-Level tab completely removed for perfect 1-to-1 content mapping */}

							{/* UNIVERSITY ADMISSIONS TAB - NEW STANDARDIZED SYSTEM */}
							{/* CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component */}
							{/* STANDARDIZED REASON: Official React documentation demonstrates composite component patterns for maintainable tab content */}
							<TabContent
								level={
									educationLevels.find((l) => l.value === 'university-admissions')!
								}
								contentData={
									<EducationLevelTabContent content={getUniversityAdmissionsContent()} />
								}
							/>

							{/* ONLINE HOMESCHOOLING TAB - NEW STANDARDIZED SYSTEM */}
							{/* CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component */}
							{/* STANDARDIZED REASON: Official React documentation demonstrates composite component patterns for maintainable tab content */}
							<TabContent
								level={educationLevels.find((l) => l.value === 'online-homeschooling')!}
								contentData={
									<EducationLevelTabContent content={getOnlineHomeschoolingContent()} />
								}
							/>

							{/* SEN SUPPORT TAB - NEW STANDARDIZED SYSTEM */}
							{/* CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component */}
							{/* STANDARDIZED REASON: Official React documentation demonstrates composite component patterns for maintainable tab content */}
							<TabContent
								level={educationLevels.find((l) => l.value === 'sen-support')!}
								contentData={
									<EducationLevelTabContent content={getSenSupportContent()} />
								}
							/>

							{/* LONDON IN-PERSON TAB - NEW STANDARDIZED SYSTEM */}
							{/* CONTEXT7 SOURCE: /websites/react_dev - Standardized tab content component */}
							{/* STANDARDIZED REASON: Official React documentation demonstrates composite component patterns for maintainable tab content */}
							<TabContent
								level={educationLevels.find((l) => l.value === 'london-in-person')!}
								contentData={
									<EducationLevelTabContent content={getLondonInPersonContent()} />
								}
							/>
						</Tabs.Root>
					</div>
				</main>
			</PageLayout>

			{/* Footer */}
			{/* CONTEXT7 SOURCE: /facebook/react - Component composition for page layout structure */}
			{/* FOOTER INTEGRATION REASON: Official React documentation for proper component composition in page layouts */}
			<PageFooter
				variant='premium'
				showBackToTop={true}
				showNewsletter={false}
				showContactForm={false}
			/>
		</>
	);
}

// CONTEXT7 SOURCE: /typescript/handbook - TypeScript type exports for component reusability
// TYPE EXPORT REASON: Official TypeScript handbook for exporting component interfaces and types
export type {
	EducationLevelValue,
	StrictEducationLevel,
	SubjectTuitionTabsProps,
};
