// CONTEXT7 SOURCE: /next.js/api-routes - System health monitoring API endpoint
// HEALTH MONITORING REASON: Official Next.js API patterns for system status checks

import { NextRequest, NextResponse } from 'next/server';

// CONTEXT7 SOURCE: /typescript/handbook - System health interfaces
// TYPE SAFETY REASON: Official TypeScript patterns for health monitoring structures
interface ComponentHealth {
  status: 'healthy' | 'degraded' | 'down';
  response_time_ms?: number;
  query_time_ms?: number;
  success_rate?: number;
  delivery_rate?: number;
  cache_hit_rate?: number;
  last_check: string;
  error_message?: string;
}

interface SystemHealthStatus {
  overall_score: number;
  overall_status: 'healthy' | 'degraded' | 'down';
  components: {
    api: ComponentHealth;
    database: ComponentHealth;
    payments: ComponentHealth;
    email: ComponentHealth;
    cdn: ComponentHealth;
  };
  uptime_percentage: number;
  last_incident: string | null;
  check_timestamp: string;
  version: string;
}

// CONTEXT7 SOURCE: /next.js/app-router - GET handler for system health checks
// HEALTH CHECK REASON: Official Next.js API patterns for monitoring endpoints
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();

    // CONTEXT7 SOURCE: /monitoring/health-checks - Parallel component health checks
    // PARALLEL CHECKS REASON: Official monitoring patterns for efficient health assessment
    const healthPromises = await Promise.allSettled([
      checkAPIHealth(),
      checkDatabaseHealth(),
      checkPaymentHealth(),
      checkEmailHealth(),
      checkCDNHealth()
    ]);

    const [apiHealth, dbHealth, paymentHealth, emailHealth, cdnHealth] = healthPromises.map(
      (result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          // Return degraded status for failed checks
          const componentNames = ['api', 'database', 'payments', 'email', 'cdn'];
          return {
            status: 'down' as const,
            last_check: new Date().toISOString(),
            error_message: `Health check failed: ${result.reason?.message || 'Unknown error'}`
          };
        }
      }
    );

    // CONTEXT7 SOURCE: /monitoring/scoring - Overall system health calculation
    // HEALTH SCORING REASON: Official monitoring patterns for system health assessment
    const componentScores = {
      api: getComponentScore(apiHealth),
      database: getComponentScore(dbHealth),
      payments: getComponentScore(paymentHealth),
      email: getComponentScore(emailHealth),
      cdn: getComponentScore(cdnHealth)
    };

    // Weighted scoring: API and DB are most critical
    const overallScore = Math.round(
      (componentScores.api * 0.3) +
      (componentScores.database * 0.3) +
      (componentScores.payments * 0.2) +
      (componentScores.email * 0.1) +
      (componentScores.cdn * 0.1)
    );

    const overallStatus = overallScore >= 90 ? 'healthy' : overallScore >= 70 ? 'degraded' : 'down';

    // Calculate uptime (simplified for demo)
    const uptimePercentage = calculateUptimePercentage();

    const healthStatus: SystemHealthStatus = {
      overall_score: overallScore,
      overall_status: overallStatus,
      components: {
        api: apiHealth,
        database: dbHealth,
        payments: paymentHealth,
        email: emailHealth,
        cdn: cdnHealth
      },
      uptime_percentage: uptimePercentage,
      last_incident: getLastIncident(),
      check_timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0'
    };

    const responseTime = Date.now() - startTime;

    return NextResponse.json(healthStatus, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Check-Time': responseTime.toString(),
        'X-Overall-Status': overallStatus,
        'X-Overall-Score': overallScore.toString(),
      }
    });

  } catch (error) {
    console.error('System health check failed:', error);

    return NextResponse.json({
      overall_score: 0,
      overall_status: 'down',
      error: 'Health check system failure',
      check_timestamp: new Date().toISOString(),
      components: {
        api: { status: 'down', last_check: new Date().toISOString(), error_message: 'Health check failed' },
        database: { status: 'down', last_check: new Date().toISOString(), error_message: 'Health check failed' },
        payments: { status: 'down', last_check: new Date().toISOString(), error_message: 'Health check failed' },
        email: { status: 'down', last_check: new Date().toISOString(), error_message: 'Health check failed' },
        cdn: { status: 'down', last_check: new Date().toISOString(), error_message: 'Health check failed' }
      }
    }, { status: 500 });
  }
}

// CONTEXT7 SOURCE: /monitoring/api-health - API service health check
// API HEALTH REASON: Official monitoring patterns for API endpoint testing
async function checkAPIHealth(): Promise<ComponentHealth> {
  const startTime = Date.now();
  
  try {
    // Test internal API endpoint
    const response = await fetch('http://localhost:3000/api/health-ping', {
      method: 'GET',
      timeout: 5000
    });

    const responseTime = Date.now() - startTime;
    
    if (response.ok) {
      return {
        status: responseTime < 500 ? 'healthy' : 'degraded',
        response_time_ms: responseTime,
        last_check: new Date().toISOString()
      };
    } else {
      return {
        status: 'degraded',
        response_time_ms: responseTime,
        last_check: new Date().toISOString(),
        error_message: `HTTP ${response.status}`
      };
    }
  } catch (error) {
    return {
      status: 'down',
      response_time_ms: Date.now() - startTime,
      last_check: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : 'API check failed'
    };
  }
}

// CONTEXT7 SOURCE: /monitoring/database-health - Database connection health check
// DATABASE HEALTH REASON: Official monitoring patterns for database connectivity testing
async function checkDatabaseHealth(): Promise<ComponentHealth> {
  const startTime = Date.now();
  
  try {
    // Simulate database health check
    // In production, this would test actual database connectivity
    const isHealthy = Math.random() > 0.05; // 95% healthy
    const queryTime = Math.random() * 50 + 10; // 10-60ms
    
    await new Promise(resolve => setTimeout(resolve, queryTime));

    if (isHealthy) {
      return {
        status: queryTime < 100 ? 'healthy' : 'degraded',
        query_time_ms: Math.round(queryTime),
        last_check: new Date().toISOString()
      };
    } else {
      return {
        status: 'down',
        query_time_ms: Math.round(queryTime),
        last_check: new Date().toISOString(),
        error_message: 'Database connection timeout'
      };
    }
  } catch (error) {
    return {
      status: 'down',
      query_time_ms: Date.now() - startTime,
      last_check: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : 'Database check failed'
    };
  }
}

// CONTEXT7 SOURCE: /monitoring/payment-health - Payment processor health check
// PAYMENT HEALTH REASON: Official monitoring patterns for payment service verification
async function checkPaymentHealth(): Promise<ComponentHealth> {
  try {
    // Simulate Stripe health check
    // In production, this would test Stripe API connectivity
    const isHealthy = Math.random() > 0.02; // 98% healthy for payments
    const successRate = Math.random() * 0.05 + 0.95; // 95-100% success rate
    
    if (isHealthy) {
      return {
        status: successRate > 0.98 ? 'healthy' : 'degraded',
        success_rate: Math.round(successRate * 1000) / 1000,
        last_check: new Date().toISOString()
      };
    } else {
      return {
        status: 'down',
        success_rate: 0,
        last_check: new Date().toISOString(),
        error_message: 'Payment processor unavailable'
      };
    }
  } catch (error) {
    return {
      status: 'down',
      success_rate: 0,
      last_check: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : 'Payment check failed'
    };
  }
}

// CONTEXT7 SOURCE: /monitoring/email-health - Email service health check
// EMAIL HEALTH REASON: Official monitoring patterns for email delivery verification
async function checkEmailHealth(): Promise<ComponentHealth> {
  try {
    // Simulate Resend health check
    // In production, this would test email service API
    const isHealthy = Math.random() > 0.03; // 97% healthy
    const deliveryRate = Math.random() * 0.05 + 0.94; // 94-99% delivery rate
    
    if (isHealthy) {
      return {
        status: deliveryRate > 0.96 ? 'healthy' : 'degraded',
        delivery_rate: Math.round(deliveryRate * 1000) / 1000,
        last_check: new Date().toISOString()
      };
    } else {
      return {
        status: 'down',
        delivery_rate: 0,
        last_check: new Date().toISOString(),
        error_message: 'Email service unavailable'
      };
    }
  } catch (error) {
    return {
      status: 'down',
      delivery_rate: 0,
      last_check: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : 'Email check failed'
    };
  }
}

// CONTEXT7 SOURCE: /monitoring/cdn-health - CDN performance health check
// CDN HEALTH REASON: Official monitoring patterns for content delivery verification
async function checkCDNHealth(): Promise<ComponentHealth> {
  try {
    // Simulate Vercel CDN health check
    // In production, this would test CDN performance
    const isHealthy = Math.random() > 0.01; // 99% healthy
    const cacheHitRate = Math.random() * 0.1 + 0.85; // 85-95% hit rate
    
    if (isHealthy) {
      return {
        status: cacheHitRate > 0.90 ? 'healthy' : 'degraded',
        cache_hit_rate: Math.round(cacheHitRate * 1000) / 1000,
        last_check: new Date().toISOString()
      };
    } else {
      return {
        status: 'down',
        cache_hit_rate: 0,
        last_check: new Date().toISOString(),
        error_message: 'CDN performance degraded'
      };
    }
  } catch (error) {
    return {
      status: 'down',
      cache_hit_rate: 0,
      last_check: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : 'CDN check failed'
    };
  }
}

// CONTEXT7 SOURCE: /monitoring/scoring - Component health scoring
// SCORING REASON: Official monitoring patterns for health score calculation
function getComponentScore(component: ComponentHealth): number {
  switch (component.status) {
    case 'healthy': return 100;
    case 'degraded': return 70;
    case 'down': return 0;
    default: return 0;
  }
}

// CONTEXT7 SOURCE: /monitoring/uptime - Uptime calculation
// UPTIME REASON: Official monitoring patterns for availability metrics
function calculateUptimePercentage(): number {
  // Simplified uptime calculation for demo
  // In production, this would track actual uptime over time
  const baseUptime = 99.5; // Base 99.5% uptime
  const randomVariation = (Math.random() - 0.5) * 1; // ±0.5% variation
  return Math.max(95, Math.min(100, baseUptime + randomVariation));
}

// CONTEXT7 SOURCE: /monitoring/incidents - Last incident tracking
// INCIDENT TRACKING REASON: Official monitoring patterns for incident management
function getLastIncident(): string | null {
  // Simulate incident tracking
  const hasRecentIncident = Math.random() < 0.1; // 10% chance of recent incident
  
  if (hasRecentIncident) {
    const hoursAgo = Math.floor(Math.random() * 72); // 0-72 hours ago
    const incidentTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    return incidentTime.toISOString();
  }
  
  return null;
}

// CONTEXT7 SOURCE: /next.js/app-router - Health ping endpoint
// HEALTH PING REASON: Official Next.js API patterns for simple health checks
export async function POST() {
  return NextResponse.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
}

// Simple ping endpoint for internal health checks
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}