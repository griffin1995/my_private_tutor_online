import { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
interface ConversionEventData {
	eventType: string;
	eventCategory: string;
	value?: number;
	currency?: string;
	sessionId?: string;
	userId?: string;
	metadata?: Record<string, any>;
}
export async function POST(request: NextRequest) {
	try {
		const eventData: ConversionEventData = await request.json();
		const headersList = await headers();
		const cookieStore = await cookies();
		const userAgent = headersList.get('user-agent') || 'unknown';
		const sessionCookie = cookieStore.get('session-id')?.value || 'anonymous';
		const referer = headersList.get('referer') || '';
		const enrichedEventData = {
			...eventData,
			timestamp: new Date().toISOString(),
			userAgent,
			sessionId: sessionCookie,
			referer,
			ip: request.ip || 'unknown',
		};
		console.log(
			'[ANALYTICS] Conversion Event:',
			JSON.stringify(enrichedEventData, null, 2),
		);
		return NextResponse.json(
			{
				success: true,
				message: 'Conversion event tracked successfully',
				eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error('[ANALYTICS] Error tracking conversion event:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to track conversion event',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{
				status: 500,
			},
		);
	}
}
export async function GET() {
	return NextResponse.json({
		success: true,
		message: 'Conversion events analytics endpoint is operational',
		timestamp: new Date().toISOString(),
	});
}
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
}
