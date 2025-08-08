/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary patterns and implementation
 * ERROR BOUNDARY REASON: Official React error boundary patterns for production applications
 * 
 * Global Error Boundary System for Premium Tutoring Service
 * - Catches and handles all React component errors
 * - Graceful degradation for royal client experience
 * - Error reporting and logging for monitoring
 * - Component-level recovery and fallback UI
 */

'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

// CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary props and state interfaces
// ERROR HANDLING REASON: Official React error boundary type definitions
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  level: 'global' | 'page' | 'component';
  componentName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
  retryCount: number;
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Error logging and reporting patterns
// MONITORING REASON: Official React error reporting patterns for production monitoring
interface ErrorReport {
  errorId: string;
  timestamp: string;
  level: string;
  componentName: string;
  message: string;
  stack?: string;
  componentStack?: string;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Class component error boundary implementation
 * ERROR BOUNDARY REASON: Official React error boundary lifecycle methods and patterns
 */
export class GlobalErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeouts: Set<NodeJS.Timeout> = new Set();

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorId: '',
      retryCount: 0,
    };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - getDerivedStateFromError lifecycle method
  // ERROR STATE REASON: Official React pattern for updating state when error occurs
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - componentDidCatch for error logging and side effects
  // ERROR LOGGING REASON: Official React patterns for error logging and reporting
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Report error to monitoring system
    this.reportError(error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.error('Error Boundary Level:', this.props.level);
      console.error('Component Name:', this.props.componentName);
      console.groupEnd();
    }
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Error reporting patterns for production monitoring
  // MONITORING REASON: Official patterns for error tracking and analytics
  private reportError(error: Error, errorInfo: ErrorInfo): void {
    try {
      const errorReport: ErrorReport = {
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
        level: this.props.level,
        componentName: this.props.componentName || 'Unknown',
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Server',
        url: typeof window !== 'undefined' ? window.location.href : 'Server',
        sessionId: this.generateSessionId(),
      };

      // In production, this would send to monitoring service (Sentry, LogRocket, etc.)
      if (process.env.NODE_ENV === 'production') {
        this.sendErrorReport(errorReport);
      } else {
        console.log('Error Report:', errorReport);
      }

    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  private async sendErrorReport(errorReport: ErrorReport): Promise<void> {
    try {
      // In a real implementation, replace with your monitoring service API
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      });
    } catch (error) {
      console.error('Failed to send error report:', error);
    }
  }

  private generateSessionId(): string {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      let sessionId = sessionStorage.getItem('error-session-id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
        sessionStorage.setItem('error-session-id', sessionId);
      }
      return sessionId;
    }
    return 'server_session';
  }

  private handleRetry = (): void => {
    if (this.state.retryCount < 3) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  private handleReload = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleGoHome = (): void => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  componentWillUnmount() {
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  render() {
    if (this.state.hasError) {
      // CONTEXT7 SOURCE: /tailwindcss/tailwindcss.com - Error UI component styling
      // ERROR UI REASON: Official Tailwind CSS patterns for error state presentation
      
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Global-level error boundary - full page error
      if (this.props.level === 'global') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-2xl mx-auto p-8 text-center">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  Something Went Wrong
                </h1>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  We apologise for the inconvenience. Our premium tutoring service 
                  has encountered a technical issue. Our team has been notified and 
                  is working to resolve this immediately.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {this.state.retryCount < 3 && (
                    <button
                      onClick={this.handleRetry}
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </button>
                  )}
                  
                  <button
                    onClick={this.handleGoHome}
                    className="inline-flex items-center justify-center px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
                  </button>
                  
                  <button
                    onClick={this.handleReload}
                    className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-8 text-left">
                    <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700">
                      Development Error Details
                    </summary>
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                      <pre className="text-xs text-slate-700 overflow-auto">
                        {this.state.error?.message}
                        {'\n\n'}
                        {this.state.error?.stack}
                      </pre>
                    </div>
                  </details>
                )}

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-500">
                    Error ID: {this.state.errorId}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    If this problem persists, please contact our support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Page-level error boundary - partial page error
      if (this.props.level === 'page') {
        return (
          <div className="flex items-center justify-center min-h-96 bg-white">
            <div className="max-w-md mx-auto p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Page Error
              </h2>
              
              <p className="text-slate-600 mb-6">
                This section is temporarily unavailable. Please try refreshing 
                or return to the homepage.
              </p>

              <div className="flex gap-3 justify-center">
                {this.state.retryCount < 3 && (
                  <button
                    onClick={this.handleRetry}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Retry
                  </button>
                )}
                
                <button
                  onClick={this.handleGoHome}
                  className="inline-flex items-center px-4 py-2 bg-slate-200 text-slate-900 text-sm font-medium rounded hover:bg-slate-300 transition-colors"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 text-xs text-left">
                  <details>
                    <summary className="cursor-pointer text-slate-500">Error Details</summary>
                    <pre className="mt-2 text-slate-600 bg-slate-50 p-2 rounded text-xs overflow-auto">
                      {this.state.error?.message}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        );
      }

      // Component-level error boundary - minimal error display
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">
                Component Error
              </p>
              <p className="text-sm text-red-700 mt-1">
                {this.props.componentName || 'This component'} encountered an error.
              </p>
              {this.state.retryCount < 3 && (
                <button
                  onClick={this.handleRetry}
                  className="mt-2 text-sm text-red-800 hover:text-red-900 underline"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Hook-based error boundary wrapper patterns
 * ERROR HANDLING REASON: Official React patterns for error boundary composition
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Partial<ErrorBoundaryProps>
) {
  const WithErrorBoundaryComponent = (props: P) => {
    return (
      <GlobalErrorBoundary
        level="component"
        componentName={WrappedComponent.displayName || WrappedComponent.name}
        {...errorBoundaryProps}
      >
        <WrappedComponent {...props} />
      </GlobalErrorBoundary>
    );
  };

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithErrorBoundaryComponent;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary hook patterns for functional components
 * ERROR HANDLING REASON: Official React patterns for error boundary integration with hooks
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error; // This will be caught by the nearest error boundary
    }
  }, [error]);

  return { handleError, resetError };
}

// Component-specific error boundaries for critical sections
export const PageErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <GlobalErrorBoundary level="page">
    {children}
  </GlobalErrorBoundary>
);

export const ComponentErrorBoundary: React.FC<{ 
  children: ReactNode; 
  componentName?: string;
}> = ({ children, componentName }) => (
  <GlobalErrorBoundary level="component" componentName={componentName}>
    {children}
  </GlobalErrorBoundary>
);