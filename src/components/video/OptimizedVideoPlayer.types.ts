import React from 'react';
export interface ReactPlayerConfig {
	youtube?: {
		playerVars?: {
			showinfo?: 0 | 1;
			playsinline?: 0 | 1;
			modestbranding?: 0 | 1;
			rel?: 0 | 1;
			controls?: 0 | 1;
			autoplay?: 0 | 1;
			mute?: 0 | 1;
			start?: number;
			end?: number;
			loop?: 0 | 1;
			fs?: 0 | 1;
			cc_load_policy?: 0 | 1;
			iv_load_policy?: 1 | 3;
			disablekb?: 0 | 1;
			enablejsapi?: 0 | 1;
			origin?: string;
			widget_referrer?: string;
		};
		embedOptions?: {
			host?: string;
			onUnstarted?: (event: YouTubePlayerEvent) => void;
			onError?: (event: YouTubeErrorEvent) => void;
		};
	};
	vimeo?: {
		playerOptions?: {
			autopause?: boolean;
			autoplay?: boolean;
			background?: boolean;
			byline?: boolean;
			color?: string;
			controls?: boolean;
			dnt?: boolean;
			height?: number;
			keyboard?: boolean;
			loop?: boolean;
			maxheight?: number;
			maxwidth?: number;
			muted?: boolean;
			pip?: boolean;
			playsinline?: boolean;
			portrait?: boolean;
			responsive?: boolean;
			speed?: boolean;
			texttrack?: string;
			title?: boolean;
			transparent?: boolean;
			width?: number;
		};
	};
	file?: {
		attributes?: React.VideoHTMLAttributes<HTMLVideoElement>;
		tracks?: Array<{
			kind: string;
			src: string;
			srcLang: string;
			default?: boolean;
			label?: string;
		}>;
		forceVideo?: boolean;
		forceAudio?: boolean;
		forceHLS?: boolean;
		forceDASH?: boolean;
		forceFLV?: boolean;
		hlsOptions?: HLSPlayerOptions;
		dashOptions?: DASHPlayerOptions;
		flvOptions?: FLVPlayerOptions;
	};
}
export interface VideoPlayerCallbacks {
	onReady?: (player: ReactPlayerInstance) => void;
	onStart?: () => void;
	onPlay?: () => void;
	onPause?: () => void;
	onBuffer?: () => void;
	onBufferEnd?: () => void;
	onEnded?: () => void;
	onError?: (error: VideoPlayerError) => void;
	onProgress?: (state: {
		played: number;
		playedSeconds: number;
		loaded: number;
		loadedSeconds: number;
	}) => void;
	onDuration?: (duration: number) => void;
	onSeek?: (seconds: number) => void;
	onPlaybackRateChange?: (playbackRate: number) => void;
	onPlaybackQualityChange?: (quality: string) => void;
}
export interface LazyLoadingOptions {
	enableLazyLoading?: boolean;
	preloadMargin?: string;
	threshold?: number | number[];
	fallbackInView?: boolean;
	triggerOnce?: boolean;
	skip?: boolean;
	trackVisibility?: boolean;
	delay?: number;
}
export interface AccessibilityOptions {
	ariaLabel?: string;
	ariaDescription?: string;
	keyboardControls?: boolean;
	focusManagement?: boolean;
	screenReaderSupport?: boolean;
	captionsEnabled?: boolean;
	transcriptAvailable?: boolean;
	audioDescription?: boolean;
}
export type VideoPlayerVariant = 'hero' | 'thumbnail-card' | 'testimonial';
export type VideoPlayerSize = 'small' | 'medium' | 'large' | 'full';
export type VideoPlayerAspectRatio = '16:9' | '4:3' | '1:1' | '9:16' | 'custom';
export type VideoPlayerQuality =
	| 'auto'
	| 'small'
	| 'medium'
	| 'large'
	| 'hd720'
	| 'hd1080'
	| 'highres';
export interface OptimizedVideoPlayerProps
	extends VideoPlayerCallbacks,
		LazyLoadingOptions,
		AccessibilityOptions {
	videoId: string;
	title: string;
	thumbnail?: string;
	variant?: VideoPlayerVariant;
	className?: string;
	light?: boolean | React.ReactElement;
	config?: ReactPlayerConfig;
	autoPlay?: boolean;
	muted?: boolean;
	controls?: boolean;
	loop?: boolean;
	playsinline?: boolean;
	width?: string | number;
	height?: string | number;
	aspectRatio?: VideoPlayerAspectRatio | string;
	size?: VideoPlayerSize;
	preload?: 'none' | 'metadata' | 'auto';
	quality?: VideoPlayerQuality;
	modalEnabled?: boolean;
	clickToPlay?: boolean;
	doubleClickToFullscreen?: boolean;
	pip?: boolean;
	playbackRates?: number[];
	volume?: number;
	seek?: number;
	thumbnailClassName?: string;
	playerClassName?: string;
	controlsClassName?: string;
}
export interface VideoPlayerState {
	isPlaying: boolean;
	isReady: boolean;
	hasError: boolean;
	isLoading: boolean;
	isModalOpen: boolean;
	isMuted: boolean;
	volume: number;
	played: number;
	loaded: number;
	duration: number;
	playbackRate: number;
	pip: boolean;
	seeking: boolean;
	fullscreen: boolean;
}
export interface VideoPlayerError {
	type: 'network' | 'decode' | 'src_not_supported' | 'permission' | 'unknown';
	message: string;
	code?: number;
	details?: Record<string, unknown>;
	timestamp: number;
	videoId: string;
	recoverable: boolean;
}
export interface VideoPlayerEvents {
	onVideoReady?: (state: VideoPlayerState) => void;
	onVideoStart?: (state: VideoPlayerState) => void;
	onVideoPlay?: (state: VideoPlayerState) => void;
	onVideoPause?: (state: VideoPlayerState) => void;
	onVideoEnd?: (state: VideoPlayerState) => void;
	onVideoError?: (error: VideoPlayerError) => void;
	onVideoProgress?: (state: VideoPlayerState) => void;
	onVideoSeek?: (state: VideoPlayerState) => void;
	onVideoBuffer?: (state: VideoPlayerState) => void;
	onVideoBufferEnd?: (state: VideoPlayerState) => void;
	onVolumeChange?: (volume: number, muted: boolean) => void;
	onPlaybackRateChange?: (rate: number) => void;
	onFullscreenChange?: (isFullscreen: boolean) => void;
	onPictureInPictureChange?: (isPip: boolean) => void;
}
export interface VideoPlayerRef {
	play: () => void;
	pause: () => void;
	stop: () => void;
	seekTo: (seconds: number, type?: 'seconds' | 'fraction') => void;
	setVolume: (volume: number) => void;
	mute: () => void;
	unmute: () => void;
	setPlaybackRate: (rate: number) => void;
	getCurrentTime: () => number;
	getSecondsLoaded: () => number;
	getDuration: () => number;
	getInternalPlayer: () => ReactPlayerInstance | null;
	requestFullscreen: () => void;
	exitFullscreen: () => void;
	requestPictureInPicture: () => void;
	exitPictureInPicture: () => void;
	isPlaying: () => boolean;
	isMuted: () => boolean;
	getVolume: () => number;
	getPlaybackRate: () => number;
}
export interface VideoMetadata {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoId: string | null;
	readonly thumbnailUrl: string;
	readonly duration: number;
	readonly isFree: boolean;
	readonly price?: string;
	readonly paymentUrl?: string;
}
export interface VideoSearchResult extends VideoMetadata {
	readonly key: string;
	readonly category: 'free' | 'paid';
	readonly featured: boolean;
	readonly masterclassAuthor: string;
	readonly masterclassRole: string;
}
export interface VideoUtilityFunctions {
	extractVideoId: (url: string) => string | null;
	getVideoMetadata: (videoKey: string) => VideoMetadata | null;
	isVideoFree: (videoKey: string) => boolean;
	getVideoUrlForPlayer: (videoKey: string) => string | null;
	getFreeVideos: () => VideoMetadata[];
	getPaidVideos: () => VideoMetadata[];
	isValidVideoUrl: (url: string) => boolean;
	formatVideoDuration: (seconds: number) => string;
	getAllVideoIds: () => readonly string[];
	getVideoById: (videoId: string) => VideoSearchResult | null;
}
export interface OptimizedVideoPlayerPropsWithCMS
	extends Omit<OptimizedVideoPlayerProps, 'videoId'> {
	videoKey?: string;
	videoId?: string;
	videoUrl?: string;
	metadata?: Partial<VideoMetadata>;
	enablePaymentGate?: boolean;
	onPaymentRequired?: (paymentUrl: string, price: string) => void;
	showDuration?: boolean;
	showPrice?: boolean;
	showAuthor?: boolean;
	useMetadataForAccessibility?: boolean;
}
export interface VideoValidationResult {
	isValid: boolean;
	videoId: string | null;
	videoType: 'youtube' | 'local' | 'external' | 'invalid';
	errors: string[];
	warnings: string[];
	metadata?: VideoMetadata;
}
export interface VideoPlayerAnalytics {
	videoId: string;
	sessionId: string;
	startTime: number;
	endTime?: number;
	duration: number;
	watchTime: number;
	completionRate: number;
	interactions: {
		play: number;
		pause: number;
		seek: number;
		volumeChange: number;
		fullscreen: number;
		pictureInPicture: number;
	};
	errors: VideoPlayerError[];
	performance: {
		loadTime: number;
		firstPlay: number;
		bufferEvents: number;
		averageBitrate?: number;
	};
	metadata: VideoMetadata;
}
export interface YouTubePlayerEvent {
	readonly target: YouTubePlayer;
	readonly data: number;
}
export interface YouTubeErrorEvent {
	readonly target: YouTubePlayer;
	readonly data: YouTubeErrorCode;
}
export interface YouTubePlayer {
	playVideo(): void;
	pauseVideo(): void;
	stopVideo(): void;
	seekTo(seconds: number, allowSeekAhead?: boolean): void;
	getCurrentTime(): number;
	getDuration(): number;
	getVideoUrl(): string;
	getPlayerState(): YouTubePlayerState;
	getPlaybackRate(): number;
	setPlaybackRate(suggestedRate: number): void;
	mute(): void;
	unMute(): void;
	isMuted(): boolean;
	setVolume(volume: number): void;
	getVolume(): number;
}
export enum YouTubePlayerState {
	UNSTARTED = -1,
	ENDED = 0,
	PLAYING = 1,
	PAUSED = 2,
	BUFFERING = 3,
	CUED = 5,
}
export enum YouTubeErrorCode {
	INVALID_PARAMETER = 2,
	HTML5_ERROR = 5,
	VIDEO_NOT_FOUND = 100,
	EMBEDDING_NOT_ALLOWED = 101,
	EMBEDDING_NOT_ALLOWED_IN_DISGUISE = 150,
}
export interface ReactPlayerInstance {
	seekTo(amount: number, type?: 'seconds' | 'fraction'): void;
	getCurrentTime(): number;
	getSecondsLoaded(): number;
	getDuration(): number;
	getInternalPlayer(key?: string): unknown;
	showPreview(): void;
}
export interface HLSPlayerOptions {
	readonly enableWorker?: boolean;
	readonly lowLatencyMode?: boolean;
	readonly backBufferLength?: number;
	readonly maxBufferLength?: number;
	readonly maxMaxBufferLength?: number;
	readonly maxBufferSize?: number;
	readonly maxBufferHole?: number;
	readonly highBufferWatchdogPeriod?: number;
	readonly nudgeOffset?: number;
	readonly nudgeMaxRetry?: number;
	readonly maxFragLookUpTolerance?: number;
	readonly liveSyncDurationCount?: number;
	readonly liveMaxLatencyDurationCount?: number;
	readonly liveDurationInfinity?: boolean;
	readonly enableSoftwareAES?: boolean;
	readonly manifestLoadingTimeOut?: number;
	readonly manifestLoadingMaxRetry?: number;
	readonly manifestLoadingRetryDelay?: number;
	readonly levelLoadingTimeOut?: number;
	readonly levelLoadingMaxRetry?: number;
	readonly levelLoadingRetryDelay?: number;
	readonly fragLoadingTimeOut?: number;
	readonly fragLoadingMaxRetry?: number;
	readonly fragLoadingRetryDelay?: number;
	readonly startFragPrefetch?: boolean;
	readonly testBandwidth?: boolean;
	readonly progressive?: boolean;
	readonly lowLatencyMode?: boolean;
}
export interface DASHPlayerOptions {
	readonly debug?: {
		readonly logLevel?: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
	};
	readonly streaming?: {
		readonly retryAttempts?: {
			readonly MPD?: number;
			readonly XLinkExpansion?: number;
			readonly InitialRepresentation?: number;
			readonly MediaSegment?: number;
			readonly BitstreamSwitching?: number;
			readonly FragmentedText?: number;
			readonly lowLatencyReductionFactor?: number;
		};
		readonly retryIntervals?: {
			readonly MPD?: number;
			readonly XLinkExpansion?: number;
			readonly InitialRepresentation?: number;
			readonly MediaSegment?: number;
			readonly BitstreamSwitching?: number;
			readonly FragmentedText?: number;
			readonly lowLatencyReductionFactor?: number;
		};
		readonly abandonLoadTimeout?: number;
		readonly wallclockTimeUpdateInterval?: number;
		readonly manifestUpdateRetryInterval?: number;
		readonly cacheInitSegments?: boolean;
		readonly bufferToKeep?: number;
		readonly bufferPruningInterval?: number;
		readonly stableBufferTime?: number;
		readonly bufferTimeAtTopQuality?: number;
		readonly bufferTimeAtTopQualityLongForm?: number;
		readonly longFormContentDurationThreshold?: number;
		readonly fastSwitchEnabled?: boolean;
		readonly movingAverageMethod?: 'slidingWindow' | 'exponential';
		readonly jumpGaps?: boolean;
		readonly smallGapLimit?: number;
		readonly liveDelay?: number;
		readonly useSuggestedPresentationDelay?: boolean;
	};
}
export interface FLVPlayerOptions {
	readonly type?: 'flv' | 'mp4' | 'm4v' | 'm4a' | 'aac';
	readonly isLive?: boolean;
	readonly cors?: boolean;
	readonly withCredentials?: boolean;
	readonly hasAudio?: boolean;
	readonly hasVideo?: boolean;
	readonly duration?: number;
	readonly filesize?: number;
	readonly enableWorker?: boolean;
	readonly enableStashBuffer?: boolean;
	readonly stashInitialSize?: number;
	readonly lazyLoad?: boolean;
	readonly lazyLoadMaxDuration?: number;
	readonly lazyLoadRecoverDuration?: number;
	readonly deferLoadAfterSourceOpen?: boolean;
	readonly seekType?: 'range' | 'param' | 'custom';
	readonly seekParamStart?: string;
	readonly seekParamEnd?: string;
	readonly rangeLoadZeroStart?: boolean;
	readonly customSeekHandler?: (currentTime: number) => string | undefined;
	readonly reuseRedirectedURL?: boolean;
	readonly referrerPolicy?:
		| 'no-referrer'
		| 'no-referrer-when-downgrade'
		| 'origin'
		| 'origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'strict-origin-when-cross-origin'
		| 'unsafe-url';
}
