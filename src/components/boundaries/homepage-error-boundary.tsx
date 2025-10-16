'use client';

import React, { Component, ReactNode } from 'react';
interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: React.ErrorInfo | null;
	errorId: string | null;
}
interface HomepageErrorBoundaryProps {
	children: ReactNode;
	sectionName: string;
	fallbackComponent?: ReactNode;
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
export class HomepageErrorBoundary extends Component<
	HomepageErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: HomepageErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
			errorId: null,
		};
	}
	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		const errorId = `homepage-error-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
		const timestamp = new Date().toISOString();
		console.error('🚨 [ERROR-BOUNDARY] ===== COMPONENT ERROR DETECTED =====');
		console.error(`🆔 [ERROR-ID] ${errorId}`);
		console.error(`⏰ [ERROR-TIME] ${timestamp}`);
		console.error('📊 [ERROR-DETAILS] Error object analysis:', {
			name: error.name,
			message: error.message,
			stack: error.stack,
			constructor: error.constructor.name,
			isReactError: error.stack?.includes('React') || false,
			isContextError: error.message?.includes('context') || false,
			isHookError:
				error.message?.includes('hook') || error.message?.includes('Hook') || false,
		});
		if (error.stack?.includes('React')) {
			console.error('⚛️ [ERROR-REACT] React-specific error detected:', {
				reactFrameworkError: true,
				possibleCauses: [
					'Component lifecycle violations',
					'Invalid hook usage',
					'State update after unmount',
					'Render function side effects',
				],
			});
		}
		if (
			error.message?.includes('context') ||
			error.message?.toLowerCase().includes('provider')
		) {
			console.error('🔗 [ERROR-CONTEXT] React Context error detected:', {
				contextError: true,
				errorMessage: error.message,
				possibleCauses: [
					'useContext called outside Provider',
					'Context value is null/undefined',
					'Provider not properly wrapped',
					'Multiple context instances',
				],
				debuggingSteps: [
					'Check if component is wrapped in correct Provider',
					'Verify Provider value is not null',
					'Ensure single React instance',
					'Check for circular dependencies',
				],
			});
		}
		if (error.message?.includes('hook') || error.message?.includes('Hook')) {
			console.error('🪝 [ERROR-HOOKS] React Hooks error detected:', {
				hooksError: true,
				errorMessage: error.message,
				possibleCauses: [
					'Hooks called conditionally',
					'Hooks called in non-component function',
					'Hooks called after early return',
					'Custom hook violating rules',
				],
				debuggingSteps: [
					'Check hooks are called at top level',
					'Verify hooks are in React function component',
					'Check for conditional hook calls',
					'Review custom hook implementation',
				],
			});
		}
		if (typeof window !== 'undefined' && (window as any).performance?.memory) {
			const memory = (window as any).performance.memory;
			console.error('💾 [ERROR-MEMORY] Memory state at error:', {
				usedJSHeapSize: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
				totalJSHeapSize: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
				jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
				memoryPressure: memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8,
			});
		}
		return {
			hasError: true,
			error,
			errorId,
		};
	}
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		const timestamp = Date.now();
		console.error('🔍 [ERROR-ANALYSIS] ===== COMPONENT ERROR ANALYSIS =====');
		console.error(`📍 [ERROR-SECTION] Section: ${this.props.sectionName}`);
		console.error(`🆔 [ERROR-ID] ${this.state.errorId}`);
		console.error('📊 [ERROR-DETAILS] Comprehensive error information:', {
			section: this.props.sectionName,
			errorName: error.name,
			errorMessage: error.message,
			errorId: this.state.errorId,
			timestamp: new Date(timestamp).toISOString(),
			userAgent:
				typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
			url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
			viewport:
				typeof window !== 'undefined' ?
					`${window.innerWidth}x${window.innerHeight}`
				:	'Unknown',
		});
		if (errorInfo.componentStack) {
			const stackLines = errorInfo.componentStack
				.split('\n')
				.filter((line) => line.trim());
			console.error('🏗️ [ERROR-STACK] Component stack analysis:', {
				totalComponents: stackLines.length,
				topLevelComponent: stackLines[0]?.trim() || 'Unknown',
				stackDepth: stackLines.length,
				hasNextJsComponents: stackLines.some((line) => line.includes('Next')),
				hasCustomComponents: stackLines.some(
					(line) => !line.includes('div') && !line.includes('section'),
				),
			});
			console.error('📋 [ERROR-STACK] Full component stack:');
			stackLines.forEach((line, index) => {
				const indent = '  '.repeat(index);
				console.error(`${indent}${index + 1}. ${line.trim()}`);
			});
		}
		if (error.stack) {
			const jsStackLines = error.stack
				.split('\n')
				.filter((line) => line.trim() && !line.includes('node_modules'))
				.slice(0, 10);
			console.error('🔧 [ERROR-JS-STACK] JavaScript error stack (filtered):', {
				relevantFrames: jsStackLines.length,
				hasSourceFiles: jsStackLines.some(
					(line) => line.includes('.tsx') || line.includes('.ts'),
				),
				hasReactFiles: jsStackLines.some((line) => line.includes('react')),
			});
			jsStackLines.forEach((line, index) => {
				console.error(`  ${index + 1}. ${line.trim()}`);
			});
		}
		const errorKey = `${this.props.sectionName}-${error.name}`;
		if (typeof window !== 'undefined') {
			if (!window.__errorBoundaryStats) {
				window.__errorBoundaryStats = {};
			}
			if (!window.__errorBoundaryStats[errorKey]) {
				window.__errorBoundaryStats[errorKey] = {
					count: 0,
					firstOccurrence: timestamp,
					lastOccurrence: timestamp,
					errorDetails: [],
				};
			}
			window.__errorBoundaryStats[errorKey].count++;
			window.__errorBoundaryStats[errorKey].lastOccurrence = timestamp;
			window.__errorBoundaryStats[errorKey].errorDetails.push({
				timestamp,
				message: error.message,
				stack: error.stack?.substring(0, 500),
			});
			console.error('📈 [ERROR-FREQUENCY] Error occurrence tracking:', {
				errorType: errorKey,
				totalOccurrences: window.__errorBoundaryStats[errorKey].count,
				firstSeen: new Date(
					window.__errorBoundaryStats[errorKey].firstOccurrence,
				).toISOString(),
				timeSinceFirst: `${(timestamp - window.__errorBoundaryStats[errorKey].firstOccurrence) / 1000}s`,
				isRecurring: window.__errorBoundaryStats[errorKey].count > 1,
			});
			if (window.__errorBoundaryStats[errorKey].count > 3) {
				console.error('🚨 [ERROR-RECURRING] RECURRING ERROR DETECTED!', {
					errorType: errorKey,
					occurrences: window.__errorBoundaryStats[errorKey].count,
					section: this.props.sectionName,
					recommendation:
						'This error is happening repeatedly. Check for infinite re-render loops or unstable component state.',
				});
			}
		}
		if (typeof window !== 'undefined' && window.performance) {
			const now = performance.now();
			console.error('⚡ [ERROR-PERFORMANCE] Performance impact analysis:', {
				errorTimestamp: now,
				navigationStart: window.performance.timing?.navigationStart || 0,
				timeSincePageLoad: `${now - (window.performance.timing?.navigationStart || 0)}ms`,
				possiblePerformanceImpact:
					now > 5000 ?
						'High - Error occurred after significant time'
					:	'Low - Early error',
			});
		}
		this.setState({
			errorInfo,
		});
		if (this.props.onError) {
			try {
				this.props.onError(error, errorInfo);
				console.log(
					'✅ [ERROR-HANDLER] Custom error handler executed successfully',
				);
			} catch (handlerError) {
				console.error(
					'❌ [ERROR-HANDLER] Custom error handler failed:',
					handlerError,
				);
			}
		}
		this.reportError(error, errorInfo);
	}
	private reportError = (error: Error, errorInfo: React.ErrorInfo) => {
		const timestamp = new Date().toISOString();
		const errorReport = {
			section: this.props.sectionName,
			errorId: this.state.errorId,
			message: error.message,
			name: error.name,
			stack: error.stack,
			componentStack: errorInfo.componentStack,
			timestamp,
			environment: {
				userAgent:
					typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
				url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
				referrer: typeof window !== 'undefined' ? document.referrer : 'Unknown',
				viewport:
					typeof window !== 'undefined' ?
						`${window.innerWidth}x${window.innerHeight}`
					:	'Unknown',
				colorDepth: typeof window !== 'undefined' ? screen.colorDepth : 'Unknown',
				pixelRatio:
					typeof window !== 'undefined' ? window.devicePixelRatio : 'Unknown',
				language: typeof window !== 'undefined' ? navigator.language : 'Unknown',
				platform: typeof window !== 'undefined' ? navigator.platform : 'Unknown',
				onLine: typeof window !== 'undefined' ? navigator.onLine : 'Unknown',
			},
			react: {
				version: React.version,
				isReactError: error.stack?.includes('React') || false,
				isContextError: error.message?.includes('context') || false,
				isHookError:
					error.message?.includes('hook') ||
					error.message?.includes('Hook') ||
					false,
				componentStackDepth:
					errorInfo.componentStack?.split('\n').filter((line) => line.trim())
						.length || 0,
			},
			performance: {
				memory:
					typeof window !== 'undefined' && (window as any).performance?.memory ?
						{
							usedJSHeapSize: `${((window as any).performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
							totalJSHeapSize: `${((window as any).performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
							jsHeapSizeLimit: `${((window as any).performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
						}
					:	'Memory API not available',
				timing:
					typeof window !== 'undefined' && window.performance?.timing ?
						{
							domContentLoaded:
								window.performance.timing.domContentLoadedEventEnd -
								window.performance.timing.navigationStart,
							loadComplete:
								window.performance.timing.loadEventEnd -
								window.performance.timing.navigationStart,
						}
					:	'Performance timing not available',
			},
			frequency:
				typeof window !== 'undefined' && window.__errorBoundaryStats ?
					{
						totalErrorTypes: Object.keys(window.__errorBoundaryStats).length,
						currentErrorOccurrences:
							window.__errorBoundaryStats[`${this.props.sectionName}-${error.name}`]
								?.count || 1,
					}
				:	'Frequency tracking not available',
			debugging: {
				recommendations: this.generateDebuggingRecommendations(error, errorInfo),
				priority: this.assessErrorPriority(error, errorInfo),
				category: this.categorizeError(error, errorInfo),
			},
		};
		console.warn('📋 [ERROR-REPORT] ===== COMPREHENSIVE ERROR REPORT =====');
		console.warn('📊 [ERROR-REPORT] Full error report:', errorReport);
		console.warn('🔧 [ERROR-DEBUGGING] Recommended debugging steps:');
		errorReport.debugging.recommendations.forEach((recommendation, index) => {
			console.warn(`  ${index + 1}. ${recommendation}`);
		});
		console.warn(
			`🚨 [ERROR-PRIORITY] Error priority: ${errorReport.debugging.priority}`,
		);
		console.warn(
			`📂 [ERROR-CATEGORY] Error category: ${errorReport.debugging.category}`,
		);
		if (process.env.NODE_ENV === 'production') {
			console.log(
				'📤 [ERROR-REPORT] Ready for error monitoring service transmission',
			);
		}
	};
	private generateDebuggingRecommendations = (
		error: Error,
		errorInfo: React.ErrorInfo,
	): string[] => {
		const recommendations: string[] = [];
		if (error.stack?.includes('React')) {
			recommendations.push('Check React component lifecycle and state management');
			recommendations.push('Verify proper hook usage and dependency arrays');
		}
		if (
			error.message?.includes('context') ||
			error.message?.toLowerCase().includes('provider')
		) {
			recommendations.push(
				'Verify React Context Provider is properly wrapping the component tree',
			);
			recommendations.push(
				'Check if useContext is called within the correct Provider scope',
			);
			recommendations.push('Ensure Context value is not null or undefined');
		}
		if (error.message?.includes('hook') || error.message?.includes('Hook')) {
			recommendations.push(
				'Review React Hooks rules - ensure hooks are called at top level only',
			);
			recommendations.push(
				'Check for conditional hook calls or hooks called after early returns',
			);
			recommendations.push('Verify custom hooks follow React Hooks conventions');
		}
		recommendations.push(
			`Review ${this.props.sectionName} component implementation`,
		);
		recommendations.push('Check for recent code changes in this section');
		recommendations.push('Verify all required props are being passed correctly');
		recommendations.push('Review browser console for additional error details');
		recommendations.push('Test in different browsers and devices');
		recommendations.push('Check network requests and API responses');
		return recommendations;
	};
	private assessErrorPriority = (
		error: Error,
		errorInfo: React.ErrorInfo,
	): string => {
		if (
			error.message?.includes('context') ||
			error.message?.includes('Cannot read property')
		) {
			return 'HIGH - Core functionality impacted';
		}
		if (
			this.props.sectionName.toLowerCase().includes('hero') ||
			this.props.sectionName.toLowerCase().includes('payment') ||
			this.props.sectionName.toLowerCase().includes('form')
		) {
			return 'HIGH - Critical section affected';
		}
		if (errorInfo.componentStack?.split('\n').length > 10) {
			return 'MEDIUM - Deep component stack affected';
		}
		return 'MEDIUM - Standard error handling required';
	};
	private categorizeError = (
		error: Error,
		errorInfo: React.ErrorInfo,
	): string => {
		if (error.message?.includes('context')) return 'React Context Error';
		if (error.message?.includes('hook') || error.message?.includes('Hook'))
			return 'React Hooks Error';
		if (error.message?.includes('Cannot read property'))
			return 'JavaScript Reference Error';
		if (error.message?.includes('fetch') || error.message?.includes('network'))
			return 'Network/API Error';
		if (error.message?.includes('render')) return 'React Render Error';
		if (error.stack?.includes('React')) return 'React Framework Error';
		return 'General JavaScript Error';
	};
	private handleRetry = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
			errorId: null,
		});
	};
	render() {
		if (this.state.hasError) {
			if (this.props.fallbackComponent) {
				return this.props.fallbackComponent;
			}
			return this.renderDefaultFallback();
		}
		return this.props.children;
	}
	private renderDefaultFallback = () => {
		return (
			<div className='py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white border-l-4 border-amber-500'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					{}
					<div className='flex justify-center mb-6'>
						<div className='bg-amber-100 rounded-full p-3'>
							<svg
								className='w-8 h-8 text-amber-600'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z' />
							</svg>
						</div>
					</div>

					{}
					<h2 className='text-2xl lg:text-3xl font-serif font-bold text-slate-800 mb-4'>
						Section Temporarily Unavailable
					</h2>

					{}
					<p className='text-lg text-slate-600 mb-6 max-w-2xl mx-auto'>
						The {this.props.sectionName} section is experiencing a temporary issue.
						Our team has been notified and is working to resolve this quickly.
					</p>

					{}
					<button
						onClick={this.handleRetry}
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200'>
						<svg
							className='w-5 h-5 mr-2'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
						</svg>
						Try Again
					</button>

					{}
					<div className='mt-8 text-sm text-slate-500'>
						<p>
							If this issue persists, please contact our support team at{' '}
							<a
								href='mailto:support@myprivatetutoronline.co.uk'
								className='text-primary-600 hover:text-primary-700 underline'>
								support@myprivatetutoronline.co.uk
							</a>
						</p>
						<p className='mt-1'>Error ID: {this.state.errorId}</p>
					</div>
				</div>
			</div>
		);
	};
}
export const withErrorBoundary = <P extends object>(
	Component: React.ComponentType<P>,
	sectionName: string,
	fallbackComponent?: ReactNode,
) => {
	const WrappedComponent = (props: P) => (
		<HomepageErrorBoundary
			sectionName={sectionName}
			fallbackComponent={fallbackComponent}>
			<Component {...props} />
		</HomepageErrorBoundary>
	);
	WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
	return WrappedComponent;
};
export const ErrorBoundaryWrapper: React.FC<{
	children: ReactNode;
	sectionName: string;
	fallbackComponent?: ReactNode;
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}> = ({ children, sectionName, fallbackComponent, onError }) => {
	return (
		<HomepageErrorBoundary
			sectionName={sectionName}
			fallbackComponent={fallbackComponent}
			onError={onError}>
			{children}
		</HomepageErrorBoundary>
	);
};
