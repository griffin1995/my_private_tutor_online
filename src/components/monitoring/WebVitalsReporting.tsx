// CONTEXT7 SOURCE: /websites/nextjs - useReportWebVitals integration component
// IMPLEMENTATION REASON: Web Vitals integration with Phase 4 monitoring systems

'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';
import { performanceMonitor } from '@/lib/monitoring/performance-monitoring';

const WebVitalsReporting: React.FC = () => {
  // CONTEXT7 SOURCE: /websites/nextjs - Web Vitals reporting hook integration
  useReportWebVitals((metric) => {
    // Send to our comprehensive monitoring system
    const analyticsData = {
      ...metric,
      timestamp: Date.now(),
      royal_client_context: {
        premium_experience: true,
        service_tier: 'royal',
        performance_sla: 'elite'
      }
    };

    // Send to performance monitoring
    try {
      // Use sendBeacon for reliability, fallback to fetch
      const data = JSON.stringify(analyticsData);
      
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/performance', data);
      } else {
        fetch('/api/analytics/performance', {
          method: 'POST',
          body: data,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true
        });
      }
    } catch (error) {
      console.error('Failed to send Web Vitals data:', error);
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Web Vitals Metric:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        royal_client: true
      });
    }
  });

  useEffect(() => {
    // Initialize performance monitoring if not already done
    if (typeof window !== 'undefined') {
      console.log('🚀 Royal Client Web Vitals Reporting Initialized');
    }
  }, []);

  // This component doesn't render anything - it just handles Web Vitals reporting
  return null;
};

export default WebVitalsReporting;