/**
 * CONTEXT7 SOURCE: /vercel/next.js - App Router global error page component
 * ERROR HANDLING REASON: Global error page for App Router root-level errors
 * IMPLEMENTATION: Build-safe global error component following App Router patterns
 */

'use client'

import React from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - App Router global error component pattern
// ERROR REASON: Official Next.js 15 App Router pattern for root-level error pages
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en-GB">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-2xl mx-auto p-8 text-center">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12">
              <div className="flex justify-center mb-6">
                <div className="text-6xl font-bold text-red-500">⚠️</div>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Application Error
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We apologise for the inconvenience. Our premium tutoring service
                has encountered a critical error.
              </p>

              <div className="flex flex-col gap-4 justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center justify-center px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Return Home
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  Error ID: {error.digest || 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}