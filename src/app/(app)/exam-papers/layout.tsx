import type { Metadata } from 'next';

export const metadata: Metadata = {
	title:
		'Premium Educational Resources | Past Papers & Study Materials | My Private Tutor Online',
	description:
		'Download premium educational resources, past papers, and expert-curated study materials. GCSE, A-Level, IB, and entrance exam preparation resources from My Private Tutor Online with royal endorsements.',
	keywords: [
		'educational resources',
		'past papers download',
		'study materials',
		'GCSE past papers',
		'A-level resources',
		'IB study materials',
		'11+ entrance exam papers',
		'13+ past papers',
		'premium study guides',
		'examination preparation',
		'royal endorsed resources',
		'My Private Tutor Online resources',
		'expert curated materials',
		'Cambridge iGCSE papers',
		'Edexcel past papers',
	],
	openGraph: {
		title: 'Premium Educational Resources | Past Papers & Study Materials',
		description:
			'Download premium educational resources and past papers. GCSE, A-Level, IB, and entrance exam preparation materials from royal endorsed tutoring service.',
		images: [
			{
				url: '/images/hero/education-resources-hero.jpg',
				width: 800,
				height: 600,
				alt: 'Premium Educational Resources - Past Papers and Study Materials',
				type: 'image/jpeg',
			},
		],
		type: 'website',
	},
	twitter: {
		title: 'Premium Educational Resources | Past Papers & Study Materials',
		description:
			'Premium educational resources and past papers for GCSE, A-Level, IB, and entrance exam preparation.',
		images: ['/images/hero/education-resources-hero.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/exam-papers',
	},
	category: 'Education',
	classification: 'Educational Resources',
	other: {
		'resource:types': 'Past papers, study guides, practice tests',
		'exam:levels': 'GCSE, A-Level, IB, 11+, 13+, 16+',
		'resource:count': '250+',
		'quality:standard': 'Royal client approved',
	},
};

export default function ResourcesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
