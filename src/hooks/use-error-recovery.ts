/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error recovery hook implementation
 * ERROR RECOVERY HOOK: React hook for comprehensive error recovery management
 * 
 * Error Recovery Hook - React Hook for Error Management
 * Custom React hook providing error recovery functionality
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through intelligent error recovery
 * HOOK INTEGRATION: React hook pattern for seamless error recovery integration
 * ROYAL CLIENT PROTECTION: Premium error recovery maintaining service continuity
 * 
 * FEATURES:
 * - Automatic error detection and classification
 * - Intelligent retry strategies with exponential backoff
 * - Graceful fallback mechanisms
 * - Error reporting and analytics integration
 * - Recovery state management
 * - User-friendly error messaging
 */

'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { NetworkErrorHandler } from '../lib/error-handling/NetworkErrorHandler'
import { 
  createErrorReport,
  formatErrorMessage,
  isRetryableError,
  calculateRetryDelay,
  getErrorSeverity,
  getErrorCategory,
  logError
} from '../components/error-boundary/utils'

import type {
  ErrorHandlingResult,
  ErrorRecoveryPlan,
  RetryConfig,
  FAQErrorContext
} from '../lib/error-handling/types'

// CONTEXT7 SOURCE: /context7/react_dev - Error recovery hook configuration
// HOOK CONFIG: Configuration interface for error recovery hook
interface UseErrorRecoveryConfig {
  maxRetries?: number
  retryDelay?: number
  exponentialBackoff?: boolean
  enableFallback?: boolean
  enableReporting?: boolean
  enableAnalytics?: boolean
  autoRetry?: boolean
  component?: string
  feature?: string
  onError?: (error: Error, context?: any) => void
  onRecovery?: (plan: ErrorRecoveryPlan) => void
  onRetrySuccess?: () => void
  onMaxRetriesReached?: () => void
}

// CONTEXT7 SOURCE: /context7/react_dev - Error recovery hook state
// HOOK STATE: State interface for error recovery hook
interface ErrorRecoveryState {
  error: Error | null
  isRecovering: boolean
  retryCount: number
  hasRecovered: boolean
  fallbackActive: boolean
  lastErrorTime: number
  recoveryPlan: ErrorRecoveryPlan | null
  errorMessage: string | null
  canRetry: boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Error recovery hook return type
// HOOK RETURN: Return type interface for error recovery hook
interface UseErrorRecoveryReturn {
  // State
  error: Error | null
  isRecovering: boolean
  retryCount: number
  hasRecovered: boolean
  fallbackActive: boolean
  errorMessage: string | null
  canRetry: boolean
  recoveryPlan: ErrorRecoveryPlan | null

  // Actions
  handleError: (error: Error, context?: any) => Promise<ErrorHandlingResult>
  retry: () => Promise<void>
  clearError: () => void
  activateFallback: () => void
  reportError: (error: Error, context?: any) => void

  // Utilities
  formatError: (error: Error) => string
  isRetryable: (error: Error) => boolean
  getErrorInfo: (error: Error) => { category: string; severity: string }
}

/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error recovery hook implementation
 * ERROR RECOVERY HOOK: Comprehensive error recovery management hook
 */
export function useErrorRecovery(config: UseErrorRecoveryConfig = {}): UseErrorRecoveryReturn {
  // CONTEXT7 SOURCE: /context7/react_dev - Error recovery hook state
  // STATE MANAGEMENT: Comprehensive state management for error recovery
  const [state, setState] = useState<ErrorRecoveryState>({
    error: null,
    isRecovering: false,
    retryCount: 0,
    hasRecovered: false,
    fallbackActive: false,
    lastErrorTime: 0,
    recoveryPlan: null,
    errorMessage: null,
    canRetry: false
  })

  // CONTEXT7 SOURCE: /context7/react_dev - Hook configuration with defaults
  // CONFIG: Default configuration with override support
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
    ...config
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Network error handler integration
  // NETWORK HANDLER: Network error handler for API errors
  const networkHandler = useRef<NetworkErrorHandler | null>(null)
  const retryTimeout = useRef<NodeJS.Timeout | null>(null)

  // Initialize network handler
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
        nonRetryableErrors: ['ValidationError', 'PermissionError']
      },
      timeoutConfig: {
        request: 30000,
        response: 30000,
        idle: 60000
      },
      circuitBreaker: {
        enabled: true,
        failureThreshold: 5,
        resetTimeout: 60000,
        monitoringPeriod: 300000
      },
      cache: {
        enabled: true,
        ttl: 300000,
        maxSize: 50,
        fallbackToCache: true
      },
      offline: {
        detection: true,
        fallbackMode: 'cache',
        syncOnReconnect: true
      }
    })
  }, [effectiveConfig.maxRetries, effectiveConfig.retryDelay, effectiveConfig.exponentialBackoff])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current)
      }
    }
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - Main error handling function
  // ERROR HANDLING: Primary error handling with recovery strategies
  const handleError = useCallback(async (error: Error, context?: any): Promise<ErrorHandlingResult> => {
    const timestamp = Date.now()
    const category = getErrorCategory(error)
    const severity = getErrorSeverity(error)
    const canRetry = isRetryableError(error)
    const errorMessage = formatErrorMessage(error)

    logError(error, { 
      context: { 
        ...context, 
        component: effectiveConfig.component, 
        feature: effectiveConfig.feature 
      } 
    })

    // Update state
    setState(prev => ({
      ...prev,
      error,
      lastErrorTime: timestamp,
      errorMessage,
      canRetry: canRetry && prev.retryCount < effectiveConfig.maxRetries,
      isRecovering: false,
      fallbackActive: false
    }))

    // Call error callback
    effectiveConfig.onError(error, context)

    // Report error if enabled
    if (effectiveConfig.enableReporting) {
      await reportErrorInternal(error, context)
    }

    try {
      // Try network handler first for network errors
      if (networkHandler.current && networkHandler.current.canHandle(error)) {
        const result = await networkHandler.current.handle(error, context)
        
        if (result.success || result.action === 'fallback') {
          if (result.action === 'fallback') {
            setState(prev => ({ ...prev, fallbackActive: true }))
          }
          return result
        }

        // If network handler suggests retry, handle it
        if (result.action === 'retry') {
          if (effectiveConfig.autoRetry && state.retryCount < effectiveConfig.maxRetries) {
            scheduleRetry(result.data?.delay || effectiveConfig.retryDelay)
          }
          return result
        }
      }

      // Handle other types of errors
      return await handleGenericError(error, context, category, severity, canRetry)

    } catch (handlingError) {
      logError(handlingError as Error, { 
        context: 'Error recovery hook handling failed', 
        originalError: error 
      })
      
      return {
        success: false,
        action: 'escalate',
        message: 'Error recovery failed',
        data: { originalError: error, handlingError }
      }
    }
  }, [state.retryCount, effectiveConfig])

  // CONTEXT7 SOURCE: /context7/react_dev - Generic error handling
  // GENERIC HANDLING: Handle non-network errors with appropriate strategies
  const handleGenericError = useCallback(async (
    error: Error, 
    context: any, 
    category: string, 
    severity: string, 
    canRetry: boolean
  ): Promise<ErrorHandlingResult> => {
    // Create recovery plan
    const recoveryPlan: ErrorRecoveryPlan = {
      id: `recovery_${Date.now()}`,
      name: `${category} Error Recovery`,
      description: `Recovery plan for ${category} error`,
      steps: [],
      priority: severity === 'critical' ? 1 : severity === 'high' ? 2 : 3,
      estimatedDuration: canRetry ? 5000 : 1000,
      requiresUserAction: false,
      affectedFeatures: [effectiveConfig.feature],
      fallbackOptions: []
    }

    // Add recovery steps based on error category
    if (category === 'ui' || category === 'component') {
      recoveryPlan.steps.push({
        id: 'component_retry',
        name: 'Component Retry',
        description: 'Retry component rendering',
        action: 'retry',
        timeout: 3000,
        canSkip: false
      })
      
      if (effectiveConfig.enableFallback) {
        recoveryPlan.fallbackOptions.push('Fallback UI', 'Minimal interface')
      }
    }

    if (category === 'search') {
      recoveryPlan.steps.push({
        id: 'search_fallback',
        name: 'Search Fallback',
        description: 'Use basic search functionality',
        action: 'retry',
        timeout: 2000,
        canSkip: true
      })
      recoveryPlan.fallbackOptions.push('Basic text search', 'Category browsing')
    }

    if (category === 'validation') {
      recoveryPlan.requiresUserAction = true
      recoveryPlan.steps.push({
        id: 'validation_fix',
        name: 'Fix Input',
        description: 'User needs to correct input',
        action: 'notify',
        canSkip: false
      })
    }

    setState(prev => ({ ...prev, recoveryPlan }))
    effectiveConfig.onRecovery(recoveryPlan)

    // Determine action based on error characteristics
    if (!canRetry || state.retryCount >= effectiveConfig.maxRetries) {
      if (effectiveConfig.enableFallback) {
        return {
          success: false,
          action: 'fallback',
          message: 'Activating fallback mode',
          recoveryPlan
        }
      }
      
      return {
        success: false,
        action: 'escalate',
        message: 'Error cannot be recovered automatically',
        recoveryPlan
      }
    }

    // Schedule retry if auto-retry is enabled
    if (effectiveConfig.autoRetry) {
      const delay = calculateRetryDelay(
        state.retryCount + 1,
        effectiveConfig.retryDelay,
        30000,
        2
      )
      scheduleRetry(delay)
    }

    return {
      success: false,
      action: 'retry',
      message: `Will retry in ${Math.round(effectiveConfig.retryDelay / 1000)} seconds`,
      recoveryPlan
    }
  }, [state.retryCount, effectiveConfig])

  // CONTEXT7 SOURCE: /context7/react_dev - Scheduled retry logic
  // RETRY SCHEDULING: Schedule retry with delay
  const scheduleRetry = useCallback((delay: number) => {
    setState(prev => ({ ...prev, isRecovering: true }))
    
    retryTimeout.current = setTimeout(() => {
      retry()
    }, delay)
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - Manual retry function
  // MANUAL RETRY: User-initiated retry functionality
  const retry = useCallback(async () => {
    if (!state.error || state.retryCount >= effectiveConfig.maxRetries) {
      return
    }

    setState(prev => ({
      ...prev,
      isRecovering: true,
      retryCount: prev.retryCount + 1
    }))

    try {
      // Clear the error to trigger re-render/re-execution
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          error: null,
          isRecovering: false,
          hasRecovered: true,
          errorMessage: null
        }))

        effectiveConfig.onRetrySuccess()
      }, 100)

    } catch (retryError) {
      logError(retryError as Error, { context: 'Retry failed' })
      
      setState(prev => ({
        ...prev,
        isRecovering: false
      }))

      // Check if max retries reached
      if (state.retryCount + 1 >= effectiveConfig.maxRetries) {
        effectiveConfig.onMaxRetriesReached()
        
        if (effectiveConfig.enableFallback) {
          activateFallback()
        }
      }
    }
  }, [state.error, state.retryCount, effectiveConfig])

  // CONTEXT7 SOURCE: /context7/react_dev - Fallback activation
  // FALLBACK ACTIVATION: Activate fallback mode
  const activateFallback = useCallback(() => {
    setState(prev => ({
      ...prev,
      fallbackActive: true,
      isRecovering: false,
      errorMessage: 'Using simplified interface due to technical issues'
    }))
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - Clear error state
  // CLEAR ERROR: Reset error state
  const clearError = useCallback(() => {
    if (retryTimeout.current) {
      clearTimeout(retryTimeout.current)
      retryTimeout.current = null
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
      canRetry: false
    })
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - Error reporting function
  // ERROR REPORTING: Report errors to monitoring system
  const reportErrorInternal = useCallback(async (error: Error, context?: any) => {
    try {
      const errorReport = createErrorReport(
        error,
        { componentStack: context?.componentStack },
        effectiveConfig.component,
        context as FAQErrorContext
      )

      // Send to monitoring endpoint
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...errorReport,
          component: effectiveConfig.component,
          feature: effectiveConfig.feature,
          recoveryAttempted: state.retryCount > 0,
          fallbackActive: state.fallbackActive
        })
      })
    } catch (reportingError) {
      logError(reportingError as Error, { context: 'Error reporting failed' })
    }
  }, [effectiveConfig.component, effectiveConfig.feature, state.retryCount, state.fallbackActive])

  // CONTEXT7 SOURCE: /context7/react_dev - Public error reporting
  // PUBLIC REPORTING: Expose error reporting functionality
  const reportError = useCallback((error: Error, context?: any) => {
    if (effectiveConfig.enableReporting) {
      reportErrorInternal(error, context)
    }
  }, [effectiveConfig.enableReporting, reportErrorInternal])

  // CONTEXT7 SOURCE: /context7/react_dev - Utility functions
  // UTILITIES: Helper functions for error handling
  const formatError = useCallback((error: Error): string => {
    return formatErrorMessage(error, process.env.NODE_ENV === 'development')
  }, [])

  const isRetryable = useCallback((error: Error): boolean => {
    return isRetryableError(error)
  }, [])

  const getErrorInfo = useCallback((error: Error) => {
    return {
      category: getErrorCategory(error),
      severity: getErrorSeverity(error)
    }
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - Hook return object
  // RETURN OBJECT: Complete hook interface return
  return {
    // State
    error: state.error,
    isRecovering: state.isRecovering,
    retryCount: state.retryCount,
    hasRecovered: state.hasRecovered,
    fallbackActive: state.fallbackActive,
    errorMessage: state.errorMessage,
    canRetry: state.canRetry,
    recoveryPlan: state.recoveryPlan,

    // Actions
    handleError,
    retry,
    clearError,
    activateFallback,
    reportError,

    // Utilities
    formatError,
    isRetryable,
    getErrorInfo
  }
}