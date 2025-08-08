# Testing Infrastructure - My Private Tutor Online

**Royal Client Quality Standards - Zero-Compromise Testing Framework**

## Overview

This document outlines the comprehensive testing infrastructure for My Private Tutor Online, designed to maintain royal client-worthy reliability and quality standards.

## Testing Architecture

### 1. Unit Testing (Jest + React Testing Library)
- **Framework**: Jest 30.0.4 with Next.js 15+ integration
- **Component Testing**: React Testing Library 16.3.0
- **Coverage Target**: 80% minimum for all metrics
- **Royal Standard**: Zero tolerance for critical path failures

### 2. Integration Testing
- **Business Logic**: Critical user journeys tested end-to-end
- **CMS Integration**: Content management system reliability testing
- **Payment Processing**: Secure transaction flow validation
- **Royal Client Communication**: Premium service standards verification

### 3. End-to-End Testing (Playwright)
- **Browser Testing**: Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- **User Journeys**: Complete booking and assessment flows
- **Royal Client Paths**: Premium service user experiences
- **Performance Standards**: Core Web Vitals compliance

### 4. Accessibility Testing
- **WCAG 2.1 AA Compliance**: Mandatory for all components
- **Screen Reader Support**: Full accessibility for assistive technologies
- **Keyboard Navigation**: Complete keyboard-only user journeys
- **Royal Standards**: Inclusive design for all users

## Configuration Files

### Jest Configuration (`jest.config.js`)
```javascript
// CONTEXT7 SOURCE: /jestjs/jest - Official Jest configuration patterns
// CONTEXT7 SOURCE: /context7/nextjs - Next.js testing configuration

const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
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
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-spring|framer-motion|lucide-react|@radix-ui|@testing-library|@tanstack|@hookform|@headlessui)/)',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

### Test Setup (`jest.setup.js`)
- **Custom Matchers**: @testing-library/jest-dom extensions
- **Mock Providers**: Next.js router, Framer Motion, IntersectionObserver
- **Web API Mocks**: ResizeObserver, matchMedia, localStorage
- **Global Configuration**: Console warning suppression

## Test Scripts

### Development Testing
```bash
npm run test              # Run all unit and integration tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage reports
```

### Quality Assurance
```bash
npm run test:all          # Complete test suite (unit + e2e)
npm run test:accessibility # WCAG compliance testing
npm run test:performance   # Core Web Vitals validation
npm run quality           # Full quality gate (lint + test + typecheck)
```

### CI/CD Testing
```bash
npm run test:e2e          # Playwright end-to-end tests
npm run test:e2e:ui       # Interactive Playwright testing
```

## Testing Standards

### 1. Royal Client Quality Requirements
- **Zero Critical Failures**: All critical paths must have 100% passing tests
- **Performance Standards**: LCP <2.5s, FID <100ms, CLS <0.1
- **Accessibility Compliance**: WCAG 2.1 AA mandatory
- **Security Testing**: Payment flows and data handling validation

### 2. Test Categories and Priorities

#### P0 (Critical - Never Fail)
- Homepage rendering and navigation
- Booking system functionality
- Payment processing security
- Royal client communication flows
- CMS content delivery

#### P1 (High Priority)
- Component rendering tests
- Form validation and submission
- API integration tests
- Error boundary handling
- Accessibility compliance

#### P2 (Standard Priority)
- UI component variations
- Edge case handling
- Performance optimisation
- Cross-browser compatibility
- Mobile responsiveness

### 3. Coverage Requirements
- **Minimum Overall Coverage**: 80%
- **Critical Path Coverage**: 100%
- **Component Coverage**: 90%
- **Business Logic Coverage**: 95%

## CI/CD Pipeline Integration

### GitHub Actions Workflow (`.github/workflows/test.yml`)
1. **Multi-Node Testing**: Node.js 18.x and 20.x compatibility
2. **Quality Gates**: Type checking, linting, and comprehensive testing
3. **Accessibility Testing**: Automated WCAG compliance verification
4. **Performance Testing**: Core Web Vitals monitoring
5. **Coverage Reporting**: Codecov integration with fail-safe thresholds

### Quality Gates
All tests must pass before deployment:
- Unit and Integration tests: 100% success rate
- Accessibility tests: WCAG 2.1 AA compliance
- Performance tests: Core Web Vitals thresholds met
- Build process: Successful Next.js production build

## Test Structure

### Directory Layout
```
├── src/
│   ├── app/
│   │   └── __tests__/          # App Router page tests
│   ├── components/
│   │   └── __tests__/          # Component unit tests
│   └── lib/
│       └── **/*.test.ts        # Utility and service tests
├── tests/
│   ├── unit/                   # Isolated unit tests
│   ├── integration/            # Cross-system integration tests
│   ├── e2e/                    # End-to-end Playwright tests
│   ├── setup/                  # Test configuration and utilities
│   └── utils/                  # Testing helper functions
└── __mocks__/                  # Mock files for static assets
```

### Test File Naming Conventions
- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- Component tests: `Component.test.tsx` in `__tests__/` folders
- E2E tests: `*.spec.ts` in `tests/e2e/`

## Mock Configuration

### Static Asset Mocks
- **Images/Media**: `__mocks__/fileMock.js`
- **Stylesheets**: `identity-obj-proxy` for CSS modules
- **Fonts**: Next.js font system mocking

### API and Service Mocks
- **CMS Service**: Complete CMS system mocking for isolated testing
- **Payment APIs**: Secure mock implementations for transaction testing
- **External Services**: Royal client communication service mocks

## Performance and Accessibility Testing

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Bundle Analysis**: Automated bundle size tracking
- **Load Testing**: Page load performance validation

### Accessibility Standards
- **Screen Readers**: NVDA, JAWS, VoiceOver compatibility
- **Keyboard Navigation**: Complete keyboard-only user journeys
- **Colour Contrast**: WCAG AA colour contrast compliance
- **Focus Management**: Proper focus handling and visual indicators

## Troubleshooting

### Common Issues and Solutions

#### Jest Configuration Errors
- **Module Resolution**: Ensure `moduleNameMapper` correctly maps project aliases
- **Transform Patterns**: Include all ES modules in `transformIgnorePatterns`
- **Setup Files**: Verify `jest.setup.js` loads all required mocks

#### Component Testing Issues
- **Async Components**: Use proper async/await patterns with React Testing Library
- **Mock Dependencies**: Ensure all external dependencies are properly mocked
- **State Management**: Mock complex state providers for isolated component testing

#### CI/CD Pipeline Failures
- **Node.js Compatibility**: Test locally with multiple Node.js versions
- **Environment Variables**: Ensure all required environment variables are set
- **Cache Issues**: Clear npm cache if dependencies fail to install

## Maintenance and Updates

### Regular Maintenance Tasks
1. **Weekly**: Review test coverage reports and address gaps
2. **Monthly**: Update test dependencies and review deprecated patterns
3. **Quarterly**: Performance baseline review and optimization
4. **Annually**: Complete testing strategy review and architecture updates

### Updating Test Dependencies
```bash
npm update jest @testing-library/react @testing-library/jest-dom
npm update @playwright/test @axe-core/playwright
npm audit fix --force  # Address security vulnerabilities
```

## Royal Client Standards Compliance

### Testing Requirements for Premium Service
1. **Zero Downtime Deployment**: All tests must pass before any production deployment
2. **Data Security**: Payment and personal data handling must have 100% test coverage
3. **Performance Guarantee**: All pages must meet royal client performance standards
4. **Accessibility Excellence**: WCAG 2.1 AAA compliance preferred, AA mandatory
5. **Error Handling**: Graceful degradation and error recovery testing

### Success Metrics
- **Test Suite Execution Time**: <2 minutes for fast feedback
- **Coverage Maintenance**: Consistent 80%+ coverage across all test runs
- **Zero Critical Failures**: No critical path test failures in production deployments
- **Performance Standards**: All Core Web Vitals consistently meet royal client expectations

---

**Document Version**: 1.0
**Last Updated**: August 2025
**Maintained By**: Test Automation Team
**Review Schedule**: Quarterly

For questions or issues with the testing infrastructure, please refer to the troubleshooting section or create an issue in the project repository.