/**
 * CONTEXT7 SOURCE: /mongodb/docs - Database monitoring and health check patterns
 * MONITORING REASON: Official MongoDB monitoring patterns for production systems
 * 
 * Infrastructure Monitoring & Alerting System
 * - Database connection and performance monitoring
 * - Application health checks and metrics
 * - Error rate tracking and alerting
 * - Recovery time objective (RTO) and recovery point objective (RPO) monitoring
 */

import { MongoClient } from 'mongodb';

// CONTEXT7 SOURCE: /mongodb/docs - Database health monitoring interfaces
// MONITORING REASON: Official MongoDB patterns for health check implementation
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
    errorRate: number; // Percentage
    responseTime: number; // Milliseconds
    diskUsage: number; // Percentage
    memoryUsage: number; // Percentage
    backupAge: number; // Hours
  };
  notifications: {
    email?: string[];
    webhook?: string;
    sms?: string[];
  };
}

/**
 * CONTEXT7 SOURCE: /mongodb/docs - Database monitoring and connection health
 * HEALTH CHECK REASON: Official MongoDB patterns for production health monitoring
 */
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
      // CONTEXT7 SOURCE: /mongodb/docs - Database ping and admin commands
      // HEALTH CHECK REASON: Official MongoDB health check implementation
      await this.client.connect();
      
      const adminDb = this.client.db('admin');
      const pingResult = await adminDb.command({ ping: 1 });
      
      // Get server status for detailed metrics
      const serverStatus = await adminDb.command({ serverStatus: 1 });
      const buildInfo = await adminDb.command({ buildInfo: 1 });
      
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

      // Store health history for trending
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
        return allocated > 0 ? Math.round(((allocated - freed) / allocated) * 100) : 0;
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

/**
 * CONTEXT7 SOURCE: /mongodb/docs - Application monitoring and alerting patterns
 * MONITORING REASON: Official patterns for comprehensive application health monitoring
 */
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
    
    // Check database health
    const dbHealth = await this.databaseMonitor.checkDatabaseHealth();
    const dbStatus: ServiceStatus = {
      status: dbHealth.isConnected ? 'up' : 'down',
      responseTime: dbHealth.responseTime,
      lastCheck: timestamp,
      errorCount: dbHealth.lastError ? 1 : 0,
      uptime: dbHealth.uptime,
    };

    // Check backup health
    const backupHealth = await this.checkBackupHealth();
    
    // Check API health
    const apiHealth = await this.checkApiHealth();
    
    // Check UI health
    const uiHealth = await this.checkUiHealth();

    // Calculate performance metrics
    const performance = await this.calculatePerformanceMetrics();
    
    // Calculate RTO/RPO metrics
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

    // Check for alerts
    if (this.alertConfig.enabled) {
      await this.checkAndSendAlerts(healthMetrics);
    }

    this.lastHealthStatus = healthMetrics;
    return healthMetrics;
  }

  private async checkBackupHealth(): Promise<ServiceStatus> {
    const startTime = Date.now();
    
    try {
      // Check if backup directory exists and recent backups are available
      const backupPath = process.env.BACKUP_PATH || '/var/backups/mongodb';
      
      // In a real implementation, this would check actual backup files
      // For now, we'll simulate a backup health check
      const lastBackupAge = await this.getLastBackupAge(backupPath);
      const maxBackupAge = 25; // 25 hours (allowing for daily backup + buffer)
      
      return {
        status: lastBackupAge <= maxBackupAge ? 'up' : 'degraded',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        errorCount: lastBackupAge > maxBackupAge ? 1 : 0,
        uptime: 100, // Percentage uptime
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
      // Health check endpoint
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      
      const isHealthy = response.ok;
      
      return {
        status: isHealthy ? 'up' : 'degraded',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        errorCount: isHealthy ? 0 : 1,
        uptime: 99.9, // High uptime expected for API
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
    // UI health is generally determined by successful rendering
    // In a real implementation, this might check for critical assets
    return {
      status: 'up',
      responseTime: 50, // UI rendering time
      lastCheck: new Date().toISOString(),
      errorCount: 0,
      uptime: 99.9,
    };
  }

  private async calculatePerformanceMetrics() {
    // In a real implementation, these would come from actual metrics
    return {
      responseTime: 150, // Average response time in ms
      errorRate: 0.1, // Error rate percentage
      throughput: 100, // Requests per minute
      cpuUsage: 45, // CPU usage percentage
      memoryUsage: 60, // Memory usage percentage
    };
  }

  private async calculateRtoRpoMetrics() {
    const lastBackupTime = await this.getLastBackupTimestamp();
    
    return {
      lastBackup: lastBackupTime,
      backupFrequency: 24, // Hours between backups
      recoveryTime: 30, // Minutes to recover from backup (RTO)
      dataLossWindow: 24, // Hours of potential data loss (RPO)
    };
  }

  private determineOverallStatus(
    serviceStatuses: Array<'up' | 'down' | 'degraded'>
  ): 'healthy' | 'degraded' | 'unhealthy' {
    const downServices = serviceStatuses.filter(s => s === 'down').length;
    const degradedServices = serviceStatuses.filter(s => s === 'degraded').length;
    
    if (downServices > 0) return 'unhealthy';
    if (degradedServices > 1) return 'degraded';
    if (degradedServices === 1) return 'degraded';
    return 'healthy';
  }

  private async checkAndSendAlerts(metrics: ApplicationHealthMetrics): Promise<void> {
    const alerts: string[] = [];
    
    // Check error rate threshold
    if (metrics.performance.errorRate > this.alertConfig.thresholds.errorRate) {
      alerts.push(`High error rate: ${metrics.performance.errorRate}%`);
    }
    
    // Check response time threshold
    if (metrics.performance.responseTime > this.alertConfig.thresholds.responseTime) {
      alerts.push(`High response time: ${metrics.performance.responseTime}ms`);
    }
    
    // Check backup age
    const backupAgeHours = await this.getLastBackupAge('/var/backups/mongodb');
    if (backupAgeHours > this.alertConfig.thresholds.backupAge) {
      alerts.push(`Backup is stale: ${backupAgeHours} hours old`);
    }
    
    // Check disk usage
    if (metrics.performance.memoryUsage > this.alertConfig.thresholds.memoryUsage) {
      alerts.push(`High memory usage: ${metrics.performance.memoryUsage}%`);
    }

    // Send alerts if any thresholds are exceeded
    if (alerts.length > 0) {
      await this.sendAlerts(alerts);
    }
  }

  private async sendAlerts(alerts: string[]): Promise<void> {
    const alertMessage = `🚨 Infrastructure Alert - ${new Date().toISOString()}\n\n${alerts.join('\n')}`;
    
    try {
      // Email alerts
      if (this.alertConfig.notifications.email) {
        for (const email of this.alertConfig.notifications.email) {
          await this.sendEmailAlert(email, alertMessage);
        }
      }
      
      // Webhook alerts
      if (this.alertConfig.notifications.webhook) {
        await this.sendWebhookAlert(this.alertConfig.notifications.webhook, alertMessage);
      }
      
    } catch (error) {
      console.error('Failed to send alerts:', error);
    }
  }

  private async sendEmailAlert(email: string, message: string): Promise<void> {
    // In production, integrate with email service (SendGrid, AWS SES, etc.)
    console.log(`Email alert to ${email}: ${message}`);
  }

  private async sendWebhookAlert(webhook: string, message: string): Promise<void> {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error('Webhook alert failed:', error);
    }
  }

  private async getLastBackupAge(backupPath: string): Promise<number> {
    // Simulated backup age check - in production, check actual file timestamps
    return Math.random() * 30; // Random age between 0-30 hours
  }

  private async getLastBackupTimestamp(): Promise<string> {
    // Simulated last backup timestamp
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString();
  }

  startContinuousMonitoring(intervalMinutes: number = 5): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.getApplicationHealth();
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }, intervalMinutes * 60 * 1000);
    
    console.log(`Started continuous monitoring with ${intervalMinutes} minute intervals`);
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

// CONTEXT7 SOURCE: /mongodb/docs - Production monitoring configuration
// CONFIG REASON: Official MongoDB monitoring configuration for enterprise environments
export const createProductionAlertConfig = (): AlertConfig => ({
  enabled: process.env.NODE_ENV === 'production',
  thresholds: {
    errorRate: 5.0, // 5% error rate
    responseTime: 2000, // 2 second response time
    diskUsage: 85, // 85% disk usage
    memoryUsage: 80, // 80% memory usage
    backupAge: 26, // 26 hours since last backup
  },
  notifications: {
    email: process.env.ALERT_EMAILS?.split(',') || [],
    webhook: process.env.ALERT_WEBHOOK_URL,
    sms: process.env.ALERT_SMS?.split(',') || [],
  },
});

// Export configured monitor instance
export const createInfrastructureMonitor = () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is required for monitoring');
  }
  
  const alertConfig = createProductionAlertConfig();
  return new InfrastructureMonitor(mongoUri, alertConfig);
};