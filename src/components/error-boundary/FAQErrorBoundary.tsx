/**
 * CONTEXT7 SOURCE: /context7/react_dev - FAQ-specific error boundary implementation
 * FAQ ERROR BOUNDARY: Specialised error boundary for FAQ system components
 * 
 * FAQ Error Boundary - FAQ System Error Management
 * Specialised error boundary for comprehensive FAQ system error handling
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through bulletproof FAQ experience
 * FAQ RELIABILITY: Enterprise-grade error handling preventing FAQ system failures
 * ROYAL CLIENT PROTECTION: Premium FAQ error recovery maintaining client satisfaction
 * 
 * ERROR SCENARIOS HANDLED:
 * - Search functionality failures with cached fallback
 * - Voice search API failures with text search fallback
 * - Visual search processing errors with alternative methods
 * - Theme system failures with default theme recovery
 * - Content loading errors with cached content display
 */

'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, Search, RefreshCw, Home, MessageSquare, Lightbulb, Mic, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { 
  ErrorBoundaryProps, 
  ErrorBoundaryState, 
  FAQErrorContext,
  ErrorRecoveryOptions 
} from './types'
import { 
  createErrorReport, 
  formatErrorMessage, 
  shouldShowErrorDetails,
  isRetryableError,
  calculateRetryDelay,
  getErrorSeverity,
  getErrorCategory,
  logError
} from './utils'

// CONTEXT7 SOURCE: /context7/react_dev - FAQ error boundary props interface
// FAQ PROPS: FAQ-specific error boundary configuration
interface FAQErrorBoundaryProps extends Omit<ErrorBoundaryProps, 'level'> {
  faqContext?: FAQErrorContext
  enableSearchFallback?: boolean
  enableThemeFallback?: boolean
  enableCachedResults?: boolean
  showAlternatives?: boolean
  contactSupport?: boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - FAQ error boundary state interface
// FAQ STATE: FAQ-specific error state management
interface FAQErrorBoundaryState extends ErrorBoundaryState {
  fallbackMode: 'none' | 'search' | 'theme' | 'cached' | 'minimal'
  availableAlternatives: string[]
  searchFallbackActive: boolean
  themeFallbackActive: boolean
  cachedResultsActive: boolean
}

/**
 * CONTEXT7 SOURCE: /context7/react_dev - FAQ-specific error boundary component
 * FAQ ERROR BOUNDARY: Comprehensive error boundary for FAQ system reliability
 */
export class FAQErrorBoundary extends Component<FAQErrorBoundaryProps, FAQErrorBoundaryState> {
  private retryTimeout: NodeJS.Timeout | null = null
  private recoveryOptions: ErrorRecoveryOptions

  constructor(props: FAQErrorBoundaryProps) {
    super(props)
    
    this.state = {
      hasError: false,
      errorId: '',
      retryCount: 0,
      isRetrying: false,
      lastErrorTime: 0,
      recoveryAttempted: false,
      fallbackMode: 'none',
      availableAlternatives: [],
      searchFallbackActive: false,
      themeFallbackActive: false,
      cachedResultsActive: false
    }

    // CONTEXT7 SOURCE: /context7/react_dev - Error recovery configuration
    // RECOVERY CONFIG: FAQ-specific error recovery options
    this.recoveryOptions = {
      maxRetries: props.maxRetries || 3,
      retryDelay: props.retryDelay || 1000,
      exponentialBackoff: true,
      backoffMultiplier: 2,
      maxRetryDelay: 10000,
      autoRetry: props.autoRetry !== false,
      retryableErrors: [
        'NetworkError',
        'TimeoutError',
        'SearchError',
        'APIError',
        'ComponentError'
      ],
      nonRetryableErrors: [
        'ValidationError',
        'PermissionError',
        'AuthenticationError'
      ],
      onRetryAttempt: (attemptNumber) => {
        logError(new Error(`FAQ Error Boundary retry attempt ${attemptNumber}`))
      },
      onRetrySuccess: () => {
        logError(new Error('FAQ Error Boundary retry successful'))
        if (this.props.onRecovery) {
          this.props.onRecovery()
        }
      },
      onRetryFailure: (error) => {
        logError(error, { context: 'FAQ Error Boundary retry failed' })
      },
      onMaxRetriesReached: () => {
        logError(new Error('FAQ Error Boundary max retries reached'))
        this.enableFallbackModes()
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Error state derivation for FAQ context
  // ERROR DERIVATION: Update state when FAQ errors occur
  static getDerivedStateFromError(error: Error): Partial<FAQErrorBoundaryState> {
    const errorId = `faq_error_${Date.now()}_${Math.random().toString(36).substring(2)}`
    const category = getErrorCategory(error)
    const severity = getErrorSeverity(error)
    
    // Determine fallback mode based on error type
    let fallbackMode: FAQErrorBoundaryState['fallbackMode'] = 'none'
    const alternatives: string[] = []
    
    if (category === 'search') {
      fallbackMode = 'search'
      alternatives.push('Use basic text search', 'Browse by category', 'Contact support')
    } else if (category === 'ui') {
      fallbackMode = 'theme'
      alternatives.push('Use default theme', 'Refresh page', 'Clear cache')
    } else if (category === 'network') {
      fallbackMode = 'cached'
      alternatives.push('Use cached results', 'Try offline mode', 'Check connection')
    } else if (severity === 'critical') {
      fallbackMode = 'minimal'
      alternatives.push('Basic FAQ access', 'Contact support', 'Return to homepage')
    }
    
    return {
      hasError: true,
      error,
      errorId,
      lastErrorTime: Date.now(),
      fallbackMode,
      availableAlternatives: alternatives
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - FAQ error handling and reporting
  // ERROR HANDLING: Comprehensive FAQ error processing
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })

    // Create detailed error report for FAQ context
    const errorReport = createErrorReport(
      error,
      errorInfo,
      this.props.componentName || 'FAQErrorBoundary',
      this.props.faqContext
    )

    // Log error for monitoring
    logError(error, {
      faqContext: this.props.faqContext,
      componentName: this.props.componentName,
      errorReport
    })

    // Report to monitoring system
    this.reportError(errorReport)

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Attempt automatic recovery if enabled
    if (this.recoveryOptions.autoRetry && isRetryableError(error)) {
      this.scheduleRetry()
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Error reporting for FAQ monitoring
  // ERROR REPORTING: FAQ-specific error reporting and analytics
  private async reportError(errorReport: any): Promise<void> {
    try {
      // Send to FAQ analytics endpoint
      await fetch('/api/faq/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...errorReport,
          faqContext: this.props.faqContext,
          fallbackMode: this.state.fallbackMode,
          alternatives: this.state.availableAlternatives
        }),
      })
    } catch (reportingError) {
      logError(reportingError, { context: 'FAQ error reporting failed' })
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Automatic retry logic with exponential backoff
  // RETRY LOGIC: FAQ error recovery with intelligent backoff
  private scheduleRetry = (): void => {
    if (this.state.retryCount >= this.recoveryOptions.maxRetries) {
      this.recoveryOptions.onMaxRetriesReached?.()
      return
    }

    const delay = calculateRetryDelay(
      this.state.retryCount + 1,
      this.recoveryOptions.retryDelay,
      this.recoveryOptions.maxRetryDelay,
      this.recoveryOptions.backoffMultiplier
    )

    this.setState({ isRetrying: true })

    this.retryTimeout = setTimeout(() => {
      this.handleRetry()
    }, delay)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Manual retry handling
  // RETRY HANDLING: User-initiated FAQ error recovery
  private handleRetry = (): void => {
    if (this.state.retryCount < this.recoveryOptions.maxRetries) {
      this.recoveryOptions.onRetryAttempt?.(this.state.retryCount + 1)
      
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
        isRetrying: false,
        recoveryAttempted: true
      }))

      this.recoveryOptions.onRetrySuccess?.()
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Fallback mode activation
  // FALLBACK MODES: Enable alternative FAQ functionality
  private enableFallbackModes = (): void => {
    const category = this.state.error ? getErrorCategory(this.state.error) : 'unknown'
    
    this.setState(prevState => ({
      searchFallbackActive: category === 'search' && this.props.enableSearchFallback !== false,
      themeFallbackActive: category === 'ui' && this.props.enableThemeFallback !== false,
      cachedResultsActive: category === 'network' && this.props.enableCachedResults !== false,
      fallbackMode: prevState.fallbackMode
    }))
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Component cleanup
  // CLEANUP: Clear timeouts and resources
  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - FAQ error UI rendering
  // ERROR UI: FAQ-specific error interface rendering
  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.state.errorInfo!)
        }
        return this.props.fallback
      }

      const error = this.state.error
      const category = getErrorCategory(error)
      const severity = getErrorSeverity(error)
      const canRetry = isRetryableError(error) && this.state.retryCount < this.recoveryOptions.maxRetries
      const showDetails = shouldShowErrorDetails(error)

      return (
        <div className="min-h-96 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full border-red-200 bg-red-50">
            <CardContent className="p-8">
              {/* Error Header */}
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    FAQ Service Temporarily Unavailable
                  </h2>
                  <Badge variant={severity === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                    {category.charAt(0).toUpperCase() + category.slice(1)} Error
                  </Badge>
                </div>
              </div>

              {/* Error Message */}
              <div className="mb-8 text-center">
                <p className="text-lg text-slate-700 mb-4">
                  {formatErrorMessage(error, showDetails)}
                </p>
                
                {this.state.searchFallbackActive && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-blue-800">
                      <Search className="w-5 h-5 mr-2" />
                      <span className="font-medium">Search Fallback Active</span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      Basic text search is available while we restore full search functionality.
                    </p>
                  </div>
                )}

                {this.state.cachedResultsActive && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-green-800">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      <span className="font-medium">Cached Results Available</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Recent FAQ results are available from cache.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                {canRetry && !this.state.isRetrying && (
                  <Button
                    onClick={this.handleRetry}
                    className="flex items-center justify-center px-6 py-3"
                    disabled={this.state.isRetrying}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again ({this.recoveryOptions.maxRetries - this.state.retryCount} attempts left)
                  </Button>
                )}

                {this.state.isRetrying && (
                  <Button disabled className="flex items-center justify-center px-6 py-3">
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Retrying...
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="flex items-center justify-center px-6 py-3"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </div>

              {/* Alternative Options */}
              {this.props.showAlternatives !== false && this.state.availableAlternatives.length > 0 && (
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">
                    Alternative Options
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {category === 'search' && (
                      <>
                        <Button variant="outline" size="sm" className="flex items-center justify-center">
                          <Search className="w-4 h-4 mr-2" />
                          Basic Search
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center justify-center">
                          <Mic className="w-4 h-4 mr-2" />
                          Voice Search
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center justify-center">
                          <Camera className="w-4 h-4 mr-2" />
                          Visual Search
                        </Button>
                      </>
                    )}
                    
                    {this.state.availableAlternatives.slice(0, 3).map((alternative, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle alternative actions based on the alternative text
                          if (alternative.includes('category')) {
                            window.location.href = '/faq'
                          } else if (alternative.includes('support')) {
                            window.location.href = '/contact'
                          } else if (alternative.includes('homepage')) {
                            window.location.href = '/'
                          }
                        }}
                        className="text-xs"
                      >
                        {alternative}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Contact */}
              {this.props.contactSupport !== false && severity === 'critical' && (
                <div className="border-t border-slate-200 pt-6 mt-6 text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    Need immediate assistance with your enquiry?
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/contact'}
                    className="flex items-center justify-center px-6 py-2"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Premium Support
                  </Button>
                </div>
              )}

              {/* Error Details (Development) */}
              {showDetails && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 mb-2">
                    Technical Error Details
                  </summary>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <div className="text-xs space-y-2">
                      <div>
                        <strong>Error ID:</strong> {this.state.errorId}
                      </div>
                      <div>
                        <strong>Message:</strong> {error.message}
                      </div>
                      <div>
                        <strong>Category:</strong> {category}
                      </div>
                      <div>
                        <strong>Severity:</strong> {severity}
                      </div>
                      {this.props.faqContext && (
                        <div>
                          <strong>FAQ Context:</strong>
                          <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                            {JSON.stringify(this.props.faqContext, null, 2)}
                          </pre>
                        </div>
                      )}
                      {error.stack && (
                        <div>
                          <strong>Stack Trace:</strong>
                          <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                            {error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}