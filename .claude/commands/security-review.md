---
allowed-tools: Bash(npm audit:*), Task, WebSearch
description: Review code for security vulnerabilities and compliance issues
argument-hint: [file path or component name]
---

<!--
CONTEXT7 SOURCE: /websites/docs_anthropic_com-en-docs-claude-code - Slash command frontmatter and $ARGUMENTS pattern
IMPLEMENTATION REASON: Official Claude Code documentation for security review slash command with OWASP compliance
-->

# Security Review

Review the specified code for security vulnerabilities, focusing on:

## Target for Review
$ARGUMENTS

## Security Analysis

1. **Authentication & Authorization**
   - User authentication flaws
   - Access control vulnerabilities
   - Session management issues
   - JWT token security

2. **Input Validation & Sanitization**
   - SQL injection vulnerabilities
   - XSS (Cross-site scripting) risks
   - Command injection possibilities
   - File upload security

3. **Data Protection**
   - Sensitive data exposure
   - Encryption implementation
   - API security
   - HTTPS enforcement

4. **OWASP Compliance**
   - Top 10 vulnerability assessment
   - Security headers
   - Error handling security
   - Dependency vulnerabilities

## Output Format

Provide detailed security assessment with:
- **Critical Issues**: Must fix immediately
- **High Priority**: Fix within 1 week
- **Medium Priority**: Fix within 1 month
- **Low Priority**: Consider for future releases

For each issue, include:
- Vulnerability description
- Potential impact assessment
- Specific remediation steps
- Code examples for fixes
- Compliance standards affected (GDPR, OWASP, PCI-DSS)

Execute comprehensive security review now.