// CONTEXT7 SOURCE: /frux/csp - Enterprise CSP implementation with nonce generation
// SECURITY IMPLEMENTATION REASON: Official CSP library patterns for Next.js 15 with dynamic nonce support

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// CONTEXT7 SOURCE: /frux/csp - CSP directive constants for enterprise security
export const CSP_CONSTANTS = {
  SELF: "'self'",
  NONE: "'none'",
  UNSAFE_INLINE: "'unsafe-inline'",
  UNSAFE_EVAL: "'unsafe-eval'",
  STRICT_DYNAMIC: "'strict-dynamic'",
} as const

/**
 * Generate cryptographically secure nonce for CSP headers
 * CONTEXT7 SOURCE: /frux/csp - Nonce generation pattern for script and style security
 */
export function generateCSPNonce(): string {
  return crypto.randomBytes(16).toString('base64')
}

/**
 * Enhanced CSP configuration for My Private Tutor Online
 * Royal client data protection standards with zero tolerance for XSS
 */
export interface CSPConfig {
  nonce: string
  reportUri?: string
  reportOnly?: boolean
  additionalScriptSources?: string[]
  additionalStyleSources?: string[]
}

/**
 * Build enterprise-grade CSP header value
 * CONTEXT7 SOURCE: /frux/csp - CSP header generation with nonce integration
 */
export function buildCSPHeader(config: CSPConfig): string {
  const { nonce, reportUri, additionalScriptSources = [], additionalStyleSources = [] } = config

  // Core script sources for Next.js and royal client standards
  const scriptSources = [
    CSP_CONSTANTS.SELF,
    `'nonce-${nonce}'`,
    CSP_CONSTANTS.STRICT_DYNAMIC,
    // Vercel and analytics (royal client approved)
    'https://vercel.live',
    'https://*.vercel-scripts.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://plausible.io',
    'https://*.plausible.io',
    ...additionalScriptSources,
  ].join(' ')

  // Style sources with nonce support
  const styleSources = [
    CSP_CONSTANTS.SELF,
    `'nonce-${nonce}'`,
    'https://fonts.googleapis.com',
    ...additionalStyleSources,
  ].join(' ')

  // Comprehensive CSP directives for premium tutoring service
  const directives = [
    `default-src ${CSP_CONSTANTS.SELF}`,
    `script-src ${scriptSources}`,
    `style-src ${styleSources}`,
    `font-src ${CSP_CONSTANTS.SELF} https://fonts.gstatic.com data:`,
    `img-src ${CSP_CONSTANTS.SELF} data: https: blob:`,
    `media-src ${CSP_CONSTANTS.SELF} blob:`,
    `connect-src ${CSP_CONSTANTS.SELF} https://vercel.live wss://ws-us6.pusher.com https://*.vercel-insights.com https://www.google-analytics.com https://plausible.io https://*.plausible.io https://vitals.vercel-insights.com`,
    `frame-src ${CSP_CONSTANTS.SELF} https://vercel.live https://www.youtube.com https://www.youtube-nocookie.com`,
    `object-src ${CSP_CONSTANTS.NONE}`,
    `base-uri ${CSP_CONSTANTS.SELF}`,
    `form-action ${CSP_CONSTANTS.SELF}`,
    `frame-ancestors ${CSP_CONSTANTS.NONE}`,
    'upgrade-insecure-requests',
    'block-all-mixed-content',
    "require-trusted-types-for 'script'",
  ]

  // Add report URI if specified
  if (reportUri) {
    directives.push(`report-uri ${reportUri}`)
  }

  return directives.join('; ')
}

/**
 * CSP middleware for Next.js App Router
 * Implements enterprise-grade Content Security Policy with nonce generation
 */
export function applyCSPHeaders(
  response: NextResponse,
  config: Partial<CSPConfig> = {}
): NextResponse {
  const nonce = config.nonce || generateCSPNonce()
  
  const cspConfig: CSPConfig = {
    nonce,
    reportUri: process.env.CSP_REPORT_URI,
    reportOnly: process.env.NODE_ENV !== 'production',
    ...config,
  }

  const cspHeader = buildCSPHeader(cspConfig)
  const headerName = cspConfig.reportOnly 
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy'

  // Set CSP header
  response.headers.set(headerName, cspHeader)
  
  // Set nonce in custom header for Next.js consumption
  response.headers.set('X-CSP-Nonce', nonce)
  
  return response
}

/**
 * Enhanced security headers with CSP integration
 * CONTEXT7 SOURCE: /frux/csp - Security headers best practices for enterprise applications
 */
export function applyEnhancedSecurityHeaders(
  response: NextResponse,
  nonce?: string
): NextResponse {
  const generatedNonce = nonce || generateCSPNonce()
  
  // Apply CSP with nonce
  applyCSPHeaders(response, { nonce: generatedNonce })
  
  // Additional enterprise security headers
  const securityHeaders = {
    // OWASP recommended headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '0', // Disabled in favor of CSP
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    
    // HSTS for HTTPS enforcement
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    
    // Additional security measures
    'X-Permitted-Cross-Domain-Policies': 'none',
    'X-Download-Options': 'noopen',
    'X-DNS-Prefetch-Control': 'on',
    
    // Royal client standards
    'X-Security-Level': 'enterprise',
    'X-Client-Standards': 'royal-approved',
    'X-Data-Protection': 'gdpr-compliant',
  }

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

/**
 * Get CSP nonce from request headers (for SSR)
 * Used in Next.js pages to access the generated nonce
 */
export function getCSPNonce(headers: Headers): string | null {
  return headers.get('X-CSP-Nonce')
}

/**
 * CSP violation report handler type
 * For monitoring CSP violations in production
 */
export interface CSPViolationReport {
  'csp-report': {
    'document-uri': string
    referrer: string
    'violated-directive': string
    'effective-directive': string
    'original-policy': string
    disposition: string
    'blocked-uri': string
    'line-number': number
    'column-number': number
    'source-file': string
  }
}

/**
 * Security monitoring for CSP violations
 * CONTEXT7 SOURCE: /frux/csp - CSP violation reporting patterns
 */
export function logCSPViolation(report: CSPViolationReport): void {
  const violation = report['csp-report']
  
  console.warn('[CSP VIOLATION]', {
    timestamp: new Date().toISOString(),
    directive: violation['violated-directive'],
    blockedUri: violation['blocked-uri'],
    documentUri: violation['document-uri'],
    sourceFile: violation['source-file'],
    lineNumber: violation['line-number'],
    columnNumber: violation['column-number'],
  })
  
  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Integration with Sentry, DataDog, or similar
    // securityMonitor.logEvent({
    //   type: 'csp_violation',
    //   severity: 'medium',
    //   details: violation
    // })
  }
}