#!/usr/bin/env node

// CONTEXT7 SOURCE: /nodejs/node - File system operations for duplicate detection
// DUPLICATE CLEANUP REASON: Eliminate redundant assets for performance optimization and storage efficiency

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const LOGOS_DIR = path.join(IMAGES_DIR, 'logos');

// File hash calculation for duplicate detection
async function calculateFileHash(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// Analyze for duplicate files
async function findDuplicates() {
  console.log('🔍 Analyzing assets for duplicates...');
  
  const fileHashes = new Map();
  const duplicates = [];
  const analysisReport = {
    totalFiles: 0,
    duplicateGroups: 0,
    potentialSavings: 0,
    logoVariants: []
  };
  
  const analyzeDirectory = async (dir, relativePath = '') => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativeFilePath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        await analyzeDirectory(fullPath, relativeFilePath);
      } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(entry.name)) {
        analysisReport.totalFiles++;
        
        try {
          const stats = await fs.stat(fullPath);
          const hash = await calculateFileHash(fullPath);
          
          const fileInfo = {
            path: relativeFilePath,
            fullPath,
            size: stats.size,
            hash,
            name: entry.name
          };
          
          // Check for logo variants (special handling)
          if (fullPath.includes('logos') || entry.name.toLowerCase().includes('logo')) {
            analysisReport.logoVariants.push(fileInfo);
          }
          
          if (fileHashes.has(hash)) {
            // Found duplicate
            const existing = fileHashes.get(hash);
            const duplicateGroup = duplicates.find(group => 
              group.some(file => file.hash === hash)
            );
            
            if (duplicateGroup) {
              duplicateGroup.push(fileInfo);
            } else {
              duplicates.push([existing, fileInfo]);
              analysisReport.duplicateGroups++;
            }
            
            analysisReport.potentialSavings += fileInfo.size;
          } else {
            fileHashes.set(hash, fileInfo);
          }
          
        } catch (error) {
          console.warn(`⚠️  Could not analyze ${fullPath}: ${error.message}`);
        }
      }
    }
  };
  
  await analyzeDirectory(IMAGES_DIR);
  
  return { duplicates, analysisReport };
}

// Clean up font duplicates specifically
async function cleanupFontDuplicates() {
  console.log('🔤 Checking for font file duplicates...');
  
  const fontsDir = path.join(process.cwd(), 'public/fonts');
  const fontDuplicates = [];
  
  try {
    await fs.access(fontsDir);
    const entries = await fs.readdir(fontsDir);
    
    // Group by base name (without extension variations)
    const fontGroups = new Map();
    
    for (const entry of entries) {
      const baseName = entry.replace(/\.(woff2?|ttf|otf|eot)$/i, '');
      const weight = entry.match(/(\d{3}|light|regular|medium|semibold|bold|extrabold)/i);
      const style = entry.match(/(italic|oblique)/i);
      
      const key = `${baseName}-${weight?.[0] || 'regular'}-${style?.[0] || 'normal'}`;
      
      if (!fontGroups.has(key)) {
        fontGroups.set(key, []);
      }
      
      fontGroups.get(key).push({
        name: entry,
        path: path.join(fontsDir, entry),
        baseName,
        weight: weight?.[0] || 'regular',
        style: style?.[0] || 'normal'
      });
    }
    
    // Find duplicates (same base name, weight, style but different extensions)
    for (const [key, files] of fontGroups) {
      if (files.length > 1) {
        // Prefer woff2 > woff > ttf > otf > eot
        const preferenceOrder = ['woff2', 'woff', 'ttf', 'otf', 'eot'];
        
        files.sort((a, b) => {
          const aExt = path.extname(a.name).slice(1);
          const bExt = path.extname(b.name).slice(1);
          return preferenceOrder.indexOf(aExt) - preferenceOrder.indexOf(bExt);
        });
        
        fontDuplicates.push({
          group: key,
          keep: files[0],
          remove: files.slice(1)
        });
      }
    }
    
  } catch (error) {
    console.log('📝 No fonts directory found or accessible');
  }
  
  return fontDuplicates;
}

// Optimize logo files specifically
async function optimizeLogoVariants(logoVariants) {
  console.log('🎨 Analyzing logo variants for optimization...');
  
  const logoAnalysis = {
    formats: new Map(),
    sizes: new Map(),
    variants: new Map(),
    recommendations: []
  };
  
  for (const logo of logoVariants) {
    const ext = path.extname(logo.name).toLowerCase();
    const baseName = path.basename(logo.name, ext);
    
    // Track formats
    if (!logoAnalysis.formats.has(ext)) {
      logoAnalysis.formats.set(ext, []);
    }
    logoAnalysis.formats.get(ext).push(logo);
    
    // Track sizes
    const sizeCategory = logo.size > 500000 ? 'large' : 
                        logo.size > 100000 ? 'medium' : 'small';
    if (!logoAnalysis.sizes.has(sizeCategory)) {
      logoAnalysis.sizes.set(sizeCategory, []);
    }
    logoAnalysis.sizes.get(sizeCategory).push(logo);
    
    // Track variants by base name
    if (!logoAnalysis.variants.has(baseName)) {
      logoAnalysis.variants.set(baseName, []);
    }
    logoAnalysis.variants.get(baseName).push(logo);
  }
  
  // Generate recommendations
  for (const [baseName, variants] of logoAnalysis.variants) {
    if (variants.length > 1) {
      // Multiple variants of same logo
      const formats = [...new Set(variants.map(v => path.extname(v.name)))];
      const largest = variants.reduce((max, current) => 
        current.size > max.size ? current : max
      );
      
      logoAnalysis.recommendations.push({
        type: 'consolidate',
        baseName,
        variants: variants.length,
        formats,
        suggestion: `Consider keeping only essential formats (.svg, .png, .webp) for ${baseName}`,
        largest: largest.path
      });
    }
  }
  
  return logoAnalysis;
}

// Generate comprehensive cleanup report
async function generateCleanupReport(duplicates, analysisReport, fontDuplicates, logoAnalysis) {
  console.log('\n📊 DUPLICATE CLEANUP ANALYSIS REPORT\n');
  console.log('='.repeat(60));
  
  // Overall Analysis
  console.log('📋 OVERALL ASSET ANALYSIS:');
  console.log(`Total Files Analyzed: ${analysisReport.totalFiles}`);
  console.log(`Duplicate Groups Found: ${analysisReport.duplicateGroups}`);
  console.log(`Potential Savings: ${Math.round(analysisReport.potentialSavings / 1024)}KB`);
  console.log(`Logo Variants: ${analysisReport.logoVariants.length}`);
  
  // Duplicate Files
  if (duplicates.length > 0) {
    console.log('\n🔴 DUPLICATE FILES FOUND:');
    duplicates.forEach((group, index) => {
      console.log(`\nGroup ${index + 1}:`);
      group.forEach(file => {
        console.log(`  ${file.path} (${Math.round(file.size / 1024)}KB)`);
      });
      const savingsPotential = group.slice(1).reduce((sum, file) => sum + file.size, 0);
      console.log(`  💾 Potential savings: ${Math.round(savingsPotential / 1024)}KB`);
    });
  } else {
    console.log('\n✅ No exact duplicate files found');
  }
  
  // Font Duplicates
  if (fontDuplicates.length > 0) {
    console.log('\n🔤 FONT FILE DUPLICATES:');
    fontDuplicates.forEach(duplicate => {
      console.log(`\n${duplicate.group}:`);
      console.log(`  Keep: ${duplicate.keep.name}`);
      duplicate.remove.forEach(font => {
        console.log(`  Remove: ${font.name}`);
      });
    });
  } else {
    console.log('\n✅ No font duplicates found');
  }
  
  // Logo Analysis
  if (logoAnalysis.recommendations.length > 0) {
    console.log('\n🎨 LOGO OPTIMIZATION RECOMMENDATIONS:');
    logoAnalysis.recommendations.forEach(rec => {
      console.log(`\n${rec.baseName}:`);
      console.log(`  Variants: ${rec.variants} files`);
      console.log(`  Formats: ${rec.formats.join(', ')}`);
      console.log(`  Suggestion: ${rec.suggestion}`);
    });
  }
  
  // Format Distribution
  console.log('\n📈 LOGO FORMAT DISTRIBUTION:');
  logoAnalysis.formats.forEach((files, format) => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    console.log(`${format}: ${files.length} files, ${Math.round(totalSize / 1024)}KB`);
  });
  
  // Cleanup Recommendations
  console.log('\n🎯 CLEANUP RECOMMENDATIONS:');
  console.log('• Remove exact duplicate files to save storage space');
  console.log('• Consolidate logo variants to essential formats only (.svg, .png, .webp)');
  console.log('• Remove unused font format duplicates (prefer .woff2)');
  console.log('• Consider using a single logo format with different sizes rather than variants');
  console.log('• Implement proper asset versioning to prevent future duplicates');
  
  console.log('\n💡 PERFORMANCE IMPACT:');
  console.log('• Reduced bundle size improves initial page load');
  console.log('• Fewer asset requests improve Core Web Vitals');
  console.log('• Better CDN cache efficiency with optimized assets');
  console.log('• Enhanced user experience on slower connections');
  
  console.log('\n='.repeat(60));
}

// Main execution
async function main() {
  try {
    console.log('🧹 MY PRIVATE TUTOR ONLINE - DUPLICATE ASSET CLEANUP');
    console.log('Enterprise-grade asset deduplication for optimal performance\n');
    
    // Find exact duplicates
    const { duplicates, analysisReport } = await findDuplicates();
    
    // Check font duplicates
    const fontDuplicates = await cleanupFontDuplicates();
    
    // Analyze logo variants
    const logoAnalysis = await optimizeLogoVariants(analysisReport.logoVariants);
    
    // Generate comprehensive report
    await generateCleanupReport(duplicates, analysisReport, fontDuplicates, logoAnalysis);
    
    console.log('\n🎉 Duplicate analysis completed successfully!');
    console.log('💡 Review recommendations above for manual cleanup decisions');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}