#!/usr/bin/env node

/**
 * TypeScript Performance Measurement Script
 * Measures the impact of adding explicit return types to CMS functions
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

async function measureTypeScriptPerformance() {
  console.log('📊 Measuring TypeScript Compilation Performance\n');
  
  // Clean TypeScript cache
  try {
    await execAsync('rm -rf .tsbuildinfo');
    console.log('✅ Cleared TypeScript cache\n');
  } catch (error) {
    // Ignore if file doesn't exist
  }
  
  // Measure compilation time
  console.log('⏱️  Starting TypeScript compilation...');
  const startTime = Date.now();
  
  try {
    const { stdout, stderr } = await execAsync('npx tsc --noEmit --extendedDiagnostics', {
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    });
    
    const endTime = Date.now();
    const compilationTime = endTime - startTime;
    
    // Parse diagnostics
    const lines = stdout.split('\n');
    const metrics = {};
    
    lines.forEach(line => {
      if (line.includes('Files:')) {
        metrics.files = line.match(/Files:\s+(\d+)/)?.[1];
      }
      if (line.includes('Lines:')) {
        metrics.lines = line.match(/Lines:\s+(\d+)/)?.[1];
      }
      if (line.includes('Nodes:')) {
        metrics.nodes = line.match(/Nodes:\s+(\d+)/)?.[1];
      }
      if (line.includes('Identifiers:')) {
        metrics.identifiers = line.match(/Identifiers:\s+(\d+)/)?.[1];
      }
      if (line.includes('Symbols:')) {
        metrics.symbols = line.match(/Symbols:\s+(\d+)/)?.[1];
      }
      if (line.includes('Types:')) {
        metrics.types = line.match(/Types:\s+(\d+)/)?.[1];
      }
      if (line.includes('Instantiations:')) {
        metrics.instantiations = line.match(/Instantiations:\s+(\d+)/)?.[1];
      }
      if (line.includes('Memory used:')) {
        metrics.memory = line.match(/Memory used:\s+([\d.]+)K/)?.[1];
      }
      if (line.includes('Total time:')) {
        metrics.totalTime = line.match(/Total time:\s+([\d.]+)s/)?.[1];
      }
      if (line.includes('Check time:')) {
        metrics.checkTime = line.match(/Check time:\s+([\d.]+)s/)?.[1];
      }
      if (line.includes('Bind time:')) {
        metrics.bindTime = line.match(/Bind time:\s+([\d.]+)s/)?.[1];
      }
      if (line.includes('Parse time:')) {
        metrics.parseTime = line.match(/Parse time:\s+([\d.]+)s/)?.[1];
      }
    });
    
    // Display results
    console.log('\n✅ TypeScript Compilation Complete!\n');
    console.log('=== PERFORMANCE METRICS ===');
    console.log(`Total Compilation Time: ${(compilationTime / 1000).toFixed(2)}s`);
    console.log(`TypeScript Check Time: ${metrics.checkTime || 'N/A'}s`);
    console.log(`TypeScript Bind Time: ${metrics.bindTime || 'N/A'}s`);
    console.log(`TypeScript Parse Time: ${metrics.parseTime || 'N/A'}s`);
    console.log(`\n=== CODE METRICS ===`);
    console.log(`Files Analyzed: ${metrics.files || 'N/A'}`);
    console.log(`Lines of Code: ${metrics.lines || 'N/A'}`);
    console.log(`AST Nodes: ${metrics.nodes || 'N/A'}`);
    console.log(`Symbols: ${metrics.symbols || 'N/A'}`);
    console.log(`Types: ${metrics.types || 'N/A'}`);
    console.log(`Type Instantiations: ${metrics.instantiations || 'N/A'}`);
    console.log(`Memory Used: ${metrics.memory ? (parseFloat(metrics.memory) / 1024).toFixed(2) + 'MB' : 'N/A'}`);
    
    // Save results
    const results = {
      timestamp: new Date().toISOString(),
      optimization: 'explicit-return-types',
      metrics: {
        compilationTime,
        ...metrics
      },
      improvements: {
        description: 'Added explicit return types to 4 CMS cache functions',
        expectedBenefit: '15-20% faster TypeScript compilation',
        actualBenefit: 'See comparison with baseline'
      }
    };
    
    const resultsPath = path.join(process.cwd(), 'typescript-performance.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`\n📝 Results saved to ${resultsPath}`);
    
    // Compare with baseline if exists
    const baselinePath = path.join(process.cwd(), 'typescript-baseline.json');
    if (fs.existsSync(baselinePath)) {
      const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
      const improvement = ((baseline.metrics.compilationTime - compilationTime) / baseline.metrics.compilationTime * 100).toFixed(2);
      
      console.log('\n=== PERFORMANCE COMPARISON ===');
      console.log(`Baseline Compilation: ${(baseline.metrics.compilationTime / 1000).toFixed(2)}s`);
      console.log(`Current Compilation: ${(compilationTime / 1000).toFixed(2)}s`);
      console.log(`Improvement: ${improvement}%`);
      
      if (parseFloat(improvement) > 0) {
        console.log('✅ Performance improved!');
      } else {
        console.log('⚠️ No significant improvement detected');
      }
    } else {
      // Save as baseline
      fs.writeFileSync(baselinePath, JSON.stringify(results, null, 2));
      console.log('\n📊 Saved as baseline for future comparisons');
    }
    
  } catch (error) {
    console.error('❌ TypeScript compilation failed:', error.message);
    
    // Still measure the time even if there are errors
    const endTime = Date.now();
    const compilationTime = endTime - startTime;
    console.log(`\nCompilation attempted for ${(compilationTime / 1000).toFixed(2)}s before failing`);
  }
}

// Run the measurement
measureTypeScriptPerformance().catch(console.error);