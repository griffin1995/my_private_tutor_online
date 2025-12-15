# Navigation Patterns - MANDATORY ARCHITECTURE

All navigation modifications must follow these patterns established October 17, 2025.

## Design System Compliance

### Color Standards
- **NEVER use hardcoded colors** - Always use design tokens from tailwind.config.ts
- **Primary Navy**: `text-primary-700` (#3F4A7E) for main navigation text
- **Accent Gold**: `text-accent-600` (#CA9E5B) for hover states and highlights
- **Zero tolerance**: Any hardcoded hex colors in navigation will cause design system violations

### Design Token Usage
```tsx
// ✅ CORRECT: Use design tokens
<nav className="text-primary-700 hover:text-accent-600">

// ❌ FORBIDDEN: Hardcoded hex colors
<nav style={{color: '#3F4A7E'}}>
<nav className="text-[#CA9E5B]">
```

## Responsive Breakpoints

### Desktop Navigation (1400px and above)
- **Breakpoint**: `2xl` (1400px+)
- **Layout**: Logo + Navigation items + CTA button
- **Container**: `hidden 2xl:flex items-center flex-1 justify-center space-x-8`

### Mobile Navigation (1399px and below)
- **Trigger**: `2xl:hidden` on hamburger menu
- **Layout**: Logo + Hamburger menu button
- **Reason**: Accommodates 5 navigation items with optimal spacing

### Critical Breakpoint Rule
**Never change breakpoint without updating ALL three locations**:
1. Main navigation container (`2xl:flex`)
2. Button container (`2xl:flex`)
3. Hamburger trigger (`2xl:hidden`)

## Typography Sizing

### Navigation Items
```tsx
className="text-base md:text-lg lg:text-lg xl:text-xl font-normal font-display"
```

### CTA Buttons (Desktop & Mobile)
```tsx
className="text-sm md:text-base lg:text-base xl:text-lg font-normal font-display"
```

### Visual Hierarchy Rule
**Buttons intentionally one size smaller than navigation items at each breakpoint** for better visual balance.

## Layout Architecture

### Navigation Items Container
```tsx
<div className="hidden 2xl:flex items-center flex-1 justify-center space-x-8">
  {/* Navigation items */}
</div>
```

### Logo Container
```tsx
<div className="min-w-48">
  {/* Logo component */}
</div>
```

### Button Container
```tsx
<div className="hidden 2xl:flex min-w-48 justify-end">
  {/* CTA button */}
</div>
```

### Spacing Requirements
- **Logo Container**: `min-w-48` for consistent left spacing
- **Button Container**: `min-w-48` for symmetrical right spacing
- **Navigation Items**: `space-x-8` between items

## Navigation Data Structure

### File Location
```
/src/components/navigation/Navigation.tsx
```

### Critical Code Sections
- **Line 34-175**: `navigationData` array with all menu items and sub-items
- **Line 391**: Logo container with `min-w-48`
- **Line 414**: Navigation items with responsive classes
- **Line 484**: Button container with `min-w-48 justify-end`
- **Line 506**: Hamburger menu with `2xl:hidden`

### Current Active Items
5 navigation items:
1. About Us
2. Subject Tuition
3. How It Works
4. Testimonials
5. Video Masterclasses

### Commented Out Items
- **11+ Bootcamps** (lines 149-174 in Navigation.tsx)
- Can be reactivated if needed by uncommenting

## Navigation Modification Rules

### 1. Adding/Removing Items
- **Location**: Update `navigationData` array (lines 34-175) ONLY
- **Process**: Modify array structure, do not change layout components
- **Testing**: Verify spacing works with new item count

### 2. Changing Breakpoints
- **Requirement**: Update ALL three locations simultaneously
- **Locations**:
  - Navigation container: `2xl:flex`
  - Button container: `2xl:flex`
  - Hamburger trigger: `2xl:hidden`
- **Testing**: Verify layout at new breakpoint boundaries

### 3. Styling Changes
- **Requirement**: Use design tokens from tailwind.config.ts exclusively
- **Process**: Map colors to existing tokens or add new tokens
- **Forbidden**: Direct hex values, CSS custom properties outside design system

### 4. Typography Changes
- **Requirement**: Maintain visual hierarchy (buttons smaller than nav items)
- **Pattern**: Follow existing responsive typography patterns
- **Testing**: Verify readability across all breakpoints

### 5. Spacing Changes
- **Requirement**: Keep `min-w-48` on logo and button containers for symmetry
- **Process**: Adjust `space-x-*` for navigation items if needed
- **Testing**: Verify symmetrical layout maintained

## Implementation Examples

### Adding New Navigation Item
```tsx
// In navigationData array (lines 34-175)
{
  name: 'New Section',
  href: '/new-section',
  description: 'Description text'
}
```

### Updating Responsive Breakpoint
```tsx
// Change ALL THREE instances from 2xl to xl
<div className="hidden xl:flex items-center flex-1 justify-center space-x-8">
<div className="hidden xl:flex min-w-48 justify-end">
<button className="xl:hidden">
```

### Design Token Usage
```tsx
// Use existing tokens
<a className="text-primary-700 hover:text-accent-600">

// Add new tokens to tailwind.config.ts if needed
colors: {
  primary: {
    700: '#3F4A7E'  // Navy
  },
  accent: {
    600: '#CA9E5B'  // Gold
  }
}
```

## Testing Requirements

### Visual Testing
1. **Desktop Navigation** (1400px+): All items visible with proper spacing
2. **Mobile Menu** (1399px-): Hamburger menu functional
3. **Typography Hierarchy**: Buttons smaller than nav items
4. **Color Consistency**: Design tokens render correctly

### Functionality Testing
1. **Navigation Links**: All routes accessible
2. **Responsive Behavior**: Breakpoint transitions smooth
3. **CTA Button**: Functional at all screen sizes
4. **Mobile Menu**: Hamburger toggle working

### Performance Testing
1. **Layout Shift**: No CLS during breakpoint transitions
2. **Accessibility**: Keyboard navigation functional
3. **Touch Targets**: Mobile menu usable on touch devices

## Common Issues and Solutions

### Navigation Items Overflow
- **Solution**: Reduce `space-x-*` or consider item prioritisation
- **Alternative**: Lower breakpoint threshold for mobile menu

### Design System Violations
- **Solution**: Map hardcoded colors to design tokens
- **Prevention**: Always use `text-primary-700` and `text-accent-600`

### Asymmetrical Layout
- **Solution**: Verify `min-w-48` on both logo and button containers
- **Check**: Ensure both containers have matching minimum widths

### Mobile Menu Issues
- **Solution**: Verify `2xl:hidden` class on hamburger trigger
- **Check**: Ensure mobile styles properly scoped

## Related Documentation

- [Development Standards](../standards/development-standards.md)
- [CSS Architecture](../standards/css-architecture.md)
- [Tech Stack Specifications](tech-stack.md)
- [Verification Checklists](../reference/verification-checklists.md)