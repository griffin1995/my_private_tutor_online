'use client';

import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useRef,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
	FAQSearchEngine,
	FAQSearchResult,
	FAQSearchMetadata,
	createFAQSearchEngine,
	SearchPerformanceUtils,
} from './faq-search-engine';
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content';
import type { AdvancedSearchFilters } from '@/components/faq/faq-advanced-search-filters';
export interface SearchFilters {
	category?: string;
	difficulty?: 'basic' | 'intermediate' | 'advanced';
	clientSegment?:
		| 'oxbridge_prep'
		| '11_plus'
		| 'elite_corporate'
		| 'comparison_shopper'
		| 'all';
	featured?: boolean;
	limit?: number;
}
export type ExtendedSearchFilters = SearchFilters &
	Partial<AdvancedSearchFilters>;
export interface FAQSearchState {
	query: string;
	results: FAQSearchResult[];
	metadata: FAQSearchMetadata | null;
	isSearching: boolean;
	hasSearched: boolean;
	error: string | null;
	filters: ExtendedSearchFilters;
	suggestions: string[];
	lastSearchTime: number;
	performanceStats: {
		averageSearchTime: number;
		totalSearches: number;
		performanceRating: 'excellent' | 'good' | 'acceptable' | 'poor';
	};
	searchHistory: string[];
	recentSearches: string[];
}
export interface FAQSearchHook {
	state: FAQSearchState;
	search: (query: string, filters?: ExtendedSearchFilters) => Promise<void>;
	clearSearch: () => void;
	setQuery: (query: string) => void;
	setFilters: (filters: Partial<ExtendedSearchFilters>) => void;
	getSuggestions: (query: string) => string[];
	selectSuggestion: (suggestion: string) => void;
	highlightQuery: (text: string, query: string) => string;
	getPerformanceReport: () => {
		meetsTargets: boolean;
		recommendations: string[];
	};
	searchEngine: FAQSearchEngine | null;
}
export interface UseFAQSearchOptions {
	debounceMs?: number;
	maxSuggestions?: number;
	enableAnalytics?: boolean;
	performanceTracking?: boolean;
	autoSearch?: boolean;
	minQueryLength?: number;
}
export function useFAQSearch(
	questions: FAQQuestion[],
	categories: FAQCategory[],
	options: UseFAQSearchOptions = {},
): FAQSearchHook {
	const {
		debounceMs = 150,
		maxSuggestions = 5,
		enableAnalytics = true,
		performanceTracking = true,
		autoSearch = true,
		minQueryLength = 2,
	} = options;
	const searchEngine = useMemo(() => {
		if (!questions.length || !categories.length) return null;
		return createFAQSearchEngine(questions, categories, {
			maxResults: 50,
			boostRecent: true,
			boostFeatured: true,
		});
	}, [questions, categories]);
	const searchTimesRef = useRef<number[]>([]);
	const totalSearchesRef = useRef(0);
	const [state, setState] = useState<FAQSearchState>({
		query: '',
		results: [],
		metadata: null,
		isSearching: false,
		hasSearched: false,
		error: null,
		filters: {},
		suggestions: [],
		lastSearchTime: 0,
		performanceStats: {
			averageSearchTime: 0,
			totalSearches: 0,
			performanceRating: 'excellent',
		},
		searchHistory: [],
		recentSearches: [],
	});
	const processAdvancedFilters = useCallback(
		(filters: ExtendedSearchFilters) => {
			const basicFilters: any = {
				category: filters.category,
				difficulty: filters.difficulty || filters.answerComplexity,
				clientSegment: filters.clientSegment || filters.clientSegments?.[0],
				featured: filters.featured || filters.featuredOnly,
				limit: filters.limit,
			};
			return Object.fromEntries(
				Object.entries(basicFilters).filter(([_, value]) => value !== undefined),
			);
		},
		[],
	);
	const applyAdvancedFilters = useCallback(
		(
			results: FAQSearchResult[],
			filters: ExtendedSearchFilters,
		): FAQSearchResult[] => {
			let filteredResults = [...results];
			if (filters.categories && filters.categories.length > 0) {
				filteredResults = filteredResults.filter((result) => {
					if (filters.categoryLogic === 'AND') {
						return filters.categories!.every((cat) => result.item.category === cat);
					} else {
						return filters.categories!.some((cat) => result.item.category === cat);
					}
				});
			}
			if (filters.dateRange) {
				const now = new Date();
				let dateFrom: Date | undefined;
				let dateTo: Date | undefined;
				if (filters.dateRange.preset) {
					switch (filters.dateRange.preset) {
						case 'today':
							dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
							break;
						case 'week':
							dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
							break;
						case 'month':
							dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
							break;
						case 'quarter':
							const quarter = Math.floor(now.getMonth() / 3);
							dateFrom = new Date(now.getFullYear(), quarter * 3, 1);
							break;
						case 'year':
							dateFrom = new Date(now.getFullYear(), 0, 1);
							break;
					}
				} else {
					dateFrom = filters.dateRange.from;
					dateTo = filters.dateRange.to;
				}
				if (dateFrom || dateTo) {
					filteredResults = filteredResults.filter((result) => {
						const itemDate = new Date(result.item.lastUpdated);
						if (dateFrom && itemDate < dateFrom) return false;
						if (dateTo && itemDate > dateTo) return false;
						return true;
					});
				}
			}
			if (filters.includeTags && filters.includeTags.length > 0) {
				filteredResults = filteredResults.filter((result) => {
					const itemTags = result.item.tags || [];
					return filters.tagLogic === 'AND' ?
							filters.includeTags!.every((tag) => itemTags.includes(tag))
						:	filters.includeTags!.some((tag) => itemTags.includes(tag));
				});
			}
			if (filters.excludeTags && filters.excludeTags.length > 0) {
				filteredResults = filteredResults.filter((result) => {
					const itemTags = result.item.tags || [];
					return !filters.excludeTags!.some((tag) => itemTags.includes(tag));
				});
			}
			if (filters.minViews) {
				filteredResults = filteredResults.filter(
					(result) => (result.item.analytics?.views || 0) >= filters.minViews!,
				);
			}
			if (filters.minRating) {
				filteredResults = filteredResults.filter((result) => {
					const analytics = result.item.analytics;
					if (!analytics || !analytics.helpful || !analytics.notHelpful)
						return false;
					const rating =
						(analytics.helpful / (analytics.helpful + analytics.notHelpful)) * 5;
					return rating >= filters.minRating!;
				});
			}
			if (filters.minHelpfulness) {
				filteredResults = filteredResults.filter((result) => {
					const analytics = result.item.analytics;
					if (!analytics || !analytics.helpful || !analytics.notHelpful)
						return false;
					const helpfulness =
						(analytics.helpful / (analytics.helpful + analytics.notHelpful)) * 100;
					return helpfulness >= filters.minHelpfulness!;
				});
			}
			if (filters.showTrending) {
				filteredResults = filteredResults.filter(
					(result) => result.item.analytics?.trending === true,
				);
			}
			if (filters.contentLength && filters.contentLength !== 'any') {
				filteredResults = filteredResults.filter((result) => {
					const wordCount = (result.item.question + ' ' + result.item.answer).split(
						' ',
					).length;
					switch (filters.contentLength) {
						case 'short':
							return wordCount < 200;
						case 'medium':
							return wordCount >= 200 && wordCount <= 500;
						case 'long':
							return wordCount > 500;
						default:
							return true;
					}
				});
			}
			if (filters.readingTime) {
				filteredResults = filteredResults.filter((result) => {
					const readingTime = result.item.estimatedReadTime || 0;
					if (filters.readingTime!.min && readingTime < filters.readingTime!.min)
						return false;
					if (filters.readingTime!.max && readingTime > filters.readingTime!.max)
						return false;
					return true;
				});
			}
			if (filters.clientSegments && filters.clientSegments.length > 0) {
				filteredResults = filteredResults.filter(
					(result) =>
						filters.clientSegments!.includes(result.item.clientSegment || '') ||
						result.item.clientSegment === 'all',
				);
			}
			if (filters.journeyStage && filters.journeyStage !== 'any') {
				filteredResults = filteredResults.filter((result) => {
					const tags = result.item.tags || [];
					const category = result.item.category || '';
					switch (filters.journeyStage) {
						case 'awareness':
							return tags.includes('introduction') || category.includes('overview');
						case 'consideration':
							return tags.includes('comparison') || tags.includes('options');
						case 'decision':
							return tags.includes('pricing') || tags.includes('booking');
						case 'retention':
							return tags.includes('support') || tags.includes('ongoing');
						default:
							return true;
					}
				});
			}
			if (filters.priorityRange) {
				filteredResults = filteredResults.filter((result) => {
					const priority = result.item.priority || 5;
					return (
						priority >= filters.priorityRange!.min &&
						priority <= filters.priorityRange!.max
					);
				});
			}
			return filteredResults;
		},
		[],
	);
	const executeSearch = useCallback(
		async (query: string, filters: ExtendedSearchFilters = {}) => {
			if (!searchEngine || query.length < minQueryLength) {
				setState((prev) => ({
					...prev,
					results: [],
					metadata: null,
					hasSearched: query.length >= minQueryLength,
					error:
						query.length < minQueryLength && query.length > 0 ?
							`Please enter at least ${minQueryLength} characters`
						:	null,
				}));
				return;
			}
			setState((prev) => ({
				...prev,
				isSearching: true,
				error: null,
			}));
			try {
				const basicFilters = processAdvancedFilters(filters);
				const { result, executionTime } =
					await SearchPerformanceUtils.measureSearchTime(async () => {
						const searchResult = await searchEngine.search(query, basicFilters);
						const filteredResults = applyAdvancedFilters(
							searchResult.results,
							filters,
						);
						let sortedResults = filteredResults;
						if (filters.sortBy && filters.sortBy !== 'relevance') {
							sortedResults = [...filteredResults].sort((a, b) => {
								const aItem = a.item;
								const bItem = b.item;
								let comparison = 0;
								switch (filters.sortBy) {
									case 'date':
										comparison =
											new Date(bItem.lastUpdated).getTime() -
											new Date(aItem.lastUpdated).getTime();
										break;
									case 'popularity':
										const aViews = aItem.analytics?.views || 0;
										const bViews = bItem.analytics?.views || 0;
										comparison = bViews - aViews;
										break;
									case 'alphabetical':
										comparison = aItem.question.localeCompare(bItem.question);
										break;
									case 'priority':
										comparison = (bItem.priority || 5) - (aItem.priority || 5);
										break;
									default:
										comparison = 0;
								}
								return filters.sortOrder === 'asc' ? comparison : -comparison;
							});
						}
						return {
							results: sortedResults,
							metadata: {
								...searchResult.metadata,
								totalResults: sortedResults.length,
							},
						};
					});
				if (performanceTracking) {
					searchTimesRef.current.push(executionTime);
					totalSearchesRef.current += 1;
					if (searchTimesRef.current.length > 100) {
						searchTimesRef.current = searchTimesRef.current.slice(-100);
					}
				}
				const performanceResult =
					SearchPerformanceUtils.validatePerformance(executionTime);
				setState((prev) => ({
					...prev,
					results: result.results,
					metadata: result.metadata,
					isSearching: false,
					hasSearched: true,
					lastSearchTime: executionTime,
					performanceStats: {
						averageSearchTime:
							searchTimesRef.current.reduce((a, b) => a + b, 0) /
							searchTimesRef.current.length,
						totalSearches: totalSearchesRef.current,
						performanceRating: performanceResult.performance,
					},
					searchHistory:
						prev.searchHistory.includes(query) ?
							prev.searchHistory
						:	[query, ...prev.searchHistory].slice(0, 50),
					recentSearches: [
						query,
						...prev.recentSearches.filter((s) => s !== query),
					].slice(0, 10),
				}));
			} catch (error) {
				setState((prev) => ({
					...prev,
					isSearching: false,
					error: error instanceof Error ? error.message : 'Search failed',
				}));
			}
		},
		[
			searchEngine,
			minQueryLength,
			performanceTracking,
			processAdvancedFilters,
			applyAdvancedFilters,
		],
	);
	const debouncedSearch = useDebouncedCallback(executeSearch, debounceMs);
	const search = useCallback(
		async (query: string, filters: ExtendedSearchFilters = {}) => {
			setState((prev) => ({
				...prev,
				query,
				filters: {
					...prev.filters,
					...filters,
				},
			}));
			await executeSearch(query, {
				...state.filters,
				...filters,
			});
		},
		[executeSearch, state.filters],
	);
	const setQuery = useCallback(
		(query: string) => {
			setState((prev) => ({
				...prev,
				query,
			}));
			if (autoSearch && searchEngine) {
				debouncedSearch(query, state.filters);
			}
		},
		[autoSearch, debouncedSearch, searchEngine, state.filters],
	);
	const setFilters = useCallback(
		(newFilters: Partial<ExtendedSearchFilters>) => {
			setState((prev) => {
				const updatedFilters = {
					...prev.filters,
					...newFilters,
				};
				return {
					...prev,
					filters: updatedFilters,
				};
			});
			if (state.query && autoSearch && searchEngine) {
				debouncedSearch(state.query, {
					...state.filters,
					...newFilters,
				});
			}
		},
		[state.query, state.filters, autoSearch, debouncedSearch, searchEngine],
	);
	const clearSearch = useCallback(() => {
		setState((prev) => ({
			...prev,
			query: '',
			results: [],
			metadata: null,
			hasSearched: false,
			error: null,
			suggestions: [],
		}));
	}, []);
	const getSuggestions = useCallback(
		(query: string): string[] => {
			if (!searchEngine || query.length < 1) return [];
			const suggestions = searchEngine.getSearchSuggestions(query, maxSuggestions);
			const matchingRecentSearches = state.recentSearches
				.filter(
					(search) =>
						search.toLowerCase().includes(query.toLowerCase()) &&
						search.toLowerCase() !== query.toLowerCase(),
				)
				.slice(0, 2);
			return [...new Set([...suggestions, ...matchingRecentSearches])].slice(
				0,
				maxSuggestions,
			);
		},
		[searchEngine, maxSuggestions, state.recentSearches],
	);
	const selectSuggestion = useCallback(
		(suggestion: string) => {
			setQuery(suggestion);
			if (autoSearch) {
				executeSearch(suggestion, state.filters);
			}
		},
		[setQuery, autoSearch, executeSearch, state.filters],
	);
	const highlightQuery = useCallback((text: string, query: string): string => {
		if (!query.trim()) return text;
		const regex = new RegExp(
			`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
			'gi',
		);
		return text.replace(
			regex,
			'<mark class="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded">$1</mark>',
		);
	}, []);
	const getPerformanceReport = useCallback(() => {
		const meetsTargets = state.performanceStats.averageSearchTime < 100;
		const recommendations: string[] = [];
		if (!meetsTargets) {
			recommendations.push('Consider reducing search index size');
			recommendations.push('Optimize search result limit');
			if (state.performanceStats.averageSearchTime > 200) {
				recommendations.push('Enable search result caching');
				recommendations.push('Consider server-side search for large datasets');
			}
		}
		if (state.results.length > 30) {
			recommendations.push('Consider pagination for large result sets');
		}
		return {
			meetsTargets,
			recommendations,
		};
	}, [state.performanceStats, state.results.length]);
	useEffect(() => {
		if (state.query.length >= 1) {
			const suggestions = getSuggestions(state.query);
			setState((prev) => ({
				...prev,
				suggestions,
			}));
		} else {
			setState((prev) => ({
				...prev,
				suggestions: [],
			}));
		}
	}, [state.query, getSuggestions]);
	return {
		state,
		search,
		clearSearch,
		setQuery,
		setFilters,
		getSuggestions,
		selectSuggestion,
		highlightQuery,
		getPerformanceReport,
		searchEngine,
	};
}
import { createContext, useContext } from 'react';
const FAQSearchContext = createContext<FAQSearchHook | null>(null);
export function FAQSearchProvider({
	children,
	questions,
	categories,
	options,
}: {
	children: React.ReactNode;
	questions: FAQQuestion[];
	categories: FAQCategory[];
	options?: UseFAQSearchOptions;
}) {
	const searchHook = useFAQSearch(questions, categories, options);
	return (
		<FAQSearchContext.Provider value={searchHook}>
			{children}
		</FAQSearchContext.Provider>
	);
}
export function useFAQSearchContext(): FAQSearchHook {
	const context = useContext(FAQSearchContext);
	if (!context) {
		throw new Error(
			'useFAQSearchContext must be used within a FAQSearchProvider',
		);
	}
	return context;
}
