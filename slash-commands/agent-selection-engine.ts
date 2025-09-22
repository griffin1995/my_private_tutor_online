/**
 * Dynamic Agent Selection Engine for /multi-agent-review Command
 *
 * Analyzes task context and selects optimal 4-agent teams for structured debate
 * Based on proven optimization workflow delivering £191,500/year ROI
 */

interface TaskContext {
  description: string;
  domains: Domain[];
  complexity: ComplexityLevel;
  primaryFocus: PrimaryFocus;
  secondaryFocuses: string[];
  keywords: string[];
  estimatedScope: ProjectScope;
  urgency: UrgencyLevel;
}

export interface AgentSelection {
  agents: SelectedAgent[];
  reasoning: string;
  confidence: number; // 0-1 confidence in selection
  fallbacks: string[];
  estimatedDuration: string;
}

interface SelectedAgent {
  type: string;
  role: AgentRole;
  capabilities: string[];
  justification: string;
}

type Domain =
  | 'frontend' | 'backend' | 'mobile' | 'security' | 'performance'
  | 'database' | 'infrastructure' | 'ai-ml' | 'payments' | 'design'
  | 'testing' | 'devops' | 'legal' | 'business' | 'content';

type ComplexityLevel = 'low' | 'medium' | 'high' | 'enterprise';
type PrimaryFocus = 'technical' | 'business' | 'design' | 'security' | 'performance';
type ProjectScope = 'component' | 'feature' | 'system' | 'architecture' | 'organization';
type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
type AgentRole = 'lead' | 'specialist' | 'advisor' | 'validator';

/**
 * Comprehensive Agent Capability Matrix
 */
const AGENT_CAPABILITIES = {
  // Frontend & UI Specialists
  'frontend-developer': {
    domains: ['frontend', 'performance', 'testing'],
    keywords: ['react', 'vue', 'angular', 'component', 'state', 'ui', 'client'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['React architecture', 'State management', 'Component design', 'Client performance']
  },
  'ui-ux-designer': {
    domains: ['design', 'frontend', 'mobile'],
    keywords: ['ui', 'ux', 'design', 'accessibility', 'user', 'interface', 'mobile'],
    complexity: ['low', 'medium', 'high'],
    strengths: ['User experience', 'Interface design', 'Accessibility', 'Design systems']
  },
  'flutter-expert': {
    domains: ['mobile', 'frontend', 'design'],
    keywords: ['flutter', 'dart', 'mobile', 'ios', 'android', 'cross-platform'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Cross-platform mobile', 'Flutter widgets', 'Platform integration']
  },
  'ios-developer': {
    domains: ['mobile', 'frontend'],
    keywords: ['ios', 'swift', 'swiftui', 'mobile', 'app store', 'native'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Native iOS', 'Swift/SwiftUI', 'App Store optimization']
  },

  // Backend & Infrastructure
  'backend-architect': {
    domains: ['backend', 'infrastructure', 'security', 'database'],
    keywords: ['api', 'microservice', 'architecture', 'server', 'backend', 'system'],
    complexity: ['high', 'enterprise'],
    strengths: ['System architecture', 'API design', 'Microservices', 'Scalability']
  },
  'cloud-architect': {
    domains: ['infrastructure', 'performance', 'devops'],
    keywords: ['aws', 'azure', 'gcp', 'cloud', 'serverless', 'infrastructure', 'scaling'],
    complexity: ['high', 'enterprise'],
    strengths: ['Cloud infrastructure', 'Auto-scaling', 'Serverless', 'Cost optimization']
  },
  'database-admin': {
    domains: ['database', 'performance', 'backend'],
    keywords: ['database', 'sql', 'performance', 'migration', 'optimization'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Database management', 'Query optimization', 'Data modeling']
  },
  'database-optimizer': {
    domains: ['database', 'performance'],
    keywords: ['query', 'index', 'performance', 'n+1', 'optimization', 'sql'],
    complexity: ['medium', 'high'],
    strengths: ['Query optimization', 'Index strategy', 'Performance tuning']
  },

  // Performance & Optimization
  'performance-engineer': {
    domains: ['performance', 'frontend', 'backend', 'infrastructure'],
    keywords: ['performance', 'optimization', 'speed', 'bundle', 'cache', 'vitals'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Performance optimization', 'Bundle analysis', 'Web Vitals', 'Caching']
  },
  'network-engineer': {
    domains: ['infrastructure', 'performance', 'security'],
    keywords: ['network', 'cdn', 'load balancer', 'connectivity', 'latency'],
    complexity: ['high', 'enterprise'],
    strengths: ['Network optimization', 'CDN configuration', 'Load balancing']
  },

  // Security & Compliance
  'security-auditor': {
    domains: ['security', 'backend', 'legal'],
    keywords: ['security', 'vulnerability', 'audit', 'owasp', 'authentication', 'encryption'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Security auditing', 'Vulnerability assessment', 'OWASP compliance']
  },
  'legal-advisor': {
    domains: ['legal', 'business'],
    keywords: ['privacy', 'gdpr', 'compliance', 'legal', 'policy', 'terms'],
    complexity: ['low', 'medium', 'high'],
    strengths: ['Legal compliance', 'Privacy policies', 'Regulatory requirements']
  },

  // Language Specialists
  'typescript-pro': {
    domains: ['frontend', 'backend', 'performance'],
    keywords: ['typescript', 'types', 'generics', 'strict', 'compilation'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Advanced TypeScript', 'Type safety', 'Compilation optimization']
  },
  'python-pro': {
    domains: ['backend', 'ai-ml', 'performance'],
    keywords: ['python', 'async', 'performance', 'api', 'ml'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Modern Python', 'Async programming', 'ML integration']
  },
  'rust-pro': {
    domains: ['backend', 'performance', 'security'],
    keywords: ['rust', 'memory', 'performance', 'systems', 'concurrency'],
    complexity: ['high', 'enterprise'],
    strengths: ['Systems programming', 'Memory safety', 'High performance']
  },
  'java-pro': {
    domains: ['backend', 'enterprise'],
    keywords: ['java', 'spring', 'enterprise', 'jvm', 'microservice'],
    complexity: ['high', 'enterprise'],
    strengths: ['Enterprise Java', 'Spring ecosystem', 'JVM optimization']
  },

  // Specialized Domains
  'payment-integration': {
    domains: ['payments', 'security', 'backend'],
    keywords: ['payment', 'stripe', 'paypal', 'checkout', 'pci', 'billing'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Payment processing', 'PCI compliance', 'Checkout optimization']
  },
  'ml-engineer': {
    domains: ['ai-ml', 'performance', 'backend'],
    keywords: ['ml', 'ai', 'model', 'tensorflow', 'pytorch', 'training'],
    complexity: ['high', 'enterprise'],
    strengths: ['ML pipelines', 'Model deployment', 'AI integration']
  },
  'data-engineer': {
    domains: ['database', 'ai-ml', 'performance'],
    keywords: ['data', 'etl', 'pipeline', 'analytics', 'warehouse'],
    complexity: ['high', 'enterprise'],
    strengths: ['Data pipelines', 'ETL processes', 'Analytics infrastructure']
  },

  // DevOps & Deployment
  'deployment-engineer': {
    domains: ['devops', 'infrastructure'],
    keywords: ['deploy', 'ci/cd', 'pipeline', 'docker', 'kubernetes'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['CI/CD pipelines', 'Container orchestration', 'Deployment automation']
  },
  'devops-troubleshooter': {
    domains: ['devops', 'performance', 'infrastructure'],
    keywords: ['debug', 'logs', 'monitoring', 'troubleshoot', 'incident'],
    complexity: ['medium', 'high', 'enterprise'],
    strengths: ['Production debugging', 'Incident response', 'Log analysis']
  },

  // Business & Content
  'business-analyst': {
    domains: ['business', 'performance'],
    keywords: ['metrics', 'kpi', 'analytics', 'revenue', 'conversion'],
    complexity: ['low', 'medium', 'high'],
    strengths: ['Business metrics', 'KPI tracking', 'Revenue analysis']
  },
  'content-marketer': {
    domains: ['content', 'business'],
    keywords: ['content', 'marketing', 'seo', 'blog', 'social'],
    complexity: ['low', 'medium'],
    strengths: ['Content creation', 'SEO optimization', 'Marketing strategy']
  }
};

/**
 * Task Analysis Engine
 */
export class TaskAnalysisEngine {
  private keywords = {
    domains: {
      frontend: ['react', 'vue', 'angular', 'component', 'ui', 'client', 'browser'],
      backend: ['api', 'server', 'database', 'microservice', 'endpoint'],
      mobile: ['ios', 'android', 'flutter', 'react native', 'mobile', 'app'],
      security: ['security', 'auth', 'vulnerability', 'owasp', 'encryption'],
      performance: ['performance', 'speed', 'optimization', 'cache', 'bundle'],
      database: ['database', 'sql', 'query', 'migration', 'data'],
      infrastructure: ['infrastructure', 'cloud', 'aws', 'deployment', 'scaling'],
      payments: ['payment', 'stripe', 'checkout', 'billing', 'pci'],
      'ai-ml': ['ml', 'ai', 'model', 'tensorflow', 'pytorch', 'training'],
      design: ['design', 'ui', 'ux', 'interface', 'accessibility'],
      devops: ['ci/cd', 'pipeline', 'docker', 'kubernetes', 'deployment'],
      testing: ['test', 'testing', 'qa', 'automation', 'coverage']
    },
    complexity: {
      low: ['simple', 'basic', 'small', 'quick', 'minor'],
      medium: ['moderate', 'standard', 'typical', 'normal'],
      high: ['complex', 'advanced', 'sophisticated', 'comprehensive'],
      enterprise: ['enterprise', 'large-scale', 'production', 'critical']
    }
  };

  analyzeTask(description: string): TaskContext {
    const normalizedDesc = description.toLowerCase();

    // Extract domains
    const domains = this.identifyDomains(normalizedDesc);

    // Determine complexity
    const complexity = this.assessComplexity(normalizedDesc);

    // Identify primary focus
    const primaryFocus = this.identifyPrimaryFocus(domains, normalizedDesc);

    // Extract keywords
    const keywords = this.extractKeywords(normalizedDesc);

    // Estimate scope
    const estimatedScope = this.estimateScope(normalizedDesc, complexity);

    // Assess urgency
    const urgency = this.assessUrgency(normalizedDesc);

    return {
      description,
      domains,
      complexity,
      primaryFocus,
      secondaryFocuses: domains.slice(1),
      keywords,
      estimatedScope,
      urgency
    };
  }

  private identifyDomains(description: string): Domain[] {
    const domainScores: Record<Domain, number> = {} as Record<Domain, number>;

    Object.entries(this.keywords.domains).forEach(([domain, keywords]) => {
      domainScores[domain as Domain] = keywords.reduce((score, keyword) => {
        return score + (description.includes(keyword) ? 1 : 0);
      }, 0);
    });

    return Object.entries(domainScores)
      .filter(([_, score]) => score > 0)
      .sort(([_, a], [__, b]) => b - a)
      .map(([domain]) => domain as Domain)
      .slice(0, 4); // Top 4 domains
  }

  private assessComplexity(description: string): ComplexityLevel {
    const complexityScores: Record<ComplexityLevel, number> = {
      low: 0, medium: 0, high: 0, enterprise: 0
    };

    Object.entries(this.keywords.complexity).forEach(([level, keywords]) => {
      complexityScores[level as ComplexityLevel] = keywords.reduce((score, keyword) => {
        return score + (description.includes(keyword) ? 1 : 0);
      }, 0);
    });

    // Default heuristics
    if (description.length > 200) complexityScores.high += 1;
    if (description.includes('system') || description.includes('architecture')) complexityScores.high += 1;
    if (description.includes('production') || description.includes('scale')) complexityScores.enterprise += 1;

    const maxScore = Math.max(...Object.values(complexityScores));
    if (maxScore === 0) return 'medium'; // Default

    return Object.entries(complexityScores).find(([_, score]) => score === maxScore)![0] as ComplexityLevel;
  }

  private identifyPrimaryFocus(domains: Domain[], description: string): PrimaryFocus {
    if (domains.includes('security')) return 'security';
    if (domains.includes('performance')) return 'performance';
    if (domains.includes('design')) return 'design';
    if (domains.includes('business') || domains.includes('content')) return 'business';
    return 'technical';
  }

  private extractKeywords(description: string): string[] {
    const words = description.toLowerCase().split(/\s+/);
    const relevantKeywords: string[] = [];

    Object.values(this.keywords.domains).flat().forEach(keyword => {
      if (description.includes(keyword)) {
        relevantKeywords.push(keyword);
      }
    });

    return relevantKeywords;
  }

  private estimateScope(description: string, complexity: ComplexityLevel): ProjectScope {
    if (description.includes('component') || description.includes('widget')) return 'component';
    if (description.includes('feature') || description.includes('functionality')) return 'feature';
    if (description.includes('system') || complexity === 'enterprise') return 'system';
    if (description.includes('architecture') || description.includes('redesign')) return 'architecture';
    if (description.includes('organization') || description.includes('workflow')) return 'organization';

    return 'feature'; // Default
  }

  private assessUrgency(description: string): UrgencyLevel {
    if (description.includes('urgent') || description.includes('critical') || description.includes('asap')) return 'critical';
    if (description.includes('soon') || description.includes('priority')) return 'high';
    if (description.includes('when possible') || description.includes('eventually')) return 'low';
    return 'medium';
  }
}

/**
 * Dynamic Agent Selector
 */
export class AgentSelector {
  private analysisEngine = new TaskAnalysisEngine();

  selectAgents(taskDescription: string): AgentSelection {
    const context = this.analysisEngine.analyzeTask(taskDescription);

    // Score all agents based on task context
    const agentScores = this.scoreAgents(context);

    // Select top 4 agents with role assignments
    const selectedAgents = this.selectOptimalTeam(agentScores, context);

    // Generate reasoning and fallbacks
    const reasoning = this.generateReasoning(selectedAgents, context);
    const fallbacks = this.generateFallbacks(agentScores, selectedAgents);

    return {
      agents: selectedAgents,
      reasoning,
      confidence: this.calculateConfidence(selectedAgents, context),
      fallbacks,
      estimatedDuration: this.estimateDuration(context)
    };
  }

  private scoreAgents(context: TaskContext): Record<string, number> {
    const scores: Record<string, number> = {};

    Object.entries(AGENT_CAPABILITIES).forEach(([agentType, capabilities]) => {
      let score = 0;

      // Domain match scoring (40% weight)
      // CONTEXT7 SOURCE: /microsoft/typescript - Type assertion for array includes method
      const domainMatches = capabilities.domains.filter(d => context.domains.includes(d as Domain)).length;
      score += domainMatches * 40;

      // Keyword match scoring (25% weight)
      const keywordMatches = capabilities.keywords.filter(k => context.keywords.includes(k)).length;
      score += keywordMatches * 25;

      // Complexity match scoring (20% weight)
      if (capabilities.complexity.includes(context.complexity)) {
        score += 20;
      }

      // Primary focus bonus (15% weight)
      if (this.matchesPrimaryFocus(capabilities, context.primaryFocus)) {
        score += 15;
      }

      scores[agentType] = score;
    });

    return scores;
  }

  private matchesPrimaryFocus(capabilities: any, focus: PrimaryFocus): boolean {
    switch (focus) {
      case 'security':
        return capabilities.domains.includes('security');
      case 'performance':
        return capabilities.domains.includes('performance');
      case 'design':
        return capabilities.domains.includes('design');
      case 'business':
        return capabilities.domains.includes('business');
      default:
        return true; // Technical can match any
    }
  }

  private selectOptimalTeam(scores: Record<string, number>, context: TaskContext): SelectedAgent[] {
    const sortedAgents = Object.entries(scores)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 6); // Top 6 candidates

    const team: SelectedAgent[] = [];
    const selectedTypes = new Set<string>();

    // Select lead agent (highest score)
    const [leadType, leadScore] = sortedAgents[0];
    team.push({
      type: leadType,
      role: 'lead',
      capabilities: AGENT_CAPABILITIES[leadType as keyof typeof AGENT_CAPABILITIES].strengths,
      justification: `Highest domain expertise match (${leadScore} points)`
    });
    selectedTypes.add(leadType);

    // Select specialists ensuring domain coverage
    const targetDomains = context.domains.slice(0, 3);

    for (const domain of targetDomains) {
      const specialist = sortedAgents.find(([type, _]) =>
        !selectedTypes.has(type) &&
        AGENT_CAPABILITIES[type as keyof typeof AGENT_CAPABILITIES].domains.includes(domain)
      );

      if (specialist && team.length < 4) {
        const [type, score] = specialist;
        team.push({
          type,
          role: 'specialist',
          capabilities: AGENT_CAPABILITIES[type as keyof typeof AGENT_CAPABILITIES].strengths,
          justification: `${domain} domain specialist (${score} points)`
        });
        selectedTypes.add(type);
      }
    }

    // Fill remaining slots with highest scoring available agents
    while (team.length < 4 && selectedTypes.size < sortedAgents.length) {
      const candidate = sortedAgents.find(([type, _]) => !selectedTypes.has(type));
      if (candidate) {
        const [type, score] = candidate;
        team.push({
          type,
          role: team.length === 3 ? 'validator' : 'advisor',
          capabilities: AGENT_CAPABILITIES[type as keyof typeof AGENT_CAPABILITIES].strengths,
          justification: `High capability match (${score} points)`
        });
        selectedTypes.add(type);
      }
    }

    return team;
  }

  private generateReasoning(agents: SelectedAgent[], context: TaskContext): string {
    const domains = context.domains.slice(0, 3).join(', ');
    const complexity = context.complexity;
    // CONTEXT7 SOURCE: /microsoft/typescript - Array access with null safety validation
    // TYPE SAFETY REASON: Official TypeScript documentation requires bounds checking for array element access
    const lead = agents[0];

    if (!lead) {
      return `No agents selected for ${complexity} complexity task in ${domains} domains.`;
    }

    return `Selected ${agents.length}-agent team for ${complexity} complexity task in ${domains} domains. ` +
           `${lead.type} leads with primary expertise in ${lead.capabilities[0] || 'general assistance'}. ` +
           `Team composition ensures comprehensive coverage of identified domains with complementary skills.`;
  }

  private generateFallbacks(scores: Record<string, number>, selected: SelectedAgent[]): string[] {
    const selectedTypes = new Set(selected.map(a => a.type));

    return Object.entries(scores)
      .filter(([type, _]) => !selectedTypes.has(type))
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 3)
      .map(([type, _]) => type);
  }

  private calculateConfidence(agents: SelectedAgent[], context: TaskContext): number {
    // Base confidence from domain coverage
    const domainCoverage = context.domains.filter(domain =>
      agents.some(agent =>
        AGENT_CAPABILITIES[agent.type as keyof typeof AGENT_CAPABILITIES].domains.includes(domain)
      )
    ).length / Math.max(context.domains.length, 1);

    // Complexity match confidence
    const complexityMatch = agents.filter(agent =>
      AGENT_CAPABILITIES[agent.type as keyof typeof AGENT_CAPABILITIES].complexity.includes(context.complexity)
    ).length / agents.length;

    return Math.min(0.95, (domainCoverage * 0.6) + (complexityMatch * 0.4));
  }

  private estimateDuration(context: TaskContext): string {
    const baseMinutes = {
      low: 60,      // 1 hour
      medium: 90,   // 1.5 hours
      high: 120,    // 2 hours
      enterprise: 150 // 2.5 hours
    };

    const scopeMultiplier = {
      component: 0.8,
      feature: 1.0,
      system: 1.3,
      architecture: 1.5,
      organization: 1.8
    };

    const totalMinutes = baseMinutes[context.complexity] * scopeMultiplier[context.estimatedScope];
    const hours = Math.ceil(totalMinutes / 60 * 10) / 10; // Round to nearest 0.1

    return `${hours} hours`;
  }
}

/**
 * Usage Example:
 *
 * const selector = new AgentSelector();
 * const selection = selector.selectAgents("Optimize our React checkout flow for mobile users");
 *
 * Expected Output:
 * {
 *   agents: [
 *     { type: "frontend-developer", role: "lead", ... },
 *     { type: "ui-ux-designer", role: "specialist", ... },
 *     { type: "performance-engineer", role: "specialist", ... },
 *     { type: "mobile-developer", role: "advisor", ... }
 *   ],
 *   reasoning: "Selected 4-agent team for medium complexity task in frontend, mobile, performance domains...",
 *   confidence: 0.87,
 *   fallbacks: ["typescript-pro", "security-auditor", "business-analyst"],
 *   estimatedDuration: "1.5 hours"
 * }
 */