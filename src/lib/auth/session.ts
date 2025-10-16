import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
export interface SessionPayload {
	userId: string;
	role: 'admin';
	expiresAt: Date;
	[key: string]: any;
}
const secretKey =
	process.env.SESSION_SECRET ||
	(process.env.NODE_ENV === 'production' ?
		''
	:	'build-time-placeholder-key-minimum-32-chars');
if (
	!secretKey &&
	process.env.NODE_ENV === 'production' &&
	typeof window === 'undefined'
) {
	throw new Error(
		'SESSION_SECRET environment variable is required for admin authentication',
	);
}
const encodedKey = new TextEncoder().encode(
	secretKey || 'build-time-placeholder-key-minimum-32-chars',
);
export async function encrypt(payload: SessionPayload): Promise<string> {
	return new SignJWT(payload)
		.setProtectedHeader({
			alg: 'HS256',
		})
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey);
}
export async function decrypt(
	session: string | undefined = '',
): Promise<SessionPayload | null> {
	try {
		if (!session) return null;
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		});
		return payload as unknown as SessionPayload;
	} catch (error) {
		console.log('Failed to verify admin session:', error);
		return null;
	}
}
export function isValidSessionPayload(
	payload: unknown,
): payload is SessionPayload {
	if (!payload || typeof payload !== 'object') return false;
	const p = payload as Record<string, any>;
	return (
		typeof p.userId === 'string' &&
		p.role === 'admin' &&
		p.expiresAt &&
		new Date(p.expiresAt) > new Date()
	);
}
