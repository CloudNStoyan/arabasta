# `@arabasta/eslint-config`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-config)](https://www.npmjs.com/package/@arabasta/eslint-config)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-config)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-config/LICENSE)

ESLint config with many rules extracted from [vite-workshop](https://github.com/HristoKolev/vite-workshop).

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

ESM

```js
// ...
import arabastaConfig from '@arabasta/eslint-config';

export default [
  // ...
  ...arabastaConfig,
];
```

## License

MIT
