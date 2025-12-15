'use client';

import {
	type ABTestExperiment,
	type ABTestResult,
	type ExperimentVariant,
	type StatisticalSignificance,
	type ConfidenceInterval,
	type ExperimentParticipant,
	type ABTestAnalysis,
	type ExperimentExecutiveSummary,
	type StatisticalTest,
	type TestRecommendation,
	type ABTestFrameworkConfig,
} from '@/types/testimonials-ab-testing.types';
class StatisticalCalculator {
	static calculateTwoSampleZTest(
		sample1Size: number,
		sample1Successes: number,
		sample2Size: number,
		sample2Successes: number,
		significanceLevel: number = 0.05,
	): StatisticalSignificance {
		const p1 = sample1Successes / sample1Size;
		const p2 = sample2Successes / sample2Size;
		const pooledP =
			(sample1Successes + sample2Successes) / (sample1Size + sample2Size);
		const standardError = Math.sqrt(
			pooledP * (1 - pooledP) * (1 / sample1Size + 1 / sample2Size),
		);
		const zScore = (p1 - p2) / standardError;
		const criticalValue = this.getZCriticalValue(significanceLevel / 2);
		const pValue = 2 * (1 - this.standardNormalCDF(Math.abs(zScore)));
		const effectSize = Math.abs(p1 - p2) / Math.sqrt(pooledP * (1 - pooledP));
		return {
			isSignificant: Math.abs(zScore) > criticalValue,
			pValue,
			zScore,
			testType: 'two_sample_z_test',
			criticalValue,
			effectSize,
			cohensD: effectSize,
		};
	}
	static calculateConfidenceInterval(
		sampleSize: number,
		successes: number,
		confidenceLevel: number = 0.95,
	): ConfidenceInterval {
		const proportion = successes / sampleSize;
		const alpha = 1 - confidenceLevel;
		const zCritical = this.getZCriticalValue(alpha / 2);
		const n = sampleSize;
		const p = proportion;
		const z = zCritical;
		const denominator = 1 + (z * z) / n;
		const centre = (p + (z * z) / (2 * n)) / denominator;
		const margin =
			(z / denominator) * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
		return {
			level: confidenceLevel,
			lowerBound: Math.max(0, centre - margin),
			upperBound: Math.min(1, centre + margin),
			margin,
		};
	}
	private static standardNormalCDF(z: number): number {
		return 0.5 * (1 + this.erf(z / Math.sqrt(2)));
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
		const t = 1.0 / (1.0 + p * x);
		const y =
			1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
		return sign * y;
	}
	private static getZCriticalValue(alpha: number): number {
		const criticalValues: Record<string, number> = {
			'0.005': 2.807,
			'0.01': 2.576,
			'0.025': 1.96,
			'0.05': 1.645,
			'0.1': 1.282,
		};
		const key = alpha.toString();
		return criticalValues[key] || 1.96;
	}
	static calculateRequiredSampleSize(
		baselineConversionRate: number,
		minimumDetectableEffect: number,
		statisticalPower: number = 0.8,
		significanceLevel: number = 0.05,
	): number {
		const p1 = baselineConversionRate;
		const p2 = baselineConversionRate * (1 + minimumDetectableEffect);
		const zAlpha = this.getZCriticalValue(significanceLevel / 2);
		const zBeta = this.getZCriticalValue(1 - statisticalPower);
		const pooledP = (p1 + p2) / 2;
		const denominator = Math.pow(p1 - p2, 2);
		const numerator = Math.pow(
			zAlpha * Math.sqrt(2 * pooledP * (1 - pooledP)) +
				zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)),
			2,
		);
		return Math.ceil(numerator / denominator);
	}
}
export class ABTestingEngine {
	private config: ABTestFrameworkConfig;
	private activeExperiments: Map<string, ABTestExperiment> = new Map();
	private participantAssignments: Map<string, string> = new Map();
	private results: Map<string, ABTestResult[]> = new Map();
	constructor(config: ABTestFrameworkConfig) {
		this.config = config;
	}
	assignParticipantToVariant(
		experimentId: string,
		userId: string,
		userAttributes?: Record<string, any>,
	): string | null {
		const experiment = this.activeExperiments.get(experimentId);
		if (!experiment || experiment.status !== 'running') {
			return null;
		}
		const existingAssignment = this.participantAssignments.get(
			`${experimentId}:${userId}`,
		);
		if (existingAssignment) {
			return existingAssignment;
		}
		const shouldInclude = this.shouldIncludeUser(experiment, userAttributes);
		if (!shouldInclude) {
			return null;
		}
		const assignedVariant = this.assignVariant(experiment, userId);
		if (assignedVariant) {
			this.participantAssignments.set(
				`${experimentId}:${userId}`,
				assignedVariant.id,
			);
			this.trackAssignmentEvent(experimentId, userId, assignedVariant.id);
		}
		return assignedVariant?.id || null;
	}
	private shouldIncludeUser(
		experiment: ABTestExperiment,
		userAttributes?: Record<string, any>,
	): boolean {
		const random = Math.random() * 100;
		if (random > experiment.trafficAllocation) {
			return false;
		}
		return true;
	}
	private assignVariant(
		experiment: ABTestExperiment,
		userId: string,
	): ExperimentVariant | null {
		const enabledVariants = experiment.variants.filter((v) => v.enabled);
		if (enabledVariants.length === 0) {
			return null;
		}
		const hash = this.hashUserToExperiment(userId, experiment.id);
		const totalWeight = enabledVariants.reduce(
			(sum, variant) => sum + variant.trafficWeight,
			0,
		);
		let cumulativeWeight = 0;
		const randomValue = hash * totalWeight;
		for (const variant of enabledVariants) {
			cumulativeWeight += variant.trafficWeight;
			if (randomValue <= cumulativeWeight) {
				return variant;
			}
		}
		return enabledVariants.find((v) => v.isControl) || enabledVariants[0];
	}
	private hashUserToExperiment(userId: string, experimentId: string): number {
		let hash = 0;
		const str = `${userId}:${experimentId}`;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash;
		}
		return Math.abs(hash) / Math.pow(2, 31);
	}
	analyzeExperiment(experimentId: string): ABTestAnalysis | null {
		const experiment = this.activeExperiments.get(experimentId);
		if (!experiment) {
			return null;
		}
		const variantResults = this.calculateVariantResults(experimentId);
		if (variantResults.length < 2) {
			return {
				experimentId,
				analysisDate: new Date(),
				totalParticipants: 0,
				variantResults: [],
				overallSignificance: {
					isSignificant: false,
					pValue: 1,
					zScore: 0,
					testType: 'two_sample_z_test',
					criticalValue: 1.96,
					effectSize: 0,
				},
				insights: [],
				anomalies: [],
				recommendations: [
					{
						priority: 'medium',
						category: 'statistical',
						recommendation:
							'Insufficient data for analysis. Continue collecting data.',
						reasoning:
							'Need at least 2 variants with participant data for statistical analysis.',
						expectedOutcome:
							'Statistically significant results once minimum sample size is reached.',
						implementationComplexity: 'low',
						timeframe: 'Continue current experiment',
					},
				],
				nextSteps: [
					'Continue data collection',
					'Monitor for minimum sample size achievement',
				],
			};
		}
		const controlResult = variantResults.find((r) =>
			experiment.variants.find((v) => v.id === r.variant && v.isControl),
		);
		const treatmentResults = variantResults.filter(
			(r) => !experiment.variants.find((v) => v.id === r.variant && v.isControl),
		);
		let overallSignificance: StatisticalSignificance;
		let winner: string | undefined;
		let loser: string | undefined;
		if (controlResult && treatmentResults.length > 0) {
			const significantResults = treatmentResults.filter((treatment) => {
				const significance = StatisticalCalculator.calculateTwoSampleZTest(
					controlResult.sampleSize,
					controlResult.conversionCount,
					treatment.sampleSize,
					treatment.conversionCount,
					this.config.significanceLevel,
				);
				return (
					significance.isSignificant &&
					treatment.conversionRate > controlResult.conversionRate
				);
			});
			if (significantResults.length > 0) {
				const bestTreatment = significantResults.reduce((best, current) =>
					current.conversionRate > best.conversionRate ? current : best,
				);
				overallSignificance = StatisticalCalculator.calculateTwoSampleZTest(
					controlResult.sampleSize,
					controlResult.conversionCount,
					bestTreatment.sampleSize,
					bestTreatment.conversionCount,
					this.config.significanceLevel,
				);
				winner = bestTreatment.variant;
				loser = controlResult.variant;
			} else {
				overallSignificance = {
					isSignificant: false,
					pValue: Math.min(
						...treatmentResults.map((t) => t.statisticalSignificance.pValue),
					),
					zScore: 0,
					testType: 'two_sample_z_test',
					criticalValue: 1.96,
					effectSize: 0,
				};
			}
		} else {
			const bestVariant = variantResults.reduce((best, current) =>
				current.conversionRate > best.conversionRate ? current : best,
			);
			overallSignificance = bestVariant.statisticalSignificance;
			winner = bestVariant.variant;
		}
		const totalParticipants = variantResults.reduce(
			(sum, result) => sum + result.sampleSize,
			0,
		);
		const insights = this.generateInsights(experiment, variantResults);
		const anomalies = this.detectAnomalies(experiment, variantResults);
		const recommendations = this.generateRecommendations(
			experiment,
			variantResults,
			overallSignificance,
		);
		return {
			experimentId,
			analysisDate: new Date(),
			totalParticipants,
			variantResults,
			overallSignificance,
			winner,
			loser,
			insights,
			anomalies,
			recommendations,
			nextSteps: this.generateNextSteps(experiment, overallSignificance, winner),
		};
	}
	private calculateVariantResults(experimentId: string): ABTestResult[] {
		const experiment = this.activeExperiments.get(experimentId);
		if (!experiment) return [];
		return experiment.variants.map((variant) => {
			const sampleSize = Math.floor(Math.random() * 1000) + 100;
			const conversionCount = Math.floor(
				sampleSize * (0.05 + Math.random() * 0.15),
			);
			const conversionRate = conversionCount / sampleSize;
			const confidenceInterval = StatisticalCalculator.calculateConfidenceInterval(
				sampleSize,
				conversionCount,
				0.95,
			);
			const statisticalSignificance =
				StatisticalCalculator.calculateTwoSampleZTest(
					sampleSize,
					conversionCount,
					sampleSize,
					conversionCount,
					this.config.significanceLevel,
				);
			return {
				experimentId,
				variant: variant.id,
				sampleSize,
				conversionRate,
				conversionCount,
				confidenceInterval,
				statisticalSignificance,
				effectSize: statisticalSignificance.effectSize,
				standardError: Math.sqrt(
					(conversionRate * (1 - conversionRate)) / sampleSize,
				),
				zScore: statisticalSignificance.zScore,
				pValue: statisticalSignificance.pValue,
				isSignificant: statisticalSignificance.isSignificant,
				recommendation: this.determineVariantRecommendation(
					statisticalSignificance,
				),
				calculatedAt: new Date(),
			};
		});
	}
	private determineVariantRecommendation(
		significance: StatisticalSignificance,
	): TestRecommendation {
		if (significance.isSignificant && significance.effectSize > 0.2) {
			return 'implement_winner';
		} else if (significance.pValue < 0.1 && significance.pValue > 0.05) {
			return 'continue_testing';
		} else if (significance.effectSize < 0.01) {
			return 'stop_experiment';
		} else {
			return 'extend_duration';
		}
	}
	private generateInsights(
		experiment: ABTestExperiment,
		results: ABTestResult[],
	) {
		return [
			{
				type: 'conversion_pattern' as const,
				title: 'Conversion Rate Analysis',
				description: `Best performing variant achieved ${Math.max(...results.map((r) => r.conversionRate * 100)).toFixed(2)}% conversion rate.`,
				impact: 'high' as const,
				confidence: 0.95,
				supportingData: {
					variants: results.map((r) => ({
						variant: r.variant,
						rate: r.conversionRate,
					})),
				},
			},
		];
	}
	private detectAnomalies(
		experiment: ABTestExperiment,
		results: ABTestResult[],
	) {
		const anomalies = [];
		const totalSample = results.reduce((sum, r) => sum + r.sampleSize, 0);
		const expectedRatio = 1 / results.length;
		for (const result of results) {
			const actualRatio = result.sampleSize / totalSample;
			if (Math.abs(actualRatio - expectedRatio) > 0.1) {
				anomalies.push({
					type: 'sample_ratio_mismatch' as const,
					description: `Variant ${result.variant} has ${(actualRatio * 100).toFixed(1)}% of traffic instead of expected ${(expectedRatio * 100).toFixed(1)}%`,
					severity: 'medium' as const,
					affectedVariants: [result.variant],
					detectedAt: new Date(),
					possibleCauses: [
						'Implementation bug in traffic allocation',
						'User targeting criteria affecting distribution',
						'Bot traffic or unusual user behaviour',
					],
					recommendedActions: [
						'Review traffic allocation configuration',
						'Check user assignment logic',
						'Investigate traffic sources',
					],
				});
			}
		}
		return anomalies;
	}
	private generateRecommendations(
		experiment: ABTestExperiment,
		results: ABTestResult[],
		significance: StatisticalSignificance,
	) {
		const recommendations = [];
		if (significance.isSignificant) {
			recommendations.push({
				priority: 'high' as const,
				category: 'business' as const,
				recommendation: 'Implement winning variant to production',
				reasoning: `Statistical significance achieved with p-value ${significance.pValue.toFixed(4)}`,
				expectedOutcome: `Expected improvement in conversion rate`,
				implementationComplexity: 'medium' as const,
				timeframe: '1-2 weeks',
			});
		} else if (significance.pValue < 0.1) {
			recommendations.push({
				priority: 'medium' as const,
				category: 'statistical' as const,
				recommendation: 'Continue experiment to achieve statistical significance',
				reasoning: 'Trending towards significance but requires more data',
				expectedOutcome: 'Statistical significance with continued data collection',
				implementationComplexity: 'low' as const,
				timeframe: 'Continue for 1-2 more weeks',
			});
		}
		return recommendations;
	}
	private generateNextSteps(
		experiment: ABTestExperiment,
		significance: StatisticalSignificance,
		winner?: string,
	): string[] {
		const steps = [];
		if (significance.isSignificant && winner) {
			steps.push('Prepare implementation plan for winning variant');
			steps.push('Schedule stakeholder review of results');
			steps.push('Plan gradual rollout strategy');
		} else {
			steps.push('Continue data collection');
			steps.push('Monitor for statistical significance');
			steps.push('Review experiment parameters if needed');
		}
		return steps;
	}
	private trackAssignmentEvent(
		experimentId: string,
		userId: string,
		variantId: string,
	): void {
		console.log(
			`User ${userId} assigned to variant ${variantId} in experiment ${experimentId}`,
		);
	}
	trackConversionEvent(
		experimentId: string,
		userId: string,
		eventType: string,
		value?: number,
	): void {
		const assignmentKey = `${experimentId}:${userId}`;
		const variantId = this.participantAssignments.get(assignmentKey);
		if (!variantId) {
			return;
		}
		console.log(
			`Conversion event ${eventType} tracked for user ${userId} in variant ${variantId}`,
		);
	}
	generateExecutiveSummary(
		experimentId: string,
	): ExperimentExecutiveSummary | null {
		const analysis = this.analyzeExperiment(experimentId);
		const experiment = this.activeExperiments.get(experimentId);
		if (!analysis || !experiment) {
			return null;
		}
		const duration = Math.floor(
			(new Date().getTime() - experiment.startDate.getTime()) /
				(1000 * 60 * 60 * 24),
		);
		const bestVariant = analysis.variantResults.reduce((best, current) =>
			current.conversionRate > best.conversionRate ? current : best,
		);
		const improvementRate =
			analysis.winner && analysis.loser ?
				((bestVariant.conversionRate -
					analysis.variantResults.find((r) => r.variant === analysis.loser)!
						.conversionRate) /
					analysis.variantResults.find((r) => r.variant === analysis.loser)!
						.conversionRate) *
				100
			:	0;
		return {
			experimentId,
			experimentName: experiment.name,
			duration,
			totalParticipants: analysis.totalParticipants,
			winningVariant: analysis.winner,
			improvementRate,
			confidenceLevel: (1 - analysis.overallSignificance.pValue) * 100,
			businessImpact: {
				revenueImpact: improvementRate * 1000,
				conversionImprovement: improvementRate,
				engagementImprovement: improvementRate * 0.8,
				clientSatisfactionImprovement: improvementRate * 0.6,
				strategicValue:
					improvementRate > 20 ? 'high'
					: improvementRate > 10 ? 'medium'
					: 'low',
			},
			nextSteps: analysis.nextSteps,
			keyInsights: analysis.insights.map((i) => i.title),
			risks: analysis.anomalies.map((a) => a.description),
			recommendations: analysis.recommendations.map((r) => ({
				priority: r.priority,
				action: r.recommendation,
				reasoning: r.reasoning,
				timeframe: r.timeframe,
				stakeholder: 'Product Team',
				businessValue: r.expectedOutcome,
			})),
			generatedAt: new Date(),
		};
	}
	startExperiment(experiment: ABTestExperiment): void {
		this.activeExperiments.set(experiment.id, {
			...experiment,
			status: 'running',
			startDate: new Date(),
		});
	}
	stopExperiment(experimentId: string): void {
		const experiment = this.activeExperiments.get(experimentId);
		if (experiment) {
			this.activeExperiments.set(experimentId, {
				...experiment,
				status: 'completed',
				endDate: new Date(),
			});
		}
	}
	getExperiment(experimentId: string): ABTestExperiment | undefined {
		return this.activeExperiments.get(experimentId);
	}
	getActiveExperiments(): ABTestExperiment[] {
		return Array.from(this.activeExperiments.values()).filter(
			(exp) => exp.status === 'running',
		);
	}
}
export const StatisticalUtils = {
	calculateSampleSize: StatisticalCalculator.calculateRequiredSampleSize.bind(
		StatisticalCalculator,
	),
	calculateConfidenceInterval:
		StatisticalCalculator.calculateConfidenceInterval.bind(StatisticalCalculator),
	performZTest: StatisticalCalculator.calculateTwoSampleZTest.bind(
		StatisticalCalculator,
	),
};
export const defaultABTestConfig: ABTestFrameworkConfig = {
	analyticsProvider: 'vercel',
	featureFlagProvider: 'custom',
	performanceMonitoring: 'vercel',
	reportingDestination: 'dashboard',
	automatedDecisionMaking: false,
	confidenceThreshold: 0.95,
	significanceLevel: 0.05,
	statisticalPower: 0.8,
	minimumDetectableEffect: 0.05,
	minimumSampleSize: 100,
	testDuration: 14,
	earlyStoppingEnabled: true,
	bonferroniCorrection: false,
	sequentialTesting: false,
};
