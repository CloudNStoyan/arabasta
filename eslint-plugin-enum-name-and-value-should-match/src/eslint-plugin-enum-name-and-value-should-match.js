const enumNameAndValueShouldMatchRule = require('./rules/enum-name-and-value-should-match.js');

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: {
    name: 'eslint-plugin-enum-name-and-value-should-match',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'enum-name-and-value-should-match': enumNameAndValueShouldMatchRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/enum-name-and-value-should-match/enum-name-and-value-should-match':
    'error',
};

plugin.configs = {
  recommended: {
    name: '@arabasta/enum-name-and-value-should-match/recommended',
    plugins: {
      '@arabasta/enum-name-and-value-should-match': plugin,
    },
    rules: recommendedRules,
  },
  'recommended-legacy': {
    plugins: ['@arabasta/enum-name-and-value-should-match'],
    rules: recommendedRules,
  },
};

module.exports = plugin;
