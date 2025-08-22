// CONTEXT7 SOURCE: /websites/nextjs - Client component provider for monitoring systems
// IMPLEMENTATION REASON: Phase 4 comprehensive monitoring integration provider

'use client';

import { useEffect } from 'react';
import WebVitalsReporting from './WebVitalsReporting';
import { performanceMonitor } from '@/lib/monitoring/performance-monitoring';
import { revenueIntelligence } from '@/lib/monitoring/revenue-intelligence';
import { operationalMonitor } from '@/lib/monitoring/operational-monitoring';

interface MonitoringProviderProps {
  children: React.ReactNode;
}

const MonitoringProvider: React.FC<MonitoringProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize all monitoring systems when the app starts
    if (typeof window !== 'undefined') {
      try {
        // Initialize performance monitoring
        performanceMonitor.initializePerformanceMonitoring();
        
        // Initialize revenue intelligence
        revenueIntelligence.initializeRevenueTracking();
        
        // Initialize operational monitoring
        operationalMonitor.startOperationalMonitoring();

        console.log('🎯 Royal Client Monitoring Suite Activated', {
          performance: 'Core Web Vitals tracking active',
          revenue: '£400,000+ opportunity tracking',
          operational: 'Enterprise-grade system monitoring',
          sla: 'Royal client standards enforced'
        });
      } catch (error) {
        console.error('Failed to initialize monitoring systems:', error);
      }
    }
  }, []);

  return (
    <>
      {/* Web Vitals reporting component */}
      <WebVitalsReporting />
      
      {/* Render children */}
      {children}
    </>
  );
};

export default MonitoringProvider;