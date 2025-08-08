const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// CONTEXT7 SOURCE: /jestjs/jest - Official Jest configuration patterns for moduleNameMapper
// CONTEXT7 SOURCE: /context7/nextjs - Next.js testing configuration with jest environment
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // FIX REASON: moduleNameMapper is correct property name, not moduleNameMapping 
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // CONTEXT7 SOURCE: /jestjs/jest - Static asset mocking patterns for webpack-style imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|avif|ico|bmp|svg)$/i': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/app/layout.tsx',
    '!src/app/globals.css',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/tests/e2e/'],
  // CONTEXT7 SOURCE: /jestjs/jest - Test match patterns for Jest test discovery  
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
  // CONTEXT7 SOURCE: /jestjs/jest - Transform ignore patterns for ES modules in node_modules
  // CONTEXT7 SOURCE: /context7/nextjs - Next.js transform ignore patterns for modern packages
  transformIgnorePatterns: [
    'node_modules/(?!(react-spring|framer-motion|lucide-react|@radix-ui|@testing-library|@tanstack|@hookform|@headlessui)/)',
  ],
}

module.exports = createJestConfig(customJestConfig)