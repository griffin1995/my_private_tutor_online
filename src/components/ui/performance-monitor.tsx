"use client"

import { useState, useEffect } from 'react'
import { webVitalsTracker, WebVitalsData, PERFORMANCE_THRESHOLDS } from '@/lib/performance/web-vitals'
import { cn } from '@/lib/utils'

// Performance monitoring component for development/debugging
interface PerformanceMonitorProps {
  enabled?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export function PerformanceMonitor({
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-right',
  className
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<Record<string, WebVitalsData>>({})
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!enabled || !isMounted || typeof window === 'undefined') return

    // Update metrics periodically
    const interval = setInterval(() => {
      setMetrics(webVitalsTracker.getMetrics())
    }, 1000)

    return () => clearInterval(interval)
  }, [enabled, isMounted])

  // Prevent hydration mismatch by not rendering on server
  if (!isMounted || !enabled || typeof window === 'undefined') {
    return null
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50'
      case 'poor': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3)
    }
    return Math.round(value).toString()
  }

  const getUnit = (name: string) => {
    if (name === 'CLS') return ''
    return 'ms'
  }

  return (
    <div 
      className={cn(
        'fixed z-50 bg-white shadow-lg rounded-lg border border-gray-200 font-mono text-xs',
        positionClasses[position],
        className
      )}
    >
      <div 
        className="p-2 cursor-pointer flex items-center gap-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <span className="font-semibold">Web Vitals</span>
        <span className="text-gray-500">
          {isExpanded ? '−' : '+'}
        </span>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-3 space-y-2 min-w-48">
          {Object.entries(metrics).length === 0 ? (
            <div className="text-gray-500">Collecting metrics...</div>
          ) : (
            Object.entries(metrics).map(([name, metric]) => (
              <div key={name} className="flex justify-between items-center">
                <span className="font-medium">{name}:</span>
                <div className="flex items-center gap-2">
                  <span 
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      getRatingColor(metric.rating)
                    )}
                  >
                    {formatValue(name, metric.value)}{getUnit(name)}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* Thresholds reference */}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="text-gray-500 mb-1">Thresholds:</div>
            {Object.entries(PERFORMANCE_THRESHOLDS).map(([name, threshold]) => (
              <div key={name} className="flex justify-between text-xs text-gray-600">
                <span>{name}:</span>
                <span>&lt;{threshold}{name === 'CLS' ? '' : 'ms'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Performance warning banner for poor metrics
interface PerformanceWarningProps {
  threshold?: 'needs-improvement' | 'poor'
  onDismiss?: () => void
}

export function PerformanceWarning({ 
  threshold = 'poor',
  onDismiss
}: PerformanceWarningProps) {
  const [metrics, setMetrics] = useState<Record<string, WebVitalsData>>({})
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const interval = setInterval(() => {
      setMetrics(webVitalsTracker.getMetrics())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const poorMetrics = Object.values(metrics).filter(metric => 
    threshold === 'poor' ? metric.rating === 'poor' : 
    metric.rating === 'poor' || metric.rating === 'needs-improvement'
  )

  if (isDismissed || poorMetrics.length === 0 || process.env.NODE_ENV !== 'development') {
    return null
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-50 border-b border-red-200 p-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
            !
          </div>
          <div>
            <div className="font-semibold text-red-800">
              Performance Warning
            </div>
            <div className="text-red-600 text-sm">
              {poorMetrics.map(metric => 
                `${metric.name}: ${formatValue(metric.name, metric.value)}${getUnit(metric.name)} (${metric.rating})`
              ).join(', ')}
            </div>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-red-600 hover:text-red-800 text-xl font-bold"
          aria-label="Dismiss performance warning"
        >
          ×
        </button>
      </div>
    </div>
  )
}