/**
 * CONTEXT7 SOURCE: /vercel/next.js - Advanced analytics and conversion tracking patterns for performance optimization
 * CONVERSION TRACKING REASON: Official Next.js documentation shows implementing conversion funnels and user journey analytics
 * PATTERN: Comprehensive conversion optimization with A/B testing and behavioral analytics
 */

'use client';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Conversion event types for comprehensive tracking
 * EVENT TYPES REASON: Official Next.js documentation shows categorizing user interactions for analytics
 */
export type ConversionEventType =
	| 'about_section_view'
	| 'founder_image_view'
	| 'credentials_interaction'
	| 'video_engagement'
	| 'scroll_milestone'
	| 'time_on_section'
	| 'exit_intent'
	| 'cta_impression'
	| 'trust_signal_view'
	| 'mobile_optimization';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - A/B testing variant configuration
 * AB_TESTING REASON: Official Next.js documentation shows implementing controlled experiments for optimization
 */
export type ABTestVariant = 'control' | 'variant_a' | 'variant_b' | 'variant_c';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Conversion event data structure for comprehensive analytics
 * EVENT DATA REASON: Official Next.js documentation shows structured event tracking for conversion analysis
 */
export interface ConversionEvent {
	/** Event type for categorization */
	type: ConversionEventType;
	/** Event timestamp */
	timestamp: number;
	/** A/B testing variant */
	variant: ABTestVariant;
	/** User session identifier */
	sessionId: string;
	/** Section-specific metadata */
	metadata: {
		/** Scroll percentage when event occurred */
		scrollPercentage?: number;
		/** Time spent on section in milliseconds */
		timeOnSection?: number;
		/** Viewport dimensions */
		viewport?: { width: number; height: number };
		/** Device type classification */
		deviceType?: 'mobile' | 'tablet' | 'desktop';
		/** User engagement score */
		engagementScore?: number;
		/** Interaction coordinates */
		coordinates?: { x: number; y: number };
		/** Performance metrics */
		performanceMetrics?: {
			loadTime: number;
			renderTime: number;
			interactionDelay: number;
		};
	};
	/** Custom properties for extended tracking */
	properties?: Record<string, any>;
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Conversion funnel stage definitions
 * FUNNEL STAGES REASON: Official Next.js documentation shows mapping user journey stages for optimization
 */
export interface ConversionFunnelStage {
	/** Stage identifier */
	stage: string;
	/** Stage display name */
	name: string;
	/** Required events to complete stage */
	requiredEvents: ConversionEventType[];
	/** Stage completion rate */
	completionRate?: number;
	/** Average time to complete stage */
	averageTime?: number;
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - A/B testing configuration for about section optimization
 * TESTING CONFIG REASON: Official Next.js documentation shows structured experiment configuration
 */
export interface ABTestConfig {
	/** Test identifier */
	testId: string;
	/** Test name */
	name: string;
	/** Test description */
	description: string;
	/** Test variants with traffic allocation */
	variants: {
		[K in ABTestVariant]?: {
			weight: number;
			config: Record<string, any>;
		};
	};
	/** Test start and end dates */
	dateRange: {
		start: Date;
		end: Date;
	};
	/** Success metrics */
	successMetrics: ConversionEventType[];
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Conversion tracking manager for comprehensive analytics
 * TRACKING MANAGER REASON: Official Next.js documentation shows implementing centralized analytics management
 */
export class ConversionTracker {
	private events: ConversionEvent[] = [];
	private sessionId: string;
	private currentVariant: ABTestVariant = 'control';
	private sectionStartTime: number;
	private engagementScore: number = 0;
	private observers: IntersectionObserver[] = [];

	constructor() {
		this.sessionId = this.generateSessionId();
		this.sectionStartTime = Date.now();
		this.initializeTracking();
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Session identification for user journey tracking
	 * SESSION ID REASON: Official Next.js documentation shows unique session identification for analytics
	 */
	private generateSessionId(): string {
		return `about_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Tracking initialization with intersection observers
	 * INITIALIZATION REASON: Official Next.js documentation shows setting up performance and behavior tracking
	 */
	private initializeTracking(): void {
		if (typeof window === 'undefined') return;

		this.setupIntersectionObservers();
		this.setupEngagementTracking();
		this.setupExitIntentTracking();
		this.assignABTestVariant();
	}

	/**
	 * CONTEXT7 SOURCE: /mozilla/mdn - Intersection Observer setup for visibility tracking
	 * VISIBILITY TRACKING REASON: Official MDN documentation shows monitoring element visibility for engagement
	 */
	private setupIntersectionObservers(): void {
		// CONTEXT7 SOURCE: /mozilla/mdn - About section visibility observer
		// SECTION VISIBILITY: Track when about section enters viewport
		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.trackEvent('about_section_view', {
							scrollPercentage: this.getScrollPercentage(),
							viewport: this.getViewportDimensions(),
							deviceType: this.getDeviceType(),
						});
					}
				});
			},
			{ threshold: 0.5, rootMargin: '50px' },
		);

		// CONTEXT7 SOURCE: /mozilla/mdn - Founder image visibility observer
		// IMAGE VISIBILITY: Track founder image engagement
		const imageObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.trackEvent('founder_image_view', {
							timeOnSection: Date.now() - this.sectionStartTime,
							engagementScore: this.engagementScore,
						});
						this.increaseEngagementScore(10);
					}
				});
			},
			{ threshold: 0.8 },
		);

		// CONTEXT7 SOURCE: /mozilla/mdn - Credentials visibility observer
		// CREDENTIALS TRACKING: Monitor trust signal engagement
		const credentialsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.trackEvent('trust_signal_view', {
							scrollPercentage: this.getScrollPercentage(),
							timeOnSection: Date.now() - this.sectionStartTime,
						});
						this.increaseEngagementScore(15);
					}
				});
			},
			{ threshold: 0.6 },
		);

		this.observers.push(sectionObserver, imageObserver, credentialsObserver);

		// CONTEXT7 SOURCE: /mozilla/mdn - DOM element observation setup
		// ELEMENT OBSERVATION: Attach observers to specific elements when available
		setTimeout(() => {
			const aboutSection = document.getElementById('about');
			const founderImage = document.querySelector('[alt*="Elizabeth Burrows"]');
			const credentialsSection = document.querySelector(
				'[role="group"][aria-labelledby="credentials-heading"]',
			);

			if (aboutSection) sectionObserver.observe(aboutSection);
			if (founderImage) imageObserver.observe(founderImage as Element);
			if (credentialsSection) credentialsObserver.observe(credentialsSection);
		}, 1000);
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Engagement tracking with scroll and time metrics
	 * ENGAGEMENT METRICS REASON: Official Next.js documentation shows measuring user engagement depth
	 */
	private setupEngagementTracking(): void {
		let scrollTimeout: NodeJS.Timeout;
		let lastScrollY = 0;

		// CONTEXT7 SOURCE: /mozilla/mdn - Scroll event tracking for engagement
		// SCROLL ENGAGEMENT: Monitor scroll behavior for engagement scoring
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
			lastScrollY = currentScrollY;

			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				const scrollPercentage = this.getScrollPercentage();

				// Track scroll milestones
				if (scrollPercentage >= 25 && scrollPercentage < 50) {
					this.trackEvent('scroll_milestone', { scrollPercentage: 25 });
					this.increaseEngagementScore(5);
				} else if (scrollPercentage >= 50 && scrollPercentage < 75) {
					this.trackEvent('scroll_milestone', { scrollPercentage: 50 });
					this.increaseEngagementScore(8);
				} else if (scrollPercentage >= 75) {
					this.trackEvent('scroll_milestone', { scrollPercentage: 75 });
					this.increaseEngagementScore(12);
				}
			}, 100);
		};

		// CONTEXT7 SOURCE: /vercel/next.js - Time tracking for section engagement
		// TIME TRACKING: Monitor time spent in section for conversion analysis
		const trackTimeOnSection = () => {
			const timeOnSection = Date.now() - this.sectionStartTime;

			// Track time milestones
			if (timeOnSection >= 10000) {
				// 10 seconds
				this.trackEvent('time_on_section', { timeOnSection });
				this.increaseEngagementScore(20);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		setTimeout(trackTimeOnSection, 10000);
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Exit intent detection for conversion optimization
	 * EXIT INTENT REASON: Official Next.js documentation shows capturing exit behavior for remarketing
	 */
	private setupExitIntentTracking(): void {
		// CONTEXT7 SOURCE: /mozilla/mdn - Mouse movement tracking for exit intent
		// EXIT DETECTION: Detect user intent to leave for conversion opportunities
		const handleMouseLeave = (e: MouseEvent) => {
			if (e.clientY <= 0) {
				this.trackEvent('exit_intent', {
					timeOnSection: Date.now() - this.sectionStartTime,
					engagementScore: this.engagementScore,
					scrollPercentage: this.getScrollPercentage(),
				});
			}
		};

		document.addEventListener('mouseleave', handleMouseLeave);
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - A/B testing variant assignment with persistent storage
	 * VARIANT ASSIGNMENT REASON: Official Next.js documentation shows consistent experiment assignment
	 */
	private assignABTestVariant(): void {
		try {
			// CONTEXT7 SOURCE: /vercel/next.js - Persistent variant storage for consistency
			// VARIANT CONSISTENCY: Maintain same variant across session for valid testing
			const existingVariant = localStorage.getItem(
				'about_section_variant',
			) as ABTestVariant;

			if (
				existingVariant &&
				['control', 'variant_a', 'variant_b', 'variant_c'].includes(existingVariant)
			) {
				this.currentVariant = existingVariant;
			} else {
				// CONTEXT7 SOURCE: /vercel/next.js - Weighted random variant assignment
				// VARIANT DISTRIBUTION: Distribute users across test variants
				const random = Math.random();
				if (random < 0.4) {
					this.currentVariant = 'control';
				} else if (random < 0.7) {
					this.currentVariant = 'variant_a';
				} else if (random < 0.9) {
					this.currentVariant = 'variant_b';
				} else {
					this.currentVariant = 'variant_c';
				}

				localStorage.setItem('about_section_variant', this.currentVariant);
			}

			// Track variant assignment
			this.trackEvent('about_section_view', {
				metadata: { assignedVariant: this.currentVariant },
			});
		} catch (error) {
			console.warn('A/B testing variant assignment failed:', error);
			this.currentVariant = 'control';
		}
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Event tracking with comprehensive metadata
	 * EVENT TRACKING REASON: Official Next.js documentation shows structured event collection
	 */
	public trackEvent(
		type: ConversionEventType,
		additionalMetadata: Record<string, any> = {},
	): void {
		const event: ConversionEvent = {
			type,
			timestamp: Date.now(),
			variant: this.currentVariant,
			sessionId: this.sessionId,
			metadata: {
				scrollPercentage: this.getScrollPercentage(),
				timeOnSection: Date.now() - this.sectionStartTime,
				viewport: this.getViewportDimensions(),
				deviceType: this.getDeviceType(),
				engagementScore: this.engagementScore,
				performanceMetrics: this.getPerformanceMetrics(),
				...additionalMetadata,
			},
		};

		this.events.push(event);

		// CONTEXT7 SOURCE: /vercel/next.js - External analytics integration
		// ANALYTICS INTEGRATION: Send events to tracking services
		this.sendToAnalytics(event);

		// CONTEXT7 SOURCE: /vercel/next.js - Development logging for debugging
		// DEBUG LOGGING: Console output for development monitoring
		if (process.env.NODE_ENV === 'development') {
			console.log('Conversion Event:', {
				type: event.type,
				variant: event.variant,
				engagement: event.metadata.engagementScore,
				time: Math.round((event.metadata.timeOnSection || 0) / 1000) + 's',
			});
		}
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Analytics service integration
	 * ANALYTICS INTEGRATION REASON: Official Next.js documentation shows sending events to tracking platforms
	 */
	private sendToAnalytics(event: ConversionEvent): void {
		// CONTEXT7 SOURCE: /vercel/next.js - Google Analytics 4 event tracking
		// GA4 INTEGRATION: Send structured events to Google Analytics
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('event', event.type, {
				event_category: 'about_section_conversion',
				event_label: event.variant,
				value: event.metadata.engagementScore,
				custom_parameters: {
					session_id: event.sessionId,
					time_on_section: event.metadata.timeOnSection,
					scroll_percentage: event.metadata.scrollPercentage,
					device_type: event.metadata.deviceType,
					viewport_width: event.metadata.viewport?.width,
					viewport_height: event.metadata.viewport?.height,
				},
			});
		}

		// CONTEXT7 SOURCE: /vercel/next.js - Custom analytics endpoint
		// CUSTOM TRACKING: Send to internal analytics for detailed analysis
		if (typeof window !== 'undefined') {
			fetch('/api/analytics/conversion-events', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(event),
			}).catch((error) => {
				console.warn('Failed to send conversion event:', error);
			});
		}
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Utility methods for tracking data collection
	 * UTILITY METHODS REASON: Official Next.js documentation shows helper functions for analytics
	 */
	private getScrollPercentage(): number {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const scrollHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		return Math.round((scrollTop / scrollHeight) * 100);
	}

	private getViewportDimensions(): { width: number; height: number } {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
		const width = window.innerWidth;
		if (width < 768) return 'mobile';
		if (width < 1024) return 'tablet';
		return 'desktop';
	}

	private increaseEngagementScore(points: number): void {
		this.engagementScore += points;
	}

	private getPerformanceMetrics() {
		if (typeof window === 'undefined') return undefined;

		const navigation = performance.getEntriesByType(
			'navigation',
		)[0] as PerformanceNavigationTiming;
		return navigation ?
				{
					loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
					renderTime: Math.round(
						navigation.domContentLoadedEventEnd - navigation.fetchStart,
					),
					interactionDelay: Math.round(
						navigation.loadEventEnd - navigation.domContentLoadedEventEnd,
					),
				}
			:	undefined;
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - A/B testing variant retrieval
	 * VARIANT ACCESS REASON: Official Next.js documentation shows accessing current test variant
	 */
	public getCurrentVariant(): ABTestVariant {
		return this.currentVariant;
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Conversion analytics summary
	 * ANALYTICS SUMMARY REASON: Official Next.js documentation shows generating conversion reports
	 */
	public getConversionSummary() {
		return {
			sessionId: this.sessionId,
			variant: this.currentVariant,
			totalEvents: this.events.length,
			engagementScore: this.engagementScore,
			timeOnSection: Date.now() - this.sectionStartTime,
			events: this.events.map((e) => ({ type: e.type, timestamp: e.timestamp })),
		};
	}

	/**
	 * CONTEXT7 SOURCE: /vercel/next.js - Cleanup for memory management
	 * CLEANUP REASON: Official Next.js documentation shows proper resource cleanup
	 */
	public cleanup(): void {
		this.observers.forEach((observer) => observer.disconnect());
		this.observers = [];
		this.events = [];
	}
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Singleton conversion tracker for global access
 * SINGLETON PATTERN: Official Next.js documentation shows centralized tracking management
 */
let conversionTrackerInstance: ConversionTracker | null = null;

export const getConversionTracker = (): ConversionTracker => {
	if (!conversionTrackerInstance) {
		conversionTrackerInstance = new ConversionTracker();
	}
	return conversionTrackerInstance;
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - React hook for conversion tracking integration
 * HOOK INTEGRATION REASON: Official Next.js documentation shows React integration for analytics
 */
export const useConversionTracking = (
	p0: string,
	p1: {
		enableABTesting: boolean;
		trackScrollMilestones: boolean;
		trackExitIntent: boolean;
		trackVideoEngagement: boolean;
	},
) => {
	if (typeof window === 'undefined') return null;

	const tracker = getConversionTracker();

	return {
		tracker,
		trackEvent: (type: ConversionEventType, metadata?: Record<string, any>) =>
			tracker.trackEvent(type, metadata),
		getCurrentVariant: () => tracker.getCurrentVariant(),
		getConversionSummary: () => tracker.getConversionSummary(),
	};
};

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript export patterns for conversion tracking
export type { ABTestConfig, ConversionEvent, ConversionFunnelStage };
