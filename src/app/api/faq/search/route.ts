import { NextRequest, NextResponse } from 'next/server';
import { getFAQCategories } from '@/lib/cms/cms-content';
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content';
export const runtime = 'edge';
export const revalidate = 300;
interface SearchResult {
	question: FAQQuestion;
	category: FAQCategory;
	score: number;
	highlighted: {
		question: string;
		answer: string;
	};
}
interface SearchResponse {
	results: SearchResult[];
	metadata: {
		query: string;
		totalResults: number;
		executionTime: number;
		cached: boolean;
	};
}
function calculateScore(question: FAQQuestion, query: string): number {
	const queryLower = query.toLowerCase();
	const questionLower = question.question.toLowerCase();
	const answerLower = question.answer.toLowerCase();
	let score = 0;
	if (questionLower === queryLower) {
		score += 10;
	} else if (questionLower.includes(queryLower)) {
		score += 7;
	}
	if (answerLower.includes(queryLower)) {
		score += 5;
	}
	const queryWords = queryLower.split(' ').filter((w) => w.length > 2);
	queryWords.forEach((word) => {
		if (questionLower.includes(word)) score += 2;
		if (answerLower.includes(word)) score += 1;
	});
	if (question.featured) {
		score *= 1.2;
	}
	score += question.priority * 0.1;
	return score;
}
function highlightText(text: string, query: string): string {
	const queryWords = query
		.toLowerCase()
		.split(' ')
		.filter((w) => w.length > 2);
	let highlightedText = text;
	queryWords.forEach((word) => {
		const regex = new RegExp(`(${word})`, 'gi');
		highlightedText = highlightedText.replace(
			regex,
			'<mark class="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded">$1</mark>',
		);
	});
	return highlightedText;
}
export async function GET(request: NextRequest) {
	const startTime = Date.now();
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get('q') || '';
		const category = searchParams.get('category');
		const limit = parseInt(searchParams.get('limit') || '20', 10);
		const offset = parseInt(searchParams.get('offset') || '0', 10);
		if (!query || query.length < 2) {
			return NextResponse.json(
				{
					results: [],
					metadata: {
						query,
						totalResults: 0,
						executionTime: Date.now() - startTime,
						cached: false,
					},
				},
				{
					headers: {
						'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
						'CDN-Cache-Control': 'max-age=300',
						'X-Response-Time': `${Date.now() - startTime}ms`,
					},
				},
			);
		}
		const categories = getFAQCategories();
		const searchResults: SearchResult[] = [];
		categories.forEach((cat) => {
			if (category && cat.id !== category) {
				return;
			}
			cat.questions.forEach((question) => {
				const score = calculateScore(question, query);
				if (score > 0) {
					searchResults.push({
						question,
						category: cat,
						score,
						highlighted: {
							question: highlightText(question.question, query),
							answer: highlightText(question.answer, query),
						},
					});
				}
			});
		});
		searchResults.sort((a, b) => b.score - a.score);
		const paginatedResults = searchResults.slice(offset, offset + limit);
		const executionTime = Date.now() - startTime;
		const response: SearchResponse = {
			results: paginatedResults,
			metadata: {
				query,
				totalResults: searchResults.length,
				executionTime,
				cached: false,
			},
		};
		return NextResponse.json(response, {
			headers: {
				'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
				'CDN-Cache-Control': 'max-age=300',
				Vary: 'Accept-Encoding',
				'X-Response-Time': `${executionTime}ms`,
				'X-Edge-Region': process.env.VERCEL_REGION || 'unknown',
			},
		});
	} catch (error) {
		console.error('FAQ search error:', error);
		return NextResponse.json(
			{
				error: 'Search service temporarily unavailable',
				results: [],
				metadata: {
					query: '',
					totalResults: 0,
					executionTime: Date.now() - startTime,
					cached: false,
				},
			},
			{
				status: 500,
				headers: {
					'X-Response-Time': `${Date.now() - startTime}ms`,
				},
			},
		);
	}
}
export async function OPTIONS(request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
		},
	});
}
