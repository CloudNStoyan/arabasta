import enumValueShouldMatchEnumNameRule from './rules/enum-value-should-match-enum-name';
import noDestructuringArraysAsObjectsRule from './rules/no-destructuring-arrays-as-objects';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-typescript',
    version: '1.0.1',
  },
  configs: {},
  rules: {
    'no-destructuring-arrays-as-objects': noDestructuringArraysAsObjectsRule,
    'enum-value-should-match-enum-name': enumValueShouldMatchEnumNameRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/typescript/no-destructuring-arrays-as-objects': 'error',
  '@arabasta/typescript/enum-value-should-match-enum-name': 'error',
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
