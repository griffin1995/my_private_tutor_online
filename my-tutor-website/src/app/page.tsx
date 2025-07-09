'use client';

import Image from "next/image";
import { getCurrentSeasonalContent } from "@/lib/seasonal-content";
import landingPageData from "@/content/landing-page.json";
import seasonalContentData from "@/content/seasonal-content.json";
import { useState, useEffect } from "react";
import Wave from "react-wavify";

export default function Home() {
  const currentSeason = getCurrentSeasonalContent().season;
  const seasonalContent = seasonalContentData.seasons[currentSeason];
  const data = landingPageData;
  
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStudentCount, setCurrentStudentCount] = useState(0);
  const [currentSuccessRate, setCurrentSuccessRate] = useState(0);
  
  // Toggle between hero versions for client presentation
  // Change this value to 'light' or 'dark' to preview different hero styles
  const [heroVersion] = useState<'light' | 'dark'>('light');
  
  // Personalisation
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // ===============================================
  // CENTRALIZED SECTION COLOR VARIABLES
  // ===============================================
  // 🎨 COLOR MANAGEMENT SYSTEM
  // 
  // This centralized system ensures perfect color consistency between:
  // 1. Section background colors (CSS variable: var(--section-color))
  // 2. Wavy transition overlays (same CSS variable: var(--section-color))
  //
  // 🔄 HOW TO CHANGE SECTION COLORS:
  // 1. Update the rgbValue for the section 
  // 2. The CSS variable automatically updates BOTH background AND wavy overlays!
  //
  // 💡 WHY CSS VARIABLES:
  // - ZERO color mismatches - same CSS variable used everywhere
  // - Single source of truth for each section's color scheme
  // - Perfect color consistency guaranteed
  // - Modern CSS approach with dynamic updates
  //
  // 📝 USAGE EXAMPLE:
  // To change Academic Services from blue to purple:
  // 1. Change: rgbValue: '147, 197, 253' → '196, 181, 253'
  // 2. The --services-color CSS variable automatically updates both section AND wavy overlay!
  
  const sectionColors = {
    // Hero section colors (light and dark versions) - LIGHTEST ROYAL BLUE
    heroLight: {
      cssVariable: '--hero-color',
      rgbValue: '239, 246, 255' // blue-50 RGB values (no 'rgb()' wrapper for CSS vars)
    },
    heroDark: {
      cssVariable: '--hero-color',
      rgbValue: '239, 246, 255' // blue-50 RGB values (no 'rgb()' wrapper for CSS vars)
    },
    
    // Trust Indicators section - VERY LIGHT ROYAL BLUE
    trustIndicators: {
      cssVariable: '--trust-color',
      rgbValue: '219, 234, 254' // blue-100 RGB values
    },
    
    // Student Journey Timeline section - LIGHT ROYAL BLUE
    studentJourney: {
      cssVariable: '--journey-color',
      rgbValue: '191, 219, 254' // blue-200 RGB values
    },
    
    // Academic Services section - MEDIUM LIGHT ROYAL BLUE
    academicServices: {
      cssVariable: '--services-color',
      rgbValue: '147, 197, 253' // blue-300 RGB values
    },
    
    // Results section - SLIGHTLY DEEPER ROYAL BLUE
    results: {
      cssVariable: '--results-color',
      rgbValue: '96, 165, 250' // blue-400 RGB values
    },
    
    // Testimonials section - DEEPER LIGHT ROYAL BLUE
    testimonials: {
      cssVariable: '--testimonials-color',
      rgbValue: '59, 130, 246' // blue-500 RGB values
    },
    
    // Contact section - DEEPEST LIGHT ROYAL BLUE
    contact: {
      cssVariable: '--contact-color',
      rgbValue: '37, 99, 235' // blue-600 RGB values
    }
  };

  // 🎨 SECTION PADDING CONFIGURATION
  // Centralized padding values for easy adjustment
  const sectionPadding = {
    top: '70px',    // Consistent top padding for all sections
    bottom: '180px' // Consistent bottom padding for all sections
  };

  // Set CSS custom properties dynamically
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(sectionColors).forEach(([, color]) => {
      root.style.setProperty(color.cssVariable, `rgb(${color.rgbValue})`);
    });
  }, []);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Animated counters
    const studentTarget = 2847;
    const successTarget = 98;
    
    const studentInterval = setInterval(() => {
      setCurrentStudentCount(prev => {
        if (prev >= studentTarget) {
          clearInterval(studentInterval);
          return studentTarget;
        }
        return prev + Math.ceil(studentTarget / 100);
      });
    }, 30);
    
    const successInterval = setInterval(() => {
      setCurrentSuccessRate(prev => {
        if (prev >= successTarget) {
          clearInterval(successInterval);
          return successTarget;
        }
        return prev + 1;
      });
    }, 50);
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(studentInterval);
      clearInterval(successInterval);
      clearInterval(timeInterval);
    };
  }, []);
  
  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Image
                src={data.header.logo.main}
                alt={data.header.logo.alt}
                width={data.header.logo.width}
                height={data.header.logo.height}
                priority
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              {data.header.navigation.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="text-gray-700 hover:text-blue-800 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-800 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Light Version */}
      {heroVersion === 'light' && (
        <section className="relative overflow-hidden min-h-screen flex items-center" style={{backgroundColor: `var(${sectionColors.heroLight.cssVariable})`}}>
          {/* Premium Background decoration with sophisticated patterns */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-white to-blue-50/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100/5 via-transparent to-blue-100/5"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-slate-100/20 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-slate-50/30 to-blue-50/30 rounded-full blur-3xl animate-float"></div>
          
          {/* Sophisticated floating elements - minimalist approach */}
          <div className="absolute top-20 right-20 w-2 h-2 bg-slate-300 rounded-full animate-bounce opacity-20 animation-delay-100"></div>
          <div className="absolute top-40 left-20 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-30 animation-delay-300"></div>
          <div className="absolute bottom-40 right-40 w-3 h-3 bg-slate-200 rounded-full animate-bounce opacity-15 animation-delay-600"></div>
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-25 animation-delay-200"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-slate-300 rounded-full animate-bounce opacity-20 animation-delay-400"></div>
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-30 animation-delay-500"></div>
          <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-slate-200 rounded-full animate-bounce opacity-15 animation-delay-700"></div>
          <div className="absolute top-80 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-25 animation-delay-800"></div>
          <div className="absolute bottom-80 right-1/2 w-1 h-1 bg-slate-300 rounded-full animate-bounce opacity-20 animation-delay-100"></div>
          <div className="absolute top-96 right-12 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-25 animation-delay-900"></div>
          <div className="absolute bottom-96 left-12 w-3 h-3 bg-slate-200 rounded-full animate-bounce opacity-15 animation-delay-600"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                {/* Personalised greeting - premium styling */}
                <div className={`inline-flex items-center bg-gradient-to-r from-white/90 to-slate-50/90 backdrop-blur-lg border border-slate-200/30 px-8 py-4 rounded-full text-sm font-medium text-slate-600 mb-8 shadow-xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
                  {getTimeBasedGreeting()}, {seasonalContent.focusArea}
                </div>
                
                {/* Premium typography with sophisticated animations */}
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extralight text-gray-900 mb-10 leading-tight tracking-tight transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-slate-900 bg-clip-text text-transparent bg-size-200 animate-gradient-x font-thin">
                    Exceptional
                  </span>
                  <br />
                  <span className="text-slate-800 relative font-extralight">
                    Online Tutoring
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-slate-800 to-blue-700 transition-all duration-1000 ${isLoaded ? 'w-full' : 'w-0'}`}></span>
                  </span>
                </h1>
                
                <p className={`text-xl sm:text-2xl text-slate-600 mb-10 leading-relaxed font-light max-w-2xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {seasonalContent.description}
                </p>
                
                {/* Premium statistics with sophisticated glass morphism */}
                <div className={`flex flex-wrap gap-8 mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {currentStudentCount.toLocaleString()}+
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Students Helped</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {currentSuccessRate}%
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Success Rate</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      5★
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Average Rating</div>
                  </div>
                </div>
                
                {/* Premium CTA buttons with sophisticated micro-interactions */}
                <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button className="group relative bg-gradient-to-r from-slate-800 to-slate-700 text-white px-10 py-5 rounded-2xl font-medium hover:from-slate-900 hover:to-slate-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden border border-slate-700/20">
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center text-lg">
                      {seasonalContent.ctaText}
                      <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  <button className="group relative border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:scale-105 overflow-hidden">
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-700 group-hover:w-full transition-all duration-300"></span>
                    <span className="relative text-lg">{data.hero.secondaryButtonText}</span>
                  </button>
                </div>
                
                {/* Trust indicators with social proof */}
                <div className={`mt-12 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>No Setup Fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Cancel Anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Money-Back Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-6">
                <div className={`relative transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  {/* Glass morphism video container - larger */}
                  <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl overflow-hidden aspect-video shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                    <Image
                      src={data.hero.videoPlaceholder}
                      alt={data.hero.videoPlaceholderAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-white/95 backdrop-blur-sm rounded-full p-6 shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 group-hover:shadow-3xl">
                        <svg className="w-10 h-10 text-blue-800 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Floating decoration elements */}
                  <div className="absolute -z-10 top-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -z-10 -bottom-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full opacity-60 animate-pulse animation-delay-300"></div>
                  <div className="absolute -z-10 top-1/2 -right-12 w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-40 animate-bounce animation-delay-600"></div>
                </div>
                
                {/* Testimonial preview popup - repositioned outside video area */}
                <div className={`mt-8 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20 max-w-sm animate-float transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-800">JM</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Jessica M.</div>
                      <div className="text-xs text-gray-500">A-Level Student</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">&ldquo;Improved my grades from C to A* in just 3 months!&rdquo;</p>
                  <div className="flex text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section - Dark Version */}
      {heroVersion === 'dark' && (
        <section className="relative overflow-hidden min-h-screen flex items-center" style={{backgroundColor: `var(${sectionColors.heroDark.cssVariable})`}}>
          {/* Enhanced Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-indigo-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Floating elements - more dots for enhanced visual appeal */}
          <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400/40 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-40 left-20 w-4 h-4 bg-indigo-400/40 rounded-full animate-bounce opacity-60 animation-delay-300"></div>
          <div className="absolute bottom-40 right-40 w-8 h-8 bg-blue-300/30 rounded-full animate-bounce opacity-60 animation-delay-600"></div>
          <div className="absolute top-32 left-1/3 w-3 h-3 bg-blue-500/40 rounded-full animate-bounce opacity-50 animation-delay-200"></div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-indigo-400/40 rounded-full animate-bounce opacity-70 animation-delay-400"></div>
          <div className="absolute top-60 right-1/3 w-4 h-4 bg-blue-400/40 rounded-full animate-bounce opacity-60 animation-delay-500"></div>
          <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-blue-300/30 rounded-full animate-bounce opacity-50 animation-delay-700"></div>
          <div className="absolute top-80 left-1/2 w-3 h-3 bg-indigo-500/40 rounded-full animate-bounce opacity-40 animation-delay-800"></div>
          <div className="absolute bottom-80 right-1/2 w-4 h-4 bg-blue-400/40 rounded-full animate-bounce opacity-60 animation-delay-100"></div>
          <div className="absolute top-96 right-12 w-5 h-5 bg-blue-500/40 rounded-full animate-bounce opacity-50 animation-delay-900"></div>
          <div className="absolute bottom-96 left-12 w-7 h-7 bg-indigo-300/30 rounded-full animate-bounce opacity-40 animation-delay-600"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                {/* Personalised greeting */}
                <div className={`inline-flex items-center bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-full text-sm font-medium text-blue-200 mb-6 backdrop-blur-lg shadow-lg transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                  {getTimeBasedGreeting()}, {seasonalContent.focusArea}
                </div>
                
                {/* Enhanced typography with animations */}
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-light mb-8 leading-tight tracking-tight transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-white bg-clip-text text-transparent bg-size-200 animate-gradient-x font-bold">
                    Exceptional
                  </span>
                  <br />
                  <span className="text-white relative">
                    Online Tutoring
                    <span className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-1000 ${isLoaded ? 'w-full' : 'w-0'}`}></span>
                  </span>
                </h1>
                
                <p className={`text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed font-light max-w-2xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {seasonalContent.description}
                </p>
                
                {/* Live statistics with enhanced glass morphism */}
                <div className={`flex flex-wrap gap-6 mb-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="bg-blue-800/30 backdrop-blur-lg border border-blue-400/20 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                      {currentStudentCount.toLocaleString()}+
                    </div>
                    <div className="text-sm text-blue-200 font-medium">Students Helped</div>
                  </div>
                  <div className="bg-blue-800/30 backdrop-blur-lg border border-blue-400/20 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                      {currentSuccessRate}%
                    </div>
                    <div className="text-sm text-blue-200 font-medium">Success Rate</div>
                  </div>
                  <div className="bg-blue-800/30 backdrop-blur-lg border border-blue-400/20 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                      5★
                    </div>
                    <div className="text-sm text-blue-200 font-medium">Average Rating</div>
                  </div>
                </div>
                
                {/* Enhanced CTA buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button className="group relative bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center">
                      {seasonalContent.ctaText}
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  <button className="group relative border-2 border-blue-400/50 text-blue-200 px-8 py-4 rounded-xl font-semibold hover:bg-blue-800/50 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm hover:scale-105 overflow-hidden">
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    <span className="relative">{data.hero.secondaryButtonText}</span>
                  </button>
                </div>
                
                {/* Trust indicators */}
                <div className={`mt-12 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>No Setup Fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Cancel Anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Money-Back Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-6">
                <div className={`relative transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  {/* Enhanced glass morphism video container - larger */}
                  <div className="relative bg-blue-800/30 backdrop-blur-lg rounded-3xl overflow-hidden aspect-video shadow-2xl border border-blue-400/20 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                    <Image
                      src={data.hero.videoPlaceholder}
                      alt={data.hero.videoPlaceholderAlt}
                      fill
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-blue-600/90 backdrop-blur-sm rounded-full p-6 shadow-2xl hover:bg-blue-500 hover:scale-110 transition-all duration-300 group-hover:shadow-3xl border border-blue-400/30">
                        <svg className="w-10 h-10 text-white group-hover:text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Enhanced floating decoration elements */}
                  <div className="absolute -z-10 top-8 -right-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute -z-10 -bottom-6 -left-6 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl animate-pulse animation-delay-300"></div>
                  <div className="absolute -z-10 top-1/2 -right-12 w-16 h-16 bg-gradient-to-br from-blue-300/30 to-indigo-300/30 rounded-full opacity-40 animate-bounce animation-delay-600"></div>
                </div>
                
                {/* Enhanced testimonial preview popup - repositioned outside video area */}
                <div className={`mt-8 bg-blue-900/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-blue-400/30 max-w-sm animate-float transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-900">JM</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Jessica M.</div>
                      <div className="text-xs text-blue-200">A-Level Student</div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-100 italic">&ldquo;Improved my grades from C to A* in just 3 months!&rdquo;</p>
                  <div className="flex text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* Wavy bottom edge */}
        <div className="absolute bottom-0 left-0 w-full z-20" style={{height: '80px'}}>
          <Wave
            fill={`var(${sectionColors.trustIndicators.cssVariable})`}
            paused={false}
            options={{
              height: 25,
              amplitude: 25,
              speed: 0.15,
              points: 3
            }}
            style={{ height: '80px' }}
          />
        </div>
        </section>
      )}

      {/* Trust Indicators - Revolutionary Interactive Design */}
      <section className="relative overflow-hidden" style={{backgroundColor: `var(${sectionColors.trustIndicators.cssVariable})`, paddingTop: sectionPadding.top, paddingBottom: sectionPadding.bottom}}>
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-slate-100/15 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-50/20 to-slate-50/20 rounded-full blur-2xl animate-pulse animation-delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className={`inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full text-sm font-medium text-blue-800 mb-8 shadow-lg transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Why Choose Excellence
            </div>
            <h3 className={`text-5xl sm:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent bg-size-200 animate-gradient-x font-bold">
                {data.trustIndicators.sectionTitle}
              </span>
            </h3>
            <p className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {data.trustIndicators.sectionDescription}
            </p>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto mt-8 rounded-full transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>
          
          {/* Revolutionary Interactive Trust Indicators */}
          <div className="relative max-w-5xl mx-auto">
            {/* Central Interactive Hub */}
            <div className="relative flex items-center justify-center mb-16">
              <div className={`relative group transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                {/* Orbital Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200/40 w-80 h-80 animate-spin-slow"></div>
                <div className="absolute inset-0 rounded-full border border-indigo-200/30 w-96 h-96 animate-reverse-spin-slow"></div>
                <div className="absolute inset-0 rounded-full border border-purple-200/20 w-[28rem] h-[28rem] animate-spin-slow animation-delay-1000"></div>
                
                {/* Central Core */}
                <div className="relative z-10 w-32 h-32 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 group">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-700">
                    <div className="text-4xl">🏆</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
                
                {/* Floating Achievement Badges */}
                <div className="absolute -top-8 -right-8 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
                  <div className="text-lg font-bold text-yellow-900">★</div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-green-500 rounded-full p-3 shadow-lg animate-bounce animation-delay-500">
                  <div className="text-lg font-bold text-green-900">✓</div>
                </div>
                <div className="absolute -top-8 -left-8 bg-purple-500 rounded-full p-3 shadow-lg animate-bounce animation-delay-1000">
                  <div className="text-lg font-bold text-purple-900">👑</div>
                </div>
              </div>
            </div>
            
            {/* Interactive Trust Indicators - Geometric Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {data.trustIndicators.indicators.map((indicator, index) => {
                const colors = ['blue', 'indigo', 'purple'];
                const rotations = ['rotate-12', '-rotate-12', 'rotate-6'];
                
                return (
                  <div 
                    key={index}
                    className={`group relative transition-all duration-1000 delay-${600 + index * 200} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                  >
                    {/* Geometric Container */}
                    <div className={`relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/60 hover:border-${colors[index]}-200/60 transform hover:-translate-y-4 hover:scale-105 group overflow-hidden`}>
                      
                      {/* Geometric Shape Background */}
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-${colors[index]}-100/30 to-transparent ${rotations[index]} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                      
                      {/* Animated Border */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-${colors[index]}-400/20 via-${colors[index]}-500/20 to-${colors[index]}-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Interactive Icon Container */}
                      <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-6 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 border border-slate-200/50 group-hover:border-blue-300/50">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
                            {index === 0 && (
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z" />
                              </svg>
                            )}
                            {index === 1 && (
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            )}
                            {index === 2 && (
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        
                        {/* Dynamic Progress Ring */}
                        <div className="relative mb-4">
                          <svg className="w-16 h-16 mx-auto -mt-8 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
                            <circle
                              className={`text-${colors[index]}-200`}
                              strokeWidth="4"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                            <circle
                              className={`text-${colors[index]}-600`}
                              strokeWidth="4"
                              strokeDasharray="251.2"
                              strokeDashoffset="62.8"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                        
                        <h4 className={`text-xl font-bold text-gray-900 mb-3 group-hover:text-${colors[index]}-900 transition-colors duration-300 relative`}>
                          {indicator.title}
                          <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-${colors[index]}-800 to-${colors[index]}-600 group-hover:w-full transition-all duration-500`}></span>
                        </h4>
                        
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm mb-4">
                          {indicator.description}
                        </p>
                        
                        {/* Interactive Verification Badge */}
                        <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-${colors[index]}-50 to-${colors[index]}-100 px-4 py-2 rounded-full border border-${colors[index]}-200/50 group-hover:from-${colors[index]}-100 group-hover:to-${colors[index]}-200 transition-all duration-300`}>
                          <div className={`w-2 h-2 bg-${colors[index]}-500 rounded-full animate-pulse`}></div>
                          <span className={`text-xs font-medium text-${colors[index]}-800`}>Verified Excellence</span>
                        </div>
                      </div>
                      
                      {/* Dynamic Particle Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className={`absolute top-4 left-4 w-1 h-1 bg-${colors[index]}-400 rounded-full animate-ping`}></div>
                        <div className={`absolute top-8 right-8 w-1 h-1 bg-${colors[index]}-500 rounded-full animate-ping animation-delay-200`}></div>
                        <div className={`absolute bottom-4 left-8 w-1 h-1 bg-${colors[index]}-600 rounded-full animate-ping animation-delay-400`}></div>
                        <div className={`absolute bottom-8 right-4 w-1 h-1 bg-${colors[index]}-400 rounded-full animate-ping animation-delay-600`}></div>
                      </div>
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 rounded-3xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Interactive Connection Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <svg className="w-full h-full" viewBox="0 0 1000 600">
                <path
                  d="M500 150 L200 400 M500 150 L500 400 M500 150 L800 400"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.5}} />
                    <stop offset="50%" style={{stopColor: '#6366f1', stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0.5}} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          {/* Dynamic Stats Footer */}
          <div className="mt-20 text-center">
            <div className={`inline-flex items-center gap-8 bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-xl border border-white/40 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Global Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse animation-delay-300"></div>
                <span className="text-sm font-medium text-gray-700">Premium Excellence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse animation-delay-600"></div>
                <span className="text-sm font-medium text-gray-700">Outstanding Results</span>
              </div>
            </div>
          </div>
        </div>
        {/* Wavy bottom edge transitioning to Student Journey */}
        <div className="absolute bottom-0 left-0 w-full z-20" style={{height: '80px'}}>
          <Wave
            fill={`var(${sectionColors.studentJourney.cssVariable})`}
            paused={false}
            options={{
              height: 25,
              amplitude: 25,
              speed: 0.12,
              points: 4
            }}
            style={{ height: '80px' }}
          />
        </div>
      </section>

      {/* Student Journey Timeline Section */}
      <section className="relative overflow-hidden" style={{backgroundColor: `var(${sectionColors.studentJourney.cssVariable})`, paddingTop: sectionPadding.top, paddingBottom: sectionPadding.bottom}}>
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-100/20 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-100/20 to-transparent rounded-full blur-3xl animate-float animation-delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full text-sm font-medium text-blue-800 mb-8 shadow-lg transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              {data.studentJourney.sectionSubtitle}
            </div>
            <h3 className={`text-5xl sm:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent bg-size-200 animate-gradient-x font-bold">
                {data.studentJourney.sectionTitle}
              </span>
            </h3>
            <p className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {data.studentJourney.sectionDescription}
            </p>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto mt-8 rounded-full transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>

          {/* Timeline Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 transform -translate-x-1/2 hidden lg:block"></div>
            
            {/* Timeline Dots */}
            {data.studentJourney.steps.map((_, index) => (
              <div key={index} className={`absolute left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 hidden lg:block animate-pulse shadow-lg`}
                style={{ top: `${20 + (index * 60 / data.studentJourney.steps.length)}%`, animationDelay: `${index * 200}ms` }}
              ></div>
            ))}
            
            <div className="space-y-24">
              {data.studentJourney.steps.map((step, index) => (
                <div key={index} className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2'}`}>
                  {/* Step Card */}
                  <div className={`group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-white/40 hover:border-blue-200/60 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}
                    style={{ transitionDelay: `${500 + index * 200}ms` }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-32 h-32 bg-gradient-to-${index % 2 === 0 ? 'bl' : 'br'} from-blue-100/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Step Content */}
                    <div className="relative z-10 p-8">
                      <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                        {/* Step Icon */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 border border-slate-200/50 group-hover:border-blue-300/50">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
                                {index === 0 && (
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                  </svg>
                                )}
                                {index === 1 && (
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                  </svg>
                                )}
                                {index === 2 && (
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                  </svg>
                                )}
                                {index === 3 && (
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                  </svg>
                                )}
                                {index === 4 && (
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-blue-300/50 rounded-2xl w-20 h-20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                            
                            {/* Step Number */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                              {step.step}
                            </div>
                          </div>
                        </div>
                        
                        {/* Step Content */}
                        <div className="flex-1">
                          <div className={`${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                            {/* Duration Badge */}
                            <div className={`inline-flex items-center bg-gradient-to-r from-green-50 to-green-100 border border-green-200/50 px-4 py-2 rounded-full text-xs font-medium text-green-800 mb-3 ${index % 2 === 0 ? '' : 'lg:ml-auto'}`}>
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                              {step.duration}
                            </div>
                            
                            <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300 relative">
                              {step.title}
                              <span className={`absolute bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-800 to-blue-600 group-hover:w-full transition-all duration-500 ${index % 2 === 0 ? 'left-0' : 'right-0'}`}></span>
                            </h4>
                            
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-lg">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connecting Line to Timeline */}
                    <div className={`absolute top-1/2 w-12 h-0.5 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-blue-300 to-transparent transform -translate-y-1/2 hidden lg:block ${index % 2 === 0 ? '-right-12' : '-left-12'}`}></div>
                    
                    {/* Shimmer effect */}
                    <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 ${index % 2 === 0 ? 'translate-x-full group-hover:translate-x-[-200%]' : '-translate-x-full group-hover:translate-x-[200%]'} transition-transform duration-1000`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Wavy bottom edge transitioning to Academic Services */}
        <div className="absolute bottom-0 left-0 w-full z-20" style={{height: '80px'}}>
          <Wave
            fill={`var(${sectionColors.academicServices.cssVariable})`}
            paused={false}
            options={{
              height: 25,
              amplitude: 25,
              speed: 0.12,
              points: 4
            }}
            style={{ height: '80px' }}
          />
        </div>
      </section>

      {/* Academic Services - Premium Modern Design */}
      <section id="services" className="relative overflow-hidden" style={{backgroundColor: `var(${sectionColors.academicServices.cssVariable})`, paddingTop: sectionPadding.top, paddingBottom: sectionPadding.bottom}}>
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-slate-100/20 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-50/25 to-slate-50/25 rounded-full blur-2xl animate-pulse animation-delay-500"></div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-32 right-20 w-4 h-4 bg-blue-300 rounded-full animate-bounce opacity-40 animation-delay-100"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-indigo-300 rounded-full animate-bounce opacity-50 animation-delay-700"></div>
        <div className="absolute top-48 left-1/3 w-5 h-5 bg-violet-300 rounded-full animate-bounce opacity-30 animation-delay-400"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className={`inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full text-sm font-medium text-blue-800 mb-8 shadow-lg transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Premium Academic Excellence
            </div>
            <h3 className={`text-5xl sm:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent bg-size-200 animate-gradient-x font-bold">
                {data.services.sectionTitle}
              </span>
            </h3>
            <p className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {data.services.sectionDescription}
            </p>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto mt-8 rounded-full transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>
          
          {/* Alternating Row Layout - Each Service */}
          <div className="space-y-24">
            {data.services.services.map((service, index) => {
              const isEven = index % 2 === 0;
              const serviceColors = ['blue', 'indigo', 'purple'];
              const serviceColor = serviceColors[index];
              
              return (
                <div 
                  key={index} 
                  className={`group relative transition-all duration-1000 delay-${500 + index * 200} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                >
                  {/* Service Row Container */}
                  <div className={`relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/40 hover:border-${serviceColor}-200/60 overflow-hidden`}>
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className={`absolute ${isEven ? 'top-0 right-0' : 'top-0 left-0'} w-64 h-64 bg-gradient-to-${isEven ? 'bl' : 'br'} from-${serviceColor}-100/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                    
                    {/* Service Content - Alternating Layout */}
                    <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                      
                      {/* Service Icon Section */}
                      <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'} text-center lg:text-${isEven ? 'left' : 'right'}`}>
                        <div className="relative inline-block">
                          {/* Main Icon Container */}
                          <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-500 shadow-2xl group-hover:shadow-3xl transform group-hover:scale-110 border border-slate-200/50 group-hover:border-blue-300/50">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-lg">
                              {index === 0 && (
                                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              )}
                              {index === 1 && (
                                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                              )}
                              {index === 2 && (
                                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>
                              )}
                            </div>
                          </div>
                          
                          {/* Glowing Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-2xl w-32 h-32 lg:w-40 lg:h-40 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                          
                          {/* Elegant Corner Accent */}
                          <div className={`absolute -top-1 -${isEven ? 'right' : 'left'}-1 w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg`}></div>
                          <div className={`absolute -bottom-1 -${isEven ? 'left' : 'right'}-1 w-3 h-3 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-500 shadow-lg`}></div>
                          
                          {/* Premium Badge */}
                          <div className={`absolute -top-3 -${isEven ? 'left' : 'right'}-3 w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-slate-600`}>
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Service Number */}
                        <div className="mt-6 inline-flex items-center bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/50 px-4 py-2 rounded-full shadow-sm">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          <span className="text-sm font-medium text-slate-700">Programme {index + 1}</span>
                        </div>
                      </div>
                      
                      {/* Service Content Section */}
                      <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className={`${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                          {/* Service Title */}
                          <h4 className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-6 group-hover:text-${serviceColor}-900 transition-colors duration-300 relative`}>
                            {service.title}
                            <span className={`absolute bottom-0 w-0 h-0.5 bg-gradient-to-r from-${serviceColor}-800 to-${serviceColor}-600 group-hover:w-full transition-all duration-500 ${isEven ? 'left-0' : 'right-0'}`}></span>
                          </h4>
                          
                          {/* Service Description */}
                          <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {service.description}
                          </p>
                          
                          {/* Enhanced Features List */}
                          <ul className="space-y-4 mb-8">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className={`flex items-center text-gray-700 transform transition-all duration-300 group-hover:${isEven ? 'translate-x-2' : '-translate-x-2'} group-hover:text-${serviceColor}-700 ${isEven ? 'justify-start' : 'lg:justify-end'}`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                              >
                                <div className={`w-6 h-6 bg-gradient-to-r from-${serviceColor}-500 to-${serviceColor}-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 ${isEven ? 'mr-3' : 'lg:ml-3 lg:order-2'} flex-shrink-0`}>
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className={`font-medium group-hover:font-semibold transition-all duration-300 ${isEven ? 'lg:order-1' : 'lg:order-1'}`}>
                                  {feature.feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                          
                          {/* Enhanced CTA Button */}
                          {service.ctaText && (
                            <div className={`relative ${isEven ? '' : 'lg:text-right'}`}>
                              <a 
                                href={service.ctaLink} 
                                className="inline-flex items-center bg-gradient-to-r from-blue-800 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-900 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 group/btn relative overflow-hidden"
                              >
                                {/* Button shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-transform duration-700"></div>
                                
                                <span className="relative z-10">{service.ctaText}</span>
                                <svg className={`w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10 ${isEven ? '' : 'lg:order-first lg:mr-2 lg:ml-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Connecting Line */}
                    <div className={`absolute top-1/2 w-16 h-0.5 bg-gradient-to-${isEven ? 'r' : 'l'} from-${serviceColor}-300 to-transparent transform -translate-y-1/2 hidden lg:block ${isEven ? 'left-1/2 -translate-x-8' : 'right-1/2 translate-x-8'}`}></div>
                    
                    {/* Advanced Particle Effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className={`absolute top-8 left-8 w-1 h-1 bg-${serviceColor}-400 rounded-full animate-ping`}></div>
                      <div className={`absolute top-16 right-16 w-1 h-1 bg-${serviceColor}-500 rounded-full animate-ping animation-delay-200`}></div>
                      <div className={`absolute bottom-8 left-16 w-1 h-1 bg-${serviceColor}-600 rounded-full animate-ping animation-delay-400`}></div>
                      <div className={`absolute bottom-16 right-8 w-1 h-1 bg-${serviceColor}-400 rounded-full animate-ping animation-delay-600`}></div>
                    </div>
                    
                    {/* Row Shimmer Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 ${isEven ? 'translate-x-full group-hover:translate-x-[-200%]' : '-translate-x-full group-hover:translate-x-[200%]'} transition-transform duration-1000 rounded-3xl`}></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom Enhancement Section */}
          <div className="mt-20 text-center">
            <div className={`inline-flex items-center gap-8 bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-xl border border-white/40 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Expert Tutors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full animate-pulse animation-delay-300"></div>
                <span className="text-sm font-medium text-gray-700">Tailored Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse animation-delay-600"></div>
                <span className="text-sm font-medium text-gray-700">Proven Results</span>
              </div>
            </div>
          </div>
        </div>
        {/* Wavy bottom edge transitioning to Results */}
        <div className="absolute bottom-0 left-0 w-full z-20" style={{height: '80px'}}>
          <Wave
            fill={`var(${sectionColors.results.cssVariable})`}
            paused={false}
            options={{
              height: 25,
              amplitude: 25,
              speed: 0.12,
              points: 4
            }}
            style={{ height: '80px' }}
          />
        </div>
      </section>

      {/* Results Section - Interactive Dashboard Design */}
      <section id="results" className="relative overflow-hidden" style={{backgroundColor: `var(${sectionColors.results.cssVariable})`, paddingTop: sectionPadding.top, paddingBottom: sectionPadding.bottom}}>
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/15 rounded-full blur-2xl animate-pulse animation-delay-500"></div>
        </div>
        
        {/* Grid Pattern Overlay - Removed to prevent color mixing */}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className={`inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full text-sm font-medium text-blue-800 mb-8 shadow-lg transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Performance Dashboard
            </div>
            <h3 className={`text-5xl sm:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent bg-size-200 animate-gradient-x font-bold">
                {data.results.sectionTitle}
              </span>
            </h3>
            <p className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {data.results.sectionDescription}
            </p>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto mt-8 rounded-full transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>
          
          {/* Interactive Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Primary Stat - Large Featured */}
            <div className={`lg:col-span-2 group relative transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-700 border border-white/60 hover:border-blue-300/50 overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Featured Statistic */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-blue-100 backdrop-blur-sm border border-blue-200/50 px-4 py-2 rounded-full text-sm font-medium text-blue-800 mb-6">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                      Primary Metric
                    </div>
                    <div className="text-7xl lg:text-8xl font-black bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent mb-4 leading-none">
                      {data.results.statistics[0].number}
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {data.results.statistics[0].label}
                    </h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {data.results.statistics[0].description}
                    </p>
                  </div>
                  
                  {/* Interactive Visual Element */}
                  <div className="relative">
                    <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto relative">
                      {/* Animated Rings */}
                      <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-spin-slow"></div>
                      <div className="absolute inset-4 rounded-full border-2 border-blue-300/40 animate-reverse-spin-slow"></div>
                      <div className="absolute inset-8 rounded-full border border-blue-200/50 animate-spin-slow animation-delay-500"></div>
                      
                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary Stats - Vertical Stack */}
            <div className="space-y-8">
              {data.results.statistics.slice(1).map((stat, index) => (
                <div 
                  key={index}
                  className={`group relative transition-all duration-1000 delay-${700 + index * 200} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                >
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/60 hover:border-blue-300/50 overflow-hidden">
                    
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    
                    {/* Stat Content */}
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-200/30 group-hover:scale-110 transition-transform duration-500 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:border-blue-300/50">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                            {index === 0 && (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                              </svg>
                            )}
                            {index === 1 && (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                            )}
                            {index === 2 && (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-1">
                          {stat.number}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {stat.label}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-100/50 to-blue-200/50 rounded-b-2xl overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-blue-800 w-0 group-hover:w-full transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Stats Bar */}
          <div className="mt-16">
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/60 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800 mb-2">2,847+</div>
                  <div className="text-sm text-gray-600">Students Mentored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800 mb-2">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wavy bottom edge transitioning to Testimonials */}
        <div className="absolute bottom-0 left-0 w-full z-20" style={{height: '80px'}}>
          <Wave
            fill={`var(${sectionColors.testimonials.cssVariable})`}
            paused={false}
            options={{
              height: 25,
              amplitude: 25,
              speed: 0.12,
              points: 4
            }}
            style={{ height: '80px' }}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative overflow-hidden" style={{backgroundColor: `var(${sectionColors.testimonials.cssVariable})`, paddingTop: sectionPadding.top, paddingBottom: sectionPadding.bottom}}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">{data.testimonials.sectionTitle}</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {data.testimonials.sectionSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.testimonials.testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-full transform translate-x-12 -translate-y-12 group-hover:from-blue-100 transition-all duration-300"></div>
                
                <div className="relative">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-8 italic text-lg leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mr-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-800">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                        {testimonial.author}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Wavy bottom edge transitioning to Contact */}
        <div className="absolute bottom-0 left-0 w-full z-20" style={{height: '80px'}}>
          <Wave
            fill={`var(${sectionColors.contact.cssVariable})`}
            paused={false}
            options={{
              height: 25,
              amplitude: 25,
              speed: 0.12,
              points: 4
            }}
            style={{ height: '80px' }}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden" style={{backgroundColor: `var(${sectionColors.contact.cssVariable})`, paddingTop: sectionPadding.top, paddingBottom: sectionPadding.bottom}}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full opacity-20 blur-3xl transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-700 rounded-full opacity-20 blur-3xl transform -translate-x-40 translate-y-40"></div>
        
        {/* Side Scrolling Marquee Header */}
        <div className="relative w-full overflow-hidden py-16 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-blue-900 z-10" />
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center mx-4">
                <span
                  className="text-7xl sm:text-8xl md:text-9xl font-light text-transparent px-4"
                  style={{
                    WebkitTextStroke: "1px rgb(147 197 253)", // tailwind blue-300
                  }}
                >
                  Get in Touch
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-white">
              <h3 className="text-4xl font-bold mb-6">{data.contact.sectionTitle}</h3>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                {data.contact.sectionDescription}
              </p>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-blue-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-blue-600/50 transition-all duration-200">
                    <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg">{data.contact.contactInfo.email}</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-blue-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-blue-600/50 transition-all duration-200">
                    <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-lg">{data.contact.contactInfo.phone}</span>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-blue-600/30 rounded-2xl flex items-center justify-center mr-4 mt-1 group-hover:bg-blue-600/50 transition-all duration-200">
                    <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="whitespace-pre-line text-lg leading-relaxed">{data.contact.contactInfo.address}</span>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h4 className="text-3xl font-bold text-gray-900 mb-4">{data.contact.formTitle}</h4>
              <p className="text-gray-600 mb-8 leading-relaxed">{data.contact.formDescription}</p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <select className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white">
                  <option>Select Subject Level</option>
                  <option>GCSE</option>
                  <option>A-Level</option>
                  <option>Oxbridge Preparation</option>
                  <option>11+ Preparation</option>
                </select>
                <textarea 
                  placeholder="Tell us about your educational goals..." 
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-900 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {data.contact.submitButtonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image
                  src={data.footer.logo.main}
                  alt={data.footer.logo.alt}
                  width={data.footer.logo.width}
                  height={data.footer.logo.height}
                />
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                {data.footer.description}
              </p>
            </div>
            {data.footer.footerSections.map((section, index) => (
              <div key={index}>
                <h6 className="font-semibold text-slate-900 mb-4">{section.title}</h6>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href} 
                        className="text-slate-600 hover:text-slate-800 transition-colors duration-200 font-medium text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 mt-8 pt-6 text-center">
            <p className="text-slate-600 font-medium text-sm">{data.footer.copyrightText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
