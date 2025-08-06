// CONTEXT7 SOURCE: /reactjs/react.dev - React cache function performance testing patterns
// CONTEXT7 SOURCE: /vercel/next.js - Server Components cache validation strategies
// CMS Cache Performance Test Suite

import { 
  getTestimonials,
  getTestimonialsSchools, 
  getTrustIndicators,
  getUnifiedContact,
  getSiteHeader,
  getSiteBranding,
  getHeroContent,
  getFooterContent,
  getMainNavigation,
  getResultsStatistics
} from '@/lib/cms/cms-content'

import {
  getMainLogo,
  getScrollingSchoolLogos
} from '@/lib/cms/cms-images'

/**
 * Performance test for cached CMS functions
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() memoizes function results for performance optimization
 */
export interface CacheTestResult {
  functionName: string
  firstCallTime: number
  secondCallTime: number
  speedImprovement: number
  cacheHit: boolean
}

/**
 * Test a cached function's performance
 */
export function testCachedFunction(
  functionName: string, 
  func: () => any
): CacheTestResult {
  // First call - should execute the function
  const startTime1 = performance.now()
  const result1 = func()
  const endTime1 = performance.now()
  const firstCallTime = endTime1 - startTime1

  // Second call - should return cached result
  const startTime2 = performance.now()
  const result2 = func()
  const endTime2 = performance.now()
  const secondCallTime = endTime2 - startTime2

  // Verify cache hit (results should be identical references)
  const cacheHit = result1 === result2

  const speedImprovement = firstCallTime > 0 
    ? Math.round(((firstCallTime - secondCallTime) / firstCallTime) * 100)
    : 0

  return {
    functionName,
    firstCallTime,
    secondCallTime,
    speedImprovement,
    cacheHit
  }
}

/**
 * Run comprehensive cache performance tests
 */
export function runCachePerformanceTests(): CacheTestResult[] {
  const results: CacheTestResult[] = []

  // Test top 10 cached CMS functions
  const testFunctions = [
    { name: 'getTestimonials', func: getTestimonials },
    { name: 'getTestimonialsSchools', func: getTestimonialsSchools },
    { name: 'getTrustIndicators', func: getTrustIndicators },
    { name: 'getMainLogo', func: getMainLogo },
    { name: 'getUnifiedContact', func: getUnifiedContact },
    { name: 'getSiteHeader', func: getSiteHeader },
    { name: 'getSiteBranding', func: getSiteBranding },
    { name: 'getScrollingSchoolLogos', func: getScrollingSchoolLogos },
    { name: 'getHeroContent', func: getHeroContent },
    { name: 'getFooterContent', func: getFooterContent },
    { name: 'getMainNavigation', func: getMainNavigation },
    { name: 'getResultsStatistics', func: getResultsStatistics }
  ]

  for (const testFunc of testFunctions) {
    const result = testCachedFunction(testFunc.name, testFunc.func)
    results.push(result)
  }

  return results
}

/**
 * Generate cache performance report
 */
export function generateCacheReport(results: CacheTestResult[]): string {
  let report = '# CMS Cache Performance Report\n\n'
  report += '## React cache() Implementation Results\n\n'
  report += 'CONTEXT7 SOURCE: /reactjs/react.dev - cache() performance optimization validation\n\n'
  
  report += '| Function Name | First Call (ms) | Second Call (ms) | Speed Improvement | Cache Hit |\n'
  report += '|---------------|-----------------|------------------|-------------------|------------|\n'
  
  for (const result of results) {
    report += `| ${result.functionName} | ${result.firstCallTime.toFixed(3)} | ${result.secondCallTime.toFixed(3)} | ${result.speedImprovement}% | ${result.cacheHit ? '✅' : '❌'} |\n`
  }
  
  const averageImprovement = results.reduce((sum, r) => sum + r.speedImprovement, 0) / results.length
  const cacheHitRate = (results.filter(r => r.cacheHit).length / results.length) * 100
  
  report += '\n## Summary\n\n'
  report += `- **Average Speed Improvement**: ${averageImprovement.toFixed(1)}%\n`
  report += `- **Cache Hit Rate**: ${cacheHitRate.toFixed(1)}%\n`
  report += `- **Functions Tested**: ${results.length}\n`
  report += `- **All Cache Hits**: ${cacheHitRate === 100 ? '✅' : '❌'}\n\n`
  
  report += '## Performance Impact\n\n'
  report += 'CONTEXT7 SOURCE: /reactjs/react.dev - cache() eliminates redundant function calls\n\n'
  report += '- Cached functions prevent repeated JSON parsing\n'
  report += '- Memoized results improve component render performance\n'
  report += '- Server Components benefit from request-scoped caching\n'
  report += '- Memory usage optimized through React\'s cache invalidation\n\n'
  
  return report
}

/**
 * Run and display cache performance test
 */
export function displayCachePerformanceTest(): void {
  console.log('🚀 Running CMS Cache Performance Tests...')
  
  const results = runCachePerformanceTests()
  const report = generateCacheReport(results)
  
  console.log(report)
  
  // Validate all functions are properly cached
  const allCacheHits = results.every(r => r.cacheHit)
  if (allCacheHits) {
    console.log('✅ All CMS functions are properly cached!')
  } else {
    console.error('❌ Some functions are not cached properly')
    const failedFunctions = results.filter(r => !r.cacheHit).map(r => r.functionName)
    console.error('Failed functions:', failedFunctions.join(', '))
  }
}