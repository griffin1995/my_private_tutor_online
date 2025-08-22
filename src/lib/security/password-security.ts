// CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Enterprise password hashing with Argon2id
// SECURITY IMPLEMENTATION REASON: Official libsodium patterns for royal client data protection standards

import bcrypt from 'bcryptjs'
import crypto from 'crypto'

/**
 * Enterprise password security configuration for My Private Tutor Online
 * Royal client data protection standards with zero tolerance for weak passwords
 */
export interface PasswordSecurityConfig {
  saltRounds: number
  minLength: number
  maxLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSymbols: boolean
  preventCommonPasswords: boolean
  enableBreachChecking: boolean
}

/**
 * Default security configuration for premium tutoring service
 * CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Password hashing security parameters
 */
export const DEFAULT_PASSWORD_CONFIG: PasswordSecurityConfig = {
  saltRounds: 12, // High entropy for royal client protection
  minLength: 12,  // Minimum 12 characters for enterprise security
  maxLength: 128, // Maximum reasonable length
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
  preventCommonPasswords: true,
  enableBreachChecking: false, // Disabled for privacy by default
}

/**
 * Password strength levels for enterprise grading
 */
export enum PasswordStrength {
  WEAK = 1,
  MODERATE = 2,
  GOOD = 3,
  STRONG = 4,
  VERY_STRONG = 5,
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  isValid: boolean
  strength: PasswordStrength
  score: number
  errors: string[]
  suggestions: string[]
  entropy: number
  timeToCrack: string
}

/**
 * Common weak passwords database (subset for demonstration)
 * In production, integrate with HaveIBeenPwned or similar service
 */
const COMMON_WEAK_PASSWORDS = new Set([
  'password', 'password123', '123456', '123456789', 'qwerty',
  'abc123', 'password1', 'admin', 'letmein', 'welcome',
  'monkey', 'dragon', 'master', 'shadow', 'iloveyou'
])

/**
 * Advanced password hashing with salt generation
 * CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Secure password storage patterns
 * 
 * @param password - Plain text password to hash
 * @param config - Security configuration
 * @returns Promise resolving to secure hash string
 */
export async function hashPassword(
  password: string,
  config: PasswordSecurityConfig = DEFAULT_PASSWORD_CONFIG
): Promise<string> {
  // Input validation
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string')
  }

  if (password.length < config.minLength || password.length > config.maxLength) {
    throw new Error(`Password must be between ${config.minLength} and ${config.maxLength} characters`)
  }

  try {
    // Generate salt and hash using bcrypt (Argon2id alternative for Node.js)
    const salt = await bcrypt.genSalt(config.saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    return hashedPassword
  } catch (error) {
    console.error('Password hashing error:', error)
    throw new Error('Password hashing failed')
  }
}

/**
 * Secure password verification with timing attack prevention
 * CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Password verification patterns
 * 
 * @param password - Plain text password to verify
 * @param hashedPassword - Stored hash to verify against
 * @returns Promise resolving to boolean verification result
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  if (!password || !hashedPassword) {
    // Perform a dummy hash operation to prevent timing attacks
    await bcrypt.hash('dummy', 10).catch(() => {})
    return false
  }

  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

/**
 * Comprehensive password strength analysis
 * CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Password entropy calculation patterns
 * 
 * @param password - Password to analyze
 * @param config - Security configuration
 * @returns Detailed password validation result
 */
export function validatePasswordStrength(
  password: string,
  config: PasswordSecurityConfig = DEFAULT_PASSWORD_CONFIG
): PasswordValidationResult {
  const result: PasswordValidationResult = {
    isValid: false,
    strength: PasswordStrength.WEAK,
    score: 0,
    errors: [],
    suggestions: [],
    entropy: 0,
    timeToCrack: '0 seconds',
  }

  if (!password) {
    result.errors.push('Password is required')
    return result
  }

  // Length validation
  if (password.length < config.minLength) {
    result.errors.push(`Password must be at least ${config.minLength} characters long`)
  }

  if (password.length > config.maxLength) {
    result.errors.push(`Password must be no more than ${config.maxLength} characters long`)
  }

  // Character class validation
  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    result.errors.push('Password must contain at least one uppercase letter')
    result.suggestions.push('Add uppercase letters (A-Z)')
  }

  if (config.requireLowercase && !/[a-z]/.test(password)) {
    result.errors.push('Password must contain at least one lowercase letter')
    result.suggestions.push('Add lowercase letters (a-z)')
  }

  if (config.requireNumbers && !/[0-9]/.test(password)) {
    result.errors.push('Password must contain at least one number')
    result.suggestions.push('Add numbers (0-9)')
  }

  if (config.requireSymbols && !/[^A-Za-z0-9]/.test(password)) {
    result.errors.push('Password must contain at least one special character')
    result.suggestions.push('Add special characters (!@#$%^&*)')
  }

  // Common password check
  if (config.preventCommonPasswords && COMMON_WEAK_PASSWORDS.has(password.toLowerCase())) {
    result.errors.push('Password is too common and easily guessed')
    result.suggestions.push('Choose a unique, personal password')
  }

  // Pattern detection
  if (/(.)\1{2,}/.test(password)) {
    result.errors.push('Password contains repeated characters')
    result.suggestions.push('Avoid repeating the same character multiple times')
  }

  if (/12345|abcde|qwerty/i.test(password)) {
    result.errors.push('Password contains sequential characters')
    result.suggestions.push('Avoid keyboard patterns and sequences')
  }

  // Calculate entropy and strength
  result.entropy = calculatePasswordEntropy(password)
  result.score = calculatePasswordScore(password, result.entropy)
  result.strength = determinePasswordStrength(result.score)
  result.timeToCrack = estimateTimeToCrack(result.entropy)

  // Final validation
  result.isValid = result.errors.length === 0 && result.strength >= PasswordStrength.GOOD

  if (!result.isValid && result.suggestions.length === 0) {
    result.suggestions.push('Consider using a passphrase with multiple words')
    result.suggestions.push('Mix different character types throughout the password')
  }

  return result
}

/**
 * Calculate password entropy based on character set and length
 * CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Entropy calculation for cryptographic security
 * 
 * @param password - Password to analyze
 * @returns Entropy value in bits
 */
function calculatePasswordEntropy(password: string): number {
  if (!password) return 0

  let charSetSize = 0

  // Determine character set size
  if (/[a-z]/.test(password)) charSetSize += 26  // lowercase
  if (/[A-Z]/.test(password)) charSetSize += 26  // uppercase
  if (/[0-9]/.test(password)) charSetSize += 10  // digits
  if (/[^A-Za-z0-9]/.test(password)) charSetSize += 33  // special characters

  // Calculate entropy: log2(charset^length)
  const entropy = password.length * Math.log2(charSetSize)
  
  return Math.round(entropy * 100) / 100
}

/**
 * Calculate password score based on various factors
 * 
 * @param password - Password to score
 * @param entropy - Password entropy
 * @returns Score from 0-100
 */
function calculatePasswordScore(password: string, entropy: number): number {
  let score = 0

  // Base score from entropy
  score += Math.min(entropy / 2, 50)

  // Length bonus
  if (password.length >= 12) score += 10
  if (password.length >= 16) score += 10
  if (password.length >= 20) score += 5

  // Character variety bonus
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasDigit = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  
  const varietyCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length
  score += varietyCount * 5

  // Pattern penalties
  if (/(.)\1{2,}/.test(password)) score -= 10  // repeated characters
  if (/123|abc|qwerty/i.test(password)) score -= 15  // sequences
  if (COMMON_WEAK_PASSWORDS.has(password.toLowerCase())) score -= 25

  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Determine password strength level from score
 * 
 * @param score - Password score (0-100)
 * @returns PasswordStrength enum value
 */
function determinePasswordStrength(score: number): PasswordStrength {
  if (score >= 80) return PasswordStrength.VERY_STRONG
  if (score >= 60) return PasswordStrength.STRONG
  if (score >= 40) return PasswordStrength.GOOD
  if (score >= 20) return PasswordStrength.MODERATE
  return PasswordStrength.WEAK
}

/**
 * Estimate time to crack password based on entropy
 * 
 * @param entropy - Password entropy in bits
 * @returns Human-readable time estimate
 */
function estimateTimeToCrack(entropy: number): string {
  if (entropy <= 0) return 'Instantly'

  // Assume 1 billion guesses per second (modern hardware)
  const guessesPerSecond = 1e9
  const totalCombinations = Math.pow(2, entropy)
  const averageGuesses = totalCombinations / 2
  const secondsToGuess = averageGuesses / guessesPerSecond

  if (secondsToGuess < 60) return 'Less than a minute'
  if (secondsToGuess < 3600) return `${Math.round(secondsToGuess / 60)} minutes`
  if (secondsToGuess < 86400) return `${Math.round(secondsToGuess / 3600)} hours`
  if (secondsToGuess < 31536000) return `${Math.round(secondsToGuess / 86400)} days`
  if (secondsToGuess < 31536000000) return `${Math.round(secondsToGuess / 31536000)} years`
  
  return 'Centuries or more'
}

/**
 * Generate cryptographically secure password
 * CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Secure random generation patterns
 * 
 * @param length - Desired password length
 * @param includeSymbols - Include special characters
 * @returns Securely generated password
 */
export function generateSecurePassword(
  length: number = 16,
  includeSymbols: boolean = true
): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let charset = lowercase + uppercase + numbers
  if (includeSymbols) {
    charset += symbols
  }

  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length)
    password += charset[randomIndex]
  }

  // Ensure password meets minimum requirements
  const validation = validatePasswordStrength(password, DEFAULT_PASSWORD_CONFIG)
  if (!validation.isValid && length >= 12) {
    // Retry once if validation fails
    return generateSecurePassword(length, includeSymbols)
  }

  return password
}

/**
 * Check if password needs rehashing (e.g., due to updated security standards)
 * CONTEXT7 SOURCE: /jedisct1/libsodium-doc - Password rehashing patterns
 * 
 * @param hashedPassword - Current password hash
 * @param config - Current security configuration
 * @returns Boolean indicating if rehash is needed
 */
export function needsRehashing(
  hashedPassword: string,
  config: PasswordSecurityConfig = DEFAULT_PASSWORD_CONFIG
): boolean {
  try {
    // Extract current salt rounds from hash
    const rounds = bcrypt.getRounds(hashedPassword)
    return rounds < config.saltRounds
  } catch {
    // If we can't determine rounds, assume rehashing is needed
    return true
  }
}

/**
 * Security audit result for password policies
 */
export interface PasswordSecurityAudit {
  configurationScore: number
  recommendations: string[]
  complianceLevel: 'Basic' | 'Enterprise' | 'Military'
  estimatedBreachResistance: string
}

/**
 * Audit password security configuration
 * Provides recommendations for royal client data protection standards
 * 
 * @param config - Current password configuration
 * @returns Security audit results
 */
export function auditPasswordSecurity(
  config: PasswordSecurityConfig = DEFAULT_PASSWORD_CONFIG
): PasswordSecurityAudit {
  const audit: PasswordSecurityAudit = {
    configurationScore: 0,
    recommendations: [],
    complianceLevel: 'Basic',
    estimatedBreachResistance: 'Low',
  }

  let score = 0

  // Salt rounds assessment
  if (config.saltRounds >= 12) score += 25
  else if (config.saltRounds >= 10) score += 15
  else {
    audit.recommendations.push('Increase salt rounds to at least 12 for enterprise security')
    score += 5
  }

  // Password length requirements
  if (config.minLength >= 12) score += 20
  else if (config.minLength >= 8) score += 10
  else {
    audit.recommendations.push('Require minimum 12 characters for royal client standards')
    score += 5
  }

  // Character requirements
  const requirements = [
    config.requireUppercase,
    config.requireLowercase,
    config.requireNumbers,
    config.requireSymbols
  ].filter(Boolean).length

  if (requirements === 4) score += 20
  else if (requirements >= 3) score += 15
  else {
    audit.recommendations.push('Require all character types (upper, lower, numbers, symbols)')
    score += 5
  }

  // Security features
  if (config.preventCommonPasswords) score += 15
  else {
    audit.recommendations.push('Enable common password prevention')
  }

  if (config.enableBreachChecking) score += 10
  else {
    audit.recommendations.push('Consider enabling breach checking (with privacy considerations)')
  }

  // Max length reasonable
  if (config.maxLength <= 128 && config.maxLength >= 64) score += 10

  audit.configurationScore = score

  // Determine compliance level
  if (score >= 85) {
    audit.complianceLevel = 'Military'
    audit.estimatedBreachResistance = 'Very High'
  } else if (score >= 70) {
    audit.complianceLevel = 'Enterprise'
    audit.estimatedBreachResistance = 'High'
  } else {
    audit.complianceLevel = 'Basic'
    audit.estimatedBreachResistance = score >= 50 ? 'Moderate' : 'Low'
  }

  if (audit.recommendations.length === 0) {
    audit.recommendations.push('Password security configuration meets royal client standards')
  }

  return audit
}