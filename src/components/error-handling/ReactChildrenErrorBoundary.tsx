'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	componentName?: string;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary specifically designed to catch and debug React children rendering errors
 *
 * This component catches errors like "Objects are not valid as a React child" and provides
 * detailed logging to help identify the exact source of the problem.
 */
export class ReactChildrenErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
		errorInfo: null,
	};

	public static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const { onError, componentName } = this.props;

		// Enhanced logging for React children errors
		const isChildrenError = error.message.includes('Objects are not valid as a React child') ||
			error.message.includes('$$typeof') ||
			error.message.includes('_owner');

		if (isChildrenError) {
			console.group('🚨 React Children Error Detected');
			console.error('Component:', componentName || 'Unknown');
			console.error('Error:', error);
			console.error('Error Info:', errorInfo);
			console.error('Stack:', errorInfo.componentStack);

			// Try to extract more details about the problematic object
			if (error.message.includes('$$typeof')) {
				console.warn('💡 This error typically occurs when:');
				console.warn('1. A React element object is rendered directly as {element} instead of <Component />');
				console.warn('2. An object is passed where a string/number is expected');
				console.warn('3. Animation objects from Framer Motion are rendered directly');
				console.warn('4. Context values are rendered without proper property access');
			}

			console.groupEnd();
		} else {
			console.error('Error caught by ReactChildrenErrorBoundary:', error, errorInfo);
		}

		// Update state with error info for debugging
		this.setState({
			error,
			errorInfo,
		});

		// Call custom error handler if provided
		if (onError) {
			onError(error, errorInfo);
		}
	}

	public render() {
		if (this.state.hasError) {
			const { fallback, componentName } = this.props;
			const { error } = this.state;

			// Custom fallback UI
			if (fallback) {
				return fallback;
			}

			// Development error display
			if (process.env.NODE_ENV === 'development') {
				return (
					<div style={{
						padding: '20px',
						margin: '20px',
						border: '2px solid #ff6b6b',
						borderRadius: '8px',
						backgroundColor: '#ffe0e0',
						color: '#d63031',
						fontFamily: 'monospace',
					}}>
						<h3>🚨 React Children Error</h3>
						<p><strong>Component:</strong> {componentName || 'Unknown'}</p>
						<p><strong>Error:</strong> {error?.message}</p>
						<details>
							<summary>Error Details</summary>
							<pre style={{ fontSize: '12px', overflow: 'auto' }}>
								{this.state.errorInfo?.componentStack}
							</pre>
						</details>
						<p><em>Check console for detailed debugging information</em></p>
					</div>
				);
			}

			// Production fallback
			return (
				<div style={{
					padding: '20px',
					textAlign: 'center',
					color: '#666',
				}}>
					<p>Something went wrong. Please refresh the page.</p>
				</div>
			);
		}

		return this.props.children;
	}
}

/**
 * Higher-order component to wrap any component with React children error boundary
 */
export function withReactChildrenErrorBoundary<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	componentName?: string
) {
	const WithErrorBoundary = (props: P) => (
		<ReactChildrenErrorBoundary componentName={componentName || WrappedComponent.displayName || WrappedComponent.name}>
			<WrappedComponent {...props} />
		</ReactChildrenErrorBoundary>
	);

	WithErrorBoundary.displayName = `withReactChildrenErrorBoundary(${componentName || WrappedComponent.displayName || WrappedComponent.name})`;

	return WithErrorBoundary;
}

/**
 * Development helper to validate children props
 */
export function validateChildren(children: ReactNode, componentName: string): ReactNode {
	if (process.env.NODE_ENV !== 'development') {
		return children;
	}

	if (children === null || children === undefined) {
		return children;
	}

	// Check if children is an object that might cause rendering issues
	if (typeof children === 'object' && children !== null) {
		// Check for React element properties that might indicate direct object rendering
		const obj = children as any;

		if (obj.$$typeof || obj._owner || obj.type || (obj.props && obj.key !== undefined)) {
			console.warn(`⚠️ Potential React children issue in ${componentName}:`);
			console.warn('Detected object with React element properties:', obj);
			console.warn('This might cause "Objects are not valid as a React child" error');
			console.trace('Component stack trace:');
		}

		// Check for plain objects that aren't React elements
		if (obj.constructor === Object && !obj.$$typeof) {
			console.warn(`⚠️ Plain object detected as children in ${componentName}:`, obj);
			console.warn('Consider using {JSON.stringify(obj)} or accessing specific properties');
		}
	}

	return children;
}