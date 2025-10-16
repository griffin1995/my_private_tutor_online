import type { Metadata } from 'next';
export const metadata: Metadata = {
	title:
		'About Elizabeth Burrows & Our Founder Story | Premium Tutoring Services',
	description:
		'Meet Elizabeth Burrows, founder of My Private Tutor Online. 15+ years experience, royal endorsements, Tatler recognition. Discover our unconventional approach to academic excellence and why elite families trust our tutoring services.',
	keywords: [
		'Elizabeth Burrows founder',
		'My Private Tutor Online founder',
		'premium tutoring founder',
		'royal endorsed tutor',
		'Tatler Address Book tutor',
		'Cambridge tutor background',
		'Forbes Middle East editor',
		'15 years tutoring experience',
		'elite tutoring services',
		'unconventional education approach',
		'Oxford Cambridge preparation expert',
		'international tutoring experience',
	],
	openGraph: {
		title: 'About Elizabeth Burrows & Our Founder Story | Premium Tutoring',
		description:
			'Discover the unconventional founder behind exceptional tutoring results. Elizabeth Burrows: 15+ years experience, royal endorsements, global perspective on academic excellence.',
		images: [
			{
				url: '/images/team/elizabeth-burrows-founder-main.jpg',
				width: 800,
				height: 600,
				alt: 'Elizabeth Burrows - Founder of My Private Tutor Online',
				type: 'image/jpeg',
			},
		],
		type: 'article',
		authors: ['Elizabeth Burrows'],
	},
	twitter: {
		title: 'About Elizabeth Burrows & Our Founder Story | Premium Tutoring',
		description:
			'Meet the unconventional founder behind exceptional tutoring results. 15+ years experience, royal endorsements, global academic excellence.',
		images: ['/images/team/elizabeth-burrows-founder-main.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/about',
	},
	authors: [
		{
			name: 'Elizabeth Burrows',
			url: 'https://myprivatetutoronline.com/about',
		},
	],
	category: 'Education',
	classification: 'Educational Leadership',
};
export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
