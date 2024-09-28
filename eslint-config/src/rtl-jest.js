const tseslint = require('typescript-eslint');
const testingLibrary = require('eslint-plugin-testing-library');

module.exports = tseslint.config({
  extends: [testingLibrary.configs['flat/react']],
  rules: {
    'testing-library/no-wait-for-multiple-assertions': 'off',
  },
});
