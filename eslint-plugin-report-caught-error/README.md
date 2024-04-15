# `@arabasta/eslint-plugin-report-caught-error`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-report-caught-error)](https://www.npmjs.com/package/@arabasta/eslint-plugin-report-caught-error)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-report-caught-error)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-report-caught-error/LICENSE)

ESLint plugin that enforces caught errors in try/catches to be reported.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-report-caught-error

# yarn
yarn add --dev @arabasta/eslint-plugin-report-caught-error

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-report-caught-error
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import reportCaughtError from '@arabasta/eslint-plugin-report-caught-error';

export default [
  // ...
  reportCaughtError.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/report-caught-error/recommended-legacy"
  ]
}
```

## Rules

✅ Set in the `recommended` configuration\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/developer-guide/working-with-rules#providing-suggestions)

| Rule                | Description                             | ✅  | 💡  |
| ------------------- | --------------------------------------- | :-: | :-: |
| report-caught-error | Enforce that caught errors are reported | ✅  | 💡  |

### `report-caught-error`

#### Options

This rule has a string option. The string should be your report function.

- `console.error` (default)

For example, in order to configure your report function to be `reportUnknownError`, you can use the following configuration:

```json
"@arabasta/report-caught-error/report-caught-error": [<severity>, "reportUnknownError"]
```

Examples of incorrect code for this rule:

```js
try {
} catch (error) {
  foo();
}
```

Examples of correct code for this rule:

```js
try {
} catch (error) {
  console.error(error);
  foo();
}
```

## License

MIT
