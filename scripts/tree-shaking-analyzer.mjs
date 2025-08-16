#!/usr/bin/env node

/**
 * CONTEXT7 SOURCE: /webpack/webpack - Tree shaking analysis for unused export detection
 * OPTIMIZATION REASON: Identify and optimize unused exports for maximum bundle reduction
 * PERFORMANCE TARGET: Detect dead code and unused imports for 577KB bundle target
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = join(__dirname, '..');

// CONTEXT7 SOURCE: /webpack/webpack - Advanced tree shaking patterns for code analysis
class TreeShakingAnalyzer {
  constructor() {
    this.analysisResults = {
      unusedExports: [],
      largeModules: [],
      duplicateImports: [],
      optimizationOpportunities: []
    };
    this.filePatterns = ['.tsx', '.ts', '.jsx', '.js'];
    this.excludePatterns = ['node_modules', '.next', '.git', 'dist', 'out'];
  }

  /**
   * CONTEXT7 SOURCE: /webpack/webpack - Module size analysis for bundle optimization
   * OPTIMIZATION REASON: Identify large modules that can be split or lazy loaded
   */
  async analyzeLargeModules() {
    console.log('📊 Phase 1: Large Module Analysis');
    
    const targetDirs = [
      join(projectRoot, 'src/components'),
      join(projectRoot, 'src/lib'),
      join(projectRoot, 'src/app')
    ];

    const largeModules = [];
    const sizeThreshold = 5000; // 5KB threshold for large modules

    for (const dir of targetDirs) {
      if (!this.directoryExists(dir)) continue;
      
      const files = this.getAllFiles(dir);
      
      for (const file of files) {
        if (!this.isTargetFile(file)) continue;
        
        try {
          const content = readFileSync(file, 'utf8');
          const size = Buffer.byteLength(content, 'utf8');
          
          if (size > sizeThreshold) {
            largeModules.push({
              file: file.replace(projectRoot, ''),
              size: Math.round(size / 1024 * 100) / 100, // KB
              lines: content.split('\n').length,
              exports: this.extractExports(content),
              imports: this.extractImports(content)
            });
          }
        } catch (error) {
          console.log(`   ⚠️  Could not analyze ${file}: ${error.message}`);
        }
      }
    }

    // Sort by size descending
    largeModules.sort((a, b) => b.size - a.size);
    
    console.log(`   ✅ Found ${largeModules.length} large modules (>5KB)`);
    console.log('   📊 Top candidates for optimization:');
    
    largeModules.slice(0, 5).forEach(module => {
      console.log(`      📄 ${module.file} - ${module.size}KB (${module.lines} lines)`);
    });

    this.analysisResults.largeModules = largeModules;
    return largeModules;
  }

  /**
   * CONTEXT7 SOURCE: /webpack/webpack - Import analysis for dead code elimination
   * OPTIMIZATION REASON: Detect barrel imports and unused imports for optimization
   */
  async analyzeImportPatterns() {
    console.log('🔍 Phase 2: Import Pattern Analysis');
    
    const importAnalysis = {
      barrelImports: [],
      unusedImports: [],
      heavyImports: []
    };

    const targetFiles = this.getAllTargetFiles();
    
    for (const file of targetFiles) {
      try {
        const content = readFileSync(file, 'utf8');
        const imports = this.extractImports(content);
        
        // Detect barrel imports
        const barrelImports = imports.filter(imp => 
          imp.source.includes('@/lib') || 
          imp.source.includes('@/components') ||
          imp.source.includes('@/utils')
        );
        
        // Detect heavy library imports
        const heavyLibraryImports = imports.filter(imp =>
          this.isHeavyLibrary(imp.source)
        );
        
        if (barrelImports.length > 0) {
          importAnalysis.barrelImports.push({
            file: file.replace(projectRoot, ''),
            imports: barrelImports
          });
        }
        
        if (heavyLibraryImports.length > 0) {
          importAnalysis.heavyImports.push({
            file: file.replace(projectRoot, ''),
            imports: heavyLibraryImports
          });
        }
        
      } catch (error) {
        console.log(`   ⚠️  Could not analyze imports in ${file}: ${error.message}`);
      }
    }

    console.log(`   ✅ Found ${importAnalysis.barrelImports.length} files with barrel imports`);
    console.log(`   ✅ Found ${importAnalysis.heavyImports.length} files with heavy library imports`);
    
    return importAnalysis;
  }

  /**
   * CONTEXT7 SOURCE: /webpack/webpack - Export usage analysis for tree shaking
   * OPTIMIZATION REASON: Identify unused exports that can be removed
   */
  async analyzeUnusedExports() {
    console.log('🌳 Phase 3: Unused Export Analysis');
    
    const exportMap = new Map();
    const importMap = new Map();
    const targetFiles = this.getAllTargetFiles();
    
    // Build export map
    for (const file of targetFiles) {
      try {
        const content = readFileSync(file, 'utf8');
        const exports = this.extractExports(content);
        
        if (exports.length > 0) {
          exportMap.set(file, exports);
        }
      } catch (error) {
        continue;
      }
    }
    
    // Build import map
    for (const file of targetFiles) {
      try {
        const content = readFileSync(file, 'utf8');
        const imports = this.extractImports(content);
        
        imports.forEach(imp => {
          if (!importMap.has(imp.source)) {
            importMap.set(imp.source, new Set());
          }
          imp.specifiers.forEach(spec => {
            importMap.get(imp.source).add(spec);
          });
        });
      } catch (error) {
        continue;
      }
    }
    
    // Find unused exports
    const unusedExports = [];
    
    for (const [file, exports] of exportMap) {
      const relativeFile = file.replace(projectRoot, '');
      const importKey = relativeFile.replace(/\.(tsx?|jsx?)$/, '');
      
      exports.forEach(exp => {
        const isUsed = importMap.has(importKey) && 
                      importMap.get(importKey).has(exp.name);
        
        if (!isUsed && exp.name !== 'default') {
          unusedExports.push({
            file: relativeFile,
            export: exp.name,
            type: exp.type
          });
        }
      });
    }

    console.log(`   ✅ Found ${unusedExports.length} potentially unused exports`);
    
    this.analysisResults.unusedExports = unusedExports;
    return unusedExports;
  }

  /**
   * CONTEXT7 SOURCE: /webpack/webpack - Dependency optimization recommendations
   * OPTIMIZATION REASON: Generate actionable optimization recommendations
   */
  async generateOptimizationRecommendations() {
    console.log('💡 Phase 4: Optimization Recommendations');
    
    const recommendations = [];
    
    // Large module recommendations
    this.analysisResults.largeModules.slice(0, 10).forEach(module => {
      if (module.size > 10) { // >10KB
        recommendations.push({
          type: 'lazy-loading',
          priority: 'high',
          file: module.file,
          description: `Consider lazy loading this ${module.size}KB component`,
          impact: 'High bundle size reduction',
          action: 'Implement React.lazy() for dynamic import'
        });
      } else if (module.size > 7) { // >7KB
        recommendations.push({
          type: 'code-splitting',
          priority: 'medium',
          file: module.file,
          description: `Consider splitting this ${module.size}KB module`,
          impact: 'Medium bundle size reduction',
          action: 'Extract reusable parts or split functionality'
        });
      }
    });
    
    // Unused exports recommendations
    if (this.analysisResults.unusedExports.length > 0) {
      recommendations.push({
        type: 'dead-code-elimination',
        priority: 'high',
        description: `Remove ${this.analysisResults.unusedExports.length} unused exports`,
        impact: 'Code clarity and minor size reduction',
        action: 'Remove unused exported functions and variables'
      });
    }
    
    // Heavy library recommendations
    const heavyLibraries = [
      'gsap', 'recharts', 'monaco-editor', 'd3', 'tesseract.js'
    ];
    
    heavyLibraries.forEach(lib => {
      recommendations.push({
        type: 'selective-import',
        priority: 'high',
        library: lib,
        description: `Optimize ${lib} imports for tree shaking`,
        impact: 'Significant bundle size reduction',
        action: 'Use selective imports instead of barrel imports'
      });
    });

    console.log(`   ✅ Generated ${recommendations.length} optimization recommendations`);
    
    this.analysisResults.optimizationOpportunities = recommendations;
    return recommendations;
  }

  /**
   * CONTEXT7 SOURCE: /webpack/webpack - Bundle size estimation for optimization planning
   * OPTIMIZATION REASON: Estimate potential bundle size reduction
   */
  async estimateBundleReduction() {
    console.log('📊 Phase 5: Bundle Reduction Estimation');
    
    let totalEstimatedReduction = 0; // KB
    
    // Estimate from large modules (lazy loading)
    const lazyLoadableSavings = this.analysisResults.largeModules
      .filter(m => m.size > 7)
      .reduce((sum, m) => sum + m.size * 0.8, 0); // 80% savings from lazy loading
    
    // Estimate from unused exports (small but additive)
    const deadCodeSavings = this.analysisResults.unusedExports.length * 0.1; // 0.1KB per unused export
    
    // Estimate from import optimization
    const importOptimizationSavings = 20; // Conservative estimate for better tree shaking
    
    totalEstimatedReduction = lazyLoadableSavings + deadCodeSavings + importOptimizationSavings;
    
    console.log('   📊 Bundle Reduction Estimates:');
    console.log(`      🔄 Lazy Loading: ${Math.round(lazyLoadableSavings)}KB`);
    console.log(`      🌳 Dead Code Removal: ${Math.round(deadCodeSavings)}KB`);
    console.log(`      📦 Import Optimization: ${Math.round(importOptimizationSavings)}KB`);
    console.log(`      🎯 Total Estimated Reduction: ${Math.round(totalEstimatedReduction)}KB`);
    
    const currentSize = 704; // KB
    const targetSize = 577; // KB
    const requiredReduction = currentSize - targetSize; // 127KB
    
    console.log(`\n   🎯 Target Analysis:`);
    console.log(`      Current Bundle: ${currentSize}KB`);
    console.log(`      Target Bundle: ${targetSize}KB`);
    console.log(`      Required Reduction: ${requiredReduction}KB`);
    console.log(`      Estimated Reduction: ${Math.round(totalEstimatedReduction)}KB`);
    
    if (totalEstimatedReduction >= requiredReduction) {
      console.log(`      ✅ Target achievable with current optimizations`);
    } else {
      console.log(`      ⚠️  Additional optimizations needed: ${Math.round(requiredReduction - totalEstimatedReduction)}KB`);
    }
    
    return {
      estimatedReduction: totalEstimatedReduction,
      requiredReduction,
      targetAchievable: totalEstimatedReduction >= requiredReduction
    };
  }

  // Helper methods
  directoryExists(dir) {
    try {
      return statSync(dir).isDirectory();
    } catch {
      return false;
    }
  }

  getAllFiles(dir) {
    let files = [];
    
    try {
      const items = readdirSync(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory() && !this.excludePatterns.some(pattern => item.includes(pattern))) {
          files = files.concat(this.getAllFiles(fullPath));
        } else if (stat.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory not accessible
    }
    
    return files;
  }

  getAllTargetFiles() {
    const dirs = [
      join(projectRoot, 'src/components'),
      join(projectRoot, 'src/lib'),
      join(projectRoot, 'src/app'),
      join(projectRoot, 'src/utils')
    ];
    
    let files = [];
    
    for (const dir of dirs) {
      if (this.directoryExists(dir)) {
        files = files.concat(this.getAllFiles(dir));
      }
    }
    
    return files.filter(file => this.isTargetFile(file));
  }

  isTargetFile(file) {
    return this.filePatterns.some(pattern => file.endsWith(pattern));
  }

  extractExports(content) {
    const exports = [];
    
    // Export function/const/let/var patterns
    const exportPatterns = [
      /export\s+(?:const|let|var)\s+(\w+)/g,
      /export\s+function\s+(\w+)/g,
      /export\s+class\s+(\w+)/g,
      /export\s+interface\s+(\w+)/g,
      /export\s+type\s+(\w+)/g,
      /export\s*\{\s*([^}]+)\s*\}/g
    ];
    
    exportPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1].includes(',')) {
          // Handle destructured exports
          match[1].split(',').forEach(name => {
            exports.push({
              name: name.trim(),
              type: 'named'
            });
          });
        } else {
          exports.push({
            name: match[1],
            type: 'named'
          });
        }
      }
    });
    
    // Default exports
    if (content.includes('export default')) {
      exports.push({
        name: 'default',
        type: 'default'
      });
    }
    
    return exports;
  }

  extractImports(content) {
    const imports = [];
    
    // Import patterns
    const importPattern = /import\s+(?:(?:\*\s+as\s+\w+)|(?:\w+)|(?:\{[^}]+\}))\s+from\s+['"`]([^'"`]+)['"`]/g;
    
    let match;
    while ((match = importPattern.exec(content)) !== null) {
      const source = match[1];
      const importStatement = match[0];
      
      // Extract imported specifiers
      const specifiers = [];
      const specifierMatch = importStatement.match(/import\s+(?:(\w+)|(?:\{([^}]+)\})|(?:\*\s+as\s+(\w+)))/);
      
      if (specifierMatch) {
        if (specifierMatch[1]) {
          // Default import
          specifiers.push(specifierMatch[1]);
        } else if (specifierMatch[2]) {
          // Named imports
          specifierMatch[2].split(',').forEach(spec => {
            specifiers.push(spec.trim().split(' as ')[0]);
          });
        } else if (specifierMatch[3]) {
          // Namespace import
          specifiers.push(specifierMatch[3]);
        }
      }
      
      imports.push({
        source,
        specifiers,
        statement: importStatement
      });
    }
    
    return imports;
  }

  isHeavyLibrary(source) {
    const heavyLibraries = [
      'gsap', 'recharts', '@monaco-editor', 'd3', 'tesseract.js',
      'framer-motion', '@react-spring', 'lottie-react', 'three'
    ];
    
    return heavyLibraries.some(lib => source.includes(lib));
  }

  /**
   * Execute comprehensive tree shaking analysis
   */
  async execute() {
    console.log('🌳 ADVANCED TREE SHAKING ANALYSIS - MY PRIVATE TUTOR ONLINE');
    console.log('🎯 Target: Identify optimization opportunities for 577KB bundle');
    console.log('=' .repeat(80));
    
    try {
      // Execute all analysis phases
      await this.analyzeLargeModules();
      await this.analyzeImportPatterns();
      await this.analyzeUnusedExports();
      await this.generateOptimizationRecommendations();
      const reduction = await this.estimateBundleReduction();
      
      console.log('\n🎯 TREE SHAKING ANALYSIS COMPLETE:');
      console.log('=' .repeat(50));
      console.log(`✅ Large Modules Analyzed: ${this.analysisResults.largeModules.length} found`);
      console.log(`✅ Unused Exports Found: ${this.analysisResults.unusedExports.length}`);
      console.log(`✅ Optimization Opportunities: ${this.analysisResults.optimizationOpportunities.length}`);
      console.log(`✅ Estimated Bundle Reduction: ${Math.round(reduction.estimatedReduction)}KB`);
      
      if (reduction.targetAchievable) {
        console.log('🎉 577KB target is achievable with identified optimizations!');
      } else {
        console.log('⚠️  Additional optimizations needed beyond current analysis');
      }
      
      return {
        success: true,
        analysis: this.analysisResults,
        reduction,
        status: 'Tree shaking analysis completed successfully'
      };
      
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Execute analysis if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new TreeShakingAnalyzer();
  analyzer.execute()
    .then(result => {
      if (result.success) {
        console.log('\n🎉 Tree shaking analysis completed successfully!');
        process.exit(0);
      } else {
        console.error('\n💥 Analysis failed:', result.error);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 Fatal error:', error.message);
      process.exit(1);
    });
}

export default TreeShakingAnalyzer;