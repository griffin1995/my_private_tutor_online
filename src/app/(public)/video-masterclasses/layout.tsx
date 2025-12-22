import type { Metadata } from 'next';

export const metadata: Metadata = {
	title:
		'Video Masterclasses | Expert Educational Videos | My Private Tutor Online Premium Content',
	description:
		'Access premium video masterclasses from expert tutors. Educational videos covering 11+ preparation, GCSE, A-Level subjects, and entrance exam techniques from My Private Tutor Online with royal endorsements.',
	keywords: [
		'video masterclasses',
		'educational videos',
		'tutoring videos',
		'expert tuition videos',
		'11+ video preparation',
		'GCSE video tutorials',
		'A-level video lessons',
		'entrance exam videos',
		'premium educational content',
		'My Private Tutor Online videos',
		'Elizabeth Burrows videos',
		'royal endorsed video content',
		'expert tutoring masterclasses',
		'educational video library',
		'online tutoring videos',
	],
	openGraph: {
		title: 'Video Masterclasses | Expert Educational Videos',
		description:
			'Premium video masterclasses from expert tutors. Educational videos for 11+, GCSE, A-Level preparation and entrance exam techniques.',
		images: [
			{
				url: '/images/hero/video-masterclasses-hero.jpg',
				width: 800,
				height: 600,
				alt: 'Video Masterclasses - Expert Educational Videos and Premium Content',
				type: 'image/jpeg',
			},
		],
		type: 'website',
	},
	twitter: {
		title: 'Video Masterclasses | Expert Educational Videos',
		description:
			'Premium video masterclasses from expert tutors covering 11+, GCSE, A-Level subjects and entrance exam techniques.',
		images: ['/images/hero/video-masterclasses-hero.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/video-masterclasses',
	},
	category: 'Education',
	classification: 'Educational Video Content',
	other: {
		'content:type': 'Video masterclasses and educational content',
		'video:subjects': '11+, GCSE, A-Level, entrance exams',
		'instructor:quality': 'Expert tutors with royal endorsements',
		'content:level': 'Premium educational videos',
	},
};

export default function VideoMasterclassesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
