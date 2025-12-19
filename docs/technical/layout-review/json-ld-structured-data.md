# Issue: Inconsistent JSON-LD Structured Data

## Priority: 🟡 High

## Problem Description

Only the services route implements JSON-LD structured data, despite FAQ, testimonials, about, and other routes being equally important for SEO. This creates missed opportunities for rich snippets and enhanced search visibility across the application.

### Current Implementation

**Only has structured data**: `src/app/(app)/services/layout.tsx`
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Premium Tutoring Services",
      "description": "Royal endorsed private tutoring",
      // ... more service schema
    })
  }}
/>
```

**Missing structured data**:
- FAQ pages (should have FAQ schema)
- About page (should have Organization schema)
- Testimonials (should have Review schema)
- Blog posts (should have Article schema)
- Contact page (should have ContactPoint schema)

## Research Evidence

### Expert Opinions
- **SEO Best Practices**: [Next.js SEO Guide](https://www.dhiwise.com/post/mastering-nextjs-metadata-for-enhanced-web-visibility) emphasises structured data for rich snippets
- **JSON-LD Implementation**: [DEV Community Guide](https://dev.to/cre8stevedev/practical-guide-to-implementing-functional-seo-in-nextjs-app-router-static-dynamic-metadata-4ae2) shows systematic schema.org implementation

### Official Documentation
From Next.js metadata documentation:
> "Structured data helps search engines understand your content and create rich results in search results pages"

## Recommended Solution

### 1. Create Structured Data Utilities

**File**: `src/lib/metadata/structured-data.ts`
```typescript
// Organization schema for About page
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "My Private Tutor Online",
    "url": "https://myprivatetutoronline.com",
    "description": "Premium tutoring service with royal endorsements",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Founder Name"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressLocality": "London"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-XXX-XXX-XXXX",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/company/myprivatetutoronline",
      "https://twitter.com/myprivatetutoronline"
    ]
  }
}

// FAQ schema for FAQ pages
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Article schema for blog posts
export function createArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  slug
}: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  authorName: string
  slug: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "My Private Tutor Online",
      "logo": {
        "@type": "ImageObject",
        "url": "https://myprivatetutoronline.com/logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://myprivatetutoronline.com/blog/${slug}`
    }
  }
}

// Review aggregate schema for testimonials
export function createReviewSchema(testimonials: Array<{
  name: string
  rating: number
  review: string
  date: string
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "My Private Tutor Online",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length,
      "reviewCount": testimonials.length
    },
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating
      },
      "reviewBody": testimonial.review,
      "datePublished": testimonial.date
    }))
  }
}

// Contact point schema
export function createContactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "My Private Tutor Online",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+44-XXX-XXX-XXXX",
          "contactType": "Customer Service",
          "areaServed": "GB",
          "availableLanguage": "English",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          }
        }
      ]
    }
  }
}

// Breadcrumb schema utility
export function createBreadcrumbSchema(breadcrumbs: Array<{
  name: string
  url: string
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  }
}
```

### 2. Create Structured Data Component

**File**: `src/components/structured-data.tsx`
```typescript
interface StructuredDataProps {
  data: object | object[]
}

export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  )
}
```

### 3. Implement Structured Data Across Routes

**About Page**: `src/app/(app)/about/page.tsx`
```typescript
import { StructuredData } from '@/components/structured-data'
import { createOrganizationSchema, createBreadcrumbSchema } from '@/lib/metadata/structured-data'

export default function AboutPage() {
  const organizationSchema = createOrganizationSchema()
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://myprivatetutoronline.com" },
    { name: "About", url: "https://myprivatetutoronline.com/about" }
  ])

  return (
    <>
      <StructuredData data={[organizationSchema, breadcrumbSchema]} />
      <main>
        {/* About page content */}
      </main>
    </>
  )
}
```

**FAQ Page**: `src/app/(app)/faq/page.tsx`
```typescript
import { StructuredData } from '@/components/structured-data'
import { createFAQSchema } from '@/lib/metadata/structured-data'

export default function FAQPage() {
  // Get FAQs from your CMS/data source
  const faqs = [
    {
      question: "How does the tutoring process work?",
      answer: "Our 3-step process includes consultation, matching with a tutor, and ongoing support."
    },
    // ... more FAQs
  ]

  const faqSchema = createFAQSchema(faqs)

  return (
    <>
      <StructuredData data={faqSchema} />
      <main>
        {/* FAQ content */}
      </main>
    </>
  )
}
```

**Testimonials Page**: `src/app/(app)/testimonials/page.tsx`
```typescript
import { StructuredData } from '@/components/structured-data'
import { createReviewSchema } from '@/lib/metadata/structured-data'

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Parent Name",
      rating: 5,
      review: "Excellent tutoring service, my child improved significantly.",
      date: "2024-01-15"
    },
    // ... more testimonials
  ]

  const reviewSchema = createReviewSchema(testimonials)

  return (
    <>
      <StructuredData data={reviewSchema} />
      <main>
        {/* Testimonials content */}
      </main>
    </>
  )
}
```

**Blog Posts**: `src/app/(app)/blog/[slug]/page.tsx`
```typescript
import { StructuredData } from '@/components/structured-data'
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/metadata/structured-data'

export default function BlogPost({ params }: { params: { slug: string } }) {
  // Get blog post data
  const post = getBlogPost(params.slug)

  const articleSchema = createArticleSchema({
    title: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    authorName: post.author.name,
    slug: params.slug
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://myprivatetutoronline.com" },
    { name: "Blog", url: "https://myprivatetutoronline.com/blog" },
    { name: post.title, url: `https://myprivatetutoronline.com/blog/${params.slug}` }
  ])

  return (
    <>
      <StructuredData data={[articleSchema, breadcrumbSchema]} />
      <main>
        {/* Blog post content */}
      </main>
    </>
  )
}
```

**Contact Page**: `src/app/(app)/contact/page.tsx`
```typescript
import { StructuredData } from '@/components/structured-data'
import { createContactSchema } from '@/lib/metadata/structured-data'

export default function ContactPage() {
  const contactSchema = createContactSchema()

  return (
    <>
      <StructuredData data={contactSchema} />
      <main>
        {/* Contact form and details */}
      </main>
    </>
  )
}
```

## Implementation Steps

### Step 1: Create Utilities (2 hours)
1. Implement `structured-data.ts` with schema functions
2. Create reusable `StructuredData` component
3. Test schema validity with Google's Rich Results Test
4. Document schema patterns

### Step 2: Implement Organization Schema (30 minutes)
1. Add to About page
2. Test with structured data testing tool
3. Verify organization details are correct

### Step 3: Implement FAQ Schema (45 minutes)
1. Add to FAQ pages
2. Ensure FAQ data structure matches schema
3. Test for FAQ rich snippets

### Step 4: Implement Review Schema (45 minutes)
1. Add to testimonials page
2. Calculate aggregate ratings correctly
3. Test for review stars in search results

### Step 5: Implement Article Schema (1 hour)
1. Add to blog posts
2. Ensure proper author and publisher information
3. Test for article rich snippets

### Step 6: Add Breadcrumb Schema (30 minutes)
1. Implement across all major pages
2. Ensure proper hierarchical structure
3. Test breadcrumb appearance in search

## Expected Benefits

### SEO Improvements
- **Rich Snippets**: Enhanced SERP appearance with stars, FAQs, article info
- **Knowledge Panel**: Better chance of organization appearing in knowledge panels
- **Click-through Rate**: Improved CTR from enhanced search results
- **Search Visibility**: Better understanding by search engines

### Schema Coverage
| Page Type | Schema Type | Rich Snippet Potential |
|-----------|-------------|----------------------|
| About | Organization | Knowledge panel |
| FAQ | FAQ | FAQ accordion in SERP |
| Testimonials | Review + AggregateRating | Star ratings |
| Blog | Article | Article snippets |
| Contact | ContactPoint | Contact info |
| Services | Service | Service details |
| All pages | Breadcrumb | Breadcrumb navigation |

## Validation Tools

### Schema Testing
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Google Search Console**: Monitor rich snippets in performance

### Testing Checklist
- [ ] Schema validates without errors
- [ ] Required properties are included
- [ ] Contact information is accurate
- [ ] Reviews include proper ratings
- [ ] Article metadata is complete
- [ ] Breadcrumbs show proper hierarchy
- [ ] No duplicate schemas on same page

## Monitoring Strategy

### Search Console
- Monitor rich snippet impressions
- Track click-through rate improvements
- Check for structured data errors

### Performance Metrics
- Measure organic traffic increase
- Track featured snippet appearances
- Monitor knowledge panel appearances

## Related Issues

- Builds on [Metadata Duplication](./metadata-duplication.md) solution
- Coordinates with [Nested Layout Structure](./nested-layout-structure.md) for proper schema placement
- Benefits from [Redundant Layouts](./redundant-layouts.md) cleanup for cleaner implementation

---

**Issue Severity**: High - Significant SEO opportunity
**Estimated Effort**: 6 hours
**Dependencies**: Metadata utility functions from critical issues
**Next Steps**: See [Layout Optimization Roadmap](../layout-optimization-roadmap.md)