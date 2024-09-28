// We use a tseslint helper function here so that we get easy "extends"
// functionality that eslint flat config makes hard to achieve.
// You can use this for the convenience, without using TypeScript.
// Ideally this helper function should be provided by eslint.
// For more information: https://typescript-eslint.io/packages/typescript-eslint/#flat-config-extends
const tseslint = require('typescript-eslint');

const baseConfig = require('../src/base');
const reactConfig = require('../src/react');
const configFilesConfig = require('../src/config-files');
const typescriptConfig = require('../src/typescript');
const typescriptDefinitionsConfig = require('../src/typescript-definitions');
const reactTypescriptConfig = require('../src/react-typescript');
const jestConfig = require('../src/jest');
const rtlJestConfig = require('../src/rtl-jest');
const vitestConfig = require('../src/vitest');
const rtlVitestConfig = require('../src/rtl-vitest');
const reduxConfig = require('../src/redux');

const variationTags = (process.env.variation ?? '').split('_');

const typeScriptExtensions = [
  'ts',
  'cts',
  'mts',
  ...(variationTags.includes('react') ? ['tsx'] : []),
];

const allExtensions = [
  'js',
  'cjs',
  'mjs',
  ...(variationTags.includes('react') ? ['jsx'] : []),
  ...(variationTags.includes('typescript') ? [...typeScriptExtensions] : []),
];

const configs = [
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
];

if (variationTags.includes('typescript')) {
  configs.push(
    ...tseslint.config({
      name: 'TypeScript files',
      files: [`**/*.+(${typeScriptExtensions.join('|')})`],
      extends: [...typescriptConfig],
      rules: {
        // Put your rules here.
      },
    })
  );

  configs.push(
    ...tseslint.config({
      name: 'TypeScript definition files',
      files: ['**/*.d.ts'],
      extends: [typescriptDefinitionsConfig],
      rules: {
        // Put your rules here.
      },
    })
  );
}

if (variationTags.includes('react')) {
  configs.push(
    ...tseslint.config({
      name: 'React files',
      files: [`src/**/*.+(${allExtensions.join('|')})`],
      extends: [
        ...reactConfig,

        ...(variationTags.includes('typescript')
          ? [reactTypescriptConfig]
          : []),

        ...(variationTags.includes('react-redux') ? [...reduxConfig] : []),
      ],
      rules: {
        // Put your rules here.
      },
    })
  );
}

if (variationTags.includes('jest')) {
  configs.push(
    ...tseslint.config({
      name: 'Test files and test related infrastructure',
      files: [
        `src/**/*.+(spec|test).+(${allExtensions.join('|')})`,
        `src/testing/**/*.+(${allExtensions.join('|')})`,
        `__mocks__/**/*.+(${allExtensions.join('|')})`,
      ],
      extends: [
        ...jestConfig,
        ...(variationTags.includes('rtl') ? [...rtlJestConfig] : []),
      ],
      rules: {
        // Put your rules here.
      },
    })
  );
}

if (variationTags.includes('vitest')) {
  configs.push(
    ...tseslint.config({
      name: 'Test files and test related infrastructure',
      files: [
        `src/**/*.+(spec|test).+(${allExtensions.join('|')})`,
        `src/testing/**/*.+(${allExtensions.join('|')})`,
        `__mocks__/**/*.+(${allExtensions.join('|')})`,
      ],
      extends: [
        ...vitestConfig,
        ...(variationTags.includes('rtl') ? [...rtlVitestConfig] : []),
      ],
      rules: {
        // Put your rules here.
      },
    })
  );
}

configs.push(
  ...tseslint.config({
    name: 'Root level configuration files',
    files: [`*.+(${allExtensions.join('|')})`],
    extends: [...configFilesConfig],
    rules: {
      // Put your rules here.
    },
  })
);

configs.push({
  ignores: ['eslint.config.js', 'generate.js'],
});

module.exports = configs;
