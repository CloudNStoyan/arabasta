# no-jsdoc-example-for-complex-property-type

Ban complex interface property types from having JSDoc's `@example` declaration.

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
     * Whether to allow JSDoc's '@example' declaration for enum properties on interfaces.
     */
    allowEnums?: boolean;
  },
];

const defaultOptions: Options = [
  {
    allowEnums: true,
  },
];
```

<!-- end custom auto-generated options codeblock -->

**Note:** If you decide to not allow enums you should probably disable the [`require-jsdoc-example-for-enum-property-type`](./require-jsdoc-example-for-enum-property-type) rule.
