module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'plugin:storybook/recommended'
	],
	rules: {},
	overrides: [
		{
			files: ['*.js', '*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
				'react/prop-types': 'off',
				'react/display-name': 'off',
				'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'ignore' }],
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^(...|_)' }]
			}
		}
	]
};
