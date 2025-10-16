import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
export const COMPONENT_PRIORITIES = {
	CRITICAL: 0,
	HIGH: 1,
	MEDIUM: 2,
	LOW: 3,
	DEFERRED: 4,
} as const;
export class CodeSplittingManager {
	public static createDynamicComponent<T = {}>(
		importFn: () => Promise<{
			default: ComponentType<T>;
		}>,
		options: {
			priority?: keyof typeof COMPONENT_PRIORITIES;
			ssr?: boolean;
			preload?: boolean;
		} = {},
	) {
		const { priority = 'MEDIUM', ssr = true, preload = false } = options;
		const DynamicComponent = dynamic(importFn, {
			ssr,
		});
		if (preload && typeof window !== 'undefined') {
			if (COMPONENT_PRIORITIES[priority] <= COMPONENT_PRIORITIES.HIGH) {
				importFn().catch((error) => {
					console.warn('⚠️ Component preload failed:', error);
				});
			}
		}
		return DynamicComponent;
	}
	public static trackComponentLoad(
		componentName: string,
		loadTime: number,
		cacheHit: boolean,
	): void {
		try {
			const metrics = {
				component: componentName,
				loadTime,
				cacheHit,
				timestamp: new Date().toISOString(),
				userAgent:
					typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
			};
			console.log('⚡ Component Load Metrics:', metrics);
			if (typeof window !== 'undefined') {
				fetch('/api/analytics/component-performance', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(metrics),
				}).catch(() => {});
			}
		} catch (error) {
			console.warn('⚠️ Component performance tracking failed:', error);
		}
	}
}
export default CodeSplittingManager;
