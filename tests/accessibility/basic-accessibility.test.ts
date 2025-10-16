// CONTEXT7 SOURCE: /dequelabs/axe-core - Basic accessibility testing for WCAG 2.1 AA compliance
// TESTING REASON: Essential accessibility testing for royal client standards and legal compliance

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axe from 'axe-core';

// CONTEXT7 SOURCE: /dequelabs/axe-core - Custom axe matcher for Jest integration
expect.extend({
	async toHaveNoAccessibilityViolations(received: Element) {
		const results = await axe.run(received, {
			// CONTEXT7 SOURCE: /dequelabs/axe-core - WCAG 2.1 AA compliance configuration
			tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
			rules: {
				// Enable additional accessibility checks for premium service standards
				'color-contrast': { enabled: true },
				'landmark-one-main': { enabled: true },
				'page-has-heading-one': { enabled: true },
				region: { enabled: true },
			},
		});

		const pass = results.violations.length === 0;

		return {
			pass,
			message: () => {
				if (pass) {
					return 'Expected accessibility violations but found none';
				}

				const violationMessages = results.violations
					.map((violation) => {
						const nodeTargets = violation.nodes
							.map((node) => node.target.join(' '))
							.join(', ');

						return `${violation.id} (${violation.impact}): ${violation.description}
            Help: ${violation.help}
            Elements: ${nodeTargets}`;
					})
					.join('\n\n');

				return `Expected no accessibility violations but found ${results.violations.length}:

${violationMessages}`;
			},
		};
	},
});

// Extend Jest expect interface
declare global {
	namespace jest {
		interface Matchers<R> {
			toHaveNoAccessibilityViolations(): R;
		}
	}
}

describe('Basic Accessibility Compliance - WCAG 2.1 AA', () => {
	describe('HTML Structure Accessibility', () => {
		it('validates basic semantic HTML structure', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement(
						'header',
						{ role: 'banner' },
						React.createElement('h1', {}, 'My Private Tutor Online'),
						React.createElement(
							'nav',
							{ role: 'navigation' },
							React.createElement(
								'ul',
								{},
								React.createElement(
									'li',
									{},
									React.createElement('a', { href: '/about' }, 'About Us'),
								),
								React.createElement(
									'li',
									{},
									React.createElement('a', { href: '/services' }, 'Services'),
								),
							),
						),
					),
					React.createElement(
						'main',
						{ role: 'main' },
						React.createElement(
							'section',
							{},
							React.createElement('h2', {}, 'Premium Tutoring Services'),
							React.createElement('p', {}, 'Excellence in education since 2010'),
						),
					),
					React.createElement(
						'footer',
						{ role: 'contentinfo' },
						React.createElement('p', {}, '© 2025 My Private Tutor Online'),
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Basic HTML structure validation
			await expect(container).toHaveNoAccessibilityViolations();
		});

		it('validates form accessibility patterns', async () => {
			const { container } = render(
				React.createElement(
					'form',
					{ role: 'form', 'aria-label': 'Contact Form' },
					React.createElement(
						'div',
						{},
						React.createElement('label', { htmlFor: 'email' }, 'Email Address'),
						React.createElement('input', {
							type: 'email',
							id: 'email',
							name: 'email',
							required: true,
							'aria-describedby': 'email-help',
						}),
						React.createElement(
							'small',
							{ id: 'email-help' },
							"We'll never share your email",
						),
					),
					React.createElement(
						'div',
						{},
						React.createElement('label', { htmlFor: 'message' }, 'Message'),
						React.createElement('textarea', {
							id: 'message',
							name: 'message',
							required: true,
							'aria-describedby': 'message-help',
						}),
						React.createElement(
							'small',
							{ id: 'message-help' },
							'Please provide your enquiry details',
						),
					),
					React.createElement('button', { type: 'submit' }, 'Submit Enquiry'),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Form accessibility validation patterns
			await expect(container).toHaveNoAccessibilityViolations();
		});

		it('validates heading hierarchy', async () => {
			const { container } = render(
				React.createElement(
					'article',
					{},
					React.createElement('h1', {}, 'Main Page Title'),
					React.createElement(
						'section',
						{},
						React.createElement('h2', {}, 'Section Title'),
						React.createElement('h3', {}, 'Subsection Title'),
						React.createElement('p', {}, 'Content goes here'),
					),
					React.createElement(
						'section',
						{},
						React.createElement('h2', {}, 'Another Section'),
						React.createElement('p', {}, 'More content'),
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Heading hierarchy validation
			await expect(container).toHaveNoAccessibilityViolations();
		});

		it('validates image accessibility', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement('img', {
						src: '/logo.png',
						alt: 'My Private Tutor Online - Premium Tutoring Services',
						width: '200',
						height: '60',
					}),
					React.createElement(
						'figure',
						{},
						React.createElement('img', {
							src: '/testimonial.jpg',
							alt: 'Client testimonial - Lady Catherine Windsor',
							width: '300',
							height: '200',
						}),
						React.createElement(
							'figcaption',
							{},
							'Testimonial from Lady Catherine Windsor about our exceptional tutoring service',
						),
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Image accessibility validation
			await expect(container).toHaveNoAccessibilityViolations();
		});

		it('validates button accessibility', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement(
						'button',
						{
							type: 'button',
							'aria-label': 'Open navigation menu',
						},
						'☰',
					),
					React.createElement(
						'button',
						{
							type: 'submit',
							disabled: true,
							'aria-describedby': 'submit-help',
						},
						'Submit Form',
					),
					React.createElement(
						'p',
						{ id: 'submit-help' },
						'Please complete all required fields before submitting',
					),
					React.createElement(
						'a',
						{
							href: '/contact',
							role: 'button',
							'aria-label': 'Contact us for premium tutoring',
						},
						'Get Started',
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Button and interactive element validation
			await expect(container).toHaveNoAccessibilityViolations();
		});

		it('validates list accessibility', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement(
						'ul',
						{ 'aria-label': 'Main navigation' },
						React.createElement(
							'li',
							{},
							React.createElement('a', { href: '/about' }, 'About Us'),
						),
						React.createElement(
							'li',
							{},
							React.createElement('a', { href: '/services' }, 'Our Services'),
						),
						React.createElement(
							'li',
							{},
							React.createElement(
								'a',
								{ href: '/testimonials' },
								'Client Testimonials',
							),
						),
					),
					React.createElement(
						'ol',
						{ 'aria-label': 'Steps to book consultation' },
						React.createElement('li', {}, 'Complete our enquiry form'),
						React.createElement('li', {}, 'Receive personalised tutor matching'),
						React.createElement('li', {}, 'Begin your premium tutoring journey'),
					),
					React.createElement(
						'dl',
						{},
						React.createElement('dt', {}, 'GCSE Preparation'),
						React.createElement(
							'dd',
							{},
							'Comprehensive support for GCSE examinations across all subjects',
						),
						React.createElement('dt', {}, 'A-Level Tutoring'),
						React.createElement(
							'dd',
							{},
							'Expert guidance for A-Level success and university preparation',
						),
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - List structure validation
			await expect(container).toHaveNoAccessibilityViolations();
		});

		it('validates keyboard navigation support', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement('a', { href: '/home', tabIndex: 0 }, 'Home'),
					React.createElement(
						'button',
						{
							type: 'button',
							tabIndex: 0,
							onKeyDown: () => {},
						},
						'Interactive Button',
					),
					React.createElement('label', { htmlFor: 'search-input' }, 'Search'),
					React.createElement('input', {
						type: 'text',
						id: 'search-input',
						tabIndex: 0,
						'aria-label': 'Search input',
					}),
					React.createElement('label', { htmlFor: 'subject-select' }, 'Subject'),
					React.createElement(
						'select',
						{
							id: 'subject-select',
							tabIndex: 0,
							'aria-label': 'Select subject',
						},
						React.createElement('option', { value: '' }, 'Choose option'),
						React.createElement('option', { value: 'gcse' }, 'GCSE'),
						React.createElement('option', { value: 'alevel' }, 'A-Level'),
					),
					React.createElement(
						'div',
						{
							role: 'button',
							tabIndex: 0,
							'aria-label': 'Custom interactive element',
							onKeyDown: () => {},
							onClick: () => {},
						},
						'Custom Button',
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Keyboard navigation validation
			await expect(container).toHaveNoAccessibilityViolations();
		});
	});

	describe('Color Contrast and Visual Accessibility', () => {
		it('validates sufficient color contrast', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement(
						'p',
						{
							style: { color: '#000000', backgroundColor: '#ffffff' },
						},
						'High contrast text for excellent readability',
					),
					React.createElement(
						'button',
						{
							style: {
								color: '#ffffff',
								backgroundColor: '#0f172a',
								border: 'none',
								padding: '8px 16px',
							},
						},
						'High Contrast Button',
					),
					React.createElement(
						'a',
						{
							href: '/contact',
							style: {
								color: '#1d4ed8',
								textDecoration: 'underline',
							},
						},
						'Accessible Link',
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Color contrast validation
			await expect(container).toHaveNoAccessibilityViolations();
		});
	});

	describe('ARIA and Screen Reader Support', () => {
		it('validates ARIA landmarks and labels', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement(
						'header',
						{
							role: 'banner',
							'aria-label': 'Site header',
						},
						React.createElement('h1', {}, 'Premium Tutoring'),
					),
					React.createElement(
						'nav',
						{
							role: 'navigation',
							'aria-label': 'Main navigation',
						},
						React.createElement(
							'ul',
							{},
							React.createElement(
								'li',
								{},
								React.createElement(
									'a',
									{ href: '/services', 'aria-current': 'page' },
									'Services',
								),
							),
							React.createElement(
								'li',
								{},
								React.createElement('a', { href: '/about' }, 'About'),
							),
						),
					),
					React.createElement(
						'main',
						{
							role: 'main',
							'aria-label': 'Main content',
						},
						React.createElement(
							'section',
							{ 'aria-labelledby': 'services-heading' },
							React.createElement('h2', { id: 'services-heading' }, 'Our Services'),
							React.createElement('p', {}, 'Premium tutoring for discerning families'),
						),
					),
					React.createElement(
						'aside',
						{
							role: 'complementary',
							'aria-label': 'Client testimonials',
						},
						React.createElement('h3', {}, 'What Our Clients Say'),
						React.createElement(
							'blockquote',
							{},
							React.createElement('p', {}, 'Exceptional service'),
							React.createElement('cite', {}, 'Lady Catherine Windsor'),
						),
					),
					React.createElement(
						'footer',
						{
							role: 'contentinfo',
							'aria-label': 'Site footer',
						},
						React.createElement('p', {}, 'Contact information and links'),
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - ARIA landmarks validation
			await expect(container).toHaveNoAccessibilityViolations();
		});

		it('validates live regions for dynamic content', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement(
						'div',
						{
							role: 'alert',
							'aria-live': 'assertive',
							'aria-atomic': 'true',
						},
						'Error: Please complete all required fields',
					),
					React.createElement(
						'div',
						{
							role: 'status',
							'aria-live': 'polite',
							'aria-atomic': 'true',
						},
						'Form saved successfully',
					),
					React.createElement(
						'div',
						{
							'aria-live': 'polite',
							'aria-atomic': 'false',
						},
						'Loading content...',
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Live regions validation
			await expect(container).toHaveNoAccessibilityViolations();
		});
	});

	describe('Mobile and Touch Accessibility', () => {
		it('validates touch target sizes', async () => {
			const { container } = render(
				React.createElement(
					'div',
					{},
					React.createElement(
						'button',
						{
							style: {
								minHeight: '44px',
								minWidth: '44px',
								padding: '12px 16px',
							},
						},
						'Touch Friendly Button',
					),
					React.createElement(
						'a',
						{
							href: '/contact',
							style: {
								display: 'inline-block',
								minHeight: '44px',
								minWidth: '44px',
								padding: '12px',
							},
						},
						'Touch Friendly Link',
					),
				),
			);

			// CONTEXT7 SOURCE: /dequelabs/axe-core - Touch target validation
			await expect(container).toHaveNoAccessibilityViolations();
		});
	});

	describe('Royal Client Standards Accessibility', () => {
		it('maintains premium accessibility standards for elite clientele', async () => {
			const { container } = render(
				React.createElement(
					'article',
					{ role: 'main' },
					React.createElement(
						'header',
						{},
						React.createElement('h1', {}, 'Elite Tutoring Services'),
						React.createElement(
							'p',
							{},
							'Maintaining the highest standards of accessibility for our distinguished clients',
						),
					),
					React.createElement(
						'section',
						{ 'aria-labelledby': 'premium-features' },
						React.createElement('h2', { id: 'premium-features' }, 'Premium Features'),
						React.createElement(
							'ul',
							{},
							React.createElement('li', {}, 'Bespoke tutoring programmes'),
							React.createElement('li', {}, 'Expert subject specialists'),
							React.createElement('li', {}, 'Confidential consultation process'),
						),
					),
					React.createElement(
						'section',
						{ 'aria-labelledby': 'contact-section' },
						React.createElement('h2', { id: 'contact-section' }, 'Get Started'),
						React.createElement(
							'form',
							{ 'aria-label': 'Premium consultation enquiry' },
							React.createElement(
								'div',
								{},
								React.createElement('label', { htmlFor: 'client-name' }, 'Your Name'),
								React.createElement('input', {
									type: 'text',
									id: 'client-name',
									required: true,
									'aria-describedby': 'name-help',
								}),
								React.createElement(
									'small',
									{ id: 'name-help' },
									'All enquiries handled with complete confidentiality',
								),
							),
							React.createElement(
								'button',
								{ type: 'submit' },
								'Request Consultation',
							),
						),
					),
				),
			);

			// Royal client standards require zero accessibility violations
			await expect(container).toHaveNoAccessibilityViolations();
		});
	});
});
