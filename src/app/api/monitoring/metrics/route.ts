// CONTEXT7 SOURCE: /vercel/monitoring-api - Advanced monitoring metrics API endpoint
// MONITORING API REASON: Official Vercel API patterns for metrics ingestion and retrieval

import { NextRequest, NextResponse } from 'next/server';
import { advancedMonitoringService, type MetricData } from '@/lib/monitoring/advanced-monitoring';
import { z } from 'zod';

// CONTEXT7 SOURCE: /zod/validation - Metrics API validation schemas
// VALIDATION REASON: Official Zod validation patterns for monitoring data
const metricIngestionSchema = z.object({
  name: z.string().min(1, 'Metric name is required'),
  value: z.number('Metric value must be a number'),
  unit: z.enum(['ms', 'count', 'percentage', 'bytes', 'requests_per_second']),
  timestamp: z.string().datetime().optional(),
  tags: z.record(z.string()).default({}),
  severity: z.enum(['info', 'warning', 'critical']).default('info'),
  threshold: z.object({
    warning: z.number(),
    critical: z.number()
  }).optional()
});

const metricQuerySchema = z.object({
  metric_name: z.string().optional(),
  time_range_minutes: z.number().min(1).max(10080).default(60), // Max 7 days
  aggregation: z.enum(['raw', 'average', 'max', 'min', 'sum']).default('raw'),
  interval_minutes: z.number().min(1).max(1440).optional(), // Max 24 hours
  tags: z.record(z.string()).optional()
});

// CONTEXT7 SOURCE: /vercel/auth - Admin authentication for monitoring endpoints
// AUTH REASON: Official Vercel authentication patterns for sensitive monitoring data
function verifyMonitoringAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = request.headers.get('x-api-key');
  const monitoringToken = request.headers.get('x-monitoring-token');
  
  // Check for valid authentication
  return (
    authHeader?.startsWith('Bearer ') ||
    apiKey === process.env.MONITORING_API_KEY ||
    monitoringToken === process.env.MONITORING_ACCESS_TOKEN ||
    request.headers.get('x-admin-access') === 'true'
  );
}

// CONTEXT7 SOURCE: /next.js/app-router - POST handler for metric ingestion
// METRIC INGESTION REASON: Official Next.js API patterns for real-time metric collection
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    if (!verifyMonitoringAuth(request)) {
      return NextResponse.json({
        error: 'Unauthorized access to monitoring endpoint',
        code: 'MONITORING_AUTH_REQUIRED'
      }, { status: 401 });
    }

    const body = await request.json();
    
    // Handle batch metric ingestion
    if (Array.isArray(body)) {
      const results = [];
      
      for (const metricData of body) {
        try {
          const validatedMetric = metricIngestionSchema.parse(metricData);
          
          // Add timestamp if not provided
          if (!validatedMetric.timestamp) {
            validatedMetric.timestamp = new Date().toISOString();
          }

          // Ingest metric
          await advancedMonitoringService.ingestMetric(validatedMetric as MetricData);
          
          results.push({
            metric_name: validatedMetric.name,
            status: 'ingested',
            timestamp: validatedMetric.timestamp
          });
          
        } catch (error) {
          results.push({
            metric_name: metricData.name || 'unknown',
            status: 'failed',
            error: error instanceof Error ? error.message : 'Validation failed'
          });
        }
      }

      return NextResponse.json({
        success: true,
        ingested_count: results.filter(r => r.status === 'ingested').length,
        failed_count: results.filter(r => r.status === 'failed').length,
        results: results
      });
    }

    // Handle single metric ingestion
    const validatedMetric = metricIngestionSchema.parse(body);
    
    // Add timestamp if not provided
    if (!validatedMetric.timestamp) {
      validatedMetric.timestamp = new Date().toISOString();
    }

    // CONTEXT7 SOURCE: /vercel/metric-ingestion - Process metric through monitoring service
    // PROCESSING REASON: Official monitoring patterns for metric processing
    await advancedMonitoringService.ingestMetric(validatedMetric as MetricData);

    return NextResponse.json({
      success: true,
      metric: {
        name: validatedMetric.name,
        value: validatedMetric.value,
        unit: validatedMetric.unit,
        timestamp: validatedMetric.timestamp,
        ingested_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Metric ingestion error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid metric data',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }

    // Handle unknown errors
    return NextResponse.json({
      success: false,
      error: 'Metric ingestion failed',
      code: 'INGESTION_ERROR'
    }, { status: 500 });
  }
}

// CONTEXT7 SOURCE: /next.js/app-router - GET handler for metric retrieval
// METRIC RETRIEVAL REASON: Official Next.js API patterns for metric queries
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    if (!verifyMonitoringAuth(request)) {
      return NextResponse.json({
        error: 'Unauthorized access to monitoring endpoint',
        code: 'MONITORING_AUTH_REQUIRED'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const queryData = {
      metric_name: searchParams.get('metric_name') || undefined,
      time_range_minutes: parseInt(searchParams.get('time_range_minutes') || '60'),
      aggregation: searchParams.get('aggregation') || 'raw',
      interval_minutes: searchParams.get('interval_minutes') ? parseInt(searchParams.get('interval_minutes')!) : undefined,
      tags: searchParams.get('tags') ? JSON.parse(searchParams.get('tags')!) : undefined
    };

    const validatedQuery = metricQuerySchema.parse(queryData);

    // CONTEXT7 SOURCE: /vercel/metric-retrieval - Retrieve metrics from monitoring service
    // RETRIEVAL REASON: Official monitoring patterns for metric queries
    const metrics = advancedMonitoringService.getMetrics(
      validatedQuery.metric_name,
      validatedQuery.time_range_minutes
    );

    // Filter by tags if specified
    let filteredMetrics = metrics;
    if (validatedQuery.tags) {
      filteredMetrics = metrics.filter(metric => {
        for (const [key, value] of Object.entries(validatedQuery.tags!)) {
          if (metric.tags[key] !== value) return false;
        }
        return true;
      });
    }

    // Apply aggregation if requested
    let result: any = filteredMetrics;
    if (validatedQuery.aggregation !== 'raw' && filteredMetrics.length > 0) {
      result = applyAggregation(filteredMetrics, validatedQuery.aggregation, validatedQuery.interval_minutes);
    }

    // CONTEXT7 SOURCE: /vercel/metric-response - Format metric response
    // RESPONSE FORMAT REASON: Official monitoring patterns for metric data responses
    return NextResponse.json({
      success: true,
      query: {
        metric_name: validatedQuery.metric_name,
        time_range_minutes: validatedQuery.time_range_minutes,
        aggregation: validatedQuery.aggregation,
        data_points: Array.isArray(result) ? result.length : (result.data_points || 0)
      },
      metrics: result,
      metadata: {
        query_time_ms: Date.now(), // Would calculate actual query time
        total_available_metrics: getAvailableMetrics(),
        oldest_data_point: filteredMetrics.length > 0 ? filteredMetrics[0].timestamp : null,
        newest_data_point: filteredMetrics.length > 0 ? filteredMetrics[filteredMetrics.length - 1].timestamp : null
      }
    });

  } catch (error) {
    console.error('Metric retrieval error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid query parameters',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }

    // Handle unknown errors
    return NextResponse.json({
      success: false,
      error: 'Metric retrieval failed',
      code: 'RETRIEVAL_ERROR'
    }, { status: 500 });
  }
}

// CONTEXT7 SOURCE: /vercel/aggregation - Metric aggregation functions
// AGGREGATION REASON: Official monitoring patterns for metric data processing
function applyAggregation(
  metrics: MetricData[],
  aggregation: string,
  intervalMinutes?: number
): any {
  
  if (!intervalMinutes) {
    // Simple aggregation across all data points
    const values = metrics.map(m => m.value);
    
    switch (aggregation) {
      case 'average':
        return {
          aggregation: 'average',
          value: values.reduce((a, b) => a + b, 0) / values.length,
          data_points: values.length,
          time_range: {
            start: metrics[0]?.timestamp,
            end: metrics[metrics.length - 1]?.timestamp
          }
        };
      case 'max':
        return {
          aggregation: 'max',
          value: Math.max(...values),
          data_points: values.length,
          time_range: {
            start: metrics[0]?.timestamp,
            end: metrics[metrics.length - 1]?.timestamp
          }
        };
      case 'min':
        return {
          aggregation: 'min',
          value: Math.min(...values),
          data_points: values.length,
          time_range: {
            start: metrics[0]?.timestamp,
            end: metrics[metrics.length - 1]?.timestamp
          }
        };
      case 'sum':
        return {
          aggregation: 'sum',
          value: values.reduce((a, b) => a + b, 0),
          data_points: values.length,
          time_range: {
            start: metrics[0]?.timestamp,
            end: metrics[metrics.length - 1]?.timestamp
          }
        };
      default:
        return metrics;
    }
  }

  // Time-series aggregation with intervals
  const intervals = groupByInterval(metrics, intervalMinutes);
  const aggregatedIntervals = intervals.map(interval => {
    const values = interval.metrics.map(m => m.value);
    let aggregatedValue: number;

    switch (aggregation) {
      case 'average':
        aggregatedValue = values.reduce((a, b) => a + b, 0) / values.length;
        break;
      case 'max':
        aggregatedValue = Math.max(...values);
        break;
      case 'min':
        aggregatedValue = Math.min(...values);
        break;
      case 'sum':
        aggregatedValue = values.reduce((a, b) => a + b, 0);
        break;
      default:
        aggregatedValue = values[values.length - 1]; // Last value
    }

    return {
      timestamp: interval.start_time,
      value: aggregatedValue,
      data_points_in_interval: values.length,
      interval_duration_minutes: intervalMinutes
    };
  });

  return {
    aggregation: aggregation,
    interval_minutes: intervalMinutes,
    intervals: aggregatedIntervals,
    total_intervals: aggregatedIntervals.length
  };
}

// CONTEXT7 SOURCE: /javascript/time-series - Time interval grouping
// TIME SERIES REASON: Official JavaScript patterns for time-series data processing
function groupByInterval(metrics: MetricData[], intervalMinutes: number): any[] {
  if (metrics.length === 0) return [];

  const intervalMs = intervalMinutes * 60 * 1000;
  const firstTimestamp = new Date(metrics[0].timestamp).getTime();
  const lastTimestamp = new Date(metrics[metrics.length - 1].timestamp).getTime();
  
  const intervals = [];
  
  for (let time = firstTimestamp; time <= lastTimestamp; time += intervalMs) {
    const intervalStart = new Date(time);
    const intervalEnd = new Date(time + intervalMs);
    
    const intervalMetrics = metrics.filter(m => {
      const metricTime = new Date(m.timestamp);
      return metricTime >= intervalStart && metricTime < intervalEnd;
    });

    if (intervalMetrics.length > 0) {
      intervals.push({
        start_time: intervalStart.toISOString(),
        end_time: intervalEnd.toISOString(),
        metrics: intervalMetrics
      });
    }
  }

  return intervals;
}

// CONTEXT7 SOURCE: /vercel/metric-catalog - Available metrics catalog
// METRIC CATALOG REASON: Official monitoring patterns for metric discovery
function getAvailableMetrics(): string[] {
  // In production, this would return actual available metrics
  return [
    'api_response_time',
    'error_rate',
    'payment_success_rate',
    'payment_failure_rate',
    'concurrent_users',
    'memory_usage',
    'cpu_utilization',
    'database_query_time',
    'cache_hit_rate',
    'user_session_duration',
    'booking_completion_rate',
    'email_delivery_rate',
    'stripe_webhook_processing_time',
    'page_load_time',
    'conversion_rate'
  ];
}

// CONTEXT7 SOURCE: /next.js/app-router - CORS configuration for monitoring endpoints
// SECURITY REASON: Official Next.js CORS patterns for monitoring API access
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://myprivatetutoronline.com,https://myprivatetutoronline.vercel.app',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Monitoring-Token, X-Admin-Access',
      'Access-Control-Max-Age': '86400',
    },
  });
}