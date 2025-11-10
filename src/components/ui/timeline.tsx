// CONTEXT7 SOURCE: Custom Timeline Component - Replacing Flowbite Timeline
// Advanced TypeScript implementation with type-safe props and constraints
// Part of Phase 2 Bundle Optimization: Flowbite React Replacement

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';

// ============================================================================
// ADVANCED TYPESCRIPT TYPES FOR TYPE-SAFE TIMELINE COMPONENT
// ============================================================================

// Discriminated union for timeline item variants
type TimelineVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

// Conditional type for icon requirements based on variant
type TimelineIconProps<T extends TimelineVariant> =
  T extends 'default'
    ? { icon?: ReactNode }
    : { icon: ReactNode };

// Mapped type for variant-specific styling
type TimelineVariantStyles = {
  readonly [K in TimelineVariant]: {
    readonly dot: string;
    readonly line: string;
    readonly content: string;
  };
};

// Template literal type for dynamic CSS classes
type TimelinePosition = 'left' | 'right' | 'center';
type TimelineSize = 'sm' | 'md' | 'lg';

// Utility type for extracting timeline configuration
interface TimelineConfig {
  readonly variant: TimelineVariant;
  readonly position: TimelinePosition;
  readonly size: TimelineSize;
  readonly showConnector: boolean;
}

// Generic timeline item with type constraints
interface TimelineItemData<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date?: string;
  readonly variant?: TimelineVariant;
  readonly icon?: ReactNode;
  readonly metadata?: T;
}

// Props interface with conditional typing
interface TimelineProps<T extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  readonly items: readonly TimelineItemData<T>[];
  readonly variant?: TimelineVariant;
  readonly position?: TimelinePosition;
  readonly size?: TimelineSize;
  readonly showConnector?: boolean;
  readonly renderItem?: (item: TimelineItemData<T>, index: number) => ReactNode;
}

// ============================================================================
// VARIANT STYLING CONFIGURATION
// ============================================================================

const timelineVariantStyles: TimelineVariantStyles = {
  default: {
    dot: 'bg-neutral-200 border-neutral-300',
    line: 'bg-neutral-200',
    content: 'text-neutral-700',
  },
  primary: {
    dot: 'bg-primary-600 border-primary-700',
    line: 'bg-primary-200',
    content: 'text-primary-800',
  },
  success: {
    dot: 'bg-green-500 border-green-600',
    line: 'bg-green-200',
    content: 'text-green-800',
  },
  warning: {
    dot: 'bg-yellow-500 border-yellow-600',
    line: 'bg-yellow-200',
    content: 'text-yellow-800',
  },
  error: {
    dot: 'bg-red-500 border-red-600',
    line: 'bg-red-200',
    content: 'text-red-800',
  },
} as const;

// Size configuration with template literal types
const sizeConfig = {
  sm: {
    dot: 'w-3 h-3',
    content: 'ml-4 text-sm',
    spacing: 'pb-4',
  },
  md: {
    dot: 'w-4 h-4',
    content: 'ml-6 text-base',
    spacing: 'pb-6',
  },
  lg: {
    dot: 'w-5 h-5',
    content: 'ml-8 text-lg',
    spacing: 'pb-8',
  },
} as const;

// ============================================================================
// TIMELINE ITEM COMPONENT WITH ADVANCED TYPESCRIPT
// ============================================================================

interface TimelineItemProps {
  readonly item: TimelineItemData;
  readonly variant: TimelineVariant;
  readonly size: TimelineSize;
  readonly isLast: boolean;
  readonly showConnector: boolean;
  readonly renderItem?: (item: TimelineItemData, index: number) => ReactNode;
  readonly index: number;
}

const TimelineItem = React.memo<TimelineItemProps>(({
  item,
  variant,
  size,
  isLast,
  showConnector,
  renderItem,
  index,
}) => {
  const variantStyles = timelineVariantStyles[variant];
  const sizeStyles = sizeConfig[size];

  // Custom render function takes precedence
  if (renderItem) {
    return <>{renderItem(item, index)}</>;
  }

  return (
    <div className={cn('relative flex', sizeStyles.spacing)}>
      {/* Timeline dot with icon */}
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            'rounded-full border-2 flex items-center justify-center',
            sizeStyles.dot,
            variantStyles.dot,
          )}
        >
          {item.icon && (
            <span className="text-white text-xs flex items-center justify-center">
              {item.icon}
            </span>
          )}
        </div>

        {/* Connector line */}
        {showConnector && !isLast && (
          <div
            className={cn(
              'absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-6',
              variantStyles.line,
            )}
          />
        )}
      </div>

      {/* Timeline content */}
      <div className={cn('flex-1', sizeStyles.content)}>
        <div className="space-y-1">
          <h3
            className={cn(
              'font-semibold leading-tight',
              variantStyles.content,
            )}
          >
            {item.title}
          </h3>

          {item.date && (
            <time className="text-xs text-neutral-500 block">
              {item.date}
            </time>
          )}

          <p className="text-neutral-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

// ============================================================================
// MAIN TIMELINE COMPONENT WITH GENERIC TYPE SUPPORT
// ============================================================================

export const Timeline = React.forwardRef<
  ElementRef<'div'>,
  TimelineProps
>(({
  items,
  variant = 'default',
  position = 'left',
  size = 'md',
  showConnector = true,
  renderItem,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'timeline',
        position === 'center' && 'mx-auto max-w-2xl',
        position === 'right' && 'ml-auto',
        className,
      )}
      {...props}
    >
      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            variant={item.variant || variant}
            size={size}
            isLast={index === items.length - 1}
            showConnector={showConnector}
            renderItem={renderItem}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});

Timeline.displayName = 'Timeline';

// ============================================================================
// TYPE-SAFE TIMELINE BUILDER PATTERN
// ============================================================================

export class TimelineBuilder<T extends Record<string, unknown> = Record<string, unknown>> {
  private items: TimelineItemData<T>[] = [];
  private config: Partial<TimelineConfig> = {};

  addItem(item: TimelineItemData<T>): TimelineBuilder<T> {
    this.items.push(item);
    return this;
  }

  setVariant(variant: TimelineVariant): TimelineBuilder<T> {
    this.config.variant = variant;
    return this;
  }

  setPosition(position: TimelinePosition): TimelineBuilder<T> {
    this.config.position = position;
    return this;
  }

  setSize(size: TimelineSize): TimelineBuilder<T> {
    this.config.size = size;
    return this;
  }

  build(): TimelineProps<T> {
    return {
      items: this.items,
      variant: this.config.variant || 'default',
      position: this.config.position || 'left',
      size: this.config.size || 'md',
      showConnector: this.config.showConnector ?? true,
    };
  }
}

// ============================================================================
// CONVENIENCE HOOK FOR TYPE-SAFE TIMELINE CREATION
// ============================================================================

export function useTimeline<T extends Record<string, unknown> = Record<string, unknown>>(
  initialItems?: readonly TimelineItemData<T>[],
) {
  const [items, setItems] = React.useState<TimelineItemData<T>[]>(
    initialItems ? [...initialItems] : []
  );

  const addItem = React.useCallback((item: TimelineItemData<T>) => {
    setItems(prev => [...prev, item]);
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateItem = React.useCallback((id: string, updates: Partial<TimelineItemData<T>>) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  const clearItems = React.useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    clearItems,
  };
}

// ============================================================================
// TYPE EXPORTS FOR EXTERNAL USE
// ============================================================================

export type {
  TimelineProps,
  TimelineItemData,
  TimelineVariant,
  TimelinePosition,
  TimelineSize,
  TimelineConfig,
};

// Default export for compatibility
export default Timeline;