import type { FAQQuestion, FAQCategory } from '@/lib/types';
export interface TFIDFVector {
	readonly terms: Map<string, number>;
	readonly magnitude: number;
	readonly documentId: string;
}
export interface RecommendationResult {
	readonly question: FAQQuestion;
	readonly score: number;
	readonly reason:
		| 'content_similarity'
		| 'user_behaviour'
		| 'client_segment'
		| 'trending'
		| 'helpful';
	readonly confidence: number;
}
export type ClientSegment =
	| 'oxbridge_prep'
	| '11_plus'
	| 'a_level_gcse'
	| 'elite_corporate'
	| 'comparison_shopper';
export interface UserBehaviour {
	readonly sessionId: string;
	readonly viewedQuestions: string[];
	readonly searchQueries: string[];
	readonly timeSpent: Map<string, number>;
	readonly clickThroughRate: Map<string, number>;
	readonly clientSegment: ClientSegment;
	readonly entryPoint:
		| 'direct'
		| 'search'
		| 'internal_link'
		| 'social'
		| 'email';
}
export interface RecommendationConfig {
	readonly maxRecommendations: number;
	readonly similarityThreshold: number;
	readonly behaviourWeight: number;
	readonly contentWeight: number;
	readonly segmentWeight: number;
	readonly enablePersonalization: boolean;
	readonly enableABTesting: boolean;
	readonly debugMode: boolean;
}
export class TextProcessor {
	private readonly stopWords = new Set([
		'the',
		'a',
		'an',
		'and',
		'or',
		'but',
		'in',
		'on',
		'at',
		'to',
		'for',
		'of',
		'with',
		'by',
		'is',
		'are',
		'was',
		'were',
		'be',
		'been',
		'have',
		'has',
		'had',
		'do',
		'does',
		'did',
		'will',
		'would',
		'could',
		'should',
		'may',
		'might',
		'must',
		'can',
		'this',
		'that',
		'these',
		'those',
		'i',
		'you',
		'he',
		'she',
		'it',
		'we',
		'they',
		'me',
		'him',
		'her',
		'us',
		'them',
		'my',
		'your',
		'his',
		'our',
		'their',
		'what',
		'when',
		'where',
		'why',
		'how',
		'who',
		'which',
		'if',
		'then',
		'else',
		'not',
		'no',
		'yes',
		'up',
		'down',
		'out',
		'off',
		'over',
		'under',
		'again',
		'further',
		'then',
		'once',
	]);
	public tokenize(text: string): string[] {
		return text
			.toLowerCase()
			.replace(/[^\w\s-]/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ')
			.filter((token) => token.length > 2 && !this.stopWords.has(token))
			.map((token) => this.stemWord(token));
	}
	private stemWord(word: string): string {
		const suffixes = [
			'ing',
			'ed',
			'er',
			'est',
			'ly',
			'tion',
			'sion',
			'ness',
			'ment',
			'able',
			'ible',
		];
		for (const suffix of suffixes) {
			if (word.endsWith(suffix) && word.length > suffix.length + 2) {
				return word.slice(0, -suffix.length);
			}
		}
		if (word.endsWith('s') && word.length > 3 && !word.endsWith('ss')) {
			return word.slice(0, -1);
		}
		return word;
	}
	public extractFeatures(question: FAQQuestion): string {
		const features = [
			question.question,
			question.answer,
			...question.tags,
			question.category,
			question.difficulty,
			question.clientSegment,
		].join(' ');
		return features;
	}
}
export class TFIDFCalculator {
	private readonly textProcessor = new TextProcessor();
	private documentFrequency = new Map<string, number>();
	private totalDocuments = 0;
	public buildVocabulary(questions: FAQQuestion[]): void {
		this.totalDocuments = questions.length;
		this.documentFrequency.clear();
		questions.forEach((question) => {
			const text = this.textProcessor.extractFeatures(question);
			const tokens = new Set(this.textProcessor.tokenize(text));
			tokens.forEach((term) => {
				const currentFreq = this.documentFrequency.get(term) || 0;
				this.documentFrequency.set(term, currentFreq + 1);
			});
		});
	}
	public generateTFIDFVector(question: FAQQuestion): TFIDFVector {
		const text = this.textProcessor.extractFeatures(question);
		const tokens = this.textProcessor.tokenize(text);
		const termFrequency = new Map<string, number>();
		tokens.forEach((term) => {
			const currentFreq = termFrequency.get(term) || 0;
			termFrequency.set(term, currentFreq + 1);
		});
		const tfidfVector = new Map<string, number>();
		let magnitudeSum = 0;
		termFrequency.forEach((tf, term) => {
			const df = this.documentFrequency.get(term) || 0;
			if (df > 0) {
				const idf = Math.log(this.totalDocuments / df);
				const tfidf = tf * idf;
				tfidfVector.set(term, tfidf);
				magnitudeSum += tfidf * tfidf;
			}
		});
		const magnitude = Math.sqrt(magnitudeSum);
		return {
			terms: tfidfVector,
			magnitude,
			documentId: question.id,
		};
	}
	public calculateCosineSimilarity(
		vector1: TFIDFVector,
		vector2: TFIDFVector,
	): number {
		if (vector1.magnitude === 0 || vector2.magnitude === 0) {
			return 0;
		}
		let dotProduct = 0;
		vector1.terms.forEach((score1, term) => {
			const score2 = vector2.terms.get(term) || 0;
			dotProduct += score1 * score2;
		});
		return dotProduct / (vector1.magnitude * vector2.magnitude);
	}
}
export class BehaviourTracker {
	private behaviourData = new Map<string, UserBehaviour>();
	public initializeSession(
		sessionId: string,
		clientSegment: ClientSegment,
		entryPoint: 'direct' | 'search' | 'internal_link' | 'social' | 'email',
	): void {
		this.behaviourData.set(sessionId, {
			sessionId,
			viewedQuestions: [],
			searchQueries: [],
			timeSpent: new Map(),
			clickThroughRate: new Map(),
			clientSegment,
			entryPoint,
		});
	}
	public trackQuestionView(
		sessionId: string,
		questionId: string,
		timeSpent: number,
	): void {
		const behaviour = this.behaviourData.get(sessionId);
		if (behaviour) {
			const updatedBehaviour = {
				...behaviour,
				viewedQuestions: [...behaviour.viewedQuestions, questionId],
				timeSpent: new Map(behaviour.timeSpent).set(questionId, timeSpent),
			};
			this.behaviourData.set(sessionId, updatedBehaviour);
		}
	}
	public trackSearchQuery(sessionId: string, query: string): void {
		const behaviour = this.behaviourData.get(sessionId);
		if (behaviour) {
			const updatedBehaviour = {
				...behaviour,
				searchQueries: [...behaviour.searchQueries, query.toLowerCase()],
			};
			this.behaviourData.set(sessionId, updatedBehaviour);
		}
	}
	public trackRecommendationClick(sessionId: string, questionId: string): void {
		const behaviour = this.behaviourData.get(sessionId);
		if (behaviour) {
			const currentCTR = behaviour.clickThroughRate.get(questionId) || 0;
			const updatedBehaviour = {
				...behaviour,
				clickThroughRate: new Map(behaviour.clickThroughRate).set(
					questionId,
					currentCTR + 1,
				),
			};
			this.behaviourData.set(sessionId, updatedBehaviour);
		}
	}
	public getBehaviour(sessionId: string): UserBehaviour | undefined {
		return this.behaviourData.get(sessionId);
	}
}
export class FAQRecommendationEngine {
	private readonly tfidfCalculator = new TFIDFCalculator();
	private readonly behaviourTracker = new BehaviourTracker();
	private readonly tfidfVectors = new Map<string, TFIDFVector>();
	private questions: FAQQuestion[] = [];
	private categories: FAQCategory[] = [];
	private readonly defaultConfig: RecommendationConfig = {
		maxRecommendations: 5,
		similarityThreshold: 0.1,
		behaviourWeight: 0.4,
		contentWeight: 0.6,
		segmentWeight: 0.3,
		enablePersonalization: true,
		enableABTesting: false,
		debugMode: false,
	};
	public initialize(
		categories: FAQCategory[],
		config: Partial<RecommendationConfig> = {},
	): void {
		this.categories = categories;
		this.questions = categories.flatMap((category) => category.questions);
		const mergedConfig = {
			...this.defaultConfig,
			...config,
		};
		this.tfidfCalculator.buildVocabulary(this.questions);
		this.questions.forEach((question) => {
			const vector = this.tfidfCalculator.generateTFIDFVector(question);
			this.tfidfVectors.set(question.id, vector);
		});
		if (mergedConfig.debugMode) {
			console.log(
				`FAQ Recommendation Engine initialized with ${this.questions.length} questions`,
			);
			console.log(`TF-IDF vectors generated: ${this.tfidfVectors.size}`);
		}
	}
	public initializeUserSession(
		sessionId: string,
		clientSegment: ClientSegment,
		entryPoint: 'direct' | 'search' | 'internal_link' | 'social' | 'email',
	): void {
		this.behaviourTracker.initializeSession(sessionId, clientSegment, entryPoint);
	}
	private getContentBasedRecommendations(
		targetQuestion: FAQQuestion,
		excludeIds: string[] = [],
		maxRecommendations: number = 5,
	): RecommendationResult[] {
		const targetVector = this.tfidfVectors.get(targetQuestion.id);
		if (!targetVector) return [];
		const similarities: Array<{
			question: FAQQuestion;
			score: number;
		}> = [];
		this.questions.forEach((question) => {
			if (question.id === targetQuestion.id || excludeIds.includes(question.id))
				return;
			const questionVector = this.tfidfVectors.get(question.id);
			if (!questionVector) return;
			const similarity = this.tfidfCalculator.calculateCosineSimilarity(
				targetVector,
				questionVector,
			);
			if (similarity > 0.1) {
				similarities.push({
					question,
					score: similarity,
				});
			}
		});
		return similarities
			.sort((a, b) => b.score - a.score)
			.slice(0, maxRecommendations)
			.map(({ question, score }) => ({
				question,
				score,
				reason: 'content_similarity',
				confidence: Math.min(score * 2, 1),
			}));
	}
	private getBehaviourBasedRecommendations(
		sessionId: string,
		excludeIds: string[] = [],
		maxRecommendations: number = 3,
	): RecommendationResult[] {
		const behaviour = this.behaviourTracker.getBehaviour(sessionId);
		if (!behaviour || behaviour.viewedQuestions.length === 0) return [];
		const viewedQuestions = behaviour.viewedQuestions
			.map((id) => this.questions.find((q) => q.id === id))
			.filter((q): q is FAQQuestion => q !== undefined);
		const relatedQuestionIds = new Set<string>();
		viewedQuestions.forEach((question) => {
			question.relatedFAQs.forEach((relatedId) => {
				if (
					!excludeIds.includes(relatedId) &&
					!behaviour.viewedQuestions.includes(relatedId)
				) {
					relatedQuestionIds.add(relatedId);
				}
			});
		});
		const recommendations: RecommendationResult[] = [];
		relatedQuestionIds.forEach((questionId) => {
			const question = this.questions.find((q) => q.id === questionId);
			if (question && recommendations.length < maxRecommendations) {
				const viewCount = behaviour.viewedQuestions.filter((id) =>
					this.questions.find((q) => q.id === id)?.relatedFAQs.includes(questionId),
				).length;
				recommendations.push({
					question,
					score: Math.min(viewCount * 0.3, 1),
					reason: 'user_behaviour',
					confidence: 0.7,
				});
			}
		});
		return recommendations.sort((a, b) => b.score - a.score);
	}
	private getClientSegmentRecommendations(
		clientSegment: ClientSegment,
		excludeIds: string[] = [],
		maxRecommendations: number = 3,
	): RecommendationResult[] {
		const segmentQuestions = this.questions.filter(
			(question) =>
				(question.clientSegment === clientSegment ||
					question.clientSegment === 'all') &&
				!excludeIds.includes(question.id),
		);
		const recommendations = segmentQuestions
			.sort((a, b) => {
				const aSegmentMatch = a.clientSegment === clientSegment ? 1 : 0;
				const bSegmentMatch = b.clientSegment === clientSegment ? 1 : 0;
				if (aSegmentMatch !== bSegmentMatch) {
					return bSegmentMatch - aSegmentMatch;
				}
				const aHelpfulnessRatio =
					a.analytics.helpful / (a.analytics.helpful + a.analytics.notHelpful || 1);
				const bHelpfulnessRatio =
					b.analytics.helpful / (b.analytics.helpful + b.analytics.notHelpful || 1);
				if (Math.abs(aHelpfulnessRatio - bHelpfulnessRatio) > 0.1) {
					return bHelpfulnessRatio - aHelpfulnessRatio;
				}
				return b.analytics.views - a.analytics.views;
			})
			.slice(0, maxRecommendations)
			.map((question) => ({
				question,
				score: question.clientSegment === clientSegment ? 0.8 : 0.5,
				reason: 'client_segment' as const,
				confidence: 0.6,
			}));
		return recommendations;
	}
	private getTrendingRecommendations(
		excludeIds: string[] = [],
		maxRecommendations: number = 3,
	): RecommendationResult[] {
		const trendingQuestions = this.questions
			.filter(
				(question) =>
					question.analytics.trending && !excludeIds.includes(question.id),
			)
			.sort((a, b) => b.analytics.views - a.analytics.views)
			.slice(0, maxRecommendations);
		return trendingQuestions.map((question) => ({
			question,
			score: Math.min(question.analytics.views / 1000, 1),
			reason: 'trending',
			confidence: 0.5,
		}));
	}
	private getMostHelpfulRecommendations(
		excludeIds: string[] = [],
		maxRecommendations: number = 3,
	): RecommendationResult[] {
		const helpfulQuestions = this.questions
			.filter(
				(question) =>
					question.analytics.helpful > 0 && !excludeIds.includes(question.id),
			)
			.sort((a, b) => {
				const aRatio =
					a.analytics.helpful / (a.analytics.helpful + a.analytics.notHelpful);
				const bRatio =
					b.analytics.helpful / (b.analytics.helpful + b.analytics.notHelpful);
				return bRatio - aRatio;
			})
			.slice(0, maxRecommendations);
		return helpfulQuestions.map((question) => {
			const helpfulnessRatio =
				question.analytics.helpful /
				(question.analytics.helpful + question.analytics.notHelpful);
			return {
				question,
				score: helpfulnessRatio,
				reason: 'helpful',
				confidence: 0.8,
			};
		});
	}
	public generateRecommendations(
		targetQuestion: FAQQuestion,
		sessionId: string,
		config: Partial<RecommendationConfig> = {},
	): RecommendationResult[] {
		const mergedConfig = {
			...this.defaultConfig,
			...config,
		};
		const behaviour = this.behaviourTracker.getBehaviour(sessionId);
		const excludeIds = [targetQuestion.id];
		if (behaviour) {
			excludeIds.push(...behaviour.viewedQuestions);
		}
		const contentRecommendations = this.getContentBasedRecommendations(
			targetQuestion,
			excludeIds,
			Math.ceil(mergedConfig.maxRecommendations * 0.5),
		);
		const behaviourRecommendations =
			behaviour && mergedConfig.enablePersonalization ?
				this.getBehaviourBasedRecommendations(
					sessionId,
					excludeIds,
					Math.ceil(mergedConfig.maxRecommendations * 0.3),
				)
			:	[];
		const segmentRecommendations =
			behaviour ?
				this.getClientSegmentRecommendations(
					behaviour.clientSegment,
					excludeIds,
					Math.ceil(mergedConfig.maxRecommendations * 0.2),
				)
			:	[];
		const allRecommendations: RecommendationResult[] = [
			...contentRecommendations.map((rec) => ({
				...rec,
				score: rec.score * mergedConfig.contentWeight,
			})),
			...behaviourRecommendations.map((rec) => ({
				...rec,
				score: rec.score * mergedConfig.behaviourWeight,
			})),
			...segmentRecommendations.map((rec) => ({
				...rec,
				score: rec.score * mergedConfig.segmentWeight,
			})),
		];
		const uniqueRecommendations = new Map<string, RecommendationResult>();
		allRecommendations.forEach((recommendation) => {
			const existing = uniqueRecommendations.get(recommendation.question.id);
			if (!existing || recommendation.score > existing.score) {
				uniqueRecommendations.set(recommendation.question.id, recommendation);
			}
		});
		const finalRecommendations = Array.from(uniqueRecommendations.values())
			.filter((rec) => rec.score >= mergedConfig.similarityThreshold)
			.sort((a, b) => b.score - a.score)
			.slice(0, mergedConfig.maxRecommendations);
		if (finalRecommendations.length < mergedConfig.maxRecommendations) {
			const remainingSlots =
				mergedConfig.maxRecommendations - finalRecommendations.length;
			const existingIds = finalRecommendations.map((rec) => rec.question.id);
			const fillRecommendations = [...excludeIds, ...existingIds];
			const trendingRecs = this.getTrendingRecommendations(
				fillRecommendations,
				Math.ceil(remainingSlots / 2),
			);
			const helpfulRecs = this.getMostHelpfulRecommendations(
				[...fillRecommendations, ...trendingRecs.map((r) => r.question.id)],
				remainingSlots - trendingRecs.length,
			);
			finalRecommendations.push(...trendingRecs, ...helpfulRecs);
		}
		if (mergedConfig.debugMode) {
			console.log(
				`Generated ${finalRecommendations.length} recommendations for question ${targetQuestion.id}`,
			);
			finalRecommendations.forEach((rec) => {
				console.log(
					`- ${rec.question.question} (${rec.reason}, score: ${rec.score.toFixed(3)})`,
				);
			});
		}
		return finalRecommendations.slice(0, mergedConfig.maxRecommendations);
	}
	public getRelatedQuestions(
		questionId: string,
		maxResults: number = 4,
	): RecommendationResult[] {
		const targetQuestion = this.questions.find((q) => q.id === questionId);
		if (!targetQuestion) return [];
		return this.getContentBasedRecommendations(
			targetQuestion,
			[questionId],
			maxResults,
		);
	}
	public getPopularInCategory(
		categoryId: string,
		excludeIds: string[] = [],
		maxResults: number = 5,
	): RecommendationResult[] {
		const categoryQuestions = this.questions
			.filter(
				(question) =>
					question.category === categoryId && !excludeIds.includes(question.id),
			)
			.sort((a, b) => b.analytics.views - a.analytics.views)
			.slice(0, maxResults);
		return categoryQuestions.map((question, index) => ({
			question,
			score: Math.max(0.9 - index * 0.1, 0.1),
			reason: 'trending',
			confidence: 0.6,
		}));
	}
	public trackQuestionView(
		sessionId: string,
		questionId: string,
		timeSpent: number,
	): void {
		this.behaviourTracker.trackQuestionView(sessionId, questionId, timeSpent);
	}
	public trackSearchQuery(sessionId: string, query: string): void {
		this.behaviourTracker.trackSearchQuery(sessionId, query);
	}
	public trackRecommendationClick(sessionId: string, questionId: string): void {
		this.behaviourTracker.trackRecommendationClick(sessionId, questionId);
	}
}
