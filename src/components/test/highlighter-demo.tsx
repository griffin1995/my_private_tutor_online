/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter demo component for testing
 * IMPLEMENTATION REASON: Testing component to verify official Magic UI Highlighter pattern implementation
 * REVISION REASON: Verify positioning fix and inline alignment of highlighter effects
 */

"use client";

import { Highlighter } from "@/components/magicui/highlighter";

export function HighlighterDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-8">Magic UI Highlighter Position Test</h1>
      
      {/* Official Magic UI Pattern Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Official Magic UI Pattern Test</h2>
        <div className="text-center">
          <p className="leading-relaxed text-lg">
            The{" "}
            <Highlighter action="underline" color="#FF9800">
              Magic UI Highlighter
            </Highlighter>{" "}
            makes important{" "}
            <Highlighter action="highlight" color="#87CEFA">
              text stand out
            </Highlighter>{" "}
            effortlessly.
          </p>
        </div>
      </div>

      {/* Educational Philosophy Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Educational Philosophy Pattern</h2>
        <div className="text-lg leading-relaxed max-w-3xl mx-auto">
          We believe every child deserves an education{" "}
          <Highlighter action="highlight" color="#f59e0b">
            tailored to who they are
          </Highlighter>
          , helping them build{" "}
          <Highlighter action="underline" color="#1e40af">
            confidence, curiosity, and clarity
          </Highlighter>
          . We combine{" "}
          <Highlighter action="highlight" color="#f59e0b">
            academic rigour with personal mentorship
          </Highlighter>
          , knowing that success depends as much on{" "}
          <Highlighter action="underline" color="#1e40af">
            resilience and self-belief
          </Highlighter>
          {" "}as it does on subject mastery.
        </div>
      </div>

      {/* Inline Flow Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Inline Flow Alignment Test</h2>
        <p className="text-lg leading-relaxed">
          This is a test to ensure the{" "}
          <Highlighter action="highlight" color="#87CEFA">
            highlighted text
          </Highlighter>
          {" "}flows perfectly{" "}
          <Highlighter action="underline" color="#FF9800">
            inline with the rest
          </Highlighter>
          {" "}of the paragraph without any{" "}
          <Highlighter action="highlight" color="#10b981">
            positioning offsets
          </Highlighter>
          {" "}or{" "}
          <Highlighter action="underline" color="#dc2626">
            misalignment issues
          </Highlighter>
          . The text should maintain perfect alignment with the baseline.
        </p>
      </div>

      {/* Multiple Lines Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Multi-line Text Test</h2>
        <p className="text-lg leading-relaxed">
          When text wraps across multiple lines, the{" "}
          <Highlighter action="highlight" color="#8b5cf6">
            highlighting should maintain consistency and proper alignment
          </Highlighter>
          {" "}without any visual breaks or positioning issues. The{" "}
          <Highlighter action="underline" color="#06b6d4">
            underline effects should also work correctly
          </Highlighter>
          {" "}across different line breaks and text layouts.
        </p>
      </div>
    </div>
  );
}