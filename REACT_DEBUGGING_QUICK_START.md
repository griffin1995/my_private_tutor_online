# React Debugging Tools - Quick Start Guide

## TL;DR

You now have three powerful React debugging tools configured:

1. **Why-Did-You-Render** - Tracks unnecessary re-renders (dev only)
2. **Error Boundaries** - Catches and displays errors gracefully (prod-safe)
3. **React Error Logger** - Explains what went wrong (with solutions)

## Getting Started

### Run Analysis (60-90 seconds)

```bash
# Comprehensive health check
npm run debug:react

# Or use alias
npm run debug:react-health
```

This will:
- Scan all 310 React files
- Run TypeScript compilation check
- Run ESLint analysis
- Perform Next.js build check
- Analyse bundle size
- Generate detailed JSON report: `REACT_HEALTH_ANALYSIS_REPORT.json`

### Check Errors During Development

```bash
# Start dev server
npm run dev

# Watch console for these logs:
# 🔄 Why Did You Render - Unnecessary re-renders
# React Error Detected - Error categorisation with solutions
```

### Check TypeScript Strict Mode

```bash
# See all type errors
npm run typecheck

# Watch mode for development
npm run typecheck:watch

# Detailed diagnostics
npm run typecheck:trace
```

### Run Linter

```bash
# Check for React-specific issues
npm run lint

# Auto-fix what you can
npm run lint:fix

# Export JSON report
npm run debug:errors
```

---

## Current Issues Found

### Critical (Fix First!)

**19 files** using `useState`/`useEffect` for static content
- Fix: Use synchronous `getCMSContent()` instead
- Location: Pages and CMS files
- Risk: Homepage loading failures

**47 locations** rendering potentially invalid children
- Fix: Verify variables are strings/numbers, not objects
- Risk: "Objects are not valid as a React child" errors

### Performance Issues

**98 list items** missing `key` prop
- Fix: Add `key={item.id}` to mapped elements
- Risk: Incorrect re-rendering, state loss

### Low Priority

**11 files** without explicit React import
- Status: Fine in modern Next.js
- Fix: Add for clarity if desired

---

## Error Boundary Integration

### Global Protection (Recommended)

```typescript
// In src/app/layout.tsx
import { GlobalErrorBoundary } from '@/components/providers/GlobalErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <GlobalErrorBoundary>
          {children}
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
```

### Section-Level Protection

```typescript
// Isolate errors to specific sections
import { SectionErrorBoundary } from '@/components/providers/GlobalErrorBoundary';

export default function Page() {
  return (
    <>
      <Header />
      <SectionErrorBoundary sectionName="main-content">
        <MainContent />
      </SectionErrorBoundary>
      <Footer />
    </>
  );
}
```

### Component-Level Protection

```typescript
// Protect individual high-risk components
import { ComponentErrorBoundary } from '@/components/providers/GlobalErrorBoundary';

export default function Page() {
  return (
    <ComponentErrorBoundary componentName="testimonials">
      <TestimonialsComponent />
    </ComponentErrorBoundary>
  );
}
```

---

## Enabling Why-Did-You-Render for Components

During development, track specific components:

```typescript
// In your component file
import MyComponent from './MyComponent';

// Enable tracking
MyComponent.whyDidYouRender = true;

export default MyComponent;
```

Then look at browser console for messages like:
```
🔄 Why Did You Render
MyComponent re-rendered
  (props.data changed from {...} to {...})
  (context value changed)
```

---

## Using React Error Logger

### Manual Validation

```typescript
import { validateJSXChildren, safeRenderChildren } from '@/lib/debug/react-error-logger';

// Validate before rendering
const isValid = validateJSXChildren(myData);
if (!isValid) {
  console.warn('Invalid children detected');
}

// Safe rendering with fallback
const rendered = safeRenderChildren(myData) || <span>Error</span>;
```

### Error Information

When errors occur, console shows:

```
React Error Detected
┌─ Type    │ INVALID_CHILDREN_OBJECT
├─ Context │ component_MyComponent
├─ Time    │ 2:34:15 PM
└─ Message │ Attempted to render a plain object as React child

Diagnostic Recommendations
INVALID_CHILDREN_OBJECT
Message: Attempted to render a plain object as React child
Solution: Ensure you are not trying to render objects directly.
          Convert to string, JSON.stringify, or extract properties.
```

---

## Common Error Patterns & Fixes

### Error: "Objects are not valid as a React child"

**Cause**: Rendering plain object without property access

```typescript
// WRONG
<div>{userObject}</div>

// CORRECT
<div>{userObject.name}</div>
```

### Error: "Invalid hook call"

**Cause**: Hook used outside client component or conditionally

```typescript
// WRONG: Hook outside client component
// Missing "use client" directive
export default function Page() {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
}

// CORRECT: Add "use client" directive
'use client';

export default function Page() {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
}
```

### Error: "Missing key prop in list"

**Cause**: Array map without stable key

```typescript
// WRONG: No key or array index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// CORRECT: Unique, stable key
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

### Error: "Promise not a valid child"

**Cause**: Rendering async result directly

```typescript
// WRONG: Can't render Promise
return <div>{fetchData()}</div>

// CORRECT: Use useEffect + state
const [data, setData] = useState(null);
useEffect(() => {
  fetchData().then(setData);
}, []);
return <div>{data}</div>
```

---

## File Locations

**Debugging Components**:
- `/src/components/providers/GlobalErrorBoundary.tsx` - Error handling
- `/src/lib/debug/react-error-logger.ts` - Error diagnostics
- `/scripts/why-did-you-render.js` - Re-render tracking (already present)

**Analysis & Configuration**:
- `/scripts/analyze-react-health.mjs` - Full health analysis
- `/.eslintrc.js` - Linting rules with React protection
- `/package.json` - New npm scripts

**Reports**:
- `REACT_HEALTH_ANALYSIS_REPORT.json` - Generated by analysis script
- `REACT_DEBUGGING_TOOLS_DIAGNOSTIC_REPORT.md` - Comprehensive findings
- `REACT_DEBUGGING_QUICK_START.md` - This file

---

## Production Safety

All debugging tools are **development-only**:

✓ Why-Did-You-Render disabled in production
✓ Error Logger minimal overhead (standard error handling)
✓ Error Boundaries: Safe React feature (no performance cost)

**Zero performance impact** on production builds.

---

## Need Help?

1. **Check the console** - Most errors show solutions
2. **Read error message** - React provides good diagnostics
3. **Search code examples** - Solutions show before/after patterns
4. **See REACT_DEBUGGING_TOOLS_DIAGNOSTIC_REPORT.md** - Detailed recommendations

---

## Common Commands

```bash
# Quick health check
npm run debug:react

# Development server
npm run dev

# Strict type checking
npm run typecheck

# Linter (shows React errors)
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Run build (catches errors)
npm run build

# Watch TypeScript changes
npm run typecheck:watch
```

---

**Remember**: The debugging tools are here to catch errors early. Use them frequently during development!
