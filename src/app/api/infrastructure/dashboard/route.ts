// CONTEXT7 SOURCE: /vercel/api - Multi-region infrastructure dashboard for monitoring
// INFRASTRUCTURE DASHBOARD REASON: Official Vercel API patterns for infrastructure monitoring

import { NextRequest, NextResponse } from 'next/server';

// CONTEXT7 SOURCE: /typescript/handbook - Infrastructure dashboard data interface
// TYPE SAFETY REASON: Official TypeScript patterns for monitoring dashboard structures
interface RegionStatus {
  region: string;
  status: 'online' | 'degraded' | 'offline';
  health_score: number;
  response_time_ms: number;
  last_check: string;
  services: {
    api: boolean;
    database: boolean;
    email: boolean;
    payments: boolean;
  };
  performance: {
    cpu_usage: number;
    memory_usage: number;
    error_rate: number;
    cache_hit_rate: number;
  };
}

interface InfrastructureDashboard {
  overview: {
    total_regions: number;
    healthy_regions: number;
    degraded_regions: number;
    offline_regions: number;
    global_health_score: number;
    last_updated: string;
  };
  regions: RegionStatus[];
  alerts: {
    critical: string[];
    warnings: string[];
  };
  performance_summary: {
    avg_response_time: number;
    total_requests_24h: number;
    error_rate_24h: number;
    uptime_percentage: number;
  };
}

// CONTEXT7 SOURCE: /vercel/regions - Multi-region configuration
// REGION CONFIG REASON: Official Vercel multi-region deployment patterns
const REGIONS = [
  { code: 'lhr1', name: 'London', primary: true },
  { code: 'fra1', name: 'Frankfurt', primary: false },
  { code: 'iad1', name: 'Washington D.C.', primary: false },
  { code: 'pdx1', name: 'Portland', primary: false },
  { code: 'syd1', name: 'Sydney', primary: false }
];

// CONTEXT7 SOURCE: /vercel/edge - Region health check simulation
// HEALTH CHECK REASON: Official Vercel edge function patterns for region monitoring
async function checkRegionHealth(regionCode: string): Promise<RegionStatus> {
  const startTime = Date.now();
  
  try {
    // Simulate health check for each region
    // In production, this would make actual requests to region-specific endpoints
    
    const isHealthy = Math.random() > 0.1; // 90% chance of being healthy
    const responseTime = Math.floor(Math.random() * 200) + 50; // 50-250ms
    
    // Simulate service checks
    const services = {
      api: Math.random() > 0.05, // 95% uptime
      database: Math.random() > 0.02, // 98% uptime
      email: Math.random() > 0.03, // 97% uptime
      payments: Math.random() > 0.01 // 99% uptime
    };
    
    // Simulate performance metrics
    const performance = {
      cpu_usage: Math.floor(Math.random() * 60) + 20, // 20-80%
      memory_usage: Math.floor(Math.random() * 50) + 30, // 30-80%
      error_rate: Math.random() * 2, // 0-2%
      cache_hit_rate: Math.random() * 0.3 + 0.7 // 70-100%
    };
    
    // Calculate health score based on services and performance
    const serviceHealth = Object.values(services).filter(Boolean).length / Object.values(services).length;
    const performanceHealth = Math.max(0, 1 - (performance.cpu_usage / 100) - (performance.memory_usage / 100) - (performance.error_rate / 100));
    const healthScore = Math.round((serviceHealth * 0.7 + performanceHealth * 0.3) * 100);
    
    // Determine overall status
    let status: RegionStatus['status'] = 'online';
    if (healthScore < 70 || !services.api || !services.database) {
      status = 'offline';
    } else if (healthScore < 85 || performance.error_rate > 1) {
      status = 'degraded';
    }
    
    return {
      region: regionCode,
      status,
      health_score: healthScore,
      response_time_ms: responseTime,
      last_check: new Date().toISOString(),
      services,
      performance
    };
    
  } catch (error) {
    console.error(`Health check failed for region ${regionCode}:`, error);
    
    return {
      region: regionCode,
      status: 'offline',
      health_score: 0,
      response_time_ms: -1,
      last_check: new Date().toISOString(),
      services: {
        api: false,
        database: false,
        email: false,
        payments: false
      },
      performance: {
        cpu_usage: -1,
        memory_usage: -1,
        error_rate: -1,
        cache_hit_rate: -1
      }
    };
  }
}

// CONTEXT7 SOURCE: /javascript/array - Alert generation from region statuses
// ALERT GENERATION REASON: Official JavaScript array processing patterns for monitoring alerts
function generateAlerts(regions: RegionStatus[]): { critical: string[]; warnings: string[] } {
  const critical: string[] = [];
  const warnings: string[] = [];
  
  for (const region of regions) {
    // Critical alerts
    if (region.status === 'offline') {
      critical.push(`REGION_OFFLINE: ${region.region} is completely offline`);
    }
    if (!region.services.database) {
      critical.push(`DATABASE_DOWN: ${region.region} database is unavailable`);
    }
    if (!region.services.payments) {
      critical.push(`PAYMENTS_DOWN: ${region.region} payment processing is unavailable`);
    }
    if (region.performance.error_rate > 5) {
      critical.push(`HIGH_ERROR_RATE: ${region.region} error rate is ${region.performance.error_rate.toFixed(2)}%`);
    }
    
    // Warning alerts
    if (region.status === 'degraded') {
      warnings.push(`REGION_DEGRADED: ${region.region} is experiencing degraded performance`);
    }
    if (region.performance.cpu_usage > 80) {
      warnings.push(`HIGH_CPU: ${region.region} CPU usage is ${region.performance.cpu_usage}%`);
    }
    if (region.performance.memory_usage > 85) {
      warnings.push(`HIGH_MEMORY: ${region.region} memory usage is ${region.performance.memory_usage}%`);
    }
    if (region.response_time_ms > 1000) {
      warnings.push(`SLOW_RESPONSE: ${region.region} response time is ${region.response_time_ms}ms`);
    }
    if (region.performance.cache_hit_rate < 0.6) {
      warnings.push(`LOW_CACHE_HIT: ${region.region} cache hit rate is ${(region.performance.cache_hit_rate * 100).toFixed(1)}%`);
    }
  }
  
  return { critical, warnings };
}

// CONTEXT7 SOURCE: /next.js/app-router - Infrastructure dashboard endpoint
// DASHBOARD ENDPOINT REASON: Official Next.js API route patterns for monitoring dashboards
export async function GET(request: NextRequest) {
  try {
    console.log('Collecting multi-region infrastructure status...');
    
    // CONTEXT7 SOURCE: /javascript/promise - Concurrent region health checks
    // CONCURRENCY REASON: Official JavaScript Promise.all patterns for parallel region monitoring
    const regionStatuses = await Promise.all(
      REGIONS.map(region => checkRegionHealth(region.code))
    );
    
    // Calculate overview statistics
    const healthyRegions = regionStatuses.filter(r => r.status === 'online').length;
    const degradedRegions = regionStatuses.filter(r => r.status === 'degraded').length;
    const offlineRegions = regionStatuses.filter(r => r.status === 'offline').length;
    
    const globalHealthScore = Math.round(
      regionStatuses.reduce((sum, r) => sum + r.health_score, 0) / regionStatuses.length
    );
    
    const avgResponseTime = Math.round(
      regionStatuses
        .filter(r => r.response_time_ms > 0)
        .reduce((sum, r) => sum + r.response_time_ms, 0) / 
      regionStatuses.filter(r => r.response_time_ms > 0).length
    );
    
    // Generate alerts
    const alerts = generateAlerts(regionStatuses);
    
    // Simulate 24-hour performance metrics
    const totalRequests24h = Math.floor(Math.random() * 50000) + 10000; // 10k-60k requests
    const errorRate24h = Math.random() * 1.5; // 0-1.5% error rate
    const uptimePercentage = Math.max(95, 100 - (offlineRegions / REGIONS.length) * 10); // 95-100%
    
    const dashboard: InfrastructureDashboard = {
      overview: {
        total_regions: REGIONS.length,
        healthy_regions: healthyRegions,
        degraded_regions: degradedRegions,
        offline_regions: offlineRegions,
        global_health_score: globalHealthScore,
        last_updated: new Date().toISOString()
      },
      regions: regionStatuses,
      alerts,
      performance_summary: {
        avg_response_time: avgResponseTime,
        total_requests_24h: totalRequests24h,
        error_rate_24h: errorRate24h,
        uptime_percentage: uptimePercentage
      }
    };
    
    // CONTEXT7 SOURCE: /vercel/logging - Infrastructure monitoring logging
    // LOGGING REASON: Official Vercel logging patterns for infrastructure data
    console.log('Infrastructure dashboard generated:', {
      total_regions: REGIONS.length,
      healthy_regions: healthyRegions,
      degraded_regions: degradedRegions,
      offline_regions: offlineRegions,
      global_health_score: globalHealthScore,
      critical_alerts: alerts.critical.length,
      warning_alerts: alerts.warnings.length
    });
    
    // Log critical alerts
    if (alerts.critical.length > 0) {
      console.error('CRITICAL INFRASTRUCTURE ALERTS:', alerts.critical);
    }
    
    return NextResponse.json(dashboard, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Global-Health-Score': globalHealthScore.toString(),
        'X-Healthy-Regions': healthyRegions.toString(),
        'X-Critical-Alerts': alerts.critical.length.toString(),
        'X-Last-Updated': new Date().toISOString(),
      }
    });
    
  } catch (error) {
    console.error('Infrastructure dashboard error:', error);
    
    const errorDashboard: InfrastructureDashboard = {
      overview: {
        total_regions: REGIONS.length,
        healthy_regions: 0,
        degraded_regions: 0,
        offline_regions: REGIONS.length,
        global_health_score: 0,
        last_updated: new Date().toISOString()
      },
      regions: REGIONS.map(region => ({
        region: region.code,
        status: 'offline' as const,
        health_score: 0,
        response_time_ms: -1,
        last_check: new Date().toISOString(),
        services: { api: false, database: false, email: false, payments: false },
        performance: { cpu_usage: -1, memory_usage: -1, error_rate: -1, cache_hit_rate: -1 }
      })),
      alerts: {
        critical: ['DASHBOARD_FAILURE: Infrastructure monitoring system is down'],
        warnings: []
      },
      performance_summary: {
        avg_response_time: -1,
        total_requests_24h: -1,
        error_rate_24h: -1,
        uptime_percentage: 0
      }
    };
    
    return NextResponse.json(errorDashboard, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Dashboard-Status': 'failed',
      }
    });
  }
}

// CONTEXT7 SOURCE: /next.js/app-router - CORS configuration for infrastructure dashboard
// SECURITY REASON: Official Next.js CORS patterns for monitoring endpoints
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://myprivatetutoronline.com,https://myprivatetutoronline.vercel.app',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}