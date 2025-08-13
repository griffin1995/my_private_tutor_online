/**
 * MOBILE-OPTIMIZED TIMELINE COMPONENT
 * CONTEXT7 SOURCE: /context7/motion_dev - Touch-optimized animations and responsive design patterns
 * CONTEXT7 SOURCE: /microsoft/typescript - Mobile-first responsive component architecture
 * 
 * TASK 10: Interactive Testimonials Timeline - Mobile-Responsive Implementation
 * This component provides a mobile-first timeline experience with touch interactions,
 * swipe gestures, and optimized layout for smaller screens while maintaining accessibility.
 * 
 * BUSINESS IMPACT: £50,000+ revenue through enhanced mobile testimonials experience
 * ROYAL CLIENT STANDARDS: Premium mobile UX matching desktop quality standards
 */

'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import type { 
  ClientJourneyTimeline,
  TimelineStage,
  TestimonialsTimelineProps,
  TimelineCategory 
} from '@/types/testimonials-timeline'
import { 
  getClientJourneyTimelines,
  getFeaturedTimelines,
  getTimelinesByCategory 
} from '@/lib/cms/testimonials-timeline-data'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

// CONTEXT7 SOURCE: /lucide/lucide-react - Mobile-optimized icon set
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Filter,
  X
} from 'lucide-react'

// CONTEXT7 SOURCE: /context7/motion_dev - Mobile-specific animation variants with touch optimization
const mobileTimelineVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

const swipeVariants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1
  },
  left: {
    x: -100,
    scale: 0.8,
    opacity: 0.5
  },
  right: {
    x: 100,
    scale: 0.8,
    opacity: 0.5
  }
}

interface MobileTimelineCardProps {
  timeline: ClientJourneyTimeline
  isActive: boolean
  onSelect: (timeline: ClientJourneyTimeline) => void
}

/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Mobile timeline card with swipe gestures
 * Individual timeline card optimized for mobile viewing with touch interactions
 */
const MobileTimelineCard: React.FC<MobileTimelineCardProps> = ({
  timeline,
  isActive,
  onSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-100, 0, 100], [-10, 0, 10])

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 50
    if (Math.abs(info.offset.x) > threshold) {
      // Handle swipe action if needed
      x.set(0) // Reset position
    }
  }, [x])

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <motion.div
      className={`
        bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden
        ${isActive ? 'ring-2 ring-blue-500' : ''}
      `}
      variants={mobileTimelineVariants}
      initial="hidden"
      animate="visible"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 truncate">
              {timeline.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {timeline.subtitle}
            </p>
          </div>
          <div className="ml-3 flex-shrink-0">
            <div className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${timeline.category === 'oxbridge' ? 'bg-purple-100 text-purple-800' :
                timeline.category === '11+' ? 'bg-blue-100 text-blue-800' :
                timeline.category === 'gcse' ? 'bg-green-100 text-green-800' :
                'bg-slate-100 text-slate-800'}
            `}>
              {timeline.category.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{timeline.totalDurationMonths} months</span>
          </div>
          {timeline.gradeImprovement && (
            <div className="flex items-center gap-1">
              <TrendingUp size={12} />
              <span>{timeline.gradeImprovement}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
          {timeline.description}
        </p>

        {/* Result Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-800 rounded-lg text-sm mb-4">
          <Trophy size={14} />
          <span className="font-medium">{timeline.overallResult}</span>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={toggleExpanded}
          className="flex items-center gap-2 w-full p-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <span>
            {isExpanded ? 'Hide Details' : 'View Journey Details'}
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-slate-100"
          >
            <div className="p-4">
              {/* Client Profile */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">Client Profile</h4>
                <div className="bg-slate-50 p-3 rounded-lg space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Student:</span>{' '}
                    <span className="text-slate-600">{timeline.clientProfile.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Subjects:</span>{' '}
                    <span className="text-slate-600">
                      {timeline.clientProfile.subjects.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Location:</span>{' '}
                    <span className="text-slate-600">{timeline.clientProfile.location}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Stages Preview */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-3">Journey Stages</h4>
                <div className="space-y-3">
                  {timeline.stages.slice(0, 3).map((stage, index) => (
                    <div key={stage.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-sm font-medium text-slate-900 mb-1">
                          {stage.title}
                        </h5>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {stage.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                          <Clock size={10} />
                          <span>{stage.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {timeline.stages.length > 3 && (
                    <div className="text-xs text-slate-500 text-center pt-2">
                      +{timeline.stages.length - 3} more stages
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSelect(timeline)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                View Complete Journey
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Mobile category filter component
 * Horizontal scrolling category filters optimized for mobile touch interaction
 */
interface MobileCategoryFiltersProps {
  categories: readonly TimelineCategory[]
  activeCategory: TimelineCategory | 'all'
  onCategoryChange: (category: TimelineCategory | 'all') => void
}

const MobileCategoryFilters: React.FC<MobileCategoryFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const categoryLabels = {
    '11+': '11+ Prep',
    'gcse': 'GCSE',
    'a-level': 'A-Level',
    'oxbridge': 'Oxbridge',
    'ib': 'IB',
    'international': 'International',
    'adult-learning': 'Adult Learning'
  } as const

  return (
    <div className="pb-4 mb-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
        <motion.button
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${activeCategory === 'all' 
              ? 'bg-slate-900 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }
          `}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange('all')}
        >
          All
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === category 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }
            `}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
          >
            {categoryLabels[category]}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Main mobile-optimized timeline component
 * Mobile-first timeline implementation with touch gestures and responsive design
 */
export const TimelineMobileOptimized: React.FC<TestimonialsTimelineProps> = ({
  timelines: propTimelines,
  className = '',
  featured = false,
  category,
  limit,
  showFilters = true,
  onStageSelect,
  onTimelineComplete
}) => {
  const [activeCategory, setActiveCategory] = useState<TimelineCategory | 'all'>(category || 'all')
  const [selectedTimeline, setSelectedTimeline] = useState<ClientJourneyTimeline | null>(null)

  // Data loading and filtering
  const allTimelines = useMemo(() => {
    if (propTimelines) return propTimelines
    if (featured) return getFeaturedTimelines()
    if (category) return getTimelinesByCategory(category)
    return getClientJourneyTimelines()
  }, [propTimelines, featured, category])

  const filteredTimelines = useMemo(() => {
    let filtered = allTimelines
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(t => t.category === activeCategory)
    }
    
    if (limit) {
      filtered = filtered.slice(0, limit)
    }
    
    return filtered
  }, [allTimelines, activeCategory, limit])

  const availableCategories = useMemo(() => {
    return Array.from(new Set(allTimelines.map(t => t.category)))
  }, [allTimelines])

  const handleCategoryChange = useCallback((newCategory: TimelineCategory | 'all') => {
    setActiveCategory(newCategory)
  }, [])

  const handleTimelineSelect = useCallback((timeline: ClientJourneyTimeline) => {
    setSelectedTimeline(timeline)
    onTimelineComplete?.(timeline)
  }, [onTimelineComplete])

  const handleCloseDetail = useCallback(() => {
    setSelectedTimeline(null)
  }, [])

  return (
    <div className={`min-h-screen bg-slate-50 ${className}`}>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="p-4">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Client Journeys
          </h2>
          <p className="text-sm text-slate-600">
            Discover transformation stories from our students
          </p>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <MobileCategoryFilters
            categories={availableCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
      </div>

      {/* Timeline Cards */}
      <div className="p-4 space-y-4">
        <AnimatePresence mode="wait">
          {filteredTimelines.map((timeline) => (
            <MobileTimelineCard
              key={timeline.id}
              timeline={timeline}
              isActive={selectedTimeline?.id === timeline.id}
              onSelect={handleTimelineSelect}
            />
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredTimelines.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-slate-400 mb-4">
              <Star size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No journeys found
            </h3>
            <p className="text-slate-500 text-sm">
              Try selecting a different category to see more stories.
            </p>
          </motion.div>
        )}
      </div>

      {/* Detailed Timeline Modal/Overlay */}
      <AnimatePresence>
        {selectedTimeline && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetail}
          >
            <motion.div
              className="bg-white w-full h-[90vh] rounded-t-xl overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 truncate">
                    {selectedTimeline.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Complete Journey Details
                  </p>
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Timeline Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Journey Overview</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    {selectedTimeline.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Duration:</span>
                      <div className="text-slate-600">{selectedTimeline.totalDurationMonths} months</div>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Result:</span>
                      <div className="text-slate-600">{selectedTimeline.overallResult}</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Stages */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-slate-900">Journey Stages</h4>
                  {selectedTimeline.stages.map((stage, index) => (
                    <div key={stage.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-slate-900 mb-1">
                            {stage.title}
                          </h5>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                            <span>{stage.duration}</span>
                            <span>•</span>
                            <span>{stage.timeframe}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-4">
                        {stage.description}
                      </p>

                      {stage.milestone && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs mb-3">
                          <Award size={12} />
                          {stage.milestone}
                        </div>
                      )}

                      {/* Progress Indicators */}
                      {stage.progressIndicators && stage.progressIndicators.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 mt-4">
                          {stage.progressIndicators.map((indicator, idx) => (
                            <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-slate-700">
                                  {indicator.label}
                                </span>
                                <span className="text-xs font-semibold text-green-600">
                                  {indicator.improvement}
                                </span>
                              </div>
                              <div className="text-xs text-slate-600">
                                {indicator.beforeValue} → {indicator.afterValue}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TimelineMobileOptimized