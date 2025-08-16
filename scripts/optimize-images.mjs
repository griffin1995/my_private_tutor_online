#!/usr/bin/env node

// CONTEXT7 SOURCE: /imagemin/imagemin - Image optimization library for Node.js
// ASSET OPTIMIZATION REASON: Official imagemin documentation for automated image compression and format conversion

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const BACKUP_DIR = path.join(process.cwd(), 'backup-images');

// CONTEXT7 SOURCE: /imagemin/imagemin - Configuration for enterprise-grade image optimization
// OPTIMIZATION REASON: Royal client quality standards with maximum compression efficiency
const OPTIMIZATION_CONFIG = {
  jpeg: {
    quality: 85, // High quality for royal client standards
    progressive: true, // Progressive loading for better UX
  },
  png: {
    quality: [0.8, 0.9], // High quality range for PNG images
    speed: 1, // Slower but better compression
  },
  webp: {
    quality: 88, // WebP quality for modern browsers
    method: 6, // Maximum compression method
  }
};

// File size thresholds for optimization (in bytes)
const SIZE_THRESHOLDS = {
  LARGE_FILE: 5 * 1024 * 1024, // 5MB - requires immediate optimization
  MEDIUM_FILE: 1 * 1024 * 1024, // 1MB - optimization recommended
  SMALL_FILE: 100 * 1024, // 100KB - minimal optimization needed
};

async function createBackup() {
  console.log('🔄 Creating backup of original images...');
  
  try {
    await fs.access(BACKUP_DIR);
    console.log('⚠️  Backup directory already exists, skipping backup creation');
    return;
  } catch {
    // Backup directory doesn't exist, create it
  }

  await fs.mkdir(BACKUP_DIR, { recursive: true });
  
  // Copy original images to backup
  const copyRecursive = async (src, dest) => {
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await copyRecursive(srcPath, destPath);
      } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
        await fs.copyFile(srcPath, destPath);
      }
    }
  };
  
  await copyRecursive(IMAGES_DIR, BACKUP_DIR);
  console.log('✅ Backup created successfully');
}

async function analyzeImages() {
  console.log('🔍 Analyzing image assets...');
  
  const analysis = {
    totalFiles: 0,
    totalSize: 0,
    largeFiles: [],
    mediumFiles: [],
    smallFiles: [],
    byFormat: {
      jpg: { count: 0, size: 0 },
      png: { count: 0, size: 0 },
      gif: { count: 0, size: 0 },
      webp: { count: 0, size: 0 },
      other: { count: 0, size: 0 }
    }
  };
  
  const analyzeDirectory = async (dir, relativePath = '') => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativeFilePath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        await analyzeDirectory(fullPath, relativeFilePath);
      } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
        const stats = await fs.stat(fullPath);
        const size = stats.size;
        const ext = path.extname(entry.name).toLowerCase().replace('.', '');
        
        analysis.totalFiles++;
        analysis.totalSize += size;
        
        const fileInfo = {
          path: relativeFilePath,
          fullPath,
          size,
          sizeKB: Math.round(size / 1024),
          sizeMB: Math.round(size / (1024 * 1024) * 100) / 100,
          format: ext === 'jpeg' ? 'jpg' : ext
        };
        
        // Categorize by size
        if (size >= SIZE_THRESHOLDS.LARGE_FILE) {
          analysis.largeFiles.push(fileInfo);
        } else if (size >= SIZE_THRESHOLDS.MEDIUM_FILE) {
          analysis.mediumFiles.push(fileInfo);
        } else {
          analysis.smallFiles.push(fileInfo);
        }
        
        // Track by format
        const format = fileInfo.format in analysis.byFormat ? fileInfo.format : 'other';
        analysis.byFormat[format].count++;
        analysis.byFormat[format].size += size;
      }
    }
  };
  
  await analyzeDirectory(IMAGES_DIR);
  
  // Sort files by size (largest first)
  analysis.largeFiles.sort((a, b) => b.size - a.size);
  analysis.mediumFiles.sort((a, b) => b.size - a.size);
  
  return analysis;
}

async function optimizeImages(targetFiles = null) {
  console.log('🚀 Starting image optimization...');
  
  const optimizationResults = {
    processed: 0,
    originalSize: 0,
    optimizedSize: 0,
    errors: []
  };
  
  const processDirectory = async (inputDir, outputDir = inputDir) => {
    const entries = await fs.readdir(inputDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const inputPath = path.join(inputDir, entry.name);
      const outputPath = path.join(outputDir, entry.name);
      
      if (entry.isDirectory()) {
        await fs.mkdir(outputPath, { recursive: true });
        await processDirectory(inputPath, outputPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
        // Skip if targeting specific files and this isn't one of them
        if (targetFiles && !targetFiles.includes(inputPath)) {
          continue;
        }
        
        try {
          const originalStats = await fs.stat(inputPath);
          const originalSize = originalStats.size;
          
          console.log(`🔄 Optimizing: ${path.relative(IMAGES_DIR, inputPath)} (${Math.round(originalSize / 1024)}KB)`);
          
          // CONTEXT7 SOURCE: /imagemin/imagemin - Multi-format optimization pipeline
          // OPTIMIZATION REASON: Official imagemin patterns for JPEG and PNG compression with WebP generation
          const optimizedFiles = await imagemin([inputPath], {
            destination: path.dirname(outputPath),
            plugins: [
              // JPEG optimization
              imageminMozjpeg({
                quality: OPTIMIZATION_CONFIG.jpeg.quality,
                progressive: OPTIMIZATION_CONFIG.jpeg.progressive,
              }),
              // PNG optimization
              imageminPngquant({
                quality: OPTIMIZATION_CONFIG.png.quality,
                speed: OPTIMIZATION_CONFIG.png.speed,
              }),
            ],
          });
          
          if (optimizedFiles.length > 0) {
            const optimizedStats = await fs.stat(optimizedFiles[0].destinationPath);
            const optimizedSize = optimizedStats.size;
            const savings = originalSize - optimizedSize;
            const savingsPercent = Math.round((savings / originalSize) * 100);
            
            optimizationResults.processed++;
            optimizationResults.originalSize += originalSize;
            optimizationResults.optimizedSize += optimizedSize;
            
            console.log(`  ✅ Saved ${Math.round(savings / 1024)}KB (${savingsPercent}%)`);
            
            // Generate WebP version for modern browsers
            const webpOutput = path.join(path.dirname(outputPath), 
              path.basename(entry.name, path.extname(entry.name)) + '.webp');
            
            await imagemin([inputPath], {
              destination: path.dirname(webpOutput),
              plugins: [
                imageminWebp({
                  quality: OPTIMIZATION_CONFIG.webp.quality,
                  method: OPTIMIZATION_CONFIG.webp.method,
                }),
              ],
            });
            
            console.log(`  🎨 Generated WebP version`);
          }
          
        } catch (error) {
          console.error(`❌ Error optimizing ${inputPath}:`, error.message);
          optimizationResults.errors.push({
            file: inputPath,
            error: error.message
          });
        }
      }
    }
  };
  
  await processDirectory(IMAGES_DIR);
  
  return optimizationResults;
}

async function generateReport(analysis, optimizationResults) {
  console.log('\n📊 ASSET OPTIMIZATION REPORT\n');
  console.log('='.repeat(50));
  
  // Original Analysis
  console.log('📋 ORIGINAL ASSET ANALYSIS:');
  console.log(`Total Files: ${analysis.totalFiles}`);
  console.log(`Total Size: ${Math.round(analysis.totalSize / (1024 * 1024))}MB`);
  console.log(`Large Files (>5MB): ${analysis.largeFiles.length}`);
  console.log(`Medium Files (>1MB): ${analysis.mediumFiles.length}`);
  console.log(`Small Files (<1MB): ${analysis.smallFiles.length}`);
  
  console.log('\n📈 BY FORMAT:');
  Object.entries(analysis.byFormat).forEach(([format, data]) => {
    if (data.count > 0) {
      console.log(`${format.toUpperCase()}: ${data.count} files, ${Math.round(data.size / (1024 * 1024))}MB`);
    }
  });
  
  // Largest Files
  if (analysis.largeFiles.length > 0) {
    console.log('\n🔴 LARGEST FILES REQUIRING OPTIMIZATION:');
    analysis.largeFiles.slice(0, 10).forEach(file => {
      console.log(`  ${file.path} - ${file.sizeMB}MB`);
    });
  }
  
  // Optimization Results
  if (optimizationResults.processed > 0) {
    const totalSavings = optimizationResults.originalSize - optimizationResults.optimizedSize;
    const savingsPercent = Math.round((totalSavings / optimizationResults.originalSize) * 100);
    
    console.log('\n✅ OPTIMIZATION RESULTS:');
    console.log(`Files Processed: ${optimizationResults.processed}`);
    console.log(`Original Size: ${Math.round(optimizationResults.originalSize / (1024 * 1024))}MB`);
    console.log(`Optimized Size: ${Math.round(optimizationResults.optimizedSize / (1024 * 1024))}MB`);
    console.log(`Total Savings: ${Math.round(totalSavings / (1024 * 1024))}MB (${savingsPercent}%)`);
    
    if (optimizationResults.errors.length > 0) {
      console.log('\n⚠️  ERRORS:');
      optimizationResults.errors.forEach(error => {
        console.log(`  ${error.file}: ${error.error}`);
      });
    }
  }
  
  console.log('\n🎯 RECOMMENDATIONS:');
  if (analysis.largeFiles.length > 0) {
    console.log('• Prioritize optimizing files >5MB for immediate performance gains');
  }
  if (analysis.byFormat.png.size > analysis.byFormat.jpg.size) {
    console.log('• Consider converting decorative PNG images to JPG format');
  }
  console.log('• Implement responsive images with Next.js Image component sizes prop');
  console.log('• Use WebP versions for modern browsers with fallbacks');
  console.log('• Monitor Core Web Vitals for LCP improvements');
  
  console.log('\n='.repeat(50));
}

// Main execution
async function main() {
  try {
    console.log('🎯 MY PRIVATE TUTOR ONLINE - ASSET OPTIMIZATION');
    console.log('Enterprise-grade image optimization for royal client standards\n');
    
    // Create backup before optimization
    await createBackup();
    
    // Analyze current assets
    const analysis = await analyzeImages();
    
    // Target largest files first for maximum impact
    const targetFiles = analysis.largeFiles
      .concat(analysis.mediumFiles)
      .slice(0, 20) // Optimize top 20 largest files
      .map(file => file.fullPath);
    
    // Perform optimization
    const optimizationResults = targetFiles.length > 0 
      ? await optimizeImages(targetFiles)
      : { processed: 0, originalSize: 0, optimizedSize: 0, errors: [] };
    
    // Generate comprehensive report
    await generateReport(analysis, optimizationResults);
    
    console.log('\n🎉 Asset optimization completed successfully!');
    console.log('💡 Next steps: Deploy optimized assets and monitor performance improvements');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}