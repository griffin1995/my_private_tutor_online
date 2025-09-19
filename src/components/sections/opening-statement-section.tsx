// CONTEXT7 SOURCE: /reactjs/react.dev - React component for opening statement section with Magic UI integration
// COMPONENT EXTRACTION REASON: Official React documentation patterns for extracting reusable section components
// REVISION REASON: Homepage componentization to achieve modular 8-section structure with Highlighter effects

"use client";

import React from 'react';
import { Highlighter } from '../magicui/highlighter';

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for component props with explicit children
// INTERFACE REASON: Official React 18+ documentation requires explicit children prop declaration for type safety
interface OpeningStatementSectionProps {
  children?: React.ReactNode;
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Functional component pattern for section extraction
// SECTION COMPONENT REASON: Official React documentation shows section components for better maintainability
export function OpeningStatementSection({}: OpeningStatementSectionProps = {}) {
  return (
    <section id="brand-message-exceptional-tuition" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <p style={{ fontSize: "1.6rem" }}>
          We provide{" "}
          <Highlighter action="highlight" color="#CA9E5B">
            exceptional tuition
          </Highlighter>{" "}
          that helps students{" "}
          <Highlighter action="highlight" color="#CA9E5B">
            excel academically
          </Highlighter>{" "}
          and{" "}
          <Highlighter
            action="underline"
            color="#3F4A7E"
            iterations={2}
            animationDuration={1200}
          >
            thrive personally,
          </Highlighter>{" "}
          opening doors to greater opportunities—at school and in life.
        </p>
      </div>
    </section>
  );
}