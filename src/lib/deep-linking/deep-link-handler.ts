/**
 * CONTEXT7 SOURCE: /vercel/next.js - Deep link handling system for FAQ navigation
 * DEEP LINK HANDLER: Official Next.js router integration for mobile app deep linking
 * 
 * Deep Link Handler for FAQ System
 * Supports Universal Links (iOS), App Links (Android), and PWA deep linking
 */

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useCallback, useState } from 'react'
import { 
  parseDeepLinkURL, 
  validateDeepLink, 
  trackDeepLinkUsage, 
  generateDeepLink,
  detectPlatform,
  FAQ_DEEP_LINK_PATTERNS,
  type FAQDeepLinkParams,
  type DeepLinkAnalytics
} from './url-patterns'

// CONTEXT7 SOURCE: /llfbandit/app_links - Deep link state management for React applications
// STATE MANAGEMENT: Comprehensive deep link state tracking for FAQ navigation
export interface DeepLinkState {
  isDeepLink: boolean
  pattern: string | null
  params: FAQDeepLinkParams
  platform: 'ios' | 'android' | 'web' | 'pwa'
  analytics: DeepLinkAnalytics | null
  isLoading: boolean
  error: string | null
}

// CONTEXT7 SOURCE: /vercel/next.js - Deep link hook for FAQ navigation management
// HOOK IMPLEMENTATION: React hook for handling FAQ deep link navigation and state
export function useDeepLinkHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, setState] = useState<DeepLinkState>({
    isDeepLink: false,
    pattern: null,
    params: {},
    platform: 'web',
    analytics: null,
    isLoading: false,
    error: null
  })

  // CONTEXT7 SOURCE: /llfbandit/app_links - Deep link detection and processing
  // LINK PROCESSING: Automatic deep link detection from URL parameters and referrer
  const processDeepLink = useCallback((url?: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Determine URL source
      let targetUrl = url
      if (!targetUrl && typeof window !== 'undefined') {
        targetUrl = window.location.href
      }

      if (!targetUrl) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'No URL provided for deep link processing' 
        }))
        return false
      }

      // Validate deep link
      const validation = validateDeepLink(targetUrl)
      if (!validation.isValid) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: `Invalid deep link: ${validation.errors.join(', ')}` 
        }))
        return false
      }

      // Parse deep link
      const parseResult = parseDeepLinkURL(targetUrl)
      if (!parseResult.isValid || !parseResult.pattern) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'Failed to parse deep link pattern' 
        }))
        return false
      }

      const platform = detectPlatform()
      
      // Track analytics
      const analytics = trackDeepLinkUsage(parseResult.pattern, parseResult.params, {
        customProperties: {
          original_url: targetUrl,
          validation_passed: true,
          processing_timestamp: Date.now()
        }
      })

      // Update state
      setState({
        isDeepLink: true,
        pattern: parseResult.pattern,
        params: parseResult.params,
        platform,
        analytics,
        isLoading: false,
        error: null
      })

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown deep link processing error'
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }))
      return false
    }
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - Deep link navigation with Next.js router
  // NAVIGATION: Handle FAQ deep link navigation with proper routing
  const navigateToDeepLink = useCallback((
    pattern: keyof typeof FAQ_DEEP_LINK_PATTERNS,
    params: Partial<FAQDeepLinkParams>,
    options: {
      replace?: boolean
      scroll?: boolean
      trackAnalytics?: boolean
    } = {}
  ) => {
    const { replace = false, scroll = true, trackAnalytics = true } = options

    try {
      // Generate the navigation URL
      const targetUrl = generateDeepLink(pattern, params, {
        baseUrl: '',
        includeSource: true,
        platform: detectPlatform()
      })

      // Track analytics if enabled
      if (trackAnalytics) {
        trackDeepLinkUsage(pattern, params as FAQDeepLinkParams, {
          conversionGoal: determineConversionGoal(pattern, params),
          customProperties: {
            navigation_type: replace ? 'replace' : 'push',
            scroll_behavior: scroll,
            initiated_by: 'deep_link_handler'
          }
        })
      }

      // Navigate using Next.js router
      if (replace) {
        router.replace(targetUrl, { scroll })
      } else {
        router.push(targetUrl, { scroll })
      }

      return true
    } catch (error) {
      console.error('Failed to navigate to deep link:', error)
      setState(prev => ({ 
        ...prev, 
        error: `Navigation failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }))
      return false
    }
  }, [router])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Deep link sharing functionality
  // SHARING: Generate shareable deep links for FAQ content
  const shareDeepLink = useCallback(async (
    pattern: keyof typeof FAQ_DEEP_LINK_PATTERNS,
    params: Partial<FAQDeepLinkParams>,
    options: {
      title?: string
      text?: string
      platform?: 'ios' | 'android' | 'web' | 'pwa'
    } = {}
  ) => {
    try {
      const shareUrl = generateDeepLink(pattern, params, {
        baseUrl: 'https://myprivatetutoronline.com',
        includeSource: true,
        platform: options.platform || detectPlatform()
      })

      const shareData = {
        title: options.title || 'My Private Tutor Online - FAQ',
        text: options.text || 'Find answers to your tutoring questions',
        url: shareUrl
      }

      // Use Web Share API if available
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData)
        
        // Track successful share
        trackDeepLinkUsage(pattern, params as FAQDeepLinkParams, {
          conversionGoal: 'enquiry',
          customProperties: {
            share_method: 'web_share_api',
            share_title: shareData.title,
            share_text: shareData.text,
            share_url: shareData.url
          }
        })
        
        return { success: true, method: 'web_share_api', url: shareUrl }
      } else {
        // Fallback to clipboard
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl)
          
          // Track clipboard share
          trackDeepLinkUsage(pattern, params as FAQDeepLinkParams, {
            conversionGoal: 'enquiry',
            customProperties: {
              share_method: 'clipboard',
              share_url: shareUrl
            }
          })
          
          return { success: true, method: 'clipboard', url: shareUrl }
        }
      }

      return { success: false, method: 'none', url: shareUrl, error: 'No sharing method available' }
    } catch (error) {
      return { 
        success: false, 
        method: 'error', 
        url: '', 
        error: error instanceof Error ? error.message : 'Unknown sharing error' 
      }
    }
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - Effect for automatic deep link processing
  // AUTO PROCESSING: Automatically process deep links on component mount and URL changes
  useEffect(() => {
    // Check for deep link indicators
    const hasDeepLinkParams = searchParams.has('source') || 
                              searchParams.has('utm_source') ||
                              searchParams.has('q') ||
                              window.location.pathname.includes('/faq/')

    if (hasDeepLinkParams) {
      processDeepLink()
    }
  }, [searchParams, processDeepLink])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Deep link utility functions
  // UTILITIES: Helper functions for deep link management
  const utilities = {
    // Check if current page is a deep link destination
    isCurrentPageDeepLink: () => state.isDeepLink,
    
    // Get current deep link parameters
    getCurrentParams: () => state.params,
    
    // Get available deep link patterns
    getAvailablePatterns: () => Object.keys(FAQ_DEEP_LINK_PATTERNS),
    
    // Generate URL for specific pattern
    generateUrl: (pattern: keyof typeof FAQ_DEEP_LINK_PATTERNS, params: Partial<FAQDeepLinkParams>) => 
      generateDeepLink(pattern, params, { platform: state.platform }),
    
    // Clear deep link state
    clearState: () => setState({
      isDeepLink: false,
      pattern: null,
      params: {},
      platform: detectPlatform(),
      analytics: null,
      isLoading: false,
      error: null
    })
  }

  return {
    state,
    processDeepLink,
    navigateToDeepLink,
    shareDeepLink,
    utilities
  }
}

// CONTEXT7 SOURCE: /llfbandit/app_links - Conversion goal determination for analytics
// ANALYTICS HELPER: Determine appropriate conversion goal based on deep link pattern and parameters
function determineConversionGoal(
  pattern: string, 
  params: Partial<FAQDeepLinkParams>
): 'consultation' | 'contact' | 'phone' | 'enquiry' {
  // Contact-related patterns
  if (pattern === 'faq_contact' || params.categoryId === 'contact') {
    return 'contact'
  }
  
  // High-intent categories (likely to convert to consultation)
  if (params.categoryId && ['pricing', 'booking', 'academic', 'oxbridge'].includes(params.categoryId)) {
    return 'consultation'
  }
  
  // Search queries indicating high intent
  if (params.searchQuery) {
    const highIntentKeywords = ['price', 'cost', 'book', 'schedule', 'oxbridge', 'tutor', 'lesson']
    const query = params.searchQuery.toLowerCase()
    if (highIntentKeywords.some(keyword => query.includes(keyword))) {
      return 'consultation'
    }
  }
  
  // Default to enquiry for general FAQ access
  return 'enquiry'
}

// CONTEXT7 SOURCE: /vercel/next.js - App-wide deep link initialization
// INITIALIZATION: Set up deep link handling for the entire application
export function initializeDeepLinking() {
  if (typeof window === 'undefined') return

  // Listen for app state changes (for mobile apps)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // App became visible - might be from a deep link
      const hasDeepLinkParams = window.location.href.includes('source=') ||
                                window.location.href.includes('utm_') ||
                                window.location.pathname.includes('/faq/')
      
      if (hasDeepLinkParams) {
        // Dispatch custom event for components to handle
        window.dispatchEvent(new CustomEvent('deepLinkDetected', {
          detail: { url: window.location.href, timestamp: Date.now() }
        }))
      }
    }
  })

  // Listen for URL changes (SPA navigation)
  let lastUrl = window.location.href
  new MutationObserver(() => {
    const currentUrl = window.location.href
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl
      
      // Check if new URL is a deep link
      const parseResult = parseDeepLinkURL(currentUrl)
      if (parseResult.isValid) {
        window.dispatchEvent(new CustomEvent('deepLinkNavigation', {
          detail: { 
            url: currentUrl, 
            pattern: parseResult.pattern,
            params: parseResult.params,
            timestamp: Date.now() 
          }
        }))
      }
    }
  }).observe(document, { subtree: true, childList: true })

  console.log('Deep linking system initialized for FAQ')
}