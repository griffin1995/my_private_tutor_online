// CONTEXT7 SOURCE: Lazy-Loaded Chart Components - Phase 3 Bundle Optimization
// Advanced dynamic imports with route-based code splitting for Recharts
// Part of Phase 3 Bundle Optimization: Recharts Optimization

'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton-card';

// ============================================================================
// LOADING SKELETON COMPONENTS
// ============================================================================

const ChartSkeleton = React.memo(() => (
  <div className="w-full h-64 bg-neutral-100 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-neutral-500 text-sm">Loading chart...</div>
  </div>
));

ChartSkeleton.displayName = 'ChartSkeleton';

const DetailedChartSkeleton = React.memo(() => (
  <div className="space-y-4">
    <div className="w-full h-6 bg-neutral-200 rounded animate-pulse" />
    <div className="w-full h-64 bg-neutral-100 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-neutral-500 text-sm">Loading detailed chart...</div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="h-4 bg-neutral-200 rounded animate-pulse" />
      <div className="h-4 bg-neutral-200 rounded animate-pulse" />
      <div className="h-4 bg-neutral-200 rounded animate-pulse" />
    </div>
  </div>
));

DetailedChartSkeleton.displayName = 'DetailedChartSkeleton';

// ============================================================================
// LAZY-LOADED RECHARTS COMPONENTS
// ============================================================================

// Basic chart components for admin dashboards
export const LazyPieChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.PieChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

export const LazyAreaChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.AreaChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

const LazyRadialBarChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.RadialBarChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

export const LazyBarChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.BarChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

export const LazyLineChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.LineChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

export const LazyRadarChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.RadarChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

const LazyComposedChart = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.ComposedChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

// Chart elements and accessories
export const LazyPie = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Pie })),
  { ssr: false }
);

export const LazyArea = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Area })),
  { ssr: false }
);

const LazyRadialBar = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.RadialBar })),
  { ssr: false }
);

export const LazyBar = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Bar })),
  { ssr: false }
);

export const LazyLine = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Line })),
  { ssr: false }
);

export const LazyRadar = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Radar })),
  { ssr: false }
);

export const LazyCell = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Cell })),
  { ssr: false }
);

export const LazyCartesianGrid = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.CartesianGrid })),
  { ssr: false }
);

export const LazyXAxis = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.XAxis })),
  { ssr: false }
);

export const LazyYAxis = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.YAxis })),
  { ssr: false }
);

export const LazyTooltip = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Tooltip })),
  { ssr: false }
);

const LazyLegend = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.Legend })),
  { ssr: false }
);

export const LazyResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.ResponsiveContainer })),
  { ssr: false }
);

export const LazyPolarGrid = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.PolarGrid })),
  { ssr: false }
);

export const LazyPolarAngleAxis = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.PolarAngleAxis })),
  { ssr: false }
);

export const LazyPolarRadiusAxis = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.PolarRadiusAxis })),
  { ssr: false }
);

// ============================================================================
// HIGH-LEVEL COMPOSITE COMPONENTS FOR COMMON PATTERNS
// ============================================================================

interface LazyAnalyticsChartsProps {
  readonly showPieChart?: boolean;
  readonly showAreaChart?: boolean;
  readonly showRadialChart?: boolean;
  readonly data?: any[];
  readonly className?: string;
}

const LazyAnalyticsCharts = dynamic(
  () => import('./analytics-charts-bundle').then((mod) => ({ default: mod.AnalyticsChartsBundle })),
  {
    loading: () => <DetailedChartSkeleton />,
    ssr: false,
  }
);

interface LazyDashboardChartsProps {
  readonly type: 'testimonials' | 'faq' | 'client-success';
  readonly data?: any[];
  readonly className?: string;
}

const LazyDashboardCharts = dynamic(
  () => import('./dashboard-charts-bundle').then((mod) => ({ default: mod.DashboardChartsBundle })),
  {
    loading: () => <DetailedChartSkeleton />,
    ssr: false,
  }
);

// ============================================================================
// ADMIN-SPECIFIC CHART BUNDLE
// ============================================================================

interface LazyAdminChartsProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}

const LazyAdminCharts = React.memo<LazyAdminChartsProps>(({
  children,
  fallback = <DetailedChartSkeleton />
}) => {
  // Only load on admin routes
  const isAdminRoute = typeof window !== 'undefined' &&
    (window.location.pathname.includes('/admin') ||
     window.location.pathname.includes('/dashboard'));

  if (!isAdminRoute && typeof window !== 'undefined') {
    return null;
  }

  const AdminChartsBundle = dynamic(
    () => Promise.resolve({ default: () => <>{children}</> }),
    {
      loading: () => <>{fallback}</>,
      ssr: false,
    }
  );

  return <AdminChartsBundle />;
});

LazyAdminCharts.displayName = 'LazyAdminCharts';

// ============================================================================
// TYPE EXPORTS FOR RECHARTS COMPATIBILITY
// ============================================================================

// Re-export common props types for compatibility
;

// ============================================================================
// CONVENIENCE HOOKS FOR CHART LOADING
// ============================================================================

function useChartLoading(chartType: string) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    // Simulate chart loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [chartType]);

  return { isLoading, error, setError };
}

function useAdminRoute() {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setIsAdmin(
        pathname.includes('/admin') ||
        pathname.includes('/dashboard')
      );
    }
  }, []);

  return isAdmin;
}

