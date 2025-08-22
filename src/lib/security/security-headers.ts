// CONTEXT7 SOURCE: /vercel/next.js - Enterprise security headers implementation
// SECURITY IMPLEMENTATION REASON: Official Next.js security patterns for royal client protection standards

/**
 * Comprehensive security headers for My Private Tutor Online
 * Enterprise-grade protection against XSS, clickjacking, and other web vulnerabilities
 * Royal client data protection compliance
 */

export interface SecurityHeadersConfig {
  csp?: {
    enableNonce?: boolean
    reportUri?: string
    development?: boolean
  }
  hsts?: {
    maxAge?: number
    includeSubDomains?: boolean
    preload?: boolean
  }
  frameOptions?: 'DENY' | 'SAMEORIGIN' | string
  referrerPolicy?: string
  permissions?: string[]
}

/**
 * Generate Content Security Policy for premium tutoring service
 * CONTEXT7 SOURCE: /vercel/next.js - CSP configuration for Next.js applications
 */
export function generateCSP(config: SecurityHeadersConfig['csp'] = {}): string {
  const isDevelopment = config.development || process.env.NODE_ENV === 'development'
  const nonce = config.enableNonce ? "'nonce-{NONCE}'" : ''
  
  const cspDirectives = {
    'default-src': [
      "'self'",
      isDevelopment && "'unsafe-eval'", // Allow eval in development for hot reload
    ].filter(Boolean),
    
    'script-src': [
      "'self'",
      "'strict-dynamic'",
      nonce,
      // Vercel Analytics
      'https://va.vercel-scripts.com',
      // Google Analytics (if used)
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      // Development
      isDevelopment && "'unsafe-inline'",
      isDevelopment && "'unsafe-eval'",
      // Hashes for specific inline scripts (would be replaced with actual hashes)
      "'sha256-HASH_FOR_INLINE_SCRIPTS'"
    ].filter(Boolean),
    
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS and dynamic styles
      // Google Fonts
      'https://fonts.googleapis.com',
    ],
    
    'font-src': [
      "'self'",
      'data:',
      // Google Fonts
      'https://fonts.gstatic.com',
    ],
    
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      // Vercel
      'https://*.vercel.app',
      'https://*.vercel-insights.com',
      // External image sources
      'https://images.unsplash.com',
      'https://cdn.jsdelivr.net',
      // Social media for testimonials/profiles
      'https://pbs.twimg.com',
      'https://abs.twimg.com',
    ],
    
    'media-src': [
      "'self'",
      'data:',
      'blob:',
    ],
    
    'connect-src': [
      "'self'",
      // Vercel Analytics
      'https://vitals.vercel-insights.com',
      'https://vercel-insights.com',
      // Development
      isDevelopment && 'ws://localhost:*',
      isDevelopment && 'http://localhost:*',
      isDevelopment && 'https://localhost:*',
    ].filter(Boolean),
    
    'frame-src': [
      "'self'",
      // Payment processing (if needed)
      // 'https://js.stripe.com',
      // 'https://hooks.stripe.com',
    ],
    
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"], // Prevent clickjacking
    'block-all-mixed-content': [],
    'upgrade-insecure-requests': [],
  }
  
  // Add report-uri if provided
  if (config.reportUri) {
    cspDirectives['report-uri'] = [config.reportUri]
  }
  
  // Convert to CSP string
  return Object.entries(cspDirectives)
    .map(([directive, values]) => `${directive} ${values.join(' ')}`)
    .join('; ')
}

/**
 * Generate comprehensive security headers
 * CONTEXT7 SOURCE: /vercel/next.js - Security headers best practices
 */
export function generateSecurityHeaders(config: SecurityHeadersConfig = {}): Record<string, string> {
  const headers: Record<string, string> = {
    // Content Security Policy
    'Content-Security-Policy': generateCSP(config.csp),
    
    // Strict Transport Security
    'Strict-Transport-Security': `max-age=${config.hsts?.maxAge || 31536000}${
      config.hsts?.includeSubDomains !== false ? '; includeSubDomains' : ''
    }${config.hsts?.preload ? '; preload' : ''}`,
    
    // X-Frame-Options (clickjacking protection)
    'X-Frame-Options': config.frameOptions || 'DENY',
    
    // X-Content-Type-Options (MIME type sniffing protection)
    'X-Content-Type-Options': 'nosniff',
    
    // X-XSS-Protection (legacy XSS protection)
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer Policy
    'Referrer-Policy': config.referrerPolicy || 'strict-origin-when-cross-origin',
    
    // Permissions Policy (feature permissions)
    'Permissions-Policy': (config.permissions || [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()', // Disable FLoC
      'payment=(self)',
      'usb=()',
    ]).join(', '),
    
    // Cross-Origin policies
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Resource-Policy': 'same-origin',
    
    // Server information hiding
    'Server': 'My Private Tutor Online',
    'X-Powered-By': '', // Remove this header
    
    // Cache control for security-sensitive responses
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
  
  // Remove empty headers
  Object.keys(headers).forEach(key => {
    if (headers[key] === '') {
      delete headers[key]
    }
  })
  
  return headers
}

/**
 * Apply security headers to Next.js response
 */
export function applySecurityHeaders(
  response: Response, 
  config?: SecurityHeadersConfig
): Response {
  const headers = generateSecurityHeaders(config)
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

/**
 * Middleware helper for applying security headers
 */
export function securityHeadersMiddleware(config?: SecurityHeadersConfig) {
  return (request: Request, response: Response) => {
    return applySecurityHeaders(response, config)
  }
}

/**
 * Generate nonce for CSP
 */
export function generateNonce(): string {
  const crypto = require('crypto')
  return crypto.randomBytes(16).toString('base64')
}

/**
 * Security headers configuration for different environments
 */
export const SECURITY_CONFIGS = {
  production: {
    csp: {
      enableNonce: true,
      reportUri: '/api/csp-report',
      development: false,
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    frameOptions: 'DENY',
    referrerPolicy: 'strict-origin-when-cross-origin',
  },
  
  development: {
    csp: {
      enableNonce: false,
      development: true,
    },
    hsts: {
      maxAge: 0, // Disable HSTS in development
      includeSubDomains: false,
      preload: false,
    },
    frameOptions: 'SAMEORIGIN',
    referrerPolicy: 'strict-origin-when-cross-origin',
  },
} as const

/**
 * Get security configuration for current environment
 */
export function getSecurityConfig(): SecurityHeadersConfig {
  const env = process.env.NODE_ENV
  
  if (env === 'production') {
    return SECURITY_CONFIGS.production
  }
  
  return SECURITY_CONFIGS.development
}

/**
 * Validate CSP violation reports
 */
export interface CSPViolationReport {
  'document-uri': string
  referrer: string
  'violated-directive': string
  'effective-directive': string
  'original-policy': string
  disposition: string
  'blocked-uri': string
  'line-number'?: number
  'column-number'?: number
  'source-file'?: string
  'status-code': number
  'script-sample'?: string
}

/**
 * Process CSP violation reports for security monitoring
 */
export function processCSPViolation(report: CSPViolationReport): {
  severity: 'low' | 'medium' | 'high'
  action: 'log' | 'alert' | 'block'
  details: Record<string, any>
} {
  const violatedDirective = report['violated-directive']
  const blockedUri = report['blocked-uri']
  
  // Determine severity based on violation type
  let severity: 'low' | 'medium' | 'high' = 'low'
  let action: 'log' | 'alert' | 'block' = 'log'
  
  if (violatedDirective.includes('script-src')) {
    severity = 'high'
    action = 'alert'
  } else if (violatedDirective.includes('style-src')) {
    severity = 'medium'
    action = 'log'
  } else if (violatedDirective.includes('img-src')) {
    severity = 'low'
    action = 'log'
  }
  
  // Check for potential XSS attempts
  if (blockedUri.includes('data:') && violatedDirective.includes('script-src')) {
    severity = 'high'
    action = 'block'
  }
  
  return {
    severity,
    action,
    details: {
      documentUri: report['document-uri'],
      violatedDirective: report['violated-directive'],
      blockedUri: report['blocked-uri'],
      sourceFile: report['source-file'],
      lineNumber: report['line-number'],
      scriptSample: report['script-sample'],
      timestamp: Date.now(),
    }
  }
}