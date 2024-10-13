const tseslint = require('typescript-eslint');
const jest = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = tseslint.config({
  extends: [jest.configs['flat/recommended']],
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
  rules: {
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
