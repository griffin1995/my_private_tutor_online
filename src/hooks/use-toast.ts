// CONTEXT7 SOURCE: /emilkowalski/sonner - Toast notification library for React
// TOAST IMPLEMENTATION REASON: Official Sonner documentation for toast notifications
// CONTEXT7 SOURCE: /reactjs/react.dev - Custom React Hook pattern
// HOOK PATTERN REASON: React documentation recommends custom hooks for reusable logic

import { toast } from "sonner"

// CONTEXT7 SOURCE: /reactjs/react.dev - Custom hook naming convention with 'use' prefix
// NAMING REASON: React documentation requires custom hooks to start with 'use'
export const useToast = () => {
  // CONTEXT7 SOURCE: /emilkowalski/sonner - Direct toast function export pattern
  // EXPORT REASON: Sonner documentation shows direct toast function usage
  return {
    toast,
  }
}