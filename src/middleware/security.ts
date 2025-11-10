import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
const rateLimitMap = new Map<
	string,
	{
		count: number;
		resetTime: number;
	}
>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMITS = {
	api: 60,
	auth: 5,
	contact: 3,
	admin: 100,
};
const csrfTokens = new Map<
	string,
	{
		token: string;
		expires: number;
	}
>();
export function generateCSRFToken(): string {
	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
		'',
	);
}
export function verifyCSRFToken(sessionId: string, token: string): boolean {
	const stored = csrfTokens.get(sessionId);
	if (!stored || stored.expires < Date.now()) {
		return false;
	}
	if (stored.token.length !== token.length) {
		return false;
	}
	let result = 0;
	for (let i = 0; i < stored.token.length; i++) {
		result |= stored.token.charCodeAt(i) ^ token.charCodeAt(i);
	}
	return result === 0;
}
export function checkRateLimit(
	identifier: string,
	limit: number,
): {
	allowed: boolean;
	remaining: number;
	resetTime: number;
} {
	const now = Date.now();
	const record = rateLimitMap.get(identifier) || {
		count: 0,
		resetTime: now + RATE_LIMIT_WINDOW,
	};
	if (now > record.resetTime) {
		record.count = 0;
		record.resetTime = now + RATE_LIMIT_WINDOW;
	}
	record.count++;
	rateLimitMap.set(identifier, record);
	if (rateLimitMap.size > 10000) {
		for (const [key, value] of rateLimitMap.entries()) {
			if (now > value.resetTime + RATE_LIMIT_WINDOW) {
				rateLimitMap.delete(key);
			}
		}
	}
	return {
		allowed: record.count <= limit,
		remaining: Math.max(0, limit - record.count),
		resetTime: record.resetTime,
	};
}
export const inputSchemas = {
	contactForm: z.object({
		name: z
			.string()
			.min(2)
			.max(100)
			.regex(/^[a-zA-Z\s\-']+$/),
		email: z.string().email().max(255),
		phone: z
			.string()
			.regex(/^[\d\s\-\+\(\)]+$/)
			.max(20)
			.optional(),
		subject: z.string().min(5).max(200),
		message: z.string().min(10).max(5000),
		preferredContact: z.enum(['email', 'phone']).optional(),
		studentAge: z.number().min(4).max(25).optional(),
		tutoringSubject: z.string().max(100).optional(),
	}),
	login: z.object({
		email: z.string().email().max(255),
		password: z.string().min(8).max(128),
		rememberMe: z.boolean().optional(),
	}),
	textInput: z
		.string()
		.max(1000)
		.regex(/^[^<>{}]*$/),
};
export function sanitiseInput<T>(
	data: unknown,
	schema: z.ZodSchema<T>,
): {
	success: boolean;
	data?: T;
	errors?: z.ZodError;
} {
	try {
		const validated = schema.parse(data);
		return {
			success: true,
			data: validated,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				errors: error,
			};
		}
		throw error;
	}
}
export function applySecurityHeaders(response: NextResponse): NextResponse {
	const array = new Uint8Array(16);
	crypto.getRandomValues(array);
	const nonce = btoa(String.fromCharCode(...array));
	const requestIdArray = new Uint8Array(16);
	crypto.getRandomValues(requestIdArray);
	const requestId = Array.from(requestIdArray, (byte) =>
		byte.toString(16).padStart(2, '0'),
	).join('');
	response.headers.set('X-Request-ID', requestId);
	response.headers.set('X-Content-Security-Policy-Nonce', nonce);
	return response;
}
export async function securityMiddleware(
	request: NextRequest,
): Promise<NextResponse | null> {
	const path = request.nextUrl.pathname;
	const method = request.method;
	const clientIp =
		request.headers.get('x-forwarded-for') ||
		request.headers.get('x-real-ip') ||
		'unknown';
	const userAgent = request.headers.get('user-agent') || 'unknown';
	if (
		path.match(
			/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|otf|mp4|webm|mov|avi)$/,
		)
	) {
		return null;
	}
	let securityEvent: SecurityEvent | null = null;
	let rateLimit = RATE_LIMITS.api;
	if (path.startsWith('/api/auth') || path.startsWith('/admin/login')) {
		rateLimit = RATE_LIMITS.auth;
	} else if (path.includes('/contact') || path.includes('/enquiry')) {
		rateLimit = RATE_LIMITS.contact;
	} else if (path.startsWith('/admin')) {
		rateLimit = RATE_LIMITS.admin;
	}
	const rateLimitResult = checkRateLimit(`${clientIp}:${path}`, rateLimit);
	if (!rateLimitResult.allowed) {
		securityEvent = {
			type: 'rate_limit',
			severity: 'medium',
			timestamp: new Date(),
			clientIp,
			path,
			details: {
				method,
				userAgent,
				limit: rateLimit,
				exceeded: rateLimitResult.remaining < 0,
			},
		};
		securityMonitor.logEvent(securityEvent);
		return new NextResponse('Too Many Requests', {
			status: 429,
			headers: {
				'Retry-After': String(
					Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
				),
				'X-RateLimit-Limit': String(rateLimit),
				'X-RateLimit-Remaining': String(rateLimitResult.remaining),
				'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
			},
		});
	}
	if (
		method === 'POST' ||
		method === 'PUT' ||
		method === 'DELETE' ||
		method === 'PATCH'
	) {
		const sessionId =
			request.cookies.get('session')?.value ||
			request.cookies.get('admin_session')?.value;
		if (sessionId && !path.startsWith('/api/auth/login')) {
			const csrfToken = request.headers.get('x-csrf-token');
			if (!csrfToken || !verifyCSRFToken(sessionId, csrfToken)) {
				securityEvent = {
					type: 'csrf_failure',
					severity: 'high',
					timestamp: new Date(),
					clientIp,
					path,
					details: {
						method,
						userAgent,
						hasSession: !!sessionId,
						hasToken: !!csrfToken,
					},
				};
				securityMonitor.logEvent(securityEvent);
				return new NextResponse('Invalid CSRF Token', {
					status: 403,
				});
			}
		}
	}
	if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
		const contentType = request.headers.get('content-type') || '';
		let requestData: any = {};
		try {
			if (contentType.includes('application/json')) {
				const body = await request.text();
				requestData = JSON.parse(body);
			} else if (contentType.includes('application/x-www-form-urlencoded')) {
				const body = await request.text();
				requestData = Object.fromEntries(new URLSearchParams(body));
			}
		} catch (error) {
			requestData = {
				parseError: true,
			};
		}
		securityEvent = {
			type: 'suspicious_input',
			severity: 'low',
			timestamp: new Date(),
			clientIp,
			path,
			details: {
				method,
				userAgent,
				contentType,
				requestData,
				referer: request.headers.get('referer'),
			},
		};
	}
	if (path.startsWith('/admin') || path.startsWith('/api/auth')) {
		const auditEvent = {
			timestamp: new Date().toISOString(),
			method,
			path,
			clientIp,
			userAgent,
			referer: request.headers.get('referer'),
			authenticated:
				!!request.cookies.get('session')?.value ||
				!!request.cookies.get('admin_session')?.value,
		};
		console.log('[Security Audit]', auditEvent);
		if (path.includes('login') && method === 'POST') {
		}
	}
	return null;
}
export interface SecurityEvent {
	type:
		| 'rate_limit'
		| 'csrf_failure'
		| 'auth_failure'
		| 'suspicious_input'
		| 'sql_injection_attempt';
	severity: 'low' | 'medium' | 'high' | 'critical';
	timestamp: Date;
	clientIp: string;
	path: string;
	details: Record<string, any>;
}
export class SecurityMonitor {
	private events: SecurityEvent[] = [];
	private alertThresholds = {
		rate_limit: {
			count: 10,
			window: 300000,
		},
		csrf_failure: {
			count: 5,
			window: 300000,
		},
		auth_failure: {
			count: 3,
			window: 300000,
		},
		suspicious_input: {
			count: 5,
			window: 600000,
		},
		sql_injection_attempt: {
			count: 1,
			window: 3600000,
		},
	};
	logEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
		const fullEvent: SecurityEvent = {
			...event,
			timestamp: new Date(),
		};
		this.events.push(fullEvent);
		this.checkThresholds(fullEvent);
		const cutoff = Date.now() - 86400000;
		this.events = this.events.filter((e) => e.timestamp.getTime() > cutoff);
	}
	private checkThresholds(event: SecurityEvent): void {
		const threshold = this.alertThresholds[event.type];
		const recentEvents = this.events.filter(
			(e) =>
				e.type === event.type &&
				e.clientIp === event.clientIp &&
				e.timestamp.getTime() > Date.now() - threshold.window,
		);
		if (recentEvents.length >= threshold.count) {
			this.sendAlert({
				title: `Security Alert: ${event.type}`,
				severity: event.severity,
				message: `Threshold exceeded for ${event.type} from IP ${event.clientIp}`,
				events: recentEvents,
			});
		}
	}
	private sendAlert(alert: {
		title: string;
		severity: string;
		message: string;
		events: SecurityEvent[];
	}): void {
		console.error('[SECURITY ALERT]', alert);
	}
}
export const securityMonitor = new SecurityMonitor();
