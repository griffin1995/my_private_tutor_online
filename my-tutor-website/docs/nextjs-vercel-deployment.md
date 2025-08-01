# Next.js Vercel Deployment Documentation

**Documentation Source**: Context7 Official Documentation - Next.js + Vercel Integration
**Reference**: /vercel/next.js - Official Next.js Vercel Deployment Patterns
**Compliance**: CLAUDE.md Rule #16 - Official Documentation Only

## Deployment Overview

Next.js applications can be deployed to Vercel using multiple approaches, each optimized for different use cases and requirements.

## Static Export Deployment

### Configuration for Static Sites
**File**: `next.config.js`
```javascript
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
  
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: true,
  
  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',
}

module.exports = nextConfig
```

**TypeScript Configuration**:
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build', // Changes the build output directory to `build`
}

export default nextConfig
```

### Static Export Limitations
- No API routes support
- No server-side rendering (SSR)
- No incremental static regeneration (ISR)
- No dynamic routing with getServerSideProps
- Images must use `unoptimized: true` or custom loader

### Custom Image Loader for Static Export
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
  },
}

module.exports = nextConfig
```

## Full Next.js Deployment

### Standard Configuration
```javascript
// next.config.js
const nextConfig = {
  // No output: 'export' for full Next.js features
  // Image optimization enabled by default
  // API routes supported
  // SSR and ISR available
}

module.exports = nextConfig
```

### Route Segment Configuration
```javascript
// app/page.js
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

### Runtime Options
```javascript
export const runtime = 'nodejs' // 'nodejs' | 'edge'
```

## Deployment Methods

### Method 1: Git Integration
```bash
# Initialize and push to Git
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

**Import to Vercel**:
1. Visit https://vercel.com/new
2. Import Git repository
3. Configure environment variables
4. Deploy automatically

### Method 2: CLI Deployment
```bash
# Link local project to Vercel
npx vercel link

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

### Method 3: Template Deployment
**Deploy Button URL Structure**:
```
https://vercel.com/new/clone?
repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript
&project-name=with-stripe-typescript
&repository-name=with-stripe-typescript
&env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY
&envDescription=Enter%20your%20Stripe%20Keys
&envLink=https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript%23required-configuration
```

## Environment Variables

### Local Development Setup
```bash
# Copy example environment file
cp .env.local.example .env.local
```

### Vercel Dashboard Configuration
1. Select project in Vercel Dashboard
2. Navigate to "Settings" tab
3. Scroll to "Environment Variables" section
4. Add required variables per environment
5. Redeploy project after adding variables

### CLI Environment Management
```bash
# Pull remote environment variables
npx vercel env pull
```

### Environment Variable Types
```bash
# Public variables (available in browser)
NEXT_PUBLIC_API_URL=https://api.example.com

# Private variables (server-side only)
SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
```

## API Routes and Serverless Functions

### Basic API Route
```javascript
// app/api/example/route.js
export async function GET(request) {
  return Response.json({ message: 'Hello from API' });
}

export async function POST(request) {
  const data = await request.json();
  return Response.json({ received: data });
}
```

### Static API Routes (for export mode)
```javascript
// app/api/data/route.ts
export const dynamic = 'force-static'

export async function GET() {
  return Response.json({ name: 'Lee' })
}
```

## Advanced Deployment Features

### Incremental Static Regeneration (ISR)
```javascript
// app/page.js
export const revalidate = 60 // Revalidate every 60 seconds

export default async function Page() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return <div>{JSON.stringify(data)}</div>;
}
```

### Static Site Generation (SSG)
```javascript
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return {
    props: { stargazersCount: json.stargazers_count },
    revalidate: 60, // Using ISR, regenerate the page every 60 seconds
  };
};

function Home({ stargazersCount }) {
  return <h1>The Next.js repo has {stargazersCount} stars.</h1>;
}

export default Home;
```

### Server-Side Rendering (SSR)
```javascript
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://api.github.com/repos/vercel/${context.query.repoName}`,
  );
  const json = await res.json();
  return {
    props: {
      repoName: context.query.repoName,
      stargazersCount: json.stargazers_count,
    },
  };
};

function Home({ repoName, stargazersCount }) {
  return (
    <h1>
      The {repoName} repo has {stargazersCount} stars.
    </h1>
  );
}

export default Home;
```

## Performance Optimization

### Vercel Analytics Integration
```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights Integration
```javascript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Web Vitals Monitoring
```javascript
// app/_components/web-vitals.js
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  
  return null
}
```

## Build Configuration

### Custom Build Commands
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Build Cache Configuration
```javascript
// For CI/CD environments like Heroku
"cacheDirectories": [".next/cache"]
```

### Static Generation Options
```javascript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
  },
}

export default nextConfig
```

## Middleware and Edge Functions

### Basic Middleware
```javascript
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Middleware logic here
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
}
```

### Edge Runtime Configuration
```javascript
export const runtime = "edge";
```

## Webhooks and Revalidation

### On-Demand Revalidation
```javascript
// app/api/revalidate/route.js
export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  
  if (path) {
    await revalidatePath(path)
    return Response.json({ revalidated: true })
  }
  
  return Response.json({ message: 'Missing path' }, { status: 400 })
}
```

### Webhook Endpoint Example
```
https://<YOUR_VERCEL_DEPLOYMENT_URL>/api/revalidate
```

## Migration Strategies

### From Static Export to Full Next.js
1. Remove `output: 'export'` from next.config.js
2. Remove `images: { unoptimized: true }` if present
3. Update environment variables in Vercel dashboard
4. Add API routes if needed
5. Configure ISR/SSR as required
6. Test and redeploy

### From Other Platforms
1. Ensure Node.js compatibility
2. Update build commands in Vercel dashboard
3. Configure environment variables
4. Set up proper redirects
5. Test with preview deployments
6. Configure custom domains

## Troubleshooting

### Common Issues
- **Build Failures**: Check build logs in Vercel dashboard
- **Environment Variables**: Ensure variables are set per environment
- **Static Export Errors**: Remove unsupported features (API routes, SSR)
- **Image Optimization**: Configure properly for static vs dynamic deployment

### Debug Commands
```bash
# Check deployment logs
npx vercel logs <deployment-url>

# Build locally
npm run build

# Test production build locally
npm run start
```

## Best Practices

### Performance
- Use Next.js Image component for optimized images
- Implement proper caching strategies
- Monitor Core Web Vitals with Speed Insights
- Use ISR for dynamic content that doesn't change frequently

### Security
- Never commit environment variables to version control
- Use Vercel environment variables for sensitive data
- Implement proper API validation
- Use HTTPS for all external API calls

### Development Workflow
- Use preview deployments for testing
- Configure proper Git branching strategy
- Use TypeScript for better development experience
- Implement comprehensive error handling