# TypeScript-Pro Subagent: Quick Reference Guide

## Overview

The TypeScript-Pro subagent specialises in modern TypeScript development with advanced type system expertise, performance optimisation, and production-ready patterns.

## Key Capabilities

### 1. Advanced Type System
- Generic constraints and type parameters
- Conditional types and type inference
- Mapped types and utility types
- Branded types and discriminated unions
- Type guards and type predicates

### 2. Performance Optimisation
- TypeScript compilation speed improvements
- Bundle size reduction strategies
- Build time optimisation
- Lazy loading patterns
- Code splitting techniques

### 3. React Integration
- Server components (Next.js 15)
- Client component patterns
- Hook best practices
- State management
- Error boundaries

### 4. Error Handling
- Comprehensive error strategies
- Exception handling patterns
- Error recovery mechanisms
- Logging integration

### 5. Testing Architecture
- Type-safe test setup
- Jest/Vitest patterns
- Test utilities
- Mocking strategies

### 6. Configuration Mastery
- TypeScript compiler options
- Build system integration
- Tool configuration
- Development environment setup

## How to Use TypeScript-Pro

### Direct Invocation

```
"Use typescript-pro to create a strongly-typed validation system
using discriminated unions for error handling."
```

### With Context

```
"Using Next.js 15 and React 19, have typescript-pro implement
a type-safe API client with proper error handling."
```

### For Code Review

```
"Have typescript-pro review this TypeScript component for:
- Type safety issues
- Performance optimisation opportunities
- Missing type annotations
- Generic improvements"
```

### Multi-Stage Workflow

```
1. typescript-pro: "Design type-safe event system architecture"
2. typescript-pro: "Implement with performance optimisations"
3. code-reviewer: "Review implementation for best practices"
4. test-automator: "Create comprehensive test suite"
```

## Common Request Patterns

### Pattern 1: Type System Design

**Request Format:**
```
"Have typescript-pro create a type-safe [domain] system with:
- Proper generic constraints
- Discriminated unions for variants
- Type predicates for narrowing
- Strict null checking
- JSDoc documentation"
```

**Example:**
```
"Have typescript-pro create a type-safe form validation system with:
- Discriminated unions for validation results
- Generic field type parameters
- Type predicates for error narrowing
- Chainable validation API
- Full TypeScript strict mode compliance"
```

### Pattern 2: Performance Optimisation

**Request Format:**
```
"Use typescript-pro to optimise this TypeScript codebase for:
- Faster compilation
- Smaller bundle size
- Improved type inference
- Better IDE performance"
```

**Example:**
```
"Use typescript-pro to optimise our Next.js application build time by:
- Configuring incremental compilation
- Removing unnecessary type checks
- Using project references
- Optimising tsconfig.json"
```

### Pattern 3: React Component Implementation

**Request Format:**
```
"Have typescript-pro implement a [component type] component with:
- Full TypeScript typing
- Server component support (if applicable)
- Proper prop interface definitions
- Generic support for [specific need]
- Comprehensive JSDoc"
```

**Example:**
```
"Have typescript-pro implement a generic DataTable component with:
- Full TypeScript typing for data types
- Server component compatibility
- Generic row/column type parameters
- Proper prop interface definitions
- Sorting and pagination type safety"
```

### Pattern 4: Error Handling Strategy

**Request Format:**
```
"Use typescript-pro to implement [feature] with:
- Result types or Either monads
- Discriminated unions for errors
- Type-safe error recovery
- Comprehensive error logging
- Client error handling"
```

**Example:**
```
"Use typescript-pro to implement API communication with:
- Discriminated union success/error types
- Result<T, E> wrapper type
- Type predicates for error narrowing
- Automatic error retry logic
- Structured error logging"
```

## TypeScript-Pro Output Expectations

### Code Quality
✅ Zero `any` types (unless justified with comments)
✅ Full strict mode compliance
✅ Comprehensive JSDoc comments
✅ Type inference over manual annotations
✅ Proper module exports

### Performance Optimisation
✅ Compilation time considerations documented
✅ Bundle size impact analysis
✅ Lazy loading recommendations
✅ Build cache optimisation
✅ Code splitting opportunities

### Testing Strategy
✅ Type-safe test setup
✅ Mock implementation patterns
✅ Edge case coverage
✅ Error scenario testing
✅ Performance test considerations

### Documentation
✅ JSDoc for all public APIs
✅ Type definition explanations
✅ Usage examples
✅ Edge cases documented
✅ Performance notes

## Integration with Your Project

### For My Private Tutor Online

The TypeScript-Pro agent is particularly valuable for:

1. **Form Systems**: Type-safe validation and submission
2. **API Clients**: Strongly-typed data fetching
3. **CMS Integration**: Type-safe content access
4. **State Management**: Type-safe state patterns
5. **Component Architecture**: Proper React component typing

### Example Request for Your Project

```
"Using the My Private Tutor Online tech stack (Next.js 15, React 19,
TypeScript 5.8+, Tailwind CSS), have typescript-pro create:
- A type-safe CMS content access layer
- Generic components with proper prop typing
- Discriminated union error handling
- Performance-optimised compilation configuration"
```

## Advanced Patterns with TypeScript-Pro

### Pattern 1: Discriminated Unions

```typescript
// Request: "Have typescript-pro create a discriminated union
// for form submission results with success and error variants"

// Expected output pattern:
export type FormResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; errors: ValidationError[] }
  | { status: 'pending' };
```

### Pattern 2: Generic Components

```typescript
// Request: "Have typescript-pro create a generic DataTable component
// that's type-safe for any data type"

// Expected output pattern:
export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ data, columns, onRowClick }: DataTableProps<T>) {
  // Implementation
}
```

### Pattern 3: Type Predicates

```typescript
// Request: "Have typescript-pro implement type predicates
// for safe type narrowing"

// Expected output pattern:
function isError(result: FormResult<any>): result is ErrorResult {
  return result.status === 'error';
}
```

### Pattern 4: Result Types

```typescript
// Request: "Have typescript-pro create a Result type
// for safe error handling without exceptions"

// Expected output pattern:
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

## Performance Considerations

### Build Time Optimisation

Ask typescript-pro to:
- Configure incremental compilation
- Enable skipLibCheck in tsconfig.json
- Use project references for large projects
- Optimise type checking

### Bundle Size Reduction

Ask typescript-pro to:
- Remove unused types
- Tree-shake unused code
- Lazy load heavy modules
- Use const assertions for literals

## Working with Other Agents

### TypeScript-Pro + Code-Reviewer

```
1. typescript-pro creates implementation
2. code-reviewer validates:
   - Type safety
   - Best practices
   - Security compliance
   - Performance
```

### TypeScript-Pro + Test-Automator

```
1. typescript-pro creates strongly-typed implementation
2. test-automator creates type-safe tests
3. Both leverage TypeScript for test correctness
```

### TypeScript-Pro + Performance-Engineer

```
1. typescript-pro implements with performance in mind
2. performance-engineer profiles and optimises
3. typescript-pro refactors with optimisations
```

## Common Requests for My Private Tutor Online

### Request 1: CMS Type Safety

```
"Have typescript-pro create a type-safe wrapper around our CMS
content JSON files with:
- Strict typing for all content structures
- Type-safe getters for common content queries
- Error handling for missing content
- Performance caching patterns"
```

### Request 2: Form Validation

```
"Use typescript-pro to create a type-safe form validation system
for our booking and enquiry forms with:
- Zod integration for schema validation
- Discriminated unions for validation results
- Type inference from schemas
- Comprehensive error messages
- Accessibility support"
```

### Request 3: API Client

```
"Have typescript-pro implement a type-safe API client for our
backend services with:
- Automatic TypeScript types from endpoints
- Proper error handling and recovery
- Request/response validation
- Type-safe mutation hooks for React
- Authentication token management"
```

### Request 4: Component Library Types

```
"Use typescript-pro to create comprehensive TypeScript types for
our component library including:
- Proper prop interfaces
- Generic components for flexibility
- Event handler typing
- HTML attribute extensions
- Complete IntelliSense support"
```

## Best Practices

1. **Always specify context**: Include framework versions and project details
2. **Define success criteria**: Explain what "done" looks like
3. **Request documentation**: Ask for JSDoc and usage examples
4. **Include performance needs**: Mention any performance constraints
5. **Specify error handling**: Define how errors should be handled

## When NOT to Use TypeScript-Pro

- **Visual/CSS issues**: Use frontend-developer instead
- **System architecture**: Use backend-architect for core design
- **Testing infrastructure**: Use test-automator for test setup
- **Security audits**: Use security-auditor for compliance

## Troubleshooting

### Issue: TypeScript-Pro creates overly complex types
**Solution**: Request "simpler, more pragmatic TypeScript patterns"

### Issue: Generated code doesn't compile
**Solution**: Ask typescript-pro to verify against your tsconfig.json settings

### Issue: Performance isn't improved
**Solution**: Have performance-engineer audit, then return to typescript-pro for optimisation

## Quick Command Reference

```bash
# When working with TypeScript-Pro, you might request:

"Create a type-safe [feature]"
"Optimise TypeScript compilation"
"Implement generic component [name]"
"Add comprehensive TypeScript types to [file]"
"Create discriminated union for [domain]"
"Implement Result type for error handling"
"Create type predicates for [types]"
"Optimise bundle size for TypeScript code"
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Advanced TypeScript Patterns](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

---

**Last Updated**: October 2025
**Version**: 1.0
**Specialisation**: Advanced TypeScript, Performance, React Integration
