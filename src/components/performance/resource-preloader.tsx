/**
 * Resource Preloader - Critical Asset Optimization
 * 
 * Implements strategic resource preloading for premium tutoring website
 * Optimizes loading of critical assets to achieve LCP <1.5s target
 * Prioritizes resources based on user journey and page importance
 * 
 * Performance Strategy:
 * - Preload critical fonts and images above the fold
 * - Prefetch likely navigation targets
 * - DNS prefetch for external services
 * - Optimize resource loading priority
 * 
 * British English: optimisation, prioritise maintained
 */

'use client'

import { useEffect } from 'react'
// Remove Head import for server components

interface ResourcePreloaderProps {
  page?: 'homepage' | 'about' | 'services' | 'admin'
  preloadCriticalImages?: boolean
  prefetchRoutes?: string[]
}

export function ResourcePreloader({ 
  page = 'homepage',
  preloadCriticalImages = true,
  prefetchRoutes = []
}: ResourcePreloaderProps) {
  
  useEffect(() => {
    // Add DNS prefetch and preconnect links
    const addPreconnectLinks = () => {
      const preconnectUrls = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://vercel.com',
        'https://analytics.vercel.com'
      ]
      
      preconnectUrls.forEach((url, index) => {
        const link = document.createElement('link')
        link.rel = index < 2 ? 'preconnect' : 'dns-prefetch'
        link.href = url
        if (url.includes('gstatic')) link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }

    // Preload critical resources programmatically
    preloadCriticalResources(page, preloadCriticalImages)
    addPreconnectLinks()
    
    // Prefetch likely navigation routes
    if (prefetchRoutes.length > 0) {
      prefetchRoutes.forEach(route => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      })
    }

    // CONTEXT7 SOURCE: /vercel/next.js - Critical CSS injection for LCP optimization
    // PERFORMANCE OPTIMIZATION REASON: Inline critical styles to prevent FOUC and improve LCP
    const addCriticalCSS = () => {
      const style = document.createElement('style')
      style.textContent = `
        /* CONTEXT7 SOURCE: /vercel/next.js - Critical above-the-fold styles for LCP optimization */
        .hero-section { 
          min-height: 60vh; 
          contain: layout style;
        }
        .trust-indicators { 
          opacity: 0; 
          animation: fadeIn 0.5s ease-out 0.2s forwards; 
          will-change: opacity;
        }
        @keyframes fadeIn { to { opacity: 1; } }
        
        /* CONTEXT7 SOURCE: /vercel/next.js - CLS prevention with aspect ratio containers */
        .testimonial-card { 
          min-height: 200px; 
          contain: layout;
        }
        .service-card { 
          min-height: 250px; 
          contain: layout;
        }
        .logo-grid img { 
          aspect-ratio: 16/9; 
          object-fit: contain;
          loading: eager;
        }
        
        /* CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized layout containers */
        .page-container {
          contain: layout style;
        }
        .card-grid {
          contain: layout;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        /* CONTEXT7 SOURCE: /vercel/next.js - Motion optimization for reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .trust-indicators {
            animation: none;
            opacity: 1;
          }
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* CONTEXT7 SOURCE: /vercel/next.js - Font optimization to prevent FOIT/FOUT */
        @font-face {
          font-family: 'Source Serif 4';
          font-display: swap;
        }
        @font-face {
          font-family: 'Playfair Display';
          font-display: swap;
        }
      `
      document.head.appendChild(style)
    }

    addCriticalCSS()
  }, [page, preloadCriticalImages, prefetchRoutes])

  return null // Head elements are handled programmatically in useEffect
}

// Programmatic resource preloading function
async function preloadCriticalResources(page: string, preloadImages: boolean) {
  if (!preloadImages || typeof window === 'undefined') return

  const criticalResources: Record<string, string[]> = {
    homepage: [
      '/images/hero/child_book_and_laptop.avif',
      '/images/team/elizabeth-burrows-founder-main.jpg',
      '/images/logos/oxford-university-logo.jpeg',
      '/images/logos/cambridge-university-logo.png',
      '/images/logos/eton-college-logo.avif',
      '/images/logos/harrow-school-logo.avif'
    ],
    about: [
      '/images/team/elizabeth-burrows-founder-alt.jpg',
      '/images/team/founder_headshot.avif',
      '/images/testimonials/schoolguide-testimonial.avif'
    ],
    services: [
      '/images/students/student-child.jpg',
      '/images/students/student-teenager.jpg',
      '/images/students/student-university.jpg',
      '/images/students/student-oxbridge.jpg'
    ]
  }

  const resources = criticalResources[page] || []
  
  // Preload images with high priority
  resources.forEach((src, index) => {
    const img = new Image()
    img.loading = 'eager'
    img.fetchPriority = index < 2 ? 'high' : 'auto' // First 2 images are highest priority
    img.src = src
    
    // Add to browser cache
    img.onload = () => {
      console.log(`✅ Preloaded: ${src}`)
    }
    img.onerror = () => {
      console.warn(`⚠️ Failed to preload: ${src}`)
    }
  })
}

// Hook for dynamic resource preloading based on user behaviour
export function useSmartPreloading() {
  useEffect(() => {
    let preloadTimer: NodeJS.Timeout

    const handleUserInteraction = () => {
      // User is engaged, preload likely next resources
      clearTimeout(preloadTimer)
      preloadTimer = setTimeout(() => {
        preloadLikelyRoutes()
      }, 2000) // Wait 2s after interaction
    }

    const preloadLikelyRoutes = () => {
      const currentPath = window.location.pathname
      const likelyRoutes: Record<string, string[]> = {
        '/': ['/about', '/how-it-works', '/subject-tuition'],
        '/about': ['/expert-educators', '/testimonials'],
        '/how-it-works': ['/subject-tuition', '/homeschooling'],
        '/subject-tuition': ['/11-plus-bootcamps', '/exam-papers']
      }

      const routes = likelyRoutes[currentPath] || []
      routes.forEach(route => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      })
    }

    // Listen for user engagement signals
    const events = ['scroll', 'click', 'keydown', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true })
    })

    return () => {
      clearTimeout(preloadTimer)
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [])
}

export default ResourcePreloader