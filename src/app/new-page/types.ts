export interface StandardizedContent {
	readonly title: string;
	readonly description: string;
	readonly subtitle?: string;
	readonly secondaryDescription?: string;
	readonly bulletPoints?: readonly string[];
	readonly backgroundColor?: 'white' | 'gray-50';
	readonly className?: string;
	readonly id: string;
	readonly sectionType: 'heading-text' | 'video-grid';
}
export interface StandardizedHeadingContent extends StandardizedContent {
	readonly sectionType: 'heading-text';
}
export interface StandardizedVideoContent extends StandardizedContent {
	readonly sectionType: 'video-grid';
	readonly videos: readonly StandardizedVideoMasterclass[];
}
export interface StandardizedVideoMasterclass {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly bulletPoints?: readonly string[];
	readonly youtubeUrl: string | null;
	readonly thumbnailImage: string;
	readonly backgroundImage: string;
	readonly isPaid: boolean;
	readonly purchaseLink?: string;
}
export function createHeadingTextSection(
	id: string,
	title: string,
	description: string,
	subtitle?: string,
	secondaryDescription?: string,
	backgroundColor?: 'white' | 'gray-50',
	className?: string,
): StandardizedHeadingContent {
	return {
		id,
		title,
		description,
		subtitle,
		secondaryDescription,
		backgroundColor,
		className,
		sectionType: 'heading-text',
	};
}
export function createVideoGridSection(
	id: string,
	videos: readonly StandardizedVideoMasterclass[],
	className?: string,
): StandardizedVideoContent {
	return {
		id,
		title: '',
		description: '',
		videos,
		className,
		sectionType: 'video-grid',
	};
}
