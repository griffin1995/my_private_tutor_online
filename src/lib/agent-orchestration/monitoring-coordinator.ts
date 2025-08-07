// CONTEXT7 SOURCE: /microsoft/typescript - Real-time monitoring patterns
// IMPLEMENTATION: Multi-agent workflow monitoring and coordination

/**
 * Monitoring and Coordination System
 * Tracks multi-agent workflows and ensures Context7 compliance
 * Provides real-time visibility into agent operations
 */

import {
  contextManager,
  AgentProfile,
  TaskAnalysis,
  MultiAgentWorkflow,
  WorkflowPhase
} from './context-manager'

import {
  delegationWorkflow,
  DelegationRequest,
  DelegationResult,
  WorkflowState,
  ExecutionStep
} from './delegation-workflow'

// Monitoring event types
export enum MonitoringEvent {
  WORKFLOW_STARTED = 'workflow_started',
  AGENT_ASSIGNED = 'agent_assigned',
  CONTEXT7_RETRIEVED = 'context7_retrieved',
  STEP_STARTED = 'step_started',
  STEP_COMPLETED = 'step_completed',
  VALIDATION_PASSED = 'validation_passed',
  VALIDATION_FAILED = 'validation_failed',
  WORKFLOW_COMPLETED = 'workflow_completed',
  ERROR_OCCURRED = 'error_occurred'
}

// Monitoring metrics
export interface WorkflowMetrics {
  totalWorkflows: number
  activeWorkflows: number
  completedWorkflows: number
  failedWorkflows: number
  averageDuration: number
  agentUtilisation: Map<string, number>
  context7ComplianceRate: number
  qualityScore: number
}

// Agent coordination state
export interface CoordinationState {
  activeAgents: Map<string, AgentActivity>
  pendingHandoffs: HandoffRequest[]
  completedHandoffs: HandoffRecord[]
  blockedWorkflows: BlockedWorkflow[]
}

export interface AgentActivity {
  agentId: string
  workflowId: string
  taskDescription: string
  startTime: Date
  estimatedCompletion: Date
  context7Libraries: string[]
  status: 'active' | 'waiting' | 'blocked'
}

export interface HandoffRequest {
  fromAgent: string
  toAgent: string
  workflowId: string
  context: string
  artifacts: string[]
  scheduledTime: Date
}

export interface HandoffRecord {
  request: HandoffRequest
  completedAt: Date
  success: boolean
  notes: string
}

export interface BlockedWorkflow {
  workflowId: string
  agentId: string
  reason: string
  blockedAt: Date
  resolution?: string
}

// Performance tracking
export interface AgentPerformance {
  agentId: string
  tasksCompleted: number
  successRate: number
  averageExecutionTime: number
  context7ComplianceRate: number
  lastActive: Date
}

// Alert levels for monitoring
export enum AlertLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export interface MonitoringAlert {
  level: AlertLevel
  message: string
  details: any
  timestamp: Date
  workflowId?: string
  agentId?: string
}

/**
 * Multi-agent monitoring and coordination service
 */
export class MonitoringCoordinator {
  private metrics: WorkflowMetrics = {
    totalWorkflows: 0,
    activeWorkflows: 0,
    completedWorkflows: 0,
    failedWorkflows: 0,
    averageDuration: 0,
    agentUtilisation: new Map(),
    context7ComplianceRate: 100,
    qualityScore: 100
  }

  private coordinationState: CoordinationState = {
    activeAgents: new Map(),
    pendingHandoffs: [],
    completedHandoffs: [],
    blockedWorkflows: []
  }

  private agentPerformance: Map<string, AgentPerformance> = new Map()
  private eventLog: Array<{event: MonitoringEvent, data: any, timestamp: Date}> = []
  private alerts: MonitoringAlert[] = []
  private workflowDurations: number[] = []

  /**
   * Start monitoring a workflow
   */
  public startWorkflowMonitoring(request: DelegationRequest, result: DelegationResult): void {
    this.logEvent(MonitoringEvent.WORKFLOW_STARTED, {
      workflowId: request.id,
      description: request.description,
      priority: request.priority
    })

    this.metrics.totalWorkflows++
    this.metrics.activeWorkflows++

    // Monitor each execution step
    if (result.executionPlan) {
      this.monitorExecutionPlan(request.id, result.executionPlan.steps)
    }

    // Set up agent coordination if multi-agent
    if (result.recommendation.multiAgentWorkflow) {
      this.coordinateMultiAgentWorkflow(request.id, result.recommendation.multiAgentWorkflow)
    }
  }

  /**
   * Monitor execution plan progress
   */
  private monitorExecutionPlan(workflowId: string, steps: ExecutionStep[]): void {
    steps.forEach((step, index) => {
      // Track agent assignment
      this.logEvent(MonitoringEvent.AGENT_ASSIGNED, {
        workflowId,
        agentId: step.agent.id,
        agentName: step.agent.name,
        stepIndex: index
      })

      // Update agent utilisation
      const currentUtilisation = this.metrics.agentUtilisation.get(step.agent.id) || 0
      this.metrics.agentUtilisation.set(step.agent.id, currentUtilisation + 1)

      // Track Context7 documentation retrieval
      if (step.context7Sources.length > 0) {
        this.logEvent(MonitoringEvent.CONTEXT7_RETRIEVED, {
          workflowId,
          libraries: step.context7Sources,
          agentId: step.agent.id
        })
      }

      // Create agent activity record
      const activity: AgentActivity = {
        agentId: step.agent.id,
        workflowId,
        taskDescription: step.action,
        startTime: new Date(),
        estimatedCompletion: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        context7Libraries: step.context7Sources,
        status: 'waiting'
      }

      this.coordinationState.activeAgents.set(step.agent.id, activity)
    })
  }

  /**
   * Coordinate multi-agent workflow execution
   */
  private coordinateMultiAgentWorkflow(
    workflowId: string, 
    workflow: MultiAgentWorkflow
  ): void {
    // Set up phase transitions
    workflow.phases.forEach((phase, index) => {
      if (index > 0) {
        const previousPhase = workflow.phases[index - 1]
        
        // Create handoff request
        const handoff: HandoffRequest = {
          fromAgent: previousPhase.agent.id,
          toAgent: phase.agent.id,
          workflowId,
          context: phase.inputContext,
          artifacts: [previousPhase.expectedOutput],
          scheduledTime: new Date(Date.now() + (index * 15 * 60 * 1000))
        }

        this.coordinationState.pendingHandoffs.push(handoff)
      }
    })

    // Monitor for dependencies
    workflow.dependencies.forEach(dep => {
      this.monitorDependency(workflowId, dep.from, dep.to, dep.handoffContext)
    })
  }

  /**
   * Monitor workflow step execution
   */
  public monitorStepExecution(
    workflowId: string,
    stepId: string,
    status: 'started' | 'completed' | 'failed'
  ): void {
    const event = status === 'started' 
      ? MonitoringEvent.STEP_STARTED
      : status === 'completed'
      ? MonitoringEvent.STEP_COMPLETED
      : MonitoringEvent.ERROR_OCCURRED

    this.logEvent(event, {
      workflowId,
      stepId,
      status,
      timestamp: new Date()
    })

    // Update agent activity
    const agent = Array.from(this.coordinationState.activeAgents.values())
      .find(a => a.workflowId === workflowId)

    if (agent) {
      agent.status = status === 'started' ? 'active' : 'waiting'
      
      // Update performance metrics
      if (status === 'completed') {
        this.updateAgentPerformance(agent.agentId, true)
      } else if (status === 'failed') {
        this.updateAgentPerformance(agent.agentId, false)
      }
    }
  }

  /**
   * Complete workflow monitoring
   */
  public completeWorkflowMonitoring(
    workflowId: string,
    result: DelegationResult
  ): void {
    const success = result.state === WorkflowState.COMPLETED

    this.logEvent(
      success ? MonitoringEvent.WORKFLOW_COMPLETED : MonitoringEvent.ERROR_OCCURRED,
      {
        workflowId,
        state: result.state,
        duration: Date.now() - result.requestId.split('-')[1], // Rough duration
        validationPassed: result.validationReport?.passed
      }
    )

    // Update metrics
    this.metrics.activeWorkflows--
    if (success) {
      this.metrics.completedWorkflows++
    } else {
      this.metrics.failedWorkflows++
    }

    // Calculate average duration
    const duration = Date.now() - parseInt(result.requestId.split('-')[1])
    this.workflowDurations.push(duration)
    this.metrics.averageDuration = 
      this.workflowDurations.reduce((a, b) => a + b, 0) / this.workflowDurations.length

    // Update compliance rate
    if (result.validationReport) {
      const context7Check = result.validationReport.checks
        .find(c => c.type === 'context7_compliance')
      
      if (context7Check) {
        this.updateComplianceRate(context7Check.passed)
      }
    }

    // Clean up coordination state
    this.cleanupWorkflowCoordination(workflowId)
  }

  /**
   * Monitor dependency between workflow phases
   */
  private monitorDependency(
    workflowId: string,
    fromPhase: string,
    toPhase: string,
    context: string
  ): void {
    // In production, would set up actual dependency monitoring
    console.log(`Monitoring dependency: ${fromPhase} -> ${toPhase} for workflow ${workflowId}`)
  }

  /**
   * Update agent performance metrics
   */
  private updateAgentPerformance(agentId: string, success: boolean): void {
    let performance = this.agentPerformance.get(agentId)
    
    if (!performance) {
      performance = {
        agentId,
        tasksCompleted: 0,
        successRate: 100,
        averageExecutionTime: 0,
        context7ComplianceRate: 100,
        lastActive: new Date()
      }
      this.agentPerformance.set(agentId, performance)
    }

    performance.tasksCompleted++
    performance.successRate = 
      ((performance.successRate * (performance.tasksCompleted - 1)) + (success ? 100 : 0)) / 
      performance.tasksCompleted
    performance.lastActive = new Date()

    // Update context manager with performance data
    contextManager.updateAgentPerformance(agentId, success)
  }

  /**
   * Update Context7 compliance rate
   */
  private updateComplianceRate(passed: boolean): void {
    const totalChecks = this.metrics.completedWorkflows + this.metrics.failedWorkflows
    const currentRate = this.metrics.context7ComplianceRate
    
    this.metrics.context7ComplianceRate = 
      ((currentRate * (totalChecks - 1)) + (passed ? 100 : 0)) / totalChecks
  }

  /**
   * Clean up workflow coordination state
   */
  private cleanupWorkflowCoordination(workflowId: string): void {
    // Remove active agents
    for (const [agentId, activity] of this.coordinationState.activeAgents.entries()) {
      if (activity.workflowId === workflowId) {
        this.coordinationState.activeAgents.delete(agentId)
      }
    }

    // Move pending handoffs to completed
    const pendingHandoffs = this.coordinationState.pendingHandoffs
      .filter(h => h.workflowId === workflowId)
    
    pendingHandoffs.forEach(handoff => {
      this.coordinationState.completedHandoffs.push({
        request: handoff,
        completedAt: new Date(),
        success: true,
        notes: 'Workflow completed'
      })
    })

    this.coordinationState.pendingHandoffs = 
      this.coordinationState.pendingHandoffs.filter(h => h.workflowId !== workflowId)

    // Clear blocked workflows
    this.coordinationState.blockedWorkflows = 
      this.coordinationState.blockedWorkflows.filter(b => b.workflowId !== workflowId)
  }

  /**
   * Create monitoring alert
   */
  public createAlert(
    level: AlertLevel,
    message: string,
    details: any,
    workflowId?: string,
    agentId?: string
  ): void {
    const alert: MonitoringAlert = {
      level,
      message,
      details,
      timestamp: new Date(),
      workflowId,
      agentId
    }

    this.alerts.push(alert)

    // Handle critical alerts
    if (level === AlertLevel.CRITICAL) {
      this.handleCriticalAlert(alert)
    }
  }

  /**
   * Handle critical alerts
   */
  private handleCriticalAlert(alert: MonitoringAlert): void {
    console.error(`CRITICAL ALERT: ${alert.message}`, alert.details)
    
    // Block affected workflow if applicable
    if (alert.workflowId) {
      this.blockWorkflow(alert.workflowId, alert.agentId || 'unknown', alert.message)
    }
  }

  /**
   * Block a workflow due to issues
   */
  public blockWorkflow(workflowId: string, agentId: string, reason: string): void {
    const blocked: BlockedWorkflow = {
      workflowId,
      agentId,
      reason,
      blockedAt: new Date()
    }

    this.coordinationState.blockedWorkflows.push(blocked)
    
    this.createAlert(
      AlertLevel.WARNING,
      `Workflow ${workflowId} blocked`,
      { reason, agentId },
      workflowId,
      agentId
    )
  }

  /**
   * Resolve a blocked workflow
   */
  public resolveBlockedWorkflow(workflowId: string, resolution: string): void {
    const blocked = this.coordinationState.blockedWorkflows
      .find(b => b.workflowId === workflowId)
    
    if (blocked) {
      blocked.resolution = resolution
      this.coordinationState.blockedWorkflows = 
        this.coordinationState.blockedWorkflows.filter(b => b.workflowId !== workflowId)
    }
  }

  /**
   * Log monitoring event
   */
  private logEvent(event: MonitoringEvent, data: any): void {
    this.eventLog.push({
      event,
      data,
      timestamp: new Date()
    })

    // Keep only last 1000 events
    if (this.eventLog.length > 1000) {
      this.eventLog = this.eventLog.slice(-1000)
    }
  }

  /**
   * Get current metrics
   */
  public getMetrics(): WorkflowMetrics {
    return { ...this.metrics }
  }

  /**
   * Get coordination state
   */
  public getCoordinationState(): CoordinationState {
    return {
      activeAgents: new Map(this.coordinationState.activeAgents),
      pendingHandoffs: [...this.coordinationState.pendingHandoffs],
      completedHandoffs: [...this.coordinationState.completedHandoffs],
      blockedWorkflows: [...this.coordinationState.blockedWorkflows]
    }
  }

  /**
   * Get agent performance data
   */
  public getAgentPerformance(agentId?: string): AgentPerformance | AgentPerformance[] {
    if (agentId) {
      return this.agentPerformance.get(agentId) || {
        agentId,
        tasksCompleted: 0,
        successRate: 0,
        averageExecutionTime: 0,
        context7ComplianceRate: 0,
        lastActive: new Date()
      }
    }
    
    return Array.from(this.agentPerformance.values())
  }

  /**
   * Get recent alerts
   */
  public getAlerts(level?: AlertLevel, limit: number = 50): MonitoringAlert[] {
    let alerts = this.alerts
    
    if (level) {
      alerts = alerts.filter(a => a.level === level)
    }
    
    return alerts.slice(-limit)
  }

  /**
   * Get event log
   */
  public getEventLog(event?: MonitoringEvent, limit: number = 100): any[] {
    let log = this.eventLog
    
    if (event) {
      log = log.filter(e => e.event === event)
    }
    
    return log.slice(-limit)
  }

  /**
   * Generate monitoring report
   */
  public generateReport(): string {
    const metrics = this.getMetrics()
    const state = this.getCoordinationState()
    
    return `
# Agent Orchestration Monitoring Report

## Workflow Metrics
- Total Workflows: ${metrics.totalWorkflows}
- Active Workflows: ${metrics.activeWorkflows}
- Completed: ${metrics.completedWorkflows}
- Failed: ${metrics.failedWorkflows}
- Average Duration: ${Math.round(metrics.averageDuration / 1000 / 60)} minutes
- Context7 Compliance Rate: ${metrics.context7ComplianceRate.toFixed(1)}%
- Quality Score: ${metrics.qualityScore.toFixed(1)}%

## Agent Utilisation
${Array.from(metrics.agentUtilisation.entries())
  .map(([agent, count]) => `- ${agent}: ${count} tasks`)
  .join('\n')}

## Coordination State
- Active Agents: ${state.activeAgents.size}
- Pending Handoffs: ${state.pendingHandoffs.length}
- Completed Handoffs: ${state.completedHandoffs.length}
- Blocked Workflows: ${state.blockedWorkflows.length}

## Recent Alerts
${this.getAlerts(undefined, 5)
  .map(a => `- [${a.level.toUpperCase()}] ${a.message}`)
  .join('\n')}
    `
  }
}

// Export singleton instance
export const monitoringCoordinator = new MonitoringCoordinator()

// Export convenience functions
export const startMonitoring = (request: DelegationRequest, result: DelegationResult) =>
  monitoringCoordinator.startWorkflowMonitoring(request, result)

export const getMetrics = () => monitoringCoordinator.getMetrics()

export const getCoordinationState = () => monitoringCoordinator.getCoordinationState()

export const createAlert = (
  level: AlertLevel,
  message: string,
  details: any,
  workflowId?: string,
  agentId?: string
) => monitoringCoordinator.createAlert(level, message, details, workflowId, agentId)

export const generateMonitoringReport = () => monitoringCoordinator.generateReport()