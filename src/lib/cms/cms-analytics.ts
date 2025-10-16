import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';
const ContentInteractionSchema = z.object({
	contentId: z.string(),
	contentType: z.enum(['hero', 'testimonial', 'video', 'school', 'cta']),
	interactionType: z.enum(['view', 'click', 'scroll', 'hover', 'share']),
	timestamp: z.number(),
	userId: z.string().optional(),
	sessionId: z.string(),
	duration: z.number().optional(),
	metadata: z.record(z.unknown()).optional(),
});
const ConversionEventSchema = z.object({
	eventType: z.enum([
		'quote_request',
		'contact_form',
		'phone_call',
		'email_inquiry',
	]),
	contentSource: z.string(),
	timestamp: z.number(),
	sessionId: z.string(),
	value: z.number().optional(),
	metadata: z.record(z.unknown()).optional(),
});
const PerformanceMetricSchema = z.object({
	contentId: z.string(),
	contentType: z.string(),
	metric: z.enum([
		'load_time',
		'render_time',
		'interaction_rate',
		'conversion_rate',
		'bounce_rate',
	]),
	value: z.number(),
	timestamp: z.number(),
	sessionId: z.string(),
});
export interface ContentInteraction {
	readonly contentId: string;
	readonly contentType: 'hero' | 'testimonial' | 'video' | 'school' | 'cta';
	readonly interactionType: 'view' | 'click' | 'scroll' | 'hover' | 'share';
	readonly timestamp: number;
	readonly userId?: string;
	readonly sessionId: string;
	readonly duration?: number;
	readonly metadata?: Record<string, unknown>;
}
export interface ConversionEvent {
	readonly eventType:
		| 'quote_request'
		| 'contact_form'
		| 'phone_call'
		| 'email_inquiry';
	readonly contentSource: string;
	readonly timestamp: number;
	readonly sessionId: string;
	readonly value?: number;
	readonly metadata?: Record<string, unknown>;
}
export interface PerformanceMetric {
	readonly contentId: string;
	readonly contentType: string;
	readonly metric:
		| 'load_time'
		| 'render_time'
		| 'interaction_rate'
		| 'conversion_rate'
		| 'bounce_rate';
	readonly value: number;
	readonly timestamp: number;
	readonly sessionId: string;
}
export interface ContentAnalytics {
	readonly contentId: string;
	readonly contentType: string;
	readonly views: number;
	readonly interactions: number;
	readonly conversions: number;
	readonly averageEngagementTime: number;
	readonly bounceRate: number;
	readonly conversionRate: number;
	readonly revenueAttribution: number;
	readonly lastUpdated: number;
}
export interface AnalyticsInsight {
	readonly type: 'optimization' | 'warning' | 'success' | 'info';
	readonly title: string;
	readonly description: string;
	readonly contentId?: string;
	readonly actionable: boolean;
	readonly priority: 'high' | 'medium' | 'low';
	readonly estimatedImpact?: {
		readonly metric: string;
		readonly change: string;
		readonly confidence: number;
	};
}
interface AnalyticsStore {
	interactions: ContentInteraction[];
	conversions: ConversionEvent[];
	performanceMetrics: PerformanceMetric[];
	contentAnalytics: Map<string, ContentAnalytics>;
	currentSessionId: string;
	sessionStartTime: number;
	trackingEnabled: boolean;
	privacyMode: boolean;
	batchSize: number;
	flushInterval: number;
	trackInteraction: (
		interaction: Omit<ContentInteraction, 'timestamp' | 'sessionId'>,
	) => void;
	trackConversion: (
		conversion: Omit<ConversionEvent, 'timestamp' | 'sessionId'>,
	) => void;
	trackPerformance: (
		metric: Omit<PerformanceMetric, 'timestamp' | 'sessionId'>,
	) => void;
	getContentAnalytics: (contentId: string) => ContentAnalytics | null;
	getTopPerformingContent: (
		contentType?: string,
		limit?: number,
	) => ContentAnalytics[];
	getConversionFunnel: () => {
		views: number;
		interactions: number;
		conversions: number;
		revenue: number;
	};
	generateInsights: () => AnalyticsInsight[];
	clearAnalytics: () => void;
	exportAnalytics: () => string;
	setConfiguration: (
		config: Partial<{
			trackingEnabled: boolean;
			privacyMode: boolean;
			batchSize: number;
			flushInterval: number;
		}>,
	) => void;
}
const useAnalyticsStore = create<AnalyticsStore>()(
	persist(
		(set, get) => ({
			interactions: [],
			conversions: [],
			performanceMetrics: [],
			contentAnalytics: new Map(),
			currentSessionId: generateSessionId(),
			sessionStartTime: Date.now(),
			trackingEnabled: true,
			privacyMode: false,
			batchSize: 50,
			flushInterval: 30000,
			trackInteraction: (interaction) => {
				const state = get();
				if (!state.trackingEnabled) return;
				const fullInteraction: ContentInteraction = {
					...interaction,
					timestamp: Date.now(),
					sessionId: state.currentSessionId,
				};
				try {
					ContentInteractionSchema.parse(fullInteraction);
				} catch (error) {
					console.warn('Invalid interaction data:', error);
					return;
				}
				set((state) => ({
					interactions: [
						...state.interactions.slice(-state.batchSize + 1),
						fullInteraction,
					],
				}));
				get().updateContentAnalytics(fullInteraction.contentId, 'interaction');
			},
			trackConversion: (conversion) => {
				const state = get();
				if (!state.trackingEnabled) return;
				const fullConversion: ConversionEvent = {
					...conversion,
					timestamp: Date.now(),
					sessionId: state.currentSessionId,
				};
				try {
					ConversionEventSchema.parse(fullConversion);
				} catch (error) {
					console.warn('Invalid conversion data:', error);
					return;
				}
				set((state) => ({
					conversions: [
						...state.conversions.slice(-state.batchSize + 1),
						fullConversion,
					],
				}));
				get().updateContentAnalytics(
					fullConversion.contentSource,
					'conversion',
					fullConversion.value,
				);
			},
			trackPerformance: (metric) => {
				const state = get();
				if (!state.trackingEnabled) return;
				const fullMetric: PerformanceMetric = {
					...metric,
					timestamp: Date.now(),
					sessionId: state.currentSessionId,
				};
				try {
					PerformanceMetricSchema.parse(fullMetric);
				} catch (error) {
					console.warn('Invalid performance metric:', error);
					return;
				}
				set((state) => ({
					performanceMetrics: [
						...state.performanceMetrics.slice(-state.batchSize + 1),
						fullMetric,
					],
				}));
				get().updateContentAnalytics(
					fullMetric.contentId,
					'performance',
					fullMetric.value,
				);
			},
			getContentAnalytics: (contentId: string) => {
				const state = get();
				return state.contentAnalytics.get(contentId) || null;
			},
			getTopPerformingContent: (contentType?: string, limit = 10) => {
				const state = get();
				let analytics = Array.from(state.contentAnalytics.values());
				if (contentType) {
					analytics = analytics.filter((a) => a.contentType === contentType);
				}
				return analytics
					.sort((a, b) => b.conversionRate - a.conversionRate)
					.slice(0, limit);
			},
			getConversionFunnel: () => {
				const state = get();
				const totalViews = state.interactions.filter(
					(i) => i.interactionType === 'view',
				).length;
				const totalInteractions = state.interactions.length;
				const totalConversions = state.conversions.length;
				const totalRevenue = state.conversions.reduce(
					(sum, c) => sum + (c.value || 0),
					0,
				);
				return {
					views: totalViews,
					interactions: totalInteractions,
					conversions: totalConversions,
					revenue: totalRevenue,
				};
			},
			generateInsights: () => {
				const state = get();
				const insights: AnalyticsInsight[] = [];
				const analytics = Array.from(state.contentAnalytics.values());
				const lowPerformingContent = analytics.filter(
					(a) => a.conversionRate < 0.02 && a.views > 100,
				);
				lowPerformingContent.forEach((content) => {
					insights.push({
						type: 'optimization',
						title: `Low Conversion Rate for ${content.contentType}`,
						description: `Content "${content.contentId}" has ${(content.conversionRate * 100).toFixed(1)}% conversion rate. Consider A/B testing or content revision.`,
						contentId: content.contentId,
						actionable: true,
						priority: 'high',
						estimatedImpact: {
							metric: 'conversion_rate',
							change: '+25%',
							confidence: 0.7,
						},
					});
				});
				const highBounceContent = analytics.filter((a) => a.bounceRate > 0.7);
				highBounceContent.forEach((content) => {
					insights.push({
						type: 'warning',
						title: `High Bounce Rate for ${content.contentType}`,
						description: `Content "${content.contentId}" has ${(content.bounceRate * 100).toFixed(1)}% bounce rate. Users may not find it engaging.`,
						contentId: content.contentId,
						actionable: true,
						priority: 'medium',
					});
				});
				const topPerformers = analytics
					.sort((a, b) => b.conversionRate - a.conversionRate)
					.slice(0, 3);
				topPerformers.forEach((content) => {
					if (content.conversionRate > 0.05) {
						insights.push({
							type: 'success',
							title: `High Converting ${content.contentType}`,
							description: `Content "${content.contentId}" has excellent ${(content.conversionRate * 100).toFixed(1)}% conversion rate. Consider promoting this content more.`,
							contentId: content.contentId,
							actionable: true,
							priority: 'low',
						});
					}
				});
				const totalRevenue = state.conversions.reduce(
					(sum, c) => sum + (c.value || 0),
					0,
				);
				if (totalRevenue > 10000) {
					insights.push({
						type: 'success',
						title: 'Strong Revenue Performance',
						description: `Testimonials content has generated £${totalRevenue.toLocaleString()} in attributed revenue.`,
						actionable: false,
						priority: 'low',
					});
				}
				return insights.sort((a, b) => {
					const priorityOrder = {
						high: 3,
						medium: 2,
						low: 1,
					};
					return priorityOrder[b.priority] - priorityOrder[a.priority];
				});
			},
			clearAnalytics: () => {
				set({
					interactions: [],
					conversions: [],
					performanceMetrics: [],
					contentAnalytics: new Map(),
					currentSessionId: generateSessionId(),
					sessionStartTime: Date.now(),
				});
			},
			exportAnalytics: () => {
				const state = get();
				return JSON.stringify(
					{
						interactions: state.interactions,
						conversions: state.conversions,
						performanceMetrics: state.performanceMetrics,
						contentAnalytics: Object.fromEntries(state.contentAnalytics),
						sessionInfo: {
							sessionId: state.currentSessionId,
							startTime: state.sessionStartTime,
							duration: Date.now() - state.sessionStartTime,
						},
						exportTimestamp: Date.now(),
					},
					null,
					2,
				);
			},
			setConfiguration: (config) => {
				set((state) => ({
					trackingEnabled: config.trackingEnabled ?? state.trackingEnabled,
					privacyMode: config.privacyMode ?? state.privacyMode,
					batchSize: config.batchSize ?? state.batchSize,
					flushInterval: config.flushInterval ?? state.flushInterval,
				}));
			},
			updateContentAnalytics: (
				contentId: string,
				updateType: 'interaction' | 'conversion' | 'performance',
				value?: number,
			) => {
				set((state) => {
					const newAnalytics = new Map(state.contentAnalytics);
					const existing = newAnalytics.get(contentId) || {
						contentId,
						contentType: 'unknown',
						views: 0,
						interactions: 0,
						conversions: 0,
						averageEngagementTime: 0,
						bounceRate: 0,
						conversionRate: 0,
						revenueAttribution: 0,
						lastUpdated: Date.now(),
					};
					const updated = {
						...existing,
						lastUpdated: Date.now(),
					};
					switch (updateType) {
						case 'interaction':
							updated.interactions += 1;
							if (
								state.interactions.some(
									(i) => i.contentId === contentId && i.interactionType === 'view',
								)
							) {
								updated.views += 1;
							}
							break;
						case 'conversion':
							updated.conversions += 1;
							updated.revenueAttribution += value || 0;
							break;
						case 'performance':
							break;
					}
					if (updated.views > 0) {
						updated.conversionRate = updated.conversions / updated.views;
						updated.bounceRate = Math.max(
							0,
							(updated.views - updated.interactions) / updated.views,
						);
					}
					newAnalytics.set(contentId, updated);
					return {
						contentAnalytics: newAnalytics,
					};
				});
			},
		}),
		{
			name: 'cms-analytics-storage',
			partialize: (state) => ({
				interactions: state.interactions.slice(-100),
				conversions: state.conversions.slice(-50),
				contentAnalytics: Object.fromEntries(state.contentAnalytics),
			}),
		},
	),
);
export class CMSAnalyticsManager {
	private store = useAnalyticsStore;
	public trackInteraction(
		contentId: string,
		contentType: ContentInteraction['contentType'],
		interactionType: ContentInteraction['interactionType'],
		metadata?: Record<string, unknown>,
	): void {
		this.store.getState().trackInteraction({
			contentId,
			contentType,
			interactionType,
			metadata,
		});
	}
	public trackConversion(
		eventType: ConversionEvent['eventType'],
		contentSource: string,
		value?: number,
		metadata?: Record<string, unknown>,
	): void {
		this.store.getState().trackConversion({
			eventType,
			contentSource,
			value,
			metadata,
		});
	}
	public trackPerformance(
		contentId: string,
		contentType: string,
		metric: PerformanceMetric['metric'],
		value: number,
	): void {
		this.store.getState().trackPerformance({
			contentId,
			contentType,
			metric,
			value,
		});
	}
	public getDashboardData() {
		const state = this.store.getState();
		const funnel = state.getConversionFunnel();
		const insights = state.generateInsights();
		const topContent = state.getTopPerformingContent(undefined, 5);
		return {
			funnel,
			insights,
			topContent,
			totalSessions: new Set(state.interactions.map((i) => i.sessionId)).size,
			avgSessionDuration: this.calculateAverageSessionDuration(),
			revenueGrowth: this.calculateRevenueGrowth(),
		};
	}
	public getOptimizationRecommendations(): AnalyticsInsight[] {
		return this.store.getState().generateInsights();
	}
	public exportData(): string {
		return this.store.getState().exportAnalytics();
	}
	public configure(
		config: Parameters<AnalyticsStore['setConfiguration']>[0],
	): void {
		this.store.getState().setConfiguration(config);
	}
	private calculateAverageSessionDuration(): number {
		const state = this.store.getState();
		const sessionDurations = new Map<string, number>();
		state.interactions.forEach((interaction) => {
			if (interaction.duration) {
				sessionDurations.set(
					interaction.sessionId,
					(sessionDurations.get(interaction.sessionId) || 0) + interaction.duration,
				);
			}
		});
		const durations = Array.from(sessionDurations.values());
		return durations.length > 0 ?
				durations.reduce((sum, d) => sum + d, 0) / durations.length
			:	0;
	}
	private calculateRevenueGrowth(): number {
		const state = this.store.getState();
		const now = Date.now();
		const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
		const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
		const recentRevenue = state.conversions
			.filter((c) => c.timestamp > thirtyDaysAgo)
			.reduce((sum, c) => sum + (c.value || 0), 0);
		const previousRevenue = state.conversions
			.filter((c) => c.timestamp > sixtyDaysAgo && c.timestamp <= thirtyDaysAgo)
			.reduce((sum, c) => sum + (c.value || 0), 0);
		return previousRevenue > 0 ?
				((recentRevenue - previousRevenue) / previousRevenue) * 100
			:	0;
	}
}
function generateSessionId(): string {
	return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
export const cmsAnalyticsManager = new CMSAnalyticsManager();
export { useAnalyticsStore };
export function useCMSAnalytics() {
	const store = useAnalyticsStore();
	return {
		manager: cmsAnalyticsManager,
		trackInteraction: store.trackInteraction,
		trackConversion: store.trackConversion,
		trackPerformance: store.trackPerformance,
		getDashboardData: () => cmsAnalyticsManager.getDashboardData(),
		getInsights: store.generateInsights,
		isTrackingEnabled: store.trackingEnabled,
		configure: store.setConfiguration,
	};
}
