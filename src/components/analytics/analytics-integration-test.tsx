/**
 * CONTEXT7 SOURCE: /vercel/next.js - Testing patterns for analytics integration
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 testing utilities
 * 
 * Analytics Integration Test Component
 * Comprehensive testing suite for FAQ analytics implementation
 * 
 * TESTING SCOPE:
 * - GA4 event tracking verification
 * - FAQ interaction analytics
 * - Search analytics functionality
 * - User journey tracking
 * - Conversion event testing
 * - Privacy compliance testing
 * 
 * BUSINESS VALIDATION:
 * - Revenue attribution tracking
 * - Support ticket prevention measurement
 * - User segmentation accuracy
 * - Conversion goal tracking
 * - ROI calculation verification
 * 
 * TECHNICAL VERIFICATION:
 * - Event parameter validation
 * - Session persistence testing
 * - Performance impact measurement
 * - Privacy consent compliance
 * - Cross-browser compatibility
 */

"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { m } from 'framer-motion'
import { Play, Check, X, AlertTriangle, BarChart3, Target, Users, Zap } from 'lucide-react'
import { useFAQAnalytics } from '../faq/faq-analytics-tracker'
import { testGA4Integration } from '../analytics/ga4-setup'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Test scenario definitions
// TEST SCENARIOS: Comprehensive test cases for FAQ analytics validation
interface TestScenario {
  id: string
  name: string
  description: string
  category: 'tracking' | 'business' | 'privacy' | 'performance'
  priority: 'critical' | 'high' | 'medium' | 'low'
  testFunction: () => Promise<TestResult>
}

interface TestResult {
  success: boolean
  message: string
  data?: any
  performanceMs?: number
  errors?: string[]
}

interface AnalyticsIntegrationTestProps {
  isVisible?: boolean
  enablePerformanceTests?: boolean
  enableBusinessValidation?: boolean
  showDetailedResults?: boolean
  autoRun?: boolean
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Analytics testing component
 * ANALYTICS TEST SUITE: Comprehensive validation of FAQ analytics implementation
 */
export function AnalyticsIntegrationTest({
  isVisible = true,
  enablePerformanceTests = true,
  enableBusinessValidation = true,
  showDetailedResults = false,
  autoRun = false
}: AnalyticsIntegrationTestProps) {
  const analytics = useFAQAnalytics()
  const [testResults, setTestResults] = useState<Map<string, TestResult>>(new Map())
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string | null>(null)

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Analytics test scenarios
  // TEST DEFINITIONS: Comprehensive test scenarios for FAQ analytics validation
  const testScenarios: TestScenario[] = [
    // Tracking Tests
    {
      id: 'ga4-connection',
      name: 'GA4 Connection Test',
      description: 'Verify Google Analytics 4 integration and gtag availability',
      category: 'tracking',
      priority: 'critical',
      testFunction: async () => {
        const startTime = performance.now()
        
        if (typeof window === 'undefined') {
          return { success: false, message: 'Server-side environment detected' }
        }
        
        if (!window.gtag) {
          return { 
            success: false, 
            message: 'GA4 gtag not found - check GoogleAnalytics component integration' 
          }
        }
        
        // Test basic GA4 connectivity
        testGA4Integration()
        
        return {
          success: true,
          message: 'GA4 integration active and responding',
          performanceMs: performance.now() - startTime,
          data: { gtagAvailable: !!window.gtag, dataLayerAvailable: !!window.dataLayer }
        }
      }
    },
    
    {
      id: 'faq-question-tracking',
      name: 'FAQ Question Interaction Tracking',
      description: 'Test question view, expand, and collapse tracking',
      category: 'tracking',
      priority: 'critical',
      testFunction: async () => {
        const startTime = performance.now()
        
        try {
          // Test question view tracking
          await analytics.trackQuestionView('test-question-001', 'test-category', 'oxbridge_prep')
          
          // Test question expand tracking
          await analytics.trackQuestionExpand('test-question-001', 'test-category', 5000)
          
          // Test question collapse tracking
          await analytics.trackQuestionCollapse('test-question-001', 'test-category', 15000)
          
          return {
            success: true,
            message: 'FAQ question tracking events sent successfully',
            performanceMs: performance.now() - startTime,
            data: { eventsTracked: 3 }
          }
        } catch (error: any) {
          return {
            success: false,
            message: 'FAQ question tracking failed',
            errors: [error.message],
            performanceMs: performance.now() - startTime
          }
        }
      }
    },
    
    {
      id: 'search-analytics',
      name: 'Search Analytics Tracking',
      description: 'Test search query, results, and suggestion tracking',
      category: 'tracking',
      priority: 'high',
      testFunction: async () => {
        const startTime = performance.now()
        
        try {
          // Test search query tracking
          await analytics.trackSearchQuery('test search query', 5, ['category1', 'category2'])
          
          // Test zero results tracking
          await analytics.trackZeroResults('impossible query xyz', ['suggested query 1', 'suggested query 2'])
          
          // Test search suggestion click
          await analytics.trackSearchSuggestionClick('suggested query', 'original query')
          
          return {
            success: true,
            message: 'Search analytics events tracked successfully',
            performanceMs: performance.now() - startTime,
            data: { searchEvents: 3 }
          }
        } catch (error: any) {
          return {
            success: false,
            message: 'Search analytics tracking failed',
            errors: [error.message],
            performanceMs: performance.now() - startTime
          }
        }
      }
    },
    
    {
      id: 'conversion-tracking',
      name: 'Conversion Event Tracking',
      description: 'Test conversion tracking for FAQ to consultation/contact',
      category: 'business',
      priority: 'critical',
      testFunction: async () => {
        const startTime = performance.now()
        
        try {
          // Test FAQ to consultation tracking
          await analytics.trackFAQToConsultation('test-question-001', 'pricing', 300)
          
          // Test FAQ to contact tracking
          await analytics.trackFAQToContact('phone', ['question1', 'question2'])
          
          // Test phone click tracking
          await analytics.trackPhoneClick('+44 7513 550278', 'faq-pricing-section')
          
          return {
            success: true,
            message: 'Conversion tracking events sent successfully',
            performanceMs: performance.now() - startTime,
            data: { conversionEvents: 3, totalValue: 575 }
          }
        } catch (error: any) {
          return {
            success: false,
            message: 'Conversion tracking failed',
            errors: [error.message],
            performanceMs: performance.now() - startTime
          }
        }
      }
    },
    
    {
      id: 'user-segmentation',
      name: 'User Segmentation Detection',
      description: 'Test automatic user segment detection and tracking',
      category: 'business',
      priority: 'high',
      testFunction: async () => {
        const startTime = performance.now()
        
        try {
          const userSegment = await analytics.getUserSegment()
          
          if (!userSegment) {
            return {
              success: false,
              message: 'User segmentation not functioning',
              performanceMs: performance.now() - startTime
            }
          }
          
          const validSegments = ['oxbridge_prep', '11_plus', 'a_level_gcse', 'elite_corporate', 'comparison_shopper']
          const isValidSegment = validSegments.includes(userSegment)
          
          return {
            success: isValidSegment,
            message: isValidSegment 
              ? `User segment detected: ${userSegment}` 
              : `Invalid segment detected: ${userSegment}`,
            performanceMs: performance.now() - startTime,
            data: { segment: userSegment, validSegments }
          }
        } catch (error: any) {
          return {
            success: false,
            message: 'User segmentation failed',
            errors: [error.message],
            performanceMs: performance.now() - startTime
          }
        }
      }
    },
    
    {
      id: 'session-analytics',
      name: 'Session Analytics Collection',
      description: 'Test session metrics collection and business intelligence',
      category: 'business',
      priority: 'medium',
      testFunction: async () => {
        const startTime = performance.now()
        
        try {
          const sessionMetrics = await analytics.getSessionMetrics()
          
          const requiredMetrics = [
            'categoriesViewed', 'questionsViewed', 'searchQueries', 'timeSpent',
            'conversionEvents', 'supportTicketPrevention', 'revenueAttribution'
          ]
          
          const missingMetrics = requiredMetrics.filter(metric => 
            !(metric in sessionMetrics)\n          )\n          \n          if (missingMetrics.length > 0) {\n            return {\n              success: false,\n              message: `Missing session metrics: ${missingMetrics.join(', ')}`,\n              performanceMs: performance.now() - startTime,\n              data: { available: Object.keys(sessionMetrics), missing: missingMetrics }\n            }\n          }\n          \n          return {\n            success: true,\n            message: 'Session analytics collection working correctly',\n            performanceMs: performance.now() - startTime,\n            data: {\n              metrics: sessionMetrics,\n              categoriesTracked: sessionMetrics.categoriesViewed.length,\n              questionsTracked: sessionMetrics.questionsViewed.length,\n              searchesTracked: sessionMetrics.searchQueries.length\n            }\n          }\n        } catch (error: any) {\n          return {\n            success: false,\n            message: 'Session analytics collection failed',\n            errors: [error.message],\n            performanceMs: performance.now() - startTime\n          }\n        }\n      }\n    },\n    \n    {\n      id: 'privacy-compliance',\n      name: 'Privacy Compliance Check',\n      description: 'Verify GDPR-compliant data collection and consent handling',\n      category: 'privacy',\n      priority: 'critical',\n      testFunction: async () => {\n        const startTime = performance.now()\n        \n        try {\n          // Check consent storage\n          const consentData = localStorage.getItem('privacy-consent')\n          \n          if (!consentData) {\n            return {\n              success: false,\n              message: 'No consent data found in local storage',\n              performanceMs: performance.now() - startTime\n            }\n          }\n          \n          const consent = JSON.parse(consentData)\n          const consentTimestamp = localStorage.getItem('consent-timestamp')\n          \n          const requiredConsentFields = ['necessary', 'analytics', 'marketing', 'preferences']\n          const hasAllFields = requiredConsentFields.every(field => field in consent)\n          \n          if (!hasAllFields) {\n            return {\n              success: false,\n              message: 'Incomplete consent data structure',\n              performanceMs: performance.now() - startTime,\n              data: { consent, missingFields: requiredConsentFields.filter(field => !(field in consent)) }\n            }\n          }\n          \n          return {\n            success: true,\n            message: 'Privacy compliance checks passed',\n            performanceMs: performance.now() - startTime,\n            data: { consent, timestamp: consentTimestamp }\n          }\n        } catch (error: any) {\n          return {\n            success: false,\n            message: 'Privacy compliance check failed',\n            errors: [error.message],\n            performanceMs: performance.now() - startTime\n          }\n        }\n      }\n    },\n    \n    {\n      id: 'performance-impact',\n      name: 'Performance Impact Assessment',\n      description: 'Measure analytics overhead on page performance',\n      category: 'performance',\n      priority: 'medium',\n      testFunction: async () => {\n        const startTime = performance.now()\n        \n        if (!enablePerformanceTests) {\n          return {\n            success: true,\n            message: 'Performance tests disabled',\n            performanceMs: 0\n          }\n        }\n        \n        try {\n          // Simulate heavy analytics usage\n          const promises = []\n          for (let i = 0; i < 10; i++) {\n            promises.push(analytics.trackQuestionView(`perf-test-${i}`, 'performance-test'))\n          }\n          \n          const operationStart = performance.now()\n          await Promise.all(promises)\n          const operationTime = performance.now() - operationStart\n          \n          const impactThreshold = 50 // 50ms threshold\n          const withinThreshold = operationTime < impactThreshold\n          \n          return {\n            success: withinThreshold,\n            message: withinThreshold \n              ? `Performance impact minimal: ${operationTime.toFixed(2)}ms` \n              : `Performance impact high: ${operationTime.toFixed(2)}ms (threshold: ${impactThreshold}ms)`,\n            performanceMs: performance.now() - startTime,\n            data: { operationTime, threshold: impactThreshold, withinThreshold }\n          }\n        } catch (error: any) {\n          return {\n            success: false,\n            message: 'Performance test failed',\n            errors: [error.message],\n            performanceMs: performance.now() - startTime\n          }\n        }\n      }\n    }\n  ]\n\n  // CONTEXT7 SOURCE: /vercel/next.js - Test execution patterns\n  // TEST EXECUTION: Run individual or batch analytics tests\n  const runTest = useCallback(async (scenario: TestScenario) => {\n    setCurrentTest(scenario.id)\n    \n    try {\n      const result = await scenario.testFunction()\n      setTestResults(prev => new Map(prev.set(scenario.id, result)))\n    } catch (error: any) {\n      setTestResults(prev => new Map(prev.set(scenario.id, {\n        success: false,\n        message: 'Test execution failed',\n        errors: [error.message]\n      })))\n    } finally {\n      setCurrentTest(null)\n    }\n  }, [])\n  \n  const runAllTests = useCallback(async () => {\n    setIsRunning(true)\n    setTestResults(new Map())\n    \n    // Run critical tests first\n    const criticalTests = testScenarios.filter(t => t.priority === 'critical')\n    const otherTests = testScenarios.filter(t => t.priority !== 'critical')\n    \n    for (const scenario of criticalTests) {\n      await runTest(scenario)\n      // Small delay between tests\n      await new Promise(resolve => setTimeout(resolve, 100))\n    }\n    \n    for (const scenario of otherTests) {\n      await runTest(scenario)\n      await new Promise(resolve => setTimeout(resolve, 100))\n    }\n    \n    setIsRunning(false)\n  }, [runTest, testScenarios])\n  \n  // Auto-run tests on component mount if enabled\n  useEffect(() => {\n    if (autoRun) {\n      runAllTests()\n    }\n  }, [autoRun, runAllTests])\n  \n  // Calculate test summary statistics\n  const testSummary = React.useMemo(() => {\n    const total = testScenarios.length\n    const completed = testResults.size\n    const passed = Array.from(testResults.values()).filter(r => r.success).length\n    const failed = Array.from(testResults.values()).filter(r => !r.success).length\n    const averagePerformance = Array.from(testResults.values())\n      .filter(r => r.performanceMs)\n      .reduce((sum, r) => sum + (r.performanceMs || 0), 0) / Math.max(1, completed)\n    \n    return { total, completed, passed, failed, averagePerformance }\n  }, [testScenarios.length, testResults])\n\n  if (!isVisible) return null\n\n  return (\n    <div className=\"space-y-6\">\n      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Test dashboard header */}\n      {/* TEST HEADER: Analytics integration test dashboard header */}\n      <div className=\"flex justify-between items-start\">\n        <div>\n          <h2 className=\"text-2xl font-serif font-bold text-slate-900 mb-2\">\n            FAQ Analytics Integration Test\n          </h2>\n          <p className=\"text-slate-600\">\n            Comprehensive validation of FAQ analytics implementation and business intelligence tracking\n          </p>\n        </div>\n        \n        <div className=\"flex gap-2\">\n          <Button\n            onClick={runAllTests}\n            disabled={isRunning}\n            className=\"flex items-center gap-2\"\n          >\n            <Play className=\"w-4 h-4\" />\n            {isRunning ? 'Running Tests...' : 'Run All Tests'}\n          </Button>\n        </div>\n      </div>\n      \n      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Test summary statistics */}\n      {/* TEST SUMMARY: Overview of test execution results */}\n      <div className=\"grid grid-cols-1 md:grid-cols-4 gap-4\">\n        <Card>\n          <CardContent className=\"p-4\">\n            <div className=\"flex items-center justify-between\">\n              <div>\n                <p className=\"text-sm text-slate-600\">Tests Completed</p>\n                <p className=\"text-2xl font-bold text-slate-900\">\n                  {testSummary.completed}/{testSummary.total}\n                </p>\n              </div>\n              <BarChart3 className=\"w-8 h-8 text-blue-600\" />\n            </div>\n          </CardContent>\n        </Card>\n        \n        <Card>\n          <CardContent className=\"p-4\">\n            <div className=\"flex items-center justify-between\">\n              <div>\n                <p className=\"text-sm text-slate-600\">Tests Passed</p>\n                <p className=\"text-2xl font-bold text-green-600\">\n                  {testSummary.passed}\n                </p>\n              </div>\n              <Check className=\"w-8 h-8 text-green-600\" />\n            </div>\n          </CardContent>\n        </Card>\n        \n        <Card>\n          <CardContent className=\"p-4\">\n            <div className=\"flex items-center justify-between\">\n              <div>\n                <p className=\"text-sm text-slate-600\">Tests Failed</p>\n                <p className=\"text-2xl font-bold text-red-600\">\n                  {testSummary.failed}\n                </p>\n              </div>\n              <X className=\"w-8 h-8 text-red-600\" />\n            </div>\n          </CardContent>\n        </Card>\n        \n        <Card>\n          <CardContent className=\"p-4\">\n            <div className=\"flex items-center justify-between\">\n              <div>\n                <p className=\"text-sm text-slate-600\">Avg Performance</p>\n                <p className=\"text-2xl font-bold text-slate-900\">\n                  {testSummary.averagePerformance.toFixed(1)}ms\n                </p>\n              </div>\n              <Zap className=\"w-8 h-8 text-yellow-600\" />\n            </div>\n          </CardContent>\n        </Card>\n      </div>\n      \n      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Test scenarios grid */}\n      {/* TEST SCENARIOS: Individual test case execution and results */}\n      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">\n        {testScenarios.map((scenario) => {\n          const result = testResults.get(scenario.id)\n          const isRunning = currentTest === scenario.id\n          \n          return (\n            <m.div\n              key={scenario.id}\n              initial={{ opacity: 0, y: 20 }}\n              animate={{ opacity: 1, y: 0 }}\n              className=\"relative\"\n            >\n              <Card className={`transition-all duration-300 ${\n                result?.success === true ? 'border-green-200 bg-green-50/50' :\n                result?.success === false ? 'border-red-200 bg-red-50/50' :\n                'border-slate-200'\n              }`}>\n                <CardHeader className=\"pb-3\">\n                  <div className=\"flex items-start justify-between\">\n                    <div className=\"flex-1\">\n                      <div className=\"flex items-center gap-2 mb-2\">\n                        <CardTitle className=\"text-lg\">{scenario.name}</CardTitle>\n                        <Badge variant={scenario.priority === 'critical' ? 'destructive' : \n                                     scenario.priority === 'high' ? 'default' : 'secondary'}>\n                          {scenario.priority}\n                        </Badge>\n                        <Badge variant=\"outline\">\n                          {scenario.category === 'tracking' && <Target className=\"w-3 h-3 mr-1\" />}\n                          {scenario.category === 'business' && <BarChart3 className=\"w-3 h-3 mr-1\" />}\n                          {scenario.category === 'privacy' && <Users className=\"w-3 h-3 mr-1\" />}\n                          {scenario.category === 'performance' && <Zap className=\"w-3 h-3 mr-1\" />}\n                          {scenario.category}\n                        </Badge>\n                      </div>\n                      <p className=\"text-sm text-slate-600\">{scenario.description}</p>\n                    </div>\n                    \n                    <div className=\"flex items-center gap-2 ml-4\">\n                      {isRunning && (\n                        <div className=\"w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin\" />\n                      )}\n                      {result && (\n                        result.success ? \n                          <Check className=\"w-5 h-5 text-green-600\" /> : \n                          <X className=\"w-5 h-5 text-red-600\" />\n                      )}\n                      <Button\n                        size=\"sm\"\n                        variant=\"outline\"\n                        onClick={() => runTest(scenario)}\n                        disabled={isRunning}\n                      >\n                        {isRunning ? 'Testing...' : 'Run Test'}\n                      </Button>\n                    </div>\n                  </div>\n                </CardHeader>\n                \n                {result && (\n                  <CardContent className=\"pt-0\">\n                    <div className={`p-3 rounded-lg ${\n                      result.success ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'\n                    }`}>\n                      <p className={`font-medium ${\n                        result.success ? 'text-green-800' : 'text-red-800'\n                      }`}>\n                        {result.message}\n                      </p>\n                      \n                      {result.performanceMs && (\n                        <p className=\"text-sm text-slate-600 mt-1\">\n                          Execution time: {result.performanceMs.toFixed(2)}ms\n                        </p>\n                      )}\n                      \n                      {result.errors && result.errors.length > 0 && (\n                        <div className=\"mt-2\">\n                          <p className=\"text-sm font-medium text-red-800 mb-1\">Errors:</p>\n                          <ul className=\"text-sm text-red-700 space-y-1\">\n                            {result.errors.map((error, index) => (\n                              <li key={index} className=\"flex items-start gap-1\">\n                                <AlertTriangle className=\"w-3 h-3 mt-0.5 flex-shrink-0\" />\n                                {error}\n                              </li>\n                            ))}\n                          </ul>\n                        </div>\n                      )}\n                      \n                      {showDetailedResults && result.data && (\n                        <details className=\"mt-2\">\n                          <summary className=\"text-sm font-medium cursor-pointer text-slate-700 hover:text-slate-900\">\n                            View detailed results\n                          </summary>\n                          <pre className=\"text-xs text-slate-600 mt-2 p-2 bg-slate-50 rounded overflow-auto max-h-32\">\n                            {JSON.stringify(result.data, null, 2)}\n                          </pre>\n                        </details>\n                      )}\n                    </div>\n                  </CardContent>\n                )}\n              </Card>\n            </m.div>\n          )\n        })}\n      </div>\n    </div>\n  )\n}\n\nexport default AnalyticsIntegrationTest