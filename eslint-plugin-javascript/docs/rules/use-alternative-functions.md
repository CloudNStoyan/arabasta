# use-alternative-functions

Require the usage of alternative functions.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

⚙️ This rule is configurable.

## Rule Details

**Example of configured options**

```js
{
  alternatives: [
    {
      from: 'useDispatch',
      to: 'useAppDispatch',
    },
  ];
}
```

Examples of **incorrect** code for this rule with the above options:

```js
useSomething();

// ..

useDispatch();
```

Examples of **correct** code for this rule with the above options:

```js
useSomething();

// ..

useAppDispatch();
```

## Options

This rule accepts the following options:

```ts
interface AlternativeFunction {
  /**
   * The name of the function that will be replaced by the alternative (`to`) function.
   */
  from: string;

  /**
   * The name of the alternative function that will replace the `from` function.
   */
  to: string;
}

type Options = [
  {
    /**
     * An array of alternative functions.
     */
    alternatives: AlternativeFunction[];
  },
];

const defaultOptions: Options = [
  {
    alternatives: [],
  },
];
```
