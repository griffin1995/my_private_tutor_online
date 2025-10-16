// CONTEXT7 SOURCE: /radix-ui/primitives - Accordion component integration for expandable tutor profiles
// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for tutor profile data
// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for tutor profile structured data
// IMPLEMENTATION REASON: Accordion-based expandable tutor profile cards with circular images and basic functionality
// REVISION REASON: Added Bizstim button links, brand fonts, restructured layout, and British spelling
// CHANGE TYPE: REVISION - Core functionality with 4 specific improvements only
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional background rendering with state-based transitions
// REVISION REASON: Fixed collapsed card background issue - removed all backgrounds when collapsed, added fade-in animation when expanded
// CHANGE TYPE: BUG FIX - Conditional background rendering based on accordion state for proper transparency
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TutorProfile } from "@/lib/cms/cms-content";
import { getImageAsset } from "@/lib/cms/cms-images";
import React from "react";

// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for tutor profile props
// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface definitions for component props
interface TutorProfileCardProps {
  readonly profile: TutorProfile;
  readonly featured?: boolean;
  readonly className?: string;
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Basic accordion implementation with tutor profile data
// REVISION REASON: Added state management for custom arrow rotation synchronization
export const TutorProfileCard: React.FC<TutorProfileCardProps> = ({
  profile,
  featured = false,
  className = "",
}) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState hook for accordion state tracking
  // CONTEXT7 SOURCE: /radix-ui/primitives - Proper controlled accordion state management with string values
  // REVISION REASON: Fixed collapse functionality by using string-based state instead of boolean to match Radix UI expectations
  const [accordionValue, setAccordionValue] = React.useState<string>("");
  const isOpen = accordionValue === "tutor-profile";

  // CONTEXT7 SOURCE: /vercel/next.js - Static asset management patterns for tutor photos integration
  // CMS INTEGRATION: Using cms-images for consistent image handling with real tutor photos
  const tutorImage = getImageAsset("tutors", profile.image.key);

  return (
    <div
      className={`group rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-lg hover:shadow-xl bg-white" : "bg-transparent shadow-none"} ${className}`}
    >
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Accordion implementation with state synchronization */}
      {/* ACCORDION IMPLEMENTATION: Single item accordion with controlled state for custom arrow */}
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordionValue}
        onValueChange={(value) => setAccordionValue(value || "")}
      >
        <AccordionItem value="tutor-profile" className="border-none">
          {/* CONTEXT7 SOURCE: /radix-ui/primitives - AccordionTrigger with hidden default arrow */}
          {/* REVISION REASON: Hide default Radix UI arrow to position custom arrow below specialist line */}
          <AccordionTrigger
            className={`hover:no-underline p-6 [&>svg]:hidden transition-all duration-300 ${isOpen ? "bg-white" : "bg-transparent"}`}
          >
            <div className="flex flex-col items-center space-y-1 w-full">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Circular image design */}
              {/* CIRCULAR IMAGE: Professional circular headshot */}
              <div className="w-33 h-33 rounded-full overflow-hidden">
                <img
                  src={
                    tutorImage?.src || "/images/tutors/tutor-placeholder.jpg"
                  }
                  alt={profile.image.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
              {/* LAYER BASE SYSTEM: Stripped font-display, font-semibold, text-gray-900, text-xl - ALL from @layer base */}
              {/* TUTOR INFO: Name styling from base layer */}
              <div className="text-center">
                <h3>
                  {profile.name}
                </h3>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
              {/* LAYER BASE SYSTEM: Stripped font-serif, font-medium, text-base, leading-relaxed - provided by @layer base */}
              {/* ONLY KEEPING: text-accent-600 brand color token */}
              {/* SPECIALIST LINE TEXT: Profile title positioned between name and arrow */}
              {/* TOKEN FIX: Replaced hardcoded #CA9E5B with accent-600 token */}
              <div className="text-center">
                <p className="text-accent-600">
                  {profile.title}
                </p>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom arrow positioned below specialist line */}
              {/* CUSTOM ARROW: Repositioned expand/collapse indicator with state-controlled rotation */}
              {/* TOKEN FIX: Replaced hardcoded colors with proper tokens (neutral-400, accent-600) */}
              <div
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-neutral-400 group-hover:text-accent-600 transition-colors duration-300"
                >
                  <path
                    d="m4.5 6 3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </AccordionTrigger>

          {/* CONTEXT7 SOURCE: /radix-ui/primitives - AccordionContent with basic content layout */}
          {/* ACCORDION CONTENT: Expandable tutor details with Education and Experience as separate full-width rows */}
          <AccordionContent
            className={`px-6 pb-6 transition-all duration-300 ${isOpen ? "bg-white" : "bg-transparent"}`}
          >
            <div className="space-y-6">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4 styling */}
              {/* LAYER BASE SYSTEM: Stripped font-display, font-semibold, text-gray-900 - ALL from @layer base */}
              {/* ONLY KEEPING: mb-2, flex, items-center for layout */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width row layout for Education section */}
              {/* EDUCATION SECTION: Full-width row as requested */}
              <div>
                <h4 className="mb-2 flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Education
                </h4>
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div/p/span styling */}
                {/* LAYER BASE SYSTEM: Stripped font-serif, text-sm, text-gray-600, font-medium, text-gray-700 - ALL from @layer base */}
                {/* ONLY KEEPING: space-y-1, mt-2, text-accent-600 brand color token */}
                {/* TOKEN FIX: Replaced hardcoded #CA9E5B with accent-600 token */}
                <div className="space-y-1">
                  <p>
                    <span>
                      {profile.education.degree}
                    </span>
                  </p>
                  <p>{profile.education.university}</p>
                  {profile.education.grade && (
                    <p className="text-accent-600">
                      {profile.education.grade}
                    </p>
                  )}
                  {profile.education.additionalQualifications && (
                    <div className="mt-2">
                      <p>
                        Additional Qualifications:
                      </p>
                      <ul className="list-disc list-inside ml-2">
                        {profile.education.additionalQualifications.map(
                          (qual, index) => (
                            <li key={index}>{qual}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4 styling */}
              {/* LAYER BASE SYSTEM: Stripped font-display, font-semibold, text-gray-900 - ALL from @layer base */}
              {/* ONLY KEEPING: mb-2, flex, items-center for layout */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width row layout for Experience section */}
              {/* EXPERIENCE SECTION: Full-width row as requested */}
              <div>
                <h4 className="mb-2 flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Experience
                </h4>
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div/p/span styling */}
                {/* LAYER BASE SYSTEM: Stripped font-serif, text-sm, text-gray-600, font-medium, text-gray-700 - ALL from @layer base */}
                {/* ONLY KEEPING: space-y-1, mt-2 for layout */}
                <div className="space-y-1">
                  <p>
                    <span>
                      {profile.experience.yearsTeaching} years
                    </span>{" "}
                    teaching experience
                  </p>
                  {profile.experience.totalStudents && (
                    <p>{profile.experience.totalStudents}+ students taught</p>
                  )}
                  {profile.experience.onlineHours && (
                    <p>
                      {profile.experience.onlineHours}+ online tutoring hours
                    </p>
                  )}
                  {profile.experience.eliteSchools && (
                    <div className="mt-2">
                      <p>
                        Elite School Experience:
                      </p>
                      <ul className="list-disc list-inside ml-2">
                        {profile.experience.eliteSchools.map(
                          (school, index) => (
                            <li key={index}>{school}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4/p styling */}
              {/* LAYER BASE SYSTEM: Stripped all typography utilities - ALL from @layer base */}
              {/* ONLY KEEPING: mb-2 for spacing */}
              {/* Bio */}
              {profile.bio && (
                <div>
                  <h4 className="mb-2">
                    About
                  </h4>
                  <p>
                    {profile.bio}
                  </p>
                </div>
              )}

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4/span styling */}
              {/* LAYER BASE SYSTEM: Stripped font-display, font-semibold, text-gray-900, text-xs, font-medium, font-serif */}
              {/* ONLY KEEPING: mb-2, layout classes, text-accent-600 brand color token */}
              {/* TOKEN FIX: Replaced hardcoded #CA9E5B with accent-600 token */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - British spelling implementation */}
              {/* All Specialisations - British spelling as requested */}
              <div>
                <h4 className="mb-2">
                  All Specialisations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((specialization, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center rounded-md px-2.5 py-1 transition-all duration-300 text-accent-600 border ${isOpen ? "bg-accent-600/10 border-accent-600/30" : "bg-transparent border-transparent"}`}
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4/h5/p styling */}
              {/* LAYER BASE SYSTEM: Stripped all typography utilities - ALL from @layer base */}
              {/* ONLY KEEPING: mb-1, mb-2, text-accent-600 brand color token */}
              {/* TOKEN FIX: Replaced hardcoded #CA9E5B with accent-600 token */}
              {/* Achievements */}
              {profile.achievements && profile.achievements.length > 0 && (
                <div>
                  <h4 className="mb-2">
                    Key Achievement
                  </h4>
                  <div
                    className={`p-3 rounded-lg border transition-all duration-300 ${isOpen ? "bg-accent-600/10 border-accent-600/20" : "bg-transparent border-transparent"}`}
                  >
                    <div className="flex items-start">
                      <svg
                        className="mr-2 h-4 w-4 text-accent-600 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <h5 className="text-accent-600 mb-1">
                          {profile.achievements[0].title}
                        </h5>
                        <p>
                          {profile.achievements[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4/blockquote/cite/span styling */}
              {/* LAYER BASE SYSTEM: Stripped all typography utilities - ALL from @layer base */}
              {/* ONLY KEEPING: mb-2, italic, layout classes, proper bg tokens */}
              {/* TOKEN FIX: Replaced bg-gray-50, border-gray-100 with neutral-50/100 */}
              {/* Testimonial */}
              {profile.testimonial && (
                <div>
                  <h4 className="mb-2">
                    Student Testimonial
                  </h4>
                  <div
                    className={`p-4 rounded-lg border transition-all duration-300 ${isOpen ? "bg-neutral-50 border-neutral-100" : "bg-transparent border-transparent"}`}
                  >
                    <blockquote className="italic mb-2">
                      "{profile.testimonial.quote}"
                    </blockquote>
                    <cite>
                      — {profile.testimonial.author}
                      {profile.testimonial.context && (
                        <span>
                          , {profile.testimonial.context}
                        </span>
                      )}
                    </cite>
                  </div>
                </div>
              )}

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL button styling */}
              {/* LAYER BASE SYSTEM: Stripped font-display, font-medium - provided by @layer base */}
              {/* ONLY KEEPING: Layout, spacing, transitions, brand tokens */}
              {/* TOKEN FIX: Replaced hardcoded #CA9E5B with accent-600, #B8904F with accent-700 tokens */}
              {/* CONTEXT7 SOURCE: /shadcn-ui/ui - Button variant ghost CVA patterns for avoiding style conflicts */}
              {/* CONTEXT7 SOURCE: /mdn/content - HTML anchor element href attribute patterns for external links */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional styling with hover states and text color utilities */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Hover state styling with variants for interactive button design */}
              {/* BUG FIX: Fixed button text visibility by applying ghost variant pattern and forced white text */}
              {/* CHANGE TYPE: BUG FIX - Applied ghost variant and !text-white pattern to fix CVA style conflicts */}
              <div className="pt-4">
                <Button
                  variant="ghost"
                  asChild
                  className={`w-full px-6 py-3 rounded-lg transition-all duration-300 text-center focus:outline-none ${isOpen ? "bg-accent-600 !text-white hover:bg-accent-700 hover:shadow-md focus:ring-2 focus:ring-accent-600 focus:ring-offset-2" : "bg-transparent !text-accent-600 border-2 border-accent-600 hover:bg-accent-600 hover:!text-white hover:shadow-md"}`}
                >
                  <a
                    href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Consultation with {profile.name.split(" ")[0]}
                  </a>
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// CONTEXT7 SOURCE: /reactjs/react.dev - React component export patterns for component library
export default TutorProfileCard;
