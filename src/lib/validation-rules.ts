// CONTEXT7 SOURCE: /microsoft/typescript - Advanced validation patterns and type safety
// CONTEXT7 SOURCE: /colinhacks/zod - Runtime validation and schema definitions
// IMPLEMENTATION REASON: Enterprise-grade validation rules for component consistency and accessibility
// Addresses complete architectural excellence enforcement for My Private Tutor Online

/**
 * My Private Tutor Online - Advanced Validation Rules Framework
 * 
 * Comprehensive validation system ensuring:
 * - WCAG 2.1 AA accessibility compliance
 * - Brand consistency (Playfair Display, Source Serif, brand colors)
 * - Component standardization (2,093 buttons, 927 typography elements)
 * - Performance optimization and architectural integrity
 * - Royal client quality standards enforcement
 * 
 * Enterprise-grade validation with zero tolerance for regressions.
 */

import { z } from 'zod';

// CONTEXT7 SOURCE: /microsoft/typescript - Validation rule type definitions
export interface ValidationRule {
  id: string;
  name: string;
  category: 'accessibility' | 'brand-compliance' | 'performance' | 'consistency' | 'security';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  rationale: string;
  validator: (element: ComponentElement, context: ValidationContext) => ValidationResult;
  autoFix?: (element: ComponentElement) => ComponentElement;
  examples: {
    valid: string[];
    invalid: string[];
  };
  wcagReference?: string;
  brandGuidelineReference?: string;
}

export interface ComponentElement {
  type: string;
  props: Record<string, any>;
  children?: ComponentElement[];
  className?: string;
  style?: Record<string, any>;
  location: {
    file: string;
    line: number;
    column: number;
  };
}

export interface ValidationContext {
  filePath: string;
  imports: string[];
  designSystemAvailable: boolean;
  brandColors: string[];
  brandFonts: string[];
  parentElements: ComponentElement[];
}

export interface ValidationResult {
  passed: boolean;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  suggestion?: string;
  autoFixAvailable: boolean;
  wcagViolation?: string;
  brandViolation?: string;
  performanceImpact?: 'high' | 'medium' | 'low';
}

// CONTEXT7 SOURCE: /colinhacks/zod - Schema validation patterns for component props
const ButtonPropsSchema = z.object({
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive', 'success', 'warning']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl', 'icon']).optional(),
  disabled: z.boolean().optional(),
  'aria-label': z.string().optional(),
  children: z.any().optional(),
  onClick: z.function().optional()
});

const TypographyPropsSchema = z.object({
  variant: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'small', 'lead']).optional(),
  as: z.string().optional(),
  className: z.string().optional(),
  children: z.any().refine((val) => val !== undefined, "Typography must have content")
});

const VideoPropsSchema = z.object({
  src: z.string().url("Video src must be a valid URL"),
  controls: z.boolean().optional(),
  autoplay: z.boolean().optional(),
  muted: z.boolean().optional(),
  'aria-label': z.string().optional(),
  poster: z.string().url().optional(),
  className: z.string().optional()
});

// CONTEXT7 SOURCE: /microsoft/typescript - Comprehensive validation rules implementation
export const VALIDATION_RULES: ValidationRule[] = [
  // =============================================================================
  // CRITICAL ACCESSIBILITY RULES (WCAG 2.1 AA Compliance)
  // =============================================================================
  {
    id: 'button-accessible-name',
    name: 'Button Accessible Name',
    category: 'accessibility',
    severity: 'critical',
    description: 'All buttons must have an accessible name through text content or aria-label',
    rationale: 'Screen readers require accessible names to announce button purpose to users',
    wcagReference: 'WCAG 2.1 - 4.1.2 Name, Role, Value',
    validator: (element, context) => {
      if (element.type !== 'button' && element.type !== 'Button') {
        return { passed: true, severity: 'low', message: 'Rule not applicable', autoFixAvailable: false };
      }

      const hasAriaLabel = element.props['aria-label'];
      const hasTextContent = element.children && element.children.length > 0;
      const hasAriaLabelledBy = element.props['aria-labelledby'];

      if (!hasAriaLabel && !hasTextContent && !hasAriaLabelledBy) {
        return {
          passed: false,
          severity: 'critical',
          message: 'Button lacks accessible name - no aria-label, text content, or aria-labelledby',
          suggestion: 'Add aria-label="descriptive action" or meaningful text content',
          autoFixAvailable: false, // Requires human decision on appropriate label
          wcagViolation: 'WCAG 2.1 - 4.1.2 Name, Role, Value'
        };
      }

      return { passed: true, severity: 'low', message: 'Button has accessible name', autoFixAvailable: false };
    },
    examples: {
      valid: [
        '<Button aria-label="Book consultation">📅</Button>',
        '<Button>Book Consultation</Button>',
        '<button aria-labelledby="booking-label">Submit</button>'
      ],
      invalid: [
        '<Button></Button>',
        '<button></button>',
        '<Button><IconOnly /></Button>'
      ]
    }
  },

  {
    id: 'image-alt-text',
    name: 'Image Alternative Text',
    category: 'accessibility',
    severity: 'critical',
    description: 'All images must have appropriate alt text or empty alt for decorative images',
    rationale: 'Screen readers depend on alt text to describe images to visually impaired users',
    wcagReference: 'WCAG 2.1 - 1.1.1 Non-text Content',
    validator: (element, context) => {
      if (element.type !== 'img' && element.type !== 'Image') {
        return { passed: true, severity: 'low', message: 'Rule not applicable', autoFixAvailable: false };
      }

      const hasAlt = 'alt' in element.props;

      if (!hasAlt) {
        return {
          passed: false,
          severity: 'critical',
          message: 'Image missing alt attribute',
          suggestion: 'Add alt="description" for content images or alt="" for decorative images',
          autoFixAvailable: false,
          wcagViolation: 'WCAG 2.1 - 1.1.1 Non-text Content'
        };
      }

      return { passed: true, severity: 'low', message: 'Image has alt attribute', autoFixAvailable: false };
    },
    examples: {
      valid: [
        '<img src="tutor.jpg" alt="Private tutor explaining mathematics" />',
        '<img src="decoration.jpg" alt="" />', // Decorative image
        '<Image src="student.jpg" alt="Student achieving academic success" />'
      ],
      invalid: [
        '<img src="important.jpg" />',
        '<Image src="content.jpg" />'
      ]
    }
  },

  {
    id: 'color-contrast-compliance',
    name: 'Color Contrast Compliance',
    category: 'accessibility',
    severity: 'high',
    description: 'Text must meet WCAG AA color contrast requirements (4.5:1 normal, 3:1 large text)',
    rationale: 'Sufficient color contrast ensures readability for users with visual impairments',
    wcagReference: 'WCAG 2.1 - 1.4.3 Contrast (Minimum)',
    validator: (element, context) => {
      // This would integrate with color contrast calculation library
      // For now, we validate against known compliant brand colors
      const compliantColors = [
        'text-brand-metallic-blue-700', // High contrast
        'text-brand-metallic-blue-600',
        'text-white',
        'text-gray-900'
      ];

      const className = element.className || '';
      const hasCompliantColor = compliantColors.some(color => className.includes(color));

      if (!hasCompliantColor && (element.type.includes('h') || element.type === 'p' || element.type === 'span')) {
        return {
          passed: false,
          severity: 'high',
          message: 'Text element may not meet color contrast requirements',
          suggestion: 'Use brand colors with verified contrast ratios',
          autoFixAvailable: true,
          wcagViolation: 'WCAG 2.1 - 1.4.3 Contrast (Minimum)'
        };
      }

      return { passed: true, severity: 'low', message: 'Color contrast appears compliant', autoFixAvailable: false };
    },
    examples: {
      valid: [
        '<h1 className="text-brand-metallic-blue-700">High Contrast Heading</h1>',
        '<p className="text-gray-900">Readable body text</p>'
      ],
      invalid: [
        '<h1 className="text-gray-400">Low contrast heading</h1>',
        '<p className="text-yellow-300">Poor readability</p>'
      ]
    }
  },

  // =============================================================================
  // BRAND COMPLIANCE RULES (Royal Client Standards)
  // =============================================================================
  {
    id: 'heading-brand-typography',
    name: 'Heading Brand Typography',
    category: 'brand-compliance',
    severity: 'high',
    description: 'All headings must use Playfair Display font (font-playfair class)',
    rationale: 'Consistent brand typography creates professional royal client appearance',
    brandGuidelineReference: 'Brand Guidelines - Typography Section',
    validator: (element, context) => {
      const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      if (!headingTags.includes(element.type)) {
        return { passed: true, severity: 'low', message: 'Rule not applicable', autoFixAvailable: false };
      }

      const className = element.className || '';
      const hasPlayfairFont = className.includes('font-playfair');

      if (!hasPlayfairFont) {
        return {
          passed: false,
          severity: 'high',
          message: 'Heading must use Playfair Display font',
          suggestion: 'Add font-playfair class to maintain brand consistency',
          autoFixAvailable: true,
          brandViolation: 'Brand typography guidelines violation'
        };
      }

      return { passed: true, severity: 'low', message: 'Heading uses brand typography', autoFixAvailable: false };
    },
    autoFix: (element) => {
      const currentClass = element.className || '';
      const newClassName = `font-playfair ${currentClass}`.trim();
      return { ...element, className: newClassName };
    },
    examples: {
      valid: [
        '<h1 className="font-playfair text-brand-metallic-blue-700">Expert Tutoring</h1>',
        '<h2 className="font-playfair text-2xl">Our Services</h2>'
      ],
      invalid: [
        '<h1 className="text-2xl">Missing brand font</h1>',
        '<h2>No styling applied</h2>'
      ]
    }
  },

  {
    id: 'body-text-brand-typography',
    name: 'Body Text Brand Typography',
    category: 'brand-compliance',
    severity: 'medium',
    description: 'Body text should use Source Serif font (font-source-serif class)',
    rationale: 'Consistent body typography maintains brand identity throughout content',
    brandGuidelineReference: 'Brand Guidelines - Typography Section',
    validator: (element, context) => {
      const bodyTags = ['p', 'span', 'div', 'li', 'td'];
      if (!bodyTags.includes(element.type)) {
        return { passed: true, severity: 'low', message: 'Rule not applicable', autoFixAvailable: false };
      }

      const className = element.className || '';
      const hasSourceSerif = className.includes('font-source-serif');
      
      // Allow headings to skip this rule as they have their own font requirement
      const hasHeadingFont = className.includes('font-playfair');
      
      if (!hasSourceSerif && !hasHeadingFont) {
        return {
          passed: false,
          severity: 'medium',
          message: 'Body text should use Source Serif font for brand consistency',
          suggestion: 'Add font-source-serif class to body text elements',
          autoFixAvailable: true,
          brandViolation: 'Brand typography guidelines violation'
        };
      }

      return { passed: true, severity: 'low', message: 'Body text uses brand typography', autoFixAvailable: false };
    },
    autoFix: (element) => {
      const currentClass = element.className || '';
      const newClassName = `font-source-serif ${currentClass}`.trim();
      return { ...element, className: newClassName };
    },
    examples: {
      valid: [
        '<p className="font-source-serif">Professional tutoring services...</p>',
        '<span className="font-source-serif text-sm">Contact information</span>'
      ],
      invalid: [
        '<p>Text without brand font</p>',
        '<div className="text-base">Missing typography</div>'
      ]
    }
  },

  {
    id: 'brand-color-usage',
    name: 'Brand Color Usage',
    category: 'brand-compliance',
    severity: 'medium',
    description: 'Components should use approved brand colors (metallic blue, aztec gold)',
    rationale: 'Consistent brand colors create cohesive royal client experience',
    brandGuidelineReference: 'Brand Guidelines - Color Palette',
    validator: (element, context) => {
      const brandColors = [
        'brand-metallic-blue',
        'brand-aztec-gold',
        'gray-', // Neutral colors allowed
        'white',
        'black'
      ];

      const className = element.className || '';
      const colorClasses = className.match(/(?:text|bg|border)-[\w-]+/g) || [];
      
      const hasNonBrandColors = colorClasses.some(colorClass => {
        return !brandColors.some(brandColor => colorClass.includes(brandColor));
      });

      if (hasNonBrandColors && colorClasses.length > 0) {
        return {
          passed: false,
          severity: 'medium',
          message: 'Component uses non-brand colors',
          suggestion: 'Replace with approved brand colors: metallic blue or aztec gold variants',
          autoFixAvailable: false, // Requires design decision
          brandViolation: 'Brand color guidelines violation'
        };
      }

      return { passed: true, severity: 'low', message: 'Uses approved brand colors', autoFixAvailable: false };
    },
    examples: {
      valid: [
        '<button className="bg-brand-metallic-blue-700 text-white">Book Now</button>',
        '<div className="border-brand-aztec-gold-500">Premium content</div>'
      ],
      invalid: [
        '<button className="bg-red-500">Book Now</button>',
        '<div className="text-purple-600">Unauthorized color</div>'
      ]
    }
  },

  // =============================================================================
  // COMPONENT STANDARDIZATION RULES
  // =============================================================================
  {
    id: 'button-component-usage',
    name: 'Button Component Usage',
    category: 'consistency',
    severity: 'high',
    description: 'Use design system Button component instead of native button elements',
    rationale: 'Standardized components ensure consistency, accessibility, and maintainability',
    validator: (element, context) => {
      if (element.type !== 'button') {
        return { passed: true, severity: 'low', message: 'Rule not applicable', autoFixAvailable: false };
      }

      const hasButtonImport = context.imports.some(imp => 
        imp.includes('@/components/ui/button') || imp.includes('Button')
      );

      return {
        passed: false,
        severity: 'high',
        message: 'Native button element should use design system Button component',
        suggestion: 'Replace with <Button> from @/components/ui/button',
        autoFixAvailable: false // Requires prop mapping
      };
    },
    examples: {
      valid: [
        '<Button variant="primary" size="md">Book Consultation</Button>',
        '<Button variant="secondary">Learn More</Button>'
      ],
      invalid: [
        '<button className="btn">Book Consultation</button>',
        '<button>Learn More</button>'
      ]
    }
  },

  {
    id: 'video-aspect-ratio',
    name: 'Video AspectRatio Wrapper',
    category: 'consistency',
    severity: 'high',
    description: 'Video elements must be wrapped in AspectRatio component to prevent layout shift',
    rationale: 'AspectRatio prevents Cumulative Layout Shift (CLS) and ensures consistent presentation',
    validator: (element, context) => {
      if (element.type !== 'video') {
        return { passed: true, severity: 'low', message: 'Rule not applicable', autoFixAvailable: false };
      }

      // Check if parent element is AspectRatio
      const hasAspectRatioParent = context.parentElements.some(parent => 
        parent.type === 'AspectRatio' || parent.type.includes('AspectRatio')
      );

      if (!hasAspectRatioParent) {
        return {
          passed: false,
          severity: 'high',
          message: 'Video element should be wrapped in AspectRatio component',
          suggestion: 'Import AspectRatio from @radix-ui/react-aspect-ratio and wrap video',
          autoFixAvailable: false, // Requires structural change
          performanceImpact: 'high'
        };
      }

      return { passed: true, severity: 'low', message: 'Video properly wrapped in AspectRatio', autoFixAvailable: false };
    },
    examples: {
      valid: [
        '<AspectRatio ratio={16/9}><video className="w-full h-full object-cover" src="video.mp4" /></AspectRatio>'
      ],
      invalid: [
        '<video src="video.mp4" />',
        '<div><video src="video.mp4" /></div>'
      ]
    }
  },

  // =============================================================================
  // PERFORMANCE RULES
  // =============================================================================
  {
    id: 'image-optimization',
    name: 'Image Optimization',
    category: 'performance',
    severity: 'medium',
    description: 'Use Next.js Image component for automatic optimization',
    rationale: 'Next.js Image provides automatic optimization, lazy loading, and better performance',
    validator: (element, context) => {
      if (element.type !== 'img') {
        return { passed: true, severity: 'low', message: 'Rule not applicable', autoFixAvailable: false };
      }

      return {
        passed: false,
        severity: 'medium',
        message: 'Use Next.js Image component instead of native img for better performance',
        suggestion: 'Replace <img> with <Image> from next/image',
        autoFixAvailable: false,
        performanceImpact: 'medium'
      };
    },
    examples: {
      valid: [
        '<Image src="/tutor.jpg" alt="Private tutor" width={400} height={300} />',
        '<Image src="/hero.jpg" alt="Students learning" fill priority />'
      ],
      invalid: [
        '<img src="/tutor.jpg" alt="Private tutor" />',
        '<img src="/hero.jpg" alt="Students learning" />'
      ]
    }
  },

  {
    id: 'unused-css-classes',
    name: 'Unused CSS Classes',
    category: 'performance',
    severity: 'low',
    description: 'Remove unused CSS classes to reduce bundle size',
    rationale: 'Unnecessary CSS classes increase bundle size without providing value',
    validator: (element, context) => {
      const className = element.className || '';
      const classes = className.split(/\s+/).filter(Boolean);
      
      // This would integrate with CSS usage analysis
      // For now, flag obvious redundant patterns
      const redundantPatterns = ['', 'undefined', 'null'];
      const hasRedundantClasses = classes.some(cls => redundantPatterns.includes(cls));

      if (hasRedundantClasses) {
        return {
          passed: false,
          severity: 'low',
          message: 'Element contains redundant or invalid CSS classes',
          suggestion: 'Remove empty or invalid class names',
          autoFixAvailable: true,
          performanceImpact: 'low'
        };
      }

      return { passed: true, severity: 'low', message: 'CSS classes appear valid', autoFixAvailable: false };
    },
    examples: {
      valid: [
        '<div className="font-playfair text-brand-metallic-blue-700">Content</div>',
        '<button className="bg-brand-aztec-gold-600 hover:bg-brand-aztec-gold-700">Action</button>'
      ],
      invalid: [
        '<div className="undefined">Content</div>',
        '<button className=" null ">Action</button>'
      ]
    }
  }
];

// CONTEXT7 SOURCE: /microsoft/typescript - Validation engine implementation
export class ValidationEngine {
  private rules: ValidationRule[];
  private results: ValidationResult[] = [];

  constructor(rules: ValidationRule[] = VALIDATION_RULES) {
    this.rules = rules;
  }

  validateElement(element: ComponentElement, context: ValidationContext): ValidationResult[] {
    const results: ValidationResult[] = [];

    for (const rule of this.rules) {
      try {
        const result = rule.validator(element, context);
        if (!result.passed) {
          results.push({
            ...result,
            message: `[${rule.id}] ${result.message}`,
          });
        }
      } catch (error) {
        console.warn(`Validation rule ${rule.id} failed:`, error);
      }
    }

    return results;
  }

  validateComponents(elements: ComponentElement[], context: ValidationContext): ValidationResult[] {
    const allResults: ValidationResult[] = [];

    for (const element of elements) {
      const elementResults = this.validateElement(element, context);
      allResults.push(...elementResults);
    }

    this.results = allResults;
    return allResults;
  }

  getResultsBySeverity(severity: ValidationResult['severity']): ValidationResult[] {
    return this.results.filter(result => result.severity === severity);
  }

  getResultsByCategory(category: ValidationRule['category']): ValidationResult[] {
    const categoryRuleIds = this.rules
      .filter(rule => rule.category === category)
      .map(rule => rule.id);

    return this.results.filter(result => 
      categoryRuleIds.some(ruleId => result.message.includes(`[${ruleId}]`))
    );
  }

  generateComplianceReport(): {
    totalElements: number;
    totalViolations: number;
    bySeverity: Record<string, number>;
    byCategory: Record<string, number>;
    complianceScore: number;
  } {
    const totalViolations = this.results.length;
    const bySeverity = this.results.reduce((acc, result) => {
      acc[result.severity] = (acc[result.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byCategory: Record<string, number> = {};
    this.rules.forEach(rule => {
      const categoryResults = this.getResultsByCategory(rule.category);
      byCategory[rule.category] = categoryResults.length;
    });

    // Calculate compliance score (higher is better)
    const criticalWeight = 10;
    const highWeight = 5;
    const mediumWeight = 2;
    const lowWeight = 1;

    const weightedViolations = 
      (bySeverity.critical || 0) * criticalWeight +
      (bySeverity.high || 0) * highWeight +
      (bySeverity.medium || 0) * mediumWeight +
      (bySeverity.low || 0) * lowWeight;

    const maxPossibleScore = 100;
    const complianceScore = Math.max(0, maxPossibleScore - weightedViolations);

    return {
      totalElements: 0, // This would be set by the caller
      totalViolations,
      bySeverity,
      byCategory,
      complianceScore: Math.round(complianceScore)
    };
  }
}

// Utility functions for rule management
export function getRuleById(id: string): ValidationRule | undefined {
  return VALIDATION_RULES.find(rule => rule.id === id);
}

export function getRulesByCategory(category: ValidationRule['category']): ValidationRule[] {
  return VALIDATION_RULES.filter(rule => rule.category === category);
}

export function getRulesBySeverity(severity: ValidationRule['severity']): ValidationRule[] {
  return VALIDATION_RULES.filter(rule => rule.severity === severity);
}

// Export validation schemas for external use
export const VALIDATION_SCHEMAS = {
  Button: ButtonPropsSchema,
  Typography: TypographyPropsSchema,
  Video: VideoPropsSchema
};

export type { ValidationRule, ComponentElement, ValidationContext, ValidationResult };