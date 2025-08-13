/**
 * CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline fallback page for PWA functionality
 * OFFLINE FALLBACK: Comprehensive offline experience page for royal client service
 * 
 * Offline Fallback Page - Premium Service Continuity
 * Features:
 * - Elegant offline messaging and branding
 * - Cached content access guidance
 * - Service resumption expectations
 * - Emergency contact information
 * - Royal client quality experience
 */

'use client';

import React, { useState, useEffect } from 'react';

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic rendering for client-only pages
// SSR COMPATIBILITY: Offline page requires client-side only rendering due to navigator/window dependencies
export const dynamic = 'force-dynamic';
import { m } from 'framer-motion';
import { useOffline } from '@/hooks/use-offline';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  WifiOff, 
  Wifi, 
  RefreshCw, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  Shield,
  BookOpen,
  ArrowLeft,
  Database
} from 'lucide-react';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for offline page
// TYPE SAFETY: Complete interfaces for offline page configuration
export interface OfflinePageProps {
  showBackButton?: boolean;
  showContactInfo?: boolean;
  showCachedContent?: boolean;
  customMessage?: string;
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Main offline fallback page component
// OFFLINE PAGE: Comprehensive offline experience with royal client standards
export default function OfflinePage({
  showBackButton = true,
  showContactInfo = true,
  showCachedContent = true,
  customMessage
}: OfflinePageProps) {
  const { state, actions } = useOffline();
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // CONTEXT7 SOURCE: /facebook/react - Auto-retry connection check
  // AUTO RETRY: Automatic connection monitoring and retry mechanism
  useEffect(() => {
    const checkConnection = async () => {
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only navigator check for SSR compatibility
      // SSR COMPATIBILITY: Ensure navigator is available (client-side only)
      if (typeof navigator !== 'undefined' && navigator.onLine && !state.isOnline) {
        try {
          // Try to refresh cached content
          await actions.refreshCache();
          
          // If successful and we have connectivity, redirect to main FAQ
          if (state.isOnline) {
            window.location.href = '/faq';
          }
        } catch (error) {
          console.warn('Connection check failed:', error);
        }
      }
    };

    const interval = setInterval(checkConnection, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [state.isOnline, actions]);

  // CONTEXT7 SOURCE: /facebook/react - Manual retry functionality
  // MANUAL RETRY: User-initiated connection retry with feedback
  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);

    try {
      // Attempt to refresh cache and check connectivity
      await actions.refreshCache();
      
      // Test connectivity with a simple fetch
      const response = await fetch('/api/health', { 
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (response.ok) {
        // Successfully reconnected
        window.location.href = '/faq';
      }
    } catch (error) {
      console.warn('Manual retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  // CONTEXT7 SOURCE: /facebook/react - Navigation handlers
  // NAVIGATION: Handle back navigation and cached content access
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const handleViewCachedFAQ = () => {
    // Navigate to FAQ page which will show cached content
    window.location.href = '/faq';
  };

  // CONTEXT7 SOURCE: /grx7/framer-motion - Offline page layout with animations
  // PAGE LAYOUT: Elegant offline experience with premium branding
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Connection status header */}
        {/* STATUS HEADER: Visual connection status indicator */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <WifiOff className="w-10 h-10 text-orange-600" />
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-3">
            You're Offline
          </h1>
          
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            {customMessage || 
              "Don't worry - we've saved your place. Our premium FAQ content is available offline."
            }
          </p>
        </m.div>

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Main offline content card */}
        {/* CONTENT CARD: Primary offline information and actions */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            {/* Connection Status */}
            <div className="flex items-center justify-between mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <WifiOff className="w-5 h-5 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">No Internet Connection</h3>
                  <p className="text-sm text-orange-700">
                    Automatically checking for reconnection...
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                disabled={isRetrying}
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                {isRetrying ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isRetrying ? 'Retrying...' : 'Retry'}
              </Button>
            </div>

            {/* Cached Content Access */}
            {showCachedContent && (
              <div className="mb-6">
                <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">
                  Available Offline Content
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-blue-900">FAQ Database</h4>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Access cached FAQ questions and answers
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleViewCachedFAQ}
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      View Cached FAQ
                    </Button>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Database className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Search Offline</h4>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Search through locally stored content
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {state.cacheSize > 0 ? 
                        `${Math.round(state.cacheSize / 1024)} KB cached` : 
                        'No cache available'
                      }
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Service Continuity Message */}
            <div className="p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    Premium Service Continuity
                  </h3>
                  <p className="text-primary-800 text-sm leading-relaxed">
                    As a valued client of My Private Tutor Online, your experience remains premium 
                    even offline. All your interactions are securely queued and will automatically 
                    sync when connectivity returns.
                  </p>
                  
                  {state.syncPending && (
                    <div className="mt-3 flex items-center space-x-2 text-primary-700">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {state.syncQueueSize} interaction{state.syncQueueSize !== 1 ? 's' : ''} 
                        waiting to sync
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact Information */}
            {showContactInfo && (
              <div className="mb-6">
                <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">
                  Need Immediate Assistance?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Phone className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-medium text-slate-900 mb-1">Phone</h4>
                    <p className="text-sm text-slate-600">+44 20 7123 4567</p>
                    <p className="text-xs text-slate-500 mt-1">24/7 Support</p>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Mail className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-medium text-slate-900 mb-1">Email</h4>
                    <p className="text-sm text-slate-600">help@myprivatetutoronline.com</p>
                    <p className="text-xs text-slate-500 mt-1">Response within 2 hours</p>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-medium text-slate-900 mb-1">Live Chat</h4>
                    <p className="text-sm text-slate-600">Available when online</p>
                    <p className="text-xs text-slate-500 mt-1">Instant response</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {showBackButton && (
                <Button
                  variant="outline"
                  onClick={handleGoBack}
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              )}
              
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex-1"
              >
                {isRetrying ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Wifi className="w-4 h-4 mr-2" />
                )}
                {isRetrying ? 'Checking Connection...' : 'Try Reconnecting'}
              </Button>
            </div>

            {retryCount > 0 && (
              <p className="text-xs text-slate-500 mt-3 text-center">
                Retry attempts: {retryCount}
              </p>
            )}
          </Card>
        </m.div>

        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Royal branding footer */}
        {/* BRANDING FOOTER: Maintain premium brand presence offline */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <div className="flex items-center justify-center space-x-2 text-slate-600 mb-2">
            <Star className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium">My Private Tutor Online</span>
            <Star className="w-4 h-4 text-accent-500" />
          </div>
          <p className="text-xs text-slate-500">
            Royal Client Service • Est. 2010 • Featured in Tatler Address Book 2025
          </p>
        </m.div>
      </div>
    </div>
  );
}