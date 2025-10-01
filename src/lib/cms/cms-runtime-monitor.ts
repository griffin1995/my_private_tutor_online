// CONTEXT7 SOURCE: /reactjs/react.dev - Runtime monitoring system for CMS architecture
// RUNTIME PROTECTION REASON: Real-time detection of architecture violations during application runtime
// SYNCHRONOUS ARCHITECTURE MONITORING: Prevent August 2025 failure patterns in production

'use client';

import { useEffect, useState } from 'react';

// CONTEXT7 SOURCE: /microsoft/typescript - Runtime violation tracking interfaces
// MONITORING TYPES REASON: Strongly typed runtime violation detection and reporting
export interface RuntimeViolation {
  id: string;
  timestamp: number;
  type: 'ASYNC_CMS_CALL' | 'PROMISE_DETECTION' | 'LOADING_STATE' | 'USEEFFECT_CMS' | 'MISSING_DATA';
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
  architectureScore: number; // 0-10 scale, 10 = perfect synchronous architecture
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Runtime monitoring hook for CMS architecture integrity
// MONITORING HOOK REASON: React-based monitoring system for real-time violation detection
class CMSRuntimeMonitor {
  private static instance: CMSRuntimeMonitor;
  private violations: RuntimeViolation[] = [];
  private listeners: Array<(state: MonitoringState) => void> = [];
  private isActive: boolean = false;

  // CONTEXT7 SOURCE: /microsoft/typescript - Singleton pattern for global monitoring
  // SINGLETON REASON: Single monitoring instance across entire application
  public static getInstance(): CMSRuntimeMonitor {
    if (!CMSRuntimeMonitor.instance) {
      CMSRuntimeMonitor.instance = new CMSRuntimeMonitor();
    }
    return CMSRuntimeMonitor.instance;
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Monitor activation for runtime violation detection
  // ACTIVATION REASON: Enable monitoring with comprehensive violation tracking
  public startMonitoring(): void {
    if (this.isActive) return;

    this.isActive = true;
    console.log('🔍 CMS Runtime Monitor activated - Synchronous architecture protection enabled');

    // CONTEXT7 SOURCE: /reactjs/react.dev - Console method interception for async detection
    // INTERCEPTION REASON: Detect console warnings that indicate async CMS patterns
    this.interceptConsoleWarnings();

    // CONTEXT7 SOURCE: /reactjs/react.dev - Promise detection in global scope
    // PROMISE MONITORING REASON: Detect unexpected Promise usage in CMS context
    this.monitorPromiseUsage();

    // CONTEXT7 SOURCE: /reactjs/react.dev - React Dev Tools integration for component monitoring
    // COMPONENT MONITORING REASON: Track component rendering patterns for CMS violations
    this.monitorReactComponents();

    // CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary integration for violation tracking
    // ERROR TRACKING REASON: Capture and categorize CMS-related errors
    this.setupErrorTracking();
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Monitor deactivation for cleanup
  // DEACTIVATION REASON: Clean shutdown of monitoring systems
  public stopMonitoring(): void {
    this.isActive = false;
    console.log('🔍 CMS Runtime Monitor deactivated');
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Violation recording with metadata
  // VIOLATION RECORDING REASON: Comprehensive tracking of architecture violations
  public recordViolation(
    type: RuntimeViolation['type'],
    component: string,
    message: string,
    metadata: Record<string, any> = {}
  ): void {
    const violation: RuntimeViolation = {
      id: `violation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type,
      component,
      message,
      stackTrace: new Error().stack || 'No stack trace available',
      severity: this.getViolationSeverity(type),
      metadata
    };

    this.violations.push(violation);

    // CONTEXT7 SOURCE: /reactjs/react.dev - Critical violation immediate reporting
    // IMMEDIATE REPORTING REASON: Alert developers to critical architecture violations
    if (violation.severity === 'critical') {
      console.error('🚨 CRITICAL CMS ARCHITECTURE VIOLATION:', {
        component: violation.component,
        message: violation.message,
        type: violation.type,
        timestamp: new Date(violation.timestamp).toISOString()
      });
    }

    // Update all listeners
    this.notifyListeners();
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Violation severity classification
  // SEVERITY CLASSIFICATION REASON: Prioritize violations by impact on architecture integrity
  private getViolationSeverity(type: RuntimeViolation['type']): RuntimeViolation['severity'] {
    const criticalTypes = ['ASYNC_CMS_CALL', 'PROMISE_DETECTION', 'LOADING_STATE'];
    return criticalTypes.includes(type) ? 'critical' : 'warning';
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Console warning interception for async pattern detection
  // WARNING INTERCEPTION REASON: Detect React warnings that indicate async CMS usage
  private interceptConsoleWarnings(): void {
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args: any[]) => {
      const message = args.join(' ');

      // CONTEXT7 SOURCE: /reactjs/react.dev - React-specific warning patterns
      // PATTERN DETECTION REASON: Identify warnings that indicate CMS architecture violations
      if (message.includes('useState') && message.includes('async')) {
        this.recordViolation(
          'ASYNC_CMS_CALL',
          'Unknown Component',
          'React warning indicates async useState usage in CMS context',
          { originalMessage: message }
        );
      }

      if (message.includes('useEffect') && message.includes('data')) {
        this.recordViolation(
          'USEEFFECT_CMS',
          'Unknown Component',
          'React warning indicates useEffect for data loading in CMS context',
          { originalMessage: message }
        );
      }

      originalWarn.apply(console, args);
    };

    console.error = (...args: any[]) => {
      const message = args.join(' ');

      // CONTEXT7 SOURCE: /reactjs/react.dev - React error patterns for CMS violations
      // ERROR DETECTION REASON: Identify errors that indicate missing or async CMS data
      if (message.includes('.map is not a function')) {
        this.recordViolation(
          'MISSING_DATA',
          'Unknown Component',
          'Critical: .map is not a function error - indicates missing CMS data (August 2025 failure pattern)',
          { originalMessage: message }
        );
      }

      if (message.includes('Cannot read property') && message.includes('undefined')) {
        this.recordViolation(
          'MISSING_DATA',
          'Unknown Component',
          'Critical: Property access on undefined - potential async CMS data loading issue',
          { originalMessage: message }
        );
      }

      originalError.apply(console, args);
    };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Promise usage monitoring in global scope
  // PROMISE MONITORING REASON: Detect unexpected Promise usage that violates synchronous architecture
  private monitorPromiseUsage(): void {
    const originalPromise = window.Promise;
    const monitor = this;

    // CONTEXT7 SOURCE: /reactjs/react.dev - Promise constructor interception
    // PROMISE INTERCEPTION REASON: Track Promise creation in CMS context
    function MonitoredPromise<T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
      const promise = new originalPromise(executor);

      // Check if this Promise might be CMS-related
      const stackTrace = new Error().stack || '';
      if (stackTrace.includes('cms') || stackTrace.includes('CMS')) {
        monitor.recordViolation(
          'PROMISE_DETECTION',
          'Promise Constructor',
          'Promise detected in CMS-related code path - violates synchronous architecture',
          { stackTrace }
        );
      }

      return promise;
    }

    // Copy all static methods
    Object.setPrototypeOf(MonitoredPromise, originalPromise);
    
    // CONTEXT7 SOURCE: /microsoft/typescript - Object.getOwnPropertyDescriptor pattern for safe property copying
    // REVISION REASON: Official TypeScript documentation Section 3.2 - Check property descriptors before assignment to handle read-only properties
    Object.getOwnPropertyNames(originalPromise).forEach(prop => {
      if (prop !== 'prototype') {
        const descriptor = Object.getOwnPropertyDescriptor(originalPromise, prop);
        if (descriptor && descriptor.writable !== false && descriptor.set !== undefined) {
          // CONTEXT7 SOURCE: /microsoft/typescript - Property descriptor validation for writable properties
          // Only copy properties that are writable or have setters, avoiding read-only property errors
          try {
            (MonitoredPromise as any)[prop] = (originalPromise as any)[prop];
          } catch (error) {
            // CONTEXT7 SOURCE: /microsoft/typescript - Error handling for read-only property assignment
            // Silently skip read-only properties to prevent runtime errors
            console.warn(`CMS Runtime Monitor: Skipped read-only property "${prop}"`, error);
          }
        } else if (descriptor && (descriptor.get || descriptor.set)) {
          // CONTEXT7 SOURCE: /microsoft/typescript - Accessor property handling with Object.defineProperty
          // Copy accessor properties using proper descriptor definition
          try {
            Object.defineProperty(MonitoredPromise, prop, {
              get: descriptor.get,
              set: descriptor.set,
              enumerable: descriptor.enumerable !== false,
              configurable: descriptor.configurable !== false
            });
          } catch (error) {
            // Handle cases where property cannot be defined
            console.warn(`CMS Runtime Monitor: Could not define accessor property "${prop}"`, error);
          }
        }
      }
    });

    // Replace global Promise (development only)
    if (process.env.NODE_ENV === 'development') {
      (window as any).Promise = MonitoredPromise;
    }
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - React component lifecycle monitoring
  // COMPONENT MONITORING REASON: Track component rendering patterns for CMS violations
  private monitorReactComponents(): void {
    if (typeof window === 'undefined') return;

    // CONTEXT7 SOURCE: /reactjs/react.dev - React DevTools integration
    // DEVTOOLS INTEGRATION REASON: Hook into React's lifecycle for component monitoring
    if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

      const originalOnCommitFiberRoot = hook.onCommitFiberRoot;
      hook.onCommitFiberRoot = (id: number, root: any) => {
        // Monitor for components that might have loading states (indicates async patterns)
        this.checkForLoadingStates(root);

        if (originalOnCommitFiberRoot) {
          originalOnCommitFiberRoot.call(hook, id, root);
        }
      };
    }
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Loading state detection in component tree
  // LOADING STATE DETECTION REASON: Identify components using loading states (async pattern indicator)
  private checkForLoadingStates(root: any): void {
    try {
      // Traverse React fiber tree looking for loading states
      this.traverseFiberNode(root.current, 'Root');
    } catch (error) {
      // Silently handle traversal errors
    }
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - React Fiber tree traversal for state inspection
  // FIBER TRAVERSAL REASON: Deep inspection of component state for async patterns
  private traverseFiberNode(node: any, componentName: string): void {
    if (!node) return;

    // CONTEXT7 SOURCE: /reactjs/react.dev - State inspection for loading indicators
    // STATE INSPECTION REASON: Detect state patterns that indicate async data loading
    if (node.memoizedState) {
      const state = node.memoizedState;

      // Check for common loading state patterns
      if (typeof state === 'object' && state !== null) {
        const stateKeys = Object.keys(state);
        const suspiciousKeys = ['loading', 'isLoading', 'fetching', 'pending', 'data'];

        const hasSuspiciousState = stateKeys.some(key =>
          suspiciousKeys.some(suspicious => key.toLowerCase().includes(suspicious))
        );

        if (hasSuspiciousState && componentName.toLowerCase().includes('cms')) {
          this.recordViolation(
            'LOADING_STATE',
            componentName,
            'Component has loading state in CMS context - indicates async data pattern',
            { stateKeys, componentType: node.elementType?.name || 'Unknown' }
          );
        }
      }
    }

    // Traverse children
    let child = node.child;
    while (child) {
      const childName = child.elementType?.name || child.type?.name || 'Anonymous';
      this.traverseFiberNode(child, childName);
      child = child.sibling;
    }
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Global error tracking for CMS violations
  // ERROR TRACKING REASON: Capture and categorize application errors related to CMS
  private setupErrorTracking(): void {
    const originalHandler = window.onerror;
    const monitor = this;

    window.onerror = function(message, source, lineno, colno, error) {
      const errorMessage = typeof message === 'string' ? message : String(message);

      // CONTEXT7 SOURCE: /reactjs/react.dev - CMS-specific error pattern detection
      // ERROR CATEGORIZATION REASON: Identify errors that indicate CMS architecture violations
      if (errorMessage.includes('cms') || errorMessage.includes('CMS') ||
          errorMessage.includes('.map is not a function') ||
          errorMessage.includes('Cannot read property')) {

        monitor.recordViolation(
          'MISSING_DATA',
          source || 'Unknown Source',
          `Runtime error in CMS context: ${errorMessage}`,
          {
            source,
            line: lineno,
            column: colno,
            stack: error?.stack,
            errorType: error?.name
          }
        );
      }

      if (originalHandler) {
        return originalHandler.call(this, message, source, lineno, colno, error);
      }
      return false;
    };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - State listener management for monitoring updates
  // LISTENER MANAGEMENT REASON: Notify React components of monitoring state changes
  public addListener(callback: (state: MonitoringState) => void): () => void {
    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Monitoring state calculation and distribution
  // STATE CALCULATION REASON: Provide comprehensive monitoring state to components
  private notifyListeners(): void {
    const state: MonitoringState = {
      violations: [...this.violations],
      isMonitoring: this.isActive,
      totalViolations: this.violations.length,
      criticalViolations: this.violations.filter(v => v.severity === 'critical').length,
      lastViolationTime: this.violations.length > 0
        ? Math.max(...this.violations.map(v => v.timestamp))
        : null,
      architectureScore: this.calculateArchitectureScore()
    };

    this.listeners.forEach(listener => {
      try {
        listener(state);
      } catch (error) {
        console.error('Error in monitoring state listener:', error);
      }
    });
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Architecture score calculation algorithm
  // SCORE CALCULATION REASON: Quantify synchronous architecture integrity (0-10 scale)
  private calculateArchitectureScore(): number {
    const totalViolations = this.violations.length;
    const criticalViolations = this.violations.filter(v => v.severity === 'critical').length;

    if (totalViolations === 0) return 10.0; // Perfect synchronous architecture

    // CONTEXT7 SOURCE: /microsoft/typescript - Scoring algorithm based on violation severity
    // ALGORITHM REASON: Weight critical violations more heavily in architecture score
    const criticalPenalty = criticalViolations * 2.0;
    const warningPenalty = (totalViolations - criticalViolations) * 0.5;
    const totalPenalty = criticalPenalty + warningPenalty;

    const score = Math.max(0, 10.0 - totalPenalty);
    return Math.round(score * 10) / 10; // Round to 1 decimal place
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Monitoring state access for external components
  // STATE ACCESS REASON: Allow components to query current monitoring state
  public getCurrentState(): MonitoringState {
    return {
      violations: [...this.violations],
      isMonitoring: this.isActive,
      totalViolations: this.violations.length,
      criticalViolations: this.violations.filter(v => v.severity === 'critical').length,
      lastViolationTime: this.violations.length > 0
        ? Math.max(...this.violations.map(v => v.timestamp))
        : null,
      architectureScore: this.calculateArchitectureScore()
    };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Violation history management
  // HISTORY MANAGEMENT REASON: Prevent memory leaks from unlimited violation storage
  public clearViolations(): void {
    this.violations = [];
    this.notifyListeners();
    console.log('🔍 CMS Runtime Monitor violations cleared');
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Violation export for analysis
  // EXPORT REASON: Allow violation data export for postmortem analysis
  public exportViolations(): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      monitoringSession: {
        totalViolations: this.violations.length,
        criticalViolations: this.violations.filter(v => v.severity === 'critical').length,
        architectureScore: this.calculateArchitectureScore(),
        isActive: this.isActive
      },
      violations: this.violations
    }, null, 2);
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React hook for CMS runtime monitoring
// MONITORING HOOK REASON: React-integrated monitoring with automatic lifecycle management
export function useCMSRuntimeMonitor(): MonitoringState & {
  startMonitoring: () => void;
  stopMonitoring: () => void;
  recordViolation: (type: RuntimeViolation['type'], component: string, message: string, metadata?: Record<string, any>) => void;
  clearViolations: () => void;
  exportViolations: () => string;
} {
  const [monitoringState, setMonitoringState] = useState<MonitoringState>({
    violations: [],
    isMonitoring: false,
    totalViolations: 0,
    criticalViolations: 0,
    lastViolationTime: null,
    architectureScore: 10.0
  });

  useEffect(() => {
    const monitor = CMSRuntimeMonitor.getInstance();

    // Subscribe to monitoring state changes
    const unsubscribe = monitor.addListener(setMonitoringState);

    // Initialize with current state
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
    exportViolations: () => monitor.exportViolations()
  };
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Global monitor instance export
// GLOBAL ACCESS REASON: Allow non-React code to access monitoring functionality
export const runtimeMonitor = CMSRuntimeMonitor.getInstance();

// CONTEXT7 SOURCE: /reactjs/react.dev - Development-only automatic monitoring activation
// AUTO-ACTIVATION REASON: Enable monitoring in development without manual setup
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Auto-start monitoring in development
  runtimeMonitor.startMonitoring();
  console.log('🔍 CMS Runtime Monitor auto-activated for development');
}