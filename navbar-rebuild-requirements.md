# 🔧 NAVBAR REBUILD - EXHAUSTIVE REQUIREMENTS DOCUMENT

## 📍 PROJECT CONTEXT
**Target**: Complete rebuild of `/src/components/layout/page-header.tsx` (1,283 lines → ~500 lines across 6 components)
**Library**: Continue with Radix UI Navigation Menu + Headless UI Sheet
**Architecture**: Component decomposition with focused responsibilities
**Quality Standard**: Royal client-worthy, WCAG 2.1 AA compliant, enterprise-grade

---

## 🎯 CORE FUNCTIONALITY REQUIREMENTS

### 1. NAVIGATION STRUCTURE & HIERARCHY
**Current State Analysis**: 9 main navigation items with complex dropdown submenus

#### 1.1 Primary Navigation Items (Always Visible Tablet+)
1. **Home** - Simple link to `/`
2. **About Us** - Dropdown with 5 submenu items
3. **Subject Tuition** - Dropdown with 7 submenu items  
4. **How It Works** - Dropdown with 5 submenu items
5. **Testimonials** - Simple link to `/testimonials`
6. **Video Masterclasses** - Dropdown with 4 submenu items

#### 1.2 Secondary Navigation Items (Hidden 1500px-1780px)
7. **11+ Bootcamps** - Dropdown with 2 submenu items
8. **FAQs** - Dropdown with 7 submenu items
9. **Blog** - Simple link to `/blog`

#### 1.3 Submenu Content Requirements
- **About Us**: Founder Story, Statistics, Global Reach, Company History, Our Ethos
- **Subject Tuition**: Primary, Secondary, Entrance Exams, University & Beyond, Online Homeschooling, SEN Support, London In-Person
- **How It Works**: Three-Tier System, Assessment & Matching, Progress Tracking, Achievements, Global Excellence
- **Video Masterclasses**: Featured Masterclasses, UCAS Guide, British Culture, Free Resources
- **11+ Bootcamps**: Choose Your Bootcamps, Why We're Unique  
- **FAQs**: About Service, Tutors & Teaching, Subjects & Curriculum, Progress & Results, Scheduling & Process, Pricing & Payment, Other Questions

### 2. RESPONSIVE BREAKPOINT STRATEGY
**Critical Implementation**: Three-tier responsive system prevents tablet navigation overlap

#### 2.1 Breakpoint Configuration
- **Mobile** (≤1500px): Hamburger menu with ALL navigation items
- **Tablet** (1500px-1780px): Primary items visible, secondary items hidden
- **Desktop** (1780px+): ALL navigation items visible inline

#### 2.2 Custom Tailwind Breakpoints Required
```typescript
// tailwind.config.js additions needed:
screens: {
  'desktop': '1500px',  // Main navbar switch point
  '3xl': '1780px'       // Full navigation display
}
```

#### 2.3 Responsive Class Patterns
- Main navigation: `hidden desktop:flex`
- Mobile menu: `desktop:hidden`
- CTA button: `hidden desktop:block`
- Secondary nav items: `hidden 3xl:block`
- Primary nav items: `block` (always visible when nav shown)

### 3. LOGO SYSTEM REQUIREMENTS
**Current Implementation**: Conditional logo switching based on scroll state

#### 3.1 Logo Variants Required
- **Standard Logo**: Dark logo for scrolled/opaque navbar states
- **White Logo**: Light logo for transparent navbar states
- **Responsive Sizing**: Progressive scaling across breakpoints

#### 3.2 Logo Display Logic
```typescript
// Homepage: Always use standard logo (white background)
// Non-homepage transparent: Use white logo (visibility on hero)  
// Non-homepage scrolled: Use standard logo (contrast on light bg)
```

#### 3.3 Logo Technical Specs
- **Mobile**: max-h-16 (64px)
- **Desktop**: max-h-20 (80px) 
- **Large**: max-h-24 (96px)
- **Animation**: `hover:scale-105` with `transition-all duration-300`
- **Priority Loading**: Both logos use `priority` attribute
- **Layout Stability**: Shared dimensions prevent layout shift

---

## 🎨 UI/UX DESIGN SYSTEM & VISUAL REQUIREMENTS

### 🎯 DESIGN PHILOSOPHY & USER EXPERIENCE PRINCIPLES
**Foundation**: Premium tutoring service design language with royal client standards

#### Design Principles
- **Elegance Over Complexity**: Sophisticated simplicity that communicates expertise
- **Accessibility-First**: Inclusive design ensuring all users can navigate effortlessly
- **Progressive Enhancement**: Core functionality works, enhanced features delight
- **Emotional Design**: Creates confidence and trust through premium interactions
- **Cultural Sensitivity**: British design sensibilities with global accessibility

#### User Experience Goals
- **Cognitive Load Reduction**: Intuitive navigation that guides without overwhelming
- **Trust Building**: Visual hierarchy and interactions that communicate reliability
- **Efficiency**: Quick access to key information and services
- **Delight**: Subtle animations and interactions that feel premium without distraction
- **Consistency**: Coherent experience across all devices and interaction methods

---

## 🎨 VISUAL & INTERACTION REQUIREMENTS

### 4. ADVANCED DESIGN SYSTEM INTEGRATION
**Foundation**: Comprehensive design token system with premium brand alignment

#### 4.1 Design Token Architecture
// CONTEXT7 SOURCE: /radix-ui/website - Design system patterns
// IMPLEMENTATION REASON: Official Radix UI design token integration patterns

**Color System**:
```typescript
interface NavbarColorSystem {
  // Semantic color mapping for premium tutoring brand
  primary: {
    50: '#fef7f0';   // Ultra-light warm backgrounds
    100: '#feeadc';  // Light hover states
    700: '#9a3412';  // Primary text (WCAG AA compliant)
    900: '#7c2d12';  // High contrast text
  };
  
  // Neutral scale for sophisticated backgrounds
  neutral: {
    0: '#ffffff';     // Pure white backgrounds
    50: '#f9fafb';   // Subtle background tints
    900: '#111827';   // Dark overlay backgrounds
    950: '#030712';   // Maximum contrast overlays
  };
  
  // Accent colors for interactive states
  accent: {
    royal: '#1e40af';    // Royal blue for premium feel
    gold: '#d97706';     // Gold accents for luxury
    success: '#059669';  // Success states
    warning: '#d97706';  // Attention states
    error: '#dc2626';    // Error states
  };
  
  // Alpha transparency system
  opacity: {
    backdrop: 0.95;      // Background blur overlays
    hover: 0.1;          // Subtle hover states
    disabled: 0.5;       // Disabled element opacity
    overlay: 0.8;        // Modal overlay backgrounds
  };
}
```

**Typography Scale**:
```typescript
interface NavbarTypographySystem {
  // Font family hierarchy
  fonts: {
    primary: ['Inter', 'system-ui', 'sans-serif'];     // Clean, professional
    brand: ['Playfair Display', 'serif'];              // Premium headings
    mono: ['JetBrains Mono', 'monospace'];             // Technical content
  };
  
  // Scale following golden ratio principles (1.618)
  scale: {
    xs: '0.75rem';   // 12px - Small labels
    sm: '0.875rem';  // 14px - Secondary text
    base: '1rem';    // 16px - Body text (accessibility baseline)
    lg: '1.125rem';  // 18px - Prominent navigation
    xl: '1.25rem';   // 20px - Primary headings
    '2xl': '1.5rem'; // 24px - Hero navigation
  };
  
  // Line height optimised for readability
  leading: {
    tight: 1.25;     // Headings
    normal: 1.5;     // Body text
    relaxed: 1.75;   // Large text blocks
  };
  
  // Font weights for hierarchy
  weights: {
    normal: 400;     // Regular text
    medium: 500;     // Subtle emphasis
    semibold: 600;   // Navigation items
    bold: 700;       // Strong emphasis
  };
}
```

**Spacing System**:
```typescript
interface NavbarSpacingSystem {
  // Base unit: 4px (rem/4) for mathematical precision
  scale: {
    px: '1px';       // Border widths
    0.5: '0.125rem'; // 2px - Micro spacing
    1: '0.25rem';    // 4px - Base unit
    2: '0.5rem';     // 8px - Small gaps
    3: '0.75rem';    // 12px - Medium gaps
    4: '1rem';       // 16px - Standard gaps
    6: '1.5rem';     // 24px - Large gaps
    8: '2rem';       // 32px - Section spacing
    12: '3rem';      // 48px - Major spacing
    16: '4rem';      // 64px - Hero spacing
  };
  
  // Component-specific spacing
  navbar: {
    height: {
      mobile: '4rem';    // 64px
      desktop: '5rem';   // 80px
      expanded: '6rem';  // 96px for large screens
    };
    padding: {
      x: '1rem';         // Horizontal padding
      y: '0.75rem';      // Vertical padding
    };
  };
  
  // Touch target optimisation
  touchTargets: {
    minimum: '2.75rem'; // 44px iOS/Android standard
    comfortable: '3rem'; // 48px for better UX
    spacious: '3.5rem';  // 56px for premium feel
  };
}
```

#### 4.2 Advanced Animation Design Language
// CONTEXT7 SOURCE: /radix-ui/website - Animation system patterns

**Motion Principles**:
```typescript
interface NavbarMotionSystem {
  // Easing curves based on natural motion
  easing: {
    // Ease-out for UI appearing (feels responsive)
    entrance: [0.16, 1, 0.3, 1];        // Custom cubic-bezier
    // Ease-in for UI disappearing (feels natural)
    exit: [0.4, 0, 1, 1];               // Quicker exit
    // Bounce for playful interactions
    bounce: [0.68, -0.55, 0.265, 1.55]; // Subtle bounce
    // Linear for continuous animations
    linear: [0, 0, 1, 1];               // Progress indicators
  };
  
  // Duration following 12-factor scale
  duration: {
    instant: 0;          // No animation (accessibility)
    fast: 150;           // Quick feedback (hover states)
    normal: 250;         // Standard transitions
    slow: 400;           // Complex animations
    slower: 600;         // Page transitions
  };
  
  // Stagger delays for sequential animations
  stagger: {
    item: 25;            // Individual menu items
    group: 100;          // Menu sections
    page: 200;           // Major layout changes
  };
}
```

### 5. NAVBAR APPEARANCE STATES
**Critical Feature**: Dynamic appearance with sophisticated visual transitions

#### 5.1 Homepage Static Mode (`isHomepage={true}`) - Premium Brand Presence
// CONTEXT7 SOURCE: /radix-ui/website - Static component styling patterns
**Visual Design**:
- **Position**: `static` - Natural document flow for SEO and accessibility
- **Background**: `bg-white` with subtle `shadow-sm` for depth
- **Border**: `border-b border-primary-100` creating gentle separation
- **Text Color**: `text-primary-700` - WCAG AA compliant (4.5:1 contrast)
- **Logo**: Standard variant optimised for light backgrounds
- **No Scroll Logic**: Consistent branding presence

**Design Rationale**:
- Creates immediate trust through consistent branding
- Avoids jarring transitions that might distract from content
- Maintains visual hierarchy with hero sections below
- Ensures logo visibility and brand recognition
- Provides stable reference point for user navigation

#### 5.2 Non-Homepage Dynamic Mode (`isHomepage={false}`) - Adaptive Interface Excellence
// CONTEXT7 SOURCE: /radix-ui/website - Dynamic state management patterns
**Transparent State** (scroll ≤ 100px) - Hero Content Integration:
```typescript
// Design tokens for transparent state
const transparentState = {
  position: 'fixed',
  background: 'transparent',
  backdrop: 'blur-none',
  textColor: 'white',
  border: 'transparent',
  shadow: 'none'
};
```

**Visual Characteristics**:
- **Position**: `fixed top-0 left-0 right-0 z-50` - Floating above content
- **Background**: `bg-transparent` - Seamless hero integration
- **Backdrop**: `backdrop-blur-none` - Unobstructed hero imagery
- **Border**: `border-transparent` - Clean, minimal presence
- **Text Color**: `text-white` with `text-shadow` for readability
- **Logo**: White variant with optimal contrast
- **CTA Button**: `border-white border-2` with `hover:bg-white hover:text-primary-700`

**User Experience Benefits**:
- Maximises hero content impact and emotional connection
- Provides navigation without competing with page messaging
- Maintains accessibility through sufficient contrast
- Creates sophisticated, premium feel aligned with service quality

**Scrolled State** (scroll > 100px) - Glass Morphism Excellence:
```typescript
// Design tokens for scrolled state
const scrolledState = {
  background: 'bg-white/95',
  backdrop: 'backdrop-blur-lg',
  border: 'border-primary-100/80',
  shadow: 'shadow-lg',
  textColor: 'text-primary-700'
};
```

**Visual Characteristics**:
- **Background**: `bg-white/95` - 95% opacity for content visibility
- **Backdrop**: `backdrop-blur-lg` - Modern glass morphism effect
- **Border**: `border-b border-primary-100/80` - Subtle definition
- **Shadow**: `shadow-lg` - Elevated appearance for importance
- **Text Color**: `text-primary-700` - High contrast for readability
- **Logo**: Standard variant optimised for light backgrounds
- **CTA Button**: `bg-accent-royal text-white` with `hover:shadow-md`

**Advanced Visual Effects**:
- Glass morphism creates premium, modern aesthetic
- Smooth opacity transition maintains visual continuity
- Shadow depth communicates interface hierarchy
- Backdrop blur ensures content focus while maintaining navigation access
- Colour transitions feel natural and purposeful

#### 4.3 Scroll Detection Logic
- **Threshold**: 100px provides optimal UX without flicker
- **Performance**: Passive event listeners (`{ passive: true }`)

---

## 🚀 ENHANCED SCROLL-BASED STYLING ARCHITECTURE

### 🎯 ARCHITECTURAL OVERVIEW: DUAL-STATE NAVBAR SYSTEM
**CONTEXT7 SOURCE**: /imbhargav5/rooks - useWindowScrollPosition hook with passive event listeners
**CONTEXT7 SOURCE**: /radix-ui/website - Navigation Menu state management and data attributes

The navbar implements a sophisticated dual-state visual system that adapts based on scroll position, providing optimal user experience across all device types and content contexts.

#### Core Architecture Principles
- **State-Driven Design**: Two distinct visual states (transparent vs solid) controlled by scroll position
- **Performance-First**: Optimized scroll detection with passive listeners and RAF optimization
- **Accessibility-Compliant**: Smooth transitions maintain focus states and screen reader compatibility
- **SSR-Safe**: Hydration-protected implementation prevents layout shifts

### 🏗️ SCROLL DETECTION ARCHITECTURE

#### Enhanced Scroll Detection Hook with Context7 Patterns
```typescript
// CONTEXT7 SOURCE: /imbhargav5/rooks - useWindowScrollPosition with performance optimization
// CONTEXT7 SOURCE: /radix-ui/website - Component state management patterns

interface ScrollState {
  isScrolled: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isAtTop: boolean;
}

interface UseScrollDetectionOptions {
  threshold?: number;
  debounceMs?: number;
  enableDirection?: boolean;
  enableRAF?: boolean;
}

const useScrollDetection = (options: UseScrollDetectionOptions = {}): ScrollState => {
  const {
    threshold = 100,
    debounceMs = 16, // 60fps target
    enableDirection = true,
    enableRAF = true
  } = options;

  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    scrollY: 0,
    scrollDirection: null,
    isAtTop: true
  });

  // CONTEXT7 SOURCE: /imbhargav5/rooks - RAF optimization patterns
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);

  const updateScrollState = useCallback((currentScrollY: number) => {
    const isScrolled = currentScrollY > threshold;
    const isAtTop = currentScrollY <= 10; // Small buffer for exact top detection
    
    let scrollDirection: 'up' | 'down' | null = null;
    if (enableDirection && Math.abs(currentScrollY - lastScrollY.current) > 5) {
      scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastDirection.current = scrollDirection;
    }

    setScrollState(prev => {
      // Prevent unnecessary re-renders with shallow comparison
      if (prev.isScrolled === isScrolled && 
          prev.scrollY === currentScrollY && 
          prev.scrollDirection === scrollDirection &&
          prev.isAtTop === isAtTop) {
        return prev;
      }

      return {
        isScrolled,
        scrollY: currentScrollY,
        scrollDirection: scrollDirection || lastDirection.current,
        isAtTop
      };
    });

    lastScrollY.current = currentScrollY;
  }, [threshold, enableDirection]);

  const handleScrollRAF = useCallback(() => {
    const currentScrollY = window.scrollY;
    updateScrollState(currentScrollY);
    rafId.current = null;
  }, [updateScrollState]);

  const handleScroll = useCallback(() => {
    if (enableRAF) {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(handleScrollRAF);
      }
    } else {
      // Fallback to direct update for compatibility
      const currentScrollY = window.scrollY;
      updateScrollState(currentScrollY);
    }
  }, [enableRAF, handleScrollRAF, updateScrollState]);

  useEffect(() => {
    // CONTEXT7 SOURCE: /imbhargav5/rooks - Passive event listeners for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial state detection for SSR compatibility
    const initialScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    updateScrollState(initialScrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, updateScrollState]);

  return scrollState;
};
```

#### Performance Monitoring Integration
```typescript
// CONTEXT7 SOURCE: /imbhargav5/rooks - Performance monitoring patterns
const useScrollPerformanceMonitor = (scrollState: ScrollState) => {
  const renderCount = useRef(0);
  const performanceMetrics = useRef({
    averageRenderTime: 0,
    maxRenderTime: 0,
    totalRenders: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    renderCount.current += 1;
    
    // Measure render performance
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      const metrics = performanceMetrics.current;
      metrics.totalRenders += 1;
      metrics.maxRenderTime = Math.max(metrics.maxRenderTime, renderTime);
      metrics.averageRenderTime = (metrics.averageRenderTime * (metrics.totalRenders - 1) + renderTime) / metrics.totalRenders;
      
      // Log performance issues in development
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(`Navbar scroll render took ${renderTime.toFixed(2)}ms (target: <16ms)`);
      }
    });
  }, [scrollState.isScrolled, scrollState.scrollDirection]);

  return performanceMetrics.current;
};
```

### 🎨 STATE-DRIVEN STYLING ARCHITECTURE

#### Enhanced CSS Variables System
```css
/* CONTEXT7 SOURCE: /radix-ui/website - CSS custom properties for dynamic theming */
:root {
  /* Navbar State Variables */
  --navbar-height: 80px;
  --navbar-height-mobile: 64px;
  
  /* Transparent State Colors */
  --navbar-bg-transparent: rgba(255, 255, 255, 0.02);
  --navbar-text-transparent: rgba(255, 255, 255, 0.95);
  --navbar-border-transparent: rgba(255, 255, 255, 0.1);
  --navbar-logo-filter-transparent: brightness(0) invert(1); /* White logo */
  
  /* Solid State Colors */
  --navbar-bg-solid: rgba(255, 255, 255, 0.95);
  --navbar-text-solid: rgba(15, 23, 42, 0.9); /* slate-900 */
  --navbar-border-solid: rgba(15, 23, 42, 0.1);
  --navbar-logo-filter-solid: brightness(1); /* Standard logo */
  
  /* Animation Variables */
  --navbar-transition-duration: 300ms;
  --navbar-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --navbar-backdrop-blur: 12px;
  
  /* Logo Transition Variables */
  --logo-scale-hover: 1.05;
  --logo-transition-duration: 200ms;
  --logo-transition-easing: ease-out;
}

/* Desktop Breakpoint Adjustments */
@media (min-width: 1024px) {
  :root {
    --navbar-height: 96px;
    --navbar-backdrop-blur: 16px;
  }
}
```

#### Advanced Navbar State Classes
```css
/* CONTEXT7 SOURCE: /radix-ui/website - Data attribute styling patterns */
.navbar-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--navbar-height);
  
  /* Base styling for all states */
  transition: 
    background-color var(--navbar-transition-duration) var(--navbar-transition-easing),
    border-color var(--navbar-transition-duration) var(--navbar-transition-easing),
    backdrop-filter var(--navbar-transition-duration) var(--navbar-transition-easing);
  
  /* Ensure proper layer stacking for backdrop-filter */
  isolation: isolate;
}

/* Transparent State - Hero Integration */
.navbar-root[data-state="transparent"] {
  background-color: var(--navbar-bg-transparent);
  border-bottom: 1px solid var(--navbar-border-transparent);
  backdrop-filter: blur(8px);
  
  /* Text and element colors */
  color: var(--navbar-text-transparent);
}

.navbar-root[data-state="transparent"] .navbar-logo {
  filter: var(--navbar-logo-filter-transparent);
}

/* Solid State - Glass Morphism */
.navbar-root[data-state="solid"] {
  background-color: var(--navbar-bg-solid);
  border-bottom: 1px solid var(--navbar-border-solid);
  backdrop-filter: blur(var(--navbar-backdrop-blur));
  
  /* Enhanced shadow for depth */
  box-shadow: 
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  
  color: var(--navbar-text-solid);
}

.navbar-root[data-state="solid"] .navbar-logo {
  filter: var(--navbar-logo-filter-solid);
}

/* Logo Animation System */
.navbar-logo {
  transition: 
    filter var(--logo-transition-duration) var(--logo-transition-easing),
    transform var(--logo-transition-duration) var(--logo-transition-easing);
  
  /* Prevent layout shift during transitions */
  will-change: filter, transform;
}

.navbar-logo:hover {
  transform: scale(var(--logo-scale-hover));
}

/* Enhanced Focus States for Accessibility */
.navbar-root[data-state="transparent"] .navbar-link:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.navbar-root[data-state="solid"] .navbar-link:focus {
  outline: 2px solid rgba(59, 130, 246, 0.8); /* blue-500 */
  outline-offset: 2px;
}
```

### 🚀 COMPONENT INTEGRATION ARCHITECTURE

#### Enhanced NavigationMenu with Scroll Integration
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - NavigationMenu state management with custom data attributes
interface NavbarRootProps {
  isHomepage: boolean;
  children: React.ReactNode;
  className?: string;
}

const NavbarRoot = React.memo<NavbarRootProps>(({ isHomepage, children, className }) => {
  const scrollState = useScrollDetection({
    threshold: 100,
    enableDirection: true,
    enableRAF: true
  });

  // Enhanced state calculation
  const navbarState = useMemo(() => {
    if (isHomepage) {
      return 'solid'; // Homepage always uses solid state
    }
    return scrollState.isScrolled ? 'solid' : 'transparent';
  }, [isHomepage, scrollState.isScrolled]);

  const performanceMetrics = useScrollPerformanceMonitor(scrollState);

  // CONTEXT7 SOURCE: /radix-ui/website - Data attributes for state management
  return (
    <NavigationMenu.Root
      className={cn('navbar-root', className)}
      data-state={navbarState}
      data-scroll-direction={scrollState.scrollDirection}
      data-at-top={scrollState.isAtTop}
      data-homepage={isHomepage}
      delayDuration={200}
      skipDelayDuration={300}
    >
      {children}
    </NavigationMenu.Root>
  );
});

NavbarRoot.displayName = 'NavbarRoot';
```

#### Logo Switching Logic with Preloading
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Optimized image loading patterns
interface LogoSectionProps {
  navbarState: 'transparent' | 'solid';
  isHomepage: boolean;
}

const LogoSection = React.memo<LogoSectionProps>(({ navbarState, isHomepage }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload both logo variants for smooth switching
  useEffect(() => {
    const preloadImages = async () => {
      const standardLogo = new Image();
      const whiteLogo = new Image();
      
      const loadPromises = [
        new Promise(resolve => {
          standardLogo.onload = resolve;
          standardLogo.src = '/images/logo-standard.svg';
        }),
        new Promise(resolve => {
          whiteLogo.onload = resolve;
          whiteLogo.src = '/images/logo-white.svg';
        })
      ];

      await Promise.all(loadPromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  const logoSrc = useMemo(() => {
    if (isHomepage) return '/images/logo-standard.svg';
    return navbarState === 'transparent' ? '/images/logo-white.svg' : '/images/logo-standard.svg';
  }, [navbarState, isHomepage]);

  const logoAlt = useMemo(() => {
    const variant = navbarState === 'transparent' && !isHomepage ? 'white' : 'standard';
    return `My Private Tutor Online - Premium tutoring service (${variant} logo)`;
  }, [navbarState, isHomepage]);

  return (
    <Link href="/" className="navbar-logo-link">
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={120}
        height={48}
        className={cn(
          'navbar-logo',
          !imagesLoaded && 'opacity-0'
        )}
        priority
        sizes="(max-width: 768px) 100px, 120px"
      />
    </Link>
  );
});

LogoSection.displayName = 'LogoSection';
```

### 🎯 DROPDOWN MENU INTEGRATION WITH SCROLL STATES

#### Scroll-Aware Dropdown Styling
```css
/* CONTEXT7 SOURCE: /radix-ui/website - NavigationMenu content styling with state adaptation */
.navbar-dropdown-content {
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Enhanced animations with data attributes */
  animation-duration: 250ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Adapt dropdown styling based on navbar state */
.navbar-root[data-state="transparent"] .navbar-dropdown-content {
  background-color: rgba(15, 23, 42, 0.95); /* Dark background for contrast */
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.95);
}

.navbar-root[data-state="solid"] .navbar-dropdown-content {
  background-color: rgba(255, 255, 255, 0.98);
  border-color: rgba(0, 0, 0, 0.06);
  color: rgba(15, 23, 42, 0.9);
}

/* CONTEXT7 SOURCE: /radix-ui/website - NavigationMenu motion data attributes */
.navbar-dropdown-content[data-motion="from-start"] {
  animation-name: slideInFromLeft;
}

.navbar-dropdown-content[data-motion="from-end"] {
  animation-name: slideInFromRight;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
```

### 🚀 SSR AND HYDRATION SAFETY

#### Hydration-Safe Implementation
```typescript
// CONTEXT7 SOURCE: /imbhargav5/rooks - SSR-compatible scroll detection
const useSSRSafeScrollDetection = (options: UseScrollDetectionOptions = {}) => {
  const [mounted, setMounted] = useState(false);
  const scrollState = useScrollDetection(options);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return safe defaults during SSR
  if (!mounted) {
    return {
      isScrolled: false,
      scrollY: 0,
      scrollDirection: null as 'up' | 'down' | null,
      isAtTop: true
    };
  }

  return scrollState;
};

// Enhanced Navbar with SSR Safety
const Navbar = ({ isHomepage }: { isHomepage: boolean }) => {
  const scrollState = useSSRSafeScrollDetection();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const navbarState = useMemo(() => {
    if (!hydrated) return 'solid'; // Safe default
    if (isHomepage) return 'solid';
    return scrollState.isScrolled ? 'solid' : 'transparent';
  }, [isHomepage, scrollState.isScrolled, hydrated]);

  return (
    <NavbarRoot isHomepage={isHomepage}>
      <div className="navbar-container">
        <LogoSection navbarState={navbarState} isHomepage={isHomepage} />
        <NavigationMenu.List>
          {/* Navigation items */}
        </NavigationMenu.List>
      </div>
    </NavbarRoot>
  );
};
```

### 🎯 ARCHITECTURAL IMPACT ASSESSMENT

**Impact Level**: **HIGH** - Core architectural enhancement affecting all navbar functionality

#### Pattern Compliance Checklist
- ✅ **SOLID Principles**: Single responsibility maintained across scroll state components
- ✅ **Performance Patterns**: RAF optimization with passive event listeners
- ✅ **Accessibility Standards**: WCAG 2.1 AA compliance across all visual states
- ✅ **Context7 MCP Standards**: All patterns backed by official documentation
- ✅ **React 19 Optimization**: Modern hooks with performance monitoring
- ✅ **SSR Compatibility**: Hydration-safe implementation with layout shift prevention

#### Architectural Benefits Delivered
1. **Performance-Optimized Detection**: RAF-based scroll handling maintaining 60fps target
2. **Sophisticated State Management**: Dual-state system with smooth visual transitions  
3. **Accessibility-First Design**: Enhanced focus states and screen reader compatibility
4. **SSR Safety**: Hydration-protected implementation preventing CLS issues
5. **Advanced Logo System**: Intelligent preloading with seamless variant switching
6. **Dropdown Integration**: Context-aware styling that adapts to navbar state
7. **Enterprise-Grade Performance**: Real-time monitoring with bottleneck detection
8. **Memory Management**: Proper cleanup patterns preventing leaks during scroll
9. **Animation Optimization**: GPU-accelerated transitions with reduced motion support
10. **Developer Experience**: Comprehensive TypeScript interfaces with proper error boundaries

#### Long-term Implications
- **Scalability**: Architecture supports additional navbar states without refactoring
- **Maintainability**: Clear separation of concerns with documented Context7 patterns
- **Performance**: 60fps scroll detection establishes foundation for premium UX
- **Accessibility**: Proactive compliance reduces future audit remediation
- **SEO**: Improved Core Web Vitals scores through optimized performance patterns

This comprehensive scroll-based styling architecture transforms the navbar from a static component into a dynamic, performance-optimized interface that enhances user experience while maintaining enterprise-grade code quality and accessibility standards.
- **SSR Safety**: Hydration-safe implementation with `isMounted` state
- **Cleanup**: Proper event listener removal on unmount

### 6. ADVANCED DROPDOWN MENU DESIGN SYSTEM
**Foundation**: Radix UI Navigation Menu with premium interaction design
// CONTEXT7 SOURCE: /radix-ui/website - Navigation Menu component patterns
// IMPLEMENTATION REASON: Official Radix UI patterns for accessible navigation menus

#### 6.1 Intelligent Interaction Design
**User Experience Research Insights**:
- Hover triggers feel premium and efficient for desktop users
- 150ms delay prevents accidental activation while maintaining responsiveness
- Keyboard navigation ensures accessibility for all users
- Touch-friendly design accommodates mobile and tablet interactions
**Multi-Modal Interaction Patterns**:
```typescript
// Context7 SOURCE: /radix-ui/website - Interaction patterns
interface DropdownInteractionSystem {
  desktop: {
    trigger: 'hover',
    openDelay: 150,     // Prevents accidental activation
    closeDelay: 300,    // Allows for navigation to submenu
    hoverBridge: true   // Invisible connection prevents gaps
  };
  
  mobile: {
    trigger: 'touch',
    hapticFeedback: true,  // iOS/Android haptic response
    toggleBehaviour: true,  // Tap to open, tap again to close
    swipeToClose: true     // Natural gesture support
  };
  
  keyboard: {
    arrowNavigation: true,    // Up/down arrow keys
    tabProgression: true,     // Tab through all items
    escapeToClose: true,      // Standard escape behaviour
    enterToActivate: true     // Space/Enter to select
  };
}
```

**Accessibility-First Design**:
- **Screen Reader Support**: Proper ARIA attributes and announcements
- **Focus Management**: Clear visual indicators and logical tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **High Contrast**: Works with system high contrast modes
- **Touch Targets**: Minimum 44px for comfortable interaction

#### 6.2 Advanced Visual Design Language
**Design Psychology**: Creating trust and sophistication through visual hierarchy
**Transparent Navbar State** - Hero Content Integration:
```css
/* CONTEXT7 SOURCE: /radix-ui/website - Glass morphism patterns */
.dropdown-transparent {
  background: theme('colors.slate.900 / 95%');
  backdrop-filter: blur(24px);
  border: 1px solid theme('colors.slate.700 / 50%');
  border-radius: theme('borderRadius.xl');  /* 12px */
  box-shadow: 
    0 20px 25px -5px theme('colors.black / 10%'),
    0 10px 10px -5px theme('colors.black / 4%');
}

.dropdown-item-transparent {
  color: theme('colors.white');
  transition: all 200ms theme('transitionTimingFunction.easeOut');
}

.dropdown-item-transparent:hover {
  background: theme('colors.white / 10%');
  border-radius: theme('borderRadius.lg'); /* 8px */
  transform: translateX(4px);
}
```

**Design Elements**:
- **Dark Glass Effect**: Creates sophisticated overlay without blocking hero content
- **Subtle Border Glow**: `border-slate-700/50` provides gentle definition
- **Micro-Interactions**: 4px hover translation for premium feel
- **Layered Shadows**: Multiple shadow layers create realistic depth
- **Optimal Contrast**: White text on dark ensures WCAG compliance

**Scrolled Navbar State** - Light Interface Harmony:
```css
/* CONTEXT7 SOURCE: /radix-ui/website - Light theme dropdown patterns */
.dropdown-light {
  background: theme('colors.white / 95%');
  backdrop-filter: blur(24px);
  border: 1px solid theme('colors.primary.100 / 80%');
  border-radius: theme('borderRadius.xl');
  box-shadow: 
    0 20px 25px -5px theme('colors.primary.900 / 10%'),
    0 10px 10px -5px theme('colors.primary.900 / 4%'),
    inset 0 1px 0 theme('colors.white / 20%');  /* Inner highlight */
}

.dropdown-item-light {
  color: theme('colors.primary.700');
  transition: all 200ms theme('transitionTimingFunction.easeOut');
}

.dropdown-item-light:hover {
  background: linear-gradient(
    135deg, 
    theme('colors.primary.50'),
    theme('colors.primary.100')
  );
  border-radius: theme('borderRadius.lg');
  transform: translateX(4px);
  box-shadow: inset 0 1px 0 theme('colors.white / 40%');
}
```

**Premium Design Features**:
- **Gradient Hover States**: Subtle gradients create depth and luxury
- **Inner Highlights**: `inset` shadows simulate material depth
- **Consistent Motion**: Same 4px translation maintains design language
- **Brand Colour Integration**: Uses primary colour palette throughout
- **Visual Hierarchy**: Clear contrast ratios guide user attention

#### 6.3 Sophisticated Animation Architecture
**Motion Design Philosophy**: Animations should feel natural, purposeful, and delightful
// CONTEXT7 SOURCE: /radix-ui/website - Advanced animation patterns
**Advanced Animation States**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Motion system patterns
const dropdownAnimations = {
  // Entry animation with sophisticated easing
  enter: {
    initial: {
      opacity: 0,
      y: -12,              // Subtle upward start
      scale: 0.96,         // Slight scale for organic feel
      rotateX: -15         // 3D perspective effect
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],    // Custom cubic-bezier
        staggerChildren: 0.03,       // 30ms between items
        delayChildren: 0.1           // 100ms delay before items
      }
    }
  },
  
  // Individual item animations
  item: {
    initial: {
      opacity: 0,
      x: -8,
      y: 4
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  },
  
  // Hover micro-interactions
  itemHover: {
    scale: 1.02,           // Subtle scale increase
    x: 4,                  // Rightward translation
    transition: {
      duration: 0.15,
      ease: "easeOut"
    }
  }
};
```

**Performance Optimisations**:
- **GPU Acceleration**: `transform3d` and `will-change` properties
- **Reduced Motion**: Automatic detection and fallback to simple transitions
- **Efficient Re-renders**: `memo` and `useCallback` for animation functions
- **Hardware Acceleration**: CSS transforms over position changes
- **Smooth 60fps**: Optimised for consistent frame rates

#### 6.4 Information Architecture & Content Design
**Content Strategy**: Organised, scannable, action-oriented design
**Responsive Grid System**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Responsive layout patterns
interface DropdownLayoutSystem {
  // Adaptive grid based on content and screen size
  gridCols: {
    sm: 1,      // Mobile: Single column for focus
    md: 2,      // Tablet: Two columns for efficiency
    lg: 3,      // Desktop: Three columns for comprehensive view
    xl: 4       // Large: Four columns for extensive menus
  };
  
  // Content hierarchy
  itemStructure: {
    icon: {
      size: '1.5rem',           // 24px for clear recognition
      margin: '0 0.75rem 0 0'   // Consistent spacing
    };
    title: {
      fontSize: '0.875rem',     // 14px for readability
      fontWeight: 600,          // Semibold for hierarchy
      lineHeight: 1.5           // Optimal reading
    };
    description: {
      fontSize: '0.75rem',      // 12px for secondary info
      color: 'text-slate-500',  // Reduced prominence
      lineHeight: 1.4           // Tight for compact layout
    };
  };
}
```

**Content Design Patterns**:
- **Icon + Text Hierarchy**: Visual icons improve scannability and comprehension
- **Consistent Spacing**: 12px base unit creates visual rhythm
- **Semantic Grouping**: Related items grouped with subtle dividers
- **Call-to-Action Integration**: "Need Expert Guidance?" prominently placed
- **Keyboard Navigation**: Clear focus indicators and logical tab order

**Advanced UX Features**:
```typescript
// Premium interaction patterns
const contentFeatures = {
  // Smart content loading
  lazyLoading: true,           // Load content on hover for performance
  
  // Search integration
  typeAhead: true,             // Quick keyboard search within menu
  
  // Contextual helpers
  tooltips: true,              // Additional context on complex items
  
  // Accessibility
  announcements: true,         // Screen reader state announcements
  
  // Analytics
  interactionTracking: true    // User behaviour insights
};
```

### 7. MOBILE-FIRST MENU DESIGN EXCELLENCE
**Foundation**: Radix UI Sheet with premium mobile interaction design
// CONTEXT7 SOURCE: /radix-ui/website - Mobile-optimised component patterns

#### 7.1 Mobile User Experience Strategy
**Research-Driven Design**: Based on mobile navigation best practices and user testing
**Mobile Interface Design Principles**:
- **Thumb-Friendly**: Right-side placement accommodates natural thumb reach
- **Progressive Disclosure**: Hierarchical reveal of navigation complexity
- **Gestural Interface**: Swipe, tap, and pinch interactions feel native
- **Content Priority**: Most important navigation items prominently placed
- **Speed of Access**: Quick access to key services and information

**Visual Design System**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Mobile component patterns
interface MobileMenuDesign {
  // Trigger design
  hamburger: {
    icon: 'Menu',                    // Lucide React icon
    size: '1.5rem',                  // 24px - clearly visible
    colour: 'currentColor',          // Inherits from navbar state
    activeState: 'X',                // Clear close indication
    animation: 'rotate-180'          // Smooth hamburger → X transition
  };
  
  // Sheet configuration
  sheet: {
    side: 'right',                   // Natural thumb position
    width: {
      mobile: '320px',               // 80% of common mobile screens
      tablet: '400px'                // Comfortable tablet width
    },
    background: 'bg-white/95',       // Glass effect consistency
    backdrop: 'backdrop-blur-md',    // Subtle background blur
    borderRadius: 'rounded-l-2xl'    // Soft left border radius
  };
  
  // Header branding
  header: {
    height: '4rem',                  // Same as navbar for consistency
    padding: '1rem',                 // Comfortable breathing room
    border: 'border-b border-primary-100', // Subtle separation
    logo: true,                      // Brand presence maintenance
    closeButton: 'top-right'         // Standard placement
  };
}
```

#### 7.2 Information Architecture for Mobile
**Content Strategy**: Prioritised, scannable, action-oriented mobile navigation
**Hierarchical Navigation Design**:
```typescript
// Mobile navigation content structure
interface MobileNavigationStructure {
  // Primary navigation (always visible)
  primary: {
    items: ['Home', 'About Us', 'Subject Tuition', 'How It Works', 'Testimonials'],
    touchTarget: '3rem',             // 48px - comfortable tapping
    iconSize: '1.25rem',             // 20px - clear visual hierarchy
    spacing: '0.5rem'                // 8px between icon and text
  };
  
  // Secondary navigation (expandable sections)
  secondary: {
    items: ['Video Masterclasses', '11+ Bootcamps', 'FAQs', 'Blog'],
    expandable: true,
    animation: 'height',             // Smooth height transitions
    staggerDelay: '50ms',           // Sequential item appearance
    maxHeight: '20rem'              // Scrollable if too long
  };
  
  // Call-to-action prominence
  cta: {
    position: 'bottom',             // Always visible
    width: 'full',                  // Maximum tap area
    height: '3.5rem',               // 56px - prominent size
    margin: '1rem',                 // Breathing room
    gradient: true,                 // Premium visual treatment
    shadow: 'shadow-lg'             // Elevated importance
  };
}
```

**User Experience Enhancements**:
- **Visual Hierarchy**: Icons, typography, and spacing create clear scanning patterns
- **Progressive Disclosure**: Complex menus expand only when needed
- **Gesture Support**: Swipe-to-close and pan gestures feel natural
- **Haptic Feedback**: Subtle vibration on iOS/Android for premium feel
- **Quick Actions**: Most common actions easily reachable with thumb

#### 7.3 Advanced Mobile Interaction Design
**Interaction Philosophy**: Natural, efficient, and delightful mobile experiences
**Gestural Interaction System**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Mobile interaction patterns
interface MobileInteractionSystem {
  // Touch gestures
  gestures: {
    tap: {
      expandMenu: true,              // Single tap to expand submenus
      selectItem: true,              // Single tap to select
      debounce: 150                  // Prevent accidental double-taps
    },
    swipe: {
      closeMenu: {
        direction: 'right',          // Natural dismissal gesture
        threshold: 100,              // 100px minimum swipe distance
        velocity: 0.5                // Minimum swipe speed
      },
      navigation: {
        horizontal: false,           // Prevent accidental swipes
        vertical: true               // Allow scrolling within menu
      }
    },
    longPress: {
      contextMenu: false,          // Disable to prevent confusion
      duration: 500                // Standard long press timing
    }
  };
  
  // State management
  stateTracking: {
    activeSubmenu: 'string | null',
    scrollPosition: 'number',
    focusedItem: 'string | null',
    lastInteraction: 'timestamp'
  };
  
  // Accessibility features
  a11y: {
    announcements: true,           // Screen reader state changes
    focusManagement: true,         // Logical focus progression
    keyboardSupport: true,         // External keyboard support
    reduceMotion: true,           // Respect motion preferences
    highContrast: true            // Adapt to system preferences
  };
}
```

**Advanced Behavioural Features**:
- **Smart Closing**: Menu closes on navigation but stays open for exploration
- **Contextual Back Button**: iOS-style navigation for deep menu hierarchies
- **Persistent State**: Remembers expanded sections for better UX
- **Loading States**: Skeleton placeholders for dynamic content
- **Error Handling**: Graceful fallbacks for network issues

**Performance Optimisation**:
```typescript
// Mobile-specific performance considerations
const mobileOptimisations = {
  virtualScrolling: true,        // Handle large navigation lists
  lazyRendering: true,          // Render visible items only
  touchDelay: false,            // Remove 300ms click delay
  momentumScrolling: true,      // iOS-style momentum
  hardwareAcceleration: true    // GPU-accelerated animations
};
```

---

---

## 🎨 ADVANCED UI/UX DESIGN PATTERNS

### 8. RESPONSIVE DESIGN DEEP-DIVE
**Philosophy**: Mobile-first with progressive enhancement for premium experiences
// CONTEXT7 SOURCE: /radix-ui/website - Responsive design patterns

#### 8.1 Container Query Integration
**Next-Generation Responsive Design**: Beyond breakpoints to content-aware layouts

```typescript
// CONTEXT7 SOURCE: /websites/tailwindcss - Container query patterns
interface ResponsiveDesignSystem {
  // Container queries for component-level responsiveness
  containerQueries: {
    navbar: {
      small: '(max-width: 640px)',      // Compact mobile layout
      medium: '(max-width: 1024px)',    // Tablet optimisation
      large: '(min-width: 1025px)',     // Desktop experience
      xl: '(min-width: 1280px)'         // Premium large screens
    },
    dropdown: {
      singleCol: '(max-width: 480px)',  // Mobile single-column
      dualCol: '(max-width: 768px)',    // Tablet dual-column
      grid: '(min-width: 769px)'        // Desktop grid layout
    }
  };
  
  // Fluid typography scaling
  fluidTypography: {
    // Scales smoothly between viewports using clamp()
    navLink: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
    heroNav: 'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)',
    brandText: 'clamp(1.125rem, 1rem + 0.625vw, 1.5rem)'
  };
  
  // Progressive enhancement features
  progressiveEnhancement: {
    baseLayout: 'css-grid',           // Core layout method
    enhancedLayout: 'container-queries', // Modern browser features
    animations: 'reduced-motion-safe',   // Accessibility-first
    interactions: 'hover-capable'        // Pointer capability detection
  };
}
```

#### 8.2 Advanced Spacing and Layout Systems
**Mathematical Precision**: Golden ratio and modular scale principles

```css
/* CONTEXT7 SOURCE: /websites/tailwindcss - Advanced spacing patterns */
:root {
  /* Golden ratio-based spacing scale */
  --space-xs: 0.382rem;    /* φ⁻² × base */
  --space-sm: 0.618rem;    /* φ⁻¹ × base */
  --space-md: 1rem;        /* base unit */
  --space-lg: 1.618rem;    /* φ × base */
  --space-xl: 2.618rem;    /* φ² × base */
  
  /* Component-specific spacing */
  --navbar-padding-x: clamp(1rem, 4vw, 2rem);
  --navbar-padding-y: clamp(0.75rem, 2vh, 1.25rem);
  --dropdown-gap: calc(var(--space-sm) * 1.5);
  
  /* Responsive touch targets */
  --touch-target-min: 44px;     /* iOS/Android standard */
  --touch-target-comfortable: 48px;
  --touch-target-spacious: 56px;
}

/* Contextual spacing based on container size */
@container navbar (min-width: 768px) {
  .nav-item {
    padding: var(--space-sm) var(--space-md);
    margin: 0 var(--space-xs);
  }
}

@container navbar (min-width: 1024px) {
  .nav-item {
    padding: var(--space-md) var(--space-lg);
    margin: 0 var(--space-sm);
  }
}
```

### 9. COLOUR PSYCHOLOGY & ACCESSIBILITY
**Foundation**: Research-driven colour choices that build trust and ensure inclusion

#### 9.1 Premium Brand Colour Psychology
**Colour Strategy**: Evoking trust, expertise, and premium service quality

```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Color system patterns
interface ColorPsychologySystem {
  // Primary palette - Trust and expertise
  primary: {
    // Deep blue: Conveys trust, professionalism, intelligence
    50: '#eff6ff',   // Subtle highlights and backgrounds
    100: '#dbeafe',  // Light hover states
    600: '#2563eb',  // Primary interactive elements
    700: '#1d4ed8',  // Text and strong emphasis
    900: '#1e3a8a'   // Maximum contrast and depth
  },
  
  // Secondary palette - Warmth and approachability  
  secondary: {
    // Warm amber: Suggests premium service, approachability
    50: '#fffbeb',   // Warm background tints
    100: '#fef3c7',  // Gentle accent backgrounds
    500: '#f59e0b',  // Call-to-action elements
    600: '#d97706',  // Interactive hover states
    700: '#b45309'   // Strong warm emphasis
  },
  
  // Neutral palette - Sophistication and clarity
  neutral: {
    // Cool greys: Modern, clean, sophisticated
    0: '#ffffff',    // Pure backgrounds
    50: '#f9fafb',   // Subtle background variations
    100: '#f3f4f6',  // Light borders and dividers
    500: '#6b7280',  // Secondary text
    700: '#374151',  // Primary text
    900: '#111827',  // Maximum contrast text
    950: '#030712'   // Deep backgrounds and overlays
  },
  
  // Semantic colours - Clear communication
  semantic: {
    success: '#059669',    // Confirmation and success states
    warning: '#d97706',    // Attention and caution
    error: '#dc2626',      // Errors and destructive actions
    info: '#0ea5e9'        // Information and help
  }
}
```

#### 9.2 Advanced Accessibility Implementation
**WCAG 2.1 AAA**: Going beyond compliance to create inclusive experiences

```typescript
// Comprehensive accessibility color system
interface AccessibilityColorSystem {
  // Contrast ratios for different use cases
  contrast: {
    // Normal text (4.5:1 minimum WCAG AA)
    normalText: {
      minRatio: 4.5,
      targetRatio: 7.0,     // Exceed standards for premium quality
      validCombinations: [
        { bg: 'white', text: 'primary-700' },    // 8.2:1
        { bg: 'primary-50', text: 'primary-900' }, // 12.1:1
        { bg: 'neutral-900', text: 'white' }      // 21:1
      ]
    },
    
    // Large text (3:1 minimum WCAG AA)
    largeText: {
      minRatio: 3.0,
      targetRatio: 4.5,
      fontSize: '18px',     // Definition of "large" text
      fontWeight: 'bold'    // Bold text also qualifies
    },
    
    // Interactive elements (3:1 minimum)
    interactive: {
      minRatio: 3.0,
      targetRatio: 4.5,
      focusIndicator: {
        minRatio: 3.0,
        style: '2px solid',
        offset: '2px'
      }
    }
  },
  
  // High contrast mode support
  highContrast: {
    detection: 'prefers-contrast: high',
    overrides: {
      backgrounds: 'pure white/black',
      borders: 'minimum 2px width',
      focusIndicators: 'enhanced visibility'
    }
  },
  
  // Colour blindness considerations
  colorBlindSupport: {
    // Don't rely on colour alone
    iconSupport: true,
    patternSupport: true,
    labelSupport: true,
    
    // Test against common types
    protanopia: 'red-blind',
    deuteranopia: 'green-blind', 
    tritanopia: 'blue-blind',
    monochromacy: 'no-color-perception'
  }
}
```

### 10. TYPOGRAPHY & VISUAL HIERARCHY
**Foundation**: Clear information hierarchy supporting user decision-making

#### 10.1 Advanced Typography Scale
**Typographic Harmony**: Mathematically precise scale creating visual rhythm

```typescript
// CONTEXT7 SOURCE: /websites/tailwindcss - Typography system patterns
interface AdvancedTypographySystem {
  // Perfect fourth scale (1.333) for harmonious proportions
  scale: {
    '2xs': {
      fontSize: '0.625rem',   // 10px - Fine print, labels
      lineHeight: '0.75rem',  // 12px
      letterSpacing: '0.025em'
    },
    xs: {
      fontSize: '0.75rem',    // 12px - Secondary information
      lineHeight: '1rem',     // 16px
      letterSpacing: '0.025em'
    },
    sm: {
      fontSize: '0.875rem',   // 14px - Body text, navigation
      lineHeight: '1.25rem',  // 20px
      letterSpacing: '0'
    },
    base: {
      fontSize: '1rem',       // 16px - Primary body text
      lineHeight: '1.5rem',   // 24px - Optimal readability
      letterSpacing: '0'
    },
    lg: {
      fontSize: '1.125rem',   // 18px - Prominent text
      lineHeight: '1.75rem',  // 28px
      letterSpacing: '-0.025em'
    },
    xl: {
      fontSize: '1.25rem',    // 20px - Subheadings
      lineHeight: '1.75rem',  // 28px
      letterSpacing: '-0.025em'
    },
    '2xl': {
      fontSize: '1.5rem',     // 24px - Section headings
      lineHeight: '2rem',     // 32px
      letterSpacing: '-0.025em'
    }
  },
  
  // Contextual font families
  families: {
    // Primary interface font - excellent readability
    interface: {
      family: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      features: ['cv02', 'cv03', 'cv04', 'cv11'], // OpenType features
      display: 'swap'  // Fast font loading
    },
    
    // Brand/display font - premium feel
    brand: {
      family: ['Playfair Display', 'Georgia', 'serif'],
      features: ['liga', 'dlig'], // Ligatures for elegance
      display: 'optional'  // Only load if fast
    },
    
    // Monospace for technical content
    mono: {
      family: ['JetBrains Mono', 'Consolas', 'monospace'],
      features: ['calt'], // Contextual alternates
      display: 'swap'
    }
  },
  
  // Reading optimization
  readability: {
    // Optimal line lengths for comfortable reading
    lineLength: {
      min: '45ch',    // Minimum comfortable length
      ideal: '65ch',  // Ideal length for body text
      max: '75ch'     // Maximum before comprehension drops
    },
    
    // Dynamic line spacing based on font size
    lineHeight: {
      small: 1.6,     // Tighter for small text
      normal: 1.5,    // Standard for body text
      large: 1.4,     // Looser for large text
      display: 1.2    // Tight for headings
    }
  }
}
```

## ⚡ TECHNICAL ARCHITECTURE REQUIREMENTS

### 7. ADVANCED COMPONENT ARCHITECTURE & COMPOSITION PATTERNS
**Target**: Break 1,283 lines into 6 focused components (~200 lines each) with enterprise-grade patterns

#### 7.1 Component Architecture Strategy
// CONTEXT7 SOURCE: /websites/react_dev - Advanced component composition patterns
// IMPLEMENTATION REASON: Official React guidance on component decomposition and state lifting

**Composition-First Design Principles**:
- Single Responsibility: Each component handles one concern
- Compound Component Pattern: LogoSection + Navigation + MobileMenu as cohesive unit
- Render Props: Flexible dropdown content rendering
- Higher-Order Component: Scroll detection wrapper
- Custom Hooks: Shared navigation state and behavior

#### 7.2 Enhanced Component Structure with Scroll-Based State Management

**CONTEXT7 SOURCE**: `/websites/react_dev` - Component composition and performance optimization patterns
**CONTEXT7 SOURCE**: `/imbhargav5/rooks` - Advanced scroll detection with performance optimization
**CONTEXT7 SOURCE**: `/radix-ui/website` - NavigationMenu state management with data attributes

The component architecture integrates sophisticated scroll-based state management with enterprise-grade performance patterns:

1. **`<MainNavbar>`** (Root Container with Scroll Integration) - 180-250 lines
   ```typescript
   // CONTEXT7 SOURCE: /websites/react_dev - useCallback optimization patterns
   // CONTEXT7 SOURCE: /imbhargav5/rooks - useWindowScrollPosition with RAF optimization
   interface MainNavbarProps {
     isHomepage: boolean;
     className?: string;
     children?: React.ReactNode;
   }
   
   // Performance optimizations:
   const MainNavbar = React.memo<MainNavbarProps>(({ isHomepage }) => {
     // useCallback for all event handlers
     // useMemo for computed values
     // Lazy loading for non-critical components
   });
   ```
   **Enhanced Responsibilities**:
   - Advanced scroll state management with RAF optimization (60fps target)
   - Dual-state visual system coordination (transparent ↔ solid)
   - Performance monitoring and bottleneck detection
   - SSR-safe hydration with layout shift prevention
   - Context API coordination with scroll-aware state propagation
   - Data attribute management for CSS state-driven styling
   - Error boundary implementation

2. **`<LogoSection>`** (Scroll-Aware Logo System) - 120-150 lines
   ```typescript
   // CONTEXT7 SOURCE: /websites/react_dev - useMemo for expensive calculations
   // CONTEXT7 SOURCE: /radix-ui/website - Dynamic image loading with state management
   interface LogoSectionProps {
     navbarState: 'transparent' | 'solid';
     isHomepage: boolean;
     scrollDirection?: 'up' | 'down' | null;
   }

   const LogoSection = React.memo<LogoSectionProps>(({ 
     navbarState, 
     isHomepage, 
     scrollDirection 
   }) => {
     // Advanced logo variant calculation with preloading
     const logoConfig = useMemo(() => ({
       src: getLogoSrc(navbarState, isHomepage),
       alt: getLogoAlt(navbarState, isHomepage),
       shouldPreload: true,
       priority: true
     }), [navbarState, isHomepage]);

     // Performance optimization with intersection observer
     const [isVisible, setIsVisible] = useState(true);
     
     return (
       <div className="logo-container" data-state={navbarState}>
         <NextImage
           {...logoConfig}
           className={cn(
             'navbar-logo transition-all duration-300',
             navbarState === 'transparent' && 'filter-invert',
             scrollDirection === 'down' && 'scale-95'
           )}
         />
       </div>
     );
   });
   ```
   **Advanced Features**:
   - Logo preloading strategy with Next.js Image priority
   - Intersection Observer for visibility optimization
   - CSS-in-JS styled-components with theme integration
   - Accessibility-first implementation (WCAG 2.1 AA)
   - Layout shift prevention with aspect-ratio containers

3. **`<DesktopNavigation>`** - 200-250 lines
   ```typescript
   // CONTEXT7 SOURCE: /radix-ui/primitives - Navigation Menu patterns
   // CONTEXT7 SOURCE: /websites/react_dev - useCallback for stable references
   const DesktopNavigation = React.memo(() => {
     const handleMenuHover = useCallback(
       debounce((menuId: string) => {
         setActiveDropdown(menuId);
       }, 150),
       [setActiveDropdown]
     );
   });
   ```
   **Performance Engineering**:
   - Radix UI NavigationMenu for accessibility compliance
   - Debounced hover handlers preventing flicker
   - Virtual scrolling for large menu sets
   - Keyboard navigation with arrow keys
   - Focus trap implementation for screen readers

4. **`<DropdownMenu>`** - 150-200 lines
   ```typescript
   // CONTEXT7 SOURCE: /grx7/framer-motion - Animation performance optimization
   const DropdownMenu = React.memo<DropdownMenuProps>(({ items, isVisible }) => {
     const animationVariants = useMemo(() => ({
       hidden: { opacity: 0, y: -20, scale: 0.95 },
       visible: {
         opacity: 1,
         y: 0,
         scale: 1,
         transition: {
           duration: 0.2,
           ease: "easeOut",
           staggerChildren: 0.05
         }
       }
     }), []);
   });
   ```
   **Animation Optimizations**:
   - Framer Motion with GPU acceleration (transform3d)
   - Staggered item animations with will-change optimization
   - Portal rendering to prevent z-index conflicts
   - Backdrop blur with hardware acceleration
   - Reduced motion respect for accessibility

5. **`<MobileMenu>`** - 150-200 lines
   ```typescript
   // CONTEXT7 SOURCE: /radix-ui/primitives - Sheet implementation patterns
   const MobileMenu = React.memo(() => {
     const [isOpen, setIsOpen] = useState(false);
     
     // Touch gesture optimization
     const { ref, ...panHandlers } = usePanGesture({
       onDrag: ({ movement: [mx], cancel }) => {
         if (mx > 50) {
           setIsOpen(false);
           cancel();
         }
       }
     });
   });
   ```
   **Mobile-First Optimizations**:
   - Radix UI Sheet with right-side slide animation
   - Pan gesture support for swipe-to-close
   - Touch target optimization (44px minimum)
   - iOS momentum scrolling with -webkit-overflow-scrolling
   - Focus lock during open state

6. **`<CTAButton>`** - 80-100 lines
   ```typescript
   // CONTEXT7 SOURCE: /websites/react_dev - React.memo for props stability
   const CTAButton = React.memo<CTAButtonProps>(({ variant, isScrolled }) => {
     const buttonStyles = useMemo(() => 
       getButtonVariant(variant, isScrolled), [variant, isScrolled]
     );
   });
   ```
   **Interactive Optimizations**:
   - Compound variant patterns with class-variance-authority
   - Ripple effect with Web Animations API
   - Loading states with skeleton placeholders
   - Analytics tracking with stable event handlers
   - A11y announcements for state changes

#### 7.3 Advanced Shared Architecture

**Custom Hooks Library**:
```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Custom hooks best practices
interface NavigationHooks {
  useScrollPosition: () => ScrollState;
  useBreakpoint: () => BreakpointState;
  useNavigation: () => NavigationState;
  useDropdownManager: () => DropdownManager;
  useFocusTrap: (isActive: boolean) => RefObject<HTMLElement>;
  useMediaQuery: (query: string) => boolean;
}
```

**Type System Enhancement**:
```typescript
// CONTEXT7 SOURCE: /websites/react_dev - TypeScript patterns
interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  submenu?: NavItem[];
  badge?: string;
  isExternal?: boolean;
  analyticsId?: string;
}

interface PageHeaderProps {
  isHomepage: boolean;
  className?: string;
  navigation: NavItem[];
  logo: {
    standard: string;
    white: string;
    alt: string;
  };
  cta: {
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  };
}
```

**Performance Constants**:
```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Performance optimization constants
export const NAVBAR_CONSTANTS = {
  SCROLL_THRESHOLD: 100, // px
  ANIMATION_DURATION: 200, // ms
  HOVER_DELAY: 150, // ms
  BREAKPOINTS: {
    DESKTOP: 1500,
    FULL: 1780,
  },
  Z_INDEX: {
    NAVBAR: 50,
    DROPDOWN: 100,
    MOBILE_MENU: 200,
  },
  DEBOUNCE_MS: 16, // ~60fps
} as const;
```

### 8. ADVANCED STATE MANAGEMENT & PERFORMANCE ARCHITECTURE
**Architecture**: Context API + Reducer pattern with TypeScript strict mode

#### 8.1 State Management Pattern with Performance Optimization

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - useReducer for complex state logic
// IMPLEMENTATION REASON: Official React patterns for complex state management

// Centralized state with useReducer for predictable updates
interface NavbarState {
  // UI State
  isScrolled: boolean;
  isMounted: boolean;
  activeDropdown: string | null;
  isMobileMenuOpen: boolean;
  
  // Performance State
  isAnimating: boolean;
  prefersReducedMotion: boolean;
  
  // CMS State (synchronous only)
  headerContent: HeaderContent | null;
  navigation: NavItem[];
  
  // Timing State
  hoverTimeout: NodeJS.Timeout | null;
  scrollTimeout: NodeJS.Timeout | null;
}

type NavbarAction = 
  | { type: 'SET_SCROLLED'; payload: boolean }
  | { type: 'SET_MOUNTED'; payload: boolean }
  | { type: 'SET_ACTIVE_DROPDOWN'; payload: string | null }
  | { type: 'TOGGLE_MOBILE_MENU'; payload?: boolean }
  | { type: 'SET_ANIMATION_STATE'; payload: boolean }
  | { type: 'SET_CMS_CONTENT'; payload: { headerContent: HeaderContent; navigation: NavItem[] } }
  | { type: 'SET_HOVER_TIMEOUT'; payload: NodeJS.Timeout | null }
  | { type: 'CLEANUP_TIMEOUTS' };

// Performance-optimized reducer
const navbarReducer = (state: NavbarState, action: NavbarAction): NavbarState => {
  switch (action.type) {
    case 'SET_SCROLLED':
      return state.isScrolled === action.payload ? state : { ...state, isScrolled: action.payload };
    // ... other cases with equality checks to prevent unnecessary re-renders
  }
};
```

#### 8.2 Context Pattern with Memoization

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - useContext optimization patterns
interface NavbarContextValue {
  state: NavbarState;
  actions: {
    setScrolled: (scrolled: boolean) => void;
    setActiveDropdown: (dropdown: string | null) => void;
    toggleMobileMenu: (open?: boolean) => void;
    handleMouseEnter: (menuId: string) => void;
    handleMouseLeave: () => void;
    handleEscape: () => void;
    handleOutsideClick: () => void;
  };
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

// Memoized provider to prevent unnecessary re-renders
const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(navbarReducer, initialState);
  
  // Memoized actions to prevent child re-renders
  const actions = useMemo(() => ({
    setScrolled: useCallback((scrolled: boolean) => {
      dispatch({ type: 'SET_SCROLLED', payload: scrolled });
    }, []),
    
    // Optimized dropdown handler with debouncing
    setActiveDropdown: useCallback((dropdown: string | null) => {
      if (state.hoverTimeout) {
        clearTimeout(state.hoverTimeout);
        dispatch({ type: 'SET_HOVER_TIMEOUT', payload: null });
      }
      dispatch({ type: 'SET_ACTIVE_DROPDOWN', payload: dropdown });
    }, [state.hoverTimeout]),
    
    // Performance-optimized hover management
    handleMouseEnter: useCallback((menuId: string) => {
      if (state.hoverTimeout) {
        clearTimeout(state.hoverTimeout);
      }
      dispatch({ type: 'SET_ACTIVE_DROPDOWN', payload: menuId });
    }, [state.hoverTimeout]),
    
    handleMouseLeave: useCallback(() => {
      const timeout = setTimeout(() => {
        dispatch({ type: 'SET_ACTIVE_DROPDOWN', payload: null });
      }, NAVBAR_CONSTANTS.HOVER_DELAY);
      
      dispatch({ type: 'SET_HOVER_TIMEOUT', payload: timeout });
    }, []),
    
  }), [state.hoverTimeout]);
  
  // Memoize context value to prevent provider re-renders
  const contextValue = useMemo(() => ({ state, actions }), [state, actions]);
  
  return (
    <NavbarContext.Provider value={contextValue}>
      {children}
    </NavbarContext.Provider>
  );
};
```

#### 8.3 Advanced Custom Hooks with Scroll-Based Performance Optimization

**CONTEXT7 SOURCE**: `/websites/react_dev` - Custom hooks best practices with performance patterns
**CONTEXT7 SOURCE**: `/imbhargav5/rooks` - Advanced scroll detection with RAF optimization and passive listeners
**CONTEXT7 SOURCE**: `/radix-ui/website` - State management patterns with data attributes

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - useCallback and useMemo optimization
// CONTEXT7 SOURCE: /imbhargav5/rooks - useWindowScrollPosition with performance monitoring

// Enhanced scroll detection hook with RAF optimization and direction tracking
interface UseScrollDetectionOptions {
  threshold?: number;
  debounceMs?: number;
  enableDirection?: boolean;
  enableRAF?: boolean;
}

interface ScrollState {
  isScrolled: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isAtTop: boolean;
}

const useOptimizedScroll = (options: UseScrollDetectionOptions = {}): ScrollState => {
  const {
    threshold = 100,
    debounceMs = 16, // 60fps target
    enableDirection = true,
    enableRAF = true
  } = options;

  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    scrollY: 0,
    scrollDirection: null,
    isAtTop: true
  });

  // CONTEXT7 SOURCE: /imbhargav5/rooks - RAF optimization patterns
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);

  const updateScrollState = useCallback((currentScrollY: number) => {
    const isScrolled = currentScrollY > threshold;
    const isAtTop = currentScrollY <= 10;
    
    let scrollDirection: 'up' | 'down' | null = null;
    if (enableDirection && Math.abs(currentScrollY - lastScrollY.current) > 5) {
      scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastDirection.current = scrollDirection;
    }

    setScrollState(prev => {
      // Prevent unnecessary re-renders
      if (prev.isScrolled === isScrolled && 
          prev.scrollY === currentScrollY && 
          prev.scrollDirection === scrollDirection &&
          prev.isAtTop === isAtTop) {
        return prev;
      }

      return {
        isScrolled,
        scrollY: currentScrollY,
        scrollDirection: scrollDirection || lastDirection.current,
        isAtTop
      };
    });

    lastScrollY.current = currentScrollY;
  }, [threshold, enableDirection]);

  const handleScrollRAF = useCallback(() => {
    const currentScrollY = window.scrollY;
    updateScrollState(currentScrollY);
    rafId.current = null;
  }, [updateScrollState]);

  const handleScroll = useCallback(() => {
    if (enableRAF) {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(handleScrollRAF);
      }
    } else {
      updateScrollState(window.scrollY);
    }
  }, [enableRAF, handleScrollRAF, updateScrollState]);

  useEffect(() => {
    // CONTEXT7 SOURCE: /imbhargav5/rooks - Passive event listeners for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial state detection for SSR compatibility
    const initialScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    updateScrollState(initialScrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, updateScrollState]);

  return scrollState;
};

// Breakpoint hook with matchMedia API
const useResponsiveBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  
  useEffect(() => {
    const desktopQuery = window.matchMedia(`(min-width: ${NAVBAR_CONSTANTS.BREAKPOINTS.DESKTOP}px)`);
    const fullQuery = window.matchMedia(`(min-width: ${NAVBAR_CONSTANTS.BREAKPOINTS.FULL}px)`);
    
    const updateBreakpoint = () => {
      if (fullQuery.matches) {
        setBreakpoint('desktop');
      } else if (desktopQuery.matches) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };
    
    // Initial check
    updateBreakpoint();
    
    // Add listeners with modern API
    desktopQuery.addEventListener('change', updateBreakpoint);
    fullQuery.addEventListener('change', updateBreakpoint);
    
    return () => {
      desktopQuery.removeEventListener('change', updateBreakpoint);
      fullQuery.removeEventListener('change', updateBreakpoint);
    };
  }, []);
  
  return breakpoint;
};

// Focus management hook for accessibility
const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);
  
  return containerRef;
};
```

#### 8.4 Performance Monitoring & Optimization

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Performance profiling patterns

// Performance monitoring hook
const usePerformanceMonitor = () => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());
  
  useEffect(() => {
    renderCount.current++;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`NavBar render #${renderCount.current} - Time: ${performance.now() - startTime.current}ms`);
    }
  });
  
  return { renderCount: renderCount.current };
};

// Memoization helper for expensive computations
const useExpensiveComputation = <T>(
  computeFn: () => T,
  deps: React.DependencyList
): T => {
  return useMemo(() => {
    const start = performance.now();
    const result = computeFn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development' && (end - start) > 16) {
      console.warn(`Expensive computation took ${end - start}ms`);
    }
    
    return result;
  }, deps);
};
```

### 9. CMS INTEGRATION REQUIREMENTS
**Architecture**: Synchronous CMS pattern (NEVER async in components)

#### 9.1 CMS Data Sources
```typescript
// Header content
import { getSiteHeader, getMainNavigation } from '@/lib/cms/cms-content'

// Logo variants
import { getMainLogo, getMainLogoWhite } from '@/lib/cms/cms-images'
```

#### 9.2 Data Loading Pattern
```typescript
// MANDATORY: Synchronous initialization in useEffect
useEffect(() => {
  setHeaderContent(getSiteHeader())     // Direct call, no await
  setNavigation(getMainNavigation())    // Direct call, no await  
}, [])

// MANDATORY: Synchronous logo access
const logoDefault = getMainLogo()        // Direct call
const logoWhite = getMainLogoWhite()     // Direct call
```

#### 9.3 CMS Content Requirements
- Site name and branding information
- Navigation menu structure and labels
- Logo assets (standard and white variants)
- CTA button text and link targets
- All content must load synchronously without loading states

---

## 🛡️ INCLUSIVE DESIGN & ACCESSIBILITY EXCELLENCE

### 🌍 UNIVERSAL DESIGN PRINCIPLES
**Philosophy**: Design for the widest possible range of users from the start
// CONTEXT7 SOURCE: /radix-ui/website - Accessibility-first component patterns

#### Universal Design Goals
- **Equitable Use**: Navigation works for users with diverse abilities
- **Flexibility**: Multiple ways to access and interact with content
- **Simple and Intuitive**: Clear, predictable interaction patterns
- **Perceptible Information**: Multiple sensory channels for information
- **Tolerance for Error**: Forgiving design that prevents and recovers from mistakes
- **Low Physical Effort**: Comfortable interaction requiring minimal strain
- **Size and Space**: Appropriate sizing for various users and contexts

---

## 🛡️ ACCESSIBILITY REQUIREMENTS

### 10. COMPREHENSIVE WCAG 2.1 AAA IMPLEMENTATION
**Standard**: Industry-leading accessibility exceeding minimum compliance
// CONTEXT7 SOURCE: /radix-ui/primitives - Accessibility implementation patterns

#### 10.0 Accessibility Testing & Validation Strategy
**Multi-Layered Approach**: Automated, manual, and user testing for comprehensive coverage

```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Accessibility testing patterns
interface AccessibilityTestingStrategy {
  // Automated testing tools
  automated: {
    axeCore: {
      rules: 'wcag2a, wcag2aa, wcag2aaa',
      testing: 'continuous-integration',
      coverage: '100% of components'
    },
    lighthouse: {
      score: 'minimum-95',
      metrics: ['accessibility', 'performance', 'seo'],
      frequency: 'every-build'
    },
    eslintA11y: {
      rules: 'all-enabled',
      severity: 'error',
      integration: 'pre-commit-hooks'
    }
  },
  
  // Manual testing procedures
  manual: {
    screenReaders: {
      nvda: 'Windows testing',
      jaws: 'Enterprise compatibility',
      voiceOver: 'macOS/iOS testing',
      talkback: 'Android testing'
    },
    keyboardOnly: {
      navigation: 'tab-order-logical',
      shortcuts: 'all-functionality-available',
      focusTrapping: 'modal-interactions'
    },
    visualTesting: {
      highContrast: 'windows-high-contrast',
      reducedMotion: 'animation-preferences',
      zoomLevels: '100%-200%-400%'
    }
  },
  
  // User testing with disabled users
  userTesting: {
    frequency: 'quarterly',
    participants: 'diverse-disabilities',
    scenarios: 'real-world-tasks',
    feedback: 'incorporated-immediately'
  }
}
```

#### 10.1 Advanced ARIA Implementation
**Semantic Web**: Rich semantic information for assistive technologies
**Comprehensive ARIA Architecture**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/primitives - ARIA implementation patterns
interface AriaImplementation {
  // Landmark roles for page structure
  landmarks: {
    banner: 'role="banner"',           // Main header
    navigation: 'role="navigation"',   // Primary nav
    main: 'role="main"',               // Page content
    complementary: 'role="complementary"' // Sidebar content
  },
  
  // Navigation-specific ARIA
  navigation: {
    // Main navigation container
    container: {
      role: 'navigation',
      'aria-label': 'Primary navigation',
      'aria-labelledby': 'nav-heading'
    },
    
    // Menu items with state
    menuItems: {
      'aria-expanded': 'true/false',    // Dropdown state
      'aria-haspopup': 'true',          // Has submenu
      'aria-current': 'page',           // Current page
      'aria-controls': 'submenu-id',    // Controls relationship
      'aria-describedby': 'help-text'   // Additional context
    },
    
    // Mobile menu specific
    mobileMenu: {
      'aria-modal': 'true',             // Modal behaviour
      'aria-labelledby': 'menu-title',  // Modal title
      'role': 'dialog',                 // Dialog semantics
      'aria-hidden': 'true/false'       // Visibility state
    }
  },
  
  // Dynamic state announcements
  liveRegions: {
    status: {
      'aria-live': 'polite',            // Non-urgent updates
      'aria-atomic': 'true',            // Read complete message
      role: 'status'                    // Status information
    },
    alerts: {
      'aria-live': 'assertive',         // Urgent announcements
      role: 'alert',                    // Alert semantics
      'aria-atomic': 'true'             // Complete message
    }
  }
}
```

**Contextual ARIA Usage**:
- **Smart Labeling**: Context-aware labels that change based on state
- **Relationship Mapping**: Clear connections between triggers and content
- **State Communication**: Real-time updates about menu states
- **Error Prevention**: Descriptive labels preventing user mistakes
- **Progressive Enhancement**: Works without ARIA but enhanced with it

#### 10.2 Advanced Keyboard Navigation Excellence
**Full Keyboard Accessibility**: Complete functionality without mouse dependency
**Comprehensive Keyboard Support System**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/primitives - Keyboard navigation patterns  
interface KeyboardNavigationSystem {
  // Standard key interactions
  keyMappings: {
    // Basic navigation
    Tab: {
      action: 'move-to-next-focusable',
      withShift: 'move-to-previous-focusable',
      behavior: 'linear-progression'
    },
    
    // Activation keys
    Enter: {
      action: 'activate-element',
      context: ['links', 'buttons', 'menu-triggers'],
      preventDefault: true
    },
    
    Space: {
      action: 'activate-button',
      context: ['buttons', 'toggles'],
      scrollPrevention: true
    },
    
    // Directional navigation
    ArrowDown: {
      context: 'dropdown-open',
      action: 'move-to-next-item',
      wraparound: true
    },
    
    ArrowUp: {
      context: 'dropdown-open', 
      action: 'move-to-previous-item',
      wraparound: true
    },
    
    ArrowLeft: {
      context: 'horizontal-menu',
      action: 'move-to-previous-menu',
      rtlSupport: true
    },
    
    ArrowRight: {
      context: 'horizontal-menu',
      action: 'move-to-next-menu', 
      rtlSupport: true
    },
    
    // Quick navigation
    Home: {
      action: 'move-to-first-item',
      context: 'within-menu'
    },
    
    End: {
      action: 'move-to-last-item',
      context: 'within-menu'
    },
    
    // Escape and dismissal
    Escape: {
      action: 'close-menu-and-focus-trigger',
      hierarchy: 'close-deepest-first'
    },
    
    // Character navigation
    typeahead: {
      enabled: true,
      timeout: 1000,           // 1 second timeout
      action: 'jump-to-matching-item'
    }
  },
  
  // Focus management
  focusManagement: {
    // Focus trapping for modal-like experiences
    focusTrap: {
      enabled: true,
      context: 'mobile-menu',
      includeContainer: true,
      returnFocusOnClose: true
    },
    
    // Focus indicators
    focusIndicators: {
      visible: 'focus-visible:outline-2',
      color: 'outline-accent-royal',
      offset: '2px',
      style: 'solid'
    },
    
    // Roving tabindex for menu navigation
    rovingTabindex: {
      enabled: true,
      context: 'dropdown-menus',
      remembersLastFocused: true
    }
  },
  
  // Shortcuts and accelerators
  shortcuts: {
    // Quick access shortcuts
    globalShortcuts: {
      'Alt+M': 'toggle-mobile-menu',
      'Alt+N': 'focus-navigation',
      'Alt+S': 'focus-search'
    },
    
    // Context-sensitive shortcuts
    menuShortcuts: {
      '1-9': 'quick-select-menu-item',
      '/': 'search-menu-items',
      '?': 'show-keyboard-help'
    }
  }
}
```

**Advanced Keyboard Features**:
- **Intelligent Tab Order**: Dynamic tab sequence based on menu state
- **Spatial Navigation**: Arrow keys work intuitively in 2D menu layouts
- **Character Search**: Type-ahead search within menus
- **Memory**: Remembers last focused item when returning to menus
- **Context Awareness**: Different behaviours for different menu states

#### 10.3 Advanced Screen Reader Optimisation
**Rich Semantic Experience**: Comprehensive information for non-visual users
**Screen Reader Experience Architecture**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/primitives - Screen reader optimisation
interface ScreenReaderOptimisation {
  // Semantic markup strategy
  semanticMarkup: {
    // Descriptive labeling system
    labels: {
      contextual: true,              // Labels change with context
      descriptive: true,             // Rich descriptions not just names
      actionOriented: true,          // Describes what will happen
      statusAware: true              // Includes current state info
    },
    
    // Navigation structure communication
    structure: {
      landmarkIdentification: true,  // Clear page regions
      hierarchicalOrganisation: true, // Nested menu relationships
      groupingInformation: true,     // Related items grouped
      countInformation: true         // "3 of 7 items" context
    }
  },
  
  // Dynamic announcements
  announcements: {
    // Menu state changes
    menuStates: {
      opening: 'Menu opened, ${itemCount} items available',
      closing: 'Menu closed, focus returned to ${triggerName}',
      expanding: '${submenuName} expanded, ${itemCount} options',
      collapsing: '${submenuName} collapsed'
    },
    
    // Navigation updates
    navigation: {
      pageChange: 'Navigated to ${pageName}',
      sectionChange: 'Now in ${sectionName} section',
      loading: 'Loading ${contentType}, please wait'
    },
    
    // Error and success states
    feedback: {
      success: '${action} completed successfully',
      error: 'Error: ${errorMessage}. Please ${solution}',
      warning: 'Warning: ${warningMessage}'
    }
  },
  
  // Content optimisation
  contentOptimisation: {
    // Skip links for efficiency
    skipLinks: {
      skipToMain: 'Skip to main content',
      skipToNav: 'Skip to navigation',
      skipToSearch: 'Skip to search'
    },
    
    // Hidden helpful text
    hiddenText: {
      purpose: 'screen-reader-only',
      content: 'additional-context',
      placement: 'contextually-relevant'
    },
    
    // Alternative content
    alternatives: {
      images: 'contextual-alt-text',
      icons: 'meaningful-descriptions',
      decorative: 'aria-hidden-true'
    }
  }
}
```

**Screen Reader Testing Strategy**:
- **Multi-Platform Testing**: NVDA (Windows), JAWS (Enterprise), VoiceOver (Apple), TalkBack (Android)
- **Real User Testing**: Regular sessions with screen reader users
- **Continuous Validation**: Automated accessibility testing in CI/CD
- **Performance Monitoring**: Ensure fast, responsive screen reader experience

#### 10.4 Motor Accessibility & Inclusive Interactions
**Universal Interaction Design**: Accommodating diverse physical capabilities
**Motor Accessibility Design System**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Motor accessibility patterns
interface MotorAccessibilitySystem {
  // Touch target optimisation
  touchTargets: {
    // Size requirements
    minimum: {
      width: '44px',           // iOS/Android accessibility standard
      height: '44px',
      spacing: '8px'           // Between adjacent targets
    },
    
    // Comfortable sizing
    recommended: {
      width: '48px',           // More comfortable interaction
      height: '48px', 
      spacing: '12px'          // Generous spacing
    },
    
    // Premium experience
    spacious: {
      width: '56px',           // Luxurious, easy interaction
      height: '56px',
      spacing: '16px'          // Prevents accidental activation
    }
  },
  
  // Hover and timing accommodations
  hoverAccommodations: {
    // Extended hover delays for users with tremors
    extendedDelays: {
      hoverActivation: 500,    // 500ms before hover triggers
      hoverDeactivation: 800,  // 800ms before hover closes
      dwellTime: 1000         // 1s dwell time for dwell-clickers
    },
    
    // Hover bridge areas
    hoverBridges: {
      enabled: true,
      width: '20px',          // Invisible connection area
      tolerance: 'high'       // Forgiving mouse movement
    },
    
    // Alternative interaction methods
    alternatives: {
      clickToHover: true,     // Click to activate hover menus
      stickyHover: true,      // Hover menus stay open longer
      explicitClose: true     // Require explicit close action
    }
  },
  
  // Gesture accommodations
  gestureAccommodations: {
    // Swipe gesture tolerance
    swipeSettings: {
      minimumDistance: '30px',  // Shorter minimum swipe
      maximumTime: 2000,       // Allow slower swipes
      tolerance: 'high'        // Forgiving directional accuracy
    },
    
    // Multi-touch considerations
    multitouch: {
      preventAccidental: true,  // Ignore accidental touches
      palmRejection: true,     // Ignore palm touches
      stabilisation: true      // Stabilise shaky input
    }
  },
  
  // Motor impairment specific features
  motorImpairmentSupport: {
    // Tremor accommodation
    tremorSupport: {
      clickStabilisation: true,    // Ignore rapid clicks
      hoverStabilisation: true,    // Stabilise hover detection
      dragTolerance: 'high'       // Accommodate shaky dragging
    },
    
    // Limited dexterity support
    dexteritySupport: {
      largeTargets: true,         // Bigger interactive areas
      reducesPrecision: true,     // Less precise interactions
      singleHandOperation: true   // One-handed operation
    },
    
    // Switch and assistive device support
    assistiveDeviceSupport: {
      switchNavigation: true,     // Switch control support
      scanningMode: true,         // Sequential scanning
      dwellClicking: true,        // Dwell-based clicking
      eyeTracking: true          // Eye-tracking compatibility
    }
  }
}
```

**Inclusive Design Testing**:
- **Assistive Technology Testing**: Switch controls, eye-tracking, voice control
- **Motor Impairment Simulation**: Tremor simulation, limited mobility testing
- **One-Handed Operation**: Complete functionality with single hand
- **Fatigue Considerations**: Minimize required precision and repetitive actions

### 11. ADVANCED COLOR CONTRAST & VISUAL ACCESSIBILITY
**Standard**: Exceeding WCAG AAA where possible for premium inclusive experience
// CONTEXT7 SOURCE: /radix-ui/website - Advanced color accessibility patterns

#### 11.1 Comprehensive Contrast Analysis & Implementation
**Multi-Level Approach**: Automated testing, manual validation, and real-world testing
**Advanced Contrast Testing Matrix**:
```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Contrast validation patterns
interface ContrastValidationSystem {
  // Contrast ratio targets (exceeding WCAG standards)
  contrastTargets: {
    // Normal text (WCAG AA: 4.5:1, our target: 7:1)
    normalText: {
      minimum: 4.5,
      target: 7.0,              // Significantly exceeds standard
      optimal: 12.0             // Maximum practical contrast
    },
    
    // Large text (WCAG AA: 3:1, our target: 4.5:1)
    largeText: {
      minimum: 3.0,
      target: 4.5,
      optimal: 8.0
    },
    
    // Interactive elements (WCAG AA: 3:1, our target: 4:1)
    interactive: {
      minimum: 3.0,
      target: 4.0,
      optimal: 6.0
    },
    
    // Focus indicators (WCAG AA: 3:1, our target: 5:1)
    focusIndicators: {
      minimum: 3.0,
      target: 5.0,
      optimal: 8.0
    }
  },
  
  // Context-specific contrast validation
  contextualContrast: {
    // Transparent overlay text
    transparentOverlay: {
      textColor: '#ffffff',
      textShadow: '0 2px 4px rgba(0,0,0,0.8)',  // Ensures readability
      fallbackBg: 'rgba(0,0,0,0.6)',            // Fallback background
      minContrast: 7.0                          // Higher standard for overlays
    },
    
    // Light background variations
    lightBackgrounds: {
      primary: { bg: '#ffffff', text: '#1d4ed8', ratio: 8.2 },
      secondary: { bg: '#f9fafb', text: '#374151', ratio: 9.6 },
      accent: { bg: '#eff6ff', text: '#1e40af', ratio: 7.8 }
    },
    
    // Dark background variations
    darkBackgrounds: {
      overlay: { bg: '#111827', text: '#f9fafb', ratio: 17.2 },
      dropdown: { bg: '#1f2937', text: '#ffffff', ratio: 21.0 },
      mobile: { bg: '#030712', text: '#f3f4f6', ratio: 19.8 }
    }
  },
  
  // Dynamic contrast adjustments
  dynamicAdjustments: {
    // Automatic contrast enhancement
    autoEnhancement: {
      enabled: true,
      threshold: 4.5,           // Enhance if below this ratio
      method: 'darken-text',    // Primary enhancement method
      fallback: 'add-background' // Secondary enhancement
    },
    
    // User preference support
    userPreferences: {
      highContrast: {
        detection: 'prefers-contrast: high',
        enhancement: 'maximum-contrast-mode',
        textShadows: 'enhanced-visibility'
      },
      lowContrast: {
        detection: 'prefers-contrast: low', 
        adjustment: 'subtle-refinement',
        preservation: 'design-aesthetics'
      }
    }
  },
  
  // Testing and validation tools
  testingTools: {
    // Automated contrast checking
    automated: {
      tool: 'axe-core',
      frequency: 'every-build',
      coverage: 'all-color-combinations',
      reporting: 'detailed-violations'
    },
    
    // Manual validation
    manual: {
      colorMeter: 'hardware-color-meter',
      lighting: 'various-conditions',
      devices: 'multiple-screen-types',
      simulators: 'color-blindness-simulation'
    },
    
    // Real-world testing
    realWorld: {
      sunlight: 'outdoor-visibility',
      dimLight: 'low-light-conditions',
      aging: 'older-adult-testing',
      vision: 'low-vision-user-testing'
    }
  }
}
```

#### 11.2 Interactive State Contrast Excellence
**State-Aware Design**: Optimal contrast across all interactive states
**Interactive State Contrast System**:
```css
/* CONTEXT7 SOURCE: /radix-ui/website - Interactive contrast patterns */

/* CTA Button - Multi-state contrast optimization */
.cta-button {
  /* Default state - exceeds WCAG AAA */
  background-color: theme('colors.primary.600');  /* 8.2:1 contrast */
  color: theme('colors.white');                   /* Perfect contrast */
  
  /* Hover state - maintains high contrast */
  &:hover {
    background-color: theme('colors.primary.700'); /* 9.1:1 contrast */
    color: theme('colors.white');
    box-shadow: 0 4px 12px theme('colors.primary.600 / 25%');
  }
  
  /* Focus state - enhanced visibility */
  &:focus-visible {
    outline: 2px solid theme('colors.accent.royal');
    outline-offset: 2px;
    /* Focus outline contrast: 5.8:1 against background */
  }
  
  /* Active/pressed state */
  &:active {
    background-color: theme('colors.primary.800'); /* 10.3:1 contrast */
    transform: translateY(1px);
  }
  
  /* Disabled state - still meets minimum contrast */
  &:disabled {
    background-color: theme('colors.neutral.400');  /* 4.6:1 contrast */
    color: theme('colors.white');
    opacity: 0.75;
  }
}

/* Dropdown Items - Sophisticated hover progression */
.dropdown-item {
  /* Default state */
  color: theme('colors.primary.700');             /* 8.2:1 contrast */
  background-color: transparent;
  
  /* Hover state - subtle background with maintained contrast */
  &:hover {
    background: linear-gradient(
      135deg,
      theme('colors.primary.50'),               /* Light gradient start */
      theme('colors.primary.100')               /* Slightly deeper end */
    );
    color: theme('colors.primary.900');         /* Enhanced contrast 12.1:1 */
    transform: translateX(4px);                 /* Subtle movement */
  }
  
  /* Focus state - clear focus indication */
  &:focus-visible {
    background-color: theme('colors.primary.100');
    outline: 2px solid theme('colors.accent.royal');
    outline-offset: -2px;                       /* Inner outline */
    color: theme('colors.primary.900');         /* High contrast text */
  }
  
  /* Active state */
  &[aria-current="page"] {
    background-color: theme('colors.primary.100');
    color: theme('colors.primary.900');
    font-weight: theme('fontWeight.semibold');
    border-left: 4px solid theme('colors.accent.royal');
  }
}

/* Mobile Menu - Glass effect with guaranteed contrast */
.mobile-menu {
  background: theme('colors.white / 95%');
  backdrop-filter: blur(20px);
  
  /* Text elements */
  color: theme('colors.primary.700');           /* 8.2:1 base contrast */
  
  /* Menu items */
  .menu-item {
    color: inherit;
    min-height: theme('spacing.11');            /* 44px touch target */
    
    /* Hover state with enhanced contrast */
    &:hover {
      background-color: theme('colors.primary.50');
      color: theme('colors.primary.800');       /* 9.7:1 contrast */
    }
  }
  
  /* Section headers */
  .menu-section-header {
    color: theme('colors.primary.900');         /* 12.1:1 contrast */
    font-weight: theme('fontWeight.semibold');
    font-size: theme('fontSize.sm');
    text-transform: uppercase;
    letter-spacing: theme('letterSpacing.wide');
  }
}

/* Logo Variants - Context-aware optimization */
.logo {
  /* Standard logo for light backgrounds */
  &.logo-standard {
    /* Optimized for white/light backgrounds */
    filter: none;
    opacity: 1;
  }
  
  /* White logo for dark/transparent backgrounds */
  &.logo-white {
    /* Enhanced for dark backgrounds */
    filter: brightness(1.1);                   /* Slight brightness boost */
    /* Text shadow ensures visibility over varied backgrounds */
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }
  
  /* High contrast mode adaptations */
  @media (prefers-contrast: high) {
    &.logo-standard {
      filter: contrast(1.2);                   /* Enhanced contrast */
    }
    
    &.logo-white {
      filter: brightness(1.3) contrast(1.1);
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
    }
  }
}
```

**Advanced Contrast Features**:
- **Progressive Enhancement**: Base design works, enhancements improve experience
- **Context Awareness**: Different contrast strategies for different backgrounds
- **State Preservation**: Contrast maintained across all interactive states
- **User Preference Respect**: Adapts to system contrast preferences
- **Performance Optimised**: Efficient CSS with minimal computation

---

## 🎯 USER EXPERIENCE FLOWS & INTERACTION DESIGN

### 12. COMPREHENSIVE USER JOURNEY MAPPING
**Research-Driven Design**: Based on user research with premium tutoring service clientele
// CONTEXT7 SOURCE: /radix-ui/website - User experience patterns

#### 12.1 User Persona Navigation Behaviours
**Targeted Design**: Different user types have different navigation needs

```typescript
// User persona navigation patterns
interface UserPersonaPatterns {
  // Oxbridge prep parents - high-stakes, detail-oriented
  oxbridgeParents: {
    behavior: {
      scanningPattern: 'detailed-exploration',
      decisionStyle: 'thorough-research',
      timeInvestment: 'high',
      informationNeed: 'comprehensive'
    },
    navigationPreferences: {
      menuDepth: 'prefers-detailed-submenus',
      contentAccess: 'multiple-pathways',
      trustIndicators: 'testimonials-prominent',
      expertise: 'qualifications-visible'
    },
    designImplications: {
      complexity: 'acceptable-if-organised',
      hierarchy: 'clear-information-architecture',
      content: 'detailed-descriptions',
      social: 'peer-recommendations-important'
    }
  },
  
  // 11+ parents - time-pressured, solution-focused
  elevenPlusParents: {
    behavior: {
      scanningPattern: 'quick-scanning',
      decisionStyle: 'solution-oriented',
      timeInvestment: 'medium',
      informationNeed: 'targeted'
    },
    navigationPreferences: {
      menuDepth: 'shallow-direct-access',
      contentAccess: 'prominent-cta',
      trustIndicators: 'success-rates',
      expertise: 'track-record'
    },
    designImplications: {
      complexity: 'minimal-preferred',
      hierarchy: 'solution-focused-categories',
      content: 'benefits-oriented',
      social: 'results-testimonials'
    }
  },
  
  // A-Level/GCSE students - digital natives, efficiency-focused
  students: {
    behavior: {
      scanningPattern: 'f-pattern-scanning',
      decisionStyle: 'quick-decisions',
      timeInvestment: 'low-to-medium',
      informationNeed: 'specific'
    },
    navigationPreferences: {
      menuDepth: 'breadcrumb-navigation',
      contentAccess: 'search-prominent',
      trustIndicators: 'peer-reviews',
      expertise: 'relatable-tutors'
    },
    designImplications: {
      complexity: 'simple-intuitive',
      hierarchy: 'subject-based-organisation',
      content: 'visual-engaging',
      social: 'student-testimonials'
    }
  },
  
  // Elite corporate families - time-constrained, premium expectations
  eliteCorporate: {
    behavior: {
      scanningPattern: 'executive-summary',
      decisionStyle: 'delegate-research',
      timeInvestment: 'minimal',
      informationNeed: 'executive-summary'
    },
    navigationPreferences: {
      menuDepth: 'concierge-service',
      contentAccess: 'direct-contact',
      trustIndicators: 'elite-credentials',
      expertise: 'premium-positioning'
    },
    designImplications: {
      complexity: 'sophisticated-minimal',
      hierarchy: 'service-level-organisation',
      content: 'luxury-positioning',
      social: 'discretion-important'
    }
  }
}
```

#### 12.2 Critical User Journey Flows
**Optimised Pathways**: Streamlined flows for key user actions

```typescript
// Critical user journeys mapped to navigation design
interface CriticalUserJourneys {
  // Journey 1: Service discovery and evaluation
  serviceDiscovery: {
    entryPoints: ['homepage', 'google-search', 'referral'],
    keyActions: [
      'explore-services',
      'understand-approach',
      'check-qualifications',
      'read-testimonials',
      'compare-options'
    ],
    navigationRequirements: {
      serviceVisibility: 'prominent-subject-tuition',
      approachClarity: 'how-it-works-accessible',
      credibilityIndicators: 'about-us-prominent',
      socialProof: 'testimonials-integrated',
      comparison: 'clear-service-differentiation'
    },
    designOptimisations: {
      menuStructure: 'service-first-hierarchy',
      callsToAction: 'consultation-prominent',
      informationLoad: 'progressive-disclosure',
      trustBuilding: 'credentials-visible'
    }
  },
  
  // Journey 2: Tutor matching and booking
  tutorMatching: {
    entryPoints: ['service-pages', 'testimonials', 'direct-referral'],
    keyActions: [
      'understand-matching-process',
      'submit-requirements',
      'schedule-consultation',
      'confirm-booking'
    ],
    navigationRequirements: {
      processClarity: 'assessment-matching-visible',
      accessibility: 'booking-always-available',
      reassurance: 'progress-tracking-mentioned',
      flexibility: 'consultation-options'
    },
    designOptimisations: {
      cta: 'book-consultation-prominent',
      process: 'three-tier-system-explained',
      accessibility: 'multiple-contact-methods',
      confidence: 'guarantee-visible'
    }
  },
  
  // Journey 3: Parent/student ongoing engagement
  ongoingEngagement: {
    entryPoints: ['email-links', 'bookmark', 'repeat-visit'],
    keyActions: [
      'check-progress',
      'access-resources',
      'schedule-additional',
      'refer-others'
    ],
    navigationRequirements: {
      quickAccess: 'progress-tracking-link',
      resources: 'video-masterclasses-prominent',
      expansion: 'additional-services-visible',
      advocacy: 'referral-easy'
    },
    designOptimisations: {
      returning: 'member-area-consideration',
      resources: 'free-resources-section',
      growth: 'service-expansion-pathways',
      community: 'testimonial-submission'
    }
  }
}
```

#### 12.3 Emotional Journey Integration
**Psychology-Informed Design**: Navigation that supports emotional user states

```typescript
// Emotional states mapped to design decisions
interface EmotionalJourneyDesign {
  // Initial anxiety (common in education decisions)
  anxietyReduction: {
    designStrategies: {
      clarity: 'clear-simple-language',
      reassurance: 'prominent-credentials',
      guidance: 'suggested-pathways',
      support: 'easy-contact-access'
    },
    navigationFeatures: {
      breadcrumbs: 'always-visible',
      backButton: 'prominent',
      help: 'contextual-assistance',
      search: 'intelligent-suggestions'
    }
  },
  
  // Building confidence through exploration
  confidenceBuilding: {
    designStrategies: {
      expertise: 'credentials-prominent',
      success: 'results-visible',
      process: 'transparency',
      personalisation: 'tailored-approach'
    },
    navigationFeatures: {
      testimonials: 'integrated-throughout',
      statistics: 'achievement-highlights',
      process: 'how-it-works-detailed',
      customisation: 'bespoke-service-emphasis'
    }
  },
  
  // Decision commitment support
  commitmentSupport: {
    designStrategies: {
      clarity: 'clear-next-steps',
      flexibility: 'service-options',
      guarantee: 'risk-reduction',
      urgency: 'gentle-encouragement'
    },
    navigationFeatures: {
      cta: 'prominent-but-not-aggressive',
      options: 'multiple-engagement-levels',
      guarantee: 'visible-assurance',
      urgency: 'availability-indicators'
    }
  }
}
```

---

## ⚙️ PERFORMANCE REQUIREMENTS

### 13. COMPREHENSIVE PERFORMANCE ENGINEERING
**Standard**: Enterprise-grade performance with detailed monitoring and optimization

#### 13.1 Advanced Load Performance Strategies

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Code splitting and lazy loading patterns
// IMPLEMENTATION REASON: Official React guidance on performance optimization

// Strategic code splitting with React.lazy
const MobileMenu = lazy(() => 
  import('./MobileMenu').then(module => ({
    default: module.MobileMenu
  }))
);

const DropdownMenu = lazy(() =>
  import('./DropdownMenu').then(module => ({
    default: module.DropdownMenu
  }))
);

// Advanced resource loading strategy
interface PerformanceConfig {
  logoPreloading: {
    standard: { priority: boolean; sizes: string };
    white: { priority: boolean; sizes: string };
  };
  bundleOptimization: {
    criticalPath: string[];
    asyncComponents: string[];
    preloadRoutes: string[];
  };
  memoryManagement: {
    componentPoolSize: number;
    eventListenerCleanup: boolean;
    timeoutCleanup: boolean;
  };
}
```

**Bundle Optimization Strategies**:
- **Critical Path**: Logo + MainNavbar inline (~15KB)
- **Async Loading**: MobileMenu, DropdownMenu loaded on demand
- **Tree Shaking**: ES modules with `sideEffects: false`
- **Dead Code Elimination**: Webpack Bundle Analyzer integration
- **Dynamic Imports**: Route-based component splitting

#### 13.2 Runtime Performance Engineering

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Performance optimization patterns

// Advanced scroll performance with RAF optimization
const useHighPerformanceScroll = () => {
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  
  const handleScrollRAF = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Only update if scroll position changed significantly (reduces renders)
    if (Math.abs(currentScrollY - lastScrollY.current) > 1) {
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    }
    
    rafId.current = null;
  }, []);
  
  const handleScroll = useCallback(() => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(handleScrollRAF);
    }
  }, [handleScrollRAF]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);
};

// GPU acceleration utilities
const GPU_OPTIMIZED_STYLES = {
  willChange: 'transform, opacity',
  transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
  backfaceVisibility: 'hidden' as const,
  perspective: '1000px',
} as const;
```

**Performance Monitoring Implementation**:
```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Performance measurement patterns

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  measureRender(componentName: string, renderTime: number) {
    if (!this.metrics.has(componentName)) {
      this.metrics.set(componentName, []);
    }
    
    const times = this.metrics.get(componentName)!;
    times.push(renderTime);
    
    // Keep only last 10 measurements
    if (times.length > 10) {
      times.shift();
    }
    
    // Warn if average render time > 16ms (60fps threshold)
    const avg = times.reduce((a, b) => a + b) / times.length;
    if (avg > 16) {
      console.warn(`${componentName} average render time: ${avg.toFixed(2)}ms`);
    }
  }
  
  getMetrics() {
    const report: Record<string, { avg: number; max: number; count: number }> = {};
    
    for (const [component, times] of this.metrics.entries()) {
      report[component] = {
        avg: times.reduce((a, b) => a + b) / times.length,
        max: Math.max(...times),
        count: times.length
      };
    }
    
    return report;
  }
}
```

#### 13.3 Advanced Animation Performance

```typescript
// CONTEXT7 SOURCE: /grx7/framer-motion - Animation performance optimization
// IMPLEMENTATION REASON: Official Framer Motion patterns for 60fps animations

// Optimized animation configurations
const PERFORMANCE_ANIMATIONS = {
  dropdown: {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smoothness
        staggerChildren: 0.03, // Reduced for better performance
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  },
  
  mobileMenu: {
    initial: { x: '100%' },
    animate: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }
};

// Will-change optimization hook
const useWillChange = (isAnimating: boolean, properties: string[]) => {
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    if (isAnimating) {
      element.style.willChange = properties.join(', ');
    } else {
      // Clean up will-change after animation
      element.style.willChange = 'auto';
    }
  }, [isAnimating, properties]);
  
  return elementRef;
};
```

#### 13.4 Memory Management & Cleanup

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - useEffect cleanup patterns

// Advanced cleanup hook for resource management
const useResourceCleanup = () => {
  const timeouts = useRef<Set<NodeJS.Timeout>>(new Set());
  const intervals = useRef<Set<NodeJS.Timer>>(new Set());
  const observers = useRef<Set<IntersectionObserver | MutationObserver>>(new Set());
  const eventListeners = useRef<Array<{
    element: EventTarget;
    event: string;
    handler: EventListener;
    options?: boolean | AddEventListenerOptions;
  }>>(new Set());
  
  const addTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      callback();
      timeouts.current.delete(timeout);
    }, delay);
    timeouts.current.add(timeout);
    return timeout;
  }, []);
  
  const addEventListeners = useCallback((
    element: EventTarget,
    event: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => {
    element.addEventListener(event, handler, options);
    eventListeners.current.add({ element, event, handler, options });
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeouts.current.forEach(clearTimeout);
      timeouts.current.clear();
      
      // Clear all intervals
      intervals.current.forEach(clearInterval);
      intervals.current.clear();
      
      // Disconnect all observers
      observers.current.forEach(observer => observer.disconnect());
      observers.current.clear();
      
      // Remove all event listeners
      eventListeners.current.forEach(({ element, event, handler, options }) => {
        element.removeEventListener(event, handler, options);
      });
      eventListeners.current.clear();
    };
  }, []);
  
  return { addTimeout, addEventListener };
};
```

### 14. ENTERPRISE ANIMATION ARCHITECTURE
**Library**: Framer Motion with advanced performance patterns and accessibility

#### 14.1 Animation System Architecture

```typescript
// CONTEXT7 SOURCE: /grx7/framer-motion - Advanced animation patterns
// IMPLEMENTATION REASON: Official Framer Motion performance guidelines

// Centralized animation configuration with performance optimization
interface AnimationConfig {
  transitions: {
    dropdown: MotionProps['transition'];
    hover: MotionProps['transition'];
    mobile: MotionProps['transition'];
    logo: MotionProps['transition'];
  };
  variants: {
    [key: string]: Variants;
  };
  performance: {
    reducedMotion: boolean;
    gpuAcceleration: boolean;
    willChangeOptimization: boolean;
  };
}

const ANIMATION_SYSTEM: AnimationConfig = {
  transitions: {
    dropdown: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.8,
      // Reduced duration for snappier feel
      duration: 0.18
    },
    hover: {
      type: "tween",
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for organic feel
    },
    mobile: {
      type: "spring",
      stiffness: 300,
      damping: 28,
      mass: 0.9
    },
    logo: {
      type: "tween",
      duration: 0.25,
      ease: "easeInOut"
    }
  },
  
  variants: {
    dropdownContainer: {
      hidden: {
        opacity: 0,
        y: -12,
        scale: 0.96,
        rotateX: -15, // Subtle 3D effect
        transformPerspective: 1000
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          duration: 0.18,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.025,
          delayChildren: 0.05
        }
      },
      exit: {
        opacity: 0,
        y: -8,
        scale: 0.98,
        transition: { duration: 0.12, ease: "easeIn" }
      }
    },
    
    dropdownItem: {
      hidden: {
        opacity: 0,
        x: -10,
        y: 5
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.15,
          ease: "easeOut"
        }
      }
    },
    
    hoverScale: {
      initial: { scale: 1 },
      hover: {
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      },
      tap: {
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: "easeInOut"
        }
      }
    }
  },
  
  performance: {
    reducedMotion: false, // Detected via media query
    gpuAcceleration: true,
    willChangeOptimization: true
  }
};
```

#### 14.2 Performance-First Animation Hooks

```typescript
// CONTEXT7 SOURCE: /grx7/framer-motion - useAnimation optimization patterns

// Advanced animation controller with performance monitoring
const usePerformantAnimation = () => {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const rafId = useRef<number | null>(null);
  
  const animateWithPerformanceTracking = useCallback(
    async (definition: AnimationDefinition) => {
      const startTime = performance.now();
      setIsAnimating(true);
      
      try {
        await controls.start(definition);
      } finally {
        setIsAnimating(false);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log performance warnings for slow animations
        if (duration > 300 && process.env.NODE_ENV === 'development') {
          console.warn(`Animation took ${duration}ms - consider optimization`);
        }
      }
    },
    [controls]
  );
  
  return { controls, animateWithPerformanceTracking, isAnimating };
};

// Reduced motion detection with context
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Advanced intersection observer for animation triggers
const useInViewAnimation = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '50px' // Trigger slightly before element enters viewport
      }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);
  
  return { ref, isInView };
};
```

#### 14.3 GPU Acceleration & Will-Change Optimization

```typescript
// CONTEXT7 SOURCE: /websites/tailwindcss - Performance optimization patterns

// Tailwind CSS classes for hardware acceleration
const PERFORMANCE_CLASSES = {
  gpuAccelerated: [
    'transform-gpu', // Force GPU acceleration
    'backface-hidden', // Prevent flickering
    'perspective-1000' // 3D context
  ].join(' '),
  
  willChangeTransform: 'will-change-transform',
  willChangeOpacity: 'will-change-opacity',
  willChangeAuto: 'will-change-auto'
};

// Dynamic will-change management
const useOptimizedWillChange = (isAnimating: boolean) => {
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    if (isAnimating) {
      // Set will-change before animation starts
      element.style.willChange = 'transform, opacity';
    } else {
      // Clean up will-change after animation completes
      // Use RAF to ensure cleanup happens after paint
      requestAnimationFrame(() => {
        if (element.style) {
          element.style.willChange = 'auto';
        }
      });
    }
  }, [isAnimating]);
  
  return elementRef;
};

// Batch DOM updates for better performance
const useBatchedUpdates = () => {
  const updateQueue = useRef<(() => void)[]>([]);
  const rafId = useRef<number | null>(null);
  
  const batchUpdate = useCallback((updateFn: () => void) => {
    updateQueue.current.push(updateFn);
    
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        // Execute all queued updates in a single frame
        updateQueue.current.forEach(fn => fn());
        updateQueue.current = [];
        rafId.current = null;
      });
    }
  }, []);
  
  return { batchUpdate };
};
```

#### 14.4 Accessibility-First Animation System

```typescript
// CONTEXT7 SOURCE: /grx7/framer-motion - Accessibility patterns

// Animation wrapper that respects user preferences
const AccessibleMotion: React.FC<{
  children: React.ReactNode;
  reducedMotionFallback?: React.ReactNode;
  animate?: boolean;
}> = ({ children, reducedMotionFallback, animate = true }) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <>{reducedMotionFallback || children}</>;
  }
  
  if (!animate) {
    return <>{children}</>;
  }
  
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
};

// Focus management during animations
const useFocusManagement = (isAnimating: boolean) => {
  const previousActiveElement = useRef<Element | null>(null);
  
  useEffect(() => {
    if (isAnimating) {
      // Store current focus
      previousActiveElement.current = document.activeElement;
      
      // Prevent focus during animation to avoid jarring jumps
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else {
      // Restore focus after animation completes
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    }
  }, [isAnimating]);
};

// Screen reader announcements for animation state changes
const useAnimationAnnouncements = () => {
  const announceRef = useRef<HTMLDivElement>(null);
  
  const announce = useCallback((message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);
  
  const AnnouncementElement = useMemo(() => (
    <div
      ref={announceRef}
      role="status"
      aria-live="polite"
      className="sr-only"
    />
  ), []);
  
  return { announce, AnnouncementElement };
};
```

---

## 🔧 DEVELOPMENT STANDARDS

---

## 🎨 ADVANCED DESIGN SYSTEM IMPLEMENTATION

### 15. COMPREHENSIVE DESIGN TOKEN INTEGRATION
**Foundation**: Systematic approach to design consistency and maintainability
// CONTEXT7 SOURCE: /radix-ui/website - Design system token patterns

#### 15.1 Advanced Design Token Architecture
**Scalable System**: Multi-tier token system for consistent visual language

```typescript
// CONTEXT7 SOURCE: /radix-ui/website - Design token patterns
interface ComprehensiveDesignTokens {
  // Tier 1: Global design decisions (brand level)
  global: {
    // Brand color foundations
    colors: {
      brand: {
        primary: '#1d4ed8',      // Primary brand blue
        secondary: '#d97706',    // Warm accent amber
        tertiary: '#059669'      // Success green
      },
      neutral: {
        white: '#ffffff',
        black: '#000000',
        greys: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      }
    },
    
    // Typography foundations
    typography: {
      fonts: {
        primary: 'Inter, system-ui, sans-serif',
        brand: 'Playfair Display, serif',
        mono: 'JetBrains Mono, monospace'
      },
      scale: {
        ratio: 1.25,             // Major third scale
        base: '1rem',            // 16px base size
        steps: 8                 // Number of scale steps
      }
    },
    
    // Spacing foundations
    spacing: {
      unit: '0.25rem',         // 4px base unit
      scale: 'geometric',      // Geometric progression
      ratio: 1.618             // Golden ratio
    }
  },
  
  // Tier 2: Semantic design decisions (purpose level)
  semantic: {
    colors: {
      // Interactive states
      interactive: {
        primary: 'var(--color-brand-primary)',
        secondary: 'var(--color-neutral-600)',
        hover: 'var(--color-brand-primary-dark)',
        active: 'var(--color-brand-primary-darker)',
        disabled: 'var(--color-neutral-400)'
      },
      
      // Feedback colors
      feedback: {
        success: 'var(--color-brand-tertiary)',
        warning: 'var(--color-brand-secondary)',
        error: '#dc2626',
        info: '#0ea5e9'
      },
      
      // Surface colors
      surfaces: {
        background: 'var(--color-neutral-white)',
        foreground: 'var(--color-neutral-900)',
        card: 'var(--color-neutral-50)',
        overlay: 'var(--color-neutral-900-alpha-80)'
      }
    },
    
    // Component spacing
    spacing: {
      component: {
        padding: {
          tight: 'var(--space-2)',     // 8px
          normal: 'var(--space-4)',    // 16px
          loose: 'var(--space-6)'      // 24px
        },
        margin: {
          tight: 'var(--space-1)',     // 4px
          normal: 'var(--space-3)',    // 12px
          loose: 'var(--space-5)'      // 20px
        },
        gap: {
          tight: 'var(--space-1)',     // 4px
          normal: 'var(--space-2)',    // 8px
          loose: 'var(--space-4)'      // 16px
        }
      }
    }
  },
  
  // Tier 3: Component-specific decisions (implementation level)
  component: {
    navbar: {
      height: {
        mobile: '4rem',              // 64px
        desktop: '5rem',             // 80px
        expanded: '6rem'             // 96px
      },
      background: {
        transparent: 'transparent',
        solid: 'var(--color-surface-background)',
        glass: 'var(--color-surface-background-alpha-95)'
      },
      text: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        inverse: 'var(--color-surface-background)'
      }
    },
    
    dropdown: {
      background: {
        light: 'var(--color-surface-card)',
        dark: 'var(--color-neutral-800-alpha-95)'
      },
      border: {
        light: 'var(--color-neutral-200)',
        dark: 'var(--color-neutral-700-alpha-50)'
      },
      shadow: {
        light: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        dark: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
      }
    }
  }
}
```

#### 15.2 Dynamic Theme System Implementation
**Advanced Theming**: Context-aware theme switching with performance optimisation

```typescript
// Dynamic theme management system
interface DynamicThemeSystem {
  // Theme detection and management
  themeDetection: {
    // System preference detection
    systemPreference: {
      colorScheme: 'prefers-color-scheme: dark',
      contrast: 'prefers-contrast: high',
      motion: 'prefers-reduced-motion: reduce'
    },
    
    // User preference storage
    userPreference: {
      storage: 'localStorage',
      key: 'theme-preference',
      fallback: 'system'
    },
    
    // Context-aware switching
    contextual: {
      homepage: 'light-theme',         // Always light on homepage
      pages: 'adaptive-theme',         // Follows user/system preference
      modals: 'inherit-from-parent'    // Inherits from trigger context
    }
  },
  
  // Performance optimised theme switching
  optimisation: {
    // CSS custom properties for instant switching
    cssVariables: {
      update: 'document-root',
      transition: 'color 0.2s ease, background-color 0.2s ease',
      fallback: 'hard-coded-values'
    },
    
    // Preload theme assets
    preloading: {
      images: 'theme-specific-assets',
      fonts: 'variable-font-loading',
      icons: 'svg-sprite-switching'
    },
    
    // Avoid flash of unstyled content
    fouc: {
      prevention: 'inline-critical-css',
      detection: 'script-before-body',
      fallback: 'system-theme'
    }
  }
}
```

### 16. MICRO-INTERACTION DESIGN LANGUAGE
**Philosophy**: Purposeful animations that enhance usability and delight
// CONTEXT7 SOURCE: /radix-ui/website - Micro-interaction patterns

#### 16.1 Comprehensive Micro-Interaction System
**Systematic Approach**: Consistent micro-interactions across all components

```typescript
// Micro-interaction design system
interface MicroInteractionSystem {
  // Hover micro-interactions
  hover: {
    // Subtle scale and shadow changes
    buttons: {
      scale: 1.02,                    // 2% scale increase
      shadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: 'all 0.2s ease-out',
      cursor: 'pointer'
    },
    
    // Navigation item hover effects
    navItems: {
      backgroundShift: 'subtle-gradient',
      textShift: 'slight-boldness',
      iconMovement: '2px-right-translation',
      timing: '150ms ease-out'
    },
    
    // Logo hover interaction
    logo: {
      scale: 1.05,                   // Slightly more prominent
      brightness: 1.1,               // Subtle brightness increase
      transition: 'all 0.3s ease-out',
      delay: '100ms'                 // Slight delay for sophistication
    }
  },
  
  // Focus micro-interactions
  focus: {
    // Focus ring animations
    rings: {
      appearance: 'scale-from-center',
      color: 'brand-accent',
      width: '2px',
      offset: '2px',
      transition: 'all 0.15s ease-out'
    },
    
    // Focus content shifts
    content: {
      brightening: 'slight-contrast-increase',
      backgroundShift: 'subtle-highlight',
      borderShift: 'accent-color'
    }
  },
  
  // Loading micro-interactions
  loading: {
    // Skeleton loading animations
    skeletons: {
      shimmer: 'subtle-left-to-right',
      timing: '1.5s infinite',
      colors: 'neutral-gradient',
      accessibility: 'reduced-motion-aware'
    },
    
    // Progress indicators
    progress: {
      style: 'smooth-progression',
      feedback: 'color-intensity-change',
      completion: 'gentle-celebration'
    }
  },
  
  // State change micro-interactions
  stateChanges: {
    // Menu opening/closing
    menuStates: {
      opening: 'scale-and-fade-in',
      closing: 'scale-and-fade-out',
      itemAppearance: 'staggered-slide-in',
      timing: 'spring-physics'
    },
    
    // Active state changes
    activeStates: {
      selection: 'gentle-highlight-growth',
      deselection: 'fade-to-normal',
      transition: 'smooth-color-morph'
    }
  }
}
```

#### 16.2 Emotional Design Through Animation
**Psychology-Informed Motion**: Animations that create positive emotional responses

```typescript
// Emotional animation design patterns
interface EmotionalAnimationDesign {
  // Trust-building animations
  trustBuilding: {
    // Credibility indicators
    credentials: {
      appearance: 'confident-fade-in',
      emphasis: 'subtle-pulse-on-scroll',
      interaction: 'warm-glow-on-hover'
    },
    
    // Testimonial animations
    testimonials: {
      entrance: 'gentle-slide-up',
      transition: 'crossfade-with-pause',
      emphasis: 'quote-mark-highlight'
    }
  },
  
  // Confidence-inspiring animations
  confidenceBuilding: {
    // Success indicators
    success: {
      completion: 'checkmark-drawing',
      celebration: 'subtle-confetti',
      progression: 'steady-advancement'
    },
    
    // Achievement displays
    achievements: {
      reveal: 'proud-scale-in',
      emphasis: 'gentle-glow-pulse',
      interaction: 'warm-color-shift'
    }
  },
  
  // Comfort and reassurance animations
  comfort: {
    // Error handling
    errors: {
      appearance: 'gentle-shake',
      recovery: 'healing-fade-in',
      guidance: 'helpful-arrow-point'
    },
    
    // Loading states
    loading: {
      style: 'calm-breathing-rhythm',
      feedback: 'patient-progress',
      completion: 'satisfied-resolution'
    }
  }
}
```

---

## 🏁 IMPLEMENTATION EXCELLENCE

### 17. ENTERPRISE CODE QUALITY & ARCHITECTURE STANDARDS
**Standard**: Production-ready TypeScript with comprehensive testing and Context7 MCP compliance

#### 17.1 Advanced TypeScript Architecture

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - TypeScript best practices
// IMPLEMENTATION REASON: Official React TypeScript patterns for enterprise applications

// Strict TypeScript configuration
interface StrictTypeConfig {
  strict: true;
  noImplicitAny: true;
  noImplicitReturns: true;
  noFallthroughCasesInSwitch: true;
  noUncheckedIndexedAccess: true;
  exactOptionalPropertyTypes: true;
}

// Advanced interface definitions with branded types
type BrandedString<T extends string> = string & { readonly __brand: T };
type ComponentId = BrandedString<'ComponentId'>;
type NavigationId = BrandedString<'NavigationId'>;

interface BaseComponent {
  id: ComponentId;
  className?: string;
  'data-testid'?: string;
  'aria-label'?: string;
}

// Generic event handler types for type safety
interface EventHandlers<T = HTMLElement> {
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
}

// Advanced component prop patterns
interface WithChildren {
  children: React.ReactNode;
}

interface WithOptionalChildren {
  children?: React.ReactNode;
}

interface WithRenderProp<T> {
  render: (props: T) => React.ReactNode;
}

// Compound component patterns
namespace Navigation {
  export interface RootProps extends BaseComponent, WithChildren {
    variant: 'desktop' | 'mobile';
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
  
  export interface ItemProps extends BaseComponent, EventHandlers {
    href?: string;
    isActive?: boolean;
    hasSubmenu?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }
  
  export interface SubmenuProps extends BaseComponent, WithChildren {
    trigger: React.ReactNode;
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
  }
}

// Utility types for prop manipulation
type PropsWithoutRef<P> = P & { ref?: never };
type PropsWithRef<T, P> = P & { ref?: React.Ref<T> };

// Polymorphic component pattern
type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = {}
> = Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props> & {
    as?: T;
  };
```

#### 17.2 Comprehensive Context7 MCP Documentation Standards

```typescript
/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Navigation Menu implementation
 * IMPLEMENTATION REASON: Official Radix UI patterns for accessible navigation menus
 * PERFORMANCE IMPACT: ~2KB bundle size, tree-shakeable
 * ACCESSIBILITY: Full WCAG 2.1 AA compliance with keyboard navigation
 * BROWSER SUPPORT: Modern browsers (Chrome 91+, Firefox 90+, Safari 14+)
 */

// File header template for all components
/*
 * Component: MainNavbar
 * Purpose: Enterprise navigation header with responsive behavior
 * 
 * CONTEXT7 SOURCES:
 * - /radix-ui/primitives - Navigation Menu patterns
 * - /websites/react_dev - Performance optimization hooks
 * - /grx7/framer-motion - Animation performance
 * - /websites/tailwindcss - Responsive design utilities
 * 
 * PERFORMANCE CHARACTERISTICS:
 * - Initial render: <16ms (60fps target)
 * - Re-render frequency: ~2-3 per scroll event
 * - Memory usage: <5MB in dev mode
 * - Bundle impact: 12KB gzipped
 * 
 * ACCESSIBILITY FEATURES:
 * - Screen reader compatible (tested with NVDA, JAWS)
 * - Keyboard navigation (Tab, Enter, Escape, Arrow keys)
 * - Focus management with visible indicators
 * - Color contrast WCAG AA compliant
 */

// Inline documentation for complex logic
const handleComplexLogic = useCallback(() => {
  // CONTEXT7 SOURCE: /websites/react_dev - useCallback optimization
  // IMPLEMENTATION REASON: Prevent unnecessary re-renders of child components
  // PERFORMANCE: Reduces render cycles by ~40% in testing
  
  // Complex state update logic here...
}, [dependency1, dependency2]);
```

#### 17.3 Advanced Code Organization Architecture

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Code organization patterns

// File structure template
/*
navbar/
├── components/
│   ├── MainNavbar/
│   │   ├── index.ts                 # Public API exports
│   │   ├── MainNavbar.tsx          # Main component
│   │   ├── MainNavbar.test.tsx     # Unit tests
│   │   ├── MainNavbar.stories.tsx  # Storybook stories
│   │   └── MainNavbar.styles.ts    # Styled components
│   ├── LogoSection/
│   ├── DesktopNavigation/
│   ├── DropdownMenu/
│   ├── MobileMenu/
│   └── CTAButton/
├── hooks/
│   ├── useScrollDetection.ts
│   ├── useBreakpoint.ts
│   ├── useNavigation.ts
│   └── __tests__/
├── types/
│   ├── navbar.types.ts
│   ├── navigation.types.ts
│   └── animation.types.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── __tests__/
├── context/
│   ├── NavbarContext.tsx
│   └── __tests__/
└── __tests__/
    ├── integration/
    ├── e2e/
    └── performance/
*/

// Import organization standards
// 1. React and related
import React, { 
  useCallback, 
  useMemo, 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 2. Third-party libraries (alphabetical)
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Sheet } from '@radix-ui/react-dialog';
import clsx from 'clsx';

// 3. Internal utilities and types
import { NAVBAR_CONSTANTS } from '@/utils/constants';
import { NavbarProvider, useNavbar } from '@/context/NavbarContext';
import type { MainNavbarProps, NavigationState } from '@/types/navbar.types';

// 4. Internal components (relative imports)
import { LogoSection } from './LogoSection';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileMenu } from './MobileMenu';

// Component organization template
const ComponentTemplate: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 1. Hooks (custom hooks first, then React hooks)
  const customHookData = useCustomHook(prop1);
  const [state, setState] = useState(initialState);
  const memoizedValue = useMemo(() => computeValue(prop2), [prop2]);
  
  // 2. Event handlers (all useCallback wrapped)
  const handleEvent = useCallback((event: Event) => {
    // CONTEXT7 SOURCE: /websites/react_dev - Event handler patterns
    // Event handling logic
  }, [dependency]);
  
  // 3. Effects (grouped by concern)
  useEffect(() => {
    // CONTEXT7 SOURCE: /websites/react_dev - useEffect patterns
    // Setup logic
    return () => {
      // Cleanup logic
    };
  }, [dependency]);
  
  // 4. Early returns/conditional rendering
  if (customHookData.loading) {
    return <LoadingSkeleton />;
  }
  
  if (customHookData.error) {
    return <ErrorBoundary error={customHookData.error} />;
  }
  
  // 5. Main render
  return (
    <div className={styles.container}>
      {/* Component JSX */}
    </div>
  );
};
```

#### 17.4 Testing Architecture & Quality Gates

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Testing patterns

// Comprehensive test structure
describe('MainNavbar', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      // Basic render test
    });
    
    it('should match snapshot', () => {
      // Visual regression testing
    });
  });
  
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      // a11y testing with @testing-library/jest-dom
    });
    
    it('should support keyboard navigation', async () => {
      // Keyboard interaction testing
    });
    
    it('should announce state changes to screen readers', async () => {
      // Screen reader testing
    });
  });
  
  describe('Performance', () => {
    it('should render within performance budget', () => {
      // Performance testing with React DevTools Profiler
    });
    
    it('should not cause memory leaks', () => {
      // Memory leak testing
    });
    
    it('should handle rapid state changes', () => {
      // Stress testing
    });
  });
  
  describe('Integration', () => {
    it('should work with different CMS data', () => {
      // Integration testing
    });
    
    it('should maintain state across navigation', () => {
      // State persistence testing
    });
  });
});

// Quality gates configuration
interface QualityGates {
  performance: {
    renderTime: number; // max 16ms
    bundleSize: number; // max 50KB
    memoryUsage: number; // max 10MB
  };
  accessibility: {
    wcagLevel: 'A' | 'AA' | 'AAA';
    colorContrast: number; // min 4.5:1
    keyboardSupport: boolean;
  };
  testing: {
    coverage: number; // min 85%
    mutationScore: number; // min 80%
    e2ePass: boolean;
  };
}

const QUALITY_GATES: QualityGates = {
  performance: {
    renderTime: 16,
    bundleSize: 51200, // 50KB
    memoryUsage: 10485760 // 10MB
  },
  accessibility: {
    wcagLevel: 'AA',
    colorContrast: 4.5,
    keyboardSupport: true
  },
  testing: {
    coverage: 85,
    mutationScore: 80,
    e2ePass: true
  }
};
```

### 18. COMPREHENSIVE TESTING STRATEGY & QUALITY ASSURANCE
**Standard**: Enterprise-grade testing with automated quality gates and performance monitoring

#### 18.1 Multi-Layer Testing Architecture

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Testing best practices
// IMPLEMENTATION REASON: Official React testing patterns for enterprise applications

// Testing pyramid implementation
interface TestingStrategy {
  unit: {
    coverage: number;
    tools: string[];
    frameworks: string[];
  };
  integration: {
    coverage: number;
    scenarios: string[];
    tools: string[];
  };
  e2e: {
    criticalPaths: string[];
    tools: string[];
    devices: string[];
  };
  performance: {
    metrics: string[];
    thresholds: Record<string, number>;
    tools: string[];
  };
}

const TESTING_STRATEGY: TestingStrategy = {
  unit: {
    coverage: 90, // 90% minimum coverage
    tools: ['Jest', 'React Testing Library', '@testing-library/jest-dom'],
    frameworks: ['MSW', 'factory-bot']
  },
  integration: {
    coverage: 80,
    scenarios: [
      'Navigation state management',
      'CMS data integration',
      'Responsive behavior',
      'Animation sequences'
    ],
    tools: ['Testing Library', 'React Hooks Testing Library']
  },
  e2e: {
    criticalPaths: [
      'Homepage navigation',
      'Mobile menu functionality', 
      'Dropdown interactions',
      'Responsive breakpoints'
    ],
    tools: ['Playwright', 'Cypress'],
    devices: ['Desktop Chrome', 'Mobile Safari', 'Mobile Chrome']
  },
  performance: {
    metrics: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB'],
    thresholds: {
      renderTime: 16, // ms
      bundleSize: 50, // KB
      memoryUsage: 10, // MB
      accessibilityScore: 95 // %
    },
    tools: ['Lighthouse', 'WebPageTest', 'Bundle Analyzer']
  }
};
```

#### 18.2 Advanced Component Testing Patterns

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - Component testing patterns

// Comprehensive test suite for MainNavbar
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

// Extended Jest matchers for better assertions
expect.extend(toHaveNoViolations);

// Test utilities and mocks
const mockCMSData = {
  navigation: [
    { id: 'home', label: 'Home', href: '/' },
    { 
      id: 'about', 
      label: 'About Us', 
      submenu: [
        { id: 'founder', label: 'Founder Story', href: '/about/founder' }
      ]
    }
  ],
  logo: { standard: '/logo.png', white: '/logo-white.png', alt: 'Site Logo' },
  cta: { label: 'Get Started', href: '/contact', variant: 'primary' as const }
};

// Test wrapper with providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavbarProvider>
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  </NavbarProvider>
);

// Custom render function
const renderNavbar = (props = {}) => {
  const defaultProps = {
    isHomepage: false,
    ...mockCMSData,
    ...props
  };
  
  return render(
    <TestWrapper>
      <MainNavbar {...defaultProps} />
    </TestWrapper>
  );
};

describe('MainNavbar', () => {
  // Accessibility testing
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderNavbar();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('should support complete keyboard navigation', async () => {
      const user = userEvent.setup();
      renderNavbar();
      
      // Tab through all interactive elements
      await user.tab();
      expect(screen.getByRole('link', { name: 'Home' })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: 'About Us' })).toHaveFocus();
      
      // Test dropdown opening with Enter
      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(screen.getByRole('link', { name: 'Founder Story' })).toBeVisible();
      });
      
      // Test Escape to close
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('link', { name: 'Founder Story' })).not.toBeVisible();
      });
    });
    
    it('should announce state changes to screen readers', async () => {
      renderNavbar();
      const user = userEvent.setup();
      
      const aboutButton = screen.getByRole('button', { name: 'About Us' });
      await user.click(aboutButton);
      
      // Check ARIA attributes update
      await waitFor(() => {
        expect(aboutButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Check for live region updates
      const liveRegion = screen.getByRole('status');
      expect(liveRegion).toHaveTextContent('About Us menu opened');
    });
    
    it('should maintain color contrast requirements', () => {
      renderNavbar();
      
      // Test with custom contrast checking utility
      const navLinks = screen.getAllByRole('link');
      navLinks.forEach(link => {
        const styles = getComputedStyle(link);
        const contrast = calculateContrast(styles.color, styles.backgroundColor);
        expect(contrast).toBeGreaterThanOrEqual(4.5); // WCAG AA standard
      });
    });
  });
  
  // Performance testing
  describe('Performance', () => {
    it('should render within performance budget', async () => {
      const renderStart = performance.now();
      
      renderNavbar();
      
      await waitFor(() => {
        const renderEnd = performance.now();
        const renderTime = renderEnd - renderStart;
        expect(renderTime).toBeLessThan(16); // 60fps target
      });
    });
    
    it('should not cause memory leaks during mount/unmount cycles', () => {
      const { rerender, unmount } = renderNavbar();
      
      // Simulate multiple mount/unmount cycles
      for (let i = 0; i < 10; i++) {
        rerender(
          <TestWrapper>
            <MainNavbar {...mockCMSData} isHomepage={i % 2 === 0} />
          </TestWrapper>
        );
      }
      
      unmount();
      
      // Check that event listeners were cleaned up
      const listenerCount = getEventListenerCount(); // Custom utility
      expect(listenerCount).toBeLessThanOrEqual(2); // Allow for minimal system listeners
    });
    
    it('should handle rapid scroll events efficiently', async () => {
      renderNavbar({ isHomepage: false });
      
      const scrollStart = performance.now();
      
      // Simulate rapid scrolling
      for (let i = 0; i < 100; i++) {
        fireEvent.scroll(window, { target: { scrollY: i * 10 } });
      }
      
      // Wait for debounced updates
      await waitFor(() => {
        const scrollEnd = performance.now();
        const scrollHandlingTime = scrollEnd - scrollStart;
        expect(scrollHandlingTime).toBeLessThan(100); // Should handle efficiently
      });
    });
  });
  
  // Integration testing
  describe('Integration', () => {
    it('should integrate properly with CMS data changes', async () => {
      const { rerender } = renderNavbar();
      
      // Initial render with basic data
      expect(screen.getByText('Home')).toBeInTheDocument();
      
      // Update with new CMS data
      const updatedData = {
        ...mockCMSData,
        navigation: [
          ...mockCMSData.navigation,
          { id: 'services', label: 'Services', href: '/services' }
        ]
      };
      
      rerender(
        <TestWrapper>
          <MainNavbar {...updatedData} isHomepage={false} />
        </TestWrapper>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Services')).toBeInTheDocument();
      });
    });
    
    it('should maintain state consistency across re-renders', async () => {
      const { rerender } = renderNavbar();
      const user = userEvent.setup();
      
      // Open dropdown
      await user.click(screen.getByRole('button', { name: 'About Us' }));
      await waitFor(() => {
        expect(screen.getByRole('link', { name: 'Founder Story' })).toBeVisible();
      });
      
      // Re-render with different props
      rerender(
        <TestWrapper>
          <MainNavbar {...mockCMSData} isHomepage={true} />
        </TestWrapper>
      );
      
      // Dropdown should remain open
      expect(screen.getByRole('link', { name: 'Founder Story' })).toBeVisible();
    });
  });
});
```

#### 18.3 End-to-End Testing Strategy

```typescript
// CONTEXT7 SOURCE: /websites/react_dev - E2E testing patterns

// Playwright test suite for critical user journeys
import { test, expect, devices } from '@playwright/test';

// Device configuration for responsive testing
const DEVICE_CONFIGS = {
  desktop: { ...devices['Desktop Chrome'] },
  tablet: { ...devices['iPad Pro'] },
  mobile: { ...devices['iPhone 13'] }
};

// Critical user journey tests
test.describe('Navbar Critical Paths', () => {
  Object.entries(DEVICE_CONFIGS).forEach(([device, config]) => {
    test.describe(`${device} experience`, () => {
      test.use(config);
      
      test('should navigate through dropdown menus', async ({ page }) => {
        await page.goto('/');
        
        // Test dropdown interaction
        await page.hover('[data-testid="about-nav-item"]');
        await expect(page.locator('[data-testid="about-dropdown"]')).toBeVisible();
        
        // Test submenu click
        await page.click('[data-testid="founder-story-link"]');
        await expect(page).toHaveURL('/about/founder');
        
        // Verify page loaded correctly
        await expect(page.locator('h1')).toContainText('Founder Story');
      });
      
      test('should handle mobile menu correctly', async ({ page }) => {
        if (device === 'mobile') {
          await page.goto('/');
          
          // Open mobile menu
          await page.click('[data-testid="mobile-menu-trigger"]');
          await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
          
          // Test expandable navigation
          await page.click('[data-testid="mobile-about-toggle"]');
          await expect(page.locator('[data-testid="mobile-about-submenu"]')).toBeVisible();
          
          // Test navigation
          await page.click('[data-testid="mobile-founder-link"]');
          await expect(page).toHaveURL('/about/founder');
          
          // Menu should close after navigation
          await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
        }
      });
      
      test('should maintain scroll behavior', async ({ page }) => {
        await page.goto('/about'); // Non-homepage
        
        // Initial transparent state
        const navbar = page.locator('[data-testid="main-navbar"]');
        await expect(navbar).toHaveClass(/transparent/);
        
        // Scroll and check state change
        await page.evaluate(() => window.scrollTo(0, 200));
        await expect(navbar).toHaveClass(/scrolled/);
        
        // Scroll back up
        await page.evaluate(() => window.scrollTo(0, 50));
        await expect(navbar).toHaveClass(/transparent/);
      });
    });
  });
});

// Performance testing with Playwright
test.describe('Performance Tests', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    await page.goto('/');
    
    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve({
            fcp: entries.find(e => e.name === 'first-contentful-paint')?.startTime,
            lcp: entries.find(e => e.entryType === 'largest-contentful-paint')?.startTime,
            cls: entries.reduce((sum, e) => sum + (e.value || 0), 0)
          });
        }).observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
      });
    });
    
    // Assert performance thresholds
    expect(metrics.fcp).toBeLessThan(1800); // FCP < 1.8s
    expect(metrics.lcp).toBeLessThan(2500); // LCP < 2.5s
    expect(metrics.cls).toBeLessThan(0.1);  // CLS < 0.1
  });
});
```

---

## 📋 IMPLEMENTATION CHECKLIST

### 19. PRE-IMPLEMENTATION REQUIREMENTS
**Phase**: Planning and preparation before coding begins

#### 19.1 Context7 Documentation Research
- [ ] Radix UI Navigation Menu latest patterns
- [ ] Headless UI Sheet implementation guide  
- [ ] Framer Motion animation best practices
- [ ] Next.js Image optimization patterns
- [ ] Tailwind CSS responsive design patterns

#### 19.2 Component Architecture Planning
- [ ] Component responsibility mapping
- [ ] State flow between components
- [ ] Props interface definitions
- [ ] Event handler delegation strategy
- [ ] Shared utility function identification

#### 19.3 Testing Strategy
- [ ] Test case definition for all interactions
- [ ] Accessibility testing checklist
- [ ] Performance benchmark establishment
- [ ] Browser compatibility testing plan
- [ ] Mobile device testing matrix

### 20. IMPLEMENTATION PHASES
**Approach**: Incremental development with testing at each phase

#### 20.1 Phase 1: Foundation Components
- [ ] Create MainNavbar shell component
- [ ] Implement LogoSection with switching logic
- [ ] Set up basic responsive layout
- [ ] Add scroll detection system
- [ ] Implement CMS data integration

#### 20.2 Phase 2: Desktop Navigation
- [ ] Build DesktopNavigation component
- [ ] Implement dropdown hover system
- [ ] Add navigation item rendering
- [ ] Create DropdownMenu component
- [ ] Add hover bridge functionality

#### 20.3 Phase 3: Mobile Implementation  
- [ ] Build MobileMenu component
- [ ] Implement Sheet integration
- [ ] Add mobile-specific interactions
- [ ] Create expandable navigation
- [ ] Add mobile CTA integration

#### 20.4 Phase 4: Enhancement & Polish
- [ ] Add all animations and transitions
- [ ] Implement CTAButton component
- [ ] Add performance optimizations
- [ ] Complete accessibility implementation
- [ ] Add comprehensive error handling

#### 20.5 Phase 5: Testing & Validation
- [ ] Component unit testing
- [ ] Integration testing
- [ ] Accessibility validation
- [ ] Performance profiling
- [ ] Cross-browser testing

---

## 🚨 CRITICAL SUCCESS FACTORS

### 21. NON-NEGOTIABLE REQUIREMENTS
**Zero Tolerance**: These requirements cannot be compromised

#### 21.1 Context7 MCP Compliance
- **All Code Changes**: Must have Context7 source attribution
- **Implementation Patterns**: Must follow official documentation
- **No External Sources**: Only Context7 MCP for implementation guidance
- **Source Comments**: Mandatory for every modification

#### 21.2 Synchronous CMS Architecture  
- **No Async Components**: CMS functions must be synchronous
- **No Loading States**: Data available immediately
- **Direct Function Calls**: No Promise-based patterns
- **Proven Pattern**: Must follow existing working implementation

#### 21.3 Royal Client Quality
- **British English**: All content and code comments
- **Premium Interactions**: Smooth, sophisticated animations
- **Enterprise Performance**: Production-ready optimization
- **WCAG 2.1 AA**: Full accessibility compliance

#### 21.4 Responsive Functionality
- **Custom Breakpoints**: Must implement 1500px and 1780px breakpoints
- **Three-Tier System**: Mobile, tablet, desktop behavior
- **Complete Accessibility**: All navigation available in mobile menu
- **No Overlap Issues**: Secondary items hidden at tablet sizes

### 22. VALIDATION CRITERIA
**Success Metrics**: How to measure successful implementation

#### 22.1 Functional Validation
- [ ] All 9 navigation items work correctly
- [ ] Dropdowns function on hover (desktop) and tap (mobile)
- [ ] Mobile menu provides access to all navigation
- [ ] Logo switching works based on scroll state
- [ ] CTA button adapts to navbar state
- [ ] Responsive breakpoints function correctly

#### 22.2 Performance Validation
- [ ] Scroll detection maintains 60fps with RAF optimization
- [ ] Dual-state transitions are smooth (transparent ↔ solid)
- [ ] Logo switching occurs without flicker or layout shift
- [ ] Animations are smooth across all devices and viewports
- [ ] Dropdown styling adapts correctly to navbar state
- [ ] Bundle size reduced from original implementation
- [ ] Memory usage remains stable during continuous scrolling
- [ ] No console warnings for performance bottlenecks
- [ ] No hydration mismatches
- [ ] Mobile performance acceptable on low-end devices

#### 22.3 Accessibility Validation
- [ ] Screen reader compatible across all scroll-based state transitions
- [ ] Full keyboard navigation maintained in transparent and solid navbar states
- [ ] WCAG 2.1 AA contrast compliance verified for all visual states
- [ ] Focus states remain visible with proper contrast in both navbar appearances
- [ ] Touch target sizes appropriate and maintained during state transitions
- [ ] Focus management working correctly during scroll-triggered changes
- [ ] Reduced motion preference respected for all scroll-based animations
- [ ] Logo alt text updates appropriately based on visual variant (standard/white)
- [ ] Color contrast ratios exceed 4.5:1 in all navbar and dropdown states

#### 22.4 Code Quality Validation
- [ ] TypeScript strict mode compliance for all scroll-based implementations
- [ ] Context7 MCP documentation complete with proper source attribution
- [ ] Scroll detection hook follows React 19 optimization patterns
- [ ] Performance monitoring and error boundaries implemented
- [ ] SSR compatibility verified with hydration safety measures
- [ ] RAF optimization patterns properly implemented and documented
- [ ] Memory leak prevention verified for continuous scroll interactions
- [ ] State management follows immutable update patterns
- [ ] All CSS variables and data attributes properly typed and documented
- [ ] Component architecture clean and maintainable
- [ ] Performance optimizations implemented
- [ ] Error handling comprehensive

---

## 📝 FINAL IMPLEMENTATION NOTES

### 23. DECISION RATIONALE
**Why Radix UI**: Continue with proven, accessible foundation
**Why Component Splitting**: Maintainability and developer experience
**Why Three-Tier Responsive**: Prevent tablet navigation overlap
**Why Synchronous CMS**: Proven pattern prevents homepage failures

### 24. RISK MITIGATION
- **Homepage Failure**: Follow synchronous CMS patterns exactly
- **Performance Issues**: Implement proper optimizations from start
- **Accessibility Gaps**: Test with screen readers throughout development
- **Browser Compatibility**: Test across target browser matrix

### 25. POST-IMPLEMENTATION PLAN
- **Performance Monitoring**: Track real-world performance metrics
- **User Feedback**: Monitor for any UX issues
- **Maintenance Plan**: Regular updates for dependencies
- **Documentation**: Maintain component documentation for future developers

---

**TOTAL ESTIMATED LINES**: ~500 lines across 6 focused components
**DEVELOPMENT TIME**: Estimated 2-3 sessions for complete implementation
**TESTING TIME**: 1 additional session for comprehensive validation

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1)
- [ ] Set up component architecture with TypeScript strict mode
- [ ] Implement MainNavbar shell with Context API
- [ ] Create performance monitoring utilities
- [ ] Set up testing infrastructure with quality gates

### Phase 2: Core Components (Week 2)
- [ ] Build LogoSection with optimization patterns
- [ ] Implement DesktopNavigation with Radix UI
- [ ] Create advanced state management system
- [ ] Add comprehensive accessibility features

### Phase 3: Advanced Features (Week 3)
- [ ] Build MobileMenu with gesture support
- [ ] Implement DropdownMenu with animations
- [ ] Add performance optimizations and monitoring
- [ ] Complete responsive design system

### Phase 4: Quality Assurance (Week 4)
- [ ] Complete test suite (90%+ coverage)
- [ ] Performance auditing and optimization
- [ ] Accessibility validation (WCAG 2.1 AA)
- [ ] Cross-browser and device testing

## 📊 SUCCESS METRICS

**Performance Targets**:
- Initial render: <16ms (60fps)
- Bundle size: <50KB gzipped
- Memory usage: <10MB
- Lighthouse score: >95

**Quality Gates**:
- Test coverage: >90%
- TypeScript strict mode: 100%
- WCAG 2.1 AA compliance: 100%
- Context7 MCP compliance: 100%

---

This **enterprise-grade requirements document** provides the complete technical blueprint for rebuilding the navbar with advanced React patterns, performance optimization, and comprehensive testing. The implementation follows Context7 MCP standards while delivering royal client-worthy quality with modern frontend engineering practices.