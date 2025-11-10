import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
interface FAQSuggestion {
	id: string;
	question: string;
	answer: string;
	category: string;
	suggestedBy: string;
	isAnonymous: boolean;
	votes: {
		upvotes: number;
		downvotes: number;
		netVotes: number;
	};
	status: 'pending' | 'approved' | 'rejected' | 'under_review';
	tags: string[];
	priority: number;
	helpfulnessScore: number;
	createdAt: string;
	updatedAt: string;
	moderatorFeedback?: string;
}
interface APIResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	pagination?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}
interface SuggestionFilters {
	category?: string;
	status?: string;
	sortBy?: 'newest' | 'votes' | 'helpful';
	showAnonymous?: boolean;
	page?: number;
	limit?: number;
}
const validateSuggestionInput = (data: any) => {
	const errors: string[] = [];
	if (
		!data.question ||
		typeof data.question !== 'string' ||
		data.question.length < 10
	) {
		errors.push('Question must be at least 10 characters long');
	}
	if (
		!data.answer ||
		typeof data.answer !== 'string' ||
		data.answer.length < 20
	) {
		errors.push('Answer must be at least 20 characters long');
	}
	if (!data.category || typeof data.category !== 'string') {
		errors.push('Category is required');
	}
	if (data.question && data.question.length > 500) {
		errors.push('Question must be less than 500 characters');
	}
	if (data.answer && data.answer.length > 2000) {
		errors.push('Answer must be less than 2000 characters');
	}
	return errors;
};
const rateLimits = new Map<
	string,
	{
		count: number;
		resetTime: number;
	}
>();
const checkRateLimit = (
	identifier: string,
	maxRequests = 10,
	windowMs = 60000,
): boolean => {
	const now = Date.now();
	const userLimit = rateLimits.get(identifier);
	if (!userLimit || now > userLimit.resetTime) {
		rateLimits.set(identifier, {
			count: 1,
			resetTime: now + windowMs,
		});
		return true;
	}
	if (userLimit.count >= maxRequests) {
		return false;
	}
	userLimit.count++;
	return true;
};
const detectSpam = (
	content: string,
	_userHistory?: any[],
): {
	isSpam: boolean;
	score: number;
	reasons: string[];
} => {
	const reasons: string[] = [];
	let spamScore = 0;
	const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
	if (capsRatio > 0.7) {
		spamScore += 0.3;
		reasons.push('excessive_caps');
	}
	if (/(.)\1{4,}/.test(content)) {
		spamScore += 0.2;
		reasons.push('repeated_characters');
	}
	const spamPatterns = [
		/buy now/i,
		/click here/i,
		/free money/i,
		/guaranteed/i,
		/winner/i,
		/congratulations/i,
	];
	spamPatterns.forEach((pattern) => {
		if (pattern.test(content)) {
			spamScore += 0.4;
			reasons.push('spam_keywords');
		}
	});
	if (content.length < 20 || content.length > 5000) {
		spamScore += 0.1;
		reasons.push('suspicious_length');
	}
	return {
		isSpam: spamScore >= 0.7,
		score: Math.min(spamScore, 1.0),
		reasons,
	};
};
const mockSuggestions: FAQSuggestion[] = [
	{
		id: 'suggestion-1',
		question: 'How do you handle students with learning difficulties?',
		answer:
			'We have specialized tutors trained in various learning support methods including dyslexia-friendly techniques, ADHD support strategies, and multi-sensory learning approaches.',
		category: 'tutoring',
		suggestedBy: 'Sarah Johnson',
		isAnonymous: false,
		votes: {
			upvotes: 15,
			downvotes: 2,
			netVotes: 13,
		},
		status: 'approved',
		tags: ['learning-difficulties', 'specialized-support', 'accessibility'],
		priority: 8,
		helpfulnessScore: 4.6,
		createdAt: new Date(Date.now() - 86400000).toISOString(),
		updatedAt: new Date(Date.now() - 86400000).toISOString(),
		moderatorFeedback: 'Excellent suggestion - addresses a common parent concern',
	},
	{
		id: 'suggestion-2',
		question: 'Do you offer group tutoring sessions?',
		answer:
			'Yes, we offer small group sessions (2-4 students) for certain subjects. Group sessions are available for popular subjects like Maths and English at GCSE level.',
		category: 'pricing',
		suggestedBy: 'Anonymous',
		isAnonymous: true,
		votes: {
			upvotes: 8,
			downvotes: 1,
			netVotes: 7,
		},
		status: 'pending',
		tags: ['group-sessions', 'pricing', 'gcse'],
		priority: 6,
		helpfulnessScore: 4.2,
		createdAt: new Date(Date.now() - 43200000).toISOString(),
		updatedAt: new Date(Date.now() - 43200000).toISOString(),
	},
];
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const filters: SuggestionFilters = {
			category: searchParams.get('category') || undefined,
			status: searchParams.get('status') || undefined,
			sortBy: (searchParams.get('sortBy') as any) || 'votes',
			showAnonymous: searchParams.get('showAnonymous') !== 'false',
			page: parseInt(searchParams.get('page') || '1'),
			limit: Math.min(parseInt(searchParams.get('limit') || '10'), 50),
		};
		const filteredSuggestions = mockSuggestions.filter((suggestion) => {
			if (filters.category && suggestion.category !== filters.category)
				return false;
			if (filters.status && suggestion.status !== filters.status) return false;
			if (!filters.showAnonymous && suggestion.isAnonymous) return false;
			return true;
		});
		filteredSuggestions.sort((a, b) => {
			switch (filters.sortBy) {
				case 'newest':
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
				case 'votes':
					return b.votes.netVotes - a.votes.netVotes;
				case 'helpful':
					return b.helpfulnessScore - a.helpfulnessScore;
				default:
					return 0;
			}
		});
		const startIndex = ((filters.page || 1) - 1) * (filters.limit || 10);
		const endIndex = startIndex + (filters.limit || 10);
		const paginatedSuggestions = filteredSuggestions.slice(startIndex, endIndex);
		const response: APIResponse<FAQSuggestion[]> = {
			success: true,
			data: paginatedSuggestions,
			pagination: {
				page: filters.page || 1,
				limit: filters.limit || 10,
				total: filteredSuggestions.length,
				totalPages: Math.ceil(filteredSuggestions.length / (filters.limit || 10)),
			},
		};
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching suggestions:', error);
		const response: APIResponse = {
			success: false,
			error: 'Internal server error',
		};
		return NextResponse.json(response, {
			status: 500,
		});
	}
}
export async function POST(request: NextRequest) {
	try {
		const headersList = headers();
		const userIP = headersList.get('x-forwarded-for') || 'unknown';
		const userAgent = headersList.get('user-agent') || 'unknown';
		if (!checkRateLimit(userIP, 5, 300000)) {
			const response: APIResponse = {
				success: false,
				error:
					'Rate limit exceeded. Please wait before submitting another suggestion.',
			};
			return NextResponse.json(response, {
				status: 429,
			});
		}
		const body = await request.json();
		const validationErrors = validateSuggestionInput(body);
		if (validationErrors.length > 0) {
			const response: APIResponse = {
				success: false,
				error: 'Validation failed',
				message: validationErrors.join('. '),
			};
			return NextResponse.json(response, {
				status: 400,
			});
		}
		const combinedContent = `${body.question} ${body.answer}`;
		const spamDetection = detectSpam(combinedContent);
		if (spamDetection.isSpam) {
			const response: APIResponse = {
				success: false,
				error: 'Content flagged as potential spam',
				message:
					'Your submission has been flagged for review. Please ensure your content is helpful and relevant.',
			};
			return NextResponse.json(response, {
				status: 422,
			});
		}
		const newSuggestion: FAQSuggestion = {
			id: `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			question: body.question.trim(),
			answer: body.answer.trim(),
			category: body.category,
			suggestedBy:
				body.isAnonymous ? 'Anonymous' : body.contributorName || 'Unknown',
			isAnonymous: body.isAnonymous || false,
			votes: {
				upvotes: 0,
				downvotes: 0,
				netVotes: 0,
			},
			status: spamDetection.score > 0.3 ? 'under_review' : 'pending',
			tags:
				body.tags ?
					body.tags
						.split(',')
						.map((tag: string) => tag.trim())
						.filter(Boolean)
				:	[],
			priority: 5,
			helpfulnessScore: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		mockSuggestions.unshift(newSuggestion);
		console.log('FAQ Suggestion Submitted:', {
			suggestionId: newSuggestion.id,
			category: newSuggestion.category,
			isAnonymous: newSuggestion.isAnonymous,
			spamScore: spamDetection.score,
			userAgent: userAgent.substring(0, 100),
			timestamp: new Date().toISOString(),
		});
		const response: APIResponse<FAQSuggestion> = {
			success: true,
			data: newSuggestion,
			message: 'Suggestion submitted successfully and is awaiting moderation.',
		};
		return NextResponse.json(response, {
			status: 201,
		});
	} catch (error) {
		console.error('Error creating suggestion:', error);
		const response: APIResponse = {
			success: false,
			error: 'Failed to submit suggestion',
		};
		return NextResponse.json(response, {
			status: 500,
		});
	}
}
export async function OPTIONS(request: NextRequest) {
	// Use secure CORS configuration (no wildcards)
	const { handleCorsPreflightRequest } = await import('@/lib/security/cors');
	const origin = request.headers.get('origin');
	return handleCorsPreflightRequest(origin);
}
