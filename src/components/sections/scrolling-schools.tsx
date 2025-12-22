'use client';

import Image from 'next/image';
import { getScrollingSchoolLogos } from '@/lib/cms/cms-images';
interface ScrollingSchoolsProps {
	schools: (
		| string
		| {
				name?: string;
				title?: string;
		  }
	)[];
	className?: string;
	speed?: number;
}

export function ScrollingSchools({
	schools,
	className = '',
	speed = 15,
}: ScrollingSchoolsProps) {
	console.log(
		'[DEBUG-ScrollingSchools] Received schools data:',
		schools,
		typeof schools,
	);
	if (!schools || !Array.isArray(schools) || schools.length === 0) {
		console.warn(
			'[DEBUG-ScrollingSchools] Invalid schools data - not an array or empty:',
			schools,
		);
		return null;
	}

	const schoolNames = schools.map((school) =>
		typeof school === 'string' ? school : school.name || school.title || 'School',
	);
	const schoolLogos = getScrollingSchoolLogos();
	return (
		<section
			className={`bg-white py-4 px-4 sm:px-6 lg:px-8 ${className}`}
			aria-label='Partner schools carousel'>
			<div className='w-full overflow-hidden bg-white'>
				<div className='flex gap-8 sm:gap-12 whitespace-nowrap motion-reduce:animate-none'>

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
				</div>
			</div>
		</section>
	);
}
