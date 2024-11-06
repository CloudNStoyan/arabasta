// import/no-unresolved doesn't support node "exports" field. https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
const tseslint = require('typescript-eslint');

const {
  baseConfig,
  configFilesConfig,
  jestConfig,
  reactConfig,
  reactTypescriptConfig,
  reduxConfig,
  rtlJestConfig,
  typescriptConfig,
  typescriptDefinitionsConfig,
  rtlVitestConfig,
  vitestConfig,
  tsoaConfig,
} = require('..');

function createConfigVariation(variation) {
  const variationTags = variation.split('_');

  const typeScriptExtensions = [
    'ts',
    'cts',
    'mts',
    ...(variationTags.includes('react') ? ['tsx'] : []),
  ];

  const typeScriptDefinitionExtensions = typeScriptExtensions
    .filter((x) => x !== 'tsx')
    .map((x) => `d.${x}`);

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
        'import/resolver': {
          node: {
            extensions: allExtensions.map((ext) => `.${ext}`),
          },
        },
      },
      rules: {
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              {
                target: './',
                from: `./src/**/*.+(spec|test).+(${allExtensions.join('|')})`,
                message:
                  'Importing test files in non-test files is not allowed.',
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
        files: [`**/*.+(${typeScriptDefinitionExtensions.join('|')})`],
        extends: [...typescriptDefinitionsConfig],
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
            ? [...reactTypescriptConfig]
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

  if (variationTags.includes('tsoa')) {
    configs.push(
      ...tseslint.config({
        name: 'TSOA files',
        files: [`src/routes/**/*.+(${allExtensions.join('|')})`],
        extends: [...tsoaConfig],
        rules: {
          // Put your rules here.
        },
      })
    );
  }

  configs.push(
    ...tseslint.config({
      name: 'Root level configuration files',
      files: [
        `*.+(${allExtensions.join('|')})`,
        `__mocks__/**/*.+(${allExtensions.join('|')})`,
      ],
      extends: [...configFilesConfig],
      rules: {
        // Put your rules here.
      },
    })
  );

  configs.push({
    ignores: ['eslint.config.js'],
  });

  return configs;
}

module.exports = createConfigVariation(process.env.variation ?? '');

module.exports.createConfigVariation = createConfigVariation;
