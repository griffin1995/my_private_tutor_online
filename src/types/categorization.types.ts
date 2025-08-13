/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced TypeScript interfaces for smart categorization system
 * IMPLEMENTATION REASON: Task 9 Phase 2 - Smart testimonials categorization with AI-powered classification
 * 
 * Smart Categorization Types for My Private Tutor Online
 * Provides comprehensive type definitions for AI-powered testimonial categorization system
 * Supporting £400,000+ revenue opportunity through intelligent content organization
 * 
 * Royal Standards: Enterprise-grade type system for elite client expectations
 */

// CONTEXT7 SOURCE: /microsoft/typescript - readonly modifiers for immutable data structures
// TYPE SAFETY REASON: Official TypeScript documentation recommends readonly for API response data
export interface Testimonial {
  readonly id: string
  readonly quote: string
  readonly author: string
  readonly role: string
  readonly avatar?: string
  readonly rating: number
  readonly verified?: boolean
  readonly date?: string
  readonly location?: string
  readonly subject?: string
  readonly result?: string
  readonly category?: string
  readonly grade?: string
  readonly year?: number
  readonly featured?: boolean
  readonly tags?: readonly string[]
  readonly metadata?: TestimonialMetadata
}

// CONTEXT7 SOURCE: /microsoft/typescript - interface extension patterns for modular type system
// EXTENSION REASON: Official TypeScript documentation patterns for extending existing interfaces
export interface TestimonialMetadata {
  readonly wordCount: number
  readonly sentiment: SentimentAnalysis
  readonly readingTime: number
  readonly complexity: ContentComplexity
  readonly topics: readonly string[]
  readonly entities: readonly EntityExtraction[]
}

// CONTEXT7 SOURCE: /microsoft/typescript - union types for categorical data classification
// CATEGORIZATION REASON: Official TypeScript documentation recommends union types for constrained values
export type AcademicLevel = 
  | '11+' 
  | 'GCSE' 
  | 'A-Level' 
  | 'IB' 
  | 'Oxbridge' 
  | 'University' 
  | 'International' 
  | 'Primary' 
  | 'Secondary'

export type SubjectArea = 
  | 'Mathematics' 
  | 'English' 
  | 'Sciences' 
  | 'Physics' 
  | 'Chemistry' 
  | 'Biology'
  | 'Languages' 
  | 'History' 
  | 'Geography' 
  | 'Economics'
  | 'Humanities' 
  | 'Arts' 
  | 'Music' 
  | 'Computing'

export type ServiceType = 
  | 'Online Tutoring' 
  | 'In-Person Tutoring'
  | 'Intensive Courses' 
  | 'Exam Preparation'
  | 'University Admissions' 
  | 'Scholarship Preparation'
  | 'Assessment Support' 
  | 'Coursework Help'

export type SuccessMetric = 
  | 'Grade Improvement' 
  | 'University Admission'
  | 'Exam Success' 
  | 'Confidence Building'
  | 'Study Skills' 
  | 'Academic Scholarship'
  | 'Competition Success' 
  | 'Career Preparation'

export type GeographicRegion = 
  | 'London' 
  | 'South East' 
  | 'South West'
  | 'Midlands' 
  | 'North England' 
  | 'Scotland'
  | 'Wales' 
  | 'Northern Ireland'
  | 'International' 
  | 'Online Global'

export type StudentProfile = 
  | 'High Achiever' 
  | 'Average Student'
  | 'Struggling Learner' 
  | 'Gifted & Talented'
  | 'Special Educational Needs' 
  | 'International Student'
  | 'Returning Student' 
  | 'Mature Learner'

// CONTEXT7 SOURCE: /microsoft/typescript - generic interfaces for flexible categorization system
// GENERIC DESIGN REASON: Official TypeScript documentation patterns for reusable type definitions
export interface Category {
  readonly id: string
  readonly name: string
  readonly type: CategoryType
  readonly description: string
  readonly weight: number
  readonly parentId?: string
  readonly children?: readonly Category[]
  readonly metadata: CategoryMetadata
}

export type CategoryType = 
  | 'academic-level'
  | 'subject-area'
  | 'service-type'
  | 'success-metric'
  | 'geographic'
  | 'student-profile'
  | 'temporal'
  | 'custom'

export interface CategoryMetadata {
  readonly colour: string
  readonly icon: string
  readonly priority: number
  readonly isVisible: boolean
  readonly createdAt: string
  readonly updatedAt: string
  readonly usageCount: number
  readonly effectiveness: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - conditional types and mapped types for AI categorization results
// AI RESULT REASON: Official TypeScript documentation patterns for complex AI response modeling
export interface CategoryResult {
  readonly testimonialId: string
  readonly primary: CategoryAssignment
  readonly secondary: readonly CategoryAssignment[]
  readonly confidence: ConfidenceScore
  readonly reasoning: string
  readonly tags: readonly string[]
  readonly semanticKeywords: readonly string[]
  readonly processingTime: number
  readonly modelVersion: string
}

export interface CategoryAssignment {
  readonly category: Category
  readonly confidence: number
  readonly reasoning: string
  readonly evidence: readonly string[]
  readonly weight: number
}

export interface ConfidenceScore {
  readonly overall: number
  readonly primary: number
  readonly secondary: number
  readonly factors: ConfidenceFactors
}

export interface ConfidenceFactors {
  readonly contentLength: number
  readonly keywordDensity: number
  readonly contextualRelevance: number
  readonly historicalAccuracy: number
  readonly userFeedback: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - advanced interface composition for AI analysis
// NLP ANALYSIS REASON: Official TypeScript documentation patterns for natural language processing results
export interface ContentAnalysis {
  readonly sentiment: SentimentAnalysis
  readonly complexity: ContentComplexity
  readonly topics: readonly TopicAnalysis[]
  readonly entities: readonly EntityExtraction[]
  readonly keywords: readonly KeywordExtraction[]
  readonly readability: ReadabilityScore
}

export interface SentimentAnalysis {
  readonly polarity: number // -1 to 1
  readonly magnitude: number // 0 to 1
  readonly label: 'positive' | 'negative' | 'neutral'
  readonly confidence: number
  readonly emotions: readonly EmotionScore[]
}

export interface EmotionScore {
  readonly emotion: 'joy' | 'trust' | 'fear' | 'surprise' | 'sadness' | 'disgust' | 'anger' | 'anticipation'
  readonly intensity: number
}

export interface ContentComplexity {
  readonly level: 'simple' | 'moderate' | 'complex' | 'advanced'
  readonly score: number
  readonly factors: ComplexityFactors
}

export interface ComplexityFactors {
  readonly sentenceLength: number
  readonly vocabularyDifficulty: number
  readonly syntacticComplexity: number
  readonly conceptualDensity: number
}

export interface TopicAnalysis {
  readonly topic: string
  readonly relevance: number
  readonly keywords: readonly string[]
  readonly context: string
}

export interface EntityExtraction {
  readonly text: string
  readonly type: EntityType
  readonly confidence: number
  readonly startOffset: number
  readonly endOffset: number
  readonly metadata?: EntityMetadata
}

export type EntityType = 
  | 'PERSON' 
  | 'ORGANIZATION' 
  | 'LOCATION'
  | 'ACADEMIC_SUBJECT' 
  | 'QUALIFICATION'
  | 'GRADE' 
  | 'EXAM' 
  | 'UNIVERSITY'
  | 'SCHOOL' 
  | 'DATE' 
  | 'NUMBER'

export interface EntityMetadata {
  readonly normalizedForm?: string
  readonly aliases?: readonly string[]
  readonly linkedData?: string
  readonly category?: string
}

export interface KeywordExtraction {
  readonly keyword: string
  readonly importance: number
  readonly frequency: number
  readonly context: readonly string[]
  readonly category?: string
}

export interface ReadabilityScore {
  readonly flesch: number
  readonly gunningFog: number
  readonly smog: number
  readonly ari: number
  readonly grade: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - advanced generic constraints for categorization engine
// ENGINE INTERFACE REASON: Official TypeScript documentation patterns for modular system architecture
export interface SmartCategorizationEngine {
  // Core categorization methods
  categorizeTestimonial(testimonial: Testimonial, options?: CategorizationOptions): Promise<CategoryResult>
  batchCategorize(testimonials: readonly Testimonial[], options?: BatchOptions): Promise<readonly CategoryResult[]>
  
  // Category management
  generateCategories(testimonials: readonly Testimonial[]): Promise<readonly Category[]>
  mergeSimilarCategories(categories: readonly Category[], threshold?: number): readonly Category[]
  validateCategories(categories: readonly Category[]): CategoryValidationResult
  
  // Content analysis
  analyzeContent(content: string): Promise<ContentAnalysis>
  extractFeatures(testimonial: Testimonial): FeatureVector
  computeSimilarity(testimonial1: Testimonial, testimonial2: Testimonial): number
  
  // Learning and adaptation
  learnFromUserBehavior(interactions: readonly UserInteraction[]): Promise<void>
  updateCategoryModel(feedback: readonly CategoryFeedback[]): Promise<ModelUpdateResult>
  trainModel(trainingData: readonly TrainingExample[]): Promise<TrainingResult>
  
  // Performance and caching
  getCachedCategories(testimonialId: string): CategoryResult | null
  precomputeCategories(testimonials?: readonly Testimonial[]): Promise<void>
  clearCache(pattern?: string): void
  getPerformanceMetrics(): PerformanceMetrics
}

export interface CategorizationOptions {
  readonly includeSecondary?: boolean
  readonly minConfidence?: number
  readonly maxCategories?: number
  readonly preferredTypes?: readonly CategoryType[]
  readonly excludeTypes?: readonly CategoryType[]
  readonly customWeights?: Record<string, number>
  readonly useCache?: boolean
  readonly timeout?: number
}

export interface BatchOptions extends CategorizationOptions {
  readonly batchSize?: number
  readonly concurrency?: number
  readonly progressCallback?: (progress: number, processed: number, total: number) => void
}

export interface CategoryValidationResult {
  readonly isValid: boolean
  readonly errors: readonly ValidationError[]
  readonly warnings: readonly ValidationWarning[]
  readonly suggestions: readonly string[]
}

export interface ValidationError {
  readonly categoryId: string
  readonly field: string
  readonly message: string
  readonly severity: 'error' | 'warning'
}

export interface ValidationWarning {
  readonly categoryId: string
  readonly field: string
  readonly message: string
  readonly impact: 'low' | 'medium' | 'high'
}

export interface FeatureVector {
  readonly testimonialId: string
  readonly features: Record<string, number>
  readonly dimensions: number
  readonly extractedAt: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - interface patterns for machine learning integration
// ML INTEGRATION REASON: Official TypeScript documentation patterns for AI/ML system interfaces
export interface UserInteraction {
  readonly id: string
  readonly userId?: string
  readonly sessionId: string
  readonly testimonialId: string
  readonly action: InteractionType
  readonly categoryId?: string
  readonly duration?: number
  readonly feedback?: UserFeedback
  readonly timestamp: string
  readonly metadata?: InteractionMetadata
}

export type InteractionType = 
  | 'view' 
  | 'click' 
  | 'filter'
  | 'search' 
  | 'share' 
  | 'bookmark'
  | 'rate' 
  | 'categorize' 
  | 'report'

export interface UserFeedback {
  readonly rating: number // 1-5
  readonly comment?: string
  readonly helpful: boolean
  readonly accurate: boolean
  readonly relevant: boolean
}

export interface InteractionMetadata {
  readonly device: string
  readonly browser: string
  readonly source: string
  readonly referrer?: string
  readonly location?: string
}

export interface CategoryFeedback {
  readonly id: string
  readonly testimonialId: string
  readonly categoryId: string
  readonly isCorrect: boolean
  readonly suggestedCategory?: string
  readonly confidence: number
  readonly reason?: string
  readonly userId?: string
  readonly timestamp: string
}

export interface TrainingExample {
  readonly testimonial: Testimonial
  readonly correctCategories: readonly Category[]
  readonly weight?: number
  readonly source: 'manual' | 'automated' | 'feedback'
  readonly confidence: number
  readonly validatedBy?: string
  readonly validatedAt?: string
}

export interface ModelUpdateResult {
  readonly success: boolean
  readonly previousVersion: string
  readonly newVersion: string
  readonly improvementMetrics: ImprovementMetrics
  readonly affectedCategories: readonly string[]
  readonly performance: ModelPerformance
}

export interface TrainingResult {
  readonly modelId: string
  readonly version: string
  readonly accuracy: number
  readonly precision: number
  readonly recall: number
  readonly f1Score: number
  readonly trainingTime: number
  readonly datasetSize: number
}

export interface ImprovementMetrics {
  readonly accuracyDelta: number
  readonly precisionDelta: number
  readonly recallDelta: number
  readonly f1Delta: number
  readonly categorySpecific: Record<string, MetricsDelta>
}

export interface MetricsDelta {
  readonly accuracy: number
  readonly precision: number
  readonly recall: number
  readonly f1: number
}

export interface ModelPerformance {
  readonly accuracy: number
  readonly precision: number
  readonly recall: number
  readonly f1Score: number
  readonly confusionMatrix: readonly (readonly number[])[]
  readonly categoryMetrics: Record<string, CategoryMetrics>
}

export interface CategoryMetrics {
  readonly precision: number
  readonly recall: number
  readonly f1Score: number
  readonly support: number
  readonly examples: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - performance monitoring interface patterns
// PERFORMANCE REASON: Official TypeScript documentation patterns for system monitoring
export interface PerformanceMetrics {
  readonly categorization: CategorizationMetrics
  readonly cache: CacheMetrics
  readonly memory: MemoryMetrics
  readonly processing: ProcessingMetrics
  readonly errors: ErrorMetrics
}

export interface CategorizationMetrics {
  readonly totalRequests: number
  readonly averageResponseTime: number
  readonly successRate: number
  readonly throughputPerSecond: number
  readonly accuracyRate: number
  readonly confidenceDistribution: Record<string, number>
}

export interface CacheMetrics {
  readonly hitRate: number
  readonly missRate: number
  readonly totalEntries: number
  readonly memoryUsage: number
  readonly averageAge: number
  readonly evictionRate: number
}

export interface MemoryMetrics {
  readonly heapUsed: number
  readonly heapTotal: number
  readonly external: number
  readonly arrayBuffers: number
}

export interface ProcessingMetrics {
  readonly queueSize: number
  readonly averageWaitTime: number
  readonly processingRate: number
  readonly errorRate: number
  readonly retryRate: number
}

export interface ErrorMetrics {
  readonly totalErrors: number
  readonly errorRate: number
  readonly errorTypes: Record<string, number>
  readonly criticalErrors: number
  readonly lastError?: ErrorDetails
}

export interface ErrorDetails {
  readonly message: string
  readonly stack: string
  readonly timestamp: string
  readonly context?: Record<string, unknown>
}

// CONTEXT7 SOURCE: /microsoft/typescript - configuration interface patterns for system setup
// CONFIGURATION REASON: Official TypeScript documentation patterns for configurable systems
export interface CategorizationConfig {
  readonly engine: EngineConfig
  readonly categories: CategoryConfig
  readonly performance: PerformanceConfig
  readonly cache: CacheConfig
  readonly ml: MachineLearningConfig
}

export interface EngineConfig {
  readonly provider: 'local' | 'openai' | 'huggingface' | 'custom'
  readonly model: string
  readonly version: string
  readonly timeout: number
  readonly retries: number
  readonly batchSize: number
}

export interface CategoryConfig {
  readonly defaultCategories: readonly Category[]
  readonly autoGeneration: boolean
  readonly mergingThreshold: number
  readonly maxCategories: number
  readonly validationRules: readonly ValidationRule[]
}

export interface ValidationRule {
  readonly field: keyof Category
  readonly rule: string
  readonly message: string
  readonly severity: 'error' | 'warning'
}

export interface PerformanceConfig {
  readonly enableMetrics: boolean
  readonly metricsInterval: number
  readonly alertThresholds: AlertThresholds
  readonly optimization: OptimizationConfig
}

export interface AlertThresholds {
  readonly responseTime: number
  readonly errorRate: number
  readonly memoryUsage: number
  readonly accuracy: number
}

export interface OptimizationConfig {
  readonly enablePrecomputation: boolean
  readonly backgroundProcessing: boolean
  readonly adaptiveBatching: boolean
  readonly modelCompression: boolean
}

export interface CacheConfig {
  readonly enabled: boolean
  readonly ttl: number
  readonly maxSize: number
  readonly strategy: 'lru' | 'lfu' | 'ttl' | 'fifo'
  readonly compression: boolean
}

export interface MachineLearningConfig {
  readonly enableLearning: boolean
  readonly feedbackWeight: number
  readonly retrainingThreshold: number
  readonly modelUpdateInterval: number
  readonly validationSplit: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - event handling interface patterns for reactive systems
// EVENT HANDLING REASON: Official TypeScript documentation patterns for event-driven architecture
export interface CategorizationEvent {
  readonly type: CategorizationEventType
  readonly timestamp: string
  readonly data: CategorizationEventData
  readonly metadata?: EventMetadata
}

export type CategorizationEventType = 
  | 'testimonial-categorized'
  | 'category-created'
  | 'category-updated'
  | 'category-deleted'
  | 'model-updated'
  | 'feedback-received'
  | 'performance-alert'
  | 'cache-cleared'
  | 'error-occurred'

export interface CategorizationEventData {
  readonly testimonialId?: string
  readonly categoryId?: string
  readonly result?: CategoryResult
  readonly performance?: PerformanceMetrics
  readonly error?: ErrorDetails
  readonly [key: string]: unknown
}

export interface EventMetadata {
  readonly source: string
  readonly version: string
  readonly correlationId?: string
  readonly userId?: string
  readonly sessionId?: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - utility types for API integration
// UTILITY TYPES REASON: Official TypeScript documentation patterns for API response handling
export type CategorizationResponse<T = CategoryResult> = {
  readonly success: true
  readonly data: T
  readonly metadata: ResponseMetadata
} | {
  readonly success: false
  readonly error: CategorizationError
  readonly metadata: ResponseMetadata
}

export interface ResponseMetadata {
  readonly requestId: string
  readonly timestamp: string
  readonly processingTime: number
  readonly version: string
  readonly cached: boolean
}

export interface CategorizationError {
  readonly code: CategorizationErrorCode
  readonly message: string
  readonly details?: Record<string, unknown>
  readonly retryable: boolean
}

export type CategorizationErrorCode = 
  | 'INVALID_INPUT'
  | 'MODEL_UNAVAILABLE'
  | 'RATE_LIMIT_EXCEEDED'
  | 'PROCESSING_TIMEOUT'
  | 'INSUFFICIENT_CONFIDENCE'
  | 'CATEGORY_NOT_FOUND'
  | 'VALIDATION_FAILED'
  | 'INTERNAL_ERROR'

// Export utility types for common operations
export type CategoryFilter = Partial<Pick<Category, 'type' | 'parentId'>>
export type TestimonialFilter = Partial<Pick<Testimonial, 'category' | 'subject' | 'grade' | 'location'>>
export type CategorizationStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cached'

// CONTEXT7 SOURCE: /microsoft/typescript - conditional types for advanced type operations
// CONDITIONAL TYPES REASON: Official TypeScript documentation patterns for flexible type definitions
export type CategoryByType<T extends CategoryType> = 
  T extends 'academic-level' ? { level: AcademicLevel } :
  T extends 'subject-area' ? { subject: SubjectArea } :
  T extends 'service-type' ? { service: ServiceType } :
  T extends 'success-metric' ? { metric: SuccessMetric } :
  T extends 'geographic' ? { region: GeographicRegion } :
  T extends 'student-profile' ? { profile: StudentProfile } :
  Record<string, unknown>

export type SmartCategorizationHookResult = {
  readonly categorize: (testimonial: Testimonial) => Promise<CategoryResult>
  readonly batchCategorize: (testimonials: readonly Testimonial[]) => Promise<readonly CategoryResult[]>
  readonly categories: readonly Category[]
  readonly isLoading: boolean
  readonly error: CategorizationError | null
  readonly performance: PerformanceMetrics | null
  readonly clearCache: () => void
  readonly refreshCategories: () => Promise<void>
}