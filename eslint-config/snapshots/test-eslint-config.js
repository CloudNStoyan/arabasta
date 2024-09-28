const baseConfig = require('../src/base');
const reactConfig = require('../src/react');
const configFilesConfig = require('../src/config-files');
const typescriptConfig = require('../src/typescript');
const typescriptDefinitionsConfig = require('../src/typescript-definitions');
const reactTypescriptConfig = require('../src/react-typescript');
const jestConfig = require('../src/jest');
const rtlJestConfig = require('../src/rtl-jest');
const reduxConfig = require('../src/redux');

// TODO: Add a comment about tseslint usage - https://typescript-eslint.io/packages/typescript-eslint#flat-config-extends
const tseslint = require('typescript-eslint');

const typeScriptExtensions = ['ts', 'cts', 'mts', 'tsx'];
const allExtensions = ['js', 'cjs', 'mjs', 'jsx', ...typeScriptExtensions];

module.exports = [
  ...tseslint.config({
    name: 'All files',
    files: [`**/*.+(${allExtensions.join('|')})`],
    extends: [...baseConfig],
    settings: {
      'import/extensions': allExtensions.map((ext) => `.${ext}`),
      'import/internal-regex': '^(~|src)',
    },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './',
              from: `./src/**/*.+(spec|test).+(${allExtensions.join('|')})`,
              message: 'Importing test files in non-test files is not allowed.',
            },
            {
              target: './',
              from: `./__mocks__`,
              message:
                'Importing mock modules in non-test files is not allowed.',
            },
            {
              target: './',
              from: './src/testing',
              message:
                'Importing testing utilities in non-test files is not allowed.',
            },
          ],
        },
      ],
    },
  }),

  ...tseslint.config({
    name: 'TypeScript files',
    files: [`**/*.+(${typeScriptExtensions.join('|')})`],
    extends: [...typescriptConfig],
    rules: {
      // Put your rules here.
    },
  }),

  ...tseslint.config({
    name: 'TypeScript definition files',
    files: ['**/*.d.ts'],
    extends: [typescriptDefinitionsConfig],
    rules: {
      // Put your rules here.
    },
  }),

  ...tseslint.config({
    name: 'React files',
    files: [`src/**/*.+(${allExtensions.join('|')})`],
    extends: [...reactConfig, reactTypescriptConfig, ...reduxConfig],
    rules: {
      // Put your rules here.
    },
  }),

  ...tseslint.config({
    name: 'Test files and test related infrastructure',
    files: [
      `src/**/*.+(spec|test).+(${allExtensions.join('|')})`,
      `src/testing/**/*.+(${allExtensions.join('|')})`,
      `__mocks__/**/*.+(${allExtensions.join('|')})`,
    ],
    extends: [...jestConfig, ...rtlJestConfig],
    rules: {
      // Put your rules here.
    },
  }),

  ...tseslint.config({
    name: 'Root level configuration files',
    files: [`*.+(${allExtensions.join('|')})`],
    extends: [...configFilesConfig],
    rules: {
      // Put your rules here.
    },
  }),
];
