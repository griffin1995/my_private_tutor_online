export {
	useVersionControlStore,
	useVersions,
	useCurrentUser,
	useSystemMetrics,
	useAuditLog,
	useVersionConfig,
	SemanticVersionUtils,
	DiffEngine,
} from './version-manager';
export {
	default as useVersionControl,
	useVersionHistory,
	useVersionComparison,
	useVersionMetrics,
	useVersionPermissions,
	useVersionUpdates,
	useVersionValidation,
	type UseVersionControlResult,
	type UseVersionHistoryResult,
	type UseVersionComparisonResult,
	type UseVersionMetricsResult,
} from '../../hooks/use-faq-version-control';
export {
	default as FAQVersionControlDashboard,
	VersionHistoryItem,
	MetricCard,
} from '../../components/admin/faq-version-control-dashboard';
export { default as FAQVersionDiffViewer } from '../../components/admin/faq-version-diff-viewer';
export { default as FAQVersionWorkflowManager } from '../../components/admin/faq-version-workflow-manager';
export type {
	FAQVersion,
	FAQVersionHistory,
	SemanticVersion,
	VersionChangeType,
	VersionWorkflowStatus,
	UserRole,
	DiffOperation,
	DiffOperationType,
	VersionDiff,
	VersionComparisonRequest,
	VersionComparisonResult,
	VersionWorkflowConfig,
	ScheduledPublication,
	VersionRollback,
	VersionAuditEntry,
	VersionControlConfig,
	VersionSystemMetrics,
	BulkVersionOperation,
	BulkOperationResult,
} from '../../types/faq-version-control';
export const VersionControlUtils = {
	isValidVersionString: (version: string): boolean => {
		const versionRegex =
			/^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/;
		return versionRegex.test(version);
	},
	compareVersionStrings: (a: string, b: string): number => {
		try {
			const versionA = SemanticVersionUtils.parse(a);
			const versionB = SemanticVersionUtils.parse(b);
			return SemanticVersionUtils.compare(versionA, versionB);
		} catch {
			return a.localeCompare(b);
		}
	},
	assessChangeImpact: (
		additions: number,
		deletions: number,
		modifications: number,
		originalSize: number,
	): 'minor' | 'moderate' | 'major' => {
		const totalChanges = additions + deletions + modifications;
		const changePercentage =
			originalSize > 0 ? (totalChanges / originalSize) * 100 : 100;
		if (changePercentage < 10) return 'minor';
		if (changePercentage < 50) return 'moderate';
		return 'major';
	},
	formatWorkflowStatus: (status: VersionWorkflowStatus): string => {
		const statusMap: Record<VersionWorkflowStatus, string> = {
			draft: 'Draft',
			review: 'Under Review',
			approved: 'Approved',
			published: 'Published',
			archived: 'Archived',
			rejected: 'Rejected',
		};
		return statusMap[status] || status;
	},
	formatTimestamp: (
		timestamp: string,
		options?: {
			includeTime?: boolean;
			includeSeconds?: boolean;
		},
	): string => {
		const date = new Date(timestamp);
		const { includeTime = true, includeSeconds = false } = options || {};
		const dateOptions: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		};
		if (includeTime) {
			dateOptions.hour = '2-digit';
			dateOptions.minute = '2-digit';
			if (includeSeconds) {
				dateOptions.second = '2-digit';
			}
			dateOptions.hour12 = false;
		}
		return date.toLocaleString('en-GB', dateOptions);
	},
	validateFAQContent: (
		content: any,
	): {
		isValid: boolean;
		errors: string[];
	} => {
		const errors: string[] = [];
		if (!content) {
			errors.push('Content is required');
			return {
				isValid: false,
				errors,
			};
		}
		const requiredFields = ['question', 'answer', 'category'];
		requiredFields.forEach((field) => {
			if (!content[field] || content[field].toString().trim().length === 0) {
				errors.push(
					`${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
				);
			}
		});
		if (content.question && content.question.length < 10) {
			errors.push('Question must be at least 10 characters long');
		}
		if (content.answer && content.answer.length < 20) {
			errors.push('Answer must be at least 20 characters long');
		}
		return {
			isValid: errors.length === 0,
			errors,
		};
	},
	canUserPerformAction: (
		userRole: UserRole | null,
		action: string,
		versionStatus?: VersionWorkflowStatus,
	): boolean => {
		if (!userRole) return false;
		const roleHierarchy: Record<UserRole, number> = {
			viewer: 1,
			author: 2,
			reviewer: 3,
			publisher: 4,
			admin: 5,
		};
		const actionPermissions: Record<
			string,
			{
				requiredRole: UserRole;
				allowedStatuses?: VersionWorkflowStatus[];
			}
		> = {
			create: {
				requiredRole: 'author',
			},
			edit: {
				requiredRole: 'author',
				allowedStatuses: ['draft'],
			},
			submit: {
				requiredRole: 'author',
				allowedStatuses: ['draft'],
			},
			review: {
				requiredRole: 'reviewer',
				allowedStatuses: ['review'],
			},
			approve: {
				requiredRole: 'reviewer',
				allowedStatuses: ['review'],
			},
			reject: {
				requiredRole: 'reviewer',
				allowedStatuses: ['review'],
			},
			publish: {
				requiredRole: 'publisher',
				allowedStatuses: ['approved'],
			},
			schedule: {
				requiredRole: 'publisher',
				allowedStatuses: ['approved'],
			},
			rollback: {
				requiredRole: 'admin',
			},
			archive: {
				requiredRole: 'publisher',
			},
			configure: {
				requiredRole: 'admin',
			},
		};
		const permission = actionPermissions[action];
		if (!permission) return false;
		const hasRequiredRole =
			roleHierarchy[userRole] >= roleHierarchy[permission.requiredRole];
		if (!hasRequiredRole) return false;
		if (permission.allowedStatuses && versionStatus) {
			return permission.allowedStatuses.includes(versionStatus);
		}
		return true;
	},
};
export const VersionControlConstants = {
	WORKFLOW_STATUSES: [
		'draft',
		'review',
		'approved',
		'published',
		'archived',
		'rejected',
	] as const,
	CHANGE_TYPES: ['major', 'minor', 'patch', 'prerelease', 'build'] as const,
	USER_ROLES: ['viewer', 'author', 'reviewer', 'publisher', 'admin'] as const,
	LIMITS: {
		MAX_VERSIONS_PER_FAQ: 100,
		MAX_AUDIT_LOG_ENTRIES: 1000,
		MAX_BULK_OPERATION_SIZE: 50,
		MAX_VERSION_CONTENT_SIZE: 100000,
		MAX_CHANGE_REASON_LENGTH: 500,
		MAX_REVIEW_NOTES_LENGTH: 1000,
	},
	PERFORMANCE: {
		DIFF_CALCULATION_TIMEOUT: 5000,
		BULK_OPERATION_TIMEOUT: 30000,
		VERSION_CREATION_TIMEOUT: 10000,
		COMPARISON_TIMEOUT: 15000,
	},
	UI: {
		DEFAULT_CONTEXT_LINES: 3,
		DEFAULT_PAGE_SIZE: 20,
		REFRESH_INTERVAL: 300000,
		AUTO_SAVE_INTERVAL: 30000,
		NOTIFICATION_DURATION: 5000,
	},
} as const;
export class VersionControlError extends Error {
	constructor(
		message: string,
		public readonly code: string,
		public readonly context?: Record<string, any>,
	) {
		super(message);
		this.name = 'VersionControlError';
	}
}
export class VersionNotFoundError extends VersionControlError {
	constructor(versionId: string) {
		super(`Version not found: ${versionId}`, 'VERSION_NOT_FOUND', {
			versionId,
		});
		this.name = 'VersionNotFoundError';
	}
}
export class InvalidWorkflowTransitionError extends VersionControlError {
	constructor(from: VersionWorkflowStatus, to: VersionWorkflowStatus) {
		super(
			`Invalid workflow transition from ${from} to ${to}`,
			'INVALID_WORKFLOW_TRANSITION',
			{
				from,
				to,
			},
		);
		this.name = 'InvalidWorkflowTransitionError';
	}
}
export class PermissionDeniedError extends VersionControlError {
	constructor(action: string, userRole?: UserRole) {
		super(
			`Permission denied for action: ${action}${userRole ? ` (role: ${userRole})` : ''}`,
			'PERMISSION_DENIED',
			{
				action,
				userRole,
			},
		);
		this.name = 'PermissionDeniedError';
	}
}
export class ValidationError extends VersionControlError {
	constructor(field: string, message: string, value?: any) {
		super(`Validation error for ${field}: ${message}`, 'VALIDATION_ERROR', {
			field,
			value,
		});
		this.name = 'ValidationError';
	}
}
export { SemanticVersionUtils, DiffEngine } from './version-manager';
const FAQVersionControl = {
	useVersionControlStore,
	useVersionControl,
	useVersionHistory,
	useVersionComparison,
	useVersionMetrics,
	useVersionPermissions,
	useVersionUpdates,
	useVersionValidation,
	FAQVersionControlDashboard,
	FAQVersionDiffViewer,
	FAQVersionWorkflowManager,
	SemanticVersionUtils,
	DiffEngine,
	VersionControlUtils,
	VersionControlConstants,
	VersionControlError,
	VersionNotFoundError,
	InvalidWorkflowTransitionError,
	PermissionDeniedError,
	ValidationError,
};
export default FAQVersionControl;
