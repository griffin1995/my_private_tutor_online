# Performance Monitoring System

## Overview

Comprehensive performance monitoring system for My Private Tutor Online, implementing royal client service standards with automated Core Web Vitals tracking, business analytics, and performance budgets.

## Architecture

### Core Components

1. **WebVitalsReporter** - Next.js `useReportWebVitals` integration
2. **Performance Dashboard** - Real-time metrics visualization
3. **Business Analytics** - Custom event tracking for tutoring service
4. **Performance Budgets** - Automated budget enforcement
5. **Alert System** - Real-time performance issue notifications

### Integration Points

- **Vercel Analytics** - Page views and custom events
- **SpeedInsights** - Core Web Vitals monitoring
- **Custom API Endpoints** - Metrics collection and analysis
- **Development Tools** - Real-time debugging interface

## Performance Standards

### Royal Client Service Requirements

- **LCP (Largest Contentful Paint)**: < 1.5s (Royal Standard)
- **INP (Interaction to Next Paint)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.05 (Perfect stability)
- **FCP (First Contentful Paint)**: < 1.0s
- **TTFB (Time to First Byte)**: < 400ms

### Resource Budgets

- **JavaScript**: 300KB total, 150KB initial
- **CSS**: 100KB total, 14KB critical
- **Images**: 500KB per page
- **Fonts**: 150KB total (WOFF2 only)
- **Total Page Weight**: 800KB homepage

## Implementation Guide

### 1. Core Setup

The performance monitoring system is already integrated into the layout:

```tsx
// Layout integration
import { WebVitalsReporter } from '@/components/performance/WebVitalsReporter';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <WebVitalsReporter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 2. Component-Level Monitoring

Use the performance monitoring hook for component-specific tracking:

```tsx
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

function TutoringServiceComponent() {
  const perf = usePerformanceMonitoring({
    componentName: 'TutoringServiceComponent',
    trackRender: true,
    trackInteractions: true,
    businessContext: {
      category: 'service',
      tier: 'premium',
      value: 1,
    },
    renderBudget: 16, // 60fps budget
    interactionBudget: 100, // 100ms interaction budget
  });

  const handleServiceSelection = async (tier: string) => {
    // Track interaction start
    const startTime = performance.now();
    
    // Perform service selection logic
    await perf.measurePerformance(
      () => processServiceSelection(tier),
      'service_selection'
    );
    
    // Track business event
    perf.trackBusinessEvent('service_tier_select', { tier });
    
    // Track interaction completion
    perf.trackInteraction('service_selection', startTime);
  };

  return (
    <div onClick={() => handleServiceSelection('premium')}>
      Premium Tutoring Service
    </div>
  );
}
```

### 3. Business Analytics Integration

Track tutoring-specific events:

```tsx
import { businessAnalytics, TutoringEvents } from '@/lib/analytics/business-analytics';

// Track inquiry form submission
await businessAnalytics.trackInquiryFormSubmit('contact', 'mathematics', 'gcse');

// Track bootcamp registration
await businessAnalytics.trackBootcampRegistration('oxbridge-prep', 'platinum');

// Track service tier view
await businessAnalytics.trackServiceTierView('premium', 150);

// Track video engagement
await businessAnalytics.trackVideoEngagement('intro-video', 120000, true);
```

### 4. Development Tools

Add the performance development tools for debugging:

```tsx
import { PerformanceDevTools } from '@/components/performance/PerformanceDevTools';

export default function DevLayout({ children }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <PerformanceDevTools position="bottom-right" />
      )}
    </>
  );
}
```

**Keyboard Shortcuts:**
- `Ctrl+Shift+P` - Toggle performance dev tools
- Real-time metrics updates every 2 seconds
- Tabs: Vitals, Analytics, Budgets, Network

## API Endpoints

### Performance Metrics Collection

**POST** `/api/performance/metrics`

Collects Web Vitals and custom performance metrics:

```json
{
  "sessionId": "session_123",
  "metrics": [
    {
      "name": "LCP",
      "value": 1250,
      "rating": "good",
      "timestamp": 1635123456789
    }
  ],
  "customEvents": [
    {
      "event": "service_tier_view",
      "value": 1,
      "metadata": { "tier": "premium" }
    }
  ]
}
```

### Performance Alerts

**POST** `/api/performance/alerts`

Handles performance issue alerts:

```json
{
  "metric": "LCP",
  "value": 4500,
  "threshold": 2500,
  "rating": "poor",
  "url": "/services",
  "sessionId": "session_123"
}
```

### Business Analytics

**POST** `/api/analytics/events`

Tracks business-specific events:

```json
{
  "events": [
    {
      "event": "inquiry_form_submit",
      "category": "conversion",
      "action": "form_submit",
      "value": 1,
      "metadata": {
        "formType": "contact",
        "subject": "mathematics"
      }
    }
  ],
  "session": {
    "sessionId": "session_123",
    "duration": 300000,
    "pageViews": 4
  }
}
```

## Configuration

### Performance Budgets

Configure in `performance.config.ts`:

```typescript
export const PERFORMANCE_CONFIG = {
  webVitals: {
    LCP: { good: 1500, needsImprovement: 2500, poor: 4000 },
    INP: { good: 100, needsImprovement: 200, poor: 500 },
    // ... more metrics
  },
  resources: {
    javascript: { total: 300 * 1024 },
    css: { total: 100 * 1024 },
    // ... more budgets
  },
  // ... more configuration
};
```

### Environment Configuration

```typescript
// Development
monitoring: { enabled: true, verbose: true, alerts: false }

// Production
monitoring: { enabled: true, verbose: false, alerts: true }
```

## Monitoring and Alerts

### Alert Channels

1. **Email Alerts** - Critical performance issues
2. **Slack Integration** - Team notifications
3. **Console Logging** - Development debugging
4. **Analytics Dashboard** - Historical analysis

### Alert Thresholds

- **Critical**: LCP > 4s, INP > 500ms, CLS > 0.25
- **High**: Performance budget violations
- **Medium**: Needs improvement ratings
- **Low**: Edge case performance issues

### Rate Limiting

- Maximum 5 alerts per minute per IP
- Maximum 20 alerts per hour per IP
- Automatic rate limiting prevents spam

## Performance Optimization Recommendations

### Automated Suggestions

The system provides automatic optimization recommendations:

1. **LCP Issues**: Optimize server response times, reduce resource sizes
2. **INP Problems**: Reduce JavaScript execution time, optimize event handlers
3. **CLS Issues**: Add size attributes to images, avoid content shifts
4. **Bundle Size**: Code splitting, tree shaking, compression
5. **Network**: Use CDN, optimize images, minimize requests

### Budget Violations

When performance budgets are exceeded:

1. **JavaScript Budget**: Implement code splitting, remove unused code
2. **CSS Budget**: Use critical CSS, remove unused styles
3. **Image Budget**: Optimize formats (WebP, AVIF), compress images
4. **Request Count**: Bundle resources, use sprite sheets, implement caching

## Testing and Validation

### Automated Testing

```bash
# Run performance tests
npm run test:performance

# Lighthouse CI integration
npm run lighthouse:ci

# Bundle analysis
npm run analyze
```

### Manual Testing

1. **Performance Dev Tools** - Real-time monitoring during development
2. **Lighthouse Audits** - Comprehensive performance analysis
3. **WebPageTest** - Multi-location performance testing
4. **Core Web Vitals** - Field data from real users

## Troubleshooting

### Common Issues

1. **High LCP**: Check server response times, optimize critical resources
2. **Poor INP**: Reduce main thread blocking, optimize JavaScript
3. **Layout Shifts**: Add dimensions to images, avoid dynamic content insertion
4. **Memory Leaks**: Use performance hooks to track component memory usage

### Debug Tools

1. **Performance Dev Tools** - Press `Ctrl+Shift+P` in development
2. **Browser DevTools** - Performance tab for detailed analysis
3. **Console Logging** - Detailed metrics in development mode
4. **Session Storage** - Web Vitals data stored for debugging

### Performance Patterns

```tsx
// Good: Measure performance impact
const { measurePerformance } = usePerformanceMonitoring({
  componentName: 'ExpensiveComponent'
});

const processData = measurePerformance(
  () => expensiveOperation(),
  'data_processing'
);

// Good: Track business impact
businessAnalytics.track('conversion_event', {
  category: 'conversion',
  value: 1,
  metadata: { source: 'premium_service' }
});
```

## Best Practices

### Component Performance

1. Use `usePerformanceMonitoring` hook for component-specific tracking
2. Set appropriate render and interaction budgets
3. Track business-relevant events with proper metadata
4. Implement error boundaries with performance impact tracking

### Resource Management

1. Implement performance budgets in CI/CD pipeline
2. Use CDN for static assets
3. Optimize images with next/image
4. Implement proper caching strategies

### Monitoring

1. Track both technical and business metrics
2. Set up proper alerting for performance regressions
3. Use real user monitoring data for optimization decisions
4. Regular performance audits and budget reviews

## Integration with External Services

### Vercel Analytics

```tsx
// Automatic integration via WebVitalsReporter
// Custom events tracked via business analytics
```

### Google Analytics 4

```tsx
// Enhanced ecommerce tracking
// Custom dimensions for tutoring metrics
// Goal conversion tracking
```

### Third-Party Monitoring

```typescript
// Webhook integration for external services
const MONITORING_WEBHOOK_URL = process.env.MONITORING_WEBHOOK_URL;
const ANALYTICS_API_KEY = process.env.ANALYTICS_API_KEY;
```

## Maintenance

### Regular Tasks

1. **Weekly**: Review performance metrics and trends
2. **Monthly**: Update performance budgets based on data
3. **Quarterly**: Comprehensive performance audit
4. **Annually**: Review and update performance standards

### Updates

1. Keep performance monitoring dependencies updated
2. Review and update performance budgets
3. Add new business metrics as features evolve
4. Optimize based on real user data patterns

---

**Royal Client Performance Standards**: This monitoring system ensures that My Private Tutor Online maintains performance standards worthy of royal endorsements, with comprehensive tracking, alerting, and optimization recommendations.