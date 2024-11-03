const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  rules: {
    'import/no-default-export': 'off',
  },
});
