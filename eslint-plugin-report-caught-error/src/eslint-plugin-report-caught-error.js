const reportCaughtErrorRule = require('./rules/report-caught-error.js');

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-report-caught-error',
    version: '1.0.5',
  },
  configs: {},
  rules: {
    'report-caught-error': reportCaughtErrorRule,
  },
  processors: {},
};

plugin.configs = {
  recommended: {
    name: '@arabasta/report-caught-error/recommended',
    plugins: {
      '@arabasta/report-caught-error': plugin,
    },
    rules: {
      '@arabasta/report-caught-error/report-caught-error': 'error',
    },
  },
  'recommended-legacy': {
    plugins: ['@arabasta/report-caught-error'],
    rules: {
      '@arabasta/report-caught-error/report-caught-error': 'error',
    },
  },
};

module.exports = plugin;
