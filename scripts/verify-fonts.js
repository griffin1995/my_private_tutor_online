#!/usr/bin/env node

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Font verification script for Phase 3 typography
 * VERIFICATION REASON: Official Next.js documentation recommends verifying font optimization
 * PURPOSE: Check font loading performance and CSS variable setup
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Phase 3 Typography System Verification\n');
console.log('=' . repeat(50));

// Check font configuration file
const fontConfigPath = path.join(__dirname, '..', 'src', 'fonts', 'index.ts');
if (fs.existsSync(fontConfigPath)) {
  console.log('✅ Font configuration file exists: /src/fonts/index.ts');
} else {
  console.log('❌ Font configuration file missing!');
}

// Check build output for font files
const fontBuildPath = path.join(__dirname, '..', '.next', 'static', 'media');
if (fs.existsSync(fontBuildPath)) {
  const fontFiles = fs.readdirSync(fontBuildPath);
  const woff2Files = fontFiles.filter(f => f.endsWith('.woff2'));
  console.log(`✅ Found ${woff2Files.length} optimized font files (.woff2)`);

  // Calculate total font size
  let totalSize = 0;
  woff2Files.forEach(file => {
    const stats = fs.statSync(path.join(fontBuildPath, file));
    totalSize += stats.size;
  });
  console.log(`📦 Total font size: ${(totalSize / 1024).toFixed(2)} KB`);
} else {
  console.log('❌ No font build output found. Run npm run build first.');
}

// Check CSS output
const cssPath = path.join(__dirname, '..', '.next', 'static', 'css');
if (fs.existsSync(cssPath)) {
  const cssFiles = fs.readdirSync(cssPath);
  console.log(`✅ Found ${cssFiles.length} CSS bundle files`);

  // Check if font variables are in CSS
  let fontVarsFound = false;
  cssFiles.forEach(file => {
    const content = fs.readFileSync(path.join(cssPath, file), 'utf-8');
    if (content.includes('--font-playfair-display') ||
        content.includes('--font-source-serif-4') ||
        content.includes('--font-jetbrains-mono')) {
      fontVarsFound = true;
    }
  });

  if (fontVarsFound) {
    console.log('✅ Font CSS variables found in bundles');
  } else {
    console.log('⚠️  Font CSS variables not found in bundles');
  }
} else {
  console.log('⚠️  No CSS build output found');
}

console.log('\n' + '=' . repeat(50));
console.log('\n📊 Typography Consolidation Summary:');
console.log('  Before: 12 fonts → After: 3 strategic typefaces');
console.log('  Reduction: 75% in font count');
console.log('  Target: 60% performance improvement\n');

console.log('🎯 Font Strategy:');
console.log('  1. Playfair Display - Headings (400-700)');
console.log('  2. Source Serif 4 - Body text (400-600)');
console.log('  3. JetBrains Mono - Technical/pricing (400-500)\n');

console.log('✨ Next Steps:');
console.log('  1. Run "npm run dev" to test in development');
console.log('  2. Check font loading in browser DevTools Network tab');
console.log('  3. Verify CSS variables in browser DevTools Elements');
console.log('  4. Test component migration with new typography classes\n');