const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  name: 'Type definition files',
  files: ['**/*.d.ts'],
  rules: {
    'import/no-default-export': 'off',
  },
});
