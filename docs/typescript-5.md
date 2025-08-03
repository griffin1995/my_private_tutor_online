# TypeScript 5 Documentation

## Overview
This documentation contains official TypeScript 5 patterns and best practices for the My Private Tutor Online project. All code examples are verified against official TypeScript documentation.

## Table of Contents
1. [Strict Mode Configuration](#strict-mode-configuration)
2. [Interfaces and Types](#interfaces-and-types)
3. [Generics](#generics)
4. [Type Guards and Narrowing](#type-guards-and-narrowing)
5. [Utility Types](#utility-types)
6. [Best Practices](#best-practices)

---

## Strict Mode Configuration

### Enable All Strict Checks
```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## Interfaces and Types

### Interface Definition
```typescript
// Basic interface for tutor data
interface Tutor {
  id: string
  name: string
  email: string
  subjects: Subject[]
  rating: number
  availability: TimeSlot[]
}

// Interface with optional properties
interface Student {
  id: string
  name: string
  email: string
  phone?: string // Optional property
  parentEmail?: string | undefined // Explicit undefined with exactOptionalPropertyTypes
}

// Interface extension
interface PremiumTutor extends Tutor {
  specializations: string[]
  yearsOfExperience: number
  oxbridgeGraduate: boolean
}
```

### Type Aliases
```typescript
// Union types for session status
type SessionStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled'

// Intersection types
type TutorWithContact = Tutor & {
  contactNumber: string
  preferredContactMethod: 'email' | 'phone' | 'whatsapp'
}

// Conditional types
type IsArray<T> = T extends any[] ? true : false
type ArrayElement<T> = T extends (infer U)[] ? U : never
```

### Index Signatures
```typescript
// Index signature with strict checking
interface SubjectGrades {
  [subject: string]: number | undefined // noUncheckedIndexedAccess requires undefined
}

// Mixed interface with index signature
interface TutorProfile {
  name: string
  email: string
  [key: string]: string | number | boolean // Additional properties
}
```

## Generics

### Generic Interfaces
```typescript
// Generic response wrapper
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// Constrained generic
interface Repository<T extends { id: string }> {
  find(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  create(item: Omit<T, 'id'>): Promise<T>
  update(id: string, item: Partial<T>): Promise<T>
  delete(id: string): Promise<boolean>
}

// Multiple type parameters
interface Mapper<TInput, TOutput> {
  map(input: TInput): TOutput
  mapArray(inputs: TInput[]): TOutput[]
}
```

### Generic Functions
```typescript
// Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

// Generic async function
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json() as Promise<T>
}

// Generic factory function
function createTutor<T extends Tutor>(data: T): T {
  return {
    ...data,
    createdAt: new Date().toISOString()
  } as T
}
```

### Generic Classes
```typescript
// Generic class for caching
class Cache<T> {
  private cache = new Map<string, T>()
  
  set(key: string, value: T): void {
    this.cache.set(key, value)
  }
  
  get(key: string): T | undefined {
    return this.cache.get(key)
  }
  
  has(key: string): boolean {
    return this.cache.has(key)
  }
}

// Usage
const tutorCache = new Cache<Tutor>()
const sessionCache = new Cache<Session>()
```

## Type Guards and Narrowing

### Type Predicates
```typescript
// User-defined type guard
function isTutor(user: Tutor | Student): user is Tutor {
  return 'subjects' in user && 'rating' in user
}

// Type guard for arrays
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string')
}

// Usage with narrowing
function processUser(user: Tutor | Student) {
  if (isTutor(user)) {
    // TypeScript knows user is Tutor here
    console.log(`Tutor ${user.name} teaches ${user.subjects.join(', ')}`)
  } else {
    // TypeScript knows user is Student here
    console.log(`Student ${user.name} is enrolled`)
  }
}
```

### Discriminated Unions
```typescript
// Action types with discriminated unions
type BookingAction =
  | { type: 'CREATE'; payload: { tutorId: string; studentId: string; date: Date } }
  | { type: 'CANCEL'; payload: { bookingId: string; reason: string } }
  | { type: 'RESCHEDULE'; payload: { bookingId: string; newDate: Date } }

function handleBookingAction(action: BookingAction) {
  switch (action.type) {
    case 'CREATE':
      // action.payload has tutorId, studentId, date
      createBooking(action.payload)
      break
    case 'CANCEL':
      // action.payload has bookingId, reason
      cancelBooking(action.payload)
      break
    case 'RESCHEDULE':
      // action.payload has bookingId, newDate
      rescheduleBooking(action.payload)
      break
  }
}
```

## Utility Types

### Built-in Utility Types
```typescript
// Partial - makes all properties optional
type PartialTutor = Partial<Tutor>

// Required - makes all properties required
type RequiredStudent = Required<Student>

// Readonly - makes all properties readonly
type ReadonlyTutor = Readonly<Tutor>

// Pick - selects specific properties
type TutorSummary = Pick<Tutor, 'id' | 'name' | 'rating'>

// Omit - excludes specific properties
type TutorWithoutId = Omit<Tutor, 'id'>

// Record - creates object type with keys and values
type SubjectPricing = Record<string, number>

// NonNullable - removes null and undefined
type DefinitelyString = NonNullable<string | null | undefined>
```

### Custom Utility Types
```typescript
// Deep partial type
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Deep readonly type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Nullable type
type Nullable<T> = T | null

// Async return type
type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : never
```

## Best Practices

### Strict Null Checks
```typescript
// With strictNullChecks enabled
function getTutorName(tutor: Tutor | null): string {
  // Must check for null
  if (tutor === null) {
    return 'Unknown'
  }
  return tutor.name
}

// Optional chaining with null checks
function getStudentPhone(student: Student): string | undefined {
  return student.phone?.trim()
}
```

### Exact Optional Properties
```typescript
// With exactOptionalPropertyTypes enabled
interface BookingForm {
  tutorId: string
  studentId: string
  date: Date
  notes?: string // Cannot be assigned undefined directly
  duration?: number | undefined // Can be assigned undefined
}

// Correct usage
const booking1: BookingForm = { tutorId: '1', studentId: '2', date: new Date() }
const booking2: BookingForm = { tutorId: '1', studentId: '2', date: new Date(), notes: 'Math help' }
const booking3: BookingForm = { tutorId: '1', studentId: '2', date: new Date(), duration: undefined }

// Error with exactOptionalPropertyTypes
// const booking4: BookingForm = { tutorId: '1', studentId: '2', date: new Date(), notes: undefined }
```

### No Unchecked Indexed Access
```typescript
// With noUncheckedIndexedAccess enabled
const subjects: string[] = ['Math', 'English', 'Science']
const firstSubject = subjects[0] // Type is string | undefined

// Must check for undefined
if (firstSubject !== undefined) {
  console.log(firstSubject.toUpperCase())
}

// Object index access
const grades: Record<string, number> = { math: 95, english: 88 }
const mathGrade = grades['math'] // Type is number | undefined

// Safe access pattern
function getGrade(subject: string): number {
  const grade = grades[subject]
  if (grade === undefined) {
    throw new Error(`No grade found for ${subject}`)
  }
  return grade
}
```

### Type Assertions
```typescript
// Avoid type assertions when possible
// Bad
const tutor = {} as Tutor

// Good - use type guards or proper initialization
const tutor: Tutor = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  subjects: [],
  rating: 5,
  availability: []
}

// When type assertions are necessary
const element = document.getElementById('tutor-form') as HTMLFormElement | null
if (element) {
  element.addEventListener('submit', handleSubmit)
}
```

---

*Documentation based on TypeScript 5 official documentation*
*Last updated: 2025*