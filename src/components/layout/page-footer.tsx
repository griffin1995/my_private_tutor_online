import { getCopyrightText, getFooterContent } from '@/lib/cms';
import { PageFooterClient } from './page-footer-client';
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
	const footerContent = getFooterContent();
	const copyrightText = getCopyrightText();
	return (
		<PageFooterClient
			footerContent={footerContent}
			copyrightText={copyrightText}
			className={className}
			variant={variant}
			showBackToTop={showBackToTop}
			showNewsletter={showNewsletter}
			showContactForm={showContactForm}
		/>
	);
}
export type PageFooterVariant = 'default' | 'minimal' | 'premium';
