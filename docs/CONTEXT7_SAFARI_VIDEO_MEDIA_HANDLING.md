# Context7: Safari Video and Media Handling Issues (2025)

## Executive Summary

Safari continues to present unique challenges for video and media handling that can cause significant display corruption and functionality issues on websites. This comprehensive analysis covers 15 critical areas where Safari differs from other browsers, causing potential display problems, video loading failures, and user experience degradation.

**Critical Impact Areas:**
- Complete video loading failure
- Layout shifts causing display corruption
- Memory leaks leading to browser crashes
- Autoplay policy violations
- Custom video controls breaking
- Codec compatibility issues

---

## 1. Safari Autoplay Policies and Hero/Background Videos

### Current Status (2025)
Safari maintains strict autoplay policies to conserve bandwidth and improve user experience, particularly on mobile devices.

### Requirements for Autoplay Success

**Essential Attributes (All Required):**
```html
<video autoplay muted playsinline loop>
  <source src="video.mp4" type="video/mp4">
</video>
```

**Critical Rules:**
- `muted` attribute is **mandatory** - videos with sound will never autoplay
- `playsinline` attribute is **required** for iOS Safari
- `autoplay` alone is insufficient without `muted`
- Videos must be user-initiated if sound is required

### iOS-Specific Restrictions
- **Low Power Mode**: Completely prevents autoplay even with all correct attributes
- **Background Tab**: Autoplay may fail when page loads in background tab
- **First Visit**: Some iOS versions require user gesture on first page visit

### Solutions
```html
<!-- Correct Implementation -->
<video 
  autoplay 
  muted 
  playsinline 
  loop 
  preload="metadata"
  poster="thumbnail.jpg"
>
  <source src="hero-video.mp4" type="video/mp4">
</video>

<!-- Fallback for Failed Autoplay -->
<script>
document.addEventListener('touchstart', function() {
  const videos = document.querySelectorAll('video[autoplay]');
  videos.forEach(video => video.play());
}, { once: true });
</script>
```

---

## 2. Safari MP4 Codec Requirements vs Other Browsers

### Safari Codec Limitations
Safari **only supports H.264** video codec, while other browsers support multiple codecs (VP8, VP9, AV1).

### Critical Encoding Requirements

**Mandatory Specifications:**
- **Video Codec**: H.264 (AVC) only
- **Audio Codec**: AAC recommended
- **Container**: MP4
- **Profile**: Baseline or Main Profile (not High Profile for older devices)
- **Level**: 3.1 or lower for broad compatibility

### Encoding Issues That Cause Failures
- **Fast Start/Web Optimized**: NEVER use - causes complete playback failure on iOS
- **High Profile H.264**: May fail on older iOS devices
- **Non-standard frame rates**: Can cause playback issues
- **Excessive bitrates**: May cause buffering problems

### Browser Comparison
- **Chrome/Edge/Firefox**: Support H.264, VP8, VP9, AV1
- **Safari**: H.264 only
- **Impact**: Must use H.264 for Safari compatibility, missing out on newer codec efficiency

### Recommended Encoding Settings
```bash
# FFmpeg command for Safari-compatible encoding
ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 3.1 \
       -c:a aac -b:a 128k -movflags +faststart output.mp4
```

---

## 3. Safari iOS vs Desktop Video Handling Differences

### playsinline Attribute Critical Differences

**iOS Safari Requirements:**
- `playsinline` **mandatory** to prevent fullscreen takeover
- Without `playsinline`: Videos force full-screen mode
- IDL property: `playsInline` (camelCase in JavaScript)
- Content attribute: `playsinline` (lowercase in HTML)

**Desktop Safari:**
- `playsinline` ignored (videos naturally play inline)
- No fullscreen enforcement
- Standard video element behavior

### React Implementation
```jsx
// Correct React implementation
<video 
  autoPlay 
  muted 
  playsInline  // Note: camelCase in React
  loop 
/>
```

### iOS-Specific Behaviour
- **Poster Requirement**: iOS often requires `poster` attribute for thumbnail display
- **Controls Requirement**: iPad may require `controls` attribute for playback
- **User Gesture**: Some iOS versions need user interaction before any video playback

---

## 4. Safari Video Loading and Layout Shifts (CLS Issues)

### Cumulative Layout Shift Problems
Safari video loading can cause significant CLS (Core Web Vitals) issues, impacting SEO and user experience.

### Primary Causes
1. **Missing Dimensions**: Videos without `width` and `height` attributes
2. **Dynamic Size Calculation**: Videos that resize after metadata loads
3. **Poster Image Loading**: Poster images loading after video element renders
4. **Buffering States**: Video size changes during buffering

### CLS Prevention Solutions

**1. Always Specify Dimensions:**
```html
<video 
  width="800" 
  height="450" 
  style="aspect-ratio: 16/9;"
  poster="thumbnail.jpg"
>
  <source src="video.mp4" type="video/mp4">
</video>
```

**2. Use CSS Aspect Ratio:**
```css
.video-container {
  aspect-ratio: 16/9;
  width: 100%;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**3. Preload Metadata:**
```html
<video preload="metadata" poster="thumbnail.jpg">
```

### Safari-Specific Layout Issues
- **Background Tab Loading**: Videos may not calculate correct dimensions when loaded in background tabs
- **Dynamic Insertion**: Videos added via JavaScript may cause layout shifts
- **Orientation Changes**: iOS Safari may recalculate video dimensions on device rotation

---

## 5. Safari HLS vs MP4 Performance and Preferences

### Native HLS Support Advantages
Safari is the **only browser** with native HLS support through the HTML5 video element.

**Safari HLS Benefits:**
- Adaptive bitrate streaming
- Better bandwidth utilization
- Automatic quality adjustment
- Native performance optimization

### HLS vs MP4 Performance Comparison

**HLS Advantages:**
- Faster startup time (segmented loading)
- Lower bandwidth usage
- Automatic quality scaling
- Better mobile performance

**MP4 Advantages:**
- Universal browser support
- Simpler implementation
- Better for short videos
- WebGL compatibility

### Safari HLS Limitations
- **Manual Quality Selection**: Not possible with native Safari HLS
- **Short Video Bug**: Mobile Safari HLS fails with short looping videos
- **Metadata Access**: Limited compared to JavaScript players

### Implementation Recommendations

**For Most Cases (Recommended):**
```html
<!-- HLS for Safari, fallback for others -->
<video controls>
  <source src="stream.m3u8" type="application/vnd.apple.mpegurl">
  <source src="fallback.mp4" type="video/mp4">
</video>
```

**For Short Looping Videos:**
```html
<!-- Use MP4 due to Safari HLS bug -->
<video autoplay muted loop playsinline>
  <source src="short-loop.mp4" type="video/mp4">
</video>
```

---

## 6. Safari Video Security Policies and CSP Headers

### Critical CSP Bug (Safari 11-14)
Safari versions 11-14 have a **critical bug** where CSP headers block Safari's own default media controls.

### The Problem
Safari loads default video control icons as SVG data URIs, but doesn't exempt them from CSP policies, causing controls to disappear.

### CSP Requirements for Video Content

**Minimum CSP Directives:**
```
Content-Security-Policy: 
  media-src 'self' data: blob: https:;
  img-src 'self' data: blob: https:;
  connect-src 'self' https:;
```

### Version-Specific Solutions

**Safari 15+ (Fixed):**
```
Content-Security-Policy: 
  media-src 'self' https://your-cdn.com;
  img-src 'self' https://your-cdn.com;
```

**Safari 11-14 (Workaround Required):**
```
Content-Security-Policy: 
  media-src 'self' https://your-cdn.com;
  img-src 'self' data: https://your-cdn.com;
```

**Alternative: Custom Controls**
```css
video::-webkit-media-controls {
  display: none;
}
```

### Security Implications
- **data: URI allowance**: Required for older Safari but creates XSS risk
- **blob: support**: Needed for dynamically generated video content
- **https: enforcement**: Recommended for video security

---

## 7. Safari HTML5 Video Controls and Custom Player Bugs

### Native Controls Issues

**1. Full-Screen Mode Bug:**
Native controls reappear in full-screen mode even when hidden.

**Solution:**
```css
video::-webkit-media-controls-enclosure {
  display: none !important;
}

.custom-controls {
  z-index: 2147483647; /* Higher than Safari's default */
}
```

**2. Controls Attribute Requirement (iPad):**
iPad Safari may require `controls` attribute for video playback.

**3. Black Screen Issue (iOS 15+):**
Videos may display black screen instead of content on iOS 15+.

### Custom Player Implementation
```html
<video 
  id="customVideo"
  playsinline 
  muted
  preload="metadata"
  poster="thumbnail.jpg"
>
  <source src="video.mp4" type="video/mp4">
</video>

<div class="custom-controls">
  <button onclick="togglePlay()">Play/Pause</button>
  <div class="progress-bar" onclick="seek(event)">
    <div class="progress"></div>
  </div>
</div>

<script>
function togglePlay() {
  const video = document.getElementById('customVideo');
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function seek(event) {
  const video = document.getElementById('customVideo');
  const progressBar = event.currentTarget;
  const clickX = event.offsetX;
  const width = progressBar.offsetWidth;
  const duration = video.duration;
  video.currentTime = (clickX / width) * duration;
}
</script>
```

### Known Safari Control Bugs (2025)
- Volume controls may be unresponsive on iOS
- Seeking may fail with certain video formats
- Picture-in-picture button may not function correctly
- AirPlay button may not appear when expected

---

## 8. Safari Video Memory Management Issues

### Critical Memory Leak Problems
Safari has **persistent memory leaks** with HTML5 video elements, especially when:
- Rapidly creating/destroying video elements
- Using canvas with video rendering
- Managing multiple video streams

### Memory Leak Scenarios

**1. Video Element Cycling:**
```javascript
// PROBLEMATIC: Causes memory leaks
function createVideo() {
  const video = document.createElement('video');
  video.src = 'stream.mp4';
  document.body.appendChild(video);
  // Memory not released when removed
}
```

**2. Canvas Rendering Memory Leak:**
```javascript
// PROBLEMATIC: Safari keeps all canvas objects in memory
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// Each canvas object never gets garbage collected
```

### Memory Management Solutions

**1. Proper Video Cleanup:**
```javascript
function cleanupVideo(video) {
  // Pause and reset
  video.pause();
  video.currentTime = 0;
  
  // Clear sources
  video.removeAttribute('src');
  video.load();
  
  // Remove from DOM
  if (video.parentNode) {
    video.parentNode.removeChild(video);
  }
}
```

**2. React Component Cleanup:**
```jsx
useEffect(() => {
  return () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.pause();
      video.currentTime = 0;
      video.removeAttribute('src');
      video.load();
    }
  };
}, []);
```

**3. Canvas Memory Management:**
```javascript
// Clear canvas before reuse
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Null references when done
canvas = null;
ctx = null;
```

### Memory Monitoring
```javascript
// Monitor memory usage
if (performance.memory) {
  console.log('Used:', performance.memory.usedJSHeapSize);
  console.log('Total:', performance.memory.totalJSHeapSize);
  console.log('Limit:', performance.memory.jsHeapSizeLimit);
}
```

---

## 9. Safari Video Poster Image Loading Issues

### Primary Poster Problems
Safari has specific issues with video poster images that cause display problems:

1. **iOS Safari**: Doesn't display poster until user taps video
2. **Blank/Black Thumbnails**: Poster images fail to load in certain conditions
3. **Modal/Hidden Elements**: Poster disappears when video is initially hidden
4. **Loading Timing**: Poster may not appear due to timing issues

### Media Fragments Hack (#t=0.001)
The most reliable cross-browser solution:

```html
<video poster="thumbnail.jpg">
  <source src="video.mp4#t=0.001" type="video/mp4">
</video>
```

**How it works:**
- `#t=0.001` tells browser to skip first millisecond
- Forces Safari to preload and display that specific frame
- Works across all browsers and devices
- Fallback when poster attribute fails

### Alternative Solutions

**1. Preload Metadata:**
```html
<video preload="metadata" poster="thumbnail.jpg">
  <source src="video.mp4#t=0.1" type="video/mp4">
</video>
```

**2. JavaScript Load Method:**
```javascript
const video = document.querySelector('video');
video.load(); // Force poster reload
```

**3. Poster-First Loading:**
```html
<!-- Ensure poster loads first -->
<link rel="preload" as="image" href="thumbnail.jpg">
<video poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
</video>
```

### Best Practices
- Always include `poster` attribute
- Use media fragments hack as primary solution
- Preload poster images for critical videos
- Test specifically on iOS Safari devices

---

## 10. Safari Video Event Handling Differences

### Event Timing Differences
Safari fires video events differently than other browsers, causing timing issues:

**Chrome/Firefox Event Order:**
1. `loadstart`
2. `loadedmetadata`
3. `loadeddata`
4. `canplay`
5. `canplaythrough`

**Safari Event Order:**
1. `loadstart`
2. `loadedmetadata` (may be delayed)
3. `canplay` (may fire before `loadeddata`)
4. `loadeddata`
5. `canplaythrough` (unreliable)

### Critical Event Handling

**Safe Cross-Browser Implementation:**
```javascript
const video = document.querySelector('video');

// Handle multiple events for reliability
video.addEventListener('loadedmetadata', handleMetadata);
video.addEventListener('loadeddata', handleData);
video.addEventListener('canplay', handleCanPlay);

function handleMetadata() {
  console.log('Metadata loaded:', video.videoWidth, video.videoHeight);
}

function handleData() {
  console.log('Data loaded, can start playback');
}

function handleCanPlay() {
  // Safari may fire this before loadeddata
  if (video.readyState >= 2) {
    console.log('Ready to play');
  }
}
```

### Safari-Specific Event Issues

**1. `canplaythrough` Unreliability:**
```javascript
// DON'T rely on canplaythrough in Safari
video.addEventListener('canplaythrough', () => {
  // May never fire in Safari
});

// Use canplay + readyState check instead
video.addEventListener('canplay', () => {
  if (video.readyState >= 3) {
    // Equivalent to canplaythrough
  }
});
```

**2. `timeupdate` Frequency:**
Safari may fire `timeupdate` less frequently than other browsers.

**3. `ended` Event Delay:**
Safari may delay the `ended` event, affecting loop functionality.

### Reliable Event Pattern
```javascript
function setupVideoEvents(video) {
  let metadataLoaded = false;
  let dataLoaded = false;
  
  video.addEventListener('loadedmetadata', () => {
    metadataLoaded = true;
    checkReadiness();
  });
  
  video.addEventListener('loadeddata', () => {
    dataLoaded = true;
    checkReadiness();
  });
  
  video.addEventListener('canplay', () => {
    checkReadiness();
  });
  
  function checkReadiness() {
    if (metadataLoaded && dataLoaded && video.readyState >= 2) {
      // Video is ready for playback
      initializePlayer();
    }
  }
}
```

---

## 11. Cloudflare Pages Video Serving and Safari Compatibility

### Native HLS Support Limitations
Safari natively supports HLS, but this creates specific challenges with Cloudflare:

**Issues Identified:**
- Safari uses native HLS player, bypassing JavaScript controls
- Stream validation issues with Apple's mediastreamvalidator
- iPad Pro M1 + Chrome compatibility problems
- Resolution discrepancies (1px off) causing validation failures

### Cloudflare Stream + Safari Issues

**1. HLS Validation Problems:**
```
Apple's mediastreamvalidator complaints:
- Resolution mismatches
- Segment duration issues
- Playlist structure problems
```

**2. Device-Specific Issues:**
- iPad Pro M1 + Chrome: Streams get "stuck" after 2-3 seconds
- iPadOS browser engine differences despite same underlying WebKit
- Native vs JavaScript player inconsistencies

### Solutions and Workarounds

**1. Use JavaScript Players:**
```html
<!-- Bypass Safari native HLS -->
<script src="https://vjs.zencdn.net/8.0.4/video.min.js"></script>
<video-js 
  data-vjs-player 
  controls 
  preload="auto"
  width="800" 
  height="450"
>
  <source src="https://stream.cloudflare.com/video.m3u8" type="application/x-mpegURL">
  <source src="https://stream.cloudflare.com/video.mp4" type="video/mp4">
</video-js>
```

**2. Fallback Strategy:**
```javascript
// Detect Safari and provide MP4 fallback
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  // Use MP4 source for Safari
  video.src = 'https://stream.cloudflare.com/video.mp4';
} else {
  // Use HLS for other browsers
  video.src = 'https://stream.cloudflare.com/video.m3u8';
}
```

**3. Stream Validation:**
```bash
# Validate HLS streams for Safari compatibility
mediastreamvalidator https://stream.cloudflare.com/video.m3u8
```

### Cloudflare Pages Static Video Serving
```html
<!-- Proper video serving from Cloudflare Pages -->
<video controls preload="metadata">
  <source src="/videos/sample.mp4" type="video/mp4">
  <p>Your browser doesn't support video.</p>
</video>
```

**Headers for Cloudflare Pages:**
```
# _headers file
/videos/*
  Cache-Control: public, max-age=31536000
  Accept-Ranges: bytes
  Content-Type: video/mp4
```

---

## 12. Safari Image Format Support for Video Thumbnails (2025)

### Current Format Support Status

**AVIF Support:**
- ✅ Safari 16+ (2022)
- ✅ Full support as of 2024
- Best compression ratio
- Superior quality

**WebP Support:**
- ✅ Safari 14+ (2020)
- ✅ Universal support in 2025
- Good compression
- Wide compatibility

**JPEG Support:**
- ✅ Universal support
- Standard format
- Largest file sizes

### Video Thumbnail Implementation

**Progressive Enhancement Strategy:**
```html
<video poster="thumbnail.avif">
  <source src="video.mp4" type="video/mp4">
</video>

<!-- With fallbacks -->
<picture>
  <source srcset="thumbnail.avif" type="image/avif">
  <source srcset="thumbnail.webp" type="image/webp">
  <img src="thumbnail.jpg" alt="Video thumbnail">
</picture>
```

**CSS Implementation:**
```css
.video-thumbnail {
  background-image: url('thumbnail.avif');
  background-image: image-set(
    url('thumbnail.avif') type('image/avif'),
    url('thumbnail.webp') type('image/webp'),
    url('thumbnail.jpg') type('image/jpeg')
  );
}
```

### Format Recommendations (2025)

**Primary Choice: AVIF**
- 20% smaller than WebP
- Better quality than JPEG
- Full Safari support

**Fallback: WebP**
- Universal browser support
- Good compression
- Safe fallback option

**Last Resort: JPEG**
- Maximum compatibility
- Larger file sizes
- Baseline requirement

### Implementation Example
```jsx
// React implementation with format detection
function VideoThumbnail({ video, alt }) {
  const [format, setFormat] = useState('jpg');
  
  useEffect(() => {
    // Detect best supported format
    const canvas = document.createElement('canvas');
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      setFormat('avif');
    } else if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      setFormat('webp');
    }
  }, []);
  
  return (
    <video poster={`${video.thumbnail}.${format}`}>
      <source src={video.src} type="video/mp4" />
    </video>
  );
}
```

---

## 13. Safari and Next.js Image Component Compatibility

### Next.js Image Component Issues with Safari

**1. Video Thumbnail Optimization:**
Next.js Image component may not work optimally with video thumbnails in Safari due to:
- Format detection issues
- Lazy loading conflicts with video elements
- Priority loading problems

**2. AVIF/WebP Format Serving:**
```jsx
// Potential Safari issues
import Image from 'next/image';

function VideoThumbnail() {
  return (
    <div className="relative">
      <Image
        src="/video-thumbnail.jpg"
        alt="Video thumbnail"
        width={800}
        height={450}
        priority // May conflict with video loading
      />
      <video className="absolute inset-0">
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
```

### Solutions for Next.js + Safari

**1. Manual Format Selection:**
```jsx
import { useState, useEffect } from 'react';

function SafariCompatibleThumbnail({ src, alt, width, height }) {
  const [imageSrc, setImageSrc] = useState(`${src}.jpg`);
  
  useEffect(() => {
    // Feature detection for Safari
    const img = new Image();
    img.onload = () => setImageSrc(`${src}.avif`);
    img.onerror = () => {
      const webpImg = new Image();
      webpImg.onload = () => setImageSrc(`${src}.webp`);
      webpImg.onerror = () => setImageSrc(`${src}.jpg`);
      webpImg.src = `${src}.webp`;
    };
    img.src = `${src}.avif`;
  }, [src]);
  
  return (
    <img 
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}
```

**2. Poster Attribute Over Image Overlay:**
```jsx
// Better approach for Safari
function VideoWithThumbnail({ videoSrc, thumbnailSrc, alt }) {
  return (
    <video
      poster={thumbnailSrc}
      controls
      preload="metadata"
      width={800}
      height={450}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
```

**3. Next.js Configuration for Safari:**
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'], // Safari 16+ supports AVIF
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 31536000,
  },
  // Ensure proper MIME types
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ];
  },
};
```

---

## 14. Safari Low-Power Mode Impact on Video Playback

### Critical Impact of Low-Power Mode
Low-power mode on iOS devices **completely prevents video autoplay**, even with all correct attributes (`autoplay`, `muted`, `playsinline`).

### Detection and Handling

**1. Low-Power Mode Detection:**
```javascript
// Indirect detection method
function detectLowPowerMode() {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.muted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.src = 'data:video/mp4;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXZ1BZM';
    
    video.addEventListener('play', () => resolve(false)); // Not in low-power mode
    
    setTimeout(() => resolve(true), 1000); // Assume low-power mode if no play event
    
    document.body.appendChild(video);
    video.play().catch(() => resolve(true));
  });
}

// Usage
detectLowPowerMode().then(isLowPower => {
  if (isLowPower) {
    // Show manual play button
    showManualPlayButton();
  } else {
    // Autoplay is possible
    initializeAutoplay();
  }
});
```

**2. User-Initiated Playback Strategy:**
```javascript
function handleLowPowerMode() {
  const videos = document.querySelectorAll('video[autoplay]');
  
  // Create manual play triggers
  videos.forEach(video => {
    const playButton = document.createElement('button');
    playButton.textContent = '▶ Play Video';
    playButton.className = 'manual-play-button';
    
    playButton.addEventListener('click', () => {
      video.play();
      playButton.style.display = 'none';
    });
    
    video.parentNode.insertBefore(playButton, video.nextSibling);
  });
}
```

**3. Progressive Enhancement:**
```css
/* Style manual play buttons */
.manual-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  z-index: 10;
}

.manual-play-button:hover {
  background: rgba(0, 0, 0, 0.9);
}
```

### Battery-Aware Video Strategy
```javascript
// Comprehensive battery-aware video handling
class SafariVideoManager {
  constructor() {
    this.isLowPowerMode = false;
    this.init();
  }
  
  async init() {
    // Check for low-power mode
    this.isLowPowerMode = await this.detectLowPowerMode();
    
    // Handle battery status changes
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      battery.addEventListener('chargingchange', this.handleBatteryChange.bind(this));
      battery.addEventListener('levelchange', this.handleBatteryChange.bind(this));
    }
    
    this.setupVideos();
  }
  
  handleBatteryChange(battery) {
    // Adapt video strategy based on battery status
    if (battery.level < 0.2 && !battery.charging) {
      this.enablePowerSavingMode();
    } else {
      this.disablePowerSavingMode();
    }
  }
  
  enablePowerSavingMode() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.preload = 'none';
    });
  }
  
  setupVideos() {
    const videos = document.querySelectorAll('video[autoplay]');
    
    videos.forEach(video => {
      if (this.isLowPowerMode) {
        this.addManualControls(video);
      } else {
        this.enableAutoplay(video);
      }
    });
  }
}

// Initialize
const videoManager = new SafariVideoManager();
```

---

## 15. Server Requirements and HTTP Headers for Safari Video

### Critical Server Configuration

Safari requires specific server configurations for proper video streaming:

**1. Byte-Range Request Support (Mandatory):**
Safari uses HTTP byte-range requests for video streaming. Servers must support:
```
Accept-Ranges: bytes
Content-Range: bytes 206-1023/1024
```

**Without byte-range support:**
- Video controls appear but clicking play has no effect
- Particularly affects iOS Safari
- Common issue with basic web servers

**2. CORS Headers for Cross-Origin Videos:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Headers: Range
Access-Control-Expose-Headers: Content-Length, Content-Range
```

**3. Content-Type Headers:**
```
video/mp4 → .mp4 files
video/quicktime → .mov files
application/vnd.apple.mpegurl → .m3u8 files
```

### Server Implementation Examples

**Apache (.htaccess):**
```apache
# Enable byte-range requests
Header set Accept-Ranges bytes

# Video MIME types
AddType video/mp4 .mp4
AddType video/quicktime .mov
AddType application/vnd.apple.mpegurl .m3u8

# CORS for video
<FilesMatch "\.(mp4|mov|m3u8)$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, HEAD, OPTIONS"
    Header set Access-Control-Expose-Headers "Content-Length, Content-Range"
</FilesMatch>

# Enable range requests module
LoadModule headers_module modules/mod_headers.so
```

**Nginx:**
```nginx
location ~* \.(mp4|mov|m3u8)$ {
    add_header Accept-Ranges bytes;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, HEAD, OPTIONS";
    add_header Access-Control-Expose-Headers "Content-Length, Content-Range";
    
    # Enable range requests
    try_files $uri =404;
}
```

**Node.js/Express:**
```javascript
app.use('/videos', express.static('videos', {
  acceptRanges: true,
  setHeaders: (res, path) => {
    res.set('Accept-Ranges', 'bytes');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
  }
}));
```

### Fast Start/Web Optimization Issue

**Critical Error - Never Use:**
```bash
# WRONG - Will break iOS Safari
ffmpeg -i input.mp4 -movflags +faststart output.mp4
```

**Correct Approach:**
```bash
# Correct - Compatible with iOS Safari
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -movflags +faststart output.mp4
```

**The Issue:**
- "Fast Start" moves metadata to beginning of file
- iOS Safari requests content differently than desktop
- Can cause complete playback failure on mobile devices

### CDN Configuration

**Cloudflare:**
- Automatically handles byte-range requests
- Supports video streaming optimization
- Provides proper CORS headers

**AWS CloudFront:**
```json
{
  "Origins": [{
    "CustomOriginConfig": {
      "OriginProtocolPolicy": "https-only",
      "OriginSslProtocols": ["TLSv1.2"]
    }
  }],
  "DefaultCacheBehavior": {
    "AllowedMethods": ["GET", "HEAD", "OPTIONS"],
    "CachedMethods": ["GET", "HEAD"],
    "Compress": false,
    "ViewerProtocolPolicy": "redirect-to-https"
  }
}
```

---

## Summary of Critical Action Items

### Immediate Fixes Required:
1. **Add all required video attributes**: `autoplay muted playsinline`
2. **Implement proper video dimensions** to prevent CLS
3. **Use H.264 MP4 encoding** with correct profile settings
4. **Add CSP data: URI allowance** for Safari 14 and below
5. **Implement video memory cleanup** in component unmounting
6. **Use media fragments hack** (#t=0.001) for poster images
7. **Configure server byte-range support** for video streaming
8. **Add low-power mode detection** and manual play fallbacks

### Testing Requirements:
- Test on actual iOS devices with Low Power Mode enabled
- Verify video playback across Safari versions 14-18
- Check CSP compatibility with Safari's native controls
- Validate HLS streams with Apple's mediastreamvalidator
- Monitor memory usage with multiple video elements
- Test video thumbnail loading in various network conditions

### Long-term Monitoring:
- Track Core Web Vitals CLS scores for video pages
- Monitor video loading failure rates in Safari
- Watch for new Safari version video handling changes
- Keep updated with WebKit video policy changes

This comprehensive guide addresses all major Safari video and media handling issues that could cause website display problems in 2025, providing specific technical solutions and implementation examples for each critical area.