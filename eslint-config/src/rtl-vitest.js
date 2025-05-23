const tseslint = require('typescript-eslint');
const testingLibrary = require('eslint-plugin-testing-library');
const arabastaTestingLibrary = require('@arabasta/eslint-plugin-testing-library');

module.exports = tseslint.config({
  extends: [
    testingLibrary.configs['flat/react'],
    arabastaTestingLibrary.configs.recommended,
  ],
  rules: {
    'testing-library/no-manual-cleanup': 'off',
    'testing-library/no-wait-for-multiple-assertions': 'off',
  },
});
