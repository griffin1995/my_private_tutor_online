/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Accessible status indicator components
 * OFFLINE INDICATOR: Comprehensive offline status display for royal client experience
 * 
 * Offline Status Indicator - Premium UI Component
 * Features:
 * - Real-time connection status display
 * - Connection quality indicators
 * - Sync status with progress
 * - Cache information display
 * - Elegant animations and transitions
 */

'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useOffline } from '@/hooks/use-offline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  WifiOff, 
  Signal, 
  SignalHigh, 
  SignalMedium, 
  SignalLow,
  RefreshCw,
  Database,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for offline status components
// TYPE SAFETY: Complete interfaces for status indicator configuration
export interface OfflineStatusIndicatorProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
  showDetails?: boolean;
  showCacheInfo?: boolean;
  showSyncStatus?: boolean;
  compact?: boolean;
  className?: string;
  onRefresh?: () => void;
  onClearCache?: () => void;
}

export interface ConnectionQualityProps {
  quality: 'fast' | 'slow' | 'poor' | 'unknown';
  className?: string;
}

export interface SyncStatusProps {
  isPending: boolean;
  queueSize: number;
  onForceSync?: () => void;
  className?: string;
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Accessible status indicator with animations
// STATUS INDICATOR: Main component for displaying offline status and controls
export function OfflineStatusIndicator({
  position = 'bottom-right',
  showDetails = true,
  showCacheInfo = true,
  showSyncStatus = true,
  compact = false,
  className = '',
  onRefresh,
  onClearCache
}: OfflineStatusIndicatorProps) {
  const { state, actions } = useOffline({
    enableSyncQueue: true,
    enableConnectionMonitoring: true,
    onOnline: () => {
      console.log('🌐 Back online - FAQ system ready');
    },
    onOffline: () => {
      console.log('📡 Gone offline - Switching to cached content');
    }
  });

  // CONTEXT7 SOURCE: /grx7/framer-motion - Position-based styling
  // POSITIONING: Dynamic positioning classes for flexible placement
  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'inline': 'relative'
  };

  // CONTEXT7 SOURCE: /facebook/react - Event handlers for user interactions
  // EVENT HANDLERS: User interaction handling for offline functionality
  const handleRefresh = async () => {
    try {
      await actions.refreshCache();
      onRefresh?.();
    } catch (error) {
      console.error('Failed to refresh cache:', error);
    }
  };

  const handleClearCache = async () => {
    try {
      await actions.clearCache();
      onClearCache?.();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  const handleForceSync = async () => {
    if (!state.isOnline) return;
    
    try {
      await actions.forceSync();
    } catch (error) {
      console.error('Failed to force sync:', error);
    }
  };

  // CONTEXT7 SOURCE: /grx7/framer-motion - Compact view for minimal display
  // COMPACT VIEW: Simplified indicator for space-constrained layouts
  if (compact) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2"
        >
          <Badge
            variant={state.isOnline ? 'default' : 'destructive'}
            className="flex items-center space-x-1"
          >
            {state.isOnline ? (
              <Wifi className="w-3 h-3" />
            ) : (
              <WifiOff className="w-3 h-3" />
            )}
            <span className="text-xs">
              {state.isOnline ? 'Online' : 'Offline'}
            </span>
          </Badge>
          
          {showSyncStatus && state.syncPending && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span className="text-xs">Sync</span>
            </Badge>
          )}
        </m.div>
      </div>
    );
  }

  // CONTEXT7 SOURCE: /grx7/framer-motion - Full status display with detailed information
  // FULL DISPLAY: Comprehensive status indicator with all features
  return (
    <div className={`${positionClasses[position]} ${className}`}>
      <m.div
        initial={{ opacity: 0, y: position.includes('bottom') ? 20 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg p-4 max-w-sm"
      >
        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Connection status header */}
        {/* CONNECTION HEADER: Primary status display with icon and text */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <m.div
              animate={{
                scale: state.isOnline ? 1 : 0.9,
                rotate: state.isOnline ? 0 : 5
              }}
              transition={{ duration: 0.2 }}
            >
              {state.isOnline ? (
                <Wifi className="w-5 h-5 text-green-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-600" />
              )}
            </m.div>
            
            <div>
              <h3 className="font-semibold text-sm text-slate-900">
                {state.isOnline ? 'Online' : 'Offline Mode'}
              </h3>
              <p className="text-xs text-slate-600">
                {state.isOnline 
                  ? 'FAQ system connected' 
                  : 'Using cached content'
                }
              </p>
            </div>
          </div>
          
          {showDetails && (
            <ConnectionQuality 
              quality={state.connectionQuality} 
              className="ml-2"
            />
          )}
        </div>

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Detailed status information */}
        {/* STATUS DETAILS: Additional information based on configuration */}
        {showDetails && (
          <div className="space-y-2 mb-3">
            {/* Data Freshness Indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Data Status:</span>
              <Badge 
                variant={
                  state.dataFreshness === 'fresh' ? 'default' :
                  state.dataFreshness === 'stale' ? 'secondary' : 'outline'
                }
                className="text-xs"
              >
                <Clock className="w-3 h-3 mr-1" />
                {state.dataFreshness === 'fresh' && 'Current'}
                {state.dataFreshness === 'stale' && 'Cached'}
                {state.dataFreshness === 'unknown' && 'Unknown'}
              </Badge>
            </div>

            {/* Cache Information */}
            {showCacheInfo && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Cache Size:</span>
                <span className="font-medium text-slate-900">
                  {formatBytes(state.cacheSize)}
                </span>
              </div>
            )}

            {/* Last Online Time */}
            {!state.isOnline && state.lastOnline && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Last Online:</span>
                <span className="font-medium text-slate-900">
                  {formatRelativeTime(state.lastOnline)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Sync status display */}
        {/* SYNC STATUS: Background synchronization information */}
        {showSyncStatus && (
          <SyncStatus
            isPending={state.syncPending}
            queueSize={state.syncQueueSize}
            onForceSync={handleForceSync}
            className="mb-3"
          />
        )}

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Action buttons */}
        {/* ACTION BUTTONS: User controls for offline functionality */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={state.syncPending}
            className="flex-1 text-xs"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${state.syncPending ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCache}
            disabled={state.syncPending}
            className="flex-1 text-xs"
          >
            <Database className="w-3 h-3 mr-1" />
            Clear Cache
          </Button>
        </div>

        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Status transition animations */}
        {/* TRANSITION ALERTS: Visual feedback for status changes */}
        <AnimatePresence>
          {state.wasOffline && state.isOnline && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-800 font-medium">
                  Reconnected! Syncing latest content...
                </span>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Connection quality indicator component
// CONNECTION QUALITY: Visual representation of network connection strength
export function ConnectionQuality({ quality, className = '' }: ConnectionQualityProps) {
  const getQualityIcon = () => {
    switch (quality) {
      case 'fast':
        return <SignalHigh className="w-4 h-4 text-green-600" />;
      case 'slow':
        return <SignalMedium className="w-4 h-4 text-yellow-600" />;
      case 'poor':
        return <SignalLow className="w-4 h-4 text-red-600" />;
      default:
        return <Signal className="w-4 h-4 text-slate-400" />;
    }
  };

  const getQualityColor = () => {
    switch (quality) {
      case 'fast':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'slow':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className={`flex items-center space-x-1 px-2 py-1 rounded-md border ${getQualityColor()} ${className}`}>
      {getQualityIcon()}
      <span className="text-xs font-medium capitalize">
        {quality === 'unknown' ? 'N/A' : quality}
      </span>
    </div>
  );
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Sync status component with queue information
// SYNC STATUS: Display background synchronization progress and queue
export function SyncStatus({ isPending, queueSize, onForceSync, className = '' }: SyncStatusProps) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {isPending ? (
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
            ) : queueSize > 0 ? (
              <Clock className="w-4 h-4 text-yellow-600" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-600" />
            )}
            
            <span className="text-xs font-medium text-slate-900">
              {isPending ? 'Syncing...' : queueSize > 0 ? 'Sync Pending' : 'Synced'}
            </span>
          </div>
          
          {queueSize > 0 && (
            <Badge variant="secondary" className="text-xs">
              {queueSize} items
            </Badge>
          )}
        </div>
        
        {!isPending && queueSize > 0 && onForceSync && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onForceSync}
            className="text-xs h-6 px-2"
          >
            Sync Now
          </Button>
        )}
      </div>
      
      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Sync progress animation */}
      {/* PROGRESS ANIMATION: Visual feedback for ongoing sync operations */}
      {isPending && (
        <div className="mt-2">
          <div className="w-full bg-slate-200 rounded-full h-1">
            <m.div
              className="bg-blue-600 h-1 rounded-full"
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// CONTEXT7 SOURCE: /facebook/react - Utility functions for formatting
// UTILITY FUNCTIONS: Helper functions for data formatting and display

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}