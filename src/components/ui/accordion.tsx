'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn(
			'border-b border-slate-200/50 transition-all duration-300',
			'hover:border-slate-300/70 [&[data-state=open]]:border-blue-200',
			'last:border-b-0 relative',
			'print:border-slate-400 print:hover:border-slate-400',
			className,
		)}
		{...props}
	/>
));
AccordionItem.displayName = 'AccordionItem';
const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className='flex'>
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex flex-1 items-center justify-between py-4 font-medium transition-all duration-300 ease-out',
				'hover:bg-gradient-to-r hover:from-slate-50/80 hover:to-transparent',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
				'group relative overflow-hidden',
				'[&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:text-blue-600',
				'print:hover:bg-transparent print:focus-visible:ring-0',
				className,
			)}
			{...props}>
			{}
			<div className='absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/5 to-blue-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 print:hidden' />
			<span className='relative z-10 flex-1 text-left'>{children}</span>
			<ChevronDown className='relative z-10 h-4 w-4 shrink-0 transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-blue-500 print:group-hover:scale-100' />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className={cn(
			'overflow-hidden text-sm transition-all duration-300 ease-out',
			'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
			'motion-reduce:transition-none motion-reduce:animate-none',
			'print:overflow-visible print:animate-none',
		)}
		{...props}>
		<div className={cn('pb-4 pt-0 relative', className)}>
			{}
			<div className='animate-fade-in-up print:animate-none'>{children}</div>
		</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
