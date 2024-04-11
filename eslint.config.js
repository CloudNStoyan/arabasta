import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPlugin from 'eslint-plugin-eslint-plugin';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ...eslintPlugin.configs['flat/recommended'],
    files: ['eslint-plugin-*/**/*.js'],
  },
  {
    files: ['eslint-plugin-*/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
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
