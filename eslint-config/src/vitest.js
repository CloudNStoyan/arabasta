const tseslint = require('typescript-eslint');
const vitest = require('@vitest/eslint-plugin');

module.exports = tseslint.config({
  extends: [vitest.configs.recommended],
  rules: {
    'vitest/expect-expect': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-restricted-paths': ['off', { zones: [] }],
  },
});
