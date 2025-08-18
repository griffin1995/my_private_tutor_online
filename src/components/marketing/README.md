# Marketing Components

This directory contains specialized marketing components for My Private Tutor Online.

## Components

### MasterclassCard
**File:** `/src/components/marketing/masterclass-card.tsx`

A specialized card component designed specifically for masterclass content with perfect alignment and consistency.

#### Features
- **Perfect Alignment**: All elements align consistently across cards regardless of content differences
- **Variant Support**: Three variants (free, premium, culture) with distinct styling
- **Flexible Content**: Handles all masterclass data types (topics, learning objectives, includes, etc.)
- **Reserved Spacing**: Uses fixed-height containers for elements to maintain alignment
- **Responsive Design**: Mobile-first responsive layout

#### Props Interface
```typescript
interface MasterclassCardProps {
  masterclass: {
    id: string;
    title: string;
    subtitle?: string;
    price: string;
    duration: string;
    venue?: string;
    description: string;
    content?: string;
    topics?: string[];
    learning?: string[];
    includes?: string[];
    targetAge?: string;
    questions?: string;
    instructor?: string;
    note?: string;
    summary?: string;
    purpose?: string;
    audience?: string;
    isFree: boolean;
  }
  variant: 'free' | 'premium' | 'culture';
  featured?: boolean;
  onCTAClick?: () => void;
  className?: string;
}
```

#### Usage Example
```tsx
import { MasterclassCard } from '@/components/marketing/masterclass-card'

<MasterclassCard
  masterclass={masterclassData}
  variant="premium"
  featured={true}
  onCTAClick={() => handlePurchase()}
/>
```

#### Alignment Strategy
- **Badge Area**: Fixed height (40px) for consistent positioning
- **Title**: Minimum height (64px) to accommodate multi-line titles
- **Subtitle/Venue**: Reserved space (28px each) even when empty
- **Content**: Flexible height with proper flex-grow for buttons at bottom
- **Buttons**: Always aligned at card bottom using `mt-auto`

#### Variants
- **free**: Emerald color scheme for free masterclasses
- **premium**: Slate color scheme for paid masterclasses  
- **culture**: Amber color scheme for cultural content

### PremiumServiceCard
**File:** `/src/components/marketing/premium-service-card.tsx`

General-purpose premium service card for various service offerings.

#### Key Differences from MasterclassCard
- **MasterclassCard**: Specialized for masterclass data with specific fields
- **PremiumServiceCard**: General-purpose for any service with features array

## Implementation Notes

All marketing components follow:
- **Context7 MCP Documentation**: All patterns documented with official sources
- **Perfect Alignment**: Consistent spacing and positioning across all cards
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Optimized rendering with proper prop interfaces
- **Responsive**: Mobile-first design with proper breakpoints

## Context7 Sources
- React component patterns from `/reactjs/react.dev`
- Radix UI components from `/radix-ui/primitives`
- Tailwind CSS utilities from `/tailwindlabs/tailwindcss`
- TypeScript interfaces from `/microsoft/typescript`