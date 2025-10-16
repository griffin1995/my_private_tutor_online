import { NextRequest, NextResponse } from 'next/server';
import { createInfrastructureMonitor } from '@/lib/infrastructure/monitoring';
interface HealthCheckResponse {
	status: 'healthy' | 'degraded' | 'unhealthy';
	timestamp: string;
	uptime: number;
	version: string;
	environment: string;
	services: {
		database: ServiceHealth;
		backup: ServiceHealth;
		api: ServiceHealth;
		infrastructure: ServiceHealth;
	};
	metrics: {
		responseTime: number;
		errorRate: number;
		memoryUsage: number;
		lastBackup: string;
		recoveryTimeObjective: number;
		recoveryPointObjective: number;
	};
	alerts: AlertSummary[];
}
interface ServiceHealth {
	status: 'up' | 'down' | 'degraded';
	responseTime: number;
	uptime: number;
	lastCheck: string;
	details?: string;
}
interface AlertSummary {
	level: 'warning' | 'critical' | 'info';
	message: string;
	timestamp: string;
	service: string;
}
export async function GET(request: NextRequest): Promise<NextResponse> {
	const startTime = Date.now();
	try {
		const monitor = createInfrastructureMonitor();
		const healthMetrics = await monitor.getApplicationHealth();
		const healthResponse: HealthCheckResponse = {
			status: healthMetrics.status,
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			version: process.env.npm_package_version || '1.0.0',
			environment: process.env.NODE_ENV || 'development',
			services: {
				database: {
					status: healthMetrics.services.database.status,
					responseTime: healthMetrics.services.database.responseTime,
					uptime: healthMetrics.services.database.uptime,
					lastCheck: healthMetrics.services.database.lastCheck,
					details:
						healthMetrics.services.database.errorCount > 0 ?
							'Connection issues detected'
						:	undefined,
				},
				backup: {
					status: healthMetrics.services.backup.status,
					responseTime: healthMetrics.services.backup.responseTime,
					uptime: healthMetrics.services.backup.uptime,
					lastCheck: healthMetrics.services.backup.lastCheck,
					details:
						healthMetrics.services.backup.errorCount > 0 ?
							'Backup system issues'
						:	undefined,
				},
				api: {
					status: healthMetrics.services.api.status,
					responseTime: healthMetrics.services.api.responseTime,
					uptime: healthMetrics.services.api.uptime,
					lastCheck: healthMetrics.services.api.lastCheck,
				},
				infrastructure: {
					status: healthMetrics.status === 'healthy' ? 'up' : 'degraded',
					responseTime: Date.now() - startTime,
					uptime: 99.9,
					lastCheck: new Date().toISOString(),
				},
			},
			metrics: {
				responseTime: healthMetrics.performance.responseTime,
				errorRate: healthMetrics.performance.errorRate,
				memoryUsage: healthMetrics.performance.memoryUsage,
				lastBackup: healthMetrics.rtoRpoMetrics.lastBackup,
				recoveryTimeObjective: healthMetrics.rtoRpoMetrics.recoveryTime,
				recoveryPointObjective: healthMetrics.rtoRpoMetrics.dataLossWindow,
			},
			alerts: await generateAlertSummary(healthMetrics),
		};
		const httpStatus = getHttpStatusFromHealth(healthResponse.status);
		return NextResponse.json(healthResponse, {
			status: httpStatus,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		});
	} catch (error) {
		console.error('Health check endpoint error:', error);
		const errorResponse: HealthCheckResponse = {
			status: 'unhealthy',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			version: process.env.npm_package_version || '1.0.0',
			environment: process.env.NODE_ENV || 'development',
			services: {
				database: {
					status: 'down',
					responseTime: 0,
					uptime: 0,
					lastCheck: new Date().toISOString(),
					details: 'Health check failed',
				},
				backup: {
					status: 'down',
					responseTime: 0,
					uptime: 0,
					lastCheck: new Date().toISOString(),
					details: 'Health check failed',
				},
				api: {
					status: 'up',
					responseTime: Date.now() - startTime,
					uptime: 99.9,
					lastCheck: new Date().toISOString(),
				},
				infrastructure: {
					status: 'down',
					responseTime: Date.now() - startTime,
					uptime: 0,
					lastCheck: new Date().toISOString(),
					details: error instanceof Error ? error.message : 'Unknown error',
				},
			},
			metrics: {
				responseTime: 0,
				errorRate: 100,
				memoryUsage: 0,
				lastBackup: 'unknown',
				recoveryTimeObjective: 30,
				recoveryPointObjective: 24,
			},
			alerts: [
				{
					level: 'critical',
					message: 'Health check system failure',
					timestamp: new Date().toISOString(),
					service: 'infrastructure',
				},
			],
		};
		return NextResponse.json(errorResponse, {
			status: 503,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
			},
		});
	}
}
async function generateAlertSummary(
	healthMetrics: any,
): Promise<AlertSummary[]> {
	const alerts: AlertSummary[] = [];
	const now = new Date().toISOString();
	if (healthMetrics.services.database.status === 'down') {
		alerts.push({
			level: 'critical',
			message: 'Database service is down',
			timestamp: now,
			service: 'database',
		});
	} else if (healthMetrics.services.database.responseTime > 1000) {
		alerts.push({
			level: 'warning',
			message: `Database response time is high: ${healthMetrics.services.database.responseTime}ms`,
			timestamp: now,
			service: 'database',
		});
	}
	if (healthMetrics.services.backup.status !== 'up') {
		alerts.push({
			level: 'warning',
			message: 'Backup system issues detected',
			timestamp: now,
			service: 'backup',
		});
	}
	if (healthMetrics.performance.errorRate > 5) {
		alerts.push({
			level: 'warning',
			message: `High error rate: ${healthMetrics.performance.errorRate}%`,
			timestamp: now,
			service: 'api',
		});
	}
	if (healthMetrics.performance.memoryUsage > 80) {
		alerts.push({
			level: 'warning',
			message: `High memory usage: ${healthMetrics.performance.memoryUsage}%`,
			timestamp: now,
			service: 'infrastructure',
		});
	}
	const backupAge = await calculateBackupAge(
		healthMetrics.rtoRpoMetrics.lastBackup,
	);
	if (backupAge > 26) {
		alerts.push({
			level: 'critical',
			message: `Backup is stale: ${backupAge.toFixed(1)} hours old`,
			timestamp: now,
			service: 'backup',
		});
	}
	return alerts;
}
function getHttpStatusFromHealth(
	status: 'healthy' | 'degraded' | 'unhealthy',
): number {
	switch (status) {
		case 'healthy':
			return 200;
		case 'degraded':
			return 200;
		case 'unhealthy':
			return 503;
		default:
			return 503;
	}
}
async function calculateBackupAge(
	lastBackupTimestamp: string,
): Promise<number> {
	try {
		const lastBackup = new Date(lastBackupTimestamp);
		const now = new Date();
		const ageMs = now.getTime() - lastBackup.getTime();
		return ageMs / (1000 * 60 * 60);
	} catch {
		return 999;
	}
}
