// CONTEXT7 SOURCE: /grafana/k6-docs - Breaking point testing with ramping VUs and abort thresholds
// IMPLEMENTATION REASON: Official k6 breakpoint testing pattern to identify FAQ system capacity limits

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

// CONTEXT7 SOURCE: /grafana/k6-docs - Stress testing metrics for system breaking point analysis
// METRICS REASON: Track system degradation patterns and identify failure modes under extreme load
const systemDegradationRate = new Rate('system_degradation_rate');
const errorEscalationRate = new Rate('error_escalation_rate');
const responseTimeInflation = new Trend('response_time_inflation');
const memoryPressureIndicator = new Gauge('memory_pressure_indicator');
const connectionRefusalRate = new Rate('connection_refusal_rate');
const timeoutOccurrenceRate = new Rate('timeout_occurrence_rate');
const cascadeFailureIndicator = new Counter('cascade_failure_count');

// CONTEXT7 SOURCE: /grafana/k6-docs - Stress test configuration with progressive load increase
// CONFIGURATION REASON: Systematic load escalation to find exact breaking point of FAQ system
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const INITIAL_LOAD = parseInt(__ENV.INITIAL_LOAD) || 50;
const MAX_EXPECTED_LOAD = parseInt(__ENV.MAX_EXPECTED_LOAD) || 2000;
const LOAD_INCREMENT = parseInt(__ENV.LOAD_INCREMENT) || 50;

// CONTEXT7 SOURCE: /grafana/k6-docs - Breaking point test with abort conditions
// SCENARIO REASON: Progressive load increase until system breaking point with automatic abort
export const options = {
  scenarios: {
    stress_breaking_point: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        // CONTEXT7 SOURCE: /grafana/k6-docs - Progressive load stages for breaking point identification
        // STAGE REASON: Systematic increase to identify exact failure threshold
        { duration: '2m', target: INITIAL_LOAD },           // Baseline load
        { duration: '3m', target: INITIAL_LOAD * 2 },       // Double baseline
        { duration: '3m', target: INITIAL_LOAD * 4 },       // 4x baseline
        { duration: '3m', target: INITIAL_LOAD * 8 },       // 8x baseline
        { duration: '5m', target: INITIAL_LOAD * 12 },      // 12x baseline
        { duration: '5m', target: INITIAL_LOAD * 16 },      // 16x baseline
        { duration: '8m', target: INITIAL_LOAD * 20 },      // 20x baseline
        { duration: '10m', target: MAX_EXPECTED_LOAD },     // Maximum test load
        { duration: '2m', target: 0 },                      // Graceful shutdown
      ],
      gracefulRampDown: '60s',
    },
  },
  
  // CONTEXT7 SOURCE: /grafana/k6-docs - Abort thresholds for automatic test termination
  // THRESHOLD REASON: Prevent system damage and identify breaking point automatically
  thresholds: {
    // CONTEXT7 SOURCE: /grafana/k6-docs - Failure rate threshold with abort on breach
    // ABORT REASON: Stop test when system clearly failing to prevent damage
    http_req_failed: [
      { threshold: 'rate<5%', abortOnFail: false }, // Warning level
      { threshold: 'rate<15%', abortOnFail: true },  // Abort at 15% failure rate
    ],
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Response time thresholds for degradation detection
    // DEGRADATION REASON: Identify when response times indicate system stress
    http_req_duration: [
      'p(95)<2000', // 95% under 2 seconds (degraded but functional)
      'p(99)<5000', // 99% under 5 seconds (severely degraded)
    ],
    
    // Stress-specific thresholds
    system_degradation_rate: ['rate<80%'], // System can degrade but not completely fail
    error_escalation_rate: ['rate<50%'],   // Error escalation containment
    connection_refusal_rate: ['rate<25%'], // Connection refusal tolerance
    timeout_occurrence_rate: ['rate<30%'], // Timeout tolerance
    cascade_failure_count: ['count<100'],  // Prevent cascade failures
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Custom metric thresholds for breaking point analysis
    // ANALYSIS REASON: Detailed stress response analysis for capacity planning
    response_time_inflation: [
      'p(95)<10000', // Inflated response times under extreme stress
    ],
  },
  
  // CONTEXT7 SOURCE: /grafana/k6-docs - Extended timeouts for stress testing
  // TIMEOUT REASON: Allow system time to respond under extreme load conditions
  httpDebug: 'full',
  insecureSkipTLSVerify: true,
  noConnectionReuse: false, // Test connection pooling under stress
  
  tags: {
    test_type: 'stress_breaking_point',
    service: 'my_private_tutor_online',
    component: 'faq_system',
    scenario: 'capacity_limit_identification',
  },
};

// CONTEXT7 SOURCE: /grafana/k6-docs - Stress test data for comprehensive system testing
// DATA REASON: Cover all FAQ functionality under extreme load conditions
const STRESS_TEST_QUERIES = [
  'immediate tutoring help',
  'emergency exam preparation',
  'urgent Oxbridge coaching',
  'last minute 11+ support',
  'crisis intervention tutoring',
  'intensive revision programmes',
  'panic exam preparation',
  'emergency royal tutor',
  'urgent subject specialist',
  'immediate availability check',
];

const HIGH_LOAD_CATEGORIES = [
  'urgent-bookings',
  'emergency-support', 
  'immediate-availability',
  'crisis-intervention',
  'last-minute-preparation',
  'intensive-programmes',
];

// CONTEXT7 SOURCE: /grafana/k6-docs - Comprehensive stress testing simulation
// SIMULATION REASON: Test all FAQ system components under breaking point conditions
export default function() {
  const currentVUs = __VU;
  const isHighStressUser = currentVUs > (MAX_EXPECTED_LOAD * 0.7); // High stress simulation for 30% of peak users
  
  group('FAQ System Breaking Point Test', function() {
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Homepage stress test with error tracking
    // HOMEPAGE REASON: Core entry point must maintain basic functionality under extreme load
    group('Homepage Under Extreme Load', function() {
      const startTime = Date.now();
      const response = http.get(`${BASE_URL}/faq?stress_test=true&vu=${currentVUs}`, {
        headers: {
          'User-Agent': `StressTest-FAQ-Browser/1.0-VU-${currentVUs}`,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
        timeout: '30s', // Extended timeout for stress conditions
        tags: { 
          name: 'stress_homepage',
          load_level: getLoadLevel(currentVUs),
        },
      });
      
      const duration = Date.now() - startTime;
      responseTimeInflation.add(duration);
      
      const success = check(response, {
        'Homepage accessible under stress': (r) => r.status === 200,
        'Homepage responds within timeout': (r) => r.timings.duration < 30000,
        'Homepage contains core content': (r) => r.body && r.body.length > 1000,
        'No connection refused': (r) => r.status !== 0 && !r.error_code,
      });
      
      systemDegradationRate.add(success);
      if (!success) {
        errorEscalationRate.add(true);
        if (response.status === 0 || response.error_code) {
          connectionRefusalRate.add(true);
        }
        if (duration > 30000) {
          timeoutOccurrenceRate.add(true);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Search functionality stress test
    // SEARCH REASON: Critical FAQ functionality must degrade gracefully under extreme load
    group('Search Under Breaking Point Conditions', function() {
      const query = isHighStressUser 
        ? STRESS_TEST_QUERIES[Math.floor(Math.random() * STRESS_TEST_QUERIES.length)]
        : 'general tutoring information';
      
      const startTime = Date.now();
      const response = http.get(`${BASE_URL}/api/faq/search?q=${encodeURIComponent(query)}&stress=true`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Stress-Level': getLoadLevel(currentVUs),
          'X-VU-ID': currentVUs.toString(),
        },
        timeout: '25s',
        tags: { 
          name: 'stress_search',
          query_complexity: isHighStressUser ? 'high' : 'normal',
        },
      });
      
      const searchDuration = Date.now() - startTime;
      responseTimeInflation.add(searchDuration);
      
      const success = check(response, {
        'Search responds under stress': (r) => r.status >= 200 && r.status < 400,
        'Search has reasonable response time': (r) => r.timings.duration < 25000,
        'Search returns data structure': (r) => {
          try {
            const data = JSON.parse(r.body || '{}');
            return typeof data === 'object';
          } catch {
            return r.status >= 200 && r.status < 400; // Accept non-JSON success responses
          }
        },
      });
      
      systemDegradationRate.add(success);
      if (!success) {
        errorEscalationRate.add(true);
        cascadeFailureIndicator.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Database stress testing through category access
    // DATABASE REASON: Test backend database performance under extreme concurrent load
    group('Database Stress via Category Access', function() {
      const category = HIGH_LOAD_CATEGORIES[Math.floor(Math.random() * HIGH_LOAD_CATEGORIES.length)];
      
      const response = http.get(`${BASE_URL}/api/faq/category/${category}?stress_mode=true`, {
        headers: {
          'Accept': 'application/json',
          'X-Load-Level': getLoadLevel(currentVUs),
        },
        timeout: '20s',
        tags: { 
          name: 'stress_database',
          category: category,
        },
      });
      
      const success = check(response, {
        'Database accessible under load': (r) => r.status >= 200 && r.status < 500,
        'Database response within limits': (r) => r.timings.duration < 20000,
        'No database connection errors': (r) => !r.body || !r.body.includes('connection'),
      });
      
      systemDegradationRate.add(success);
      if (!success) {
        errorEscalationRate.add(true);
        if (response.status >= 500) {
          cascadeFailureIndicator.add(1);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - API stress testing with throttling detection
    // API REASON: Test API gateway and rate limiting under extreme concurrent access
    group('API Gateway Stress Test', function() {
      if (Math.random() < 0.8) { // 80% of users hit API endpoints
        const apiEndpoints = [
          '/api/faq/featured',
          '/api/faq/popular', 
          '/api/faq/recent',
          '/api/faq/trending',
        ];
        const endpoint = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)];
        
        const response = http.get(`${BASE_URL}${endpoint}?stress=true&vu=${currentVUs}`, {
          headers: {
            'Accept': 'application/json',
            'X-Stress-Test': 'true',
          },
          timeout: '15s',
          tags: { 
            name: 'stress_api',
            endpoint: endpoint,
          },
        });
        
        const success = check(response, {
          'API responds under stress': (r) => r.status !== 0,
          'API not completely down': (r) => r.status < 500 || r.status === 503, // 503 is acceptable (throttled)
          'API response structured': (r) => r.status < 300 || r.status === 429 || r.status === 503,
        });
        
        systemDegradationRate.add(success);
        if (response.status === 429) {
          // Rate limiting detected - this is expected behavior, not failure
          memoryPressureIndicator.add(75);
        } else if (response.status >= 500 && response.status !== 503) {
          errorEscalationRate.add(true);
          cascadeFailureIndicator.add(1);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Memory pressure simulation through concurrent operations
    // MEMORY REASON: Test system resource management under extreme concurrent load
    group('Memory Pressure Simulation', function() {
      if (isHighStressUser) {
        // Simulate memory-intensive operations
        const bulkOperations = [
          () => http.get(`${BASE_URL}/api/faq/export?format=json&stress=true`),
          () => http.get(`${BASE_URL}/api/faq/analytics?deep=true&stress=true`),
          () => http.post(`${BASE_URL}/api/faq/bulk-search`, JSON.stringify({
            queries: STRESS_TEST_QUERIES.slice(0, 5),
            stress_test: true
          }), { headers: { 'Content-Type': 'application/json' }}),
        ];
        
        const operation = bulkOperations[Math.floor(Math.random() * bulkOperations.length)];
        const response = operation();
        
        const success = check(response, {
          'Memory-intensive operation handled': (r) => r.status < 500,
          'System maintains basic functionality': (r) => r.status !== 0,
        });
        
        if (success) {
          memoryPressureIndicator.add(Math.min(90, currentVUs / 10)); // Scale with VUs
        } else {
          memoryPressureIndicator.add(100); // Maximum pressure on failure
          cascadeFailureIndicator.add(1);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Variable think time based on system stress
    // THINK TIME REASON: Realistic user behavior adaptation to system slowness
    const stressLevel = getLoadLevel(currentVUs);
    let thinkTime;
    
    switch(stressLevel) {
      case 'extreme':
        thinkTime = Math.random() * 15 + 5; // 5-20 seconds (users wait longer when system is slow)
        break;
      case 'high': 
        thinkTime = Math.random() * 8 + 3;  // 3-11 seconds
        break;
      case 'medium':
        thinkTime = Math.random() * 5 + 2;  // 2-7 seconds
        break;
      default:
        thinkTime = Math.random() * 3 + 1;  // 1-4 seconds (normal)
    }
    
    sleep(thinkTime);
  });
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Load level classification helper function
// CLASSIFICATION REASON: Categorise system stress levels for analysis and reporting
function getLoadLevel(currentVUs) {
  const maxLoad = MAX_EXPECTED_LOAD;
  const ratio = currentVUs / maxLoad;
  
  if (ratio >= 0.8) return 'extreme';
  if (ratio >= 0.6) return 'high';
  if (ratio >= 0.4) return 'medium';
  return 'low';
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Breaking point test summary with failure analysis
// SUMMARY REASON: Identify exact breaking point and system failure patterns for capacity planning
export function handleSummary(data) {
  const maxVUs = data.metrics.vus_max.values.max;
  const failureRate = data.metrics.http_req_failed.values.rate * 100;
  const avgResponseTime = data.metrics.http_req_duration.values.avg;
  const p99ResponseTime = data.metrics.http_req_duration.values['p(99)'];
  
  // CONTEXT7 SOURCE: /grafana/k6-docs - Breaking point analysis logic
  // ANALYSIS REASON: Determine system capacity limits and failure characteristics
  let breakingPointAnalysis;
  if (failureRate > 15) {
    breakingPointAnalysis = `BREAKING POINT REACHED: System failed at ${maxVUs} concurrent users with ${failureRate.toFixed(2)}% error rate`;
  } else if (failureRate > 5) {
    breakingPointAnalysis = `DEGRADATION DETECTED: System degrading at ${maxVUs} concurrent users with ${failureRate.toFixed(2)}% error rate`;
  } else if (p99ResponseTime > 5000) {
    breakingPointAnalysis = `RESPONSE TIME BREAKDOWN: System slow but functional at ${maxVUs} concurrent users (p99: ${Math.round(p99ResponseTime)}ms)`;
  } else {
    breakingPointAnalysis = `CAPACITY CONFIRMED: System handled ${maxVUs} concurrent users successfully`;
  }
  
  const stressTestResults = {
    test_type: 'FAQ System Breaking Point Analysis',
    breaking_point_analysis: breakingPointAnalysis,
    max_concurrent_users_tested: maxVUs,
    test_duration_minutes: Math.round(data.state.testRunDurationMs / 60000),
    total_requests: data.metrics.http_reqs.values.count,
    
    // Performance degradation metrics
    overall_failure_rate_percent: failureRate.toFixed(4),
    avg_response_time_ms: Math.round(avgResponseTime),
    p95_response_time_ms: Math.round(data.metrics.http_req_duration.values['p(95)']),
    p99_response_time_ms: Math.round(p99ResponseTime),
    max_response_time_ms: Math.round(data.metrics.http_req_duration.values.max),
    
    // Stress-specific metrics
    system_degradation_rate: data.metrics.system_degradation_rate?.values.rate || 'N/A',
    error_escalation_rate: data.metrics.error_escalation_rate?.values.rate || 'N/A',
    connection_refusal_rate: data.metrics.connection_refusal_rate?.values.rate || 'N/A',
    timeout_occurrence_rate: data.metrics.timeout_occurrence_rate?.values.rate || 'N/A',
    cascade_failures: data.metrics.cascade_failure_count?.values.count || 0,
    max_memory_pressure: data.metrics.memory_pressure_indicator?.values.max || 'N/A',
    
    // Capacity recommendations
    recommended_max_concurrent_users: calculateRecommendedCapacity(failureRate, p99ResponseTime, maxVUs),
    safety_margin_users: Math.floor(maxVUs * 0.7), // 70% of tested capacity
    
    timestamp: new Date().toISOString(),
  };
  
  return {
    'faq-breaking-point-results.json': JSON.stringify(stressTestResults, null, 2),
    stdout: generateBreakingPointSummary(data, stressTestResults),
  };
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Capacity recommendation calculation
// CALCULATION REASON: Provide actionable capacity planning recommendations
function calculateRecommendedCapacity(failureRate, p99ResponseTime, maxVUs) {
  if (failureRate > 15) {
    return Math.floor(maxVUs * 0.5); // 50% of breaking point
  } else if (failureRate > 5) {
    return Math.floor(maxVUs * 0.7); // 70% of degradation point
  } else if (p99ResponseTime > 2000) {
    return Math.floor(maxVUs * 0.8); // 80% of slow response point
  } else {
    return Math.floor(maxVUs * 0.9); // 90% of tested capacity
  }
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Breaking point summary formatting
// FORMATTING REASON: Clear executive summary of system capacity limits and failure modes
function generateBreakingPointSummary(data, results) {
  const maxVUs = data.metrics.vus_max.values.max;
  const failureRate = data.metrics.http_req_failed.values.rate * 100;
  const cascadeFailures = data.metrics.cascade_failure_count?.values.count || 0;
  
  let statusEmoji, statusText;
  if (failureRate > 15) {
    statusEmoji = '🔴';
    statusText = 'BREAKING POINT IDENTIFIED';
  } else if (failureRate > 5) {
    statusEmoji = '🟡'; 
    statusText = 'DEGRADATION THRESHOLD FOUND';
  } else {
    statusEmoji = '🟢';
    statusText = 'CAPACITY LIMIT NOT REACHED';
  }
  
  return `
╔══════════════════════════════════════════════════════════════════════════╗
║                    FAQ SYSTEM BREAKING POINT ANALYSIS                   ║
║               My Private Tutor Online - Stress Test Results              ║
╠══════════════════════════════════════════════════════════════════════════╣
║ ${statusEmoji} STATUS: ${statusText}                                  ║
║ Maximum Users Tested: ${maxVUs}                                             ║
║ Test Duration: ${Math.round(data.state.testRunDurationMs / 60000)} minutes                                                   ║
║ Total Stress Requests: ${data.metrics.http_reqs.values.count}                                    ║
╠══════════════════════════════════════════════════════════════════════════╣
║ SYSTEM PERFORMANCE UNDER STRESS                                          ║
║ • Overall Error Rate: ${failureRate.toFixed(2)}%                                            ║
║ • Average Response Time: ${Math.round(data.metrics.http_req_duration.values.avg)}ms                                   ║
║ • 95th Percentile: ${Math.round(data.metrics.http_req_duration.values['p(95)'])}ms                                        ║
║ • 99th Percentile: ${Math.round(data.metrics.http_req_duration.values['p(99)'])}ms                                        ║
║ • Maximum Response Time: ${Math.round(data.metrics.http_req_duration.values.max)}ms                                   ║
╠══════════════════════════════════════════════════════════════════════════╣
║ FAILURE PATTERN ANALYSIS                                                 ║
║ • System Degradation Rate: ${data.metrics.system_degradation_rate?.values.rate ? (data.metrics.system_degradation_rate.values.rate * 100).toFixed(1) + '%' : 'N/A'}                              ║
║ • Error Escalation Rate: ${data.metrics.error_escalation_rate?.values.rate ? (data.metrics.error_escalation_rate.values.rate * 100).toFixed(1) + '%' : 'N/A'}                                ║
║ • Connection Refusals: ${data.metrics.connection_refusal_rate?.values.rate ? (data.metrics.connection_refusal_rate.values.rate * 100).toFixed(1) + '%' : 'N/A'}                                  ║
║ • Timeout Occurrences: ${data.metrics.timeout_occurrence_rate?.values.rate ? (data.metrics.timeout_occurrence_rate.values.rate * 100).toFixed(1) + '%' : 'N/A'}                                 ║
║ • Cascade Failures: ${cascadeFailures}                                                ║
║ • Memory Pressure Peak: ${data.metrics.memory_pressure_indicator?.values.max || 'N/A'}                                    ║
╠══════════════════════════════════════════════════════════════════════════╣
║ CAPACITY PLANNING RECOMMENDATIONS                                         ║
║ • Recommended Max Users: ${results.recommended_max_concurrent_users}                                      ║
║ • Safety Margin Users: ${results.safety_margin_users}                                        ║
║ • Breaking Point: ${results.breaking_point_analysis}  ║
╚══════════════════════════════════════════════════════════════════════════╝
  `;
}