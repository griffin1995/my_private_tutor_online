/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Safe object rendering patterns with error boundaries
 * CONTEXT7 SOURCE: /microsoft/typescript - Type guards for runtime safety
 * 
 * TESTIMONIAL SAFE RENDERER: Prevents "Objects are not valid as a React child" errors
 * ERROR PREVENTION: Guards against direct object rendering in testimonials
 * DEBUGGING AID: Provides clear error messages for development debugging
 * 
 * This component addresses the critical React error:
 * "Objects are not valid as a React child (found: object with keys {quote, author, role})"
 */

'use client'

import React, { ReactNode, ErrorInfo } from 'react'

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interfaces for safe testimonial rendering
export interface TestimonialData {
  quote: string
  author: string
  role: string
  rating?: number
  avatar?: string
  verified?: boolean
  date?: string
  location?: string
  subject?: string
  result?: string
  [key: string]: any // Allow additional properties
}

// CONTEXT7 SOURCE: /microsoft/typescript - Type guard functions for runtime validation
export const isValidTestimonialData = (data: any): data is TestimonialData => {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.quote === 'string' &&
    typeof data.author === 'string' &&
    typeof data.role === 'string'
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary patterns for React object rendering
export class TestimonialErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Check if this is the specific object rendering error
    if (error.message.includes('Objects are not valid as a React child')) {
      return { hasError: true, error }
    }
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the specific object rendering error for debugging
    console.error('TestimonialErrorBoundary caught an error:', error)
    console.error('Error Info:', errorInfo)
    
    if (error.message.includes('Objects are not valid as a React child')) {
      console.error('🚨 TESTIMONIAL OBJECT RENDERING ERROR DETECTED:')
      console.error('This error occurs when a testimonial object is rendered directly in JSX')
      console.error('instead of accessing its properties (quote, author, role)')
      console.error('Check for missing return statements or direct object rendering')
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="testimonial-error p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Testimonial Rendering Error</h3>
          <p className="text-red-600 text-sm">
            Failed to render testimonial. Please check the console for details.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-2">
              <summary className="text-red-700 cursor-pointer">Error Details</summary>
              <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Safe testimonial rendering component
export interface SafeTestimonialRendererProps {
  testimonial: TestimonialData | any
  layout?: 'card' | 'inline' | 'compact'
  showRating?: boolean
  showAvatar?: boolean
  className?: string
  onError?: (error: Error, testimonial: any) => void
}

/**
 * Safe Testimonial Renderer Component
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component patterns for safe object rendering
 * 
 * This component ensures testimonial objects are never rendered directly,
 * preventing the "Objects are not valid as a React child" error.
 */
export const SafeTestimonialRenderer: React.FC<SafeTestimonialRendererProps> = ({
  testimonial,
  layout = 'card',
  showRating = true,
  showAvatar = true,
  className = '',
  onError
}) => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Runtime type checking for error prevention
  // Validate the testimonial data at runtime
  if (!isValidTestimonialData(testimonial)) {
    const error = new Error(
      `Invalid testimonial data: Expected object with {quote, author, role}, got: ${
        typeof testimonial === 'object' 
          ? JSON.stringify(Object.keys(testimonial || {})) 
          : typeof testimonial
      }`
    )
    
    if (onError) {
      onError(error, testimonial)
    }
    
    console.error('🚨 TESTIMONIAL VALIDATION FAILED:', error.message)
    console.error('Received data:', testimonial)
    
    return (
      <div className="testimonial-validation-error p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800 text-sm">
          ⚠️ Invalid testimonial data detected
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="text-xs text-yellow-600 mt-1">
            {error.message}
          </pre>
        )}
      </div>
    )
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Safe object destructuring for React rendering
  // Safely destructure the testimonial object to prevent direct rendering
  const {
    quote,
    author,
    role,
    rating = 5,
    avatar,
    verified = false,
    date,
    location,
    subject,
    result
  } = testimonial

  // Render based on layout preference
  const renderTestimonial = () => {
    switch (layout) {
      case 'inline':
        return (
          <span className="testimonial-inline">
            "{quote}" - {author}, {role}
          </span>
        )
      
      case 'compact':
        return (
          <div className="testimonial-compact p-3 bg-gray-50 rounded">
            <blockquote className="text-sm italic">"{quote}"</blockquote>
            <cite className="text-xs text-gray-600 mt-1">
              — {author}, {role}
            </cite>
          </div>
        )
      
      case 'card':
      default:
        return (
          <div className="testimonial-card bg-white p-6 rounded-lg shadow-md border">
            {/* Rating */}
            {showRating && rating && (
              <div className="flex items-center mb-3">
                {Array.from({ length: Math.min(5, Math.max(1, rating)) }, (_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
            )}
            
            {/* Quote */}
            <blockquote className="text-gray-700 italic mb-4">
              "{quote}"
            </blockquote>
            
            {/* Author Info */}
            <div className="flex items-center">
              {showAvatar && avatar && (
                <img 
                  src={avatar} 
                  alt={`${author} avatar`}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
              )}
              <div>
                <div className="font-semibold text-gray-900">{author}</div>
                <div className="text-sm text-gray-600">{role}</div>
                {verified && (
                  <div className="text-xs text-blue-600 mt-1">✓ Verified</div>
                )}
              </div>
            </div>
            
            {/* Additional Info */}
            {(date || location || subject || result) && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 space-y-1">
                  {subject && <div>Subject: {subject}</div>}
                  {result && <div>Result: {result}</div>}
                  {location && <div>Location: {location}</div>}
                  {date && <div>Date: {date}</div>}
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <TestimonialErrorBoundary>
      <div className={`safe-testimonial-renderer ${className}`}>
        {renderTestimonial()}
      </div>
    </TestimonialErrorBoundary>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Higher-order component patterns for error prevention
/**
 * Higher-Order Component for Safe Testimonial Lists
 * Prevents object rendering errors in testimonial arrays
 */
export const withSafeTestimonialRendering = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const SafeTestimonialComponent = (props: P) => (
    <TestimonialErrorBoundary
      fallback={
        <div className="testimonial-list-error p-4 bg-red-50 rounded">
          <p className="text-red-600">Error rendering testimonials list</p>
        </div>
      }
    >
      <Component {...props} />
    </TestimonialErrorBoundary>
  )

  SafeTestimonialComponent.displayName = `withSafeTestimonialRendering(${Component.displayName || Component.name})`
  
  return SafeTestimonialComponent
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Utility functions for safe array rendering
/**
 * Safe testimonial array renderer with error handling
 */
export const safeRenderTestimonials = (
  testimonials: any[],
  renderFunction: (testimonial: TestimonialData, index: number) => ReactNode
): ReactNode[] => {
  if (!Array.isArray(testimonials)) {
    console.error('safeRenderTestimonials: Expected array, got:', typeof testimonials)
    return []
  }

  return testimonials.map((testimonial, index) => {
    try {
      // Validate each testimonial before rendering
      if (!isValidTestimonialData(testimonial)) {
        console.error(`Invalid testimonial at index ${index}:`, testimonial)
        return (
          <div key={`error-${index}`} className="testimonial-error p-2 bg-red-50 rounded text-red-600 text-sm">
            Invalid testimonial data at position {index + 1}
          </div>
        )
      }

      return (
        <TestimonialErrorBoundary key={`testimonial-${index}`}>
          {renderFunction(testimonial, index)}
        </TestimonialErrorBoundary>
      )
    } catch (error) {
      console.error(`Error rendering testimonial at index ${index}:`, error)
      return (
        <div key={`catch-error-${index}`} className="testimonial-error p-2 bg-red-50 rounded text-red-600 text-sm">
          Error rendering testimonial {index + 1}
        </div>
      )
    }
  })
}

export default SafeTestimonialRenderer