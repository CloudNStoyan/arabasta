import useAlternativeFunctionsRule from './use-alternative-functions';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

const ruleTestOptions = [
  {
    alternatives: [
      {
        from: 'useDispatch',
        to: 'useAppDispatch',
      },
      {
        from: 'useSelector',
        to: 'useAppSelector',
      },
    ],
  },
];

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'use-alternative-functions', // rule name
  useAlternativeFunctionsRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: 'useAppDispatch();',
        options: ruleTestOptions,
      },
      {
        code: 'useAppSelector();',
        options: ruleTestOptions,
      },
      {
        code: 'foo();',
        options: ruleTestOptions,
      },
      {
        code: 'bar();',
        options: ruleTestOptions,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: 'useDispatch();',
        options: ruleTestOptions,
        output: 'useAppDispatch();',
        errors: [
          {
            messageId: 'useAlternativeFunction',
          },
        ],
      },
      {
        code: 'useSelector();',
        options: ruleTestOptions,
        output: 'useAppSelector();',
        errors: [
          {
            messageId: 'useAlternativeFunction',
          },
        ],
      },
    ],
  }
);
