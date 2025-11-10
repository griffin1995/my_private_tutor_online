/**
 * CRITICAL: Enhanced ESLint Rules for React Children Validation
 * CONTEXT7 SOURCE: eslint-plugin-react documentation
 *
 * This module documents custom ESLint rules for preventing:
 * - Invalid JSX children (objects, promises, etc.)
 * - Improper prop passing
 * - Hook rule violations
 * - Component lifecycle errors
 *
 * IMPLEMENTATION: These rules should be enabled in .eslintrc.js
 */

export interface ESLintReactRuleConfig {
	rule: string;
	severity: 'error' | 'warn';
	description: string;
	fixes: string[];
}

/**
 * Critical React rules for preventing common errors
 */
export const CRITICAL_REACT_RULES: ESLintReactRuleConfig[] = [
	{
		rule: 'react/no-invalid-jsx-namespace',
		severity: 'error',
		description: 'Prevent invalid JSX namespace usage',
		fixes: [
			'Ensure JSX imports React or uses the new JSX transform',
			'Remove custom createElement calls without React import',
		],
	},
	{
		rule: 'react/no-unstable-nested-components',
		severity: 'warn',
		description: 'Prevent component definitions inside other components',
		fixes: [
			'Move component definition outside parent component',
			'Use useCallback to stabilize function references',
		],
	},
	{
		rule: 'react/no-array-index-key',
		severity: 'warn',
		description: 'Prevent array index as React key (causes re-render issues)',
		fixes: [
			'Use unique, stable identifiers as keys',
			'Use item ID or UUID instead of index',
		],
	},
	{
		rule: 'react/jsx-key',
		severity: 'error',
		description: 'Require key prop for list items',
		fixes: [
			'Add key={uniqueId} to list item JSX',
			'Ensure keys are unique across siblings',
		],
	},
	{
		rule: 'react/no-children-prop',
		severity: 'error',
		description: 'Prevent passing children as prop instead of JSX',
		fixes: [
			'Use JSX children instead of children prop',
			'Change <Component children={elements} /> to <Component>{elements}</Component>',
		],
	},
	{
		rule: 'react/prop-types',
		severity: 'warn',
		description: 'Enforce prop types or TypeScript types',
		fixes: [
			'Add TypeScript interfaces or prop-types',
			'Document component props with JSDoc',
		],
	},
	{
		rule: 'react-hooks/rules-of-hooks',
		severity: 'error',
		description: 'Enforce Hook rules',
		fixes: [
			'Call hooks at top level of component',
			'Never call hooks inside conditions or loops',
			'Never call hooks from non-React functions',
		],
	},
	{
		rule: 'react-hooks/exhaustive-deps',
		severity: 'warn',
		description: 'Enforce useEffect dependency array',
		fixes: [
			'Add missing dependencies to useEffect dependency array',
			'Remove unnecessary dependencies if causing infinite loops',
		],
	},
];

/**
 * Common invalid React children patterns
 */
export const INVALID_CHILDREN_PATTERNS = [
	{
		pattern: '<div>{plainObject}</div>',
		issue: 'Plain objects are not valid React children',
		solution: 'Use Object.entries() or JSON.stringify()',
		example: '<div>{JSON.stringify(obj)}</div> or <div>{obj.property}</div>',
	},
	{
		pattern: '<div>{promise}</div>',
		issue: 'Promises cannot be rendered directly',
		solution: 'Use useEffect + useState or React Suspense',
		example: 'const [data, setData] = useState(); useEffect(() => { promise.then(setData); }, [])',
	},
	{
		pattern: '<div>{function}</div>',
		issue: 'Functions are not valid React children',
		solution: 'Call the function or wrap in another component',
		example: '<div>{myFunction()}</div> or <MyComponent render={myFunction} />',
	},
	{
		pattern: '<div>{new Date()}</div>',
		issue: 'Date objects need to be converted to strings',
		solution: 'Call .toString() or .toLocaleDateString()',
		example: '<div>{new Date().toLocaleDateString()}</div>',
	},
	{
		pattern: 'function Component() { return [elements]; }',
		issue: 'Arrays must be wrapped in a Fragment',
		solution: 'Wrap in <> or <React.Fragment>',
		example: 'function Component() { return <>...elements...</>; }',
	},
];

/**
 * TypeScript patterns for type-safe components
 */
export const TYPE_SAFE_PATTERNS = [
	{
		name: 'Strictly typed children',
		pattern: `
interface Props {
  children: React.ReactNode; // Allows: elements, strings, numbers, fragments
}

function Component({ children }: Props) {
  return <div>{children}</div>;
}
		`,
		benefits: ['Type-safe at compile time', 'IDE autocompletion', 'Prevents invalid children'],
	},
	{
		name: 'Explicitly typed children elements',
		pattern: `
interface Props {
  children: React.ReactElement | React.ReactElement[]; // Only React elements
}

function Component({ children }: Props) {
  return <div>{children}</div>;
}
		`,
		benefits: ['Stricter validation', 'Prevents primitives and objects', 'Better IDE support'],
	},
	{
		name: 'Function children pattern',
		pattern: `
interface Props {
  children: (value: string) => React.ReactNode; // Render prop pattern
}

function Component({ children }: Props) {
  return <div>{children('data from component')}</div>;
}

// Usage
<Component>{(data) => <p>{data}</p>}</Component>
		`,
		benefits: ['Flexible rendering', 'Type-safe parameter passing', 'Avoids wrapper divs'],
	},
];

/**
 * Development-time checks for invalid children
 */
export function validateComponentChildren(
	ComponentName: string,
	children: any,
	expectedType: 'ReactNode' | 'ReactElement' | 'string' | 'number'
): { valid: boolean; error?: string } {
	if (expectedType === 'ReactNode') {
		if (
			children === null ||
			children === undefined ||
			typeof children === 'string' ||
			typeof children === 'number' ||
			typeof children === 'boolean'
		) {
			return { valid: true };
		}

		// React elements are valid
		if (React.isValidElement(children)) {
			return { valid: true };
		}

		// Arrays of valid children
		if (Array.isArray(children)) {
			for (const child of children) {
				const result = validateComponentChildren(ComponentName, child, expectedType);
				if (!result.valid) {
					return result;
				}
			}
			return { valid: true };
		}

		// Plain objects are INVALID
		if (typeof children === 'object' && children !== null) {
			return {
				valid: false,
				error: `${ComponentName}: Attempted to render plain object as child. Objects are not valid React children. Use JSON.stringify() or extract properties.`,
			};
		}

		return { valid: true };
	}

	if (expectedType === 'ReactElement') {
		if (React.isValidElement(children)) {
			return { valid: true };
		}
		return {
			valid: false,
			error: `${ComponentName}: Expected React element, received ${typeof children}`,
		};
	}

	if (expectedType === 'string') {
		if (typeof children === 'string') {
			return { valid: true };
		}
		return {
			valid: false,
			error: `${ComponentName}: Expected string, received ${typeof children}`,
		};
	}

	if (expectedType === 'number') {
		if (typeof children === 'number') {
			return { valid: true };
		}
		return {
			valid: false,
			error: `${ComponentName}: Expected number, received ${typeof children}`,
		};
	}

	return { valid: true };
}

import React from 'react';
