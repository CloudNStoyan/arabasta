# `@arabasta/eslint-config`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-config)](https://www.npmjs.com/package/@arabasta/eslint-config)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-config)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-config/LICENSE)

Custom ESLint config to share between my projects. Originally extracted from [vite-workshop](https://github.com/HristoKolev/vite-workshop).

## Requirements

- This config currently only works with ESLint v8

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

- @arabasta/eslint-plugin-javascript@1.0.0
- @arabasta/eslint-plugin-react@1.0.0
- @arabasta/eslint-plugin-testing-library@1.0.0
- @arabasta/eslint-plugin-tsoa@1.1.1
- @arabasta/eslint-plugin-typescript@1.0.1
- @eslint-community/eslint-plugin-eslint-comments@4.5.0
- @typescript-eslint/eslint-plugin@8.38.0
- @vitest/eslint-plugin@1.3.4
- eslint-plugin-es@4.1.0
- eslint-plugin-import@2.32.0
- eslint-plugin-jest@28.14.0
- eslint-plugin-jsdoc@52.0.0
- eslint-plugin-jsx-a11y@6.10.2
- eslint-plugin-new-with-error@5.0.0
- eslint-plugin-react@7.37.5
- eslint-plugin-react-hooks@5.2.0
- eslint-plugin-react-refresh@0.4.20
- eslint-plugin-testing-library@7.6.3
- eslint-plugin-unused-imports@4.1.4

<!-- end generated block (plugin-packages) -->

## License

MIT
