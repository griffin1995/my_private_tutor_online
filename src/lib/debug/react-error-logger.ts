/**
 * CRITICAL: React error logging and diagnostic system
 * CONTEXT7 SOURCE: React documentation - Error Boundaries
 *
 * Comprehensive error tracking for React-specific issues including:
 * - Invalid children rendering ("Objects are not valid as a React child")
 * - Hook rule violations
 * - Prop type mismatches
 * - Component lifecycle errors
 */

export interface ReactErrorLog {
	error: Error;
	errorInfo: React.ErrorInfo;
	severity: 'critical' | 'section' | 'component' | 'warning';
	context: string;
	timestamp: string;
	componentStack?: string;
	url?: string;
	userAgent?: string;
}

export interface ReactDiagnostic {
	type: string;
	message: string;
	severity: 'error' | 'warning' | 'info';
	solution: string;
	codeExample?: string;
}

/**
 * Categorise React errors to provide actionable diagnostics
 */
function categoriseReactError(error: Error): ReactDiagnostic[] {
	const message = error.message;
	const diagnostics: ReactDiagnostic[] = [];

	// "Objects are not valid as a React child" error
	if (message.includes('Objects are not valid as a React child')) {
		diagnostics.push({
			type: 'INVALID_CHILDREN_OBJECT',
			message: 'Attempted to render a plain object as React child',
			severity: 'error',
			solution:
				'Ensure you are not trying to render objects directly. Convert to string, JSON.stringify, or extract properties.',
			codeExample: `
// WRONG
return <div>{myObject}</div>

// CORRECT - Extract properties
return <div>{myObject.name}</div>

// CORRECT - Use JSON.stringify for debugging
return <pre>{JSON.stringify(myObject, null, 2)}</pre>
			`,
		});
	}

	// Array/Promise errors
	if (message.includes('Promise') || message.includes('pending')) {
		diagnostics.push({
			type: 'INVALID_PROMISE_CHILD',
			message: 'Attempted to render a Promise as React child',
			severity: 'error',
			solution:
				'Use useEffect with useState to handle async data, or use React.lazy() for code splitting.',
			codeExample: `
// WRONG - Promises cannot be rendered
return <div>{fetchData()}</div>

// CORRECT - Use useEffect
const [data, setData] = useState(null);
useEffect(() => {
  fetchData().then(setData);
}, []);
return <div>{data}</div>
			`,
		});
	}

	// Hook rule violations
	if (
		message.includes('Invalid hook') ||
		message.includes('Rules of Hooks') ||
		message.includes('useContext outside Provider')
	) {
		diagnostics.push({
			type: 'HOOK_RULE_VIOLATION',
			message: 'Hook usage violates React Hook rules',
			severity: 'error',
			solution:
				'Ensure hooks are called at top level of component, not conditionally. Ensure component is wrapped in required providers.',
			codeExample: `
// WRONG - Hook called conditionally
function Component({ skip }) {
  if (skip) return null;
  const [value, setValue] = useState(0); // ❌ Violates hook rules
}

// CORRECT - Hook at top level
function Component({ skip }) {
  const [value, setValue] = useState(0);
  if (skip) return null;
}
			`,
		});
	}

	// Prop type errors
	if (message.includes('prop') || message.includes('PropTypes')) {
		diagnostics.push({
			type: 'PROP_TYPE_ERROR',
			message: 'Component received invalid prop type',
			severity: 'warning',
			solution: 'Check prop types match component requirements. Use TypeScript for compile-time safety.',
		});
	}

	// Fragment-related errors
	if (message.includes('Fragment') || message.includes('children')) {
		diagnostics.push({
			type: 'CHILDREN_VALIDATION_ERROR',
			message: 'Invalid children passed to component',
			severity: 'error',
			solution: 'Ensure component children are valid React elements, strings, numbers, or fragments.',
		});
	}

	// Hydration errors
	if (message.includes('hydrat') || message.includes('mismatch')) {
		diagnostics.push({
			type: 'HYDRATION_MISMATCH',
			message: 'Server and client HTML mismatch',
			severity: 'error',
			solution:
				'Ensure server and client render the same HTML. Wrap client-only components with useEffect or dynamic imports.',
		});
	}

	// Generic error if no specific match
	if (diagnostics.length === 0) {
		diagnostics.push({
			type: 'UNKNOWN_REACT_ERROR',
			message: error.message,
			severity: 'error',
			solution: 'Check the component stack trace and error message for more context.',
		});
	}

	return diagnostics;
}

/**
 * Log React error with full diagnostics
 */
export function logReactError(errorLog: ReactErrorLog): void {
	const diagnostics = categoriseReactError(errorLog.error);

	const logEntry = {
		timestamp: errorLog.timestamp,
		severity: errorLog.severity,
		context: errorLog.context,
		error: {
			message: errorLog.error.message,
			name: errorLog.error.name,
			stack: errorLog.error.stack,
		},
		errorInfo: {
			componentStack: errorLog.errorInfo.componentStack,
		},
		diagnostics,
		environment: {
			url: errorLog.url || typeof window !== 'undefined' ? window.location.href : 'unknown',
			userAgent:
				errorLog.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'),
			nodeEnv: process.env.NODE_ENV,
		},
	};

	// Log to console with formatting
	console.error(
		'%cReact Error Detected',
		'background: #d32f2f; color: white; padding: 8px 12px; font-weight: bold; border-radius: 4px;'
	);
	console.table({
		Type: errorLog.severity,
		Context: errorLog.context,
		Message: errorLog.error.message,
		Time: new Date(errorLog.timestamp).toLocaleTimeString(),
	});

	// Log diagnostics
	if (diagnostics.length > 0) {
		console.group('Diagnostic Recommendations');
		diagnostics.forEach((diag) => {
			console.log(`%c${diag.type}`, `color: ${diag.severity === 'error' ? 'red' : 'orange'};`);
			console.log(`Message: ${diag.message}`);
			console.log(`Solution: ${diag.solution}`);
			if (diag.codeExample) {
				console.log('Example:', diag.codeExample);
			}
		});
		console.groupEnd();
	}

	// Log full error info
	console.log('Component Stack:', errorLog.errorInfo.componentStack);

	// Store in local error log (in-memory)
	storeErrorLog(logEntry);

	// In production, send to error tracking service
	if (process.env.NODE_ENV === 'production') {
		sendToErrorTracking(logEntry);
	}
}

/**
 * In-memory error log storage for analysis
 * MAX 100 entries to prevent memory issues
 */
const errorLogs: Array<any> = [];
const MAX_ERROR_LOGS = 100;

function storeErrorLog(logEntry: any): void {
	errorLogs.push(logEntry);
	if (errorLogs.length > MAX_ERROR_LOGS) {
		errorLogs.shift();
	}
}

/**
 * Retrieve stored error logs
 */
export function getStoredErrorLogs(): Array<any> {
	return [...errorLogs];
}

/**
 * Send error to tracking service (Sentry, LogRocket, etc.)
 */
async function sendToErrorTracking(logEntry: any): Promise<void> {
	try {
		// Example: Send to Sentry if configured
		if (typeof window !== 'undefined' && (window as any).Sentry) {
			(window as any).Sentry.captureException(new Error(logEntry.error.message), {
				contexts: {
					react: {
						context: logEntry.context,
						severity: logEntry.severity,
						diagnostics: logEntry.diagnostics,
					},
				},
			});
		}
	} catch (err) {
		console.error('Failed to send error to tracking service:', err);
	}
}

/**
 * Validate JSX children at runtime
 * Used to catch invalid children before they cause render errors
 */
export function validateJSXChildren(children: any): boolean {
	if (children === null || children === undefined) return true;
	if (typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean')
		return true;
	if (React.isValidElement(children)) return true;
	if (Array.isArray(children)) {
		return children.every((child) => validateJSXChildren(child));
	}
	if (typeof children === 'object') {
		// Plain objects are NOT valid React children
		console.warn('Invalid JSX children: plain object detected', children);
		return false;
	}
	return true;
}

/**
 * Safe render wrapper for potentially problematic children
 */
export function safeRenderChildren(children: any): React.ReactNode {
	try {
		if (validateJSXChildren(children)) {
			return children;
		} else {
			console.warn('Children validation failed, attempting safe conversion');
			if (typeof children === 'object' && children !== null) {
				return JSON.stringify(children);
			}
			return null;
		}
	} catch (error) {
		console.error('Error during children rendering:', error);
		return null;
	}
}

// Import React for isValidElement check
import React from 'react';
