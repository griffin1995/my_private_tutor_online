'use client';

import ArrowUpward from '@/components/ui/arrow-upward';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
	AnimatePresence,
	easeOut,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import { ChevronRight, Menu as MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import {
	MAIN_NAVIGATION_ITEMS,
	MOBILE_NAVIGATION_ITEMS,
	type NavigationItem as NavItem,
} from '@/content/navigation-content';

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
	showBlueNavigation?: boolean;
}

interface DropdownState {
	isOpen: boolean;
	activeMenu: string | null;
}

// Use imported navigation data from navigation-content.ts
const navigationData: NavigationItem[] = MAIN_NAVIGATION_ITEMS as unknown as NavigationItem[];
const navigationDataMobile: NavigationItem[] = MAIN_NAVIGATION_ITEMS as unknown as NavigationItem[];
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
			ease: easeOut,
		},
	},
};
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
export function Navigation({ className, showBlueNavigation = false }: NavigationProps) {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [dropdownState, setDropdownState] = useState<DropdownState>({
		isOpen: false,
		activeMenu: null,
	});
	const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
	const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, 'change', (latest) => {
		setIsScrolled(latest > 50);
	});
	const hoverDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	// 'On Hover' Sub Menu functionality'
	// const handleMouseEnter = (menuLabel: string) => {
	// 	if (dropdownTimeoutRef.current) {
	// 		clearTimeout(dropdownTimeoutRef.current);
	// 		dropdownTimeoutRef.current = null;
	// 	}
	// 	if (hoverDelayTimeoutRef.current) {
	// 		clearTimeout(hoverDelayTimeoutRef.current);
	// 		hoverDelayTimeoutRef.current = null;
	// 	}
	// 	hoverDelayTimeoutRef.current = setTimeout(() => {
	// 		setDropdownState({
	// 			isOpen: true,
	// 			activeMenu: menuLabel,
	// 		});
	// 		setActiveMenuItem(menuLabel);
	// 		hoverDelayTimeoutRef.current = null;
	// 	}, 300);
	// };
	// const handleMouseLeave = () => {
	// 	if (hoverDelayTimeoutRef.current) {
	// 		clearTimeout(hoverDelayTimeoutRef.current);
	// 		hoverDelayTimeoutRef.current = null;
	// 	}
	// 	dropdownTimeoutRef.current = setTimeout(() => {}, 100);
	// };
	const handleToggleDropdown = (menuLabel: string) => {
		if (hoverDelayTimeoutRef.current) {
			clearTimeout(hoverDelayTimeoutRef.current);
			hoverDelayTimeoutRef.current = null;
		}
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
			dropdownTimeoutRef.current = null;
		}
		if (dropdownState.isOpen && dropdownState.activeMenu === menuLabel) {
			setDropdownState({
				isOpen: false,
				activeMenu: null,
			});
			setActiveMenuItem(null);
		} else {
			setDropdownState({
				isOpen: true,
				activeMenu: menuLabel,
			});
			setActiveMenuItem(menuLabel);
		}
	};
	const handleCloseDropdown = () => {
		if (hoverDelayTimeoutRef.current) {
			clearTimeout(hoverDelayTimeoutRef.current);
			hoverDelayTimeoutRef.current = null;
		}
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
			dropdownTimeoutRef.current = null;
		}
		setDropdownState({
			isOpen: false,
			activeMenu: null,
		});
		setActiveMenuItem(null);
	};
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);
	useEffect(() => {
		return () => {
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
	const isActive = (href: string) => {
		if (href === '/') return pathname === '/' || pathname === '/en-GB';
		return pathname.startsWith(href);
	};
	const showBlueNavStyling = showBlueNavigation || pathname === '/' || pathname === '/en-GB';
	const getNavbarHeight = () => {
		return 88;
	};
	return (
		<>
			<motion.header
				initial='hidden'
				animate='visible'
				variants={navVariants}
				className={cn(
					'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]',
					dropdownState.isOpen
						? 'bg-white shadow-sm'
						: isScrolled
						? 'bg-white shadow-sm'
						: 'bg-transparent',
					className,
				)}>
				<div className='container mx-auto px-4 lg:px-6 h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]'>
					<nav className='flex items-center justify-between h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]'>
						<div className='min-w-48'>
							<Link
								href='/'
								className='flex items-center space-x-2 z-10'>
								<motion.div
									whileHover={{
										scale: 1.05,
									}}
									whileTap={{
										scale: 0.95,
									}}
									className='relative w-48 h-[4.5rem] lg:h-[5.25rem] xl:h-[6rem]'>
									<Image
										src={`/images/logos/${
											showBlueNavStyling || dropdownState.isOpen || isScrolled
												? 'logo-with-name.png'
												: 'logo-with-name-white.png'
										}`}
										alt='My Private Tutor Online'
										fill
										className='object-contain'
										priority
									/>
								</motion.div>
							</Link>
						</div>

						<div className='hidden 2xl:flex items-center flex-1 justify-center space-x-8'>
							{navigationData.map((item) => (
								<div
									key={item.label}
									className='relative'>
									{item.items ? (
										<div className='relative'>
											<div className='flex items-center'>
												{item.href ? (
													<Link
														href={item.href}
														className={cn(
															'flex items-center gap-1 px-2 py-1 font-normal font-display transition-all duration-200',
															'text-base md:text-lg lg:text-lg xl:text-xl',
															'text-primary-700 hover:text-accent-600',
															showBlueNavStyling
																? 'text-primary-700 hover:text-accent-600'
																: isScrolled
																? 'text-primary-700'
																: 'text-white hover:text-accent-600',
															isActive(item.href) && 'text-accent-600',
															activeMenuItem === item.label && 'text-accent-600',
															dropdownState.isOpen &&
																activeMenuItem !== item.label &&
																'text-primary-700',
														)}
														onClick={(e) => {
															e.preventDefault();
															handleToggleDropdown(item.label);
														}}>
														{item.label}
													</Link>
												) : (
													<button
														className={cn(
															'flex items-center gap-1 px-2 py-1 font-normal font-display transition-all duration-200',
															'text-base md:text-lg lg:text-lg xl:text-xl',
															'text-primary-700 hover:text-accent-600',
															showBlueNavStyling
																? 'text-primary-700 hover:text-accent-600'
																: isScrolled
																? 'text-primary-700'
																: 'text-white hover:text-accent-600',
															activeMenuItem === item.label && 'text-accent-600',
															dropdownState.isOpen &&
																activeMenuItem !== item.label &&
																'text-primary-700',
														)}
														onClick={() => {
															handleToggleDropdown(item.label);
														}}>
														{item.label}
													</button>
												)}
											</div>
										</div>
									) : (
										<Link
											href={item.href!}
											className={cn(
												'flex items-center px-2 py-1 font-normal font-display transition-all duration-200',
												'text-base md:text-lg lg:text-lg xl:text-xl',
												'text-primary-700 hover:text-accent-600',
												showBlueNavStyling
													? 'text-primary-700 hover:text-accent-600'
													: isScrolled
													? 'text-primary-700'
													: 'text-white hover:text-accent-600',
												isActive(item.href!) && 'text-accent-600',
												dropdownState.isOpen && !isActive(item.href!) && 'text-primary-700',
											)}>
											{item.label}
										</Link>
									)}
								</div>
							))}
						</div>

						<div className='hidden 2xl:flex min-w-48 justify-end'>
							<Button
								asChild
								variant='outline'
								className={cn(
									'rounded-none border transition-all duration-300',
									'text-sm md:text-base lg:text-base xl:text-lg font-normal font-display',
									showBlueNavStyling
										? 'border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white'
										: isScrolled
										? 'border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white'
										: 'border-white text-white hover:bg-white hover:text-primary-700',
								)}>
								<Link href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'>
									Request Free Consultation
								</Link>
							</Button>
						</div>

						<button
							onClick={() => setIsMobileMenuOpen(true)}
							className={cn(
								'2xl:hidden p-2 rounded-lg transition-colors duration-200',
								showBlueNavStyling
									? 'text-primary-700 hover:bg-gray-100'
									: isScrolled
									? 'text-primary-700 hover:bg-gray-100'
									: 'text-white hover:bg-white/10',
							)}
							aria-label='Open menu'>
							<MenuIcon className='h-6 w-6' />
						</button>
					</nav>
				</div>
			</motion.header>

			<AnimatePresence>
				{dropdownState.isOpen && dropdownState.activeMenu && (
					<motion.div
						initial='hidden'
						animate='visible'
						exit='exit'
						variants={overlayVariants}
						className='fixed left-0 right-0 z-40'
						style={{
							top: `${getNavbarHeight()}px`,
						}}>
						<div className='bg-white shadow-lg'>
							<div
								className='w-full overflow-hidden flex flex-col justify-start'
								style={{
									height: `calc(100vh - ${getNavbarHeight()}px)`,
								}}>
								<div className='container mx-auto px-4 lg:px-6 h-full'>
									<div className='flex items-start h-full'>
										<div className='w-48 h-[4.5rem] lg:h-[5.25rem] xl:h-[6rem] flex-shrink-0' />

										<div className='flex-1 flex justify-center'>
											<div className='flex justify-start w-full h-full relative'>
												{navigationData
													.filter(
														(item) => item.label === dropdownState.activeMenu && item.items,
													)
													.map((item) => {
														const itemCount = item.items!.length;
														return (
															<div
																key={item.label}
																className='w-full h-full'>
																<motion.div
																	initial='hidden'
																	animate='visible'
																	variants={dropdownContainerVariants}
																	className='flex flex-col h-full items-stretch pt-8 lg:pt-10 xl:pt-12 pb-6'>
																	{item.items!.map((subItem, subIndex) => (
																		<React.Fragment key={subItem.label}>
																			<motion.div
																				variants={dropdownItemVariants}
																				className='flex-1'>
																				<Link
																					href={subItem.href!}
																					onClick={handleCloseDropdown}
																					className={cn(
																						'h-full flex items-center justify-start px-2 py-4 transition-colors duration-200 group no-underline',
																						'hover:text-accent-600 hover:bg-gray-50 hover:no-underline',
																						subItem.featured &&
																							'bg-gradient-to-r from-primary-700/5 to-accent-600/5',
																					)}
																					style={{
																						textDecoration: 'none',
																					}}>
																					<h3
																						className={cn(
																							'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
																							'font-normal font-display text-primary-700 hover:text-accent-600 transition-colors no-underline hover:no-underline leading-tight text-left',
																						)}
																						style={{
																							textDecoration: 'none',
																						}}>
																						{subItem.label}
																					</h3>
																				</Link>
																			</motion.div>
																			{subIndex < item.items!.length - 1 && (
																				<Separator className='bg-gray-200' />
																			)}
																		</React.Fragment>
																	))}
																</motion.div>
															</div>
														);
													})}

												<div className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
													<button
														onClick={handleCloseDropdown}
														className={cn(
															'flex items-center justify-center transition-all duration-200 rounded-lg',
															'text-primary-700 hover:text-accent-600',
															'w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px]',
														)}
														aria-label='Collapse dropdown'>
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

			{isMobileMenuOpen && (
				<>
					<div
						className='fixed inset-0 bg-black/30 z-50'
						onClick={() => setIsMobileMenuOpen(false)}
					/>

					<div className='fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50'>
						<div className='w-full h-full'>
							<div className='flex flex-col h-full'>
								<div className='flex items-center justify-between p-6 border-b border-gray-200'>
									<h2 className='text-lg font-semibold font-display text-primary-700'>
										Menu
									</h2>
									<button
										onClick={() => setIsMobileMenuOpen(false)}
										className='p-2 rounded-lg hover:bg-gray-100 transition-colors text-primary-700'
										aria-label='Close menu'>
										<X className='h-5 w-5' />
									</button>
								</div>

								<div className='flex-1 overflow-y-auto p-6'>
									<MobileNavigation
										items={navigationData}
										pathname={pathname}
										onNavigate={() => setIsMobileMenuOpen(false)}
									/>
								</div>

								<div className='p-6 border-t border-gray-200'>
									<Button
										asChild
										variant='outline'
										className={cn(
											'w-full rounded-none border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white transition-all duration-300',
											'text-sm md:text-base lg:text-base xl:text-lg font-normal font-display',
										)}>
										<Link href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'>
											Request Free Consultation
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
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
			prev.includes(label)
				? prev.filter((item) => item !== label)
				: [...prev, label],
		);
	};
	return (
		<div className='space-y-2'>
			{items.map((item, itemIndex) => {
				const isExpanded = expandedItems.includes(item.label);
				const hasSubItems = item.items && item.items.length > 0;
				return (
					<div
						key={item.label}
						className='rounded-lg border-none overflow-hidden'>
						{hasSubItems ? (
							<>
								<button
									onClick={() => toggleExpanded(item.label)}
									className={cn(
										'w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200',
										'hover:bg-gray-50 text-primary-700',
										isExpanded && 'bg-gray-50 text-primary-700',
									)}>
									<span className='font-normal font-display text-primary-700'>
										{item.label}
									</span>
									<ChevronRight
										className={cn(
											'h-4 w-4 transition-transform duration-200 text-primary-700',
											isExpanded && 'rotate-90 text-primary-700',
										)}
									/>
								</button>

								<AnimatePresence>
									{isExpanded && (
										<motion.div
											initial={{
												height: 0,
												opacity: 0,
											}}
											animate={{
												height: 'auto',
												opacity: 1,
											}}
											exit={{
												height: 0,
												opacity: 0,
											}}
											transition={{
												duration: 0.2,
												ease: 'easeInOut',
											}}
											className='ml-4 space-y-1 overflow-hidden bg-gray-50/50 pb-2'>
											{item.items.map((subItem, subIndex) => (
												<Link
													key={subItem.label}
													href={subItem.href!}
													onClick={onNavigate}
													className={cn(
														'block px-4 py-2 rounded-lg transition-colors duration-200 mx-2',
														'hover:bg-white hover:text-primary-700 text-primary-700 no-underline hover:no-underline',
														pathname === subItem.href &&
															'bg-white text-primary-700 font-normal',
													)}>
													<div className='text-base font-normal font-display text-primary-700'>
														{subItem.label}
													</div>
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</>
						) : (
							<Link
								href={item.href!}
								onClick={onNavigate}
								className={cn(
									'block px-4 py-3 transition-colors duration-200',
									'hover:bg-gray-50 hover:text-primary-700 text-primary-700',
									pathname === item.href && 'bg-gray-50 text-primary-700 font-normal',
								)}>
								<span className='font-normal font-display text-primary-700'>
									{item.label}
								</span>
							</Link>
						)}
					</div>
				);
			})}
		</div>
	);
}
