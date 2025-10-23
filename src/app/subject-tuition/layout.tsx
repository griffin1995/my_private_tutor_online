import type { Metadata } from 'next';

export const metadata: Metadata = {
	title:
		'Subject Tuition | Expert Academic Support | My Private Tutor Online Premium Tutoring',
	description:
		'Comprehensive subject tuition across all academic levels. Expert tutoring in Mathematics, English, Sciences, and all subjects for GCSE, A-Level, IB, and entrance exams with royal endorsements.',
	keywords: [
		'subject tuition',
		'academic tutoring',
		'mathematics tuition',
		'english tutoring',
		'science tuition',
		'GCSE tutoring',
		'A-level tuition',
		'IB subject support',
		'entrance exam tutoring',
		'premium subject tuition',
		'My Private Tutor Online subjects',
		'expert academic support',
		'royal endorsed tutoring',
		'comprehensive subject coverage',
		'elite subject specialists',
	],
	openGraph: {
		title: 'Subject Tuition | Expert Academic Support',
		description:
			'Comprehensive subject tuition across all academic levels. Expert tutoring in all subjects for GCSE, A-Level, IB, and entrance exams.',
		images: [
			{
				url: '/images/hero/subject-tuition-hero.jpg',
				width: 800,
				height: 600,
				alt: 'Subject Tuition - Expert Academic Support Across All Subjects',
				type: 'image/jpeg',
			},
		],
		type: 'website',
	},
	twitter: {
		title: 'Subject Tuition | Expert Academic Support',
		description:
			'Comprehensive subject tuition and expert tutoring across all academic levels and subjects.',
		images: ['/images/hero/subject-tuition-hero.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/subject-tuition',
	},
	category: 'Education',
	classification: 'Subject Tutoring Services',
	other: {
		'subjects:coverage': 'All academic subjects',
		'levels:supported': 'Primary, GCSE, A-Level, IB, Entrance',
		'approach:type': 'Personalised one-to-one tuition',
		'quality:standard': 'Royal client premium',
	},
};

export default function SubjectTuitionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}