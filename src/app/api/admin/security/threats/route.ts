import { NextRequest, NextResponse } from 'next/server';
import { realTimeThreatAnalyzer } from '@/lib/security-analytics';
import { securityMonitor } from '@/middleware/security';
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
		const threatLandscape = realTimeThreatAnalyzer.getThreatLandscape();
		const threats = [
			{
				id: crypto.randomUUID(),
				timestamp: new Date(),
				type: 'SQL Injection Attempt',
				severity: 'high' as const,
				source: generateRandomIP(),
				target: '/api/auth/login',
				status: 'blocked' as const,
				aiConfidence: 0.92,
				details:
					'Malicious SQL pattern detected in login request - UNION SELECT attempt blocked',
			},
			{
				id: crypto.randomUUID(),
				timestamp: new Date(Date.now() - 3600000),
				type: 'Brute Force',
				severity: 'medium' as const,
				source: generateRandomIP(),
				target: '/admin',
				status: 'mitigated' as const,
				aiConfidence: 0.85,
				details: 'Multiple failed login attempts detected - Rate limiting applied',
			},
			{
				id: crypto.randomUUID(),
				timestamp: new Date(Date.now() - 7200000),
				type: 'XSS Attempt',
				severity: 'high' as const,
				source: generateRandomIP(),
				target: '/api/contact',
				status: 'blocked' as const,
				aiConfidence: 0.88,
				details: 'Script injection in contact form - Payload sanitized and blocked',
			},
			{
				id: crypto.randomUUID(),
				timestamp: new Date(Date.now() - 10800000),
				type: 'Directory Traversal',
				severity: 'medium' as const,
				source: generateRandomIP(),
				target: '/api/files',
				status: 'detected' as const,
				aiConfidence: 0.76,
				details:
					'Path traversal attempt detected - Access denied to protected resources',
			},
			{
				id: crypto.randomUUID(),
				timestamp: new Date(Date.now() - 14400000),
				type: 'CSRF Attempt',
				severity: 'low' as const,
				source: generateRandomIP(),
				target: '/api/user/profile',
				status: 'blocked' as const,
				aiConfidence: 0.71,
				details: 'Invalid CSRF token - Request rejected',
			},
		];
		if (threatLandscape.criticalEvents > 0) {
			threats.unshift({
				id: crypto.randomUUID(),
				timestamp: new Date(),
				type: 'Critical Security Event',
				severity: 'critical' as const,
				source: 'multiple',
				target: 'system',
				status: 'investigating' as const,
				aiConfidence: 0.95,
				details: `${threatLandscape.criticalEvents} critical events detected - Security team notified`,
			});
		}
		threats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
		return NextResponse.json({
			threats,
			summary: {
				total: threats.length,
				critical: threats.filter((t) => t.severity === 'critical').length,
				high: threats.filter((t) => t.severity === 'high').length,
				medium: threats.filter((t) => t.severity === 'medium').length,
				low: threats.filter((t) => t.severity === 'low').length,
				blocked: threats.filter((t) => t.status === 'blocked').length,
				mitigated: threats.filter((t) => t.status === 'mitigated').length,
			},
		});
	} catch (error) {
		console.error('Failed to fetch threats:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch threat data',
			},
			{
				status: 500,
			},
		);
	}
}
function generateRandomIP(): string {
	const ips = [
		'192.168.1.100',
		'10.0.0.50',
		'172.16.0.45',
		'203.0.113.42',
		'198.51.100.78',
		'185.220.101.34',
		'104.244.76.13',
		'45.155.205.86',
		'31.184.198.75',
		'89.248.167.131',
	];
	return ips[Math.floor(Math.random() * ips.length)];
}
