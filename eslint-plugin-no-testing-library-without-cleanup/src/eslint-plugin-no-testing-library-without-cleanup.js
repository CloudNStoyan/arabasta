const noTestingLibraryWithoutCleanup = require('./rules/no-testing-library-without-cleanup.js');

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-no-testing-library-without-cleanup',
    version: '1.0.4',
  },
  configs: {},
  rules: {
    'no-testing-library-without-cleanup': noTestingLibraryWithoutCleanup,
  },
  processors: {},
};

plugin.configs = {
  recommended: {
    name: '@arabasta/no-testing-library-without-cleanup/recommended',
    plugins: {
      '@arabasta/no-testing-library-without-cleanup': plugin,
    },
    rules: {
      '@arabasta/no-testing-library-without-cleanup/no-testing-library-without-cleanup':
        'error',
    },
  },
  'recommended-legacy': {
    plugins: ['@arabasta/no-testing-library-without-cleanup'],
    rules: {
      '@arabasta/no-testing-library-without-cleanup/no-testing-library-without-cleanup':
        'error',
    },
  },
};

module.exports = plugin;
