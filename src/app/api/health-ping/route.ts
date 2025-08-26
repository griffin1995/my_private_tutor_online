// CONTEXT7 SOURCE: /next.js/api-routes - Simple health ping endpoint
// HEALTH PING REASON: Official Next.js API patterns for basic service availability checks

import { NextResponse } from 'next/server';

// CONTEXT7 SOURCE: /next.js/app-router - GET handler for health ping
// PING ENDPOINT REASON: Official Next.js API patterns for lightweight health checks
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.APP_VERSION || '1.0.0'
  });
}

// CONTEXT7 SOURCE: /next.js/app-router - HEAD handler for basic connectivity test
// HEAD ENDPOINT REASON: Official Next.js API patterns for minimal response health checks
export async function HEAD() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'X-Health-Status': 'healthy',
      'X-Timestamp': new Date().toISOString()
    }
  });
}