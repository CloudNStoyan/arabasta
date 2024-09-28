import noDestructuringArraysAsObjectsRule from './rules/no-destructuring-arrays-as-objects.js';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-no-testing-library-without-cleanup',
    version: '1.1.0',
  },
  configs: {},
  rules: {
    'no-destructuring-arrays-as-objects': noDestructuringArraysAsObjectsRule,
  },
  processors: {},
};

plugin.configs = {
  recommended: {
    name: '@arabasta/no-destructuring-arrays-as-objects/recommended',
    plugins: {
      '@arabasta/no-destructuring-arrays-as-objects': plugin,
    },
    rules: {
      '@arabasta/no-destructuring-arrays-as-objects/no-destructuring-arrays-as-objects':
        'error',
    },
  },
  'recommended-legacy': {
    parser: '@typescript-eslint/parser',
    parserOptions: { sourceType: 'module' },
    plugins: ['@arabasta/no-destructuring-arrays-as-objects'],
    rules: {
      '@arabasta/no-destructuring-arrays-as-objects/no-destructuring-arrays-as-objects':
        'error',
    },
  },
};

module.exports = plugin;
