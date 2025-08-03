# Vercel Configuration Documentation

## Documentation Source: Context7 MCP - Vercel Next.js Dynamic Deployment
**Reference**: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/05-config/01-next-config-js/index.mdx  
**Pattern**: Vercel configuration for Next.js dynamic rendering  
**Purpose**: Configure Vercel deployment for server-side rendering capabilities  
**Migration**: Removed outputDirectory: 'out' to support dynamic rendering  

## Configuration Details

### Build Configuration
- `buildCommand`: "next build" - Standard Next.js build command
- `framework`: "nextjs" - Specifies Next.js framework for optimized deployment
- `installCommand`: "npm install" - Standard npm installation

### Function Configuration
- `maxDuration`: 60 seconds - Increased from 10s to prevent timeout issues
- Applied to all app routes (src/app/**/*.{js,ts,tsx})

### Security Headers
- X-Content-Type-Options: nosniff - Prevents MIME type sniffing
- X-Frame-Options: DENY - Prevents clickjacking attacks
- X-XSS-Protection: 1; mode=block - Enables XSS protection

### Performance Optimization
- Static assets cached for 1 year (immutable)
- Applies to JS, CSS, fonts, and images

### Regional Deployment
- Region: lhr1 (London) - Optimized for UK audience

## Migration Notes
- Removed `outputDirectory: "out"` - This was causing deployment to look for static export files
- Dynamic rendering now enabled for all routes via `export const dynamic = 'force-dynamic'` in layout.tsx