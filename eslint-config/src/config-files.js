const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config({
  name: 'Root level .js/.ts configuration files',
  files: ['*.js', '*.cjs', '*.ts', '__mocks__/**/*.[j|t]s?(x)'],
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
