/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error boundary types and interfaces
 * ERROR TYPES: TypeScript interfaces for comprehensive error handling system
 * 
 * Error Boundary Types - Type Definitions for Error Management
 * TypeScript interfaces and types for enterprise-grade error handling
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through type-safe error handling
 * TYPE SAFETY: Comprehensive TypeScript types preventing runtime error boundary failures
 * ROYAL CLIENT PROTECTION: Premium type safety maintaining client trust and service reliability
 */

import { ReactNode, ErrorInfo } from 'react'

// CONTEXT7 SOURCE: /context7/react_dev - Error boundary component props interface
// ERROR BOUNDARY PROPS: Component configuration interface for error boundaries
export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode)
  level: 'global' | 'page' | 'component' | 'faq' | 'search'
  componentName?: string
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  onRecovery?: () => void
  maxRetries?: number
  autoRetry?: boolean
  retryDelay?: number
  showErrorDetails?: boolean
  enableReporting?: boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Error boundary state interface
// ERROR STATE: Component state management for error boundaries
export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error | null
  errorInfo?: ErrorInfo | null
  errorId: string
  retryCount: number
  isRetrying: boolean
  lastErrorTime: number
  recoveryAttempted: boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Error reporting interface for monitoring systems
// ERROR REPORTING: Structured error data for monitoring and analytics
export interface ErrorReport {
  errorId: string
  timestamp: string
  level: string
  component: string
  message: string
  stack?: string
  componentStack?: string
  userAgent: string
  url: string
  userId?: string
  sessionId: string
  buildVersion: string
  environment: 'development' | 'staging' | 'production'
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'component' | 'network' | 'authentication' | 'data' | 'ui' | 'search' | 'unknown'
  context?: Record<string, any>
  businessImpact?: 'none' | 'low' | 'medium' | 'high' | 'revenue_critical'
  clientType?: 'royal' | 'standard' | 'visitor'
}

// CONTEXT7 SOURCE: /context7/react_dev - Error recovery configuration interface
// RECOVERY OPTIONS: Configuration for error recovery strategies
export interface ErrorRecoveryOptions {
  maxRetries: number
  retryDelay: number
  exponentialBackoff: boolean
  backoffMultiplier: number
  maxRetryDelay: number
  autoRetry: boolean
  retryableErrors: string[]
  nonRetryableErrors: string[]
  fallbackComponent?: ReactNode
  onRetryAttempt?: (attemptNumber: number) => void
  onRetrySuccess?: () => void
  onRetryFailure?: (error: Error) => void
  onMaxRetriesReached?: () => void
}

// CONTEXT7 SOURCE: /context7/react_dev - Error classification and handling types
// ERROR CLASSIFICATION: Types for categorising and handling different error types
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

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
  | 'unknown'

export type BusinessImpact = 
  | 'none' 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'revenue_critical'

export type ClientType = 'royal' | 'standard' | 'visitor'

// CONTEXT7 SOURCE: /context7/react_dev - Error handler function types
// ERROR HANDLERS: Function type definitions for error handling callbacks
export type ErrorHandler = (error: Error, errorInfo: ErrorInfo) => void

export type RecoveryHandler = () => void | Promise<void>

export type RetryHandler = (attemptNumber: number) => void | Promise<void>

// CONTEXT7 SOURCE: /context7/react_dev - FAQ-specific error types
// FAQ ERROR TYPES: Error types specific to FAQ system functionality
export interface FAQErrorContext {
  searchQuery?: string
  categoryId?: string
  questionId?: string
  filters?: Record<string, any>
  searchResults?: any[]
  userType?: ClientType
  feature?: 'search' | 'voice' | 'visual' | 'recommendation' | 'theme' | 'analytics'
}

// CONTEXT7 SOURCE: /context7/react_dev - Network error types for API handling
// NETWORK ERROR TYPES: Types for handling network and API errors
export interface NetworkError extends Error {
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

// CONTEXT7 SOURCE: /context7/react_dev - Validation error types
// VALIDATION ERROR TYPES: Types for handling validation and form errors
export interface ValidationError extends Error {
  field?: string
  value?: any
  constraint?: string
  validationType?: 'required' | 'format' | 'length' | 'range' | 'custom'
}

// CONTEXT7 SOURCE: /context7/react_dev - Permission error types
// PERMISSION ERROR TYPES: Types for handling access and permission errors
export interface PermissionError extends Error {
  requiredPermission?: string
  userRole?: string
  resource?: string
  action?: string
}

// CONTEXT7 SOURCE: /context7/react_dev - Error boundary hook return type
// HOOK RETURN TYPE: Return type for useErrorHandler hook
export interface UseErrorHandlerReturn {
  handleError: (error: Error) => void
  resetError: () => void
  hasError: boolean
  error: Error | null
}

// CONTEXT7 SOURCE: /context7/react_dev - Error monitoring configuration
// MONITORING CONFIG: Configuration for error monitoring and reporting
export interface ErrorMonitoringConfig {
  enabled: boolean
  apiEndpoint?: string
  apiKey?: string
  environment: 'development' | 'staging' | 'production'
  sampleRate: number
  enableConsoleLogging: boolean
  enablePerformanceTracking: boolean
  maxReportsPerSession: number
  reportingDelay: number
  excludeErrors: string[]
  includeContext: boolean
  enableUserTracking: boolean
  enableBreadcrumbs: boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Error analytics types
// ANALYTICS TYPES: Types for error analytics and reporting
export interface ErrorAnalytics {
  totalErrors: number
  errorsByCategory: Record<ErrorCategory, number>
  errorsBySeverity: Record<ErrorSeverity, number>
  errorsByComponent: Record<string, number>
  averageRecoveryTime: number
  successfulRecoveries: number
  failedRecoveries: number
  userImpact: {
    royal: number
    standard: number
    visitor: number
  }
  businessImpact: {
    revenueAffected: number
    conversionsLost: number
    sessionAbandonment: number
  }
}