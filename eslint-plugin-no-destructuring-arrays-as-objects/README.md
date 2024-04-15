# `@arabasta/eslint-plugin-no-destructuring-arrays-as-objects`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-no-destructuring-arrays-as-objects)](https://www.npmjs.com/package/@arabasta/eslint-plugin-no-destructuring-arrays-as-objects)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-no-destructuring-arrays-as-objects)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-no-destructuring-arrays-as-objects/LICENSE)

ESLint plugin that disallows destructuring arrays as objects.

> **Note**
> This plugin utilizes the awesome power of TypeScript's type checking.\
> These rules are slower to run and and you will need to specify a path to your `tsconfig.json` file in the `"project"` property of `"parserOptions"`.\
> For more information see: https://typescript-eslint.io/getting-started/typed-linting

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install @arabasta/eslint-plugin-no-destructuring-arrays-as-objects --save-dev

# yarn
yarn add @arabasta/eslint-plugin-no-destructuring-arrays-as-objects --dev

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-no-destructuring-arrays-as-objects
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import noDestructuringArraysAsObjects from '@arabasta/eslint-plugin-no-destructuring-arrays-as-objects';

export default [
  // ...
  {
    ...noDestructuringArraysAsObjects.configs.recommended,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/no-destructuring-arrays-as-objects/recommended-legacy"
  ],
  // ...
  "parserOptions": {
    "project": "tsconfig.json"
  }
}
```

## Rules

✅ Set in the `recommended` configuration

| Rule                               | Description                              | ✅  |
| ---------------------------------- | ---------------------------------------- | :-: |
| no-destructuring-arrays-as-objects | Disallow destructuring arrays as objects | ✅  |

### `no-destructuring-arrays-as-objects`

Examples of incorrect code for this rule:

```js
const foo = [];
const { length } = foo;
```

Examples of correct code for this rule:

```js
const foo = { bar: true };
const { bar } = foo;
```

## License

MIT
