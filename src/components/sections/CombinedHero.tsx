'use client';

import { getScrollingSchoolLogos } from '@/lib/cms/cms-images';
import { m } from 'framer-motion';
import Image from 'next/image';
import HeroSection from './HeroSection';
import TaglineSection from './TaglineSection';

interface CombinedHeroProps {
	testimonialsSchools?: (string | { name?: string; title?: string })[];
	showHeroHeader?: boolean;
	hasStaticNavbar?: boolean;
	scrollSpeed?: number;
}

export default function CombinedHero({
	testimonialsSchools = [],
	showHeroHeader = false,
	hasStaticNavbar = false,
	scrollSpeed = 15,
}: CombinedHeroProps) {
	// Prepare school names
	const schoolNames = testimonialsSchools.map((s) =>
		typeof s === 'string' ? s : s.name || s.title || 'School',
	);
	const schoolLogos = getScrollingSchoolLogos();

	return (
		<section
			id='hero-premium-tutoring-landing-combined'
			className='flex flex-col h-screen'>
			{/* Hero Section - 50% */}
			<div className='flex-[10] h-full'>
				<HeroSection
					showHeader={showHeroHeader}
					hasStaticNavbar={hasStaticNavbar}
					className='h-full'
				/>
			</div>

			{/* Tagline Section - 20% */}
			<div className='flex-[4] flex items-center justify-center'>
				<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<TaglineSection />
				</div>
			</div>

			{/* Scrolling Schools Section - 30% */}
			{schoolNames.length > 0 && (
				<div className='flex-[6] flex items-center justify-center'>
					<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<section
							className='bg-white py-4 px-4 sm:px-6 lg:px-8'
							aria-label='Partner schools carousel'>
							<div className='w-full overflow-hidden bg-white'>
								<m.div
									className='flex gap-8 sm:gap-12 whitespace-nowrap motion-reduce:animate-none'
									animate={{ x: ['0%', '-50%'] }}
									transition={{
										repeat: Infinity,
										ease: 'linear',
										duration: scrollSpeed,
									}}>
									{/* First set */}
									{schoolNames.map((school, index) => {
										const logoAsset = schoolLogos[school as keyof typeof schoolLogos];
										if (!logoAsset) return null;
										return (
											<div
												key={`first-${index}`}
												className='flex-shrink-0 flex items-center justify-center px-3 sm:px-4'>
												<Image
													src={logoAsset.src}
													alt={logoAsset.alt}
													width={logoAsset.width || 120}
													height={logoAsset.height || 80}
													title={logoAsset.title}
													loading='lazy'
													className='h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300'
													sizes='(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px'
												/>
											</div>
										);
									})}

									{/* Second set for seamless loop */}
									{schoolNames.map((school, index) => {
										const logoAsset = schoolLogos[school as keyof typeof schoolLogos];
										if (!logoAsset) return null;
										return (
											<div
												key={`second-${index}`}
												className='flex-shrink-0 flex items-center justify-center px-3 sm:px-4'>
												<Image
													src={logoAsset.src}
													alt={logoAsset.alt}
													width={logoAsset.width || 120}
													height={logoAsset.height || 80}
													title={logoAsset.title}
													loading='lazy'
													className='h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300'
													sizes='(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px'
												/>
											</div>
										);
									})}
								</m.div>
							</div>
						</section>
					</div>
				</div>
			)}
		</section>
	);
}
