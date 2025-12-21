'use client';

import { useCallback } from 'react';

export interface ContactConfig {
	message: string;
	subject: string;
	url: string;
}

export interface UseContactHandlerReturn {
	handleContactClick: (config: ContactConfig) => void;
}

/**
 * React 19 pattern: Custom hook for external contact form handling
 * Encapsulates URL construction and window opening logic
 * Follows 2025 best practices for separation of concerns
 */
export function useContactHandler(): UseContactHandlerReturn {
	const handleContactClick = useCallback((config: ContactConfig) => {
		const encodedText = encodeURIComponent(config.message);
		const encodedSubject = encodeURIComponent(config.subject);
		const contactUrl = `${config.url}?subject=${encodedSubject}&message=${encodedText}`;

		window.open(contactUrl, '_blank', 'noopener,noreferrer');
	}, []);

	return {
		handleContactClick,
	};
}