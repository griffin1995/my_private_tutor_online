import { fontClassNames } from '@/fonts';
import { Toaster } from '@/components/ui/sonner';
import { CookieConsentManager } from '@/components/privacy/cookie-consent-manager';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';

// Next.js 15 Metadata API - Enhanced SEO Configuration
export const metadata: Metadata = {
	metadataBase: new URL('https://www.myprivatetutoronline.com'),
	title: {
		default: 'My Private Tutor Online | Premium Academic Tutoring | Oxbridge & 11+ Specialists',
		template: '%s | My Private Tutor Online',
	},
	description: 'Specialist support from tutors, qualified teachers and official examiners. Featured in Tatler, recommended by School Guide UK, trusted by Royalty. Premium private tutoring with 15+ years experience specialising in Oxbridge preparation, 11+ entry, GCSE & A-levels.',
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
	// Modern favicon approach - Next.js 15 handles icon files automatically
	icons: [
		{
			rel: 'icon',
			url: '/icons/favicon-32x32.png',
			sizes: '32x32',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/icons/favicon-192x192.png',
			sizes: '192x192',
			type: 'image/png',
		},
		{
			rel: 'apple-touch-icon',
			url: '/icons/apple-touch-icon.png',
			sizes: '180x180',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/icons/favicon-512x512.png',
			sizes: '512x512',
			type: 'image/png',
		},
	],
};

// PWA Viewport Configuration - Responsive Theme Colors (2025 Best Practice)
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	colorScheme: 'light',
	themeColor: [
		{
			media: '(prefers-color-scheme: light)',
			color: 'var(--color-primary-base)', // Design token instead of hardcoded
		},
		{
			media: '(prefers-color-scheme: dark)',
			color: 'var(--color-primary-base)', // Design token instead of hardcoded
		},
	],
};

// Next.js 15 optimized root layout with minimal head management
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en-GB"
			dir="ltr"
			className={`${fontClassNames} scroll-smooth`}
		>
			<body className="font-body antialiased min-h-screen bg-white text-foreground">
				{children}
				<CookieConsentManager
					enableAnalytics={process.env.NODE_ENV === 'production'}
					{...(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && {
						gaTrackingId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
					})}
				/>
				<Toaster />
			</body>
		</html>
	);
}