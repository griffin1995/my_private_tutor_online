import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider';
import { fontClassNames } from '@/fonts';
import { DevToolsProvider } from '@/providers/DevToolsProvider';
import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL('https://myprivatetutoronline.com'),
	title: {
		default:
			'My Private Tutor Online | Premium Academic Tutoring | Oxbridge & 11+ Specialists',
		template: '%s | My Private Tutor Online',
	},
	description:
		'Premium private tutoring services with 15+ years experience. Royal family endorsed, Tatler-listed tutors specialising in Oxbridge preparation, 11+ entry, GCSE & A-levels. Trusted by elite families across the UK.',
	keywords: [
		'private tutor',
		'Oxbridge preparation',
		'11+ tutoring',
		'GCSE tuition',
		'A-level tutoring',
		'Cambridge International',
		'premium tutoring',
		'elite tutoring',
		'royal family tutor',
		'Tatler tutor',
		'academic preparation',
		'entrance exam preparation',
		'grammar school preparation',
		'university entrance tutoring',
		'A* grade tutoring',
		'London private tutor',
		'elite family tutor',
		'homeschooling support',
		'academic mentoring',
		'exam preparation specialist',
	],
	authors: [
		{
			name: 'My Private Tutor Online',
			url: 'https://myprivatetutoronline.com',
		},
	],
	creator: 'My Private Tutor Online',
	publisher: 'My Private Tutor Online',
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
	verification: {
		google: 'google-site-verification-premium-tutor',
		yandex: 'yandex-verification-premium-tutor',
		yahoo: 'yahoo-site-verification-premium-tutor',
		other: {
			'msvalidate.01': 'bing-site-verification-premium-tutor',
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_GB',
		url: 'https://myprivatetutoronline.com',
		siteName: 'My Private Tutor Online',
		title: 'My Private Tutor Online | Premium Academic Tutoring Services',
		description:
			'Premium private tutoring with royal endorsements. 15+ years experience in Oxbridge prep, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book.',
		images: [
			{
				url: '/images/graphics/feature-royal-endorsement.jpg',
				width: 1200,
				height: 630,
				alt: 'My Private Tutor Online - Premium Academic Tutoring with Royal Endorsements',
				type: 'image/jpeg',
			},
			{
				url: '/images/logos/logo-with-name.png',
				width: 400,
				height: 100,
				alt: 'My Private Tutor Online Logo',
				type: 'image/png',
			},
			{
				url: '/images/hero/child_book_and_laptop.avif',
				width: 800,
				height: 600,
				alt: 'Premium Tutoring - Child Learning with Expert Support',
				type: 'image/avif',
			},
			{
				url: '/images/graphics/feature-built-on-trust.jpeg',
				width: 800,
				height: 600,
				alt: 'Trusted by Elite Families - 15+ Years of Premium Tutoring Excellence',
				type: 'image/jpeg',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'My Private Tutor Online | Premium Academic Tutoring',
		description:
			'Royal family endorsed private tutoring. Oxbridge preparation, 11+ entry, GCSE & A-levels. 15+ years experience.',
		images: [
			'/images/graphics/feature-royal-endorsement.jpg',
			'/images/hero/child_book_and_laptop.avif',
			'/images/graphics/feature-built-on-trust.jpeg',
		],
		creator: '@MyPrivateTutorUK',
		site: '@MyPrivateTutorUK',
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com',
	},
	category: 'Education',
	classification: 'Educational Services',
	referrer: 'origin-when-cross-origin',
	applicationName: 'My Private Tutor Online',
	generator: 'Next.js 15',
	formatDetection: {
		telephone: true,
		date: true,
		address: true,
		email: true,
		url: true,
	},
	appleWebApp: {
		capable: true,
		title: 'My Private Tutor',
		statusBarStyle: 'black-translucent',
	},
	manifest: '/manifest.json',
};
export const viewport = {
	colorScheme: 'light dark',
	themeColor: [
		{
			media: '(prefers-color-scheme: light)',
			color: '#0f172a',
		},
		{
			media: '(prefers-color-scheme: dark)',
			color: '#0f172a',
		},
	],
};
export const dynamic = 'force-dynamic';
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en-GB'
			dir='ltr'
			className='scroll-smooth'>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta
					name='theme-color'
					content='#0f172a'
				/>

				{}
				{}
				<link
					rel='icon'
					href='/favicon.ico'
					sizes='32x32'
				/>
				{}
				<link
					rel='icon'
					href='/icons/favicon-32x32.png'
					sizes='32x32'
					type='image/png'
				/>
				<link
					rel='icon'
					href='/icons/favicon-48x48.png'
					sizes='48x48'
					type='image/png'
				/>
				<link
					rel='icon'
					href='/icons/favicon-96x96.png'
					sizes='96x96'
					type='image/png'
				/>
				<link
					rel='icon'
					href='/icons/favicon-128x128.png'
					sizes='128x128'
					type='image/png'
				/>
				<link
					rel='icon'
					href='/icons/favicon-192x192.png'
					sizes='192x192'
					type='image/png'
				/>
				{}
				{}
				{}

				{}
				{}
				<link
					rel='apple-touch-icon'
					href='/icons/apple-touch-icon.png'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/apple-touch-icon-60x60.png'
					sizes='60x60'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/apple-touch-icon-76x76.png'
					sizes='76x76'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/apple-touch-icon-120x120.png'
					sizes='120x120'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/apple-touch-icon-152x152.png'
					sizes='152x152'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/apple-touch-icon-167x167.png'
					sizes='167x167'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/apple-touch-icon-180x180.png'
					sizes='180x180'
				/>

				{}
				{}
				<link
					rel='manifest'
					href='/manifest.json'
				/>
				<meta
					name='mobile-web-app-capable'
					content='yes'
				/>
				<meta
					name='apple-mobile-web-app-capable'
					content='yes'
				/>
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>
				<meta
					name='apple-mobile-web-app-title'
					content='My Private Tutor'
				/>
				<meta
					name='application-name'
					content='My Private Tutor'
				/>
				<meta
					name='msapplication-TileColor'
					content='#0f172a'
				/>
				<meta
					name='msapplication-config'
					content='/browserconfig.xml'
				/>

				<link
					rel='preconnect'
					href='https://fonts.googleapis.com'
				/>
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>


			</head>
			<body
				className={`${fontClassNames} font-body antialiased min-h-screen bg-transparent text-foreground`}>

				<LazyMotionProvider>
					<DevToolsProvider>{children}</DevToolsProvider>
				</LazyMotionProvider>

			</body>
		</html>
	);
}
