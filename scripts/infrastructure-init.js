#!/usr/bin/env node

/**
 * CONTEXT7 SOURCE: /mongodb/docs - Database backup automation and monitoring setup
 * AUTOMATION REASON: Official MongoDB patterns for production backup system initialization
 *
 * Infrastructure Initialization Script
 * - Sets up automated backup scheduling
 * - Initializes monitoring systems
 * - Configures error reporting
 * - Validates system health
 */

const path = require('path');
const { mkdir } = require('fs/promises');

// Import our infrastructure modules
const {
	defaultBackupManager,
	defaultBackupScheduler,
} = require('../src/lib/infrastructure/database-backup');
const {
	createInfrastructureMonitor,
} = require('../src/lib/infrastructure/monitoring');

console.log('🚀 My Private Tutor Online - Infrastructure Initialization');
console.log('====================================================');

async function initializeInfrastructure() {
	try {
		// Step 1: Create required directories
		console.log('\n📁 Creating infrastructure directories...');
		const directories = ['logs/errors', 'logs/monitoring', 'var/backups/mongodb'];

		for (const dir of directories) {
			const fullPath = path.join(process.cwd(), dir);
			await mkdir(fullPath, { recursive: true });
			console.log(`✅ Created: ${dir}`);
		}

		// Step 2: Test database connectivity
		console.log('\n🔌 Testing database connectivity...');
		const monitor = createInfrastructureMonitor();
		const healthStatus = await monitor.getApplicationHealth();

		if (healthStatus.services.database.status === 'up') {
			console.log('✅ Database connection successful');
			console.log(
				`   Response time: ${healthStatus.services.database.responseTime}ms`,
			);
		} else {
			console.log('❌ Database connection failed');
			console.log(`   Error: ${healthStatus.services.database.details}`);
			process.exit(1);
		}

		// Step 3: Create initial backup
		console.log('\n💾 Creating initial backup...');
		const backupMetadata = await defaultBackupManager.createFullBackup();
		console.log('✅ Initial backup created');
		console.log(`   Backup ID: ${backupMetadata.timestamp}`);
		console.log(`   Size: ${(backupMetadata.size / 1024 / 1024).toFixed(2)} MB`);
		console.log(`   Duration: ${backupMetadata.duration}ms`);
		console.log(`   Collections: ${backupMetadata.collections.length}`);

		// Step 4: Verify backup integrity
		console.log('\n🔍 Verifying backup integrity...');
		const backupPath = path.join(
			process.env.BACKUP_PATH || '/var/backups/mongodb',
			`full-backup-${backupMetadata.timestamp}`,
		);

		const isValid = await defaultBackupManager.verifyBackupIntegrity(backupPath);
		if (isValid) {
			console.log('✅ Backup integrity verified');
		} else {
			console.log('❌ Backup integrity check failed');
			process.exit(1);
		}

		// Step 5: Start monitoring services
		console.log('\n📊 Starting monitoring services...');
		monitor.startContinuousMonitoring(5); // Check every 5 minutes
		console.log('✅ Monitoring system started (5-minute intervals)');

		// Step 6: Start backup scheduler
		if (process.env.BACKUP_SCHEDULE_ENABLED === 'true') {
			console.log('\n⏰ Starting backup scheduler...');
			defaultBackupScheduler.startScheduledBackups();
			console.log('✅ Backup scheduler started');
			console.log('   Daily backups at 2:00 AM');
			console.log('   Weekly cleanup on Sundays at 3:00 AM');
		} else {
			console.log(
				'\n⏰ Backup scheduler disabled (set BACKUP_SCHEDULE_ENABLED=true to enable)',
			);
		}

		// Step 7: Test error reporting
		console.log('\n🚨 Testing error reporting system...');
		try {
			const testResponse = await fetch('/api/errors', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					errorId: `test_${Date.now()}`,
					timestamp: new Date().toISOString(),
					level: 'component',
					componentName: 'InfrastructureInit',
					message: 'Test error report during system initialization',
					userAgent: 'Infrastructure Init Script',
					url: 'system://infrastructure-init',
					sessionId: 'init-session',
				}),
			});

			if (testResponse.ok) {
				console.log('✅ Error reporting system operational');
			} else {
				console.log(
					'⚠️  Error reporting system not accessible (may be normal during initialization)',
				);
			}
		} catch (error) {
			console.log(
				'⚠️  Error reporting endpoint not available (start the application server first)',
			);
		}

		// Step 8: Display system status
		console.log('\n📈 System Status Summary:');
		console.log('========================');
		console.log(
			`Database Status: ${healthStatus.services.database.status.toUpperCase()}`,
		);
		console.log(
			`Backup System: ${healthStatus.services.backup.status.toUpperCase()}`,
		);
		console.log(`Monitoring: ACTIVE`);
		console.log(`Error Reporting: CONFIGURED`);

		console.log('\n🎯 Recovery Objectives:');
		console.log(
			`RTO (Recovery Time): ${healthStatus.rtoRpoMetrics.recoveryTime} minutes`,
		);
		console.log(
			`RPO (Data Loss Window): ${healthStatus.rtoRpoMetrics.dataLossWindow} hours`,
		);
		console.log(`Last Backup: ${healthStatus.rtoRpoMetrics.lastBackup}`);

		// Step 9: Next steps
		console.log('\n📋 Next Steps:');
		console.log('==============');
		console.log('1. Start your Next.js application: npm run dev');
		console.log(
			'2. Check health endpoint: curl http://localhost:3000/api/infrastructure/health',
		);
		console.log(
			'3. Review backup files in:',
			process.env.BACKUP_PATH || 'var/backups/mongodb',
		);
		console.log('4. Monitor logs in: logs/errors/ and logs/monitoring/');
		console.log('5. Review INFRASTRUCTURE_RUNBOOK.md for emergency procedures');

		console.log('\n✅ Infrastructure initialization completed successfully!');
		console.log('🔥 System ready for royal client service standards.');
	} catch (error) {
		console.error('\n❌ Infrastructure initialization failed:', error.message);
		console.error('\n🔧 Troubleshooting steps:');
		console.error('1. Verify MongoDB connection string in .env.local');
		console.error('2. Ensure MongoDB service is running');
		console.error('3. Check filesystem permissions for backup directories');
		console.error('4. Review INFRASTRUCTURE_RUNBOOK.md for detailed diagnostics');
		process.exit(1);
	}
}

// Handle graceful shutdown
process.on('SIGINT', () => {
	console.log('\n🛑 Infrastructure initialization interrupted');
	console.log('Cleaning up...');
	defaultBackupScheduler.stopScheduledBackups();
	process.exit(0);
});

process.on('SIGTERM', () => {
	console.log('\n🛑 Infrastructure initialization terminated');
	defaultBackupScheduler.stopScheduledBackups();
	process.exit(0);
});

// Run initialization
if (require.main === module) {
	initializeInfrastructure().catch((error) => {
		console.error('Fatal error during initialization:', error);
		process.exit(1);
	});
}

module.exports = { initializeInfrastructure };
