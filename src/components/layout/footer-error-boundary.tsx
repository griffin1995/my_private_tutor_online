'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface FooterErrorBoundaryProps {
	children: ReactNode;
	fallbackComponent?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	enableRecovery?: boolean;
	showDetails?: boolean;
}
interface FooterErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
	retryCount: number;
}
export class FooterErrorBoundary extends Component<
	FooterErrorBoundaryProps,
	FooterErrorBoundaryState
> {
	private maxRetries = 3;
	constructor(props: FooterErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
			retryCount: 0,
		};
	}
	static getDerivedStateFromError(
		error: Error,
	): Partial<FooterErrorBoundaryState> {
		return {
			hasError: true,
			error,
		};
	}
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error,
			errorInfo,
		});
		this.reportError(error, errorInfo);
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}
		console.error('Footer Error Boundary caught an error:', error);
		console.error('Error Info:', errorInfo);
	}
	handleRetry = () => {
		if (this.state.retryCount < this.maxRetries) {
			this.setState((prevState) => ({
				hasError: false,
				error: null,
				errorInfo: null,
				retryCount: prevState.retryCount + 1,
			}));
		}
	};
	resetErrorBoundary = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
			retryCount: 0,
		});
	};
	render() {
		if (this.state.hasError) {
			if (this.props.fallbackComponent) {
				return this.props.fallbackComponent;
			}
			return this.renderErrorFallback();
		}
		return this.props.children;
	}
	private renderErrorFallback(): ReactNode {
		const { error, retryCount } = this.state;
		const canRetry =
			this.props.enableRecovery !== false && retryCount < this.maxRetries;
		return (
			<footer
				className='bg-red-50 border border-red-200 text-red-800 py-8'
				role='contentinfo'
				aria-label='Footer error state'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<div className='flex flex-col items-center space-y-4'>
						<AlertCircle className='w-12 h-12 text-red-500' />

						<div>
							<h3 className='text-lg font-semibold text-red-900 mb-2'>
								Footer Loading Error
							</h3>
							<p className='text-red-700 mb-4'>
								We're experiencing technical difficulties with the page footer. The main
								content is still available above.
							</p>
						</div>

						{}
						{}
						{canRetry && (
							<Button
								onClick={this.handleRetry}
								variant='outline'
								className='flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-100'>
								<RefreshCw className='w-4 h-4' />
								Try Again ({this.maxRetries - retryCount} attempts remaining)
							</Button>
						)}

						{}
						{}
						{this.props.showDetails &&
							process.env.NODE_ENV === 'development' &&
							error && (
								<details className='mt-6 text-left max-w-2xl'>
									<summary className='cursor-pointer text-sm font-medium text-red-900 mb-2'>
										Error Details (Development Only)
									</summary>
									<pre className='bg-red-100 p-4 rounded text-xs text-red-800 overflow-auto'>
										<strong>Error:</strong> {error.message}
										{'\n\n'}
										<strong>Stack:</strong> {error.stack}
										{this.state.errorInfo && (
											<>
												{'\n\n'}
												<strong>Component Stack:</strong>{' '}
												{this.state.errorInfo.componentStack}
											</>
										)}
									</pre>
								</details>
							)}

						{}
						<div className='mt-8 pt-6 border-t border-red-200 text-sm text-red-600'>
							<p>
								<strong>My Private Tutor Online</strong> • Premium tutoring service
							</p>
							<p className='mt-1'>
								For immediate assistance, please call{' '}
								<a
									href='tel:+442038549479'
									className='underline font-medium'>
									+44 (0) 203 854 9479
								</a>
							</p>
						</div>
					</div>
				</div>
			</footer>
		);
	}
	private reportError(error: Error, errorInfo: ErrorInfo): void {
		const errorReport = {
			timestamp: new Date().toISOString(),
			component: 'footer',
			error: {
				name: error.name,
				message: error.message,
				stack: error.stack,
			},
			errorInfo: {
				componentStack: errorInfo.componentStack,
			},
			userAgent:
				typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
			url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
			retryCount: this.state.retryCount,
		};
		console.warn('Footer Error Boundary - Error reported:', errorReport);
		if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
			fetch('/api/errors/report', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(errorReport),
			}).catch((reportingError) => {
				console.error('Failed to report error:', reportingError);
			});
		}
	}
}
export function withFooterErrorBoundary<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	errorBoundaryProps?: Partial<FooterErrorBoundaryProps>,
) {
	const ComponentWithErrorBoundary = (props: P) => {
		return (
			<FooterErrorBoundary {...errorBoundaryProps}>
				<WrappedComponent {...props} />
			</FooterErrorBoundary>
		);
	};
	ComponentWithErrorBoundary.displayName = `withFooterErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
	return ComponentWithErrorBoundary;
}
export function useFooterErrorHandler() {
	const [errorBoundaryRef, setErrorBoundaryRef] =
		React.useState<FooterErrorBoundary | null>(null);
	const resetErrors = React.useCallback(() => {
		if (errorBoundaryRef) {
			errorBoundaryRef.resetErrorBoundary();
		}
	}, [errorBoundaryRef]);
	const reportError = React.useCallback((error: Error, context?: string) => {
		console.error(`Footer Error${context ? ` in ${context}` : ''}:`, error);
		if (process.env.NODE_ENV === 'production') {
			const errorReport = {
				timestamp: new Date().toISOString(),
				component: 'footer',
				context: context || 'unknown',
				error: {
					name: error.name,
					message: error.message,
					stack: error.stack,
				},
			};
			console.warn('Manual error report:', errorReport);
		}
	}, []);
	return {
		resetErrors,
		reportError,
		setErrorBoundaryRef,
	};
}
export default FooterErrorBoundary;
