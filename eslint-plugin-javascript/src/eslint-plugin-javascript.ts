import reportCaughtErrorRule from './rules/report-caught-error';
import useAlternativeFunctionsRule from './rules/use-alternative-functions';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-javascript',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'report-caught-error': reportCaughtErrorRule,
    'use-alternative-functions': useAlternativeFunctionsRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/javascript/report-caught-error': 'error',
};

plugin.configs = {
  recommended: {
    name: '@arabasta/eslint-plugin-javascript/recommended',
    plugins: {
      '@arabasta/javascript': plugin,
    },
    rules: recommendedRules,
  },
  'recommended-legacy': {
    plugins: ['@arabasta/javascript'],
    rules: recommendedRules,
  },
};

export = plugin;
