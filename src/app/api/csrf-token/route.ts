import { NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/security/csrf';
export async function GET() {
	try {
		const token = await generateCSRFToken();
		const response = NextResponse.json({
			token,
			expiresIn: 3600,
		});
		response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
		response.headers.set('Pragma', 'no-cache');
		return response;
	} catch (error) {
		console.error('[CSRF Token Generation Error]', error);
		return NextResponse.json(
			{
				error: 'Failed to generate security token',
			},
			{
				status: 500,
			},
		);
	}
}
