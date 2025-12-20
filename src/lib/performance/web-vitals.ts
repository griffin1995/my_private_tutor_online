import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';
export const PERFORMANCE_THRESHOLDS = {
	LCP: 2500,
	INP: 200,
	CLS: 0.1,
	FCP: 1800,
	TTFB: 600,
} as const;
export type MetricName = keyof typeof PERFORMANCE_THRESHOLDS;
export interface WebVitalsData {
	name: MetricName;
	value: number;
	rating: 'good' | 'needs-improvement' | 'poor';
	delta: number;
	id: string;
	navigationType: string;
	timestamp: number;
	url: string;
	userAgent: string;
}
function rateMetric(
	name: MetricName,
	value: number,
): 'good' | 'needs-improvement' | 'poor' {
	const threshold = PERFORMANCE_THRESHOLDS[name];
	switch (name) {
		case 'LCP':
			return (
				value <= 2500 ? 'good'
				: value <= 4000 ? 'needs-improvement'
				: 'poor'
			);
		case 'INP':
			return (
				value <= 200 ? 'good'
				: value <= 500 ? 'needs-improvement'
				: 'poor'
			);
		case 'CLS':
			return (
				value <= 0.1 ? 'good'
				: value <= 0.25 ? 'needs-improvement'
				: 'poor'
			);
		case 'FCP':
			return (
				value <= 1800 ? 'good'
				: value <= 3000 ? 'needs-improvement'
				: 'poor'
			);
		case 'TTFB':
			return (
				value <= 800 ? 'good'
				: value <= 1800 ? 'needs-improvement'
				: 'poor'
			);
		default:
			return 'good';
	}
}
interface ExtendedMetric extends Omit<Metric, 'navigationType'> {
	navigationType?: string;
}
function formatMetric(metric: Metric): WebVitalsData {
	const extendedMetric = metric as ExtendedMetric;
	return {
		name: metric.name as MetricName,
		value: metric.value,
		rating: rateMetric(metric.name as MetricName, metric.value),
		delta: metric.delta,
		id: metric.id,
		navigationType: extendedMetric.navigationType || 'navigate',
		timestamp: Date.now(),
		url: window.location.href,
		userAgent: navigator.userAgent,
	};
}
interface AnalyticsProvider {
	trackWebVital: (data: WebVitalsData) => void;
	trackPerformanceMetric: (
		name: string,
		value: number,
		attributes?: Record<string, string | number | boolean>,
	) => void;
}
const consoleAnalytics: AnalyticsProvider = {
	trackWebVital: (_data) => {},
	trackPerformanceMetric: (_name, _value, _attributes) => {},
};
interface VercelAnalytics {
	va: (action: string, event: string, data: Record<string, unknown>) => void;
}
const vercelAnalytics: AnalyticsProvider = {
	trackWebVital: (data) => {
		if (
			typeof window !== 'undefined' &&
			(window as VercelAnalytics & Window).va
		) {
			(window as VercelAnalytics & Window).va('track', 'Web Vital', {
				name: data.name,
				value: data.value,
				rating: data.rating,
			});
		}
	},
	trackPerformanceMetric: (name, value, attributes) => {
		if (
			typeof window !== 'undefined' &&
			(window as VercelAnalytics & Window).va
		) {
			(window as VercelAnalytics & Window).va('track', 'Performance', {
				metric: name,
				value,
				...attributes,
			});
		}
	},
};
interface SentryWindow {
	Sentry: {
		addBreadcrumb: (breadcrumb: {
			category: string;
			message: string;
			level?: 'info' | 'warning' | 'error';
			data?: Record<string, unknown>;
		}) => void;
		captureMessage: (
			message: string,
			level: 'info' | 'warning' | 'error',
		) => void;
	};
}
const sentryAnalytics: AnalyticsProvider = {
	trackWebVital: (data) => {
		if (
			typeof window !== 'undefined' &&
			(window as unknown as SentryWindow & Window).Sentry
		) {
			(window as unknown as SentryWindow & Window).Sentry.addBreadcrumb({
				category: 'web-vitals',
				message: `${data.name}: ${data.value}`,
				level:
					data.rating === 'poor' ? 'error'
					: data.rating === 'needs-improvement' ? 'warning'
					: 'info',
				data: {
					name: data.name,
					value: data.value,
					rating: data.rating,
					threshold: PERFORMANCE_THRESHOLDS[data.name],
				},
			});
			if (data.rating === 'poor') {
				(window as unknown as SentryWindow & Window).Sentry.captureMessage(
					`Poor ${data.name} performance: ${data.value}`,
					'warning',
				);
			}
		}
	},
	trackPerformanceMetric: (name, value, attributes) => {
		if (
			typeof window !== 'undefined' &&
			(window as unknown as SentryWindow & Window).Sentry
		) {
			(window as unknown as SentryWindow & Window).Sentry.addBreadcrumb({
				category: 'performance',
				message: `${name}: ${value}`,
				data: {
					name,
					value,
					...attributes,
				},
			});
		}
	},
};
class WebVitalsTracker {
	private providers: AnalyticsProvider[] = [];
	private metrics: Map<MetricName, WebVitalsData> = new Map();
	constructor() {
		if (process.env.NODE_ENV === 'development') {
			this.providers.push(consoleAnalytics);
		}
		if (process.env.NODE_ENV === 'production') {
			this.providers.push(vercelAnalytics);
		}
		this.providers.push(sentryAnalytics);
	}
	private handleMetric = (metric: Metric) => {
		const data = formatMetric(metric);
		this.metrics.set(data.name, data);
		this.providers.forEach((provider) => {
			provider.trackWebVital(data);
		});
		if (typeof window !== 'undefined') {
			const existingMetrics = JSON.parse(
				sessionStorage.getItem('webVitals') || '{}',
			);
			existingMetrics[data.name] = data;
			sessionStorage.setItem('webVitals', JSON.stringify(existingMetrics));
		}
	};
	init() {
		if (typeof window === 'undefined') return;
		onCLS(this.handleMetric);
		onINP(this.handleMetric);
		onFCP(this.handleMetric);
		onLCP(this.handleMetric);
		onTTFB(this.handleMetric);
		this.trackNavigationTiming();
		this.trackResourceTiming();
		this.trackMemoryUsage();
	}
	private trackNavigationTiming() {
		if (typeof window === 'undefined' || !window.performance) return;
		window.addEventListener('load', () => {
			const navigation = performance.getEntriesByType(
				'navigation',
			)[0] as PerformanceNavigationTiming;
			if (navigation) {
				const metrics = {
					'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
					'TCP Connection': navigation.connectEnd - navigation.connectStart,
					'TLS Handshake': navigation.connectEnd - navigation.secureConnectionStart,
					Request: navigation.responseStart - navigation.requestStart,
					Response: navigation.responseEnd - navigation.responseStart,
					'DOM Processing':
						navigation.domContentLoadedEventStart - navigation.responseEnd,
					'Resource Loading':
						navigation.loadEventStart - navigation.domContentLoadedEventEnd,
				};
				Object.entries(metrics).forEach(([name, value]) => {
					if (value > 0) {
						this.providers.forEach((provider) => {
							provider.trackPerformanceMetric(name, value, {
								type: 'navigation',
							});
						});
					}
				});
			}
		});
	}
	private trackResourceTiming() {
		if (typeof window === 'undefined') return;
		const observer = new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				const resource = entry as PerformanceResourceTiming;
				if (
					resource.name.includes('.js') ||
					resource.name.includes('.css') ||
					resource.name.includes('.woff') ||
					resource.name.includes('.jpg') ||
					resource.name.includes('.png') ||
					resource.name.includes('.avif')
				) {
					const loadTime = resource.responseEnd - resource.startTime;
					const resourceType = this.getResourceType(resource.name);
					this.providers.forEach((provider) => {
						provider.trackPerformanceMetric('Resource Load Time', loadTime, {
							type: resourceType,
							url: resource.name,
							size: resource.transferSize,
						});
					});
				}
			});
		});
		observer.observe({
			entryTypes: ['resource'],
		});
	}
	private trackMemoryUsage() {
		if (typeof window === 'undefined' || !('memory' in performance)) return;
		const trackMemory = () => {
			const memory = (
				performance as Performance & {
					memory: {
						usedJSHeapSize: number;
						totalJSHeapSize: number;
						jsHeapSizeLimit: number;
					};
				}
			).memory;
			this.providers.forEach((provider) => {
				provider.trackPerformanceMetric('Memory Usage', memory.usedJSHeapSize, {
					total: memory.totalJSHeapSize,
					limit: memory.jsHeapSizeLimit,
					utilization: memory.usedJSHeapSize / memory.jsHeapSizeLimit,
				});
			});
		};
		trackMemory();
		setInterval(trackMemory, 30000);
	}
	private getResourceType(url: string): string {
		if (url.includes('.js')) return 'javascript';
		if (url.includes('.css')) return 'stylesheet';
		if (url.includes('.woff') || url.includes('.ttf')) return 'font';
		if (
			url.includes('.jpg') ||
			url.includes('.png') ||
			url.includes('.avif') ||
			url.includes('.webp')
		)
			return 'image';
		return 'other';
	}
	getMetrics(): Record<MetricName, WebVitalsData> {
		return Object.fromEntries(this.metrics) as Record<MetricName, WebVitalsData>;
	}
	getSummary() {
		const metrics = this.getMetrics();
		return {
			overall: this.getOverallRating(metrics),
			metrics,
			timestamp: Date.now(),
			url: typeof window !== 'undefined' ? window.location.href : '',
			userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
		};
	}
	private getOverallRating(
		metrics: Record<MetricName, WebVitalsData>,
	): 'good' | 'needs-improvement' | 'poor' {
		const ratings = Object.values(metrics).map((m) => divrating);
		if (ratings.includes('poor')) return 'poor';
		if (ratings.includes('needs-improvement')) return 'needs-improvement';
		return 'good';
	}
}
export const webVitalsTracker = new WebVitalsTracker();
if (typeof window !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => webVitalsTracker.init());
	} else {
		webVitalsTracker.init();
	}
}
