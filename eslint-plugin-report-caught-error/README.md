# `@arabasta/eslint-plugin-report-caught-error`

ESLint plugin that enforces caught errors in try/catches to be reported.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install @arabasta/eslint-plugin-report-caught-error --save-dev

# yarn
yarn add @arabasta/eslint-plugin-report-caught-error --dev
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import reportCaughtError from "@arabasta/eslint-plugin-report-caught-error";

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
    "plugin:arabasta/report-caught-error/recommended-legacy"
  ]
}
```

## Rules

✅ Set in the `recommended` configuration\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/developer-guide/working-with-rules#providing-suggestions)

| Rule                       | Description                                       | ✅ | 💡 |
| -------------------------- | ------------------------------------------------- | :-: | :-: |
| report-caught-error        | Enforce that caught errors are reported           | ✅ | 💡 |

### `report-caught-error`

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
  reportUnknownError(error);
}
```

## License

MIT
