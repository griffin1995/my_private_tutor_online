/**
 * ResourceCard Component
 * Individual resource card with download functionality and pricing display
 * Optimised for performance with React.memo and memoised handlers
 * Following 2024-2025 React + TypeScript best practices
 */

'use client';

import React, { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ResourceCardProps } from '@/types/exam-papers';

const ResourceCard: React.FC<ResourceCardProps> = React.memo(({ resource }) => {
	// Memoised download handler for performance
	const handleDownload = useCallback(() => {
		// TODO: Implement download functionality
		console.log('Download resource:', resource.title);
	}, [resource.title]);

	return (
		<div className='h-full'>
			<Card className='flex flex-col pt-0 h-full rounded-none bg-white relative'>
				{/* Free Badge - positioned in top-right corner */}
				{resource.isFree && (
					<Badge className='absolute top-3 right-3 z-10 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-none shadow-md'>
						Free
					</Badge>
				)}
				<div className='aspect-16/9 w-full flex-shrink-0 border-b'>
					<button
						type='button'
						onClick={handleDownload}
						className='block w-full h-full transition-opacity duration-200 hover:opacity-70'
						aria-label={`Download ${resource.title}`}>
						<img
							src='/images/exam-papers/pdf-document.svg'
							alt={resource.title}
							className='h-full w-full object-contain object-center rounded-none p-12'
						/>
					</button>
				</div>

				<CardHeader className='space-y-0 px-4 pt-4 pb-2 flex-shrink-0 h-[5rem]'>
					<h3 className='text-lg font-semibold leading-tight tracking-tight !text-slate-900 text-left md:text-xl'>
						<button
							type='button'
							onClick={handleDownload}
							className='!text-slate-900 no-underline hover:underline hover:!text-slate-700 text-left'
							aria-label={`Download ${resource.title}`}>
							{resource.title}
						</button>
					</h3>
				</CardHeader>

				<CardContent className='px-4 pb-2 h-[5rem] flex items-start'>
					<p className='!text-neutral-600 text-sm leading-relaxed text-left'>
						{resource.description}
					</p>
				</CardContent>

				<CardFooter className='flex items-center justify-between px-4 pb-3 pt-2 flex-shrink-0'>
					<button
						type='button'
						onClick={handleDownload}
						className='!text-slate-900 inline-flex items-center text-sm font-medium no-underline hover:underline hover:!text-slate-700'
						aria-label={`Download ${resource.title}`}>
						Download
						<ArrowRight className='ml-2 size-4' />
					</button>
					{resource.isFree ? (
						<span className='text-sm font-semibold text-slate-900'>Free</span>
					) : (
						<span className='text-sm font-medium text-slate-900'>
							£{resource.price.toFixed(2)}
						</span>
					)}
				</CardFooter>
			</Card>
		</div>
	);
});

ResourceCard.displayName = 'ResourceCard';

export default ResourceCard;