# require-security-metadata

Require all security definitions in the `@Security` decorator to be present in the `TSOA` config.

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
     * Where the TSOA's config file is located.
     */
    tsoaConfigFilePath?: string;
  },
];

const defaultOptions: Options = [
  {
    tsoaConfigFilePath: './tsoa.json',
  },
];
```

<!-- end custom auto-generated options codeblock -->
