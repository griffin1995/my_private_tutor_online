"use client";

// CONTEXT7 SOURCE: /reactjs/react.dev - React component with TypeScript interfaces for type safety
// COMPONENT CREATION REASON: Official React documentation demonstrates creating reusable components with props interfaces
import React from "react";

// CONTEXT7 SOURCE: /radix-ui/primitives - Radix UI Accordion component for accessible collapsible sections
// ACCORDION IMPORT REASON: Official Radix UI documentation demonstrates importing accordion primitive components
import * as Accordion from "@radix-ui/react-accordion";

// CONTEXT7 SOURCE: /grx7/framer-motion - Framer Motion for animation variants and AnimatePresence
// ANIMATION IMPORT REASON: Official Framer Motion documentation demonstrates motion.div and AnimatePresence for reusable animation components
import { motion, AnimatePresence } from "framer-motion";

// CONTEXT7 SOURCE: /lucide-dev/lucide - Lucide React icon library for chevron indicator
// ICON IMPORT REASON: Official Lucide documentation demonstrates ChevronDown icon for accordion triggers
import { ChevronDown } from "lucide-react";

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for component props with children
// INTERFACE DEFINITION REASON: Official React documentation demonstrates defining props interfaces with optional properties
interface AnimatedAccordionSectionProps {
  /** Title displayed in the accordion trigger */
  title: string;
  /** Unique value for accordion identification */
  value: string;
  /** Content to display when accordion is expanded */
  children: React.ReactNode;
  /** Whether the accordion should be open by default */
  defaultOpen?: boolean;
  /** Additional CSS classes for styling */
  className?: string;
  /** Custom trigger content to show when accordion is closed */
  triggerContent?: React.ReactNode;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Animation easing function */
  animationEase?: string;
  /** Whether to show the chevron icon */
  showChevron?: boolean;
  /** Chevron size class */
  chevronClassName?: string;
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Animation variants for reusable animation patterns
// VARIANTS DEFINITION REASON: Official Framer Motion documentation demonstrates defining variants objects for consistent animations
const defaultTriggerVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

const defaultContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// CONTEXT7 SOURCE: /grx7/framer-motion - Staggered animation variants for complex accordion content
// STAGGERED VARIANTS REASON: Official Framer Motion documentation demonstrates staggerChildren for coordinated animations
const defaultAccordionAnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  },
  confidenceSection: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  },
  leftRightGroup: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  },
  leftSection: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  },
  rightSection: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }
};

// CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with props destructuring
// COMPONENT IMPLEMENTATION REASON: Official React documentation demonstrates creating functional components with destructured props
export function AnimatedAccordionSection({
  title,
  value,
  children,
  defaultOpen = false,
  className = "",
  triggerContent,
  animationDuration = 0.3,
  animationEase = "easeInOut",
  showChevron = true,
  chevronClassName = "h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8"
}: AnimatedAccordionSectionProps) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - React state management for tracking accordion open state
  // STATE MANAGEMENT REASON: Official React documentation demonstrates useState for component state tracking
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  // CONTEXT7 SOURCE: /radix-ui/primitives - Radix UI Accordion implementation with controlled state
  // ACCORDION IMPLEMENTATION REASON: Official Radix UI documentation demonstrates accordion patterns with onValueChange
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
      className={`w-full ${className}`}
      onValueChange={(newValue) => setIsOpen(newValue === value)}
    >
      <Accordion.Item value={value} className="border-none">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - AnimatePresence for smooth trigger content transitions */}
            {/* TRIGGER ANIMATION REASON: Official Framer Motion documentation demonstrates AnimatePresence with mode="wait" for content replacement */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                {/* Show trigger content when closed */}
                {!isOpen && triggerContent && (
                  <motion.div
                    key="trigger-content"
                    variants={defaultTriggerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: animationDuration, ease: animationEase }}
                    className="absolute inset-0"
                  >
                    {triggerContent}
                  </motion.div>
                )}

                {/* Show placeholder space when open to maintain layout */}
                {isOpen && triggerContent && (
                  <motion.div
                    key="accordion-placeholder"
                    variants={defaultContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: animationDuration, ease: animationEase }}
                    className="min-h-[200px]"
                  >
                    {/* Invisible placeholder to maintain space */}
                    <div className="opacity-0 pointer-events-none">
                      {triggerContent}
                    </div>
                  </motion.div>
                )}

                {/* Simple title display when no triggerContent provided */}
                {!triggerContent && (
                  <div className="py-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* CONTEXT7 SOURCE: /lucide-dev/lucide - ChevronDown icon with rotation animation */}
            {/* ICON ANIMATION REASON: Official Radix UI documentation demonstrates icon rotation with data-state attribute */}
            {showChevron && (
              <ChevronDown className={chevronClassName} />
            )}
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - AnimatePresence for smooth content entrance */}
          {/* CONTENT ANIMATION REASON: Official Framer Motion documentation demonstrates AnimatePresence for content transitions */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="accordion-content"
                variants={defaultContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: animationDuration, ease: animationEase, delay: 0.1 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Export animation variants for external customization
// EXPORT REASON: Official Framer Motion documentation demonstrates exporting variants for reuse and customization
export const accordionAnimationVariants = defaultAccordionAnimationVariants;
export const triggerVariants = defaultTriggerVariants;
export const contentVariants = defaultContentVariants;