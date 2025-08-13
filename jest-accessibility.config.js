/**
 * CONTEXT7 SOURCE: /testing-library/react-testing-library - Jest configuration for accessibility testing
 * ACCESSIBILITY CONFIG: Comprehensive Jest configuration for WCAG 2.1 AA compliance testing
 * 
 * Jest Accessibility Testing Configuration
 * Specialized configuration for running accessibility tests including:
 * - axe-core integration for automated testing
 * - Custom matchers for accessibility assertions
 * - Screen reader simulation testing
 * - Color contrast validation testing
 * - Motion preference testing
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - WCAG 2.1 AA compliance testing
 * - Context7 MCP documentation only
 * - Royal client accessibility standards
 */

const nextJest = require('next/jest')

// CONTEXT7 SOURCE: /vercel/next.js - Next.js Jest configuration for accessibility testing
const createJestConfig = nextJest({
  dir: './',
})

// CONTEXT7 SOURCE: /testing-library/react-testing-library - Custom Jest configuration for accessibility
const customJestConfig = {
  displayName: 'Accessibility Tests',
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setup/accessibility-setup.ts'
  ],
  testMatch: [
    '<rootDir>/src/tests/accessibility/**/*.test.{js,jsx,ts,tsx}'
  ],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  collectCoverageFrom: [
    'src/components/faq/**/*.{ts,tsx}',
    'src/app/faq/**/*.{ts,tsx}',
    'src/hooks/use-accessibility-preferences.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage/accessibility',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 85,
      statements: 85
    }
  },
  // CONTEXT7 SOURCE: /testing-library/react-testing-library - Custom test timeout for accessibility tests
  testTimeout: 30000,
  verbose: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  // CONTEXT7 SOURCE: /w3c/wcag - Custom reporters for accessibility compliance reporting
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: 'coverage/accessibility/html-report',
        filename: 'accessibility-report.html',
        pageTitle: 'FAQ System - WCAG 2.1 AA Compliance Report',
        logoImgPath: './public/images/logo.png',
        hideIcon: false,
        expand: true,
        customInfos: [
          {
            title: 'Accessibility Standards',
            value: 'WCAG 2.1 AA Compliance'
          },
          {
            title: 'Testing Framework',
            value: 'axe-core + React Testing Library'
          },
          {
            title: 'Target Components',
            value: 'FAQ System Components'
          }
        ]
      }
    ]
  ]
}

// Export the Jest config created by next/jest\nmodule.exports = createJestConfig(customJestConfig)