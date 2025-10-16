export interface SemanticVersion {
	readonly major: number;
	readonly minor: number;
	readonly patch: number;
	readonly prerelease?: string;
	readonly build?: string;
}
export type VersionChangeType =
	| 'major'
	| 'minor'
	| 'patch'
	| 'prerelease'
	| 'build';
export type VersionWorkflowStatus =
	| 'draft'
	| 'review'
	| 'approved'
	| 'published'
	| 'archived'
	| 'rejected';
export type UserRole = 'author' | 'reviewer' | 'publisher' | 'admin' | 'viewer';
export type DiffOperationType = 'insert' | 'delete' | 'equal' | 'replace';
export interface DiffOperation {
	readonly type: DiffOperationType;
	readonly text: string;
	readonly position: number;
	readonly length: number;
	readonly lineNumber?: number;
}
export interface VersionDiff {
	readonly additions: number;
	readonly deletions: number;
	readonly modifications: number;
	readonly operations: readonly DiffOperation[];
	readonly summary: string;
	readonly impactLevel: 'minor' | 'moderate' | 'major';
	readonly affectedFields: readonly string[];
}
export interface FAQVersion {
	readonly id: string;
	readonly faqId: string;
	readonly version: SemanticVersion;
	readonly versionString: string;
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
		readonly author: string;
		readonly authorEmail: string;
		readonly timestamp: string;
		readonly changeReason: string;
		readonly changeType: VersionChangeType;
		readonly reviewNotes?: string;
		readonly parentVersion?: string;
		readonly branchName?: string;
	};
	readonly workflow: {
		readonly status: VersionWorkflowStatus;
		readonly submittedAt?: string;
		readonly reviewedAt?: string;
		readonly publishedAt?: string;
		readonly reviewer?: string;
		readonly publisher?: string;
	};
	readonly diff?: VersionDiff;
	readonly analytics: {
		readonly performanceDelta?: {
			readonly viewsChange: number;
			readonly helpfulnessChange: number;
			readonly searchRankChange: number;
		};
	};
}
export interface FAQVersionHistory {
	readonly faqId: string;
	readonly currentVersion: string;
	readonly versions: readonly FAQVersion[];
	readonly totalVersions: number;
	readonly createdAt: string;
	readonly lastModified: string;
	readonly branches: readonly string[];
	readonly tags: readonly {
		readonly version: string;
		readonly label: string;
		readonly timestamp: string;
	}[];
}
export interface VersionWorkflowConfig {
	readonly workflowEnabled: boolean;
	readonly requireReview: boolean;
	readonly allowSelfReview: boolean;
	readonly requireApproval: boolean;
	readonly autoPublish: boolean;
	readonly minimumReviewers: number;
	readonly allowedReviewers: readonly string[];
	readonly allowedPublishers: readonly string[];
	readonly notificationSettings: {
		readonly emailNotifications: boolean;
		readonly slackIntegration?: string;
		readonly notifyOnSubmission: boolean;
		readonly notifyOnReview: boolean;
		readonly notifyOnPublication: boolean;
	};
}
export interface ScheduledPublication {
	readonly id: string;
	readonly versionId: string;
	readonly scheduledFor: string;
	readonly timezone: string;
	readonly status: 'pending' | 'published' | 'cancelled' | 'failed';
	readonly createdBy: string;
	readonly createdAt: string;
	readonly publishedAt?: string;
	readonly failureReason?: string;
	readonly retryCount: number;
	readonly maxRetries: number;
}
export interface VersionRollback {
	readonly id: string;
	readonly fromVersion: string;
	readonly toVersion: string;
	readonly initiatedBy: string;
	readonly initiatedAt: string;
	readonly reason: string;
	readonly impactAnalysis: {
		readonly affectedFAQs: number;
		readonly relatedFAQsImpact: readonly string[];
		readonly searchImpact: {
			readonly keywordsAffected: readonly string[];
			readonly rankingImpact: 'none' | 'minor' | 'moderate' | 'significant';
		};
		readonly userImpact: {
			readonly contentAvailability: 'maintained' | 'reduced' | 'improved';
			readonly navigationImpact: 'none' | 'minor' | 'moderate' | 'significant';
		};
	};
	readonly status: 'pending' | 'completed' | 'failed' | 'cancelled';
	readonly completedAt?: string;
	readonly failureReason?: string;
}
export interface VersionAuditEntry {
	readonly id: string;
	readonly timestamp: string;
	readonly action:
		| 'create'
		| 'update'
		| 'review'
		| 'approve'
		| 'reject'
		| 'publish'
		| 'rollback'
		| 'archive';
	readonly entityType: 'version' | 'workflow' | 'schedule' | 'rollback';
	readonly entityId: string;
	readonly userId: string;
	readonly userRole: UserRole;
	readonly details: {
		readonly before?: any;
		readonly after?: any;
		readonly metadata: Record<string, unknown>;
	};
	readonly ipAddress?: string;
	readonly userAgent?: string;
	readonly sessionId?: string;
	readonly complianceFlags: {
		readonly gdprCompliant: boolean;
		readonly dataRetentionApplied: boolean;
		readonly anonymisationLevel: 'none' | 'partial' | 'full';
	};
}
export interface VersionControlConfig {
	readonly systemEnabled: boolean;
	readonly defaultWorkflow: VersionWorkflowConfig;
	readonly versioningStrategy: {
		readonly autoIncrement: boolean;
		readonly branchingEnabled: boolean;
		readonly taggedReleases: boolean;
		readonly prereleaseSupport: boolean;
	};
	readonly retentionPolicy: {
		readonly maxVersionsPerFAQ: number;
		readonly archiveAfterDays: number;
		readonly permanentDeleteAfterDays: number;
		readonly auditLogRetentionDays: number;
	};
	readonly performance: {
		readonly diffCachingEnabled: boolean;
		readonly asyncProcessing: boolean;
		readonly batchOperations: boolean;
	};
	readonly integration: {
		readonly cmsSync: boolean;
		readonly analyticsIntegration: boolean;
		readonly searchIndexUpdate: boolean;
	};
}
export interface VersionComparisonRequest {
	readonly baseVersionId: string;
	readonly targetVersionId: string;
	readonly compareOptions: {
		readonly includeMetadata: boolean;
		readonly contextLines: number;
		readonly ignoreWhitespace: boolean;
		readonly highlightSyntax: boolean;
	};
}
export interface VersionComparisonResult {
	readonly baseVersion: FAQVersion;
	readonly targetVersion: FAQVersion;
	readonly diff: VersionDiff;
	readonly visualDiff: {
		readonly htmlDiff: string;
		readonly sideBySideDiff: {
			readonly leftColumn: string;
			readonly rightColumn: string;
		};
		readonly inlineDiff: string;
	};
	readonly statistics: {
		readonly totalChanges: number;
		readonly additionsCount: number;
		readonly deletionsCount: number;
		readonly modificationsCount: number;
		readonly changePercentage: number;
	};
}
export interface BulkVersionOperation {
	readonly operationType:
		| 'approve'
		| 'reject'
		| 'publish'
		| 'archive'
		| 'rollback';
	readonly versionIds: readonly string[];
	readonly operatorId: string;
	readonly reason?: string;
	readonly scheduledFor?: string;
	readonly notifyUsers: boolean;
}
export interface BulkOperationResult {
	readonly operationId: string;
	readonly status: 'completed' | 'partial' | 'failed';
	readonly processedCount: number;
	readonly failedCount: number;
	readonly results: readonly {
		readonly versionId: string;
		readonly success: boolean;
		readonly error?: string;
	}[];
	readonly completedAt: string;
	readonly duration: number;
}
export interface VersionSystemMetrics {
	readonly totalVersions: number;
	readonly versionsToday: number;
	readonly averageProcessingTime: number;
	readonly workflowEfficiency: {
		readonly averageReviewTime: number;
		readonly averageApprovalTime: number;
		readonly automationRate: number;
	};
	readonly systemHealth: {
		readonly uptime: number;
		readonly errorRate: number;
		readonly performanceScore: number;
	};
}
