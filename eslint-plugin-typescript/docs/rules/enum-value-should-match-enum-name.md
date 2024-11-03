# enum-value-should-match-enum-name

Requires enum values to match enum keys.

💼 This rule is enabled in the ✅ `recommended` config.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

Examples of **incorrect** code for this rule:

```ts
enum Animals {
  Cat = 'Other not cat',
  Dog = 3,
}
```

Examples of **correct** code for this rule:

```ts
enum Animals {
  Cat = 'Cat',
  Dog = 'Dog',
}
```
