# use-alternative-functions

Require the usage of alternative functions.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

📃 This rule is configurable by [shared settings](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-shared-settings).

## Rule Details

**Example of configured settings**

```js
{
  settings: {
    "@arabasta/alternative-functions": {
      "redux": [
        {
          from: "useDispatch",
          to: "useAppDispatch"
        }
      ]
    }
  }
}
```

Examples of **incorrect** code for this rule with the above settings:

```js
useSomething();

// ..

useDispatch();
```

Examples of **correct** code for this rule with the above settings:

```js
useSomething();

// ..

useAppDispatch();
```

## Settings

This rule is affected by the following settings:

- [@arabasta/alternative-functions](../../README.md#arabastaalternative-functions)
