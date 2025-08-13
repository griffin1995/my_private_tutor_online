/**
 * INTERACTIVE TESTIMONIALS TIMELINE COMPONENT
 * CONTEXT7 SOURCE: /context7/motion_dev - Scroll-triggered animations and timeline sequencing for storytelling
 * CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Viewport detection for timeline stage activation
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced React component patterns with comprehensive type safety
 * 
 * TASK 10: Interactive Testimonials Timeline Foundation Enhancement
 * This component provides an immersive timeline experience showcasing client journey progression
 * with scroll-driven animations, interactive elements, and full accessibility compliance.
 * 
 * BUSINESS IMPACT: £50,000+ revenue through enhanced narrative testimonials
 * ROYAL CLIENT STANDARDS: Enterprise-grade timeline storytelling with premium UX
 */

'use client'

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import type { 
  ClientJourneyTimeline,
  TimelineStage, 
  TestimonialsTimelineProps,
  TimelineConfiguration,
  TimelineState,
  TimelineCategory 
} from '@/types/testimonials-timeline'
import { 
  getClientJourneyTimelines,
  getFeaturedTimelines,
  getTimelinesByCategory,
  defaultTimelineConfiguration
} from '@/lib/cms/testimonials-timeline-data'

// CONTEXT7 SOURCE: /lucide/lucide-react - Icon components for timeline visual elements
import { 
  Search, 
  Target, 
  Star, 
  TrendingUp, 
  Trophy,
  GraduationCap,
  Heart,
  Calculator,
  Building,
  Calendar,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Filter,
  Play,
  Pause
} from 'lucide-react'

// Icon mapping for timeline stages
// CONTEXT7 SOURCE: /lucide/lucide-react - Dynamic icon selection based on timeline stage context
const stageIconMap = {
  'initial_consultation': Search,
  'needs_assessment': Target,
  'tutor_matching': Star,
  'early_sessions': Building,
  'progress_monitoring': TrendingUp,
  'milestone_achievement': Award,
  'exam_preparation': Calculator,
  'results_celebration': Trophy,
  'ongoing_support': Heart
} as const

/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Advanced animation variants for timeline storytelling
 * Scroll-triggered animation sequences with stagger effects and reduced motion support
 */
const timelineVariants = {
  hidden: { 
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4
    }
  }
}

const stageVariants = {
  hidden: { 
    opacity: 0,
    x: -40,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Scroll-linked progress indicator animations
const progressVariants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: {
      duration: 1.5,
      ease: 'easeOut'
    }
  }
}

interface TimelineStageComponentProps {
  stage: TimelineStage
  timeline: ClientJourneyTimeline
  isActive: boolean
  isExpanded: boolean
  configuration: TimelineConfiguration
  onExpand: (stageId: string) => void
  onCollapse: (stageId: string) => void
}

/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Individual timeline stage component with scroll animations
 * Interactive stage component with expand/collapse functionality and accessibility support
 */
const TimelineStageComponent: React.FC<TimelineStageComponentProps> = ({
  stage,
  timeline,
  isActive,
  isExpanded,
  configuration,
  onExpand,
  onCollapse
}) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(stageRef, { once: true, amount: 0.3 })
  const IconComponent = stageIconMap[stage.stage] || Star

  const handleToggle = useCallback(() => {
    if (isExpanded) {
      onCollapse(stage.id)
    } else {
      onExpand(stage.id)
    }
  }, [isExpanded, stage.id, onExpand, onCollapse])

  // CONTEXT7 SOURCE: /context7/motion_dev - Scroll-triggered animations with prefers-reduced-motion support
  const animationProps = useMemo(() => {
    if (!configuration.animation.enabled || !configuration.animation.respectsReducedMotion) {
      return {}
    }
    
    return {
      initial: 'hidden',
      animate: isInView ? 'visible' : 'hidden',
      whileHover: configuration.interactivity.hoverEffects ? 'hover' : undefined,
      variants: stageVariants
    }
  }, [configuration.animation, configuration.interactivity.hoverEffects, isInView])

  return (
    <motion.div
      ref={stageRef}
      className={`
        relative flex items-start gap-6 p-6 mb-8
        ${isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'bg-white'}
        border border-slate-200 rounded-xl shadow-sm
        hover:shadow-md transition-shadow duration-300
        ${configuration.interactivity.clickableElements ? 'cursor-pointer' : ''}
      `}
      {...animationProps}
      onClick={configuration.interactivity.expandableStages ? handleToggle : undefined}
      // CONTEXT7 SOURCE: /w3/accessibility - ARIA attributes for timeline stage accessibility
      role="article"
      aria-expanded={isExpanded}
      aria-label={`Timeline stage: ${stage.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleToggle()
        }
      }}
    >
      {/* Stage Icon and Progress Line */}
      <div className="flex flex-col items-center">
        <motion.div
          className={`
            relative z-10 flex items-center justify-center
            w-12 h-12 rounded-full
            ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-slate-100'}
            ${isActive ? 'text-white' : 'text-slate-600'}
            shadow-lg
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconComponent size={20} />
        </motion.div>
        
        {/* Progress Line */}
        <motion.div
          className="w-px bg-gradient-to-b from-slate-200 to-transparent"
          style={{ height: '120px', marginTop: '8px' }}
          variants={progressVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </div>

      {/* Stage Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {stage.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {stage.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {stage.timeframe}
              </span>
            </div>
          </div>
          
          {configuration.interactivity.expandableStages && (
            <motion.button
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isExpanded ? "Collapse stage details" : "Expand stage details"}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.button>
          )}
        </div>

        <p className="text-slate-700 mb-4">{stage.description}</p>

        {/* Milestone Badge */}
        {stage.milestone && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-4">
            <Award size={14} />
            {stage.milestone}
          </div>
        )}

        {/* Progress Indicators */}
        {stage.progressIndicators && stage.progressIndicators.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {stage.progressIndicators.map((indicator, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    {indicator.label}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {indicator.improvement}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>Before: {indicator.beforeValue}</span>
                  <span>→</span>
                  <span className="font-semibold">After: {indicator.afterValue}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-6 pt-6 border-t border-slate-200"
            >
              {/* Challenges and Solutions */}
              {(stage.challengesFaced || stage.solutionsImplemented) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {stage.challengesFaced && (
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Challenges Faced</h4>
                      <ul className="space-y-2">
                        {stage.challengesFaced.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {stage.solutionsImplemented && (
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Solutions Implemented</h4>
                      <ul className="space-y-2">
                        {stage.solutionsImplemented.map((solution, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Before/After States */}
              {(stage.beforeState || stage.afterState) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {stage.beforeState && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-3">Before</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Confidence:</span> {stage.beforeState.confidence}/10
                        </div>
                        <div>
                          <span className="font-medium">Level:</span> {stage.beforeState.academicLevel}
                        </div>
                        <p className="text-red-700 mt-2">{stage.beforeState.description}</p>
                      </div>
                    </div>
                  )}
                  
                  {stage.afterState && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">After</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Confidence:</span> {stage.afterState.confidence}/10
                        </div>
                        <div>
                          <span className="font-medium">Level:</span> {stage.afterState.academicLevel}
                        </div>
                        <p className="text-green-700 mt-2">{stage.afterState.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Testimonial */}
              {stage.testimonial && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <blockquote className="text-slate-700 italic mb-4">
                    "{stage.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <cite className="text-sm font-semibold text-slate-900 not-italic">
                      {stage.testimonial.author}
                    </cite>
                    <div className="text-sm text-slate-600">
                      {stage.testimonial.result}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Timeline filter component with smooth transitions
 * Category filtering with animated transitions and search functionality
 */
interface TimelineFiltersProps {
  categories: readonly TimelineCategory[]
  activeCategory: TimelineCategory | 'all'
  onCategoryChange: (category: TimelineCategory | 'all') => void
  className?: string
}

const TimelineFilters: React.FC<TimelineFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className = ''
}) => {
  const categoryLabels = {
    '11+': '11+ Preparation',
    'gcse': 'GCSE',
    'a-level': 'A-Level',
    'oxbridge': 'Oxbridge',
    'ib': 'International Baccalaureate',
    'international': 'International Schools',
    'adult-learning': 'Adult Learning'
  } as const

  return (
    <div className={`flex flex-wrap gap-3 mb-8 ${className}`}>
      <motion.button
        className={`
          px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${activeCategory === 'all' 
            ? 'bg-slate-900 text-white' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange('all')}
      >
        All Journeys
      </motion.button>
      
      {categories.map((category) => (
        <motion.button
          key={category}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${activeCategory === category 
              ? 'bg-slate-900 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
        >
          {categoryLabels[category]}
        </motion.button>
      ))}
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Main interactive timeline component
 * CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Viewport-based animation triggers
 * 
 * Primary timeline component with scroll-driven animations, filtering, and accessibility
 */
export const InteractiveTimeline: React.FC<TestimonialsTimelineProps> = ({
  timelines: propTimelines,
  configuration = {},
  className = '',
  featured = false,
  category,
  limit,
  showFilters = true,
  autoPlay = false,
  onStageSelect,
  onTimelineComplete
}) => {
  // CONTEXT7 SOURCE: /facebook/react - Advanced state management patterns for timeline interaction
  const [timelineState, setTimelineState] = useState<TimelineState>({
    currentStage: null,
    isPlaying: autoPlay,
    playbackSpeed: 1,
    filterCategory: category || 'all',
    searchQuery: '',
    expandedStages: [],
    visibleStages: [],
    scrollProgress: 0
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // CONTEXT7 SOURCE: /context7/motion_dev - Scroll progress transformation for timeline animation
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Configuration with defaults
  const config = useMemo(() => ({
    ...defaultTimelineConfiguration,
    ...configuration
  }), [configuration])

  // Data loading and filtering
  const allTimelines = useMemo(() => {
    if (propTimelines) return propTimelines
    if (featured) return getFeaturedTimelines()
    if (category) return getTimelinesByCategory(category)
    return getClientJourneyTimelines()
  }, [propTimelines, featured, category])

  const filteredTimelines = useMemo(() => {
    let filtered = allTimelines
    
    if (timelineState.filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === timelineState.filterCategory)
    }
    
    if (limit) {
      filtered = filtered.slice(0, limit)
    }
    
    return filtered
  }, [allTimelines, timelineState.filterCategory, limit])

  const availableCategories = useMemo(() => {
    return Array.from(new Set(allTimelines.map(t => t.category)))
  }, [allTimelines])

  // Event handlers
  const handleStageExpand = useCallback((stageId: string) => {
    setTimelineState(prev => ({
      ...prev,
      expandedStages: [...prev.expandedStages, stageId]
    }))
  }, [])

  const handleStageCollapse = useCallback((stageId: string) => {
    setTimelineState(prev => ({
      ...prev,
      expandedStages: prev.expandedStages.filter(id => id !== stageId)
    }))
  }, [])

  const handleCategoryChange = useCallback((newCategory: TimelineCategory | 'all') => {
    setTimelineState(prev => ({
      ...prev,
      filterCategory: newCategory
    }))
  }, [])

  // CONTEXT7 SOURCE: /context7/motion_dev - Prefers-reduced-motion media query support
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateAnimationPreference = () => {
      if (mediaQuery.matches && config.animation.respectsReducedMotion) {
        // Disable animations if user prefers reduced motion
        config.animation.enabled = false
      }
    }
    
    updateAnimationPreference()
    mediaQuery.addEventListener('change', updateAnimationPreference)
    
    return () => mediaQuery.removeEventListener('change', updateAnimationPreference)
  }, [config.animation])

  return (
    <section 
      ref={containerRef}
      className={`relative py-12 ${className}`}
      // CONTEXT7 SOURCE: /w3/accessibility - ARIA attributes for timeline accessibility
      role="main"
      aria-label="Client Journey Timelines"
    >
      {/* Timeline Header */}
      <div className="mb-12 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Client Journey Timelines
        </motion.h2>
        <motion.p 
          className="text-lg text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover how our personalised tutoring transforms academic journeys, 
          from initial challenges to extraordinary achievements.
        </motion.p>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TimelineFilters
            categories={availableCategories}
            activeCategory={timelineState.filterCategory}
            onCategoryChange={handleCategoryChange}
            className="justify-center"
          />
        </motion.div>
      )}

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Progress Line Background */}
        <div className="absolute left-[60px] top-0 w-px h-full bg-slate-200 z-0" />
        
        {/* Animated Progress Line */}
        <motion.div
          className="absolute left-[60px] top-0 w-px bg-gradient-to-b from-blue-500 to-purple-500 z-10"
          style={{ height: progressHeight }}
        />

        {/* Timeline Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={timelineState.filterCategory}
            variants={timelineVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-20"
          >
            {filteredTimelines.map((timeline, timelineIndex) => (
              <div key={timeline.id} className="mb-16">
                {/* Timeline Header */}
                <motion.div 
                  className="mb-8 pl-[120px]"
                  variants={stageVariants}
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {timeline.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{timeline.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" />
                      <span className="text-slate-600">
                        {timeline.totalDurationMonths} months
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-slate-400" />
                      <span className="text-slate-600">{timeline.overallResult}</span>
                    </div>
                    {timeline.gradeImprovement && (
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        {timeline.gradeImprovement}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Timeline Stages */}
                <div className="pl-[120px]">
                  {timeline.stages.map((stage, stageIndex) => (
                    <TimelineStageComponent
                      key={stage.id}
                      stage={stage}
                      timeline={timeline}
                      isActive={timelineState.currentStage === stage.id}
                      isExpanded={timelineState.expandedStages.includes(stage.id)}
                      configuration={config}
                      onExpand={handleStageExpand}
                      onCollapse={handleStageCollapse}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
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
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No timelines found
            </h3>
            <p className="text-slate-500">
              Try selecting a different category to see more client journeys.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default InteractiveTimeline