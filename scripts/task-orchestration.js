#!/usr/bin/env node

/**
 * Task Orchestration System for My Private Tutor Online
 * Optimizes developer experience through intelligent task coordination
 * 
 * Usage:
 *   npm run orchestrate:analyze    # Analyze task dependencies
 *   npm run orchestrate:schedule   # Create optimal execution plan
 *   npm run orchestrate:monitor    # Real-time progress tracking
 */

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import chalk from 'chalk';

class TaskOrchestrator {
  constructor() {
    this.revisionsTasks = this.parseRevisionsDocument();
    this.dependencies = this.analyzeDependencies();
    this.riskFactors = this.identifyRisks();
  }

  parseRevisionsDocument() {
    try {
      const content = readFileSync('./CLIENT_FEEDBACK_WEBSITE_REVISIONS.md', 'utf8');
      const tasks = [];
      let currentPage = '';
      let taskId = 1;

      // Extract tasks from markdown checkboxes
      const lines = content.split('\n');
      
      for (const line of lines) {
        // Detect page sections
        if (line.startsWith('## ') && !line.includes('GENERAL') && !line.includes('CHECKLIST')) {
          currentPage = line.replace('## ', '').replace(/[🏠👥⚙️📚🎯🎬💬📝❓📄]/g, '').trim();
        }

        // Extract tasks from checkboxes
        if (line.trim().startsWith('- [ ]')) {
          const taskText = line.replace('- [ ]', '').trim();
          const priority = this.determinePriority(taskText, currentPage);
          const complexity = this.assessComplexity(taskText);
          const estimatedHours = this.estimateHours(complexity, taskText);

          tasks.push({
            id: taskId++,
            text: taskText,
            page: currentPage,
            priority,
            complexity,
            estimatedHours,
            dependencies: [],
            status: 'pending',
            agent: this.suggestAgent(complexity, taskText)
          });
        }
      }

      return tasks;
    } catch (error) {
      console.error(chalk.red('Error parsing revisions document:'), error.message);
      return [];
    }
  }

  determinePriority(taskText, page) {
    const highPriority = [
      'navigation', 'button', 'video playback', 'accordion', 'functional',
      'critical', 'fix', 'error', 'payment', 'booking'
    ];
    
    const mediumPriority = [
      'copy', 'content', 'image', 'title', 'formatting', 'update'
    ];

    const criticalPages = ['HOMEPAGE', 'HOW IT WORKS', 'SUBJECT TUITION'];
    
    const lowerTask = taskText.toLowerCase();
    
    if (criticalPages.includes(page.toUpperCase())) {
      if (highPriority.some(keyword => lowerTask.includes(keyword))) return 'CRITICAL';
      return 'HIGH';
    }
    
    if (highPriority.some(keyword => lowerTask.includes(keyword))) return 'HIGH';
    if (mediumPriority.some(keyword => lowerTask.includes(keyword))) return 'MEDIUM';
    
    return 'LOW';
  }

  assessComplexity(taskText) {
    const highComplexity = [
      'functionality', 'integration', 'payment', 'video', 'accordion',
      'carousel', 'animation', 'api', 'form', 'navigation'
    ];
    
    const mediumComplexity = [
      'formatting', 'styling', 'layout', 'responsive', 'component'
    ];

    const lowerTask = taskText.toLowerCase();
    
    if (highComplexity.some(keyword => lowerTask.includes(keyword))) return 'HIGH';
    if (mediumComplexity.some(keyword => lowerTask.includes(keyword))) return 'MEDIUM';
    
    return 'LOW';
  }

  estimateHours(complexity, taskText) {
    const baseHours = { LOW: 0.5, MEDIUM: 1.5, HIGH: 3 };
    let hours = baseHours[complexity];

    // Adjustment factors
    if (taskText.includes('video')) hours += 1;
    if (taskText.includes('payment') || taskText.includes('stripe')) hours += 2;
    if (taskText.includes('navigation') && taskText.includes('fix')) hours += 1.5;
    if (taskText.includes('accordion') || taskText.includes('dropdown')) hours += 1;

    return Math.min(hours, 6); // Cap at 6 hours per task
  }

  suggestAgent(complexity, taskText) {
    if (complexity === 'HIGH' || taskText.toLowerCase().includes('payment') 
        || taskText.toLowerCase().includes('api')) {
      return 'sonnet'; // Complex logic, integrations
    }
    
    if (complexity === 'MEDIUM' || taskText.toLowerCase().includes('component')
        || taskText.toLowerCase().includes('navigation')) {
      return 'sonnet'; // Component work
    }
    
    return 'haiku'; // Simple content/styling updates
  }

  analyzeDependencies() {
    const dependencies = new Map();
    
    // Define critical dependency chains
    const chains = [
      ['navigation reordering', 'button functionality fixes'],
      ['typography implementation', 'content updates'],
      ['video fixes', 'thumbnail updates'],
      ['payment integration', 'booking functionality'],
      ['image replacements', 'visual formatting'],
      ['accordion fixes', 'content display'],
      ['statistics updates', 'content formatting']
    ];

    chains.forEach(chain => {
      for (let i = 0; i < chain.length - 1; i++) {
        const current = chain[i];
        const dependent = chain[i + 1];
        
        if (!dependencies.has(current)) {
          dependencies.set(current, []);
        }
        dependencies.get(current).push(dependent);
      }
    });

    return dependencies;
  }

  identifyRisks() {
    return [
      {
        type: 'TECHNICAL',
        description: 'Video playback failures across multiple pages',
        impact: 'HIGH',
        pages: ['HOMEPAGE', 'VIDEO MASTERCLASSES', '11+ BOOTCAMPS'],
        mitigation: 'Prioritize video infrastructure fixes first'
      },
      {
        type: 'INTEGRATION',
        description: 'Payment link integration for bootcamps',
        impact: 'CRITICAL',
        pages: ['11+ BOOTCAMPS'],
        mitigation: 'Test all Stripe links before deployment'
      },
      {
        type: 'NAVIGATION',
        description: 'Multiple button functionality issues site-wide',
        impact: 'HIGH',
        pages: ['ALL'],
        mitigation: 'Systematic button audit and fixes'
      },
      {
        type: 'CONTENT',
        description: 'Royal testimonial integration complexity',
        impact: 'MEDIUM',
        pages: ['HOMEPAGE'],
        mitigation: 'Careful content placement and styling'
      },
      {
        type: 'RESPONSIVE',
        description: 'Mobile review pending - potential rework needed',
        impact: 'MEDIUM',
        pages: ['ALL'],
        mitigation: 'Build responsive-first, test on multiple devices'
      }
    ];
  }

  generateExecutionPlan() {
    // Sort tasks by priority and dependencies
    const priorityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
    
    const sortedTasks = [...this.revisionsTasks].sort((a, b) => {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.estimatedHours - b.estimatedHours; // Shorter tasks first within priority
    });

    // Group by agent for parallel execution
    const agentGroups = {
      haiku: sortedTasks.filter(t => t.agent === 'haiku'),
      sonnet: sortedTasks.filter(t => t.agent === 'sonnet')
    };

    // Calculate timing
    const totalHours = this.revisionsTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const parallelHours = Math.max(
      agentGroups.haiku.reduce((sum, task) => sum + task.estimatedHours, 0),
      agentGroups.sonnet.reduce((sum, task) => sum + task.estimatedHours, 0)
    );

    return {
      sequentialHours: totalHours,
      parallelHours,
      efficiency: ((totalHours - parallelHours) / totalHours * 100).toFixed(1),
      agentGroups,
      risks: this.riskFactors,
      recommendedApproach: this.generateApproachRecommendation(agentGroups)
    };
  }

  generateApproachRecommendation(agentGroups) {
    return {
      phase1: 'CRITICAL Infrastructure (Hours 0-4)',
      phase1Tasks: [
        'Fix navigation button functionality site-wide',
        'Resolve video playback issues',
        'Fix accordion/dropdown menus',
        'Test payment integration links'
      ],
      phase2: 'HIGH Priority Content (Hours 4-8)',
      phase2Tasks: [
        'Implement navigation reordering',
        'Typography updates (Playfair Display + Source Serif 4)',
        'Royal testimonial integration',
        'Statistics section updates'
      ],
      phase3: 'MEDIUM Priority Polish (Hours 8-12)',
      phase3Tasks: [
        'Content copy updates per Google Docs',
        'Image replacements and optimization',
        'Visual formatting and spacing',
        'Icon updates and consistency'
      ],
      phase4: 'LOW Priority Enhancements (Hours 12-16)',
      phase4Tasks: [
        'Additional content refinements',
        'Final visual polish',
        'Documentation updates',
        'Quality assurance testing'
      ]
    };
  }

  generateReport() {
    const plan = this.generateExecutionPlan();
    const report = `
${chalk.bold.blue('🎯 TASK ORCHESTRATION ANALYSIS - MY PRIVATE TUTOR ONLINE')}
${chalk.gray('Generated:')} ${new Date().toLocaleString()}

${chalk.bold.yellow('📊 EXECUTION METRICS')}
• Total Tasks: ${this.revisionsTasks.length}
• Sequential Hours: ${plan.sequentialHours}
• Parallel Hours: ${plan.parallelHours}
• Efficiency Gain: ${plan.efficiency}%
• Haiku Agent Tasks: ${plan.agentGroups.haiku.length}
• Sonnet Agent Tasks: ${plan.agentGroups.sonnet.length}

${chalk.bold.red('⚠️ CRITICAL RISKS')}
${plan.risks.filter(r => r.impact === 'CRITICAL' || r.impact === 'HIGH')
  .map(r => `• ${r.description} (${r.impact})`)
  .join('\n')}

${chalk.bold.green('🚀 RECOMMENDED EXECUTION PHASES')}

${chalk.bold('PHASE 1:')} ${plan.recommendedApproach.phase1}
${plan.recommendedApproach.phase1Tasks.map(t => `  ✓ ${t}`).join('\n')}

${chalk.bold('PHASE 2:')} ${plan.recommendedApproach.phase2}
${plan.recommendedApproach.phase2Tasks.map(t => `  ✓ ${t}`).join('\n')}

${chalk.bold('PHASE 3:')} ${plan.recommendedApproach.phase3}
${plan.recommendedApproach.phase3Tasks.map(t => `  ✓ ${t}`).join('\n')}

${chalk.bold('PHASE 4:')} ${plan.recommendedApproach.phase4}
${plan.recommendedApproach.phase4Tasks.map(t => `  ✓ ${t}`).join('\n')}

${chalk.bold.blue('💡 DX OPTIMIZATION RECOMMENDATIONS')}
• Use parallel agent execution for maximum efficiency
• Prioritize infrastructure fixes to prevent cascading failures
• Implement continuous testing after each phase
• Monitor progress with automated checkpoints
• Plan buffer time for mobile responsiveness review

${chalk.bold.cyan('🔧 NEXT STEPS')}
1. Run: npm run orchestrate:schedule
2. Execute Phase 1 with priority focus
3. Monitor progress: npm run orchestrate:monitor
4. Adjust execution plan based on real-time feedback
`;

    return report;
  }
}

// CLI Interface
const command = process.argv[2];
const orchestrator = new TaskOrchestrator();

switch (command) {
  case 'analyze':
    console.log(orchestrator.generateReport());
    break;
  case 'schedule':
    const plan = orchestrator.generateExecutionPlan();
    writeFileSync('./task-execution-plan.json', JSON.stringify(plan, null, 2));
    console.log(chalk.green('✅ Execution plan generated: ./task-execution-plan.json'));
    break;
  case 'monitor':
    console.log(chalk.blue('🔄 Monitoring system would track real-time progress...'));
    // In real implementation, this would connect to task tracking system
    break;
  default:
    console.log(chalk.yellow('Usage: npm run orchestrate:[analyze|schedule|monitor]'));
}