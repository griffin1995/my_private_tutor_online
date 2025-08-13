// CONTEXT7 SOURCE: /grafana/k6-docs - Ramping VUs scenario for baseline FAQ load testing
// IMPLEMENTATION REASON: Official k6 documentation recommends ramping-vus executor for realistic traffic patterns

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// CONTEXT7 SOURCE: /grafana/k6-docs - Custom metrics for FAQ-specific performance tracking
// METRICS REASON: Track FAQ-specific user journey performance beyond standard HTTP metrics
const faqBrowsingRate = new Rate('faq_browsing_success_rate');
const faqSearchLatency = new Trend('faq_search_duration');
const faqThemeToggleLatency = new Trend('faq_theme_toggle_duration');
const faqOfflineRecoveryLatency = new Trend('faq_offline_recovery_duration');
const faqVoiceSearchLatency = new Trend('faq_voice_search_duration');
const errorCounter = new Counter('faq_error_count');

// CONTEXT7 SOURCE: /grafana/k6-docs - Environment variables for flexible test configuration
// CONFIGURATION REASON: Official k6 pattern for environment-based test configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const TARGET_VUS = parseInt(__ENV.TARGET_VUS) || 500;
const RAMP_DURATION = __ENV.RAMP_DURATION || '2m';
const PLATEAU_DURATION = __ENV.PLATEAU_DURATION || '10m';

// CONTEXT7 SOURCE: /grafana/k6-docs - Performance thresholds for royal client service standards
// THRESHOLD REASON: Enterprise-grade performance requirements for premium tutoring service
export const options = {
  scenarios: {
    faq_baseline_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: RAMP_DURATION, target: TARGET_VUS }, // Ramp-up to target load
        { duration: PLATEAU_DURATION, target: TARGET_VUS }, // Maintain load
        { duration: '2m', target: 0 }, // Ramp-down
      ],
      gracefulRampDown: '30s',
    },
  },
  thresholds: {
    // CONTEXT7 SOURCE: /grafana/k6-docs - HTTP request performance thresholds
    // ROYAL CLIENT STANDARDS: Sub-100ms FAQ response times for premium experience
    http_req_failed: ['rate<0.1%'], // Less than 0.1% error rate for enterprise reliability
    http_req_duration: [
      'p(95)<100', // 95% of FAQ requests under 100ms
      'p(99)<500', // 99% under 500ms for consistent experience
      'avg<50', // Average response time under 50ms
    ],
    
    // FAQ-specific performance thresholds
    faq_browsing_success_rate: ['rate>99.9%'], // Royal client availability standard
    faq_search_duration: [
      'p(95)<100', // Search results under 100ms
      'avg<50', // Average search under 50ms
    ],
    faq_theme_toggle_duration: ['p(95)<200'], // Theme switching under 200ms
    faq_offline_recovery_duration: ['p(95)<5000'], // Offline sync under 5s
    faq_voice_search_duration: ['p(95)<2000'], // Voice search under 2s
    faq_error_count: ['count<10'], // Maximum 10 errors during entire test
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Core Web Vitals equivalent thresholds
    // WEB VITALS REASON: Ensure FAQ system meets Google's performance standards
    'http_req_duration{name:fcp}': ['p(95)<1000'], // First Contentful Paint
    'http_req_duration{name:lcp}': ['p(95)<2500'], // Largest Contentful Paint
  },
  
  // CONTEXT7 SOURCE: /grafana/k6-docs - Tag-based metric filtering
  // TAGGING REASON: Enable detailed performance analysis by FAQ feature
  tags: {
    test_type: 'faq_baseline',
    service: 'my_private_tutor_online',
    component: 'faq_system',
  },
};

// CONTEXT7 SOURCE: /grafana/k6-docs - Test data for realistic FAQ interactions
// DATA REASON: Simulate real user search patterns and content consumption
const FAQ_SEARCH_TERMS = [
  'tutoring rates',
  'qualification requirements',
  'online sessions',
  'royal endorsements',
  'Oxbridge preparation',
  '11+ examination',
  'A-level support',
  'GCSE tutoring',
  'booking process',
  'cancellation policy',
  'payment methods',
  'availability',
  'experience levels',
  'subject specialisation',
];

const FAQ_CATEGORIES = [
  'general',
  'pricing',
  'qualifications',
  'booking',
  'subjects',
  'policies',
  'technical',
];

// CONTEXT7 SOURCE: /grafana/k6-docs - Realistic user behaviour simulation
// BEHAVIOUR REASON: Model actual FAQ usage patterns for accurate load testing
export default function() {
  group('FAQ Baseline Load Test', function() {
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - FAQ homepage performance test
    // HOMEPAGE REASON: Initial FAQ page load is critical for user experience
    group('FAQ Homepage Load', function() {
      const response = http.get(`${BASE_URL}/faq`, {
        headers: {
          'User-Agent': 'LoadTest-FAQ-Browser/1.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.5',
        },
        tags: { name: 'faq_homepage' },
      });
      
      const success = check(response, {
        'FAQ homepage loads successfully': (r) => r.status === 200,
        'FAQ homepage loads in <2s': (r) => r.timings.duration < 2000,
        'FAQ homepage contains search': (r) => r.body.includes('search'),
        'FAQ homepage contains categories': (r) => r.body.includes('category'),
      });
      
      faqBrowsingRate.add(success);
      if (!success) errorCounter.add(1);
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - FAQ search performance test
    // SEARCH REASON: Search functionality is core to FAQ user experience
    group('FAQ Search Performance', function() {
      const searchTerm = FAQ_SEARCH_TERMS[Math.floor(Math.random() * FAQ_SEARCH_TERMS.length)];
      const startTime = Date.now();
      
      const response = http.get(`${BASE_URL}/api/faq/search?q=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        tags: { name: 'faq_search', search_term: searchTerm },
      });
      
      const searchDuration = Date.now() - startTime;
      faqSearchLatency.add(searchDuration);
      
      const success = check(response, {
        'FAQ search returns results': (r) => r.status === 200,
        'FAQ search has results array': (r) => {
          try {
            const data = JSON.parse(r.body);
            return Array.isArray(data.results);
          } catch {
            return false;
          }
        },
        'FAQ search responds quickly': (r) => r.timings.duration < 100,
      });
      
      if (!success) errorCounter.add(1);
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - FAQ category browsing test
    // CATEGORY REASON: Category browsing is primary FAQ navigation pattern
    group('FAQ Category Browsing', function() {
      const category = FAQ_CATEGORIES[Math.floor(Math.random() * FAQ_CATEGORIES.length)];
      
      const response = http.get(`${BASE_URL}/api/faq/category/${category}`, {
        headers: {
          'Accept': 'application/json',
        },
        tags: { name: 'faq_category', category: category },
      });
      
      const success = check(response, {
        'FAQ category loads': (r) => r.status === 200,
        'FAQ category has items': (r) => {
          try {
            const data = JSON.parse(r.body);
            return data.items && data.items.length > 0;
          } catch {
            return false;
          }
        },
      });
      
      if (!success) errorCounter.add(1);
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - FAQ theme toggle performance test
    // THEME REASON: Theme switching is part of premium FAQ user experience
    group('FAQ Theme Toggle', function() {
      if (Math.random() < 0.3) { // 30% of users toggle theme
        const startTime = Date.now();
        
        const response = http.post(`${BASE_URL}/api/faq/theme`, JSON.stringify({
          theme: Math.random() > 0.5 ? 'dark' : 'light'
        }), {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { name: 'faq_theme_toggle' },
        });
        
        const toggleDuration = Date.now() - startTime;
        faqThemeToggleLatency.add(toggleDuration);
        
        const success = check(response, {
          'Theme toggle succeeds': (r) => r.status === 200 || r.status === 204,
        });
        
        if (!success) errorCounter.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - FAQ offline recovery simulation
    // OFFLINE REASON: Test resilience during network instability for mobile users
    group('FAQ Offline Recovery', function() {
      if (Math.random() < 0.1) { // 10% simulate offline recovery scenario
        const startTime = Date.now();
        
        // Simulate sync after connectivity restoration
        const response = http.post(`${BASE_URL}/api/faq/sync`, JSON.stringify({
          lastSync: Date.now() - 30000, // 30 seconds ago
        }), {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { name: 'faq_offline_sync' },
        });
        
        const syncDuration = Date.now() - startTime;
        faqOfflineRecoveryLatency.add(syncDuration);
        
        const success = check(response, {
          'Offline sync completes': (r) => r.status === 200,
        });
        
        if (!success) errorCounter.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - FAQ voice search performance test
    // VOICE SEARCH REASON: Premium accessibility feature for royal client service
    group('FAQ Voice Search', function() {
      if (Math.random() < 0.05) { // 5% use voice search
        const startTime = Date.now();
        
        const response = http.post(`${BASE_URL}/api/faq/voice-search`, JSON.stringify({
          audioData: 'base64_encoded_audio_placeholder',
          language: 'en-GB',
        }), {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { name: 'faq_voice_search' },
        });
        
        const voiceSearchDuration = Date.now() - startTime;
        faqVoiceSearchLatency.add(voiceSearchDuration);
        
        const success = check(response, {
          'Voice search processes': (r) => r.status === 200 || r.status === 202,
        });
        
        if (!success) errorCounter.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Realistic user think time
    // THINK TIME REASON: Model actual user reading and interaction patterns
    sleep(Math.random() * 3 + 1); // 1-4 seconds think time
  });
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Test lifecycle hooks for monitoring
// LIFECYCLE REASON: Provide test execution visibility and performance insights
export function handleSummary(data) {
  // CONTEXT7 SOURCE: /grafana/k6-docs - Custom summary for FAQ load test results
  // SUMMARY REASON: Generate actionable performance insights for royal client standards
  
  const faqMetrics = {
    test_type: 'FAQ Baseline Load Test',
    duration: data.state.testRunDurationMs,
    vus_max: data.metrics.vus_max.values.max,
    iterations: data.metrics.iterations.values.count,
    http_requests: data.metrics.http_reqs.values.count,
    http_req_duration_avg: data.metrics.http_req_duration.values.avg,
    http_req_duration_p95: data.metrics.http_req_duration.values['p(95)'],
    http_req_failed_rate: data.metrics.http_req_failed.values.rate,
    faq_search_avg: data.metrics.faq_search_duration?.values.avg || 'N/A',
    faq_theme_toggle_p95: data.metrics.faq_theme_toggle_duration?.values['p(95)'] || 'N/A',
    errors: data.metrics.faq_error_count?.values.count || 0,
    timestamp: new Date().toISOString(),
  };
  
  return {
    'faq-baseline-results.json': JSON.stringify(faqMetrics, null, 2),
    stdout: generateFAQSummary(data),
  };
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Custom summary formatting function
// FORMATTING REASON: Present FAQ performance results in readable format for stakeholders
function generateFAQSummary(data) {
  return `
╔══════════════════════════════════════════════════════════════╗
║              FAQ BASELINE LOAD TEST RESULTS                 ║
╠══════════════════════════════════════════════════════════════╣
║ Test Duration: ${Math.round(data.state.testRunDurationMs / 1000)}s                                    ║
║ Peak VUs: ${data.metrics.vus_max.values.max}                                          ║
║ Total Requests: ${data.metrics.http_reqs.values.count}                               ║
╠══════════════════════════════════════════════════════════════╣
║ PERFORMANCE METRICS (Royal Client Standards)                ║
║ • HTTP Req Duration (avg): ${Math.round(data.metrics.http_req_duration.values.avg)}ms               ║
║ • HTTP Req Duration (p95): ${Math.round(data.metrics.http_req_duration.values['p(95)'])}ms               ║
║ • HTTP Error Rate: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(3)}%                     ║
║ • FAQ Search (avg): ${data.metrics.faq_search_duration?.values.avg ? Math.round(data.metrics.faq_search_duration.values.avg) + 'ms' : 'N/A'}                        ║
║ • Theme Toggle (p95): ${data.metrics.faq_theme_toggle_duration?.values['p(95)'] ? Math.round(data.metrics.faq_theme_toggle_duration.values['p(95)']) + 'ms' : 'N/A'}                      ║
║ • Total Errors: ${data.metrics.faq_error_count?.values.count || 0}                                      ║
╠══════════════════════════════════════════════════════════════╣
║ STATUS: ${data.metrics.http_req_failed.values.rate < 0.001 && data.metrics.http_req_duration.values['p(95)'] < 500 ? 'ROYAL CLIENT READY ✓' : 'NEEDS OPTIMIZATION ⚠'}             ║
╚══════════════════════════════════════════════════════════════╝
  `;
}