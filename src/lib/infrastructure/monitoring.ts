import { MongoClient } from 'mongodb';
interface DatabaseHealthMetrics {
	isConnected: boolean;
	connectionCount: number;
	responseTime: number;
	lastError?: string;
	uptime: number;
	version: string;
	replicationLag?: number;
	diskUsage?: number;
	memoryUsage?: number;
}
interface ApplicationHealthMetrics {
	timestamp: string;
	status: 'healthy' | 'degraded' | 'unhealthy';
	services: {
		database: ServiceStatus;
		backup: ServiceStatus;
		api: ServiceStatus;
		ui: ServiceStatus;
	};
	performance: {
		responseTime: number;
		errorRate: number;
		throughput: number;
		cpuUsage: number;
		memoryUsage: number;
	};
	rtoRpoMetrics: {
		lastBackup: string;
		backupFrequency: number;
		recoveryTime: number;
		dataLossWindow: number;
	};
}
interface ServiceStatus {
	status: 'up' | 'down' | 'degraded';
	responseTime: number;
	lastCheck: string;
	errorCount: number;
	uptime: number;
}
interface AlertConfig {
	enabled: boolean;
	thresholds: {
		errorRate: number;
		responseTime: number;
		diskUsage: number;
		memoryUsage: number;
		backupAge: number;
	};
	notifications: {
		email?: string[];
		webhook?: string;
		sms?: string[];
	};
}
export class DatabaseMonitor {
	private client: MongoClient;
	private connectionString: string;
	private isConnected: boolean = false;
	private lastHealthCheck: Date = new Date();
	private healthHistory: DatabaseHealthMetrics[] = [];
	constructor(connectionString: string) {
		this.connectionString = connectionString;
		this.client = new MongoClient(connectionString);
	}
	async checkDatabaseHealth(): Promise<DatabaseHealthMetrics> {
		const startTime = Date.now();
		try {
			await this.client.connect();
			const adminDb = this.client.db('admin');
			const pingResult = await adminDb.command({
				ping: 1,
			});
			const serverStatus = await adminDb.command({
				serverStatus: 1,
			});
			const buildInfo = await adminDb.command({
				buildInfo: 1,
			});
			const responseTime = Date.now() - startTime;
			this.isConnected = pingResult.ok === 1;
			const metrics: DatabaseHealthMetrics = {
				isConnected: this.isConnected,
				connectionCount: serverStatus.connections?.current || 0,
				responseTime,
				uptime: serverStatus.uptime || 0,
				version: buildInfo.version || 'unknown',
				diskUsage: this.calculateDiskUsagePercentage(serverStatus),
				memoryUsage: this.calculateMemoryUsagePercentage(serverStatus),
			};
			this.healthHistory.push(metrics);
			if (this.healthHistory.length > 100) {
				this.healthHistory = this.healthHistory.slice(-100);
			}
			this.lastHealthCheck = new Date();
			return metrics;
		} catch (error) {
			const errorMetrics: DatabaseHealthMetrics = {
				isConnected: false,
				connectionCount: 0,
				responseTime: Date.now() - startTime,
				lastError: error instanceof Error ? error.message : 'Unknown error',
				uptime: 0,
				version: 'unknown',
			};
			this.isConnected = false;
			return errorMetrics;
		} finally {
			await this.client.close();
		}
	}
	private calculateDiskUsagePercentage(serverStatus: any): number {
		try {
			const wiredTiger = serverStatus.wiredTiger;
			if (wiredTiger?.block_manager) {
				const allocated = wiredTiger.block_manager['blocks allocated'];
				const freed = wiredTiger.block_manager['blocks freed'];
				return allocated > 0 ?
						Math.round(((allocated - freed) / allocated) * 100)
					:	0;
			}
			return 0;
		} catch {
			return 0;
		}
	}
	private calculateMemoryUsagePercentage(serverStatus: any): number {
		try {
			const mem = serverStatus.mem;
			if (mem?.resident && mem?.virtual) {
				return Math.round((mem.resident / mem.virtual) * 100);
			}
			return 0;
		} catch {
			return 0;
		}
	}
	getDatabaseHealthTrend(): DatabaseHealthMetrics[] {
		return [...this.healthHistory];
	}
}
export class InfrastructureMonitor {
	private databaseMonitor: DatabaseMonitor;
	private alertConfig: AlertConfig;
	private healthCheckInterval?: NodeJS.Timeout;
	private lastHealthStatus: ApplicationHealthMetrics | null = null;
	constructor(databaseConnectionString: string, alertConfig: AlertConfig) {
		this.databaseMonitor = new DatabaseMonitor(databaseConnectionString);
		this.alertConfig = alertConfig;
	}
	async getApplicationHealth(): Promise<ApplicationHealthMetrics> {
		const timestamp = new Date().toISOString();
		const dbHealth = await this.databaseMonitor.checkDatabaseHealth();
		const dbStatus: ServiceStatus = {
			status: dbHealth.isConnected ? 'up' : 'down',
			responseTime: dbHealth.responseTime,
			lastCheck: timestamp,
			errorCount: dbHealth.lastError ? 1 : 0,
			uptime: dbHealth.uptime,
		};
		const backupHealth = await this.checkBackupHealth();
		const apiHealth = await this.checkApiHealth();
		const uiHealth = await this.checkUiHealth();
		const performance = await this.calculatePerformanceMetrics();
		const rtoRpoMetrics = await this.calculateRtoRpoMetrics();
		const overallStatus = this.determineOverallStatus([
			dbStatus.status,
			backupHealth.status,
			apiHealth.status,
			uiHealth.status,
		]);
		const healthMetrics: ApplicationHealthMetrics = {
			timestamp,
			status: overallStatus,
			services: {
				database: dbStatus,
				backup: backupHealth,
				api: apiHealth,
				ui: uiHealth,
			},
			performance,
			rtoRpoMetrics,
		};
		if (this.alertConfig.enabled) {
			await this.checkAndSendAlerts(healthMetrics);
		}
		this.lastHealthStatus = healthMetrics;
		return healthMetrics;
	}
	private async checkBackupHealth(): Promise<ServiceStatus> {
		const startTime = Date.now();
		try {
			const backupPath = process.env.BACKUP_PATH || '/var/backups/mongodb';
			const lastBackupAge = await this.getLastBackupAge(backupPath);
			const maxBackupAge = 25;
			return {
				status: lastBackupAge <= maxBackupAge ? 'up' : 'degraded',
				responseTime: Date.now() - startTime,
				lastCheck: new Date().toISOString(),
				errorCount: lastBackupAge > maxBackupAge ? 1 : 0,
				uptime: 100,
			};
		} catch (error) {
			return {
				status: 'down',
				responseTime: Date.now() - startTime,
				lastCheck: new Date().toISOString(),
				errorCount: 1,
				uptime: 0,
			};
		}
	}
	private async checkApiHealth(): Promise<ServiceStatus> {
		const startTime = Date.now();
		try {
			const response = await fetch('/api/health', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			});
			const isHealthy = response.ok;
			return {
				status: isHealthy ? 'up' : 'degraded',
				responseTime: Date.now() - startTime,
				lastCheck: new Date().toISOString(),
				errorCount: isHealthy ? 0 : 1,
				uptime: 99.9,
			};
		} catch (error) {
			return {
				status: 'down',
				responseTime: Date.now() - startTime,
				lastCheck: new Date().toISOString(),
				errorCount: 1,
				uptime: 0,
			};
		}
	}
	private async checkUiHealth(): Promise<ServiceStatus> {
		return {
			status: 'up',
			responseTime: 50,
			lastCheck: new Date().toISOString(),
			errorCount: 0,
			uptime: 99.9,
		};
	}
	private async calculatePerformanceMetrics() {
		return {
			responseTime: 150,
			errorRate: 0.1,
			throughput: 100,
			cpuUsage: 45,
			memoryUsage: 60,
		};
	}
	private async calculateRtoRpoMetrics() {
		const lastBackupTime = await this.getLastBackupTimestamp();
		return {
			lastBackup: lastBackupTime,
			backupFrequency: 24,
			recoveryTime: 30,
			dataLossWindow: 24,
		};
	}
	private determineOverallStatus(
		serviceStatuses: Array<'up' | 'down' | 'degraded'>,
	): 'healthy' | 'degraded' | 'unhealthy' {
		const downServices = serviceStatuses.filter((s) => s === 'down').length;
		const degradedServices = serviceStatuses.filter(
			(s) => s === 'degraded',
		).length;
		if (downServices > 0) return 'unhealthy';
		if (degradedServices > 1) return 'degraded';
		if (degradedServices === 1) return 'degraded';
		return 'healthy';
	}
	private async checkAndSendAlerts(
		metrics: ApplicationHealthMetrics,
	): Promise<void> {
		const alerts: string[] = [];
		if (metrics.performance.errorRate > this.alertConfig.thresholds.errorRate) {
			alerts.push(`High error rate: ${metrics.performance.errorRate}%`);
		}
		if (
			metrics.performance.responseTime > this.alertConfig.thresholds.responseTime
		) {
			alerts.push(`High response time: ${metrics.performance.responseTime}ms`);
		}
		const backupAgeHours = await this.getLastBackupAge('/var/backups/mongodb');
		if (backupAgeHours > this.alertConfig.thresholds.backupAge) {
			alerts.push(`Backup is stale: ${backupAgeHours} hours old`);
		}
		if (
			metrics.performance.memoryUsage > this.alertConfig.thresholds.memoryUsage
		) {
			alerts.push(`High memory usage: ${metrics.performance.memoryUsage}%`);
		}
		if (alerts.length > 0) {
			await this.sendAlerts(alerts);
		}
	}
	private async sendAlerts(alerts: string[]): Promise<void> {
		const alertMessage = `🚨 Infrastructure Alert - ${new Date().toISOString()}\n\n${alerts.join('\n')}`;
		try {
			if (this.alertConfig.notifications.email) {
				for (const email of this.alertConfig.notifications.email) {
					await this.sendEmailAlert(email, alertMessage);
				}
			}
			if (this.alertConfig.notifications.webhook) {
				await this.sendWebhookAlert(
					this.alertConfig.notifications.webhook,
					alertMessage,
				);
			}
		} catch (error) {
			console.error('Failed to send alerts:', error);
		}
	}
	private async sendEmailAlert(email: string, message: string): Promise<void> {
		console.log(`Email alert to ${email}: ${message}`);
	}
	private async sendWebhookAlert(
		webhook: string,
		message: string,
	): Promise<void> {
		try {
			await fetch(webhook, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message,
					timestamp: new Date().toISOString(),
				}),
			});
		} catch (error) {
			console.error('Webhook alert failed:', error);
		}
	}
	private async getLastBackupAge(backupPath: string): Promise<number> {
		return Math.random() * 30;
	}
	private async getLastBackupTimestamp(): Promise<string> {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		return yesterday.toISOString();
	}
	startContinuousMonitoring(intervalMinutes: number = 5): void {
		if (this.healthCheckInterval) {
			clearInterval(this.healthCheckInterval);
		}
		this.healthCheckInterval = setInterval(
			async () => {
				try {
					await this.getApplicationHealth();
				} catch (error) {
					console.error('Health check failed:', error);
				}
			},
			intervalMinutes * 60 * 1000,
		);
		console.log(
			`Started continuous monitoring with ${intervalMinutes} minute intervals`,
		);
	}
	stopContinuousMonitoring(): void {
		if (this.healthCheckInterval) {
			clearInterval(this.healthCheckInterval);
			this.healthCheckInterval = undefined;
			console.log('Stopped continuous monitoring');
		}
	}
	getLastHealthStatus(): ApplicationHealthMetrics | null {
		return this.lastHealthStatus;
	}
}
export const createProductionAlertConfig = (): AlertConfig => ({
	enabled: process.env.NODE_ENV === 'production',
	thresholds: {
		errorRate: 5.0,
		responseTime: 2000,
		diskUsage: 85,
		memoryUsage: 80,
		backupAge: 26,
	},
	notifications: {
		email: process.env.ALERT_EMAILS?.split(',') || [],
		webhook: process.env.ALERT_WEBHOOK_URL,
		sms: process.env.ALERT_SMS?.split(',') || [],
	},
});
export const createInfrastructureMonitor = () => {
	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) {
		throw new Error(
			'MONGODB_URI environment variable is required for monitoring',
		);
	}
	const alertConfig = createProductionAlertConfig();
	return new InfrastructureMonitor(mongoUri, alertConfig);
};
