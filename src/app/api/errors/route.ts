/**
 * CONTEXT7 SOURCE: /vercel/next.js - API Route handlers for error reporting
 * ERROR REPORTING REASON: Official Next.js API patterns for centralized error handling
 * 
 * Error Reporting API Endpoint
 * - Centralized error collection from React Error Boundaries
 * - Error categorization and severity assessment
 * - Integration with monitoring systems
 * - Emergency escalation for critical errors
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary error reporting interfaces
// ERROR HANDLING REASON: Official React error boundary error information structure
interface ErrorReport {
  errorId: string;
  timestamp: string;
  level: string;
  componentName: string;
  message: string;
  stack?: string;
  componentStack?: string;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId: string;
  environment: string;
  version: string;
  additionalContext?: Record<string, any>;
}

interface ErrorResponse {
  success: boolean;
  errorId: string;
  timestamp: string;
  status: 'logged' | 'escalated' | 'ignored';
  message?: string;
}

// CONTEXT7 SOURCE: /vercel/next.js - POST API route handler for error collection
// ERROR COLLECTION REASON: Official Next.js patterns for receiving and processing error reports
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const errorReport: ErrorReport = await request.json();
    
    // Validate required fields
    const validationResult = validateErrorReport(errorReport);
    if (!validationResult.isValid) {
      return NextResponse.json({
        success: false,
        errorId: errorReport.errorId || 'unknown',
        timestamp: new Date().toISOString(),
        status: 'ignored',
        message: `Invalid error report: ${validationResult.errors.join(', ')}`,
      } as ErrorResponse, { status: 400 });
    }

    // Enrich error report with server-side information
    const enrichedReport: ErrorReport = {
      ...errorReport,
      timestamp: errorReport.timestamp || new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      additionalContext: {
        ...errorReport.additionalContext,
        serverTimestamp: new Date().toISOString(),
        requestId: generateRequestId(),
      },
    };

    // Determine error severity and handling strategy
    const severity = assessErrorSeverity(enrichedReport);
    
    // Log error to storage
    await logErrorToStorage(enrichedReport, severity);
    
    // Handle critical errors with immediate escalation
    let status: 'logged' | 'escalated' | 'ignored' = 'logged';
    if (severity === 'critical') {
      await escalateCriticalError(enrichedReport);
      status = 'escalated';
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Report Received [${severity.toUpperCase()}]`);
      console.error('Error ID:', enrichedReport.errorId);
      console.error('Component:', enrichedReport.componentName);
      console.error('Message:', enrichedReport.message);
      console.error('URL:', enrichedReport.url);
      console.error('User Agent:', enrichedReport.userAgent);
      if (enrichedReport.componentStack) {
        console.error('Component Stack:', enrichedReport.componentStack);
      }
      console.groupEnd();
    }

    // Send success response
    const response: ErrorResponse = {
      success: true,
      errorId: enrichedReport.errorId,
      timestamp: enrichedReport.timestamp,
      status,
      message: severity === 'critical' ? 'Error escalated to emergency response team' : 'Error logged successfully',
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Error reporting endpoint failed:', error);
    
    const errorResponse: ErrorResponse = {
      success: false,
      errorId: 'error-endpoint-failure',
      timestamp: new Date().toISOString(),
      status: 'ignored',
      message: 'Failed to process error report',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Error report validation patterns
// VALIDATION REASON: Official React error boundary data validation requirements
function validateErrorReport(report: ErrorReport): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!report.errorId || typeof report.errorId !== 'string') {
    errors.push('errorId is required and must be a string');
  }
  
  if (!report.message || typeof report.message !== 'string') {
    errors.push('message is required and must be a string');
  }
  
  if (!report.componentName || typeof report.componentName !== 'string') {
    errors.push('componentName is required and must be a string');
  }
  
  if (!report.level || !['global', 'page', 'component'].includes(report.level)) {
    errors.push('level must be one of: global, page, component');
  }
  
  if (!report.url || typeof report.url !== 'string') {
    errors.push('url is required and must be a string');
  }
  
  if (!report.userAgent || typeof report.userAgent !== 'string') {
    errors.push('userAgent is required and must be a string');
  }
  
  if (!report.sessionId || typeof report.sessionId !== 'string') {
    errors.push('sessionId is required and must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Error severity assessment for production systems
// ERROR CLASSIFICATION REASON: Official patterns for error categorization and response
function assessErrorSeverity(report: ErrorReport): 'low' | 'medium' | 'high' | 'critical' {
  // Critical: Global errors that crash the entire application
  if (report.level === 'global') {
    return 'critical';
  }
  
  // High: Errors in critical business components
  const criticalComponents = [
    'payment',
    'booking',
    'registration',
    'authentication',
    'checkout',
    'consultation',
  ];
  
  if (criticalComponents.some(component => 
    report.componentName.toLowerCase().includes(component)
  )) {
    return 'high';
  }
  
  // High: Errors with certain keywords indicating serious problems
  const criticalKeywords = [
    'database',
    'connection',
    'timeout',
    'unauthorized',
    'payment',
    'billing',
    'security',
  ];
  
  if (criticalKeywords.some(keyword => 
    report.message.toLowerCase().includes(keyword)
  )) {
    return 'high';
  }
  
  // Medium: Page-level errors
  if (report.level === 'page') {
    return 'medium';
  }
  
  // Low: Component-level errors
  return 'low';
}

// CONTEXT7 SOURCE: /vercel/next.js - File system operations for error logging
// ERROR STORAGE REASON: Official Next.js patterns for persistent error logging
async function logErrorToStorage(report: ErrorReport, severity: string): Promise<void> {
  try {
    const logsDir = path.join(process.cwd(), 'logs', 'errors');
    
    // Ensure logs directory exists
    await mkdir(logsDir, { recursive: true });
    
    // Create dated log file
    const today = new Date().toISOString().split('T')[0];
    const logFileName = `errors-${today}.jsonl`;
    const logFilePath = path.join(logsDir, logFileName);
    
    // Create log entry
    const logEntry = {
      ...report,
      severity,
      processedAt: new Date().toISOString(),
    };
    
    // Append to log file (JSON Lines format)
    const logLine = JSON.stringify(logEntry) + '\n';
    await writeFile(logFilePath, logLine, { flag: 'a' });
    
  } catch (error) {
    console.error('Failed to write error log:', error);
    // Don't throw - we don't want error logging to cause more errors
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Critical error escalation patterns
// ESCALATION REASON: Official patterns for emergency response to critical application errors
async function escalateCriticalError(report: ErrorReport): Promise<void> {
  try {
    const alertMessage = `🚨 CRITICAL ERROR DETECTED - My Private Tutor Online

Error Details:
- Error ID: ${report.errorId}
- Component: ${report.componentName}
- Message: ${report.message}
- URL: ${report.url}
- Timestamp: ${report.timestamp}
- User Agent: ${report.userAgent}
- Session: ${report.sessionId}

This is a GLOBAL error that has crashed the application for users.
Immediate attention required to maintain royal client service standards.

Error Stack:
${report.stack || 'No stack trace available'}

Component Stack:
${report.componentStack || 'No component stack available'}`;

    // Send immediate alerts via multiple channels
    await Promise.allSettled([
      sendSlackAlert(alertMessage),
      sendEmailAlert(alertMessage),
      sendWebhookAlert(alertMessage),
    ]);
    
    console.error('Critical error escalated:', report.errorId);
    
  } catch (error) {
    console.error('Failed to escalate critical error:', error);
  }
}

async function sendSlackAlert(message: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: message,
        username: 'Error Reporter',
        icon_emoji: ':rotating_light:',
      }),
    });
  } catch (error) {
    console.error('Slack alert failed:', error);
  }
}

async function sendEmailAlert(message: string): Promise<void> {
  const alertEmails = process.env.ALERT_EMAILS?.split(',') || [];
  if (alertEmails.length === 0) return;
  
  // In production, integrate with email service (SendGrid, AWS SES, etc.)
  console.log('Email alert would be sent to:', alertEmails, message);
}

async function sendWebhookAlert(message: string): Promise<void> {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: 'critical',
        service: 'my-private-tutor-online',
        message,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Webhook alert failed:', error);
  }
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

// CONTEXT7 SOURCE: /vercel/next.js - GET endpoint for error statistics
// ERROR ANALYTICS REASON: Official Next.js patterns for error monitoring and analytics
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // This endpoint could provide error statistics for monitoring dashboard
    // For now, return basic information
    
    const errorStats = {
      endpoint: '/api/errors',
      status: 'operational',
      timestamp: new Date().toISOString(),
      description: 'Error reporting endpoint for React Error Boundaries',
      version: process.env.npm_package_version || '1.0.0',
    };

    return NextResponse.json(errorStats, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to get error endpoint status' 
    }, { status: 500 });
  }
}