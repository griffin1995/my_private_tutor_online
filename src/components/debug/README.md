# Debug System - My Private Tutor Online

## Overview

The debug system provides visual debugging tools for the navigation and other components. It includes:

- **Visual borders** around navigation elements with color coding
- **Debug overlay** showing current navigation state
- **Runtime controls** for toggling debug features
- **Keyboard shortcuts** for quick access
- **Environment variable** configuration

## Quick Start

### Method 1: Environment Variables (Persistent)
1. Copy `.env.debug.example` to `.env.local`
2. Set `NEXT_PUBLIC_DEBUG_MODE=true`
3. Restart your development server

### Method 2: Runtime Controls (Temporary)
1. Use keyboard shortcut: `Ctrl+Shift+D`
2. Or use the debug panel in the top-left corner
3. Toggle features on/off as needed

## Features

### Visual Debug Indicators

When debug mode is enabled, you'll see colored borders around navigation elements:

- 🔴 **Red Border**: Not scrolled, transparent background
- 🔵 **Blue Border**: Scrolled, white background  
- 🟢 **Green Border**: Dropdown open, white background
- 🟡 **Yellow Border**: Container div
- 🟣 **Purple Border**: Nav element
- 🟠 **Orange Border**: Logo link
- 🔷 **Cyan Border**: Desktop nav items
- 🩷 **Pink Border**: Dropdown overlay
- 💙 **Indigo Border**: Dropdown content
- 🟨 **Amber Border**: Menu items container

### Debug Overlay

Shows real-time information about:
- Scroll position
- Navbar height
- Dropdown state
- Active menu
- Window dimensions

### Controls Available

- **Debug Mode**: Master on/off toggle
- **Show Borders**: Visual element borders
- **Show Labels**: Debug labels (future feature)
- **Console Logging**: Debug messages in console
- **Quick Actions**: Enable/disable all features at once

## Keyboard Shortcuts

- `Ctrl+Shift+D`: Toggle debug mode on/off

## Environment Variables

```bash
# Main toggle
NEXT_PUBLIC_DEBUG_MODE=true

# Visual features
NEXT_PUBLIC_DEBUG_BORDERS=true
NEXT_PUBLIC_DEBUG_LABELS=true
NEXT_PUBLIC_DEBUG_DATA_ATTRS=true

# Console logging
NEXT_PUBLIC_DEBUG_LOGGING=true

# Customization
NEXT_PUBLIC_DEBUG_COLOR_SCHEME=rainbow
NEXT_PUBLIC_DEBUG_BORDER_WIDTH=2
NEXT_PUBLIC_DEBUG_LABEL_POSITION=top-left
```

## Components

### DebugControls
Interactive panel for controlling debug features at runtime.

**Usage:**
```tsx
import { DebugControls } from '@/components/debug/DebugControls'

<DebugControls position="top-left" />
```

### useDebugShortcuts
Hook for adding keyboard shortcuts to any component.

**Usage:**
```tsx
import { useDebugShortcuts } from '@/components/debug/DebugControls'

function MyComponent() {
  useDebugShortcuts()
  // ... rest of component
}
```

## Configuration API

### Functions

```typescript
import { 
  isDebugEnabled,
  toggleDebug,
  setDebugConfig,
  getDebugConfig,
  debugLog,
  debugGroup
} from '@/lib/debug/debug-config'

// Check if debug is enabled
const debugEnabled = isDebugEnabled()

// Toggle debug mode
toggleDebug()

// Set specific config
setDebugConfig({ showBorders: true })

// Get current config
const config = getDebugConfig()

// Debug logging
debugLog('Message', data)

// Grouped logging
debugGroup('Navigation State', () => {
  debugLog('Dropdown open:', isOpen)
  debugLog('Scroll position:', scrollY)
})
```

## Production Notes

- Debug features automatically disable in production builds
- Environment variables are ignored in production for security
- Runtime controls are not available in production
- All debug code is tree-shaken out of production bundles

## Development Workflow

1. **Enable debug mode** using environment variables or runtime controls
2. **Navigate the site** to see visual indicators
3. **Check console** for debug messages
4. **Use debug panel** to toggle specific features
5. **Test with debug off** to ensure no impact on production behavior

## Troubleshooting

### Debug mode not working?
- Check that `NEXT_PUBLIC_DEBUG_MODE=true` in `.env.local`
- Restart the development server after changing environment variables
- Try using `Ctrl+Shift+D` keyboard shortcut
- Check browser console for any errors

### Visual borders not showing?
- Ensure `showBorders` is enabled in debug config
- Check that debug mode is enabled first
- Try using "All ON" quick action in debug panel

### Debug panel not visible?
- Look in the top-left corner of the page
- Try the keyboard shortcut `Ctrl+Shift+D`
- Check browser console for JavaScript errors