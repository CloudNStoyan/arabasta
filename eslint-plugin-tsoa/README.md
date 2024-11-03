# `@arabasta/eslint-plugin-api-documentation`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-api-documentation)](https://www.npmjs.com/package/@arabasta/eslint-plugin-api-documentation)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-api-documentation)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/LICENSE)

ESLint plugin that enforces api documentation.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-api-documentation

# yarn
yarn add --dev @arabasta/eslint-plugin-api-documentation

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-api-documentation
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import apiDocumentation from '@arabasta/eslint-plugin-api-documentation';

export default [
  // ...
  apiDocumentation.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/api-documentation/recommended-legacy"
  ]
}
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💭 Requires [type information](https://typescript-eslint.io/linting/typed-linting).

| Name                                                                                                                                                                        | Description                                                                                                               | 💼  | 🔧  | 💭  |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :-- | :-- | :-- |
| [require-example-decorator](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/require-example-decorator.md)                     | require `@Example` decorator when the method returns an array                                                             | ✅  |     |     |
| [require-jsdoc-example-for-enum-type](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/require-jsdoc-example-for-enum-type.md) | require JSDoc's `@example` declaration for enum properties and ban other complex types from having `@example` declaration | ✅  |     | 💭  |
| [require-jsdoc-returns](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/require-jsdoc-returns.md)                             | require return statements to be documented                                                                                | ✅  |     | 💭  |
| [require-security-metadata](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/require-security-metadata.md)                     | require all security definitions in the `@Security` decorator to be present in the `TSOA` config                          | ✅  |     |     |
| [require-tags-metadata](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/require-tags-metadata.md)                             | require all tags in the `@Tags` decorator to be present in the `TSOA` config                                              | ✅  |     |     |
| [valid-alternative-response](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/valid-alternative-response.md)                   | require correct response decorators when using alternative responses                                                      | ✅  | 🔧  |     |
| [valid-alternative-response-type](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/valid-alternative-response-type.md)         | require alternative response's first type argument to be the same as its method's return type                             | ✅  | 🔧  | 💭  |
| [valid-example-decorator-type](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/valid-example-decorator-type.md)               | require `@Example` decorator's first type argument to be the same as its method's return type                             | ✅  |     | 💭  |
| [valid-response-decorator-type](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/valid-response-decorator-type.md)             | require `@Response` decorator's first type argument to exists and optionally to be one of the allowed types               | ✅  |     | 💭  |
| [valid-security-decorator](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules/valid-security-decorator.md)                       | require `@Response(401)` decorator on methods or classes that are affected by the `@Security` decorator                   | ✅  |     |     |

<!-- end auto-generated rules list -->
