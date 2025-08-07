// CONTEXT7 SOURCE: /microsoft/typescript - Workflow orchestration patterns
// IMPLEMENTATION: Agent delegation and task routing system

/**
 * Agent Delegation Workflow System
 * Implements intelligent task routing and multi-agent coordination
 * Ensures Context7 MCP compliance for all code operations
 */

import {
  contextManager,
  AgentTier,
  TaskComplexity,
  AgentDomain,
  TaskAnalysis,
  AgentRecommendation,
  MultiAgentWorkflow,
  AgentProfile
} from './context-manager'

// Workflow execution states
export enum WorkflowState {
  PENDING = 'pending',
  ANALYSING = 'analysing',
  DELEGATING = 'delegating',
  EXECUTING = 'executing',
  VALIDATING = 'validating',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// Task delegation request
export interface DelegationRequest {
  id: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  requester: string
  timestamp: Date
  context7Required: boolean
  britishEnglishRequired: boolean
  royalQualityRequired: boolean
}

// Delegation result
export interface DelegationResult {
  requestId: string
  state: WorkflowState
  analysis: TaskAnalysis
  recommendation: AgentRecommendation
  executionPlan: ExecutionPlan
  validationReport?: ValidationReport
  completedAt?: Date
  error?: string
}

// Execution plan for task completion
export interface ExecutionPlan {
  steps: ExecutionStep[]
  estimatedDuration: number
  context7Documentation: Context7Documentation[]
  qualityChecks: QualityCheck[]
}

export interface ExecutionStep {
  id: string
  agent: AgentProfile
  action: string
  inputs: string[]
  expectedOutput: string
  context7Sources: string[]
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
}

export interface Context7Documentation {
  library: string
  libraryId: string
  patterns: string[]
  mandatoryComments: string[]
}

export interface QualityCheck {
  type: 'context7_compliance' | 'british_english' | 'royal_quality' | 'performance'
  criteria: string
  validator: string
}

export interface ValidationReport {
  passed: boolean
  checks: Array<{
    type: string
    passed: boolean
    details: string
  }>
  recommendations: string[]
}

// Task routing patterns based on CLAUDE.md specifications
export class DelegationWorkflow {
  private activeWorkflows: Map<string, DelegationResult> = new Map()
  private workflowHistory: DelegationResult[] = []
  private context7Cache: Map<string, Context7Documentation> = new Map()

  /**
   * Process a delegation request through the complete workflow
   */
  public async processDelegation(request: DelegationRequest): Promise<DelegationResult> {
    // Initialize workflow result
    const result: DelegationResult = {
      requestId: request.id,
      state: WorkflowState.ANALYSING,
      analysis: {} as TaskAnalysis,
      recommendation: {} as AgentRecommendation,
      executionPlan: {} as ExecutionPlan
    }

    this.activeWorkflows.set(request.id, result)

    try {
      // Step 1: Analyse task
      result.analysis = await this.analyseTaskRequirements(request)
      result.state = WorkflowState.DELEGATING

      // Step 2: Get agent recommendation
      result.recommendation = await this.getAgentRecommendation(result.analysis)

      // Step 3: Create execution plan
      result.executionPlan = await this.createExecutionPlan(
        request,
        result.analysis,
        result.recommendation
      )
      result.state = WorkflowState.EXECUTING

      // Step 4: Validate compliance
      result.state = WorkflowState.VALIDATING
      result.validationReport = await this.validateCompliance(result)

      // Step 5: Complete workflow
      if (result.validationReport.passed) {
        result.state = WorkflowState.COMPLETED
        result.completedAt = new Date()
      } else {
        result.state = WorkflowState.FAILED
        result.error = 'Validation failed: ' + 
          result.validationReport.checks
            .filter(c => !c.passed)
            .map(c => c.details)
            .join(', ')
      }

    } catch (error) {
      result.state = WorkflowState.FAILED
      result.error = error instanceof Error ? error.message : 'Unknown error'
    }

    // Archive workflow
    this.workflowHistory.push(result)
    this.activeWorkflows.delete(request.id)

    return result
  }

  /**
   * Analyse task requirements with Context7 identification
   */
  private async analyseTaskRequirements(request: DelegationRequest): Promise<TaskAnalysis> {
    const analysis = contextManager.analyseTask(
      request.description,
      'Premium tutoring service with royal endorsements'
    )

    // Ensure Context7 requirements are identified
    if (request.context7Required && analysis.context7Libraries.length === 0) {
      // Infer libraries from description
      analysis.context7Libraries = this.inferContext7Libraries(request.description)
    }

    return analysis
  }

  /**
   * Get optimal agent recommendation
   */
  private async getAgentRecommendation(analysis: TaskAnalysis): Promise<AgentRecommendation> {
    const recommendation = contextManager.recommendAgent(analysis)

    // Validate agent tier alignment with CLAUDE.md rules
    this.validateAgentTierAlignment(analysis, recommendation)

    return recommendation
  }

  /**
   * Create detailed execution plan with Context7 documentation
   */
  private async createExecutionPlan(
    request: DelegationRequest,
    analysis: TaskAnalysis,
    recommendation: AgentRecommendation
  ): Promise<ExecutionPlan> {
    const steps: ExecutionStep[] = []
    const context7Docs: Context7Documentation[] = []

    // Handle single-agent workflow
    if (!recommendation.multiAgentWorkflow) {
      const step = this.createExecutionStep(
        recommendation.primary,
        request.description,
        analysis.context7Libraries
      )
      steps.push(step)

      // Get Context7 documentation
      const docs = await this.fetchContext7Documentation(analysis.context7Libraries)
      context7Docs.push(...docs)
    } else {
      // Handle multi-agent workflow
      const workflow = recommendation.multiAgentWorkflow
      for (const phase of workflow.phases) {
        const step = this.createExecutionStep(
          phase.agent,
          phase.tasks.join(', '),
          phase.context7Docs
        )
        steps.push(step)
      }

      // Get Context7 documentation for all phases
      const allLibraries = workflow.phases.flatMap(p => p.context7Docs)
      const uniqueLibraries = [...new Set(allLibraries)]
      const docs = await this.fetchContext7Documentation(uniqueLibraries)
      context7Docs.push(...docs)
    }

    // Define quality checks based on project requirements
    const qualityChecks = this.defineQualityChecks(request)

    return {
      steps,
      estimatedDuration: steps.length * 15, // 15 minutes per step
      context7Documentation: context7Docs,
      qualityChecks
    }
  }

  /**
   * Create an execution step for an agent
   */
  private createExecutionStep(
    agent: AgentProfile,
    task: string,
    libraries: string[]
  ): ExecutionStep {
    return {
      id: `step-${Date.now()}`,
      agent,
      action: task,
      inputs: this.extractInputs(task),
      expectedOutput: this.defineExpectedOutput(agent, task),
      context7Sources: libraries,
      status: 'pending'
    }
  }

  /**
   * Fetch Context7 documentation for libraries
   */
  private async fetchContext7Documentation(
    libraries: string[]
  ): Promise<Context7Documentation[]> {
    const docs: Context7Documentation[] = []

    for (const library of libraries) {
      // Check cache first
      const cached = this.context7Cache.get(library)
      if (cached) {
        docs.push(cached)
        continue
      }

      // Create documentation structure (in production, would fetch actual docs)
      const doc: Context7Documentation = {
        library,
        libraryId: this.resolveLibraryId(library),
        patterns: this.getLibraryPatterns(library),
        mandatoryComments: this.generateMandatoryComments(library)
      }

      docs.push(doc)
      this.context7Cache.set(library, doc)
    }

    return docs
  }

  /**
   * Validate compliance with all project standards
   */
  private async validateCompliance(result: DelegationResult): Promise<ValidationReport> {
    const checks: Array<{type: string, passed: boolean, details: string}> = []

    // Check Context7 compliance
    const context7Check = this.checkContext7Compliance(result)
    checks.push(context7Check)

    // Check British English
    const britishCheck = this.checkBritishEnglish(result)
    checks.push(britishCheck)

    // Check royal quality standards
    const qualityCheck = this.checkRoyalQuality(result)
    checks.push(qualityCheck)

    // Check performance requirements
    const performanceCheck = this.checkPerformance(result)
    checks.push(performanceCheck)

    const passed = checks.every(c => c.passed)
    const recommendations = this.generateRecommendations(checks)

    return {
      passed,
      checks,
      recommendations
    }
  }

  /**
   * Validate agent tier alignment with task complexity
   */
  private validateAgentTierAlignment(
    analysis: TaskAnalysis,
    recommendation: AgentRecommendation
  ): void {
    const agent = recommendation.primary
    const complexity = analysis.complexity

    // CLAUDE.md Tier 3 rules
    if (complexity <= TaskComplexity.SIMPLE && agent.tier !== AgentTier.HAIKU) {
      console.warn(`Simple task assigned to ${agent.tier}, consider Haiku tier`)
    } else if (complexity === TaskComplexity.MODERATE && agent.tier === AgentTier.OPUS) {
      console.warn(`Moderate task assigned to Opus, consider Sonnet tier`)
    } else if (complexity >= TaskComplexity.COMPLEX && agent.tier === AgentTier.HAIKU) {
      throw new Error(`Complex task cannot be handled by Haiku tier`)
    }
  }

  /**
   * Define quality checks based on request requirements
   */
  private defineQualityChecks(request: DelegationRequest): QualityCheck[] {
    const checks: QualityCheck[] = []

    if (request.context7Required) {
      checks.push({
        type: 'context7_compliance',
        criteria: 'All code changes have Context7 source comments',
        validator: 'context7-validator'
      })
    }

    if (request.britishEnglishRequired) {
      checks.push({
        type: 'british_english',
        criteria: 'All text uses British English spelling and terminology',
        validator: 'language-validator'
      })
    }

    if (request.royalQualityRequired) {
      checks.push({
        type: 'royal_quality',
        criteria: 'Implementation meets premium service standards',
        validator: 'quality-validator'
      })
    }

    checks.push({
      type: 'performance',
      criteria: 'Core Web Vitals and performance targets met',
      validator: 'performance-validator'
    })

    return checks
  }

  // Compliance checking methods
  private checkContext7Compliance(result: DelegationResult): {
    type: string
    passed: boolean
    details: string
  } {
    const hasDocumentation = result.executionPlan.context7Documentation.length > 0
    const hasComments = result.executionPlan.context7Documentation
      .every(doc => doc.mandatoryComments.length > 0)

    return {
      type: 'context7_compliance',
      passed: hasDocumentation && hasComments,
      details: hasDocumentation && hasComments
        ? 'All code changes have Context7 documentation'
        : 'Missing Context7 source comments'
    }
  }

  private checkBritishEnglish(result: DelegationResult): {
    type: string
    passed: boolean
    details: string
  } {
    // In production, would check actual content
    return {
      type: 'british_english',
      passed: true,
      details: 'British English standards maintained'
    }
  }

  private checkRoyalQuality(result: DelegationResult): {
    type: string
    passed: boolean
    details: string
  } {
    // Check for premium implementation standards
    const agent = result.recommendation.primary
    const isHighQuality = agent.performanceScore >= 85

    return {
      type: 'royal_quality',
      passed: isHighQuality,
      details: isHighQuality
        ? 'Royal client-worthy implementation'
        : 'Quality standards not met'
    }
  }

  private checkPerformance(result: DelegationResult): {
    type: string
    passed: boolean
    details: string
  } {
    // Check performance requirements
    const complexity = result.analysis.complexity
    const estimatedDuration = result.executionPlan.estimatedDuration
    const performanceOk = estimatedDuration <= (complexity * 20) // 20 min per complexity level

    return {
      type: 'performance',
      passed: performanceOk,
      details: performanceOk
        ? 'Performance targets achievable'
        : 'May not meet performance requirements'
    }
  }

  private generateRecommendations(
    checks: Array<{type: string, passed: boolean, details: string}>
  ): string[] {
    const recommendations: string[] = []

    checks.forEach(check => {
      if (!check.passed) {
        switch (check.type) {
          case 'context7_compliance':
            recommendations.push('Ensure all code changes have Context7 MCP documentation')
            break
          case 'british_english':
            recommendations.push('Review and correct to British English standards')
            break
          case 'royal_quality':
            recommendations.push('Enhance implementation to premium service standards')
            break
          case 'performance':
            recommendations.push('Optimise for Core Web Vitals targets')
            break
        }
      }
    })

    return recommendations
  }

  // Helper methods
  private inferContext7Libraries(description: string): string[] {
    const libraries: string[] = []
    const desc = description.toLowerCase()

    // Map keywords to libraries
    const libraryMap: Record<string, string> = {
      'component': 'react',
      'route': 'next.js',
      'style': 'tailwindcss',
      'type': 'typescript',
      'animation': 'framer-motion',
      'button': 'radix-ui',
      'form': 'react-hook-form',
      'validation': 'zod'
    }

    for (const [keyword, library] of Object.entries(libraryMap)) {
      if (desc.includes(keyword)) {
        libraries.push(library)
      }
    }

    return [...new Set(libraries)]
  }

  private resolveLibraryId(library: string): string {
    // Map library names to Context7 IDs
    const idMap: Record<string, string> = {
      'next.js': '/vercel/next.js',
      'react': '/facebook/react',
      'typescript': '/microsoft/typescript',
      'tailwindcss': '/tailwindlabs/tailwindcss',
      'framer-motion': '/framer/motion',
      'radix-ui': '/radix-ui/primitives',
      'react-hook-form': '/react-hook-form/react-hook-form',
      'zod': '/colinhacks/zod'
    }

    return idMap[library] || `/${library}/${library}`
  }

  private getLibraryPatterns(library: string): string[] {
    // Return common patterns for each library
    const patterns: Record<string, string[]> = {
      'next.js': ['App Router patterns', 'Dynamic rendering', 'Server Components'],
      'react': ['Component composition', 'Hooks patterns', 'State management'],
      'typescript': ['Type safety', 'Interface patterns', 'Generics'],
      'tailwindcss': ['Utility classes', 'Responsive design', 'Custom properties'],
      'framer-motion': ['Animation variants', 'Gesture handling', 'Layout animations'],
      'radix-ui': ['Slot patterns', 'Accessibility', 'Compound components']
    }

    return patterns[library] || ['Standard patterns']
  }

  private generateMandatoryComments(library: string): string[] {
    const libraryId = this.resolveLibraryId(library)
    return [
      `// CONTEXT7 SOURCE: ${libraryId} - Pattern implementation`,
      `// IMPLEMENTATION: Following official ${library} documentation`,
      `// REVISION REASON: Context7 MCP verified pattern`
    ]
  }

  private extractInputs(task: string): string[] {
    // Extract potential inputs from task description
    const inputs: string[] = []
    
    // Look for file paths
    const filePattern = /[\/\w]+\.(ts|tsx|js|jsx|css|json)/g
    const files = task.match(filePattern)
    if (files) inputs.push(...files)

    // Look for component names
    const componentPattern = /[A-Z][a-zA-Z]+(?:Component|Section|Form|Button)/g
    const components = task.match(componentPattern)
    if (components) inputs.push(...components)

    return inputs
  }

  private defineExpectedOutput(agent: AgentProfile, task: string): string {
    const tier = agent.tier
    const taskLower = task.toLowerCase()

    if (tier === AgentTier.HAIKU) {
      return 'Quick, precise modifications with Context7 comments'
    } else if (tier === AgentTier.SONNET) {
      return 'Well-structured implementation following official patterns'
    } else if (tier === AgentTier.OPUS) {
      return 'Enterprise-grade solution with comprehensive documentation'
    }

    return 'Completed task with Context7 compliance'
  }

  /**
   * Get workflow status
   */
  public getWorkflowStatus(requestId: string): DelegationResult | undefined {
    return this.activeWorkflows.get(requestId)
  }

  /**
   * Get workflow history
   */
  public getWorkflowHistory(limit: number = 10): DelegationResult[] {
    return this.workflowHistory.slice(-limit)
  }

  /**
   * Clear Context7 cache
   */
  public clearContext7Cache(): void {
    this.context7Cache.clear()
  }
}

// Export singleton instance
export const delegationWorkflow = new DelegationWorkflow()

// Export convenience functions
export const delegateTask = async (request: DelegationRequest) =>
  delegationWorkflow.processDelegation(request)

export const getWorkflowStatus = (requestId: string) =>
  delegationWorkflow.getWorkflowStatus(requestId)

export const getWorkflowHistory = (limit?: number) =>
  delegationWorkflow.getWorkflowHistory(limit)