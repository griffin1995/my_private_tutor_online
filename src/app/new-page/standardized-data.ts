import {
	type StandardizedContent,
	type StandardizedVideoMasterclass,
	createHeadingTextSection,
	createVideoGridSection,
} from './types';
const primarySchoolVideos: readonly StandardizedVideoMasterclass[] = [
	{
		id: 'primary-confidence-building',
		title: 'Confidence-building lessons designed for early learners',
		description:
			'Our primary tutoring focuses on nurturing natural curiosity whilst building essential academic foundations. We understand that young learners need encouragement and support to develop confidence in their abilities, creating positive associations with learning that will serve them throughout their educational journey.',
		bulletPoints: [
			'Age-appropriate teaching methods',
			'Confidence building activities',
			'Positive reinforcement techniques',
			'Play-based learning integration',
		],
		youtubeUrl: null,
		thumbnailImage:
			'/images/features/confidence-building-lessons-early-learners.jpg',
		backgroundImage:
			'/images/features/confidence-building-lessons-early-learners.jpg',
		isPaid: false,
	},
	{
		id: 'primary-entrance-specialists',
		title: '7+, 8+ and 11+ specialists with a track record of top school offers',
		description:
			'Our experienced tutors specialise in preparing young students for competitive entrance examinations. With proven success rates at leading preparatory and grammar schools, we provide targeted preparation that builds both academic competence and examination confidence.',
		youtubeUrl: null,
		thumbnailImage:
			'/images/features/7-8-11-plus-specialists-track-record-top-school-offers.jpg',
		backgroundImage:
			'/images/features/7-8-11-plus-specialists-track-record-top-school-offers.jpg',
		isPaid: false,
	},
];
const primarySchoolIndividualVideos: readonly StandardizedVideoMasterclass[] = [
	{
		id: 'primary-individual-learning',
		title: 'Individual learning plans shaped by expert assessment',
		description:
			"Every primary student receives a comprehensive initial assessment to identify their unique learning style, strengths, and areas for development. Our expert tutors then create personalised learning plans that adapt to each child's pace and preferred learning methods.",
		bulletPoints: [
			'Comprehensive initial assessment',
			'Personalised learning plans',
			'Regular progress monitoring',
			'Adaptive teaching methods',
		],
		youtubeUrl: null,
		thumbnailImage:
			'/images/features/individual-learning-plans-expert-assessment.jpg',
		backgroundImage:
			'/images/features/individual-learning-plans-expert-assessment.jpg',
		isPaid: false,
	},
];
const secondarySchoolVideos1: readonly StandardizedVideoMasterclass[] = [
	{
		id: 'secondary-tutoring-today',
		title: 'Tutoring Today for Success Tomorrow',
		description:
			'GCSEs, A-Levels and IB exams mark crucial academic transition points. As subjects become more complex, results in these qualifications play a defining role in shaping university pathways. A minimum requirement of 7s at GCSE is now standard at many top-tier universities. Personalised, one-to-one tuition can make a significant difference at both GCSE and A Level, helping students strengthen their academic record, ready to present a dynamite profile when it matters most.',
		bulletPoints: [
			'GCSE & A-Level expertise',
			'University pathway planning',
			'Grade improvement strategies',
			'Profile strengthening',
		],
		youtubeUrl: null,
		thumbnailImage: '/images/features/tutoring-today-success-tomorrow.jpg',
		backgroundImage: '/images/features/tutoring-today-success-tomorrow.jpg',
		isPaid: true,
		purchaseLink: 'https://buy.stripe.com/test_example',
	},
	{
		id: 'secondary-personalised-plans',
		title: 'Personalised Plans to Ensure Maximum Progress',
		description:
			'Each student is initially assessed to identify their individual strengths, learning style and areas for growth. Regular progress check-ins and measurable academic outcomes ensure students stay on track for success.',
		bulletPoints: [
			'Individual assessment',
			'Learning style identification',
			'Progress monitoring',
			'Measurable outcomes',
		],
		youtubeUrl: null,
		thumbnailImage: '/images/features/personalised-plans-maximum-progress.jpg',
		backgroundImage: '/images/features/personalised-plans-maximum-progress.jpg',
		isPaid: false,
	},
];
const secondarySchoolVideos2: readonly StandardizedVideoMasterclass[] = [
	{
		id: 'secondary-subjects-coverage',
		title: 'Subjects We Tutor',
		description:
			'Comprehensive subject coverage across all key academic areas including STEM subjects, humanities, languages, and creative disciplines. Our tutors are subject specialists with extensive examination experience.\n\nSTEM & Mathematical Subjects: Advanced mathematics and scientific disciplines taught by specialists with extensive examination board experience.\n\nHumanities & Social Sciences: Comprehensive humanities education covering literature, history, politics, and social sciences with expert guidance.\n\nLanguages: Modern and classical language tuition with native speakers and qualified language specialists.\n\nCreative & Arts-Based Subjects: Creative disciplines taught by practising professionals and experienced arts educators.\n\nAdditional Academic Support: Specialised academic skills and examination preparation beyond core curriculum subjects.',
		bulletPoints: [
			'Mathematics & Further Mathematics',
			'Biology',
			'Chemistry',
			'Physics',
		],
		youtubeUrl: null,
		thumbnailImage: '/images/features/subjects-we-tutor.jpg',
		backgroundImage: '/images/features/subjects-we-tutor.jpg',
		isPaid: false,
	},
];
export const standardizedPageContent: readonly StandardizedContent[] = [
	createHeadingTextSection(
		'primary-school-heading',
		'Primary School',
		"The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right. We understand that early education experiences are formative, so we prioritise curiosity, resilience, and a love of learning.",
		'',
		'',
		'white',
		'py-16',
	),
	createVideoGridSection(
		'primary-school-videos-1',
		primarySchoolVideos,
		'py-16',
	),
	createVideoGridSection(
		'primary-school-videos-2',
		primarySchoolIndividualVideos,
		'py-16',
	),
	createHeadingTextSection(
		'secondary-school-heading',
		'Secondary School',
		'One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners. Our support goes beyond the syllabus, equipping students with effective revision strategies, time management skills and structured study plans. 94% of students improve by at least two grades at GCSE.',
		'Tutoring Today for Success Tomorrow',
		'GCSEs, A-Levels and IB exams mark crucial academic transition points. As subjects become more complex, results in these qualifications play a defining role in shaping university pathways. A minimum requirement of 7s at GCSE is now standard at many top-tier universities. Personalised, one-to-one tuition can make a significant difference at both GCSE and A Level, helping students strengthen their academic record, ready to present a dynamite profile when it matters most.',
		'gray-50',
		'py-16',
	),
	createVideoGridSection(
		'secondary-school-videos-1',
		secondarySchoolVideos1,
		'py-16',
	),
	createVideoGridSection(
		'secondary-school-videos-2',
		secondarySchoolVideos2,
		'py-16',
	),
];
export function getStandardizedContentById(
	id: string,
): StandardizedContent | undefined {
	return standardizedPageContent.find((section) => section.id === id);
}
export function getAllHeadingSections(): StandardizedHeadingContent[] {
	return standardizedPageContent.filter(
		(section) => section.sectionType === 'heading-text',
	) as StandardizedHeadingContent[];
}
export function getAllVideoSections(): StandardizedVideoContent[] {
	return standardizedPageContent.filter(
		(section) => section.sectionType === 'video-grid',
	) as StandardizedVideoContent[];
}
