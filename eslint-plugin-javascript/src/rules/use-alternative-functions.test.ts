import useAlternativeFunctionsRule from './use-alternative-functions';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

const ruleTestSettings = {
  '@arabasta/alternative-functions': {
    useDispatch: [
      {
        from: 'useDispatch',
        to: 'useAppDispatch',
      },
    ],
    useSelector: [
      {
        from: 'useSelector',
        to: 'useAppSelector',
      },
    ],
  },
};

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
        settings: ruleTestSettings,
      },
      {
        code: 'useAppSelector();',
        settings: ruleTestSettings,
      },
      {
        code: 'foo();',
        settings: ruleTestSettings,
      },
      {
        code: 'bar();',
        settings: ruleTestSettings,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: 'useDispatch();',
        settings: ruleTestSettings,
        output: 'useAppDispatch();',
        errors: [
          {
            messageId: 'useAlternativeFunction',
          },
        ],
      },
      {
        code: 'useSelector();',
        settings: ruleTestSettings,
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
