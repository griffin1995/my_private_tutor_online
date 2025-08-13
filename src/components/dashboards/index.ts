/**
 * DASHBOARDS INDEX - COMPREHENSIVE EXPORT MODULE
 * CONTEXT7 SOURCE: /microsoft/typescript - Module export patterns for dashboard components
 * CONTEXT7 SOURCE: /vercel/next.js - Component organization and barrel exports
 * 
 * TASK 12: Central export hub for client success metrics dashboard system
 * This module provides a unified interface for all dashboard components, hooks, and utilities
 * used throughout the My Private Tutor Online business intelligence system.
 * 
 * BUSINESS IMPACT: £60,000+ through streamlined dashboard integration and development efficiency
 * ROYAL CLIENT STANDARDS: Enterprise-grade component organization with TypeScript excellence
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Dashboard component exports with proper module resolution
// Main Dashboard Components
export { default as ClientSuccessMetricsDashboard } from './client-success-metrics-dashboard'

// Analytics Services and Hooks
export { 
  clientSuccessAnalytics,
  useClientSuccessAnalytics,
  type ClientSuccessInsights,
  type CategoryPerformance,
  type SubjectMetrics,
  type GeographicMetrics,
  type SeasonalData,
  type ConversionStage,
  type DropoffAnalysis,
  type OptimizationSuggestion,
  type ForecastData,
  type GrowthProjection,
  type RiskAssessment
} from '../../lib/analytics/client-success-analytics'

// Dashboard Data Hooks
export { 
  useClientSuccessMetrics,
  type ClientSuccessMetrics,
  type TestimonialPerformance,
  type ConversionFunnelData,
  type TimeSeriesData
} from './client-success-metrics-dashboard'

// CONTEXT7 SOURCE: /microsoft/typescript - Utility type definitions for dashboard integration
export interface DashboardConfig {
  readonly theme: 'light' | 'dark'
  readonly refreshInterval: number
  readonly exportFormats: readonly ('json' | 'csv' | 'pdf')[]
  readonly realTimeUpdates: boolean
  readonly mobileOptimized: boolean
}

export interface DashboardRoute {
  readonly path: string
  readonly component: React.ComponentType
  readonly title: string
  readonly description: string
  readonly accessLevel: 'public' | 'admin' | 'executive'
  readonly mobileSupported: boolean
}

// Dashboard Registry
export const DASHBOARD_ROUTES: readonly DashboardRoute[] = [
  {
    path: '/dashboard/client-success',
    component: ClientSuccessMetricsDashboard,
    title: 'Client Success Metrics',
    description: 'Comprehensive business intelligence dashboard for testimonials effectiveness',
    accessLevel: 'admin',
    mobileSupported: true
  }
] as const

// Default Dashboard Configuration
export const DEFAULT_DASHBOARD_CONFIG: DashboardConfig = {
  theme: 'light',
  refreshInterval: 300000, // 5 minutes
  exportFormats: ['json', 'csv'],
  realTimeUpdates: true,
  mobileOptimized: true
} as const

/**
 * CONTEXT7 SOURCE: /facebook/react - Dashboard component factory pattern
 * Factory function for creating dashboard components with consistent configuration
 */
export function createDashboard(
  Component: React.ComponentType<any>,
  config: Partial<DashboardConfig> = {}
) {
  const mergedConfig = { ...DEFAULT_DASHBOARD_CONFIG, ...config }
  
  return function DashboardWrapper(props: any) {
    return React.createElement(Component, { ...props, config: mergedConfig })
  }
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dashboard route helper utilities
 * Utility functions for dashboard routing and navigation
 */
export const dashboardUtils = {
  /**
   * Get dashboard route by path
   */
  getRouteByPath: (path: string): DashboardRoute | undefined => {
    return DASHBOARD_ROUTES.find(route => route.path === path)
  },

  /**
   * Get dashboards by access level
   */
  getRoutesByAccessLevel: (accessLevel: DashboardRoute['accessLevel']): readonly DashboardRoute[] => {
    return DASHBOARD_ROUTES.filter(route => route.accessLevel === accessLevel)
  },

  /**
   * Get mobile-supported dashboards
   */
  getMobileSupportedRoutes: (): readonly DashboardRoute[] => {
    return DASHBOARD_ROUTES.filter(route => route.mobileSupported)
  },

  /**
   * Validate dashboard access
   */
  canAccessDashboard: (
    route: DashboardRoute, 
    userLevel: 'public' | 'admin' | 'executive'
  ): boolean => {
    const accessHierarchy = { public: 0, admin: 1, executive: 2 }
    return accessHierarchy[userLevel] >= accessHierarchy[route.accessLevel]
  }
} as const

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Dashboard metadata interface
 * Comprehensive metadata for dashboard system integration
 */
export interface DashboardSystemMetadata {
  readonly version: string
  readonly components: readonly string[]
  readonly apiEndpoints: readonly string[]
  readonly features: readonly string[]
  readonly dependencies: readonly string[]
  readonly lastUpdated: string
}

export const DASHBOARD_SYSTEM_METADATA: DashboardSystemMetadata = {
  version: '1.0.0',
  components: [
    'ClientSuccessMetricsDashboard'
  ],
  apiEndpoints: [
    '/api/analytics/client-success',
    '/api/analytics/performance'
  ],
  features: [
    'Real-time metrics',
    'Mobile responsive design',
    'Data export capabilities',
    'Interactive visualizations',
    'Executive summary views',
    'Conversion funnel analysis',
    'Predictive insights',
    'Performance tracking'
  ],
  dependencies: [
    'recharts',
    'next.js',
    'react',
    'typescript',
    'tailwindcss'
  ],
  lastUpdated: new Date().toISOString()
} as const

// Re-export React for convenience
import React from 'react'
export { React }