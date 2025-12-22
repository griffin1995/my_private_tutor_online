'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Exported interfaces for external use
export interface CookieErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface CookieErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Internal interfaces (kept for backwards compatibility)
interface Props extends CookieErrorBoundaryProps {}
interface State extends CookieErrorBoundaryState {}

/**
 * Error boundary specifically designed for cookie consent components
 * Prevents cookie management failures from crashing the entire application
 *
 * Following React Error Boundary patterns for 2025 best practices
 */
export class CookieErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Cookie Consent Error:', error);
      console.error('Error Info:', errorInfo);
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to analytics service in production
    if (process.env.NODE_ENV === 'production') {
      try {
        // Send error to analytics/monitoring service
        fetch('/api/analytics/error', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: {
              message: error.message,
              stack: error.stack,
              name: error.name,
            },
            errorInfo,
            component: 'CookieConsent',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
          }),
        }).catch(() => {
          // Silently fail - don't let error reporting break the app
        });
      } catch {
        // Silently fail - error reporting should never break the app
      }
    }
  }

  private handleRetry = () => {
    // Reset error state to retry rendering
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Try to reset cookie consent state if possible
    try {
      if (typeof window !== 'undefined' && (window as any).CookieConsent?.reset) {
        (window as any).CookieConsent.reset();
      }
    } catch {
      // Silently fail - this is a fallback attempt
    }
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Card className="p-6 border-l-4 border-red-500 bg-red-50 mx-4 my-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Cookie Settings Unavailable
              </h3>
              <p className="text-red-800 mb-4">
                We're having trouble loading the cookie preference settings.
                This doesn't affect the basic functionality of our website.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-4 p-3 bg-red-100 rounded text-xs">
                  <summary className="cursor-pointer font-medium text-red-900">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap text-red-800">
                    {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={this.handleRetry}
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-red-50 border-red-300 text-red-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-red-700 hover:text-red-800 hover:bg-red-100"
                >
                  <a
                    href="/legal/cookie-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Cookie Policy
                  </a>
                </Button>
              </div>

              <div className="mt-4 text-sm text-red-700">
                <p>
                  <strong>For cookie management:</strong> You can also control cookies
                  through your browser settings or contact our support team.
                </p>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook version of the cookie error boundary for functional components
 * Uses React's error boundary pattern with hooks
 */
export function useCookieErrorHandler() {
  const handleError = React.useCallback((error: Error, errorInfo: ErrorInfo) => {
    // Same error handling logic as the class component
    if (process.env.NODE_ENV === 'development') {
      console.error('Cookie Consent Hook Error:', error);
    }

    // Log to analytics in production
    if (process.env.NODE_ENV === 'production') {
      try {
        fetch('/api/analytics/error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: {
              message: error.message,
              stack: error.stack,
              name: error.name,
            },
            errorInfo,
            component: 'CookieConsentHook',
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      } catch {}
    }
  }, []);

  return { handleError };
}

/**
 * Higher-order component wrapper for cookie consent components
 * Provides error boundary protection with minimal boilerplate
 */
export function withCookieErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <CookieErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </CookieErrorBoundary>
  );

  WithErrorBoundary.displayName = `withCookieErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithErrorBoundary;
}

export default CookieErrorBoundary;