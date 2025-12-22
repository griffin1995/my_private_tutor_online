/**
 * Error Tracking Configuration
 *
 * Production-ready error tracking setup with Better Stack integration point.
 * Follows Next.js 15 best practices for client-side error monitoring.
 */

interface ErrorDetails {
  message: string;
  stack?: string;
  digest?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  errorName: string;
  cause?: any;
  userId?: string;
  sessionId?: string;
  buildInfo?: {
    version?: string;
    environment?: string;
  };
}

interface ErrorTrackingConfig {
  enabled: boolean;
  environment: string;
  apiEndpoint?: string;
  apiKey?: string;
  userId?: string;
  sessionId?: string;
}

class ErrorTracker {
  private config: ErrorTrackingConfig;

  constructor(config: ErrorTrackingConfig) {
    this.config = config;
  }

  /**
   * Captures and reports an error to the configured tracking service
   * @param error - The error object from React error boundary
   * @param extra - Additional context information
   */
  async captureException(error: Error & { digest?: string }, extra: Partial<ErrorDetails> = {}): Promise<void> {
    if (!this.config.enabled || this.config.environment === 'development') {
      // In development, just log to console
      console.error('ERROR TRACKER:', error, extra);
      return;
    }

    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      errorName: error.name,
      cause: (error as any).cause || 'Unknown',
      userId: this.config.userId,
      sessionId: this.config.sessionId,
      buildInfo: {
        version: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
        environment: this.config.environment,
      },
      ...extra,
    };

    try {
      // Better Stack / Sentry compatible implementation
      if (this.config.apiEndpoint && this.config.apiKey) {
        await this.sendToBetterStack(errorDetails);
      } else {
        // Fallback: Send to custom endpoint or log
        await this.sendToCustomEndpoint(errorDetails);
      }
    } catch (trackingError) {
      // Never let error tracking break the application
      console.error('Error tracking failed:', trackingError);
    }
  }

  /**
   * Better Stack compatible error submission
   */
  private async sendToBetterStack(errorDetails: ErrorDetails): Promise<void> {
    const payload = {
      message: errorDetails.message,
      level: 'error',
      timestamp: errorDetails.timestamp,
      extra: {
        stack: errorDetails.stack,
        digest: errorDetails.digest,
        userAgent: errorDetails.userAgent,
        url: errorDetails.url,
        cause: errorDetails.cause,
        userId: errorDetails.userId,
        sessionId: errorDetails.sessionId,
        buildInfo: errorDetails.buildInfo,
      },
    };

    // Better Stack DSN format: https://in.betterstack.com/capture/[API_KEY]
    const response = await fetch(this.config.apiEndpoint!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error tracking request failed: ${response.status}`);
    }
  }

  /**
   * Custom error endpoint implementation
   */
  private async sendToCustomEndpoint(errorDetails: ErrorDetails): Promise<void> {
    // Implementation for custom error tracking endpoint
    // This could be a Next.js API route, external service, etc.
    const endpoint = '/api/errors';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorDetails),
    });

    if (!response.ok) {
      throw new Error(`Custom error tracking failed: ${response.status}`);
    }
  }

  /**
   * Updates user context for error tracking
   */
  setUserContext(userId: string, sessionId?: string): void {
    this.config.userId = userId;
    this.config.sessionId = sessionId;
  }

  /**
   * Captures breadcrumb for debugging context
   */
  addBreadcrumb(message: string, category: string = 'navigation', data?: any): void {
    if (this.config.enabled) {
      console.log('BREADCRUMB:', { message, category, data, timestamp: new Date().toISOString() });
    }
  }
}

// Singleton instance for application-wide error tracking
const errorTracker = new ErrorTracker({
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV || 'development',
  apiEndpoint: process.env.NEXT_PUBLIC_ERROR_TRACKING_ENDPOINT,
  apiKey: process.env.NEXT_PUBLIC_ERROR_TRACKING_API_KEY,
});

export { errorTracker, ErrorTracker, type ErrorDetails, type ErrorTrackingConfig };