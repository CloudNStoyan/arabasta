import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import packageJson from 'eslint-plugin-package-json/configs/recommended';
import globals from 'globals';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ...eslintPlugin.configs['flat/recommended'],
    files: ['eslint-plugin-*/**/*.js'],
  },
  {
    files: ['eslint-plugin-*/**/*.js'],
    rules: {
      'eslint-plugin/prefer-placeholders': 'error',
      'eslint-plugin/prefer-replace-text': 'error',
      'eslint-plugin/consistent-output': 'error',
    },
  },
  {
    ...packageJson,
    rules: {
      ...packageJson.rules,
      'package-json/order-properties': [
        'error',
        {
          order: [
            'name',
            'version',
            'private',
            'type',
            'description',
            'author',
            'repository',
            'files',
            'types',
            'main',
            'exports',
            'scripts',
            'dependencies',
            'devDependencies',
            'peerDependencies',
            'license',
            'keywords',
          ],
        },
      ],
      'package-json/valid-local-dependency': 'off',
    },
    ignores: ['eslint-config/package.json'],
  },
  {
    ignores: ['**/dist/*', '**/resolved-configs/*', '**/examples/*'],
  },
];
