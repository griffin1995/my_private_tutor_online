# CMS Patterns - CRITICAL

## ⚠️ ZERO TOLERANCE: SYNCHRONOUS ARCHITECTURE ONLY

**Homepage Recovery Lessons**: Critical failure in August 2025 caused by async CMS patterns - NEVER REPEAT.

**Zero Tolerance Violations**: Any deviation from synchronous patterns causes complete homepage failure.

## Mandatory CMS Patterns

### ✅ Working Synchronous Pattern

```typescript
// Direct JSON imports for static content
import cmsContent from '../../content/cms-content.json';

export const getCMSContent = (): CMSContentType => {
	return cmsContent; // MANDATORY: Synchronous return
};

const content = getCMSContent(); // Direct function call without loading states
```

### ❌ Forbidden Async Patterns

```typescript
// These patterns caused complete homepage failure:
export const loadCachedContent = async (): Promise<any> => {
	/* FORBIDDEN */
};
const [content, setContent] = useState(null); // FORBIDDEN FOR STATIC DATA
useEffect(() => {
	loadContent();
}, []); // FORBIDDEN FOR CMS DATA
```

## Architecture Rules

1. **Direct JSON imports only** - No dynamic loading
2. **Synchronous functions exclusively** - No Promise returns
3. **No loading states for static content** - Immediate availability required
4. **No useEffect for CMS data** - Direct function calls only

## Failure Symptoms

If you encounter these symptoms, the CMS architecture has been violated:

- Loading spinners that never resolve
- ".map is not a function" errors
- Missing homepage sections
- useState/useEffect for static JSON content

## Emergency Homepage Recovery Protocol

### Immediate Diagnosis

1. Check for `async` keywords in CMS functions
2. Look for `useState`/`useEffect` for static content
3. Verify ".map is not a function" errors
4. Confirm missing homepage sections

### Recovery Steps

1. **Convert CMS functions to synchronous**: Remove all `async`/`Promise<>` patterns
2. **Replace dynamic imports**: Use direct JSON imports only
3. **Eliminate loading states**: Remove useState/useEffect for static content
4. **Test immediate data availability**: Verify all sections load without spinners

## CMS Implementation Requirements

### File Structure

```
src/
├── content/
│   ├── cms-content.json        # Static JSON data
│   └── cms-images.json         # Image references
├── lib/
│   ├── cms-content.ts          # Synchronous data access
│   └── cms-images.ts           # Synchronous image access
└── components/
    └── [component].tsx         # Direct function calls
```

### Data Access Pattern

```typescript
// cms-content.ts
import cmsData from '../content/cms-content.json';

export interface CMSContentType {
  // Type definitions
}

export const getCMSContent = (): CMSContentType => {
  return cmsData; // Immediate return, no async
};

export const getPageContent = (pageKey: string): any => {
  return cmsData[pageKey]; // Direct access
};
```

### Component Usage

```tsx
// Component implementation
import { getCMSContent } from '../lib/cms-content';

export default function MyComponent() {
  const content = getCMSContent(); // Direct call, no loading state

  return (
    <div>
      {content.sections.map((section) => (
        <div key={section.id}>{section.title}</div>
      ))}
    </div>
  );
}
```

## Runtime Violation Detection

The codebase includes runtime monitoring to detect CMS violations:

- Performance monitoring for async CMS patterns
- Runtime violation detection preventing regressions
- Automated alerts for homepage loading failures

## Critical Success Metrics

- **Homepage loads immediately** without loading spinners
- **All sections render** on first paint
- **No async CMS functions** in codebase
- **Direct JSON imports only** for static content

## Monitoring and Maintenance

### Regular Verification

1. **Build verification**: `pnpm run build` must complete successfully
2. **Homepage test**: Verify immediate section rendering
3. **CMS audit**: Confirm no async patterns in content access
4. **Performance check**: Monitor for loading state violations

### Code Review Requirements

- ❌ Reject any PR introducing async CMS patterns
- ❌ Reject useState/useEffect for static content
- ❌ Reject dynamic imports for JSON content
- ✅ Approve only synchronous content access patterns

## Remember

**The synchronous CMS architecture is PROVEN WORKING. Any deviation risks complete homepage failure.**

This pattern has been battle-tested and is the foundation of homepage stability. All developers must understand and maintain these patterns without exception.

## Related Documentation

- [Development Standards](development-standards.md)
- [Emergency Protocols](../reference/emergency-protocols.md)
- [Tech Stack Requirements](../technical/tech-stack.md)