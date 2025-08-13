// CONTEXT7 SOURCE: /context7/react_dev - React functional component patterns with admin interface design
// ADMIN PATTERN: React documentation shows proper admin dashboard component structure
// CONTEXT7 SOURCE: /context7/motion_dev - Framer Motion animation patterns for data visualization
// ANIMATION REASON: Motion dev docs show smooth transitions for dashboard updates

'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TestimonialPerformanceMetrics, createRatingAnalytics } from '@/lib/analytics/testimonials-rating-analytics'

interface TestimonialRatingAnalyticsDashboardProps {
  testimonialIds?: string[]
  className?: string
  refreshInterval?: number
  showExportOptions?: boolean
}

interface DashboardFilters {
  timeRange: '24h' | '7d' | '30d' | '90d' | 'all'
  sortBy: 'rating' | 'engagement' | 'feedback' | 'recent'
  sortOrder: 'asc' | 'desc'
  minRatings: number
}

// CONTEXT7 SOURCE: /context7/motion_dev - Animation variants for dashboard elements
// DASHBOARD ANIMATION: Motion documentation shows smooth data transition patterns
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

const statsVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
}

const progressVariants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: { duration: 0.8, ease: 'easeOut' }
  })
}

export const TestimonialRatingAnalyticsDashboard: React.FC<TestimonialRatingAnalyticsDashboardProps> = ({
  testimonialIds = [],
  className = '',
  refreshInterval = 60000, // 1 minute
  showExportOptions = true
}) => {
  const [metrics, setMetrics] = useState<Record<string, TestimonialPerformanceMetrics>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<DashboardFilters>({
    timeRange: '7d',
    sortBy: 'rating',
    sortOrder: 'desc',
    minRatings: 1
  })
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  // CONTEXT7 SOURCE: /context7/react_dev - useEffect pattern for data fetching with cleanup
  // DATA FETCHING: React documentation shows proper async data loading patterns
  useEffect(() => {
    const fetchMetrics = async () => {
      if (testimonialIds.length === 0) {
        setLoading(false)
        return
      }

      try {
        setError(null)
        const analytics = createRatingAnalytics()
        const metricsData: Record<string, TestimonialPerformanceMetrics> = {}

        // CONTEXT7 SOURCE: /context7/react_dev - Promise.all pattern for concurrent API calls
        // CONCURRENT PATTERN: React docs recommend Promise.all for parallel data loading
        const metricsPromises = testimonialIds.map(async (id) => {
          const metric = await analytics.getTestimonialMetrics(id)
          metricsData[id] = metric
        })

        await Promise.all(metricsPromises)
        setMetrics(metricsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics data')
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    }

    fetchMetrics()

    // CONTEXT7 SOURCE: /context7/react_dev - setInterval pattern with cleanup
    // POLLING PATTERN: React documentation shows proper interval management
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        setRefreshing(true)
        fetchMetrics()
      }, refreshInterval)

      return () => clearInterval(interval)
    }
  }, [testimonialIds, refreshInterval])

  // CONTEXT7 SOURCE: /context7/react_dev - useMemo for expensive calculations
  // PERFORMANCE OPTIMIZATION: React docs recommend useMemo for filtering and sorting
  const filteredAndSortedMetrics = useMemo(() => {
    const metricsArray = Object.values(metrics)
      .filter(metric => metric.totalRatings >= filters.minRatings)
    
    // Apply time range filter (simplified - would need actual timestamp filtering)
    // In real implementation, would filter by lastUpdated timestamp
    
    // Sort metrics
    const sorted = metricsArray.sort((a, b) => {
      let valueA: number
      let valueB: number
      
      switch (filters.sortBy) {
        case 'rating':
          valueA = a.helpfulRatings / Math.max(a.totalRatings, 1)
          valueB = b.helpfulRatings / Math.max(b.totalRatings, 1)
          break
        case 'engagement':
          valueA = a.engagementRate
          valueB = b.engagementRate
          break
        case 'feedback':
          valueA = a.totalFeedback
          valueB = b.totalFeedback
          break
        case 'recent':
          valueA = a.lastUpdated
          valueB = b.lastUpdated
          break
        default:
          valueA = a.totalRatings
          valueB = b.totalRatings
      }
      
      const order = filters.sortOrder === 'asc' ? 1 : -1
      return (valueA - valueB) * order
    })
    
    return sorted
  }, [metrics, filters])

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for event handlers
  // EVENT HANDLING: React documentation shows useCallback for stable references
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    // Trigger re-fetch by updating a dependency
    window.location.reload() // Simple refresh - in real app would re-fetch data
  }, [])

  const handleExport = useCallback(() => {
    const csvData = filteredAndSortedMetrics.map(metric => ({
      testimonialId: metric.testimonialId,
      totalRatings: metric.totalRatings,
      helpfulPercentage: Math.round((metric.helpfulRatings / Math.max(metric.totalRatings, 1)) * 100),
      averageStarRating: metric.averageStarRating,
      totalFeedback: metric.totalFeedback,
      engagementRate: metric.engagementRate,
      conversionRate: metric.conversionRate
    }))
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `testimonial-analytics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [filteredAndSortedMetrics])

  const overallStats = useMemo(() => {
    const allMetrics = Object.values(metrics)
    if (allMetrics.length === 0) {
      return {
        totalTestimonials: 0,
        totalRatings: 0,
        averageHelpfulRate: 0,
        averageStarRating: 0,
        totalFeedback: 0,
        averageEngagementRate: 0
      }
    }

    const totalRatings = allMetrics.reduce((sum, m) => sum + m.totalRatings, 0)
    const totalHelpful = allMetrics.reduce((sum, m) => sum + m.helpfulRatings, 0)
    const totalFeedback = allMetrics.reduce((sum, m) => sum + m.totalFeedback, 0)
    const totalEngagement = allMetrics.reduce((sum, m) => sum + m.engagementRate, 0)
    
    const metricsWithStars = allMetrics.filter(m => m.averageStarRating > 0)
    const averageStarRating = metricsWithStars.length > 0
      ? metricsWithStars.reduce((sum, m) => sum + m.averageStarRating, 0) / metricsWithStars.length
      : 0

    return {
      totalTestimonials: allMetrics.length,
      totalRatings,
      averageHelpfulRate: totalRatings > 0 ? (totalHelpful / totalRatings) * 100 : 0,
      averageStarRating,
      totalFeedback,
      averageEngagementRate: allMetrics.length > 0 ? totalEngagement / allMetrics.length : 0
    }
  }, [metrics])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`testimonial-analytics-dashboard ${className}`}
      >
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full"
              aria-label="Loading analytics data"
            />
            <span className="ml-3 text-slate-600">Loading analytics data...</span>
          </div>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`testimonial-analytics-dashboard ${className}`}
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="text-red-800 font-medium">Error loading analytics</h3>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`testimonial-analytics-dashboard ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Testimonial Analytics</h2>
          <p className="text-slate-600 mt-1">
            Performance metrics for {overallStats.totalTestimonials} testimonials
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {showExportOptions && filteredAndSortedMetrics.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="px-4 py-2 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Export CSV
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            {refreshing ? (
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Refreshing...
              </div>
            ) : (
              'Refresh'
            )}
          </motion.button>
        </div>
      </div>

      {/* Overall Stats Cards */}
      <motion.div
        variants={statsVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Ratings</p>
              <p className="text-2xl font-bold text-slate-900">{overallStats.totalRatings.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3.5M3 16.5h18" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Helpful Rate</p>
              <p className="text-2xl font-bold text-green-600">{overallStats.averageHelpfulRate.toFixed(1)}%</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Star Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{overallStats.averageStarRating.toFixed(1)} ⭐</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Feedback</p>
              <p className="text-2xl font-bold text-purple-600">{overallStats.totalFeedback.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sort by</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="rating">Helpful Rate</option>
              <option value="engagement">Engagement</option>
              <option value="feedback">Feedback Count</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as any }))}
              className="px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="desc">Highest First</option>
              <option value="asc">Lowest First</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Min Ratings</label>
            <input
              type="number"
              value={filters.minRatings}
              onChange={(e) => setFilters(prev => ({ ...prev, minRatings: parseInt(e.target.value) || 0 }))}
              min="0"
              className="px-3 py-2 border border-slate-200 rounded-md text-sm w-20 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Metrics */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedMetrics.map((metric) => (
            <motion.div
              key={metric.testimonialId}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedMetric(
                selectedMetric === metric.testimonialId ? null : metric.testimonialId
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-slate-900">
                    Testimonial {metric.testimonialId}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {metric.totalRatings} rating{metric.totalRatings !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-green-600 font-bold">
                      {metric.totalRatings > 0 
                        ? Math.round((metric.helpfulRatings / metric.totalRatings) * 100)
                        : 0}%
                    </div>
                    <div className="text-slate-500">Helpful</div>
                  </div>
                  
                  {metric.averageStarRating > 0 && (
                    <div className="text-center">
                      <div className="text-yellow-600 font-bold">
                        {metric.averageStarRating.toFixed(1)} ⭐
                      </div>
                      <div className="text-slate-500">Average</div>
                    </div>
                  )}
                  
                  {metric.totalFeedback > 0 && (
                    <div className="text-center">
                      <div className="text-purple-600 font-bold">{metric.totalFeedback}</div>
                      <div className="text-slate-500">Feedback</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Helpful Rate</span>
                    <span className="text-slate-800">
                      {metric.helpfulRatings}/{metric.totalRatings}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                      custom={metric.totalRatings > 0 ? (metric.helpfulRatings / metric.totalRatings) * 100 : 0}
                      className="bg-green-600 h-2 rounded-full"
                    />
                  </div>
                </div>

                {metric.engagementRate > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Engagement Rate</span>
                      <span className="text-slate-800">
                        {metric.engagementRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                        custom={Math.min(metric.engagementRate, 100)}
                        className="bg-blue-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedMetric === metric.testimonialId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                  >
                    <div>
                      <div className="text-slate-600">Total Views</div>
                      <div className="font-medium">{metric.totalViews.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Conversion Rate</div>
                      <div className="font-medium">{metric.conversionRate.toFixed(2)}%</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Avg. Time to Interact</div>
                      <div className="font-medium">
                        {metric.timeToFirstInteraction > 0 
                          ? `${Math.round(metric.timeToFirstInteraction / 1000)}s`
                          : 'N/A'
                        }
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600">Last Updated</div>
                      <div className="font-medium">
                        {new Date(metric.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAndSortedMetrics.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 rounded-lg p-8 text-center"
          >
            <svg className="mx-auto w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No testimonials match your filters</h3>
            <p className="text-slate-600">Try adjusting your filters or add more testimonial ratings to see analytics data.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default TestimonialRatingAnalyticsDashboard