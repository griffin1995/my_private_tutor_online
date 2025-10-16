# OptimizedVideoPlayer Component

## Overview

The `OptimizedVideoPlayer` is a comprehensive React component that resolves
architectural conflicts between `VideoThumbnailTopCard` and `HeroVideoDialog` by
providing a unified ReactPlayer-based solution with advanced performance
optimization, accessibility compliance, and TypeScript support.

## Key Features

- **Unified ReactPlayer Integration**: Single component for all video use cases
- **Performance Optimized**: Lazy loading, code splitting, and intersection
  observer
- **Accessibility Compliant**: WCAG 2.1 AA with keyboard navigation and screen
  reader support
- **Three Variants**: Hero (modal), thumbnail-card (inline), testimonial
  (inline)
- **React 19 Compatible**: Proper hooks usage and modern patterns
- **Comprehensive Error Handling**: Graceful fallbacks and retry mechanisms
- **TypeScript Support**: Full type definitions with comprehensive interfaces

## Architecture Resolution

### Previous Issues

- **Dual Integration Conflict**: VideoThumbnailTopCard used both HeroVideoDialog
  and custom handlers
- **Bundle Size**: Multiple video libraries loaded unnecessarily
- **State Management**: Inconsistent state handling across components
- **Accessibility**: Limited keyboard navigation and screen reader support
- **Error Handling**: Basic error states without recovery options

### Solutions Implemented

- **Single ReactPlayer Instance**: Eliminates conflicts and reduces bundle size
- **Lazy Loading**: Code splitting with dynamic imports reduces initial bundle
- **Comprehensive State Management**: Unified state structure with proper
  TypeScript typing
- **Enhanced Accessibility**: Full keyboard navigation, focus management, ARIA
  labels
- **Advanced Error Handling**: Recoverable errors with retry functionality

## Installation

The component requires these dependencies (already installed in the project):

```bash
npm install react-player react-intersection-observer framer-motion next
```

## Basic Usage

### Hero Variant (Modal)

```tsx
import { OptimizedVideoPlayer } from '@/components/video/OptimizedVideoPlayer';

export function VideoHero() {
	return (
		<OptimizedVideoPlayer
			videoId='dQw4w9WgXcQ'
			title='Rick Astley - Never Gonna Give You Up'
			variant='hero'
			thumbnail='/images/rick-astley-thumbnail.jpg'
			aspectRatio='16:9'
		/>
	);
}
```

### Thumbnail Card Variant (Inline)

```tsx
import { OptimizedVideoPlayer } from '@/components/video/OptimizedVideoPlayer';

export function VideoCard() {
	return (
		<OptimizedVideoPlayer
			videoId='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
			title='Educational Video'
			variant='thumbnail-card'
			thumbnail='/images/education-thumbnail.jpg'
			controls={true}
			autoPlay={false}
			onReady={() => console.log('Video ready')}
			onPlay={() => console.log('Video started')}
		/>
	);
}
```

### Testimonial Variant (Inline)

```tsx
import { OptimizedVideoPlayer } from '@/components/video/OptimizedVideoPlayer';

export function TestimonialVideo() {
	return (
		<OptimizedVideoPlayer
			videoId='dQw4w9WgXcQ'
			title='Client Testimonial - Sarah Johnson'
			variant='testimonial'
			aspectRatio='4:3'
			className='max-w-md mx-auto'
		/>
	);
}
```

## Advanced Configuration

### YouTube Configuration

```tsx
<OptimizedVideoPlayer
	videoId='dQw4w9WgXcQ'
	title='Advanced YouTube Video'
	config={{
		youtube: {
			playerVars: {
				showinfo: 0,
				modestbranding: 1,
				rel: 0,
				controls: 1,
				autoplay: 0,
				start: 30,
				end: 180,
			},
		},
	}}
/>
```

### Performance Optimization

```tsx
<OptimizedVideoPlayer
	videoId='dQw4w9WgXcQ'
	title='Optimized Video'
	enableLazyLoading={true}
	preloadMargin='300px 0px'
	preload='metadata'
	quality='hd720'
/>
```

### Accessibility Features

```tsx
<OptimizedVideoPlayer
	videoId='dQw4w9WgXcQ'
	title='Accessible Video'
	ariaLabel='Educational content about React development'
	ariaDescription='A comprehensive guide to building React applications'
	keyboardControls={true}
	captionsEnabled={true}
/>
```

## Props Interface

```typescript
interface OptimizedVideoPlayerProps {
	// Core properties
	videoId: string; // YouTube ID or full URL
	title: string; // Video title for accessibility
	thumbnail?: string; // Custom thumbnail URL
	variant?: 'hero' | 'thumbnail-card' | 'testimonial';
	className?: string; // Additional CSS classes

	// Playback controls
	autoPlay?: boolean; // Auto-start playback
	muted?: boolean; // Start muted (recommended for autoplay)
	controls?: boolean; // Show player controls
	loop?: boolean; // Loop playback

	// Performance options
	enableLazyLoading?: boolean; // Enable intersection observer
	preloadMargin?: string; // Intersection observer margin
	preload?: 'none' | 'metadata' | 'auto';

	// Dimensions
	width?: string | number; // Player width
	height?: string | number; // Player height
	aspectRatio?: string; // CSS aspect ratio

	// Callbacks
	onReady?: () => void; // Player ready callback
	onPlay?: () => void; // Play started callback
	onPause?: () => void; // Pause callback
	onProgress?: (state) => void; // Progress callback
	onError?: (error) => void; // Error callback

	// Accessibility
	ariaLabel?: string; // ARIA label
	ariaDescription?: string; // ARIA description
	keyboardControls?: boolean; // Enable keyboard shortcuts

	// Advanced configuration
	config?: ReactPlayerConfig; // ReactPlayer configuration
	light?: boolean | ReactElement; // Custom light mode
}
```

## State Management

The component uses a comprehensive state structure:

```typescript
interface VideoPlayerState {
	isPlaying: boolean;
	isReady: boolean;
	hasError: boolean;
	isLoading: boolean;
	isModalOpen: boolean; // For hero variant
	isMuted: boolean;
	volume: number;
	played: number; // Progress (0-1)
	loaded: number; // Buffered (0-1)
	duration: number; // Total seconds
	playbackRate: number;
	pip: boolean; // Picture-in-picture
	seeking: boolean;
	fullscreen: boolean;
}
```

## Error Handling

The component provides comprehensive error handling:

```typescript
interface VideoPlayerError {
	type: 'network' | 'decode' | 'src_not_supported' | 'permission' | 'unknown';
	message: string;
	code?: number;
	recoverable: boolean; // If true, shows retry button
	timestamp: number;
	videoId: string;
}
```

### Error Recovery

```tsx
<OptimizedVideoPlayer
	videoId='invalid-video-id'
	title='Video with Error'
	onError={(error) => {
		console.log('Video error:', error);
		// Custom error handling
	}}
/>
```

## Performance Considerations

### Bundle Size Optimization

1. **Lazy Loading**: ReactPlayer is loaded only when needed
2. **Code Splitting**: Dynamic imports reduce initial bundle size
3. **Intersection Observer**: Videos load only when approaching viewport

### Memory Management

1. **Cleanup**: Automatic event listener cleanup
2. **State Reset**: Modal close resets video state
3. **Error Recovery**: Failed loads don't prevent retries

## Accessibility Features

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Enter/Space to play, Escape to close modal
- **Focus Management**: Proper focus trapping in modals
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Visual Indicators**: Focus rings and state indicators
- **Error Announcements**: Screen reader error notifications

### Keyboard Shortcuts

- `Enter` or `Space`: Play/open video
- `Escape`: Close modal (hero variant)
- Arrow keys: Future enhancement for seeking

## Integration Examples

### Replacing VideoThumbnailTopCard

**Before:**

```tsx
<VideoThumbnailTopCard
	title='My Video'
	videoUrl='https://youtube.com/watch?v=123'
	thumbnailUrl='/thumb.jpg'
	useHeroVideoDialog={true}
/>
```

**After:**

```tsx
<OptimizedVideoPlayer
	videoId='123'
	title='My Video'
	variant='thumbnail-card'
	thumbnail='/thumb.jpg'
/>
```

### Replacing HeroVideoDialog

**Before:**

```tsx
<HeroVideoDialog
	videoSrc='https://youtube.com/watch?v=123'
	thumbnailSrc='/thumb.jpg'
	animationStyle='from-center'
/>
```

**After:**

```tsx
<OptimizedVideoPlayer
	videoId='123'
	title='Hero Video'
	variant='hero'
	thumbnail='/thumb.jpg'
/>
```

## Browser Support

- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **Fallbacks**: Graceful degradation for older browsers
- **Mobile Support**: Touch-friendly controls and responsive design

## Troubleshooting

### Common Issues

1. **Video Won't Load**: Check video ID and network connectivity
2. **Autoplay Blocked**: Browser policies require muted autoplay
3. **Modal Not Opening**: Ensure hero variant is selected
4. **Performance Issues**: Enable lazy loading and check bundle size

### Debug Mode

```tsx
<OptimizedVideoPlayer
	videoId='dQw4w9WgXcQ'
	title='Debug Video'
	onError={console.error}
	onReady={() => console.log('Ready')}
	onPlay={() => console.log('Playing')}
/>
```

## Migration Guide

See the component documentation for step-by-step migration from existing video
components to OptimizedVideoPlayer.

---

## Context7 MCP Documentation Sources

All implementation patterns are based on official Context7 MCP documentation:

- `/cookpete/react-player` - ReactPlayer lazy loading and configuration
- `/thebuilder/react-intersection-observer` - Performance optimization
- `/reactjs/react.dev` - React 19 patterns and hooks
- `/typescript/handbook` - TypeScript interfaces and patterns
- `/w3c/wcag` - Accessibility compliance guidelines

## Royal Client Quality

This component meets the premium standards required for My Private Tutor
Online's royal clientele with enterprise-grade implementation and comprehensive
error handling.
