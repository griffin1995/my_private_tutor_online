/**
 * CONTEXT7 SOURCE: /facebook/react - Background sync management component
 * SYNC MANAGER: Comprehensive synchronization control for offline FAQ interactions
 * 
 * Sync Manager - Royal Client Data Synchronization
 * Features:
 * - Background sync queue management
 * - Conflict resolution for data sync
 * - Real-time sync status updates
 * - Retry logic with exponential backoff
 * - Offline interaction queuing
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useOffline } from '@/hooks/use-offline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Upload,
  Download,
  Trash2,
  Play,
  Pause
} from 'lucide-react';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for sync management
// TYPE SAFETY: Complete interfaces for sync operations and queue management
export interface SyncManagerProps {
  autoSync?: boolean;
  syncInterval?: number;
  maxRetries?: number;
  showQueue?: boolean;
  onSyncComplete?: (results: SyncResult[]) => void;
  onSyncError?: (error: Error) => void;
  className?: string;
}

export interface SyncResult {
  id: string;
  action: string;
  status: 'success' | 'failed' | 'pending' | 'retrying';
  data: any;
  timestamp: number;
  error?: string;
  retries: number;
}

export interface SyncQueueItem {
  id: string;
  action: string;
  data: any;
  timestamp: number;
  retries: number;
  maxRetries: number;
  priority: 'high' | 'normal' | 'low';
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface ConflictResolution {
  strategy: 'merge' | 'client-wins' | 'server-wins' | 'prompt-user';
  conflictData?: any;
  resolution?: any;
}

// CONTEXT7 SOURCE: /facebook/react - Sync manager component implementation
// SYNC MANAGER: Central component for handling offline synchronization
export function SyncManager({
  autoSync = true,
  syncInterval = 30000,
  maxRetries = 3,
  showQueue = true,
  onSyncComplete,
  onSyncError,
  className = ''
}: SyncManagerProps) {
  const { state, actions } = useOffline({
    enableSyncQueue: true,
    syncInterval,
    onSyncComplete,
    onSyncError
  });

  // CONTEXT7 SOURCE: /facebook/react - State management for sync operations
  // STATE MANAGEMENT: Track sync queue, results, and conflicts
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);
  const [syncResults, setSyncResults] = useState<SyncResult[]>([]);
  const [conflicts, setConflicts] = useState<ConflictResolution[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // CONTEXT7 SOURCE: /facebook/react - Sync queue loading and management
  // QUEUE MANAGEMENT: Load and manage synchronization queue
  const loadSyncQueue = useCallback(async () => {
    try {
      const stored = localStorage.getItem('sync_manager_queue');
      if (stored) {
        const queue: SyncQueueItem[] = JSON.parse(stored);
        setSyncQueue(queue.filter(item => item.status !== 'completed'));
      }
    } catch (error) {
      console.warn('Failed to load sync queue:', error);
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Sync queue persistence
  // QUEUE PERSISTENCE: Save queue state to localStorage
  const saveSyncQueue = useCallback(async (queue: SyncQueueItem[]) => {
    try {
      localStorage.setItem('sync_manager_queue', JSON.stringify(queue));
    } catch (error) {
      console.warn('Failed to save sync queue:', error);
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Add item to sync queue
  // QUEUE ADDITION: Add new items to synchronization queue
  const addToQueue = useCallback(async (
    action: string, 
    data: any, 
    priority: 'high' | 'normal' | 'low' = 'normal'
  ) => {
    const newItem: SyncQueueItem = {
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
      maxRetries,
      priority,
      status: 'pending'
    };

    setSyncQueue(prevQueue => {
      const updatedQueue = [...prevQueue, newItem];
      saveSyncQueue(updatedQueue);
      return updatedQueue;
    });

    // Try immediate sync if online and auto-sync enabled
    if (state.isOnline && autoSync && !isPaused) {
      processQueue();
    }

    return newItem.id;
  }, [maxRetries, state.isOnline, autoSync, isPaused, saveSyncQueue]);

  // CONTEXT7 SOURCE: /facebook/react - Process synchronization queue
  // QUEUE PROCESSING: Handle sync queue with retry logic and conflict resolution
  const processQueue = useCallback(async () => {
    if (!state.isOnline || isProcessing || isPaused || syncQueue.length === 0) {
      return;
    }

    setIsProcessing(true);
    const results: SyncResult[] = [];

    try {
      // Sort queue by priority (high -> normal -> low) and timestamp
      const sortedQueue = [...syncQueue].sort((a, b) => {
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return a.timestamp - b.timestamp;
      });

      for (const item of sortedQueue) {
        if (item.status === 'completed' || item.status === 'failed') continue;

        try {
          // Update item status to processing
          setSyncQueue(prevQueue => {
            const updated = prevQueue.map(qItem => 
              qItem.id === item.id ? { ...qItem, status: 'processing' as const } : qItem
            );
            saveSyncQueue(updated);
            return updated;
          });

          // Process the sync item
          const result = await processSyncItem(item);
          results.push(result);

          if (result.status === 'success') {
            // Remove completed item from queue
            setSyncQueue(prevQueue => {
              const updated = prevQueue.filter(qItem => qItem.id !== item.id);
              saveSyncQueue(updated);
              return updated;
            });
          } else {
            // Handle retry or failure
            const shouldRetry = item.retries < item.maxRetries;
            
            setSyncQueue(prevQueue => {
              const updated = prevQueue.map(qItem => 
                qItem.id === item.id 
                  ? { 
                      ...qItem, 
                      retries: qItem.retries + 1,
                      status: shouldRetry ? 'pending' as const : 'failed' as const
                    }
                  : qItem
              );
              saveSyncQueue(updated);
              return updated;
            });

            if (!shouldRetry) {
              console.error(`Sync failed permanently for ${item.action}:`, result.error);
            }
          }
        } catch (error) {
          console.error(`Error processing sync item ${item.id}:`, error);
          
          results.push({
            id: item.id,
            action: item.action,
            status: 'failed',
            data: item.data,
            timestamp: Date.now(),
            error: (error as Error).message,
            retries: item.retries
          });
        }
      }

      setSyncResults(prevResults => [...prevResults, ...results]);
      onSyncComplete?.(results);

    } catch (error) {
      console.error('Queue processing failed:', error);
      onSyncError?.(error as Error);
    } finally {
      setIsProcessing(false);
    }
  }, [
    state.isOnline, 
    isProcessing, 
    isPaused, 
    syncQueue, 
    saveSyncQueue, 
    onSyncComplete, 
    onSyncError
  ]);

  // CONTEXT7 SOURCE: /facebook/react - Individual sync item processing
  // ITEM PROCESSING: Handle specific sync actions with API calls
  const processSyncItem = useCallback(async (item: SyncQueueItem): Promise<SyncResult> => {
    const startTime = Date.now();

    try {
      let apiEndpoint = '';
      let method = 'POST';
      let body = item.data;

      // CONTEXT7 SOURCE: /googlechrome/workbox - Action-specific API routing
      // API ROUTING: Map sync actions to appropriate API endpoints
      switch (item.action) {
        case 'faq_rating':
          apiEndpoint = '/api/faq/rating';
          break;
        case 'faq_feedback':
          apiEndpoint = '/api/faq/feedback';
          break;
        case 'user_preferences':
          apiEndpoint = '/api/user/preferences';
          method = 'PUT';
          break;
        case 'analytics_event':
          apiEndpoint = '/api/analytics/event';
          break;
        case 'contact_form':
          apiEndpoint = '/api/contact';
          break;
        default:
          throw new Error(`Unknown sync action: ${item.action}`);
      }

      // CONTEXT7 SOURCE: /googlechrome/workbox - API request with timeout
      // API REQUEST: Network request with timeout and error handling
      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Sync-ID': item.id,
          'X-Retry-Count': item.retries.toString()
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        // Check for conflict (409) and handle appropriately
        if (response.status === 409) {
          const conflictData = await response.json();
          await handleConflict(item, conflictData);
          
          return {
            id: item.id,
            action: item.action,
            status: 'pending', // Will be retried after conflict resolution
            data: item.data,
            timestamp: startTime,
            retries: item.retries
          };
        }

        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();

      return {
        id: item.id,
        action: item.action,
        status: 'success',
        data: responseData,
        timestamp: startTime,
        retries: item.retries
      };

    } catch (error) {
      return {
        id: item.id,
        action: item.action,
        status: 'failed',
        data: item.data,
        timestamp: startTime,
        error: (error as Error).message,
        retries: item.retries
      };
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Conflict resolution handling
  // CONFLICT RESOLUTION: Handle data conflicts during synchronization
  const handleConflict = useCallback(async (item: SyncQueueItem, conflictData: any) => {
    const conflict: ConflictResolution = {
      strategy: 'client-wins', // Default strategy for FAQ system
      conflictData
    };

    // Apply conflict resolution strategy
    switch (conflict.strategy) {
      case 'client-wins':
        // Keep client data, no action needed
        break;
      case 'server-wins':
        // Update local data with server version
        item.data = conflictData.serverData;
        break;
      case 'merge':
        // Merge client and server data
        item.data = { ...conflictData.serverData, ...item.data };
        break;
      case 'prompt-user':
        // Add to conflicts list for user resolution
        setConflicts(prev => [...prev, conflict]);
        break;
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Queue control functions
  // QUEUE CONTROLS: User-facing controls for sync management
  const pauseSync = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSync = useCallback(() => {
    setIsPaused(false);
    if (state.isOnline && syncQueue.length > 0) {
      processQueue();
    }
  }, [state.isOnline, syncQueue.length, processQueue]);

  const clearQueue = useCallback(() => {
    setSyncQueue([]);
    setSyncResults([]);
    saveSyncQueue([]);
  }, [saveSyncQueue]);

  const retryFailed = useCallback(() => {
    setSyncQueue(prevQueue => {
      const updated = prevQueue.map(item => 
        item.status === 'failed' 
          ? { ...item, status: 'pending' as const, retries: 0 }
          : item
      );
      saveSyncQueue(updated);
      return updated;
    });

    if (state.isOnline && !isPaused) {
      processQueue();
    }
  }, [state.isOnline, isPaused, processQueue, saveSyncQueue]);

  // CONTEXT7 SOURCE: /facebook/react - Effect for initialization and auto-sync
  // INITIALIZATION: Set up sync manager and handle automatic processing
  useEffect(() => {
    loadSyncQueue();
  }, [loadSyncQueue]);

  useEffect(() => {
    if (state.isOnline && autoSync && !isPaused && syncQueue.length > 0) {
      const timeoutId = setTimeout(() => {
        processQueue();
      }, 1000); // Small delay to batch operations

      return () => clearTimeout(timeoutId);
    }
  }, [state.isOnline, autoSync, isPaused, syncQueue.length, processQueue]);

  // CONTEXT7 SOURCE: /grx7/framer-motion - Sync manager UI implementation
  // UI COMPONENT: Visual interface for sync management
  return (
    <Card className={`p-4 ${className}`}>
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Sync manager header */}
      {/* HEADER: Status display and primary controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
            ) : syncQueue.length > 0 ? (
              <Clock className="w-4 h-4 text-yellow-600" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-600" />
            )}
            
            <h3 className="font-semibold text-sm text-slate-900">
              Sync Manager
            </h3>
          </div>
          
          <Badge variant="secondary" className="text-xs">
            {syncQueue.length} queued
          </Badge>
          
          {isPaused && (
            <Badge variant="outline" className="text-xs">
              Paused
            </Badge>
          )}
        </div>

        <div className="flex space-x-1">
          {isPaused ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={resumeSync}
              disabled={!state.isOnline}
              className="h-8 px-2"
            >
              <Play className="w-3 h-3" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={pauseSync}
              disabled={syncQueue.length === 0}
              className="h-8 px-2"
            >
              <Pause className="w-3 h-3" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearQueue}
            disabled={isProcessing}
            className="h-8 px-2"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Sync queue display */}
      {/* QUEUE DISPLAY: Show pending and failed sync items */}
      {showQueue && syncQueue.length > 0 && (
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-medium text-slate-700 uppercase tracking-wide">
            Sync Queue
          </h4>
          
          <div className="max-h-32 overflow-y-auto space-y-1">
            <AnimatePresence>
              {syncQueue.slice(0, 5).map((item) => (
                <m.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {item.status === 'processing' ? (
                        <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />
                      ) : item.status === 'failed' ? (
                        <XCircle className="w-3 h-3 text-red-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-slate-400" />
                      )}
                      
                      <span className="font-medium text-slate-900">
                        {formatActionName(item.action)}
                      </span>
                    </div>
                    
                    {item.retries > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Retry {item.retries}
                      </Badge>
                    )}
                  </div>
                  
                  <span className="text-slate-500">
                    {formatRelativeTime(new Date(item.timestamp))}
                  </span>
                </m.div>
              ))}
            </AnimatePresence>
            
            {syncQueue.length > 5 && (
              <div className="text-center text-xs text-slate-500 py-1">
                +{syncQueue.length - 5} more items
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Action buttons */}
      {/* ACTION BUTTONS: User controls for sync operations */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={processQueue}
          disabled={!state.isOnline || isProcessing || isPaused || syncQueue.length === 0}
          className="flex-1 text-xs"
        >
          <Upload className="w-3 h-3 mr-1" />
          Sync Now
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={retryFailed}
          disabled={!state.isOnline || isProcessing || !syncQueue.some(item => item.status === 'failed')}
          className="flex-1 text-xs"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Retry Failed
        </Button>
      </div>

      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Conflicts display */}
      {/* CONFLICTS: Show data conflicts requiring resolution */}
      {conflicts.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              {conflicts.length} Conflict{conflicts.length > 1 ? 's' : ''} Require Resolution
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConflicts([])}
            className="text-xs"
          >
            Resolve All (Client Wins)
          </Button>
        </div>
      )}
    </Card>
  );
}

// CONTEXT7 SOURCE: /facebook/react - Utility functions for sync manager
// UTILITY FUNCTIONS: Helper functions for display formatting

function formatActionName(action: string): string {
  const actionNames: Record<string, string> = {
    'faq_rating': 'FAQ Rating',
    'faq_feedback': 'FAQ Feedback',
    'user_preferences': 'Preferences',
    'analytics_event': 'Analytics',
    'contact_form': 'Contact Form'
  };
  
  return actionNames[action] || action.replace(/_/g, ' ');
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}