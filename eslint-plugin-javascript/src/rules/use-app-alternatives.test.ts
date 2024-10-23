import useAppAlternativesRule from './use-app-alternatives';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'use-app-alternatives', // rule name
  useAppAlternativesRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: 'useAppDispatch();',
      },
      {
        code: 'useAppSelector();',
      },
      {
        code: 'foo();',
      },
      {
        code: 'bar();',
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: 'useDispatch();',
        output: 'useAppDispatch();',
        errors: [
          {
            messageId: 'useAppFunction',
          },
        ],
      },
      {
        code: 'useSelector();',
        output: 'useAppSelector();',
        errors: [
          {
            messageId: 'useAppFunction',
          },
        ],
      },
    ],
  }
);
