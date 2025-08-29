# 🎬 Framer Motion Reference Guide
### Comprehensive Animation Library Documentation for My Private Tutor Online

**Version**: Framer Motion v11+  
**Project Context**: Premium tutoring platform with royal client standards  
**Quality Requirements**: Enterprise-grade animations with performance optimisation

---

## 📋 Table of Contents

1. [Introduction & Installation](#introduction--installation)
2. [Core Motion Components](#core-motion-components)
3. [Animation Configuration](#animation-configuration)
4. [Layout & Transitions](#layout--transitions)
5. [Scroll-Based Animations](#scroll-based-animations)
6. [Gesture Handling](#gesture-handling)
7. [Advanced Hooks & Utilities](#advanced-hooks--utilities)
8. [Performance Optimisation](#performance-optimisation)
9. [Server-Side Rendering](#server-side-rendering)
10. [Implementation Guidelines](#implementation-guidelines)
11. [Quick Reference](#quick-reference)

---

## 🚀 Introduction & Installation

### Overview
Framer Motion is React's premier animation library, providing declarative animations with hardware acceleration, gesture support, and layout animations. For My Private Tutor Online, it enables premium user experiences with smooth transitions that reflect our royal client standards.

### Installation
```bash
npm install framer-motion
```

### Basic Import
```jsx
import { motion } from "framer-motion"
```

### Project Configuration
**CONTEXT7 SOURCE**: `/grx7/framer-motion` - Official animation patterns  
**IMPLEMENTATION REASON**: Royal client-worthy animation quality requirements

```jsx
// Required for Next.js App Router compatibility
"use client"

import { motion } from "framer-motion"

export const AnimatedComponent = () => (
  <motion.div animate={{ opacity: 1 }} />
)
```

---

## 🎯 Core Motion Components

### motion.div
The fundamental animated element for creating smooth transitions.

**CONTEXT7 SOURCE**: `/grx7/framer-motion` - Basic motion.div patterns  
**USE CASES**: Hero sections, card animations, content reveals

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Premium Content
</motion.div>
```

### motion.section
Semantic animated sections for page structure.

**USE CASES**: Page sections, testimonial areas, service blocks

```jsx
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  <h2>Our Premium Services</h2>
</motion.section>
```

### motion.img
Animated images with loading states and reveals.

**USE CASES**: Tutor photos, school logos, hero images

```jsx
<motion.img
  src="/tutors/elizabeth-founder.jpg"
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.2 }}
  alt="Elizabeth Burrows, Founder"
/>
```

### motion.button
Interactive button animations with hover states.

**USE CASES**: CTA buttons, navigation, form submissions

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="premium-cta"
>
  Book Consultation
</motion.button>
```

### motion.h1, motion.h2, motion.h3
Animated headings for content hierarchy.

**USE CASES**: Page titles, section headers, testimonial headings

```jsx
<motion.h1
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ type: "spring", stiffness: 100 }}
>
  Premium Tutoring Excellence
</motion.h1>
```

### Complete Motion Element List
- `motion.div` - Primary container animations
- `motion.section` - Semantic page sections
- `motion.article` - Content blocks
- `motion.header` - Page headers
- `motion.nav` - Navigation elements
- `motion.aside` - Sidebar content
- `motion.main` - Main content areas
- `motion.footer` - Page footers
- `motion.p` - Paragraph animations
- `motion.span` - Inline text effects
- `motion.a` - Animated links
- `motion.button` - Interactive buttons
- `motion.form` - Form animations
- `motion.input` - Input field effects
- `motion.textarea` - Text area animations
- `motion.select` - Dropdown animations
- `motion.ul` - List animations
- `motion.ol` - Ordered list effects
- `motion.li` - List item animations
- `motion.img` - Image reveals
- `motion.video` - Video animations
- `motion.canvas` - Canvas effects
- `motion.svg` - SVG animations
- `motion.path` - SVG path drawing

---

## ⚙️ Animation Configuration

### initial Prop
Defines the starting state of animations.

**CONTEXT7 SOURCE**: `/grx7/framer-motion` - Initial state configuration patterns  
**IMPLEMENTATION REASON**: Consistent animation entry points

```jsx
// Opacity fade-in
initial={{ opacity: 0 }}

// Slide up from bottom
initial={{ opacity: 0, y: 50 }}

// Scale from center
initial={{ opacity: 0, scale: 0.8 }}

// Slide from left
initial={{ opacity: 0, x: -100 }}

// Complex multi-property
initial={{
  opacity: 0,
  y: 30,
  scale: 0.95,
  rotate: -5
}}
```

### animate Prop
Defines the target animation state.

```jsx
// Fade to full opacity
animate={{ opacity: 1 }}

// Slide to position
animate={{ opacity: 1, y: 0 }}

// Scale to normal size
animate={{ opacity: 1, scale: 1 }}

// Multi-property animation
animate={{
  opacity: 1,
  y: 0,
  scale: 1,
  rotate: 0
}}
```

### transition Prop
Controls animation timing and easing.

**TRANSITION TYPES**:

#### Spring Transitions (Recommended for UI)
```jsx
transition={{
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1
}}
```

#### Tween Transitions
```jsx
transition={{
  duration: 0.6,
  ease: "easeInOut",
  delay: 0.2
}}
```

#### Custom Easing
```jsx
transition={{
  duration: 0.8,
  ease: [0.4, 0.0, 0.2, 1] // Custom cubic-bezier
}}
```

### whileHover Prop
Animations triggered on hover.

**USE CASES**: Button effects, card interactions, navigation highlights

```jsx
<motion.div
  whileHover={{
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  }}
>
  Hover for elegance
</motion.div>
```

### whileTap Prop
Animations during click/touch interactions.

```jsx
<motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.05 }}
>
  Premium Interaction
</motion.button>
```

### whileInView Prop
Animations triggered when element enters viewport.

**USE CASES**: Scroll-triggered reveals, progressive content loading

```jsx
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Scroll-revealed content
</motion.div>
```

---

## 🔄 Layout & Transitions

### AnimatePresence
Manages enter/exit animations for components.

**CONTEXT7 SOURCE**: `/grx7/framer-motion` - AnimatePresence lifecycle patterns  
**USE CASES**: Modal transitions, page changes, conditional content

```jsx
import { AnimatePresence, motion } from "framer-motion"

<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      Dynamic Content
    </motion.div>
  )}
</AnimatePresence>
```

### Layout Animations
Automatic animations between layout changes.

**USE CASES**: Expanding cards, reordering lists, responsive design

```jsx
<motion.div
  layout
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
  Auto-animating layout
</motion.div>
```

### Shared Layout Animations
Coordinated animations between elements.

```jsx
<motion.div
  layoutId="premium-card"
  transition={{ duration: 0.6 }}
>
  Shared animation element
</motion.div>
```

### Page Transitions
Smooth transitions between routes.

**USE CASES**: Navigation between tutoring pages, modal overlays

```jsx
<AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
  <motion.div
    key={router.asPath}
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -200 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## 📜 Scroll-Based Animations

### useScroll Hook
Tracks scroll progress for scroll-linked animations.

**CONTEXT7 SOURCE**: `/grx7/framer-motion` - Scroll tracking patterns  
**USE CASES**: Progress indicators, parallax effects, scroll-triggered reveals

```jsx
import { useScroll, useTransform, motion } from "framer-motion"

const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

<motion.div style={{ opacity }}>
  Scroll-linked content
</motion.div>
```

### useInView Hook
Detects when elements enter the viewport.

**USE CASES**: Lazy loading, scroll-triggered animations, analytics

```jsx
import { useInView } from "framer-motion"
import { useRef } from "react"

const ref = useRef(null)
const isInView = useInView(ref, { once: true })

<motion.div
  ref={ref}
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
>
  Viewport-triggered content
</motion.div>
```

### useTransform Hook
Creates value transformations based on other motion values.

**USE CASES**: Parallax scrolling, dynamic scaling, progress indicators

```jsx
import { useScroll, useTransform } from "framer-motion"

const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 1000], [0, -500])
const scale = useTransform(scrollY, [0, 500], [1, 0.8])

<motion.div style={{ y, scale }}>
  Parallax element
</motion.div>
```

### Scroll Progress Indicators

```jsx
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

---

## 👆 Gesture Handling

### Drag Interactions
Enable dragging functionality with constraints.

**USE CASES**: Interactive elements, carousel navigation, mobile interfaces

```jsx
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
>
  Draggable element
</motion.div>
```

### Pan Gestures
Handle drag-like interactions without moving the element.

```jsx
<motion.div
  onPan={(event, info) => console.log(info.point)}
  onPanStart={() => console.log("Pan started")}
  onPanEnd={() => console.log("Pan ended")}
>
  Pan-responsive element
</motion.div>
```

### Hover Gestures
Advanced hover state management.

```jsx
<motion.div
  onHoverStart={() => console.log("Hover started")}
  onHoverEnd={() => console.log("Hover ended")}
  whileHover={{ scale: 1.1 }}
>
  Advanced hover interactions
</motion.div>
```

### Tap Gestures
Precise touch and click handling.

```jsx
<motion.div
  onTap={() => console.log("Tapped")}
  onTapStart={() => console.log("Tap started")}
  onTapCancel={() => console.log("Tap cancelled")}
  whileTap={{ scale: 0.9 }}
>
  Touch-optimised element
</motion.div>
```

---

## 🔧 Advanced Hooks & Utilities

### useAnimation Hook
Programmatic animation control.

**CONTEXT7 SOURCE**: `/grx7/framer-motion` - Animation control patterns  
**USE CASES**: Complex sequences, conditional animations, user-triggered effects

```jsx
import { useAnimation } from "framer-motion"

const controls = useAnimation()

const handleClick = async () => {
  await controls.start({ scale: 1.2 })
  await controls.start({ scale: 1 })
}

<motion.div
  animate={controls}
  onClick={handleClick}
>
  Controlled animation
</motion.div>
```

### useMotionValue Hook
Create and manage motion values directly.

**USE CASES**: Custom animations, shared values, performance optimisation

```jsx
import { useMotionValue, useTransform } from "framer-motion"

const x = useMotionValue(0)
const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

<motion.div
  drag="x"
  style={{ x, opacity }}
>
  Motion value driven
</motion.div>
```

### useSpring Hook
Create spring-based motion values.

```jsx
import { useSpring, useMotionValue } from "framer-motion"

const x = useMotionValue(0)
const springX = useSpring(x, { stiffness: 300, damping: 30 })

<motion.div style={{ x: springX }}>
  Spring-driven animation
</motion.div>
```

### useDragControls Hook
Programmatic drag control.

```jsx
import { useDragControls } from "framer-motion"

const dragControls = useDragControls()

<motion.div
  drag="x"
  dragControls={dragControls}
>
  Custom drag control
</motion.div>
```

### useAnimate Hook
Imperative animations with more control.

```jsx
import { useAnimate, stagger } from "framer-motion"

const [scope, animate] = useAnimate()

const handleAnimate = () => {
  animate("li", { opacity: 1 }, { delay: stagger(0.1) })
}
```

---

## ⚡ Performance Optimisation

### LazyMotion
Reduce bundle size by loading features on demand.

**CONTEXT7 SOURCE**: `/grx7/framer-motion` - Performance optimisation patterns  
**IMPLEMENTATION REASON**: Premium site performance requirements

```jsx
import { LazyMotion, domAnimation, m } from "framer-motion"

<LazyMotion features={domAnimation}>
  <m.div animate={{ opacity: 1 }}>
    Optimised animation
  </m.div>
</LazyMotion>
```

### MotionConfig
Global animation configuration.

**USE CASES**: Site-wide transition settings, reduced motion preferences

```jsx
import { MotionConfig } from "framer-motion"

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

### Reduced Motion Support
Accessibility-first animation handling.

```jsx
import { useReducedMotion } from "framer-motion"

const shouldReduceMotion = useReducedMotion()

<motion.div
  animate={shouldReduceMotion ? {} : { x: 100 }}
>
  Accessible animation
</motion.div>
```

### will-change CSS Property
Optimise for animation performance.

```jsx
<motion.div
  style={{ willChange: "transform" }}
  animate={{ x: 100 }}
>
  Performance optimised
</motion.div>
```

---

## 🖥️ Server-Side Rendering

### Optimized Appear Animations
Handle SSR animation handoff smoothly.

**CONTEXT7 SOURCE**: `/grx7/framer-motion` - SSR animation patterns  
**USE CASES**: Next.js applications, SEO-optimised pages

```jsx
import { motion, startOptimizedAppearAnimation, optimizedAppearDataAttribute } from "framer-motion"

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  {...{[optimizedAppearDataAttribute]: "a"}}
>
  SSR-optimised animation
</motion.div>
```

### Hydration-Safe Patterns
Prevent hydration mismatches.

```jsx
import { useEffect, useState } from "react"

const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return <div>Static content</div>

return (
  <motion.div animate={{ opacity: 1 }}>
    Hydration-safe animation
  </motion.div>
)
```

---

## 🎯 Implementation Guidelines

### Animation Principles for Premium UX

1. **Subtle & Purposeful**: Animations should enhance, not distract
2. **Performance First**: 60fps animations only
3. **Accessibility**: Respect reduced motion preferences
4. **Responsive**: Smooth across all devices
5. **Royal Quality**: Enterprise-grade polish

### Recommended Animation Durations
- **Micro-interactions**: 0.1-0.3s
- **Page transitions**: 0.3-0.6s
- **Content reveals**: 0.4-0.8s
- **Complex sequences**: 0.8-1.2s

### Best Practices

#### ✅ Do
- Use spring transitions for natural feel
- Implement reduced motion support
- Test on various devices
- Use will-change for performance
- Combine with CSS transforms

#### ❌ Don't
- Animate layout-triggering properties
- Use excessive delays
- Create jarring movements
- Ignore accessibility
- Over-animate interfaces

### Common Patterns for Tutoring Platform

#### Hero Section Reveal
```jsx
<motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <motion.h1
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    Premium Tutoring Excellence
  </motion.h1>
</motion.section>
```

#### Testimonial Cards
```jsx
<motion.div
  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Testimonial content
</motion.div>
```

#### Navigation Dropdowns
```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      Dropdown content
    </motion.div>
  )}
</AnimatePresence>
```

---

## 📚 Quick Reference

### Essential Imports
```jsx
import { 
  motion,           // Core animated components
  AnimatePresence,  // Enter/exit animations
  useScroll,        // Scroll tracking
  useInView,        // Viewport detection
  useTransform,     // Value transformation
  useAnimation,     // Programmatic control
  useMotionValue,   // Direct value control
  LazyMotion,       // Performance optimisation
  domAnimation,     // Feature bundle
  m                 // Lightweight motion
} from "framer-motion"
```

### Common Animation Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `initial` | Starting state | `{{ opacity: 0, y: 20 }}` |
| `animate` | Target state | `{{ opacity: 1, y: 0 }}` |
| `exit` | Exit state | `{{ opacity: 0, scale: 0.8 }}` |
| `whileHover` | Hover state | `{{ scale: 1.05 }}` |
| `whileTap` | Press state | `{{ scale: 0.95 }}` |
| `whileInView` | In viewport | `{{ opacity: 1 }}` |
| `transition` | Animation config | `{{ duration: 0.6, ease: "easeOut" }}` |
| `layout` | Layout animation | `true` or `"position"` |
| `layoutId` | Shared element | `"unique-id"` |

### Transition Types

| Type | Best For | Configuration |
|------|----------|---------------|
| `spring` | UI interactions | `{ type: "spring", stiffness: 300, damping: 30 }` |
| `tween` | Predictable timing | `{ duration: 0.6, ease: "easeInOut" }` |
| `inertia` | Gesture-driven | `{ type: "inertia", bounceStiffness: 300 }` |
| `keyframes` | Complex sequences | `{ duration: 2, times: [0, 0.5, 1] }` |

### Gesture Configuration

| Gesture | Property | Handler |
|---------|----------|---------|
| Drag | `drag="x"` | `onDrag`, `onDragStart`, `onDragEnd` |
| Hover | `whileHover` | `onHoverStart`, `onHoverEnd` |
| Tap | `whileTap` | `onTap`, `onTapStart`, `onTapCancel` |
| Pan | N/A | `onPan`, `onPanStart`, `onPanEnd` |

### Performance Checklist

- [ ] Use `LazyMotion` for bundle optimisation
- [ ] Implement `useReducedMotion` support
- [ ] Add `will-change` CSS for animated properties
- [ ] Test animations on various devices
- [ ] Use transform properties instead of layout changes
- [ ] Implement proper exit animations with `AnimatePresence`
- [ ] Test SSR compatibility with Next.js
- [ ] Validate 60fps performance

---

## 📖 Official Documentation Links

- **Main Documentation**: [framer.com/motion](https://www.framer.com/motion/)
- **API Reference**: [framer.com/motion/api](https://www.framer.com/motion/api/)
- **Examples**: [framer.com/motion/examples](https://www.framer.com/motion/examples/)
- **Performance Guide**: [framer.com/motion/guide-performance](https://www.framer.com/motion/guide-performance/)
- **Accessibility**: [framer.com/motion/guide-accessibility](https://www.framer.com/motion/guide-accessibility/)

---

## 🎓 My Private Tutor Online Specific Guidelines

### Brand-Appropriate Animations
- **Elegant transitions**: Reflecting premium service quality
- **Subtle reveals**: Professional, not flashy
- **Smooth interactions**: Royal client-worthy responsiveness
- **Accessible design**: Inclusive for all users
- **Performance priority**: Fast loading on all devices

### Implementation Standards
- All animations must respect `prefers-reduced-motion`
- Maximum 60fps performance requirement
- Mobile-first responsive design
- SEO-friendly SSR compatibility
- Enterprise-grade error handling

---

*This reference guide serves as the definitive Framer Motion implementation resource for the My Private Tutor Online development team. All patterns follow Context7 MCP documentation standards and royal client quality requirements.*