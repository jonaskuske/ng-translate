// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import angular from 'angular-eslint'

export default tseslint.config(
	{
		files: ['**/*.{js,cjs,mjs,ts,cts,mts}'],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
		],
		languageOptions: { parserOptions: { projectService: true } },
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					ignoreRestSiblings: true,
					argsIgnorePattern:
						'^_|ctx|err|res|rej|resolve|reject|resp|req|response|reply|request|evt|event|cb|callback',
				},
			],
			'@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
			'@typescript-eslint/only-throw-error': 'off',
		},
	},
	{
		files: ['**/*.html'],
		extends: [
			...angular.configs.templateRecommended,
			...angular.configs.templateAccessibility,
		],
		rules: {},
	},
	{ ignores: ['.yarn/**/*', '.pnp.*', 'eslint.config.js'] },
)
