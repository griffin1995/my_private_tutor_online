interface LayoutMetrics {
	reflows: number;
	repaints: number;
	layoutShifts: number;
	cumulativeLayoutShift: number;
	largestContentfulPaint: number;
	firstContentfulPaint: number;
	timeToInteractive: number;
}
interface LayoutThrashingEvent {
	timestamp: number;
	type: 'reflow' | 'repaint' | 'shift';
	target: string;
	duration: number;
	impactScore: number;
}
export class LayoutPerformanceMonitor {
	private metrics: LayoutMetrics = {
		reflows: 0,
		repaints: 0,
		layoutShifts: 0,
		cumulativeLayoutShift: 0,
		largestContentfulPaint: 0,
		firstContentfulPaint: 0,
		timeToInteractive: 0,
	};
	private events: LayoutThrashingEvent[] = [];
	private observer: PerformanceObserver | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private mutationObserver: MutationObserver | null = null;
	startMonitoring() {
		if (typeof window === 'undefined') return;
		this.observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.entryType === 'layout-shift') {
					const layoutShiftEntry = entry as any;
					if (!layoutShiftEntry.hadRecentInput) {
						this.metrics.layoutShifts++;
						this.metrics.cumulativeLayoutShift += layoutShiftEntry.value;
						this.recordEvent({
							timestamp: performance.now(),
							type: 'shift',
							target: 'document',
							duration: layoutShiftEntry.value * 1000,
							impactScore: layoutShiftEntry.value,
						});
					}
				}
				if (entry.entryType === 'largest-contentful-paint') {
					this.metrics.largestContentfulPaint = entry.startTime;
				}
				if (entry.entryType === 'paint') {
					if (entry.name === 'first-contentful-paint') {
						this.metrics.firstContentfulPaint = entry.startTime;
					}
				}
			}
		});
		try {
			this.observer.observe({
				entryTypes: ['layout-shift', 'largest-contentful-paint', 'paint'],
			});
		} catch (e) {
			console.warn('Layout performance monitoring not supported:', e);
		}
		this.monitorResizeEvents();
		this.monitorDOMMutations();
		this.monitorHeroSection();
	}
	private monitorResizeEvents() {
		const heroSection = document.getElementById(
			'hero-premium-tutoring-landing-combined',
		);
		if (!heroSection) return;
		this.resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				this.metrics.reflows++;
				this.recordEvent({
					timestamp: performance.now(),
					type: 'reflow',
					target: entry.target.id || entry.target.className || 'unknown',
					duration: 0,
					impactScore: 0.1,
				});
			}
		});
		this.resizeObserver.observe(heroSection);
	}
	private monitorDOMMutations() {
		this.mutationObserver = new MutationObserver((mutations) => {
			const significantChanges = mutations.filter(
				(m) =>
					m.type === 'attributes' &&
					(m.attributeName === 'style' || m.attributeName === 'class'),
			);
			if (significantChanges.length > 0) {
				this.metrics.repaints += significantChanges.length;
				significantChanges.forEach((mutation) => {
					const target = mutation.target as HTMLElement;
					this.recordEvent({
						timestamp: performance.now(),
						type: 'repaint',
						target: target.id || target.className || 'unknown',
						duration: 0,
						impactScore: 0.05,
					});
				});
			}
		});
		this.mutationObserver.observe(document.body, {
			attributes: true,
			childList: true,
			subtree: true,
			attributeFilter: ['style', 'class'],
		});
	}
	private monitorHeroSection() {
		const heroSection = document.getElementById(
			'hero-premium-tutoring-landing-combined',
		);
		if (!heroSection) return;
		const flexChildren = heroSection.querySelectorAll('[class*="flex-"]');
		flexChildren.forEach((child, index) => {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							this.recordEvent({
								timestamp: performance.now(),
								type: 'reflow',
								target: `flex-child-${index}`,
								duration: 0,
								impactScore: 0.02,
							});
						}
					});
				},
				{
					threshold: [0, 0.5, 1],
				},
			);
			observer.observe(child);
		});
	}
	private recordEvent(event: LayoutThrashingEvent) {
		this.events.push(event);
		if (this.events.length > 10) {
			const recentEvents = this.events.slice(-10);
			const thrashingScore = recentEvents.reduce(
				(sum, e) => sum + e.impactScore,
				0,
			);
			if (thrashingScore > 0.5) {
				console.warn('⚠️ Layout thrashing detected!', {
					recentEvents,
					thrashingScore,
					metrics: this.getMetrics(),
				});
			}
		}
	}
	getMetrics(): LayoutMetrics & {
		thrashingScore: number;
		performanceGrade: string;
		recommendations: string[];
	} {
		const thrashingScore = this.calculateThrashingScore();
		const performanceGrade = this.calculatePerformanceGrade();
		const recommendations = this.generateRecommendations();
		return {
			...this.metrics,
			thrashingScore,
			performanceGrade,
			recommendations,
		};
	}
	private calculateThrashingScore(): number {
		if (this.events.length === 0) return 0;
		const recentEvents = this.events.slice(-50);
		const totalImpact = recentEvents.reduce((sum, e) => sum + e.impactScore, 0);
		const timeSpan =
			(recentEvents[recentEvents.length - 1]?.timestamp || 0) -
			(recentEvents[0]?.timestamp || 0);
		return timeSpan > 0 ? (totalImpact / timeSpan) * 1000 : 0;
	}
	private calculatePerformanceGrade(): string {
		const cls = this.metrics.cumulativeLayoutShift;
		const lcp = this.metrics.largestContentfulPaint;
		const thrashing = this.calculateThrashingScore();
		let score = 100;
		if (cls <= 0.1) score -= 0;
		else if (cls <= 0.25) score -= 15;
		else score -= 30;
		if (lcp <= 2500) score -= 0;
		else if (lcp <= 4000) score -= 15;
		else score -= 30;
		if (thrashing <= 0.1) score -= 0;
		else if (thrashing <= 0.5) score -= 20;
		else score -= 40;
		if (score >= 90) return 'A';
		if (score >= 80) return 'B';
		if (score >= 70) return 'C';
		if (score >= 60) return 'D';
		return 'F';
	}
	private generateRecommendations(): string[] {
		const recommendations: string[] = [];
		const thrashing = this.calculateThrashingScore();
		if (this.metrics.cumulativeLayoutShift > 0.1) {
			recommendations.push(
				'Reduce layout shifts by setting explicit dimensions on images and containers',
			);
		}
		if (this.metrics.largestContentfulPaint > 2500) {
			recommendations.push(
				'Optimize LCP by preloading critical resources and reducing render-blocking CSS',
			);
		}
		if (this.metrics.reflows > 10) {
			recommendations.push(
				'Minimize reflows by batching DOM updates and avoiding forced synchronous layouts',
			);
		}
		if (thrashing > 0.5) {
			recommendations.push(
				'Fix layout thrashing by optimizing flexbox calculations and removing conflicting styles',
			);
		}
		if (this.events.filter((e) => e.type === 'repaint').length > 20) {
			recommendations.push(
				'Reduce repaints by using CSS transforms instead of position changes',
			);
		}
		return recommendations;
	}
	stopMonitoring() {
		this.observer?.disconnect();
		this.resizeObserver?.disconnect();
		this.mutationObserver?.disconnect();
		const finalReport = this.getMetrics();
		console.log('📊 Layout Performance Report:', finalReport);
		return finalReport;
	}
}
export const layoutMonitor = new LayoutPerformanceMonitor();
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	window.addEventListener('load', () => {
		layoutMonitor.startMonitoring();
		setInterval(() => {
			const metrics = layoutMonitor.getMetrics();
			if (metrics.thrashingScore > 0.1) {
				console.log('⚡ Layout Performance Update:', metrics);
			}
		}, 5000);
	});
}
