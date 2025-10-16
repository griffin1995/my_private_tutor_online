'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { NetworkErrorHandler } from '../lib/error-handling/NetworkErrorHandler';
import {
	createErrorReport,
	formatErrorMessage,
	isRetryableError,
	calculateRetryDelay,
	getErrorSeverity,
	getErrorCategory,
	logError,
} from '../components/error-boundary/utils';
import type {
	ErrorHandlingResult,
	ErrorRecoveryPlan,
	RetryConfig,
	FAQErrorContext,
} from '../lib/error-handling/types';
interface UseErrorRecoveryConfig {
	maxRetries?: number;
	retryDelay?: number;
	exponentialBackoff?: boolean;
	enableFallback?: boolean;
	enableReporting?: boolean;
	enableAnalytics?: boolean;
	autoRetry?: boolean;
	component?: string;
	feature?: string;
	onError?: (error: Error, context?: any) => void;
	onRecovery?: (plan: ErrorRecoveryPlan) => void;
	onRetrySuccess?: () => void;
	onMaxRetriesReached?: () => void;
}
interface ErrorRecoveryState {
	error: Error | null;
	isRecovering: boolean;
	retryCount: number;
	hasRecovered: boolean;
	fallbackActive: boolean;
	lastErrorTime: number;
	recoveryPlan: ErrorRecoveryPlan | null;
	errorMessage: string | null;
	canRetry: boolean;
}
interface UseErrorRecoveryReturn {
	error: Error | null;
	isRecovering: boolean;
	retryCount: number;
	hasRecovered: boolean;
	fallbackActive: boolean;
	errorMessage: string | null;
	canRetry: boolean;
	recoveryPlan: ErrorRecoveryPlan | null;
	handleError: (error: Error, context?: any) => Promise<ErrorHandlingResult>;
	retry: () => Promise<void>;
	clearError: () => void;
	activateFallback: () => void;
	reportError: (error: Error, context?: any) => void;
	formatError: (error: Error) => string;
	isRetryable: (error: Error) => boolean;
	getErrorInfo: (error: Error) => {
		category: string;
		severity: string;
	};
}
export function useErrorRecovery(
	config: UseErrorRecoveryConfig = {},
): UseErrorRecoveryReturn {
	const [state, setState] = useState<ErrorRecoveryState>({
		error: null,
		isRecovering: false,
		retryCount: 0,
		hasRecovered: false,
		fallbackActive: false,
		lastErrorTime: 0,
		recoveryPlan: null,
		errorMessage: null,
		canRetry: false,
	});
	const effectiveConfig: Required<UseErrorRecoveryConfig> = {
		maxRetries: 3,
		retryDelay: 1000,
		exponentialBackoff: true,
		enableFallback: true,
		enableReporting: true,
		enableAnalytics: true,
		autoRetry: true,
		component: 'Unknown',
		feature: 'Unknown',
		onError: () => {},
		onRecovery: () => {},
		onRetrySuccess: () => {},
		onMaxRetriesReached: () => {},
		...config,
	};
	const networkHandler = useRef<NetworkErrorHandler | null>(null);
	const retryTimeout = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		networkHandler.current = new NetworkErrorHandler({
			retryConfig: {
				enabled: true,
				maxAttempts: effectiveConfig.maxRetries,
				baseDelay: effectiveConfig.retryDelay,
				maxDelay: 30000,
				exponentialBackoff: effectiveConfig.exponentialBackoff,
				backoffMultiplier: 2,
				jitter: true,
				retryableErrors: ['NetworkError', 'TimeoutError', 'APIError'],
				nonRetryableErrors: ['ValidationError', 'PermissionError'],
			},
			timeoutConfig: {
				request: 30000,
				response: 30000,
				idle: 60000,
			},
			circuitBreaker: {
				enabled: true,
				failureThreshold: 5,
				resetTimeout: 60000,
				monitoringPeriod: 300000,
			},
			cache: {
				enabled: true,
				ttl: 300000,
				maxSize: 50,
				fallbackToCache: true,
			},
			offline: {
				detection: true,
				fallbackMode: 'cache',
				syncOnReconnect: true,
			},
		});
	}, [
		effectiveConfig.maxRetries,
		effectiveConfig.retryDelay,
		effectiveConfig.exponentialBackoff,
	]);
	useEffect(() => {
		return () => {
			if (retryTimeout.current) {
				clearTimeout(retryTimeout.current);
			}
		};
	}, []);
	const handleError = useCallback(
		async (error: Error, context?: any): Promise<ErrorHandlingResult> => {
			const timestamp = Date.now();
			const category = getErrorCategory(error);
			const severity = getErrorSeverity(error);
			const canRetry = isRetryableError(error);
			const errorMessage = formatErrorMessage(error);
			logError(error, {
				context: {
					...context,
					component: effectiveConfig.component,
					feature: effectiveConfig.feature,
				},
			});
			setState((prev) => ({
				...prev,
				error,
				lastErrorTime: timestamp,
				errorMessage,
				canRetry: canRetry && prev.retryCount < effectiveConfig.maxRetries,
				isRecovering: false,
				fallbackActive: false,
			}));
			effectiveConfig.onError(error, context);
			if (effectiveConfig.enableReporting) {
				await reportErrorInternal(error, context);
			}
			try {
				if (networkHandler.current && networkHandler.current.canHandle(error)) {
					const result = await networkHandler.current.handle(error, context);
					if (result.success || result.action === 'fallback') {
						if (result.action === 'fallback') {
							setState((prev) => ({
								...prev,
								fallbackActive: true,
							}));
						}
						return result;
					}
					if (result.action === 'retry') {
						if (
							effectiveConfig.autoRetry &&
							state.retryCount < effectiveConfig.maxRetries
						) {
							scheduleRetry(result.data?.delay || effectiveConfig.retryDelay);
						}
						return result;
					}
				}
				return await handleGenericError(
					error,
					context,
					category,
					severity,
					canRetry,
				);
			} catch (handlingError) {
				logError(handlingError as Error, {
					context: 'Error recovery hook handling failed',
					originalError: error,
				});
				return {
					success: false,
					action: 'escalate',
					message: 'Error recovery failed',
					data: {
						originalError: error,
						handlingError,
					},
				};
			}
		},
		[state.retryCount, effectiveConfig],
	);
	const handleGenericError = useCallback(
		async (
			error: Error,
			context: any,
			category: string,
			severity: string,
			canRetry: boolean,
		): Promise<ErrorHandlingResult> => {
			const recoveryPlan: ErrorRecoveryPlan = {
				id: `recovery_${Date.now()}`,
				name: `${category} Error Recovery`,
				description: `Recovery plan for ${category} error`,
				steps: [],
				priority:
					severity === 'critical' ? 1
					: severity === 'high' ? 2
					: 3,
				estimatedDuration: canRetry ? 5000 : 1000,
				requiresUserAction: false,
				affectedFeatures: [effectiveConfig.feature],
				fallbackOptions: [],
			};
			if (category === 'ui' || category === 'component') {
				recoveryPlan.steps.push({
					id: 'component_retry',
					name: 'Component Retry',
					description: 'Retry component rendering',
					action: 'retry',
					timeout: 3000,
					canSkip: false,
				});
				if (effectiveConfig.enableFallback) {
					recoveryPlan.fallbackOptions.push('Fallback UI', 'Minimal interface');
				}
			}
			if (category === 'search') {
				recoveryPlan.steps.push({
					id: 'search_fallback',
					name: 'Search Fallback',
					description: 'Use basic search functionality',
					action: 'retry',
					timeout: 2000,
					canSkip: true,
				});
				recoveryPlan.fallbackOptions.push('Basic text search', 'Category browsing');
			}
			if (category === 'validation') {
				recoveryPlan.requiresUserAction = true;
				recoveryPlan.steps.push({
					id: 'validation_fix',
					name: 'Fix Input',
					description: 'User needs to correct input',
					action: 'notify',
					canSkip: false,
				});
			}
			setState((prev) => ({
				...prev,
				recoveryPlan,
			}));
			effectiveConfig.onRecovery(recoveryPlan);
			if (!canRetry || state.retryCount >= effectiveConfig.maxRetries) {
				if (effectiveConfig.enableFallback) {
					return {
						success: false,
						action: 'fallback',
						message: 'Activating fallback mode',
						recoveryPlan,
					};
				}
				return {
					success: false,
					action: 'escalate',
					message: 'Error cannot be recovered automatically',
					recoveryPlan,
				};
			}
			if (effectiveConfig.autoRetry) {
				const delay = calculateRetryDelay(
					state.retryCount + 1,
					effectiveConfig.retryDelay,
					30000,
					2,
				);
				scheduleRetry(delay);
			}
			return {
				success: false,
				action: 'retry',
				message: `Will retry in ${Math.round(effectiveConfig.retryDelay / 1000)} seconds`,
				recoveryPlan,
			};
		},
		[state.retryCount, effectiveConfig],
	);
	const scheduleRetry = useCallback((delay: number) => {
		setState((prev) => ({
			...prev,
			isRecovering: true,
		}));
		retryTimeout.current = setTimeout(() => {
			retry();
		}, delay);
	}, []);
	const retry = useCallback(async () => {
		if (!state.error || state.retryCount >= effectiveConfig.maxRetries) {
			return;
		}
		setState((prev) => ({
			...prev,
			isRecovering: true,
			retryCount: prev.retryCount + 1,
		}));
		try {
			setTimeout(() => {
				setState((prev) => ({
					...prev,
					error: null,
					isRecovering: false,
					hasRecovered: true,
					errorMessage: null,
				}));
				effectiveConfig.onRetrySuccess();
			}, 100);
		} catch (retryError) {
			logError(retryError as Error, {
				context: 'Retry failed',
			});
			setState((prev) => ({
				...prev,
				isRecovering: false,
			}));
			if (state.retryCount + 1 >= effectiveConfig.maxRetries) {
				effectiveConfig.onMaxRetriesReached();
				if (effectiveConfig.enableFallback) {
					activateFallback();
				}
			}
		}
	}, [state.error, state.retryCount, effectiveConfig]);
	const activateFallback = useCallback(() => {
		setState((prev) => ({
			...prev,
			fallbackActive: true,
			isRecovering: false,
			errorMessage: 'Using simplified interface due to technical issues',
		}));
	}, []);
	const clearError = useCallback(() => {
		if (retryTimeout.current) {
			clearTimeout(retryTimeout.current);
			retryTimeout.current = null;
		}
		setState({
			error: null,
			isRecovering: false,
			retryCount: 0,
			hasRecovered: false,
			fallbackActive: false,
			lastErrorTime: 0,
			recoveryPlan: null,
			errorMessage: null,
			canRetry: false,
		});
	}, []);
	const reportErrorInternal = useCallback(
		async (error: Error, context?: any) => {
			try {
				const errorReport = createErrorReport(
					error,
					{
						componentStack: context?.componentStack,
					},
					effectiveConfig.component,
					context as FAQErrorContext,
				);
				await fetch('/api/errors', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						...errorReport,
						component: effectiveConfig.component,
						feature: effectiveConfig.feature,
						recoveryAttempted: state.retryCount > 0,
						fallbackActive: state.fallbackActive,
					}),
				});
			} catch (reportingError) {
				logError(reportingError as Error, {
					context: 'Error reporting failed',
				});
			}
		},
		[
			effectiveConfig.component,
			effectiveConfig.feature,
			state.retryCount,
			state.fallbackActive,
		],
	);
	const reportError = useCallback(
		(error: Error, context?: any) => {
			if (effectiveConfig.enableReporting) {
				reportErrorInternal(error, context);
			}
		},
		[effectiveConfig.enableReporting, reportErrorInternal],
	);
	const formatError = useCallback((error: Error): string => {
		return formatErrorMessage(error, process.env.NODE_ENV === 'development');
	}, []);
	const isRetryable = useCallback((error: Error): boolean => {
		return isRetryableError(error);
	}, []);
	const getErrorInfo = useCallback((error: Error) => {
		return {
			category: getErrorCategory(error),
			severity: getErrorSeverity(error),
		};
	}, []);
	return {
		error: state.error,
		isRecovering: state.isRecovering,
		retryCount: state.retryCount,
		hasRecovered: state.hasRecovered,
		fallbackActive: state.fallbackActive,
		errorMessage: state.errorMessage,
		canRetry: state.canRetry,
		recoveryPlan: state.recoveryPlan,
		handleError,
		retry,
		clearError,
		activateFallback,
		reportError,
		formatError,
		isRetryable,
		getErrorInfo,
	};
}
