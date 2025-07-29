const tseslint = require('typescript-eslint');
const arabastaTypescript = require('@arabasta/eslint-plugin-typescript');
const { FlatCompat } = require('@eslint/eslintrc');
const prettier = require('eslint-config-prettier');

const compat = new FlatCompat();

module.exports = tseslint.config({
  extends: [
    arabastaTypescript.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...compat.extends('plugin:import/typescript'),
    prettier,
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      project: ['tsconfig.json'],
    },
  },
  settings: {
    'import/resolver': {
      typescript: true,
    },
  },
  rules: {
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNullish: true,
        allowNumber: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        classes: true,
        functions: true,
        variables: true,
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTaggedTemplates: false,
        allowTernary: false,
        enforceForJSX: false,
      },
    ],
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',

    'linebreak-style': ['error', 'unix'],
    'no-func-assign': 'error',
    'constructor-super': 'error',
    'getter-return': ['error', { allowImplicit: true }],
    'import/named': 'error',
    'no-const-assign': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-import-assign': 'error',
    'no-new-func': 'error',
    'no-new-symbol': 'error',
    'no-obj-calls': 'error',
    'no-this-before-super': 'error',
    'no-undef': 'error',
    'no-unreachable': 'error',
    'valid-typeof': ['error', { requireStringLiterals: true }],
    curly: ['error', 'all'],
  },
});
