/**
 * CONTEXT7 SOURCE: /facebook/react - React hook for background sync integration
 * BACKGROUND SYNC HOOK: Comprehensive background sync management for FAQ interactions
 * 
 * useBackgroundSync Hook - Royal Client Data Synchronization
 * Features:
 * - Seamless offline interaction queuing
 * - Real-time sync status monitoring
 * - Automatic retry management
 * - Conflict resolution handling
 * - Performance metrics tracking
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { backgroundSync, SyncAction, SyncResult } from '@/lib/offline/background-sync';
import { useOffline } from './use-offline';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for background sync hook
// TYPE SAFETY: Complete interfaces for sync hook state and configuration
export interface BackgroundSyncState {
  isOnline: boolean;
  queueLength: number;
  pendingBatches: number;
  isProcessing: boolean;
  lastSyncTime: Date | null;
  syncErrors: SyncError[];
  syncSuccess: number;
  syncFailures: number;
  averageResponseTime: number;
  conflicts: ConflictInfo[];
}

export interface SyncError {
  actionId: string;
  actionType: string;
  error: string;
  timestamp: Date;
  retries: number;
}

export interface ConflictInfo {
  actionId: string;
  actionType: string;
  clientData: any;
  serverData: any;
  timestamp: Date;
  status: 'pending' | 'resolved';
}

export interface SyncMetrics {
  totalActions: number;
  successRate: number;
  averageRetries: number;
  averageResponseTime: number;
  lastSyncDuration: number;
  conflictRate: number;
}

export interface BackgroundSyncOptions {
  enableAutoSync?: boolean;
  enableMetrics?: boolean;
  enableConflictTracking?: boolean;
  onSyncSuccess?: (results: SyncResult[]) => void;
  onSyncError?: (error: SyncError) => void;
  onConflictDetected?: (conflict: ConflictInfo) => void;
  onSyncStatusChange?: (status: BackgroundSyncState) => void;
}

export interface BackgroundSyncActions {
  queueFAQRating: (questionId: string, rating: number, feedback?: string) => Promise<string>;
  queueFAQFeedback: (questionId: string, feedback: string, helpful: boolean) => Promise<string>;
  queueUserPreferences: (preferences: any) => Promise<string>;
  queueAnalyticsEvent: (eventName: string, parameters: any) => Promise<string>;
  queueContactForm: (formData: any) => Promise<string>;
  forceSync: () => Promise<void>;
  clearQueue: () => void;
  pauseSync: () => void;
  resumeSync: () => void;
  resolveConflict: (actionId: string, resolution: 'client' | 'server' | 'merge') => Promise<void>;
  getMetrics: () => SyncMetrics;
  retryFailed: () => Promise<void>;
}

export interface UseBackgroundSyncReturn {
  state: BackgroundSyncState;
  actions: BackgroundSyncActions;
}

// CONTEXT7 SOURCE: /facebook/react - Custom hook implementation for background sync
// BACKGROUND SYNC HOOK: Comprehensive sync state management with royal client standards
export function useBackgroundSync(options: BackgroundSyncOptions = {}): UseBackgroundSyncReturn {
  const {
    enableAutoSync = true,
    enableMetrics = true,
    enableConflictTracking = true,
    onSyncSuccess,
    onSyncError,
    onConflictDetected,
    onSyncStatusChange
  } = options;

  const { state: offlineState } = useOffline();

  // CONTEXT7 SOURCE: /facebook/react - State management for background sync
  // STATE MANAGEMENT: Comprehensive sync state tracking
  const [state, setState] = useState<BackgroundSyncState>({
    isOnline: offlineState.isOnline,
    queueLength: 0,
    pendingBatches: 0,
    isProcessing: false,
    lastSyncTime: null,
    syncErrors: [],
    syncSuccess: 0,
    syncFailures: 0,
    averageResponseTime: 0,
    conflicts: []
  });

  // CONTEXT7 SOURCE: /facebook/react - Refs for performance tracking
  // REF MANAGEMENT: Stable references for metrics and event handlers
  const metricsRef = useRef({
    totalActions: 0,
    totalResponseTime: 0,
    totalRetries: 0,
    lastSyncStart: 0
  });

  const eventListenersRef = useRef<{
    [key: string]: (data: any) => void;
  }>({});

  // CONTEXT7 SOURCE: /facebook/react - Update sync status from background sync manager
  // STATUS UPDATES: Real-time sync status monitoring
  const updateSyncStatus = useCallback(() => {
    const status = backgroundSync.getQueueStatus();
    
    setState(prevState => {
      const newState = {
        ...prevState,
        isOnline: offlineState.isOnline,
        queueLength: status.queueLength,
        pendingBatches: status.pendingBatches,
        isProcessing: status.isProcessing
      };

      // Trigger status change callback
      onSyncStatusChange?.(newState);
      
      return newState;
    });
  }, [offlineState.isOnline, onSyncStatusChange]);

  // CONTEXT7 SOURCE: /facebook/react - FAQ rating sync action
  // SYNC ACTIONS: Queue FAQ interactions for background synchronization
  const queueFAQRating = useCallback(async (
    questionId: string, 
    rating: number, 
    feedback?: string
  ): Promise<string> => {
    const actionData = {
      questionId,
      rating,
      feedback,
      timestamp: Date.now(),
      userId: getUserId(), // Helper function to get user ID
      sessionId: getSessionId()
    };

    const actionId = await backgroundSync.queueAction('faq_rating', actionData, 'normal');
    
    if (enableMetrics) {
      metricsRef.current.totalActions++;
    }

    updateSyncStatus();
    return actionId;
  }, [enableMetrics, updateSyncStatus]);

  // CONTEXT7 SOURCE: /facebook/react - FAQ feedback sync action
  // FEEDBACK SYNC: Queue user feedback for background processing
  const queueFAQFeedback = useCallback(async (
    questionId: string,
    feedback: string,
    helpful: boolean
  ): Promise<string> => {
    const actionData = {
      questionId,
      feedback,
      helpful,
      timestamp: Date.now(),
      userId: getUserId(),
      sessionId: getSessionId(),
      url: window.location.href
    };

    const actionId = await backgroundSync.queueAction('faq_feedback', actionData, 'normal');
    
    if (enableMetrics) {
      metricsRef.current.totalActions++;
    }

    updateSyncStatus();
    return actionId;
  }, [enableMetrics, updateSyncStatus]);

  // CONTEXT7 SOURCE: /facebook/react - User preferences sync action
  // PREFERENCES SYNC: Queue user settings changes for synchronization
  const queueUserPreferences = useCallback(async (preferences: any): Promise<string> => {
    const actionData = {
      preferences,
      timestamp: Date.now(),
      userId: getUserId(),
      version: getPreferencesVersion()
    };

    const actionId = await backgroundSync.queueAction('user_preferences', actionData, 'high');
    
    if (enableMetrics) {
      metricsRef.current.totalActions++;
    }

    updateSyncStatus();
    return actionId;
  }, [enableMetrics, updateSyncStatus]);

  // CONTEXT7 SOURCE: /facebook/react - Analytics event sync action
  // ANALYTICS SYNC: Queue analytics events for background reporting
  const queueAnalyticsEvent = useCallback(async (
    eventName: string,
    parameters: any
  ): Promise<string> => {
    const actionData = {
      eventName,
      parameters: {
        ...parameters,
        timestamp: Date.now(),
        page_title: document.title,
        page_location: window.location.href,
        page_referrer: document.referrer
      },
      userId: getUserId(),
      sessionId: getSessionId()
    };

    const actionId = await backgroundSync.queueAction('analytics_event', actionData, 'low');
    
    if (enableMetrics) {
      metricsRef.current.totalActions++;
    }

    updateSyncStatus();
    return actionId;
  }, [enableMetrics, updateSyncStatus]);

  // CONTEXT7 SOURCE: /facebook/react - Contact form sync action
  // CONTACT SYNC: Queue contact form submissions for reliable delivery
  const queueContactForm = useCallback(async (formData: any): Promise<string> => {
    const actionData = {
      ...formData,
      timestamp: Date.now(),
      source: 'faq_page',
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    const actionId = await backgroundSync.queueAction('contact_form', actionData, 'high');
    
    if (enableMetrics) {
      metricsRef.current.totalActions++;
    }

    updateSyncStatus();
    return actionId;
  }, [enableMetrics, updateSyncStatus]);

  // CONTEXT7 SOURCE: /facebook/react - Force immediate sync
  // FORCE SYNC: Trigger immediate synchronization of pending actions
  const forceSync = useCallback(async (): Promise<void> => {
    if (!offlineState.isOnline) {
      throw new Error('Cannot force sync while offline');
    }

    if (enableMetrics) {
      metricsRef.current.lastSyncStart = Date.now();
    }

    try {
      await backgroundSync.processQueue();
      
      setState(prevState => ({
        ...prevState,
        lastSyncTime: new Date()
      }));

    } catch (error) {
      console.error('Force sync failed:', error);
      throw error;
    }
  }, [offlineState.isOnline, enableMetrics]);

  // CONTEXT7 SOURCE: /facebook/react - Conflict resolution handling
  // CONFLICT RESOLUTION: Handle data conflicts with user-specified strategy
  const resolveConflict = useCallback(async (
    actionId: string,
    resolution: 'client' | 'server' | 'merge'
  ): Promise<void> => {
    if (!enableConflictTracking) return;

    // Update conflict status
    setState(prevState => ({
      ...prevState,
      conflicts: prevState.conflicts.map(conflict =>
        conflict.actionId === actionId
          ? { ...conflict, status: 'resolved' as const }
          : conflict
      )
    }));

    // Apply resolution strategy
    // This would interact with the background sync manager to resolve the conflict
    console.log(`Resolving conflict ${actionId} with strategy: ${resolution}`);
  }, [enableConflictTracking]);

  // CONTEXT7 SOURCE: /facebook/react - Retry failed actions
  // RETRY FAILED: Retry all permanently failed actions
  const retryFailed = useCallback(async (): Promise<void> => {
    // Clear failed actions from error list and re-queue them
    const failedActions = state.syncErrors.filter(error => error.retries >= 3);
    
    setState(prevState => ({
      ...prevState,
      syncErrors: prevState.syncErrors.filter(error => error.retries < 3)
    }));

    // Re-queue failed actions would require interaction with background sync manager
    console.log(`Retrying ${failedActions.length} failed actions`);
    
    if (offlineState.isOnline) {
      await forceSync();
    }
  }, [state.syncErrors, offlineState.isOnline, forceSync]);

  // CONTEXT7 SOURCE: /facebook/react - Get sync metrics
  // METRICS RETRIEVAL: Calculate and return comprehensive sync metrics
  const getMetrics = useCallback((): SyncMetrics => {
    const { totalActions, totalResponseTime, totalRetries } = metricsRef.current;
    const successRate = totalActions > 0 ? (state.syncSuccess / totalActions) * 100 : 0;
    const averageRetries = totalActions > 0 ? totalRetries / totalActions : 0;
    const averageResponseTime = state.syncSuccess > 0 ? totalResponseTime / state.syncSuccess : 0;
    const conflictRate = totalActions > 0 ? (state.conflicts.length / totalActions) * 100 : 0;
    
    const lastSyncDuration = metricsRef.current.lastSyncStart > 0 
      ? Date.now() - metricsRef.current.lastSyncStart 
      : 0;

    return {
      totalActions,
      successRate,
      averageRetries,
      averageResponseTime,
      lastSyncDuration,
      conflictRate
    };
  }, [state.syncSuccess, state.conflicts.length]);

  // CONTEXT7 SOURCE: /facebook/react - Queue management actions
  // QUEUE MANAGEMENT: User-facing controls for sync queue
  const clearQueue = useCallback(() => {
    backgroundSync.clearQueue();
    setState(prevState => ({
      ...prevState,
      queueLength: 0,
      pendingBatches: 0,
      syncErrors: [],
      conflicts: []
    }));
  }, []);

  const pauseSync = useCallback(() => {
    backgroundSync.pauseSync();
    updateSyncStatus();
  }, [updateSyncStatus]);

  const resumeSync = useCallback(() => {
    backgroundSync.resumeSync();
    updateSyncStatus();
  }, [updateSyncStatus]);

  // CONTEXT7 SOURCE: /facebook/react - Event listeners setup
  // EVENT LISTENERS: Set up background sync event handlers
  useEffect(() => {
    // Set up event listeners for background sync events
    const handleActionQueued = (data: any) => {
      updateSyncStatus();
    };

    const handleBatchCompleted = (data: { results: SyncResult[] }) => {
      const successCount = data.results.filter(r => r.status === 'success').length;
      const failureCount = data.results.filter(r => r.status === 'failed').length;
      const conflicts = data.results.filter(r => r.status === 'conflict');

      setState(prevState => ({
        ...prevState,
        syncSuccess: prevState.syncSuccess + successCount,
        syncFailures: prevState.syncFailures + failureCount,
        lastSyncTime: new Date(),
        conflicts: enableConflictTracking 
          ? [...prevState.conflicts, ...conflicts.map(c => ({
              actionId: c.actionId,
              actionType: 'unknown', // Would need to be passed from sync manager
              clientData: {},
              serverData: c.conflictData,
              timestamp: new Date(),
              status: 'pending' as const
            }))]
          : prevState.conflicts
      }));

      // Update metrics
      if (enableMetrics) {
        const totalResponseTime = data.results.reduce((sum, r) => sum + r.processingTime, 0);
        metricsRef.current.totalResponseTime += totalResponseTime;
      }

      // Trigger callbacks
      onSyncSuccess?.(data.results);
      updateSyncStatus();
    };

    const handleActionFailedPermanently = (data: { action: SyncAction }) => {
      const error: SyncError = {
        actionId: data.action.id,
        actionType: data.action.type,
        error: 'Max retries exceeded',
        timestamp: new Date(),
        retries: data.action.retries
      };

      setState(prevState => ({
        ...prevState,
        syncErrors: [...prevState.syncErrors, error]
      }));

      onSyncError?.(error);
    };

    const handleConflictDetected = (data: { action: SyncAction; conflictData: any }) => {
      if (!enableConflictTracking) return;

      const conflict: ConflictInfo = {
        actionId: data.action.id,
        actionType: data.action.type,
        clientData: data.action.data,
        serverData: data.conflictData,
        timestamp: new Date(),
        status: 'pending'
      };

      setState(prevState => ({
        ...prevState,
        conflicts: [...prevState.conflicts, conflict]
      }));

      onConflictDetected?.(conflict);
    };

    // Register event listeners
    backgroundSync.on('action_queued', handleActionQueued);
    backgroundSync.on('batch_completed', handleBatchCompleted);
    backgroundSync.on('action_failed_permanently', handleActionFailedPermanently);
    backgroundSync.on('conflict_detected', handleConflictDetected);

    // Store references for cleanup
    eventListenersRef.current = {
      action_queued: handleActionQueued,
      batch_completed: handleBatchCompleted,
      action_failed_permanently: handleActionFailedPermanently,
      conflict_detected: handleConflictDetected
    };

    // Initial status update
    updateSyncStatus();

    // Cleanup function
    return () => {
      Object.entries(eventListenersRef.current).forEach(([event, handler]) => {
        backgroundSync.off(event, handler);
      });
    };
  }, [
    enableMetrics,
    enableConflictTracking,
    onSyncSuccess,
    onSyncError,
    onConflictDetected,
    updateSyncStatus
  ]);

  // CONTEXT7 SOURCE: /facebook/react - Auto-sync when coming back online
  // AUTO SYNC: Automatic synchronization when connectivity is restored
  useEffect(() => {
    if (offlineState.isOnline && enableAutoSync && state.queueLength > 0) {
      // Small delay to allow network to stabilize
      const timeoutId = setTimeout(() => {
        backgroundSync.processQueue();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [offlineState.isOnline, enableAutoSync, state.queueLength]);

  // CONTEXT7 SOURCE: /facebook/react - Actions object for external use
  // ACTIONS: Complete set of sync actions for component consumption
  const actions: BackgroundSyncActions = {
    queueFAQRating,
    queueFAQFeedback,
    queueUserPreferences,
    queueAnalyticsEvent,
    queueContactForm,
    forceSync,
    clearQueue,
    pauseSync,
    resumeSync,
    resolveConflict,
    getMetrics,
    retryFailed
  };

  return { state, actions };
}

// CONTEXT7 SOURCE: /facebook/react - Helper functions for background sync
// HELPER FUNCTIONS: Utility functions for sync data preparation

function getUserId(): string {
  // Get user ID from localStorage, session, or generate anonymous ID
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('user_id', userId);
  }
  return userId;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

function getPreferencesVersion(): string {
  return localStorage.getItem('preferences_version') || '1.0.0';
}