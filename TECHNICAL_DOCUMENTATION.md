# St Saviour's Website - Technical Documentation

## Complete Technical Specification

### Architecture Overview
- **Framework**: Next.js 14.2.30 with TypeScript and App Router
- **Styling**: Tailwind CSS with custom navy/gold design system
- **State Management**: React hooks with Context API for global state
- **Animation**: Framer Motion with accessibility-first approach
- **Images**: Next.js Image component with WebP/AVIF optimization
- **Content Management**: Advanced CMS system with cms-content.ts and cms-images.ts modules
- **Configuration**: Centralised settings.json with comprehensive image and content management
- **Authentication**: JWT with HTTP-only cookies

### Design System Standards

#### Color Palette
```css
/* Primary Colors */
Navy 900: #0f172a (primary backgrounds)
Navy 800: #1e293b (secondary backgrounds)  
Gold 600: #d97706 (accent color)
Gold 500: #f59e0b (hover states)

/* Neutral Colors */
White: #ffffff (card backgrounds, text on dark)
Gray 900: #111827 (primary text)
Gray 600: #4b5563 (secondary text)
Cream 50: #fefefe (light backgrounds)
```

#### Typography System
```css
/* Font Families */
Sans: 'Inter', system-ui (body text, UI elements)
Serif: 'Crimson Text', Georgia (headings, decorative)

/* Scale */
xs: 0.75rem (12px)
sm: 0.875rem (14px) 
base: 1rem (16px)
lg: 1.125rem (18px)
xl: 1.25rem (20px)
2xl: 1.5rem (24px)
3xl: 1.875rem (30px)
4xl: 2.25rem (36px)
5xl: 3rem (48px)
6xl: 3.75rem (60px)
7xl: 4.5rem (72px)
8xl: 6rem (96px)
```

#### Component Standards
- **Cards**: Pure white backgrounds (`bg-white`), subtle shadows
- **Buttons**: Primary (gold), Secondary (white), Outline (bordered)
- **Navigation**: Navy background with white/gold styling
- **Forms**: Consistent focus states with gold accent
- **Animations**: Respect `prefers-reduced-motion` setting

### Performance Standards

#### Bundle Optimization
- **Total Bundle**: 143 kB first load
- **Page Bundle**: 62.4 kB average
- **Image Optimization**: WebP/AVIF with Next.js Image
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination

#### Loading Performance
```javascript
// Critical metrics targets
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift: < 0.1
First Input Delay: < 100ms
```

#### Image Optimization Strategy
```javascript
// Next.js Image configuration
{
  formats: ['image/webp', 'image/avif'],
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority: true, // for above-fold images
  placeholder: 'blur', // for better UX
  quality: 85 // balance of quality vs file size
}
```

### Accessibility Implementation

#### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 minimum ratio for normal text, 3:1 for large text
- **Keyboard Navigation**: Full tab-accessible interface
- **Screen Readers**: Comprehensive ARIA labels and landmarks
- **Focus Management**: Visible focus indicators throughout
- **Motion**: Respects `prefers-reduced-motion` user setting

#### Accessibility Features
```javascript
// Motion sensitivity handling
const prefersReducedMotion = useReducedMotion()
const animation = prefersReducedMotion ? {} : {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}
```

#### Semantic HTML Structure
```html
<main role="main">
  <section aria-labelledby="section-heading">
    <h2 id="section-heading">Section Title</h2>
    <article aria-describedby="article-desc">
      <p id="article-desc">Article content...</p>
    </article>
  </section>
</main>
```

### Content Management System

#### CMS Architecture (Latest Implementation)
The website now features a comprehensive CMS system with modular content management:

```typescript
// cms-content.ts - Centralised content management
export function getParishName(): string
export function getParishDiocese(): string  
export function getContactPhone(): string
export function getContactEmail(): string
export function getSocialLinks(): SocialLink[]
export function getParishPriest(): string
export function getHeroContent(): HeroContent[]

// cms-images.ts - Structured image management
export function getLogo(): string
export function getHeroImages(): HeroImage[]
export function getCTAImages(): CTAImages
export function getSacramentImages(): SacramentImage[]
```

#### Configuration Management
Settings are centralised in `settings.json` with comprehensive image and content configuration:
- Hero carousel images with overlay settings
- Sacrament-specific image mappings
- Page-specific hero images 
- CTA section image management
- Complete image alt-text and metadata

#### Data Structure
```typescript
// Core interfaces
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  published: boolean;
  slug: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  category: string;
  registrationRequired: boolean;
  contact: string;
  published: boolean;
}

interface MassTime {
  day: string;
  services: {
    time: string;
    type: string;
    description: string;
  }[];
}
```

#### API Architecture
```typescript
// RESTful endpoints
GET    /api/admin/news        // Fetch all articles
POST   /api/admin/news        // Create new article
PUT    /api/admin/news?id=X   // Update article
DELETE /api/admin/news?id=X   // Delete article

// Authentication
POST   /api/admin/auth        // Login/logout
GET    /api/admin/auth        // Verify session
```

#### File-Based Storage
```
/data/
├── news.json           # News articles
├── events.json         # Parish events
├── mass-times.json     # Weekly Mass schedule
├── settings.json       # Website configuration
├── parish-groups.json  # Community groups
└── gallery.json        # Photo galleries
```

### Security Implementation

#### Authentication System
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Session Timeout**: 24-hour automatic expiry
- **CSRF Protection**: SameSite cookie attributes

#### Environment Security
```bash
# Required environment variables
ADMIN_USERNAME=admin
ADMIN_PASSWORD=StSaviours2025!
JWT_SECRET=secure-random-string-change-in-production
NODE_ENV=production
```

#### Input Validation
```typescript
// API validation example
const validateNewsArticle = (data: any): NewsArticle => {
  return {
    id: generateId(),
    title: sanitize(data.title),
    content: sanitize(data.content),
    published: Boolean(data.published),
    // ... other validated fields
  }
}
```

### 2025 Best Practices Implementation

#### Modern Church Website Features
1. **Live Streaming Integration**: YouTube embed with responsive design
2. **Mobile-First Approach**: Progressive enhancement from mobile
3. **Accessibility Excellence**: Beyond basic compliance
4. **Performance Optimization**: Sub-3-second load times
5. **Content Management**: User-friendly admin interface
6. **SEO Optimization**: Structured data and meta tags

#### Progressive Enhancement
```javascript
// Feature detection and enhancement
if ('IntersectionObserver' in window) {
  // Enable lazy loading and scroll animations
}

if (navigator.share) {
  // Enable native sharing for mobile devices
}

if ('serviceWorker' in navigator) {
  // Enable offline functionality (future enhancement)
}
```

### Responsive Design System

#### Breakpoint Strategy
```css
/* Mobile-first breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Large tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

#### Layout Patterns
- **Grid System**: CSS Grid with Tailwind utilities
- **Flexbox**: For component-level layouts
- **Container Queries**: Future-ready responsive components
- **Fluid Typography**: Responsive font scaling

### SEO and Meta Data

#### Structured Data Implementation
```json
{
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  "name": "St Saviour's Catholic Church",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Brockley Rise",
    "addressLocality": "London",
    "postalCode": "SE23 1NG",
    "addressCountry": "GB"
  },
  "telephone": "020 8852 7411",
  "email": "parish@saintsaviours.org.uk"
}
```

#### Open Graph Configuration
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="St Saviour's Catholic Church, Lewisham" />
<meta property="og:description" content="Welcome to St Saviour's Catholic Church in Lewisham..." />
<meta property="og:image" content="/images/church-og-image.jpg" />
<meta property="og:locale" content="en_GB" />
```

### Testing and Quality Assurance

#### Automated Testing Strategy
- **Accessibility**: axe-core automated testing
- **Performance**: Lighthouse CI integration
- **Cross-browser**: BrowserStack testing matrix
- **API Testing**: Jest-based endpoint testing

#### Manual Testing Checklist
- [ ] Keyboard navigation throughout site
- [ ] Screen reader compatibility (NVDA, JAWS)
- [ ] Mobile responsiveness on real devices
- [ ] Performance on slow connections
- [ ] Admin CMS functionality end-to-end

### Deployment and Infrastructure

#### Production Environment
```javascript
// Next.js production configuration
module.exports = {
  output: 'standalone',
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  compress: true,
  poweredByHeader: false,
}
```

#### Performance Monitoring
- **Core Web Vitals**: Real User Monitoring (RUM)
- **Error Tracking**: Automatic error reporting
- **Uptime Monitoring**: Health check endpoints
- **Analytics**: Privacy-respecting visitor tracking

### Maintenance and Updates

#### Regular Maintenance Tasks
- **Weekly**: Content updates via CMS
- **Monthly**: Dependency updates and security patches
- **Quarterly**: Performance audits and optimization
- **Annually**: Accessibility compliance review

#### Version Control Strategy
```bash
# Branching model
main        # Production-ready code
develop     # Integration branch
feature/*   # Feature development
hotfix/*    # Emergency fixes
```

This technical documentation provides the complete reference for maintaining and extending the St Saviour's website while preserving all implemented best practices and standards.