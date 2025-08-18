/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - Demonstration component for synchronized scroll indicator testing
 * DEMO PURPOSE: Shows perfect synchronization between SCROLL text and vertical line with different timing options
 * 
 * This component is for testing and demonstrating the scroll indicator animation synchronization.
 * It provides multiple examples with different speeds and configurations.
 */

"use client"

import { SynchronizedScrollIndicator } from '@/components/ui/synchronized-scroll-indicator'

export function ScrollIndicatorDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-4">
          Synchronized Scroll Indicator Demo
        </h1>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          Demonstration of perfectly synchronized SCROLL text and vertical line animations. 
          Both elements move as one cohesive unit with identical timing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Normal Speed */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-80 relative">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Normal Speed</h3>
            <p className="text-slate-600 text-sm mb-4">Default timing (speed: 1)</p>
            <SynchronizedScrollIndicator 
              show={true}
              className="relative bottom-4 left-1/2 transform -translate-x-1/2"
              text="SCROLL"
              speed={1}
              distance={30}
            />
          </div>

          {/* Fast Speed */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-80 relative">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Fast Speed</h3>
            <p className="text-slate-600 text-sm mb-4">2x faster (speed: 2)</p>
            <SynchronizedScrollIndicator 
              show={true}
              className="relative bottom-4 left-1/2 transform -translate-x-1/2"
              text="SCROLL"
              speed={2}
              distance={30}
            />
          </div>

          {/* Slow Speed */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-80 relative">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Slow Speed</h3>
            <p className="text-slate-600 text-sm mb-4">Half speed (speed: 0.5)</p>
            <SynchronizedScrollIndicator 
              show={true}
              className="relative bottom-4 left-1/2 transform -translate-x-1/2"
              text="SCROLL"
              speed={0.5}
              distance={30}
            />
          </div>

          {/* Large Distance */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-80 relative">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Large Distance</h3>
            <p className="text-slate-600 text-sm mb-4">Longer movement (60px)</p>
            <SynchronizedScrollIndicator 
              show={true}
              className="relative bottom-4 left-1/2 transform -translate-x-1/2"
              text="SCROLL"
              speed={1}
              distance={60}
            />
          </div>

          {/* Custom Text */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-80 relative">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Custom Text</h3>
            <p className="text-slate-600 text-sm mb-4">Different text content</p>
            <SynchronizedScrollIndicator 
              show={true}
              className="relative bottom-4 left-1/2 transform -translate-x-1/2"
              text="EXPLORE"
              speed={1}
              distance={40}
            />
          </div>

          {/* Production Example */}
          <div className="bg-slate-800 rounded-xl shadow-lg p-8 h-80 relative text-white">
            <h3 className="text-xl font-semibold mb-2">Production Example</h3>
            <p className="text-slate-300 text-sm mb-4">Hero section styling</p>
            <SynchronizedScrollIndicator 
              show={true}
              className="relative bottom-4 left-1/2 transform -translate-x-1/2"
              text="SCROLL"
              speed={1}
              distance={40}
            />
          </div>
          
        </div>

        <div className="mt-16 bg-slate-800 text-white rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Synchronization Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-300">✓ Perfect Timing</h3>
              <p className="text-slate-300">Both SCROLL text and vertical line use identical animation variants ensuring perfect synchronization.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-300">✓ Hardware Accelerated</h3>
              <p className="text-slate-300">Transform-based animations for smooth 60fps performance with GPU acceleration.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-300">✓ Accessibility</h3>
              <p className="text-slate-300">Respects prefers-reduced-motion for users who need less animation.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-300">✓ Customizable</h3>
              <p className="text-slate-300">Speed, distance, text, and styling can all be easily customized while maintaining synchronization.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}