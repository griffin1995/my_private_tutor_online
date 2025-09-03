/**
 * CONTEXT7 SOURCE: /microsoft/playwright - JavaScript analysis script for video link identification
 * IMPLEMENTATION REASON: Quick analysis of video elements without full test suite overhead
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 ANALYZING VIDEO MASTERCLASSES PAGE FOR BROKEN VIDEO LINKS');
console.log('============================================================');

// Read the masterclass page file
const masterclassPagePath = path.join(__dirname, 'src/app/video-masterclasses/page.tsx');
const cmsImagesPath = path.join(__dirname, 'src/lib/cms/cms-images.ts');

let issues = [];

function analyzeFile(filePath, fileName) {
  console.log(`\n📄 Analyzing ${fileName}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find video-related elements
  const videoPatterns = [
    // Video source URLs
    { pattern: /videoUrl[:\s]*["']([^"']*)/g, name: 'Video URLs' },
    { pattern: /src[:\s]*["']([^"']*\.mp4[^"']*)/g, name: 'MP4 Video Sources' },
    
    // Payment URLs
    { pattern: /stripe\.com\/[a-zA-Z0-9]+/g, name: 'Stripe Payment URLs' },
    { pattern: /paymentUrl[:\s]*["']([^"']*)/g, name: 'Payment URLs' },
    
    // Thumbnail images
    { pattern: /thumbnailUrl[:\s]*["']([^"']*)/g, name: 'Thumbnail URLs' },
    { pattern: /poster[:\s]*["']([^"']*)/g, name: 'Video Poster Images' },
    
    // Video modal references
    { pattern: /handleVideoOpen\([^)]*\)/g, name: 'Video Modal Triggers' },
    { pattern: /getMasterclassVideo\([^)]*\)/g, name: 'CMS Video References' },
  ];
  
  videoPatterns.forEach(({ pattern, name }) => {
    const matches = [...content.matchAll(pattern)];
    if (matches.length > 0) {
      console.log(`\n🔍 ${name} (${matches.length} found):`);
      matches.forEach((match, index) => {
        const value = match[1] || match[0];
        console.log(`  ${index + 1}. ${value}`);
        
        // Check for common issues
        if (value === '' || value === '""' || value === "''") {
          issues.push({
            file: fileName,
            type: name,
            issue: 'Empty URL/reference',
            value: value,
            line: getLineNumber(content, match.index)
          });
        }
      });
    }
  });
}

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

function analyzeVideoData() {
  console.log('\n📊 ANALYZING CMS VIDEO DATA STRUCTURE');
  console.log('======================================');
  
  if (!fs.existsSync(cmsImagesPath)) {
    console.log('❌ CMS Images file not found');
    return;
  }
  
  const cmsContent = fs.readFileSync(cmsImagesPath, 'utf8');
  
  // Extract MASTERCLASS_VIDEOS object
  const masterclassMatch = cmsContent.match(/export const MASTERCLASS_VIDEOS = \{([\s\S]*?)\} as const;/);
  
  if (masterclassMatch) {
    const masterclassData = masterclassMatch[1];
    
    // Find video entries
    const videoEntries = masterclassData.match(/(\w+):\s*\{([\s\S]*?)\}/g);
    
    if (videoEntries) {
      console.log(`\n🎬 Found ${videoEntries.length} masterclass video entries:`);
      
      videoEntries.forEach((entry, index) => {
        const entryName = entry.match(/(\w+):/)[1];
        console.log(`\n${index + 1}. ${entryName}:`);
        
        // Check for video URL
        const videoUrlMatch = entry.match(/videoUrl[:\s]*["']([^"']*)/);
        const srcMatch = entry.match(/src[:\s]*["']([^"']*)/);
        
        const videoUrl = videoUrlMatch ? videoUrlMatch[1] : '';
        const src = srcMatch ? srcMatch[1] : '';
        
        console.log(`   📹 Video URL: ${videoUrl || 'EMPTY'}`);
        console.log(`   📁 Source: ${src || 'EMPTY'}`);
        
        if (!videoUrl && !src) {
          issues.push({
            file: 'CMS Images',
            type: 'Masterclass Video',
            issue: 'Missing video URL and source',
            value: entryName,
          });
        } else if (!videoUrl) {
          issues.push({
            file: 'CMS Images',
            type: 'Masterclass Video',
            issue: 'Missing videoUrl property',
            value: entryName,
          });
        }
        
        // Check for payment URL
        const paymentUrlMatch = entry.match(/paymentUrl[:\s]*["']([^"']*)/);
        if (paymentUrlMatch) {
          const paymentUrl = paymentUrlMatch[1];
          console.log(`   💳 Payment URL: ${paymentUrl}`);
          
          if (!paymentUrl.includes('stripe.com')) {
            issues.push({
              file: 'CMS Images',
              type: 'Payment URL',
              issue: 'Invalid payment URL format (not Stripe)',
              value: paymentUrl,
            });
          }
        }
        
        // Check for thumbnail
        const thumbnailMatch = entry.match(/thumbnailUrl[:\s]*["']([^"']*)/);
        if (thumbnailMatch) {
          const thumbnailUrl = thumbnailMatch[1];
          console.log(`   🖼️ Thumbnail: ${thumbnailUrl}`);
          
          if (!thumbnailUrl || thumbnailUrl === '') {
            issues.push({
              file: 'CMS Images',
              type: 'Thumbnail URL',
              issue: 'Empty thumbnail URL',
              value: entryName,
            });
          }
        }
      });
    }
  }
}

function checkVideoFiles() {
  console.log('\n📁 CHECKING VIDEO FILE EXISTENCE');
  console.log('=================================');
  
  const videoDir = path.join(__dirname, 'public/videos');
  const thumbnailDir = path.join(__dirname, 'public/images/masterclass-thumbnails');
  
  console.log(`\n📂 Video directory: ${videoDir}`);
  if (fs.existsSync(videoDir)) {
    const videoFiles = fs.readdirSync(videoDir);
    console.log(`   Found ${videoFiles.length} files:`);
    videoFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
  } else {
    console.log('   ❌ Video directory does not exist');
  }
  
  console.log(`\n📂 Thumbnail directory: ${thumbnailDir}`);
  if (fs.existsSync(thumbnailDir)) {
    const thumbnailFiles = fs.readdirSync(thumbnailDir);
    console.log(`   Found ${thumbnailFiles.length} files:`);
    thumbnailFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
  } else {
    console.log('   ❌ Thumbnail directory does not exist');
    issues.push({
      file: 'File System',
      type: 'Directory',
      issue: 'Missing masterclass thumbnails directory',
      value: thumbnailDir,
    });
  }
}

function generateReport() {
  console.log('\n📊 COMPREHENSIVE VIDEO LINK ANALYSIS REPORT');
  console.log('===========================================');
  
  if (issues.length === 0) {
    console.log('✅ No obvious issues found in static analysis!');
    console.log('ℹ️  Note: This is a static analysis. Dynamic testing recommended.');
    return;
  }
  
  console.log(`⚠️ Found ${issues.length} potential issues:`);
  
  // Group issues by type
  const issuesByType = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {});
  
  Object.entries(issuesByType).forEach(([type, typeIssues]) => {
    console.log(`\n🔍 ${type} Issues (${typeIssues.length}):`);
    typeIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue.issue}`);
      console.log(`     File: ${issue.file}`);
      console.log(`     Value: ${issue.value}`);
      if (issue.line) console.log(`     Line: ~${issue.line}`);
    });
  });
  
  console.log('\n🔧 RECOMMENDED FIXES:');
  console.log('======================');
  
  if (issues.some(i => i.issue.includes('Empty URL'))) {
    console.log('1. Add valid video source URLs to empty videoUrl properties');
  }
  
  if (issues.some(i => i.issue.includes('Missing video URL'))) {
    console.log('2. Implement video file upload and URL assignment for masterclasses');
  }
  
  if (issues.some(i => i.issue.includes('thumbnail'))) {
    console.log('3. Create masterclass thumbnail images and proper directory structure');
  }
  
  if (issues.some(i => i.issue.includes('payment'))) {
    console.log('4. Verify and correct Stripe payment URL formats');
  }
  
  console.log('5. Run dynamic Playwright tests for comprehensive validation');
  console.log('6. Test video modal functionality and player integration');
  console.log('7. Verify all CTA buttons have proper click handlers');
}

// Run analysis
try {
  analyzeFile(masterclassPagePath, 'video-masterclasses/page.tsx');
  analyzeVideoData();
  checkVideoFiles();
  generateReport();
} catch (error) {
  console.error('❌ Analysis failed:', error.message);
}

console.log('\n🎯 ANALYSIS COMPLETE - Ready for systematic fixes!');
console.log('==================================================');