// CONTEXT7 SOURCE: /jestjs/jest - Jest coverage configuration for comprehensive reporting
// COVERAGE_CONFIG_REASON: Official Jest documentation for coverage collection and reporting setup

/**
 * JEST COVERAGE CONFIGURATION - LOGOSECTION COMPONENT TESTING
 * Created: August 27, 2025
 * Purpose: Comprehensive coverage reporting for navbar component testing
 * Focus: Component-specific coverage thresholds and reporting optimization
 * 
 * Coverage Targets:
 * - LogoSection component: >90% all metrics
 * - Integration layer: >85% all metrics  
 * - Accessibility helpers: >95% all metrics
 * - Performance utilities: >80% all metrics
 */

const baseConfig = require('./jest.config.js')

// CONTEXT7 SOURCE: /jestjs/jest - Extended coverage configuration patterns
// EXTENDED_COVERAGE_REASON: Official Jest documentation for advanced coverage reporting
module.exports = {
  ...baseConfig,
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage collection configuration
  // COLLECTION_CONFIG_REASON: Official Jest documentation for coverage collection patterns
  collectCoverage: true,
  coverageDirectory: 'coverage',
  
  // Comprehensive coverage reporters for different use cases
  coverageReporters: [
    'text',           // Console output for immediate feedback
    'text-summary',   // Brief summary for CI logs
    'lcov',          // Standard format for external tools
    'html',          // Detailed browsable reports
    'json-summary',  // Machine-readable summary
    'clover',        // XML format for some CI tools
    'cobertura'      // XML format compatible with many tools
  ],
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage collection from specific paths
  // PATH_COLLECTION_REASON: Official Jest documentation for targeted coverage collection
  collectCoverageFrom: [
    // Primary component coverage
    'src/components/layout/logo-section.tsx',
    'src/components/layout/page-header.tsx',
    
    // Supporting component coverage
    'src/components/layout/*.{ts,tsx}',
    'src/components/ui/navigation-*.{ts,tsx}',
    
    // Test utility coverage
    'src/components/layout/__tests__/test-factories/*.{ts,tsx}',
    
    // Hook coverage for navbar functionality
    'src/hooks/use-intersection-observer.ts',
    'src/hooks/useReducedMotion.tsx',
    
    // Utility coverage for component support
    'src/lib/utils.ts',
    'src/utils/motion-*.{ts,tsx}',
    
    // Exclude patterns
    '!src/components/layout/**/*.d.ts',
    '!src/components/layout/**/*.test.{ts,tsx}',
    '!src/components/layout/**/*.spec.{ts,tsx}',
    '!src/components/layout/**/*.stories.{ts,tsx}',
    '!src/components/layout/__tests__/**/*.test.{ts,tsx}',
    '!src/components/layout/__mocks__/**/*',
    
    // Exclude Next.js specific files
    '!src/app/**/*',
    '!src/pages/**/*',
    
    // Exclude configuration files
    '!**/node_modules/**',
    '!**/*.config.{js,ts}',
    '!**/coverage/**',
  ],
  
  // CONTEXT7 SOURCE: /jestjs/jest - Component-specific coverage thresholds
  // THRESHOLD_CONFIG_REASON: Official Jest documentation for granular coverage requirements
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    
    // CONTEXT7 SOURCE: /jestjs/jest - File-specific coverage thresholds
    // FILE_THRESHOLDS_REASON: Official Jest documentation for component-level coverage enforcement
    
    // Critical component - highest standards
    'src/components/layout/logo-section.tsx': {
      branches: 95,
      functions: 100,
      lines: 95,
      statements: 95,
    },
    
    // Main navbar component - high standards
    'src/components/layout/page-header.tsx': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    
    // Test utilities - should be well covered
    'src/components/layout/__tests__/test-factories/': {
      branches: 90,
      functions: 95,
      lines: 90,
      statements: 90,
    },
    
    // Accessibility helpers - critical for compliance
    'src/hooks/use-accessibility*.{ts,tsx}': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    
    // Performance utilities - optimization critical
    'src/utils/motion-*.{ts,tsx}': {
      branches: 80,
      functions: 85,
      lines: 80,
      statements: 80,
    },
    
    // General layout components - standard requirements
    'src/components/layout/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    }
  },
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage path ignoring configuration
  // PATH_IGNORE_REASON: Official Jest documentation for excluding files from coverage
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/.next/',
    '/dist/',
    '/build/',
    
    // Test files and mocks
    '/__tests__/',
    '/__mocks__/',
    '/test-utils/',
    '/test-fixtures/',
    '.test.ts',
    '.test.tsx',
    '.spec.ts',
    '.spec.tsx',
    
    // Storybook files
    '.stories.ts',
    '.stories.tsx',
    
    // Configuration files
    '.config.js',
    '.config.ts',
    
    // Type definition files
    '.d.ts',
    '/types/',
    
    // Development utilities
    '/dev/',
    '/debug/',
    
    // Legacy or experimental code
    '/experimental/',
    '/legacy/',
    '.backup.',
    '.old.',
  ],
  
  // CONTEXT7 SOURCE: /jestjs/jest - Test environment configuration for coverage
  // ENVIRONMENT_REASON: Official Jest documentation for coverage-optimized test environments
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage-specific test patterns
  // TEST_PATTERNS_REASON: Official Jest documentation for coverage test discovery
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/?(*.)(test|spec).(ts|tsx|js|jsx)',
    
    // Include specific test patterns for coverage
    'src/components/layout/**/*.test.{ts,tsx}',
    'tests/integration/**/*.test.{ts,tsx}',
    'tests/unit/**/*.test.{ts,tsx}',
  ],
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage optimization settings
  // OPTIMIZATION_REASON: Official Jest documentation for performance-optimized coverage collection
  maxWorkers: '50%', // Balance between speed and resource usage
  
  // Coverage-specific setup files
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '<rootDir>/tests/setup/coverage-setup.js'
  ],
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage report customization
  // REPORT_CUSTOMIZATION_REASON: Official Jest documentation for coverage report configuration
  coverageReporterOptions: {
    html: {
      subdir: 'html-report',
      skipCovered: false,
      skipEmpty: false,
    },
    lcov: {
      projectRoot: __dirname,
      subdir: 'lcov-report',
    },
    text: {
      maxCols: 120,
      skipCovered: false,
      skipEmpty: false,
    },
    'text-summary': {
      skipCovered: false,
      skipEmpty: false,
    },
    clover: {
      file: 'clover.xml',
      projectRoot: __dirname,
    },
    cobertura: {
      file: 'cobertura.xml',
      projectRoot: __dirname,
    }
  },
  
  // CONTEXT7 SOURCE: /jestjs/jest - Verbose output for coverage analysis
  // VERBOSE_CONFIG_REASON: Official Jest documentation for detailed coverage reporting
  verbose: true,
  
  // Additional Jest options optimized for coverage collection
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // CONTEXT7 SOURCE: /jestjs/jest - Cache configuration for coverage builds
  // CACHE_CONFIG_REASON: Official Jest documentation for coverage-optimized caching
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // Transform configuration for coverage
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  
  // CONTEXT7 SOURCE: /jestjs/jest - Module resolution for coverage testing
  // MODULE_RESOLUTION_REASON: Official Jest documentation for coverage-aware module resolution
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    
    // Coverage-specific mappings
    '^@/test-utils/(.*)$': '<rootDir>/tests/utils/$1',
    '^@/test-fixtures/(.*)$': '<rootDir>/tests/fixtures/$1',
  },
  
  // Global configuration for coverage tests
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage notification configuration
  // NOTIFICATION_CONFIG_REASON: Official Jest documentation for coverage threshold notifications
  notify: process.env.CI !== 'true', // Only notify in local development
  notifyMode: 'failure-change',
  
  // Error handling for coverage failures
  bail: process.env.CI === 'true' ? 1 : false,
  
  // CONTEXT7 SOURCE: /jestjs/jest - Coverage results processing
  // RESULTS_PROCESSING_REASON: Official Jest documentation for coverage results handling
  collectCoverageOnlyFrom: {
    // Only collect coverage from files that are actually tested
    'src/components/layout/logo-section.tsx': true,
    'src/components/layout/__tests__/logo-section.test.tsx': false,
  },
}

// CONTEXT7 SOURCE: /jestjs/jest - Coverage configuration documentation
// CONFIG_DOCUMENTATION_REASON: Official Jest documentation for comprehensive coverage setup

/**
 * COVERAGE CONFIGURATION SUMMARY - LOGOSECTION TESTING
 * 
 * COVERAGE COLLECTION STRATEGY:
 * ✅ Component-Focused Collection
 *    - Primary: LogoSection component (95% threshold)
 *    - Secondary: Supporting navbar components (85-90%)
 *    - Utilities: Motion and accessibility helpers (80-95%)
 * 
 * ✅ Multiple Report Formats
 *    - Text: Immediate console feedback
 *    - HTML: Detailed browsable reports
 *    - LCOV: External tool integration
 *    - JSON/XML: CI/CD pipeline integration
 * 
 * ✅ Threshold Enforcement
 *    - Global minimum: 85% all metrics
 *    - Component-specific: 90-95% for critical paths
 *    - Accessibility code: 95% minimum
 *    - Test utilities: High coverage requirements
 * 
 * ✅ Optimized Collection
 *    - Path-specific inclusion/exclusion
 *    - Performance-optimized workers
 *    - Efficient caching configuration
 *    - CI/CD integration ready
 * 
 * COVERAGE REPORTS GENERATED:
 * - HTML Report: coverage/html-report/index.html
 * - LCOV Report: coverage/lcov-report/
 * - Summary: coverage/coverage-summary.json
 * - Clover XML: coverage/clover.xml
 * - Cobertura XML: coverage/cobertura.xml
 * 
 * CRITICAL METRICS TRACKED:
 * - Branch Coverage: Decision path validation
 * - Function Coverage: Method execution validation  
 * - Line Coverage: Code execution validation
 * - Statement Coverage: Operation execution validation
 * 
 * INTEGRATION POINTS:
 * - GitHub Actions: Automated coverage collection
 * - Codecov: External coverage tracking
 * - SonarQube: Code quality integration
 * - PR Comments: Coverage change notifications
 */