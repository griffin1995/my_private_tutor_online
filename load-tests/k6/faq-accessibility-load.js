// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility-focused load testing with specialized user agent simulation
// IMPLEMENTATION REASON: Official k6 pattern for testing accessibility features under concurrent usage

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility-specific performance metrics
// METRICS REASON: Track accessibility feature performance under concurrent screen reader and assistive technology usage
const screenReaderCompatibilityRate = new Rate('screen_reader_compatibility_rate');
const keyboardNavigationResponseTime = new Trend('keyboard_navigation_response_time');
const highContrastModeLatency = new Trend('high_contrast_mode_latency');
const focusManagementAccuracy = new Rate('focus_management_accuracy');
const ariaLabelConsistencyRate = new Rate('aria_label_consistency_rate');
const voiceControlResponseTime = new Trend('voice_control_response_time');
const assistiveTechErrorCount = new Counter('assistive_tech_error_count');
const accessibilityComplianceGauge = new Gauge('accessibility_compliance_level');

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility user simulation configuration
// CONFIGURATION REASON: Model realistic assistive technology usage patterns and concurrent accessibility needs
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const SCREEN_READER_USERS = parseFloat(__ENV.SCREEN_READER_RATIO) || 0.15; // 15% screen reader users
const KEYBOARD_ONLY_USERS = parseFloat(__ENV.KEYBOARD_ONLY_RATIO) || 0.25; // 25% keyboard-only users
const HIGH_CONTRAST_USERS = parseFloat(__ENV.HIGH_CONTRAST_RATIO) || 0.20; // 20% high contrast users
const VOICE_CONTROL_USERS = parseFloat(__ENV.VOICE_CONTROL_RATIO) || 0.10; // 10% voice control users

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility load testing scenario with realistic assistive technology patterns
// SCENARIO REASON: Test FAQ accessibility features under concurrent usage by users with disabilities
export const options = {
  scenarios: {
    accessibility_concurrent_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '3m', target: 50 },   // Initial accessibility load
        { duration: '5m', target: 150 },  // Peak accessibility usage
        { duration: '10m', target: 300 }, // Sustained accessibility load
        { duration: '5m', target: 150 },  // Wind down
        { duration: '2m', target: 0 },    // Complete
      ],
      gracefulRampDown: '30s',
    },
  },
  
  // CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility performance thresholds for inclusive design
  // THRESHOLD REASON: Ensure accessibility features maintain performance under concurrent usage
  thresholds: {
    // Core accessibility performance
    http_req_failed: ['rate<0.1%'], // High reliability for assistive technology users
    http_req_duration: [
      'p(95)<200', // Accessibility features must be responsive
      'p(99)<500', // Screen readers need predictable timing
      'avg<100',   // Average response for smooth assistive tech interaction
    ],
    
    // Accessibility-specific thresholds
    screen_reader_compatibility_rate: ['rate>99.5%'], // Nearly perfect screen reader compatibility
    keyboard_navigation_response_time: [
      'p(95)<150', // Keyboard navigation must be immediate
      'avg<75',    // Average keyboard response under 75ms
    ],
    high_contrast_mode_latency: ['p(95)<200'], // High contrast switching under 200ms
    focus_management_accuracy: ['rate>99%'],   // Focus management must be reliable
    aria_label_consistency_rate: ['rate>99%'], // ARIA labels must be consistent
    voice_control_response_time: ['p(95)<300'], // Voice control under 300ms
    assistive_tech_error_count: ['count<5'],   // Maximum 5 accessibility errors
    accessibility_compliance_level: ['max>95'], // 95%+ accessibility compliance
    
    // Inclusive performance targets
    'http_req_duration{assistive_tech:screen_reader}': ['p(95)<150'],
    'http_req_duration{assistive_tech:keyboard_only}': ['p(95)<100'],
    'http_req_duration{assistive_tech:voice_control}': ['p(95)<300'],
    'http_req_duration{assistive_tech:high_contrast}': ['p(95)<200'],
  },
  
  tags: {
    test_type: 'accessibility_load',
    service: 'my_private_tutor_online',
    component: 'faq_system',
    compliance: 'wcag_2_1_aa',
  },
};

// CONTEXT7 SOURCE: /grafana/k6-docs - Assistive technology user agent simulation
// USER AGENT REASON: Realistic simulation of screen readers and assistive technology requests
const ASSISTIVE_TECH_USER_AGENTS = {
  screenReader: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0 NVDA/2023.3',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 JAWS/2024',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 VoiceOver',
  ],
  keyboardOnly: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0 KeyboardNavigation',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 KeyboardOnly',
  ],
  voiceControl: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 DragonNaturallySpeaking',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 VoiceControl',
  ],
  highContrast: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0 HighContrast',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 HighContrastMode',
  ],
};

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility-focused search terms and interactions
// DATA REASON: Model actual accessibility user search patterns and assistive technology queries
const ACCESSIBILITY_SEARCH_QUERIES = [
  'keyboard shortcuts for tutoring platform',
  'screen reader compatible tutoring sessions',
  'high contrast mode FAQ',
  'voice navigation help',
  'accessibility features tutorial',
  'visual impairment tutoring support',
  'hearing impairment accommodation',
  'motor disability tutoring options',
  'assistive technology compatibility',
  'accessible booking process',
];

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility load testing with assistive technology simulation
// TESTING REASON: Comprehensive accessibility testing under concurrent usage scenarios
export default function() {
  // Determine user assistive technology needs
  const userType = determineAssistiveTechType();
  const userAgent = getUserAgent(userType);
  
  group('FAQ Accessibility Load Test', function() {
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Accessible homepage testing with screen reader simulation
    // HOMEPAGE REASON: Entry point must be accessible to users with disabilities under load
    group('Accessible Homepage Load', function() {
      const response = http.get(`${BASE_URL}/faq?accessibility=enhanced&mode=${userType}`, {
        headers: {
          'User-Agent': userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9',
          'X-Assistive-Tech': userType,
          'X-Accessibility-Mode': 'true',
          ...(userType === 'high_contrast' && { 'X-High-Contrast': 'true' }),
        },
        tags: { 
          name: 'accessible_homepage',
          assistive_tech: userType,
        },
      });
      
      const success = check(response, {
        'Accessible homepage loads': (r) => r.status === 200,
        'Homepage loads quickly for assistive tech': (r) => r.timings.duration < 2000,
        'Contains proper heading structure': (r) => r.body.includes('<h1') && r.body.includes('<h2'),
        'Has skip links': (r) => r.body.includes('skip') || r.body.includes('main-content'),
        'Contains ARIA landmarks': (r) => r.body.includes('role=') || r.body.includes('aria-'),
        'Has alt text indicators': (r) => r.body.includes('alt=') || r.body.includes('aria-label'),
      });
      
      screenReaderCompatibilityRate.add(success);
      if (!success) assistiveTechErrorCount.add(1);
      
      // Check specific accessibility features
      if (userType === 'screen_reader') {
        const ariaCompliance = response.body.includes('aria-describedby') && 
                              response.body.includes('aria-label') && 
                              response.body.includes('role=');
        ariaLabelConsistencyRate.add(ariaCompliance);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Keyboard navigation performance testing
    // KEYBOARD REASON: Keyboard-only users need responsive navigation under concurrent load
    group('Keyboard Navigation Performance', function() {
      if (userType === 'keyboard_only' || userType === 'screen_reader') {
        const startTime = Date.now();
        
        // Simulate keyboard navigation through FAQ categories
        const response = http.get(`${BASE_URL}/api/faq/keyboard-navigation`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Navigation-Method': 'keyboard',
            'X-Assistive-Tech': userType,
          },
          tags: { 
            name: 'keyboard_navigation',
            assistive_tech: userType,
          },
        });
        
        const navigationTime = Date.now() - startTime;
        keyboardNavigationResponseTime.add(navigationTime);
        
        const success = check(response, {
          'Keyboard navigation responds': (r) => r.status === 200,
          'Navigation data structure correct': (r) => {
            try {
              const data = JSON.parse(r.body);
              return data.focusOrder && Array.isArray(data.focusOrder);
            } catch {
              return false;
            }
          },
          'Focus management data available': (r) => r.body.includes('focusable') || r.body.includes('tabindex'),
        });
        
        focusManagementAccuracy.add(success);
        if (!success) assistiveTechErrorCount.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Screen reader accessible search testing
    // SEARCH REASON: Search functionality must be fully accessible under concurrent screen reader usage
    group('Screen Reader Accessible Search', function() {
      if (userType === 'screen_reader' || Math.random() < 0.3) {
        const query = ACCESSIBILITY_SEARCH_QUERIES[Math.floor(Math.random() * ACCESSIBILITY_SEARCH_QUERIES.length)];
        
        const response = http.get(`${BASE_URL}/api/faq/search?q=${encodeURIComponent(query)}&accessible=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Screen-Reader': userType === 'screen_reader' ? 'true' : 'false',
            'X-Accessibility-Enhanced': 'true',
          },
          tags: { 
            name: 'accessible_search',
            assistive_tech: userType,
          },
        });
        
        const success = check(response, {
          'Accessible search returns results': (r) => r.status === 200,
          'Search results have ARIA structure': (r) => {
            try {
              const data = JSON.parse(r.body);
              return data.results && data.accessibility && data.accessibility.ariaLabels;
            } catch {
              return false;
            }
          },
          'Screen reader announcements included': (r) => r.body.includes('announcement') || r.body.includes('aria-live'),
        });
        
        screenReaderCompatibilityRate.add(success);
        if (!success) assistiveTechErrorCount.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - High contrast mode performance testing
    // HIGH CONTRAST REASON: Visual accessibility feature performance under concurrent usage
    group('High Contrast Mode Performance', function() {
      if (userType === 'high_contrast' || Math.random() < 0.2) {
        const startTime = Date.now();
        
        const response = http.post(`${BASE_URL}/api/faq/theme`, JSON.stringify({
          theme: 'high_contrast',
          accessibility: true,
          contrast_ratio: 'wcag_aaa'
        }), {
          headers: {
            'Content-Type': 'application/json',
            'X-High-Contrast': 'true',
            'X-Accessibility-Mode': 'visual',
          },
          tags: { 
            name: 'high_contrast_toggle',
            assistive_tech: 'high_contrast',
          },
        });
        
        const contrastTime = Date.now() - startTime;
        highContrastModeLatency.add(contrastTime);
        
        const success = check(response, {
          'High contrast mode activates': (r) => r.status === 200 || r.status === 204,
          'Contrast settings applied': (r) => {
            try {
              const data = JSON.parse(r.body || '{}');
              return data.contrast_ratio >= 7.1 || r.status === 204; // WCAG AAA compliance
            } catch {
              return r.status === 204;
            }
          },
        });
        
        if (!success) assistiveTechErrorCount.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Voice control accessibility testing
    // VOICE CONTROL REASON: Voice navigation must be responsive under concurrent usage
    group('Voice Control Accessibility', function() {
      if (userType === 'voice_control' || Math.random() < 0.1) {
        const startTime = Date.now();
        
        // Simulate voice command processing
        const response = http.post(`${BASE_URL}/api/faq/voice-command`, JSON.stringify({
          command: 'navigate to tutoring rates',
          voice_profile: 'accessibility_user',
          language: 'en-GB'
        }), {
          headers: {
            'Content-Type': 'application/json',
            'X-Voice-Control': 'true',
            'X-Accessibility-Mode': 'voice',
          },
          tags: { 
            name: 'voice_control',
            assistive_tech: 'voice_control',
          },
        });
        
        const voiceTime = Date.now() - startTime;
        voiceControlResponseTime.add(voiceTime);
        
        const success = check(response, {
          'Voice command processed': (r) => r.status === 200 || r.status === 202,
          'Voice feedback provided': (r) => {
            try {
              const data = JSON.parse(r.body);
              return data.voice_feedback || data.audio_response;
            } catch {
              return r.status === 202; // Asynchronous processing acceptable
            }
          },
        });
        
        if (!success) assistiveTechErrorCount.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Comprehensive accessibility compliance check
    // COMPLIANCE REASON: Validate WCAG 2.1 AA compliance under concurrent accessibility usage
    group('Accessibility Compliance Validation', function() {
      if (Math.random() < 0.3) { // 30% of users trigger compliance checks
        const response = http.get(`${BASE_URL}/api/faq/accessibility-report`, {
          headers: {
            'Accept': 'application/json',
            'X-Compliance-Check': 'wcag_2_1_aa',
            'X-Assistive-Tech': userType,
          },
          tags: { 
            name: 'accessibility_compliance',
          },
        });
        
        const success = check(response, {
          'Compliance report available': (r) => r.status === 200,
          'WCAG compliance level acceptable': (r) => {
            try {
              const data = JSON.parse(r.body);
              return data.compliance_score >= 95; // 95%+ compliance required
            } catch {
              return false;
            }
          },
          'No critical accessibility issues': (r) => {
            try {
              const data = JSON.parse(r.body);
              return (data.critical_issues || 0) === 0;
            } catch {
              return false;
            }
          },
        });
        
        if (success && response.body) {
          try {
            const data = JSON.parse(response.body);
            accessibilityComplianceGauge.add(data.compliance_score || 0);
          } catch {
            accessibilityComplianceGauge.add(90); // Default compliance level
          }
        }
        
        if (!success) assistiveTechErrorCount.add(1);
      }
    });
    
    // CONTEXT7 SOURCE: /grafana/k6-docs - Assistive technology appropriate think time
    // THINK TIME REASON: Model realistic assistive technology usage patterns and processing time
    const thinkTime = getAssistiveTechThinkTime(userType);
    sleep(thinkTime);
  });
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Assistive technology type determination
// TYPE REASON: Realistic distribution of assistive technology users
function determineAssistiveTechType() {
  const random = Math.random();
  if (random < SCREEN_READER_USERS) return 'screen_reader';
  if (random < SCREEN_READER_USERS + KEYBOARD_ONLY_USERS) return 'keyboard_only';
  if (random < SCREEN_READER_USERS + KEYBOARD_ONLY_USERS + HIGH_CONTRAST_USERS) return 'high_contrast';
  if (random < SCREEN_READER_USERS + KEYBOARD_ONLY_USERS + HIGH_CONTRAST_USERS + VOICE_CONTROL_USERS) return 'voice_control';
  return 'standard';
}

// CONTEXT7 SOURCE: /grafana/k6-docs - User agent selection for assistive technology simulation
// USER AGENT REASON: Accurate assistive technology request simulation
function getUserAgent(userType) {
  const userAgents = ASSISTIVE_TECH_USER_AGENTS[userType];
  if (userAgents && userAgents.length > 0) {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
  }
  return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36';
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Assistive technology think time modeling
// THINK TIME REASON: Model realistic assistive technology processing and interaction time
function getAssistiveTechThinkTime(userType) {
  switch(userType) {
    case 'screen_reader':
      return Math.random() * 8 + 4; // 4-12 seconds (screen reader audio processing time)
    case 'keyboard_only':
      return Math.random() * 6 + 3; // 3-9 seconds (keyboard navigation time)
    case 'voice_control':
      return Math.random() * 10 + 5; // 5-15 seconds (voice command formulation and processing)
    case 'high_contrast':
      return Math.random() * 4 + 2; // 2-6 seconds (visual processing with contrast)
    default:
      return Math.random() * 3 + 1; // 1-4 seconds (standard user)
  }
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility test summary with compliance analysis
// SUMMARY REASON: Detailed accessibility performance and compliance reporting
export function handleSummary(data) {
  const accessibilityMetrics = {
    test_type: 'FAQ Accessibility Load Test',
    wcag_compliance_target: 'WCAG 2.1 AA',
    duration_minutes: Math.round(data.state.testRunDurationMs / 60000),
    max_concurrent_assistive_tech_users: data.metrics.vus_max.values.max,
    total_accessibility_requests: data.metrics.http_reqs.values.count,
    
    // Core accessibility performance
    avg_response_time_ms: Math.round(data.metrics.http_req_duration.values.avg),
    p95_response_time_ms: Math.round(data.metrics.http_req_duration.values['p(95)']),
    error_rate_percent: (data.metrics.http_req_failed.values.rate * 100).toFixed(4),
    
    // Accessibility-specific metrics
    screen_reader_compatibility: data.metrics.screen_reader_compatibility_rate?.values.rate || 'N/A',
    keyboard_navigation_avg_ms: data.metrics.keyboard_navigation_response_time?.values.avg || 'N/A',
    high_contrast_mode_p95_ms: data.metrics.high_contrast_mode_latency?.values['p(95)'] || 'N/A',
    focus_management_accuracy: data.metrics.focus_management_accuracy?.values.rate || 'N/A',
    aria_label_consistency: data.metrics.aria_label_consistency_rate?.values.rate || 'N/A',
    voice_control_avg_ms: data.metrics.voice_control_response_time?.values.avg || 'N/A',
    assistive_tech_errors: data.metrics.assistive_tech_error_count?.values.count || 0,
    accessibility_compliance_score: data.metrics.accessibility_compliance_level?.values.max || 'N/A',
    
    // Compliance status
    wcag_aa_compliance_met: (data.metrics.accessibility_compliance_level?.values.max || 0) >= 95,
    screen_reader_performance_acceptable: (data.metrics.screen_reader_compatibility_rate?.values.rate || 0) > 0.995,
    keyboard_navigation_responsive: (data.metrics.keyboard_navigation_response_time?.values.avg || Infinity) < 75,
    
    timestamp: new Date().toISOString(),
  };
  
  return {
    'faq-accessibility-load-results.json': JSON.stringify(accessibilityMetrics, null, 2),
    stdout: generateAccessibilitySummary(data, accessibilityMetrics),
  };
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility summary formatting with compliance status
// FORMATTING REASON: Clear accessibility performance and compliance reporting for stakeholders
function generateAccessibilitySummary(data, metrics) {
  const complianceScore = data.metrics.accessibility_compliance_level?.values.max || 0;
  const screenReaderRate = (data.metrics.screen_reader_compatibility_rate?.values.rate || 0) * 100;
  const assistiveTechErrors = data.metrics.assistive_tech_error_count?.values.count || 0;
  
  let complianceStatus;
  if (complianceScore >= 95 && screenReaderRate > 99.5 && assistiveTechErrors < 5) {
    complianceStatus = '✓ WCAG 2.1 AA COMPLIANT';
  } else if (complianceScore >= 90) {
    complianceStatus = '⚠ NEEDS MINOR ACCESSIBILITY IMPROVEMENTS';
  } else {
    complianceStatus = '✗ REQUIRES SIGNIFICANT ACCESSIBILITY WORK';
  }
  
  return `
╔══════════════════════════════════════════════════════════════════════════╗
║                  FAQ ACCESSIBILITY LOAD TEST RESULTS                    ║
║              WCAG 2.1 AA Compliance Under Concurrent Load               ║
╠══════════════════════════════════════════════════════════════════════════╣
║ Compliance Status: ${complianceStatus}                        ║
║ Test Duration: ${Math.round(data.state.testRunDurationMs / 60000)} minutes                                                   ║
║ Peak Assistive Tech Users: ${data.metrics.vus_max.values.max}                                       ║
║ Total Accessibility Requests: ${data.metrics.http_reqs.values.count}                              ║
╠══════════════════════════════════════════════════════════════════════════╣
║ CORE ACCESSIBILITY PERFORMANCE                                           ║
║ • Average Response Time: ${Math.round(data.metrics.http_req_duration.values.avg)}ms                                    ║
║ • 95th Percentile: ${Math.round(data.metrics.http_req_duration.values['p(95)'])}ms (Target: <200ms)                        ║
║ • Error Rate: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(4)}% (Target: <0.1%)                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║ ASSISTIVE TECHNOLOGY PERFORMANCE                                         ║
║ • Screen Reader Compatibility: ${screenReaderRate.toFixed(1)}% (Target: >99.5%)              ║
║ • Keyboard Navigation (avg): ${data.metrics.keyboard_navigation_response_time?.values.avg ? Math.round(data.metrics.keyboard_navigation_response_time.values.avg) + 'ms' : 'N/A'}                            ║
║ • High Contrast Mode (p95): ${data.metrics.high_contrast_mode_latency?.values['p(95)'] ? Math.round(data.metrics.high_contrast_mode_latency.values['p(95)']) + 'ms' : 'N/A'}                             ║
║ • Focus Management Accuracy: ${data.metrics.focus_management_accuracy?.values.rate ? (data.metrics.focus_management_accuracy.values.rate * 100).toFixed(1) + '%' : 'N/A'}                        ║
║ • ARIA Label Consistency: ${data.metrics.aria_label_consistency_rate?.values.rate ? (data.metrics.aria_label_consistency_rate.values.rate * 100).toFixed(1) + '%' : 'N/A'}                          ║
║ • Voice Control (avg): ${data.metrics.voice_control_response_time?.values.avg ? Math.round(data.metrics.voice_control_response_time.values.avg) + 'ms' : 'N/A'}                                 ║
╠══════════════════════════════════════════════════════════════════════════╣
║ WCAG 2.1 AA COMPLIANCE METRICS                                           ║
║ • Overall Compliance Score: ${complianceScore.toFixed(1)}% (Target: ≥95%)                       ║
║ • Assistive Technology Errors: ${assistiveTechErrors} (Target: <5)                         ║
║ • Screen Reader Performance: ${screenReaderRate > 99.5 ? '✓ EXCELLENT' : screenReaderRate > 95 ? '⚠ GOOD' : '✗ NEEDS WORK'}                           ║
║ • Keyboard Navigation: ${(data.metrics.keyboard_navigation_response_time?.values.avg || Infinity) < 75 ? '✓ RESPONSIVE' : '⚠ SLOW'}                               ║
║ • High Contrast Support: ${data.metrics.high_contrast_mode_latency?.values['p(95)'] < 200 ? '✓ FAST' : '⚠ SLOW'}                                ║
╠══════════════════════════════════════════════════════════════════════════╣
║ ACCESSIBILITY RECOMMENDATIONS                                            ║
${generateAccessibilityRecommendations(data)}
╚══════════════════════════════════════════════════════════════════════════╝
  `;
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility improvement recommendations
// RECOMMENDATIONS REASON: Actionable guidance for accessibility compliance improvement
function generateAccessibilityRecommendations(data) {
  const recommendations = [];
  const complianceScore = data.metrics.accessibility_compliance_level?.values.max || 0;
  const screenReaderRate = (data.metrics.screen_reader_compatibility_rate?.values.rate || 0) * 100;
  const keyboardNavTime = data.metrics.keyboard_navigation_response_time?.values.avg || 0;
  const assistiveTechErrors = data.metrics.assistive_tech_error_count?.values.count || 0;
  
  if (complianceScore < 95) {
    recommendations.push('║ • Improve WCAG 2.1 AA compliance score to ≥95%                          ║');
  }
  
  if (screenReaderRate < 99.5) {
    recommendations.push('║ • Enhance screen reader compatibility and ARIA implementations           ║');
  }
  
  if (keyboardNavTime > 75) {
    recommendations.push('║ • Optimize keyboard navigation response times                            ║');
  }
  
  if (assistiveTechErrors > 5) {
    recommendations.push('║ • Reduce assistive technology errors through better testing             ║');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('║ • Accessibility performance meets all targets - excellent work!        ║');
  }
  
  return recommendations.join('\n');
}