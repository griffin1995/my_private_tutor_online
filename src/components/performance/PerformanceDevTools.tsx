'use client';

// CONTEXT7 SOURCE: /vercel/next.js - Development tools for performance monitoring
// PERFORMANCE DEV TOOLS REASON: Real-time performance debugging and optimization tools
// CONTEXT7 SOURCE: /vercel/next.js - Conditional rendering for development environment
// IMPLEMENTATION: Developer-friendly performance monitoring with visual feedback

import { useState, useEffect, useMemo } from 'react';
import { PerformanceDashboard } from './PerformanceDashboard';
import { webVitalsTracker, type WebVitalsData } from '@/lib/performance/web-vitals';
import { businessAnalytics } from '@/lib/analytics/business-analytics';
import { PERFORMANCE_CONFIG } from '../../performance.config';

interface PerformanceDevToolsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  minimized?: boolean;
  showOnlyInDevelopment?: boolean;
}

export function PerformanceDevTools({ 
  position = 'bottom-right',
  minimized = true,
  showOnlyInDevelopment = true 
}: PerformanceDevToolsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(minimized);
  const [activeTab, setActiveTab] = useState<'vitals' | 'analytics' | 'budgets' | 'network'>('vitals');
  const [metrics, setMetrics] = useState<Record<string, WebVitalsData>>({});
  const [sessionData, setSessionData] = useState<any>(null);
  
  // Don't render in production unless explicitly enabled
  if (showOnlyInDevelopment && process.env.NODE_ENV === 'production') {
    return null;
  }
  
  // Position styles
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };
  
  // Update metrics periodically
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(webVitalsTracker.getMetrics());
      setSessionData(businessAnalytics.getSessionAnalytics());
    };
    
    // Update immediately and then every 2 seconds
    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Keyboard shortcut to toggle visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+P to toggle performance dev tools
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsVisible(prev => !prev);
        setIsMinimized(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Performance score calculation
  const performanceScore = useMemo(() => {
    const metricValues = Object.values(metrics);
    if (metricValues.length === 0) return 100;
    
    let score = 100;
    metricValues.forEach(metric => {
      if (metric.rating === 'poor') score -= 20;
      else if (metric.rating === 'needs-improvement') score -= 10;
    });
    
    return Math.max(0, score);
  }, [metrics]);
  
  // Quick performance insights
  const performanceInsights = useMemo(() => {
    const insights = [];
    
    Object.entries(metrics).forEach(([name, metric]) => {
      if (metric.rating === 'poor') {
        insights.push({
          type: 'error',
          message: `${name} is performing poorly: ${metric.value}${name === 'CLS' ? '' : 'ms'}`,
        });
      } else if (metric.rating === 'needs-improvement') {
        insights.push({
          type: 'warning',
          message: `${name} could be optimized: ${metric.value}${name === 'CLS' ? '' : 'ms'}`,
        });
      }
    });
    
    return insights;
  }, [metrics]);
  
  if (!isVisible && !isMinimized) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={`fixed ${positionClasses[position]} z-50 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded shadow-lg transition-colors`}
        title="Show Performance Tools (Ctrl+Shift+P)"
      >
        📊 Perf
      </button>
    );
  }
  
  if (isMinimized && !isVisible) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
          title="Expand Performance Tools (Ctrl+Shift+P)"
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">📊</span>
            <div className="text-left">
              <div className="font-semibold">{performanceScore}/100</div>
              <div className="text-xs opacity-75">
                {performanceInsights.length > 0 ? `${performanceInsights.length} issues` : 'Good'}
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-white border border-gray-200 rounded-lg shadow-xl max-w-md max-h-96 overflow-hidden`}>
      {/* Header */}
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-sm">Performance Dev Tools</h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-500 hover:text-gray-700 text-xs p-1"
            title="Minimize"
          >
            −
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 text-xs p-1"
            title="Hide"
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {(['vitals', 'analytics', 'budgets', 'network'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 text-xs font-medium capitalize ${
              activeTab === tab
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="p-3 text-xs max-h-64 overflow-y-auto">
        {activeTab === 'vitals' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Performance Score</span>
              <span className={`font-bold ${
                performanceScore >= 90 ? 'text-green-600' :
                performanceScore >= 70 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {performanceScore}/100
              </span>
            </div>
            
            {Object.entries(metrics).length > 0 ? (
              Object.entries(metrics).map(([name, metric]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <span>{name}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      metric.rating === 'good' ? 'bg-green-500' :
                      metric.rating === 'needs-improvement' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                  </span>
                  <span className="font-mono">
                    {name === 'CLS' ? metric.value.toFixed(3) : `${Math.round(metric.value)}ms`}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No metrics collected yet</p>
            )}
            
            {performanceInsights.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="font-semibold mb-2">Issues</div>
                {performanceInsights.map((insight, index) => (
                  <div key={index} className={`text-xs p-2 rounded mb-1 ${
                    insight.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'
                  }`}>
                    {insight.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="space-y-3">
            {sessionData ? (
              <>
                <div className="flex items-center justify-between">
                  <span>Session Duration</span>
                  <span className="font-mono">{Math.round(sessionData.duration / 1000)}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Page Views</span>
                  <span className="font-mono">{sessionData.pageViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Events</span>
                  <span className="font-mono">{sessionData.eventCount}</span>
                </div>
                
                {sessionData.events && sessionData.events.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="font-semibold mb-2">Recent Events</div>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {sessionData.events.slice(-5).map((event: any, index: number) => (
                        <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                          <div className="font-medium">{event.event}</div>
                          <div className="text-gray-500">{event.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center py-4">No session data available</p>
            )}
          </div>
        )}
        
        {activeTab === 'budgets' && (
          <div className="space-y-3">
            <div className="font-semibold">Performance Budgets</div>
            
            {/* Web Vitals Budgets */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-600">Core Web Vitals</div>
              {Object.entries(PERFORMANCE_CONFIG.webVitals).map(([metric, thresholds]) => {
                const currentValue = metrics[metric]?.value;
                const isGood = currentValue && currentValue <= thresholds.good;
                
                return (
                  <div key={metric} className="flex items-center justify-between">
                    <span>{metric}</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-mono text-xs">
                        {metric === 'CLS' ? thresholds.good.toFixed(3) : `${thresholds.good}ms`}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${
                        currentValue === undefined ? 'bg-gray-300' :
                        isGood ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Resource Budgets */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              <div className="text-xs font-medium text-gray-600">Resource Budgets</div>
              <div className="flex items-center justify-between">
                <span>JavaScript</span>
                <span className="font-mono text-xs">{(PERFORMANCE_CONFIG.resources.javascript.total / 1024).toFixed(0)}KB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CSS</span>
                <span className="font-mono text-xs">{(PERFORMANCE_CONFIG.resources.css.total / 1024).toFixed(0)}KB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Images</span>
                <span className="font-mono text-xs">{(PERFORMANCE_CONFIG.resources.images.totalPerPage / 1024).toFixed(0)}KB</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'network' && (
          <div className="space-y-3">
            <NetworkInfo />
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-3 py-2 border-t border-gray-200 text-xs text-gray-500">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}

// Network information component
function NetworkInfo() {
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [resourceTiming, setResourceTiming] = useState<PerformanceResourceTiming[]>([]);
  
  useEffect(() => {
    // Get connection information
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      setConnectionInfo({
        effectiveType: conn?.effectiveType,
        downlink: conn?.downlink,
        rtt: conn?.rtt,
        saveData: conn?.saveData,
      });
    }
    
    // Get resource timing
    if (window.performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const recentResources = resources
        .filter(r => r.transferSize > 0)
        .sort((a, b) => b.startTime - a.startTime)
        .slice(0, 10);
      setResourceTiming(recentResources);
    }
  }, []);
  
  return (
    <>
      {connectionInfo && (
        <div className="space-y-2">
          <div className="font-semibold">Connection</div>
          <div className="flex items-center justify-between">
            <span>Type</span>
            <span className="font-mono">{connectionInfo.effectiveType || 'unknown'}</span>
          </div>
          {connectionInfo.downlink && (
            <div className="flex items-center justify-between">
              <span>Downlink</span>
              <span className="font-mono">{connectionInfo.downlink}Mbps</span>
            </div>
          )}
          {connectionInfo.rtt && (
            <div className="flex items-center justify-between">
              <span>RTT</span>
              <span className="font-mono">{connectionInfo.rtt}ms</span>
            </div>
          )}
          {connectionInfo.saveData && (
            <div className="text-xs bg-blue-50 text-blue-800 p-2 rounded">
              Data Saver enabled
            </div>
          )}
        </div>
      )}
      
      {resourceTiming.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-gray-200">
          <div className="font-semibold">Recent Resources</div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {resourceTiming.map((resource, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded">
                <div className="font-mono text-xs truncate" title={resource.name}>
                  {resource.name.split('/').pop()}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{(resource.transferSize / 1024).toFixed(1)}KB</span>
                  <span>{Math.round(resource.duration)}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PerformanceDevTools;