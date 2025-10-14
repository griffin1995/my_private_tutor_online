/**
 * CONTEXT7 SOURCE: /vercel/next.js - Server component layout for metadata export
 * SEO IMPLEMENTATION REASON: Official Next.js pattern for page-specific metadata in server components
 * CONTEXT7 SOURCE: /vercel/next.js - Layout component metadata inheritance
 * PREMIUM SERVICE: 11+ bootcamp specific SEO metadata for grammar school preparation visibility
 */

import type { Metadata } from 'next';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Page-specific metadata for specialized educational programs
 * SEO ENHANCEMENT REASON: 11+ bootcamp specific metadata for grammar school preparation discovery
 * PREMIUM SERVICE: Elite 11+ preparation programs with royal client service standards
 */
export const metadata: Metadata = {
	title:
		'11+ Bootcamps 2025 | Intensive Grammar School Preparation | Elite Tutoring',
	description:
		'Premium 11+ bootcamp preparation courses with expert tutors. 5-day intensive programs covering mathematics, English, verbal & non-verbal reasoning. Small group sizes, proven results for top grammar schools.',
	keywords: [
		'11+ bootcamps 2025',
		'11+ intensive preparation',
		'grammar school preparation',
		'11+ exam bootcamp',
		'eleven plus intensive course',
		'grammar school entry preparation',
		'11+ mathematics preparation',
		'verbal reasoning bootcamp',
		'non-verbal reasoning course',
		'11+ mock exams',
		'grammar school tuition',
		'elite 11+ preparation',
		'intensive 11+ tuition',
		'premium grammar school prep',
	],
	openGraph: {
		title: '11+ Bootcamps 2025 | Intensive Grammar School Preparation',
		description:
			'Premium 5-day intensive 11+ preparation bootcamps with expert tutors. Small groups, comprehensive curriculum, proven success at top grammar schools.',
		images: [
			{
				url: '/images/students/entrance-exam-preparation.png',
				width: 800,
				height: 600,
				alt: '11+ Bootcamp Preparation - Grammar School Entry',
				type: 'image/png',
			},
		],
		type: 'article',
	},
	twitter: {
		title: '11+ Bootcamps 2025 | Intensive Grammar School Preparation',
		description:
			'Premium intensive 11+ preparation courses. Expert tutors, small groups, comprehensive curriculum for grammar school success.',
		images: ['/images/students/entrance-exam-preparation.png'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/11-plus-bootcamps',
	},
	category: 'Education',
	classification: 'Examination Preparation',
};

export default function ElevenPlusBootcampsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
