"use client";

import { m } from "framer-motion";

const fadeInUpVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

interface TwoRowHeadingTextSectionProps {
  headingOne: string;
  paragraphOne: string;
  headingTwo: string;
  paragraphTwo: string;
  backgroundColor?: string;
  className?: string;
}

export function TwoRowHeadingTextSection({
  headingOne,
  paragraphOne,
  headingTwo,
  paragraphTwo,
  backgroundColor = "white",
  className = "",
}: TwoRowHeadingTextSectionProps): JSX.Element {
  return (
    <div className={`bg-${backgroundColor} ${className}`}>
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - Container consolidation with max-width for performance optimization */}
      {/* CONTAINER CONSOLIDATION REASON: Official Tailwind documentation shows combining container utilities to reduce DOM nesting */}
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <m.div
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
        >
          <div className="space-y-10">
            <div className="text-left space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-6">
                  {headingOne}
                </h3>
                
                <div className="space-y-6">
                  <p className="text-lg text-primary-700 leading-relaxed">
                    {paragraphOne}
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-primary-200"></div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-6">
                  {headingTwo}
                </h3>
                
                <div className="space-y-6">
                  <p className="text-lg text-primary-700 leading-relaxed">
                    {paragraphTwo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}

export default TwoRowHeadingTextSection;