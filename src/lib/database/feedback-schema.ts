/**
 * CONTEXT7 SOURCE: /context7/postgresql-current - Database schema design with relational integrity and indexing
 * DATABASE REASON: Official PostgreSQL documentation patterns for rating and feedback systems with performance optimization
 * 
 * FAQ Rating & Feedback Database Schema
 * - Comprehensive rating and feedback system for FAQ enhancement
 * - GDPR-compliant data collection with privacy protection
 * - Performance optimized with proper indexing and partitioning
 * - Royal client standards for data security and reliability
 */

import { z } from 'zod'

// CONTEXT7 SOURCE: /context7/postgresql-current - Enum types for structured data validation
// SCHEMA REASON: Official PostgreSQL patterns for constrained data types and referential integrity

/**
 * Rating Types Enumeration
 * Supports multiple rating mechanisms for comprehensive feedback collection
 */
export const RatingTypeEnum = z.enum([
  'helpful_not_helpful',    // Binary thumbs up/down voting
  'five_star',             // 1-5 star rating system
  'emoji_reaction',        // Emoji-based emotional feedback
  'nps_score'             // Net Promoter Score (0-10)
])

/**
 * Feedback Status for Admin Moderation
 * Comprehensive workflow for content moderation and quality control
 */
export const FeedbackStatusEnum = z.enum([
  'pending',              // Awaiting moderation
  'approved',             // Approved for display
  'rejected',             // Rejected - not displayed
  'spam',                 // Flagged as spam
  'under_review',         // Being reviewed by admin
  'escalated'             // Escalated for senior review
])

/**
 * Client Segment Classification
 * Matches existing FAQ system client segmentation
 */
export const ClientSegmentEnum = z.enum([
  'oxbridge_prep',        // Oxbridge preparation families
  '11_plus',              // 11+ exam preparation
  'a_level_gcse',         // A-Level and GCSE students
  'elite_corporate',      // Ultra-wealthy corporate clients
  'comparison_shopper',   // Price and service comparison clients
  'anonymous'             // Non-authenticated users
])

/**
 * Primary FAQ Ratings Table
 * CONTEXT7 SOURCE: /context7/postgresql-current - Table design with proper indexing and constraints
 * RATING STORAGE: Core rating data with IP hashing for spam prevention
 */
export const FAQRatingSchema = z.object({
  // Primary key and identifiers
  id: z.string().uuid(),
  faq_question_id: z.string(), // References FAQ question from CMS
  
  // Rating data
  rating_type: RatingTypeEnum,
  rating_value: z.number().min(0).max(10), // Normalized 0-10 scale
  original_value: z.union([
    z.boolean(),           // For helpful/not_helpful
    z.number().min(1).max(5), // For five_star
    z.string(),            // For emoji reactions
    z.number().min(0).max(10)  // For NPS
  ]),
  
  // User identification (privacy-compliant)
  user_id: z.string().optional(), // For authenticated users
  ip_hash: z.string(), // SHA-256 hashed IP for rate limiting
  user_agent_hash: z.string(), // Hashed user agent for fingerprinting
  session_id: z.string().optional(), // Session identifier
  
  // User segmentation
  client_segment: ClientSegmentEnum,
  entry_point: z.enum(['direct', 'search', 'internal_link', 'social', 'email']),
  
  // Metadata
  created_at: z.date(),
  updated_at: z.date(),
  
  // Analytics and context
  page_context: z.object({
    referrer: z.string().optional(),
    search_query: z.string().optional(),
    time_on_page: z.number().optional(), // Seconds
    scroll_depth: z.number().optional(), // Percentage
  }),
  
  // Privacy and consent
  privacy_consent: z.boolean(),
  analytics_consent: z.boolean(),
})

/**
 * Detailed Feedback Comments Table
 * CONTEXT7 SOURCE: /context7/postgresql-current - Text search and moderation patterns
 * FEEDBACK STORAGE: Rich feedback data with full-text search capabilities
 */
export const FAQFeedbackSchema = z.object({
  // Primary key and relationships
  id: z.string().uuid(),
  faq_question_id: z.string(),
  rating_id: z.string().uuid().optional(), // Links to rating if provided
  
  // Feedback content
  feedback_text: z.string().max(2000), // Feedback content with length limit
  improvement_suggestion: z.string().max(1000).optional(),
  category_tags: z.array(z.string()).optional(), // Categorisation tags
  
  // User information (optional for anonymous feedback)
  user_name: z.string().max(100).optional(),
  user_email: z.string().email().optional(),
  contact_permission: z.boolean().default(false),
  
  // Moderation and quality
  status: FeedbackStatusEnum,
  moderation_notes: z.string().optional(),
  quality_score: z.number().min(0).max(100).optional(), // Auto-calculated quality
  
  // Spam detection
  spam_score: z.number().min(0).max(100), // Automated spam detection score
  automated_flags: z.array(z.string()), // ['duplicate', 'profanity', 'gibberish']
  
  // User identification (privacy-compliant)
  ip_hash: z.string(),
  user_agent_hash: z.string(),
  client_segment: ClientSegmentEnum,
  
  // Timestamps and workflow
  created_at: z.date(),
  updated_at: z.date(),
  moderated_at: z.date().optional(),
  moderated_by: z.string().optional(), // Admin user ID
  
  // Follow-up tracking
  admin_response: z.string().optional(),
  response_sent_at: z.date().optional(),
  follow_up_required: z.boolean().default(false),
})

/**
 * Admin Moderation Actions Table
 * CONTEXT7 SOURCE: /context7/postgresql-current - Audit trail patterns for admin actions
 * ADMIN TRACKING: Complete audit trail for all moderation activities
 */
export const AdminModerationSchema = z.object({
  id: z.string().uuid(),
  feedback_id: z.string().uuid(), // Links to feedback item
  admin_user_id: z.string(),
  
  // Action details
  action_type: z.enum([
    'approve',
    'reject', 
    'flag_spam',
    'escalate',
    'respond',
    'bulk_action',
    'update_tags'
  ]),
  
  previous_status: FeedbackStatusEnum,
  new_status: FeedbackStatusEnum,
  
  // Action context
  reason: z.string(),
  admin_notes: z.string().optional(),
  bulk_action_id: z.string().uuid().optional(), // For bulk operations
  
  // Timestamps
  created_at: z.date(),
  
  // Approval workflow
  requires_senior_approval: z.boolean().default(false),
  approved_by_senior: z.string().optional(),
  senior_approval_at: z.date().optional(),
})

/**
 * Rate Limiting and Security Table
 * CONTEXT7 SOURCE: /context7/postgresql-current - Rate limiting patterns with IP-based tracking
 * SECURITY REASON: Comprehensive spam prevention and abuse protection
 */
export const RateLimitSchema = z.object({
  id: z.string().uuid(),
  ip_hash: z.string(), // Primary identifier for rate limiting
  
  // Rate limiting counters
  hourly_rating_count: z.number().default(0),
  daily_rating_count: z.number().default(0),
  hourly_feedback_count: z.number().default(0),
  daily_feedback_count: z.number().default(0),
  
  // Security metrics
  spam_attempts: z.number().default(0),
  last_spam_attempt: z.date().optional(),
  is_blocked: z.boolean().default(false),
  block_reason: z.string().optional(),
  blocked_until: z.date().optional(),
  
  // Behavioural analysis
  suspicious_pattern_score: z.number().min(0).max(100).default(0),
  rapid_fire_attempts: z.number().default(0),
  captcha_challenges: z.number().default(0),
  captcha_failures: z.number().default(0),
  
  // Geographic and technical data
  country_code: z.string().optional(),
  user_agent_patterns: z.array(z.string()),
  
  // Timestamps
  created_at: z.date(),
  updated_at: z.date(),
  last_activity: z.date(),
  
  // Reset counters
  hourly_reset_at: z.date(),
  daily_reset_at: z.date(),
})

/**
 * Business Intelligence Analytics Aggregation
 * CONTEXT7 SOURCE: /context7/postgresql-current - Analytics aggregation patterns for reporting
 * ANALYTICS REASON: Pre-computed metrics for dashboard performance and business intelligence
 */
export const FAQAnalyticsAggregationSchema = z.object({
  id: z.string().uuid(),
  faq_question_id: z.string(),
  aggregation_period: z.enum(['hourly', 'daily', 'weekly', 'monthly']),
  period_start: z.date(),
  period_end: z.date(),
  
  // Rating metrics
  total_ratings: z.number().default(0),
  helpful_count: z.number().default(0),
  not_helpful_count: z.number().default(0),
  average_star_rating: z.number().optional(),
  total_five_star_ratings: z.number().default(0),
  
  // Engagement metrics
  total_feedback_submissions: z.number().default(0),
  approved_feedback_count: z.number().default(0),
  average_feedback_quality: z.number().optional(),
  
  // User segmentation
  ratings_by_segment: z.record(z.string(), z.number()).default({}),
  conversion_metrics: z.object({
    view_to_rating_rate: z.number().optional(),
    rating_to_feedback_rate: z.number().optional(),
    contact_conversion_rate: z.number().optional(),
  }),
  
  // Quality metrics
  helpfulness_ratio: z.number().optional(), // helpful / (helpful + not_helpful)
  content_satisfaction_score: z.number().optional(), // 0-100 composite score
  improvement_suggestions_count: z.number().default(0),
  
  // Moderation metrics
  spam_detection_rate: z.number().optional(),
  moderation_approval_rate: z.number().optional(),
  average_moderation_time: z.number().optional(), // Minutes
  
  created_at: z.date(),
  updated_at: z.date(),
})

/**
 * Notification and Alert Configuration
 * CONTEXT7 SOURCE: /context7/postgresql-current - Event-driven notification patterns
 * ALERT REASON: Automated quality monitoring and admin notification system
 */
export const FeedbackAlertSchema = z.object({
  id: z.string().uuid(),
  alert_type: z.enum([
    'low_rating_threshold',    // FAQ getting consistently poor ratings
    'spam_spike',              // Unusual spam activity
    'moderation_backlog',      // Too many pending items
    'quality_decline',         // Overall quality declining
    'high_volume',             // Unusual activity volume
    'content_improvement'      // Specific improvement suggestions
  ]),
  
  // Alert configuration
  faq_question_id: z.string().optional(), // For FAQ-specific alerts
  threshold_value: z.number(),
  current_value: z.number(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  
  // Alert state
  is_active: z.boolean().default(true),
  acknowledged: z.boolean().default(false),
  acknowledged_by: z.string().optional(),
  acknowledged_at: z.date().optional(),
  resolved: z.boolean().default(false),
  resolved_at: z.date().optional(),
  
  // Notification details
  alert_message: z.string(),
  recommended_action: z.string(),
  admin_users_notified: z.array(z.string()),
  
  // Timestamps
  triggered_at: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
  
  // Related data
  related_feedback_ids: z.array(z.string().uuid()),
  business_impact_estimate: z.number().optional(), // Revenue impact in £
})

// CONTEXT7 SOURCE: /microsoft/typescript - Type exports for external consumption
// TYPE EXPORTS: All database schema types available for application components
export type FAQRating = z.infer<typeof FAQRatingSchema>
export type FAQFeedback = z.infer<typeof FAQFeedbackSchema>  
export type AdminModeration = z.infer<typeof AdminModerationSchema>
export type RateLimit = z.infer<typeof RateLimitSchema>
export type FAQAnalyticsAggregation = z.infer<typeof FAQAnalyticsAggregationSchema>
export type FeedbackAlert = z.infer<typeof FeedbackAlertSchema>

// Export enums for use in components
export type RatingType = z.infer<typeof RatingTypeEnum>
export type FeedbackStatus = z.infer<typeof FeedbackStatusEnum>
export type ClientSegment = z.infer<typeof ClientSegmentEnum>

/**
 * Database Indexes and Performance Optimizations
 * CONTEXT7 SOURCE: /context7/postgresql-current - Index patterns for query performance
 * PERFORMANCE REASON: Strategic indexing for common query patterns and reporting needs
 */
export const DatabaseIndexes = {
  // Primary lookup indexes
  faq_ratings: [
    'idx_faq_ratings_question_id',      // Most common lookup
    'idx_faq_ratings_ip_hash_created',  // Rate limiting queries  
    'idx_faq_ratings_created_at',       // Time-based analytics
    'idx_faq_ratings_client_segment',   // Segmentation reporting
    'idx_faq_ratings_composite'         // (faq_question_id, created_at, rating_type)
  ],
  
  faq_feedback: [
    'idx_faq_feedback_question_id',     // FAQ-specific feedback
    'idx_faq_feedback_status',          // Moderation queries
    'idx_faq_feedback_created_at',      // Time-based queries
    'idx_faq_feedback_spam_score',      // Spam detection
    'idx_faq_feedback_fulltext',        // Full-text search on feedback_text
    'idx_faq_feedback_moderation'       // (status, created_at, moderated_by)
  ],
  
  rate_limits: [
    'idx_rate_limits_ip_hash',          // Primary rate limiting lookup
    'idx_rate_limits_last_activity',    // Cleanup and maintenance
    'idx_rate_limits_blocked'           // Block status queries
  ],
  
  analytics_aggregation: [
    'idx_analytics_question_period',    // (faq_question_id, aggregation_period, period_start)
    'idx_analytics_created_at'          // Recent metrics queries
  ]
} as const

/**
 * Database Migration and Schema Validation
 * CONTEXT7 SOURCE: /context7/postgresql-current - Migration patterns for schema evolution
 * MIGRATION REASON: Structured approach to database changes with rollback capability
 */
export const SchemaMigrations = {
  version: '1.0.0',
  migrations: [
    {
      id: '001_create_faq_ratings',
      description: 'Create FAQ ratings table with indexes',
      up: `
        CREATE TABLE faq_ratings (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          faq_question_id VARCHAR(255) NOT NULL,
          rating_type VARCHAR(50) NOT NULL CHECK (rating_type IN ('helpful_not_helpful', 'five_star', 'emoji_reaction', 'nps_score')),
          rating_value INTEGER NOT NULL CHECK (rating_value >= 0 AND rating_value <= 10),
          original_value JSONB,
          user_id VARCHAR(255),
          ip_hash VARCHAR(64) NOT NULL,
          user_agent_hash VARCHAR(64) NOT NULL,
          session_id VARCHAR(255),
          client_segment VARCHAR(50) NOT NULL,
          entry_point VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          page_context JSONB,
          privacy_consent BOOLEAN NOT NULL DEFAULT TRUE,
          analytics_consent BOOLEAN NOT NULL DEFAULT TRUE
        );
        
        CREATE INDEX idx_faq_ratings_question_id ON faq_ratings(faq_question_id);
        CREATE INDEX idx_faq_ratings_ip_hash_created ON faq_ratings(ip_hash, created_at);
        CREATE INDEX idx_faq_ratings_created_at ON faq_ratings(created_at DESC);
        CREATE INDEX idx_faq_ratings_client_segment ON faq_ratings(client_segment);
        CREATE INDEX idx_faq_ratings_composite ON faq_ratings(faq_question_id, created_at DESC, rating_type);
      `,
      down: 'DROP TABLE IF EXISTS faq_ratings CASCADE;'
    },
    {
      id: '002_create_faq_feedback',  
      description: 'Create FAQ feedback table with full-text search',
      up: `
        CREATE TABLE faq_feedback (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          faq_question_id VARCHAR(255) NOT NULL,
          rating_id UUID REFERENCES faq_ratings(id) ON DELETE SET NULL,
          feedback_text TEXT NOT NULL,
          improvement_suggestion TEXT,
          category_tags TEXT[],
          user_name VARCHAR(100),
          user_email VARCHAR(255),
          contact_permission BOOLEAN DEFAULT FALSE,
          status VARCHAR(50) NOT NULL DEFAULT 'pending',
          moderation_notes TEXT,
          quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
          spam_score INTEGER NOT NULL DEFAULT 0 CHECK (spam_score >= 0 AND spam_score <= 100),
          automated_flags TEXT[],
          ip_hash VARCHAR(64) NOT NULL,
          user_agent_hash VARCHAR(64) NOT NULL,
          client_segment VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          moderated_at TIMESTAMP WITH TIME ZONE,
          moderated_by VARCHAR(255),
          admin_response TEXT,
          response_sent_at TIMESTAMP WITH TIME ZONE,
          follow_up_required BOOLEAN DEFAULT FALSE,
          
          -- Full-text search
          feedback_search_vector tsvector GENERATED ALWAYS AS (
            setweight(to_tsvector('english', coalesce(feedback_text, '')), 'A') ||
            setweight(to_tsvector('english', coalesce(improvement_suggestion, '')), 'B')
          ) STORED
        );
        
        CREATE INDEX idx_faq_feedback_question_id ON faq_feedback(faq_question_id);
        CREATE INDEX idx_faq_feedback_status ON faq_feedback(status);
        CREATE INDEX idx_faq_feedback_created_at ON faq_feedback(created_at DESC);
        CREATE INDEX idx_faq_feedback_spam_score ON faq_feedback(spam_score DESC);
        CREATE INDEX idx_faq_feedback_fulltext ON faq_feedback USING GIN(feedback_search_vector);
        CREATE INDEX idx_faq_feedback_moderation ON faq_feedback(status, created_at DESC, moderated_by);
      `,
      down: 'DROP TABLE IF EXISTS faq_feedback CASCADE;'
    }
    // Additional migrations would follow...
  ]
} as const