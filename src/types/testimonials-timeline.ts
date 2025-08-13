/**
 * TESTIMONIALS TIMELINE TYPE DEFINITIONS
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced interface patterns for timeline data structure
 * CONTEXT7 SOURCE: /context7/motion_dev - Timeline animation type integration for scroll-driven storytelling
 * 
 * TASK 10: Interactive Testimonials Timeline Foundation Enhancement
 * This comprehensive type system defines client journey progression data structures
 * with integration points for smart categorization and timeline visualization.
 * 
 * BUSINESS IMPACT: £50,000+ revenue through enhanced narrative testimonials
 * ROYAL CLIENT STANDARDS: Enterprise-grade type safety for timeline storytelling
 */

import type { Testimonial } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /microsoft/typescript - Literal union types for timeline stage classification
export type ClientJourneyStage = 
  | 'initial_consultation'
  | 'needs_assessment' 
  | 'tutor_matching'
  | 'early_sessions'
  | 'progress_monitoring'
  | 'milestone_achievement'
  | 'exam_preparation'
  | 'results_celebration'
  | 'ongoing_support'

export type TimelineCategory = 
  | '11+'
  | 'gcse'
  | 'a-level'
  | 'oxbridge'
  | 'ib'
  | 'international'
  | 'adult-learning'

export type ClientJourneyDuration = 
  | 'short_term'    // 1-3 months
  | 'medium_term'   // 3-6 months
  | 'long_term'     // 6+ months
  | 'ongoing'       // Continuous support

// CONTEXT7 SOURCE: /microsoft/typescript - Complex interface composition for timeline progression data
export interface ClientJourneyTimeline {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly description: string
  readonly category: TimelineCategory
  readonly duration: ClientJourneyDuration
  readonly totalDurationMonths: number
  readonly startDate: string
  readonly endDate?: string
  readonly isOngoing: boolean
  readonly stages: readonly TimelineStage[]
  readonly overallResult: string
  readonly gradeImprovement?: string
  readonly schoolPlacement?: string
  readonly examResults?: string
  readonly clientProfile: ClientProfile
  readonly tutorInfo?: TutorInfo
  readonly featured: boolean
  readonly verified: boolean
  readonly roi?: string // Return on investment narrative
}

export interface TimelineStage {
  readonly id: string
  readonly stage: ClientJourneyStage
  readonly title: string
  readonly description: string
  readonly duration: string
  readonly timeframe: string // e.g., "Month 1", "Weeks 2-4"
  readonly milestone?: string
  readonly challengesFaced?: readonly string[]
  readonly solutionsImplemented?: readonly string[]
  readonly progressIndicators?: readonly ProgressIndicator[]
  readonly testimonial?: Testimonial
  readonly beforeState?: ClientState
  readonly afterState?: ClientState
  readonly keyMetrics?: readonly Metric[]
  readonly visualElements?: TimelineVisualElements
  readonly order: number
}

export interface ClientProfile {
  readonly name: string
  readonly ageGroup: 'primary' | 'secondary' | 'sixth-form' | 'adult'
  readonly yearGroup?: string
  readonly subjects: readonly string[]
  readonly initialChallenges: readonly string[]
  readonly goals: readonly string[]
  readonly learningStyle?: string
  readonly location: string
  readonly schoolType?: 'state' | 'independent' | 'grammar' | 'international'
}

export interface TutorInfo {
  readonly name?: string
  readonly expertise: readonly string[]
  readonly experience: string
  readonly qualifications?: readonly string[]
  readonly teachingStyle?: string
}

export interface ClientState {
  readonly confidence: number // 1-10 scale
  readonly academicLevel: string
  readonly specificSkills?: readonly string[]
  readonly motivation: number // 1-10 scale
  readonly parentalSatisfaction?: number // 1-10 scale
  readonly description: string
}

export interface ProgressIndicator {
  readonly type: 'grade' | 'skill' | 'confidence' | 'understanding'
  readonly label: string
  readonly beforeValue: string | number
  readonly afterValue: string | number
  readonly improvement: string
  readonly visualType: 'bar' | 'circle' | 'number' | 'badge'
}

export interface Metric {
  readonly label: string
  readonly value: string | number
  readonly unit?: string
  readonly trend: 'up' | 'down' | 'stable'
  readonly significance: 'high' | 'medium' | 'low'
  readonly description?: string
}

// CONTEXT7 SOURCE: /context7/motion_dev - Animation configuration types for scroll-driven timeline effects
export interface TimelineVisualElements {
  readonly icon: string
  readonly color: string
  readonly backgroundImage?: string
  readonly illustrations?: readonly string[]
  readonly chartData?: any
  readonly animationType: 'slide' | 'fade' | 'scale' | 'rotate' | 'custom'
  readonly animationDuration: number
  readonly animationDelay: number
  readonly scrollTriggerOffset?: [string, string]
}

// CONTEXT7 SOURCE: /microsoft/typescript - Configuration interfaces for timeline component behavior
export interface TimelineConfiguration {
  readonly layout: 'vertical' | 'horizontal' | 'adaptive'
  readonly animation: TimelineAnimationConfig
  readonly interactivity: TimelineInteractivityConfig
  readonly responsive: TimelineResponsiveConfig
  readonly accessibility: TimelineAccessibilityConfig
  readonly performance: TimelinePerformanceConfig
}

export interface TimelineAnimationConfig {
  readonly enabled: boolean
  readonly respectsReducedMotion: boolean
  readonly scrollTrigger: boolean
  readonly staggerDelay: number
  readonly easingFunction: string
  readonly animationDuration: number
  readonly parallaxEffect: boolean
}

export interface TimelineInteractivityConfig {
  readonly expandableStages: boolean
  readonly clickableElements: boolean
  readonly hoverEffects: boolean
  readonly touchGestures: boolean
  readonly keyboardNavigation: boolean
  readonly filterByCategory: boolean
  readonly searchFunctionality: boolean
}

export interface TimelineResponsiveConfig {
  readonly breakpoints: {
    readonly mobile: number
    readonly tablet: number
    readonly desktop: number
  }
  readonly stackOnMobile: boolean
  readonly compactView: boolean
  readonly touchOptimized: boolean
}

export interface TimelineAccessibilityConfig {
  readonly ariaLabels: boolean
  readonly keyboardNavigation: boolean
  readonly screenReaderSupport: boolean
  readonly focusManagement: boolean
  readonly colorContrast: 'AA' | 'AAA'
  readonly semanticMarkup: boolean
}

export interface TimelinePerformanceConfig {
  readonly lazyLoading: boolean
  readonly virtualizedRendering: boolean
  readonly imageOptimization: boolean
  readonly animationBudget: number // milliseconds
  readonly bundleSizeLimit: number // KB
}

// CONTEXT7 SOURCE: /microsoft/typescript - State management types for timeline component
export interface TimelineState {
  readonly currentStage: string | null
  readonly isPlaying: boolean
  readonly playbackSpeed: number
  readonly filterCategory: TimelineCategory | 'all'
  readonly searchQuery: string
  readonly expandedStages: readonly string[]
  readonly visibleStages: readonly string[]
  readonly scrollProgress: number
}

export interface TimelineActions {
  readonly setCurrentStage: (stageId: string | null) => void
  readonly togglePlayback: () => void
  readonly setPlaybackSpeed: (speed: number) => void
  readonly filterByCategory: (category: TimelineCategory | 'all') => void
  readonly searchTimelines: (query: string) => void
  readonly expandStage: (stageId: string) => void
  readonly collapseStage: (stageId: string) => void
  readonly scrollToStage: (stageId: string) => void
  readonly updateScrollProgress: (progress: number) => void
}

// CONTEXT7 SOURCE: /microsoft/typescript - Component props interfaces for timeline system
export interface TestimonialsTimelineProps {
  readonly timelines?: readonly ClientJourneyTimeline[]
  readonly configuration?: Partial<TimelineConfiguration>
  readonly className?: string
  readonly featured?: boolean
  readonly category?: TimelineCategory
  readonly limit?: number
  readonly showFilters?: boolean
  readonly showSearch?: boolean
  readonly autoPlay?: boolean
  readonly onStageSelect?: (stage: TimelineStage) => void
  readonly onTimelineComplete?: (timeline: ClientJourneyTimeline) => void
}

export interface TimelineStageProps {
  readonly stage: TimelineStage
  readonly timeline: ClientJourneyTimeline
  readonly isActive: boolean
  readonly isExpanded: boolean
  readonly isVisible: boolean
  readonly animationConfig: TimelineAnimationConfig
  readonly onExpand: (stageId: string) => void
  readonly onCollapse: (stageId: string) => void
  readonly onSelect: (stage: TimelineStage) => void
}

export interface TimelineControlsProps {
  readonly isPlaying: boolean
  readonly playbackSpeed: number
  readonly currentStage: string | null
  readonly totalStages: number
  readonly onTogglePlayback: () => void
  readonly onSpeedChange: (speed: number) => void
  readonly onStageJump: (stageId: string) => void
  readonly className?: string
}

export interface TimelineFilterProps {
  readonly categories: readonly TimelineCategory[]
  readonly activeCategory: TimelineCategory | 'all'
  readonly searchQuery: string
  readonly onCategoryChange: (category: TimelineCategory | 'all') => void
  readonly onSearchChange: (query: string) => void
  readonly resultsCount: number
  readonly className?: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - Utility types for timeline data management
export type TimelineMetrics = {
  readonly totalTimelines: number
  readonly averageDuration: number
  readonly successRate: number
  readonly categoryBreakdown: Record<TimelineCategory, number>
  readonly stageDurations: Record<ClientJourneyStage, number>
  readonly outcomeMetrics: {
    readonly gradeImprovements: number
    readonly schoolPlacements: number
    readonly examSuccesses: number
    readonly confidenceBoosts: number
  }
}

export type TimelineSortOptions = 
  | 'chronological'
  | 'duration'
  | 'success-rate'
  | 'grade-improvement'
  | 'featured-first'
  | 'category'

export type TimelineViewMode = 
  | 'compact'
  | 'detailed'
  | 'spotlight'
  | 'comparison'

// CONTEXT7 SOURCE: /microsoft/typescript - Event types for timeline interactions
export interface TimelineEvents {
  readonly onStageEnter: (stage: TimelineStage) => void
  readonly onStageExit: (stage: TimelineStage) => void
  readonly onStageClick: (stage: TimelineStage) => void
  readonly onStageHover: (stage: TimelineStage) => void
  readonly onTimelineStart: (timeline: ClientJourneyTimeline) => void
  readonly onTimelineComplete: (timeline: ClientJourneyTimeline) => void
  readonly onFilterChange: (filters: TimelineFilters) => void
  readonly onSearchResults: (results: readonly ClientJourneyTimeline[]) => void
}

export interface TimelineFilters {
  readonly category?: TimelineCategory
  readonly duration?: ClientJourneyDuration
  readonly ageGroup?: ClientProfile['ageGroup']
  readonly subjects?: readonly string[]
  readonly outcomes?: readonly string[]
  readonly featured?: boolean
  readonly verified?: boolean
}

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics types for timeline performance tracking
export interface TimelineAnalytics {
  readonly viewMetrics: {
    readonly totalViews: number
    readonly averageViewDuration: number
    readonly stageCompletionRate: number
    readonly bounceRate: number
  }
  readonly interactionMetrics: {
    readonly clickThroughRate: number
    readonly expandedStages: Record<string, number>
    readonly filterUsage: Record<TimelineCategory, number>
    readonly searchQueries: readonly string[]
  }
  readonly performanceMetrics: {
    readonly loadTime: number
    readonly animationFrameRate: number
    readonly memoryUsage: number
    readonly bundleSize: number
  }
  readonly conversionMetrics: {
    readonly inquiryGeneration: number
    readonly consultationBookings: number
    readonly clientSignups: number
    readonly revenueAttribution: number
  }
}