'use client';

import { Navigation } from '@/components/navigation/Navigation';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Menu, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { LogoSection } from './logo-section';
import { Button } from '@/components/ui/button';
interface PageHeaderProps {
	className?: string;
	isHeroPage?: boolean;
	showBlueNavigation?: boolean;
}
interface NavigationItem {
	label: string;
	href?: string;
	items?: NavigationSubItem[];
}
interface NavigationSubItem {
	label: string;
	href: string;
	description?: string;
}
interface DesktopNavigationProps {
	isTransparent: boolean;
}
function useScrollDetection(threshold: number = 75) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const rafId = React.useRef<number>();
	const handleScroll = useCallback(() => {
		if (rafId.current) {
			cancelAnimationFrame(rafId.current);
		}
		rafId.current = requestAnimationFrame(() => {
			if (typeof window === 'undefined') return;
			const scrollY = window.scrollY;
			setIsScrolled(scrollY > threshold);
		});
	}, [threshold]);
	useEffect(() => {
		setIsMounted(true);
		if (typeof window === 'undefined') return;
		window.addEventListener('scroll', handleScroll, {
			passive: true,
		});
		handleScroll();
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	}, [handleScroll]);
	return {
		isScrolled: isMounted ? isScrolled : false,
		isMounted,
	};
}
export function PageHeader({
	className,
	isHeroPage = false,
	showBlueNavigation = false,
}: PageHeaderProps) {
	return (
		<Navigation
			showBlueNavigation={showBlueNavigation}
			className={className}
		/>
	);
}
;
