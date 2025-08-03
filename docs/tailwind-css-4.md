# Tailwind CSS 4 Documentation

## Overview
This documentation contains official Tailwind CSS 4 patterns and best practices for the My Private Tutor Online project. All code examples are verified against official Tailwind CSS documentation.

## Table of Contents
1. [Installation and Setup](#installation-and-setup)
2. [New v4 Features](#new-v4-features)
3. [Utility Classes](#utility-classes)
4. [Responsive Design](#responsive-design)
5. [Dark Mode](#dark-mode)
6. [Custom Utilities](#custom-utilities)
7. [Component Patterns](#component-patterns)

---

## Installation and Setup

### Install Tailwind CSS v4
```bash
# Install the new CLI package
npm install @tailwindcss/cli

# Build CSS with the new CLI
npx @tailwindcss/cli -i input.css -o output.css
```

### Import Tailwind in CSS
```css
/* main.css */
@import "tailwindcss";
```

### CSS Variables Integration
```css
/* Access theme variables directly */
.custom-component {
  padding: var(--spacing-4);
  margin: var(--spacing-8);
  color: var(--color-slate-900);
}
```

## New v4 Features

### CSS Variables Syntax Update
```html
<!-- v3 syntax -->
<div class="bg-[--brand-color]">Content</div>

<!-- v4 syntax (required) -->
<div class="bg-(--brand-color)">Content</div>
```

### Dynamic Data Attributes
```html
<!-- Automatically recognizes boolean data attributes -->
<div data-current class="opacity-75 data-current:opacity-100">
  Current item
</div>

<!-- Works with any data attribute -->
<div data-loading="true" class="data-loading:animate-pulse">
  Loading content
</div>
```

### New @utility API
```css
/* Old v3 approach */
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}

/* New v4 approach */
@utility tab-4 {
  tab-size: 4;
}
```

## Utility Classes

### Layout and Spacing
```html
<!-- Flexbox utilities -->
<div class="flex items-center justify-between gap-4">
  <div class="flex-1">Main content</div>
  <div class="shrink-0">Sidebar</div>
</div>

<!-- Grid utilities -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="col-span-full">Full width header</div>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Container queries -->
<div class="@container">
  <div class="flex flex-col @8xl:flex-row">
    <div class="@8xl:w-1/2">Left column</div>
    <div class="@8xl:w-1/2">Right column</div>
  </div>
</div>
```

### Typography
```html
<!-- Font utilities -->
<h1 class="text-4xl font-bold text-slate-900 leading-tight">
  Premium Tutoring Services
</h1>

<p class="text-lg text-gray-600 leading-relaxed">
  Expert tutors from Oxford and Cambridge universities
</p>

<!-- Font families -->
<h2 class="font-serif text-2xl">Elegant heading</h2>
<p class="font-sans text-base">Body text</p>
<code class="font-mono text-sm">Code snippet</code>
```

### Colors and Backgrounds
```html
<!-- Brand colors for tutoring business -->
<div class="bg-slate-900 text-white">
  <h1 class="text-gold-500">My Private Tutor Online</h1>
</div>

<!-- Semantic colors -->
<div class="bg-green-50 border border-green-200 text-green-800">
  Session booked successfully
</div>

<div class="bg-red-50 border border-red-200 text-red-800">
  Please select a valid time slot
</div>

<!-- Gradient backgrounds -->
<div class="bg-gradient-to-r from-slate-900 to-slate-700">
  Premium gradient
</div>
```

## Responsive Design

### Breakpoint System
```html
<!-- Mobile-first responsive design -->
<div class="
  w-full 
  sm:w-1/2 
  md:w-1/3 
  lg:w-1/4 
  xl:w-1/5
">
  Responsive width
</div>

<!-- Container queries for component-based responsive design -->
<div class="@container">
  <div class="@sm:flex @md:justify-between @lg:items-center">
    <div class="@sm:flex-1">Content</div>
    <div class="@sm:ml-4">Actions</div>
  </div>
</div>
```

### Responsive Typography
```html
<h1 class="
  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  font-bold
  leading-tight sm:leading-normal
">
  Responsive Heading
</h1>

<p class="
  text-sm sm:text-base md:text-lg
  text-gray-600 sm:text-gray-700
">
  Responsive paragraph
</p>
```

## Dark Mode

### Dark Mode Implementation
```html
<!-- Enable dark mode with class strategy -->
<html class="dark">
  <body class="bg-white dark:bg-slate-900">
    <!-- Content with dark mode support -->
    <div class="
      bg-white dark:bg-slate-800
      text-gray-900 dark:text-white
      border border-gray-200 dark:border-gray-700
      shadow-lg dark:shadow-none
      outline outline-black/5 dark:outline-white/10
    ">
      <h2 class="text-xl font-semibold text-black dark:text-white">
        Tutor Profile
      </h2>
      <p class="text-gray-500 dark:text-gray-400">
        Available for mathematics tutoring
      </p>
    </div>
  </body>
</html>
```

### Complex Dark Mode Patterns
```html
<!-- Card with sophisticated dark mode styling -->
<div class="
  mx-auto max-w-sm 
  rounded-xl bg-white dark:bg-slate-800
  p-6 shadow-lg dark:shadow-none
  outline outline-black/5 dark:-outline-offset-1 dark:outline-white/10
">
  <div class="flex items-center gap-4">
    <img class="size-12 shrink-0 rounded-full" src="/tutor.jpg" alt="Tutor" />
    <div>
      <h3 class="text-xl font-medium text-black dark:text-white">
        Dr. Sarah Johnson
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Mathematics • Oxford Graduate
      </p>
    </div>
  </div>
</div>
```

## Custom Utilities

### Brand-Specific Utilities
```css
/* Define custom utilities for the tutoring business */
@utility tutor-card {
  @apply bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg;
  @apply border border-gray-200 dark:border-gray-700;
  @apply hover:shadow-xl transition-shadow duration-200;
}

@utility subject-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
  @apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
}

@utility premium-button {
  @apply bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold;
  @apply hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2;
  @apply transition-colors duration-200;
}
```

### Data Attribute Styling
```css
/* Style based on booking status */
@utility booking-status {
  @apply px-3 py-1 rounded-full text-sm font-medium;
  
  &[data-status="confirmed"] {
    @apply bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200;
  }
  
  &[data-status="pending"] {
    @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
  }
  
  &[data-status="cancelled"] {
    @apply bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200;
  }
}
```

## Component Patterns

### Tutor Card Component
```html
<div class="tutor-card group">
  <div class="flex items-start gap-4">
    <img 
      class="size-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700" 
      src="/tutors/sarah.jpg" 
      alt="Dr. Sarah Johnson"
    />
    <div class="flex-1 min-w-0">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
        Dr. Sarah Johnson
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Mathematics • Oxford Graduate • 8 years experience
      </p>
      <div class="flex items-center gap-2 mt-2">
        <div class="flex items-center">
          <span class="text-yellow-400">★★★★★</span>
          <span class="ml-1 text-sm text-gray-600 dark:text-gray-300">4.9</span>
        </div>
        <span class="text-gray-300 dark:text-gray-600">•</span>
        <span class="text-sm text-gray-600 dark:text-gray-300">127 reviews</span>
      </div>
    </div>
    <div class="text-right">
      <p class="text-lg font-semibold text-gray-900 dark:text-white">
        £45/hour
      </p>
      <button class="mt-2 premium-button text-sm">
        Book Session
      </button>
    </div>
  </div>
  
  <div class="mt-4 flex flex-wrap gap-2">
    <span class="subject-badge">GCSE Maths</span>
    <span class="subject-badge">A-Level Maths</span>
    <span class="subject-badge">University Prep</span>
  </div>
</div>
```

### Booking Form Component
```html
<form class="space-y-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Select Subject
    </label>
    <select class="
      w-full px-3 py-2 
      border border-gray-300 dark:border-gray-600
      rounded-lg shadow-sm
      bg-white dark:bg-slate-700
      text-gray-900 dark:text-white
      focus:ring-2 focus:ring-slate-500 focus:border-slate-500
    ">
      <option>Mathematics</option>
      <option>English</option>
      <option>Science</option>
    </select>
  </div>
  
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Preferred Date
    </label>
    <input 
      type="date"
      class="
        w-full px-3 py-2
        border border-gray-300 dark:border-gray-600
        rounded-lg shadow-sm
        bg-white dark:bg-slate-700
        text-gray-900 dark:text-white
        focus:ring-2 focus:ring-slate-500 focus:border-slate-500
      "
    />
  </div>
  
  <button type="submit" class="w-full premium-button">
    Book Tutoring Session
  </button>
</form>
```

### Status Indicators
```html
<!-- Session status with data attributes -->
<div class="booking-status" data-status="confirmed">
  Confirmed
</div>

<div class="booking-status" data-status="pending">
  Pending
</div>

<div class="booking-status" data-status="cancelled">
  Cancelled
</div>

<!-- Loading states -->
<button class="premium-button" data-loading="true">
  <span class="data-loading:hidden">Book Session</span>
  <span class="hidden data-loading:inline-flex items-center">
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Booking...
  </span>
</button>
```

## Accessibility

### Screen Reader Support
```html
<!-- Hidden content for screen readers -->
<button class="premium-button">
  <svg class="size-5" viewBox="0 0 24 24">
    <!-- Icon path -->
  </svg>
  <span class="sr-only">Book tutoring session</span>
</button>

<!-- Descriptive labels -->
<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
  <span>Tutor Rating</span>
  <span class="sr-only">(out of 5 stars)</span>
</label>
```

### Focus Management
```html
<button class="
  premium-button
  focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600
">
  Accessible Button
</button>
```

## Performance Optimization

### Utility Class Organization
```html
<!-- Group related utilities for better readability -->
<div class="
  /* Layout */
  flex items-center justify-between gap-4
  /* Sizing */
  w-full max-w-4xl mx-auto
  /* Appearance */
  bg-white dark:bg-slate-800
  border border-gray-200 dark:border-gray-700
  rounded-xl shadow-lg
  /* Spacing */
  p-6 mb-6
  /* Responsive */
  sm:p-8 md:p-12
">
  Content
</div>
```

---

*Documentation based on Tailwind CSS 4 official documentation*
*Last updated: 2025*