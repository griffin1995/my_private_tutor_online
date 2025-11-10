# Hydration Provider - Quick Reference Guide

## Installation Status

✅ **INSTALLED AND ACTIVE** - HydrationProvider is automatically available in all components

## Import

```typescript
import { useHydration } from '@/components/providers';
```

## Basic Usage

```tsx
'use client';

import { useHydration } from '@/components/providers';

export function MyComponent() {
  const isHydrated = useHydration();

  if (!isHydrated) {
    return <div>Loading...</div>; // SSR-safe fallback
  }

  // Safe to use browser APIs here
  const data = localStorage.getItem('key');
  return <div>{data}</div>;
}
```

## Common Patterns

### Pattern 1: localStorage Access

```tsx
const isHydrated = useHydration();
if (!isHydrated) return <DefaultView />;

const savedTheme = localStorage.getItem('theme');
```

### Pattern 2: window/document Access

```tsx
const isHydrated = useHydration();
if (!isHydrated) return <StaticVersion />;

const scrollPosition = window.scrollY;
const userAgent = navigator.userAgent;
```

### Pattern 3: Progressive Enhancement

```tsx
const isHydrated = useHydration();

return isHydrated ? <InteractiveMap /> : <StaticMapImage />;
```

### Pattern 4: useEffect Guard

```tsx
const isHydrated = useHydration();

useEffect(() => {
  if (!isHydrated) return;

  // Safe browser API usage
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [isHydrated]);
```

## When to Use

✅ **USE when**:
- Accessing `localStorage`, `sessionStorage`
- Accessing `window`, `document`, `navigator`
- Using third-party libraries that expect browser environment
- Conditional rendering based on client-side state
- Media query checks with `matchMedia`

❌ **DON'T USE when**:
- Rendering static content that works on server
- Using Next.js built-in features (they handle SSR)
- Content that should be SEO-visible (needs SSR)

## Key Rules

1. **Always provide SSR fallback**: Never return `null` when not hydrated
2. **Match SSR output**: Fallback must match what server renders
3. **Guard browser APIs**: Check hydration before accessing window/localStorage
4. **Progressive enhancement**: Static version → Enhanced version after hydration

## Architecture

```
RootLayout
└── ClientProviders
    └── HydrationProvider ← Automatic
        └── All your components have access to useHydration()
```

## TypeScript

```typescript
const isHydrated: boolean = useHydration(); // Returns boolean
```

## Performance

- **Bundle size**: +0.3 KB (negligible)
- **Runtime cost**: Single boolean context value (minimal)
- **SSR impact**: Zero (no server-side execution)
- **Hydration time**: No measurable impact

## Troubleshooting

### Problem: "useContext must be used within a provider"
**Solution**: Component must be child of ClientProviders (already set up in layout.tsx)

### Problem: Hydration mismatch warnings
**Solution**: Ensure fallback render matches SSR output exactly

### Problem: Content flashing
**Solution**: Provide loading skeleton that matches final content dimensions

## Examples in Codebase

Look for these patterns:
```bash
# Search for existing useHydration usage
grep -r "useHydration" src/
```

## Full Documentation

See `/home/jack/Documents/my_private_tutor_online/src/components/providers/USAGE_EXAMPLES.md`

---

**Quick Decision Tree**:

```
Need to access browser API?
├─ Yes → Use useHydration()
│   └─ Provide SSR-safe fallback
└─ No → Use regular component logic
```

**Remember**: When in doubt, provide a fallback that works on the server!
