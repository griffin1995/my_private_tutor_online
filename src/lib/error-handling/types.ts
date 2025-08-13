/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error handling strategy type definitions
 * ERROR HANDLING TYPES: Comprehensive type definitions for error handling system
 * 
 * Error Handling Types - Type Safety for Error Management
 * TypeScript interfaces for enterprise-grade error handling strategies
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through type-safe error handling
 * TYPE SAFETY: Comprehensive error handling types preventing runtime failures
 * ROYAL CLIENT PROTECTION: Premium type safety maintaining service reliability
 */

import { ReactNode } from 'react'

// CONTEXT7 SOURCE: /context7/react_dev - Error handling strategy interface
// ERROR STRATEGY: Core error handling strategy configuration
export interface ErrorHandlingStrategy {
  name: string
  priority: number
  canHandle: (error: Error) => boolean
  handle: (error: Error, context?: any) => Promise<ErrorHandlingResult>
  fallback?: () => ReactNode
  retry?: RetryConfig
  recovery?: ErrorRecoveryPlan
}

// CONTEXT7 SOURCE: /context7/react_dev - Error handling result interface
// HANDLING RESULT: Result of error handling operation
export interface ErrorHandlingResult {
  success: boolean
  action: 'retry' | 'fallback' | 'escalate' | 'ignore' | 'recover'
  message?: string
  data?: any
  nextStep?: string
  recoveryPlan?: ErrorRecoveryPlan
}

// CONTEXT7 SOURCE: /context7/react_dev - Retry configuration interface
// RETRY CONFIG: Configuration for retry mechanisms
export interface RetryConfig {
  enabled: boolean
  maxAttempts: number
  baseDelay: number
  maxDelay: number
  exponentialBackoff: boolean
  backoffMultiplier: number
  jitter: boolean
  retryableErrors: string[]
  nonRetryableErrors: string[]
  onRetry?: (attempt: number, error: Error) => void
  onSuccess?: () => void
  onFailure?: (error: Error, attempts: number) => void
  onMaxAttemptsReached?: () => void
}

// CONTEXT7 SOURCE: /context7/react_dev - Fallback configuration interface
// FALLBACK CONFIG: Configuration for fallback mechanisms
export interface FallbackConfig {
  enabled: boolean
  strategy: 'component' | 'cached' | 'minimal' | 'redirect' | 'custom'
  component?: ReactNode
  cachedData?: any
  redirectUrl?: string
  customHandler?: (error: Error) => ReactNode
  timeout?: number
  condition?: (error: Error) => boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Error recovery plan interface
// RECOVERY PLAN: Comprehensive error recovery strategy
export interface ErrorRecoveryPlan {
  id: string
  name: string
  description: string
  steps: ErrorRecoveryStep[]
  priority: number
  estimatedDuration: number
  requiresUserAction: boolean
  affectedFeatures: string[]
  fallbackOptions: string[]
}

// CONTEXT7 SOURCE: /context7/react_dev - Error recovery step interface
// RECOVERY STEP: Individual step in recovery process
export interface ErrorRecoveryStep {
  id: string
  name: string
  description: string
  action: 'retry' | 'reset' | 'reload' | 'clear' | 'redirect' | 'notify' | 'custom'
  parameters?: Record<string, any>
  timeout?: number
  canSkip: boolean
  onSuccess?: () => void
  onFailure?: (error: Error) => void
  customHandler?: (step: ErrorRecoveryStep) => Promise<boolean>
}

// CONTEXT7 SOURCE: /context7/react_dev - Error handler options interface
// HANDLER OPTIONS: Configuration for error handler creation
export interface ErrorHandlerOptions {
  strategies: ErrorHandlingStrategy[]
  enableRetry: boolean
  enableFallback: boolean
  enableRecovery: boolean
  enableReporting: boolean
  enableAnalytics: boolean
  defaultStrategy?: string
  timeout?: number
  context?: any
  onError?: (error: Error, context?: any) => void
  onRecovery?: (plan: ErrorRecoveryPlan) => void
  onFallback?: (fallback: FallbackConfig) => void
}

// CONTEXT7 SOURCE: /context7/react_dev - Network error handler interface
// NETWORK HANDLER: Network-specific error handling configuration
export interface NetworkErrorHandlerConfig {
  retryConfig: RetryConfig
  timeoutConfig: {
    request: number
    response: number
    idle: number
  }
  circuitBreaker: {
    enabled: boolean
    failureThreshold: number
    resetTimeout: number
    monitoringPeriod: number
  }
  cache: {
    enabled: boolean
    ttl: number
    maxSize: number
    fallbackToCache: boolean
  }
  offline: {
    detection: boolean
    fallbackMode: 'cache' | 'minimal' | 'notify'
    syncOnReconnect: boolean
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - FAQ error handler interface
// FAQ HANDLER: FAQ-specific error handling configuration
export interface FAQErrorHandlerConfig {
  search: {
    enableFallback: boolean
    fallbackToBasic: boolean
    cacheResults: boolean
    maxRetries: number
  }
  voice: {
    fallbackToText: boolean
    enableOfflineMode: boolean
    browserCompatibility: boolean
  }
  visual: {
    fallbackMethods: string[]
    enableOCR: boolean
    processTimeout: number
  }
  recommendations: {
    enableFallback: boolean
    useStaticFallback: boolean
    degradeGracefully: boolean
  }
  theme: {
    fallbackToDefault: boolean
    preserveUserPreference: boolean
    enableSystemTheme: boolean
  }
  analytics: {
    enableErrorTracking: boolean
    enablePerformanceTracking: boolean
    sampleRate: number
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Error monitoring configuration interface
// MONITORING CONFIG: Error monitoring and tracking configuration
export interface ErrorMonitoringConfig {
  enabled: boolean
  endpoint?: string
  apiKey?: string
  environment: 'development' | 'staging' | 'production'
  sampleRate: number
  enableConsoleLogging: boolean
  enablePerformanceTracking: boolean
  enableUserTracking: boolean
  enableBreadcrumbs: boolean
  maxReportsPerSession: number
  reportingDelay: number
  excludeErrors: string[]
  includeContext: boolean
  privacy: {
    scrubSensitiveData: boolean
    excludePersonalInfo: boolean
    hashUserIdentifiers: boolean
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Error analytics interface
// ERROR ANALYTICS: Error analytics and reporting types
export interface ErrorAnalyticsData {
  errorId: string
  timestamp: number
  category: string
  severity: string
  component: string
  message: string
  stack?: string
  context?: Record<string, any>
  userAgent: string
  url: string
  userId?: string
  sessionId: string
  buildVersion: string
  environment: string
  clientType: string
  businessImpact: string
  recoveryAttempts: number
  recoverySuccess: boolean
  fallbackUsed: boolean
  userJourney: string[]
  performanceMetrics?: {
    timeToError: number
    timeToRecovery?: number
    memoryUsage?: number
    cpuUsage?: number
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Error tracking metrics interface
// TRACKING METRICS: Error tracking and monitoring metrics
export interface ErrorTrackingMetrics {
  totalErrors: number
  errorsByCategory: Record<string, number>
  errorsBySeverity: Record<string, number>
  errorsByComponent: Record<string, number>
  errorsByUserType: Record<string, number>
  recoverySuccessRate: number
  fallbackUsageRate: number
  averageRecoveryTime: number
  businessImpactMetrics: {
    revenueAffected: number
    conversionsLost: number
    sessionAbandonment: number
    supportTicketsCreated: number
  }
  performanceMetrics: {
    errorRate: number
    errorRateByEndpoint: Record<string, number>
    timeToFirstError: number
    errorFrequency: Record<string, number>
  }
  userExperience: {
    userFrustrationIndex: number
    taskCompletionImpact: number
    featureAvailabilityRate: number
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Circuit breaker state types
// CIRCUIT BREAKER: Circuit breaker pattern implementation types
export type CircuitBreakerState = 'closed' | 'open' | 'half-open'

export interface CircuitBreakerConfig {
  enabled: boolean
  failureThreshold: number
  resetTimeout: number
  monitoringPeriod: number
  halfOpenMaxCalls: number
  onStateChange?: (state: CircuitBreakerState) => void
  onFailure?: (error: Error) => void
  onSuccess?: () => void
}

// CONTEXT7 SOURCE: /context7/react_dev - Graceful degradation types
// GRACEFUL DEGRADATION: Types for graceful service degradation
export interface GracefulDegradationConfig {
  enabled: boolean
  levels: DegradationLevel[]
  triggers: DegradationTrigger[]
  recovery: {
    automatic: boolean
    checkInterval: number
    healthThreshold: number
  }
}

export interface DegradationLevel {
  id: string
  name: string
  description: string
  disabledFeatures: string[]
  fallbackComponents: Record<string, ReactNode>
  userMessage: string
  priority: number
}

export interface DegradationTrigger {
  type: 'error_rate' | 'response_time' | 'resource_usage' | 'custom'
  threshold: number
  duration: number
  condition?: (metrics: any) => boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Error context types
// ERROR CONTEXT: Context information for error handling
export interface ErrorContext {
  component: string
  action: string
  feature: string
  userType: string
  sessionId: string
  timestamp: number
  userJourney: string[]
  metadata?: Record<string, any>
}