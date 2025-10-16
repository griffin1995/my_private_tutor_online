import React, { useEffect, useRef, useCallback } from 'react';
const PERFORMANCE_THRESHOLDS = {
	MAX_RENDERS_PER_SECOND: 50,
	MAX_MEMORY_USAGE_PERCENT: 75,
	MAX_RENDER_TIME_MS: 100,
	MAX_COMPONENT_INSTANCES: 1000,
	CRITICAL_FPS: 10,
	WARNING_FPS: 30,
} as const;
export const useRenderGuard = (componentName: string) => {
	const renderCount = useRef(0);
	const lastResetTime = useRef(Date.now());
	const renderTimestamps = useRef<number[]>([]);
	useEffect(() => {
		const now = Date.now();
		renderCount.current++;
		renderTimestamps.current.push(now);
		if (renderTimestamps.current.length > 100) {
			renderTimestamps.current.shift();
		}
		const oneSecondAgo = now - 1000;
		const recentRenders = renderTimestamps.current.filter(
			(t) => t > oneSecondAgo,
		);
		const rendersPerSecond = recentRenders.length;
		if (rendersPerSecond > PERFORMANCE_THRESHOLDS.MAX_RENDERS_PER_SECOND) {
			const errorMessage =
				`🔴 CRITICAL: Infinite re-render loop detected in ${componentName}! ` +
				`${rendersPerSecond} renders/second exceeds safety threshold of ${PERFORMANCE_THRESHOLDS.MAX_RENDERS_PER_SECOND}`;
			console.error(errorMessage, {
				componentName,
				rendersPerSecond,
				totalRenders: renderCount.current,
				timestamps: renderTimestamps.current.slice(-10),
			});
			throw new Error(errorMessage);
		}
		if (rendersPerSecond > PERFORMANCE_THRESHOLDS.MAX_RENDERS_PER_SECOND / 2) {
			console.warn(
				`⚠️ Performance Warning: ${componentName} rendering ${rendersPerSecond} times/second`,
			);
		}
		if (now - lastResetTime.current > 10000) {
			renderCount.current = 0;
			lastResetTime.current = now;
			renderTimestamps.current = [];
		}
	});
};
export const useMemoryGuard = (onMemoryWarning?: () => void) => {
	const lastWarningTime = useRef(0);
	useEffect(() => {
		if (!performance.memory) {
			console.info('Memory monitoring not available in this browser');
			return;
		}
		const checkMemory = () => {
			const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
			const usagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100;
			if (usagePercent > PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_PERCENT) {
				const now = Date.now();
				if (now - lastWarningTime.current > 5000) {
					lastWarningTime.current = now;
					console.error('🔴 CRITICAL: Memory usage exceeded safety threshold!', {
						usagePercent: usagePercent.toFixed(1),
						usedMB: (usedJSHeapSize / 1024 / 1024).toFixed(1),
						limitMB: (jsHeapSizeLimit / 1024 / 1024).toFixed(1),
					});
					onMemoryWarning?.();
					if ((global as any).gc) {
						console.info('Triggering garbage collection...');
						(global as any).gc();
					}
				}
			}
			if (
				usagePercent > 60 &&
				usagePercent <= PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_PERCENT
			) {
				console.warn(`⚠️ Memory Warning: ${usagePercent.toFixed(1)}% heap used`);
			}
		};
		const interval = setInterval(checkMemory, 3000);
		checkMemory();
		return () => clearInterval(interval);
	}, [onMemoryWarning]);
};
export const useFPSMonitor = (componentName: string) => {
	const frameCount = useRef(0);
	const lastTime = useRef(performance.now());
	const fpsHistory = useRef<number[]>([]);
	useEffect(() => {
		let animationId: number;
		const measureFPS = () => {
			frameCount.current++;
			const currentTime = performance.now();
			const deltaTime = currentTime - lastTime.current;
			if (deltaTime >= 1000) {
				const fps = Math.round((frameCount.current * 1000) / deltaTime);
				fpsHistory.current.push(fps);
				if (fpsHistory.current.length > 10) {
					fpsHistory.current.shift();
				}
				if (fps < PERFORMANCE_THRESHOLDS.CRITICAL_FPS) {
					console.error(
						`🔴 CRITICAL: Frame rate critically low in ${componentName}!`,
						{
							fps,
							history: fpsHistory.current,
						},
					);
				} else if (fps < PERFORMANCE_THRESHOLDS.WARNING_FPS) {
					console.warn(
						`⚠️ Performance: Low frame rate in ${componentName}: ${fps} FPS`,
					);
				}
				frameCount.current = 0;
				lastTime.current = currentTime;
			}
			animationId = requestAnimationFrame(measureFPS);
		};
		animationId = requestAnimationFrame(measureFPS);
		return () => cancelAnimationFrame(animationId);
	}, [componentName]);
};
export const useDependencyGuard = (
	hookName: string,
	dependencies: React.DependencyList,
	componentName: string,
) => {
	const previousDeps = useRef<React.DependencyList>();
	const changeCount = useRef(0);
	const lastChangeTime = useRef(Date.now());
	useEffect(() => {
		if (previousDeps.current) {
			const hasChanged = dependencies.some(
				(dep, i) => dep !== previousDeps.current![i],
			);
			if (hasChanged) {
				changeCount.current++;
				const now = Date.now();
				const timeSinceLastChange = now - lastChangeTime.current;
				lastChangeTime.current = now;
				if (timeSinceLastChange < 100 && changeCount.current > 5) {
					console.error(
						`🔴 CRITICAL: Potential circular dependency detected in ${componentName}.${hookName}!`,
						{
							changeCount: changeCount.current,
							timeSinceLastChange,
							currentDeps: dependencies,
							previousDeps: previousDeps.current,
						},
					);
				}
				setTimeout(() => {
					changeCount.current = 0;
				}, 1000);
			}
		}
		previousDeps.current = [...dependencies];
	}, dependencies);
};
export function withPerformanceGuard<P extends object>(
	Component: React.ComponentType<P>,
	componentName: string,
) {
	return React.forwardRef<any, P>((props, ref) => {
		useRenderGuard(componentName);
		useMemoryGuard();
		useFPSMonitor(componentName);
		return React.createElement(Component, {
			...props,
			ref,
		});
	});
}
export const emergencyCleanup = () => {
	console.warn('🚨 Initiating emergency cleanup...');
	const highestTimeoutId = setTimeout(() => {}, 0);
	for (let i = 0; i < highestTimeoutId; i++) {
		clearTimeout(i);
	}
	const highestAnimationId = requestAnimationFrame(() => {});
	for (let i = 0; i < highestAnimationId; i++) {
		cancelAnimationFrame(i);
	}
	if (console.clear) {
		console.clear();
	}
	window.dispatchEvent(new CustomEvent('emergency-cleanup'));
	console.info('✅ Emergency cleanup completed');
};
export class PerformanceMetricsCollector {
	private metrics: Map<string, any[]> = new Map();
	private startTime: number = performance.now();
	record(category: string, value: any) {
		if (!this.metrics.has(category)) {
			this.metrics.set(category, []);
		}
		this.metrics.get(category)!.push({
			value,
			timestamp: performance.now() - this.startTime,
		});
	}
	getReport() {
		const report: Record<string, any> = {};
		this.metrics.forEach((values, category) => {
			if (values.length === 0) return;
			const numbers = values
				.map((v) => (typeof v.value === 'number' ? v.value : 0))
				.filter((v) => v > 0);
			if (numbers.length > 0) {
				report[category] = {
					count: values.length,
					average: numbers.reduce((a, b) => a + b, 0) / numbers.length,
					min: Math.min(...numbers),
					max: Math.max(...numbers),
					last: values[values.length - 1].value,
				};
			}
		});
		return report;
	}
	reset() {
		this.metrics.clear();
		this.startTime = performance.now();
	}
}
export const globalMetrics = new PerformanceMetricsCollector();
export type PerformanceThresholds = typeof PERFORMANCE_THRESHOLDS;
