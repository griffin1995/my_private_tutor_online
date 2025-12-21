'use client';

import React from 'react';
interface FaqIconProps {
	readonly className?: string;
	readonly 'aria-label'?: string;
	readonly width?: number;
	readonly height?: number;
const GlobeIcon: React.FC<FaqIconProps> = ({
	className = '',
	'aria-label': ariaLabel = 'Global services icon',
	width = 80,
	height = 80,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		role='img'
		aria-label={ariaLabel}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2.00312 12.1255C2.07025 17.59 6.52083 22.0001 12.0014 22.0001C17.4819 22.0001 21.9325 17.59 21.9996 12.1255C22.0668 6.66098 17.6162 2.25085 12.1357 2.18372C6.65514 2.11659 2.24485 6.56717 2.17772 12.0477C2.17699 12.0736 2.17661 12.0995 2.17661 12.1255H2.00312ZM12.0014 20.0001C16.4197 20.0001 20.0014 16.4184 20.0014 12.0001C20.0014 7.58172 16.4197 4.00005 12.0014 4.00005C7.58312 4.00005 4.00145 7.58172 4.00145 12.0001C4.00145 16.4184 7.58312 20.0001 12.0014 20.0001ZM12.0014 18.0001C8.68767 18.0001 6.00145 15.3139 6.00145 12.0001C6.00145 8.68629 8.68767 6.00005 12.0014 6.00005C15.3152 6.00005 18.0014 8.68629 18.0014 12.0001C18.0014 15.3139 15.3152 18.0001 12.0014 18.0001Z'
			fill='#343C54'
		/>
	</svg>
);
const EducationGapIcon: React.FC<FaqIconProps> = ({
	className = '',
	'aria-label': ariaLabel = 'Education expertise icon',
	width = 80,
	height = 80,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		role='img'
		aria-label={ariaLabel}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12.2977 3.30965C12.1077 3.22751 11.8923 3.22751 11.7023 3.30965L2.70234 7.30965C2.26203 7.50281 2.26203 8.09719 2.70234 8.29035L5 9.23607V16C5 16.5523 5.44772 17 6 17C6.55228 17 7 16.5523 7 16V10.236L11.7023 12.6904C11.8923 12.7725 12.1077 12.7725 12.2977 12.6904L21.2977 8.69035C21.7381 8.49719 21.7381 7.90281 21.2977 7.70965L12.2977 3.30965ZM12 5.23607L18.382 8L12 10.764L5.618 8L12 5.23607Z'
			fill='#343C54'
		/>
		<path
			d='M9 13.618L11.7023 14.9713C11.8923 15.0534 12.1077 15.0534 12.2977 14.9713L15 13.618V17C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17V13.618Z'
			fill='#343C54'
		/>
	</svg>
);
const BookOpenIcon: React.FC<FaqIconProps> = ({
	className = '',
	'aria-label': ariaLabel = 'Curriculum content icon',
	width = 80,
	height = 80,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		role='img'
		aria-label={ariaLabel}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12 4.5C10.2153 2.71525 7.54688 2 5.25 2C3.5 2 2 2.5 1 3.5V18.5C2 17.5 3.5 17 5.25 17C7.54688 17 10.2153 17.7153 12 19.5C13.7847 17.7153 16.4531 17 18.75 17C20.5 17 22 17.5 23 18.5V3.5C22 2.5 20.5 2 18.75 2C16.4531 2 13.7847 2.71525 12 4.5ZM11 17.5C9.21531 15.7153 6.54688 15 4.25 15C3.08579 15 2.04289 15.1671 1.25 15.4453V4.55469C2.04289 4.16708 3.08579 4 4.25 4C6.54688 4 9.21531 4.71525 11 6.5V17.5ZM13 17.5V6.5C14.7847 4.71525 17.4531 4 19.75 4C20.9142 4 21.9571 4.16708 22.75 4.55469V15.4453C21.9571 15.1671 20.9142 15 19.75 15C17.4531 15 14.7847 15.7153 13 17.5Z'
			fill='#343C54'
		/>
	</svg>
);
const TrendingUpIcon: React.FC<FaqIconProps> = ({
	className = '',
	'aria-label': ariaLabel = 'Academic progress icon',
	width = 80,
	height = 80,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		role='img'
		aria-label={ariaLabel}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M3.29289 13.2929C3.68342 12.9024 4.31658 12.9024 4.70711 13.2929L9 17.5858L14.2929 12.2929C14.6834 11.9024 15.3166 11.9024 15.7071 12.2929L20.2929 16.8787L21.7071 15.4645C22.0976 15.074 22.0976 14.4408 21.7071 14.0503C21.3166 13.6598 20.6834 13.6598 20.2929 14.0503L17.5 16.8432L17.5 7C17.5 6.44772 17.0523 6 16.5 6L12.5 6C11.9477 6 11.5 6.44772 11.5 7C11.5 7.55228 11.9477 8 12.5 8L15.5 8L15.5 18.2071L14.2929 16.9999L9 22.2929C8.60947 22.6834 7.97631 22.6834 7.58579 22.2929L3.29289 17.9999C2.90237 17.6094 2.90237 16.9763 3.29289 16.5858C3.68342 16.1952 4.31658 16.1952 4.70711 16.5858L9 20.8787L14.2929 15.5858L18.2929 19.5858C18.6834 19.9763 19.3166 19.9763 19.7071 19.5858C20.0976 19.1952 20.0976 18.5621 19.7071 18.1716L15.7071 14.1716C15.3166 13.7811 14.6834 13.7811 14.2929 14.1716L9 19.4645L3.29289 13.7574C2.90237 13.3669 2.90237 12.7337 3.29289 12.3432L4.70711 13.7574Z'
			fill='#343C54'
		/>
	</svg>
);
const CalendarIcon: React.FC<FaqIconProps> = ({
	className = '',
	'aria-label': ariaLabel = 'Scheduling icon',
	width = 80,
	height = 80,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		role='img'
		aria-label={ariaLabel}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M7 1C7.55228 1 8 1.44772 8 2V3H16V2C16 1.44772 16.4477 1 17 1C17.5523 1 18 1.44772 18 2V3H19C20.6569 3 22 4.34315 22 6V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V6C2 4.34315 3.34315 3 5 3H6V2C6 1.44772 6.44772 1 7 1ZM16 5H18V6C18 6.55228 17.5523 7 17 7C16.4477 7 16 6.55228 16 6V5ZM8 5V6C8 6.55228 7.55228 7 7 7C6.44772 7 6 6.55228 6 6V5H4V8H20V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V8H8ZM4 10V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V10H4Z'
			fill='#343C54'
		/>
		<path
			d='M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z'
			fill='#343C54'
		/>
		<path
			d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
			fill='#343C54'
		/>
		<path
			d='M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z'
			fill='#343C54'
		/>
		<path
			d='M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z'
			fill='#343C54'
		/>
		<path
			d='M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z'
			fill='#343C54'
		/>
	</svg>
);
const BankNoteIcon: React.FC<FaqIconProps> = ({
	className = '',
	'aria-label': ariaLabel = 'Pricing information icon',
	width = 80,
	height = 80,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		role='img'
		aria-label={ariaLabel}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM4 6V18H20V6H4Z'
			fill='#343C54'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8ZM11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11Z'
			fill='#343C54'
		/>
		<path
			d='M6 8C6.55228 8 7 7.55228 7 7C7 6.44772 6.55228 6 6 6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8Z'
			fill='#343C54'
		/>
		<path
			d='M18 16C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14C17.4477 14 17 14.4477 17 15C17 15.5523 17.4477 16 18 16Z'
			fill='#343C54'
		/>
	</svg>
);
const HelpCircleIcon: React.FC<FaqIconProps> = ({
	className = '',
	'aria-label': ariaLabel = 'General questions icon',
	width = 80,
	height = 80,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		role='img'
		aria-label={ariaLabel}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z'
			fill='#343C54'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12 7C10.067 7 8.5 8.567 8.5 10.5C8.5 11.0523 8.94772 11.5 9.5 11.5C10.0523 11.5 10.5 11.0523 10.5 10.5C10.5 9.67157 11.1716 9 12 9C12.8284 9 13.5 9.67157 13.5 10.5C13.5 11.3284 12.8284 12 12 12C11.4477 12 11 12.4477 11 13V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V13.8293C14.1652 13.4175 15 12.3062 15 11C15 8.79086 13.2091 7 12 7Z'
			fill='#343C54'
		/>
		<path
			d='M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z'
			fill='#343C54'
		/>
	</svg>
);
export const FAQ_ICON_MAP = {
	'about-service': GlobeIcon,
	'tutors-teaching': EducationGapIcon,
	'subjects-curriculum': BookOpenIcon,
	'progress-results': TrendingUpIcon,
	'scheduling-process': CalendarIcon,
	'pricing-payment': BankNoteIcon,
	'other-questions': HelpCircleIcon,
} as const;
export const getFaqIconComponent = (
	categoryTitle: string,
): React.FC<FaqIconProps> => {
	const key = categoryTitle
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '') as keyof typeof FAQ_ICON_MAP;
	return FAQ_ICON_MAP[key] || HelpCircleIcon;
};
