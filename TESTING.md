# Testing Guide - My Private Tutor Online

Complete testing strategy for protecting the £400,000+ revenue opportunity and enterprise-grade code quality.

---

## Quick Start

### Installation

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react ts-jest @types/jest jest-environment-jsdom

# Run tests
npm run test:unit                    # Run all unit tests
npm run test:unit:watch              # Watch mode for development
npm run test:coverage                # Generate coverage report
npm run test:security                # Run security-focused tests only
npm run quality                      # Run full quality suite
```

### First Test

```bash
# Run the proof-of-concept security tests
npm run test:unit -- tests/unit/middleware/security.test.ts
```

---

## Project Testing Standards

### Testing Pyramid

```
      E2E Tests (10%)
   Integration Tests (25%)
      Unit Tests (65%)
```

- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test features that combine multiple units
- **E2E Tests**: Test complete user journeys

### Coverage Requirements

| Path | Minimum Coverage |
|------|------------------|
| Global Code | 80% |
| Security Middleware | 100% |
| CMS Content Module | 100% |
| Contact Form API | 100% |
| Authentication | 95% |
| Components (Critical) | 90% |
| Utilities | 80% |

---

## Test Organization

### Directory Structure

```
tests/
├── unit/
│   ├── api/
│   │   ├── contact.test.ts
│   │   ├── analytics.test.ts
│   │   └── auth.test.ts
│   ├── middleware/
│   │   ├── security.test.ts          # CRITICAL: 100% coverage
│   │   └── csrf.test.ts
│   ├── cms/
│   │   └── cms-content.test.ts       # CRITICAL: 100% coverage
│   └── components/
│       ├── Navigation.test.tsx
│       └── ContactForm.test.tsx
├── integration/
│   ├── contact-form-flow.test.ts
│   ├── cms-loading.test.ts
│   └── auth-flow.test.ts
├── e2e/
│   ├── homepage.spec.ts
│   ├── contact-form.spec.ts
│   └── navigation.spec.ts
├── fixtures/
│   └── contact-form.factory.ts       # Test data factories
├── mocks/
│   └── api-handlers.ts               # API mocking utilities
└── setup.ts                          # Global test configuration
```

---

## Writing Unit Tests

### Pattern: Arrange-Act-Assert

```typescript
describe('Feature Name', () => {
	describe('Specific Behavior', () => {
		it('should perform expected action', () => {
			// Arrange: Set up test data
			const input = { name: 'John', email: 'john@example.com' };

			// Act: Execute the function/component
			const result = validateContactForm(input);

			// Assert: Verify the result
			expect(result.isValid).toBe(true);
		});
	});
});
```

### Example: Security Function Testing

```typescript
describe('Rate Limiting', () => {
	it('should allow requests within limit', () => {
		// Arrange
		const identifier = 'user-123';
		const limit = 5;

		// Act
		const result1 = checkRateLimit(identifier, limit);

		// Assert
		expect(result1.allowed).toBe(true);
		expect(result1.remaining).toBe(4);
	});

	it('should block requests exceeding limit', () => {
		const identifier = 'user-456';

		// Use up all 3 requests
		checkRateLimit(identifier, 3);
		checkRateLimit(identifier, 3);
		checkRateLimit(identifier, 3);

		// Next request should be blocked
		const result = checkRateLimit(identifier, 3);
		expect(result.allowed).toBe(false);
	});
});
```

### Example: Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/ContactForm';

describe('ContactForm Component', () => {
	it('should render form fields', () => {
		render(<ContactForm />);

		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
	});

	it('should validate email on blur', async () => {
		const user = userEvent.setup();
		render(<ContactForm />);

		const emailInput = screen.getByLabelText(/email/i);
		await user.type(emailInput, 'invalid-email');
		await user.click(document.body); // Blur

		expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
	});

	it('should submit form with valid data', async () => {
		const user = userEvent.setup();
		const onSubmit = jest.fn();

		render(<ContactForm onSubmit={onSubmit} />);

		await user.type(screen.getByLabelText(/name/i), 'John Smith');
		await user.type(screen.getByLabelText(/email/i), 'john@example.com');
		await user.click(screen.getByRole('button', { name: /submit/i }));

		expect(onSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				name: 'John Smith',
				email: 'john@example.com',
			})
		);
	});
});
```

---

## Writing Integration Tests

### Pattern: Feature Flow

Integration tests verify that multiple units work together correctly.

```typescript
describe('Contact Form Submission Flow', () => {
	it('should process valid form submission', async () => {
		// Arrange: Set up test data and mocks
		const formData = {
			name: 'Sarah Johnson',
			email: 'sarah@example.com',
			subject: 'GCSE Chemistry',
			message: 'I need help with GCSE Chemistry'
		};

		// Act: Submit form (integration step)
		const response = await submitContactForm(formData);

		// Assert: Verify entire flow succeeded
		expect(response.success).toBe(true);
		expect(response.reference).toMatch(/^MPT-\d{6}-[A-Z0-9]{6}$/);
		// Also verify side effects (email sent, analytics logged, etc.)
	});

	it('should handle validation errors', async () => {
		const invalidData = {
			name: 'A', // Too short
			email: 'invalid',
			subject: 'Test',
			message: 'Test'
		};

		const response = await submitContactForm(invalidData);

		expect(response.success).toBe(false);
		expect(response.errors).toContain('name');
		expect(response.errors).toContain('email');
	});
});
```

---

## Writing E2E Tests (Playwright)

### Pattern: User Journey

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
	test('should navigate between pages', async ({ page }) => {
		// Arrange: Navigate to homepage
		await page.goto('/');

		// Act: Click navigation link
		await page.click('a:has-text("About")');

		// Assert: Verify navigation worked
		expect(page.url()).toContain('/about');
		expect(await page.title()).toContain('About');
	});

	test('should handle contact form submission', async ({ page }) => {
		await page.goto('/contact');

		// Fill form
		await page.fill('input[name="name"]', 'John Smith');
		await page.fill('input[name="email"]', 'john@example.com');
		await page.fill('textarea[name="message"]', 'I need tutoring services.');

		// Submit
		await page.click('button:has-text("Submit")');

		// Verify success
		expect(await page.textContent('body')).toContain('Thank you');
	});
});
```

---

## Test Data Factories

### Creating Reusable Test Data

```typescript
// tests/fixtures/contact-form.factory.ts
import { faker } from '@faker-js/faker';

export const createContactFormData = (overrides = {}) => ({
	name: faker.person.fullName(),
	email: faker.internet.email(),
	subject: 'Tutoring Enquiry',
	message: 'I am interested in tutoring services.',
	...overrides
});

// Usage in tests
it('should accept valid contact form', () => {
	const formData = createContactFormData();
	const result = validateForm(formData);
	expect(result.isValid).toBe(true);
});

// Override specific fields
it('should reject form with missing email', () => {
	const formData = createContactFormData({ email: '' });
	const result = validateForm(formData);
	expect(result.isValid).toBe(false);
});
```

---

## Mocking & Fixtures

### Mocking API Calls

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
	rest.post('/api/contact', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				success: true,
				reference: 'MPT-202411-ABC123'
			})
		);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Contact Form API', () => {
	it('should handle successful submission', async () => {
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify({
				name: 'John',
				email: 'john@example.com',
				message: 'Test'
			})
		});

		const data = await response.json();
		expect(data.success).toBe(true);
	});
});
```

### Mocking Dependencies

```typescript
jest.mock('@/lib/cms/cms-content', () => ({
	getCMSContent: jest.fn(() => ({
		navigation: {
			items: [
				{ label: 'Home', href: '/' },
				{ label: 'About', href: '/about' }
			]
		}
	}))
}));
```

---

## Coverage Analysis

### Generating Coverage Reports

```bash
# Generate HTML coverage report
npm run test:coverage

# View the report
open coverage/index.html
```

### Interpreting Coverage

```
Statements: % of executable code statements
Branches: % of conditional branches (if/else, ternary)
Functions: % of function definitions
Lines: % of lines executed

Target: 80% global, 100% critical paths
```

### Improving Coverage

1. Identify untested files:
   ```bash
   npm run test:coverage -- --verbose
   ```

2. Review coverage report for gaps

3. Write targeted tests for uncovered branches

---

## Critical Testing Paths

### 1. CMS Content (ZERO TOLERANCE)

**File**: `src/lib/cms/cms-content.ts`

**Test**: `tests/unit/cms/cms-content.test.ts`

**Must Test**:
- ✓ All JSON files load without errors
- ✓ No async patterns present
- ✓ All required properties exist
- ✓ Navigation data matches expected structure
- ✓ FAQ categories and subcategories load

**Coverage**: MUST BE 100%

### 2. Security Middleware (ZERO TOLERANCE)

**File**: `src/middleware/security.ts`

**Test**: `tests/unit/middleware/security.test.ts`

**Must Test**:
- ✓ Rate limiting works correctly
- ✓ CSRF tokens generate securely
- ✓ XSS payloads blocked
- ✓ SQL injection patterns detected
- ✓ Input validation enforced

**Coverage**: MUST BE 100%

### 3. Contact Form API (CRITICAL)

**File**: `src/app/api/contact/route.ts`

**Test**: `tests/unit/api/contact.test.ts`

**Must Test**:
- ✓ Valid form accepted
- ✓ Invalid email rejected
- ✓ XSS/SQL injection blocked
- ✓ Rate limiting enforced
- ✓ Enquiry reference generated

**Coverage**: MUST BE 100%

---

## Debugging Tests

### Run Single Test File

```bash
npm run test:unit -- tests/unit/middleware/security.test.ts
```

### Watch Mode (Re-run on Change)

```bash
npm run test:unit:watch
```

### Debug Mode (Interactive)

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Verbose Output

```bash
npm run test:unit -- --verbose
```

---

## Performance Testing

### Monitoring Test Execution Time

```bash
npm run test:coverage -- --logHeapUsage
```

### Optimising Test Performance

1. **Run tests in parallel**: Jest does this automatically
2. **Use mocks instead of real implementations**: Faster and more reliable
3. **Isolate tests**: No dependencies between test cases
4. **Use beforeEach/afterEach**: Clean setup/teardown

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:security

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

---

## Common Testing Scenarios

### Testing Form Validation

```typescript
describe('Form Validation', () => {
	it('should validate email format', () => {
		expect(validateEmail('invalid')).toBe(false);
		expect(validateEmail('valid@example.com')).toBe(true);
	});

	it('should check required fields', () => {
		const errors = validateForm({ name: '', email: '' });
		expect(errors.name).toBe('Name is required');
		expect(errors.email).toBe('Email is required');
	});
});
```

### Testing Async Operations

```typescript
describe('Async Operations', () => {
	it('should fetch data', async () => {
		const data = await fetchUserData('123');
		expect(data.id).toBe('123');
	});

	it('should handle fetch errors', async () => {
		await expect(fetchUserData('invalid')).rejects.toThrow('Not found');
	});
});
```

### Testing Component State

```typescript
describe('Component State', () => {
	it('should toggle state on click', async () => {
		const { rerender } = render(<Toggle />);

		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Off');

		await userEvent.click(button);
		expect(button).toHaveTextContent('On');
	});
});
```

---

## Best Practices

### Do's

- ✓ Test behavior, not implementation
- ✓ Use descriptive test names
- ✓ Follow Arrange-Act-Assert pattern
- ✓ Keep tests focused and isolated
- ✓ Use factories for complex test data
- ✓ Test error cases as well as happy path
- ✓ Clean up after tests (beforeEach/afterEach)

### Don'ts

- ✗ Don't test implementation details
- ✗ Don't create tight coupling to component structure
- ✗ Don't use hardcoded values (use factories instead)
- ✗ Don't let tests depend on each other
- ✗ Don't have side effects in tests
- ✗ Don't ignore test failures
- ✗ Don't write tests after code is deployed

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Getting Help

### Test Fails?

1. Read the error message carefully
2. Check the test output (red X marks the issue)
3. Add `.only` to run single test: `it.only('should...', () => {})`
4. Add `debug` to inspect component: `debug()`
5. Check test fixtures and mocks are correct

### Test is Flaky?

1. Avoid hardcoding timings
2. Use `waitFor` instead of `setTimeout`
3. Ensure tests clean up properly
4. Check for race conditions

### Coverage is Low?

1. Identify uncovered files in coverage report
2. Add tests for uncovered branches
3. Use coverage thresholds to enforce minimums

---

**Last Updated**: 4 November 2025
**Test Coverage Target**: 85%+ (80% general, 100% critical paths)
**Critical Modules**: Security, CMS, Contact Form API (100% required)
