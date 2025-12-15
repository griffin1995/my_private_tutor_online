import type { Metadata } from 'next';
export const servicesMetadata: Metadata = {
	title: 'Premium Tutoring Services | My Private Tutor Online | Royal Endorsed',
	description:
		'Elite private tutoring services for Oxbridge preparation, 11+ exams, and GCSE/A-Level success. 94% success rate with royal endorsements. Book your consultation today.',
	metadataBase: new URL('https://myprivatetutoronline.com'),
	alternates: {
		canonical: '/services',
		languages: {
			'en-GB': '/services',
			'en-US': '/en-US/services',
		},
	},
	keywords: [
		'private tutoring services',
		'oxbridge preparation',
		'11 plus tutoring',
		'gcse tutoring',
		'a level tutoring',
		'royal endorsed tutors',
		'premium tutoring london',
		'elite education services',
		'tatler address book 2025',
		'british private tutoring',
	],
	authors: [
		{
			name: 'My Private Tutor Online',
		},
	],
	publisher: 'My Private Tutor Online Ltd',
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		title: 'Premium Tutoring Services | Royal Endorsed Education',
		description:
			'Experience elite private tutoring with a 94% success rate. Specialising in Oxbridge preparation, 11+ exams, and academic excellence.',
		url: 'https://myprivatetutoronline.com/services',
		siteName: 'My Private Tutor Online',
		type: 'website',
		locale: 'en_GB',
		images: [
			{
				url: 'https://myprivatetutoronline.com/images/services-og.jpg',
				width: 1200,
				height: 630,
				alt: 'My Private Tutor Online - Premium Tutoring Services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Premium Tutoring Services | My Private Tutor Online',
		description:
			'Elite private tutoring with royal endorsements. 94% success rate for Oxbridge, 11+, GCSE & A-Level.',
		site: '@MyPrivateTutor',
		creator: '@MyPrivateTutor',
		images: ['https://myprivatetutoronline.com/images/services-twitter.jpg'],
	},
	verification: {
		google: 'google-site-verification-code',
		yandex: 'yandex-verification-code',
	},
};
const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
};
export function generateStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'EducationalOrganization',
		name: 'My Private Tutor Online',
		description: 'Premium private tutoring services with royal endorsements',
		url: 'https://myprivatetutoronline.com',
		logo: 'https://myprivatetutoronline.com/logo.png',
		foundingDate: '2010',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'London',
			addressCountry: 'GB',
		},
		sameAs: [
			'https://www.facebook.com/myprivatetutoronline',
			'https://www.twitter.com/MyPrivateTutor',
			'https://www.linkedin.com/company/my-private-tutor-online',
			'https://www.instagram.com/myprivatetutoronline',
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Tutoring Services',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Oxbridge Preparation',
						description: 'Elite preparation for Oxford and Cambridge entrance',
						provider: {
							'@type': 'EducationalOrganization',
							name: 'My Private Tutor Online',
						},
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: '11+ Tutoring',
						description: 'Expert preparation for grammar school entrance exams',
						provider: {
							'@type': 'EducationalOrganization',
							name: 'My Private Tutor Online',
						},
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'GCSE Tutoring',
						description: 'Comprehensive GCSE subject tutoring for top grades',
						provider: {
							'@type': 'EducationalOrganization',
							name: 'My Private Tutor Online',
						},
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'A-Level Tutoring',
						description: 'Advanced A-Level tutoring for university preparation',
						provider: {
							'@type': 'EducationalOrganization',
							name: 'My Private Tutor Online',
						},
					},
				},
			],
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '287',
			bestRating: '5',
			worstRating: '1',
		},
		review: [
			{
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: '5',
					bestRating: '5',
				},
				author: {
					'@type': 'Person',
					name: 'Lady Catherine M.',
				},
				reviewBody:
					'Exceptional tutoring service that helped my son secure his place at Oxford. The tutors are truly world-class.',
			},
			{
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: '5',
					bestRating: '5',
				},
				author: {
					'@type': 'Person',
					name: 'Sir James H.',
				},
				reviewBody:
					'Outstanding 11+ preparation resulted in offers from multiple top grammar schools. Highly recommended.',
			},
		],
	};
}
export function generateFAQStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What subjects do you offer tutoring for?',
				acceptedAnswer: {
					'@type': 'Answer',
					text:
						'We offer comprehensive tutoring across all academic levels including Oxbridge preparation, 11+ entrance exams, GCSE subjects, and A-Level courses. Our expert tutors cover Mathematics, Sciences, English, Languages, and Humanities.',
				},
			},
			{
				'@type': 'Question',
				name: 'What is your success rate for Oxbridge applications?',
				acceptedAnswer: {
					'@type': 'Answer',
					text:
						'We maintain a 94% success rate for Oxbridge applications. Our specialised preparation includes interview coaching, entrance exam preparation, and personal statement guidance from tutors who are Oxford and Cambridge graduates.',
				},
			},
			{
				'@type': 'Question',
				name: 'Do you offer online tutoring services?',
				acceptedAnswer: {
					'@type': 'Answer',
					text:
						'Yes, we provide both in-person and online tutoring services. Our online platform offers the same premium quality education with interactive whiteboards, resource sharing, and recorded sessions for revision.',
				},
			},
			{
				'@type': 'Question',
				name: 'How are your tutors selected?',
				acceptedAnswer: {
					'@type': 'Answer',
					text:
						'All our tutors undergo rigorous selection including academic verification, DBS checks, and teaching assessments. We only accept tutors from top universities with proven track records in education and their specialist subjects.',
				},
			},
		],
	};
}
export function generateBreadcrumbStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://myprivatetutoronline.com',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Services',
				item: 'https://myprivatetutoronline.com/services',
			},
		],
	};
}
