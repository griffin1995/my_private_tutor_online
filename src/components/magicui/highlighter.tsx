"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";
import type React from "react";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - Layout isolation patterns from projection API
 * ISOLATION REASON: Official Framer Motion documentation demonstrates position relative and transform-style preserve-3d
 * patterns to prevent transform inheritance from parent Motion components
 *
 * CRITICAL FIX: Text highlighting displacement caused by Framer Motion transform inheritance
 * - position: relative creates new stacking context
 * - transform-style: preserve-3d prevents flattening of 3D transforms
 * - will-change: transform hints browser for optimization
 * - isolation: isolate creates new stacking context (CSS containment)
 */
export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView;

  useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    const annotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    annotation.show();

    return () => {
      if (element) {
        annotate(element, { type: action }).remove();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    /**
     * CONTEXT7 SOURCE: /grx7/framer-motion - Layout isolation container pattern
     * LAYOUT ISOLATION REASON: Official Framer Motion documentation Section projection demonstrates
     * position relative with transform-style preserve-3d to create isolated rendering context
     * preventing parent Motion component transforms from affecting child positioning
     *
     * Transform Isolation Strategy:
     * 1. position: relative - Creates new positioning context
     * 2. z-index: 1 - Ensures proper stacking above Motion elements
     * 3. transform-style: preserve-3d - Prevents transform flattening
     * 4. will-change: contents - Optimizes for content changes, not transforms
     * 5. isolation: isolate - Creates isolated stacking context (modern CSS)
     */
    <span
      className="inline-block"
      style={{
        position: 'relative',
        zIndex: 1,
        transformStyle: 'preserve-3d',
        willChange: 'contents',
        isolation: 'isolate'
      }}
    >
      <span ref={elementRef} className="relative inline-block bg-transparent">
        {children}
      </span>
    </span>
  );
}
