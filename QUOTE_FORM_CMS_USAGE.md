# Quote Form CMS Integration Usage

This document demonstrates how to use the new quote form CMS integration following the project's Context7 MCP and CMS standards.

## Available CMS Functions

```typescript
// CONTEXT7 SOURCE: /microsoft/typescript - Interface implementation patterns
// Import the CMS functions
import {
  getQuoteFormContent,
  getQuoteFormHero,
  getQuoteFormConfig,
  getQuoteFormMessages,
  getQuoteFormContact,
  getSubjectOptions,
  getEducationLevelOptions,
  getHowDidYouHearOptions,
  getFormFieldOptions
} from '@/lib/cms/cms-content'

// Get the complete quote form content
const quoteFormData = getQuoteFormContent()

// Get specific sections
const hero = getQuoteFormHero()
const formConfig = getQuoteFormConfig()
const messages = getQuoteFormMessages()
const contact = getQuoteFormContact()

// Get form field options
const subjects = getSubjectOptions()
const educationLevels = getEducationLevelOptions()
const hearAboutOptions = getHowDidYouHearOptions()

// Get specific field options by ID
const customOptions = getFormFieldOptions('anyFieldId')
```

## Content Structure

### Hero Section
```typescript
{
  title: "Request Your Personalised Quote",
  subtitle: "Begin Your Child's Academic Excellence Journey", 
  description: "Complete our comprehensive form..."
}
```

### Form Configuration
```typescript
{
  title: "Tell Us About Your Requirements",
  description: "Please provide detailed information...",
  sections: [
    {
      title: "Contact Information",
      description: "Your contact details for our response",
      fields: [...]
    },
    // ... more sections
  ],
  submitButton: {
    text: "Request Personalised Quote",
    loadingText: "Submitting Your Request..."
  }
}
```

### Field Types Available
- `text` - Standard text input
- `email` - Email input with validation
- `tel` - Telephone input with UK validation
- `select` - Dropdown with predefined options
- `textarea` - Multi-line text input

### Validation
Each field includes:
- `required: boolean`
- `validation.message: string`
- `validation.pattern?: string` (for regex validation)

### Select Field Options
Pre-configured options for:
- **Subjects**: 24 options including Mathematics, Sciences, Languages, Oxbridge Prep
- **Education Levels**: 8 levels from Primary KS1 to University
- **How Did You Hear**: 10 referral sources including Tatler, School Guide UK

## Usage in Components

```tsx
// CMS DATA SOURCE: Using getQuoteFormHero for quote form hero section
const QuoteFormHero = () => {
  const hero = getQuoteFormHero()
  
  return (
    <section>
      <h1>{hero.title}</h1>
      <h2>{hero.subtitle}</h2>
      <p>{hero.description}</p>
    </section>
  )
}

// CMS DATA SOURCE: Using getSubjectOptions for subject dropdown
const SubjectSelect = () => {
  const subjects = getSubjectOptions()
  
  return (
    <select>
      {subjects.map(subject => (
        <option key={subject.value} value={subject.value}>
          {subject.label}
        </option>
      ))}
    </select>
  )
}
```

## British English Standards
All content follows British English conventions:
- "Personalised" not "Personalized"
- "Colour" not "Color" 
- "Centre" not "Center"
- UK telephone validation patterns
- UK postcode format

## Context7 MCP Compliance
- All interfaces sourced from `/microsoft/typescript` documentation
- Structured data patterns following official TypeScript interface design
- Zero hardcoded content - all managed through CMS
- Proper source comments with Context7 references

## File Locations
- **CMS Functions**: `/src/lib/cms/cms-content.ts`
- **Content Data**: `/src/content/quote-form.json`
- **TypeScript Interfaces**: Defined in cms-content.ts