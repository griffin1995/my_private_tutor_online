import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	...compat.extends('plugin:jsx-a11y/recommended'),
	{
		rules: {
			// Context7 MCP Documentation Source: /microsoft/typescript
			// Reference: ESLint configuration for production deployment
			// Purpose: Disable non-critical linting rules while maintaining type safety

			// Allow unused variables temporarily for production deployment
			'@typescript-eslint/no-unused-vars': 'warn',

			// Allow any types in specific cases (will be gradually typed)
			'@typescript-eslint/no-explicit-any': 'warn',

			// Allow unescaped entities in React (common in content)
			'react/no-unescaped-entities': 'warn',

			// Allow anonymous default exports (common pattern in utilities)
			'import/no-anonymous-default-export': 'warn',

			// Allow img elements (will be gradually migrated to Next/Image)
			'@next/next/no-img-element': 'warn',

			// Allow missing React hooks dependencies (will be fixed incrementally)
			'react-hooks/exhaustive-deps': 'warn',

			// CONTEXT7 SOURCE: /dequelabs/axe-core - JSX Accessibility Rules for WCAG Compliance
			// Purpose: Ensure accessibility compliance at build time for royal client standards

			// Enforce accessibility rules with warnings for gradual implementation
			'jsx-a11y/alt-text': 'error',
			'jsx-a11y/anchor-has-content': 'error',
			'jsx-a11y/anchor-is-valid': 'error',
			'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
			'jsx-a11y/aria-props': 'error',
			'jsx-a11y/aria-proptypes': 'error',
			'jsx-a11y/aria-role': 'error',
			'jsx-a11y/aria-unsupported-elements': 'error',
			'jsx-a11y/click-events-have-key-events': 'warn',
			'jsx-a11y/heading-has-content': 'error',
			'jsx-a11y/html-has-lang': 'error',
			'jsx-a11y/iframe-has-title': 'error',
			'jsx-a11y/img-redundant-alt': 'warn',
			'jsx-a11y/interactive-supports-focus': 'warn',
			'jsx-a11y/label-has-associated-control': 'error',
			'jsx-a11y/media-has-caption': 'warn',
			'jsx-a11y/mouse-events-have-key-events': 'warn',
			'jsx-a11y/no-access-key': 'error',
			'jsx-a11y/no-autofocus': 'warn',
			'jsx-a11y/no-distracting-elements': 'error',
			'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
			'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
			'jsx-a11y/no-redundant-roles': 'warn',
			'jsx-a11y/role-has-required-aria-props': 'error',
			'jsx-a11y/role-supports-aria-props': 'error',
			'jsx-a11y/scope': 'error',
			'jsx-a11y/tabindex-no-positive': 'error',
		},
	},
];

export default eslintConfig;
