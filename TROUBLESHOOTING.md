# Troubleshooting Guide

## Common Issues and Solutions

### 🎨 Styling Issues

#### Dark Gray Backgrounds on Non-Homepage Pages

**Symptoms:**
- All pages except homepage show dark gray/near-black backgrounds
- Elements with `bg-white` class appear transparent
- User sees `DEBUG: bg=white class=bg-white` but background is still dark

**Diagnosis:**
1. Check if `bg-white` class is being applied: Should appear in element's className
2. Check computed CSS: Should show `background-color: rgb(255, 255, 255)` but shows `rgba(0, 0, 0, 0)`
3. Not a dark mode issue if `Has dark class?: false` in debug output

**Root Cause:**
Tailwind CSS compilation issue where `bg-white` class definition is missing or has specificity problems.

**Solution:**
Use `.bg-white-fixed` class instead of `bg-white`:

```css
/* In globals.css */
.bg-white-fixed {
  background-color: #ffffff !important;
}
```

```tsx
// In component
const backgroundClasses = {
  white: 'bg-white-fixed', // Instead of 'bg-white'
  // ...
}
```

**Files to Update:**
- `/src/components/layout/PageLayout.tsx`
- `/src/components/ContentSection.tsx` 
- `/src/styles/globals.css`

**Prevention:**
Always test background colors on non-homepage pages during development.

---

### 🔧 Build Issues

#### Tailwind CSS Not Compiling

**Symptoms:**
- Tailwind classes not working
- Styles appear broken or missing
- Build succeeds but styles don't apply

**Diagnosis:**
1. Check `tailwind.config.js` content paths
2. Verify CSS imports in `_app.tsx` or main CSS file
3. Run `npm run build` to see compilation errors

**Solution:**
1. Ensure all paths are included in `tailwind.config.js`:
```js
content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  // Add any missing paths
],
```

2. Restart dev server after config changes
3. Clear `.next` cache if needed: `rm -rf .next`

---

### 📱 Component Issues

#### PageLayout Background Not Working

**Quick Fix:**
Always set `background="white"` prop explicitly:

```tsx
<PageLayout
  title="Page Title"
  background="white" // Always include this
>
```

#### ContentSection Gray Backgrounds

**Quick Fix:**
Use `background="white"` prop and ensure `.bg-white-fixed` is in CSS:

```tsx
<ContentSection background="white" padding="large">
```

---

## Debugging Tools

### Background Debug Code

Add to PageLayout component for investigation:

```tsx
// Debug output
React.useEffect(() => {
  setTimeout(() => {
    const pageDiv = document.querySelector('[data-page-layout]')
    const computedStyle = window.getComputedStyle(pageDiv || document.body)
    console.log('Background debug:', {
      background,
      className: pageDiv?.className,
      computedBg: computedStyle.backgroundColor,
      hasDarkClass: document.documentElement.classList.contains('dark')
    })
  }, 100)
}, [background])
```

### CSS Class Inspector

Add visual debugging to see which elements have background classes:

```css
.debug-backgrounds [class*="bg-"] {
  outline: 2px solid blue !important;
}
```

---

## Prevention Checklist

- [ ] Always set `background="white"` on PageLayout
- [ ] Test all page backgrounds during development  
- [ ] Use `.bg-white-fixed` for critical white backgrounds
- [ ] Document any CSS workarounds in code comments
- [ ] Update this troubleshooting guide when new issues arise

---

**Last Updated:** 2025-07-02  
**Next Review:** When new styling issues are discovered