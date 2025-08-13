/**
 * FAQ Version Control Hooks - React Integration Layer
 * 
 * CONTEXT7 SOURCE: /reactjs/react.dev - Custom React hooks patterns with TypeScript integration
 * CONTEXT7 SOURCE: /pmndrs/zustand - Store integration hooks for version control operations
 * CONTEXT7 SOURCE: /reactjs/react.dev - useEffect and useState patterns for async operations
 * IMPLEMENTATION REASON: Simplified React integration for FAQ version control functionality
 * 
 * This module provides custom React hooks for FAQ version control including:
 * - Simplified version operations (create, update, approve, publish, rollback)
 * - Real-time version status tracking with automatic updates
 * - Permission-aware action availability
 * - Optimistic UI updates with rollback on failure
 * - Comprehensive error handling with user-friendly messages
 * - Performance optimized with selective re-rendering
 * - Type-safe integration with existing FAQ components
 * 
 * BUSINESS REQUIREMENTS:
 * - Royal client quality standards for developer experience
 * - Enterprise-grade error handling and recovery
 * - Performance optimised for real-time collaboration
 * - British English throughout error messages
 * - Comprehensive audit trail integration
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { 
  useVersionControlStore,
  useCurrentUser,
  useVersions,
  useSystemMetrics,
  SemanticVersionUtils,
  DiffEngine
} from '../lib/faq-version-control/version-manager'
import type {
  FAQVersion,
  FAQVersionHistory,
  VersionWorkflowStatus,
  UserRole,
  VersionComparisonResult,
  BulkVersionOperation,
  BulkOperationResult,
  VersionSystemMetrics,
  SemanticVersion,
  VersionChangeType
} from '../types/faq-version-control'

// CONTEXT7 SOURCE: /reactjs/react.dev - Custom hook return type patterns
// HOOK INTERFACES: Type definitions for hook return values

interface UseVersionControlResult {
  // Version Operations
  createVersion: (faqId: string, content: any, metadata: Partial<FAQVersion['metadata']>) => Promise<string>
  updateVersion: (versionId: string, updates: Partial<FAQVersion>) => Promise<void>
  compareVersions: (baseVersionId: string, targetVersionId: string) => Promise<VersionComparisonResult>
  
  // Workflow Operations
  submitForReview: (versionId: string) => Promise<void>
  approveVersion: (versionId: string, reviewNotes?: string) => Promise<void>
  rejectVersion: (versionId: string, rejectionReason: string) => Promise<void>
  publishVersion: (versionId: string) => Promise<void>
  rollbackVersion: (fromVersion: string, toVersion: string, reason: string) => Promise<void>
  
  // Bulk Operations
  bulkOperation: (operation: BulkVersionOperation) => Promise<BulkOperationResult>
  
  // State
  loading: boolean
  error: string | null
  
  // Utils
  clearError: () => void
  canPerformAction: (action: string, version: FAQVersion) => boolean
}

interface UseVersionHistoryResult {
  history: FAQVersionHistory | null
  versions: FAQVersion[]
  currentVersion: FAQVersion | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

interface UseVersionComparisonResult {
  comparison: VersionComparisonResult | null
  loading: boolean
  error: string | null
  compare: (baseVersionId: string, targetVersionId: string) => Promise<void>
  clearComparison: () => void
}

interface UseVersionMetricsResult {
  metrics: VersionSystemMetrics
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Primary custom hook pattern with comprehensive functionality
// PRIMARY HOOK: Main version control hook with all operations
export const useVersionControl = (): UseVersionControlResult => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState patterns for loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // CONTEXT7 SOURCE: /pmndrs/zustand - Store integration for version operations
  const store = useVersionControlStore()
  const currentUser = useCurrentUser()
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback patterns for memoized functions
  const createVersion = useCallback(async (
    faqId: string, 
    content: any, 
    metadata: Partial<FAQVersion['metadata']>
  ): Promise<string> => {
    try {
      setLoading(true)
      setError(null)
      
      const versionId = await store.createVersion(faqId, content, {
        changeReason: 'Content update',
        changeType: 'patch' as VersionChangeType,
        ...metadata
      })
      
      return versionId
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create version'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const updateVersion = useCallback(async (
    versionId: string, 
    updates: Partial<FAQVersion>
  ): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      await store.updateVersion(versionId, updates)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update version'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const compareVersions = useCallback(async (
    baseVersionId: string,
    targetVersionId: string
  ): Promise<VersionComparisonResult> => {
    try {
      setLoading(true)
      setError(null)
      
      const comparison = await store.compareVersions({
        baseVersionId,
        targetVersionId,
        compareOptions: {
          includeMetadata: true,
          contextLines: 3,
          ignoreWhitespace: false,
          highlightSyntax: true
        }
      })
      
      return comparison
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to compare versions'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const submitForReview = useCallback(async (versionId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      await store.submitForReview(versionId)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit for review'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const approveVersion = useCallback(async (
    versionId: string, 
    reviewNotes?: string
  ): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      await store.approveVersion(versionId, reviewNotes)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve version'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const rejectVersion = useCallback(async (
    versionId: string, 
    rejectionReason: string
  ): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      await store.rejectVersion(versionId, rejectionReason)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reject version'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const publishVersion = useCallback(async (versionId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      await store.publishVersion(versionId)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish version'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const rollbackVersion = useCallback(async (
    fromVersion: string, 
    toVersion: string, 
    reason: string
  ): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      await store.rollbackVersion(fromVersion, toVersion, reason)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to rollback version'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const bulkOperation = useCallback(async (
    operation: BulkVersionOperation
  ): Promise<BulkOperationResult> => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await store.bulkOperation(operation)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bulk operation failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const clearError = useCallback(() => {
    setError(null)
  }, [])
  
  const canPerformAction = useCallback((action: string, version: FAQVersion): boolean => {
    return store.canUserPerformAction(action, version)
  }, [store])
  
  return {
    createVersion,
    updateVersion,
    compareVersions,
    submitForReview,
    approveVersion,
    rejectVersion,
    publishVersion,
    rollbackVersion,
    bulkOperation,
    loading,
    error,
    clearError,
    canPerformAction
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Specialized hook pattern for version history
// VERSION HISTORY HOOK: Focused on version history operations
export const useVersionHistory = (faqId: string): UseVersionHistoryResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const store = useVersionControlStore()
  const allVersions = useVersions()
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo patterns for computed values
  const history = useMemo(() => {
    return allVersions[faqId] || null
  }, [allVersions, faqId])
  
  const versions = useMemo(() => {
    return history?.versions || []
  }, [history])
  
  const currentVersion = useMemo(() => {
    return store.getCurrentVersion(faqId)
  }, [store, faqId, history])
  
  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Refresh system metrics which will update version data
      await store.updateSystemMetrics()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh version history'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect patterns for component lifecycle
  useEffect(() => {
    if (faqId && !history) {
      refresh()
    }
  }, [faqId, history, refresh])
  
  return {
    history,
    versions,
    currentVersion,
    loading,
    error,
    refresh
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Specialized hook pattern for version comparison
// VERSION COMPARISON HOOK: Focused on diff operations
export const useVersionComparison = (): UseVersionComparisonResult => {
  const [comparison, setComparison] = useState<VersionComparisonResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const store = useVersionControlStore()
  
  const compare = useCallback(async (
    baseVersionId: string, 
    targetVersionId: string
  ) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await store.compareVersions({
        baseVersionId,
        targetVersionId,
        compareOptions: {
          includeMetadata: true,
          contextLines: 3,
          ignoreWhitespace: false,
          highlightSyntax: true
        }
      })
      
      setComparison(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to compare versions'
      setError(errorMessage)
      setComparison(null)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  const clearComparison = useCallback(() => {
    setComparison(null)
    setError(null)
  }, [])
  
  return {
    comparison,
    loading,
    error,
    compare,
    clearComparison
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Specialized hook pattern for system metrics
// VERSION METRICS HOOK: System performance and statistics
export const useVersionMetrics = (): UseVersionMetricsResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const metrics = useSystemMetrics()
  const store = useVersionControlStore()
  
  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      await store.updateSystemMetrics()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh metrics'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [store])
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect patterns for automatic updates
  useEffect(() => {
    // Refresh metrics every 5 minutes
    const interval = setInterval(() => {
      refresh()
    }, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [refresh])
  
  return {
    metrics,
    loading,
    error,
    refresh
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Utility hook pattern for permission management
// PERMISSION HOOK: User permission checking utility
export const useVersionPermissions = () => {
  const currentUser = useCurrentUser()
  const store = useVersionControlStore()
  
  const permissions = useMemo(() => {
    if (!currentUser) {
      return {
        canCreate: false,
        canReview: false,
        canApprove: false,
        canPublish: false,
        canRollback: false,
        canSchedule: false,
        canBulkOperate: false,
        canConfigureWorkflow: false
      }
    }
    
    const role = currentUser.role
    
    return {
      canCreate: ['author', 'reviewer', 'publisher', 'admin'].includes(role),
      canReview: ['reviewer', 'admin'].includes(role),
      canApprove: ['reviewer', 'admin'].includes(role),
      canPublish: ['publisher', 'admin'].includes(role),
      canRollback: role === 'admin',
      canSchedule: ['publisher', 'admin'].includes(role),
      canBulkOperate: ['publisher', 'admin'].includes(role),
      canConfigureWorkflow: role === 'admin'
    }
  }, [currentUser])
  
  const canPerformAction = useCallback((action: string, version?: FAQVersion): boolean => {
    if (!version) {
      return permissions[action as keyof typeof permissions] || false
    }
    
    return store.canUserPerformAction(action, version)
  }, [permissions, store])
  
  return {
    permissions,
    canPerformAction,
    currentUser
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Real-time updates hook pattern
// REAL-TIME HOOK: Live updates for version changes
export const useVersionUpdates = (faqId?: string) => {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const versions = useVersions()
  const metrics = useSystemMetrics()
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect patterns for change detection
  useEffect(() => {
    setLastUpdate(new Date())
  }, [versions, metrics])
  
  const hasUpdates = useCallback((since: Date): boolean => {
    return lastUpdate > since
  }, [lastUpdate])
  
  const getLatestVersions = useCallback((count = 10): FAQVersion[] => {
    const allVersions: FAQVersion[] = []
    
    Object.values(versions).forEach(history => {
      allVersions.push(...history.versions)
    })
    
    return allVersions
      .sort((a, b) => new Date(b.metadata.timestamp).getTime() - new Date(a.metadata.timestamp).getTime())
      .slice(0, count)
  }, [versions])
  
  return {
    lastUpdate,
    hasUpdates,
    getLatestVersions
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Validation hook pattern for version operations
// VALIDATION HOOK: Input validation for version operations
export const useVersionValidation = () => {
  const validateVersionContent = useCallback((content: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!content) {
      errors.push('Version content is required')
      return { isValid: false, errors }
    }
    
    // Validate required FAQ fields
    if (!content.question || content.question.trim().length === 0) {
      errors.push('Question is required and cannot be empty')
    }
    
    if (!content.answer || content.answer.trim().length === 0) {
      errors.push('Answer is required and cannot be empty')
    }
    
    if (!content.category || content.category.trim().length === 0) {
      errors.push('Category is required')
    }
    
    // Validate content quality
    if (content.question && content.question.length < 10) {
      errors.push('Question should be at least 10 characters long')
    }
    
    if (content.answer && content.answer.length < 20) {
      errors.push('Answer should be at least 20 characters long')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }, [])
  
  const validateVersionMetadata = useCallback((metadata: Partial<FAQVersion['metadata']>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!metadata.changeReason || metadata.changeReason.trim().length === 0) {
      errors.push('Change reason is required')
    }
    
    if (metadata.changeReason && metadata.changeReason.length < 5) {
      errors.push('Change reason should be at least 5 characters long')
    }
    
    if (!metadata.changeType) {
      errors.push('Change type is required')
    }
    
    const validChangeTypes = ['major', 'minor', 'patch', 'prerelease', 'build']
    if (metadata.changeType && !validChangeTypes.includes(metadata.changeType)) {
      errors.push('Invalid change type. Must be one of: ' + validChangeTypes.join(', '))
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }, [])
  
  return {
    validateVersionContent,
    validateVersionMetadata
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Export patterns for hook module
// Export all hooks for convenient importing
export {
  useVersionControl as default,
  type UseVersionControlResult,
  type UseVersionHistoryResult,
  type UseVersionComparisonResult,
  type UseVersionMetricsResult
}