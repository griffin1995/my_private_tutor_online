# Design Token Quick Reference Guide

**My Private Tutor Online - Strategic 25-Color Token System**

---

## Usage Patterns

### Primary Brand Navy

```tsx
// Background classes
<div className="bg-token-primary">         // Base navy #3F4A7E (DEFAULT)
<div className="bg-token-primary-base">    // Base navy #3F4A7E (explicit)
<div className="bg-token-primary-light">   // Light navy #5A6B9E
<div className="bg-token-primary-dark">    // Dark navy #2D3456
<div className="bg-token-primary-muted">   // Muted navy #7A88B3

// Text classes
<h1 className="text-token-primary">        // Navy text
<p className="text-token-primary-dark">    // Dark navy text

// Border classes
<div className="border-token-primary">     // Navy border
```

### Secondary Brand Gold

```tsx
// Background classes
<div className="bg-token-secondary">        // Base gold #CA9E5B (DEFAULT)
<div className="bg-token-secondary-base">   // Base gold #CA9E5B (explicit)
<div className="bg-token-secondary-light">  // Light gold #E5C89A
<div className="bg-token-secondary-dark">   // Dark gold #A67C3D
<div className="bg-token-secondary-muted">  // Muted gold #D4B480

// Text classes
<span className="text-token-secondary">    // Gold text
<span className="text-token-secondary-dark"> // Dark gold text

// Hover states
<button className="bg-token-secondary hover:bg-token-secondary-dark">
  Book Now
</button>
```

### Neutral Greyscale

```tsx
// White to Black spectrum
<div className="bg-token-neutral-white">   // Pure white #FFFFFF
<div className="bg-token-neutral-50">      // Lightest grey #F9FAFB
<div className="bg-token-neutral-100">     // Very light grey #F3F4F6
<div className="bg-token-neutral-200">     // Light grey #E5E7EB
<div className="bg-token-neutral-400">     // Medium grey #9CA3AF
<div className="bg-token-neutral-600">     // Dark grey #4B5563
<div className="bg-token-neutral-800">     // Very dark grey #1F2937
<div className="bg-token-neutral-black">   // Pure black #000000

// Common text patterns
<p className="text-token-neutral-800">     // Primary text (dark)
<p className="text-token-neutral-600">     // Secondary text (medium)
<p className="text-token-neutral-400">     // Placeholder text
```

### Semantic Feedback Colors

```tsx
// Success states
<div className="bg-token-semantic-success text-white">
  Booking confirmed!
</div>

// Error states
<div className="bg-token-semantic-error text-white">
  Invalid input
</div>

// Warning states
<div className="bg-token-semantic-warning text-white">
  Please review
</div>

// Info states
<div className="bg-token-semantic-info text-white">
  New features available
</div>
```

### UI Utility Colors

```tsx
// Border color
<div className="border-2 border-token-ui-border">
  Card with standard border
</div>

// Hover background
<div className="hover:bg-token-ui-hover">
  Hover me
</div>

// Disabled state
<button disabled className="bg-token-ui-disabled cursor-not-allowed">
  Disabled Button
</button>

// Focus ring
<input className="focus:ring-4 focus:ring-token-ui-focus" />
```

---

## Common Component Patterns

### Navigation Bar

```tsx
<nav className="bg-token-primary text-white">
  <a className="hover:text-token-secondary">Home</a>
  <a className="hover:text-token-secondary">Services</a>
</nav>
```

### Hero Section

```tsx
<section className="bg-token-primary text-white">
  <h1 className="text-5xl font-bold">Premium Tutoring</h1>
  <button className="bg-token-secondary hover:bg-token-secondary-dark px-8 py-4">
    Get Started
  </button>
</section>
```

### Card Component

```tsx
<div className="bg-white border-2 border-token-ui-border rounded-lg p-6 hover:shadow-lg">
  <h3 className="text-token-primary-dark text-2xl font-semibold">
    Oxbridge Preparation
  </h3>
  <p className="text-token-neutral-600 mt-2">
    Expert guidance for university admissions
  </p>
  <span className="inline-block bg-token-semantic-success text-white px-3 py-1 rounded text-sm mt-4">
    Available Now
  </span>
</div>
```

### Testimonial Section

```tsx
<div className="bg-token-neutral-50 p-8 rounded-lg">
  <blockquote className="text-token-neutral-800 text-lg">
    "Outstanding results!"
  </blockquote>
  <cite className="text-token-neutral-600 text-sm">
    - Parent, London
  </cite>
</div>
```

### Form Elements

```tsx
<form className="space-y-4">
  <input
    type="text"
    className="w-full border-2 border-token-ui-border rounded-lg p-3
               focus:border-token-ui-focus focus:outline-none"
    placeholder="Your name"
  />
  <button
    type="submit"
    className="bg-token-secondary hover:bg-token-secondary-dark
               text-white font-semibold px-6 py-3 rounded-lg"
  >
    Submit
  </button>
</form>
```

### Footer

```tsx
<footer className="bg-token-primary-dark text-white">
  <div className="container mx-auto py-12">
    <a href="#" className="text-token-secondary hover:text-token-secondary-light">
      Contact Us
    </a>
  </div>
</footer>
```

---

## Migration Cheat Sheet

### Legacy → Token Conversions

**Primary Colors**
- `bg-primary-700` → `bg-token-primary`
- `text-primary-900` → `text-token-primary-dark`
- `bg-slate-900` → `bg-token-primary`

**Accent Colors**
- `bg-accent-600` → `bg-token-secondary`
- `text-accent-500` → `text-token-secondary`
- `bg-gold-500` → `bg-token-secondary`

**Neutral Colors**
- `bg-white` → `bg-token-neutral-white`
- `bg-gray-50` → `bg-token-neutral-50`
- `bg-gray-100` → `bg-token-neutral-100`
- `bg-gray-200` → `bg-token-neutral-200`
- `text-gray-400` → `text-token-neutral-400`
- `text-gray-600` → `text-token-neutral-600`
- `text-gray-800` → `text-token-neutral-800`

**Semantic Colors**
- `bg-green-500` → `bg-token-semantic-success`
- `bg-red-500` → `bg-token-semantic-error`
- `bg-yellow-500` → `bg-token-semantic-warning`
- `bg-blue-500` → `bg-token-semantic-info`

---

## CSS Variable Access

When you need direct CSS variable access (rare cases):

```css
.custom-component {
  background-color: var(--color-primary-base);
  color: var(--color-neutral-white);
  border-color: var(--color-ui-border);
}
```

**Available CSS Variables**:
- `--color-primary-base`
- `--color-primary-light`
- `--color-primary-dark`
- `--color-primary-muted`
- `--color-secondary-base`
- `--color-secondary-light`
- `--color-secondary-dark`
- `--color-secondary-muted`
- `--color-neutral-white`
- `--color-neutral-grey-50`
- `--color-neutral-grey-100`
- `--color-neutral-grey-200`
- `--color-neutral-grey-400`
- `--color-neutral-grey-600`
- `--color-neutral-grey-800`
- `--color-neutral-black`
- `--color-semantic-success`
- `--color-semantic-error`
- `--color-semantic-warning`
- `--color-semantic-info`
- `--color-ui-border`
- `--color-ui-overlay`
- `--color-ui-disabled`
- `--color-ui-hover`
- `--color-ui-focus`

---

## Testing Your Component

After migrating a component to tokens:

1. **Visual Check**: Compare before/after screenshots
2. **Browser Test**: View at `/design-tokens-test` to see all tokens
3. **Color Accuracy**: Use browser inspector to verify hex values
4. **Accessibility**: Check contrast ratios maintained
5. **Responsive**: Test across mobile, tablet, desktop

---

## Troubleshooting

### Token class not working?

1. **Check Tailwind config**: Verify token is in `tailwind.config.ts`
2. **Rebuild**: Run `npm run tokens:build`
3. **Restart dev server**: Stop and restart `npm run dev`
4. **Check import**: Verify `globals.css` imports `variables.css`

### Wrong color showing?

1. **Check CSS variables**: Inspect element in browser DevTools
2. **Verify hex value**: Compare against brand colors
3. **Check specificity**: Ensure no conflicting styles override token
4. **Clear cache**: `npm run clean` and rebuild

### IntelliSense not showing tokens?

1. **Restart TypeScript**: Cmd/Ctrl + Shift + P → "Restart TS Server"
2. **Check config**: Verify `tailwind.config.ts` exports properly
3. **Install Tailwind IntelliSense**: VS Code extension recommended

---

## Best Practices

1. ✅ **Use DEFAULT variants**: `bg-token-primary` instead of `bg-token-primary-base`
2. ✅ **Semantic naming**: Choose token based on meaning, not just color
3. ✅ **Consistent patterns**: Follow established component patterns above
4. ✅ **Test frequently**: Check token test page after changes
5. ✅ **Document changes**: Note any custom token usage in comments

6. ❌ **Don't use hardcoded hex**: Always use tokens, never `bg-[#3F4A7E]`
7. ❌ **Don't mix legacy colors**: Migrate component fully to tokens
8. ❌ **Don't skip testing**: Always verify visual consistency
9. ❌ **Don't override with !important**: Use proper CSS specificity
10. ❌ **Don't modify generated files**: Edit source tokens only

---

**Quick Links**

- Test Page: `http://localhost:3000/en/design-tokens-test`
- Full Report: `DESIGN_TOKEN_INFRASTRUCTURE_VALIDATION_REPORT.md`
- Validation Script: `./scripts/validate-token-infrastructure.sh`
- Summary: `DESIGN_TOKEN_VALIDATION_SUMMARY.md`

**Last Updated**: October 5, 2025
