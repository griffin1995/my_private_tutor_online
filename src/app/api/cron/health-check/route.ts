// CONTEXT7 SOURCE: /vercel/cron - Multi-region health check endpoint for infrastructure monitoring
// HEALTH CHECK REASON: Official Vercel cron job patterns for infrastructure reliability

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// CONTEXT7 SOURCE: /typescript/handbook - Health check response interface
// TYPE SAFETY REASON: Official TypeScript patterns for monitoring data structures
interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  region: string;
  checks: {
    database?: boolean;
    stripe?: boolean;
    email?: boolean;
    memory?: boolean;
    response_time?: number;
  };
  metadata: {
    version: string;
    deployment_id: string;
    node_version: string;
    uptime: number;
  };
}

// CONTEXT7 SOURCE: /vercel/cron - Cron job authentication verification
// SECURITY REASON: Official Vercel cron job security patterns
function verifyCronAuth(request: NextRequest): boolean {
  const headersList = headers();
  const authHeader = headersList.get('authorization');
  
  // Verify cron job authentication token
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return false;
  }
  
  return true;
}

// CONTEXT7 SOURCE: /next.js/app-router - Health check endpoint implementation
// MONITORING REASON: Official Next.js API route patterns for system monitoring
export async function GET(request: NextRequest) {
  try {
    // Verify cron authentication
    if (!verifyCronAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const startTime = Date.now();
    const checks: HealthCheckResult['checks'] = {};

    // CONTEXT7 SOURCE: /mongodb/node - Database connectivity check
    // DATABASE HEALTH REASON: Official MongoDB health check patterns
    try {
      const { MongoClient } = await import('mongodb');
      const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
      await client.connect();
      await client.db().admin().ping();
      await client.close();
      checks.database = true;
    } catch (error) {
      console.error('Database health check failed:', error);
      checks.database = false;
    }

    // CONTEXT7 SOURCE: /stripe/api - Stripe service connectivity check
    // PAYMENT HEALTH REASON: Official Stripe API health check patterns
    try {
      const { stripe } = await import('@/lib/stripe/stripe-config');
      await stripe.customers.list({ limit: 1 });
      checks.stripe = true;
    } catch (error) {
      console.error('Stripe health check failed:', error);
      checks.stripe = false;
    }

    // CONTEXT7 SOURCE: /resend/api - Email service connectivity check
    // EMAIL HEALTH REASON: Official Resend API health check patterns
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      // Simple API validation call (doesn't send email)
      await resend.domains.list();
      checks.email = true;
    } catch (error) {
      console.error('Email service health check failed:', error);
      checks.email = false;
    }

    // CONTEXT7 SOURCE: /node.js/process - Memory usage check
    // MEMORY HEALTH REASON: Official Node.js memory monitoring patterns
    const memoryUsage = process.memoryUsage();
    const memoryHealthy = memoryUsage.heapUsed / memoryUsage.heapTotal < 0.85;
    checks.memory = memoryHealthy;

    const responseTime = Date.now() - startTime;
    checks.response_time = responseTime;

    // CONTEXT7 SOURCE: /vercel/runtime - Deployment metadata collection
    // METADATA REASON: Official Vercel runtime information patterns
    const region = process.env.VERCEL_REGION || 'unknown';
    const deploymentId = process.env.VERCEL_DEPLOYMENT_ID || 'local';
    const nodeVersion = process.version;

    // Determine overall health status
    const criticalChecks = [checks.database, checks.stripe, checks.email, checks.memory];
    const healthyCount = criticalChecks.filter(Boolean).length;
    
    let status: HealthCheckResult['status'];
    if (healthyCount === criticalChecks.length) {
      status = 'healthy';
    } else if (healthyCount >= criticalChecks.length * 0.75) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }

    const result: HealthCheckResult = {
      status,
      timestamp: new Date().toISOString(),
      region,
      checks,
      metadata: {
        version: '2.0.0',
        deployment_id: deploymentId,
        node_version: nodeVersion,
        uptime: process.uptime()
      }
    };

    // CONTEXT7 SOURCE: /vercel/logging - Health check result logging
    // LOGGING REASON: Official Vercel logging patterns for monitoring data
    console.log(`Health check completed: ${status} (${responseTime}ms)`, {
      region,
      status,
      checks,
      response_time: responseTime
    });

    return NextResponse.json(result, {
      status: status === 'healthy' ? 200 : status === 'degraded' ? 202 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Status': status,
        'X-Response-Time': responseTime.toString(),
        'X-Region': region,
      }
    });

  } catch (error) {
    console.error('Health check endpoint error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      region: process.env.VERCEL_REGION || 'unknown',
      error: 'Health check failed',
      checks: {},
      metadata: {
        version: '2.0.0',
        deployment_id: process.env.VERCEL_DEPLOYMENT_ID || 'local',
        node_version: process.version,
        uptime: process.uptime()
      }
    } as HealthCheckResult, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Status': 'unhealthy',
      }
    });
  }
}

// CONTEXT7 SOURCE: /vercel/cron - Cron job method restrictions
// SECURITY REASON: Official Vercel cron job endpoint security patterns
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}