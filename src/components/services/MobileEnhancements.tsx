'use client';

import { useEffect, useState, useCallback } from 'react';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';
interface TouchState {
	isTouching: boolean;
	touchStartX: number;
	touchStartY: number;
	swipeDirection: 'left' | 'right' | 'up' | 'down' | null;
}
interface ViewportInfo {
	width: number;
	height: number;
	isMobile: boolean;
	isTablet: boolean;
	isLandscape: boolean;
	pixelRatio: number;
}
export function MobileEnhancements() {
	const [touchState, setTouchState] = useState<TouchState>({
		isTouching: false,
		touchStartX: 0,
		touchStartY: 0,
		swipeDirection: null,
	});
	const [viewportInfo, setViewportInfo] = useState<ViewportInfo>({
		width: 0,
		height: 0,
		isMobile: false,
		isTablet: false,
		isLandscape: false,
		pixelRatio: 1,
	});
	const touchX = useMotionValue(0);
	const touchY = useMotionValue(0);
	const touchVelocityX = useSpring(touchX, {
		stiffness: 300,
		damping: 30,
	});
	const touchVelocityY = useSpring(touchY, {
		stiffness: 300,
		damping: 30,
	});
	const updateViewportInfo = useCallback(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const pixelRatio = window.devicePixelRatio || 1;
		setViewportInfo({
			width,
			height,
			isMobile: width < 768,
			isTablet: width >= 768 && width < 1024,
			isLandscape: width > height,
			pixelRatio,
		});
		if (typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--viewport-width', `${width}px`);
			document.documentElement.style.setProperty(
				'--viewport-height',
				`${height}px`,
			);
			document.documentElement.style.setProperty('--pixel-ratio', `${pixelRatio}`);
		}
	}, []);
	const handleTouchStart = useCallback(
		(e: TouchEvent) => {
			const touch = e.touches[0];
			setTouchState({
				isTouching: true,
				touchStartX: touch.clientX,
				touchStartY: touch.clientY,
				swipeDirection: null,
			});
			touchX.set(touch.clientX);
			touchY.set(touch.clientY);
		},
		[touchX, touchY],
	);
	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (!touchState.isTouching) return;
			const touch = e.touches[0];
			const deltaX = touch.clientX - touchState.touchStartX;
			const deltaY = touch.clientY - touchState.touchStartY;
			touchX.set(touch.clientX);
			touchY.set(touch.clientY);
			if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
				let direction: 'left' | 'right' | 'up' | 'down' | null = null;
				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					direction = deltaX > 0 ? 'right' : 'left';
				} else {
					direction = deltaY > 0 ? 'down' : 'up';
				}
				setTouchState((prev) => ({
					...prev,
					swipeDirection: direction,
				}));
			}
			const target = e.target as HTMLElement;
			if (
				target.closest('.MuiAccordion-root') &&
				Math.abs(deltaX) > Math.abs(deltaY)
			) {
				e.preventDefault();
			}
		},
		[
			touchState.isTouching,
			touchState.touchStartX,
			touchState.touchStartY,
			touchX,
			touchY,
		],
	);
	const handleTouchEnd = useCallback(() => {
		setTouchState((prev) => ({
			...prev,
			isTouching: false,
		}));
		if (touchState.swipeDirection) {
			if (typeof window !== 'undefined' && (window as any).va) {
				(window as any).va('track', 'Mobile Swipe', {
					direction: touchState.swipeDirection,
					page: 'services',
				});
			}
		}
	}, [touchState.swipeDirection]);
	const optimizeTouchInteractions = useCallback(() => {
		if (!viewportInfo.isMobile && !viewportInfo.isTablet) return;
		document.body.classList.add('touch-device');
		const buttons = document.querySelectorAll('button, a');
		buttons.forEach((button) => {
			const rect = button.getBoundingClientRect();
			if (rect.height < 44 || rect.width < 44) {
				(button as HTMLElement).style.minHeight = '44px'(
					button as HTMLElement,
				).style.minWidth = '44px';
			}
		});
		const accordionSummaries = document.querySelectorAll(
			'.MuiAccordionSummary-root',
		);
		accordionSummaries.forEach((summary) => {
			(summary as HTMLElement).style.minHeight =
				'56px'(summary as HTMLElement).style.paddingTop =
				'12px'(summary as HTMLElement).style.paddingBottom =
					'12px';
		});
		if ('vibrate' in navigator) {
			const interactiveElements = document.querySelectorAll(
				'button, .MuiAccordionSummary-root',
			);
			interactiveElements.forEach((element) => {
				element.addEventListener('click', () => {
					navigator.vibrate(10);
				});
			});
		}
	}, [viewportInfo.isMobile, viewportInfo.isTablet]);
	const optimizeAnimationsForMobile = useCallback(() => {
		if (!viewportInfo.isMobile) return;
		const animatedElements = document.querySelectorAll('[data-framer-motion-id]');
		animatedElements.forEach((element) => {
			const el = element as HTMLElement;
			if (el.style.transform && el.style.transform.includes('translate3d')) {
				el.style.willChange = 'transform';
			}
		});
		const parallaxElements = document.querySelectorAll('[data-parallax]');
		parallaxElements.forEach((element) => {
			(element as HTMLElement).style.transform = 'none';
		});
		const globe = document.querySelector('canvas');
		if (globe && viewportInfo.pixelRatio > 2) {
			const context = (globe as HTMLCanvasElement).getContext('2d');
			if (context) {
				context.imageSmoothingEnabled = true;
				context.imageSmoothingQuality = 'low';
			}
		}
	}, [viewportInfo.isMobile, viewportInfo.pixelRatio]);
	const handleOrientationChange = useCallback(() => {
		updateViewportInfo();
		if (viewportInfo.isMobile && viewportInfo.isLandscape) {
			document.body.classList.add('mobile-landscape');
			const heroSection = document.querySelector('.min-h-screen');
			if (heroSection) {
				(heroSection as HTMLElement).style.minHeight = '60vh';
			}
		} else {
			document.body.classList.remove('mobile-landscape');
		}
		if (typeof window !== 'undefined' && (window as any).va) {
			(window as any).va('track', 'Orientation Change', {
				orientation: viewportInfo.isLandscape ? 'landscape' : 'portrait',
				page: 'services',
			});
		}
	}, [updateViewportInfo, viewportInfo.isMobile, viewportInfo.isLandscape]);
	const optimizeScrollPerformance = useCallback(() => {
		if (!viewportInfo.isMobile) return;
		let scrollTimeout: NodeJS.Timeout;
		let isScrolling = false;
		const handleScroll = () => {
			if (!isScrolling) {
				document.body.classList.add('is-scrolling');
				isScrolling = true;
			}
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				document.body.classList.remove('is-scrolling');
				isScrolling = false;
			}, 150);
		};
		window.addEventListener('scroll', handleScroll, {
			passive: true,
		});
		const scrollContainers = document.querySelectorAll(
			'.overflow-auto, .overflow-y-auto',
		);
		scrollContainers.forEach((container) => {
			(container as HTMLElement).style.webkitOverflowScrolling = 'touch';
		});
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(scrollTimeout);
		};
	}, [viewportInfo.isMobile]);
	useEffect(() => {
		updateViewportInfo();
		optimizeTouchInteractions();
		optimizeAnimationsForMobile();
		const scrollCleanup = optimizeScrollPerformance();
		window.addEventListener('resize', updateViewportInfo);
		window.addEventListener('orientationchange', handleOrientationChange);
		document.addEventListener('touchstart', handleTouchStart, {
			passive: true,
		});
		document.addEventListener('touchmove', handleTouchMove, {
			passive: false,
		});
		document.addEventListener('touchend', handleTouchEnd, {
			passive: true,
		});
		if (viewportInfo.isMobile || viewportInfo.isTablet) {
			const style = document.createElement('style');
			style.textContent = `
        /* Mobile-optimized styles */
        .touch-device * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          -webkit-touch-callout: none;
        }
        
        .is-scrolling .MagicUIGlobe,
        .is-scrolling .ant-charts-gauge,
        .is-scrolling .ant-charts-liquid,
        .is-scrolling .ant-charts-radar {
          animation-play-state: paused !important;
        }
        
        .mobile-landscape .min-h-screen {
          min-height: 60vh !important;
        }
        
        @media (hover: none) and (pointer: coarse) {
          button:active {
            transform: scale(0.98);
          }
          
          .MuiAccordionSummary-root:active {
            background-color: rgba(0, 0, 0, 0.04);
          }
        }
        
        /* Optimize font rendering on mobile */
        @media (max-width: 768px) {
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          
          /* Reduce animation complexity */
          * {
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
          }
        }
      `;
			document.head.appendChild(style);
		}
		return () => {
			window.removeEventListener('resize', updateViewportInfo);
			window.removeEventListener('orientationchange', handleOrientationChange);
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
			scrollCleanup?.();
		};
	}, [
		updateViewportInfo,
		optimizeTouchInteractions,
		optimizeAnimationsForMobile,
		optimizeScrollPerformance,
		handleOrientationChange,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		viewportInfo.isMobile,
		viewportInfo.isTablet,
	]);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			(window as any).mobileInfo = {
				...viewportInfo,
				touchState,
			};
		}
	}, [viewportInfo, touchState]);
	return null;
}
