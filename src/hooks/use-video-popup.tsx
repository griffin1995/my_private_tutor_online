'use client';

import { useState, useCallback } from 'react';

export interface UseVideoPopupReturn {
	isOpen: boolean;
	openVideo: () => void;
	closeVideo: () => void;
}

/**
 * React 19 pattern: Custom hook for video popup state management
 * Encapsulates modal state and handlers for better separation of concerns
 */
export function useVideoPopup(): UseVideoPopupReturn {
	const [isOpen, setIsOpen] = useState(false);

	const openVideo = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeVideo = useCallback(() => {
		setIsOpen(false);
	}, []);

	return {
		isOpen,
		openVideo,
		closeVideo,
	};
}