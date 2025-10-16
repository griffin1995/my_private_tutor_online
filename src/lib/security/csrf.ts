import crypto from 'crypto';
import { cookies } from 'next/headers';
const CSRF_TOKEN_HEADER = 'x-csrf-token';
const CSRF_TOKEN_FIELD = '_csrf';
const CSRF_COOKIE_NAME = 'csrf-token';
const TOKEN_LENGTH = 32;
const TOKEN_EXPIRY = 3600000;
export async function generateCSRFToken(): Promise<string> {
	const token = crypto.randomBytes(TOKEN_LENGTH).toString('hex');
	const expires = new Date(Date.now() + TOKEN_EXPIRY);
	const cookieStore = await cookies();
	cookieStore.set(CSRF_COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		expires,
		path: '/',
	});
	return token;
}
export async function getCSRFToken(): Promise<string | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get(CSRF_COOKIE_NAME)?.value;
	return token || null;
}
export async function verifyCSRFToken(
	requestToken: string | null,
): Promise<boolean> {
	if (!requestToken) return false;
	const storedToken = await getCSRFToken();
	if (!storedToken) return false;
	return crypto.timingSafeEqual(
		Buffer.from(storedToken),
		Buffer.from(requestToken),
	);
}
export function extractCSRFToken(request: Request): string | null {
	const headerToken = request.headers.get(CSRF_TOKEN_HEADER);
	if (headerToken) return headerToken;
	if (
		request.headers
			.get('content-type')
			?.includes('application/x-www-form-urlencoded')
	) {
		return null;
	}
	return null;
}
export async function withCSRFProtection<T>(
	request: Request,
	handler: () => Promise<T>,
): Promise<Response> {
	if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
		return handler() as any;
	}
	const token = extractCSRFToken(request);
	const isValid = await verifyCSRFToken(token);
	if (!isValid) {
		return new Response(
			JSON.stringify({
				error: 'Invalid CSRF token',
			}),
			{
				status: 403,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}
	return handler() as any;
}
export function useCSRFToken() {
	if (typeof window === 'undefined') {
		throw new Error('useCSRFToken can only be used on the client side');
	}
	const getToken = (): string | null => {
		const meta = document.querySelector('meta[name="csrf-token"]');
		return meta?.getAttribute('content') || null;
	};
	const securedFetch = (
		url: string,
		options: RequestInit = {},
	): Promise<Response> => {
		const token = getToken();
		if (!token) {
			throw new Error('CSRF token not found');
		}
		return fetch(url, {
			...options,
			headers: {
				...options.headers,
				[CSRF_TOKEN_HEADER]: token,
			},
		});
	};
	return {
		token: getToken(),
		securedFetch,
	};
}
