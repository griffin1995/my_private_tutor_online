import { cache } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
	getTestimonials,
	getTestimonialsContent,
	getTestimonialsHero,
	getTestimonialsIntroConfig,
	getTestimonialVideos,
	getEliteSchoolsData,
	getTestimonialsCTAContent,
	type Testimonial,
	type TestimonialsContent,
} from './cms-content';
import {
	validateTestimonialContent,
	type TestimonialsValidationResult,
} from './cms-validation';
export interface TestimonialsPageContent {
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly backgroundVariant?: 'gradient' | 'image' | 'video';
		readonly size?: 'compact' | 'standard' | 'full';
		readonly showCredentials?: boolean;
		readonly customCredentials?: Array<{
			readonly icon: 'crown' | 'award' | 'star';
			readonly text: string;
		}>;
	};
	readonly intro: {
		readonly introContent: {
			readonly intro: string;
			readonly callToAction: string;
		};
		readonly trustIndicators: readonly {
			readonly id: string;
			readonly iconType:
				| 'crown'
				| 'award'
				| 'shield'
				| 'trophy'
				| 'medal'
				| 'star';
			readonly text: string;
			readonly description?: string;
			readonly featured?: boolean;
			readonly url?: string;
		}[];
		readonly backgroundVariant: 'slate' | 'white' | 'gradient' | 'transparent';
		readonly showWaveSeparator: boolean;
	};
	readonly testimonials: readonly Testimonial[];
	readonly videos: readonly {
		readonly id: string;
		readonly title: string;
		readonly description: string;
		readonly thumbnailUrl: string;
		readonly videoUrl: string;
		readonly duration: string;
		readonly category: 'parent' | 'student' | 'educator';
		readonly featured: boolean;
		readonly testimonial?: Testimonial;
	}[];
	readonly schools: readonly {
		readonly id: string;
		readonly name: string;
		readonly logoUrl: string;
		readonly description: string;
		readonly tier: 'elite' | 'premium' | 'standard';
		readonly category: 'independent' | 'grammar' | 'university';
		readonly founded?: number;
		readonly notable?: string;
		readonly websiteUrl?: string;
		readonly location?: string;
	}[];
	readonly cta: {
		readonly title: string;
		readonly description: string;
		readonly primaryButton: {
			readonly text: string;
			readonly href: string;
			readonly variant: 'premium' | 'default';
		};
		readonly secondaryButton?: {
			readonly text: string;
			readonly href: string;
		};
		readonly testimonial?: Testimonial;
		readonly backgroundVariant: 'gradient' | 'solid' | 'image';
	};
}
export interface CMSMetrics {
	readonly contentLoadTime: number;
	readonly cacheHitRate: number;
	readonly validationErrors: number;
	readonly lastUpdated: string;
	readonly performanceScore: number;
}
export interface TestimonialsCMSStore {
	content: TestimonialsPageContent | null;
	metrics: CMSMetrics;
	isLoading: boolean;
	error: string | null;
	lastValidation: TestimonialsValidationResult | null;
	loadContent: () => Promise<void>;
	updateContent: (section: string, content: any) => Promise<boolean>;
	validateContent: (content: any) => TestimonialsValidationResult;
	previewContent: (content: any) => TestimonialsPageContent;
	clearCache: () => void;
	getContentMetrics: () => CMSMetrics;
	preloadContent: () => Promise<void>;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	updateMetrics: (metrics: Partial<CMSMetrics>) => void;
}
const useTestimonialsCMSStore = create<TestimonialsCMSStore>()(
	persist(
		(set, get) => ({
			content: null,
			metrics: {
				contentLoadTime: 0,
				cacheHitRate: 0,
				validationErrors: 0,
				lastUpdated: new Date().toISOString(),
				performanceScore: 100,
			},
			isLoading: false,
			error: null,
			lastValidation: null,
			loadContent: async () => {
				const startTime = performance.now();
				set({
					isLoading: true,
					error: null,
				});
				try {
					const [
						heroData,
						introData,
						testimonialsData,
						videosData,
						schoolsData,
						ctaData,
					] = await Promise.all([
						Promise.resolve(getTestimonialsHero()),
						Promise.resolve(getTestimonialsIntroConfig()),
						Promise.resolve(getTestimonials()),
						Promise.resolve(getTestimonialVideos()),
						Promise.resolve(getEliteSchoolsData()),
						Promise.resolve(getTestimonialsCTAContent()),
					]);
					const content: TestimonialsPageContent = {
						hero: heroData,
						intro: introData,
						testimonials: testimonialsData,
						videos: videosData,
						schools: schoolsData,
						cta: ctaData,
					};
					const loadTime = performance.now() - startTime;
					set({
						content,
						isLoading: false,
						metrics: {
							...get().metrics,
							contentLoadTime: loadTime,
							lastUpdated: new Date().toISOString(),
							performanceScore:
								loadTime < 100 ? 100 : Math.max(50, 100 - (loadTime - 100) / 10),
						},
					});
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : 'Failed to load content',
						isLoading: false,
					});
				}
			},
			updateContent: async (section: string, content: any) => {
				try {
					const validation = get().validateContent(content);
					if (!validation.isValid) {
						set({
							error: `Validation failed: ${validation.errors.join(', ')}`,
						});
						return false;
					}
					const currentContent = get().content;
					if (!currentContent) return false;
					const updatedContent = {
						...currentContent,
						[section]: content,
					};
					set({
						content: updatedContent,
						lastValidation: validation,
						metrics: {
							...get().metrics,
							lastUpdated: new Date().toISOString(),
							validationErrors: validation.errors.length,
						},
					});
					return true;
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : 'Update failed',
					});
					return false;
				}
			},
			validateContent: (content: any) => {
				return validateTestimonialContent(content);
			},
			previewContent: (content: any) => {
				const currentContent = get().content;
				return currentContent ?
						{
							...currentContent,
							...content,
						}
					:	content;
			},
			clearCache: () => {
				set({
					content: null,
					metrics: {
						...get().metrics,
						cacheHitRate: 0,
						lastUpdated: new Date().toISOString(),
					},
				});
			},
			getContentMetrics: () => {
				return get().metrics;
			},
			preloadContent: async () => {
				const { content } = get();
				if (!content) {
					await get().loadContent();
				}
			},
			setLoading: (loading: boolean) =>
				set({
					isLoading: loading,
				}),
			setError: (error: string | null) =>
				set({
					error,
				}),
			updateMetrics: (metrics: Partial<CMSMetrics>) =>
				set({
					metrics: {
						...get().metrics,
						...metrics,
					},
				}),
		}),
		{
			name: 'testimonials-cms-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				metrics: state.metrics,
				lastValidation: state.lastValidation,
			}),
		},
	),
);
export class TestimonialsCMSManager {
	private store = useTestimonialsCMSStore;
	public getAllContent = cache(async (): Promise<TestimonialsPageContent> => {
		const state = this.store.getState();
		if (!state.content) {
			await state.loadContent();
		}
		return state.content || this.getEmptyContent();
	});
	public getHeroContent = cache(() => {
		const state = this.store.getState();
		return state.content?.hero || getTestimonialsHero();
	});
	public getIntroContent = cache(() => {
		const state = this.store.getState();
		return state.content?.intro || getTestimonialsIntroConfig();
	});
	public getVideoContent = cache(() => {
		const state = this.store.getState();
		return state.content?.videos || getTestimonialVideos();
	});
	public getTestimonials = cache(() => {
		const state = this.store.getState();
		return state.content?.testimonials || getTestimonials();
	});
	public getSchoolsData = cache(() => {
		const state = this.store.getState();
		return state.content?.schools || getEliteSchoolsData();
	});
	public getCTAContent = cache(() => {
		const state = this.store.getState();
		return state.content?.cta || getTestimonialsCTAContent();
	});
	public async updateContent(section: string, content: any): Promise<boolean> {
		return this.store.getState().updateContent(section, content);
	}
	public validateContent(content: any): TestimonialsValidationResult {
		return this.store.getState().validateContent(content);
	}
	public previewContent(content: any): TestimonialsPageContent {
		return this.store.getState().previewContent(content);
	}
	public getContentMetrics(): CMSMetrics {
		return this.store.getState().getContentMetrics();
	}
	public clearCache(): void {
		this.store.getState().clearCache();
	}
	public async preloadContent(): Promise<void> {
		await this.store.getState().preloadContent();
	}
	public getStoreState() {
		return this.store.getState();
	}
	public subscribe(callback: (state: TestimonialsCMSStore) => void) {
		return this.store.subscribe(callback);
	}
	private getEmptyContent(): TestimonialsPageContent {
		return {
			hero: {
				title: 'Testimonials',
				subtitle: 'What families say about us',
				description: "Read about our families' experiences",
				backgroundVariant: 'gradient',
				size: 'standard',
				showCredentials: false,
			},
			intro: {
				introContent: {
					intro: 'Loading content...',
					callToAction: '',
				},
				trustIndicators: [],
				backgroundVariant: 'white',
				showWaveSeparator: false,
			},
			testimonials: [],
			videos: [],
			schools: [],
			cta: {
				title: 'Ready to get started?',
				description: 'Contact us today',
				primaryButton: {
					text: 'Get Quote',
					href: '/contact',
					variant: 'premium',
				},
				backgroundVariant: 'gradient',
			},
		};
	}
}
export const testimonialsCMSManager = new TestimonialsCMSManager();
export { useTestimonialsCMSStore };
export function useTestimonialsCMS() {
	return {
		manager: testimonialsCMSManager,
		store: useTestimonialsCMSStore(),
	};
}
