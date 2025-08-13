/**
 * CONTEXT7 SOURCE: /googlechrome/workbox - Background sync implementation for PWA applications
 * BACKGROUND SYNC: Comprehensive background synchronization for FAQ user interactions
 * 
 * Background Sync - Royal Client Data Integrity
 * Features:
 * - Offline user interaction queuing
 * - Intelligent retry mechanisms
 * - Conflict resolution strategies
 * - Real-time sync status updates
 * - Performance optimized batching
 * - Data integrity validation
 */

import { offlineStrategies } from './offline-strategies';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for background sync
// TYPE SAFETY: Complete interfaces for sync operations and queue management
export interface SyncAction {
  id: string;
  type: 'faq_rating' | 'faq_feedback' | 'user_preferences' | 'analytics_event' | 'contact_form';
  data: any;
  timestamp: number;
  priority: 'high' | 'normal' | 'low';
  retries: number;
  maxRetries: number;
  metadata: {
    userId?: string;
    sessionId: string;
    userAgent: string;
    url: string;
    referrer?: string;
  };
}

export interface SyncBatch {
  id: string;
  actions: SyncAction[];
  batchTimestamp: number;
  totalSize: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface SyncConfig {
  batchSize: number;
  batchTimeout: number;
  maxRetries: number;
  retryDelay: number;
  enableCompression: boolean;
  enableEncryption: boolean;
  conflictResolution: 'client-wins' | 'server-wins' | 'merge' | 'prompt';
}

export interface SyncResult {
  actionId: string;
  status: 'success' | 'failed' | 'conflict';
  error?: string;
  conflictData?: any;
  serverResponse?: any;
  processingTime: number;
}

export interface ConflictData {
  actionId: string;
  clientData: any;
  serverData: any;
  conflictType: 'version' | 'data' | 'deletion';
  resolutionStrategy: string;
}

// CONTEXT7 SOURCE: /googlechrome/workbox - Background sync manager implementation
// SYNC MANAGER: Enterprise-grade background synchronization system
export class BackgroundSyncManager {
  private static instance: BackgroundSyncManager;
  private syncQueue: SyncAction[] = [];
  private pendingBatches: Map<string, SyncBatch> = new Map();
  private config: SyncConfig;
  private isProcessing = false;
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  private constructor(config: Partial<SyncConfig> = {}) {
    this.config = {
      batchSize: 10,
      batchTimeout: 30000, // 30 seconds
      maxRetries: 3,
      retryDelay: 5000, // 5 seconds
      enableCompression: true,
      enableEncryption: false,
      conflictResolution: 'client-wins',
      ...config
    };

    this.initializeEventListeners();
    this.loadQueueFromStorage();
  }

  // CONTEXT7 SOURCE: /facebook/react - Singleton pattern implementation
  // SINGLETON: Ensure single sync manager instance across application
  public static getInstance(config?: Partial<SyncConfig>): BackgroundSyncManager {
    if (!BackgroundSyncManager.instance) {
      BackgroundSyncManager.instance = new BackgroundSyncManager(config);
    }
    return BackgroundSyncManager.instance;
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Queue user action for background sync
  // ACTION QUEUING: Add user interactions to sync queue with metadata
  public async queueAction(
    type: SyncAction['type'],
    data: any,
    priority: SyncAction['priority'] = 'normal'
  ): Promise<string> {
    const action: SyncAction = {
      id: this.generateActionId(),
      type,
      data: this.sanitizeData(data),
      timestamp: Date.now(),
      priority,
      retries: 0,
      maxRetries: this.config.maxRetries,
      metadata: {
        sessionId: this.getSessionId(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer || undefined
      }
    };

    // Add encryption if enabled
    if (this.config.enableEncryption) {
      action.data = await this.encryptData(action.data);
    }

    // Add to queue with priority sorting
    this.syncQueue.push(action);
    this.sortQueueByPriority();
    
    // Persist to storage
    await this.saveQueueToStorage();

    // Emit event
    this.emit('action_queued', { action });

    // Try immediate sync if online
    if (navigator.onLine) {
      this.processQueue();
    }

    console.log(`📝 Queued ${type} action with ID: ${action.id}`);
    return action.id;
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Process sync queue with batching
  // QUEUE PROCESSING: Handle sync queue with intelligent batching and retry logic
  public async processQueue(): Promise<void> {
    if (this.isProcessing || !navigator.onLine || this.syncQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    console.log(`🔄 Processing sync queue with ${this.syncQueue.length} actions`);

    try {
      // Create batches from queue
      const batches = this.createBatches();
      
      // Process each batch
      for (const batch of batches) {
        await this.processBatch(batch);
      }

    } catch (error) {
      console.error('❌ Queue processing failed:', error);
      this.emit('processing_error', { error });
    } finally {
      this.isProcessing = false;
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Individual batch processing
  // BATCH PROCESSING: Handle batched sync operations with error handling
  private async processBatch(batch: SyncBatch): Promise<void> {
    console.log(`🔄 Processing batch ${batch.id} with ${batch.actions.length} actions`);
    
    batch.status = 'processing';
    this.pendingBatches.set(batch.id, batch);
    this.emit('batch_started', { batch });

    const results: SyncResult[] = [];

    try {
      // Process actions in parallel (with concurrency limit)
      const concurrencyLimit = 3;
      const chunks = this.chunkArray(batch.actions, concurrencyLimit);

      for (const chunk of chunks) {
        const chunkResults = await Promise.allSettled(
          chunk.map(action => this.processAction(action))
        );

        for (let i = 0; i < chunkResults.length; i++) {
          const result = chunkResults[i];
          const action = chunk[i];

          if (result.status === 'fulfilled') {
            results.push(result.value);
            
            if (result.value.status === 'success') {
              // Remove successful action from queue
              this.syncQueue = this.syncQueue.filter(a => a.id !== action.id);
            } else if (result.value.status === 'conflict') {
              // Handle conflict
              await this.handleConflict(action, result.value.conflictData);
            }
          } else {
            // Action failed
            results.push({
              actionId: action.id,
              status: 'failed',
              error: result.reason?.message || 'Unknown error',
              processingTime: 0
            });

            // Schedule retry
            await this.scheduleRetry(action);
          }
        }
      }

      batch.status = 'completed';
      this.emit('batch_completed', { batch, results });

    } catch (error) {
      batch.status = 'failed';
      console.error(`❌ Batch ${batch.id} processing failed:`, error);
      this.emit('batch_failed', { batch, error });

      // Schedule retry for all actions in batch
      for (const action of batch.actions) {
        await this.scheduleRetry(action);
      }
    } finally {
      this.pendingBatches.delete(batch.id);
      await this.saveQueueToStorage();
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Individual action processing
  // ACTION PROCESSING: Handle specific sync actions with API calls
  private async processAction(action: SyncAction): Promise<SyncResult> {
    const startTime = Date.now();

    try {
      // Decrypt data if encrypted
      let data = action.data;
      if (this.config.enableEncryption) {
        data = await this.decryptData(data);
      }

      // Get API endpoint for action type
      const endpoint = this.getAPIEndpoint(action.type);
      const method = this.getHTTPMethod(action.type);

      // Prepare request
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Sync-Action-ID': action.id,
          'X-Sync-Timestamp': action.timestamp.toString(),
          'X-Sync-Priority': action.priority,
          'X-Retry-Count': action.retries.toString()
        },
        body: JSON.stringify({
          ...data,
          _metadata: action.metadata
        })
      };

      // Add compression if enabled
      if (this.config.enableCompression) {
        requestOptions.headers = {
          ...requestOptions.headers,
          'Content-Encoding': 'gzip'
        };
        // Note: Actual compression would be handled by service worker
      }

      // Make API request
      const response = await fetch(endpoint, requestOptions);

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          // Conflict detected
          const conflictData = await response.json();
          return {
            actionId: action.id,
            status: 'conflict',
            conflictData,
            processingTime: Date.now() - startTime
          };
        }

        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const serverResponse = await response.json();

      return {
        actionId: action.id,
        status: 'success',
        serverResponse,
        processingTime: Date.now() - startTime
      };

    } catch (error) {
      return {
        actionId: action.id,
        status: 'failed',
        error: (error as Error).message,
        processingTime: Date.now() - startTime
      };
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Conflict resolution handling
  // CONFLICT RESOLUTION: Handle data conflicts with configurable strategies
  private async handleConflict(action: SyncAction, conflictData: ConflictData): Promise<void> {
    console.log(`⚠️ Conflict detected for action ${action.id}:`, conflictData);

    switch (this.config.conflictResolution) {
      case 'client-wins':
        // Keep client data, re-queue action
        action.retries = 0; // Reset retries for re-processing
        break;

      case 'server-wins':
        // Accept server data, remove action from queue
        this.syncQueue = this.syncQueue.filter(a => a.id !== action.id);
        break;

      case 'merge':
        // Merge client and server data
        const mergedData = this.mergeData(action.data, conflictData.serverData);
        action.data = mergedData;
        action.retries = 0;
        break;

      case 'prompt':
        // Emit event for manual resolution
        this.emit('conflict_detected', { action, conflictData });
        break;
    }

    await this.saveQueueToStorage();
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Retry scheduling with exponential backoff
  // RETRY SCHEDULING: Schedule action retry with exponential backoff
  private async scheduleRetry(action: SyncAction): Promise<void> {
    action.retries++;

    if (action.retries >= action.maxRetries) {
      console.error(`❌ Action ${action.id} exceeded max retries, removing from queue`);
      this.syncQueue = this.syncQueue.filter(a => a.id !== action.id);
      this.emit('action_failed_permanently', { action });
      return;
    }

    // Calculate exponential backoff delay
    const delay = this.config.retryDelay * Math.pow(2, action.retries - 1);
    
    console.log(`⏰ Scheduling retry for action ${action.id} in ${delay}ms (attempt ${action.retries})`);

    const timeoutId = setTimeout(() => {
      this.retryTimeouts.delete(action.id);
      if (navigator.onLine) {
        this.processQueue();
      }
    }, delay);

    this.retryTimeouts.set(action.id, timeoutId);
    this.emit('action_retry_scheduled', { action, delay });
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Event system for sync notifications
  // EVENT SYSTEM: Publisher-subscriber pattern for sync events
  public on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  public off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Event listener error for ${event}:`, error);
        }
      });
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Queue management utilities
  // UTILITY METHODS: Helper functions for queue and batch management

  private createBatches(): SyncBatch[] {
    const batches: SyncBatch[] = [];
    const queueCopy = [...this.syncQueue];

    while (queueCopy.length > 0) {
      const batchActions = queueCopy.splice(0, this.config.batchSize);
      const batch: SyncBatch = {
        id: this.generateBatchId(),
        actions: batchActions,
        batchTimestamp: Date.now(),
        totalSize: this.calculateBatchSize(batchActions),
        status: 'pending'
      };
      batches.push(batch);
    }

    return batches;
  }

  private sortQueueByPriority(): void {
    const priorityOrder = { high: 3, normal: 2, low: 1 };
    this.syncQueue.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.timestamp - b.timestamp; // FIFO for same priority
    });
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  private calculateBatchSize(actions: SyncAction[]): number {
    return actions.reduce((size, action) => {
      return size + JSON.stringify(action).length;
    }, 0);
  }

  private getAPIEndpoint(actionType: SyncAction['type']): string {
    const endpoints = {
      'faq_rating': '/api/faq/rating',
      'faq_feedback': '/api/faq/feedback',
      'user_preferences': '/api/user/preferences',
      'analytics_event': '/api/analytics/event',
      'contact_form': '/api/contact'
    };
    return endpoints[actionType];
  }

  private getHTTPMethod(actionType: SyncAction['type']): string {
    const methods = {
      'faq_rating': 'POST',
      'faq_feedback': 'POST',
      'user_preferences': 'PUT',
      'analytics_event': 'POST',
      'contact_form': 'POST'
    };
    return methods[actionType];
  }

  private sanitizeData(data: any): any {
    // Remove sensitive data and validate structure
    const sanitized = { ...data };
    
    // Remove potentially sensitive fields
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.secret;

    return sanitized;
  }

  private async encryptData(data: any): Promise<string> {
    // Simple encryption placeholder
    // In production, use proper encryption library
    return btoa(JSON.stringify(data));
  }

  private async decryptData(encryptedData: string): Promise<any> {
    // Simple decryption placeholder
    try {
      return JSON.parse(atob(encryptedData));
    } catch {
      return encryptedData; // Return as-is if not encrypted
    }
  }

  private mergeData(clientData: any, serverData: any): any {
    // Simple merge strategy - can be enhanced based on requirements
    return { ...serverData, ...clientData };
  }

  private generateActionId(): string {
    return `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateBatchId(): string {
    return `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getSessionId(): string {
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only sessionStorage check for SSR compatibility
    // SSR COMPATIBILITY: Ensure sessionStorage is available (client-side only)
    if (typeof sessionStorage === 'undefined') {
      // Return a temporary session ID during SSR
      return `ssr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    let sessionId = sessionStorage.getItem('sync_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sync_session_id', sessionId);
    }
    return sessionId;
  }

  private initializeEventListeners(): void {
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only window check for SSR compatibility
    // SSR COMPATIBILITY: Ensure window/document are available (client-side only)
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return; // Skip event listeners during SSR
    }
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      console.log('🌐 Back online - Processing sync queue');
      this.processQueue();
    });

    window.addEventListener('offline', () => {
      console.log('📡 Gone offline - Queuing mode active');
    });

    // Listen for page visibility changes
    document.addEventListener('visibilitychange', () => {
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only navigator check for SSR compatibility
      // SSR COMPATIBILITY: Ensure navigator is available (client-side only)
      if (!document.hidden && typeof navigator !== 'undefined' && navigator.onLine && this.syncQueue.length > 0) {
        this.processQueue();
      }
    });
  }

  private async saveQueueToStorage(): Promise<void> {
    try {
      const queueData = {
        queue: this.syncQueue,
        timestamp: Date.now()
      };
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only localStorage check for SSR compatibility
      // SSR COMPATIBILITY: Ensure localStorage is available (client-side only)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('background_sync_queue', JSON.stringify(queueData));
      }
    } catch (error) {
      console.warn('Failed to save sync queue to storage:', error);
    }
  }

  private async loadQueueFromStorage(): Promise<void> {
    try {
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only localStorage check for SSR compatibility
      // SSR COMPATIBILITY: Ensure localStorage is available (client-side only)
      if (typeof localStorage === 'undefined') {
        return; // Skip loading during SSR
      }
      
      const stored = localStorage.getItem('background_sync_queue');
      if (stored) {
        const queueData = JSON.parse(stored);
        this.syncQueue = queueData.queue || [];
        this.sortQueueByPriority();
        console.log(`📦 Loaded ${this.syncQueue.length} actions from storage`);
      }
    } catch (error) {
      console.warn('Failed to load sync queue from storage:', error);
      this.syncQueue = [];
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Public API methods
  // PUBLIC API: External interface for sync manager interaction

  public getQueueStatus(): {
    queueLength: number;
    pendingBatches: number;
    isProcessing: boolean;
    nextRetry?: number;
  } {
    const nextRetry = Math.min(...Array.from(this.retryTimeouts.values()).map(timeout => {
      // Get remaining time for timeout (approximate)
      return Date.now() + 1000; // Placeholder
    }));

    return {
      queueLength: this.syncQueue.length,
      pendingBatches: this.pendingBatches.size,
      isProcessing: this.isProcessing,
      nextRetry: isFinite(nextRetry) ? nextRetry : undefined
    };
  }

  public clearQueue(): void {
    this.syncQueue = [];
    this.pendingBatches.clear();
    
    // Clear retry timeouts
    for (const timeout of this.retryTimeouts.values()) {
      clearTimeout(timeout);
    }
    this.retryTimeouts.clear();

    this.saveQueueToStorage();
    this.emit('queue_cleared', {});
    console.log('🧹 Sync queue cleared');
  }

  public pauseSync(): void {
    this.isProcessing = true; // Prevents new processing
    console.log('⏸️ Sync processing paused');
  }

  public resumeSync(): void {
    this.isProcessing = false;
    if (navigator.onLine && this.syncQueue.length > 0) {
      this.processQueue();
    }
    console.log('▶️ Sync processing resumed');
  }
}

// CONTEXT7 SOURCE: /googlechrome/workbox - Export configured singleton instance
// SINGLETON EXPORT: Global background sync manager for FAQ system
export const backgroundSync = BackgroundSyncManager.getInstance({
  batchSize: 5,
  batchTimeout: 15000,
  maxRetries: 3,
  retryDelay: 3000,
  enableCompression: false,
  enableEncryption: false,
  conflictResolution: 'client-wins'
});