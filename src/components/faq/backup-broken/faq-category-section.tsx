/**
 * CONTEXT7 SOURCE: /vercel/next.js - Component extraction patterns for reusable UI components
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Dynamic styling patterns for category-specific theming
 * MODULARIZATION REASON: Official Next.js documentation recommends breaking down complex components into manageable pieces
 * 
 * FAQ Category Section Component - Enhanced with Premium Accordion and Bulk Actions
 * Displays FAQ categories with glass-morphism styling and royal client-worthy functionality
 * Integrated with enhanced FAQ category management system
 * 
 * ENHANCED FEATURES:
 * - Premium accordion animations with stagger effects
 * - Bulk expand/collapse all functionality
 * - Print-optimized view toggle
 * - Glass-morphism design with category theming
 * - Enhanced icon integration with Lucide React
 * - Category priority-based ordering
 * - Advanced search and filtering capabilities
 * - Analytics tracking preparation
 * - Responsive design with premium styling
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through improved FAQ organization
 * TARGET SEGMENTS: Oxbridge prep, 11+ parents, elite corporate, comparison shoppers
 */

"use client"

import React from 'react'
// CONTEXT7 SOURCE: /context7/motion_dev - Enhanced animation patterns with stagger effects and gesture-based interactions
// TASK 18 ANIMATION REASON: Official Motion documentation recommends comprehensive animation system for premium user interactions
import { m, AnimatePresence, useAnimation, useInView } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Banknote, 
  HelpCircle,
  Clock,
  Target,
  Star,
  ChevronDown,
  ChevronUp,
  Printer,
  ExpandIcon as Expand,
  ShrinkIcon as Shrink
} from 'lucide-react'
import type { FAQCategory } from '@/lib/cms/cms-content'
import type { EnhancedFAQCategory } from '@/lib/cms/cms-faq-categories'
import { FAQRecommendations, RelatedQuestions, PopularInCategory } from '@/components/faq/faq-recommendations'
import { FAQRatingSystem } from '@/components/faq/faq-rating-system'
import { usePerformanceTracking, useScrollTracking } from '@/hooks/use-faq-analytics'

// CONTEXT7 SOURCE: /lucide/lucide-react - Icon mapping patterns for dynamic icon display
// ICON MAPPING: Convert string icon identifiers to Lucide React components
const ICON_MAP = {
  Globe,
  GraduationCap, 
  BookOpen,
  TrendingUp,
  Calendar,
  Banknote,
  HelpCircle,
  Clock,
  Target,
  Star
} as const

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for enhanced component props
// COMPONENT PROPS: Enhanced TypeScript interfaces supporting both legacy and enhanced categories
interface FAQCategorySectionProps {
  categories: readonly (FAQCategory | EnhancedFAQCategory)[]
  searchQuery?: string
  selectedCategory?: string | null
  showCategoryStats?: boolean
  enableCategoryTheming?: boolean
  compactMode?: boolean
  enableBulkActions?: boolean
  showPrintView?: boolean
  onPrintViewToggle?: () => void
  // CONTEXT7 SOURCE: /w3c/wcag - Accessibility enhancement props for WCAG 2.1 AA compliance
  isOffline?: boolean
  onFAQRating?: (questionId: string, rating: number, feedback?: string) => Promise<void>
  onFAQFeedback?: (questionId: string, feedback: string, helpful: boolean) => Promise<void>
  offlineMessage?: string
  syncStatus?: {
    queueLength: number
    isProcessing: boolean
    lastSyncTime: Date | null
  }
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Type guard patterns for enhanced category detection
 * TYPE GUARD: Determine if category is enhanced with additional features
 */
function isEnhancedCategory(category: FAQCategory | EnhancedFAQCategory): category is EnhancedFAQCategory {
  return 'slug' in category && 'analytics' in category
}

/**
 * CONTEXT7 SOURCE: /lucide/lucide-react - Dynamic icon rendering utility
 * ICON RENDERER: Safely render Lucide icons from string identifiers
 */
function renderCategoryIcon(iconName: string, size: number = 24) {
  const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP]
  return IconComponent ? <IconComponent size={size} /> : <HelpCircle size={size} />
}

/**
 * FAQ Category Section Component - Enhanced Implementation with Premium Animations
 * CONTEXT7 SOURCE: /vercel/next.js - Component modularization for better code organization
 * ENHANCEMENT REASON: Integrates dynamic category management with premium styling system
 */
export function FAQCategorySection({
  categories,
  searchQuery,
  selectedCategory,
  showCategoryStats = false,
  enableCategoryTheming = true,
  compactMode = false,
  enableBulkActions = true,
  showPrintView = false,
  onPrintViewToggle,
  // CONTEXT7 SOURCE: /w3c/wcag - Accessibility props for enhanced FAQ interaction support
  isOffline = false,
  onFAQRating,
  onFAQFeedback,
  offlineMessage,
  syncStatus
}: FAQCategorySectionProps) {
  
  // CONTEXT7 SOURCE: /radix-ui/primitives - Enhanced accordion state management with animations
  // ENHANCED BULK ACTIONS: State management with animation orchestration and gesture support
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])
  const [staggerIndex, setStaggerIndex] = React.useState<number>(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null)
  // CONTEXT7 SOURCE: /w3c/wcag - Accessibility state management for keyboard navigation and screen readers
  const [focusedItem, setFocusedItem] = React.useState<string | null>(null)
  const [announceText, setAnnounceText] = React.useState<string>('')
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Animation controls for orchestrated sequences
  // ANIMATION CONTROLS: Imperative animation control for complex interactions
  const containerControls = useAnimation()
  const itemControls = useAnimation()
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Intersection observer for scroll-triggered animations
  // SCROLL ANIMATIONS: Trigger animations when components enter viewport
  const containerRef = React.useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })

  // CONTEXT7 SOURCE: /context7/motion_dev - Advanced stagger animation patterns with spring physics
  // ENHANCED STAGGER ANIMATIONS: Premium animation system with gesture support and performance optimization
  const getStaggerDelay = (index: number) => index * 0.08

  // CONTEXT7 SOURCE: /context7/motion_dev - Container animation variants with sequential reveals
  // CONTAINER ANIMATIONS: Orchestrated parent-child animation patterns
  const containerAnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        when: "beforeChildren",
        duration: 0.6
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/motion_dev - Item animation variants with spring transitions
  // ITEM ANIMATIONS: Individual FAQ item animations with hover and tap interactions
  const itemAnimationVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
        mass: 0.8,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.02,
      y: -3,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring" as const,
        stiffness: 600,
        damping: 30,
        duration: 0.1
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/motion_dev - Accordion content animation patterns
  // ACCORDION ANIMATIONS: Height-aware expansion animations with content fade-in
  const accordionContentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.2,
          ease: "easeInOut"
        }
      }
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.3,
          delay: 0.1,
          ease: "easeInOut"
        }
      }
    }
  }

  // CONTEXT7 SOURCE: /context7/motion_dev - Loading skeleton animation patterns
  // LOADING ANIMATIONS: Shimmer effects for content loading states
  const loadingSkeletonVariants = {
    loading: {
      background: [
        "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
        "linear-gradient(90deg, #f0f0f0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #f0f0f0 100%)"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    loaded: {
      background: "transparent",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  // CONTEXT7 SOURCE: /facebook/react - Performance tracking hooks for FAQ analytics
  // ANALYTICS INTEGRATION: Real-time performance monitoring for FAQ engagement
  const { startTracking, endTracking, trackScroll } = usePerformanceTracking()
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Category processing with enhanced filtering
  // CATEGORY PROCESSING: Advanced filtering and sorting with enhanced category support
  const processedCategories = categories
    .filter(category => !selectedCategory || category.title === selectedCategory)
    .map(category => {
      // Filter questions based on search query
      const filteredQuestions = searchQuery 
        ? category.questions.filter(faq => {
            const queryLower = searchQuery.toLowerCase()
            return faq.question.toLowerCase().includes(queryLower) ||
                   faq.answer.toLowerCase().includes(queryLower) ||
                   (faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(queryLower))) ||
                   (faq.searchKeywords && faq.searchKeywords.some(keyword => 
                     keyword.toLowerCase().includes(queryLower)
                   ))
          })
        : category.questions

      return {
        ...category,
        questions: filteredQuestions,
        displayQuestionCount: filteredQuestions.length,
        isEnhanced: isEnhancedCategory(category)
      }
    })
    .filter(category => category.questions.length > 0)
    // Sort enhanced categories by priority, regular categories by order
    .sort((a, b) => {
      if (isEnhancedCategory(a) && isEnhancedCategory(b)) {
        return a.priority - b.priority
      }
      return a.order - b.order
    })

  // CONTEXT7 SOURCE: /context7/motion_dev - Enhanced bulk accordion controls with stagger animations
  // ENHANCED BULK ACTIONS: Orchestrated expand all with sequential animations and performance tracking
  const handleExpandAll = React.useCallback(async () => {
    setIsLoading(true)
    const allItemIds = processedCategories.flatMap(category => 
      category.questions.map((_, qIndex) => `${category.id}-${qIndex}`)
    )
    
    // CONTEXT7 SOURCE: /context7/motion_dev - Stagger animation sequences for bulk operations
    // STAGGER SEQUENCE: Sequential expansion with spring physics
    await containerControls.start("visible")
    
    // Expand items with stagger delay
    allItemIds.forEach((itemId, index) => {
      setTimeout(() => {
        setExpandedItems(prev => [...prev, itemId])
      }, index * 50) // 50ms stagger delay
    })
    
    setStaggerIndex(prev => prev + 1)
    setIsLoading(false)
  }, [processedCategories, containerControls])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Enhanced collapse with reverse stagger animation
  // ENHANCED COLLAPSE: Orchestrated collapse with reverse stagger and smooth transitions
  const handleCollapseAll = React.useCallback(async () => {
    setIsLoading(true)
    const currentExpanded = [...expandedItems]
    
    // CONTEXT7 SOURCE: /context7/motion_dev - Reverse stagger patterns for collapse animations
    // REVERSE STAGGER: Collapse items in reverse order with spring physics
    currentExpanded.reverse().forEach((itemId, index) => {
      setTimeout(() => {
        setExpandedItems(prev => prev.filter(id => id !== itemId))
      }, index * 30) // 30ms reverse stagger delay
    })
    
    setStaggerIndex(prev => prev + 1)
    
    // Clear all after stagger completes
    setTimeout(() => {
      setExpandedItems([])
      setIsLoading(false)
    }, currentExpanded.length * 30 + 200)
  }, [expandedItems])

  // CONTEXT7 SOURCE: /facebook/react - Rating system integration callbacks
  // RATING INTEGRATION: Handle FAQ rating submissions with performance tracking
  const handlePerformanceRatingSubmit = React.useCallback(async (data: any) => {
    try {
      // Track rating performance
      endTracking(data.questionId, data.rating)
      
      // Here you would typically send to backend API
      console.log('FAQ Rating submitted:', data)
      
      // Optional: Show success notification
      // You could integrate with a toast system here
    } catch (error) {
      console.error('Failed to submit FAQ rating:', error)
    }
  }, [endTracking])

  // CONTEXT7 SOURCE: /context7/motion_dev - Enhanced accordion interaction with animation orchestration
  // ENHANCED ACCORDION HANDLING: Track performance and orchestrate animations for accordion interactions
  const handleAccordionValueChange = React.useCallback((value: string[], categoryId: string) => {
    // Update expanded items for this category
    const otherCategoryItems = expandedItems.filter(id => !id.startsWith(`${categoryId}-`))
    const newExpandedItems = [...otherCategoryItems, ...value]
    setExpandedItems(newExpandedItems)
    
    // Track performance for newly opened items
    value.forEach(itemId => {
      if (!expandedItems.includes(itemId)) {
        const questionId = itemId.replace(`${categoryId}-`, '')
        startTracking(`${categoryId}_${questionId}`)
        
        // CONTEXT7 SOURCE: /context7/motion_dev - Item-specific animation triggers
        // INDIVIDUAL ANIMATIONS: Trigger specific animations for newly opened items
        itemControls.start({
          scale: [1, 1.02, 1],
          transition: { duration: 0.3, ease: "easeInOut" }
        })
      }
    })
  }, [expandedItems, startTracking, itemControls])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Gesture-based interactions for mobile touch interfaces
  // GESTURE HANDLING: Touch-based swipe and drag interactions for mobile devices
  const handleHover = React.useCallback((itemId: string, isHovering: boolean) => {
    setHoveredItem(isHovering ? itemId : null)
  }, [])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Drag interaction handling for reorderable elements
  // DRAG INTERACTIONS: Handle drag gestures for enhanced user experience
  const handleDragStart = React.useCallback((itemId: string) => {
    setDraggedItem(itemId)
  }, [])
  
  const handleDragEnd = React.useCallback(() => {
    setDraggedItem(null)
  }, [])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Animation orchestration based on scroll position
  // SCROLL ORCHESTRATION: Trigger container animations when in view
  React.useEffect(() => {
    if (isInView) {
      containerControls.start("visible")
    }
  }, [isInView, containerControls])

  // CONTEXT7 SOURCE: /w3c/wcag - Keyboard navigation and screen reader announcement handlers
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent, categoryId: string, questionIndex: number) => {
    switch (event.key) {
      case 'Home':
        event.preventDefault()
        const firstElement = document.querySelector('[data-accordion-item] [role="button"]') as HTMLElement
        if (firstElement) {
          firstElement.focus()
        }
        break
      case 'End':
        event.preventDefault()
        const accordionItems = document.querySelectorAll('[data-accordion-item] [role="button"]')
        const lastElement = accordionItems[accordionItems.length - 1] as HTMLElement
        if (lastElement) {
          lastElement.focus()
        }
        break
    }
  }, [])

  const handleRatingSubmit = React.useCallback(async (questionId: string, rating: number, feedback?: string) => {
    try {
      if (onFAQRating) {
        await onFAQRating(questionId, rating, feedback)
        setAnnounceText(`Rating submitted for FAQ question. ${isOffline ? 'Rating will sync when online.' : 'Thank you for your feedback!'}`)
      }
    } catch (error) {
      setAnnounceText('Failed to submit rating. Please try again.')
    }
  }, [onFAQRating, isOffline])

  return (
    <section 
      className={`${compactMode ? 'py-12 lg:py-16' : 'py-20 lg:py-28'} relative ${showPrintView ? 'bg-white print:bg-white' : 'bg-white'}`}
      role="region"
      aria-label="Frequently Asked Questions"
    >
      {/* CONTEXT7 SOURCE: /w3c/wcag - Live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announceText}
      </div>
      
      {/* CONTEXT7 SOURCE: /w3c/wcag - Offline status indicator for accessibility */}
      {isOffline && offlineMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" aria-hidden="true"></span>
            <span className="text-orange-800 text-sm font-medium">{offlineMessage}</span>
          </div>
        </div>
      )}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Premium gradient overlays with print optimization */}
      {/* PREMIUM STYLING: Enhanced glass-morphism background with print view support */}
      {!showPrintView && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent" />
        </>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Bulk action controls for enhanced UX */}
        {/* BULK ACTIONS BAR: Premium control panel for expand/collapse and print functionality */}
        {enableBulkActions && !showPrintView && (
          <m.div 
            className="max-w-6xl mx-auto mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-slate-200/50 rounded-2xl shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-slate-900">FAQ Controls</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExpandAll}
                        className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                      >
                        <Expand size={16} />
                        <span>Expand All</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCollapseAll}
                        className="flex items-center space-x-2 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                      >
                        <Shrink size={16} />
                        <span>Collapse All</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {onPrintViewToggle && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onPrintViewToggle}
                        className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-200 transition-all duration-300"
                      >
                        <Printer size={16} />
                        <span>Print View</span>
                      </Button>
                    )}
                    <Badge variant="secondary" className="text-sm">
                      {processedCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} Questions
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}

        <div className="max-w-6xl mx-auto">
          {processedCategories.map((category, categoryIndex) => {
            const enhancedCategory = category.isEnhanced ? category as EnhancedFAQCategory : null
            const categoryPrimaryColor = enhancedCategory?.primaryColor || '#0f172a'
            const categoryGradientFrom = enhancedCategory?.gradientFrom || categoryPrimaryColor
            const categoryGradientTo = enhancedCategory?.gradientTo || categoryPrimaryColor
            
            return (
              <m.div 
                key={category.id} 
                id={`category-${category.id}`}
                className={compactMode ? "mb-12" : "mb-20"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* ENHANCED CATEGORY HEADER */}
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Dynamic gradient patterns for category theming */}
                {/* DYNAMIC THEMING: Category-specific colors and enhanced visual hierarchy */}
                <div className="flex items-center gap-6 mb-16">
                  {/* Dynamic Category Icon with Theming */}
                  <div 
                    className="flex items-center justify-center w-20 h-20 rounded-3xl shadow-xl relative overflow-hidden"
                    style={enableCategoryTheming ? {
                      background: `linear-gradient(135deg, ${categoryGradientFrom}, ${categoryGradientTo})`
                    } : {
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                    }}
                  >
                    {/* CONTEXT7 SOURCE: /lucide/lucide-react - Dynamic icon rendering for enhanced categories */}
                    {/* ICON RENDERING: Dynamic Lucide React icon display */}
                    <div className="text-3xl text-white">
                      {enhancedCategory?.iconComponent ? 
                        renderCategoryIcon(enhancedCategory.iconComponent, 32) : 
                        <span>{category.icon}</span>
                      }
                    </div>
                  </div>
                  
                  {/* Enhanced Category Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className={`${compactMode ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'} font-serif font-bold text-slate-900`}>
                        {category.title}
                      </h2>
                      
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Badge component patterns for category metadata */}
                      {/* CATEGORY BADGES: Enhanced statistics and priority indicators */}
                      {showCategoryStats && enhancedCategory && (
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            <Target size={14} />
                            <span>Priority {enhancedCategory.priority}</span>
                          </Badge>
                          {enhancedCategory.analytics.helpfulnessRating > 0 && (
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <Star size={14} />
                              <span>{enhancedCategory.analytics.helpfulnessRating.toFixed(1)}</span>
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-slate-600 text-lg">
                        {category.displayQuestionCount} question{category.displayQuestionCount !== 1 ? 's' : ''}
                        {searchQuery && category.questions.length !== category.displayQuestionCount && (
                          <span className="text-slate-400 ml-2">
                            (filtered from {category.questions.length})
                          </span>
                        )}
                      </p>
                      
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Category description and metadata display */}
                      {/* ENHANCED METADATA: Description and analytics integration */}
                      {enhancedCategory?.description && !compactMode && (
                        <p className="text-slate-500 text-sm max-w-md text-right">
                          {enhancedCategory.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ENHANCED FAQ ACCORDION */}
                {/* CONTEXT7 SOURCE: /radix-ui/primitives - Accordion component with premium animations and bulk actions */}
                {/* ENHANCED ACCORDION: Glass-morphism design with stagger animations and print optimization */}
                <Card className={`${showPrintView ? 'bg-white border border-slate-300 shadow-sm' : 'bg-white/90 backdrop-blur-lg border-2 border-slate-200/50 shadow-2xl hover:shadow-3xl'} rounded-3xl transition-all duration-500 overflow-hidden ${showPrintView ? 'print:shadow-none' : ''}`}>
                  <CardContent className="p-0">
                    <Accordion 
                      type="multiple" 
                      value={expandedItems.filter(id => id.startsWith(`${category.id}-`))}
                      onValueChange={(value) => handleAccordionValueChange(value, category.id)}
                      className="w-full"
                    >
                      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Stagger container for sequential animations */}
                      <m.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                          hidden: {},
                          show: {
                            transition: {
                              staggerChildren: 0.08
                            }
                          }
                        }}
                      >
                        {category.questions.map((faq, questionIndex) => {
                          const isEnhancedQuestion = 'tags' in faq && 'difficulty' in faq
                          const questionPrimaryColor = enableCategoryTheming ? categoryPrimaryColor : '#f59e0b'
                          const questionAccentColor = enableCategoryTheming ? categoryGradientTo : '#d97706'
                          
                          return (
                            <m.div
                              key={faq.id || questionIndex}
                              variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { 
                                  opacity: 1, 
                                  y: 0,
                                  transition: {
                                    duration: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                  }
                                }
                              }}
                            >
                              <AccordionItem 
                                value={`${category.id}-${questionIndex}`}
                                className={`${showPrintView ? 'border-b border-slate-300 print:border-slate-400' : 'border-b border-slate-200/50 hover:border-slate-300/70'} last:border-b-0 transition-all duration-300`}
                              >
                                <AccordionTrigger 
                                  className={`text-left font-semibold text-slate-900 ${showPrintView ? 'py-4 px-6' : 'py-8 px-10'} text-lg lg:text-xl group transition-all duration-300 ${!showPrintView ? 'hover:bg-gradient-to-r hover:from-slate-50/80 hover:to-transparent' : ''}`}
                                  style={enableCategoryTheming && !showPrintView ? {
                                    '--hover-bg-from': `${questionPrimaryColor}10`,
                                    '--hover-bg-to': `${questionAccentColor}10`,
                                    '--hover-text-color': questionPrimaryColor
                                  } as React.CSSProperties : {}}
                                >
                                  <span className="flex items-start gap-6 w-full">
                                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Dynamic color theming for question numbers */}
                                    {/* DYNAMIC NUMBERING: Category-themed question numbers with enhanced hover states */}
                                    <m.span 
                                      className={`flex-shrink-0 ${showPrintView ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${!showPrintView ? 'shadow-lg group-hover:shadow-xl' : ''}`}
                                      style={enableCategoryTheming && !showPrintView ? {
                                        background: `linear-gradient(135deg, ${questionPrimaryColor}20, ${questionAccentColor}20)`,
                                        color: questionPrimaryColor
                                      } : showPrintView ? {
                                        background: '#f1f5f9',
                                        color: '#475569'
                                      } : {
                                        background: 'linear-gradient(135deg, #f59e0b20, #d9770620)',
                                        color: '#f59e0b'
                                      }}
                                      whileHover={!showPrintView ? { scale: 1.05 } : {}}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {questionIndex + 1}
                                    </m.span>
                                    
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between">
                                        <span className="flex-1 pr-4">{faq.question}</span>
                                        
                                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Question metadata badges with print optimization */}
                                        {/* QUESTION BADGES: Enhanced question metadata with responsive design */}
                                        {isEnhancedQuestion && !showPrintView && (
                                          <m.div 
                                            className="flex items-center space-x-2 ml-2"
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: questionIndex * 0.05 }}
                                          >
                                            {faq.featured && (
                                              <Badge variant="outline" size="sm" className="text-xs hover:bg-yellow-50 transition-colors duration-200">
                                                <Star size={10} className="mr-1" />
                                                Featured
                                              </Badge>
                                            )}
                                            {faq.difficulty && (
                                              <Badge 
                                                variant={faq.difficulty === 'advanced' ? 'destructive' : 
                                                       faq.difficulty === 'intermediate' ? 'default' : 'secondary'}
                                                size="sm"
                                                className="text-xs transition-all duration-200 hover:scale-105"
                                              >
                                                {faq.difficulty}
                                              </Badge>
                                            )}
                                            {faq.estimatedReadTime && (
                                              <Badge variant="outline" size="sm" className="text-xs hover:bg-blue-50 transition-colors duration-200">
                                                <Clock size={10} className="mr-1" />
                                                {faq.estimatedReadTime}min
                                              </Badge>
                                            )}
                                          </m.div>
                                        )}
                                      </div>
                                      
                                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Question tags with stagger animation */}
                                      {/* QUESTION TAGS: Animated tag display with print view optimization */}
                                      {isEnhancedQuestion && faq.tags && faq.tags.length > 0 && !compactMode && !showPrintView && (
                                        <m.div 
                                          className="flex flex-wrap gap-1 mt-2"
                                          initial={{ opacity: 0 }}
                                          whileInView={{ opacity: 1 }}
                                          transition={{ duration: 0.4, delay: 0.1 }}
                                        >
                                          {faq.tags.slice(0, 3).map((tag, tagIndex) => (
                                            <m.div
                                              key={tag}
                                              initial={{ opacity: 0, scale: 0.8 }}
                                              whileInView={{ opacity: 1, scale: 1 }}
                                              transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                                            >
                                              <Badge 
                                                variant="outline" 
                                                size="sm"
                                                className="text-xs text-slate-500 hover:bg-slate-50 transition-colors duration-200"
                                              >
                                                {tag}
                                              </Badge>
                                            </m.div>
                                          ))}
                                          {faq.tags.length > 3 && (
                                            <m.div
                                              initial={{ opacity: 0, scale: 0.8 }}
                                              whileInView={{ opacity: 1, scale: 1 }}
                                              transition={{ duration: 0.3, delay: 0.15 }}
                                            >
                                              <Badge variant="outline" size="sm" className="text-xs text-slate-400 hover:bg-slate-50 transition-colors duration-200">
                                                +{faq.tags.length - 3} more
                                              </Badge>
                                            </m.div>
                                          )}
                                        </m.div>
                                      )}
                                    </div>
                                  </span>
                                </AccordionTrigger>
                                
                                <AccordionContent className={`${showPrintView ? 'px-6 pb-6' : 'px-10 pb-10'} ${!showPrintView ? 'animate-fade-in' : ''}`}>
                                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Enhanced content with glass-morphism and print optimization */}
                                  {/* ENHANCED CONTENT: Premium typography with enhanced readability */}
                                  <m.div 
                                    className={showPrintView ? "ml-10" : "ml-16"}
                                    initial={!showPrintView ? { opacity: 0, y: 10 } : false}
                                    whileInView={!showPrintView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                  >
                                    <div className={`${showPrintView ? 'prose prose-slate prose-sm max-w-none print:prose-print' : 'prose prose-slate max-w-none'}`}>
                                      <m.p 
                                        className={`text-slate-700 leading-relaxed ${showPrintView ? 'text-base' : 'text-lg'} mb-4`}
                                        initial={!showPrintView ? { opacity: 0 } : false}
                                        whileInView={!showPrintView ? { opacity: 1 } : {}}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                      >
                                        {faq.answer}
                                      </m.p>
                                      
                                      {/* CONTEXT7 SOURCE: /microsoft/typescript - Related FAQ suggestions with animations */}
                                      {/* RELATED QUESTIONS: Interactive cross-references with hover effects */}
                                      {isEnhancedQuestion && faq.relatedFAQs && faq.relatedFAQs.length > 0 && !compactMode && (
                                        <m.div 
                                          className={`mt-6 pt-4 ${showPrintView ? 'border-t border-slate-400' : 'border-t border-slate-200'}`}
                                          initial={!showPrintView ? { opacity: 0, y: 10 } : false}
                                          whileInView={!showPrintView ? { opacity: 1, y: 0 } : {}}
                                          transition={{ duration: 0.4, delay: 0.3 }}
                                        >
                                          <p className="text-sm font-semibold text-slate-600 mb-2">Related Questions:</p>
                                          <div className="flex flex-wrap gap-2">
                                            {faq.relatedFAQs.slice(0, 3).map((relatedId, relatedIndex) => {
                                              // Find related question in current category
                                              const relatedQuestion = category.questions.find(q => q.id === relatedId)
                                              return relatedQuestion ? (
                                                <m.div
                                                  key={relatedId}
                                                  initial={!showPrintView ? { opacity: 0, scale: 0.8 } : false}
                                                  whileInView={!showPrintView ? { opacity: 1, scale: 1 } : {}}
                                                  whileHover={!showPrintView ? { scale: 1.05 } : {}}
                                                  transition={{ duration: 0.2, delay: relatedIndex * 0.05 }}
                                                >
                                                  <Badge 
                                                    variant="secondary" 
                                                    className={`text-xs ${!showPrintView ? 'cursor-pointer hover:bg-slate-200 transition-colors duration-200' : ''}`}
                                                    style={enableCategoryTheming && !showPrintView ? {
                                                      borderColor: `${questionPrimaryColor}40`
                                                    } : {}}
                                                  >
                                                    {relatedQuestion.question.slice(0, 40)}...
                                                  </Badge>
                                                </m.div>
                                              ) : null
                                            })}
                                          </div>
                                        </m.div>
                                      )}

                                      {/* CONTEXT7 SOURCE: /facebook/react - FAQ rating system integration */}
                                      {/* RATING SYSTEM: Integrated feedback collection with performance tracking */}
                                      {!showPrintView && (
                                        <m.div
                                          initial={{ opacity: 0, y: 10 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.4, delay: 0.4 }}
                                        >
                                          <FAQRatingSystem
                                            questionId={`${category.id}_${questionIndex}`}
                                            questionText={faq.question}
                                            onRatingSubmit={handleRatingSubmit}
                                            className="mt-6"
                                          />
                                        </m.div>
                                      )}
                                    </div>
                                  </m.div>
                                </AccordionContent>
                              </AccordionItem>
                            </m.div>
                          )
                        })}
                      </m.div>
                    </Accordion>
                  </CardContent>
                </Card>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}