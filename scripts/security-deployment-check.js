#!/usr/bin/env node

// CONTEXT7 SOURCE: /vercel/next.js - Security deployment verification script
// SECURITY IMPLEMENTATION REASON: Automated security validation for royal client protection standards

const fs = require('fs')
const path = require('path')

/**
 * Pre-deployment security verification for My Private Tutor Online
 * Ensures all security implementations are properly configured before deployment
 * Royal client data protection compliance validation
 */

class SecurityDeploymentChecker {
  constructor() {
    this.errors = []
    this.warnings = []
    this.checks = 0
    this.passed = 0
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = {
      error: '❌',
      warning: '⚠️ ',
      success: '✅',
      info: 'ℹ️ '
    }[type] || 'ℹ️'
    
    console.log(`[${timestamp}] ${prefix} ${message}`)
  }

  error(message) {
    this.errors.push(message)
    this.log(message, 'error')
  }

  warning(message) {
    this.warnings.push(message)
    this.log(message, 'warning')
  }

  success(message) {
    this.passed++
    this.log(message, 'success')
  }

  check(condition, successMessage, errorMessage, isWarning = false) {
    this.checks++
    if (condition) {
      this.success(successMessage)
      return true
    } else {
      if (isWarning) {
        this.warning(errorMessage)
      } else {
        this.error(errorMessage)
      }
      return false
    }
  }

  /**
   * Check if required security files exist
   */
  checkSecurityFiles() {
    this.log('Checking security implementation files...', 'info')
    
    const requiredFiles = [
      'src/lib/security/password-security.ts',
      'src/lib/security/redis-session-store.ts',
      'src/lib/security/csrf.ts',
      'src/lib/security/security-headers.ts',
      'src/lib/security/security-validator.ts',
      'src/app/api/admin/auth/login/route.ts',
      'src/app/api/csrf-token/route.ts',
      'src/app/api/csp-report/route.ts',
      'src/app/api/security/validation/route.ts'
    ]

    requiredFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file)
      const exists = fs.existsSync(filePath)
      
      this.check(
        exists,
        `Security file exists: ${file}`,
        `Missing required security file: ${file}`
      )
    })
  }

  /**
   * Check package.json for required security dependencies
   */
  checkSecurityDependencies() {
    this.log('Checking security dependencies...', 'info')
    
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    
    if (!fs.existsSync(packageJsonPath)) {
      this.error('package.json not found')
      return
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }

    const requiredDeps = {
      'bcryptjs': 'Password hashing library',
      'redis': 'Redis session storage',
      '@types/bcryptjs': 'TypeScript types for bcryptjs',
      '@types/redis': 'TypeScript types for Redis'
    }

    Object.entries(requiredDeps).forEach(([dep, description]) => {
      this.check(
        dependencies[dep],
        `Security dependency installed: ${dep} (${description})`,
        `Missing security dependency: ${dep} - ${description}`
      )
    })
  }

  /**
   * Check Next.js configuration for security headers
   */
  checkNextConfig() {
    this.log('Checking Next.js security configuration...', 'info')
    
    const nextConfigPath = path.join(process.cwd(), 'next.config.ts')
    
    if (!fs.existsSync(nextConfigPath)) {
      this.error('next.config.ts not found')
      return
    }

    const nextConfig = fs.readFileSync(nextConfigPath, 'utf8')

    // Check for security headers import and usage
    const hasSecurityImport = nextConfig.includes('generateSecurityHeaders') && 
                             nextConfig.includes('getSecurityConfig')
    
    this.check(
      hasSecurityImport,
      'Next.js config imports security headers',
      'Next.js config missing security headers import'
    )

    const hasHeadersConfig = nextConfig.includes('async headers()') &&
                           nextConfig.includes('generateSecurityHeaders')
    
    this.check(
      hasHeadersConfig,
      'Next.js config includes security headers configuration',
      'Next.js config missing security headers configuration'
    )

    // Check for CSP reporting configuration
    const hasCSPReporting = nextConfig.includes('csp-report')
    
    this.check(
      hasCSPReporting,
      'Next.js config includes CSP violation reporting',
      'Next.js config missing CSP violation reporting',
      true // Warning only
    )
  }

  /**
   * Check environment variable templates
   */
  checkEnvironmentConfig() {
    this.log('Checking environment configuration...', 'info')
    
    const envExamplePath = path.join(process.cwd(), '.env.example')
    
    if (!fs.existsSync(envExamplePath)) {
      this.error('.env.example file not found')
      return
    }

    const envExample = fs.readFileSync(envExamplePath, 'utf8')

    const requiredEnvVars = [
      'SESSION_SECRET',
      'ADMIN_EMAIL',
      'ADMIN_PASSWORD',
      'REDIS_URL',
      'SESSION_ENCRYPTION_KEY',
      'SECURITY_API_KEY'
    ]

    requiredEnvVars.forEach(envVar => {
      this.check(
        envExample.includes(envVar),
        `Environment variable template present: ${envVar}`,
        `Missing environment variable template: ${envVar}`
      )
    })
  }

  /**
   * Check TypeScript compilation
   */
  async checkTypeScriptCompilation() {
    this.log('Checking TypeScript compilation...', 'info')
    
    try {
      const { execSync } = require('child_process')
      
      // Run TypeScript compiler check
      execSync('npx tsc --noEmit --skipLibCheck', {
        stdio: 'pipe',
        cwd: process.cwd()
      })
      
      this.success('TypeScript compilation successful')
      
    } catch (error) {
      this.error('TypeScript compilation failed - check for type errors')
      this.log(error.stdout ? error.stdout.toString() : 'No TypeScript output', 'info')
    }
  }

  /**
   * Check for security best practices in code
   */
  checkSecurityBestPractices() {
    this.log('Checking security best practices...', 'info')
    
    const securityFiles = [
      'src/lib/security/password-security.ts',
      'src/lib/security/redis-session-store.ts',
      'src/lib/security/csrf.ts',
      'src/lib/security/security-headers.ts'
    ]

    securityFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file)
      
      if (!fs.existsSync(filePath)) return
      
      const content = fs.readFileSync(filePath, 'utf8')
      
      // Check for Context7 source citations
      const hasContext7Citations = content.includes('CONTEXT7 SOURCE:')
      this.check(
        hasContext7Citations,
        `File has Context7 source citations: ${file}`,
        `File missing Context7 source citations: ${file}`,
        true
      )
      
      // Check for security implementation reasons
      const hasSecurityReasons = content.includes('SECURITY IMPLEMENTATION REASON:') ||
                                content.includes('SECURITY ENHANCEMENT REASON:')
      this.check(
        hasSecurityReasons,
        `File has security implementation documentation: ${file}`,
        `File missing security implementation documentation: ${file}`,
        true
      )
    })
  }

  /**
   * Check for potential security vulnerabilities
   */
  checkSecurityVulnerabilities() {
    this.log('Checking for potential security vulnerabilities...', 'info')
    
    // Check login route for plain text password comparison
    const loginRoutePath = path.join(process.cwd(), 'src/app/api/admin/auth/login/route.ts')
    
    if (fs.existsSync(loginRoutePath)) {
      const loginContent = fs.readFileSync(loginRoutePath, 'utf8')
      
      // Check that password comparison uses verifyPassword (bcrypt)
      const usesSecurePasswordComparison = loginContent.includes('verifyPassword') &&
                                         !loginContent.includes('password === ADMIN_CREDENTIALS.password')
      
      this.check(
        usesSecurePasswordComparison,
        'Login route uses secure password verification',
        'Login route may be using insecure password comparison - check for bcrypt implementation'
      )
      
      // Check that rate limiting uses Redis
      const usesRedisRateLimit = loginContent.includes('getRedisSessionStore') &&
                               !loginContent.includes('new Map<string')
      
      this.check(
        usesRedisRateLimit,
        'Login route uses Redis-based rate limiting',
        'Login route may be using in-memory rate limiting'
      )
    }
  }

  /**
   * Generate security deployment report
   */
  generateReport() {
    const totalChecks = this.checks
    const passedChecks = this.passed
    const failedChecks = this.errors.length
    const warningChecks = this.warnings.length
    
    const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0
    const isDeploymentSafe = this.errors.length === 0
    
    this.log('\n='.repeat(60), 'info')
    this.log('SECURITY DEPLOYMENT CHECK REPORT', 'info')
    this.log('='.repeat(60), 'info')
    this.log(`Total Checks: ${totalChecks}`, 'info')
    this.log(`Passed: ${passedChecks}`, 'info')
    this.log(`Failed: ${failedChecks}`, 'info')
    this.log(`Warnings: ${warningChecks}`, 'info')
    this.log(`Security Score: ${score}%`, 'info')
    this.log(`Deployment Safe: ${isDeploymentSafe ? 'YES' : 'NO'}`, isDeploymentSafe ? 'success' : 'error')
    this.log('='.repeat(60), 'info')
    
    if (this.errors.length > 0) {
      this.log('\nCRITICAL ISSUES (must fix before deployment):', 'error')
      this.errors.forEach((error, index) => {
        this.log(`${index + 1}. ${error}`, 'error')
      })
    }
    
    if (this.warnings.length > 0) {
      this.log('\nWARNINGS (recommended to fix):', 'warning')
      this.warnings.forEach((warning, index) => {
        this.log(`${index + 1}. ${warning}`, 'warning')
      })
    }
    
    if (isDeploymentSafe) {
      this.log('\n✅ DEPLOYMENT APPROVED - All critical security checks passed', 'success')
    } else {
      this.log('\n❌ DEPLOYMENT BLOCKED - Critical security issues must be resolved', 'error')
    }
    
    return {
      safe: isDeploymentSafe,
      score,
      totalChecks,
      passed: passedChecks,
      failed: failedChecks,
      warnings: warningChecks,
      errors: this.errors,
      warningMessages: this.warnings
    }
  }

  /**
   * Run all security checks
   */
  async runAllChecks() {
    this.log('Starting security deployment verification...', 'info')
    this.log(`Working directory: ${process.cwd()}`, 'info')
    
    this.checkSecurityFiles()
    this.checkSecurityDependencies()
    this.checkNextConfig()
    this.checkEnvironmentConfig()
    this.checkSecurityBestPractices()
    this.checkSecurityVulnerabilities()
    
    // TypeScript check (async)
    await this.checkTypeScriptCompilation()
    
    return this.generateReport()
  }
}

// Main execution
async function main() {
  const checker = new SecurityDeploymentChecker()
  const report = await checker.runAllChecks()
  
  // Exit with appropriate code for CI/CD
  process.exit(report.safe ? 0 : 1)
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Security deployment check failed:', error)
    process.exit(1)
  })
}

module.exports = { SecurityDeploymentChecker }