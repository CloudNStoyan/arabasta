# require-useeffect-dependency-array

Require `useEffect` to have a dependency array.

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

Examples of **incorrect** code for this rule:

```js
useEffect(() => {});
```

Examples of **correct** code for this rule:

```js
useEffect(() => {}, []);
```
