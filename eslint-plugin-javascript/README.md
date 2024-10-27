# `@arabasta/eslint-plugin-javascript`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-javascript)](https://www.npmjs.com/package/@arabasta/eslint-plugin-javascript)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-javascript)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-javascript/LICENSE)

ESLint plugin for javascript rules.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-javascript

# yarn
yarn add --dev @arabasta/eslint-plugin-javascript

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-javascript
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import arabastaJavascript from '@arabasta/eslint-plugin-javascript';

export default [
  // ...
  arabastaJavascript.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/javascript/recommended-legacy"
  ]
}
```

## Rules

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                                 | Description                                | 💼  | 🔧  | 💡  |
| -------------------------------------------------------------------- | ------------------------------------------ | --- | --- | --- |
| [report-caught-error](docs/rules/report-caught-error.md)             | require caught errors to be reported       | ✅  |     | 💡  |
| [use-alternative-functions](docs/rules/use-alternative-functions.md) | require the usage of alternative functions |     | 🔧  |     |
