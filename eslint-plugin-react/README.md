# `@arabasta/eslint-plugin-react`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-react)](https://www.npmjs.com/package/@arabasta/eslint-plugin-react)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-react)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-react/LICENSE)

ESLint plugin for react rules.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-react

# yarn
yarn add --dev @arabasta/eslint-plugin-react

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-react
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import arabastaReact from '@arabasta/eslint-plugin-react';

export default [
  // ...
  arabastaReact.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/react/recommended-legacy"
  ]
}
```

## Rules

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                   | Description                                    | 💼  | 🔧  |
| -------------------------------------------------------------------------------------- | ---------------------------------------------- | --- | --- |
| [require-useeffect-dependency-array](docs/rules/require-useeffect-dependency-array.md) | require `useEffect` to have a dependency array | ✅  | 🔧  |
