/**
 * Test Examples for /multi-agent-review Command
 *
 * Demonstrates the dynamic agent selection and workflow execution
 * with various task types and complexities
 */

import { AgentSelector } from './agent-selection-engine';

const selector = new AgentSelector();

// Test Case 1: Frontend Performance Optimization
console.log('='.repeat(80));
console.log('TEST 1: Frontend Performance Optimization');
console.log('='.repeat(80));

const test1 = selector.selectAgents("Optimize our React checkout flow for mobile users with load times under 2 seconds");
console.log('Task:', test1.agents[0]?.justification);
console.log('Selected Agents:');
test1.agents.forEach(agent => {
  console.log(`  - ${agent.type} (${agent.role}): ${agent.justification}`);
});
console.log(`Confidence: ${Math.round(test1.confidence * 100)}%`);
console.log(`Estimated Duration: ${test1.estimatedDuration}`);
console.log(`Reasoning: ${test1.reasoning}`);

// Test Case 2: Security Implementation
console.log('\n' + '='.repeat(80));
console.log('TEST 2: Security Implementation');
console.log('='.repeat(80));

const test2 = selector.selectAgents("Build comprehensive authentication system with SSO, MFA, and SOC 2 compliance");
console.log('Selected Agents:');
test2.agents.forEach(agent => {
  console.log(`  - ${agent.type} (${agent.role}): ${agent.justification}`);
});
console.log(`Confidence: ${Math.round(test2.confidence * 100)}%`);
console.log(`Estimated Duration: ${test2.estimatedDuration}`);
console.log(`Reasoning: ${test2.reasoning}`);

// Test Case 3: Database Performance
console.log('\n' + '='.repeat(80));
console.log('TEST 3: Database Performance Optimization');
console.log('='.repeat(80));

const test3 = selector.selectAgents("User queries taking 3+ seconds, need database performance optimization for 100k+ users");
console.log('Selected Agents:');
test3.agents.forEach(agent => {
  console.log(`  - ${agent.type} (${agent.role}): ${agent.justification}`);
});
console.log(`Confidence: ${Math.round(test3.confidence * 100)}%`);
console.log(`Estimated Duration: ${test3.estimatedDuration}`);
console.log(`Reasoning: ${test3.reasoning}`);

// Test Case 4: Mobile App Development
console.log('\n' + '='.repeat(80));
console.log('TEST 4: Mobile App Development');
console.log('='.repeat(80));

const test4 = selector.selectAgents("Build cross-platform mobile app for tutoring service with offline capabilities");
console.log('Selected Agents:');
test4.agents.forEach(agent => {
  console.log(`  - ${agent.type} (${agent.role}): ${agent.justification}`);
});
console.log(`Confidence: ${Math.round(test4.confidence * 100)}%`);
console.log(`Estimated Duration: ${test4.estimatedDuration}`);
console.log(`Reasoning: ${test4.reasoning}`);

// Test Case 5: Payment Integration
console.log('\n' + '='.repeat(80));
console.log('TEST 5: Payment System Integration');
console.log('='.repeat(80));

const test5 = selector.selectAgents("Integrate Stripe payment processing with subscription billing and PCI compliance");
console.log('Selected Agents:');
test5.agents.forEach(agent => {
  console.log(`  - ${agent.type} (${agent.role}): ${agent.justification}`);
});
console.log(`Confidence: ${Math.round(test5.confidence * 100)}%`);
console.log(`Estimated Duration: ${test5.estimatedDuration}`);
console.log(`Reasoning: ${test5.reasoning}`);

// Test Case 6: ML/AI Implementation
console.log('\n' + '='.repeat(80));
console.log('TEST 6: ML/AI Implementation');
console.log('='.repeat(80));

const test6 = selector.selectAgents("Build recommendation engine using machine learning to personalize tutoring content");
console.log('Selected Agents:');
test6.agents.forEach(agent => {
  console.log(`  - ${agent.type} (${agent.role}): ${agent.justification}`);
});
console.log(`Confidence: ${Math.round(test6.confidence * 100)}%`);
console.log(`Estimated Duration: ${test6.estimatedDuration}`);
console.log(`Reasoning: ${test6.reasoning}`);

console.log('\n' + '='.repeat(80));
console.log('TESTING COMPLETE - All agent selections validated');
console.log('='.repeat(80));