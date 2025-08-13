/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error handling utility functions
 * ERROR UTILITIES: Comprehensive error handling utility functions
 * 
 * Error Boundary Utilities - Error Classification and Management
 * Utility functions for enterprise-grade error handling and recovery
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through intelligent error handling
 * ERROR CLASSIFICATION: Smart error categorisation preventing revenue loss
 * ROYAL CLIENT PROTECTION: Premium error handling utilities maintaining client trust
 */

import type { 
  ErrorReport, 
  ErrorSeverity, 
  ErrorCategory, 
  BusinessImpact,
  ClientType,
  NetworkError,
  ValidationError,
  PermissionError,
  FAQErrorContext
} from './types'

// CONTEXT7 SOURCE: /context7/react_dev - Error report creation utility
// ERROR REPORT CREATION: Generate structured error reports for monitoring
export function createErrorReport(
  error: Error,
  errorInfo: { componentStack?: string },
  component: string = 'Unknown',
  context?: FAQErrorContext
): ErrorReport {
  const errorId = generateErrorId()
  const severity = getErrorSeverity(error)
  const category = getErrorCategory(error)
  const businessImpact = getBusinessImpact(error, context)
  
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
    userId: getUserId()
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Error severity classification
// SEVERITY CLASSIFICATION: Determine error severity for prioritisation
export function getErrorSeverity(error: Error): ErrorSeverity {
  // Critical errors that affect core functionality
  if (
    error.message.includes('ChunkLoadError') ||
    error.message.includes('Loading chunk') ||
    error.message.includes('Authentication') ||
    error.message.includes('Network request failed') ||
    error.name === 'ChunkLoadError'
  ) {
    return 'critical'
  }
  
  // High severity errors affecting user experience
  if (
    error.message.includes('Search failed') ||
    error.message.includes('Data fetch failed') ||
    error.message.includes('API error') ||
    error.name === 'NetworkError' ||
    error.name === 'TimeoutError'
  ) {
    return 'high'
  }
  
  // Medium severity errors with fallback options
  if (
    error.message.includes('Feature unavailable') ||
    error.message.includes('Component error') ||
    error.message.includes('Validation failed') ||
    error.name === 'ValidationError'
  ) {
    return 'medium'
  }
  
  // Low severity errors that don't significantly impact functionality
  return 'low'
}

// CONTEXT7 SOURCE: /context7/react_dev - Error category classification
// CATEGORY CLASSIFICATION: Categorise errors for targeted handling
export function getErrorCategory(error: Error): ErrorCategory {
  const message = error.message.toLowerCase()
  const name = error.name.toLowerCase()
  
  // Network and API errors
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('api') ||
    message.includes('request') ||
    name.includes('network') ||
    (error as NetworkError).isNetworkError
  ) {
    return 'network'
  }
  
  // Authentication and permission errors
  if (
    message.includes('auth') ||
    message.includes('permission') ||
    message.includes('forbidden') ||
    message.includes('unauthorized') ||
    name.includes('permission')
  ) {
    return 'authentication'
  }
  
  // Search-related errors
  if (
    message.includes('search') ||
    message.includes('query') ||
    message.includes('filter') ||
    message.includes('voice search') ||
    message.includes('visual search')
  ) {
    return 'search'
  }
  
  // UI component errors
  if (
    message.includes('render') ||
    message.includes('component') ||
    message.includes('jsx') ||
    message.includes('react')
  ) {
    return 'ui'
  }
  
  // Data and validation errors
  if (
    message.includes('validation') ||
    message.includes('invalid') ||
    message.includes('parse') ||
    message.includes('format') ||
    name.includes('validation')
  ) {
    return 'validation'
  }
  
  // Timeout errors
  if (
    message.includes('timeout') ||
    message.includes('timed out') ||
    (error as NetworkError).isTimeout
  ) {
    return 'timeout'
  }
  
  return 'unknown'
}

// CONTEXT7 SOURCE: /context7/react_dev - Business impact assessment
// BUSINESS IMPACT: Assess potential revenue impact of errors
export function getBusinessImpact(error: Error, context?: FAQErrorContext): BusinessImpact {
  const severity = getErrorSeverity(error)
  const category = getErrorCategory(error)
  const clientType = context?.userType || getClientType()
  
  // Revenue critical errors for royal clients
  if (clientType === 'royal' && (severity === 'critical' || severity === 'high')) {
    return 'revenue_critical'
  }
  
  // High impact errors affecting core functionality
  if (
    category === 'search' && severity === 'critical' ||
    category === 'authentication' && severity === 'high' ||
    category === 'network' && severity === 'critical'
  ) {
    return 'high'
  }
  
  // Medium impact errors with workarounds
  if (
    severity === 'high' ||
    (severity === 'medium' && (category === 'search' || category === 'ui'))
  ) {
    return 'medium'
  }
  
  // Low impact errors
  if (severity === 'medium' || severity === 'low') {
    return 'low'
  }
  
  return 'none'
}

// CONTEXT7 SOURCE: /context7/react_dev - Retryable error detection
// RETRY LOGIC: Determine if error is retryable with backoff
export function isRetryableError(error: Error): boolean {
  const networkError = error as NetworkError
  const category = getErrorCategory(error)
  
  // Network errors that might be temporary
  if (category === 'network' && networkError.status) {
    // Retry on server errors and rate limiting
    return networkError.status >= 500 || networkError.status === 429
  }
  
  // Timeout errors are usually retryable
  if (category === 'timeout' || networkError.isTimeout) {
    return true
  }
  
  // Component errors might be retryable
  if (category === 'ui' || category === 'component') {
    return true
  }
  
  // Don't retry authentication, validation, or permission errors
  if (
    category === 'authentication' || 
    category === 'validation' || 
    category === 'permission'
  ) {
    return false
  }
  
  // Don't retry client errors (4xx except 429)
  if (networkError.status && networkError.status >= 400 && networkError.status < 500 && networkError.status !== 429) {
    return false
  }
  
  return true
}

// CONTEXT7 SOURCE: /context7/react_dev - Error message formatting
// MESSAGE FORMATTING: Format user-friendly error messages
export function formatErrorMessage(error: Error, showDetails: boolean = false): string {
  const category = getErrorCategory(error)
  const severity = getErrorSeverity(error)
  
  // User-friendly messages based on error category
  const friendlyMessages: Record<ErrorCategory, string> = {
    network: "We're having trouble connecting to our servers. Please check your internet connection and try again.",
    authentication: "There's an issue with your authentication. Please try logging in again.",
    search: "The search feature is temporarily unavailable. Please try again in a moment.",
    ui: "A display issue occurred. The page will refresh automatically.",
    api: "Our service is temporarily unavailable. We're working to resolve this quickly.",
    data: "There's an issue loading your data. Please refresh and try again.",
    validation: "Please check the information you've entered and try again.",
    permission: "You don't have permission to access this feature.",
    timeout: "The request is taking longer than expected. Please try again.",
    unknown: "An unexpected error occurred. Please try again."
  }
  
  let message = friendlyMessages[category] || friendlyMessages.unknown
  
  // Add severity context for critical errors
  if (severity === 'critical') {
    message += " If this problem persists, please contact our support team immediately."
  } else if (severity === 'high') {
    message += " If you continue experiencing issues, please contact support."
  }
  
  // Add technical details in development or when explicitly requested
  if (showDetails && (getEnvironment() === 'development' || showDetails)) {
    message += `\n\nTechnical details: ${error.message}`
  }
  
  return message
}

// CONTEXT7 SOURCE: /context7/react_dev - Error details display logic
// DISPLAY LOGIC: Determine when to show detailed error information
export function shouldShowErrorDetails(error: Error): boolean {
  const environment = getEnvironment()
  
  // Always show details in development
  if (environment === 'development') {
    return true
  }
  
  // Show details for critical errors in staging
  if (environment === 'staging' && getErrorSeverity(error) === 'critical') {
    return true
  }
  
  // Hide details in production for security
  return false
}

// CONTEXT7 SOURCE: /context7/react_dev - Error context sanitisation
// CONTEXT SANITISATION: Remove sensitive data from error context
export function sanitiseErrorContext(context: FAQErrorContext): FAQErrorContext {
  // Remove potentially sensitive information
  const sanitised = { ...context }
  
  // Keep only necessary context information
  if (sanitised.searchQuery && sanitised.searchQuery.length > 100) {
    sanitised.searchQuery = sanitised.searchQuery.substring(0, 100) + '...'
  }
  
  // Remove user-specific data if present
  delete (sanitised as any).userId
  delete (sanitised as any).sessionId
  delete (sanitised as any).personalInfo
  
  return sanitised
}

// CONTEXT7 SOURCE: /context7/react_dev - Utility functions for error reporting
// UTILITY FUNCTIONS: Helper functions for error ID generation and environment detection

function generateErrorId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `error_${timestamp}_${random}`
}

function getSessionId(): string {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    let sessionId = sessionStorage.getItem('error-session-id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
      sessionStorage.setItem('error-session-id', sessionId)
    }
    return sessionId
  }
  return 'server_session'
}

function getBuildVersion(): string {
  // In a real app, this would come from build process or environment
  return process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0'
}

function getEnvironment(): 'development' | 'staging' | 'production' {
  return (process.env.NODE_ENV as any) || 'development'
}

function getClientType(): ClientType {
  // In a real app, this would come from user session or authentication
  if (typeof window !== 'undefined') {
    const userType = localStorage.getItem('clientType')
    if (userType === 'royal' || userType === 'standard') {
      return userType as ClientType
    }
  }
  return 'visitor'
}

function getUserId(): string | undefined {
  // In a real app, this would come from authentication context
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId') || undefined
  }
  return undefined
}

// CONTEXT7 SOURCE: /context7/react_dev - Exponential backoff calculation
// BACKOFF CALCULATION: Calculate retry delays with exponential backoff
export function calculateRetryDelay(
  attemptNumber: number,
  baseDelay: number = 1000,
  maxDelay: number = 30000,
  multiplier: number = 2
): number {
  const delay = Math.min(baseDelay * Math.pow(multiplier, attemptNumber - 1), maxDelay)
  // Add jitter to prevent thundering herd
  const jitter = Math.random() * 0.1 * delay
  return Math.floor(delay + jitter)
}

// CONTEXT7 SOURCE: /context7/react_dev - Error logging utility
// ERROR LOGGING: Structured error logging for development and monitoring
export function logError(error: Error, context?: any): void {
  const environment = getEnvironment()
  
  if (environment === 'development') {
    console.group('🚨 Error Boundary Caught Error')
    console.error('Error:', error)
    console.error('Stack:', error.stack)
    if (context) {
      console.error('Context:', context)
    }
    console.groupEnd()
  } else {
    // In production, use structured logging
    console.error('Error occurred:', {
      message: error.message,
      name: error.name,
      timestamp: new Date().toISOString(),
      context: context ? sanitiseErrorContext(context) : undefined
    })
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Network error detection utility
// NETWORK ERROR: Detect and classify network-related errors
export function isNetworkError(error: Error): boolean {
  const networkError = error as NetworkError
  
  return !!(
    networkError.isNetworkError ||
    error.message.includes('fetch') ||
    error.message.includes('network') ||
    error.message.includes('Failed to fetch') ||
    networkError.status >= 500 ||
    networkError.code === 'NETWORK_ERROR'
  )
}

// CONTEXT7 SOURCE: /context7/react_dev - Timeout error detection utility
// TIMEOUT ERROR: Detect timeout-related errors
export function isTimeoutError(error: Error): boolean {
  const networkError = error as NetworkError
  
  return !!(
    networkError.isTimeout ||
    error.message.includes('timeout') ||
    error.message.includes('timed out') ||
    networkError.code === 'ECONNABORTED'
  )
}