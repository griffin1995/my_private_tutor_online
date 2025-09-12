/**
 * CUSTOM ARROW UPWARD COMPONENT - MY PRIVATE TUTOR ONLINE
 * Created: August 2025
 * Enhanced: August 2025 with grow upward animation support
 *
 * Custom SVG arrow component for navigation dropdown collapse functionality.
 * Reverted to fill-based design for better scaling animation compatibility.
 *
 * IMPLEMENTATION REASON: User-requested custom arrow replacement for navigation dropdown
 * PATTERN REASON: React component pattern for SVG icons with TypeScript props interface
 * GROW_ANIMATION_REASON: Reverted to fill-based SVG for optimal grow upward animation with scaleY transforms
 */

import React from 'react';
import { motion } from 'framer-motion';

// TypeScript interface for component props with standard HTML SVG attributes
interface ArrowUpwardProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variants?: any;
  initial?: string;
  animate?: string;
}

// Custom ArrowUpward SVG component with fill-based design for grow upward animation
export default function ArrowUpward(props: ArrowUpwardProps) {
  const { className, variants, initial, animate, ...svgProps } = props;
  
  return (
    <motion.svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0 0 0)"
      className={className}
      variants={variants}
      initial={initial}
      animate={animate}
      {...svgProps}
    >
      <motion.path
        d="M12.5 4L12.5 20M12.5 4L7 9.5M12.5 4L18 9.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={variants}
        initial={initial}
        animate={animate}
      />
    </motion.svg>
  );
}