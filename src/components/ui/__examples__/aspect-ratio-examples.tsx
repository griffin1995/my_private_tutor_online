/**
 * AspectRatio Component Usage Examples
 * 
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio implementation patterns for video content
 * USAGE DEMONSTRATIONS: 16:9 video optimization, error handling, accessibility features
 * BRITISH STANDARDS: Royal client quality examples for premium tutoring service
 */

'use client'

import React from 'react'
import { AspectRatio, VideoAspectRatio, SquareAspectRatio, PortraitAspectRatio } from '../aspect-ratio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { Badge } from '../badge'
import { AlertCircle, Play, Image as ImageIcon, Loader2 } from 'lucide-react'

/**
 * Basic 16:9 Video AspectRatio Example
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio with default 16:9 ratio for video content
 */
export const BasicVideoExample = () => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Basic Video Example</CardTitle>
      <CardDescription>Default 16:9 aspect ratio optimised for video content</CardDescription>
    </CardHeader>
    <CardContent>
      <AspectRatio>
        <video
          className="h-full w-full rounded-md object-cover"
          poster="/images/video-poster.jpg"
          controls
        >
          <source src="/videos/sample-lesson.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/captions/sample-lesson-en.vtt"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </CardContent>
  </Card>
)

/**
 * Video with Error Handling Example
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio with error fallback for content loading failures
 */
export const VideoWithErrorHandlingExample = () => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Error Handling Example</CardTitle>
      <CardDescription>Graceful fallback when video content fails to load</CardDescription>
    </CardHeader>
    <CardContent>
      <AspectRatio
        errorFallback={
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm font-medium">Video unavailable</p>
            <p className="text-xs">Please try again later</p>
          </div>
        }
        loadingPlaceholder={
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Loading video...</p>
          </div>
        }
      >
        <video
          className="h-full w-full rounded-md object-cover"
          poster="/images/video-poster.jpg"
          controls
        >
          <source src="/videos/might-fail.mp4" type="video/mp4" />
          Video content could not be loaded.
        </video>
      </AspectRatio>
    </CardContent>
  </Card>
)

/**
 * Image with AspectRatio Example
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio for image content with custom ratio
 */
export const ImageExample = () => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Custom Ratio Image</CardTitle>
      <CardDescription>4:3 aspect ratio for traditional photography</CardDescription>
    </CardHeader>
    <CardContent>
      <AspectRatio
        ratio={4/3}
        errorFallback={
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <p className="text-sm">Image not available</p>
          </div>
        }
      >
        <img
          src="/images/tutor-profile.jpg"
          alt="Professional tutor in learning environment"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </CardContent>
  </Card>
)

/**
 * Predefined Variants Examples
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio variants for common use cases
 */
export const VariantsExample = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Video Aspect Ratio - 16:9 */}
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm">VideoAspectRatio</CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">16:9</Badge>
      </CardHeader>
      <CardContent>
        <VideoAspectRatio>
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Play className="h-12 w-12" />
          </div>
        </VideoAspectRatio>
      </CardContent>
    </Card>

    {/* Square Aspect Ratio - 1:1 */}
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm">SquareAspectRatio</CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">1:1</Badge>
      </CardHeader>
      <CardContent>
        <SquareAspectRatio>
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-teal-600 text-white">
            <ImageIcon className="h-8 w-8" />
          </div>
        </SquareAspectRatio>
      </CardContent>
    </Card>

    {/* Portrait Aspect Ratio - 4:5 */}
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm">PortraitAspectRatio</CardTitle>
        <Badge variant="secondary" className="w-fit text-xs">4:5</Badge>
      </CardHeader>
      <CardContent>
        <PortraitAspectRatio>
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-pink-600 text-white">
            <ImageIcon className="h-8 w-8" />
          </div>
        </PortraitAspectRatio>
      </CardContent>
    </Card>
  </div>
)

/**
 * Advanced Video Player Example
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio for complex video player implementations
 */
export const AdvancedVideoPlayerExample = () => (
  <Card className="w-full max-w-2xl">
    <CardHeader>
      <CardTitle>Advanced Video Player</CardTitle>
      <CardDescription>
        Professional video player with accessibility features and error handling
      </CardDescription>
    </CardHeader>
    <CardContent>
      <AspectRatio
        className="bg-black rounded-lg overflow-hidden"
        errorFallback={
          <div className="flex flex-col items-center justify-center space-y-4 text-white">
            <AlertCircle className="h-12 w-12 text-red-400" />
            <div className="text-center">
              <p className="font-semibold">Unable to load video</p>
              <p className="text-sm text-gray-300 mt-1">
                Please check your connection and try again
              </p>
            </div>
          </div>
        }
        loadingPlaceholder={
          <div className="flex flex-col items-center justify-center space-y-4 text-white">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
              <Play className="absolute inset-0 h-6 w-6 m-auto text-white" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Loading video...</p>
              <p className="text-sm text-gray-300 mt-1">
                Preparing high-quality content
              </p>
            </div>
          </div>
        }
      >
        <video
          className="h-full w-full"
          poster="/images/lesson-poster.jpg"
          controls
          preload="metadata"
          crossOrigin="anonymous"
        >
          <source src="/videos/masterclass-intro.mp4" type="video/mp4" />
          <source src="/videos/masterclass-intro.webm" type="video/webm" />
          <track
            kind="captions"
            src="/captions/masterclass-intro-en.vtt"
            srcLang="en"
            label="English"
            default
          />
          <track
            kind="descriptions"
            src="/captions/masterclass-intro-desc-en.vtt"
            srcLang="en"
            label="English Descriptions"
          />
          <p>
            Your browser does not support HTML video. 
            <a href="/videos/masterclass-intro.mp4" download>
              Download the video file
            </a> instead.
          </p>
        </video>
      </AspectRatio>
    </CardContent>
  </Card>
)

/**
 * Responsive Gallery Example
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio for responsive image galleries
 */
export const ResponsiveGalleryExample = () => {
  const galleryItems = [
    { id: 1, src: "/images/classroom-1.jpg", alt: "Modern classroom setting" },
    { id: 2, src: "/images/classroom-2.jpg", alt: "One-on-one tutoring session" },
    { id: 3, src: "/images/classroom-3.jpg", alt: "Online learning setup" },
    { id: 4, src: "/images/classroom-4.jpg", alt: "Group study session" },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Responsive Gallery</CardTitle>
        <CardDescription>
          Consistent aspect ratios across different screen sizes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <AspectRatio
              key={item.id}
              className="group cursor-pointer transition-transform hover:scale-105"
              errorFallback={
                <div className="flex items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8" />
                </div>
              }
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full rounded-md object-cover transition-opacity group-hover:opacity-80"
              />
            </AspectRatio>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Complete Examples Component
 * Demonstrates all AspectRatio component features in a single showcase
 */
export const AspectRatioExamples = () => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">AspectRatio Component Examples</h2>
      <p className="text-muted-foreground">
        Comprehensive examples demonstrating 16:9 video optimization, error handling, 
        and accessibility features for the My Private Tutor Online project.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <BasicVideoExample />
      <VideoWithErrorHandlingExample />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ImageExample />
    </div>

    <VariantsExample />

    <AdvancedVideoPlayerExample />

    <ResponsiveGalleryExample />
  </div>
)