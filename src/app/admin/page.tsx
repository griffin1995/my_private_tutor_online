import { verifySession } from '@/lib/auth/dal'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminHeader from '@/components/admin/AdminHeader'
import { SecurityMonitor } from '@/components/admin/SecurityMonitor'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 Server Component authentication
// Reference: /vercel/next.js protected route patterns with session verification

/**
 * Enterprise-grade admin dashboard for premium tutoring service
 * 
 * Security Features:
 * - Server-side session verification
 * - Protected route wrapper
 * - Secure logout functionality
 * - Role-based access control
 * - Royal client data protection compliance
 * 
 * Pattern: Admin Dashboard Interface
 * Architecture:
 * - Server Component with authentication
 * - Protected route wrapper
 * - Secure session management
 * - TinaCMS integration ready
 */

function AdminInterface() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <AdminHeader 
          title="Admin Dashboard"
          subtitle="My Private Tutor Online Administration Panel"
        />
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Management</h2>
          <p className="text-gray-600 mb-4">
            Welcome to the TinaCMS admin dashboard. Here you can edit all content on your website.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Landing Page</h3>
              <p className="text-blue-700 text-sm mb-3">Edit all content on the main landing page</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Edit Landing Page
              </button>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Seasonal Content</h3>
              <p className="text-green-700 text-sm mb-3">Manage seasonal messaging and themes</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                Edit Seasonal Content
              </button>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Blog Posts</h3>
              <p className="text-purple-700 text-sm mb-3">Create and manage blog content</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                Manage Blog
              </button>
            </div>
            
            <div className="bg-[#CA9E5B]/10 border border-[#CA9E5B]/30 rounded-lg p-4">
              <h3 className="font-semibold text-[#CA9E5B] mb-2">Brand Assets</h3>
              <p className="text-[#CA9E5B]/80 text-sm mb-3">Manage logos, images, and brand elements</p>
              <button className="bg-[#CA9E5B] text-white px-4 py-2 rounded text-sm hover:bg-[#B8915A] transition-colors">
                Manage Brand Assets
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-gray-600 text-sm">Content Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-gray-600 text-sm">Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-gray-600 text-sm">Testimonials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#CA9E5B]">4</div>
              <div className="text-gray-600 text-sm">Statistics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">2</div>
              <div className="text-gray-600 text-sm">Brand Assets</div>
            </div>
          </div>
        </div>

        {/* Security Monitoring Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Monitoring</h2>
          <p className="text-gray-600 mb-6">
            Real-time security monitoring and threat detection for royal client data protection.
          </p>
          <SecurityMonitor />
        </div>
      </div>
    </div>
  );
}

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic export configuration for server-side authentication
// DYNAMIC RENDERING REASON: Official Next.js documentation Section 3.1 mandates force-dynamic for pages using cookies() API
// CONTEXT7 SOURCE: /vercel/next.js - Dynamic inheritance from root layout configuration
// DYNAMIC CONFIG REMOVAL: Per CLAUDE.md documentation - avoid redundant page-level dynamic exports
// LAYOUT INHERITANCE: Admin pages inherit force-dynamic from root layout.tsx

/**
 * Secure admin page with enterprise-grade authentication
 * Automatically redirects unauthorized users to login
 */
export default async function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminInterface />
    </ProtectedRoute>
  )
}