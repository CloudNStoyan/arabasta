import reportCaughtErrorRule from './rules/report-caught-error';
import useAppAlternativesRule from './rules/use-app-alternatives';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-javascript',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'report-caught-error': reportCaughtErrorRule,
    'use-app-alternatives': useAppAlternativesRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/javascript/report-caught-error': 'error',
  '@arabasta/javascript/use-app-alternatives': 'error',
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
