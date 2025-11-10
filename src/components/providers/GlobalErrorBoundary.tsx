'use client';

import React, { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { logReactError } from '@/lib/debug/react-error-logger';

/**
 * CRITICAL: Global error boundary for production-grade error handling
 * CONTEXT7 SOURCE: react-error-boundary official documentation
 *
 * This component prevents entire application crashes when React errors occur.
 * Ensures graceful error handling and user-friendly error messages.
 */

interface ErrorBoundaryConfig {
	fallbackComponent?: React.ComponentType<FallbackProps>;
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
	resetKeys?: Array<string | number>;
	isolate?: boolean;
}

/**
 * Default fallback component for error display
 * Shows user-friendly error message without technical jargon
 */
function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div
			role="alert"
			className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50 p-6"
		>
			<div className="max-w-md w-full">
				<div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500">
					<h2 className="text-2xl font-bold text-primary-900 mb-3">
						Something Went Wrong
					</h2>
					<p className="text-neutral-grey-700 mb-6 leading-relaxed">
						We have encountered an unexpected error. Our team has been notified. Please
						try refreshing the page or returning to the home page.
					</p>

					{process.env.NODE_ENV === 'development' && (
						<details className="mb-6 p-3 bg-red-50 rounded border border-red-200">
							<summary className="cursor-pointer font-semibold text-red-900 mb-2">
								Debug Information (Development Only)
							</summary>
							<pre className="text-xs text-red-800 overflow-auto max-h-48 bg-white p-2 rounded border border-red-100">
								{error.message}
								{'\n\n'}
								{error.stack}
							</pre>
						</details>
					)}

					<div className="flex gap-3">
						<button
							onClick={resetErrorBoundary}
							className="flex-1 px-4 py-2 bg-primary-700 text-white rounded font-medium hover:bg-primary-800 transition-colors"
						>
							Try Again
						</button>
						<button
							onClick={() => (window.location.href = '/')}
							className="flex-1 px-4 py-2 bg-neutral-200 text-primary-900 rounded font-medium hover:bg-neutral-300 transition-colors"
						>
							Home
						</button>
					</div>
				</div>

				<div className="mt-8 text-center text-sm text-neutral-grey-600">
					<p>Error ID: {error.message.substring(0, 16)}</p>
					<p className="mt-2">Need help? Contact support@myprivatetutoronline.co.uk</p>
				</div>
			</div>
		</div>
	);
}

/**
 * Global Error Boundary - catches all uncaught React errors
 * Provides graceful error handling and logging
 */
export function GlobalErrorBoundary({ children }: { children: ReactNode }) {
	const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
		// Log to error tracking system
		logReactError({
			error,
			errorInfo,
			severity: 'critical',
			context: 'global_error_boundary',
			timestamp: new Date().toISOString(),
		});

		// Additional error reporting could happen here
		// e.g., Sentry, LogRocket, etc.
	};

	return (
		<ErrorBoundary
			FallbackComponent={DefaultErrorFallback}
			onError={handleError}
			onReset={() => {
				// Clear any application state if needed
				console.log('Error boundary reset triggered');
			}}
		>
			{children}
		</ErrorBoundary>
	);
}

/**
 * Section-level error boundary for isolated component trees
 * Prevents errors in one section from crashing the entire page
 */
export function SectionErrorBoundary({
	children,
	sectionName,
	fallback,
}: {
	children: ReactNode;
	sectionName: string;
	fallback?: ReactNode;
}) {
	const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
		logReactError({
			error,
			errorInfo,
			severity: 'section',
			context: `section_${sectionName}`,
			timestamp: new Date().toISOString(),
		});
	};

	return (
		<ErrorBoundary
			FallbackComponent={({ error, resetErrorBoundary }) =>
				fallback || (
					<div className="w-full p-6 bg-amber-50 border border-amber-200 rounded-lg">
						<h3 className="font-semibold text-amber-900 mb-2">
							{sectionName} Section Unavailable
						</h3>
						<p className="text-sm text-amber-800 mb-4">
							This section encountered an error and could not load. Please try refreshing
							the page.
						</p>
						<button
							onClick={resetErrorBoundary}
							className="px-4 py-2 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 transition-colors"
						>
							Retry
						</button>
					</div>
				)
			}
			onError={handleError}
		>
			{children}
		</ErrorBoundary>
	);
}

/**
 * Component-level error boundary for granular error isolation
 * Used for individual high-risk components
 */
export function ComponentErrorBoundary({
	children,
	componentName,
	onError,
}: {
	children: ReactNode;
	componentName: string;
	onError?: (error: Error) => void;
}) {
	return (
		<ErrorBoundary
			FallbackComponent={({ error, resetErrorBoundary }) => (
				<div className="p-4 bg-red-50 border border-red-200 rounded">
					<p className="text-sm text-red-800">
						{componentName} failed to render. <button
							onClick={resetErrorBoundary}
							className="underline font-semibold hover:no-underline"
						>
							Try again
						</button>
					</p>
				</div>
			)}
			onError={(error: Error, errorInfo: React.ErrorInfo) => {
				logReactError({
					error,
					errorInfo,
					severity: 'component',
					context: `component_${componentName}`,
					timestamp: new Date().toISOString(),
				});
				onError?.(error);
			}}
		>
			{children}
		</ErrorBoundary>
	);
}
