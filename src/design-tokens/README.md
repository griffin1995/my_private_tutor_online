# My Private Tutor Online - Design Tokens System

**CONTEXT7 SOURCE**: `/amzn/style-dictionary` - Design token infrastructure and
build system **CONTEXT7 SOURCE**: `/design-tokens/community-group` - DTCG format
standards and naming conventions **IMPLEMENTATION DATE**: October 5, 2025
**STATUS**: Phase 1 Foundation Complete - 25 Strategic Colors, 3-Font System

---

## Overview

This directory contains the foundational design tokens for the My Private Tutor
Online enterprise design system consolidation project. The system reduces
complexity from 809 colors and 12 fonts to a strategic 25-color palette and
3-font hierarchy.

### Strategic Goals

- **Color Reduction**: 809 colors → 25 strategic tokens (96.9% reduction)
- **Font Consolidation**: 12 fonts → 3 strategic typefaces (75% reduction)
- **Consistency**: Single source of truth for all design decisions
- **Scalability**: Token-based architecture for multi-platform deployment
- **Maintainability**: Automated generation of CSS, JavaScript, TypeScript, and
  Tailwind configs

---

## Directory Structure

```
src/design-tokens/
├── README.md                    # This file - documentation
├── config.json                  # Style Dictionary build configuration
├── colors.json                  # 25-color strategic palette
├── typography.json              # 3-font system with composite tokens
├── spacing.json                 # Spacing scale and border definitions
└── generated/                   # Auto-generated outputs (DO NOT EDIT)
    ├── tokens.js                # JavaScript ES6 module
    ├── tokens.ts                # TypeScript module
    ├── types.d.ts               # TypeScript type declarations
    └── tokens.json              # Nested JSON structure

src/styles/tokens/
└── variables.css                # CSS custom properties (auto-generated)

tailwind.config.tokens.js        # Tailwind config module (auto-generated)
```

---

## Token Categories

### 1. Colors (25 Strategic Tokens)

#### Primary Navy (4 variations)

- **base**: `#3F4A7E` - Main brand colour for headers, CTAs, primary UI
- **light**: `#5A6B9E` - Hover states, secondary elements
- **dark**: `#2D3456` - Text on light backgrounds, emphasis
- **muted**: `#7A88B3` - Disabled states, subtle backgrounds

#### Secondary Gold (4 variations)

- **base**: `#CA9E5B` - Royal client accent, premium highlights
- **light**: `#E5C89A` - Hover states, subtle accents
- **dark**: `#A67C3D` - Emphasis, borders, focus states
- **muted**: `#D4B480` - Backgrounds, premium touches

#### Neutral Greyscale (8 greys)

- **white**: `#FFFFFF` - Page backgrounds, cards
- **grey-50**: `#F9FAFB` - Subtle backgrounds, hover states
- **grey-100**: `#F3F4F6` - Section backgrounds
- **grey-200**: `#E5E7EB` - Borders, dividers
- **grey-400**: `#9CA3AF` - Placeholder text, disabled elements
- **grey-600**: `#4B5563` - Secondary text
- **grey-800**: `#1F2937` - Primary text
- **black**: `#000000` - Maximum contrast headings

#### Semantic (4 colors)

- **success**: `#10B981` - Confirmation messages
- **error**: `#EF4444` - Validation errors
- **warning**: `#F59E0B` - Caution messages
- **info**: `#3B82F6` - Informational messages

#### UI Utilities (5 colors)

- **border**: References `neutral.grey-200`
- **overlay**: `rgba(0, 0, 0, 0.5)` - Modal backdrops
- **disabled**: References `neutral.grey-400`
- **hover**: References `neutral.grey-50`
- **focus**: References `secondary.base`

### 2. Typography (3-Font System)

#### Font Families

- **Heading**: Playfair Display - Premium serif for royal client aesthetic
- **Body**: Source Serif 4 - Readable serif with professional warmth
- **Technical**: JetBrains Mono - Monospace for pricing and data

#### Font Sizes (9 strategic sizes)

- **xs**: 12px - Captions, labels, fine print
- **sm**: 14px - Secondary text, metadata
- **base**: 16px - Primary body text
- **lg**: 18px - Emphasised body text
- **xl**: 20px - Small headings
- **2xl**: 24px - H4 headings
- **3xl**: 32px - H3 headings
- **4xl**: 48px - H2 section titles
- **5xl**: 64px - H1 hero titles

#### Font Weights

- **normal**: 400 - Body text
- **medium**: 500 - Emphasised text
- **semibold**: 600 - Subheadings
- **bold**: 700 - Headings, strong emphasis

#### Composite Typography Tokens

Pre-configured complete text styles:

- `typography.heading.h1` - Hero headings
- `typography.heading.h2` - Section headings
- `typography.heading.h3` - Subsection headings
- `typography.heading.h4` - Card headings
- `typography.body.base` - Standard body text
- `typography.body.large` - Lead paragraphs
- `typography.body.small` - Captions
- `typography.technical.base` - Pricing, data

### 3. Spacing

#### Spacing Scale (4px base unit)

- **0**: 0px - Reset
- **1**: 4px - Minimal spacing
- **2**: 8px - Small spacing
- **3**: 12px - Small-medium
- **4**: 16px - Base unit
- **5**: 20px - Medium
- **6**: 24px - Comfortable
- **8**: 32px - Section spacing
- **10**: 40px - Large sections
- **12**: 48px - Extra large
- **16**: 64px - Major section breaks
- **20**: 80px - Page sections
- **24**: 96px - Hero spacing
- **32**: 128px - Maximum spacing

#### Border Radius

- **none**: 0px - Sharp corners
- **sm**: 4px - Buttons, inputs
- **base**: 8px - Cards, containers
- **md**: 12px - Larger cards
- **lg**: 16px - Prominent cards
- **xl**: 24px - Hero elements
- **full**: 9999px - Pills, avatars

#### Border Width

- **none**: 0px - No border
- **thin**: 1px - Subtle dividers
- **base**: 2px - Standard elements
- **thick**: 4px - Emphasis, focus

---

## Usage

### NPM Scripts

```bash
# Build all token outputs (CSS, JS, TS, Tailwind)
npm run tokens:build

# Watch mode - rebuild on token file changes
npm run tokens:watch

# Clean all generated files
npm run tokens:clean
```

### Automatic Pre-Build Integration

Tokens are automatically built before `npm run build` via the `prebuild` script
in `package.json`.

### Using Tokens in Code

#### CSS Custom Properties

```css
/* Auto-generated in src/styles/tokens/variables.css */
.button-primary {
	background-color: var(--color-primary-base);
	color: var(--color-neutral-white);
	font-family: var(--font-family-body);
	font-size: var(--font-size-base);
	padding: var(--spacing-4) var(--spacing-6);
	border-radius: var(--border-radius-sm);
}
```

#### TypeScript/JavaScript

```typescript
// Import from generated tokens
import {
	ColorPrimaryBase,
	FontSizeBase,
} from '@/design-tokens/generated/tokens';

// Use in components
const buttonStyle = {
	backgroundColor: ColorPrimaryBase,
	fontSize: FontSizeBase,
};
```

#### Tailwind CSS

```javascript
// tailwind.config.tokens.js is auto-generated and can be imported
const tokens = require('./tailwind.config.tokens.js');

module.exports = {
	theme: {
		extend: {
			colors: tokens.color,
			fontFamily: tokens.font.family,
			fontSize: tokens.font.size,
			spacing: tokens.spacing,
		},
	},
};
```

---

## Token Format (DTCG Standard)

All tokens follow the Design Tokens Community Group format:

```json
{
	"token-name": {
		"$value": "actual-value",
		"$type": "color|dimension|fontFamily|fontWeight|number",
		"$description": "Human-readable description"
	}
}
```

### Token References

Tokens can reference other tokens using curly brace syntax:

```json
{
	"ui": {
		"border": {
			"$value": "{color.neutral.grey-200}",
			"$description": "References the grey-200 color token"
		}
	}
}
```

---

## Build Configuration

Style Dictionary configuration (`config.json`) defines multiple build targets:

1. **CSS**: CSS custom properties in `:root`
2. **JavaScript**: ES6 module with named exports
3. **TypeScript**: TypeScript module + type declarations
4. **Tailwind**: Flat module for Tailwind config integration
5. **JSON**: Nested JSON structure for documentation/tooling

### Platform-Specific Transforms

- **CSS**: Converts tokens to kebab-case with `--` prefix
- **JS/TS**: Converts to PascalCase for exports
- **Tailwind**: Flat structure with nested object support

---

## Warnings and Known Limitations

### Token Collisions (Expected)

Composite typography tokens create collisions between individual properties
(e.g., `fontFamily`, `fontSize`) and composite tokens. This is expected
behaviour for DTCG composite types.

### CSS Font Shorthand

Style Dictionary v4 does not yet fully support DTCG composite typography tokens
in CSS output. Individual font properties are available, but the composite
`font` shorthand is not generated. Use individual properties in CSS:

```css
/* Use individual properties, not composite */
.heading-1 {
	font-family: var(--font-family-heading);
	font-size: var(--font-size-5xl);
	font-weight: var(--font-weight-bold);
	line-height: var(--font-line-height-tight);
	letter-spacing: var(--font-letter-spacing-tighter);
}
```

---

## Phase 1 Success Criteria ✅

- [x] **Design tokens directory structure** created with proper organisation
- [x] **25-color strategic palette** implemented with navy/gold foundation
- [x] **3-font system** with Playfair Display, Source Serif 4, JetBrains Mono
- [x] **Spacing scale** with 4px base unit and border definitions
- [x] **Style Dictionary configuration** with 5 build targets
- [x] **Package.json scripts** for build, watch, and clean operations
- [x] **Initial build verification** - all outputs generated successfully
- [x] **TypeScript type safety** with auto-generated type declarations
- [x] **Documentation** - comprehensive README with usage examples

---

## Next Steps (Phase 2+)

### Phase 2: Tailwind Integration

- Integrate tokens into main `tailwind.config.js`
- Create utility classes based on design tokens
- Migrate existing Tailwind custom colours to token references

### Phase 3: Component Migration

- Audit existing components for colour/font usage
- Create migration plan for 809→25 colour reduction
- Update components to use design token CSS custom properties

### Phase 4: Validation & Testing

- Implement visual regression testing with design tokens
- Create design system documentation site
- Establish design token governance process

---

## References

- **Style Dictionary Documentation**: https://styledictionary.com/
- **Design Tokens Community Group**:
  https://design-tokens.github.io/community-group/
- **DTCG Format Specification**: https://tr.designtokens.org/format/

---

**CRITICAL**: All files in `generated/` and `src/styles/tokens/` are
auto-generated. Never edit these files directly - always modify source token
files (`colors.json`, `typography.json`, `spacing.json`) and rebuild.
