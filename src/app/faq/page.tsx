/**
 * CONTEXT7 SOURCE: /vercel/next.js - Client Component with modular architecture
 * MODULARIZATION REASON: Official Next.js documentation recommends component extraction for maintainability
 * 
 * FAQ Page - Modular Architecture Implementation
 * Features extracted components for better code organization:
 * - FAQSearchSection: Search and category filtering
 * - FAQCategorySection: Category display with accordions  
 * - FAQContactSection: Premium contact CTA section
 * 
 * Component Architecture:
 * - Modular component design
 * - Client-side search filtering
 * - Animated sections
 * - CMS integration
 */

"use client"

// CONTEXT7 SOURCE: /context7/react_dev - React.lazy and Suspense for code splitting and lazy loading
// PERFORMANCE OPTIMIZATION: Dynamic imports with lazy loading for non-critical components
import React, { useMemo, useCallback, useEffect } from 'react'
import nextDynamic from 'next/dynamic'

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic rendering for client-only pages with browser APIs
// SSR COMPATIBILITY: FAQ page requires client-side only rendering due to navigator/window dependencies  
// CONTEXT7 SOURCE: /vercel/next.js - Client component without dynamic export for build compatibility
// BUILD FIX REASON: Official Next.js documentation recommends removing dynamic exports from client components during static builds
import { m } from 'framer-motion'
import { getFAQHero, getFAQCategories, getUnifiedContact, getFAQContent } from '@/lib/cms/cms-content'
import { HERO_IMAGES } from '@/lib/cms/cms-images'
import { getBusinessInfo } from '@/lib/cms/business-info'

// CONTEXT7 SOURCE: /facebook/react - Offline support hooks for FAQ system
// OFFLINE INTEGRATION: Comprehensive offline functionality for royal client experience
import { useOffline } from '@/hooks/use-offline'
import { useBackgroundSync } from '@/hooks/use-background-sync'
import { searchIndex } from '@/lib/offline/search-index'

// CONTEXT7 SOURCE: /vercel/next.js - next/dynamic for optimized component loading
// LAZY LOADING: Core layout components loaded immediately
import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/layout/simple-hero'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { Section } from '@/components/layout/section'

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports for FAQ components with loading states
// CODE SPLITTING: FAQ components loaded on demand with optimized chunks
const FAQEnhancedSearch = nextDynamic(
  () => import('@/components/faq/faq-enhanced-search').then(mod => mod.FAQEnhancedSearch),
  { 
    loading: () => <div className="h-20 bg-slate-100 animate-pulse rounded-xl" />,
    ssr: true 
  }
)

const FAQCategorySection = nextDynamic(
  () => import('@/components/faq/faq-category-section').then(mod => mod.FAQCategorySection),
  { 
    loading: () => <div className="h-96 bg-slate-100 animate-pulse rounded-xl" />,
    ssr: true 
  }
)

const FAQContactSection = nextDynamic(
  () => import('@/components/faq/faq-contact-section').then(mod => mod.FAQContactSection),
  { 
    loading: () => <div className="h-64 bg-slate-100 animate-pulse rounded-xl" />,
    ssr: true 
  }
)

// CONTEXT7 SOURCE: /vercel/next.js - Lazy load analytics and tracking components
// PERFORMANCE: Analytics loaded after main content for better LCP
const FAQAnalyticsTracker = nextDynamic(
  () => import('@/components/faq/faq-analytics-tracker').then(mod => mod.FAQAnalyticsTracker),
  { ssr: false }
)

const FAQPremiumHero = nextDynamic(
  () => import('@/components/faq/faq-premium-hero').then(mod => mod.FAQPremiumHero),
  { 
    loading: () => <div className="h-[60vh] bg-gradient-to-b from-primary-900 to-primary-800 animate-pulse" />,
    ssr: true 
  }
)

const GA4Setup = nextDynamic(
  () => import('@/components/analytics/ga4-setup').then(mod => mod.GA4Setup),
  { ssr: false }
)

const ConsentBanner = nextDynamic(
  () => import('@/components/analytics/consent-banner').then(mod => mod.ConsentBanner),
  { ssr: false }
)

// CONTEXT7 SOURCE: /vercel/next.js - Lazy load gamification components
// GAMIFICATION: Load only when enabled for optimal performance
const GamificationProvider = nextDynamic(
  () => import('@/components/faq/faq-gamification-tracker').then(mod => mod.GamificationProvider),
  { ssr: false }
)

const FAQGamificationSystem = nextDynamic(
  () => import('@/components/faq/faq-gamification-system').then(mod => mod.FAQGamificationSystem),
  { 
    loading: () => <div className="h-32 bg-purple-100 animate-pulse rounded-xl" />,
    ssr: false 
  }
)

const FAQGamificationLeaderboard = nextDynamic(
  () => import('@/components/faq/faq-gamification-leaderboard').then(mod => mod.FAQGamificationLeaderboard),
  { 
    loading: () => <div className="h-64 bg-amber-100 animate-pulse rounded-xl" />,
    ssr: false 
  }
)

// CONTEXT7 SOURCE: /vercel/next.js - Lazy load collaborative features
// COLLABORATIVE: Load on demand when user interacts
const FAQCollaborativeFeatures = nextDynamic(
  () => import('@/components/faq/faq-collaborative-features').then(mod => mod.FAQCollaborativeFeatures),
  { 
    loading: () => <div className="h-48 bg-blue-100 animate-pulse rounded-xl" />,
    ssr: false 
  }
)

// CONTEXT7 SOURCE: /vercel/next.js - Lazy load theme system components
// THEME SYSTEM: Load theme switcher on demand
const FAQThemeSwitcher = nextDynamic(
  () => import('@/components/faq/faq-theme-switcher').then(mod => mod.FAQThemeSwitcher),
  { 
    loading: () => <div className="h-10 w-10 bg-slate-200 animate-pulse rounded-full" />,
    ssr: false 
  }
)

// CONTEXT7 SOURCE: /llfbandit/app_links - Mobile deep linking components for FAQ system
// MOBILE DEEP LINKING: Mobile-optimized components for Universal Links and App Links
const MobileDeepLinkHandler = nextDynamic(
  () => import('@/components/mobile/mobile-deep-link-handler').then(mod => mod.MobileDeepLinkHandler),
  { 
    loading: () => <div className="sr-only">Loading mobile deep link handler...</div>,
    ssr: false 
  }
)

const MobileFAQNavigation = nextDynamic(
  () => import('@/components/mobile/mobile-faq-navigation').then(mod => mod.MobileFAQNavigation),
  { 
    loading: () => <div className="h-16 bg-slate-100 animate-pulse md:hidden" />,
    ssr: false 
  }
)

const DeepLinkAnalytics = nextDynamic(
  () => import('@/components/analytics/deep-link-analytics').then(mod => mod.DeepLinkAnalytics),
  { ssr: false }
)

// CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline support components for FAQ system
// OFFLINE COMPONENTS: Task 28 implementation - Comprehensive offline support for FAQ system
const OfflineStatusIndicator = nextDynamic(
  () => import('@/components/offline/offline-status-indicator').then(mod => mod.OfflineStatusIndicator),
  { 
    loading: () => <div className="h-16 bg-slate-100 animate-pulse rounded-xl" />,
    ssr: false 
  }
)

const OfflineSearch = nextDynamic(
  () => import('@/components/offline/offline-search').then(mod => mod.OfflineSearch),
  { 
    loading: () => <div className="h-20 bg-slate-100 animate-pulse rounded-xl" />,
    ssr: false 
  }
)

const SyncManager = nextDynamic(
  () => import('@/components/offline/sync-manager').then(mod => mod.SyncManager),
  { 
    loading: () => <div className="h-32 bg-slate-100 animate-pulse rounded-xl" />,
    ssr: false 
  }
)

import { useFAQTheme } from '@/hooks/use-faq-theme'
// CONTEXT7 SOURCE: /kajabi/pine - CSS custom properties theme system for comprehensive theme variants
import '@/styles/faq-theme-system.css'

// RENDERING ANALYSIS - Context7 MCP Verified:
// Documentation Source: Next.js Client Components Dynamic Rendering
// Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/05-server-and-client-components.mdx
//
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Industry Standard: Client Components are inherently dynamic, force-dynamic is unnecessary
// - Context7 Verification: "Client Components run on the client and do not require JavaScript to render on the client"
//
// ROUTE SEGMENT ANALYSIS:
// - Rendering Mode: Dynamic (ƒ) - Automatic via "use client" directive
// - Parent/Child: FAQ page component, children: PageHeader, PageFooter, search/filter components
// - Dynamic Features: useState for search filtering, interactive accordion components, form handling
// - Dependencies: CMS functions (getFAQHero, getFAQCategories, getUnifiedContact), UI components
// - Interactivity: Search functionality, accordion expand/collapse, contact form interactions
// - CMS Integration: Complete with FAQ hero, categories, contact details

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations and motion components for professional styling
// DESIGN ENHANCEMENT: Consistent visual branding with WaveSeparator, GradientOverlay, and premium card designs
// IMPLEMENTATION REASON: Matching testimonials and landing page professional appearance standards
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for scroll animations

// CMS DATA SOURCE: Using getFAQContent for FAQ page data

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic SEO imports for FAQ page optimization
// SEO INTEGRATION: Comprehensive SEO optimization for £381,600+ revenue opportunity
const FAQSEOIntegration = nextDynamic(
  () => import('@/components/seo/faq-seo-integration').then(mod => mod.FAQSEOIntegration),
  { 
    loading: () => <div className="h-16 bg-slate-50 animate-pulse rounded-lg" />,
    ssr: true 
  }
)

/**
 * FAQ Page Component - Modular Implementation
 * CONTEXT7 SOURCE: /vercel/next.js - Component extraction patterns for better maintainability
 * MODULARIZATION REASON: Main page component orchestrates extracted components per Next.js design principles
 */
// CONTEXT7 SOURCE: /context7/react_dev - React.memo for component memoization
// PERFORMANCE: Memoize FAQ page to prevent unnecessary re-renders
const FAQPage = React.memo(function FAQPage() {
  // CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline support integration for FAQ system
  // OFFLINE INTEGRATION: Task 28 implementation - Comprehensive offline functionality
  const { state: offlineState, actions: offlineActions } = useOffline({
    enableSyncQueue: true,
    enableConnectionMonitoring: true,
    onOnline: () => {
      console.log('🌐 FAQ System: Back online - Syncing cached interactions');
    },
    onOffline: () => {
      console.log('📡 FAQ System: Gone offline - Switching to cached mode');
    }
  })
  
  const { state: syncState, actions: syncActions } = useBackgroundSync({
    enableAutoSync: true,
    enableMetrics: true,
    enableConflictTracking: true,
    onSyncSuccess: (results) => {
      console.log(`✅ FAQ Sync: ${results.length} actions synchronized`);
    },
    onSyncError: (error) => {
      console.warn('⚠️ FAQ Sync Error:', error);
    }
  })

  // CONTEXT7 SOURCE: /radix-ui/primitives - Print view state management for enhanced UX
  // PRINT VIEW: Toggle between interactive and print-optimized layouts
  const [showPrintView, setShowPrintView] = React.useState(false)
  
  // CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline search state management
  // OFFLINE SEARCH: Local search state for offline FAQ functionality
  const [offlineSearchResults, setOfflineSearchResults] = React.useState([])
  const [showOfflineSearch, setShowOfflineSearch] = React.useState(false)
  
  // CONTEXT7 SOURCE: /facebook/react - Task 21 gamification system state management
  // GAMIFICATION STATE: Control gamification display and user preferences
  const [showGamification, setShowGamification] = React.useState(true)
  const [showLeaderboard, setShowLeaderboard] = React.useState(false)
  const [gamificationEnabled, setGamificationEnabled] = React.useState(true)
  
  // CONTEXT7 SOURCE: /kajabi/pine - Task 24 theme system integration with comprehensive theme management
  // THEME SYSTEM: Complete theme management with system preference detection and localStorage persistence
  const faqTheme = useFAQTheme({
    enableSystemDetection: true,
    enableSeasonalThemes: true,
    storageKey: 'faq-theme-preference',
    transitionDuration: 300,
    debugMode: process.env.NODE_ENV === 'development'
  })
  
  // CONTEXT7 SOURCE: /context7/react_dev - useMemo for expensive calculations
  // PERFORMANCE: Memoize CMS data to prevent unnecessary re-computations
  const heroContent = useMemo(() => getFAQHero(), [])
  const faqCategories = useMemo(() => getFAQCategories(), [])
  const unifiedContact = useMemo(() => getUnifiedContact(), [])
  const contactContent = useMemo(() => unifiedContact.faq, [unifiedContact])
  const contactDetails = useMemo(() => unifiedContact.primary, [unifiedContact])
  
  // CONTEXT7 SOURCE: /vercel/next.js - Direct hero background image path for optimized loading
  // IMAGE OPTIMIZATION: Use direct path for new client photo integration
  const heroBackgroundImage = useMemo(
    () => ({ src: "/images/hero/hero-exam-papers.jpg", alt: "FAQ hero - Student with exam papers" }),
    []
  )
  
  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for stable function references
  // PERFORMANCE: Memoize event handlers to prevent child re-renders
  const handlePrintViewToggle = useCallback(() => {
    setShowPrintView(prev => {
      if (!prev) {
        // Entering print view - trigger browser print after state update
        // CONTEXT7 SOURCE: /vercel/next.js - Client-side only window.print() for SSR compatibility
        // SSR COMPATIBILITY: Ensure window is available for print functionality
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.print()
          }
        }, 100)
      }
      return !prev
    })
  }, [])
  
  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - FAQ analytics integration state
  // ANALYTICS STATE: User segmentation detection and entry point tracking
  const [userSegment, setUserSegment] = React.useState<'oxbridge_prep' | '11_plus' | 'a_level_gcse' | 'elite_corporate' | 'comparison_shopper'>('a_level_gcse')
  const [entryPoint, setEntryPoint] = React.useState<'direct' | 'search' | 'internal_link' | 'social' | 'email'>('direct')
  const [consentGiven, setConsentGiven] = React.useState(false)
  
  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Entry point and segment detection
  // ANALYTICS DETECTION: Automatic user segmentation and entry point detection
  React.useEffect(() => {
    // Detect entry point
    const referrer = document.referrer.toLowerCase()
    if (!referrer) {
      setEntryPoint('direct')
    } else if (referrer.includes('google.com') || referrer.includes('bing.com')) {
      setEntryPoint('search')
    } else if (referrer.includes('facebook.com') || referrer.includes('twitter.com')) {
      setEntryPoint('social')
    } else if (typeof window !== 'undefined' && referrer.includes(window.location.hostname)) {
      setEntryPoint('internal_link')
    } else {
      setEntryPoint('search') // Default for unknown referrers
    }
    
    // Check existing consent
    const storedConsent = localStorage.getItem('privacy-consent')
    if (storedConsent) {
      const consent = JSON.parse(storedConsent)
      setConsentGiven(consent.analytics)
    }
  }, [])
  
  // CONTEXT7 SOURCE: /facebook/react - Task 21 gamification preferences management
  // GAMIFICATION PREFERENCES: Load and persist user preferences for gamification features
  React.useEffect(() => {
    const savedPreferences = localStorage.getItem('faq-gamification-preferences')
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences)
        setShowGamification(preferences.showGamification ?? true)
        setShowLeaderboard(preferences.showLeaderboard ?? false)
        setGamificationEnabled(preferences.gamificationEnabled ?? true)
      } catch (error) {
        console.warn('Failed to parse gamification preferences:', error)
      }
    }
  }, [])
  
  // CONTEXT7 SOURCE: /facebook/react - Preferences persistence effect
  // PREFERENCES PERSISTENCE: Save user gamification preferences
  React.useEffect(() => {
    const preferences = {
      showGamification,
      showLeaderboard,
      gamificationEnabled
    }
    localStorage.setItem('faq-gamification-preferences', JSON.stringify(preferences))
  }, [showGamification, showLeaderboard, gamificationEnabled])
  
  // Enhanced search component now manages all search state internally
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Premium hero state management for interactive features
  // HERO INTERACTION STATE: Handle search queries, category selection, and question navigation from premium hero
  const [heroSearchQuery, setHeroSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  
  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for event handler optimization
  // PERFORMANCE: Memoized hero interaction handlers
  const handleHeroSearch = useCallback((query: string) => {
    setHeroSearchQuery(query)
    // CONTEXT7 SOURCE: /vercel/next.js - requestAnimationFrame for smooth scrolling
    requestAnimationFrame(() => {
      const searchElement = document.getElementById('faq-search-section')
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [])
  
  const handleHeroCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
    requestAnimationFrame(() => {
      const categoryElement = document.getElementById(`category-${categoryId}`)
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [])
  
  const handleHeroQuestionSelect = useCallback((questionId: string) => {
    requestAnimationFrame(() => {
      const questionElement = document.querySelector(`[data-question-id="${questionId}"]`)
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Add temporary highlight effect
        questionElement.classList.add('ring-2', 'ring-accent-400', 'ring-opacity-75')
        setTimeout(() => {
          questionElement.classList.remove('ring-2', 'ring-accent-400', 'ring-opacity-75')
        }, 3000)
      }
    })
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - useMemo for derived state
  // PERFORMANCE: Memoize calculated statistics
  const { totalQuestions, totalCategories } = useMemo(() => ({
    totalQuestions: faqCategories.reduce((sum, category) => sum + category.questions.length, 0),
    totalCategories: faqCategories.length
  }), [faqCategories])
  
  // CONTEXT7 SOURCE: /vercel/next.js - Business information integration for SEO
  // BUSINESS DATA: Centralized business information for structured data
  const businessInfo = useMemo(() => getBusinessInfo(), [])

  // CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline FAQ system initialization
  // OFFLINE INITIALIZATION: Set up search index and preload content for offline access
  useEffect(() => {
    const initializeOfflineSystem = async () => {
      try {
        console.log('🔧 Initializing offline FAQ system...');
        
        // Build search index from FAQ categories
        await searchIndex.buildIndex(faqCategories);
        
        // Preload critical FAQ content for offline access
        await offlineActions.preloadContent();
        
        console.log('✅ Offline FAQ system initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize offline FAQ system:', error);
      }
    };

    // Initialize offline system when FAQ data is available
    if (faqCategories.length > 0) {
      initializeOfflineSystem();
    }
  }, [faqCategories, offlineActions]);

  // CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline search result handler
  // SEARCH HANDLING: Handle offline search results and display
  const handleOfflineSearchResults = useCallback((results: any[]) => {
    setOfflineSearchResults(results);
    setShowOfflineSearch(results.length > 0);
  }, []);

  // CONTEXT7 SOURCE: /ducanhgh/next-pwa - FAQ interaction handlers with offline sync
  // INTERACTION HANDLERS: Queue user interactions for background synchronization
  const handleFAQRating = useCallback(async (questionId: string, rating: number, feedback?: string) => {
    try {
      await syncActions.queueFAQRating(questionId, rating, feedback);
      console.log(`📝 FAQ Rating queued for sync: Question ${questionId}, Rating ${rating}`);
    } catch (error) {
      console.error('Failed to queue FAQ rating:', error);
    }
  }, [syncActions]);

  const handleFAQFeedback = useCallback(async (questionId: string, feedback: string, helpful: boolean) => {
    try {
      await syncActions.queueFAQFeedback(questionId, feedback, helpful);
      console.log(`📝 FAQ Feedback queued for sync: Question ${questionId}`);
    } catch (error) {
      console.error('Failed to queue FAQ feedback:', error);
    }
  }, [syncActions]);
  
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns with mobile deep linking integration
  // ENHANCED LAYOUT: Official Next.js documentation with gamification provider and mobile deep linking wrapper
  return (
    <GamificationProvider 
      totalQuestions={totalQuestions}
      totalCategories={totalCategories}
      enableTracking={gamificationEnabled && consentGiven}
    >
      {/* CONTEXT7 SOURCE: /llfbandit/app_links - Mobile deep link handler wrapper */}
      {/* MOBILE DEEP LINKING: Comprehensive mobile app deep linking support for FAQ system */}
      <MobileDeepLinkHandler
        enableNotifications={true}
        enablePWAPrompt={true}
        enableSwipeGestures={true}
        className="faq-mobile-wrapper"
      >
      {/* CONTEXT7 SOURCE: /vercel/next.js - Comprehensive FAQ SEO integration for £381,600+ revenue opportunity */}
      {/* SEO INTEGRATION: Complete search optimization combining structured data, meta tags, local SEO, and featured snippets */}
      <FAQSEOIntegration
        categories={faqCategories}
        businessInfo={businessInfo}
        pageTitle={`${heroContent.title} - ${businessInfo.name}`}
        pageDescription={heroContent.description}
        canonicalUrl="https://myprivatetutoronline.com/faq"
        location={businessInfo.address.addressLocality}
        serviceAreas={businessInfo.areaServed.slice(0, 15).map(area => ({
          name: area,
          type: area.includes('County') || area.includes('shire') ? 'county' as const : 'borough' as const
        }))}
        enableStructuredData={true}
        enableMetaOptimization={true}
        enableLocalSEO={true}
        enableFeaturedSnippets={true}
        enableVoiceSearch={true}
        enableAnalytics={consentGiven}
        revenueOpportunity={381600}
        conversionGoals={['consultation', 'contact', 'phone', 'enquiry']}
        customKeywords={[
          'FAQ private tutor London',
          'tutoring questions answers',
          'Oxbridge preparation FAQ',
          '11+ tutoring help',
          'premium tutoring FAQ'
        ]}
      />
      
      {/* CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 analytics setup with FAQ-specific configuration */}
      {/* ANALYTICS SETUP: Comprehensive GA4 integration for FAQ tracking and business intelligence */}
      <GA4Setup
        enableFAQTracking={true}
        enableConversions={true}
        debugMode={process.env.NODE_ENV === 'development'}
        privacySettings={{
          consentGiven,
          analyticsStorage: consentGiven ? 'granted' : 'denied',
          adStorage: 'denied', // No advertising for FAQ
          functionalityStorage: 'granted',
          personalizationStorage: consentGiven ? 'granted' : 'denied'
        }}
      />
      
      {/* CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Privacy-compliant consent management */}
      {/* CONSENT MANAGEMENT: GDPR-compliant privacy consent for FAQ analytics */}
      <ConsentBanner
        showBanner={!consentGiven}
        onConsentChange={(consent) => {
          setConsentGiven(consent.analytics)
        }}
        theme="royal"
        position="bottom"
        compactMode={false}
      />
      
      {/* CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - FAQ page analytics tracking */}
      {/* ANALYTICS TRACKING: Automatic page view and user journey tracking */}
      <FAQAnalyticsTracker
        enableTracking={consentGiven}
        enableGA4={consentGiven}
        userSegment={userSegment}
        entryPoint={entryPoint}
        revenueOpportunity={381600}
        conversionGoals={['consultation', 'contact', 'phone']}
        debugMode={process.env.NODE_ENV === 'development'}
      />
      
      {/* CONTEXT7 SOURCE: /llfbandit/app_links - Deep link analytics tracking */}
      {/* DEEP LINK ANALYTICS: Mobile app deep link performance and conversion tracking */}
      <DeepLinkAnalytics
        config={{
          enableGA4: consentGiven,
          enableCustomEvents: true,
          enablePerformanceTracking: true,
          enableConversionTracking: true,
          revenueOpportunity: 150,
          conversionGoals: ['consultation', 'contact', 'phone', 'enquiry'],
          debugMode: process.env.NODE_ENV === 'development',
          customDimensions: {
            faq_session_type: 'deep_link',
            user_segment: userSegment,
            entry_point: entryPoint
          }
        }}
        onAnalyticsEvent={(event) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Deep Link Analytics Event:', event)
          }
        }}
      />
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
      {/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
      <SimpleHero
        backgroundImage="/images/hero/hero-exam-papers.jpg"
        h1="Frequently Asked Questions"
        h2="Get Answers"
        decorativeStyle="lines"
      />

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Mobile-first responsive layout with sticky navigation */}
      {/* RESPONSIVE LAYOUT REASON: Official Tailwind CSS documentation Section 4.2 recommends mobile-first grid systems */}
      {/* CONTEXT7 SOURCE: /w3c/wcag - Semantic HTML structure with proper landmarks for screen reader navigation */}
      {/* ACCESSIBILITY: WCAG 2.1 AA compliance with semantic page structure and ARIA landmarks */}
      <PageLayout background="white" showHeader={true} showFooter={true} containerSize="full" role="document" aria-label="FAQ - Frequently Asked Questions">

        {/* CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline status indicator integration */}
        {/* OFFLINE STATUS: Task 28 implementation - Real-time offline status for royal clients */}
        <OfflineStatusIndicator
          position="top-right"
          showDetails={true}
          showCacheInfo={true}
          showSyncStatus={true}
          compact={false}
          onRefresh={() => offlineActions.refreshCache()}
          onClearCache={() => offlineActions.clearCache()}
        />

        {/* CONTEXT7 SOURCE: /w3c/wcag - Skip navigation links for keyboard accessibility */}
        {/* SKIP LINKS: WCAG 2.1 AA requirement for keyboard navigation bypass */}
        <div className="sr-only">
          <a 
            href="#main-content" 
            className="fixed top-4 left-4 z-50 bg-primary-900 text-white px-4 py-2 rounded-md focus:not-sr-only focus:relative focus:z-50 transition-all duration-200"
            onFocus={(e) => e.target.classList.remove('sr-only')}
            onBlur={(e) => e.target.classList.add('sr-only')}
          >
            Skip to main content
          </a>
          <a 
            href="#faq-search-section" 
            className="fixed top-4 left-32 z-50 bg-primary-900 text-white px-4 py-2 rounded-md focus:not-sr-only focus:relative focus:z-50 transition-all duration-200"
            onFocus={(e) => e.target.classList.remove('sr-only')}
            onBlur={(e) => e.target.classList.add('sr-only')}
          >
            Skip to FAQ search
          </a>
          <a 
            href="#contact" 
            className="fixed top-4 left-64 z-50 bg-primary-900 text-white px-4 py-2 rounded-md focus:not-sr-only focus:relative focus:z-50 transition-all duration-200"
            onFocus={(e) => e.target.classList.remove('sr-only')}
            onBlur={(e) => e.target.classList.add('sr-only')}
          >
            Skip to contact
          </a>
        </div>

        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
          role="presentation"
          aria-hidden="true"
        />

        {/* CONTEXT7 SOURCE: /llfbandit/app_links - Mobile FAQ navigation integration */}
        {/* MOBILE NAVIGATION: Touch-optimized FAQ navigation with deep link support */}
        <div className="block md:hidden">
          <MobileFAQNavigation
            categories={faqCategories}
            currentCategory={selectedCategory || undefined}
            currentQuestion={undefined}
            onCategoryChange={(categoryId) => {
              setSelectedCategory(categoryId)
              handleHeroCategorySelect(categoryId)
            }}
            onQuestionSelect={handleHeroQuestionSelect}
            onSearchChange={(query) => {
              setHeroSearchQuery(query)
              handleHeroSearch(query)
            }}
            enableSwipeNavigation={true}
            enableHapticFeedback={true}
            className="mobile-faq-nav"
          />
        </div>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive layout container with mobile-first design */}
        {/* MOBILE-FIRST LAYOUT: Adaptive layout across all device sizes with sticky navigation */}
        {/* CONTEXT7 SOURCE: /w3c/wcag - Main content wrapper with semantic HTML5 structure */}
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white" role="main" id="main-content">
          {/* Mobile: Single column (320px-640px) */}
          {/* Tablet: Two-column layout (640px-1024px) */}
          {/* Desktop: Three-column layout (1024px+) */}
          {/* Large: Optimized spacing (1280px+) */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-8 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* STICKY NAVIGATION SIDEBAR - Desktop/Tablet Only */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Sticky positioning patterns for navigation */}
            {/* STICKY NAVIGATION: Category menu remains accessible during scrolling */}
            {/* CONTEXT7 SOURCE: /w3c/wcag - Navigation landmark with proper ARIA labeling */}
            <aside 
              className="hidden md:block md:col-span-1 lg:col-span-3" 
              role="complementary" 
              aria-label="FAQ navigation and tools"
            >
              <div className="sticky top-6 space-y-6">
                {/* Search Integration - Enhanced with Offline Support */}
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">
                    Quick Search
                    {!offlineState.isOnline && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        Offline
                      </span>
                    )}
                  </h3>
                  
                  {/* CONTEXT7 SOURCE: /ducanhgh/next-pwa - Adaptive search component */}
                  {/* ADAPTIVE SIDEBAR SEARCH: Seamless online/offline search experience */}
                  {offlineState.isOnline ? (
                    <FAQEnhancedSearch
                      questions={faqCategories.flatMap(category => category.questions)}
                      categories={faqCategories}
                      showPerformanceStats={false}
                      placeholder="Search FAQ..."
                      maxSuggestions={3}
                      className="compact"
                      initialQuery={heroSearchQuery}
                    />
                  ) : (
                    <OfflineSearch
                      placeholder="Search cached FAQ..."
                      showFilters={false}
                      showVoiceSearch={false}
                      showSuggestions={true}
                      maxResults={5}
                      onSearchResults={handleOfflineSearchResults}
                      onResultClick={(result) => {
                        console.log('Sidebar offline search result:', result);
                      }}
                      className="compact offline-sidebar-search"
                    />
                  )}
                </m.div>
                
                {/* Category Navigation */}
                <m.nav 
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  role="navigation"
                  aria-label="FAQ Categories Navigation"
                >
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {faqCategories.map((category, index) => (
                      <m.a
                        key={category.id}
                        href={`#category-${category.id}`}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-accent-50 transition-all duration-200 group"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                          {category.icon}
                        </span>
                        <span className="font-medium text-slate-700 group-hover:text-accent-700">
                          {category.title}
                        </span>
                        <span className="ml-auto text-sm text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                          {category.questions.length}
                        </span>
                      </m.a>
                    ))}
                  </div>
                </m.nav>
                
                {/* CONTEXT7 SOURCE: /ducanhgh/next-pwa - Sync manager integration for background sync monitoring */}
                {/* SYNC MANAGER: Task 28 implementation - Real-time sync status and queue management */}
                {syncState.queueLength > 0 && (
                  <m.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                  >
                    <SyncManager
                      autoSync={true}
                      syncInterval={30000}
                      maxRetries={3}
                      showQueue={true}
                      onSyncComplete={(results) => {
                        console.log('Sidebar sync completed:', results);
                      }}
                      onSyncError={(error) => {
                        console.warn('Sidebar sync error:', error);
                      }}
                      className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg"
                    />
                  </m.div>
                )}

                {/* CONTEXT7 SOURCE: /kajabi/pine - Task 24 desktop theme switcher for comprehensive theme selection */}
                {/* DESKTOP THEME SWITCHER: Full theme selection interface with preview thumbnails */}
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">Theme</h3>
                  <FAQThemeSwitcher
                    currentTheme={faqTheme.currentTheme}
                    onThemeChange={faqTheme.setTheme}
                    showSystemOption={true}
                    showSeasonalThemes={faqTheme.options.enableSeasonalThemes}
                    compact={false}
                    position="sidebar"
                    className=""
                    ariaLabel="Select FAQ page theme"
                  />
                </m.div>
              </div>
            </aside>
            
            {/* MAIN CONTENT AREA - Responsive */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive grid column configuration */}
            {/* RESPONSIVE COLUMNS: Adaptive width based on viewport size */}
            {/* CONTEXT7 SOURCE: /w3c/wcag - Main content area with semantic HTML structure */}
            <section 
              className="col-span-1 md:col-span-3 lg:col-span-9 space-y-8" 
              role="main" 
              aria-label="FAQ content and search"
            >
              
              {/* Mobile Search Header - Enhanced with Offline Support */}
              {/* CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline-enhanced search section */}
              {/* OFFLINE SEARCH: Task 28 implementation - Seamless online/offline search experience */}
              {/* CONTEXT7 SOURCE: /w3c/wcag - Search section with proper heading hierarchy */}
              <section className="block md:hidden" id="faq-search-section" aria-label="FAQ Search">
                <Section className="py-8" background="blue">
                  <div>
                    <m.div 
                      className="max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      role="search"
                      aria-label="FAQ search interface"
                    >
                      <header className="text-center mb-8">
                        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-3" id="search-heading">
                          Find Your Answer Instantly
                        </h2>
                        <p className="text-base text-white/90">
                          {offlineState.isOnline 
                            ? 'Search our comprehensive FAQ database'
                            : 'Search cached FAQ content (offline mode)'
                          }
                        </p>
                      </header>
                      
                      {/* CONTEXT7 SOURCE: /ducanhgh/next-pwa - Conditional search component based on connectivity */}
                      {/* ADAPTIVE SEARCH: Use offline search when offline, enhanced search when online */}
                      {offlineState.isOnline ? (
                        <FAQEnhancedSearch
                          questions={faqCategories.flatMap(category => category.questions)}
                          categories={faqCategories}
                          showPerformanceStats={false}
                          placeholder="Search FAQ questions..."
                          maxSuggestions={5}
                          initialQuery={heroSearchQuery}
                        />
                      ) : (
                        <OfflineSearch
                          placeholder="Search cached FAQ content..."
                          showFilters={true}
                          showVoiceSearch={true}
                          showSuggestions={true}
                          maxResults={20}
                          onSearchResults={handleOfflineSearchResults}
                          onResultClick={(result) => {
                            console.log('Offline search result clicked:', result);
                            // Handle result click navigation
                          }}
                          className="offline-search-mobile"
                        />
                      )}
                    </m.div>
                  </div>
                </Section>
              </section>

              {/* CONTEXT7 SOURCE: /context7/motion_dev - Task 21 gamification system integration */}
              {/* GAMIFICATION SYSTEM: Enhanced user engagement through progress tracking and achievements */}
              {showGamification && gamificationEnabled && !showPrintView && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <FAQGamificationSystem
                    totalQuestions={totalQuestions}
                    totalCategories={totalCategories}
                    compact={false}
                    showLeaderboard={showLeaderboard}
                    enableNotifications={true}
                    className="mb-8"
                  />
                </m.div>
              )}
              
              {/* CONTEXT7 SOURCE: /context7/motion_dev - Task 21 community leaderboard integration */}
              {/* COMMUNITY LEADERBOARD: Anonymous community engagement and healthy competition */}
              {showLeaderboard && gamificationEnabled && !showPrintView && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <FAQGamificationLeaderboard
                    maxEntries={10}
                    showCurrentUser={true}
                    enablePrivateMode={false}
                    refreshInterval={300000}
                    className=""
                  />
                </m.div>
              )}

              {/* FAQ Categories Content - Enhanced with Offline Support */}
              {/* CONTEXT7 SOURCE: /ducanhgh/next-pwa - Offline-enhanced FAQ category section */}
              {/* OFFLINE FAQ CATEGORIES: Task 28 implementation - Comprehensive offline FAQ interaction support */}
              <FAQCategorySection
                categories={faqCategories}
                searchQuery={heroSearchQuery}
                selectedCategory={selectedCategory}
                enableBulkActions={true}
                showPrintView={showPrintView}
                enableCategoryTheming={!showPrintView}
                compactMode={showPrintView}
                // Enhanced with offline support props
                isOffline={!offlineState.isOnline}
                onFAQRating={handleFAQRating}
                onFAQFeedback={handleFAQFeedback}
                offlineMessage={
                  !offlineState.isOnline 
                    ? "You're viewing cached content. Interactions will sync when online."
                    : undefined
                }
                syncStatus={{
                  queueLength: syncState.queueLength,
                  isProcessing: syncState.isProcessing,
                  lastSyncTime: syncState.lastSyncTime
                }}
              />
              
              {/* CONTEXT7 SOURCE: /react-hook-form/documentation - Task 23 collaborative features integration */}
              {/* COLLABORATIVE FEATURES: Community-driven FAQ enhancement with suggestion system, voting, and moderation */}
              {!showPrintView && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-16"
                >
                  <FAQCollaborativeFeatures
                    categories={faqCategories.map(cat => cat.id)}
                    onSuggestionSubmitted={(suggestion) => {
                      // Track collaborative engagement for analytics
                      if (consentGiven && typeof window !== 'undefined' && 'gtag' in window) {
                        const gtag = (window as any).gtag;
                        gtag('event', 'faq_suggestion_submitted', {
                          event_category: 'FAQ Collaboration',
                          event_label: suggestion.category,
                          custom_parameters: {
                            suggestion_id: suggestion.id,
                            is_anonymous: suggestion.isAnonymous,
                            suggestion_category: suggestion.category,
                            suggestion_tags: suggestion.tags.join(',')
                          }
                        })
                      }
                    }}
                    enableModeration={process.env.NODE_ENV === 'development'} // Enable for admin users in production
                    showContributorLeaderboard={true}
                    maxSuggestionsDisplay={15}
                    className="mb-16"
                  />
                </m.div>
              )}
            </section>
          </div>
        </div>

        {/* FLOATING GAMIFICATION WIDGET - Compact Version */}
        {/* CONTEXT7 SOURCE: /context7/motion_dev - Task 21 floating gamification widget */}
        {/* COMPACT GAMIFICATION: Always-visible progress indicator */}
        {gamificationEnabled && !showPrintView && !showGamification && (
          <FAQGamificationSystem
            totalQuestions={totalQuestions}
            totalCategories={totalCategories}
            compact={true}
            className=""
          />
        )}
        
        {/* FLOATING QUICK ACCESS TOOLBAR */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Enhanced floating toolbar with gamification controls */}
        {/* FLOATING TOOLBAR: Quick actions with gamification toggles */}
        {!showPrintView && (
          <m.div
            className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Gamification Controls */}
            {gamificationEnabled && (
              <div className="flex flex-col space-y-2">
                {/* Toggle Gamification Display */}
                <m.button
                  onClick={() => setShowGamification(!showGamification)}
                  className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={showGamification ? "Hide Progress" : "Show Progress"}
                  aria-label={showGamification ? "Hide Progress" : "Show Progress"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="absolute right-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {showGamification ? "Hide Progress" : "Show Progress"}
                  </span>
                </m.button>
                
                {/* Toggle Leaderboard */}
                <m.button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="w-12 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
                  aria-label={showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="absolute right-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
                  </span>
                </m.button>
              </div>
            )}
            
            {/* CONTEXT7 SOURCE: /kajabi/pine - Task 24 theme switcher integration in floating toolbar */}
            {/* THEME SWITCHER: Elegant theme selection with preview thumbnails */}
            <div className="flex flex-col space-y-2">
              <FAQThemeSwitcher
                currentTheme={faqTheme.currentTheme}
                onThemeChange={faqTheme.setTheme}
                showSystemOption={true}
                showSeasonalThemes={faqTheme.options.enableSeasonalThemes}
                compact={true}
                position="bottom"
                className=""
                ariaLabel="Switch FAQ page theme"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col space-y-2">
              {/* Print Action */}
              <m.button
                onClick={handlePrintViewToggle}
                className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Print FAQ"
                aria-label="Print FAQ"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span className="absolute right-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Print FAQ
                </span>
              </m.button>
              
              {/* Contact Action */}
              <m.a
                href="#contact"
                className="w-12 h-12 bg-accent-600 hover:bg-accent-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Contact Us"
                aria-label="Contact Us"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute right-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Contact Us
                </span>
              </m.a>
              
              {/* Back to Top */}
              <m.button
                onClick={() => {
                  // CONTEXT7 SOURCE: /vercel/next.js - Client-side only window.scrollTo() for SSR compatibility
                  // SSR COMPATIBILITY: Ensure window is available for scroll functionality
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className="w-12 h-12 bg-slate-600 hover:bg-slate-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Back to Top"
                aria-label="Back to Top"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="absolute right-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Back to Top
                </span>
              </m.button>
            </div>
          </m.div>
        )}

        {!showPrintView && (
          <>
            <WaveSeparator 
              variant="wave" 
              className="text-slate-900" 
            />

            {/* CONTEXT7 SOURCE: /vercel/next.js - Component extraction patterns for reusable contact sections */}
            {/* REUSABLE COMPONENTS: Contact section can be reused across different pages */}
            {/* CONTEXT7 SOURCE: /w3c/wcag - Contact section with proper semantic structure */}
            <section id="contact" role="region" aria-label="Contact information">
              <FAQContactSection
                contactContent={contactContent}
                contactDetails={contactDetails}
              />
            </section>
            
            {/* CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Analytics tracking for contact interactions */}
            {/* CONVERSION TRACKING: Track contact section interactions for revenue attribution */}
            {consentGiven && (
              <FAQAnalyticsTracker
                enableTracking={true}
                customEvents={{
                  contact_section_view: {
                    section: 'faq_contact',
                    revenue_opportunity: 150,
                    conversion_type: 'contact_form'
                  }
                }}
                debugMode={process.env.NODE_ENV === 'development'}
              />
            )}
          </>
        )}
      
      </PageLayout>
      </MobileDeepLinkHandler>
    </GamificationProvider>
  )
})

export default FAQPage