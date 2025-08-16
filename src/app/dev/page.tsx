// CONTEXT7 SOURCE: /vercel/next.js - Development dashboard page for enhanced developer experience
// DEVELOPMENT TOOLING REASON: Dedicated development environment monitoring and tools access

import { Metadata } from 'next';
import DeveloperDashboard from '@/components/dev/DeveloperDashboard';

// CONTEXT7 SOURCE: /vercel/next.js - Page metadata configuration for development tools
export const metadata: Metadata = {
  title: 'Developer Dashboard - My Private Tutor Online',
  description: 'Development environment monitoring and performance tools',
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Development-only page for enhanced developer experience
 * Development dashboard page providing real-time development metrics and tools
 */
export default function DevelopmentPage() {
  // Only show in development environment
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600">Development dashboard is only available in development environment.</p>
        </div>
      </div>
    );
  }

  return <DeveloperDashboard />;
}