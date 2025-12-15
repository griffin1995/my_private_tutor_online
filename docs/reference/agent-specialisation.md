# Agent Specialisation Matrix

Quick reference for selecting appropriate agents based on task complexity and requirements.

## Agent Selection Guide

### Haiku Agent (Fast, Efficient)

**Best For:**
- Content updates and copy changes
- CSS tweaks and styling adjustments
- Simple component modifications
- Documentation updates
- Bug fixes and corrections

**Context Required:**
- Minimal - current file context only
- Specific change requirements
- Clear scope definition

**Expected Output:**
- Quick, precise modifications
- Clear reasoning for changes
- Focused implementation
- Minimal context switching

**When to Choose:**
- Task can be completed in < 10 minutes
- Single file modifications
- Well-defined requirements
- No architectural decisions needed

---

### Sonnet Agent (Balanced, Complex)

**Best For:**
- Component architecture design
- API integrations and connections
- Form implementations
- State management solutions
- Testing suite development

**Context Required:**
- Moderate - component relationships
- Business requirements context
- Technical constraints
- Integration requirements

**Expected Output:**
- Well-structured implementations
- Following established best practices
- Proper error handling
- Documentation included

**When to Choose:**
- Multiple file modifications required
- Business logic implementation
- Integration work needed
- Moderate complexity architectural decisions

---

### Opus Agent (Advanced, Strategic)

**Best For:**
- System architecture design
- Performance optimisation initiatives
- Accessibility compliance implementations
- Security system implementations
- Complex business logic design

**Context Required:**
- Comprehensive - full system architecture
- Complete business context
- Technical constraint mapping
- Performance requirements

**Expected Output:**
- Enterprise-grade solutions
- Detailed architectural justification
- Comprehensive documentation
- Strategic implementation planning

**When to Choose:**
- System-wide changes required
- High complexity architectural decisions
- Performance critical implementations
- Security sensitive modifications

## Task Complexity Classification

### Simple Tasks → Haiku
- Text content updates
- CSS class adjustments
- Import/export modifications
- Documentation corrections
- Single function implementations

### Complex Tasks → Sonnet
- Component refactoring
- API endpoint creation
- Form validation implementation
- State management setup
- Test suite development

### Strategic Tasks → Opus
- Architecture redesign
- Performance auditing
- Security review implementation
- Large-scale refactoring
- System integration planning

## Selection Decision Tree

```
Is this a single-file change with clear requirements?
├─ Yes → Haiku Agent
└─ No
   └─ Does this involve multiple components or business logic?
      ├─ Yes → Does this require architectural decisions?
      │  ├─ Yes → Opus Agent
      │  └─ No → Sonnet Agent
      └─ No → Sonnet Agent
```

## Context Preparation Guidelines

### For Haiku Agent
- Current file content
- Specific change requirements
- Expected outcome
- Style guide compliance

### For Sonnet Agent
- Related component structure
- Business requirement details
- Technical constraints
- Integration points
- Testing requirements

### For Opus Agent
- Complete system architecture
- Performance requirements
- Security considerations
- Scalability requirements
- Long-term maintenance implications

## Quality Expectations

### All Agents Must Deliver
- **British English**: Consistent usage throughout
- **Premium Standards**: Enterprise-grade quality
- **Code Cleanliness**: Production-ready implementations
- **Documentation**: Appropriate for complexity level

### Haiku Specific
- **Speed**: Quick turnaround
- **Precision**: Exact requirement fulfillment
- **Efficiency**: Minimal overhead

### Sonnet Specific
- **Structure**: Well-organised implementations
- **Best Practices**: Industry standard approaches
- **Integration**: Proper system integration

### Opus Specific
- **Architecture**: Enterprise-grade design
- **Justification**: Detailed reasoning
- **Strategy**: Long-term considerations

## Common Use Cases

### Content Management
- **Text Updates**: Haiku
- **Content Structure Changes**: Sonnet
- **Content Architecture Redesign**: Opus

### Styling Work
- **CSS Adjustments**: Haiku
- **Component Styling**: Sonnet
- **Design System Overhaul**: Opus

### Component Development
- **Simple Component Creation**: Haiku
- **Complex Component Logic**: Sonnet
- **Component Architecture Design**: Opus

### Performance Work
- **Minor Optimisations**: Haiku
- **Feature Performance Tuning**: Sonnet
- **System Performance Architecture**: Opus

### Testing
- **Simple Unit Tests**: Haiku
- **Integration Test Suites**: Sonnet
- **Testing Strategy Design**: Opus

## Anti-Patterns to Avoid

### Over-Engineering with Haiku
- Don't use Haiku for complex architectural decisions
- Avoid Haiku for multi-file modifications
- Don't expect comprehensive analysis from Haiku

### Under-Utilising Opus
- Don't use Sonnet for system-wide architectural changes
- Avoid Sonnet for high-complexity security implementations
- Don't expect strategic planning from Sonnet

### Context Mismatch
- Providing Opus-level context to Haiku (cognitive overload)
- Providing Haiku-level context to Opus (insufficient information)
- Unclear task complexity leading to wrong agent selection

## Related Documentation

- [Development Standards](../standards/development-standards.md)
- [Emergency Protocols](emergency-protocols.md)
- [Verification Checklists](verification-checklists.md)