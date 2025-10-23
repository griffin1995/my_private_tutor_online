import type { Metadata } from 'next';

export const metadata: Metadata = {
	title:
		'Contact My Private Tutor Online | Premium Tutoring Consultation | Expert Academic Support',
	description:
		'Contact Elizabeth Burrows and her expert team for premium tutoring services. Free consultation available. Phone +44 7513 550278, email help@myprivatetutoronline.com. Royal client service, immediate response.',
	keywords: [
		'contact premium tutor',
		'contact My Private Tutor Online',
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
	openGraph: {
		title: 'Contact My Private Tutor Online | Premium Tutoring Consultation',
		description:
			'Get in touch with Elizabeth Burrows for premium tutoring services. Free consultation, expert academic support, royal client service. Immediate response guaranteed.',
		images: [
			{
				url: '/images/contact/contact-hero.jpg',
				width: 800,
				height: 600,
				alt: 'Contact My Private Tutor Online - Premium Academic Support',
				type: 'image/jpeg',
			},
		],
		type: 'website',
	},
	twitter: {
		title: 'Contact My Private Tutor Online | Premium Tutoring Consultation',
		description:
			'Premium tutoring services contact. Free consultation with Elizabeth Burrows. Expert academic support, royal client service.',
		images: ['/images/contact/contact-hero.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/contact',
	},
	category: 'Education',
	classification: 'Educational Services Contact',
	other: {
		'contact:phone': '+44 7513 550278',
		'contact:email': 'help@myprivatetutoronline.com',
		'business:hours': 'Monday-Friday 9AM-6PM, Saturday 10AM-4PM',
		'response:time': '24 hours',
	},
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}