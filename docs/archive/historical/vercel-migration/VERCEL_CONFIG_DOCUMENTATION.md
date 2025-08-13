# Vercel Configuration Documentation

## Documentation Source: Context7 MCP - Vercel Next.js Dynamic Deployment
**Reference**: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/05-config/01-next-config-js/index.mdx  
**Pattern**: Vercel configuration for Next.js dynamic rendering deployment  
**Purpose**: Configure Vercel deployment for server-side rendering capabilities  

## vercel.json Configuration Details

### Framework Detection
```json
"framework": "nextjs"
```
- **Purpose**: Explicitly declares Next.js framework for optimized Vercel deployment
- **Context7 Reference**: Vercel automatically detects Next.js but explicit declaration ensures correct build pipeline

### Function Configuration
```json
"functions": {
  "src/app/**/*.{js,ts,tsx}": {
    "maxDuration": 60
  }
}
```
- **Purpose**: Sets maximum execution time for serverless functions to 60 seconds
- **Context**: Increased from default 10s to prevent timeout issues during dynamic rendering
- **Pattern**: Applies to all app router routes and API endpoints

### Security Headers
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "X-Content-Type-Options",
        "value": "nosniff"
      },
      {
        "key": "X-Frame-Options", 
        "value": "DENY"
      },
      {
        "key": "X-XSS-Protection",
        "value": "1; mode=block"
      }
    ]
  }
]
```
- **Purpose**: Essential security headers for production deployment
- **X-Content-Type-Options**: Prevents MIME type sniffing attacks
- **X-Frame-Options**: Prevents clickjacking by denying iframe embedding
- **X-XSS-Protection**: Enables browser XSS filtering

### Performance Headers
```json
{
  "source": "/(.*)\\.(js|css|map|woff2?|ttf|otf|eot)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```
- **Purpose**: Aggressive caching for static assets (1 year)
- **Pattern**: Applies to JavaScript, CSS, source maps, and font files
- **Benefit**: Reduces bandwidth and improves loading performance

### Admin Route Configuration
```json
"rewrites": [
  {
    "source": "/admin/:path*",
    "destination": "/admin/:path*"
  }
]
```
- **Purpose**: Explicit rewrite rule for admin panel routing
- **Context**: Ensures admin routes are properly handled in dynamic rendering mode

### Regional Deployment
```json
"regions": ["lhr1"]
```
- **Purpose**: Deploy to London region for optimal UK audience performance
- **Context**: Matches target market (UK tutoring services)

## Migration Notes

### Changes from Previous Configuration
1. **Removed**: `"outputDirectory": "out"` - This was causing Vercel to look for static export files
2. **Removed**: `"buildCommand"` and `"installCommand"` - Let Vercel auto-detect for Next.js
3. **Added**: Proper framework declaration
4. **Verified**: All settings against Context7 MCP documentation

### Dynamic vs Static Export
- **Previous**: Static export looking for `/vercel/path0/out/routes-manifest.json`
- **Current**: Dynamic rendering with server-side capabilities
- **Result**: Routes marked as `ƒ (Dynamic) server-rendered on demand`