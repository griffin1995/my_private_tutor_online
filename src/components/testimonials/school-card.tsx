'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { MapPin, Star, Trophy, GraduationCap } from 'lucide-react';
import { EliteSchool } from '@/lib/cms/schools-data';
interface SchoolCardProps {
	school: EliteSchool;
	displayMode?: 'logo' | 'text' | 'mixed';
	size?: 'compact' | 'standard' | 'large';
	interactive?: boolean;
	showMetadata?: boolean;
	onCardClick?: (school: EliteSchool) => void;
	className?: string;
	showHoverStats?: boolean;
}
const cardAnimationVariants = {
	initial: {
		scale: 1,
		y: 0,
		boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
	},
};
export function SchoolCard({
	school,
	displayMode = 'mixed',
	size = 'standard',
	interactive = true,
	showMetadata = false,
	onCardClick,
	className = '',
	showHoverStats = true,
}: SchoolCardProps) {
	const [imageError, setImageError] = useState(false);
	const handleImageError = () => {
		setImageError(true);
	};
	const cardSizeClasses = {
		compact: 'px-4 py-3 min-w-[200px]',
		standard: 'px-6 py-4 min-w-[280px]',
		large: 'px-8 py-6 min-w-[320px]',
	};
	const logoSizeClasses = {
		compact: 'h-8 w-8',
		standard: 'h-12 w-12',
		large: 'h-16 w-16',
	};
	const textSizeClasses = {
		compact: 'text-sm',
		standard: 'text-base',
		large: 'text-lg',
	};
	return (
		<m.div
			className={`
        relative flex-shrink-0 bg-white rounded-2xl border border-primary-100 
        transition-colors duration-300 overflow-hidden
        ${cardSizeClasses[size]}
        ${className}
      `}
			variants={cardAnimationVariants}
			initial='initial'
			animate='initial'>
			{}
			{}
			{}

			{}
			<div className='relative z-10 flex items-center gap-4'>
				{}
				{(displayMode === 'logo' || displayMode === 'mixed') && (
					<div className='flex-shrink-0'>
						{school.logo && !imageError ?
							<img
								src={school.logo}
								alt={`${school.name} logo`}
								className={`${logoSizeClasses[size]} object-contain`}
								onError={handleImageError}
							/>
						: school.crest && !imageError ?
							<img
								src={school.crest}
								alt={`${school.name} crest`}
								className={`${logoSizeClasses[size]} object-contain`}
								onError={handleImageError}
							/>
						:	<div
								className={`${logoSizeClasses[size]} rounded-full bg-primary-100 flex items-center justify-center`}>
								<GraduationCap
									className={`${
										size === 'compact' ? 'h-4 w-4'
										: size === 'standard' ? 'h-6 w-6'
										: 'h-8 w-8'
									} text-primary-600`}
								/>
							</div>
						}
					</div>
				)}

				{}
				<div className='flex-grow min-w-0'>
					<div className='flex items-center justify-between'>
						{}
						{}
						{}
						<h3
							className={`font-semibold text-primary-700 ${textSizeClasses[size]} truncate`}>
							{school.shortName || school.name}
						</h3>

						{}
						{}
						{}
					</div>

					{}
					{displayMode !== 'logo' && (
						<div className='flex items-center mt-1'>
							<MapPin className='h-3 w-3 text-primary-400 mr-1 flex-shrink-0' />
							<span className='text-xs text-primary-500 truncate'>
								{school.city}, {school.country}
							</span>
						</div>
					)}

					{}
					{school.prestigeScore >= 90 && (
						<div className='flex items-center mt-1'>
							<Trophy className='h-3 w-3 text-accent-500 mr-1' />
							<span className='text-xs text-accent-600 font-medium'>Elite</span>
						</div>
					)}
				</div>
			</div>

			{}
			{}
			{}

			{}
			{school.league === 'oxbridge' && (
				<div className='absolute top-2 right-2'>
					<div className='bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-sm'>
						Oxbridge
					</div>
				</div>
			)}
			{school.league === 'russell_group' && (
				<div className='absolute top-2 right-2'>
					<div className='bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-sm'>
						Russell Group
					</div>
				</div>
			)}
		</m.div>
	);
}
export default SchoolCard;
