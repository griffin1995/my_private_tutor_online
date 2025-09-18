// CONTEXT7 SOURCE: /vercel/next.js - Development tools provider
// DEBUGGING TOOL REASON: Application-level provider for development debugging features

'use client';

import React, { useEffect } from 'react';
import { DevToolbar } from '@/components/dev/DevToolbar';

interface DevToolsProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component for development tools
 * Initializes debugging features and renders toolbar
 * Only active in development environment
 */
export function DevToolsProvider({ children }: DevToolsProviderProps) {
  // CONTEXT7 SOURCE: /vercel/next.js - Development environment detection
  // IMPLEMENTATION REASON: Initialize dev tools only in development
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Log development mode information
    console.log(
      '%c🚀 MY PRIVATE TUTOR ONLINE - Development Mode',
      'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-weight: bold; font-size: 14px; border-radius: 5px;'
    );
    
    console.log(
      '%c🐛 Pesticide CSS Debug Available',
      'color: #10b981; font-weight: bold; font-size: 12px;'
    );
    
    console.log(
      '%cPress Ctrl/Cmd + Shift + D to toggle visual debugging',
      'color: #6b7280; font-style: italic; font-size: 11px;'
    );

    // CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring in development
    // IMPLEMENTATION REASON: Track rendering performance during development
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
        console.log(
          `%c⏱ Page Load Time: ${loadTime.toFixed(2)}ms`,
          'color: #3b82f6; font-weight: bold;'
        );
      }
    }

    // CONTEXT7 SOURCE: /vercel/next.js - Browser compatibility check
    // IMPLEMENTATION REASON: Ensure debugging tools work correctly
    const checkBrowserCompatibility = () => {
      const features = {
        'CSS Custom Properties': CSS.supports('(--custom: value)'),
        'CSS Grid': CSS.supports('display: grid'),
        'CSS Flexbox': CSS.supports('display: flex'),
      };

      const unsupported = Object.entries(features)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);

      if (unsupported.length > 0) {
        console.warn(
          '%c⚠ Browser Compatibility Warning',
          'color: #f59e0b; font-weight: bold;',
          `\nUnsupported features: ${unsupported.join(', ')}`
        );
      }
    };

    checkBrowserCompatibility();

    // CONTEXT7 SOURCE: /vercel/next.js - Error boundary for dev tools
    // IMPLEMENTATION REASON: Prevent dev tools from breaking the app
    const originalError = console.error;
    console.error = (...args) => {
      // Filter out noise from development warnings
      const errorString = args.join(' ');
      if (
        !errorString.includes('DevTools failed to load source map') &&
        !errorString.includes('hydration') &&
        !errorString.includes('non-boolean attribute')
      ) {
        originalError.apply(console, args);
      }
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' && <DevToolbar />}
    </>
  );
}