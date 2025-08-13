/**
 * TESTIMONIALS CMS TYPE DEFINITIONS
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced type system patterns for enterprise applications
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic constraints and conditional types for type safety
 * CONTEXT7 SOURCE: /colinhacks/zod - Type inference patterns from validation schemas
 * 
 * PHASE 1 TASK 8: Comprehensive type system for testimonials CMS integration
 * Provides type safety across all CMS components, ensuring data integrity
 * and developer experience for the £400,000+ revenue system.
 * 
 * BUSINESS IMPACT: Type safety prevents costly runtime errors
 * ROYAL STANDARDS: Enterprise-grade type system for elite service reliability
 */

import type { z } from 'zod'

// CONTEXT7 SOURCE: /microsoft/typescript - Base entity patterns for CMS content
export interface CMSEntity {
  readonly id: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly version: number
  readonly status: 'draft' | 'published' | 'archived'
}

export interface CMSMetadata {
  readonly author: string
  readonly lastModifiedBy: string
  readonly tags: readonly string[]
  readonly seoMetadata?: {
    readonly title?: string
    readonly description?: string
    readonly keywords?: readonly string[]
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Enhanced testimonial types with CMS capabilities
export interface EnhancedTestimonial extends CMSEntity {
  readonly quote: string
  readonly author: string
  readonly role: string
  readonly avatar: string
  readonly rating: number
  readonly verified: boolean
  readonly date?: string
  readonly location?: string
  readonly subject?: string
  readonly result?: string
  readonly metadata: CMSMetadata
  readonly featuredUntil?: string
  readonly priority: number
  readonly category: 'parent' | 'student' | 'educator' | 'institution'
}

export interface TestimonialFilters {
  readonly rating?: number
  readonly category?: EnhancedTestimonial['category']
  readonly location?: string
  readonly subject?: string
  readonly verified?: boolean
  readonly featured?: boolean
  readonly dateFrom?: string
  readonly dateTo?: string
}

export interface TestimonialSortOptions {
  readonly field: 'date' | 'rating' | 'priority' | 'author'
  readonly direction: 'asc' | 'desc'
}

// CONTEXT7 SOURCE: /microsoft/typescript - Elite school types with comprehensive data
export interface EliteSchool extends CMSEntity {
  readonly name: string
  readonly logoUrl: string
  readonly description: string
  readonly tier: 'elite' | 'premium' | 'standard'
  readonly category: 'independent' | 'grammar' | 'university'
  readonly founded?: number
  readonly notable?: string
  readonly websiteUrl?: string
  readonly location: string
  readonly metadata: CMSMetadata
  readonly studentCount?: number
  readonly acceptanceRate?: number
  readonly fees?: {
    readonly annual: number
    readonly currency: string
  }
  readonly achievements?: readonly string[]
  readonly partnershipLevel: 'platinum' | 'gold' | 'silver' | 'bronze'
}

// CONTEXT7 SOURCE: /microsoft/typescript - Video testimonial types with media management
export interface VideoTestimonial extends CMSEntity {
  readonly title: string
  readonly description: string
  readonly thumbnailUrl: string
  readonly videoUrl: string
  readonly duration: string
  readonly category: 'parent' | 'student' | 'educator'
  readonly featured: boolean
  readonly testimonial?: EnhancedTestimonial
  readonly metadata: CMSMetadata
  readonly videoMetadata: {
    readonly format: string
    readonly resolution: string
    readonly fileSize: number
    readonly bitrate: string
  }
  readonly accessibility: {
    readonly hasSubtitles: boolean
    readonly hasTranscript: boolean
    readonly hasAudioDescription: boolean
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Content section management types
export interface ContentSection<T = any> {
  readonly id: string
  readonly type: string
  readonly title: string
  readonly description: string
  readonly content: T
  readonly lastModified: string
  readonly validationStatus: ValidationStatus
  readonly publishStatus: PublishStatus
}

export interface ValidationStatus {
  readonly isValid: boolean
  readonly errors: readonly string[]
  readonly warnings: readonly string[]
  readonly lastChecked: string
  readonly score: number
}

export interface PublishStatus {
  readonly isPublished: boolean
  readonly publishedAt?: string
  readonly scheduledFor?: string
  readonly publishedBy?: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - CMS operation types for admin interface
export interface CMSOperation<T = any> {
  readonly id: string
  readonly type: 'create' | 'update' | 'delete' | 'publish' | 'archive'
  readonly entityType: string
  readonly entityId: string
  readonly payload?: T
  readonly userId: string
  readonly timestamp: string
  readonly status: 'pending' | 'completed' | 'failed'
  readonly error?: string
}

export interface CMSBatch {
  readonly id: string
  readonly operations: readonly CMSOperation[]
  readonly status: 'pending' | 'processing' | 'completed' | 'failed'
  readonly progress: number
  readonly createdAt: string
  readonly completedAt?: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics and performance types
export interface ContentPerformance {
  readonly contentId: string
  readonly contentType: string
  readonly views: number
  readonly interactions: number
  readonly conversions: number
  readonly revenue: number
  readonly engagementRate: number
  readonly conversionRate: number
  readonly averageTimeSpent: number
  readonly bounceRate: number
  readonly periodStart: string
  readonly periodEnd: string
}

export interface PerformanceTrend {
  readonly metric: string
  readonly current: number
  readonly previous: number
  readonly change: number
  readonly changePercent: number
  readonly trend: 'up' | 'down' | 'stable'
}

// CONTEXT7 SOURCE: /microsoft/typescript - Content optimization types
export interface OptimizationSuggestion {
  readonly id: string
  readonly contentId: string
  readonly type: 'performance' | 'seo' | 'accessibility' | 'engagement'
  readonly priority: 'high' | 'medium' | 'low'
  readonly title: string
  readonly description: string
  readonly expectedImpact: {
    readonly metric: string
    readonly improvement: string
    readonly confidence: number
  }
  readonly implementation: {
    readonly difficulty: 'easy' | 'medium' | 'hard'
    readonly estimatedTime: number
    readonly resources: readonly string[]
  }
  readonly createdAt: string
}

export interface A11yReport {
  readonly contentId: string
  readonly score: number
  readonly issues: readonly {
    readonly severity: 'error' | 'warning' | 'info'
    readonly rule: string
    readonly description: string
    readonly element?: string
    readonly suggestion: string
  }[]
  readonly improvements: readonly string[]
  readonly lastChecked: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - Admin interface types
export interface AdminUser {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly role: 'super_admin' | 'admin' | 'content_manager' | 'editor' | 'viewer'
  readonly permissions: readonly string[]
  readonly lastLogin: string
  readonly status: 'active' | 'inactive' | 'suspended'
}

export interface AdminSession {
  readonly userId: string
  readonly sessionId: string
  readonly startTime: string
  readonly lastActivity: string
  readonly ipAddress: string
  readonly userAgent: string
  readonly permissions: readonly string[]
}

// CONTEXT7 SOURCE: /microsoft/typescript - API response types
export interface CMSResponse<T = any> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
  readonly errors?: readonly string[]
  readonly warnings?: readonly string[]
  readonly metadata: {
    readonly timestamp: string
    readonly version: string
    readonly requestId: string
    readonly processingTime: number
  }
}

export interface PaginatedResponse<T> extends CMSResponse<T[]> {
  readonly pagination: {
    readonly page: number
    readonly limit: number
    readonly total: number
    readonly totalPages: number
    readonly hasNext: boolean
    readonly hasPrevious: boolean
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Search and filtering types
export interface SearchQuery {
  readonly query: string
  readonly filters: Record<string, any>
  readonly sort: {
    readonly field: string
    readonly direction: 'asc' | 'desc'
  }
  readonly pagination: {
    readonly page: number
    readonly limit: number
  }
}

export interface SearchResult<T> {
  readonly results: T[]
  readonly total: number
  readonly facets: Record<string, Array<{
    readonly value: string
    readonly count: number
  }>>
  readonly suggestions: readonly string[]
  readonly took: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - Content versioning types
export interface ContentVersion<T = any> {
  readonly version: number
  readonly content: T
  readonly createdAt: string
  readonly createdBy: string
  readonly changelog: string
  readonly tags: readonly string[]
  readonly parentVersion?: number
}

export interface VersionDiff {
  readonly field: string
  readonly oldValue: any
  readonly newValue: any
  readonly changeType: 'added' | 'modified' | 'removed'
}

export interface ContentHistory<T = any> {
  readonly contentId: string
  readonly versions: readonly ContentVersion<T>[]
  readonly currentVersion: number
  readonly totalVersions: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - Backup and restore types
export interface BackupManifest {
  readonly id: string
  readonly createdAt: string
  readonly createdBy: string
  readonly type: 'full' | 'incremental'
  readonly size: number
  readonly contentTypes: readonly string[]
  readonly itemCount: number
  readonly checksum: string
  readonly metadata: {
    readonly environment: string
    readonly version: string
    readonly description?: string
  }
}

export interface RestoreOperation {
  readonly id: string
  readonly backupId: string
  readonly status: 'pending' | 'processing' | 'completed' | 'failed'
  readonly progress: number
  readonly startedAt: string
  readonly completedAt?: string
  readonly restoredItems: number
  readonly failedItems: number
  readonly errors: readonly string[]
}

// CONTEXT7 SOURCE: /microsoft/typescript - Utility types for type safety
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type CMSEntityType = 'testimonial' | 'video' | 'school' | 'hero' | 'cta'

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived'

export type OperationResult<T = any> = {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
  readonly warnings?: readonly string[]
}

// CONTEXT7 SOURCE: /microsoft/typescript - Event types for real-time updates
export interface CMSEvent<T = any> {
  readonly id: string
  readonly type: string
  readonly entityType: string
  readonly entityId: string
  readonly payload: T
  readonly userId?: string
  readonly timestamp: string
}

export interface EventSubscription {
  readonly id: string
  readonly eventTypes: readonly string[]
  readonly entityTypes?: readonly string[]
  readonly callback: (event: CMSEvent) => void
  readonly active: boolean
}

// CONTEXT7 SOURCE: /microsoft/typescript - Configuration types
export interface FeatureFlags {
  readonly enableAnalytics: boolean
  readonly enableVersioning: boolean
  readonly enableBackups: boolean
  readonly enableRealTimeUpdates: boolean
  readonly enableAdvancedValidation: boolean
  readonly enablePerformanceMonitoring: boolean
}

export interface SystemLimits {
  readonly maxFileSize: number
  readonly maxImageDimensions: {
    readonly width: number
    readonly height: number
  }
  readonly maxVideoDuration: number
  readonly maxTestimonialLength: number
  readonly maxSchoolsCount: number
  readonly maxVideosCount: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - Generic CMS types for extensibility
export interface CMSPlugin<T = any> {
  readonly name: string
  readonly version: string
  readonly description: string
  readonly enabled: boolean
  readonly config: T
  readonly hooks: {
    readonly beforeSave?: (content: any) => any
    readonly afterSave?: (content: any) => void
    readonly beforeDelete?: (contentId: string) => boolean
    readonly afterDelete?: (contentId: string) => void
  }
}

export interface CMSTheme {
  readonly name: string
  readonly displayName: string
  readonly colors: Record<string, string>
  readonly typography: Record<string, any>
  readonly components: Record<string, any>
}

// Export all types as a namespace for organized imports
export namespace TestimonialsCMS {
  export type Entity = CMSEntity
  export type Testimonial = EnhancedTestimonial
  export type School = EliteSchool
  export type Video = VideoTestimonial
  export type Section<T = any> = ContentSection<T>
  export type Operation<T = any> = CMSOperation<T>
  export type Performance = ContentPerformance
  export type User = AdminUser
  export type Response<T = any> = CMSResponse<T>
  export type SearchResult<T> = SearchResult<T>
  export type Version<T = any> = ContentVersion<T>
  export type Event<T = any> = CMSEvent<T>
}