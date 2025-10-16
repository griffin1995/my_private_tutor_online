'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HighlightedQuote } from '@/components/ui/highlighted-quote';
interface BrandMessageSectionProps {
	quote: string;
	author?: string;
	role?: string;
	backgroundColor?: string;
	className?: string;
	button?: string;
	authorImage?: string;
	authorImageAlt?: string;
	showAuthorImage?: boolean;
	useHighlighting?: boolean;
}
export function BrandMessageSection({
	quote,
	author,
	role,
	backgroundColor = 'bg-primary-50',
	className = '',
	button,
	authorImage,
	authorImageAlt,
	showAuthorImage = false,
	useHighlighting = true,
}: BrandMessageSectionProps) {
	const defaultSpacing = 'py-16 lg:py-24';
	const spacingClasses =
		(
			className.includes('pt-') ||
			className.includes('pb-') ||
			className.includes('py-')
		) ?
			''
		:	defaultSpacing;
	return (
		<div className={`${spacingClasses} ${backgroundColor} ${className}`}>
			{}
			{}
			<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12'>
				{showAuthorImage && authorImage ?
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div className='order-2 lg:order-1'>
							<Image
								src={authorImage}
								alt={authorImageAlt || `${author || 'Author'} portrait`}
								width={400}
								height={500}
								className='rounded-2xl shadow-xl mx-auto'
								loading='lazy'
								quality={85}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
							/>
						</div>
						<div className='order-1 lg:order-2'>
							{}
							<HighlightedQuote
								quote={quote}
								author={author}
								role={role}
								useHighlighting={useHighlighting}
							/>
						</div>
					</div>
				:	<div className='text-center'>
						{}
						<HighlightedQuote
							quote={quote}
							author={author}
							role={role}
							useHighlighting={useHighlighting}
						/>
					</div>
				}

				{}
				{button && (
					<div className='mt-8'>
						<Link
							href='/testimonials'
							className='inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-accent-600 border border-transparent rounded-md shadow-sm hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors duration-200'>
							{button}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
export default BrandMessageSection;
