# use-app-alternatives

Require the usage of app alternative functions.

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

⚙️ This rule is configurable.

## Rule Details

Examples of **incorrect** code for this rule with the default options:

```js
useSomething();

// ..

useDispatch();
```

Examples of **correct** code for this rule with the default options:

```js
useSomething();

// ..

useAppDispatch();
```

## Options

This rule accepts the following options:

```ts
interface AppAlternative {
  /**
   * The name of the function that will be replaced by the alternative function.
   */
  alternativeTo: string;

  /**
   * The name of the alternative function that will replace the `alternativeTo` function.
   */
  appFunction: string;
}

type Options = [
  {
    /**
     * An array of alternative functions.
     */
    alternatives: AppAlternative[];
  },
];

const defaultOptions: Options = [
  {
    alternatives: [
      {
        alternativeTo: 'useDispatch',
        appFunction: 'useAppDispatch',
      },
      {
        alternativeTo: 'useSelector',
        appFunction: 'useAppSelector',
      },
    ],
  },
];
```
