/**
 * Task Tool Integration for Multi-Agent Review Workflow
 *
 * This module provides the actual integration with the Task tool
 * to invoke real specialist agents, replacing mock responses
 * with genuine agent expertise.
 */

// Type definitions for Task tool interaction (CONSENSUS: Hybrid typing approach)
interface TaskToolResponse {
  agentType: string;
  response: string;
  confidence: number;
  timestamp: string;
  metadata?: {
    tokensUsed?: number;
    responseTime?: number;
    model?: string;
    executionProfile?: 'realistic' | 'balanced' | 'fast' | 'debug';
  };
}

interface TaskToolInvocation {
  description: string;
  prompt: string;
  agent?: string;
  timeout?: number;
  maxTokens?: number;
}

// Timing configuration types (CONSENSUS: Configurable profiles)
interface TimingProfile {
  agentDelay: [min: number, max: number];
  roundDelay: number;
}

// Known agents for type safety (CONSENSUS: Hybrid approach)
type KnownAgent =
  | 'system-architect'
  | 'performance-engineer'
  | 'typescript-pro'
  | 'devops-engineer'
  | 'frontend-developer'
  | 'backend-architect'
  | 'database-admin'
  | 'security-auditor';

type AgentInvocation = KnownAgent | { custom: string };

/**
 * TaskToolIntegration class handles all interactions with the Task tool
 * ensuring real agent responses for the multi-agent review workflow
 */
export class TaskToolIntegration {
  private static instance: TaskToolIntegration;
  private executionLog: Map<string, TaskToolResponse[]> = new Map();

  // Singleton pattern to ensure consistent task tool usage
  public static getInstance(): TaskToolIntegration {
    if (!TaskToolIntegration.instance) {
      TaskToolIntegration.instance = new TaskToolIntegration();
    }
    return TaskToolIntegration.instance;
  }

  /**
   * Invokes a specialist agent via the Task tool
   * CONSENSUS IMPLEMENTATION: Real Task tool with timing, typing, and error handling
   */
  public async invokeAgent(
    agentType: string | KnownAgent,
    prompt: string,
    roundType?: string
  ): Promise<string> {
    const startTime = Date.now();
    const correlationId = this.generateCorrelationId();

    console.log(`\n🤖 INVOKING REAL AGENT: ${agentType}`);
    console.log(`🔗 Correlation ID: ${correlationId}`);
    console.log(`📋 Round Type: ${roundType || 'general'}`);
    console.log(`📝 Prompt Length: ${prompt.length} characters`);

    // Validate agent type (supports both known and custom agents)
    if (!this.isValidAgent(agentType)) {
      // Check if it's a custom agent
      if (typeof agentType === 'string' && agentType.length > 0) {
        console.log(`⚠️ Using custom agent: ${agentType}`);
      } else {
        throw new Error(`Invalid agent type: ${agentType}. Cannot invoke non-existent agent.`);
      }
    }

    // Prepare the Task tool invocation with consensus parameters
    const taskInvocation: TaskToolInvocation = {
      description: `Multi-agent review: Invoke ${agentType} specialist for ${roundType || 'analysis'}`,
      prompt: this.formatAgentPrompt(agentType, prompt, roundType),
      agent: this.mapToActualAgentId(agentType),
      timeout: 30000, // Consensus: 30 second timeout
      maxTokens: 4000  // Sufficient for detailed analysis
    };

    try {
      // Execute with timing and monitoring
      const response = await this.executeWithMonitoring(
        () => this.executeTaskTool(taskInvocation),
        agentType,
        correlationId
      );

      // Validate the response is real, not mock
      this.validateRealResponse(response, agentType);

      // Log the execution for audit trail
      const executionTime = Date.now() - startTime;
      this.logExecution(agentType, response, executionTime, correlationId);

      console.log(`✅ ${agentType} provided real response (${response.length} chars in ${(executionTime/1000).toFixed(1)}s)`);

      return response;

    } catch (error) {
      // Structured error logging
      this.logError(agentType, error, correlationId);

      console.error(`❌ Failed to invoke ${agentType}:`, error);
      throw new Error(
        `Multi-agent review failed: Could not get real response from ${agentType}. ` +
        `Correlation ID: ${correlationId}. Error: ${error}`
      );
    }
  }

  /**
   * Execute with monitoring and observability (CONSENSUS: Full observability)
   */
  private async executeWithMonitoring<T>(
    fn: () => Promise<T>,
    agentType: string | KnownAgent,
    correlationId: string
  ): Promise<T> {
    const span = { start: Date.now(), agent: agentType, correlationId };

    try {
      const result = await fn();

      // Log successful execution
      console.log(JSON.stringify({
        event: 'agent_invocation_success',
        ...span,
        duration: Date.now() - span.start,
        timestamp: new Date().toISOString()
      }));

      return result;
    } catch (error) {
      // Log failed execution
      console.log(JSON.stringify({
        event: 'agent_invocation_failure',
        ...span,
        duration: Date.now() - span.start,
        error: String(error),
        timestamp: new Date().toISOString()
      }));

      throw error;
    }
  }

  /**
   * Generate correlation ID for request tracing
   */
  private generateCorrelationId(): string {
    return `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Executes the actual Task tool invocation using Claude Code's native capability
   * CONSENSUS IMPLEMENTATION: Real Task tool invocation with timing and error handling
   */
  private async executeTaskTool(invocation: TaskToolInvocation): Promise<string> {
    // TIMING CONFIGURATION (Consensus: Balanced profile by default)
    const timingProfile = this.getTimingProfile();
    const thinkingTime = this.calculateThinkingTime(timingProfile);

    console.log(`⏳ ${invocation.agent} thinking for ${(thinkingTime/1000).toFixed(1)}s...`);

    try {
      // Add realistic thinking delay BEFORE invocation
      await this.delay(thinkingTime);

      // CRITICAL FIX: Use actual Task tool available in Claude Code environment
      // The Task function is globally available in Claude Code
      const taskResponse = await (globalThis as any).Task({
        description: invocation.description,
        prompt: invocation.prompt
      });

      // Validate we got a real response
      if (!taskResponse || typeof taskResponse !== 'string') {
        throw new Error(`Invalid response from Task tool for ${invocation.agent}`);
      }

      // Additional validation to ensure it's not a mock
      if (taskResponse.includes('[Mock') || taskResponse.includes('[Placeholder')) {
        throw new Error(`Mock response detected from ${invocation.agent} - Task tool may not be available`);
      }

      console.log(`✅ ${invocation.agent} responded (${taskResponse.length} chars)`);
      return taskResponse;

    } catch (error) {
      // Smart retry logic (Consensus: retry network errors only)
      if (this.isRetryableError(error)) {
        console.log(`⚠️ Retryable error for ${invocation.agent}, attempting retry...`);
        return this.executeWithRetry(invocation);
      }

      // Fail fast on logic errors
      throw new Error(
        `Task tool invocation failed for ${invocation.agent}: ${error}\n` +
        `This may indicate the Task tool is not available in the current environment.`
      );
    }
  }

  /**
   * Calculate thinking time based on timing profile (Consensus: 3-5s balanced default)
   */
  private calculateThinkingTime(profile: TimingProfile): number {
    const [min, max] = profile.agentDelay;
    return Math.random() * (max - min) + min;
  }

  /**
   * Get current timing profile (configurable via environment)
   */
  private getTimingProfile(): TimingProfile {
    const profileName = process.env['AGENT_TIMING_PROFILE'] || 'balanced';

    const profiles: Record<string, TimingProfile> = {
      realistic: { agentDelay: [5000, 15000], roundDelay: 3000 },
      balanced: { agentDelay: [3000, 5000], roundDelay: 1000 },  // DEFAULT
      fast: { agentDelay: [500, 1000], roundDelay: 100 },
      debug: { agentDelay: [0, 0], roundDelay: 0 }
    };

    return profiles[profileName] || profiles['balanced'];
  }

  /**
   * Smart retry with exponential backoff (Consensus: max 2 retries, network errors only)
   */
  private async executeWithRetry(
    invocation: TaskToolInvocation,
    attempt: number = 1
  ): Promise<string> {
    const maxRetries = 2;

    if (attempt > maxRetries) {
      throw new Error(`Failed after ${maxRetries} retry attempts`);
    }

    const retryDelay = attempt * 2000; // 2s, then 4s
    console.log(`⏳ Retry attempt ${attempt}/${maxRetries} in ${retryDelay/1000}s...`);
    await this.delay(retryDelay);

    try {
      const taskResponse = await (globalThis as any).Task({
        description: invocation.description,
        prompt: invocation.prompt
      });

      if (!taskResponse || typeof taskResponse !== 'string') {
        throw new Error(`Invalid response on retry ${attempt}`);
      }

      return taskResponse;
    } catch (error) {
      if (this.isRetryableError(error) && attempt < maxRetries) {
        return this.executeWithRetry(invocation, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Check if error is retryable (Consensus: network/timeout errors only)
   */
  private isRetryableError(error: any): boolean {
    const errorString = String(error).toLowerCase();
    return errorString.includes('timeout') ||
           errorString.includes('network') ||
           errorString.includes('econnreset') ||
           errorString.includes('etimedout');
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Type definitions for timing configuration are in the first getTimingProfile method

  /**
   * Validates that the response is genuine, not mock
   */
  private validateRealResponse(response: string, agentType: string): void {
    // Check for mock response indicators
    const mockIndicators = [
      '[Detailed agent response would be generated here]',
      '[Mock response]',
      '[Placeholder]',
      'TODO: Implement actual',
      'FIXME:',
      'Mock implementation'
    ];

    for (const indicator of mockIndicators) {
      if (response.includes(indicator)) {
        throw new Error(
          `CRITICAL: ${agentType} returned a mock response containing "${indicator}". ` +
          `Multi-agent review requires REAL agent responses.`
        );
      }
    }

    // Ensure response has minimum substance
    if (response.length < 100) {
      throw new Error(
        `${agentType} response too short (${response.length} chars). ` +
        `Real agent responses should be detailed and comprehensive.`
      );
    }

    // Check for actual content markers
    const contentMarkers = ['recommend', 'analysis', 'consider', 'approach', 'solution'];
    const hasRealContent = contentMarkers.some(marker =>
      response.toLowerCase().includes(marker)
    );

    if (!hasRealContent) {
      console.warn(`⚠️ ${agentType} response may lack substantive content`);
    }
  }

  /**
   * Formats the prompt for optimal agent response
   */
  private formatAgentPrompt(
    agentType: string,
    basePrompt: string,
    roundType?: string
  ): string {
    const header = `
================================================================================
MULTI-AGENT REVIEW SYSTEM - ${roundType?.toUpperCase() || 'ANALYSIS'} ROUND
================================================================================

You are the ${agentType} specialist participating in a structured expert debate.
Your response will be combined with other specialists to form a consensus solution.

CRITICAL REQUIREMENTS:
- Provide REAL, detailed analysis from your domain expertise
- Be specific with recommendations and metrics
- Consider integration with other domains
- Support your position with concrete reasoning
- This must be a genuine response, not a placeholder

================================================================================
    `.trim();

    const footer = `
================================================================================

Remember: Your response must be substantive and genuine. The multi-agent review
system depends on real expert analysis to generate valuable consensus solutions.
    `.trim();

    return `${header}\n\n${basePrompt}\n\n${footer}`;
  }

  /**
   * Maps agent types to their actual Task tool identifiers
   * CONSENSUS: Support both known and custom agents
   */
  private mapToActualAgentId(agentType: string | KnownAgent): string {
    // Handle custom agent objects
    if (typeof agentType === 'object' && agentType && 'custom' in agentType) {
      return agentType.custom;
    }

    const agent = String(agentType);
    const agentMapping: Record<string, string> = {
      // Frontend & UI
      'frontend-developer': 'frontend-developer',
      'ui-ux-designer': 'ui-ux-designer',
      'flutter-expert': 'flutter-expert',
      'ios-developer': 'ios-developer',
      'android-developer': 'android-developer',
      'react-native-developer': 'react-native-developer',

      // Backend & Infrastructure
      'backend-architect': 'backend-architect',
      'cloud-architect': 'cloud-architect',
      'database-admin': 'database-admin',
      'database-optimizer': 'database-optimizer',
      'network-engineer': 'network-engineer',
      'devops-troubleshooter': 'devops-troubleshooter',

      // Performance & Optimization
      'performance-engineer': 'performance-engineer',
      'mlops-engineer': 'mlops-engineer',

      // Security & Compliance
      'security-auditor': 'security-auditor',
      'legal-advisor': 'legal-advisor',

      // Language Specialists
      'typescript-pro': 'typescript-pro',
      'python-pro': 'python-pro',
      'rust-pro': 'rust-pro',
      'java-pro': 'java-pro',
      'csharp-pro': 'csharp-pro',
      'golang-pro': 'golang-pro',
      'javascript-pro': 'javascript-pro',

      // Specialized Domains
      'payment-integration': 'payment-integration',
      'ml-engineer': 'ml-engineer',
      'data-engineer': 'data-engineer',
      'api-documenter': 'api-documenter',
      'blockchain-expert': 'blockchain-expert',
      'game-developer': 'game-developer',
      'embedded-systems': 'embedded-systems'
    };

    return agentMapping[agent] || agent;
  }

  /**
   * Log errors with structured format (CONSENSUS: Observability)
   */
  private logError(
    agentType: string | KnownAgent,
    error: any,
    correlationId: string
  ): void {
    console.error(JSON.stringify({
      event: 'agent_invocation_error',
      agentType: String(agentType),
      correlationId,
      error: {
        message: String(error),
        stack: error?.stack,
        code: error?.code
      },
      timestamp: new Date().toISOString()
    }));
  }

  /**
   * Validates if an agent type is valid
   */
  private isValidAgent(agentType: string): boolean {
    const validAgents = [
      'frontend-developer', 'ui-ux-designer', 'flutter-expert', 'ios-developer',
      'backend-architect', 'cloud-architect', 'database-admin', 'network-engineer',
      'performance-engineer', 'database-optimizer', 'mlops-engineer',
      'security-auditor', 'legal-advisor',
      'typescript-pro', 'python-pro', 'rust-pro', 'java-pro', 'csharp-pro',
      'golang-pro', 'javascript-pro',
      'payment-integration', 'ml-engineer', 'data-engineer', 'api-documenter',
      'devops-troubleshooter', 'android-developer', 'react-native-developer',
      'blockchain-expert', 'game-developer', 'embedded-systems'
    ];

    return validAgents.includes(agentType);
  }

  /**
   * Logs execution for audit and debugging (CONSENSUS: Structured logging)
   */
  private logExecution(
    agentType: string | KnownAgent,
    response: string,
    executionTime: number,
    correlationId: string
  ): void {
    const timingProfile = this.getTimingProfile();

    const executionRecord: TaskToolResponse = {
      agentType: String(agentType),
      response,
      confidence: this.calculateConfidence(response),
      timestamp: new Date().toISOString(),
      metadata: {
        tokensUsed: Math.ceil(response.length / 4), // Rough estimate
        responseTime: executionTime,
        model: 'specialist-agent',
        executionProfile: process.env.AGENT_TIMING_PROFILE as any || 'balanced'
      }
    };

    // Store in execution log
    if (!this.executionLog.has(agentType)) {
      this.executionLog.set(agentType, []);
    }
    this.executionLog.get(agentType)!.push(executionRecord);

    // Log summary
    console.log(`📊 Execution logged for ${agentType}:`);
    console.log(`   - Response length: ${response.length} chars`);
    console.log(`   - Confidence: ${(executionRecord.confidence * 100).toFixed(1)}%`);
    console.log(`   - Timestamp: ${executionRecord.timestamp}`);
  }

  /**
   * Calculates confidence score from response content
   */
  private calculateConfidence(response: string): number {
    let confidence = 0.5; // Base confidence

    // Increase for detailed responses
    if (response.length > 500) confidence += 0.1;
    if (response.length > 1000) confidence += 0.1;

    // Check for specific expertise indicators
    const expertiseIndicators = [
      'recommend', 'analysis', 'metric', 'performance',
      'architecture', 'implementation', 'optimize', 'security'
    ];

    const matchCount = expertiseIndicators.filter(indicator =>
      response.toLowerCase().includes(indicator)
    ).length;

    confidence += (matchCount * 0.05);

    // Check for structured response
    if (response.includes('1.') || response.includes('•')) confidence += 0.1;

    return Math.min(confidence, 1.0);
  }

  /**
   * Gets execution history for reporting
   */
  public getExecutionHistory(): Map<string, TaskToolResponse[]> {
    return this.executionLog;
  }

  /**
   * Clears execution history
   */
  public clearExecutionHistory(): void {
    this.executionLog.clear();
    console.log('🧹 Execution history cleared');
  }

  /**
   * Generates execution report
   */
  public generateExecutionReport(): string {
    const report: string[] = ['Multi-Agent Review Execution Report'];
    report.push('=' .repeat(50));

    for (const [agent, responses] of Array.from(this.executionLog.entries())) {
      report.push(`\n${agent}:`);
      report.push(`  Total invocations: ${responses.length}`);

      const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length;
      report.push(`  Average confidence: ${(avgConfidence * 100).toFixed(1)}%`);

      const totalChars = responses.reduce((sum, r) => sum + r.response.length, 0);
      report.push(`  Total response chars: ${totalChars}`);
    }

    return report.join('\n');
  }
}

// Export singleton instance for easy access
export const taskToolIntegration = TaskToolIntegration.getInstance();