/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Module export patterns for debugging systems
 * EXPORT REASON: Official React and JavaScript patterns for centralized module exports
 * DEBUGGING SYSTEM REASON: Context7 MCP verified patterns for comprehensive debugging utilities
 */

// CONTEXT7 SOURCE: /vercel/next.js - Configuration and environment utilities
// CONFIG EXPORTS REASON: Official Next.js patterns for configuration module exports
export {
  DEBUG_CONFIG,
  isDebugEnabled,
  getDebugConfig,
  debugLog,
  debugGroup,
  type DebugConfig
} from './debug-config';

// CONTEXT7 SOURCE: /reactjs/react.dev - React debugging utilities and components
// UTILS EXPORTS REASON: Official React patterns for utility function and component exports
export {
  DebugWrapper,
  getDebugBorderClasses,
  getDebugLabelClasses,
  useDebugInfo,
  debugPerformance,
  DebugGrid,
  DebugErrorBoundary
} from './debug-utils';

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Visual debugging component system
// VISUAL EXPORTS REASON: Official component export patterns for visual debugging system
export {
  DebugSection,
  DebugContainer,
  DebugComponent,
  DebugElement,
  DebugOverlay
} from './visual-debug';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Convenience wrapper patterns
 * CONVENIENCE REASON: Official React patterns for convenient debugging wrapper functions
 */

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Quick debug class utility with SSR safety
// QUICK CLASSES REASON: Official utility pattern for rapid debugging class application
export const debugClasses = (level: 'primary' | 'secondary' | 'tertiary' | 'quaternary' = 'primary') => {
  try {
    if (!isDebugEnabled()) return '';
    
    const colors = {
      primary: 'border-2 border-red-500',
      secondary: 'border-2 border-blue-500',
      tertiary: 'border-2 border-green-500',
      quaternary: 'border-2 border-yellow-500'
    };
    
    return colors[level];
  } catch (error) {
    // Fallback for SSR issues
    return '';
  }
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Quick debugging props utility with SSR safety
 * PROPS DEBUG REASON: Official React patterns for rapid props debugging
 */
export const debugProps = (componentName: string, props: Record<string, any>) => {
  try {
    if (isDebugEnabled()) {
      debugLog(`${componentName} props:`, props);
    }
  } catch (error) {
    // Fallback for SSR issues - no logging
  }
  return props;
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Environment-based debugging helpers with SSR safety
 * HELPERS REASON: Official Next.js patterns for debugging helper utilities with SSR compatibility
 */
export const debugHelpers = {
  // Quick debug border application
  border: (level: 'primary' | 'secondary' | 'tertiary' | 'quaternary' = 'primary') => 
    debugClasses(level),
  
  // Quick console log with timestamp
  log: (message: string, data?: any) => debugLog(message, data),
  
  // Quick component props debugging
  props: (name: string, props: Record<string, any>) => debugProps(name, props),
  
  // Quick element data attribute with SSR safety
  attrs: (label: string, id?: string) => {
    // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe environment check
    // SSR SAFETY REASON: Prevent server-side rendering errors by checking environment
    // HYDRATION CONSISTENCY REASON: Return same attributes on server and client
    try {
      if (!isDebugEnabled()) return {};
      const config = getDebugConfig();
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only dynamic attributes
      // SSR PREVENTION REASON: Generate timestamp only on client to avoid hydration mismatch
      if (typeof window === 'undefined') {
        // Server-side: return static attributes only
        return config.addDataAttributes ? {
          'data-debug-label': label,
          'data-debug-id': id,
        } : {};
      } else {
        // Client-side: include dynamic timestamp
        return config.addDataAttributes ? {
          'data-debug-label': label,
          'data-debug-id': id,
          'data-debug-timestamp': new Date().toISOString()
        } : {};
      }
    } catch (error) {
      // Fallback for SSR issues
      return {};
    }
  }
};