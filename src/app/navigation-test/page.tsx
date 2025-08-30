/**
 * NAVIGATION TEST PAGE - MY PRIVATE TUTOR ONLINE
 * Created: January 2025
 * Purpose: Test and showcase the new navigation component
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Page component patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for page components
 */

"use client"

import { Navigation } from '@/components/navigation/Navigation'
import { motion } from 'framer-motion'

export default function NavigationTestPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section to test transparent navigation */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              New Navigation System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Testing the rebuilt navigation with modern patterns and best practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary-700 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105">
                Explore Features
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections to test scroll behavior */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Responsive Design",
                description: "Fully responsive navigation that works seamlessly across all devices and screen sizes."
              },
              {
                title: "Smooth Animations",
                description: "Framer Motion powered animations for delightful user interactions and transitions."
              },
              {
                title: "Accessibility First",
                description: "Built with Radix UI for complete keyboard navigation and screen reader support."
              },
              {
                title: "Smart Scroll Detection",
                description: "Navigation adapts based on scroll position for optimal visibility and aesthetics."
              },
              {
                title: "Nested Dropdowns",
                description: "Support for multi-level navigation with smooth dropdown animations."
              },
              {
                title: "Active Link Detection",
                description: "Automatically highlights the current page in the navigation menu."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Implementation Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Implementation</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Next.js 15 Integration</h3>
              <p className="text-gray-600">
                Built using Next.js 15 App Router with client-side navigation, prefetching, and the latest Link component patterns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Radix UI Components</h3>
              <p className="text-gray-600">
                Leverages Radix UI's NavigationMenu and Dialog components for accessible, unstyled primitives with full keyboard support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Framer Motion Animations</h3>
              <p className="text-gray-600">
                Smooth, performant animations using Framer Motion's variants system and scroll-based triggers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">TypeScript Type Safety</h3>
              <p className="text-gray-600">
                Fully typed with TypeScript interfaces for navigation structure and component props.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Menu Test Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Mobile Experience</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl border border-primary-100">
              <h3 className="text-2xl font-semibold mb-4 text-primary-700">Test on Mobile</h3>
              <p className="text-gray-700 mb-6">
                Resize your browser window or use device emulation to test the mobile navigation experience. 
                The menu transforms into a slide-out drawer with nested accordion navigation.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  Slide-out drawer animation with backdrop
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  Accordion-style nested navigation
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  Touch-optimized tap targets
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  Automatic close on route change
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Test Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Scroll Behavior</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-8">
              Scroll up and down to see how the navigation adapts. It transitions from transparent to solid white 
              with a subtle shadow when you scroll past the threshold.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium text-gray-700">Navigation is scroll-aware</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer placeholder for scroll testing */}
      <footer className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">© 2025 My Private Tutor Online. Navigation Test Page.</p>
        </div>
      </footer>

    </>
  )
}