/**
 * FAQ Version Control System - Main Export Module
 * 
 * CONTEXT7 SOURCE: /microsoft/typescript - Module export patterns for library organization
 * CONTEXT7 SOURCE: /pmndrs/zustand - State management system exports
 * CONTEXT7 SOURCE: /reactjs/react.dev - React hooks and component exports
 * IMPLEMENTATION REASON: Centralized export point for FAQ version control system
 * 
 * This module provides a single import point for all FAQ version control functionality:
 * - Core version management classes and utilities
 * - React hooks for component integration
 * - TypeScript interfaces for type safety
 * - UI components for administrative interfaces
 * - Configuration and setup utilities
 * 
 * USAGE PATTERNS:
 * ```typescript
 * // Import everything
 * import * as FAQVersionControl from '@/lib/faq-version-control'
 * 
 * // Import specific functionality
 * import { 
 *   useVersionControl, 
 *   FAQVersionControlDashboard,
 *   SemanticVersionUtils 
 * } from '@/lib/faq-version-control'
 * 
 * // Import types
 * import type { FAQVersion, VersionWorkflowStatus } from '@/lib/faq-version-control'
 * ```
 * 
 * BUSINESS REQUIREMENTS:
 * - Royal client quality standards for developer experience
 * - Enterprise-grade API consistency
 * - Performance optimised imports with tree-shaking
 * - British English throughout documentation
 * - Comprehensive TypeScript integration
 */

// CONTEXT7 SOURCE: /pmndrs/zustand - Core state management exports
// CORE SYSTEM: Version control engine and state management
export {
  useVersionControlStore,
  useVersions,
  useCurrentUser,
  useSystemMetrics,
  useAuditLog,
  useVersionConfig,
  SemanticVersionUtils,
  DiffEngine
} from './version-manager'

// CONTEXT7 SOURCE: /reactjs/react.dev - React hooks exports for component integration
// REACT INTEGRATION: Custom hooks for React components
export {
  default as useVersionControl,
  useVersionHistory,
  useVersionComparison,
  useVersionMetrics,
  useVersionPermissions,
  useVersionUpdates,
  useVersionValidation,
  type UseVersionControlResult,
  type UseVersionHistoryResult,
  type UseVersionComparisonResult,
  type UseVersionMetricsResult
} from '../../hooks/use-faq-version-control'

// CONTEXT7 SOURCE: /reactjs/react.dev - React component exports for UI integration
// UI COMPONENTS: Administrative interface components
export { 
  default as FAQVersionControlDashboard,
  VersionHistoryItem,
  MetricCard
} from '../../components/admin/faq-version-control-dashboard'

export { 
  default as FAQVersionDiffViewer
} from '../../components/admin/faq-version-diff-viewer'

export { 
  default as FAQVersionWorkflowManager
} from '../../components/admin/faq-version-workflow-manager'

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions export for external usage
// TYPE DEFINITIONS: All TypeScript interfaces and types
export type {
  // Core Version Types
  FAQVersion,
  FAQVersionHistory,
  SemanticVersion,
  VersionChangeType,
  VersionWorkflowStatus,
  UserRole,
  
  // Diff and Comparison Types
  DiffOperation,
  DiffOperationType,
  VersionDiff,
  VersionComparisonRequest,
  VersionComparisonResult,
  
  // Workflow Types
  VersionWorkflowConfig,
  ScheduledPublication,
  VersionRollback,
  VersionAuditEntry,
  
  // System Configuration Types
  VersionControlConfig,
  VersionSystemMetrics,
  
  // Operation Types
  BulkVersionOperation,
  BulkOperationResult
} from '../../types/faq-version-control'

// CONTEXT7 SOURCE: /microsoft/typescript - Utility functions export for external usage
// UTILITY FUNCTIONS: Helper functions and utilities
export const VersionControlUtils = {
  /**
   * CONTEXT7 SOURCE: /semantic-release/semantic-release - Version validation patterns
   * Validate semantic version string format
   */
  isValidVersionString: (version: string): boolean => {
    const versionRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/
    return versionRegex.test(version)
  },

  /**
   * CONTEXT7 SOURCE: /semantic-release/semantic-release - Version comparison utilities
   * Compare two version strings (-1, 0, 1)
   */
  compareVersionStrings: (a: string, b: string): number => {
    try {
      const versionA = SemanticVersionUtils.parse(a)
      const versionB = SemanticVersionUtils.parse(b)
      return SemanticVersionUtils.compare(versionA, versionB)
    } catch {
      return a.localeCompare(b)
    }
  },

  /**
   * CONTEXT7 SOURCE: /semantic-release/semantic-release - Change impact assessment
   * Determine change impact level from diff statistics
   */
  assessChangeImpact: (additions: number, deletions: number, modifications: number, originalSize: number): 'minor' | 'moderate' | 'major' => {
    const totalChanges = additions + deletions + modifications
    const changePercentage = originalSize > 0 ? (totalChanges / originalSize) * 100 : 100
    
    if (changePercentage < 10) return 'minor'
    if (changePercentage < 50) return 'moderate'
    return 'major'
  },

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - Formatting utilities for UI display
   * Format workflow status for display in British English
   */
  formatWorkflowStatus: (status: VersionWorkflowStatus): string => {
    const statusMap: Record<VersionWorkflowStatus, string> = {
      draft: 'Draft',
      review: 'Under Review',
      approved: 'Approved',
      published: 'Published',
      archived: 'Archived',
      rejected: 'Rejected'
    }
    return statusMap[status] || status
  },

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - Formatting utilities for time display
   * Format timestamp for display in British format
   */
  formatTimestamp: (timestamp: string, options?: { 
    includeTime?: boolean
    includeSeconds?: boolean 
  }): string => {
    const date = new Date(timestamp)
    const { includeTime = true, includeSeconds = false } = options || {}
    
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    
    if (includeTime) {
      dateOptions.hour = '2-digit'
      dateOptions.minute = '2-digit'
      if (includeSeconds) {
        dateOptions.second = '2-digit'
      }
      dateOptions.hour12 = false
    }
    
    return date.toLocaleString('en-GB', dateOptions)
  },

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Data validation utilities
   * Validate FAQ content structure
   */
  validateFAQContent: (content: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!content) {
      errors.push('Content is required')
      return { isValid: false, errors }
    }
    
    const requiredFields = ['question', 'answer', 'category']
    requiredFields.forEach(field => {
      if (!content[field] || content[field].toString().trim().length === 0) {
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`)
      }
    })
    
    // Validate content quality
    if (content.question && content.question.length < 10) {
      errors.push('Question must be at least 10 characters long')
    }
    
    if (content.answer && content.answer.length < 20) {
      errors.push('Answer must be at least 20 characters long')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  /**
   * CONTEXT7 SOURCE: /semantic-release/semantic-release - Permission checking utilities
   * Check if user can perform action based on role and version status
   */
  canUserPerformAction: (
    userRole: UserRole | null, 
    action: string, 
    versionStatus?: VersionWorkflowStatus
  ): boolean => {
    if (!userRole) return false
    
    const roleHierarchy: Record<UserRole, number> = {
      viewer: 1,
      author: 2,
      reviewer: 3,
      publisher: 4,
      admin: 5
    }
    
    const actionPermissions: Record<string, { requiredRole: UserRole; allowedStatuses?: VersionWorkflowStatus[] }> = {
      create: { requiredRole: 'author' },
      edit: { requiredRole: 'author', allowedStatuses: ['draft'] },
      submit: { requiredRole: 'author', allowedStatuses: ['draft'] },
      review: { requiredRole: 'reviewer', allowedStatuses: ['review'] },
      approve: { requiredRole: 'reviewer', allowedStatuses: ['review'] },
      reject: { requiredRole: 'reviewer', allowedStatuses: ['review'] },
      publish: { requiredRole: 'publisher', allowedStatuses: ['approved'] },
      schedule: { requiredRole: 'publisher', allowedStatuses: ['approved'] },
      rollback: { requiredRole: 'admin' },
      archive: { requiredRole: 'publisher' },
      configure: { requiredRole: 'admin' }
    }
    
    const permission = actionPermissions[action]
    if (!permission) return false
    
    // Check role requirement
    const hasRequiredRole = roleHierarchy[userRole] >= roleHierarchy[permission.requiredRole]
    if (!hasRequiredRole) return false
    
    // Check status requirement if applicable
    if (permission.allowedStatuses && versionStatus) {
      return permission.allowedStatuses.includes(versionStatus)
    }
    
    return true
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Configuration constants export
// CONFIGURATION: Default configuration values and constants
export const VersionControlConstants = {
  // Workflow statuses
  WORKFLOW_STATUSES: [
    'draft',
    'review', 
    'approved',
    'published',
    'archived',
    'rejected'
  ] as const,
  
  // Change types
  CHANGE_TYPES: [
    'major',
    'minor', 
    'patch',
    'prerelease',
    'build'
  ] as const,
  
  // User roles
  USER_ROLES: [
    'viewer',
    'author',
    'reviewer', 
    'publisher',
    'admin'
  ] as const,
  
  // System limits
  LIMITS: {
    MAX_VERSIONS_PER_FAQ: 100,
    MAX_AUDIT_LOG_ENTRIES: 1000,
    MAX_BULK_OPERATION_SIZE: 50,
    MAX_VERSION_CONTENT_SIZE: 100000, // 100KB
    MAX_CHANGE_REASON_LENGTH: 500,
    MAX_REVIEW_NOTES_LENGTH: 1000
  },
  
  // Performance thresholds
  PERFORMANCE: {
    DIFF_CALCULATION_TIMEOUT: 5000, // 5 seconds
    BULK_OPERATION_TIMEOUT: 30000, // 30 seconds
    VERSION_CREATION_TIMEOUT: 10000, // 10 seconds
    COMPARISON_TIMEOUT: 15000 // 15 seconds
  },
  
  // UI constants
  UI: {
    DEFAULT_CONTEXT_LINES: 3,
    DEFAULT_PAGE_SIZE: 20,
    REFRESH_INTERVAL: 300000, // 5 minutes
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    NOTIFICATION_DURATION: 5000 // 5 seconds
  }
} as const

// CONTEXT7 SOURCE: /microsoft/typescript - Error classes export for type-safe error handling
// ERROR HANDLING: Custom error classes for version control operations
export class VersionControlError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: Record<string, any>
  ) {
    super(message)
    this.name = 'VersionControlError'
  }
}

export class VersionNotFoundError extends VersionControlError {
  constructor(versionId: string) {
    super(`Version not found: ${versionId}`, 'VERSION_NOT_FOUND', { versionId })
    this.name = 'VersionNotFoundError'
  }
}

export class InvalidWorkflowTransitionError extends VersionControlError {
  constructor(from: VersionWorkflowStatus, to: VersionWorkflowStatus) {
    super(
      `Invalid workflow transition from ${from} to ${to}`, 
      'INVALID_WORKFLOW_TRANSITION', 
      { from, to }
    )
    this.name = 'InvalidWorkflowTransitionError'
  }
}

export class PermissionDeniedError extends VersionControlError {
  constructor(action: string, userRole?: UserRole) {
    super(
      `Permission denied for action: ${action}${userRole ? ` (role: ${userRole})` : ''}`, 
      'PERMISSION_DENIED', 
      { action, userRole }
    )
    this.name = 'PermissionDeniedError'
  }
}

export class ValidationError extends VersionControlError {
  constructor(field: string, message: string, value?: any) {
    super(`Validation error for ${field}: ${message}`, 'VALIDATION_ERROR', { field, value })
    this.name = 'ValidationError'
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Re-export patterns for convenience
// RE-EXPORTS: Re-export SemanticVersionUtils and DiffEngine for convenience
export { SemanticVersionUtils, DiffEngine } from './version-manager'

// CONTEXT7 SOURCE: /microsoft/typescript - Default export pattern for module
// DEFAULT EXPORT: Main version control system object
const FAQVersionControl = {
  // Store and hooks
  useVersionControlStore,
  useVersionControl,
  useVersionHistory,
  useVersionComparison,
  useVersionMetrics,
  useVersionPermissions,
  useVersionUpdates,
  useVersionValidation,
  
  // Components
  FAQVersionControlDashboard,
  FAQVersionDiffViewer,
  FAQVersionWorkflowManager,
  
  // Utilities
  SemanticVersionUtils,
  DiffEngine,
  VersionControlUtils,
  VersionControlConstants,
  
  // Error classes
  VersionControlError,
  VersionNotFoundError,
  InvalidWorkflowTransitionError,
  PermissionDeniedError,
  ValidationError
}

export default FAQVersionControl