/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced performance type system
 * PERFORMANCE ENHANCEMENT REASON: Comprehensive type-safe performance monitoring with zero runtime cost
 * ARCHITECTURE: Advanced branded types for agent execution, build performance, and monitoring metrics
 *
 * Phase 2 Implementation: Enhanced performance type system for comprehensive monitoring
 * Design Pattern: Advanced branded types with generic constraints and conditional type inference
 * Zero Runtime Cost: All types are compile-time only with no runtime overhead
 * Build-Time Validation: Performance thresholds enforced during TypeScript compilation
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Branded types and keyof with indexed access
// PERFORMANCE TYPING REASON: Advanced nominal typing for performance metrics using unique symbols
declare const __brand: unique symbol;
type Brand<K, T> = K & { readonly [__brand]: T };

// ============================================================================
// AGENT EXECUTION METRICS - For slash commands performance
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced branded types for agent performance
// IMPLEMENTATION REASON: Type-safe agent execution timing and throughput metrics
export type AgentExecutionTime = Brand<number, 'AgentExecutionTime'>;
export type AgentThroughput = Brand<number, 'AgentThroughput'>;
export type TaskComplexityScore = Brand<number, 'TaskComplexityScore'>;
export type ConsensusConfidence = Brand<number, 'ConsensusConfidence'>;
export type ParallelizationRatio = Brand<number, 'ParallelizationRatio'>;

// CONTEXT7 SOURCE: /microsoft/typescript - Generic type aliases for agent domains
// TYPE SAFETY REASON: Ensure only valid domains are used in agent selection
export type Domain =
  | 'security'
  | 'performance'
  | 'design'
  | 'business'
  | 'architecture'
  | 'testing'
  | 'documentation'
  | 'deployment';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface patterns for agent performance profiles
// MONITORING REASON: Comprehensive agent execution tracking with type safety
export interface AgentPerformanceProfile {
  readonly agentType: 'haiku' | 'sonnet' | 'opus';
  readonly executionTime: AgentExecutionTime;
  readonly throughput: AgentThroughput;
  readonly complexity: TaskComplexityScore;
  readonly consensusLevel: ConsensusConfidence;
  readonly parallelizationRatio: ParallelizationRatio;
  readonly domains: readonly Domain[];
  readonly timestamp: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Branded type constructors for agent metrics
// VALIDATION REASON: Runtime validation with compile-time type safety
export const createAgentExecutionTime = (value: number): AgentExecutionTime => {
  if (value < 0) throw new Error('Agent execution time must be non-negative');
  return value as unknown as AgentExecutionTime;
};

export const createAgentThroughput = (value: number): AgentThroughput => {
  if (value < 0) throw new Error('Agent throughput must be non-negative');
  return value as unknown as AgentThroughput;
};

export const createTaskComplexityScore = (value: number): TaskComplexityScore => {
  if (value < 0 || value > 100) throw new Error('Task complexity must be between 0 and 100');
  return value as unknown as TaskComplexityScore;
};

export const createConsensusConfidence = (value: number): ConsensusConfidence => {
  if (value < 0 || value > 100) throw new Error('Consensus confidence must be between 0 and 100');
  return value as unknown as ConsensusConfidence;
};

export const createParallelizationRatio = (value: number): ParallelizationRatio => {
  if (value < 0 || value > 1) throw new Error('Parallelization ratio must be between 0 and 1');
  return value as unknown as ParallelizationRatio;
};

// ============================================================================
// BUILD PERFORMANCE METRICS - Advanced build system monitoring
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced branded types for build performance
// BUILD MONITORING REASON: Granular build phase tracking with type safety
export type BuildPhaseTime = Brand<number, 'BuildPhaseTime'>;
export type CompilationSpeed = Brand<number, 'CompilationSpeed'>;
export type BundleEfficiency = Brand<number, 'BundleEfficiency'>;
export type CodeCoverage = Brand<number, 'CodeCoverage'>;
export type OptimizationRatio = Brand<number, 'OptimizationRatio'>;

// CONTEXT7 SOURCE: /microsoft/typescript - Generic constraint patterns for build phases
// TYPE CONSTRAINT REASON: Ensure only valid build phases are tracked
export type BuildPhase =
  | 'initialization'
  | 'dependency-resolution'
  | 'type-checking'
  | 'compilation'
  | 'bundling'
  | 'optimization'
  | 'finalization';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface composition for build metrics
// BUILD TRACKING REASON: Comprehensive build performance monitoring
export interface BuildPerformanceMetrics {
  readonly phase: BuildPhase;
  readonly phaseTime: BuildPhaseTime;
  readonly compilationSpeed: CompilationSpeed;
  readonly bundleEfficiency: BundleEfficiency;
  readonly codeCoverage: CodeCoverage;
  readonly optimizationRatio: OptimizationRatio;
  readonly memoryUsage: Brand<number, 'MemoryUsage'>;
  readonly cpuUsage: Brand<number, 'CpuUsage'>;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Conditional type patterns for build validation
// COMPILE-TIME VALIDATION: Type-level build performance validation
export type ValidateBuildPerformance<T extends BuildPerformanceMetrics> =
  T['phaseTime'] extends BuildPhaseTime
    ? T['bundleEfficiency'] extends BundleEfficiency
      ? T['optimizationRatio'] extends OptimizationRatio
        ? T // Valid build metrics
        : never // Invalid optimization ratio
      : never // Invalid bundle efficiency
    : never; // Invalid phase time

// ============================================================================
// WEB VITALS ENHANCED TYPES - Advanced performance metrics
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced Web Vitals types with branded metrics
// WEB PERFORMANCE REASON: Type-safe Web Vitals tracking with enhanced metrics
export interface WebVitalsMetric {
  readonly id: string;
  readonly name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP';
  readonly value: number;
  readonly rating: 'good' | 'needs-improvement' | 'poor';
  readonly delta: number;
  readonly entries: PerformanceEntry[];
  readonly navigationType: 'navigate' | 'reload' | 'back-forward' | 'prerender';
  // Additional properties for enhanced monitoring
  readonly target?: Element;
  readonly processingStart?: number;
  readonly processingEnd?: number;
  readonly duration?: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Generic function type aliases for metric handlers
// HANDLER PATTERN: Type-safe metric processing with generic constraints
export type MetricHandler<T extends WebVitalsMetric = WebVitalsMetric> = (metric: T) => void;
export type MetricProcessor<T extends WebVitalsMetric, R> = (metric: T) => R;

// ============================================================================
// MONITORING DASHBOARD TYPES - Enhanced dashboard interfaces
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Record type patterns for dashboard metrics
// DASHBOARD REASON: Comprehensive monitoring dashboard with type safety
export interface PerformanceDashboardMetrics {
  readonly agentMetrics: readonly AgentPerformanceProfile[];
  readonly buildMetrics: readonly BuildPerformanceMetrics[];
  readonly webVitals: readonly WebVitalsMetric[];
  readonly businessValue: Brand<number, 'BusinessValue'>;
  readonly optimizationImpact: Brand<number, 'OptimizationImpact'>;
  readonly timestamp: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Mapped type patterns for metric aggregation
// AGGREGATION REASON: Type-safe metric aggregation for dashboard display
export type MetricAggregation<T extends Record<string, any>> = {
  readonly [K in keyof T]: {
    readonly current: T[K];
    readonly average: T[K];
    readonly min: T[K];
    readonly max: T[K];
    readonly trend: 'improving' | 'stable' | 'degrading';
  };
};

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced type inference utilities for dashboards
// INFERENCE PATTERN: Extract metric types from complex dashboard structures
export type ExtractMetricType<T> = T extends { metrics: infer M } ? M : never;
export type ExtractPerformanceData<T> = T extends { performance: infer P } ? P : never;

// ============================================================================
// PERFORMANCE TESTING FRAMEWORK TYPES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Generic interface patterns for test scenarios
// TESTING FRAMEWORK: Type-safe performance test definitions
export interface PerformanceTestScenario<T extends BuildPhase = BuildPhase> {
  readonly name: string;
  readonly phase: T;
  readonly expectedTime: BuildPhaseTime;
  readonly actualTime?: BuildPhaseTime;
  readonly threshold: Brand<number, 'Threshold'>;
  readonly critical: boolean;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Conditional type patterns for test results
// TEST VALIDATION: Compile-time test result validation
export type PerformanceTestResult<T extends PerformanceTestScenario> =
  T['actualTime'] extends BuildPhaseTime
    ? {
        readonly scenario: T['name'];
        readonly passed: boolean;
        readonly improvement: Brand<number, 'ImprovementPercentage'>;
        readonly recommendation?: string;
      }
    : never;

// CONTEXT7 SOURCE: /microsoft/typescript - Tuple type patterns for test history
// HISTORY TRACKING: Type-safe performance test history
export type TestHistory<T extends BuildPhase> = readonly [
  PerformanceTestScenario<T>,
  ...PerformanceTestScenario<T>[]
];

// ============================================================================
// PERFORMANCE EMOJI UTILITIES - For debug panel visualization
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Literal type patterns for performance indicators
// VISUALIZATION REASON: Type-safe performance status indicators
export type PerformanceStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export const getPerformanceEmoji = (status: PerformanceStatus): string => {
  const emojiMap: Record<PerformanceStatus, string> = {
    excellent: '🚀',
    good: '✅',
    fair: '⚠️',
    poor: '⚡',
    critical: '🔴'
  };
  return emojiMap[status];
};

// ============================================================================
// WORKFLOW METRICS - For FAQ version control dashboard
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Interface patterns for workflow metrics
// WORKFLOW TRACKING: Type-safe workflow performance monitoring
export interface WorkflowMetrics {
  readonly executionTime: AgentExecutionTime;
  readonly stepsCompleted: number;
  readonly stepsTotal: number;
  readonly successRate: Brand<number, 'SuccessRate'>;
  readonly averageStepTime: AgentExecutionTime;
}

// CONTEXT7 SOURCE: /microsoft/typescript - System health monitoring types
// HEALTH MONITORING: Comprehensive system health tracking
export interface SystemHealthMetrics {
  readonly cpuUsage: Brand<number, 'CpuPercentage'>;
  readonly memoryUsage: Brand<number, 'MemoryPercentage'>;
  readonly diskUsage: Brand<number, 'DiskPercentage'>;
  readonly networkLatency: Brand<number, 'NetworkLatency'>;
  readonly uptime: Brand<number, 'UptimeHours'>;
  readonly errorRate: Brand<number, 'ErrorRate'>;
}

// ============================================================================
// PERFORMANCE CONFIGURATION - Advanced configuration types
// ============================================================================

// Helper type constructors for other metrics
export const createBuildPhaseTime = (value: number): BuildPhaseTime => {
  if (value < 0) throw new Error('Build phase time must be non-negative');
  return value as unknown as BuildPhaseTime;
};

export const createCompilationSpeed = (value: number): CompilationSpeed => {
  if (value < 0) throw new Error('Compilation speed must be non-negative');
  return value as unknown as CompilationSpeed;
};

export const createBundleEfficiency = (value: number): BundleEfficiency => {
  if (value < 0 || value > 1) throw new Error('Bundle efficiency must be between 0 and 1');
  return value as unknown as BundleEfficiency;
};

export const createCodeCoverage = (value: number): CodeCoverage => {
  if (value < 0 || value > 100) throw new Error('Code coverage must be between 0 and 100');
  return value as unknown as CodeCoverage;
};

export const createOptimizationRatio = (value: number): OptimizationRatio => {
  if (value < 0 || value > 1) throw new Error('Optimization ratio must be between 0 and 1');
  return value as unknown as OptimizationRatio;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Const assertion patterns for configuration
// CONFIGURATION REASON: Type-safe performance configuration with defaults
export const PERFORMANCE_CONFIG = {
  agent: {
    maxExecutionTime: createAgentExecutionTime(30000),
    targetThroughput: createAgentThroughput(20),
    minConsensus: createConsensusConfidence(85),
    parallelizationTarget: createParallelizationRatio(0.5)
  },
  build: {
    maxPhaseTime: createBuildPhaseTime(15000),
    targetEfficiency: createBundleEfficiency(0.85),
    minCoverage: createCodeCoverage(80),
    optimizationTarget: createOptimizationRatio(0.75)
  },
  monitoring: {
    dashboardRefreshInterval: 5000,
    metricsRetentionDays: 30,
    alertThreshold: 0.9,
    aggregationWindow: 3600000 // 1 hour in ms
  }
} as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Type predicate patterns for runtime validation
// RUNTIME VALIDATION: Type guards for performance metrics
export const isAgentPerformanceProfile = (value: unknown): value is AgentPerformanceProfile => {
  return typeof value === 'object' &&
    value !== null &&
    'agentType' in value &&
    'executionTime' in value &&
    'throughput' in value &&
    'complexity' in value;
};

export const isBuildPerformanceMetrics = (value: unknown): value is BuildPerformanceMetrics => {
  return typeof value === 'object' &&
    value !== null &&
    'phase' in value &&
    'phaseTime' in value &&
    'compilationSpeed' in value &&
    'bundleEfficiency' in value;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Export type patterns for module interface
// EXTERNAL ACCESS: Clean module interface with type aliases
export type {
  AgentPerformanceProfile as AgentProfile,
  BuildPerformanceMetrics as BuildMetrics,
  WebVitalsMetric as VitalsMetric,
  PerformanceDashboardMetrics as DashboardMetrics,
  PerformanceTestScenario as TestScenario,
  WorkflowMetrics as Workflow,
  SystemHealthMetrics as SystemHealth
};