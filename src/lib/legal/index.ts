/**
 * Legal utilities exports
 * Centralised export for all legal content management utilities
 */

export {
	LEGAL_PAGE_CONFIGS,
	getLegalPageMetadata,
	getAllLegalPages,
	validateLegalPageMetadata,
	isValidLegalPageSlug,
	getLegalPageBreadcrumbs
} from './legal-content';

export type {
	LegalPageMetadata,
	LegalPageContent,
	LegalPageSlug
} from './legal-content';