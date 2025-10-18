# Using Claude Code Subagents for My Private Tutor Online

## Project Overview

**Project**: My Private Tutor Online
**Status**: Enterprise Integration Complete
**Tech Stack**: Next.js 15.3.4, React 19, TypeScript 5.8+, Tailwind CSS 3.4.1
**Current**: 91 optimised routes, 11.0s build time, royal client standards
**Quality**: WCAG 2.1 AA, British English, synchronous CMS architecture

## Recommended Agent Assignments by Task Type

### Frontend Development

| Task | Primary Agent | Secondary Agent | Use When |
|------|--------------|-----------------|----------|
| Create React component | `frontend-developer` | `typescript-pro` | Building new UI |
| TypeScript implementation | `typescript-pro` | `frontend-developer` | Complex type requirements |
| Form creation | `frontend-developer` | `typescript-pro` | User input handling |
| Responsive design | `frontend-developer` | None | Mobile optimisation |
| Accessibility fix | `frontend-developer` | `code-reviewer` | WCAG compliance |

### Backend & API Development

| Task | Primary Agent | Secondary Agent | Use When |
|------|--------------|-----------------|----------|
| API design | `backend-architect` | `code-reviewer` | New endpoints |
| API implementation | `typescript-pro` | `test-automator` | Type-safe APIs |
| Database optimisation | `database-optimizer` | `performance-engineer` | Query performance |
| Authentication | `backend-security-coder` | `code-reviewer` | User security |

### Quality Assurance

| Task | Primary Agent | Secondary Agent | Use When |
|------|--------------|-----------------|----------|
| Security review | `security-auditor` | `backend-security-coder` | Pre-deployment |
| Performance analysis | `performance-engineer` | `database-optimizer` | Speed issues |
| Code review | `code-reviewer` | `security-auditor` | Before merging |
| Test creation | `test-automator` | `typescript-pro` | Coverage improvement |

---

## Common Workflows for Tutoring Platform

### Workflow 1: New Booking Feature

**Objective**: Add a new booking flow to the platform

```
Step 1: Architecture Design
Agent: backend-architect
Request: "Design the booking system API with:
- Student selection
- Tutor availability matching
- Session scheduling
- Payment integration
- Confirmation flow
Include database schema and endpoint specification."

Step 2: Frontend Implementation
Agent: frontend-developer
Request: "Create a React booking form component that:
- Shows available tutors
- Displays calendar for scheduling
- Collects session preferences
- Integrates with the booking API
- Provides real-time feedback
Include loading states and error handling."

Step 3: Type Safety
Agent: typescript-pro
Request: "Ensure the booking system has:
- Strongly-typed API requests/responses
- Discriminated unions for booking states
- Type-safe form validation
- Proper error handling
- Full type inference"

Step 4: Testing
Agent: test-automator
Request: "Create comprehensive tests for:
- API endpoint validation
- Form submission flows
- Edge cases (full availability, no tutors)
- Error scenarios
- Integration tests"

Step 5: Security & Performance Review
Agent: security-auditor
Request: "Audit the booking system for:
- Payment data security
- User data protection
- Input validation
- Authorization checks
- SQL injection prevention"

Agent: performance-engineer
Request: "Optimise the booking system:
- Database query performance
- API response time
- Bundle size impact
- Load time improvements"
```

### Workflow 2: CMS Content Management Enhancement

**Objective**: Add testimonials section

```
Step 1: Type Safety
Agent: typescript-pro
Request: "Create type-safe CMS functions for testimonials:
- Define TestimonialType with strict fields
- Create getTestimonials() cached function
- Add type predicates for filtering
- Ensure synchronous data access (NEVER async)
- Add JSDoc with examples"

Step 2: Component Creation
Agent: frontend-developer
Request: "Create a testimonials component that:
- Displays cached testimonials
- Filters by category (11+, GCSE, A-Level, Oxbridge)
- Shows student name, course, quote, verification
- Responsive layout (mobile-first)
- Accessible (WCAG AA)
- Uses @layer base for styling"

Step 3: Code Quality
Agent: code-reviewer
Request: "Review testimonials implementation for:
- Type safety compliance
- Component composition
- Styling patterns (design tokens)
- Accessibility features
- Performance implications"
```

### Workflow 3: Performance Optimisation Sprint

**Objective**: Reduce homepage load time

```
Step 1: Performance Analysis
Agent: performance-engineer
Request: "Profile the homepage and identify:
- Slow component renders
- Bundle size issues
- Image loading problems
- Database query bottlenecks
- Caching opportunities"

Step 2: Optimisation Planning
Agent: typescript-pro
Request: "Optimise TypeScript compilation:
- Configure incremental compilation
- Use skipLibCheck for faster builds
- Optimise tsconfig.json
- Implement tree-shaking"

Step 3: Implementation
Agent: frontend-developer
Request: "Implement homepage optimisations:
- Lazy load below-fold components
- Optimise image loading
- Implement code splitting
- Add performance monitoring"

Step 4: Verification
Agent: performance-engineer
Request: "Verify performance improvements:
- Measure new build time
- Check bundle size reduction
- Profile runtime performance
- Verify 11.0s build target maintained"
```

### Workflow 4: Security Compliance

**Objective**: Ensure OWASP compliance

```
Step 1: Security Audit
Agent: security-auditor
Request: "Perform comprehensive security audit:
- OWASP Top 10 compliance
- Input validation review
- Authentication/authorization
- Data protection
- Payment security
- API security
Include detailed remediation recommendations"

Step 2: Implementation
Agent: backend-security-coder
Request: "Implement security improvements:
- Add input validation/sanitisation
- Strengthen authentication
- Implement rate limiting
- Add security headers
- Secure payment handling"

Step 3: Frontend Security
Agent: frontend-security-coder
Request: "Implement frontend security:
- XSS prevention
- CSRF protection
- CSP headers
- Secure cookie handling
- Input validation on client"

Step 4: Verification
Agent: security-auditor
Request: "Re-audit implementation:
- Verify all vulnerabilities fixed
- Check for new vulnerabilities
- Validate compliance
- Test attack scenarios"
```

---

## Project-Specific Implementation Patterns

### Pattern 1: Type-Safe CMS Integration

```typescript
// ALWAYS use typescript-pro for this pattern

Request: "Create type-safe CMS functions for [feature] with:
1. Synchronous access (never async/await)
2. React cache() for performance
3. Discriminated unions for variants
4. Type predicates for filtering
5. Full TypeScript strict mode
6. Comprehensive JSDoc
7. Zero 'any' types"

// Expected output structure:
interface [Feature]Type {
  readonly id: string;
  readonly title: string;
  // ... properties
}

export const get[Feature] = cache((): [Feature]Type[] => {
  return contentData.[feature];
});

function is[Feature]Active(item: unknown): item is [Feature]Type {
  return typeof item === 'object' && item !== null && 'id' in item;
}
```

### Pattern 2: Component with PageLayout

```typescript
// Use frontend-developer with typescript-pro support

Request: "Create a [page] component that:
1. Uses PageLayout wrapper with showHeader={true} showFooter={true}
2. Includes SimpleHero section
3. Follows synchronous data access (from CMS cache functions)
4. Uses @layer base for styling (check globals.css)
5. Uses design tokens from tailwind.config.ts
6. No hardcoded colors (only token classes)
7. Mobile-first responsive design
8. Full TypeScript typing"

// Expected structure:
'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { get[Feature] } from '@/lib/cms/cms-content';

export default function [Page]Page() {
  const data = get[Feature](); // Synchronous!

  return (
    <>
      <section id='[page]-hero'>
        <SimpleHero {...} />
      </section>

      <PageLayout
        background='white'
        showHeader={true}
        showFooter={true}
        containerSize='full'>
        {/* Content */}
      </PageLayout>
    </>
  );
}
```

### Pattern 3: Form Implementation

```typescript
// Use frontend-developer + typescript-pro + test-automator

Step 1 (typescript-pro):
Request: "Create a type-safe form schema using Zod:
- Define form fields with validation
- Create FormResult discriminated union (success/error/pending)
- Type form state and handlers
- Include error recovery patterns"

Step 2 (frontend-developer):
Request: "Build form component:
- Use React Hook Form integration
- Show validation errors
- Handle submission with proper states
- Accessibility features (ARIA labels, error announcements)
- Loading states"

Step 3 (test-automator):
Request: "Create form tests:
- Valid submission flows
- Validation error scenarios
- Edge cases
- Accessibility compliance"
```

---

## Design Token Usage Guide

### Available Design Tokens

For the tutoring platform, key tokens from `tailwind.config.ts`:

```typescript
// Brand Colors
text-primary-700    // Navy blue (#3F4A7E)
text-accent-600    // Gold (#CA9E5B)

// Backgrounds
bg-primary-900      // Dark navy
bg-accent-50       // Light gold tint

// Text
text-neutral-800   // Main text
text-neutral-600   // Secondary text

// Semantic
text-semantic-error     // Error states
text-semantic-success   // Success states
text-semantic-warning   // Warning states

// Spacing
space-4    // 1rem
space-8    // 2rem
space-12   // 3rem

// Typography
font-display   // Premium serif
font-sans      // Professional sans
```

### When Requesting Design Work

**Always include**:
```
"Use these design tokens from tailwind.config.ts:
- text-primary-700 for navy text
- text-accent-600 for gold accents
- bg-primary-900 for dark backgrounds
- Check globals.css @layer base for automatic styling

NO hardcoded colors. Only use design tokens."
```

---

## Testing Strategy for Platform

### Unit Tests (Test-Automator)

```
Request: "Create unit tests for [component]:
- Prop rendering
- User interactions
- State changes
- Error handling
Include both happy path and edge cases"
```

### Integration Tests (Test-Automator)

```
Request: "Create integration tests:
- Component + child component interactions
- Form submission flow
- Data fetching + rendering
- Error boundary activation"
```

### E2E Tests (Test-Automator)

```
Request: "Create end-to-end tests:
- User booking flow
- Form submission to confirmation
- Navigation flows
- Payment processing (if applicable)"
```

---

## Performance Targets & Monitoring

### Build Time Target
- **Current**: 11.0 seconds
- **Monitor**: `npm run build` locally before deployment
- **Agent**: Use `performance-engineer` if exceeding target

### Runtime Performance
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Monitor**: Use Vercel analytics dashboard
- **Agent**: Use `performance-engineer` for issues

### Bundle Size
- **Monitor**: Check next/bundle-analysis output
- **Target**: Keep under 380KB (from CUSTOM_DOCS.md)
- **Agent**: Use `typescript-pro` for size optimisation

---

## Common Development Scenarios

### Scenario 1: Add New Subject Category

```
1. typescript-pro: Update CMS types for subject
2. backend-architect: Design subject endpoint (if needed)
3. frontend-developer: Update category filter UI
4. test-automator: Add tests for new category
5. code-reviewer: Final review
```

### Scenario 2: Improve Mobile Experience

```
1. frontend-developer: Audit mobile responsiveness
2. performance-engineer: Check mobile performance
3. frontend-developer: Implement improvements
4. test-automator: Test on multiple devices
5. accessibility-reviewer: WCAG AA compliance
```

### Scenario 3: Fix Testimonial Display Bug

```
1. debugger: Identify root cause
2. frontend-developer: Implement fix
3. test-automator: Add regression test
4. code-reviewer: Review fix quality
```

### Scenario 4: Optimise Database Query

```
1. performance-engineer: Profile query
2. database-optimizer: Suggest optimisation
3. typescript-pro: Type-safe implementation
4. test-automator: Performance tests
5. devops-troubleshooter: Production validation
```

---

## British English Standards

When requesting work, remind agents:

```
"Using British English standards:
- Colour (not color)
- Centre (not center)
- Optimise (not optimize)
- Customise (not customize)
- Licence (noun), License (verb)
- Compliance (not compliancy)"
```

---

## Deployment Checklist with Agents

Before each deployment:

```
Agent Verifications:

□ code-reviewer: Code quality check
□ security-auditor: Security compliance
□ test-automator: Test coverage verification
□ performance-engineer: Performance targets
□ devops-troubleshooter: Deployment readiness
□ frontend-developer: Visual consistency

Build Verification:
□ npm run build (no errors)
□ npm run build time ≤ 11.0s
□ Build deployment size acceptable
□ No new warnings

Manual Verification:
□ Homepage loads correctly
□ Navigation works
□ Forms submit successfully
□ Mobile view responsive
□ No console errors

Documentation:
□ Changes documented
□ Team notified
□ Rollback plan documented
```

---

## Integration with Your Workflow

### For Daily Development

```bash
# Create new component
claude-code --agent frontend-developer \
  "Create [component] following My Private Tutor Online patterns"

# Type-safe implementation
claude-code --agent typescript-pro \
  "Add strong TypeScript typing to [file]"

# Before commit
claude-code --agent code-reviewer \
  "Review changes in [file] for best practices"

# Before merge
claude-code --agent security-auditor \
  "Security check on [feature]"
```

### For Feature Development

```bash
# Step 1: Design
claude-code --agent backend-architect \
  "Design [feature] API"

# Step 2: Frontend
claude-code --agent frontend-developer \
  "Create [feature] UI"

# Step 3: Testing
claude-code --agent test-automator \
  "Create [feature] test suite"

# Step 4: Final Review
claude-code --agent code-reviewer \
  "Final review of [feature]"
```

---

## Troubleshooting Common Issues

### Issue: Build time exceeds 11.0s

```
1. performance-engineer: Profile and identify bottleneck
2. typescript-pro: Optimise TypeScript compilation
3. frontend-developer: Code split heavy components
4. performance-engineer: Verify improvement
```

### Issue: Accessibility compliance warning

```
1. frontend-developer: Identify accessibility issues
2. test-automator: Add accessibility tests
3. frontend-developer: Implement fixes
4. code-reviewer: Verify compliance
```

### Issue: TypeScript compilation errors

```
1. debugger: Identify error source
2. typescript-pro: Fix with proper types
3. test-automator: Add test coverage
4. code-reviewer: Review solution
```

### Issue: Performance degradation

```
1. performance-engineer: Profile and identify cause
2. database-optimizer: Database query review
3. frontend-developer: Component optimisation
4. performance-engineer: Verify improvement
```

---

## Documentation Resources

Created Documentation:
- `CLAUDE_CODE_SUBAGENTS_GUIDE.md` - Complete subagents overview
- `TYPESCRIPT_PRO_QUICK_REFERENCE.md` - TypeScript-Pro specialisation
- `SUBAGENT_SETUP_GUIDE.md` - Installation and configuration
- `USING_SUBAGENTS_FOR_TUTORING_PLATFORM.md` - This file

---

## Quick Reference: Agent Selection by Task

| Task | Best Agent | Alternative |
|------|-----------|-------------|
| Create component | frontend-developer | typescript-pro |
| Type safety | typescript-pro | code-reviewer |
| Performance | performance-engineer | devops-troubleshooter |
| Security | security-auditor | backend-security-coder |
| Testing | test-automator | code-reviewer |
| Debugging | debugger | devops-troubleshooter |
| Architecture | backend-architect | architect-reviewer |
| Code quality | code-reviewer | security-auditor |
| Database | database-optimizer | performance-engineer |
| Deployment | devops-troubleshooter | cloud-architect |

---

**Last Updated**: October 18, 2025
**Version**: 1.0
**Project Status**: Enterprise Integration Complete, Ready for Agent-Assisted Development
