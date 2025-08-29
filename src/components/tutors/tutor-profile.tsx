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

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography with brand fonts */}
              {/* TUTOR INFO: Name with Playfair Display font */}
              <div className="text-center">
                <h3 className="font-display font-semibold text-gray-900 text-xl">
                  {profile.name}
                </h3>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Specialist line text with enhanced typography */}
              {/* SPECIALIST LINE TEXT: Profile title positioned between name and arrow */}
              {/* REVISION REASON: Applied Aztec Gold brand color (#CA9E5B) to specialist line text for brand consistency */}
              <div className="text-center">
                <p className="text-[#CA9E5B] font-serif font-medium text-base leading-relaxed">
                  {profile.title}
                </p>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom arrow positioned below specialist line */}
              {/* CUSTOM ARROW: Repositioned expand/collapse indicator with state-controlled rotation */}
              {/* REVISION REASON: Added card-wide hover effect with Aztec Gold (#CA9E5B) arrow highlight and smooth transitions */}
              <div
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 group-hover:text-[#CA9E5B] transition-colors duration-300"
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
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width row layout for Education section */}
              {/* EDUCATION SECTION: Full-width row as requested */}
              <div>
                <h4 className="font-display font-semibold text-gray-900 mb-2 flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-[#CA9E5B]"
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
                <div className="font-serif text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">
                      {profile.education.degree}
                    </span>
                  </p>
                  <p>{profile.education.university}</p>
                  {profile.education.grade && (
                    <p className="text-[#CA9E5B] font-medium">
                      {profile.education.grade}
                    </p>
                  )}
                  {profile.education.additionalQualifications && (
                    <div className="mt-2">
                      <p className="font-medium text-gray-700">
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

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width row layout for Experience section */}
              {/* EXPERIENCE SECTION: Full-width row as requested */}
              <div>
                <h4 className="font-display font-semibold text-gray-900 mb-2 flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-[#CA9E5B]"
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
                <div className="font-serif text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">
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
                      <p className="font-medium text-gray-700">
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

              {/* Bio */}
              {profile.bio && (
                <div>
                  <h4 className="font-display font-semibold text-gray-900 mb-2">
                    About
                  </h4>
                  <p className="font-serif text-sm text-gray-600 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              )}

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - British spelling implementation */}
              {/* All Specialisations - British spelling as requested */}
              <div>
                <h4 className="font-display font-semibold text-gray-900 mb-2">
                  All Specialisations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((specialization, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium font-serif transition-all duration-300 text-[#CA9E5B] border ${isOpen ? "bg-[#CA9E5B]/10 border-[#CA9E5B]/30" : "bg-transparent border-transparent"}`}
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {profile.achievements && profile.achievements.length > 0 && (
                <div>
                  <h4 className="font-display font-semibold text-gray-900 mb-2">
                    Key Achievement
                  </h4>
                  <div
                    className={`p-3 rounded-lg border transition-all duration-300 ${isOpen ? "bg-[#CA9E5B]/10 border-[#CA9E5B]/20" : "bg-transparent border-transparent"}`}
                  >
                    <div className="flex items-start">
                      <svg
                        className="mr-2 h-4 w-4 text-[#CA9E5B] mt-0.5 flex-shrink-0"
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
                        <h5 className="font-display font-medium text-[#CA9E5B] mb-1">
                          {profile.achievements[0].title}
                        </h5>
                        <p className="font-serif text-sm text-gray-700">
                          {profile.achievements[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {profile.testimonial && (
                <div>
                  <h4 className="font-display font-semibold text-gray-900 mb-2">
                    Student Testimonial
                  </h4>
                  <div
                    className={`p-4 rounded-lg border transition-all duration-300 ${isOpen ? "bg-gray-50 border-gray-100" : "bg-transparent border-transparent"}`}
                  >
                    <blockquote className="font-serif text-sm text-gray-600 italic mb-2">
                      "{profile.testimonial.quote}"
                    </blockquote>
                    <cite className="font-serif text-xs text-gray-500 font-medium">
                      — {profile.testimonial.author}
                      {profile.testimonial.context && (
                        <span className="font-normal">
                          , {profile.testimonial.context}
                        </span>
                      )}
                    </cite>
                  </div>
                </div>
              )}

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Bizstim button integration */}
              {/* BIZSTIM BUTTON: Book consultation linking to external Bizstim form */}
              <div className="pt-4">
                <a
                  href="https://form.bizstim.com/book-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full px-6 py-3 rounded-lg font-display font-medium transition-all duration-300 text-center focus:outline-none ${isOpen ? "bg-[#CA9E5B] text-white hover:bg-[#B8904F] hover:shadow-md focus:ring-2 focus:ring-[#CA9E5B] focus:ring-offset-2" : "bg-transparent text-[#CA9E5B] border-2 border-transparent"}`}
                >
                  Book Consultation with {profile.name.split(" ")[0]}
                </a>
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
