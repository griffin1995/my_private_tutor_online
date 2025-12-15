# CSS Architecture Standards

## Critical Success Pattern

**Proven Working Approach**: Clean CSS architecture (November 17, 2025) - First successful fix that eliminated technical debt.

### Architecture Rules
- **Fix root causes, never add overrides** - No defensive CSS, resets, or `!important`
- **Single source of truth** - All link styling in globals.css @layer base (lines 735-789)
- **Clean cascade** - Work WITH CSS inheritance, not against it
- **Semantic scoping** - Content links get brand colours, component links inherit parent

## Mandatory File Reads

**Before any styling work**, read these files to understand the styling architecture:

1. **Primary Styling File**: `/src/app/globals.css`
   - Contains @layer base section (lines 593-758) with all semantic HTML defaults
   - Defines 200+ CSS custom properties (:root variables)
   - Establishes three-tier cascade layer architecture

2. **Tailwind Configuration**: `/tailwind.config.ts`
   - Single source of truth for theme configuration (676 lines)
   - Custom color palette, typography scales, shadows, gradients
   - Enhanced variants (ARIA, data, supports shortcuts)

## @layer Base Pattern (Official Tailwind)

### Three-Tier Cascade Architecture

```css
/* Layer 1: Preflight (automatic) - Tailwind's CSS reset */
/* Layer 2: Custom base styles (globals.css) - brand defaults */
/* Layer 3: Utility classes (Tailwind) - component overrides */
```

### Semantic HTML Works Automatically

```tsx
// Write less code - styles are automatic:
<h1>Premium Tutoring Service</h1>  // Automatically: navy color, bold, 3xl size
<p>Excellence in education since 2010.</p>  // Automatically: grey-800, relaxed line-height
<a href="/about">Learn More</a>  // Automatically: gold color with hover transition
```

### Utility Overrides When Needed

```tsx
// Easy overrides with utility classes when exceptions required:
<h1 className="text-white">White Heading</h1>  // Utility override: white instead of navy
<a className="text-primary-700">Navy Link</a>  // Utility override: navy instead of gold
```

## @layer Base Implementation

**Complete semantic HTML coverage with CSS variables:**

```css
@layer base {
	/* Headings - Primary brand colour (navy) from --color-primary-base */
	h1, h2, h3, h4, h5, h6 {
		/* Fully specified with font-family, sizes, weights */
	}

	/* Links - Accent colour (gold) from --color-accent with hover transitions */
	a {
		color: var(--color-accent);
		transition: color 200ms;
	}
	a:hover {
		color: var(--color-accent-dark);
		text-decoration-line: underline;
	}

	/* Body text - Neutral colour from --color-neutral-grey-800 */
	p {
		color: var(--color-neutral-grey-800);
		line-height: var(--font-line-height-relaxed);
	}

	/* Navigation exclusions - prevent link styling in nav/buttons */
	nav a,
	[data-navigation] a,
	button a,
	.btn {
		color: inherit;
	}
}
```

## Critical Benefits

1. **Write Less Code**: `<h1>Title</h1>` instead of `<h1 className="text-3xl font-bold text-primary-700">Title</h1>`
2. **Automatic Consistency**: All pages inherit brand styling without manual class application
3. **Single Source of Truth**: CSS variables from :root → @layer base → all components
4. **Easy Overrides**: Utility classes always win (higher specificity by design)
5. **Zero Conflicts**: @layer ensures proper cascade order, no specificity battles
6. **Official Pattern**: Tailwind recommended approach from official documentation

## Forbidden Styling Patterns

### ❌ Manual Color Application on Every Element

```tsx
// FORBIDDEN: Manually applying colors to every heading/link/paragraph
<h1 className="text-primary-700 text-3xl font-bold">Title</h1>  // DON'T DO THIS
<p className="text-neutral-grey-800 leading-relaxed">Text</p>  // DON'T DO THIS
<a className="text-accent-600 hover:text-accent-700">Link</a>  // DON'T DO THIS
```

### ✅ Correct: Let @layer Base Handle Defaults

```tsx
// CORRECT: Clean semantic HTML - styling is automatic
<h1>Title</h1>  // @layer base provides navy color, bold, 3xl size
<p>Text content here.</p>  // @layer base provides grey-800, relaxed leading
<a href="/page">Link</a>  // @layer base provides gold with hover effect
```

### ✅ Correct: Utility Overrides for Exceptions

```tsx
// CORRECT: Use utilities only when you need to override base defaults
<h1 className="text-white">White Title on Dark Background</h1>
<p className="text-sm">Smaller paragraph for legal text</p>
<a className="text-primary-700">Navy link in specific context</a>
```

## Styling Workflow

### Step 1: Read Required Files
- Read `/src/app/globals.css` (focus on lines 593-758)
- Read `/tailwind.config.ts` (understand theme tokens)

### Step 2: Verify @layer Base Coverage
- Check if semantic HTML element already has @layer base styling
- If yes: Use semantic HTML without classes (preferred)
- If no: Consider adding to @layer base if it's a global default

### Step 3: Apply Styling Strategy
- **Default Case**: Use semantic HTML without utility classes (`<h1>Title</h1>`)
- **Override Case**: Add utility classes only for exceptions (`<h1 className="text-white">`)
- **New Component**: Build with semantic HTML first, add utilities for variations

### Step 4: Verify Implementation
- Ensure semantic HTML works without classes where possible
- Confirm utility overrides work correctly (they always win)
- Validate CSS variables are used (never hardcode colors/sizes)

## Immediate Termination Conditions

These styling violations result in immediate task termination:

- **Manual color classes on standard HTML elements** when @layer base provides defaults
- **Hardcoded colors/sizes** instead of using CSS variables or Tailwind tokens
- **Inline styles for colors/typography** that should use @layer base or utilities
- **Adding utility classes to every element** instead of leveraging @layer base defaults
- **Creating component-specific CSS files** instead of using @layer base + utilities
- **Ignoring globals.css @layer base** and manually styling every element
- **Not reading globals.css and tailwind.config.ts** before styling work

## Verification Checklist

Before completing any styling task, verify:

- ✅ Read globals.css @layer base section (lines 593-758)
- ✅ Read tailwind.config.ts theme configuration
- ✅ Used semantic HTML without classes where @layer base provides styling
- ✅ Applied utility overrides only for genuine exceptions
- ✅ All colors/typography use CSS variables or Tailwind tokens (no hardcoded values)
- ✅ Verified styles work automatically for standard HTML elements
- ✅ Confirmed utility overrides work correctly when needed
- ✅ Maintained British English in all comments and documentation

## Architecture Summary

**Pure Utility-First Achieved**:
- Zero external CSS files (12 eliminated)
- Single globals.css with @layer base + CSS variables
- Pure Tailwind utilities for component variations
- 200+ CSS custom properties as design tokens
- Mathematical shadow/gradient systems
- Enhanced ARIA/data/supports variants

**Component Styling Strategy**:
1. Semantic HTML works automatically via @layer base
2. Utility classes for overrides and variations
3. CSS variables for consistent theming
4. Tailwind config as single source of truth
5. Zero external stylesheets or CSS modules

## Related Documentation

- [Development Standards](development-standards.md)
- [CMS Patterns](cms-patterns.md)
- [Tech Stack Specifications](../technical/tech-stack.md)