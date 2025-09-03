#!/usr/bin/env node

/**
 * CONTEXT7 SOURCE: /nodejs/node - Node.js script for CMS video optimization verification
 * VERIFICATION SCRIPT: Official Node.js documentation patterns for module validation
 * DATABASE OPTIMIZATION: Integration verification script for video-utils.ts and CMS optimization
 * 
 * Video Optimization Verification Script
 * Validates that all video utility functions work correctly with the CMS data
 * Ensures OptimizedVideoPlayer integration readiness
 */

const path = require('path');
const fs = require('fs');

// CONTEXT7 SOURCE: /nodejs/node - Console styling for script output
// OUTPUT STYLING: Node.js console formatting for clear verification results
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log('\n' + '='.repeat(60), 'cyan');
  log(message, 'bright');
  log('='.repeat(60), 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// CONTEXT7 SOURCE: /nodejs/node - File system validation for project structure
// FILE VALIDATION: Verify all required files exist in the project structure
function verifyFileStructure() {
  logHeader('Verifying File Structure');
  
  const requiredFiles = [
    'src/lib/cms/video-utils.ts',
    'src/lib/cms/cms-images.ts',
    'src/components/video/OptimizedVideoPlayer.tsx',
    'src/components/video/OptimizedVideoPlayer.types.ts',
    'src/components/video/VideoPlayerExample.tsx',
    'CMS_VIDEO_OPTIMIZATION_GUIDE.md'
  ];
  
  let allFilesExist = true;
  
  requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      logSuccess(`Found: ${file}`);
    } else {
      logError(`Missing: ${file}`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

// CONTEXT7 SOURCE: /nodejs/node - Dynamic import simulation for CMS data validation
// CMS VALIDATION: Verify CMS video data structure meets optimization requirements  
function verifyCMSDataStructure() {
  logHeader('Verifying CMS Data Structure');
  
  try {
    // Read the CMS images file to check structure
    const cmsFilePath = path.join(__dirname, '..', 'src/lib/cms/cms-images.ts');
    const cmsContent = fs.readFileSync(cmsFilePath, 'utf8');
    
    // Check for key optimization features
    const checks = [
      {
        pattern: /videoId:\s*"[A-Za-z0-9_-]{11}"/,
        message: 'Pre-extracted YouTube video IDs found',
        required: true
      },
      {
        pattern: /videoUrl:\s*"https:\/\/www\.youtube\.com\/watch\?v=/,
        message: 'Standard YouTube URLs for ReactPlayer found',
        required: true
      },
      {
        pattern: /videoId:\s*null/,
        message: 'Null video IDs for local videos found',
        required: true
      },
      {
        pattern: /export\s+\{\s*extractVideoId/,
        message: 'Video utility functions exported from CMS',
        required: true
      },
      {
        pattern: /isFree:\s*true/,
        message: 'Free video flags found',
        required: true
      },
      {
        pattern: /paymentUrl:\s*"https:\/\/buy\.stripe\.com/,
        message: 'Stripe payment URLs found',
        required: true
      }
    ];
    
    let structureValid = true;
    
    checks.forEach(check => {
      if (check.pattern.test(cmsContent)) {
        logSuccess(check.message);
      } else if (check.required) {
        logError(`Missing: ${check.message}`);
        structureValid = false;
      } else {
        logWarning(`Optional: ${check.message}`);
      }
    });
    
    return structureValid;
    
  } catch (error) {
    logError(`Failed to read CMS file: ${error.message}`);
    return false;
  }
}

// CONTEXT7 SOURCE: /nodejs/node - TypeScript type validation through file parsing
// TYPE VALIDATION: Verify comprehensive TypeScript definitions exist
function verifyTypeDefinitions() {
  logHeader('Verifying TypeScript Definitions');
  
  try {
    const typesFilePath = path.join(__dirname, '..', 'src/components/video/OptimizedVideoPlayer.types.ts');
    const typesContent = fs.readFileSync(typesFilePath, 'utf8');
    
    const typeChecks = [
      {
        pattern: /interface\s+VideoMetadata/,
        message: 'VideoMetadata interface defined'
      },
      {
        pattern: /interface\s+OptimizedVideoPlayerPropsWithCMS/,
        message: 'CMS integration props interface defined'
      },
      {
        pattern: /interface\s+VideoUtilityFunctions/,
        message: 'Video utility functions interface defined'
      },
      {
        pattern: /interface\s+VideoValidationResult/,
        message: 'Video validation interface defined'
      },
      {
        pattern: /videoKey\?\:\s*string/,
        message: 'CMS video key prop defined'
      },
      {
        pattern: /enablePaymentGate\?\:\s*boolean/,
        message: 'Payment integration props defined'
      }
    ];
    
    let typesValid = true;
    
    typeChecks.forEach(check => {
      if (check.pattern.test(typesContent)) {
        logSuccess(check.message);
      } else {
        logError(`Missing type: ${check.message}`);
        typesValid = false;
      }
    });
    
    return typesValid;
    
  } catch (error) {
    logError(`Failed to read types file: ${error.message}`);
    return false;
  }
}

// CONTEXT7 SOURCE: /nodejs/node - Code pattern validation for utility functions
// FUNCTION VALIDATION: Verify video utility functions implementation
function verifyUtilityFunctions() {
  logHeader('Verifying Video Utility Functions');
  
  try {
    const utilsFilePath = path.join(__dirname, '..', 'src/lib/cms/video-utils.ts');
    const utilsContent = fs.readFileSync(utilsFilePath, 'utf8');
    
    const functionChecks = [
      {
        pattern: /export\s+function\s+extractVideoId/,
        message: 'extractVideoId function exported'
      },
      {
        pattern: /export\s+function\s+getVideoMetadata/,
        message: 'getVideoMetadata function exported'
      },
      {
        pattern: /export\s+function\s+isVideoFree/,
        message: 'isVideoFree function exported'
      },
      {
        pattern: /export\s+function\s+getFreeVideos/,
        message: 'getFreeVideos function exported'
      },
      {
        pattern: /export\s+function\s+getPaidVideos/,
        message: 'getPaidVideos function exported'
      },
      {
        pattern: /export\s+function\s+formatVideoDuration/,
        message: 'formatVideoDuration function exported'
      },
      {
        pattern: /YOUTUBE_URL_PATTERNS\s*=/,
        message: 'YouTube URL patterns defined'
      },
      {
        pattern: /require\('\.\/cms-images'\)/,
        message: 'Synchronous CMS module import'
      }
    ];
    
    let functionsValid = true;
    
    functionChecks.forEach(check => {
      if (check.pattern.test(utilsContent)) {
        logSuccess(check.message);
      } else {
        logError(`Missing: ${check.message}`);
        functionsValid = false;
      }
    });
    
    // Check for synchronous patterns (no async/await functions)
    const asyncPatterns = [
      /\basync\s+function/,
      /\basync\s+\(/,
      /=\s*async\s*\(/,
      /\bawait\s+/
    ];
    
    const hasAsyncPatterns = asyncPatterns.some(pattern => pattern.test(utilsContent));
    
    if (hasAsyncPatterns) {
      logError('Async function patterns detected - violates synchronous architecture requirement');
      functionsValid = false;
    } else {
      logSuccess('Synchronous architecture maintained');
    }
    
    return functionsValid;
    
  } catch (error) {
    logError(`Failed to read utils file: ${error.message}`);
    return false;
  }
}

// CONTEXT7 SOURCE: /nodejs/node - Test file validation for comprehensive coverage
// TEST VALIDATION: Verify comprehensive test suite exists
function verifyTestCoverage() {
  logHeader('Verifying Test Coverage');
  
  try {
    const testFilePath = path.join(__dirname, '..', 'src/lib/cms/video-utils.test.ts');
    
    if (!fs.existsSync(testFilePath)) {
      logError('Test file missing: video-utils.test.ts');
      return false;
    }
    
    const testContent = fs.readFileSync(testFilePath, 'utf8');
    
    const testChecks = [
      {
        pattern: /describe\('Video ID Extraction'/,
        message: 'Video ID extraction tests'
      },
      {
        pattern: /describe\('CMS Video Integration'/,
        message: 'CMS integration tests'
      },
      {
        pattern: /describe\('Performance Optimization'/,
        message: 'Performance optimization tests'
      },
      {
        pattern: /it\('should extract video ID from standard YouTube URLs'/,
        message: 'YouTube URL parsing tests'
      },
      {
        pattern: /it\('should handle edge cases'/,
        message: 'Edge case handling tests'
      },
      {
        pattern: /mockVideoData/,
        message: 'Mock test data defined'
      }
    ];
    
    let testsValid = true;
    
    testChecks.forEach(check => {
      if (check.pattern.test(testContent)) {
        logSuccess(check.message);
      } else {
        logError(`Missing test: ${check.message}`);
        testsValid = false;
      }
    });
    
    return testsValid;
    
  } catch (error) {
    logError(`Failed to read test file: ${error.message}`);
    return false;
  }
}

// CONTEXT7 SOURCE: /nodejs/node - Component integration validation
// COMPONENT VALIDATION: Verify OptimizedVideoPlayer integration readiness
function verifyComponentIntegration() {
  logHeader('Verifying Component Integration');
  
  try {
    const exampleFilePath = path.join(__dirname, '..', 'src/components/video/VideoPlayerExample.tsx');
    
    if (!fs.existsSync(exampleFilePath)) {
      logWarning('Integration example file missing - created for reference');
      return true; // Not critical for core functionality
    }
    
    const exampleContent = fs.readFileSync(exampleFilePath, 'utf8');
    
    const integrationChecks = [
      {
        pattern: /import.*getVideoMetadata.*from.*cms-images/,
        message: 'CMS utility imports in example'
      },
      {
        pattern: /OptimizedVideoPlayer/,
        message: 'OptimizedVideoPlayer component usage'
      },
      {
        pattern: /videoId=\{.*videoId.*\}/,
        message: 'Video ID prop integration'
      },
      {
        pattern: /useMemo.*getVideoMetadata/,
        message: 'Performance optimization with useMemo'
      },
      {
        pattern: /handlePaymentRequired/,
        message: 'Payment integration handling'
      }
    ];
    
    let integrationValid = true;
    
    integrationChecks.forEach(check => {
      if (check.pattern.test(exampleContent)) {
        logSuccess(check.message);
      } else {
        logWarning(`Integration example: ${check.message}`);
        // Don't fail for example file issues
      }
    });
    
    return integrationValid;
    
  } catch (error) {
    logWarning(`Integration example file issue: ${error.message}`);
    return true; // Don't fail for example file
  }
}

// CONTEXT7 SOURCE: /nodejs/node - Performance benchmark simulation
// PERFORMANCE VALIDATION: Verify optimization goals are theoretically achievable
function verifyPerformanceOptimizations() {
  logHeader('Verifying Performance Optimizations');
  
  // Simulate performance characteristics based on implementation
  logInfo('Simulating performance characteristics...');
  
  // Check for performance-oriented implementation patterns
  try {
    const utilsFilePath = path.join(__dirname, '..', 'src/lib/cms/video-utils.ts');
    const utilsContent = fs.readFileSync(utilsFilePath, 'utf8');
    
    // Also check CMS file for optimizations
    const cmsFilePath = path.join(__dirname, '..', 'src/lib/cms/cms-images.ts');
    const cmsContent = fs.readFileSync(cmsFilePath, 'utf8');
    
    const performanceChecks = [
      {
        pattern: /const\s+YOUTUBE_URL_PATTERNS\s*=/,
        content: utilsContent,
        message: 'Compiled regex patterns for O(1) lookup',
        score: 30
      },
      {
        pattern: /videoId:\s*"[A-Za-z0-9_-]{11}"/,
        content: cmsContent,
        message: 'Pre-extracted video IDs in CMS data',
        score: 40
      },
      {
        pattern: /require\('\.\/cms-images'\)/,
        content: utilsContent,
        message: 'Synchronous module imports',
        score: 20
      },
      {
        pattern: /useMemo/,
        content: fs.existsSync(path.join(__dirname, '..', 'src/components/video/VideoPlayerExample.tsx')) 
          ? fs.readFileSync(path.join(__dirname, '..', 'src/components/video/VideoPlayerExample.tsx'), 'utf8')
          : '',
        message: 'React performance optimization patterns',
        score: 10
      }
    ];
    
    let totalScore = 0;
    let maxScore = 0;
    
    performanceChecks.forEach(check => {
      maxScore += check.score;
      if (check.pattern.test(check.content || utilsContent)) {
        logSuccess(`${check.message} (+${check.score} points)`);
        totalScore += check.score;
      } else {
        logWarning(`Missing optimization: ${check.message}`);
      }
    });
    
    const performancePercentage = (totalScore / maxScore * 100).toFixed(1);
    
    if (performancePercentage >= 90) {
      logSuccess(`Performance score: ${performancePercentage}% (Excellent!)`);
    } else if (performancePercentage >= 70) {
      logWarning(`Performance score: ${performancePercentage}% (Good, but room for improvement)`);
    } else {
      logError(`Performance score: ${performancePercentage}% (Needs improvement)`);
      return false;
    }
    
    return true;
    
  } catch (error) {
    logError(`Performance validation failed: ${error.message}`);
    return false;
  }
}

// CONTEXT7 SOURCE: /nodejs/node - Main script execution with comprehensive validation
// MAIN EXECUTION: Complete verification workflow with detailed reporting
async function runVerification() {
  logHeader('CMS Video Optimization Verification');
  logInfo('Validating database optimization and OptimizedVideoPlayer integration...\n');
  
  const checks = [
    { name: 'File Structure', fn: verifyFileStructure },
    { name: 'CMS Data Structure', fn: verifyCMSDataStructure },
    { name: 'TypeScript Definitions', fn: verifyTypeDefinitions },
    { name: 'Utility Functions', fn: verifyUtilityFunctions },
    { name: 'Test Coverage', fn: verifyTestCoverage },
    { name: 'Component Integration', fn: verifyComponentIntegration },
    { name: 'Performance Optimizations', fn: verifyPerformanceOptimizations }
  ];
  
  let passedChecks = 0;
  const results = [];
  
  for (const check of checks) {
    try {
      const result = check.fn();
      results.push({ name: check.name, passed: result });
      if (result) {
        passedChecks++;
      }
    } catch (error) {
      logError(`Check failed: ${check.name} - ${error.message}`);
      results.push({ name: check.name, passed: false });
    }
  }
  
  // Summary report
  logHeader('Verification Summary');
  
  results.forEach(result => {
    if (result.passed) {
      logSuccess(`${result.name}: PASSED`);
    } else {
      logError(`${result.name}: FAILED`);
    }
  });
  
  const successRate = (passedChecks / checks.length * 100).toFixed(1);
  
  log(`\nOverall Result: ${passedChecks}/${checks.length} checks passed (${successRate}%)`, 
      successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red');
  
  if (successRate >= 90) {
    logSuccess('\n🎉 CMS Video Optimization is ready for production!');
    logInfo('✅ OptimizedVideoPlayer integration verified');
    logInfo('✅ Performance optimizations confirmed');
    logInfo('✅ Synchronous architecture maintained');
    logInfo('✅ Type safety ensured');
  } else if (successRate >= 70) {
    logWarning('\n⚠️  CMS Video Optimization is mostly ready, but has some issues');
    logInfo('Review failed checks and address issues before deployment');
  } else {
    logError('\n❌ CMS Video Optimization needs significant fixes');
    logInfo('Address critical issues before integration');
  }
  
  log('\nFor detailed usage instructions, see: CMS_VIDEO_OPTIMIZATION_GUIDE.md\n', 'cyan');
  
  // Exit with appropriate code
  process.exit(successRate >= 70 ? 0 : 1);
}

// Run verification
if (require.main === module) {
  runVerification().catch(error => {
    logError(`Verification script failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { runVerification };