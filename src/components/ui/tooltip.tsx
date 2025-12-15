'use client';

import * as React from 'react';
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface TooltipContextType {
	delayDuration: number;
	skipDelayDuration: number;
	disableHoverableContent?: boolean;
}
const TooltipContext = createContext<TooltipContextType>({
	delayDuration: 700,
	skipDelayDuration: 300,
	disableHoverableContent: false,
});
interface TooltipRootContextType {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	delayDuration: number;
	disableHoverableContent?: boolean;
}
const TooltipRootContext = createContext<TooltipRootContextType | null>(null);
interface TooltipProviderProps {
	children: React.ReactNode;
	delayDuration?: number;
	skipDelayDuration?: number;
	disableHoverableContent?: boolean;
}
interface TooltipProps {
	children: React.ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	delayDuration?: number;
	disableHoverableContent?: boolean;
}
interface TooltipTriggerProps {
	children: React.ReactNode;
	asChild?: boolean;
	className?: string;
}
interface TooltipContentProps {
	children: React.ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	sideOffset?: number;
	align?: 'start' | 'center' | 'end';
	alignOffset?: number;
	className?: string;
	asChild?: boolean;
	'aria-label'?: string;
}
export function TooltipProvider({
	children,
	delayDuration = 700,
	skipDelayDuration = 300,
	disableHoverableContent = false,
}: TooltipProviderProps) {
	const contextValue = React.useMemo(
		() => ({
			delayDuration,
			skipDelayDuration,
			disableHoverableContent,
		}),
		[delayDuration, skipDelayDuration, disableHoverableContent],
	);
	return (
		<TooltipContext.Provider value={contextValue}>
			{children}
		</TooltipContext.Provider>
	);
}
export function TooltipRoot({
	children,
	defaultOpen = false,
	open: controlledOpen,
	onOpenChange,
	delayDuration: rootDelayDuration,
	disableHoverableContent: rootDisableHoverableContent,
}: TooltipProps) {
	const context = useContext(TooltipContext);
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;
	const delayDuration = rootDelayDuration ?? context.delayDuration;
	const disableHoverableContent =
		rootDisableHoverableContent ?? context.disableHoverableContent;
	const handleOpenChange = React.useCallback(
		(newOpen: boolean) => {
			if (!isControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
		},
		[isControlled, onOpenChange],
	);
	const contextValue = React.useMemo(
		() => ({
			open,
			onOpenChange: handleOpenChange,
			delayDuration,
			disableHoverableContent,
		}),
		[open, handleOpenChange, delayDuration, disableHoverableContent],
	);
	return (
		<TooltipRootContext.Provider value={contextValue}>
			{children}
		</TooltipRootContext.Provider>
	);
}
export function TooltipTrigger({
	children,
	asChild = false,
	className = '',
}: TooltipTriggerProps) {
	const context = useContext(TooltipRootContext);
	const timeoutRef = useRef<NodeJS.Timeout>();
	const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
	const triggerRef = useRef<HTMLElement>(null);
	if (!context) {
		throw new Error('TooltipTrigger must be used within TooltipRoot');
	}
	const { open, onOpenChange, delayDuration } = context;
	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			if (triggerRef.current) {
				setTriggerRect(triggerRef.current.getBoundingClientRect());
			}
			onOpenChange(true);
		}, delayDuration);
	};
	const handleMouseLeave = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		onOpenChange(false);
	};
	const handleFocus = () => {
		if (triggerRef.current) {
			setTriggerRect(triggerRef.current.getBoundingClientRect());
		}
		onOpenChange(true);
	};
	const handleBlur = () => {
		onOpenChange(false);
	};
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape' && open) {
			onOpenChange(false);
		}
	};
	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	React.useEffect(() => {
		if (context && triggerRect) {
			(context as any).triggerRect = triggerRect;
		}
	}, [context, triggerRect]);
	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children, {
			ref: triggerRef as any,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onFocus: handleFocus,
			onBlur: handleBlur,
			onKeyDown: handleKeyDown,
			'data-state': open ? 'open' : 'closed',
			'aria-describedby': open ? 'tooltip-content' : undefined,
		});
	}
	return (
		<button
			ref={triggerRef as React.RefObject<HTMLButtonElement>}
			className={`inline-flex items-center justify-center ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
			data-state={open ? 'open' : 'closed'}
			aria-describedby={open ? 'tooltip-content' : undefined}
			type='button'>
			{children}
		</button>
	);
}
export function TooltipContent({
	children,
	side = 'top',
	sideOffset = 4,
	align = 'center',
	alignOffset = 0,
	className = '',
	'aria-label': ariaLabel,
}: TooltipContentProps) {
	const context = useContext(TooltipRootContext);
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});
	if (!context) {
		throw new Error('TooltipContent must be used within TooltipRoot');
	}
	const { open } = context;
	const triggerRect = (context as any).triggerRect as DOMRect | undefined;
	React.useEffect(() => {
		if (open && triggerRect) {
			let x = triggerRect.left + triggerRect.width / 2;
			let y = triggerRect.top;
			switch (side) {
				case 'top':
					y = triggerRect.top - sideOffset;
					break;
				case 'bottom':
					y = triggerRect.bottom + sideOffset;
					break;
				case 'left':
					x = triggerRect.left - sideOffset;
					y = triggerRect.top + triggerRect.height / 2;
					break;
				case 'right':
					x = triggerRect.right + sideOffset;
					y = triggerRect.top + triggerRect.height / 2;
					break;
			}
			switch (align) {
				case 'start':
					if (side === 'top' || side === 'bottom') {
						x = triggerRect.left + alignOffset;
					} else {
						y = triggerRect.top + alignOffset;
					}
					break;
				case 'end':
					if (side === 'top' || side === 'bottom') {
						x = triggerRect.right - alignOffset;
					} else {
						y = triggerRect.bottom - alignOffset;
					}
					break;
				case 'center':
				default:
					if (side === 'top' || side === 'bottom') {
						x += alignOffset;
					} else {
						y += alignOffset;
					}
					break;
			}
			setPosition({
				x,
				y,
			});
		}
	}, [open, triggerRect, side, sideOffset, align, alignOffset]);
	if (!open || typeof window === 'undefined') {
		return null;
	}
	const getTransformOrigin = () => {
		switch (side) {
			case 'top':
				return 'bottom';
			case 'bottom':
				return 'top';
			case 'left':
				return 'right';
			case 'right':
				return 'left';
			default:
				return 'bottom';
		}
	};
	const getTranslateClasses = () => {
		switch (side) {
			case 'top':
				return (
					align === 'start' ? '-translate-x-0'
					: align === 'end' ? '-translate-x-full'
					: '-translate-x-1/2'
				);
			case 'bottom':
				return (
					align === 'start' ? '-translate-x-0'
					: align === 'end' ? '-translate-x-full'
					: '-translate-x-1/2'
				);
			case 'left':
				return (
					align === 'start' ? '-translate-y-0'
					: align === 'end' ? '-translate-y-full'
					: '-translate-y-1/2'
				);
			case 'right':
				return (
					align === 'start' ? '-translate-y-0'
					: align === 'end' ? '-translate-y-full'
					: '-translate-y-1/2'
				);
			default:
				return '-translate-x-1/2';
		}
	};
	return (
		<AnimatePresence>
			<motion.div
				id='tooltip-content'
				role='tooltip'
				aria-label={ariaLabel}
				className={`fixed z-50 px-3 py-1.5 text-sm text-white bg-slate-900 rounded-md shadow-lg pointer-events-none transform ${getTranslateClasses()} ${className}`}
				style={{
					left: position.x,
					top:
						side === 'top' ? position.y
						: side === 'bottom' ? position.y
						: position.y,
					transformOrigin: getTransformOrigin(),
				}}
				data-state={open ? 'open' : 'closed'}
				data-side={side}
				data-align={align}
				initial={{
					opacity: 0,
					scale: 0.95,
				}}
				animate={{
					opacity: 1,
					scale: 1,
				}}
				exit={{
					opacity: 0,
					scale: 0.95,
				}}
				transition={{
					duration: 0.15,
					ease: 'easeOut',
				}}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
interface LegacyTooltipProps {
	content: string;
	children: React.ReactNode;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	delay?: number;
	className?: string;
}
function Tooltip({
	content,
	children,
	placement = 'top',
	delay = 500,
	className = '',
}: LegacyTooltipProps) {
	return (
		<TooltipProvider delayDuration={delay}>
			<TooltipRoot>
				<TooltipTrigger asChild>
					<div className='inline-block'>{children}</div>
				</TooltipTrigger>
				<TooltipContent
					side={placement}
					className={className}>
					{content}
				</TooltipContent>
			</TooltipRoot>
		</TooltipProvider>
	);
}
