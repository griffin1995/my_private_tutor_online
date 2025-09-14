// CONTEXT7 SOURCE: /jestjs/jest - Optimized Jest configuration for CI/CD parallel execution
// PERFORMANCE OPTIMIZATION: Official Jest documentation shows parallel test execution patterns

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// CONTEXT7 SOURCE: /jestjs/jest - Enhanced CI configuration for maximum parallel performance
// CI OPTIMIZATION REASON: Jest documentation shows optimizing test execution for CI environments
const ciJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',

  // CONTEXT7 SOURCE: /jestjs/jest - Maximized parallel execution for CI environments
  // PARALLEL OPTIMIZATION: Official Jest documentation shows using all available cores in CI
  maxWorkers: '100%', // Use all available cores in CI

  // CONTEXT7 SOURCE: /jestjs/jest - Concurrent test execution configuration
  // CONCURRENCY REASON: Jest documentation shows limiting concurrent tests for stability
  maxConcurrency: 10, // Limit concurrent tests using test.concurrent

  // CONTEXT7 SOURCE: /jestjs/jest - Worker threads for improved performance
  // WORKER THREADS: Jest documentation shows experimental worker threads for faster execution
  workerThreads: true, // Use worker threads instead of child processes

  // CONTEXT7 SOURCE: /jestjs/jest - CI-specific test timeout configuration
  // TIMEOUT OPTIMIZATION: Jest documentation shows shorter timeouts for CI feedback
  testTimeout: 20000, // 20 seconds for CI (faster feedback)

  // CONTEXT7 SOURCE: /jestjs/jest - Slow test threshold for performance monitoring
  // PERFORMANCE MONITORING: Jest documentation shows identifying slow tests for optimization
  slowTestThreshold: 5000, // Flag tests taking longer than 5 seconds

  // CONTEXT7 SOURCE: /jestjs/jest - Bail configuration for fast failure feedback
  // FAST FAILURE: Jest documentation shows failing fast on first test failure in CI
  bail: 1, // Stop after first test failure for faster CI feedback

  // CONTEXT7 SOURCE: /jestjs/jest - Coverage configuration for CI pipelines
  // COVERAGE OPTIMIZATION: Jest documentation shows optimized coverage collection for CI
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/app/layout.tsx',
    '!src/app/globals.css',
    '!src/app/**/not-found.tsx',
    '!src/app/**/error.tsx',
    '!src/app/**/loading.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },

  // CONTEXT7 SOURCE: /jestjs/jest - Cache configuration for CI performance
  // CACHE OPTIMIZATION: Jest documentation shows leveraging cache for faster subsequent runs
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',

  // CONTEXT7 SOURCE: /jestjs/jest - Module name mapper for Next.js compatibility
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^framer-motion$': '<rootDir>/__mocks__/framer-motion.js',
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',
    '@next/font/(.*)': '<rootDir>/__mocks__/nextFontMock.js',
    'next/font/(.*)': '<rootDir>/__mocks__/nextFontMock.js',
    'server-only': '<rootDir>/__mocks__/empty.js',
  },

  // CONTEXT7 SOURCE: /jestjs/jest - Test path patterns for CI execution
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',
    '<rootDir>/tests/integration/',
  ],

  // CONTEXT7 SOURCE: /jestjs/jest - Test discovery patterns
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)',
  ],

  // CONTEXT7 SOURCE: /jestjs/jest - Transform configuration for modern modules
  transformIgnorePatterns: [
    'node_modules/(?!(' +
    'lucide-react|' +
    '@lucide/icons|' +
    'framer-motion|' +
    'motion|' +
    '@radix-ui|' +
    '@testing-library|' +
    '@tanstack|' +
    '@hookform|' +
    '@headlessui|' +
    'nanoid|' +
    '@react-spring|' +
    'react-spring|' +
    'use-gesture|' +
    '@use-gesture|' +
    'ahooks|' +
    'react-use|' +
    'next-intl|' +
    'zod|' +
    'date-fns|' +
    'query-string|' +
    'uuid|' +
    'immer|' +
    'zustand|' +
    'tailwind-merge|' +
    'clsx' +
    ')/)'
  ],

  // CONTEXT7 SOURCE: /jestjs/jest - Reporter configuration for CI output
  // CI REPORTER: Jest documentation shows using appropriate reporters for CI environments
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'junit.xml',
      ancestorSeparator: ' › ',
      uniqueOutputName: 'false',
      suiteNameTemplate: '{filepath}',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
    }]
  ],

  // CONTEXT7 SOURCE: /jestjs/jest - Verbose output for CI debugging
  // CI DEBUGGING: Jest documentation shows verbose output for CI troubleshooting
  verbose: true,

  // CONTEXT7 SOURCE: /jestjs/jest - Error on deprecated APIs for forward compatibility
  // DEPRECATION HANDLING: Jest documentation shows failing on deprecated API usage
  errorOnDeprecated: true,
}

module.exports = createJestConfig(ciJestConfig)