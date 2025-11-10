/**
 * Production-Safe Logger Utility
 * Royal client standards - no console.log in production
 * Prevents information leakage and improves performance
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enableInProduction: boolean;
  logLevel: LogLevel;
}

class Logger {
  private config: LoggerConfig;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      enableInProduction: false,
      logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (process.env.NODE_ENV === 'production' && !this.config.enableInProduction) {
      return false;
    }

    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.config.logLevel);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex >= currentLevelIndex;
  }

  debug(...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log('[DEBUG]', ...args);
    }
  }

  info(...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info('[INFO]', ...args);
    }
  }

  warn(...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn('[WARN]', ...args);
    }
  }

  error(...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error('[ERROR]', ...args);
    }
  }

  // Security audit logging - always logs in production for compliance
  security(event: string, details?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type: 'SECURITY',
      event,
      ...details,
    };

    // Always log security events
    console.error('[SECURITY]', JSON.stringify(logEntry));

    // In production, could send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to monitoring service (Sentry, DataDog, etc.)
    }
  }

  // Performance logging - only in development unless critical
  performance(metric: string, value: number, unit = 'ms'): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PERF] ${metric}: ${value}${unit}`);
    } else if (value > 1000 && unit === 'ms') {
      // Log slow operations in production
      console.warn(`[PERF] Slow operation - ${metric}: ${value}${unit}`);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing or custom instances
export { Logger };

// Development-only console wrapper
export const devLog = (...args: any[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

// Production-safe error logger
export const logError = (error: Error | unknown, context?: string): void => {
  const errorDetails = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'production') {
    // In production, log minimal info
    console.error('[ERROR]', errorDetails.message, context || '');
  } else {
    // In development, log full details
    console.error('[ERROR]', errorDetails);
  }
};

// API response logger - sanitizes sensitive data
export const logApiResponse = (
  endpoint: string,
  status: number,
  duration?: number
): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] ${endpoint} - ${status} (${duration}ms)`);
  } else if (status >= 500) {
    // Only log errors in production
    console.error(`[API] ${endpoint} - ${status}`);
  }
};