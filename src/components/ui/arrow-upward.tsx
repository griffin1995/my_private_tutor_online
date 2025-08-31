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
      {/* CONTEXT7 SOURCE: /grx7/framer-motion - motion.path with grow upward animation support */}
      {/* GROW_ANIMATION_REASON: Official Framer Motion documentation for SVG path scaling animations using scaleY and y transforms */}
      <motion.path
        d="M11.7547 4.01253C11.8923 3.85184 12.0966 3.75 12.3247 3.75L12.3264 3.75C12.5188 3.74962 12.7113 3.82278 12.8581 3.96948L18.8583 9.96548C19.1513 10.2583 19.1514 10.7331 18.8586 11.0261C18.5659 11.3191 18.091 11.3193 17.798 11.0265L13.0747 6.30654L13.0747 20.5014C13.0747 20.9156 12.7389 21.2514 12.3247 21.2514C11.9105 21.2514 11.5747 20.9156 11.5747 20.5014L11.5747 6.31307L6.85829 11.0265C6.5653 11.3193 6.09043 11.3191 5.79763 11.0262C5.50483 10.7332 5.50498 10.2583 5.79796 9.96549L11.7547 4.01253Z"
        fill="currentColor"
        variants={variants}
        initial={initial}
        animate={animate}
      />
    </motion.svg>
  );
}