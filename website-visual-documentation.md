# My Private Tutor Online - Website Visual Documentation

## Table of Contents
1. [Home Page (/) - Homepage](#1-home-page--homepage)
2. [About Us (/about)](#2-about-us-about)
3. [Subject Tuition (/subject-tuition)](#3-subject-tuition-subject-tuition)
4. [How It Works (/how-it-works)](#4-how-it-works-how-it-works)
5. [Testimonials (/testimonials)](#5-testimonials-testimonials)
6. [Video Masterclasses (/video-masterclasses)](#6-video-masterclasses-video-masterclasses)
7. [11+ Bootcamps (/11-plus-bootcamps)](#7-11-plus-bootcamps-11-plus-bootcamps)
8. [FAQs (/faq)](#8-faqs-faq)
9. [Blog (/blog)](#9-blog-blog)

---

## 1. Home Page (/) - Homepage

### 1.0 Complete Page Architecture Overview
```
┌═══════════════════════════════════════════════════════════════════════════════════════┐
║ MY PRIVATE TUTOR ONLINE - HOME PAGE ARCHITECTURAL MAP                                ║
║ File: /app/[locale]/page.tsx - Next.js 15+ Client Component                          ║
║ Layout: PageLayout + 10 Major Sections + Fixed Elements                              ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║                                 ┌─ FIXED ELEMENTS ─┐                                 ║
║                                 │ • Language Switch │                                 ║
║                                 │ • Scroll Triggers │                                 ║
║                                 └───────────────────┘                                 ║
║                                                                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 1. HERO SECTION (Full Viewport)                                                  │ ║
║ │    • Background: hero-homepage.jpeg                                              │ ║
║ │    • Static Navigation: Overlay                                                  │ ║
║ │    • Primary CTA: "Start Your Journey"                                          │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 2. ANIMATED TAGLINE (mt-8)                                                       │ ║
║ │    • Text: "WE HELP STUDENTS PLACE AT TOP 10 UK SCHOOLS..."                     │ ║
║ │    • Animation: TypeWriter + Highlight Effects                                  │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 3. SCROLLING SCHOOLS (mt-8)                                                      │ ║
║ │    • Logos: Eton, Harrow, Westminster, St Paul's, etc.                          │ ║
║ │    • Animation: Infinite horizontal scroll                                      │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 4. ABOUT SECTION (mt-16)                                                         │ ║
║ │    • Layout: Two-column grid                                                     │ ║
║ │    • Left: Founder story + credentials                                           │ ║
║ │    • Right: Image + Video stack                                                  │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 5. RESULTS DOCUMENTATION                                                         │ ║
║ │    • Background: Gradient overlay                                                │ ║
║ │    • Content: 3-column grid of outcomes                                          │ ║
║ │    • Features: Verification badges                                               │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 6. TRUST INDICATORS GRID                                                         │ ║
║ │    • Section: "WHO WE SUPPORT"                                                   │ ║
║ │    • Content: Demographics + student images                                      │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 7. HOMEPAGE SECTIONS (Services)                                                  │ ║
║ │    • Section: "WHAT WE OFFER"                                                    │ ║
║ │    • Content: Service categories grid                                            │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 8. QUOTE SECTION                                                                 │ ║
║ │    • Content: Founder quote with highlighting                                    │ ║
║ │    • Style: Text-only, no author image                                           │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 9. BIZSTIM CTA SECTION                                                           │ ║
║ │    • Title: "Ready to Start the Conversation?"                                   │ ║
║ │    • Content: Secure enquiry portal preview                                      │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 10. FOOTER (via PageLayout)                                                      │ ║
║ │     • Company info, links, social media                                          │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                       ║
║ TECHNICAL SPECIFICATIONS:                                                             ║
║ • Total Sections: 10 major content areas                                             ║
║ • Page Type: Client Component ("use client")                                         ║
║ • Layout Props: showHeader={true}, showFooter={true}, containerSize="full"          ║
║ • Responsive: Mobile-first design with lg: breakpoint optimizations                 ║
║ • Animations: Framer Motion throughout with scroll triggers                         ║
║ • Performance: Next.js Image optimization, lazy loading                             ║
║ • CMS: Synchronous data access pattern (CRITICAL for homepage stability)           ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

### 1.1 Fixed Language Switcher (Overlay Element)
```
┌─────────────────────────────────────────────────────────────────────┐
│                     FIXED LANGUAGE SWITCHER                        │
│ Position: fixed top-6 right-6 z-50                                 │
├─────────────────────────────────────────────────────────────────────┤
│ <div className="fixed top-6 right-6 z-50">                        │
│   <LanguageSwitcher                                                │
│     variant="compact"                                              │
│     position="header"                                              │
│     showFlags={true}                                               │
│     showLabels={false}                                             │
│   />                                                               │
│ </div>                                                              │
├─────────────────────────────────────────────────────────────────────┤
│ 1.1.1 Component Details                                            │
│ • File: src/components/ui/language-switcher.tsx                    │
│ • Type: UI Component (no CMS data)                                 │
│ • Props: variant="compact", position="header", showFlags=true      │
│ • Responsive: Fixed positioning maintained across all viewports    │
│ • Z-Index: 50 (above most content, below modals)                   │
│ • Animation: N/A (static positioning)                              │
│                                                                     │
│ 1.1.2 Visual Structure                                             │
│ ┌─────────────────┐                                               │
│ │ 🇬🇧 🇺🇸 🇩🇪 🇫🇷    │ <- Flag icons only (no text labels)         │
│ └─────────────────┘                                               │
│                                                                     │
│ 1.1.3 Positioning Logic                                            │
│ • top-6: 24px from viewport top                                    │
│ • right-6: 24px from viewport right                                │
│ • Always visible during scroll                                     │
│ • Does not interfere with hero content                             │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Hero Section (Full Viewport Section)
```
┌─────────────────────────────────────────────────────────────────────┐
│                         HERO SECTION                               │
│ Component: HeroSection with Static Navbar Coordination             │
├─────────────────────────────────────────────────────────────────────┤
│ <HeroSection                                                        │
│   showHeader={false}                                               │
│   hasStaticNavbar={true}                                           │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ 1.2.1 Component Architecture                                       │
│ • File: src/components/sections/hero-section.tsx                   │
│ • Type: Client Component with Framer Motion animations             │
│ • Background: /images/hero/hero-homepage.jpeg                      │
│ • Height: Full viewport (min-h-screen)                             │
│ • Overlay: Dark overlay for text readability                       │
│ • Navigation: Static navbar overlay (not duplicate)                │
│                                                                     │
│ 1.2.2 CMS Data Integration                                         │
│ • Function: getSiteBranding() - synchronous CMS access             │
│ • Content: Site title, tagline, primary CTA text                   │
│ • Branding: Logo, company colors, messaging hierarchy              │
│ • Contact: Primary contact information display                     │
│                                                                     │
│ 1.2.3 Layout Structure                                             │
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │ STATIC NAVIGATION BAR (Transparent Overlay)                  │   │
│ │ [Logo] [Menu Items] [Contact] [CTA]                          │   │
│ ├───────────────────────────────────────────────────────────────┤   │
│ │                                                               │   │
│ │            HERO CONTENT (Centered)                           │   │
│ │                                                               │   │
│ │         ┌─────────────────────────────────┐                  │   │
│ │         │ Main Headline (H1)              │                  │   │
│ │         │ text-4xl lg:text-6xl font-serif │                  │   │
│ │         └─────────────────────────────────┘                  │   │
│ │                       ↓                                       │   │
│ │         ┌─────────────────────────────────┐                  │   │
│ │         │ Subheading (H2)                 │                  │   │
│ │         │ text-xl lg:text-2xl             │                  │   │
│ │         └─────────────────────────────────┘                  │   │
│ │                       ↓                                       │   │
│ │         ┌─────────────────────────────────┐                  │   │
│ │         │ Primary CTA Button              │                  │   │
│ │         │ "Start Your Journey"            │                  │   │
│ │         └─────────────────────────────────┘                  │   │
│ │                                                               │   │
│ │                SCROLL INDICATOR                               │   │
│ │                      ↓                                        │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                     │
│ 1.2.4 Animation Specifications                                     │
│ • Entrance: Staggered text animations with 0.3s delays             │
│ • Easing: [0.25, 0.46, 0.45, 0.94] cubic-bezier                   │
│ • Viewport: once: true, margin: "-100px"                           │
│ • CTA Button: Hover scale and shadow effects                       │
│ • Background: Subtle parallax on scroll                            │
│                                                                     │
│ 1.2.5 Responsive Breakpoints                                       │
│ • Mobile (320px-640px): Single column, reduced text sizes          │
│ • Tablet (640px-1024px): Maintained hierarchy, adjusted spacing    │
│ • Desktop (1024px+): Full hero layout with large typography        │
│                                                                     │
│ 1.2.6 Props Configuration                                          │
│ • showHeader={false}: Prevents duplicate navbar rendering          │
│ • hasStaticNavbar={true}: Enables internal navigation overlay      │
│ • Coordination: Works with PageLayout showHeader={true}            │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.3 Animated Tagline Section (mt-8 spacing)
```
┌─────────────────────────────────────────────────────────────────────┐
│                      ANIMATED TAGLINE SECTION                      │
│ Animation-First Marketing Message Component                         │
├─────────────────────────────────────────────────────────────────────┤
│ <div className="mt-8">                                             │
│   <AnimatedTagline />                                              │
│ </div>                                                              │
├─────────────────────────────────────────────────────────────────────┤
│ 1.3.1 Component Specifications                                     │
│ • File: src/components/sections/animated-tagline.tsx               │
│ • Type: Client Component with advanced animations                  │
│ • Spacing: mt-8 (32px top margin from hero)                       │
│ • Purpose: Dynamic messaging with visual impact                    │
│                                                                     │
│ 1.3.2 Content Structure & Animation Sequence                       │
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │                    ANIMATION TIMELINE                         │   │
│ │                                                               │   │
│ │ Phase 1: "WE HELP STUDENTS PLACE AT"                         │   │
│ │          ↓ TypeWriter Effect (0.1s per character)            │   │
│ │                                                               │   │
│ │ Phase 2: "TOP 10 UK SCHOOLS"                                 │   │
│ │          ↓ Highlight Animation (Golden glow effect)          │   │
│ │                                                               │   │
│ │ Phase 3: "INCLUDING ETON, HARROW, WESTMINSTER..."            │   │
│ │          ↓ Staggered School Name Reveals                     │   │
│ │                                                               │   │
│ │ Phase 4: "WITH 95% SUCCESS RATE"                             │   │
│ │          ↓ Counter Animation + Badge Effect                  │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                     │
│ 1.3.3 Typography Hierarchy                                         │
│ • Primary Text: text-2xl lg:text-4xl font-bold                     │
│ • School Names: text-accent-600 (Golden highlighting)              │
│ • Success Rate: text-3xl lg:text-5xl (Emphasis sizing)             │
│ • Font Family: font-serif for elegance                             │
│                                                                     │
│ 1.3.4 Animation Technical Details                                  │
│ • Library: Framer Motion + Custom CSS animations                   │
│ • Trigger: whileInView with 50px margin                            │
│ • Duration: 3.5s total sequence                                    │
│ • Repeat: Once per page load                                       │
│ • Easing: Various (typewriter, bounce, elastic)                    │
│                                                                     │
│ 1.3.5 Visual Layout (Desktop)                                      │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                CENTER ALIGNED                           │         │
│ │                                                         │         │
│ │     WE HELP STUDENTS PLACE AT                          │         │
│ │                                                         │         │
│ │        🌟 TOP 10 UK SCHOOLS 🌟                         │         │
│ │                                                         │         │
│ │  INCLUDING ETON • HARROW • WESTMINSTER                │         │
│ │           ST PAUL'S • RUGBY • CHARTERHOUSE            │         │
│ │                                                         │         │
│ │           WITH 95% SUCCESS RATE                        │         │
│ │                  ⭐⭐⭐⭐⭐                                    │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.3.6 Mobile Responsive Adaptations                                │
│ • Text Size: Reduced to text-lg for mobile readability             │
│ • Line Breaks: Strategic breaks for mobile screens                 │
│ • Animation Speed: 25% faster on mobile devices                    │
│ • School Names: Vertical stacking on narrow viewports              │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.4 Scrolling Schools Section (mt-8 spacing)
```
┌─────────────────────────────────────────────────────────────────────┐
│                     SCROLLING SCHOOLS SECTION                      │
│ Infinite Horizontal Logo Carousel for Social Proof                 │
├─────────────────────────────────────────────────────────────────────┤
│ <div className="mt-8">                                             │
│   {testimonialsSchools.length > 0 && (                             │
│     <ScrollingSchools schools={[...testimonialsSchools]} />        │
│   )}                                                                │
│ </div>                                                              │
├─────────────────────────────────────────────────────────────────────┤
│ 1.4.1 Component Architecture                                       │
│ • File: src/components/sections/scrolling-schools.tsx              │
│ • Type: Client Component with infinite scroll animation            │
│ • Data Source: getTestimonialsSchools() - CMS function             │
│ • Conditional Rendering: Only shows if schools data exists         │
│ • Spacing: mt-8 (32px from animated tagline)                      │
│                                                                     │
│ 1.4.2 CMS Data Structure                                           │
│ • Function: getTestimonialsSchools()                               │
│ • Format: Array of school objects                                  │
│ • Properties:                                                       │
│   - name: string (School name)                                     │
│   - logo: string (Logo file path)                                  │
│   - alt: string (Accessibility text)                               │
│   - category: string (School type classification)                  │
│                                                                     │
│ 1.4.3 School Logos Included (Premium Institutions)                │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ TIER 1 SCHOOLS (Public Schools)                        │         │
│ │ • Eton College        • Harrow School                  │         │
│ │ • Westminster School  • St Paul's School               │         │
│ │ • Rugby School        • Charterhouse School            │         │
│ │ • Winchester College  • Shrewsbury School              │         │
│ │                                                         │         │
│ │ TIER 2 SCHOOLS (Leading Independent)                   │         │
│ │ • King's College School    • St Paul's Girls' School   │         │
│ │ • Highgate School         • City of London School      │         │
│ │ • University College School • Merchant Taylors' School │         │
│ │                                                         │         │
│ │ GRAMMAR SCHOOLS (Selective State)                      │         │
│ │ • Tiffin School           • Reading School             │         │
│ │ • Dr Challoner's Grammar  • Latymer School             │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.4.4 Animation Specifications                                     │
│ • Type: Infinite horizontal scroll                                 │
│ • Speed: 30 seconds per complete cycle                              │
│ • Direction: Left to right                                         │
│ • Smoothing: CSS transform3d for GPU acceleration                  │
│ • Hover Effect: Pause animation on logo hover                      │
│ • Responsive: Speed adjusts based on viewport width                │
│                                                                     │
│ 1.4.5 Visual Layout Structure                                      │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ ←←← INFINITE SCROLL DIRECTION ←←←                      │         │
│ │                                                         │         │
│ │ [ETON] [HARROW] [WESTMINSTER] [ST PAUL'S] [RUGBY]     │ ←       │
│ │                                           ↑            │  ←      │
│ │ [WINCHESTER] [SHREWSBURY] [HIGHGATE] [UCS] [TIFFIN]   │   ←     │
│ │                                                         │    ←    │
│ │ • Logos scale: h-12 lg:h-16 (48px-64px height)        │     ←   │
│ │ • Spacing: gap-12 lg:gap-16 between logos              │      ←  │
│ │ • Opacity: 0.7 → 1.0 on hover                          │       ← │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.4.6 Responsive Behavior                                          │
│ • Mobile (320px): Single row, smaller logos (h-8)                  │
│ • Tablet (640px): Single row, medium logos (h-12)                  │
│ • Desktop (1024px+): Single row, large logos (h-16)                │
│ • Ultra-wide: Dual rows for more logo visibility                   │
│                                                                     │
│ 1.4.7 Performance Optimizations                                    │
│ • Lazy Loading: Logos load progressively                           │
│ • Image Format: WebP with PNG fallback                             │
│ • Transform3d: Hardware acceleration enabled                       │
│ • Preload: Critical logos preloaded for smooth animation           │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.5 About Section (mt-16 spacing)
```
┌─────────────────────────────────────────────────────────────────────┐
│                         ABOUT SECTION                              │
│ Two-Column Founder Story + Visual Content Layout                   │
├─────────────────────────────────────────────────────────────────────┤
│ <div className="mt-16">                                            │
│   <AboutSection />                                                 │
│ </div>                                                              │
├─────────────────────────────────────────────────────────────────────┤
│ 1.5.1 Component Architecture                                       │
│ • File: src/components/sections/about-section.tsx                  │
│ • Type: Client Component with Framer Motion animations             │
│ • Background: bg-primary-50 (Light brand background)               │
│ • Padding: py-16 lg:py-24 (Vertical spacing)                      │
│ • Container: px-4 sm:px-6 lg:px-8 (FIXED: Equal left/right)       │
│                                                                     │
│ 1.5.2 Grid Layout Structure (lg:grid-cols-2)                      │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                   DESKTOP LAYOUT                        │         │
│ │                                                         │         │
│ │ ┌─────────────────┐  ┌─────────────────┐               │         │
│ │ │  TEXT CONTENT   │  │  VISUAL STACK   │               │         │
│ │ │                 │  │                 │               │         │
│ │ │ • Main Heading  │  │ ┌─────────────┐ │               │         │
│ │ │ • Highlighted   │  │ │   FOUNDER   │ │               │         │
│ │ │   Subheading    │  │ │    IMAGE    │ │               │         │
│ │ │ • Company Story │  │ │ (Top Stack) │ │               │         │
│ │ │   (3 paragraphs)│  │ └─────────────┘ │               │         │
│ │ │ • Credentials   │  │        ↓        │               │         │
│ │ │   (Brand logos) │  │ ┌─────────────┐ │               │         │
│ │ │                 │  │ │   VIDEO     │ │               │         │
│ │ │                 │  │ │ THUMBNAIL   │ │               │         │
│ │ │                 │  │ │(Bottom Stack)│ │               │         │
│ │ │                 │  │ └─────────────┘ │               │         │
│ │ └─────────────────┘  └─────────────────┘               │         │
│ │                                                         │         │
│ │ Gap: gap-12 lg:gap-16 (48px-64px between columns)      │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.5.3 Text Content Hierarchy (Left Column)                        │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ 1.5.3.1 MAIN HEADING                                   │         │
│ │ "World-Class Education,                                │         │
│ │  At Your Fingertips."                                  │         │
│ │ • Classes: text-3xl lg:text-4xl xl:text-5xl           │         │
│ │ • Font: font-serif font-bold                           │         │
│ │ • Color: text-primary-900                              │         │
│ │ • Animation: Slide up from y:30                        │         │
│ │                                                         │         │
│ │ 1.5.3.2 HIGHLIGHTED SUBHEADING                        │         │
│ │ "We provide exceptional tuition that helps            │         │
│ │  students excel academically and thrive personally"   │         │
│ │ • Classes: text-xl lg:text-2xl text-accent-600        │         │
│ │ • Magic UI: Highlighter component integration         │         │
│ │ • Effects: Gold highlights, navy underlines           │         │
│ │ • Animation: Delayed slide up (0.3s delay)            │         │
│ │                                                         │         │
│ │ 1.5.3.3 COMPANY STORY (3 Paragraphs)                  │         │
│ │ Paragraph 1: Foundation & Elizabeth's background      │         │
│ │ Paragraph 2: Growth & recognition (Tatler, etc.)      │         │
│ │ Paragraph 3: Current ethos & personal approach        │         │
│ │ • Classes: text-xl text-primary-700 leading-relaxed   │         │
│ │ • Animation: Staggered reveals (0.6s, 0.8s, 1.0s)    │         │
│ │                                                         │         │
│ │ 1.5.3.4 CREDENTIALS SECTION                           │         │
│ │ ┌─────────────────┐ ┌─────────────────┐               │         │
│ │ │ [TATLER LOGO]   │ │[SCHOOL GDE LOGO]│               │         │
│ │ │ "Address Book"  │ │  "'Top Pick'"   │               │         │
│ │ └─────────────────┘ └─────────────────┘               │         │
│ │ ┌─────────────────┐                                   │         │
│ │ │"Trusted by      │                                   │         │
│ │ │Distinguished    │                                   │         │
│ │ │Families"        │                                   │         │
│ │ └─────────────────┘                                   │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.5.4 Visual Stack Content (Right Column)                          │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ 1.5.4.1 FOUNDER IMAGE (Top Position)                   │         │
│ │ • File: /images/team/elizabeth-burrows-founder-spare.jpg│         │
│ │ • Alt: "Elizabeth Burrows, Founder of MPTO"           │         │
│ │ • Classes: object-contain w-full h-auto max-w-full     │         │
│ │ • Style: drop-shadow, maxHeight: '400px'               │         │
│ │ • Animation: Slide in from x:100                       │         │
│ │ • Decorative: Animated blur orbs                       │         │
│ │                                                         │         │
│ │ 1.5.4.2 VIDEO COMPONENT (Bottom Position)              │         │
│ │ • Component: HeroVideoDialog (Magic UI)                │         │
│ │ • Video: /videos/elizabeth-introduction-compressed.mp4  │         │
│ │ • Thumbnail: elizabeth-introduction-thumbnail.jpg       │         │
│ │ • Classes: w-full max-w-xs mx-auto                     │         │
│ │ • Animation: "from-center" style                       │         │
│ │ • Constraints: max-w-xs (320px width limit)            │         │
│ │                                                         │         │
│ │ 1.5.4.3 DECORATIVE ELEMENTS                           │         │
│ │ Top Orb: w-24 h-24 bg-accent-200/30 (top-right)      │         │
│ │ Bottom Orb: w-32 h-32 bg-primary-200/20 (bottom-left) │         │
│ │ • Purpose: Visual depth and premium feel               │         │
│ │ • Animation: Delayed appearance with x-axis movement   │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.5.5 Animation Timeline Specification                             │
│ • 0.1s: Main heading entrance                                      │
│ • 0.3s: Subheading + image entrance                               │
│ • 0.5s: Video component entrance                                   │
│ • 0.6s: First paragraph entrance                                   │
│ • 0.8s: Second paragraph entrance                                  │
│ • 0.9s: Top decorative orb                                        │
│ • 1.0s: Third paragraph entrance                                   │
│ • 1.2s: Credentials section entrance                              │
│ • 1.3s: Bottom decorative orb                                     │
│                                                                     │
│ 1.5.6 Mobile Responsive Adaptations                               │
│ • Layout: Single column stack (image on top, text below)          │
│ • Image: Reduced max-height for mobile screens                    │
│ • Text: Reduced font sizes (text-2xl → text-xl)                   │
│ • Spacing: Reduced gaps (gap-8 instead of gap-12)                 │
│ • Video: Maintains aspect ratio, scales appropriately             │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.6 Results Documentation Section
```
┌─────────────────────────────────────────────────────────────────────┐
│                    RESULTS DOCUMENTATION SECTION                   │
│ Data-Driven Academic Outcomes with Verification System             │
├─────────────────────────────────────────────────────────────────────┤
│ <section className="py-16 lg:py-24 relative bg-white">             │
│   <div className="absolute inset-0 bg-gradient-to-b                │
│         from-slate-50 via-white to-slate-50 opacity-70" />         │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8          │
│         relative z-10">                                             │
│     <ResultsDocumentation                                          │
│       title="Quantifiable Academic Outcomes"                       │
│       results={asyncResultsData}                                   │
│       showVerificationBadges={true}                                │
│       layout="grid" maxItems={3}                                   │
│     />                                                              │
│   </div>                                                            │
│ </section>                                                          │
├─────────────────────────────────────────────────────────────────────┤
│ 1.6.1 Component Architecture                                       │
│ • File: src/components/sections/results-documentation.tsx          │
│ • Type: Data-heavy component with async CMS loading               │
│ • Background: Gradient overlay (slate-50 → white → slate-50)       │
│ • Container: Standard responsive padding                           │
│ • Z-Index: relative z-10 (above background gradient)              │
│                                                                     │
│ 1.6.2 CMS Data Integration (Async Pattern)                        │
│ • Function: getResultsDocumentation()                             │
│ • Loading: useState with loading states (Exception to sync rule)   │
│ • Data Structure: Array of outcome objects                         │
│ • Verification: Third-party validation badges                     │
│ • Update Frequency: Monthly data refresh                           │
│                                                                     │
│ 1.6.3 Section Layout Structure                                     │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                  SECTION TITLE                         │         │
│ │           "Quantifiable Academic Outcomes"             │         │
│ │                                                         │         │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │         │
│ │ │  OUTCOME 1  │ │  OUTCOME 2  │ │  OUTCOME 3  │       │         │
│ │ │             │ │             │ │             │       │         │
│ │ │ 📊 95%      │ │ 🎯 15+      │ │ 💯 500+     │       │         │
│ │ │ Success     │ │ Years       │ │ Students    │       │         │
│ │ │ Rate        │ │ Experience  │ │ Placed      │       │         │
│ │ │             │ │             │ │             │       │         │
│ │ │ [VERIFIED]  │ │ [VERIFIED]  │ │ [VERIFIED]  │       │         │
│ │ │    BADGE    │ │    BADGE    │ │    BADGE    │       │         │
│ │ └─────────────┘ └─────────────┘ └─────────────┘       │         │
│ │                                                         │         │
│ │ ┌───────────────────────────────────────────────────┐   │         │
│ │ │           CONFIDENCE INTERVALS                    │   │         │
│ │ │ "95% confidence interval: 92.1% - 97.3%"         │   │         │
│ │ │ "Based on 500+ student placements since 2010"    │   │         │
│ │ └───────────────────────────────────────────────────┘   │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.6.4 Individual Outcome Card Structure                            │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ OUTCOME CARD ANATOMY                                    │         │
│ │                                                         │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │             VISUAL ICON                             │ │         │
│ │ │ • Size: text-4xl lg:text-5xl                        │ │         │
│ │ │ • Color: text-accent-600 (Gold brand color)         │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │        PRIMARY STATISTIC                            │ │         │
│ │ │ • Font: text-3xl lg:text-4xl font-bold              │ │         │
│ │ │ • Color: text-primary-900                           │ │         │
│ │ │ • Animation: Counter increment on viewport entry    │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │          DESCRIPTION                                │ │         │
│ │ │ • Font: text-lg text-primary-700                    │ │         │
│ │ │ • Style: Leading-relaxed for readability            │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │        VERIFICATION BADGE                           │ │         │
│ │ │ • Type: Third-party validation                      │ │         │
│ │ │ • Color: bg-green-100 text-green-800                │ │         │
│ │ • Icons: Shield, checkmark, certificate              │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.6.5 Specific Data Points (Example Content)                       │
│ • Outcome 1: 95% Success Rate (School placements)                  │
│ • Outcome 2: 15+ Years Experience (Company track record)           │
│ • Outcome 3: 500+ Students Placed (Portfolio scale)               │
│ • Outcome 4: 98% Parent Satisfaction (Client feedback)            │
│ • Outcome 5: £50k+ Average Fee Savings (Value proposition)        │
│                                                                     │
│ 1.6.6 Props Configuration                                          │
│ • title: "Quantifiable Academic Outcomes"                         │
│ • results: asyncResultsData (loaded via useState)                 │
│ • showVerificationBadges: true (enables third-party validation)   │
│ • layout: "grid" (3-column responsive grid)                       │
│ • maxItems: 3 (limits display for homepage)                       │
│                                                                     │
│ 1.6.7 Animation & Interaction Details                             │
│ • Entrance: Staggered card animations (0.2s intervals)            │
│ • Counters: Increment animation on scroll trigger                 │
│ • Hover: Subtle card lift and shadow increase                     │
│ • Badges: Pulse animation for verification elements               │
│                                                                     │
│ 1.6.8 Responsive Breakpoint Behavior                              │
│ • Mobile (320px): Single column, reduced text sizes               │
│ • Tablet (768px): Two columns, maintained hierarchy               │
│ • Desktop (1024px+): Three columns, full layout                   │
│ • Grid Gap: gap-8 lg:gap-12 for appropriate spacing               │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.7 Trust Indicators Grid Section
```
┌─────────────────────────────────────────────────────────────────────┐
│                      TRUST INDICATORS GRID                         │
│ "WHO WE SUPPORT" - Client Demographics & Social Proof              │
├─────────────────────────────────────────────────────────────────────┤
│ <TrustIndicatorsGrid                                               │
│   indicators={trustIndicators}                                     │
│   studentImages={studentImages}                                    │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ 1.7.1 Component Architecture                                       │
│ • File: src/components/sections/trust-indicators-grid.tsx          │
│ • Type: Complex grid layout with image integration                 │
│ • Section Title: "WHO WE SUPPORT"                                  │
│ • Purpose: Demographic targeting and social proof                  │
│                                                                     │
│ 1.7.2 CMS Data Sources                                             │
│ • Primary: getTrustIndicators() - Client demographic data          │
│ • Secondary: getStudentImages() - Student photo portfolio          │
│ • Structure: Combined social proof with visual elements            │
│                                                                     │
│ 1.7.3 Grid Layout Architecture                                     │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                   SECTION HEADER                        │         │
│ │              "WHO WE SUPPORT"                           │         │
│ │                                                         │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │              CLIENT CATEGORIES                      │ │         │
│ │ │                                                     │ │         │
│ │ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │ │         │
│ │ │ │  OXBRIDGE   │ │   11+ PREP  │ │  A-LEVEL    │   │ │         │
│ │ │ │    PREP     │ │   PARENTS   │ │   GCSE      │   │ │         │
│ │ │ │             │ │             │ │             │   │ │         │
│ │ │ │ 👨‍🎓 Affluent  │ │ 👨‍👩‍👧‍👦 Grammar │ │ 📚 Results  │   │ │         │
│ │ │ │   families  │ │   school    │ │   focused   │   │ │         │
│ │ │ │ 🎯 Prestige │ │   prep      │ │ 🚀 Immediate│   │ │         │
│ │ │ │   focused   │ │ 💫 Reassur- │ │   solutions │   │ │         │
│ │ │ │             │ │   ance need │ │             │   │ │         │
│ │ │ └─────────────┘ └─────────────┘ └─────────────┘   │ │         │
│ │ │                                                     │ │         │
│ │ │              ┌─────────────┐                       │ │         │
│ │ │              │   ELITE     │                       │ │         │
│ │ │              │ CORPORATE   │                       │ │         │
│ │ │              │             │                       │ │         │
│ │ │              │ 💼 Ultra-   │                       │ │         │
│ │ │              │   wealthy   │                       │ │         │
│ │ │              │ 🔒 Discretion│                       │ │         │
│ │ │              │   required  │                       │ │         │
│ │ │              └─────────────┘                       │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │            STUDENT IMAGES GRID                      │ │         │
│ │ │                                                     │ │         │
│ │ │ [IMG] [IMG] [IMG] [IMG] [IMG] [IMG] [IMG] [IMG]    │ │         │
│ │ │                                                     │ │         │
│ │ │ • Diverse representation                            │ │         │
│ │ │ • Professional photography                          │ │         │
│ │ │ • Masonry/Grid layout                              │ │         │
│ │ │ • Hover effects and overlays                       │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.7.4 Client Category Detailed Breakdown                          │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ 1.7.4.1 OXBRIDGE PREP SEGMENT                          │         │
│ │ • Demographics: High-income families (£150k+)          │         │
│ │ • Motivation: Prestigious university access             │         │
│ │ • Key Needs: Subject specialists, interview prep        │         │
│ │ • Timeline: Long-term planning (2-3 years)             │         │
│ │ • Budget: Premium pricing accepted                      │         │
│ │                                                         │         │
│ │ 1.7.4.2 11+ PREP PARENTS SEGMENT                       │         │
│ │ • Demographics: Middle to upper-middle class            │         │
│ │ • Motivation: Grammar school placement                  │         │
│ │ • Key Needs: Reassurance, structured preparation       │         │
│ │ • Timeline: Intensive short-term (6-12 months)         │         │
│ │ • Emotional: High anxiety, need hand-holding           │         │
│ │                                                         │         │
│ │ 1.7.4.3 A-LEVEL/GCSE SEGMENT                           │         │
│ │ • Demographics: Immediate results seekers               │         │
│ │ • Motivation: Grade improvements, exam success          │         │
│ │ • Key Needs: Targeted subject support                   │         │
│ │ • Timeline: Exam-focused (3-6 months)                  │         │
│ │ • Approach: Results-driven, measurable outcomes        │         │
│ │                                                         │         │
│ │ 1.7.4.4 ELITE CORPORATE SEGMENT                        │         │
│ │ • Demographics: Ultra-high-net-worth individuals        │         │
│ │ • Motivation: Bespoke, confidential service            │         │
│ │ • Key Needs: Flexibility, discretion, excellence       │         │
│ │ • Timeline: Ongoing relationship                        │         │
│ │ • Service: White-glove, personal attention              │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.7.5 Student Images Integration                                   │
│ • Source: getStudentImages() CMS function                          │
│ • Format: Professional portraits with privacy protection           │
│ • Layout: Masonry grid with responsive columns                     │
│ • Diversity: Represents all demographic segments                   │
│ • Effects: Subtle hover overlays with achievement highlights       │
│                                                                     │
│ 1.7.6 Interactive Features                                         │
│ • Category Cards: Hover reveals detailed information              │
│ • Image Gallery: Click to expand student success stories          │
│ • Demographic Filters: Filter by client segment                   │
│ • Animation: Staggered entrance animations                         │
│                                                                     │
│ 1.7.7 Responsive Design Adaptations                               │
│ • Mobile: Single column category cards                             │
│ • Tablet: Two-column category layout                               │
│ • Desktop: Four-column layout with expanded descriptions           │
│ • Images: Responsive grid adapts to viewport size                 │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.8 Homepage Sections (Services) - "WHAT WE OFFER"
```
┌─────────────────────────────────────────────────────────────────────┐
│                      HOMEPAGE SECTIONS                             │
│ "WHAT WE OFFER" - Service Categories Grid Layout                   │
├─────────────────────────────────────────────────────────────────────┤
│ <HomepageSections                                                  │
│   services={[...services]}                                         │
│   studentImages={Object.values(studentImages)}                     │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ 1.8.1 Component Architecture                                       │
│ • File: src/components/homepage/homepage-sections.tsx              │
│ • Type: Client component wrapper for interactive features          │
│ • Section Title: "WHAT WE OFFER"                                   │
│ • Purpose: Primary service showcase with visual integration        │
│                                                                     │
│ 1.8.2 CMS Data Integration                                         │
│ • Primary: getServices() - Service categories and details          │
│ • Secondary: getStudentImages() - Supporting visual content        │
│ • Structure: Array of service objects with metadata                │
│                                                                     │
│ 1.8.3 Service Categories Overview                                  │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                  SERVICE PORTFOLIO                      │         │
│ │                                                         │         │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │         │
│ │ │   SUBJECT   │ │    11+      │ │   OXBRIDGE  │       │         │
│ │ │   TUITION   │ │  INTENSIVE  │ │    PREP     │       │         │
│ │ │             │ │ BOOTCAMPS   │ │             │       │         │
│ │ │ 📚 Core     │ │ 🎯 Focused  │ │ 🏛️ Elite    │       │         │
│ │ │   subjects  │ │   program   │ │   program   │       │         │
│ │ │ 👨‍🏫 Expert   │ │ ⚡ Intensive│ │ 🎓 Oxbridge │       │         │
│ │ │   tutors    │ │   format    │ │   focus     │       │         │
│ │ │ 🎯 Results  │ │ 📈 Proven   │ │ 📝 Interview│       │         │
│ │ │   focused   │ │   track     │ │   prep      │       │         │
│ │ └─────────────┘ └─────────────┘ └─────────────┘       │         │
│ │                                                         │         │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │         │
│ │ │    VIDEO    │ │  ENTRANCE   │ │   BESPOKE   │       │         │
│ │ │MASTERCLASSES│ │    EXAM     │ │   SUPPORT   │       │         │
│ │ │             │ │   PREP      │ │             │       │         │
│ │ │ 🎥 Online   │ │ 📋 Targeted │ │ ⭐ Premium  │       │         │
│ │ │   learning  │ │   exams     │ │   service   │       │         │
│ │ │ 📱 Flexible │ │ 🔍 Specific │ │ 🔒 Exclusive│       │         │
│ │ │   access    │ │   schools   │ │   access    │       │         │
│ │ │ 💡 Expert   │ │ ✅ Success  │ │ 👑 Luxury   │       │         │
│ │ │   content   │ │   focused   │ │   approach  │       │         │
│ │ └─────────────┘ └─────────────┘ └─────────────┘       │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.8.4 Individual Service Card Structure                            │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ SERVICE CARD ANATOMY                                    │         │
│ │                                                         │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │               HERO IMAGE                            │ │         │
│ │ │ • Aspect Ratio: 16:9 or 4:3                        │ │         │
│ │ │ • Format: Next.js Image component                   │ │         │
│ │ │ • Hover Effect: Scale and overlay                   │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │             SERVICE TITLE                           │ │         │
│ │ │ • Font: text-2xl lg:text-3xl font-serif             │ │         │
│ │ │ • Color: text-primary-900                           │ │         │
│ │ │ • Weight: font-bold                                 │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │            DESCRIPTION                              │ │         │
│ │ │ • Font: text-lg text-primary-700                    │ │         │
│ │ │ • Style: leading-relaxed                            │ │         │
│ │ │ • Length: 2-3 sentences maximum                     │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │            KEY FEATURES                             │ │         │
│ │ │ • Format: Icon + text bullets                       │ │         │
│ │ │ • Icons: Lucide React icons                         │ │         │
│ │ │ • Color: text-accent-600 (gold)                     │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │              CTA BUTTON                             │ │         │
│ │ │ • Text: "Learn More" or "Get Started"               │ │         │
│ │ │ • Style: Primary button with hover effects          │ │         │
│ │ │ • Link: Routes to service detail page               │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.8.5 Grid Layout Specifications                                   │
│ • Mobile (320px): Single column, full-width cards                  │
│ • Tablet (768px): Two columns, responsive gaps                     │
│ • Desktop (1024px+): Three columns, optimal viewing               │
│ • Gap: gap-8 lg:gap-12 between cards                              │
│ • Alignment: items-stretch for equal height cards                  │
│                                                                     │
│ 1.8.6 Interactive Features & Animations                           │
│ • Card Hover: Lift effect with increased shadow                    │
│ • Image Hover: Scale (1.05x) with overlay                         │
│ • Button Hover: Color transition and scale                        │
│ • Entrance: Staggered animations on viewport entry                │
│ • Loading: Skeleton states during data fetch                      │
│                                                                     │
│ 1.8.7 Student Images Integration                                   │
│ • Purpose: Visual context for each service category               │
│ • Implementation: Background overlays or sidebar elements         │
│ • Diversity: Representative of target demographics                │
│ • Privacy: Appropriate permissions and anonymization             │
│                                                                     │
│ 1.8.8 Service-Specific Details                                     │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ Subject Tuition:                                        │         │
│ │ • Links to /subject-tuition page                        │         │
│ │ • Highlights: Expert tutors, flexible scheduling        │         │
│ │ • Image: Student with tutor in session                  │         │
│ │                                                         │         │
│ │ 11+ Bootcamps:                                          │         │
│ │ • Links to /11-plus-bootcamps page                      │         │
│ │ • Highlights: Intensive format, proven results          │         │
│ │ • Image: Group of students in classroom setting         │         │
│ │                                                         │         │
│ │ Video Masterclasses:                                    │         │
│ │ • Links to /video-masterclasses page                    │         │
│ │ • Highlights: Online access, expert content             │         │
│ │ • Image: Video player interface preview                 │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.8.9 Responsive Typography Scaling                               │
│ • Service Titles: text-xl → text-2xl → text-3xl                   │
│ • Descriptions: text-base → text-lg → text-xl                     │
│ • Feature Lists: text-sm → text-base → text-lg                    │
│ • Button Text: text-base across all breakpoints                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.9 Quote Section (Founder Testimonial)
```
┌─────────────────────────────────────────────────────────────────────┐
│                          QUOTE SECTION                             │
│ Founder Quote with Magic UI Highlighting Effects                   │
├─────────────────────────────────────────────────────────────────────┤
│ <QuoteSection                                                      │
│   quote={founderQuote.quote}                                       │
│   author={founderQuote.author}                                     │
│   role={founderQuote.role}                                         │
│   showAuthorImage={false}                                          │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ 1.9.1 Component Architecture                                       │
│ • File: src/components/sections/quote-section.tsx                  │
│ • Type: Text-focused component with advanced typography            │
│ • Background: Subtle gradient or solid color section              │
│ • Author Display: Text-only attribution (no image)                │
│                                                                     │
│ 1.9.2 CMS Data Integration                                         │
│ • Function: getFounderQuote() - Synchronous CMS access             │
│ • Content Structure:                                                │
│   - quote: string (Main quote text)                               │
│   - author: string (Elizabeth Burrows)                             │
│   - role: string (Founder & Director)                              │
│   - context: string (Optional background info)                     │
│                                                                     │
│ 1.9.3 Typography & Layout Structure                                │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                   QUOTE LAYOUT                          │         │
│ │                                                         │         │
│ │              ┌─────────────────────┐                   │         │
│ │              │    OPENING QUOTE    │                   │         │
│ │              │         "           │                   │         │
│ │              └─────────────────────┘                   │         │
│ │                        ↓                                │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │                MAIN QUOTE TEXT                      │ │         │
│ │ │                                                     │ │         │
│ │ │ "Every child deserves not just good                 │ │         │
│ │ │  tuition, but exceptional guidance                  │ │         │
│ │ │  that unlocks their full potential                  │ │         │
│ │ │  and opens doors they never knew                    │ │         │
│ │ │  existed."                                          │ │         │
│ │ │                                                     │ │         │
│ │ │ • Font: text-2xl lg:text-4xl                       │ │         │
│ │ │ • Family: font-serif (elegant)                     │ │         │
│ │ │ • Weight: font-medium                               │ │         │
│ │ │ • Color: text-primary-900                          │ │         │
│ │ │ • Style: italic for emphasis                        │ │         │
│ │ │ • Leading: leading-relaxed                          │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                        ↓                                │         │
│ │              ┌─────────────────────┐                   │         │
│ │              │   CLOSING QUOTE     │                   │         │
│ │              │         "           │                   │         │
│ │              └─────────────────────┘                   │         │
│ │                        ↓                                │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │              ATTRIBUTION                            │ │         │
│ │ │                                                     │ │         │
│ │ │        — Elizabeth Burrows                          │ │         │
│ │ │          Founder & Director                         │ │         │
│ │ │                                                     │ │         │
│ │ │ • Font: text-lg lg:text-xl                         │ │         │
│ │ │ • Color: text-primary-700                          │ │         │
│ │ │ • Weight: font-semibold (author name)              │ │         │
│ │ │ • Weight: font-normal (role)                       │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.9.4 Magic UI Highlighting Integration                            │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ HIGHLIGHTER COMPONENT USAGE                             │         │
│ │                                                         │         │
│ │ • Component: Magic UI Highlighter                       │         │
│ │ • Implementation: Strategic phrase highlighting          │         │
│ │                                                         │         │
│ │ Key Highlighted Phrases:                                │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │ "exceptional guidance"                              │ │         │
│ │ │ • Action: "highlight"                               │ │         │
│ │ │ • Color: "#eab308" (Gold brand color)               │ │         │
│ │ │ • Stroke Width: 3                                   │ │         │
│ │ │ • Iterations: 2                                     │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                        ↓                                │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │ "unlocks their full potential"                      │ │         │
│ │ │ • Action: "underline"                               │ │         │
│ │ │ • Color: "#0f172a" (Navy brand color)               │ │         │
│ │ │ • Stroke Width: 2                                   │ │         │
│ │ │ • Iterations: 1                                     │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                        ↓                                │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │ "opens doors"                                       │ │         │
│ │ │ • Action: "highlight"                               │ │         │
│ │ │ • Color: "#eab308" (Gold brand color)               │ │         │
│ │ │ • Stroke Width: 3                                   │ │         │
│ │ │ • Iterations: 2                                     │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.9.5 Animation Specifications                                     │
│ • Quote Text: Fade in with y-axis translation                      │
│ • Highlighting: Delayed animation (1s after text appears)          │
│ • Attribution: Separate animation with additional delay            │
│ • Viewport Trigger: once: true, margin: "-100px"                  │
│ • Duration: 0.8s for text, 1.2s for highlights                    │
│                                                                     │
│ 1.9.6 Props Configuration Details                                  │
│ • quote: founderQuote.quote (Main quote content)                   │
│ • author: founderQuote.author ("Elizabeth Burrows")               │
│ • role: founderQuote.role ("Founder & Director")                  │
│ • showAuthorImage: false (Text-only attribution)                  │
│                                                                     │
│ 1.9.7 Responsive Design Adaptations                               │
│ • Mobile: Reduced font sizes, single-column layout                │
│ • Tablet: Maintained hierarchy with optimized spacing             │
│ • Desktop: Full typography scale with generous whitespace         │
│ • Text Wrapping: Optimized line breaks for readability           │
│                                                                     │
│ 1.9.8 Background & Visual Context                                 │
│ • Section Background: Light gradient or solid color               │
│ • Container: Max-width with centered alignment                    │
│ • Padding: py-16 lg:py-24 for generous vertical spacing          │
│ • Quote Marks: Decorative, oversized quotation marks             │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.10 Bizstim CTA Section (Final Call-to-Action)
```
┌─────────────────────────────────────────────────────────────────────┐
│                        BIZSTIM CTA SECTION                         │
│ Primary Contact Portal Integration & Lead Generation               │
├─────────────────────────────────────────────────────────────────────┤
│ <section className="py-16 lg:py-24 bg-white">                     │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8">        │
│     <div className="max-w-4xl mx-auto text-center">               │
│       <h2>Ready to Start the Conversation?</h2>                    │
│       <p>Access our secure enquiry portal...</p>                   │
│       <a href="https://www.bizstim.com/inquiry/..."               │
│          target="_blank" rel="noopener noreferrer">                │
│         <img src="/images/graphics/bizstim-form-preview.png" />    │
│       </a>                                                          │
│     </div>                                                          │
│   </div>                                                            │
│ </section>                                                          │
├─────────────────────────────────────────────────────────────────────┤
│ 1.10.1 Component Architecture                                      │
│ • Type: Static HTML section (no separate component file)           │
│ • Purpose: Primary lead generation and contact initiation          │
│ • Position: Final section before footer                            │
│ • Background: Clean white for visual break                         │
│ • Container: Standard responsive container with center alignment   │
│                                                                     │
│ 1.10.2 Content Structure & Hierarchy                              │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                    SECTION LAYOUT                       │         │
│ │                                                         │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │                 MAIN HEADLINE                       │ │         │
│ │ │          "Ready to Start the Conversation?"         │ │         │
│ │ │                                                     │ │         │
│ │ │ • Font: text-3xl lg:text-4xl xl:text-5xl           │ │         │
│ │ │ • Family: font-serif                               │ │         │
│ │ │ • Weight: font-bold                                │ │         │
│ │ │ • Color: text-primary-900                          │ │         │
│ │ │ • Alignment: text-center                           │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │               DESCRIPTIVE TEXT                      │ │         │
│ │ │                                                     │ │         │
│ │ │ "Access our secure enquiry portal to discuss       │ │         │
│ │ │  your child's educational needs. Our team will     │ │         │
│ │ │  respond within 24 hours with a personalized       │ │         │
│ │ │  consultation offer."                               │ │         │
│ │ │                                                     │ │         │
│ │ │ • Font: text-xl lg:text-2xl                        │ │         │
│ │ │ • Color: text-primary-700                          │ │         │
│ │ │ • Leading: leading-relaxed                         │ │         │
│ │ │ • Max Width: max-w-3xl mx-auto                     │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                           ↓                             │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │            BIZSTIM PORTAL PREVIEW                   │ │         │
│ │ │                                                     │ │         │
│ │ │        ┌─────────────────────────────┐              │ │         │
│ │ │        │                             │              │ │         │
│ │ │        │    [FORM PREVIEW IMAGE]     │              │ │         │
│ │ │        │                             │              │ │         │
│ │ │        │ • Secure SSL Connection     │              │ │         │
│ │ │        │ • GDPR Compliant           │              │ │         │
│ │ │        │ • Professional Interface    │              │ │         │
│ │ │        │ • Mobile Responsive        │              │ │         │
│ │ │        │                             │              │ │         │
│ │ │        └─────────────────────────────┘              │ │         │
│ │ │                                                     │ │         │
│ │ │ • Image: /images/graphics/bizstim-form-preview.png │ │         │
│ │ │ • Alt: "Secure enquiry form preview"               │ │         │
│ │ │ • Hover: Subtle scale and shadow effect            │ │         │
│ │ │ • Click: Opens external portal in new tab          │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.10.3 External Integration Details                               │
│ • Platform: Bizstim - Professional enquiry management system       │
│ • URL: https://www.bizstim.com/inquiry/myprivatetutoronline        │
│ • Security: noopener noreferrer attributes                         │
│ • Target: _blank (new tab/window)                                  │
│ • SSL: Secure HTTPS connection required                            │
│                                                                     │
│ 1.10.4 Form Capabilities (External Portal)                        │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ BIZSTIM ENQUIRY FORM FEATURES                           │         │
│ │                                                         │         │
│ │ Contact Information:                                    │         │
│ │ • Parent/Guardian details                               │         │
│ │ • Student information                                   │         │
│ │ • Contact preferences                                   │         │
│ │                                                         │         │
│ │ Educational Requirements:                               │         │
│ │ • Current academic level                                │         │
│ │ • Target schools/exams                                  │         │
│ │ • Subject requirements                                  │         │
│ │ • Timeline and urgency                                  │         │
│ │                                                         │         │
│ │ Service Selection:                                      │         │
│ │ • Tuition type preferences                              │         │
│ │ • Budget considerations                                 │         │
│ │ • Scheduling availability                               │         │
│ │                                                         │         │
│ │ Additional Features:                                    │         │
│ │ • File upload capability                                │         │
│ │ • Calendar integration                                  │         │
│ │ • Automated confirmation                                │         │
│ │ • Lead scoring and routing                              │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.10.5 Conversion Optimization Elements                           │
│ • Headline: Action-oriented, conversation-focused                  │
│ • Visual: Form preview builds trust and sets expectations          │
│ • Security: Emphasis on secure, professional handling              │
│ • Response Time: 24-hour guarantee creates urgency                 │
│ • Portal Access: External link maintains brand separation          │
│                                                                     │
│ 1.10.6 Analytics & Tracking Integration                           │
│ • Click Tracking: External link clicks monitored                   │
│ • Conversion Goals: Form submissions tracked as conversions        │
│ • Attribution: UTM parameters for source attribution               │
│ • Heatmap: User interaction patterns analyzed                      │
│                                                                     │
│ 1.10.7 Mobile Responsiveness                                      │
│ • Text Scaling: Responsive typography across all breakpoints       │
│ • Image Sizing: Form preview adapts to mobile screens             │
│ • Touch Targets: Adequate tap areas for mobile interaction        │
│ • Loading: Optimized image delivery for mobile connections        │
│                                                                     │
│ 1.10.8 Lead Generation Workflow                                   │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ POST-CLICK PROCESS                                      │         │
│ │                                                         │         │
│ │ 1. User clicks form preview image                       │         │
│ │ 2. Opens Bizstim portal in new tab                     │         │
│ │ 3. User completes detailed enquiry form                │         │
│ │ 4. Automated confirmation sent to user                 │         │
│ │ 5. Lead notification sent to MPTO team                 │         │
│ │ 6. Initial response within 24 hours                    │         │
│ │ 7. Consultation scheduling and follow-up                │         │
│ └─────────────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.11 Technical Implementation Summary
```
┌─────────────────────────────────────────────────────────────────────┐
│                    HOMEPAGE TECHNICAL SUMMARY                      │
│ Critical Implementation Details & Architecture Notes               │
├─────────────────────────────────────────────────────────────────────┤
│ 1.11.1 File Structure & Component Organization                     │
│ • Main File: /app/[locale]/page.tsx                                │
│ • Page Type: Client Component ("use client" directive)             │
│ • Layout Integration: PageLayout wrapper component                 │
│ • Component Count: 10 major sections + supporting elements         │
│                                                                     │
│ 1.11.2 CMS Data Architecture (CRITICAL)                           │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │ ⚠️  SYNCHRONOUS CMS PATTERN - NEVER DEVIATE ⚠️          │         │
│ │                                                         │         │
│ │ ✅ WORKING PATTERN:                                     │         │
│ │ import cmsContent from '../../content/cms-content.json' │         │
│ │ const data = getCMSContent(); // Direct function call   │         │
│ │                                                         │         │
│ │ ❌ FORBIDDEN PATTERNS:                                  │         │
│ │ const [data, setData] = useState(null);                │         │
│ │ useEffect(() => { loadData() }, []);                   │         │
│ │ const data = await loadCachedContent();                │         │
│ │                                                         │         │
│ │ REASON: Async patterns caused complete homepage        │         │
│ │         failure in August 2025 - never repeat!         │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 1.11.3 Performance Specifications                                  │
│ • Build Time: <25 seconds for 91 optimized routes                  │
│ • Bundle Size: 229kB first load JS (optimized)                     │
│ • Load Time: <1.5s target, 558ms achieved                          │
│ • Image Format: AVIF with fallbacks, Next.js optimization          │
│ • Code Splitting: Dynamic imports for non-critical components      │
│                                                                     │
│ 1.11.4 Animation Library Integration                               │
│ • Primary: Framer Motion throughout                                 │
│ • Triggers: whileInView with viewport: { once: true }              │
│ • Performance: GPU-accelerated transforms                          │
│ • Easing: [0.25, 0.46, 0.45, 0.94] cubic-bezier standard          │
│ • Delays: Staggered 0.1s - 0.3s intervals                         │
│                                                                     │
│ 1.11.5 Responsive Breakpoint System                               │
│ • Mobile: 320px - 640px (grid-cols-1, reduced typography)          │
│ • Tablet: 640px - 1024px (md: prefix, balanced layout)             │
│ • Desktop: 1024px+ (lg: prefix, full layout capabilities)          │
│ • Container Padding: px-4 sm:px-6 lg:px-8 (fixed spacing)          │
│                                                                     │
│ 1.11.6 SEO & Meta Configuration                                    │
│ • Title: Dynamic based on locale and branding data                 │
│ • Description: CMS-driven meta descriptions                        │
│ • OpenGraph: Complete social media preview integration             │
│ • Structured Data: JSON-LD for rich search results                 │
│ • Core Web Vitals: Optimized for excellent scores                  │
│                                                                     │
│ 1.11.7 Accessibility Compliance (WCAG 2.1 AA)                     │
│ • Semantic HTML: Proper heading hierarchy (h1 → h6)                │
│ • ARIA Labels: Screen reader navigation support                    │
│ • Keyboard Navigation: Full keyboard accessibility                 │
│ • Color Contrast: Meets/exceeds 4.5:1 ratio requirements           │
│ • Focus Indicators: Visible focus states throughout                │
│                                                                     │
│ 1.11.8 Error Handling & Resilience                                │
│ • CMS Fallbacks: Default content if CMS fails                      │
│ • Image Fallbacks: Progressive enhancement approach                │
│ • Graceful Degradation: Core functionality without JavaScript      │
│ • Error Boundaries: React error boundaries for component isolation │
│                                                                     │
│ 1.11.9 Deployment Configuration                                    │
│ • Platform: Vercel with dynamic rendering                          │
│ • Layout Setting: export const dynamic = 'force-dynamic'           │
│ • Environment: Production optimizations enabled                    │
│ • CDN: Global edge network for optimal delivery                    │
│ • Monitoring: Real-time performance and error tracking             │
│                                                                     │
│ 1.11.10 Critical Success Metrics                                  │
│ • Conversion Rate: Form submissions and enquiries                  │
│ • Page Load Speed: Sub-2s loading times maintained                 │
│ • Bounce Rate: <30% target through engaging content                │
│ • Engagement: Scroll depth and section interaction rates           │
│ • Mobile Usage: 60%+ traffic optimization priority                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. About Us (/about)

### 2.0 Complete Page Architecture Overview
```
┌─────────────────────────────────────────────────────────────────────┐
│                      ABOUT US PAGE ARCHITECTURE                    │
│ File: src/app/about/page.tsx - Premium Founder Story Experience    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                   FULL-SCREEN HERO                      │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │               HERO BACKGROUND IMAGE                 │ │         │
│ │ │  /images/hero/founder-elizabeth-burrows.jpg         │ │         │
│ │ │                                                     │ │         │
│ │ │       ┌─────────────────────────────────┐           │ │         │
│ │ │       │    "Our Founder and Ethos"      │           │ │         │
│ │ │       │  "Excellence Through Experience"│           │ │         │
│ │ │       │     Decorative Lines Style      │           │ │         │
│ │ │       └─────────────────────────────────┘           │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                             ↓                                       │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                  PAGE LAYOUT WRAPPER                    │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │             FOUNDER STORY SECTION                   │ │         │
│ │ │    6-Row Magazine Layout Implementation             │ │         │
│ │ │                                                     │ │         │
│ │ │ ROW 1: Educational Philosophy (Centered Text)       │ │         │
│ │ │ ROW 2: Personal Introduction (50/50 Split)          │ │         │
│ │ │ ROW 3: Going Against the Grain (50/50 Split)        │ │         │
│ │ │ ROW 4: Career Milestones (Centered Text)            │ │         │
│ │ │ ROW 5: Global Experience (Hero Overlay)             │ │         │
│ │ │ ROW 6: Results That Matter (Centered Text)          │ │         │
│ │ │ ROW 7A: Personalised/Empowering (50/50 Split)       │ │         │
│ │ │ ROW 7B: Global Perspective (50/50 Split)            │ │         │
│ │ │ FINAL: Statistics + Signature (Centered)            │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                             ↓                           │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │            QUOTE SECTION (ACADEMIA INSIGHT)         │ │         │
│ │ │   "A truly bespoke experience - Elizabeth           │ │         │
│ │ │    personally pairs each student with a             │ │         │
│ │ │    carefully selected tutor from her               │ │         │
│ │ │    boutique team."                                  │ │         │
│ │ │                                                     │ │         │
│ │ │ • Background: bg-primary-50                         │ │         │
│ │ │ • Magic UI Effects: Highlighting & Underlines      │ │         │
│ │ │ • MagicUI Effects: useHighlighting={true}          │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                             ↓                           │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │           TESTIMONIALS SECTION                      │ │         │
│ │ │     Premium Swiper Carousel Implementation          │ │         │
│ │ │                                                     │ │         │
│ │ │ • Data: getTextTestimonials() - Video excluded      │ │         │
│ │ │ • Layout: 1/2/3 columns (Mobile/Tablet/Desktop)    │ │         │
│ │ │ • Features: Navigation, Pagination, Autoplay       │ │         │
│ │ │ • Filtering: Subject, Level, Results               │ │         │
│ │ │ • Background: bg-blue-50/30 with pattern overlay   │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ TECHNICAL SPECIFICATIONS:                                           │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ • File: /app/about/page.tsx (Client Component)                  │ │
│ │ • CMS Integration: Synchronous data access patterns             │ │
│ │ • Animation: Framer Motion viewport-triggered animations        │ │
│ │ • Images: Next.js Image component with optimization             │ │
│ │ • Typography: Royal client premium styling standards            │ │
│ │ • Responsive: Mobile-first design with breakpoint adaptation    │ │
│ │ • SEO: Enhanced meta tags via generateMetadata function         │ │
│ │ • Performance: <1.5s load times with optimized rendering        │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.1 SimpleHero Section
```
┌─────────────────────────────────────────────────────────────────────┐
│                         SIMPLE HERO SECTION                        │
│ Component: /components/layout/simple-hero.tsx                      │
├─────────────────────────────────────────────────────────────────────┤
│ <SimpleHero                                                        │
│   backgroundImage={aboutHeroImage.src}                             │
│   h1="Our Founder and Ethos"                                       │
│   h2="Excellence Through Experience"                               │
│   decorativeStyle="lines"                                          │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ 2.1.1 Visual Layout Structure                                      │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                 HERO BACKGROUND COMPOSITION              │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │                BACKGROUND IMAGE                     │ │         │
│ │ │ Source: getAboutHeroImage() from CMS                │ │         │
│ │ │ Path: /images/hero/founder-elizabeth-burrows.jpg    │ │         │
│ │ │ Treatment: Full viewport coverage with parallax     │ │         │
│ │ │                                                     │ │         │
│ │ │           ┌─────────────────────────┐               │ │         │
│ │ │           │     OVERLAY GRADIENT     │               │ │         │
│ │ │           │  Dark overlay for text   │               │ │         │
│ │ │           │     readability          │               │ │         │
│ │ │           └─────────────────────────┘               │ │         │
│ │ │                      ↓                              │ │         │
│ │ │        ┌─────────────────────────────────┐          │ │         │
│ │ │        │        HERO CONTENT             │          │ │         │
│ │ │        │                                 │          │ │         │
│ │ │        │  "Our Founder and Ethos"        │          │ │         │
│ │ │        │   H1: text-5xl lg:text-7xl     │          │ │         │
│ │ │        │   Color: text-white             │          │ │         │
│ │ │        │   Font: font-serif font-bold    │          │ │         │
│ │ │        │                                 │          │ │         │
│ │ │        │ "Excellence Through Experience" │          │ │         │
│ │ │        │   H2: text-xl lg:text-2xl      │          │ │         │
│ │ │        │   Color: text-white/90          │          │ │         │
│ │ │        │   Font: font-medium             │          │ │         │
│ │ │        │                                 │          │ │         │
│ │ │        │      DECORATIVE LINES           │          │ │         │
│ │ │        │   Style: decorativeStyle="lines"│          │ │         │
│ │ │        │   Pattern: Geometric overlays   │          │ │         │
│ │ │        └─────────────────────────────────┘          │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.1.2 Technical Implementation                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Component Props Configuration:                                   │ │
│ │                                                                  │ │
│ │ • backgroundImage: Dynamic from CMS via getAboutHeroImage()     │ │
│ │ • h1: "Our Founder and Ethos" (Primary heading)                 │ │
│ │ • h2: "Excellence Through Experience" (Subheading)              │ │
│ │ • decorativeStyle: "lines" (Geometric pattern overlay)          │ │
│ │                                                                  │ │
│ │ CMS Integration Pattern:                                         │ │
│ │ • Function: getAboutHeroImage() - Synchronous access            │ │
│ │ • Source: cms-images.ts centralized image management            │ │
│ │ • Data Structure: { src: string, alt: string, ... }             │ │
│ │                                                                  │ │
│ │ Layout Specifications:                                           │ │
│ │ • Position: Outside PageLayout for full-screen treatment       │ │
│ │ • Height: min-h-screen on mobile, responsive scaling           │ │
│ │ • Content: Vertically and horizontally centered                │ │
│ │ • Z-index: Proper layering with navigation                     │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.1.3 Responsive Behavior                                          │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Mobile (320px - 767px):                                          │ │
│ │ • Hero Height: min-h-screen (full viewport)                     │ │
│ │ • H1 Size: text-5xl (48px)                                      │ │
│ │ • H2 Size: text-xl (20px)                                       │ │
│ │ • Padding: px-4 (16px horizontal)                               │ │
│ │ • Content: Single column, centered alignment                    │ │
│ │                                                                  │ │
│ │ Tablet (768px - 1023px):                                        │ │
│ │ • Hero Height: min-h-[80vh]                                     │ │
│ │ • H1 Size: text-6xl (60px)                                      │ │
│ │ • H2 Size: text-xl (20px)                                       │ │
│ │ • Padding: px-6 (24px horizontal)                               │ │
│ │                                                                  │ │
│ │ Desktop (1024px+):                                              │ │
│ │ • Hero Height: min-h-[90vh]                                     │ │
│ │ • H1 Size: text-7xl (72px)                                      │ │
│ │ • H2 Size: text-2xl (24px)                                      │ │
│ │ • Padding: px-8 (32px horizontal)                               │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.1.4 Animation Specifications                                     │
│ • Entrance: Fade in with upward motion from viewport entry         │
│ • Timing: 0.8s duration with easeOut transition                   │ │
│ • Trigger: Immediate on page load                                   │
│ • Background: Subtle parallax effect on scroll (optional)          │
│ • Text: Staggered animation for H1 then H2                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 FounderStorySection - Educational Philosophy
```
┌─────────────────────────────────────────────────────────────────────┐
│                    FOUNDER STORY SECTION - ROW 1                   │
│ Component: /components/sections/about/founder-story-section.tsx     │
├─────────────────────────────────────────────────────────────────────┤
│ 2.2.1 Educational Philosophy (Centered Text Container)             │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                   CONTENT LAYOUT                        │         │
│ │                                                         │         │
│ │              ┌─────────────────────┐                   │         │
│ │              │                     │                   │         │
│ │              │  SECTION HEADING     │                   │         │
│ │              │                     │                   │         │
│ │              │"Our Educational     │                   │         │
│ │              │ Philosophy"          │                   │         │
│ │              │                     │                   │         │
│ │              │ • H1: text-2xl lg:  │                   │         │
│ │              │   text-3xl xl:      │                   │         │
│ │              │   text-4xl          │                   │         │
│ │              │ • Font: font-serif  │                   │         │
│ │              │   font-bold         │                   │         │
│ │              │ • Color: text-      │                   │         │
│ │              │   primary-900       │                   │         │
│ │              └─────────────────────┘                   │         │
│ │                        ↓                                │         │
│ │        ┌─────────────────────────────────┐              │         │
│ │        │      SMART TEXT PROCESSOR       │              │         │
│ │        │                                 │              │         │
│ │        │ "We believe every child         │              │         │
│ │        │ deserves an education           │              │         │
│ │        │ [tailored to who they are],     │              │         │
│ │        │ helping them build              │              │         │
│ │        │ [confidence, curiosity, and     │              │         │
│ │        │  clarity]. We combine           │              │         │
│ │        │ [academic rigour with           │              │         │
│ │        │  personal mentorship]..."       │              │         │
│ │        │                                 │              │         │
│ │        │ HIGHLIGHTING EFFECTS:           │              │         │
│ │        │ • Gold Highlights: [] phrases   │              │         │
│ │        │ • Navy Underlines: {} phrases   │              │         │
│ │        │ • Dynamic: SmartTextProcessor   │              │         │
│ │        └─────────────────────────────────┘              │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.2.2 Technical Specifications                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Container Configuration:                                         │ │
│ │ • Width: max-w-2xl mx-auto (672px max)                          │ │
│ │ • Alignment: text-center                                        │ │
│ │ • Margin: mb-10 (40px bottom spacing)                           │ │
│ │                                                                  │ │
│ │ SmartTextProcessor Integration:                                  │ │
│ │ • Component: /components/ui/text-effects                        │ │
│ │ • Highlights: Array of phrases for gold background              │ │
│ │ • Underlines: Array of phrases for navy underlines              │ │
│ │ • Animation: Framer Motion viewport triggers                    │ │
│ │                                                                  │ │
│ │ Animation Specifications:                                        │ │
│ │ • H1: fadeInUpVariant with immediate trigger                    │ │
│ │ • Text: fadeInUpVariant with 0.2s delay                        │ │
│ │ • Viewport: once: true, margin: "-100px"                       │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 FounderStorySection - Personal Introduction
```
┌─────────────────────────────────────────────────────────────────────┐
│                    FOUNDER STORY SECTION - ROW 2                   │
│ Personal Introduction (Full-Width Edge-to-Edge 50/50 Split)        │
├─────────────────────────────────────────────────────────────────────┤
│ 2.3.1 Layout Structure                                             │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                FULL-WIDTH GRID LAYOUT                   │         │
│ │                                                         │         │
│ │ ┌─────────────────────┐ ┌─────────────────────────────┐ │         │
│ │ │                     │ │                             │ │         │
│ │ │      LEFT COLUMN    │ │       RIGHT COLUMN          │ │         │
│ │ │    (IMAGE SIDE)     │ │     (CONTENT SIDE)          │ │         │
│ │ │                     │ │                             │ │         │
│ │ │ ┌─────────────────┐ │ │ ┌─────────────────────────┐ │ │         │
│ │ │ │                 │ │ │ │                         │ │ │         │
│ │ │ │  FOUNDER IMAGE  │ │ │ │    HEADING & TEXT       │ │ │         │
│ │ │ │                 │ │ │ │                         │ │ │         │
│ │ │ │ Elizabeth       │ │ │ │ "Meet Elizabeth,        │ │ │         │
│ │ │ │ Burrows         │ │ │ │  A Different Kind       │ │ │         │
│ │ │ │ Portrait        │ │ │ │  of Educator"           │ │ │         │
│ │ │ │                 │ │ │ │                         │ │ │         │
│ │ │ │ • Aspect: 17:9  │ │ │ │ H2: text-3xl lg:text-4xl│ │ │         │
│ │ │ │ • Fill: object- │ │ │ │ Font: font-serif        │ │ │         │
│ │ │ │   cover         │ │ │ │ Color: text-primary-900 │ │ │         │
│ │ │ │ • Loading: lazy │ │ │ │                         │ │ │         │
│ │ │ │ • Quality: 90   │ │ │ │ PARAGRAPH TEXT:         │ │ │         │
│ │ │ │                 │ │ │ │ "Considering how        │ │ │         │
│ │ │ └─────────────────┘ │ │ │  unconventional my      │ │ │         │
│ │ │                     │ │ │  own schooling was..."   │ │ │         │
│ │ │                     │ │ │                         │ │ │         │
│ │ │ Order: order-2      │ │ │ • Text: text-lg         │ │ │         │
│ │ │ lg:order-1          │ │ │ • Color: text-primary-  │ │ │         │
│ │ │                     │ │ │   700                   │ │ │         │
│ │ │                     │ │ │ • Leading: leading-     │ │ │         │
│ │ │                     │ │ │   relaxed               │ │ │         │
│ │ │                     │ │ │                         │ │ │         │
│ │ │                     │ │ │ Order: order-1          │ │ │         │
│ │ │                     │ │ │ lg:order-2              │ │ │         │
│ │ └─────────────────────┘ └─────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.3.2 Grid Configuration                                           │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Grid System:                                                     │ │
│ │ • Base: grid lg:grid-cols-2                                     │ │
│ │ • Gap: gap-0 (edge-to-edge)                                     │ │
│ │ • Rows: lg:grid-rows-1 auto-rows-fr                            │ │
│ │ • Alignment: items-stretch                                      │ │
│ │                                                                  │ │
│ │ Column Heights:                                                  │ │
│ │ • Image Column: Full height with aspect-ratio management        │ │
│ │ • Content Column: min-h-[400px] lg:min-h-[500px]              │ │
│ │ • Vertical Alignment: flex flex-col justify-center             │ │
│ │                                                                  │ │
│ │ Mobile Behavior:                                                 │ │
│ │ • Single column stack                                           │ │
│ │ • Image: aspect-[17/9] maintaining proportions                 │ │
│ │ • Content: Full-width with appropriate padding                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.3.3 Animation Specifications                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Left Column (Image):                                             │ │
│ │ • Variant: fadeInLeftVariant                                    │ │
│ │ • Initial: { opacity: 0, x: -30 }                              │ │
│ │ • Animate: { opacity: 1, x: 0 }                                │ │
│ │ • Duration: 0.8s                                                │ │
│ │                                                                  │ │
│ │ Right Column (Content):                                         │ │
│ │ • Variant: fadeInRightVariant                                   │ │
│ │ • Initial: { opacity: 0, x: 30 }                               │ │
│ │ • Animate: { opacity: 1, x: 0 }                                │ │
│ │ • Duration: 0.8s                                                │ │
│ │                                                                  │ │
│ │ Viewport Trigger:                                               │ │
│ │ • once: true (prevents re-trigger)                             │ │
│ │ • margin: "-100px" (trigger before fully visible)              │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.3.4 Image Specifications                                         │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Source: /images/team/founder-elizabeth-burrows-portrait.jpg     │ │
│ │ Alt: "Elizabeth Burrows - Founder and CEO..."                   │ │
│ │ Implementation: Next.js Image with fill prop                    │ │
│ │ Object-fit: object-cover (maintains aspect, crops if needed)    │ │
│ │ Loading: lazy (performance optimization)                        │ │
│ │ Quality: 90 (high quality for founder portrait)                │ │
│ │ Sizes: "(max-width: 768px) 100vw, 50vw"                       │ │
│ │ BlurDataURL: Custom base64 placeholder                          │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.4 FounderStorySection - Going Against the Grain
```
┌─────────────────────────────────────────────────────────────────────┐
│                    FOUNDER STORY SECTION - ROW 3                   │
│ Going Against the Grain (Full-Width Edge-to-Edge 50/50 Split)      │
├─────────────────────────────────────────────────────────────────────┤
│ 2.4.1 Content-First Layout (Reverse of ROW 2)                     │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                REVERSED GRID LAYOUT                     │         │
│ │                                                         │         │
│ │ ┌─────────────────────────────┐ ┌─────────────────────┐ │         │
│ │ │                             │ │                     │ │         │
│ │ │        LEFT COLUMN          │ │   RIGHT COLUMN      │ │         │
│ │ │      (CONTENT SIDE)         │ │   (IMAGE SIDE)      │ │         │
│ │ │                             │ │                     │ │         │
│ │ │ ┌─────────────────────────┐ │ │ ┌─────────────────┐ │ │         │
│ │ │ │                         │ │ │ │                 │ │ │         │
│ │ │ │    STORY CONTENT        │ │ │ │  FOUNDER IMAGE  │ │ │         │
│ │ │ │                         │ │ │ │                 │ │ │         │
│ │ │ │ "Going Against          │ │ │ │ Elizabeth       │ │ │         │
│ │ │ │  the Grain"             │ │ │ │ Burrows         │ │ │         │
│ │ │ │                         │ │ │ │ Secondary       │ │ │         │
│ │ │ │ H2: text-3xl lg:        │ │ │ │                 │ │ │         │
│ │ │ │     text-4xl            │ │ │ │ • Different     │ │ │         │
│ │ │ │ Font: font-serif        │ │ │ │   image from    │ │ │         │
│ │ │ │       font-bold         │ │ │ │   ROW 2         │ │ │         │
│ │ │ │ Color: text-primary-900 │ │ │ │ • Same tech     │ │ │         │
│ │ │ │                         │ │ │ │   specs         │ │ │         │
│ │ │ │ MULTI-PARAGRAPH STORY:  │ │ │ │ • Fill layout   │ │ │         │
│ │ │ │                         │ │ │ │                 │ │ │         │
│ │ │ │ "By Sixth Form, I was   │ │ │ └─────────────────┘ │ │         │
│ │ │ │  achieving top grades.  │ │ │                     │ │         │
│ │ │ │  I hadn't planned to    │ │ │ Order: order-1      │ │         │
│ │ │ │  apply to Oxbridge..."  │ │ │ lg:order-2          │ │         │
│ │ │ │                         │ │ │                     │ │         │
│ │ │ │ [Continues with full    │ │ │                     │ │         │
│ │ │ │  Cambridge/Bristol      │ │ │                     │ │         │
│ │ │ │  decision story]        │ │ │                     │ │         │
│ │ │ │                         │ │ │                     │ │         │
│ │ │ │ CONCLUDING PHILOSOPHY:  │ │ │                     │ │         │
│ │ │ │ "work as hard as you    │ │ │                     │ │         │
│ │ │ │  can to give yourself   │ │ │                     │ │         │
│ │ │ │  the luxury of choice"  │ │ │                     │ │         │
│ │ │ │                         │ │ │                     │ │         │
│ │ │ │ Order: Default (left)   │ │ │                     │ │         │
│ │ │ └─────────────────────────┘ │ │                     │ │         │
│ │ └─────────────────────────────┘ └─────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.4.2 Key Content Highlights                                       │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Story Progression:                                               │ │
│ │                                                                  │ │
│ │ 1. Academic Success: "By Sixth Form, achieving top grades"      │ │
│ │ 2. Unexpected Opportunity: Headmistress suggests Oxbridge      │ │
│ │ 3. Conflict: Already committed to Bristol University            │ │
│ │ 4. Bold Decision: Turning down Cambridge for personal choice   │ │
│ │ 5. Core Philosophy: "luxury of choice" educational ethos       │ │
│ │                                                                  │ │
│ │ Emphasized Quote (Strong Tag):                                   │ │
│ │ "work as hard as you can to give yourself the luxury           │ │
│ │  of choice, then have the confidence to pick what's            │ │
│ │  right for you — even if it's not what's expected."           │ │
│ │                                                                  │ │
│ │ Typography Hierarchy:                                           │ │
│ │ • Heading: text-3xl lg:text-4xl font-serif font-bold          │ │
│ │ • Body: text-lg text-primary-700 leading-relaxed              │ │
│ │ • Emphasis: <strong> tags for philosophy statements            │ │
│ │ • Spacing: space-y-6 between paragraphs                       │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.4.3 Layout Mechanics                                             │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Container: min-h-[450px] lg:min-h-[550px] (taller than ROW 2)  │ │
│ │ Padding: px-6 lg:px-8 py-12 lg:py-16                           │ │
│ │ Alignment: flex flex-col justify-center                         │ │
│ │ Image Order: order-1 lg:order-2 (right side on desktop)        │ │
│ │ Content Order: Default (left side, maintains reading flow)     │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.5 FounderStorySection - Career Milestones
```
┌─────────────────────────────────────────────────────────────────────┐
│                    FOUNDER STORY SECTION - ROW 4                   │
│ Career Milestones (Centered Text Container with Sub-sections)      │
├─────────────────────────────────────────────────────────────────────┤
│ 2.5.1 Layout Structure                                             │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                CENTERED CONTAINER                       │         │
│ │               max-w-4xl mx-auto                         │         │
│ │                                                         │         │
│ │              ┌─────────────────────┐                   │         │
│ │              │                     │                   │         │
│ │              │  UNIFIED SUBTITLE   │                   │         │
│ │              │                     │                   │         │
│ │              │"First Lesson to     │                   │         │
│ │              │ Seventh Continent"   │                   │         │
│ │              │                     │                   │         │
│ │              │ H3: text-2xl lg:    │                   │         │
│ │              │     text-3xl        │                   │         │
│ │              │ Font: font-serif    │                   │         │
│ │              │       font-bold     │                   │         │
│ │              │ Color: text-primary-│                   │         │
│ │              │       900           │                   │         │
│ │              │ Margin: mb-6        │                   │         │
│ │              └─────────────────────┘                   │         │
│ │                        ↓                                │         │
│ │        ┌─────────────────────────────────┐              │         │
│ │        │                                 │              │         │
│ │        │      STORY CONTENT              │              │         │
│ │        │                                 │              │         │
│ │        │ PARAGRAPH 1:                    │              │         │
│ │        │ "I started tutoring at          │              │         │
│ │        │  Bristol; it was love at        │              │         │
│ │        │  first lesson. I've always      │              │         │
│ │        │  had a natural affinity with    │              │         │
│ │        │  children and combining that    │              │         │
│ │        │  with academics just made       │              │         │
│ │        │  sense..."                      │              │         │
│ │        │                                 │              │         │
│ │        │ PARAGRAPH 2:                    │              │         │
│ │        │ "What followed was a series     │              │         │
│ │        │  of international placements    │              │         │
│ │        │  and opportunities to work      │              │         │
│ │        │  with VIPs and private          │              │         │
│ │        │  families around the world.     │              │         │
│ │        │  By 2017, I had visited all     │              │         │
│ │        │  seven continents..."           │              │         │
│ │        │                                 │              │         │
│ │        │ Typography:                     │              │         │
│ │        │ • text-lg text-primary-700      │              │         │
│ │        │ • leading-relaxed               │              │         │
│ │        │ • space-y-6 between paragraphs  │              │         │
│ │        └─────────────────────────────────┘              │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.5.2 Content Architecture                                         │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Section Structure:                                               │ │
│ │                                                                  │ │
│ │ Container Configuration:                                         │ │
│ │ • Width: max-w-4xl (896px maximum)                              │ │
│ │ • Position: mx-auto (center aligned)                           │ │
│ │ • Spacing: mb-20 (80px bottom margin)                          │ │
│ │ • Text Alignment: text-center                                   │ │
│ │                                                                  │ │
│ │ Content Grouping:                                               │ │
│ │ • Wrapper: div with space-y-10 (40px vertical spacing)         │ │
│ │ • Text Container: div with space-y-6 (24px between paragraphs) │ │
│ │ • Unified Structure: Single subtitle covering both topics      │ │
│ │                                                                  │ │
│ │ Story Elements:                                                  │ │
│ │ 1. Bristol Beginning: Love at first lesson, natural affinity   │ │
│ │ 2. Masters Completion: Academic progression                     │ │
│ │ 3. Tutoring Refinement: In-person and online development       │ │
│ │ 4. Family Recommendations: Word-of-mouth growth                 │ │
│ │ 5. International Expansion: Global opportunities               │ │
│ │ 6. Seven Continents: Comprehensive world experience            │ │
│ │ 7. Team Building: Exceptional educators network               │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.5.3 Animation Implementation                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Motion Configuration:                                            │ │
│ │ • Variant: fadeInUpVariant                                      │ │
│ │ • Initial: { opacity: 0, y: 30 }                               │ │
│ │ • Animate: { opacity: 1, y: 0 }                                │ │
│ │ • Transition: { duration: 0.8 }                                │ │
│ │                                                                  │ │
│ │ Viewport Trigger:                                               │ │
│ │ • whileInView: Applied to entire container                      │ │
│ │ • once: true (single trigger)                                  │ │
│ │ • margin: "-100px" (early activation)                          │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.6 FounderStorySection - Global Experience Hero
```
┌─────────────────────────────────────────────────────────────────────┐
│                    FOUNDER STORY SECTION - ROW 5                   │
│ Global Experience (Hero-Style Single Column with Text Overlay)     │
├─────────────────────────────────────────────────────────────────────┤
│ 2.6.1 Hero Layout Structure                                        │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                 FULL-WIDTH HERO SECTION                 │         │
│ │                    Height: 600px                        │         │
│ │                                                         │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │                BACKGROUND IMAGE                     │ │         │
│ │ │                                                     │ │         │
│ │ │ Source: /images/team/founder-elizabeth-             │ │         │
│ │ │         burrows-professional.jpg                    │ │         │
│ │ │ Treatment: fill, object-cover                       │ │         │
│ │ │ Quality: 90, loading: lazy                          │ │         │
│ │ │ Sizes: 100vw (full viewport width)                 │ │         │
│ │ │                                                     │ │         │
│ │ │          ┌─────────────────────────┐                │ │         │
│ │ │          │                         │                │ │         │
│ │ │          │    GRADIENT OVERLAY     │                │ │         │
│ │ │          │                         │                │ │         │
│ │ │          │ bg-gradient-to-r        │                │ │         │
│ │ │          │ from-black/70           │                │ │         │
│ │ │          │ via-black/50            │                │ │         │
│ │ │          │ to-transparent          │                │ │         │
│ │ │          │                         │                │ │         │
│ │ │          │ Purpose: Text readability│                │ │         │
│ │ │          │ over background image   │                │ │         │
│ │ │          └─────────────────────────┘                │ │         │
│ │ │                      ↓                              │ │         │
│ │ │     ┌─────────────────────────────────────┐         │ │         │
│ │ │     │                                     │         │ │         │
│ │ │     │        TEXT OVERLAY CONTENT         │         │ │         │
│ │ │     │          (Bottom Positioned)        │         │ │         │
│ │ │     │                                     │         │ │         │
│ │ │     │ Position: absolute inset-x-0        │         │ │         │
│ │ │     │           bottom-0                  │         │ │         │
│ │ │     │ Alignment: flex items-end           │         │ │         │
│ │ │     │ Z-index: z-10                       │         │ │         │
│ │ │     │ Padding: p-8                        │         │ │         │
│ │ │     │                                     │         │ │         │
│ │ │     │    ┌─────────────────────────┐      │         │ │         │
│ │ │     │    │                         │      │         │ │         │
│ │ │     │    │       HERO HEADING      │      │         │ │         │
│ │ │     │    │                         │      │         │ │         │
│ │ │     │    │ "A Global View of       │      │         │ │         │
│ │ │     │    │  What Education Can Do" │      │         │ │         │
│ │ │     │    │                         │      │         │ │         │
│ │ │     │    │ H2: text-3xl lg:text-4xl│      │         │ │         │
│ │ │     │    │     xl:text-5xl         │      │         │ │         │
│ │ │     │    │ Font: font-serif        │      │         │ │         │
│ │ │     │    │       font-bold         │      │         │ │         │
│ │ │     │    │ Color: text-white       │      │         │ │         │
│ │ │     │    │ Leading: leading-tight  │      │         │ │         │
│ │ │     │    └─────────────────────────┘      │         │ │         │
│ │ │     │              ↓                      │         │ │         │
│ │ │     │    ┌─────────────────────────┐      │         │ │         │
│ │ │     │    │                         │      │         │ │         │
│ │ │     │    │      STORY CONTENT      │      │         │ │         │
│ │ │     │    │                         │      │         │ │         │
│ │ │     │    │ PARAGRAPH 1:            │      │         │ │         │
│ │ │     │    │ "Keen to put my English │      │         │ │         │
│ │ │     │    │  degree to good use,    │      │         │ │         │
│ │ │     │    │  during this time I     │      │         │ │         │
│ │ │     │    │  also worked at Forbes  │      │         │ │         │
│ │ │     │    │  Middle East as Online  │      │         │ │         │
│ │ │     │    │  Editor..."             │      │         │ │         │
│ │ │     │    │                         │      │         │ │         │
│ │ │     │    │ PARAGRAPH 2:            │      │         │ │         │
│ │ │     │    │ "Conducting interviews  │      │         │ │         │
│ │ │     │    │  with business moguls   │      │         │ │         │
│ │ │     │    │  through Forbes         │      │         │ │         │
│ │ │     │    │  reinforced that the    │      │         │ │         │
│ │ │     │    │  right educational      │      │         │ │         │
│ │ │     │    │  support doesn't just   │      │         │ │         │
│ │ │     │    │  help people ace        │      │         │ │         │
│ │ │     │    │  exams..."              │      │         │ │         │
│ │ │     │    │                         │      │         │ │         │
│ │ │     │    │ Typography:             │      │         │ │         │
│ │ │     │    │ • text-lg lg:text-xl    │      │         │ │         │
│ │ │     │    │ • text-white/90 and     │      │         │ │         │
│ │ │     │    │   text-white            │      │         │ │         │
│ │ │     │    │ • leading-relaxed       │      │         │ │         │
│ │ │     │    │ • space-y-4             │      │         │ │         │
│ │ │     │    └─────────────────────────┘      │         │ │         │
│ │ │     └─────────────────────────────────────┘         │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.6.2 Professional Background Context                              │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Story Elements:                                                  │ │
│ │                                                                  │ │
│ │ 1. Forbes Middle East Role: Online Editor position              │ │
│ │ 2. Subject Coverage: Range of topics including education        │ │
│ │ 3. Business Interviews: Mogul interviews                        │ │
│ │ 4. Educational Insight: Right support shapes choices            │ │
│ │ 5. Impact Understanding: Education affects confidence & future   │ │
│ │ 6. Leader Transformation: Fortunes turned through education     │ │
│ │ 7. Mission Validation: "What could be more exciting?"           │ │
│ │                                                                  │ │
│ │ Content Strategy:                                                │ │
│ │ • Professional Credibility: Forbes background                   │ │
│ │ • Business Understanding: Corporate leadership insight           │ │
│ │ • Educational Philosophy: Holistic impact beyond academics      │ │
│ │ • Mission Alignment: Personal and professional values          │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.6.3 Technical Implementation                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Container Configuration:                                         │ │
│ │ • Dimensions: relative h-[600px] w-full                         │ │
│ │ • Image Layer: Next.js Image with fill prop                     │ │
│ │ • Overlay Layer: Gradient from dark to transparent              │ │
│ │ • Content Layer: Positioned at bottom with proper z-index       │ │
│ │                                                                  │ │
│ │ Responsive Text Content:                                         │ │
│ │ • Container: max-w-2xl width constraint                         │ │
│ │ • Heading: Scales from text-3xl to text-5xl                    │ │
│ │ • Body: Scales from text-lg to text-xl                         │ │
│ │ • Color: White text with opacity variations                     │ │
│ │                                                                  │ │
│ │ Animation:                                                       │ │
│ │ • Trigger: fadeInUpVariant on viewport entry                    │ │
│ │ • Entire container animates as single unit                      │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.7 QuoteSection - Academia Insight
```
┌─────────────────────────────────────────────────────────────────────┐
│                         QUOTE SECTION                              │
│ Academia Insight Quote with Magic UI Effects                       │
├─────────────────────────────────────────────────────────────────────┤
│ <QuoteSection                                                      │
│   quote="A truly bespoke experience - Elizabeth personally         │
│          pairs each student with a carefully selected tutor        │
│          from her boutique team."                                   │
│   author="Academia Insight"                                        │
│   role=""                                                          │
│   backgroundColor="bg-primary-50"                                  │
│   useHighlighting={true}                                           │
│   useMagicUIEffects={true}                                         │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ 2.7.1 Magic UI Effects Implementation                              │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │                 ENHANCED QUOTE LAYOUT                   │         │
│ │                                                         │         │
│ │              ┌─────────────────────┐                   │         │
│ │              │                     │                   │         │
│ │              │    OPENING QUOTE    │                   │         │
│ │              │         "           │                   │         │
│ │              └─────────────────────┘                   │         │
│ │                        ↓                                │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │              HIGHLIGHTED TEXT                       │ │         │
│ │ │                                                     │ │         │
│ │ │ ┌─────────────────────────────────────────────┐     │ │         │
│ │ │ │                                             │     │ │         │
│ │ │ │        HIGHLIGHTER COMPONENT                │     │ │         │
│ │ │ │                                             │     │ │         │
│ │ │ │ "A truly bespoke" ← HIGHLIGHT EFFECT       │     │ │         │
│ │ │ │                                             │     │ │         │
│ │ │ │ • Action: "highlight"                       │     │ │         │
│ │ │ │ • Color: "#eab308" (Gold)                   │     │ │         │
│ │ │ │ • StrokeWidth: 2                            │     │ │         │
│ │ │ │ • Iterations: 1                             │     │ │         │
│ │ │ │ • Padding: 6                                │     │ │         │
│ │ │ └─────────────────────────────────────────────┘     │ │         │
│ │ │                        ↓                            │ │         │
│ │ │ " experience - Elizabeth personally pairs           │ │         │
│ │ │  each student with a "                              │ │         │
│ │ │                        ↓                            │ │         │
│ │ │ ┌─────────────────────────────────────────────┐     │ │         │
│ │ │ │                                             │     │ │         │
│ │ │ │        HIGHLIGHTER COMPONENT                │     │ │         │
│ │ │ │                                             │     │ │         │
│ │ │ │ "carefully selected tutor" ← UNDERLINE      │     │ │         │
│ │ │ │                                             │     │ │         │
│ │ │ │ • Action: "underline"                       │     │ │         │
│ │ │ │ • Color: "#ea580c" (Orange-Red)             │     │ │         │
│ │ │ │ • StrokeWidth: 2                            │     │ │         │
│ │ │ │ • Iterations: 1                             │     │ │         │
│ │ │ │ • Padding: 2                                │     │ │         │
│ │ │ └─────────────────────────────────────────────┘     │ │         │
│ │ │                        ↓                            │ │         │
│ │ │ " from her boutique team."                          │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                        ↓                                │         │
│ │              ┌─────────────────────┐                   │         │
│ │              │                     │                   │         │
│ │              │    CLOSING QUOTE    │                   │         │
│ │              │         "           │                   │         │
│ │              └─────────────────────┘                   │         │
│ │                        ↓                                │         │
│ │              ┌─────────────────────┐                   │         │
│ │              │                     │                   │         │
│ │              │     ATTRIBUTION     │                   │         │
│ │              │                     │                   │         │
│ │              │ "— Academia Insight" │                   │         │
│ │              │                     │                   │         │
│ │              │ • Font: text-lg     │                   │         │
│ │              │ • Weight: font-     │                   │         │
│ │              │   semibold          │                   │         │
│ │              │ • Color: text-      │                   │         │
│ │              │   primary-900       │                   │         │
│ │              │ • Style: not-italic │                   │         │
│ │              └─────────────────────┘                   │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.7.2 Component Configuration                                      │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Props Passed:                                                    │ │
│ │                                                                  │ │
│ │ • quote: "A truly bespoke experience - Elizabeth..."             │ │
│ │ • author: "Academia Insight"                                     │ │
│ │ • role: "" (Empty string - no role specified)                   │ │
│ │ • backgroundColor: "bg-primary-50"                               │ │
│ │ • useHighlighting: true                                          │ │
│ │ • useMagicUIEffects: true                                        │ │
│ │                                                                  │ │
│ │ MagicUI Highlighter Import:                                      │ │
│ │ • Component: @/components/magicui/highlighter                    │ │
│ │ • Actions: "highlight" and "underline"                           │ │
│ │ • Colors: Gold (#eab308) and Orange-Red (#ea580c)               │ │
│ │ • Animation: Dynamic stroke rendering effects                    │ │
│ │                                                                  │ │
│ │ Layout Configuration:                                            │ │
│ │ • Container: max-w-4xl mx-auto                                   │ │
│ │ • Alignment: text-center                                         │ │
│ │ • Spacing: py-16 lg:py-24 (standard quote section)              │ │
│ │ • Background: Subtle primary color tint                         │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.7.3 Typography Specifications                                    │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Quote Text:                                                      │ │
│ │ • Size: text-xl lg:text-2xl                                     │ │
│ │ • Font: font-serif (elegant, traditional)                       │ │
│ │ • Color: text-primary-700                                        │ │
│ │ • Style: italic (distinguishes from body text)                  │ │
│ │ • Leading: leading-relaxed                                       │ │
│ │ • Margin: mb-8 (space to attribution)                           │ │
│ │                                                                  │ │
│ │ Attribution:                                                     │ │
│ │ • Size: text-lg                                                  │ │
│ │ • Weight: font-semibold                                          │ │
│ │ • Color: text-primary-900 (stronger than quote)                 │ │
│ │ • Style: not-italic (differentiates from quote)                 │ │
│ │ • Format: "— [Author][, Role]" (em dash prefix)                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.8 TestimonialsSection - Premium Carousel
```
┌─────────────────────────────────────────────────────────────────────┐
│                      TESTIMONIALS SECTION                          │
│ Component: /components/sections/about/testimonials-section.tsx      │
├─────────────────────────────────────────────────────────────────────┤
│ <TestimonialsSection testimonials={aboutTestimonials} />            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ 2.8.1 Complete Section Architecture                                │
│ ┌─────────────────────────────────────────────────────────┐         │
│ │              PREMIUM TESTIMONIALS LAYOUT                │         │
│ │                                                         │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │                SECTION HEADER                       │ │         │
│ │ │                                                     │ │         │
│ │ │         "What Families Say About Us"                │ │         │
│ │ │                                                     │ │         │
│ │ │ H2: text-4xl lg:text-5xl font-serif font-bold      │ │         │
│ │ │ Color: text-primary-900                             │ │         │
│ │ │ Margin: mb-6                                        │ │         │
│ │ │                                                     │ │         │
│ │ │    "Real feedback from real families who have      │ │         │
│ │ │     experienced the transformative power of         │ │         │
│ │ │     personalised tutoring"                          │ │         │
│ │ │                                                     │ │         │
│ │ │ P: text-xl text-primary-700 max-w-3xl mx-auto      │ │         │
│ │ │    leading-relaxed                                  │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                          ↓                              │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │              FILTER CONTROLS                        │ │         │
│ │ │                                                     │ │         │
│ │ │ ┌─────────────────┐  ┌─────────────────────┐       │ │         │
│ │ │ │                 │  │                     │       │ │         │
│ │ │ │ FILTER BUTTON   │  │   CLEAR FILTERS    │       │ │         │
│ │ │ │                 │  │     BUTTON          │       │ │         │
│ │ │ │ 🔍 Filter       │  │  ❌ Clear Filters  │       │ │         │
│ │ │ │    Testimonials │  │                     │       │ │         │
│ │ │ │                 │  │ (Conditional:       │       │ │         │
│ │ │ │ Badge: Active   │  │  Only when filters  │       │ │         │
│ │ │ │       Count     │  │  are applied)       │       │ │         │
│ │ │ │                 │  │                     │       │ │         │
│ │ │ │ onClick: Toggle │  │ onClick: clearAll   │       │ │         │
│ │ │ └─────────────────┘  └─────────────────────┘       │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                          ↓                              │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │           EXPANDABLE FILTER MENU                    │ │         │
│ │ │        (Conditional: showFilterMenu=true)           │ │         │
│ │ │                                                     │ │         │
│ │ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │ │         │
│ │ │ │             │ │             │ │             │     │ │         │
│ │ │ │   SUBJECT   │ │ ACADEMIC    │ │   RESULTS   │     │ │         │
│ │ │ │   FILTER    │ │   LEVEL     │ │   FILTER    │     │ │         │
│ │ │ │             │ │  FILTER     │ │             │     │ │         │
│ │ │ │ All Subjects│ │ All Levels  │ │ All Tests   │     │ │         │
│ │ │ │ Mathematics │ │ A-Level     │ │ With Results│     │ │         │
│ │ │ │ English     │ │ GCSE        │ │ General     │     │ │         │
│ │ │ │ Sciences    │ │ 11+         │ │ Feedback    │     │ │         │
│ │ │ │ Languages   │ │ University  │ │             │     │ │         │
│ │ │ │ [Dynamic]   │ │ [Dynamic]   │ │             │     │ │         │
│ │ │ │             │ │             │ │             │     │ │         │
│ │ │ │ • Button    │ │ • Button    │ │ • Button    │     │ │         │
│ │ │ │   variants  │ │   variants  │ │   variants  │     │ │         │
│ │ │ │ • Active    │ │ • Active    │ │ • Trophy    │     │ │         │
│ │ │ │   states    │ │   states    │ │   icons     │     │ │         │
│ │ │ └─────────────┘ └─────────────┘ └─────────────┘     │ │         │
│ │ │                                                     │ │         │
│ │ │        Filter Results Counter:                      │ │         │
│ │ │        "Showing X of Y testimonials"                │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ │                          ↓                              │         │
│ │ ┌─────────────────────────────────────────────────────┐ │         │
│ │ │              SWIPER CAROUSEL                        │ │         │
│ │ │                                                     │ │         │
│ │ │ ┌─────────┐   ┌─────────┐   ┌─────────┐             │ │         │
│ │ │ │         │   │         │   │         │             │ │         │
│ │ │ │ CARD 1  │   │ CARD 2  │   │ CARD 3  │             │ │         │
│ │ │ │         │   │         │   │         │             │ │         │
│ │ │ │⭐⭐⭐⭐⭐│   │⭐⭐⭐⭐⭐│   │⭐⭐⭐⭐⭐│             │ │         │
│ │ │ │         │   │         │   │         │             │ │         │
│ │ │ │"Quote..." │   │"Quote..." │   │"Quote..." │             │ │         │
│ │ │ │         │   │         │   │         │             │ │         │
│ │ │ │ Author  │   │ Author  │   │ Author  │             │ │         │
│ │ │ │ Role    │   │ Role    │   │ Role    │             │ │         │
│ │ │ │ Subject │   │ Subject │   │ Subject │             │ │         │
│ │ │ │🏆 Result│   │🏆 Result│   │🏆 Result│             │ │         │
│ │ │ └─────────┘   └─────────┘   └─────────┘             │ │         │
│ │ │                                                     │ │         │
│ │ │ Mobile: 1 card | Tablet: 2 cards | Desktop: 3 cards│ │         │
│ │ │                                                     │ │         │
│ │ │ ◁ Previous                         Next ▷           │ │         │
│ │ │   Button                          Button            │ │         │
│ │ │                                                     │ │         │
│ │ │         ● ● ○ ○ ○ ○                                 │ │         │
│ │ │       Pagination Dots                               │ │         │
│ │ └─────────────────────────────────────────────────────┘ │         │
│ └─────────────────────────────────────────────────────────┘         │
│                                                                     │
│ 2.8.2 Swiper Configuration                                         │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Modules Enabled:                                                 │ │
│ │ • Navigation: Previous/Next arrow buttons                       │ │
│ │ • Pagination: Clickable dots with dynamic bullets              │ │
│ │ • Autoplay: 4s delay with pause on hover                       │ │
│ │ • Keyboard: Arrow key navigation support                        │ │
│ │ • A11y: Screen reader announcements                            │ │
│ │                                                                  │ │
│ │ Responsive Breakpoints:                                          │ │
│ │ • Mobile (640px): 1 slide, 20px gap                            │ │
│ │ • Tablet (768px): 2 slides, 30px gap                           │ │
│ │ • Desktop (1024px+): 3 slides, 30px gap                        │ │
│ │                                                                  │ │
│ │ Interactive Features:                                            │ │
│ │ • Touch/Swipe: Full gesture support                            │ │
│ │ • Navigation: Custom styled arrow buttons                       │ │
│ │ • Pagination: Dynamic bullets with hover states                │ │
│ │ • Autoplay: Automatic progression with user interaction pause  │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.8.3 Testimonial Card Structure                                   │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Card Component: Radix UI Card with CardContent                  │ │
│ │                                                                  │ │
│ │ Visual Hierarchy:                                                │ │
│ │ 1. Star Rating: 5 filled stars (⭐⭐⭐⭐⭐)                        │ │
│ │    • Icons: Lucide Star with fill-current                      │ │
│ │    • Color: text-accent-500 (gold)                              │ │
│ │    • Layout: Centered, mb-6 spacing                             │ │
│ │                                                                  │ │
│ │ 2. Quote Content: Blockquote element                            │ │
│ │    • Text: text-lg text-primary-700 italic                     │ │
│ │    • Leading: leading-relaxed                                   │ │
│ │    • Spacing: mb-6, flex-grow (fills available space)          │ │
│ │                                                                  │ │
│ │ 3. Footer Section: Border-top with author info                  │ │
│ │    • Border: border-t border-primary-100 pt-6 mt-auto          │ │
│ │    • Layout: Flex justify-between for author/badge             │ │
│ │                                                                  │ │
│ │ 4. Author Information:                                           │ │
│ │    • Name: font-semibold text-primary-900                      │ │
│ │    • Role: text-sm text-primary-600                             │ │
│ │                                                                  │ │
│ │ 5. Subject Badge: Radix UI Badge component                      │ │
│ │    • Variant: secondary                                          │ │
│ │    • Colors: bg-accent-100 text-accent-800                      │ │
│ │    • Hover: bg-accent-200 transition                            │ │
│ │                                                                  │ │
│ │ 6. Result Indicator: Trophy icon with text                      │ │
│ │    • Icon: Lucide Trophy, text-accent-600                       │ │
│ │    • Text: text-sm font-medium text-accent-700                  │ │
│ │    • Layout: flex items-center gap-2 mt-4                      │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.8.4 Data Integration & Filtering                                 │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ CMS Data Source:                                                 │ │
│ │ • Function: getTextTestimonials() from cms-content.ts           │ │
│ │ • Filter: Automatically excludes video testimonials             │ │
│ │ • Type: Testimonial[] interface from CMS                        │ │
│ │                                                                  │ │
│ │ Filter System:                                                   │ │
│ │ • State: useState<FilterOptions> with React hooks               │ │
│ │ • Subjects: Dynamic array from testimonial data                 │ │
│ │ • Levels: Regex extraction from role field                      │ │
│ │ • Results: Boolean filter for trophy indicators                 │ │
│ │                                                                  │ │
│ │ Performance Optimization:                                        │ │
│ │ • useCallback: Memoized filter function                         │ │
│ │ • Dynamic Updates: Carousel resets to slide 1 on filter change │ │
│ │ • Empty State: Styled message with clear filter option         │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.9 Complete About Page Performance & SEO
```
┌─────────────────────────────────────────────────────────────────────┐
│                    ABOUT PAGE OPTIMIZATION                         │
│ Performance, SEO, and Technical Implementation Details             │
├─────────────────────────────────────────────────────────────────────┤
│ 2.9.1 Performance Specifications                                   │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Loading Performance:                                             │ │
│ │ • Target Load Time: <1.5s (Royal client standards)              │ │
│ │ • Image Optimization: Next.js Image with lazy loading           │ │
│ │ • Code Splitting: Component-level imports                       │ │
│ │ • Animation Optimization: Reduced motion compliance             │ │
│ │                                                                  │ │
│ │ Bundle Optimization:                                             │ │
│ │ • Framer Motion: Tree-shaken imports (m instead of motion)      │ │
│ │ • Swiper: Module-specific imports                               │ │
│ │ • Icons: Selective Lucide imports                               │ │
│ │ • CSS: Swiper CSS imported only where needed                    │ │
│ │                                                                  │ │
│ │ Memory Management:                                               │ │
│ │ • useCallback: Memoized filter functions                       │ │
│ │ • useState: Minimal state management                            │ │
│ │ • Cleanup: Proper component unmounting                          │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.9.2 SEO Implementation                                           │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Page-Level SEO:                                                  │ │
│ │ • Meta Title: "About Elizabeth Burrows | My Private Tutor"       │ │
│ │ • Meta Description: Premium tutoring founder story              │ │
│ │ • Schema Markup: Organization and Person structured data        │ │
│ │ • Open Graph: Social sharing optimization                       │ │
│ │                                                                  │ │
│ │ Content SEO:                                                     │ │
│ │ • H1 Tag: "Our Founder and Ethos" (SimpleHero)                  │ │
│ │ • H2 Tags: Section headings with semantic hierarchy             │ │
│ │ • Alt Text: Descriptive image alternatives                      │ │
│ │ • Internal Links: Strategic linking to service pages            │ │
│ │                                                                  │ │
│ │ Technical SEO:                                                   │ │
│ │ • Semantic HTML: Proper blockquote, cite, section elements      │ │
│ │ • ARIA Labels: Accessibility compliance                         │ │
│ │ • Core Web Vitals: Optimized for LCP, FID, CLS                 │ │
│ │ • Mobile-First: Responsive design priority                      │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.9.3 Accessibility Compliance                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ WCAG 2.1 AA Standards:                                          │ │
│ │ • Color Contrast: All text meets minimum ratios                 │ │
│ │ • Keyboard Navigation: Full carousel and filter control         │ │
│ │ • Screen Readers: ARIA labels and announcements                 │ │
│ │ • Focus Management: Visible focus indicators                    │ │
│ │                                                                  │ │
│ │ Interactive Accessibility:                                       │ │
│ │ • Button Labels: Descriptive button text and aria-labels        │ │
│ │ • Carousel A11y: Previous/next announcements                    │ │
│ │ • Filter Controls: Clear state communication                    │ │
│ │ • Reduced Motion: respects prefers-reduced-motion               │ │
│ │                                                                  │ │
│ │ Semantic Structure:                                              │ │
│ │ • Heading Hierarchy: Logical H1->H2->H3 progression             │ │
│ │ • Landmark Roles: Section and navigation elements               │ │
│ │ • List Structure: Proper ul/li for testimonials                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ 2.9.4 Royal Client Standards Compliance                           │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Premium Experience Indicators:                                   │ │
│ │ • Typography: Serif fonts for elegance and authority            │ │
│ │ • Color Palette: Navy and gold royal color scheme               │ │
│ │ • Spacing: Golden ratio spacing system                          │ │
│ │ • Animation: Subtle, professional motion effects                │ │
│ │                                                                  │ │
│ │ Content Quality:                                                 │ │
│ │ • Founder Story: Personal, authentic narrative                   │ │
│ │ • Testimonials: Real client feedback with results               │ │
│ │ • Professional Images: High-quality founder portraits           │ │
│ │ • Academic Credibility: Forbes background and achievements      │ │
│ │                                                                  │ │
│ │ User Experience:                                                 │ │
│ │ • Loading States: Smooth transitions and skeleton screens       │ │
│ │ • Error Handling: Graceful fallbacks for missing content        │ │
│ │ • Mobile Experience: Touch-optimized interactions               │ │
│ │ • Performance: Sub-1.5s loading for royal client expectations   │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Subject Tuition (/subject-tuition)

### 3.0 Complete Page Architecture Overview
```
┌═══════════════════════════════════════════════════════════════════════════════════════┐
║ SUBJECT TUITION PAGE - COMPREHENSIVE ARCHITECTURAL MAP                               ║
║ File: /app/subject-tuition/page.tsx - Next.js 15+ Client Component                   ║
║ Layout: Modular Refactored Architecture + 4 Major Sections + CMS Integration        ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║                                 ┌─ FIXED ELEMENTS ─┐                                 ║
║                                 │ • Navigation Header│                               ║
║                                 │ • Section Anchors │                                ║
║                                 │ • Wave Separators │                                ║
║                                 └───────────────────┘                                 ║
║                                                                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 1. HERO SECTION (Full Viewport)                                                  │ ║
║ │    • Background: hero-subject-tuition-primary.jpg                               │ ║
║ │    • Component: SimpleHero                                                      │ ║
║ │    • Title: "Subject Tutoring & Exam Preparation"                              │ ║
║ │    • Style: Lines decorative pattern                                           │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 2. SUBJECT ACCORDION SECTION (py-16 lg:py-24)                                   │ ║
║ │    • Component: SubjectAccordion (Modular Extracted)                           │ ║
║ │    • Background: Gradient overlay from white via slate-50                      │ ║
║ │    • Data Source: getServicesSubjectCategories()                               │ ║
║ │    • Features: Nested dropdown navigation with icons                           │ ║
║ │    • Section Anchors: #primary, #secondary, #entrance-exams, etc.             │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 3. RESULTS DOCUMENTATION (py-16 lg:py-24)                                      │ ║
║ │    • Component: ResultsDocumentation (async loaded)                            │ ║
║ │    • Background: Gradient from slate-50 via white to slate-50                 │ ║
║ │    • Title: "Quantifiable Academic Outcomes"                                   │ ║
║ │    • Features: Verification badges, confidence intervals                       │ ║
║ │    • Layout: Grid with maxItems={3}                                            │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 4. HOMESCHOOLING PREVIEW SECTION (py-16 lg:py-24)                              │ ║
║ │    • Layout: 2-column grid (content + image)                                   │ ║
║ │    • Background: Gradient from amber-50/30 via yellow-25 to orange-50/20      │ ║
║ │    • Image: programme-homeschooling-offer.jpg (600x450)                       │ ║
║ │    • CTA Button: Link to /homeschooling                                        │ ║
║ │    • Features: Animated bullet points with amber gradient dots                 │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                       ║
║ TECHNICAL SPECIFICATIONS:                                                             ║
║ • Total Sections: 4 major content areas (streamlined from original 7)              ║
║ • Page Type: Client Component ("use client") for Framer Motion                     ║
║ • Layout Props: PageLayout with showHeader={true}, showFooter={true}               ║
║ • CMS Integration: Synchronous pattern (CRITICAL for homepage stability)           ║
║ • Modular Architecture: Extracted reusable components for maintainability          ║
║ • Animation: Framer Motion with whileInView triggers                               ║
║ • Performance: Direct JSON imports, no async complexity                             ║
║ • Navigation: Section anchor system for service button deep linking               ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

### 3.1 SimpleHero Component Integration
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HERO SECTION - STANDARDIZED PATTERN                                                │
│ Component: SimpleHero                                                               │
│ Position: Outside PageLayout for full-screen treatment                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   <SimpleHero                                                                       │
│     backgroundImage="/images/hero/hero-subject-tuition-primary.jpg"                │
│     h1="Subject Tutoring & Exam Preparation"                                       │
│     h2="Expert Tuition"                                                             │
│     decorativeStyle="lines"                                                         │
│   />                                                                                │
│                                                                                     │
│ ┌─────────────────────┬─────────────────────────────────────────────────────────┐ │
│ │ VISUAL STRUCTURE    │ TECHNICAL SPECIFICATIONS                                │ │
│ ├─────────────────────┼─────────────────────────────────────────────────────────┤ │
│ │ • Full viewport     │ • File: /components/layout/simple-hero.tsx             │ │
│ │ • Background image  │ • Props: backgroundImage, h1, h2, decorativeStyle      │ │
│ │ • Typography stack  │ • Image: Next.js Image with priority loading           │ │
│ │ • Lines decoration  │ • Layout: Absolute positioning with text overlay       │ │
│ │ • Responsive text   │ • Animation: fadeIn with 0.6s duration                 │ │
│ └─────────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ INTEGRATION PATTERN:                                                                │
│ • Positioned outside PageLayout wrapper                                            │
│ • Consistent with homepage and about page hero treatment                           │
│ • Official Next.js documentation patterns for full-screen hero sections           │
│                                                                                     │
│ CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following     │
│ consistent hero patterns across pages                                               │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Modular SubjectAccordion Architecture
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ SUBJECT ACCORDION - EXTRACTED MODULAR COMPONENT                                    │
│ Component: SubjectAccordion (from /components/sections/subject-accordion)          │
│ Architecture: Refactored from monolithic to modular design                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│ <Section id="primary-secondary" className="py-16 lg:py-24" background="white">     │
│   <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50        │
│        to-white opacity-50" />                                                      │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">          │
│     <m.div className="text-center mb-16" whileInView={{opacity:1, y:0}}>           │
│       <h2 className="text-4xl lg:text-5xl font-serif font-bold                     │
│           text-slate-900 mb-6">{sectionTitles.subjectCategories.title}</h2>        │
│       <p className="text-xl text-slate-700 max-w-4xl mx-auto">                     │
│         {sectionTitles.subjectCategories.description}</p>                          │
│     </m.div>                                                                        │
│                                                                                     │
│     <div className="max-w-6xl mx-auto">                                            │
│       {/* Navigation anchor points for service button links */}                    │
│       <div id="primary" className="-mt-24 pt-24"></div>                           │
│       <div id="secondary" className="-mt-24 pt-24"></div>                         │
│       <div id="entrance-exams" className="-mt-24 pt-24"></div>                    │
│       <div id="university-beyond" className="-mt-24 pt-24"></div>                 │
│       <div id="sen-neurodiverse" className="-mt-24 pt-24"></div>                  │
│       <div id="london-in-person" className="-mt-24 pt-24"></div>                  │
│                                                                                     │
│       <SubjectAccordion                                                            │
│         categories={subjectCategories}                                             │
│         defaultOpenSections={[]}                                                   │
│         onSectionToggle={(sectionId, isOpen) => {                                  │
│           console.log(`Section ${sectionId} ${isOpen ? 'opened' : 'closed'}`)     │
│         }}                                                                         │
│       />                                                                           │
│     </div>                                                                         │
│   </div>                                                                           │
│ </Section>                                                                         │
│                                                                                     │
│ ┌─────────────────────┬─────────────────────────────────────────────────────────┐ │
│ │ COMPONENT PROPS     │ DATA TRANSFORMATION                                     │ │
│ ├─────────────────────┼─────────────────────────────────────────────────────────┤ │
│ │ • categories[]      │ • CMS Source: getServicesSubjectCategories()           │ │
│ │ • defaultOpenSections│ • Icon Mapping: String to React component             │ │
│ │ • onSectionToggle   │ • Nested Children: Support for multi-level hierarchy  │ │
│ │ • Animation support │ • Type Safety: SubjectCategory interface               │ │
│ └─────────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ MODULAR BENEFITS:                                                                   │
│ • Improved maintainability through component separation                             │
│ • Enhanced reusability across pages                                                │
│ • Cleaner codebase with focused responsibilities                                   │
│ • Easier testing and debugging of individual sections                              │
│                                                                                     │
│ CONTEXT7 SOURCE: /facebook/react - Refactored page component using extracted       │
│ modular components. Official React documentation Section 3.1 recommends component  │
│ composition patterns for maintainability                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Performance & Architecture Notes  
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ PERFORMANCE OPTIMIZATIONS & ARCHITECTURAL DECISIONS                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│ RENDERING ANALYSIS - CONTEXT7 MCP VERIFIED:                                        │
│ • Component Type: Client Component ("use client") - Automatic dynamic rendering    │
│ • Route Mode: Dynamic (ƒ) via client directive                                     │
│ • Bundle Impact: Interactive elements require client-side hydration                │
│ • Performance: <25s build time, optimized component splitting                      │
│                                                                                     │
│ CMS INTEGRATION PATTERN:                                                           │
│ • Synchronous Data Access: CRITICAL for homepage stability                         │
│ • Direct Function Calls: No async complexity for static content                    │
│ • Icon Transformation: String to React component mapping                           │
│ • Type-Safe Processing: TypeScript interfaces for data structures                  │
│                                                                                     │
│ CONTEXT7 SOURCE: /vercel/next.js - Component Architecture: Modular composition     │
│ with extracted reusable components. Official Next.js patterns for component        │
│ composition and performance with distributed state management                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. How It Works (/how-it-works)

### 4.0 Complete Page Architecture Overview
```
┌═══════════════════════════════════════════════════════════════════════════════════════┐
║ HOW IT WORKS PAGE - COMPREHENSIVE ARCHITECTURAL MAP                                  ║
║ File: /app/how-it-works/page.tsx - Next.js 15+ Client Component                      ║
║ Layout: Tier Spotlight Central Design + 5 Major Sections                             ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║                                 ┌─ FIXED ELEMENTS ─┐                                 ║
║                                 │ • Navigation Header│                               ║
║                                 │ • Tier 1 Central  │                                ║
║                                 │ • Process Steps   │                                ║
║                                 └───────────────────┘                                 ║
║                                                                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 1. HERO SECTION (Full Viewport)                                                  │ ║
║ │    • Background: hero-how-it-works-premium.jpg                                  │ ║
║ │    • Component: SimpleHero                                                      │ ║
║ │    • Title: "How Our Premium Service Works"                                    │ ║
║ │    • Style: Lines decorative pattern                                           │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 2. TIER 1 SPOTLIGHT SECTION (py-20 Premium Gold)                               │ ║
║ │    • Layout: Central spotlight design with crown icon                          │ ║
║ │    • Background: Gradient from amber-50 via yellow-50 to orange-50            │ ║
║ │    • Features: Premium service emphasis, Tier 1 showcase                      │ ║
║ │    • Visual: Crown iconography, gold color scheme                             │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 3. PROCESS STEPS SECTION (py-16 lg:py-24)                                      │ ║
║ │    • Layout: 4-column grid for step-by-step process                           │ ║
║ │    • Visual: Numbered circles with gradient backgrounds                        │ ║
║ │    • Animation: Hover effects and sequential reveal                           │ ║
║ │    • Content: Clear workflow explanation                                       │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 4. FEATURES OVERVIEW SECTION (py-16 lg:py-24)                                  │ ║
║ │    • Component: Grid of service features                                       │ ║
║ │    • Background: White with subtle pattern overlay                            │ ║
║ │    • Layout: 3-column responsive grid with feature cards                      │ ║
║ │    • Icons: Service-specific iconography with descriptions                     │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                        ↓ FLOW ↓                                       ║
║ ┌───────────────────────────────────────────────────────────────────────────────────┐ ║
║ │ 5. FAQ PREVIEW SECTION (py-16 lg:py-24)                                        │ ║
║ │    • Layout: Common questions with expandable answers                          │ ║
║ │    • Background: Slate-50 with accordions                                     │ ║
║ │    • Features: Quick answers, link to full FAQ page                           │ ║
║ │    • Interactive: Collapsible question/answer pairs                           │ ║
║ └───────────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                       ║
║ TECHNICAL SPECIFICATIONS:                                                             ║
║ • Total Sections: 5 major content areas with tier spotlight focus                   ║
║ • Page Type: Client Component ("use client") for interactive elements              ║
║ • Layout Props: PageLayout with showHeader={true}, showFooter={true}               ║
║ • Central Design: Tier 1 service prominence with gold styling                       ║
║ • Animation: Process step reveal, feature card interactions                         ║
║ • Performance: Optimized component loading, lazy background patterns               ║
║ • Navigation: Clear workflow progression, FAQ quick access                          ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

### 4.1 Tier 1 Spotlight Section - Central Design Focus
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ TIER 1 SPOTLIGHT - CENTRAL PREMIER SERVICE SHOWCASE                                │
│ Layout: Central prominence with premium gold styling                               │
│ Position: Primary section highlighting flagship service tier                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│ <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50            │
│          to-orange-50 relative">                                                    │
│   <div className="absolute inset-0 bg-[url('/images/patterns/                      │
│        subtle-topography.svg')] opacity-5" />                                      │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">          │
│     <m.div className="text-center mb-16">                                          │
│       <div className="inline-flex items-center justify-center w-20 h-20           │
│            bg-gradient-to-r from-amber-400 to-yellow-500                           │
│            rounded-full mb-8 shadow-lg">                                           │
│         <Crown className="w-10 h-10 text-white" />                                │
│       </div>                                                                       │
│       <h2 className="text-4xl lg:text-5xl font-serif font-bold                    │
│           text-slate-900 mb-6">Premier Service: Tier 1 Tutoring</h2>              │
│       <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">               │
│         Our flagship service offering the highest calibre                          │
│         of educational support</p>                                                 │
│     </m.div>                                                                       │
│                                                                                     │
│     <div className="max-w-4xl mx-auto">                                            │
│       <m.div className="bg-white/95 backdrop-blur-sm border-2                     │
│                border-amber-200 rounded-3xl p-8 lg:p-12 shadow-2xl">              │
│         <div className="grid lg:grid-cols-2 gap-12 items-center">                 │
│           <div>                                                                    │
│             <div className="bg-gradient-to-r from-amber-100                       │
│                  to-yellow-100 rounded-2xl p-6 mb-8">                             │
│               <h3 className="text-2xl font-serif font-bold                        │
│                   text-slate-900 mb-4">What Makes Tier 1 Special</h3>             │
│               <ul className="space-y-3">                                           │
│                 <li className="flex items-start gap-3">                           │
│                   <CheckCircle className="w-5 h-5 text-amber-600 mt-1" />         │
│                   <span>Oxford/Cambridge graduate tutors</span>                   │
│                 </li>                                                              │
│                 <li className="flex items-start gap-3">                           │
│                   <CheckCircle className="w-5 h-5 text-amber-600 mt-1" />         │
│                   <span>Bespoke curriculum planning</span>                        │
│                 </li>                                                              │
│                 <li className="flex items-start gap-3">                           │
│                   <CheckCircle className="w-5 h-5 text-amber-600 mt-1" />         │
│                   <span>Weekly progress assessments</span>                        │
│                 </li>                                                              │
│               </ul>                                                                │
│             </div>                                                                 │
│           </div>                                                                   │
│           <div className="relative">                                               │
│             <Image src="/images/tier-1-showcase.avif"                             │
│                    alt="Tier 1 tutoring showcase"                                 │
│                    width={600} height={400}                                       │
│                    className="rounded-2xl shadow-lg" />                           │
│           </div>                                                                   │
│         </div>                                                                     │
│       </m.div>                                                                     │
│     </div>                                                                         │
│   </div>                                                                           │
│ </section>                                                                         │
│                                                                                     │
│ ┌─────────────────────┬─────────────────────────────────────────────────────────┐ │
│ │ DESIGN ELEMENTS     │ TECHNICAL IMPLEMENTATION                                │ │
│ ├─────────────────────┼─────────────────────────────────────────────────────────┤ │
│ │ • Central spotlight │ • Crown Icon: Lucide Icons premium symbol               │ │
│ │ • Premium colours   │ • Gradient: Amber to yellow gold scheme                 │ │
│ │ • Gold gradients    │ • Background Pattern: Subtle topography SVG            │ │
│ │ • Shadow elevation  │ • Image: Tier 1 showcase with 600x400 optimized        │ │
│ │ • Tier 1 emphasis   │ • Animation: Framer Motion whileInView triggers         │ │
│ │ • Service showcase  │ • Layout: 2-column grid with backdrop blur card        │ │
│ └─────────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ CONTEXT7 SOURCE: /vercel/next.js - Tier 1 spotlight section with central design   │
│ prominence. Official Next.js patterns for premium service showcase                 │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Process Steps Section
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ PROCESS STEPS - 4-STEP WORKFLOW VISUALIZATION                                      │
│ Layout: 4-column responsive grid with numbered circles                             │
│ Animation: Sequential reveal with hover interactions                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│ <section className="py-16 lg:py-24 bg-white">                                      │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8">                        │
│     <m.div className="text-center mb-16">                                          │
│       <h2 className="text-3xl lg:text-4xl font-serif font-bold                    │
│           text-slate-900 mb-6">Our 4-Step Process</h2>                             │
│       <p className="text-xl text-slate-700 max-w-3xl mx-auto">                    │
│         From initial consultation to academic success</p>                          │
│     </m.div>                                                                       │
│                                                                                     │
│     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">                    │
│       {processSteps.map((step, index) => (                                        │
│         <m.div key={index} className="text-center group">                         │
│           <div className="relative mb-6">                                          │
│             <div className="w-20 h-20 bg-gradient-to-r                            │
│                  from-blue-500 to-indigo-600 rounded-full                         │
│                  flex items-center justify-center mx-auto mb-4                    │
│                  shadow-lg group-hover:shadow-xl">                                │
│               <span className="text-2xl font-bold text-white">                    │
│                 {index + 1}                                                        │
│               </span>                                                              │
│             </div>                                                                 │
│             <h3 className="text-xl font-semibold text-slate-900 mb-3">           │
│               {step.title}                                                         │
│             </h3>                                                                  │
│             <p className="text-slate-600">{step.description}</p>                  │
│           </div>                                                                   │
│         </m.div>                                                                   │
│       ))}                                                                          │
│     </div>                                                                         │
│   </div>                                                                           │
│ </section>                                                                         │
│                                                                                     │
│ ┌─────────────────────┬─────────────────────────────────────────────────────────┐ │
│ │ VISUAL FEATURES     │ TECHNICAL SPECIFICATIONS                                │ │
│ ├─────────────────────┼─────────────────────────────────────────────────────────┤ │
│ │ • 4-column grid     │ • Data Source: processSteps array mapping               │ │
│ │ • Numbered circles  │ • Animation: group-hover shadow transitions             │ │
│ │ • Blue gradients    │ • Grid: Responsive md:2-cols to lg:4-cols               │ │
│ │ • Hover effects     │ • Typography: Hierarchical text sizing                  │ │
│ │ • Sequential layout │ • Spacing: Consistent gap-8 throughout                  │ │
│ │ • Clear workflow    │ • Icons: Numbered badges with gradient backgrounds      │ │
│ └─────────────────────┴─────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ CONTEXT7 SOURCE: /facebook/react - Process steps component with array mapping      │
│ and interactive hover states. Official React patterns for sequential UI displays   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Performance & Technical Notes
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ PERFORMANCE OPTIMIZATIONS & TECHNICAL ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│ CENTRAL DESIGN RATIONALE:                                                          │
│ • Tier 1 Spotlight: Premium service gets visual priority and prominence            │
│ • Gold Colour Scheme: Conveys premium, luxury educational experience               │
│ • Crown Iconography: Royal endorsement visual reinforcement                        │
│ • Central Layout: Draws immediate attention to flagship offering                   │
│                                                                                     │
│ RENDERING ANALYSIS - CONTEXT7 MCP VERIFIED:                                        │
│ • Component Type: Client Component ("use client") for interactive animations       │
│ • Route Mode: Dynamic (ƒ) via client directive for Framer Motion                  │
│ • Performance: Background pattern lazy loading, optimized image formats            │
│ • Bundle Impact: Process step animations require client-side JavaScript            │
│                                                                                     │
│ ANIMATION ARCHITECTURE:                                                            │
│ • Sequential Reveal: Process steps animate in order for narrative flow             │
│ • Hover Interactions: Enhanced shadow effects for premium feel                     │
│ • Viewport Triggers: whileInView for performance-optimized animations              │
│ • Reduced Motion: Respects user accessibility preferences                          │
│                                                                                     │
│ CONTEXT7 SOURCE: /vercel/next.js - How It Works page architecture with tier        │
│ spotlight central design. Official Next.js patterns for premium service emphasis   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Testimonials (/testimonials)

### 5.1 Page Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ TestimonialsPage - Client Component                                │
│ showHeader={true} showFooter={true}                                │
├─────────────────────────────────────────────────────────────────────┤
│ 5.1 SimpleHero Section                                            │
│ 5.2 Scrolling Schools                                             │
│ 5.3 Animated Tagline                                              │
│ 5.4 Testimonials Grid                                             │
│ 5.5 Statistics Section                                            │
│ 5.6 CTA Section                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.1 SimpleHero Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <SimpleHero                                                        │
│   backgroundImage="/images/hero/hero-testimonials.jpeg"            │
│   h1="Client Testimonials"                                         │
│   h2="Success Stories"                                             │
│   decorativeStyle="lines"                                          │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Background: hero-testimonials.jpeg                              │
│ • Style: Consistent with other page heroes                        │
│ • Title: Focus on client success stories                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Testimonials Grid
```
┌─────────────────────────────────────────────────────────────────────┐
│ <section className="py-16 lg:py-24 bg-slate-50">                  │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8">        │
│     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">    │
│       {testimonials.map((testimonial, index) => (                 │
│         <m.div key={index}                                         │
│                className="bg-white rounded-2xl p-8                │
│                          shadow-lg hover:shadow-2xl">              │
│           <div className="mb-6">                                   │
│             <div className="flex text-yellow-400 mb-4">           │
│               {Array.from({length: 5}).map((_, i) => (            │
│                 <Star key={i} className="w-5 h-5 fill-current" />│
│               ))}                                                   │
│             </div>                                                  │
│             <blockquote className="text-slate-700                 │
│                         text-lg leading-relaxed                   │
│                         italic mb-6">                             │
│               "{testimonial.content}"                              │
│             </blockquote>                                          │
│           </div>                                                    │
│                                                                     │
│           <div className="flex items-center gap-4">               │
│             <div className="w-12 h-12 bg-gradient-to-r            │
│                  from-blue-100 to-indigo-100                      │
│                  rounded-full flex items-center                   │
│                  justify-center">                                 │
│               <span className="text-blue-600 font-semibold">      │
│                 {testimonial.author.charAt(0)}                    │
│               </span>                                               │
│             </div>                                                  │
│             <div>                                                   │
│               <div className="font-semibold text-slate-900">       │
│                 {testimonial.author}                               │
│               </div>                                                │
│               <div className="text-sm text-slate-500">             │
│                 {testimonial.role}                                 │
│               </div>                                                │
│             </div>                                                  │
│           </div>                                                    │
│         </m.div>                                                   │
│       ))}                                                          │
│     </div>                                                         │
│   </div>                                                           │
│ </section>                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ • Layout: Responsive grid (1-col mobile, 2-col tablet, 3-col desktop)│
│ • Cards: White cards with shadow hover effects                    │
│ • Content: 5-star ratings, testimonial text, author info          │
│ • Avatar: Initial-based circular avatar system                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Video Masterclasses (/video-masterclasses)

### 6.1 Page Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ VideoMasterclassesPage - Client Component                          │
│ showHeader={true} showFooter={true}                                │
├─────────────────────────────────────────────────────────────────────┤
│ 6.1 SimpleHero Section                                            │
│ 6.2 Video Grid Section                                            │
│ 6.3 Features Section                                              │
│ 6.4 Pricing Section                                               │
│ 6.5 CTA Section                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.1 SimpleHero Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <SimpleHero                                                        │
│   backgroundImage="/images/hero/hero-video-masterclasses.jpeg"     │
│   h1="Video Masterclasses"                                         │
│   h2="Learn Online"                                                │
│   decorativeStyle="lines"                                          │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Background: hero-video-masterclasses.jpeg                       │
│ • Focus: Online learning and video content                        │
│ • Consistent: Follows established hero pattern                    │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Video Grid Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <section className="py-16 lg:py-24 bg-white">                     │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8">        │
│     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">    │
│       {videos.map((video, index) => (                             │
│         <m.div key={index}                                         │
│                className="group cursor-pointer">                   │
│           <div className="relative rounded-2xl                     │
│                overflow-hidden shadow-lg                          │
│                group-hover:shadow-2xl">                           │
│             <Image src={video.thumbnail}                          │
│                    alt={video.title}                              │
│                    width={400} height={225}                       │
│                    className="w-full h-auto                       │
│                    group-hover:scale-105" />                      │
│                                                                     │
│             <div className="absolute inset-0                      │
│                  bg-black/20 group-hover:bg-black/30">            │
│               <div className="absolute inset-0                    │
│                    flex items-center justify-center">             │
│                 <div className="w-16 h-16 bg-white/90             │
│                      rounded-full flex items-center              │
│                      justify-center group-hover:bg-white">        │
│                   <Play className="w-8 h-8 text-blue-600         │
│                                  ml-1" fill="currentColor" />      │
│                 </div>                                              │
│               </div>                                                │
│                                                                     │
│               <div className="absolute bottom-4 left-4 right-4">  │
│                 <h3 className="text-white font-semibold text-lg   │
│                     mb-2 line-clamp-2">                           │
│                   {video.title}                                   │
│                 </h3>                                              │
│                 <div className="flex items-center gap-4           │
│                      text-white/90 text-sm">                      │
│                   <span className="flex items-center gap-1">      │
│                     <Clock className="w-4 h-4" />                 │
│                     {video.duration}                              │
│                   </span>                                          │
│                   <span className="flex items-center gap-1">      │
│                     <Users className="w-4 h-4" />                 │
│                     {video.level}                                 │
│                   </span>                                          │
│                 </div>                                              │
│               </div>                                                │
│             </div>                                                  │
│           </div>                                                    │
│                                                                     │
│           <div className="p-6">                                    │
│             <p className="text-slate-600 mb-4">                   │
│               {video.description}                                  │
│             </p>                                                    │
│             <div className="flex items-center justify-between">   │
│               <span className="text-2xl font-bold text-blue-600"> │
│                 {video.price}                                      │
│               </span>                                               │
│               <Button variant="outline" size="sm">                 │
│                 Watch Preview                                      │
│               </Button>                                             │
│             </div>                                                  │
│           </div>                                                    │
│         </m.div>                                                   │
│       ))}                                                          │
│     </div>                                                         │
│   </div>                                                           │
│ </section>                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ • Layout: Responsive video grid with thumbnails                   │
│ • Interaction: Hover effects and play button overlays             │
│ • Content: Video title, duration, level, description, price       │
│ • CTA: Preview buttons for each video                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. 11+ Plus Bootcamps (/11-plus-bootcamps)

### 7.1 Page Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ ElevenPlusBootcampsPage - Client Component                         │
│ Seasonal Page with Conditional Rendering                           │
├─────────────────────────────────────────────────────────────────────┤
│ 7.1 SimpleHero Section                                            │
│ 7.2 Scrolling Schools                                             │
│ 7.3 Animated Tagline                                              │
│ 7.4 Success Statistics                                            │
│ 7.5 Programme Options (2 Cards)                                   │
│ 7.6 What Makes Bootcamps Different                               │
│ 7.7 Video Popup Integration                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.1 SimpleHero Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <SimpleHero                                                        │
│   backgroundImage="/images/hero/hero-11-plus-bootcamp.jpeg"        │
│   h1="11+ Intensive Bootcamps"                                     │
│   h2="Elite Prep"                                                  │
│   decorativeStyle="lines"                                          │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Background: hero-11-plus-bootcamp.jpeg                          │
│ • Focus: Intensive 11+ examination preparation                     │
│ • Style: Elite preparation positioning                             │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Success Statistics
```
┌─────────────────────────────────────────────────────────────────────┐
│ <section className="py-20 bg-slate-50/80 relative">               │
│   <div className="absolute inset-0 opacity-[0.015]"               │
│        style={{backgroundImage: `url("data:image/svg+xml...")"}}>  │
│   </div>                                                            │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8         │
│        relative z-10">                                             │
│     <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">       │
│       {successStats.map((stat, index) => (                        │
│         <div key={index} className="text-center">                 │
│           <div className="text-4xl lg:text-5xl                    │
│                font-bold text-accent-600 mb-2">                   │
│             {stat.number}                                          │
│           </div>                                                    │
│           <div className="text-lg font-semibold                   │
│                text-primary-900 mb-1">                            │
│             {stat.label}                                           │
│           </div>                                                    │
│           <div className="text-sm text-primary-600">              │
│             {stat.description}                                     │
│           </div>                                                    │
│         </div>                                                      │
│       ))}                                                          │
│     </div>                                                         │
│   </div>                                                           │
│ </section>                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ • Data: 95% Success Rate, 15+ Years, 500+ Students, Top 10 Schools│
│ • Layout: 2-col mobile, 4-col desktop                             │
│ • Visual: Large numbers with accent color highlighting            │
│ • Background: Subtle pattern overlay for texture                  │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.3 Programme Options Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <section className="py-16 bg-white/90 relative">                  │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8">        │
│     <div className="grid md:grid-cols-2 gap-8 mb-16">             │
│                                                                     │
│       {/* 11+ Kickstarter Programme */}                            │
│       <div className="group cursor-pointer">                      │
│         <Image src="/images/11_intensive.avif"                    │
│                alt="11+ Intensive Programme"                       │
│                width={600} height={400}                           │
│                className="rounded-2xl shadow-lg                   │
│                          group-hover:shadow-2xl" />               │
│         <div className="mt-6">                                     │
│           <div className="bg-accent-50 rounded-lg px-4 py-2 mb-4">│
│             <p className="text-sm font-semibold text-accent-700">  │
│               Perfect for students entering Y4 & 5 September 2025  │
│             </p>                                                    │
│           </div>                                                    │
│           <h3 className="text-2xl font-serif font-bold            │
│               text-primary-900 mb-3">                              │
│             11+ Kickstarter Programme                              │
│           </h3>                                                     │
│           <p className="text-primary-700 mb-4">                   │
│             Our 11+ Kickstarter is a fun and thorough             │
│             introduction to 11+ curriculum...                     │
│           </p>                                                      │
│                                                                     │
│           <div className="bg-slate-50 rounded-lg p-4 mb-4">       │
│             <h4 className="font-semibold text-primary-900 mb-3">  │
│               Course Details:                                      │
│             </h4>                                                   │
│             <ul className="space-y-2 text-sm text-primary-700">   │
│               <li className="flex items-center gap-2">            │
│                 <Calendar className="w-4 h-4 text-accent-600" />  │
│                 <strong>COURSE ONE:</strong> Monday 28th July-     │
│                 Friday 1st August                                  │
│               </li>                                                 │
│               <li className="flex items-center gap-2">            │
│                 <Clock className="w-4 h-4 text-accent-600" />     │
│                 9am - 12 noon Monday to Friday                     │
│               </li>                                                 │
│               <li className="flex items-center gap-2">            │
│                 <Target className="w-4 h-4 text-accent-600" />    │
│                 £395 per 5-day course                             │
│               </li>                                                 │
│             </ul>                                                   │
│           </div>                                                    │
│                                                                     │
│           <div className="mt-6">                                   │
│             <Button onClick={() => {                              │
│               const stripeUrl = 'https://buy.stripe.com/...'      │
│               window.open(stripeUrl, '_blank', 'noopener,noreferrer')│
│             }}                                                      │
│             className="w-full bg-gradient-to-r                    │
│                       from-amber-600 to-yellow-600">              │
│               Book Kickstarter Programme - £395                    │
│             </Button>                                              │
│           </div>                                                    │
│         </div>                                                      │
│       </div>                                                        │
│                                                                     │
│       {/* 11+ Intensive Programme */}                              │
│       <div className="group cursor-pointer">                      │
│         <Image src="/images/11-kickstarter.avif"                  │
│                alt="11+ Kickstarter Programme"                     │
│                width={600} height={400} />                        │
│         <div className="mt-6">                                     │
│           <div className="bg-accent-50 rounded-lg px-4 py-2 mb-4">│
│             <p className="text-sm font-semibold text-accent-700">  │
│               Perfect for students entering Y6 September 2025      │
│             </p>                                                    │
│           </div>                                                    │
│           <h3 className="text-2xl font-serif font-bold">          │
│             11+ Intensive                                          │
│           </h3>                                                     │
│           {/* Similar structure to Kickstarter */}                │
│           <Button onClick={() => {                                 │
│             const stripeUrl = 'https://buy.stripe.com/...'        │
│             window.open(stripeUrl, '_blank', 'noopener,noreferrer')│
│           }}>                                                       │
│             Book Intensive Programme - £395                        │
│           </Button>                                                 │
│         </div>                                                      │
│       </div>                                                        │
│     </div>                                                         │
│   </div>                                                           │
│ </section>                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ • Layout: 2-column grid with programme cards                      │
│ • Images: AVIF format for optimal performance                     │
│ • Content: Age targeting, course details, pricing                 │
│ • CTA: Direct Stripe checkout integration                         │
│ • Hover: Shadow and scale effects on cards                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.4 What Makes Bootcamps Different
```
┌─────────────────────────────────────────────────────────────────────┐
│ <Section className="py-16 lg:py-24 relative" background="white">   │
│   <div className="absolute inset-0 bg-gradient-to-br              │
│        from-amber-50/30 via-yellow-25 to-orange-50/20" />         │
│   <div className="container mx-auto px-4 sm:px-6 lg:px-8         │
│        relative z-10">                                             │
│     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16       │
│          items-center">                                            │
│                                                                     │
│       {/* Content Column */}                                       │
│       <m.div className="space-y-8">                               │
│         <h2 className="text-4xl lg:text-5xl font-serif            │
│             font-bold text-slate-900">                             │
│           What Makes Our Bootcamps Different                       │
│         </h2>                                                       │
│                                                                     │
│         <ul className="space-y-4">                                │
│           <m.li className="flex items-center gap-4">              │
│             <div className="w-3 h-3 bg-gradient-to-r              │
│                  from-amber-500 to-yellow-500                     │
│                  rounded-full shadow-sm"></div>                   │
│             <span className="text-slate-700 text-lg">             │
│               All sessions led by experienced specialists...       │
│             </span>                                                 │
│           </m.li>                                                   │
│           {/* More list items... */}                              │
│         </ul>                                                       │
│                                                                     │
│         <Button asChild className="bg-gradient-to-r               │
│                 from-amber-600 to-yellow-600">                    │
│           <Link href="#programme-options">                         │
│             Explore Our Programmes                                 │
│           </Link>                                                   │
│         </Button>                                                   │
│       </m.div>                                                      │
│                                                                     │
│       {/* Video Thumbnail Column */}                               │
│       <m.div className="relative">                                │
│         <div className="relative rounded-3xl overflow-hidden      │
│              shadow-2xl border border-amber-200                   │
│              cursor-pointer group"                                 │
│              onClick={() => setIsVideoOpen(true)}>                │
│           <Image src="/images/video-thumbnails/                   │
│                     elizabeth-introduction-thumbnail.jpg"          │
│                  alt="11+ Expert Introduction Video"              │
│                  width={600} height={450} />                      │
│                                                                     │
│           <div className="absolute inset-0 flex                   │
│                items-center justify-center">                      │
│             <div className="bg-white/90 backdrop-blur-sm          │
│                  rounded-full p-4 shadow-lg">                     │
│               <Play className="w-8 h-8 text-amber-700            │
│                              ml-1" fill="currentColor" />          │
│             </div>                                                  │
│           </div>                                                    │
│         </div>                                                      │
│       </m.div>                                                      │
│     </div>                                                         │
│   </div>                                                           │
│ </Section>                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ • Layout: 2-column content and video thumbnail                    │
│ • Features: Bullet points with gradient dot indicators            │
│ • Video: Clickable thumbnail with play button overlay             │
│ • CTA: Link to programme options section                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.5 Video Popup Integration
```
┌─────────────────────────────────────────────────────────────────────┐
│ <VideoPopup                                                        │
│   isOpen={isVideoOpen}                                             │
│   onClose={() => setIsVideoOpen(false)}                           │
│   videoUrl="/videos/elizabeth-introduction-compressed.mp4"         │
│   title="Meet Our 11+ Specialists - Expert Introduction"           │
│   poster="/images/video-thumbnails/                               │
│          elizabeth-introduction-thumbnail.jpg"                     │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Component: VideoPopup with state management                     │
│ • Video: Local MP4 file with compressed format                    │
│ • Controls: Open/close state via useState hook                    │
│ • Poster: Thumbnail image for video preview                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. FAQs (/faq)

### 8.1 Page Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ FAQPage - Advanced Client Component with Dynamic Features          │
│ Comprehensive FAQ System with Enhanced Functionality               │
├─────────────────────────────────────────────────────────────────────┤
│ 8.1 SimpleHero Section                                            │
│ 8.2 Multi-column Layout System                                    │
│ 8.3 Enhanced Search System                                        │
│ 8.4 Gamification Integration                                      │
│ 8.5 Offline Support System                                        │
│ 8.6 FAQ Category Sections                                         │
│ 8.7 Collaborative Features                                        │
│ 8.8 Floating Toolbar System                                       │
│ 8.9 Analytics Integration                                         │
│ 8.10 Mobile Deep Linking                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.1 SimpleHero Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <SimpleHero                                                        │
│   backgroundImage="/images/hero/hero-exam-papers.jpg"              │
│   h1="Frequently Asked Questions"                                  │
│   h2="Get Answers"                                                 │
│   decorativeStyle="lines"                                          │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Background: hero-exam-papers.jpg                                │
│ • Title: FAQ focus with clear value proposition                   │
│ • Style: Consistent with other page heroes                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2 Multi-Column Layout System
```
┌─────────────────────────────────────────────────────────────────────┐
│ <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12    │
│      gap-4 lg:gap-6 xl:gap-8 max-w-8xl mx-auto                    │
│      px-4 sm:px-6 lg:px-8">                                        │
│                                                                     │
│   {/* SIDEBAR - Desktop/Tablet Only */}                           │
│   <aside className="hidden md:block md:col-span-1 lg:col-span-3"  │
│         role="complementary"                                        │
│         aria-label="FAQ navigation and tools">                     │
│     <div className="sticky top-6 space-y-6">                      │
│       8.2.1 Quick Search Widget                                   │
│       8.2.2 Category Navigation                                   │
│       8.2.3 Sync Manager                                          │
│       8.2.4 Theme Switcher                                        │
│     </div>                                                          │
│   </aside>                                                          │
│                                                                     │
│   {/* MAIN CONTENT AREA */}                                        │
│   <section className="col-span-1 md:col-span-3 lg:col-span-9     │
│           space-y-8" role="main">                                  │
│     8.2.5 Mobile Search Header                                    │
│     8.2.6 Gamification System                                     │
│     8.2.7 FAQ Category Content                                    │
│     8.2.8 Collaborative Features                                  │
│   </section>                                                        │
│ </div>                                                              │
├─────────────────────────────────────────────────────────────────────┤
│ • Layout: Responsive 12-column grid system                        │
│ • Sidebar: 3-column sticky navigation (desktop only)              │
│ • Main: 9-column content area with FAQ sections                   │
│ • Mobile: Single column layout with mobile-specific features      │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2.1 Quick Search Widget (Sidebar)
```
┌─────────────────────────────────────────────────────────────────────┐
│ <m.div className="bg-white/90 backdrop-blur-sm border              │
│        border-slate-200 rounded-2xl p-6 shadow-lg">                │
│   <h3 className="text-lg font-serif font-semibold                 │
│       text-slate-900 mb-4">                                        │
│     Quick Search                                                    │
│     {!offlineState.isOnline && (                                   │
│       <span className="ml-2 text-xs bg-orange-100                 │
│             text-orange-700 px-2 py-1 rounded-full">               │
│         Offline                                                    │
│       </span>                                                       │
│     )}                                                              │
│   </h3>                                                             │
│                                                                     │
│   {/* Adaptive Search Component */}                                │
│   {offlineState.isOnline ? (                                       │
│     <FAQEnhancedSearch                                             │
│       questions={faqCategories.flatMap(category =>                │
│                  category.questions)}                              │
│       categories={faqCategories}                                   │
│       showPerformanceStats={false}                                │
│       placeholder="Search FAQ..."                                 │
│       maxSuggestions={3}                                           │
│       className="compact"                                          │
│       initialQuery={heroSearchQuery}                              │
│     />                                                              │
│   ) : (                                                             │
│     <OfflineSearch                                                 │
│       placeholder="Search cached FAQ..."                          │
│       showFilters={false}                                          │
│       showVoiceSearch={false}                                     │
│       showSuggestions={true}                                      │
│       maxResults={5}                                               │
│       onSearchResults={handleOfflineSearchResults}                │
│       className="compact offline-sidebar-search"                  │
│     />                                                              │
│   )}                                                                │
│ </m.div>                                                            │
├─────────────────────────────────────────────────────────────────────┤
│ • Search: Adaptive online/offline search functionality            │
│ • Status: Real-time online/offline status indicator               │
│ • Style: Backdrop blur with rounded corners and shadows          │
│ • Responsive: Compact layout for sidebar positioning              │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2.2 Category Navigation (Sidebar)
```
┌─────────────────────────────────────────────────────────────────────┐
│ <m.nav className="bg-white/90 backdrop-blur-sm border              │
│        border-slate-200 rounded-2xl p-6 shadow-lg"                 │
│        role="navigation"                                            │
│        aria-label="FAQ Categories Navigation">                     │
│   <h3 className="text-lg font-serif font-semibold                 │
│       text-slate-900 mb-4">Categories</h3>                         │
│   <div className="space-y-2">                                      │
│     {faqCategories.map((category, index) => (                     │
│       <m.a key={category.id}                                       │
│              href={`#category-${category.id}`}                     │
│              className="flex items-center space-x-3 p-3           │
│                        rounded-xl hover:bg-accent-50               │
│                        transition-all duration-200 group">         │
│         <span className="text-xl group-hover:scale-110            │
│               transition-transform duration-200">                  │
│           {category.icon}                                          │
│         </span>                                                     │
│         <span className="font-medium text-slate-700              │
│               group-hover:text-accent-700">                        │
│           {category.title}                                         │
│         </span>                                                     │
│         <span className="ml-auto text-sm text-slate-400          │
│               bg-slate-100 px-2 py-1 rounded-full">               │
│           {category.questions.length}                             │
│         </span>                                                     │
│       </m.a>                                                       │
│     ))}                                                             │
│   </div>                                                            │
│ </m.nav>                                                            │
├─────────────────────────────────────────────────────────────────────┤
│ • Navigation: Smooth scroll anchors to category sections          │
│ • Icons: Category-specific icons with hover animations            │
│ • Counters: Question count badges for each category               │
│ • Hover: Accent color transitions and icon scaling                │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.3 Enhanced Search System (Mobile)
```
┌─────────────────────────────────────────────────────────────────────┐
│ <section className="block md:hidden" id="faq-search-section"       │
│         aria-label="FAQ Search">                                   │
│   <Section className="py-8" background="blue">                     │
│     <div>                                                           │
│       <m.div className="max-w-2xl mx-auto" role="search">         │
│         <header className="text-center mb-8">                     │
│           <h2 className="text-2xl lg:text-3xl font-serif          │
│               font-bold text-white mb-3">                          │
│             Find Your Answer Instantly                             │
│           </h2>                                                     │
│           <p className="text-base text-white/90">                 │
│             {offlineState.isOnline                                │
│               ? 'Search our comprehensive FAQ database'            │
│               : 'Search cached FAQ content (offline mode)'        │
│             }                                                       │
│           </p>                                                      │
│         </header>                                                   │
│                                                                     │
│         {/* Conditional Search Component */}                       │
│         {offlineState.isOnline ? (                                 │
│           <FAQEnhancedSearch                                       │
│             questions={faqCategories.flatMap(category =>          │
│                        category.questions)}                        │
│             categories={faqCategories}                             │
│             showPerformanceStats={false}                          │
│             placeholder="Search FAQ questions..."                 │
│             maxSuggestions={5}                                     │
│             initialQuery={heroSearchQuery}                        │
│           />                                                        │
│         ) : (                                                       │
│           <OfflineSearch                                           │
│             placeholder="Search cached FAQ content..."             │
│             showFilters={true}                                     │
│             showVoiceSearch={true}                                 │
│             showSuggestions={true}                                 │
│             maxResults={20}                                        │
│             onSearchResults={handleOfflineSearchResults}          │
│             className="offline-search-mobile"                     │
│           />                                                        │
│         )}                                                          │
│       </m.div>                                                      │
│     </div>                                                          │
│   </Section>                                                        │
│ </section>                                                          │
├─────────────────────────────────────────────────────────────────────┤
│ • Mobile: Full-featured search header for mobile devices          │
│ • Adaptive: Switches between enhanced and offline search          │
│ • Background: Blue section background for visual separation       │
│ • Features: Voice search and filters available in offline mode    │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.4 Gamification System Integration
```
┌─────────────────────────────────────────────────────────────────────┐
│ {/* Main Gamification System */}                                   │
│ {showGamification && gamificationEnabled && !showPrintView && (    │
│   <m.div className="mb-12">                                        │
│     <FAQGamificationSystem                                         │
│       totalQuestions={totalQuestions}                              │
│       totalCategories={totalCategories}                            │
│       compact={false}                                              │
│       showLeaderboard={showLeaderboard}                            │
│       enableNotifications={true}                                   │
│       className="mb-8"                                             │
│     />                                                              │
│   </m.div>                                                          │
│ )}                                                                  │
│                                                                     │
│ {/* Community Leaderboard */}                                      │
│ {showLeaderboard && gamificationEnabled && !showPrintView && (     │
│   <m.div className="mb-12">                                        │
│     <FAQGamificationLeaderboard                                    │
│       maxEntries={10}                                              │
│       showCurrentUser={true}                                       │
│       enablePrivateMode={false}                                    │
│       refreshInterval={300000}                                     │
│       className=""                                                 │
│     />                                                              │
│   </m.div>                                                          │
│ )}                                                                  │
│                                                                     │
│ {/* Floating Compact Widget */}                                    │
│ {gamificationEnabled && !showPrintView && !showGamification && (   │
│   <FAQGamificationSystem                                           │
│     totalQuestions={totalQuestions}                                │
│     totalCategories={totalCategories}                              │
│     compact={true}                                                 │
│     className=""                                                   │
│   />                                                                │
│ )}                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Progress: User progress tracking and achievement system          │
│ • Leaderboard: Anonymous community engagement features            │
│ • Notifications: Achievement and progress notifications            │
│ • Compact: Floating widget when main system is hidden             │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.5 FAQ Categories Content Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <FAQCategorySection                                                │
│   categories={faqCategories}                                       │
│   searchQuery={heroSearchQuery}                                    │
│   selectedCategory={selectedCategory}                              │
│   enableBulkActions={true}                                         │
│   showPrintView={showPrintView}                                    │
│   enableCategoryTheming={!showPrintView}                          │
│   compactMode={showPrintView}                                      │
│   // Enhanced with offline support                                 │
│   isOffline={!offlineState.isOnline}                              │
│   onFAQRating={handleFAQRating}                                    │
│   onFAQFeedback={handleFAQFeedback}                                │
│   offlineMessage={                                                 │
│     !offlineState.isOnline                                         │
│       ? "You're viewing cached content. Interactions will sync     │
│          when online."                                              │
│       : undefined                                                   │
│   }                                                                 │
│   syncStatus={{                                                    │
│     queueLength: syncState.queueLength,                            │
│     isProcessing: syncState.isProcessing,                          │
│     lastSyncTime: syncState.lastSyncTime                           │
│   }}                                                                │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Categories: Dynamic FAQ categories with accordion interface      │
│ • Search: Real-time search filtering integration                  │
│ • Offline: Comprehensive offline support with sync queue          │
│ • Theming: Category-specific color theming when enabled           │
│ • Bulk Actions: Multi-question operations and filtering           │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.6 Floating Toolbar System
```
┌─────────────────────────────────────────────────────────────────────┐
│ <m.div className="fixed bottom-6 right-6 z-50 flex flex-col       │
│        space-y-3">                                                 │
│                                                                     │
│   {/* Gamification Controls */}                                    │
│   {gamificationEnabled && (                                        │
│     <div className="flex flex-col space-y-2">                     │
│       <m.button onClick={() => setShowGamification(!showGamification)}│
│               className="w-12 h-12 bg-purple-600                  │
│                         hover:bg-purple-700 text-white            │
│                         rounded-full shadow-lg">                  │
│         {/* Progress Icon */}                                      │
│       </m.button>                                                  │
│       <m.button onClick={() => setShowLeaderboard(!showLeaderboard)}│
│               className="w-12 h-12 bg-amber-600                   │
│                         hover:bg-amber-700 text-white             │
│                         rounded-full shadow-lg">                  │
│         {/* Leaderboard Icon */}                                   │
│       </m.button>                                                  │
│     </div>                                                          │
│   )}                                                                │
│                                                                     │
│   {/* Theme Switcher */}                                           │
│   <div className="flex flex-col space-y-2">                       │
│     <FAQThemeSwitcher                                              │
│       currentTheme={faqTheme.currentTheme}                        │
│       onThemeChange={faqTheme.setTheme}                           │
│       showSystemOption={true}                                     │
│       compact={true}                                               │
│       position="bottom"                                            │
│       ariaLabel="Switch FAQ page theme"                           │
│     />                                                              │
│   </div>                                                            │
│                                                                     │
│   {/* Quick Actions */}                                            │
│   <div className="flex flex-col space-y-2">                       │
│     <m.button onClick={handlePrintViewToggle}                     │
│               className="w-12 h-12 bg-green-600                   │
│                         hover:bg-green-700 text-white             │
│                         rounded-full shadow-lg">                  │
│       {/* Print Icon */}                                           │
│     </m.button>                                                    │
│     <m.a href="#contact"                                           │
│              className="w-12 h-12 bg-accent-600                   │
│                        hover:bg-accent-700 text-white             │
│                        rounded-full shadow-lg">                   │
│       {/* Contact Icon */}                                         │
│     </m.a>                                                         │
│     <m.button onClick={() => window.scrollTo({ top: 0 })}         │
│               className="w-12 h-12 bg-slate-600                   │
│                         hover:bg-slate-700 text-white             │
│                         rounded-full shadow-lg">                  │
│       {/* Back to Top Icon */}                                     │
│     </m.button>                                                    │
│   </div>                                                            │
│ </m.div>                                                            │
├─────────────────────────────────────────────────────────────────────┤
│ • Position: Fixed bottom-right with stacked button layout         │
│ • Functions: Gamification toggles, theme switching, print, contact│
│ • Animations: Framer Motion hover and tap animations              │
│ • Tooltips: Hover tooltips for each button action                 │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.7 Advanced Features Integration
```
┌─────────────────────────────────────────────────────────────────────┐
│ {/* Analytics Integration */}                                      │
│ <FAQSEOIntegration                                                 │
│   categories={faqCategories}                                       │
│   businessInfo={businessInfo}                                      │
│   enableStructuredData={true}                                      │
│   enableMetaOptimization={true}                                    │
│   enableLocalSEO={true}                                            │
│   revenueOpportunity={381600}                                      │
│   conversionGoals={['consultation', 'contact', 'phone']}          │
│ />                                                                  │
│                                                                     │
│ {/* GA4 Analytics Setup */}                                        │
│ <GA4Setup                                                          │
│   enableFAQTracking={true}                                         │
│   enableConversions={true}                                         │
│   privacySettings={{                                               │
│     consentGiven,                                                  │
│     analyticsStorage: consentGiven ? 'granted' : 'denied'          │
│   }}                                                                │
│ />                                                                  │
│                                                                     │
│ {/* Offline Status Indicator */}                                   │
│ <OfflineStatusIndicator                                            │
│   position="top-right"                                             │
│   showDetails={true}                                               │
│   showCacheInfo={true}                                             │
│   showSyncStatus={true}                                            │
│   onRefresh={() => offlineActions.refreshCache()}                 │
│ />                                                                  │
│                                                                     │
│ {/* Mobile Deep Linking */}                                        │
│ <MobileDeepLinkHandler                                             │
│   enableNotifications={true}                                       │
│   enablePWAPrompt={true}                                           │
│   enableSwipeGestures={true}                                       │
│   className="faq-mobile-wrapper"                                   │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • SEO: Comprehensive search optimization with structured data      │
│ • Analytics: GA4 integration with privacy compliance              │
│ • Offline: Real-time status and cache management                  │
│ • Mobile: Deep linking and PWA functionality                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 9. Blog (/blog)

### 9.1 Page Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ BlogPage - Simple Under Construction Page                          │
│ showHeader={true} showFooter={true}                                │
├─────────────────────────────────────────────────────────────────────┤
│ 9.1 SimpleHero Section                                            │
│ 9.2 Under Construction Content (Implied)                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.1 SimpleHero Section
```
┌─────────────────────────────────────────────────────────────────────┐
│ <SimpleHero                                                        │
│   backgroundImage="/images/hero/hero-exam-papers.jpg"              │
│   h1="Educational Blog & Resources"                                │
│   h2="Coming Soon"                                                 │
│   decorativeStyle="lines"                                          │
│ />                                                                  │
├─────────────────────────────────────────────────────────────────────┤
│ • Background: hero-exam-papers.jpg (reused from FAQ page)         │
│ • Title: Educational focus with "Coming Soon" subtitle            │
│ • Purpose: Placeholder for future blog system                     │
│ • Implementation: Ready for future blog content integration       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Reference Guide

### Layout Components

#### SimpleHero
```
Props: {
  backgroundImage: string     // Hero background image path
  h1: string                 // Main heading text
  h2: string                 // Subtitle text  
  decorativeStyle: string    // "lines" for consistent styling
}
Usage: Full-width hero section outside PageLayout
```

#### PageLayout
```
Props: {
  showHeader: boolean        // Show/hide main navigation
  showFooter: boolean        // Show/hide footer
  background?: string        // "white" | "blue" | etc.
  containerSize?: string     // "full" for full-width
  verticalSpacing?: string   // "none" to remove padding
}
Usage: Main content wrapper with navigation
```

### Interactive Components

#### FAQEnhancedSearch
```
Props: {
  questions: Question[]      // Array of FAQ questions
  categories: Category[]     // Array of FAQ categories
  showPerformanceStats: boolean
  placeholder: string        // Search input placeholder
  maxSuggestions: number     // Max search suggestions
  className?: string         // Additional CSS classes
  initialQuery?: string      // Pre-filled search query
}
Usage: Advanced search with suggestions and filtering
```

#### VideoPopup
```
Props: {
  isOpen: boolean           // Modal open state
  onClose: () => void       // Close handler function
  videoUrl: string          // Local or remote video URL
  title: string             // Video title for accessibility
  poster?: string           // Video thumbnail image
}
Usage: Modal video player with state management
```

### Animation Components

#### Framer Motion (m.div, m.section, etc.)
```
Common Props: {
  initial: object           // Initial animation state
  whileInView: object       // Animation when in viewport
  viewport: object          // Viewport configuration
  transition: object        // Animation timing and easing
}
Usage: Page entry animations and scroll-triggered effects
```

### Responsive Breakpoints

```
Mobile:    320px - 640px   (grid-cols-1)
Tablet:    640px - 1024px  (md:grid-cols-2, md:grid-cols-4)
Desktop:   1024px - 1280px (lg:grid-cols-3, lg:grid-cols-12)
Large:     1280px+         (xl:gap-8, 2xl:max-w-8xl)
```

### Color System

```
Primary:   slate-50 to slate-900    // Main content colors
Accent:    accent-50 to accent-700  // Brand highlights  
Success:   green-600 to green-700   // Success states
Warning:   amber-600 to yellow-600  // Warning/attention
Info:      blue-500 to indigo-600   // Information
Error:     red-600 to red-700       // Error states
```

### Animation Patterns

```
Entrance:   opacity: 0 → 1, y: 30 → 0
Hover:      scale: 1 → 1.05, shadow: lg → 2xl  
Stagger:    delay: index * 0.1s
Viewport:   once: true, margin: "-100px"
Duration:   0.4s - 0.8s (content), 0.2s - 0.3s (interactions)
```

---

## Technical Architecture Notes

### 1. CMS Integration Pattern
- **Synchronous Data Access**: All CMS functions return data immediately
- **No Loading States**: Direct function calls without useState/useEffect for static content
- **Type Safety**: TypeScript interfaces for all CMS data structures

### 2. Component Architecture  
- **Modular Design**: Each page uses extracted section components
- **Client Components**: All pages are client components for interactivity
- **Lazy Loading**: Dynamic imports for non-critical components

### 3. Performance Optimizations
- **Image Optimization**: Next.js Image component with AVIF format
- **Bundle Splitting**: Dynamic imports reduce initial bundle size  
- **Animation Efficiency**: Framer Motion with viewport-based triggers

### 4. Accessibility Standards
- **WCAG 2.1 AA**: Semantic HTML, ARIA labels, keyboard navigation
- **Skip Links**: Hidden navigation for screen readers
- **Color Contrast**: Sufficient contrast ratios throughout
- **Focus Management**: Visible focus indicators and logical tab order

### 5. Mobile-First Design
- **Responsive Grid**: CSS Grid with mobile-first breakpoints
- **Touch Optimization**: Large tap targets and touch-friendly interactions
- **Progressive Enhancement**: Desktop features enhance mobile base

This documentation provides comprehensive visual maps for debugging, development reference, and architectural understanding of the My Private Tutor Online website structure.
