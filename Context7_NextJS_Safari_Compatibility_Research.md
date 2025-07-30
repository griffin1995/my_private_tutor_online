# Context7: Next.js Static Export Safari Compatibility Research

## Research Overview
Comprehensive analysis of Next.js static export deployment issues specific to Safari browser compatibility, focusing on issues that cause complete page load failures, blank screens, or major functionality breaks.

## 1. Safari's Handling of Next.js Static Export vs Server-Side Rendering

### Key Findings:
- **No Safari-Specific Issues**: Next.js supports the same browsers as React itself, including Safari, with no required configuration
- **Universal Compatibility**: The framework allows developers to safely use ES6+ syntax features, Async/Await, Object Rest/Spread Properties with zero configuration
- **Static Export Capability**: Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server

### Known Issues:
- Issue #48627 on Next.js GitHub repository about Next.js not being fully functional on Safari for iOS 12 (from April 2023)
- Some developers report "Everything works just fine on every browser, except for Safari on Mac"

## 2. Static Export JavaScript Chunk Loading Issues in Safari vs Other Browsers

### Critical Issues:
- **ChunkLoadError Problems**: Regular exceptions with errors like "ChunkLoadError: Loading chunk 3662 failed" pointing to missing JavaScript files in the `_next/static/chunks` directory
- **Development Mode Failures**: "Failed to load script: /_next/static/chunks/pages/[...]" appears momentarily before browser navigation
- **Cache-Related Problems**: Many chunk loading issues are cache-related, requiring deletion of `.next` folder and force-refresh

### Safari-Specific Solutions:
- Delete `.next` folder at project root, relaunch project, and force-refresh (Shift+F5 / Cmd+Shift+R)
- Check public_html directory settings in CPanel for proper file serving
- Avoid directory names with spaces - repository names like 'Some Project' can create problems when cloned
- Directory/folder names with brackets like `[locale]` may require manual renaming on Apache servers

### Configuration Options:
- CSS Chunking configuration via `cssChunking` option in `next.config.js`
- Options: 'true' (default - merges CSS files), 'false' (no merging), or 'strict' (loads CSS in correct order)

## 3. Safari's Strict Module Loading and Next.js Dynamic Imports

### ESM Compatibility:
- **Automatic ESM Support**: Since Next.js 12, support for ESM modules is automatically enabled
- **Module Standards**: ESModules standards implementation varies across browsers including Safari
- **Strict Mode**: Modules use strict mode automatically, relevant to Safari's strict module loading behavior

### Dynamic Import Solutions:
- **Dynamic Import Syntax**: The `import()` syntax allows loading ECMAScript modules asynchronously and dynamically
- **Cross-Environment Support**: Dynamic import() is supported in both CommonJS and ES modules
- **Error Resolution**: Using dynamic imports removes ESModule errors that frequently occur with require() statements

### Best Practices:
- Use dynamic imports for third-party packages that may convert to ESM-only packages
- Switch to loose mode (`experimental.esmExternals: 'loose'`) in Next.js configuration
- Configure TypeScript with `module: es2020` and `esModuleInterop: true`

## 4. Next.js Image Component with unoptimized:true Safari Compatibility

### Safari Bug Resolution:
- **Fixed in Safari 16.4**: Known Safari Image component issues were resolved in Safari 16.4
- **CSS Workaround for Older Versions**: 
  ```css
  @supports (font: -apple-system-body) and (-webkit-appearance: none) { 
    img[loading="lazy"] { clip-path: inset(0.6px) } 
  }
  ```

### Static Export Limitations:
- Default Image Optimization API not available for exported applications
- Using `unoptimized:true` bypasses optimization API requirement
- Source image served as-is without quality, size, or format changes

### Specific Safari Issues:
- Safari 10.15.7 bug: "Image does not show up on macOS Safari"
- CSS-related rendering issues: changing `width: 0` to `width: 1px` resolves display problems
- WebP support issues don't affect `unoptimized=true` usage

### Alternative Solutions:
- `next-image-export-optimizer` package for static HTML export functionality
- Manual server configuration for Image Optimization API
- External provider configuration (e.g., Vercel)

## 5. Safari Caching Behavior Differences with Next.js Static Assets

### Safari vs Other Browsers:
- **Back/Forward Cache (BFCache)**: Safari caches pages with unload event listeners while Chrome/Firefox do not
- **Cache Invalidation**: Firefox correctly invalidates Location and Content-Location URLs; Safari, Edge, and Chrome do not
- **Status Code Caching**: Safari caches more status codes than Firefox, only rejecting 400 Bad Request, 5xx status codes, and unknown codes

### Next.js Static Asset Caching:
- **Public Folder Default**: Next.js cannot safely cache assets in public folder (default max-age=0)
- **Production Limitations**: Cache-Control headers in `next.config.js` are overwritten in production
- **Built-in Caching**: Next.js automatically caches static assets, API responses, and pre-rendered pages

### Solutions:
- Use Nginx as proxy to update cache-control response headers
- External blob storage (S3) with CDN (CloudFront) for custom caching rules
- Next.js 15.3.2+ allows overriding cache headers for public folder files

### Safari Event Handling:
- Listen to `pagehide` instead of `unload` (2x better rate in Safari)
- On mobile, listen to `visibilitychange` events due to process halting

## 6. Cloudflare Pages + Next.js Static Export Safari Problems

### Critical Safari Issues:
- **HTTP/3 JavaScript Loading**: Safari 18.1 desktop users experience random JS resource loading failures with HTTP/3 enabled
- **No Console Errors**: Resources fail to load without generating console errors, making debugging difficult

### Cloudflare Pages Limitations:
- **Edge Runtime Requirement**: All server-side routes must be configured as edge runtime routes
- **No Image Optimization**: Built-in `next/image` components don't work, potentially causing slower page loads
- **API Route Restrictions**: Standard API routes not supported

### Safari-Specific Problems:
- Website loading failures: "loads in Chrome on desktop, but doesn't load on Android browsers"
- Static content display issues in Safari
- CSS/JS loading problems specific to Safari

### Recommendations:
- **Disable HTTP/3** for Safari desktop users as workaround
- **Use Relative Paths**: Ensure asset paths use `./assets/` instead of `/assets/`
- **Alternative Deployment**: Consider Vercel, newer `@opennextjs/cloudflare` adapter, or Cloudflare Workers
- **Thorough Testing**: Always test specifically on Safari desktop and mobile

## 7. Next.js App Router Static Export Safari Navigation Issues

### Static Export Navigation Problems:
- **Dynamic Route 404s**: Direct navigation to dynamic routes (e.g., `/post/1`) returns 404 in production
- **Build ID Mismatches**: Full page reloads instead of client-side navigation after new builds
- **RSC Payload Failures**: "Failed to fetch RSC payload for ${url}. Falling back to browser navigation."

### Universal Browser Impact:
- Issues affect all browsers, not Safari-specific
- Static export behaves like traditional SPA for client-side transitions
- Limitations with dynamic routes requiring server configuration

### Solutions:
- **Server Configuration**: Configure static assets server to serve HTML files for dynamic routes
- **Client-Side Data Fetching**: Use Client Components with SWR for dynamic data
- **Alternative Approaches**: Some developers use React Router with Next.js (not recommended)

### Current Limitations:
- Features requiring Node.js server not supported in static export
- No proper entry points for dynamic routes in static exports
- Framework primarily designed for server-rendered applications

## 8. Safari's Handling of Next.js Generated HTML Structure

### No Specific Issues Found:
- Search results indicate no documented Safari-specific issues with Next.js generated HTML structure
- Next.js maintains broad browser support including Safari
- HTML generation follows web standards supported across browsers

### General Compatibility:
- Next.js-generated HTML is standards-compliant
- No special handling required for Safari
- Issues more likely related to JavaScript execution than HTML structure

## 9. Client-Side Hydration Issues Specific to Safari

### Limited Safari-Specific Documentation:
- No major Safari-specific hydration issues documented
- General hydration issues affect all browsers similarly
- Safari's JavaScript engine differences may contribute to subtle timing issues

### General Hydration Considerations:
- Server-client markup mismatches cause hydration failures
- Dynamic content generation can cause inconsistencies
- Race conditions in data loading affect all browsers

### Best Practices:
- Ensure consistent server-client rendering
- Use proper loading states
- Avoid document/window references during server-side rendering

## 10. Safari's JavaScript Engine Differences Affecting Next.js Bundle Execution

### JavaScriptCore vs V8 Differences:
- **Safari's JavaScriptCore**: Uses less memory (better battery life) but executes slightly slower
- **Chrome's V8**: Faster execution due to aggressive optimization but higher memory usage
- **Performance Impact**: JavaScript performance varies due to different optimization strategies

### Bundle Execution Compatibility:
- **JavaScript API Adoption**: Safari slower to adopt some JavaScript APIs
- **Cross-Browser Variations**: Different browsers interpret and execute JavaScript slightly differently
- **Polyfill Requirements**: Next.js only loads polyfills for browsers that require them

### Best Practices:
- Use feature detection before using modern features
- Provide fallbacks for older Safari versions
- Test across different browsers for consistent behavior
- Add custom polyfills for specific Safari compatibility requirements

## 11. Next.js Font Optimization Compatibility with Safari (next/font/google)

### Critical Safari Font Issues:
- **Safari 12+ Restrictions**: Only renders default system fonts and web fonts; fails to render self-hosted Google Fonts
- **iOS Safari Problems**: Fonts default to Times New Roman on iOS while working on other platforms
- **Initial Load Issues**: Fonts load correctly only after resizing or page interaction

### Static Export Font Problems:
- Self-hosting approach via static export can be problematic with Safari
- Deployment platform affects Safari compatibility (Cloudflare Pages vs Netlify differences reported)

### Solutions:
- **Font Configuration**:
  ```javascript
  const font = YourFont({
    subsets: ['latin'],
    display: 'swap',
    adjustFontFallback: false
  })
  ```
- **Avoid Manual Overrides**: Don't manually set `font-family` in CSS when using Next.js font system
- **Alternative Deployment**: Consider different deployment platforms if font issues persist

### Recommendations:
- Avoid self-hosting Google Fonts for Safari compatibility
- Use `display: 'swap'` and `adjustFontFallback: false` options
- Test font loading specifically on iOS devices

## 12. Safari's Handling of Next.js Metadata API in Static Export Mode

### Server Component Limitations:
- Metadata object and `generateMetadata` only supported in Server Components
- Static exports may have issues if not properly configured for build-time metadata resolution

### Static Export Considerations:
- Metadata must be resolved at build time rather than runtime
- Dynamic metadata challenges for statically rendered pages
- File-based metadata has higher priority than metadata object

### Safari Compatibility:
- No documented Safari-specific metadata API issues
- General compatibility maintained across browsers
- SEO tags function normally in Safari

### Best Practices:
- Use static metadata object when possible
- Ensure metadata evaluation follows proper order
- Add custom meta tags directly in layout if needed

## 13. Service Worker Registration Issues with Next.js Static Export in Safari

### Safari PWA Limitations:
- Service Worker API available but PWA installation limited
- Push notifications don't work as well on iOS compared to Android
- InstallPrompt doesn't work on Safari iOS (beforeinstallprompt not supported)

### Static Export Configuration:
- Service workers must be in public directory for static exports
- Manual registration required when using custom service worker handling
- Scope management more complex in Safari due to partitions

### Safari-Specific Considerations:
- More complex scope management with cross-domain iframes
- "Add to Home Screen" instruction needed for iOS users
- Service worker registration works but with platform limitations

### Best Practices:
- Place service worker in public directory root
- Provide iOS-specific installation instructions
- Test service worker functionality across platforms

## 14. Safari's Module Resolution Differences Affecting Next.js Chunks

### Critical Safari Bug:
- **Async Chunk Loading Failure**: Safari fails when cookies required to load chunks
- **Crossorigin Issue**: Webpack uses `crossorigin="anonymous"` by default, causing Safari to omit cookies for same-origin requests
- **Authentication Problems**: Apps behind authentication layer experience chunk loading failures

### Webpack Module Resolution:
- Enhanced-resolve used by webpack for file path resolution
- Safari's stricter handling of crossorigin attributes causes compatibility issues
- Module resolution generally consistent across browsers except for cookie handling

### Solutions:
- Set `crossOriginLoading: false` in Next.js config if assets require cookies and Safari support needed
- Proper webpack configuration for chunk sizes and cache groups
- Advanced optimizations for production builds

### Browser Compatibility:
- Firefox best for testing prefetch functionality
- Chrome sometimes flakey for honouring prefetch hints
- Safari requires special handling for authenticated chunk loading

## 15. Performance Issues with Next.js Static Export Specifically on Safari

### Safari-Specific Performance Problems:
- **SVG Import Issues**: Major performance hits from importing numerous SVGs as React components
- **Loading Speed**: NextJS apps loading slow on Safari while fine on Chrome

### Performance Solutions:
- **SVG Optimization**: Switch from SVG React components to .svg files, optimize through minifier, use with Next.js Image component
- **Static Rendering**: Pre-rendered pages at build time drop ~100ms of load time
- **Image Optimization**: Comprehensive strategy using Next.js Image component for automatic optimization

### Optimization Techniques for Safari:
1. **Code Splitting**: Automatic code-splitting with dynamic imports for necessary JavaScript only
2. **Bundle Size Optimization**: Smaller bundles and efficient code improve page load times
3. **Third-Party Script Optimization**: Audit external scripts, use async/defer attributes
4. **CDN Usage**: Content Delivery Network for faster static asset delivery

### Safari Performance Testing:
- Enable Develop menu in Safari settings
- Use Network tab for performance analysis
- Compare performance between Chrome and Safari
- Focus on quick wins for optimization impact

## Deployment Recommendations

### For Production Deployments:
1. **Test Thoroughly on Safari**: Both desktop and mobile versions
2. **Configure Proper Caching**: Use CDN or reverse proxy for cache headers
3. **Monitor Chunk Loading**: Implement error handling for chunk loading failures
4. **Font Strategy**: Avoid self-hosting Google Fonts, use proper font configuration
5. **Performance Optimization**: Prioritize Safari-specific optimizations like SVG handling

### Critical Configuration Settings:
```javascript
// next.config.js
module.exports = {
  output: 'export',
  crossOriginLoading: false, // If cookies required for Safari
  images: {
    unoptimized: true // For static export
  },
  experimental: {
    optimizePackageImports: ['package-name'] // Bundle optimization
  }
}
```

### Emergency Fixes:
- Delete `.next` folder and rebuild for chunk loading issues
- Disable HTTP/3 for Safari users experiencing JavaScript loading problems
- Use relative paths for static assets
- Implement Safari-specific CSS workarounds for Image component

This research indicates that while Next.js static exports generally work well with Safari, there are specific areas requiring attention: chunk loading with authentication, font loading strategies, performance optimization techniques, and deployment platform considerations. Most issues have documented solutions, but require proactive configuration and testing.