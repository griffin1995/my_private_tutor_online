import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encrypt, SessionPayload } from '@/lib/auth/session';
import { z } from 'zod';
const loginAttempts = new Map<
	string,
	{
		count: number;
		lastAttempt: number;
	}
>();
const loginSchema = z.object({
	email: z.string().email('Invalid email format'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});
const RATE_LIMIT = {
	MAX_ATTEMPTS: 5,
	WINDOW_MS: 15 * 60 * 1000,
	LOCKOUT_MS: 30 * 60 * 1000,
};
const ADMIN_CREDENTIALS = {
	email: process.env['ADMIN_EMAIL'],
	password: process.env['ADMIN_PASSWORD'],
};
function checkRateLimit(clientIP: string): {
	allowed: boolean;
	remainingAttempts: number;
} {
	const now = Date.now();
	const attempts = loginAttempts.get(clientIP);
	if (!attempts) {
		loginAttempts.set(clientIP, {
			count: 1,
			lastAttempt: now,
		});
		return {
			allowed: true,
			remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1,
		};
	}
	if (now - attempts.lastAttempt > RATE_LIMIT.WINDOW_MS) {
		loginAttempts.set(clientIP, {
			count: 1,
			lastAttempt: now,
		});
		return {
			allowed: true,
			remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1,
		};
	}
	if (attempts.count >= RATE_LIMIT.MAX_ATTEMPTS) {
		const lockoutEnd = attempts.lastAttempt + RATE_LIMIT.LOCKOUT_MS;
		if (now < lockoutEnd) {
			return {
				allowed: false,
				remainingAttempts: 0,
			};
		} else {
			loginAttempts.set(clientIP, {
				count: 1,
				lastAttempt: now,
			});
			return {
				allowed: true,
				remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1,
			};
		}
	}
	attempts.count++;
	attempts.lastAttempt = now;
	loginAttempts.set(clientIP, attempts);
	return {
		allowed: attempts.count <= RATE_LIMIT.MAX_ATTEMPTS,
		remainingAttempts: Math.max(0, RATE_LIMIT.MAX_ATTEMPTS - attempts.count),
	};
}
function clearRateLimit(clientIP: string): void {
	loginAttempts.delete(clientIP);
}
export async function POST(request: NextRequest) {
	try {
		if (!ADMIN_CREDENTIALS.email || !ADMIN_CREDENTIALS.password) {
			console.error('Admin credentials not configured in environment variables');
			return NextResponse.json(
				{
					error: 'Authentication service unavailable',
				},
				{
					status: 500,
				},
			);
		}
		const clientIP =
			request.headers.get('x-forwarded-for')?.split(',')[0] ||
			request.headers.get('x-real-ip') ||
			'unknown';
		const rateLimitResult = checkRateLimit(clientIP);
		if (!rateLimitResult.allowed) {
			console.warn(`Rate limit exceeded for IP: ${clientIP}`);
			return NextResponse.json(
				{
					error: 'Too many login attempts. Please try again later.',
					retryAfter: Math.ceil(RATE_LIMIT.LOCKOUT_MS / 1000),
				},
				{
					status: 429,
				},
			);
		}
		const body = await request.json();
		const validationResult = loginSchema.safeParse(body);
		if (!validationResult.success) {
			return NextResponse.json(
				{
					error: 'Invalid request data',
					details: validationResult.error.errors,
				},
				{
					status: 400,
				},
			);
		}
		const { email, password } = validationResult.data;
		const isValidCredentials =
			email.toLowerCase() === ADMIN_CREDENTIALS.email?.toLowerCase() &&
			password === ADMIN_CREDENTIALS.password;
		if (!isValidCredentials) {
			console.warn(`Failed login attempt from IP: ${clientIP}, Email: ${email}`);
			return NextResponse.json(
				{
					error: 'Invalid credentials',
					remainingAttempts: rateLimitResult.remainingAttempts,
				},
				{
					status: 401,
				},
			);
		}
		clearRateLimit(clientIP);
		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		const sessionPayload: SessionPayload = {
			userId: 'admin',
			role: 'admin',
			expiresAt,
		};
		const sessionToken = await encrypt(sessionPayload);
		const cookieStore = await cookies();
		cookieStore.set('admin_session', sessionToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			expires: expiresAt,
		});
		console.log(`Successful admin login from IP: ${clientIP}, Email: ${email}`);
		return NextResponse.json(
			{
				success: true,
				message: 'Authentication successful',
				expiresAt: expiresAt.toISOString(),
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error('Admin login API error:', error);
		return NextResponse.json(
			{
				error: 'Internal server error',
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
