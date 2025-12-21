'use client';

import { Button } from '@/components/ui/button';
import { useContactHandler } from '@/hooks/use-contact-handler';
import { getElevenPlusBootcampsContent } from '@/lib/cms/cms-content';

/**
 * React 19 pattern: Client Component with custom hook integration
 * Demonstrates modern separation of concerns - UI logic vs business logic
 */
export function ContactButtonClient() {
	const { handleContactClick } = useContactHandler();
	const data = getElevenPlusBootcampsContent();
	const { contact } = data.content.offSeason;

	const onClick = () => {
		handleContactClick({
			message: contact.message,
			subject: contact.subject,
			url: contact.url,
		});
	};

	return (
		<Button
			size="lg"
			onClick={onClick}
			aria-label={contact.ariaLabel}>
			{contact.buttonText}
		</Button>
	);
}