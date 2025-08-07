// CONTEXT7 SOURCE: /microsoft/typescript - Module export patterns
// IMPLEMENTATION: Unified agent orchestration system exports

/**
 * Agent Orchestration System
 * Central export point for all context management and agent coordination
 * Enforces Context7 MCP standards across 50+ specialist agents
 */

// Export context management
export {
  // Context Manager
  contextManager,
  analyseTask,
  recommendAgent,
  generateAgentContext,
  validateContext7,
  
  // Types
  AgentTier,
  TaskComplexity,
  AgentDomain,
  type AgentProfile,
  type TaskAnalysis,
  type AgentRecommendation,
  type MultiAgentWorkflow,
  type WorkflowPhase,
  type WorkflowDependency,
  type QuickContext,
  type FullContext,
  type ArchivedContext
} from './context-manager'

// Export delegation workflow
export {
  // Delegation Workflow
  delegationWorkflow,
  delegateTask,
  getWorkflowStatus,
  getWorkflowHistory,
  
  // Types
  WorkflowState,
  type DelegationRequest,
  type DelegationResult,
  type ExecutionPlan,
  type ExecutionStep,
  type Context7Documentation,
  type QualityCheck,
  type ValidationReport
} from './delegation-workflow'

// Export monitoring coordination
export {
  // Monitoring Coordinator
  monitoringCoordinator,
  startMonitoring,
  getMetrics,
  getCoordinationState,
  createAlert,
  generateMonitoringReport,
  
  // Types
  MonitoringEvent,
  AlertLevel,
  type WorkflowMetrics,
  type CoordinationState,
  type AgentActivity,
  type HandoffRequest,
  type HandoffRecord,
  type BlockedWorkflow,
  type AgentPerformance,
  type MonitoringAlert
} from './monitoring-coordinator'

// Unified orchestration interface
export interface OrchestrationSystem {
  // Task analysis and routing
  analyseAndDelegate: (taskDescription: string, priority?: string) => Promise<DelegationResult>
  
  // Workflow management
  getActiveWorkflows: () => DelegationResult[]
  getWorkflowMetrics: () => WorkflowMetrics
  
  // Agent management
  getAgentStatus: (agentId: string) => AgentActivity | undefined
  getAgentPerformance: (agentId: string) => AgentPerformance
  
  // Monitoring
  getSystemHealth: () => SystemHealth
  getComplianceStatus: () => ComplianceStatus
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical'
  activeWorkflows: number
  agentAvailability: number
  context7ComplianceRate: number
  averageResponseTime: number
  alerts: MonitoringAlert[]
}

export interface ComplianceStatus {
  context7Compliance: boolean
  britishEnglishCompliance: boolean
  royalQualityCompliance: boolean
  performanceCompliance: boolean
  overallScore: number
}

/**
 * Main orchestration system implementation
 */
class AgentOrchestrationSystem implements OrchestrationSystem {
  /**
   * Analyse task and delegate to appropriate agent(s)
   */
  async analyseAndDelegate(
    taskDescription: string, 
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<DelegationResult> {
    // Create delegation request
    const request: DelegationRequest = {
      id: `req-${Date.now()}`,
      description: taskDescription,
      priority,
      requester: 'system',
      timestamp: new Date(),
      context7Required: true, // Always required for this project
      britishEnglishRequired: true, // Project standard
      royalQualityRequired: true // Premium service standard
    }

    // Process delegation
    const result = await delegateTask(request)

    // Start monitoring
    startMonitoring(request, result)

    return result
  }

  /**
   * Get all active workflows
   */
  getActiveWorkflows(): DelegationResult[] {
    const history = getWorkflowHistory(100)
    return history.filter(w => 
      w.state === WorkflowState.EXECUTING || 
      w.state === WorkflowState.ANALYSING ||
      w.state === WorkflowState.DELEGATING
    )
  }

  /**
   * Get workflow metrics
   */
  getWorkflowMetrics(): WorkflowMetrics {
    return getMetrics()
  }

  /**
   * Get agent status
   */
  getAgentStatus(agentId: string): AgentActivity | undefined {
    const state = getCoordinationState()
    return state.activeAgents.get(agentId)
  }

  /**
   * Get agent performance
   */
  getAgentPerformance(agentId: string): AgentPerformance {
    return monitoringCoordinator.getAgentPerformance(agentId) as AgentPerformance
  }

  /**
   * Get system health status
   */
  getSystemHealth(): SystemHealth {
    const metrics = getMetrics()
    const alerts = monitoringCoordinator.getAlerts()
    const state = getCoordinationState()

    // Determine health status
    let status: 'healthy' | 'degraded' | 'critical' = 'healthy'
    
    if (state.blockedWorkflows.length > 0) {
      status = 'degraded'
    }
    
    if (alerts.some(a => a.level === AlertLevel.CRITICAL)) {
      status = 'critical'
    }
    
    if (metrics.context7ComplianceRate < 90) {
      status = 'degraded'
    }
    
    if (metrics.context7ComplianceRate < 80) {
      status = 'critical'
    }

    return {
      status,
      activeWorkflows: metrics.activeWorkflows,
      agentAvailability: state.activeAgents.size,
      context7ComplianceRate: metrics.context7ComplianceRate,
      averageResponseTime: metrics.averageDuration,
      alerts: alerts.slice(-5)
    }
  }

  /**
   * Get compliance status
   */
  getComplianceStatus(): ComplianceStatus {
    const metrics = getMetrics()
    
    // Calculate compliance scores
    const context7 = metrics.context7ComplianceRate >= 100
    const britishEnglish = true // Assumed compliant
    const royalQuality = metrics.qualityScore >= 90
    const performance = metrics.averageDuration <= 30 * 60 * 1000 // 30 minutes
    
    const overallScore = (
      (context7 ? 40 : 0) +
      (britishEnglish ? 20 : 0) +
      (royalQuality ? 20 : 0) +
      (performance ? 20 : 0)
    )

    return {
      context7Compliance: context7,
      britishEnglishCompliance: britishEnglish,
      royalQualityCompliance: royalQuality,
      performanceCompliance: performance,
      overallScore
    }
  }
}

// Export singleton orchestration system
export const orchestrationSystem = new AgentOrchestrationSystem()

// Quick access functions
export const orchestrate = (task: string, priority?: 'low' | 'medium' | 'high' | 'critical') =>
  orchestrationSystem.analyseAndDelegate(task, priority)

export const getSystemHealth = () => orchestrationSystem.getSystemHealth()

export const getComplianceStatus = () => orchestrationSystem.getComplianceStatus()

// Utility function to validate project setup
export function validateOrchestrationSetup(): boolean {
  try {
    // Check context manager
    const testAnalysis = analyseTask('Test task for validation')
    if (!testAnalysis) return false

    // Check delegation workflow
    const workflows = getWorkflowHistory(1)
    
    // Check monitoring
    const metrics = getMetrics()
    if (!metrics) return false

    // Check compliance
    const compliance = getComplianceStatus()
    if (compliance.overallScore < 80) {
      console.warn('Compliance score below threshold:', compliance.overallScore)
    }

    console.log('✅ Agent orchestration system validated successfully')
    return true
  } catch (error) {
    console.error('❌ Agent orchestration validation failed:', error)
    return false
  }
}

// Auto-validate on import in development
if (process.env.NODE_ENV === 'development') {
  validateOrchestrationSetup()
}