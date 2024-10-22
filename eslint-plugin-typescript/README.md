# `@arabasta/eslint-plugin-typescript`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-typescript)](https://www.npmjs.com/package/@arabasta/eslint-plugin-typescript)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-typescript)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-typescript/LICENSE)

ESLint plugin for typescript rules.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-typescript

# yarn
yarn add --dev @arabasta/eslint-plugin-typescript

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-typescript
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import arabastaTypescript from '@arabasta/eslint-plugin-typescript';

export default [
  // ...
  arabastaTypescript.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/typescript/recommended-legacy"
  ]
}
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
💭 Requires [type information](https://typescript-eslint.io/linting/typed-linting).

| Name                                                                                   | Description                              | 💼  | 💭  |
| :------------------------------------------------------------------------------------- | :--------------------------------------- | :-- | :-- |
| [no-destructuring-arrays-as-objects](docs/rules/no-destructuring-arrays-as-objects.md) | disallow destructuring arrays as objects | ✅  | 💭  |

<!-- end auto-generated rules list -->
