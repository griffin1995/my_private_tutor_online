// CONTEXT7 SOURCE: /vercel/next.js - Optimized API route with code splitting
// PERFORMANCE OPTIMIZATION REASON: Phase 2 bundle size reduction from 940KB to <50KB
// CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports for API route optimization
// IMPLEMENTATION: Lightweight monitoring endpoint with lazy-loaded modules

import { NextRequest, NextResponse } from 'next/server';

// CONTEXT7 SOURCE: /vercel/next.js - Edge runtime for optimal performance
// EDGE RUNTIME REASON: Reduce cold start times and improve response latency
export const runtime = 'edge';

// CONTEXT7 SOURCE: /vercel/next.js - Lightweight type definitions
// TYPE OPTIMIZATION REASON: Minimal runtime overhead with type safety
type MonitoringType = 'dashboard' | 'summary' | 'alerts' | 'system' | 'performance' | 'history';

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic import configuration
// DYNAMIC IMPORT REASON: Load monitoring modules only when needed
const loadMonitoringModule = async (type: MonitoringType) => {
  switch (type) {
    case 'dashboard':
      // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for dashboard metrics
      const { getDashboardMetrics } = await import('@/lib/monitoring/optimized/dashboard-metrics');
      return getDashboardMetrics();

    case 'summary':
      // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for performance summary
      const { getPerformanceSummary } = await import('@/lib/monitoring/optimized/performance-summary');
      return getPerformanceSummary();

    case 'alerts':
      // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for alert system
      const { getAlertData } = await import('@/lib/monitoring/optimized/alert-data');
      return getAlertData();

    case 'system':
      // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for system status
      const { getSystemStatus } = await import('@/lib/monitoring/optimized/system-status');
      return getSystemStatus();

    case 'performance':
      // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for performance report
      const { getPerformanceReport } = await import('@/lib/monitoring/optimized/performance-report');
      return getPerformanceReport();

    case 'history':
      // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for metrics history
      const { getMetricsHistory } = await import('@/lib/monitoring/optimized/metrics-history');
      return getMetricsHistory();

    default:
      throw new Error(`Invalid monitoring type: ${type}`);
  }
};

// CONTEXT7 SOURCE: /vercel/next.js - Optimized GET handler with error boundaries
// HANDLER OPTIMIZATION REASON: Minimal bundle size with full functionality
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get('type') || 'dashboard') as MonitoringType;
    const timeframe = searchParams.get('timeframe') || '24';

    // CONTEXT7 SOURCE: /vercel/next.js - Performance timing for monitoring
    const startTime = performance.now();

    // CONTEXT7 SOURCE: /vercel/next.js - Dynamic module loading
    // LAZY LOADING REASON: Load only required monitoring module
    const data = await loadMonitoringModule(type);

    const processingTime = performance.now() - startTime;

    // CONTEXT7 SOURCE: /vercel/next.js - Optimized response structure
    return NextResponse.json({
      success: true,
      data,
      metadata: {
        type,
        timeframe,
        processingTime: `${processingTime.toFixed(2)}ms`,
        timestamp: new Date().toISOString(),
        bundleOptimized: true, // Phase 2 optimization flag
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
        'X-Performance-Optimized': 'true',
      }
    });

  } catch (error) {
    // CONTEXT7 SOURCE: /vercel/next.js - Lightweight error handling
    console.error('Optimized monitoring API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - OPTIONS handler for CORS support
// CORS REASON: Enable cross-origin monitoring dashboard access
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}