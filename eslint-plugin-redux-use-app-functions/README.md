# `@arabasta/eslint-plugin-redux-use-app-functions`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-redux-use-app-functions)](https://www.npmjs.com/package/@arabasta/eslint-plugin-redux-use-app-functions)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-redux-use-app-functions)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-redux-use-app-functions/LICENSE)

ESLint plugin that enforces the usage of redux app specific functions.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-redux-use-app-functions

# yarn
yarn add --dev @arabasta/eslint-plugin-redux-use-app-functions

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-redux-use-app-functions
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import reduxUseAppFunctions from '@arabasta/eslint-plugin-redux-use-app-functions';

export default [
  // ...
  reduxUseAppFunctions.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/redux-use-app-functions/recommended-legacy"
  ]
}
```

## Rules

✅ Set in the `recommended` configuration\
🔧 Automatically fixable by the [`--fix`](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) CLI option

| Rule                       | Description                               | ✅  | 🔧  |
| -------------------------- | ----------------------------------------- | :-: | :-: |
| use-app-selector           | Enforces the usage of useAppSelector      | ✅  | 🔧  |
| use-app-dispatch           | Enforces the usage of useAppDispatch      | ✅  | 🔧  |
| use-create-app-async-thunk | Enforces the usage of createAppAsyncThunk | ✅  | 🔧  |

### `use-app-selector`

Examples of incorrect code for this rule:

```js
useSelector();
```

Examples of correct code for this rule:

```js
useAppSelector();
```

### `use-app-dispatch`

Examples of incorrect code for this rule:

```js
useDispatch();
```

Examples of correct code for this rule:

```js
useAppDispatch();
```

### `use-create-app-async-thunk`

Examples of incorrect code for this rule:

```js
createAsyncThunk();
```

Examples of correct code for this rule:

```js
createAppAsyncThunk();
```

## License

MIT
