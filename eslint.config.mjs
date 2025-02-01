// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';

const config = tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,

	{
		files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2025,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.node,
				...globals.browser
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
			prettier
		},

		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			...prettier.configs.recommended.rules,

			'no-unused-vars': 'off',

			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: '^(...|_)'
				}
			],

			'react/prop-types': 'off',
			'react/display-name': 'off',
			'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }]
		},

		ignores: ['node_modules/*', 'dist/*', 'build/*', '/public/**']
	}
);

export default config;
