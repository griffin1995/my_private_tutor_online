'use client';

import { PageFooter } from '@/components/layout/page-footer';
import { PageLayout } from '@/components/layout/page-layout';
import { Section } from '@/components/layout/section';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Card } from '@/components/ui/card';
import { m } from 'framer-motion';
import { FileText } from 'lucide-react';
import type { ReactNode } from 'react';

interface LegalPageTemplateProps {
	title: string;
	subtitle: string;
	lastUpdated: string;
	backgroundImage: string;
	children: ReactNode;
	showCompliance?: boolean;
	complianceText?: string;
}

interface LegalMetaInfoProps {
	lastUpdated: string;
	showCompliance?: boolean;
	complianceText?: string;
}

interface LegalContentProps {
	children: ReactNode;
}

/**
 * Meta information component for legal pages
 */
function LegalMetaInfo({ lastUpdated, showCompliance = true, complianceText }: LegalMetaInfoProps) {
	const defaultComplianceText = 'This document complies with UK GDPR, Data Protection Act 2018, and PECR requirements.';

	return (
		<m.div
			className='mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 shadow-lg'
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true }}>
			<div className='flex items-center gap-4 mb-4'>
				<FileText className='w-6 h-6 text-blue-600' />
				<p className='text-lg text-blue-800 font-bold'>
					Last Updated: {lastUpdated}
				</p>
			</div>
			{showCompliance && (
				<p className='text-blue-700'>
					{complianceText || defaultComplianceText}
				</p>
			)}
		</m.div>
	);
}

/**
 * Content wrapper component for legal pages
 */
function LegalContent({ children }: LegalContentProps) {
	return (
		<Section className='py-20 relative' background='white'>
			<div className='absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50' />
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='max-w-5xl mx-auto'>
					<div className='prose prose-lg prose-slate max-w-none'>
						{children}
					</div>
				</div>
			</div>
		</Section>
	);
}

/**
 * Standardised footer component for legal pages
 */
function LegalFooter() {
	return (
		<PageFooter
			variant='premium'
			showBackToTop={true}
			showNewsletter={false}
			showContactForm={false}
		/>
	);
}

/**
 * Main legal page template component with compound pattern
 */
export function LegalPageTemplate({
	title,
	subtitle,
	lastUpdated,
	backgroundImage,
	children,
	showCompliance = true,
	complianceText,
}: LegalPageTemplateProps) {
	return (
		<>
			<SimpleHero
				backgroundImage={backgroundImage}
				h1={<span className='text-white'>{title}</span>}
				h2={subtitle}
			/>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={false}
				containerSize='full'>
				<LegalContent>
					<LegalMetaInfo
						lastUpdated={lastUpdated}
						showCompliance={showCompliance}
						complianceText={complianceText}
					/>
					{children}
				</LegalContent>
			</PageLayout>

			<LegalFooter />
		</>
	);
}

// Compound components for advanced usage
LegalPageTemplate.MetaInfo = LegalMetaInfo;
LegalPageTemplate.Content = LegalContent;
LegalPageTemplate.Footer = LegalFooter;

// Export type definitions for external use
;