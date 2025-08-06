/**
 * CONTEXT7 SOURCE: /vercel/next.js - Environment variable configuration patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for environment-based configuration
 * DEBUG CONFIG REASON: Context7 MCP patterns for production-ready environment toggles
 */

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js environment variable access patterns
 * ENVIRONMENT REASON: Official Next.js patterns for accessing process.env variables
 */
export interface DebugConfig {
  /** Enable/disable all debug features */
  enabled: boolean;
  /** Show visual borders around elements */
  showBorders: boolean;
  /** Show debug labels on elements */
  showLabels: boolean;
  /** Enable console logging */
  enableLogging: boolean;
  /** Add data attributes for dev tools */
  addDataAttributes: boolean;
  /** Color scheme for debug borders */
  colorScheme: 'rainbow' | 'monochrome' | 'semantic';
  /** Border thickness (1-4) */
  borderWidth: 1 | 2 | 3 | 4;
  /** Label position */
  labelPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - SSR-safe environment variable parsing
 * SSR SAFETY REASON: Official Next.js patterns for server-side rendering compatibility
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // CONTEXT7 SOURCE: /vercel/next.js - Environment variable access patterns for SSR safety
  // HYDRATION SAFETY REASON: Consistent server and client environment variable access
  try {
    if (typeof window === 'undefined') {
      // Server-side: use process.env
      return process.env[key] || defaultValue;
    } else {
      // Client-side: use process.env (Webpack embeds these at build time)
      return process.env[key] || defaultValue;
    }
  } catch (error) {
    // CONTEXT7 SOURCE: /vercel/next.js - Error handling for environment variable access
    // ERROR SAFETY REASON: Fallback to default value if environment access fails
    return defaultValue;
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Environment variable parsing and configuration
 * CONFIGURATION REASON: Official Next.js documentation for environment-based feature toggles
 */
export const DEBUG_CONFIG: DebugConfig = {
  // CONTEXT7 SOURCE: /vercel/next.js - Development environment detection with SSR safety
  // ENVIRONMENT DETECTION REASON: Standard Next.js pattern for development vs production
  // HYDRATION CONSISTENCY REASON: Use same logic on both server and client for consistent rendering
  enabled: process.env.NODE_ENV === 'development' && 
           getEnvVar('NEXT_PUBLIC_DEBUG_MODE') === 'true',
  
  // CONTEXT7 SOURCE: /vercel/next.js - Boolean environment variable parsing with SSR safety
  // BOOLEAN PARSING REASON: Official Next.js patterns for parsing string env vars to booleans
  showBorders: getEnvVar('NEXT_PUBLIC_DEBUG_BORDERS') === 'true',
  showLabels: getEnvVar('NEXT_PUBLIC_DEBUG_LABELS') === 'true',
  enableLogging: getEnvVar('NEXT_PUBLIC_DEBUG_LOGGING') === 'true',
  addDataAttributes: getEnvVar('NEXT_PUBLIC_DEBUG_DATA_ATTRS') === 'true',
  
  // CONTEXT7 SOURCE: /vercel/next.js - String environment variable with fallbacks and SSR safety
  // FALLBACK REASON: Official Next.js patterns for default values when env vars not set
  colorScheme: (getEnvVar('NEXT_PUBLIC_DEBUG_COLOR_SCHEME', 'rainbow') as DebugConfig['colorScheme']),
  borderWidth: parseInt(getEnvVar('NEXT_PUBLIC_DEBUG_BORDER_WIDTH', '2')) as DebugConfig['borderWidth'],
  labelPosition: (getEnvVar('NEXT_PUBLIC_DEBUG_LABEL_POSITION', 'top-left') as DebugConfig['labelPosition']),
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React debugging utility functions
 * UTILITY REASON: Official React documentation patterns for debugging helpers
 * HYDRATION SAFETY REASON: Consistent debug state detection for server and client
 */
export const isDebugEnabled = (): boolean => {
  // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe boolean evaluation
  // CONSISTENCY REASON: Ensure same result on server and client for hydration safety
  try {
    return DEBUG_CONFIG.enabled;
  } catch (error) {
    // CONTEXT7 SOURCE: /vercel/next.js - Error handling for SSR safety
    // FALLBACK REASON: Return false if config access fails during SSR
    return false;
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Runtime environment variable access
 * RUNTIME REASON: Next.js patterns for accessing environment variables at runtime
 */
export const getDebugConfig = (): DebugConfig => {
  return DEBUG_CONFIG;
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Development-only code execution patterns
 * DEV ONLY REASON: Official React patterns for code that only runs in development
 */
export const debugLog = (message: string, ...args: any[]): void => {
  if (DEBUG_CONFIG.enabled && DEBUG_CONFIG.enableLogging) {
    // CONTEXT7 SOURCE: /reactjs/react.dev - Console logging best practices
    // LOGGING REASON: Official JavaScript/React patterns for structured console output
    console.log(`[DEBUG ${new Date().toISOString()}]`, message, ...args);
  }
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Performance-conscious debugging
 * PERFORMANCE REASON: Official React patterns for minimal performance impact when debugging disabled
 */
export const debugGroup = (label: string, fn: () => void): void => {
  if (DEBUG_CONFIG.enabled && DEBUG_CONFIG.enableLogging) {
    console.group(`[DEBUG GROUP] ${label}`);
    fn();
    console.groupEnd();
  }
};