# Alternating Row Component System Implementation Plan

## Executive Summary

This document serves as the definitive reference for implementing a modern alternating row component system for My Private Tutor Online. The system will provide a flexible, accessible, and performance-optimised solution for image-text layouts whilst maintaining royal client standards and British English conventions.

## Project Context & Standards

### Technical Stack
- **Next.js**: 15.3.4 App Router
- **React**: 19 with TypeScript 5.8+
- **Styling**: Tailwind CSS 3.4.1 with shadcn/ui components
- **Quality Standards**: Royal client-worthy implementations, WCAG 2025 compliance
- **Language**: British English mandatory throughout

### Existing Architecture Analysis

Based on codebase examination, the project demonstrates:
- **Proven Patterns**: `/components/sections/how-it-works/zig-zag-section.tsx` shows existing alternating layout implementation
- **Component Architecture**: Modular sections with TypeScript interfaces and Next.js Image optimisation
- **Styling System**: Clean CSS architecture with @layer base semantic defaults (lines 593-758 in globals.css)
- **Performance**: Optimised image loading with blur placeholders and responsive sizing

## Component Requirements Specification

### Core Features
1. **Alternating Layout**: 50/50 image-text split with configurable positioning
2. **Content Flexibility**: Optional numbered bullet points, icons, and bullet lists
3. **Responsive Design**: Mobile-first approach with container queries
4. **Accessibility**: WCAG 2025 compliance with semantic HTML and ARIA labels
5. **Performance**: React.memo optimisation and Next.js Image integration
6. **CMS Integration**: Future-ready data structure for Payload CMS

### Technical Requirements
- **TypeScript Interfaces**: Strong typing for all props and data structures
- **Composition Pattern**: Flexible component composition for varied layouts
- **Container Queries**: Modern responsive design approach
- **shadcn/ui Integration**: Card, Badge, Button component compatibility
- **Image Optimisation**: Next.js Image with blur placeholders and responsive sizing

## Implementation Plan

### Phase 1: Foundation Components (Week 1)
**Duration**: 5 days
**Priority**: Critical

#### 1.1 Core Component Architecture
- **File**: `/src/components/alternating-rows/AlternatingRowSection.tsx`
- **Purpose**: Main container component with layout orchestration
- **Features**:
  - TypeScript interface definitions
  - Container query responsive system
  - Semantic HTML structure with ARIA labels

#### 1.2 Content Components
- **File**: `/src/components/alternating-rows/AlternatingRowContent.tsx`
- **Purpose**: Text content rendering with flexible features
- **Features**:
  - Optional numbered titles with icons
  - Bullet point list support
  - Rich text formatting capabilities

#### 1.3 Image Components
- **File**: `/src/components/alternating-rows/AlternatingRowImage.tsx`
- **Purpose**: Optimised image display with responsive handling
- **Features**:
  - Next.js Image integration with blur placeholders
  - Responsive sizing with container queries
  - Aspect ratio preservation

### Phase 2: Layout System (Week 2)
**Duration**: 5 days
**Priority**: High

#### 2.1 Grid Layout Engine
- **File**: `/src/components/alternating-rows/AlternatingRowGrid.tsx`
- **Purpose**: CSS Grid-based responsive layout system
- **Features**:
  - Container query breakpoints
  - Automatic alternating positioning
  - Equal height column management

#### 2.2 Responsive Behaviour
- **Implementation**: Container queries with CSS Grid
- **Breakpoints**: Mobile (320px), Tablet (768px), Desktop (1024px+)
- **Strategy**: Mobile-first with progressive enhancement

#### 2.3 Content Positioning
- **Logic**: Automatic left/right alternation
- **Override**: Manual position control when required
- **Accessibility**: Logical reading order maintained

### Phase 3: Enhancement Features (Week 3)
**Duration**: 7 days
**Priority**: Medium

#### 3.1 Icon Integration System
- **File**: `/src/components/alternating-rows/AlternatingRowIcons.tsx`
- **Purpose**: Flexible icon display in titles and content
- **Features**:
  - shadcn/ui icon compatibility
  - SVG optimisation
  - Accessible icon labelling

#### 3.2 Numbered Bullet Points
- **Implementation**: CSS counter system with custom styling
- **Design**: Brand-consistent numbering with gold accent colours
- **Accessibility**: Proper list semantics with screen reader support

#### 3.3 Advanced Content Types
- **Bullet Lists**: Styled unordered lists with brand spacing
- **Rich Text**: Bold, italic, and link formatting
- **Pull Quotes**: Magazine-style floating quotes (inspired by existing zig-zag section)

### Phase 4: Integration & Testing (Week 4)
**Duration**: 7 days
**Priority**: Critical

#### 4.1 shadcn/ui Integration
- **Components**: Card, Badge, Button integration within content areas
- **Styling**: Consistent design token usage from tailwind.config.ts
- **Compatibility**: Ensure seamless component interoperability

#### 4.2 Performance Optimisation
- **React.memo**: Component memoisation for rendering efficiency
- **Image Loading**: Progressive loading with Next.js Image optimisation
- **Bundle Analysis**: Size impact assessment and optimisation

#### 4.3 Accessibility Compliance
- **WCAG 2025**: AA compliance validation
- **Screen Readers**: ARIA label and role implementation
- **Keyboard Navigation**: Focus management and tab order
- **Colour Contrast**: Brand colour accessibility verification

### Phase 5: CMS Preparation (Week 5)
**Duration**: 5 days
**Priority**: Medium

#### 5.1 Data Structure Design
- **Schema**: TypeScript interfaces for CMS data
- **Content Types**: Image, text, icon, and layout configuration
- **Validation**: Data integrity and type safety

#### 5.2 Content Management Interface
- **File**: `/src/lib/cms/alternating-row-content.ts`
- **Purpose**: CMS data fetching and processing
- **Features**:
  - Synchronous content loading (following project CMS architecture)
  - Data transformation utilities
  - Content validation functions

## File Structure & Component Hierarchy

```
src/components/alternating-rows/
├── AlternatingRowSection.tsx          # Main container component
├── AlternatingRowGrid.tsx             # Layout system
├── AlternatingRowContent.tsx          # Text content renderer
├── AlternatingRowImage.tsx            # Image display component
├── AlternatingRowIcons.tsx            # Icon system
└── index.tsx                          # Public exports

src/lib/alternating-rows/
├── types.ts                           # TypeScript interfaces
├── utils.ts                           # Utility functions
└── constants.ts                       # Configuration constants

src/content/alternating-rows/
└── sample-content.json                # Example content structure

__tests__/alternating-rows/
├── AlternatingRowSection.test.tsx
├── AlternatingRowGrid.test.tsx
├── accessibility.test.tsx
└── performance.test.tsx
```

## TypeScript Interface Design

### Core Data Structure

```typescript
interface AlternatingRowData {
  id: string;
  title: string;
  content: string | RichTextContent;
  image: ImageData;
  position: 'left' | 'right' | 'auto';
  features: {
    numberedTitle?: number;
    titleIcon?: IconConfig;
    bulletPoints?: string[];
    pullQuote?: PullQuoteData;
  };
  styling: {
    backgroundColor?: string;
    textAlignment?: 'left' | 'center' | 'right';
    padding?: ResponsivePadding;
  };
}

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  priority?: boolean;
}

interface IconConfig {
  name: string;
  position: 'before' | 'after';
  size?: 'sm' | 'md' | 'lg';
  colour?: string;
}

interface PullQuoteData {
  text: string;
  position: 'left' | 'right';
  author?: string;
}

interface ResponsivePadding {
  mobile: string;
  tablet: string;
  desktop: string;
}
```

### Component Props

```typescript
interface AlternatingRowSectionProps {
  data: AlternatingRowData[];
  className?: string;
  containerMaxWidth?: 'container' | 'full' | 'none';
  spacing?: 'tight' | 'normal' | 'loose';
  'aria-label'?: string;
}

interface AlternatingRowContentProps {
  title: string;
  content: string | RichTextContent;
  features: AlternatingRowData['features'];
  textAlignment: 'left' | 'center' | 'right';
  className?: string;
}

interface AlternatingRowImageProps {
  image: ImageData;
  className?: string;
  aspectRatio?: 'square' | '16:9' | '4:3' | 'auto';
}
```

## Testing Strategy

### Unit Tests
**Framework**: Jest with React Testing Library
**Coverage Target**: 95%+ for all components

#### Test Categories
1. **Component Rendering**: Verify correct markup generation
2. **Props Handling**: Ensure all props are processed correctly
3. **Accessibility**: ARIA labels, roles, and keyboard navigation
4. **Responsive Behaviour**: Container query functionality
5. **Image Optimisation**: Next.js Image integration

### Integration Tests
**Framework**: Playwright for E2E testing

#### Test Scenarios
1. **Full Section Rendering**: Complete alternating row section display
2. **Content Interaction**: User interaction with buttons and links
3. **Responsive Layout**: Cross-device layout verification
4. **Performance**: Loading times and image optimisation
5. **Accessibility**: Screen reader and keyboard navigation

### Performance Tests
**Tools**: Lighthouse CI, Bundle Analyzer

#### Metrics
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size Impact**: < 50KB additional

## Integration Points with Existing Codebase

### CSS Architecture Integration
- **Follow @layer base patterns**: Leverage semantic HTML defaults from globals.css (lines 593-758)
- **Design Tokens**: Use Tailwind configuration from tailwind.config.ts
- **No Hardcoded Colours**: Utilise design system tokens exclusively

### Component Integration
- **shadcn/ui Components**: Card, Badge, Button integration within content areas
- **Existing Patterns**: Follow established patterns from `/components/sections/`
- **Image Optimisation**: Align with existing Next.js Image implementations

### Performance Integration
- **Build System**: Ensure compatibility with existing build optimisations
- **Code Splitting**: Implement lazy loading where appropriate
- **Bundle Analysis**: Monitor impact on existing bundle size

## Future Payload CMS Integration Plan

### Content Model Design
**Payload Collection**: `alternating-rows`

```typescript
const AlternatingRows: CollectionConfig = {
  slug: 'alternating-rows',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'position',
      type: 'select',
      options: ['left', 'right', 'auto'],
      defaultValue: 'auto',
    },
    {
      name: 'features',
      type: 'group',
      fields: [
        {
          name: 'numberedTitle',
          type: 'number',
        },
        {
          name: 'titleIcon',
          type: 'text',
        },
        {
          name: 'bulletPoints',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};
```

### Data Fetching Strategy
- **Synchronous Pattern**: Follow existing CMS architecture (no async patterns)
- **Content Transformation**: Process Payload rich text to component format
- **Image Processing**: Optimise uploaded images for web delivery
- **Caching Strategy**: Implement appropriate caching for content updates

## Timeline & Milestones

### Week 1: Foundation (Days 1-5)
- **Day 1-2**: Core component architecture and TypeScript interfaces
- **Day 3-4**: Basic image and content components
- **Day 5**: Initial testing setup and documentation

### Week 2: Layout System (Days 6-10)
- **Day 6-7**: CSS Grid responsive layout implementation
- **Day 8-9**: Container query integration and testing
- **Day 10**: Mobile-first responsive validation

### Week 3: Enhancement Features (Days 11-17)
- **Day 11-12**: Icon integration and numbered bullet points
- **Day 13-14**: Advanced content types and pull quotes
- **Day 15-16**: shadcn/ui component integration
- **Day 17**: Feature testing and refinement

### Week 4: Integration & Testing (Days 18-24)
- **Day 18-19**: Performance optimisation and React.memo implementation
- **Day 20-21**: WCAG 2025 accessibility compliance verification
- **Day 22-23**: Cross-browser testing and bug fixes
- **Day 24**: Integration testing with existing codebase

### Week 5: CMS Preparation (Days 25-29)
- **Day 25-26**: Data structure design for future CMS integration
- **Day 27-28**: Content management utilities and validation
- **Day 29**: Documentation completion and handover preparation

## Risk Assessment & Mitigation Strategies

### Technical Risks

#### High Risk: Browser Compatibility
- **Risk**: Container queries not supported in older browsers
- **Mitigation**: Provide CSS Grid fallbacks and progressive enhancement
- **Testing**: Comprehensive cross-browser testing strategy

#### Medium Risk: Performance Impact
- **Risk**: Component complexity affecting page load times
- **Mitigation**: React.memo implementation, code splitting, and bundle analysis
- **Monitoring**: Continuous performance monitoring with Lighthouse CI

#### Medium Risk: Accessibility Compliance
- **Risk**: Complex layouts causing screen reader issues
- **Mitigation**: Semantic HTML structure, comprehensive ARIA labelling
- **Validation**: Regular accessibility audits and user testing

### Project Risks

#### High Risk: Feature Creep
- **Risk**: Additional requirements emerging during development
- **Mitigation**: Clear scope definition and change control process
- **Management**: Regular stakeholder reviews and approval gates

#### Medium Risk: CMS Integration Complexity
- **Risk**: Payload CMS integration proving more complex than anticipated
- **Mitigation**: Modular design allowing for iterative integration
- **Preparation**: Comprehensive data structure planning and validation

#### Low Risk: Design System Conflicts
- **Risk**: New components conflicting with existing design system
- **Mitigation**: Close alignment with existing Tailwind configuration
- **Validation**: Design review process and visual regression testing

## Success Criteria & Validation Steps

### Functional Success Criteria

1. **Component Flexibility**: All specified layout configurations working correctly
2. **Responsive Design**: Seamless display across all target devices (320px to 4K)
3. **Performance Standards**: Meeting all Lighthouse performance thresholds
4. **Accessibility Compliance**: Full WCAG 2025 AA compliance verification
5. **Integration Success**: Smooth integration with existing codebase patterns

### Quality Metrics

1. **Test Coverage**: 95%+ unit test coverage across all components
2. **Performance**: < 1.5s First Contentful Paint, < 50KB bundle impact
3. **Accessibility**: 100% automated accessibility test passes
4. **Browser Support**: Functionality verified in Chrome, Firefox, Safari, Edge
5. **Mobile Performance**: Optimal performance on iOS and Android devices

### Business Success Criteria

1. **Royal Client Standards**: Premium quality implementation meeting brand expectations
2. **Development Velocity**: Reusable components reducing future development time
3. **Content Management**: Flexible system supporting varied content requirements
4. **Future Scalability**: Architecture supporting CMS integration and expansion
5. **Maintainability**: Clear documentation and code structure for team handover

## Documentation Requirements

### Technical Documentation
- **Component API Reference**: Complete TypeScript interface documentation
- **Usage Examples**: Comprehensive implementation examples
- **Integration Guide**: Step-by-step integration instructions
- **Performance Guide**: Optimisation recommendations and best practices

### User Documentation
- **Content Creation Guide**: Instructions for creating content with the system
- **Design Guidelines**: Visual consistency and brand alignment requirements
- **Accessibility Guidelines**: Content creation for accessibility compliance
- **CMS Integration Guide**: Future Payload CMS usage instructions

## Conclusion

This implementation plan provides a comprehensive roadmap for delivering a modern, accessible, and performance-optimised alternating row component system. The approach balances technical excellence with practical business requirements whilst maintaining the royal client standards expected for My Private Tutor Online.

The modular architecture ensures future flexibility, particularly for Payload CMS integration, whilst the emphasis on accessibility and performance guarantees a superior user experience across all devices and user capabilities.

Regular milestone reviews and risk mitigation strategies will ensure successful delivery within the specified timeline whilst maintaining the exceptional quality standards that define the My Private Tutor Online brand.