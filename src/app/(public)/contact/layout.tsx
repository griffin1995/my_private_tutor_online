import { createPageMetadata } from '@/lib/metadata/shared-metadata'

export const metadata = createPageMetadata({
	title: 'Contact | Premium Tutoring Consultation | Expert Academic Support',
	description:
		'Contact Elizabeth Burrows and her expert team for premium tutoring services. Free consultation available. Phone +44 7513 550278, email help@myprivatetutoronline.com. Royal client service, immediate response.',
	path: '/contact',
	keywords: [
		'contact premium tutor',
		'premium tutoring consultation',
		'Elizabeth Burrows contact',
		'expert tutor contact',
		'royal client tutoring',
		'premium academic support contact',
		'book tutoring consultation',
		'elite tutoring services contact',
		'Oxford Cambridge tutor contact',
		'11+ tutoring contact',
		'A-level tutor contact',
		'GCSE tutor contact',
		'international tutoring contact',
		'Tatler endorsed tutor contact',
	],
	image: '/images/contact/contact-hero.jpg',
})

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
