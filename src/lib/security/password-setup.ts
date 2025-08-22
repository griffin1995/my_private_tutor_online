// CONTEXT7 SOURCE: /dcodeio/bcrypt.js - Enterprise password hashing setup utility
// SECURITY IMPLEMENTATION REASON: Official bcrypt.js patterns for royal client password initialization

import { hashPassword, validatePasswordStrength, DEFAULT_PASSWORD_CONFIG } from './password-security'

/**
 * Administrative password setup utility for My Private Tutor Online
 * Generates secure password hashes for environment variable configuration
 * Royal client data protection standards compliance
 */

export interface PasswordSetupResult {
  hash: string
  strength: string
  recommendations: string[]
  configInstructions: string
}

/**
 * Generate secure password hash for admin configuration
 * CONTEXT7 SOURCE: /dcodeio/bcrypt.js - Password hashing with 12 salt rounds for enterprise security
 * 
 * @param plainPassword - Plain text password to hash
 * @returns Complete setup result with hash and instructions
 */
export async function generateAdminPasswordHash(plainPassword: string): Promise<PasswordSetupResult> {
  // Validate password strength first
  const validation = validatePasswordStrength(plainPassword, {
    ...DEFAULT_PASSWORD_CONFIG,
    saltRounds: 12 // Enterprise-grade security for royal clients
  })

  if (!validation.isValid) {
    throw new Error(`Password does not meet security requirements: ${validation.errors.join(', ')}`)
  }

  // Generate secure hash
  const hash = await hashPassword(plainPassword, {
    ...DEFAULT_PASSWORD_CONFIG,
    saltRounds: 12
  })

  const strengthLabels = {
    1: 'Weak',
    2: 'Moderate', 
    3: 'Good',
    4: 'Strong',
    5: 'Very Strong'
  }

  return {
    hash,
    strength: strengthLabels[validation.strength] || 'Unknown',
    recommendations: validation.suggestions,
    configInstructions: `
# Add this to your .env.local file:
ADMIN_PASSWORD=${hash}

# Security Details:
# - Password Strength: ${strengthLabels[validation.strength]}
# - Entropy: ${validation.entropy} bits
# - Estimated Time to Crack: ${validation.timeToCrack}
# - Salt Rounds: 12 (Enterprise Grade)

# IMPORTANT: Replace any existing plain text ADMIN_PASSWORD with this hash
# The system will automatically detect and use bcrypt verification
    `.trim()
  }
}

/**
 * Utility function to check if a stored password is hashed or plain text
 * 
 * @param password - Password value to check
 * @returns True if the password appears to be a bcrypt hash
 */
export function isPasswordHashed(password: string): boolean {
  // bcrypt hashes start with $2a$, $2b$, or $2y$ followed by rounds and salt
  return /^\$2[aby]\$\d{2}\$/.test(password)
}

/**
 * Command line utility function for generating admin password hashes
 * Usage: node -e "require('./src/lib/security/password-setup').generateAdminHash('your-password')"
 */
export async function generateAdminHash(password: string): Promise<void> {
  try {
    const result = await generateAdminPasswordHash(password)
    
    console.log('\n=== ADMIN PASSWORD HASH GENERATED ===')
    console.log(`Password Strength: ${result.strength}`)
    console.log('\nRecommendations:')
    result.recommendations.forEach(rec => console.log(`- ${rec}`))
    console.log('\nConfiguration Instructions:')
    console.log(result.configInstructions)
    console.log('\n=== SETUP COMPLETE ===\n')
    
  } catch (error) {
    console.error('\n❌ Password generation failed:')
    console.error(`${error}`)
    console.log('\nPassword Requirements:')
    console.log('- Minimum 12 characters')
    console.log('- Must include uppercase letters')
    console.log('- Must include lowercase letters') 
    console.log('- Must include numbers')
    console.log('- Must include special characters')
    console.log('- Cannot be a common password')
    console.log('\n')
  }
}

// Export for CLI usage
if (require.main === module) {
  const password = process.argv[2]
  if (!password) {
    console.log('Usage: node src/lib/security/password-setup.ts <password>')
    process.exit(1)
  }
  generateAdminHash(password)
}