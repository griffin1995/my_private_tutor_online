// CONTEXT7 SOURCE: Enhanced Avatar Component - Radix UI with Flowbite Compatibility
// Advanced TypeScript implementation with Flowbite API compatibility
// Part of Phase 2 Bundle Optimization: Flowbite React Replacement

'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

// ============================================================================
// ADVANCED TYPESCRIPT TYPES FOR FLOWBITE COMPATIBILITY
// ============================================================================

// Flowbite Avatar size mapping
type FlowbiteAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type FlowbiteAvatarStatus = 'online' | 'offline' | 'away' | 'busy';

// Size configuration matching Flowbite dimensions
const flowbiteSizeConfig = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-20 w-20',
  xl: 'h-36 w-36',
} as const;

// Status indicator styles
const statusIndicatorConfig = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  away: 'bg-yellow-400',
  busy: 'bg-red-400',
} as const;

// Flowbite-compatible Avatar props
interface FlowbiteAvatarProps extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, 'size'> {
  readonly img?: string;
  readonly alt?: string;
  readonly size?: FlowbiteAvatarSize;
  readonly rounded?: boolean;
  readonly bordered?: boolean;
  readonly status?: FlowbiteAvatarStatus;
  readonly statusPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  readonly initials?: string;
}

// ============================================================================
// CORE RADIX UI AVATAR COMPONENTS (ENHANCED)
// ============================================================================

const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
			className,
		)}
		{...props}
	/>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn('aspect-square h-full w-full object-cover', className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			'flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-700 font-medium',
			className,
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// ============================================================================
// FLOWBITE-COMPATIBLE AVATAR COMPONENT
// ============================================================================

const FlowbiteCompatibleAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  FlowbiteAvatarProps
>(({
  img,
  alt = '',
  size = 'md',
  rounded = true,
  bordered = false,
  status,
  statusPosition = 'bottom-right',
  initials,
  className,
  children,
  ...props
}, ref) => {
  // Generate initials from alt text if not provided
  const displayInitials = initials || alt
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Status indicator position classes
  const statusPositionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <div className="relative inline-block">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden',
          flowbiteSizeConfig[size],
          rounded ? 'rounded-full' : 'rounded-lg',
          bordered && 'ring-2 ring-white shadow-lg',
          className,
        )}
        {...props}
      >
        {img && (
          <AvatarPrimitive.Image
            src={img}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
        )}

        <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-700 font-medium text-sm">
          {displayInitials || '??'}
        </AvatarPrimitive.Fallback>

        {children}
      </AvatarPrimitive.Root>

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            'absolute block h-2.5 w-2.5 rounded-full ring-2 ring-white',
            statusIndicatorConfig[status],
            statusPositionClasses[statusPosition]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
});

FlowbiteCompatibleAvatar.displayName = 'FlowbiteCompatibleAvatar';

// ============================================================================
// EXPORTS WITH FLOWBITE COMPATIBILITY
// ============================================================================

// Export original Radix components for advanced usage
export { Avatar, AvatarImage, AvatarFallback };

// Export Flowbite-compatible component as default Avatar replacement
export { FlowbiteCompatibleAvatar };

// Export types for TypeScript users
export type { FlowbiteAvatarProps, FlowbiteAvatarSize, FlowbiteAvatarStatus };

// Default export for easy replacement
export default FlowbiteCompatibleAvatar;
