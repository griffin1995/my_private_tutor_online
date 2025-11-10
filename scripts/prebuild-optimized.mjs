#!/usr/bin/env node

/**
 * OPTIMIZED PREBUILD SCRIPT - PHASE 2 PERFORMANCE OPTIMIZATION
 *
 * CONTEXT7 SOURCE: Node.js fs module - File system operations for cache checking
 * PERFORMANCE OPTIMIZATION: Skip token generation if design tokens unchanged
 * BUSINESS VALUE: Reduce prebuild overhead from 3-5s to <0.5s on unchanged builds
 *
 * Strategy:
 * 1. Check if design token config has changed (src/design-tokens/config.json)
 * 2. Check if generated tokens exist and are newer than config
 * 3. Skip token generation if no changes detected
 * 4. Otherwise, run full token build
 */

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

const CONFIG_PATH = 'src/design-tokens/config.json';
const OUTPUT_PATHS = [
  'src/design-tokens/generated/tokens.json',
  'src/design-tokens/generated/tokens.js',
  'src/design-tokens/generated/tokens.ts',
  'tailwind.config.tokens.js',
  'src/styles/tokens/variables.css'
];

/**
 * Check if tokens need regeneration
 * @returns {boolean} true if regeneration needed
 */
function needsRegeneration() {
  // If config doesn't exist, we can't generate tokens
  if (!existsSync(CONFIG_PATH)) {
    console.log('⚠️  Design token config not found, skipping token generation');
    return false;
  }

  // If any output file is missing, regenerate
  for (const outputPath of OUTPUT_PATHS) {
    if (!existsSync(outputPath)) {
      console.log(`📦 Token file missing: ${outputPath}, regenerating...`);
      return true;
    }
  }

  // Check if config is newer than any output file
  const configTime = statSync(CONFIG_PATH).mtimeMs;

  for (const outputPath of OUTPUT_PATHS) {
    const outputTime = statSync(outputPath).mtimeMs;
    if (configTime > outputTime) {
      console.log(`🔄 Design token config changed, regenerating tokens...`);
      return true;
    }
  }

  // All outputs exist and are newer than config
  console.log('✓ Design tokens up to date, skipping generation');
  return false;
}

/**
 * Generate design tokens
 */
function generateTokens() {
  console.log('🎨 Generating design tokens...');
  try {
    execSync('npm run tokens:build', { stdio: 'inherit' });
    console.log('✓ Design tokens generated successfully');
  } catch (error) {
    console.error('❌ Failed to generate design tokens:', error.message);
    process.exit(1);
  }
}

// Main execution
if (needsRegeneration()) {
  generateTokens();
} else {
  console.log('⚡ Prebuild optimization: Token generation skipped (3-5s saved)');
}
