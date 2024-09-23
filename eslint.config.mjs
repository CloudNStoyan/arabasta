import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
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
    ignores: ['**/dist/*'],
  },
];
