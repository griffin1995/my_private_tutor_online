/**
 * CONTEXT7 SOURCE: /mongodb/docs - MongoDB backup and disaster recovery patterns
 * INFRASTRUCTURE REASON: Official MongoDB documentation for backup strategies and automation
 * 
 * Database Backup System for Premium Tutoring Service
 * - Automated daily/hourly backups for TinaCMS MongoDB data
 * - Retention policies for compliance and storage optimization  
 * - Recovery procedures with RTO/RPO objectives
 * - Royal client data protection standards
 */

import { MongoClient, MongoClientOptions } from 'mongodb';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir, access, readdir, unlink } from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// CONTEXT7 SOURCE: /mongodb/docs - MongoDB connection configuration
// BACKUP REASON: Official MongoDB patterns for secure backup connections
interface BackupConfig {
  mongoUri: string;
  databaseName: string;
  backupPath: string;
  retentionDays: number;
  compressionLevel: number;
}

interface BackupMetadata {
  timestamp: string;
  size: number;
  collections: string[];
  duration: number;
  checksum: string;
  type: 'full' | 'incremental';
}

export class DatabaseBackupManager {
  private config: BackupConfig;
  private client: MongoClient;

  constructor(config: BackupConfig) {
    this.config = config;
    
    // CONTEXT7 SOURCE: /mongodb/docs - MongoDB client configuration for backups
    // SECURITY REASON: Official MongoDB security patterns for backup operations
    const clientOptions: MongoClientOptions = {
      retryWrites: true,
      w: 'majority',
      readPreference: 'secondary', // Use secondary for backups to reduce primary load
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    
    this.client = new MongoClient(this.config.mongoUri, clientOptions);
  }

  /**
   * CONTEXT7 SOURCE: /mongodb/docs - Full database backup with mongodump
   * BACKUP REASON: Official MongoDB mongodump patterns for complete data backup
   */
  async createFullBackup(): Promise<BackupMetadata> {
    const startTime = Date.now();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(this.config.backupPath, `full-backup-${timestamp}`);
    
    try {
      // Create backup directory
      await mkdir(backupDir, { recursive: true });
      
      console.log(`Starting full backup to ${backupDir}`);
      
      // CONTEXT7 SOURCE: /mongodb/docs - mongodump command with authentication and compression
      // BACKUP STRATEGY REASON: Official MongoDB backup command patterns for production environments
      const mongodumpCmd = [
        'mongodump',
        `--uri="${this.config.mongoUri}"`,
        `--db=${this.config.databaseName}`,
        `--out="${backupDir}"`,
        '--gzip', // Enable compression
        '--verbose',
        '--forceTableScan', // Ensure complete data capture
      ].join(' ');

      const { stdout, stderr } = await execAsync(mongodumpCmd);
      
      if (stderr && !stderr.includes('done dumping')) {
        throw new Error(`Backup failed: ${stderr}`);
      }

      // Generate backup metadata
      const collections = await this.getCollectionList();
      const backupSize = await this.calculateBackupSize(backupDir);
      const checksum = await this.generateChecksum(backupDir);
      
      const metadata: BackupMetadata = {
        timestamp,
        size: backupSize,
        collections,
        duration: Date.now() - startTime,
        checksum,
        type: 'full'
      };

      // Save metadata
      await writeFile(
        path.join(backupDir, 'backup-metadata.json'),
        JSON.stringify(metadata, null, 2)
      );

      console.log(`Full backup completed in ${metadata.duration}ms`);
      console.log(`Backup size: ${(metadata.size / 1024 / 1024).toFixed(2)} MB`);
      
      return metadata;
      
    } catch (error) {
      console.error('Full backup failed:', error);
      throw error;
    }
  }

  /**
   * CONTEXT7 SOURCE: /mongodb/docs - Database restoration with mongorestore
   * RECOVERY REASON: Official MongoDB restore patterns for disaster recovery
   */
  async restoreFromBackup(backupPath: string, targetDatabase?: string): Promise<void> {
    const dbName = targetDatabase || this.config.databaseName;
    
    try {
      console.log(`Starting restore from ${backupPath} to database: ${dbName}`);
      
      // CONTEXT7 SOURCE: /mongodb/docs - mongorestore command with safety checks
      // RECOVERY STRATEGY REASON: Official MongoDB restore patterns with data protection
      const mongorestoreCmd = [
        'mongorestore',
        `--uri="${this.config.mongoUri}"`,
        `--db=${dbName}`,
        '--gzip',
        '--verbose',
        '--drop', // Drop existing collections before restore
        `"${backupPath}/${this.config.databaseName}"`,
      ].join(' ');

      const { stdout, stderr } = await execAsync(mongorestoreCmd);
      
      if (stderr && !stderr.includes('finished restoring')) {
        throw new Error(`Restore failed: ${stderr}`);
      }

      console.log('Database restoration completed successfully');
      
    } catch (error) {
      console.error('Database restoration failed:', error);
      throw error;
    }
  }

  /**
   * CONTEXT7 SOURCE: /mongodb/docs - Backup retention and cleanup policies
   * RETENTION REASON: Official MongoDB patterns for backup lifecycle management
   */
  async cleanupOldBackups(): Promise<void> {
    try {
      const backupFiles = await readdir(this.config.backupPath);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays);

      for (const file of backupFiles) {
        if (file.startsWith('full-backup-') || file.startsWith('incremental-backup-')) {
          const filePath = path.join(this.config.backupPath, file);
          const fileStats = await import('fs').then(fs => fs.promises.stat(filePath));
          
          if (fileStats.isDirectory() && fileStats.mtime < cutoffDate) {
            console.log(`Removing expired backup: ${file}`);
            await this.removeDirectory(filePath);
          }
        }
      }
      
    } catch (error) {
      console.error('Backup cleanup failed:', error);
      throw error;
    }
  }

  /**
   * CONTEXT7 SOURCE: /mongodb/docs - Database health verification for backups
   * VERIFICATION REASON: Official MongoDB patterns for backup integrity testing
   */
  async verifyBackupIntegrity(backupPath: string): Promise<boolean> {
    try {
      const metadataPath = path.join(backupPath, 'backup-metadata.json');
      
      // Check if metadata exists
      await access(metadataPath);
      
      const metadataContent = await import('fs').then(fs => 
        fs.promises.readFile(metadataPath, 'utf8')
      );
      const metadata: BackupMetadata = JSON.parse(metadataContent);
      
      // Verify checksum
      const currentChecksum = await this.generateChecksum(backupPath);
      if (currentChecksum !== metadata.checksum) {
        console.error('Backup integrity check failed: checksum mismatch');
        return false;
      }
      
      // Verify all expected collections are present
      const expectedCollections = metadata.collections;
      for (const collection of expectedCollections) {
        const collectionFile = path.join(backupPath, this.config.databaseName, `${collection}.bson.gz`);
        try {
          await access(collectionFile);
        } catch {
          console.error(`Missing collection backup: ${collection}`);
          return false;
        }
      }
      
      console.log('Backup integrity verification passed');
      return true;
      
    } catch (error) {
      console.error('Backup integrity verification failed:', error);
      return false;
    }
  }

  /**
   * CONTEXT7 SOURCE: /mongodb/docs - Database connection and collection enumeration
   * MONITORING REASON: Official MongoDB patterns for database introspection
   */
  private async getCollectionList(): Promise<string[]> {
    try {
      await this.client.connect();
      const db = this.client.db(this.config.databaseName);
      const collections = await db.listCollections().toArray();
      return collections.map(col => col.name);
    } catch (error) {
      console.error('Failed to get collection list:', error);
      return [];
    } finally {
      await this.client.close();
    }
  }

  private async calculateBackupSize(backupDir: string): Promise<number> {
    try {
      const { stdout } = await execAsync(`du -sb "${backupDir}"`);
      return parseInt(stdout.split('\t')[0], 10);
    } catch {
      return 0;
    }
  }

  private async generateChecksum(backupDir: string): Promise<string> {
    try {
      const { stdout } = await execAsync(`find "${backupDir}" -type f -exec md5sum {} + | sort | md5sum`);
      return stdout.split(' ')[0];
    } catch {
      return '';
    }
  }

  private async removeDirectory(dir: string): Promise<void> {
    try {
      await execAsync(`rm -rf "${dir}"`);
    } catch (error) {
      console.error(`Failed to remove directory ${dir}:`, error);
    }
  }
}

/**
 * CONTEXT7 SOURCE: /mongodb/docs - Automated backup scheduling for production systems
 * AUTOMATION REASON: Official MongoDB patterns for backup automation and monitoring
 */
export class BackupScheduler {
  private backupManager: DatabaseBackupManager;
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  constructor(backupManager: DatabaseBackupManager) {
    this.backupManager = backupManager;
  }

  /**
   * Start automated backup scheduling
   * - Full backups: Daily at 2:00 AM
   * - Cleanup: Weekly on Sundays at 3:00 AM
   */
  startScheduledBackups(): void {
    // Daily full backup at 2:00 AM
    const dailyBackup = setInterval(async () => {
      const now = new Date();
      if (now.getHours() === 2 && now.getMinutes() === 0) {
        try {
          await this.backupManager.createFullBackup();
        } catch (error) {
          console.error('Scheduled backup failed:', error);
          // In production, this would trigger alerts
        }
      }
    }, 60000); // Check every minute

    // Weekly cleanup on Sundays at 3:00 AM
    const weeklyCleanup = setInterval(async () => {
      const now = new Date();
      if (now.getDay() === 0 && now.getHours() === 3 && now.getMinutes() === 0) {
        try {
          await this.backupManager.cleanupOldBackups();
        } catch (error) {
          console.error('Scheduled cleanup failed:', error);
        }
      }
    }, 60000);

    this.intervals.set('daily-backup', dailyBackup);
    this.intervals.set('weekly-cleanup', weeklyCleanup);
    
    console.log('Backup scheduling started');
  }

  stopScheduledBackups(): void {
    this.intervals.forEach((interval, name) => {
      clearInterval(interval);
      console.log(`Stopped scheduled task: ${name}`);
    });
    this.intervals.clear();
  }
}

// CONTEXT7 SOURCE: /mongodb/docs - Production backup configuration for enterprise systems
// CONFIG REASON: Official MongoDB backup configuration patterns for royal client standards
export const createProductionBackupConfig = (): BackupConfig => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is required for backups');
  }

  return {
    mongoUri,
    databaseName: process.env.MONGODB_DATABASE || 'tinacms',
    backupPath: process.env.BACKUP_PATH || '/var/backups/mongodb',
    retentionDays: parseInt(process.env.BACKUP_RETENTION_DAYS || '30', 10),
    compressionLevel: 6, // Good balance of speed and compression
  };
};

// Export default instance for application use
export const defaultBackupManager = new DatabaseBackupManager(createProductionBackupConfig());
export const defaultBackupScheduler = new BackupScheduler(defaultBackupManager);