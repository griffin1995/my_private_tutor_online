'use client';

import { useEffect, useState } from 'react';
export interface RuntimeViolation {
	id: string;
	timestamp: number;
	type:
		| 'ASYNC_CMS_CALL'
		| 'PROMISE_DETECTION'
		| 'LOADING_STATE'
		| 'USEEFFECT_CMS'
		| 'MISSING_DATA';
	component: string;
	message: string;
	stackTrace: string;
	severity: 'critical' | 'warning' | 'info';
	metadata: Record<string, any>;
}
export interface MonitoringState {
	violations: RuntimeViolation[];
	isMonitoring: boolean;
	totalViolations: number;
	criticalViolations: number;
	lastViolationTime: number | null;
	architectureScore: number;
}
class CMSRuntimeMonitor {
	private static instance: CMSRuntimeMonitor;
	private violations: RuntimeViolation[] = [];
	private listeners: Array<(state: MonitoringState) => void> = [];
	private isActive: boolean = false;
	public static getInstance(): CMSRuntimeMonitor {
		if (!CMSRuntimeMonitor.instance) {
			CMSRuntimeMonitor.instance = new CMSRuntimeMonitor();
		}
		return CMSRuntimeMonitor.instance;
	}
	public startMonitoring(): void {
		if (this.isActive) return;
		this.isActive = true;
		console.log(
			'🔍 CMS Runtime Monitor activated - Synchronous architecture protection enabled',
		);
		this.interceptConsoleWarnings();
		this.monitorPromiseUsage();
		this.monitorReactComponents();
		this.setupErrorTracking();
	}
	public stopMonitoring(): void {
		this.isActive = false;
		console.log('🔍 CMS Runtime Monitor deactivated');
	}
	public recordViolation(
		type: RuntimeViolation['type'],
		component: string,
		message: string,
		metadata: Record<string, any> = {},
	): void {
		const violation: RuntimeViolation = {
			id: `violation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			timestamp: Date.now(),
			type,
			component,
			message,
			stackTrace: new Error().stack || 'No stack trace available',
			severity: this.getViolationSeverity(type),
			metadata,
		};
		this.violations.push(violation);
		if (violation.severity === 'critical') {
			console.error('🚨 CRITICAL CMS ARCHITECTURE VIOLATION:', {
				component: violation.component,
				message: violation.message,
				type: violation.type,
				timestamp: new Date(violation.timestamp).toISOString(),
			});
		}
		this.notifyListeners();
	}
	private getViolationSeverity(
		type: RuntimeViolation['type'],
	): RuntimeViolation['severity'] {
		const criticalTypes = [
			'ASYNC_CMS_CALL',
			'PROMISE_DETECTION',
			'LOADING_STATE',
		];
		return criticalTypes.includes(type) ? 'critical' : 'warning';
	}
	private interceptConsoleWarnings(): void {
		const originalWarn = console.warn;
		const originalError = console.error;
		console.warn = (...args: any[]) => {
			const message = args.join(' ');
			if (message.includes('useState') && message.includes('async')) {
				this.recordViolation(
					'ASYNC_CMS_CALL',
					'Unknown Component',
					'React warning indicates async useState usage in CMS context',
					{
						originalMessage: message,
					},
				);
			}
			if (message.includes('useEffect') && message.includes('data')) {
				this.recordViolation(
					'USEEFFECT_CMS',
					'Unknown Component',
					'React warning indicates useEffect for data loading in CMS context',
					{
						originalMessage: message,
					},
				);
			}
			originalWarn.apply(console, args);
		};
		console.error = (...args: any[]) => {
			const message = args.join(' ');
			if (message.includes('.map is not a function')) {
				this.recordViolation(
					'MISSING_DATA',
					'Unknown Component',
					'Critical: .map is not a function error - indicates missing CMS data (August 2025 failure pattern)',
					{
						originalMessage: message,
					},
				);
			}
			if (
				message.includes('Cannot read property') &&
				message.includes('undefined')
			) {
				this.recordViolation(
					'MISSING_DATA',
					'Unknown Component',
					'Critical: Property access on undefined - potential async CMS data loading issue',
					{
						originalMessage: message,
					},
				);
			}
			originalError.apply(console, args);
		};
	}
	private monitorPromiseUsage(): void {
		const originalPromise = window.Promise;
		const monitor = this;
		function MonitoredPromise<T>(
			executor: (
				resolve: (value: T | PromiseLike<T>) => void,
				reject: (reason?: any) => void,
			) => void,
		) {
			const promise = new originalPromise(executor);
			const stackTrace = new Error().stack || '';
			if (stackTrace.includes('cms') || stackTrace.includes('CMS')) {
				monitor.recordViolation(
					'PROMISE_DETECTION',
					'Promise Constructor',
					'Promise detected in CMS-related code path - violates synchronous architecture',
					{
						stackTrace,
					},
				);
			}
			return promise;
		}
		Object.setPrototypeOf(MonitoredPromise, originalPromise);
		Object.getOwnPropertyNames(originalPromise).forEach((prop) => {
			if (prop !== 'prototype') {
				const descriptor = Object.getOwnPropertyDescriptor(originalPromise, prop);
				if (
					descriptor &&
					descriptor.writable !== false &&
					descriptor.set !== undefined
				) {
					try {
						(MonitoredPromise as any)[prop] = (originalPromise as any)[prop];
					} catch (error) {
						console.warn(
							`CMS Runtime Monitor: Skipped read-only property "${prop}"`,
							error,
						);
					}
				} else if (descriptor && (descriptor.get || descriptor.set)) {
					try {
						Object.defineProperty(MonitoredPromise, prop, {
							get: descriptor.get,
							set: descriptor.set,
							enumerable: descriptor.enumerable !== false,
							configurable: descriptor.configurable !== false,
						});
					} catch (error) {
						console.warn(
							`CMS Runtime Monitor: Could not define accessor property "${prop}"`,
							error,
						);
					}
				}
			}
		});
		if (process.env.NODE_ENV === 'development') {
			(window as any).Promise = MonitoredPromise;
		}
	}
	private monitorReactComponents(): void {
		if (typeof window === 'undefined') return;
		if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
			const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
			const originalOnCommitFiberRoot = hook.onCommitFiberRoot;
			hook.onCommitFiberRoot = (id: number, root: any) => {
				this.checkForLoadingStates(root);
				if (originalOnCommitFiberRoot) {
					originalOnCommitFiberRoot.call(hook, id, root);
				}
			};
		}
	}
	private checkForLoadingStates(root: any): void {
		try {
			this.traverseFiberNode(root.current, 'Root');
		} catch (error) {}
	}
	private traverseFiberNode(node: any, componentName: string): void {
		if (!node) return;
		if (node.memoizedState) {
			const state = node.memoizedState;
			if (typeof state === 'object' && state !== null) {
				const stateKeys = Object.keys(state);
				const suspiciousKeys = [
					'loading',
					'isLoading',
					'fetching',
					'pending',
					'data',
				];
				const hasSuspiciousState = stateKeys.some((key) =>
					suspiciousKeys.some((suspicious) =>
						key.toLowerCase().includes(suspicious),
					),
				);
				if (hasSuspiciousState && componentName.toLowerCase().includes('cms')) {
					this.recordViolation(
						'LOADING_STATE',
						componentName,
						'Component has loading state in CMS context - indicates async data pattern',
						{
							stateKeys,
							componentType: node.elementType?.name || 'Unknown',
						},
					);
				}
			}
		}
		let child = node.child;
		while (child) {
			const childName = child.elementType?.name || child.type?.name || 'Anonymous';
			this.traverseFiberNode(child, childName);
			child = child.sibling;
		}
	}
	private setupErrorTracking(): void {
		const originalHandler = window.onerror;
		const monitor = this;
		window.onerror = function (message, source, lineno, colno, error) {
			const errorMessage = typeof message === 'string' ? message : String(message);
			if (
				errorMessage.includes('cms') ||
				errorMessage.includes('CMS') ||
				errorMessage.includes('.map is not a function') ||
				errorMessage.includes('Cannot read property')
			) {
				monitor.recordViolation(
					'MISSING_DATA',
					source || 'Unknown Source',
					`Runtime error in CMS context: ${errorMessage}`,
					{
						source,
						line: lineno,
						column: colno,
						stack: error?.stack,
						errorType: error?.name,
					},
				);
			}
			if (originalHandler) {
				return originalHandler.call(this, message, source, lineno, colno, error);
			}
			return false;
		};
	}
	public addListener(callback: (state: MonitoringState) => void): () => void {
		this.listeners.push(callback);
		return () => {
			this.listeners = this.listeners.filter((listener) => listener !== callback);
		};
	}
	private notifyListeners(): void {
		const state: MonitoringState = {
			violations: [...this.violations],
			isMonitoring: this.isActive,
			totalViolations: this.violations.length,
			criticalViolations: this.violations.filter((v) => v.severity === 'critical')
				.length,
			lastViolationTime:
				this.violations.length > 0 ?
					Math.max(...this.violations.map((v) => v.timestamp))
				:	null,
			architectureScore: this.calculateArchitectureScore(),
		};
		this.listeners.forEach((listener) => {
			try {
				listener(state);
			} catch (error) {
				console.error('Error in monitoring state listener:', error);
			}
		});
	}
	private calculateArchitectureScore(): number {
		const totalViolations = this.violations.length;
		const criticalViolations = this.violations.filter(
			(v) => v.severity === 'critical',
		).length;
		if (totalViolations === 0) return 10.0;
		const criticalPenalty = criticalViolations * 2.0;
		const warningPenalty = (totalViolations - criticalViolations) * 0.5;
		const totalPenalty = criticalPenalty + warningPenalty;
		const score = Math.max(0, 10.0 - totalPenalty);
		return Math.round(score * 10) / 10;
	}
	public getCurrentState(): MonitoringState {
		return {
			violations: [...this.violations],
			isMonitoring: this.isActive,
			totalViolations: this.violations.length,
			criticalViolations: this.violations.filter((v) => v.severity === 'critical')
				.length,
			lastViolationTime:
				this.violations.length > 0 ?
					Math.max(...this.violations.map((v) => v.timestamp))
				:	null,
			architectureScore: this.calculateArchitectureScore(),
		};
	}
	public clearViolations(): void {
		this.violations = [];
		this.notifyListeners();
		console.log('🔍 CMS Runtime Monitor violations cleared');
	}
	public exportViolations(): string {
		return JSON.stringify(
			{
				timestamp: new Date().toISOString(),
				monitoringSession: {
					totalViolations: this.violations.length,
					criticalViolations: this.violations.filter(
						(v) => v.severity === 'critical',
					).length,
					architectureScore: this.calculateArchitectureScore(),
					isActive: this.isActive,
				},
				violations: this.violations,
			},
			null,
			2,
		);
	}
}
export function useCMSRuntimeMonitor(): MonitoringState & {
	startMonitoring: () => void;
	stopMonitoring: () => void;
	recordViolation: (
		type: RuntimeViolation['type'],
		component: string,
		message: string,
		metadata?: Record<string, any>,
	) => void;
	clearViolations: () => void;
	exportViolations: () => string;
} {
	const [monitoringState, setMonitoringState] = useState<MonitoringState>({
		violations: [],
		isMonitoring: false,
		totalViolations: 0,
		criticalViolations: 0,
		lastViolationTime: null,
		architectureScore: 10.0,
	});
	useEffect(() => {
		const monitor = CMSRuntimeMonitor.getInstance();
		const unsubscribe = monitor.addListener(setMonitoringState);
		setMonitoringState(monitor.getCurrentState());
		return unsubscribe;
	}, []);
	const monitor = CMSRuntimeMonitor.getInstance();
	return {
		...monitoringState,
		startMonitoring: () => monitor.startMonitoring(),
		stopMonitoring: () => monitor.stopMonitoring(),
		recordViolation: (type, component, message, metadata) =>
			monitor.recordViolation(type, component, message, metadata),
		clearViolations: () => monitor.clearViolations(),
		exportViolations: () => monitor.exportViolations(),
	};
}
export const runtimeMonitor = CMSRuntimeMonitor.getInstance();
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	runtimeMonitor.startMonitoring();
	console.log('🔍 CMS Runtime Monitor auto-activated for development');
}
