import Fuse from 'fuse.js';
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content';
export interface FAQSearchConfig {
	threshold: number;
	distance: number;
	includeScore: boolean;
	includeMatches: boolean;
	minMatchCharLength: number;
	ignoreLocation: boolean;
	useExtendedSearch: boolean;
	maxResults: number;
	boostRecent: boolean;
	boostFeatured: boolean;
	clientSegmentBoost: string | null;
}
export interface FAQSearchResult {
	item: FAQQuestion;
	score?: number;
	matches?: Fuse.FuseResultMatch[];
	category?: FAQCategory;
	highlighted: {
		question: string;
		answer: string;
		tags: string[];
	};
	relevanceFactors: {
		textMatch: number;
		categoryMatch: number;
		priorityBoost: number;
		recentBoost: number;
		clientSegmentMatch: number;
	};
}
export interface FAQSearchMetadata {
	query: string;
	totalResults: number;
	executionTime: number;
	suggestions: string[];
	didYouMean?: string;
	filters: {
		categories: string[];
		difficulties: string[];
		segments: string[];
	};
	performance: {
		indexSize: number;
		searchTime: number;
		processingTime: number;
	};
}
const SEARCH_KEYS = [
	{
		name: 'question',
		weight: 0.4,
	},
	{
		name: 'answer',
		weight: 0.3,
	},
	{
		name: 'searchKeywords',
		weight: 0.15,
	},
	{
		name: 'tags',
		weight: 0.1,
	},
	{
		name: 'category',
		weight: 0.03,
	},
	{
		name: 'subcategory',
		weight: 0.02,
	},
] as const;
const DEFAULT_SEARCH_CONFIG: FAQSearchConfig = {
	threshold: 0.4,
	distance: 100,
	includeScore: true,
	includeMatches: true,
	minMatchCharLength: 2,
	ignoreLocation: true,
	useExtendedSearch: false,
	maxResults: 50,
	boostRecent: true,
	boostFeatured: true,
	clientSegmentBoost: null,
};
export class FAQSearchEngine {
	private fuse: Fuse<FAQQuestion>;
	private config: FAQSearchConfig;
	private categories: FAQCategory[];
	private questionMap: Map<string, FAQQuestion>;
	private categoryMap: Map<string, FAQCategory>;
	private searchHistory: string[] = [];
	constructor(
		questions: FAQQuestion[],
		categories: FAQCategory[],
		config: Partial<FAQSearchConfig> = {},
	) {
		this.config = {
			...DEFAULT_SEARCH_CONFIG,
			...config,
		};
		this.categories = categories;
		const fuseOptions: Fuse.IFuseOptions<FAQQuestion> = {
			keys: SEARCH_KEYS,
			threshold: this.config.threshold,
			distance: this.config.distance,
			includeScore: this.config.includeScore,
			includeMatches: this.config.includeMatches,
			minMatchCharLength: this.config.minMatchCharLength,
			ignoreLocation: this.config.ignoreLocation,
			useExtendedSearch: this.config.useExtendedSearch,
			ignoreFieldNorm: false,
			fieldNormWeight: 1,
		};
		this.questionMap = new Map(questions.map((q) => [q.id, q]));
		this.categoryMap = new Map(categories.map((c) => [c.id, c]));
		this.fuse = new Fuse(questions, fuseOptions);
	}
	async search(
		query: string,
		filters: {
			category?: string;
			difficulty?: string;
			clientSegment?: string;
			featured?: boolean;
			limit?: number;
		} = {},
	): Promise<{
		results: FAQSearchResult[];
		metadata: FAQSearchMetadata;
	}> {
		const startTime = performance.now();
		const sanitizedQuery = query.trim();
		if (!sanitizedQuery) {
			return {
				results: [],
				metadata: this.createEmptyMetadata(query, performance.now() - startTime),
			};
		}
		const searchResults = this.fuse.search(sanitizedQuery, {
			limit: filters.limit || this.config.maxResults,
		});
		const processedResults = await this.processSearchResults(
			searchResults,
			sanitizedQuery,
			filters,
		);
		const filteredResults = this.applyFilters(processedResults, filters);
		const sortedResults = this.applyScoringBoosts(filteredResults, filters);
		const finalResults = sortedResults.slice(
			0,
			filters.limit || this.config.maxResults,
		);
		const executionTime = performance.now() - startTime;
		this.updateSearchHistory(sanitizedQuery);
		return {
			results: finalResults,
			metadata: this.createSearchMetadata(
				sanitizedQuery,
				finalResults.length,
				executionTime,
				filters,
			),
		};
	}
	private async processSearchResults(
		searchResults: Fuse.FuseResult<FAQQuestion>[],
		query: string,
		filters: any,
	): Promise<FAQSearchResult[]> {
		return searchResults.map((result) => {
			const question = result.item;
			const category = this.categoryMap.get(question.category);
			return {
				item: question,
				score: result.score,
				matches: result.matches,
				category,
				highlighted: this.highlightMatches(question, result.matches || [], query),
				relevanceFactors: this.calculateRelevanceFactors(question, query, filters),
			};
		});
	}
	private highlightMatches(
		question: FAQQuestion,
		matches: Fuse.FuseResultMatch[],
		query: string,
	): FAQSearchResult['highlighted'] {
		const highlighted = {
			question: question.question,
			answer: question.answer,
			tags: [...question.tags],
		};
		matches.forEach((match) => {
			if (!match.indices || !match.value) return;
			const highlightedText = this.applyHighlighting(match.value, match.indices);
			switch (match.key) {
				case 'question':
					highlighted.question = highlightedText;
					break;
				case 'answer':
					highlighted.answer = highlightedText;
					break;
				case 'tags':
					if (
						typeof match.refIndex === 'number' &&
						match.refIndex < highlighted.tags.length
					) {
						highlighted.tags[match.refIndex] = highlightedText;
					}
					break;
			}
		});
		return highlighted;
	}
	private applyHighlighting(
		text: string,
		indices: readonly Fuse.RangeTuple[],
	): string {
		let highlightedText = '';
		let lastIndex = 0;
		const sortedIndices = [...indices].sort(([a], [b]) => a - b);
		sortedIndices.forEach(([start, end]) => {
			highlightedText += text.slice(lastIndex, start);
			highlightedText += `<mark class="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded">${text.slice(start, end + 1)}</mark>`;
			lastIndex = end + 1;
		});
		highlightedText += text.slice(lastIndex);
		return highlightedText;
	}
	private calculateRelevanceFactors(
		question: FAQQuestion,
		query: string,
		filters: any,
	): FAQSearchResult['relevanceFactors'] {
		return {
			textMatch: this.calculateTextMatchScore(question, query),
			categoryMatch: filters.category === question.category ? 1.0 : 0.0,
			priorityBoost: question.priority / 10,
			recentBoost: this.calculateRecencyBoost(question.lastUpdated),
			clientSegmentMatch: this.calculateClientSegmentScore(
				question,
				filters.clientSegment,
			),
		};
	}
	private calculateTextMatchScore(question: FAQQuestion, query: string): number {
		const queryLower = query.toLowerCase();
		const questionLower = question.question.toLowerCase();
		const answerLower = question.answer.toLowerCase();
		const exactQuestionMatch = questionLower.includes(queryLower) ? 0.5 : 0;
		const exactAnswerMatch = answerLower.includes(queryLower) ? 0.3 : 0;
		const keywordMatches = question.searchKeywords.filter(
			(keyword) =>
				keyword.toLowerCase().includes(queryLower) ||
				queryLower.includes(keyword.toLowerCase()),
		).length;
		const keywordScore = Math.min(keywordMatches * 0.1, 0.2);
		return Math.min(exactQuestionMatch + exactAnswerMatch + keywordScore, 1.0);
	}
	private calculateRecencyBoost(lastUpdated: string): number {
		if (!this.config.boostRecent) return 0;
		const now = Date.now();
		const updateTime = new Date(lastUpdated).getTime();
		const daysSinceUpdate = (now - updateTime) / (1000 * 60 * 60 * 24);
		return Math.max(0, Math.min(1, (90 - daysSinceUpdate) / 90)) * 0.1;
	}
	private calculateClientSegmentScore(
		question: FAQQuestion,
		targetSegment?: string,
	): number {
		if (!targetSegment || !question.clientSegment) return 0;
		if (question.clientSegment === targetSegment) return 0.2;
		if (question.clientSegment === 'all') return 0.1;
		return 0;
	}
	private applyFilters(
		results: FAQSearchResult[],
		filters: any,
	): FAQSearchResult[] {
		return results.filter((result) => {
			const question = result.item;
			if (filters.category && question.category !== filters.category) {
				return false;
			}
			if (filters.difficulty && question.difficulty !== filters.difficulty) {
				return false;
			}
			if (
				filters.clientSegment &&
				question.clientSegment !== filters.clientSegment &&
				question.clientSegment !== 'all'
			) {
				return false;
			}
			if (
				filters.featured !== undefined &&
				question.featured !== filters.featured
			) {
				return false;
			}
			return true;
		});
	}
	private applyScoringBoosts(
		results: FAQSearchResult[],
		filters: any,
	): FAQSearchResult[] {
		return results
			.map((result) => {
				const factors = result.relevanceFactors;
				const baseScore = result.score || 0;
				const boostMultiplier =
					1 +
					factors.categoryMatch * 0.2 +
					factors.priorityBoost * 0.1 +
					factors.recentBoost +
					factors.clientSegmentMatch +
					factors.textMatch * 0.15;
				const featuredBoost =
					result.item.featured && this.config.boostFeatured ? 0.9 : 1.0;
				return {
					...result,
					score: baseScore * boostMultiplier * featuredBoost,
				};
			})
			.sort((a, b) => {
				const scoreA = a.score || 1;
				const scoreB = b.score || 1;
				if (scoreA !== scoreB) {
					return scoreA - scoreB;
				}
				return b.item.priority - a.item.priority;
			});
	}
	getSearchSuggestions(query: string, limit = 5): string[] {
		const queryLower = query.toLowerCase();
		const suggestions: Set<string> = new Set();
		this.questionMap.forEach((question) => {
			question.searchKeywords.forEach((keyword) => {
				if (
					keyword.toLowerCase().includes(queryLower) &&
					keyword.toLowerCase() !== queryLower
				) {
					suggestions.add(keyword);
				}
			});
			question.tags.forEach((tag) => {
				if (
					tag.toLowerCase().includes(queryLower) &&
					tag.toLowerCase() !== queryLower
				) {
					suggestions.add(tag);
				}
			});
		});
		this.categories.forEach((category) => {
			if (
				category.name.toLowerCase().includes(queryLower) &&
				category.name.toLowerCase() !== queryLower
			) {
				suggestions.add(category.name);
			}
		});
		return Array.from(suggestions).slice(0, limit);
	}
	private updateSearchHistory(query: string): void {
		this.searchHistory.unshift(query);
		if (this.searchHistory.length > 100) {
			this.searchHistory = this.searchHistory.slice(0, 100);
		}
	}
	private createSearchMetadata(
		query: string,
		resultCount: number,
		executionTime: number,
		filters: any,
	): FAQSearchMetadata {
		return {
			query,
			totalResults: resultCount,
			executionTime: Math.round(executionTime * 100) / 100,
			suggestions: this.getSearchSuggestions(query),
			filters: {
				categories: this.categories.map((c) => c.name),
				difficulties: ['basic', 'intermediate', 'advanced'],
				segments: [
					'oxbridge_prep',
					'11_plus',
					'elite_corporate',
					'comparison_shopper',
				],
			},
			performance: {
				indexSize: this.fuse.getIndex().size(),
				searchTime: executionTime,
				processingTime: 0,
			},
		};
	}
	private createEmptyMetadata(
		query: string,
		executionTime: number,
	): FAQSearchMetadata {
		return {
			query,
			totalResults: 0,
			executionTime: Math.round(executionTime * 100) / 100,
			suggestions: this.getSearchSuggestions(query),
			filters: {
				categories: [],
				difficulties: [],
				segments: [],
			},
			performance: {
				indexSize: 0,
				searchTime: executionTime,
				processingTime: 0,
			},
		};
	}
}
export function createFAQSearchEngine(
	questions: FAQQuestion[],
	categories: FAQCategory[],
	config?: Partial<FAQSearchConfig>,
): FAQSearchEngine {
	return new FAQSearchEngine(questions, categories, config);
}
export const SearchPerformanceUtils = {
	measureSearchTime: async <T>(
		searchFn: () => Promise<T>,
	): Promise<{
		result: T;
		executionTime: number;
	}> => {
		const startTime = performance.now();
		const result = await searchFn();
		const executionTime = performance.now() - startTime;
		return {
			result,
			executionTime,
		};
	},
	validatePerformance: (
		executionTime: number,
	): {
		meetsTarget: boolean;
		performance: 'excellent' | 'good' | 'acceptable' | 'poor';
	} => {
		const meetsTarget = executionTime < 100;
		let performance: 'excellent' | 'good' | 'acceptable' | 'poor';
		if (executionTime < 50) performance = 'excellent';
		else if (executionTime < 100) performance = 'good';
		else if (executionTime < 200) performance = 'acceptable';
		else performance = 'poor';
		return {
			meetsTarget,
			performance,
		};
	},
};
