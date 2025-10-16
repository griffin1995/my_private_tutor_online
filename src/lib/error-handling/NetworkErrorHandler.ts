import type {
	ErrorHandlingStrategy,
	ErrorHandlingResult,
	RetryConfig,
	NetworkErrorHandlerConfig,
	CircuitBreakerState,
	CircuitBreakerConfig,
} from './types';
import {
	calculateRetryDelay,
	isNetworkError,
	isTimeoutError,
	logError,
} from '../../components/error-boundary/utils';
interface NetworkError extends Error {
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
interface QueuedRequest {
	id: string;
	url: string;
	method: string;
	data?: any;
	headers?: Record<string, string>;
	timestamp: number;
	retryCount: number;
	maxRetries: number;
	priority: number;
}
export class NetworkErrorHandler implements ErrorHandlingStrategy {
	public name = 'NetworkErrorHandler';
	public priority = 1;
	private config: NetworkErrorHandlerConfig;
	private circuitBreakerState: CircuitBreakerState = 'closed';
	private failureCount = 0;
	private lastFailureTime = 0;
	private halfOpenCalls = 0;
	private requestQueue: QueuedRequest[] = [];
	private isOffline = false;
	private cache = new Map<
		string,
		{
			data: any;
			timestamp: number;
			ttl: number;
		}
	>();
	constructor(config: NetworkErrorHandlerConfig) {
		this.config = {
			retryConfig: {
				enabled: true,
				maxAttempts: 3,
				baseDelay: 1000,
				maxDelay: 10000,
				exponentialBackoff: true,
				backoffMultiplier: 2,
				jitter: true,
				retryableErrors: ['NetworkError', 'TimeoutError', 'ConnectionError'],
				nonRetryableErrors: [
					'ValidationError',
					'AuthenticationError',
					'PermissionError',
				],
				...config.retryConfig,
			},
			timeoutConfig: {
				request: 30000,
				response: 30000,
				idle: 60000,
				...config.timeoutConfig,
			},
			circuitBreaker: {
				enabled: true,
				failureThreshold: 5,
				resetTimeout: 60000,
				monitoringPeriod: 300000,
				...config.circuitBreaker,
			},
			cache: {
				enabled: true,
				ttl: 300000,
				maxSize: 100,
				fallbackToCache: true,
				...config.cache,
			},
			offline: {
				detection: true,
				fallbackMode: 'cache',
				syncOnReconnect: true,
				...config.offline,
			},
		};
		this.initializeNetworkMonitoring();
	}
	public canHandle(error: Error): boolean {
		const networkError = error as NetworkError;
		return !!(
			isNetworkError(error) ||
			isTimeoutError(error) ||
			networkError.status >= 500 ||
			networkError.status === 429 ||
			networkError.status === 408 ||
			networkError.code === 'NETWORK_ERROR' ||
			networkError.code === 'ECONNABORTED' ||
			networkError.code === 'ENOTFOUND' ||
			networkError.code === 'ECONNREFUSED'
		);
	}
	public async handle(
		error: Error,
		context?: any,
	): Promise<ErrorHandlingResult> {
		const networkError = error as NetworkError;
		try {
			if (
				this.config.circuitBreaker.enabled &&
				this.circuitBreakerState === 'open'
			) {
				return this.handleCircuitBreakerOpen(error, context);
			}
			if (networkError.status === 429) {
				return await this.handleRateLimiting(networkError, context);
			}
			if (isTimeoutError(error)) {
				return await this.handleTimeout(networkError, context);
			}
			if (networkError.status >= 500) {
				return await this.handleServerError(networkError, context);
			}
			if (this.isOffline || networkError.code === 'NETWORK_ERROR') {
				return await this.handleOfflineError(networkError, context);
			}
			return await this.handleWithRetry(networkError, context);
		} catch (handlingError) {
			logError(handlingError, {
				context: 'NetworkErrorHandler.handle',
				originalError: error,
			});
			return {
				success: false,
				action: 'escalate',
				message: 'Network error handling failed',
				data: {
					originalError: error,
					handlingError,
				},
			};
		}
	}
	private async handleRateLimiting(
		error: NetworkError,
		context?: any,
	): Promise<ErrorHandlingResult> {
		const retryAfter = this.getRetryAfterDelay(error);
		const delay = retryAfter || this.calculateBackoffDelay(1);
		logError(error, {
			context: 'Rate limiting detected',
			delay,
		});
		return {
			success: false,
			action: 'retry',
			message: `Rate limit exceeded. Retrying after ${Math.round(delay / 1000)} seconds.`,
			data: {
				delay,
				retryAfter,
			},
		};
	}
	private async handleTimeout(
		error: NetworkError,
		context?: any,
	): Promise<ErrorHandlingResult> {
		if (this.config.cache.enabled && context?.url) {
			const cachedData = this.getCachedData(context.url);
			if (cachedData) {
				return {
					success: true,
					action: 'fallback',
					message: 'Using cached data due to timeout',
					data: cachedData,
				};
			}
		}
		if (this.config.offline.detection && context?.url) {
			this.queueRequest(context);
			return {
				success: false,
				action: 'retry',
				message: 'Request queued for retry',
				data: {
					queued: true,
				},
			};
		}
		return {
			success: false,
			action: 'escalate',
			message: 'Request timed out and no fallback available',
			data: {
				error,
			},
		};
	}
	private async handleServerError(
		error: NetworkError,
		context?: any,
	): Promise<ErrorHandlingResult> {
		this.recordFailure();
		if (this.config.retryConfig.enabled && this.shouldRetry(error)) {
			const retryCount = context?.retryCount || 0;
			if (retryCount < this.config.retryConfig.maxAttempts) {
				const delay = this.calculateBackoffDelay(retryCount + 1);
				return {
					success: false,
					action: 'retry',
					message: `Server error. Retrying in ${Math.round(delay / 1000)} seconds.`,
					data: {
						delay,
						retryCount: retryCount + 1,
					},
				};
			}
		}
		if (this.config.cache.fallbackToCache && context?.url) {
			const cachedData = this.getCachedData(context.url);
			if (cachedData) {
				return {
					success: true,
					action: 'fallback',
					message: 'Using cached data due to server error',
					data: cachedData,
				};
			}
		}
		return {
			success: false,
			action: 'escalate',
			message: 'Server error and no fallback available',
			data: {
				error,
			},
		};
	}
	private async handleOfflineError(
		error: NetworkError,
		context?: any,
	): Promise<ErrorHandlingResult> {
		if (this.config.cache.enabled && context?.url) {
			const cachedData = this.getCachedData(context.url);
			if (cachedData) {
				return {
					success: true,
					action: 'fallback',
					message: 'Using cached data (offline mode)',
					data: cachedData,
				};
			}
		}
		if (this.config.offline.detection && context?.url) {
			this.queueRequest(context);
			return {
				success: false,
				action: 'fallback',
				message: 'You appear to be offline. Request has been queued.',
				data: {
					queued: true,
					offlineMode: true,
					queueSize: this.requestQueue.length,
				},
			};
		}
		return {
			success: false,
			action: 'escalate',
			message: 'No internet connection and no cached data available',
			data: {
				error,
				offline: true,
			},
		};
	}
	private async handleWithRetry(
		error: NetworkError,
		context?: any,
	): Promise<ErrorHandlingResult> {
		if (!this.shouldRetry(error)) {
			return {
				success: false,
				action: 'escalate',
				message: 'Error is not retryable',
				data: {
					error,
				},
			};
		}
		const retryCount = context?.retryCount || 0;
		if (retryCount >= this.config.retryConfig.maxAttempts) {
			return {
				success: false,
				action: 'escalate',
				message: 'Maximum retry attempts reached',
				data: {
					error,
					retryCount,
				},
			};
		}
		const delay = this.calculateBackoffDelay(retryCount + 1);
		return {
			success: false,
			action: 'retry',
			message: `Network error. Retrying in ${Math.round(delay / 1000)} seconds.`,
			data: {
				delay,
				retryCount: retryCount + 1,
			},
		};
	}
	private handleCircuitBreakerOpen(
		error: Error,
		context?: any,
	): ErrorHandlingResult {
		if (this.config.cache.enabled && context?.url) {
			const cachedData = this.getCachedData(context.url);
			if (cachedData) {
				return {
					success: true,
					action: 'fallback',
					message: 'Using cached data (service unavailable)',
					data: cachedData,
				};
			}
		}
		return {
			success: false,
			action: 'fallback',
			message: 'Service is temporarily unavailable. Please try again later.',
			data: {
				circuitBreakerOpen: true,
			},
		};
	}
	private shouldRetry(error: NetworkError): boolean {
		const { retryableErrors, nonRetryableErrors } = this.config.retryConfig;
		if (
			nonRetryableErrors.includes(error.name) ||
			nonRetryableErrors.includes(error.message)
		) {
			return false;
		}
		if (
			retryableErrors.includes(error.name) ||
			retryableErrors.includes(error.message)
		) {
			return true;
		}
		if (error.status) {
			if (error.status >= 400 && error.status < 500 && error.status !== 429) {
				return false;
			}
			return error.status >= 500 || error.status === 429;
		}
		return isNetworkError(error) || isTimeoutError(error);
	}
	private calculateBackoffDelay(attempt: number): number {
		const { baseDelay, maxDelay, exponentialBackoff, backoffMultiplier, jitter } =
			this.config.retryConfig;
		let delay = baseDelay;
		if (exponentialBackoff) {
			delay = Math.min(
				baseDelay * Math.pow(backoffMultiplier, attempt - 1),
				maxDelay,
			);
		}
		if (jitter) {
			const jitterAmount = Math.random() * 0.1 * delay;
			delay = Math.floor(delay + jitterAmount);
		}
		return delay;
	}
	private getRetryAfterDelay(error: NetworkError): number | null {
		const retryAfter =
			error.response?.headers?.['retry-after'] ||
			error.response?.headers?.['Retry-After'];
		if (!retryAfter) return null;
		const seconds = parseInt(retryAfter, 10);
		if (!isNaN(seconds)) {
			return seconds * 1000;
		}
		const retryDate = new Date(retryAfter);
		if (!isNaN(retryDate.getTime())) {
			return Math.max(0, retryDate.getTime() - Date.now());
		}
		return null;
	}
	private recordFailure(): void {
		if (!this.config.circuitBreaker.enabled) return;
		this.failureCount++;
		this.lastFailureTime = Date.now();
		if (this.failureCount >= this.config.circuitBreaker.failureThreshold) {
			this.circuitBreakerState = 'open';
			setTimeout(() => {
				this.circuitBreakerState = 'half-open';
				this.halfOpenCalls = 0;
			}, this.config.circuitBreaker.resetTimeout);
			logError(new Error('Circuit breaker opened'), {
				failureCount: this.failureCount,
				threshold: this.config.circuitBreaker.failureThreshold,
			});
		}
	}
	private recordSuccess(): void {
		if (!this.config.circuitBreaker.enabled) return;
		if (this.circuitBreakerState === 'half-open') {
			this.halfOpenCalls++;
			if (this.halfOpenCalls >= 3) {
				this.circuitBreakerState = 'closed';
				this.failureCount = 0;
				this.halfOpenCalls = 0;
			}
		} else if (this.circuitBreakerState === 'closed') {
			this.failureCount = 0;
		}
	}
	private queueRequest(context: any): void {
		const request: QueuedRequest = {
			id: `req_${Date.now()}_${Math.random().toString(36).substring(2)}`,
			url: context.url,
			method: context.method || 'GET',
			data: context.data,
			headers: context.headers,
			timestamp: Date.now(),
			retryCount: 0,
			maxRetries: this.config.retryConfig.maxAttempts,
			priority: context.priority || 1,
		};
		this.requestQueue.push(request);
		this.requestQueue.sort((a, b) => {
			if (a.priority !== b.priority) {
				return b.priority - a.priority;
			}
			return a.timestamp - b.timestamp;
		});
		logError(new Error('Request queued for offline retry'), {
			requestId: request.id,
			queueSize: this.requestQueue.length,
		});
	}
	private setCachedData(key: string, data: any, ttl?: number): void {
		if (!this.config.cache.enabled) return;
		this.cleanupCache();
		if (this.cache.size >= this.config.cache.maxSize) {
			const oldestKey = this.cache.keys().next().value;
			if (oldestKey) {
				this.cache.delete(oldestKey);
			}
		}
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl: ttl || this.config.cache.ttl,
		});
	}
	private getCachedData(key: string): any | null {
		if (!this.config.cache.enabled) return null;
		const cached = this.cache.get(key);
		if (!cached) return null;
		if (Date.now() - cached.timestamp > cached.ttl) {
			this.cache.delete(key);
			return null;
		}
		return cached.data;
	}
	private cleanupCache(): void {
		const now = Date.now();
		for (const [key, value] of this.cache.entries()) {
			if (now - value.timestamp > value.ttl) {
				this.cache.delete(key);
			}
		}
	}
	private initializeNetworkMonitoring(): void {
		if (!this.config.offline.detection || typeof window === 'undefined') return;
		this.isOffline = !navigator.onLine;
		window.addEventListener('online', () => {
			this.isOffline = false;
			logError(new Error('Network connection restored'), {
				context: 'NetworkErrorHandler',
			});
			if (this.config.offline.syncOnReconnect) {
				this.processQueuedRequests();
			}
		});
		window.addEventListener('offline', () => {
			this.isOffline = true;
			logError(new Error('Network connection lost'), {
				context: 'NetworkErrorHandler',
			});
		});
	}
	private async processQueuedRequests(): Promise<void> {
		if (this.requestQueue.length === 0) return;
		logError(new Error('Processing queued requests'), {
			queueSize: this.requestQueue.length,
			context: 'NetworkErrorHandler',
		});
		const requests = [...this.requestQueue];
		this.requestQueue = [];
		for (const request of requests) {
			try {
				await this.retryQueuedRequest(request);
			} catch (error) {
				logError(error as Error, {
					context: 'Failed to process queued request',
					requestId: request.id,
				});
				if (request.retryCount < request.maxRetries) {
					request.retryCount++;
					this.requestQueue.push(request);
				}
			}
		}
	}
	private async retryQueuedRequest(request: QueuedRequest): Promise<any> {
		logError(new Error('Retrying queued request'), {
			requestId: request.id,
			url: request.url,
			attempt: request.retryCount + 1,
		});
		return Promise.resolve({
			success: true,
		});
	}
	public getStatus(): any {
		return {
			circuitBreakerState: this.circuitBreakerState,
			failureCount: this.failureCount,
			queueSize: this.requestQueue.length,
			isOffline: this.isOffline,
			cacheSize: this.cache.size,
		};
	}
}
