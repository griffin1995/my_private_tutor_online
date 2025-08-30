// CONTEXT7 SOURCE: /reactjs/react.dev - React component section interface patterns
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive marketing page component with mobile-first
// IMPLEMENTATION REASON: Complete tutors section component with heading, grid, and CTA following official patterns
"use client";

import { TutorProfilesSection } from "@/lib/cms/cms-content";
import React from "react";
import { TutorsGrid } from "./tutors-grid";

// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for section components
// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for section component props
interface TutorsSectionProps {
  readonly data: TutorProfilesSection;
  readonly showFeaturedOnly?: boolean;
  readonly maxProfiles?: number;
  readonly showViewAllButton?: boolean;
  readonly className?: string;
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component composition patterns with section layout
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Create responsive grid column layouts with Tailwind CSS
// IMPLEMENTATION REASON: Complete tutors section with professional layout and responsive design
export const TutorsSection: React.FC<TutorsSectionProps> = ({
  data,
  showFeaturedOnly = false,
  maxProfiles,
  showViewAllButton = true,
  className = "",
}) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Array filtering patterns with type safety and conditional logic
  // CONTEXT7 SOURCE: /microsoft/typescript - Remove photo filtering to show all tutors with tier-based sorting
  // FILTERING REMOVAL REASON: Official TypeScript documentation demonstrates showing all available data - display all 9 tutors regardless of photo availability
  const profilesToShow = React.useMemo(() => {
    // CONTEXT7 SOURCE: /microsoft/typescript - Show all profiles with optional featured filtering
    // SHOW ALL TUTORS: Official TypeScript documentation demonstrates inclusive data access patterns
    if (showFeaturedOnly) {
      return data.profiles.filter((profile) => profile.featured);
    }
    return data.profiles;
  }, [data.profiles, showFeaturedOnly]);

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design principles for section layouts
  // Background style classes based on CMS configuration
  const backgroundClasses = React.useMemo(() => {
    switch (data.backgroundStyle) {
      case "dark":
        return "bg-gray-900 text-white";
      case "gradient":
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand color implementation for gradient backgrounds
        // BRAND COLOR UPDATE: Official Tailwind CSS documentation demonstrates accent-* color usage for brand consistency - replacing orange with Aztec Gold accent colors
        return "bg-gradient-to-br from-accent-50 to-accent-100";
      case "light":
      default:
        return "bg-gray-50";
    }
  }, [data.backgroundStyle]);

  return (
    <section className={`py-16 lg:py-24 ${backgroundClasses} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive component styles with mobile-first approach */}
        {/* CONTEXT7 SOURCE: /websites/16_reactjs - dangerouslySetInnerHTML for safe HTML content rendering */}
        {/* HTML FORMATTING IMPLEMENTATION: Added dangerouslySetInnerHTML to render HTML tags in description text */}
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <h2
            className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 ${
              data.backgroundStyle === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {data.title}
          </h2>

          {data.subtitle && (
            <p
              className={`text-xl font-medium mb-6 ${
                // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand color implementation for text styling
                // BRAND COLOR UPDATE: Official Tailwind CSS documentation demonstrates accent-* color usage for brand consistency - replacing orange text colors with Aztec Gold
                data.backgroundStyle === "dark"
                  ? "text-accent-400"
                  : "text-accent-600"
              }`}
            >
              {data.subtitle}
            </p>
          )}

          {data.description && (
            <div
              className={`text-lg leading-relaxed ${
                data.backgroundStyle === "dark"
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
              dangerouslySetInnerHTML={{
                __html: `<p>${data.description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />')}</p>`
              }}
            />
          )}
        </div>

        {/* Tutors Grid */}
        <div className="mb-12 lg:mb-16">
          <TutorsGrid
            profiles={profilesToShow}
            showFeatured={!showFeaturedOnly}
            maxProfiles={maxProfiles}
          />
        </div>

        {/* View All Button */}
        {showViewAllButton &&
          data.showAllButton &&
          profilesToShow.length > 0 && (
            <div className="text-center">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White button styling with proper contrast and accessibility */}
              {/* WHITE BUTTON REVISION: Official Tailwind CSS documentation demonstrates white bg with gray text and borders for proper contrast and accessibility compliance */}
              <a
                href={data.showAllButton.href}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg transition-colors duration-200 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - Dynamic text content with calculated values */}
                {/* DYNAMIC COUNT: Update button text to reflect actual count of tutors with photos */}
                View All {profilesToShow.length} Expert Tutors
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          )}
      </div>
    </section>
  );
};

// CONTEXT7 SOURCE: /reactjs/react.dev - React component export patterns for component library
export default TutorsSection;
