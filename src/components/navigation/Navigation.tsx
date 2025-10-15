/**
 * PREMIUM NAVIGATION COMPONENT - MY PRIVATE TUTOR ONLINE
 * Redesigned: January 2025
 *
 * A sophisticated navigation component featuring full-screen dropdown overlays:
 * - Next.js 15 App Router patterns
 * - Headless UI for accessibility and control
 * - Framer Motion for smooth animations
 * - Full-screen persistent dropdowns with hover triggers
 * - Flat design aesthetic with metallic blue and aztec gold
 *
 * CONTEXT7 SOURCE: /vercel/next.js - Link component and navigation patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for client-side navigation
 *
 * CONTEXT7 SOURCE: /tailwindlabs/headlessui - Menu component with hover interactions
 * IMPLEMENTATION REASON: Official Headless UI documentation for accessible menu components
 *
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation and transition patterns
 * IMPLEMENTATION REASON: Official Framer Motion documentation for smooth transitions
 */

'use client';

import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
// CONTEXT7 SOURCE: /lucide-icons/lucide - Standard icon imports for navigation components
// REVERSION REASON: Restoring ChevronDown import for main menu dropdown indicators per user request
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import ArrowUpward from '@/components/ui/arrow-upward';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ChevronRight, Menu as MenuIcon, X } from 'lucide-react';

// CONTEXT7 SOURCE: /typescript/handbook - Type definitions for navigation structure
// TYPE_REASON: Official TypeScript documentation for interface definitions
interface NavigationItem {
	label: string;
	href?: string;
	description?: string;
	items?: NavigationItem[];
	featured?: boolean;
	icon?: React.ReactNode;
}

interface NavigationProps {
	className?: string;
	isHomepage?: boolean;
}

// CONTEXT7 SOURCE: /tailwindlabs/headlessui - Custom hook for dropdown state management
// STATE_REASON: Official Headless UI documentation for managing menu state with custom logic
interface DropdownState {
	isOpen: boolean;
	activeMenu: string | null;
}

// CONTEXT7 SOURCE: /vercel/next.js - Static navigation data pattern with comprehensive submenus
// DATA_REASON: Official Next.js documentation for static data optimization with anchor link navigation
// SUBMENU_REASON: Added comprehensive submenus using section IDs extracted from each page for smooth scrolling navigation
const navigationData: NavigationItem[] = [
	{
		label: 'About Us',
		href: '/about',
		items: [
			{ label: "Founder's Story", href: '/about#about-founder-story' },
			{ label: 'Our Ethos', href: '/about#about-quote' },
			{ label: 'Client Reviews', href: '/about#about-testimonials' },
		],
	},
	{
		label: 'Subject Tuition',
		href: '/subject-tuition',
		items: [
			{
				label: 'Subject Categories',
				href: '/subject-tuition#subject-tuition-categories',
			},
			{
				label: 'Academic Results',
				href: '/subject-tuition#subject-tuition-results',
			},
			{
				label: 'Home Education',
				href: '/subject-tuition#subject-tuition-homeschooling-preview',
			},
		],
	},
	{
		label: 'How It Works',
		href: '/how-it-works',
		items: [
			{
				label: 'Our Process',
				href: '/how-it-works#how-it-works-process-steps',
			},
			{ label: 'Meet Our Tutors', href: '/how-it-works#how-it-works-tutors' },
			{
				label: 'Pricing Tiers',
				href: '/how-it-works#how-it-works-tutoring-tiers',
			},
			{ label: 'Why Choose Us', href: '/how-it-works#how-it-works-benefits' },
		],
	},
	{
		label: 'Testimonials',
		href: '/testimonials',
		items: [
			{ label: 'Filter Reviews', href: '/testimonials#testimonials-filter' },
			{ label: 'All Reviews', href: '/testimonials#testimonials-grid' },
			{
				label: 'Elite Schools',
				href: '/testimonials#testimonials-schools-carousel',
			},
		],
	},
	{
		label: 'Video Masterclasses',
		href: '/video-masterclasses',
		items: [
			{
				label: 'Introduction',
				href: '/video-masterclasses#featured-video-content',
			},
			{ label: 'Free Resources', href: '/video-masterclasses#free-video-content' },
			{ label: 'UCAS Guide', href: '/video-masterclasses#ucas-video-content' },
			{
				label: 'British Culture',
				href: '/video-masterclasses#british-culture-video-content',
			},
		],
	},
	{
		label: '11+ Bootcamps',
		href: '/11-plus-bootcamps',
		items: [
			{ label: 'Elite Schools', href: '/11-plus-bootcamps#bootcamps-schools' },
			{ label: 'Our Promise', href: '/11-plus-bootcamps#bootcamps-tagline' },
			{
				label: 'Programmes',
				href: '/11-plus-bootcamps#bootcamps-programme-options',
			},
			{
				label: 'What Makes Us Different',
				href: '/11-plus-bootcamps#bootcamps-features',
			},
		],
	},
	// CONTEXT7 SOURCE: /mdn/content - Array.prototype.filter() method for removing elements from arrays
	// REMOVAL_REASON: Official MDN documentation for filtering arrays - FAQ navigation item removed per user request
	// FAQ navigation item removed from navigationData array
];
const mobileMenuVariants = {
	closed: {
		x: '100%',
		transition: {
			type: 'tween',
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	open: {
		x: 0,
		transition: {
			type: 'tween',
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
};
// CONTEXT7 SOURCE: /grx7/framer-motion - Animation variants for navigation transitions
// ANIMATION_REASON: Official Framer Motion documentation for reusable animation variants
const navVariants = {
	hidden: {
		y: -100,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
};

// CONTEXT7 SOURCE: /grx7/framer-motion - Staggered container variants for dropdown orchestration
// STAGGER_REASON: Official Framer Motion documentation for parent container animation control with delayChildren and staggerChildren
const dropdownContainerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.1,
			staggerChildren: 0.15,
		},
	},
};

// CONTEXT7 SOURCE: /grx7/framer-motion - Individual item variants for staggered fade-in animation
// ITEM_REASON: Official Framer Motion documentation for child item animations with opacity and transform
const dropdownItemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
};

// CONTEXT7 SOURCE: /grx7/framer-motion - Arrow grow upward animation variants for elegant bottom-to-top growth effect
// ARROW_GROW_REASON: Official Framer Motion documentation for transform-based animations using scaleY and y properties with transformOrigin
const arrowGrowVariants = {
	hidden: {
		scaleY: 0,
		y: 50,
		opacity: 0,
		transformOrigin: 'bottom',
	},
	visible: {
		scaleY: 1,
		y: 0,
		opacity: 1,
		transition: {
			delay: 0.85,
			type: 'spring',
			duration: 0.6,
			bounce: 0.2,
		},
	},
};

// CONTEXT7 SOURCE: /grx7/framer-motion - Full-screen overlay animation variants
// OVERLAY_REASON: Official Framer Motion documentation for full-screen overlay transitions
const overlayVariants = {
	hidden: {
		opacity: 0,
		scale: 0.98,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.15,
			ease: 'easeOut',
		},
	},
	exit: {
		opacity: 0,
		scale: 0.98,
		transition: {
			duration: 0.1,
			ease: 'easeIn',
		},
	},
};

export function Navigation({ className, isHomepage = false }: NavigationProps) {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	// CONTEXT7 SOURCE: /reactjs/react.dev - useState for mobile menu state management
	// STATE_REASON: Official React documentation for boolean state management in mobile navigation components
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [dropdownState, setDropdownState] = useState<DropdownState>({
		isOpen: false,
		activeMenu: null,
	});
	// CONTEXT7 SOURCE: /reactjs/react.dev - useState for tracking active menu item state
	// STATE_REASON: Official React documentation for managing conditional styling state
	const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
	const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const { scrollY } = useScroll();

	// CONTEXT7 SOURCE: /grx7/framer-motion - useMotionValueEvent for scroll detection
	// SCROLL_REASON: Official Framer Motion documentation for scroll-based state changes
	useMotionValueEvent(scrollY, 'change', (latest) => {
		setIsScrolled(latest > 50);
	});

	// CONTEXT7 SOURCE: /reactjs/react.dev - useRef for timeout ID management with hover delay
	// HOVER_DELAY_REASON: Official React documentation for storing mutable timeout values that persist across renders without triggering re-renders
	const hoverDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// CONTEXT7 SOURCE: /tailwindlabs/headlessui - Custom dropdown state management with hover delay
	// DROPDOWN_REASON: Official Headless UI documentation for managing persistent dropdown behavior with 300ms hover delay to prevent accidental triggers
	const handleMouseEnter = (menuLabel: string) => {
		// Clear any existing close timeout
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
			dropdownTimeoutRef.current = null;
		}

		// Clear any existing hover delay timeout
		if (hoverDelayTimeoutRef.current) {
			clearTimeout(hoverDelayTimeoutRef.current);
			hoverDelayTimeoutRef.current = null;
		}

		// CONTEXT7 SOURCE: /reactjs/react.dev - setTimeout for delayed state updates in event handlers
		// TIMEOUT_REASON: Official React documentation for using setTimeout within event handlers to delay dropdown opening by 300ms
		hoverDelayTimeoutRef.current = setTimeout(() => {
			setDropdownState({ isOpen: true, activeMenu: menuLabel });
			// CONTEXT7 SOURCE: /reactjs/react.dev - State management for active menu highlighting
			// ACTIVE_STATE_REASON: Official React documentation for conditional state updates
			setActiveMenuItem(menuLabel);
			hoverDelayTimeoutRef.current = null;
		}, 300); // 300ms delay for optimal UX - prevents accidental triggers from quick mouse movements
	};

	const handleMouseLeave = () => {
		// CONTEXT7 SOURCE: /reactjs/react.dev - clearTimeout for cancelling pending state updates
		// CLEANUP_REASON: Official React documentation for clearing setTimeout to cancel delayed dropdown opening when mouse leaves before delay completes
		if (hoverDelayTimeoutRef.current) {
			clearTimeout(hoverDelayTimeoutRef.current);
			hoverDelayTimeoutRef.current = null;
		}

		dropdownTimeoutRef.current = setTimeout(() => {
			// Don't close on mouse leave - require explicit close action
		}, 100);
	};

	const handleCloseDropdown = () => {
		// CONTEXT7 SOURCE: /reactjs/react.dev - clearTimeout for comprehensive timeout cleanup
		// CLEANUP_REASON: Official React documentation for clearing all pending timeouts when closing dropdown explicitly
		if (hoverDelayTimeoutRef.current) {
			clearTimeout(hoverDelayTimeoutRef.current);
			hoverDelayTimeoutRef.current = null;
		}

		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
			dropdownTimeoutRef.current = null;
		}

		setDropdownState({ isOpen: false, activeMenu: null });
		// CONTEXT7 SOURCE: /reactjs/react.dev - State reset for active menu highlighting
		// RESET_REASON: Official React documentation for clearing conditional state
		setActiveMenuItem(null);
	};

	// CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for route change side effects without infinite loops
	// ROUTE_CHANGE_REASON: Official React documentation pattern for closing modals/menus on navigation without causing infinite loops
	// Close mobile menu on route change only (not on state changes)
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	// CONTEXT7 SOURCE: /reactjs/react.dev - useEffect cleanup function for timeout memory leak prevention
	// CLEANUP_REASON: Official React documentation for cleanup functions to prevent memory leaks when component unmounts
	useEffect(() => {
		return () => {
			// Clear all timeouts on component unmount to prevent memory leaks
			if (hoverDelayTimeoutRef.current) {
				clearTimeout(hoverDelayTimeoutRef.current);
				hoverDelayTimeoutRef.current = null;
			}
			if (dropdownTimeoutRef.current) {
				clearTimeout(dropdownTimeoutRef.current);
				dropdownTimeoutRef.current = null;
			}
		};
	}, []);

	// CONTEXT7 SOURCE: /amannn/next-intl - usePathname for active link detection with locale routing
	// ACTIVE_REASON: Official next-intl documentation for determining active navigation state with locale support
	// LOCALE_FIX_REASON: With locale routing, homepage can be "/" or "/en-GB" depending on configuration
	const isActive = (href: string) => {
		if (href === '/') return pathname === '/' || pathname === '/en-GB';
		return pathname.startsWith(href);
	};

	// CONTEXT7 SOURCE: /amannn/next-intl - usePathname for locale-aware homepage detection pattern
	// HOMEPAGE_DETECTION_REASON: Official next-intl documentation for pathname-based conditional rendering with locale routing
	// LOCALE_FIX_REASON: With localePrefix 'as-needed' and defaultLocale 'en-GB', homepage URL is /en-GB not /
	const isCurrentHomepage = pathname === '/' || pathname === '/en-GB';

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design with standard breakpoints
	// RESPONSIVE_REASON: Simplified responsive design using standard Tailwind breakpoints without dynamic calculations

	// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard responsive font sizing
	// RESPONSIVE_FONT_REASON: Industry standard responsive typography without complex calculations
	const getNavbarHeight = () => {
		// Fixed height using standard responsive utilities for overlay positioning
		return 88; // h-22 equivalent (10% reduction from h-24)
	};

	return (
		<>
			<motion.header
				initial='hidden'
				animate='visible'
				variants={navVariants}
				className={cn(
					'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]',
					// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional styling with background colors
					// BACKGROUND_LOGIC_REASON: Official Tailwind documentation for conditional class application - submenu open state takes priority for white background
					dropdownState.isOpen ? 'bg-white shadow-sm'
					: isScrolled ? 'bg-white shadow-sm'
					: 'bg-transparent',
					className,
				)}>
				<div className='container mx-auto px-4 lg:px-6 h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]'>
					<nav className='flex items-center justify-between h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]'>
						{/* Logo */}
						<Link
							href='/'
							className='flex items-center space-x-2 z-10'>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive height utilities with navbar proportional scaling
								// LOGO_SIZE_REASON: Official Tailwind documentation for h-<number> utilities - scaling logo to use 80-85% of navbar height (h-20/h-24 for h-24 navbar, h-24/h-28 for h-28 navbar, h-28/h-32 for h-32 navbar)
								className='relative w-48 h-[4.5rem] lg:h-[5.25rem] xl:h-[6rem]'>
								{/* CONTEXT7 SOURCE: /vercel/next.js - Dynamic image src with conditional logic based on state and homepage detection */}
								{/* REVISION REASON: Updated logo state management - colored logo on homepage OR when dropdown open OR scrolled, white logo only on non-homepage when dropdown closed AND not scrolled */}
								<Image
									src={`/images/logos/${isCurrentHomepage || dropdownState.isOpen || isScrolled ? 'logo-with-name.png' : 'logo-with-name-white.png'}`}
									alt='My Private Tutor Online'
									fill
									className='object-contain'
									priority
								/>
							</motion.div>
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-8 flex-1 justify-center'>
							{navigationData.map((item) => (
								<div
									key={item.label}
									className='relative'>
									{item.items ?
										<div
											className='relative'
											onMouseEnter={() => handleMouseEnter(item.label)}
											onMouseLeave={handleMouseLeave}>
											{/* CONTEXT7 SOURCE: /tailwindlabs/headlessui - MenuButton with custom trigger behavior */}
											{/* TRIGGER_REASON: Official Headless UI documentation for MenuButton with custom hover triggers */}
											<div className='flex items-center'>
												{item.href ?
													<Link
														href={item.href}
														className={cn(
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font family utilities for custom font application
															// FONT_FAMILY_REASON: Official Tailwind documentation for using custom font variables via font utility classes
															// CONTEXT7 SOURCE: /reactjs/react.dev - Dynamic font sizing with responsive breakpoints
															// DYNAMIC_FONT_REASON: Official React documentation for applying calculated font sizes based on available space
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font weight utilities for typography control
															// FONT_WEIGHT_UPDATE: Changed from font-medium (500) to font-normal (400) for thinner, more elegant appearance
															'flex items-center gap-1 px-2 py-1 font-normal font-display transition-all duration-200',
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard responsive font sizing
															// FONT_SIZE_REASON: Official Tailwind documentation for responsive typography without dynamic calculations
															'text-base md:text-lg lg:text-lg xl:text-xl',
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flat design color scheme with homepage-specific brand blue override
															// COLOR_REASON: Official Tailwind documentation for custom color implementation with conditional pathname-based styling
															'text-[#3F4A7E] hover:text-[#CA9E5B]',
															isCurrentHomepage ? 'text-[#3F4A7E] hover:text-[#CA9E5B]'
															: isScrolled ? 'text-[#3F4A7E]'
															: 'text-white hover:text-[#CA9E5B]',
															isActive(item.href) && 'text-[#CA9E5B]',
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
															// ACTIVE_MENU_REASON: Official Tailwind documentation for conditional styling patterns
															activeMenuItem === item.label && 'text-[#CA9E5B]',
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
															// DROPDOWN_STATE_COLOR_REASON: Official Tailwind documentation for conditional class application - navy color when dropdown is open
															dropdownState.isOpen &&
																activeMenuItem !== item.label &&
																'text-[#3F4A7E]',
														)}
														onClick={(e) => {
															// Clear any hover timeouts and close dropdown immediately when clicking
															if (hoverDelayTimeoutRef.current) {
																clearTimeout(hoverDelayTimeoutRef.current);
																hoverDelayTimeoutRef.current = null;
															}
															handleCloseDropdown();
														}}>
														{item.label}
													</Link>
												:	<button
														className={cn(
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font family utilities for custom font application
															// FONT_FAMILY_REASON: Official Tailwind documentation for using custom font variables via font utility classes
															// CONTEXT7 SOURCE: /reactjs/react.dev - Dynamic font sizing with responsive breakpoints
															// DYNAMIC_FONT_REASON: Official React documentation for applying calculated font sizes based on available space
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font weight utilities for typography control
															// FONT_WEIGHT_UPDATE: Changed from font-medium (500) to font-normal (400) for thinner, more elegant appearance
															'flex items-center gap-1 px-2 py-1 font-normal font-display transition-all duration-200',
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard responsive font sizing
															// FONT_SIZE_REASON: Official Tailwind documentation for responsive typography without dynamic calculations
															'text-base md:text-lg lg:text-lg xl:text-xl',
															'text-[#3F4A7E] hover:text-[#CA9E5B]',
															isCurrentHomepage ? 'text-[#3F4A7E] hover:text-[#CA9E5B]'
															: isScrolled ? 'text-[#3F4A7E]'
															: 'text-white hover:text-[#CA9E5B]',
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
															// ACTIVE_MENU_REASON: Official Tailwind documentation for conditional styling patterns
															activeMenuItem === item.label && 'text-[#CA9E5B]',
															// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
															// DROPDOWN_STATE_COLOR_REASON: Official Tailwind documentation for conditional class application - navy color when dropdown is open
															dropdownState.isOpen &&
																activeMenuItem !== item.label &&
																'text-[#3F4A7E]',
														)}>
														{item.label}
													</button>
												}
											</div>
										</div>
									:	<Link
											href={item.href!}
											className={cn(
												// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font family utilities for custom font application
												// FONT_FAMILY_REASON: Official Tailwind documentation for using custom font variables via font utility classes
												// CONTEXT7 SOURCE: /reactjs/react.dev - Dynamic font sizing with responsive breakpoints
												// DYNAMIC_FONT_REASON: Official React documentation for applying calculated font sizes based on available space
												// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font weight utilities for typography control
												// FONT_WEIGHT_UPDATE: Changed from font-medium (500) to font-normal (400) for thinner, more elegant appearance
												'flex items-center px-2 py-1 font-normal font-display transition-all duration-200',
												// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard responsive font sizing
												// FONT_SIZE_REASON: Official Tailwind documentation for responsive typography without dynamic calculations
												'text-base md:text-lg lg:text-lg xl:text-xl',
												'text-[#3F4A7E] hover:text-[#CA9E5B]',
												isCurrentHomepage ? 'text-[#3F4A7E] hover:text-[#CA9E5B]'
												: isScrolled ? 'text-[#3F4A7E]'
												: 'text-white hover:text-[#CA9E5B]',
												isActive(item.href!) && 'text-[#CA9E5B]',
												// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
												// DROPDOWN_STATE_COLOR_REASON: Official Tailwind documentation for conditional class application - navy color when dropdown is open
												dropdownState.isOpen && !isActive(item.href!) && 'text-[#3F4A7E]',
											)}>
											{item.label}
										</Link>
									}
								</div>
							))}
						</div>

						{/* CTA Button */}
						<div className='hidden lg:block'>
							<Link href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'>
								<InteractiveHoverButton>
									Request Free Consultation
								</InteractiveHoverButton>
							</Link>
						</div>

						{/* CONTEXT7 SOURCE: /reactjs/react.dev - Button click handler for mobile menu toggle */}
						{/* CLICK_REASON: Official React documentation onClick pattern for state updates in mobile navigation */}
						<button
							onClick={() => setIsMobileMenuOpen(true)}
							className={cn(
								'lg:hidden p-2 rounded-lg transition-colors duration-200',
								isCurrentHomepage ? 'text-[#3F4A7E] hover:bg-gray-100'
								: isScrolled ? 'text-[#3F4A7E] hover:bg-gray-100'
								: 'text-white hover:bg-white/10',
							)}
							aria-label='Open menu'>
							<MenuIcon className='h-6 w-6' />
						</button>
					</nav>
				</div>
			</motion.header>

			{/* Dropdown Overlays - Left-aligned below navbar */}
			<AnimatePresence>
				{dropdownState.isOpen && dropdownState.activeMenu && (
					<motion.div
						initial='hidden'
						animate='visible'
						exit='exit'
						variants={overlayVariants}
						className='fixed left-0 right-0 z-40'
						style={{ top: `${getNavbarHeight()}px` }}>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Positioned dropdown implementation */}
						{/* OVERLAY_REASON: Official Tailwind documentation for positioned dropdown overlay below navbar */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height utility with calc() for full viewport usage */}
						{/* HEIGHT_FIX_REASON: Official Tailwind documentation for calc() height calculations - ensuring dropdown uses full available viewport height */}
						<div className='bg-white shadow-lg'>
							{/* Dropdown Content */}
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container max-width and left alignment utilities */}
							{/* REVISION REASON: Fixed dropdown positioning - full viewport background with left-aligned content using max-w-6xl ml-auto mr-0 */}
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox layout for left-aligned content constraints */}
							{/* FLEX_CONSTRAINT_FIX: Official Tailwind documentation for flex column layout with left alignment and height distribution */}
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height calculation with overflow handling for maximum height usage */}
							{/* CONTAINER_ARCHITECTURE_FIX: Full height container with left alignment and maximized item heights */}
							<div
								className='w-full overflow-hidden flex flex-col justify-start'
								style={{ height: `calc(100vh - ${getNavbarHeight()}px)` }}>
								<div className='container mx-auto px-4 lg:px-6 h-full'>
									{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox utilities for exact navbar alignment replication */}
									{/* ALIGNMENT_FIX: Official Tailwind documentation for flex layout - replicate exact navbar structure for perfect alignment */}
									<div className='flex items-start h-full'>
										{/* Logo spacer - matches navbar logo positioning */}
										<div className='w-48 h-[4.5rem] lg:h-[5.25rem] xl:h-[6rem] flex-shrink-0' />

										{/* Navigation items area - matches navbar centering */}
										<div className='flex-1 flex justify-center'>
											<div className='flex justify-start w-full h-full relative'>
												{navigationData
													.filter(
														(item) => item.label === dropdownState.activeMenu && item.items,
													)
													.map((item) => {
														// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height distribution calculation for maximum space usage
														// HEIGHT_DISTRIBUTION_REASON: Official Tailwind documentation for equal height distribution using flex-1
														// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Large responsive font sizing for maximum space usage
														// FONT_SIZE_MAXIMIZATION: Maximum font sizes that fill allocated space - text-4xl to text-8xl range
														const itemCount = item.items!.length;

														return (
															<div
																key={item.label}
																className='w-full h-full'>
																{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flex column layout with equal height distribution */}
																{/* FLEX_LAYOUT_FIX: Official Tailwind documentation for flex column with h-full and items-stretch for maximum height usage */}
																{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding utilities for optimized top spacing */}
																{/* SPACING_OPTIMIZATION: Official Tailwind documentation for reduced padding - pt-8 (32px), pt-10 (40px), pt-12 (48px) - approximately half the previous values for better visual balance */}
																{/* CONTEXT7 SOURCE: /grx7/framer-motion - motion.div container with staggered animation variants */}
																{/* STAGGER_CONTAINER_REASON: Official Framer Motion documentation for applying parent variants to orchestrate child animations */}
																<motion.div
																	initial='hidden'
																	animate='visible'
																	variants={dropdownContainerVariants}
																	className='flex flex-col h-full items-stretch pt-8 lg:pt-10 xl:pt-12 pb-6'>
																	{item.items!.map((subItem, subIndex) => (
																		<React.Fragment key={subItem.label}>
																			{/* CONTEXT7 SOURCE: /grx7/framer-motion - motion.div item with individual animation variants */}
																			{/* STAGGER_ITEM_REASON: Official Framer Motion documentation for child item animations that inherit parent orchestration */}
																			<motion.div
																				variants={dropdownItemVariants}
																				className='flex-1'>
																				<Link
																					href={subItem.href!}
																					onClick={handleCloseDropdown}
																					className={cn(
																						// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flex utilities for equal height distribution
																						// HEIGHT_DISTRIBUTION_REASON: Official Tailwind documentation for flex-1 to distribute available height equally
																						// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flex alignment utilities for left alignment
																						// LEFT_ALIGNMENT_FIX: Official Tailwind documentation for items-center justify-start to left-align content
																						// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding utilities for exact Home link alignment
																						// ALIGNMENT_MATCH: Official Tailwind documentation for px-2 padding to match navbar Home link positioning
																						'h-full flex items-center justify-start px-2 py-4 transition-colors duration-200 group no-underline',
																						'hover:text-[#CA9E5B] hover:bg-gray-50 hover:no-underline',
																						subItem.featured &&
																							'bg-gradient-to-r from-[#3F4A7E]/5 to-[#CA9E5B]/5',
																					)}
																					style={{ textDecoration: 'none' }}
																					// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - no-underline utility class for removing text decorations
																					// REVISION_REASON: Enhanced no-underline classes to ensure no underline effects on submenu item hover states
																				>
																					<h3
																						className={cn(
																							// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Large responsive font sizing for maximum space usage
																							// FONT_SIZE_MAXIMIZATION: Official Tailwind documentation for very large typography that fills available space
																							// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Line height utilities for optimal vertical spacing
																							// LINE_HEIGHT_FIX: Official Tailwind documentation for leading-tight to optimize vertical space usage
																							'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
																							'font-normal font-display text-[#3F4A7E] hover:text-[#CA9E5B] transition-colors no-underline hover:no-underline leading-tight text-left',
																						)}
																						style={{ textDecoration: 'none' }}>
																						{subItem.label}
																					</h3>
																				</Link>
																			</motion.div>
																			{/* CONTEXT7 SOURCE: /radix-ui/react-separator - Separator component for visual organization */}
																			{/* SEPARATOR_REASON: Official Radix UI documentation for adding clean visual separation between dropdown menu items */}
																			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin utilities for separator spacing */}
																			{/* SEPARATOR_SPACING_FIX: Official Tailwind documentation for minimal margins to maximize content space */}
																			{subIndex < item.items!.length - 1 && (
																				<Separator className='bg-gray-200' />
																			)}
																		</React.Fragment>
																	))}
																</motion.div>
															</div>
														);
													})}

												{/* CUSTOM ARROW UPWARD COMPONENT: User-provided SVG arrow for collapse functionality */}
												{/* COLLAPSE_ARROW_REASON: User requested custom arrow replacement in dropdown for additional close option */}
												{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Large sizing utilities for prominent visual elements */}
												{/* SIZE_INCREASE_REASON: Official Tailwind documentation for dramatic size scaling - arrow increased to ~30% screen width for major visual prominence */}
												<div className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
													{/* CONTEXT7 SOURCE: /grx7/framer-motion - Button wrapper with hover interactions for grow upward arrow */}
													{/* BUTTON_WRAPPER_REASON: Official Framer Motion documentation for interactive button wrapper around animated SVG elements - transparent background removed */}
													<button
														onClick={handleCloseDropdown}
														className={cn(
															'flex items-center justify-center transition-all duration-200 rounded-lg',
															'text-[#3F4A7E] hover:text-[#CA9E5B]',
															'w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px]',
														)}
														aria-label='Collapse dropdown'>
														{/* CONTEXT7 SOURCE: /grx7/framer-motion - ArrowUpward with grow upward animation variants */}
														{/* GROW_ANIMATION_INTEGRATION_REASON: Official Framer Motion documentation for integrating scaleY and y transform animations with SVG components */}
														<ArrowUpward
															className='w-full h-full p-8'
															variants={arrowGrowVariants}
															initial='hidden'
															animate='visible'
														/>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering pattern for mobile menu */}
			{/* CONDITIONAL_REASON: Official React documentation pattern for conditional UI rendering based on state */}
			{isMobileMenuOpen && (
				<>
					{/* Mobile Menu Overlay */}
					<div
						className='fixed inset-0 bg-black/30 z-50'
						onClick={() => setIsMobileMenuOpen(false)}
					/>

					{/* Mobile Menu Content */}
					<div className='fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50'>
						<div className='w-full h-full'>
							<div className='flex flex-col h-full'>
								{/* Mobile Menu Header */}
								<div className='flex items-center justify-between p-6 border-b border-gray-200'>
									<h2 className='text-lg font-semibold font-display text-[#3F4A7E]'>
										Menu
									</h2>
									<button
										onClick={() => setIsMobileMenuOpen(false)}
										className='p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#3F4A7E]'
										aria-label='Close menu'>
										<X className='h-5 w-5' />
									</button>
								</div>

								{/* Mobile Menu Content */}
								<div className='flex-1 overflow-y-auto p-6'>
									<MobileNavigation
										items={navigationData}
										pathname={pathname}
										onNavigate={() => setIsMobileMenuOpen(false)}
									/>
								</div>

								{/* Mobile Menu Footer */}
								<div className='p-6 border-t border-gray-200'>
									<Link
										href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'
										className='block'>
										<InteractiveHoverButton className='w-full'>
											Request Free Consultation
										</InteractiveHoverButton>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Recursive component pattern for mobile navigation
// RECURSIVE_REASON: Official React documentation for nested navigation structures
function MobileNavigation({
	items,
	pathname,
	onNavigate,
}: {
	items: NavigationItem[];
	pathname: string;
	onNavigate: () => void;
}) {
	const [expandedItems, setExpandedItems] = useState<string[]>([]);

	const toggleExpanded = (label: string) => {
		setExpandedItems((prev) =>
			prev.includes(label) ?
				prev.filter((item) => item !== label)
			:	[...prev, label],
		);
	};

	return (
		<div className='space-y-2'>
			{items.map((item, itemIndex) => {
				const isExpanded = expandedItems.includes(item.label);
				const hasSubItems = item.items && item.items.length > 0;

				return (
					// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - border-none utility for removing borders
					// BORDER_REMOVAL_REASON: Official Tailwind documentation for removing element borders using border-none
					<div
						key={item.label}
						className='rounded-lg border-none overflow-hidden'>
						{hasSubItems ?
							<>
								<button
									onClick={() => toggleExpanded(item.label)}
									className={cn(
										'w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200',
										// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color application with royal blue
										// COLOR_REVISION_REASON: Official Tailwind documentation for applying royal blue (#3F4A7E) to mobile menu items
										'hover:bg-gray-50 text-[#3F4A7E]',
										isExpanded && 'bg-gray-50 text-[#3F4A7E]',
									)}>
									<span className='font-normal font-display text-[#3F4A7E]'>
										{item.label}
									</span>
									<ChevronRight
										className={cn(
											'h-4 w-4 transition-transform duration-200 text-[#3F4A7E]',
											isExpanded && 'rotate-90 text-[#3F4A7E]',
										)}
									/>
								</button>

								<AnimatePresence>
									{isExpanded && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.2, ease: 'easeInOut' }}
											className='ml-4 space-y-1 overflow-hidden bg-gray-50/50 pb-2'>
											{item.items.map((subItem, subIndex) => (
												<Link
													key={subItem.label}
													href={subItem.href!}
													onClick={onNavigate}
													className={cn(
														'block px-4 py-2 rounded-lg transition-colors duration-200 mx-2',
														// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color application with royal blue
														// COLOR_REVISION_REASON: Official Tailwind documentation for applying royal blue (#3F4A7E) to mobile menu items
														'hover:bg-white hover:text-[#3F4A7E] text-[#3F4A7E] no-underline hover:no-underline',
														pathname === subItem.href &&
															'bg-white text-[#3F4A7E] font-normal',
													)}
													// CONTEXT7 SOURCE: /microsoft/typescript - Optional interface properties pattern
													// REVISION REASON: Simplified mobile submenu items to show only headings, removed description text rendering
													//
													// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - no-underline utility class for removing text decorations
													// REVISION REASON: Added no-underline class to prevent underline effects on mobile submenu item hover states
												>
													<div className='text-base font-normal font-display text-[#3F4A7E]'>
														{subItem.label}
													</div>
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</>
						:	<Link
								href={item.href!}
								onClick={onNavigate}
								className={cn(
									'block px-4 py-3 transition-colors duration-200',
									// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color application with royal blue
									// COLOR_REVISION_REASON: Official Tailwind documentation for applying royal blue (#3F4A7E) to mobile menu items
									'hover:bg-gray-50 hover:text-[#3F4A7E] text-[#3F4A7E]',
									pathname === item.href && 'bg-gray-50 text-[#3F4A7E] font-normal',
								)}>
								<span className='font-normal font-display text-[#3F4A7E]'>
									{item.label}
								</span>
							</Link>
						}
					</div>
				);
			})}
		</div>
	);
}
