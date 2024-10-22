# no-testing-library-without-cleanup

Require the usage of the cleanup function when importing from Testing Library.

💼 This rule is enabled in the ✅ `recommended` config.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import { renderHook } from '@testing-library/react';
// other code ..

renderHook();

// other code ..
```

Examples of **correct** code for this rule:

```js
import { cleanup } from '@testing-library/react';

// other code ..
cleanup();

// other code ..
```
