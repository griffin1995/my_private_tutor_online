import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';
const mockSecurityEvents = [
	{
		id: '1',
		type: 'rate_limit' as const,
		severity: 'medium' as const,
		timestamp: new Date(Date.now() - 3600000).toISOString(),
		clientIp: '192.168.1.100',
		path: '/api/contact',
		details: {
			requests: 62,
			limit: 60,
		},
	},
	{
		id: '2',
		type: 'auth_failure' as const,
		severity: 'high' as const,
		timestamp: new Date(Date.now() - 7200000).toISOString(),
		clientIp: '10.0.0.50',
		path: '/admin/login',
		details: {
			attempts: 5,
		},
	},
	{
		id: '3',
		type: 'suspicious_input' as const,
		severity: 'high' as const,
		timestamp: new Date(Date.now() - 10800000).toISOString(),
		clientIp: '172.16.0.25',
		path: '/api/contact',
		details: {
			pattern: 'script tag detected',
		},
	},
];
export async function GET(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		const sessionCookie = cookieStore.get('admin_session')?.value;
		const session = await decrypt(sessionCookie);
		if (!session || session.role !== 'admin') {
			return NextResponse.json(
				{
					error: 'Unauthorised',
				},
				{
					status: 401,
				},
			);
		}
		const timeRange = request.nextUrl.searchParams.get('range') || '24h';
		const severity = request.nextUrl.searchParams.get('severity');
		let events = [...mockSecurityEvents];
		if (severity) {
			events = events.filter((e) => e.severity === severity);
		}
		events.sort(
			(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
		);
		return NextResponse.json({
			events: events.slice(0, 50),
			total: events.length,
			timeRange,
		});
	} catch (error) {
		console.error('[Security Events API Error]', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch security events',
			},
			{
				status: 500,
			},
		);
	}
}
