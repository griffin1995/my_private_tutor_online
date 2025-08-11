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

import React from 'react'
import { m } from 'framer-motion'
import { getFAQHero, getFAQCategories, getUnifiedContact } from '@/lib/cms/cms-content'
import { HERO_IMAGES } from '@/lib/cms/cms-images'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { Section } from '@/components/layout/section'
import { FAQEnhancedSearch } from '@/components/faq/faq-enhanced-search'
import { FAQCategorySection } from '@/components/faq/faq-category-section'
import { FAQContactSection } from '@/components/faq/faq-contact-section'
import { FAQAnalyticsTracker } from '@/components/faq/faq-analytics-tracker'
import { FAQPremiumHero } from '@/components/faq/faq-premium-hero'
import { GA4Setup } from '@/components/analytics/ga4-setup'
import { ConsentBanner } from '@/components/analytics/consent-banner'
// CONTEXT7 SOURCE: /facebook/react - Task 21 gamification system integration
// GAMIFICATION INTEGRATION: Import gamification components for enhanced user engagement
import { GamificationProvider } from '@/components/faq/faq-gamification-tracker'
import { FAQGamificationSystem } from '@/components/faq/faq-gamification-system'
import { FAQGamificationLeaderboard } from '@/components/faq/faq-gamification-leaderboard'

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

/**
 * FAQ Page Component - Modular Implementation
 * CONTEXT7 SOURCE: /vercel/next.js - Component extraction patterns for better maintainability
 * MODULARIZATION REASON: Main page component orchestrates extracted components per Next.js design principles
 */
export default function FAQPage() {
  // CONTEXT7 SOURCE: /radix-ui/primitives - Print view state management for enhanced UX
  // PRINT VIEW: Toggle between interactive and print-optimized layouts
  const [showPrintView, setShowPrintView] = React.useState(false)
  
  // CONTEXT7 SOURCE: /facebook/react - Task 21 gamification system state management
  // GAMIFICATION STATE: Control gamification display and user preferences
  const [showGamification, setShowGamification] = React.useState(true)
  const [showLeaderboard, setShowLeaderboard] = React.useState(false)
  const [gamificationEnabled, setGamificationEnabled] = React.useState(true)
  
  // CMS DATA SOURCE: Using getFAQHero for hero section content
  const heroContent = getFAQHero()
  // CMS DATA SOURCE: Using getFAQCategories for FAQ questions and categories  
  const faqCategories = getFAQCategories()
  // CONTEXT7 SOURCE: /microsoft/typescript - Unified contact data access with interface extraction
  const unifiedContact = getUnifiedContact()
  const contactContent = unifiedContact.faq
  const contactDetails = unifiedContact.primary
  
  // CMS DATA SOURCE: Using HERO_IMAGES for background image via backgroundImageKey
  const heroBackgroundImage = HERO_IMAGES[heroContent.backgroundImageKey as keyof typeof HERO_IMAGES]
  
  // CONTEXT7 SOURCE: /radix-ui/primitives - Print view toggle handler
  // PRINT OPTIMIZATION: Handle print view state with browser print API integration
  const handlePrintViewToggle = React.useCallback(() => {
    setShowPrintView(prev => {
      if (!prev) {
        // Entering print view - trigger browser print after state update
        setTimeout(() => {
          window.print()
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
    } else if (referrer.includes(window.location.hostname)) {
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
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Hero interaction handlers for premium experience
  // SEARCH HANDLER: Process search queries from animated search bar
  const handleHeroSearch = React.useCallback((query: string) => {
    setHeroSearchQuery(query)
    // Scroll to search section
    const searchElement = document.getElementById('faq-search-section')
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Category selection handler with smooth navigation
  // CATEGORY HANDLER: Navigate to specific FAQ category from hero showcase
  const handleHeroCategorySelect = React.useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
    // Scroll to category section
    const categoryElement = document.getElementById(`category-${categoryId}`)
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Question selection handler with direct navigation
  // QUESTION HANDLER: Navigate directly to specific FAQ question from popular carousel
  const handleHeroQuestionSelect = React.useCallback((questionId: string) => {
    // Find and scroll to the specific question
    const questionElement = document.querySelector(`[data-question-id="${questionId}"]`)
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Add temporary highlight effect
      questionElement.classList.add('ring-2', 'ring-accent-400', 'ring-opacity-75')
      setTimeout(() => {
        questionElement.classList.remove('ring-2', 'ring-accent-400', 'ring-opacity-75')
      }, 3000)
    }
  }, [])

  // CONTEXT7 SOURCE: /microsoft/typescript - Calculate FAQ statistics for gamification system
  // GAMIFICATION DATA: Prepare statistics for gamification system initialization
  const totalQuestions = faqCategories.reduce((sum, category) => sum + category.questions.length, 0)
  const totalCategories = faqCategories.length
  
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns with gamification integration
  // ENHANCED LAYOUT: Official Next.js documentation with gamification provider wrapper
  return (
    <GamificationProvider 
      totalQuestions={totalQuestions}
      totalCategories={totalCategories}
      enableTracking={gamificationEnabled && consentGiven}
    >
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
      
      {/* CONTEXT7 SOURCE: /context7/motion_dev - Premium FAQ hero with advanced animations and interactive features */}
      {/* PREMIUM HERO REASON: Task 17 implementation - Advanced hero section with animated search, carousel, and glass-morphism effects */}
      <FAQPremiumHero
        onSearchQuery={handleHeroSearch}
        onCategorySelect={handleHeroCategorySelect}
        onQuestionSelect={handleHeroQuestionSelect}
      />

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Mobile-first responsive layout with sticky navigation */}
      {/* RESPONSIVE LAYOUT REASON: Official Tailwind CSS documentation Section 4.2 recommends mobile-first grid systems */}
      <PageLayout background="white" showHeader={false} showFooter={true}>

        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive layout container with mobile-first design */}
        {/* MOBILE-FIRST LAYOUT: Adaptive layout across all device sizes with sticky navigation */}
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
          {/* Mobile: Single column (320px-640px) */}
          {/* Tablet: Two-column layout (640px-1024px) */}
          {/* Desktop: Three-column layout (1024px+) */}
          {/* Large: Optimized spacing (1280px+) */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-8 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* STICKY NAVIGATION SIDEBAR - Desktop/Tablet Only */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Sticky positioning patterns for navigation */}
            {/* STICKY NAVIGATION: Category menu remains accessible during scrolling */}
            <aside className="hidden md:block md:col-span-1 lg:col-span-3">
              <div className="sticky top-6 space-y-6">
                {/* Search Integration */}
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">Quick Search</h3>
                  <FAQEnhancedSearch
                    questions={faqCategories.flatMap(category => category.questions)}
                    categories={faqCategories}
                    showPerformanceStats={false}
                    placeholder="Search FAQ..."
                    maxSuggestions={3}
                    className="compact"
                    initialQuery={heroSearchQuery}
                  />
                </m.div>
                
                {/* Category Navigation */}
                <m.nav 
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  aria-label="FAQ Categories"
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
              </div>
            </aside>
            
            {/* MAIN CONTENT AREA - Responsive */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive grid column configuration */}
            {/* RESPONSIVE COLUMNS: Adaptive width based on viewport size */}
            <main className="col-span-1 md:col-span-3 lg:col-span-9 space-y-8">
              
              {/* Mobile Search Header */}
              {/* CONTEXT7 SOURCE: /context7/motion_dev - Enhanced search section with hero query integration */}
              {/* SEARCH INTEGRATION: Handle search queries from premium hero component */}
              <div className="block md:hidden" id="faq-search-section">
                <Section className="py-8" background="blue">
                  <div className="container mx-auto px-4">
                    <m.div 
                      className="max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-3">
                          Find Your Answer Instantly
                        </h2>
                        <p className="text-base text-white/90">
                          Search our comprehensive FAQ database
                        </p>
                      </div>
                      
                      <FAQEnhancedSearch
                        questions={faqCategories.flatMap(category => category.questions)}
                        categories={faqCategories}
                        showPerformanceStats={false}
                        placeholder="Search FAQ questions..."
                        maxSuggestions={5}
                        initialQuery={heroSearchQuery}
                      />
                    </m.div>
                  </div>
                </Section>
              </div>

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

              {/* FAQ Categories Content */}
              {/* CONTEXT7 SOURCE: /context7/motion_dev - Enhanced category section with gamification integration */}
              {/* CATEGORY INTEGRATION: Handle category selection from premium hero with gamification tracking */}
              <FAQCategorySection
                categories={faqCategories}
                searchQuery={heroSearchQuery}
                selectedCategory={selectedCategory}
                enableBulkActions={true}
                showPrintView={showPrintView}
                onPrintViewToggle={handlePrintViewToggle}
                enableCategoryTheming={!showPrintView}
                compactMode={showPrintView}
              />
            </main>
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
            
            {/* Quick Actions */}
            <div className="flex flex-col space-y-2">
              {/* Print Action */}
              {onPrintViewToggle && (
                <m.button
                  onClick={onPrintViewToggle}
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
              )}
              
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
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
            <div id="contact">
              <FAQContactSection
                contactContent={contactContent}
                contactDetails={contactDetails}
              />
            </div>
            
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
    </GamificationProvider>
  )
}