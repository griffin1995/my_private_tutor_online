import { ReactNode, ErrorInfo } from 'react';
export interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);
	level: 'global' | 'page' | 'component' | 'faq' | 'search';
	componentName?: string;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	onRecovery?: () => void;
	maxRetries?: number;
	autoRetry?: boolean;
	retryDelay?: number;
	showErrorDetails?: boolean;
	enableReporting?: boolean;
}
export interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error | null;
	errorInfo?: ErrorInfo | null;
	errorId: string;
	retryCount: number;
	isRetrying: boolean;
	lastErrorTime: number;
	recoveryAttempted: boolean;
}
export interface ErrorReport {
	errorId: string;
	timestamp: string;
	level: string;
	component: string;
	message: string;
	stack?: string;
	componentStack?: string;
	userAgent: string;
	url: string;
	userId?: string;
	sessionId: string;
	buildVersion: string;
	environment: 'development' | 'staging' | 'production';
	severity: 'low' | 'medium' | 'high' | 'critical';
	category:
		| 'component'
		| 'network'
		| 'authentication'
		| 'data'
		| 'ui'
		| 'search'
		| 'unknown';
	context?: Record<string, any>;
	businessImpact?: 'none' | 'low' | 'medium' | 'high' | 'revenue_critical';
	clientType?: 'royal' | 'standard' | 'visitor';
}
export interface ErrorRecoveryOptions {
	maxRetries: number;
	retryDelay: number;
	exponentialBackoff: boolean;
	backoffMultiplier: number;
	maxRetryDelay: number;
	autoRetry: boolean;
	retryableErrors: string[];
	nonRetryableErrors: string[];
	fallbackComponent?: ReactNode;
	onRetryAttempt?: (attemptNumber: number) => void;
	onRetrySuccess?: () => void;
	onRetryFailure?: (error: Error) => void;
	onMaxRetriesReached?: () => void;
}
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ErrorCategory =
	| 'component'
	| 'network'
	| 'authentication'
	| 'data'
	| 'ui'
	| 'search'
	| 'api'
	| 'validation'
	| 'permission'
	| 'timeout'
	| 'unknown';
export type BusinessImpact =
	| 'none'
	| 'low'
	| 'medium'
	| 'high'
	| 'revenue_critical';
export type ClientType = 'royal' | 'standard' | 'visitor';
export type ErrorHandler = (error: Error, errorInfo: ErrorInfo) => void;
export type RecoveryHandler = () => void | Promise<void>;
export type RetryHandler = (attemptNumber: number) => void | Promise<void>;
export interface FAQErrorContext {
	searchQuery?: string;
	categoryId?: string;
	questionId?: string;
	filters?: Record<string, any>;
	searchResults?: any[];
	userType?: ClientType;
	feature?:
		| 'search'
		| 'voice'
		| 'visual'
		| 'recommendation'
		| 'theme'
		| 'analytics';
}
export interface NetworkError extends Error {
	status?: number;
	statusText?: string;
	code?: string;
	response?: any;
	request?: any;
	config?: any;
	isNetworkError?: boolean;
	isTimeout?: boolean;
	isCancel?: boolean;
}
export interface ValidationError extends Error {
	field?: string;
	value?: any;
	constraint?: string;
	validationType?: 'required' | 'format' | 'length' | 'range' | 'custom';
}
export interface PermissionError extends Error {
	requiredPermission?: string;
	userRole?: string;
	resource?: string;
	action?: string;
}
export interface UseErrorHandlerReturn {
	handleError: (error: Error) => void;
	resetError: () => void;
	hasError: boolean;
	error: Error | null;
}
export interface ErrorMonitoringConfig {
	enabled: boolean;
	apiEndpoint?: string;
	apiKey?: string;
	environment: 'development' | 'staging' | 'production';
	sampleRate: number;
	enableConsoleLogging: boolean;
	enablePerformanceTracking: boolean;
	maxReportsPerSession: number;
	reportingDelay: number;
	excludeErrors: string[];
	includeContext: boolean;
	enableUserTracking: boolean;
	enableBreadcrumbs: boolean;
}
export interface ErrorAnalytics {
	totalErrors: number;
	errorsByCategory: Record<ErrorCategory, number>;
	errorsBySeverity: Record<ErrorSeverity, number>;
	errorsByComponent: Record<string, number>;
	averageRecoveryTime: number;
	successfulRecoveries: number;
	failedRecoveries: number;
	userImpact: {
		royal: number;
		standard: number;
		visitor: number;
	};
	businessImpact: {
		revenueAffected: number;
		conversionsLost: number;
		sessionAbandonment: number;
	};
}
