import { cache } from 'react';
import aboutContent from '../../content/about.json';
import businessAnalyticsContent from '../../content/business-analytics.json';
import businessContent from '../../content/business-content.json';
import faqContentJSON from '../../content/faq.json';
import formContent from '../../content/form-content.json';
import howItWorksContent from '../../content/how-it-works.json';
import landingPageContent from '../../content/landing-page.json';
import settingsContent from '../../content/settings.json';
import testimonialsContent from '../../content/testimonials.json';
import tutorsNewContent from '../../content/tutors-new.json';
import { getTestimonialVideos } from './cms-images';
import faqContent from './cms-faq';
export type {
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	FAQAnalytics,
	FAQCategory,
	FAQContent,
	FAQQuestion,
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	Testimonial,
	TestimonialsContent,
	
	
	
	
	
	TutorProfile,
	TutorProfilesSection,
	
	
	
};
interface BaseCMSContent<T = unknown> {
	readonly content: T;
	readonly timestamp?: string;
	readonly version?: string;
}
interface CMSResponse<T> {
	readonly data: T;
	readonly success: boolean;
	readonly error?: string;
}
interface NavigationItem {
	readonly label: string;
	readonly href: string;
}
interface SiteHeader {
	readonly siteName: string;
	readonly logo: string;
	readonly navigation: readonly NavigationItem[];
	readonly ctaButton?: {
		readonly text: string;
		readonly href: string;
	};
}
interface HeroContent {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly image: string;
	readonly imageAlt: string;
	readonly ctaButtons: readonly {
		readonly text: string;
		readonly href: string;
		readonly variant: 'primary' | 'secondary';
	}[];
	readonly playButton?: {
		readonly enabled: boolean;
		readonly videoUrl?: string;
	};
}
interface TrustIndicator {
	readonly icon: string;
	readonly title: string;
	readonly subtitle?: string;
	readonly description: string;
	readonly imageUrl?: string;
	readonly imageAlt?: string;
}
interface TrustIndicatorsSection {
	readonly title: string;
	readonly subtitle?: string;
	readonly indicators: readonly TrustIndicator[];
}
interface StudentJourneyStep {
	readonly step: string;
	readonly title: string;
	readonly icon: string;
	readonly description: string;
	readonly duration: string;
}
interface StudentJourneySection {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly steps: readonly StudentJourneyStep[];
}
export interface Testimonial {
	readonly id: string;
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly avatar?: string;
	readonly rating: number;
	readonly verified?: boolean;
	readonly date?: string;
	readonly location?: string;
	readonly subject?: string;
	readonly result?: string;
	readonly school?: string;
	readonly hasVideo: boolean;
	readonly videoUrl?: string;
	readonly videoThumbnail?: string;
	readonly duration?: number;
	readonly viewCount?: number;
	readonly uploadDate?: string;
	readonly category:
		| 'academic'
		| 'entrance-exam'
		| 'general'
		| '11+'
		| 'GCSE'
		| 'A-Level'
		| 'Oxbridge'
		| 'International';
}
interface TestimonialsSection {
	readonly title: string;
	readonly subtitle: string;
	readonly testimonials: readonly Testimonial[];
	readonly showRatings?: boolean;
}
interface ServiceFeature {
	readonly feature: string;
}
interface Service {
	readonly title: string;
	readonly description: string;
	readonly icon: string;
	readonly features: readonly ServiceFeature[];
	readonly ctaText: string;
	readonly ctaLink: string;
	readonly price?: {
		readonly from: string;
		readonly currency: string;
	};
}
interface ServicesSection {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly services: readonly Service[];
}
interface Statistic {
	readonly number: string;
	readonly label: string;
	readonly description: string;
	readonly icon: string;
	readonly lucideIcon?: string;
	readonly imageKey?: string;
	readonly imageUrl?: string;
	readonly imageAlt?: string;
	readonly trend?: 'up' | 'down' | 'stable';
	readonly period?: string;
}
interface ResultsSection {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly statistics: readonly Statistic[];
	readonly backgroundImage?: string;
}
interface FooterLink {
	readonly label: string;
	readonly href: string;
	readonly external?: boolean;
}
interface FooterSection {
	readonly title: string;
	readonly links: readonly FooterLink[];
}
interface FooterContent {
	readonly companyName: string;
	readonly description: string;
	readonly sections: readonly FooterSection[];
	readonly socialLinks?: readonly {
		readonly platform: string;
		readonly url: string;
		readonly icon: string;
	}[];
	readonly copyright?: string;
	readonly legalLinks?: readonly FooterLink[];
}
interface HowItWorksStep {
	readonly number: string;
	readonly title: string;
	readonly description: string;
	readonly features: readonly string[];
	readonly icon: string;
	readonly image: string;
}
interface HowItWorksContent {
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly backgroundImage?: string;
	};
	readonly steps: readonly HowItWorksStep[];
	readonly benefits: readonly string[];
	readonly cta: {
		readonly title: string;
		readonly description: string;
		readonly button: {
			readonly text: string;
			readonly href: string;
		};
	};
}
interface TutorTier {
	readonly tier: string;
	readonly description: string;
	readonly bestFor: string;
	readonly pricePoint: string;
	readonly qualifications?: readonly string[];
	readonly experience?: string;
}
interface TutorTiersSection {
	readonly title: string;
	readonly subtitle: string;
	readonly tiers: readonly TutorTier[];
}
export interface TutorProfile {
	readonly id: string;
	readonly name: string;
	readonly title: string;
	readonly tier?: 'tier-one' | 'tier-two' | 'tier-three';
	readonly badge?: string;
	readonly education: {
		readonly university: string;
		readonly degree: string;
		readonly additionalQualifications?: readonly string[];
		readonly grade?: string;
		readonly graduationYear?: string;
		readonly additionalInfo?: string;
	};
	readonly specializations: readonly string[];
	readonly experience: {
		readonly yearsTeaching: number;
		readonly description: string;
		readonly totalStudents?: number;
		readonly onlineHours?: number;
		readonly eliteSchools?: readonly string[];
		readonly teachingAreas?: readonly string[];
		readonly internationalExperience?: boolean;
		readonly headteacherExperience?: boolean;
		readonly grammarSuccess?: readonly string[];
		readonly languagesFluent?: number;
		readonly eliteSchoolSuccess?: readonly string[];
		readonly tutoringHours?: number;
		readonly admissionsSuccess?: readonly string[];
	};
	readonly achievements: readonly {
		readonly title: string;
		readonly description: string;
		readonly year?: string;
	}[];
	readonly image: {
		readonly key: string;
		readonly alt: string;
		readonly professionalHeadshot: boolean;
	};
	readonly bio: string;
	readonly testimonial?: {
		readonly quote: string;
		readonly author: string;
		readonly context: string;
	};
	readonly availability?: {
		readonly status: 'available' | 'limited' | 'unavailable';
		readonly nextAvailable?: string;
	};
	readonly credentials: readonly {
		readonly type: 'qualification' | 'certification' | 'membership' | 'award';
		readonly title: string;
		readonly institution?: string;
		readonly year?: string;
		readonly verified: boolean;
	}[];
	readonly teachingStyle: {
		readonly approach: string;
		readonly methodology: readonly string[];
		readonly strengthAreas: readonly string[];
	};
	readonly subjectExpertise: readonly {
		readonly subject: string;
		readonly level:
			| '11+'
			| '13+'
			| 'Primary'
			| 'GCSE'
			| 'A-Level'
			| 'IB'
			| 'University'
			| 'International'
			| 'Oxbridge'
			| 'All';
		readonly examBoards?: readonly string[];
		readonly yearsExperience: number;
	}[];
	readonly featured: boolean;
	readonly order: number;
}
export interface TutorProfilesSection {
	readonly title: string;
	readonly subtitle: string | null;
	readonly description: string;
	readonly profiles: readonly TutorProfile[];
	readonly showAllButton?: {
		readonly text: string;
		readonly href: string;
	};
	readonly backgroundStyle?: 'light' | 'dark' | 'gradient';
}
interface TutorProfilesSectionNew {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly profiles: {
		readonly [key: string]: TutorProfile;
	};
	readonly showAllButton?: {
		readonly text: string;
		readonly href: string;
	};
	readonly backgroundStyle?: 'light' | 'dark' | 'gradient';
}
interface CTAButton {
	readonly text: string;
	readonly type: 'primary' | 'secondary' | 'outline';
	readonly href: string;
	readonly external?: boolean;
	readonly trackingId?: string;
}
interface CTASection {
	readonly title: string;
	readonly brandStatement: string;
	readonly description: string;
	readonly primaryButtonText: string;
	readonly secondaryButtonText: string;
	readonly siteName: string;
	readonly showVideo?: boolean;
	readonly videoHeight?: string;
	readonly backgroundColor?: string;
}
interface NewsletterFormContent {
	readonly title: string;
	readonly description: string;
	readonly successMessage: string;
	readonly buttonText: string;
	readonly fields: {
		readonly firstName: {
			readonly label: string;
			readonly placeholder: string;
		};
		readonly email: {
			readonly label: string;
			readonly placeholder: string;
		};
	};
}
interface ConsultationFormContent {
	readonly fields: {
		readonly parentName: {
			readonly placeholder: string;
		};
		readonly studentName: {
			readonly placeholder: string;
		};
		readonly academicLevel: {
			readonly selectValue: string;
		};
		readonly timescale: {
			readonly selectValue: string;
		};
		readonly requirements: {
			readonly placeholder: string;
		};
		readonly contactMethod: {
			readonly selectValue: string;
		};
		readonly serviceLevel: {
			readonly selectValue: string;
		};
	};
	readonly ariaLabels: {
		readonly academicLevel: string;
		readonly timescale: string;
		readonly contactMethod: string;
		readonly serviceLevel: string;
	};
}
interface CommonFormContent {
	readonly loadingText: string;
	readonly submitText: string;
	readonly processingText: string;
	readonly successText: string;
	readonly errorText: string;
}
interface FooterFormContent {
	readonly newsletter: {
		readonly placeholder: string;
	};
}
interface FormContent {
	readonly newsletter: NewsletterFormContent;
	readonly consultation: ConsultationFormContent;
	readonly common: CommonFormContent;
	readonly footer: FooterFormContent;
}
export interface FAQAnalytics {
	readonly views: number;
	readonly helpful: number;
	readonly notHelpful: number;
	readonly lastViewed?: string;
	readonly trending: boolean;
	readonly searchRank?: number;
}
interface FAQRichMediaVideo {
	readonly type: 'video';
	readonly id: string;
	readonly title: string;
	readonly url: string;
	readonly provider: 'youtube' | 'vimeo' | 'self-hosted' | 'wistia';
	readonly thumbnail?: string;
	readonly duration?: number;
	readonly autoplay?: boolean;
	readonly controls?: boolean;
	readonly muted?: boolean;
	readonly loop?: boolean;
	readonly startTime?: number;
	readonly endTime?: number;
	readonly captions?: readonly string[];
	readonly transcript?: string;
	readonly accessibility: {
		readonly description: string;
		readonly ariaLabel: string;
	};
	readonly responsive: {
		readonly aspectRatio: '16:9' | '4:3' | '1:1' | 'custom';
		readonly maxWidth?: string;
		readonly breakpoints?: Record<string, string>;
	};
	readonly performance: {
		readonly lazyLoad: boolean;
		readonly preload: 'none' | 'metadata' | 'auto';
		readonly quality?: 'auto' | 'hd' | 'sd';
	};
}
interface FAQRichMediaDiagram {
	readonly type: 'diagram';
	readonly id: string;
	readonly title: string;
	readonly diagramType:
		| 'flowchart'
		| 'sequence'
		| 'class'
		| 'state'
		| 'gantt'
		| 'pie'
		| 'journey'
		| 'mindmap';
	readonly definition: string;
	readonly theme?: 'default' | 'dark' | 'neutral' | 'forest';
	readonly interactive?: boolean;
	readonly zoomable?: boolean;
	readonly exportable?: boolean;
	readonly accessibility: {
		readonly description: string;
		readonly ariaLabel: string;
		readonly longDescription?: string;
	};
	readonly configuration?: {
		readonly width?: string;
		readonly height?: string;
		readonly backgroundColor?: string;
		readonly fontSize?: number;
		readonly fontFamily?: string;
	};
}
interface FAQRichMediaCode {
	readonly type: 'code';
	readonly id: string;
	readonly title: string;
	readonly language: string;
	readonly code: string;
	readonly theme?: 'dracula' | 'github' | 'vscode' | 'atom' | 'material';
	readonly showLineNumbers?: boolean;
	readonly highlightLines?: readonly number[];
	readonly copyable?: boolean;
	readonly collapsible?: boolean;
	readonly startLine?: number;
	readonly maxHeight?: string;
	readonly fileName?: string;
	readonly accessibility: {
		readonly description: string;
		readonly ariaLabel: string;
	};
	readonly metadata?: {
		readonly author?: string;
		readonly lastModified?: string;
		readonly version?: string;
		readonly dependencies?: readonly string[];
	};
}
interface FAQRichMediaDemo {
	readonly type: 'demo';
	readonly id: string;
	readonly title: string;
	readonly provider:
		| 'codesandbox'
		| 'codepen'
		| 'stackblitz'
		| 'replit'
		| 'custom';
	readonly embedUrl: string;
	readonly sourceUrl?: string;
	readonly preview?: string;
	readonly editable?: boolean;
	readonly autorun?: boolean;
	readonly theme?: 'light' | 'dark' | 'auto';
	readonly height?: string;
	readonly tabs?: readonly string[];
	readonly hideNavigation?: boolean;
	readonly accessibility: {
		readonly description: string;
		readonly ariaLabel: string;
	};
	readonly performance: {
		readonly lazyLoad: boolean;
		readonly loadingMessage?: string;
	};
}
interface FAQRichMediaGif {
	readonly type: 'gif';
	readonly id: string;
	readonly title: string;
	readonly url: string;
	readonly staticUrl?: string;
	readonly width?: number;
	readonly height?: number;
	readonly autoplay?: boolean;
	readonly loop?: boolean;
	readonly controls?: boolean;
	readonly playOnHover?: boolean;
	readonly accessibility: {
		readonly description: string;
		readonly ariaLabel: string;
		readonly altText: string;
	};
	readonly performance: {
		readonly lazyLoad: boolean;
		readonly placeholder?: 'blur' | 'static' | 'color';
		readonly optimized: boolean;
	};
}
type FAQRichMediaContent =
	| FAQRichMediaVideo
	| FAQRichMediaDiagram
	| FAQRichMediaCode
	| FAQRichMediaDemo
	| FAQRichMediaGif;
interface FAQRichMediaSection {
	readonly id: string;
	readonly title?: string;
	readonly description?: string;
	readonly content: FAQRichMediaContent;
	readonly position: 'before' | 'after' | 'inline';
	readonly order: number;
	readonly visible: boolean;
	readonly conditional?: {
		readonly userSegment?: readonly string[];
		readonly deviceType?: readonly ('mobile' | 'tablet' | 'desktop')[];
		readonly authRequired?: boolean;
	};
	readonly analytics?: {
		readonly trackViews: boolean;
		readonly trackInteractions: boolean;
		readonly customEvents?: readonly string[];
	};
}
export interface FAQQuestion {
	readonly id: string;
	readonly question: string;
	readonly answer: string;
	readonly category: string;
	readonly subcategory?: string;
	readonly tags: readonly string[];
	readonly priority: number;
	readonly searchKeywords: readonly string[];
	readonly relatedFAQs: readonly string[];
	readonly lastUpdated: string;
	readonly createdDate: string;
	readonly featured: boolean;
	readonly analytics: FAQAnalytics;
	readonly clientSegment?:
		| 'oxbridge_prep'
		| '11_plus'
		| 'elite_corporate'
		| 'comparison_shopper'
		| 'all';
	readonly difficulty: 'basic' | 'intermediate' | 'advanced';
	readonly estimatedReadTime: number;
	readonly richMedia?: readonly FAQRichMediaSection[];
}
interface FAQSubcategory {
	readonly id: string;
	readonly name: string;
	readonly description: string;
	readonly order: number;
	readonly questionCount?: number;
}
export interface FAQCategory {
	readonly id: string;
	readonly title: string;
	readonly name: string;
	readonly description: string;
	readonly color: string;
	readonly order: number;
	readonly questions: readonly FAQQuestion[];
	readonly subcategories?: readonly FAQSubcategory[];
	readonly analytics: {
		readonly totalViews: number;
		readonly averageRating: number;
		readonly popularityRank: number;
		readonly lastUpdated: string;
	};
	readonly isVisible: boolean;
	readonly requiresAuth?: boolean;
}
interface FAQSearchFilters {
	readonly categories: readonly string[];
	readonly subcategories: readonly string[];
	readonly tags: readonly string[];
	readonly clientSegments: readonly string[];
	readonly difficulties: readonly string[];
	readonly featured?: boolean;
	readonly trending?: boolean;
	readonly minRating?: number;
}
interface FAQSearchMetadata {
	readonly totalResults: number;
	readonly searchTime: number;
	readonly suggestions?: readonly string[];
	readonly didYouMean?: string;
	readonly relatedSearches: readonly string[];
}
export interface FAQContent {
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly searchPlaceholder: string;
		readonly backgroundImageKey?: string;
	};
	readonly categories: readonly FAQCategory[];
	readonly contact: {
		readonly title: string;
		readonly description: string;
		readonly phone?: string;
		readonly email?: string;
		readonly buttons?: readonly {
			readonly text: string;
			readonly type: 'primary' | 'secondary';
			readonly href?: string;
			readonly action?: string;
		}[];
	};
	readonly search: {
		readonly enabled: boolean;
		readonly placeholder: string;
		readonly noResultsTitle: string;
		readonly noResultsDescription: string;
		readonly popularSearches: readonly string[];
		readonly recentSearches?: readonly string[];
		readonly maxSuggestions: number;
	};
	readonly analytics: {
		readonly totalQuestions: number;
		readonly totalViews: number;
		readonly averageHelpfulness: number;
		readonly mostPopularCategory: string;
		readonly lastUpdated: string;
	};
	readonly settings: {
		readonly enableAnalytics: boolean;
		readonly enableRatings: boolean;
		readonly enableSearch: boolean;
		readonly enableRelatedQuestions: boolean;
		readonly maxRelatedQuestions: number;
		readonly defaultPageSize: number;
		readonly enableEmailCapture: boolean;
	};
}
interface ContactAddress {
	readonly line1: string;
	readonly line2: string;
	readonly city: string;
	readonly postcode: string;
	readonly country: string;
}
interface ContactDetails {
	readonly primaryEmail: string;
	readonly phone: string;
	readonly address: ContactAddress;
	readonly alternativeEmail?: string;
	readonly whatsapp?: string;
	readonly businessHours?: {
		readonly weekdays: string;
		readonly weekends?: string;
		readonly timezone: string;
	};
}
interface ContactSection {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly contactInfo: ContactDetails;
	readonly socialLinks?: readonly {
		readonly platform: string;
		readonly url: string;
		readonly icon: string;
	}[];
}
interface SiteConfig {
	readonly name: string;
	readonly tagline: string;
	readonly domain: string;
	readonly foundedYear: string;
	readonly heritage: string;
	readonly description?: string;
	readonly keywords?: readonly string[];
	readonly locale?: string;
	readonly timezone?: string;
}
interface BusinessDetails {
	readonly registrationNumber?: string;
	readonly vatNumber?: string;
	readonly insuranceDetails?: {
		readonly provider: string;
		readonly policyNumber: string;
		readonly expiryDate: string;
	};
	readonly qualifications: readonly {
		readonly title: string;
		readonly institution: string;
		readonly year: string;
		readonly verified: boolean;
	}[];
}
interface BusinessInfo {
	readonly name: string;
	readonly description: string;
	readonly address: {
		readonly line1: string;
		readonly line2?: string;
		readonly city: string;
		readonly postcode: string;
		readonly country: string;
	};
	readonly contact: {
		readonly email: string;
		readonly phone: string;
		readonly website: string;
	};
	readonly services: readonly string[];
	readonly credentials: readonly {
		readonly type:
			| 'royal_endorsement'
			| 'publication'
			| 'certification'
			| 'qualification';
		readonly title: string;
		readonly description: string;
		readonly year?: string;
		readonly verified: boolean;
	}[];
	readonly socialMedia: {
		readonly twitter?: string;
		readonly linkedin?: string;
		readonly facebook?: string;
	};
	readonly operatingHours: {
		readonly weekdays: string;
		readonly weekends?: string;
		readonly timezone: string;
		readonly availability: string;
	};
	readonly establishedYear: string;
	readonly heritage: string;
}
interface TestimonialVideo {
	readonly id: string;
	readonly title: string;
	readonly videoUrl: string;
	readonly thumbnailUrl?: string;
	readonly student: {
		readonly name: string;
		readonly initials?: string;
		readonly yearGroup: string;
		readonly location: string;
	};
	readonly results: {
		readonly subject: string;
		readonly beforeGrade?: string;
		readonly afterGrade: string;
		readonly improvement: string;
		readonly university?: string;
		readonly school?: string;
	};
	readonly subject: {
		readonly primary: string;
		readonly secondary?: readonly string[];
		readonly level: '11+' | 'GCSE' | 'A-Level' | 'Oxbridge' | 'International';
	};
	readonly transcript?: string;
	readonly duration: number;
	readonly featured: boolean;
	readonly category: 'oxbridge' | '11+' | 'gcse' | 'a-level' | 'international';
	readonly verified: boolean;
	readonly dateRecorded: string;
}
interface PricingInfo {
	readonly currency: string;
	readonly baseRate: {
		readonly amount: number;
		readonly display: string;
		readonly unit: string;
	};
	readonly tiers: {
		readonly tier1: TierPricingInfo;
		readonly tier2: TierPricingInfo;
		readonly tier3: TierPricingInfo;
	};
	readonly noRegistrationFees: boolean;
	readonly noAdminFees: boolean;
	readonly creditBalance: {
		readonly amount: number;
		readonly display: string;
		readonly description: string;
	};
	readonly discounts: {
		readonly blockBookings: boolean;
		readonly siblingEnrolment: boolean;
		readonly minimumLessonsForDiscount: number;
	};
	readonly promotional: {
		readonly tagline: string;
		readonly feeDisclaimer: string;
	};
}
interface TierPricingInfo {
	readonly name: string;
	readonly level: 'premium' | 'mid' | 'standard';
	readonly description: string;
	readonly bestFor: string;
	readonly hourlyRate: {
		readonly amount: number;
		readonly display: string;
		readonly fromDisplay: string;
	};
	readonly colour: {
		readonly name: string;
		readonly primary: string;
		readonly secondary: string;
		readonly border: string;
		readonly background: string;
		readonly text: string;
	};
	readonly features: readonly string[];
	readonly hasAccent: boolean;
	readonly hasCrown: boolean;
}
interface QuoteFormField {
	readonly id: string;
	readonly label: string;
	readonly placeholder: string;
	readonly type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
	readonly required: boolean;
	readonly validation?: {
		readonly message: string;
		readonly pattern?: string;
		readonly minLength?: number;
		readonly maxLength?: number;
	};
	readonly options?: readonly QuoteFormOption[];
	readonly conditional?: {
		readonly dependsOn: string;
		readonly showWhen: string | readonly string[];
	};
}
interface QuoteFormOption {
	readonly value: string;
	readonly label: string;
	readonly description?: string;
}
interface QuoteFormSection {
	readonly title: string;
	readonly description: string;
	readonly fields: readonly QuoteFormField[];
	readonly order: number;
}
interface QuoteFormMessages {
	readonly success: {
		readonly title: string;
		readonly message: string;
	};
	readonly error: {
		readonly title: string;
		readonly message: string;
	};
	readonly validation: {
		readonly required: string;
		readonly email: string;
		readonly phone: string;
		readonly minLength: string;
		readonly maxLength: string;
	};
}
interface QuoteFormContent {
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly backgroundImage?: string;
	};
	readonly form: {
		readonly title: string;
		readonly description: string;
		readonly sections: readonly QuoteFormSection[];
		readonly submitButton: {
			readonly text: string;
			readonly loadingText: string;
		};
		readonly privacyNotice?: string;
	};
	readonly messages: QuoteFormMessages;
	readonly contact: {
		readonly title: string;
		readonly description: string;
		readonly phone: string;
		readonly email: string;
	};
}
const getSiteHeader = cache((): SiteHeader => {
	return landingPageContent.header;
});
const getHeroContent = cache((): HeroContent => {
	return landingPageContent.hero;
});
const getTrustIndicators = cache((): TrustIndicator[] => {
	return landingPageContent.trustIndicators.indicators;
});
const getStudentJourney = cache((): StudentJourneySection => {
	return landingPageContent.studentJourney;
});
export const getTestimonials = cache((): Testimonial[] => {
	return landingPageContent.testimonials.testimonials;
});
const getAllTestimonials = cache((): Testimonial[] => {
	return testimonialsContent.recentTestimonials.map((testimonial) => ({
		...testimonial,
		category: testimonial.category as
			| 'academic'
			| 'entrance-exam'
			| 'general'
			| '11+'
			| 'GCSE'
			| 'A-Level'
			| 'Oxbridge'
			| 'International'
			| 'video',
		avatar:
			testimonial.avatar ||
			`/images/avatars/default-${testimonial.author.toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg`,
	}));
});
const getVideoTestimonials = cache((): Testimonial[] => {
	const videoTestimonials = getAllTestimonials().filter(
		(testimonial) => testimonial.hasVideo === true,
	);
	return Object.freeze(videoTestimonials) as Testimonial[];
});
const getTextTestimonials = cache((): Testimonial[] => {
	const textTestimonials = getAllTestimonials().filter(
		(testimonial) => testimonial.hasVideo !== true,
	);
	return Object.freeze(textTestimonials) as Testimonial[];
});
const getServices = (): readonly Service[] => {
	return landingPageContent.services.services;
};
const getWhoWeSupport = cache(
	(): {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly categories: readonly {
			readonly title: string;
			readonly description: string;
			readonly icon: string;
			readonly imageKey: string;
		}[];
	} => {
		return landingPageContent.whoWeSupport;
	},
);
export const getResultsStatistics = cache((): Statistic[] => {
	return landingPageContent.results.statistics;
});
interface UnifiedContactData {
	readonly primary: ContactDetails;
	readonly landing: ContactSection;
	readonly landingInfo: ContactDetails;
	readonly faq: {
		readonly title: string;
		readonly description: string;
		readonly phone?: string;
		readonly email?: string;
	};
	readonly quoteForm: {
		readonly title: string;
		readonly description: string;
		readonly phone: string;
		readonly email: string;
	};
}
interface CompanyTimelineItem {
	readonly year: string;
	readonly title: string;
	readonly description: string;
	readonly icon?: string;
	readonly color?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'info'
		| 'warning'
		| 'error';
}
interface CompanyTimelineSection {
	readonly title: string;
	readonly subtitle: string;
	readonly description?: string;
	readonly milestones: readonly CompanyTimelineItem[];
}
interface AboutContent {
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly image?: string;
		readonly imageAlt?: string;
	};
	readonly ourEthos: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly mainContent: {
			readonly introduction: string;
			readonly philosophy: string;
		};
		readonly sections: readonly {
			readonly title: string;
			readonly content: string | readonly string[];
		}[];
		readonly results: {
			readonly title: string;
			readonly statistics: readonly Statistic[];
		};
		readonly conclusion: string;
	};
	readonly story: {
		readonly title: string;
		readonly content?: string;
		readonly sections?: readonly {
			readonly title: string;
			readonly content: string;
			readonly image?: string;
		}[];
		readonly milestones?: readonly {
			readonly year: string;
			readonly title: string;
			readonly description: string;
		}[];
	};
	readonly team: {
		readonly title: string;
		readonly description: string;
		readonly members: readonly {
			readonly name: string;
			readonly role: string;
			readonly bio: string;
			readonly image: string;
			readonly credentials?: readonly string[];
			readonly qualifications?: readonly string[];
		}[];
	};
	readonly approach?: {
		readonly title: string;
		readonly description: string;
		readonly externalQuote?: {
			readonly text: string;
			readonly source: string;
			readonly features?: readonly ('highlighter' | 'underline')[];
		};
		readonly methodology: readonly {
			readonly step: string;
			readonly title: string;
			readonly description: string;
		}[];
	};
	readonly cta?: {
		readonly title: string;
		readonly description: string;
		readonly primaryButtonText: string;
		readonly primaryButtonLink: string;
		readonly secondaryButtonText?: string;
		readonly secondaryButtonLink?: string;
	};
	readonly founderStory?: {
		readonly title: string;
		readonly introduction: string;
		readonly unconventionalPath: string;
		readonly goingAgainstTheGrain: {
			readonly title: string;
			readonly content: readonly string[];
		};
		readonly firstLessonToSeventhContinent: {
			readonly title: string;
			readonly content: readonly string[];
		};
		readonly globalView: {
			readonly title: string;
			readonly content: string;
		};
		readonly resultsThatMatter: {
			readonly title: string;
			readonly content: readonly string[];
			readonly resultsList: readonly string[];
			readonly closingMessage: string;
			readonly finalQuote: string;
			readonly signature: string;
		};
		readonly achievements: readonly {
			readonly icon: string;
			readonly text: string;
		}[];
	};
	readonly companyTimeline?: CompanyTimelineSection;
}
export interface TestimonialsContent {
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
	};
	readonly mainContent: {
		readonly intro: string;
		readonly callToAction: string;
	};
	readonly recentTestimonials: readonly Testimonial[];
	readonly aboutTestimonials?: readonly Testimonial[];
	readonly schools?: readonly {
		readonly name: string;
		readonly logo: string;
		readonly testimonialCount: number;
	}[];
}
interface QuoteContent {
	readonly founderQuote: {
		readonly quote: string;
		readonly author: string;
		readonly role: string;
		readonly image: string;
		readonly signature?: string;
	};
	readonly royalTestimonial: {
		readonly quote: string;
		readonly author: string;
		readonly title: string;
		readonly crest?: string;
		readonly verified: boolean;
	};
}
const getUnifiedContact = cache((): UnifiedContactData => {
	const siteSettingsData = settingsContent;
	const landingPageData = landingPageContent;
	const faqData = faqContentJSON;
	return {
		primary: siteSettingsData.contact,
		landing: landingPageData.contact,
		landingInfo: landingPageData.contact.contactInfo,
		faq: faqData.contact,
		quoteForm: {
			title: 'Request Your Personalised Quote',
			description: "Begin Your Child's Academic Excellence Journey",
			phone: siteSettingsData.contact.phone,
			email: siteSettingsData.contact.email,
		},
	};
});
const getContactContent = cache((): ContactSection => {
	return landingPageContent.contact;
});
const getFooterContent = cache((): any => {
	// CMS is dead - return minimal structure to satisfy page-footer-client.tsx
	const footer = landingPageContent.footer as any;
	return {
		companyName: footer.companyName || 'My Private Tutor Online',
		description: footer.description || '',
		logo: {
			main: '/images/logos/logo-mark.png',
			alt: 'My Private Tutor Online Logo',
			width: 320,
			height: 160,
		},
		footerSections: footer.sections?.map((section: any) => ({
			title: section.title,
			links: section.links,
		})) || [],
	};
});
const getBusinessContent = cache(
	(): {
		readonly companyName: string;
		readonly founded: string;
		readonly heritage: string;
		readonly [key: string]: unknown;
	} => {
		return businessContent;
	},
);
const getAboutContent = cache((): AboutContent => {
	return aboutContent;
});
const getFounderStory = cache((): FounderStory | null => {
	const about = getAboutContent();
	return about.founderStory || null;
});
const getFounderAchievements = cache(
	(): readonly {
		readonly icon: string;
		readonly text: string;
	}[] => {
		const founderStory = getFounderStory();
		return founderStory?.achievements || [];
	},
);
const getCompanyTimeline = cache((): CompanyTimelineSection => {
	const about = getAboutContent();
	return {
		title: 'Our Journey',
		subtitle: '15 Years of Educational Excellence',
		description:
			"Key milestones in My Private Tutor Online's growth from startup to premium tutoring service",
		milestones:
			about.story.milestones?.map((milestone, index) => ({
				year: milestone.year,
				title: milestone.title,
				description: milestone.description,
				icon:
					index === 0 ? 'rocket'
					: index === 1 ? 'globe'
					: index === 2 ? 'crown'
					: index === 3 ? 'laptop'
					: 'star',
				color: (index % 5 === 0 ? 'primary'
				: index % 5 === 1 ? 'secondary'
				: index % 5 === 2 ? 'success'
				: index % 5 === 3 ? 'info'
				: 'warning') as const,
			})) || [],
	};
});
const getMainNavigation = cache((): NavigationItem[] => {
	return landingPageContent.header.navigation;
});
const getSiteBranding = cache(
	(): {
		readonly siteName: string;
		readonly logo: string;
		readonly companyName: string;
		readonly description: string;
	} => {
		return {
			siteName: landingPageContent.header.siteName,
			logo: landingPageContent.header.logo,
			companyName: landingPageContent.footer.companyName,
			description: landingPageContent.footer.description,
		};
	},
);
const getContactInfo = cache((): ContactDetails => {
	return landingPageContent.contact.contactInfo;
});
const getHowItWorksContent = cache((): HowItWorksContent => {
	return howItWorksContent;
});
const getHowItWorksHero = (): {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly backgroundImage?: string;
	readonly backgroundImageKey?: string;
} => {
	return howItWorksContent.hero;
};
const getHowItWorksSteps = cache((): HowItWorksStep[] => {
	return howItWorksContent?.steps || [];
});
const getTutorTiers = cache((): readonly TutorTier[] => {
	return howItWorksContent?.tutorTiers || [];
});
const getHowItWorksBenefits = cache((): readonly string[] => {
	return howItWorksContent?.benefits || [];
});
const getHowItWorksCTA = cache(
	(): {
		readonly title: string;
		readonly description: string;
		readonly buttons: readonly {
			readonly text: string;
			readonly type: string;
			readonly href: string;
			readonly external?: boolean;
		}[];
		readonly trustText?: string;
	} => {
		return howItWorksContent.cta;
	},
);
const getFAQContent = (): FAQContent => {
	return faqContent;
};
export const getFAQHero = (): {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
} => {
	return faqContent.hero;
};
export const getFAQCategories = cache((): readonly FAQCategory[] => {
	return faqContent.categories;
});
const getFAQSearchConfig = cache(
	(): {
		readonly enabled: boolean;
		readonly placeholder: string;
		readonly noResultsTitle: string;
		readonly noResultsDescription: string;
		readonly popularSearches: readonly string[];
		readonly recentSearches?: readonly string[];
		readonly maxSuggestions: number;
	} => {
		return faqContent.search;
	},
);
const getFAQAnalytics = cache(
	(): {
		readonly totalQuestions: number;
		readonly totalViews: number;
		readonly averageHelpfulness: number;
		readonly mostPopularCategory: string;
		readonly lastUpdated: string;
	} => {
		return faqContent.analytics;
	},
);
const getFAQSettings = cache(
	(): {
		readonly enableAnalytics: boolean;
		readonly enableRatings: boolean;
		readonly enableSearch: boolean;
		readonly enableRelatedQuestions: boolean;
		readonly maxRelatedQuestions: number;
		readonly defaultPageSize: number;
		readonly enableEmailCapture: boolean;
	} => {
		return faqContent.settings;
	},
);
const getFAQQuestionsByCategory = cache(
	(categoryId: string): readonly FAQQuestion[] => {
		const category = faqContent.categories.find((cat) => cat.id === categoryId);
		return category?.questions || [];
	},
);
const getFeaturedFAQs = cache((): readonly FAQQuestion[] => {
	const allQuestions = faqContent.categories.flatMap(
		(category) => category.questions,
	);
	return allQuestions.filter((question) => question.featured);
});
const getTrendingFAQs = cache((): readonly FAQQuestion[] => {
	const allQuestions = faqContent.categories.flatMap(
		(category) => category.questions,
	);
	return allQuestions
		.filter((question) => question.analytics.trending)
		.sort((a, b) => b.analytics.views - a.analytics.views);
});
const getFAQsByClientSegment = cache(
	(
		segment:
			| 'oxbridge_prep'
			| '11_plus'
			| 'elite_corporate'
			| 'comparison_shopper'
			| 'all',
	): readonly FAQQuestion[] => {
		const allQuestions = faqContent.categories.flatMap(
			(category) => category.questions,
		);
		return allQuestions.filter(
			(question) =>
				question.clientSegment === segment || question.clientSegment === 'all',
		);
	},
);
const getFAQsByDifficulty = cache(
	(
		difficulty: 'basic' | 'intermediate' | 'advanced',
	): readonly FAQQuestion[] => {
		const allQuestions = faqContent.categories.flatMap(
			(category) => category.questions,
		);
		return allQuestions.filter((question) => question.difficulty === difficulty);
	},
);
const getFAQQuestionById = cache(
	(questionId: string): FAQQuestion | undefined => {
		const allQuestions = faqContent.categories.flatMap(
			(category) => category.questions,
		);
		return allQuestions.find((question) => question.id === questionId);
	},
);
const getRelatedFAQs = cache(
	(questionId: string): readonly FAQQuestion[] => {
		const question = getFAQQuestionById(questionId);
		if (!question || !question.relatedFAQs.length) return [];
		const allQuestions = faqContent.categories.flatMap(
			(category) => category.questions,
		);
		return question.relatedFAQs
			.map((id) => allQuestions.find((q) => q.id === id))
			.filter((q): q is FAQQuestion => q !== undefined);
	},
);
const getMostHelpfulFAQs = cache(
	(limit: number = 10): readonly FAQQuestion[] => {
		const allQuestions = faqContent.categories.flatMap(
			(category) => category.questions,
		);
		return allQuestions
			.filter((question) => question.analytics.helpful > 0)
			.sort((a, b) => {
				const aRatio =
					a.analytics.helpful / (a.analytics.helpful + a.analytics.notHelpful);
				const bRatio =
					b.analytics.helpful / (b.analytics.helpful + b.analytics.notHelpful);
				return bRatio - aRatio;
			})
			.slice(0, limit);
	},
);
const getFAQContact = (): {
	readonly title: string;
	readonly description: string;
	readonly phone?: string;
	readonly email?: string;
} => {
	return faqContent.contact;
};
const getSiteSettings = cache((): typeof settingsContent => {
	return settingsContent;
});
const getSiteConfig = cache((): SiteConfig => {
	const siteSettings = getSiteSettings();
	return siteSettings.siteConfig;
});
const getContactDetails = cache((): ContactDetails => {
	const siteSettings = getSiteSettings();
	return siteSettings.contact;
});
const getBusinessDetails = cache((): BusinessDetails => {
	const siteSettings = getSiteSettings();
	return siteSettings.businessDetails;
});
const getBusinessInfo = cache((): BusinessInfo => {
	const business = businessContent.website || businessContent;
	const settings = getSiteSettings();
	const contact = settings.contact;
	return {
		name: settings.siteConfig.name,
		description:
			business.aboutUs?.description ||
			'Premium private tutoring with royal endorsements. 15+ years experience in Oxbridge prep, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book.',
		address: {
			line1: contact.address.line1,
			line2: contact.address.line2,
			city: contact.address.city,
			postcode: contact.address.postcode,
			country: contact.address.country,
		},
		contact: {
			email: contact.primaryEmail,
			phone: contact.phone,
			website: `https://${settings.siteConfig.domain}`,
		},
		services: [
			'Oxbridge Preparation',
			'11+ Tutoring',
			'GCSE Excellence',
			'A-Level Mastery',
			'Private Tutoring',
		],
		credentials: [
			{
				type: 'royal_endorsement',
				title: 'Royal Family Testimonials',
				description:
					'Endorsed by royal family members for exceptional tutoring services',
				verified: true,
			},
			{
				type: 'publication',
				title: 'Featured in Tatler Address Book 2025',
				description:
					"Listed among the UK's most trusted educational service providers",
				year: '2025',
				verified: true,
			},
			{
				type: 'qualification',
				title: '100% Oxbridge Graduate Tutors',
				description:
					'All tutors are graduates from Oxford or Cambridge universities',
				verified: true,
			},
			{
				type: 'certification',
				title: 'Official Exam Board Examiners',
				description: 'Tutors include official examiners for major exam boards',
				verified: true,
			},
		],
		socialMedia: {
			twitter: contact.socialMedia.twitter,
			linkedin: contact.socialMedia.linkedin,
			facebook: contact.socialMedia.facebook,
		},
		operatingHours: {
			weekdays: 'Monday-Friday 8:00 AM - 8:00 PM',
			weekends: 'Saturday-Sunday 9:00 AM - 6:00 PM',
			timezone: 'GMT',
			availability: 'Year-round tutoring with flexible scheduling',
		},
		establishedYear: settings.siteConfig.foundedYear,
		heritage: settings.siteConfig.heritage,
	};
});
const getDetailedTestimonialVideos = cache(
	(): readonly TestimonialVideo[] => {
		const videoTestimonials: TestimonialVideo[] = [
			{
				id: 'video-001',
				title: 'Westminster School Success - 11+ Achievement',
				videoUrl: '',
				thumbnailUrl: '/videos/testimonials/thumbnails/westminster-success.jpg',
				student: {
					name: 'Student A',
					initials: 'S.M.',
					yearGroup: 'Year 6',
					location: 'London',
				},
				results: {
					subject: 'English & Mathematics',
					afterGrade: 'A*',
					improvement: 'Secured Westminster School place',
					school: 'Westminster School',
				},
				subject: {
					primary: 'English & Mathematics',
					secondary: ['Verbal Reasoning', 'Non-Verbal Reasoning'],
					level: '11+',
				},
				duration: 180,
				featured: true,
				category: '11+',
				verified: true,
				dateRecorded: '2024-09-15',
			},
			{
				id: 'video-002',
				title: 'Oxford & Cambridge Success - Dual Oxbridge Offers',
				videoUrl: '',
				thumbnailUrl: '/videos/testimonials/thumbnails/oxbridge-dual-success.jpg',
				student: {
					name: 'Students P',
					initials: 'J.P. & V.P.',
					yearGroup: 'Year 13',
					location: 'South East',
				},
				results: {
					subject: 'Sciences & Mathematics',
					afterGrade: 'A*',
					improvement: 'Both children secured Oxbridge offers',
					university: 'Oxford & Cambridge',
				},
				subject: {
					primary: 'Sciences & Mathematics',
					secondary: ['Physics', 'Chemistry', 'Further Mathematics'],
					level: 'Oxbridge',
				},
				duration: 240,
				featured: true,
				category: 'oxbridge',
				verified: true,
				dateRecorded: '2024-08-20',
			},
			{
				id: 'video-003',
				title: 'GCSE Grade Improvement - Mathematics Success',
				videoUrl: '',
				thumbnailUrl: '/videos/testimonials/thumbnails/gcse-improvement.jpg',
				student: {
					name: 'Student L',
					initials: 'A.L.',
					yearGroup: 'Year 11',
					location: 'London',
				},
				results: {
					subject: 'Mathematics',
					beforeGrade: '4',
					afterGrade: '7',
					improvement: 'Grade 4 to 7 improvement in retake',
				},
				subject: {
					primary: 'Mathematics',
					level: 'GCSE',
				},
				duration: 150,
				featured: true,
				category: 'gcse',
				verified: true,
				dateRecorded: '2024-11-10',
			},
			{
				id: 'video-004',
				title: 'Confidence Transformation - Year 9 Success Story',
				videoUrl: '',
				thumbnailUrl:
					'/videos/testimonials/thumbnails/confidence-transformation.jpg',
				student: {
					name: 'Student K',
					initials: 'D.K.',
					yearGroup: 'Year 9',
					location: 'South East',
				},
				results: {
					subject: 'English & Humanities',
					afterGrade: 'B+',
					improvement: 'Remarkable confidence transformation',
				},
				subject: {
					primary: 'English & Humanities',
					secondary: ['English Literature', 'History'],
					level: 'GCSE',
				},
				duration: 195,
				featured: false,
				category: 'gcse',
				verified: true,
				dateRecorded: '2024-07-05',
			},
			{
				id: 'video-005',
				title: 'International School Success - Le Rosey Acceptance',
				videoUrl: '',
				thumbnailUrl: '/videos/testimonials/thumbnails/le-rosey-success.jpg',
				student: {
					name: 'Al-Rashid Family',
					initials: 'A.R.',
					yearGroup: 'Various',
					location: 'International',
				},
				results: {
					subject: 'Languages & Arts',
					afterGrade: 'A*',
					improvement: 'Three children accepted to Le Rosey',
					school: 'Le Rosey',
				},
				subject: {
					primary: 'Languages & Arts',
					secondary: ['French', 'Art History', 'International Baccalaureate'],
					level: 'International',
				},
				duration: 210,
				featured: true,
				category: 'international',
				verified: true,
				dateRecorded: '2024-06-30',
			},
		];
		return videoTestimonials;
	},
);
const getPricingInfo = cache((): PricingInfo => {
	const siteSettings = getSiteSettings();
	return siteSettings.pricing;
});
const getQualifications = cache(
	(): {
		readonly [key: string]: unknown;
	} => {
		const siteSettings = getSiteSettings();
		return siteSettings.qualifications;
	},
);
const searchFAQQuestions = (
	query: string,
	maxResults: number = 10,
): readonly FAQQuestion[] => {
	if (!query.trim()) return [];
	const searchTerms = query
		.toLowerCase()
		.split(' ')
		.filter((term) => term.length > 1);
	const allQuestions = faqContent.categories.flatMap(
		(category) => category.questions,
	);
	const scoredResults = allQuestions.map((question) => {
		let score = 0;
		const lowerQuestion = question.question.toLowerCase();
		const lowerAnswer = question.answer.toLowerCase();
		const lowerKeywords = question.searchKeywords.map((k) => k.toLowerCase());
		if (searchTerms.some((term) => lowerQuestion.includes(term))) score += 10;
		if (searchTerms.some((term) => lowerAnswer.includes(term))) score += 5;
		if (
			searchTerms.some((term) =>
				lowerKeywords.some((keyword) => keyword.includes(term)),
			)
		)
			score += 8;
		if (
			searchTerms.some((term) =>
				question.tags.some((tag) => tag.toLowerCase().includes(term)),
			)
		)
			score += 6;
		if (question.featured) score += 2;
		if (question.analytics.helpful > question.analytics.notHelpful) score += 1;
		return {
			question,
			score,
		};
	});
	return scoredResults
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, maxResults)
		.map((result) => result.question);
};
const getFAQSearchSuggestions = (
	partialQuery: string,
	maxSuggestions: number = 5,
): readonly string[] => {
	if (!partialQuery.trim())
		return faqContent.search.popularSearches.slice(0, maxSuggestions);
	const lowerQuery = partialQuery.toLowerCase();
	const allQuestions = faqContent.categories.flatMap(
		(category) => category.questions,
	);
	const suggestions = new Set<string>();
	allQuestions.forEach((question) => {
		question.searchKeywords.forEach((keyword) => {
			if (keyword.toLowerCase().includes(lowerQuery)) {
				suggestions.add(keyword);
			}
		});
		const questionWords = question.question.split(' ');
		for (let i = 0; i < questionWords.length - 1; i++) {
			const phrase = questionWords
				.slice(i, i + 2)
				.join(' ')
				.toLowerCase();
			if (phrase.includes(lowerQuery) && phrase.length > partialQuery.length) {
				suggestions.add(phrase);
			}
		}
	});
	return Array.from(suggestions)
		.slice(0, maxSuggestions)
		.sort((a, b) => a.length - b.length);
};
const calculateHelpfulnessRatio = (question: FAQQuestion): number => {
	const total = question.analytics.helpful + question.analytics.notHelpful;
	if (total === 0) return 0;
	return Math.round((question.analytics.helpful / total) * 100);
};
const getFAQsSortedByRelevance = (
	categoryId?: string,
): readonly FAQQuestion[] => {
	const questions =
		categoryId ?
			getFAQQuestionsByCategory(categoryId)
		:	faqContent.categories.flatMap((category) => category.questions);
	return questions.slice().sort((a, b) => {
		if (a.priority !== b.priority) {
			return b.priority - a.priority;
		}
		const aRatio = calculateHelpfulnessRatio(a);
		const bRatio = calculateHelpfulnessRatio(b);
		if (aRatio !== bRatio) {
			return bRatio - aRatio;
		}
		return b.analytics.views - a.analytics.views;
	});
};
const getFAQCategoryAnalytics = (
	categoryId: string,
): {
	readonly totalQuestions: number;
	readonly totalViews: number;
	readonly averageHelpfulness: number;
	readonly mostPopularQuestion: FAQQuestion | null;
	readonly featuredCount: number;
} => {
	const questions = getFAQQuestionsByCategory(categoryId);
	if (questions.length === 0) {
		return {
			totalQuestions: 0,
			totalViews: 0,
			averageHelpfulness: 0,
			mostPopularQuestion: null,
			featuredCount: 0,
		};
	}
	const totalViews = questions.reduce((sum, q) => sum + q.analytics.views, 0);
	const totalHelpfulVotes = questions.reduce(
		(sum, q) => sum + q.analytics.helpful,
		0,
	);
	const totalNotHelpfulVotes = questions.reduce(
		(sum, q) => sum + q.analytics.notHelpful,
		0,
	);
	const averageHelpfulness =
		totalHelpfulVotes + totalNotHelpfulVotes > 0 ?
			Math.round(
				(totalHelpfulVotes / (totalHelpfulVotes + totalNotHelpfulVotes)) * 100,
			)
		:	0;
	const mostPopularQuestion =
		questions.slice().sort((a, b) => b.analytics.views - a.analytics.views)[0] ||
		null;
	const featuredCount = questions.filter((q) => q.featured).length;
	return {
		totalQuestions: questions.length,
		totalViews,
		averageHelpfulness,
		mostPopularQuestion,
		featuredCount,
	};
};
const validateFAQDataStructure = (): {
	readonly isValid: boolean;
	readonly errors: readonly string[];
	readonly warnings: readonly string[];
} => {
	const errors: string[] = [];
	const warnings: string[] = [];
	try {
		if (!faqContent.categories || faqContent.categories.length === 0) {
			errors.push('No FAQ categories found');
		}
		if (!faqContent.hero) {
			errors.push('FAQ hero section missing');
		}
		if (!faqContent.contact) {
			errors.push('FAQ contact section missing');
		}
		faqContent.categories.forEach((category, categoryIndex) => {
			if (!category.id || !category.title) {
				errors.push(
					`Category ${categoryIndex}: Missing required fields (id, title)`,
				);
			}
			if (!category.questions || category.questions.length === 0) {
				warnings.push(`Category "${category.title}": No questions found`);
			}
			category.questions.forEach((question, questionIndex) => {
				if (!question.id || !question.question || !question.answer) {
					errors.push(
						`Category "${category.title}", Question ${questionIndex}: Missing required fields`,
					);
				}
				if (!question.searchKeywords || question.searchKeywords.length === 0) {
					warnings.push(
						`Question "${question.question}": No search keywords defined`,
					);
				}
				if (question.priority < 1 || question.priority > 10) {
					warnings.push(
						`Question "${question.question}": Priority should be between 1-10`,
					);
				}
			});
		});
	} catch (error) {
		errors.push(`Data structure validation failed: ${error}`);
	}
	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
};
const formatBritishEnglish = (text: string): string => {
	return text
		.replace(/\borganiz/g, 'organis')
		.replace(/\bcolor/g, 'colour')
		.replace(/\bcenter/g, 'centre')
		.replace(/\bfavorite/g, 'favourite')
		.replace(/\blicense/g, 'licence');
};
const getCopyrightText = (): string => {
	const currentYear = 2025;
	return `© ${currentYear} My Private Tutor Online. All rights reserved.`;
};
const validateContentStructure = cache((): boolean => {
	const requiredFields: readonly string[] = [
		'header.siteName',
		'hero.title',
		'services.services',
		'contact.contactInfo',
	];
	const missingFields: string[] = [];
	const landingContent = landingPageContent;
	requiredFields.forEach((field) => {
		const keys = field.split('.');
		let current: Record<string, unknown> = landingContent as Record<
			string,
			unknown
		>;
		for (const key of keys) {
			if (!current || !current[key]) {
				missingFields.push(field);
				break;
			}
			current = current[key] as Record<string, unknown>;
		}
	});
	if (missingFields.length > 0) {
		return false;
	}
	return true;
});
export const getTestimonialsContent = cache((): TestimonialsContent => {
	return testimonialsContent;
});
export const getTestimonialsHero = cache(
	(): {
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
	} => {
		const testimonialsContentData = testimonialsContent;
		return {
			...testimonialsContentData.hero,
			backgroundVariant: 'gradient' as const,
			size: 'full' as const,
			showCredentials: true,
			customCredentials: [
				{
					icon: 'crown' as const,
					text: 'Featured in Tatler Address Book 2025',
				},
				{
					icon: 'award' as const,
					text: 'Recognised by School Guide UK',
				},
				{
					icon: 'star' as const,
					text: '15+ Years Serving Elite Families',
				},
			],
		};
	},
);
export const getTestimonialsIntroConfig = cache(
	(): {
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
	} => {
		return {
			introContent: testimonialsContent.mainContent,
			trustIndicators: [
				{
					id: 'tatler-2025',
					iconType: 'crown' as const,
					text: 'Featured in Tatler',
					description: 'Address Book 2025 - Elite society recognition',
					featured: true,
					url: '#tatler-recognition',
				},
				{
					id: 'school-guide-top-pick',
					iconType: 'award' as const,
					text: "School Guide UK's Top Pick",
					description: 'Educational excellence recognition for premium tutoring',
					featured: true,
					url: '#school-guide-award',
				},
				{
					id: 'royal-trust',
					iconType: 'shield' as const,
					text: 'Royal Client Trust',
					description: 'Serving elite families with complete discretion since 2010',
					featured: false,
				},
				{
					id: 'excellence-heritage',
					iconType: 'trophy' as const,
					text: '15 Years Excellence',
					description: 'Established educational heritage with proven results',
					featured: false,
				},
				{
					id: 'oxbridge-success',
					iconType: 'medal' as const,
					text: 'Oxbridge Success',
					description: '89% success rate for Oxbridge placements',
					featured: false,
				},
				{
					id: 'word-of-mouth',
					iconType: 'star' as const,
					text: 'Pure Word-of-Mouth',
					description: 'Never spent a penny on advertising - reputation speaks',
					featured: false,
				},
			],
			backgroundVariant: 'slate' as const,
			showWaveSeparator: true,
		};
	},
);
const getQuotes = cache((): QuoteContent => {
	return landingPageContent.quotes;
});
const getFounderQuote = (): {
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly image: string;
	readonly signature?: string;
} => {
	return landingPageContent.quotes.founderQuote;
};
const getRoyalTestimonial = cache(
	(): {
		readonly quote: string;
		readonly author: string;
		readonly title: string;
		readonly crest?: string;
		readonly verified: boolean;
	} => {
		return landingPageContent.quotes.royalTestimonial;
	},
);
const getRecentTestimonials = cache((): readonly Testimonial[] => {
	return testimonialsContent.recentTestimonials;
});
const getAboutTestimonials = cache((): readonly Testimonial[] => {
	console.warn(
		'[DEPRECATION WARNING] getAboutTestimonials() is deprecated. Use getTextTestimonials() instead for unified CMS and video filtering.',
	);
	return (
		testimonialsContent.aboutTestimonials ||
		testimonialsContent.recentTestimonials
	);
});
const getTestimonialsSchools = cache((): readonly string[] => {
	return testimonialsContent.schools;
});
const getTestimonialsCarouselConfig = cache(
	(): {
		autoplays: boolean;
		showNavigation: boolean;
		showPagination: boolean;
		maxItemsPerSlide: number;
		transitionDuration: number;
		schools: any[];
		totalStudents: number;
		successRate: string;
		title: string;
		description: string;
		displayMode: 'text' | 'mixed' | 'logos';
		showControls: boolean;
		showModal: boolean;
		autoPlay: boolean;
		pauseOnHover: boolean;
		animationSpeed: 'medium' | 'fast' | 'slow';
		backgroundVariant: 'gradient' | 'white' | 'blue';
	} => {
		const { featuredSchools, topSchools } = getEliteSchoolsData();
		return {
			schools: topSchools,
			autoplays: true,
			showNavigation: true,
			showPagination: true,
			maxItemsPerSlide: 4,
			transitionDuration: 500,
			totalStudents: 2500,
			successRate: '98%',
			displayMode: 'mixed',
			showControls: true,
			showModal: true,
			autoPlay: true,
			pauseOnHover: true,
			animationSpeed: 'medium',
			backgroundVariant: 'blue',
			title: 'Prestigious Schools & Universities',
			description:
				'Our students have secured places at the most prestigious educational institutions worldwide',
		};
	},
);
interface ServiceSubjectItem {
	readonly name: string;
	readonly description: string;
	readonly keyFeatures: readonly string[];
	readonly pricing?: {
		readonly from: string;
		readonly to?: string;
		readonly currency: string;
	};
	readonly level?: string;
	readonly children?: readonly ServiceSubjectItem[];
	readonly videoSection?: {
		readonly thumbnailUrl: string;
		readonly videoUrl: string;
		readonly title: string;
		readonly alt: string;
	};
}
interface ServiceSubjectCategory {
	readonly id: string;
	readonly title: string;
	readonly icon: string;
	readonly description: string;
	readonly subjects: readonly ServiceSubjectItem[];
	readonly pricing?: {
		readonly basePriceFrom: string;
		readonly currency: string;
	};
	readonly popularityRank?: number;
	readonly callOuts: readonly string[];
	readonly testimonial: string;
}
interface ServiceStatisticItem {
	readonly value: string;
	readonly label: string;
	readonly description?: string;
	readonly icon?: string;
	readonly category?: 'achievement' | 'coverage' | 'success' | 'general';
	readonly highlighted?: boolean;
}
interface ServicesPageContent {
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
		readonly backgroundImage?: string;
	};
	readonly statistics: readonly ServiceStatisticItem[];
	readonly subjectCategories: readonly ServiceSubjectCategory[];
	readonly homeschoolingPreview: {
		readonly title: string;
		readonly description: string;
		readonly features: readonly {
			readonly text: string;
		}[];
		readonly buttonText: string;
		readonly icon?: string;
	};
	readonly cta: {
		readonly title: string;
		readonly description: string;
		readonly primaryButton: {
			readonly text: string;
			readonly action: string;
		};
		readonly secondaryButton: {
			readonly text: string;
			readonly action: string;
		};
	};
	readonly sectionTitles: {
		readonly subjectCategories: {
			readonly title: string;
			readonly description: string;
		};
	};
}
interface ResultsDocumentationItem {
	readonly category:
		| 'grade_improvement'
		| 'university_placement'
		| 'exam_success'
		| 'roi_analysis';
	readonly metric: string;
	readonly value: string;
	readonly description: string;
	readonly sampleSize?: number;
	readonly timeframe: string;
	readonly verificationLevel: 'verified' | 'estimated' | 'projected';
	readonly confidenceInterval?: string;
	readonly icon?: string;
	readonly priority: number;
}
interface CaseStudyItem {
	readonly id: string;
	readonly category:
		| 'oxbridge_prep'
		| '11_plus'
		| 'elite_corporate'
		| 'comparison_shopper';
	readonly anonymizedTitle: string;
	readonly level: string;
	readonly subject?: string;
	readonly initialPosition: string;
	readonly finalOutcome: string;
	readonly duration: string;
	readonly investment: {
		readonly tier: 'essentials' | 'premium' | 'elite';
		readonly approxValue?: string;
	};
	readonly keyInterventions: readonly string[];
	readonly clientTestimonial?: string;
	readonly verified: boolean;
	readonly featured: boolean;
}
interface CompetitiveAnalysisData {
	readonly category:
		| 'pricing'
		| 'service_quality'
		| 'credentials'
		| 'exclusivity'
		| 'results';
	readonly metricName: string;
	readonly ourAdvantage: string;
	readonly industryAverage?: string;
	readonly competitorComparison?: string;
	readonly justification: string;
	readonly supportingEvidence: readonly string[];
	readonly clientSegment:
		| 'oxbridge_prep'
		| '11_plus'
		| 'elite_corporate'
		| 'comparison_shopper'
		| 'all';
	readonly priority: number;
}
interface ROICalculationData {
	readonly investmentTier: 'essentials' | 'premium' | 'elite';
	readonly typicalInvestment: {
		readonly min: number;
		readonly max: number;
		readonly currency: 'GBP';
	};
	readonly measurableOutcomes: readonly {
		readonly outcome: string;
		readonly financialValue?: string;
		readonly probabilityImprovement: string;
	}[];
	readonly timeToReturn: string;
	readonly lifetimeValue: string;
	readonly confidenceLevel: string;
}
interface BusinessAnalyticsData {
	readonly resultsDocumentation: readonly ResultsDocumentationItem[];
	readonly caseStudies: readonly CaseStudyItem[];
	readonly competitiveAnalysis: readonly CompetitiveAnalysisData[];
	readonly roiCalculations: readonly ROICalculationData[];
	readonly lastUpdated: string;
	readonly dataVerificationDate: string;
}
const getServicesContent = cache((): ServicesPageContent => {
	return {
		hero: {
			title: 'Subject Tuition',
			subtitle: 'Comprehensive educational support across all levels',
			description:
				'From entrance exams to university preparation, our expert tutors provide personalised instruction across all subjects and educational stages.',
		},
		statistics: [
			{
				value: '40+',
				label: 'Subjects Covered',
				description: 'Comprehensive subject coverage from KS1 to University level',
				category: 'coverage',
				icon: 'BookOpen',
			},
			{
				value: '95%',
				label:
					'95% of candidates receive offers from at least one of their top choices',
				description:
					'Including prestigious grammar schools, independent schools, and Oxbridge',
				category: 'success',
				highlighted: true,
				icon: 'Award',
			},
			{
				value: 'KS1-University',
				label: 'All Educational Levels',
				description: 'From early primary through to postgraduate support',
				category: 'coverage',
				icon: 'GraduationCap',
			},
			{
				value: '15 Years',
				label: 'Educational Excellence',
				description: 'Established heritage serving elite families since 2010',
				category: 'achievement',
				icon: 'Crown',
			},
			{
				value: 'Royal',
				label: 'Client Endorsements',
				description:
					'Trusted by aristocratic families and featured in Tatler Address Book 2025',
				category: 'achievement',
				highlighted: true,
				icon: 'Shield',
			},
			{
				value: 'Three Tiers',
				label: 'Service Levels',
				description: 'Essentials, Premium, and Elite tutoring packages',
				category: 'general',
				icon: 'Target',
			},
		],
		subjectCategories: [
			{
				id: 'primary',
				title: 'PRIMARY',
				icon: 'BookOpen',
				description:
					"The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right. We understand that early education experiences are formative, so we prioritise curiosity, resilience, and a love of learning.",
				popularityRank: 1,
				pricing: {
					basePriceFrom: '£60',
					currency: 'GBP',
				},
				subjects: [
					{
						name: 'Confidence-building lessons designed for early learners',
						description:
							'Our primary tutoring focuses on nurturing natural curiosity whilst building essential academic foundations. We understand that young learners need encouragement and support to develop confidence in their abilities, creating positive associations with learning that will serve them throughout their educational journey.',
						keyFeatures: [
							'Age-appropriate teaching methods',
							'Confidence building activities',
							'Positive reinforcement techniques',
							'Play-based learning integration',
						],
						level: 'Reception-Year 6',
						pricing: {
							from: '£60',
							to: '£100',
							currency: 'GBP',
						},
					},
					{
						name:
							'7+, 8+ and 11+ specialists with a track record of top school offers',
						description:
							'Our experienced tutors specialise in preparing young students for competitive entrance examinations. With proven success rates at leading preparatory and grammar schools, we provide targeted preparation that builds both academic competence and examination confidence.',
						keyFeatures: [
							'Entrance exam specialists',
							'Proven track record',
							'School-specific preparation',
							'Examination technique coaching',
						],
						level: 'Year 2-6',
						pricing: {
							from: '£85',
							to: '£150',
							currency: 'GBP',
						},
					},
					{
						name: 'Individual learning plans shaped by expert assessment',
						description:
							"Every primary student receives a comprehensive initial assessment to identify their unique learning style, strengths, and areas for development. Our expert tutors then create personalised learning plans that adapt to each child's pace and preferred learning methods.",
						keyFeatures: [
							'Comprehensive initial assessment',
							'Personalised learning plans',
							'Regular progress monitoring',
							'Adaptive teaching methods',
						],
						level: 'Reception-Year 6',
						pricing: {
							from: '£65',
							to: '£120',
							currency: 'GBP',
						},
					},
				],
				callOuts: [
					'Confidence-building lessons designed for early learners',
					'7+, 8+ and 11+ specialists with a track record of top school offers',
					'Individual learning plans shaped by expert assessment',
				],
				testimonial:
					"Our daughter was so shy and unsure at the start. Now she's thriving, and her 7+ offers speak for themselves. We couldn't be more grateful.",
			},
			{
				id: 'secondary',
				title: 'SECONDARY',
				icon: 'BookOpen',
				description:
					'One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners. Our support goes beyond the syllabus, equipping students with effective revision strategies, time management skills and structured study plans. 94% of students improve by at least two grades at GCSE.',
				popularityRank: 2,
				pricing: {
					basePriceFrom: '£70',
					currency: 'GBP',
				},
				subjects: [
					{
						name: 'Tutoring Today for Success Tomorrow',
						description:
							'GCSEs, A-Levels and IB exams mark crucial academic transition points. As subjects become more complex, results in these qualifications play a defining role in shaping university pathways. A minimum requirement of 7s at GCSE is now standard at many top-tier universities. Personalised, one-to-one tuition can make a significant difference at both GCSE and A Level, helping students strengthen their academic record, ready to present a dynamite profile when it matters most.',
						keyFeatures: [
							'GCSE & A-Level expertise',
							'University pathway planning',
							'Grade improvement strategies',
							'Profile strengthening',
						],
						level: 'Year 7-13',
						pricing: {
							from: '£70',
							to: '£150',
							currency: 'GBP',
						},
					},
					{
						name: 'Personalised Plans to Ensure Maximum Progress',
						description:
							'Each student is initially assessed to identify their individual strengths, learning style and areas for growth. Regular progress check-ins and measurable academic outcomes ensure students stay on track for success.',
						keyFeatures: [
							'Individual assessment',
							'Learning style identification',
							'Progress monitoring',
							'Measurable outcomes',
						],
						level: 'Year 7-13',
						pricing: {
							from: '£75',
							to: '£140',
							currency: 'GBP',
						},
					},
					{
						name: 'Subjects We Tutor',
						description:
							'Comprehensive subject coverage across all key academic areas including STEM subjects, humanities, languages, and creative disciplines. Our tutors are subject specialists with extensive examination experience.',
						keyFeatures: [
							'Comprehensive subject coverage',
							'Subject specialists',
							'Examination experience',
							'Personalised approach',
						],
						level: 'Year 7-13',
						pricing: {
							from: '£70',
							to: '£180',
							currency: 'GBP',
						},
						children: [
							{
								name: 'STEM & Mathematical Subjects',
								description:
									'Advanced mathematics and scientific disciplines taught by specialists with extensive examination board experience.',
								keyFeatures: [
									'Mathematics & Further Mathematics',
									'Biology',
									'Chemistry',
									'Physics',
									'Combined Science (GCSE)',
									'Computer Science',
									'Design and Technology',
								],
								level: 'Year 7-13',
								pricing: {
									from: '£75',
									to: '£180',
									currency: 'GBP',
								},
							},
							{
								name: 'Humanities & Social Sciences',
								description:
									'Comprehensive humanities education covering literature, history, politics, and social sciences with expert guidance.',
								keyFeatures: [
									'English Language & Literature',
									'History',
									'Politics',
									'Geography',
									'Economics and Business Studies',
									'Religious Studies',
									'Philosophy',
									'Sociology',
									'Psychology',
								],
								level: 'Year 7-13',
								pricing: {
									from: '£70',
									to: '£160',
									currency: 'GBP',
								},
							},
							{
								name: 'Languages',
								description:
									'Modern and classical language tuition with native speakers and qualified language specialists.',
								keyFeatures: [
									'French',
									'Spanish',
									'Italian',
									'German',
									'Mandarin',
									'Portuguese',
									'Latin',
									'Ancient Greek',
									'Other languages available',
								],
								level: 'Year 7-13',
								pricing: {
									from: '£75',
									to: '£170',
									currency: 'GBP',
								},
							},
							{
								name: 'Creative & Arts-Based Subjects',
								description:
									'Creative disciplines taught by practising professionals and experienced arts educators.',
								keyFeatures: [
									'Fine Art and History of Art',
									'Art and Visual Studies',
									'Drama and Theatre Studies',
									'Media Studies',
									'Creative portfolio development',
								],
								level: 'Year 7-13',
								pricing: {
									from: '£70',
									to: '£150',
									currency: 'GBP',
								},
							},
							{
								name: 'Additional Academic Support',
								description:
									'Specialised academic skills and examination preparation beyond core curriculum subjects.',
								keyFeatures: [
									'Extended Project Qualification (EPQ)',
									'Mentoring and Study Skills',
									'Critical Thinking',
									'Interview Technique',
									'Public Speaking and Debating',
								],
								level: 'Year 7-13',
								pricing: {
									from: '£80',
									to: '£160',
									currency: 'GBP',
								},
							},
						],
					},
				],
				callOuts: [
					'GCSE and A-level examiners as tutors',
					'Support across all major exam boards: AQA, Edexcel, OCR, IB',
					'Support with GCSE, A Level and IB retakes',
				],
				testimonial:
					"Annika scored a 7 in her GCSE retake. We are THRILLED. It's such an improvement on the 4 she got in the summer!",
			},
			{
				id: 'entrance-exams',
				title: 'ENTRANCE EXAMS (7+, 8+, 11+, 13+, 16+, UKiset, CAT4)',
				icon: 'Target',
				description:
					'Specialised preparation for competitive entrance examinations across all age groups',
				popularityRank: 3,
				pricing: {
					basePriceFrom: '£85',
					currency: 'GBP',
				},
				subjects: [
					{
						name: 'Aligned With Every Major Exam Board',
						description:
							'Our team works with GL, CEM, ISEB, CAT4, and internal papers set by individual schools.',
						keyFeatures: [
							'GL Assessment expertise',
							'CEM preparation',
							'ISEB Common Entrance',
							'School-specific papers',
						],
						level: 'Year 2-8',
						pricing: {
							from: '£85',
							to: '£160',
							currency: 'GBP',
						},
					},
					{
						name: 'Expert Tutor Matching',
						description:
							"Paired with a specialist tutor—often a former school examiner or prep school teacher—carefully chosen to meet the family's school ambitions.",
						keyFeatures: [
							'Former examiners',
							'Prep school teachers',
							'School-specific expertise',
							'Personalised matching',
						],
						level: 'All Levels',
						pricing: {
							from: '£100',
							to: '£180',
							currency: 'GBP',
						},
						videoSection: {
							thumbnailUrl:
								'/images/video-thumbnails/thumbnail-11-plus-expert-intro-video-mpto.png',
							videoUrl: '/videos/11-plus-expert-intro-video-mpto.mp4',
							title: 'Meet Emily - Our 11+ Expert Introduction',
							alt: "Emily's 11+ Expert Introduction Video - Meet Emily, our specialist 11+ tutor and learn about our comprehensive entrance exam preparation approach",
						},
					},
					{
						name: 'Tailored, Flexible Programmes',
						description:
							"Each programme is personalised to the target schools, exam formats and the student's pace—ensuring effective progress without overwhelm.",
						keyFeatures: [
							'Target school focus',
							'Exam format preparation',
							'Individual pacing',
							'Stress management',
						],
						level: 'All Levels',
						pricing: {
							from: '£85',
							to: '£150',
							currency: 'GBP',
						},
					},
					{
						name: 'Parent Guidance & School Selection',
						description:
							'We support families throughout—from helping create a shortlist of schools through to preparing for interviews.',
						keyFeatures: [
							'School selection advice',
							'Application guidance',
							'Timeline planning',
							'Interview preparation',
						],
						level: 'Parent Support',
						pricing: {
							from: '£80',
							to: '£140',
							currency: 'GBP',
						},
					},
					{
						name: 'Mock Exams & Interview Practice',
						description:
							'Students gain confidence through realistic mock tests and 1-2-1 interview rehearsals, with detailed feedback to improve performance.',
						keyFeatures: [
							'Realistic mock exams',
							'Interview rehearsals',
							'Detailed feedback',
							'Performance analysis',
						],
						level: 'All Levels',
						pricing: {
							from: '£120',
							to: '£200',
							currency: 'GBP',
						},
					},
					{
						name: 'Deep Expertise From Selective Schools',
						description:
							'Our team includes qualified teachers at top 10 London grammar schools and leading UK boarding schools. Many have written and marked real entrance exam papers.',
						keyFeatures: [
							'Grammar school teachers',
							'Boarding school expertise',
							'Exam paper writers',
							'Marking experience',
						],
						level: 'All Levels',
						pricing: {
							from: '£150',
							to: '£250',
							currency: 'GBP',
						},
					},
				],
				callOuts: [
					'95% of candidates receive offers from at least one of their top choices',
					'Tutors include former entrance exam markers and interview panellists',
					'Mock exams, real-time feedback and school selection support',
				],
				testimonial:
					"David did extremely well and received offers from Westminster, St Paul's, Sussex House, Kings and Wetherby. Thank you for your help in getting us this far - now for the interviews (his favourite bit)!",
			},
			{
				id: 'university-beyond',
				title: 'UNIVERSITY ADMISSIONS EXAMS & ENGLISH PROFICIENCY TESTS',
				icon: 'GraduationCap',
				description:
					'Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring. University admissions guidance for UK, US, Oxbridge and other global institutions—personal statements, interview prep, admissions tests.',
				popularityRank: 4,
				pricing: {
					basePriceFrom: '£95',
					currency: 'GBP',
				},
				subjects: [
					{
						name: 'UCAS Insight from Elizabeth',
						description:
							"Expert Advice for Standout Applications - Gain insider access to Elizabeth's Essential UCAS Guide — two video masterclasses based on her live seminars at University College London. Learn how to craft a standout personal statement and build a smart UCAS strategy, with rare insights usually reserved for her private clients.",
						keyFeatures: [
							'Video masterclasses',
							'UCL seminar content',
							'Personal statement guidance',
							'UCAS strategy',
						],
						level: 'Year 13+',
						pricing: {
							from: '£120',
							to: '£200',
							currency: 'GBP',
						},
						twoColumnVideoSection: {
							video1: {
								thumbnailUrl: '/videos/ucas-summit-2024-thumbnail.png',
								videoUrl:
									'https://www.youtube.com/embed/IfF9zSzuceY?si=7_tmYovUVVfqLX0D',
								title: 'UCAS Summit 2024',
								alt: 'UCAS Summit 2024 - Elizabeth Burrows shares expert guidance on UCAS applications, personal statements, and university admissions success strategies',
							},
							video2: {
								thumbnailUrl: '/videos/unlocking-academic-success-thumbnail.png',
								videoUrl:
									'https://www.youtube.com/embed/r4Ngy75Z4Zg?si=_mfgyzSJM0BIzXTW',
								title: 'Unlocking Academic Success',
								alt: 'Unlocking Academic Success - Elizabeth Burrows distills 15 years of international education experience into a practical, parent-first guide to implementing and managing private tuition',
							},
						},
					},
					{
						name:
							"Elizabeth's Top 10 Tips for Sculpting an Outstanding Personal Statement",
						description:
							"Elizabeth knows what sets a personal statement apart. Here she distills 15 years of expertise into her Top 10 Tips, helping UCAS applicants defy the odds and secure spots at prestigious universities. These aren't recycled clichés — they're proven techniques you won't find anywhere else.",
						keyFeatures: [
							'15 years expertise',
							'Proven techniques',
							'University-specific insights',
							'Premium guidance',
						],
						level: 'Year 13+',
						pricing: {
							from: '£150',
							to: '£250',
							currency: 'GBP',
						},
					},
					{
						name: 'Subject-Specific University Admissions Tests',
						description:
							'Targeted preparation for high-stakes exams that form a crucial part of university and course-specific admissions. Our experienced tutors offer intensive, focused tuition that sharpens core skills and exam-specific techniques.',
						keyFeatures: [
							'High-stakes exam preparation',
							'Intensive focused tuition',
							'Core skills development',
							'Exam-specific techniques',
						],
						level: 'Year 13+',
						pricing: {
							from: '£120',
							to: '£220',
							currency: 'GBP',
						},
						children: [
							{
								name: 'TMUA',
								description:
									'Test of Mathematics for University Admission - for mathematics-based university courses in the UK including Mathematics, Computer Science, and Engineering degrees.',
								keyFeatures: [
									'Mathematics-based courses',
									'UK university admissions',
									'Computer Science applications',
									'Engineering degree requirements',
								],
								level: 'Year 13+',
								pricing: {
									from: '£130',
									to: '£200',
									currency: 'GBP',
								},
							},
							{
								name: 'LNAT',
								description:
									'National Admissions Test for Law - required for law courses at top UK universities including Oxford, Cambridge, UCL, and other leading institutions.',
								keyFeatures: [
									'Law course applications',
									'Top UK universities',
									'Critical reasoning skills',
									'Essay writing assessment',
								],
								level: 'Year 13+',
								pricing: {
									from: '£140',
									to: '£220',
									currency: 'GBP',
								},
							},
							{
								name: 'SAT/ACT',
								description:
									'Standardised tests used for US university admissions, covering mathematics, English, and reasoning skills essential for American higher education applications.',
								keyFeatures: [
									'US university admissions',
									'Mathematics assessment',
									'English proficiency',
									'Critical reasoning',
								],
								level: 'Year 13+',
								pricing: {
									from: '£120',
									to: '£200',
									currency: 'GBP',
								},
							},
							{
								name: 'BMAT/UCAT',
								description:
									'BioMedical Admissions Test and University Clinical Aptitude Test - required for medical and dental school applications in the UK and internationally.',
								keyFeatures: [
									'Medical school applications',
									'Dental school requirements',
									'Scientific aptitude',
									'Critical thinking skills',
								],
								level: 'Year 13+',
								pricing: {
									from: '£150',
									to: '£220',
									currency: 'GBP',
								},
							},
							{
								name: 'IELTS/TOEFL',
								description:
									'International English Language Testing System and Test of English as a Foreign Language - English proficiency exams required by universities for non-native speakers.',
								keyFeatures: [
									'English proficiency certification',
									'International university requirements',
									'CELTA certified tutors',
									'TEFL qualified instruction',
								],
								level: 'Year 13+',
								pricing: {
									from: '£100',
									to: '£180',
									currency: 'GBP',
								},
							},
							{
								name: 'TSA',
								description:
									'Thinking Skills Assessment for courses at Oxford, Cambridge, and UCL requiring advanced critical thinking and problem-solving abilities.',
								keyFeatures: [
									'Oxford applications',
									'Cambridge requirements',
									'UCL admissions',
									'Critical thinking assessment',
								],
								level: 'Year 13+',
								pricing: {
									from: '£140',
									to: '£200',
									currency: 'GBP',
								},
							},
							{
								name: 'ELAT',
								description:
									'English Literature Admissions Test for Oxford applicants studying English Language and Literature, requiring advanced literary analysis skills.',
								keyFeatures: [
									'Oxford English applications',
									'Literary analysis skills',
									'Close reading techniques',
									'Critical essay writing',
								],
								level: 'Year 13+',
								pricing: {
									from: '£130',
									to: '£190',
									currency: 'GBP',
								},
							},
						],
					},
				],
				callOuts: [
					'Matched with Cambridge and Oxford alumni',
					'Insider insight on how to stand out in Oxbridge applications',
					'Step-by-step support with personal statements, admissions tests and mock interviews',
				],
				testimonial:
					"My tutor had studied at Cambridge and gave me so many practical insights I wouldn't have found anywhere else. I felt prepared, confident—and I got my offer!",
			},
			{
				id: 'online-homeschooling',
				title: 'ONLINE HOMESCHOOLING',
				icon: 'Globe',
				description:
					'Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility.',
				popularityRank: 5,
				pricing: {
					basePriceFrom: '£80',
					currency: 'GBP',
				},
				subjects: [
					{
						name: 'Why Choose Homeschooling with Us',
						description:
							"Private‑School Standard, Delivered Virtually: We deliver bespoke online programmes that rival independent schools in quality.<br><br>Fully Personalised Curriculum & Timetabling: Lessons are crafted around each child's strengths, interests and pace. Consistent Tutor Teams & Academic Continuity: Students benefit from a stable team of expert tutors—subject specialists with years of experience and often examiner credentials.<br><br>Progress Tracking & Motivation-Focused Design: Regular assessments, achievable goals, and work reviewed in real time ensure the programme adapts to each student's growth. Expert Support for SEN Needs: Our SEN-aligned homeschooling incorporates specially tailored pathways for students with dyslexia, ADHD, processing differences or related needs—delivered with empathy and structure.",
						keyFeatures: [
							'Private school standard',
							'Personalised curriculum',
							'Expert tutor teams',
							'Progress tracking',
							'SEN support',
						],
						level: 'Reception-GCSE',
						pricing: {
							from: '£80',
							to: '£160',
							currency: 'GBP',
						},
					},
					{
						name: 'A Unique Pathway for Global & Gifted Learners',
						description:
							'Academic excellence without the need for physical classrooms. Personal schedules built around elite sports, arts commitments or world experiences. A supportive, curated tutor programme that encourages curiosity, autonomy, and confidence.',
						keyFeatures: [
							'Global accessibility',
							'Elite sports compatibility',
							'Arts-focused schedules',
							'Curated tutoring',
						],
						level: 'All Levels',
						pricing: {
							from: '£90',
							to: '£180',
							currency: 'GBP',
						},
					},
					{
						name: 'How We Work',
						description:
							'Individual Onboarding: We begin with a comprehensive academic and interests profile. Goal Setting & Curriculum Design: Tutors build flexible lesson plans aligned with national standards or bespoke learning aims. Structured Delivery: Students engage in live online sessions, maintain daily routines, and receive regular tutoring feedback. Ongoing Review: Progress is tracked, objectives reset, and adjustments made with parental involvement.',
						keyFeatures: [
							'Individual onboarding',
							'Goal setting',
							'Structured delivery',
							'Ongoing review',
						],
						level: 'All Levels',
						pricing: {
							from: '£80',
							to: '£170',
							currency: 'GBP',
						},
					},
					{
						name: 'Why It Works',
						description:
							"Our programmes blend flexible schedules, engaging pedagogy, and specialist expertise to deliver transformative education—regardless of geography. Students develop strong academic habits, enjoy tailored attention, and experience significant progress. If you're considering online homeschooling, our expert-led structure ensures both confidence and credibility every step of the way.",
						keyFeatures: [
							'Flexible schedules',
							'Engaging pedagogy',
							'Specialist expertise',
							'Academic habits',
						],
						level: 'All Levels',
						pricing: {
							from: '£75',
							to: '£150',
							currency: 'GBP',
						},
					},
				],
				callOuts: [
					'Full academic programmes delivered remotely, accommodating your time zone',
					'Curriculum design, teaching, and assessment all included',
				],
				testimonial:
					"We relocated mid-year and chose to homeschool. I couldn't believe how much better the structure, care, and quality of teaching were than my son's old school.",
			},
			{
				id: 'sen-neurodiverse',
				title: 'SEN SUPPORT & NEURODIVERSE LEARNING',
				icon: 'Award',
				description:
					"Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support. Our work is tailored to empower students with dyslexia, dyspraxia, ADHD, autism spectrum conditions, speech or processing differences, and related profiles. We create a focused learning environment where individual strengths are championed and confidence is rebuilt.",
				popularityRank: 6,
				pricing: {
					basePriceFrom: '£100',
					currency: 'GBP',
				},
				subjects: [
					{
						name: 'Individualised Learning',
						description:
							'Tutors conduct detailed assessments to identify strengths, challenges, and personal learning styles.',
						keyFeatures: [
							'Detailed assessments',
							'Strength identification',
							'Learning style analysis',
							'Personal approach',
						],
						level: 'All Ages',
						pricing: {
							from: '£100',
							to: '£170',
							currency: 'GBP',
						},
					},
					{
						name: 'Expert SEN Tutor Teams',
						description:
							'Every student is supported by highly experienced tutors trained in neurodiversity-aware pedagogy.',
						keyFeatures: [
							'Experienced tutors',
							'Neurodiversity training',
							'Specialist knowledge',
							'SEN expertise',
						],
						level: 'All Ages',
						pricing: {
							from: '£110',
							to: '£180',
							currency: 'GBP',
						},
					},
					{
						name: 'Exam Access Advice',
						description:
							'We guide families through exam access arrangements and make recommendations to improve fairness and outcomes.',
						keyFeatures: [
							'Access arrangements',
							'Exam guidance',
							'Fairness improvements',
							'Outcome optimisation',
						],
						level: 'All Ages',
						pricing: {
							from: '£90',
							to: '£150',
							currency: 'GBP',
						},
					},
					{
						name: 'Full Coordination & Professional Oversight',
						description:
							'Our homeschooling clients benefit from a dedicated tutor team, tailored learning schedules, and education consultancy to manage continuity—especially vital for SEN learners and families working across time zones.',
						keyFeatures: [
							'Dedicated tutor teams',
							'Tailored schedules',
							'Education consultancy',
							'Continuity management',
						],
						level: 'All Ages',
						pricing: {
							from: '£120',
							to: '£200',
							currency: 'GBP',
						},
					},
					{
						name: 'Online Homeschooling for SEN & Complex Needs',
						description:
							"<p>Whether families are travelling, transitioning between schools, or prioritising personalised learning, our homeschooling programme delivers full academic support entirely online—without any in-person tutoring.</p><p><strong>Curriculum Built Around the Student:</strong><br>We design bespoke programmes around each child's strengths, interests, and pace—seamlessly blending academics with creative and practical learning.</p><p><strong>Holistic Academic & Emotional Support:</strong><br>We understand daily routines and tutor consistency are especially important for SEN learners. Our tutees are supported by program management and ongoing progress reviews to nurture both academic growth and personal well-being.</p><p><strong>Why It Works:</strong><br>Both SEN tutoring and full-online homeschooling emphasise individual strength, flexible pacing, and sustained mentorship. This approach enables students to flourish academically while nurturing autonomy, individualism, and confidence—delivered through expert-led, evidence-based practice.</p>",
						keyFeatures: [
							'Bespoke programmes',
							'Holistic support',
							'Routine consistency',
							'Evidence-based practice',
						],
						level: 'All Ages',
						pricing: {
							from: '£100',
							to: '£180',
							currency: 'GBP',
						},
					},
				],
				callOuts: [
					'Specialist tutors trained in dyslexia, ADHD, and autism support strategies',
					'Multi-sensory teaching approaches and assistive technology integration',
					'Individual learning profiles and tailored assessment accommodations',
				],
				testimonial:
					'After years of struggle, my son finally found his confidence. The tutors understood his dyslexia completely and adapted everything to his learning style. His grades improved dramatically, but more importantly, he enjoys learning again.',
			},
			{
				id: 'london-in-person',
				title: 'LONDON IN‑PERSON TUTORING',
				icon: 'Users',
				description:
					'In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability.',
				popularityRank: 7,
				pricing: {
					basePriceFrom: '£120',
					currency: 'GBP',
				},
				subjects: [
					{
						name: 'DBS-Checked Specialist Tutors',
						description:
							'Sessions delivered by DBS-checked, specialist tutors with experience of the London independent and state school sectors.',
						keyFeatures: [
							'DBS-checked tutors',
							'Specialist expertise',
							'London school experience',
							'Independent sector knowledge',
						],
						level: 'All Levels',
						pricing: {
							from: '£120',
							to: '£300',
							currency: 'GBP',
						},
					},
					{
						name: 'Entrance Exam & Subject-Specific Support',
						description:
							'Ideal for entrance exam preparation, subject-specific tuition, or ongoing academic support.',
						keyFeatures: [
							'Entrance exam prep',
							'Subject specialisation',
							'Ongoing support',
							'Academic excellence',
						],
						level: 'All Levels',
						pricing: {
							from: '£140',
							to: '£320',
							currency: 'GBP',
						},
					},
					{
						name: 'Continuity & Trust',
						description:
							'We prioritise continuity—families typically work with the same tutor throughout for consistency and trust.',
						keyFeatures: [
							'Same tutor continuity',
							'Trust building',
							'Consistency',
							'Long-term relationships',
						],
						level: 'All Levels',
						pricing: {
							from: '£130',
							to: '£290',
							currency: 'GBP',
						},
					},
					{
						name: 'Limited Availability & Best Matching',
						description:
							'In-person availability is limited and arranged on a case-by-case basis to ensure the best possible match.',
						keyFeatures: [
							'Limited availability',
							'Case-by-case basis',
							'Best matching',
							'Quality over quantity',
						],
						level: 'All Levels',
						pricing: {
							from: '£150',
							to: '£350',
							currency: 'GBP',
						},
					},
				],
				callOuts: [
					'Face-to-face lessons in your home',
					'Tutors familiar with the London school landscape',
					'Consistent, high-calibre tutors matched carefully to each family',
				],
				testimonial:
					'Having the tutor come to our home made such a difference. My daughter felt comfortable in her own environment, and the tutor quickly understood her learning style. The convenience and quality were exceptional.',
			},
		],
		homeschoolingPreview: {
			title: 'Interested in Homeschooling?',
			description: 'Discover our comprehensive online homeschooling programmes',
			features: [
				{
					text: 'Complete curriculum coverage',
				},
				{
					text: 'Flexible scheduling options',
				},
				{
					text: 'Expert educational guidance',
				},
				{
					text: 'Parent support and training',
				},
			],
			buttonText: 'Learn About Homeschooling',
		},
		cta: {
			title: 'Ready to Start the Conversation?',
			description:
				'Book a free consultation to discuss your educational needs and find the perfect subject tuition for your goals.',
			primaryButton: {
				text: 'Request Free Consultation',
				action: 'consultation',
			},
			secondaryButton: {
				text: 'View All Subjects',
				action: 'subjects',
			},
		},
		sectionTitles: {
			subjectCategories: {
				title: 'Comprehensive Subject Coverage',
				description:
					'Our tutors are examiners, school teachers, and subject specialists who are not only experienced educators but also motivating mentors. Whether your child is preparing for a school entrance exam, navigating GCSEs/A-levels, or applying to top universities in the UK, we guide each family with clarity, care, and expert insight at every stage of their educational journey.',
			},
		},
	};
});
const getServicesStatistics = cache(
	(): readonly ServiceStatisticItem[] => {
		return getServicesContent().statistics;
	},
);
const getServicesSubjectCategories = cache(
	(): readonly ServiceSubjectCategory[] => {
		return getServicesContent().subjectCategories;
	},
);
const getServicesHero = (): {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly backgroundImage?: string;
} => {
	return getServicesContent().hero;
};
const getHomeschoolingPreview = (): {
	readonly title: string;
	readonly description: string;
	readonly features: readonly {
		readonly text: string;
	}[];
	readonly buttonText: string;
	readonly icon?: string;
} => {
	return getServicesContent().homeschoolingPreview;
};
const getServicesCTA = (): {
	readonly title: string;
	readonly description: string;
	readonly primaryButton: {
		readonly text: string;
		readonly action: string;
	};
	readonly secondaryButton: {
		readonly text: string;
		readonly action: string;
	};
} => {
	return getServicesContent().cta;
};
const getServicesSectionTitles = (): {
	readonly subjectCategories: {
		readonly title: string;
		readonly description: string;
	};
} => {
	return getServicesContent().sectionTitles;
};
const getQuoteFormContent = (): QuoteFormContent => {
	return {
		hero: {
			title: 'Request Your Personalised Quote',
			subtitle: "Begin Your Child's Academic Excellence Journey",
			description:
				"Complete our comprehensive form to receive a bespoke tutoring proposal tailored to your child's educational needs.",
		},
		form: {
			title: 'Tell Us About Your Requirements',
			description:
				"Please provide detailed information about your child's educational needs.",
			sections: [],
			submitButton: {
				text: 'Request Personalised Quote',
				loadingText: 'Submitting Your Request...',
			},
		},
		messages: {
			success: {
				title: 'Quote Request Submitted Successfully',
				message: 'Thank you for your enquiry. We will respond within 24 hours.',
			},
			error: {
				title: 'Submission Error',
				message: 'Please try again or contact us directly.',
			},
			validation: {
				required: 'This field is required',
				email: 'Please enter a valid email address',
				phone: 'Please enter a valid telephone number',
			},
		},
		contact: {
			title: 'Need Immediate Assistance?',
			description: 'For urgent enquiries, please contact us directly.',
			phone: '+44 7513 550278',
			email: 'info@myprivatetutoronline.com',
		},
	};
};
const getQuoteFormHero = () => {
	return getQuoteFormContent().hero;
};
const getQuoteFormConfig = () => {
	return getQuoteFormContent().form;
};
const getQuoteFormMessages = (): QuoteFormMessages => {
	return getQuoteFormContent().messages;
};
const getQuoteFormContact = () => {
	return getQuoteFormContent().contact;
};
const getFormFieldOptions = (fieldId: string): QuoteFormOption[] => {
	const form = getQuoteFormContent().form;
	for (const section of form.sections) {
		const field = section.fields.find((f) => f.id === fieldId);
		if (field && field.options) {
			return field.options;
		}
	}
	return [];
};
const getSubjectOptions = (): QuoteFormOption[] => {
	return getFormFieldOptions('subject');
};
const getEducationLevelOptions = (): QuoteFormOption[] => {
	return getFormFieldOptions('educationLevel');
};
const getHowDidYouHearOptions = (): readonly QuoteFormOption[] => {
	return getFormFieldOptions('howDidYouHear');
};
const getCTAContent = cache((): CTASection => {
	return landingPageContent.cta;
});
export const getTestimonialsCTAContent = (): {
	readonly variants: {
		readonly consultation: {
			readonly title: string;
			readonly description: string;
			readonly primaryButton: string;
			readonly secondaryButton: string;
			readonly trackingEvent: string;
		};
		readonly trial: {
			readonly title: string;
			readonly description: string;
			readonly primaryButton: string;
			readonly secondaryButton: string;
			readonly trackingEvent: string;
		};
		readonly assessment: {
			readonly title: string;
			readonly description: string;
			readonly primaryButton: string;
			readonly secondaryButton: string;
			readonly trackingEvent: string;
		};
		readonly callback: {
			readonly title: string;
			readonly description: string;
			readonly primaryButton: string;
			readonly secondaryButton: string;
			readonly trackingEvent: string;
		};
	};
	readonly socialProof: {
		readonly totalFamilies: number;
		readonly successRate: string;
		readonly averageImprovement: string;
		readonly testimonialCount: number;
		readonly recentPlacements: readonly string[];
		readonly recentSuccesses: readonly string[];
	};
	readonly urgencyOptions: {
		readonly limited: string;
		readonly seasonal: string;
		readonly exclusive: string;
	};
	readonly backgroundVariants: {
		readonly dark: string;
		readonly gradient: string;
		readonly royal: string;
		readonly seasonal: string;
	};
} => {
	const testimonials = getRecentTestimonials();
	const heroContent = getTestimonialsHero();
	return {
		variants: {
			consultation: {
				title: 'Join Hundreds of Successful Families',
				description:
					"Experience the difference that personalised, expert tutoring can make to your child's academic journey. Your success story could be next.",
				primaryButton: 'Request a Consultation',
				secondaryButton: 'Learn How It Works',
				trackingEvent: 'testimonials_cta_consultation',
			},
			trial: {
				title: 'Experience Excellence Risk-Free',
				description:
					"Start with a complimentary trial lesson and discover why elite families trust us with their children's academic success.",
				primaryButton: 'Book Free Trial Lesson',
				secondaryButton: 'View Success Stories',
				trackingEvent: 'testimonials_cta_trial',
			},
			assessment: {
				title: "Unlock Your Child's Academic Potential",
				description:
					'Our comprehensive educational assessment identifies strengths and creates a personalised pathway to academic excellence.',
				primaryButton: 'Book Assessment',
				secondaryButton: 'Learn About Our Process',
				trackingEvent: 'testimonials_cta_assessment',
			},
			callback: {
				title: 'Speak Directly with Our Education Experts',
				description:
					"Get personalised guidance from our team of education specialists. We'll discuss your child's needs and create a tailored success plan.",
				primaryButton: 'Request Callback',
				secondaryButton: 'Schedule a Call',
				trackingEvent: 'testimonials_cta_callback',
			},
		},
		socialProof: {
			totalFamilies: 2847,
			successRate: '97%',
			averageImprovement: '2.3 grades',
			testimonialCount: testimonials.length,
			recentPlacements: [
				'Cambridge Mathematics Admission',
				'Eton College Entry Success',
				'Oxford Classics Scholarship',
				'Imperial Engineering Offer',
				'LSE Economics Acceptance',
				"St Paul's School 11+ Success",
			],
			recentSuccesses: [
				'A* achieved in Mathematics GCSE',
				'11+ success at Westminster School',
				'Oxbridge interview preparation completed',
				'A-Level grade improvement from C to A*',
			],
		},
		urgencyOptions: {
			limited: 'Limited consultation slots available this month',
			seasonal: 'September 2025 preparation places filling fast',
			exclusive: 'Royal endorsement - Elite families only',
		},
		backgroundVariants: {
			dark: 'bg-primary-900',
			gradient:
				'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900',
			royal: 'bg-gradient-to-br from-primary-900 via-purple-900 to-primary-900',
			seasonal: 'bg-gradient-to-br from-primary-900 via-accent-900 to-primary-800',
		},
	};
};
const getFormContent = (): FormContent => {
	return formContent;
};
export const getNewsletterFormContent = (): NewsletterFormContent => {
	return formContent.newsletter;
};
const getConsultationFormContent = (): ConsultationFormContent => {
	return formContent.consultation;
};
const getCommonFormContent = (): CommonFormContent => {
	return formContent.common;
};
const getFooterFormContent = (): FooterFormContent => {
	return formContent.footer;
};
const getBusinessAnalyticsData = cache((): BusinessAnalyticsData => {
	return businessAnalyticsContent;
});
const getResultsDocumentation = cache(
	(): readonly ResultsDocumentationItem[] => {
		return businessAnalyticsContent.resultsDocumentation;
	},
);
const getCaseStudies = cache((): readonly CaseStudyItem[] => {
	return businessAnalyticsContent.caseStudies;
});
const getCompetitiveAnalysis = cache(
	(): readonly CompetitiveAnalysisData[] => {
		return businessAnalyticsContent.competitiveAnalysis;
	},
);
const getROICalculations = cache((): readonly ROICalculationData[] => {
	return businessAnalyticsContent.roiCalculations;
});
const CMSContent = {
	getSiteHeader,
	getHeroContent,
	getTrustIndicators,
	getStudentJourney,
	getTestimonials,
	getAllTestimonials,
	getVideoTestimonials,
	getTextTestimonials,
	getServices,
	getResultsStatistics,
	getUnifiedContact,
	getContactContent,
	getFooterContent,
	getBusinessContent,
	getAboutContent,
	getMainNavigation,
	getSiteBranding,
	getContactInfo,
	getHowItWorksContent,
	getHowItWorksHero,
	getHowItWorksSteps,
	getTutorTiers,
	getHowItWorksBenefits,
	getHowItWorksCTA,
	getFAQContent,
	getFAQHero,
	getFAQCategories,
	getFAQSearchConfig,
	getFAQAnalytics,
	getFAQSettings,
	getFAQQuestionsByCategory,
	getFeaturedFAQs,
	getTrendingFAQs,
	getFAQsByClientSegment,
	getFAQsByDifficulty,
	getFAQQuestionById,
	getRelatedFAQs,
	getMostHelpfulFAQs,
	getFAQContact,
	getSiteConfig,
	getContactDetails,
	getBusinessDetails,
	getBusinessInfo,
	getDetailedTestimonialVideos,
	getPricingInfo,
	getQualifications,
	formatBritishEnglish,
	getCopyrightText,
	validateContentStructure,
	getTestimonialsContent,
	getTestimonialsHero,
	getTestimonialsIntroConfig,
	getRecentTestimonials,
	getAboutTestimonials,
	getTestimonialsSchools,
	getFounderStory,
	getFounderAchievements,
	getCompanyTimeline,
	getQuotes,
	getFounderQuote,
	getRoyalTestimonial,
	getQuoteFormContent,
	getQuoteFormHero,
	getQuoteFormConfig,
	getQuoteFormMessages,
	getQuoteFormContact,
	getFormFieldOptions,
	getSubjectOptions,
	getEducationLevelOptions,
	getHowDidYouHearOptions,
	getCTAContent,
	getTestimonialsCTAContent,
	getFormContent,
	getNewsletterFormContent,
	getConsultationFormContent,
	getCommonFormContent,
	getFooterFormContent,
	getServicesContent,
	getServicesStatistics,
	getServicesSubjectCategories,
	getServicesHero,
	getHomeschoolingPreview,
	getServicesCTA,
	getServicesSectionTitles,
	getBusinessAnalyticsData,
	getResultsDocumentation,
	getCaseStudies,
	getCompetitiveAnalysis,
	getROICalculations,
	searchFAQQuestions,
	getFAQSearchSuggestions,
	calculateHelpfulnessRatio,
	getFAQsSortedByRelevance,
	getFAQCategoryAnalytics,
	validateFAQDataStructure,
};
const getResultsByCategory = cache(
	(
		category: ResultsDocumentationItem['category'],
	): readonly ResultsDocumentationItem[] => {
		return businessAnalyticsContent.resultsDocumentation.filter(
			(item) => item.category === category,
		);
	},
);
const getCaseStudiesBySegment = cache(
	(segment: CaseStudyItem['category']): readonly CaseStudyItem[] => {
		return businessAnalyticsContent.caseStudies.filter(
			(study) => study.category === segment,
		);
	},
);
const getFeaturedCaseStudies = cache((): readonly CaseStudyItem[] => {
	return businessAnalyticsContent.caseStudies.filter((study) => study.featured);
});
const getCompetitiveAdvantagesBySegment = cache(
	(
		segment: CompetitiveAnalysisData['clientSegment'],
	): readonly CompetitiveAnalysisData[] => {
		return businessAnalyticsContent.competitiveAnalysis.filter(
			(item) => item.clientSegment === segment || item.clientSegment === 'all',
		);
	},
);
const getPricingConfig = cache((): PricingInfo => {
	const siteSettings = getSiteSettings();
	return siteSettings.pricing as PricingInfo;
});
const getTierPricing = cache(
	(tierKey: 'tier1' | 'tier2' | 'tier3'): TierPricingInfo => {
		const siteSettings = getSiteSettings();
		const pricing = siteSettings.pricing as PricingInfo;
		return pricing.tiers[tierKey];
	},
);
const getBaseRate = cache(
	(): {
		amount: number;
		display: string;
		unit: string;
	} => {
		const siteSettings = getSiteSettings();
		const pricing = siteSettings.pricing as PricingInfo;
		return pricing.baseRate;
	},
);
const getTiersInOrder = cache((): readonly TierPricingInfo[] => {
	const siteSettings = getSiteSettings();
	const pricing = siteSettings.pricing as PricingInfo;
	return [pricing.tiers.tier3, pricing.tiers.tier2, pricing.tiers.tier1];
});
const getPromotionalPricing = cache(
	(): {
		tagline: string;
		feeDisclaimer: string;
	} => {
		const siteSettings = getSiteSettings();
		const pricing = siteSettings.pricing as PricingInfo;
		return pricing.promotional;
	},
);
const getCreditBalance = cache(
	(): {
		amount: number;
		display: string;
		description: string;
	} => {
		const siteSettings = getSiteSettings();
		const pricing = siteSettings.pricing as PricingInfo;
		return pricing.creditBalance;
	},
);
const getTierByLevel = cache(
	(level: 'premium' | 'mid' | 'standard'): TierPricingInfo | undefined => {
		const siteSettings = getSiteSettings();
		const pricing = siteSettings.pricing as PricingInfo;
		const tierEntries = Object.values(pricing.tiers);
		return tierEntries.find((tier) => tier.level === level);
	},
);
const formatPriceDisplay = cache(
	(amount: number, includeFrom: boolean = false): string => {
		const formatted = `£${amount}`;
		return includeFrom ? `From ${formatted}/hour` : formatted;
	},
);
const getTutorProfilesSection = cache((): TutorProfilesSection => {
	const newData =
		tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;
	const profilesArray = Object.values(newData.profiles);
	return {
		title: newData.title,
		subtitle: newData.subtitle,
		description: newData.description,
		profiles: profilesArray,
		showAllButton: newData.showAllButton,
		backgroundStyle: newData.backgroundStyle,
	};
});
const getTutorProfilesSectionWithDynamicContent = cache(
	(): TutorProfilesSection => {
		const { hasTutorImage } = require('./cms-images');
		const baseSection = getTutorProfilesSection();
		const profilesWithPhotos = baseSection.profiles.filter((profile) =>
			hasTutorImage(profile.id),
		);
		const photoCount = profilesWithPhotos.length;
		return {
			...baseSection,
			title: 'Meet a snapshot of our expert tutors',
			description:
				"Here's a curated cross-section of our team to give you a sense of the calibre and diversity of educators available across each of our tutoring tiers. While this is just a glimpse, our full team spans every age and academic stage—from Year 1 phonics to postgraduate-level Astrophysics. If you don't see exactly what you're looking for here, rest assured we have the right expert behind the scenes, ready to support your child's learning journey. To begin, simply complete our short enquiry form, and a member of our team will be in touch to start the conversation.",
			showAllButton: {
				...baseSection.showAllButton,
				text: `View All ${photoCount} Expert Tutors`,
			},
		};
	},
);
const getTutorProfiles = cache((): readonly TutorProfile[] => {
	const newData =
		tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;
	return Object.values(newData.profiles) || [];
});
const getFeaturedTutorProfiles = cache((): readonly TutorProfile[] => {
	const newData =
		tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;
	return (
		Object.values(newData.profiles).filter(
			(profile: TutorProfile) => profile.featured,
		) || []
	);
});
const getTutorProfileById = cache(
	(id: string): TutorProfile | undefined => {
		const newData =
			tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;
		return newData.profiles[id];
	},
);
export { getTestimonialVideos };
