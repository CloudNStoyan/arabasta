const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config({
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    'import/no-default-export': 'off',
    'import/no-commonjs': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
});
