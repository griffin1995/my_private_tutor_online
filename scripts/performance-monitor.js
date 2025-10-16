#!/usr/bin/env node

// CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring CLI tool
// BUSINESS VALUE: Protect £191,500/year performance optimization value

const {
	PerformanceRegressionDetector,
} = require('../src/lib/monitoring/performance-regression-detector');
const {
	performanceAnalytics,
} = require('../src/lib/monitoring/performance-analytics');
const fs = require('fs').promises;
const path = require('path');

const PERFORMANCE_TARGETS = {
	buildTime: 11000, // 11s target
	bundleSize: 149000, // 149KB target
	performanceScore: 98, // 9.8/10 target
	loadTime: 1500, // 1.5s target
};

const COLORS = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
	bold: '\x1b[1m',
};

class PerformanceMonitorCLI {
	constructor() {
		this.detector = new PerformanceRegressionDetector({
			buildTimeThreshold: 12000, // 12s warning threshold
			bundleSizeThreshold: 163840, // 160KB warning threshold
			benchmarkInterval: 300000, // 5 minutes
		});
	}

	async run(command, args) {
		switch (command) {
			case 'monitor':
				await this.startMonitoring();
				break;
			case 'benchmark':
				await this.runBenchmark();
				break;
			case 'report':
				await this.generateReport();
				break;
			case 'status':
				await this.checkStatus();
				break;
			case 'dashboard':
				await this.showDashboard();
				break;
			case 'protect':
				await this.protectPerformance();
				break;
			case 'help':
			default:
				this.showHelp();
		}
	}

	async startMonitoring() {
		console.log(
			`${COLORS.cyan}🔍 Starting Performance Regression Monitoring${COLORS.reset}`,
		);
		console.log(
			`${COLORS.white}Protecting £191,500/year performance value${COLORS.reset}\n`,
		);

		await this.detector.startMonitoring();

		console.log(`${COLORS.green}✅ Monitoring active${COLORS.reset}`);
		console.log('Performance thresholds:');
		console.log(`  • Build Time: <12s (current target: 11s)`);
		console.log(`  • Bundle Size: <160KB (current target: 149KB)`);
		console.log(`  • Performance Score: >95/100 (current target: 98/100)`);
		console.log('\nPress Ctrl+C to stop monitoring');

		// Keep process running
		process.on('SIGINT', () => {
			this.detector.stopMonitoring();
			console.log(`\n${COLORS.yellow}⏹️ Monitoring stopped${COLORS.reset}`);
			process.exit(0);
		});

		// Prevent process from exiting
		setInterval(() => {}, 1000);
	}

	async runBenchmark() {
		console.log(
			`${COLORS.cyan}📊 Running Performance Benchmark${COLORS.reset}\n`,
		);

		const spinner = this.startSpinner('Analyzing build performance');

		try {
			const benchmark = await this.detector.runPerformanceBenchmark();
			this.stopSpinner(spinner);

			console.log(`${COLORS.green}✅ Benchmark Complete${COLORS.reset}\n`);

			// Display results
			this.displayBenchmarkResults(benchmark);

			// Check against targets
			this.checkTargets(benchmark);
		} catch (error) {
			this.stopSpinner(spinner);
			console.error(
				`${COLORS.red}❌ Benchmark failed:${COLORS.reset}`,
				error.message,
			);
			process.exit(1);
		}
	}

	async generateReport() {
		console.log(
			`${COLORS.cyan}📈 Generating Performance Report${COLORS.reset}\n`,
		);

		const spinner = this.startSpinner('Analyzing performance data');

		try {
			const report = await performanceAnalytics.generateReport();
			this.stopSpinner(spinner);

			console.log(`${COLORS.green}✅ Report Generated${COLORS.reset}\n`);

			// Display report summary
			this.displayReportSummary(report);

			// Save detailed report
			const reportPath = path.join(
				process.cwd(),
				'logs/performance-reports/latest.json',
			);
			await fs.mkdir(path.dirname(reportPath), { recursive: true });
			await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

			console.log(
				`\n${COLORS.white}Full report saved to: ${reportPath}${COLORS.reset}`,
			);
		} catch (error) {
			this.stopSpinner(spinner);
			console.error(
				`${COLORS.red}❌ Report generation failed:${COLORS.reset}`,
				error.message,
			);
			process.exit(1);
		}
	}

	async checkStatus() {
		console.log(`${COLORS.cyan}🎯 Performance Status Check${COLORS.reset}\n`);

		try {
			const status = await performanceAnalytics.getStatus();
			const perfStatus = this.detector.getPerformanceStatus();

			// Overall status
			const statusIcon =
				status.status === 'excellent' ? '🏆'
				: status.status === 'good' ? '✅'
				: status.status === 'needs-improvement' ? '⚠️'
				: '❌';

			console.log(
				`${statusIcon} Overall Status: ${COLORS.bold}${status.status.toUpperCase()}${COLORS.reset}`,
			);
			console.log(
				`Performance Score: ${this.getScoreColor(status.score)}${status.score}/100${COLORS.reset}`,
			);
			console.log(`Last Update: ${status.lastUpdate.toLocaleString()}`);

			if (status.criticalAlerts > 0) {
				console.log(
					`${COLORS.red}⚠️ Critical Alerts: ${status.criticalAlerts}${COLORS.reset}`,
				);
			}

			// Performance metrics
			if (perfStatus.latestBenchmark) {
				console.log('\n📊 Latest Metrics:');
				console.log(
					`  • Build Time: ${this.formatDuration(perfStatus.latestBenchmark.buildTime)}`,
				);
				console.log(
					`  • Bundle Size: ${this.formatSize(perfStatus.latestBenchmark.bundleSize)}`,
				);
				console.log(
					`  • Memory Usage: ${this.formatSize(perfStatus.latestBenchmark.memoryUsage)}`,
				);
			}

			// Recent trend
			if (perfStatus.regressionSummary.recentTrend !== 'stable') {
				const trendIcon =
					perfStatus.regressionSummary.recentTrend === 'improving' ? '📈' : '📉';
				console.log(
					`\n${trendIcon} Recent Trend: ${perfStatus.regressionSummary.recentTrend}`,
				);
			}

			// Business value protection
			console.log(`\n💰 Protected Value: £191,500/year`);
			console.log(
				`🛡️ Performance Shield: ${status.score >= 95 ? 'ACTIVE' : 'AT RISK'}`,
			);
		} catch (error) {
			console.error(
				`${COLORS.red}❌ Status check failed:${COLORS.reset}`,
				error.message,
			);
			process.exit(1);
		}
	}

	async showDashboard() {
		console.clear();
		console.log(`${COLORS.cyan}${'='.repeat(60)}${COLORS.reset}`);
		console.log(
			`${COLORS.bold}🚀 PERFORMANCE MONITORING DASHBOARD${COLORS.reset}`,
		);
		console.log(`${COLORS.cyan}${'='.repeat(60)}${COLORS.reset}\n`);

		const status = await performanceAnalytics.getStatus();
		const perfStatus = this.detector.getPerformanceStatus();

		// Performance Score Visual
		this.displayPerformanceGauge(status.score);

		// Key Metrics
		console.log(`\n${COLORS.bold}📊 KEY METRICS${COLORS.reset}`);
		console.log('─'.repeat(40));

		if (perfStatus.latestBenchmark) {
			const b = perfStatus.latestBenchmark;

			// Build Time
			const buildTimeStatus =
				b.buildTime <= PERFORMANCE_TARGETS.buildTime ? '✅'
				: b.buildTime <= PERFORMANCE_TARGETS.buildTime * 1.1 ? '⚠️'
				: '❌';
			console.log(
				`${buildTimeStatus} Build Time: ${this.formatDuration(b.buildTime)} (Target: ${this.formatDuration(PERFORMANCE_TARGETS.buildTime)})`,
			);

			// Bundle Size
			const bundleStatus =
				b.bundleSize <= PERFORMANCE_TARGETS.bundleSize ? '✅'
				: b.bundleSize <= PERFORMANCE_TARGETS.bundleSize * 1.07 ? '⚠️'
				: '❌';
			console.log(
				`${bundleStatus} Bundle Size: ${this.formatSize(b.bundleSize)} (Target: ${this.formatSize(PERFORMANCE_TARGETS.bundleSize)})`,
			);

			// Memory Usage
			const memStatus =
				b.memoryUsage <= 1073741824 ? '✅'
				: b.memoryUsage <= 2147483648 ? '⚠️'
				: '❌';
			console.log(`${memStatus} Memory Usage: ${this.formatSize(b.memoryUsage)}`);
		}

		// Business Value
		console.log(`\n${COLORS.bold}💰 BUSINESS VALUE PROTECTION${COLORS.reset}`);
		console.log('─'.repeat(40));
		console.log(`Annual Value: £191,500`);
		console.log(
			`Protection Status: ${status.score >= 95 ? '🛡️ SECURED' : '⚠️ AT RISK'}`,
		);
		console.log(`ROI Multiplier: ${(status.score / 10).toFixed(1)}x`);

		// Recent Activity
		if (perfStatus.buildHistory.length > 0) {
			console.log(`\n${COLORS.bold}📈 RECENT BUILDS${COLORS.reset}`);
			console.log('─'.repeat(40));

			const recentBuilds = perfStatus.buildHistory.slice(-5).reverse();
			for (const build of recentBuilds) {
				const icon = build.success ? '✅' : '❌';
				const time = new Date(build.timestamp).toLocaleTimeString();
				console.log(
					`${icon} ${time} - ${this.formatDuration(build.duration)} - ${build.stages.length} stages`,
				);
			}
		}

		// Recommendations
		console.log(`\n${COLORS.bold}💡 RECOMMENDATIONS${COLORS.reset}`);
		console.log('─'.repeat(40));

		if (status.score >= 95) {
			console.log(
				'🏆 Excellent performance! Continue monitoring for regressions.',
			);
		} else {
			console.log(
				'⚡ Run full performance report for optimization recommendations.',
			);
			console.log('🔧 Consider code splitting and bundle optimization.');
			console.log('📊 Review build configuration for potential improvements.');
		}

		console.log(`\n${COLORS.cyan}${'='.repeat(60)}${COLORS.reset}`);
		console.log(`Last updated: ${new Date().toLocaleString()}`);
	}

	async protectPerformance() {
		console.log(`${COLORS.magenta}${'='.repeat(60)}${COLORS.reset}`);
		console.log(`${COLORS.bold}🛡️ PERFORMANCE PROTECTION MODE${COLORS.reset}`);
		console.log(`${COLORS.magenta}${'='.repeat(60)}${COLORS.reset}\n`);

		console.log('Activating comprehensive performance protection...\n');

		// Run benchmark
		console.log('1️⃣ Running performance benchmark...');
		const benchmark = await this.detector.runPerformanceBenchmark();

		// Generate report
		console.log('2️⃣ Generating performance report...');
		const report = await performanceAnalytics.generateReport();

		// Check thresholds
		console.log('3️⃣ Validating performance thresholds...\n');

		let protectionStatus = 'ACTIVE';
		const issues = [];

		if (benchmark.buildTime > PERFORMANCE_TARGETS.buildTime * 1.1) {
			issues.push(
				`Build time regression: ${this.formatDuration(benchmark.buildTime)}`,
			);
			protectionStatus = 'AT RISK';
		}

		if (benchmark.bundleSize > PERFORMANCE_TARGETS.bundleSize * 1.07) {
			issues.push(
				`Bundle size increase: ${this.formatSize(benchmark.bundleSize)}`,
			);
			protectionStatus = 'AT RISK';
		}

		if (report.score < 95) {
			issues.push(`Performance score below threshold: ${report.score}/100`);
			protectionStatus = 'CRITICAL';
		}

		// Display protection status
		const statusColor =
			protectionStatus === 'ACTIVE' ? COLORS.green
			: protectionStatus === 'AT RISK' ? COLORS.yellow
			: COLORS.red;

		console.log(`${statusColor}${'='.repeat(60)}${COLORS.reset}`);
		console.log(
			`${COLORS.bold}PROTECTION STATUS: ${statusColor}${protectionStatus}${COLORS.reset}`,
		);
		console.log(`${statusColor}${'='.repeat(60)}${COLORS.reset}\n`);

		if (issues.length > 0) {
			console.log(`${COLORS.red}⚠️ Issues Detected:${COLORS.reset}`);
			issues.forEach((issue) => console.log(`  • ${issue}`));
			console.log();
		}

		// Display recommendations
		if (report.recommendations.length > 0) {
			console.log(`${COLORS.bold}📋 Action Items:${COLORS.reset}`);
			report.recommendations.slice(0, 5).forEach((rec) => console.log(`  ${rec}`));
		}

		// Business impact
		console.log(`\n${COLORS.bold}💰 Business Impact:${COLORS.reset}`);
		console.log(`  Protected Value: £191,500/year`);
		console.log(`  Current Score: ${report.score}/100`);
		console.log(`  Risk Level: ${protectionStatus}`);

		if (protectionStatus !== 'ACTIVE') {
			console.log(
				`\n${COLORS.yellow}⚡ Immediate action required to protect performance value${COLORS.reset}`,
			);
			process.exit(1);
		} else {
			console.log(
				`\n${COLORS.green}✅ Performance value successfully protected${COLORS.reset}`,
			);
		}
	}

	// Helper methods
	displayBenchmarkResults(benchmark) {
		const table = [
			['Metric', 'Value', 'Target', 'Status'],
			['─'.repeat(15), '─'.repeat(15), '─'.repeat(15), '─'.repeat(10)],
			[
				'Build Time',
				this.formatDuration(benchmark.buildTime),
				this.formatDuration(PERFORMANCE_TARGETS.buildTime),
				benchmark.buildTime <= PERFORMANCE_TARGETS.buildTime * 1.1 ? '✅' : '❌',
			],
			[
				'Bundle Size',
				this.formatSize(benchmark.bundleSize),
				this.formatSize(PERFORMANCE_TARGETS.bundleSize),
				benchmark.bundleSize <= PERFORMANCE_TARGETS.bundleSize * 1.07 ? '✅' : '❌',
			],
			[
				'Memory Usage',
				this.formatSize(benchmark.memoryUsage),
				'< 2GB',
				benchmark.memoryUsage <= 2147483648 ? '✅' : '❌',
			],
			[
				'Cache Hit Rate',
				`${benchmark.cacheHitRate.toFixed(0)}%`,
				'> 50%',
				benchmark.cacheHitRate >= 50 ? '✅' : '❌',
			],
		];

		table.forEach((row) => {
			console.log(row.map((cell, i) => cell.padEnd(i === 0 ? 15 : 15)).join(' '));
		});
	}

	displayReportSummary(report) {
		console.log(`${COLORS.bold}PERFORMANCE REPORT SUMMARY${COLORS.reset}`);
		console.log('─'.repeat(50));

		console.log(
			`\nOverall Score: ${this.getScoreColor(report.score)}${report.score}/100${COLORS.reset}`,
		);

		console.log('\nBuild Metrics:');
		console.log(
			`  • Average Build Time: ${this.formatDuration(report.buildMetrics.averageBuildTime)}`,
		);
		console.log(
			`  • Success Rate: ${report.buildMetrics.successRate.toFixed(1)}%`,
		);

		console.log('\nBundle Metrics:');
		console.log(
			`  • Current Size: ${this.formatSize(report.bundleMetrics.currentSize)}`,
		);
		console.log(
			`  • Size Change: ${report.bundleMetrics.sizeChange > 0 ? '+' : ''}${this.formatSize(report.bundleMetrics.sizeChange)}`,
		);

		console.log('\nRuntime Performance:');
		console.log(`  • LCP: ${report.runtimeMetrics.averageLCP.toFixed(0)}ms`);
		console.log(`  • FID: ${report.runtimeMetrics.averageFID.toFixed(0)}ms`);
		console.log(`  • CLS: ${report.runtimeMetrics.averageCLS.toFixed(3)}`);

		console.log('\nBusiness Impact:');
		console.log(
			`  • User Experience Score: ${report.businessImpact.userExperienceScore}/100`,
		);
		console.log(
			`  • Competitive Advantage: ${report.businessImpact.competitiveAdvantage}`,
		);

		if (report.alerts.length > 0) {
			console.log(
				`\n${COLORS.yellow}⚠️ Recent Alerts: ${report.alerts.length}${COLORS.reset}`,
			);
		}
	}

	displayPerformanceGauge(score) {
		const maxWidth = 40;
		const filledWidth = Math.round((score / 100) * maxWidth);
		const emptyWidth = maxWidth - filledWidth;

		const color =
			score >= 90 ? COLORS.green
			: score >= 75 ? COLORS.yellow
			: score >= 50 ? COLORS.magenta
			: COLORS.red;

		console.log(`Performance Score: ${color}${score}/100${COLORS.reset}`);
		console.log(
			`[${color}${'█'.repeat(filledWidth)}${COLORS.reset}${'░'.repeat(emptyWidth)}]`,
		);
	}

	checkTargets(benchmark) {
		console.log(`\n${COLORS.bold}Target Validation:${COLORS.reset}`);

		const checks = [
			{
				name: 'Build Time',
				current: benchmark.buildTime,
				target: PERFORMANCE_TARGETS.buildTime,
				formatter: this.formatDuration.bind(this),
				tolerance: 1.1,
			},
			{
				name: 'Bundle Size',
				current: benchmark.bundleSize,
				target: PERFORMANCE_TARGETS.bundleSize,
				formatter: this.formatSize.bind(this),
				tolerance: 1.07,
			},
		];

		let allPassed = true;

		checks.forEach((check) => {
			const passed = check.current <= check.target * check.tolerance;
			const icon = passed ? '✅' : '❌';
			const color = passed ? COLORS.green : COLORS.red;

			console.log(
				`${icon} ${check.name}: ${color}${check.formatter(check.current)}${COLORS.reset} (target: ${check.formatter(check.target)})`,
			);

			if (!passed) allPassed = false;
		});

		if (allPassed) {
			console.log(
				`\n${COLORS.green}🏆 All performance targets met!${COLORS.reset}`,
			);
		} else {
			console.log(
				`\n${COLORS.yellow}⚠️ Some targets exceeded - review recommendations${COLORS.reset}`,
			);
		}
	}

	formatDuration(ms) {
		if (ms < 1000) return `${ms}ms`;
		return `${(ms / 1000).toFixed(1)}s`;
	}

	formatSize(bytes) {
		if (bytes < 1024) return `${bytes}B`;
		if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)}KB`;
		return `${(bytes / 1048576).toFixed(1)}MB`;
	}

	getScoreColor(score) {
		if (score >= 90) return COLORS.green;
		if (score >= 75) return COLORS.yellow;
		if (score >= 50) return COLORS.magenta;
		return COLORS.red;
	}

	startSpinner(message) {
		const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
		let i = 0;

		const spinner = setInterval(() => {
			process.stdout.write(
				`\r${COLORS.cyan}${frames[i]} ${message}${COLORS.reset}`,
			);
			i = (i + 1) % frames.length;
		}, 80);

		return spinner;
	}

	stopSpinner(spinner) {
		clearInterval(spinner);
		process.stdout.write('\r' + ' '.repeat(50) + '\r');
	}

	showHelp() {
		console.log(`${COLORS.cyan}Performance Monitoring CLI${COLORS.reset}\n`);
		console.log('Usage: npm run perf:<command>\n');
		console.log('Commands:');
		console.log('  monitor    - Start continuous performance monitoring');
		console.log('  benchmark  - Run performance benchmark');
		console.log('  report     - Generate detailed performance report');
		console.log('  status     - Check current performance status');
		console.log('  dashboard  - Show performance dashboard');
		console.log('  protect    - Run full protection validation\n');
		console.log('Examples:');
		console.log('  npm run perf:monitor');
		console.log('  npm run perf:status');
		console.log('  node scripts/performance-monitor.js dashboard');
	}
}

// Main execution
async function main() {
	const cli = new PerformanceMonitorCLI();
	const command = process.argv[2] || 'help';
	const args = process.argv.slice(3);

	try {
		await cli.run(command, args);
	} catch (error) {
		console.error(`${COLORS.red}Error:${COLORS.reset}`, error.message);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}

module.exports = { PerformanceMonitorCLI };
