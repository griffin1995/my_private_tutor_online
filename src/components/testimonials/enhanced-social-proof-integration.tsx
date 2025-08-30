'use client'

// CONTEXT7 SOURCE: /context7/motion_dev - Cross-platform social proof integration with advanced animations
// IMPLEMENTATION REASON: Official Motion patterns for seamless social proof deployment across all conversion points
// CONTEXT7 SOURCE: /streamich/react-use - Performance optimization hooks for cross-platform social proof
// INTEGRATION REASON: Official react-use patterns for efficient social proof rendering and state management

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useIntersection, useWindowSize, useMediaQuery } from 'react-use'
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Star, 
  Shield,
  Award,
  Eye,
  MessageSquare,
  BookOpen,
  Target,
  Zap,
  ChevronRight,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import RealTimeSocialProof from './real-time-social-proof'
import AISocialProofEngine from './ai-social-proof-engine'
import { TestimonialsSocialWidget } from './testimonials-social-widget'

// CONTEXT7 SOURCE: /context7/motion_dev - Advanced layout animations for responsive social proof
// RESPONSIVE REASON: Official Motion layout animations for seamless responsive transitions
const layoutVariants = {
  desktop: {
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  mobile: {
    scale: 0.95,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  tablet: {
    scale: 0.98,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Entrance animations for social proof elements
const entranceVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      duration: 0.8
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(5px)',
    transition: {
      duration: 0.4
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Floating social proof animations
const floatingVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
}

interface SocialProofConfig {
  position: 'header' | 'hero' | 'content' | 'sidebar' | 'footer' | 'floating' | 'modal'
  variant: 'compact' | 'full' | 'banner' | 'widget' | 'ai-powered'
  priority: 'high' | 'medium' | 'low'
  triggers: string[]
  conditions: {
    minScreenWidth?: number
    maxScreenWidth?: number
    userSegment?: string[]
    pageType?: string[]
    scrollDepth?: number
    timeOnPage?: number
  }
}

interface PageContext {
  page: string
  section: string
  intent: 'browsing' | 'comparison' | 'booking' | 'information'
  userSegment: 'oxbridge_prep' | '11_plus' | 'elite_corporate' | 'comparison_shopper' | 'general'
}

interface EnhancedSocialProofIntegrationProps {
  pageContext: PageContext
  socialProofConfigs: SocialProofConfig[]
  showAIEngine?: boolean
  showRealTimeData?: boolean
  enableFloatingProof?: boolean
  enableModalProof?: boolean
  performanceMode?: 'standard' | 'optimized' | 'minimal'
  onConversion?: (source: string, data: any) => void
  onAnalytics?: (event: string, data: any) => void
  className?: string
}

/**
 * Enhanced Social Proof Integration System
 * 
 * CONTEXT7 SOURCE: /context7/motion_dev - Comprehensive social proof orchestration
 * FEATURES: Cross-platform deployment, AI-powered optimization, real-time updates
 * PERFORMANCE: Intelligent loading, responsive design, accessibility compliant
 * INTEGRATION: Seamless integration with existing testimonials infrastructure
 */
export const EnhancedSocialProofIntegration: React.FC<EnhancedSocialProofIntegrationProps> = ({
  pageContext,
  socialProofConfigs,
  showAIEngine = true,
  showRealTimeData = true,
  enableFloatingProof = true,
  enableModalProof = false,
  performanceMode = 'standard',
  onConversion,
  onAnalytics,
  className = ''
}) => {
  // CONTEXT7 SOURCE: /streamich/react-use - Responsive design hooks
  const { width, height } = useWindowSize()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px) and (min-width: 769px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  
  // Component state
  const [activeProofElements, setActiveProofElements] = useState<string[]>([])
  const [userBehavior, setUserBehavior] = useState({
    scrollDepth: 0,
    timeOnPage: 0,
    interactions: 0,
    focusTime: 0
  })
  const [modalProofVisible, setModalProofVisible] = useState(false)
  const [floatingProofDismissed, setFloatingProofDismissed] = useState(false)
  const [conversionEvents, setConversionEvents] = useState<any[]>([])

  // CONTEXT7 SOURCE: /streamich/react-use - Intersection observer for performance
  const intersectionRef = React.useRef<HTMLDivElement>(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  })

  // Track user behavior
  useEffect(() => {
    const startTime = Date.now()
    let interactions = 0
    let focusStart = Date.now()

    const updateBehavior = () => {
      setUserBehavior(prev => ({
        ...prev,
        timeOnPage: Date.now() - startTime,
        interactions,
        scrollDepth: Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      }))
    }

    const trackInteraction = () => {
      interactions++
      updateBehavior()
    }

    const trackFocus = () => {
      focusStart = Date.now()
    }

    const trackBlur = () => {
      const focusTime = Date.now() - focusStart
      setUserBehavior(prev => ({
        ...prev,
        focusTime: prev.focusTime + focusTime
      }))
    }

    // Event listeners
    window.addEventListener('scroll', updateBehavior, { passive: true })
    window.addEventListener('click', trackInteraction)
    window.addEventListener('focus', trackFocus)
    window.addEventListener('blur', trackBlur)

    const interval = setInterval(updateBehavior, 1000)

    return () => {
      window.removeEventListener('scroll', updateBehavior)
      window.removeEventListener('click', trackInteraction)
      window.removeEventListener('focus', trackFocus)
      window.removeEventListener('blur', trackBlur)
      clearInterval(interval)
    }
  }, [])

  // Filter active social proof configurations
  const activeConfigs = useMemo(() => {
    return socialProofConfigs.filter(config => {
      const { conditions } = config
      
      // Screen width conditions
      if (conditions.minScreenWidth && width < conditions.minScreenWidth) return false
      if (conditions.maxScreenWidth && width > conditions.maxScreenWidth) return false
      
      // User segment conditions
      if (conditions.userSegment && !conditions.userSegment.includes(pageContext.userSegment)) {
        return false
      }
      
      // Page type conditions
      if (conditions.pageType && !conditions.pageType.includes(pageContext.page)) {
        return false
      }
      
      // Behavioral conditions
      if (conditions.scrollDepth && userBehavior.scrollDepth < conditions.scrollDepth) {
        return false
      }
      if (conditions.timeOnPage && userBehavior.timeOnPage < conditions.timeOnPage) {
        return false
      }
      
      return true
    }).sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }, [socialProofConfigs, width, pageContext, userBehavior])

  // Handle conversion events
  const handleConversion = useCallback((source: string, data: any) => {
    const event = {
      id: `conversion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      source,
      data,
      timestamp: Date.now(),
      pageContext,
      userBehavior: { ...userBehavior }
    }
    
    setConversionEvents(prev => [event, ...prev].slice(0, 10))
    onConversion?.(source, data)
    onAnalytics?.('social_proof_conversion', event)
  }, [pageContext, userBehavior, onConversion, onAnalytics])

  // Handle testimonial highlights from AI
  const handleTestimonialHighlight = useCallback((testimonial: any, reason: string) => {
    onAnalytics?.('ai_testimonial_highlight', {
      testimonialId: testimonial.id,
      reason,
      pageContext,
      userBehavior
    })
  }, [pageContext, userBehavior, onAnalytics])

  // Modal trigger logic
  useEffect(() => {
    if (!enableModalProof || modalProofVisible) return

    const shouldShowModal = 
      userBehavior.scrollDepth > 40 && 
      userBehavior.timeOnPage > 15000 && 
      userBehavior.interactions < 2 &&
      pageContext.intent === 'comparison'

    if (shouldShowModal) {
      setModalProofVisible(true)
      onAnalytics?.('modal_social_proof_shown', { userBehavior, pageContext })
    }
  }, [userBehavior, pageContext, enableModalProof, modalProofVisible, onAnalytics])

  // Device-specific layout
  const deviceLayout = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'

  // Render social proof component based on config
  const renderSocialProofComponent = useCallback((config: SocialProofConfig) => {
    const commonProps = {
      onAnalytics: (event: string, data: any) => 
        onAnalytics?.(`${config.position}_${event}`, { ...data, config }),
      className: `social-proof-${config.position} ${config.variant}`
    }

    switch (config.variant) {
      case 'compact':
        return (
          <RealTimeSocialProof
            {...commonProps}
            variant="compact"
            showLiveCounters={performanceMode !== 'minimal'}
            showRecentActivity={false}
            showTrustBadges={true}
            updateInterval={performanceMode === 'optimized' ? 5000 : 3000}
          />
        )

      case 'banner':
        return (
          <RealTimeSocialProof
            {...commonProps}
            variant="banner"
            showLiveCounters={true}
            showRecentActivity={false}
            showTrustBadges={true}
          />
        )

      case 'full':
        return (
          <RealTimeSocialProof
            {...commonProps}
            variant="full"
            showLiveCounters={showRealTimeData}
            showRecentActivity={showRealTimeData}
            showTrustBadges={true}
            showAIHighlights={showAIEngine}
          />
        )

      case 'ai-powered':
        return showAIEngine ? (
          <AISocialProofEngine
            {...commonProps}
            pageContext={pageContext}
            onTestimonialHighlight={handleTestimonialHighlight}
            onInsightGenerated={(insight) => 
              onAnalytics?.('ai_insight_generated', { insight, pageContext })
            }
            showInsights={performanceMode !== 'minimal'}
            showProcessing={performanceMode === 'standard'}
            adaptiveMode={true}
          />
        ) : null

      case 'widget':
        return (
          <TestimonialsSocialWidget
            {...commonProps}
            config={{
              format: isMobile ? 'compact' : 'card',
              theme: 'premium',
              maxTestimonials: isMobile ? 1 : 3,
              showRatings: true,
              showAvatars: !isMobile,
              showLocation: !isMobile,
              autoRotate: true,
              rotationInterval: 8000,
              showCTA: true,
              ctaText: pageContext.intent === 'booking' ? 'Book Now' : 'Learn More',
              filters: {
                category: [pageContext.userSegment],
                featured: true,
                minRating: 4.5
              }
            }}
          />
        )

      default:
        return null
    }
  }, [
    performanceMode,
    showRealTimeData,
    showAIEngine,
    isMobile,
    pageContext,
    handleTestimonialHighlight,
    onAnalytics
  ])

  return (
    <div ref={intersectionRef} className={`enhanced-social-proof-integration ${className}`}>
      {/* Main Social Proof Elements */}
      <AnimatePresence>
        {activeConfigs.map((config) => {
          const isVisible = intersection?.isIntersecting || config.position === 'floating'
          
          if (!isVisible && performanceMode === 'optimized') return null

          return (
            <motion.div
              key={`${config.position}_${config.variant}`}
              variants={config.position === 'floating' ? floatingVariants : entranceVariants}
              initial="hidden"
              animate={config.position === 'floating' ? ['visible', 'float'] : 'visible'}
              exit="exit"
              whileHover={config.position === 'floating' ? 'hover' : undefined}
              className={`social-proof-element ${config.position}`}
              style={{
                position: config.position === 'floating' ? 'fixed' : 'relative',
                bottom: config.position === 'floating' ? '2rem' : 'auto',
                right: config.position === 'floating' ? '2rem' : 'auto',
                zIndex: config.position === 'floating' ? 50 : 'auto',
                display: config.position === 'floating' && floatingProofDismissed ? 'none' : 'block'
              }}
            >
              {config.position === 'floating' && enableFloatingProof && (
                <div className="relative">
                  <button
                    onClick={() => setFloatingProofDismissed(true)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center z-10 hover:bg-gray-700 transition-colors"
                    aria-label="Dismiss social proof"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <RealTimeSocialProof
                    variant="floating"
                    showLiveCounters={true}
                    showRecentActivity={true}
                    showTrustBadges={false}
                    maxActivities={3}
                    onAnalytics={(event, data) => 
                      onAnalytics?.(`floating_${event}`, { ...data, config })
                    }
                  />
                </div>
              )}
              
              {config.position !== 'floating' && renderSocialProofComponent(config)}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Modal Social Proof */}
      <AnimatePresence>
        {enableModalProof && modalProofVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setModalProofVisible(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 xl:inset-32 bg-white rounded-2xl shadow-2xl z-50 overflow-auto"
            >
              <div className="p-6 relative">
                <button
                  onClick={() => setModalProofVisible(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                      <Sparkles className="w-4 h-4" />
                      Exclusive for You
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      See Why Families Choose Us
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Join thousands of families who have achieved academic excellence with our premium tutoring services.
                    </p>
                  </div>
                  
                  <div className="grid gap-8">
                    {showAIEngine && (
                      <AISocialProofEngine
                        pageContext={pageContext}
                        onTestimonialHighlight={handleTestimonialHighlight}
                        showInsights={true}
                        showProcessing={false}
                        adaptiveMode={true}
                        className="mb-6"
                      />
                    )}
                    
                    <RealTimeSocialProof
                      variant="full"
                      showLiveCounters={true}
                      showRecentActivity={true}
                      showTrustBadges={true}
                      showAIHighlights={true}
                    />
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button 
                      size="lg"
                      onClick={() => {
                        handleConversion('modal_social_proof', {
                          action: 'book_consultation',
                          modalType: 'social_proof_modal'
                        })
                        setModalProofVisible(false)
                      }}
                      className="px-8 py-3"
                    >
                      Book Free Consultation
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      No commitment required • Expert guidance guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Performance Analytics */}
      {performanceMode === 'standard' && (
        <div className="hidden">
          <div data-analytics="social-proof-performance">
            {JSON.stringify({
              activeElements: activeConfigs.length,
              deviceLayout,
              userBehavior,
              conversions: conversionEvents.length,
              performanceMode
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Pre-configured social proof setups for different pages
export const SocialProofConfigs = {
  homepage: [
    {
      position: 'hero' as const,
      variant: 'banner' as const,
      priority: 'high' as const,
      triggers: ['page_load'],
      conditions: { minScreenWidth: 768 }
    },
    {
      position: 'content' as const,
      variant: 'ai-powered' as const,
      priority: 'high' as const,
      triggers: ['scroll_depth_50'],
      conditions: { scrollDepth: 30 }
    },
    {
      position: 'floating' as const,
      variant: 'compact' as const,
      priority: 'medium' as const,
      triggers: ['time_on_page_20s'],
      conditions: { timeOnPage: 20000 }
    }
  ],
  testimonials: [
    {
      position: 'header' as const,
      variant: 'full' as const,
      priority: 'high' as const,
      triggers: ['page_load'],
      conditions: {}
    },
    {
      position: 'sidebar' as const,
      variant: 'ai-powered' as const,
      priority: 'high' as const,
      triggers: ['page_load'],
      conditions: { minScreenWidth: 1024 }
    }
  ],
  booking: [
    {
      position: 'header' as const,
      variant: 'compact' as const,
      priority: 'high' as const,
      triggers: ['page_load'],
      conditions: {}
    }
  ]
}

export default EnhancedSocialProofIntegration