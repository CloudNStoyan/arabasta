# report-caught-error

Require caught errors to be reported.

💼 This rule is enabled in the ✅ `recommended` config.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

⚙️ This rule is configurable.

## Rule Details

Examples of **incorrect** code for this rule with the default options:

```js
try {
  // doing something try-catch worthy..
} catch (error) {
  let doingSomethingElse = true;
}
```

Examples of **correct** code for this rule with the default options:

```js
try {
  // doing something try-catch worthy.
} catch (error) {
  console.error(error);
}
```

## Options

This rule accepts the following options:

```ts
type Options = [
  {
    /**
     * The function name that is used to report errors.
     */
    reportFunctionName: string;
  },
];

const defaultOptions: Options = [
  {
    reportFunctionName: 'console.error',
  },
];
```
