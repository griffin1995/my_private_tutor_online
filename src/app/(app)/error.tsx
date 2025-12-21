'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & {
		digest?: string;
	};
	reset: () => void;
}) {
	// CRITICAL: Add comprehensive error logging for production debugging
	useEffect(() => {
		const errorDetails = {
			message: error.message,
			stack: error.stack,
			digest: error.digest,
			timestamp: new Date().toISOString(),
			userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
			url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
			errorName: error.name,
			cause: error.cause
		};

		// Log detailed error information for debugging
		console.error('🔴 HOMEPAGE ERROR - Production Debug Info:', errorDetails);

		// Additional error context for Next.js specific issues
		if (error.message.includes('force-dynamic') || error.message.includes('payload')) {
			console.error('🚨 SUSPECTED CAUSE: Next.js 15 + Payload CMS compatibility issue');

		// Send to error tracking service in production
		if (process.env.NODE_ENV === 'production') {
			// Future: Add Sentry, LogRocket, or other error tracking
			// errorTracker.captureException(error, { extra: errorDetails });
	}, [error]);
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100'>
			<div className='max-w-2xl mx-auto p-8 text-center'>
				<div className='bg-white rounded-2xl shadow-xl border border-slate-200 p-12'>
					<div className='flex justify-center mb-6'>
						<div className='text-6xl font-bold text-red-500'>⚠️</div>
					</div>

					<h1 className='text-3xl font-bold text-slate-900 mb-4'>
						Something Went Wrong
					</h1>

					<p className='text-lg text-slate-600 mb-8 leading-relaxed'>
						We apologise for the inconvenience. Our premium tutoring service has
						encountered a technical issue.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<button
							onClick={reset}
							className='inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'>
							Try Again
						</button>

						<Link
							href='/'
							className='inline-flex items-center justify-center px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition-colors'>
							Return Home
						</Link>
					</div>

					<div className='mt-8 pt-6 border-t border-slate-200'>
						<p className='text-sm text-slate-500'>
							Error ID: {error.digest || 'Unknown'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
