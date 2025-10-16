# CMSService - Unified Data Access Layer

## Overview

The CMSService provides a comprehensive, type-safe, and performance-optimized
data access layer for all CMS operations in My Private Tutor Online. Built
following Context7 MCP documentation patterns and Next.js 15+ best practices.

## Architecture

### Design Patterns

- **Singleton Pattern**: Single instance across the application
- **Service Layer**: Unified API for all content and image access
- **Caching Integration**: Built-in React cache() for performance
- **Error Boundaries**: Comprehensive validation and fallbacks
- **Type Safety**: Full TypeScript support with generics

### Key Features

- ✅ Unified API for content and image access
- ✅ Built-in caching with TTL and statistics
- ✅ Content validation and sanitization
- ✅ Performance monitoring and metrics
- ✅ Development tools and debugging
- ✅ Error handling with graceful fallbacks
- ✅ British English content formatting
- ✅ Responsive image optimization

## Quick Start

### Basic Usage

```typescript
import { cmsService } from '@/lib/cms';

// Get content with automatic caching
const header = cmsService.getSiteHeader();
const hero = cmsService.getHeroContent();
const testimonials = cmsService.getTestimonials();

// Get images with optimized assets
const logo = cmsService.getMainLogo();
const heroImage = cmsService.getHeroImage();
const institutionLogos = cmsService.getInstitutionLogos();
```

### Advanced Configuration

```typescript
import { createCMSService } from '@/lib/cms';

const customService = createCMSService({
	cache: {
		ttl: 10 * 60 * 1000, // 10 minutes
		maxEntries: 200,
		enableDebug: true,
	},
	validation: {
		enableValidation: true,
		throwOnValidationError: false,
	},
	development: {
		enableDebugLogging: true,
		logPerformanceMetrics: true,
	},
});
```

## API Reference

### Content Methods

#### Core Content

```typescript
// Site structure and navigation
getSiteHeader(): SiteHeader
getMainNavigation(): NavigationItem[]
getSiteBranding(): BrandingInfo
getFooterContent(): FooterContent

// Homepage sections
getHeroContent(): HeroContent
getTrustIndicators(): TrustIndicator[]
getTestimonials(): Testimonial[]
getServices(): readonly Service[]
getResultsStatistics(): Statistic[]
getCTAContent(): CTASection

// Contact and business information
getUnifiedContact(): UnifiedContactData
getContactDetails(): ContactDetails
getBusinessContent(): BusinessContent
getBusinessDetails(): BusinessDetails
getPricingInfo(): PricingInfo
```

#### Page-Specific Content

```typescript
// About page
getAboutContent(): AboutContent

// How It Works page
getHowItWorksContent(): HowItWorksContent

// FAQ page
getFAQContent(): FAQContent

// Testimonials page
getTestimonialsContent(): TestimonialsContent

// Quote form
getQuoteFormContent(): QuoteFormContent
getFormContent(): FormContent

// Quote sections
getQuotes(): QuoteContent
getFounderQuote(): FounderQuoteData
getRoyalTestimonial(): RoyalTestimonialData
```

### Image Methods

#### Logos and Branding

```typescript
getMainLogo(): ImageAsset
getMainLogoWhite(): ImageAsset // For transparent backgrounds
getFooterLogo(): ImageAsset
```

#### Institution and Credibility Assets

```typescript
getInstitutionLogos(): InstitutionLogosMap
getScrollingSchoolLogos(): SchoolLogosMap
getMediaImages(): MediaImagesMap
```

#### Content Images

```typescript
getHeroImage(): ImageAsset
getIntroVideo(): ImageAsset
getTeamImages(): TeamImagesMap
getTestimonialImages(): TestimonialImagesMap
getTutorImages(): TutorImagesMap
getStudentImages(): StudentImagesMap
```

#### Video and Marketing Assets

```typescript
getVideoContent(): VideoContentMap
getVideoPlaceholders(): VideoPlaceholdersMap
getBackgroundVideo(key: string): BackgroundVideoAsset
getBackgroundVideos(): BackgroundVideosMap
getMarketingAssets(): MarketingAssetsMap
```

#### Fallback Assets

```typescript
getFallbackImage(): ImageAsset
getAvatarPlaceholder(): ImageAsset
getCriticalImages(): readonly ImageAsset[]
```

### Utility Methods

#### Image Optimization

```typescript
generateResponsiveSizes(baseWidth: number): ResponsiveImageSizes
generateSrcSet(src: string, sizes: Record<string, number>): string
getOptimizedImageProps(image: ImageAsset, customSizes?: string): OptimizedProps
```

#### Content Processing

```typescript
formatBritishEnglish(text: string): string
getCopyrightText(): string
```

#### Validation

```typescript
validateContent<T>(content: T): ValidationResult<T>
validateContentStructure(): boolean
validateImageAccessibility(image: ImageAsset): boolean
```

### Cache Management

#### Cache Operations

```typescript
clearCache(): void
clearCacheEntry(key: string): boolean
getCacheStats(): CacheStats
getCacheDebugInfo(): CacheDebugInfo
```

#### Performance Monitoring

```typescript
getPerformanceMetrics(): readonly PerformanceMetrics[]
clearPerformanceMetrics(): void
```

### Development Tools

#### Configuration

```typescript
getConfig(): CMSServiceConfig
updateConfig(config: Partial<CMSServiceConfig>): void
setDebugLogging(enabled: boolean): void
```

## Type Definitions

### Core Interfaces

```typescript
interface CMSServiceConfig {
	readonly cache: CacheConfig;
	readonly validation: ValidationConfig;
	readonly development: DevelopmentConfig;
}

interface CacheConfig {
	readonly ttl: number; // Cache TTL in milliseconds
	readonly maxEntries: number; // Maximum cache entries
	readonly enableDebug: boolean; // Enable cache debugging
}

interface ValidationResult<T> {
	readonly isValid: boolean;
	readonly data: T;
	readonly errors: readonly string[];
	readonly warnings: readonly string[];
}

interface CacheStats {
	readonly hits: number;
	readonly misses: number;
	readonly size: number;
	readonly hitRate: number;
}

interface PerformanceMetrics {
	readonly functionName: string;
	readonly executionTime: number;
	readonly cacheHit: boolean;
	readonly timestamp: number;
}
```

### Content Type Examples

```typescript
interface SiteHeader {
	readonly siteName: string;
	readonly logo: string;
	readonly navigation: readonly NavigationItem[];
	readonly ctaButton?: CTAButtonData;
}

interface HeroContent {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly image: string;
	readonly imageAlt: string;
	readonly ctaButtons: readonly CTAButtonData[];
	readonly playButton?: PlayButtonConfig;
}

interface ImageAsset {
	readonly src: string;
	readonly alt: string;
	readonly width?: number;
	readonly height?: number;
	readonly title?: string;
	readonly loading?: 'lazy' | 'eager';
	readonly priority?: boolean;
	readonly sizes?: string;
	readonly quality?: number;
}
```

## Usage Examples

### Component Integration

```typescript
'use client'
import { cmsService } from '@/lib/cms'

export function Header() {
  const header = cmsService.getSiteHeader()
  const logo = cmsService.getMainLogo()

  return (
    <header>
      <img
        {...cmsService.getOptimizedImageProps(logo)}
        className="h-12 w-auto"
      />
      <nav>
        {header.navigation.map(item => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
```

### Server Component Usage

```typescript
import { cmsService } from '@/lib/cms'

export default function HomePage() {
  const hero = cmsService.getHeroContent()
  const testimonials = cmsService.getTestimonials()

  return (
    <main>
      <section>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
      </section>

      <section>
        {testimonials.map((testimonial, index) => (
          <blockquote key={index}>
            <p>{testimonial.quote}</p>
            <cite>{testimonial.author}, {testimonial.role}</cite>
          </blockquote>
        ))}
      </section>
    </main>
  )
}
```

### Error Handling

```typescript
import { cmsService } from '@/lib/cms'

export function SafeContentComponent() {
  try {
    const content = cmsService.getHeroContent()
    return <div>{content.title}</div>
  } catch (error) {
    console.error('Content loading failed:', error)
    return <div>Content unavailable</div>
  }
}
```

### Custom Validation

```typescript
import { cmsService } from '@/lib/cms'

export function ValidatedContent() {
  const content = cmsService.getHeroContent()
  const validation = cmsService.validateContent(content)

  if (!validation.isValid) {
    console.warn('Content validation failed:', validation.errors)
  }

  if (validation.warnings.length > 0) {
    console.info('Content warnings:', validation.warnings)
  }

  return <div>{validation.data.title}</div>
}
```

### Performance Monitoring

```typescript
import { cmsService } from '@/lib/cms'

// Monitor cache performance
export function CacheMonitor() {
  const stats = cmsService.getCacheStats()
  const metrics = cmsService.getPerformanceMetrics()

  return (
    <div>
      <h3>Cache Statistics</h3>
      <p>Hit Rate: {stats.hitRate}%</p>
      <p>Cache Size: {stats.size} entries</p>

      <h3>Performance Metrics</h3>
      {metrics.slice(-10).map((metric, index) => (
        <div key={index}>
          {metric.functionName}: {metric.executionTime.toFixed(2)}ms
          {metric.cacheHit ? ' (cached)' : ' (fresh)'}
        </div>
      ))}
    </div>
  )
}
```

## Migration Guide

### From Legacy Functions

**Before (Legacy)**

```typescript
import { getSiteHeader, getHeroContent, getMainLogo } from '@/lib/cms';

const header = getSiteHeader();
const hero = getHeroContent();
const logo = getMainLogo();
```

**After (New Service)**

```typescript
import { cmsService } from '@/lib/cms';

const header = cmsService.getSiteHeader();
const hero = cmsService.getHeroContent();
const logo = cmsService.getMainLogo();
```

### Benefits of Migration

- **Better Caching**: Automatic caching with statistics
- **Error Handling**: Built-in validation and fallbacks
- **Performance**: Monitoring and optimization tools
- **Type Safety**: Enhanced TypeScript support
- **Debugging**: Development tools and logging

## Best Practices

### Performance Optimization

1. **Use Cached Methods**: All service methods are automatically cached
2. **Monitor Performance**: Enable performance metrics in development
3. **Preload Critical Images**: Use `getCriticalImages()` for above-the-fold
   content
4. **Optimize Images**: Use `getOptimizedImageProps()` for responsive images

### Error Handling

1. **Enable Validation**: Use built-in content validation
2. **Handle Fallbacks**: Service provides automatic fallbacks
3. **Monitor Errors**: Check validation results for warnings
4. **Development Logging**: Enable debug logging for troubleshooting

### Development Workflow

1. **Use Service Instance**: Import `cmsService` for most use cases
2. **Custom Configuration**: Use `createCMSService()` for special requirements
3. **Monitor Cache**: Check cache statistics during development
4. **Validate Content**: Ensure content structure integrity

### Type Safety

1. **Use Typed Returns**: All methods return properly typed interfaces
2. **Leverage Generics**: Use generic validation methods for custom content
3. **Import Types**: Import types for component props and state
4. **Validate Interfaces**: Ensure content matches expected interfaces

## Troubleshooting

### Common Issues

**Content Not Loading**

```typescript
// Check content validation
const validation = cmsService.validateContent(content);
if (!validation.isValid) {
	console.error('Validation errors:', validation.errors);
}
```

**Cache Issues**

```typescript
// Clear cache if content appears stale
cmsService.clearCache();

// Check cache statistics
const stats = cmsService.getCacheStats();
console.log('Cache stats:', stats);
```

**Performance Problems**

```typescript
// Enable performance monitoring
cmsService.updateConfig({
	development: {
		enableDebugLogging: true,
		logPerformanceMetrics: true,
	},
});

// Check metrics
const metrics = cmsService.getPerformanceMetrics();
console.log(
	'Slow operations:',
	metrics.filter((m) => m.executionTime > 10),
);
```

**Type Errors**

- Ensure all imports use the service: `import { cmsService } from '@/lib/cms'`
- Check TypeScript configuration for proper type resolution
- Verify content JSON structure matches interface definitions

### Debug Mode

Enable comprehensive debugging:

```typescript
import { cmsService } from '@/lib/cms';

// Enable all debugging features
cmsService.updateConfig({
	cache: { enableDebug: true },
	development: {
		enableDebugLogging: true,
		logPerformanceMetrics: true,
	},
});

// Get detailed cache information
const debugInfo = cmsService.getCacheDebugInfo();
console.log('Cache debug info:', debugInfo);
```

## Contributing

When adding new content or images:

1. **Add to CMS Files**: Update `cms-content.ts` or `cms-images.ts`
2. **Update Service**: Add corresponding method to `CMSService`
3. **Add Types**: Include proper TypeScript interfaces
4. **Add Tests**: Include comprehensive test coverage
5. **Update Documentation**: Document new methods and types

## Support

For questions about the CMSService architecture or implementation:

1. Check this documentation for usage patterns
2. Review test files for implementation examples
3. Enable debug logging for troubleshooting
4. Check Context7 MCP documentation for patterns
