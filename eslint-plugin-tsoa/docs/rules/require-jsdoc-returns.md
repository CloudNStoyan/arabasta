# require-jsdoc-returns

Require return statements to be documented.

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
     * Whether to disallow JSDoc's '@returns' declaration on methods that return 'void' or 'undefined'.
     */
    disallowOnVoidOrUndefined?: boolean;
  },
];

const defaultOptions: Options = [
  {
    disallowOnVoidOrUndefined: true,
  },
];
```

<!-- end custom auto-generated options codeblock -->
