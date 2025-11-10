import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema, safeValidateForm } from '@/lib/validation/schemas';
const RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const rateLimitMap = new Map<
	string,
	{
		count: number;
		resetTime: number;
	}
>();
function getRateLimitKey(request: NextRequest): string {
	const forwarded = request.headers.get('x-forwarded-for');
	const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
	return `newsletter:${ip}`;
}
function checkRateLimit(key: string): {
	allowed: boolean;
	resetTime?: number;
} {
	const now = Date.now();
	const record = rateLimitMap.get(key);
	if (!record || now > record.resetTime) {
		rateLimitMap.set(key, {
			count: 1,
			resetTime: now + RATE_LIMIT_WINDOW,
		});
		return {
			allowed: true,
		};
	}
	if (record.count >= RATE_LIMIT_REQUESTS) {
		return {
			allowed: false,
			resetTime: record.resetTime,
		};
	}
	record.count += 1;
	return {
		allowed: true,
	};
}
export async function POST(request: NextRequest) {
	try {
		const rateLimitKey = getRateLimitKey(request);
		const rateLimit = checkRateLimit(rateLimitKey);
		if (!rateLimit.allowed) {
			return NextResponse.json(
				{
					success: false,
					error: 'Too many requests. Please try again later.',
					resetTime: rateLimit.resetTime,
				},
				{
					status: 429,
				},
			);
		}
		const body = await request.json();
		const validation = safeValidateForm(newsletterSchema, body);
		if (!validation.success) {
			return NextResponse.json(
				{
					success: false,
					error: 'Validation failed',
					fieldErrors: validation.errors || {},
				},
				{
					status: 400,
				},
			);
		}
		const { email, firstName, interests, consentToMarketing } = validation.data;
		if (body.honeypot && body.honeypot.trim() !== '') {
			console.warn(`Newsletter spam attempt detected: ${email}`);
			return NextResponse.json({
				success: true,
				message: 'Subscription successful!',
			});
		}
		console.log('Newsletter subscription:', {
			email,
			firstName: firstName || 'Not provided',
			interests: interests || [],
			consentToMarketing,
			timestamp: new Date().toISOString(),
			userAgent: request.headers.get('user-agent'),
			referer: request.headers.get('referer'),
		});
		return NextResponse.json({
			success: true,
			message:
				"Thank you for subscribing! You'll receive personalised academic insights and exclusive opportunities.",
			data: {
				email,
				subscribedAt: new Date().toISOString(),
			},
		});
	} catch (error) {
		console.error('Newsletter subscription error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'An unexpected error occurred. Please try again later.',
			},
			{
				status: 500,
			},
		);
	}
}
export async function GET() {
	return NextResponse.json(
		{
			error: 'Method not allowed',
		},
		{
			status: 405,
		},
	);
}
export async function PUT() {
	return NextResponse.json(
		{
			error: 'Method not allowed',
		},
		{
			status: 405,
		},
	);
}
export async function DELETE() {
	return NextResponse.json(
		{
			error: 'Method not allowed',
		},
		{
			status: 405,
		},
	);
}
