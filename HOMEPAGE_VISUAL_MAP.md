# 🗺️ MY PRIVATE TUTOR ONLINE - COMPREHENSIVE HOMEPAGE VISUAL MAP

## 📋 LEGEND & SYMBOLS

```
🔷 CLIENT COMPONENT      🟦 SERVER COMPONENT      🟡 LAZY LOADED
🔒 SYNCHRONOUS DATA      ⚡ ASYNC OPERATION       🎭 ANIMATION
🎯 INTERACTIVE           📱 RESPONSIVE BREAKPOINT  ♿ ACCESSIBILITY
🚀 PERFORMANCE BOUNDARY  🔥 HOT RELOAD BOUNDARY   📊 CMS DATA
🎨 STYLING BOUNDARY      🌊 FRAMER MOTION         🖥️ VIEWPORT DEPENDENT
```

## 📐 OVERALL HOMEPAGE ARCHITECTURE

```ascii
┌─────────────────────────────────────────────────────────────────────────────┐
│                           🔷 HOMEPAGE CLIENT COMPONENT                      │
│                        src/app/[locale]/page.tsx                           │
│                            "use client"                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    🔒 SYNCHRONOUS CMS DATA LOADING
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│  📊 DIRECT CMS IMPORTS (NO LOADING STATES)                                 │
│  ├── getTrustIndicators() ────────── 🔒 Immediate return                    │
│  ├── getTestimonials() ─────────────── 🔒 Immediate return                 │
│  ├── getServices() ──────────────────── 🔒 Immediate return                │
│  ├── getSiteBranding() ────────────── 🔒 Immediate return                  │
│  ├── getFounderQuote() ────────────── 🔒 Immediate return                  │
│  ├── getStudentImages() ───────────── 🔒 Immediate return                  │
│  └── getTestimonialsSchools() ────── 🔒 Immediate return                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                   RENDERS
                                      ▼
```

## 🏗️ COMPLETE COMPONENT HIERARCHY

```ascii
🔷 HomePage (Client Component)
│
├── 🔷 PageLayout
│   │   ├── showHeader={true} ────────── 🎯 MAIN NAVBAR (CRITICAL FOR NAVIGATION)
│   │   ├── showFooter={true} ───────── Footer rendering control
│   │   ├── containerSize="full" ────── Full-width layout
│   │   └── verticalSpacing="none" ─── No padding (allows hero full-screen)
│   │
│   ├── 🔷 PageHeader (Navbar) ──────────── ♿ Skip-to-content, ARIA landmarks
│   │   ├── 🎯 Navigation Menu ────────── Dropdown interactions
│   │   ├── 🎯 CTA Buttons ──────────── Interactive booking links  
│   │   └── 📱 Mobile Hamburger ──────── Responsive breakpoint: lg
│   │
│   └── 🔷 PageFooter ─────────────────── Contact info, social links
│
├── 🔷 LanguageSwitcher ──────────────── Fixed position: top-6 right-6 z-50
│   ├── variant="compact" ─────────── Minimalist display
│   ├── position="header" ─────────── Header positioning
│   ├── showFlags={true} ──────────── Flag icons visible
│   └── showLabels={false} ────────── Text labels hidden
│
├── 1️⃣ 🔷 HeroSection ────────────────── FULL VIEWPORT BACKGROUND VIDEO
│   │   ├── showHeader={false} ─────── Prevents duplicate navbar
│   │   ├── 🔷 PageHero ─────────────── Video background container
│   │   │   ├── background="video" ── MP4 autoplay, loop, muted
│   │   │   ├── size="full" ──────── Full viewport height
│   │   │   ├── overlay={false} ──── No content overlay
│   │   │   └── 🎬 VIDEO FILE ─────── /videos/background-video-2025-compressed.mp4
│   │   └── ⚠️ NO INTERACTIVE ELEMENTS ── Minimalist video-only design
│
├── 2️⃣ 🔷 AnimatedTagline ───────────── "We help students place at top 10 UK schools..."
│   │   ├── 🌊 TypingAnimation ─────── Magic UI component
│   │   │   ├── duration={80} ─────── 80ms per character
│   │   │   ├── delay={500} ───────── 500ms start delay
│   │   │   ├── startOnView={true} ── Viewport trigger
│   │   │   └── 🎭 Typing effect ─── Animated character reveal
│   │   ├── 🌊 Decorative Flourishes ── Animated entrance (scale + opacity)
│   │   │   ├── delay: 2.5s ──────── After typing completes
│   │   │   ├── ├── Gray line ────── w-12 h-px bg-gray-300
│   │   │   ├── ├── Pulsing dot ──── w-3 h-3 with animate-ping
│   │   │   └── └── Gray line ────── w-12 h-px bg-gray-300
│   │   └── 📱 Responsive ──────────── text-xl lg:text-2xl
│
├── 3️⃣ 🔷 ScrollingSchools ──────────── School logos carousel
│   │   ├── 📊 schools={testimonialsSchools} ── CMS data dependency
│   │   ├── ✅ Conditional Render ───── {testimonialsSchools.length > 0 && ...}
│   │   ├── 🎭 Horizontal scroll ────── Infinite loop animation
│   │   └── 📱 mt-8 ──────────────── 2rem top margin
│
├── 4️⃣ 🔷 AboutSection ───────────────── Founder story & credentials
│   │   ├── 📱 Grid: lg:grid-cols-2 ──── 2-column desktop, stacked mobile
│   │   ├── LEFT COLUMN: ──────────────── Text content
│   │   │   ├── 🌊 Animated Heading ───── "World-Class Education, At Your Fingertips"
│   │   │   │   ├── whileInView trigger ── -100px margin offset
│   │   │   │   ├── y: 30 → 0 ──────── Slide up animation
│   │   │   │   └── delay: 0.1s ──────── Staggered entrance
│   │   │   ├── 🌊 Staggered Paragraphs ── 3 animated text blocks
│   │   │   │   ├── delay: 0.5s ──────── First paragraph
│   │   │   │   ├── delay: 0.7s ──────── Second paragraph  
│   │   │   │   └── delay: 0.9s ──────── Third paragraph
│   │   │   └── 🌊 Brand Credentials ──── Tatler, School Guide, Crown
│   │   │       ├── 🖼️ Tatler logo ───── PNG: tatler-logo.png
│   │   │       ├── 🖼️ School Guide ──── PNG: schools-guide-uk-logo.png
│   │   │       ├── 👑 Crown icon ────── Lucide React component
│   │   │       └── delay: 1.1s ──────── Final entrance delay
│   │   └── RIGHT COLUMN: ─────────────── Visual content stack
│   │       ├── 🌊 Founder Image ──────── Elizabeth Burrows portrait
│   │       │   ├── x: 100 → 0 ────── Slide from right
│   │       │   ├── delay: 0.3s ───── Early entrance
│   │       │   ├── maxHeight: 400px ── Size constraint
│   │       │   ├── drop-shadow ───── CSS filter effect
│   │       │   └── 🎨 Decorative blob ── Animated blur element
│   │       └── 🌊 Video Component ──── HeroVideoDialog
│   │           ├── animationStyle="from-center" ── Magic UI config
│   │           ├── videoSrc="/elizabeth-introduction-sound.mp4"
│   │           ├── thumbnailSrc="/images/video-thumbnails/elizabeth-introduction-thumbnail.jpg"
│   │           ├── y: 50 → 0 ──────── Slide up animation
│   │           ├── delay: 0.5s ───── Timed entrance
│   │           └── 🎨 Decorative blob ── Bottom-left blur element
│
├── 5️⃣ 🔷 TrustIndicatorsGrid ────────── "Who We Support" section
│   │   ├── 📊 indicators={trustIndicators} ── CMS data prop
│   │   ├── 📊 studentImages={studentImages} ── CMS images prop
│   │   ├── 📱 Responsive grid ──────── Mobile: 1 col, Tablet: 2 col, Desktop: 3 col
│   │   └── 🎯 Interactive cards ───── Hover effects on indicators
│
├── 6️⃣ 🔷 HomepageSections ───────────── CLIENT COMPONENT WRAPPER
│   │   ├── ⚠️ CLIENT BOUNDARY ──────── Prevents useState server errors
│   │   ├── 📊 services={services} ──── CMS services data
│   │   ├── 📊 studentImages={studentImages} ── CMS images data
│   │   └── 🟡 LazyServicesCarousel ── Below-fold lazy loading
│   │       ├── 🚀 Dynamic import ──── React.lazy + Suspense
│   │       ├── 🎯 Interactive carousel ── Service cards with navigation
│   │       ├── 📱 Responsive design ── Swiper.js integration
│   │       └── 🎨 Student images ─── Background photos from CMS
│
├── 7️⃣ 🔷 QuoteSection ──────────────── Founder testimonial
│   │   ├── 📊 quote={founderQuote.quote} ── CMS quote content
│   │   ├── 📊 author={founderQuote.author} ── "Elizabeth Burrows"
│   │   ├── 📊 role={founderQuote.role} ── "Founder & Lead Tutor"
│   │   ├── showAuthorImage={false} ── Text-only presentation
│   │   └── 🎨 Highlighting effects ── Text emphasis styling
│
└── 8️⃣ 🔷 Bizstim CTA Section ───────── External enquiry form
    ├── 🎯 Interactive Image ──────── Screenshot with hover effects
    │   ├── group hover effects ─── border-accent-600, shadow-xl
    │   ├── scale transform ──────── group-hover:scale-105
    │   ├── overlay feedback ──────── opacity transition
    │   └── CTA overlay ─────────── "Click to access secure enquiry form →"
    ├── 🔗 External Link ─────────── target="_blank" rel="noopener noreferrer"
    │   └── URL: bizstim.com/inquiry/my-private-tutor-online/[hash]
    ├── ♿ Accessibility ─────────── aria-label with security info
    └── 🖼️ Form Screenshot ───────── /images/graphics/enquiry-form-screenshot-footer.png
```

## 🎭 INTERACTION STATE MATRIX

### HeroSection Interactions
```ascii
┌──────────────────────────────────────────────────────────────┐
│                      HERO SECTION STATES                     │
├──────────────────────────────────────────────────────────────┤
│ DEFAULT    │ 🎬 Video autoplay, loop, muted                  │
│ LOADING    │ ⚠️  No loading state - immediate render         │
│ ERROR      │ 🚨 Fallback to background image (not impl.)     │
│ MOBILE     │ 📱 Same behavior, responsive video sizing       │
│ FOCUS      │ ♿ No focusable elements in minimalist design   │
│ HOVER      │ ⚠️  No hover states - video background only     │
└──────────────────────────────────────────────────────────────┘
```

### AnimatedTagline Interactions
```ascii
┌──────────────────────────────────────────────────────────────┐
│                   ANIMATED TAGLINE STATES                    │
├──────────────────────────────────────────────────────────────┤
│ DEFAULT    │ 💤 Waiting for viewport intersection            │
│ TRIGGERED  │ 🎭 Typing animation: 80ms/char, 500ms delay    │
│ TYPING     │ ⌨️  Character-by-character reveal animation     │
│ COMPLETE   │ ✅ Full text visible, decorations animate in   │
│ FLOURISH   │ 🎨 Scale+opacity animation on decorative lines │
│ MOBILE     │ 📱 Smaller text size, same animation timing    │
│ REDUCED    │ ♿ prefers-reduced-motion disables animations   │
└──────────────────────────────────────────────────────────────┘
```

### AboutSection Interactions  
```ascii
┌──────────────────────────────────────────────────────────────┐
│                    ABOUT SECTION STATES                      │
├──────────────────────────────────────────────────────────────┤
│ DEFAULT    │ 💤 Elements waiting for scroll intersection      │
│ HEADING    │ 🎭 Slide up (y:30→0) + fade, delay: 0.1s       │
│ PARAGRAPH1 │ 🎭 Slide up (y:30→0) + fade, delay: 0.5s       │
│ PARAGRAPH2 │ 🎭 Slide up (y:30→0) + fade, delay: 0.7s       │
│ PARAGRAPH3 │ 🎭 Slide up (y:30→0) + fade, delay: 0.9s       │
│ CREDENTIALS│ 🎭 Slide up (y:30→0) + fade, delay: 1.1s       │
│ IMAGE      │ 🎭 Slide from right (x:100→0), delay: 0.3s     │
│ VIDEO      │ 🎭 Slide up (y:50→0) + fade, delay: 0.5s       │
│ MOBILE     │ 📱 Single column, same animations              │
│ HOVER      │ 🎯 Video thumbnail hover shows play indicator   │
│ PLAYING    │ 🎬 Modal opens with video player               │
└──────────────────────────────────────────────────────────────┘
```

## 📊 DATA FLOW ARCHITECTURE

```ascii
┌─────────────────────────────────────────────────────────────────┐
│                        CMS DATA FLOW                            │
│                     (SYNCHRONOUS ONLY)                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                    🔒 DIRECT JSON IMPORTS
                                │
┌─────────────────────────────────────────────────────────────────┐
│  📁 /src/content/*.json ────── Static JSON files in repo        │
│  ├── landing-page.json ─────── Hero & tagline content           │
│  ├── testimonials.json ─────── Customer testimonials            │
│  ├── about.json ─────────────── Founder & company story         │
│  ├── business-content.json ──── Services & trust indicators     │
│  └── [...].json ─────────────── Other content files             │
└─────────────────────────────────────────────────────────────────┘
                                │
                    🔒 GETTER FUNCTIONS
                                │
┌─────────────────────────────────────────────────────────────────┐
│  📦 /src/lib/cms/cms-content.ts                                 │
│  ├── getTrustIndicators() ──── Return: TrustIndicator[]         │
│  ├── getTestimonials() ─────── Return: Testimonial[]            │
│  ├── getServices() ──────────── Return: Service[]               │
│  ├── getSiteBranding() ─────── Return: SiteBranding             │
│  ├── getFounderQuote() ─────── Return: FounderQuote             │
│  └── getTestimonialsSchools() ─ Return: School[]                │
└─────────────────────────────────────────────────────────────────┘
                                │
                    🔄 DIRECT FUNCTION CALLS
                                │
┌─────────────────────────────────────────────────────────────────┐
│  🔷 HomePage Component                                          │
│  ├── const trustIndicators = getTrustIndicators() ─── ⚡ Sync   │
│  ├── const testimonials = getTestimonials() ────────── ⚡ Sync  │
│  ├── const services = getServices() ─────────────────── ⚡ Sync  │
│  ├── const branding = getSiteBranding() ───────────── ⚡ Sync   │
│  ├── const founderQuote = getFounderQuote() ─────────── ⚡ Sync  │
│  └── const studentImages = getStudentImages() ─────── ⚡ Sync   │
└─────────────────────────────────────────────────────────────────┘
```

### ⚠️ FORBIDDEN ASYNC PATTERNS (CAUSED HOMEPAGE FAILURE)
```ascii
❌ NEVER USE THESE PATTERNS:
├── ❌ export const loadCachedContent = async (): Promise<any> => { }
├── ❌ const [content, setContent] = useState(null)  
├── ❌ useEffect(() => { loadContent() }, [])
├── ❌ if (loading) return <LoadingSpinner />
└── ❌ {content ? <Content /> : <Skeleton />}

✅ REQUIRED SYNCHRONOUS PATTERNS:
├── ✅ import cmsContent from '../../content/cms-content.json'
├── ✅ export const getCMSContent = (): CMSContentType => cmsContent
├── ✅ const content = getCMSContent() // Direct function call
└── ✅ <Content data={content} /> // Immediate availability
```

## 🚀 PERFORMANCE BOUNDARIES

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                      PERFORMANCE ZONES                           │
├──────────────────────────────────────────────────────────────────┤
│ 🟢 CRITICAL ABOVE-THE-FOLD (0-800ms)                           │
│ ├── HeroSection ────────────── Immediate video load             │
│ ├── AnimatedTagline ────────── Deferred animation trigger       │
│ ├── PageHeader (Navbar) ───── Critical for navigation           │
│ └── LanguageSwitcher ──────── Small component, fast render      │
├──────────────────────────────────────────────────────────────────┤
│ 🟡 IMPORTANT BELOW-FOLD (800ms-2s)                             │
│ ├── ScrollingSchools ──────── Viewport-triggered animation      │
│ ├── AboutSection ─────────── Viewport-triggered animations      │
│ └── TrustIndicatorsGrid ──── Standard rendering                 │
├──────────────────────────────────────────────────────────────────┤
│ 🔴 DEFERRED COMPONENTS (2s+)                                   │
│ ├── 🟡 LazyServicesCarousel ── React.lazy + dynamic import      │
│ ├── QuoteSection ─────────── Static text, low priority          │
│ └── Bizstim CTA ──────────── External link, lowest priority     │
└──────────────────────────────────────────────────────────────────┘
```

### Bundle Splitting Strategy
```ascii
┌─────────────────────────────────────────────────────────┐
│                   BUNDLE ANALYSIS                       │
├─────────────────────────────────────────────────────────┤
│ 📦 MAIN BUNDLE (~229kB first load JS)                  │
│ ├── React 19 + Next.js 15 ──── ~180kB                 │
│ ├── Framer Motion ──────────── ~25kB                  │
│ ├── Homepage Components ────── ~15kB                  │
│ └── CMS Data + Utils ──────── ~9kB                   │
├─────────────────────────────────────────────────────────┤
│ 🟡 LAZY CHUNKS (loaded on-demand)                      │
│ ├── LazyServicesCarousel ──── ~12kB (deferred)        │
│ ├── Video Components ─────── ~8kB (when modal opened) │
│ └── Form Components ──────── ~15kB (not on homepage)  │
└─────────────────────────────────────────────────────────┘
```

## ♿ ACCESSIBILITY LANDMARKS & ARIA

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                     ACCESSIBILITY STRUCTURE                      │
├──────────────────────────────────────────────────────────────────┤
│ 🏷️  HTML5 SEMANTIC LANDMARKS                                    │
│ ├── <header> ──────────── PageHeader (navbar) with nav role     │
│ ├── <main> ────────────── id="main-content" tabIndex={-1}       │
│ ├── <section> × 8 ─────── Each major homepage section           │
│ └── <footer> ──────────── PageFooter with contact info          │
├──────────────────────────────────────────────────────────────────┤
│ 🎯 INTERACTIVE ELEMENTS                                          │
│ ├── Skip Link ────────── href="#main-content" (sr-only focus)   │
│ ├── Navbar Links ─────── Proper focus indicators                │
│ ├── Language Switcher ── ARIA labels for locale selection       │
│ ├── Video Thumbnail ──── Play button with screen reader text    │
│ └── Bizstim Link ─────── External link indicators               │
├──────────────────────────────────────────────────────────────────┤
│ 📱 RESPONSIVE & MOTION                                           │
│ ├── prefers-reduced-motion ── Respects user motion preferences  │
│ ├── Focus Management ─────── Proper tab order throughout        │
│ ├── Color Contrast ───────── WCAG 2.1 AA compliant ratios      │
│ └── Screen Reader ────────── Proper heading hierarchy (h1→h6)   │
└──────────────────────────────────────────────────────────────────┘
```

### Focus Flow & Keyboard Navigation
```ascii
TAB ORDER SEQUENCE:
1. Skip Link (hidden, focus reveals)
2. Language Switcher (top-right)
3. Main Navigation (PageHeader)
   ├── Home
   ├── Subject Tuition (with dropdowns)
   ├── How It Works
   ├── About
   ├── Blog
   └── Book Consultation (CTA)
4. About Section Video Play Button
5. Bizstim CTA Link
6. Footer Links
7. Back to Top (if implemented)
```

## 📱 RESPONSIVE BREAKPOINT MATRIX

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                    RESPONSIVE BREAKPOINTS                        │
├──────────────────────────────────────────────────────────────────┤
│ 📱 MOBILE (320px - 767px)                                       │
│ ├── HeroSection ─────────── Full width, video scales            │
│ ├── AnimatedTagline ─────── text-xl, single line preferred      │
│ ├── AboutSection ────────── Single column stack                 │
│ ├── TrustIndicators ─────── 1 column grid                       │
│ ├── ServicesCarousel ───── Swipe/scroll horizontal              │
│ └── Bizstim CTA ─────────── Full width image                    │
├──────────────────────────────────────────────────────────────────┤
│ 📟 TABLET (768px - 1023px)                                      │
│ ├── HeroSection ─────────── Maintains aspect ratio              │
│ ├── AnimatedTagline ─────── text-xl, comfortable spacing        │
│ ├── AboutSection ────────── 2 columns: text left, media right   │
│ ├── TrustIndicators ─────── 2 column grid                       │
│ ├── ServicesCarousel ───── 2-3 cards visible                    │
│ └── Bizstim CTA ─────────── Centered with padding               │
├──────────────────────────────────────────────────────────────────┤
│ 🖥️  DESKTOP (1024px - 1439px)                                  │
│ ├── HeroSection ─────────── Full viewport background video      │
│ ├── AnimatedTagline ─────── text-2xl, decorative flourishes     │
│ ├── AboutSection ────────── lg:grid-cols-2, optimal balance     │
│ ├── TrustIndicators ─────── 3 column grid                       │
│ ├── ServicesCarousel ───── 3-4 cards, smooth transitions       │
│ └── Bizstim CTA ─────────── max-w-4xl centered                  │
├──────────────────────────────────────────────────────────────────┤
│ 🖥️  LARGE (1440px+)                                            │
│ ├── HeroSection ─────────── Maintains 16:9 video aspect         │
│ ├── AnimatedTagline ─────── xl:text-2xl, premium spacing        │
│ ├── AboutSection ────────── xl:text-5xl heading size           │
│ ├── TrustIndicators ─────── 3-4 column, generous spacing        │
│ ├── ServicesCarousel ───── 4+ cards, luxury presentation       │
│ └── Container Max ───────── max-w-7xl for reading comfort       │
└──────────────────────────────────────────────────────────────────┘
```

## 🌊 ANIMATION & TRANSITION TIMELINE

```ascii
┌──────────────────────────────────────────────────────────────────────┐
│                         ANIMATION TIMELINE                           │
│                         (User scrolls down)                          │
├──────────────────────────────────────────────────────────────────────┤
│ t=0s    │ 🎬 Hero video starts autoplaying                           │
│ t=0.5s  │ 🎭 AnimatedTagline typing begins (delay: 500ms)            │
│ t=3.0s  │ 🎭 Tagline complete, decorations animate (delay: 2.5s)     │
│         │                                                            │
│ SCROLL  │ 📺 User scrolls down to next sections                      │
│         │                                                            │
│ VIEW+0.1s│ 🎭 AboutSection heading slides up                         │
│ VIEW+0.3s│ 🎭 Founder image slides from right                         │
│ VIEW+0.5s│ 🎭 First paragraph + video component animate               │
│ VIEW+0.7s│ 🎭 Second paragraph animates                               │
│ VIEW+0.9s│ 🎭 Third paragraph animates                                │
│ VIEW+1.1s│ 🎭 Brand credentials animate in                            │
│         │                                                            │
│ SCROLL  │ 📺 Continued scroll triggers other sections                │
│         │                                                            │
│ VIEW    │ 🎭 TrustIndicators cards fade in                           │
│ VIEW    │ 🎭 LazyServicesCarousel loads and animates                 │
│ VIEW    │ 🎭 QuoteSection text highlights                             │
│ VIEW    │ 🎭 Bizstim CTA hover effects ready                         │
└──────────────────────────────────────────────────────────────────────┘
```

### Animation Easing Curves
```ascii
FRAMER MOTION EASING: [0.25, 0.46, 0.45, 0.94]
┌─────────────────────────────────────────────────────────┐
│     Bezier Curve: Smooth, Natural Motion                │
│                                                         │
│  1.0 ┐                                               ╭──│
│      │                                             ╭─   │
│  0.8 ┤                                          ╭──     │
│      │                                       ╭──        │
│  0.6 ┤                                    ╭──           │
│      │                                 ╭──              │
│  0.4 ┤                              ╭──                 │
│      │                           ╭──                    │
│  0.2 ┤                        ╭──                       │
│      │                     ╭──                          │
│  0.0 └──┬──┬──┬──┬──┬──┬───┴──┬──┬──┬──┬──┬──┬──┬──┬───┘
│      0.0   0.2   0.4   0.6   0.8   1.0                 │
│                                                         │
│  CHARACTERISTICS:                                       │
│  ├── Smooth start (ease out of rest)                   │
│  ├── Quick middle acceleration                         │
│  ├── Gentle landing (ease into final position)        │
│  └── Royal client-worthy premium feel                  │
└─────────────────────────────────────────────────────────┘
```

## 🔥 CLIENT/SERVER BOUNDARIES

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                    RENDERING BOUNDARIES                          │
├──────────────────────────────────────────────────────────────────┤
│ 🟦 SERVER COMPONENTS (Static Generation)                        │
│ ├── Root Layout ──────────── Dynamic forcing in layout.tsx      │
│ ├── Error Boundaries ─────── Server-side error handling         │
│ └── Metadata Generation ──── SEO tags, Open Graph               │
├──────────────────────────────────────────────────────────────────┤
│ 🔷 CLIENT COMPONENTS (Hydrated)                                 │
│ ├── 🔷 HomePage ────────────── "use client" - useState compat    │
│ ├── 🔷 PageLayout ───────────── "use client" - interactive nav   │
│ ├── 🔷 HeroSection ──────────── "use client" - video controls    │
│ ├── 🔷 AnimatedTagline ──────── "use client" - animations        │
│ ├── 🔷 AboutSection ─────────── "use client" - Framer Motion     │
│ ├── 🔷 HomepageSections ─────── "use client" - prevents errors   │
│ └── 🔷 All Interactive ──────── Forms, carousels, modals         │
├──────────────────────────────────────────────────────────────────┤
│ ⚡ HYDRATION STRATEGY                                            │
│ ├── Critical components ───── Immediate hydration                │
│ ├── Below-fold components ── Lazy hydration (IntersectionObserver) │
│ ├── Interactive elements ──── Event delegation                   │
│ └── Video elements ──────── Native browser APIs                 │
└──────────────────────────────────────────────────────────────────┘
```

## ⚠️ ERROR STATES & FALLBACKS

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                      ERROR HANDLING                              │
├──────────────────────────────────────────────────────────────────┤
│ 🚨 CMS DATA FAILURES                                            │
│ ├── Missing trustIndicators ─── Display empty state message     │
│ ├── Missing testimonials ───── Hide testimonials section        │
│ ├── Missing services ───────── Show static fallback cards       │
│ └── Missing images ─────────── Use placeholder images           │
├──────────────────────────────────────────────────────────────────┤
│ 🎬 VIDEO FAILURES                                               │
│ ├── Hero video load fail ──── Fallback to background image      │
│ ├── About video unavailable ── Hide video component             │
│ ├── Slow video loading ────── No loading spinner (immediate)    │
│ └── Mobile video issues ───── Progressive enhancement           │
├──────────────────────────────────────────────────────────────────┤
│ 🌊 ANIMATION FAILURES                                           │
│ ├── Framer Motion errors ──── Graceful fallback to static       │
│ ├── Reduced motion pref ───── Disable animations, show content  │
│ ├── Old browser support ───── CSS fallbacks for transforms      │
│ └── Performance issues ────── Skip complex animations           │
├──────────────────────────────────────────────────────────────────┤
│ 📱 RESPONSIVE FAILURES                                          │
│ ├── Extreme small screens ──── Min-width: 280px                 │
│ ├── Very large screens ────── Max-width container               │
│ ├── Landscape mobile ──────── Adjust video aspect ratio        │
│ └── Print styles ──────────── Hide videos, optimize text       │
└──────────────────────────────────────────────────────────────────┘
```

## 🎯 LOADING STRATEGIES & STATES

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                      LOADING STRATEGIES                          │
├──────────────────────────────────────────────────────────────────┤
│ ⚡ IMMEDIATE (0ms) - NO LOADING STATES                          │
│ ├── 📊 CMS Data ────────────── Synchronous JSON imports          │
│ ├── 🏗️ Component Structure ── Immediate render                  │
│ ├── 🎨 CSS Styles ──────────── Pre-loaded with component        │
│ └── 📱 Layout ──────────────── Static generation               │
├──────────────────────────────────────────────────────────────────┤
│ 🎬 PROGRESSIVE (0-800ms)                                        │
│ ├── Hero Background Video ─── Immediate play, progressive load   │
│ ├── Critical Images ───────── Next.js Image with priority       │
│ ├── Web Fonts ─────────────── font-display: swap               │
│ └── Above-fold Content ───── Critical CSS inline               │
├──────────────────────────────────────────────────────────────────┤
│ 🟡 DEFERRED (800ms+)                                           │
│ ├── 🟡 LazyServicesCarousel ── React.lazy with Suspense         │
│ ├── Non-critical Images ──── loading="lazy" attribute           │
│ ├── Below-fold Animations ─── IntersectionObserver triggers     │
│ └── External Resources ───── Bizstim link, social widgets       │
├──────────────────────────────────────────────────────────────────┤
│ 🚫 NO LOADING SPINNERS                                         │
│ ├── ❌ No useState loading ── Would break synchronous CMS       │
│ ├── ❌ No skeleton screens ── Content available immediately     │
│ ├── ❌ No loading indicators ─ Causes ".map is not a function"   │
│ └── ✅ Progressive rendering ─ Content streams in naturally      │
└──────────────────────────────────────────────────────────────────┘
```

## 🎨 CSS & STYLING ARCHITECTURE

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                     STYLING SYSTEM                               │
├──────────────────────────────────────────────────────────────────┤
│ 🎨 TAILWIND CSS 4.x                                             │
│ ├── Design Tokens ────────── Colors, spacing, typography        │
│ ├── Component Classes ────── Reusable button, card styles       │
│ ├── Responsive Utilities ── Mobile-first breakpoint system      │
│ └── Custom Components ────── @apply directives for consistency   │
├──────────────────────────────────────────────────────────────────┤
│ 🌈 COLOR SYSTEM                                                │
│ ├── primary-50 → primary-950 ── Main brand colors (blues)       │
│ ├── accent-50 → accent-950 ──── Accent colors (gold/orange)     │
│ ├── gray-50 → gray-950 ─────── Neutral colors                   │
│ └── semantic colors ───────── success, warning, error states    │
├──────────────────────────────────────────────────────────────────┤
│ 📝 TYPOGRAPHY                                                  │
│ ├── font-serif ───────────── Headings (elegant, professional)   │
│ ├── font-sans ────────────── Body text (readable, modern)       │
│ ├── font-mono ────────────── Code, technical content           │
│ └── Responsive sizing ───── text-xl lg:text-2xl xl:text-3xl    │
├──────────────────────────────────────────────────────────────────┤
│ 🎭 ANIMATION STYLES                                             │
│ ├── Framer Motion ────────── Component animations               │
│ ├── CSS Transitions ──────── Hover, focus states               │
│ ├── Transform Utilities ──── scale, rotate, translate          │
│ └── Keyframe Animations ───── Loading, pulsing effects          │
└──────────────────────────────────────────────────────────────────┘
```

## 🔍 FINAL VISUAL LAYOUT SUMMARY

```ascii
┌─────────────────────────────────────────────────────────────────────────────┐
│                          🏠 HOMEPAGE LAYOUT                                  │
│                        My Private Tutor Online                              │
└─────────────────────────────────────────────────────────────────────────────┘

🔷 PageLayout(showHeader=true, showFooter=true, containerSize="full", verticalSpacing="none")
├── 🎯 PageHeader (Main Navigation Navbar) ──────────────── CRITICAL USER NAV
├── 🌐 LanguageSwitcher (fixed top-6 right-6 z-50)
└── Main Content:
    ├── 1️⃣ 🎬 HeroSection ─────────────── Full-screen video background
    │   └── /videos/background-video-2025-compressed.mp4
    ├── 2️⃣ 🎭 AnimatedTagline (mt-8) ──── "We help students place at top 10..."
    │   ├── TypingAnimation (80ms/char, 500ms delay)
    │   └── Decorative flourishes (scale+opacity, 2.5s delay)
    ├── 3️⃣ 🎠 ScrollingSchools (mt-8) ─── School logos carousel
    │   └── Conditional: {testimonialsSchools.length > 0 && ...}
    ├── 4️⃣ 🎭 AboutSection (mt-16) ────── Founder story + credentials
    │   ├── LEFT: Text content (staggered animations 0.1s-1.1s delays)
    │   └── RIGHT: Founder image + HeroVideoDialog (stacked vertical)
    ├── 5️⃣ 🃏 TrustIndicatorsGrid ─────── "Who We Support" section
    │   └── Grid: mobile 1-col → tablet 2-col → desktop 3-col
    ├── 6️⃣ 🔷 HomepageSections ────────── Client component wrapper
    │   └── 🟡 LazyServicesCarousel ── "What We Offer" (React.lazy)
    ├── 7️⃣ 💬 QuoteSection ────────────── Founder testimonial (text-only)
    └── 8️⃣ 🔗 Bizstim CTA Section ────── External enquiry form
        ├── Interactive image (hover effects)
        ├── External link (target="_blank")
        └── /images/graphics/enquiry-form-screenshot-footer.png

📊 DATA SOURCES (All Synchronous):
├── trustIndicators ← getTrustIndicators()
├── testimonials ← getTestimonials()
├── services ← getServices()
├── branding ← getSiteBranding()
├── founderQuote ← getFounderQuote()
├── studentImages ← getStudentImages()
└── testimonialsSchools ← getTestimonialsSchools()

🚀 PERFORMANCE:
├── Critical Path: HeroSection + AnimatedTagline + Navbar
├── Lazy Loaded: LazyServicesCarousel (below-fold)
├── Animations: Framer Motion whileInView triggers
└── Bundle Size: ~229kB first load JS

♿ ACCESSIBILITY:
├── Skip-to-content link (sr-only focus)
├── Semantic HTML5 landmarks
├── ARIA labels for interactive elements
├── Keyboard navigation support
├── prefers-reduced-motion support
└── WCAG 2.1 AA color contrast ratios
```

This comprehensive visual map provides complete architectural understanding of the My Private Tutor Online homepage, including all component relationships, data flows, interaction states, performance boundaries, responsive behavior, accessibility features, and the critical synchronous CMS architecture that prevents loading failures.