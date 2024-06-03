const requireDependencyArrayRule = require('./rules/require-useeffect-dependency-array.js');

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-require-useeffect-dependency-array',
    version: '1.0.9',
  },
  configs: {},
  rules: {
    'require-useeffect-dependency-array': requireDependencyArrayRule,
  },
  processors: {},
};

plugin.configs = {
  recommended: {
    name: '@arabasta/require-useeffect-dependency-array/recommended',
    plugins: {
      '@arabasta/require-useeffect-dependency-array': plugin,
    },
    rules: {
      '@arabasta/require-useeffect-dependency-array/require-useeffect-dependency-array':
        'error',
    },
  },
  'recommended-legacy': {
    plugins: ['@arabasta/require-useeffect-dependency-array'],
    rules: {
      '@arabasta/require-useeffect-dependency-array/require-useeffect-dependency-array':
        'error',
    },
  },
};

module.exports = plugin;
