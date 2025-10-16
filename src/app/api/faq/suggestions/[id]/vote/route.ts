import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
interface VoteRequest {
	voteType: 'upvote' | 'downvote';
	userId?: string;
}
interface VoteResponse {
	success: boolean;
	data?: {
		suggestionId: string;
		currentVote?: 'upvote' | 'downvote' | null;
		totalVotes: {
			upvotes: number;
			downvotes: number;
			netVotes: number;
		};
	};
	error?: string;
	message?: string;
}
interface VoteRecord {
	id: string;
	suggestionId: string;
	userId?: string;
	voteType: 'upvote' | 'downvote';
	ipAddress: string;
	userAgent: string;
	createdAt: string;
	updatedAt: string;
}
const mockVotes: VoteRecord[] = [
	{
		id: 'vote-1',
		suggestionId: 'suggestion-1',
		userId: 'user-1',
		voteType: 'upvote',
		ipAddress: '192.168.1.100',
		userAgent: 'Mozilla/5.0',
		createdAt: new Date(Date.now() - 86400000).toISOString(),
		updatedAt: new Date(Date.now() - 86400000).toISOString(),
	},
];
const mockSuggestions = [
	{
		id: 'suggestion-1',
		votes: {
			upvotes: 15,
			downvotes: 2,
			netVotes: 13,
		},
	},
	{
		id: 'suggestion-2',
		votes: {
			upvotes: 8,
			downvotes: 1,
			netVotes: 7,
		},
	},
];
const validateVoteInput = (data: any): string[] => {
	const errors: string[] = [];
	if (!data.voteType || !['upvote', 'downvote'].includes(data.voteType)) {
		errors.push('Valid vote type (upvote/downvote) is required');
	}
	return errors;
};
const detectVotingFraud = (
	suggestionId: string,
	userId: string | undefined,
	ipAddress: string,
	userAgent: string,
): {
	isFraud: boolean;
	reasons: string[];
} => {
	const reasons: string[] = [];
	const recentVotes = mockVotes.filter(
		(vote) =>
			vote.ipAddress === ipAddress &&
			new Date(vote.createdAt).getTime() > Date.now() - 300000,
	);
	if (recentVotes.length >= 5) {
		reasons.push('too_many_votes_from_ip');
	}
	const veryRecentVotes = mockVotes.filter(
		(vote) =>
			vote.ipAddress === ipAddress &&
			new Date(vote.createdAt).getTime() > Date.now() - 60000,
	);
	if (veryRecentVotes.length >= 3) {
		reasons.push('rapid_voting_pattern');
	}
	if (
		!userAgent ||
		userAgent.length < 10 ||
		/bot|crawler|spider/i.test(userAgent)
	) {
		reasons.push('suspicious_user_agent');
	}
	return {
		isFraud: reasons.length > 0,
		reasons,
	};
};
const getVoteCounts = (suggestionId: string) => {
	const suggestionVotes = mockVotes.filter(
		(vote) => vote.suggestionId === suggestionId,
	);
	const upvotes = suggestionVotes.filter(
		(vote) => vote.voteType === 'upvote',
	).length;
	const downvotes = suggestionVotes.filter(
		(vote) => vote.voteType === 'downvote',
	).length;
	return {
		upvotes,
		downvotes,
		netVotes: upvotes - downvotes,
	};
};
export async function POST(
	request: NextRequest,
	{
		params,
	}: {
		params: Promise<{
			id: string;
		}>;
	},
) {
	try {
		const { id } = await params;
		const suggestionId = id;
		const headersList = headers();
		const userIP = headersList.get('x-forwarded-for') || 'unknown';
		const userAgent = headersList.get('user-agent') || 'unknown';
		const body = await request.json();
		const validationErrors = validateVoteInput(body);
		if (validationErrors.length > 0) {
			const response: VoteResponse = {
				success: false,
				error: 'Validation failed',
				message: validationErrors.join('. '),
			};
			return NextResponse.json(response, {
				status: 400,
			});
		}
		const fraudDetection = detectVotingFraud(
			suggestionId,
			body.userId,
			userIP,
			userAgent,
		);
		if (fraudDetection.isFraud) {
			const response: VoteResponse = {
				success: false,
				error: 'Voting fraud detected',
				message: 'Your voting activity appears suspicious. Please try again later.',
			};
			return NextResponse.json(response, {
				status: 422,
			});
		}
		const existingVoteIndex = mockVotes.findIndex((vote) => {
			if (body.userId) {
				return vote.suggestionId === suggestionId && vote.userId === body.userId;
			}
			return vote.suggestionId === suggestionId && vote.ipAddress === userIP;
		});
		let currentVote: 'upvote' | 'downvote' | null = null;
		if (existingVoteIndex !== -1) {
			const existingVote = mockVotes[existingVoteIndex];
			if (existingVote.voteType === body.voteType) {
				mockVotes.splice(existingVoteIndex, 1);
				currentVote = null;
			} else {
				mockVotes[existingVoteIndex] = {
					...existingVote,
					voteType: body.voteType,
					updatedAt: new Date().toISOString(),
				};
				currentVote = body.voteType;
			}
		} else {
			const newVote: VoteRecord = {
				id: `vote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				suggestionId,
				userId: body.userId,
				voteType: body.voteType,
				ipAddress: userIP,
				userAgent: userAgent.substring(0, 255),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			mockVotes.push(newVote);
			currentVote = body.voteType;
		}
		const voteCounts = getVoteCounts(suggestionId);
		const suggestionIndex = mockSuggestions.findIndex(
			(s) => s.id === suggestionId,
		);
		if (suggestionIndex !== -1) {
			mockSuggestions[suggestionIndex].votes = voteCounts;
		}
		console.log('FAQ Vote Cast:', {
			suggestionId,
			voteType: currentVote,
			isAnonymous: !body.userId,
			ipAddress: userIP.substring(0, 12),
			timestamp: new Date().toISOString(),
			voteCounts,
		});
		const response: VoteResponse = {
			success: true,
			data: {
				suggestionId,
				currentVote,
				totalVotes: voteCounts,
			},
			message:
				currentVote ?
					`Your ${currentVote} has been recorded`
				:	'Your vote has been removed',
		};
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error processing vote:', error);
		const response: VoteResponse = {
			success: false,
			error: 'Failed to process vote',
		};
		return NextResponse.json(response, {
			status: 500,
		});
	}
}
export async function GET(
	request: NextRequest,
	{
		params,
	}: {
		params: Promise<{
			id: string;
		}>;
	},
) {
	try {
		const { id } = await params;
		const suggestionId = id;
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get('userId');
		const headersList = headers();
		const userIP = headersList.get('x-forwarded-for') || 'unknown';
		const existingVote = mockVotes.find((vote) => {
			if (userId) {
				return vote.suggestionId === suggestionId && vote.userId === userId;
			}
			return vote.suggestionId === suggestionId && vote.ipAddress === userIP;
		});
		const voteCounts = getVoteCounts(suggestionId);
		const response: VoteResponse = {
			success: true,
			data: {
				suggestionId,
				currentVote: existingVote ? existingVote.voteType : null,
				totalVotes: voteCounts,
			},
		};
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching vote status:', error);
		const response: VoteResponse = {
			success: false,
			error: 'Failed to fetch vote status',
		};
		return NextResponse.json(response, {
			status: 500,
		});
	}
}
export async function DELETE(
	request: NextRequest,
	{
		params,
	}: {
		params: Promise<{
			id: string;
		}>;
	},
) {
	try {
		const { id } = await params;
		const suggestionId = id;
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get('userId');
		const headersList = headers();
		const userIP = headersList.get('x-forwarded-for') || 'unknown';
		const existingVoteIndex = mockVotes.findIndex((vote) => {
			if (userId) {
				return vote.suggestionId === suggestionId && vote.userId === userId;
			}
			return vote.suggestionId === suggestionId && vote.ipAddress === userIP;
		});
		if (existingVoteIndex === -1) {
			const response: VoteResponse = {
				success: false,
				error: 'No vote found to remove',
			};
			return NextResponse.json(response, {
				status: 404,
			});
		}
		mockVotes.splice(existingVoteIndex, 1);
		const voteCounts = getVoteCounts(suggestionId);
		const suggestionIndex = mockSuggestions.findIndex(
			(s) => s.id === suggestionId,
		);
		if (suggestionIndex !== -1) {
			mockSuggestions[suggestionIndex].votes = voteCounts;
		}
		console.log('FAQ Vote Removed:', {
			suggestionId,
			isAnonymous: !userId,
			timestamp: new Date().toISOString(),
			voteCounts,
		});
		const response: VoteResponse = {
			success: true,
			data: {
				suggestionId,
				currentVote: null,
				totalVotes: voteCounts,
			},
			message: 'Your vote has been removed',
		};
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error removing vote:', error);
		const response: VoteResponse = {
			success: false,
			error: 'Failed to remove vote',
		};
		return NextResponse.json(response, {
			status: 500,
		});
	}
}
export async function OPTIONS(request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Access-Control-Max-Age': '86400',
		},
	});
}
