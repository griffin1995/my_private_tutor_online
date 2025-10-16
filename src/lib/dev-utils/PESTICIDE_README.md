# Pesticide CSS Debugging Tool - Development Setup

## Overview

Pesticide is a CSS debugging tool that helps "kill your CSS layout bugs" by
outlining every element on the page with colored borders. This implementation
provides a production-safe, development-only integration for the My Private
Tutor Online project.

## Features

- ✅ **Development-Only**: Never loads in production builds
- ✅ **Environment Variable Control**: Enable/disable via `.env.local`
- ✅ **Keyboard Shortcuts**: Quick toggle with `Ctrl+Alt+P` (or `Cmd+Alt+P`)
- ✅ **Visual Controls**: Click-to-toggle control panel
- ✅ **Safety First**: Production environment checks prevent accidental loading
- ✅ **Color-Coded Elements**: Different HTML elements get different colored
  outlines

## Installation & Setup

### 1. Package Installation (Already Done)

```bash
npm install --save-dev pesticide
```

### 2. Files Created

- `src/lib/dev-utils/pesticide.tsx` - React component for Pesticide integration
- `src/styles/pesticide.dev.css` - Development-only Pesticide CSS
- `public/styles/pesticide.dev.css` - Served version for browser loading

### 3. NPM Scripts Added

```json
{
	"dev:pesticide": "NEXT_PUBLIC_ENABLE_PESTICIDE=true npm run dev",
	"dev:pesticide-off": "NEXT_PUBLIC_ENABLE_PESTICIDE=false npm run dev",
	"dev:debug-layout": "NEXT_PUBLIC_ENABLE_PESTICIDE=true npm run dev"
}
```

## Usage Options

### Option 1: Environment Variable (Recommended)

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_ENABLE_PESTICIDE=true
```

Then run: `npm run dev`

### Option 2: Direct NPM Script

```bash
# Start dev server with Pesticide enabled
npm run dev:pesticide

# Start dev server with Pesticide explicitly disabled
npm run dev:pesticide-off

# Alternative command for layout debugging
npm run dev:debug-layout
```

### Option 3: Manual Integration in Components

Add the Pesticide component to your layout or any page:

```tsx
import { PesticideDebugger } from '@/lib/dev-utils';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				{children}

				{/* Development-only Pesticide debugger */}
				<PesticideDebugger />
			</body>
		</html>
	);
}
```

### Option 4: Programmatic Control with Hook

```tsx
import { usePesticide } from '@/lib/dev-utils';

export default function DeveloperPanel() {
	const { isEnabled, toggle, enable, disable, isDevMode } = usePesticide();

	if (!isDevMode) return null;

	return (
		<div>
			<p>Pesticide Status: {isEnabled ? 'Active' : 'Inactive'}</p>
			<button onClick={toggle}>Toggle Pesticide</button>
			<button onClick={enable}>Enable</button>
			<button onClick={disable}>Disable</button>
		</div>
	);
}
```

## Keyboard Shortcuts

- **Toggle Pesticide**: `Ctrl+Alt+P` (Windows/Linux) or `Cmd+Alt+P` (Mac)

## Visual Indicators

### Control Panel

- **Bottom-right corner**: Shows current Pesticide status
- **Red background**: Pesticide is active
- **Gray background**: Pesticide is inactive
- **Click to toggle**: Quick enable/disable

### Active State Indicator

When Pesticide is active, you'll see:

- A red indicator in the top-right corner saying "PESTICIDE CSS ACTIVE"
- Instructions panel with usage tips
- All elements outlined with colored borders

## Element Color Coding

| Element Type  | Color                  | Purpose               |
| ------------- | ---------------------- | --------------------- |
| `body`        | Black                  | Document body         |
| `nav`         | Red                    | Navigation elements   |
| `header`      | Green                  | Page headers          |
| `footer`      | Blue                   | Page footers          |
| `section`     | Pink                   | Content sections      |
| `article`     | Red                    | Article content       |
| `aside`       | Orange                 | Sidebar content       |
| `h1`          | Red                    | Main headings         |
| `h2-h6`       | Yellow-Orange gradient | Subheadings           |
| `p`           | Green                  | Paragraphs            |
| `div`         | Cyan                   | Generic containers    |
| `span`        | Blue                   | Inline elements       |
| `a`           | Purple                 | Links                 |
| `img`         | Pink                   | Images                |
| Form elements | Green-Yellow spectrum  | Inputs, buttons, etc. |

## Development Helper Classes

Add these classes to specific elements for targeted debugging:

```html
<!-- Highlight problematic elements -->
<div class="pesticide-debug">Problem element</div>

<!-- Highlight important elements -->
<div class="pesticide-highlight">Important element</div>

<!-- Mark elements for attention -->
<div class="pesticide-warn">Warning element</div>
```

## Safety Features

### Production Protection

- Component returns `null` if `NODE_ENV !== 'development'`
- CSS is never loaded in production builds
- Environment variable checks prevent accidental activation

### Performance Considerations

- CSS is loaded/unloaded dynamically
- No impact on production bundle size
- Minimal runtime overhead in development

## Troubleshooting

### Pesticide Not Showing

1. Check you're in development mode: `NODE_ENV=development`
2. Verify environment variable: `NEXT_PUBLIC_ENABLE_PESTICIDE=true`
3. Check browser console for loading errors
4. Ensure CSS file exists at `public/styles/pesticide.dev.css`

### Keyboard Shortcut Not Working

1. Make sure you're focused on the browser window
2. Try clicking in the page content area first
3. Check browser dev tools console for key event logs

### Control Panel Not Visible

1. Check z-index conflicts (Pesticide uses 9998)
2. Verify you're in development mode
3. Look for CSS conflicts with positioning

## Integration Examples

### Root Layout Integration

```tsx
// src/app/layout.tsx
import { PesticideDebugger } from '@/lib/dev-utils';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				{children}
				<PesticideDebugger />
			</body>
		</html>
	);
}
```

### Page-Specific Integration

```tsx
// src/app/page.tsx
import { PesticideDebugger } from '@/lib/dev-utils';

export default function HomePage() {
	return (
		<main>
			<h1>My Private Tutor Online</h1>
			{/* Your page content */}

			<PesticideDebugger />
		</main>
	);
}
```

### Conditional Loading

```tsx
import { PesticideDebugger } from '@/lib/dev-utils';

export default function MyComponent() {
	const shouldShowDebugger =
		process.env.NODE_ENV === 'development' &&
		process.env.NEXT_PUBLIC_SHOW_LAYOUT_DEBUG === 'true';

	return (
		<div>
			{/* Your component content */}

			{shouldShowDebugger && <PesticideDebugger />}
		</div>
	);
}
```

## Best Practices

### When to Use

- ✅ Layout debugging during development
- ✅ Understanding component boundaries
- ✅ Identifying CSS box model issues
- ✅ Visual QA during development
- ✅ Training junior developers on HTML structure

### When Not to Use

- ❌ Production environments (automatically prevented)
- ❌ Performance testing (adds visual overhead)
- ❌ Client demonstrations (can be distracting)

### Tips for Effective Usage

1. **Start with the big picture**: Enable Pesticide to see overall layout
   structure
2. **Use helper classes**: Add `pesticide-debug` to problematic elements
3. **Toggle frequently**: Use `Ctrl+Alt+P` to quickly compare with/without
   outlines
4. **Combine with dev tools**: Use alongside browser inspector for comprehensive
   debugging
5. **Document findings**: Use the visual feedback to identify and fix layout
   issues

## Dependencies

- **pesticide**: ^1.3.1 (dev dependency)
- **React**: ^19.0.0 (for component functionality)
- **Next.js**: 15.3.4+ (for environment variable support)

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (limited support - not recommended for development)

---

**Note**: This tool is exclusively for development use and will never impact
production builds or user experience.
