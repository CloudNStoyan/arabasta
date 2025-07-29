# `@arabasta/eslint-config`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-config)](https://www.npmjs.com/package/@arabasta/eslint-config)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-config)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-config/LICENSE)

Custom ESLint config to share between my projects. Originally extracted from [vite-workshop](https://github.com/HristoKolev/vite-workshop).

## Requirements

- This config currently only works with ESLint v9

<!-- start generated block (required-typescript-version) -->

- The optional TypeScript config requires a `typescript` version that satisfies the following constraint: `>=4.8.4 <5.9.0`

<!-- end generated block (required-typescript-version) -->

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-config

# yarn
yarn add --dev @arabasta/eslint-plugin-config

# pnpm
pnpm add --save-dev @arabasta/eslint-config
```

## Usage

#### Usage with ESM

```js
// ...
import { baseConfig } from '@arabasta/eslint-config';

export default [
  // ...
  ...baseConfig,
];
```

A complete ESM example including React, TypeScript and Vitest can be found here: [ESM Example](https://github.com/CloudNStoyan/arabasta/tree/main/eslint-config/examples/eslint.config.mjs)

#### Usage with CommonJS

```js
// ...
const { baseConfig } = require('@arabasta/eslint-config');

module.exports = [
  // ...
  ...baseConfig,
];
```

A complete CJS example including React, TypeScript and Jest can be found here: [CJS Example](https://github.com/CloudNStoyan/arabasta/tree/main/eslint-config/examples/eslint.config.cjs)

#### Available configs

- `baseConfig` - Base config.
- `typescriptConfig` - Additional config for TypeScript.
- `typescriptDefinitionsConfig` - Additional config for TypeScript definitions (`.d.ts`).
- `configFilesConfig` - Additional config with adjustments for configuration files like `tailwind.config.js` and `jest.config.js`.
- `reactConfig` - Additional config for React.
- `reactTypescriptConfig` - Additional config for React when using TypeScript.
- `reduxConfig` - Additional config for Redux and Redux Toolkit when using React.
- `jestConfig` - Additional config for Jest.
- `rtlJestConfig` - Additional config for Testing Library when using Jest.
- `vitestConfig` - Additional config for Vitest.
- `rtlVitestConfig` - Additional config for Testing Library when using Vitest.

## Plugins

Plugin packages included in this ESLint config:

<!-- start generated block (plugin-packages) -->

- @arabasta/eslint-plugin-javascript
- @arabasta/eslint-plugin-react
- @arabasta/eslint-plugin-testing-library
- @arabasta/eslint-plugin-tsoa
- @arabasta/eslint-plugin-typescript
- @eslint-community/eslint-plugin-eslint-comments
- @typescript-eslint/eslint-plugin
- @vitest/eslint-plugin
- eslint-plugin-es
- eslint-plugin-import
- eslint-plugin-jest
- eslint-plugin-jsdoc
- eslint-plugin-jsx-a11y
- eslint-plugin-new-with-error
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- eslint-plugin-testing-library
- eslint-plugin-unused-imports

<!-- end generated block (plugin-packages) -->

## License

MIT
