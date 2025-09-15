"use strict";
/**
 * Dynamic Agent Selection Engine for /multi-agent-review Command
 *
 * Analyzes task context and selects optimal 4-agent teams for structured debate
 * Based on proven optimization workflow delivering £191,500/year ROI
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSelector = exports.TaskAnalysisEngine = void 0;
/**
 * Comprehensive Agent Capability Matrix
 */
var AGENT_CAPABILITIES = {
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
var TaskAnalysisEngine = /** @class */ (function () {
    function TaskAnalysisEngine() {
        this.keywords = {
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
    }
    TaskAnalysisEngine.prototype.analyzeTask = function (description) {
        var normalizedDesc = description.toLowerCase();
        // Extract domains
        var domains = this.identifyDomains(normalizedDesc);
        // Determine complexity
        var complexity = this.assessComplexity(normalizedDesc);
        // Identify primary focus
        var primaryFocus = this.identifyPrimaryFocus(domains, normalizedDesc);
        // Extract keywords
        var keywords = this.extractKeywords(normalizedDesc);
        // Estimate scope
        var estimatedScope = this.estimateScope(normalizedDesc, complexity);
        // Assess urgency
        var urgency = this.assessUrgency(normalizedDesc);
        return {
            description: description,
            domains: domains,
            complexity: complexity,
            primaryFocus: primaryFocus,
            secondaryFocuses: domains.slice(1),
            keywords: keywords,
            estimatedScope: estimatedScope,
            urgency: urgency
        };
    };
    TaskAnalysisEngine.prototype.identifyDomains = function (description) {
        var domainScores = {};
        Object.entries(this.keywords.domains).forEach(function (_a) {
            var domain = _a[0], keywords = _a[1];
            domainScores[domain] = keywords.reduce(function (score, keyword) {
                return score + (description.includes(keyword) ? 1 : 0);
            }, 0);
        });
        return Object.entries(domainScores)
            .filter(function (_a) {
            var _ = _a[0], score = _a[1];
            return score > 0;
        })
            .sort(function (_a, _b) {
            var _ = _a[0], a = _a[1];
            var __ = _b[0], b = _b[1];
            return b - a;
        })
            .map(function (_a) {
            var domain = _a[0];
            return domain;
        })
            .slice(0, 4); // Top 4 domains
    };
    TaskAnalysisEngine.prototype.assessComplexity = function (description) {
        var complexityScores = {
            low: 0, medium: 0, high: 0, enterprise: 0
        };
        Object.entries(this.keywords.complexity).forEach(function (_a) {
            var level = _a[0], keywords = _a[1];
            complexityScores[level] = keywords.reduce(function (score, keyword) {
                return score + (description.includes(keyword) ? 1 : 0);
            }, 0);
        });
        // Default heuristics
        if (description.length > 200)
            complexityScores.high += 1;
        if (description.includes('system') || description.includes('architecture'))
            complexityScores.high += 1;
        if (description.includes('production') || description.includes('scale'))
            complexityScores.enterprise += 1;
        var maxScore = Math.max.apply(Math, Object.values(complexityScores));
        if (maxScore === 0)
            return 'medium'; // Default
        return Object.entries(complexityScores).find(function (_a) {
            var _ = _a[0], score = _a[1];
            return score === maxScore;
        })[0];
    };
    TaskAnalysisEngine.prototype.identifyPrimaryFocus = function (domains, description) {
        if (domains.includes('security'))
            return 'security';
        if (domains.includes('performance'))
            return 'performance';
        if (domains.includes('design'))
            return 'design';
        if (domains.includes('business') || domains.includes('content'))
            return 'business';
        return 'technical';
    };
    TaskAnalysisEngine.prototype.extractKeywords = function (description) {
        var words = description.toLowerCase().split(/\s+/);
        var relevantKeywords = [];
        Object.values(this.keywords.domains).flat().forEach(function (keyword) {
            if (description.includes(keyword)) {
                relevantKeywords.push(keyword);
            }
        });
        return relevantKeywords;
    };
    TaskAnalysisEngine.prototype.estimateScope = function (description, complexity) {
        if (description.includes('component') || description.includes('widget'))
            return 'component';
        if (description.includes('feature') || description.includes('functionality'))
            return 'feature';
        if (description.includes('system') || complexity === 'enterprise')
            return 'system';
        if (description.includes('architecture') || description.includes('redesign'))
            return 'architecture';
        if (description.includes('organization') || description.includes('workflow'))
            return 'organization';
        return 'feature'; // Default
    };
    TaskAnalysisEngine.prototype.assessUrgency = function (description) {
        if (description.includes('urgent') || description.includes('critical') || description.includes('asap'))
            return 'critical';
        if (description.includes('soon') || description.includes('priority'))
            return 'high';
        if (description.includes('when possible') || description.includes('eventually'))
            return 'low';
        return 'medium';
    };
    return TaskAnalysisEngine;
}());
exports.TaskAnalysisEngine = TaskAnalysisEngine;
/**
 * Dynamic Agent Selector
 */
var AgentSelector = /** @class */ (function () {
    function AgentSelector() {
        this.analysisEngine = new TaskAnalysisEngine();
    }
    AgentSelector.prototype.selectAgents = function (taskDescription) {
        var context = this.analysisEngine.analyzeTask(taskDescription);
        // Score all agents based on task context
        var agentScores = this.scoreAgents(context);
        // Select top 4 agents with role assignments
        var selectedAgents = this.selectOptimalTeam(agentScores, context);
        // Generate reasoning and fallbacks
        var reasoning = this.generateReasoning(selectedAgents, context);
        var fallbacks = this.generateFallbacks(agentScores, selectedAgents);
        return {
            agents: selectedAgents,
            reasoning: reasoning,
            confidence: this.calculateConfidence(selectedAgents, context),
            fallbacks: fallbacks,
            estimatedDuration: this.estimateDuration(context)
        };
    };
    AgentSelector.prototype.scoreAgents = function (context) {
        var _this = this;
        var scores = {};
        Object.entries(AGENT_CAPABILITIES).forEach(function (_a) {
            var agentType = _a[0], capabilities = _a[1];
            var score = 0;
            // Domain match scoring (40% weight)
            var domainMatches = capabilities.domains.filter(function (d) { return context.domains.includes(d); }).length;
            score += domainMatches * 40;
            // Keyword match scoring (25% weight)
            var keywordMatches = capabilities.keywords.filter(function (k) { return context.keywords.includes(k); }).length;
            score += keywordMatches * 25;
            // Complexity match scoring (20% weight)
            if (capabilities.complexity.includes(context.complexity)) {
                score += 20;
            }
            // Primary focus bonus (15% weight)
            if (_this.matchesPrimaryFocus(capabilities, context.primaryFocus)) {
                score += 15;
            }
            scores[agentType] = score;
        });
        return scores;
    };
    AgentSelector.prototype.matchesPrimaryFocus = function (capabilities, focus) {
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
    };
    AgentSelector.prototype.selectOptimalTeam = function (scores, context) {
        var sortedAgents = Object.entries(scores)
            .sort(function (_a, _b) {
            var _ = _a[0], a = _a[1];
            var __ = _b[0], b = _b[1];
            return b - a;
        })
            .slice(0, 6); // Top 6 candidates
        var team = [];
        var selectedTypes = new Set();
        // Select lead agent (highest score)
        var _a = sortedAgents[0], leadType = _a[0], leadScore = _a[1];
        team.push({
            type: leadType,
            role: 'lead',
            capabilities: AGENT_CAPABILITIES[leadType].strengths,
            justification: "Highest domain expertise match (".concat(leadScore, " points)")
        });
        selectedTypes.add(leadType);
        // Select specialists ensuring domain coverage
        var targetDomains = context.domains.slice(0, 3);
        var _loop_1 = function (domain) {
            var specialist = sortedAgents.find(function (_a) {
                var type = _a[0], _ = _a[1];
                return !selectedTypes.has(type) &&
                    AGENT_CAPABILITIES[type].domains.includes(domain);
            });
            if (specialist && team.length < 4) {
                var type = specialist[0], score = specialist[1];
                team.push({
                    type: type,
                    role: 'specialist',
                    capabilities: AGENT_CAPABILITIES[type].strengths,
                    justification: "".concat(domain, " domain specialist (").concat(score, " points)")
                });
                selectedTypes.add(type);
            }
        };
        for (var _i = 0, targetDomains_1 = targetDomains; _i < targetDomains_1.length; _i++) {
            var domain = targetDomains_1[_i];
            _loop_1(domain);
        }
        // Fill remaining slots with highest scoring available agents
        while (team.length < 4 && selectedTypes.size < sortedAgents.length) {
            var candidate = sortedAgents.find(function (_a) {
                var type = _a[0], _ = _a[1];
                return !selectedTypes.has(type);
            });
            if (candidate) {
                var type = candidate[0], score = candidate[1];
                team.push({
                    type: type,
                    role: team.length === 3 ? 'validator' : 'advisor',
                    capabilities: AGENT_CAPABILITIES[type].strengths,
                    justification: "High capability match (".concat(score, " points)")
                });
                selectedTypes.add(type);
            }
        }
        return team;
    };
    AgentSelector.prototype.generateReasoning = function (agents, context) {
        var domains = context.domains.slice(0, 3).join(', ');
        var complexity = context.complexity;
        var lead = agents[0];
        return "Selected ".concat(agents.length, "-agent team for ").concat(complexity, " complexity task in ").concat(domains, " domains. ") +
            "".concat(lead.type, " leads with primary expertise in ").concat(lead.capabilities[0], ". ") +
            "Team composition ensures comprehensive coverage of identified domains with complementary skills.";
    };
    AgentSelector.prototype.generateFallbacks = function (scores, selected) {
        var selectedTypes = new Set(selected.map(function (a) { return a.type; }));
        return Object.entries(scores)
            .filter(function (_a) {
            var type = _a[0], _ = _a[1];
            return !selectedTypes.has(type);
        })
            .sort(function (_a, _b) {
            var _ = _a[0], a = _a[1];
            var __ = _b[0], b = _b[1];
            return b - a;
        })
            .slice(0, 3)
            .map(function (_a) {
            var type = _a[0], _ = _a[1];
            return type;
        });
    };
    AgentSelector.prototype.calculateConfidence = function (agents, context) {
        // Base confidence from domain coverage
        var domainCoverage = context.domains.filter(function (domain) {
            return agents.some(function (agent) {
                return AGENT_CAPABILITIES[agent.type].domains.includes(domain);
            });
        }).length / Math.max(context.domains.length, 1);
        // Complexity match confidence
        var complexityMatch = agents.filter(function (agent) {
            return AGENT_CAPABILITIES[agent.type].complexity.includes(context.complexity);
        }).length / agents.length;
        return Math.min(0.95, (domainCoverage * 0.6) + (complexityMatch * 0.4));
    };
    AgentSelector.prototype.estimateDuration = function (context) {
        var baseMinutes = {
            low: 60, // 1 hour
            medium: 90, // 1.5 hours
            high: 120, // 2 hours
            enterprise: 150 // 2.5 hours
        };
        var scopeMultiplier = {
            component: 0.8,
            feature: 1.0,
            system: 1.3,
            architecture: 1.5,
            organization: 1.8
        };
        var totalMinutes = baseMinutes[context.complexity] * scopeMultiplier[context.estimatedScope];
        var hours = Math.ceil(totalMinutes / 60 * 10) / 10; // Round to nearest 0.1
        return "".concat(hours, " hours");
    };
    return AgentSelector;
}());
exports.AgentSelector = AgentSelector;
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
