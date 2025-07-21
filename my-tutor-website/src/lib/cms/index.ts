// CMS DATA SOURCE: Main CMS export file for My Private Tutor Online
// MANDATORY: All imports should use this centralised CMS - CLAUDE.md rule 22

// Export all content management functions
export * from './cms-content'
export * from './cms-images'

// Re-export main CMS objects for convenience
export { default as CMS } from './cms-content'
export { default as Images } from './cms-images'

// CMS validation and setup utilities
export const initializeCMS = () => {
  // Validate content structure on app initialization
  const { validateContentStructure } = require('./cms-content')
  const isValid = validateContentStructure()
  
  if (!isValid) {
    console.error('CMS content validation failed - check landing-page.json structure')
  } else {
    console.log('✅ CMS content validation passed')
  }
  
  return isValid
}

// Export version for cache busting
export const CMS_VERSION = '1.0.0'