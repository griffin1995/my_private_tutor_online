"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary implementation patterns
// ERROR BOUNDARY REASON: Official React documentation demonstrates error boundaries for graceful failure handling

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  enableRecovery?: boolean;
  showDetails?: boolean;
}

interface FooterErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary class component implementation
 * ERROR HANDLING REASON: Official React documentation requires class components for error boundaries
 */
export class FooterErrorBoundary extends Component<FooterErrorBoundaryProps, FooterErrorBoundaryState> {
  private maxRetries = 3;
  
  constructor(props: FooterErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - getDerivedStateFromError implementation
   * STATE DERIVATION REASON: Official React documentation shows state updates from errors
   */
  static getDerivedStateFromError(error: Error): Partial<FooterErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - componentDidCatch implementation
   * ERROR CATCHING REASON: Official React documentation demonstrates error logging and reporting
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // CONTEXT7 SOURCE: /web.dev/performance - Error reporting for monitoring
    // MONITORING REASON: Report errors to performance monitoring service
    this.reportError(error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error details for debugging
    console.error('Footer Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);
  }

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - Error recovery implementation
   * RECOVERY REASON: Provide user-friendly error recovery mechanism
   */
  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - Component state reset
   * RESET REASON: Allow manual error state reset for development
   */
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
  };

  render() {
    if (this.state.hasError) {
      // CONTEXT7 SOURCE: /reactjs/react.dev - Custom error UI rendering
      // FALLBACK REASON: Provide graceful degradation for footer errors
      
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }

      return this.renderErrorFallback();
    }

    return this.props.children;
  }

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - Error fallback UI implementation
   * FALLBACK REASON: Render user-friendly error state for footer failures
   */
  private renderErrorFallback(): ReactNode {
    const { error, retryCount } = this.state;
    const canRetry = this.props.enableRecovery !== false && retryCount < this.maxRetries;

    return (
      <footer 
        className="bg-red-50 border border-red-200 text-red-800 py-8"
        role="contentinfo"
        aria-label="Footer error state"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Footer Loading Error
              </h3>
              <p className="text-red-700 mb-4">
                We're experiencing technical difficulties with the page footer. 
                The main content is still available above.
              </p>
            </div>

            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional retry button rendering */}
            {/* RETRY REASON: Allow users to attempt recovery from footer errors */}
            {canRetry && (
              <Button
                onClick={this.handleRetry}
                variant="outline"
                className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again ({this.maxRetries - retryCount} attempts remaining)
              </Button>
            )}

            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Development error details */}
            {/* DEBUG REASON: Show error details in development for debugging */}
            {this.props.showDetails && process.env.NODE_ENV === 'development' && error && (
              <details className="mt-6 text-left max-w-2xl">
                <summary className="cursor-pointer text-sm font-medium text-red-900 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="bg-red-100 p-4 rounded text-xs text-red-800 overflow-auto">
                  <strong>Error:</strong> {error.message}
                  {'\n\n'}
                  <strong>Stack:</strong> {error.stack}
                  {this.state.errorInfo && (
                    <>
                      {'\n\n'}
                      <strong>Component Stack:</strong> {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}

            {/* Essential footer information even in error state */}
            <div className="mt-8 pt-6 border-t border-red-200 text-sm text-red-600">
              <p>
                <strong>My Private Tutor Online</strong> • Premium tutoring service
              </p>
              <p className="mt-1">
                For immediate assistance, please call{' '}
                <a href="tel:+442038549479" className="underline font-medium">
                  +44 (0) 203 854 9479
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  /**
   * CONTEXT7 SOURCE: /web.dev/performance - Error reporting implementation
   * REPORTING REASON: Send error information to monitoring service for analysis
   */
  private reportError(error: Error, errorInfo: ErrorInfo): void {
    // CONTEXT7 SOURCE: /web.dev/performance - Performance monitoring integration
    // MONITORING REASON: Report footer errors to performance monitoring service
    
    const errorReport = {
      timestamp: new Date().toISOString(),
      component: 'footer',
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      errorInfo: {
        componentStack: errorInfo.componentStack
      },
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      retryCount: this.state.retryCount
    };

    // In production, this would send to actual monitoring service
    // For now, log to console for development debugging
    console.warn('Footer Error Boundary - Error reported:', errorReport);

    // Mock API call to monitoring service
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Would integrate with actual monitoring service (DataDog, Sentry, etc.)
      fetch('/api/errors/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport)
      }).catch((reportingError) => {
        console.error('Failed to report error:', reportingError);
      });
    }
  }
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Higher-order component for error boundary
 * HOC REASON: Provide convenient wrapper for footer components with error boundaries
 */
export function withFooterErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Partial<FooterErrorBoundaryProps>
) {
  const ComponentWithErrorBoundary = (props: P) => {
    return (
      <FooterErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </FooterErrorBoundary>
    );
  };

  ComponentWithErrorBoundary.displayName = `withFooterErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithErrorBoundary;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React hook for error boundary interaction
 * HOOK REASON: Provide programmatic access to error boundary functionality
 */
export function useFooterErrorHandler() {
  const [errorBoundaryRef, setErrorBoundaryRef] = React.useState<FooterErrorBoundary | null>(null);

  const resetErrors = React.useCallback(() => {
    if (errorBoundaryRef) {
      errorBoundaryRef.resetErrorBoundary();
    }
  }, [errorBoundaryRef]);

  const reportError = React.useCallback((error: Error, context?: string) => {
    console.error(`Footer Error${context ? ` in ${context}` : ''}:`, error);
    
    // In production, would report to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Mock error reporting
      const errorReport = {
        timestamp: new Date().toISOString(),
        component: 'footer',
        context: context || 'unknown',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      };
      
      console.warn('Manual error report:', errorReport);
    }
  }, []);

  return {
    resetErrors,
    reportError,
    setErrorBoundaryRef
  };
}

export default FooterErrorBoundary;