// ============================================================================
// NAVIGATION CONTENT - HARDCODED DATA (NO CMS DEPENDENCIES)
// ============================================================================
// CONTEXT7 SOURCE: Next.js App Router - Static navigation data for optimal performance
// All navigation menus and footer links hardcoded for zero external dependencies

export interface NavigationItem {
	readonly label: string;
	readonly href: string;
	readonly items?: readonly NavigationItem[];
}

export interface FooterLink {
	readonly label: string;
	readonly href: string;
}

export interface FooterSection {
	readonly title: string;
	readonly links: readonly FooterLink[];
}

// ============================================================================
// MAIN NAVIGATION DATA (Desktop & Mobile)
// ============================================================================

export const MAIN_NAVIGATION_ITEMS: readonly NavigationItem[] = [
	{
		label: 'About Us',
		href: '/about',
		items: [
			{
				label: 'Introduction',
				href: '/about',
			},
			{
				label: "Founder's Story",
				href: '/about#about-founder-story',
			},
			{
				label: 'Our Ethos',
				href: '/about#about-quote',
			},
			{
				label: 'Client Reviews',
				href: '/about#about-testimonials',
			},
		],
	},
	{
		label: 'Subject Tuition',
		href: '/subject-tuition',
		items: [
			{
				label: 'Introduction',
				href: '/subject-tuition',
			},
			{
				label: 'Subject Categories',
				href: '/subject-tuition#subject-tuition-categories',
			},
			{
				label: 'Academic Results',
				href: '/subject-tuition#subject-tuition-results',
			},
			{
				label: 'Home Education',
				href: '/subject-tuition#subject-tuition-homeschooling-preview',
			},
		],
	},
	{
		label: 'How It Works',
		href: '/how-it-works',
		items: [
			{
				label: 'Introduction',
				href: '/how-it-works',
			},
			{
				label: 'Our Process',
				href: '/how-it-works#how-it-works-process-steps',
			},
			{
				label: 'Meet Our Tutors',
				href: '/how-it-works#how-it-works-tutors',
			},
			{
				label: 'Pricing Tiers',
				href: '/how-it-works#how-it-works-tutoring-tiers',
			},
			{
				label: 'Why Choose Us',
				href: '/how-it-works#how-it-works-benefits',
			},
		],
	},
	{
		label: 'Testimonials',
		href: '/testimonials',
		items: [
			{
				label: 'Introduction',
				href: '/testimonials',
			},
			{
				label: 'Filter Reviews',
				href: '/testimonials#testimonials-filter',
			},
			{
				label: 'All Reviews',
				href: '/testimonials#testimonials-grid',
			},
			{
				label: 'Elite Schools',
				href: '/testimonials#testimonials-schools-carousel',
			},
		],
	},
	{
		label: 'Video Masterclasses',
		href: '/video-masterclasses',
		items: [
			{
				label: 'Introduction',
				href: '/video-masterclasses',
			},
			{
				label: 'Free Resources',
				href: '/video-masterclasses#free-video-content',
			},
			{
				label: 'UCAS Guide',
				href: '/video-masterclasses#ucas-video-content',
			},
			{
				label: 'British Culture',
				href: '/video-masterclasses#british-culture-video-content',
			},
		],
	},
] as const;

// Mobile-specific navigation (can be different from desktop if needed)
export const MOBILE_NAVIGATION_ITEMS: readonly NavigationItem[] = [
	{
		label: 'About Us',
		href: '/about',
	},
	{
		label: 'Subject Tuition',
		href: '/subject-tuition',
	},
	{
		label: 'How It Works',
		href: '/how-it-works',
	},
	{
		label: 'Testimonials',
		href: '/testimonials',
	},
	{
		label: 'Video Masterclasses',
		href: '/video-masterclasses',
	},
	{
		label: '11+ Bootcamps',
		href: '/11-plus-bootcamps',
	},
	{
		label: 'FAQ',
		href: '/faq',
	},
	{
		label: 'Contact',
		href: '/contact',
	},
] as const;

// ============================================================================
// FOOTER NAVIGATION DATA
// ============================================================================

export const FOOTER_SECTIONS: readonly FooterSection[] = [
	{
		title: 'Our Services',
		links: [
			{ label: '11+ Preparation', href: '/11-plus-bootcamps' },
			{ label: 'GCSE & A-Level Tutoring', href: '/subject-tuition' },
			{ label: 'Oxbridge Preparation', href: '/subject-tuition' },
			{ label: 'Homeschooling Support', href: '/homeschooling' },
			{ label: 'Video Masterclasses', href: '/video-masterclasses' },
		],
	},
	{
		title: 'About & Team',
		links: [
			{ label: 'About Elizabeth & Our Story', href: '/about' },
			{ label: 'Meet Our Tutors', href: '/meet-our-tutors' },
			{ label: 'How It Works', href: '/how-it-works' },
			{ label: 'Testimonials', href: '/testimonials' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Exam Papers', href: '/exam-papers' },
			{ label: 'Video Masterclasses', href: '/video-masterclasses' },
			{ label: 'FAQ', href: '/faq' },
			{ label: 'Contact Us', href: '/contact' },
		],
	},
	{
		title: 'Legal & Trust',
		links: [
			{ label: 'Privacy Policy', href: '/legal/privacy-policy' },
			{ label: 'Terms of Service', href: '/legal/terms-of-service' },
			{ label: 'Cookie Policy', href: '/legal/cookie-policy' },
		],
	},
] as const;

// ============================================================================
// BRAND & COMPANY DATA
// ============================================================================

export const COMPANY_INFO = {
	name: 'My Private Tutor Online',
	tagline: 'Exceptional online tutoring trusted by families worldwide',
	description: 'From GCSE excellence to Oxbridge success',
	founded: '2010',
	heritage: '15 years of educational excellence',
} as const;

export const CONTACT_INFO = {
	email: 'info@myprivatetutoronline.com',
	phone: '+44 7513 550278',
	address: {
		line1: 'Mayfair Educational Centre',
		line2: '123 Berkeley Square',
		city: 'London',
		postcode: 'W1J 6BR',
		country: 'United Kingdom',
	},
} as const;

// ============================================================================
// LEGAL & COPYRIGHT
// ============================================================================

export const COPYRIGHT_TEXT = '© 2025 My Private Tutor Online. All rights reserved.';

export const SOCIAL_MEDIA_LINKS = {
	// Add social media links here when available
	// twitter: 'https://twitter.com/...',
	// linkedin: 'https://linkedin.com/company/...',
	// facebook: 'https://facebook.com/...',
} as const;
