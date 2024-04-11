import { RuleTester } from '@typescript-eslint/rule-tester';
import noDestructuringArraysAsObjectsRule from './no-destructuring-arrays-as-objects.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
  },
});

ruleTester.run(
  'no-object-destructuring-array', // rule name
  noDestructuringArraysAsObjectsRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when destructuring an object',
        code: `
          const foo = { bar: true };
          const { bar } = foo;
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: 'when destructuring an array',
        code: `
          const foo = [];
          const { length } = foo;
        `,
        errors: [
          {
            messageId: 'noDestructuringArraysAsObjects',
          },
        ],
      },
    ],
  }
);
