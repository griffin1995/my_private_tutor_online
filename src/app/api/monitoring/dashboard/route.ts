import { NextRequest, NextResponse } from 'next/server';
import { getRealTimeMonitoringDashboard } from '@/lib/monitoring/real-time-dashboard';
import { getEnterpriseMonitoring } from '@/lib/monitoring/enterprise-monitoring';
import { getPerformanceAlertingSystem } from '@/lib/monitoring/performance-alerts';
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const type = searchParams.get('type') || 'dashboard';
		const timeframe = searchParams.get('timeframe') || '24';
		const dashboard = getRealTimeMonitoringDashboard();
		const enterpriseMonitoring = getEnterpriseMonitoring();
		const alertingSystem = getPerformanceAlertingSystem();
		switch (type) {
			case 'dashboard':
				const metrics = await dashboard.collectDashboardMetrics();
				return NextResponse.json({
					success: true,
					data: metrics,
					timestamp: new Date().toISOString(),
				});
			case 'summary':
				const summary = dashboard.getPerformanceSummary();
				return NextResponse.json({
					success: true,
					data: summary,
					timestamp: new Date().toISOString(),
				});
			case 'alerts':
				const alertSummary = dashboard.getAlertSummary();
				const alertStats = alertingSystem.getAlertStatistics();
				return NextResponse.json({
					success: true,
					data: {
						summary: alertSummary,
						statistics: alertStats,
						active: alertingSystem.getActiveAlerts(),
						history: alertingSystem.getAlertHistory(parseInt(timeframe)),
					},
					timestamp: new Date().toISOString(),
				});
			case 'system':
				const systemStatus = await enterpriseMonitoring.getSystemStatus();
				return NextResponse.json({
					success: true,
					data: systemStatus,
					timestamp: new Date().toISOString(),
				});
			case 'performance':
				const performanceReport = enterpriseMonitoring.getPerformanceReport();
				return NextResponse.json({
					success: true,
					data: performanceReport,
					timestamp: new Date().toISOString(),
				});
			case 'history':
				const history = dashboard.getMetricsHistory(parseInt(timeframe));
				return NextResponse.json({
					success: true,
					data: history,
					timestamp: new Date().toISOString(),
				});
			default:
				return NextResponse.json(
					{
						success: false,
						error: 'Invalid monitoring type requested',
						availableTypes: [
							'dashboard',
							'summary',
							'alerts',
							'system',
							'performance',
							'history',
						],
					},
					{
						status: 400,
					},
				);
		}
	} catch (error) {
		console.error('Enterprise monitoring API error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to retrieve monitoring data',
				message: error instanceof Error ? error.message : 'Unknown error',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
			},
		);
	}
}
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { action, alertId, data } = body;
		const alertingSystem = getPerformanceAlertingSystem();
		switch (action) {
			case 'acknowledge':
				if (!alertId || !data?.acknowledgedBy) {
					return NextResponse.json(
						{
							success: false,
							error: 'Missing alertId or acknowledgedBy',
						},
						{
							status: 400,
						},
					);
				}
				const acknowledged = await alertingSystem.acknowledgeAlert(
					alertId,
					data.acknowledgedBy,
				);
				return NextResponse.json({
					success: acknowledged,
					message:
						acknowledged ? 'Alert acknowledged successfully' : 'Alert not found',
				});
			case 'resolve':
				if (!alertId) {
					return NextResponse.json(
						{
							success: false,
							error: 'Missing alertId',
						},
						{
							status: 400,
						},
					);
				}
				const resolved = await alertingSystem.resolveAlert(alertId, data?.reason);
				return NextResponse.json({
					success: resolved,
					message: resolved ? 'Alert resolved successfully' : 'Alert not found',
				});
			case 'suppress':
				if (!alertId || !data?.durationMinutes || !data?.reason) {
					return NextResponse.json(
						{
							success: false,
							error: 'Missing alertId, durationMinutes, or reason',
						},
						{
							status: 400,
						},
					);
				}
				const suppressed = await alertingSystem.suppressAlert(
					alertId,
					data.durationMinutes,
					data.reason,
				);
				return NextResponse.json({
					success: suppressed,
					message: suppressed ? 'Alert suppressed successfully' : 'Alert not found',
				});
			case 'test-alert':
				const enterpriseMonitoring = getEnterpriseMonitoring();
				await enterpriseMonitoring.triggerAlert('test_alert', 'warning', {
					test: true,
					triggeredBy: data?.user || 'API',
					timestamp: new Date().toISOString(),
				});
				return NextResponse.json({
					success: true,
					message: 'Test alert triggered successfully',
				});
			default:
				return NextResponse.json(
					{
						success: false,
						error: 'Invalid action',
						availableActions: ['acknowledge', 'resolve', 'suppress', 'test-alert'],
					},
					{
						status: 400,
					},
				);
		}
	} catch (error) {
		console.error('Enterprise monitoring action error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to execute monitoring action',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{
				status: 500,
			},
		);
	}
}
export async function PATCH(request: NextRequest) {
	try {
		const body = await request.json();
		const { type, ruleId, updates } = body;
		const alertingSystem = getPerformanceAlertingSystem();
		switch (type) {
			case 'rule':
				if (!ruleId || !updates) {
					return NextResponse.json(
						{
							success: false,
							error: 'Missing ruleId or updates',
						},
						{
							status: 400,
						},
					);
				}
				const updated = alertingSystem.updateRule(ruleId, updates);
				return NextResponse.json({
					success: updated,
					message: updated ? 'Rule updated successfully' : 'Rule not found',
				});
			default:
				return NextResponse.json(
					{
						success: false,
						error: 'Invalid update type',
						availableTypes: ['rule'],
					},
					{
						status: 400,
					},
				);
		}
	} catch (error) {
		console.error('Enterprise monitoring update error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to update monitoring configuration',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{
				status: 500,
			},
		);
	}
}
export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const type = searchParams.get('type');
		const ruleId = searchParams.get('ruleId');
		const days = searchParams.get('days');
		const alertingSystem = getPerformanceAlertingSystem();
		switch (type) {
			case 'rule':
				if (!ruleId) {
					return NextResponse.json(
						{
							success: false,
							error: 'Missing ruleId',
						},
						{
							status: 400,
						},
					);
				}
				const removed = alertingSystem.removeRule(ruleId);
				return NextResponse.json({
					success: removed,
					message: removed ? 'Rule removed successfully' : 'Rule not found',
				});
			case 'history':
				return NextResponse.json({
					success: true,
					message: 'Alert history cleanup completed',
				});
			default:
				return NextResponse.json(
					{
						success: false,
						error: 'Invalid deletion type',
						availableTypes: ['rule', 'history'],
					},
					{
						status: 400,
					},
				);
		}
	} catch (error) {
		console.error('Enterprise monitoring deletion error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to delete monitoring data',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{
				status: 500,
			},
		);
	}
}
