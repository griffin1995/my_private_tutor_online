// CONTEXT7 SOURCE: /grafana/k6-docs - Artillery.js processor for custom FAQ test logic
// IMPLEMENTATION REASON: Artillery.js processors enable custom test data generation and response validation

const crypto = require('crypto');

// CONTEXT7 SOURCE: /grafana/k6-docs - Custom test data generation for realistic FAQ interactions
// DATA REASON: Generate dynamic test data that reflects actual FAQ user patterns

/**
 * Generate royal client session context
 * CONTEXT7 SOURCE: /grafana/k6-docs - User session management for load testing
 * SESSION REASON: Royal clients require authenticated session context for premium features
 */
function generateRoyalClientContext() {
  return {
    clientTier: 'royal',
    sessionId: `royal_${crypto.randomUUID()}`,
    priority: 'high',
    serviceLevel: 'premium',
    confidentialityRequired: Math.random() < 0.8, // 80% require confidentiality
    budgetTier: 'unlimited',
    endorsementLevel: 'verified'
  };
}

/**
 * Generate realistic search queries based on user type
 * CONTEXT7 SOURCE: /grafana/k6-docs - Dynamic payload generation for load testing
 * QUERY REASON: Different user types search for different FAQ content patterns
 */
function generateSearchQuery(userType) {
  const searchQueries = {
    royal: [
      'Oxbridge preparation with royal tutors',
      'bespoke tutoring for diplomatic families',
      'confidential elite education services',
      'royal endorsed university preparation',
      'exclusive Cambridge entrance coaching',
      'Oxford interview preparation specialists',
      'Eton preparation programmes',
      'international royal family tutoring'
    ],
    standard: [
      'A-level tutoring rates',
      'GCSE mathematics help',
      '11+ examination preparation',
      'online tutoring availability',
      'subject specialist qualifications',
      'booking process explained',
      'cancellation policy details',
      'tutor experience levels'
    ],
    accessibility: [
      'screen reader compatible sessions',
      'keyboard navigation support',
      'visual impairment accommodations',
      'hearing assistance available',
      'accessibility features tutorial',
      'assistive technology support',
      'high contrast mode help',
      'voice control instructions'
    ]
  };
  
  const queries = searchQueries[userType] || searchQueries.standard;
  return queries[Math.floor(Math.random() * queries.length)];
}

/**
 * Generate FAQ categories based on user preferences
 * CONTEXT7 SOURCE: /grafana/k6-docs - Category-based content access patterns
 * CATEGORY REASON: Users access FAQ categories based on their service tier and needs
 */
function generateFAQCategory(userType) {
  const categories = {
    royal: [
      'royal-endorsements',
      'oxbridge-preparation', 
      'elite-tutors',
      'bespoke-services',
      'confidentiality-agreements',
      'international-services'
    ],
    standard: [
      'general-questions',
      'pricing-information',
      'booking-process',
      'tutor-qualifications',
      'subject-availability',
      'policies-procedures'
    ],
    accessibility: [
      'accessibility-features',
      'assistive-technology',
      'inclusive-design',
      'barrier-free-access',
      'accommodation-requests',
      'accessibility-compliance'
    ]
  };
  
  const userCategories = categories[userType] || categories.standard;
  return userCategories[Math.floor(Math.random() * userCategories.length)];
}

/**
 * Before request hook - Setup test context
 * CONTEXT7 SOURCE: /grafana/k6-docs - Request preprocessing for load testing
 * PREPROCESSING REASON: Establish user context and authentication for realistic FAQ interactions
 */
function beforeRequest(requestParams, context, ee, next) {
  // Determine user type based on scenario weight or random selection
  const userTypes = ['royal', 'standard', 'accessibility'];
  const weights = [0.3, 0.5, 0.2]; // 30% royal, 50% standard, 20% accessibility
  
  let userType = 'standard';
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (let i = 0; i < userTypes.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      userType = userTypes[i];
      break;
    }
  }
  
  // Set user context
  context.vars.userType = userType;
  context.vars.sessionId = `session_${crypto.randomUUID()}`;
  context.vars.timestamp = Date.now();
  
  // Generate user-specific test data
  context.vars.searchQuery = generateSearchQuery(userType);
  context.vars.faqCategory = generateFAQCategory(userType);
  
  // Royal client specific context
  if (userType === 'royal') {
    const royalContext = generateRoyalClientContext();
    Object.assign(context.vars, royalContext);
    
    // Add royal client headers
    requestParams.headers = requestParams.headers || {};
    requestParams.headers['X-Client-Tier'] = 'royal';
    requestParams.headers['X-Priority-Level'] = 'high';
    requestParams.headers['X-Service-Level'] = 'premium';
  }
  
  // Accessibility user context
  if (userType === 'accessibility') {
    requestParams.headers = requestParams.headers || {};
    requestParams.headers['X-Accessibility-Mode'] = 'true';
    requestParams.headers['X-Assistive-Tech'] = getRandomAssistiveTech();
  }
  
  // Add common headers for all requests
  requestParams.headers = requestParams.headers || {};
  requestParams.headers['X-Test-Session'] = context.vars.sessionId;
  requestParams.headers['X-User-Type'] = userType;
  requestParams.headers['X-Timestamp'] = context.vars.timestamp.toString();
  
  return next();
}

/**
 * After response hook - Validate FAQ system responses
 * CONTEXT7 SOURCE: /grafana/k6-docs - Response validation and metrics collection
 * VALIDATION REASON: Ensure FAQ responses meet royal client service standards
 */
function afterResponse(requestParams, response, context, ee, next) {
  const userType = context.vars.userType;
  const responseTime = response.timings ? response.timings.response : 0;
  
  // Royal client response time validation
  if (userType === 'royal' && responseTime > 100) {
    ee.emit('counter', 'faq.royal_client.slow_response', 1);
    console.warn(`Royal client slow response: ${responseTime}ms for ${requestParams.url}`);
  }
  
  // Accessibility response validation
  if (userType === 'accessibility') {
    if (response.headers && !response.headers['x-accessibility-compliant']) {
      ee.emit('counter', 'faq.accessibility.missing_compliance_header', 1);
    }
    
    // Check for accessibility response times
    if (responseTime > 200) {
      ee.emit('counter', 'faq.accessibility.slow_response', 1);
    }
  }
  
  // General FAQ system health checks
  if (response.statusCode >= 400) {
    ee.emit('counter', `faq.errors.${response.statusCode}`, 1);
    ee.emit('counter', `faq.errors.by_user_type.${userType}`, 1);
  }
  
  // Success rate tracking
  if (response.statusCode >= 200 && response.statusCode < 400) {
    ee.emit('counter', `faq.success.by_user_type.${userType}`, 1);
  }
  
  // Response time distribution tracking
  if (responseTime < 50) {
    ee.emit('counter', 'faq.response_time.under_50ms', 1);
  } else if (responseTime < 100) {
    ee.emit('counter', 'faq.response_time.50_to_100ms', 1);
  } else if (responseTime < 200) {
    ee.emit('counter', 'faq.response_time.100_to_200ms', 1);
  } else {
    ee.emit('counter', 'faq.response_time.over_200ms', 1);
  }
  
  // Track user journey progress
  const endpoint = requestParams.url.split('?')[0];
  ee.emit('counter', `faq.endpoint.${endpoint.replace(/\//g, '_')}`, 1);
  
  return next();
}

/**
 * Get random assistive technology type
 * CONTEXT7 SOURCE: /grafana/k6-docs - Assistive technology simulation for accessibility testing
 * ASSISTIVE TECH REASON: Realistic simulation of different assistive technology usage patterns
 */
function getRandomAssistiveTech() {
  const assistiveTech = [
    'screen_reader',
    'keyboard_navigation',
    'voice_control',
    'high_contrast',
    'magnification',
    'switch_control'
  ];
  
  return assistiveTech[Math.floor(Math.random() * assistiveTech.length)];
}

/**
 * Custom think time calculator
 * CONTEXT7 SOURCE: /grafana/k6-docs - Dynamic think time calculation for realistic user behavior
 * THINK TIME REASON: Different user types have different content processing and interaction speeds
 */
function calculateThinkTime(context) {
  const userType = context.vars.userType;
  const baseThinkTime = {
    royal: 8,        // Royal clients spend more time reviewing premium content
    standard: 3,     // Standard users browse efficiently
    accessibility: 5 // Accessibility users need processing time
  };
  
  const base = baseThinkTime[userType] || 3;
  const variation = Math.random() * 4; // 0-4 seconds variation
  
  return Math.round(base + variation);
}

/**
 * Generate booking enquiry data
 * CONTEXT7 SOURCE: /grafana/k6-docs - Dynamic form data generation for realistic submissions
 * BOOKING REASON: Royal clients and standard users have different booking enquiry patterns
 */
function generateBookingEnquiry(userType) {
  const baseEnquiry = {
    timestamp: Date.now(),
    source: 'faq_system',
    userType: userType
  };
  
  if (userType === 'royal') {
    return {
      ...baseEnquiry,
      serviceType: ['oxbridge-preparation', 'cambridge-coaching', 'oxford-interview', 'eton-preparation'][Math.floor(Math.random() * 4)],
      urgency: ['high', 'urgent', 'immediate'][Math.floor(Math.random() * 3)],
      budget: 'premium',
      confidentiality: true,
      specialRequirements: 'royal_protocol_required'
    };
  } else if (userType === 'accessibility') {
    return {
      ...baseEnquiry,
      serviceType: ['accessible-tutoring', 'inclusive-sessions', 'barrier-free-learning'][Math.floor(Math.random() * 3)],
      accessibilityNeeds: getRandomAssistiveTech(),
      accommodationRequired: true,
      urgency: 'standard'
    };
  } else {
    return {
      ...baseEnquiry,
      serviceType: ['general-tutoring', 'subject-specific', 'exam-preparation'][Math.floor(Math.random() * 3)],
      urgency: ['standard', 'medium', 'low'][Math.floor(Math.random() * 3)],
      budget: ['standard', 'flexible', 'budget-conscious'][Math.floor(Math.random() * 3)]
    };
  }
}

/**
 * FAQ analytics event tracking
 * CONTEXT7 SOURCE: /grafana/k6-docs - Custom analytics for FAQ performance measurement
 * ANALYTICS REASON: Track FAQ system usage patterns and performance for optimization
 */
function trackFAQAnalytics(context, eventType, eventData) {
  const analyticsEvent = {
    timestamp: Date.now(),
    sessionId: context.vars.sessionId,
    userType: context.vars.userType,
    eventType: eventType,
    data: eventData
  };
  
  // Emit custom metrics for Artillery to collect
  context.ee.emit('counter', `faq.analytics.${eventType}`, 1);
  context.ee.emit('counter', `faq.analytics.${eventType}.${context.vars.userType}`, 1);
  
  // Log for debugging if needed
  if (process.env.DEBUG_FAQ_ANALYTICS) {
    console.log('FAQ Analytics Event:', JSON.stringify(analyticsEvent, null, 2));
  }
}

// CONTEXT7 SOURCE: /grafana/k6-docs - Artillery.js processor export configuration
// EXPORT REASON: Enable Artillery.js to use custom processor functions for enhanced FAQ testing

module.exports = {
  beforeRequest,
  afterResponse,
  calculateThinkTime,
  generateBookingEnquiry,
  trackFAQAnalytics,
  generateSearchQuery,
  generateFAQCategory,
  getRandomAssistiveTech
};