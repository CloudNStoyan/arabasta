# `@arabasta/eslint-plugin-tsoa`

[![NPM Version](https://img.shields.io/npm/v/%40arabasta%2Feslint-plugin-tsoa)](https://www.npmjs.com/package/@arabasta/eslint-plugin-tsoa)
[![NPM License](https://img.shields.io/npm/l/%40arabasta%2Feslint-plugin-tsoa)](https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-tsoa/LICENSE)

ESLint plugin for tsoa rules.

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install --save-dev @arabasta/eslint-plugin-tsoa

# yarn
yarn add --dev @arabasta/eslint-plugin-tsoa

# pnpm
pnpm add --save-dev @arabasta/eslint-plugin-tsoa
```

## Usage

[Flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
(**eslint.config.js**)

```js
// ...
import arabastaTsoa from '@arabasta/eslint-plugin-tsoa';

export default [
  // ...
  arabastaTsoa.configs.recommended,
];
```

[Legacy config](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
(**.eslintrc**)

```json
{
  "extends": [
    // ...
    "plugin:@arabasta/tsoa/recommended-legacy"
  ]
}
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💭 Requires [type information](https://typescript-eslint.io/linting/typed-linting).

| Name                                                                                                       | Description                                                                                                                                           | 💼  | 🔧  | 💭  |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :-- | :-- | :-- |
| [no-jsdoc-example-for-complex-property-type](docs/rules/no-jsdoc-example-for-complex-property-type.md)     | ban complex interface property types from having JSDoc's `@example` declaration                                                                       | ✅  |     | 💭  |
| [require-example-decorator](docs/rules/require-example-decorator.md)                                       | require the `@Example` decorator on methods that return an array                                                                                      | ✅  |     |     |
| [require-jsdoc-example-for-enum-property-type](docs/rules/require-jsdoc-example-for-enum-property-type.md) | require JSDoc's `@example` declaration for enum properties                                                                                            | ✅  |     | 💭  |
| [require-jsdoc-returns](docs/rules/require-jsdoc-returns.md)                                               | require return statements to be documented                                                                                                            | ✅  |     | 💭  |
| [require-property-example-decorator](docs/rules/require-property-example-decorator.md)                     | require the `@Example` decorator on class properties                                                                                                  | ✅  |     |     |
| [require-security-metadata](docs/rules/require-security-metadata.md)                                       | require all security definitions used by the `@Security` decorator to be present in the `TSOA` config                                                 | ✅  |     |     |
| [require-tags-decorator](docs/rules/require-tags-decorator.md)                                             | require `@Tags` decorator on controllers                                                                                                              | ✅  |     |     |
| [require-tags-metadata](docs/rules/require-tags-metadata.md)                                               | require tags used by the `@Tags` decorator to be present in the `TSOA` config                                                                         | ✅  |     |     |
| [valid-alternative-response](docs/rules/valid-alternative-response.md)                                     | require correct response decorators when using alternative responses                                                                                  | ✅  | 🔧  |     |
| [valid-alternative-response-type](docs/rules/valid-alternative-response-type.md)                           | require alternative response's first type argument to be the same as its method's return type                                                         | ✅  | 🔧  | 💭  |
| [valid-example-decorator-type](docs/rules/valid-example-decorator-type.md)                                 | require `@Example` decorator's first type argument to be the same as its method's return type or its property type                                    | ✅  |     | 💭  |
| [valid-response-decorator-type](docs/rules/valid-response-decorator-type.md)                               | require `@Response` decorator's first type argument to exists if the status code begins with `4` or `5` and optionally to be one of the allowed types | ✅  |     | 💭  |
| [valid-security-decorator](docs/rules/valid-security-decorator.md)                                         | require `@Response` decorator with a specific status code on methods or classes that are affected by the `@Security` decorator                        | ✅  |     |     |

<!-- end auto-generated rules list -->
