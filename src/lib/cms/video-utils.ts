const YOUTUBE_URL_PATTERNS = {
	standard:
		/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
	embed: /youtube\.com\/embed\/([^"&?\/\s]{11})/i,
	short: /youtu\.be\/([^"&?\/\s]{11})/i,
} as const;
export function extractVideoId(url: string): string | null {
	if (!url || typeof url !== 'string') {
		return null;
	}
	const trimmedUrl = url.trim();
	if (trimmedUrl.length === 11 && /^[A-Za-z0-9_-]{11}$/.test(trimmedUrl)) {
		return trimmedUrl;
	}
	for (const pattern of Object.values(YOUTUBE_URL_PATTERNS)) {
		const match = trimmedUrl.match(pattern);
		if (match && match[1]) {
			return match[1];
		}
	}
	return null;
}
export function getVideoMetadata(videoKey: string): {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoId: string | null;
	readonly thumbnailUrl: string;
	readonly duration: number;
	readonly isFree: boolean;
	readonly price?: string;
	readonly paymentUrl?: string;
} | null {
	const { MASTERCLASS_VIDEOS } = require('./cms-images');
	const video = MASTERCLASS_VIDEOS[videoKey as keyof typeof MASTERCLASS_VIDEOS];
	if (!video) {
		return null;
	}
	const videoId = extractVideoId(video.videoUrl || video.src);
	return {
		id: video.id,
		title: video.title,
		description: video.description,
		videoId,
		thumbnailUrl: video.thumbnailUrl,
		duration: video.duration,
		isFree: video.isFree,
		price: video.price,
		paymentUrl: video.paymentUrl,
	} as const;
}
export function isVideoFree(videoKey: string): boolean {
	const metadata = getVideoMetadata(videoKey);
	return metadata?.isFree ?? false;
}
export function getVideoUrlForPlayer(videoKey: string): string | null {
	const metadata = getVideoMetadata(videoKey);
	if (!metadata?.videoId) {
		return null;
	}
	return `https://www.youtube.com/watch?v=${metadata.videoId}`;
}
export function getFreeVideos(): Array<{
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoId: string | null;
	readonly thumbnailUrl: string;
	readonly duration: number;
}> {
	const { MASTERCLASS_VIDEOS } = require('./cms-images');
	return Object.entries(MASTERCLASS_VIDEOS)
		.filter(([_, video]) => video.isFree)
		.map(([key, video]) => {
			const videoId = extractVideoId(video.videoUrl || video.src);
			return {
				id: video.id,
				title: video.title,
				description: video.description,
				videoId,
				thumbnailUrl: video.thumbnailUrl,
				duration: video.duration,
			};
		});
}
export function getPaidVideos(): Array<{
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoId: string | null;
	readonly thumbnailUrl: string;
	readonly duration: number;
	readonly price: string;
	readonly paymentUrl: string;
}> {
	const { MASTERCLASS_VIDEOS } = require('./cms-images');
	return Object.entries(MASTERCLASS_VIDEOS)
		.filter(([_, video]) => !video.isFree && video.price && video.paymentUrl)
		.map(([key, video]) => {
			const videoId = extractVideoId(video.videoUrl || video.src);
			return {
				id: video.id,
				title: video.title,
				description: video.description,
				videoId,
				thumbnailUrl: video.thumbnailUrl,
				duration: video.duration,
				price: video.price!,
				paymentUrl: video.paymentUrl!,
			};
		});
}
export function isValidVideoUrl(url: string): boolean {
	if (!url || typeof url !== 'string') {
		return false;
	}
	return (
		extractVideoId(url) !== null ||
		url.startsWith('/videos/') ||
		(url.startsWith('http') && url.includes('.mp4'))
	);
}
export function formatVideoDuration(seconds: number): string {
	if (typeof seconds !== 'number' || seconds < 0) {
		return '0:00';
	}
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
export function getAllVideoIds(): readonly string[] {
	const { MASTERCLASS_VIDEOS } = require('./cms-images');
	return Object.values(MASTERCLASS_VIDEOS)
		.map((video) => extractVideoId(video.videoUrl || video.src))
		.filter((id): id is string => id !== null);
}
export function getVideoById(videoId: string): {
	readonly key: string;
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoId: string;
	readonly thumbnailUrl: string;
	readonly duration: number;
	readonly isFree: boolean;
	readonly price?: string;
	readonly paymentUrl?: string;
} | null {
	const { MASTERCLASS_VIDEOS } = require('./cms-images');
	const entry = Object.entries(MASTERCLASS_VIDEOS).find(([key, video]) => {
		const extractedId = extractVideoId(video.videoUrl || video.src);
		return extractedId === videoId;
	});
	if (!entry) {
		return null;
	}
	const [key, video] = entry;
	return {
		key,
		id: video.id,
		title: video.title,
		description: video.description,
		videoId,
		thumbnailUrl: video.thumbnailUrl,
		duration: video.duration,
		isFree: video.isFree,
		price: video.price,
		paymentUrl: video.paymentUrl,
	};
}
export const videoUtils = {
	extractVideoId,
	getVideoMetadata,
	isVideoFree,
	getVideoUrlForPlayer,
	getFreeVideos,
	getPaidVideos,
	isValidVideoUrl,
	formatVideoDuration,
	getAllVideoIds,
	getVideoById,
} as const;
export default videoUtils;
