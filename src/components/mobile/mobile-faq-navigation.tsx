/**
 * CONTEXT7 SOURCE: /llfbandit/app_links - Mobile FAQ navigation with deep link support
 * MOBILE NAVIGATION: Touch-optimized FAQ navigation for mobile app integration
 * 
 * Mobile FAQ Navigation Component
 * Provides swipe-based navigation and deep link handling for FAQ content
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { m, AnimatePresence, PanInfo } from 'framer-motion'
import { useDeepLinkHandler } from '@/lib/deep-linking/deep-link-handler'
import { FAQ_DEEP_LINK_PATTERNS } from '@/lib/deep-linking/url-patterns'

// CONTEXT7 SOURCE: /llfbandit/app_links - Mobile navigation state management
// NAVIGATION STATE: Touch-optimized state management for FAQ navigation
interface MobileNavState {
  currentCategory: string | null
  currentQuestion: string | null
  searchQuery: string
  isNavigating: boolean
  swipeDirection: 'left' | 'right' | null
  touchStartX: number | null
  touchVelocity: number
}

export interface MobileFAQNavigationProps {
  categories: Array<{
    id: string
    title: string
    icon: string
    questions: Array<{
      id: string
      question: string
      answer: string
    }>
  }>
  currentCategory?: string
  currentQuestion?: string
  onCategoryChange?: (categoryId: string) => void
  onQuestionSelect?: (questionId: string) => void
  onSearchChange?: (query: string) => void
  enableSwipeNavigation?: boolean
  enableHapticFeedback?: boolean
  className?: string
}

/**
 * CONTEXT7 SOURCE: /llfbandit/app_links - Mobile FAQ navigation with gesture support
 * GESTURE NAVIGATION: Comprehensive touch-based navigation for FAQ content
 */
export function MobileFAQNavigation({
  categories,
  currentCategory,
  currentQuestion,
  onCategoryChange,
  onQuestionSelect,
  onSearchChange,
  enableSwipeNavigation = true,
  enableHapticFeedback = true,
  className = ''
}: MobileFAQNavigationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { navigateToDeepLink, shareDeepLink, utilities } = useDeepLinkHandler()
  
  const [navState, setNavState] = useState<MobileNavState>({
    currentCategory: currentCategory || null,
    currentQuestion: currentQuestion || null,
    searchQuery: '',
    isNavigating: false,
    swipeDirection: null,
    touchStartX: null,
    touchVelocity: 0
  })

  const [showQuickActions, setShowQuickActions] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  // CONTEXT7 SOURCE: /llfbandit/app_links - Category navigation with deep linking
  // CATEGORY NAVIGATION: Handle category changes with deep link integration
  const handleCategoryChange = useCallback((categoryId: string, source: 'swipe' | 'tap' | 'deep_link' = 'tap') => {
    setNavState(prev => ({ 
      ...prev, 
      currentCategory: categoryId,
      currentQuestion: null,
      isNavigating: true 
    }))

    // Haptic feedback for user interaction
    if (enableHapticFeedback && 'vibrate' in navigator && source !== 'deep_link') {
      navigator.vibrate(50)
    }

    // Navigate using deep link system
    navigateToDeepLink('faq_category', {
      categoryId,
      source: source === 'swipe' ? 'swipe_navigation' : 'mobile_navigation'
    }, {
      scroll: true,
      trackAnalytics: true
    })

    // Callback for parent component
    onCategoryChange?.(categoryId)

    // Reset navigation state
    setTimeout(() => {
      setNavState(prev => ({ ...prev, isNavigating: false }))
    }, 300)
  }, [navigateToDeepLink, onCategoryChange, enableHapticFeedback])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Question selection with deep linking
  // QUESTION SELECTION: Handle question selection with deep link support
  const handleQuestionSelect = useCallback((questionId: string) => {
    setNavState(prev => ({ 
      ...prev, 
      currentQuestion: questionId,
      isNavigating: true 
    }))

    // Haptic feedback
    if (enableHapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(30)
    }

    // Navigate using deep link system
    navigateToDeepLink('faq_question', {
      questionId,
      categoryId: navState.currentCategory || undefined,
      source: 'mobile_navigation'
    }, {
      scroll: true,
      trackAnalytics: true
    })

    // Callback for parent component
    onQuestionSelect?.(questionId)

    // Reset navigation state
    setTimeout(() => {
      setNavState(prev => ({ ...prev, isNavigating: false }))
    }, 300)
  }, [navigateToDeepLink, onQuestionSelect, navState.currentCategory, enableHapticFeedback])

  // CONTEXT7 SOURCE: /framer/motion - Swipe gesture handling for navigation
  // SWIPE GESTURES: Touch-based navigation between FAQ categories
  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    if (!enableSwipeNavigation) return

    const { offset, velocity } = info
    const swipeThreshold = 100
    const velocityThreshold = 500

    // Determine swipe direction and strength
    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
      const direction = offset.x > 0 ? 'right' : 'left'
      setNavState(prev => ({ ...prev, swipeDirection: direction, touchVelocity: Math.abs(velocity.x) }))

      // Navigate to adjacent category
      handleSwipeNavigation(direction)
    }
  }, [enableSwipeNavigation])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Swipe navigation logic
  // SWIPE LOGIC: Navigate between FAQ categories using swipe gestures
  const handleSwipeNavigation = useCallback((direction: 'left' | 'right') => {
    if (!navState.currentCategory) return

    const currentIndex = categories.findIndex(cat => cat.id === navState.currentCategory)
    if (currentIndex === -1) return

    let newIndex: number
    if (direction === 'left') {
      // Swipe left - next category
      newIndex = (currentIndex + 1) % categories.length
    } else {
      // Swipe right - previous category
      newIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1
    }

    const newCategory = categories[newIndex]
    if (newCategory) {
      handleCategoryChange(newCategory.id, 'swipe')
    }

    // Clear swipe direction after animation
    setTimeout(() => {
      setNavState(prev => ({ ...prev, swipeDirection: null, touchVelocity: 0 }))
    }, 300)
  }, [navState.currentCategory, categories, handleCategoryChange])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Search functionality with deep linking
  // SEARCH INTEGRATION: FAQ search with deep link support
  const handleSearchChange = useCallback((query: string) => {
    setNavState(prev => ({ ...prev, searchQuery: query }))
    
    // Debounced search navigation
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        navigateToDeepLink('faq_search', {
          searchQuery: query.trim(),
          source: 'mobile_search'
        })
      }
      onSearchChange?.(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [navigateToDeepLink, onSearchChange])

  // CONTEXT7 SOURCE: /llfbandit/app_links - Quick action sharing
  // SHARING ACTIONS: Mobile-optimized sharing for FAQ content
  const handleShare = useCallback(async () => {
    if (!navState.currentCategory && !navState.currentQuestion) return

    try {
      const pattern = navState.currentQuestion ? 'faq_question' : 'faq_category'
      const params = {
        categoryId: navState.currentCategory || undefined,
        questionId: navState.currentQuestion || undefined,
        source: 'mobile_share'
      }

      const result = await shareDeepLink(pattern as any, params, {
        title: `FAQ - ${navState.currentCategory || 'Help'}`,
        text: 'Find answers to your tutoring questions',
        platform: 'web'
      })

      if (result.success && enableHapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate([50, 100, 50])
      }
    } catch (error) {
      console.warn('Share failed:', error)
    }
  }, [navState, shareDeepLink, enableHapticFeedback])

  // CONTEXT7 SOURCE: /llfbandit/app_links - URL parameter synchronization
  // SYNC NAVIGATION: Keep navigation state in sync with URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    const questionFromUrl = searchParams.get('question')
    const searchFromUrl = searchParams.get('q') || searchParams.get('query')

    if (categoryFromUrl && categoryFromUrl !== navState.currentCategory) {
      setNavState(prev => ({ ...prev, currentCategory: categoryFromUrl }))
    }
    if (questionFromUrl && questionFromUrl !== navState.currentQuestion) {
      setNavState(prev => ({ ...prev, currentQuestion: questionFromUrl }))
    }
    if (searchFromUrl && searchFromUrl !== navState.searchQuery) {
      setNavState(prev => ({ ...prev, searchQuery: searchFromUrl }))
    }
  }, [searchParams, navState])

  return (
    <div className={`mobile-faq-navigation ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Mobile-first navigation header */}
      {/* NAVIGATION HEADER: Touch-optimized header with search and quick actions */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="px-4 py-3">
          {/* Search Bar */}
          <div className={`
            flex items-center space-x-3 transition-all duration-300
            ${isSearchExpanded ? 'mb-3' : ''}
          `}>
            <div className="flex-1 relative">
              <div className="relative">
                <input
                  type="text"
                  value={navState.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setIsSearchExpanded(false)}
                  placeholder="Search FAQ..."
                  className={`
                    w-full rounded-xl border border-slate-300 px-4 py-3 pl-12 pr-10
                    text-sm focus:border-accent-500 focus:outline-none focus:ring-2 
                    focus:ring-accent-500/20 transition-all duration-200
                    ${isSearchExpanded ? 'bg-white shadow-lg' : 'bg-slate-50'}
                  `}
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {navState.searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Quick Actions Button */}
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          {/* Quick Actions Panel */}
          <AnimatePresence>
            {showQuickActions && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex space-x-2 mt-3"
              >
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-3 py-2 bg-accent-100 text-accent-700 rounded-lg text-sm font-medium hover:bg-accent-200 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
                
                <button
                  onClick={() => router.push('/faq#contact')}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Contact</span>
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CONTEXT7 SOURCE: /framer/motion - Category navigation with swipe support */}
      {/* CATEGORY TABS: Swipeable category navigation */}
      <div className="overflow-hidden">
        <m.div
          drag={enableSwipeNavigation ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onPanEnd={handlePanEnd}
          className="flex space-x-2 px-4 py-3 bg-slate-50 cursor-grab active:cursor-grabbing"
          whileTap={{ cursor: 'grabbing' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-200 flex-shrink-0 min-w-max
                ${navState.currentCategory === category.id
                  ? 'bg-accent-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }
              `}
            >
              <span className="text-base">{category.icon}</span>
              <span>{category.title}</span>
              <span className="text-xs opacity-70 bg-white/20 px-2 py-1 rounded-full">
                {category.questions.length}
              </span>
            </button>
          ))}
        </m.div>
      </div>

      {/* CONTEXT7 SOURCE: /llfbandit/app_links - Swipe navigation indicator */}
      {/* SWIPE INDICATOR: Visual feedback for swipe navigation */}
      {enableSwipeNavigation && (
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Swipe to navigate categories</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      )}

      {/* Navigation State Debug (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-200 text-xs text-yellow-800">
          <div>Category: {navState.currentCategory || 'None'}</div>
          <div>Question: {navState.currentQuestion || 'None'}</div>
          <div>Search: {navState.searchQuery || 'None'}</div>
          <div>Navigating: {navState.isNavigating ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  )
}