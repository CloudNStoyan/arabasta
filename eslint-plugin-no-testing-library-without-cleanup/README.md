# `@arabasta/eslint-plugin-no-testing-library-without-cleanup`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-no-testing-library-without-cleanup)](https://www.npmjs.com/package/@arabasta/eslint-plugin-no-testing-library-without-cleanup)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-no-testing-library-without-cleanup)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-no-testing-library-without-cleanup/LICENSE)

ESLint plugin that enforces the usage of the cleanup function when importing from Testing Library.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install @arabasta/eslint-plugin-no-testing-library-without-cleanup --save-dev

# yarn
yarn add @arabasta/eslint-plugin-no-testing-library-without-cleanup --dev

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-no-testing-library-without-cleanup
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import noTestingLibraryWithoutCleanup from '@arabasta/eslint-plugin-no-testing-library-without-cleanup';

export default [
  // ...
  noTestingLibraryWithoutCleanup.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/no-testing-library-without-cleanup/recommended-legacy"
  ]
}
```

## Rules

✅ Set in the `recommended` configuration

| Rule                               | Description                                                                   | ✅  |
| ---------------------------------- | ----------------------------------------------------------------------------- | :-: |
| no-testing-library-without-cleanup | Enforce the usage of the cleanup function when importing from Testing Library | ✅  |

### `no-testing-library-without-cleanup`

Examples of incorrect code for this rule:

```js
import { renderHook } from '@testing-library/react';

renderHook();
```

Examples of correct code for this rule:

```js
import { cleanup, renderHook } from '@testing-library/react';

cleanup();

renderHook();
```

## License

MIT
