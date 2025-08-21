# Page Mapping Visual Prompt System

## Quick Start - Your Power Commands

### Main Command
```
Map this page visually
```

That's it! Just say those 4 words and you'll get a comprehensive component architecture map.

## Command Variations

### 🎯 Basic Mapping
```
Map this page visually
```
Produces a complete visual ASCII-art layout with hierarchical numbering.

### 🚀 Detailed Analysis
```
Map this page visually + with colors + with metrics
```
Adds color-coding, performance data, and interaction states.

### ⚡ Quick Scan
```
Map this page visually - quick layout only
```
Fast overview of page structure without deep analysis.

### 🔍 Deep Dive
```
Map this page visually - include all states, interactions, data flows, performance hints, accessibility landmarks, and responsive variations
```
Comprehensive analysis with every detail documented.

### 📱 Mobile-First
```
Map this page visually - mobile first
```
Starts with mobile layout and shows breakpoint transitions.

### 🎨 Interactive Focus
```
Map this page visually - focus on user interactions
```
Emphasizes clickable elements, forms, and state changes.

### ⚡ Performance Analysis
```
Map this page visually - highlight performance
```
Shows loading strategies, client boundaries, and optimization opportunities.

## Modifier System

Enhance any prompt with these modifiers using the `+` symbol:

| Modifier | Effect |
|----------|--------|
| `+ with colors` | 🟦=interactive, 🟩=static, 🟨=dynamic, 🟥=critical |
| `+ with metrics` | Size estimates, load times, interaction costs |
| `+ with a11y` | Accessibility landmarks, ARIA labels, focus management |
| `+ with React context` | Component boundaries, hooks, context providers |
| `+ with grid overlay` | CSS Grid/Flexbox container boundaries |
| `+ as blueprint` | Technical schematic with measurements |

## Example Combinations

```bash
# For debugging layout issues
Map this page visually + with grid overlay + with metrics

# For accessibility audit
Map this page visually + with a11y + with colors

# For performance optimization
Map this page visually + with metrics - highlight performance

# For component refactoring
Map this page visually + with React context + as blueprint
```

## What You'll Get

Your visual map will include:

1. **ASCII-art layout** showing spatial relationships
2. **Hierarchical numbering** (1, 1.1, 1.1.1) for precise reference
3. **Component inventory** with all elements labeled
4. **Interactive elements** clearly marked
5. **Responsive breakpoints** noted
6. **Performance hints** where relevant
7. **State variations** (hover, active, disabled)
8. **Data flow indicators** showing connections

## Sample Output Structure

```
🏗️ VISUAL PAGE ARCHITECTURE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────┐
│ 1. HEADER [72px, Static]                │
│ ├─ 1.1 Logo                             │
│ ├─ 1.2 Navigation                       │
│ │   ├─ 1.2.1 Home                      │
│ │   ├─ 1.2.2 About ▼                   │
│ │   └─ 1.2.3 Contact                   │
│ └─ 1.3 CTA Button                      │
├─────────────────────────────────────────┤
│ 2. HERO SECTION [100vh, Dynamic]        │
│ ├─ 2.1 Background Video                 │
│ ├─ 2.2 Headline Text                    │
│ └─ 2.3 Action Buttons                   │
└─────────────────────────────────────────┘

LEGEND: ▼ Dropdown | ○ Image | ▢ Button
```

## Quick Reference Card

Save this for instant access:

```
🎯 BASIC:     Map this page visually
🚀 DETAILED:  Map this page visually + with colors + with metrics  
⚡ QUICK:     Map this page visually - quick layout only
🔍 DEEP:      Map this page visually - include all states
📱 MOBILE:    Map this page visually - mobile first
🎨 INTERACT:  Map this page visually - focus on user interactions
⚡ PERFORM:   Map this page visually - highlight performance
```

## Why This Works

- **Memorable**: Just 4 words for the base command
- **Expandable**: Natural language modifiers
- **Powerful**: Triggers comprehensive analysis
- **Flexible**: Adapts to any web technology
- **Precise**: Hierarchical numbering for exact references

---

*Created for My Private Tutor Online - Premium Development Workflow*
*Use this prompt system for rapid page analysis and component mapping*