# `@arabasta/eslint-plugin-testing-library`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-testing-library)](https://www.npmjs.com/package/@arabasta/eslint-plugin-testing-library)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-testing-library)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-testing-library/LICENSE)

ESLint plugin for testing library rules.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-testing-library

# yarn
yarn add --dev @arabasta/eslint-plugin-testing-library

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-testing-library
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import arabastaTestingLibrary from '@arabasta/eslint-plugin-testing-library';

export default [
  // ...
  arabastaTestingLibrary.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/testing-library/recommended-legacy"
  ]
}
```

## Rules

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.

| Name                                                                                   | Description                                                                   | 💼  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --- |
| [no-testing-library-without-cleanup](docs/rules/no-testing-library-without-cleanup.md) | require the usage of the cleanup function when importing from Testing Library | ✅  |
