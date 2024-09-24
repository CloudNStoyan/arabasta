const tseslint = require('typescript-eslint');
const jest = require('eslint-plugin-jest');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = tseslint.config({
  name: 'Test files and test related infrastructure',
  files: ['**/+(*.)+(spec|test).+(ts|js)?(x)', 'src/testing/**'],
  extends: [...compat.extends('plugin:testing-library/react')],
  plugins: {
    jest,
  },
  rules: {
    ...jest.configs.recommended.rules,
    'testing-library/no-manual-cleanup': 'off',
    'testing-library/no-wait-for-multiple-assertions': 'off',
    'jest/expect-expect': 'off',
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
