declare const __brand: unique symbol;
type Brand<K, T> = K & {
	readonly [__brand]: T;
};
export type Milliseconds = Brand<number, 'milliseconds'>;
export type Bytes = Brand<number, 'bytes'>;
export type Kilobytes = Brand<number, 'kilobytes'>;
export type Percentage = Brand<number, 'percentage'>;
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
	if (value < 0 || value > 100)
		throw new Error('Percentage must be between 0 and 100');
	return value as unknown as Percentage;
};
export type PerformanceConverter = {
	readonly msToSeconds: (ms: Milliseconds) => number;
	readonly bytesToKb: (bytes: Bytes) => Kilobytes;
	readonly calculatePercentage: (value: number, total: number) => Percentage;
};
export const performanceConverter: PerformanceConverter = {
	msToSeconds: (ms: Milliseconds): number => {
		return (ms as unknown as number) / 1000;
	},
	bytesToKb: (bytes: Bytes): Kilobytes => {
		return createKilobytes((bytes as unknown as number) / 1024);
	},
	calculatePercentage: (value: number, total: number): Percentage => {
		if (total === 0)
			throw new Error('Total cannot be zero for percentage calculation');
		return createPercentage((value / total) * 100);
	},
};
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
export type ValidatePerformanceBudget<T extends PerformanceBudget> =
	T['buildTime']['max'] extends infer MaxTime ?
		MaxTime extends Milliseconds ?
			T['bundleSize']['maxFirstLoad'] extends infer MaxBundle ?
				MaxBundle extends Kilobytes ?
					T
				:	never
			:	never
		:	never
	:	never;
export interface CMSPerformanceMetrics {
	readonly functionName: string;
	readonly executionTime: Milliseconds;
	readonly cacheHit: boolean;
	readonly dataSize: Bytes;
	readonly timestamp: number;
}
export type CMSFunctionTracker<T extends (...args: any[]) => any> = {
	readonly track: (fn: T, ...args: Parameters<T>) => ReturnType<T>;
	readonly getMetrics: () => CMSPerformanceMetrics[];
	readonly reset: () => void;
};
export interface TypeScriptPerformanceMetrics {
	readonly compilationTime: Milliseconds;
	readonly typeCheckTime: Milliseconds;
	readonly incrementalRebuildTime: Milliseconds;
	readonly fileCount: number;
	readonly errorCount: number;
	readonly warningCount: number;
	readonly memoryUsage: Bytes;
}
export type PerformanceImprovement<
	TBefore extends TypeScriptPerformanceMetrics,
	TAfter extends TypeScriptPerformanceMetrics,
> = {
	readonly compilationImprovement: Percentage;
	readonly typeCheckImprovement: Percentage;
	readonly memoryReduction: Percentage;
	readonly isValid: TAfter['compilationTime'] extends Milliseconds ?
		TBefore['compilationTime'] extends Milliseconds ?
			true
		:	false
	:	false;
};
export type PerformanceCategory =
	| 'compilation'
	| 'runtime'
	| 'bundle-size'
	| 'memory-usage'
	| 'cache-efficiency'
	| 'type-checking';
export interface PerformanceMonitorConfig {
	readonly enabled: boolean;
	readonly categories: readonly PerformanceCategory[];
	readonly budget: PerformanceBudget;
	readonly reportInterval: Milliseconds;
	readonly enableDebugMode: boolean;
}
export interface PerformanceTestResult<T extends PerformanceCategory> {
	readonly category: T;
	readonly passed: boolean;
	readonly actualValue: T extends 'compilation' ? Milliseconds
	: T extends 'bundle-size' ? Kilobytes
	: T extends 'memory-usage' ? Bytes
	: number;
	readonly budgetValue: T extends 'compilation' ? Milliseconds
	: T extends 'bundle-size' ? Kilobytes
	: T extends 'memory-usage' ? Bytes
	: number;
	readonly improvement: Percentage;
	readonly timestamp: number;
}
export type ValidatePerformanceResult<T extends PerformanceTestResult<any>> =
	T['passed'] extends true ?
		T['improvement'] extends Percentage ?
			T
		:	never
	: T['actualValue'] extends T['budgetValue'] ? never
	: T;
export type PerformanceHistory<T extends PerformanceCategory> = readonly [
	PerformanceTestResult<T>,
	...PerformanceTestResult<T>[],
];
export interface PerformanceAssertion {
	readonly assertCompilationTime: <T extends Milliseconds>(
		actual: T,
		budget: T,
	) => asserts actual is T &
		ValidatePerformanceBudget<{
			buildTime: {
				max: T;
				warning: T;
				target: T;
			};
			bundleSize: {
				maxFirstLoad: Kilobytes;
				maxChunk: Kilobytes;
				warningThreshold: Percentage;
			};
			compilation: {
				maxTypeCheckTime: Milliseconds;
				maxFileCount: number;
				targetImprovement: Percentage;
			};
		}>['buildTime']['max'];
	readonly assertBundleSize: <T extends Kilobytes>(
		actual: T,
		budget: T,
	) => asserts actual is T;
	readonly assertImprovement: <T extends Percentage>(
		improvement: T,
		target: T,
	) => asserts improvement is T;
}
export type {
	PerformanceBudget as Budget,
	PerformanceCategory as Category,
	CMSPerformanceMetrics as CMSMetrics,
	TypeScriptPerformanceMetrics as TSMetrics,
	PerformanceTestResult as TestResult,
	PerformanceHistory as History,
};
export const DEFAULT_PERFORMANCE_BUDGET = {
	buildTime: {
		max: createMilliseconds(30000),
		warning: createMilliseconds(25000),
		target: createMilliseconds(20000),
	},
	bundleSize: {
		maxFirstLoad: createKilobytes(250),
		maxChunk: createKilobytes(150),
		warningThreshold: createPercentage(80),
	},
	compilation: {
		maxTypeCheckTime: createMilliseconds(15000),
		maxFileCount: 1000,
		targetImprovement: createPercentage(20),
	},
} as const satisfies PerformanceBudget;
export const isValidPerformanceMetric = <T extends PerformanceCategory>(
	result: unknown,
	category: T,
): result is PerformanceTestResult<T> => {
	return (
		typeof result === 'object' &&
		result !== null &&
		'category' in result &&
		'passed' in result &&
		'actualValue' in result &&
		'budgetValue' in result &&
		'improvement' in result &&
		'timestamp' in result
	);
};
