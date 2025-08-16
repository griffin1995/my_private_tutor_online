// CONTEXT7 SOURCE: /vercel/next.js - Official Next.js Jest configuration with next/jest transformer
// CONFIGURATION REASON: Next.js 15 + React 19 compatibility with automatic setup for SWC transforms
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// CONTEXT7 SOURCE: /vercel/next.js - Jest configuration for Next.js applications with React Testing Library
// COMPATIBILITY REASON: Enhanced configuration for Next.js 15 + React 19 + Framer Motion compatibility
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  // CONTEXT7 SOURCE: /vercel/next.js - Module name mapping for Next.js projects with absolute imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // CONTEXT7 SOURCE: /vercel/next.js - Static asset mocking patterns for Next.js testing
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // CONTEXT7 SOURCE: /websites/motion_dev - Framer Motion mocking for Jest testing compatibility
    '^framer-motion$': '<rootDir>/__mocks__/framer-motion.js',
    '^framer-motion/dist/(.*)$': '<rootDir>/__mocks__/framer-motion.js',
    // CONTEXT7 SOURCE: /jestjs/jest - Lucide React icon mocking for testing environment
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',
    '^lucide-react/dist/(.*)$': '<rootDir>/__mocks__/lucide-react.js',
    // CONTEXT7 SOURCE: /vercel/next.js - Next.js font and server-only mocking
    '@next/font/(.*)': '<rootDir>/__mocks__/nextFontMock.js',
    'next/font/(.*)': '<rootDir>/__mocks__/nextFontMock.js',
    'server-only': '<rootDir>/__mocks__/empty.js',
    // CONTEXT7 SOURCE: /vercel/next.js - ES module compatibility for Jest testing
    '^uuid$': 'uuid',
    '^nanoid$': 'nanoid',
    '^date-fns$': 'date-fns',
    // CONTEXT7 SOURCE: /jestjs/jest - Module resolution for modern ES modules with subpath exports
    '^tailwind-merge$': 'tailwind-merge',
    '^zod$': 'zod',
  },
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
  testPathIgnorePatterns: [
    '<rootDir>/.next/', 
    '<rootDir>/node_modules/', 
    '<rootDir>/tests/e2e/',
    '<rootDir>/tests/integration/',
  ],
  // CONTEXT7 SOURCE: /vercel/next.js - Test match patterns for Jest test discovery in Next.js projects
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  // CONTEXT7 SOURCE: /vercel/next.js - Transform ignore patterns for modern ES modules in Next.js
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
  // CONTEXT7 SOURCE: /vercel/next.js - Optimized Jest configuration for Next.js performance
  maxWorkers: '50%',
  testTimeout: 30000,
}

module.exports = createJestConfig(customJestConfig)