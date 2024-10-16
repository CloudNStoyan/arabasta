# valid-alternative-response-type

Require alternative response's first type argument to be the same as its method's return type.

💼 This rule is enabled in the ✅ `recommended` config.

⚙️ This rule is configurable.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

💭 This rule requires [type information](https://typescript-eslint.io/linting/typed-linting).

<!-- end auto-generated rule header -->

## Options

This rule accepts the following options

<!-- start custom auto-generated options codeblock -->

```ts
type Options = [
  {
    /**
     * The list of functions that are alternative response
     */
    functionNames?: string[];
  },
];

const defaultOptions: Options = [
  {
    functionNames: ['this.errorResult', 'this.noContentResult'],
  },
];
```

<!-- end custom auto-generated options codeblock -->
