'use client'

// CONTEXT7 SOURCE: /context7/motion_dev - Homepage social proof integration with advanced animations
// IMPLEMENTATION REASON: Official Motion patterns for homepage social proof optimization and conversion enhancement
// CONTEXT7 SOURCE: /streamich/react-use - Performance optimization for homepage social proof rendering
// HOMEPAGE INTEGRATION: Comprehensive social proof deployment across key homepage conversion points

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { useWindowSize, useLocalStorage } from 'react-use'
import {
  EnhancedSocialProofIntegration,
  SocialProofConfigs
} from '../testimonials/enhanced-social-proof-integration'

// CONTEXT7 SOURCE: /context7/motion_dev - Section animation variants for homepage integration
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      duration: 0.8
    }
  }
}

interface HomepageSocialProofProps {
  userSegment?: 'oxbridge_prep' | '11_plus' | 'elite_corporate' | 'comparison_shopper' | 'general'
  intent?: 'browsing' | 'comparison' | 'booking' | 'information'
  showAIEngine?: boolean
  showRealTimeData?: boolean
  performanceMode?: 'standard' | 'optimized' | 'minimal'
  onConversion?: (source: string, data: any) => void
  onAnalytics?: (event: string, data: any) => void
}

/**
 * Enhanced Social Proof Homepage Integration
 * 
 * CONTEXT7 SOURCE: /context7/motion_dev - Comprehensive homepage social proof orchestration
 * FEATURES: Intelligent placement, AI optimization, real-time updates, conversion tracking
 * PERFORMANCE: Optimized loading, responsive design, accessibility compliant
 * CONVERSION: Strategic placement for maximum trust building and conversion optimization
 */
export const EnhancedSocialProofHomepage: React.FC<HomepageSocialProofProps> = ({
  userSegment = 'general',
  intent = 'browsing',
  showAIEngine = true,
  showRealTimeData = true,
  performanceMode = 'standard',
  onConversion,
  onAnalytics
}) => {
  const { width } = useWindowSize()
  const [userPreferences, setUserPreferences] = useLocalStorage('social_proof_preferences', {
    dismissed_floating: false,
    seen_modal: false,
    interaction_count: 0
  })

  // Determine user segment automatically if not provided
  const [detectedSegment, setDetectedSegment] = useState(userSegment)
  const [pageIntent, setPageIntent] = useState(intent)

  // Auto-detect user segment based on behavior and URL patterns
  useEffect(() => {
    const urlPath = window.location.pathname
    const urlSearch = window.location.search

    // URL-based segment detection
    if (urlPath.includes('oxbridge') || urlSearch.includes('oxford') || urlSearch.includes('cambridge')) {
      setDetectedSegment('oxbridge_prep')
      setPageIntent('comparison')
    } else if (urlPath.includes('11-plus') || urlSearch.includes('11+')) {
      setDetectedSegment('11_plus')
      setPageIntent('information')
    } else if (urlSearch.includes('premium') || urlSearch.includes('elite')) {
      setDetectedSegment('elite_corporate')
      setPageIntent('browsing')
    } else if (urlSearch.includes('compare') || document.referrer.includes('comparison')) {
      setDetectedSegment('comparison_shopper')
      setPageIntent('comparison')
    }

    // Track analytics
    onAnalytics?.('segment_detected', { 
      detected: detectedSegment, 
      original: userSegment,
      intent: pageIntent,
      url: urlPath
    })
  }, [userSegment, detectedSegment, pageIntent, onAnalytics])

  // Page context for social proof engine
  const pageContext = useMemo(() => ({
    page: 'homepage',
    section: 'main',
    intent: pageIntent,
    userSegment: detectedSegment
  }), [pageIntent, detectedSegment])

  // Enhanced social proof configurations for homepage
  const homepageConfigs = useMemo(() => [
    // Hero section banner for immediate trust building
    {
      position: 'hero' as const,
      variant: 'banner' as const,
      priority: 'high' as const,
      triggers: ['page_load'],
      conditions: { 
        minScreenWidth: 768,
        pageType: ['homepage']
      }
    },

    // AI-powered section for engaged users
    {
      position: 'content' as const,
      variant: 'ai-powered' as const,
      priority: 'high' as const,
      triggers: ['scroll_depth_30'],
      conditions: { 
        scrollDepth: 25,
        userSegment: ['oxbridge_prep', 'elite_corporate', 'comparison_shopper']
      }
    },

    // Full testimonials showcase for high-intent users
    {
      position: 'content' as const,
      variant: 'full' as const,
      priority: 'high' as const,
      triggers: ['scroll_depth_50'],
      conditions: { 
        scrollDepth: 45,
        timeOnPage: 15000, // 15 seconds
        minScreenWidth: 1024
      }
    },

    // Compact widget for mobile users
    {
      position: 'content' as const,
      variant: 'widget' as const,
      priority: 'medium' as const,
      triggers: ['mobile_scroll'],
      conditions: { 
        maxScreenWidth: 767,
        scrollDepth: 20
      }
    },

    // Floating proof for users who haven't engaged
    {
      position: 'floating' as const,
      variant: 'compact' as const,
      priority: 'medium' as const,
      triggers: ['low_engagement'],
      conditions: { 
        timeOnPage: 25000, // 25 seconds
        userSegment: ['general', '11_plus', 'comparison_shopper']
      }
    },

    // Footer trust indicators
    {
      position: 'footer' as const,
      variant: 'compact' as const,
      priority: 'low' as const,
      triggers: ['footer_reached'],
      conditions: { 
        scrollDepth: 80
      }
    }
  ], [])

  // Enhanced conversion tracking
  const handleConversion = (source: string, data: any) => {
    const enhancedData = {
      ...data,
      userSegment: detectedSegment,
      pageIntent,
      timestamp: Date.now(),
      source: `homepage_${source}`,
      userPreferences
    }

    // Update user preferences
    setUserPreferences(prev => ({
      ...prev,
      interaction_count: prev.interaction_count + 1
    }))

    onConversion?.(source, enhancedData)
  }

  // Enhanced analytics tracking
  const handleAnalytics = (event: string, data: any) => {
    const enhancedData = {
      ...data,
      page: 'homepage',
      userSegment: detectedSegment,
      intent: pageIntent,
      screenWidth: width,
      performanceMode,
      timestamp: Date.now()
    }

    onAnalytics?.(event, enhancedData)
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="enhanced-social-proof-homepage"
    >
      <EnhancedSocialProofIntegration
        pageContext={pageContext}
        socialProofConfigs={homepageConfigs}
        showAIEngine={showAIEngine}
        showRealTimeData={showRealTimeData}
        enableFloatingProof={!userPreferences?.dismissed_floating}
        enableModalProof={
          !userPreferences?.seen_modal && 
          detectedSegment === 'comparison_shopper' &&
          performanceMode === 'standard'
        }
        performanceMode={performanceMode}
        onConversion={handleConversion}
        onAnalytics={handleAnalytics}
        className="w-full"
      />

      {/* Hidden analytics for performance tracking */}
      {performanceMode === 'standard' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "My Private Tutor Online - Premium Tutoring Services",
              "description": "Premium one-to-one tutoring with royal endorsements. 15 years established, serving elite families across the UK.",
              "provider": {
                "@type": "Organization",
                "name": "My Private Tutor Online",
                "foundingDate": "2010",
                "description": "Boutique tutoring service with royal endorsements",
                "areaServed": "United Kingdom"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": detectedSegment,
                "geographicArea": "UK"
              }
            })
          }}
        />
      )}
    </motion.div>
  )
}

export default EnhancedSocialProofHomepage