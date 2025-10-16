import fs from 'fs/promises';
import path from 'path';
interface PerformanceTrend {
	metric: string;
	trend: 'improving' | 'stable' | 'degrading';
	changePercent: number;
	currentValue: number;
	previousValue: number;
	baseline: number;
}
interface PerformanceReport {
	timestamp: Date;
	score: number;
	buildMetrics: {
		averageBuildTime: number;
		p95BuildTime: number;
		successRate: number;
		totalBuilds: number;
	};
	bundleMetrics: {
		currentSize: number;
		sizeChange: number;
		largestChunks: Array<{
			name: string;
			size: number;
		}>;
	};
	runtimeMetrics: {
		averageLCP: number;
		averageFID: number;
		averageCLS: number;
		averageTTFB: number;
		performanceScore: number;
	};
	trends: PerformanceTrend[];
	alerts: Array<{
		type: string;
		severity: string;
		message: string;
		timestamp: Date;
	}>;
	recommendations: string[];
	businessImpact: {
		estimatedRevenueLoss: number;
		userExperienceScore: number;
		competitiveAdvantage: string;
	};
}
interface DataPoint {
	timestamp: Date;
	value: number;
	metadata?: Record<string, any>;
}
export class PerformanceAnalytics {
	private metricsPath: string;
	private alertsPath: string;
	private vitalsPath: string;
	private reportsPath: string;
	constructor() {
		const logsDir = path.join(process.cwd(), 'logs');
		this.metricsPath = path.join(logsDir, 'build-metrics.jsonl');
		this.alertsPath = path.join(logsDir, 'performance-alerts.jsonl');
		this.vitalsPath = path.join(logsDir, 'web-vitals.jsonl');
		this.reportsPath = path.join(logsDir, 'performance-reports');
	}
	public async generateReport(): Promise<PerformanceReport> {
		const buildMetrics = await this.loadBuildMetrics();
		const alerts = await this.loadAlerts();
		const webVitals = await this.loadWebVitals();
		const buildAnalysis = this.analyzeBuildMetrics(buildMetrics);
		const bundleAnalysis = this.analyzeBundleMetrics(buildMetrics);
		const runtimeAnalysis = this.analyzeRuntimeMetrics(webVitals);
		const trends = this.calculateTrends(buildMetrics, webVitals);
		const recommendations = this.generateRecommendations(
			buildAnalysis,
			bundleAnalysis,
			runtimeAnalysis,
			trends,
		);
		const businessImpact = this.calculateBusinessImpact(
			buildAnalysis,
			runtimeAnalysis,
		);
		const score = this.calculateOverallScore(
			buildAnalysis,
			bundleAnalysis,
			runtimeAnalysis,
		);
		const report: PerformanceReport = {
			timestamp: new Date(),
			score,
			buildMetrics: buildAnalysis,
			bundleMetrics: bundleAnalysis,
			runtimeMetrics: runtimeAnalysis,
			trends,
			alerts: alerts.slice(-10),
			recommendations,
			businessImpact,
		};
		await this.saveReport(report);
		return report;
	}
	private async loadBuildMetrics(): Promise<any[]> {
		try {
			const exists = await fs
				.access(this.metricsPath)
				.then(() => true)
				.catch(() => false);
			if (!exists) return [];
			const content = await fs.readFile(this.metricsPath, 'utf-8');
			return content
				.trim()
				.split('\n')
				.filter((line) => line)
				.map((line) => {
					try {
						return JSON.parse(line);
					} catch {
						return null;
					}
				})
				.filter(Boolean);
		} catch {
			return [];
		}
	}
	private async loadAlerts(): Promise<any[]> {
		try {
			const exists = await fs
				.access(this.alertsPath)
				.then(() => true)
				.catch(() => false);
			if (!exists) return [];
			const content = await fs.readFile(this.alertsPath, 'utf-8');
			return content
				.trim()
				.split('\n')
				.filter((line) => line)
				.map((line) => {
					try {
						return JSON.parse(line);
					} catch {
						return null;
					}
				})
				.filter(Boolean);
		} catch {
			return [];
		}
	}
	private async loadWebVitals(): Promise<any[]> {
		try {
			const exists = await fs
				.access(this.vitalsPath)
				.then(() => true)
				.catch(() => false);
			if (!exists) return [];
			const content = await fs.readFile(this.vitalsPath, 'utf-8');
			return content
				.trim()
				.split('\n')
				.filter((line) => line)
				.map((line) => {
					try {
						return JSON.parse(line);
					} catch {
						return null;
					}
				})
				.filter(Boolean);
		} catch {
			return [];
		}
	}
	private analyzeBuildMetrics(metrics: any[]): any {
		if (metrics.length === 0) {
			return {
				averageBuildTime: 11000,
				p95BuildTime: 12000,
				successRate: 100,
				totalBuilds: 0,
			};
		}
		const buildTimes = metrics.map((m) => m.duration || 0).filter((t) => t > 0);
		const successful = metrics.filter((m) => !m.failed).length;
		buildTimes.sort((a, b) => a - b);
		const p95Index = Math.floor(buildTimes.length * 0.95);
		return {
			averageBuildTime:
				buildTimes.reduce((sum, t) => sum + t, 0) / buildTimes.length,
			p95BuildTime: buildTimes[p95Index] || buildTimes[buildTimes.length - 1],
			successRate: (successful / metrics.length) * 100,
			totalBuilds: metrics.length,
		};
	}
	private analyzeBundleMetrics(metrics: any[]): any {
		if (metrics.length === 0) {
			return {
				currentSize: 149000,
				sizeChange: 0,
				largestChunks: [],
			};
		}
		const latest = metrics[metrics.length - 1];
		const previous = metrics.length > 1 ? metrics[metrics.length - 2] : latest;
		return {
			currentSize: latest.bundleSize || 149000,
			sizeChange: latest.bundleSize - previous.bundleSize,
			largestChunks: [],
		};
	}
	private analyzeRuntimeMetrics(vitals: any[]): any {
		if (vitals.length === 0) {
			return {
				averageLCP: 2000,
				averageFID: 50,
				averageCLS: 0.05,
				averageTTFB: 600,
				performanceScore: 98,
			};
		}
		const lcpValues = vitals.filter((v) => v.name === 'LCP').map((v) => v.value);
		const fidValues = vitals.filter((v) => v.name === 'FID').map((v) => v.value);
		const clsValues = vitals.filter((v) => v.name === 'CLS').map((v) => v.value);
		const ttfbValues = vitals
			.filter((v) => v.name === 'TTFB')
			.map((v) => v.value);
		const avg = (arr: number[]) =>
			arr.length > 0 ? arr.reduce((sum, v) => sum + v, 0) / arr.length : 0;
		const metrics = {
			averageLCP: avg(lcpValues) || 2000,
			averageFID: avg(fidValues) || 50,
			averageCLS: avg(clsValues) || 0.05,
			averageTTFB: avg(ttfbValues) || 600,
			performanceScore: 98,
		};
		let score = 100;
		if (metrics.averageLCP > 2500) score -= 20;
		else if (metrics.averageLCP > 4000) score -= 40;
		if (metrics.averageFID > 100) score -= 10;
		else if (metrics.averageFID > 300) score -= 20;
		if (metrics.averageCLS > 0.1) score -= 10;
		else if (metrics.averageCLS > 0.25) score -= 20;
		metrics.performanceScore = Math.max(0, score);
		return metrics;
	}
	private calculateTrends(
		buildMetrics: any[],
		webVitals: any[],
	): PerformanceTrend[] {
		const trends: PerformanceTrend[] = [];
		if (buildMetrics.length >= 5) {
			const recent = buildMetrics.slice(-5).map((m) => m.duration);
			const previous = buildMetrics.slice(-10, -5).map((m) => m.duration);
			const recentAvg = recent.reduce((sum, v) => sum + v, 0) / recent.length;
			const previousAvg =
				previous.length > 0 ?
					previous.reduce((sum, v) => sum + v, 0) / previous.length
				:	recentAvg;
			const changePercent = ((recentAvg - previousAvg) / previousAvg) * 100;
			trends.push({
				metric: 'Build Time',
				trend:
					changePercent > 5 ? 'degrading'
					: changePercent < -5 ? 'improving'
					: 'stable',
				changePercent,
				currentValue: recentAvg,
				previousValue: previousAvg,
				baseline: 11000,
			});
		}
		if (buildMetrics.length >= 5) {
			const recent = buildMetrics.slice(-5).map((m) => m.bundleSize);
			const previous = buildMetrics.slice(-10, -5).map((m) => m.bundleSize);
			const recentAvg = recent.reduce((sum, v) => sum + v, 0) / recent.length;
			const previousAvg =
				previous.length > 0 ?
					previous.reduce((sum, v) => sum + v, 0) / previous.length
				:	recentAvg;
			const changePercent = ((recentAvg - previousAvg) / previousAvg) * 100;
			trends.push({
				metric: 'Bundle Size',
				trend:
					changePercent > 3 ? 'degrading'
					: changePercent < -3 ? 'improving'
					: 'stable',
				changePercent,
				currentValue: recentAvg,
				previousValue: previousAvg,
				baseline: 149000,
			});
		}
		return trends;
	}
	private generateRecommendations(
		buildAnalysis: any,
		bundleAnalysis: any,
		runtimeAnalysis: any,
		trends: PerformanceTrend[],
	): string[] {
		const recommendations: string[] = [];
		if (buildAnalysis.averageBuildTime > 12000) {
			recommendations.push(
				'⚡ Enable incremental compilation to reduce build times',
			);
			recommendations.push(
				'🔧 Consider upgrading build hardware or using cloud builds',
			);
		}
		if (buildAnalysis.p95BuildTime > 15000) {
			recommendations.push(
				'📊 Investigate build time spikes - possible memory pressure',
			);
		}
		if (bundleAnalysis.currentSize > 160000) {
			recommendations.push(
				'📦 Implement code splitting to reduce initial bundle size',
			);
			recommendations.push('🎯 Review and remove unused dependencies');
			recommendations.push('🗜️ Enable advanced minification and tree shaking');
		}
		if (bundleAnalysis.sizeChange > 5000) {
			recommendations.push(
				'⚠️ Recent bundle size increase detected - review latest changes',
			);
		}
		if (runtimeAnalysis.averageLCP > 2500) {
			recommendations.push(
				'🖼️ Optimize largest contentful paint - preload critical resources',
			);
			recommendations.push('🚀 Implement resource hints (preconnect, prefetch)');
		}
		if (runtimeAnalysis.averageFID > 100) {
			recommendations.push(
				'⌨️ Reduce JavaScript execution time for better interactivity',
			);
			recommendations.push('🔄 Consider code splitting and lazy loading');
		}
		if (runtimeAnalysis.averageCLS > 0.1) {
			recommendations.push(
				'📐 Fix layout shifts - set explicit dimensions for media',
			);
			recommendations.push('🎨 Avoid inserting content above existing content');
		}
		const degradingTrends = trends.filter((t) => t.trend === 'degrading');
		if (degradingTrends.length > 0) {
			recommendations.push(
				`📉 Address degrading metrics: ${degradingTrends.map((t) => t.metric).join(', ')}`,
			);
		}
		return recommendations;
	}
	private calculateBusinessImpact(
		buildAnalysis: any,
		runtimeAnalysis: any,
	): any {
		const loadTimeImpact =
			Math.max(0, (runtimeAnalysis.averageLCP - 1500) / 100) * 0.01;
		const estimatedRevenueLoss = loadTimeImpact * 191500;
		let uxScore = 100;
		if (runtimeAnalysis.averageLCP > 2500) uxScore -= 20;
		if (runtimeAnalysis.averageFID > 100) uxScore -= 15;
		if (runtimeAnalysis.averageCLS > 0.1) uxScore -= 15;
		if (buildAnalysis.successRate < 95) uxScore -= 10;
		let competitiveAdvantage = 'Strong';
		if (uxScore < 70) competitiveAdvantage = 'At Risk';
		else if (uxScore < 85) competitiveAdvantage = 'Moderate';
		return {
			estimatedRevenueLoss,
			userExperienceScore: Math.max(0, uxScore),
			competitiveAdvantage,
		};
	}
	private calculateOverallScore(
		buildAnalysis: any,
		bundleAnalysis: any,
		runtimeAnalysis: any,
	): number {
		const weights = {
			buildTime: 0.15,
			bundleSize: 0.2,
			runtime: 0.4,
			successRate: 0.25,
		};
		const buildScore = Math.max(
			0,
			100 - ((buildAnalysis.averageBuildTime - 11000) / 1000) * 5,
		);
		const bundleScore = Math.max(
			0,
			100 - ((bundleAnalysis.currentSize - 149000) / 1000) * 0.5,
		);
		const runtimeScore = runtimeAnalysis.performanceScore;
		const successScore = buildAnalysis.successRate;
		const totalScore =
			buildScore * weights.buildTime +
			bundleScore * weights.bundleSize +
			runtimeScore * weights.runtime +
			successScore * weights.successRate;
		return Math.round(Math.max(0, Math.min(100, totalScore)));
	}
	private async saveReport(report: PerformanceReport): Promise<void> {
		try {
			await fs.mkdir(this.reportsPath, {
				recursive: true,
			});
			const filename = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
			const filepath = path.join(this.reportsPath, filename);
			await fs.writeFile(filepath, JSON.stringify(report, null, 2));
			const logPath = path.join(this.reportsPath, 'reports.jsonl');
			await fs.appendFile(logPath, JSON.stringify(report) + '\n');
			console.log(`📊 Performance report saved: ${filename}`);
		} catch (error) {
			console.error('Failed to save performance report:', error);
		}
	}
	public async getStatus(): Promise<{
		score: number;
		status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
		lastUpdate: Date;
		criticalAlerts: number;
	}> {
		const alerts = await this.loadAlerts();
		const metrics = await this.loadBuildMetrics();
		const criticalAlerts = alerts.filter((a) => a.severity === 'critical').length;
		const latestMetric = metrics[metrics.length - 1];
		const score = latestMetric?.performanceScore || 98;
		let status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
		if (score >= 90) status = 'excellent';
		else if (score >= 75) status = 'good';
		else if (score >= 50) status = 'needs-improvement';
		else status = 'poor';
		return {
			score,
			status,
			lastUpdate:
				latestMetric?.timestamp ? new Date(latestMetric.timestamp) : new Date(),
			criticalAlerts,
		};
	}
}
export const performanceAnalytics = new PerformanceAnalytics();
export default performanceAnalytics;
