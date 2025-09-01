// CONTEXT7 SOURCE: /microsoft/typescript - Migration patterns and code transformation utilities
// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Component migration strategies
// IMPLEMENTATION REASON: Strategic migration system for systematic component standardization
// Addresses 4,365 component standardization opportunities with automated transformation paths

/**
 * My Private Tutor Online - Migration Path Generation System
 * 
 * Strategic pathways for systematic component standardization:
 * - 2,093 button standardizations (native → Button component)  
 * - 927 typography element brand compliance (fonts + colors)
 * - 63 video AspectRatio integration (layout stability)
 * - Complete architectural consistency enforcement
 * 
 * Royal client quality with enterprise-grade migration automation.
 */

import { type ComponentElement, type ValidationContext } from './validation-rules';

// CONTEXT7 SOURCE: /microsoft/typescript - Migration path type definitions
export interface MigrationPath {
  id: string;
  name: string;
  description: string;
  fromPattern: ComponentPattern;
  toPattern: ComponentPattern;
  category: 'standardization' | 'accessibility' | 'performance' | 'brand-compliance';
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedEffort: {
    timePerInstance: string;
    complexity: 'trivial' | 'simple' | 'moderate' | 'complex';
    automationLevel: 'full' | 'partial' | 'manual';
  };
  prerequisites: string[];
  transformationSteps: TransformationStep[];
  validation: ValidationStep[];
  benefits: string[];
  risks: string[];
  rollbackStrategy: string;
}

export interface ComponentPattern {
  elementType: string;
  requiredProps?: string[];
  optionalProps?: string[];
  children?: ComponentPattern[];
  className?: string;
  imports?: string[];
  codeExample: string;
}

export interface TransformationStep {
  order: number;
  name: string;
  description: string;
  action: 'add-import' | 'replace-element' | 'modify-props' | 'add-wrapper' | 'update-className';
  automated: boolean;
  parameters: Record<string, any>;
  validation: string;
  rollback: string;
}

export interface ValidationStep {
  name: string;
  description: string;
  automated: boolean;
  criteria: string[];
  expectedOutcome: string;
}

export interface MigrationAnalysis {
  totalInstances: number;
  byPriority: Record<string, number>;
  estimatedTotalTime: string;
  automationCoverage: number;
  dependencyGraph: MigrationDependency[];
  riskAssessment: RiskAssessment;
}

export interface MigrationDependency {
  fromMigration: string;
  toMigration: string;
  reason: string;
  blocking: boolean;
}

export interface RiskAssessment {
  overall: 'low' | 'medium' | 'high';
  breakingChanges: number;
  performanceImpact: 'positive' | 'neutral' | 'negative';
  userExperience: 'improved' | 'unchanged' | 'degraded';
  maintenanceBurden: 'reduced' | 'unchanged' | 'increased';
}

// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Component transformation patterns
export const MIGRATION_PATHS: Record<string, MigrationPath> = {
  // =============================================================================
  // BUTTON STANDARDIZATION (2,093 instances)
  // =============================================================================
  'native-button-to-design-system': {
    id: 'native-button-to-design-system',
    name: 'Native Button → Design System Button',
    description: 'Replace native HTML button elements with standardized Button component from design system',
    fromPattern: {
      elementType: 'button',
      optionalProps: ['onClick', 'disabled', 'type', 'className', 'style', 'aria-label'],
      className: 'any',
      imports: [],
      codeExample: '<button className="btn-primary" onClick={handleClick}>Book Consultation</button>'
    },
    toPattern: {
      elementType: 'Button',
      requiredProps: ['children'],
      optionalProps: ['variant', 'size', 'disabled', 'onClick', 'asChild', 'loading', 'aria-label'],
      imports: ['import { Button } from "@/components/ui/button";'],
      codeExample: '<Button variant="primary" size="md" onClick={handleClick}>Book Consultation</Button>'
    },
    category: 'standardization',
    priority: 'high',
    estimatedEffort: {
      timePerInstance: '3-5 minutes',
      complexity: 'simple',
      automationLevel: 'partial'
    },
    prerequisites: [
      'Design system Button component available',
      'Brand variant mapping defined',
      'Accessibility requirements understood'
    ],
    transformationSteps: [
      {
        order: 1,
        name: 'Add Button Import',
        description: 'Import Button component from design system',
        action: 'add-import',
        automated: true,
        parameters: {
          importPath: '@/components/ui/button',
          namedImport: 'Button'
        },
        validation: 'Check if import already exists',
        rollback: 'Remove import if no Button components used'
      },
      {
        order: 2,
        name: 'Analyze Current Styling',
        description: 'Determine appropriate variant based on current className',
        action: 'modify-props',
        automated: true,
        parameters: {
          classNameMapping: {
            'btn-primary': 'primary',
            'btn-secondary': 'secondary',
            'btn-outline': 'outline',
            'btn-ghost': 'ghost',
            'btn-link': 'link',
            'bg-brand-metallic-blue': 'primary',
            'bg-brand-aztec-gold': 'secondary',
            'border-brand-metallic-blue': 'outline'
          }
        },
        validation: 'Verify variant mapping produces expected visual result',
        rollback: 'Revert to original className if mapping incorrect'
      },
      {
        order: 3,
        name: 'Replace Element',
        description: 'Replace <button> with <Button> while preserving functionality',
        action: 'replace-element',
        automated: true,
        parameters: {
          preserveProps: ['onClick', 'disabled', 'aria-label'],
          removeProps: ['type', 'className', 'style'],
          addProps: {
            variant: 'determined-in-step-2',
            size: 'md'
          }
        },
        validation: 'Ensure all event handlers and accessibility attributes preserved',
        rollback: 'Revert to original button element'
      },
      {
        order: 4,
        name: 'Validate Accessibility',
        description: 'Ensure button maintains or improves accessibility',
        action: 'modify-props',
        automated: false,
        parameters: {
          checkAriaLabel: true,
          verifyTextContent: true,
          ensureKeyboardAccess: true
        },
        validation: 'Manual review of accessibility features',
        rollback: 'Add missing accessibility attributes'
      }
    ],
    validation: [
      {
        name: 'Visual Regression Test',
        description: 'Verify button appearance matches expected design',
        automated: false,
        criteria: [
          'Button colors match brand guidelines',
          'Typography uses correct font family',
          'Hover states work correctly',
          'Focus indicators visible'
        ],
        expectedOutcome: 'Button visually identical or improved compared to original'
      },
      {
        name: 'Accessibility Test',
        description: 'Confirm accessibility compliance maintained or improved',
        automated: true,
        criteria: [
          'Button has accessible name',
          'Keyboard navigation works',
          'Screen reader announces correctly',
          'Color contrast meets WCAG AA'
        ],
        expectedOutcome: 'All accessibility requirements met'
      },
      {
        name: 'Functionality Test',
        description: 'Ensure all interactive behavior preserved',
        automated: true,
        criteria: [
          'Click events fire correctly',
          'Disabled state prevents interaction',
          'Form submission works if applicable',
          'Loading state displays if used'
        ],
        expectedOutcome: 'All functionality works as before migration'
      }
    ],
    benefits: [
      'Consistent brand appearance across all buttons',
      'Built-in accessibility features',
      'Reduced code duplication',
      'Easier maintenance and updates',
      'Automatic responsive behavior',
      'Loading state support',
      'Type safety with TypeScript'
    ],
    risks: [
      'Potential visual differences requiring adjustment',
      'Props API differences may require updates',
      'Bundle size increase from additional component',
      'Dependency on design system updates'
    ],
    rollbackStrategy: 'Automated rollback available - reverts to original button element with preserved functionality'
  },

  // =============================================================================
  // TYPOGRAPHY BRAND COMPLIANCE (927 instances)
  // =============================================================================
  'typography-brand-compliance': {
    id: 'typography-brand-compliance',
    name: 'Typography Brand Compliance',
    description: 'Apply brand typography (Playfair Display for headings, Source Serif for body) and colors',
    fromPattern: {
      elementType: 'h1|h2|h3|h4|h5|h6|p|span|div',
      optionalProps: ['className', 'children'],
      className: 'any-or-none',
      imports: [],
      codeExample: '<h1 className="text-2xl">Expert Private Tutoring</h1>'
    },
    toPattern: {
      elementType: 'h1|h2|h3|h4|h5|h6|p|span|div',
      requiredProps: ['children'],
      optionalProps: ['className'],
      className: 'font-playfair text-brand-metallic-blue-700', // Example for h1
      imports: [],
      codeExample: '<h1 className="font-playfair text-brand-metallic-blue-700 text-4xl">Expert Private Tutoring</h1>'
    },
    category: 'brand-compliance',
    priority: 'high',
    estimatedEffort: {
      timePerInstance: '1-2 minutes',
      complexity: 'trivial',
      automationLevel: 'full'
    },
    prerequisites: [
      'Brand fonts loaded (Playfair Display, Source Serif)',
      'Brand color tokens defined in Tailwind config',
      'Typography hierarchy guidelines established'
    ],
    transformationSteps: [
      {
        order: 1,
        name: 'Determine Element Type',
        description: 'Identify if element is heading, body text, or other',
        action: 'modify-props',
        automated: true,
        parameters: {
          elementTypeMapping: {
            'h1|h2|h3|h4|h5|h6': 'heading',
            'p|span|div|li|td': 'body-text'
          }
        },
        validation: 'Verify element type correctly identified',
        rollback: 'Not applicable - no changes made'
      },
      {
        order: 2,
        name: 'Apply Brand Font',
        description: 'Add appropriate brand font class based on element type',
        action: 'update-className',
        automated: true,
        parameters: {
          fontMapping: {
            'heading': 'font-playfair',
            'body-text': 'font-source-serif'
          }
        },
        validation: 'Verify font class added correctly',
        rollback: 'Remove added font class'
      },
      {
        order: 3,
        name: 'Apply Brand Colors',
        description: 'Add brand color classes based on element hierarchy',
        action: 'update-className',
        automated: true,
        parameters: {
          colorMapping: {
            'h1': 'text-brand-metallic-blue-700',
            'h2': 'text-brand-metallic-blue-600',
            'h3': 'text-brand-metallic-blue-500',
            'h4': 'text-brand-metallic-blue-500',
            'h5': 'text-brand-metallic-blue-400',
            'h6': 'text-brand-metallic-blue-400',
            'default': 'text-brand-metallic-blue-500'
          }
        },
        validation: 'Verify color contrast meets WCAG AA standards',
        rollback: 'Remove added color classes'
      },
      {
        order: 4,
        name: 'Preserve Existing Styles',
        description: 'Maintain non-conflicting existing styles',
        action: 'update-className',
        automated: true,
        parameters: {
          preserveClasses: ['text-center', 'text-left', 'text-right', 'text-justify', 'uppercase', 'lowercase', 'capitalize'],
          removeClasses: ['font-sans', 'font-serif', 'font-mono', 'text-black', 'text-gray-900']
        },
        validation: 'Verify layout and non-typography styles preserved',
        rollback: 'Restore original className'
      }
    ],
    validation: [
      {
        name: 'Brand Compliance Check',
        description: 'Verify typography matches brand guidelines',
        automated: true,
        criteria: [
          'Headings use Playfair Display font',
          'Body text uses Source Serif font',
          'Colors use brand palette',
          'Typography hierarchy maintained'
        ],
        expectedOutcome: 'All text elements comply with brand guidelines'
      },
      {
        name: 'Visual Consistency Check',
        description: 'Ensure consistent appearance across all pages',
        automated: false,
        criteria: [
          'Font rendering consistent across browsers',
          'Color contrast sufficient for readability',
          'Text scaling responsive',
          'Line height and spacing appropriate'
        ],
        expectedOutcome: 'Professional, consistent typography throughout site'
      }
    ],
    benefits: [
      'Consistent brand appearance',
      'Professional royal client quality',
      'Improved readability',
      'SEO benefits from proper heading structure',
      'Faster design system adoption',
      'Reduced design debt'
    ],
    risks: [
      'Font loading performance impact',
      'Potential layout shifts during font load',
      'Increased CSS bundle size',
      'Browser compatibility considerations'
    ],
    rollbackStrategy: 'Automated rollback removes brand classes and restores original styling'
  },

  // =============================================================================
  // VIDEO ASPECT RATIO INTEGRATION (63 instances)
  // =============================================================================
  'video-aspect-ratio-integration': {
    id: 'video-aspect-ratio-integration',
    name: 'Video AspectRatio Integration',
    description: 'Wrap video elements with AspectRatio component to prevent layout shift',
    fromPattern: {
      elementType: 'video',
      optionalProps: ['src', 'controls', 'autoplay', 'muted', 'poster', 'className'],
      imports: [],
      codeExample: '<video src="/hero-video.mp4" controls className="w-full" />'
    },
    toPattern: {
      elementType: 'video',
      optionalProps: ['src', 'controls', 'autoplay', 'muted', 'poster', 'className'],
      children: [],
      imports: ['import { AspectRatio } from "@radix-ui/react-aspect-ratio";'],
      codeExample: '<AspectRatio ratio={16/9}><video src="/hero-video.mp4" controls className="w-full h-full object-cover" /></AspectRatio>'
    },
    category: 'performance',
    priority: 'high',
    estimatedEffort: {
      timePerInstance: '8-12 minutes',
      complexity: 'moderate',
      automationLevel: 'partial'
    },
    prerequisites: [
      'Radix UI AspectRatio component installed',
      'Understanding of appropriate aspect ratios for content',
      'CSS object-fit support verified'
    ],
    transformationSteps: [
      {
        order: 1,
        name: 'Add AspectRatio Import',
        description: 'Import AspectRatio component from Radix UI',
        action: 'add-import',
        automated: true,
        parameters: {
          importPath: '@radix-ui/react-aspect-ratio',
          namedImport: 'AspectRatio'
        },
        validation: 'Check if import already exists',
        rollback: 'Remove import if no AspectRatio components used'
      },
      {
        order: 2,
        name: 'Determine Aspect Ratio',
        description: 'Analyze video content to determine appropriate aspect ratio',
        action: 'modify-props',
        automated: false,
        parameters: {
          commonRatios: {
            'hero-video': '16/9',
            'testimonial': '4/3',
            'square-social': '1/1',
            'vertical-mobile': '9/16'
          }
        },
        validation: 'Manual review of video content and intended presentation',
        rollback: 'Use default 16/9 ratio'
      },
      {
        order: 3,
        name: 'Wrap with AspectRatio',
        description: 'Add AspectRatio wrapper around video element',
        action: 'add-wrapper',
        automated: true,
        parameters: {
          wrapperElement: 'AspectRatio',
          wrapperProps: {
            ratio: 'determined-in-step-2'
          }
        },
        validation: 'Verify video maintains functionality within wrapper',
        rollback: 'Remove AspectRatio wrapper'
      },
      {
        order: 4,
        name: 'Update Video Styling',
        description: 'Add responsive classes for proper scaling within AspectRatio',
        action: 'update-className',
        automated: true,
        parameters: {
          addClasses: ['w-full', 'h-full', 'object-cover'],
          removeClasses: ['w-auto', 'h-auto']
        },
        validation: 'Verify video fills container properly without distortion',
        rollback: 'Restore original video className'
      },
      {
        order: 5,
        name: 'Accessibility Enhancement',
        description: 'Ensure video accessibility is maintained or improved',
        action: 'modify-props',
        automated: false,
        parameters: {
          ensureControls: true,
          verifyAriaLabel: true,
          checkCaptions: true
        },
        validation: 'Manual accessibility review',
        rollback: 'Not applicable - accessibility improvements retained'
      }
    ],
    validation: [
      {
        name: 'Layout Stability Test',
        description: 'Verify no layout shift occurs during video loading',
        automated: true,
        criteria: [
          'No Cumulative Layout Shift (CLS) detected',
          'Video container maintains size before load',
          'Surrounding content remains stable',
          'Responsive behavior works correctly'
        ],
        expectedOutcome: 'Zero layout shift during video loading'
      },
      {
        name: 'Cross-Device Test',
        description: 'Test video presentation across different screen sizes',
        automated: false,
        criteria: [
          'Video scales correctly on mobile',
          'Aspect ratio maintained on all devices',
          'Controls remain accessible',
          'Performance acceptable on slower devices'
        ],
        expectedOutcome: 'Consistent video experience across all devices'
      }
    ],
    benefits: [
      'Eliminates Cumulative Layout Shift (CLS)',
      'Improved Core Web Vitals scores',
      'Consistent video presentation',
      'Better user experience',
      'Responsive video behavior',
      'Professional appearance'
    ],
    risks: [
      'Potential changes to video dimensions',
      'Need to adjust surrounding layout',
      'Additional dependency on Radix UI',
      'Possible performance impact from wrapper component'
    ],
    rollbackStrategy: 'Remove AspectRatio wrapper and restore original video element with preserved functionality'
  },

  // =============================================================================
  // ACCESSIBILITY ENHANCEMENT PATHS
  // =============================================================================
  'accessibility-aria-labels': {
    id: 'accessibility-aria-labels',
    name: 'Accessibility ARIA Labels',
    description: 'Add missing aria-label attributes to interactive elements',
    fromPattern: {
      elementType: 'button|input|select|video|img',
      optionalProps: ['onClick', 'onChange', 'src', 'alt'],
      imports: [],
      codeExample: '<button onClick={handleClick}><Icon name="calendar" /></button>'
    },
    toPattern: {
      elementType: 'button|input|select|video|img',
      requiredProps: ['aria-label'],
      optionalProps: ['onClick', 'onChange', 'src', 'alt'],
      imports: [],
      codeExample: '<button aria-label="Book consultation" onClick={handleClick}><Icon name="calendar" /></button>'
    },
    category: 'accessibility',
    priority: 'critical',
    estimatedEffort: {
      timePerInstance: '2-3 minutes',
      complexity: 'simple',
      automationLevel: 'manual'
    },
    prerequisites: [
      'Understanding of element purpose and context',
      'WCAG 2.1 guidelines knowledge',
      'Screen reader testing capabilities'
    ],
    transformationSteps: [
      {
        order: 1,
        name: 'Identify Element Purpose',
        description: 'Determine the function and context of the element',
        action: 'modify-props',
        automated: false,
        parameters: {
          analysisPoints: [
            'What action does this element perform?',
            'What information does it convey?',
            'How would a screen reader user understand it?',
            'What context is needed for clarity?'
          ]
        },
        validation: 'Manual analysis of element purpose',
        rollback: 'Not applicable - no changes made'
      },
      {
        order: 2,
        name: 'Generate Descriptive Label',
        description: 'Create clear, concise aria-label based on element purpose',
        action: 'modify-props',
        automated: false,
        parameters: {
          labelGuidelines: [
            'Be specific and descriptive',
            'Include action and context',
            'Keep under 100 characters',
            'Avoid redundant words like "button" or "image"',
            'Use sentence case'
          ]
        },
        validation: 'Review label for clarity and appropriateness',
        rollback: 'Remove aria-label if inappropriate'
      },
      {
        order: 3,
        name: 'Add ARIA Label',
        description: 'Add the generated aria-label attribute to the element',
        action: 'modify-props',
        automated: true,
        parameters: {
          attributeName: 'aria-label',
          attributeValue: 'generated-in-step-2'
        },
        validation: 'Verify aria-label attribute added correctly',
        rollback: 'Remove aria-label attribute'
      },
      {
        order: 4,
        name: 'Validate Screen Reader Experience',
        description: 'Test with screen reader to ensure proper announcement',
        action: 'modify-props',
        automated: false,
        parameters: {
          testingTools: ['NVDA', 'JAWS', 'VoiceOver', 'TalkBack'],
          testScenarios: [
            'Tab navigation to element',
            'Element activation/interaction',
            'Context understanding'
          ]
        },
        validation: 'Screen reader announces element purpose clearly',
        rollback: 'Adjust aria-label based on testing results'
      }
    ],
    validation: [
      {
        name: 'WCAG Compliance Check',
        description: 'Verify element meets WCAG 2.1 AA standards',
        automated: true,
        criteria: [
          'Element has accessible name',
          'Name describes element purpose',
          'Name is not redundant with element type',
          'Name is appropriately concise'
        ],
        expectedOutcome: 'Element fully accessible to assistive technologies'
      }
    ],
    benefits: [
      'WCAG 2.1 AA compliance',
      'Better screen reader experience',
      'Improved accessibility scores',
      'Legal compliance',
      'Inclusive user experience',
      'SEO benefits from semantic markup'
    ],
    risks: [
      'Incorrect labels may confuse users',
      'Over-verbose labels may be annoying',
      'Maintenance overhead for keeping labels current'
    ],
    rollbackStrategy: 'Remove added aria-label attributes to return to original state'
  }
};

// CONTEXT7 SOURCE: /microsoft/typescript - Migration analysis and orchestration
export class MigrationOrchestrator {
  private paths: Record<string, MigrationPath>;
  private analysisResults: MigrationAnalysis | null = null;

  constructor(paths: Record<string, MigrationPath> = MIGRATION_PATHS) {
    this.paths = paths;
  }

  analyzeMigrationScope(components: ComponentElement[]): MigrationAnalysis {
    const applicableMigrations: Record<string, number> = {};
    
    // Count instances for each migration path
    components.forEach(component => {
      Object.values(this.paths).forEach(path => {
        if (this.isElementApplicable(component, path.fromPattern)) {
          applicableMigrations[path.id] = (applicableMigrations[path.id] || 0) + 1;
        }
      });
    });

    // Calculate priority distribution
    const byPriority = Object.keys(applicableMigrations).reduce((acc, pathId) => {
      const path = this.paths[pathId];
      const count = applicableMigrations[pathId];
      acc[path.priority] = (acc[path.priority] || 0) + count;
      return acc;
    }, {} as Record<string, number>);

    // Calculate automation coverage
    const totalInstances = Object.values(applicableMigrations).reduce((sum, count) => sum + count, 0);
    const automatedInstances = Object.keys(applicableMigrations).reduce((sum, pathId) => {
      const path = this.paths[pathId];
      const count = applicableMigrations[pathId];
      const automationWeight = path.estimatedEffort.automationLevel === 'full' ? 1 : 
                              path.estimatedEffort.automationLevel === 'partial' ? 0.7 : 0.3;
      return sum + (count * automationWeight);
    }, 0);

    const automationCoverage = totalInstances > 0 ? Math.round((automatedInstances / totalInstances) * 100) : 0;

    // Generate dependency graph
    const dependencyGraph = this.buildDependencyGraph();

    // Assess risks
    const riskAssessment = this.assessRisks(applicableMigrations);

    // Estimate total time
    const estimatedTotalTime = this.calculateTotalTime(applicableMigrations);

    this.analysisResults = {
      totalInstances,
      byPriority,
      estimatedTotalTime,
      automationCoverage,
      dependencyGraph,
      riskAssessment
    };

    return this.analysisResults;
  }

  generateExecutionPlan(): {
    phases: MigrationPhase[];
    timeline: string;
    resourceRequirements: string[];
    successMetrics: string[];
  } {
    if (!this.analysisResults) {
      throw new Error('Must run analyzeMigrationScope first');
    }

    const phases: MigrationPhase[] = [
      {
        name: 'Phase 1: Critical Accessibility',
        priority: 'critical',
        description: 'Address all critical accessibility issues first',
        estimatedDuration: '1-2 weeks',
        migrations: Object.keys(this.paths).filter(id => 
          this.paths[id].priority === 'critical' && 
          this.paths[id].category === 'accessibility'
        )
      },
      {
        name: 'Phase 2: High Priority Standardization',
        priority: 'high',
        description: 'Standardize buttons and apply brand typography',
        estimatedDuration: '3-4 weeks',
        migrations: Object.keys(this.paths).filter(id => 
          this.paths[id].priority === 'high' && 
          ['standardization', 'brand-compliance'].includes(this.paths[id].category)
        )
      },
      {
        name: 'Phase 3: Performance Optimization',
        priority: 'high',
        description: 'Implement AspectRatio wrappers and performance improvements',
        estimatedDuration: '2-3 weeks',
        migrations: Object.keys(this.paths).filter(id => 
          this.paths[id].category === 'performance'
        )
      },
      {
        name: 'Phase 4: Final Polish',
        priority: 'medium',
        description: 'Complete remaining medium and low priority items',
        estimatedDuration: '2 weeks',
        migrations: Object.keys(this.paths).filter(id => 
          ['medium', 'low'].includes(this.paths[id].priority)
        )
      }
    ];

    return {
      phases,
      timeline: '8-11 weeks total',
      resourceRequirements: [
        '1 Senior Frontend Developer (full-time)',
        '1 UX/Accessibility Specialist (part-time)',
        'Design System Coordinator (consultation)',
        'QA Testing Resources (final 2 weeks)'
      ],
      successMetrics: [
        '100% WCAG 2.1 AA compliance',
        '95%+ brand compliance score',
        'Zero layout shift (CLS) from videos',
        '90%+ component standardization',
        'Improved Core Web Vitals scores'
      ]
    };
  }

  private isElementApplicable(element: ComponentElement, pattern: ComponentPattern): boolean {
    // Check if element type matches pattern
    const typeMatches = pattern.elementType.split('|').includes(element.type);
    if (!typeMatches) return false;

    // Additional pattern matching logic would go here
    // This is simplified for demonstration
    return true;
  }

  private buildDependencyGraph(): MigrationDependency[] {
    // Build dependencies between migrations
    return [
      {
        fromMigration: 'accessibility-aria-labels',
        toMigration: 'native-button-to-design-system',
        reason: 'Accessibility fixes should be applied before component standardization',
        blocking: false
      },
      {
        fromMigration: 'typography-brand-compliance',
        toMigration: 'native-button-to-design-system',
        reason: 'Typography changes may affect button styling',
        blocking: false
      }
    ];
  }

  private assessRisks(migrations: Record<string, number>): RiskAssessment {
    const totalInstances = Object.values(migrations).reduce((sum, count) => sum + count, 0);
    const highRiskMigrations = Object.keys(migrations).filter(id => 
      this.paths[id].risks.length > 2
    ).length;

    const riskRatio = highRiskMigrations / Object.keys(migrations).length;

    return {
      overall: riskRatio > 0.5 ? 'high' : riskRatio > 0.2 ? 'medium' : 'low',
      breakingChanges: Math.floor(totalInstances * 0.05), // Estimate 5% may need manual adjustment
      performanceImpact: 'positive', // Design system improvements expected
      userExperience: 'improved', // Better accessibility and consistency
      maintenanceBurden: 'reduced' // Standardized components easier to maintain
    };
  }

  private calculateTotalTime(migrations: Record<string, number>): string {
    let totalMinutes = 0;

    Object.entries(migrations).forEach(([pathId, count]) => {
      const path = this.paths[pathId];
      const timePerInstance = this.parseTimeString(path.estimatedEffort.timePerInstance);
      totalMinutes += timePerInstance * count;
    });

    const hours = Math.round(totalMinutes / 60);
    const days = Math.round(hours / 8); // 8-hour work days
    const weeks = Math.round(days / 5); // 5-day work weeks

    if (weeks > 1) {
      return `${weeks} weeks (${days} days, ${hours} hours)`;
    } else if (days > 1) {
      return `${days} days (${hours} hours)`;
    } else {
      return `${hours} hours`;
    }
  }

  private parseTimeString(timeString: string): number {
    // Parse strings like "3-5 minutes" to average minutes
    const match = timeString.match(/(\d+)(?:-(\d+))?\s+minutes?/);
    if (match) {
      const min = parseInt(match[1]);
      const max = match[2] ? parseInt(match[2]) : min;
      return (min + max) / 2;
    }
    return 5; // Default fallback
  }
}

interface MigrationPhase {
  name: string;
  priority: string;
  description: string;
  estimatedDuration: string;
  migrations: string[];
}

export { MigrationOrchestrator };
export type { MigrationPath, ComponentPattern, TransformationStep, MigrationAnalysis };