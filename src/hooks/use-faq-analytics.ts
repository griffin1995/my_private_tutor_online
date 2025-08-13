"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { faqAnalytics, type AnalyticsReport, type RatingEvent, type FeedbackEvent, type PerformanceMetric } from '@/lib/faq-analytics-engine';

// CONTEXT7 SOURCE: /facebook/react - Custom hooks for analytics state management
// IMPLEMENTATION REASON: Official React patterns for custom hooks and performance monitoring integration

interface UseAnalyticsReturn {
  report: AnalyticsReport | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  trackRating: (event: Omit<RatingEvent, 'timestamp'>) => void;
  trackFeedback: (event: Omit<FeedbackEvent, 'timestamp' | 'sentiment' | 'wordCount'>) => void;
  trackPerformance: (metric: Omit<PerformanceMetric, 'timestamp'>) => void;
  exportData: () => void;
  clearData: () => void;
}

interface UsePerformanceTrackingReturn {
  startTracking: (questionId: string) => void;
  endTracking: (questionId: string, rating?: 'helpful' | 'not_helpful') => void;
  trackScroll: (questionId: string, scrollDepth: number) => void;
  isTracking: (questionId: string) => boolean;
}

// Main analytics hook
export function useFAQAnalytics(dateRange?: { start: Date; end: Date }): UseAnalyticsReturn {
  const [report, setReport] = useState<AnalyticsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      
      const newReport = faqAnalytics.generateReport(dateRange);
      setReport(newReport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate analytics report');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  // Listen for analytics updates
  useEffect(() => {
    const handleAnalyticsUpdate = () => {
      generateReport();
    };

    window.addEventListener('faq-analytics-update', handleAnalyticsUpdate);
    generateReport(); // Initial load

    return () => {
      window.removeEventListener('faq-analytics-update', handleAnalyticsUpdate);
    };
  }, [generateReport]);

  const trackRating = useCallback((event: Omit<RatingEvent, 'timestamp'>) => {
    try {
      faqAnalytics.trackRating(event);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track rating');
    }
  }, []);

  const trackFeedback = useCallback((event: Omit<FeedbackEvent, 'timestamp' | 'sentiment' | 'wordCount'>) => {
    try {
      faqAnalytics.trackFeedback(event);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track feedback');
    }
  }, []);

  const trackPerformance = useCallback((metric: Omit<PerformanceMetric, 'timestamp'>) => {
    try {
      faqAnalytics.trackPerformance(metric);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track performance');
    }
  }, []);

  const exportData = useCallback(() => {
    try {
      const data = faqAnalytics.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `faq-analytics-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export data');
    }
  }, []);

  const clearData = useCallback(() => {
    try {
      if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
        faqAnalytics.clearData();
        setReport(null);
        generateReport();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear data');
    }
  }, [generateReport]);

  return {
    report,
    loading,
    error,
    refresh: generateReport,
    trackRating,
    trackFeedback,
    trackPerformance,
    exportData,
    clearData
  };
}

// Performance tracking hook for real-time monitoring
export function usePerformanceTracking(): UsePerformanceTrackingReturn {
  const trackingData = useRef<Map<string, {
    startTime: number;
    viewDuration: number;
    maxScrollDepth: number;
    interactions: number;
  }>>(new Map());

  const startTracking = useCallback((questionId: string) => {
    const now = performance.now();
    trackingData.current.set(questionId, {
      startTime: now,
      viewDuration: 0,
      maxScrollDepth: 0,
      interactions: 0
    });

    // Track visibility changes
    const handleVisibilityChange = () => {
      const data = trackingData.current.get(questionId);
      if (data && !document.hidden) {
        data.startTime = performance.now(); // Reset start time when returning to visibility
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function stored in tracking data for later use
    (trackingData.current.get(questionId) as any).cleanup = () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const endTracking = useCallback((questionId: string, rating?: 'helpful' | 'not_helpful') => {
    const data = trackingData.current.get(questionId);
    if (!data) return;

    const endTime = performance.now();
    const totalDuration = endTime - data.startTime + data.viewDuration;
    const clickToRate = rating ? endTime - data.startTime : 0;

    // Track performance metrics
    faqAnalytics.trackPerformance({
      questionId,
      viewDuration: totalDuration,
      scrollDepth: data.maxScrollDepth,
      clickToRate: clickToRate,
      bounceRate: totalDuration < 3000 && data.interactions === 0 // Less than 3 seconds with no interactions
    });

    // Track rating if provided
    if (rating) {
      faqAnalytics.trackRating({
        questionId,
        questionText: '', // Would need to be passed or stored
        rating,
        responseTime: clickToRate,
        deviceType: getDeviceType(),
        sessionId: getSessionId()
      });
    }

    // Cleanup
    if ((data as any).cleanup) {
      (data as any).cleanup();
    }
    trackingData.current.delete(questionId);
  }, []);

  const trackScroll = useCallback((questionId: string, scrollDepth: number) => {
    const data = trackingData.current.get(questionId);
    if (data) {
      data.maxScrollDepth = Math.max(data.maxScrollDepth, scrollDepth);
      data.interactions++;
    }
  }, []);

  const isTracking = useCallback((questionId: string) => {
    return trackingData.current.has(questionId);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // End tracking for all active questions
      trackingData.current.forEach((data, questionId) => {
        if ((data as any).cleanup) {
          (data as any).cleanup();
        }
      });
      trackingData.current.clear();
    };
  }, []);

  return {
    startTracking,
    endTracking,
    trackScroll,
    isTracking
  };
}

// Utility functions
function getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('faq_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('faq_session_id', sessionId);
  }
  return sessionId;
}

// Hook for scroll tracking on FAQ components
export function useScrollTracking(questionId: string, threshold = 0.1) {
  const elementRef = useRef<HTMLElement>(null);
  const { trackScroll } = usePerformanceTracking();
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementHeight = element.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(elementHeight, windowHeight - rect.top);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      
      const depth = Math.min(100, (visibleHeight / elementHeight) * 100);
      
      if (depth > scrollDepth && depth > threshold * 100) {
        setScrollDepth(depth);
        trackScroll(questionId, depth / 100);
      }
    };

    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            handleScroll();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );

    observer.observe(element);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [questionId, trackScroll, scrollDepth, threshold]);

  return { elementRef, scrollDepth };
}

// Hook for real-time analytics dashboard
export function useRealtimeAnalytics(refreshInterval = 30000) {
  const [isRealtime, setIsRealtime] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { refresh, ...analytics } = useFAQAnalytics();

  const toggleRealtime = useCallback(() => {
    if (isRealtime) {
      // Stop real-time updates
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRealtime(false);
    } else {
      // Start real-time updates
      intervalRef.current = setInterval(() => {
        refresh();
      }, refreshInterval);
      setIsRealtime(true);
    }
  }, [isRealtime, refresh, refreshInterval]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    ...analytics,
    refresh,
    isRealtime,
    toggleRealtime
  };
}

// Hook for A/B testing FAQ variations
export function useFAQABTesting(questionId: string, variations: string[]) {
  const [selectedVariation, setSelectedVariation] = useState<string>('');
  const [testGroup, setTestGroup] = useState<'A' | 'B' | 'control'>('control');

  useEffect(() => {
    // Simple A/B test assignment based on question ID hash
    const hash = Array.from(questionId).reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const groupIndex = Math.abs(hash) % 3;
    const groups: ('A' | 'B' | 'control')[] = ['A', 'B', 'control'];
    const assignedGroup = groups[groupIndex];
    
    setTestGroup(assignedGroup);
    
    if (assignedGroup !== 'control' && variations.length > 0) {
      const variationIndex = assignedGroup === 'A' ? 0 : Math.min(1, variations.length - 1);
      setSelectedVariation(variations[variationIndex]);
    }
  }, [questionId, variations]);

  const trackTestInteraction = useCallback((action: 'view' | 'rate' | 'feedback', data?: any) => {
    // Track A/B test performance
    const testData = {
      questionId,
      testGroup,
      variation: selectedVariation,
      action,
      timestamp: new Date().toISOString(),
      ...data
    };

    // Store test data for later analysis
    const existingTests = JSON.parse(localStorage.getItem('faq_ab_tests') || '[]');
    existingTests.push(testData);
    localStorage.setItem('faq_ab_tests', JSON.stringify(existingTests));
  }, [questionId, testGroup, selectedVariation]);

  return {
    testGroup,
    selectedVariation,
    trackTestInteraction,
    isTestActive: testGroup !== 'control'
  };
}