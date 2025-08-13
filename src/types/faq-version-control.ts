/**
 * FAQ Content Versioning System - TypeScript Interfaces
 * 
 * CONTEXT7 SOURCE: /semantic-release/semantic-release - Semantic versioning patterns and workflow automation
 * CONTEXT7 SOURCE: /google/diff-match-patch - Text diffing algorithms for change detection
 * IMPLEMENTATION REASON: Git-like versioning system with comprehensive audit trail
 * 
 * This module provides complete version control functionality for FAQ content including:
 * - Semantic versioning (major.minor.patch) for FAQ content changes
 * - Git-like diff tracking with visual comparison capabilities
 * - Approval workflow with role-based permissions
 * - Rollback functionality with impact analysis
 * - Comprehensive audit trail for compliance requirements
 * 
 * BUSINESS REQUIREMENTS:
 * - Royal client quality standards for content management
 * - GDPR-compliant audit trails with anonymisation options
 * - Performance optimised for 1000+ FAQ versions
 * - British English throughout admin interfaces
 */

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Semantic versioning specification for automated releases
// VERSION CONTROL: Semantic versioning following official semver.org specification
export interface SemanticVersion {
  readonly major: number;      // Breaking changes to FAQ structure
  readonly minor: number;      // New FAQ content or significant updates
  readonly patch: number;      // Bug fixes, typos, minor improvements
  readonly prerelease?: string; // alpha, beta, rc pre-release identifiers
  readonly build?: string;     // Build metadata (+20231201.1)
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Change type classification for automated version bumping
// CHANGE CLASSIFICATION: Standard semantic release change types
export type VersionChangeType = 
  | 'major'        // Breaking changes (structure changes, removed FAQs)
  | 'minor'        // Features (new FAQs, significant content updates)
  | 'patch'        // Fixes (typos, formatting, minor corrections)
  | 'prerelease'   // Pre-release versions for testing
  | 'build';       // Build-only changes (no content impact)

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Branch-based workflow configuration
// WORKFLOW STATUS: Git-like workflow states for content approval process
export type VersionWorkflowStatus = 
  | 'draft'        // Initial draft, editing in progress
  | 'review'       // Submitted for review, awaiting approval
  | 'approved'     // Review complete, ready for publication
  | 'published'    // Live version, publicly visible
  | 'archived'     // Historical version, no longer active
  | 'rejected';    // Review rejected, requires revision

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Role-based access control for release automation
// PERMISSION SYSTEM: Role-based permissions for content management workflow
export type UserRole = 
  | 'author'       // Can create and edit draft content
  | 'reviewer'     // Can review and approve/reject content
  | 'publisher'    // Can publish approved content
  | 'admin'        // Full access to all operations including rollback
  | 'viewer';      // Read-only access to published content

// CONTEXT7 SOURCE: /google/diff-match-patch - Diff operation types for text comparison
// DIFF OPERATIONS: Standard diff operations for change tracking
export type DiffOperationType = 
  | 'insert'       // Text insertion (addition)
  | 'delete'       // Text deletion (removal)
  | 'equal'        // Unchanged text (context)
  | 'replace';     // Text replacement (modification)

// CONTEXT7 SOURCE: /google/diff-match-patch - Diff patch format for representing changes
// DIFF REPRESENTATION: Individual diff operation structure
export interface DiffOperation {
  readonly type: DiffOperationType;
  readonly text: string;
  readonly position: number;      // Character position in original text
  readonly length: number;        // Length of operation
  readonly lineNumber?: number;   // Line number for display purposes
}

// CONTEXT7 SOURCE: /google/diff-match-patch - Comprehensive diff result with metadata
// CHANGE TRACKING: Complete diff information between versions
export interface VersionDiff {
  readonly additions: number;           // Count of added characters
  readonly deletions: number;          // Count of deleted characters
  readonly modifications: number;      // Count of modified sections
  readonly operations: readonly DiffOperation[];  // Detailed diff operations
  readonly summary: string;            // Human-readable change summary
  readonly impactLevel: 'minor' | 'moderate' | 'major';  // Change significance
  readonly affectedFields: readonly string[];   // FAQ fields that changed
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface extension patterns for type safety
// ENTITY VERSIONING: Core version entity extending existing FAQ structure
export interface FAQVersion {
  readonly id: string;                    // Unique version identifier
  readonly faqId: string;                 // Reference to parent FAQ
  readonly version: SemanticVersion;      // Semantic version number
  readonly versionString: string;         // Full version (e.g., "2.1.3-beta.1")
  readonly content: {
    readonly question: string;
    readonly answer: string;
    readonly category: string;
    readonly subcategory?: string;
    readonly tags: readonly string[];
    readonly priority: number;
    readonly searchKeywords: readonly string[];
    readonly relatedFAQs: readonly string[];
    readonly clientSegment?: string;
    readonly difficulty: 'basic' | 'intermediate' | 'advanced';
    readonly estimatedReadTime: number;
    readonly featured: boolean;
  };
  readonly metadata: {
    readonly author: string;              // Author identification
    readonly authorEmail: string;         // Contact information
    readonly timestamp: string;           // ISO 8601 creation timestamp
    readonly changeReason: string;        // Reason for this version
    readonly changeType: VersionChangeType;  // Semantic change classification
    readonly reviewNotes?: string;        // Review comments
    readonly parentVersion?: string;      // Previous version reference
    readonly branchName?: string;         // Git-like branch concept
  };
  readonly workflow: {
    readonly status: VersionWorkflowStatus;  // Current workflow state
    readonly submittedAt?: string;        // Submission timestamp
    readonly reviewedAt?: string;         // Review completion timestamp
    readonly publishedAt?: string;        // Publication timestamp
    readonly reviewer?: string;           // Reviewer identification
    readonly publisher?: string;          // Publisher identification
  };
  readonly diff?: VersionDiff;            // Changes from previous version
  readonly analytics: {
    readonly performanceDelta?: {         // Performance impact of changes
      readonly viewsChange: number;
      readonly helpfulnessChange: number;
      readonly searchRankChange: number;
    };
  };
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Release history tracking with comprehensive metadata
// VERSION HISTORY: Complete version timeline for FAQ entity
export interface FAQVersionHistory {
  readonly faqId: string;
  readonly currentVersion: string;        // Current published version
  readonly versions: readonly FAQVersion[];     // All versions chronologically
  readonly totalVersions: number;
  readonly createdAt: string;             // First version timestamp
  readonly lastModified: string;          // Most recent change timestamp
  readonly branches: readonly string[];         // Available branches
  readonly tags: readonly {               // Important version markers
    readonly version: string;
    readonly label: string;               // e.g., "stable", "hotfix"
    readonly timestamp: string;
  }[];
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Workflow automation configuration
// APPROVAL WORKFLOW: Configurable workflow rules and permissions
export interface VersionWorkflowConfig {
  readonly workflowEnabled: boolean;
  readonly requireReview: boolean;        // Mandate review step
  readonly allowSelfReview: boolean;      // Author can review own changes
  readonly requireApproval: boolean;      // Mandate approval step
  readonly autoPublish: boolean;          // Automatic publication after approval
  readonly minimumReviewers: number;      // Required reviewer count
  readonly allowedReviewers: readonly string[];  // Authorised reviewer list
  readonly allowedPublishers: readonly string[]; // Authorised publisher list
  readonly notificationSettings: {
    readonly emailNotifications: boolean;
    readonly slackIntegration?: string;   // Slack webhook URL
    readonly notifyOnSubmission: boolean;
    readonly notifyOnReview: boolean;
    readonly notifyOnPublication: boolean;
  };
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Scheduled release management
// SCHEDULED PUBLISHING: Time-based content publication system
export interface ScheduledPublication {
  readonly id: string;
  readonly versionId: string;             // Target version to publish
  readonly scheduledFor: string;          // ISO 8601 publication timestamp
  readonly timezone: string;              // Timezone identifier
  readonly status: 'pending' | 'published' | 'cancelled' | 'failed';
  readonly createdBy: string;             // Scheduler identification
  readonly createdAt: string;             // Schedule creation timestamp
  readonly publishedAt?: string;          // Actual publication timestamp
  readonly failureReason?: string;        // Error details if failed
  readonly retryCount: number;            // Automatic retry attempts
  readonly maxRetries: number;            // Maximum retry limit
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Rollback operation tracking with impact analysis
// ROLLBACK SYSTEM: Safe version rollback with impact assessment
export interface VersionRollback {
  readonly id: string;
  readonly fromVersion: string;           // Version being rolled back from
  readonly toVersion: string;             // Target rollback version
  readonly initiatedBy: string;           // User who initiated rollback
  readonly initiatedAt: string;           // Rollback initiation timestamp
  readonly reason: string;                // Rollback justification
  readonly impactAnalysis: {
    readonly affectedFAQs: number;        // Count of affected FAQ entries
    readonly relatedFAQsImpact: readonly string[];  // Related FAQ IDs
    readonly searchImpact: {              // SEO and search implications
      readonly keywordsAffected: readonly string[];
      readonly rankingImpact: 'none' | 'minor' | 'moderate' | 'significant';
    };
    readonly userImpact: {                // User experience implications
      readonly contentAvailability: 'maintained' | 'reduced' | 'improved';
      readonly navigationImpact: 'none' | 'minor' | 'moderate' | 'significant';
    };
  };
  readonly status: 'pending' | 'completed' | 'failed' | 'cancelled';
  readonly completedAt?: string;          // Rollback completion timestamp
  readonly failureReason?: string;        // Error details if failed
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Comprehensive audit trail for compliance requirements
// AUDIT SYSTEM: Complete audit trail for regulatory compliance
export interface VersionAuditEntry {
  readonly id: string;
  readonly timestamp: string;             // ISO 8601 event timestamp
  readonly action: 'create' | 'update' | 'review' | 'approve' | 'reject' | 'publish' | 'rollback' | 'archive';
  readonly entityType: 'version' | 'workflow' | 'schedule' | 'rollback';
  readonly entityId: string;              // Target entity identifier
  readonly userId: string;                // Acting user identification
  readonly userRole: UserRole;            // User's role at time of action
  readonly details: {
    readonly before?: any;                // State before change (JSON)
    readonly after?: any;                 // State after change (JSON)
    readonly metadata: Record<string, unknown>;  // Additional context
  };
  readonly ipAddress?: string;            // User IP (GDPR-aware)
  readonly userAgent?: string;            // Browser information
  readonly sessionId?: string;            // Session tracking
  readonly complianceFlags: {
    readonly gdprCompliant: boolean;      // GDPR compliance status
    readonly dataRetentionApplied: boolean;  // Data retention policy applied
    readonly anonymisationLevel: 'none' | 'partial' | 'full';  // Privacy level
  };
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - System configuration for automated workflows
// SYSTEM CONFIGURATION: Global version control system settings
export interface VersionControlConfig {
  readonly systemEnabled: boolean;
  readonly defaultWorkflow: VersionWorkflowConfig;
  readonly versioningStrategy: {
    readonly autoIncrement: boolean;      // Automatic version incrementation
    readonly branchingEnabled: boolean;   // Git-like branching support
    readonly taggedReleases: boolean;     // Version tagging system
    readonly prereleaseSupport: boolean;  // Alpha/beta version support
  };
  readonly retentionPolicy: {
    readonly maxVersionsPerFAQ: number;   // Version history limit
    readonly archiveAfterDays: number;    // Archive threshold
    readonly permanentDeleteAfterDays: number;  // Deletion threshold
    readonly auditLogRetentionDays: number;     // Audit retention period
  };
  readonly performance: {
    readonly diffCachingEnabled: boolean; // Cache diff calculations
    readonly asyncProcessing: boolean;    // Background processing
    readonly batchOperations: boolean;    // Bulk operation support
  };
  readonly integration: {
    readonly cmsSync: boolean;            // Sync with existing CMS
    readonly analyticsIntegration: boolean;  // Performance tracking
    readonly searchIndexUpdate: boolean;  // Search index maintenance
  };
}

// CONTEXT7 SOURCE: /google/diff-match-patch - Comparison request structure for diff generation
// COMPARISON INTERFACE: Version comparison request structure
export interface VersionComparisonRequest {
  readonly baseVersionId: string;        // Original version for comparison
  readonly targetVersionId: string;      // New version for comparison
  readonly compareOptions: {
    readonly includeMetadata: boolean;    // Include version metadata in diff
    readonly contextLines: number;        // Context lines around changes
    readonly ignoreWhitespace: boolean;   // Ignore whitespace-only changes
    readonly highlightSyntax: boolean;    // Syntax highlighting in diff
  };
}

// CONTEXT7 SOURCE: /google/diff-match-patch - Comprehensive comparison result with visual diff data
// COMPARISON RESULT: Complete version comparison with visual elements
export interface VersionComparisonResult {
  readonly baseVersion: FAQVersion;
  readonly targetVersion: FAQVersion;
  readonly diff: VersionDiff;
  readonly visualDiff: {
    readonly htmlDiff: string;            // HTML formatted diff
    readonly sideBySideDiff: {
      readonly leftColumn: string;        // Original content column
      readonly rightColumn: string;       // Modified content column
    };
    readonly inlineDiff: string;          // Unified diff format
  };
  readonly statistics: {
    readonly totalChanges: number;
    readonly additionsCount: number;
    readonly deletionsCount: number;
    readonly modificationsCount: number;
    readonly changePercentage: number;    // Percentage of content changed
  };
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Bulk operation support for efficiency
// BULK OPERATIONS: Batch processing interface for performance
export interface BulkVersionOperation {
  readonly operationType: 'approve' | 'reject' | 'publish' | 'archive' | 'rollback';
  readonly versionIds: readonly string[];
  readonly operatorId: string;            // User performing bulk operation
  readonly reason?: string;               // Optional justification
  readonly scheduledFor?: string;         // Optional scheduled execution
  readonly notifyUsers: boolean;          // Send notifications
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Operation result tracking with error handling
// BULK OPERATION RESULT: Batch processing results
export interface BulkOperationResult {
  readonly operationId: string;
  readonly status: 'completed' | 'partial' | 'failed';
  readonly processedCount: number;        // Successfully processed items
  readonly failedCount: number;           // Failed processing items
  readonly results: readonly {
    readonly versionId: string;
    readonly success: boolean;
    readonly error?: string;              // Error details if failed
  }[];
  readonly completedAt: string;
  readonly duration: number;              // Operation duration in milliseconds
}

// CONTEXT7 SOURCE: /semantic-release/semantic-release - Performance monitoring for version operations
// PERFORMANCE METRICS: System performance tracking
export interface VersionSystemMetrics {
  readonly totalVersions: number;
  readonly versionsToday: number;
  readonly averageProcessingTime: number;  // milliseconds
  readonly workflowEfficiency: {
    readonly averageReviewTime: number;   // hours
    readonly averageApprovalTime: number; // hours
    readonly automationRate: number;      // percentage
  };
  readonly systemHealth: {
    readonly uptime: number;              // percentage
    readonly errorRate: number;           // percentage
    readonly performanceScore: number;    // 0-100
  };
}