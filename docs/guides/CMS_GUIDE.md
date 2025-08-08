# Content Management System (CMS) Guide

**Documentation Source**: Context7 MCP - TypeScript Interface Patterns  
**Architecture**: File-based JSON CMS with TypeScript type safety  
**Status**: Production Ready

---

## 🏗️ CMS Architecture Overview

The CMS is a file-based content management system using JSON files for storage and TypeScript for type-safe retrieval. All content is managed through centralised modules with comprehensive type definitions.

### Core Modules
- **cms-content.ts**: Content retrieval functions
- **cms-images.ts**: Image and video asset management
- **Type Definitions**: Full TypeScript interfaces for all content

### Content Storage
```
src/content/
├── site-header.json       # Navigation and header content
├── homepage.json          # Homepage sections
├── testimonials.json      # Client testimonials
├── services.json          # Service offerings
├── quote-form.json        # Quote form configuration
├── about.json             # About page content
└── settings.json          # Global site settings
```

---

## 📚 Using the CMS

### Import CMS Functions
```typescript
// CONTEXT7 SOURCE: /microsoft/typescript - Module imports
import {
  getHeroContent,
  getTestimonials,
  getServices,
  getSiteHeader,
  getContactDetails,
  getQuoteFormContent
} from '@/lib/cms/cms-content'

import {
  getHeroImage,
  getTestimonialVideos,
  getBackgroundVideo
} from '@/lib/cms/cms-images'
```

### Retrieve Content
```typescript
// Get homepage hero content
const hero = getHeroContent()
// Returns: { title, subtitle, description, ctaText, ctaLink }

// Get all testimonials
const testimonials = getTestimonials()
// Returns: Array of testimonial objects

// Get specific service
const oxbridgeService = getService('oxbridge-preparation')
// Returns: Service details object
```

---

## 🎯 Content Functions Reference

### Site Header & Navigation
```typescript
// Get complete header configuration
const header = getSiteHeader()
// Returns: SiteHeader interface with navigation, contact, branding

// Get navigation items only
const navItems = getNavigationItems()
// Returns: Array of NavigationItem objects

// Get contact details
const contact = getContactDetails()
// Returns: ContactDetails with phone, email, address
```

### Homepage Content
```typescript
// Hero section
const hero = getHeroContent()

// Trust indicators (awards, recognition)
const trustIndicators = getTrustIndicators()

// Features section
const features = getHomepageFeatures()

// Statistics
const stats = getHomepageStats()
```

### Service Pages
```typescript
// Get all services
const allServices = getServices()

// Get specific service
const service = getService('11-plus-preparation')

// Get service categories
const categories = getServiceCategories()
```

### Testimonials
```typescript
// Get all testimonials
const testimonials = getTestimonials()

// Get featured testimonials
const featured = getFeaturedTestimonials()

// Get testimonials by type
const parentTestimonials = getTestimonialsByType('parent')
const studentTestimonials = getTestimonialsByType('student')
```

### Quote Form
```typescript
// Get complete quote form content
const quoteForm = getQuoteFormContent()

// Get form configuration
const formConfig = getQuoteFormConfig()

// Get field options
const subjects = getSubjectOptions()
const educationLevels = getEducationLevelOptions()
const hearAboutOptions = getHowDidYouHearOptions()
```

---

## 🖼️ Image & Video Management

### Image Retrieval
```typescript
// Get responsive image with all sizes
const heroImage = getHeroImage()
// Returns: {
//   src: string,
//   alt: string,
//   sizes: {
//     mobile: string,
//     tablet: string,
//     desktop: string
//   }
// }

// Get specific image size
const mobileHero = getImageBySize('hero', 'mobile')

// Get image with metadata
const imageWithMeta = getImageWithMetadata('team-photo')
// Returns: Image with width, height, format info
```

### Video Management
```typescript
// Get video with poster
const introVideo = getVideoAsset('beth-introduction')
// Returns: {
//   src: string,
//   poster: string,
//   type: string,
//   duration?: number
// }

// Get background video
const bgVideo = getBackgroundVideo()
// Returns: Video asset optimised for background use

// Get testimonial videos
const testimonialVideos = getTestimonialVideos()
// Returns: Array of video assets
```

---

## 📝 Content Structure Examples

### Homepage Hero Content
```json
{
  "hero": {
    "title": "Premium Private Tutoring",
    "subtitle": "Oxbridge & 11+ Specialists Since 2010",
    "description": "Royal-endorsed tutoring service...",
    "ctaText": "Request a Quote",
    "ctaLink": "/quote",
    "backgroundImage": "/images/hero-bg.jpg",
    "backgroundVideo": "/videos/background-video-2025.mp4"
  }
}
```

### Service Structure
```json
{
  "id": "oxbridge-preparation",
  "title": "Oxbridge Preparation",
  "description": "Expert guidance for Oxford and Cambridge",
  "features": [
    "Interview preparation",
    "Personal statement support",
    "Entrance exam coaching"
  ],
  "pricing": {
    "from": 150,
    "currency": "GBP",
    "period": "hour"
  },
  "image": "/images/oxbridge-prep.jpg"
}
```

### Testimonial Structure
```json
{
  "id": "testimonial-001",
  "name": "Lady Catherine Worthington",
  "role": "Parent",
  "location": "Kensington, London",
  "rating": 5,
  "text": "Exceptional tutoring service...",
  "image": "/images/testimonials/catherine.jpg",
  "video": "/videos/testimonials/catherine.mp4",
  "featured": true,
  "type": "parent"
}
```

---

## 🔧 Adding New Content

### Step 1: Update JSON File
```json
// src/content/homepage.json
{
  "hero": {
    "title": "New Hero Title",
    // ... other fields
  },
  "newSection": {
    "title": "New Section",
    "content": "Section content"
  }
}
```

### Step 2: Add TypeScript Interface
```typescript
// src/types/cms.ts
export interface NewSection {
  readonly title: string
  readonly content: string
}

export interface HomepageContent {
  readonly hero: HeroContent
  readonly newSection: NewSection // Add here
}
```

### Step 3: Create Retrieval Function
```typescript
// src/lib/cms/cms-content.ts
export function getNewSection(): NewSection {
  const content = loadContent('homepage.json')
  return content.newSection || {
    title: 'Default Title',
    content: 'Default content'
  }
}
```

### Step 4: Use in Component
```typescript
// src/components/NewSection.tsx
import { getNewSection } from '@/lib/cms/cms-content'

export function NewSection() {
  const content = getNewSection()
  
  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </section>
  )
}
```

---

## 🎨 CMS Best Practices

### Type Safety
```typescript
// Always define interfaces for content
interface ContentSection {
  readonly id: string
  readonly title: string
  readonly description?: string
}

// Use readonly for immutability
// Use optional properties where appropriate
```

### Error Handling
```typescript
// Provide fallback content
export function getContent(): Content {
  try {
    return loadContent('file.json')
  } catch {
    return DEFAULT_CONTENT
  }
}

// Define defaults for all content
const DEFAULT_HERO: HeroContent = {
  title: 'Welcome',
  subtitle: 'Default subtitle',
  // ... other defaults
}
```

### Content Validation
```typescript
// Use Zod for runtime validation
import { z } from 'zod'

const HeroSchema = z.object({
  title: z.string().min(1).max(100),
  subtitle: z.string().optional(),
  ctaText: z.string().max(30)
})

export function getValidatedHero() {
  const content = loadContent('homepage.json')
  return HeroSchema.parse(content.hero)
}
```

---

## 🚀 Advanced CMS Features

### Dynamic Content Loading
```typescript
// Load content based on locale or environment
export function getLocalizedContent(locale: string) {
  const filename = `content-${locale}.json`
  return loadContent(filename)
}

// Environment-specific content
export function getEnvironmentContent() {
  const env = process.env.NODE_ENV
  return loadContent(`content-${env}.json`)
}
```

### Content Caching
```typescript
// Simple in-memory cache
const contentCache = new Map()

export function getCachedContent(key: string) {
  if (contentCache.has(key)) {
    return contentCache.get(key)
  }
  
  const content = loadContent(`${key}.json`)
  contentCache.set(key, content)
  return content
}
```

### Content Versioning
```typescript
// Track content versions
interface VersionedContent {
  version: string
  updatedAt: string
  content: any
}

export function getVersionedContent(): VersionedContent {
  const content = loadContent('versioned.json')
  return {
    version: content.version,
    updatedAt: content.updatedAt,
    content: content.data
  }
}
```

---

## 🔒 Security Considerations

### Input Sanitization
```typescript
// Sanitize user-generated content
import DOMPurify from 'isomorphic-dompurify'

export function getSanitizedContent(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  })
}
```

### Access Control
```typescript
// Restrict admin content
export function getAdminContent(isAuthenticated: boolean) {
  if (!isAuthenticated) {
    throw new Error('Unauthorized')
  }
  return loadContent('admin-content.json')
}
```

---

## 📋 CMS Checklist

### Content Management
- [ ] All content in JSON files
- [ ] TypeScript interfaces defined
- [ ] Retrieval functions created
- [ ] Error handling implemented
- [ ] Default content provided

### Type Safety
- [ ] All interfaces use readonly
- [ ] Optional properties marked
- [ ] Return types specified
- [ ] No any types used

### Performance
- [ ] Content cached where appropriate
- [ ] Lazy loading for heavy content
- [ ] Images optimised
- [ ] Videos compressed

### Security
- [ ] User content sanitized
- [ ] Admin content protected
- [ ] No sensitive data exposed
- [ ] Input validation implemented

---

## 🛠️ Troubleshooting

### Common Issues

#### Content Not Loading
**Problem**: Function returns undefined  
**Solution**: Check JSON file path and structure

#### Type Errors
**Problem**: TypeScript compilation fails  
**Solution**: Ensure interfaces match JSON structure

#### Missing Content
**Problem**: Content shows defaults  
**Solution**: Verify JSON file has required fields

#### Performance Issues
**Problem**: Slow content loading  
**Solution**: Implement caching strategy

---

**CMS Documentation**: Context7 MCP Compliant  
**Last Updated**: August 2025  
**Maintained By**: Development Team