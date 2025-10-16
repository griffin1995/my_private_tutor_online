export enum AlertSeverity {
	CRITICAL = 'critical',
	WARNING = 'warning',
	INFO = 'info',
	DEBUG = 'debug',
}
export enum AlertType {
	PERFORMANCE = 'performance',
	ERROR = 'error',
	SECURITY = 'security',
	INFRASTRUCTURE = 'infrastructure',
	BUSINESS = 'business',
	CUSTOM = 'custom',
}
export interface AlertData {
	readonly alertId: string;
	readonly type: AlertType;
	readonly severity: AlertSeverity;
	readonly title: string;
	readonly message: string;
	readonly timestamp: number;
	readonly source: string;
	readonly tags: readonly string[];
	readonly metadata: Record<string, unknown>;
	readonly acknowledged: boolean;
	readonly resolvedAt?: number;
	readonly escalationLevel: number;
}
export interface SystemStatus {
	readonly systemId: string;
	readonly status: 'healthy' | 'degraded' | 'down' | 'maintenance';
	readonly lastChecked: number;
	readonly uptime: number;
	readonly activeAlerts: readonly AlertData[];
	readonly performanceBudgets: readonly PerformanceBudget[];
	readonly resourceUsage: ResourceUsage;
	readonly services: readonly ServiceStatus[];
}
export interface PerformanceBudget {
	readonly budgetId: string;
	readonly metric: string;
	readonly threshold: number;
	readonly currentValue: number;
	readonly status: 'within_budget' | 'warning' | 'critical' | 'exceeded';
	readonly lastUpdated: number;
	readonly trend: 'improving' | 'stable' | 'degrading';
}
export interface ResourceUsage {
	readonly cpu: {
		readonly usage: number;
		readonly cores: number;
		readonly loadAverage: readonly [number, number, number];
	};
	readonly memory: {
		readonly used: number;
		readonly total: number;
		readonly available: number;
		readonly percentage: number;
	};
	readonly disk: {
		readonly used: number;
		readonly total: number;
		readonly available: number;
		readonly percentage: number;
	};
	readonly network: {
		readonly bytesIn: number;
		readonly bytesOut: number;
		readonly packetsIn: number;
		readonly packetsOut: number;
	};
	readonly timestamp: number;
}
export interface ServiceStatus {
	readonly serviceId: string;
	readonly name: string;
	readonly status: 'running' | 'stopped' | 'error' | 'starting' | 'stopping';
	readonly version: string;
	readonly lastChecked: number;
	readonly responseTime: number;
	readonly errorRate: number;
	readonly dependencies: readonly ServiceDependency[];
	readonly healthChecks: readonly HealthCheck[];
}
export interface ServiceDependency {
	readonly dependencyId: string;
	readonly name: string;
	readonly type: 'database' | 'api' | 'cache' | 'queue' | 'storage' | 'external';
	readonly status: 'healthy' | 'unhealthy' | 'unknown';
	readonly lastChecked: number;
	readonly responseTime: number;
	readonly required: boolean;
}
export interface HealthCheck {
	readonly checkId: string;
	readonly name: string;
	readonly type: 'http' | 'tcp' | 'command' | 'custom';
	readonly endpoint?: string;
	readonly command?: string;
	readonly timeout: number;
	readonly interval: number;
	readonly retries: number;
	readonly status: 'passing' | 'failing' | 'warning';
	readonly lastRun: number;
	readonly nextRun: number;
	readonly output?: string;
	readonly error?: string;
}
export interface ErrorContext {
	readonly errorId: string;
	readonly timestamp: number;
	readonly level: 'error' | 'warning' | 'info' | 'debug';
	readonly message: string;
	readonly stack?: string;
	readonly code?: string | number;
	readonly category: string;
	readonly source: string;
	readonly userId?: string;
	readonly sessionId?: string;
	readonly requestId?: string;
	readonly userAgent?: string;
	readonly ip?: string;
	readonly url?: string;
	readonly method?: string;
	readonly headers?: Record<string, string>;
	readonly body?: Record<string, unknown>;
	readonly query?: Record<string, string>;
	readonly params?: Record<string, string>;
	readonly environment: string;
	readonly version: string;
	readonly tags: readonly string[];
	readonly fingerprint?: string;
	readonly resolved: boolean;
	readonly occurrences: number;
	readonly firstSeen: number;
	readonly lastSeen: number;
}
export interface NotificationChannel {
	readonly channelId: string;
	readonly type: 'email' | 'slack' | 'webhook' | 'sms' | 'discord' | 'teams';
	readonly name: string;
	readonly enabled: boolean;
	readonly configuration: NotificationConfiguration;
	readonly filters: readonly NotificationFilter[];
	readonly rateLimit: RateLimit;
	readonly failureCount: number;
	readonly lastSuccess: number;
	readonly lastFailure: number;
}
export type NotificationConfiguration =
	| EmailConfiguration
	| SlackConfiguration
	| WebhookConfiguration
	| SMSConfiguration;
export interface EmailConfiguration {
	readonly type: 'email';
	readonly recipients: readonly string[];
	readonly subject: string;
	readonly template: string;
	readonly smtpServer?: string;
	readonly fromAddress: string;
}
export interface SlackConfiguration {
	readonly type: 'slack';
	readonly webhookUrl: string;
	readonly channel: string;
	readonly username?: string;
	readonly iconEmoji?: string;
	readonly template: string;
}
export interface WebhookConfiguration {
	readonly type: 'webhook';
	readonly url: string;
	readonly method: 'POST' | 'PUT' | 'PATCH';
	readonly headers: Record<string, string>;
	readonly template: string;
	readonly timeout: number;
	readonly retries: number;
}
export interface SMSConfiguration {
	readonly type: 'sms';
	readonly phoneNumbers: readonly string[];
	readonly provider: string;
	readonly template: string;
}
export interface NotificationFilter {
	readonly filterId: string;
	readonly type: 'severity' | 'alertType' | 'source' | 'tag' | 'custom';
	readonly operator:
		| 'equals'
		| 'not_equals'
		| 'contains'
		| 'not_contains'
		| 'in'
		| 'not_in';
	readonly value: string | readonly string[];
	readonly enabled: boolean;
}
export interface RateLimit {
	readonly enabled: boolean;
	readonly maxNotifications: number;
	readonly timeWindow: number;
	readonly burstLimit: number;
	readonly backoffMultiplier: number;
	readonly maxBackoff: number;
}
export interface InfrastructureMonitor {
	readonly monitorId: string;
	readonly name: string;
	readonly type:
		| 'server'
		| 'database'
		| 'cache'
		| 'loadbalancer'
		| 'cdn'
		| 'external';
	readonly status: 'online' | 'offline' | 'degraded' | 'maintenance';
	readonly lastChecked: number;
	readonly uptime: number;
	readonly responseTime: number;
	readonly throughput: number;
	readonly errorRate: number;
	readonly metrics: InfrastructureMetrics;
	readonly alerts: readonly AlertData[];
	readonly configuration: InfrastructureConfiguration;
}
export interface InfrastructureMetrics {
	readonly timestamp: number;
	readonly availability: number;
	readonly responseTime: {
		readonly avg: number;
		readonly p50: number;
		readonly p95: number;
		readonly p99: number;
	};
	readonly throughput: {
		readonly requestsPerSecond: number;
		readonly bytesPerSecond: number;
	};
	readonly errors: {
		readonly rate: number;
		readonly count: number;
		readonly types: Record<string, number>;
	};
	readonly resources: ResourceUsage;
	readonly custom: Record<string, number>;
}
export interface InfrastructureConfiguration {
	readonly monitoringInterval: number;
	readonly timeout: number;
	readonly retries: number;
	readonly thresholds: {
		readonly responseTime: number;
		readonly errorRate: number;
		readonly availability: number;
		readonly cpu: number;
		readonly memory: number;
		readonly disk: number;
	};
	readonly alerting: {
		readonly enabled: boolean;
		readonly channels: readonly string[];
		readonly escalation: readonly EscalationRule[];
	};
}
export interface EscalationRule {
	readonly ruleId: string;
	readonly delay: number;
	readonly channels: readonly string[];
	readonly conditions: readonly EscalationCondition[];
	readonly maxEscalations: number;
}
export interface EscalationCondition {
	readonly conditionId: string;
	readonly field: string;
	readonly operator: 'equals' | 'greater_than' | 'less_than' | 'contains';
	readonly value: string | number;
}
export interface MonitoringDashboard {
	readonly dashboardId: string;
	readonly name: string;
	readonly description: string;
	readonly widgets: readonly DashboardWidget[];
	readonly layout: DashboardLayout;
	readonly refreshInterval: number;
	readonly timeRange: TimeRange;
	readonly filters: readonly DashboardFilter[];
	readonly permissions: DashboardPermissions;
}
export interface DashboardWidget {
	readonly widgetId: string;
	readonly type: 'chart' | 'table' | 'metric' | 'alert' | 'status' | 'custom';
	readonly title: string;
	readonly dataSource: string;
	readonly query: string;
	readonly visualization: VisualizationConfig;
	readonly position: WidgetPosition;
	readonly size: WidgetSize;
	readonly refreshInterval: number;
}
export interface VisualizationConfig {
	readonly type: 'line' | 'bar' | 'pie' | 'gauge' | 'heatmap' | 'table';
	readonly options: Record<string, unknown>;
	readonly axes?: AxisConfiguration;
	readonly legend?: LegendConfiguration;
	readonly colors?: readonly string[];
}
export interface AxisConfiguration {
	readonly x?: {
		readonly label: string;
		readonly type: 'time' | 'linear' | 'logarithmic' | 'category';
		readonly min?: number;
		readonly max?: number;
	};
	readonly y?: {
		readonly label: string;
		readonly type: 'linear' | 'logarithmic';
		readonly min?: number;
		readonly max?: number;
		readonly unit?: string;
	};
}
export interface LegendConfiguration {
	readonly enabled: boolean;
	readonly position: 'top' | 'bottom' | 'left' | 'right';
	readonly alignment: 'start' | 'center' | 'end';
}
export interface WidgetPosition {
	readonly x: number;
	readonly y: number;
}
export interface WidgetSize {
	readonly width: number;
	readonly height: number;
}
export interface DashboardLayout {
	readonly columns: number;
	readonly rows: number;
	readonly gridSize: number;
}
export interface TimeRange {
	readonly type: 'relative' | 'absolute';
	readonly start: number | string;
	readonly end: number | string;
}
export interface DashboardFilter {
	readonly filterId: string;
	readonly field: string;
	readonly operator:
		| 'equals'
		| 'not_equals'
		| 'contains'
		| 'regex'
		| 'in'
		| 'not_in';
	readonly value: string | readonly string[];
	readonly enabled: boolean;
}
export interface DashboardPermissions {
	readonly public: boolean;
	readonly users: readonly UserPermission[];
	readonly groups: readonly GroupPermission[];
}
export interface UserPermission {
	readonly userId: string;
	readonly role: 'viewer' | 'editor' | 'admin';
}
export interface GroupPermission {
	readonly groupId: string;
	readonly role: 'viewer' | 'editor' | 'admin';
}
export interface MonitoringEvent {
	readonly eventId: string;
	readonly type:
		| 'alert_created'
		| 'alert_resolved'
		| 'configuration_changed'
		| 'user_action'
		| 'system_event';
	readonly timestamp: number;
	readonly source: string;
	readonly userId?: string;
	readonly description: string;
	readonly metadata: Record<string, unknown>;
	readonly severity: AlertSeverity;
	readonly category: string;
	readonly tags: readonly string[];
}
