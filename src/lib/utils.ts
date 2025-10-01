// CONTEXT7 SOURCE: /lukeed/clsx - Conditional class name utility
// IMPLEMENTATION REASON: Official clsx documentation for efficient class name composition

/**
 * Class Name Utility with Tailwind Merge
 *
 * CONTEXT7 SOURCE: /lukeed/clsx - Lightweight class name utility
 * Pattern: Conditional class name generation
 * - Accepts multiple class value types
 * - Handles arrays, objects, strings
 * - Filters falsy values automatically
 * - Minimal bundle size impact
 *
 * CONTEXT7 SOURCE: /dcastil/tailwind-merge - Tailwind CSS class deduplication
 * Tailwind Merge Features:
 * - Resolves conflicting Tailwind utilities
 * - Preserves last occurrence of conflicts
 * - Handles arbitrary values and modifiers
 * - Optimizes final class string output
 *
 * Combined Benefits:
 * - Type-safe class name handling
 * - Prevents CSS specificity issues
 * - Improves runtime performance
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
