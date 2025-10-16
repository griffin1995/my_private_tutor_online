# TestimonialsHero Component

## Overview

The `TestimonialsHero` component is an enhanced, modular hero section
specifically designed for testimonials pages in the My Private Tutor Online
application. This component was extracted from the monolithic testimonials page
to provide better reusability, maintainability, and enhanced features.

## Features

### Core Functionality

- **Flexible Background Options**: Supports gradient, image, or video
  backgrounds
- **Multiple Size Variants**: Compact, standard, or full-screen hero layouts
- **Elite Credentials Display**: Showcases premium endorsements and achievements
- **Sophisticated Animations**: Framer Motion-powered staggered reveals with
  professional timing
- **CMS Integration**: Full content management system support
- **Accessibility First**: WCAG 2.1 AA compliance with proper ARIA labels

### Technical Implementation

- **Context7 MCP Compliance**: All implementations follow official documentation
  patterns
- **TypeScript Ready**: Comprehensive interface definitions for type safety
- **Performance Optimised**: Viewport-triggered animations for optimal
  performance
- **Responsive Design**: Mobile-first approach with breakpoint optimisation
- **British English**: Consistent terminology throughout

## Usage

### Basic Implementation

```tsx
import { TestimonialsHero } from '@/components/testimonials/testimonials-hero';
import { getTestimonialsHero } from '@/lib/cms/cms-content';

export default function TestimonialsPage() {
	const heroContent = getTestimonialsHero();

	return (
		<TestimonialsHero
			heroContent={heroContent}
			backgroundVariant='gradient'
			size='full'
			showCredentials={true}
		/>
	);
}
```

### Advanced Configuration

```tsx
<TestimonialsHero
	heroContent={heroContent}
	backgroundVariant='gradient'
	size='full'
	animationDelay={0.2}
	showCredentials={true}
	customCredentials={[
		{ icon: 'shield', text: 'Elite Certification Holder' },
		{ icon: 'award', text: 'Educational Excellence Award 2025' },
	]}
	className='custom-hero-styles'
/>
```

## Props Interface

```typescript
interface TestimonialsHeroProps {
	heroContent?: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
	};
	backgroundVariant?: 'gradient' | 'image' | 'video';
	size?: 'compact' | 'standard' | 'full';
	animationDelay?: number;
	className?: string;
	showCredentials?: boolean;
	customCredentials?: Array<{
		icon: 'shield' | 'award' | 'star';
		text: string;
	}>;
}
```

### Prop Descriptions

| Prop                | Type    | Default    | Description                                              |
| ------------------- | ------- | ---------- | -------------------------------------------------------- |
| `heroContent`       | Object  | undefined  | CMS content object with title, subtitle, and description |
| `backgroundVariant` | String  | 'gradient' | Background treatment: gradient, image, or video          |
| `size`              | String  | 'full'     | Hero section size: compact, standard, or full            |
| `animationDelay`    | Number  | 0          | Delay in seconds before animations begin                 |
| `className`         | String  | ''         | Additional CSS classes for customisation                 |
| `showCredentials`   | Boolean | true       | Whether to display elite credentials section             |
| `customCredentials` | Array   | undefined  | Custom credential items to override defaults             |

## Animation System

The component uses a sophisticated three-tier animation system:

### 1. Container Animation

- **Purpose**: Coordinates overall hero reveal
- **Pattern**: Staggered children with 0.15s intervals
- **Performance**: Optimised for viewport entry

### 2. Individual Item Animation

- **Purpose**: Controls title, subtitle, and description reveals
- **Pattern**: Sequential 0.6s duration animations
- **Easing**: Professional easeOut curves

### 3. Credential Animations

- **Purpose**: Premium micro-interactions for trust indicators
- **Pattern**: Scale and position transforms on hover
- **Accessibility**: Respects reduced motion preferences

## CMS Integration

The component integrates with the enhanced CMS system:

```typescript
// Enhanced CMS function returns additional configuration
const heroContent = getTestimonialsHero();
// Returns:
// {
//   title: string,
//   subtitle: string,
//   description: string,
//   backgroundVariant: 'gradient',
//   size: 'full',
//   showCredentials: true,
//   customCredentials: Array<CredentialItem>
// }
```

## Accessibility Features

- **ARIA Labels**: Proper section labelling
- **Semantic HTML**: Section element with banner role
- **Keyboard Navigation**: Full keyboard accessibility
- **Motion Sensitivity**: Respects user motion preferences
- **Screen Readers**: Comprehensive screen reader support

## Performance Optimisations

### Animation Performance

- **Viewport Triggers**: Animations only trigger when in view
- **GPU Acceleration**: Transform-based animations
- **Reduced Motion**: Automatic fallbacks for accessibility

### Bundle Optimisation

- **Tree Shaking**: Only imports used Framer Motion features
- **Code Splitting**: Prepared for lazy loading
- **TypeScript**: Compile-time optimisations

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Progressive Enhancement**: Graceful fallbacks for older browsers
- **Mobile Support**: Full iOS and Android compatibility

## Development Guidelines

### Adding New Features

1. Follow Context7 MCP documentation patterns
2. Include proper TypeScript interfaces
3. Add comprehensive source attribution comments
4. Test across all size variants
5. Verify accessibility compliance

### Animation Guidelines

1. Use official Framer Motion patterns only
2. Include viewport optimisations
3. Respect reduced motion preferences
4. Test on low-performance devices

## Elite Client Standards

This component meets premium service standards:

- **Visual Excellence**: Professional animations and typography
- **Brand Consistency**: Proper elite endorsement display
- **Performance**: Sub-3s load times maintained
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile Excellence**: Touch-friendly interactions

## Context7 MCP Sources

All implementations reference official documentation:

- **React Patterns**: `/reactjs/react.dev` - Component interfaces and props
- **Framer Motion**: `/grx7/framer-motion` - Animation variants and performance
- **TypeScript**: Official patterns for interface design

## Integration Notes

### Testimonials Page Update

The main testimonials page (`/src/app/testimonials/page.tsx`) has been updated
to use this component, replacing the inline hero implementation with:

```tsx
<TestimonialsHero
	heroContent={heroContent}
	backgroundVariant='gradient'
	size='full'
	showCredentials={true}
	animationDelay={0.1}
/>
```

### CMS Enhancements

The `getTestimonialsHero()` function has been enhanced to support additional
configuration options while maintaining backward compatibility.

## Future Enhancements

Prepared for Phase 2-4 implementations:

- **A/B Testing**: Multiple hero variants support ready
- **Video Backgrounds**: Infrastructure prepared for video hero backgrounds
- **Advanced Analytics**: Event tracking hooks prepared
- **Content Personalisation**: Dynamic content system ready
