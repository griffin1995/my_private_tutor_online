import { PageFooterClient } from './page-footer-client';

// ============================================================================
// HARDCODED FOOTER DATA - NO CMS DEPENDENCIES
// ============================================================================

const FOOTER_CONTENT = {
	companyName: 'My Private Tutor Online',
	description:
		'Exceptional online tutoring trusted by families worldwide. From GCSE excellence to Oxbridge success.',
	logo: {
		main: '/images/logos/logo-with-name.png',
		alt: 'My Private Tutor Online - Premium Educational Services',
		width: 400,
		height: 400,
	},
	footerSections: [
		{
			title: 'Our Services',
			links: [
				{ label: '11+ Preparation', href: '/11-plus-bootcamps' },
				{
					label: 'GCSE & A-Level Tutoring',
					href: '/subject-tuition?tab=secondary-school',
				},
				{
					label: 'Oxbridge Preparation',
					href: '/subject-tuition?tab=university-admissions',
				},
				{
					label: 'Homeschooling Support',
					href: '/subject-tuition?tab=online-homeschooling',
				},
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
	],
};

const COPYRIGHT_TEXT = '© 2025 My Private Tutor Online. All rights reserved.';

interface PageFooterProps {
	className?: string;
	variant?: 'default' | 'minimal' | 'premium';
	showBackToTop?: boolean;
	showNewsletter?: boolean;
	showContactForm?: boolean;
}

export function PageFooter({
	className,
	variant = 'default',
	showBackToTop = true,
	showNewsletter = false,
	showContactForm = false,
}: PageFooterProps) {
	return (
		<PageFooterClient
			footerContent={FOOTER_CONTENT}
			copyrightText={COPYRIGHT_TEXT}
			className={className}
			variant={variant}
			showBackToTop={showBackToTop}
			showNewsletter={showNewsletter}
			showContactForm={showContactForm}
		/>
	);
}

export type PageFooterVariant = 'default' | 'minimal' | 'premium';
