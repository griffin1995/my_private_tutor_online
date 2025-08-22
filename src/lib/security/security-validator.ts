// CONTEXT7 SOURCE: /vercel/next.js - Enterprise security validation and testing framework
// SECURITY IMPLEMENTATION REASON: Comprehensive validation system for royal client protection standards

import { getRedisSessionStore } from './redis-session-store'
import { verifyPassword, validatePasswordStrength, DEFAULT_PASSWORD_CONFIG } from './password-security'
import { verifyCSRFToken, generateCSRFToken } from './csrf'
import { generateSecurityHeaders } from './security-headers'

/**
 * Security validation framework for My Private Tutor Online
 * Comprehensive testing suite for enterprise-grade security implementations
 * Royal client data protection compliance verification
 */

export interface SecurityValidationResult {
  component: string
  test: string
  passed: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  details?: Record<string, any>
  timestamp: number
}

export interface SecurityAuditReport {
  overall: 'pass' | 'warning' | 'fail'
  score: number
  maxScore: number
  results: SecurityValidationResult[]
  recommendations: string[]
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
  executionTime: number
}

export class SecurityValidator {
  private results: SecurityValidationResult[] = []
  private startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  /**
   * Add validation result
   */
  private addResult(
    component: string,
    test: string,
    passed: boolean,
    severity: SecurityValidationResult['severity'],
    message: string,
    details?: Record<string, any>
  ): void {
    this.results.push({
      component,
      test,
      passed,
      severity,
      message,
      details,
      timestamp: Date.now()
    })
  }

  /**
   * Test password hashing implementation
   * CONTEXT7 SOURCE: /dcodeio/bcrypt.js - Password security validation patterns
   */
  async validatePasswordSecurity(): Promise<void> {
    try {
      // Test 1: Password hashing functionality
      const testPassword = 'TestPassword123!'
      const hash = await require('./password-security').hashPassword(testPassword, DEFAULT_PASSWORD_CONFIG)
      
      if (hash && hash.length === 60 && hash.startsWith('$2')) {
        this.addResult(
          'password-security',
          'hash-generation',
          true,
          'high',
          'Password hashing generates valid bcrypt hash'
        )
      } else {
        this.addResult(
          'password-security',
          'hash-generation',
          false,
          'critical',
          'Password hashing failed to generate valid bcrypt hash',
          { hash: hash ? 'present' : 'null', length: hash?.length }
        )
      }

      // Test 2: Password verification
      const isValid = await verifyPassword(testPassword, hash)
      this.addResult(
        'password-security',
        'password-verification',
        isValid,
        'critical',
        isValid ? 'Password verification works correctly' : 'Password verification failed'
      )

      // Test 3: Invalid password rejection
      const isInvalid = await verifyPassword('wrongpassword', hash)
      this.addResult(
        'password-security',
        'invalid-password-rejection',
        !isInvalid,
        'critical',
        !isInvalid ? 'Invalid passwords correctly rejected' : 'Invalid password accepted - security breach'
      )

      // Test 4: Password strength validation
      const weakPassword = '123456'
      const weakValidation = validatePasswordStrength(weakPassword, DEFAULT_PASSWORD_CONFIG)
      this.addResult(
        'password-security',
        'weak-password-detection',
        !weakValidation.isValid,
        'medium',
        !weakValidation.isValid ? 'Weak passwords correctly rejected' : 'Weak password accepted',
        { strength: weakValidation.strength, errors: weakValidation.errors }
      )

      // Test 5: Strong password acceptance
      const strongPassword = 'StrongP@ssw0rd123!'
      const strongValidation = validatePasswordStrength(strongPassword, DEFAULT_PASSWORD_CONFIG)
      this.addResult(
        'password-security',
        'strong-password-acceptance',
        strongValidation.isValid,
        'medium',
        strongValidation.isValid ? 'Strong passwords correctly accepted' : 'Strong password rejected',
        { strength: strongValidation.strength, score: strongValidation.score }
      )

    } catch (error) {
      this.addResult(
        'password-security',
        'password-system',
        false,
        'critical',
        'Password security system error',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      )
    }
  }

  /**
   * Test Redis session store implementation
   * CONTEXT7 SOURCE: /redis/node-redis - Session storage validation patterns
   */
  async validateRedisSessionStorage(): Promise<void> {
    try {
      const redisStore = getRedisSessionStore()
      const testKey = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const testData = { count: 5, lastAttempt: Date.now(), windowStart: Date.now() }

      // Test 1: Redis connection health
      const health = await redisStore.getHealthStatus()
      this.addResult(
        'redis-session',
        'connection-health',
        health.connected,
        'critical',
        health.connected ? 'Redis connection healthy' : 'Redis connection failed',
        { health }
      )

      if (!health.connected) {
        this.addResult(
          'redis-session',
          'redis-unavailable',
          false,
          'critical',
          'Redis unavailable - cannot perform session storage tests'
        )
        return
      }

      // Test 2: Rate limit storage and retrieval
      await redisStore.setRateLimit(testKey, testData, 60)
      const retrievedData = await redisStore.getRateLimit(testKey)
      
      const dataMatches = retrievedData && 
                         retrievedData.count === testData.count &&
                         retrievedData.lastAttempt === testData.lastAttempt
      
      this.addResult(
        'redis-session',
        'rate-limit-storage',
        dataMatches,
        'high',
        dataMatches ? 'Rate limit data storage/retrieval works' : 'Rate limit data storage/retrieval failed',
        { stored: testData, retrieved: retrievedData }
      )

      // Test 3: Session data storage and retrieval
      const sessionId = `session_${testKey}`
      const sessionData = { userId: 'admin', role: 'admin', metadata: { test: true } }
      
      await redisStore.setSession(sessionId, sessionData as any, 60)
      const retrievedSession = await redisStore.getSession(sessionId)
      
      const sessionMatches = retrievedSession &&
                            (retrievedSession as any).userId === sessionData.userId &&
                            (retrievedSession as any).role === sessionData.role

      this.addResult(
        'redis-session',
        'session-storage',
        sessionMatches,
        'high',
        sessionMatches ? 'Session data storage/retrieval works' : 'Session data storage/retrieval failed',
        { stored: sessionData, retrieved: retrievedSession }
      )

      // Test 4: Data expiration (TTL)
      const shortKey = `ttl_${testKey}`
      await redisStore.setRateLimit(shortKey, testData, 1) // 1 second TTL
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      const expiredData = await redisStore.getRateLimit(shortKey)
      this.addResult(
        'redis-session',
        'ttl-expiration',
        !expiredData,
        'medium',
        !expiredData ? 'Data correctly expires based on TTL' : 'Data expiration not working',
        { expired: !expiredData }
      )

      // Cleanup test data
      await redisStore.clearRateLimit(testKey)
      await redisStore.deleteSession(sessionId)

    } catch (error) {
      this.addResult(
        'redis-session',
        'redis-system',
        false,
        'critical',
        'Redis session system error',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      )
    }
  }

  /**
   * Test CSRF protection implementation
   * CONTEXT7 SOURCE: /vercel/next.js - CSRF validation patterns
   */
  async validateCSRFProtection(): Promise<void> {
    try {
      // Test 1: CSRF token generation
      const token = await generateCSRFToken()
      const tokenValid = token && token.length === 64 // 32 bytes hex = 64 characters
      
      this.addResult(
        'csrf-protection',
        'token-generation',
        tokenValid,
        'high',
        tokenValid ? 'CSRF token generation works' : 'CSRF token generation failed',
        { tokenLength: token?.length, hasToken: !!token }
      )

      // Test 2: Token verification
      if (token) {
        const isValid = await verifyCSRFToken(token)
        this.addResult(
          'csrf-protection',
          'token-verification',
          isValid,
          'high',
          isValid ? 'CSRF token verification works' : 'CSRF token verification failed'
        )

        // Test 3: Invalid token rejection
        const invalidToken = 'invalid_token_12345'
        const isInvalid = await verifyCSRFToken(invalidToken)
        this.addResult(
          'csrf-protection',
          'invalid-token-rejection',
          !isInvalid,
          'high',
          !isInvalid ? 'Invalid CSRF tokens correctly rejected' : 'Invalid CSRF token accepted - security breach'
        )

        // Test 4: Null token rejection
        const nullTokenResult = await verifyCSRFToken(null)
        this.addResult(
          'csrf-protection',
          'null-token-rejection',
          !nullTokenResult,
          'high',
          !nullTokenResult ? 'Null CSRF tokens correctly rejected' : 'Null CSRF token accepted'
        )
      }

    } catch (error) {
      this.addResult(
        'csrf-protection',
        'csrf-system',
        false,
        'critical',
        'CSRF protection system error',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      )
    }
  }

  /**
   * Test security headers implementation
   * CONTEXT7 SOURCE: /vercel/next.js - Security headers validation
   */
  async validateSecurityHeaders(): Promise<void> {
    try {
      const headers = generateSecurityHeaders()
      
      // Test 1: Critical security headers presence
      const criticalHeaders = [
        'Content-Security-Policy',
        'Strict-Transport-Security',
        'X-Frame-Options',
        'X-Content-Type-Options'
      ]
      
      const missingCritical = criticalHeaders.filter(header => !headers[header])
      
      this.addResult(
        'security-headers',
        'critical-headers-present',
        missingCritical.length === 0,
        'critical',
        missingCritical.length === 0 
          ? 'All critical security headers present' 
          : `Missing critical headers: ${missingCritical.join(', ')}`,
        { missingHeaders: missingCritical, totalHeaders: Object.keys(headers).length }
      )

      // Test 2: CSP configuration
      const csp = headers['Content-Security-Policy']
      const hasStrictCSP = csp && 
                          csp.includes("default-src 'self'") &&
                          csp.includes("object-src 'none'") &&
                          csp.includes("frame-ancestors 'none'")
      
      this.addResult(
        'security-headers',
        'csp-configuration',
        hasStrictCSP,
        'high',
        hasStrictCSP ? 'CSP properly configured' : 'CSP missing critical directives'
      )

      // Test 3: HSTS configuration
      const hsts = headers['Strict-Transport-Security']
      const hasProperHSTS = hsts && 
                           hsts.includes('max-age=') &&
                           hsts.includes('includeSubDomains')
      
      this.addResult(
        'security-headers',
        'hsts-configuration',
        hasProperHSTS,
        'high',
        hasProperHSTS ? 'HSTS properly configured' : 'HSTS missing or misconfigured'
      )

      // Test 4: Frame options protection
      const frameOptions = headers['X-Frame-Options']
      const hasFrameProtection = frameOptions === 'DENY' || frameOptions === 'SAMEORIGIN'
      
      this.addResult(
        'security-headers',
        'frame-protection',
        hasFrameProtection,
        'medium',
        hasFrameProtection ? 'Frame options properly configured' : 'Frame options missing or weak'
      )

      // Test 5: Content type protection
      const contentType = headers['X-Content-Type-Options']
      const hasContentTypeProtection = contentType === 'nosniff'
      
      this.addResult(
        'security-headers',
        'content-type-protection',
        hasContentTypeProtection,
        'medium',
        hasContentTypeProtection ? 'Content-Type protection enabled' : 'Content-Type protection missing'
      )

    } catch (error) {
      this.addResult(
        'security-headers',
        'headers-system',
        false,
        'critical',
        'Security headers system error',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      )
    }
  }

  /**
   * Test environment variable security
   */
  async validateEnvironmentSecurity(): Promise<void> {
    // Test 1: Required security environment variables
    const requiredEnvVars = [
      'SESSION_SECRET',
      'ADMIN_EMAIL',
      'ADMIN_PASSWORD'
    ]

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])
    
    this.addResult(
      'environment',
      'required-env-vars',
      missingEnvVars.length === 0,
      'critical',
      missingEnvVars.length === 0
        ? 'All required environment variables present'
        : `Missing environment variables: ${missingEnvVars.join(', ')}`
    )

    // Test 2: Session secret strength
    const sessionSecret = process.env.SESSION_SECRET
    const hasStrongSecret = sessionSecret && sessionSecret.length >= 32
    
    this.addResult(
      'environment',
      'session-secret-strength',
      hasStrongSecret,
      'critical',
      hasStrongSecret 
        ? 'Session secret meets minimum length requirements'
        : 'Session secret too weak or missing'
    )

    // Test 3: Production environment checks
    const isProduction = process.env.NODE_ENV === 'production'
    if (isProduction) {
      const hasRedisConfig = process.env.REDIS_URL || 
                           (process.env.REDIS_HOST && process.env.REDIS_PORT)
      
      this.addResult(
        'environment',
        'production-redis-config',
        hasRedisConfig,
        'high',
        hasRedisConfig
          ? 'Redis configuration present for production'
          : 'Redis configuration missing in production'
      )
    }
  }

  /**
   * Generate comprehensive security audit report
   */
  generateReport(): SecurityAuditReport {
    const executionTime = Date.now() - this.startTime
    
    // Count issues by severity
    const criticalIssues = this.results.filter(r => !r.passed && r.severity === 'critical').length
    const highIssues = this.results.filter(r => !r.passed && r.severity === 'high').length
    const mediumIssues = this.results.filter(r => !r.passed && r.severity === 'medium').length
    const lowIssues = this.results.filter(r => !r.passed && r.severity === 'low').length
    
    // Calculate score
    const totalTests = this.results.length
    const passedTests = this.results.filter(r => r.passed).length
    const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
    
    // Determine overall status
    let overall: 'pass' | 'warning' | 'fail' = 'pass'
    if (criticalIssues > 0) {
      overall = 'fail'
    } else if (highIssues > 0 || mediumIssues > 2) {
      overall = 'warning'
    }
    
    // Generate recommendations
    const recommendations: string[] = []
    if (criticalIssues > 0) {
      recommendations.push(`Address ${criticalIssues} critical security issue(s) immediately`)
    }
    if (highIssues > 0) {
      recommendations.push(`Address ${highIssues} high-severity issue(s) before production deployment`)
    }
    if (mediumIssues > 0) {
      recommendations.push(`Consider addressing ${mediumIssues} medium-severity issue(s) for enhanced security`)
    }
    if (score < 95) {
      recommendations.push('Achieve 95%+ test pass rate for royal client security standards')
    }
    if (recommendations.length === 0) {
      recommendations.push('Security validation passed - maintain current standards')
    }

    return {
      overall,
      score,
      maxScore: 100,
      results: this.results,
      recommendations,
      criticalIssues,
      highIssues,
      mediumIssues,
      lowIssues,
      executionTime
    }
  }

  /**
   * Run complete security validation suite
   */
  async runCompleteValidation(): Promise<SecurityAuditReport> {
    console.log('🔒 Starting comprehensive security validation...')
    
    await this.validatePasswordSecurity()
    await this.validateRedisSessionStorage()
    await this.validateCSRFProtection()
    await this.validateSecurityHeaders()
    await this.validateEnvironmentSecurity()
    
    const report = this.generateReport()
    
    console.log(`\n🔒 Security Validation Complete:`)
    console.log(`Overall Status: ${report.overall.toUpperCase()}`)
    console.log(`Score: ${report.score}/${report.maxScore}`)
    console.log(`Execution Time: ${report.executionTime}ms`)
    console.log(`Issues: ${report.criticalIssues} critical, ${report.highIssues} high, ${report.mediumIssues} medium, ${report.lowIssues} low`)
    
    if (report.overall !== 'pass') {
      console.log('\n⚠️ Security Issues Found:')
      report.results
        .filter(r => !r.passed)
        .forEach(issue => {
          console.log(`- [${issue.severity.toUpperCase()}] ${issue.component}/${issue.test}: ${issue.message}`)
        })
    }
    
    return report
  }
}

/**
 * Quick security validation for CI/CD pipelines
 */
export async function quickSecurityCheck(): Promise<boolean> {
  const validator = new SecurityValidator()
  const report = await validator.runCompleteValidation()
  
  // Return true only if no critical issues
  return report.criticalIssues === 0
}

/**
 * Export singleton for convenience
 */
export const securityValidator = new SecurityValidator()