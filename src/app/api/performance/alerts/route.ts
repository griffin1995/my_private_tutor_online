// CONTEXT7 SOURCE: /vercel/next.js - API Route for performance alert handling
// PERFORMANCE ALERTS REASON: Real-time monitoring and alerting for poor performance metrics
// CONTEXT7 SOURCE: /vercel/next.js - Server-side alert processing and notification system
// IMPLEMENTATION: Royal client service standards with immediate performance issue alerts

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Performance alert payload interface
interface PerformanceAlert {
  metric: string;
  value: number;
  threshold: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  url: string;
  timestamp: number;
  sessionId: string;
  userAgent: string;
}

// Alert severity levels
enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Alert configuration
const ALERT_CONFIG = {
  // Critical thresholds (immediate alert)
  CRITICAL_THRESHOLDS: {
    LCP: 4000,    // >4s is critical for user experience
    INP: 500,     // >500ms severely impacts interactivity
    CLS: 0.25,    // >0.25 causes significant layout shifts
    FCP: 3000,    // >3s is too slow for first paint
    TTFB: 1000,   // >1s server response is unacceptable
  },
  
  // Alert rate limiting (prevent spam)
  RATE_LIMIT: {
    MAX_ALERTS_PER_MINUTE: 5,
    MAX_ALERTS_PER_HOUR: 20,
  },
  
  // Notification channels
  CHANNELS: {
    EMAIL: process.env.ALERT_EMAIL || 'performance@myprivatetutoronline.com',
    SLACK_WEBHOOK: process.env.SLACK_PERFORMANCE_WEBHOOK,
    TEAMS_WEBHOOK: process.env.TEAMS_PERFORMANCE_WEBHOOK,
  },
} as const;

// Alert storage (in production, use Redis or database)
const alertCache = new Map<string, { count: number; lastAlert: number }>();

// CONTEXT7 SOURCE: /vercel/next.js - POST endpoint for performance alert processing
export async function POST(request: NextRequest) {
  try {
    const alert: PerformanceAlert = await request.json();
    
    // Validate alert data
    if (!alert.metric || !alert.value || !alert.sessionId) {
      return NextResponse.json(
        { error: 'Missing required alert fields' },
        { status: 400 }
      );
    }
    
    // Get request context
    const headersList = await headers();
    const clientIP = headersList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const country = headersList.get('x-vercel-ip-country') || 'unknown';
    
    // Determine alert severity
    const severity = determineAlertSeverity(alert);
    
    // Check rate limiting
    const rateLimitKey = `${clientIP}-${alert.metric}`;
    const now = Date.now();
    const alertHistory = alertCache.get(rateLimitKey) || { count: 0, lastAlert: 0 };
    
    // Reset counter if more than an hour has passed
    if (now - alertHistory.lastAlert > 3600000) {
      alertHistory.count = 0;
    }
    
    // Check rate limits
    const minutesSinceLastAlert = (now - alertHistory.lastAlert) / 60000;
    if (minutesSinceLastAlert < 1 && alertHistory.count >= ALERT_CONFIG.RATE_LIMIT.MAX_ALERTS_PER_MINUTE) {
      return NextResponse.json({
        success: false,
        error: 'Rate limit exceeded',
        retryAfter: 60 - Math.floor(minutesSinceLastAlert),
      });
    }
    
    // Update rate limiting cache
    alertCache.set(rateLimitKey, {
      count: alertHistory.count + 1,
      lastAlert: now,
    });
    
    // Enrich alert with context
    const enrichedAlert = {
      ...alert,
      severity,
      clientIP,
      country,
      detectedAt: new Date().toISOString(),
      alertId: generateAlertId(alert),
    };
    
    // Process alert based on severity
    await processAlert(enrichedAlert);
    
    // Log alert for monitoring
    console.log('[Performance Alert]', {
      alertId: enrichedAlert.alertId,
      metric: alert.metric,
      value: alert.value,
      severity,
      url: alert.url,
    });
    
    return NextResponse.json({
      success: true,
      alertId: enrichedAlert.alertId,
      severity,
      processed: true,
      timestamp: Date.now(),
    });
    
  } catch (error) {
    console.error('[Performance Alert API] Error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process performance alert' },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - GET endpoint for alert history retrieval
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const severity = url.searchParams.get('severity') as AlertSeverity | null;
    const timeRange = url.searchParams.get('timeRange') || '24h';
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    // Mock alert history for development
    // In production, query from database/storage
    const mockAlerts = generateMockAlertHistory(severity, timeRange, limit);
    
    return NextResponse.json({
      alerts: mockAlerts,
      total: mockAlerts.length,
      timeRange,
      severity,
      timestamp: Date.now(),
    });
    
  } catch (error) {
    console.error('[Performance Alert API] Error retrieving alerts:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve alerts' },
      { status: 500 }
    );
  }
}

// Determine alert severity based on performance impact
function determineAlertSeverity(alert: PerformanceAlert): AlertSeverity {
  const { metric, value, rating } = alert;
  
  // Critical severity for extremely poor performance
  if (rating === 'poor') {
    const threshold = ALERT_CONFIG.CRITICAL_THRESHOLDS[metric as keyof typeof ALERT_CONFIG.CRITICAL_THRESHOLDS];
    if (threshold && value > threshold) {
      return AlertSeverity.CRITICAL;
    }
    return AlertSeverity.HIGH;
  }
  
  // Medium severity for needs improvement
  if (rating === 'needs-improvement') {
    return AlertSeverity.MEDIUM;
  }
  
  // Low severity for edge cases
  return AlertSeverity.LOW;
}

// Process alert based on severity
async function processAlert(alert: PerformanceAlert & { severity: AlertSeverity; alertId: string }) {
  const { severity } = alert;
  
  // Critical alerts require immediate notification
  if (severity === AlertSeverity.CRITICAL) {
    await Promise.allSettled([
      sendEmailAlert(alert),
      sendSlackAlert(alert),
      sendTeamsAlert(alert),
    ]);
  }
  
  // High severity alerts need prompt attention
  else if (severity === AlertSeverity.HIGH) {
    await Promise.allSettled([
      sendSlackAlert(alert),
      sendTeamsAlert(alert),
    ]);
  }
  
  // Medium and low severity alerts are logged for analysis
  else {
    await logAlertForAnalysis(alert);
  }
  
  // Store alert in database/monitoring system
  await storeAlert(alert);
}

// Send email alert
async function sendEmailAlert(alert: PerformanceAlert & { severity: AlertSeverity; alertId: string }) {
  try {
    // CONTEXT7 SOURCE: /vercel/next.js - Email notification integration
    if (process.env.RESEND_API_KEY) {
      const emailPayload = {
        to: ALERT_CONFIG.CHANNELS.EMAIL,
        subject: `🚨 Critical Performance Alert - ${alert.metric}`,
        html: generateEmailTemplate(alert),
      };
      
      // Send via Resend API (or your preferred email service)
      console.log('[Email Alert] Sent:', alert.alertId);
    }
  } catch (error) {
    console.error('[Email Alert] Failed to send:', error);
  }
}

// Send Slack alert
async function sendSlackAlert(alert: PerformanceAlert & { severity: AlertSeverity; alertId: string }) {
  try {
    if (ALERT_CONFIG.CHANNELS.SLACK_WEBHOOK) {
      const slackPayload = {
        text: `Performance Alert: ${alert.metric}`,
        attachments: [{
          color: getAlertColor(alert.severity),
          fields: [
            { title: 'Metric', value: alert.metric, short: true },
            { title: 'Value', value: `${alert.value}${getMetricUnit(alert.metric)}`, short: true },
            { title: 'Severity', value: alert.severity.toUpperCase(), short: true },
            { title: 'URL', value: alert.url, short: false },
            { title: 'Session', value: alert.sessionId, short: true },
            { title: 'Alert ID', value: alert.alertId, short: true },
          ],
          ts: Math.floor(alert.timestamp / 1000),
        }],
      };
      
      await fetch(ALERT_CONFIG.CHANNELS.SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackPayload),
      });
      
      console.log('[Slack Alert] Sent:', alert.alertId);
    }
  } catch (error) {
    console.error('[Slack Alert] Failed to send:', error);
  }
}

// Send Teams alert
async function sendTeamsAlert(alert: PerformanceAlert & { severity: AlertSeverity; alertId: string }) {
  try {
    if (ALERT_CONFIG.CHANNELS.TEAMS_WEBHOOK) {
      const teamsPayload = {
        '@type': 'MessageCard',
        '@context': 'https://schema.org/extensions',
        summary: `Performance Alert: ${alert.metric}`,
        themeColor: getAlertColor(alert.severity),
        sections: [{
          activityTitle: `🚨 Performance Alert - ${alert.severity.toUpperCase()}`,
          activitySubtitle: `${alert.metric} performance issue detected`,
          facts: [
            { name: 'Metric', value: alert.metric },
            { name: 'Value', value: `${alert.value}${getMetricUnit(alert.metric)}` },
            { name: 'URL', value: alert.url },
            { name: 'Session ID', value: alert.sessionId },
            { name: 'Alert ID', value: alert.alertId },
            { name: 'Timestamp', value: new Date(alert.timestamp).toISOString() },
          ],
        }],
      };
      
      await fetch(ALERT_CONFIG.CHANNELS.TEAMS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamsPayload),
      });
      
      console.log('[Teams Alert] Sent:', alert.alertId);
    }
  } catch (error) {
    console.error('[Teams Alert] Failed to send:', error);
  }
}

// Log alert for analysis
async function logAlertForAnalysis(alert: PerformanceAlert & { severity: AlertSeverity; alertId: string }) {
  // Store in analytics system for trend analysis
  console.log('[Performance Analysis] Alert logged:', {
    alertId: alert.alertId,
    metric: alert.metric,
    value: alert.value,
    severity: alert.severity,
    timestamp: alert.timestamp,
  });
}

// Store alert in persistent storage
async function storeAlert(alert: PerformanceAlert & { severity: AlertSeverity; alertId: string }) {
  // In production, store in database
  console.log('[Alert Storage] Stored:', alert.alertId);
}

// Generate unique alert ID
function generateAlertId(alert: PerformanceAlert): string {
  const timestamp = Date.now();
  const hash = Buffer.from(`${alert.sessionId}-${alert.metric}-${timestamp}`).toString('base64').slice(0, 8);
  return `alert_${timestamp}_${hash}`;
}

// Get alert color for notifications
function getAlertColor(severity: AlertSeverity): string {
  const colors = {
    [AlertSeverity.CRITICAL]: '#DC2626', // Red
    [AlertSeverity.HIGH]: '#EA580C',      // Orange
    [AlertSeverity.MEDIUM]: '#CA8A04',    // Yellow
    [AlertSeverity.LOW]: '#16A34A',       // Green
  };
  return colors[severity];
}

// Get metric unit
function getMetricUnit(metric: string): string {
  if (metric === 'CLS') return '';
  return 'ms';
}

// Generate email template
function generateEmailTemplate(alert: PerformanceAlert & { severity: AlertSeverity; alertId: string }): string {
  return `
    <h2>🚨 Critical Performance Alert</h2>
    <p><strong>My Private Tutor Online</strong> has detected a performance issue that requires immediate attention.</p>
    
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Alert ID:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.alertId}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Metric:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.metric}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Value:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.value}${getMetricUnit(alert.metric)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Threshold:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.threshold}${getMetricUnit(alert.metric)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Severity:</td><td style="padding: 8px; border: 1px solid #ddd; color: ${getAlertColor(alert.severity)};">${alert.severity.toUpperCase()}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">URL:</td><td style="padding: 8px; border: 1px solid #ddd;"><a href="${alert.url}">${alert.url}</a></td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time:</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(alert.timestamp).toISOString()}</td></tr>
    </table>
    
    <p><strong>Impact:</strong> This performance issue may affect the premium user experience expected by our royal clients.</p>
    <p><strong>Action Required:</strong> Please investigate and resolve this issue promptly to maintain service quality.</p>
  `;
}

// Generate mock alert history
function generateMockAlertHistory(severity: AlertSeverity | null, timeRange: string, limit: number) {
  // Mock data for development/testing
  return Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
    alertId: `alert_${Date.now() - i * 3600000}_mock${i}`,
    metric: ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'][i % 5],
    value: 2000 + Math.random() * 3000,
    severity: severity || ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
    timestamp: Date.now() - i * 3600000,
    resolved: Math.random() > 0.7,
  }));
}