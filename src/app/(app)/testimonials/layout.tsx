import { createPageMetadata } from '@/lib/metadata/shared-metadata'

export const metadata = createPageMetadata({
	title: 'Student & Parent Testimonials | Success Stories | Royal Client Reviews',
	description:
		'Read authentic testimonials from families who achieved exceptional results with My Private Tutor Online. Oxford, Cambridge, grammar school successes. Royal endorsements, 15 years proven track record.',
	path: '/testimonials',
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
		'elite tutoring success stories',
		'academic excellence testimonials',
		'Tatler endorsed tutor reviews',
	],
	image: '/images/hero/testimonials-hero.jpg',
})

export default function TestimonialsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
