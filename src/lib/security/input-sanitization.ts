// CONTEXT7 SOURCE: /cure53/dompurify - Enterprise HTML sanitization with XSS prevention
// SECURITY IMPLEMENTATION REASON: Official DOMPurify patterns for royal client data protection

import DOMPurify from 'isomorphic-dompurify'
import * as z from 'zod'

/**
 * Enterprise-grade input sanitization for My Private Tutor Online
 * Royal client data protection with zero tolerance for XSS attacks
 */

/**
 * Sanitization configuration for different content types
 * CONTEXT7 SOURCE: /cure53/dompurify - Configuration profiles for different use cases
 */
export interface SanitizationConfig {
  allowedTags?: string[]
  allowedAttributes?: string[]
  stripTags?: boolean
  removeEmptyElements?: boolean
  useProfiles?: {
    html?: boolean
    svg?: boolean
    mathMl?: boolean
  }
  returnTrustedType?: boolean
  customConfig?: any
}

/**
 * Default configurations for different content types
 */
export const SANITIZATION_CONFIGS = {
  // Strict text-only sanitization for royal client communications
  STRICT_TEXT: {
    allowedTags: [],
    allowedAttributes: [],
    stripTags: true,
    removeEmptyElements: true,
    useProfiles: { html: false, svg: false, mathMl: false },
  } as SanitizationConfig,

  // Basic HTML for testimonials and client feedback
  BASIC_HTML: {
    allowedTags: ['p', 'br', 'strong', 'em', 'u', 'span'],
    allowedAttributes: ['class'],
    stripTags: false,
    removeEmptyElements: true,
    useProfiles: { html: true, svg: false, mathMl: false },
  } as SanitizationConfig,

  // Rich content for educational materials
  RICH_CONTENT: {
    allowedTags: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span'],
    allowedAttributes: ['class', 'id', 'data-*'],
    stripTags: false,
    removeEmptyElements: true,
    useProfiles: { html: true, svg: false, mathMl: false },
  } as SanitizationConfig,

  // Form input sanitization for contact forms
  FORM_INPUT: {
    allowedTags: [],
    allowedAttributes: [],
    stripTags: true,
    removeEmptyElements: true,
    useProfiles: { html: false, svg: false, mathMl: false },
  } as SanitizationConfig,
} as const

/**
 * Sanitization result interface
 */
export interface SanitizationResult {
  sanitized: string
  wasModified: boolean
  threatsRemoved: string[]
  originalLength: number
  sanitizedLength: number
}

/**
 * Core HTML sanitization using DOMPurify
 * CONTEXT7 SOURCE: /cure53/dompurify - Basic sanitization patterns
 * 
 * @param input - Potentially unsafe HTML string
 * @param config - Sanitization configuration
 * @returns Sanitized HTML string
 */
export function sanitizeHTML(
  input: string,
  config: SanitizationConfig = SANITIZATION_CONFIGS.STRICT_TEXT
): SanitizationResult {
  if (!input || typeof input !== 'string') {
    return {
      sanitized: '',
      wasModified: false,
      threatsRemoved: [],
      originalLength: 0,
      sanitizedLength: 0,
    }
  }

  const originalLength = input.length
  let threatsRemoved: string[] = []

  // CONTEXT7 SOURCE: /cure53/dompurify - DOMPurify configuration patterns
  const domPurifyConfig: any = {
    ALLOWED_TAGS: config.allowedTags || [],
    ALLOWED_ATTR: config.allowedAttributes || [],
    KEEP_CONTENT: !config.stripTags,
    REMOVE_EMPTY_ELEMENTS: config.removeEmptyElements,
    RETURN_TRUSTED_TYPE: config.returnTrustedType || false,
    ...config.customConfig,
  }

  // Apply profiles if specified
  if (config.useProfiles) {
    domPurifyConfig.USE_PROFILES = config.useProfiles
  }

  // Add hooks for threat detection
  const originalAddHook = DOMPurify.addHook
  const removedThreats: string[] = []

  // Hook to detect removed elements
  DOMPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.allowedTags === false) {
      removedThreats.push(`Removed dangerous tag: ${data.tagName}`)
    }
  })

  // Hook to detect removed attributes
  DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
    if (data.allowedAttributes === false) {
      removedThreats.push(`Removed dangerous attribute: ${data.attrName}`)
    }
    
    // Detect potential XSS patterns
    if (data.attrValue) {
      const xssPatterns = [
        /javascript:/i,
        /data:text\/html/i,
        /vbscript:/i,
        /on\w+\s*=/i,
        /<script/i,
        /expression\s*\(/i,
      ]
      
      xssPatterns.forEach(pattern => {
        if (pattern.test(data.attrValue)) {
          removedThreats.push(`Removed XSS pattern in ${data.attrName}: ${pattern.source}`)
        }
      })
    }
  })

  try {
    // CONTEXT7 SOURCE: /cure53/dompurify - Core sanitization call
    const sanitized = DOMPurify.sanitize(input, domPurifyConfig) as string
    const sanitizedLength = sanitized.length

    // Clean up hooks
    DOMPurify.removeAllHooks()

    return {
      sanitized,
      wasModified: input !== sanitized,
      threatsRemoved: removedThreats,
      originalLength,
      sanitizedLength,
    }
  } catch (error) {
    console.error('HTML sanitization error:', error)
    // Clean up hooks on error
    DOMPurify.removeAllHooks()
    
    // Return empty string on error for security
    return {
      sanitized: '',
      wasModified: true,
      threatsRemoved: ['Sanitization failed - content rejected'],
      originalLength,
      sanitizedLength: 0,
    }
  }
}

/**
 * Sanitize plain text input with advanced threat detection
 * CONTEXT7 SOURCE: /cure53/dompurify - Text-only sanitization patterns
 * 
 * @param input - Potentially unsafe text string
 * @returns Sanitized text string
 */
export function sanitizeText(input: string): SanitizationResult {
  if (!input || typeof input !== 'string') {
    return {
      sanitized: '',
      wasModified: false,
      threatsRemoved: [],
      originalLength: 0,
      sanitizedLength: 0,
    }
  }

  const originalLength = input.length
  let sanitized = input
  const threatsRemoved: string[] = []

  // Remove HTML tags
  if (/<[^>]+>/.test(sanitized)) {
    threatsRemoved.push('Removed HTML tags')
    sanitized = sanitized.replace(/<[^>]+>/g, '')
  }

  // Remove script-like patterns
  const scriptPatterns = [
    { pattern: /javascript:/gi, name: 'JavaScript protocol' },
    { pattern: /data:text\/html/gi, name: 'HTML data URL' },
    { pattern: /vbscript:/gi, name: 'VBScript protocol' },
    { pattern: /expression\s*\(/gi, name: 'CSS expression' },
    { pattern: /url\s*\(\s*javascript:/gi, name: 'JavaScript in URL' },
  ]

  scriptPatterns.forEach(({ pattern, name }) => {
    if (pattern.test(sanitized)) {
      threatsRemoved.push(`Removed ${name}`)
      sanitized = sanitized.replace(pattern, '')
    }
  })

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim()

  const sanitizedLength = sanitized.length

  return {
    sanitized,
    wasModified: input !== sanitized,
    threatsRemoved,
    originalLength,
    sanitizedLength,
  }
}

/**
 * Sanitize email addresses with domain validation
 * CONTEXT7 SOURCE: /cure53/dompurify - Input validation patterns
 */
export function sanitizeEmail(email: string): SanitizationResult {
  if (!email || typeof email !== 'string') {
    return {
      sanitized: '',
      wasModified: false,
      threatsRemoved: [],
      originalLength: 0,
      sanitizedLength: 0,
    }
  }

  const originalLength = email.length
  let sanitized = email.toLowerCase().trim()
  const threatsRemoved: string[] = []

  // Remove potentially dangerous characters
  const dangerousChars = /[<>{}()[\]\\\/\s]/g
  if (dangerousChars.test(sanitized)) {
    threatsRemoved.push('Removed dangerous characters from email')
    sanitized = sanitized.replace(dangerousChars, '')
  }

  // Basic email format validation
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  if (!emailRegex.test(sanitized)) {
    threatsRemoved.push('Invalid email format')
    sanitized = ''
  }

  // Check for suspicious domains
  const suspiciousDomains = [
    'tempmail', 'guerrillamail', '10minutemail', 'mailinator',
    'trashmail', 'yopmail', 'maildrop', 'throwaways'
  ]

  const domain = sanitized.split('@')[1]
  if (domain && suspiciousDomains.some(sus => domain.includes(sus))) {
    threatsRemoved.push('Suspicious email domain detected')
  }

  return {
    sanitized,
    wasModified: email !== sanitized,
    threatsRemoved,
    originalLength,
    sanitizedLength: sanitized.length,
  }
}

/**
 * Sanitize phone numbers with international format support
 */
export function sanitizePhoneNumber(phone: string): SanitizationResult {
  if (!phone || typeof phone !== 'string') {
    return {
      sanitized: '',
      wasModified: false,
      threatsRemoved: [],
      originalLength: 0,
      sanitizedLength: 0,
    }
  }

  const originalLength = phone.length
  let sanitized = phone.trim()
  const threatsRemoved: string[] = []

  // Remove non-numeric characters except +, (, ), -, and spaces
  const allowedChars = /[^0-9+\-\(\)\s]/g
  if (allowedChars.test(sanitized)) {
    threatsRemoved.push('Removed invalid characters from phone number')
    sanitized = sanitized.replace(allowedChars, '')
  }

  // Normalize spacing and formatting
  sanitized = sanitized.replace(/\s+/g, ' ').trim()

  // Basic phone number validation (10-15 digits)
  const digitsOnly = sanitized.replace(/[^0-9]/g, '')
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    threatsRemoved.push('Phone number length invalid')
  }

  return {
    sanitized,
    wasModified: phone !== sanitized,
    threatsRemoved,
    originalLength,
    sanitizedLength: sanitized.length,
  }
}

/**
 * Comprehensive form data sanitization
 * CONTEXT7 SOURCE: /cure53/dompurify - Form input sanitization patterns
 */
export interface FormSanitizationResult {
  sanitized: Record<string, any>
  threats: Record<string, string[]>
  isValid: boolean
  errors: Record<string, string[]>
}

export function sanitizeFormData(
  data: Record<string, any>,
  schema?: z.ZodSchema
): FormSanitizationResult {
  const sanitized: Record<string, any> = {}
  const threats: Record<string, string[]> = {}
  const errors: Record<string, string[]> = {}
  let isValid = true

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string') {
      // Determine sanitization type based on field name
      let result: SanitizationResult

      if (key.toLowerCase().includes('email')) {
        result = sanitizeEmail(value)
      } else if (key.toLowerCase().includes('phone')) {
        result = sanitizePhoneNumber(value)
      } else if (key.toLowerCase().includes('message') || key.toLowerCase().includes('description')) {
        result = sanitizeHTML(value, SANITIZATION_CONFIGS.BASIC_HTML)
      } else {
        result = sanitizeText(value)
      }

      sanitized[key] = result.sanitized
      
      if (result.threatsRemoved.length > 0) {
        threats[key] = result.threatsRemoved
      }

      // Check if sanitization made the field empty when it shouldn't be
      if (value && !result.sanitized) {
        errors[key] = ['Field contains invalid or dangerous content']
        isValid = false
      }
    } else {
      // Handle non-string values
      sanitized[key] = value
    }
  })

  // Apply Zod schema validation if provided
  if (schema) {
    const validation = schema.safeParse(sanitized)
    if (!validation.success) {
      validation.error.errors.forEach(error => {
        const path = error.path.join('.')
        if (!errors[path]) errors[path] = []
        errors[path].push(error.message)
      })
      isValid = false
    }
  }

  return {
    sanitized,
    threats,
    isValid,
    errors,
  }
}

/**
 * Advanced SQL injection detection and prevention
 * CONTEXT7 SOURCE: /cure53/dompurify - Injection attack prevention patterns
 */
export function detectSQLInjection(input: string): {
  isSafe: boolean
  threats: string[]
  sanitized: string
} {
  if (!input || typeof input !== 'string') {
    return { isSafe: true, threats: [], sanitized: '' }
  }

  const threats: string[] = []
  let sanitized = input

  // SQL injection patterns
  const sqlPatterns = [
    { pattern: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/gi, name: 'SQL keywords' },
    { pattern: /(--|\/\*|\*\/|;|\|\||&&)/gi, name: 'SQL comment or operator' },
    { pattern: /'[^']*'|"[^"]*"/gi, name: 'SQL string literal' },
    { pattern: /\b(OR|AND)\s+\w+\s*=\s*\w+/gi, name: 'SQL boolean condition' },
    { pattern: /\b\d+\s*=\s*\d+/gi, name: 'SQL numeric comparison' },
    { pattern: /\bSCHEMA\b/gi, name: 'SQL schema reference' },
    { pattern: /\b(TABLE|DATABASE|INDEX)\b/gi, name: 'SQL object reference' },
  ]

  sqlPatterns.forEach(({ pattern, name }) => {
    if (pattern.test(input)) {
      threats.push(`Potential SQL injection: ${name}`)
      // Remove the pattern
      sanitized = sanitized.replace(pattern, '')
    }
  })

  return {
    isSafe: threats.length === 0,
    threats,
    sanitized: sanitized.trim(),
  }
}

/**
 * XSS detection for additional security layer
 * CONTEXT7 SOURCE: /cure53/dompurify - XSS attack prevention patterns
 */
export function detectXSS(input: string): {
  isSafe: boolean
  threats: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
} {
  if (!input || typeof input !== 'string') {
    return { isSafe: true, threats: [], riskLevel: 'low' }
  }

  const threats: string[] = []
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'

  // XSS patterns with risk levels
  const xssPatterns = [
    { pattern: /<script[^>]*>.*?<\/script>/gi, name: 'Script tag', risk: 'critical' as const },
    { pattern: /javascript:/gi, name: 'JavaScript protocol', risk: 'critical' as const },
    { pattern: /on\w+\s*=\s*[^>]*/gi, name: 'Event handler attribute', risk: 'high' as const },
    { pattern: /<iframe[^>]*>/gi, name: 'Iframe tag', risk: 'high' as const },
    { pattern: /<object[^>]*>/gi, name: 'Object tag', risk: 'high' as const },
    { pattern: /<embed[^>]*>/gi, name: 'Embed tag', risk: 'high' as const },
    { pattern: /expression\s*\(/gi, name: 'CSS expression', risk: 'medium' as const },
    { pattern: /data:text\/html/gi, name: 'HTML data URL', risk: 'medium' as const },
    { pattern: /vbscript:/gi, name: 'VBScript protocol', risk: 'medium' as const },
  ]

  xssPatterns.forEach(({ pattern, name, risk }) => {
    if (pattern.test(input)) {
      threats.push(`XSS threat detected: ${name}`)
      
      // Update risk level if this threat is more severe
      const riskLevels = { low: 0, medium: 1, high: 2, critical: 3 }
      if (riskLevels[risk] > riskLevels[riskLevel]) {
        riskLevel = risk
      }
    }
  })

  return {
    isSafe: threats.length === 0,
    threats,
    riskLevel,
  }
}

/**
 * Comprehensive security scanning for royal client protection
 * CONTEXT7 SOURCE: /cure53/dompurify - Comprehensive threat detection patterns
 */
export interface SecurityScanResult {
  input: string
  sanitized: string
  isSecure: boolean
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  threats: {
    xss: string[]
    sql: string[]
    general: string[]
  }
  modifications: {
    lengthChanged: boolean
    contentChanged: boolean
    originalLength: number
    sanitizedLength: number
  }
  recommendations: string[]
}

export function performSecurityScan(
  input: string,
  config: SanitizationConfig = SANITIZATION_CONFIGS.STRICT_TEXT
): SecurityScanResult {
  const originalLength = input?.length || 0
  
  if (!input || typeof input !== 'string') {
    return {
      input: input || '',
      sanitized: '',
      isSecure: true,
      riskLevel: 'low',
      threats: { xss: [], sql: [], general: [] },
      modifications: { lengthChanged: false, contentChanged: false, originalLength: 0, sanitizedLength: 0 },
      recommendations: [],
    }
  }

  // Perform HTML sanitization
  const htmlResult = sanitizeHTML(input, config)
  
  // Perform XSS detection
  const xssResult = detectXSS(input)
  
  // Perform SQL injection detection
  const sqlResult = detectSQLInjection(input)

  // Determine overall risk level
  const riskLevels = { low: 0, medium: 1, high: 2, critical: 3 }
  let overallRiskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
  
  if (riskLevels[xssResult.riskLevel] > riskLevels[overallRiskLevel]) {
    overallRiskLevel = xssResult.riskLevel
  }
  if (sqlResult.threats.length > 0) {
    overallRiskLevel = sqlResult.threats.length > 2 ? 'critical' : 'high'
  }

  // Generate recommendations
  const recommendations: string[] = []
  
  if (xssResult.threats.length > 0) {
    recommendations.push('Input contains potential XSS threats - content sanitized')
  }
  if (sqlResult.threats.length > 0) {
    recommendations.push('Input contains potential SQL injection - use parameterized queries')
  }
  if (htmlResult.wasModified) {
    recommendations.push('HTML content was modified to remove unsafe elements')
  }
  if (overallRiskLevel === 'critical') {
    recommendations.push('CRITICAL: This input poses severe security risks')
  }

  return {
    input,
    sanitized: htmlResult.sanitized,
    isSecure: xssResult.isSafe && sqlResult.isSafe,
    riskLevel: overallRiskLevel,
    threats: {
      xss: xssResult.threats,
      sql: sqlResult.threats,
      general: htmlResult.threatsRemoved,
    },
    modifications: {
      lengthChanged: originalLength !== htmlResult.sanitizedLength,
      contentChanged: htmlResult.wasModified,
      originalLength,
      sanitizedLength: htmlResult.sanitizedLength,
    },
    recommendations,
  }
}

/**
 * Security middleware for API endpoints
 * CONTEXT7 SOURCE: /cure53/dompurify - Security middleware patterns
 */
export function createSecurityMiddleware(config?: {
  maxInputLength?: number
  allowedContentTypes?: string[]
  strictMode?: boolean
}) {
  const settings = {
    maxInputLength: 10000,
    allowedContentTypes: ['text/plain', 'application/json', 'application/x-www-form-urlencoded'],
    strictMode: true,
    ...config,
  }

  return function securityMiddleware(req: any, res: any, next: any) {
    try {
      // Content type validation
      const contentType = req.headers['content-type']?.split(';')[0]
      if (contentType && !settings.allowedContentTypes.includes(contentType)) {
        return res.status(415).json({
          error: 'Unsupported content type',
          code: 'UNSUPPORTED_MEDIA_TYPE'
        })
      }

      // Body size validation
      const bodyLength = JSON.stringify(req.body || {}).length
      if (bodyLength > settings.maxInputLength) {
        return res.status(413).json({
          error: 'Request body too large',
          code: 'PAYLOAD_TOO_LARGE'
        })
      }

      // Scan request body for threats
      if (req.body && typeof req.body === 'object') {
        const scanResult = sanitizeFormData(req.body)
        
        if (!scanResult.isValid && settings.strictMode) {
          return res.status(400).json({
            error: 'Request contains invalid or dangerous content',
            code: 'INVALID_INPUT',
            details: scanResult.errors,
            threats: scanResult.threats,
          })
        }

        // Attach sanitized data
        req.sanitizedBody = scanResult.sanitized
        req.securityThreats = scanResult.threats
      }

      next()
    } catch (error) {
      console.error('Security middleware error:', error)
      return res.status(500).json({
        error: 'Security validation failed',
        code: 'SECURITY_ERROR'
      })
    }
  }
}

/**
 * Royal client input validation for premium service standards
 */
export const ROYAL_CLIENT_VALIDATION = {
  // Extra strict validation for royal testimonials
  testimonial: (input: string) => performSecurityScan(input, SANITIZATION_CONFIGS.BASIC_HTML),
  
  // Contact information with premium standards
  contactInfo: (input: string) => performSecurityScan(input, SANITIZATION_CONFIGS.FORM_INPUT),
  
  // Educational content with rich formatting
  educationalContent: (input: string) => performSecurityScan(input, SANITIZATION_CONFIGS.RICH_CONTENT),
} as const