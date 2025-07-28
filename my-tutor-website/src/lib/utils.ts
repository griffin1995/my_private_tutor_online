/**
 * Documentation Source: clsx + tailwind-merge
 * Reference: https://github.com/lukeed/clsx
 * Reference: https://github.com/dcastil/tailwind-merge
 * 
 * Pattern: Utility function for conditional class names
 * Architecture:
 * - clsx for conditional class name generation
 * - tailwind-merge for Tailwind CSS class deduplication
 * - Combined for optimal class name handling
 * 
 * Purpose:
 * - Merges multiple class name sources
 * - Removes duplicate Tailwind classes
 * - Handles conditional class names
 * - Used throughout component library
 * 
 * Usage:
 * cn("base-class", condition && "conditional-class", props.className)
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
