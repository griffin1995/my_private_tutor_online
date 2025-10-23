import type { Metadata } from 'next';

export const metadata: Metadata = {
	title:
		'Educational Insights Blog | Expert Tutoring Tips & Guidance | My Private Tutor Online',
	description:
		'Expert educational insights, tutoring tips, and academic guidance from My Private Tutor Online. Read articles on exam preparation, study techniques, and educational excellence for royal client standards.',
	keywords: [
		'education blog',
		'tutoring tips',
		'exam preparation articles',
		'educational insights',
		'study techniques',
		'academic guidance',
		'11+ preparation tips',
		'A-level tutoring advice',
		'GCSE study methods',
		'educational excellence',
		'My Private Tutor Online blog',
		'expert tutoring articles',
		'premium education insights',
		'royal client education',
		'Elizabeth Burrows insights',
	],
	openGraph: {
		title: 'Educational Insights Blog | Expert Tutoring Tips & Guidance',
		description:
			'Expert educational insights and tutoring tips from My Private Tutor Online. Academic guidance for exam preparation, study techniques, and educational excellence.',
		images: [
			{
				url: '/images/pexels-polina-tankilevitch-6929349.jpg',
				width: 800,
				height: 600,
				alt: 'Educational Insights Blog - Expert Tutoring Tips and Academic Guidance',
				type: 'image/jpeg',
			},
		],
		type: 'website',
	},
	twitter: {
		title: 'Educational Insights Blog | Expert Tutoring Tips & Guidance',
		description:
			'Expert educational insights and tutoring tips for exam preparation, study techniques, and academic excellence.',
		images: ['/images/pexels-polina-tankilevitch-6929349.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/blog',
	},
	category: 'Education',
	classification: 'Educational Content',
	other: {
		'content:type': 'Educational blog and insights',
		'audience:level': 'Parents, students, educators',
		'update:frequency': 'Weekly',
		'expertise:years': '15+',
	},
};

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}