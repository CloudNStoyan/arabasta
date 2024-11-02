# no-destructuring-arrays-as-objects

Disallow destructuring arrays as objects.

💼 This rule is enabled in the ✅ `recommended` config.

💭 This rule requires [type information](https://typescript-eslint.io/linting/typed-linting).

<!-- end auto-generated rule header -->

## Rule Details

Examples of **incorrect** code for this rule:

```js
const foo = [];
const { length } = foo;
```

Examples of **correct** code for this rule:

```js
const foo = { bar: true };
const { bar } = foo;
```
