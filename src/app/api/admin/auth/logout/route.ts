import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(request: NextRequest) {
	try {
		const clientIP =
			request.headers.get('x-forwarded-for')?.split(',')[0] ||
			request.headers.get('x-real-ip') ||
			'unknown';
		const cookieStore = await cookies();
		const existingSession = cookieStore.get('admin_session');
		if (existingSession) {
			console.log(`Admin logout from IP: ${clientIP}`);
			cookieStore.delete('admin_session');
			cookieStore.set('admin_session', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				path: '/',
				expires: new Date(0),
			});
		}
		return NextResponse.json(
			{
				success: true,
				message: 'Logout successful',
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error('Admin logout API error:', error);
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
			error: 'Method not allowed. Use POST for logout.',
		},
		{
			status: 405,
		},
	);
}
export async function PUT() {
	return NextResponse.json(
		{
			error: 'Method not allowed. Use POST for logout.',
		},
		{
			status: 405,
		},
	);
}
export async function DELETE() {
	return NextResponse.json(
		{
			error: 'Method not allowed. Use POST for logout.',
		},
		{
			status: 405,
		},
	);
}
