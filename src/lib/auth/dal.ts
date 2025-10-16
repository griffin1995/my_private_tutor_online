import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt, isValidSessionPayload, SessionPayload } from './session';
export interface VerifiedSession {
	isAuth: true;
	userId: string;
	role: 'admin';
	expiresAt: Date;
}
export async function createSession(userId: string): Promise<void> {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const sessionPayload: SessionPayload = {
		userId,
		role: 'admin',
		expiresAt,
	};
	const { encrypt } = await import('./session');
	const sessionToken = await encrypt(sessionPayload);
	const cookieStore = await cookies();
	cookieStore.set('admin_session', sessionToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		expires: expiresAt,
	});
}
export async function updateSession(): Promise<void> {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get('admin_session')?.value;
	if (!sessionCookie) return;
	const payload = await decrypt(sessionCookie);
	if (!payload || !isValidSessionPayload(payload)) return;
	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const updatedPayload: SessionPayload = {
		...payload,
		expiresAt: expires,
	};
	const { encrypt } = await import('./session');
	const newSessionToken = await encrypt(updatedPayload);
	cookieStore.set('admin_session', newSessionToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		expires,
	});
}
export async function deleteSession(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete('admin_session');
	cookieStore.set('admin_session', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		expires: new Date(0),
	});
}
export const verifySession = cache(async (): Promise<VerifiedSession> => {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get('admin_session')?.value;
	if (!sessionCookie) {
		console.warn('Admin session verification failed: No session cookie');
		redirect('/admin/login');
	}
	const session = await decrypt(sessionCookie);
	if (!session || !isValidSessionPayload(session)) {
		console.warn('Admin session verification failed: Invalid session payload');
		redirect('/admin/login');
	}
	if (session.role !== 'admin') {
		console.warn('Admin session verification failed: Invalid role');
		redirect('/admin/login');
	}
	if (new Date(session.expiresAt) <= new Date()) {
		console.warn('Admin session verification failed: Session expired');
		await deleteSession();
		redirect('/admin/login');
	}
	return {
		isAuth: true,
		userId: session.userId,
		role: session.role,
		expiresAt: session.expiresAt,
	};
});
export const getOptionalSession = cache(
	async (): Promise<VerifiedSession | null> => {
		try {
			const cookieStore = await cookies();
			const sessionCookie = cookieStore.get('admin_session')?.value;
			if (!sessionCookie) return null;
			const session = await decrypt(sessionCookie);
			if (!session || !isValidSessionPayload(session)) return null;
			if (session.role !== 'admin') return null;
			if (new Date(session.expiresAt) <= new Date()) {
				await deleteSession();
				return null;
			}
			return {
				isAuth: true,
				userId: session.userId,
				role: session.role,
				expiresAt: session.expiresAt,
			};
		} catch (error) {
			console.error('Optional session verification error:', error);
			return null;
		}
	},
);
export const isAdmin = cache(async (): Promise<boolean> => {
	try {
		const session = await getOptionalSession();
		return session?.role === 'admin' || false;
	} catch {
		return false;
	}
});
