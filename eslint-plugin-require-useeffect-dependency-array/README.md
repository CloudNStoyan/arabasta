# `@arabasta/eslint-plugin-require-useeffect-dependency-array`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-require-useeffect-dependency-array)](https://www.npmjs.com/package/@arabasta/eslint-plugin-require-useeffect-dependency-array)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-require-useeffect-dependency-array)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-require-useeffect-dependency-array/LICENSE)

ESLint plugin that enforces that React useEffect has a dependency array.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-require-useeffect-dependency-array

# yarn
yarn add --dev @arabasta/eslint-plugin-require-useeffect-dependency-array

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-require-useeffect-dependency-array
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import requireUseeffectDependencyArray from '@arabasta/eslint-plugin-require-useeffect-dependency-array';

export default [
  // ...
  requireUseeffectDependencyArray.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/require-useeffect-dependency-array/recommended-legacy"
  ]
}
```

## Rules

✅ Set in the `recommended` configuration\
🔧 Automatically fixable by the [`--fix`](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) CLI option

| Rule                               | Description                                   | ✅  | 🔧  |
| ---------------------------------- | --------------------------------------------- | :-: | :-: |
| require-useeffect-dependency-array | Enforce that useEffect has a dependency array | ✅  | 🔧  |

### `require-useeffect-dependency-array`

Examples of incorrect code for this rule:

```js
try {
} catch (error) {
  useEffect(() => {});
}
```

Examples of correct code for this rule:

```js
try {
} catch (error) {
  useEffect(() => {}, []);
}
```

## License

MIT
