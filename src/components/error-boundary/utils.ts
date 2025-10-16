import type {
	ErrorReport,
	ErrorSeverity,
	ErrorCategory,
	BusinessImpact,
	ClientType,
	NetworkError,
	ValidationError,
	PermissionError,
	FAQErrorContext,
} from './types';
export function createErrorReport(
	error: Error,
	errorInfo: {
		componentStack?: string;
	},
	component: string = 'Unknown',
	context?: FAQErrorContext,
): ErrorReport {
	const errorId = generateErrorId();
	const severity = getErrorSeverity(error);
	const category = getErrorCategory(error);
	const businessImpact = getBusinessImpact(error, context);
	return {
		errorId,
		timestamp: new Date().toISOString(),
		level: 'error',
		component,
		message: error.message || 'Unknown error occurred',
		stack: error.stack,
		componentStack: errorInfo.componentStack,
		userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Server',
		url: typeof window !== 'undefined' ? window.location.href : 'Server',
		sessionId: getSessionId(),
		buildVersion: getBuildVersion(),
		environment: getEnvironment(),
		severity,
		category,
		businessImpact,
		context: context ? sanitiseErrorContext(context) : undefined,
		clientType: getClientType(),
		userId: getUserId(),
	};
}
export function getErrorSeverity(error: Error): ErrorSeverity {
	if (
		error.message.includes('ChunkLoadError') ||
		error.message.includes('Loading chunk') ||
		error.message.includes('Authentication') ||
		error.message.includes('Network request failed') ||
		error.name === 'ChunkLoadError'
	) {
		return 'critical';
	}
	if (
		error.message.includes('Search failed') ||
		error.message.includes('Data fetch failed') ||
		error.message.includes('API error') ||
		error.name === 'NetworkError' ||
		error.name === 'TimeoutError'
	) {
		return 'high';
	}
	if (
		error.message.includes('Feature unavailable') ||
		error.message.includes('Component error') ||
		error.message.includes('Validation failed') ||
		error.name === 'ValidationError'
	) {
		return 'medium';
	}
	return 'low';
}
export function getErrorCategory(error: Error): ErrorCategory {
	const message = error.message.toLowerCase();
	const name = error.name.toLowerCase();
	if (
		message.includes('network') ||
		message.includes('fetch') ||
		message.includes('api') ||
		message.includes('request') ||
		name.includes('network') ||
		(error as NetworkError).isNetworkError
	) {
		return 'network';
	}
	if (
		message.includes('auth') ||
		message.includes('permission') ||
		message.includes('forbidden') ||
		message.includes('unauthorized') ||
		name.includes('permission')
	) {
		return 'authentication';
	}
	if (
		message.includes('search') ||
		message.includes('query') ||
		message.includes('filter') ||
		message.includes('voice search') ||
		message.includes('visual search')
	) {
		return 'search';
	}
	if (
		message.includes('render') ||
		message.includes('component') ||
		message.includes('jsx') ||
		message.includes('react')
	) {
		return 'ui';
	}
	if (
		message.includes('validation') ||
		message.includes('invalid') ||
		message.includes('parse') ||
		message.includes('format') ||
		name.includes('validation')
	) {
		return 'validation';
	}
	if (
		message.includes('timeout') ||
		message.includes('timed out') ||
		(error as NetworkError).isTimeout
	) {
		return 'timeout';
	}
	return 'unknown';
}
export function getBusinessImpact(
	error: Error,
	context?: FAQErrorContext,
): BusinessImpact {
	const severity = getErrorSeverity(error);
	const category = getErrorCategory(error);
	const clientType = context?.userType || getClientType();
	if (
		clientType === 'royal' &&
		(severity === 'critical' || severity === 'high')
	) {
		return 'revenue_critical';
	}
	if (
		(category === 'search' && severity === 'critical') ||
		(category === 'authentication' && severity === 'high') ||
		(category === 'network' && severity === 'critical')
	) {
		return 'high';
	}
	if (
		severity === 'high' ||
		(severity === 'medium' && (category === 'search' || category === 'ui'))
	) {
		return 'medium';
	}
	if (severity === 'medium' || severity === 'low') {
		return 'low';
	}
	return 'none';
}
export function isRetryableError(error: Error): boolean {
	const networkError = error as NetworkError;
	const category = getErrorCategory(error);
	if (category === 'network' && networkError.status) {
		return networkError.status >= 500 || networkError.status === 429;
	}
	if (category === 'timeout' || networkError.isTimeout) {
		return true;
	}
	if (category === 'ui' || category === 'component') {
		return true;
	}
	if (
		category === 'authentication' ||
		category === 'validation' ||
		category === 'permission'
	) {
		return false;
	}
	if (
		networkError.status &&
		networkError.status >= 400 &&
		networkError.status < 500 &&
		networkError.status !== 429
	) {
		return false;
	}
	return true;
}
export function formatErrorMessage(
	error: Error,
	showDetails: boolean = false,
): string {
	const category = getErrorCategory(error);
	const severity = getErrorSeverity(error);
	const friendlyMessages: Record<ErrorCategory, string> = {
		network:
			"We're having trouble connecting to our servers. Please check your internet connection and try again.",
		authentication:
			"There's an issue with your authentication. Please try logging in again.",
		search:
			'The search feature is temporarily unavailable. Please try again in a moment.',
		ui: 'A display issue occurred. The page will refresh automatically.',
		api: "Our service is temporarily unavailable. We're working to resolve this quickly.",
		data: "There's an issue loading your data. Please refresh and try again.",
		validation: "Please check the information you've entered and try again.",
		permission: "You don't have permission to access this feature.",
		timeout: 'The request is taking longer than expected. Please try again.',
		unknown: 'An unexpected error occurred. Please try again.',
	};
	let message = friendlyMessages[category] || friendlyMessages.unknown;
	if (severity === 'critical') {
		message +=
			' If this problem persists, please contact our support team immediately.';
	} else if (severity === 'high') {
		message += ' If you continue experiencing issues, please contact support.';
	}
	if (showDetails && (getEnvironment() === 'development' || showDetails)) {
		message += `\n\nTechnical details: ${error.message}`;
	}
	return message;
}
export function shouldShowErrorDetails(error: Error): boolean {
	const environment = getEnvironment();
	if (environment === 'development') {
		return true;
	}
	if (environment === 'staging' && getErrorSeverity(error) === 'critical') {
		return true;
	}
	return false;
}
export function sanitiseErrorContext(
	context: FAQErrorContext,
): FAQErrorContext {
	const sanitised = {
		...context,
	};
	if (sanitised.searchQuery && sanitised.searchQuery.length > 100) {
		sanitised.searchQuery = sanitised.searchQuery.substring(0, 100) + '...';
	}
	delete (sanitised as any).userId;
	delete (sanitised as any).sessionId;
	delete (sanitised as any).personalInfo;
	return sanitised;
}
function generateErrorId(): string {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(2, 15);
	return `error_${timestamp}_${random}`;
}
function getSessionId(): string {
	if (typeof window !== 'undefined' && window.sessionStorage) {
		let sessionId = sessionStorage.getItem('error-session-id');
		if (!sessionId) {
			sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
			sessionStorage.setItem('error-session-id', sessionId);
		}
		return sessionId;
	}
	return 'server_session';
}
function getBuildVersion(): string {
	return process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0';
}
function getEnvironment(): 'development' | 'staging' | 'production' {
	return (process.env.NODE_ENV as any) || 'development';
}
function getClientType(): ClientType {
	if (typeof window !== 'undefined') {
		const userType = localStorage.getItem('clientType');
		if (userType === 'royal' || userType === 'standard') {
			return userType as ClientType;
		}
	}
	return 'visitor';
}
function getUserId(): string | undefined {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('userId') || undefined;
	}
	return undefined;
}
export function calculateRetryDelay(
	attemptNumber: number,
	baseDelay: number = 1000,
	maxDelay: number = 30000,
	multiplier: number = 2,
): number {
	const delay = Math.min(
		baseDelay * Math.pow(multiplier, attemptNumber - 1),
		maxDelay,
	);
	const jitter = Math.random() * 0.1 * delay;
	return Math.floor(delay + jitter);
}
export function logError(error: Error, context?: any): void {
	const environment = getEnvironment();
	if (environment === 'development') {
		console.group('🚨 Error Boundary Caught Error');
		console.error('Error:', error);
		console.error('Stack:', error.stack);
		if (context) {
			console.error('Context:', context);
		}
		console.groupEnd();
	} else {
		console.error('Error occurred:', {
			message: error.message,
			name: error.name,
			timestamp: new Date().toISOString(),
			context: context ? sanitiseErrorContext(context) : undefined,
		});
	}
}
export function isNetworkError(error: Error): boolean {
	const networkError = error as NetworkError;
	return !!(
		networkError.isNetworkError ||
		error.message.includes('fetch') ||
		error.message.includes('network') ||
		error.message.includes('Failed to fetch') ||
		networkError.status >= 500 ||
		networkError.code === 'NETWORK_ERROR'
	);
}
export function isTimeoutError(error: Error): boolean {
	const networkError = error as NetworkError;
	return !!(
		networkError.isTimeout ||
		error.message.includes('timeout') ||
		error.message.includes('timed out') ||
		networkError.code === 'ECONNABORTED'
	);
}
