import Image from "next/image";
import { getCurrentSeasonalContent } from "@/lib/seasonal-content";

export default function Home() {
  const seasonalContent = getCurrentSeasonalContent();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">My Private Tutor Online</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="#services" className="text-gray-700 hover:text-gray-900">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={seasonalContent.bgGradient}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 mb-4">
                {seasonalContent.focusArea}
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {seasonalContent.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {seasonalContent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  {seasonalContent.ctaText}
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  View Our Results
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                <Image
                  src="/images/video-placeholders/placeholder_for_introductionary_video.png"
                  alt="Introduction to our tutoring services"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/90 rounded-full p-4 shadow-lg hover:bg-white transition-colors">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Excellence</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our reputation speaks for itself - from royal endorsements to Tatler recognition, 
              we deliver results that matter.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Royal Endorsement</h4>
              <p className="text-gray-600">Trusted by royal families for exceptional educational outcomes</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Tatler Listed</h4>
              <p className="text-gray-600">Featured in Tatler as a premier educational service</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h4>
              <p className="text-gray-600">94% of GCSE students improved by at least 2 grades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">My Private Tutor Online</h5>
              <p className="text-gray-400">
                Exceptional online tutoring trusted by families worldwide.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Services</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Online Tutoring</a></li>
                <li><a href="#" className="hover:text-white">Exam Preparation</a></li>
                <li><a href="#" className="hover:text-white">Academic Support</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Meet the Team</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contact</h6>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@myprivatetutoronline.com</p>
                <p>Phone: +44 (0) 20 1234 5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 My Private Tutor Online. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
