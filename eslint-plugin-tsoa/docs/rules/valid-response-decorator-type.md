# valid-response-decorator-type

Require `@Response` decorator's first type argument to exists and optionally to be one of the allowed types.

💼 This rule is enabled in the ✅ `recommended` config.

⚙️ This rule is configurable.

💭 This rule requires [type information](https://typescript-eslint.io/linting/typed-linting).

<!-- end auto-generated rule header -->

## Options

This rule accepts the following options

<!-- start custom auto-generated options codeblock -->

```ts
type Options = [
  {
    /**
     * Whether or not to check the types used in the `@Response` decorator
     * If this option is set to 'any' it won't check the types
     * If this option is set to a list of allowed types it will check against the list
     */
    allowedTypes?: string[] | 'any';
  },
];

const defaultOptions: Options = [
  {
    allowedTypes: 'any',
  },
];
```

<!-- end custom auto-generated options codeblock -->
