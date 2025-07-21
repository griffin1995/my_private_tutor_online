// Layout Components Export
// CLAUDE.md rule 42: PageLayout → PageHero → Section structure

export { PageLayout, SkipToContent } from './page-layout'
export type { 
  PageLayoutBackground, 
  PageLayoutContainerSize, 
  PageLayoutVerticalSpacing 
} from './page-layout'

export { PageHeader } from './page-header'
export type { PageHeaderVariant } from './page-header'

export { PageFooter } from './page-footer'
export type { PageFooterVariant } from './page-footer'

export { PageHero } from './page-hero'
export type { 
  PageHeroBackground, 
  PageHeroSize, 
  PageHeroAlignment,
  PageHeroVerticalAlignment,
  PageHeroOverlayOpacity
} from './page-hero'

export { Section, SectionHeader } from './section'
export type { 
  SectionBackground, 
  SectionPadding, 
  SectionContainerSize,
  SectionAlignment
} from './section'