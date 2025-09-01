// CONTEXT7 SOURCE: /microsoft/typescript - Component architecture patterns and type safety
// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - React component organization patterns  
// IMPLEMENTATION REASON: Comprehensive component catalog with usage patterns for My Private Tutor Online
// Addresses complete architectural consistency and component standardization across 574 files

/**
 * My Private Tutor Online - Component Registry System
 * 
 * Complete architectural catalog of all components with:
 * - Usage patterns and best practices
 * - Brand compliance requirements
 * - Accessibility standards (WCAG 2.1 AA)
 * - Design system integration
 * - Migration pathways for standardization
 * 
 * Royal client quality standards with enterprise-grade organization.
 */

import { type ComponentProps, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

// CONTEXT7 SOURCE: /microsoft/typescript - Component metadata and type definitions
export interface ComponentMetadata {
  path: string;
  displayName: string;
  description: string;
  category: 'atom' | 'molecule' | 'organism' | 'template' | 'page';
  designSystemIntegration: boolean;
  brandCompliance: {
    typography: boolean;
    colors: boolean;
    spacing: boolean;
    score: number;
  };
  accessibility: {
    wcagCompliant: boolean;
    ariaSupport: boolean;
    keyboardNavigation: boolean;
    colorContrast: boolean;
    score: number;
  };
  usage: {
    frequency: number;
    lastUpdated: string;
    migrationStatus: 'complete' | 'partial' | 'pending' | 'not-required';
    issues: ComponentIssue[];
  };
  props: ComponentPropDefinition[];
  variants?: Record<string, any>;
  examples: ComponentExample[];
  relatedComponents: string[];
}

export interface ComponentIssue {
  type: 'accessibility' | 'brand-compliance' | 'performance' | 'consistency';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  solution: string;
  estimatedEffort: 'low' | 'medium' | 'high';
  priority: number;
}

export interface ComponentPropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description: string;
  validation?: string[];
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
  props: Record<string, any>;
  accessibility: {
    description: string;
    features: string[];
  };
}

export interface MigrationPath {
  fromComponent: string;
  toComponent: string;
  reason: string;
  steps: MigrationStep[];
  automationLevel: 'full' | 'partial' | 'manual';
  estimatedEffort: string;
  benefits: string[];
  risks: string[];
}

export interface MigrationStep {
  order: number;
  action: string;
  description: string;
  automated: boolean;
  validation: string;
}

// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Component organization patterns
export const COMPONENT_REGISTRY: Record<string, ComponentMetadata> = {
  // =============================================================================
  // ATOMIC COMPONENTS - Building blocks of the design system
  // =============================================================================
  
  'Button': {
    path: '@/components/ui/button',
    displayName: 'Button',
    description: 'Primary interactive element with brand styling and accessibility built-in. Replaces all native button elements.',
    category: 'atom',
    designSystemIntegration: true,
    brandCompliance: {
      typography: true, // Uses font-source-serif
      colors: true,     // Brand metallic blue and aztec gold variants
      spacing: true,    // Consistent padding and margins
      score: 100
    },
    accessibility: {
      wcagCompliant: true,
      ariaSupport: true,
      keyboardNavigation: true,
      colorContrast: true,
      score: 100
    },
    usage: {
      frequency: 2093, // Current instances requiring standardization
      lastUpdated: '2025-09-01',
      migrationStatus: 'partial', // 847 standardized, 1246 native remaining
      issues: [
        {
          type: 'consistency',
          severity: 'high',
          description: '1246 native button elements need standardization',
          solution: 'Replace <button> with <Button> component from design system',
          estimatedEffort: 'low',
          priority: 1
        },
        {
          type: 'accessibility',
          severity: 'critical',
          description: '1966 buttons lack proper aria-label or descriptive text',
          solution: 'Add meaningful text content or aria-label attributes',
          estimatedEffort: 'medium',
          priority: 2
        }
      ]
    },
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'success' | 'warning'",
        required: false,
        defaultValue: 'primary',
        description: 'Visual style variant using brand colors',
        validation: ['Must use approved brand color variants']
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'",
        required: false,
        defaultValue: 'md',
        description: 'Size variant for different use cases',
      },
      {
        name: 'asChild',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Render as child element (Radix UI pattern)',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Disable button interaction',
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Show loading state with spinner',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Button content - must be descriptive for accessibility',
        validation: ['Must provide meaningful text or aria-label if children is not text']
      }
    ],
    variants: {
      variant: {
        primary: 'bg-brand-metallic-blue-700 text-white hover:bg-brand-metallic-blue-800',
        secondary: 'bg-brand-aztec-gold-600 text-white hover:bg-brand-aztec-gold-700',
        outline: 'border border-brand-metallic-blue-700 text-brand-metallic-blue-700 hover:bg-brand-metallic-blue-700 hover:text-white',
        ghost: 'text-brand-metallic-blue-700 hover:bg-brand-metallic-blue-50',
        link: 'text-brand-metallic-blue-700 underline-offset-4 hover:underline'
      },
      size: {
        xs: 'h-8 px-2 text-xs rounded',
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-11 px-8 text-base rounded-lg',
        xl: 'h-12 px-10 text-lg rounded-lg',
        icon: 'h-10 w-10 p-0 rounded-md'
      }
    },
    examples: [
      {
        title: 'Primary CTA Button',
        description: 'Main call-to-action button with royal client styling',
        code: '<Button variant="primary" size="lg">Book Consultation</Button>',
        props: { variant: 'primary', size: 'lg', children: 'Book Consultation' },
        accessibility: {
          description: 'Fully accessible with keyboard navigation and screen reader support',
          features: ['Keyboard focusable', 'Screen reader announced', 'High contrast colors', 'Loading state support']
        }
      },
      {
        title: 'Secondary Action',
        description: 'Secondary actions with branded aztec gold styling',
        code: '<Button variant="secondary" size="md">Learn More</Button>',
        props: { variant: 'secondary', size: 'md', children: 'Learn More' },
        accessibility: {
          description: 'Accessible secondary action with brand colors',
          features: ['Clear action purpose', 'Sufficient color contrast', 'Focus indicators']
        }
      }
    ],
    relatedComponents: ['IconButton', 'LinkButton', 'DropdownMenuTrigger']
  },

  'Typography': {
    path: '@/lib/design-system/typography',
    displayName: 'Typography System',
    description: 'Brand-compliant typography components using Playfair Display for headings and Source Serif for body text.',
    category: 'atom',
    designSystemIntegration: true,
    brandCompliance: {
      typography: true,
      colors: true,
      spacing: true,
      score: 100
    },
    accessibility: {
      wcagCompliant: true,
      ariaSupport: true,
      keyboardNavigation: true,
      colorContrast: true,
      score: 95
    },
    usage: {
      frequency: 927, // Typography elements requiring brand compliance
      lastUpdated: '2025-09-01',
      migrationStatus: 'pending', // 0% currently compliant
      issues: [
        {
          type: 'brand-compliance',
          severity: 'high',
          description: '927 typography elements not using brand fonts',
          solution: 'Apply font-playfair to headings and font-source-serif to body text',
          estimatedEffort: 'low',
          priority: 1
        },
        {
          type: 'brand-compliance',
          severity: 'medium',
          description: 'Typography not using consistent brand colors',
          solution: 'Apply brand metallic blue color variants to text elements',
          estimatedEffort: 'low',
          priority: 2
        }
      ]
    },
    props: [
      {
        name: 'variant',
        type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'lead'",
        required: true,
        description: 'Typography variant with automatic font and color application',
        validation: ['Headings automatically use font-playfair', 'Body text uses font-source-serif']
      },
      {
        name: 'as',
        type: 'keyof JSX.IntrinsicElements',
        required: false,
        description: 'Override the rendered element while keeping styling',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Text content to render',
      }
    ],
    examples: [
      {
        title: 'Page Heading',
        description: 'Main page heading with royal client styling',
        code: '<Typography variant="h1">Expert Private Tutoring</Typography>',
        props: { variant: 'h1', children: 'Expert Private Tutoring' },
        accessibility: {
          description: 'Properly structured heading with brand typography',
          features: ['Semantic heading structure', 'High contrast text', 'Responsive scaling']
        }
      }
    ],
    relatedComponents: ['Heading', 'Text', 'Quote']
  },

  'Card': {
    path: '@/components/ui/card',
    displayName: 'Card',
    description: 'Flexible content container with consistent spacing and brand styling.',
    category: 'molecule',
    designSystemIntegration: true,
    brandCompliance: {
      typography: true,
      colors: true,
      spacing: true,
      score: 95
    },
    accessibility: {
      wcagCompliant: true,
      ariaSupport: true,
      keyboardNavigation: true,
      colorContrast: true,
      score: 90
    },
    usage: {
      frequency: 312,
      lastUpdated: '2025-09-01',
      migrationStatus: 'complete',
      issues: []
    },
    props: [
      {
        name: 'variant',
        type: "'default' | 'elevated' | 'outlined' | 'premium'",
        required: false,
        defaultValue: 'default',
        description: 'Card styling variant',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        required: false,
        defaultValue: 'md',
        description: 'Internal padding size',
      }
    ],
    examples: [
      {
        title: 'Service Card',
        description: 'Card showcasing tutoring services',
        code: '<Card variant="premium" padding="lg"><CardHeader><CardTitle>11+ Preparation</CardTitle></CardHeader></Card>',
        props: { variant: 'premium', padding: 'lg' },
        accessibility: {
          description: 'Accessible content container with proper heading structure',
          features: ['Focus management', 'Screen reader support', 'Keyboard navigation']
        }
      }
    ],
    relatedComponents: ['CardHeader', 'CardContent', 'CardFooter']
  },

  'AspectRatio': {
    path: '@radix-ui/react-aspect-ratio',
    displayName: 'AspectRatio',
    description: 'Maintains consistent aspect ratios for media content, especially videos.',
    category: 'atom',
    designSystemIntegration: true,
    brandCompliance: {
      typography: false, // Not applicable
      colors: false,     // Not applicable
      spacing: true,
      score: 80
    },
    accessibility: {
      wcagCompliant: true,
      ariaSupport: false, // Wrapper component
      keyboardNavigation: false, // Passes through to children
      colorContrast: false, // Not applicable
      score: 70
    },
    usage: {
      frequency: 63, // Videos requiring AspectRatio wrapper
      lastUpdated: '2025-09-01',
      migrationStatus: 'pending', // 0 currently wrapped
      issues: [
        {
          type: 'consistency',
          severity: 'high',
          description: '63 video elements need AspectRatio wrapper for layout stability',
          solution: 'Wrap all video elements with AspectRatio component',
          estimatedEffort: 'medium',
          priority: 1
        }
      ]
    },
    props: [
      {
        name: 'ratio',
        type: 'number',
        required: false,
        defaultValue: '16/9',
        description: 'Aspect ratio as width/height (e.g., 16/9, 4/3, 1/1)',
        validation: ['Common ratios: 16/9 for videos, 4/3 for images, 1/1 for squares']
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Media element to maintain aspect ratio for',
      }
    ],
    examples: [
      {
        title: 'Video Container',
        description: 'Responsive video with maintained aspect ratio',
        code: '<AspectRatio ratio={16/9}><video className="w-full h-full object-cover" /></AspectRatio>',
        props: { ratio: 16/9 },
        accessibility: {
          description: 'Maintains layout stability and prevents content shift',
          features: ['Prevents CLS (Cumulative Layout Shift)', 'Responsive scaling', 'Stable layout']
        }
      }
    ],
    relatedComponents: ['Video', 'Image', 'Iframe']
  },

  // =============================================================================
  // MOLECULAR COMPONENTS - Complex UI patterns
  // =============================================================================

  'TestimonialCard': {
    path: '@/components/testimonials/testimonial-card',
    displayName: 'TestimonialCard',
    description: 'Displays client testimonials with royal client styling and accessibility features.',
    category: 'molecule',
    designSystemIntegration: true,
    brandCompliance: {
      typography: true,
      colors: true,
      spacing: true,
      score: 95
    },
    accessibility: {
      wcagCompliant: true,
      ariaSupport: true,
      keyboardNavigation: true,
      colorContrast: true,
      score: 95
    },
    usage: {
      frequency: 45,
      lastUpdated: '2025-09-01',
      migrationStatus: 'complete',
      issues: []
    },
    props: [
      {
        name: 'testimonial',
        type: 'TestimonialData',
        required: true,
        description: 'Testimonial data object with quote, author, and metadata',
      },
      {
        name: 'variant',
        type: "'default' | 'featured' | 'compact'",
        required: false,
        defaultValue: 'default',
        description: 'Display variant for different contexts',
      }
    ],
    examples: [
      {
        title: 'Featured Testimonial',
        description: 'Prominent testimonial display for homepage',
        code: '<TestimonialCard variant="featured" testimonial={testimonialData} />',
        props: { variant: 'featured' },
        accessibility: {
          description: 'Accessible testimonial with proper attribution and structure',
          features: ['Screen reader friendly', 'Proper semantic markup', 'Focus management']
        }
      }
    ],
    relatedComponents: ['TestimonialGrid', 'TestimonialModal', 'Card']
  },

  'NavigationMenu': {
    path: '@/components/layout/navigation',
    displayName: 'NavigationMenu',
    description: 'Main site navigation with dropdown menus and accessibility features.',
    category: 'organism',
    designSystemIntegration: true,
    brandCompliance: {
      typography: true,
      colors: true,
      spacing: true,
      score: 100
    },
    accessibility: {
      wcagCompliant: true,
      ariaSupport: true,
      keyboardNavigation: true,
      colorContrast: true,
      score: 100
    },
    usage: {
      frequency: 1, // Single instance - global navigation
      lastUpdated: '2025-09-01',
      migrationStatus: 'complete',
      issues: []
    },
    props: [
      {
        name: 'menuItems',
        type: 'NavigationMenuItem[]',
        required: true,
        description: 'Array of navigation menu items with nested structure support',
      },
      {
        name: 'variant',
        type: "'default' | 'mobile' | 'compact'",
        required: false,
        defaultValue: 'default',
        description: 'Navigation variant for different screen sizes',
      }
    ],
    examples: [
      {
        title: 'Main Navigation',
        description: 'Complete site navigation with nested dropdowns',
        code: '<NavigationMenu menuItems={navigationData} />',
        props: { menuItems: [] },
        accessibility: {
          description: 'Full keyboard navigation and screen reader support',
          features: ['ARIA navigation landmarks', 'Keyboard shortcuts', 'Focus management', 'Mobile accessible']
        }
      }
    ],
    relatedComponents: ['MobileNav', 'NavItem', 'DropdownMenu']
  },

  // =============================================================================
  // ORGANISM COMPONENTS - Complete sections and layouts
  // =============================================================================

  'PageHero': {
    path: '@/components/layout/page-hero',
    displayName: 'PageHero',
    description: 'Hero section component with video support, typography hierarchy, and CTAs.',
    category: 'organism',
    designSystemIntegration: true,
    brandCompliance: {
      typography: true,
      colors: true,
      spacing: true,
      score: 100
    },
    accessibility: {
      wcagCompliant: true,
      ariaSupport: true,
      keyboardNavigation: true,
      colorContrast: true,
      score: 95
    },
    usage: {
      frequency: 12, // One per main page
      lastUpdated: '2025-09-01',
      migrationStatus: 'complete',
      issues: []
    },
    props: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Main hero title - automatically styled with brand typography',
      },
      {
        name: 'subtitle',
        type: 'string',
        required: false,
        description: 'Optional subtitle for additional context',
      },
      {
        name: 'backgroundVideo',
        type: 'string',
        required: false,
        description: 'Background video URL - automatically wrapped in AspectRatio',
      },
      {
        name: 'cta',
        type: 'CTAButtonProps',
        required: false,
        description: 'Call-to-action button configuration',
      }
    ],
    examples: [
      {
        title: 'Homepage Hero',
        description: 'Main homepage hero with video background',
        code: '<PageHero title="Expert Private Tutoring" subtitle="Royal-quality education" backgroundVideo="/hero-video.mp4" />',
        props: { title: 'Expert Private Tutoring', subtitle: 'Royal-quality education' },
        accessibility: {
          description: 'Accessible hero section with proper heading hierarchy',
          features: ['Semantic HTML structure', 'Skip to content link', 'Reduced motion support', 'Screen reader optimized']
        }
      }
    ],
    relatedComponents: ['AspectRatio', 'Button', 'Typography']
  }
};

// CONTEXT7 SOURCE: /microsoft/typescript - Migration path definition patterns
export const MIGRATION_PATHS: Record<string, MigrationPath> = {
  'native-button-to-component': {
    fromComponent: '<button>',
    toComponent: '@/components/ui/button',
    reason: 'Standardize on design system component for consistency, accessibility, and brand compliance',
    steps: [
      {
        order: 1,
        action: 'Import Button component',
        description: 'Add import { Button } from "@/components/ui/button"',
        automated: true,
        validation: 'Check for existing import'
      },
      {
        order: 2,
        action: 'Replace element',
        description: 'Replace <button> with <Button>',
        automated: true,
        validation: 'Ensure all props are compatible'
      },
      {
        order: 3,
        action: 'Add variant prop',
        description: 'Determine appropriate variant based on styling',
        automated: false,
        validation: 'Visual review required'
      },
      {
        order: 4,
        action: 'Validate accessibility',
        description: 'Ensure button has proper labeling',
        automated: false,
        validation: 'Check for aria-label or descriptive text'
      }
    ],
    automationLevel: 'partial',
    estimatedEffort: '5 minutes per instance',
    benefits: [
      'Consistent brand styling',
      'Built-in accessibility features',
      'Reduced code duplication',
      'Easier maintenance'
    ],
    risks: [
      'Potential visual differences requiring adjustment',
      'Props API differences'
    ]
  },

  'typography-branding': {
    fromComponent: 'Native HTML headings',
    toComponent: 'Brand-compliant typography',
    reason: 'Apply consistent brand typography using Playfair Display and Source Serif fonts',
    steps: [
      {
        order: 1,
        action: 'Add font classes',
        description: 'Add font-playfair to headings, font-source-serif to body text',
        automated: true,
        validation: 'Check element type'
      },
      {
        order: 2,
        action: 'Add brand colors',
        description: 'Apply appropriate brand color classes',
        automated: true,
        validation: 'Use color hierarchy: h1 -> brand-metallic-blue-700, h2 -> -600, etc.'
      },
      {
        order: 3,
        action: 'Validate typography hierarchy',
        description: 'Ensure proper heading structure and font sizes',
        automated: false,
        validation: 'Visual review for typography hierarchy'
      }
    ],
    automationLevel: 'full',
    estimatedEffort: '2 minutes per element',
    benefits: [
      'Brand consistency',
      'Professional appearance',
      'Royal client quality',
      'SEO benefits from proper heading structure'
    ],
    risks: [
      'Potential layout shifts',
      'Font loading performance impact'
    ]
  },

  'video-aspect-ratio': {
    fromComponent: '<video>',
    toComponent: '<AspectRatio><video /></AspectRatio>',
    reason: 'Prevent layout shift and ensure consistent video presentation',
    steps: [
      {
        order: 1,
        action: 'Import AspectRatio',
        description: 'Add import { AspectRatio } from "@radix-ui/react-aspect-ratio"',
        automated: true,
        validation: 'Check for existing import'
      },
      {
        order: 2,
        action: 'Wrap video element',
        description: 'Wrap <video> with <AspectRatio ratio={16/9}>',
        automated: true,
        validation: 'Determine appropriate aspect ratio'
      },
      {
        order: 3,
        action: 'Add responsive classes',
        description: 'Add w-full h-full object-cover to video element',
        automated: true,
        validation: 'Ensure responsive scaling'
      },
      {
        order: 4,
        action: 'Validate layout',
        description: 'Check video displays correctly at different screen sizes',
        automated: false,
        validation: 'Visual review across breakpoints'
      }
    ],
    automationLevel: 'partial',
    estimatedEffort: '10 minutes per video',
    benefits: [
      'Prevents Cumulative Layout Shift (CLS)',
      'Consistent video presentation',
      'Responsive design',
      'Better user experience'
    ],
    risks: [
      'Potential changes to video dimensions',
      'Need to adjust surrounding layout'
    ]
  }
};

// CONTEXT7 SOURCE: /microsoft/typescript - Component usage analysis patterns
export interface ComponentUsageAnalysis {
  totalComponents: number;
  byCategory: Record<string, number>;
  standardizationProgress: {
    complete: number;
    partial: number;
    pending: number;
    notRequired: number;
  };
  priorityMetrics: {
    criticalIssues: number;
    highPriorityMigrations: number;
    brandComplianceScore: number;
    accessibilityScore: number;
  };
}

export function analyzeComponentUsage(): ComponentUsageAnalysis {
  const components = Object.values(COMPONENT_REGISTRY);
  
  return {
    totalComponents: components.length,
    byCategory: components.reduce((acc, comp) => {
      acc[comp.category] = (acc[comp.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    standardizationProgress: {
      complete: components.filter(c => c.usage.migrationStatus === 'complete').length,
      partial: components.filter(c => c.usage.migrationStatus === 'partial').length,
      pending: components.filter(c => c.usage.migrationStatus === 'pending').length,
      notRequired: components.filter(c => c.usage.migrationStatus === 'not-required').length,
    },
    priorityMetrics: {
      criticalIssues: components.reduce((acc, comp) => 
        acc + comp.usage.issues.filter(issue => issue.severity === 'critical').length, 0),
      highPriorityMigrations: components.reduce((acc, comp) => 
        acc + comp.usage.issues.filter(issue => issue.priority <= 2).length, 0),
      brandComplianceScore: Math.round(components.reduce((acc, comp) => 
        acc + comp.brandCompliance.score, 0) / components.length),
      accessibilityScore: Math.round(components.reduce((acc, comp) => 
        acc + comp.accessibility.score, 0) / components.length),
    }
  };
}

// Component lookup utilities
export function getComponentByPath(path: string): ComponentMetadata | undefined {
  return Object.values(COMPONENT_REGISTRY).find(comp => comp.path === path);
}

export function getComponentsByCategory(category: ComponentMetadata['category']): ComponentMetadata[] {
  return Object.values(COMPONENT_REGISTRY).filter(comp => comp.category === category);
}

export function getComponentsWithIssues(severity?: ComponentIssue['severity']): ComponentMetadata[] {
  return Object.values(COMPONENT_REGISTRY).filter(comp => {
    if (!severity) return comp.usage.issues.length > 0;
    return comp.usage.issues.some(issue => issue.severity === severity);
  });
}

export function getMigrationPathFor(fromComponent: string): MigrationPath | undefined {
  return Object.values(MIGRATION_PATHS).find(path => 
    path.fromComponent.includes(fromComponent) || 
    fromComponent.includes(path.fromComponent)
  );
}

// Export types and utilities
export type { ComponentMetadata, ComponentIssue, MigrationPath, MigrationStep };
export { COMPONENT_REGISTRY, MIGRATION_PATHS };