'use client';

import React, { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type {
	EnhancedFAQCategory,
	FAQCategoryAnalytics,
} from '@/lib/cms/cms-faq-categories';
import type { FAQQuestion } from '@/lib/cms/cms-content';
interface FAQAnalyticsEvent {
	type:
		| 'faq_question_view'
		| 'faq_question_expand'
		| 'faq_question_collapse'
		| 'faq_search_query'
		| 'faq_search_suggestion_click'
		| 'faq_search_zero_results'
		| 'faq_helpfulness_rating'
		| 'faq_print_view'
		| 'faq_bulk_expand'
		| 'faq_bulk_collapse'
		| 'faq_category_view'
		| 'faq_breadcrumb_click'
		| 'faq_related_question_click'
		| 'faq_page_entry'
		| 'faq_session_duration'
		| 'faq_bounce'
		| 'faq_to_consultation'
		| 'faq_to_contact'
		| 'faq_to_phone_click'
		| 'faq_to_email_click';
	event_category?: string;
	event_label?: string;
	value?: number;
	currency?: string;
	faq_category?: string;
	faq_subcategory?: string;
	faq_question_id?: string;
	faq_search_query?: string;
	faq_search_results_count?: number;
	faq_user_segment?:
		| 'oxbridge_prep'
		| '11_plus'
		| 'a_level_gcse'
		| 'elite_corporate'
		| 'comparison_shopper';
	faq_helpfulness_score?: number;
	faq_time_spent_reading?: number;
	faq_entry_point?: 'direct' | 'search' | 'internal_link' | 'social' | 'email';
	faq_page_position?: number;
	revenue_attribution?: number;
	conversion_probability?: number;
	support_ticket_prevention?: boolean;
	session_id: string;
	user_id?: string;
	timestamp: number;
	page_path?: string;
	referrer?: string;
	user_agent?: string;
}
interface FAQAnalyticsService {
	trackEvent(
		event: Omit<FAQAnalyticsEvent, 'timestamp' | 'session_id'>,
	): Promise<void>;
	trackQuestionView(
		questionId: string,
		category: string,
		userSegment?: string,
	): Promise<void>;
	trackQuestionExpand(
		questionId: string,
		category: string,
		timeSpent?: number,
	): Promise<void>;
	trackQuestionCollapse(
		questionId: string,
		category: string,
		timeSpent: number,
	): Promise<void>;
	trackPrintView(questionIds: string[], categories: string[]): Promise<void>;
	trackBulkAction(
		action: 'expand_all' | 'collapse_all',
		questionCount: number,
	): Promise<void>;
	trackSearchQuery(
		query: string,
		resultCount: number,
		categories: string[],
	): Promise<void>;
	trackSearchSuggestionClick(
		suggestion: string,
		originalQuery: string,
	): Promise<void>;
	trackZeroResults(query: string, suggestedQueries?: string[]): Promise<void>;
	trackSearchFilter(
		filterType: 'category' | 'difficulty' | 'segment',
		filterValue: string,
	): Promise<void>;
	trackPageEntry(
		entryPoint: string,
		referrer?: string,
		userSegment?: string,
	): Promise<void>;
	trackSessionDuration(
		duration: number,
		pagesViewed: number,
		questionsViewed: number,
	): Promise<void>;
	trackBounce(timeOnPage: number, interactionCount: number): Promise<void>;
	trackMultiPageSession(
		pageSequence: string[],
		totalTime: number,
	): Promise<void>;
	trackFAQToConsultation(
		questionId: string,
		category: string,
		revenueValue: number,
	): Promise<void>;
	trackFAQToContact(
		contactType: 'form' | 'phone' | 'email',
		questionContext: string[],
	): Promise<void>;
	trackPhoneClick(phoneNumber: string, faqContext: string): Promise<void>;
	trackEmailClick(emailAddress: string, faqContext: string): Promise<void>;
	trackHelpfulnessRating(
		questionId: string,
		rating: number,
		category: string,
	): Promise<void>;
	trackContentGap(searchQuery: string, suggestedContent: string): Promise<void>;
	getSessionMetrics(): Promise<EnhancedSessionAnalytics>;
	getUserSegment(): Promise<string | null>;
	getConversionProbability(questionId: string): Promise<number>;
	trackRevenueAttribution(
		amount: number,
		source: 'faq_direct' | 'faq_assisted',
	): Promise<void>;
}
interface EnhancedSessionAnalytics {
	categoriesViewed: string[];
	questionsViewed: string[];
	searchQueries: string[];
	timeSpent: number;
	interactionCount: number;
	helpfulnessRatings: {
		questionId: string;
		rating: number;
		category: string;
	}[];
	entryPoint: string;
	userSegment?: string;
	pageSequence: string[];
	searchResultClickthrough: number;
	zeroResultQueries: string[];
	bulkActionsUsed: number;
	printViewUsed: boolean;
	conversionEvents: {
		type: string;
		timestamp: number;
		questionContext: string[];
		revenueValue?: number;
	}[];
	supportTicketPrevention: number;
	conversionProbability: number;
	revenueAttribution: number;
	contentGaps: string[];
	averageResponseTime: number;
	searchEffectiveness: number;
	questionEngagement: number;
}
interface FAQAnalyticsTrackerProps {
	category?: EnhancedFAQCategory;
	subcategory?: string;
	question?: FAQQuestion;
	searchQuery?: string;
	enableTracking?: boolean;
	enableGA4?: boolean;
	debugMode?: boolean;
	consentGiven?: boolean;
	userSegment?:
		| 'oxbridge_prep'
		| '11_plus'
		| 'a_level_gcse'
		| 'elite_corporate'
		| 'comparison_shopper';
	entryPoint?: 'direct' | 'search' | 'internal_link' | 'social' | 'email';
	referrer?: string;
	revenueOpportunity?: number;
	conversionGoals?: string[];
	customDimensions?: Record<string, string | number>;
	customEvents?: Record<string, any>;
	eventPrefix?: string;
	batchEvents?: boolean;
	sampleRate?: number;
}
export function useFAQAnalytics(): FAQAnalyticsService {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const sessionId = React.useMemo(() => {
		if (typeof window === 'undefined') return 'server';
		let stored = localStorage.getItem('faq-session-id');
		if (!stored || isSessionExpired(stored)) {
			stored = generateSessionId();
		}
		return stored;
	}, []);
	const clientId = React.useMemo(() => {
		if (typeof window === 'undefined') return 'server';
		let stored = localStorage.getItem('faq-client-id');
		if (!stored) {
			stored = `faq_client_${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
			localStorage.setItem('faq-client-id', stored);
		}
		return stored;
	}, []);
	function generateSessionId(): string {
		const sessionId = `faq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		if (typeof window !== 'undefined') {
			localStorage.setItem('faq-session-id', sessionId);
			localStorage.setItem('faq-session-start', Date.now().toString());
		}
		return sessionId;
	}
	function isSessionExpired(sessionId: string): boolean {
		if (typeof window === 'undefined') return false;
		const sessionStart = localStorage.getItem('faq-session-start');
		if (!sessionStart) return true;
		const elapsed = Date.now() - parseInt(sessionStart, 10);
		return elapsed > 30 * 60 * 1000;
	}
	function getStoredSessionData() {
		if (typeof window === 'undefined') {
			return {
				searchQueries: [],
				categoriesViewed: [],
				timeSpent: 0,
			};
		}
		const sessionEvents: FAQAnalyticsEvent[] = JSON.parse(
			localStorage.getItem('faq-session-events') || '[]',
		);
		return {
			searchQueries: sessionEvents
				.filter((e) => e.type === 'faq_search_query')
				.map((e) => e.faq_search_query)
				.filter(Boolean),
			categoriesViewed: sessionEvents
				.filter((e) => e.type === 'faq_category_view')
				.map((e) => e.faq_category)
				.filter(Boolean),
			timeSpent:
				sessionEvents.length > 0 ?
					Date.now() - Math.min(...sessionEvents.map((e) => e.timestamp))
				:	0,
		};
	}
	function getStoredSessionEvents(): FAQAnalyticsEvent[] {
		if (typeof window === 'undefined') return [];
		return JSON.parse(localStorage.getItem('faq-session-events') || '[]');
	}
	function updateSessionSummary(event: FAQAnalyticsEvent) {
		if (typeof window === 'undefined') return;
		try {
			const summary = JSON.parse(
				localStorage.getItem('faq-session-summary') || '{}',
			);
			summary.lastEventTime = event.timestamp;
			summary.eventCount = (summary.eventCount || 0) + 1;
			localStorage.setItem('faq-session-summary', JSON.stringify(summary));
		} catch (error) {
			console.warn('[FAQ Analytics] Session summary update error:', error);
		}
	}
	function detectEntryPoint(): string {
		if (typeof window === 'undefined') return 'server';
		const referrer = document.referrer;
		if (!referrer) return 'direct';
		try {
			const referrerHost = new URL(referrer).hostname;
			const currentHost = window.location.hostname;
			if (referrerHost === currentHost) return 'internal_link';
			if (referrerHost.includes('google') || referrerHost.includes('bing'))
				return 'search';
			if (referrerHost.includes('facebook') || referrerHost.includes('twitter'))
				return 'social';
			return 'external';
		} catch {
			return 'unknown';
		}
	}
	async function getSessionQuestionCount(): Promise<number> {
		if (typeof window === 'undefined') return 0;
		const sessionEvents = getStoredSessionEvents();
		return [
			...new Set(
				sessionEvents
					.filter((e) => e.type === 'faq_question_view')
					.map((e) => e.faq_question_id),
			),
		].length;
	}
	const detectUserSegment = React.useCallback((): string | undefined => {
		if (typeof window === 'undefined') return undefined;
		const sessionData = getStoredSessionData();
		if (
			sessionData.searchQueries.some(
				(q) =>
					(q && q.toLowerCase().includes('oxbridge')) ||
					(q && q.toLowerCase().includes('cambridge')) ||
					(q && q.toLowerCase().includes('oxford')),
			)
		) {
			return 'oxbridge_prep';
		}
		if (
			sessionData.searchQueries.some(
				(q) =>
					(q && q.toLowerCase().includes('11+')) ||
					(q && q.toLowerCase().includes('eleven plus')) ||
					(q && q.toLowerCase().includes('grammar school')),
			)
		) {
			return '11_plus';
		}
		if (
			sessionData.categoriesViewed.length > 5 &&
			sessionData.timeSpent > 600000
		) {
			return 'elite_corporate';
		}
		if (
			sessionData.searchQueries.some(
				(q) =>
					(q && q.toLowerCase().includes('vs')) ||
					(q && q.toLowerCase().includes('compare')) ||
					(q && q.toLowerCase().includes('better')),
			)
		) {
			return 'comparison_shopper';
		}
		return 'a_level_gcse';
	}, []);
	const trackEvent = useCallback(
		async (event: Omit<FAQAnalyticsEvent, 'timestamp' | 'session_id'>) => {
			const fullEvent: FAQAnalyticsEvent = {
				...event,
				timestamp: Date.now(),
				session_id: sessionId,
				page_path: pathname,
				referrer: typeof document !== 'undefined' ? document.referrer : undefined,
				user_agent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
				faq_user_segment: (event.faq_user_segment || detectUserSegment()) as any,
				faq_entry_point: detectEntryPoint() as any,
			};
			if (typeof window !== 'undefined' && window.gtag) {
				try {
					window.gtag('event', event.type, {
						event_category: event.event_category || 'FAQ_Interaction',
						event_label:
							event.event_label || event.faq_question_id || event.faq_category,
						value: event.value || 0,
						currency: event.currency || 'GBP',
						faq_category: event.faq_category,
						faq_subcategory: event.faq_subcategory,
						faq_question_id: event.faq_question_id,
						faq_search_query: event.faq_search_query,
						faq_search_results_count: event.faq_search_results_count,
						faq_user_segment: fullEvent.faq_user_segment,
						faq_helpfulness_score: event.faq_helpfulness_score,
						faq_time_spent_reading: event.faq_time_spent_reading,
						faq_entry_point: fullEvent.faq_entry_point,
						faq_page_position: event.faq_page_position,
						revenue_attribution: event.revenue_attribution,
						conversion_probability: event.conversion_probability,
						support_ticket_prevention: event.support_ticket_prevention,
						session_id: fullEvent.session_id,
						client_id: clientId,
						page_path: fullEvent.page_path,
						non_interaction: ![
							'faq_to_consultation',
							'faq_to_contact',
							'faq_helpfulness_rating',
						].includes(event.type),
					});
					if (event.type.startsWith('faq_to_') && event.revenue_attribution) {
						window.gtag('event', 'generate_lead', {
							currency: 'GBP',
							value: event.revenue_attribution,
							lead_source: 'FAQ_Interaction',
							content_category: event.faq_category,
							content_group1: fullEvent.faq_user_segment,
							custom_parameters: {
								question_id: event.faq_question_id,
								search_context: event.faq_search_query,
								session_questions_viewed: await getSessionQuestionCount(),
							},
						});
					}
				} catch (error) {
					console.warn('[FAQ Analytics] GA4 tracking error:', error);
				}
			}
			if (typeof window !== 'undefined') {
				try {
					const sessionEvents = getStoredSessionEvents();
					sessionEvents.push(fullEvent);
					const limitedEvents = sessionEvents.slice(-100);
					localStorage.setItem('faq-session-events', JSON.stringify(limitedEvents));
					updateSessionSummary(fullEvent);
					if (process.env.NODE_ENV === 'development') {
						console.log('[FAQ Analytics] Event tracked:', {
							type: event.type,
							category: event.faq_category,
							segment: fullEvent.faq_user_segment,
							value: event.value,
						});
					}
				} catch (error) {
					console.warn('[FAQ Analytics] Storage error:', error);
				}
			}
		},
		[pathname, sessionId, clientId, detectUserSegment],
	);
	const trackCategoryView = useCallback(
		(categorySlug: string, subcategorySlug?: string) => {
			trackEvent({
				type: 'faq_category_view',
				faq_category: categorySlug,
				faq_subcategory: subcategorySlug || undefined,
				event_category: 'FAQ_Navigation',
				event_label: categorySlug,
			});
		},
		[trackEvent],
	);
	const trackQuestionInteraction = useCallback(
		(questionId: string, action: 'open' | 'close', categorySlug?: string) => {
			trackEvent({
				type: action === 'open' ? 'faq_question_expand' : 'faq_question_collapse',
				faq_question_id: questionId,
				faq_category: categorySlug || undefined,
				event_category: 'FAQ_Interaction',
				event_label: questionId,
			});
		},
		[trackEvent],
	);
	const trackSearch = useCallback(
		(query: string, resultCount: number, categories: string[]) => {
			trackEvent({
				type: 'faq_search_query',
				faq_search_query: query,
				faq_search_results_count: resultCount,
				event_category: 'FAQ_Search',
				event_label: query,
				value: resultCount,
			});
		},
		[trackEvent],
	);
	const trackConversion = useCallback(
		(type: 'consultation' | 'contact' | 'phone', source: string) => {
			trackEvent({
				type: 'faq_to_contact',
				event_category: 'FAQ_Conversion',
				event_label: type,
			});
		},
		[trackEvent, pathname],
	);
	const trackQuestionView = useCallback(
		async (questionId: string, category: string, userSegment?: string) => {
			return trackEvent({
				type: 'faq_question_view',
				faq_question_id: questionId,
				faq_category: category,
				faq_user_segment: userSegment as any,
				event_category: 'FAQ_Interaction',
				event_label: questionId,
			});
		},
		[trackEvent],
	);
	const trackQuestionExpand = useCallback(
		async (questionId: string, category: string, timeSpent?: number) => {
			return trackEvent({
				type: 'faq_question_expand',
				faq_question_id: questionId,
				faq_category: category,
				faq_time_spent_reading: timeSpent || undefined,
				event_category: 'FAQ_Interaction',
				event_label: questionId,
			});
		},
		[trackEvent],
	);
	const trackQuestionCollapse = useCallback(
		async (questionId: string, category: string, timeSpent: number) => {
			return trackEvent({
				type: 'faq_question_collapse',
				faq_question_id: questionId,
				faq_category: category,
				faq_time_spent_reading: timeSpent,
				event_category: 'FAQ_Interaction',
				event_label: questionId,
			});
		},
		[trackEvent],
	);
	const trackPrintView = useCallback(
		async (questionIds: string[], categories: string[]) => {
			return trackEvent({
				type: 'faq_print_view',
				event_category: 'FAQ_Interaction',
				event_label: `${questionIds.length}_questions`,
				value: questionIds.length,
			});
		},
		[trackEvent],
	);
	const trackBulkAction = useCallback(
		async (action: 'expand_all' | 'collapse_all', questionCount: number) => {
			return trackEvent({
				type: action === 'expand_all' ? 'faq_bulk_expand' : 'faq_bulk_collapse',
				event_category: 'FAQ_Interaction',
				event_label: action,
				value: questionCount,
			});
		},
		[trackEvent],
	);
	const trackSearchQuery = useCallback(
		async (query: string, resultCount: number, categories: string[]) => {
			return trackEvent({
				type: 'faq_search_query',
				faq_search_query: query,
				faq_search_results_count: resultCount,
				event_category: 'FAQ_Search',
				event_label: query,
				value: resultCount,
			});
		},
		[trackEvent],
	);
	const trackSearchSuggestionClick = useCallback(
		async (suggestion: string, originalQuery: string) => {
			return trackEvent({
				type: 'faq_search_suggestion_click',
				faq_search_query: originalQuery,
				event_category: 'FAQ_Search',
				event_label: suggestion,
			});
		},
		[trackEvent],
	);
	const trackZeroResults = useCallback(
		async (query: string, suggestedQueries?: string[]) => {
			return trackEvent({
				type: 'faq_search_zero_results',
				faq_search_query: query,
				event_category: 'FAQ_Search',
				event_label: 'zero_results',
				value: 0,
			});
		},
		[trackEvent],
	);
	const trackSearchFilter = useCallback(
		async (
			filterType: 'category' | 'difficulty' | 'segment',
			filterValue: string,
		) => {
			return trackEvent({
				type: 'faq_search_query',
				event_category: 'FAQ_Filter',
				event_label: `${filterType}_${filterValue}`,
			});
		},
		[trackEvent],
	);
	const trackPageEntry = useCallback(
		async (entryPoint: string, referrer?: string, userSegment?: string) => {
			return trackEvent({
				type: 'faq_page_entry',
				faq_entry_point: entryPoint as any,
				faq_user_segment: userSegment as any,
				referrer: referrer || undefined,
				event_category: 'FAQ_Navigation',
				event_label: entryPoint,
			});
		},
		[trackEvent],
	);
	const trackSessionDuration = useCallback(
		async (duration: number, pagesViewed: number, questionsViewed: number) => {
			return trackEvent({
				type: 'faq_session_duration',
				value: Math.round(duration / 1000),
				event_category: 'FAQ_Session',
				event_label: 'session_end',
			});
		},
		[trackEvent],
	);
	const trackBounce = useCallback(
		async (timeOnPage: number, interactionCount: number) => {
			return trackEvent({
				type: 'faq_bounce',
				value: Math.round(timeOnPage / 1000),
				event_category: 'FAQ_Session',
				event_label: 'bounce',
			});
		},
		[trackEvent],
	);
	const trackMultiPageSession = useCallback(
		async (pageSequence: string[], totalTime: number) => {
			return trackEvent({
				type: 'faq_session_duration',
				value: Math.round(totalTime / 1000),
				event_category: 'FAQ_Session',
				event_label: 'multi_page',
			});
		},
		[trackEvent],
	);
	const trackFAQToConsultation = useCallback(
		async (questionId: string, category: string, revenueValue: number) => {
			return trackEvent({
				type: 'faq_to_consultation',
				faq_question_id: questionId,
				faq_category: category,
				revenue_attribution: revenueValue,
				value: revenueValue,
				currency: 'GBP',
				event_category: 'FAQ_Conversion',
				event_label: 'consultation',
			});
		},
		[trackEvent],
	);
	const trackFAQToContact = useCallback(
		async (
			contactType: 'form' | 'phone' | 'email',
			questionContext: string[],
		) => {
			return trackEvent({
				type: 'faq_to_contact',
				event_category: 'FAQ_Conversion',
				event_label: contactType,
			});
		},
		[trackEvent],
	);
	const trackPhoneClick = useCallback(
		async (phoneNumber: string, faqContext: string) => {
			return trackEvent({
				type: 'faq_to_phone_click',
				event_category: 'FAQ_Conversion',
				event_label: 'phone_click',
			});
		},
		[trackEvent],
	);
	const trackEmailClick = useCallback(
		async (emailAddress: string, faqContext: string) => {
			return trackEvent({
				type: 'faq_to_email_click',
				event_category: 'FAQ_Conversion',
				event_label: 'email_click',
			});
		},
		[trackEvent],
	);
	const trackContentGap = useCallback(
		async (searchQuery: string, suggestedContent: string) => {
			return trackEvent({
				type: 'faq_search_zero_results',
				faq_search_query: searchQuery,
				event_category: 'FAQ_ContentGap',
				event_label: searchQuery,
			});
		},
		[trackEvent],
	);
	const getUserSegment = useCallback(async (): Promise<string | null> => {
		return detectUserSegment() || null;
	}, [detectUserSegment]);
	const getConversionProbability = useCallback(
		async (questionId: string): Promise<number> => {
			return 0.15;
		},
		[],
	);
	const trackRevenueAttribution = useCallback(
		async (amount: number, source: 'faq_direct' | 'faq_assisted') => {
			return trackEvent({
				type: 'faq_to_consultation',
				revenue_attribution: amount,
				value: amount,
				currency: 'GBP',
				event_category: 'FAQ_Revenue',
				event_label: source,
			});
		},
		[trackEvent],
	);
	const getSessionMetrics =
		useCallback(async (): Promise<EnhancedSessionAnalytics> => {
			if (typeof window === 'undefined') {
				return {
					categoriesViewed: [],
					questionsViewed: [],
					searchQueries: [],
					timeSpent: 0,
					interactionCount: 0,
					helpfulnessRatings: [],
					entryPoint: 'direct',
					pageSequence: [],
					searchResultClickthrough: 0,
					zeroResultQueries: [],
					bulkActionsUsed: 0,
					printViewUsed: false,
					conversionEvents: [],
					supportTicketPrevention: 0,
					conversionProbability: 0,
					revenueAttribution: 0,
					contentGaps: [],
					averageResponseTime: 0,
					searchEffectiveness: 0,
					questionEngagement: 0,
				};
			}
			const sessionEvents: FAQAnalyticsEvent[] = JSON.parse(
				localStorage.getItem('faq-session-events') || '[]',
			);
			const categoriesViewed = [
				...new Set(
					sessionEvents
						.filter((e) => e.type === 'faq_category_view')
						.map((e) => e.faq_category)
						.filter((c): c is string => Boolean(c)),
				),
			];
			const questionsViewed = [
				...new Set(
					sessionEvents
						.filter((e) => e.type === 'faq_question_view')
						.map((e) => e.faq_question_id)
						.filter((q): q is string => Boolean(q)),
				),
			];
			const searchQueries = [
				...new Set(
					sessionEvents
						.filter((e) => e.type === 'faq_search_query')
						.map((e) => e.faq_search_query)
						.filter((q): q is string => Boolean(q)),
				),
			];
			return {
				categoriesViewed,
				questionsViewed,
				searchQueries,
				timeSpent:
					sessionEvents.length > 0 ?
						Date.now() - Math.min(...sessionEvents.map((e) => e.timestamp))
					:	0,
				interactionCount: sessionEvents.length,
				helpfulnessRatings: sessionEvents
					.filter((e) => e.type === 'faq_helpfulness_rating')
					.map((e) => ({
						questionId: e.faq_question_id || '',
						rating: e.faq_helpfulness_score || 0,
						category: e.faq_category || '',
					})),
				entryPoint: sessionEvents[0]?.faq_entry_point || 'direct',
				pageSequence: [
					...new Set(
						sessionEvents
							.map((e) => e.page_path)
							.filter((p): p is string => Boolean(p)),
					),
				],
				searchResultClickthrough: sessionEvents.filter(
					(e) => e.type === 'faq_search_suggestion_click',
				).length,
				zeroResultQueries: sessionEvents
					.filter((e) => e.type === 'faq_search_zero_results')
					.map((e) => e.faq_search_query)
					.filter((q): q is string => Boolean(q)),
				bulkActionsUsed: sessionEvents.filter(
					(e) => e.type === 'faq_bulk_expand' || e.type === 'faq_bulk_collapse',
				).length,
				printViewUsed: sessionEvents.some((e) => e.type === 'faq_print_view'),
				conversionEvents: sessionEvents
					.filter((e) => e.type.startsWith('faq_to_'))
					.map((e) => ({
						type: e.type,
						timestamp: e.timestamp,
						questionContext: [e.faq_question_id || ''].filter((q): q is string =>
							Boolean(q),
						),
						revenueValue: e.revenue_attribution || undefined,
					})),
				supportTicketPrevention: sessionEvents.filter(
					(e) => e.support_ticket_prevention,
				).length,
				conversionProbability: 0.15,
				revenueAttribution: sessionEvents.reduce(
					(sum, e) => sum + (e.revenue_attribution || 0),
					0,
				),
				contentGaps: [
					...new Set(
						sessionEvents
							.filter((e) => e.type === 'faq_search_zero_results')
							.map((e) => e.faq_search_query)
							.filter((q): q is string => Boolean(q)),
					),
				],
				averageResponseTime: 150,
				searchEffectiveness: searchQueries.length > 0 ? 0.85 : 0,
				questionEngagement:
					questionsViewed.length > 0 ?
						sessionEvents.reduce(
							(sum, e) => sum + (e.faq_time_spent_reading || 0),
							0,
						) / questionsViewed.length
					:	0,
			};
		}, []);
	return {
		trackEvent,
		trackQuestionView,
		trackQuestionExpand,
		trackQuestionCollapse,
		trackPrintView,
		trackBulkAction,
		trackSearchQuery,
		trackSearchSuggestionClick,
		trackZeroResults,
		trackSearchFilter,
		trackPageEntry,
		trackSessionDuration,
		trackBounce,
		trackMultiPageSession,
		trackFAQToConsultation,
		trackFAQToContact,
		trackPhoneClick,
		trackEmailClick,
		trackContentGap,
		trackCategoryView,
		trackSearch,
		trackQuestionInteraction,
		trackConversion,
		getSessionMetrics,
		getUserSegment,
		getConversionProbability,
		trackRevenueAttribution,
	};
}
export function FAQAnalyticsTracker({
	category,
	subcategory,
	question,
	searchQuery,
	enableTracking = true,
	debugMode = false,
	customEvents,
}: FAQAnalyticsTrackerProps) {
	const analytics = useFAQAnalytics();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {
		if (!enableTracking) return;
		if (category) {
			analytics.trackCategoryView(category.slug, subcategory);
			if (debugMode) {
				console.log('[FAQ Analytics] Category view tracked:', {
					category: category.slug,
					subcategory,
					pathname,
				});
			}
		}
	}, [
		category?.slug,
		subcategory,
		pathname,
		analytics,
		enableTracking,
		debugMode,
	]);
	useEffect(() => {
		if (!enableTracking || !searchQuery) return;
		const timeoutId = setTimeout(() => {
			analytics.trackSearch(searchQuery, 0, category ? [category.slug] : []);
			if (debugMode) {
				console.log('[FAQ Analytics] Search query tracked:', searchQuery);
			}
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [searchQuery, category?.slug, analytics, enableTracking, debugMode]);
	useEffect(() => {
		if (!enableTracking || !customEvents) return;
		Object.entries(customEvents).forEach(([eventType, eventData]) => {
			analytics.trackEvent({
				type: eventType as any,
				event_category: 'FAQ_Custom',
				event_label: eventType,
			});
			if (debugMode) {
				console.log('[FAQ Analytics] Custom event tracked:', eventType, eventData);
			}
		});
	}, [customEvents, analytics, enableTracking, debugMode]);
	return null;
}
export function FAQHelpfulnessRating({
	questionId,
	categorySlug,
	onRating,
	className = '',
}: {
	questionId: string;
	categorySlug?: string;
	onRating?: (rating: number) => void;
	className?: string;
}) {
	const analytics = useFAQAnalytics();
	const handleRating = (helpful: boolean) => {
		const rating = helpful ? 1 : 0;
		analytics.trackEvent({
			type: 'faq_helpfulness_rating',
			faq_question_id: questionId,
			faq_category: categorySlug,
			faq_helpfulness_score: rating,
			event_category: 'FAQ_Helpfulness',
			event_label: questionId,
			value: rating,
		});
		onRating?.(rating);
	};
	return (
		<div className={`flex items-center space-x-4 ${className}`}>
			<span className='text-sm text-slate-600'>Was this helpful?</span>
			<div className='flex space-x-2'>
				<button
					onClick={() => handleRating(true)}
					className='px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200'>
					👍 Yes
				</button>
				<button
					onClick={() => handleRating(false)}
					className='px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors duration-200'>
					👎 No
				</button>
			</div>
		</div>
	);
}
declare global {
	interface Window {
		dataLayer?: any[];
	}
}
export default FAQAnalyticsTracker;
