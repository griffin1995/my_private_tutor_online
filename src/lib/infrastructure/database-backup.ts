import { MongoClient, MongoClientOptions } from 'mongodb';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir, access, readdir, unlink } from 'fs/promises';
import path from 'path';
const execAsync = promisify(exec);
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
		const clientOptions: MongoClientOptions = {
			retryWrites: true,
			w: 'majority',
			readPreference: 'secondary',
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		};
		this.client = new MongoClient(this.config.mongoUri, clientOptions);
	}
	async createFullBackup(): Promise<BackupMetadata> {
		const startTime = Date.now();
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		const backupDir = path.join(
			this.config.backupPath,
			`full-backup-${timestamp}`,
		);
		try {
			await mkdir(backupDir, {
				recursive: true,
			});
			console.log(`Starting full backup to ${backupDir}`);
			const mongodumpCmd = [
				'mongodump',
				`--uri="${this.config.mongoUri}"`,
				`--db=${this.config.databaseName}`,
				`--out="${backupDir}"`,
				'--gzip',
				'--verbose',
				'--forceTableScan',
			].join(' ');
			const { stdout, stderr } = await execAsync(mongodumpCmd);
			if (stderr && !stderr.includes('done dumping')) {
				throw new Error(`Backup failed: ${stderr}`);
			}
			const collections = await this.getCollectionList();
			const backupSize = await this.calculateBackupSize(backupDir);
			const checksum = await this.generateChecksum(backupDir);
			const metadata: BackupMetadata = {
				timestamp,
				size: backupSize,
				collections,
				duration: Date.now() - startTime,
				checksum,
				type: 'full',
			};
			await writeFile(
				path.join(backupDir, 'backup-metadata.json'),
				JSON.stringify(metadata, null, 2),
			);
			console.log(`Full backup completed in ${metadata.duration}ms`);
			console.log(`Backup size: ${(metadata.size / 1024 / 1024).toFixed(2)} MB`);
			return metadata;
		} catch (error) {
			console.error('Full backup failed:', error);
			throw error;
		}
	}
	async restoreFromBackup(
		backupPath: string,
		targetDatabase?: string,
	): Promise<void> {
		const dbName = targetDatabase || this.config.databaseName;
		try {
			console.log(`Starting restore from ${backupPath} to database: ${dbName}`);
			const mongorestoreCmd = [
				'mongorestore',
				`--uri="${this.config.mongoUri}"`,
				`--db=${dbName}`,
				'--gzip',
				'--verbose',
				'--drop',
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
	async cleanupOldBackups(): Promise<void> {
		try {
			const backupFiles = await readdir(this.config.backupPath);
			const cutoffDate = new Date();
			cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays);
			for (const file of backupFiles) {
				if (
					file.startsWith('full-backup-') ||
					file.startsWith('incremental-backup-')
				) {
					const filePath = path.join(this.config.backupPath, file);
					const fileStats = await import('fs').then((fs) =>
						fs.promises.stat(filePath),
					);
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
	async verifyBackupIntegrity(backupPath: string): Promise<boolean> {
		try {
			const metadataPath = path.join(backupPath, 'backup-metadata.json');
			await access(metadataPath);
			const metadataContent = await import('fs').then((fs) =>
				fs.promises.readFile(metadataPath, 'utf8'),
			);
			const metadata: BackupMetadata = JSON.parse(metadataContent);
			const currentChecksum = await this.generateChecksum(backupPath);
			if (currentChecksum !== metadata.checksum) {
				console.error('Backup integrity check failed: checksum mismatch');
				return false;
			}
			const expectedCollections = metadata.collections;
			for (const collection of expectedCollections) {
				const collectionFile = path.join(
					backupPath,
					this.config.databaseName,
					`${collection}.bson.gz`,
				);
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
	private async getCollectionList(): Promise<string[]> {
		try {
			await this.client.connect();
			const db = this.client.db(this.config.databaseName);
			const collections = await db.listCollections().toArray();
			return collections.map((col) => col.name);
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
			const { stdout } = await execAsync(
				`find "${backupDir}" -type f -exec md5sum {} + | sort | md5sum`,
			);
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
export class BackupScheduler {
	private backupManager: DatabaseBackupManager;
	private intervals: Map<string, NodeJS.Timeout> = new Map();
	constructor(backupManager: DatabaseBackupManager) {
		this.backupManager = backupManager;
	}
	startScheduledBackups(): void {
		const dailyBackup = setInterval(async () => {
			const now = new Date();
			if (now.getHours() === 2 && now.getMinutes() === 0) {
				try {
					await this.backupManager.createFullBackup();
				} catch (error) {
					console.error('Scheduled backup failed:', error);
				}
			}
		}, 60000);
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
		compressionLevel: 6,
	};
};
export const defaultBackupManager = new DatabaseBackupManager(
	createProductionBackupConfig(),
);
export const defaultBackupScheduler = new BackupScheduler(defaultBackupManager);
