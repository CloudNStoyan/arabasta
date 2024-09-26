const tseslint = require('typescript-eslint');
const jest = require('eslint-plugin-jest');

module.exports = tseslint.config({
  extends: [jest.configs['flat/recommended']],
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
