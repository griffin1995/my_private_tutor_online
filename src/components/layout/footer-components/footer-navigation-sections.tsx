import React, { useMemo } from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import type { FooterContent } from '@/lib/services/footer-service-contracts';
interface FooterNavigationSectionsProps {
	sections: FooterContent['footerSections'];
	className?: string;
}
export const FooterNavigationSections =
	React.memo<FooterNavigationSectionsProps>(({ sections, className = '' }) => {
		const processedSections = useMemo(
			() =>
				sections?.map((section, index) => ({
					...section,
					id: `footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`,
					index,
					linkCount: section.links?.length || 0,
					processedLinks:
						section.links?.map((link, linkIndex) => ({
							...link,
							id: `${section.title}-link-${linkIndex}`,
							isExternal: !link.href.startsWith('/'),
							accessibleLabel: `${link.label} in ${section.title} section`,
						})) || [],
				})) || [],
			[sections],
		);
		if (!processedSections.length) {
			return null;
		}
		return (
			<div
				className={`grid grid-cols-2 md:grid-cols-4 gap-8 items-stretch h-full ${className}`}>
				{processedSections.map((section) => (
					<FooterNavigationSection
						key={section.id}
						section={section}
						sectionIndex={section.index}
					/>
				))}
			</div>
		);
	});
FooterNavigationSections.displayName = 'FooterNavigationSections';
interface ProcessedSection {
	id: string;
	title: string;
	index: number;
	linkCount: number;
	processedLinks: Array<{
		id: string;
		href: string;
		label: string;
		isExternal: boolean;
		accessibleLabel: string;
	}>;
}
interface FooterNavigationSectionProps {
	section: ProcessedSection;
	sectionIndex: number;
}
const FooterNavigationSection = React.memo<FooterNavigationSectionProps>(
	({ section, sectionIndex }) => {
		return (
			<div
				className='flex flex-col h-full animate-fade-in-up'
				style={{
					animationDelay: `${sectionIndex * 0.1}s`,
				}}>
				<h3
					id={section.id}
					className='font-serif text-3xl md:text-3xl lg:text-4xl font-bold text-primary-900 flex items-center gap-2 mb-4 md:mb-4 lg:mb-6 flex-shrink-0'>
					{section.title}
					<Separator className='flex-1 bg-neutral-300' />
				</h3>

				<nav
					role='navigation'
					aria-labelledby={section.id}
					aria-label={`${section.title} links`}
					className='flex-1 flex flex-col'>
					<ul className='flex flex-col justify-between h-full'>
						{section.processedLinks.map((link) => (
							<li
								key={link.id}
								className='flex-shrink-0'>
								<FooterNavigationLink link={link} />
							</li>
						))}
					</ul>
				</nav>
			</div>
		);
	},
);
FooterNavigationSection.displayName = 'FooterNavigationSection';
interface FooterNavigationLinkProps {
	link: {
		id: string;
		href: string;
		label: string;
		isExternal: boolean;
		accessibleLabel: string;
	};
}
const FooterNavigationLink = React.memo<FooterNavigationLinkProps>(
	({ link }) => {
		if (link.isExternal) {
			return (
				<a
					href={link.href}
					target='_blank'
					rel='noopener noreferrer'
					className='group flex items-center text-neutral-700 hover:text-accent-600 transition-all duration-300 text-lg md:text-lg lg:text-xl'
					aria-label={`${link.accessibleLabel} - opens in new tab`}>
					<span className='w-0 group-hover:w-4 transition-all duration-300 overflow-hidden'>
						<Send className='w-3 h-3' />
					</span>
					<span className='group-hover:translate-x-1 transition-transform duration-300'>
						{link.label}
					</span>
				</a>
			);
		}
		return (
			<Link
				href={link.href}
				className='group flex items-center text-neutral-700 hover:text-accent-600 transition-all duration-300 text-lg md:text-lg lg:text-xl'
				aria-label={link.accessibleLabel}
				prefetch={true}>
				<span className='w-0 group-hover:w-4 transition-all duration-300 overflow-hidden'>
					<Send className='w-3 h-3' />
				</span>
				<span className='group-hover:translate-x-1 transition-transform duration-300'>
					{link.label}
				</span>
			</Link>
		);
	},
);
FooterNavigationLink.displayName = 'FooterNavigationLink';
export default FooterNavigationSections;
