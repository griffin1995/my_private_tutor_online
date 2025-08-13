#!/usr/bin/env node

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Automated fix for React object rendering errors
 * 
 * Fix Testimonial Rendering Script
 * ================================
 * 
 * This script identifies and fixes the common causes of:
 * "Objects are not valid as a React child (found: object with keys {quote, author, role})"
 * 
 * Common Issues Fixed:
 * 1. Direct object rendering: {testimonial} → {testimonial.quote}
 * 2. Missing return statements in map functions
 * 3. Components returning objects instead of JSX
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

console.log('🔧 TESTIMONIAL RENDERING FIX SCRIPT')
console.log('=====================================')

const TESTIMONIAL_PATTERNS = {
  // Pattern 1: Direct object rendering
  directObjectRendering: {
    pattern: /\{testimonial\}(?![.\[])/g,
    replacement: '{testimonial.quote}',
    description: 'Direct testimonial object rendering'
  },
  
  // Pattern 2: Missing return in arrow function
  missingReturn: {
    pattern: /\.map\s*\(\s*\([^)]*testimonial[^)]*\)\s*=>\s*\{[^}]*testimonial\s*(?!\.)[^}]*\}/g,
    replacement: null, // Will be handled specially
    description: 'Missing return statement in testimonial map'
  },

  // Pattern 3: Component returning object
  componentReturningObject: {
    pattern: /const\s+(\w*[Tt]estimonial\w*)\s*=\s*[^{]*=>\s*\{[^}]*testimonial\s*(?!\.)[^}]*\}/g,
    replacement: null, // Will be handled specially
    description: 'Component returning testimonial object'
  }
}

function findTestimonialFiles() {
  const patterns = [
    'src/**/*.tsx',
    'src/**/*.ts',
    'src/**/*.jsx',
    'src/**/*.js'
  ]
  
  let files = []
  patterns.forEach(pattern => {
    files = files.concat(glob.sync(pattern, { ignore: 'node_modules/**' }))
  })
  
  // Filter for files that likely contain testimonial-related code
  return files.filter(file => {
    const content = fs.readFileSync(file, 'utf8')
    return content.includes('testimonial') && 
           (content.includes('.map') || content.includes('quote') || content.includes('author'))
  })
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const issues = []
  
  // Check for direct object rendering
  const directObjectMatches = content.match(TESTIMONIAL_PATTERNS.directObjectRendering.pattern)
  if (directObjectMatches) {
    issues.push({
      type: 'directObjectRendering',
      count: directObjectMatches.length,
      description: 'Direct testimonial object rendering detected'
    })
  }
  
  // Check for missing return statements
  if (content.match(/\.map\s*\([^)]*testimonial[^)]*\)\s*=>\s*\{[^}]*[^return][^}]*testimonial\s*(?!\.)/)) {
    issues.push({
      type: 'missingReturn',
      description: 'Potential missing return statement in map function'
    })
  }
  
  // Check for component returning object
  if (content.match(/=>\s*\{[^}]*testimonial\s*(?![.\[])[^}]*\}(?!\))/)) {
    issues.push({
      type: 'componentReturningObject', 
      description: 'Component may be returning testimonial object instead of JSX'
    })
  }
  
  return issues
}

function generateFix(filePath, issues) {
  let content = fs.readFileSync(filePath, 'utf8')
  let fixed = false
  
  issues.forEach(issue => {
    switch (issue.type) {
      case 'directObjectRendering':
        const oldContent = content
        content = content.replace(
          TESTIMONIAL_PATTERNS.directObjectRendering.pattern,
          '{testimonial.quote}'
        )
        if (content !== oldContent) {
          console.log(`  ✅ Fixed direct object rendering in ${filePath}`)
          fixed = true
        }
        break
        
      case 'missingReturn':
        console.log(`  ⚠️  Manual fix required for missing return statement in ${filePath}`)
        console.log(`     Look for map functions that don't return JSX`)
        break
        
      case 'componentReturningObject':
        console.log(`  ⚠️  Manual fix required for component returning object in ${filePath}`)
        console.log(`     Look for components that return testimonial object instead of JSX`)
        break
    }
  })
  
  return { content, fixed }
}

function main() {
  console.log('🔍 Scanning for testimonial files...')
  const testimonialFiles = findTestimonialFiles()
  console.log(`Found ${testimonialFiles.length} files with testimonial-related code`)
  
  let totalIssues = 0
  let totalFixed = 0
  
  testimonialFiles.forEach(file => {
    const issues = analyzeFile(file)
    if (issues.length > 0) {
      console.log(`\n📄 ${file}:`)
      totalIssues += issues.length
      
      issues.forEach(issue => {
        console.log(`  - ${issue.description}`)
      })
      
      const { content, fixed } = generateFix(file, issues)
      
      if (fixed) {
        // Create backup
        fs.writeFileSync(`${file}.backup`, fs.readFileSync(file, 'utf8'))
        
        // Write fixed content
        fs.writeFileSync(file, content)
        totalFixed++
        
        console.log(`  ✅ Fixed and backed up to ${file}.backup`)
      }
    }
  })
  
  console.log(`\n📊 SUMMARY:`)
  console.log(`- Files scanned: ${testimonialFiles.length}`)
  console.log(`- Issues found: ${totalIssues}`)
  console.log(`- Files automatically fixed: ${totalFixed}`)
  
  if (totalIssues > totalFixed) {
    console.log(`\n⚠️  ${totalIssues - totalFixed} issues require manual fixing`)
    console.log(`\n🔧 MANUAL FIX GUIDE:`)
    console.log(`1. Look for map functions returning objects instead of JSX`)
    console.log(`2. Ensure all testimonial objects are destructured: {quote, author, role}`)
    console.log(`3. Add return statements to arrow functions in map calls`)
    console.log(`4. Wrap testimonial rendering in error boundaries`)
  }
  
  console.log(`\n🛡️  PREVENTION RECOMMENDATIONS:`)
  console.log(`1. Use the SafeTestimonialRenderer component`)
  console.log(`2. Add TestimonialErrorBoundary around testimonial lists`)
  console.log(`3. Use TypeScript interfaces to validate testimonial data`)
  console.log(`4. Add runtime type checks for testimonial objects`)
}

if (require.main === module) {
  main()
}