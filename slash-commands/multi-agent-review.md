# /multi-agent-review Slash Command Implementation

## Command Specification

### Usage

```
/multi-agent-review <task description>
```

### Purpose

Execute a comprehensive 5-round structured debate between dynamically selected
specialist agents to achieve consensus on complex development tasks.

## Dynamic Agent Selection System

### Task Analysis Algorithm

```typescript
interface TaskContext {
	description: string;
	domains: string[];
	complexity: 'low' | 'medium' | 'high' | 'enterprise';
	primaryFocus: 'technical' | 'business' | 'design' | 'security' | 'performance';
	secondaryFocuses: string[];
	keywords: string[];
	estimatedScope: 'component' | 'feature' | 'system' | 'architecture';
}

interface AgentSelection {
	primary: string; // Lead agent for the domain
	secondary: string[]; // Supporting agents
	reasoning: string; // Why these agents were chosen
	fallbacks: string[]; // Alternative agents if unavailable
}
```

### Agent Capability Matrix

#### **Frontend & UI**

- `frontend-developer`: React, Vue, Angular components, client-side state
- `ui-ux-designer`: Interface design, user experience, accessibility
- `flutter-expert`: Cross-platform mobile, Dart, widgets
- `ios-developer`: Native iOS, Swift, SwiftUI, App Store

#### **Backend & Infrastructure**

- `backend-architect`: API design, microservices, system architecture
- `cloud-architect`: AWS/Azure/GCP, serverless, auto-scaling
- `database-admin`: SQL optimization, migrations, performance
- `network-engineer`: Load balancing, CDN, connectivity

#### **Performance & Optimization**

- `performance-engineer`: Bundle optimization, Web Vitals, caching
- `database-optimizer`: Query optimization, indexing, N+1 problems
- `mlops-engineer`: ML pipeline optimization, model serving

#### **Security & Compliance**

- `security-auditor`: Vulnerability assessment, OWASP compliance
- `legal-advisor`: Privacy policies, GDPR, compliance documentation

#### **Language Specialists**

- `typescript-pro`: Advanced TypeScript, generics, strict mode
- `python-pro`: Modern Python, async/await, performance
- `rust-pro`: Systems programming, memory safety, concurrency
- `java-pro`: Enterprise Java, Spring Boot, JVM optimization
- `csharp-pro`: .NET, enterprise patterns, performance
- `golang-pro`: Concurrency, microservices, performance
- `javascript-pro`: Modern ES6+, Node.js, browser compatibility

#### **Specialized Domains**

- `payment-integration`: Stripe, PayPal, checkout flows
- `ml-engineer`: TensorFlow/PyTorch, model deployment
- `data-engineer`: ETL pipelines, data warehouses, analytics
- `api-documenter`: OpenAPI/Swagger, SDK generation

## Selection Logic Examples

### Frontend Optimization Task

```
Input: "Optimize our React checkout flow for mobile users"
Analysis:
- Primary: frontend (React, optimization)
- Secondary: mobile, UX, performance
- Complexity: medium
- Scope: feature

Selected Agents:
- frontend-developer (lead - React expertise)
- ui-ux-designer (mobile UX optimization)
- performance-engineer (optimization focus)
- mobile-developer (mobile-specific concerns)
```

### Security Implementation

```
Input: "Build a secure payment processing system with PCI compliance"
Analysis:
- Primary: security, payments
- Secondary: backend, compliance
- Complexity: high
- Scope: system

Selected Agents:
- security-auditor (lead - security & PCI compliance)
- payment-integration (payment processing expertise)
- backend-architect (system design)
- legal-advisor (compliance requirements)
```

### Performance Optimization

```
Input: "Reduce our application build time from 45s to under 10s"
Analysis:
- Primary: performance, build optimization
- Secondary: tooling, infrastructure
- Complexity: medium
- Scope: system

Selected Agents:
- performance-engineer (lead - build optimization)
- devops-troubleshooter (build pipeline expertise)
- typescript-pro (compilation optimization)
- cloud-architect (infrastructure optimization)
```

## 5-Round Structured Workflow

### Round 1: Initial Assessment (15 minutes)

Each selected agent provides:

- Domain-specific analysis of the task
- Identification of key challenges and opportunities
- Baseline metrics and current state assessment
- Initial recommendations within their expertise

### Round 2: Detailed Proposals (20 minutes)

Each agent presents:

- Specific implementation strategies
- Expected outcomes and metrics
- Resource requirements and timelines
- Risk assessment for their domain

### Round 3: Cross-Domain Integration (25 minutes)

**Minimum 2 exchanges per agent:**

- Challenge other agents' proposals
- Identify integration points and conflicts
- Propose collaborative solutions
- Validate technical feasibility across domains

### Round 4: Trade-off Analysis (25 minutes)

**Minimum 2 exchanges per agent:**

- Evaluate competing priorities
- Cost vs. benefit analysis
- Performance vs. maintainability decisions
- Short-term vs. long-term trade-offs

### Round 5: Consensus Building (20 minutes)

**All agents must reach agreement:**

- Unified implementation strategy
- Clear success metrics and validation criteria
- Prioritized action items with owners
- Risk mitigation plan and contingencies

## Command Implementation

### Step 1: Context-Manager Initialization

```
/multi-agent-review <task>
↓
Context-Manager analyzes task and selects 4 optimal agents
↓
Explains selection reasoning to user
↓
Launches 5-round structured debate
```

### Step 2: Agent Coordination

- Context-Manager orchestrates all 5 rounds
- Ensures minimum exchange requirements met
- Validates consensus achievement
- Generates final deliverables

### Step 3: Output Deliverables

- **Consensus Document**: Unified strategy with implementation details
- **Action Plan**: Prioritized tasks with assigned responsibilities
- **Success Metrics**: Quantifiable targets and validation methods
- **Risk Assessment**: Potential issues and mitigation strategies
- **Business Impact**: ROI projections and timeline estimates

## Usage Examples

### Example 1: Database Performance

```
/multi-agent-review Our user queries are taking 3+ seconds, need to optimize database performance for 100k+ users

Expected Agents: database-optimizer, backend-architect, performance-engineer, cloud-architect
Deliverables: Query optimization strategy, indexing plan, caching architecture, scaling approach
```

### Example 2: Mobile App Development

```
/multi-agent-review Build a cross-platform mobile app for our tutoring service with offline capabilities

Expected Agents: flutter-expert, mobile-developer, backend-architect, ui-ux-designer
Deliverables: Platform strategy, offline sync architecture, UI/UX guidelines, development roadmap
```

### Example 3: Security Audit

```
/multi-agent-review Conduct comprehensive security audit of our authentication system and fix vulnerabilities

Expected Agents: security-auditor, backend-architect, typescript-pro, legal-advisor
Deliverables: Vulnerability assessment, remediation plan, compliance checklist, implementation timeline
```

## Command Parameters

### Basic Usage

```
/multi-agent-review <task description>
```

### Advanced Parameters (Future)

```
/multi-agent-review <task> --agents=4 --rounds=5 --focus=performance
/multi-agent-review <task> --exclude=security-auditor --include=python-pro
/multi-agent-review <task> --complexity=enterprise --timeline=urgent
```

## Success Metrics

### Quantifiable Outcomes

- **Consensus Achievement**: 100% agent agreement required
- **Implementation Clarity**: Actionable tasks with clear owners
- **Business Value**: ROI projections with realistic timelines
- **Risk Mitigation**: Comprehensive contingency planning

### Quality Indicators

- **Technical Accuracy**: Solutions validated across domains
- **Feasibility**: Realistic implementation strategies
- **Integration**: Seamless cross-domain collaboration
- **Innovation**: Creative solutions beyond obvious approaches

## Integration with Claude Code

### Workflow Integration

1. Command triggers Context-Manager activation
2. Context-Manager analyzes task and selects agents
3. 5-round debate executed with proper coordination
4. Results integrated with project documentation
5. Action items added to todo management system
6. Memory MCP updated with consensus decisions

### Documentation Standards

- All agent selections documented with reasoning
- Complete debate transcripts preserved
- Implementation plans integrated with CLAUDE.md
- Success metrics tracked in project memory

This standardized `/multi-agent-review` command transforms the proven
optimization workflow into a reusable, intelligent system for any development
challenge.
