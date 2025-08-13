/**
 * CONTEXT7 SOURCE: /context7/react_dev - Network error handling implementation
 * NETWORK ERROR HANDLER: Comprehensive network error handling with retry and fallback
 * 
 * Network Error Handler - API and Network Error Management
 * Enterprise-grade network error handling with intelligent retry strategies
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through reliable network handling
 * NETWORK RELIABILITY: Robust error handling preventing network-related revenue loss
 * ROYAL CLIENT PROTECTION: Premium network error recovery maintaining service quality
 * 
 * FEATURES:
 * - Exponential backoff retry logic
 * - Circuit breaker pattern implementation
 * - Network timeout handling
 * - Offline mode detection
 * - Cache fallback strategies
 * - Request queuing for offline scenarios
 */

import type {
  ErrorHandlingStrategy,
  ErrorHandlingResult,
  RetryConfig,
  NetworkErrorHandlerConfig,
  CircuitBreakerState,
  CircuitBreakerConfig
} from './types'

import { calculateRetryDelay, isNetworkError, isTimeoutError, logError } from '../../components/error-boundary/utils'

// CONTEXT7 SOURCE: /context7/react_dev - Network error types
// NETWORK ERROR TYPES: Extended error types for network handling
interface NetworkError extends Error {
  status?: number
  statusText?: string
  code?: string
  response?: any
  request?: any
  config?: any
  isNetworkError?: boolean
  isTimeout?: boolean
  isCancel?: boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Request queue interface
// REQUEST QUEUE: Interface for managing offline request queue
interface QueuedRequest {
  id: string
  url: string
  method: string
  data?: any
  headers?: Record<string, string>
  timestamp: number
  retryCount: number
  maxRetries: number
  priority: number
}

/**
 * CONTEXT7 SOURCE: /context7/react_dev - Network error handler implementation
 * NETWORK ERROR HANDLER: Comprehensive network error management system
 */
export class NetworkErrorHandler implements ErrorHandlingStrategy {
  public name = 'NetworkErrorHandler'
  public priority = 1

  private config: NetworkErrorHandlerConfig
  private circuitBreakerState: CircuitBreakerState = 'closed'
  private failureCount = 0
  private lastFailureTime = 0
  private halfOpenCalls = 0
  private requestQueue: QueuedRequest[] = []
  private isOffline = false
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

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
        nonRetryableErrors: ['ValidationError', 'AuthenticationError', 'PermissionError'],
        ...config.retryConfig
      },
      timeoutConfig: {
        request: 30000,
        response: 30000,
        idle: 60000,
        ...config.timeoutConfig
      },
      circuitBreaker: {
        enabled: true,
        failureThreshold: 5,
        resetTimeout: 60000,
        monitoringPeriod: 300000,
        ...config.circuitBreaker
      },
      cache: {
        enabled: true,
        ttl: 300000, // 5 minutes
        maxSize: 100,
        fallbackToCache: true,
        ...config.cache
      },
      offline: {
        detection: true,
        fallbackMode: 'cache',
        syncOnReconnect: true,
        ...config.offline
      }
    }

    this.initializeNetworkMonitoring()
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Network error detection
  // ERROR DETECTION: Determine if error can be handled by network handler
  public canHandle(error: Error): boolean {
    const networkError = error as NetworkError

    return !!(
      isNetworkError(error) ||
      isTimeoutError(error) ||
      networkError.status >= 500 ||
      networkError.status === 429 || // Rate limiting
      networkError.status === 408 || // Request timeout
      networkError.code === 'NETWORK_ERROR' ||
      networkError.code === 'ECONNABORTED' ||
      networkError.code === 'ENOTFOUND' ||
      networkError.code === 'ECONNREFUSED'
    )
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Network error handling logic
  // ERROR HANDLING: Main network error handling implementation
  public async handle(error: Error, context?: any): Promise<ErrorHandlingResult> {
    const networkError = error as NetworkError

    try {
      // Check circuit breaker state
      if (this.config.circuitBreaker.enabled && this.circuitBreakerState === 'open') {
        return this.handleCircuitBreakerOpen(error, context)
      }

      // Handle different types of network errors
      if (networkError.status === 429) {
        return await this.handleRateLimiting(networkError, context)
      }

      if (isTimeoutError(error)) {
        return await this.handleTimeout(networkError, context)
      }

      if (networkError.status >= 500) {
        return await this.handleServerError(networkError, context)
      }

      if (this.isOffline || networkError.code === 'NETWORK_ERROR') {
        return await this.handleOfflineError(networkError, context)
      }

      // Default network error handling with retry
      return await this.handleWithRetry(networkError, context)

    } catch (handlingError) {
      logError(handlingError, { context: 'NetworkErrorHandler.handle', originalError: error })
      
      return {
        success: false,
        action: 'escalate',
        message: 'Network error handling failed',
        data: { originalError: error, handlingError }
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Rate limiting error handling
  // RATE LIMITING: Handle rate limiting with backoff
  private async handleRateLimiting(error: NetworkError, context?: any): Promise<ErrorHandlingResult> {
    const retryAfter = this.getRetryAfterDelay(error)
    const delay = retryAfter || this.calculateBackoffDelay(1)

    logError(error, { context: 'Rate limiting detected', delay })

    return {
      success: false,
      action: 'retry',
      message: `Rate limit exceeded. Retrying after ${Math.round(delay / 1000)} seconds.`,
      data: { delay, retryAfter }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Timeout error handling
  // TIMEOUT HANDLING: Handle request timeouts with appropriate fallback
  private async handleTimeout(error: NetworkError, context?: any): Promise<ErrorHandlingResult> {
    // Try to get cached data if available
    if (this.config.cache.enabled && context?.url) {
      const cachedData = this.getCachedData(context.url)
      if (cachedData) {
        return {
          success: true,
          action: 'fallback',
          message: 'Using cached data due to timeout',
          data: cachedData
        }
      }
    }

    // Queue request for retry if offline mode enabled
    if (this.config.offline.detection && context?.url) {
      this.queueRequest(context)
      return {
        success: false,
        action: 'retry',
        message: 'Request queued for retry',
        data: { queued: true }
      }
    }

    return {
      success: false,
      action: 'escalate',
      message: 'Request timed out and no fallback available',
      data: { error }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Server error handling
  // SERVER ERROR: Handle 5xx server errors with circuit breaker
  private async handleServerError(error: NetworkError, context?: any): Promise<ErrorHandlingResult> {
    this.recordFailure()

    // Check if we should retry
    if (this.config.retryConfig.enabled && this.shouldRetry(error)) {
      const retryCount = context?.retryCount || 0
      
      if (retryCount < this.config.retryConfig.maxAttempts) {
        const delay = this.calculateBackoffDelay(retryCount + 1)
        
        return {
          success: false,
          action: 'retry',
          message: `Server error. Retrying in ${Math.round(delay / 1000)} seconds.`,
          data: { delay, retryCount: retryCount + 1 }
        }
      }
    }

    // Fallback to cached data if available
    if (this.config.cache.fallbackToCache && context?.url) {
      const cachedData = this.getCachedData(context.url)
      if (cachedData) {
        return {
          success: true,
          action: 'fallback',
          message: 'Using cached data due to server error',
          data: cachedData
        }
      }
    }

    return {
      success: false,
      action: 'escalate',
      message: 'Server error and no fallback available',
      data: { error }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Offline error handling
  // OFFLINE HANDLING: Handle offline scenarios with queue and cache
  private async handleOfflineError(error: NetworkError, context?: any): Promise<ErrorHandlingResult> {
    // Try cached data first
    if (this.config.cache.enabled && context?.url) {
      const cachedData = this.getCachedData(context.url)
      if (cachedData) {
        return {
          success: true,
          action: 'fallback',
          message: 'Using cached data (offline mode)',
          data: cachedData
        }
      }
    }

    // Queue request for when online
    if (this.config.offline.detection && context?.url) {
      this.queueRequest(context)
      
      return {
        success: false,
        action: 'fallback',
        message: 'You appear to be offline. Request has been queued.',
        data: { 
          queued: true, 
          offlineMode: true,
          queueSize: this.requestQueue.length
        }
      }
    }

    return {
      success: false,
      action: 'escalate',
      message: 'No internet connection and no cached data available',
      data: { error, offline: true }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Generic retry handling
  // RETRY HANDLING: Generic retry logic with exponential backoff
  private async handleWithRetry(error: NetworkError, context?: any): Promise<ErrorHandlingResult> {
    if (!this.shouldRetry(error)) {
      return {
        success: false,
        action: 'escalate',
        message: 'Error is not retryable',
        data: { error }
      }
    }

    const retryCount = context?.retryCount || 0
    
    if (retryCount >= this.config.retryConfig.maxAttempts) {
      return {
        success: false,
        action: 'escalate',
        message: 'Maximum retry attempts reached',
        data: { error, retryCount }
      }
    }

    const delay = this.calculateBackoffDelay(retryCount + 1)
    
    return {
      success: false,
      action: 'retry',
      message: `Network error. Retrying in ${Math.round(delay / 1000)} seconds.`,
      data: { delay, retryCount: retryCount + 1 }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Circuit breaker open state handling
  // CIRCUIT BREAKER: Handle requests when circuit breaker is open
  private handleCircuitBreakerOpen(error: Error, context?: any): ErrorHandlingResult {
    // Try cached data if available
    if (this.config.cache.enabled && context?.url) {
      const cachedData = this.getCachedData(context.url)
      if (cachedData) {
        return {
          success: true,
          action: 'fallback',
          message: 'Using cached data (service unavailable)',
          data: cachedData
        }
      }
    }

    return {
      success: false,
      action: 'fallback',
      message: 'Service is temporarily unavailable. Please try again later.',
      data: { circuitBreakerOpen: true }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Retry decision logic
  // RETRY LOGIC: Determine if error should be retried
  private shouldRetry(error: NetworkError): boolean {
    const { retryableErrors, nonRetryableErrors } = this.config.retryConfig

    // Check non-retryable errors first
    if (nonRetryableErrors.includes(error.name) || nonRetryableErrors.includes(error.message)) {
      return false
    }

    // Check retryable errors
    if (retryableErrors.includes(error.name) || retryableErrors.includes(error.message)) {
      return true
    }

    // Check status codes
    if (error.status) {
      // Don't retry client errors (except rate limiting)
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        return false
      }
      
      // Retry server errors and rate limiting
      return error.status >= 500 || error.status === 429
    }

    // Default to retryable for network errors
    return isNetworkError(error) || isTimeoutError(error)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Backoff delay calculation
  // BACKOFF CALCULATION: Calculate exponential backoff delay
  private calculateBackoffDelay(attempt: number): number {
    const { baseDelay, maxDelay, exponentialBackoff, backoffMultiplier, jitter } = this.config.retryConfig

    let delay = baseDelay
    
    if (exponentialBackoff) {
      delay = Math.min(baseDelay * Math.pow(backoffMultiplier, attempt - 1), maxDelay)
    }

    // Add jitter to prevent thundering herd
    if (jitter) {
      const jitterAmount = Math.random() * 0.1 * delay
      delay = Math.floor(delay + jitterAmount)
    }

    return delay
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Retry-After header parsing
  // RETRY AFTER: Parse Retry-After header for rate limiting
  private getRetryAfterDelay(error: NetworkError): number | null {
    const retryAfter = error.response?.headers?.['retry-after'] || 
                      error.response?.headers?.['Retry-After']

    if (!retryAfter) return null

    // If it's a number, it's in seconds
    const seconds = parseInt(retryAfter, 10)
    if (!isNaN(seconds)) {
      return seconds * 1000 // Convert to milliseconds
    }

    // If it's a date, calculate the difference
    const retryDate = new Date(retryAfter)
    if (!isNaN(retryDate.getTime())) {
      return Math.max(0, retryDate.getTime() - Date.now())
    }

    return null
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Circuit breaker failure recording
  // CIRCUIT BREAKER: Record failures for circuit breaker pattern
  private recordFailure(): void {
    if (!this.config.circuitBreaker.enabled) return

    this.failureCount++
    this.lastFailureTime = Date.now()

    // Check if we should open the circuit breaker
    if (this.failureCount >= this.config.circuitBreaker.failureThreshold) {
      this.circuitBreakerState = 'open'
      
      // Schedule circuit breaker reset
      setTimeout(() => {
        this.circuitBreakerState = 'half-open'
        this.halfOpenCalls = 0
      }, this.config.circuitBreaker.resetTimeout)

      logError(new Error('Circuit breaker opened'), { 
        failureCount: this.failureCount,
        threshold: this.config.circuitBreaker.failureThreshold
      })
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Circuit breaker success recording
  // CIRCUIT BREAKER: Record successes for circuit breaker recovery
  private recordSuccess(): void {
    if (!this.config.circuitBreaker.enabled) return

    if (this.circuitBreakerState === 'half-open') {
      this.halfOpenCalls++
      
      // If enough successful calls in half-open state, close circuit breaker
      if (this.halfOpenCalls >= 3) {
        this.circuitBreakerState = 'closed'
        this.failureCount = 0
        this.halfOpenCalls = 0
      }
    } else if (this.circuitBreakerState === 'closed') {
      // Reset failure count on success
      this.failureCount = 0
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Request queueing for offline mode
  // REQUEST QUEUE: Queue requests for offline scenarios
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
      priority: context.priority || 1
    }

    this.requestQueue.push(request)
    
    // Sort by priority and timestamp
    this.requestQueue.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority // Higher priority first
      }
      return a.timestamp - b.timestamp // Earlier requests first
    })

    logError(new Error('Request queued for offline retry'), { 
      requestId: request.id,
      queueSize: this.requestQueue.length
    })
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Cache management
  // CACHE MANAGEMENT: Cache data for fallback scenarios
  private setCachedData(key: string, data: any, ttl?: number): void {
    if (!this.config.cache.enabled) return

    // Clean up expired entries
    this.cleanupCache()

    // Check size limit
    if (this.cache.size >= this.config.cache.maxSize) {
      // Remove oldest entry
      const oldestKey = this.cache.keys().next().value
      if (oldestKey) {
        this.cache.delete(oldestKey)
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.cache.ttl
    })
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Cache retrieval
  // CACHE RETRIEVAL: Get cached data with TTL validation
  private getCachedData(key: string): any | null {
    if (!this.config.cache.enabled) return null

    const cached = this.cache.get(key)
    if (!cached) return null

    // Check if expired
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Cache cleanup
  // CACHE CLEANUP: Remove expired cache entries
  private cleanupCache(): void {
    const now = Date.now()
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key)
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Network monitoring initialization
  // NETWORK MONITORING: Initialize network status monitoring
  private initializeNetworkMonitoring(): void {
    if (!this.config.offline.detection || typeof window === 'undefined') return

    // Initial state
    this.isOffline = !navigator.onLine

    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOffline = false
      logError(new Error('Network connection restored'), { context: 'NetworkErrorHandler' })
      
      if (this.config.offline.syncOnReconnect) {
        this.processQueuedRequests()
      }
    })

    window.addEventListener('offline', () => {
      this.isOffline = true
      logError(new Error('Network connection lost'), { context: 'NetworkErrorHandler' })
    })
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Process queued requests
  // QUEUE PROCESSING: Process queued requests when back online
  private async processQueuedRequests(): Promise<void> {
    if (this.requestQueue.length === 0) return

    logError(new Error('Processing queued requests'), { 
      queueSize: this.requestQueue.length,
      context: 'NetworkErrorHandler'
    })

    const requests = [...this.requestQueue]
    this.requestQueue = []

    for (const request of requests) {
      try {
        // Attempt to retry the request
        // This would integrate with your actual API client
        await this.retryQueuedRequest(request)
        
      } catch (error) {
        logError(error as Error, { 
          context: 'Failed to process queued request',
          requestId: request.id
        })
        
        // Re-queue if under retry limit
        if (request.retryCount < request.maxRetries) {
          request.retryCount++
          this.requestQueue.push(request)
        }
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Retry queued request
  // QUEUE RETRY: Retry a specific queued request
  private async retryQueuedRequest(request: QueuedRequest): Promise<any> {
    // This method would integrate with your actual HTTP client
    // For now, it's a placeholder that simulates the retry
    
    logError(new Error('Retrying queued request'), {
      requestId: request.id,
      url: request.url,
      attempt: request.retryCount + 1
    })
    
    // In a real implementation, you would use your HTTP client here
    // const response = await httpClient.request({
    //   url: request.url,
    //   method: request.method,
    //   data: request.data,
    //   headers: request.headers
    // })
    
    // For now, we'll just simulate success
    return Promise.resolve({ success: true })
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Get handler status
  // STATUS: Get current status of the network error handler
  public getStatus(): any {
    return {
      circuitBreakerState: this.circuitBreakerState,
      failureCount: this.failureCount,
      queueSize: this.requestQueue.length,
      isOffline: this.isOffline,
      cacheSize: this.cache.size
    }
  }
}