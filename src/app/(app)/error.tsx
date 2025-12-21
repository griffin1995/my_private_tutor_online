'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { errorTracker } from '@/lib/error-tracking';

export default function Error({
	error,
	reset,
}: {
	error: Error & {
		digest?: string;
	};
	reset: () => void;
}) {
	// Enhanced error logging with production-ready tracking
	useEffect(() => {
		// Log detailed error information for debugging
		console.error('🔴 ERROR BOUNDARY ACTIVATED:', {
			message: error.message,
			digest: error.digest,
			timestamp: new Date().toISOString()
		});

		// Additional error context for Next.js specific issues
		if (error.message.includes('force-dynamic') || error.message.includes('payload')) {
			console.error('🚨 SUSPECTED CAUSE: Next.js 15 + CMS compatibility issue');
			errorTracker.addBreadcrumb('Next.js CMS compatibility issue detected', 'error', {
				errorMessage: error.message,
				digest: error.digest
			});
		}

		// Send to error tracking service (handles development vs production automatically)
		errorTracker.captureException(error, {
			errorName: error.name,
			cause: (error as any).cause || 'Unknown'
		}).catch((trackingError) => {
			// Never let error tracking break the error boundary
			console.warn('Error tracking failed:', trackingError);
		});
	}, [error]);

	return (
		<div
			className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20'
			role="main"
			aria-labelledby="error-title"
			aria-describedby="error-description"
		>
			<div className='max-w-2xl mx-auto p-8 text-center'>
				<article className='bg-card rounded-2xl shadow-xl border border-border p-12'>
					{/* Error Icon */}
					<div className='flex justify-center mb-6'>
						<div className='p-4 rounded-full bg-destructive/10' role="img" aria-label="Error warning icon">
							<AlertTriangle
								className='h-12 w-12 text-destructive'
								aria-hidden="true"
							/>
						</div>
					</div>

					{/* Error Title */}
					<h1
						id="error-title"
						className='text-3xl font-bold text-foreground mb-4'
					>
						Something Went Wrong
					</h1>

					{/* Error Description */}
					<p
						id="error-description"
						className='text-lg text-muted-foreground mb-8 leading-relaxed'
					>
						We apologise for the inconvenience. Our premium tutoring service has
						encountered a technical issue and we're working to resolve it.
					</p>

					{/* Error Alert */}
					<Alert
						className='mb-8 text-left'
						role="alert"
						aria-live="polite"
					>
						<AlertTriangle className='h-4 w-4' aria-hidden="true" />
						<AlertDescription>
							If this error persists, please contact our support team with Error ID: {error.digest || 'N/A'}
						</AlertDescription>
					</Alert>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							onClick={reset}
							size="lg"
							className='inline-flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2'
							aria-label="Try again to reload the page"
						>
							<RefreshCcw className='h-4 w-4' aria-hidden="true" />
							Try Again
						</Button>

						<Button
							asChild
							variant="outline"
							size="lg"
							className='inline-flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2'
							aria-label="Return to homepage"
						>
							<Link href='/'>
								<Home className='h-4 w-4' aria-hidden="true" />
								Return Home
							</Link>
						</Button>
					</div>

					{/* Technical Details */}
					<footer className='mt-8 pt-6 border-t border-border'>
						<p className='text-sm text-muted-foreground'>
							<span className="sr-only">Technical information: </span>
							Error Reference: {error.digest || 'No ID available'}
						</p>
						{process.env.NODE_ENV === 'development' && (
							<details className='mt-4 text-left'>
								<summary
									className='text-sm text-muted-foreground cursor-pointer hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded px-2 py-1'
									aria-expanded="false"
								>
									Development Details
								</summary>
								<pre
									className='mt-2 text-xs bg-muted p-4 rounded-md overflow-x-auto text-muted-foreground'
									role="log"
									aria-label="Error message details"
								>
									{error.message}
								</pre>
							</details>
						)}
					</footer>
				</article>
			</div>
		</div>
	);
}