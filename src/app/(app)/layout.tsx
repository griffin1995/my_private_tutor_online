import { fontClassNames } from '@/fonts';
import { Toaster } from '@/components/ui/sonner';
import { CookieConsentManager } from '@/components/privacy/cookie-consent-manager';
import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL('https://www.myprivatetutoronline.com'),
	title: {
		default:
			'My Private Tutor Online | Premium Academic Tutoring | Oxbridge & 11+ Specialists',
		template: '%s | My Private Tutor Online',
	},
	description:
		'Specialist support from tutors, qualified teachers and official examiners. Featured in Tatler, recommended by School Guide UK, trusted by Royalty. Premium private tutoring with 15+ years experience specialising in Oxbridge preparation, 11+ entry, GCSE & A-levels.',
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
			url: 'https://www.myprivatetutoronline.com',
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
		url: 'https://www.myprivatetutoronline.com',
		siteName: 'My Private Tutor Online',
		title: 'My Private Tutor Online | Premium Academic Tutoring Services',
		description: 'As featured in Tatler and trusted by royalty',
		images: [
			{
				url: '/icons/logo-with-name.png',
				width: 1200,
				height: 630,
				alt: 'My Private Tutor Online - World-Class Education, At Your Fingertips',
				type: 'image/png',
			},
		],
	},
	alternates: {
		canonical: 'https://www.myprivatetutoronline.com',
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
			color: '#3f4a7e', // Primary brand navy from design tokens
		},
		{
			media: '(prefers-color-scheme: dark)',
			color: '#3f4a7e', // Primary brand navy from design tokens
		},
	],
};
// Next.js 15 optimization: Use selective dynamic rendering instead of force-dynamic
// Root layout should be static as it contains no request-specific data
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
					content='#3f4a7e'
				/>
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
					content='#3f4a7e'
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
				{children}
				<CookieConsentManager
					enableAnalytics={process.env.NODE_ENV === 'production'}
					{...(process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'] && {
						gaTrackingId: process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID']
					})}
				/>
				<Toaster />
			</body>
		</html>
	);
}
