# Hydration Provider Usage Examples

## Overview

The HydrationProvider tracks client-side mounting state to prevent SSR/client hydration mismatches in Next.js 15 + React 19 applications.

## Basic Usage

### 1. Provider Integration (Already Done)

The HydrationProvider is automatically integrated in ClientProviders:

```tsx
// src/app/layout.tsx
import { ClientProviders } from '@/components/providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
```

### 2. Using the useHydration Hook

**Example: Client-Only Feature with Fallback**

```tsx
'use client';

import { useHydration } from '@/components/providers';

export function ThemeToggle() {
  const isHydrated = useHydration();

  if (!isHydrated) {
    // Return SSR-compatible fallback
    return <div className="w-10 h-10 bg-neutral-200 rounded" />;
  }

  // Safe to access browser APIs after hydration
  const currentTheme = window.localStorage.getItem('theme');

  return (
    <button onClick={() => toggleTheme()}>
      {currentTheme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

**Example: Conditional Rendering Based on Hydration**

```tsx
'use client';

import { useHydration } from '@/components/providers';

export function UserGreeting() {
  const isHydrated = useHydration();

  // During SSR and initial render, show generic greeting
  if (!isHydrated) {
    return <p>Welcome to My Private Tutor Online</p>;
  }

  // After hydration, safe to access localStorage
  const userName = localStorage.getItem('userName');

  return <p>Welcome back, {userName || 'Guest'}!</p>;
}
```

**Example: Progressive Enhancement**

```tsx
'use client';

import { useHydration } from '@/components/providers';

export function InteractiveMap() {
  const isHydrated = useHydration();

  if (!isHydrated) {
    // Show static image during SSR
    return (
      <img
        src="/map-static.png"
        alt="Location map"
        className="w-full h-64 object-cover"
      />
    );
  }

  // Load interactive map after hydration
  return <DynamicMapComponent />;
}
```

## Best Practices

### ✅ DO: Use for Client-Only Features

```tsx
function ClientFeature() {
  const isHydrated = useHydration();

  if (!isHydrated) return <LoadingSkeleton />;

  // Safe browser API access
  const userAgent = navigator.userAgent;
  const currentUrl = window.location.href;
  const scrollPosition = window.scrollY;

  return <ClientOnlyContent />;
}
```

### ✅ DO: Provide SSR-Compatible Fallbacks

```tsx
function ResponsiveComponent() {
  const isHydrated = useHydration();

  // Fallback matches SSR output
  if (!isHydrated) {
    return <div className="h-64 bg-neutral-100 animate-pulse" />;
  }

  return <HeavyClientComponent />;
}
```

### ✅ DO: Use for Third-Party Scripts

```tsx
function AnalyticsWrapper() {
  const isHydrated = useHydration();

  useEffect(() => {
    if (!isHydrated) return;

    // Load analytics after hydration
    loadGoogleAnalytics();
  }, [isHydrated]);

  return null;
}
```

### ❌ DON'T: Use for Server-Compatible Features

```tsx
// BAD: Don't use for features that work on server
function BadExample() {
  const isHydrated = useHydration(); // Unnecessary

  // These work fine on server - no need for hydration check
  return (
    <div>
      <h1>Title</h1>
      <p>Content that renders on server</p>
    </div>
  );
}
```

### ❌ DON'T: Skip Fallback Rendering

```tsx
// BAD: No fallback causes hydration mismatch
function BadExample() {
  const isHydrated = useHydration();

  // This returns null during SSR but content on client - MISMATCH!
  if (!isHydrated) return null;

  return <ClientContent />;
}

// GOOD: Provide SSR-compatible fallback
function GoodExample() {
  const isHydrated = useHydration();

  if (!isHydrated) return <LoadingSkeleton />; // Matches SSR

  return <ClientContent />;
}
```

## Common Use Cases

### 1. localStorage Access

```tsx
export function SavedPreferences() {
  const isHydrated = useHydration();
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    if (!isHydrated) return;

    const saved = localStorage.getItem('preferences');
    setPreferences(saved ? JSON.parse(saved) : null);
  }, [isHydrated]);

  if (!isHydrated || !preferences) {
    return <DefaultPreferences />;
  }

  return <CustomisedContent preferences={preferences} />;
}
```

### 2. Window Event Listeners

```tsx
export function ScrollProgress() {
  const isHydrated = useHydration();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    if (!isHydrated) return;

    const handleScroll = () => {
      const percentage = (window.scrollY / document.body.scrollHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHydrated]);

  if (!isHydrated) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-accent-600"
         style={{ width: `${scrollPercentage}%` }} />
  );
}
```

### 3. Media Queries

```tsx
export function ResponsiveContent() {
  const isHydrated = useHydration();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [isHydrated]);

  if (!isHydrated) {
    // Default to desktop layout during SSR
    return <DesktopLayout />;
  }

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

## TypeScript Integration

The `useHydration()` hook returns a boolean with full type safety:

```tsx
import { useHydration } from '@/components/providers';

function TypeSafeComponent() {
  const isHydrated: boolean = useHydration(); // Explicit type (inferred automatically)

  // TypeScript knows isHydrated is boolean
  if (isHydrated) {
    // Safe to use browser APIs
  }

  return null;
}
```

## Testing Considerations

When testing components that use `useHydration()`:

```tsx
// Mock the hydration hook in tests
jest.mock('@/components/providers', () => ({
  useHydration: jest.fn(() => true), // Test hydrated state
}));

test('renders client content after hydration', () => {
  const { useHydration } = require('@/components/providers');
  useHydration.mockReturnValue(true);

  render(<ClientComponent />);
  expect(screen.getByText('Client Content')).toBeInTheDocument();
});

test('renders fallback during SSR', () => {
  const { useHydration } = require('@/components/providers');
  useHydration.mockReturnValue(false);

  render(<ClientComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

## Performance Considerations

The HydrationProvider has minimal performance impact:

- **Single useEffect**: Runs once per application mount
- **No re-renders**: State changes only from false → true once
- **Zero bundle size**: Uses React's built-in Context API
- **SSR compatible**: No server-side execution overhead

## Integration with Existing Providers

The HydrationProvider is automatically integrated as the outermost provider in ClientProviders:

```
RootLayout
└── ClientProviders
    └── HydrationProvider ← Outermost (maximum safety)
        └── LazyMotionProvider
            └── TooltipProvider
                └── {children}
                └── Toaster
```

This hierarchy ensures hydration tracking is available to all child components without additional setup.
