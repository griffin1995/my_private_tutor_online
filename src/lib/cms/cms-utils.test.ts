/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Unit testing patterns for TypeScript utilities
 * CONTEXT7 SOURCE: /reactjs/react.dev - Testing utility functions for component data handling
 *
 * CMS Utilities Test Suite - Phase 2 Standardization Verification
 * Tests the standardized CMS access patterns for type safety
 *
 * Purpose:
 * - Verify type-safe property access utilities work correctly
 * - Test error handling for invalid inputs
 * - Validate consistent behavior across different data types
 * - Ensure backward compatibility with existing CMS patterns
 */

import {
  getCMSProperty,
  getCMSNestedProperty,
  getCMSArrayProperty,
  getCMSProperties,
  getCMSStringProperty,
  getCMSNumberProperty,
  getCMSBooleanProperty,
  getPriorityValue,
  isCMSContentValid,
  type SafeIndexAccess,
  type PriorityLevel
} from './cms-utils';

describe('CMS Utils - Phase 2 Standardization', () => {
  const mockCMSContent: SafeIndexAccess = {
    title: 'Test Title',
    description: 'Test Description',
    count: 42,
    isActive: true,
    items: ['item1', 'item2', 'item3'],
    nested: {
      level2: {
        value: 'deep value'
      }
    }
  };

  const mockPriorityOrder: PriorityLevel = {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
  };

  describe('getCMSProperty', () => {
    test('should retrieve existing property', () => {
      expect(getCMSProperty(mockCMSContent, 'title')).toBe('Test Title');
      expect(getCMSProperty(mockCMSContent, 'count')).toBe(42);
    });

    test('should return undefined for non-existent property', () => {
      expect(getCMSProperty(mockCMSContent, 'nonExistent')).toBeUndefined();
    });

    test('should return default value when property missing', () => {
      expect(getCMSProperty(mockCMSContent, 'missing', 'default')).toBe('default');
    });
  });

  describe('getCMSNestedProperty', () => {
    test('should retrieve nested property', () => {
      expect(getCMSNestedProperty(mockCMSContent, ['nested', 'level2', 'value'])).toBe('deep value');
    });

    test('should return undefined for invalid path', () => {
      expect(getCMSNestedProperty(mockCMSContent, ['nested', 'invalid', 'path'])).toBeUndefined();
    });
  });

  describe('getCMSArrayProperty', () => {
    test('should retrieve array property', () => {
      const result = getCMSArrayProperty(mockCMSContent, 'items');
      expect(result).toEqual(['item1', 'item2', 'item3']);
    });

    test('should return empty array for non-array property', () => {
      const result = getCMSArrayProperty(mockCMSContent, 'title');
      expect(result).toEqual([]);
    });
  });

  describe('getPriorityValue', () => {
    test('should return correct priority value', () => {
      expect(getPriorityValue(mockPriorityOrder, 'CRITICAL')).toBe(0);
      expect(getPriorityValue(mockPriorityOrder, 'HIGH')).toBe(1);
    });

    test('should return LOW priority for unknown values', () => {
      expect(getPriorityValue(mockPriorityOrder, 'UNKNOWN')).toBe(3);
    });
  });

  describe('Type-specific accessors', () => {
    test('getCMSStringProperty should handle type conversion', () => {
      expect(getCMSStringProperty(mockCMSContent, 'title')).toBe('Test Title');
      expect(getCMSStringProperty(mockCMSContent, 'count')).toBe(''); // number -> default
    });

    test('getCMSNumberProperty should handle type conversion', () => {
      expect(getCMSNumberProperty(mockCMSContent, 'count')).toBe(42);
      expect(getCMSNumberProperty(mockCMSContent, 'title')).toBe(0); // string -> default
    });

    test('getCMSBooleanProperty should handle type conversion', () => {
      expect(getCMSBooleanProperty(mockCMSContent, 'isActive')).toBe(true);
      expect(getCMSBooleanProperty(mockCMSContent, 'title')).toBe(false); // string -> default
    });
  });

  describe('isCMSContentValid', () => {
    test('should validate content objects', () => {
      expect(isCMSContentValid(mockCMSContent)).toBe(true);
      expect(isCMSContentValid(null)).toBe(false);
      expect(isCMSContentValid(undefined)).toBe(false);
      expect(isCMSContentValid('string')).toBe(false);
    });
  });
});

/**
 * Integration test to verify Phase 2 standardization eliminates TypeScript errors
 * CONTEXT7 SOURCE: /microsoft/typescript - Integration testing for type safety verification
 */
describe('CMS Utils - TypeScript Error Prevention', () => {
  test('should handle priority mapping without TS7053 errors', () => {
    const priorities = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    const dynamicPriority = 'HIGH' as string; // Simulates runtime string

    // This would cause TS7053 error without our utility
    const result = getPriorityValue(priorities, dynamicPriority);
    expect(result).toBe(1);
  });

  test('should handle dynamic object access without TS4111 errors', () => {
    const content = { dynamicKey: 'value', anotherKey: 42 };
    const dynamicKey = 'dynamicKey' as string; // Simulates runtime string

    // This would cause TS4111 error without our utility
    const result = getCMSProperty(content, dynamicKey);
    expect(result).toBe('value');
  });
});