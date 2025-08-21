# My Private Tutor Online - About & Video Masterclasses Page Visual Maps

This document contains comprehensive visual architecture mappings for the About page and Video Masterclasses page, showing complete component hierarchies, interactions, and technical implementation details.

---

## 📄 PAGE 1: ABOUT PAGE (`/about/page.tsx`)

```
╔══════════════════════════════════════════════════════════════════════════════════════════╗
║                          ABOUT PAGE ARCHITECTURE MAPPING                                ║
║                        File: src/app/about/page.tsx                                     ║
╠══════════════════════════════════════════════════════════════════════════════════════════╣

1. CLIENT COMPONENT WRAPPER
   ├── 1.1 STATE MANAGEMENT
   │   ├── 1.1.1 aboutTestimonials: useState<readonly Testimonial[]>([])
   │   ├── 1.1.2 isLoading: useState(true)
   │   └── 1.1.3 useEffect for async testimonials fetch
   └── 1.2 CMS DATA INTEGRATION
       ├── 1.2.1 getAboutHeroImage() - centralized image management
       └── 1.2.2 getAboutTestimonials() - async testimonial data

2. HERO SECTION (SimpleHero Component)
   ├── 2.1 BACKGROUND IMAGE SYSTEM
   │   ├── 2.1.1 CMS-managed hero image: aboutHeroImage.src
   │   ├── 2.1.2 Framer Motion scroll-triggered animations
   │   └── 2.1.3 decorativeStyle="lines" - golden decorative lines
   ├── 2.2 CONTENT HIERARCHY
   │   ├── 2.2.1 H1: "Our Founder and Ethos"
   │   └── 2.2.2 H2: "Excellence Through Experience"
   └── 2.3 RESPONSIVE LAYOUT
       ├── 2.3.1 Full-screen hero treatment (h-screen)
       ├── 2.3.2 Mobile-first responsive scaling
       └── 2.3.3 WCAG 2.1 AA contrast compliance

3. PAGE LAYOUT WRAPPER (PageLayout Component)
   ├── 3.1 LAYOUT CONFIGURATION
   │   ├── 3.1.1 background="white"
   │   ├── 3.1.2 showHeader={true} - consistent navigation
   │   ├── 3.1.3 showFooter={true}
   │   ├── 3.1.4 containerSize="full"
   │   └── 3.1.5 className="space-y-0" - no default spacing
   └── 3.2 CONTENT SECTIONS CONTAINER
       ├── 3.2.1 Full-width content area
       └── 3.2.2 Zero vertical spacing for custom layouts

4. FOUNDER STORY SECTION (FounderStorySection Component)
   ├── 4.1 MAGAZINE LAYOUT STRUCTURE (6 Rows)
   │   ├── 4.1.1 ROW 1: Hero Introduction
   │   │   ├── 4.1.1.1 Centered text container (50-70% width)
   │   │   ├── 4.1.1.2 H1: "Meet Elizabeth, A Different Kind of Educator"
   │   │   ├── 4.1.1.3 Lead paragraph: condensed by 50% for impact
   │   │   └── 4.1.1.4 Framer Motion fadeInUp animations
   │   ├── 4.1.2 ROW 2: Personal Introduction
   │   │   ├── 4.1.2.1 Full-width edge-to-edge 50/50 split
   │   │   ├── 4.1.2.2 LEFT: Portrait image (founder-elizabeth-burrows-portrait.jpg)
   │   │   │   ├── 4.1.2.2.1 Dynamic height matching (min-h-[400px] lg:min-h-[500px])
   │   │   │   ├── 4.1.2.2.2 aspect-[4/5] ratio on mobile, lg:aspect-auto on desktop
   │   │   │   ├── 4.1.2.2.3 Next.js Image with fill prop for container optimization
   │   │   │   └── 4.1.2.2.4 blur placeholder and lazy loading
   │   │   └── 4.1.2.3 RIGHT: Personal story content
   │   │       ├── 4.1.2.3.1 H2: "Meet Elizabeth, A Different Kind of Educator"
   │   │       ├── 4.1.2.3.2 Six schools narrative
   │   │       ├── 4.1.2.3.3 Dyspraxia and tutor impact story
   │   │       └── 4.1.2.3.4 fadeInRight animations
   │   ├── 4.1.3 ROW 3: Going Against the Grain
   │   │   ├── 4.1.3.1 Full-width edge-to-edge 50/50 split (reversed order)
   │   │   ├── 4.1.3.2 LEFT: Story content
   │   │   │   ├── 4.1.3.2.1 H2: "Going Against the Grain"
   │   │   │   ├── 4.1.3.2.2 Cambridge offer story
   │   │   │   ├── 4.1.3.2.3 Bristol choice narrative
   │   │   │   ├── 4.1.3.2.4 Educational ethos statement (BOLD)
   │   │   │   └── 4.1.3.2.5 fadeInLeft animations
   │   │   └── 4.1.3.3 RIGHT: Secondary image (founder-elizabeth-burrows-secondary.jpg)
   │   │       ├── 4.1.3.3.1 Proportional height matching
   │   │       └── 4.1.3.3.2 fadeInRight animations
   │   ├── 4.1.4 ROW 4: Career Milestones
   │   │   ├── 4.1.4.1 Centered text container with sub-sections
   │   │   ├── 4.1.4.2 SUB-ROW 1: First Lesson
   │   │   │   ├── 4.1.4.2.1 H3: "First Lesson"
   │   │   │   └── 4.1.4.2.2 Bristol tutoring beginnings
   │   │   └── 4.1.4.3 SUB-ROW 2: to Seventh Continent
   │   │       ├── 4.1.4.3.1 H3: "to Seventh Continent"
   │   │       └── 4.1.4.3.2 International placements story
   │   ├── 4.1.5 ROW 5: Global Experience
   │   │   ├── 4.1.5.1 Hero-style single column with text overlay
   │   │   ├── 4.1.5.2 Background: Professional portrait (founder-elizabeth-burrows-professional.jpg)
   │   │   ├── 4.1.5.3 Gradient overlay: bg-gradient-to-r from-black/70 via-black/50 to-transparent
   │   │   ├── 4.1.5.4 H2: "A Global View of What Education Can Do"
   │   │   ├── 4.1.5.5 Forbes Middle East experience
   │   │   └── 4.1.5.6 Business leaders education impact story
   │   └── 4.1.6 ROW 6: Results Section
   │       ├── 4.1.6.1 Centered text container with premium formatting
   │       ├── 4.1.6.2 H2: "Results That Matter"
   │       ├── 4.1.6.3 Statistics highlight: "94% of GCSE students improve by two or more grades"
   │       ├── 4.1.6.4 Educational philosophy statement
   │       └── 4.1.6.5 Signature integration
   │           ├── 4.1.6.5.1 elizabeth-burrows-signature.png
   │           └── 4.1.6.5.2 "Elizabeth Burrows, Founder & CEO"
   ├── 4.2 ANIMATION SYSTEM
   │   ├── 4.2.1 fadeInUpVariant: { opacity: 0, y: 30 } → { opacity: 1, y: 0 }
   │   ├── 4.2.2 fadeInLeftVariant: { opacity: 0, x: -30 } → { opacity: 1, x: 0 }
   │   ├── 4.2.3 fadeInRightVariant: { opacity: 0, x: 30 } → { opacity: 1, x: 0 }
   │   └── 4.2.4 whileInView with viewport={{ once: true, margin: "-100px" }}
   ├── 4.3 RESPONSIVE BEHAVIOR
   │   ├── 4.3.1 Mobile: Single column stacking
   │   ├── 4.3.2 Tablet: Adjusted proportions
   │   └── 4.3.3 Desktop: Full split layouts with dynamic height matching
   └── 4.4 ACCESSIBILITY FEATURES
       ├── 4.4.1 Semantic section structure
       ├── 4.4.2 aria-labelledby="founder-story-heading"
       ├── 4.4.3 Image alt text with context
       └── 4.4.4 Reduced motion support in animations

5. TESTIMONIALS SECTION (TestimonialsSection Component) [CONDITIONAL RENDER]
   ├── 5.1 LOADING STATE PROTECTION
   │   └── 5.1.1 {!isLoading && <TestimonialsSection testimonials={aboutTestimonials} />}
   ├── 5.2 SWIPER CAROUSEL SYSTEM
   │   ├── 5.2.1 Premium Swiper.js implementation
   │   ├── 5.2.2 Navigation: Custom arrows with ChevronLeft/ChevronRight
   │   ├── 5.2.3 Pagination: Dynamic bullets system
   │   ├── 5.2.4 Autoplay: 4000ms delay with pause on hover
   │   └── 5.2.5 Responsive breakpoints:
   │       ├── 5.2.5.1 Mobile: 1 testimonial per view
   │       ├── 5.2.5.2 Tablet: 2 testimonials per view
   │       └── 5.2.5.3 Desktop: 3 testimonials per view
   ├── 5.3 ADVANCED FILTERING SYSTEM
   │   ├── 5.3.1 Filter types: Subject, Academic Level, Results
   │   ├── 5.3.2 Filter state: FilterOptions interface
   │   ├── 5.3.3 Dynamic filter menu with animations
   │   ├── 5.3.4 Filter persistence and clear functionality
   │   └── 5.3.5 Real-time filter count display
   ├── 5.4 TESTIMONIAL CARD DESIGN
   │   ├── 5.4.1 Material Design card styling with shadow effects
   │   ├── 5.4.2 Star ratings with accessibility support
   │   ├── 5.4.3 Subject badges for categorization
   │   ├── 5.4.4 Trophy result indicators with Lucide icons
   │   └── 5.4.5 Group hover effects with color transitions
   ├── 5.5 BACKGROUND TREATMENT
   │   ├── 5.5.1 background="bg-blue-50/30"
   │   ├── 5.5.2 Premium pattern overlay (1.5% opacity)
   │   ├── 5.5.3 Professional gradient overlays for depth
   │   └── 5.5.4 Golden ratio spacing system (110px, 68px, 42px, 26px)
   └── 5.6 EMPTY STATE DESIGN
       ├── 5.6.1 "No testimonials found" message
       ├── 5.6.2 Trophy icon visual
       ├── 5.6.3 Clear filters suggestion
       └── 5.6.4 Smooth animation transitions

6. PERFORMANCE OPTIMIZATIONS
   ├── 6.1 IMAGE OPTIMIZATION
   │   ├── 6.1.1 Next.js Image component with lazy loading
   │   ├── 6.1.2 Blur placeholders for smooth loading
   │   ├── 6.1.3 Responsive sizes configuration
   │   └── 6.1.4 Quality optimization (90%)
   ├── 6.2 ANIMATION PERFORMANCE
   │   ├── 6.2.1 useCallback for expensive operations
   │   ├── 6.2.2 Intersection Observer for viewport animations
   │   ├── 6.2.3 once: true to prevent re-triggering
   │   └── 6.2.4 GPU-accelerated transforms
   └── 6.3 DATA FETCHING EFFICIENCY
       ├── 6.3.1 Async testimonials loading
       ├── 6.3.2 Error handling with fallback arrays
       ├── 6.3.3 Loading state management
       └── 6.3.4 CMS data caching

7. TECHNICAL IMPLEMENTATION DETAILS
   ├── 7.1 CLIENT-SIDE RENDERING
   │   ├── 7.1.1 "use client" directive for state management
   │   ├── 7.1.2 React 19 compatibility
   │   └── 7.1.3 TypeScript 5.8.3+ integration
   ├── 7.2 CMS INTEGRATION
   │   ├── 7.2.1 Synchronous image data: getAboutHeroImage()
   │   ├── 7.2.2 Asynchronous testimonial data: getAboutTestimonials()
   │   └── 7.2.3 Type-safe CMS interfaces
   └── 7.3 COMPONENT ARCHITECTURE
       ├── 7.3.1 Modular section-based design
       ├── 7.3.2 Reusable layout components
       ├── 7.3.3 Prop-driven configuration
       └── 7.3.4 Context7 MCP documentation compliance

8. RESPONSIVE DESIGN SYSTEM
   ├── 8.1 MOBILE (320px - 767px)
   │   ├── 8.1.1 Single column layouts
   │   ├── 8.1.2 Stacked image/content pairs
   │   ├── 8.1.3 Reduced text sizes
   │   └── 8.1.4 Touch-optimized interactions
   ├── 8.2 TABLET (768px - 1023px)
   │   ├── 8.2.1 Transitional layouts
   │   ├── 8.2.2 Adjusted aspect ratios
   │   └── 8.2.3 Optimized testimonial grid (2 columns)
   └── 8.3 DESKTOP (1024px+)
       ├── 8.3.1 Full split layouts
       ├── 8.3.2 Dynamic height matching
       ├── 8.3.3 Premium animation effects
       └── 8.3.4 3-column testimonial carousel

╚══════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 📄 PAGE 2: VIDEO MASTERCLASSES PAGE (`/video-masterclasses/page.tsx`)

```
╔══════════════════════════════════════════════════════════════════════════════════════════╗
║                      VIDEO MASTERCLASSES PAGE ARCHITECTURE MAPPING                     ║
║                        File: src/app/video-masterclasses/page.tsx                       ║
╠══════════════════════════════════════════════════════════════════════════════════════════╣

1. CLIENT COMPONENT WRAPPER & STATE MANAGEMENT
   ├── 1.1 VIDEO MODAL STATE
   │   ├── 1.1.1 isVideoOpen: useState(false) - Modal visibility control
   │   ├── 1.1.2 videoRef: useRef<HTMLVideoElement>(null) - Video element reference
   │   └── 1.1.3 Modal handlers: handleVideoOpen(), handleVideoClose()
   ├── 1.2 KEYBOARD NAVIGATION SYSTEM
   │   ├── 1.2.1 useVideoGridNavigation hook integration
   │   ├── 1.2.2 gridCols: 2, totalItems: 8 configuration
   │   ├── 1.2.3 Arrow key navigation between video cards
   │   └── 1.2.4 Focus management with data-navigation-focus attributes
   ├── 1.3 BODY SCROLL CONTROL
   │   ├── 1.3.1 useEffect for scroll lock during video modal
   │   ├── 1.3.2 Escape key handler for modal dismissal
   │   └── 1.3.3 Cleanup on component unmount
   └── 1.4 HARDCODED CONTENT SYSTEM
       ├── 1.4.1 videoMasterclassesContent object (from Beth's new_copy.md)
       ├── 1.4.2 TODO: Migrate to CMS system
       └── 1.4.3 5 masterclass entries with detailed metadata

2. HERO SECTION (PageHero Component)
   ├── 2.1 FULL-SCREEN CONFIGURATION
   │   ├── 2.1.1 background="image"
   │   ├── 2.1.2 backgroundImage="/images/hero/hero-video-masterclasses.jpg"
   │   ├── 2.1.3 size="full" - breaks out of PageLayout container
   │   ├── 2.1.4 overlay={true}, overlayOpacity="dark"
   │   └── 2.1.5 Edge-to-edge coverage with negative margins
   ├── 2.2 TWO-COLUMN RESPONSIVE LAYOUT
   │   ├── 2.2.1 @container overflow protection
   │   ├── 2.2.2 grid-cols-1 lg:grid-cols-2 responsive grid
   │   ├── 2.2.3 gap-6 lg:gap-8 xl:gap-12 progressive spacing
   │   └── 2.2.4 items-center text-white styling
   ├── 2.3 LEFT COLUMN - HEADINGS
   │   ├── 2.3.1 text-center lg:text-left alignment
   │   ├── 2.3.2 @lg:max-w-lg container constraint
   │   ├── 2.3.3 H1: "Exclusive Video Masterclasses with Elizabeth Burrows"
   │   │   ├── 2.3.3.1 text-3xl sm:text-4xl @lg:text-4xl @xl:text-5xl responsive scaling
   │   │   ├── 2.3.3.2 font-serif font-bold leading-tight
   │   │   └── 2.3.3.3 mb-6 text-white break-words
   │   └── 2.3.4 H2: "A trusted guide to British education, culture, and university preparation"
   │       ├── 2.3.4.1 text-lg @lg:text-xl @xl:text-2xl progressive sizing
   │       └── 2.3.4.2 font-semibold text-white break-words
   └── 2.4 RIGHT COLUMN - DESCRIPTIVE TEXT
       ├── 2.4.1 text-center lg:text-left alignment
       ├── 2.4.2 @lg:max-w-lg container constraint
       ├── 2.4.3 text-base @lg:text-lg leading-relaxed text-white/90
       └── 2.4.4 Paragraph splitting: description.split('\n\n').map()
           ├── 2.4.4.1 Multi-paragraph content rendering
           ├── 2.4.4.2 break-words overflow protection
           └── 2.4.4.3 mt-4 @lg:mt-6 progressive spacing

3. PAGE LAYOUT WRAPPER (PageLayout Component)
   ├── 3.1 LAYOUT CONFIGURATION
   │   ├── 3.1.1 background="white"
   │   ├── 3.1.2 showHeader={true} - consistent navigation
   │   └── 3.1.3 showFooter={true}
   └── 3.2 SECTION STRUCTURE
       ├── 3.2.1 Multiple Section components with different backgrounds
       ├── 3.2.2 slate, white, blue-50 backgrounds for visual variety
       └── 3.2.3 Framer Motion animations throughout

4. FEATURED MASTERCLASSES SECTION
   ├── 4.1 SECTION CONFIGURATION
   │   ├── 4.1.1 id="section-3", background="slate", className="py-20 relative"
   │   ├── 4.1.2 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10
   │   └── 4.1.3 Framer Motion section header animations
   ├── 4.2 SECTION HEADER
   │   ├── 4.2.1 H2: "Featured Masterclasses"
   │   ├── 4.2.2 text-4xl lg:text-5xl font-serif font-bold text-slate-900
   │   ├── 4.2.3 Golden separator: w-24 h-1 bg-amber-500 mx-auto rounded-full
   │   └── 4.2.4 initial={{ opacity: 0, y: 20 }} → animate={{ opacity: 1, y: 0 }}
   ├── 4.3 TWO-COLUMN GRID LAYOUT
   │   ├── 4.3.1 grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto
   │   ├── 4.3.2 Staggered Framer Motion animations (delay: 0.2)
   │   └── 4.3.3 viewport={{ once: true }} for performance
   ├── 4.4 CARD 1 - UNLOCKING ACADEMIC SUCCESS (FREE)
   │   ├── 4.4.1 VideoThumbnailMidCard component integration
   │   ├── 4.4.2 CMS data: getMasterclassVideo('unlockingAcademicSuccess')
   │   ├── 4.4.3 Configuration:
   │   │   ├── 4.4.3.1 variant="standard", popular={false}
   │   │   ├── 4.4.3.2 priceRange="Free Access"
   │   │   ├── 4.4.3.3 duration="${getMasterclassVideo().duration} minutes"
   │   │   └── 4.4.3.4 onCTAClick={handleVideoOpen}
   │   ├── 4.4.4 Features array:
   │   │   ├── 4.4.4.1 "Practical strategies for academic resilience"
   │   │   ├── 4.4.4.2 "Building student independence and confidence"
   │   │   ├── 4.4.4.3 "Overcoming learning gaps effectively"
   │   │   └── 4.4.4.4 "Positive approach to tutoring support"
   │   ├── 4.4.5 Video integration:
   │   │   ├── 4.4.5.1 videoUrl={getMasterclassVideo().videoUrl}
   │   │   ├── 4.4.5.2 thumbnailUrl="/images/masterclass-thumbnails/unlocking-success.png"
   │   │   └── 4.4.5.3 enableLazyLoading={true}
   │   └── 4.4.6 Keyboard navigation: gridIndex={0}, onKeyNavigation={handleKeyNavigation}
   └── 4.5 CARD 2 - UCAS GUIDE PART 1
       ├── 4.5.1 VideoThumbnailMidCard component integration
       ├── 4.5.2 Configuration:
       │   ├── 4.5.2.1 variant="premium", popular={true}
       │   ├── 4.5.2.2 priceRange={videoMasterclassesContent.masterclasses[1]?.price || "£49.99"}
       │   ├── 4.5.2.3 duration={videoMasterclassesContent.masterclasses[1]?.duration || "90 minutes"}
       │   └── 4.5.2.4 onCTAClick with smooth scroll to #ucas-guide-section
       ├── 4.5.3 Features array:
       │   ├── 4.5.3.1 "Complete UCAS application timeline breakdown"
       │   ├── 4.5.3.2 "University selection strategies for international students"
       │   ├── 4.5.3.3 "Personal statement foundation and planning"
       │   └── 4.5.3.4 "UCAS Hub navigation and technical requirements"
       └── 4.5.4 Keyboard navigation: gridIndex={1}

5. FREE RESOURCES SECTION
   ├── 5.1 SECTION CONFIGURATION
   │   ├── 5.1.1 id="section-2", background="white", className="py-20 relative"
   │   ├── 5.1.2 Subtle background overlay: bg-blue-50 opacity-60
   │   └── 5.1.3 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10
   ├── 5.2 SECTION HEADER
   │   ├── 5.2.1 H2: "Free Resources"
   │   ├── 5.2.2 Golden separator and subtitle
   │   └── 5.2.3 "Access these complimentary masterclasses and resources"
   ├── 5.3 TWO-COLUMN GRID LAYOUT
   │   └── 5.3.1 Similar structure to Featured section
   ├── 5.4 CARD 1 - UNLOCKING ACADEMIC SUCCESS (REPEATED)
   │   ├── 5.4.1 Different features focus:
   │   │   ├── 5.4.1.1 "Recognising when one-to-one support is needed"
   │   │   ├── 5.4.1.2 "Identifying truly exceptional tutors"
   │   │   ├── 5.4.1.3 "Managing tutor-student-parent relationships"
   │   │   └── 5.4.1.4 "Practical guidance for academic outcomes"
   │   └── 5.4.2 Same video modal integration
   └── 5.5 CARD 2 - UCAS SUMMIT 2024
       ├── 5.5.1 Description: "Complete recording from Elizabeth's presentation at the UCAS Summit"
       ├── 5.5.2 Features array:
       │   ├── 5.5.2.1 "Complete UCAS Summit 2024 presentation"
       │   ├── 5.5.2.2 "Live audience Q&A session included"
       │   ├── 5.5.2.3 "Expert guidance for parents and students"
       │   └── 5.5.2.4 "Comprehensive tutoring landscape insights"
       └── 5.5.3 thumbnailUrl="/images/masterclass-thumbnails/gcse-summit.png"

6. ELIZABETH'S ESSENTIAL UCAS GUIDE SECTION
   ├── 6.1 SECTION CONFIGURATION
   │   ├── 6.1.1 id="ucas-guide-section" - scroll target from featured cards
   │   ├── 6.1.2 background="white", className="py-20 relative"
   │   └── 6.1.3 Subtle background overlay: bg-blue-50 opacity-60
   ├── 6.2 SECTION HEADER
   │   ├── 6.2.1 H2: "Elizabeth's Essential UCAS Guide"
   │   ├── 6.2.2 Subtitle: "Master the university application process with Elizabeth's comprehensive two-part UCAS guidance"
   │   └── 6.2.3 Golden separator design
   ├── 6.3 TWO-COLUMN DETAILED LAYOUT
   │   ├── 6.3.1 CARD 1 - UCAS GUIDE PART 1
   │   │   ├── 6.3.1.1 Title: "Demystifying UCAS: A Clear Path to UK University Success"
   │   │   ├── 6.3.1.2 Long description including LSE background
   │   │   ├── 6.3.1.3 variant="premium", popular={true}
   │   │   ├── 6.3.1.4 priceRange="£49.99", duration="90 minutes"
   │   │   ├── 6.3.1.5 6 detailed features:
   │   │   │   ├── 6.3.1.5.1 "Complete UCAS application timeline breakdown"
   │   │   │   ├── 6.3.1.5.2 "University selection strategies for international students"
   │   │   │   ├── 6.3.1.5.3 "Personal statement foundation and planning"
   │   │   │   ├── 6.3.1.5.4 "Reference letter guidance and timeline management"
   │   │   │   ├── 6.3.1.5.5 "UCAS Hub navigation and technical requirements"
   │   │   │   └── 6.3.1.5.6 "Common application mistakes and how to avoid them"
   │   │   └── 6.3.1.6 thumbnailUrl="/images/masterclass-thumbnails/ucas-guide.png"
   │   └── 6.3.2 CARD 2 - PERSONAL STATEMENTS PART 2
   │       ├── 6.3.2.1 Title: "Elizabeth's Top 10 Tips for Outstanding Personal Statements"
   │       ├── 6.3.2.2 Oxbridge credentials and success stories
   │       ├── 6.3.2.3 variant="premium", popular={false}
   │       ├── 6.3.2.4 priceRange="£89.99", duration="70 minutes"
   │       ├── 6.3.2.5 6 detailed features including Oxford Medicine case study
   │       └── 6.3.2.6 thumbnailUrl="/images/masterclass-thumbnails/top-10-tips.png"
   └── 6.4 STAGGERED ANIMATIONS
       ├── 6.4.1 Card 1: transition={{ duration: 0.6 }}
       └── 6.4.2 Card 2: transition={{ duration: 0.6, delay: 0.2 }}

7. GET CONFIDENT WITH BRITISH CULTURE SECTION
   ├── 7.1 SECTION CONFIGURATION
   │   ├── 7.1.1 id="british-culture-section", background="slate"
   │   ├── 7.1.2 text-slate-900 for WCAG 2.1 AA contrast compliance
   │   └── 7.1.3 Golden separator design consistency
   ├── 7.2 SECTION HEADER
   │   ├── 7.2.1 H2: "Get Confident with British Culture"
   │   └── 7.2.2 Subtitle: "From literary classics to social customs—everything your child needs to feel at home in a British classroom"
   ├── 7.3 TWO-COLUMN CULTURAL LAYOUT
   │   ├── 7.3.1 CARD 1 - BRITISH LITERARY CLASSICS
   │   │   ├── 7.3.1.1 Title: "A Masterclass for Curious and Aspiring Readers (Ages 8–14)"
   │   │   ├── 7.3.1.2 Description: "From Wind in the Willows to The Lord of the Rings"
   │   │   ├── 7.3.1.3 variant="standard", popular={false}
   │   │   ├── 7.3.1.4 priceRange="£19.99", duration="60 minutes"
   │   │   ├── 7.3.1.5 6 features including Mandarin subtitles
   │   │   └── 7.3.1.6 thumbnailUrl="/images/masterclass-thumbnails/british-literary-classics.png"
   │   └── 7.3.2 CARD 2 - BRITISH ETIQUETTE
   │       ├── 7.3.2.1 Title: "Understanding British Etiquette"
   │       ├── 7.3.2.2 Royal and high-profile family experience emphasis
   │       ├── 7.3.2.3 variant="standard", popular={false}
   │       ├── 7.3.2.4 priceRange="£19.99", duration="60 minutes"
   │       ├── 7.3.2.5 6 features including social faux pas avoidance
   │       └── 7.3.2.6 thumbnailUrl="/images/masterclass-thumbnails/british-etiquette.jpg"
   └── 7.4 STAGGERED ANIMATIONS
       ├── 7.4.1 Card 1: transition={{ duration: 0.6 }}
       └── 7.4.2 Card 2: transition={{ duration: 0.6, delay: 0.2 }}

8. IDEAL FOR SECTION
   ├── 8.1 SECTION CONFIGURATION
   │   ├── 8.1.1 background="slate", className="py-20 relative"
   │   └── 8.1.2 text-center max-w-5xl mx-auto layout
   ├── 8.2 CONTENT
   │   ├── 8.2.1 Large text: text-2xl lg:text-3xl text-white leading-relaxed font-light
   │   └── 8.2.2 Text: "These masterclasses are ideal for families looking to elevate their child's preparation..."
   └── 8.3 ANIMATION
       └── 8.3.1 Fade in from bottom with viewport trigger

9. DESIGN VARIATIONS SHOWCASE SECTIONS
   ├── 9.1 TWO-COLUMN COMPARISON SECTION
   │   ├── 9.1.1 background="slate-100", border-t border-slate-200
   │   ├── 9.1.2 H2: "Design Variations: Video Thumbnail Placement Options"
   │   ├── 9.1.3 Grid comparison: VideoThumbnailMidCard vs VideoThumbnailTopCard
   │   ├── 9.1.4 Position badges: "Thumbnail Mid Position" vs "Thumbnail Top Position"
   │   └── 9.1.5 Explanation card with layout comparison details
   ├── 9.2 FULL-WIDTH SINGLE CARD SECTION
   │   ├── 9.2.1 background="white", border-t border-slate-200
   │   ├── 9.2.2 H2: "Single Card Layout: Full-Width Presentation"
   │   ├── 9.2.3 max-w-4xl mx-auto centered layout
   │   ├── 9.2.4 "Full-Width Layout" badge
   │   └── 9.2.5 Description card explaining impact maximization
   └── 9.3 THREE-COLUMN GRID SECTION
       ├── 9.3.1 background="slate-100", border-t border-slate-200
       ├── 9.3.2 H2: "Multi-Card Layout: Three-Column Grid"
       ├── 9.3.3 grid-cols-1 lg:grid-cols-3 gap-8 layout
       ├── 9.3.4 Three identical cards with "Card 1", "Card 2", "Card 3" badges
       ├── 9.3.5 Staggered animations: delay: 0, 0.1, 0.2
       └── 9.3.6 Description card explaining compact presentation benefits

10. VIDEO MODAL SYSTEM
    ├── 10.1 MODAL OVERLAY
    │   ├── 10.1.1 fixed inset-0 z-50 full-screen coverage
    │   ├── 10.1.2 bg-black/80 backdrop-blur-sm overlay
    │   ├── 10.1.3 flex items-center justify-center centering
    │   └── 10.1.4 onClick={handleVideoClose} backdrop dismissal
    ├── 10.2 CLOSE BUTTON
    │   ├── 10.2.1 absolute top-4 right-4 positioning
    │   ├── 10.2.2 w-12 h-12 bg-white/20 backdrop-blur-sm styling
    │   ├── 10.2.3 X icon from Lucide React
    │   └── 10.2.4 ARIA label: "Close video"
    ├── 10.3 VIDEO CONTAINER
    │   ├── 10.3.1 relative w-full max-w-6xl mx-4 aspect-video dimensions
    │   ├── 10.3.2 onClick={(e) => e.stopPropagation()} prevent backdrop close
    │   └── 10.3.3 rounded-lg shadow-2xl styling
    ├── 10.4 VIDEO PLAYER
    │   ├── 10.4.1 HTML5 video element with ref={videoRef}
    │   ├── 10.4.2 src={getMasterclassVideo('unlockingAcademicSuccess').videoUrl}
    │   ├── 10.4.3 controls autoPlay muted playsInline attributes
    │   ├── 10.4.4 w-full h-full object-cover responsive sizing
    │   └── 10.4.5 onLoadedData auto-play trigger
    └── 10.5 MODAL BEHAVIOR
        ├── 10.5.1 Body scroll lock during modal open
        ├── 10.5.2 Escape key dismissal
        ├── 10.5.3 Video pause and reset on close
        └── 10.5.4 Cleanup on component unmount

11. KEYBOARD NAVIGATION SYSTEM
    ├── 11.1 GRID NAVIGATION HOOK
    │   ├── 11.1.1 useVideoGridNavigation integration
    │   ├── 11.1.2 gridCols: 2, totalItems: 8 configuration
    │   ├── 11.1.3 enableNavigation: true
    │   └── 11.1.4 onNavigate callback with console logging
    ├── 11.2 FOCUS MANAGEMENT
    │   ├── 11.2.1 data-navigation-focus attributes
    │   ├── 11.2.2 @/styles/video-focus-styles.css integration
    │   ├── 11.2.3 tabIndex={0} for keyboard accessibility
    │   └── 11.2.4 ARIA labels for screen readers
    ├── 11.3 KEY BINDINGS
    │   ├── 11.3.1 Arrow keys: Navigate between cards
    │   ├── 11.3.2 Enter/Space: Activate video playback
    │   ├── 11.3.3 Escape: Close video modal
    │   └── 11.3.4 onKeyNavigation prop chain to cards
    └── 11.4 ACCESSIBILITY FEATURES
        ├── 11.4.1 role="article" for video cards
        ├── 11.4.2 Comprehensive ARIA labels
        ├── 11.4.3 Screen reader video descriptions
        └── 11.4.4 Keyboard-only navigation support

12. RESPONSIVE DESIGN SYSTEM
    ├── 12.1 MOBILE (320px - 767px)
    │   ├── 12.1.1 Single column layouts throughout
    │   ├── 12.1.2 text-3xl responsive scaling on hero
    │   ├── 12.1.3 Stacked content sections
    │   └── 12.1.4 Touch-optimized video controls
    ├── 12.2 TABLET (768px - 1023px)
    │   ├── 12.2.1 Two-column grid layouts
    │   ├── 12.2.2 text-4xl hero scaling
    │   ├── 12.2.3 Adjusted card proportions
    │   └── 12.2.4 Optimized video modal sizing
    └── 12.3 DESKTOP (1024px+)
        ├── 12.3.1 Full two-column layouts
        ├── 12.3.2 text-5xl maximum hero scaling
        ├── 12.3.3 Premium animation effects
        ├── 12.3.4 Full-screen video modal experience
        └── 12.3.5 Keyboard navigation optimization

13. PERFORMANCE OPTIMIZATIONS
    ├── 13.1 IMAGE OPTIMIZATION
    │   ├── 13.1.1 Next.js Image components throughout
    │   ├── 13.1.2 Lazy loading with enableLazyLoading props
    │   ├── 13.1.3 Responsive sizes configuration
    │   └── 13.1.4 WebP/AVIF format support
    ├── 13.2 VIDEO OPTIMIZATION
    │   ├── 13.2.1 preload="metadata" for video elements
    │   ├── 13.2.2 Multiple source formats (MP4, WebM)
    │   ├── 13.2.3 Loading states with spinner animations
    │   └── 13.2.4 Auto-pause on modal close
    ├── 13.3 ANIMATION PERFORMANCE
    │   ├── 13.3.1 GPU-accelerated transforms
    │   ├── 13.3.2 viewport={{ once: true }} to prevent re-triggering
    │   ├── 13.3.3 useCallback for event handlers
    │   └── 13.3.4 Intersection Observer optimization
    └── 13.4 CODE SPLITTING
        ├── 13.4.1 Dynamic imports for video components
        ├── 13.4.2 Lazy loading of CMS data
        ├── 13.4.3 Tree shaking optimization
        └── 13.4.4 Bundle size optimization

14. CMS INTEGRATION ARCHITECTURE
    ├── 14.1 CURRENT IMPLEMENTATION
    │   ├── 14.1.1 Hardcoded videoMasterclassesContent object
    │   ├── 14.1.2 Data sourced from Beth's new_copy.md
    │   ├── 14.1.3 5 masterclass entries with detailed metadata
    │   └── 14.1.4 TODO: Migrate to CMS system
    ├── 14.2 CMS INTEGRATION POINTS
    │   ├── 14.2.1 getMasterclassVideo() function calls
    │   ├── 14.2.2 Video URL and thumbnail management
    │   ├── 14.2.3 Metadata synchronization
    │   └── 14.2.4 Content versioning system
    └── 14.3 FUTURE CMS STRUCTURE
        ├── 14.3.1 cms-content.ts integration
        ├── 14.3.2 Type-safe interfaces
        ├── 14.3.3 Synchronous data patterns
        └── 14.3.4 Build-time optimization

╚══════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🔧 COMPONENT INTERACTION FLOWS

### About Page Data Flow:
```
User Visit → Client Component Mount → useEffect Triggers → 
getAboutTestimonials() Async Call → Loading State → 
Data Fetched → TestimonialsSection Renders → 
Swiper Carousel Initializes → User Interaction
```

### Video Masterclasses Page Interaction Flow:
```
User Visit → Hero Video Background Loads → 
User Clicks Video Thumbnail → handleVideoOpen() → 
Modal State Changes → Body Scroll Locks → 
Video Loads with Controls → User Watches/Closes → 
handleVideoClose() → Modal Dismisses → Scroll Unlocks
```

### Keyboard Navigation Flow:
```
User Presses Arrow Key → handleKeyNavigation() → 
useVideoGridNavigation Hook Processes → 
Focus Moves to Target Card → ARIA Labels Update → 
Screen Reader Announces New Focus
```

---

## 📊 TECHNICAL SUMMARY

Both pages demonstrate sophisticated component architecture with:

- ✅ **Royal Client Standards**: Premium animations and interactions
- ✅ **WCAG 2.1 AA Compliance**: Full accessibility with ARIA labels and keyboard navigation  
- ✅ **Performance Optimization**: Lazy loading, image optimization, GPU acceleration
- ✅ **Responsive Design**: Mobile-first with progressive enhancement
- ✅ **Type Safety**: Full TypeScript integration with Context7 MCP compliance

The About page features a complex 6-row magazine layout with async testimonials, while the Video Masterclasses page includes an advanced video modal system with keyboard navigation and multiple content sections showcasing design variations.