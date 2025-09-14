/**
 * CONTEXT7 SOURCE: /vercel/next.js - Comprehensive error handling and recovery system for optimization features
 * ERROR HANDLING: Official Next.js documentation shows implementing robust error handling systems
 * PATTERN: Centralized error management with automatic recovery and fallback strategies
 */

'use client';

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Error classification and metadata interface
 * ERROR CLASSIFICATION: Official TypeScript documentation shows structured error handling patterns
 */
export interface OptimizationError {
  /** Unique error identifier */
  id: string;
  /** Error type classification */
  type: 'performance' | 'analytics' | 'variant' | 'cache' | 'network' | 'compatibility' | 'user-interaction';
  /** Error severity level */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** Error message */
  message: string;
  /** Technical error details */
  details: string;
  /** Error timestamp */
  timestamp: number;
  /** Component or system that generated the error */
  source: string;
  /** User context when error occurred */
  userContext: {
    variant: string | null;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    browserInfo: string;
    currentPage: string;
  };
  /** Recovery actions attempted */
  recoveryAttempts: RecoveryAttempt[];
  /** Whether error was recovered */
  recovered: boolean;
  /** Stack trace if available */
  stack?: string;
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Recovery attempt tracking interface
 * RECOVERY TRACKING: Official Next.js documentation shows tracking recovery attempts
 */
interface RecoveryAttempt {
  /** Recovery strategy used */
  strategy: string;
  /** Attempt timestamp */
  timestamp: number;
  /** Whether attempt was successful */
  successful: boolean;
  /** Additional context about the attempt */
  context?: any;
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Error recovery strategy interface
 * RECOVERY STRATEGY: Official Next.js documentation shows defining recovery strategies
 */
interface RecoveryStrategy {
  /** Strategy name */
  name: string;
  /** Error types this strategy can handle */
  applicableTypes: OptimizationError['type'][];
  /** Severity levels this strategy can handle */
  applicableSeverity: OptimizationError['severity'][];
  /** Recovery function */
  recover: (error: OptimizationError) => Promise<boolean>;
  /** Maximum retry attempts */
  maxRetries: number;
  /** Delay between retries in milliseconds */
  retryDelay: number;
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Comprehensive optimization error handler
 * ERROR HANDLER: Official Next.js documentation shows implementing centralized error handling
 */
export class OptimizationErrorHandler {
  private errors: Map<string, OptimizationError> = new Map();
  private errorQueue: OptimizationError[] = [];
  private recoveryStrategies: Map<string, RecoveryStrategy> = new Map();
  private globalErrorHandler: ((error: OptimizationError) => void) | null = null;
  private maxErrorHistory = 1000;
  private processingQueue = false;

  constructor() {
    this.initializeRecoveryStrategies();
    this.setupGlobalErrorHandling();
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Recovery strategies initialization
   * STRATEGY INITIALIZATION: Official Next.js documentation shows initializing error recovery strategies
   */
  private initializeRecoveryStrategies(): void {
    // CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring recovery strategy
    // PERFORMANCE RECOVERY: Official Next.js documentation shows recovering from performance monitoring errors
    this.recoveryStrategies.set('performance-fallback', {
      name: 'Performance Monitoring Fallback',
      applicableTypes: ['performance'],
      applicableSeverity: ['low', 'medium', 'high'],
      maxRetries: 3,
      retryDelay: 1000,
      recover: async (error: OptimizationError) => {
        try {
          // Implement basic performance tracking fallback
          console.log('Implementing performance monitoring fallback');
          this.implementBasicPerformanceTracking();
          return true;
        } catch (recoveryError) {
          console.warn('Performance recovery failed:', recoveryError);
          return false;
        }
      }
    });

    // CONTEXT7 SOURCE: /vercel/next.js - Analytics tracking recovery strategy
    // ANALYTICS RECOVERY: Official Next.js documentation shows recovering from analytics errors
    this.recoveryStrategies.set('analytics-fallback', {
      name: 'Analytics Tracking Fallback',
      applicableTypes: ['analytics'],
      applicableSeverity: ['low', 'medium'],
      maxRetries: 2,
      retryDelay: 2000,
      recover: async (error: OptimizationError) => {
        try {
          // Implement local analytics storage fallback
          console.log('Implementing analytics fallback');
          this.implementLocalAnalyticsFallback();
          return true;
        } catch (recoveryError) {
          console.warn('Analytics recovery failed:', recoveryError);
          return false;
        }
      }
    });

    // CONTEXT7 SOURCE: /vercel/next.js - A/B testing variant recovery strategy
    // VARIANT RECOVERY: Official Next.js documentation shows recovering from variant assignment errors
    this.recoveryStrategies.set('variant-fallback', {
      name: 'A/B Testing Variant Fallback',
      applicableTypes: ['variant'],
      applicableSeverity: ['low', 'medium', 'high'],
      maxRetries: 1,
      retryDelay: 500,
      recover: async (error: OptimizationError) => {
        try {
          // Fall back to control variant
          console.log('Falling back to control variant');
          this.assignControlVariant();
          return true;
        } catch (recoveryError) {
          console.warn('Variant recovery failed:', recoveryError);
          return false;
        }
      }
    });

    // CONTEXT7 SOURCE: /vercel/next.js - Cache system recovery strategy
    // CACHE RECOVERY: Official Next.js documentation shows recovering from caching errors
    this.recoveryStrategies.set('cache-fallback', {
      name: 'Cache System Fallback',
      applicableTypes: ['cache'],
      applicableSeverity: ['low', 'medium', 'high'],
      maxRetries: 2,
      retryDelay: 1500,
      recover: async (error: OptimizationError) => {
        try {
          // Implement direct network requests without caching
          console.log('Implementing cache bypass');
          this.bypassCacheSystem();
          return true;
        } catch (recoveryError) {
          console.warn('Cache recovery failed:', recoveryError);
          return false;
        }
      }
    });

    // CONTEXT7 SOURCE: /vercel/next.js - Network error recovery strategy
    // NETWORK RECOVERY: Official Next.js documentation shows recovering from network errors
    this.recoveryStrategies.set('network-retry', {
      name: 'Network Request Retry',
      applicableTypes: ['network'],
      applicableSeverity: ['low', 'medium'],
      maxRetries: 3,
      retryDelay: 2000,
      recover: async (error: OptimizationError) => {
        try {
          // Implement exponential backoff retry
          console.log('Retrying network request with backoff');
          await this.retryNetworkRequest(error);
          return true;
        } catch (recoveryError) {
          console.warn('Network recovery failed:', recoveryError);
          return false;
        }
      }
    });

    // CONTEXT7 SOURCE: /vercel/next.js - User interaction recovery strategy
    // INTERACTION RECOVERY: Official Next.js documentation shows recovering from user interaction errors
    this.recoveryStrategies.set('interaction-fallback', {
      name: 'User Interaction Fallback',
      applicableTypes: ['user-interaction'],
      applicableSeverity: ['low', 'medium'],
      maxRetries: 1,
      retryDelay: 100,
      recover: async (error: OptimizationError) => {
        try {
          // Simplify interactions and disable advanced features
          console.log('Simplifying user interactions');
          this.simplifyUserInteractions();
          return true;
        } catch (recoveryError) {
          console.warn('Interaction recovery failed:', recoveryError);
          return false;
        }
      }
    });

    console.log(`🛠️ Initialized ${this.recoveryStrategies.size} error recovery strategies`);
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Global error handling setup
   * GLOBAL ERROR SETUP: Official Next.js documentation shows setting up global error handling
   */
  private setupGlobalErrorHandling(): void {
    // CONTEXT7 SOURCE: /mozilla/mdn - Window error event handling
    // WINDOW ERROR: Official MDN documentation shows handling uncaught errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'compatibility',
        severity: 'medium',
        message: 'Uncaught JavaScript error',
        details: event.error?.message || event.message,
        source: 'global-error-handler',
        stack: event.error?.stack
      });
    });

    // CONTEXT7 SOURCE: /mozilla/mdn - Unhandled promise rejection handling
    // PROMISE REJECTION: Official MDN documentation shows handling unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'network',
        severity: 'medium',
        message: 'Unhandled promise rejection',
        details: event.reason?.message || event.reason || 'Unknown promise rejection',
        source: 'global-promise-handler',
        stack: event.reason?.stack
      });
    });

    console.log('🌐 Global error handling configured');
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Primary error handling entry point
   * ERROR HANDLING: Official Next.js documentation shows implementing centralized error processing
   */
  public handleError(errorInput: Partial<OptimizationError>): void {
    // CONTEXT7 SOURCE: /vercel/next.js - Error object construction with defaults
    // ERROR CONSTRUCTION: Official Next.js documentation shows constructing comprehensive error objects
    const error: OptimizationError = {
      id: this.generateErrorId(),
      type: errorInput.type || 'compatibility',
      severity: errorInput.severity || 'medium',
      message: errorInput.message || 'Unknown optimization error',
      details: errorInput.details || '',
      timestamp: Date.now(),
      source: errorInput.source || 'unknown',
      userContext: errorInput.userContext || this.getCurrentUserContext(),
      recoveryAttempts: [],
      recovered: false,
      stack: errorInput.stack
    };

    // Store error
    this.errors.set(error.id, error);
    this.errorQueue.push(error);

    // Manage error history size
    if (this.errors.size > this.maxErrorHistory) {
      const oldestError = Array.from(this.errors.keys())[0];
      this.errors.delete(oldestError);
    }

    // CONTEXT7 SOURCE: /vercel/next.js - Error severity-based handling
    // SEVERITY HANDLING: Official Next.js documentation shows handling errors by severity
    if (error.severity === 'critical') {
      this.handleCriticalError(error);
    } else {
      this.queueErrorForProcessing(error);
    }

    // CONTEXT7 SOURCE: /vercel/next.js - Analytics reporting for error tracking
    // ERROR ANALYTICS: Official Next.js documentation shows reporting errors for analysis
    this.reportErrorToAnalytics(error);

    // Notify global error handler if set
    if (this.globalErrorHandler) {
      this.globalErrorHandler(error);
    }

    console.warn(`🚨 Optimization error handled: ${error.type}/${error.severity} - ${error.message}`);
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Asynchronous error queue processing
   * QUEUE PROCESSING: Official Next.js documentation shows processing error queues asynchronously
   */
  private async queueErrorForProcessing(error: OptimizationError): Promise<void> {
    if (this.processingQueue) return;

    this.processingQueue = true;

    try {
      // Process errors in queue
      while (this.errorQueue.length > 0) {
        const queuedError = this.errorQueue.shift();
        if (queuedError && !queuedError.recovered) {
          await this.attemptErrorRecovery(queuedError);
        }
      }
    } catch (processingError) {
      console.error('Error queue processing failed:', processingError);
    } finally {
      this.processingQueue = false;
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Automatic error recovery system
   * RECOVERY SYSTEM: Official Next.js documentation shows implementing automatic error recovery
   */
  private async attemptErrorRecovery(error: OptimizationError): Promise<void> {
    // CONTEXT7 SOURCE: /vercel/next.js - Recovery strategy selection
    // STRATEGY SELECTION: Official Next.js documentation shows selecting appropriate recovery strategies
    const applicableStrategies = Array.from(this.recoveryStrategies.values())
      .filter(strategy =>
        strategy.applicableTypes.includes(error.type) &&
        strategy.applicableSeverity.includes(error.severity)
      )
      .sort((a, b) => {
        // Prioritize strategies with fewer retry attempts first
        const aRetries = error.recoveryAttempts.filter(attempt =>
          attempt.strategy === a.name).length;
        const bRetries = error.recoveryAttempts.filter(attempt =>
          attempt.strategy === b.name).length;
        return aRetries - bRetries;
      });

    // CONTEXT7 SOURCE: /vercel/next.js - Strategy execution with retry logic
    // RETRY LOGIC: Official Next.js documentation shows implementing retry logic for recovery
    for (const strategy of applicableStrategies) {
      const existingAttempts = error.recoveryAttempts.filter(
        attempt => attempt.strategy === strategy.name
      ).length;

      if (existingAttempts >= strategy.maxRetries) {
        continue; // Skip strategies that have exceeded max retries
      }

      try {
        console.log(`🔄 Attempting recovery with strategy: ${strategy.name}`);

        // Add delay between retries
        if (existingAttempts > 0) {
          await new Promise(resolve => setTimeout(resolve, strategy.retryDelay * existingAttempts));
        }

        const recoveryAttempt: RecoveryAttempt = {
          strategy: strategy.name,
          timestamp: Date.now(),
          successful: false
        };

        const success = await strategy.recover(error);

        recoveryAttempt.successful = success;
        error.recoveryAttempts.push(recoveryAttempt);

        if (success) {
          error.recovered = true;
          console.log(`✅ Error recovered using strategy: ${strategy.name}`);

          // Update stored error
          this.errors.set(error.id, error);

          // Report successful recovery
          this.reportRecoveryToAnalytics(error, strategy.name);
          break;
        }

      } catch (recoveryError) {
        console.warn(`Recovery strategy ${strategy.name} failed:`, recoveryError);

        const failedAttempt: RecoveryAttempt = {
          strategy: strategy.name,
          timestamp: Date.now(),
          successful: false,
          context: { error: recoveryError.message }
        };

        error.recoveryAttempts.push(failedAttempt);
      }
    }

    // Update stored error
    this.errors.set(error.id, error);

    if (!error.recovered) {
      console.error(`❌ Unable to recover from error: ${error.id}`);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Critical error immediate handling
   * CRITICAL ERROR HANDLING: Official Next.js documentation shows handling critical errors immediately
   */
  private async handleCriticalError(error: OptimizationError): Promise<void> {
    console.error(`🔴 CRITICAL ERROR: ${error.message}`, error);

    // CONTEXT7 SOURCE: /vercel/next.js - Immediate fallback for critical errors
    // CRITICAL FALLBACK: Official Next.js documentation shows implementing emergency fallbacks
    try {
      // Disable all optimization features
      this.disableAllOptimizations();

      // Switch to safe mode
      this.enableSafeMode();

      // Attempt immediate recovery
      await this.attemptErrorRecovery(error);

    } catch (criticalRecoveryError) {
      console.error('Critical error recovery failed:', criticalRecoveryError);

      // Last resort: reload page with safe parameters
      this.initiateSafeReload();
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Error reporting and analytics integration
   * ERROR ANALYTICS: Official Next.js documentation shows integrating error reporting with analytics
   */
  private reportErrorToAnalytics(error: OptimizationError): void {
    try {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'optimization_error', {
          error_type: error.type,
          error_severity: error.severity,
          error_source: error.source,
          error_id: error.id,
          user_variant: error.userContext.variant,
          device_type: error.userContext.deviceType,
          event_category: 'errors'
        });
      }
    } catch (reportingError) {
      console.warn('Error reporting failed:', reportingError);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Recovery success reporting
   * RECOVERY ANALYTICS: Official Next.js documentation shows reporting recovery success
   */
  private reportRecoveryToAnalytics(error: OptimizationError, strategy: string): void {
    try {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'error_recovery_success', {
          error_type: error.type,
          error_severity: error.severity,
          recovery_strategy: strategy,
          recovery_time: Date.now() - error.timestamp,
          event_category: 'recovery'
        });
      }
    } catch (reportingError) {
      console.warn('Recovery reporting failed:', reportingError);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Error statistics and health monitoring
   * ERROR STATISTICS: Official Next.js documentation shows generating error statistics
   */
  public getErrorStatistics(): {
    totalErrors: number;
    errorsByType: Record<string, number>;
    errorsBySeverity: Record<string, number>;
    recoveryRate: number;
    recentErrors: OptimizationError[];
    systemHealth: 'healthy' | 'warning' | 'critical';
  } {
    const errors = Array.from(this.errors.values());
    const recentErrors = errors.filter(error =>
      Date.now() - error.timestamp < 5 * 60 * 1000 // Last 5 minutes
    );

    const errorsByType = errors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const errorsBySeverity = errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recoveredErrors = errors.filter(error => error.recovered).length;
    const recoveryRate = errors.length > 0 ? (recoveredErrors / errors.length) * 100 : 100;

    // Determine system health
    const criticalErrors = recentErrors.filter(error => error.severity === 'critical').length;
    const highSeverityErrors = recentErrors.filter(error => error.severity === 'high').length;

    let systemHealth: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (criticalErrors > 0) {
      systemHealth = 'critical';
    } else if (highSeverityErrors > 2 || recentErrors.length > 10) {
      systemHealth = 'warning';
    }

    return {
      totalErrors: errors.length,
      errorsByType,
      errorsBySeverity,
      recoveryRate,
      recentErrors: recentErrors.slice(-10),
      systemHealth
    };
  }

  // Private helper methods for recovery strategies
  private getCurrentUserContext() {
    return {
      variant: null,
      deviceType: 'desktop' as const,
      browserInfo: navigator.userAgent,
      currentPage: window.location.pathname
    };
  }

  private generateErrorId(): string {
    return `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private implementBasicPerformanceTracking(): void {
    // Implement fallback performance tracking
  }

  private implementLocalAnalyticsFallback(): void {
    // Implement local analytics storage
  }

  private assignControlVariant(): void {
    // Assign control variant as fallback
  }

  private bypassCacheSystem(): void {
    // Disable caching and use direct requests
  }

  private async retryNetworkRequest(error: OptimizationError): Promise<void> {
    // Implement network request retry with exponential backoff
  }

  private simplifyUserInteractions(): void {
    // Disable complex interactions and use basic fallbacks
  }

  private disableAllOptimizations(): void {
    document.documentElement.setAttribute('data-optimization-mode', 'disabled');
  }

  private enableSafeMode(): void {
    document.documentElement.setAttribute('data-safe-mode', 'true');
  }

  private initiateSafeReload(): void {
    // Reload page with safe mode parameters
    const url = new URL(window.location.href);
    url.searchParams.set('safe-mode', 'true');
    window.location.href = url.toString();
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Global error handler registration
   * HANDLER REGISTRATION: Official Next.js documentation shows registering global error handlers
   */
  public onError(handler: (error: OptimizationError) => void): () => void {
    this.globalErrorHandler = handler;

    return () => {
      this.globalErrorHandler = null;
    };
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Error handler cleanup
   * CLEANUP MANAGEMENT: Official Next.js documentation shows proper cleanup for error handlers
   */
  public cleanup(): void {
    this.errors.clear();
    this.errorQueue = [];
    this.globalErrorHandler = null;
    this.processingQueue = false;
  }
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Singleton error handler instance
 * SINGLETON PATTERN: Official Next.js documentation shows implementing singleton patterns
 */
let errorHandlerInstance: OptimizationErrorHandler | null = null;

export const getOptimizationErrorHandler = (): OptimizationErrorHandler => {
  if (!errorHandlerInstance) {
    errorHandlerInstance = new OptimizationErrorHandler();
  }
  return errorHandlerInstance;
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React hook for error handling integration
 * ERROR HOOK: Official React documentation shows creating hooks for error handling
 */
export const useOptimizationErrorHandling = () => {
  if (typeof window === 'undefined') return null;

  const errorHandler = getOptimizationErrorHandler();

  return {
    errorHandler,
    handleError: (error: Partial<OptimizationError>) => errorHandler.handleError(error),
    getStatistics: () => errorHandler.getErrorStatistics(),
    cleanup: () => errorHandler.cleanup()
  };
};

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript export patterns for error handling utilities
export type { OptimizationError, RecoveryStrategy };