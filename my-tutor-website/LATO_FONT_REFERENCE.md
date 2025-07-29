# Lato Font Family Reference Guide

## Overview
Lato is a humanist sans-serif font designed by Łukasz Dziedzic in 2010. The name "Lato" means "Summer" in Polish. It's optimized for both web and print use, offering excellent readability and a warm, friendly appearance while maintaining professional elegance.

## Implementation Details

### Next.js Integration
```typescript
// Implemented in src/app/layout.tsx
import { Lato } from 'next/font/google'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})
```

### Tailwind CSS Integration
```css
/* Available via CSS variable in tailwind.config.ts */
fontFamily: {
  sans: ['var(--font-lato)', 'system-ui', ...]
}
```

## Available Weights and Styles

### Font Weights
| Weight | Name | Numeric Value | Tailwind Class | Usage |
|--------|------|---------------|----------------|-------|
| Thin | Hairline | 100 | `font-thin` | Decorative text, large display headings |
| Light | Light | 300 | `font-light` | Captions, metadata, subtle emphasis |
| Regular | Normal | 400 | `font-normal` | Body text, paragraphs, standard content |
| Bold | Bold | 700 | `font-bold` | Headings, emphasis, call-to-actions |
| Black | Ultra Bold | 900 | `font-black` | Major headings, branding, high impact |

### Font Styles
| Style | CSS Value | Tailwind Class | Usage |
|-------|-----------|----------------|-------|
| Normal | normal | (default) | Standard upright text |
| Italic | italic | `italic` | Emphasis, quotes, foreign words |

## Design Usage Guidelines

### Recommended Applications

#### Primary Headings (H1, Hero Titles)
```css
font-weight: 900; /* font-black */
font-size: 3rem; /* text-5xl */
```
- Use for maximum impact
- Ideal for hero sections and page titles
- Maintains readability at large sizes

#### Secondary Headings (H2, H3)
```css
font-weight: 700; /* font-bold */
font-size: 1.5rem - 2.25rem; /* text-2xl to text-4xl */
```
- Section headers and subheadings
- Clear hierarchy establishment
- Professional appearance

#### Body Text
```css
font-weight: 400; /* font-normal */
font-size: 1rem; /* text-base */
line-height: 1.5rem; /* leading-6 */
```
- Paragraphs and content blocks
- Optimal for readability
- Comfortable for extended reading

#### Captions and Metadata
```css
font-weight: 300; /* font-light */
font-size: 0.875rem; /* text-sm */
```
- Image captions
- Form labels
- Supplementary information

#### Emphasis and Highlights
```css
font-weight: 700; /* font-bold */
font-style: italic; /* italic */
```
- Important callouts
- Key phrases within text
- User interface highlights

## Typography Hierarchy Examples

### Marketing Content
```html
<!-- Hero Title -->
<h1 class="font-black text-6xl">Premium Tutoring Services</h1>

<!-- Section Header -->
<h2 class="font-bold text-3xl">Our Approach</h2>

<!-- Body Content -->
<p class="font-normal text-base leading-relaxed">
  At My Private Tutor Online, we provide exceptional educational support...
</p>

<!-- Caption -->
<span class="font-light text-sm text-gray-600">
  Trusted by families since 2010
</span>
```

### User Interface Elements
```html
<!-- Navigation -->
<nav class="font-normal text-base">
  <a class="font-bold hover:font-black">Services</a>
</nav>

<!-- Buttons -->
<button class="font-bold text-white bg-primary-900">
  Book Consultation
</button>

<!-- Form Labels -->
<label class="font-light text-sm">Student Name</label>
```

## Performance Considerations

### Subset Optimization
- Only 'latin' subset loaded for optimal performance
- Reduces font file size by excluding unused character sets
- Maintains fast loading times

### Display Strategy
- `display: swap` ensures text remains visible during font load
- Prevents invisible text (FOIT) issues
- Improves perceived performance

### Weight Loading Strategy
- All required weights (100, 300, 400, 700, 900) preloaded
- Avoids additional network requests during usage
- Enables smooth weight transitions and animations

## Accessibility Guidelines

### Contrast Requirements
- Ensure sufficient contrast ratios with background colours
- Minimum 4.5:1 for normal text (WCAG AA)
- Minimum 3:1 for large text (18pt+ or 14pt+ bold)

### Readable Sizes
- Minimum 16px (1rem) for body text
- Avoid using font-thin (100) for body text or small sizes
- Ensure adequate line-height (1.4-1.6) for readability

### Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable font weight transitions for users with motion sensitivity */
  * {
    transition: none !important;
  }
}
```

## Browser Support
- Modern browsers: Full support for variable and static weights
- Fallback fonts ensure compatibility across all browsers
- Progressive enhancement approach maintains functionality

## Best Practices

### Do's
- Use font-normal (400) for body text
- Use font-bold (700) for headings and emphasis
- Combine with italic for additional emphasis
- Maintain consistent font sizes within sections
- Use adequate line-height for readability

### Don'ts
- Avoid font-thin (100) for small text or body content
- Don't use too many different weights in one design
- Avoid poor contrast combinations
- Don't use all-caps with light weights (reduces readability)
- Avoid very long lines of text without adequate spacing

## Integration with Design System

### Primary Colors
- Works excellently with navy (#0f172a) backgrounds
- High contrast with white backgrounds
- Good readability with gold accents (#eab308)

### Component Usage
- Navigation menus: font-normal to font-bold
- Buttons: font-bold for clear call-to-actions
- Cards: font-normal for content, font-bold for titles
- Forms: font-light for labels, font-normal for inputs

This comprehensive reference ensures consistent and effective use of the Lato font family throughout the My Private Tutor Online website.