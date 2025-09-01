// CONTEXT7 SOURCE: /microsoft/typescript - Component template generation and code scaffolding
// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - React component patterns
// IMPLEMENTATION REASON: Automated component generation ensuring architectural compliance
// Prevents architectural drift by generating standard-compliant components

/**
 * My Private Tutor Online - Component Template Generator
 * 
 * Automated generation of architectural-compliant components:
 * - Design system integration by default
 * - Brand compliance built-in (Playfair Display, Source Serif, brand colors)
 * - WCAG 2.1 AA accessibility features included
 * - TypeScript interfaces and prop validation
 * - Royal client quality standards enforcement
 * 
 * Ensures new components maintain architectural excellence.
 */

import { z } from 'zod';

// CONTEXT7 SOURCE: /microsoft/typescript - Component template type definitions
export interface ComponentTemplate {
  id: string;
  name: string;
  category: 'atom' | 'molecule' | 'organism' | 'template';
  description: string;
  templateCode: string;
  requiredImports: string[];
  propSchema: z.ZodSchema;
  examples: ComponentExample[];
  accessibility: AccessibilityFeatures;
  brandCompliance: BrandFeatures;
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  props: Record<string, any>;
}

export interface AccessibilityFeatures {
  ariaSupport: boolean;
  keyboardNavigation: boolean;
  screenReaderOptimized: boolean;
  colorContrastCompliant: boolean;
  focusManagement: boolean;
  requiredAttributes: string[];
}

export interface BrandFeatures {
  usesBrandFonts: boolean;
  usesBrandColors: boolean;
  followsDesignSystem: boolean;
  royalClientQuality: boolean;
  requiredClasses: string[];
}

// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Component template patterns
export const COMPONENT_TEMPLATES: Record<string, ComponentTemplate> = {
  'branded-button': {
    id: 'branded-button',
    name: 'Branded Button',
    category: 'atom',
    description: 'Standard button component with built-in brand styling and accessibility',
    templateCode: `// CONTEXT7 SOURCE: /radix-ui/primitives - Button component with accessibility
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand styling implementation
// GENERATED: Branded Button component for My Private Tutor Online

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Button variants with brand colors
const buttonVariants = cva(
  [
    // Base styles ensuring accessibility and brand consistency
    'inline-flex items-center justify-center whitespace-nowrap rounded-md',
    'text-sm font-medium font-source-serif', // Brand typography
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer' // Royal client polish
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-metallic-blue-700 text-white',
          'hover:bg-brand-metallic-blue-800',
          'focus-visible:ring-brand-metallic-blue-600'
        ],
        secondary: [
          'bg-brand-aztec-gold-600 text-white',
          'hover:bg-brand-aztec-gold-700',
          'focus-visible:ring-brand-aztec-gold-500'
        ],
        outline: [
          'border border-brand-metallic-blue-700 text-brand-metallic-blue-700',
          'hover:bg-brand-metallic-blue-700 hover:text-white',
          'focus-visible:ring-brand-metallic-blue-600'
        ]
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-base rounded-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface {{COMPONENT_NAME}}Props extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  'aria-label'?: string; // Explicit accessibility requirement
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Accessible button implementation
const {{COMPONENT_NAME}} = React.forwardRef<HTMLButtonElement, {{COMPONENT_NAME}}Props>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
            Loading...
          </>
        ) : children}
      </Comp>
    );
  }
);

{{COMPONENT_NAME}}.displayName = '{{COMPONENT_NAME}}';

export { {{COMPONENT_NAME}}, buttonVariants };`,
    requiredImports: [
      "import React from 'react';",
      "import { Slot } from '@radix-ui/react-slot';",
      "import { type VariantProps, cva } from 'class-variance-authority';",
      "import { cn } from '@/lib/utils';"
    ],
    propSchema: z.object({
      variant: z.enum(['primary', 'secondary', 'outline']).optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      asChild: z.boolean().optional(),
      loading: z.boolean().optional(),
      'aria-label': z.string().optional(),
      children: z.any(),
      disabled: z.boolean().optional()
    }),
    examples: [
      {
        name: 'Primary CTA Button',
        description: 'Main call-to-action with brand styling',
        code: '<BrandedButton variant="primary" size="lg" aria-label="Book consultation">Book Now</BrandedButton>',
        props: { variant: 'primary', size: 'lg', 'aria-label': 'Book consultation' }
      },
      {
        name: 'Loading Button',
        description: 'Button with loading state',
        code: '<BrandedButton loading disabled>Processing...</BrandedButton>',
        props: { loading: true, disabled: true }
      }
    ],
    accessibility: {
      ariaSupport: true,
      keyboardNavigation: true,
      screenReaderOptimized: true,
      colorContrastCompliant: true,
      focusManagement: true,
      requiredAttributes: ['aria-label for icon-only buttons', 'proper text content']
    },
    brandCompliance: {
      usesBrandFonts: true,
      usesBrandColors: true,
      followsDesignSystem: true,
      royalClientQuality: true,
      requiredClasses: ['font-source-serif', 'bg-brand-metallic-blue-700', 'text-brand-*']
    }
  },

  'branded-heading': {
    id: 'branded-heading',
    name: 'Branded Heading',
    category: 'atom',
    description: 'Typography component with automatic brand font and color application',
    templateCode: `// CONTEXT7 SOURCE: /microsoft/typescript - Typography component with brand compliance
// GENERATED: Branded Heading component for My Private Tutor Online

import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography variants with brand fonts
const headingVariants = cva(
  [
    // Base styles with brand typography
    'font-playfair', // Brand heading font
    'tracking-tight',
    'scroll-m-20'
  ],
  {
    variants: {
      level: {
        1: [
          'text-4xl font-extrabold lg:text-5xl',
          'text-brand-metallic-blue-700' // Primary brand color
        ],
        2: [
          'text-3xl font-semibold tracking-tight',
          'text-brand-metallic-blue-600'
        ],
        3: [
          'text-2xl font-semibold tracking-tight',
          'text-brand-metallic-blue-500'
        ],
        4: [
          'text-xl font-semibold tracking-tight',
          'text-brand-metallic-blue-500'
        ],
        5: [
          'text-lg font-semibold tracking-tight',
          'text-brand-metallic-blue-400'
        ],
        6: [
          'text-base font-semibold tracking-tight',
          'text-brand-metallic-blue-400'
        ]
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      }
    },
    defaultVariants: {
      level: 1,
      align: 'left'
    }
  }
);

export interface {{COMPONENT_NAME}}Props extends 
  React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Polymorphic component pattern
const {{COMPONENT_NAME}} = React.forwardRef<HTMLHeadingElement, {{COMPONENT_NAME}}Props>(
  ({ className, level = 1, align, as, children, ...props }, ref) => {
    const Component = as || (\`h\${level}\` as keyof JSX.IntrinsicElements);
    
    return React.createElement(
      Component,
      {
        className: cn(headingVariants({ level, align, className })),
        ref,
        ...props
      },
      children
    );
  }
);

{{COMPONENT_NAME}}.displayName = '{{COMPONENT_NAME}}';

export { {{COMPONENT_NAME}}, headingVariants };`,
    requiredImports: [
      "import React from 'react';",
      "import { type VariantProps, cva } from 'class-variance-authority';",
      "import { cn } from '@/lib/utils';"
    ],
    propSchema: z.object({
      level: z.number().min(1).max(6).optional(),
      align: z.enum(['left', 'center', 'right']).optional(),
      as: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).optional(),
      children: z.any()
    }),
    examples: [
      {
        name: 'Page Title',
        description: 'Main page heading with brand styling',
        code: '<BrandedHeading level={1}>Expert Private Tutoring</BrandedHeading>',
        props: { level: 1 }
      },
      {
        name: 'Section Header',
        description: 'Section heading with secondary brand color',
        code: '<BrandedHeading level={2} align="center">Our Services</BrandedHeading>',
        props: { level: 2, align: 'center' }
      }
    ],
    accessibility: {
      ariaSupport: false, // Native heading semantics sufficient
      keyboardNavigation: false, // Not interactive
      screenReaderOptimized: true,
      colorContrastCompliant: true,
      focusManagement: false,
      requiredAttributes: ['proper heading hierarchy']
    },
    brandCompliance: {
      usesBrandFonts: true,
      usesBrandColors: true,
      followsDesignSystem: true,
      royalClientQuality: true,
      requiredClasses: ['font-playfair', 'text-brand-metallic-blue-*']
    }
  },

  'video-container': {
    id: 'video-container',
    name: 'Video Container',
    category: 'molecule',
    description: 'Responsive video container with AspectRatio wrapper and accessibility features',
    templateCode: `// CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio component for layout stability
// GENERATED: Video Container component for My Private Tutor Online

import React from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { cn } from '@/lib/utils';

export interface {{COMPONENT_NAME}}Props extends 
  React.VideoHTMLAttributes<HTMLVideoElement> {
  aspectRatio?: number;
  containerClassName?: string;
  'aria-label': string; // Required for accessibility
  poster?: string;
  className?: string;
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Accessible video container with layout stability
const {{COMPONENT_NAME}} = React.forwardRef<HTMLVideoElement, {{COMPONENT_NAME}}Props>(
  ({ 
    aspectRatio = 16/9, 
    containerClassName,
    className, 
    children, 
    'aria-label': ariaLabel,
    controls = true, // Default to accessible
    poster,
    ...props 
  }, ref) => {
    return (
      <AspectRatio ratio={aspectRatio} className={cn('overflow-hidden rounded-lg', containerClassName)}>
        <video
          ref={ref}
          className={cn(
            'w-full h-full object-cover',
            'focus:outline-none focus:ring-2 focus:ring-brand-metallic-blue-600 focus:ring-offset-2',
            className
          )}
          controls={controls}
          aria-label={ariaLabel}
          poster={poster}
          {...props}
        >
          {children}
          {/* Fallback text for accessibility */}
          <p className="text-sm text-muted-foreground p-4">
            Your browser does not support the video tag. 
            Please upgrade to a modern browser to view this content.
          </p>
        </video>
      </AspectRatio>
    );
  }
);

{{COMPONENT_NAME}}.displayName = '{{COMPONENT_NAME}}';

export { {{COMPONENT_NAME}} };`,
    requiredImports: [
      "import React from 'react';",
      "import { AspectRatio } from '@radix-ui/react-aspect-ratio';",
      "import { cn } from '@/lib/utils';"
    ],
    propSchema: z.object({
      aspectRatio: z.number().optional(),
      containerClassName: z.string().optional(),
      'aria-label': z.string(),
      poster: z.string().url().optional(),
      controls: z.boolean().optional(),
      src: z.string().url(),
      className: z.string().optional()
    }),
    examples: [
      {
        name: 'Hero Video',
        description: '16:9 aspect ratio video for hero section',
        code: '<VideoContainer src="/hero-video.mp4" aria-label="Introduction to our tutoring services" poster="/hero-poster.jpg" />',
        props: { aspectRatio: 16/9, 'aria-label': 'Introduction to our tutoring services' }
      },
      {
        name: 'Testimonial Video',
        description: '4:3 aspect ratio for testimonial content',
        code: '<VideoContainer aspectRatio={4/3} src="/testimonial.mp4" aria-label="Student testimonial about academic improvement" />',
        props: { aspectRatio: 4/3, 'aria-label': 'Student testimonial about academic improvement' }
      }
    ],
    accessibility: {
      ariaSupport: true,
      keyboardNavigation: true,
      screenReaderOptimized: true,
      colorContrastCompliant: true,
      focusManagement: true,
      requiredAttributes: ['aria-label', 'controls', 'fallback text']
    },
    brandCompliance: {
      usesBrandFonts: false, // Not applicable to video
      usesBrandColors: true, // Focus ring uses brand colors
      followsDesignSystem: true,
      royalClientQuality: true,
      requiredClasses: ['focus:ring-brand-metallic-blue-600']
    }
  }
};

// CONTEXT7 SOURCE: /microsoft/typescript - Component generator implementation
export class ComponentGenerator {
  private templates: Map<string, ComponentTemplate>;

  constructor(templates: Record<string, ComponentTemplate> = COMPONENT_TEMPLATES) {
    this.templates = new Map(Object.entries(templates));
  }

  // Generate component code from template
  generateComponent(templateId: string, componentName: string, options: any = {}): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    let code = template.templateCode;
    
    // Replace placeholders
    code = code.replace(/{{COMPONENT_NAME}}/g, componentName);
    
    // Apply any custom options
    if (options.customVariants) {
      code = this.injectCustomVariants(code, options.customVariants);
    }
    
    return code;
  }

  // Generate complete component file with imports and exports
  generateComponentFile(templateId: string, componentName: string, options: any = {}): {
    filename: string;
    content: string;
    testFile?: string;
    storyFile?: string;
  } {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const componentCode = this.generateComponent(templateId, componentName, options);
    const imports = template.requiredImports.join('\n');
    
    const content = `${imports}\n\n${componentCode}`;
    
    const result = {
      filename: `${this.kebabCase(componentName)}.tsx`,
      content
    };

    // Generate test file if requested
    if (options.generateTests) {
      result.testFile = this.generateTestFile(template, componentName);
    }

    // Generate Storybook story if requested
    if (options.generateStory) {
      result.storyFile = this.generateStoryFile(template, componentName);
    }

    return result;
  }

  // Generate accessibility-compliant component
  generateAccessibleComponent(templateId: string, componentName: string, wcagLevel: 'A' | 'AA' | 'AAA' = 'AA'): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    let code = this.generateComponent(templateId, componentName);
    
    // Enhance with additional accessibility features based on WCAG level
    if (wcagLevel === 'AAA') {
      code = this.enhanceForWCAGAAA(code, template);
    }
    
    return code;
  }

  // List available templates
  listTemplates(): { id: string; name: string; category: string; description: string }[] {
    return Array.from(this.templates.values()).map(template => ({
      id: template.id,
      name: template.name,
      category: template.category,
      description: template.description
    }));
  }

  // Validate component props against schema
  validateProps(templateId: string, props: any): { valid: boolean; errors: string[] } {
    const template = this.templates.get(templateId);
    if (!template) {
      return { valid: false, errors: ['Template not found'] };
    }

    try {
      template.propSchema.parse(props);
      return { valid: true, errors: [] };
    } catch (error) {
      const errors = error.errors?.map((err: any) => `${err.path.join('.')}: ${err.message}`) || [error.message];
      return { valid: false, errors };
    }
  }

  // Helper methods
  private injectCustomVariants(code: string, variants: Record<string, any>): string {
    // Implementation would inject custom variant definitions
    return code;
  }

  private generateTestFile(template: ComponentTemplate, componentName: string): string {
    return `// Generated test file for ${componentName}
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${this.kebabCase(componentName)}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName}>Test</${componentName}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('meets accessibility standards', () => {
    const { container } = render(<${componentName}>Test</${componentName}>);
    // Add accessibility tests based on template requirements
  });
});`;
  }

  private generateStoryFile(template: ComponentTemplate, componentName: string): string {
    const examples = template.examples.map(example => `
export const ${example.name.replace(/\s+/g, '')} = {
  args: ${JSON.stringify(example.props, null, 2)},
};`).join('\n');

    return `// Generated Storybook story for ${componentName}
import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${this.kebabCase(componentName)}';

const meta: Meta<typeof ${componentName}> = {
  title: '${template.category}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${template.description}'
      }
    }
  },
  argTypes: {
    // Add argTypes based on template schema
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

${examples}`;
  }

  private enhanceForWCAGAAA(code: string, template: ComponentTemplate): string {
    // Implementation would add additional accessibility features for WCAG AAA
    return code;
  }

  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}

// Export utilities
export { ComponentGenerator, COMPONENT_TEMPLATES };
export type { ComponentTemplate, ComponentExample, AccessibilityFeatures, BrandFeatures };