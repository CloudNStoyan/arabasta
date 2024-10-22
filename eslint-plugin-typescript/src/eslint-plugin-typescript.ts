import noDestructuringArraysAsObjectsRule from './rules/no-destructuring-arrays-as-objects';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-typescript',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'no-destructuring-arrays-as-objects': noDestructuringArraysAsObjectsRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/typescript/no-destructuring-arrays-as-objects': 'error',
};

plugin.configs = {
  recommended: {
    name: '@arabasta/eslint-plugin-typescript/recommended',
    plugins: {
      '@arabasta/typescript': plugin,
    },
    rules: recommendedRules,
  },
  'recommended-legacy': {
    plugins: ['@arabasta/typescript'],
    rules: recommendedRules,
  },
};

export = plugin;
