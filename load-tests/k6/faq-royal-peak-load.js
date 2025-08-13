// CONTEXT7 SOURCE: /grafana/k6-docs - Ramping arrival rate executor for royal client peak load simulation
// IMPLEMENTATION REASON: Official k6 pattern for simulating exam period traffic spikes with royal endorsement announcements

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

// CONTEXT7 SOURCE: /grafana/k6-docs - Advanced metrics for royal client performance monitoring
// METRICS REASON: Track premium service performance during high-value client peak usage
const royalClientSuccessRate = new Rate('royal_client_success_rate');
const premiumFeatureLatency = new Trend('premium_feature_duration');
const concurrentRoyalUsers = new Gauge('concurrent_royal_users');
const examPeriodErrorRate = new Rate('exam_period_error_rate');
const royalEndorsementClickRate = new Rate('royal_endorsement_click_rate');
const oxbridgePrepAccessRate = new Rate('oxbridge_prep_access_rate');

// CONTEXT7 SOURCE: /grafana/k6-docs - Environment configuration for royal client peak testing
// CONFIGURATION REASON: Flexible configuration for different peak scenarios and client tiers
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const ROYAL_CLIENT_RATIO = parseFloat(__ENV.ROYAL_CLIENT_RATIO) || 0.3; // 30% royal clients
const PEAK_ARRIVAL_RATE = parseInt(__ENV.PEAK_ARRIVAL_RATE) || 100; // Peak iterations/second
const EXAM_SEASON_MULTIPLIER = parseFloat(__ENV.EXAM_SEASON_MULTIPLIER) || 2.5;

// CONTEXT7 SOURCE: /grafana/k6-docs - Royal client peak load scenario configuration
// SCENARIO REASON: Model realistic royal client usage during exam periods and endorsement announcements
export const options = {
  scenarios: {
    royal_client_peak: {
      executor: 'ramping-arrival-rate',
      startRate: 10, // Start with 10 iterations/second
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 1000, // Scale to 1000 concurrent royal clients
      stages: [
        // Gradual morning increase (exam announcement period)
        { duration: '5m', target: 25 },
        { duration: '10m', target: 50 },
        
        // Royal endorsement announcement spike
        { duration: '2m', target: PEAK_ARRIVAL_RATE },
        
        // Sustained high load (exam booking rush)
        { duration: '15m', target: PEAK_ARRIVAL_RATE * EXAM_SEASON_MULTIPLIER },
        
        // Afternoon plateau (continued premium bookings)
        { duration: '20m', target: PEAK_ARRIVAL_RATE * 1.5 },
        
        // Evening wind-down
        { duration: '10m', target: 50 },
        { duration: '5m', target: 10 },
      ],
      gracefulRampDown: '60s',
    },
  },
  
  // CONTEXT7 SOURCE: /grafana/k6-docs - Stringent thresholds for royal client service standards
  // THRESHOLD REASON: Ultra-premium performance requirements for royal endorsement-backed service
  thresholds: {
    // Core HTTP performance for royal clients
    http_req_failed: ['rate<0.01%'], // 99.99% availability for royal clients
    http_req_duration: [
      'p(95)<50', // 95% of requests under 50ms for premium experience
      'p(99)<200', // 99% under 200ms for consistency
      'avg<25', // Average under 25ms for royal client expectations
    ],
    
    // Royal client specific thresholds
    royal_client_success_rate: ['rate>99.95%'], // Nearly perfect success rate
    premium_feature_duration: [
      'p(95)<100', // Premium features under 100ms
      'avg<40', // Average premium feature response under 40ms
    ],
    concurrent_royal_users: ['max<1000'], // Handle up to 1000 royal clients
    exam_period_error_rate: ['rate<0.005%'], // Minimal errors during exam periods
    royal_endorsement_click_rate: ['rate>95%'], // High engagement with endorsements
    oxbridge_prep_access_rate: ['rate>99%'], // Critical Oxbridge access availability
    
    // Premium service level agreements
    'http_req_duration{client_type:royal}': ['p(99)<100'],
    'http_req_duration{service:oxbridge_prep}': ['p(95)<75'],
    'http_req_duration{service:royal_endorsement}': ['p(99)<150'],
  },
  
  tags: {
    test_type: 'royal_peak_load',
    service: 'my_private_tutor_online',
    client_tier: 'royal_premium',
    scenario: 'exam_period_endorsement_spike',
  },
};

// CONTEXT7 SOURCE: /grafana/k6-docs - Royal client premium search terms and services
// DATA REASON: Model actual royal client FAQ usage patterns and premium service enquiries
const ROYAL_CLIENT_QUERIES = [
  'Oxbridge preparation specialists',
  'royal tutors with palace experience',
  'Eton preparation programmes',
  'Cambridge entrance coaching',
  'Oxford interview preparation',
  'royal endorsement verification',
  'elite family referrals',
  'bespoke tutoring packages',
  'residential tutoring arrangements',
  'international royal family services',
  'diplomatic family education',
  'exclusive tutoring networks',
];

const PREMIUM_FAQ_CATEGORIES = [
  'royal-endorsements',
  'oxbridge-preparation',
  'elite-tutors',
  'bespoke-services',
  'confidentiality-agreements',
  'international-services',
  'residential-programmes',
];

const ROYAL_CLIENT_USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', // Premium Mac
  'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1', // Royal iPad
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1', // Premium iPhone
];

// CONTEXT7 SOURCE: /grafana/k6-docs - Royal client peak load simulation with premium features
// SIMULATION REASON: Test FAQ system under royal client usage patterns during peak periods
export default function() {
  const isRoyalClient = Math.random() < ROYAL_CLIENT_RATIO;
  const clientType = isRoyalClient ? 'royal' : 'standard';
  const userAgent = isRoyalClient 
    ? ROYAL_CLIENT_USER_AGENTS[Math.floor(Math.random() * ROYAL_CLIENT_USER_AGENTS.length)]
    : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
  
  // Update concurrent royal users gauge
  if (isRoyalClient) {
    concurrentRoyalUsers.add(1);
  }
  
  group('Royal Client Peak Load Test', function() {
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Premium FAQ homepage with royal endorsements
    // HOMEPAGE REASON: Royal clients expect immediate access to premium content and endorsements
    group('Royal FAQ Homepage Access', function() {
      const response = http.get(`${BASE_URL}/faq?tier=${clientType}`, {
        headers: {
          'User-Agent': userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9',
          'Cache-Control': 'no-cache',
          'X-Client-Tier': clientType,
        },
        tags: { 
          name: 'royal_faq_homepage',
          client_type: clientType,
        },
      });
      
      const success = check(response, {
        'Royal FAQ loads successfully': (r) => r.status === 200,
        'Royal FAQ loads under 100ms': (r) => r.timings.duration < 100,
        'Royal endorsements visible': (r) => r.body.includes('Royal') || r.body.includes('endorsed'),
        'Oxbridge preparation featured': (r) => r.body.includes('Oxbridge') || r.body.includes('Cambridge') || r.body.includes('Oxford'),
      });
      
      royalClientSuccessRate.add(success);
      if (isRoyalClient && response.body.includes('Royal')) {
        royalEndorsementClickRate.add(true);
      }
      
      if (!success) {
        examPeriodErrorRate.add(true);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Premium search with royal client priority
    // SEARCH REASON: Royal clients receive priority search results and faster response times
    group('Royal Client Priority Search', function() {
      const query = isRoyalClient 
        ? ROYAL_CLIENT_QUERIES[Math.floor(Math.random() * ROYAL_CLIENT_QUERIES.length)]
        : 'general tutoring enquiry';
      
      const startTime = Date.now();
      const response = http.get(`${BASE_URL}/api/faq/search?q=${encodeURIComponent(query)}&tier=${clientType}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Client-Tier': clientType,
          'X-Priority': isRoyalClient ? 'royal' : 'standard',
        },
        tags: { 
          name: 'royal_priority_search',
          client_type: clientType,
          query_type: isRoyalClient ? 'royal' : 'standard',
        },
      });
      
      const searchDuration = Date.now() - startTime;
      premiumFeatureLatency.add(searchDuration);
      
      const success = check(response, {
        'Royal search returns results': (r) => r.status === 200,
        'Royal search has priority results': (r) => {
          if (!isRoyalClient) return true;
          try {
            const data = JSON.parse(r.body);
            return data.priority === 'royal' || data.tier === 'premium';
          } catch {
            return false;
          }
        },
        'Search responds within SLA': (r) => r.timings.duration < (isRoyalClient ? 50 : 100),
      });
      
      if (!success) {
        examPeriodErrorRate.add(true);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Oxbridge preparation FAQ access test
    // OXBRIDGE REASON: Core service for royal clients, must maintain perfect availability
    group('Oxbridge Preparation Access', function() {
      if (isRoyalClient || Math.random() < 0.4) { // 40% of standard users also access
        const response = http.get(`${BASE_URL}/api/faq/category/oxbridge-preparation`, {
          headers: {
            'Accept': 'application/json',
            'X-Client-Tier': clientType,
            'X-Service': 'oxbridge_prep',
          },
          tags: { 
            name: 'oxbridge_prep_access',
            client_type: clientType,
            service: 'oxbridge_prep',
          },
        });
        
        const success = check(response, {
          'Oxbridge FAQ accessible': (r) => r.status === 200,
          'Oxbridge content comprehensive': (r) => {
            try {
              const data = JSON.parse(r.body);
              return data.items && data.items.length >= 10; // Minimum content requirement
            } catch {
              return false;
            }
          },
          'Oxbridge response time acceptable': (r) => r.timings.duration < 75,
        });
        
        oxbridgePrepAccessRate.add(success);
        if (!success) {
          examPeriodErrorRate.add(true);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Royal endorsement verification test
    // ENDORSEMENT REASON: Critical trust feature for royal client validation
    group('Royal Endorsement Verification', function() {
      if (isRoyalClient && Math.random() < 0.8) { // 80% of royal clients verify endorsements
        const response = http.get(`${BASE_URL}/api/faq/royal-endorsements`, {
          headers: {
            'Accept': 'application/json',
            'X-Client-Tier': 'royal',
            'X-Verification': 'required',
          },
          tags: { 
            name: 'royal_endorsement_verification',
            service: 'royal_endorsement',
          },
        });
        
        const success = check(response, {
          'Royal endorsements load': (r) => r.status === 200,
          'Endorsements are verified': (r) => {
            try {
              const data = JSON.parse(r.body);
              return data.verified === true && data.endorsements.length > 0;
            } catch {
              return false;
            }
          },
          'Endorsement verification fast': (r) => r.timings.duration < 150,
        });
        
        royalEndorsementClickRate.add(success);
        if (!success) {
          examPeriodErrorRate.add(true);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Premium booking enquiry simulation
    // BOOKING REASON: High-value royal client booking process must be flawless
    group('Premium Booking Enquiry', function() {
      if (isRoyalClient && Math.random() < 0.6) { // 60% of royal clients make booking enquiries
        const response = http.post(`${BASE_URL}/api/faq/booking-enquiry`, JSON.stringify({
          clientTier: 'royal',
          serviceType: 'oxbridge-preparation',
          urgency: 'high',
          budget: 'premium',
          confidentiality: 'required',
        }), {
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Tier': 'royal',
          },
          tags: { 
            name: 'premium_booking_enquiry',
            client_type: 'royal',
          },
        });
        
        const success = check(response, {
          'Booking enquiry accepted': (r) => r.status === 200 || r.status === 202,
          'Priority booking confirmed': (r) => {
            try {
              const data = JSON.parse(r.body);
              return data.priority === 'royal' || data.status === 'priority';
            } catch {
              return false;
            }
          },
        });
        
        if (!success) {
          examPeriodErrorRate.add(true);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - International royal client support
    // INTERNATIONAL REASON: Royal families globally require consistent service quality
    group('International Royal Support', function() {
      if (isRoyalClient && Math.random() < 0.2) { // 20% international royal clients
        const response = http.get(`${BASE_URL}/api/faq/international-services`, {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en-GB,en;q=0.9,fr;q=0.8',
            'X-Client-Tier': 'royal',
            'X-Location': 'international',
          },
          tags: { 
            name: 'international_royal_support',
          },
        });
        
        const success = check(response, {
          'International support available': (r) => r.status === 200,
          'Multi-language support indicated': (r) => {
            return r.body.includes('international') || r.body.includes('language');
          },
        });
        
        if (!success) {
          examPeriodErrorRate.add(true);
        }
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Realistic royal client think time
    // THINK TIME REASON: Royal clients typically spend more time reviewing premium content
    const thinkTime = isRoyalClient 
      ? Math.random() * 8 + 2  // 2-10 seconds for royal clients (more deliberate)
      : Math.random() * 3 + 1; // 1-4 seconds for standard clients
    
    sleep(thinkTime);
  });
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Royal client performance summary generation
// SUMMARY REASON: Provide detailed insights for premium service performance during peak load
export function handleSummary(data) {
  const royalClientMetrics = {
    test_type: 'Royal Client Peak Load Test',
    test_scenario: 'Exam Period + Royal Endorsement Spike',
    duration_minutes: Math.round(data.state.testRunDurationMs / 60000),
    peak_concurrent_users: data.metrics.vus_max.values.max,
    total_iterations: data.metrics.iterations.values.count,
    total_requests: data.metrics.http_reqs.values.count,
    
    // Core performance metrics
    avg_response_time_ms: Math.round(data.metrics.http_req_duration.values.avg),
    p95_response_time_ms: Math.round(data.metrics.http_req_duration.values['p(95)']),
    p99_response_time_ms: Math.round(data.metrics.http_req_duration.values['p(99)']),
    error_rate_percent: (data.metrics.http_req_failed.values.rate * 100).toFixed(4),
    
    // Royal client specific metrics
    royal_client_success_rate: data.metrics.royal_client_success_rate?.values.rate || 'N/A',
    premium_feature_avg_ms: data.metrics.premium_feature_duration?.values.avg || 'N/A',
    concurrent_royal_users_max: data.metrics.concurrent_royal_users?.values.max || 'N/A',
    exam_period_error_rate: data.metrics.exam_period_error_rate?.values.rate || 'N/A',
    royal_endorsement_engagement: data.metrics.royal_endorsement_click_rate?.values.rate || 'N/A',
    oxbridge_access_success_rate: data.metrics.oxbridge_prep_access_rate?.values.rate || 'N/A',
    
    // Service level achievement
    royal_sla_met: data.metrics.http_req_duration.values['p(99)'] < 100,
    availability_target_met: data.metrics.http_req_failed.values.rate < 0.0001,
    premium_performance_target_met: data.metrics.premium_feature_duration?.values.avg < 40,
    
    timestamp: new Date().toISOString(),
  };
  
  return {
    'royal-peak-load-results.json': JSON.stringify(royalClientMetrics, null, 2),
    stdout: generateRoyalClientSummary(data),
  };
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Royal client performance summary formatting
// FORMATTING REASON: Executive summary for royal client service performance validation
function generateRoyalClientSummary(data) {
  const royalSLAMet = data.metrics.http_req_duration.values['p(99)'] < 100;
  const availabilityMet = data.metrics.http_req_failed.values.rate < 0.0001;
  const premiumPerformanceMet = (data.metrics.premium_feature_duration?.values.avg || Infinity) < 40;
  
  const overallStatus = royalSLAMet && availabilityMet && premiumPerformanceMet 
    ? 'ROYAL SERVICE STANDARDS ACHIEVED ✓' 
    : 'PERFORMANCE OPTIMIZATION REQUIRED ⚠';
  
  return `
╔══════════════════════════════════════════════════════════════════════════╗
║                    ROYAL CLIENT PEAK LOAD TEST RESULTS                  ║
║                  My Private Tutor Online - FAQ System                   ║
╠══════════════════════════════════════════════════════════════════════════╣
║ Test Scenario: Exam Period + Royal Endorsement Announcement Spike       ║
║ Duration: ${Math.round(data.state.testRunDurationMs / 60000)} minutes                                                    ║
║ Peak Concurrent Users: ${data.metrics.vus_max.values.max}                                           ║
║ Total Royal Client Interactions: ${data.metrics.iterations.values.count}                         ║
╠══════════════════════════════════════════════════════════════════════════╣
║ CORE PERFORMANCE METRICS                                                 ║
║ • Average Response Time: ${Math.round(data.metrics.http_req_duration.values.avg)}ms                                  ║
║ • 95th Percentile: ${Math.round(data.metrics.http_req_duration.values['p(95)'])}ms (Target: <50ms)                      ║
║ • 99th Percentile: ${Math.round(data.metrics.http_req_duration.values['p(99)'])}ms (Target: <100ms)                     ║
║ • Error Rate: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(4)}% (Target: <0.01%)                         ║
╠══════════════════════════════════════════════════════════════════════════╣
║ ROYAL CLIENT SERVICE METRICS                                             ║
║ • Royal Client Success Rate: ${data.metrics.royal_client_success_rate?.values.rate ? (data.metrics.royal_client_success_rate.values.rate * 100).toFixed(2) + '%' : 'N/A'}                           ║
║ • Premium Feature Latency: ${data.metrics.premium_feature_duration?.values.avg ? Math.round(data.metrics.premium_feature_duration.values.avg) + 'ms' : 'N/A'}                             ║
║ • Royal Endorsement Engagement: ${data.metrics.royal_endorsement_click_rate?.values.rate ? (data.metrics.royal_endorsement_click_rate.values.rate * 100).toFixed(1) + '%' : 'N/A'}                      ║
║ • Oxbridge Access Success: ${data.metrics.oxbridge_prep_access_rate?.values.rate ? (data.metrics.oxbridge_prep_access_rate.values.rate * 100).toFixed(1) + '%' : 'N/A'}                         ║
║ • Max Concurrent Royal Users: ${data.metrics.concurrent_royal_users?.values.max || 'N/A'}                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║ SERVICE LEVEL AGREEMENT STATUS                                           ║
║ • Royal Client SLA (<100ms p99): ${royalSLAMet ? '✓ ACHIEVED' : '✗ FAILED'}                       ║
║ • Availability Target (>99.99%): ${availabilityMet ? '✓ ACHIEVED' : '✗ FAILED'}                   ║
║ • Premium Performance (<40ms avg): ${premiumPerformanceMet ? '✓ ACHIEVED' : '✗ FAILED'}              ║
╠══════════════════════════════════════════════════════════════════════════╣
║ OVERALL STATUS: ${overallStatus}                    ║
╚══════════════════════════════════════════════════════════════════════════╝
  `;
}