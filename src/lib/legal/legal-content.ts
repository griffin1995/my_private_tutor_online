/**
 * Type-safe legal content management utilities
 * Provides synchronous content loading following project CMS patterns
 */

export interface LegalPageMetadata {
	title: string;
	subtitle: string;
	lastUpdated: string;
	backgroundImage: string;
	showCompliance?: boolean;
	complianceText?: string;
	slug: string;
}

export interface LegalPageContent {
	metadata: LegalPageMetadata;
	content: string;
}

/**
 * Legal page configurations - centralised metadata management
 * Following British English standards and project conventions
 */
export const LEGAL_PAGE_CONFIGS: Record<string, LegalPageMetadata> = {
	'privacy-policy': {
		title: 'Privacy Policy',
		subtitle: 'How we protect and handle your personal information in compliance with UK GDPR and Data Protection Act 2018',
		lastUpdated: '18th November 2025',
		backgroundImage: '/images/hero/privacy-policy.jpg',
		showCompliance: true,
		complianceText: 'This policy complies with UK GDPR, Data Protection Act 2018, and PECR requirements.',
		slug: 'privacy-policy'
	},
	'terms-of-service': {
		title: 'Terms of Service',
		subtitle: 'Terms and conditions for www.myprivatetutoronline.com',
		lastUpdated: '9th December 2025',
		backgroundImage: '/images/hero/terms-of-service.jpg',
		showCompliance: true,
		complianceText: 'These terms constitute a legal agreement between you and the operator of this website.',
		slug: 'terms-of-service'
	},
	'booking-policy': {
		title: 'Booking, Cancellation & Refund Policy',
		subtitle: 'Comprehensive booking terms and conditions for My Private Tutor Online',
		lastUpdated: '9th December 2025',
		backgroundImage: '/images/hero/booking-policy.jpg',
		showCompliance: false,
		slug: 'booking-policy'
	},
	'cookie-policy': {
		title: 'Cookie Policy',
		subtitle: 'How we use cookies and similar technologies to improve your website experience',
		lastUpdated: '15th December 2025',
		backgroundImage: '/images/hero/cookie-policy.jpg',
		showCompliance: true,
		complianceText: 'This cookie policy complies with UK Privacy and Electronic Communications Regulations (PECR), EU ePrivacy Directive, and GDPR requirements.',
		slug: 'cookie-policy'
	},
	'record-of-processing': {
		title: 'Record of Processing Activities',
		subtitle: 'Transparency in our data processing practices',
		lastUpdated: 'December 2025',
		backgroundImage: '/images/hero/data-protection.jpg',
		showCompliance: true,
		complianceText: 'This document outlines our processing activities in accordance with UK GDPR requirements for transparency and accountability.',
		slug: 'record-of-processing'
	}
};

/**
 * Get legal page metadata by slug
 * @param slug - The page slug (e.g., 'privacy-policy')
 * @returns LegalPageMetadata or undefined if not found
 */
export function getLegalPageMetadata(slug: string): LegalPageMetadata | undefined {
	return LEGAL_PAGE_CONFIGS[slug];
}

/**
 * Get all legal page configurations
 * @returns Array of all legal page metadata
 */
export function getAllLegalPages(): LegalPageMetadata[] {
	return Object.values(LEGAL_PAGE_CONFIGS);
}

/**
 * Validate legal page metadata
 * @param metadata - The metadata to validate
 * @returns boolean indicating if metadata is valid
 */
export function validateLegalPageMetadata(metadata: Partial<LegalPageMetadata>): metadata is LegalPageMetadata {
	const required = ['title', 'subtitle', 'lastUpdated', 'backgroundImage', 'slug'];
	return required.every(field => field in metadata && metadata[field as keyof LegalPageMetadata]);
}

/**
 * Type guard for legal page slug
 * @param slug - The slug to check
 * @returns boolean indicating if slug is valid
 */
export function isValidLegalPageSlug(slug: string): slug is keyof typeof LEGAL_PAGE_CONFIGS {
	return slug in LEGAL_PAGE_CONFIGS;
}

/**
 * Generate breadcrumb data for legal pages
 * @param slug - The current page slug
 * @returns Breadcrumb data array
 */
export function getLegalPageBreadcrumbs(slug: string) {
	const metadata = getLegalPageMetadata(slug);
	return [
		{ label: 'Home', href: '/' },
		{ label: 'Legal', href: '/legal' },
		{ label: metadata?.title || 'Legal Page', href: `/legal/${slug}` }
	];
}

// Type exports for external use
export type LegalPageSlug = keyof typeof LEGAL_PAGE_CONFIGS;