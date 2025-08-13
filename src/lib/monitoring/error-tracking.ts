/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error tracking and monitoring implementation
 * ERROR TRACKING: Comprehensive error monitoring and analytics system
 * 
 * Error Tracking Service - Enterprise Error Monitoring
 * Complete error tracking infrastructure for premium tutoring service
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through proactive error monitoring
 * ERROR PREVENTION: Real-time error tracking preventing revenue loss
 * ROYAL CLIENT PROTECTION: Premium error monitoring maintaining service excellence
 * 
 * FEATURES:
 * - Real-time error tracking and alerting
 * - Business impact analysis and revenue tracking
 * - User experience monitoring and friction detection
 * - Performance correlation with error rates
 * - Automatic error categorisation and prioritisation
 * - Royal client error isolation and priority handling
 */

import type {
  ErrorAnalyticsData,
  ErrorTrackingMetrics,
  ErrorMonitoringConfig,
  ClientType
} from '../error-handling/types'

import { 
  getErrorSeverity, 
  getErrorCategory, 
  getBusinessImpact,
  sanitiseErrorContext 
} from '../../components/error-boundary/utils'

// CONTEXT7 SOURCE: /context7/react_dev - Error tracking configuration
// TRACKING CONFIG: Default configuration for error tracking system
const DEFAULT_CONFIG: ErrorMonitoringConfig = {
  enabled: true,
  environment: (process.env.NODE_ENV as any) || 'development',
  sampleRate: 1.0, // 100% in development, should be lower in production
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enablePerformanceTracking: true,
  enableUserTracking: true,
  enableBreadcrumbs: true,
  maxReportsPerSession: 50,
  reportingDelay: 1000,
  excludeErrors: [
    'ResizeObserver loop limit exceeded',
    'Script error.',
    'Non-Error promise rejection captured'
  ],
  includeContext: true,
  privacy: {
    scrubSensitiveData: true,
    excludePersonalInfo: true,
    hashUserIdentifiers: false
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Error tracking metrics storage
// METRICS STORAGE: In-memory metrics tracking with persistence
interface ErrorTrackingState {
  metrics: ErrorTrackingMetrics
  recentErrors: ErrorAnalyticsData[]
  userJourney: string[]
  sessionStartTime: number
  lastErrorTime: number
  errorQueue: ErrorAnalyticsData[]
  reportingPaused: boolean
}

/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error tracking service implementation
 * ERROR TRACKING SERVICE: Comprehensive error monitoring and analytics
 */
export class ErrorTrackingService {
  private config: ErrorMonitoringConfig
  private state: ErrorTrackingState
  private reportingTimer: NodeJS.Timeout | null = null
  private performanceObserver: PerformanceObserver | null = null

  constructor(config: Partial<ErrorMonitoringConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    
    this.state = {
      metrics: this.initializeMetrics(),
      recentErrors: [],
      userJourney: [],
      sessionStartTime: Date.now(),
      lastErrorTime: 0,
      errorQueue: [],
      reportingPaused: false
    }

    this.initialize()
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Service initialization
  // INITIALIZATION: Set up error tracking and monitoring
  private initialize(): void {
    if (!this.config.enabled || typeof window === 'undefined') return

    // Set up global error handlers
    this.setupGlobalErrorHandlers()

    // Initialize performance monitoring
    if (this.config.enablePerformanceTracking) {
      this.initializePerformanceTracking()
    }

    // Start reporting timer
    this.startReporting()

    // Track page navigation
    this.trackPageNavigation()
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Initialize metrics structure
  // METRICS INIT: Initialize tracking metrics structure
  private initializeMetrics(): ErrorTrackingMetrics {
    return {
      totalErrors: 0,
      errorsByCategory: {},
      errorsBySeverity: { low: 0, medium: 0, high: 0, critical: 0 },
      errorsByComponent: {},
      errorsByUserType: { royal: 0, standard: 0, visitor: 0 },
      recoverySuccessRate: 0,
      fallbackUsageRate: 0,
      averageRecoveryTime: 0,
      businessImpactMetrics: {
        revenueAffected: 0,
        conversionsLost: 0,
        sessionAbandonment: 0,
        supportTicketsCreated: 0
      },
      performanceMetrics: {
        errorRate: 0,
        errorRateByEndpoint: {},
        timeToFirstError: 0,
        errorFrequency: {}
      },
      userExperience: {
        userFrustrationIndex: 0,
        taskCompletionImpact: 0,
        featureAvailabilityRate: 100
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Track error occurrence
  // ERROR TRACKING: Main error tracking method
  public trackError(
    error: Error,
    context?: any,
    component?: string,
    severity?: string
  ): void {
    if (!this.config.enabled || this.shouldExcludeError(error)) return

    const errorData = this.createErrorAnalytics(error, context, component, severity)
    
    // Update metrics
    this.updateMetrics(errorData)
    
    // Store error data
    this.state.recentErrors.push(errorData)
    this.state.errorQueue.push(errorData)
    
    // Trim recent errors if exceeding limit
    if (this.state.recentErrors.length > 100) {
      this.state.recentErrors = this.state.recentErrors.slice(-50)
    }

    // Log to console in development
    if (this.config.enableConsoleLogging) {
      this.logErrorToConsole(errorData)
    }

    // Handle critical errors immediately
    if (errorData.severity === 'critical') {
      this.handleCriticalError(errorData)
    }

    // Handle royal client errors with priority
    if (errorData.clientType === 'royal') {
      this.handleRoyalClientError(errorData)
    }

    this.state.lastErrorTime = Date.now()
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Create error analytics data
  // ANALYTICS DATA: Transform error into analytics structure
  private createErrorAnalytics(
    error: Error,
    context?: any,
    component?: string,
    severity?: string
  ): ErrorAnalyticsData {
    const timestamp = Date.now()
    const category = getErrorCategory(error)
    const errorSeverity = severity || getErrorSeverity(error)
    const businessImpact = getBusinessImpact(error, context)
    const clientType = this.getClientType()
    
    return {
      errorId: `error_${timestamp}_${Math.random().toString(36).substring(2)}`,
      timestamp,
      category,
      severity: errorSeverity,
      component: component || 'Unknown',
      message: error.message,
      stack: error.stack,
      context: context ? sanitiseErrorContext(context) : undefined,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      buildVersion: this.getBuildVersion(),
      environment: this.config.environment,
      clientType,
      businessImpact,
      recoveryAttempts: context?.recoveryAttempts || 0,
      recoverySuccess: context?.recoverySuccess || false,
      fallbackUsed: context?.fallbackUsed || false,
      userJourney: [...this.state.userJourney],
      performanceMetrics: {
        timeToError: timestamp - this.state.sessionStartTime,
        timeToRecovery: context?.timeToRecovery,
        memoryUsage: this.getMemoryUsage(),
        cpuUsage: this.getCPUUsage()
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Update tracking metrics
  // METRICS UPDATE: Update comprehensive error metrics
  private updateMetrics(errorData: ErrorAnalyticsData): void {
    const { metrics } = this.state
    
    // Total errors
    metrics.totalErrors++
    
    // Errors by category
    metrics.errorsByCategory[errorData.category] = 
      (metrics.errorsByCategory[errorData.category] || 0) + 1
    
    // Errors by severity
    metrics.errorsBySeverity[errorData.severity as keyof typeof metrics.errorsBySeverity]++
    
    // Errors by component
    metrics.errorsByComponent[errorData.component] = 
      (metrics.errorsByComponent[errorData.component] || 0) + 1
    
    // Errors by user type
    metrics.errorsByUserType[errorData.clientType as keyof typeof metrics.errorsByUserType]++
    
    // Recovery metrics
    if (errorData.recoveryAttempts > 0) {
      const totalRecoveryAttempts = this.state.recentErrors
        .filter(e => e.recoveryAttempts > 0).length
      const successfulRecoveries = this.state.recentErrors
        .filter(e => e.recoverySuccess).length
      
      metrics.recoverySuccessRate = totalRecoveryAttempts > 0 
        ? (successfulRecoveries / totalRecoveryAttempts) * 100 
        : 0
    }
    
    // Fallback usage
    if (errorData.fallbackUsed) {
      const totalErrors = metrics.totalErrors
      const fallbackUsage = this.state.recentErrors.filter(e => e.fallbackUsed).length
      metrics.fallbackUsageRate = (fallbackUsage / totalErrors) * 100
    }
    
    // Business impact
    if (errorData.businessImpact === 'revenue_critical' || errorData.businessImpact === 'high') {
      metrics.businessImpactMetrics.revenueAffected++
      
      if (errorData.clientType === 'royal') {
        // Royal clients have higher conversion value
        metrics.businessImpactMetrics.conversionsLost += 2
      } else {
        metrics.businessImpactMetrics.conversionsLost++
      }
    }
    
    // Performance metrics
    const currentErrorRate = (metrics.totalErrors / (Date.now() - this.state.sessionStartTime)) * 1000
    metrics.performanceMetrics.errorRate = currentErrorRate
    
    if (metrics.performanceMetrics.timeToFirstError === 0) {
      metrics.performanceMetrics.timeToFirstError = errorData.performanceMetrics?.timeToError || 0
    }
    
    // User experience impact
    this.updateUserExperienceMetrics(errorData)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Update user experience metrics
  // UX METRICS: Calculate user experience impact
  private updateUserExperienceMetrics(errorData: ErrorAnalyticsData): void {
    const { metrics } = this.state
    
    // User frustration index (0-100, higher is worse)
    const frustrationFactors = {
      critical: 25,
      high: 15,
      medium: 8,
      low: 3
    }
    
    const frustrationIncrease = frustrationFactors[errorData.severity as keyof typeof frustrationFactors] || 5
    metrics.userExperience.userFrustrationIndex = Math.min(100, 
      metrics.userExperience.userFrustrationIndex + frustrationIncrease)
    
    // Task completion impact
    if (['search', 'booking', 'payment'].includes(errorData.category)) {
      metrics.userExperience.taskCompletionImpact += 10
    }
    
    // Feature availability rate
    const affectedFeatures = this.getAffectedFeatures(errorData)
    const totalFeatures = 10 // Assumed total features in FAQ system
    const unavailableFeatures = new Set(this.state.recentErrors
      .filter(e => Date.now() - e.timestamp < 300000) // Last 5 minutes
      .map(e => this.getAffectedFeatures(e))
      .flat()
    ).size
    
    metrics.userExperience.featureAvailabilityRate = 
      Math.max(0, ((totalFeatures - unavailableFeatures) / totalFeatures) * 100)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Handle critical errors
  // CRITICAL HANDLING: Immediate handling for critical errors
  private async handleCriticalError(errorData: ErrorAnalyticsData): Promise<void> {
    // Immediate reporting for critical errors
    try {
      await this.sendErrorReport([errorData], true)
    } catch (reportingError) {
      console.error('Failed to report critical error:', reportingError)
    }

    // Trigger alerts for critical errors
    this.triggerAlert({
      type: 'critical_error',
      message: `Critical error in ${errorData.component}: ${errorData.message}`,
      data: errorData
    })
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Handle royal client errors
  // ROYAL CLIENT: Priority handling for royal client errors
  private async handleRoyalClientError(errorData: ErrorAnalyticsData): Promise<void> {
    // Priority reporting for royal client issues
    try {
      await this.sendErrorReport([{
        ...errorData,
        priority: 'royal_client'
      }], true)
    } catch (reportingError) {
      console.error('Failed to report royal client error:', reportingError)
    }

    // Create support ticket for royal clients
    this.createSupportTicket(errorData)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Global error handler setup
  // GLOBAL HANDLERS: Set up global error and unhandled rejection handlers
  private setupGlobalErrorHandlers(): void {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.trackError(
        event.error || new Error(event.message),
        {
          source: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        },
        'GlobalErrorHandler'
      )
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason))
      
      this.trackError(
        error,
        { type: 'unhandled_promise_rejection' },
        'PromiseRejectionHandler'
      )
    })
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Performance tracking setup
  // PERFORMANCE TRACKING: Monitor performance metrics related to errors
  private initializePerformanceTracking(): void {
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        
        entries.forEach((entry) => {
          // Track long tasks that might correlate with errors
          if (entry.entryType === 'longtask') {
            this.state.userJourney.push(`longtask_${Math.round(entry.duration)}ms`)
          }
          
          // Track navigation timing for error correlation
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            this.state.userJourney.push(`page_load_${Math.round(navEntry.loadEventEnd)}ms`)
          }
        })
      })

      try {
        this.performanceObserver.observe({ 
          type: 'longtask', 
          buffered: true 
        })
        
        this.performanceObserver.observe({ 
          type: 'navigation', 
          buffered: true 
        })
      } catch (e) {
        console.warn('Performance observer failed to initialize:', e)
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Page navigation tracking
  // NAVIGATION TRACKING: Track user journey for error context
  private trackPageNavigation(): void {
    let lastUrl = window.location.href
    
    // Track initial page load
    this.state.userJourney.push(`page_${window.location.pathname}`)
    
    // Monitor for URL changes (SPA navigation)
    setInterval(() => {
      const currentUrl = window.location.href
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl
        this.state.userJourney.push(`navigate_${window.location.pathname}`)
        
        // Trim journey if too long
        if (this.state.userJourney.length > 20) {
          this.state.userJourney = this.state.userJourney.slice(-15)
        }
      }
    }, 1000)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Error reporting timer
  // REPORTING TIMER: Batch error reporting with configurable delay
  private startReporting(): void {
    if (this.reportingTimer) {
      clearInterval(this.reportingTimer)
    }

    this.reportingTimer = setInterval(() => {
      if (this.state.errorQueue.length > 0 && !this.state.reportingPaused) {
        const errorsToReport = [...this.state.errorQueue]
        this.state.errorQueue = []
        
        this.sendErrorReport(errorsToReport).catch(error => {
          console.error('Failed to send error report:', error)
          // Re-queue errors on failure
          this.state.errorQueue.unshift(...errorsToReport)
        })
      }
    }, this.config.reportingDelay)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Send error report to monitoring service
  // ERROR REPORTING: Send errors to monitoring endpoint
  private async sendErrorReport(errors: ErrorAnalyticsData[], urgent = false): Promise<void> {
    if (!this.config.apiEndpoint && this.config.environment === 'production') {
      // In production without endpoint, use default error endpoint
      this.config.apiEndpoint = '/api/errors'
    }

    const endpoint = this.config.apiEndpoint || '/api/errors'
    
    const payload = {
      errors,
      metrics: this.state.metrics,
      session: {
        id: this.getSessionId(),
        startTime: this.state.sessionStartTime,
        userAgent: navigator.userAgent,
        url: window.location.href,
        userJourney: this.state.userJourney
      },
      timestamp: Date.now(),
      urgent,
      environment: this.config.environment,
      buildVersion: this.getBuildVersion()
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Error reporting failed: ${response.status} ${response.statusText}`)
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Utility methods
  // UTILITIES: Helper methods for error tracking

  private shouldExcludeError(error: Error): boolean {
    return this.config.excludeErrors.some(excludePattern => 
      error.message.includes(excludePattern)
    )
  }

  private getClientType(): ClientType {
    if (typeof window !== 'undefined') {
      const clientType = localStorage.getItem('clientType')
      if (clientType === 'royal' || clientType === 'standard') {
        return clientType as ClientType
      }
    }
    return 'visitor'
  }

  private getUserId(): string | undefined {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || undefined
    }
    return undefined
  }

  private getSessionId(): string {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      let sessionId = sessionStorage.getItem('errorTrackingSessionId')
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
        sessionStorage.setItem('errorTrackingSessionId', sessionId)
      }
      return sessionId
    }
    return 'server_session'
  }

  private getBuildVersion(): string {
    return process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0'
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize
    }
    return 0
  }

  private getCPUUsage(): number {
    // CPU usage estimation based on task timing
    return 0 // Placeholder - real implementation would use performance timing
  }

  private getAffectedFeatures(errorData: ErrorAnalyticsData): string[] {
    const featureMap: Record<string, string[]> = {
      search: ['basic-search', 'advanced-search', 'voice-search', 'visual-search'],
      voice: ['voice-search', 'voice-navigation'],
      visual: ['visual-search', 'image-upload'],
      theme: ['dark-mode', 'theme-switching'],
      analytics: ['usage-tracking', 'recommendations']
    }
    
    return featureMap[errorData.category] || []
  }

  private logErrorToConsole(errorData: ErrorAnalyticsData): void {
    const style = errorData.severity === 'critical' ? 'color: red; font-weight: bold;' : 
                  errorData.severity === 'high' ? 'color: orange; font-weight: bold;' :
                  'color: #666;'
    
    console.group(`%c🚨 Error Tracked: ${errorData.component}`, style)
    console.error('Error:', errorData.message)
    console.info('Category:', errorData.category)
    console.info('Severity:', errorData.severity)
    console.info('Client Type:', errorData.clientType)
    if (errorData.context) {
      console.info('Context:', errorData.context)
    }
    console.groupEnd()
  }

  private async triggerAlert(alert: { type: string; message: string; data: any }): Promise<void> {
    // In a real implementation, this would integrate with alerting systems
    console.warn('ALERT:', alert.message)
    
    // Could integrate with services like Slack, PagerDuty, etc.
  }

  private async createSupportTicket(errorData: ErrorAnalyticsData): Promise<void> {
    // In a real implementation, this would create support tickets
    console.info('Support ticket would be created for royal client error:', errorData.errorId)
    
    // Could integrate with support systems like Zendesk, Intercom, etc.
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Public API methods
  // PUBLIC API: External interface for error tracking service

  public getMetrics(): ErrorTrackingMetrics {
    return { ...this.state.metrics }
  }

  public getRecentErrors(): ErrorAnalyticsData[] {
    return [...this.state.recentErrors]
  }

  public pauseReporting(): void {
    this.state.reportingPaused = true
  }

  public resumeReporting(): void {
    this.state.reportingPaused = false
  }

  public clearErrors(): void {
    this.state.recentErrors = []
    this.state.errorQueue = []
    this.state.metrics = this.initializeMetrics()
  }

  public destroy(): void {
    if (this.reportingTimer) {
      clearInterval(this.reportingTimer)
      this.reportingTimer = null
    }

    if (this.performanceObserver) {
      this.performanceObserver.disconnect()
      this.performanceObserver = null
    }
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Global error tracking instance
// GLOBAL INSTANCE: Singleton error tracking service
let globalErrorTracker: ErrorTrackingService | null = null

export function getErrorTracker(config?: Partial<ErrorMonitoringConfig>): ErrorTrackingService {
  if (!globalErrorTracker) {
    globalErrorTracker = new ErrorTrackingService(config)
  }
  return globalErrorTracker
}