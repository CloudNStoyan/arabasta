# valid-security-decorator

Require `@Response` decorator with a specific status code on methods or classes that are affected by the `@Security` decorator.

💼 This rule is enabled in the ✅ `recommended` config.

⚙️ This rule is configurable.

<!-- end auto-generated rule header -->

## Options

This rule accepts the following options

<!-- start custom auto-generated options codeblock -->

```ts
type Options = [
  {
    /**
     * The status code that has to be used with the `@Response` decorator
     */
    statusCode?: string | number;
  },
];

const defaultOptions: Options = [
  {
    statusCode: 401,
  },
];
```

<!-- end custom auto-generated options codeblock -->
