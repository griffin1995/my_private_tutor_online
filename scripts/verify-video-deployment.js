#!/usr/bin/env node

/**
 * CONTEXT7 SOURCE: /node/fs - File system verification script
 * PURPOSE: Verify video files are properly tracked and ready for deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🎬 VIDEO DEPLOYMENT VERIFICATION SCRIPT');
console.log('======================================\n');

const videosDir = path.join(__dirname, '../public/videos');
const requiredVideos = [
  'students-testimonials-2025.mp4',
  'parents-testimonials-2025.mp4'
];

console.log('📂 Checking video directory:', videosDir);
console.log('📋 Required videos:', requiredVideos.join(', '));
console.log('');

// Check if videos directory exists
if (!fs.existsSync(videosDir)) {
  console.error('❌ ERROR: Videos directory not found!');
  process.exit(1);
}

// List all video files
const allFiles = fs.readdirSync(videosDir);
const videoFiles = allFiles.filter(file => file.endsWith('.mp4'));

console.log('📹 Found video files:');
videoFiles.forEach(file => {
  const filePath = path.join(videosDir, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`  ✅ ${file} (${sizeInMB} MB)`);
});

console.log('');

// Check required videos
let allRequiredFound = true;
requiredVideos.forEach(video => {
  if (videoFiles.includes(video)) {
    console.log(`✅ Required video found: ${video}`);
  } else {
    console.log(`❌ Required video MISSING: ${video}`);
    allRequiredFound = false;
  }
});

console.log('');

if (allRequiredFound) {
  console.log('🎉 SUCCESS: All required testimonial videos are present and ready for deployment!');
  console.log('');
  console.log('📝 DEPLOYMENT URLS:');
  requiredVideos.forEach(video => {
    console.log(`   https://your-domain.vercel.app/videos/${video}`);
  });
} else {
  console.log('💥 FAILURE: Some required videos are missing!');
  process.exit(1);
}

console.log('');
console.log('🔍 Next steps:');
console.log('1. Commit any pending changes');
console.log('2. Deploy to Vercel');
console.log('3. Test video URLs in production');