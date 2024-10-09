const tseslint = require('typescript-eslint');
const testingLibrary = require('eslint-plugin-testing-library');
const noTLWithoutCleanup = require('@arabasta/eslint-plugin-no-testing-library-without-cleanup');

module.exports = tseslint.config({
  extends: [
    testingLibrary.configs['flat/react'],
    noTLWithoutCleanup.configs.recommended,
  ],
  rules: {
    'testing-library/no-manual-cleanup': 'off',
    'testing-library/no-wait-for-multiple-assertions': 'off',
  },
});
