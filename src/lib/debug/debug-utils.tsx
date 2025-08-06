/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component patterns and debugging utilities
 * IMPLEMENTATION REASON: Official React documentation for component debugging and development tools
 * UTILITY REASON: Context7 MCP verified patterns for debugging React applications
 */

import React, { ReactNode, useEffect, useState } from 'react';
import { DEBUG_CONFIG, debugLog, isDebugEnabled } from './debug-config';

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Border utility classes and visual debugging
 * BORDER SYSTEM REASON: Official Tailwind CSS documentation for border utilities and visual debugging
 */
interface DebugBorderProps {
  children: ReactNode;
  label: string;
  level: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  id?: string;
  className?: string;
}

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application patterns
 * CONDITIONAL CLASSES REASON: Official Tailwind CSS patterns for dynamic class application
 */
export const getDebugBorderClasses = (level: DebugBorderProps['level'], colorScheme = DEBUG_CONFIG.colorScheme): string => {
  // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe class generation
  // HYDRATION SAFETY REASON: Consistent class names on server and client
  if (!isDebugEnabled() || !DEBUG_CONFIG.showBorders) return '';

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Border width utilities
  // BORDER WIDTH REASON: Official Tailwind CSS documentation for border-* utilities
  const borderWidth = `border-${DEBUG_CONFIG.borderWidth}`;

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Color system and border colors
  // COLOR SYSTEM REASON: Official Tailwind CSS documentation for border-* color utilities
  const colorSchemes = {
    rainbow: {
      primary: `${borderWidth} border-red-500`,
      secondary: `${borderWidth} border-blue-500`, 
      tertiary: `${borderWidth} border-green-500`,
      quaternary: `${borderWidth} border-yellow-500`,
    },
    monochrome: {
      primary: `${borderWidth} border-gray-900`,
      secondary: `${borderWidth} border-gray-700`,
      tertiary: `${borderWidth} border-gray-500`,
      quaternary: `${borderWidth} border-gray-300`,
    },
    semantic: {
      primary: `${borderWidth} border-purple-600`,
      secondary: `${borderWidth} border-indigo-600`,
      tertiary: `${borderWidth} border-cyan-600`,
      quaternary: `${borderWidth} border-emerald-600`,
    },
  };

  return colorSchemes[colorScheme][level];
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Absolute positioning and label system
 * LABEL POSITIONING REASON: Official Tailwind CSS documentation for absolute positioning utilities
 */
export const getDebugLabelClasses = (position = DEBUG_CONFIG.labelPosition): string => {
  // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe class generation
  // HYDRATION SAFETY REASON: Consistent class names on server and client
  if (!isDebugEnabled() || !DEBUG_CONFIG.showLabels) return 'hidden';

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Position utilities and z-index
  // POSITIONING REASON: Official Tailwind CSS documentation for absolute positioning patterns
  const baseClasses = 'absolute text-xs font-bold px-1 py-0.5 bg-black/80 text-white rounded-sm z-50 pointer-events-none select-none';
  
  const positions = {
    'top-left': `${baseClasses} top-0 left-0`,
    'top-right': `${baseClasses} top-0 right-0`,
    'bottom-left': `${baseClasses} bottom-0 left-0`,
    'bottom-right': `${baseClasses} bottom-0 right-0`,
  };

  return positions[position];
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component patterns with debugging capabilities
 * COMPONENT REASON: Official React documentation for component composition and debugging
 */
export const DebugWrapper: React.FC<DebugBorderProps> = ({ 
  children, 
  label, 
  level, 
  id,
  className = '' 
}) => {
  // CONTEXT7 SOURCE: /vercel/next.js - Client-side only rendering with useEffect
  // SSR HYDRATION REASON: Official Next.js patterns for preventing hydration mismatches
  const [isClient, setIsClient] = useState(false);
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect patterns for side effects
  // EFFECT REASON: Official React patterns for logging and side effects in development
  useEffect(() => {
    setIsClient(true);
    if (isDebugEnabled() && DEBUG_CONFIG.enableLogging) {
      debugLog(`DebugWrapper mounted: ${label}`, { level, id });
    }
  }, [label, level, id]);

  // CONTEXT7 SOURCE: /vercel/next.js - Prevent server-side rendering for debug components
  // SSR PREVENTION REASON: Official Next.js patterns to avoid hydration mismatches
  if (!isClient || !isDebugEnabled()) {
    // CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns
    // PERFORMANCE REASON: Official React patterns for no-op rendering when debugging disabled
    return <>{children}</>;
  }

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Class concatenation patterns
  // CLASS MERGING REASON: Official Tailwind CSS patterns for combining utility classes
  const debugClasses = [
    getDebugBorderClasses(level),
    'relative',
    className
  ].filter(Boolean).join(' ');

  // CONTEXT7 SOURCE: /vercel/next.js - HTML data attributes for development tools
  // DATA ATTRIBUTES REASON: Next.js and HTML standards for developer tool integration
  // CLIENT-SIDE REASON: Generate data attributes only on client to ensure consistent rendering
  const dataAttributes = DEBUG_CONFIG.addDataAttributes ? {
    'data-debug-label': label,
    'data-debug-level': level,
    'data-debug-id': id,
    'data-debug-timestamp': new Date().toISOString(),
  } : {};

  return (
    <div 
      className={debugClasses}
      {...dataAttributes}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional rendering with Tailwind classes */}
      {/* LABEL RENDERING REASON: Official React conditional rendering for debug labels */}
      {DEBUG_CONFIG.showLabels && (
        <div className={getDebugLabelClasses()}>
          {label}
          {id && <span className="ml-1 opacity-75">#{id}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Custom React Hooks patterns
 * HOOK REASON: Official React documentation for custom hook creation and debugging utilities
 */
export const useDebugInfo = (componentName: string, props?: Record<string, any>) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect dependency patterns
  // DEPENDENCY REASON: Official React patterns for effect dependencies and prop logging
  useEffect(() => {
    if (isDebugEnabled() && DEBUG_CONFIG.enableLogging) {
      debugLog(`Component ${componentName} rendered`, { props });
    }
  }, [componentName, props]);

  // CONTEXT7 SOURCE: /reactjs/react.dev - Custom hook return patterns
  // RETURN PATTERN REASON: Official React patterns for custom hook return values
  return {
    debugLog: (message: string, data?: any) => {
      if (isDebugEnabled()) {
        debugLog(`[${componentName}] ${message}`, data);
      }
    },
    isDebugging: isDebugEnabled(),
  };
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Performance measurement patterns
 * PERFORMANCE REASON: Official React patterns for performance debugging and measurement
 */
export const debugPerformance = <T,>(
  label: string, 
  fn: () => T
): T => {
  if (!isDebugEnabled() || !DEBUG_CONFIG.enableLogging) {
    return fn();
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Browser API safety check for SSR
  // SSR SAFETY REASON: Prevent performance API access during server-side rendering
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return fn();
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Performance API usage patterns
  // PERFORMANCE API REASON: Official browser Performance API for accurate timing
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  debugLog(`Performance: ${label}`, { 
    duration: `${(end - start).toFixed(2)}ms`,
    timestamp: new Date().toISOString()
  });

  return result;
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Visual debugging grid system
 * GRID SYSTEM REASON: Official Tailwind CSS patterns for visual debugging layouts
 */
export const DebugGrid: React.FC<{ show?: boolean; spacing?: number }> = ({ 
  show = DEBUG_CONFIG.enabled, 
  spacing = 24 
}) => {
  // CONTEXT7 SOURCE: /vercel/next.js - Client-side only rendering with useEffect
  // SSR HYDRATION REASON: Official Next.js patterns for preventing hydration mismatches
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // CONTEXT7 SOURCE: /vercel/next.js - Prevent server-side rendering for client-only components
  // SSR PREVENTION REASON: Official Next.js patterns to avoid hydration mismatches
  if (!isClient || !show) return null;

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background pattern utilities
  // BACKGROUND PATTERNS REASON: Official Tailwind CSS documentation for background utilities
  const gridStyle = {
    backgroundImage: `
      linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: `${spacing}px ${spacing}px`,
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[999]"
      style={gridStyle}
      data-debug-grid="true"
    />
  );
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary patterns for debugging
 * ERROR BOUNDARY REASON: Official React patterns for error catching and debugging
 */
interface DebugErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
}

interface DebugErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class DebugErrorBoundary extends React.Component<
  DebugErrorBoundaryProps,
  DebugErrorBoundaryState
> {
  constructor(props: DebugErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary lifecycle methods
  // ERROR BOUNDARY REASON: Official React error boundary implementation
  static getDerivedStateFromError(error: Error): DebugErrorBoundaryState {
    return { hasError: true, error };
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Error logging in componentDidCatch
  // ERROR LOGGING REASON: Official React patterns for error logging and debugging
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (isDebugEnabled()) {
      debugLog(`Error caught in ${this.props.componentName || 'component'}`, {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  render() {
    if (this.state.hasError && isDebugEnabled()) {
      // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Error styling patterns
      // ERROR STYLING REASON: Official Tailwind CSS patterns for error state presentation
      return (
        <div className="border-2 border-red-500 bg-red-50 p-4 rounded-lg">
          <h2 className="text-red-800 font-bold mb-2">
            Debug Error in {this.props.componentName || 'Component'}
          </h2>
          <pre className="text-sm text-red-700 bg-red-100 p-2 rounded overflow-auto">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}