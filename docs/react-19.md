# React 19 Documentation

## Overview
This documentation contains official React 19 patterns and best practices for the My Private Tutor Online project. All code examples are verified against official React documentation.

## Table of Contents
1. [Server Components](#server-components)
2. [Client Components](#client-components)
3. [Hooks](#hooks)
4. [Performance Optimization](#performance-optimization)
5. [Form Handling](#form-handling)
6. [Custom Hooks](#custom-hooks)

---

## Server Components

### Async Server Components
```typescript
// Server Components can be async and fetch data during render
async function TutorProfile({ tutorId }: { tutorId: string }) {
  // Fetch data directly - no useEffect needed
  const tutor = await db.tutors.get(tutorId)
  
  return (
    <div>
      <h1>{tutor.name}</h1>
      <TutorDetails tutor={tutor} />
    </div>
  )
}

async function TutorDetails({ tutor }: { tutor: Tutor }) {
  // Nested data fetching - automatically optimized
  const subjects = await db.subjects.getByTutorId(tutor.id)
  
  return (
    <div>
      <p>{tutor.bio}</p>
      <SubjectsList subjects={subjects} />
    </div>
  )
}
```

### Server Functions
```typescript
// Define server functions within Server Components
async function TutorBookingForm() {
  async function bookTutorSession(formData: FormData) {
    'use server'
    
    const sessionData = {
      tutorId: formData.get('tutorId'),
      date: formData.get('date'),
      subject: formData.get('subject')
    }
    
    await db.sessions.create(sessionData)
    revalidatePath('/bookings')
  }
  
  return (
    <form action={bookTutorSession}>
      {/* Form fields */}
    </form>
  )
}
```

## Client Components

### Client Component with use Hook
```typescript
'use client'
import { use } from 'react'

function TutorReviews({ reviewsPromise }: { reviewsPromise: Promise<Review[]> }) {
  // use() hook resumes promises from server
  const reviews = use(reviewsPromise)
  
  return (
    <div>
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
```

### Interactive Client Component
```typescript
'use client'
import { useState } from 'react'

export default function SubjectFilter() {
  const [selectedSubject, setSelectedSubject] = useState('')
  
  return (
    <select 
      value={selectedSubject} 
      onChange={(e) => setSelectedSubject(e.target.value)}
    >
      <option value="">All Subjects</option>
      <option value="maths">Mathematics</option>
      <option value="english">English</option>
    </select>
  )
}
```

## Hooks

### useActionState for Form Handling
```typescript
'use client'
import { useActionState } from 'react'
import { updateProfile } from './actions'

function ProfileForm({ userId }: { userId: string }) {
  const [formState, formAction] = useActionState(updateProfile, {})
  
  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="name" />
      
      {formState?.success && (
        <div className="success">Profile updated successfully!</div>
      )}
      
      {formState?.error && (
        <div className="error">Error: {formState.error}</div>
      )}
      
      <button type="submit">Update Profile</button>
    </form>
  )
}
```

### useOptimistic for Instant UI Updates
```typescript
'use client'
import { useOptimistic } from 'react'

function TutorRating({ tutorId, currentRating }: { tutorId: string; currentRating: number }) {
  const [optimisticRating, setOptimisticRating] = useOptimistic(currentRating)
  
  const submitRating = async (formData: FormData) => {
    const newRating = parseInt(formData.get('rating') as string)
    setOptimisticRating(newRating)
    
    const updatedRating = await updateTutorRating(tutorId, newRating)
    // Automatically reverts if update fails
  }
  
  return (
    <form action={submitRating}>
      <p>Current Rating: {optimisticRating}</p>
      <input type="number" name="rating" min="1" max="5" />
      <button type="submit">Rate Tutor</button>
    </form>
  )
}
```

### useId for Unique Identifiers
```typescript
'use client'
import { useId } from 'react'

function BookingForm() {
  const subjectId = useId()
  const dateId = useId()
  
  return (
    <form>
      <label htmlFor={subjectId}>Subject:</label>
      <input id={subjectId} name="subject" />
      
      <label htmlFor={dateId}>Date:</label>
      <input id={dateId} type="date" name="date" />
    </form>
  )
}
```

### useTransition for Non-Blocking Updates
```typescript
'use client'
import { useState, useTransition } from 'react'

function TutorSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value) // Urgent update
    
    startTransition(() => {
      // Non-urgent update
      searchTutors(value).then(setResults)
    })
  }
  
  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending && <p>Searching...</p>}
      <TutorResults results={results} />
    </>
  )
}
```

## Performance Optimization

### useMemo for Expensive Calculations
```typescript
import { useMemo } from 'react'

function TutorAnalytics({ sessions }: { sessions: Session[] }) {
  const statistics = useMemo(() => {
    // Expensive calculation
    return calculateSessionStatistics(sessions)
  }, [sessions])
  
  return <StatisticsDisplay stats={statistics} />
}
```

### useCallback for Stable Function References
```typescript
import { useCallback } from 'react'

function BookingCalendar({ tutorId }: { tutorId: string }) {
  const handleDateSelect = useCallback((date: Date) => {
    bookSession(tutorId, date)
  }, [tutorId])
  
  return <Calendar onDateSelect={handleDateSelect} />
}
```

### React.memo for Component Memoization
```typescript
import { memo } from 'react'

const TutorCard = memo(function TutorCard({ tutor }: { tutor: Tutor }) {
  console.log('TutorCard rendered at', new Date().toISOString())
  
  return (
    <div className="tutor-card">
      <h3>{tutor.name}</h3>
      <p>{tutor.subjects.join(', ')}</p>
    </div>
  )
})
```

## Form Handling

### Form with Server Action
```typescript
export default function ContactForm() {
  async function submitContact(formData: FormData) {
    'use server'
    
    const contact = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }
    
    await sendContactEmail(contact)
    redirect('/thank-you')
  }
  
  return (
    <form action={submitContact}>
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send Message</button>
    </form>
  )
}
```

## Custom Hooks

### useOnlineStatus Hook
```typescript
import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // Client value
    () => true // Server value (SSR)
  )
}

// Usage
function OnlineIndicator() {
  const isOnline = useOnlineStatus()
  return <div>{isOnline ? '✅ Online' : '❌ Offline'}</div>
}
```

### Custom Hook for Chat Connection
```typescript
import { useEffect } from 'react'
import { createConnection } from './chat'

export function useChatRoom({ serverUrl, roomId }: ChatRoomOptions) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    
    return () => {
      connection.disconnect()
    }
  }, [roomId, serverUrl])
}
```

## Best Practices

1. **Server Components by Default** - Components are Server Components unless marked with 'use client'
2. **Async Data Fetching** - Fetch data directly in Server Components without useEffect
3. **Use Suspense** - Wrap async components in Suspense boundaries for loading states
4. **Optimize Re-renders** - Use useMemo, useCallback, and React.memo appropriately
5. **Server Functions** - Mark server-only code with 'use server' directive
6. **Progressive Enhancement** - Forms work without JavaScript using server actions

## Rules of React

1. **Components and Hooks must be pure** - Only perform calculations, no side effects
2. **React calls Components and Hooks** - Don't call them directly as functions
3. **Rules of Hooks** - Only call Hooks at the top level and from React functions

---

*Documentation based on React 19 official documentation*
*Last updated: 2025*