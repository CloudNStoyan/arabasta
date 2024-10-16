# valid-alternative-response

Require correct response decorators when using alternative responses.

💼 This rule is enabled in the ✅ `recommended` config.

⚙️ This rule is configurable.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

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
    /**
     * The list of alternative responses function names and special statuses
     */
    specialStatuses?: {
      /**
       * The alternative response function name
       */
      functionName?: string;
      /**
       * The alternative response's status code
       */
      statusCode?: number;
    }[];
  },
];

const defaultOptions: Options = [
  {
    functionNames: ['this.errorResult', 'this.noContentResult'],
    specialStatuses: [
      {
        functionName: 'this.noContentResult',
        statusCode: 204,
      },
    ],
  },
];
```

<!-- end custom auto-generated options codeblock -->
