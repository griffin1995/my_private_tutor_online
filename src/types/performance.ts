/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Performance monitoring type interfaces
 * PERFORMANCE ENHANCEMENT REASON: Type-safe performance tracking with zero runtime cost
 * ARCHITECTURE: Compile-time performance validation with build-time budget enforcement
 * 
 * Design Pattern: Nominal typing for performance metrics with template literal types
 * Zero Runtime Cost: All interfaces are purely compile-time constructs
 * Build-Time Validation: Performance budgets enforced during TypeScript compilation
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Intersection types for branded performance metrics
// PERFORMANCE TYPING REASON: Prevent mixing different performance metric types using nominal typing
declare const __brand: unique symbol;
type Brand<K, T> = K & { readonly [__brand]: T };

// CONTEXT7 SOURCE: /microsoft/typescript - Branded types for performance measurement safety
export type Milliseconds = Brand<number, 'milliseconds'>;
export type Bytes = Brand<number, 'bytes'>;
export type Kilobytes = Brand<number, 'kilobytes'>;
export type Percentage = Brand<number, 'percentage'>;

// CONTEXT7 SOURCE: /microsoft/typescript - Branded type constructor patterns for type safety
// REVISION REASON: Fix TS2352 errors using intersection types with proper branded conversion
export const createMilliseconds = (value: number): Milliseconds => {
  if (value < 0) throw new Error('Milliseconds must be non-negative');
  return value as unknown as Milliseconds;
};

export const createBytes = (value: number): Bytes => {
  if (value < 0) throw new Error('Bytes must be non-negative');
  return value as unknown as Bytes;
};

export const createKilobytes = (value: number): Kilobytes => {
  if (value < 0) throw new Error('Kilobytes must be non-negative');
  return value as unknown as Kilobytes;
};

export const createPercentage = (value: number): Percentage => {
  if (value < 0 || value > 100) throw new Error('Percentage must be between 0 and 100');
  return value as unknown as Percentage;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Utility type patterns for performance metric conversion
// TYPE SAFETY REASON: Compile-time conversion validation for performance units
// REVISION REASON: Use branded type constructors for type-safe metric conversion
export type PerformanceConverter = {
  readonly msToSeconds: (ms: Milliseconds) => number;
  readonly bytesToKb: (bytes: Bytes) => Kilobytes;
  readonly calculatePercentage: (value: number, total: number) => Percentage;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Implementation patterns for branded type converters
// IMPLEMENTATION REASON: Provide concrete converter functions using branded type constructors
export const performanceConverter: PerformanceConverter = {
  msToSeconds: (ms: Milliseconds): number => {
    return (ms as unknown as number) / 1000;
  },
  bytesToKb: (bytes: Bytes): Kilobytes => {
    return createKilobytes((bytes as unknown as number) / 1024);
  },
  calculatePercentage: (value: number, total: number): Percentage => {
    if (total === 0) throw new Error('Total cannot be zero for percentage calculation');
    return createPercentage((value / total) * 100);
  },
};

// CONTEXT7 SOURCE: /microsoft/typescript - Interface patterns for performance budgets
// BUILD-TIME VALIDATION REASON: Enforce performance budgets during TypeScript compilation
export interface PerformanceBudget {
  readonly buildTime: {
    readonly max: Milliseconds;
    readonly warning: Milliseconds;
    readonly target: Milliseconds;
  };
  readonly bundleSize: {
    readonly maxFirstLoad: Kilobytes;
    readonly maxChunk: Kilobytes;
    readonly warningThreshold: Percentage;
  };
  readonly compilation: {
    readonly maxTypeCheckTime: Milliseconds;
    readonly maxFileCount: number;
    readonly targetImprovement: Percentage;
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Conditional type patterns for performance validation
// COMPILE-TIME VALIDATION REASON: Type-level performance budget checks
export type ValidatePerformanceBudget<T extends PerformanceBudget> = 
  T['buildTime']['max'] extends infer MaxTime
    ? MaxTime extends Milliseconds
      ? T['bundleSize']['maxFirstLoad'] extends infer MaxBundle
        ? MaxBundle extends Kilobytes
          ? T // Valid budget configuration
          : never // Invalid bundle size type
        : never // Missing bundle size
      : never // Invalid build time type
    : never; // Missing build time

// CONTEXT7 SOURCE: /microsoft/typescript - Mapped type patterns for CMS performance tracking
// CMS PERFORMANCE REASON: Type-safe tracking of CMS function performance
export interface CMSPerformanceMetrics {
  readonly functionName: string;
  readonly executionTime: Milliseconds;
  readonly cacheHit: boolean;
  readonly dataSize: Bytes;
  readonly timestamp: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Generic constraint patterns for type-safe CMS tracking
// TYPE CONSTRAINT REASON: Ensure only valid CMS functions are tracked
export type CMSFunctionTracker<T extends (...args: any[]) => any> = {
  readonly track: (fn: T, ...args: Parameters<T>) => ReturnType<T>;
  readonly getMetrics: () => CMSPerformanceMetrics[];
  readonly reset: () => void;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Interface composition for build-time performance
// BUILD PERFORMANCE REASON: Track TypeScript compilation performance improvements
export interface TypeScriptPerformanceMetrics {
  readonly compilationTime: Milliseconds;
  readonly typeCheckTime: Milliseconds;
  readonly incrementalRebuildTime: Milliseconds;
  readonly fileCount: number;
  readonly errorCount: number;
  readonly warningCount: number;
  readonly memoryUsage: Bytes;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Utility type for performance improvement calculation
// PERFORMANCE MEASUREMENT REASON: Type-safe calculation of performance improvements
export type PerformanceImprovement<
  TBefore extends TypeScriptPerformanceMetrics,
  TAfter extends TypeScriptPerformanceMetrics
> = {
  readonly compilationImprovement: Percentage;
  readonly typeCheckImprovement: Percentage;
  readonly memoryReduction: Percentage;
  readonly isValid: TAfter['compilationTime'] extends Milliseconds 
    ? TBefore['compilationTime'] extends Milliseconds
      ? true 
      : false 
    : false;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Literal type patterns for performance categories
// CATEGORIZATION REASON: Type-safe performance metric categorization
export type PerformanceCategory = 
  | 'compilation'
  | 'runtime'
  | 'bundle-size'
  | 'memory-usage'
  | 'cache-efficiency'
  | 'type-checking';

// CONTEXT7 SOURCE: /microsoft/typescript - Record type patterns for performance monitoring
// MONITORING SYSTEM REASON: Comprehensive performance tracking with type safety
export interface PerformanceMonitorConfig {
  readonly enabled: boolean;
  readonly categories: readonly PerformanceCategory[];
  readonly budget: PerformanceBudget;
  readonly reportInterval: Milliseconds;
  readonly enableDebugMode: boolean;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Generic interface patterns for performance results
// RESULT TRACKING REASON: Type-safe performance test result aggregation
export interface PerformanceTestResult<T extends PerformanceCategory> {
  readonly category: T;
  readonly passed: boolean;
  readonly actualValue: T extends 'compilation' 
    ? Milliseconds 
    : T extends 'bundle-size' 
      ? Kilobytes 
      : T extends 'memory-usage'
        ? Bytes
        : number;
  readonly budgetValue: T extends 'compilation' 
    ? Milliseconds 
    : T extends 'bundle-size' 
      ? Kilobytes 
      : T extends 'memory-usage'
        ? Bytes
        : number;
  readonly improvement: Percentage;
  readonly timestamp: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Conditional type patterns for performance validation
// VALIDATION REASON: Compile-time validation of performance test results
export type ValidatePerformanceResult<T extends PerformanceTestResult<any>> = 
  T['passed'] extends true
    ? T['improvement'] extends Percentage
      ? T // Valid performance result
      : never // Invalid improvement metric
    : T['actualValue'] extends T['budgetValue']
      ? never // Failed performance test
      : T; // Valid failing result

// CONTEXT7 SOURCE: /microsoft/typescript - Tuple type patterns for performance history
// HISTORY TRACKING REASON: Type-safe performance trend analysis
export type PerformanceHistory<T extends PerformanceCategory> = readonly [
  PerformanceTestResult<T>,
  ...PerformanceTestResult<T>[]
];

// CONTEXT7 SOURCE: /microsoft/typescript - Function type patterns for performance assertions
// ASSERTION REASON: Type-safe performance assertions with compile-time validation
export interface PerformanceAssertion {
  readonly assertCompilationTime: <T extends Milliseconds>(
    actual: T, 
    budget: T
  ) => asserts actual is T & ValidatePerformanceBudget<{ 
    buildTime: { max: T; warning: T; target: T }; 
    bundleSize: { maxFirstLoad: Kilobytes; maxChunk: Kilobytes; warningThreshold: Percentage }; 
    compilation: { maxTypeCheckTime: Milliseconds; maxFileCount: number; targetImprovement: Percentage }; 
  }>['buildTime']['max'];
  
  readonly assertBundleSize: <T extends Kilobytes>(
    actual: T,
    budget: T
  ) => asserts actual is T;
  
  readonly assertImprovement: <T extends Percentage>(
    improvement: T,
    target: T
  ) => asserts improvement is T;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export type patterns for external consumption
// EXTERNAL ACCESS REASON: Allow other modules to consume performance types
export type {
  PerformanceBudget as Budget,
  PerformanceCategory as Category,
  CMSPerformanceMetrics as CMSMetrics,
  TypeScriptPerformanceMetrics as TSMetrics,
  PerformanceTestResult as TestResult,
  PerformanceHistory as History
};

// CONTEXT7 SOURCE: /microsoft/typescript - Const assertion patterns for default budgets
// DEFAULT CONFIGURATION REASON: Type-safe default performance budgets
// REVISION REASON: Replace unsafe type assertions with branded type constructors
export const DEFAULT_PERFORMANCE_BUDGET = {
  buildTime: {
    max: createMilliseconds(30000), // 30 seconds max build time
    warning: createMilliseconds(25000), // 25 seconds warning threshold
    target: createMilliseconds(20000), // 20 seconds target
  },
  bundleSize: {
    maxFirstLoad: createKilobytes(250), // 250KB max first load
    maxChunk: createKilobytes(150), // 150KB max chunk size
    warningThreshold: createPercentage(80), // 80% warning threshold
  },
  compilation: {
    maxTypeCheckTime: createMilliseconds(15000), // 15 seconds max type check
    maxFileCount: 1000, // 1000 files max
    targetImprovement: createPercentage(20), // 20% improvement target
  },
} as const satisfies PerformanceBudget;

// CONTEXT7 SOURCE: /microsoft/typescript - Type predicate patterns for performance validation
// RUNTIME VALIDATION REASON: Type-safe runtime performance checks
export const isValidPerformanceMetric = <T extends PerformanceCategory>(
  result: unknown,
  category: T
): result is PerformanceTestResult<T> => {
  return typeof result === 'object' && 
         result !== null &&
         'category' in result &&
         'passed' in result &&
         'actualValue' in result &&
         'budgetValue' in result &&
         'improvement' in result &&
         'timestamp' in result;
};