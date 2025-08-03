# Next.js App Router Documentation

## Overview
This documentation contains official Next.js App Router patterns and best practices for the My Private Tutor Online project. All code examples are verified against official Next.js documentation.

## Table of Contents
1. [Metadata Configuration](#metadata-configuration)
2. [Layouts and Pages](#layouts-and-pages)
3. [Data Fetching](#data-fetching)
4. [Route Handlers](#route-handlers)
5. [Performance Optimization](#performance-optimization)
6. [File Conventions](#file-conventions)

---

## Metadata Configuration

### Static Metadata Export
```typescript
// app/layout.tsx or app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Private Tutor Online',
  description: 'Premium private tutoring from Oxford and Cambridge graduates',
  metadataBase: new URL('https://myprivatetutoronline.com'),
  openGraph: {
    title: 'My Private Tutor Online',
    description: 'Premium private tutoring from Oxford and Cambridge graduates',
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Private Tutor Online',
    description: 'Premium private tutoring from Oxford and Cambridge graduates',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}
```

### Dynamic Metadata Generation
```typescript
// app/tutors/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tutor = await getTutor(params.id)
  
  return {
    title: `${tutor.name} - My Private Tutor Online`,
    description: tutor.bio,
  }
}
```

## Layouts and Pages

### Root Layout (Required)
```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Nested Layouts
```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-container">
      <aside>Dashboard Navigation</aside>
      <main>{children}</main>
    </div>
  )
}
```

## Data Fetching

### Static Data (Default Caching)
```typescript
// Cached by default (equivalent to getStaticProps)
async function getTutors() {
  const res = await fetch('https://api.example.com/tutors', {
    cache: 'force-cache' // Optional, this is default
  })
  return res.json()
}

export default async function TutorsPage() {
  const tutors = await getTutors()
  return <TutorsList tutors={tutors} />
}
```

### Dynamic Data (No Caching)
```typescript
// Refetch on every request (equivalent to getServerSideProps)
async function getUserSession() {
  const res = await fetch('https://api.example.com/session', {
    cache: 'no-store'
  })
  return res.json()
}
```

### Time-based Revalidation
```typescript
// Revalidate every 60 seconds
async function getTestimonials() {
  const res = await fetch('https://api.example.com/testimonials', {
    next: { revalidate: 60 }
  })
  return res.json()
}
```

## Route Handlers

### GET Route Handler
```typescript
// app/api/tutors/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subject = searchParams.get('subject')
  
  const tutors = await getTutorsBySubject(subject)
  
  return Response.json({ tutors })
}
```

### Cached Route Handler
```typescript
// app/api/subjects/route.ts
export const dynamic = 'force-static' // Cache this endpoint

export async function GET() {
  const subjects = await getAvailableSubjects()
  return Response.json({ subjects })
}
```

## Performance Optimization

### Dynamic Imports for Client Components
```typescript
import dynamic from 'next/dynamic'

const BookingModal = dynamic(() => import('./BookingModal'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Only load on client
})
```

### Streaming with Suspense
```typescript
import { Suspense } from 'react'

export default function TutorProfile() {
  return (
    <>
      <TutorHeader />
      <Suspense fallback={<p>Loading availability...</p>}>
        <TutorAvailability />
      </Suspense>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <TutorReviews />
      </Suspense>
    </>
  )
}
```

### Static Path Generation
```typescript
// app/subjects/[slug]/page.tsx
export async function generateStaticParams() {
  const subjects = await getSubjects()
  
  return subjects.map((subject) => ({
    slug: subject.slug,
  }))
}
```

## File Conventions

### Special Files in App Directory
```
app/
  layout.tsx        # Shared UI for segment and children
  page.tsx          # Unique UI for route
  loading.tsx       # Loading UI
  error.tsx         # Error UI
  not-found.tsx     # 404 UI
  route.ts          # API endpoint
  template.tsx      # Re-rendered layout
  default.tsx       # Parallel route fallback
```

### Metadata Files
```
app/
  favicon.ico       # Browser favicon
  icon.tsx          # Dynamic app icon generation
  apple-icon.tsx    # Dynamic Apple icon generation
  opengraph-image.tsx    # Dynamic OG image
  twitter-image.tsx      # Dynamic Twitter image
  manifest.ts            # Dynamic web manifest
```

### Route Groups
```
app/
  (marketing)/      # Grouping without affecting URL
    about/page.tsx  # /about
    contact/page.tsx # /contact
  (shop)/
    products/page.tsx # /products
```

## Best Practices

1. **Use Server Components by Default** - Only add 'use client' when needed
2. **Colocate Components** - Keep components close to where they're used
3. **Leverage Caching** - Use appropriate fetch caching strategies
4. **Optimize Images** - Use next/image for automatic optimization
5. **Implement Loading States** - Use loading.tsx or Suspense boundaries
6. **Handle Errors Gracefully** - Implement error.tsx boundaries

---

*Documentation based on Next.js 15+ official documentation*
*Last updated: 2025*