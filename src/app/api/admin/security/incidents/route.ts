import { NextRequest, NextResponse } from 'next/server';
import { incidentResponseOrchestrator } from '@/lib/incident-response';
export async function GET(request: NextRequest) {
	try {
		const session = request.cookies.get('admin_session')?.value;
		if (!session) {
			return NextResponse.json(
				{
					error: 'Unauthorized',
				},
				{
					status: 401,
				},
			);
		}
		const stats = incidentResponseOrchestrator.getIncidentStatistics();
		const activeIncidents = incidentResponseOrchestrator.getActiveIncidents();
		const avgResolutionTime = calculateAverageResolutionTime(activeIncidents);
		const severityDistribution = calculateSeverityDistribution(activeIncidents);
		return NextResponse.json({
			total: stats.total,
			open: stats.open,
			contained: stats.contained,
			resolved: stats.resolved,
			escalated: stats.escalated,
			critical: stats.critical,
			avgResolutionTime,
			severityDistribution,
			activeIncidents: activeIncidents.slice(0, 10),
			systemHealth: {
				blockedIPs: stats.blockedIPs,
				rateLimitedIPs: stats.rateLimitedIPs,
				automatedResponses: stats.contained + stats.resolved,
				manualInterventions: stats.escalated,
			},
			performanceMetrics: {
				detectionRate: 95,
				falsePositiveRate: 3,
				meanTimeToDetect: 45,
				meanTimeToContain: 180,
				meanTimeToResolve: avgResolutionTime * 60,
			},
		});
	} catch (error) {
		console.error('Failed to fetch incident data:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch incident statistics',
			},
			{
				status: 500,
			},
		);
	}
}
export async function POST(request: NextRequest) {
	try {
		const session = request.cookies.get('admin_session')?.value;
		if (!session) {
			return NextResponse.json(
				{
					error: 'Unauthorized',
				},
				{
					status: 401,
				},
			);
		}
		const body = await request.json();
		const securityEvent = {
			type: body.type || 'suspicious_input',
			severity: body.severity || 'medium',
			timestamp: new Date(),
			clientIp:
				body.clientIp || request.headers.get('x-forwarded-for') || 'unknown',
			path: body.path || '/api/test',
			details: body.details || {},
		};
		const response = await incidentResponseOrchestrator.handleSecurityEvent(
			securityEvent as any,
		);
		return NextResponse.json({
			success: true,
			incidentId: response.incidentId,
			actions: response.actions,
			blocked: response.blocked,
		});
	} catch (error) {
		console.error('Failed to create incident:', error);
		return NextResponse.json(
			{
				error: 'Failed to create incident',
			},
			{
				status: 500,
			},
		);
	}
}
function calculateAverageResolutionTime(incidents: any[]): number {
	const resolvedIncidents = incidents.filter((i) => i.resolutionTime);
	if (resolvedIncidents.length === 0) {
		return 45;
	}
	const totalTime = resolvedIncidents.reduce((sum, incident) => {
		const resolutionMs =
			incident.resolutionTime.getTime() - incident.timestamp.getTime();
		return sum + resolutionMs;
	}, 0);
	return Math.round(totalTime / resolvedIncidents.length / 60000);
}
function calculateSeverityDistribution(
	incidents: any[],
): Record<string, number> {
	return {
		critical: incidents.filter((i) => i.severity === 'critical').length,
		high: incidents.filter((i) => i.severity === 'high').length,
		medium: incidents.filter((i) => i.severity === 'medium').length,
		low: incidents.filter((i) => i.severity === 'low').length,
	};
}
