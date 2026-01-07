import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,jsx}'],
		extends: [
			js.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
			pluginReact.configs.flat.recommended,
		],
		settings: {
			react: {
				version: 'detect',
				jsxRuntime: 'automatic',
			},
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'no-trailing-spaces': ['error'],
			'brace-style': ['error', '1tbs'],
			'no-inner-declarations': ['off'],
			'linebreak-style': ['error', 'unix'],
			'operator-linebreak': ['error', 'before'],
			'space-before-function-paren': ['error', 'always'],
			'no-extra-parens': ['off'],
			'space-infix-ops': ['error'],
			'object-curly-spacing': ['error', 'always'],
			'quote-props': ['error', 'as-needed'],
			'padded-blocks': ['error', 'never'],
			'space-before-blocks': ['error', 'always'],
			semi: ['error', 'always'],
			'comma-spacing': ['error', {
				before: false,
				after: true,
			}],

			'no-multiple-empty-lines': ['error', {
				max: 1,
				maxEOF: 0,
				maxBOF: 0,
			}],

			indent: ['error', 'tab', {
				SwitchCase: 1,
				ignoredNodes: ['TemplateLiteral > *'],
			}],

			quotes: ['error', 'single', {
				avoidEscape: true,
				allowTemplateLiterals: true,
			}],

			'semi-spacing': ['error', {
				before: false,
				after: true,
			}],

			'max-len': ['error', {
				code: 180,
			}],

			'keyword-spacing': ['error', {
				before: true,
				after: true,
			}],

			'comma-dangle': ['error', {
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'never',
				exports: 'never',
				functions: 'never',
			}],

			'key-spacing': ['error', {
				beforeColon: false,
				afterColon: true,
			}],

			'no-unused-vars': ['error', {
				args: 'none',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^ignore',
			}],

			'no-redeclare': ['error'],
			'no-empty': ['off'],
			'no-nested-ternary': ['error'],
			'no-case-declarations': ['off'],
			'no-unreachable': ['warn'],
			'no-ex-assign': ['off'],
			'no-control-regex': ['off'],
			'no-prototype-builtins': ['off'],
			'no-self-assign': ['off'],
			'no-useless-catch': ['off'],
			'no-func-assign': ['off'],
			'no-undef': ['off'],
		},
	},
]);