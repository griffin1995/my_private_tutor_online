#!/usr/bin/env node

// CONTEXT7 SOURCE: /vercel/next.js - Development utility scripts for enhanced developer experience
// DEVELOPMENT TOOLING REASON: Official Next.js development tools and performance monitoring utilities

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Turbopack trace analysis utilities
 * Development utility for analyzing Turbopack performance traces
 */
export async function analyzeTrace() {
  console.log('🔍 Analyzing Turbopack trace...');
  
  const traceFile = '.next/trace-turbopack';
  
  try {
    await fs.access(traceFile);
    console.log('📊 Starting trace analysis server...');
    await execAsync(`npx next internal trace ${traceFile}`);
  } catch (error) {
    console.log('⚠️  No trace file found. Run "npm run dev:trace" first to generate trace data.');
    console.log('💡 Then run this command again to analyze the trace.');
  }
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript compilation performance analysis
 * Development utility for analyzing TypeScript build performance
 */
export async function analyzeTypeScript() {
  console.log('🔍 Analyzing TypeScript performance...');
  
  try {
    console.log('📊 Running TypeScript with extended diagnostics...');
    const { stdout } = await execAsync('npx tsc --noEmit --extendedDiagnostics');
    
    console.log('\n📈 TypeScript Performance Report:');
    console.log(stdout);
    
    // Save report to file
    const reportPath = 'typescript-performance-report.txt';
    await fs.writeFile(reportPath, stdout);
    console.log(`💾 Report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ TypeScript analysis failed:', error.message);
  }
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Bundle analysis utilities  
 * Development utility for analyzing Next.js bundle composition
 */
export async function analyzeBundle() {
  console.log('📦 Analyzing Next.js bundle...');
  
  try {
    console.log('🏗️  Building with bundle analysis...');
    await execAsync('ANALYZE=true npm run build');
    console.log('✅ Bundle analysis complete! Check your browser for the interactive report.');
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error.message);
  }
}

/**
 * Development utility for comprehensive performance profiling
 */
export async function profileBuild() {
  console.log('🚀 Starting comprehensive build profiling...');
  
  try {
    // Clean build for accurate profiling
    console.log('🧹 Cleaning previous build artifacts...');
    await execAsync('npm run clean:full');
    
    // Profile TypeScript compilation
    console.log('📊 Profiling TypeScript compilation...');
    await analyzeTypeScript();
    
    // Profile Next.js build with trace
    console.log('🏗️  Profiling Next.js build with trace...');
    await execAsync('npm run build:trace');
    
    // Analyze bundle composition
    console.log('📦 Analyzing bundle composition...');
    await analyzeBundle();
    
    console.log('✅ Complete performance profile generated!');
    console.log('📁 Check the following files for detailed reports:');
    console.log('   - typescript-performance-report.txt');
    console.log('   - .next/trace-turbopack (analyze with: npm run dev:analyze-trace)');
    
  } catch (error) {
    console.error('❌ Build profiling failed:', error.message);
  }
}

/**
 * Development utility for quick development environment health check
 */
export async function healthCheck() {
  console.log('🏥 Running development environment health check...');
  
  const checks = [
    {
      name: 'Node.js Version',
      command: 'node --version',
      expected: 'v18.0.0 or higher'
    },
    {
      name: 'npm Version', 
      command: 'npm --version',
      expected: '8.0.0 or higher'
    },
    {
      name: 'TypeScript Version',
      command: 'npx tsc --version',
      expected: '5.0.0 or higher'
    },
    {
      name: 'Next.js Cache Size',
      command: 'du -sh .next/cache 2>/dev/null || echo "No cache"',
      expected: 'Should exist for faster builds'
    }
  ];
  
  for (const check of checks) {
    try {
      const { stdout } = await execAsync(check.command);
      console.log(`✅ ${check.name}: ${stdout.trim()}`);
    } catch (error) {
      console.log(`❌ ${check.name}: Failed - ${error.message}`);
    }
  }
  
  // Check for common performance issues
  console.log('\n🔍 Checking for common performance issues...');
  
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    
    // Check if Turbopack is enabled
    const devScript = packageJson.scripts?.dev || '';
    if (devScript.includes('--turbopack')) {
      console.log('✅ Turbopack enabled for faster development builds');
    } else {
      console.log('⚠️  Consider enabling Turbopack with: "next dev --turbopack"');
    }
    
    // Check node_modules size
    try {
      const { stdout } = await execAsync('du -sh node_modules');
      const size = stdout.trim().split('\t')[0];
      console.log(`📦 node_modules size: ${size}`);
      
      if (parseFloat(size) > 1000) { // If over 1GB
        console.log('⚠️  Large node_modules detected. Consider cleaning unused dependencies.');
      }
    } catch (error) {
      console.log('📦 node_modules size: Unable to determine');
    }
    
  } catch (error) {
    console.error('❌ Health check configuration analysis failed:', error.message);
  }
  
  console.log('\n🎯 Health check complete!');
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'trace':
    analyzeTrace();
    break;
  case 'typescript':
    analyzeTypeScript();
    break;
  case 'bundle':
    analyzeBundle();
    break;
  case 'profile':
    profileBuild();
    break;
  case 'health':
    healthCheck();
    break;
  default:
    console.log('🛠️  My Private Tutor Online - Development Utilities');
    console.log('');
    console.log('Available commands:');
    console.log('  trace      - Analyze Turbopack performance trace');
    console.log('  typescript - Analyze TypeScript compilation performance');
    console.log('  bundle     - Analyze Next.js bundle composition');
    console.log('  profile    - Run comprehensive build profiling');
    console.log('  health     - Check development environment health');
    console.log('');
    console.log('Usage: node scripts/dev-utils.mjs <command>');
}