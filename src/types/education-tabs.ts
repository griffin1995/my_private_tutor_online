export interface VideoAsset {
	readonly id: string;
	readonly youtubeUrl: string;
	readonly thumbnailSrc: string;
	readonly thumbnailAlt: string;
	readonly isFree: boolean;
	readonly purchaseLink?: string;
}
export interface SubsectionCard {
	readonly id: string;
	readonly heading: string;
	readonly mainTextBody: string;
	readonly videos?: ReadonlyArray<VideoAsset>;
}
export interface CallOut {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly icon?:
		| 'award'
		| 'users'
		| 'school'
		| 'trending-up'
		| 'shield'
		| 'check-circle';
}
export interface EducationLevelTabContent {
	readonly id: string;
	readonly title: string;
	readonly mainDescription: string;
	readonly subsections: ReadonlyArray<SubsectionCard>;
	readonly callOuts: ReadonlyArray<CallOut>;
	readonly testimonialIds: ReadonlyArray<string>;
	readonly statIds?: ReadonlyArray<string>;
}
