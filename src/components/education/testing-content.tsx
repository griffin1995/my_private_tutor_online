'use client';

import { TabContentLayout } from './tab-content-layout';
import type { TabContentData } from './tab-content-layout';

const testingData: TabContentData = {
	mainFeatures: {
		title: 'A collection of extra blocks for Shadcn UI & Tailwind',
		features: [
			{
				id: 'feature-1',
				heading: 'Design System Approved',
				label: 'FOR DESIGNERS',
				description:
					'Hundreds of finely crafted components for shadcn/ui available in Figma. Easily modify the design system to your brand.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
				url: 'https://shadcnblocks.com',
			},
			{
				id: 'feature-2',
				heading: 'Copy-Paste Code Blocks',
				label: 'FOR DEVELOPERS',
				description:
					'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg',
				url: 'https://shadcnblocks.com',
			},
			{
				id: 'feature-3',
				heading: 'Product-First Approach',
				label: 'FOR PRODUCT TEAMS',
				description:
					'Components designed with user experience in mind. Every block is tested for usability and optimized for conversion rates.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg',
				url: 'https://shadcnblocks.com',
			},
			{
				id: 'feature-4',
				heading: 'Marketing-Ready Templates',
				label: 'FOR MARKETING',
				description:
					'High-converting landing pages, email templates, and marketing components that drive engagement and boost your campaigns.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg',
				url: 'https://shadcnblocks.com',
			},
		],
	},
	callOuts: {
		title: 'Additional features and capabilities',
		features: [
			{
				id: 'callout-1',
				heading: 'Design System Approved',
				label: 'FOR DESIGNERS',
				description:
					'Hundreds of finely crafted components for shadcn/ui available in Figma. Easily modify the design system to your brand.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
				url: 'https://shadcnblocks.com',
			},
			{
				id: 'callout-2',
				heading: 'Copy-Paste Code Blocks',
				label: 'FOR DEVELOPERS',
				description:
					'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg',
				url: 'https://shadcnblocks.com',
			},
			{
				id: 'callout-3',
				heading: 'Product-First Approach',
				label: 'FOR PRODUCT TEAMS',
				description:
					'Components designed with user experience in mind. Every block is tested for usability and optimized for conversion rates.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg',
				url: 'https://shadcnblocks.com',
			},
			{
				id: 'callout-4',
				heading: 'Marketing-Ready Templates',
				label: 'FOR MARKETING',
				description:
					'High-converting landing pages, email templates, and marketing components that drive engagement and boost your campaigns.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg',
				url: 'https://shadcnblocks.com',
			},
		],
	},
	stats: {
		heading: 'Platform performance insights',
		description: 'Ensuring stability and scalability for all users',
		link: {
			text: 'Read the full impact report',
			url: 'https://www.shadcnblocks.com',
		},
		stats: [
			{
				id: 'stat-1',
				value: '250%+',
				label: 'average growth in user engagement',
			},
			{
				id: 'stat-2',
				value: '$2.5m',
				label: 'annual savings per enterprise partner',
			},
			{
				id: 'stat-3',
				value: '200+',
				label: 'integrations with top industry platforms',
			},
			{
				id: 'stat-4',
				value: '99.9%',
				label: 'customer satisfaction over the last year',
			},
		],
	},
	testimonial: {
		quote:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
		author: {
			name: 'Customer Name',
			role: 'Role',
			avatar: {
				src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
				alt: 'Customer Name',
			},
		},
	},
};

export function TestingContent() {
	return <TabContentLayout data={testingData} />;
}
