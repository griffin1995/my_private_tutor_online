import type { FAQQuestion, FAQCategory } from '@/lib/types';
import {
	FAQRecommendationEngine,
	RecommendationResult,
	ClientSegment,
	RecommendationConfig,
} from './faq-recommendation-engine';
export interface RecommendationVariant {
	readonly id: string;
	readonly name: string;
	readonly description: string;
	readonly config: RecommendationConfig;
	readonly weight: number;
	readonly isActive: boolean;
}
export interface ExperimentMetrics {
	readonly variantId: string;
	readonly exposures: number;
	readonly clicks: number;
	readonly views: number;
	readonly averageTimeSpent: number;
	readonly conversionRate: number;
	readonly satisfactionScore: number;
	readonly revenueAttribution: number;
	readonly lastUpdated: Date;
}
export interface StatisticalResult {
	readonly metric: keyof Omit<ExperimentMetrics, 'variantId' | 'lastUpdated'>;
	readonly controlValue: number;
	readonly treatmentValue: number;
	readonly difference: number;
	readonly percentChange: number;
	readonly pValue: number;
	readonly isSignificant: boolean;
	readonly confidenceInterval: [number, number];
}
export interface ExperimentConfig {
	readonly id: string;
	readonly name: string;
	readonly description: string;
	readonly startDate: Date;
	readonly endDate?: Date;
	readonly minSampleSize: number;
	readonly significanceLevel: number;
	readonly powerLevel: number;
	readonly primaryMetric: keyof Omit<
		ExperimentMetrics,
		'variantId' | 'lastUpdated'
	>;
	readonly variants: RecommendationVariant[];
	readonly isActive: boolean;
}
export interface UserAssignment {
	readonly userId: string;
	readonly experimentId: string;
	readonly variantId: string;
	readonly assignedAt: Date;
	readonly sessionId: string;
}
export class StatisticalAnalyzer {
	public static calculateZTest(
		controlSuccesses: number,
		controlTotal: number,
		treatmentSuccesses: number,
		treatmentTotal: number,
	): {
		zScore: number;
		pValue: number;
		isSignificant: boolean;
	} {
		if (controlTotal === 0 || treatmentTotal === 0) {
			return {
				zScore: 0,
				pValue: 1,
				isSignificant: false,
			};
		}
		const p1 = controlSuccesses / controlTotal;
		const p2 = treatmentSuccesses / treatmentTotal;
		const pooledP =
			(controlSuccesses + treatmentSuccesses) / (controlTotal + treatmentTotal);
		const standardError = Math.sqrt(
			pooledP * (1 - pooledP) * (1 / controlTotal + 1 / treatmentTotal),
		);
		if (standardError === 0) {
			return {
				zScore: 0,
				pValue: 1,
				isSignificant: false,
			};
		}
		const zScore = (p2 - p1) / standardError;
		const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)));
		const isSignificant = pValue < 0.05;
		return {
			zScore,
			pValue,
			isSignificant,
		};
	}
	public static calculateTTest(
		controlValues: number[],
		treatmentValues: number[],
	): {
		tScore: number;
		pValue: number;
		isSignificant: boolean;
	} {
		if (controlValues.length === 0 || treatmentValues.length === 0) {
			return {
				tScore: 0,
				pValue: 1,
				isSignificant: false,
			};
		}
		const controlMean =
			controlValues.reduce((a, b) => a + b, 0) / controlValues.length;
		const treatmentMean =
			treatmentValues.reduce((a, b) => a + b, 0) / treatmentValues.length;
		const controlVariance =
			controlValues.reduce((sum, val) => sum + Math.pow(val - controlMean, 2), 0) /
			(controlValues.length - 1);
		const treatmentVariance =
			treatmentValues.reduce(
				(sum, val) => sum + Math.pow(val - treatmentMean, 2),
				0,
			) /
			(treatmentValues.length - 1);
		const pooledVariance =
			((controlValues.length - 1) * controlVariance +
				(treatmentValues.length - 1) * treatmentVariance) /
			(controlValues.length + treatmentValues.length - 2);
		const standardError = Math.sqrt(
			pooledVariance * (1 / controlValues.length + 1 / treatmentValues.length),
		);
		if (standardError === 0) {
			return {
				tScore: 0,
				pValue: 1,
				isSignificant: false,
			};
		}
		const tScore = (treatmentMean - controlMean) / standardError;
		const degreesOfFreedom = controlValues.length + treatmentValues.length - 2;
		const pValue = 2 * (1 - this.normalCDF(Math.abs(tScore)));
		const isSignificant = pValue < 0.05;
		return {
			tScore,
			pValue,
			isSignificant,
		};
	}
	private static normalCDF(x: number): number {
		return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
	}
	private static erf(x: number): number {
		const a1 = 0.254829592;
		const a2 = -0.284496736;
		const a3 = 1.421413741;
		const a4 = -1.453152027;
		const a5 = 1.061405429;
		const p = 0.3275911;
		const sign = x >= 0 ? 1 : -1;
		x = Math.abs(x);
		const t = 1 / (1 + p * x);
		const y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
		return sign * (1 - y * Math.exp(-x * x));
	}
	public static calculateConfidenceInterval(
		value: number,
		sampleSize: number,
		confidenceLevel: number = 0.95,
	): [number, number] {
		if (sampleSize === 0) return [value, value];
		const zScore = confidenceLevel === 0.95 ? 1.96 : 2.576;
		const standardError = Math.sqrt((value * (1 - value)) / sampleSize);
		const margin = zScore * standardError;
		return [Math.max(0, value - margin), Math.min(1, value + margin)];
	}
}
export class FAQABTestingManager {
	private experiments = new Map<string, ExperimentConfig>();
	private metrics = new Map<string, ExperimentMetrics>();
	private userAssignments = new Map<string, UserAssignment>();
	private engines = new Map<string, FAQRecommendationEngine>();
	public createExperiment(config: ExperimentConfig): void {
		if (config.variants.length < 2) {
			throw new Error('Experiment must have at least 2 variants');
		}
		const totalWeight = config.variants.reduce((sum, v) => sum + v.weight, 0);
		if (Math.abs(totalWeight - 1.0) > 0.001) {
			throw new Error('Variant weights must sum to 1.0');
		}
		this.experiments.set(config.id, config);
		config.variants.forEach((variant) => {
			this.metrics.set(`${config.id}:${variant.id}`, {
				variantId: variant.id,
				exposures: 0,
				clicks: 0,
				views: 0,
				averageTimeSpent: 0,
				conversionRate: 0,
				satisfactionScore: 0,
				revenueAttribution: 0,
				lastUpdated: new Date(),
			});
			const engine = new FAQRecommendationEngine();
			this.engines.set(`${config.id}:${variant.id}`, engine);
		});
		console.log(
			`Created A/B experiment: ${config.name} with ${config.variants.length} variants`,
		);
	}
	public assignUserToVariant(
		userId: string,
		sessionId: string,
		experimentId: string,
	): string | null {
		const experiment = this.experiments.get(experimentId);
		if (!experiment || !experiment.isActive) {
			return null;
		}
		const existingAssignment = this.userAssignments.get(
			`${userId}:${experimentId}`,
		);
		if (existingAssignment) {
			return existingAssignment.variantId;
		}
		const hash = this.hashString(`${userId}:${experimentId}`);
		const randomValue = (hash % 1000) / 1000;
		let cumulativeWeight = 0;
		for (const variant of experiment.variants) {
			if (!variant.isActive) continue;
			cumulativeWeight += variant.weight;
			if (randomValue <= cumulativeWeight) {
				const assignment: UserAssignment = {
					userId,
					experimentId,
					variantId: variant.id,
					assignedAt: new Date(),
					sessionId,
				};
				this.userAssignments.set(`${userId}:${experimentId}`, assignment);
				this.recordExposure(experimentId, variant.id);
				return variant.id;
			}
		}
		return null;
	}
	public generateRecommendationsForUser(
		userId: string,
		sessionId: string,
		experimentId: string,
		targetQuestion: FAQQuestion,
		categories: FAQCategory[],
	): RecommendationResult[] | null {
		const variantId = this.assignUserToVariant(userId, sessionId, experimentId);
		if (!variantId) return null;
		const experiment = this.experiments.get(experimentId);
		const variant = experiment?.variants.find((v) => v.id === variantId);
		if (!variant) return null;
		const engine = this.engines.get(`${experimentId}:${variantId}`);
		if (!engine) return null;
		if (!engine['initialized']) {
			engine.initialize(categories, variant.config);
			engine['initialized'] = true;
		}
		const recommendations = engine.generateRecommendations(
			targetQuestion,
			sessionId,
			variant.config,
		);
		this.recordRecommendationView(
			experimentId,
			variantId,
			recommendations.length,
		);
		return recommendations;
	}
	public recordExposure(experimentId: string, variantId: string): void {
		const metricsKey = `${experimentId}:${variantId}`;
		const metrics = this.metrics.get(metricsKey);
		if (metrics) {
			this.metrics.set(metricsKey, {
				...metrics,
				exposures: metrics.exposures + 1,
				lastUpdated: new Date(),
			});
		}
	}
	public recordRecommendationView(
		experimentId: string,
		variantId: string,
		viewCount: number,
	): void {
		const metricsKey = `${experimentId}:${variantId}`;
		const metrics = this.metrics.get(metricsKey);
		if (metrics) {
			this.metrics.set(metricsKey, {
				...metrics,
				views: metrics.views + viewCount,
				lastUpdated: new Date(),
			});
		}
	}
	public recordRecommendationClick(
		experimentId: string,
		variantId: string,
	): void {
		const metricsKey = `${experimentId}:${variantId}`;
		const metrics = this.metrics.get(metricsKey);
		if (metrics) {
			const updatedMetrics = {
				...metrics,
				clicks: metrics.clicks + 1,
				lastUpdated: new Date(),
			};
			updatedMetrics.conversionRate =
				updatedMetrics.exposures > 0 ?
					updatedMetrics.clicks / updatedMetrics.exposures
				:	0;
			this.metrics.set(metricsKey, updatedMetrics);
		}
	}
	public recordTimeSpent(
		experimentId: string,
		variantId: string,
		timeSpent: number,
	): void {
		const metricsKey = `${experimentId}:${variantId}`;
		const metrics = this.metrics.get(metricsKey);
		if (metrics) {
			const totalTime = metrics.averageTimeSpent * metrics.exposures + timeSpent;
			const newAverage =
				metrics.exposures > 0 ? totalTime / metrics.exposures : timeSpent;
			this.metrics.set(metricsKey, {
				...metrics,
				averageTimeSpent: newAverage,
				lastUpdated: new Date(),
			});
		}
	}
	public analyzeExperiment(experimentId: string): StatisticalResult[] | null {
		const experiment = this.experiments.get(experimentId);
		if (!experiment) return null;
		const results: StatisticalResult[] = [];
		const variants = experiment.variants.filter((v) => v.isActive);
		if (variants.length < 2) return null;
		const controlVariant = variants[0];
		const controlMetrics = this.metrics.get(
			`${experimentId}:${controlVariant.id}`,
		);
		if (!controlMetrics) return null;
		for (let i = 1; i < variants.length; i++) {
			const treatmentVariant = variants[i];
			const treatmentMetrics = this.metrics.get(
				`${experimentId}:${treatmentVariant.id}`,
			);
			if (!treatmentMetrics) continue;
			const conversionAnalysis = StatisticalAnalyzer.calculateZTest(
				controlMetrics.clicks,
				controlMetrics.exposures,
				treatmentMetrics.clicks,
				treatmentMetrics.exposures,
			);
			results.push({
				metric: 'conversionRate',
				controlValue: controlMetrics.conversionRate,
				treatmentValue: treatmentMetrics.conversionRate,
				difference: treatmentMetrics.conversionRate - controlMetrics.conversionRate,
				percentChange:
					controlMetrics.conversionRate > 0 ?
						((treatmentMetrics.conversionRate - controlMetrics.conversionRate) /
							controlMetrics.conversionRate) *
						100
					:	0,
				pValue: conversionAnalysis.pValue,
				isSignificant: conversionAnalysis.isSignificant,
				confidenceInterval: StatisticalAnalyzer.calculateConfidenceInterval(
					treatmentMetrics.conversionRate,
					treatmentMetrics.exposures,
				),
			});
			results.push({
				metric: 'averageTimeSpent',
				controlValue: controlMetrics.averageTimeSpent,
				treatmentValue: treatmentMetrics.averageTimeSpent,
				difference:
					treatmentMetrics.averageTimeSpent - controlMetrics.averageTimeSpent,
				percentChange:
					controlMetrics.averageTimeSpent > 0 ?
						((treatmentMetrics.averageTimeSpent - controlMetrics.averageTimeSpent) /
							controlMetrics.averageTimeSpent) *
						100
					:	0,
				pValue: 0.5,
				isSignificant: false,
				confidenceInterval: [
					treatmentMetrics.averageTimeSpent,
					treatmentMetrics.averageTimeSpent,
				],
			});
		}
		return results;
	}
	private hashString(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash;
		}
		return Math.abs(hash);
	}
	public getExperimentMetrics(
		experimentId: string,
	): Map<string, ExperimentMetrics> {
		const experiment = this.experiments.get(experimentId);
		if (!experiment) return new Map();
		const experimentMetrics = new Map<string, ExperimentMetrics>();
		experiment.variants.forEach((variant) => {
			const metrics = this.metrics.get(`${experimentId}:${variant.id}`);
			if (metrics) {
				experimentMetrics.set(variant.id, metrics);
			}
		});
		return experimentMetrics;
	}
	public stopExperiment(experimentId: string): void {
		const experiment = this.experiments.get(experimentId);
		if (experiment) {
			this.experiments.set(experimentId, {
				...experiment,
				isActive: false,
				endDate: new Date(),
			});
		}
	}
	public getUserVariant(userId: string, experimentId: string): string | null {
		const assignment = this.userAssignments.get(`${userId}:${experimentId}`);
		return assignment?.variantId || null;
	}
}
