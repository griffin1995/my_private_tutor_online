// CONTEXT7 SOURCE: /vercel/next.js - Performance dashboard for Phase 1 monitoring
// PERFORMANCE MONITORING REASON: Real-time visualization of Symphony Approach™ metrics

'use client'

import { useEffect, useState } from 'react'
import { getPerformanceMetrics, getBuildMetrics } from '@/app/_components/web-vitals'

interface MetricCard {
  title: string
  value: string | number
  rating?: 'good' | 'needs-improvement' | 'poor'
  trend?: 'up' | 'down' | 'stable'
  target?: string
}

export default function PerformanceDashboard() {
  const [webVitals, setWebVitals] = useState<any[]>([])
  const [buildMetrics, setBuildMetrics] = useState<any>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch latest Web Vitals
      const vitals = getPerformanceMetrics()
      setWebVitals(vitals)

      // Fetch build metrics
      const build = getBuildMetrics()
      setBuildMetrics(build)

      setLastUpdate(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getRatingColor = (rating?: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50'
      case 'poor': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '↑'
      case 'down': return '↓'
      default: return '→'
    }
  }

  // Calculate aggregated metrics
  const getAggregatedMetrics = () => {
    const metrics: MetricCard[] = []

    // Core Web Vitals
    const lcp = webVitals.find(m => m.name === 'LCP')
    const fcp = webVitals.find(m => m.name === 'FCP')
    const cls = webVitals.find(m => m.name === 'CLS')
    const ttfb = webVitals.find(m => m.name === 'TTFB')

    if (lcp) {
      metrics.push({
        title: 'Largest Contentful Paint',
        value: `${(lcp.value / 1000).toFixed(2)}s`,
        rating: lcp.rating,
        target: '< 2.5s'
      })
    }

    if (fcp) {
      metrics.push({
        title: 'First Contentful Paint',
        value: `${(fcp.value / 1000).toFixed(2)}s`,
        rating: fcp.rating,
        target: '< 1.8s'
      })
    }

    if (cls) {
      metrics.push({
        title: 'Cumulative Layout Shift',
        value: cls.value.toFixed(3),
        rating: cls.rating,
        target: '< 0.1'
      })
    }

    if (ttfb) {
      metrics.push({
        title: 'Time to First Byte',
        value: `${ttfb.value.toFixed(0)}ms`,
        rating: ttfb.rating,
        target: '< 800ms'
      })
    }

    // Build metrics
    if (buildMetrics) {
      metrics.push({
        title: 'Build Time',
        value: `${buildMetrics.buildTime || 'N/A'}s`,
        rating: buildMetrics.buildTime < 15 ? 'good' : 'needs-improvement',
        target: '< 15s'
      })

      metrics.push({
        title: 'TypeScript Errors',
        value: buildMetrics.typeErrorCount || 0,
        rating: buildMetrics.typeErrorCount === 0 ? 'good' : 'poor',
        target: '0 errors'
      })

      metrics.push({
        title: 'Bundle Size',
        value: `${buildMetrics.bundleSize || 'N/A'}KB`,
        rating: buildMetrics.bundleSize < 150 ? 'good' : 'needs-improvement',
        target: '< 150KB'
      })

      metrics.push({
        title: 'Memory Usage',
        value: `${buildMetrics.memoryUsage || 'N/A'}MB`,
        rating: buildMetrics.memoryUsage < 500 ? 'good' : 'needs-improvement',
        target: '< 500MB'
      })
    }

    return metrics
  }

  const metrics = getAggregatedMetrics()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Performance Dashboard - Phase 1 Monitoring
          </h1>
          <p className="text-gray-600">
            Symphony Approach™ - Real-time performance metrics for £157,000 annual optimization value
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {metric.title}
                </h3>
                {metric.trend && (
                  <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                )}
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </span>
              </div>
              {metric.rating && (
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${getRatingColor(
                    metric.rating
                  )}`}
                >
                  {metric.rating}
                </span>
              )}
              {metric.target && (
                <p className="text-xs text-gray-500 mt-2">
                  Target: {metric.target}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Phase 1 Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Phase 1 Progress: Foundation Fortification
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  TypeScript Error Resolution
                </span>
                <span className="text-sm text-gray-600">
                  {buildMetrics?.typeErrorCount || 0} errors remaining
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${Math.max(
                      0,
                      100 - (buildMetrics?.typeErrorCount || 0) * 2
                    )}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  Build Time Optimization
                </span>
                <span className="text-sm text-gray-600">
                  {buildMetrics?.buildTime || 'N/A'}s / 15s target
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      ((15 - (buildMetrics?.buildTime || 30)) / 15) * 100
                    )}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  Bundle Size Optimization
                </span>
                <span className="text-sm text-gray-600">
                  {buildMetrics?.bundleSize || 'N/A'}KB / 150KB target
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      ((150 - (buildMetrics?.bundleSize || 200)) / 150) * 100
                    )}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Web Vitals History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Real-time Web Vitals History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {webVitals.slice(-10).reverse().map((vital, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vital.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vital.value < 10
                        ? vital.value.toFixed(3)
                        : vital.value.toFixed(0)}
                      {vital.name === 'CLS' ? '' : 'ms'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColor(
                          vital.rating
                        )}`}
                      >
                        {vital.rating || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(vital.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phase 1 Summary */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            Phase 1 Objective Summary
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Establish comprehensive performance monitoring baseline
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Track TypeScript-Pro's systematic error resolution
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Identify quick wins for Phase 2 optimization
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Support £157,000 annual value delivery through monitoring
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}