// CONTEXT7 SOURCE: /microsoft/typescript - Component variant system with complete type safety
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Utility class composition for component variants
// IMPLEMENTATION REASON: Component variant system addressing 2,093 button standardizations and brand compliance

/**
 * My Private Tutor Online Design System - Component Variant System
 * 
 * Standardizes component styling across the application:
 * - 2,093 button variations requiring unification
 * - Consistent component API with type safety
 * - Brand-compliant styling enforcement
 * - Accessibility standards integration
 * 
 * Royal client standards with enterprise-grade component patterns.
 */

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// CONTEXT7 SOURCE: /microsoft/typescript - Utility function for class merging with type safety
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Button component variants addressing 2,093 standardizations
export const buttonVariants = cva(
  // Base styles - Common to ALL button variants
  [
    // Layout & Display
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'rounded-md',
    
    // Typography - Royal client standards
    'text-sm',
    'font-medium',
    'font-source-serif', // Brand typography requirement
    
    // Interactions & Accessibility
    'ring-offset-background',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    
    // States
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    
    // Premium enhancement
    'select-none',
    'cursor-pointer'
  ],
  {
    variants: {
      variant: {
        // Primary - Metallic Blue (Brand Standard)
        default: [
          'bg-brand-metallic-blue-700',
          'text-white',
          'hover:bg-brand-metallic-blue-800',
          'active:bg-brand-metallic-blue-900',
          'focus-visible:ring-brand-metallic-blue-600'
        ],
        
        // Primary alias for clarity
        primary: [
          'bg-brand-metallic-blue-700',
          'text-white', 
          'hover:bg-brand-metallic-blue-800',
          'active:bg-brand-metallic-blue-900',
          'focus-visible:ring-brand-metallic-blue-600'
        ],
        
        // Secondary - Aztec Gold (Brand Accent)
        secondary: [
          'bg-brand-aztec-gold-600',
          'text-white',
          'hover:bg-brand-aztec-gold-700',
          'active:bg-brand-aztec-gold-800',
          'focus-visible:ring-brand-aztec-gold-500'
        ],
        
        // Destructive actions
        destructive: [
          'bg-red-500',
          'text-white',
          'hover:bg-red-600',
          'active:bg-red-700',
          'focus-visible:ring-red-400'
        ],
        
        // Outline - Brand primary border
        outline: [
          'border',
          'border-brand-metallic-blue-700',
          'bg-transparent',
          'text-brand-metallic-blue-700',
          'hover:bg-brand-metallic-blue-700',
          'hover:text-white',
          'focus-visible:ring-brand-metallic-blue-600'
        ],
        
        // Ghost - Subtle interaction
        ghost: [
          'text-brand-metallic-blue-700',
          'hover:bg-brand-metallic-blue-50',
          'hover:text-brand-metallic-blue-800',
          'focus-visible:ring-brand-metallic-blue-600'
        ],
        
        // Link styling
        link: [
          'text-brand-metallic-blue-700',
          'underline-offset-4',
          'hover:underline',
          'focus-visible:ring-brand-metallic-blue-600'
        ],
        
        // Success state
        success: [
          'bg-green-600',
          'text-white',
          'hover:bg-green-700',
          'active:bg-green-800',
          'focus-visible:ring-green-500'
        ],
        
        // Warning state  
        warning: [
          'bg-yellow-500',
          'text-white',
          'hover:bg-yellow-600',
          'active:bg-yellow-700',
          'focus-visible:ring-yellow-400'
        ]
      },
      
      size: {
        // Extra small
        xs: [
          'h-8',
          'px-2',
          'text-xs',
          'rounded'
        ],
        
        // Small
        sm: [
          'h-9',
          'px-3',
          'text-sm',
          'rounded-md'
        ],
        
        // Medium (default)
        md: [
          'h-10',
          'px-4',
          'py-2',
          'text-sm'
        ],
        
        // Large
        lg: [
          'h-11',
          'px-8',
          'text-base',
          'rounded-lg'
        ],
        
        // Extra large
        xl: [
          'h-12',
          'px-10',
          'text-lg',
          'rounded-lg'
        ],
        
        // Icon only
        icon: [
          'h-10',
          'w-10',
          'p-0',
          'rounded-md'
        ]
      },
      
      // Loading state
      loading: {
        true: [
          'cursor-not-allowed'
        ]
      }
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Card component variants with brand styling
export const cardVariants = cva(
  [
    // Base card styling
    'rounded-lg',
    'border',
    'bg-white',
    'text-gray-900',
    'shadow-sm',
    
    // Dark mode support
    'dark:bg-gray-900',
    'dark:text-gray-100',
    'dark:border-gray-800'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-gray-200',
          'dark:border-gray-800'
        ],
        
        elevated: [
          'border-gray-200',
          'shadow-md',
          'dark:border-gray-800'
        ],
        
        outlined: [
          'border-brand-metallic-blue-200',
          'dark:border-brand-metallic-blue-800'
        ],
        
        premium: [
          'border-brand-aztec-gold-200',
          'bg-gradient-to-br',
          'from-white',
          'to-brand-aztec-gold-50',
          'dark:from-gray-900',
          'dark:to-brand-aztec-gold-950/10'
        ]
      },
      
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10'
      },
      
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'w-full'
      }
    },
    
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      size: 'md'
    }
  }
);

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Badge component variants for status indicators
export const badgeVariants = cva(
  [
    // Base badge styling
    'inline-flex',
    'items-center',
    'rounded-full',
    'border',
    'px-2.5',
    'py-0.5',
    'text-xs',
    'font-semibold',
    'font-source-serif',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-ring',
    'focus:ring-offset-2'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-transparent',
          'bg-brand-metallic-blue-700',
          'text-white'
        ],
        
        secondary: [
          'border-transparent',
          'bg-brand-aztec-gold-600',
          'text-white'
        ],
        
        destructive: [
          'border-transparent',
          'bg-red-500',
          'text-white'
        ],
        
        outline: [
          'border-brand-metallic-blue-200',
          'text-brand-metallic-blue-700',
          'bg-transparent'
        ],
        
        success: [
          'border-transparent',
          'bg-green-600',
          'text-white'
        ],
        
        warning: [
          'border-transparent',
          'bg-yellow-500',
          'text-white'
        ],
        
        info: [
          'border-transparent',
          'bg-blue-600',
          'text-white'
        ]
      }
    },
    
    defaultVariants: {
      variant: 'default'
    }
  }
);

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Alert component variants for notifications
export const alertVariants = cva(
  [
    // Base alert styling
    'relative',
    'w-full',
    'rounded-lg',
    'border',
    'p-4',
    'font-source-serif'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background',
          'text-foreground'
        ],
        
        destructive: [
          'border-red-500/50',
          'text-red-500',
          'dark:border-red-500',
          '[&>svg]:text-red-500'
        ],
        
        success: [
          'border-green-500/50',
          'text-green-700',
          'bg-green-50',
          'dark:border-green-500',
          'dark:text-green-400',
          'dark:bg-green-950/10',
          '[&>svg]:text-green-600'
        ],
        
        warning: [
          'border-yellow-500/50',
          'text-yellow-700',
          'bg-yellow-50',
          'dark:border-yellow-500',
          'dark:text-yellow-400',
          'dark:bg-yellow-950/10',
          '[&>svg]:text-yellow-600'
        ],
        
        info: [
          'border-blue-500/50',
          'text-blue-700',
          'bg-blue-50',
          'dark:border-blue-500',
          'dark:text-blue-400',
          'dark:bg-blue-950/10',
          '[&>svg]:text-blue-600'
        ]
      }
    },
    
    defaultVariants: {
      variant: 'default'
    }
  }
);

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Input component variants for form consistency
export const inputVariants = cva(
  [
    // Base input styling
    'flex',
    'w-full',
    'rounded-md',
    'border',
    'bg-background',
    'px-3',
    'py-2',
    'text-sm',
    'font-source-serif',
    'ring-offset-background',
    'file:border-0',
    'file:bg-transparent',
    'file:text-sm',
    'file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-input'
        ],
        
        error: [
          'border-red-500',
          'focus-visible:ring-red-500'
        ],
        
        success: [
          'border-green-500',
          'focus-visible:ring-green-500'
        ]
      },
      
      size: {
        sm: [
          'h-8',
          'px-2',
          'text-xs'
        ],
        
        md: [
          'h-10',
          'px-3',
          'py-2'
        ],
        
        lg: [
          'h-12',
          'px-4',
          'py-3',
          'text-base'
        ]
      }
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

// Type exports for component props
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type AlertVariants = VariantProps<typeof alertVariants>;
export type InputVariants = VariantProps<typeof inputVariants>;

// Component variant collections for easy import
export const componentVariants = {
  button: buttonVariants,
  card: cardVariants,
  badge: badgeVariants,
  alert: alertVariants,
  input: inputVariants
} as const;

// Utility for creating custom component variants
export function createComponentVariant<T extends Record<string, any>>(
  base: string | string[],
  variants: T,
  defaultVariants?: Partial<VariantProps<any>>
) {
  return cva(base, {
    variants,
    defaultVariants
  });
}

// Royal client premium component variants
export const premiumVariants = {
  // Premium button with gold accents
  premiumButton: cva(buttonVariants(), {
    variants: {
      premium: {
        gold: [
          'bg-gradient-to-r',
          'from-brand-aztec-gold-600',
          'to-brand-aztec-gold-700',
          'text-white',
          'shadow-accent-subtle',
          'hover:shadow-accent-depth',
          'hover:from-brand-aztec-gold-700',
          'hover:to-brand-aztec-gold-800'
        ],
        
        royal: [
          'bg-gradient-to-r',
          'from-brand-metallic-blue-700',
          'to-brand-metallic-blue-800',
          'text-white',
          'shadow-primary-subtle',
          'hover:shadow-primary-depth',
          'hover:from-brand-metallic-blue-800',
          'hover:to-brand-metallic-blue-900'
        ]
      }
    }
  }),
  
  // Premium card with luxury styling
  premiumCard: cva(cardVariants(), {
    variants: {
      luxury: {
        gold: [
          'bg-gradient-to-br',
          'from-brand-aztec-gold-50',
          'to-white',
          'border-brand-aztec-gold-200',
          'shadow-accent-subtle'
        ],
        
        royal: [
          'bg-gradient-to-br',
          'from-brand-metallic-blue-50',
          'to-white',
          'border-brand-metallic-blue-200',
          'shadow-primary-subtle'
        ]
      }
    }
  })
} as const;