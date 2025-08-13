/**
 * CONTEXT7 SOURCE: /context7/react_dev - Error boundary component exports and types
 * ERROR BOUNDARY EXPORTS: Comprehensive error boundary system exports
 * 
 * Error Boundary Component System - Centralised Error Management
 * Component exports for enterprise-grade error handling and recovery
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through error-free FAQ experience
 * ERROR PREVENTION: Comprehensive error boundary system preventing revenue loss
 * ROYAL CLIENT PROTECTION: Premium error handling maintaining client trust
 */

// CONTEXT7 SOURCE: /context7/react_dev - Error boundary component exports
// COMPONENT EXPORTS: Centralised error boundary component system
export { GlobalErrorBoundary, withErrorBoundary, useErrorHandler } from './GlobalErrorBoundary'
export { FAQErrorBoundary } from './FAQErrorBoundary'
export { SearchErrorBoundary } from './SearchErrorBoundary'
export { ComponentErrorBoundary } from './ComponentErrorBoundary'

// Error boundary types and interfaces
export type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorReport,
  ErrorRecoveryOptions
} from './types'

// Error boundary utilities and helpers
export {
  createErrorReport,
  isRetryableError,
  shouldShowErrorDetails,
  formatErrorMessage,
  getErrorSeverity
} from './utils'

// Recovery and fallback components
export { ErrorFallback } from './ErrorFallback'
export { ErrorRetryButton } from './ErrorRetryButton'
export { ErrorContactSupport } from './ErrorContactSupport'