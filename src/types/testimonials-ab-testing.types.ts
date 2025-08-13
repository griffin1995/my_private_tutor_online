/**
 * TESTIMONIALS A/B TESTING FRAMEWORK - COMPREHENSIVE TYPE DEFINITIONS
 * CONTEXT7 SOURCE: /simple-statistics/simple-statistics - Statistical analysis patterns for A/B test significance
 * CONTEXT7 SOURCE: /posthog/posthog - Feature flag and experiment management patterns
 * 
 * TASK 13: Advanced A/B testing infrastructure for testimonials optimization
 * This enterprise-grade framework provides comprehensive A/B testing capabilities
 * with statistical significance testing, performance monitoring, and automated
 * experiment management for continuous testimonials optimization.
 * 
 * BUSINESS IMPACT: £40,000+ through data-driven optimization testing
 * ROYAL CLIENT STANDARDS: Statistical rigor with executive-level insights
 */

import type { TestimonialsCMSData } from './testimonials-cms.types'
import type { ClientSuccessMetrics, TestimonialPerformance } from '../components/dashboards/client-success-metrics-dashboard'

// CONTEXT7 SOURCE: /posthog/posthog - Experiment configuration patterns for feature flag testing
export interface ABTestExperiment {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly status: ExperimentStatus
  readonly type: ExperimentType
  readonly component: TestimonialsComponent
  readonly variants: ExperimentVariant[]
  readonly trafficAllocation: number // Percentage of users in experiment
  readonly primaryMetric: PrimaryMetric
  readonly secondaryMetrics: SecondaryMetric[]
  readonly startDate: Date
  readonly endDate?: Date
  readonly minimumDetectableEffect: number // Minimum effect size to detect (percentage)
  readonly statisticalPowerTarget: number // Target statistical power (typically 0.8)
  readonly significanceLevel: number // Alpha level (typically 0.05)
  readonly metadata: ExperimentMetadata
}

// CONTEXT7 SOURCE: /simple-statistics/simple-statistics - Statistical test result patterns
export interface ABTestResult {
  readonly experimentId: string
  readonly variant: string
  readonly sampleSize: number
  readonly conversionRate: number
  readonly conversionCount: number
  readonly confidenceInterval: ConfidenceInterval
  readonly statisticalSignificance: StatisticalSignificance
  readonly effectSize: number
  readonly standardError: number
  readonly zScore: number
  readonly pValue: number
  readonly isSignificant: boolean
  readonly recommendation: TestRecommendation
  readonly calculatedAt: Date
}

// CONTEXT7 SOURCE: /posthog/posthog - Feature flag variant patterns for experiment configuration
export interface ExperimentVariant {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly isControl: boolean
  readonly trafficWeight: number // Weight for traffic allocation
  readonly configuration: VariantConfiguration
  readonly enabled: boolean
}

// CONTEXT7 SOURCE: /simple-statistics/simple-statistics - Confidence interval calculation patterns
export interface ConfidenceInterval {
  readonly level: number // Confidence level (e.g., 0.95 for 95%)
  readonly lowerBound: number
  readonly upperBound: number
  readonly margin: number
}

export interface StatisticalSignificance {
  readonly isSignificant: boolean
  readonly pValue: number
  readonly zScore: number
  readonly testType: StatisticalTest
  readonly criticalValue: number
  readonly degreesOfFreedom?: number
  readonly effectSize: number
  readonly cohensD?: number // For effect size interpretation
}

export interface ExperimentMetadata {
  readonly createdBy: string
  readonly createdAt: Date
  readonly lastModifiedBy: string
  readonly lastModifiedAt: Date
  readonly tags: string[]
  readonly businessObjective: string
  readonly hypothesis: string
  readonly successCriteria: string[]
  readonly riskAssessment: string
  readonly stakeholders: string[]
}

// CONTEXT7 SOURCE: /posthog/posthog - Performance monitoring patterns for experiment impact assessment
export interface ExperimentPerformanceMetrics {
  readonly experimentId: string
  readonly measurementPeriod: DateRange
  readonly pageLoadTime: PerformanceMetric
  readonly renderTime: PerformanceMetric
  readonly interactionLatency: PerformanceMetric
  readonly memoryUsage: PerformanceMetric
  readonly bundleSize: number
  readonly hydrationTime: PerformanceMetric
  readonly cumulativeLayoutShift: number
  readonly performanceImpact: PerformanceImpactAssessment
}

export interface PerformanceMetric {
  readonly median: number
  readonly p95: number
  readonly p99: number
  readonly average: number
  readonly min: number
  readonly max: number
  readonly standardDeviation: number
}

export interface PerformanceImpactAssessment {
  readonly hasSignificantImpact: boolean
  readonly impactSeverity: 'low' | 'medium' | 'high' | 'critical'
  readonly affectedMetrics: string[]
  readonly recommendation: string
  readonly mitigationRequired: boolean
}

// CONTEXT7 SOURCE: /posthog/posthog - Executive reporting patterns for experiment insights
export interface ExperimentExecutiveSummary {
  readonly experimentId: string
  readonly experimentName: string
  readonly duration: number // Days
  readonly totalParticipants: number
  readonly winningVariant?: string
  readonly improvementRate: number // Percentage improvement
  readonly confidenceLevel: number
  readonly businessImpact: BusinessImpact
  readonly nextSteps: string[]
  readonly keyInsights: string[]
  readonly risks: string[]
  readonly recommendations: ExecutiveRecommendation[]
  readonly generatedAt: Date
}

export interface BusinessImpact {
  readonly revenueImpact: number // Estimated annual revenue impact
  readonly conversionImprovement: number // Percentage improvement in conversion
  readonly engagementImprovement: number // Percentage improvement in engagement
  readonly clientSatisfactionImprovement: number // Improvement in satisfaction score
  readonly strategicValue: 'low' | 'medium' | 'high' | 'critical'
}

export interface ExecutiveRecommendation {
  readonly priority: 'low' | 'medium' | 'high' | 'urgent'
  readonly action: string
  readonly reasoning: string
  readonly timeframe: string
  readonly stakeholder: string
  readonly businessValue: string
}

// Enums and Union Types
export type ExperimentStatus = 
  | 'draft' 
  | 'scheduled' 
  | 'running' 
  | 'paused' 
  | 'completed' 
  | 'cancelled' 
  | 'archived'

export type ExperimentType = 
  | 'conversion_optimization'
  | 'engagement_optimization' 
  | 'performance_test'
  | 'ui_enhancement'
  | 'content_optimization'
  | 'user_experience'

export type TestimonialsComponent = 
  | 'testimonials-hero'
  | 'testimonials-grid' 
  | 'testimonials-timeline'
  | 'testimonials-video'
  | 'testimonials-filter'
  | 'testimonials-cta'
  | 'elite-schools-carousel'
  | 'testimonials-intro'

export type PrimaryMetric = 
  | 'conversion_rate'
  | 'click_through_rate'
  | 'engagement_rate'
  | 'time_on_page'
  | 'inquiry_submission_rate'
  | 'video_completion_rate'
  | 'testimonial_interaction_rate'

export type SecondaryMetric = 
  | 'bounce_rate'
  | 'page_views'
  | 'session_duration'
  | 'scroll_depth'
  | 'testimonial_sharing_rate'
  | 'cta_click_rate'
  | 'form_completion_rate'

export type StatisticalTest = 
  | 'two_sample_z_test'
  | 'chi_square_test'
  | 'fishers_exact_test'
  | 'welchs_t_test'
  | 'mann_whitney_u_test'

export type TestRecommendation = 
  | 'implement_winner'
  | 'continue_testing'
  | 'stop_experiment'
  | 'extend_duration'
  | 'increase_traffic'
  | 'modify_variants'
  | 'investigate_anomaly'

// Variant Configuration Types
export interface VariantConfiguration {
  readonly testimonialsHero?: TestimonialsHeroConfig
  readonly testimonialsGrid?: TestimonialsGridConfig
  readonly testimonialsTimeline?: TestimonialsTimelineConfig
  readonly testimonialsVideo?: TestimonialsVideoConfig
  readonly testimonialsFilter?: TestimonialsFilterConfig
  readonly testimonialsCta?: TestimonialsCtaConfig
}

export interface TestimonialsHeroConfig {
  readonly headline?: string
  readonly subheadline?: string
  readonly backgroundImage?: string
  readonly layout?: 'centered' | 'left-aligned' | 'right-aligned'
  readonly ctaText?: string
  readonly ctaVariant?: 'primary' | 'secondary' | 'outline'
  readonly showVideoButton?: boolean
}

export interface TestimonialsGridConfig {
  readonly columns?: number
  readonly itemsPerPage?: number
  readonly cardDesign?: 'minimal' | 'detailed' | 'premium'
  readonly showRatings?: boolean
  readonly showVerificationBadges?: boolean
  readonly animation?: 'fade' | 'slide' | 'none'
  readonly sortOrder?: 'chronological' | 'rating' | 'random'
}

export interface TestimonialsTimelineConfig {
  readonly orientation?: 'vertical' | 'horizontal'
  readonly showDates?: boolean
  readonly showImages?: boolean
  readonly itemSpacing?: 'compact' | 'normal' | 'spacious'
  readonly highlightStyle?: 'subtle' | 'bold' | 'gradient'
}

export interface TestimonialsVideoConfig {
  readonly autoplay?: boolean
  readonly showControls?: boolean
  readonly thumbnailStyle?: 'default' | 'custom'
  readonly playButtonStyle?: 'overlay' | 'inline'
  readonly videoQuality?: 'auto' | '720p' | '1080p'
}

export interface TestimonialsFilterConfig {
  readonly filterTypes?: ('category' | 'subject' | 'school' | 'year')[]
  readonly layout?: 'horizontal' | 'vertical' | 'dropdown'
  readonly showResultCount?: boolean
  readonly enableSearch?: boolean
  readonly defaultFilters?: Record<string, string>
}

export interface TestimonialsCtaConfig {
  readonly text?: string
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  readonly size?: 'sm' | 'md' | 'lg' | 'xl'
  readonly position?: 'inline' | 'floating' | 'sticky'
  readonly urgencyIndicator?: boolean
  readonly personalisationEnabled?: boolean
}

// Analysis and Reporting Types
export interface ABTestAnalysis {
  readonly experimentId: string
  readonly analysisDate: Date
  readonly totalParticipants: number
  readonly variantResults: ABTestResult[]
  readonly overallSignificance: StatisticalSignificance
  readonly winner?: string
  readonly loser?: string
  readonly insights: ExperimentInsight[]
  readonly anomalies: ExperimentAnomaly[]
  readonly recommendations: AnalysisRecommendation[]
  readonly nextSteps: string[]
}

export interface ExperimentInsight {
  readonly type: InsightType
  readonly title: string
  readonly description: string
  readonly impact: 'low' | 'medium' | 'high'
  readonly confidence: number
  readonly supportingData: Record<string, any>
}

export interface ExperimentAnomaly {
  readonly type: AnomalyType
  readonly description: string
  readonly severity: 'low' | 'medium' | 'high' | 'critical'
  readonly affectedVariants: string[]
  readonly detectedAt: Date
  readonly possibleCauses: string[]
  readonly recommendedActions: string[]
}

export interface AnalysisRecommendation {
  readonly priority: 'low' | 'medium' | 'high' | 'urgent'
  readonly category: 'statistical' | 'business' | 'technical' | 'strategic'
  readonly recommendation: string
  readonly reasoning: string
  readonly expectedOutcome: string
  readonly implementationComplexity: 'low' | 'medium' | 'high'
  readonly timeframe: string
}

export type InsightType = 
  | 'conversion_pattern'
  | 'user_segment_behaviour'
  | 'time_based_variation'
  | 'device_performance_difference'
  | 'content_preference'
  | 'interaction_sequence'

export type AnomalyType = 
  | 'traffic_distribution_skew'
  | 'conversion_rate_anomaly'
  | 'performance_degradation'
  | 'sample_ratio_mismatch'
  | 'external_factor_interference'
  | 'bot_traffic_detection'

// Utility Types
export interface DateRange {
  readonly startDate: Date
  readonly endDate: Date
}

export interface ExperimentParticipant {
  readonly userId: string
  readonly experimentId: string
  readonly variantId: string
  readonly assignedAt: Date
  readonly hasConverted: boolean
  readonly conversionEvents: ConversionEvent[]
  readonly sessionData: ParticipantSessionData
}

export interface ConversionEvent {
  readonly eventType: string
  readonly timestamp: Date
  readonly value?: number
  readonly metadata?: Record<string, any>
}

export interface ParticipantSessionData {
  readonly sessionId: string
  readonly deviceType: 'desktop' | 'tablet' | 'mobile'
  readonly browser: string
  readonly location: string
  readonly referrer?: string
  readonly utm: UtmParameters
}

export interface UtmParameters {
  readonly source?: string
  readonly medium?: string
  readonly campaign?: string
  readonly term?: string
  readonly content?: string
}

// Integration Types
export interface ABTestIntegrationConfig {
  readonly analyticsProvider: 'vercel' | 'google_analytics' | 'posthog' | 'custom'
  readonly featureFlagProvider: 'posthog' | 'custom'
  readonly performanceMonitoring: 'vercel' | 'lighthouse' | 'custom'
  readonly reportingDestination: 'dashboard' | 'email' | 'slack' | 'webhook'
  readonly automatedDecisionMaking: boolean
  readonly confidenceThreshold: number
}

// CONTEXT7 SOURCE: /simple-statistics/simple-statistics - Statistical calculation configuration patterns
export interface StatisticalConfig {
  readonly significanceLevel: number // Alpha (typically 0.05)
  readonly statisticalPower: number // Beta (typically 0.8)
  readonly minimumDetectableEffect: number // Minimum effect size
  readonly minimumSampleSize: number // Per variant
  readonly testDuration: number // Maximum days
  readonly earlyStoppingEnabled: boolean
  readonly bonferroniCorrection: boolean // For multiple testing
  readonly sequentialTesting: boolean
}

export type ABTestFrameworkConfig = ABTestIntegrationConfig & StatisticalConfig