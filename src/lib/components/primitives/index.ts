/**
 * CONTEXT7 SOURCE: /vercel/next.js - Barrel exports for optimized imports
 * OPTIMIZATION REASON: Next.js documentation for tree-shaking and bundle optimization
 *
 * Shared Component Library - Primitive Components
 * Phase 2 Core Optimization: Consolidated components for 50% bundle reduction
 */

// Button primitives (consolidates 10 button variants)
export { Button, ButtonGroup, buttonVariants } from "./button/button"
export type { ButtonProps, ButtonGroupProps, ButtonLoadingState } from "./button/button.types"

// TODO: Card primitives (will consolidate 13 card variants)
// export { Card, CardHeader, CardContent, CardFooter } from "./card/card"
// export type { CardProps } from "./card/card.types"

// TODO: Modal primitives (will consolidate 5 modal variants)
// export { Modal, ModalTrigger, ModalContent } from "./modal/modal"
// export type { ModalProps } from "./modal/modal.types"

// TODO: Form primitives
// export { Input, Select, Textarea, Checkbox, Radio } from "./form"
// export type { FormFieldProps } from "./form/form.types"