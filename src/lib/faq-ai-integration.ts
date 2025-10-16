import { z } from 'zod';
import type { FAQContent, FAQCategory, FAQQuestion } from '../lib/cms/cms-faq';
import { getFAQContent } from '../lib/cms/cms-faq';
const embeddingSchema = z.object({
	id: z.string().describe('Unique identifier for the embedding'),
	questionId: z.string().describe('Reference to original FAQ question'),
	content: z.string().describe('Text content that was vectorized'),
	contentType: z
		.enum(['question', 'answer', 'combined'])
		.describe('Type of content vectorized'),
	embedding: z
		.array(z.number())
		.min(1536)
		.max(1536)
		.describe('1536-dimensional embedding vector'),
	metadata: z
		.object({
			category: z.string().describe('FAQ category'),
			subcategory: z.string().optional().describe('FAQ subcategory'),
			priority: z.number().describe('Content priority score'),
			clientSegment: z.enum([
				'oxbridge_prep',
				'11_plus',
				'elite_corporate',
				'comparison_shopper',
				'all',
			]),
			tags: z.array(z.string()).describe('Content tags for filtering'),
			difficulty: z
				.enum(['basic', 'intermediate', 'advanced'])
				.describe('Content difficulty level'),
			lastUpdated: z.string().datetime().describe('Last update timestamp'),
		})
		.describe('Metadata for search filtering and context'),
	createdAt: z.string().datetime().describe('Creation timestamp'),
	updatedAt: z.string().datetime().describe('Last update timestamp'),
});
const intentSchema = z.object({
	id: z.string().describe('Unique intent identifier'),
	name: z.string().describe('Human-readable intent name'),
	description: z.string().describe('Intent description'),
	category: z.enum([
		'service',
		'tutors',
		'subjects',
		'results',
		'scheduling',
		'pricing',
		'other',
	]),
	keywords: z.array(z.string()).describe('Keywords that trigger this intent'),
	patterns: z.array(z.string()).describe('Regex patterns for intent matching'),
	confidence: z
		.number()
		.min(0)
		.max(1)
		.describe('Intent matching confidence threshold'),
	responses: z.array(z.string()).describe('Template responses for this intent'),
	followUpQuestions: z
		.array(z.string())
		.describe('Suggested follow-up questions'),
	requiredContext: z
		.array(z.string())
		.optional()
		.describe('Required context for response'),
	businessPriority: z
		.enum(['high', 'medium', 'low'])
		.describe('Business importance level'),
});
const trainingDataSchema = z.object({
	id: z.string().describe('Unique training example identifier'),
	input: z.string().describe('User input text'),
	intent: z.string().describe('Classified intent'),
	output: z.string().describe('Expected AI response'),
	context: z.array(z.string()).describe('Relevant FAQ content for context'),
	metadata: z.object({
		quality: z.enum(['high', 'medium', 'low']).describe('Training data quality'),
		source: z
			.enum(['faq', 'synthetic', 'real_conversation'])
			.describe('Data source'),
		difficulty: z
			.enum(['basic', 'intermediate', 'advanced'])
			.describe('Query difficulty'),
		clientSegment: z.enum([
			'oxbridge_prep',
			'11_plus',
			'elite_corporate',
			'comparison_shopper',
			'all',
		]),
		validated: z.boolean().describe('Human validation status'),
		validatedBy: z.string().optional().describe('Validator identifier'),
		validatedAt: z
			.string()
			.datetime()
			.optional()
			.describe('Validation timestamp'),
	}),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});
const aiResponseConfigSchema = z.object({
	model: z
		.enum(['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'])
		.describe('AI model to use'),
	temperature: z
		.number()
		.min(0)
		.max(2)
		.default(0.7)
		.describe('Response creativity level'),
	maxTokens: z
		.number()
		.min(50)
		.max(2000)
		.default(500)
		.describe('Maximum response length'),
	topK: z
		.number()
		.min(1)
		.max(20)
		.default(5)
		.describe('Number of relevant FAQs to consider'),
	confidenceThreshold: z
		.number()
		.min(0)
		.max(1)
		.default(0.7)
		.describe('Minimum confidence for AI response'),
	fallbackToHuman: z
		.boolean()
		.default(true)
		.describe('Fallback to human support on low confidence'),
	includeContext: z
		.boolean()
		.default(true)
		.describe('Include FAQ context in response'),
	responseFormat: z
		.enum(['conversational', 'structured', 'bullet_points'])
		.default('conversational'),
	brandVoice: z
		.object({
			tone: z
				.enum(['professional', 'friendly', 'authoritative'])
				.default('professional'),
			style: z.enum(['formal', 'casual', 'academic']).default('formal'),
			language: z
				.enum(['british_english', 'american_english'])
				.default('british_english'),
		})
		.describe('Brand voice configuration'),
});
export type FAQEmbedding = z.infer<typeof embeddingSchema>;
export type IntentClassification = z.infer<typeof intentSchema>;
export type ChatTrainingData = z.infer<typeof trainingDataSchema>;
export type AIResponseConfig = z.infer<typeof aiResponseConfigSchema>;
export class FAQAIIntegrationEngine {
	private embeddings: FAQEmbedding[] = [];
	private intents: IntentClassification[] = [];
	private trainingData: ChatTrainingData[] = [];
	private config: AIResponseConfig;
	constructor(config?: Partial<AIResponseConfig>) {
		this.config = aiResponseConfigSchema.parse(config || {});
		this.initializeSystem();
	}
	private async initializeSystem(): Promise<void> {
		try {
			console.log('🤖 Initializing FAQ AI Integration System...');
			await this.loadStoredData();
			if (this.intents.length === 0) {
				await this.initializeIntentClassification();
			}
			console.log('✅ FAQ AI Integration System initialized');
			console.log(`📊 Embeddings: ${this.embeddings.length}`);
			console.log(`🎯 Intents: ${this.intents.length}`);
			console.log(`💬 Training Data: ${this.trainingData.length}`);
		} catch (error) {
			console.error('❌ Failed to initialize FAQ AI Integration System:', error);
			throw error;
		}
	}
	public async generateFAQEmbeddings(): Promise<void> {
		console.log('🔄 Generating FAQ embeddings for AI integration...');
		const faqContent = getFAQContent();
		const newEmbeddings: FAQEmbedding[] = [];
		for (const category of faqContent.categories) {
			for (const question of category.questions) {
				try {
					const contentVariations = [
						{
							content: question.question,
							type: 'question' as const,
							id: `${question.id}_question`,
						},
						{
							content: question.answer,
							type: 'answer' as const,
							id: `${question.id}_answer`,
						},
						{
							content: `${question.question} ${question.answer}`,
							type: 'combined' as const,
							id: `${question.id}_combined`,
						},
					];
					for (const variation of contentVariations) {
						const mockEmbedding = this.generateMockEmbedding(variation.content);
						const embedding: FAQEmbedding = {
							id: variation.id,
							questionId: question.id,
							content: variation.content,
							contentType: variation.type,
							embedding: mockEmbedding,
							metadata: {
								category: question.category,
								subcategory: question.subcategory || '',
								priority: question.priority,
								clientSegment: question.clientSegment,
								tags: [...question.tags],
								difficulty: question.difficulty,
								lastUpdated: question.lastUpdated,
							},
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
						};
						newEmbeddings.push(embedding);
					}
					await new Promise((resolve) => setTimeout(resolve, 10));
				} catch (error) {
					console.error(
						`❌ Failed to generate embedding for question ${question.id}:`,
						error,
					);
				}
			}
		}
		this.embeddings = newEmbeddings;
		await this.persistEmbeddings();
		console.log(`✅ Generated ${newEmbeddings.length} FAQ embeddings`);
	}
	private async initializeIntentClassification(): Promise<void> {
		console.log('🎯 Initializing intent classification system...');
		const faqContent = getFAQContent();
		const intents: IntentClassification[] = [];
		for (const category of faqContent.categories) {
			const intent: IntentClassification = {
				id: `intent_${category.id}`,
				name: category.title,
				description: category.description,
				category: category.id as any,
				keywords: this.extractKeywordsFromCategory(category),
				patterns: this.generatePatternsFromCategory(category),
				confidence: 0.8,
				responses: this.generateTemplateResponses(category),
				followUpQuestions: this.generateFollowUpQuestions(category),
				requiredContext: this.getRequiredContext(category),
				businessPriority: this.getBusinessPriority(category),
			};
			intents.push(intent);
		}
		intents.push(
			{
				id: 'intent_greeting',
				name: 'Greeting',
				description: 'User greeting or conversation start',
				category: 'other',
				keywords: ['hello', 'hi', 'good morning', 'good afternoon', 'hey'],
				patterns: ['^(hi|hello|hey|good (morning|afternoon|evening))'],
				confidence: 0.9,
				responses: [
					"Hello! I'm here to help answer your questions about My Private Tutor Online. How can I assist you today?",
					'Hi there! Welcome to My Private Tutor Online. What would you like to know about our tutoring services?',
				],
				followUpQuestions: [
					'Would you like to learn about our tutoring services?',
					'Are you interested in finding out about our tutor tiers?',
					'Would you like to know about our pricing?',
				],
				businessPriority: 'high',
			},
			{
				id: 'intent_goodbye',
				name: 'Goodbye',
				description: 'User ending conversation',
				category: 'other',
				keywords: ['goodbye', 'bye', 'thanks', 'thank you', "that's all"],
				patterns: ["^(bye|goodbye|thanks?|thank you|that's all)"],
				confidence: 0.9,
				responses: [
					"Thank you for your interest in My Private Tutor Online. If you have any other questions, please don't hesitate to contact us at info@myprivatetutoronline.com",
					"Goodbye! We're here whenever you need help with tutoring. Have a wonderful day!",
				],
				followUpQuestions: [
					'Would you like to schedule a consultation?',
					'Can we help you with anything else?',
				],
				businessPriority: 'medium',
			},
		);
		this.intents = intents;
		await this.persistIntents();
		console.log(`✅ Initialized ${intents.length} intent classifications`);
	}
	public async generateTrainingData(): Promise<void> {
		console.log('💬 Generating AI training data from FAQ content...');
		const faqContent = getFAQContent();
		const trainingExamples: ChatTrainingData[] = [];
		for (const category of faqContent.categories) {
			for (const question of category.questions) {
				try {
					const variations = this.generateTrainingVariations(question, category);
					for (const variation of variations) {
						const trainingExample: ChatTrainingData = {
							id: `training_${question.id}_${variation.type}`,
							input: variation.input,
							intent: `intent_${category.id}`,
							output: variation.output,
							context: this.getRelevantContext(question, category),
							metadata: {
								quality: variation.quality,
								source: 'faq',
								difficulty: question.difficulty,
								clientSegment: question.clientSegment,
								validated: false,
								validatedBy: undefined,
								validatedAt: undefined,
							},
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
						};
						trainingExamples.push(trainingExample);
					}
				} catch (error) {
					console.error(
						`❌ Failed to generate training data for question ${question.id}:`,
						error,
					);
				}
			}
		}
		this.trainingData = trainingExamples;
		await this.persistTrainingData();
		console.log(`✅ Generated ${trainingExamples.length} training examples`);
	}
	public async searchSimilarFAQs(
		query: string,
		options?: {
			topK?: number;
			category?: string;
			clientSegment?: string;
			minConfidence?: number;
		},
	): Promise<
		Array<{
			question: FAQQuestion;
			similarity: number;
			confidence: number;
		}>
	> {
		console.log(`🔍 Searching for FAQs similar to: "${query}"`);
		const {
			topK = 5,
			category,
			clientSegment,
			minConfidence = 0.5,
		} = options || {};
		try {
			const queryEmbedding = this.generateMockEmbedding(query);
			const results = await this.performMockSemanticSearch(queryEmbedding, {
				topK,
				category,
				clientSegment,
				minConfidence,
			});
			console.log(`✅ Found ${results.length} similar FAQs`);
			return results;
		} catch (error) {
			console.error('❌ Failed to search similar FAQs:', error);
			return [];
		}
	}
	public async classifyIntent(query: string): Promise<{
		intent: IntentClassification;
		confidence: number;
		explanation: string;
	} | null> {
		console.log(`🎯 Classifying intent for: "${query}"`);
		try {
			const queryLower = query.toLowerCase();
			let bestMatch: IntentClassification | null = null;
			let highestScore = 0;
			for (const intent of this.intents) {
				let score = 0;
				const keywordMatches = intent.keywords.filter((keyword) =>
					queryLower.includes(keyword.toLowerCase()),
				).length;
				score += keywordMatches * 0.3;
				for (const pattern of intent.patterns) {
					try {
						const regex = new RegExp(pattern, 'i');
						if (regex.test(query)) {
							score += 0.5;
							break;
						}
					} catch (error) {
						console.warn(`Invalid regex pattern: ${pattern}`);
					}
				}
				if (intent.businessPriority === 'high') score *= 1.2;
				else if (intent.businessPriority === 'medium') score *= 1.1;
				if (score > highestScore && score >= intent.confidence) {
					highestScore = score;
					bestMatch = intent;
				}
			}
			if (bestMatch && highestScore >= this.config.confidenceThreshold) {
				const result = {
					intent: bestMatch,
					confidence: Math.min(highestScore, 1.0),
					explanation: `Matched intent "${bestMatch.name}" with ${Math.round(highestScore * 100)}% confidence`,
				};
				console.log(
					`✅ Classified intent: ${bestMatch.name} (${Math.round(highestScore * 100)}%)`,
				);
				return result;
			}
			console.log('❓ No intent classification found with sufficient confidence');
			return null;
		} catch (error) {
			console.error('❌ Failed to classify intent:', error);
			return null;
		}
	}
	public async generateAIResponse(
		query: string,
		context?: {
			intent?: IntentClassification;
			similarFAQs?: Array<{
				question: FAQQuestion;
				similarity: number;
			}>;
			conversationHistory?: Array<{
				role: 'user' | 'assistant';
				content: string;
			}>;
		},
	): Promise<{
		response: string;
		confidence: number;
		usedFAQs: string[];
		fallbackToHuman: boolean;
		metadata: {
			model: string;
			tokensUsed: number;
			responseTime: number;
			intentUsed?: string;
			contextSources: string[];
		};
	}> {
		console.log(`🤖 Generating AI response for: "${query}"`);
		const startTime = Date.now();
		try {
			const intent = context?.intent || (await this.classifyIntent(query));
			const similarFAQs =
				context?.similarFAQs ||
				(await this.searchSimilarFAQs(query, {
					topK: this.config.topK,
				}));
			const hasGoodIntent =
				intent && intent.confidence >= this.config.confidenceThreshold;
			const hasRelevantFAQs =
				similarFAQs.length > 0 &&
				similarFAQs[0].similarity >= this.config.confidenceThreshold;
			if (!hasGoodIntent && !hasRelevantFAQs && this.config.fallbackToHuman) {
				return this.generateHumanFallbackResponse(query);
			}
			const contextSources: string[] = [];
			let contextText = '';
			if (intent && hasGoodIntent) {
				contextText += `Intent: ${intent.name}\n`;
				contextText += `Description: ${intent.description}\n\n`;
				contextSources.push(`intent:${intent.id}`);
			}
			if (similarFAQs.length > 0) {
				contextText += 'Relevant FAQ Information:\n';
				similarFAQs.forEach((faq, index) => {
					contextText += `${index + 1}. Q: ${faq.question.question}\n`;
					contextText += `   A: ${faq.question.answer}\n\n`;
					contextSources.push(`faq:${faq.question.id}`);
				});
			}
			const mockResponse = this.generateMockAIResponse(query, contextText, intent);
			const endTime = Date.now();
			const responseTime = endTime - startTime;
			const result = {
				response: mockResponse.text,
				confidence: mockResponse.confidence,
				usedFAQs: similarFAQs.map((faq) => faq.question.id),
				fallbackToHuman: false,
				metadata: {
					model: this.config.model,
					tokensUsed: mockResponse.tokensUsed,
					responseTime,
					intentUsed: intent?.id,
					contextSources,
				},
			};
			console.log(
				`✅ Generated AI response (${responseTime}ms, ${result.confidence * 100}% confidence)`,
			);
			return result;
		} catch (error) {
			console.error('❌ Failed to generate AI response:', error);
			return this.generateHumanFallbackResponse(query);
		}
	}
	public exportAITrainingData(): {
		embeddings: FAQEmbedding[];
		intents: IntentClassification[];
		trainingData: ChatTrainingData[];
		config: AIResponseConfig;
		metadata: {
			exportDate: string;
			version: string;
			totalQuestions: number;
			totalEmbeddings: number;
			totalIntents: number;
			totalTrainingExamples: number;
		};
	} {
		console.log('📤 Exporting AI training data...');
		const faqContent = getFAQContent();
		const totalQuestions = faqContent.categories.reduce(
			(sum, category) => sum + category.questions.length,
			0,
		);
		const exportData = {
			embeddings: this.embeddings,
			intents: this.intents,
			trainingData: this.trainingData,
			config: this.config,
			metadata: {
				exportDate: new Date().toISOString(),
				version: '1.0.0',
				totalQuestions,
				totalEmbeddings: this.embeddings.length,
				totalIntents: this.intents.length,
				totalTrainingExamples: this.trainingData.length,
			},
		};
		console.log(`✅ Exported AI training data:`, exportData.metadata);
		return exportData;
	}
	private generateMockEmbedding(text: string): number[] {
		const seed = this.hashString(text);
		const embedding: number[] = [];
		for (let i = 0; i < 1536; i++) {
			const value =
				(Math.sin(seed + i * 0.1) + Math.cos(seed * 0.7 + i * 0.3)) / 2;
			embedding.push(value);
		}
		const magnitude = Math.sqrt(
			embedding.reduce((sum, val) => sum + val * val, 0),
		);
		return embedding.map((val) => val / magnitude);
	}
	private hashString(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash;
		}
		return hash;
	}
	private extractKeywordsFromCategory(category: FAQCategory): string[] {
		const keywords = new Set<string>();
		keywords.add(category.title.toLowerCase());
		keywords.add(category.name.toLowerCase());
		category.questions.forEach((question) => {
			question.tags.forEach((tag) => keywords.add(tag));
			question.searchKeywords.forEach((keyword) => keywords.add(keyword));
		});
		return Array.from(keywords);
	}
	private generatePatternsFromCategory(category: FAQCategory): string[] {
		const patterns: string[] = [];
		patterns.push(`\\b${category.title.toLowerCase()}\\b`);
		patterns.push(`\\b${category.name.toLowerCase()}\\b`);
		category.questions.forEach((question) => {
			const firstWords = question.question
				.toLowerCase()
				.split(' ')
				.slice(0, 3)
				.join(' ');
			patterns.push(`\\b${firstWords.replace(/[^\w\s]/g, '')}\\b`);
		});
		return patterns;
	}
	private generateTemplateResponses(category: FAQCategory): string[] {
		return [
			`I can help you with ${category.title.toLowerCase()}. Here's what you need to know:`,
			`Great question about ${category.title.toLowerCase()}! Let me provide some information:`,
			`For ${category.title.toLowerCase()}, here are the key details:`,
		];
	}
	private generateFollowUpQuestions(category: FAQCategory): string[] {
		const questions: string[] = [];
		category.subcategories?.forEach((sub) => {
			questions.push(
				`Would you like to know more about ${sub.name.toLowerCase()}?`,
			);
		});
		questions.push(
			'Would you like more specific information?',
			'Can I help you with anything else about this topic?',
			'Would you like to speak with one of our education consultants?',
		);
		return questions.slice(0, 5);
	}
	private getRequiredContext(category: FAQCategory): string[] {
		const context: string[] = [];
		const relatedCategories = ['service', 'pricing', 'scheduling'];
		if (!relatedCategories.includes(category.id)) {
			context.push('service_overview');
		}
		if (category.id !== 'pricing') {
			context.push('pricing_context');
		}
		return context;
	}
	private getBusinessPriority(category: FAQCategory): 'high' | 'medium' | 'low' {
		const highPriorityCategories = ['service', 'pricing', 'scheduling'];
		const mediumPriorityCategories = ['tutors', 'results'];
		if (highPriorityCategories.includes(category.id)) return 'high';
		if (mediumPriorityCategories.includes(category.id)) return 'medium';
		return 'low';
	}
	private generateTrainingVariations(
		question: FAQQuestion,
		category: FAQCategory,
	): Array<{
		type: string;
		input: string;
		output: string;
		quality: 'high' | 'medium' | 'low';
	}> {
		const variations = [];
		variations.push({
			type: 'direct',
			input: question.question,
			output: question.answer,
			quality: 'high' as const,
		});
		const casualInputs = [
			question.question.replace('?', '').toLowerCase(),
			`Can you tell me ${question.question.toLowerCase()}`,
			`I want to know ${question.question.toLowerCase()}`,
		];
		casualInputs.forEach((input, index) => {
			variations.push({
				type: `casual_${index}`,
				input,
				output: `${question.answer}\n\nIs there anything else you'd like to know about ${category.name.toLowerCase()}?`,
				quality: 'medium' as const,
			});
		});
		return variations;
	}
	private getRelevantContext(
		question: FAQQuestion,
		category: FAQCategory,
	): string[] {
		const context: string[] = [];
		context.push(`Category: ${category.title}`);
		context.push(`Question: ${question.question}`);
		context.push(`Answer: ${question.answer}`);
		if (question.relatedFAQs.length > 0) {
			context.push(`Related FAQs: ${question.relatedFAQs.join(', ')}`);
		}
		return context;
	}
	private async performMockSemanticSearch(
		queryEmbedding: number[],
		options: {
			topK: number;
			category?: string;
			clientSegment?: string;
			minConfidence: number;
		},
	): Promise<
		Array<{
			question: FAQQuestion;
			similarity: number;
			confidence: number;
		}>
	> {
		const faqContent = getFAQContent();
		const results: Array<{
			question: FAQQuestion;
			similarity: number;
			confidence: number;
		}> = [];
		for (const category of faqContent.categories) {
			if (options.category && category.id !== options.category) continue;
			for (const question of category.questions) {
				if (
					options.clientSegment &&
					question.clientSegment !== options.clientSegment &&
					question.clientSegment !== 'all'
				) {
					continue;
				}
				const combinedContent =
					`${question.question} ${question.answer}`.toLowerCase();
				const similarity = this.calculateMockSimilarity(
					queryEmbedding,
					combinedContent,
				);
				const confidence = Math.min(similarity * 1.2, 1.0);
				if (confidence >= options.minConfidence) {
					results.push({
						question,
						similarity,
						confidence,
					});
				}
			}
		}
		results.sort((a, b) => b.similarity - a.similarity);
		return results.slice(0, options.topK);
	}
	private calculateMockSimilarity(embedding: number[], content: string): number {
		const contentHash = this.hashString(content);
		const embeddingHash = this.hashString(embedding.slice(0, 10).join(','));
		const similarity =
			1 -
			Math.abs(contentHash - embeddingHash) /
				Math.max(Math.abs(contentHash), Math.abs(embeddingHash), 1);
		return Math.max(0.1, Math.min(0.95, similarity));
	}
	private generateMockAIResponse(
		query: string,
		context: string,
		intent?: IntentClassification | null,
	): {
		text: string;
		confidence: number;
		tokensUsed: number;
	} {
		let response = '';
		let confidence = 0.7;
		if (intent) {
			const templateResponse = intent.responses[0] || 'I can help you with that.';
			response = `${templateResponse}\n\n`;
			confidence += 0.1;
		}
		if (context.includes('Relevant FAQ Information:')) {
			response += 'Based on our FAQ information:\n\n';
			confidence += 0.1;
		}
		if (context.includes('service')) {
			response +=
				'My Private Tutor Online is a boutique tutoring service founded in 2010, offering premium one-to-one tuition with carefully selected tutors including Oxbridge graduates and official examiners.';
		} else if (context.includes('pricing')) {
			response +=
				'Our bespoke 1-to-1 tutoring starts from just £45 per hour, with no registration or administrative fees.';
		} else if (context.includes('tutors')) {
			response +=
				'We have three tiers of tutors: Tier 1 Super Tutors (official examiners), Tier 2 qualified teachers with 5+ years experience, and Tier 3 graduate specialists.';
		} else {
			response +=
				"I'd be happy to help you with more information about our tutoring services.";
		}
		response +=
			'\n\nWould you like to know more about any specific aspect, or would you prefer to speak with one of our education consultants?';
		return {
			text: response,
			confidence: Math.min(confidence, 0.95),
			tokensUsed: Math.ceil(response.length / 4),
		};
	}
	private generateHumanFallbackResponse(query: string): {
		response: string;
		confidence: number;
		usedFAQs: string[];
		fallbackToHuman: boolean;
		metadata: any;
	} {
		return {
			response: `Thank you for your question. I'd like to connect you with one of our education consultants who can provide you with detailed, personalized information about "${query}". 

Please contact us at:
📧 info@myprivatetutoronline.com
📞 Or complete our enquiry form to schedule a consultation

Our team will be delighted to help you find the perfect tutoring solution.`,
			confidence: 0.9,
			usedFAQs: [],
			fallbackToHuman: true,
			metadata: {
				model: 'human_fallback',
				tokensUsed: 0,
				responseTime: 0,
				intentUsed: undefined,
				contextSources: ['human_fallback'],
			},
		};
	}
	private async loadStoredData(): Promise<void> {
		try {
			const embeddingsData = localStorage.getItem('faq_ai_embeddings');
			if (embeddingsData) {
				const parsed = JSON.parse(embeddingsData);
				this.embeddings = parsed.map((item: any) => embeddingSchema.parse(item));
			}
			const intentsData = localStorage.getItem('faq_ai_intents');
			if (intentsData) {
				const parsed = JSON.parse(intentsData);
				this.intents = parsed.map((item: any) => intentSchema.parse(item));
			}
			const trainingData = localStorage.getItem('faq_ai_training_data');
			if (trainingData) {
				const parsed = JSON.parse(trainingData);
				this.trainingData = parsed.map((item: any) =>
					trainingDataSchema.parse(item),
				);
			}
		} catch (error) {
			console.warn('Failed to load stored AI data:', error);
		}
	}
	private async persistEmbeddings(): Promise<void> {
		try {
			localStorage.setItem('faq_ai_embeddings', JSON.stringify(this.embeddings));
		} catch (error) {
			console.error('Failed to persist embeddings:', error);
		}
	}
	private async persistIntents(): Promise<void> {
		try {
			localStorage.setItem('faq_ai_intents', JSON.stringify(this.intents));
		} catch (error) {
			console.error('Failed to persist intents:', error);
		}
	}
	private async persistTrainingData(): Promise<void> {
		try {
			localStorage.setItem(
				'faq_ai_training_data',
				JSON.stringify(this.trainingData),
			);
		} catch (error) {
			console.error('Failed to persist training data:', error);
		}
	}
	public clearAllData(): void {
		this.embeddings = [];
		this.intents = [];
		this.trainingData = [];
		localStorage.removeItem('faq_ai_embeddings');
		localStorage.removeItem('faq_ai_intents');
		localStorage.removeItem('faq_ai_training_data');
		console.log('🗑️ Cleared all FAQ AI integration data');
	}
	public getSystemStats(): {
		embeddings: number;
		intents: number;
		trainingData: number;
		config: AIResponseConfig;
		storageSize: {
			embeddings: number;
			intents: number;
			trainingData: number;
			total: number;
		};
	} {
		const embeddingsSize = JSON.stringify(this.embeddings).length;
		const intentsSize = JSON.stringify(this.intents).length;
		const trainingSize = JSON.stringify(this.trainingData).length;
		return {
			embeddings: this.embeddings.length,
			intents: this.intents.length,
			trainingData: this.trainingData.length,
			config: this.config,
			storageSize: {
				embeddings: embeddingsSize,
				intents: intentsSize,
				trainingData: trainingSize,
				total: embeddingsSize + intentsSize + trainingSize,
			},
		};
	}
}
export const faqAIIntegration = new FAQAIIntegrationEngine();
export const FAQAIUtils = {
	prepareForChatWidget: async (): Promise<{
		ready: boolean;
		embeddings: number;
		intents: number;
		trainingData: number;
	}> => {
		console.log('🔧 Preparing FAQ AI system for chat widget integration...');
		try {
			if (faqAIIntegration.getSystemStats().embeddings === 0) {
				await faqAIIntegration.generateFAQEmbeddings();
			}
			if (faqAIIntegration.getSystemStats().trainingData === 0) {
				await faqAIIntegration.generateTrainingData();
			}
			const stats = faqAIIntegration.getSystemStats();
			console.log('✅ FAQ AI system ready for chat widget');
			return {
				ready: true,
				embeddings: stats.embeddings,
				intents: stats.intents,
				trainingData: stats.trainingData,
			};
		} catch (error) {
			console.error('❌ Failed to prepare FAQ AI system:', error);
			return {
				ready: false,
				embeddings: 0,
				intents: 0,
				trainingData: 0,
			};
		}
	},
	getChatIntegrationPoints: () => ({
		faqPageHeader: {
			position: 'header',
			component: 'ChatButton',
			props: {
				text: 'Ask AI Assistant',
				icon: 'MessageCircle',
				variant: 'secondary',
			},
		},
		faqSearchArea: {
			position: 'search-enhancement',
			component: 'AIChatSuggestion',
			props: {
				text: 'Or ask our AI assistant',
				trigger: 'search-empty-results',
			},
		},
		faqFooter: {
			position: 'contact-section',
			component: 'ChatWidget',
			props: {
				title: 'Still have questions?',
				subtitle: 'Our AI assistant can help instantly',
			},
		},
		globalChat: {
			position: 'floating',
			component: 'FloatingChatWidget',
			props: {
				position: 'bottom-right',
				minimizable: true,
				contextAware: true,
			},
		},
	}),
};
export default FAQAIIntegrationEngine;
