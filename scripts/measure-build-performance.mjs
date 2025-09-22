#!/usr/bin/env node

// CONTEXT7 SOURCE: /microsoft/typescript - Performance measurement script
// OPTIMIZATION REASON: Measure build time improvements for CI/CD optimization

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const BASELINE_TARGET = 11; // Target build time in seconds
const CURRENT_BASELINE = 46; // Current baseline in seconds

console.log('🚀 Build Performance Measurement Tool');
console.log('=====================================\n');

// Clean build cache
console.log('🧹 Cleaning build cache...');
execSync('rm -rf .next .tsbuildinfo node_modules/.cache', { stdio: 'inherit' });

// Run build with timing
console.log('\n⚡ Starting optimized production build...\n');
const startTime = Date.now();

try {
  // Run build with production TypeScript config
  execSync('NODE_ENV=production npm run build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      NEXT_TELEMETRY_DISABLED: '1',
    }
  });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

const endTime = Date.now();
const buildTime = (endTime - startTime) / 1000;

// Calculate improvements
const improvementFromBaseline = ((CURRENT_BASELINE - buildTime) / CURRENT_BASELINE * 100).toFixed(1);
const targetDelta = buildTime - BASELINE_TARGET;

// Generate report
console.log('\n📊 Build Performance Report');
console.log('===========================');
console.log(`✅ Build Time: ${buildTime.toFixed(1)}s`);
console.log(`📈 Improvement: ${improvementFromBaseline}% from ${CURRENT_BASELINE}s baseline`);
console.log(`🎯 Target: ${BASELINE_TARGET}s (${targetDelta > 0 ? '+' : ''}${targetDelta.toFixed(1)}s)`);

// Performance rating
let rating = '';
if (buildTime <= BASELINE_TARGET) {
  rating = '🏆 EXCELLENT - Target achieved!';
} else if (buildTime <= 15) {
  rating = '✨ GREAT - Within safety buffer';
} else if (buildTime <= 25) {
  rating = '👍 GOOD - Significant improvement';
} else if (buildTime <= 35) {
  rating = '⚡ OK - Moderate improvement';
} else {
  rating = '⚠️ NEEDS WORK - Below expectations';
}

console.log(`\n${rating}`);

// Business impact calculation
const deploymentsPerDay = Math.floor((8 * 3600) / buildTime); // 8 hour workday
const ciCostReduction = ((CURRENT_BASELINE - buildTime) / CURRENT_BASELINE * 100).toFixed(0);

console.log('\n💼 Business Impact');
console.log('==================');
console.log(`📦 Deployments/day capability: ${deploymentsPerDay}`);
console.log(`💰 CI/CD cost reduction: ${ciCostReduction}%`);
console.log(`⏱️ Developer time saved: ${((CURRENT_BASELINE - buildTime) * 10).toFixed(0)} seconds per day`);

// Save results to file
const results = {
  timestamp: new Date().toISOString(),
  buildTime: buildTime,
  improvementPercent: parseFloat(improvementFromBaseline),
  targetDelta: targetDelta,
  deploymentsPerDay: deploymentsPerDay,
  ciCostReduction: parseInt(ciCostReduction),
  rating: rating
};

fs.writeFileSync(
  path.join(process.cwd(), 'build-performance-results.json'),
  JSON.stringify(results, null, 2)
);

console.log('\n📁 Results saved to build-performance-results.json');

// Exit with appropriate code
process.exit(buildTime <= 15 ? 0 : 1);