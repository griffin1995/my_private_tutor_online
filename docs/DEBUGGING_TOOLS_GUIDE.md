# 🔍 Debugging Tools Guide - My Private Tutor Online

## Overview

This project now includes three powerful debugging tools to help identify redundant content, track errors, and optimize performance. All tools are **LLM-friendly** and produce structured output that Claude can easily analyze.

## 🔧 Installed Tools

### 1. Why Did You Render
- **Purpose**: Identifies unnecessary React re-renders and component performance issues
- **Best for**: Finding components causing performance problems
- **Output**: Console logs showing which components re-render and why

### 2. Source Map Explorer
- **Purpose**: Visual analysis of your JavaScript bundle
- **Best for**: Identifying large dependencies and redundant code
- **Output**: Interactive tree map showing what code contributes to bundle size

### 3. Depcheck
- **Purpose**: Analyzes project dependencies
- **Best for**: Finding unused dependencies and missing packages
- **Output**: JSON report of dependency usage across files

---

## 🚀 Usage Commands

### Quick Dependency Analysis
```bash
# Check for unused dependencies
pnpm run debug:deps

# Generate JSON report for LLM analysis
pnpm run debug:deps-json
```

### Bundle Analysis
```bash
# Analyze bundle after build
pnpm run debug:bundle

# Analyze with Next.js bundle analyzer
pnpm run debug:bundle-analyze

# Run all debugging tools
pnpm run debug:all
```

### Component Re-render Tracking
```bash
# Start development server (why-did-you-render is automatic)
pnpm run dev

# To track specific components, add this to any component:
ComponentName.whyDidYouRender = true;
```

---

## 📊 Understanding the Output

### Why Did You Render Console Output
```
🔄 Why Did You Render: ComponentName
├─ Reason: Different 'props'
├─ Prev props: { name: "old", count: 1 }
├─ Next props: { name: "new", count: 1 }
└─ Diff: name changed from "old" to "new"
```

### Depcheck JSON Output
```json
{
  "dependencies": ["used-package"],
  "devDependencies": ["used-dev-package"],
  "missing": {
    "missing-package": ["src/components/Example.tsx"]
  },
  "unused": ["unused-package"]
}
```

### Source Map Explorer
- Opens interactive web interface
- Tree map visualization of bundle size
- Click to drill down into specific modules
- Shows gzipped and parsed sizes

---

## 🎯 Common Use Cases

### Finding Redundant Content
1. **Run depcheck**: `pnpm run debug:deps-json`
2. **Analyze bundle**: `pnpm run debug:bundle`
3. **Review console**: Check why-did-you-render output during development

### Tracking Component Issues
1. **Add tracking**: `ComponentName.whyDidYouRender = true`
2. **Use the component**: Navigate to pages using the component
3. **Check console**: Look for re-render warnings

### Bundle Optimization
1. **Build and analyze**: `pnpm run debug:bundle-analyze`
2. **Identify large modules**: Click on largest sections in tree map
3. **Remove or optimize**: Use insights to reduce bundle size

---

## 📝 LLM Analysis Integration

All tools produce structured output perfect for Claude analysis:

### For Claude Analysis of Dependencies
```bash
pnpm run debug:deps-json
# Share the generated debug-deps-report.json with Claude
```

### For Claude Analysis of Re-renders
1. Enable component tracking
2. Copy console output from why-did-you-render
3. Share with Claude for performance recommendations

### For Claude Analysis of Bundle
1. Run `pnpm run debug:bundle-analyze`
2. Take screenshot of bundle analysis
3. Share with Claude for optimization suggestions

---

## ⚠️ Important Notes

### Development Only
- **why-did-you-render**: Only runs in development mode
- **Safe for production**: No debugging code in production builds

### Performance Impact
- **Minimal overhead**: Tools only run when explicitly requested
- **Development focus**: Primary impact is in development environment

### Configuration
- **why-did-you-render**: Configured in `scripts/why-did-you-render.js`
- **Automatic loading**: Loaded via `next.config.ts` in development
- **Custom settings**: Tracks hooks, provides detailed output

---

## 🔍 Troubleshooting

### Why Did You Render Not Showing
- Check `console.log` for initialization message
- Ensure running in development: `pnpm run dev`
- Verify component tracking: `ComponentName.whyDidYouRender = true`

### Source Map Explorer Errors
- Ensure build completed: Check `.next/static/js/` exists
- Try rebuilding: `pnpm run clean && pnpm run build`
- Check source maps enabled in production builds

### Depcheck False Positives
- Some packages used in configs may show as unused
- Check the JSON output for detailed file usage
- Cross-reference with actual imports in code

---

## 📈 Expected Results

With these tools, you should be able to:

1. **Identify unused dependencies** → Reduce bundle size
2. **Track performance issues** → Eliminate unnecessary re-renders
3. **Visualize bundle composition** → Optimize large modules
4. **Generate LLM-friendly reports** → Get AI assistance with optimization

This debugging toolkit will help you systematically identify and eliminate redundant content from your codebase.