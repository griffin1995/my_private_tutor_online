# Development Standards

## Core Non-Negotiables

### Zero Tolerance Violations

These rules override ALL other considerations. Violation results in immediate task termination.

#### Language and Quality Standards
- **British English Mandatory**: All spelling, terminology, and conventions
- **Premium Service Standard**: Enterprise-grade, production-ready solutions exclusively
- **No Shortcuts**: Royal client-worthy implementations only

#### File Management Protocol
- **Edit-First Policy**: Prefer modifying existing files over creating new ones
- **No Proactive Documentation**: Only create documentation when explicitly requested
- **Necessity Gate**: New files only when absolutely essential

## Implementation Workflow

### Pre-Development Checklist
1. Identify appropriate agent for task complexity
2. Verify implementation patterns against best practices
3. Prepare agent context with relevant requirements

### Agent Specialisation Matrix

#### Haiku Agent (Fast, Efficient)
- **Optimal For**: Content updates, CSS tweaks, simple component changes, documentation updates, bug fixes
- **Context Required**: Minimal - current file context, specific change requirements
- **Output Expected**: Quick, precise modifications with clear reasoning

#### Sonnet Agent (Balanced, Complex)
- **Optimal For**: Component architecture, API integrations, form implementations, state management, testing suites
- **Context Required**: Moderate - component relationships, business requirements
- **Output Expected**: Well-structured implementations following best practices

#### Opus Agent (Advanced, Strategic)
- **Optimal For**: System architecture, performance optimisation, accessibility compliance, security implementations, complex business logic
- **Context Required**: Comprehensive - system architecture, business context
- **Output Expected**: Enterprise-grade solutions with detailed architectural justification

## Task Classification

- **Simple** → Haiku → Quick execution with minimal context
- **Complex** → Sonnet → Structured implementation with moderate context
- **Strategic** → Opus → Comprehensive solution with full context

## Output Verification

Every code change must pass these verification checks:

- **British English Usage**: Consistent throughout all implementations
- **Premium Service Standards**: Royal client-worthy quality maintained
- **Code Quality**: Clean, maintainable, production-ready code

## Immediate Termination Conditions

These violations result in immediate task termination:

- **Any async CMS patterns**: Promise-based functions, useState/useEffect for static content
- **Any forbidden architectural patterns**: Dynamic imports, loading states for JSON data
- **Any homepage failure indicators**: Loading spinners that don't resolve, missing content sections

## Context Preparation

- Prepare project-specific requirements and constraints
- Specify British English and royal client quality expectations
- Include technical context without business information

## Related Documentation

- [CSS Architecture Standards](css-architecture.md)
- [CMS Patterns (Critical)](cms-patterns.md)
- [Emergency Protocols](../reference/emergency-protocols.md)