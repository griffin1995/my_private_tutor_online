/**
 * CMS Video Masterclasses
 *
 * Synchronous content management for video masterclasses following project CMS standards.
 * This module provides direct JSON imports and synchronous accessor functions.
 *
 * CRITICAL: This follows the project's synchronous CMS architecture.
 * NO async patterns, useState/useEffect for static content, or dynamic imports allowed.
 */

import videoMasterclassesData from '@/content/video-masterclasses.json';

export interface VideoMasterclass {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly bulletPoints?: readonly string[];
	readonly youtubeUrl: string;
	readonly thumbnailImage: string;
	readonly backgroundImage: string;
	readonly isPaid: boolean;
	readonly purchaseLink?: string;
	readonly duration?: number;
}

/**
 * Get all video masterclasses
 * @returns Array of all video masterclass data
 */
export const getVideoMasterclasses = (): readonly VideoMasterclass[] => {
	return videoMasterclassesData as readonly VideoMasterclass[];
};

/**
 * Get a specific video masterclass by ID
 * @param id - The video masterclass ID
 * @returns The video masterclass data or undefined if not found
 */
export const getVideoMasterclassById = (id: string): VideoMasterclass | undefined => {
	const videos = getVideoMasterclasses();
	return videos.find(video => video.id === id);
};

/**
 * Get featured videos (first 2)
 * @returns Array of featured video masterclasses
 */
export const getFeaturedVideoMasterclasses = (): readonly VideoMasterclass[] => {
	const videos = getVideoMasterclasses();
	return videos.slice(0, 2);
};

/**
 * Get UCAS videos (positions 2-3)
 * @returns Array of UCAS-related video masterclasses
 */
export const getUcasVideoMasterclasses = (): readonly VideoMasterclass[] => {
	const videos = getVideoMasterclasses();
	return videos.slice(2, 4);
};

/**
 * Get culture videos (positions 4-5)
 * @returns Array of culture-related video masterclasses
 */
export const getCultureVideoMasterclasses = (): readonly VideoMasterclass[] => {
	const videos = getVideoMasterclasses();
	return videos.slice(4, 6);
};

/**
 * Get free videos
 * @returns Array of free video masterclasses
 */
export const getFreeVideoMasterclasses = (): readonly VideoMasterclass[] => {
	const videos = getVideoMasterclasses();
	return videos.filter(video => !video.isPaid);
};

/**
 * Get paid videos
 * @returns Array of paid video masterclasses
 */
export const getPaidVideoMasterclasses = (): readonly VideoMasterclass[] => {
	const videos = getVideoMasterclasses();
	return videos.filter(video => video.isPaid);
};