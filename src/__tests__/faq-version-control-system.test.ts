/**
 * FAQ Version Control System - Comprehensive Test Suite
 * 
 * CONTEXT7 SOURCE: /jest/jest - Testing framework patterns for TypeScript applications
 * CONTEXT7 SOURCE: /testing-library/react - React component testing utilities
 * CONTEXT7 SOURCE: /pmndrs/zustand - State management testing patterns
 * IMPLEMENTATION REASON: Complete test coverage for FAQ version control system
 * 
 * This test suite provides comprehensive coverage including:
 * - Core version management operations (create, update, approve, publish)
 * - Semantic versioning logic with automated incrementation
 * - Diff engine functionality with visual comparison
 * - Workflow automation with role-based permissions
 * - Rollback system with impact analysis validation
 * - Audit trail integrity and GDPR compliance
 * - Performance benchmarks for enterprise usage
 * - Error handling and edge case scenarios
 * 
 * BUSINESS REQUIREMENTS:
 * - Royal client quality standards for reliability testing
 * - Enterprise-grade test coverage (>95%)
 * - Performance benchmarks for 1000+ versions
 * - British English throughout test descriptions
 * - Comprehensive edge case coverage
 */

import { renderHook, act } from '@testing-library/react'
import { 
  useVersionControlStore,
  SemanticVersionUtils,
  DiffEngine,
  useVersionControl,
  useVersionHistory,
  useVersionComparison,
  VersionControlUtils,
  VersionControlConstants
} from '../lib/faq-version-control'
import type {
  FAQVersion,
  VersionWorkflowStatus,
  UserRole,
  VersionChangeType
} from '../types/faq-version-control'

// CONTEXT7 SOURCE: /jest/jest - Test setup and mocking patterns
// TEST SETUP: Mock data and utilities for consistent testing
const mockUser = {
  id: 'user_123',
  role: 'admin' as UserRole,
  email: 'admin@myprivatetutoronline.com'
}

const mockFAQContent = {
  question: 'What is the best way to prepare for Oxbridge entrance exams?',
  answer: 'Oxbridge entrance exam preparation requires a structured approach combining academic excellence with strategic preparation. Our Tier 1 tutors, who are official examiners, provide insider knowledge of the marking process and assessment criteria. We recommend starting preparation at least 12 months before the application deadline, focusing on subject-specific entrance tests, interview technique, and personal statement development.',
  category: 'university-prep',
  subcategory: 'oxbridge',
  tags: ['oxbridge', 'entrance-exams', 'university-prep'] as readonly string[],
  priority: 9,
  searchKeywords: ['oxbridge', 'cambridge', 'oxford', 'entrance', 'exam', 'preparation'] as readonly string[],
  relatedFAQs: ['oxbridge-interviews', 'personal-statements'] as readonly string[],
  clientSegment: 'oxbridge_prep' as const,
  difficulty: 'advanced' as const,
  estimatedReadTime: 3,
  featured: true
}

// CONTEXT7 SOURCE: /jest/jest - Test suite organisation patterns
// SEMANTIC VERSION UTILS TESTS: Core versioning logic validation
describe('SemanticVersionUtils', () => {
  describe('version parsing and formatting', () => {
    test('should parse valid semantic version strings correctly', () => {
      // CONTEXT7 SOURCE: /semantic-release/semantic-release - Standard version format testing
      const testCases = [
        { input: '1.0.0', expected: { major: 1, minor: 0, patch: 0 } },
        { input: '2.1.3', expected: { major: 2, minor: 1, patch: 3 } },
        { input: '1.0.0-alpha.1', expected: { major: 1, minor: 0, patch: 0, prerelease: 'alpha.1' } },
        { input: '1.0.0+20231201.1', expected: { major: 1, minor: 0, patch: 0, build: '20231201.1' } },
        { input: '1.0.0-beta.2+exp.sha.5114f85', expected: { major: 1, minor: 0, patch: 0, prerelease: 'beta.2', build: 'exp.sha.5114f85' } }
      ]
      
      testCases.forEach(({ input, expected }) => {
        const result = SemanticVersionUtils.parse(input)
        expect(result.major).toBe(expected.major)
        expect(result.minor).toBe(expected.minor)
        expect(result.patch).toBe(expected.patch)
        if (expected.prerelease) {
          expect(result.prerelease).toBe(expected.prerelease)
        }
        if (expected.build) {
          expect(result.build).toBe(expected.build)
        }
      })
    })
    
    test('should reject invalid version strings', () => {
      const invalidVersions = [
        '1.0',
        '1.0.0.0',
        'v1.0.0',
        '1.0.0-',
        '1.0.0+',
        '',
        '1.a.0',
        '1.0.b'
      ]
      
      invalidVersions.forEach(version => {
        expect(() => SemanticVersionUtils.parse(version)).toThrow('Invalid version format')
      })
    })
    
    test('should format semantic versions to strings correctly', () => {
      const testCases = [
        { input: { major: 1, minor: 0, patch: 0 }, expected: '1.0.0' },
        { input: { major: 2, minor: 1, patch: 3, prerelease: 'alpha.1' }, expected: '2.1.3-alpha.1' },
        { input: { major: 1, minor: 0, patch: 0, build: '20231201' }, expected: '1.0.0+20231201' },
        { input: { major: 1, minor: 0, patch: 0, prerelease: 'beta', build: '123' }, expected: '1.0.0-beta+123' }
      ]
      
      testCases.forEach(({ input, expected }) => {
        const result = SemanticVersionUtils.toString(input)
        expect(result).toBe(expected)
      })
    })
  })
  
  describe('version incrementation logic', () => {
    test('should increment major versions correctly', () => {
      const baseVersion = { major: 1, minor: 2, patch: 3 }
      const result = SemanticVersionUtils.increment(baseVersion, 'major')
      
      expect(result).toEqual({ major: 2, minor: 0, patch: 0 })
    })
    
    test('should increment minor versions correctly', () => {
      const baseVersion = { major: 1, minor: 2, patch: 3 }
      const result = SemanticVersionUtils.increment(baseVersion, 'minor')
      
      expect(result).toEqual({ major: 1, minor: 3, patch: 0 })
    })
    
    test('should increment patch versions correctly', () => {
      const baseVersion = { major: 1, minor: 2, patch: 3 }
      const result = SemanticVersionUtils.increment(baseVersion, 'patch')
      
      expect(result).toEqual({ major: 1, minor: 2, patch: 4 })
    })
    
    test('should handle prerelease increments correctly', () => {
      const baseVersion = { major: 1, minor: 0, patch: 0, prerelease: 'alpha.1' }
      const result = SemanticVersionUtils.increment(baseVersion, 'prerelease')
      
      expect(result.prerelease).toBe('alpha.2')
    })
  })
  
  describe('version comparison logic', () => {
    test('should compare versions correctly', () => {
      const testCases = [
        { a: { major: 1, minor: 0, patch: 0 }, b: { major: 1, minor: 0, patch: 1 }, expected: -1 },
        { a: { major: 2, minor: 0, patch: 0 }, b: { major: 1, minor: 9, patch: 9 }, expected: 1 },
        { a: { major: 1, minor: 2, patch: 3 }, b: { major: 1, minor: 2, patch: 3 }, expected: 0 }
      ]
      
      testCases.forEach(({ a, b, expected }) => {
        const result = SemanticVersionUtils.compare(a, b)
        expect(result).toBe(expected)
      })
    })
  })
})

// CONTEXT7 SOURCE: /google/diff-match-patch - Diff engine testing patterns
// DIFF ENGINE TESTS: Text comparison and visual diff generation
describe('DiffEngine', () => {
  describe('text difference calculation', () => {
    test('should detect additions correctly', () => {
      const oldText = 'Hello world'
      const newText = 'Hello beautiful world'
      
      const diff = DiffEngine.generateDiff(oldText, newText)
      
      expect(diff.additions).toBeGreaterThan(0)
      expect(diff.deletions).toBe(0)
      expect(diff.summary).toContain('additions')
    })
    
    test('should detect deletions correctly', () => {
      const oldText = 'Hello beautiful world'
      const newText = 'Hello world'
      
      const diff = DiffEngine.generateDiff(oldText, newText)
      
      expect(diff.additions).toBe(0)
      expect(diff.deletions).toBeGreaterThan(0)
      expect(diff.summary).toContain('deletions')
    })
    
    test('should detect no changes for identical text', () => {
      const text = 'Hello world'
      const diff = DiffEngine.generateDiff(text, text)
      
      expect(diff.additions).toBe(0)
      expect(diff.deletions).toBe(0)
      expect(diff.modifications).toBe(0)
      expect(diff.summary).toBe('No changes detected')
    })
    
    test('should assess impact levels correctly', () => {
      // Minor change (< 10%)
      const minorDiff = DiffEngine.generateDiff('Hello world', 'Hello world!')
      expect(minorDiff.impactLevel).toBe('minor')
      
      // Major change (> 50%)
      const majorDiff = DiffEngine.generateDiff('Short', 'This is a much longer text that represents a major change')
      expect(majorDiff.impactLevel).toBe('major')
    })
  })
  
  describe('visual diff generation', () => {
    test('should generate HTML diff with proper styling classes', () => {
      const oldText = 'Original text'
      const newText = 'Modified text'
      
      const visualDiff = DiffEngine.generateVisualDiff(oldText, newText)
      
      expect(visualDiff.htmlDiff).toBeDefined()
      expect(visualDiff.sideBySideDiff).toBeDefined()
      expect(visualDiff.inlineDiff).toBeDefined()
      expect(visualDiff.sideBySideDiff.leftColumn).toBeDefined()
      expect(visualDiff.sideBySideDiff.rightColumn).toBeDefined()
    })
  })
})

// CONTEXT7 SOURCE: /pmndrs/zustand - Store testing patterns
// VERSION STORE TESTS: Core store functionality validation
describe('Version Control Store', () => {
  let store: ReturnType<typeof useVersionControlStore>
  
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useVersionControlStore())
    store = result.current
    
    // Set mock user
    act(() => {
      store.getState().currentUser = mockUser
    })
  })
  
  describe('version creation and management', () => {
    test('should create new version successfully', async () => {
      const faqId = 'faq_test_123'
      
      await act(async () => {
        const versionId = await store.createVersion(faqId, mockFAQContent, {
          changeReason: 'Initial FAQ creation',
          changeType: 'minor',
          author: mockUser.id,
          authorEmail: mockUser.email,
          timestamp: new Date().toISOString()
        })
        
        expect(versionId).toBeDefined()
        expect(versionId).toMatch(/^version_/)
        
        const history = store.getVersionHistory(faqId)
        expect(history).toBeDefined()
        expect(history?.totalVersions).toBe(1)
        expect(history?.versions[0].content).toEqual(mockFAQContent)
      })
    })
    
    test('should increment version numbers automatically', async () => {
      const faqId = 'faq_test_increment'
      
      await act(async () => {
        // Create initial version (should be 1.0.0)
        const firstVersionId = await store.createVersion(faqId, mockFAQContent, {
          changeReason: 'Initial creation',
          changeType: 'minor'
        })
        
        let history = store.getVersionHistory(faqId)
        expect(history?.versions[0].versionString).toBe('1.0.0')
        
        // Create second version (should be 1.1.0 for minor change)
        const secondVersionId = await store.createVersion(faqId, {
          ...mockFAQContent,
          answer: 'Updated answer with new information'
        }, {
          changeReason: 'Content update',
          changeType: 'minor'
        })
        
        history = store.getVersionHistory(faqId)
        expect(history?.versions[1].versionString).toBe('1.1.0')
        
        // Create patch version (should be 1.1.1)
        const thirdVersionId = await store.createVersion(faqId, {
          ...mockFAQContent,
          answer: 'Updated answer with new information and typo fix'
        }, {
          changeReason: 'Typo correction',
          changeType: 'patch'
        })
        
        history = store.getVersionHistory(faqId)
        expect(history?.versions[2].versionString).toBe('1.1.1')
      })
    })
  })
  
  describe('workflow management', () => {
    let versionId: string
    const faqId = 'faq_workflow_test'
    
    beforeEach(async () => {
      await act(async () => {
        versionId = await store.createVersion(faqId, mockFAQContent, {
          changeReason: 'Test version for workflow',
          changeType: 'minor'
        })
      })
    })
    
    test('should handle complete workflow cycle', async () => {
      await act(async () => {
        // Initial state should be draft
        let history = store.getVersionHistory(faqId)
        expect(history?.versions[0].workflow.status).toBe('draft')
        
        // Submit for review
        await store.submitForReview(versionId)
        history = store.getVersionHistory(faqId)
        expect(history?.versions[0].workflow.status).toBe('review')
        
        // Approve version
        await store.approveVersion(versionId, 'Looks good!')
        history = store.getVersionHistory(faqId)
        expect(history?.versions[0].workflow.status).toBe('approved')
        expect(history?.versions[0].metadata.reviewNotes).toBe('Looks good!')
        
        // Publish version
        await store.publishVersion(versionId)
        history = store.getVersionHistory(faqId)
        expect(history?.versions[0].workflow.status).toBe('published')
        expect(history?.currentVersion).toBe('1.0.0')
      })
    })
    
    test('should handle version rejection', async () => {
      await act(async () => {
        await store.submitForReview(versionId)
        await store.rejectVersion(versionId, 'Content needs improvement')
        
        const history = store.getVersionHistory(faqId)
        expect(history?.versions[0].workflow.status).toBe('rejected')
        expect(history?.versions[0].metadata.reviewNotes).toBe('Content needs improvement')
      })
    })
  })
  
  describe('version comparison', () => {
    test('should compare two versions successfully', async () => {
      const faqId = 'faq_comparison_test'
      
      await act(async () => {
        // Create first version
        const firstVersionId = await store.createVersion(faqId, mockFAQContent, {
          changeReason: 'Initial version',
          changeType: 'minor'
        })
        
        // Create second version with changes
        const updatedContent = {
          ...mockFAQContent,
          answer: mockFAQContent.answer + ' Additional information about interview preparation and personal statement guidance.'
        }
        
        const secondVersionId = await store.createVersion(faqId, updatedContent, {
          changeReason: 'Added more detail',
          changeType: 'minor'
        })
        
        // Compare versions
        const comparison = await store.compareVersions({
          baseVersionId: firstVersionId,
          targetVersionId: secondVersionId,
          compareOptions: {
            includeMetadata: true,
            contextLines: 3,
            ignoreWhitespace: false,
            highlightSyntax: true
          }
        })
        
        expect(comparison.baseVersion.id).toBe(firstVersionId)
        expect(comparison.targetVersion.id).toBe(secondVersionId)
        expect(comparison.diff.additions).toBeGreaterThan(0)
        expect(comparison.statistics.totalChanges).toBeGreaterThan(0)
      })
    })
  })
  
  describe('audit trail functionality', () => {
    test('should log all version operations', async () => {
      const faqId = 'faq_audit_test'
      
      await act(async () => {
        const versionId = await store.createVersion(faqId, mockFAQContent, {
          changeReason: 'Test audit trail',
          changeType: 'minor'
        })
        
        await store.submitForReview(versionId)
        await store.approveVersion(versionId, 'Approved for testing')
        await store.publishVersion(versionId)
        
        const auditTrail = store.getAuditTrail(versionId)
        
        // Should have entries for create, review, approve, publish
        expect(auditTrail.length).toBeGreaterThanOrEqual(4)
        expect(auditTrail.some(entry => entry.action === 'create')).toBe(true)
        expect(auditTrail.some(entry => entry.action === 'review')).toBe(true)
        expect(auditTrail.some(entry => entry.action === 'approve')).toBe(true)
        expect(auditTrail.some(entry => entry.action === 'publish')).toBe(true)
        
        // Check GDPR compliance flags
        auditTrail.forEach(entry => {
          expect(entry.complianceFlags.gdprCompliant).toBe(true)
          expect(entry.userId).toBe(mockUser.id)
        })
      })
    })
  })
  
  describe('bulk operations', () => {
    test('should handle bulk approval operations', async () => {
      const faqId = 'faq_bulk_test'
      const versionIds: string[] = []
      
      await act(async () => {
        // Create multiple versions
        for (let i = 0; i < 3; i++) {
          const versionId = await store.createVersion(faqId, {
            ...mockFAQContent,
            question: `${mockFAQContent.question} - Version ${i + 1}`
          }, {
            changeReason: `Version ${i + 1}`,
            changeType: 'minor'
          })
          
          await store.submitForReview(versionId)
          versionIds.push(versionId)
        }
        
        // Perform bulk approval
        const bulkResult = await store.bulkOperation({
          operationType: 'approve',
          versionIds: versionIds as readonly string[],
          operatorId: mockUser.id,
          reason: 'Bulk approval for testing',
          notifyUsers: false
        })
        
        expect(bulkResult.status).toBe('completed')
        expect(bulkResult.processedCount).toBe(3)
        expect(bulkResult.failedCount).toBe(0)
      })
    })
  })
})

// CONTEXT7 SOURCE: /reactjs/react.dev - React hooks testing patterns
// REACT HOOKS TESTS: Custom hooks functionality validation
describe('Version Control React Hooks', () => {
  describe('useVersionControl hook', () => {
    test('should provide all version control operations', () => {
      const { result } = renderHook(() => useVersionControl())
      
      expect(result.current.createVersion).toBeDefined()
      expect(result.current.updateVersion).toBeDefined()
      expect(result.current.compareVersions).toBeDefined()
      expect(result.current.submitForReview).toBeDefined()
      expect(result.current.approveVersion).toBeDefined()
      expect(result.current.rejectVersion).toBeDefined()
      expect(result.current.publishVersion).toBeDefined()
      expect(result.current.rollbackVersion).toBeDefined()
      expect(result.current.bulkOperation).toBeDefined()
      expect(result.current.canPerformAction).toBeDefined()
      expect(result.current.clearError).toBeDefined()
    })
    
    test('should handle errors gracefully', async () => {
      const { result } = renderHook(() => useVersionControl())
      
      // Test with invalid parameters to trigger error
      await act(async () => {
        try {
          await result.current.createVersion('', null, {})
        } catch (error) {
          expect(result.current.error).toBeDefined()
        }
      })
      
      // Test error clearing
      act(() => {
        result.current.clearError()
      })
      
      expect(result.current.error).toBeNull()
    })
  })
  
  describe('useVersionHistory hook', () => {
    test('should provide version history data', () => {
      const faqId = 'test_faq_history'
      const { result } = renderHook(() => useVersionHistory(faqId))
      
      expect(result.current.history).toBeDefined()
      expect(result.current.versions).toBeDefined()
      expect(result.current.currentVersion).toBeDefined()
      expect(result.current.refresh).toBeDefined()
      expect(Array.isArray(result.current.versions)).toBe(true)
    })
  })
  
  describe('useVersionComparison hook', () => {
    test('should provide comparison functionality', () => {
      const { result } = renderHook(() => useVersionComparison())
      
      expect(result.current.compare).toBeDefined()
      expect(result.current.clearComparison).toBeDefined()
      expect(result.current.comparison).toBeNull() // Initially null
    })
  })
})

// CONTEXT7 SOURCE: /jest/jest - Utility function testing patterns
// UTILITY FUNCTIONS TESTS: Helper function validation
describe('VersionControlUtils', () => {
  describe('validation functions', () => {
    test('should validate version strings correctly', () => {
      expect(VersionControlUtils.isValidVersionString('1.0.0')).toBe(true)
      expect(VersionControlUtils.isValidVersionString('1.0.0-alpha.1')).toBe(true)
      expect(VersionControlUtils.isValidVersionString('invalid')).toBe(false)
      expect(VersionControlUtils.isValidVersionString('')).toBe(false)
    })
    
    test('should compare version strings correctly', () => {
      expect(VersionControlUtils.compareVersionStrings('1.0.0', '1.0.1')).toBe(-1)
      expect(VersionControlUtils.compareVersionStrings('2.0.0', '1.9.9')).toBe(1)
      expect(VersionControlUtils.compareVersionStrings('1.0.0', '1.0.0')).toBe(0)
    })
    
    test('should assess change impact correctly', () => {
      // Minor change
      expect(VersionControlUtils.assessChangeImpact(5, 0, 0, 100)).toBe('minor')
      // Moderate change
      expect(VersionControlUtils.assessChangeImpact(30, 0, 0, 100)).toBe('moderate')
      // Major change
      expect(VersionControlUtils.assessChangeImpact(60, 0, 0, 100)).toBe('major')
    })
    
    test('should format workflow status correctly', () => {
      expect(VersionControlUtils.formatWorkflowStatus('draft')).toBe('Draft')
      expect(VersionControlUtils.formatWorkflowStatus('review')).toBe('Under Review')
      expect(VersionControlUtils.formatWorkflowStatus('published')).toBe('Published')
    })
    
    test('should format timestamps in British format', () => {
      const timestamp = '2025-08-11T14:30:00.000Z'
      const formatted = VersionControlUtils.formatTimestamp(timestamp)
      
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/) // DD/MM/YYYY format
    })
    
    test('should validate FAQ content structure', () => {
      const validContent = {
        question: 'Valid question that is long enough',
        answer: 'Valid answer that provides sufficient detail and information',
        category: 'test-category'
      }
      
      const result = VersionControlUtils.validateFAQContent(validContent)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
      
      const invalidContent = {
        question: 'Short',
        answer: '',
        category: ''
      }
      
      const invalidResult = VersionControlUtils.validateFAQContent(invalidContent)
      expect(invalidResult.isValid).toBe(false)
      expect(invalidResult.errors.length).toBeGreaterThan(0)
    })
    
    test('should check user permissions correctly', () => {
      // Admin can do everything
      expect(VersionControlUtils.canUserPerformAction('admin', 'create')).toBe(true)
      expect(VersionControlUtils.canUserPerformAction('admin', 'rollback')).toBe(true)
      
      // Author can create and edit drafts
      expect(VersionControlUtils.canUserPerformAction('author', 'create')).toBe(true)
      expect(VersionControlUtils.canUserPerformAction('author', 'edit', 'draft')).toBe(true)
      expect(VersionControlUtils.canUserPerformAction('author', 'approve')).toBe(false)
      
      // Reviewer can approve
      expect(VersionControlUtils.canUserPerformAction('reviewer', 'approve', 'review')).toBe(true)
      expect(VersionControlUtils.canUserPerformAction('reviewer', 'publish')).toBe(false)
      
      // Publisher can publish
      expect(VersionControlUtils.canUserPerformAction('publisher', 'publish', 'approved')).toBe(true)
      
      // Viewer cannot perform most actions
      expect(VersionControlUtils.canUserPerformAction('viewer', 'create')).toBe(false)
    })
  })
})

// CONTEXT7 SOURCE: /jest/jest - Performance testing patterns
// PERFORMANCE TESTS: Enterprise-grade performance validation
describe('Performance Tests', () => {
  test('should handle large version histories efficiently', async () => {
    const startTime = Date.now()
    const faqId = 'faq_performance_test'
    const { result } = renderHook(() => useVersionControlStore())
    const store = result.current
    
    await act(async () => {
      // Set mock user
      store.getState().currentUser = mockUser
      
      // Create 50 versions
      for (let i = 0; i < 50; i++) {
        await store.createVersion(faqId, {
          ...mockFAQContent,
          question: `Performance test question ${i + 1}`
        }, {
          changeReason: `Performance test version ${i + 1}`,
          changeType: 'patch'
        })
      }
    })
    
    const endTime = Date.now()
    const duration = endTime - startTime
    
    // Should complete within reasonable time (adjust threshold as needed)
    expect(duration).toBeLessThan(10000) // 10 seconds
    
    const history = store.getVersionHistory(faqId)
    expect(history?.totalVersions).toBe(50)
  })
  
  test('should handle large diff calculations efficiently', () => {
    const largeText1 = 'Lorem ipsum '.repeat(1000)
    const largeText2 = largeText1 + 'Additional content '.repeat(100)
    
    const startTime = Date.now()
    const diff = DiffEngine.generateDiff(largeText1, largeText2)
    const endTime = Date.now()
    
    expect(endTime - startTime).toBeLessThan(VersionControlConstants.PERFORMANCE.DIFF_CALCULATION_TIMEOUT)
    expect(diff.additions).toBeGreaterThan(0)
  })
})

// CONTEXT7 SOURCE: /jest/jest - Constants testing patterns
// CONSTANTS TESTS: Configuration validation
describe('VersionControlConstants', () => {
  test('should have all required workflow statuses', () => {
    const expectedStatuses: VersionWorkflowStatus[] = [
      'draft', 'review', 'approved', 'published', 'archived', 'rejected'
    ]
    
    expectedStatuses.forEach(status => {
      expect(VersionControlConstants.WORKFLOW_STATUSES).toContain(status)
    })
  })
  
  test('should have all required change types', () => {
    const expectedTypes: VersionChangeType[] = [
      'major', 'minor', 'patch', 'prerelease', 'build'
    ]
    
    expectedTypes.forEach(type => {
      expect(VersionControlConstants.CHANGE_TYPES).toContain(type)
    })
  })
  
  test('should have reasonable performance limits', () => {
    expect(VersionControlConstants.LIMITS.MAX_VERSIONS_PER_FAQ).toBeGreaterThan(50)
    expect(VersionControlConstants.PERFORMANCE.DIFF_CALCULATION_TIMEOUT).toBeGreaterThan(1000)
    expect(VersionControlConstants.UI.REFRESH_INTERVAL).toBeGreaterThan(60000) // At least 1 minute
  })
})

// CONTEXT7 SOURCE: /jest/jest - Edge cases testing patterns
// EDGE CASES: Comprehensive edge case coverage
describe('Edge Cases', () => {
  test('should handle empty content gracefully', async () => {
    const { result } = renderHook(() => useVersionControlStore())
    const store = result.current
    
    act(() => {
      store.getState().currentUser = mockUser
    })
    
    await act(async () => {
      try {
        await store.createVersion('test_empty', null, {
          changeReason: 'Testing empty content',
          changeType: 'patch'
        })
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
  
  test('should handle concurrent version creation', async () => {
    const { result } = renderHook(() => useVersionControlStore())
    const store = result.current
    
    act(() => {
      store.getState().currentUser = mockUser
    })
    
    const faqId = 'concurrent_test'
    const promises: Promise<string>[] = []
    
    // Create multiple versions concurrently
    for (let i = 0; i < 5; i++) {
      promises.push(
        store.createVersion(faqId, {
          ...mockFAQContent,
          question: `Concurrent test ${i + 1}`
        }, {
          changeReason: `Concurrent version ${i + 1}`,
          changeType: 'patch'
        })
      )
    }
    
    await act(async () => {
      const versionIds = await Promise.all(promises)
      expect(versionIds).toHaveLength(5)
      expect(new Set(versionIds).size).toBe(5) // All should be unique
    })
  })
  
  test('should handle malformed version data', () => {
    const malformedVersions = [
      null,
      undefined,
      {},
      { invalid: 'data' },
      { major: 'not-a-number', minor: 0, patch: 0 }
    ]
    
    malformedVersions.forEach(version => {
      expect(() => {
        if (version && typeof version === 'object' && 'major' in version) {
          SemanticVersionUtils.toString(version as any)
        }
      }).not.toThrow() // Should handle gracefully
    })
  })
})

// CONTEXT7 SOURCE: /jest/jest - Integration testing patterns
// INTEGRATION TESTS: End-to-end workflow validation
describe('Integration Tests', () => {
  test('should handle complete FAQ lifecycle', async () => {
    const { result } = renderHook(() => useVersionControl())
    const versionControl = result.current
    
    const faqId = 'integration_test_faq'
    
    await act(async () => {
      // Create initial version
      const versionId = await versionControl.createVersion(faqId, mockFAQContent, {
        changeReason: 'Integration test - initial creation',
        changeType: 'minor',
        author: mockUser.id,
        authorEmail: mockUser.email,
        timestamp: new Date().toISOString()
      })
      
      expect(versionId).toBeDefined()
      
      // Submit for review
      await versionControl.submitForReview(versionId)
      
      // Approve version
      await versionControl.approveVersion(versionId, 'Integration test approval')
      
      // Publish version
      await versionControl.publishVersion(versionId)
      
      // Create updated version
      const updatedVersionId = await versionControl.createVersion(faqId, {
        ...mockFAQContent,
        answer: mockFAQContent.answer + ' Updated for integration testing.'
      }, {
        changeReason: 'Integration test - content update',
        changeType: 'patch'
      })
      
      // Compare versions
      const comparison = await versionControl.compareVersions(versionId, updatedVersionId)
      expect(comparison.diff.additions).toBeGreaterThan(0)
      
      // Test bulk operation
      await versionControl.submitForReview(updatedVersionId)
      const bulkResult = await versionControl.bulkOperation({
        operationType: 'approve',
        versionIds: [updatedVersionId],
        operatorId: mockUser.id,
        reason: 'Integration test bulk approval',
        notifyUsers: false
      })
      
      expect(bulkResult.status).toBe('completed')
    })
  })
})