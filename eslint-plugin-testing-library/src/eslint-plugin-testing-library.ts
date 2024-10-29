import noTestingLibraryWithoutCleanupRule from './rules/no-testing-library-without-cleanup';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-testing-library',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'no-testing-library-without-cleanup': noTestingLibraryWithoutCleanupRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/testing-library/no-testing-library-without-cleanup': 'error',
};

plugin.configs = {
  recommended: {
    name: '@arabasta/eslint-plugin-testing-library/recommended',
    plugins: {
      '@arabasta/testing-library': plugin,
    },
    rules: recommendedRules,
  },
  'recommended-legacy': {
    plugins: ['@arabasta/testing-library'],
    rules: recommendedRules,
  },
};

export = plugin;
