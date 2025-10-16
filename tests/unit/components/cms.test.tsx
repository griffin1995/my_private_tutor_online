import { describe, test, expect, beforeEach } from '@jest/globals';
import {
	getSiteHeader,
	getHeroContent,
	getTrustIndicators,
	getTestimonials,
	getServices,
	validateContentStructure,
	formatBritishEnglish,
	getCopyrightText,
} from '@/lib/cms/cms-content';

import {
	getMainLogo,
	getFooterLogo,
	getHeroImage,
	validateImageAccessibility,
	getOptimizedImageProps,
} from '@/lib/cms/cms-images';

// CMS unit tests to ensure content management system works correctly
describe('CMS Content Management', () => {
	describe('Content Retrieval', () => {
		test('getSiteHeader returns valid header data', () => {
			const header = getSiteHeader();

			expect(header).toBeDefined();
			expect(header.siteName).toBe('My Private Tutor Online');
			expect(header.logo).toBeDefined();
			expect(header.logo.main).toContain('/uploads/logo.png');
			expect(header.navigation).toBeInstanceOf(Array);
			expect(header.navigation.length).toBeGreaterThan(0);
		});

		test('getHeroContent returns valid hero data', () => {
			const hero = getHeroContent();

			expect(hero).toBeDefined();
			expect(hero.title).toBeDefined();
			expect(hero.description).toBeDefined();
			expect(hero.primaryButtonText).toBeDefined();
			expect(hero.secondaryButtonText).toBeDefined();
			expect(typeof hero.title).toBe('string');
			expect(hero.title.length).toBeGreaterThan(0);
		});

		test('getTrustIndicators returns valid trust indicators', () => {
			const indicators = getTrustIndicators();

			expect(indicators).toBeInstanceOf(Array);
			expect(indicators.length).toBe(3);

			indicators.forEach((indicator) => {
				expect(indicator.icon).toBeDefined();
				expect(indicator.title).toBeDefined();
				expect(indicator.description).toBeDefined();
				expect(typeof indicator.title).toBe('string');
				expect(typeof indicator.description).toBe('string');
			});
		});

		test('getTestimonials returns valid testimonial data', () => {
			const testimonials = getTestimonials();

			expect(testimonials).toBeInstanceOf(Array);
			expect(testimonials.length).toBeGreaterThan(0);

			testimonials.forEach((testimonial) => {
				expect(testimonial.quote).toBeDefined();
				expect(testimonial.author).toBeDefined();
				expect(testimonial.role).toBeDefined();
				expect(testimonial.rating).toBeDefined();
				expect(typeof testimonial.quote).toBe('string');
				expect(typeof testimonial.author).toBe('string');
				expect(typeof testimonial.rating).toBe('number');
				expect(testimonial.rating).toBeGreaterThanOrEqual(1);
				expect(testimonial.rating).toBeLessThanOrEqual(5);
			});
		});

		test('getServices returns valid service data', () => {
			const services = getServices();

			expect(services).toBeInstanceOf(Array);
			expect(services.length).toBeGreaterThan(0);

			services.forEach((service) => {
				expect(service.title).toBeDefined();
				expect(service.description).toBeDefined();
				expect(service.icon).toBeDefined();
				expect(service.features).toBeInstanceOf(Array);
				expect(service.ctaText).toBeDefined();
				expect(service.ctaLink).toBeDefined();

				service.features.forEach((feature) => {
					expect(feature.feature).toBeDefined();
					expect(typeof feature.feature).toBe('string');
				});
			});
		});
	});

	describe('Content Validation', () => {
		test('validateContentStructure returns true for valid content', () => {
			const isValid = validateContentStructure();
			expect(isValid).toBe(true);
		});

		test('formatBritishEnglish converts American to British spelling', () => {
			const americanText = 'We organize colorful activities at our center';
			const britishText = formatBritishEnglish(americanText);

			expect(britishText).toBe('We organise colourful activities at our centre');
		});

		test('getCopyrightText returns current year', () => {
			const copyright = getCopyrightText();
			const currentYear = new Date().getFullYear();

			expect(copyright).toContain(currentYear.toString());
			expect(copyright).toContain('My Private Tutor Online');
			expect(copyright).toContain('All rights reserved');
		});
	});

	describe('CMS Image Management', () => {
		test('getMainLogo returns valid logo data', () => {
			const logo = getMainLogo();

			expect(logo).toBeDefined();
			expect(logo.src).toBeDefined();
			expect(logo.alt).toBeDefined();
			expect(logo.width).toBeDefined();
			expect(logo.height).toBeDefined();
			expect(typeof logo.width).toBe('number');
			expect(typeof logo.height).toBe('number');
			expect(logo.priority).toBe(true);
		});

		test('getFooterLogo returns valid footer logo', () => {
			const logo = getFooterLogo();

			expect(logo).toBeDefined();
			expect(logo.src).toBeDefined();
			expect(logo.alt).toBeDefined();
			expect(logo.loading).toBe('lazy');
		});

		test('getHeroImage returns valid hero image', () => {
			const heroImage = getHeroImage();

			expect(heroImage).toBeDefined();
			expect(heroImage.src).toBeDefined();
			expect(heroImage.alt).toBeDefined();
			expect(heroImage.priority).toBe(true);
			expect(heroImage.loading).toBe('eager');
		});

		test('validateImageAccessibility correctly validates alt text', () => {
			// Valid alt text
			expect(
				validateImageAccessibility(
					'Child studying with laptop for online tutoring',
					'/images/hero/child-studying.jpg',
				),
			).toBe(true);

			// Invalid - empty alt text
			expect(validateImageAccessibility('', '/images/test.jpg')).toBe(false);

			// Invalid - filename as alt text
			expect(validateImageAccessibility('test.jpg', '/images/test.jpg')).toBe(
				false,
			);

			// Invalid - generic alt text
			expect(validateImageAccessibility('image', '/images/test.jpg')).toBe(false);
		});

		test('getOptimizedImageProps returns Next.js Image props', () => {
			const heroImage = getHeroImage();
			const props = getOptimizedImageProps(heroImage);

			expect(props.src).toBe(heroImage.src);
			expect(props.alt).toBe(heroImage.alt);
			expect(props.width).toBe(heroImage.width);
			expect(props.height).toBe(heroImage.height);
			expect(props.priority).toBe(heroImage.priority);
			expect(props.sizes).toBeDefined();
		});
	});

	describe('Error Handling', () => {
		test('gracefully handles missing content files', () => {
			// These functions should not throw even if content files are missing
			expect(() => {
				const business = require('@/lib/cms/cms-content').getBusinessContent();
				expect(business).toBeDefined();
			}).not.toThrow();

			expect(() => {
				const about = require('@/lib/cms/cms-content').getAboutContent();
				expect(about).toBeDefined();
			}).not.toThrow();
		});
	});
});
