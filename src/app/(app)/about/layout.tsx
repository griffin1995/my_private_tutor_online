import { createPageMetadata } from '@/lib/metadata/shared-metadata'

export const metadata = createPageMetadata({
	title: 'About Elizabeth Burrows & Our Founder Story',
	description:
		'Meet Elizabeth Burrows, founder of My Private Tutor Online. 15+ years experience, royal endorsements, Tatler recognition. Discover our unconventional approach to academic excellence and why elite families trust our tutoring services.',
	path: '/about',
	keywords: [
		'Elizabeth Burrows founder',
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
	type: 'article',
	image: '/images/team/elizabeth-burrows-founder-main.jpg',
	authors: ['Elizabeth Burrows'],
})
export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
