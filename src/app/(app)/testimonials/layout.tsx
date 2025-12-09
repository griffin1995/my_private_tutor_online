import type { Metadata } from 'next';

export const metadata: Metadata = {
	title:
		'Student & Parent Testimonials | My Private Tutor Online Success Stories | Royal Client Reviews',
	description:
		'Read authentic testimonials from families who achieved exceptional results with My Private Tutor Online. Oxford, Cambridge, grammar school successes. Royal endorsements, 15 years proven track record.',
	keywords: [
		'tutoring testimonials',
		'student success stories',
		'parent reviews tutoring',
		'Oxford Cambridge success stories',
		'grammar school testimonials',
		'11+ success testimonials',
		'A-level tutoring reviews',
		'GCSE tutoring success',
		'royal client testimonials',
		'premium tutoring reviews',
		'Elizabeth Burrows testimonials',
		'My Private Tutor Online reviews',
		'elite tutoring success stories',
		'academic excellence testimonials',
		'Tatler endorsed tutor reviews',
	],
	openGraph: {
		title: 'Student & Parent Testimonials | My Private Tutor Online Success Stories',
		description:
			'Authentic success stories from families achieving exceptional results. Oxford, Cambridge, grammar school successes with 15 years proven expertise.',
		images: [
			{
				url: '/images/hero/testimonials-hero.jpg',
				width: 800,
				height: 600,
				alt: 'Student and Parent Testimonials - My Private Tutor Online Success Stories',
				type: 'image/jpeg',
			},
		],
		type: 'website',
	},
	twitter: {
		title: 'Student & Parent Testimonials | My Private Tutor Online Success Stories',
		description:
			'Real success stories from families achieving exceptional academic results. Oxford, Cambridge, grammar school successes.',
		images: ['/images/hero/testimonials-hero.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/testimonials',
	},
	category: 'Education',
	classification: 'Educational Testimonials',
	other: {
		'success:rate': '95%',
		'experience:years': '15+',
		'schools:placed': 'Oxford, Cambridge, Westminster, St Pauls, Eton',
		'client:type': 'Royal endorsed, Tatler featured',
	},
};

export default function TestimonialsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}