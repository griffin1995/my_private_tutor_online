/**
 * TEMPORARY SIMPLIFIED HOMEPAGE for deployment
 * This file resolves import issues to get Vercel deployment working
 * Original file backed up as page-backup.tsx
 */

"use client"

import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">My Private Tutor Online</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">
            Premium Tutoring Service
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Expert tutoring for the UK's top schools and universities
          </p>
          <p className="text-lg text-slate-500">
            Site temporarily under maintenance. Full functionality will be restored shortly.
          </p>
        </div>
      </main>
      
      <footer className="bg-slate-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>&copy; 2025 My Private Tutor Online. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}