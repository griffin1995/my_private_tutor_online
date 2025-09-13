/**
 * CONTEXT7 SOURCE: /facebook/react - Error boundary patterns for component isolation
 * IMPLEMENTATION REASON: Official React documentation recommends error boundaries to prevent cascade failures
 * 
 * TESTIMONIALS ERROR BOUNDARY - NAVBAR CONFLICT RESOLUTION
 * 
 * Purpose: Isolate testimonials page rendering failures from affecting global navigation
 * Root Cause: Dynamic import hydration boundaries causing navbar event handler conflicts
 * Solution: React Error Boundary with performance tracking and graceful degradation
 * 
 * Business Impact: Prevents £400,000+ revenue loss from page-wide failures
 * Royal Standards: Premium fallback experience maintaining client expectations
 */

"use client";

import { Component, ErrorInfo, ReactNode } from 'react';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface definitions for error boundary props
// TYPE SAFETY REASON: Official TypeScript patterns for React component prop typing
interface TestimonialsErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface TestimonialsErrorBoundaryState {
  hasError: boolean;
  errorType: 'hydration' | 'runtime' | 'performance' | 'unknown';
  errorMessage?: string;
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Error boundary class component implementation
 * ERROR BOUNDARY REASON: Official React documentation shows class components required for error boundaries
 * 
 * TestimonialsErrorBoundary Component
 * 
 * Features:
 * - Catches hydration mismatches that affect navbar functionality
 * - Provides graceful fallback UI maintaining royal client standards
 * - Performance tracking for optimization metrics
 * - Error classification for targeted debugging
 * - Automatic recovery suggestions for users
 */
export class TestimonialsErrorBoundary extends Component<
  TestimonialsErrorBoundaryProps,
  TestimonialsErrorBoundaryState
> {
  constructor(props: TestimonialsErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      errorType: 'unknown' 
    };
  }

  // CONTEXT7 SOURCE: /facebook/react - getDerivedStateFromError for error state management
  // ERROR CLASSIFICATION REASON: Official React patterns for categorizing different error types
  static getDerivedStateFromError(error: Error): TestimonialsErrorBoundaryState {
    // Classify error types for targeted handling
    let errorType: TestimonialsErrorBoundaryState['errorType'] = 'unknown';
    
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      errorType = 'performance';
    } else if (error.message.includes('Hydration') || error.message.includes('hydration')) {
      errorType = 'hydration';
    } else if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      errorType = 'runtime';
    }

    return {
      hasError: true,
      errorType,
      errorMessage: error.message
    };
  }

  // CONTEXT7 SOURCE: /facebook/react - componentDidCatch for error logging and recovery
  // ERROR HANDLING REASON: Official React documentation recommends componentDidCatch for error reporting and cleanup
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Performance tracking for optimization metrics
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark('testimonials-error-boundary-activated');
      
      // Track error type for analytics
      performance.measure(
        `testimonials-error-${this.state.errorType}`,
        'testimonials-error-boundary-activated'
      );
    }

    // Log error with context for debugging
    console.error('TestimonialsErrorBoundary caught an error:', {
      error: error,
      errorInfo: errorInfo,
      errorType: this.state.errorType,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  // CONTEXT7 SOURCE: /facebook/react - Error boundary render method with fallback UI
  // FALLBACK REASON: Official React patterns for providing user-friendly error recovery
  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default premium fallback UI maintaining royal standards
      return (
        <div className="testimonials-error-boundary-fallback">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Premium error styling */}
          {/* STYLING REASON: Royal client standards require elegant error handling */}
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    className="w-8 h-8 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" 
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-bold text-primary-900 mb-2">
                  Student Testimonials Temporarily Unavailable
                </h2>
                <p className="text-primary-600 mb-6">
                  We're working to restore this section. Our testimonials showcase the exceptional results 
                  achieved by students and families working with our expert tutors.
                </p>
              </div>

              {/* Error type specific messaging */}
              {this.state.errorType === 'performance' && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Loading Issue Detected
                  </h3>
                  <p className="text-blue-800 text-sm">
                    Please refresh the page or try again in a moment. If the issue persists, 
                    contact our support team for assistance.
                  </p>
                </div>
              )}

              {this.state.errorType === 'hydration' && (
                <div className="bg-amber-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-amber-900 mb-2">
                    Page Loading Synchronisation Issue
                  </h3>
                  <p className="text-amber-800 text-sm">
                    A technical synchronisation issue occurred. Please refresh the page to restore 
                    full functionality including our comprehensive testimonials.
                  </p>
                </div>
              )}

              {/* Recovery actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border border-primary-300 text-primary-700 rounded-xl hover:bg-primary-50 transition-colors font-medium"
                >
                  Go Back
                </button>
              </div>

              {/* Contact information for premium service */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Need immediate assistance? Contact our support team at{' '}
                  <a 
                    href="mailto:support@myprivatetutoronline.co.uk" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    support@myprivatetutoronline.co.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export type definitions for external usage
// TYPE EXPORT REASON: Official TypeScript patterns for component API documentation
export type { TestimonialsErrorBoundaryProps, TestimonialsErrorBoundaryState };