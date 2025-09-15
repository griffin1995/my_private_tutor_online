// CONTEXT7 SOURCE: /vercel/next.js - Multi-Agent Performance Monitoring Dashboard v2.0
// RECURSIVE IMPROVEMENT REASON: Real-time monitoring for continuous methodology optimization
// BUSINESS IMPACT: Enable £830,000 3-year value delivery through performance-driven improvements

import { ComplexityTier } from './agent-selection-engine-v2'
import { nanoid } from 'nanoid'

// Performance metrics structure
interface PerformanceMetrics {
  session_id: string
  timestamp: number
  methodology_version: string

  // Selection Performance
  agent_selection: {
    duration_ms: number
    cache_hit: boolean
    confidence_score: number
    agents_selected: string[]
    complexity_tier: ComplexityTier
  }

  // Consensus Performance
  consensus_process: {
    total_duration_ms: number
    rounds_completed: number
    consensus_achieved: boolean
    convergence_rate: number
    fast_track_used: boolean
  }

  // Business Impact
  business_metrics: {
    estimated_value: number
    confidence_interval: [number, number, number] // P90, P50, P10
    roi_projection: number
    implementation_success: boolean
    actual_vs_estimated_variance?: number
  }

  // Quality Metrics
  quality_indicators: {
    stakeholder_satisfaction: number
    implementation_quality: number
    timeline_adherence: number
    technical_excellence: number
  }
}

// Real-time monitoring events
interface MonitoringEvent {
  event_id: string
  timestamp: number
  session_id: string
  event_type: 'selection_start' | 'selection_complete' | 'consensus_start' | 'consensus_round' | 'consensus_complete' | 'implementation_start' | 'implementation_complete'
  data: any
  performance_impact?: number
}

// Monitoring thresholds for alerts
interface PerformanceThresholds {
  agent_selection_time_ms: number     // Target: <2000ms
  consensus_time_minutes: number      // Target: <45min
  consensus_achievement_rate: number  // Target: 100%
  value_delivery_accuracy: number     // Target: ±15%
  implementation_success_rate: number // Target: >95%
}

// Default thresholds from multi-agent consensus
const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  agent_selection_time_ms: 2000,
  consensus_time_minutes: 45,
  consensus_achievement_rate: 100,
  value_delivery_accuracy: 0.15, // ±15%
  implementation_success_rate: 0.95
}

/**
 * Multi-Agent Performance Monitoring Dashboard v2.0
 * RECURSIVE IMPROVEMENT: Real-time performance tracking and optimization triggers
 */
export class MultiAgentPerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map()
  private events: MonitoringEvent[] = []
  private thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS
  private alertCallbacks: Array<(alert: PerformanceAlert) => void> = []

  /**
   * Start monitoring a new multi-agent session
   * PERFORMANCE TRACKING: Initialize session-level monitoring
   */
  startSession(
    sessionId: string,
    task: { description: string, complexity: ComplexityTier, estimated_value: number }
  ): void {
    const metrics: PerformanceMetrics = {
      session_id: sessionId,
      timestamp: Date.now(),
      methodology_version: '2.0',

      agent_selection: {
        duration_ms: 0,
        cache_hit: false,
        confidence_score: 0,
        agents_selected: [],
        complexity_tier: task.complexity
      },

      consensus_process: {
        total_duration_ms: 0,
        rounds_completed: 0,
        consensus_achieved: false,
        convergence_rate: 0,
        fast_track_used: false
      },

      business_metrics: {
        estimated_value: task.estimated_value,
        confidence_interval: [0, 0, 0],
        roi_projection: 0,
        implementation_success: false
      },

      quality_indicators: {
        stakeholder_satisfaction: 0,
        implementation_quality: 0,
        timeline_adherence: 0,
        technical_excellence: 0
      }
    }

    this.metrics.set(sessionId, metrics)
    this.logEvent({
      event_id: nanoid(8),
      timestamp: Date.now(),
      session_id: sessionId,
      event_type: 'selection_start',
      data: task
    })
  }

  /**
   * Record agent selection performance
   * SELECTION MONITORING: Track selection algorithm efficiency
   */
  recordAgentSelection(
    sessionId: string,
    selectionResult: {
      duration_ms: number
      cache_hit: boolean
      confidence_score: number
      agents_selected: string[]
    }
  ): void {
    const metrics = this.metrics.get(sessionId)
    if (!metrics) return

    metrics.agent_selection = {
      ...metrics.agent_selection,
      ...selectionResult
    }

    this.logEvent({
      event_id: nanoid(8),
      timestamp: Date.now(),
      session_id: sessionId,
      event_type: 'selection_complete',
      data: selectionResult,
      performance_impact: selectionResult.duration_ms > this.thresholds.agent_selection_time_ms ? -1 : 1
    })

    // Check for performance alerts
    this.checkSelectionPerformance(sessionId, selectionResult)
  }

  /**
   * Record consensus process performance
   * CONSENSUS MONITORING: Track debate efficiency and convergence
   */
  recordConsensusProgress(
    sessionId: string,
    round: number,
    convergenceData: { agreement_percentage: number, time_elapsed_ms: number }
  ): void {
    const metrics = this.metrics.get(sessionId)
    if (!metrics) return

    metrics.consensus_process.rounds_completed = round
    metrics.consensus_process.total_duration_ms = convergenceData.time_elapsed_ms
    metrics.consensus_process.convergence_rate = convergenceData.agreement_percentage

    this.logEvent({
      event_id: nanoid(8),
      timestamp: Date.now(),
      session_id: sessionId,
      event_type: 'consensus_round',
      data: { round, ...convergenceData }
    })
  }

  /**
   * Complete consensus process recording
   * CONSENSUS COMPLETION: Final consensus performance metrics
   */
  completeConsensus(
    sessionId: string,
    consensusResult: {
      achieved: boolean
      total_duration_ms: number
      fast_track_used: boolean
      final_convergence_rate: number
    }
  ): void {
    const metrics = this.metrics.get(sessionId)
    if (!metrics) return

    metrics.consensus_process = {
      ...metrics.consensus_process,
      consensus_achieved: consensusResult.achieved,
      total_duration_ms: consensusResult.total_duration_ms,
      fast_track_used: consensusResult.fast_track_used,
      convergence_rate: consensusResult.final_convergence_rate
    }

    this.logEvent({
      event_id: nanoid(8),
      timestamp: Date.now(),
      session_id: sessionId,
      event_type: 'consensus_complete',
      data: consensusResult,
      performance_impact: consensusResult.achieved ? 1 : -1
    })

    // Check consensus performance against thresholds
    this.checkConsensusPerformance(sessionId, consensusResult)
  }

  /**
   * Record business impact and value delivery
   * VALUE MONITORING: Track business value delivery accuracy
   */
  recordBusinessImpact(
    sessionId: string,
    businessResult: {
      actual_value: number
      roi_achieved: number
      implementation_success: boolean
      variance_from_estimate: number
    }
  ): void {
    const metrics = this.metrics.get(sessionId)
    if (!metrics) return

    metrics.business_metrics = {
      ...metrics.business_metrics,
      implementation_success: businessResult.implementation_success,
      actual_vs_estimated_variance: businessResult.variance_from_estimate
    }

    this.logEvent({
      event_id: nanoid(8),
      timestamp: Date.now(),
      session_id: sessionId,
      event_type: 'implementation_complete',
      data: businessResult,
      performance_impact: businessResult.implementation_success ? 1 : -1
    })

    // Check value delivery accuracy
    this.checkValueDeliveryAccuracy(sessionId, businessResult)
  }

  /**
   * Generate real-time performance dashboard
   * DASHBOARD: Live performance metrics and insights
   */
  generateDashboard(): PerformanceDashboard {
    const allMetrics = Array.from(this.metrics.values())
    const recentMetrics = allMetrics.filter(m => Date.now() - m.timestamp < 604800000) // Last 7 days

    return {
      overview: {
        total_sessions: allMetrics.length,
        recent_sessions: recentMetrics.length,
        methodology_version: '2.0',
        last_updated: new Date().toISOString()
      },

      performance_summary: {
        average_selection_time: this.calculateAverageSelectionTime(recentMetrics),
        average_consensus_time: this.calculateAverageConsensusTime(recentMetrics),
        consensus_achievement_rate: this.calculateConsensusRate(recentMetrics),
        implementation_success_rate: this.calculateImplementationSuccessRate(recentMetrics),
        cache_hit_rate: this.calculateCacheHitRate(recentMetrics)
      },

      efficiency_trends: {
        selection_time_trend: this.calculateTrend(allMetrics, 'selection_time'),
        consensus_time_trend: this.calculateTrend(allMetrics, 'consensus_time'),
        value_accuracy_trend: this.calculateTrend(allMetrics, 'value_accuracy')
      },

      complexity_breakdown: {
        simple_tier_performance: this.getComplexityTierStats(recentMetrics, ComplexityTier.SIMPLE),
        standard_tier_performance: this.getComplexityTierStats(recentMetrics, ComplexityTier.STANDARD),
        complex_tier_performance: this.getComplexityTierStats(recentMetrics, ComplexityTier.COMPLEX)
      },

      alerts: this.getActiveAlerts(),

      recommendations: this.generateOptimizationRecommendations(recentMetrics)
    }
  }

  /**
   * Check if performance triggers recursive improvement
   * RECURSIVE TRIGGERS: Automatic optimization initiation
   */
  checkRecursiveImprovementTriggers(): RecursiveImprovementAnalysis {
    const recentMetrics = Array.from(this.metrics.values())
      .filter(m => Date.now() - m.timestamp < 2592000000) // Last 30 days

    const triggers: RecursiveTrigger[] = []

    // Selection time degradation
    const avgSelectionTime = this.calculateAverageSelectionTime(recentMetrics)
    if (avgSelectionTime > this.thresholds.agent_selection_time_ms * 1.2) {
      triggers.push({
        type: 'selection_degradation',
        severity: 'medium',
        current_value: avgSelectionTime,
        threshold: this.thresholds.agent_selection_time_ms,
        recommended_action: 'Optimize agent selection caching algorithm'
      })
    }

    // Consensus time increase
    const avgConsensusTime = this.calculateAverageConsensusTime(recentMetrics)
    if (avgConsensusTime > this.thresholds.consensus_time_minutes * 1.1) {
      triggers.push({
        type: 'consensus_slowdown',
        severity: 'high',
        current_value: avgConsensusTime,
        threshold: this.thresholds.consensus_time_minutes,
        recommended_action: 'Review debate process timing and convergence algorithms'
      })
    }

    // Value delivery accuracy decline
    const valueAccuracy = this.calculateValueDeliveryAccuracy(recentMetrics)
    if (valueAccuracy < (1 - this.thresholds.value_delivery_accuracy) * 0.9) {
      triggers.push({
        type: 'value_accuracy_decline',
        severity: 'high',
        current_value: valueAccuracy,
        threshold: this.thresholds.value_delivery_accuracy,
        recommended_action: 'Refine business impact quantification framework'
      })
    }

    return {
      triggers_detected: triggers.length,
      triggers,
      requires_immediate_attention: triggers.some(t => t.severity === 'high'),
      recommended_methodology_updates: this.generateMethodologyUpdates(triggers)
    }
  }

  // Performance calculation methods
  private calculateAverageSelectionTime(metrics: PerformanceMetrics[]): number {
    const times = metrics.map(m => m.agent_selection.duration_ms).filter(t => t > 0)
    return times.length > 0 ? times.reduce((sum, time) => sum + time, 0) / times.length : 0
  }

  private calculateAverageConsensusTime(metrics: PerformanceMetrics[]): number {
    const times = metrics.map(m => m.consensus_process.total_duration_ms / 60000).filter(t => t > 0) // Convert to minutes
    return times.length > 0 ? times.reduce((sum, time) => sum + time, 0) / times.length : 0
  }

  private calculateConsensusRate(metrics: PerformanceMetrics[]): number {
    const total = metrics.length
    const successful = metrics.filter(m => m.consensus_process.consensus_achieved).length
    return total > 0 ? (successful / total) * 100 : 100
  }

  private calculateImplementationSuccessRate(metrics: PerformanceMetrics[]): number {
    const total = metrics.filter(m => m.business_metrics.implementation_success !== undefined).length
    const successful = metrics.filter(m => m.business_metrics.implementation_success === true).length
    return total > 0 ? (successful / total) * 100 : 100
  }

  private calculateCacheHitRate(metrics: PerformanceMetrics[]): number {
    const total = metrics.length
    const cacheHits = metrics.filter(m => m.agent_selection.cache_hit).length
    return total > 0 ? (cacheHits / total) * 100 : 0
  }

  private calculateValueDeliveryAccuracy(metrics: PerformanceMetrics[]): number {
    const validMetrics = metrics.filter(m =>
      m.business_metrics.actual_vs_estimated_variance !== undefined &&
      m.business_metrics.actual_vs_estimated_variance !== null
    )

    if (validMetrics.length === 0) return 1.0

    const avgVariance = validMetrics.reduce((sum, m) =>
      sum + Math.abs(m.business_metrics.actual_vs_estimated_variance!), 0
    ) / validMetrics.length

    return Math.max(0, 1 - avgVariance)
  }

  private calculateTrend(metrics: PerformanceMetrics[], metric: string): number {
    // Simplified trend calculation - would use proper statistical analysis in production
    if (metrics.length < 2) return 0

    const recent = metrics.slice(-10) // Last 10 sessions
    const older = metrics.slice(-20, -10) // Previous 10 sessions

    if (recent.length === 0 || older.length === 0) return 0

    let recentValue = 0, olderValue = 0

    switch (metric) {
      case 'selection_time':
        recentValue = this.calculateAverageSelectionTime(recent)
        olderValue = this.calculateAverageSelectionTime(older)
        break
      case 'consensus_time':
        recentValue = this.calculateAverageConsensusTime(recent)
        olderValue = this.calculateAverageConsensusTime(older)
        break
      case 'value_accuracy':
        recentValue = this.calculateValueDeliveryAccuracy(recent)
        olderValue = this.calculateValueDeliveryAccuracy(older)
        break
    }

    return olderValue > 0 ? ((recentValue - olderValue) / olderValue) * 100 : 0
  }

  private getComplexityTierStats(metrics: PerformanceMetrics[], tier: ComplexityTier) {
    const tierMetrics = metrics.filter(m => m.agent_selection.complexity_tier === tier)

    return {
      session_count: tierMetrics.length,
      average_duration: this.calculateAverageConsensusTime(tierMetrics),
      success_rate: this.calculateImplementationSuccessRate(tierMetrics),
      average_confidence: tierMetrics.length > 0
        ? tierMetrics.reduce((sum, m) => sum + m.agent_selection.confidence_score, 0) / tierMetrics.length
        : 0
    }
  }

  private getActiveAlerts(): PerformanceAlert[] {
    // Return any active performance alerts
    return [] // Would implement real alert system
  }

  private generateOptimizationRecommendations(metrics: PerformanceMetrics[]): string[] {
    const recommendations: string[] = []

    const avgSelectionTime = this.calculateAverageSelectionTime(metrics)
    if (avgSelectionTime > this.thresholds.agent_selection_time_ms) {
      recommendations.push('Consider expanding agent selection cache strategies')
    }

    const consensusRate = this.calculateConsensusRate(metrics)
    if (consensusRate < this.thresholds.consensus_achievement_rate) {
      recommendations.push('Review consensus building algorithms for edge cases')
    }

    const cacheHitRate = this.calculateCacheHitRate(metrics)
    if (cacheHitRate < 70) {
      recommendations.push('Optimize caching patterns for improved selection efficiency')
    }

    return recommendations
  }

  private generateMethodologyUpdates(triggers: RecursiveTrigger[]): string[] {
    return triggers.map(trigger => trigger.recommended_action)
  }

  // Alert and logging methods
  private checkSelectionPerformance(sessionId: string, result: any): void {
    if (result.duration_ms > this.thresholds.agent_selection_time_ms) {
      this.triggerAlert({
        type: 'performance_degradation',
        severity: 'medium',
        session_id: sessionId,
        message: `Agent selection took ${result.duration_ms}ms (threshold: ${this.thresholds.agent_selection_time_ms}ms)`,
        timestamp: Date.now()
      })
    }
  }

  private checkConsensusPerformance(sessionId: string, result: any): void {
    if (!result.achieved) {
      this.triggerAlert({
        type: 'consensus_failure',
        severity: 'high',
        session_id: sessionId,
        message: 'Consensus was not achieved within time limits',
        timestamp: Date.now()
      })
    }
  }

  private checkValueDeliveryAccuracy(sessionId: string, result: any): void {
    if (Math.abs(result.variance_from_estimate) > this.thresholds.value_delivery_accuracy) {
      this.triggerAlert({
        type: 'value_accuracy_miss',
        severity: 'medium',
        session_id: sessionId,
        message: `Value delivery variance: ${(result.variance_from_estimate * 100).toFixed(1)}% (threshold: ±${(this.thresholds.value_delivery_accuracy * 100).toFixed(1)}%)`,
        timestamp: Date.now()
      })
    }
  }

  private logEvent(event: MonitoringEvent): void {
    this.events.push(event)
    // Keep only recent events (last 1000)
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }
  }

  private triggerAlert(alert: PerformanceAlert): void {
    this.alertCallbacks.forEach(callback => callback(alert))
  }

  /**
   * Register alert callback for real-time notifications
   * ALERTING: Real-time performance issue notifications
   */
  onAlert(callback: (alert: PerformanceAlert) => void): void {
    this.alertCallbacks.push(callback)
  }
}

// Supporting interfaces
interface PerformanceDashboard {
  overview: {
    total_sessions: number
    recent_sessions: number
    methodology_version: string
    last_updated: string
  }
  performance_summary: {
    average_selection_time: number
    average_consensus_time: number
    consensus_achievement_rate: number
    implementation_success_rate: number
    cache_hit_rate: number
  }
  efficiency_trends: {
    selection_time_trend: number
    consensus_time_trend: number
    value_accuracy_trend: number
  }
  complexity_breakdown: Record<string, {
    session_count: number
    average_duration: number
    success_rate: number
    average_confidence: number
  }>
  alerts: PerformanceAlert[]
  recommendations: string[]
}

interface RecursiveImprovementAnalysis {
  triggers_detected: number
  triggers: RecursiveTrigger[]
  requires_immediate_attention: boolean
  recommended_methodology_updates: string[]
}

interface RecursiveTrigger {
  type: string
  severity: 'low' | 'medium' | 'high'
  current_value: number
  threshold: number
  recommended_action: string
}

interface PerformanceAlert {
  type: string
  severity: 'low' | 'medium' | 'high'
  session_id: string
  message: string
  timestamp: number
}

// Export singleton instance
export const performanceMonitor = new MultiAgentPerformanceMonitor()

// Export types and re-export enum
export { ComplexityTier } from './agent-selection-engine-v2'
export type { PerformanceMetrics, PerformanceDashboard, RecursiveImprovementAnalysis }