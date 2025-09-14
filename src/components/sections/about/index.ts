/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Module export patterns for component composition
 * BARREL EXPORT REASON: Official React documentation shows clean module exports for better component organization
 */

export { AboutContent } from './about-content';
export type { AboutContentProps } from './about-content';

export { AboutImage } from './about-image';
export type { AboutImageProps } from './about-image';

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript re-export patterns for clean API surface
// Re-export main section component for backwards compatibility
export { AboutSection } from '../about-section';
export type { AboutSectionProps } from '../about-section';