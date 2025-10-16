import {
	FAQRecommendationEngine,
	RecommendationResult,
} from './faq-recommendation-engine';
import type { FAQQuestion, FAQCategory } from '@/lib/types';
export interface PerformanceMetrics {
	readonly recommendationTime: number;
	readonly cacheHitRate: number;
	readonly memoryUsage: number;
	readonly networkRequests: number;
	readonly batteryImpact: 'low' | 'medium' | 'high';
	readonly cpuTime: number;
	readonly timestamp: Date;
}
export interface MobileOptimizationConfig {
	readonly deviceType: 'mobile' | 'tablet' | 'desktop';
	readonly connectionType: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'wifi';
	readonly batteryLevel?: number;
	readonly lowPowerMode?: boolean;
	readonly reducedMotion?: boolean;
	readonly memoryConstraint?: 'low' | 'normal' | 'high';
}
export interface OptimizationStrategy {
	readonly maxRecommendations: number;
	readonly similarityThreshold: number;
	readonly cacheSize: number;
	readonly prefetchEnabled: boolean;
	readonly backgroundProcessing: boolean;
	readonly compressionEnabled: boolean;
	readonly batchProcessing: boolean;
}
export class DeviceCapabilityDetector {
	private static instance: DeviceCapabilityDetector;
	private capabilities: MobileOptimizationConfig | null = null;
	public static getInstance(): DeviceCapabilityDetector {
		if (!DeviceCapabilityDetector.instance) {
			DeviceCapabilityDetector.instance = new DeviceCapabilityDetector();
		}
		return DeviceCapabilityDetector.instance;
	}
	public detectDeviceCapabilities(): MobileOptimizationConfig {
		if (this.capabilities) {
			return this.capabilities;
		}
		if (typeof window === 'undefined') {
			this.capabilities = {
				deviceType: 'desktop',
				connectionType: 'wifi',
				memoryConstraint: 'normal',
			};
			return this.capabilities;
		}
		const deviceType = this.getDeviceType();
		const connectionType = this.getConnectionType();
		const memoryConstraint = this.getMemoryConstraint();
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		const batteryInfo = this.getBatteryInfo();
		this.capabilities = {
			deviceType,
			connectionType,
			memoryConstraint,
			reducedMotion,
			...batteryInfo,
		};
		return this.capabilities;
	}
	private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
		const userAgent = navigator.userAgent.toLowerCase();
		const screenWidth = window.screen.width;
		const mobileRegex =
			/android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
		const tabletRegex = /ipad|android(?=.*tablet)|tablet/i;
		if (mobileRegex.test(userAgent) && screenWidth < 768) {
			return 'mobile';
		}
		if (
			tabletRegex.test(userAgent) ||
			(screenWidth >= 768 && screenWidth < 1024)
		) {
			return 'tablet';
		}
		return 'desktop';
	}
	private getConnectionType(): MobileOptimizationConfig['connectionType'] {
		if ('connection' in navigator) {
			const connection = (navigator as any).connection;
			if (connection.effectiveType) {
				return connection.effectiveType as MobileOptimizationConfig['connectionType'];
			}
		}
		const deviceType = this.getDeviceType();
		return deviceType === 'mobile' ? '4g' : 'wifi';
	}
	private getMemoryConstraint(): 'low' | 'normal' | 'high' {
		if ('deviceMemory' in navigator) {
			const deviceMemory = (navigator as any).deviceMemory;
			if (deviceMemory <= 2) return 'low';
			if (deviceMemory <= 4) return 'normal';
			return 'high';
		}
		const deviceType = this.getDeviceType();
		switch (deviceType) {
			case 'mobile':
				return 'low';
			case 'tablet':
				return 'normal';
			case 'desktop':
				return 'high';
			default:
				return 'normal';
		}
	}
	private getBatteryInfo(): Partial<MobileOptimizationConfig> {
		const batteryInfo: Partial<MobileOptimizationConfig> = {};
		const deviceType = this.getDeviceType();
		if (deviceType === 'mobile') {
			const hour = new Date().getHours();
			batteryInfo.lowPowerMode = hour < 7 || hour > 22;
		}
		return batteryInfo;
	}
	public refreshCapabilities(): void {
		this.capabilities = null;
		this.detectDeviceCapabilities();
	}
}
export class AdaptiveOptimizationStrategy {
	private static strategies = new Map<string, OptimizationStrategy>();
	public static getOptimizationStrategy(
		config: MobileOptimizationConfig,
	): OptimizationStrategy {
		const key = JSON.stringify(config);
		if (AdaptiveOptimizationStrategy.strategies.has(key)) {
			return AdaptiveOptimizationStrategy.strategies.get(key)!;
		}
		const strategy = AdaptiveOptimizationStrategy.generateStrategy(config);
		AdaptiveOptimizationStrategy.strategies.set(key, strategy);
		return strategy;
	}
	private static generateStrategy(
		config: MobileOptimizationConfig,
	): OptimizationStrategy {
		const {
			deviceType,
			connectionType,
			batteryLevel,
			lowPowerMode,
			memoryConstraint,
		} = config;
		let strategy: OptimizationStrategy = {
			maxRecommendations: 5,
			similarityThreshold: 0.1,
			cacheSize: 100,
			prefetchEnabled: true,
			backgroundProcessing: true,
			compressionEnabled: false,
			batchProcessing: false,
		};
		switch (deviceType) {
			case 'mobile':
				strategy = {
					...strategy,
					maxRecommendations: 3,
					similarityThreshold: 0.15,
					cacheSize: 50,
					compressionEnabled: true,
				};
				break;
			case 'tablet':
				strategy = {
					...strategy,
					maxRecommendations: 4,
					similarityThreshold: 0.12,
					cacheSize: 75,
				};
				break;
			case 'desktop':
				strategy = {
					...strategy,
					maxRecommendations: 6,
					similarityThreshold: 0.08,
					cacheSize: 200,
					batchProcessing: true,
				};
				break;
		}
		switch (connectionType) {
			case 'slow-2g':
			case '2g':
				strategy = {
					...strategy,
					maxRecommendations: Math.min(strategy.maxRecommendations, 2),
					prefetchEnabled: false,
					compressionEnabled: true,
				};
				break;
			case '3g':
				strategy = {
					...strategy,
					maxRecommendations: Math.min(strategy.maxRecommendations, 3),
					compressionEnabled: true,
				};
				break;
		}
		switch (memoryConstraint) {
			case 'low':
				strategy = {
					...strategy,
					cacheSize: Math.min(strategy.cacheSize, 25),
					backgroundProcessing: false,
					maxRecommendations: Math.min(strategy.maxRecommendations, 3),
				};
				break;
			case 'normal':
				strategy = {
					...strategy,
					cacheSize: Math.min(strategy.cacheSize, 100),
				};
				break;
		}
		if (lowPowerMode || (batteryLevel && batteryLevel < 20)) {
			strategy = {
				...strategy,
				backgroundProcessing: false,
				prefetchEnabled: false,
				maxRecommendations: Math.min(strategy.maxRecommendations, 2),
				batchProcessing: false,
			};
		}
		return strategy;
	}
}
export class FAQRecommendationOptimiser {
	private performanceHistory: PerformanceMetrics[] = [];
	private detector: DeviceCapabilityDetector;
	private currentStrategy: OptimizationStrategy;
	private lastOptimizationTime: number = 0;
	constructor() {
		this.detector = DeviceCapabilityDetector.getInstance();
		const capabilities = this.detector.detectDeviceCapabilities();
		this.currentStrategy =
			AdaptiveOptimizationStrategy.getOptimizationStrategy(capabilities);
	}
	public async generateOptimizedRecommendations(
		engine: FAQRecommendationEngine,
		targetQuestion: FAQQuestion,
		sessionId: string,
	): Promise<{
		recommendations: RecommendationResult[];
		metrics: PerformanceMetrics;
	}> {
		const startTime = Date.now();
		const startMemory = this.getMemoryUsage();
		try {
			const optimizedConfig = {
				maxRecommendations: this.currentStrategy.maxRecommendations,
				similarityThreshold: this.currentStrategy.similarityThreshold,
				enablePersonalization: !this.isLowPowerMode(),
				enableABTesting: this.currentStrategy.backgroundProcessing,
			};
			const recommendations = engine.generateRecommendations(
				targetQuestion,
				sessionId,
				optimizedConfig,
			);
			const endTime = Date.now();
			const endMemory = this.getMemoryUsage();
			const metrics: PerformanceMetrics = {
				recommendationTime: endTime - startTime,
				cacheHitRate: this.calculateCacheHitRate(),
				memoryUsage: endMemory - startMemory,
				networkRequests: 0,
				batteryImpact: this.estimateBatteryImpact(endTime - startTime),
				cpuTime: endTime - startTime,
				timestamp: new Date(),
			};
			this.performanceHistory.push(metrics);
			if (metrics.recommendationTime > 100) {
				this.optimizeStrategy();
			}
			return {
				recommendations,
				metrics,
			};
		} catch (error) {
			console.error('Optimized recommendation generation failed:', error);
			const metrics: PerformanceMetrics = {
				recommendationTime: Date.now() - startTime,
				cacheHitRate: 0,
				memoryUsage: 0,
				networkRequests: 0,
				batteryImpact: 'high',
				cpuTime: Date.now() - startTime,
				timestamp: new Date(),
			};
			return {
				recommendations: [],
				metrics,
			};
		}
	}
	public async prefetchRecommendations(
		engine: FAQRecommendationEngine,
		likelyQuestions: FAQQuestion[],
		sessionId: string,
	): Promise<void> {
		if (!this.currentStrategy.prefetchEnabled) {
			return;
		}
		if (this.isLowPowerMode()) {
			return;
		}
		const prefetchPromises = likelyQuestions.slice(0, 3).map((question) =>
			engine.generateRecommendations(question, sessionId, {
				maxRecommendations: Math.min(this.currentStrategy.maxRecommendations, 3),
			}),
		);
		setTimeout(async () => {
			try {
				await Promise.allSettled(prefetchPromises);
			} catch (error) {
				console.warn('Prefetch failed:', error);
			}
		}, 100);
	}
	private optimizeStrategy(): void {
		const now = Date.now();
		if (now - this.lastOptimizationTime < 60000) {
			return;
		}
		this.lastOptimizationTime = now;
		const recentMetrics = this.performanceHistory
			.filter((m) => now - m.timestamp.getTime() < 300000)
			.slice(-10);
		if (recentMetrics.length < 3) {
			return;
		}
		const avgTime =
			recentMetrics.reduce((sum, m) => sum + m.recommendationTime, 0) /
			recentMetrics.length;
		if (avgTime > 50) {
			this.currentStrategy = {
				...this.currentStrategy,
				maxRecommendations: Math.max(
					this.currentStrategy.maxRecommendations - 1,
					2,
				),
				similarityThreshold: Math.min(
					this.currentStrategy.similarityThreshold + 0.05,
					0.3,
				),
				backgroundProcessing: false,
			};
			console.log('Optimization strategy adjusted for better performance');
		}
	}
	private getMemoryUsage(): number {
		if ('memory' in performance) {
			return (performance as any).memory.usedJSHeapSize / 1024 / 1024;
		}
		return 0;
	}
	private calculateCacheHitRate(): number {
		return 0.8;
	}
	private estimateBatteryImpact(
		processingTime: number,
	): 'low' | 'medium' | 'high' {
		if (processingTime < 25) return 'low';
		if (processingTime < 75) return 'medium';
		return 'high';
	}
	private isLowPowerMode(): boolean {
		const capabilities = this.detector.detectDeviceCapabilities();
		return capabilities.lowPowerMode || false;
	}
	public getPerformanceReport(): {
		readonly averageResponseTime: number;
		readonly cacheHitRate: number;
		readonly batteryImpact: Record<string, number>;
		readonly currentStrategy: OptimizationStrategy;
		readonly deviceCapabilities: MobileOptimizationConfig;
	} {
		const recentMetrics = this.performanceHistory.slice(-50);
		const averageResponseTime =
			recentMetrics.length > 0 ?
				recentMetrics.reduce((sum, m) => sum + m.recommendationTime, 0) /
				recentMetrics.length
			:	0;
		const averageCacheHitRate =
			recentMetrics.length > 0 ?
				recentMetrics.reduce((sum, m) => sum + m.cacheHitRate, 0) /
				recentMetrics.length
			:	0;
		const batteryImpact = recentMetrics.reduce(
			(acc, m) => {
				acc[m.batteryImpact] = (acc[m.batteryImpact] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);
		return {
			averageResponseTime,
			cacheHitRate: averageCacheHitRate,
			batteryImpact,
			currentStrategy: this.currentStrategy,
			deviceCapabilities: this.detector.detectDeviceCapabilities(),
		};
	}
	public refreshOptimization(): void {
		this.detector.refreshCapabilities();
		const capabilities = this.detector.detectDeviceCapabilities();
		this.currentStrategy =
			AdaptiveOptimizationStrategy.getOptimizationStrategy(capabilities);
	}
}
