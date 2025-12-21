'use client';

import type { Metadata } from 'next';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Home, BookOpen, Mail, ArrowLeft, ExternalLink } from 'lucide-react';

// shadcn/ui components
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Metadata for SEO optimization
export const metadata: Metadata = {
	title: 'Page Not Found - My Private Tutor Online',
	description: 'The page you are looking for could not be found. Explore our premium tutoring services or search for the content you need.',
	openGraph: {
		title: 'Page Not Found - My Private Tutor Online',
		description: 'This page does not exist. Discover our royal-endorsed tutoring services.',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'Page Not Found - My Private Tutor Online',
		description: 'This page does not exist. Discover our premium tutoring services.',
	},
	robots: {
		index: false,
		follow: false,
	},
};

export default function NotFound() {
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
	const searchInputRef = useRef<HTMLInputElement>(null);
	const mainHeadingRef = useRef<HTMLHeadingElement>(null);

	// Focus management for accessibility (WCAG 2.1)
	useEffect(() => {
		// Focus the main heading for screen reader announcement
		if (mainHeadingRef.current) {
			mainHeadingRef.current.focus();
		}
	}, []);

	// Keyboard shortcuts for search functionality
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Focus search input when "/" is pressed
			if (event.key === '/' && searchInputRef.current) {
				event.preventDefault();
				searchInputRef.current.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			// Navigate to search results or homepage with query parameter
			router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	const suggestedPages = [
		{ href: '/subject-tuition', label: 'Browse Subjects', icon: BookOpen },
		{ href: '/about', label: 'About Our Service', icon: ExternalLink },
		{ href: '/contact', label: 'Contact Support', icon: Mail },
	];

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 px-4'>
			<div className='max-w-2xl mx-auto w-full'>
				{/* Main Error Alert */}
				<Alert className='mb-8 border-primary-200 bg-primary-50/50'>
					<AlertDescription className='text-center'>
						<span className='text-8xl font-bold text-primary-300 block mb-4' aria-hidden='true'>
							404
						</span>
					</AlertDescription>
				</Alert>

				{/* Main Content Card */}
				<Card className='border-primary-200 shadow-xl bg-white/95 backdrop-blur-sm'>
					<CardHeader className='text-center pb-6'>
						<CardTitle
							ref={mainHeadingRef}
							className='text-3xl font-bold text-primary-700 mb-4'
							tabIndex={-1}
							role='heading'
							aria-level={1}
						>
							Page Not Found
						</CardTitle>
						<CardDescription className='text-lg leading-relaxed text-neutral-700'>
							We apologise, but the page you are looking for could not be found. Our
							premium tutoring service continues to be available through our main
							navigation or the search below.
						</CardDescription>
					</CardHeader>

					<CardContent className='space-y-8'>
						{/* Search Functionality */}
						<div className='space-y-4'>
							<form onSubmit={handleSearch} className='relative'>
								<div className='relative'>
									<Search
										className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500'
										aria-hidden='true'
									/>
									<Input
										ref={searchInputRef}
										type='search'
										placeholder='Search our site...'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='pl-10 pr-20 h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-200'
										aria-label='Search our website'
									/>
									<div className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 pointer-events-none'>
										<kbd className='px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-neutral-600'>
											/
										</kbd>
									</div>
								</div>
								<Button
									type='submit'
									className='w-full mt-3 bg-primary-700 hover:bg-primary-800 text-white h-12'
								>
									<Search className='h-4 w-4 mr-2' aria-hidden='true' />
									Search Our Site
								</Button>
							</form>

							<p className='text-sm text-neutral-500 text-center'>
								Press{' '}
								<kbd className='px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-neutral-600'>
									/
								</kbd>{' '}
								to quickly focus the search bar
							</p>
						</div>

						{/* Navigation Options */}
						<div className='space-y-4'>
							<h2 className='text-xl font-semibold text-primary-700 text-center mb-6'>
								Explore Our Services
							</h2>

							<div className='grid gap-3'>
								{/* Primary Action - Home */}
								<Button
									asChild
									size='lg'
									className='w-full bg-primary-700 hover:bg-primary-800 text-white h-14'
								>
									<Link href='/' className='flex items-center justify-center gap-3'>
										<Home className='h-5 w-5' aria-hidden='true' />
										Return to Homepage
									</Link>
								</Button>

								{/* Secondary Actions */}
								<div className='grid sm:grid-cols-2 gap-3'>
									{suggestedPages.map(({ href, label, icon: Icon }) => (
										<Button
											key={href}
											asChild
											variant='outline'
											size='lg'
											className='h-12 border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300'
										>
											<Link href={href} className='flex items-center justify-center gap-2'>
												<Icon className='h-4 w-4' aria-hidden='true' />
												{label}
											</Link>
										</Button>
									))}
								</div>
							</div>

							{/* Go Back Button */}
							<div className='pt-4 border-t border-primary-100'>
								<Button
									variant='ghost'
									size='lg'
									onClick={() => router.back()}
									className='w-full text-neutral-600 hover:text-primary-700 hover:bg-primary-50 h-12'
								>
									<ArrowLeft className='h-4 w-4 mr-2' aria-hidden='true' />
									Go Back to Previous Page
								</Button>
							</div>
						</div>

						{/* Support Information */}
						<div className='pt-6 border-t border-primary-100 text-center'>
							<p className='text-sm text-neutral-500 mb-2'>
								If you believe this is an error, please{' '}
								<Link
									href='/contact'
									className='text-accent-600 hover:text-accent-700 font-medium underline-offset-2 hover:underline'
								>
									contact our support team
								</Link>
								.
							</p>
							<p className='text-xs text-neutral-400'>
								Error Code: 404 • Page Not Found
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Additional Help */}
				<div className='mt-6 text-center'>
					<p className='text-sm text-neutral-600'>
						Need immediate assistance?{' '}
						<Link
							href='/contact'
							className='text-accent-600 hover:text-accent-700 font-medium underline-offset-2 hover:underline'
						>
							Get in touch with our team
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}