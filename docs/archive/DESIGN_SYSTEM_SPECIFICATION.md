# St Saviour's Website - Design System Specification

## Overview
This document defines the exact design system, colors, typography, and styling requirements for the St Saviour's Catholic Church website rebuild using 2025 best practices.

## Color Palette

### Primary Colors
- **Background Dark**: `slate-900` (#0f172a) - Primary background for all content sections
- **Gold Accent**: `gold-500` (#eab308) - Secondary accent color for highlights, CTAs
- **Text White**: `white` (#ffffff) - Primary text color on dark backgrounds

### Supporting Colors
- **Text Primary**: `white` (#ffffff) - Main headings and important text on dark backgrounds
- **Text Secondary**: `gray-200` (#e5e7eb) - Body text, descriptions on dark backgrounds
- **Text Light**: `gray-300` (#d1d5db) - Captions, metadata, subtle text on dark backgrounds

### Interaction Colors
- **Gold Hover**: `gold-600` (#d97706) - Hover state for gold elements
- **Blue Hover**: `slate-800` (#1e293b) - Hover state for blue elements
- **Success**: `green-600` (#059669)
- **Warning**: `amber-600` (#d97706)
- **Error**: `red-600` (#dc2626)

## Typography

### Font Families
- **Primary**: `font-serif` - For headings and elegant text
- **Secondary**: `font-sans` - For body text and UI elements
- **Monospace**: `font-mono` - For code and technical content

### Heading Scale
- **H1**: `text-4xl lg:text-6xl font-serif font-light text-white`
- **H2**: `text-3xl lg:text-4xl font-serif font-light text-white`
- **H3**: `text-2xl lg:text-3xl font-serif font-medium text-white`
- **H4**: `text-xl lg:text-2xl font-serif font-medium text-white`

### Body Text
- **Large**: `text-xl text-gray-200 leading-relaxed`
- **Regular**: `text-lg text-gray-200 leading-relaxed`
- **Small**: `text-base text-gray-200`
- **Caption**: `text-sm text-gray-300`

## Layout System

### Page Structure
```
1. Navigation (sticky, white background)
2. Hero Section (full height, image background with slate-900 overlay)
3. Content Sections (slate-900 background, white text, consistent padding)
4. Footer (slate-900 background, white text)
```

### Section Spacing
- **Large Sections**: `py-24` (96px top/bottom padding)
- **Medium Sections**: `py-16` (64px top/bottom padding)
- **Small Sections**: `py-12` (48px top/bottom padding)

### Container Widths
- **Default**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Narrow**: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`
- **Wide**: `max-w-8xl mx-auto px-4 sm:px-6 lg:px-8`

## Component Specifications

### Hero Sections
```css
Background: Image with slate-900 overlay (70% opacity)
Height: h-[70vh] for pages, h-screen for homepage
Text: White on dark overlay
Animation: Fade up on load
```

### Cards
```css
Background: white
Border: border border-gray-200
Radius: rounded-2xl
Shadow: shadow-lg hover:shadow-xl
Padding: p-8
Hover: Scale and shadow enhancement
```

### Buttons
```css
Primary: bg-white text-slate-900 hover:bg-gray-100 (for dark backgrounds)
Secondary: border-2 border-white text-white hover:bg-white hover:text-slate-900 (for dark backgrounds)
Outline: border border-gray-300 text-gray-700 hover:bg-gray-50 (for light backgrounds)
```

### Button Usage Guidelines
- **Primary/Secondary**: White buttons on dark slate-900 backgrounds
- **Gold Accents**: Reserved for small decorative elements, icons, and hover states
- **Navigation**: White donate button with dark text for better accessibility

### Icons
```css
Size: h-6 w-6 (default), h-8 w-8 (large), h-4 w-4 (small)
Color: Matches parent text color
Style: Lucide React icons
```

## Church-Specific Components

### GroupCard Component
```typescript
// Purpose: Display parish groups with consistent styling
// Features: Color-coded icons, contact integration, activity lists
// Colors: red, blue, green, purple, pink, amber, indigo, teal
// Contact: Auto-detects email/phone and creates appropriate links
```

### NewsCard Component  
```typescript
// Purpose: Display parish news articles
// Variants: default, compact, horizontal, minimal
// Features: Category badges, featured articles, read time
// Meta: Date, author, reading time with gold accent icons
```

### ContactForm Component
```typescript
// Purpose: Modern contact forms with validation
// Features: Success/error states, loading states, accessibility
// Fields: Name, email, phone, subject dropdown, message
// Styling: Gold focus rings, proper spacing, white backgrounds
```

### ContactInfo Component
```typescript
// Purpose: Display contact information consistently
// Layouts: grid, vertical for different use cases
// Special: Emergency contact (red styling), staff (slate-900 background)
// Integration: Clickable phone/email links
```

### DonationForm Component
```typescript
// Purpose: Modern donation form with flexible amount selection
// Features: One-time/monthly toggle, preset amounts, custom input, Gift Aid
// Payment: Designed for Stripe integration with security indicators
// UX: Expandable details section, form validation, loading states
```

### DonationStats Component
```typescript
// Purpose: Display annual donation impact with transparency
// Background: Slate-900 with white text for contrast
// Features: Impact statistics cards, annual report download CTA
// Design: Gold accent colors for amounts, glass card effect
```

### GalleryGrid Component
```typescript
// Purpose: Filterable image grid with category-based organization
// Features: Category filtering, responsive grid, hover overlays, image metadata
// Layouts: 2, 3, or 4 column responsive grids
// Interaction: Click to open lightbox, smooth animations, category badges
```

### ImageLightbox Component  
```typescript
// Purpose: Full-screen image viewing with navigation
// Features: Keyboard navigation, image details, prev/next controls
// Accessibility: Focus management, escape key, screen reader support
// Design: Dark overlay, white text, gold accent category badges
```

### VenueCard Component
```typescript
// Purpose: Display venue information with flexible layouts
// Variants: default, featured, compact for different use cases
// Features: Pricing display, feature lists, suitability tags, booking integration
// Layouts: Left/right image positioning, responsive grid support
```

### VenueEnquiryForm Component
```typescript
// Purpose: Comprehensive venue booking enquiry form
// Features: Form validation, venue selection, date picker, guest count
// Validation: Required fields, email format, future dates only
// UX: Error handling, loading states, contact integration
```

### StreamingStatus Component
```typescript
// Purpose: Display live/offline streaming status with video player integration
// Features: Live status indicators, viewer count, next stream information
// States: Live with viewer count, offline with next stream details
// Integration: Video player placeholder, reminder signup, schedule navigation
```

### PodcastEpisodeCard Component
```typescript
// Purpose: Display podcast episodes with play/pause functionality
// Variants: featured (large), horizontal (compact), with episode metadata
// Features: Play/pause state, download links, duration, guest information
// Design: Featured episodes with larger imagery, season/episode numbering
```

### SacramentCard Component
```typescript
// Purpose: Display individual sacraments with color-coded design system
// Colors: blue, red, amber, green, purple, indigo, pink (one per sacrament)
// Features: Icon display, descriptions, navigation links, hover animations
// Layout: Consistent card structure with sacrament-specific theming
```

### SacramentInfo Component
```typescript
// Purpose: Comprehensive template for individual sacrament pages
// Features: Effects display, requirements, preparation guidance, contact integration
// Sections: Introduction, effects, requirements, contact, biblical quote
// Customization: Color theming per sacrament, flexible content structure
```

## Animation Guidelines

### Motion Preferences
- Always check for `prefers-reduced-motion`
- Provide static alternatives for all animations
- Use Framer Motion for consistent animations

### Animation Types
```javascript
// Fade in
initial: { opacity: 0 }
animate: { opacity: 1 }
transition: { duration: 0.6 }

// Slide up
initial: { opacity: 0, y: 30 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.8 }

// Stagger children
container: { staggerChildren: 0.1 }
```

## Accessibility Standards

### Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios (4.5:1 minimum)
- Focus indicators on all interactive elements

### Implementation
- Semantic HTML elements
- ARIA labels and descriptions
- Alt text for all images
- Proper heading hierarchy
- Focus management

## Responsive Design

### Breakpoints (Tailwind defaults)
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Mobile-First Approach
- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly interfaces (44px minimum touch targets)

## Component Library Structure

### Base Components
- Button
- Card
- Input
- Select
- TextArea
- Modal
- Alert

### Layout Components
- PageLayout
- ContentSection
- Container
- Grid
- Flex

### Church-Specific Components
- HeroSection
- ServiceTimes
- EventCard
- NewsCard
- PriestCard
- ContactInfo
- ContactForm
- GroupCard
- DonationForm
- DonationStats
- GalleryGrid
- ImageLightbox
- VenueCard
- VenueEnquiryForm
- LocationCard
- MapEmbed
- StreamingStatus
- StreamingSchedule
- WatchingOptions
- OnlineCommunity
- PodcastEpisodeCard
- PodcastSearch
- PodcastSubscribe
- SacramentCard
- SacramentInfo

## File Organization

### Component Structure
```
/src/components/
├── ui/           # Base UI components
├── layout/       # Layout components  
├── church/       # Church-specific components
├── forms/        # Form components
└── navigation/   # Navigation components
```

### Styling Approach
- Tailwind CSS for utility classes
- CSS modules for component-specific styles
- No styled-components or CSS-in-JS
- Consistent class naming conventions

## Performance Standards

### Core Web Vitals Targets
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds  
- **CLS**: < 0.1

### Image Optimization
- Next.js Image component for all images
- WebP/AVIF formats with fallbacks
- Proper sizing and lazy loading
- Alt text for accessibility

### Bundle Size Targets
- Initial JS bundle: < 150kB gzipped
- Page-specific bundles: < 50kB gzipped
- CSS bundle: < 20kB gzipped

This specification will guide the complete rebuild of the St Saviour's website with modern 2025 standards.