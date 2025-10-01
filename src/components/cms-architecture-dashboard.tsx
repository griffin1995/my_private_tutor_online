// CONTEXT7 SOURCE: /reactjs/react.dev - CMS Architecture Monitoring Dashboard component
// MONITORING DASHBOARD REASON: Real-time visualization of synchronous CMS architecture integrity
// AUGUST 2025 PROTECTION: Comprehensive dashboard preventing homepage failure recurrence

'use client';

import React, { useState, useEffect } from 'react';
import { useCMSRuntimeMonitor, RuntimeViolation } from '@/lib/cms/cms-runtime-monitor';

// CONTEXT7 SOURCE: /microsoft/typescript - Dashboard component props interface
// COMPONENT PROPS REASON: Flexible dashboard configuration for different use cases
interface CMSArchitectureDashboardProps {
  showFullDetails?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  maxViolationsDisplay?: number;
  showExportButton?: boolean;
  compactMode?: boolean;
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Real-time CMS architecture monitoring dashboard
// DASHBOARD COMPONENT REASON: Visual monitoring interface for CMS architecture integrity
export function CMSArchitectureDashboard({
  showFullDetails = true,
  autoRefresh = true,
  refreshInterval = 5000,
  maxViolationsDisplay = 10,
  showExportButton = true,
  compactMode = false
}: CMSArchitectureDashboardProps) {
  const monitoringData = useCMSRuntimeMonitor();
  const [isExpanded, setIsExpanded] = useState(!compactMode);
  const [selectedViolation, setSelectedViolation] = useState<RuntimeViolation | null>(null);

  // CONTEXT7 SOURCE: /reactjs/react.dev - Auto-refresh functionality for real-time monitoring
  // AUTO-REFRESH REASON: Keep dashboard current with latest monitoring data
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Force re-render to show latest data
      // The monitoring hook automatically updates via its subscription
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // CONTEXT7 SOURCE: /microsoft/typescript - Architecture score color calculation
  // VISUAL INDICATION REASON: Immediate visual feedback on architecture integrity
  const getScoreColor = (score: number): string => {
    if (score >= 9.0) return 'text-green-600 bg-green-50';
    if (score >= 7.0) return 'text-yellow-600 bg-yellow-50';
    if (score >= 5.0) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  // CONTEXT7 SOURCE: /microsoft/typescript - Violation severity styling
  // SEVERITY STYLING REASON: Clear visual distinction between violation types
  const getViolationSeverityStyle = (severity: RuntimeViolation['severity']): string => {
    switch (severity) {
      case 'critical':
        return 'border-l-4 border-red-500 bg-red-50 text-red-800';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50 text-blue-800';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  // CONTEXT7 SOURCE: /microsoft/typescript - Violation type display formatting
  // TYPE FORMATTING REASON: Human-readable violation type names
  const getViolationTypeDisplay = (type: RuntimeViolation['type']): string => {
    const typeMap = {
      'ASYNC_CMS_CALL': 'Async CMS Call',
      'PROMISE_DETECTION': 'Promise Usage',
      'LOADING_STATE': 'Loading State',
      'USEEFFECT_CMS': 'useEffect CMS',
      'MISSING_DATA': 'Missing Data'
    };
    return typeMap[type] || type;
  };

  // CONTEXT7 SOURCE: /reactjs/react.dev - Export functionality for violation analysis
  // EXPORT REASON: Allow violation data export for postmortem analysis
  const handleExportViolations = () => {
    const exportData = monitoringData.exportViolations();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cms-violations-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // CONTEXT7 SOURCE: /reactjs/react.dev - Compact mode rendering for minimal UI
  // COMPACT MODE REASON: Minimal dashboard overlay for production monitoring
  if (compactMode && !isExpanded) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg border p-3 max-w-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${monitoringData.isMonitoring ? 'bg-green-400' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium">CMS Monitor</span>
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Expand
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-600">
          <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getScoreColor(monitoringData.architectureScore)}`}>
            Score: {monitoringData.architectureScore}/10
          </div>
          {monitoringData.criticalViolations > 0 && (
            <div className="mt-1 text-red-600 font-medium">
              {monitoringData.criticalViolations} Critical Issues
            </div>
          )}
        </div>
      </div>
    );
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Full dashboard rendering with comprehensive monitoring
  // FULL DASHBOARD REASON: Detailed monitoring interface for development and debugging
  return (
    <div className={`${compactMode ? 'fixed top-4 right-4 z-50 max-w-2xl' : 'w-full'} bg-white shadow-lg rounded-lg border`}>
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Dashboard header with control buttons */}
      {/* HEADER REASON: Dashboard controls and status overview */}
      <div className="bg-gray-50 px-6 py-4 border-b rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${monitoringData.isMonitoring ? 'bg-green-400' : 'bg-gray-400'}`} />
            <h2 className="text-lg font-semibold text-gray-900">CMS Architecture Monitor</h2>
            <span className="text-sm text-gray-500">
              {monitoringData.isMonitoring ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {compactMode && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs text-gray-600 hover:text-gray-800 px-2 py-1"
              >
                Minimize
              </button>
            )}
            {showExportButton && (
              <button
                onClick={handleExportViolations}
                className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-200 rounded"
              >
                Export Data
              </button>
            )}
            {!monitoringData.isMonitoring ? (
              <button
                onClick={monitoringData.startMonitoring}
                className="text-xs text-green-600 hover:text-green-800 px-2 py-1 border border-green-200 rounded"
              >
                Start Monitor
              </button>
            ) : (
              <button
                onClick={monitoringData.stopMonitoring}
                className="text-xs text-red-600 hover:text-red-800 px-2 py-1 border border-red-200 rounded"
              >
                Stop Monitor
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Architecture integrity metrics display */}
      {/* METRICS REASON: Key performance indicators for CMS architecture health */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 p-2 rounded ${getScoreColor(monitoringData.architectureScore)}`}>
              {monitoringData.architectureScore}/10
            </div>
            <div className="text-sm text-gray-600">Architecture Score</div>
            <div className="text-xs text-gray-500">
              {monitoringData.architectureScore >= 9.0 && '🟢 Excellent'}
              {monitoringData.architectureScore >= 7.0 && monitoringData.architectureScore < 9.0 && '🟡 Good'}
              {monitoringData.architectureScore >= 5.0 && monitoringData.architectureScore < 7.0 && '🟠 Fair'}
              {monitoringData.architectureScore < 5.0 && '🔴 Poor'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700 mb-1">
              {monitoringData.totalViolations}
            </div>
            <div className="text-sm text-gray-600">Total Violations</div>
            <div className="text-xs text-gray-500">All time</div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${monitoringData.criticalViolations > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {monitoringData.criticalViolations}
            </div>
            <div className="text-sm text-gray-600">Critical Issues</div>
            <div className="text-xs text-gray-500">
              {monitoringData.criticalViolations === 0 ? '✅ Clean' : '⚠️ Action needed'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {monitoringData.lastViolationTime
                ? Math.floor((Date.now() - monitoringData.lastViolationTime) / 1000 / 60)
                : '∞'}
            </div>
            <div className="text-sm text-gray-600">Minutes Since</div>
            <div className="text-xs text-gray-500">Last violation</div>
          </div>
        </div>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - August 2025 failure prevention status */}
        {/* FAILURE PREVENTION STATUS REASON: Explicit tracking of specific failure patterns */}
        {monitoringData.architectureScore >= 9.0 ? (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-green-600 mr-3">✅</div>
              <div>
                <div className="font-medium text-green-800">August 2025 Failure Prevention: ACTIVE</div>
                <div className="text-sm text-green-700">
                  Synchronous CMS architecture is maintained. No async patterns detected.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-600 mr-3">⚠️</div>
              <div>
                <div className="font-medium text-red-800">August 2025 Failure Risk: DETECTED</div>
                <div className="text-sm text-red-700">
                  CMS architecture violations found. Review and fix issues to prevent homepage failures.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Recent violations display */}
        {/* VIOLATIONS DISPLAY REASON: Detailed violation information for debugging */}
        {monitoringData.violations.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Violations ({monitoringData.violations.length})
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {monitoringData.violations
                .slice(-maxViolationsDisplay)
                .reverse()
                .map((violation) => (
                <div
                  key={violation.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${getViolationSeverityStyle(violation.severity)} hover:shadow-md`}
                  onClick={() => setSelectedViolation(violation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{getViolationTypeDisplay(violation.type)}</span>
                        <span className="text-xs px-2 py-1 rounded bg-white bg-opacity-50">
                          {violation.component}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{violation.message}</p>
                      <div className="text-xs opacity-75">
                        {new Date(violation.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-xs font-medium ml-4">
                      {violation.severity.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {monitoringData.violations.length > maxViolationsDisplay && (
              <div className="text-center mt-4 text-sm text-gray-500">
                Showing latest {maxViolationsDisplay} of {monitoringData.violations.length} violations
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={monitoringData.clearViolations}
                className="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded"
              >
                Clear All Violations
              </button>
            </div>
          </div>
        )}

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - No violations success state */}
        {/* SUCCESS STATE REASON: Positive feedback when architecture is clean */}
        {monitoringData.violations.length === 0 && monitoringData.isMonitoring && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Perfect Synchronous Architecture
            </h3>
            <p className="text-gray-600 mb-4">
              No CMS architecture violations detected. August 2025 failure patterns successfully prevented.
            </p>
            <div className="text-sm text-gray-500">
              Monitoring has been active since page load
            </div>
          </div>
        )}
      </div>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Detailed violation modal */}
      {/* VIOLATION MODAL REASON: In-depth violation analysis with technical details */}
      {selectedViolation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Violation Details</h3>
                <button
                  onClick={() => setSelectedViolation(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <div className="mt-1 text-lg">{getViolationTypeDisplay(selectedViolation.type)}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Component</label>
                <div className="mt-1">{selectedViolation.component}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <div className="mt-1 p-3 bg-gray-50 rounded">{selectedViolation.message}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Timestamp</label>
                <div className="mt-1">{new Date(selectedViolation.timestamp).toLocaleString()}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Severity</label>
                <div className={`mt-1 inline-block px-2 py-1 rounded text-sm ${getViolationSeverityStyle(selectedViolation.severity)}`}>
                  {selectedViolation.severity.toUpperCase()}
                </div>
              </div>

              {Object.keys(selectedViolation.metadata).length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Metadata</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded text-xs">
                    <pre>{JSON.stringify(selectedViolation.metadata, null, 2)}</pre>
                  </div>
                </div>
              )}

              {showFullDetails && selectedViolation.stackTrace && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Stack Trace</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded text-xs">
                    <pre className="whitespace-pre-wrap">{selectedViolation.stackTrace}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Production-safe monitoring component wrapper
// PRODUCTION WRAPPER REASON: Conditional rendering based on environment
export function CMSArchitectureMonitorWrapper({ children, ...props }: CMSArchitectureDashboardProps & { children?: React.ReactNode }) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Environment-based rendering
  // ENVIRONMENT SAFETY REASON: Only show monitoring in development unless explicitly enabled
  const showInProduction = process.env.NEXT_PUBLIC_SHOW_CMS_MONITOR === 'true';
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isDevelopment && !showInProduction) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <CMSArchitectureDashboard {...props} />
    </>
  );
}

export default CMSArchitectureDashboard;