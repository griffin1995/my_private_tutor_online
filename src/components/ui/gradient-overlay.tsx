'use client';

import React, { useState } from 'react';
interface GradientOverlayProps {
	direction?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-right'
		| 'bottom-right'
		| 'top-left'
		| 'bottom-left'
		| 'radial'
		| 'conic';
	from?: string;
	to?: string;
	via?: string;
	colors?: string[];
	height?: string;
	width?: string;
	className?: string;
	animate?: boolean;
	opacity?: number;
	blendMode?:
		| 'normal'
		| 'multiply'
		| 'screen'
		| 'overlay'
		| 'soft-light'
		| 'hard-light';
	position?: 'absolute' | 'relative' | 'fixed';
	zIndex?: number;
const gradientDirections = {
	top: 'bg-gradient-to-t',
	bottom: 'bg-gradient-to-b',
	left: 'bg-gradient-to-l',
	right: 'bg-gradient-to-r',
	'top-right': 'bg-gradient-to-tr',
	'bottom-right': 'bg-gradient-to-br',
	'top-left': 'bg-gradient-to-tl',
	'bottom-left': 'bg-gradient-to-bl',
	radial: 'bg-radial-gradient',
	conic: 'bg-conic-gradient',
};
const animationVariants = {
	hidden: {
		scale: 1.1,
	},
	visible: {
		scale: 1,
		transition: {
		},
	},
};
export const GradientOverlay: React.FC<GradientOverlayProps> = ({
	direction = 'top',
	from = 'primary-900',
	to = 'transparent',
	via,
	colors,
	height = 'h-24',
	width = 'w-full',
	className = '',
	animate = false,
	opacity = 1,
	blendMode = 'normal',
	position = 'absolute',
	zIndex = 10,
}) => {
	const gradientDirection =
		gradientDirections[direction] || gradientDirections.top;
	let gradientClasses = gradientDirection;
	if (colors && colors.length > 0) {
		gradientClasses += ` from-${colors[0]}`;
		if (colors.length > 2) {
			gradientClasses += ` via-${colors[1]} to-${colors[2]}`;
		} else if (colors.length === 2) {
			gradientClasses += ` to-${colors[1]}`;
	} else {
		gradientClasses += ` from-${from}`;
		if (via) {
			gradientClasses += ` via-${via}`;
		gradientClasses += ` to-${to}`;
	const baseClasses = `
    ${position}
    ${width}
    ${height}
    ${gradientClasses}
    pointer-events-none
    ${blendMode !== 'normal' ? `mix-blend-${blendMode}` : ''}
    ${className}
  `
		.trim()
		.replace(/\s+/g, ' ');
	const Component = animate ? div : 'div';
	const animationProps =
		animate ?
			{
				variants: animationVariants,
				initial: 'hidden',
				whileInView: 'visible',
				viewport: {
					once: true,
					amount: 0.3,
				},
		:	{};
	return (
		<Component
			className={baseClasses}
			style={{
				opacity,
				zIndex,
			}}
			{...animationProps}
		/>
	);
};
