/**
 * CONTEXT7 SOURCE: /llfbandit/app_links - Mobile deep link handler component for FAQ system
 * MOBILE DEEP LINKING: React component for handling Universal Links, App Links, and PWA navigation
 * 
 * Mobile Deep Link Handler Component
 * Provides touch-optimized interface for deep link management
 */

'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { useDeepLinkHandler } from '@/lib/deep-linking/deep-link-handler'
import { FAQ_DEEP_LINK_PATTERNS } from '@/lib/deep-linking/url-patterns'

// CONTEXT7 SOURCE: /llfbandit/app_links - Mobile deep link notification interface
// NOTIFICATION SYSTEM: Touch-optimized notifications for deep link processing
interface DeepLinkNotification {
  type: 'success' | 'error' | 'info' | 'loading'
  title: string
  message: string
  duration?: number
  actions?: Array<{
    label: string
    action: () => void
    style?: 'primary' | 'secondary'
  }>
}

// CONTEXT7 SOURCE: /shadowwalker/next-pwa - PWA installation prompt for mobile users
// PWA INSTALL: Enhanced mobile experience with app-like installation
interface PWAInstallPrompt {
  show: boolean
  platform: 'ios' | 'android' | 'web'
  canInstall: boolean
}

export interface MobileDeepLinkHandlerProps {
  children: React.ReactNode
  enableNotifications?: boolean
  enablePWAPrompt?: boolean
  enableSwipeGestures?: boolean
  className?: string
}

/**
 * CONTEXT7 SOURCE: /llfbandit/app_links - Mobile deep link handler with gesture support
 * MOBILE OPTIMIZATION: Touch-optimized deep link handling with swipe navigation
 */
export function MobileDeepLinkHandler({
  children,
  enableNotifications = true,
  enablePWAPrompt = true,
  enableSwipeGestures = true,
  className = ''
}: MobileDeepLinkHandlerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, processDeepLink, navigateToDeepLink, shareDeepLink, utilities } = useDeepLinkHandler()
  
  const [notification, setNotification] = useState<DeepLinkNotification | null>(null)
  const [pwaPrompt, setPWAPrompt] = useState<PWAInstallPrompt>({
    show: false,
    platform: 'web',
    canInstall: false
  })
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)

  // CONTEXT7 SOURCE: /llfbandit/app_links - Deep link processing with mobile-specific enhancements
  // PROCESSING ENHANCEMENT: Mobile-optimized deep link processing with haptic feedback
  const handleDeepLinkProcessing = useCallback(async (url?: string) => {
    if (enableNotifications) {
      setNotification({
        type: 'loading',
        title: 'Processing Link',
        message: 'Opening FAQ content...',
        duration: 2000
      })
    }

    // Add haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }

    const success = processDeepLink(url)
    
    if (success && enableNotifications) {
      setNotification({
        type: 'success',
        title: 'Link Opened',
        message: 'FAQ content loaded successfully',
        duration: 3000,
        actions: [
          {
            label: 'Share',
            action: () => handleShare(),
            style: 'secondary'
          }
        ]
      })
    } else if (!success && enableNotifications) {
      setNotification({
        type: 'error',
        title: 'Link Error',
        message: 'Failed to open FAQ content',
        duration: 5000,
        actions: [
          {
            label: 'Go to FAQ',
            action: () => router.push('/faq'),
            style: 'primary'
          }
        ]
      })
    }
  }, [processDeepLink, enableNotifications, router])

  // CONTEXT7 SOURCE: /shadowwalker/next-pwa - PWA installation detection and prompt
  // PWA DETECTION: Detect PWA installation capability and show appropriate prompts
  useEffect(() => {
    if (!enablePWAPrompt) return

    const detectPWACapability = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isPWA = isStandalone || (navigator as any).standalone === true
      const isInstallable = !isPWA && 'serviceWorker' in navigator

      const userAgent = navigator.userAgent
      let platform: 'ios' | 'android' | 'web' = 'web'
      
      if (/iPhone|iPad|iPod/.test(userAgent)) {
        platform = 'ios'
      } else if (/Android/.test(userAgent)) {
        platform = 'android'
      }

      setPWAPrompt({
        show: isInstallable && state.isDeepLink,
        platform,
        canInstall: isInstallable
      })
    }

    detectPWACapability()
    
    // Listen for app install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setPWAPrompt(prev => ({ ...prev, show: true, canInstall: true }))
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [enablePWAPrompt, state.isDeepLink])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Mobile sharing with Web Share API
  // SHARING FUNCTIONALITY: Native mobile sharing for deep links
  const handleShare = useCallback(async () => {
    if (!state.pattern || !state.params) return

    try {
      const shareResult = await shareDeepLink(state.pattern as any, state.params, {
        title: `FAQ - ${state.params.categoryId ? state.params.categoryId.charAt(0).toUpperCase() + state.params.categoryId.slice(1) : 'Help'}`,
        text: state.params.searchQuery 
          ? `FAQ Search: ${state.params.searchQuery}` 
          : 'Find answers to your tutoring questions',
        platform: state.platform
      })

      if (shareResult.success && enableNotifications) {
        setNotification({
          type: 'success',
          title: 'Link Shared',
          message: `Shared via ${shareResult.method}`,
          duration: 3000
        })
      }
    } catch (error) {
      if (enableNotifications) {
        setNotification({
          type: 'error',
          title: 'Share Failed',
          message: 'Could not share FAQ link',
          duration: 3000
        })
      }
    }
  }, [state, shareDeepLink, enableNotifications])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Touch gesture handling for mobile navigation
  // GESTURE SUPPORT: Swipe gestures for FAQ navigation and deep link management
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enableSwipeGestures) return
    
    const touch = e.touches[0]
    setTouchStartX(touch.clientX)
    setTouchStartY(touch.clientY)
  }, [enableSwipeGestures])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!enableSwipeGestures || touchStartX === null || touchStartY === null) return

    const touch = e.changedTouches[0]
    const diffX = touchStartX - touch.clientX
    const diffY = touchStartY - touch.clientY
    
    // Minimum swipe distance
    const minSwipeDistance = 50
    
    // Horizontal swipe detection
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Swipe left - next FAQ category
        handleSwipeNavigation('next')
      } else {
        // Swipe right - previous FAQ category
        handleSwipeNavigation('previous')
      }
    }
    
    setTouchStartX(null)
    setTouchStartY(null)
  }, [enableSwipeGestures, touchStartX, touchStartY])

  // CONTEXT7 SOURCE: /vercel/next.js - Swipe navigation for FAQ categories
  // SWIPE NAVIGATION: Touch-based navigation between FAQ categories
  const handleSwipeNavigation = useCallback((direction: 'next' | 'previous') => {
    if (!state.params.categoryId) return

    // Simple category navigation logic
    const categories = ['general', 'pricing', 'booking', 'academic', 'technical', 'contact']
    const currentIndex = categories.indexOf(state.params.categoryId)
    
    if (currentIndex === -1) return

    let newIndex: number
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % categories.length
    } else {
      newIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1
    }

    navigateToDeepLink('faq_category', { 
      categoryId: categories[newIndex],
      source: 'swipe_navigation'
    })

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30)
    }
  }, [state.params.categoryId, navigateToDeepLink])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Auto-dismiss notifications
  // NOTIFICATION MANAGEMENT: Automatic notification dismissal with touch-friendly controls
  useEffect(() => {
    if (!notification || !notification.duration) return

    const timer = setTimeout(() => {
      setNotification(null)
    }, notification.duration)

    return () => clearTimeout(timer)
  }, [notification])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Deep link URL processing on mount
  // INITIALIZATION: Process deep links when component mounts or URL changes
  useEffect(() => {
    const hasDeepLinkIndicators = searchParams.has('source') || 
                                  searchParams.has('utm_source') ||
                                  window.location.pathname.includes('/faq/')

    if (hasDeepLinkIndicators) {
      handleDeepLinkProcessing()
    }
  }, [searchParams, handleDeepLinkProcessing])

  return (
    <div 
      className={`mobile-deep-link-handler ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}

      {/* CONTEXT7 SOURCE: /framer/motion - Mobile notification system */}
      {/* NOTIFICATION UI: Touch-optimized notification display */}
      <AnimatePresence>
        {enableNotifications && notification && (
          <m.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
          >
            <div className={`
              rounded-2xl p-4 shadow-2xl backdrop-blur-md border
              ${notification.type === 'success' ? 'bg-green-50/90 border-green-200 text-green-800' : ''}
              ${notification.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-800' : ''}
              ${notification.type === 'info' ? 'bg-blue-50/90 border-blue-200 text-blue-800' : ''}
              ${notification.type === 'loading' ? 'bg-slate-50/90 border-slate-200 text-slate-800' : ''}
            `}>
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {notification.type === 'success' && (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {notification.type === 'error' && (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {notification.type === 'info' && (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {notification.type === 'loading' && (
                    <svg className="w-5 h-5 text-slate-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold">{notification.title}</h4>
                  <p className="text-sm opacity-90 mt-1">{notification.message}</p>
                  
                  {/* Actions */}
                  {notification.actions && (
                    <div className="flex space-x-3 mt-3">
                      {notification.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          className={`
                            text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200
                            ${action.style === 'primary' 
                              ? 'bg-white/90 text-slate-800 hover:bg-white' 
                              : 'bg-transparent border border-current hover:bg-white/20'
                            }
                          `}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dismiss */}
                <button
                  onClick={() => setNotification(null)}
                  className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* CONTEXT7 SOURCE: /shadowwalker/next-pwa - PWA installation prompt */}
      {/* PWA PROMPT: Mobile app installation prompt */}
      <AnimatePresence>
        {enablePWAPrompt && pwaPrompt.show && (
          <m.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-sm"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900">Install FAQ App</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Get faster access to FAQ with our mobile app
                  </p>
                  
                  <div className="flex space-x-3 mt-3">
                    <button
                      onClick={() => {
                        // Handle PWA installation
                        if ('serviceWorker' in navigator) {
                          navigator.serviceWorker.register('/sw.js')
                        }
                        setPWAPrompt(prev => ({ ...prev, show: false }))
                      }}
                      className="text-xs font-medium px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
                    >
                      Install
                    </button>
                    <button
                      onClick={() => setPWAPrompt(prev => ({ ...prev, show: false }))}
                      className="text-xs font-medium px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}